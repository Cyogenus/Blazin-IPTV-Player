import { existsSync, readFileSync, readdirSync } from "node:fs";
import { join, relative, resolve } from "node:path";

const docs = resolve(new URL("../docs/", import.meta.url).pathname.replace(/^\/(.:)/, "$1"));
const pngPath = join(docs, "assets", "favicon.png");
const icoPath = join(docs, "assets", "favicon.ico");
const applePath = join(docs, "apple-touch-icon.png");
const errors = [];
const pngHref = "https://windowsiptv.com/assets/favicon.png";
const icoHref = "https://windowsiptv.com/assets/favicon.ico";
const appleHref = "https://windowsiptv.com/apple-touch-icon.png";

function walk(dir) {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = join(dir, entry.name);
    return entry.isDirectory() ? walk(full) : [full];
  });
}
function attrs(tag) {
  return {
    rel: tag.match(/\brel\s*=\s*(["'])(.*?)\1/i)?.[2]?.trim().toLowerCase() ?? "",
    href: tag.match(/\bhref\s*=\s*(["'])(.*?)\1/i)?.[2]?.trim() ?? "",
    sizes: tag.match(/\bsizes\s*=\s*(["'])(.*?)\1/i)?.[2]?.trim().toLowerCase() ?? ""
  };
}

if (!existsSync(pngPath)) errors.push("Missing docs/assets/favicon.png");
if (!existsSync(icoPath)) errors.push("Missing docs/assets/favicon.ico");
if (!existsSync(applePath)) errors.push("Missing docs/apple-touch-icon.png");

if (existsSync(pngPath)) {
  const png = readFileSync(pngPath);
  const signature = png.subarray(0, 8).toString("hex");
  if (signature !== "89504e470d0a1a0a") errors.push("docs/assets/favicon.png is not a valid PNG file");
  else if (png.length < 24) errors.push("docs/assets/favicon.png is too small to contain PNG dimensions");
  else {
    const width = png.readUInt32BE(16);
    const height = png.readUInt32BE(20);
    if (width !== height) errors.push(`docs/assets/favicon.png must be square; found ${width}x${height}`);
    if (width < 48 || height < 48) errors.push(`docs/assets/favicon.png must be at least 48x48; found ${width}x${height}`);
  }
}

let checked = 0;
for (const file of walk(docs).filter((item) => item.toLowerCase().endsWith(".html"))) {
  const html = readFileSync(file, "utf8");
  if (!/<html\b/i.test(html) || !/<head\b/i.test(html)) continue;
  checked += 1;
  const name = relative(docs, file).replaceAll("\\", "/");
  const links = [...html.matchAll(/<link\b[^>]*>/gi)].map((m) => attrs(m[0]));
  const pngLinks = links.filter((x) => x.rel === "icon" && x.href === pngHref);
  const icoLinks = links.filter((x) => x.rel === "icon" && x.href === icoHref);
  const shortcutLinks = links.filter((x) => x.rel === "shortcut icon" && x.href === icoHref);
  const appleLinks = links.filter((x) => x.rel === "apple-touch-icon" && x.href === appleHref);
  if (pngLinks.length !== 1) errors.push(`${name}: expected one PNG favicon link, found ${pngLinks.length}`);
  if (icoLinks.length !== 1) errors.push(`${name}: expected one ICO favicon link, found ${icoLinks.length}`);
  if (shortcutLinks.length !== 1) errors.push(`${name}: expected one shortcut ICO link, found ${shortcutLinks.length}`);
  if (appleLinks.length !== 1) errors.push(`${name}: expected one Apple touch icon link, found ${appleLinks.length}`);
  if (pngLinks.length === 1 && pngLinks[0].sizes !== "64x64") errors.push(`${name}: PNG favicon must declare sizes=\"64x64\"`);
}

if (errors.length) {
  console.error(errors.join("\n"));
  process.exit(1);
}
console.log(`Favicon audit passed for ${checked} HTML pages.`);

import { existsSync, readFileSync, readdirSync } from "node:fs";
import { join, relative, resolve } from "node:path";

const docs = resolve(new URL("../docs/", import.meta.url).pathname.replace(/^\/(.:)/, "$1"));
const icoPath = join(docs, "favicon.ico");
const pngPath = join(docs, "favicon-120x120.png");
const applePath = join(docs, "apple-touch-icon.png");
const errors = [];
const icoHref = "https://windowsiptv.com/favicon.ico";
const pngHref = "https://windowsiptv.com/favicon-120x120.png";
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

if (!existsSync(icoPath)) errors.push("Missing docs/favicon.ico");
if (!existsSync(pngPath)) errors.push("Missing docs/favicon-120x120.png");
if (!existsSync(applePath)) errors.push("Missing docs/apple-touch-icon.png");

if (existsSync(icoPath)) {
  const ico = readFileSync(icoPath);
  if (ico.length < 6 || ico[0] !== 0 || ico[1] !== 0 || ico[2] !== 1 || ico[3] !== 0) {
    errors.push("docs/favicon.ico is not a valid ICO file");
  }
}

if (existsSync(pngPath)) {
  const png = readFileSync(pngPath);
  const signature = png.subarray(0, 8).toString("hex");
  if (signature !== "89504e470d0a1a0a") errors.push("docs/favicon-120x120.png is not a valid PNG file");
  else if (png.length < 24) errors.push("docs/favicon-120x120.png is too small to contain PNG dimensions");
  else {
    const width = png.readUInt32BE(16);
    const height = png.readUInt32BE(20);
    if (width !== 120 || height !== 120) {
      errors.push(`docs/favicon-120x120.png must be 120x120; found ${width}x${height}`);
    }
  }
}

let checked = 0;
for (const file of walk(docs).filter((item) => item.toLowerCase().endsWith(".html"))) {
  const html = readFileSync(file, "utf8");
  if (!/<html\b/i.test(html) || !/<head\b/i.test(html)) continue;
  checked += 1;
  const name = relative(docs, file).replaceAll("\\", "/");
  const links = [...html.matchAll(/<link\b[^>]*>/gi)].map((m) => attrs(m[0]));
  const icoLinks = links.filter((x) => x.rel === "icon" && x.href === icoHref);
  const pngLinks = links.filter((x) => x.rel === "icon" && x.href === pngHref);
  const shortcutLinks = links.filter((x) => x.rel === "shortcut icon" && x.href === icoHref);
  const appleLinks = links.filter((x) => x.rel === "apple-touch-icon" && x.href === appleHref);

  if (icoLinks.length !== 1) errors.push(`${name}: expected one root ICO favicon link, found ${icoLinks.length}`);
  if (pngLinks.length !== 1) errors.push(`${name}: expected one 120x120 PNG favicon link, found ${pngLinks.length}`);
  if (shortcutLinks.length !== 1) errors.push(`${name}: expected one root shortcut ICO link, found ${shortcutLinks.length}`);
  if (appleLinks.length !== 1) errors.push(`${name}: expected one Apple touch icon link, found ${appleLinks.length}`);
  if (pngLinks.length === 1 && pngLinks[0].sizes !== "120x120") {
    errors.push(`${name}: PNG favicon must declare sizes="120x120"`);
  }
}

if (errors.length) {
  console.error(errors.join("\n"));
  process.exit(1);
}
console.log(`Favicon audit passed for ${checked} HTML pages.`);

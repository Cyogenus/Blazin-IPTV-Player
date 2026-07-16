import { existsSync, readFileSync, readdirSync } from "node:fs";
import { join, relative, resolve } from "node:path";

const docs = resolve(new URL("../docs/", import.meta.url).pathname.replace(/^\/(.:)/, "$1"));
const pngPath = join(docs, "assets", "favicon.png");
const icoPath = join(docs, "assets", "favicon.ico");
const errors = [];

function walk(dir) {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = join(dir, entry.name);
    return entry.isDirectory() ? walk(full) : [full];
  });
}

if (!existsSync(pngPath)) errors.push("Missing docs/assets/favicon.png");
if (!existsSync(icoPath)) errors.push("Missing docs/assets/favicon.ico");

if (existsSync(pngPath)) {
  const png = readFileSync(pngPath);
  const signature = png.subarray(0, 8).toString("hex");
  if (signature !== "89504e470d0a1a0a") {
    errors.push("docs/assets/favicon.png is not a valid PNG file");
  } else if (png.length < 24) {
    errors.push("docs/assets/favicon.png is too small to contain PNG dimensions");
  } else {
    const width = png.readUInt32BE(16);
    const height = png.readUInt32BE(20);
    if (width !== height) errors.push(`docs/assets/favicon.png must be square; found ${width}x${height}`);
    if (width <= 48 || height <= 48) errors.push(`docs/assets/favicon.png should be larger than 48x48; found ${width}x${height}`);
  }
}

let checked = 0;
for (const file of walk(docs).filter((item) => item.toLowerCase().endsWith(".html"))) {
  const html = readFileSync(file, "utf8");
  if (!/<html\b/i.test(html) || !/<head\b/i.test(html)) continue;
  checked += 1;
  const name = relative(docs, file).replaceAll("\\", "/");

  const pngLinks = [...html.matchAll(/<link\b[^>]*>/gi)].filter((match) => {
    const tag = match[0];
    const rel = tag.match(/\brel\s*=\s*(["'])(.*?)\1/i)?.[2]?.trim().toLowerCase();
    const href = tag.match(/\bhref\s*=\s*(["'])(.*?)\1/i)?.[2]?.trim();
    return rel === "icon" && href === "/assets/favicon.png";
  });
  const icoLinks = [...html.matchAll(/<link\b[^>]*>/gi)].filter((match) => {
    const tag = match[0];
    const rel = tag.match(/\brel\s*=\s*(["'])(.*?)\1/i)?.[2]?.trim().toLowerCase();
    const href = tag.match(/\bhref\s*=\s*(["'])(.*?)\1/i)?.[2]?.trim();
    return rel === "icon" && href === "/assets/favicon.ico";
  });

  if (pngLinks.length !== 1) errors.push(`${name}: expected one absolute PNG favicon link, found ${pngLinks.length}`);
  if (icoLinks.length !== 1) errors.push(`${name}: expected one absolute ICO favicon link, found ${icoLinks.length}`);
  if (!/href=["']\/assets\/favicon\.png["'][^>]*sizes=["']64x64["']/i.test(html)) {
    errors.push(`${name}: PNG favicon must declare sizes=\"64x64\"`);
  }
}

if (errors.length) {
  console.error(errors.join("\n"));
  process.exit(1);
}

console.log(`Favicon audit passed for ${checked} HTML pages. The PNG is square and larger than 48x48.`);

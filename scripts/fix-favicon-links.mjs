import { existsSync, readFileSync, readdirSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";

const docs = resolve(new URL("../docs/", import.meta.url).pathname.replace(/^\/(.:)/, "$1"));
const icoPath = join(docs, "favicon.ico");
const pngPath = join(docs, "favicon-120x120.png");
const applePath = join(docs, "apple-touch-icon.png");

if (!existsSync(icoPath)) throw new Error("Missing docs/favicon.ico");
if (!existsSync(pngPath)) throw new Error("Missing docs/favicon-120x120.png");
if (!existsSync(applePath)) throw new Error("Missing docs/apple-touch-icon.png");

// Keep the primary favicon in the site root. This is the most reliable
// discovery path for Bing and is also the conventional browser fallback.
const faviconLinks = [
  '<link rel="icon" href="https://windowsiptv.com/favicon.ico" type="image/x-icon" sizes="any">',
  '<link rel="icon" href="https://windowsiptv.com/favicon-120x120.png" type="image/png" sizes="120x120">',
  '<link rel="shortcut icon" href="https://windowsiptv.com/favicon.ico" type="image/x-icon">',
  '<link rel="apple-touch-icon" href="https://windowsiptv.com/apple-touch-icon.png">'
].join("");

function walk(dir) {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = join(dir, entry.name);
    return entry.isDirectory() ? walk(full) : [full];
  });
}

function relValue(tag) {
  return tag.match(/\brel\s*=\s*(["'])(.*?)\1/i)?.[2]?.trim().toLowerCase() ?? "";
}

let checked = 0;
let changed = 0;
let skipped = 0;

for (const file of walk(docs).filter((item) => item.toLowerCase().endsWith(".html"))) {
  const html = readFileSync(file, "utf8");
  if (!/<html\b/i.test(html) || !/<head\b/i.test(html) || !/<\/head>/i.test(html)) {
    skipped += 1;
    continue;
  }

  checked += 1;
  let next = html.replace(/<link\b[^>]*>/gi, (tag) => {
    const rel = relValue(tag);
    return rel === "icon" || rel === "shortcut icon" || rel === "apple-touch-icon" ? "" : tag;
  });
  next = next.replace(/<\/head>/i, `${faviconLinks}</head>`);

  if (next !== html) {
    writeFileSync(file, next, "utf8");
    changed += 1;
  }
}

console.log(`Favicon update complete: ${checked} HTML pages checked, ${changed} updated, ${skipped} non-page files skipped.`);

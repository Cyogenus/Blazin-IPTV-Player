import { existsSync, readFileSync, readdirSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";

const docs = resolve(new URL("../docs/", import.meta.url).pathname.replace(/^\/(.:)/, "$1"));
const pngPath = join(docs, "assets", "favicon.png");
const icoPath = join(docs, "assets", "favicon.ico");
const applePath = join(docs, "apple-touch-icon.png");

if (!existsSync(pngPath)) throw new Error("Missing docs/assets/favicon.png");
if (!existsSync(icoPath)) throw new Error("Missing docs/assets/favicon.ico");
if (!existsSync(applePath)) throw new Error("Missing docs/apple-touch-icon.png");

// Use absolute, crawlable URLs so favicon discovery is unambiguous for Google,
// Bing (and Yahoo), DuckDuckGo, Yandex, browsers, and other crawlers.
const faviconLinks = [
  '<link rel="icon" href="https://windowsiptv.com/assets/favicon.ico" sizes="any">',
  '<link rel="icon" href="https://windowsiptv.com/assets/favicon.png" type="image/png" sizes="64x64">',
  '<link rel="shortcut icon" href="https://windowsiptv.com/assets/favicon.ico">',
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

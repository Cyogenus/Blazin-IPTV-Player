import { readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

const docs = resolve(new URL("../docs/", import.meta.url).pathname.replace(/^\/(.:)/, "$1"));
const files = ["index.html", "features.html", "screenshots.html", "user-guide.html"];
const cacheVersion = "1170-tv6";
const tvImages = [
  { name: "tv-mode-live-tv-epg-v3.jpg" },
  { name: "tv-mode-movies-v2.jpg" },
  { name: "tv-mode-series-v2.jpg" }
];
const stableImageStyle = "display:block;width:100%;max-width:100%;height:auto;object-fit:contain;aspect-ratio:auto;margin-left:auto;margin-right:auto;";

function escapeRegex(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function stabilizeImageTag(tag, name) {
  const pathPattern = new RegExp(`screenshots/${escapeRegex(name)}(?:\\?[^\"']*)?`, "i");
  let next = tag.replace(pathPattern, `screenshots/${name}?v=${cacheVersion}`);

  next = next.replace(/\s+loading=(["'])[^"']*\1/gi, "");
  next = next.replace(/\s+decoding=(["'])[^"']*\1/gi, "");
  next = next.replace(/\s+style=(["'])[^"']*\1/gi, "");
  next = next.replace(/^<img\b/i, `<img loading="eager" decoding="async" style="${stableImageStyle}"`);
  return next;
}

let changed = 0;

for (const file of files) {
  const path = resolve(docs, file);
  const original = readFileSync(path, "utf8");
  let html = original
    .replace(/screenshots\/tv-mode-live-tv-epg(?:-v2)?\.webp(?:\?[^"']*)?/gi, "screenshots/tv-mode-live-tv-epg-v3.jpg")
    .replace(/screenshots\/tv-mode-movies\.webp(?:\?[^"']*)?/gi, "screenshots/tv-mode-movies-v2.jpg")
    .replace(/screenshots\/tv-mode-series\.webp(?:\?[^"']*)?/gi, "screenshots/tv-mode-series-v2.jpg");

  for (const image of tvImages) {
    const escapedName = escapeRegex(image.name);
    const tagPattern = new RegExp(`<img\\b[^>]*\\bsrc=(["'])screenshots/${escapedName}(?:\\?[^"']*)?\\1[^>]*>`, "gi");
    html = html.replace(tagPattern, (tag) => stabilizeImageTag(tag, image.name));

    if (file === "screenshots.html") {
      const cardPattern = new RegExp(`<div\\s+class=(["'])screenshot-card\\1[^>]*>(?=\\s*<img\\b[^>]*\\bsrc=(["'])screenshots/${escapedName}(?:\\?[^"']*)?\\2)`, "gi");
      html = html.replace(cardPattern, `<div class="screenshot-card">`);
    }
  }

  if (html !== original) {
    writeFileSync(path, html, "utf8");
    changed += 1;
  }
}

console.log(`TV Mode image stabilization complete: ${changed} file(s) changed.`);

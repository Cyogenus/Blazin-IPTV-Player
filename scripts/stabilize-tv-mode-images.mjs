import { readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

const docs = resolve(new URL("../docs/", import.meta.url).pathname.replace(/^\/(.:)/, "$1"));
const files = ["index.html", "features.html", "screenshots.html"];
const cacheVersion = "1170-tv3";
const tvImagePath = "screenshots/tv-mode-(?:live-tv-epg|movies|series)\\.webp";
const tvImageTag = new RegExp(`<img\\b[^>]*\\bsrc=(["'])(${tvImagePath})(?:\\?[^"']*)?\\1[^>]*>`, "gi");
const tvCard = new RegExp(`<div class=(["'])screenshot-card\\1>\\s*(?=<img\\b[^>]*\\bsrc=(["'])${tvImagePath}(?:\\?[^"']*)?\\2)`, "gi");
const stableImageStyle = "display:block;width:100%;max-width:100%;height:auto;object-fit:contain;aspect-ratio:auto;margin-left:auto;margin-right:auto;";

function stabilizeImageTag(tag) {
  let next = tag.replace(
    new RegExp(`(${tvImagePath})(?:\\?[^"']*)?`, "i"),
    `$1?v=${cacheVersion}`
  );

  next = next.replace(/\\s+loading=(["'])lazy\\1/gi, "");
  next = next.replace(/\\s+style=(["'])[^"']*\\1/gi, "");

  if (!/\\sloading=/i.test(next)) {
    next = next.replace(/^<img\\b/i, '<img loading="eager"');
  }
  if (!/\\sdecoding=/i.test(next)) {
    next = next.replace(/^<img\\b/i, '<img decoding="async"');
  }

  return next.replace(/^<img\\b/i, `<img style="${stableImageStyle}"`);
}

let changed = 0;

for (const file of files) {
  const path = resolve(docs, file);
  const original = readFileSync(path, "utf8");
  let html = original.replace(tvImageTag, (tag) => stabilizeImageTag(tag));

  if (file === "screenshots.html") {
    html = html.replace(
      tvCard,
      '<div class="screenshot-card" style="width:100%;max-width:720px;margin-left:auto;margin-right:auto;">'
    );
  }

  if (html !== original) {
    writeFileSync(path, html, "utf8");
    changed += 1;
  }
}

console.log(`TV Mode image stabilization complete: ${changed} file(s) changed.`);

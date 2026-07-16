import { readFileSync } from "node:fs";
import { join, resolve } from "node:path";

const docs = resolve(new URL("../docs/", import.meta.url).pathname.replace(/^\/(.:)/, "$1"));
const sitemap = readFileSync(join(docs, "sitemap.xml"), "utf8");
const urls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1].trim());
const errors = [];

function fileForUrl(url) {
  const path = new URL(url).pathname.replace(/^\/+/, "");
  if (!path) return "index.html";
  if (path.endsWith("/")) return `${path}index.html`;
  return path;
}

function visibleText(html) {
  return html
    .replace(/<script\b[\s\S]*?<\/script>/gi, " ")
    .replace(/<style\b[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&quot;/gi, '"')
    .replace(/&#39;|&apos;/gi, "'")
    .replace(/\s+/g, " ")
    .trim();
}

for (const url of urls) {
  const file = fileForUrl(url);
  const html = readFileSync(join(docs, file), "utf8");
  const title = html.match(/<title\b[^>]*>([\s\S]*?)<\/title>/i)?.[1] ?? "";
  const meta = [...html.matchAll(/<meta\b[^>]*content\s*=\s*(["'])(.*?)\1[^>]*>/gi)].map((match) => match[2]).join(" ");
  const audit = `${title} ${meta} ${visibleText(html)}`.replace(/\s+/g, " ");

  if (/\b(?:workflow\s+workflow|keyword stuffing|seo rankings?|search traffic|for [^.]{0,180} searches|long-tail page|helps? sell blazin|review this related blazin guide)\b/i.test(audit)) {
    errors.push(`${file}: search-engine or generated-template language remains`);
  }

  if (/Related Windows IPTV Guides/i.test(html)) errors.push(`${file}: old bulk related-links section remains`);
  if ((html.match(/Review this related BLAZIN guide/gi) ?? []).length) errors.push(`${file}: repeated generic related-page copy remains`);
}

if (errors.length) {
  console.error(errors.join("\n"));
  process.exit(1);
}

console.log(`Bing copy audit passed for ${urls.length} preferred pages.`);

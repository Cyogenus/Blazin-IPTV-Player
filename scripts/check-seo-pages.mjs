import { existsSync, readFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";

const docs = resolve(new URL("../docs/", import.meta.url).pathname.replace(/^\/(.:)/, "$1"));
const slugs = [
  "windows-iptv-player", "best-iptv-player-for-windows", "iptv-player-windows-11",
  "m3u-player-windows", "xtream-codes-player-windows", "stb-mac-player-windows",
  "stalker-portal-player-windows", "epg-iptv-player-windows", "vlc-alternative-iptv-player",
  "iptv-player-for-pc-without-emulator", "iptvnator-alternative", "iptv-smarters-alternative-windows"
];
const errors = [];
const titles = new Set();
const descriptions = new Set();

for (const slug of slugs) {
  const file = join(docs, slug, "index.html");
  const html = readFileSync(file, "utf8");
  const title = html.match(/<title>([^<]+)<\/title>/i)?.[1];
  const description = html.match(/<meta name="description" content="([^"]+)"/i)?.[1];
  const canonical = `https://windowsiptv.com/${slug}/`;
  if (!title || titles.has(title)) errors.push(`${slug}: missing or duplicate title`);
  if (!description || descriptions.has(description)) errors.push(`${slug}: missing or duplicate meta description`);
  titles.add(title); descriptions.add(description);
  if (!html.includes(`<link rel="canonical" href="${canonical}">`)) errors.push(`${slug}: canonical mismatch`);
  if ((html.match(/<h1>/gi) ?? []).length !== 1) errors.push(`${slug}: expected one H1`);
  if ((html.match(/<h2>/gi) ?? []).length < 4) errors.push(`${slug}: expected at least four H2 sections`);
  if (!html.includes("https://apps.microsoft.com/detail/9NQ5S0FFCN8T?cid=Blazin_website")) errors.push(`${slug}: missing Store CTA`);
  if (!html.includes("You must provide your own legal IPTV source") && !html.includes("Users must provide their own legal IPTV source")) errors.push(`${slug}: missing legal-source statement`);
  if (/Google Trends|keyword stuffing|SEO rankings|search traffic/i.test(html)) errors.push(`${slug}: public research language found`);
  for (const script of html.matchAll(/<script type="application\/ld\+json">([^<]+)<\/script>/gi)) {
    try { JSON.parse(script[1]); } catch { errors.push(`${slug}: invalid JSON-LD`); }
  }
  for (const match of html.matchAll(/(?:href|src)="([^"]+)"/gi)) {
    const ref = match[1];
    if (/^(?:https?:|mailto:|#)/.test(ref)) continue;
    const target = resolve(dirname(file), ref);
    const candidate = ref.endsWith("/") ? join(target, "index.html") : target;
    if (!existsSync(candidate)) errors.push(`${slug}: broken local reference ${ref}`);
  }
}

const sitemap = readFileSync(join(docs, "sitemap.xml"), "utf8");
for (const slug of slugs) {
  if (!sitemap.includes(`<loc>https://windowsiptv.com/${slug}/</loc>`)) errors.push(`${slug}: missing from sitemap`);
}
for (const loc of sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)) {
  if (!loc[1].startsWith("https://windowsiptv.com/")) errors.push(`invalid sitemap URL: ${loc[1]}`);
}

if (errors.length) {
  console.error(errors.join("\n"));
  process.exit(1);
}
console.log(`Checked ${slugs.length} pages: metadata, headings, legal copy, JSON-LD, links, assets, CTAs, and sitemap all passed.`);

import { existsSync, readFileSync, readdirSync } from "node:fs";
import { dirname, join, relative, resolve } from "node:path";

const docs = resolve(new URL("../docs/", import.meta.url).pathname.replace(/^\/(.:)/, "$1"));
const errors = [];

function walk(dir) {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = join(dir, entry.name);
    return entry.isDirectory() ? walk(full) : [full];
  });
}

const htmlFiles = walk(docs).filter((file) => file.endsWith(".html"));
const canonicalOwners = new Map();
const indexable = new Map();

for (const file of htmlFiles) {
  const html = readFileSync(file, "utf8");
  const name = relative(docs, file).replaceAll("\\", "/");
  const robotTags = [...html.matchAll(/<meta\s+[^>]*name=["']robots["'][^>]*content=["']([^"']+)["'][^>]*>/gi)].map((m) => m[1].toLowerCase());

  if (robotTags.length > 1) errors.push(`${name}: multiple robots meta tags`);
  const isNoindex = robotTags.some((value) => value.includes("noindex"));
  indexable.set(name, !isNoindex);

  const canonical = html.match(/<link\s+[^>]*rel=["']canonical["'][^>]*href=["']([^"']+)["'][^>]*>/i)?.[1]
    ?? html.match(/<link\s+[^>]*href=["']([^"']+)["'][^>]*rel=["']canonical["'][^>]*>/i)?.[1];

  if (!canonical) errors.push(`${name}: missing canonical`);
  if (canonical) {
    if (!canonical.startsWith("https://windowsiptv.com/")) errors.push(`${name}: invalid canonical ${canonical}`);
    if (!isNoindex) {
      const prior = canonicalOwners.get(canonical);
      if (prior) errors.push(`${name}: duplicate indexable canonical also used by ${prior}`);
      else canonicalOwners.set(canonical, name);
    }
  }

  if (!isNoindex) {
    if ((html.match(/<h1\b/gi) ?? []).length !== 1) errors.push(`${name}: expected one H1`);
    if (/long-tail|placeholder|keyword stuffing|SEO rankings|search traffic|helps? sell|should tie directly|result is a more useful buying page|fixes the missing link problem/i.test(html)) {
      errors.push(`${name}: editorial or SEO-build language found`);
    }
  }

  for (const match of html.matchAll(/(?:href|src)=["']([^"']+)["']/gi)) {
    const ref = match[1];
    if (/^(?:https?:|mailto:|tel:|#|data:)/i.test(ref)) continue;
    const clean = ref.split("#")[0].split("?")[0];
    if (!clean || clean.startsWith("/")) continue;
    const target = resolve(dirname(file), clean);
    const candidate = clean.endsWith("/") ? join(target, "index.html") : target;
    if (!existsSync(candidate)) errors.push(`${name}: broken local reference ${ref}`);
  }
}

const sitemapPath = join(docs, "sitemap.xml");
const sitemap = readFileSync(sitemapPath, "utf8");
const locs = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
const locSet = new Set();

for (const loc of locs) {
  if (locSet.has(loc)) errors.push(`sitemap: duplicate URL ${loc}`);
  locSet.add(loc);
  if (!loc.startsWith("https://windowsiptv.com/")) errors.push(`sitemap: invalid URL ${loc}`);

  const pathname = new URL(loc).pathname;
  let file;
  if (pathname === "/") file = join(docs, "index.html");
  else if (pathname.endsWith("/")) file = join(docs, pathname.slice(1), "index.html");
  else file = join(docs, pathname.slice(1));

  if (!existsSync(file)) {
    errors.push(`sitemap: missing target ${loc}`);
    continue;
  }

  const rel = relative(docs, file).replaceAll("\\", "/");
  if (indexable.get(rel) === false) errors.push(`sitemap: noindex page included ${loc}`);
}

const duplicateLegacyPages = [
  "windows-iptv-player.html",
  "m3u-player-windows.html",
  "xtream-codes-player-windows.html",
  "stb-mac-player-windows.html",
  "stalker-portal-player-windows.html",
  "iptv-smarters-alternative-windows.html",
  "vlc-iptv-player-windows.html"
];
for (const name of duplicateLegacyPages) {
  if (indexable.get(name) !== false) errors.push(`${name}: legacy duplicate must be noindex`);
}

if (errors.length) {
  console.error(errors.join("\n"));
  process.exit(1);
}

console.log(`Checked ${htmlFiles.length} HTML files and ${locs.length} sitemap URLs.`);

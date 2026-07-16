import { existsSync, readFileSync, readdirSync, writeFileSync } from "node:fs";
import { dirname, join, relative, resolve } from "node:path";

const docs = resolve(new URL("../docs/", import.meta.url).pathname.replace(/^\/(.:)/, "$1"));
const site = "https://windowsiptv.com";
const store = "https://apps.microsoft.com/detail/9NQ5S0FFCN8T?cid=Blazin_website";
const today = new Date().toISOString().slice(0, 10);

function walk(dir) {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = join(dir, entry.name);
    return entry.isDirectory() ? walk(full) : [full];
  });
}

function rel(file) {
  return relative(docs, file).replaceAll("\\", "/");
}

function fileForPath(pathname) {
  const clean = pathname.replace(/^\/+/, "");
  if (!clean) return "index.html";
  if (clean.endsWith("/")) return `${clean}index.html`;
  return clean;
}

function pathForFile(name) {
  if (name === "index.html") return "/";
  if (name.endsWith("/index.html")) return `/${name.slice(0, -"index.html".length)}`;
  return `/${name}`;
}

function readSitemap() {
  const path = join(docs, "sitemap.xml");
  const xml = readFileSync(path, "utf8");
  const urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1].trim());
  return { path, xml, urls };
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function textContent(html) {
  return html
    .replace(/<script\b[\s\S]*?<\/script>/gi, " ")
    .replace(/<style\b[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&quot;/gi, '"')
    .replace(/&#39;|&apos;/gi, "'")
    .replace(/\s+/g, " ")
    .trim();
}

function getMeta(html, name) {
  for (const match of html.matchAll(/<meta\b[^>]*>/gi)) {
    const tag = match[0];
    const nameMatch = tag.match(/\bname\s*=\s*(["'])(.*?)\1/i);
    if (nameMatch?.[2]?.toLowerCase() !== name.toLowerCase()) continue;
    return tag.match(/\bcontent\s*=\s*(["'])(.*?)\1/i)?.[2]?.trim() ?? "";
  }
  return "";
}

function setMeta(html, name, content) {
  const tag = `<meta name="${name}" content="${escapeHtml(content)}">`;
  const matcher = new RegExp(`<meta\\b(?=[^>]*\\bname\\s*=\\s*(["'])${name}\\1)[^>]*>`, "gi");
  let removed = html.replace(matcher, "");
  const title = /<title\b[^>]*>[\s\S]*?<\/title>/i;
  if (title.test(removed)) return removed.replace(title, (value) => `${value}${tag}`);
  return removed.replace(/<head\b[^>]*>/i, (value) => `${value}${tag}`);
}

function setCanonical(html, canonical) {
  const tag = `<link rel="canonical" href="${canonical}">`;
  let cleaned = html.replace(/<link\b(?=[^>]*\brel\s*=\s*(["'])canonical\1)[^>]*>/gi, "");
  return cleaned.replace(/<\/head>/i, `${tag}</head>`);
}

function targetFor(name) {
  const lower = name.toLowerCase();
  if (lower.includes("download") || lower.includes("free-iptv") || lower.includes("microsoft-store")) return "/download.html";
  if (lower.includes("m3u")) return "/m3u-player-windows/";
  if (lower.includes("xtream")) return "/xtream-codes-player-windows/";
  if (lower.includes("stalker")) return "/stalker-portal-player-windows/";
  if (lower.includes("stb-mac") || lower.includes("stb_mac")) return "/stb-mac-player-windows/";
  if (lower.includes("epg") || lower.includes("tv-guide")) return "/epg-iptv-player-windows/";
  if (lower.includes("windows-11")) return "/iptv-player-windows-11/";
  if (lower.includes("best-iptv")) return "/best-iptv-player-for-windows/";
  if (lower.includes("feature") || lower.includes("large-playlist") || lower.includes("theme") || lower.includes("external-player")) return "/features.html";
  if (lower.includes("faq")) return "/faq.html";
  if (lower.includes("legal")) return "/legal-disclaimer.html";
  if (lower.includes("guide")) return "/guides.html";
  return "/windows-iptv-player/";
}

function redirectPage(targetPath) {
  const target = `${site}${targetPath}`;
  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>Page moved | BLAZIN IPTV Player</title>
  <meta name="description" content="This older page has been consolidated into the current BLAZIN IPTV Player guide to keep product information accurate and avoid duplicate pages.">
  <meta name="robots" content="noindex, follow">
  <meta http-equiv="refresh" content="0; url=${escapeHtml(targetPath)}">
  <link rel="canonical" href="${escapeHtml(target)}">
  <link rel="stylesheet" href="/assets/style.css">
</head>
<body>
  <main class="section">
    <div class="container content-narrow">
      <h1>This page has moved</h1>
      <p class="lead">The older page was consolidated so visitors and search engines use one current, reviewed source.</p>
      <div class="actions"><a class="btn primary" href="${escapeHtml(targetPath)}">Open the current guide</a><a class="btn" href="/guides.html">Browse all guides</a></div>
    </div>
  </main>
</body>
</html>
`;
}

function sanitizeJsonLd(html, canonical, description, addSoftware) {
  const visible = textContent(html).toLowerCase();
  const kept = [];

  html = html.replace(/<script\b[^>]*type\s*=\s*(["'])application\/ld\+json\1[^>]*>[\s\S]*?<\/script>/gi, (block) => {
    const raw = block.replace(/^<script\b[^>]*>/i, "").replace(/<\/script>$/i, "").trim();
    let value;
    try {
      value = JSON.parse(raw);
    } catch {
      return "";
    }

    const values = Array.isArray(value) ? value : [value];
    for (const item of values) {
      if (!item || typeof item !== "object") continue;
      const type = item["@type"];
      if (type === "SoftwareApplication") continue;
      if (type === "FAQPage") {
        const entities = Array.isArray(item.mainEntity) ? item.mainEntity : [];
        const accurate = entities.length > 0 && entities.every((entry) => {
          const question = String(entry?.name ?? "").toLowerCase();
          const answer = String(entry?.acceptedAnswer?.text ?? "").toLowerCase();
          return question && answer && visible.includes(question) && visible.includes(answer);
        });
        if (!accurate) continue;
      }
      kept.push(item);
    }
    return "";
  });

  if (addSoftware) {
    kept.unshift({
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      name: "BLAZIN IPTV Player",
      url: canonical,
      downloadUrl: store,
      operatingSystem: "Windows 10, Windows 11",
      applicationCategory: "MultimediaApplication",
      description,
      publisher: {
        "@type": "Organization",
        name: "WindowsIPTV.com",
        url: site
      }
    });
  }

  const scripts = kept.map((item) => `<script type="application/ld+json">${JSON.stringify(item).replace(/</g, "\\u003c")}</script>`).join("");
  return html.replace(/<\/head>/i, `${scripts}</head>`);
}

const { path: sitemapPath, xml: sitemapXml, urls: sitemapUrls } = readSitemap();
const preferred = new Set(sitemapUrls.map((url) => fileForPath(new URL(url).pathname)));
const locForFile = new Map(sitemapUrls.map((url) => [fileForPath(new URL(url).pathname), url]));
const softwareFiles = new Set([
  "index.html",
  "download.html",
  "features.html",
  "windows-iptv-player/index.html",
  "best-iptv-player-for-windows/index.html",
  "iptv-player-windows-11/index.html",
  "m3u-player-windows/index.html",
  "xtream-codes-player-windows/index.html",
  "stb-mac-player-windows/index.html",
  "stalker-portal-player-windows/index.html",
  "epg-iptv-player-windows/index.html"
]);

const footer = `<div class="footer-links"><a href="/">Home</a><a href="/download.html">7-Day Trial</a><a href="/features.html">Features</a><a href="/guides.html">Guides</a><a href="/screenshots.html">Screenshots</a><a href="/user-guide.html">User Guide</a><a href="/faq.html">FAQ</a><a href="/legal-disclaimer.html">Legal Disclaimer</a><a href="/windows-iptv-player/">Windows IPTV Player</a><a href="/m3u-player-windows/">M3U</a><a href="/xtream-codes-player-windows/">Xtream Codes</a><a href="/stb-mac-player-windows/">STB MAC</a><a href="/stalker-portal-player-windows/">Stalker Portal</a><a href="/epg-iptv-player-windows/">EPG</a></div>`;

let changed = 0;
let consolidated = 0;
let reviewed = 0;
let skipped = 0;

for (const file of walk(docs).filter((item) => item.toLowerCase().endsWith(".html"))) {
  const name = rel(file);
  let html = readFileSync(file, "utf8");

  if (!/<html\b/i.test(html) || !/<head\b/i.test(html)) {
    skipped += 1;
    continue;
  }

  if (name === "404.html") {
    let next = setMeta(html, "robots", "noindex");
    next = setMeta(next, "description", "The requested WindowsIPTV.com page could not be found. Return to the current BLAZIN IPTV Player guides and product information.");
    if (next !== html) {
      writeFileSync(file, next, "utf8");
      changed += 1;
    }
    continue;
  }

  if (!preferred.has(name)) {
    const next = redirectPage(targetFor(name));
    if (next !== html) {
      writeFileSync(file, next, "utf8");
      changed += 1;
    }
    consolidated += 1;
    continue;
  }

  const canonical = locForFile.get(name) ?? `${site}${pathForFile(name)}`;
  let next = html;

  next = next
    .replace(/BLAZIN IPTV Player is a player-only Windows IPTV app for people who bring their own legal streaming source\. It is built for IPTV player, IPTV app, IPTV stream player, IPTV for PC, IPTV PC, IPTV Windows and IPTV player Windows searches while staying accurate to the real desktop app\./i,
      "BLAZIN IPTV Player is Windows software for people who bring their own legal streaming source. The interface keeps profiles, browsing tools, guide data, and playback settings together on the desktop.")
    .replace(/These are feature areas reflected in the current Windows desktop build, focused on the current Windows desktop build\./i,
      "These capabilities are available in the current Windows desktop build and can be tested with your own compatible source.")
    .replace(/IPTV download and IPTV player download for Windows/gi,
      "Install BLAZIN IPTV Player from Microsoft Store")
    .replace(/Download BLAZIN IPTV Player from the Microsoft Store when you need a Windows IPTV player, IPTV app for PC, IPTV stream player, or IPTV player download for your own legal playlist or portal source\./i,
      "Install BLAZIN IPTV Player from the Microsoft Store, then test the Windows app with the legal playlist or portal details you already use.")
    .replace(/workflow\s+workflow/gi, "workflow");

  next = setMeta(next, "robots", "index, follow, max-image-preview:large");
  next = setCanonical(next, canonical);

  next = next.replace(/<div\s+class=(["'])footer-links\1>[\s\S]*?<\/div>/gi, footer);

  next = next.replace(/href=(["'])([^"']+)\1/gi, (full, quote, href) => {
    if (/^(?:mailto:|tel:|#|javascript:|data:)/i.test(href)) return full;
    let parsed;
    try {
      parsed = new URL(href, canonical);
    } catch {
      return full;
    }
    if (parsed.origin !== site) return full;
    const targetFile = fileForPath(parsed.pathname);
    if (preferred.has(targetFile) || targetFile.startsWith("assets/") || targetFile.startsWith("screenshots/")) return full;
    if (!existsSync(join(docs, targetFile))) return full;
    const targetPath = targetFor(targetFile);
    return `href=${quote}${targetPath}${quote}`;
  });

  const description = getMeta(next, "description") || "BLAZIN IPTV Player information for Windows users with legal user-provided playlists and portal sources.";
  next = sanitizeJsonLd(next, canonical, description, softwareFiles.has(name));

  if (next !== html) {
    writeFileSync(file, next, "utf8");
    changed += 1;
  }
  reviewed += 1;
}

const updatedSitemap = sitemapXml.replace(/<lastmod>[^<]*<\/lastmod>/g, `<lastmod>${today}</lastmod>`);
if (updatedSitemap !== sitemapXml) {
  writeFileSync(sitemapPath, updatedSitemap, "utf8");
  changed += 1;
}

console.log(`Bing quality cleanup complete: ${reviewed} preferred pages reviewed, ${consolidated} non-preferred pages consolidated, ${changed} files changed, ${skipped} verification files skipped.`);

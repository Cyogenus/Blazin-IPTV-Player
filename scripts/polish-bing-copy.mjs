import { readFileSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";

const docs = resolve(new URL("../docs/", import.meta.url).pathname.replace(/^\/(.:)/, "$1"));

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function setTitle(html, title) {
  return html.replace(/<title\b[^>]*>[\s\S]*?<\/title>/i, `<title>${escapeHtml(title)}</title>`);
}

function setNamedMeta(html, name, content) {
  const tag = `<meta name="${name}" content="${escapeHtml(content)}">`;
  const matcher = new RegExp(`<meta\\b(?=[^>]*\\bname\\s*=\\s*(["'])${name}\\1)[^>]*>`, "gi");
  const cleaned = html.replace(matcher, "");
  return cleaned.replace(/<\/head>/i, `${tag}</head>`);
}

function setPropertyMeta(html, property, content) {
  const tag = `<meta property="${property}" content="${escapeHtml(content)}">`;
  const matcher = new RegExp(`<meta\\b(?=[^>]*\\bproperty\\s*=\\s*(["'])${property}\\1)[^>]*>`, "gi");
  const cleaned = html.replace(matcher, "");
  return cleaned.replace(/<\/head>/i, `${tag}</head>`);
}

function syncSoftwareDescription(html, description) {
  return html.replace(/<script\b[^>]*type\s*=\s*(["'])application\/ld\+json\1[^>]*>([\s\S]*?)<\/script>/gi, (block, _quote, raw) => {
    let data;
    try { data = JSON.parse(raw.trim()); } catch { return block; }
    const items = Array.isArray(data) ? data : [data];
    let changed = false;
    for (const item of items) {
      if (item && typeof item === "object" && item["@type"] === "SoftwareApplication") {
        item.description = description;
        delete item.offers;
        delete item.alternateName;
        changed = true;
      }
    }
    if (!changed) return block;
    const value = Array.isArray(data) ? items : items[0];
    return `<script type="application/ld+json">${JSON.stringify(value).replace(/</g, "\\u003c")}</script>`;
  });
}

function syncSocialMeta(html, title, description) {
  let next = setTitle(html, title);
  next = setNamedMeta(next, "description", description);
  next = setNamedMeta(next, "twitter:title", title);
  next = setNamedMeta(next, "twitter:description", description);
  next = setPropertyMeta(next, "og:title", title);
  next = setPropertyMeta(next, "og:description", description);
  return next;
}

function updateFile(name, transform) {
  const path = join(docs, name);
  const current = readFileSync(path, "utf8");
  const next = transform(current);
  if (next !== current) {
    writeFileSync(path, next, "utf8");
    console.log(`Polished ${name}`);
    return 1;
  }
  return 0;
}

let changed = 0;

changed += updateFile("features.html", (html) => {
  const title = "BLAZIN IPTV Player Features for Windows";
  const description = "Explore BLAZIN IPTV Player features for Windows, including source profiles, categories, EPG, favorites, themes, internal playback, and external player options.";
  let next = syncSocialMeta(html, title, description);
  next = next.replace(/<h1>[^<]*<\/h1>/i, `<h1>${title}</h1>`);
  next = next.replace(/BLAZIN IPTV Player features for Windows IPTV, IPTV app, IPTV stream player and IPTV player for PC searches\./gi, description);
  next = syncSoftwareDescription(next, description);
  return next;
});

changed += updateFile("download.html", (html) => {
  const title = "Download BLAZIN IPTV Player for Windows | 7-Day Trial";
  const description = "Download BLAZIN IPTV Player from the Microsoft Store and test your own legal M3U, Xtream Codes, STB MAC, or Stalker Portal source for 7 days.";
  const related = `<section class="section"><div class="container"><p class="kicker">Related setup guides</p><h2>Continue with the source type you use</h2><div class="grid three"><article class="card"><h3><a href="/windows-iptv-player/">Windows IPTV Player</a></h3><p>Review the complete Windows workflow, supported source types, browsing tools, and playback options.</p></article><article class="card"><h3><a href="/m3u-player-windows/">M3U Player for Windows</a></h3><p>Learn how to load a local playlist file, remote M3U URL, or M3U Plus source.</p></article><article class="card"><h3><a href="/xtream-codes-player-windows/">Xtream Codes Player</a></h3><p>Use the server URL, username, and password supplied by your legal source.</p></article><article class="card"><h3><a href="/stb-mac-player-windows/">STB MAC Player</a></h3><p>Set up a compatible portal and MAC profile with optional compatibility controls.</p></article><article class="card"><h3><a href="/stalker-portal-player-windows/">Stalker Portal Player</a></h3><p>Configure an authorized portal profile and advanced fields only when required.</p></article><article class="card"><h3><a href="/epg-iptv-player-windows/">EPG and TV Guide</a></h3><p>Understand how source-provided program information appears in the Windows player.</p></article></div></div></section>`;
  let next = syncSocialMeta(html, title, description);
  next = next.replace(/Install the IPTV download from the Microsoft Store and test BLAZIN IPTV Player with your own legal M3U, Xtream Codes, STB MAC or Stalker Portal source\./i,
    "Install BLAZIN IPTV Player from the Microsoft Store and test it with your own legal M3U, Xtream Codes, STB MAC, or Stalker Portal source.");
  next = next.replace(/<section class="section"><div class="container"><p class="kicker">Related Windows IPTV Guides<\/p>[\s\S]*?<\/section>/i, related);
  next = syncSoftwareDescription(next, description);
  return next;
});

console.log(`Bing copy polish complete: ${changed} file(s) changed.`);

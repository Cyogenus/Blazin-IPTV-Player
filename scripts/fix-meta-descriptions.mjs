import { readFileSync, readdirSync, writeFileSync } from "node:fs";
import { basename, join, relative, resolve } from "node:path";

const docs = resolve(new URL("../docs/", import.meta.url).pathname.replace(/^\/(.:)/, "$1"));

const descriptions = {
  "404.html": "The requested WindowsIPTV.com page could not be found. Return to BLAZIN IPTV Player guides, features, screenshots, and setup help.",
  "index.html": "BLAZIN IPTV Player is a Windows desktop player for user-provided M3U, Xtream Codes, STB MAC, and Stalker Portal sources, with EPG and favorites.",
  "download.html": "Download BLAZIN IPTV Player for Windows from the Microsoft Store and test your own legal M3U, Xtream Codes, STB MAC, or Stalker source for 7 days.",
  "features.html": "Explore BLAZIN IPTV Player features for Windows, including M3U, Xtream Codes, STB MAC, Stalker Portal, EPG, favorites, profiles, themes, and playback.",
  "screenshots.html": "View BLAZIN IPTV Player screenshots showing Live TV, EPG, profiles, movies, series, favorites, playback controls, and Windows themes.",
  "faq.html": "Read answers about BLAZIN IPTV Player for Windows, its 7-day trial, legal source requirements, M3U, Xtream Codes, STB MAC, Stalker, EPG, and playback.",
  "user-guide.html": "Follow the BLAZIN IPTV Player user guide for Windows setup, M3U, Xtream Codes, STB MAC, Stalker Portal, EPG, favorites, and playback.",
  "legal-disclaimer.html": "Read the BLAZIN IPTV Player legal disclaimer. The player does not provide channels, playlists, streams, provider accounts, subscriptions, or copyrighted content.",
  "guides.html": "Browse BLAZIN IPTV Player guides for Windows, M3U, Xtream Codes, STB MAC, Stalker Portal, EPG, screenshots, setup, and playback help.",
  "windows-iptv-terms.html": "Review common Windows IPTV player terms and find the matching BLAZIN guide for app setup, legal source formats, playback, and the 7-day trial.",
  "best-iptv-player-for-pc.html": "Compare PC IPTV player features including Windows layout, source support, EPG, search, favorites, internal playback, external players, and trial access.",
  "free-iptv-player-windows.html": "Try BLAZIN IPTV Player free for 7 days on Windows and test your own legal M3U, Xtream Codes, STB MAC, or Stalker Portal source.",
  "how-to-add-m3u-playlist-windows.html": "Learn how to add your own legal M3U file, M3U URL, or M3U Plus playlist to BLAZIN IPTV Player on Windows 10 or Windows 11.",
  "how-to-choose-iptv-player-windows.html": "Learn how to choose an IPTV player for Windows by comparing source formats, EPG, browsing, favorites, playback options, and trial access.",
  "how-to-load-epg-guide.html": "Learn how EPG and TV guide data loads in BLAZIN IPTV Player when your own legal IPTV source provides compatible program information.",
  "how-to-use-stalker-portal.html": "Learn how to configure your authorized Stalker Portal profile in BLAZIN IPTV Player for Windows, including optional compatibility settings.",
  "iptv-app-for-pc.html": "Review BLAZIN IPTV Player as a native Windows IPTV app for PC with M3U, Xtream Codes, STB MAC, Stalker Portal, EPG, search, and favorites.",
  "iptv-download-windows.html": "Download BLAZIN IPTV Player for Windows through the Microsoft Store and test your own legal IPTV source during the 7-day free trial.",
  "iptv-player-for-laptop.html": "Use BLAZIN IPTV Player on a Windows laptop with a compact interface, source profiles, categories, search, favorites, EPG, and playback choices.",
  "iptv-player-for-large-playlists.html": "Manage large user-provided IPTV playlists on Windows with BLAZIN categories, search, favorites, background loading, artwork caching, and playback tools.",
  "iptv-player-for-small-screen-laptop.html": "Explore BLAZIN IPTV Player for smaller Windows laptop screens with a compact layout, organized categories, search, favorites, and playback controls.",
  "iptv-player-for-windows-10.html": "Use BLAZIN IPTV Player on Windows 10 with your own legal M3U, Xtream Codes, STB MAC, or Stalker Portal source and test it free for 7 days.",
  "iptv-player-with-epg.html": "Use BLAZIN IPTV Player with source-provided EPG and TV guide data on Windows, alongside channel categories, search, favorites, and playback.",
  "iptv-player-with-external-player.html": "Use BLAZIN IPTV Player with internal playback or configure an external Windows player such as VLC, MPC-HC, or MPC-BE for compatible streams.",
  "iptv-player-with-themes-windows.html": "Customize BLAZIN IPTV Player on Windows with desktop theme presets while keeping profiles, categories, EPG, favorites, and playback tools together.",
  "legal-iptv-player-windows.html": "Learn how BLAZIN IPTV Player works as player-only Windows software for legal user-provided playlists, portal credentials, streams, and guide data.",
  "lightweight-iptv-player-windows.html": "Explore BLAZIN as a lightweight Windows IPTV player with a compact desktop layout, background loading, search, favorites, EPG, and playback options.",
  "m3u-m3u8-player-windows.html": "Open your own legal M3U and M3U8 playlists in BLAZIN IPTV Player for Windows, then browse available categories, guide data, and playback options.",
  "m3u-plus-player-windows.html": "Load your own legal M3U Plus URL in BLAZIN IPTV Player for Windows and browse the Live TV, Movies, Series, categories, and metadata it supplies.",
  "microsoft-store-iptv-player-windows.html": "Install BLAZIN IPTV Player for Windows from the Microsoft Store and test your own legal IPTV source with a 7-day free trial.",
  "stb-mac-vs-stalker-portal.html": "Compare STB MAC and Stalker Portal setup in BLAZIN IPTV Player for Windows, including portal details, profiles, user agents, and optional fields.",
  "windows-iptv-app.html": "Explore BLAZIN IPTV Player as a Windows IPTV app for user-provided M3U, Xtream Codes, STB MAC, and Stalker Portal sources.",
  "windows-iptv-player-no-subscription.html": "Use BLAZIN IPTV Player without an included IPTV subscription. Bring your own legal source and test the Windows player free for 7 days.",
  "xtream-codes-epg-windows.html": "Use source-provided Xtream Codes EPG data in BLAZIN IPTV Player for Windows with categories, channel logos, search, favorites, and playback.",
  "xtream-codes-vs-m3u.html": "Compare Xtream Codes and M3U playlist workflows in BLAZIN IPTV Player for Windows, including login details, categories, EPG, artwork, and playback.",
  "iptv-stream-player-windows.html": "Use BLAZIN IPTV Player as a Windows IPTV stream player with legal M3U, Xtream Codes, STB MAC, or Stalker Portal sources and flexible playback.",
  "iptv-para-pc.html": "Use BLAZIN IPTV Player para PC on Windows with your own legal M3U, Xtream Codes, STB MAC, or Stalker Portal source and a 7-day trial.",
  "smart-iptv-player-pc.html": "Compare smart IPTV player workflows on PC with BLAZIN source support, Windows navigation, EPG, favorites, profiles, and playback options.",
  "iplayer-vs-iptv-player.html": "Understand the difference between iPlayer terminology and IPTV player software, and review the legal source workflows supported by BLAZIN on Windows.",
  "windows-iptv-player.html": "This legacy Windows IPTV Player URL points to the current BLAZIN Windows IPTV Player guide for source support, setup, EPG, and playback.",
  "m3u-player-windows.html": "This legacy M3U Player URL points to the current BLAZIN M3U guide for local files, remote playlist URLs, M3U Plus, and Windows playback.",
  "xtream-codes-player-windows.html": "This legacy Xtream Codes URL points to the current BLAZIN guide for Windows login, categories, EPG, artwork, favorites, and playback.",
  "stb-mac-player-windows.html": "This legacy STB MAC URL points to the current BLAZIN Windows guide for portal profiles, compatibility settings, categories, and playback.",
  "stalker-portal-player-windows.html": "This legacy Stalker Portal URL points to the current BLAZIN Windows guide for authorized profiles, user agents, optional fields, and playback.",
  "iptv-smarters-alternative-windows.html": "This legacy comparison URL points to the current BLAZIN IPTV Smarters alternative guide for Windows source and playback workflows.",
  "vlc-iptv-player-windows.html": "This legacy VLC IPTV URL points to the current BLAZIN comparison guide for organized Windows IPTV browsing and playback choices."
};

function walk(dir) {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = join(dir, entry.name);
    return entry.isDirectory() ? walk(full) : [full];
  });
}

function attribute(tag, name) {
  const match = tag.match(new RegExp(`\\b${name}\\s*=\\s*(["'])([\\s\\S]*?)\\1`, "i"));
  return match?.[2]?.trim() ?? "";
}

function isDescriptionMeta(tag) {
  return /^<meta\b/i.test(tag) && attribute(tag, "name").toLowerCase() === "description";
}

function decodeBasicEntities(value) {
  return value
    .replace(/&amp;/gi, "&")
    .replace(/&quot;/gi, '"')
    .replace(/&#39;|&apos;/gi, "'")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">");
}

function escapeAttribute(value) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function fallbackDescription(html, relativePath) {
  const title = decodeBasicEntities(
    html.match(/<title\b[^>]*>([\s\S]*?)<\/title>/i)?.[1]
      ?.replace(/<[^>]+>/g, " ")
      ?.replace(/\s+/g, " ")
      ?.trim() ?? "BLAZIN IPTV Player"
  );
  const cleanTitle = title
    .replace(/\s*[|–—-]\s*BLAZIN(?: IPTV Player)?(?:.*)?$/i, "")
    .trim();
  const pageName = cleanTitle || basename(relativePath, ".html").replace(/[-_]+/g, " ");
  return `Explore ${pageName} for BLAZIN IPTV Player on Windows, including legal source setup, supported features, navigation, and playback guidance.`;
}

const htmlFiles = walk(docs).filter((file) => file.toLowerCase().endsWith(".html"));
let changed = 0;
let skipped = 0;

for (const file of htmlFiles) {
  let html = readFileSync(file, "utf8");
  if (!/<html\b/i.test(html) || !/<head\b/i.test(html)) {
    skipped += 1;
    continue;
  }

  const relativePath = relative(docs, file).replaceAll("\\", "/");
  const metaTags = [...html.matchAll(/<meta\b[^>]*>/gi)].map((match) => match[0]);
  const currentDescriptionTag = metaTags.find(isDescriptionMeta);
  const currentDescription = currentDescriptionTag ? attribute(currentDescriptionTag, "content") : "";
  const description = currentDescription || descriptions[relativePath] || fallbackDescription(html, relativePath);
  const normalizedTag = `<meta name="description" content="${escapeAttribute(description)}">`;

  let withoutDescriptions = html.replace(/<meta\b[^>]*>/gi, (tag) => isDescriptionMeta(tag) ? "" : tag);
  const titlePattern = /<title\b[^>]*>[\s\S]*?<\/title>/i;

  if (titlePattern.test(withoutDescriptions)) {
    withoutDescriptions = withoutDescriptions.replace(titlePattern, (titleTag) => `${titleTag}${normalizedTag}`);
  } else {
    withoutDescriptions = withoutDescriptions.replace(/<head\b[^>]*>/i, (headTag) => `${headTag}${normalizedTag}`);
  }

  if (withoutDescriptions !== html) {
    writeFileSync(file, withoutDescriptions, "utf8");
    changed += 1;
    console.log(`Updated ${relativePath}`);
  }
}

console.log(`Meta description pass complete: ${htmlFiles.length} HTML files checked, ${changed} updated, ${skipped} non-page verification files skipped.`);

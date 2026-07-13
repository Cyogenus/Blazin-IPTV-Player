import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const root = new URL("../docs/", import.meta.url).pathname.replace(/^\/(.:)/, "$1");
const store = "https://apps.microsoft.com/detail/9NQ5S0FFCN8T?cid=Blazin_website";

const pages = [
  {
    slug: "windows-iptv-player",
    title: "Windows IPTV Player for Windows 10 & 11 | BLAZIN",
    description: "Use BLAZIN IPTV Player on Windows 10 or 11 with your own legal M3U, Xtream Codes, STB MAC, or Stalker Portal source. Try it free for 7 days.",
    h1: "A Windows IPTV Player Built for Windows 10 and 11",
    intro: "BLAZIN IPTV Player brings Live TV, Movies, and Series into a compact Windows desktop workflow. Add your own legal IPTV source, then browse categories, search, save favorites, and choose internal or external playback.",
    image: "live-tv-playlist.png",
    imageAlt: "BLAZIN IPTV Player Live TV categories on Windows",
    sectionTitle: "What to expect from an IPTV player for Windows",
    body: "A useful desktop player should support the source format you already have and stay comfortable on both laptops and desktop displays. BLAZIN supports local M3U files, M3U and M3U Plus URLs, Xtream Codes login, STB MAC login, and Stalker Portal login.",
    cards: [["Windows-first workflow", "Run the app directly on Windows 10 or Windows 11 without moving your setup into a mobile interface."], ["Organized browsing", "Use Live TV, Movies, Series, categories, search, and favorites when those items are supplied by your source."], ["Playback choice", "Use the internal player or configure an external player such as VLC, MPC-HC, or MPC-BE."]],
    steps: ["Install the app from Microsoft Store and start the 7-day free trial.", "Choose the login or playlist type that matches your legal IPTV source.", "Confirm that your source loads its available categories, logos, posters, and EPG data.", "Test playback, search, favorites, and a theme that suits your Windows setup."],
    faq: [["Does BLAZIN IPTV Player include IPTV channels?", "No. BLAZIN is player-only software. You must provide your own legal IPTV source."], ["Which Windows versions are supported?", "BLAZIN IPTV Player supports Windows 10 and Windows 11."]],
    related: ["best-iptv-player-for-windows", "iptv-player-windows-11", "iptv-player-for-pc-without-emulator"]
  },
  {
    slug: "best-iptv-player-for-windows",
    title: "Best IPTV Player for Windows: What to Compare | BLAZIN",
    description: "Compare the features that matter in an IPTV player for Windows, including source support, EPG, search, favorites, and playback. Try BLAZIN for 7 days.",
    h1: "How to Choose the Best IPTV Player for Windows",
    intro: "The best Windows IPTV player is the one that fits your legal source, your screen, and your playback preferences. BLAZIN gives you seven days to test those details with the source you already use.",
    image: "blue-theme.png",
    imageAlt: "BLAZIN IPTV Player blue theme on Windows",
    sectionTitle: "A practical Windows IPTV player checklist",
    body: "Start with compatibility rather than a long feature count. Check the exact sign-in method your source supplies, whether guide and artwork data appear as expected, and whether you prefer an internal player or an external app.",
    cards: [["Match your source", "Verify M3U, M3U Plus, Xtream Codes, STB MAC, or Stalker Portal support before choosing."], ["Test everyday tools", "Try categories, search, favorites, Live TV, Movies, and Series with your own source."], ["Check playback", "Compare internal playback with an external VLC or MPC workflow on your own Windows PC."]],
    steps: ["List the credentials or playlist format supplied by your legal source.", "Install BLAZIN through Microsoft Store for the 7-day free trial.", "Check guide data, logos, and posters only where your source provides them.", "Test navigation and playback on the Windows device you use most."],
    faq: [["What makes an IPTV player best for Windows?", "It should match your source format, work well on your Windows device, and provide the browsing and playback controls you actually use."], ["Can I test BLAZIN before deciding?", "Yes. Microsoft Store offers a 7-day free trial of BLAZIN IPTV Player."]],
    related: ["windows-iptv-player", "iptv-player-windows-11", "epg-iptv-player-windows"]
  },
  {
    slug: "iptv-player-windows-11",
    title: "IPTV Player for Windows 11 | Native BLAZIN App",
    description: "BLAZIN is an IPTV player for Windows 11 with M3U, Xtream Codes, STB MAC, Stalker Portal, EPG, search, favorites, and a 7-day free trial.",
    h1: "IPTV Player for Windows 11",
    intro: "Use a desktop IPTV player designed to run directly on Windows 11. BLAZIN supports several common playlist and portal logins while keeping Live TV, Movies, Series, search, favorites, and playback settings together.",
    image: "green-theme.png",
    imageAlt: "BLAZIN IPTV Player running with a green theme on Windows 11",
    sectionTitle: "A direct Windows 11 desktop experience",
    body: "BLAZIN installs through Microsoft Store and does not require an Android emulator. It is suited to Windows desktops, laptops, Surface devices, and Windows PCs connected to a larger display.",
    cards: [["Multiple source types", "Open M3U files or URLs, use M3U Plus, or sign in with Xtream Codes, STB MAC, or Stalker Portal details."], ["Source-provided metadata", "View EPG, channel logos, movie posters, and series posters when your source includes compatible data."], ["Personal setup", "Choose themes, set a custom user agent when needed, and use advanced Stalker or STB compatibility fields."]],
    steps: ["Get BLAZIN IPTV Player from Microsoft Store on Windows 11.", "Add the details from your own legal IPTV source.", "Browse the sections and categories that source makes available.", "Test internal playback or select your preferred external player."],
    faq: [["Does BLAZIN require BlueStacks on Windows 11?", "No. BLAZIN IPTV Player runs directly on Windows 11 without an Android emulator."], ["Is Windows 10 also supported?", "Yes. BLAZIN IPTV Player supports both Windows 10 and Windows 11."]],
    related: ["windows-iptv-player", "best-iptv-player-for-windows", "iptv-player-for-pc-without-emulator"]
  },
  {
    slug: "m3u-player-windows",
    title: "M3U Player for Windows | Files, URLs & M3U Plus",
    description: "Load your own legal M3U file, M3U URL, or M3U Plus source in BLAZIN IPTV Player for Windows 10 and 11. Includes a 7-day free trial.",
    h1: "M3U Player for Windows",
    intro: "BLAZIN IPTV Player opens local M3U playlist files and remote M3U playlist URLs on Windows. It also supports M3U Plus URLs for sources that use that format.",
    image: "live-tv-playlist.png",
    imageAlt: "M3U playlist categories in BLAZIN IPTV Player for Windows",
    sectionTitle: "Choose the M3U workflow your source provides",
    body: "Use a local file when your legal source gives you a saved playlist, or paste a URL when it supplies a remote M3U or M3U Plus address. The content and metadata shown in the app depend on the data inside that source.",
    cards: [["Local M3U files", "Open a playlist file already saved on your Windows PC."], ["M3U URLs", "Paste a remote playlist address supplied by your legal source."], ["M3U Plus", "Use M3U Plus URLs and browse available sections and categories when included."]],
    steps: ["Install BLAZIN and start the 7-day free trial.", "Choose Open Playlist File or Paste M3U URL.", "Select your file or paste the complete URL.", "Review the categories and metadata provided by the playlist, then test playback."],
    faq: [["Does BLAZIN provide an M3U playlist?", "No. You must provide your own legal M3U file or URL."], ["Can it open both local and remote M3U playlists?", "Yes. BLAZIN supports local M3U files and M3U playlist URLs, as well as M3U Plus URLs."]],
    related: ["windows-iptv-player", "xtream-codes-player-windows", "epg-iptv-player-windows"]
  },
  {
    slug: "xtream-codes-player-windows",
    title: "Xtream Codes Player for Windows | BLAZIN IPTV Player",
    description: "Use your own legal Xtream Codes login with BLAZIN IPTV Player on Windows 10 or 11. Browse available Live TV, Movies, Series, EPG, and artwork.",
    h1: "Xtream Codes Player for Windows",
    intro: "If your legal IPTV source supplies a server address, username, and password for Xtream Codes access, BLAZIN IPTV Player provides a dedicated Windows login workflow.",
    image: "xtream-codes-profile.png",
    imageAlt: "Xtream Codes profile fields in BLAZIN IPTV Player",
    sectionTitle: "Use the Xtream Codes details you already have",
    body: "Xtream Codes can organize Live TV, Movies, and Series and may include categories, EPG, logos, and posters. Availability is determined by your source; BLAZIN displays compatible data when it is supplied.",
    cards: [["Dedicated login", "Enter the server URL, username, and password issued for your legal source."], ["Organized sections", "Browse Live TV, Movies, and Series where your source exposes those sections."], ["Profiles and playback", "Save a reusable profile and choose internal or external playback for your Windows setup."]],
    steps: ["Select the Xtream Codes or Xtream/M3U profile type.", "Enter the exact server URL, username, and password from your legal source.", "Load the source and review the sections it returns.", "Use search, favorites, categories, and playback options as needed."],
    faq: [["Does BLAZIN issue Xtream Codes accounts?", "No. BLAZIN is a player. You must supply your own legal Xtream Codes login."], ["Will every Xtream source include EPG and posters?", "No. EPG, logos, posters, categories, Movies, and Series depend on what your source provides."]],
    related: ["m3u-player-windows", "epg-iptv-player-windows", "windows-iptv-player"]
  },
  {
    slug: "stb-mac-player-windows",
    title: "STB MAC Player for Windows | BLAZIN IPTV Player",
    description: "Use your own legal STB MAC portal details in BLAZIN IPTV Player for Windows, with advanced compatibility fields and internal or external playback.",
    h1: "STB MAC IPTV Player for Windows",
    intro: "BLAZIN IPTV Player supports STB MAC style portal login on Windows for users whose legal IPTV source supplies a compatible portal URL and MAC address.",
    image: "stb-mac-stalker-profile.png",
    imageAlt: "STB MAC and Stalker profile settings in BLAZIN IPTV Player",
    sectionTitle: "A Windows workflow for STB MAC credentials",
    body: "Enter the portal and MAC details assigned to your source. Advanced compatibility fields, including custom user agent and additional Stalker/STB profile values, are available for setups that require them.",
    cards: [["Portal and MAC login", "Use the compatible portal URL and MAC address supplied for your legal source."], ["Compatibility controls", "Configure custom user agent and advanced STB or Stalker fields when your setup needs them."], ["Windows playback", "Use the internal player or send playback to a configured external player."]],
    steps: ["Choose an STB MAC profile in BLAZIN IPTV Player.", "Enter the portal URL and MAC address exactly as supplied.", "Add advanced compatibility values only when your source requires them.", "Load the profile and test the sections and playback returned by your source."],
    faq: [["Does BLAZIN provide a portal or MAC address?", "No. You must provide your own legal, compatible portal and MAC details."], ["Are advanced STB fields required for every login?", "No. Use them only when your source or setup requires additional compatibility values."]],
    related: ["stalker-portal-player-windows", "windows-iptv-player", "epg-iptv-player-windows"]
  },
  {
    slug: "stalker-portal-player-windows",
    title: "Stalker Portal Player for Windows | BLAZIN IPTV Player",
    description: "Connect your own legal Stalker Portal source to BLAZIN IPTV Player on Windows 10 or 11, with profiles, compatibility settings, and playback choice.",
    h1: "Stalker Portal Player for Windows",
    intro: "BLAZIN IPTV Player offers a Stalker Portal login workflow for Windows users who already have authorized portal details from a legal IPTV source.",
    image: "stb-mac-stalker-profile.png",
    imageAlt: "Advanced Stalker Portal profile options in BLAZIN IPTV Player",
    sectionTitle: "Configure a Stalker Portal profile on Windows",
    body: "Start with the portal URL and MAC information supplied for your account. For compatible setups, BLAZIN also exposes custom user agent and advanced Stalker fields that can help match required profile values.",
    cards: [["Saved profiles", "Store and reuse portal settings without retyping them each session."], ["Advanced fields", "Use optional device, profile, signature, metrics, timezone, and related compatibility values when required."], ["Available content", "Browse categories, Live TV, Movies, Series, guide data, and artwork only when your source provides them."]],
    steps: ["Create a Stalker Portal profile.", "Enter the authorized portal and MAC details from your source.", "Configure optional compatibility fields only if needed.", "Load the profile and test navigation and playback."],
    faq: [["Is BLAZIN a Stalker Portal provider?", "No. BLAZIN is player-only software and does not provide portal access or provider accounts."], ["Can I customize the user agent?", "Yes. BLAZIN includes custom user agent settings for compatible Stalker and STB workflows."]],
    related: ["stb-mac-player-windows", "windows-iptv-player", "epg-iptv-player-windows"]
  },
  {
    slug: "epg-iptv-player-windows",
    title: "IPTV Player with EPG for Windows | BLAZIN TV Guide",
    description: "View EPG and TV guide data in BLAZIN IPTV Player for Windows when your own legal IPTV source provides compatible program information.",
    h1: "IPTV Player with EPG for Windows",
    intro: "BLAZIN IPTV Player can show an EPG and TV guide alongside Live TV when your legal IPTV source supplies compatible program data.",
    image: "live-tv-epg.png",
    imageAlt: "EPG TV guide in BLAZIN IPTV Player for Windows",
    sectionTitle: "How EPG support works",
    body: "The app does not create guide listings. It reads compatible EPG information made available by the user's source. If a source does not include valid guide data, channels may still load without schedules.",
    cards: [["Program context", "See current and upcoming guide details when they are present in the source."], ["Channel browsing", "Use the guide with categories, search, favorites, and channel logos when those are supplied."], ["Source-dependent data", "Guide coverage, timing, and completeness depend on the source rather than the player."]],
    steps: ["Load your legal M3U, Xtream Codes, STB MAC, or Stalker Portal source.", "Open Live TV and select a category or channel.", "Check whether compatible EPG data is returned for those channels.", "If listings are missing, verify the guide data with the source that supplied your access."],
    faq: [["Does BLAZIN supply EPG listings?", "No. BLAZIN displays compatible guide data provided by your own legal IPTV source."], ["Why might a channel have no guide information?", "The source may not provide EPG data for that channel, or the returned data may be missing or incompatible."]],
    related: ["windows-iptv-player", "m3u-player-windows", "xtream-codes-player-windows"]
  },
  {
    slug: "vlc-alternative-iptv-player",
    title: "VLC Alternative IPTV Player for Windows | BLAZIN",
    description: "Compare a playlist-focused Windows IPTV interface with opening streams directly in VLC. BLAZIN also supports internal and external player workflows.",
    h1: "A VLC Alternative for Organized IPTV Playback on Windows",
    intro: "VLC is a versatile media player. BLAZIN is a Windows IPTV player for users who also want source profiles, categories, Live TV, Movies, Series, EPG, search, and favorites around playback.",
    image: "internal-vlc-player.png",
    imageAlt: "Internal playback window in BLAZIN IPTV Player",
    sectionTitle: "Choose a workflow, not a rivalry",
    body: "You do not have to stop using VLC. BLAZIN offers an internal player and can also launch an external player such as VLC. That makes it useful when you want IPTV-focused browsing while keeping a familiar playback option.",
    cards: [["IPTV organization", "Manage supported source profiles and browse source-provided sections and categories."], ["Internal playback", "Play inside BLAZIN when you prefer an integrated window."], ["External VLC option", "Configure VLC as an external player when that better fits a stream or personal preference."]],
    steps: ["Add your own legal source to BLAZIN.", "Browse to a Live TV channel, movie, or episode supplied by that source.", "Try internal playback for an integrated experience.", "Configure external VLC playback and compare the workflow on your PC."],
    faq: [["Does BLAZIN replace VLC for every media task?", "No. BLAZIN is focused on IPTV source organization and playback, while VLC is a general-purpose media player."], ["Can BLAZIN still use VLC externally?", "Yes. BLAZIN supports external player workflows, including VLC."]],
    related: ["windows-iptv-player", "iptv-player-for-pc-without-emulator", "epg-iptv-player-windows"]
  },
  {
    slug: "iptv-player-for-pc-without-emulator",
    title: "IPTV Player for PC Without BlueStacks or an Emulator",
    description: "Run BLAZIN IPTV Player directly on Windows 10 or 11 without BlueStacks or another Android emulator. Bring your own legal IPTV source.",
    h1: "IPTV Player for PC Without an Emulator",
    intro: "BLAZIN IPTV Player runs directly on Windows 10 and Windows 11, so you can use an IPTV player on your PC without BlueStacks or another Android emulator.",
    image: "live-tv-playlist.png",
    imageAlt: "Native BLAZIN IPTV Player desktop interface on a Windows PC",
    sectionTitle: "Keep your IPTV workflow on the Windows desktop",
    body: "Install through Microsoft Store, add your own legal source, and manage playback with familiar Windows paths and settings. The compact layout works on desktops, laptops, and smaller Windows screens.",
    cards: [["Direct installation", "Install and launch the Windows app without configuring an Android environment."], ["Desktop player paths", "Choose an external VLC, MPC-HC, or MPC-BE executable when you prefer external playback."], ["Windows controls", "Use themes, custom user agent settings, profiles, search, favorites, and internal playback in one app."]],
    steps: ["Open the BLAZIN listing in Microsoft Store.", "Start the 7-day free trial and install on Windows 10 or 11.", "Add your own legal playlist or portal login.", "Choose internal playback or configure an external Windows player."],
    faq: [["Do I need BlueStacks to run BLAZIN?", "No. BLAZIN IPTV Player runs directly on Windows 10 and Windows 11."], ["Does the app include a subscription?", "No. It does not provide channels, playlists, subscriptions, or provider accounts. Bring your own legal source."]],
    related: ["windows-iptv-player", "iptv-player-windows-11", "vlc-alternative-iptv-player"]
  },
  {
    slug: "iptvnator-alternative",
    title: "IPTVnator Alternative for Windows | Compare BLAZIN",
    description: "Considering an IPTVnator alternative on Windows? Review BLAZIN support for M3U, Xtream Codes, STB MAC, Stalker Portal, EPG, and playback options.",
    h1: "IPTVnator Alternative for Windows",
    intro: "If you are comparing IPTVnator with another Windows IPTV player, evaluate the workflows that matter for your own legal source. BLAZIN focuses on several playlist and portal login types in a compact Windows app.",
    image: "blue-theme.png",
    imageAlt: "BLAZIN IPTV Player desktop interface for Windows",
    sectionTitle: "What to compare in an IPTVnator alternative",
    body: "Feature availability in IPTVnator can vary by release and platform. Instead of assuming a missing feature, compare current versions using your actual source format, guide data, navigation habits, and preferred playback method.",
    cards: [["Source compatibility", "BLAZIN supports M3U, M3U Plus, Xtream Codes, STB MAC, and Stalker Portal workflows."], ["Browsing tools", "Test source-provided categories, Live TV, Movies, Series, EPG, logos, posters, search, and favorites."], ["Playback flexibility", "Compare integrated playback with external VLC, MPC-HC, or MPC-BE workflows."]],
    steps: ["Identify the exact playlist or login type you use.", "Review the current IPTVnator version for that workflow.", "Use BLAZIN’s 7-day free trial with the same legal source.", "Compare setup effort, browsing, guide display, and playback on your Windows PC."],
    faq: [["Is this claiming IPTVnator lacks BLAZIN features?", "No. IPTVnator capabilities can vary by version and platform. This page explains what BLAZIN supports so you can compare current products yourself."], ["Does BLAZIN include IPTV content?", "No. BLAZIN is player-only software for your own legal IPTV source."]],
    related: ["windows-iptv-player", "iptv-smarters-alternative-windows", "best-iptv-player-for-windows"]
  },
  {
    slug: "iptv-smarters-alternative-windows",
    title: "IPTV Smarters Alternative for Windows | BLAZIN Compare",
    description: "Compare BLAZIN IPTV Player vs IPTV Smarters Pro for a Windows workflow. Review source formats, EPG, playback, and a native Windows 10/11 experience.",
    h1: "IPTV Smarters Alternative for Windows",
    intro: "People comparing IPTV Smarters Pro, Smarters Player Lite, and BLAZIN should focus on the version and platform they plan to use. BLAZIN is a Windows 10 and 11 player for users who bring their own legal IPTV source.",
    image: "xtream-codes-profile.png",
    imageAlt: "BLAZIN IPTV Player profile setup on Windows",
    sectionTitle: "BLAZIN IPTV Player vs IPTV Smarters Pro",
    body: "IPTV Smarters features and availability vary by version and platform, and common versions support popular IPTV login workflows. The comparison below describes BLAZIN precisely without assuming what a particular Smarters build includes.",
    cards: [["Platform focus", "BLAZIN is designed for Windows 10 and Windows 11; Smarters availability and interface vary by product version and platform."], ["Bring-your-own source", "Both are player-style workflows commonly used with user-supplied source details. BLAZIN never includes channels or subscriptions."], ["BLAZIN specifics", "BLAZIN supports M3U, M3U Plus, Xtream Codes, STB MAC, Stalker Portal, custom user agents, and advanced portal fields."]],
    comparison: true,
    steps: ["Confirm which IPTV Smarters product, version, and platform you are comparing.", "List the source type and playback features you actually need.", "Try BLAZIN for seven days using your own legal source.", "Compare navigation, EPG availability, playback, and Windows desktop fit side by side."],
    faq: [["Is BLAZIN affiliated with IPTV Smarters Pro?", "No. BLAZIN IPTV Player is a separate Windows player."], ["Does this page claim IPTV Smarters Pro lacks specific features?", "No. Smarters capabilities vary by version and platform. Check the current product documentation for the version you use."], ["Does BLAZIN provide IPTV service?", "No. BLAZIN provides player software only. You must provide your own legal IPTV source."]],
    related: ["iptvnator-alternative", "windows-iptv-player", "best-iptv-player-for-windows"]
  }
];

const names = Object.fromEntries(pages.map((p) => [p.slug, p.h1]));
const escapeJson = (value) => JSON.stringify(value).replace(/</g, "\\u003c");

function comparisonTable() {
  return `<section class="section"><div class="container"><p class="kicker">Side-by-side guide</p><h2>Compare the current Windows workflow</h2><div class="table-wrap"><table class="compare"><thead><tr><th>Area</th><th>BLAZIN IPTV Player</th><th>IPTV Smarters Pro / Smarters Player Lite</th></tr></thead><tbody>
<tr><td>Platform</td><td>Native Windows 10 and 11 app.</td><td>Availability and interface vary by product version and platform.</td></tr>
<tr><td>Source formats</td><td>M3U files and URLs, M3U Plus, Xtream Codes, STB MAC, and Stalker Portal.</td><td>Popular login formats are commonly supported; verify the exact current version.</td></tr>
<tr><td>Guide and artwork</td><td>EPG, logos, and posters appear when supplied by the user's source.</td><td>Support and presentation vary by version and by the user's source.</td></tr>
<tr><td>Playback</td><td>Internal player plus external VLC and MPC-style workflows.</td><td>Playback options vary by version and platform.</td></tr>
<tr><td>Trial</td><td>7-day free trial through Microsoft Store.</td><td>Check the current listing and terms for the specific Smarters product.</td></tr>
</tbody></table></div></div></section>`;
}

function html(p) {
  const faqSchema = {"@context":"https://schema.org","@type":"FAQPage","mainEntity":p.faq.map(([q,a])=>({"@type":"Question","name":q,"acceptedAnswer":{"@type":"Answer","text":a}}))};
  return `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>${p.title}</title><meta name="description" content="${p.description}"><meta name="robots" content="index, follow, max-image-preview:large">
<link rel="canonical" href="https://windowsiptv.com/${p.slug}/"><link rel="icon" href="../assets/favicon.png" type="image/png"><link rel="stylesheet" href="../assets/style.css">
<meta property="og:type" content="website"><meta property="og:site_name" content="BLAZIN IPTV Player"><meta property="og:title" content="${p.title}"><meta property="og:description" content="${p.description}"><meta property="og:url" content="https://windowsiptv.com/${p.slug}/"><meta property="og:image" content="https://windowsiptv.com/screenshots/${p.image}">
<script type="application/ld+json">${escapeJson(faqSchema)}</script></head><body>
<header class="site-header"><div class="container nav"><a class="brand" href="../"><img class="site-logo" src="../assets/app-icon.png" alt="BLAZIN IPTV Player icon"><span>BLAZIN IPTV Player</span></a><nav class="nav-links" aria-label="Main navigation"><a href="../">Home</a><a href="../download.html">7-Day Trial</a><a href="../features.html">Features</a><a href="../guides.html">Guides</a><a href="../screenshots.html">Screenshots</a><a href="../user-guide.html">User Guide</a><a href="../faq.html">FAQ</a></nav></div></header>
<main><section class="page-title"><div class="container content-narrow"><div class="breadcrumb"><a href="../">Home</a> / ${p.h1}</div><span class="badge-line">Windows 10 &amp; 11 &bull; 7-Day Free Trial</span><h1>${p.h1}</h1><p class="lead">${p.intro}</p><div class="trial-strip"><strong>Player-only software.</strong><span>BLAZIN does not provide channels, playlists, subscriptions, or provider accounts. You must provide your own legal IPTV source.</span></div><div class="actions"><a class="btn primary" href="${store}">Start 7-Day Free Trial</a><a class="btn" href="../screenshots.html">View Screenshots</a></div></div></section>
<section class="section alt"><div class="container side-by-side"><div class="content-band"><p class="kicker">Windows IPTV workflow</p><h2>${p.sectionTitle}</h2><p>${p.body}</p></div><div class="hero-card"><img class="hero-screenshot" src="../screenshots/${p.image}" alt="${p.imageAlt}" width="900" height="506"></div></div></section>
<section class="section"><div class="container"><p class="kicker">What BLAZIN supports</p><h2>Features to test with your own source</h2><div class="grid three">${p.cards.map(([h,b])=>`<article class="card"><h3>${h}</h3><p>${b}</p></article>`).join("")}</div></div></section>
${p.comparison ? comparisonTable() : ""}
<section class="section alt"><div class="container content-narrow"><p class="kicker">7-day trial checklist</p><h2>Test the workflow before you decide</h2><ol class="steps">${p.steps.map((s)=>`<li>${s}</li>`).join("")}</ol></div></section>
<section class="section faq-section"><div class="container content-narrow"><p class="kicker">FAQ</p><h2>Frequently asked questions</h2><div class="faq-list">${p.faq.map(([q,a])=>`<details class="faq-item"><summary>${q}</summary><p>${a}</p></details>`).join("")}</div></div></section>
<section class="section alt"><div class="container"><p class="kicker">Related guides</p><h2>Continue exploring BLAZIN IPTV Player</h2><div class="grid three">${p.related.map((slug)=>`<article class="card"><h3><a href="../${slug}/">${names[slug]}</a></h3><p>Review this focused guide and compare it with the source and Windows workflow you use.</p></article>`).join("")}</div></div></section>
<section class="section"><div class="container cta-band"><p class="kicker">Microsoft Store</p><h2>Try BLAZIN IPTV Player free for 7 days</h2><p class="lead">Install the Windows app, add your own legal IPTV source, and test the supported workflow on your PC.</p><div class="actions store-with-badge"><a class="btn primary" href="${store}">Open Microsoft Store</a><a class="btn" href="../legal-disclaimer.html">Read Legal Notice</a></div><p class="small">No channels, playlists, subscriptions, provider accounts, or copyrighted content are included.</p></div></section></main>
<footer class="site-footer"><div class="container footer-grid"><div><strong>BLAZIN IPTV Player</strong><br><span>Windows IPTV player for user-provided legal sources.</span></div><div class="footer-links"><a href="../">Home</a><a href="../download.html">7-Day Trial</a><a href="../features.html">Features</a><a href="../guides.html">Guides</a><a href="../screenshots.html">Screenshots</a><a href="../user-guide.html">User Guide</a><a href="../faq.html">FAQ</a><a href="../legal-disclaimer.html">Legal Disclaimer</a><a href="../windows-iptv-player/">Windows IPTV Player</a><a href="../best-iptv-player-for-windows/">Best IPTV Player for Windows</a><a href="../iptv-player-windows-11/">IPTV Player for Windows 11</a><a href="../m3u-player-windows/">M3U Player Windows</a><a href="../xtream-codes-player-windows/">Xtream Codes Player Windows</a><a href="../stb-mac-player-windows/">STB MAC Player Windows</a><a href="../stalker-portal-player-windows/">Stalker Portal Player Windows</a><a href="../epg-iptv-player-windows/">EPG IPTV Player Windows</a><a href="../iptv-smarters-alternative-windows/">IPTV Smarters Alternative</a><a href="../iptvnator-alternative/">IPTVnator Alternative</a><a href="../vlc-alternative-iptv-player/">VLC Alternative</a><a href="../iptv-player-for-pc-without-emulator/">IPTV Player Without Emulator</a><a href="https://github.com/Cyogenus/Blazin-IPTV-Player" rel="noopener" target="_blank">GitHub</a><a href="https://www.reddit.com/r/BlazinIPTVPlayer/" rel="noopener" target="_blank">Reddit</a></div></div></footer></body></html>\n`;
}

const manuallyMaintainedPages = new Set([
  // Phase 2: full sales pages are hand-written so the generator does not flatten them.
  "windows-iptv-player",
  "best-iptv-player-for-windows",
  "iptv-player-windows-11",
  // Phase 3: source workflow pages are hand-written so the generator does not flatten them.
  "m3u-player-windows",
  "xtream-codes-player-windows",
  "stb-mac-player-windows",
  "stalker-portal-player-windows",
  "epg-iptv-player-windows",
  // Phase 4: long-form comparison pages are maintained separately.
  "iptvnator-alternative",
  "iptv-smarters-alternative-windows",
  "vlc-alternative-iptv-player",
  "iptv-player-for-pc-without-emulator"
]);

let generated = 0;
for (const page of pages) {
  if (manuallyMaintainedPages.has(page.slug)) continue;
  const dir = join(root, page.slug);
  mkdirSync(dir, {recursive: true});
  writeFileSync(join(dir, "index.html"), html(page), "utf8");
  generated += 1;
}

console.log(`Generated ${generated} standard landing pages; sales, source workflow, and comparison pages are manually maintained.`);

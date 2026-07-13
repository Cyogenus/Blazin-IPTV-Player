# Phase 6 Final QA and Polish

Final QA pass after rebuilding the BLAZIN IPTV Player website through Phases 1–5.

## Polish completed

- Removed public-facing build/SEO wording such as “long-tail,” “placeholder,” and “generic filler” from website copy.
- Cleaned mechanical headings on support pages so they read like real user-facing Windows IPTV guides.
- Strengthened homepage legal wording so it explicitly states that BLAZIN IPTV Player does not provide IPTV channels, playlists, subscriptions, provider accounts, or copyrighted content.
- Confirmed Microsoft Store campaign tracking remains consistent across website links.
- Confirmed the sitemap only includes clean public pages and does not include technical verification files, 404 pages, private research files, or noindex research-hold pages.
- Confirmed old duplicate pages have canonical handling and are not included in the sitemap as competing URLs.

## QA results

- HTML files checked: 64
- Sitemap URLs: 45
- Broken local links: 0
- Microsoft Store links missing `cid=Blazin_website`: 0
- Missing canonical tags on public pages: 0
- Duplicate title tags: 0
- Duplicate meta descriptions: 0
- Public pages missing player-only legal wording: 0
- Technical/verification URLs in sitemap: 0
- Placeholder/SEO build-language hits in public docs: 0

## Validation script

`node scripts/check-seo-pages.mjs` passed.

Result:

```text
Checked 12 pages: metadata, headings, legal copy, JSON-LD, links, assets, CTAs, and sitemap all passed.
```

## Final indexable page groups

### Core product and source pages

- `/`
- `/windows-iptv-player/`
- `/best-iptv-player-for-windows/`
- `/iptv-player-windows-11/`
- `/m3u-player-windows/`
- `/xtream-codes-player-windows/`
- `/stb-mac-player-windows/`
- `/stalker-portal-player-windows/`
- `/epg-iptv-player-windows/`

### Comparison pages

- `/iptv-smarters-alternative-windows/`
- `/iptvnator-alternative/`
- `/vlc-alternative-iptv-player/`
- `/iptv-player-for-pc-without-emulator/`

### Cleaned support and long-tail pages

The sitemap keeps rebuilt useful guides such as laptop, large playlist, legal player-only, Microsoft Store trial, M3U/M3U8, M3U Plus, Xtream Codes vs M3U, Xtream Codes EPG, Windows 10, and external player workflows.

## Pages intentionally held out of sitemap

These pages remain noindex / review-later until they can be researched and rebuilt properly:

- `ssiptv-alternative-windows.html`
- `tivimate-alternative-windows.html`
- `iptv-player-zero-alternative-windows.html`
- `kodi-iptv-setup-vs-blazin.html`
- `iplayer-vs-iptv-player.html`
- `smart-iptv-player-pc.html`
- `iptv-stream-player-windows.html`
- `iptv-para-pc.html`

## Recommended next action

Push the completed site, wait for GitHub Pages to deploy, then submit or resubmit:

```text
https://windowsiptv.com/sitemap.xml
```

Use URL Inspection for the strongest rebuilt pages first:

- `https://windowsiptv.com/windows-iptv-player/`
- `https://windowsiptv.com/best-iptv-player-for-windows/`
- `https://windowsiptv.com/iptv-player-windows-11/`
- `https://windowsiptv.com/m3u-player-windows/`
- `https://windowsiptv.com/xtream-codes-player-windows/`
- `https://windowsiptv.com/iptv-smarters-alternative-windows/`
- `https://windowsiptv.com/iptvnator-alternative/`

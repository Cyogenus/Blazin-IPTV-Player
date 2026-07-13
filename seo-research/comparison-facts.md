# Phase 4 comparison facts

These notes are kept outside `/docs` and are not part of the public website. They document the public sources checked before rebuilding the comparison pages.

## IPTVnator

Verified public features:
- Cross-platform/open-source IPTV player positioning.
- M3U/M3U8 playlist support.
- EPG/TV guide support.
- External player integration such as VLC/MPV is described publicly.
- Public repository materials mention remote M3U handling and Xtream/Stalker proxy requests.
- Public FAQ/content says IPTVnator does not provide content and users add their own playlist/subscription.

Sources checked:
- https://github.com/4gray/iptvnator
- https://iptvnator.org/
- https://github.com/4gray/iptvnator/releases

Safe BLAZIN angle:
- Favor BLAZIN for a Windows-first commercial desktop workflow, STB MAC and Stalker setup controls, custom user agent fields, external Windows players, and Microsoft Store trial.

Claims not made:
- Do not claim IPTVnator lacks M3U, EPG, Xtream, Stalker, favorites, or external player support.
- Do not claim BLAZIN is open-source.

## IPTV Smarters Pro / Smarters-style Windows listings

Verified public features:
- Microsoft Store listings for Smarters-style apps mention M3U files/URLs and local playback.
- Some Microsoft Store listings mention Xtream Code / Xtream Codes API.
- Some Microsoft Store listings mention Stalker Portal / STB support.
- App-family features vary by listing, version, and platform.

Sources checked:
- https://apps.microsoft.com/detail/9ng6jgcqdssh
- https://www.microsoft.com/en-ca/p/iptv-smarters-expert-premium/9p6hj5zswfb8
- https://play.google.com/store/apps/details?id=com.corey.smartersplayer

Safe BLAZIN angle:
- Favor BLAZIN for Windows-first desktop organization, advanced Stalker/STB fields, custom user agent settings, and internal/external Windows player workflows.

Claims not made:
- Do not claim IPTV Smarters Pro lacks M3U, Xtream Codes, Stalker/STB, EPG, favorites, or Live/Movies/Series universally.
- Do not claim every Smarters listing has the same features.

## VLC media player

Verified public features:
- VLC is a libre/open-source media player and multimedia engine.
- VLC plays multimedia files, discs, streams, devices, and can convert/stream/manipulate streams.
- VLC documentation describes opening a network stream from the Media menu.
- VLC is available across many platforms, including Windows.

Sources checked:
- https://github.com/videolan/vlc
- https://vlc-user-documentation.readthedocs.io/en/latest/userguide/media.html
- https://www.videolan.org/vlc/

Safe BLAZIN angle:
- Favor BLAZIN for IPTV organization, profiles, source login workflows, EPG/artwork/favorites, and using VLC as an optional external player.

Claims not made:
- Do not attack VLC playback quality.
- Do not claim VLC cannot open streams or playlists.

## BlueStacks / Android emulator workflow

Verified public features:
- BlueStacks positions itself as an Android emulator / app player for PC/Mac and cloud gaming platform.
- Public BlueStacks pages emphasize keyboard/mouse controls, game controls, multi-instance, macros, and gaming workflows.
- BlueStacks itself is not an IPTV player; IPTV behavior depends on the Android app installed inside it.

Sources checked:
- https://www.bluestacks.com/
- https://www.bluestacks.com/features/game-controls.html
- https://www.bluestacks.com/features/multi-instance-sync.html

Safe BLAZIN angle:
- Favor BLAZIN for native Windows IPTV use without installing an Android emulator layer.

Claims not made:
- Do not claim emulators cannot run IPTV apps.
- Do not claim BlueStacks is bad software; it is simply not the direct native Windows IPTV workflow.

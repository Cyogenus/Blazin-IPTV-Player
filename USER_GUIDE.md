# BLAZIN IPTV Player User Tutorial

## Introduction

BLAZIN IPTV Player is a Windows desktop IPTV player designed for users who want a simple way to load and watch their own IPTV sources. The player supports multiple playlist and login types, including Stalker Portal, STB MAC, Xtream Codes, M3U Plus URLs, regular M3U playlist URLs, and local M3U playlist files.

BLAZIN IPTV Player also includes **TV Mode**, a large-screen interface for Live TV, Movies, Series, favorites, search, EPG browsing, and fullscreen playback.

BLAZIN IPTV Player does not provide TV channels, movies, subscriptions, playlists, streams, provider accounts, or copyrighted content. You must use your own legal IPTV provider, playlist, portal, or account.

---

## 1. Supported Login and Playlist Types

BLAZIN IPTV Player supports several common IPTV source formats.

### Stalker Portal Example

Use this option if your provider gives you a Stalker portal URL and MAC address.

Example Stalker URL:

```text
http://servername:8008/stalker_portal/c/
```

Example MAC address:

```text
00:1A:79:XX:XX:XX
```

### STB MAC Example

Use this option if your provider gives you an STB MAC portal URL and MAC address.

Example STB MAC URL:

```text
http://servername/c
```

Example MAC address:

```text
00:1A:79:XX:XX:XX
```

### Xtream Codes

Use this option when your provider gives you a server URL, username, and password.

### M3U Plus URL Format

Use this option if your provider gives you a full M3U Plus link.

```text
http://[server-address]:[port]/get.php?username=[your-username]&password=[your-password]&type=m3u_plus
```

### Regular M3U URL Format

Use this option if your provider gives you a direct `.m3u` playlist link.

```text
https://www.servername.com/uslg.m3u
```

### Local Playlist File

BLAZIN can also open local `.m3u` and `.m3u8` playlist files from your computer.

---

## 2. Opening the App

When you open BLAZIN IPTV Player, you will see the main window with login fields across the top and content tabs below.

The main tabs are:

* **Live** — live TV channels
* **Movies** — VOD/movie content when supported by your source
* **Series** — TV series when supported by your source
* **Info** — account or playlist information when available

---

## 3. Choosing a Playback Method

BLAZIN IPTV Player can play streams using either the built-in internal VLC player or an external media player.

### Internal Player

To use the built-in player:

1. Enable **Play in Internal VLC Player**.
2. Load your playlist, portal, or account.
3. Double-click a channel, movie, or episode to play it.

### External Player

To use an external player:

1. Click **Browse** next to the external player path field.
2. Select your media player executable.
3. Load your playlist or portal.
4. Double-click a channel, movie, or episode.

If the internal player is turned off, choose an external media player before playback.

---

## 4. Loading a Stalker Portal

Use this method if your provider gave you a Stalker portal URL and MAC address.

```text
Portal URL: http://servername:8008/stalker_portal/c/
MAC:        00:1A:79:XX:XX:XX
```

Steps:

1. Enter the Stalker portal URL in the **Portal URL** field.
2. Enter your MAC address in the MAC field.
3. Enable the internal player or choose an external player.
4. Click **Get Playlist**.
5. Wait for the available categories to load.

After loading, you can browse Live, Movies, and Series when your source supports them.

---

## 5. Loading an STB MAC Portal

Use this method if your provider gave you an STB MAC portal URL and MAC address.

```text
Portal URL: http://servername/c
MAC:        00:1A:79:XX:XX:XX
```

Steps:

1. Enter the STB MAC portal URL in the **Portal URL** field.
2. Enter your MAC address in the MAC field.
3. Enable the internal player or choose an external player.
4. Click **Get Playlist**.
5. Wait for the playlist categories to load.

If the internal player is enabled, you do not need to select an external media player.

---

## 6. Loading an M3U Plus URL

Use this method if your provider gives you an M3U Plus URL.

```text
http://[server-address]:[port]/get.php?username=[your-username]&password=[your-password]&type=m3u_plus
```

Steps:

1. Open the **Playlist** menu.
2. Click **Paste M3U URL**.
3. Paste the full M3U Plus URL.
4. Confirm.

If the URL includes Xtream login details, the app can detect the server, username, and password and load the playlist using Xtream mode.

---

## 7. Loading a Regular M3U URL

Use this method if you have a direct `.m3u` playlist URL.

```text
https://www.servername.com/uslg.m3u
```

Steps:

1. Open the **Playlist** menu.
2. Click **Paste M3U URL**.
3. Paste the M3U URL.
4. Confirm.

---

## 8. Loading a Local M3U File

If you have a playlist saved on your computer:

1. Open the **Playlist** menu.
2. Click **Open Playlist File**.
3. Select your `.m3u` or `.m3u8` file.
4. Open the file.

The player will read the playlist and display the available channels or items.

---

## 9. Browsing Live TV

The **Live** tab is used for live TV channels.

1. Click the **Live** tab.
2. Open a category.
3. Double-click a channel to play it.

When EPG information is supplied by your source, the Live tab can show current and upcoming program information.

---

## 10. Browsing Movies

The **Movies** tab displays VOD/movie content when supported by your source.

1. Click the **Movies** tab.
2. Open a movie category.
3. Double-click a movie to play it.

When available, movie details can include poster artwork, description, rating, genre, duration, actors, and release information.

---

## 11. Browsing Series

The **Series** tab displays TV series when supported by your source.

1. Click the **Series** tab.
2. Open a series category.
3. Select a series.
4. Choose a season.
5. Choose an episode.
6. Double-click the episode to play it.

The available seasons and episodes depend on the information supplied by your IPTV source.

---

## 12. Using the Internal Media Player

When the internal player opens, you will see BLAZIN's built-in VLC playback window.

The internal player includes:

* **Open** — plays the URL shown in the stream URL box
* **Play/Pause** — starts or pauses playback
* **Stop** — stops playback
* **Save** — saves supported direct media files
* **AR** — changes aspect ratio
* **Buffer** — changes playback buffer/caching
* **Volume** — controls audio volume
* **Seek bar** — allows seeking when supported by the stream
* **Fullscreen** — double-click the video area or press `F`
* **Exit fullscreen** — press `Esc`
* **Previous channel** — press `↑` while Live TV channel navigation is available
* **Next channel** — press `↓` while Live TV channel navigation is available

When you change Live TV channels while fullscreen, the player remains fullscreen and briefly displays the channel name as an on-screen marquee.

---

## 13. Using TV Mode

TV Mode is BLAZIN IPTV Player's large-screen interface for Live TV, Movies, and Series. It is designed for TVs, large monitors, mini PCs, and couch-style navigation while still using the profiles and legal sources you add to the desktop app.

### Opening TV Mode

1. Load your playlist, portal, or saved profile in BLAZIN IPTV Player.
2. Open the **View** menu.
3. Choose **Open VLC TV Mode**.
4. If your build includes the legacy browser option, **Open Browser TV Mode (Legacy)** can be used as a fallback.
5. Select the profile you want to use if TV Mode asks you to choose one.

### Live TV in TV Mode

1. Select **Live TV** from the left navigation rail.
2. Choose a category.
3. Move through the channel list.
4. Select a channel to view its program information.
5. Press `Enter` or use the on-screen Play control to start playback.

When your source supplies EPG data, TV Mode can show the current program, upcoming programs, program descriptions, timing, and the EPG timeline.

### Movies in TV Mode

1. Select **Movies**.
2. Choose a category.
3. Move through the poster grid.
4. Select a movie to view its details.
5. Press `Enter` or use the Play control to start playback.

### Series in TV Mode

1. Select **Series**.
2. Choose a category.
3. Select a series.
4. Choose a season.
5. Choose an episode.
6. Press `Enter` or use the Play control to start the episode.

### Search and Favorites

Use **Search** to quickly filter the current TV Mode section. Use **Favorites** to return to channels, movies, or series you use often without browsing the full source again.

### TV Mode Keyboard Controls

| Key | Action |
| --- | --- |
| `F` | Enter or leave fullscreen TV Mode |
| `G` | Open the Live TV Guide / EPG view |
| `↑` | Move to the previous item; during supported fullscreen Live TV playback, change to the previous channel |
| `↓` | Move to the next item; during supported fullscreen Live TV playback, change to the next channel |
| `←` | Move left across TV Mode rows or grids |
| `→` | Move right across TV Mode rows or grids |
| `Enter` | Open or play the currently selected item |
| `/` | Open Search in Browser TV Mode |
| `Esc` | Close Search or playback view, go back where supported, or leave fullscreen |

### Fullscreen Live TV Channel Switching

When Live TV is playing in the BLAZIN internal player:

1. Press `F` to enter fullscreen.
2. Press `↑` for the previous channel.
3. Press `↓` for the next channel.
4. The channel-name marquee appears briefly after the channel changes.
5. Press `Esc` to leave fullscreen.

This allows you to switch Live TV channels without dropping back to the normal player window.

---

## 14. Downloading a Movie or Series Episode from the Internal Player

BLAZIN IPTV Player includes a **Save** button inside the internal VLC player.

### How to Download

1. Enable **Play in Internal VLC Player**.
2. Open a movie or series episode.
3. Wait for the internal player window to open.
4. Click **Save**.
5. Choose where you want to save the file.
6. Wait for the download to finish.

The Save button works best when the stream URL points directly to a media file such as:

```text
.mp4
.mkv
.avi
.mov
.ts
```

If the URL is a playlist, API endpoint, protected stream, or temporary stream link, saving may not be supported. This depends on how your source delivers the media.

---

## 15. Searching Content

Use the search box at the top-right of the desktop app to quickly find content.

1. Click the **Search** field.
2. Type part of a channel, movie, or series name.
3. The current list will filter based on your search.
4. Clear the search box to show the full list again.

---

## 16. Using Favorites

BLAZIN IPTV Player includes favorites for channels, movies, and series.

### Add an Item to Favorites

1. Right-click a channel, movie, or series.
2. Click **Add to favorites**.

### Remove an Item from Favorites

1. Right-click a saved item.
2. Click **Remove from favorites**.

### Clear Favorites

1. Open the Favorites row for the tab.
2. Right-click it.
3. Choose **Clear all favorites**.

Favorites are kept with the applicable login/source context so different IPTV profiles can remain organized separately.

---

## 17. Using Profiles

Profiles let you save source information so you do not have to enter it every time.

### Open Profile Manager

1. Open the **Profiles** menu.
2. Click **Profile Manager**.

Depending on the source type and app version, Profile Manager can store Xtream, STB MAC/Stalker, M3U URL, and playlist-file based profiles.

### Save Current Login as a Profile

1. Enter or load your current source information.
2. Open **Profile Manager**.
3. Click **Add Current** when available.
4. Enter a profile name.
5. Save it.

### Load a Saved Profile

Load a saved profile from the Profiles menu. Selecting the profile fills or restores the matching source details and lets BLAZIN load that source again.

---

## 18. Understanding the Threads Option

The **Threads** option controls how many threads the app uses when loading playlist data.

Recommended setting:

* Use **5** for normal use.
* Increase it only if you have a very large playlist and your source handles faster loading well.
* Lower it if your source is slow or unstable.

---

## 19. Always on Top

When **Always on Top** is enabled, the BLAZIN IPTV Player window stays above other Windows applications.

---

## 20. Account and Playlist Information

The **Info** tab displays account or playlist information when it is available from your source.

Depending on the source, this may include account status, expiration information, or other provider-supplied details. Not every source returns account information.

---

## 21. Troubleshooting

### Playlist Does Not Load

Check the following:

* Make sure the portal URL or server URL is correct.
* Make sure your username, password, or MAC address is correct.
* Make sure your account is active.
* Try lowering the thread count.
* Check your internet connection.

### Video Does Not Play

* Make sure **Play in Internal VLC Player** is enabled, or choose an external player.
* Try another channel, movie, or episode.
* Some streams may be offline or unavailable from the source.
* If using an external player, make sure the selected player path is correct.

### TV Mode Does Not Show Content

* Make sure the source loads correctly in the main desktop interface first.
* If TV Mode has a profile selector, choose the correct saved profile.
* Wait for categories and artwork to finish loading.
* Try reloading the current TV Mode section.
* If the primary VLC TV Mode has a problem and your build includes it, try **Browser TV Mode (Legacy)** as a fallback.

### EPG Does Not Show

EPG data depends on your IPTV source. If the source does not supply guide information, Live TV may still show channels without program-guide data.

### Movies or Series Are Missing

Not every source supports Movies or Series through every login type. If those sections are empty, the source may not include that content or may not expose it through the selected login method.

### Save Button Does Not Save the Video

The Save button only works when the current stream points to a supported downloadable media file. API links, temporary links, protected streams, and playlists may not be directly downloadable.

---

## 22. Best Practices

For the best experience:

* Use your own legal IPTV account, portal, or playlist.
* Save frequently used source details as profiles.
* Use TV Mode for large-screen Live TV, Movies, and Series browsing.
* Use `F` for fullscreen and `↑` / `↓` for supported fullscreen Live TV channel switching.
* Use search and favorites to manage large playlists.
* Keep the thread count at the default unless you need to adjust loading behavior.
* Use the internal player for integrated playback or an external player when you prefer another media player.
* Use the Save button only for media you are authorized to save.

---

## Important Notice

BLAZIN IPTV Player is only a media player. It does not provide, sell, host, stream, or include channels, movies, playlists, IPTV subscriptions, provider accounts, or copyrighted content.

Users are responsible for adding their own legal IPTV sources and following all applicable laws and service agreements.

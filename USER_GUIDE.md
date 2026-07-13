# BLAZIN IPTV Player User Tutorial

## Introduction

BLAZIN IPTV Player is a Windows desktop IPTV player designed for users who want a simple way to load and watch their own IPTV sources. The player supports multiple playlist and login types, including Stalker Portal, STB MAC, Xtream Codes, M3U Plus URLs, regular M3U playlist URLs, and local M3U playlist files.

BLAZIN IPTV Player does not provide TV channels, movies, subscriptions, playlists, or copyrighted content. You must use your own legal IPTV provider, playlist, or account.

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

### M3U Plus URL Format

Use this option if your provider gives you a full M3U Plus link.

Format:

```text
http://[server-address]:[port]/get.php?username=[your-username]&password=[your-password]&type=m3u_plus
```

Example:

```text
http://example.com:8080/get.php?username=myuser&password=mypass&type=m3u_plus
```

### Regular M3U URL Format

Use this option if your provider gives you a direct `.m3u` playlist link.

Format:

```text
https://www.servername.com/uslg.m3u
```

---

## 2. Opening the App

When you open BLAZIN IPTV Player, you will see the main window with login fields across the top and content tabs below.

The main tabs are:

* **Live** — for live TV channels
* **Movies** — for VOD/movie content when supported by your provider
* **Series** — for TV series when supported by your provider
* **Info** — for account or playlist information when available

---

## 3. Choosing a Playback Method

BLAZIN IPTV Player can play streams using either the built-in internal player or an external media player.

### Internal Player

Use the internal player if you want streams to open inside the app’s built-in VLC player window.

To enable it:

1. Open the app menu.
2. Enable **Play in Internal VLC Player**.
3. Load your playlist, portal, or account.
4. Double-click a channel, movie, or episode to play it.

### External Player

Use an external media player if you prefer playback through another app installed on your computer.

To use an external player:

1. Click **Browse** next to the external player path field.
2. Select your media player executable file.
3. Load your playlist or portal.
4. Double-click a channel, movie, or episode to play it.

If the internal player is turned off, you must choose an external media player before playback.

---

## 4. Loading a Stalker Portal

Use this method if your provider gave you a Stalker portal URL and MAC address.

Example:

```text
Portal URL: http://servername:8008/stalker_portal/c/
MAC:        00:1A:79:XX:XX:XX
```

Steps:

1. Enter the Stalker portal URL in the **Portal URL** field.
2. Enter your MAC address in the MAC field.
3. Enable the internal player or choose an external player.
4. Click **Get Playlist**.
5. Wait for the app to load the available categories.

After loading, you can browse Live, Movies, and Series if your provider supports them.

---

## 5. Loading an STB MAC Portal

Use this method if your provider gave you an STB MAC portal URL and MAC address.

Example:

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

If the internal player is enabled, you do not need to choose an external media player.

---

## 6. Loading an M3U Plus URL

Use this method if your provider gives you an M3U Plus URL.

Format:

```text
http://[server-address]:[port]/get.php?username=[your-username]&password=[your-password]&type=m3u_plus
```

Steps:

1. Open the **Playlist** menu.
2. Click **Paste M3U URL**.
3. Paste the full M3U Plus URL.
4. Confirm.

If the URL includes Xtream login details, the app can detect the server, username, and password automatically and load the playlist using Xtream mode.

---

## 7. Loading a Regular M3U URL

Use this method if you have a direct `.m3u` playlist URL.

Example:

```text
https://www.servername.com/uslg.m3u
```

Steps:

1. Open the **Playlist** menu.
2. Click **Paste M3U URL**.
3. Paste the M3U URL.
4. Confirm.

The app will load the playlist and display the available items.

---

## 8. Loading a Local M3U File

If you have a playlist saved on your computer, you can open it directly.

Steps:

1. Open the **Playlist** menu.
2. Click **Open Playlist File**.
3. Select your `.m3u` or `.m3u8` file.
4. Open the file.

The player will read the playlist and display the available channels or items.

---

## 9. Browsing Live TV

The **Live** tab is used for live TV channels.

Steps:

1. Click the **Live** tab.
2. Open a category.
3. Double-click a channel to play it.

When EPG information is available, the Live tab may show program guide details such as current and upcoming programs.

---

## 10. Browsing Movies

The **Movies** tab displays VOD/movie content when your provider supports it.

Steps:

1. Click the **Movies** tab.
2. Open a movie category.
3. Double-click a movie to play it.

When supported, movie details such as poster, description, rating, genre, duration, actors, and release information may appear when hovering over movie items.

---

## 11. Browsing Series

The **Series** tab displays TV series when your provider supports it.

Steps:

1. Click the **Series** tab.
2. Open a series category.
3. Select a series.
4. Choose a season.
5. Choose an episode.
6. Double-click the episode to play it.

Some providers organize series differently, so the available seasons and episodes depend on your IPTV source.

---

## 12. Using the Internal Media Player

When the internal player opens, you will see a built-in VLC playback window.

The internal player includes:

* **Open** — plays the URL shown in the stream URL box
* **Play/Pause** — starts or pauses playback
* **Stop** — stops playback
* **Save** — saves or downloads supported media files
* **AR** — changes aspect ratio
* **Buffer** — changes playback buffer/caching
* **Volume** — controls audio volume
* **Seek bar** — allows seeking when supported by the stream
* **Fullscreen** — double-click the video area or press `F`
* **Exit fullscreen** — press `Esc`

---

## 13. Downloading a Movie or Series Episode from the Internal Player

BLAZIN IPTV Player includes a **Save** button inside the internal VLC player.

This can be used to save supported media files to your computer.

### How to Download

1. Enable **Play in Internal VLC Player**.
2. Open a movie or series episode.
3. Wait for the internal player window to open.
4. Click the **Save** button.
5. Choose where you want to save the file.
6. Wait for the download to finish.

When the download completes, the app will show the saved file location.

### Important Download Notes

The Save button works best when the stream URL points directly to a media file, such as a file ending in:

```text
.mp4
.mkv
.avi
.mov
.ts
```

If the URL is a direct media file, the internal player can download it.

If the URL is a playlist, API endpoint, protected stream, or temporary stream link, the app may show a message saying the media file cannot be saved from that URL.

This depends on how your IPTV provider delivers movies and series.

---

## 14. Searching Content

Use the search box at the top-right of the app to quickly find content.

Steps:

1. Click the **Search** field.
2. Type part of a channel, movie, or series name.
3. The current list will filter based on your search.
4. Clear the search box to show the full list again.

Search is useful when your provider has many categories or thousands of channels.

---

## 15. Using Favorites

BLAZIN IPTV Player includes a favorites feature for saving items you watch often.

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

Favorites are organized by login type and source, so your favorites can stay separate between different IPTV accounts or portals.

---

## 16. Using Profiles

Profiles let you save login information so you do not have to type it every time.

### Open Profile Manager

1. Open the **Profiles** menu.
2. Click **Profile Manager**.

### Add a New Profile

1. Click **Add**.
2. Enter a profile name.
3. Choose the profile type:

   * **MAC** for portal/MAC login
   * **Xtream/M3U** for Xtream Codes or M3U URL login
4. Enter the required login information.
5. Save the profile.

### Save Current Login as a Profile

1. Enter your current login information in the app.
2. Open **Profile Manager**.
3. Click **Add Current**.
4. Enter a profile name.
5. Save it.

### Load a Saved Profile

You can load a saved profile from the Profiles menu. Selecting a profile fills in the correct login information and starts the matching login process.

---

## 17. Understanding the Threads Option

The **Threads** option controls how many threads the app uses when loading playlist data.

Recommended setting:

* Use **5** for normal use.
* Increase it only if you have a very large playlist and your provider handles faster loading well.
* Lower it if your provider is slow or unstable.

---

## 18. Always on Top

The app includes an **Always on Top** option.

When enabled, the BLAZIN IPTV Player window stays above other windows on your desktop.

This can be useful if you want to keep the player visible while using other apps.

---

## 19. Account and Playlist Information

The **Info** tab displays account or playlist information when it is available from your provider.

Depending on your source, this may include account status, expiration information, or other provider-supplied details.

Not all providers return account information, so this tab may be empty or limited for some playlists.

---

## 20. Troubleshooting

### Playlist Does Not Load

Check the following:

* Make sure the portal URL or server URL is correct.
* Make sure your username, password, or MAC address is correct.
* Make sure your IPTV account is active.
* Try lowering the thread count.
* Check your internet connection.

### Video Does Not Play

Check the following:

* Make sure **Play in Internal VLC Player** is enabled, or choose an external media player.
* Try another channel, movie, or episode.
* Some streams may be offline or blocked by the provider.
* If using an external player, make sure the selected player path is correct.

### STB MAC Login Asks for External Player

If you want to use the internal player, make sure **Play in Internal VLC Player** is enabled before loading the STB MAC playlist.

If the internal player is turned off, choose an external media player using the **Browse** button.

### Movies or Series Are Missing

Not every provider supports Movies or Series through every login type. If those tabs are empty, your provider may not include that content or may not expose it through the selected login method.

### Download Button Does Not Save the Video

The Save button only works when the current stream points directly to a downloadable media file.

If the stream is an API link, temporary link, playlist, or protected stream, downloading may not be supported.

### EPG Does Not Show

EPG data depends on your IPTV source. If your provider does not supply guide information, the Live tab may still show channels but no program guide.

---

## 21. Best Practices

For the best experience:

* Use your own legal IPTV account or playlist.
* Save your login details as profiles for faster access.
* Use the internal player for simple playback.
* Use an external player if you prefer another media player.
* Keep the thread count at the default unless you need faster loading.
* Use search and favorites to manage large playlists.
* Use the Save button only for movies or episodes that open as direct media files.

---

## Important Notice

BLAZIN IPTV Player is only a media player. It does not provide, sell, host, stream, or include any channels, movies, playlists, IPTV subscriptions, or copyrighted content.

Users are responsible for adding their own legal IPTV sources and following all applicable laws and service agreements.

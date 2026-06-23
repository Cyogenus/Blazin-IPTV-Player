# GitHub Pages Fix Notes

The live site issue is caused by `/Blazin-IPTV-Player/index.html` serving the Google verification text instead of the real homepage.

This ZIP keeps the Google verification file as `docs/google244004fed6bb4a08.html` and restores the real homepage as `docs/index.html`.

Upload/commit the full `docs/` folder from this ZIP to GitHub. Do not rename `google244004fed6bb4a08.html` to `index.html`.

After GitHub Pages rebuilds, test:

- https://cyogenus.github.io/Blazin-IPTV-Player/
- https://cyogenus.github.io/Blazin-IPTV-Player/index.html
- https://cyogenus.github.io/Blazin-IPTV-Player/sitemap.xml

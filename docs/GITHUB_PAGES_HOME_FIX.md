# GitHub Pages home page fix

This package includes the website in two places so the site works whether GitHub Pages is configured for `main / root` or `main / docs`:

- `/index.html`
- `/docs/index.html`

The Google verification file remains separate as `google244004fed6bb4a08.html`. Do not rename it to `index.html`.

All page navigation now includes:

- Brand logo linking to `index.html`
- Main nav Home link linking to `index.html`
- A visible `Back to Home` link on inner pages

For GitHub Pages, either setting works now, but recommended setting is:

- Source: Deploy from branch
- Branch: main
- Folder: /docs

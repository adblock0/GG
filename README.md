# Chicken — static / no-NPM

Upload the contents of this folder to the root of your GitHub Pages site.

Files:
- `index.html`
- `bareworker.js`
- `sw.js` (kept for compatibility)
- `uv/sw.js`
- `uv/uv-config.js`

Ultraviolet is configured like the documented UV 3.x/BareMux setup: it has a `bare` endpoint, and BareMux routes Bare requests through the selected Wisp-backed transport. This is a static frontend, so GitHub Pages does not provide the relay itself.

After replacing the files, open your site once in Chromium, then hard-refresh. If Chrome has cached an older service-worker registration, DevTools > Application > Service Workers > Unregister can clear it.

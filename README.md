# Chicken — GitHub Pages / no NPM

This build fixes the Ultraviolet 404 by using a same-origin service-worker file at the site root:

- `index.html`
- `uv-sw.js`
- `uv-config.js`
- `bareworker.js`
- `sw.js` (Scramjet alternative)

For a GitHub Pages project site such as `https://adblock0.github.io/GG/`, upload these files directly into the published root of the `GG` repository/site.

Ultraviolet is registered as:
`/GG/uv-sw.js` with scope `/GG/uv/service/`.

That means this URL must return HTTP 200:
`https://adblock0.github.io/GG/uv-sw.js`

You do not need NPM, Node, or a build step to host these static files.

Important: GitHub Pages is a static host. The proxy transport still depends on a reachable Wisp WebSocket relay configured by Chicken. This build does not turn GitHub Pages into a Wisp server.

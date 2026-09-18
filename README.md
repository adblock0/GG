# Chicken — static/no-NPM deployment

This build is intentionally **no NPM / no Node**. It is designed to be uploaded as static files to an HTTPS host such as GitHub Pages.

## Important file layout
Upload the **contents of this folder** to the published site root (do not upload only `index.html`). Do not rename or remove the `uv/` folder. The required layout is:

```text
index.html
sw.js
bareworker.js
uv-sw.js                # compatibility shim
uv-config.js            # compatibility shim
uv/
  uv-sw.js              # actual Ultraviolet service worker
  uv-config.js
```

The page now registers `uv/uv-sw.js` relative to its own location. That fixes GitHub Pages project-site paths such as `https://adblock0.github.io/<repo>/uv/uv-sw.js`; the old build incorrectly requested `https://adblock0.github.io/uv-sw.js`.

## HTTPS
Service workers require HTTPS (localhost is the normal development exception).

## Proxy transport
The UI still offers Ultraviolet/Scramjet and Epoxy/Libcurl. Those runtimes are loaded from their public CDNs. The Wisp relay URL can be changed from the app's transport configuration in the source.

## GitHub Pages check
After publishing, these URLs should return JavaScript instead of a 404:

- `.../uv/uv-sw.js`
- `.../uv/uv-config.js`
- `.../sw.js`
- `.../bareworker.js`

For a GitHub Pages project site, replace `...` with the full repository-site path.

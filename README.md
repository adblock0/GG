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


## GitHub Pages

This package is designed to work as a static GitHub Pages project site without npm or Node. Upload the contents of this folder to the repository's Pages branch/root. Keep `index.html`, `uv-sw.js`, `uv-config.js`, `sw.js`, and `bareworker.js` at the same level.

For a project site such as `https://adblock0.github.io/GG/`, Chicken registers the Ultraviolet worker from `https://adblock0.github.io/GG/uv-sw.js` with scope `https://adblock0.github.io/GG/uv/service/`. Do not change that to `/uv/uv-sw.js` unless you also upload that nested file.

GitHub Pages must serve the site over HTTPS. Service workers require a secure origin, and the worker script must be same-origin with the page; the current design intentionally keeps the loader worker on your GitHub Pages origin while it imports the UV runtime from the CDN.

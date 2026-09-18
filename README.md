# Chicken — static/no-NPM deployment

This build stays **no NPM / no Node**.

## GitHub Pages layout

Upload the contents of this folder to the root of the Pages site:

```text
index.html
bareworker.js
sw.js
uv-sw.js                 # old-build compatibility alias
uv-config.js             # old-build compatibility alias
uv/
  sw.js                  # active Ultraviolet service-worker loader
  uv-config.js           # active Ultraviolet config
```

For a project site such as `https://adblock0.github.io/GG/`, Chicken registers:

```text
https://adblock0.github.io/GG/uv/sw.js
```

with the scope:

```text
https://adblock0.github.io/GG/uv/service/
```

This follows Ultraviolet's documented v3 stock service-worker pattern: import the bundle, import the config, then import the Ultraviolet gateway worker. The active transport is configured through BareMux.

## Proxy transport

The default Wisp endpoint is `wss://wisp.mercurywork.shop/` and **both Epoxy and Libcurl receive it as `{ wisp: ... }`**. The previous build incorrectly passed Libcurl as `{ websocket: ... }`, which can lead to the connection failure you reported.

A Wisp relay is still required. GitHub Pages is only the static frontend; it does not provide the relay/backend itself.

## Cookies

Ultraviolet 3.x stores proxy cookies in its IndexedDB cookie database (`__op`). The browser profile therefore keeps those proxy cookies on the same origin across reloads/internal tabs, subject to the browser's own storage/retention rules. Scramjet's current controller also persists its cookie jar in IndexedDB.

## Panic button and tab cloak

The panic button now navigates the **real browser tab** directly to the configured URL, with no proxy encoding and no new tab.

The real browser tab title/favicon stays on the selected cloak while you switch Chicken's internal tabs and while proxy pages are open. Proxy page titles only affect the internal Chicken tab labels.

## HTTPS

Service workers require a secure context. GitHub Pages provides HTTPS; opening the HTML as `file://` cannot run this proxy architecture.

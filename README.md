# Chicken — static / no NPM build

This version has **no package.json, no npm install, and no Node server**.

Upload all files in this folder to the same HTTPS origin. GitHub Pages, Cloudflare Pages, Netlify, Vercel static hosting, or another HTTPS static host works. Do **not** open `index.html` as `file://`; service workers are required for Scramjet/Ultraviolet and browsers only enable them in secure contexts (with `http://localhost` as the local-development exception).

The proxy client is wired to the BareMux-compatible public Wisp demo used by the upstream ecosystem:
`wss://wisp.mercurywork.shop/wisp/`

That endpoint is a third-party relay. For a permanent deployment, change `DEFAULT_WISP` in `index.html`, `sw.js`, and the client configuration to a Wisp server you control or trust.

The code keeps Ultraviolet 3.2.10 as the requested default and provides Scramjet 1.x as the alternate engine. Current upstream documentation identifies Ultraviolet as superseded by Scramjet. The transport majors here intentionally match the Ultraviolet/Scramjet 1.x BareMux generation: Epoxy 2.x and Libcurl 1.x.

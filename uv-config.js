/* Ultraviolet 3.2.10 configuration for static GitHub Pages. */
/* global Ultraviolet */
const siteRoot = new URL("./", self.location.href);
self.__uv$config = {
  prefix: new URL("uv/service/", siteRoot).pathname,
  bare: new URL("bare/", siteRoot).pathname,
  encodeUrl: Ultraviolet.codec.xor.encode,
  decodeUrl: Ultraviolet.codec.xor.decode,
  handler: "https://cdn.jsdelivr.net/npm/@titaniumnetwork-dev/ultraviolet@3.2.10/dist/uv.handler.js",
  bundle: "https://cdn.jsdelivr.net/npm/@titaniumnetwork-dev/ultraviolet@3.2.10/dist/uv.bundle.js",
  config: new URL("uv-config.js", siteRoot).pathname,
  sw: "https://cdn.jsdelivr.net/npm/@titaniumnetwork-dev/ultraviolet@3.2.10/dist/uv.sw.js"
};

/* Ultraviolet 3.x configuration for a static host using BareMux. */
/* global Ultraviolet */
const siteRoot = new URL("./", self.location.href);
const proxyPrefix = new URL("service/", siteRoot).pathname;
self.__uv$config = {
  prefix: proxyPrefix,
  bare: new URL("bare/", siteRoot).pathname,
  encodeUrl: Ultraviolet.codec.xor.encode,
  decodeUrl: Ultraviolet.codec.xor.decode,
  handler: "https://cdn.jsdelivr.net/npm/@titaniumnetwork-dev/ultraviolet@3.2.10/dist/uv.handler.js",
  bundle: "https://cdn.jsdelivr.net/npm/@titaniumnetwork-dev/ultraviolet@3.2.10/dist/uv.bundle.js",
  config: new URL("uv-config.js", siteRoot).pathname,
  sw: "https://cdn.jsdelivr.net/npm/@titaniumnetwork-dev/ultraviolet@3.2.10/dist/uv.sw.js"
};

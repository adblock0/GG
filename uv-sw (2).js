// Chicken / Ultraviolet service worker entrypoint.
// This file must stay under uv/ and be served by the same HTTPS origin as index.html.
importScripts('https://cdn.jsdelivr.net/npm/@titaniumnetwork-dev/ultraviolet@3.2.10/dist/uv.bundle.js');

const siteBase = new URL('../', self.location.href);
const uvPrefix = new URL('uv/service/', siteBase).pathname;
const handlerUrl = 'https://cdn.jsdelivr.net/npm/@titaniumnetwork-dev/ultraviolet@3.2.10/dist/uv.handler.js';
const bundleUrl = 'https://cdn.jsdelivr.net/npm/@titaniumnetwork-dev/ultraviolet@3.2.10/dist/uv.bundle.js';

self.__uv$config = {
  prefix: uvPrefix,
  encodeUrl: Ultraviolet.codec.xor.encode,
  decodeUrl: Ultraviolet.codec.xor.decode,
  handler: handlerUrl,
  bundle: bundleUrl,
  config: new URL('uv/uv-config.js', siteBase).pathname,
  sw: new URL('uv/uv-sw.js', siteBase).pathname
};

importScripts('https://cdn.jsdelivr.net/npm/@titaniumnetwork-dev/ultraviolet@3.2.10/dist/uv.sw.js');

const uv = new UVServiceWorker();
self.addEventListener('fetch', event => {
  event.respondWith((async () => {
    if (uv.route(event)) return await uv.fetch(event);
    return fetch(event.request);
  })());
});

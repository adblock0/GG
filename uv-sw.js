// Chicken static Ultraviolet service worker.
// UV 3.x is legacy/superseded by Scramjet, but this keeps the requested option working.
importScripts('https://cdn.jsdelivr.net/npm/@titaniumnetwork-dev/ultraviolet@3.2.10/dist/uv.bundle.js');

self.__uv$config = {
  prefix: '/uv/service/',
  encodeUrl: Ultraviolet.codec.xor.encode,
  decodeUrl: Ultraviolet.codec.xor.decode,
  handler: 'https://cdn.jsdelivr.net/npm/@titaniumnetwork-dev/ultraviolet@3.2.10/dist/uv.handler.js',
  bundle: 'https://cdn.jsdelivr.net/npm/@titaniumnetwork-dev/ultraviolet@3.2.10/dist/uv.bundle.js',
  config: '/uv-config.js',
  sw: '/uv-sw.js'
};

importScripts('https://cdn.jsdelivr.net/npm/@titaniumnetwork-dev/ultraviolet@3.2.10/dist/uv.sw.js');

const uv = new UVServiceWorker();
self.addEventListener('fetch', event => {
  event.respondWith((async () => {
    if (uv.route(event)) return await uv.fetch(event);
    return fetch(event.request);
  })());
});

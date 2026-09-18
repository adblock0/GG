// Chicken / Ultraviolet service worker.
// Keep this file at the same directory level as index.html.
// That lets GitHub Pages serve the worker at /<repo>/uv-sw.js while
// the worker is scoped more narrowly to /<repo>/uv/service/.

const UV_VERSION = '3.2.10';
const UV_CDN = `https://cdn.jsdelivr.net/npm/@titaniumnetwork-dev/ultraviolet@${UV_VERSION}/dist`;

importScripts(`${UV_CDN}/uv.bundle.js`);

// GitHub Pages project sites are normally hosted at /<repo>/.
// Taking the directory of this worker gives us that project root.
const siteBase = new URL('./', self.location.href);
const uvPrefix = new URL('uv/service/', siteBase).pathname;

self.__uv$config = {
  prefix: uvPrefix,
  encodeUrl: Ultraviolet.codec.xor.encode,
  decodeUrl: Ultraviolet.codec.xor.decode,
  handler: `${UV_CDN}/uv.handler.js`,
  bundle: `${UV_CDN}/uv.bundle.js`,
  config: new URL('uv-config.js', siteBase).pathname,
  sw: new URL('uv-sw.js', siteBase).pathname,
};

// The actual UV gateway lives in the same package; this same-origin file
// is only the loader needed for a static host such as GitHub Pages.
importScripts(`${UV_CDN}/uv.sw.js`);

const uv = new UVServiceWorker();

self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', event => event.waitUntil(self.clients.claim()));

self.addEventListener('fetch', event => {
  if (!uv.route(event)) return;
  event.respondWith(uv.fetch(event));
});

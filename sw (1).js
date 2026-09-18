/*
 * Ultraviolet v3 stock-style loader for a static GitHub Pages site.
 * The service worker itself is same-origin; its classic imports may load the
 * runtime from a trusted CDN.
 */
const UV_CDN = 'https://cdn.jsdelivr.net/npm/@titaniumnetwork-dev/ultraviolet@3.2.10/dist';

importScripts(`${UV_CDN}/uv.bundle.js`);
importScripts('./uv-config.js');
importScripts(`${UV_CDN}/uv.sw.js`);

const uv = new UVServiceWorker();

self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', event => event.waitUntil(self.clients.claim()));

self.addEventListener('fetch', (event) => {
  event.respondWith((async () => {
    if (uv.route(event)) return await uv.fetch(event);
    return await fetch(event.request);
  })());
});

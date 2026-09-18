/* Same-origin loader for Ultraviolet 3.2.10 on static hosting. */
const UV_CDN = "https://cdn.jsdelivr.net/npm/@titaniumnetwork-dev/ultraviolet@3.2.10/dist";
importScripts(`${UV_CDN}/uv.bundle.js`);
importScripts("./uv-config.js");
importScripts(`${UV_CDN}/uv.sw.js`);

const uv = new UVServiceWorker();
self.addEventListener("install", () => self.skipWaiting());
self.addEventListener("activate", event => event.waitUntil(self.clients.claim()));
self.addEventListener("fetch", event => {
  event.respondWith((async () => {
    if (uv.route(event)) return await uv.fetch(event);
    return await fetch(event.request);
  })());
});

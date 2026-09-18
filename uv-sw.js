/*
 * Same-origin Ultraviolet service-worker entry point.
 * This file deliberately lives at the site root so GitHub Pages can serve it
 * without requiring /uv/sw.js or any server-side rewrite.
 */
const UV_BASE = "https://cdn.jsdelivr.net/npm/@titaniumnetwork-dev/ultraviolet@3.2.10/dist";
importScripts(`${UV_BASE}/uv.bundle.js`);
importScripts("./uv-config.js");
importScripts(`${UV_BASE}/uv.sw.js`);

const uv = new UVServiceWorker();
self.addEventListener("install", () => self.skipWaiting());
self.addEventListener("activate", event => event.waitUntil(self.clients.claim()));
self.addEventListener("fetch", event => {
  event.respondWith((async () => {
    if (uv.route(event)) return await uv.fetch(event);
    return await fetch(event.request);
  })());
});

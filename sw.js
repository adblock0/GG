// Scramjet service worker entry point for the optional Scramjet engine.
const SCRAMJET_ALL = 'https://cdn.jsdelivr.net/gh/Destroyed12121/Staticsj@main/JS/scramjet.all.js';
const BARE_MUX = 'https://cdn.jsdelivr.net/npm/@mercuryworkshop/bare-mux@2.1.7/dist/index.js';
const swPath = self.location.pathname;
const basePath = swPath.substring(0, swPath.lastIndexOf('/') + 1);
self.basePath = basePath;
self.$scramjet = { files: {
  wasm: 'https://cdn.jsdelivr.net/gh/Destroyed12121/Staticsj@main/JS/scramjet.wasm.wasm',
  sync: 'https://cdn.jsdelivr.net/gh/Destroyed12121/Staticsj@main/JS/scramjet.sync.js'
}};
importScripts(SCRAMJET_ALL);
importScripts(BARE_MUX);
const { ScramjetServiceWorker } = $scramjetLoadWorker();
const scramjet = new ScramjetServiceWorker({ prefix: basePath + 'scramjet/' });
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', event => event.waitUntil(self.clients.claim()));
self.addEventListener('fetch', event => {
  event.respondWith((async () => {
    await scramjet.loadConfig();
    if (scramjet.route(event)) return scramjet.fetch(event);
    return fetch(event.request);
  })());
});

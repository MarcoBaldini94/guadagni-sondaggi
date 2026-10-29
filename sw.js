// Service worker: rete prima (così gli aggiornamenti arrivano subito), cache se offline.
// Aumenta VERSION a ogni modifica dei file per aggiornare la cache.
const VERSION = "v4";
const CACHE = "guadagni-" + VERSION;
const FILES = ["./", "index.html", "styles.css", "app.js", "manifest.webmanifest",
  "fonts/SchibstedGrotesk.woff2", "icons/icon-192.png", "icons/icon-512.png", "icons/icon48.png"];

self.addEventListener("install", e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(FILES)).then(() => self.skipWaiting()));
});
self.addEventListener("activate", e => {
  e.waitUntil(caches.keys()
    .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
    .then(() => self.clients.claim()));
});
self.addEventListener("fetch", e => {
  if (e.request.method !== "GET" || new URL(e.request.url).origin !== location.origin) return;
  e.respondWith(
    fetch(e.request)
      .then(r => { if (r.ok) { const copy = r.clone(); caches.open(CACHE).then(c => c.put(e.request, copy)); } return r; })
      .catch(() => caches.match(e.request, { ignoreSearch: true }).then(r => r || caches.match("index.html")))
  );
});

// Offline cache for Bio 07–13 (combined app). Bump VERSION whenever any file changes.
const VERSION = "bioslide-v8";
const FILES = [
   "./",
   "index.html",
   "watch.html",
   "manifest.webmanifest",
   "bio13-icon-192.png",
   "bio13-icon-512.png",
   "bio13-maskable-512.png",
   "bio13-touch-180.png",
   "learn/exam-kit-6.js",
   "learn/hl-kit-3.js",
   "learn/pager-1.js",
   "learn/s07.html",
   "learn/s08.html",
   "learn/s09.html",
   "learn/s10.html",
   "learn/s11.html",
   "learn/s12.html",
   "learn/s13.html",
   "learn/xk2-bank-s07.js",
   "learn/xk2-bank-s08.js",
   "learn/xk2-bank-s09.js",
   "learn/xk2-bank-s10.js",
   "learn/xk2-bank-s11.js",
   "learn/xk2-bank-s12.js",
   "learn/xk2-bank-s13.js",
   "map/p0.html",
   "map/theme.css",
   "map/p1.html",
   "map/p2.html",
   "map/p3.html",
   "map/p4.html",
   "map/p5.html",
   "map/p6.html",
   "map/p7.html"
  ];
self.addEventListener("install", e => {
  e.waitUntil(caches.open(VERSION).then(c => c.addAll(FILES)).then(() => self.skipWaiting()));
});
self.addEventListener("activate", e => {
  e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k.startsWith("bioslide-") && k !== VERSION).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener("fetch", e => {
  const req = e.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);
  if (url.hostname === "fonts.googleapis.com" || url.hostname === "fonts.gstatic.com") {
    e.respondWith(caches.open(VERSION).then(async c => {
      const hit = await c.match(req);
      const net = fetch(req).then(r => { c.put(req, r.clone()); return r; }).catch(() => hit);
      return hit || net;
    }));
    return;
  }
  if (url.origin !== location.origin || !url.pathname.startsWith(new URL(self.registration.scope).pathname)) return;
  // network first so updates arrive; cached copy when offline
  e.respondWith(fetch(req).then(r => {
    if (r.ok) { const copy = r.clone(); caches.open(VERSION).then(c => c.put(req, copy)); }
    return r;
  }).catch(() => caches.match(req, {ignoreSearch: true}).then(r => r || caches.match("index.html"))));
});

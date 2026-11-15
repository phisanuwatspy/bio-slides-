// Offline cache for Bio Slide 07–12. Bump VERSION whenever any file changes.
const VERSION = "bioslide-v1";
const FILES = [
  "./", "index.html", "manifest.webmanifest",
  "icon-192.png", "icon-512.png", "icon-maskable-512.png", "apple-touch-icon.png",
  "exam-kit-2.js", "hl-kit-1.js",
  "s07-x2.html", "s08-x2.html", "s09-x2.html", "s10-x2.html", "s11-x2.html", "s12-x2.html",
  "xk2-bank-s07.js", "xk2-bank-s08.js", "xk2-bank-s09.js", "xk2-bank-s10.js", "xk2-bank-s11.js", "xk2-bank-s12.js"
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

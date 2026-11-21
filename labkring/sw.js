// Offline cache for แลปกริ๊ง. Bump VERSION whenever any file changes.
const VERSION = "labkring-v2";
const FILES = ["./", "index.html", "manifest.webmanifest", "icon-192.png", "icon-512.png", "icon-maskable-512.png", "apple-touch-icon.png", "img/amoeba.jpg", "img/ana1.jpg", "img/ana2.jpg", "img/asper.jpg", "img/bs.jpg", "img/bsplate.jpg", "img/card.jpg", "img/cheek.jpg", "img/chloro.jpg", "img/chromo.jpg", "img/conn.jpg", "img/corn.jpg", "img/diatom.jpg", "img/dicot.jpg", "img/ec.jpg", "img/ecplate.jpg", "img/epi.jpg", "img/eug.jpg", "img/glauco.jpg", "img/int.jpg", "img/lacto.jpg", "img/leaf.jpg", "img/lym.jpg", "img/meta1.jpg", "img/meta2.jpg", "img/mono.jpg", "img/neu.jpg", "img/neuron.jpg", "img/nuc.jpg", "img/osc.jpg", "img/para.jpg", "img/peni.jpg", "img/phorm.jpg", "img/plt.jpg", "img/potato.jpg", "img/pro1.jpg", "img/pro2.jpg", "img/rbc.jpg", "img/rhizo.jpg", "img/rice.jpg", "img/sa.jpg", "img/saplate.jpg", "img/skel.jpg", "img/smooth.jpg", "img/spiro.jpg", "img/stom.jpg", "img/tapi.jpg", "img/telo1.jpg", "img/telo2.jpg", "img/vac.jpg", "img/volvox.jpg", "img/wheat.jpg", "img/yeast.jpg"];
self.addEventListener("install", e => {
  e.waitUntil(caches.open(VERSION).then(c => c.addAll(FILES)).then(() => self.skipWaiting()));
});
self.addEventListener("activate", e => {
  e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k.startsWith("labkring-") && k !== VERSION).map(k => caches.delete(k)))).then(() => self.clients.claim()));
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

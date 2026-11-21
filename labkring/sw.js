// Offline cache for แลปกริ๊ง. Bump VERSION whenever any file changes.
const VERSION = "labkring-v3";
const FILES = ["./", "index.html", "manifest.webmanifest", "icon-192.png", "icon-512.png", "icon-maskable-512.png", "apple-touch-icon.png", "img/amoeba.jpg", "img/ana1.jpg", "img/ana2.jpg", "img/asper.jpg", "img/bs.jpg", "img/bsplate.jpg", "img/card.jpg", "img/cheek.jpg", "img/chloro.jpg", "img/chromo.jpg", "img/conn.jpg", "img/corn.jpg", "img/diatom.jpg", "img/dicot.jpg", "img/ec.jpg", "img/ecplate.jpg", "img/epi.jpg", "img/eug.jpg", "img/glauco.jpg", "img/int.jpg", "img/lacto.jpg", "img/leaf.jpg", "img/lym.jpg", "img/meta1.jpg", "img/meta2.jpg", "img/mono.jpg", "img/neu.jpg", "img/neuron.jpg", "img/nuc.jpg", "img/osc.jpg", "img/para.jpg", "img/peni.jpg", "img/phorm.jpg", "img/plt.jpg", "img/potato.jpg", "img/pro1.jpg", "img/pro2.jpg", "img/rbc.jpg", "img/rhizo.jpg", "img/rice.jpg", "img/s_card.jpg", "img/s_cheek.jpg", "img/s_chloro.jpg", "img/s_chromo.jpg", "img/s_conn.jpg", "img/s_corn.jpg", "img/s_crystal.jpg", "img/s_dicot.jpg", "img/s_int.jpg", "img/s_leaf.jpg", "img/s_lym.jpg", "img/s_mono.jpg", "img/s_neu.jpg", "img/s_neuron.jpg", "img/s_nuc.jpg", "img/s_potato.jpg", "img/s_rbc.jpg", "img/s_rice.jpg", "img/s_skel.jpg", "img/s_smooth.jpg", "img/s_stom.jpg", "img/s_tapi.jpg", "img/s_vac.jpg", "img/s_wheat.jpg", "img/sa.jpg", "img/saplate.jpg", "img/skel.jpg", "img/smooth.jpg", "img/spiro.jpg", "img/stom.jpg", "img/tapi.jpg", "img/telo1.jpg", "img/telo2.jpg", "img/vac.jpg", "img/volvox.jpg", "img/wheat.jpg", "img/yeast.jpg", "img/z01.jpg", "img/z02.jpg", "img/z03.jpg", "img/z04.jpg", "img/z05.jpg", "img/z06.jpg", "img/z07.jpg", "img/z08.jpg", "img/z09.jpg", "img/z10.jpg", "img/z11.jpg", "img/z12.jpg", "img/z13.jpg", "img/z14.jpg", "img/z15.jpg", "img/z16.jpg", "img/z17.jpg", "img/z18.jpg", "img/z19.jpg", "img/z20.jpg", "img/z20c.jpg", "img/z21.jpg", "img/z22.jpg", "img/z23.jpg", "img/z24.jpg", "img/z25.jpg", "img/z26.jpg", "img/z27.jpg", "img/z28.jpg", "img/z29.jpg", "img/z30.jpg", "img/z31.jpg", "img/z32.jpg", "img/z33.jpg", "img/z34.jpg", "img/z35.jpg", "img/z36.jpg", "img/z37.jpg", "img/z38.jpg", "img/z39.jpg", "img/z40.jpg", "img/z41.jpg", "img/z42.jpg", "img/z43.jpg", "img/z44.jpg", "img/z45.jpg", "img/z46.jpg", "img/z47.jpg", "img/z48.jpg", "img/z49.jpg", "img/z50.jpg", "img/z51.jpg", "img/z52.jpg", "img/z53.jpg"];
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

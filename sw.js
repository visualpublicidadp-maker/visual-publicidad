const CACHE='vp-v2';
const URLS=['./','/visual-publicidad/','/visual-publicidad/index.html'];
self.addEventListener('install',e=>{
e.waitUntil(caches.open(CACHE).then(c=>c.addAll(URLS)).then(()=>self.skipWaiting()));
});
self.addEventListener('activate',e=>{
e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));
});
self.addEventListener('fetch',e=>{
if(e.request.method!=='GET') return;
// Network first, fallback to cache
e.respondWith(
fetch(e.request).then(r=>{
if(r.ok){const c=r.clone();caches.open(CACHE).then(cache=>cache.put(e.request,c));}
return r;
}).catch(()=>caches.match(e.request))
);
});

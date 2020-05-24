const assets = [
  '/',
  'index.html',
  'app.js',
  'style.css',
  'css/font-awesome.css',
  'css/font-awesome.min.css',
  'https://fonts.googleapis.com/css2?family=Roboto:wght@300&display=swap',
  '/fallback.html'
];
 // cache size limit function 

 const limitCacheSize = (name, size) => {
   caches.open(name).then(cache => {
     cache.keys().then(keys => {
       if(keys.length > size) {
         cache.delete(keys[0]).then(limitCacheSize(name, size))
       }
     })
   })
 }
const staticCacheName = 'site-static-v1.4.3';
const dynamicCacheName = 'site-dynamic-v1';
//install service worker
self.addEventListener('install', evt => {
  // console.log('service worker has been installed')
  evt.waitUntil(
    caches.open(staticCacheName).then(cache => {
      // console.log('logging shell assets')
      return cache.addAll(assets);
    })
  );
});

//  activate service worker 

self.addEventListener('activate', evt => {
  evt.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(keys
        .filter(key => key !== staticCacheName && key !== dynamicCacheName)
        .map(key => caches.delete(key))
      )
    })
  );
});


self.addEventListener('fetch', evt => {
  // console.log(evt);
  evt.respondWith(
    caches.match(evt.request).then(cacheRes => {
      return cacheRes || fetch(evt.request).then(fetchRes => {
        return caches.open(dynamicCacheName).then(cache => {
          cache.put(evt.request.url, fetchRes.clone());
          limitCacheSize(dynamicCacheName, 15);
          return fetchRes;
        });
      });
    }).catch(() => {
      if(evt.request.url.indexOf('html') > -1 ){
        return caches.match('/fallback.html')
      }
    })
  );
});
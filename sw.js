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
 
const staticCacheName = 'site-static-v1.4.1';
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
          return fetchRes;
        });
      });
    }).catch(() => caches.match('/fallback.html'))
  )
});
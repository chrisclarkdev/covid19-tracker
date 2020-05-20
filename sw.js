const assets = [
  '/',
  'index.html',
  'app.js',
  'style.css',
  'css/font-awesome.css',
  'css/font-awesome.min.css',
  'https://fonts.googleapis.com/css2?family=Roboto:wght@300&display=swap'
];
 
const staticCacheName = 'site-static';
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

self.addEventListener('active', evt => {
  // console.log('service worker activated')
});


self.addEventListener('fetch', evt => {
  // console.log('fetch Event ', evt)
})
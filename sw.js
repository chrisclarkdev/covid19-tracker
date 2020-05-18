// add event l;isterter
self.addEventListener('install', evt => {
  console.log('service worker has been installed')
});

//  activate service worker 

self.addEventListener('active', evt => {
  console.log('service worker activated')
});


self.addEventListener('fetch', evt => {
  console.log('fetch Event ', evt)
})
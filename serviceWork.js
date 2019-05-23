const myCacheName = 'portfolio-V2'

//bjkbob
//reubgfiuw
//gnfebf
//grryvfi
self.addEventListener('install', event => {
  console.log('installed')
  event.waitUntil(
    caches.open(myCacheName).then(function (cache) {
      return cache.addAll(
        [
          '/app.js',
          '/index.html',
          '/serviceWork.js',
          '/css/styles.css',
          'img/coding_c.jpg',
          'img/coding_d.jpg',
          'img/coding_b.jpg',
          'img/coding_a.jpg',
        ]
      );
    })
  );
})

// dheqvfiuqvf

self.addEventListener('activate', function (event) {
  event.waitUntil(
    caches.keys().then(function (cacheNames) {
      return Promise.all(
        cacheNames.filter(function (cacheName) {
          return cacheName.startsWith('portfolio-') && cacheName !== myCacheName
        }).map(function (cacheName) {
          return caches.delete(cacheName);
        })
      );
    })
  );
  console.log('activated')
});

self.addEventListener('fetch', function (event) {
  event.respondWith(
    caches.match(event.request).then(function (response) {
      return response || fetch(event.request);
    })
  );
});
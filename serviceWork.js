const myCacheName = 'portfolio-V2'

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
          'img/icon.png',
          'manifest.json',
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

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.open(myCacheName).then(function (cache) {
      return cache.match(event.request).then(function (response) {
        return response || fetch(event.request).then(function (response) {
          cache.put(event.request, response.clone());
          return response;
        });
      });
    })
  )
})
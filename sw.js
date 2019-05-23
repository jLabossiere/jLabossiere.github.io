const myCacheName = 'portfolio-V1'

self.addEventListener('installed', event => {
  event.waitUntil(
    caches.open(myCacheName).then(function (cache) {
      return cache.addAll(
        [
          '/css/styles.css',
          '/app.js',
          '/index.html'
        ]
      );
    })
  );
})

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
});

self.addEventListener('fetch', function (event) {
  event.respondWith(
    caches.match(event.request).then(function (response) {
      return response || fetch(event.request);
    })
  );
});
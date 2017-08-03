var cacheVersion = 1;
var currentCache = {
  offline: 'offline-cache' + cacheVersion
};

const offlineUrl = 'offline.html';
const offlineImg = '/media/offlineImg.jpg';
const offlineAudio = '/media/offlineAudio.mp3';
var filesToCache = [offlineUrl, offlineImg, offlineAudio];
 self.addEventListener('install', function(event) {
     //Setup cache
    event.waitUntil(
        caches.open(currentCache.offline)
          .then(function(cache) {
            console.log('Opened cache');
            return cache.addAll(filesToCache);
            console.log('Added files to cache');
        })
    );
 });

 this.addEventListener('fetch', event => {
  // request.mode = navigate isn't supported in all browsers
  // so include a check for Accept: text/html header.
  if (event.request.mode === 'navigate' || (event.request.method === 'GET' && event.request.headers.get('accept').includes('text/html'))) {
        event.respondWith(
          fetch(event.request.url).catch(error => {
              // Return the offline page
              return caches.match(offlineUrl);
          })
    );
  }
  else{
        // Respond with everything else if we can
        event.respondWith(caches.match(event.request)
                        .then(function (response) {
                        return response || fetch(event.request);
                    })
            );
      }
});

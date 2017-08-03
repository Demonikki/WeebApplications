const offlineUrl = 'offline.html';
const offlineCSS = '/vanilla.css';
const offlineImg = '/media/offlineImg.jpg';
const offlineAudio = '/media/offlineAudio.mp3';
const loadConfig =  '/load_config.json';
const errorImg = '/media/error-img.jpg';
var filesToCache = [offlineUrl, offlineCSS, offlineImg, offlineAudio, loadConfig, errorImg];

/*
need to add:
load_config.json
trackJS stuff
error-img
*/


self.addEventListener('install', function(event) {
  // Perform install steps
  event.waitUntil(
    caches.open('offline')
      .then(function(cache) {
        console.log('Opened cache');
        return cache.addAll(filesToCache).then(function(){console.log("Files added to cache")});
      })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        // Cache hit - return response
        if (response) {
          console.log("Returning from cache");
          console.log("Header: "+response.headers + " Status: "+response.status
                        +"URL: "+response.url);
          return response;
        }
        console.log("Returning from server");
        return fetch(event.request);
      }
    )
  );
});

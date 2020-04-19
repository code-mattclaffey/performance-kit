/*

  @author Matt Claffey

*/

const cacheFiles = ['/offline/', '/styles/main.css'];

const cacheName = 'performance-kit-cache';

function handleInstallEvent(event) {
  event.waitUntil(
    caches
      .open(cacheName)
      .then((cache) => cache.addAll(cacheFiles.map((url) => new Request(url, { credentials: 'same-origin', mode: 'cors' }))))
      .then(() => self.skipWaiting())
      .catch((error) => {
        console.error(error);
      }),
  );
}

function handleActivateEvent(event) {
  const cacheWhitelist = [cacheName];

  event.waitUntil(
    caches.keys().then((cacheNames) =>
      Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        }),
      ),
    ),
  );

  return self.clients.claim();
}

function handleFetchEvent(event) {
  const requestUrl = event.request.url.replace(/^.*\/\/[^\/]+/, '');
  const allCacheFiles = cacheFiles;

  if (allCacheFiles.includes(requestUrl)) {
    event.respondWith(caches.match(event.request).then((cacheResponse) => cacheResponse || fetch(event.request)));
  }

  if (event.request.mode === 'navigate') {
    event.respondWith(fetch(event.request).catch((error) => caches.match('/offline/')));
  }
}

self.addEventListener('install', handleInstallEvent);

// Empty out any caches that don’t match the ones listed.
self.addEventListener('activate', handleActivateEvent);

self.addEventListener('fetch', handleFetchEvent);

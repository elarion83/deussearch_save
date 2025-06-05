// Service Worker personnalisé
const CACHE_VERSION = 'v1';
const CACHE_NAME = `deussearch-${CACHE_VERSION}`;

// Assets à mettre en cache immédiatement
const PRECACHE_URLS = [
  '/',
  '/css/critical.css',
  '/fonts/oswald-bold.woff2',
  '/fav.png'
];

// Installation du Service Worker
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(PRECACHE_URLS))
      .then(() => self.skipWaiting())
  );
});

// Activation du Service Worker
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames
          .filter(cacheName => cacheName.startsWith('deussearch-'))
          .filter(cacheName => cacheName !== CACHE_NAME)
          .map(cacheName => caches.delete(cacheName))
      );
    })
  );
});

// Stratégie de cache : Network First pour les API, Cache First pour les assets statiques
self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);
  
  // Stratégie pour les images
  if (url.pathname.match(/\.(jpg|jpeg|png|gif|webp)$/)) {
    event.respondWith(cacheFirst(event.request));
    return;
  }

  // Stratégie pour les polices et CSS
  if (url.pathname.match(/\.(css|woff2?)$/)) {
    event.respondWith(cacheFirst(event.request));
    return;
  }

  // Stratégie par défaut : Network First
  event.respondWith(networkFirst(event.request));
});

// Stratégie Cache First
async function cacheFirst(request) {
  const cachedResponse = await caches.match(request);
  if (cachedResponse) {
    return cachedResponse;
  }
  return fetch(request).then(response => {
    if (response.ok) {
      const responseClone = response.clone();
      caches.open(CACHE_NAME).then(cache => {
        cache.put(request, responseClone);
      });
    }
    return response;
  });
}

// Stratégie Network First
async function networkFirst(request) {
  try {
    const response = await fetch(request);
    if (response.ok) {
      const responseClone = response.clone();
      caches.open(CACHE_NAME).then(cache => {
        cache.put(request, responseClone);
      });
    }
    return response;
  } catch (error) {
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }
    throw error;
  }
} 
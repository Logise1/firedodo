const CACHE_NAME = 'firedodo-v1';
const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './512.png',
  'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js',
  'https://logise1.github.io/firedodo/bgm.mp3',
  'https://logise1.github.io/firedodo/win.mp3',
  'https://logise1.github.io/firedodo/death.mp3'
];

// Instalación: Cachear recursos estáticos
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('[Service Worker] Caching assets');
      return cache.addAll(ASSETS);
    })
  );
});

// Activación: Limpiar cachés viejas
self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(keyList.map((key) => {
        if (key !== CACHE_NAME) {
          return caches.delete(key);
        }
      }));
    })
  );
});

// Fetch: Servir desde caché, si falla, ir a la red
self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((response) => {
      return response || fetch(e.request);
    })
  );
});

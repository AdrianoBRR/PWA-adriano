const CACHE_NAME = "meu-pwa-v1";

// arquivos para cache
const urlsToCache = [
  "/",
  "/index.html",
  "/style.css",
  "/app.js",
  "/offline.html"
];

// INSTALL → salva cache inicial
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

// ACTIVATE → limpa caches antigos
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.map(key => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      )
    )
  );
});

// FETCH → estratégia híbrida
self.addEventListener("fetch", event => {
  event.respondWith(
    fetch(event.request)
      .then(response => {
        const clone = response.clone();
        caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
        return response;
      })
      .catch(() =>
        caches.match(event.request)
          .then(resp => resp || caches.match("/offline.html"))
      )
  );
});
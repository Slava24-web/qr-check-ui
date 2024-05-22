// let doCache = false;
// const staticCacheName = 'qr-checker-v1'
//
// const assetsUrls = [
//     'index.html',
// ]
//
// // Добавление данных в кэш при открытии PWA
// self.addEventListener('install', async (event) => {
//     if (doCache) {
//         event.waitUntil(
//             caches.open(CACHE_NAME)
//                 .then(function(cache) {
//                     fetch("asset-manifest.json")
//                         .then(response => {
//                             response.json()
//                         })
//                         .then(assets => {
//                             const urlsToCache = ["/", assets["main.js"]]
//                             cache.addAll(urlsToCache)
//                         })
//                 })
//         );
//     }
// });
//
// // Удаление старого кэша
// self.addEventListener('activate', (event) => {
//     const cacheWhitelist = [staticCacheName];
//     event.waitUntil(
//         caches.keys()
//             .then(keyList =>
//                 Promise.all(keyList.map(key => {
//                     if (!cacheWhitelist.includes(key)) {
//                         return caches.delete(key);
//                     }
//                 }))
//             )
//     );
// });
//
// // Кэширование сетевых запросов
// self.addEventListener('fetch', (event) => {
//     if (doCache) {
//         event.respondWith(
//             caches.match(event.request).then(function(response) {
//                 return response || fetch(event.request);
//             })
//         );
//     }
// });
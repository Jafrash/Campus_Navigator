'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';

const RESOURCES = {"flutter_bootstrap.js": "02c349513dc451f8d1a79861f1f9c28e",
"version.json": "c83dcd0bc6fc5ad8e50c96af19474204",
"index.html": "bdf48e07c27e0eddeac107598a24f0c6",
"/": "bdf48e07c27e0eddeac107598a24f0c6",
"main.dart.js": "0df4731b7067032a04b37ba1b647d502",
"flutter.js": "83d881c1dbb6d6bcd6b42e274605b69c",
"favicon.png": "8af0443f485e96fd7ceaa217c21d4c85",
"icons/Icon-192.png": "aeaa95f0d35535305cd019eb5ae5cc8d",
"icons/Icon-maskable-192.png": "aeaa95f0d35535305cd019eb5ae5cc8d",
"icons/Icon-maskable-512.png": "c9bfc7e02315062d7f6b9f03f76d5268",
"icons/Icon-512.png": "c9bfc7e02315062d7f6b9f03f76d5268",
"manifest.json": "0189a23a4f4d2ac9a210d25e580b1e20",
"assets/AssetManifest.json": "76103d8ede51d5da79ecb298515e46b8",
"assets/NOTICES": "078454bf0ef58b31b35d80788018128c",
"assets/FontManifest.json": "dc3d03800ccca4601324923c0b1d6d57",
"assets/AssetManifest.bin.json": "0af472b32d28d57caa7dbdceeddbda22",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "33b7d9392238c04c131b6ce224e13711",
"assets/packages/flutter_map/lib/assets/flutter_map_logo.png": "208d63cc917af9713fc9572bd5c09362",
"assets/shaders/ink_sparkle.frag": "ecc85a2e95f5e9f53123dcaf8cb9b6ce",
"assets/lib/images/smiley.jpg": "02166bad975f501766dfee0a0875f2ac",
"assets/lib/images/workshop.png": "65c886588feed328152c587005fd9f3b",
"assets/lib/images/patronsbhavan.webp": "242c84182391922e75d5af4c937fb875",
"assets/lib/images/Naveaselogo.jpg": "175db54a79a4368f70a33ffdcc95e139",
"assets/lib/images/logo.png": "54804ae3b26952bfdd516e8eb0e5113f",
"assets/lib/images/lib.png": "4ef049457dc0c9bb8ada1ce39ca29d2c",
"assets/lib/images/dblock.png": "de6cd459668052e61aff551ede0d2728",
"assets/lib/images/VNRVJIETLogo.png": "f40d0d4cc0e15ea29e4ca8a12cc9d8cf",
"assets/AssetManifest.bin": "96221885b91e8677efc7107996b4c07c",
"assets/fonts/MaterialIcons-Regular.otf": "4ca6c72ea7bf167bda2ed04575ae1822",
"assets/assets/PG_1.json": "cdf6542dd4494eb23ef290a5f4c6dc0c",
"assets/assets/appLogo.png": "80a2f161e97a889aa6786aa8d8e4c828",
"assets/assets/PG_0.json": "217e9b6072461e2269f08fa3772a95ee",
"assets/assets/E-Block%2520Ground%2520Floor.json": "6acf7b4f40ac0b14bafdccf1524e1113",
"assets/assets/ABC_2.json": "ced848884a880dbfc72ff36f8e09145b",
"assets/assets/PG_4.json": "95161e5754859b6fbde1fa67732a73d9",
"assets/assets/ABC_4.json": "f81b6b0bf6464a38214c7fdaf1356f46",
"assets/assets/PG_2.json": "2591b8740ee874cd7d1b29cfb56af9bc",
"assets/assets/eblock-1.json": "b68ee30218215ce414b501e1fbecd628",
"canvaskit/skwasm.js": "ea559890a088fe28b4ddf70e17e60052",
"canvaskit/skwasm.js.symbols": "e72c79950c8a8483d826a7f0560573a1",
"canvaskit/canvaskit.js.symbols": "bdcd3835edf8586b6d6edfce8749fb77",
"canvaskit/skwasm.wasm": "39dd80367a4e71582d234948adc521c0",
"canvaskit/chromium/canvaskit.js.symbols": "b61b5f4673c9698029fa0a746a9ad581",
"canvaskit/chromium/canvaskit.js": "8191e843020c832c9cf8852a4b909d4c",
"canvaskit/chromium/canvaskit.wasm": "f504de372e31c8031018a9ec0a9ef5f0",
"canvaskit/canvaskit.js": "728b2d477d9b8c14593d4f9b82b484f3",
"canvaskit/canvaskit.wasm": "7a3f4ae7d65fc1de6a6e7ddd3224bc93"};
// The application shell files that are downloaded before a service worker can
// start.
const CORE = ["main.dart.js",
"index.html",
"flutter_bootstrap.js",
"assets/AssetManifest.bin.json",
"assets/FontManifest.json"];

// During install, the TEMP cache is populated with the application shell files.
self.addEventListener("install", (event) => {
  self.skipWaiting();
  return event.waitUntil(
    caches.open(TEMP).then((cache) => {
      return cache.addAll(
        CORE.map((value) => new Request(value, {'cache': 'reload'})));
    })
  );
});
// During activate, the cache is populated with the temp files downloaded in
// install. If this service worker is upgrading from one with a saved
// MANIFEST, then use this to retain unchanged resource files.
self.addEventListener("activate", function(event) {
  return event.waitUntil(async function() {
    try {
      var contentCache = await caches.open(CACHE_NAME);
      var tempCache = await caches.open(TEMP);
      var manifestCache = await caches.open(MANIFEST);
      var manifest = await manifestCache.match('manifest');
      // When there is no prior manifest, clear the entire cache.
      if (!manifest) {
        await caches.delete(CACHE_NAME);
        contentCache = await caches.open(CACHE_NAME);
        for (var request of await tempCache.keys()) {
          var response = await tempCache.match(request);
          await contentCache.put(request, response);
        }
        await caches.delete(TEMP);
        // Save the manifest to make future upgrades efficient.
        await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
        // Claim client to enable caching on first launch
        self.clients.claim();
        return;
      }
      var oldManifest = await manifest.json();
      var origin = self.location.origin;
      for (var request of await contentCache.keys()) {
        var key = request.url.substring(origin.length + 1);
        if (key == "") {
          key = "/";
        }
        // If a resource from the old manifest is not in the new cache, or if
        // the MD5 sum has changed, delete it. Otherwise the resource is left
        // in the cache and can be reused by the new service worker.
        if (!RESOURCES[key] || RESOURCES[key] != oldManifest[key]) {
          await contentCache.delete(request);
        }
      }
      // Populate the cache with the app shell TEMP files, potentially overwriting
      // cache files preserved above.
      for (var request of await tempCache.keys()) {
        var response = await tempCache.match(request);
        await contentCache.put(request, response);
      }
      await caches.delete(TEMP);
      // Save the manifest to make future upgrades efficient.
      await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
      // Claim client to enable caching on first launch
      self.clients.claim();
      return;
    } catch (err) {
      // On an unhandled exception the state of the cache cannot be guaranteed.
      console.error('Failed to upgrade service worker: ' + err);
      await caches.delete(CACHE_NAME);
      await caches.delete(TEMP);
      await caches.delete(MANIFEST);
    }
  }());
});
// The fetch handler redirects requests for RESOURCE files to the service
// worker cache.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== 'GET') {
    return;
  }
  var origin = self.location.origin;
  var key = event.request.url.substring(origin.length + 1);
  // Redirect URLs to the index.html
  if (key.indexOf('?v=') != -1) {
    key = key.split('?v=')[0];
  }
  if (event.request.url == origin || event.request.url.startsWith(origin + '/#') || key == '') {
    key = '/';
  }
  // If the URL is not the RESOURCE list then return to signal that the
  // browser should take over.
  if (!RESOURCES[key]) {
    return;
  }
  // If the URL is the index.html, perform an online-first request.
  if (key == '/') {
    return onlineFirst(event);
  }
  event.respondWith(caches.open(CACHE_NAME)
    .then((cache) =>  {
      return cache.match(event.request).then((response) => {
        // Either respond with the cached resource, or perform a fetch and
        // lazily populate the cache only if the resource was successfully fetched.
        return response || fetch(event.request).then((response) => {
          if (response && Boolean(response.ok)) {
            cache.put(event.request, response.clone());
          }
          return response;
        });
      })
    })
  );
});
self.addEventListener('message', (event) => {
  // SkipWaiting can be used to immediately activate a waiting service worker.
  // This will also require a page refresh triggered by the main worker.
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
    return;
  }
  if (event.data === 'downloadOffline') {
    downloadOffline();
    return;
  }
});
// Download offline will check the RESOURCES for all files not in the cache
// and populate them.
async function downloadOffline() {
  var resources = [];
  var contentCache = await caches.open(CACHE_NAME);
  var currentContent = {};
  for (var request of await contentCache.keys()) {
    var key = request.url.substring(origin.length + 1);
    if (key == "") {
      key = "/";
    }
    currentContent[key] = true;
  }
  for (var resourceKey of Object.keys(RESOURCES)) {
    if (!currentContent[resourceKey]) {
      resources.push(resourceKey);
    }
  }
  return contentCache.addAll(resources);
}
// Attempt to download the resource online before falling back to
// the offline cache.
function onlineFirst(event) {
  return event.respondWith(
    fetch(event.request).then((response) => {
      return caches.open(CACHE_NAME).then((cache) => {
        cache.put(event.request, response.clone());
        return response;
      });
    }).catch((error) => {
      return caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((response) => {
          if (response != null) {
            return response;
          }
          throw error;
        });
      });
    })
  );
}

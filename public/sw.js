
// Komentáre sú v slovenčine pre lepšiu zrozumiteľnosť
const CACHE_NAME = 'viandmo-v1';
const OFFLINE_URL = 'offline.html';

// Zoznam súborov na predbežné cachovanie pri inštalácii service workera
const ASSETS_TO_CACHE = [
  '/',
  '/index.html',
  '/offline.html',
  '/manifest.json',
  // Pridajte cesty k hlavným JS a CSS súborom, ak sú oddelené
  '/images/icons/icon-512x512.png', // Príklad ikony
];

// 1. Inštalácia Service Workera
self.addEventListener('install', (event) => {
  console.log('[Service Worker] Inštalácia...');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('[Service Worker] Predbežné cachovanie assetov');
        // Pridáme offline stránku do cache
        const offlineRequest = new Request(OFFLINE_URL, { cache: 'reload' });
        cache.add(offlineRequest);
        // Pridáme ostatné dôležité assety
        return cache.addAll(ASSETS_TO_CACHE);
      })
  );
  self.skipWaiting();
});

// 2. Aktivácia Service Workera a upratovanie starých cache
self.addEventListener('activate', (event) => {
  console.log('[Service Worker] Aktivácia...');
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('[Service Worker] Odstraňovanie starej cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// 3. Fetch event - stratégia Network First s Fallback na Cache
self.addEventListener('fetch', (event) => {
  // Ignorujeme requesty, ktoré nie sú GET
  if (event.request.method !== 'GET') {
    return;
  }
  
  // Ignorujeme requesty na /api/ (aby sme necachovali API volania)
  if (event.request.url.includes('/api/')) {
    return;
  }

  // Pre navigačné requesty (HTML stránky) použijeme Network First
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          // Ak je odpoveď v poriadku, uložíme ju do cache a vrátime
          if (response.ok) {
            const cacheResponse = response.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(event.request, cacheResponse);
            });
          }
          return response;
        })
        .catch(() => {
          // Ak sieť zlyhá, skúsime nájsť odpoveď v cache
          return caches.match(event.request)
            .then((cachedResponse) => {
              return cachedResponse || caches.match(OFFLINE_URL);
            });
        })
    );
  } else {
    // Pre ostatné assety (CSS, JS, obrázky) použijeme Cache First pre rýchlosť
    event.respondWith(
      caches.match(event.request)
        .then((cachedResponse) => {
          // Ak je v cache, vrátime z cache
          if (cachedResponse) {
            return cachedResponse;
          }
          // Inak fetchujeme zo siete, uložíme do cache a vrátime
          return fetch(event.request).then((networkResponse) => {
            const cacheResponse = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(event.request, cacheResponse);
            });
            return networkResponse;
          });
        })
        .catch(() => {
          // Pre obrázky môžeme vrátiť placeholder, ak zlyhá fetch aj cache
          if (event.request.destination === 'image') {
            // return caches.match('/images/placeholder.svg');
          }
          return new Response("Obsah nie je dostupný offline.", { status: 404, statusText: "Not Found"});
        })
    );
  }
});


// 4. Push notifikácie - prijatie správy
self.addEventListener('push', (event) => {
  console.log('[Service Worker] Prijatá push notifikácia.');
  
  let data;
  try {
    data = event.data.json();
  } catch (e) {
    data = {
      title: 'VI&MO - Novinky',
      body: event.data.text() || 'Máme pre vás nové informácie.',
      icon: '/images/icons/icon-192x192.png'
    };
  }

  const title = data.title || 'VI&MO — Nová Ponuka';
  const options = {
    body: data.body || 'Kliknite pre zobrazenie detailov.',
    icon: data.icon || '/images/icons/icon-192x192.png',
    badge: data.badge || '/images/icons/badge.png',
    vibrate: data.vibrate || [200, 100, 200],
    tag: data.tag || 'viandmo-notification',
    renotify: true,
    actions: data.actions || [
      { action: 'view', title: 'Zobraziť', icon: '/images/icons/view-icon.png' },
      { action: 'dismiss', title: 'Zatvoriť', icon: '/images/icons/close-icon.png' }
    ],
    data: { // Ukladáme URL pre kliknutie
      url: data.url || '/blog'
    }
  };

  event.waitUntil(self.registration.showNotification(title, options));
});

// 5. Push notifikácie - kliknutie na notifikáciu
self.addEventListener('notificationclick', (event) => {
  console.log('[Service Worker] Kliknutie na notifikáciu.');
  
  const notification = event.notification;
  const action = event.action;
  const notificationUrl = notification.data.url;

  notification.close();

  if (action === 'dismiss') {
    // Nerobíme nič, notifikácia sa len zatvorí
    return;
  }
  
  if (action === 'book') {
     event.waitUntil(
        clients.openWindow('/#kontakt')
    );
    return;
  }

  // "view" alebo kliknutie na telo notifikácie
  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then((windowClients) => {
      // Skontrolujeme, či je už nejaké okno aplikácie otvorené
      for (let i = 0; i < windowClients.length; i++) {
        const client = windowClients[i];
        if (client.url === notificationUrl && 'focus' in client) {
          return client.focus();
        }
      }
      // Ak nie je žiadne okno otvorené, otvoríme nové
      if (clients.openWindow) {
        return clients.openWindow(notificationUrl);
      }
    })
  );
});
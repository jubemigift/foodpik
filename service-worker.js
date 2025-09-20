// Service Worker for FoodPick Warri
// Handles caching, offline functionality, and background sync

const CACHE_NAME = 'foodpick-warri-v1';
const STATIC_CACHE = 'foodpick-static-v1';
const DYNAMIC_CACHE = 'foodpick-dynamic-v1';

// Files to cache immediately
const STATIC_FILES = [
  '/',
  '/index.html',
  '/restaurants.html',
  '/restaurant.html',
  '/cart.html',
  '/track.html',
  '/account.html',
  '/admin.html',
  '/assets/css/styles.css',
  '/assets/js/app.js',
  '/assets/js/data.js',
  '/assets/js/store.js',
  '/assets/js/ui.js',
  '/assets/js/cart.js',
  '/assets/js/admin.js',
  '/manifest.webmanifest',
  'https://cdn.jsdelivr.net/npm/remixicon@3.5.0/fonts/remixicon.css',
  'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap'
];

// Files to cache on demand
const DYNAMIC_FILES = [
  'https://images.pexels.com/',
  'https://fonts.gstatic.com/',
  'https://cdn.jsdelivr.net/'
];

// Install event - cache static files
self.addEventListener('install', (event) => {
  console.log('Service Worker: Installing...');
  
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then((cache) => {
        console.log('Service Worker: Caching static files');
        return cache.addAll(STATIC_FILES);
      })
      .then(() => {
        console.log('Service Worker: Static files cached');
        return self.skipWaiting();
      })
      .catch((error) => {
        console.error('Service Worker: Error caching static files', error);
      })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  console.log('Service Worker: Activating...');
  
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== STATIC_CACHE && cacheName !== DYNAMIC_CACHE) {
              console.log('Service Worker: Deleting old cache', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => {
        console.log('Service Worker: Activated');
        return self.clients.claim();
      })
  );
});

// Fetch event - serve cached files or fetch from network
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET requests
  if (request.method !== 'GET') {
    return;
  }

  // Skip chrome-extension and other non-http requests
  if (!request.url.startsWith('http')) {
    return;
  }

  event.respondWith(
    caches.match(request)
      .then((cachedResponse) => {
        // Return cached version if available
        if (cachedResponse) {
          console.log('Service Worker: Serving from cache', request.url);
          return cachedResponse;
        }

        // Otherwise fetch from network
        return fetch(request)
          .then((networkResponse) => {
            // Don't cache if not a valid response
            if (!networkResponse || networkResponse.status !== 200 || networkResponse.type !== 'basic') {
              return networkResponse;
            }

            // Clone the response
            const responseToCache = networkResponse.clone();

            // Determine which cache to use
            let cacheToUse = DYNAMIC_CACHE;
            
            // Cache images and fonts dynamically
            if (shouldCacheDynamically(request.url)) {
              caches.open(cacheToUse)
                .then((cache) => {
                  console.log('Service Worker: Caching dynamic resource', request.url);
                  cache.put(request, responseToCache);
                })
                .catch((error) => {
                  console.error('Service Worker: Error caching dynamic resource', error);
                });
            }

            return networkResponse;
          })
          .catch((error) => {
            console.log('Service Worker: Fetch failed, serving offline fallback', error);
            
            // Return offline fallback for HTML pages
            if (request.headers.get('accept').includes('text/html')) {
              return caches.match('/index.html');
            }
            
            // Return offline fallback for images
            if (request.headers.get('accept').includes('image')) {
              return new Response(
                '<svg width="200" height="200" xmlns="http://www.w3.org/2000/svg"><rect width="200" height="200" fill="#f0f0f0"/><text x="100" y="100" text-anchor="middle" fill="#999">Offline</text></svg>',
                { headers: { 'Content-Type': 'image/svg+xml' } }
              );
            }
          });
      })
  );
});

// Background sync for offline orders
self.addEventListener('sync', (event) => {
  console.log('Service Worker: Background sync triggered', event.tag);
  
  if (event.tag === 'background-sync-orders') {
    event.waitUntil(syncOfflineOrders());
  }
  
  if (event.tag === 'background-sync-cart') {
    event.waitUntil(syncOfflineCart());
  }
});

// Push notifications (for order updates)
self.addEventListener('push', (event) => {
  console.log('Service Worker: Push notification received');
  
  const options = {
    body: 'Your order status has been updated!',
    icon: '/assets/img/icon-192.png',
    badge: '/assets/img/badge-72.png',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    },
    actions: [
      {
        action: 'explore',
        title: 'Track Order',
        icon: '/assets/img/checkmark.png'
      },
      {
        action: 'close',
        title: 'Close',
        icon: '/assets/img/xmark.png'
      }
    ]
  };

  if (event.data) {
    const data = event.data.json();
    options.body = data.body || options.body;
    options.data = { ...options.data, ...data };
  }

  event.waitUntil(
    self.registration.showNotification('FoodPick Warri', options)
  );
});

// Notification click handling
self.addEventListener('notificationclick', (event) => {
  console.log('Service Worker: Notification clicked', event.action);
  
  event.notification.close();

  if (event.action === 'explore') {
    // Open track page
    event.waitUntil(
      clients.openWindow('/track.html')
    );
  } else if (event.action === 'close') {
    // Just close the notification
    return;
  } else {
    // Default action - open the app
    event.waitUntil(
      clients.matchAll().then((clientList) => {
        if (clientList.length > 0) {
          return clientList[0].focus();
        }
        return clients.openWindow('/');
      })
    );
  }
});

// Message handling (for communication with main thread)
self.addEventListener('message', (event) => {
  console.log('Service Worker: Message received', event.data);
  
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
  
  if (event.data && event.data.type === 'CACHE_CART') {
    cacheCartData(event.data.cart);
  }
  
  if (event.data && event.data.type === 'SYNC_ORDERS') {
    self.registration.sync.register('background-sync-orders');
  }
});

// Helper functions
function shouldCacheDynamically(url) {
  return DYNAMIC_FILES.some(pattern => url.includes(pattern)) ||
         url.includes('images.pexels.com') ||
         url.includes('fonts.gstatic.com') ||
         url.includes('cdn.jsdelivr.net');
}

async function syncOfflineOrders() {
  try {
    console.log('Service Worker: Syncing offline orders');
    
    // Get offline orders from IndexedDB or localStorage
    const offlineOrders = await getOfflineOrders();
    
    if (offlineOrders.length === 0) {
      console.log('Service Worker: No offline orders to sync');
      return;
    }

    // Attempt to sync each order
    for (const order of offlineOrders) {
      try {
        // In a real app, this would send to your API
        console.log('Service Worker: Syncing order', order.id);
        
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Remove from offline storage after successful sync
        await removeOfflineOrder(order.id);
        
        // Show success notification
        self.registration.showNotification('Order Synced', {
          body: `Order ${order.id} has been synced successfully!`,
          icon: '/assets/img/icon-192.png'
        });
        
      } catch (error) {
        console.error('Service Worker: Failed to sync order', order.id, error);
      }
    }
    
  } catch (error) {
    console.error('Service Worker: Error syncing offline orders', error);
  }
}

async function syncOfflineCart() {
  try {
    console.log('Service Worker: Syncing offline cart');
    
    // Get cart data from cache
    const cartData = await getOfflineCart();
    
    if (!cartData || cartData.items.length === 0) {
      console.log('Service Worker: No offline cart to sync');
      return;
    }

    // Restore cart data to localStorage
    await restoreCartData(cartData);
    
    console.log('Service Worker: Cart synced successfully');
    
  } catch (error) {
    console.error('Service Worker: Error syncing offline cart', error);
  }
}

async function cacheCartData(cartData) {
  try {
    const cache = await caches.open(DYNAMIC_CACHE);
    const response = new Response(JSON.stringify(cartData));
    await cache.put('/offline-cart', response);
    console.log('Service Worker: Cart data cached');
  } catch (error) {
    console.error('Service Worker: Error caching cart data', error);
  }
}

async function getOfflineCart() {
  try {
    const cache = await caches.open(DYNAMIC_CACHE);
    const response = await cache.match('/offline-cart');
    if (response) {
      return await response.json();
    }
    return null;
  } catch (error) {
    console.error('Service Worker: Error getting offline cart', error);
    return null;
  }
}

async function getOfflineOrders() {
  // In a real app, this would use IndexedDB
  // For now, return empty array
  return [];
}

async function removeOfflineOrder(orderId) {
  // In a real app, this would remove from IndexedDB
  console.log('Service Worker: Removing offline order', orderId);
}

async function restoreCartData(cartData) {
  // Send message to main thread to restore cart
  const clients = await self.clients.matchAll();
  clients.forEach(client => {
    client.postMessage({
      type: 'RESTORE_CART',
      cart: cartData
    });
  });
}

// Periodic background sync (if supported)
self.addEventListener('periodicsync', (event) => {
  console.log('Service Worker: Periodic sync triggered', event.tag);
  
  if (event.tag === 'order-updates') {
    event.waitUntil(checkOrderUpdates());
  }
});

async function checkOrderUpdates() {
  try {
    console.log('Service Worker: Checking for order updates');
    
    // In a real app, this would check with your API for order status updates
    // For now, just log
    
  } catch (error) {
    console.error('Service Worker: Error checking order updates', error);
  }
}

// Handle fetch errors gracefully
function handleFetchError(request) {
  if (request.headers.get('accept').includes('text/html')) {
    return caches.match('/offline.html');
  }
  
  if (request.headers.get('accept').includes('image')) {
    return new Response(
      '<svg width="200" height="200" xmlns="http://www.w3.org/2000/svg"><rect width="200" height="200" fill="#f0f0f0"/><text x="100" y="100" text-anchor="middle" fill="#999">Image unavailable</text></svg>',
      { headers: { 'Content-Type': 'image/svg+xml' } }
    );
  }
  
  return new Response('Offline', {
    status: 408,
    headers: { 'Content-Type': 'text/plain' }
  });
}

console.log('Service Worker: Script loaded');
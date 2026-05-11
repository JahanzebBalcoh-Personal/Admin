importScripts('https://www.gstatic.com/firebasejs/9.23.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.23.0/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyBfhbjD0b8UaISn1QrK6E-Ci5Yr7HcUTzA",
  authDomain: "sultans-cricket.firebaseapp.com",
  projectId: "sultans-cricket",
  storageBucket: "sultans-cricket.firebasestorage.app",
  messagingSenderId: "975861366304",
  appId: "1:975861366304:web:6bfef2fc3e3b01d0284645"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log('[sw.js] Received background message ', payload);
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: './icon.jpg'
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});

const CACHE_NAME = 'sultans-admin-v6';
const ASSETS = [
  './',
  './index.html',
  './icon.jpg'
];

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );
  self.skipWaiting();
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
      );
    })
  );
});

self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((res) => {
      return res || fetch(e.request);
    })
  );
});
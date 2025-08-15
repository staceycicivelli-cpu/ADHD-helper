importScripts('https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/12.1.0/firebase-messaging.js');

const firebaseConfig = {
  apiKey: "AIzaSyA8GxsEaNuijjz1ZGmKJOBkfuAAf6N3czo",
  authDomain: "adhd-easy-mode.firebaseapp.com",
  projectId: "adhd-easy-mode",
  storageBucket: "adhd-easy-mode.firebasestorage.app",
  messagingSenderId: "549461875846",
  appId: "1:549461875846:web:a671b5438249c0507",
  measurementId: "G-2RC70GV6HS"
};

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

// Background message handler
messaging.onBackgroundMessage(function(payload) {
  console.log('[firebase-messaging-sw.js] Received background message', payload);
  const notificationTitle = payload.notification?.title || "Hey friend!";
  const notificationOptions = {
    body: payload.notification?.body || "Need any help?",
    icon: '/icons/icon-192x192.png',
    badge: '/icons/badge-72.png',
    vibrate: [100, 50, 100]
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});

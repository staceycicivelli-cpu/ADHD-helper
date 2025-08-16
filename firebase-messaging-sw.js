// Import Firebase scripts
importScripts('https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/12.1.0/firebase-messaging.js');

// Initialize Firebase
firebase.initializeApp({
  apiKey: "AIzaSyA8GxsEaNuijjz1ZGmKJOBkfuAAf6N3czo",
  authDomain: "adhd-easy-mode.firebaseapp.com",
  projectId: "adhd-easy-mode",
  storageBucket: "adhd-easy-mode.appspot.com",
  messagingSenderId: "549461875846",
  appId: "1:549461875846:web:a671b543824fd8439c0507",
  measurementId: "G-2RC70GV6HS"
});

// Retrieve Firebase Messaging instance
const messaging = firebase.messaging();

// Background message handler
messaging.onBackgroundMessage(function(payload) {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);

  const notificationTitle = payload.notification?.title || 'Hey friend!';
  const notificationOptions = {
    body: payload.notification?.body || 'Need any help?',
    icon: 'icons/icon-192.png',   // make sure this path is correct
    badge: 'icons/badge-72.png',   // make sure this path is correct
    vibrate: [100, 50, 100],
    tag: 'default-notification'
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});

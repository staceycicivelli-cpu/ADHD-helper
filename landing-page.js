import { messaging, requestFirebasePermission } from './firebase-init.js';

async function initNotifications() {
  if ('serviceWorker' in navigator) {
    try {
      await navigator.serviceWorker.register('/firebase-messaging-sw.js');
      console.log('Service Worker registered.');
    } catch (err) {
      console.error('Service Worker registration failed:', err);
    }
  }

  await requestFirebasePermission();
}

// Hook test notification button
document.getElementById('testNotifBtn')?.addEventListener('click', async () => {
  alert("For FCM test, send a message from Firebase console instead!");
});

initNotifications();

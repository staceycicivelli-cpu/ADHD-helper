import { messaging, requestFirebasePermission } from '.firebase-init.js';

// Default notification times
let notificationTimes = [
  { hour: 8, minute: 0 },
  { hour: 13, minute: 0 },
  { hour: 18, minute: 0 },
  { hour: 21, minute: 0 } // 9 PM
];

let scheduledTimeouts = [];

// Register service worker and initialize notifications
async function initNotifications() {
  if ('serviceWorker' in navigator) {
    try {
      await navigator.serviceWorker.register('firebase-messaging-sw.js');
      console.log('Service Worker registered.');
    } catch (err) {
      console.error('Service Worker registration failed:', err);
    }
  }

  await requestFirebasePermission();
  scheduleAllNotifications();
}

// Schedule all notifications
function scheduleAllNotifications() {
  scheduledTimeouts.forEach(t => {
    clearTimeout(t);
    clearInterval(t);
  });
  scheduledTimeouts = [];

  notificationTimes.forEach((time, i) => scheduleNotification(time.hour, time.minute, i));
}

// Schedule a single notification
function scheduleNotification(hour, minute, index) {
  const now = new Date();
  let next = new Date();
  next.setHours(hour, minute, 0, 0);
  if (now >= next) next.setDate(next.getDate() + 1);

  const delay = next - now;

  const timeoutId = setTimeout(() => {
    sendLocalNotification(index);
    scheduledTimeouts[index] = setInterval(() => sendLocalNotification(index), 24*60*60*1000);
  }, delay);

  scheduledTimeouts[index] = timeoutId;
}

// Send notification via Service Worker
function sendLocalNotification(index) {
  if (Notification.permission === 'granted') {
    navigator.serviceWorker.ready.then(registration => {
      registration.showNotification("Hey friend!", {
        body: "Need any help?",
        icon: 'icons/icon-192.png',
        badge: 'icons/badge-72.png',
        vibrate: [100,50,100],
        tag: `reminder-${index}`
      });
    });
  }
}

// Snooze function
function snoozeNotification(index) {
  clearTimeout(scheduledTimeouts[index]);
  clearInterval(scheduledTimeouts[index]);
  scheduledTimeouts[index] = setTimeout(() => sendLocalNotification(index), 60*60*1000);
}

// Test notification button
document.addEventListener('DOMContentLoaded', () => {
  const testBtn = document.getElementById('testNotifBtn');
  if (testBtn) {
    testBtn.addEventListener('click', async () => {
      if (Notification.permission !== 'granted') {
        alert('You must allow notifications first!');
        return;
      }
      const registration = await navigator.serviceWorker.ready;
      registration.showNotification("Hey friend!", {
        body: "Need any help?",
        icon: 'icons/icon-192.png',
        badge: 'icons/badge-72.png',
        vibrate: [100,50,100],
        tag: 'test-notification'
      });
    });
  }

  // Initialize notifications
  initNotifications();
});



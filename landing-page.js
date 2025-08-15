// landing-page.js
import { messaging, requestFirebasePermission } from './firebase-init.js';

// Default notification times
let notificationTimes = [
  { hour: 8, minute: 0 },
  { hour: 13, minute: 0 },
  { hour: 18, minute: 0 },
  { hour: 21, minute: 0 } // 9 PM
];

let scheduledTimeouts = [];

// Request notification permission
async function requestNotificationPermission() {
  if (!('Notification' in window)) {
    alert('This browser does not support notifications.');
    return false;
  }

  let permission = Notification.permission;

  if (permission === 'granted') return true;
  if (permission === 'denied') {
    alert('Notifications blocked. Enable them in your browser settings.');
    return false;
  }

  permission = await Notification.requestPermission();
  return permission === 'granted';
}

// Initialize notifications on page load
async function initNotifications() {
  // Register Service Worker
  if ('serviceWorker' in navigator) {
    try {
      await navigator.serviceWorker.register('/firebase-messaging-sw.js');
      console.log('Service Worker registered.');
    } catch (err) {
      console.error('Service Worker registration failed:', err);
    }
  }

  const granted = await requestNotificationPermission();
  if (!granted) return;

  scheduleAllNotifications();
}

// Schedule all notifications
function scheduleAllNotifications() {
  // Clear previous schedules
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
    // Repeat every 24h
    scheduledTimeouts[index] = setInterval(() => sendLocalNotification(index), 24 * 60 * 60 * 1000);
  }, delay);

  scheduledTimeouts[index] = timeoutId;
}

// Send a local notification
function sendLocalNotification(index) {
  if (Notification.permission === 'granted') {
    navigator.serviceWorker.ready.then(registration => {
      registration.showNotification("Hey friend!", {
        body: "Need any help?",
        icon: '/icons/icon-192x192.png',
        badge: '/icons/badge-72.png',
        vibrate: [100, 50, 100],
        tag: `reminder-${index}`
      });
    });
  }
}

// Snooze a notification for 1 hour
function snoozeNotification(index) {
  clearTimeout(scheduledTimeouts[index]);
  clearInterval(scheduledTimeouts[index]);
  scheduledTimeouts[index] = setTimeout(() => sendLocalNotification(index), 60 * 60 * 1000);
}

// Setup Test Notification button
document.addEventListener('DOMContentLoaded', () => {
  const testBtn = document.getElementById('testNotifBtn');
  if (testBtn) {
    testBtn.addEventListener('click', async () => {
      const granted = await requestNotificationPermission();
      if (!granted) return;

      const registration = await navigator.serviceWorker.ready;
      registration.showNotification("Hey friend!", {
        body: "Need any help?",
        icon: '/icons/icon-192x192.png',
        badge: '/icons/badge-72.png',
        vibrate: [100, 50, 100],
        tag: 'test-notification'
      });
    });
  }

  // Start notifications after DOM is ready
  initNotifications();
});

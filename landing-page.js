import { messaging, onMessage, requestFirebasePermission } from '/ADHD-helper/firebase-init.js';

// Default notification times (for local scheduling if needed)
let notificationTimes = [
  { hour: 8, minute: 0 },
  { hour: 13, minute: 0 },
  { hour: 18, minute: 0 },
  { hour: 21, minute: 0 } // 9 PM
];

let scheduledTimeouts = [];

// Register Service Worker
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/ADHD-helper/firebase-messaging-sw.js')
    .then((reg) => console.log("Service Worker registered with scope:", reg.scope))
    .catch((err) => console.error("Service Worker registration failed:", err));
}

// Initialize notifications
async function initNotifications() {
  await requestFirebasePermission();
  scheduleAllNotifications();
}

// Optional local notification scheduling
function scheduleAllNotifications() {
  scheduledTimeouts.forEach(t => { clearTimeout(t); clearInterval(t); });
  scheduledTimeouts = [];

  notificationTimes.forEach((time, i) => scheduleNotification(time.hour, time.minute, i));
}

function scheduleNotification(hour, minute, index) {
  const now = new Date();
  let next = new Date();
  next.setHours(hour, minute, 0, 0);
  if (now >= next) next.setDate(next.getDate() + 1);

  const delay = next - now;

  scheduledTimeouts[index] = setTimeout(() => {
    sendLocalNotification(index);
    scheduledTimeouts[index] = setInterval(() => sendLocalNotification(index), 24*60*60*1000);
  }, delay);
}

function sendLocalNotification(index) {
  if (Notification.permission === 'granted') {
    navigator.serviceWorker.ready.then(registration => {
      registration.showNotification("Hey friend!", {
        body: "Need any help?",
        icon: '/ADHD-helper/icons/icon-192.png',
        badge: '/ADHD-helper/icons/badge-72.png',
        vibrate: [100, 50, 100],
        tag: `reminder-${index}`
      });
    });
  }
}

// Handle foreground FCM messages
onMessage(messaging, (payload) => {
  console.log("Foreground message received:", payload);
  alert(payload.notification?.title + "\n" + payload.notification?.body);
});

// Optional: attach to a button
const notifyBtn = document.getElementById("notify-btn");
if (notifyBtn) {
  notifyBtn.addEventListener("click", requestFirebasePermission);
}

// Start everything
initNotifications();

import { messaging, requestFirebasePermission } from './firebase-init.js';

// Default notification times
let notificationTimes = [
  { hour: 8, minute: 0 },
  { hour: 13, minute: 0 },
  { hour: 18, minute: 0 }
  { hour: 21, minute: 0 }
];

let scheduledTimeouts = [];

async function initNotifications() {
  await requestFirebasePermission();
  scheduleAllNotifications();
}

function scheduleAllNotifications() {
  scheduledTimeouts.forEach(t => clearTimeout(t));
  scheduledTimeouts = [];

  notificationTimes.forEach((time, i) => scheduleNotification(time.hour, time.minute, i));
}

function scheduleNotification(hour, minute, index) {
  const now = new Date();
  let next = new Date();
  next.setHours(hour, minute, 0, 0);
  if (now >= next) next.setDate(next.getDate() + 1);

  const delay = next - now;

  const timeoutId = setTimeout(() => {
    sendLocalNotification(index);
    scheduledTimeouts[index] = setInterval(() => sendLocalNotification(index), 24 * 60 * 60 * 1000);
  }, delay);

  scheduledTimeouts[index] = timeoutId;
}

function sendLocalNotification(index) {
  if (Notification.permission === 'granted') {
    navigator.serviceWorker.ready.then(registration => {
      registration.showNotification("Hey friend!", {
        body: "Need any help?",
        icon: '/icons/icon-192x192.png',
        badge: '/icons/badge-72x72.png',
        vibrate: [100,50,100],
        tag: `reminder-${index}`
      });
    });
  }
}

function snoozeNotification(index) {
  clearTimeout(scheduledTimeouts[index]);
  clearInterval(scheduledTimeouts[index]);
  scheduledTimeouts[index] = setTimeout(() => sendLocalNotification(index), 60*60*1000);
}

// Hook snooze buttons and time inputs (like previous example)
document.querySelectorAll('.notif-time-input').forEach((input,i)=>{
  input.value = `${notificationTimes[i].hour.toString().padStart(2,'0')}:${notificationTimes[i].minute.toString().padStart(2,'0')}`;
  input.addEventListener('change', ()=>{
    const [h,m] = input.value.split(':').map(Number);
    notificationTimes[i] = {hour:h, minute:m};
    scheduleAllNotifications();
  });
});

document.querySelectorAll('.snooze-btn').forEach((btn,i)=>{
  btn.addEventListener('click', ()=>snoozeNotification(i));
});

// Start notifications on page load
initNotifications();

// Test notification in 10 seconds
async function testNotification() {
  await requestFirebasePermission(); // Make sure user has granted permission

  setTimeout(() => {
    if (Notification.permission === 'granted') {
      navigator.serviceWorker.ready.then(registration => {
        registration.showNotification("Hey friend!", {
          body: "This is a test notification",
          icon: '/icons/icon-192x192.png',
          badge: '/icons/badge-72x72.png',
          vibrate: [100,50,100],
          tag: 'test-notification'
        });
      });
    }
  }, 10000); // 10 seconds
}

// Call it on page load
testNotification();

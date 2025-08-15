// firebase-init.js
import { getMessaging, getToken, onMessage } from 'https://www.gstatic.com/firebasejs/12.1.0/firebase-messaging.js';
import { initializeApp } from 'https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js';

const firebaseConfig = {
  apiKey: "AIzaSyA8GxsEaNuijjz1ZGmKJOBkfuAAf6N3czo",
  authDomain: "adhd-easy-mode.firebaseapp.com",
  projectId: "adhd-easy-mode",
  storageBucket: "adhd-easy-mode.firebasestorage.app",
  messagingSenderId: "549461875846",
  appId: "1:549461875846:web:a671b543824fd8439c0507",
  measurementId: "G-2RC70GV6HS"
};

const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

const VAPID_KEY = "BNij1cN2k13LMGOOYqGXlBTJO7MyVkIoEik7PBZxpUIngIm3VnOMBEvoVF6Ed48reyq9UOtrT1A2MV96mEeUzK0";

// Request permission and get token
export async function requestFirebasePermission() {
  try {
    const permission = await Notification.requestPermission();
    if (permission === 'granted') {
      const token = await getToken(messaging, { vapidKey: VAPID_KEY });
      console.log('FCM Token:', token);
    } else {
      console.log('Notification permission denied');
    }
  } catch (err) {
    console.error('Error getting FCM token', err);
  }
}

// Handle messages while app is in foreground
onMessage(messaging, payload => {
  console.log('Foreground message received: ', payload);
  new Notification(payload.notification.title, {
    body: payload.notification.body,
    icon: '/icons/icon-192x192.png'
  });
});

export { messaging };

// Firebase initialization and FCM setup
import { initializeApp } from 'https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js';
import { getMessaging, getToken, onMessage as fcmOnMessage } from 'https://www.gstatic.com/firebasejs/12.1.0/firebase-messaging.js';

const firebaseConfig = {
  apiKey: "AIzaSyA8GxsEaNuijjz1ZGmKJOBkfuAAf6N3czo",
  authDomain: "adhd-easy-mode.firebaseapp.com",
  projectId: "adhd-easy-mode",
  storageBucket: "adhd-easy-mode.appspot.com",
  messagingSenderId: "549461875846",
  appId: "1:549461875846:web:a671b543824fd8439c0507",
  measurementId: "G-2RC70GV6HS"
};

const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

// Request permission and get FCM token
export async function requestFirebasePermission() {
  console.log("Requesting notification permission...");
  try {
    const permission = await Notification.requestPermission();
    if (permission !== 'granted') {
      console.log("Notification permission denied");
      return null;
    }

    const registration = await navigator.serviceWorker.ready;

    const token = await getToken(messaging, {
      vapidKey: "BNij1cN2k13LMGOOYqGXlBTJO7MyVkIoEik7PBZxpUIngIm3VnOMBEvoVF6Ed48reyq9UOtrT1A2MV96mEeUzK0",
      serviceWorkerRegistration: registration
    });

    console.log("FCM token:", token);
    alert("Notification permission granted!\nFCM Token:\n" + token);
    return token;
  } catch (err) {
    console.error("Error getting FCM token:", err);
    return null;
  }
}

// Properly export onMessage under the name fcmOnMessage
export { messaging, fcmOnMessage };



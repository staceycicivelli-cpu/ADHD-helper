// firebase-init.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";
import { getMessaging, getToken } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-messaging.js";

// Your Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyA8GxsEaNuijjz1ZGmKJOBkfuAAf6N3czo",
  authDomain: "adhd-easy-mode.firebaseapp.com",
  projectId: "adhd-easy-mode",
  storageBucket: "adhd-easy-mode.firebasestorage.app",
  messagingSenderId: "549461875846",
  appId: "1:549461875846:web:a671b543824fd8439c0507",
  measurementId: "G-2RC70GV6HS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const messaging = getMessaging(app);

// Request permission and get FCM token
export async function requestFirebasePermission() {
  try {
    const permission = await Notification.requestPermission();
    if (permission === 'granted') {
      const token = await getToken(messaging, { vapidKey: "BNij1cN2k13LMGOOYqGXlBTJO7MyVkIoEik7PBZxpUIngIm3VnOMBEvoVF6Ed48reyq9UOtrT1A2MV96mEeUzK0" });
      console.log("FCM Token:", token);
      // Send token to your server if you want to schedule messages from Firebase
    } else {
      console.warn("Notification permission not granted.");
    }
  } catch (err) {
    console.error("FCM permission error:", err);
  }
}


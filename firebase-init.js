// firebase-init.js
import { getMessaging, getToken } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-messaging.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA8GxsEaNuijjz1ZGmKJOBkfuAAf6N3czo",
  authDomain: "adhd-easy-mode.firebaseapp.com",
  projectId: "adhd-easy-mode",
  storageBucket: "adhd-easy-mode.appspot.com",
  messagingSenderId: "549461875846",
  appId: "1:549461875846:web:a671b543824fd8439c0507",
  measurementId: "G-2RC70GV6HS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

// Your public VAPID key from Firebase console
const VAPID_KEY = "BNij1cN2k13LMGOOYqGXlBTJO7MyVkIoEik7PBZxpUIngIm3VnOMBEvoVF6Ed48reyq9UOtrT1A2MV96mEeUzK0";

// Request permission and get FCM token
async function requestFirebasePermission() {
  try {
    const permission = await Notification.requestPermission();
    if (permission === 'granted') {
      const token = await getToken(messaging, { vapidKey: VAPID_KEY });
      console.log("FCM token:", token);
      // You can send this token to your server here if needed
      return token;
    } else {
      console.warn("Notification permission not granted.");
    }
  } catch (err) {
    console.error("FCM token request failed:", err);
  }
}

export { messaging, requestFirebasePermission };

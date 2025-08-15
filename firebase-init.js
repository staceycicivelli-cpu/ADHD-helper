// firebase-init.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getMessaging, getToken, onMessage } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-messaging.js";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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
const messaging = getMessaging(app);

// Ask permission and get FCM token
export async function requestFirebasePermission() {
  try {
    const permission = await Notification.requestPermission();
    if (permission === 'granted') {
      const token = await getToken(messaging, {
        vapidKey: "BNij1cN2k13LMGOOYqGXlBTJO7MyVkIoEik7PBZxpUIngIm3VnOMBEvoVF6Ed48reyq9UOtrT1A2MV96mEeUzK0" // from Firebase project settings (Cloud Messaging)
      });
      console.log("FCM Token:", token);
    } else {
      console.warn("Notification permission not granted.");
    }
  } catch (err) {
    console.error("Error getting permission or token:", err);
  }
}

// Optional: handle foreground messages
onMessage(messaging, (payload) => {
  console.log("Message received in foreground:", payload);
});

export { messaging };

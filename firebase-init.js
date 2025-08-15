// Initialize Firebase
import { getMessaging, getToken, onMessage } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-messaging.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";

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

const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

const VAPID_KEY = "BNij1cN2k13LMGOOYqGXlBTJO7MyVkIoEik7PBZxpUIngIm3VnOMBEvoVF6Ed48reyq9UOtrT1A2MV96mEeUzK0";

// Request permission and get FCM token
async function requestFirebasePermission() {
  try {
    const permission = await Notification.requestPermission();
    if(permission !== 'granted') throw new Error('Permission not granted');
    const token = await getToken(messaging, { vapidKey: VAPID_KEY });
    console.log('FCM token:', token);
    return token;
  } catch (err) {
    console.error('FCM permission error:', err);
  }
}

export { messaging, requestFirebasePermission };

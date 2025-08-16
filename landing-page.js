import { initializeApp } from 'https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js';
import { getMessaging, getToken } from 'https://www.gstatic.com/firebasejs/12.1.0/firebase-messaging.js';

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

if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("/ADHD-helper/firebase-messaging-sw.js")
    .then((registration) => {
      console.log("Service Worker registered with scope:", registration.scope);
    })
    .catch((err) => {
      console.error("Service Worker registration failed:", err);
    });
}

export async function requestFirebasePermission() {
  console.log("Requesting notification permission...");
  try {
    const token = await getToken(messaging, {
      vapidKey: "BNij1cN2k13LMGOOYqGXlBTJO7MyVkIoEik7PBZxpUIngIm3VnOMBEvoVF6Ed48reyq9UOtrT1A2MV96mEeUzK0", // paste your real VAPID key here
      serviceWorkerRegistration: await navigator.serviceWorker.ready,
    });

    if (token) {
      console.log("FCM Token:", token);
      alert("Notification permission granted! Token in console.");
      // send token to your backend if you want to store it
    } else {
      console.log("No registration token available. Request permission to generate one.");
    }
  } catch (error) {
    console.error("Error retrieving token:", error);
  }
}

// Handle foreground messages
onMessage(messaging, (payload) => {
  console.log("Message received in foreground:", payload);
  alert("New notification: " + (payload.notification?.title || "No title"));
});

// Attach function to button
document.getElementById("notify-btn").addEventListener("click", requestFirebasePermission);


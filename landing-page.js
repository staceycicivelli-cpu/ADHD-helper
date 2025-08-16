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

async function requestFirebasePermission() {
  const permission = await Notification.requestPermission();
  if (permission === 'granted') {
    const token = await getToken(messaging, {
  vapidKey: "BNij1cN2k13LMGOOYqGXlBTJO7MyVkIoEik7PBZxpUIngIm3VnOMBEvoVF6Ed48reyq9UOtrT1A2MV96mEeUzK0",
  serviceWorkerRegistration: await navigator.serviceWorker.register("./firebase-messaging-sw.js"),
});

    console.log("FCM token:", token);
    alert("FCM token generated! Check console to copy it.");
  } else {
    alert("Notifications permission denied");
  }
}

requestFirebasePermission();


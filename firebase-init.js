// firebase-init.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.11/firebase-app.js";
import { getMessaging } from "https://www.gstatic.com/firebasejs/9.6.11/firebase-messaging.js";

// Your Firebase config
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
export const messaging = getMessaging(app);

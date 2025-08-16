// landing-page.js
import { messaging } from "./firebase-init.js";
import { getToken, onMessage } from "https://www.gstatic.com/firebasejs/9.6.11/firebase-messaging.js";

const VAPID_KEY = "BNij1cN2k13LMGOOYqGXlBTJO7MyVkIoEik7PBZxpUIngIm3VnOMBEvoVF6Ed48reyq9UOtrT1A2MV96mEeUzK0";

// Ask for permission & get FCM token
async function requestPermission() {
  try {
    const permission = await Notification.requestPermission();
    if (permission === "granted") {
      console.log("Notification permission granted.");
      const currentToken = await getToken(messaging, { vapidKey: VAPID_KEY });
      if (currentToken) {
        console.log("FCM Token:", currentToken);
        // Send token to your server if needed
      } else {
        console.warn("No registration token available.");
      }
    } else {
      console.warn("Notification permission denied.");
    }
  } catch (error) {
    console.error("Error getting notification permission:", error);
  }
}

// Foreground message listener
onMessage(messaging, (payload) => {
  console.log("Message received in foreground:", payload);
  new Notification(payload.notification.title, {
    body: payload.notification.body,
    icon: payload.notification.icon
  });
});

// Run on page load
requestPermission();

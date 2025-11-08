import { initializeApp, getApps, getApp, FirebaseApp } from "firebase/app";
import { getAnalytics, isSupported, Analytics } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB2ozyAWvKtY33xM1rn5tUd6pRRU7H9y7k",
  authDomain: "videojuego-de-matematicas.firebaseapp.com",
  projectId: "videojuego-de-matematicas",
  storageBucket: "videojuego-de-matematicas.firebasestorage.app",
  messagingSenderId: "896119917407",
  appId: "1:896119917407:web:700b7af8718029257fc4ea",
  measurementId: "G-2Y930FDK93",
};

// Initialize Firebase App (idempotent)
let firebaseApp: FirebaseApp;
if (!getApps().length) {
  firebaseApp = initializeApp(firebaseConfig);
} else {
  firebaseApp = getApp();
}

// Initialize analytics only on the client and only if supported
async function initAnalytics(): Promise<Analytics | null> {
  if (typeof window === "undefined") return null; // server-side: don't init
  try {
    const supported = await isSupported();
    if (supported) {
      return getAnalytics(firebaseApp);
    }
  } catch (e) {
    // analytics not available / blocked — fail silently
    // console.warn('Firebase Analytics not supported or failed to initialize', e);
  }
  return null;
}

export { firebaseApp, initAnalytics, firebaseConfig };

import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, OAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Configuration from Skolyoga mobile app (skolyoga-app)
const firebaseConfig = {
  apiKey: "AIzaSyCz32U40-5TyKON39vd1Nkg3r1BSGePtGI",
  authDomain: "skolyoga-app.firebaseapp.com",
  projectId: "skolyoga-app",
  storageBucket: "skolyoga-app.firebasestorage.app",
  messagingSenderId: "456068553138",
  appId: "1:456068553138:web:d7f66e88f5a26897d46cab",
  measurementId: "G-4BDVFY888W",
};

// Initialize Firebase (singleton pattern for Next.js SSR / Fast Refresh)
const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const googleProvider = new GoogleAuthProvider();
export const appleProvider = new OAuthProvider("apple.com");
appleProvider.addScope("email");
appleProvider.addScope("name");

export default app;

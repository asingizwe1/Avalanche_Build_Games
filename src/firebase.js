// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyANj7xiMDuYD0JqwK9H1OlH3A_dt-Z8Xn0",
  authDomain: "outer-world-8ee3b.firebaseapp.com",
  projectId: "outer-world-8ee3b",
  storageBucket: "outer-world-8ee3b.firebasestorage.app",
  messagingSenderId: "954473892589",
  appId: "1:954473892589:web:a933ef31abb09272465ae4",
  measurementId: "G-C58V45D0F8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);


// Export Firestore DB
export const db = getFirestore(app);
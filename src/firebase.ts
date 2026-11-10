// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";

// Your web app's Firebase configuration
export const firebaseConfig = {
  apiKey: "AIzaSyBs6cNwXiIa1sMRB24eBlMbFrOHZ951qow",
  authDomain: "akshay-krishna-ks.firebaseapp.com",
  projectId: "akshay-krishna-ks",
  storageBucket: "akshay-krishna-ks.firebasestorage.app",
  messagingSenderId: "1075064563198",
  appId: "1:1075064563198:web:0f6394a4fc6b7c01abccaf",
  measurementId: "G-SH7FEBEHKH"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

// Initialize Analytics conditionally
export const analyticsPromise = typeof window !== 'undefined'
  ? isSupported().then((supported) => (supported ? getAnalytics(app) : null))
  : Promise.resolve(null);

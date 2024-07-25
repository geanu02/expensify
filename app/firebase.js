// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getFirestore } from "firebase/firestore";
// Required for side-effects
import "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: `${process.env.NEXT_PUBLIC_FIREBASE_DOMAIN}.firebaseapp.com`,
  projectId: `${process.env.NEXT_PUBLIC_FIREBASE_DOMAIN}`,
  storageBucket: `${process.env.NEXT_PUBLIC_FIREBASE_DOMAIN}.appspot.com`,
  messagingSenderId: "634935917767",
  appId: "1:634935917767:web:db613d8be392018f4e92e2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)
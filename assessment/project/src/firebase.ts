// src/firebaseConfig.ts
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Replace the below config with your actual Firebase project config
const firebaseConfig = {
  apiKey: "AIzaSyAkRXolvaVuaP1Nz_7d6flNeWvYu1HWKQo",
  authDomain: "assessmentapp-db741.firebaseapp.com",
  projectId: "assessmentapp-db741",
  storageBucket: "assessmentapp-db741.firebasestorage.app",
  messagingSenderId: "94464432719",
  appId: "1:94464432719:web:ebe8fe90047f2fc8f3e83a",
  measurementId: "G-1VL4YMJVL6"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
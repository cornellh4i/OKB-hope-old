// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

import { getAnalytics } from "firebase/analytics";
import './chatroom.css';

import { useAuthState } from "react-firebase-hooks/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDcvKWnBLeKJ3HqyYNKvlK9VHfyPmQ4T9c",
  authDomain: "okbhomepage-chatbot.firebaseapp.com",
  projectId: "okbhomepage-chatbot",
  storageBucket: "okbhomepage-chatbot.appspot.com",
  messagingSenderId: "407561377548",
  appId: "1:407561377548:web:3a901ead06cc45925d9b29",
  measurementId: "G-CE17EQ382X"
};

// // Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

// export { auth, db,  };

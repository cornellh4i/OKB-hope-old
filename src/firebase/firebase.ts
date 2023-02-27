// // Import the functions you need from the SDKs you need
// import { getApps, initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyAWCKEkLBpYgN_dIJl6ncEHPngL21j3kz4",
//   authDomain: "okb-hope.firebaseapp.com",
//   projectId: "okb-hope",
//   storageBucket: "okb-hope.appspot.com",
//   messagingSenderId: "321787147976",
//   appId: "1:321787147976:web:190348bb9e96343a7b97fd",
//   measurementId: "G-0EKC171E9X"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);


import { initializeApp, getApps, getApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"

// TODO: Replace with your own Firebase config
// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCm_I31oPosmotAYcCRUANjOmtajNY_y7k",
  authDomain: "chatroom-d4a89.firebaseapp.com",
  projectId: "chatroom-d4a89",
  storageBucket: "chatroom-d4a89.appspot.com",
  messagingSenderId: "1001079042465",
  appId: "1:1001079042465:web:9ba7a9a63c0b07888fdbe0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app)

export { db }


import React from "react";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBTzKQpFSWs2xb9ft4l3AgsLUdHokwfp34",
  authDomain: "chatroom-1681c.firebaseapp.com",
  projectId: "chatroom-1681c",
  storageBucket: "chatroom-1681c.appspot.com",
  messagingSenderId: "152038362616",
  appId: "1:152038362616:web:c127cf01c402a620d35a0d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

function Chatroom() {
  return <p>CHAT ROOM</p>
}
export default Chatroom;

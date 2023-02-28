import React, { useEffect, useRef, useState } from 'react';
// import './App.css';

// import firebase from 'firebase/app';
// import 'firebase/firestore';
// import 'firebase/auth';
// import 'firebase/analytics';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/analytics';
import { getFirestore } from "firebase/firestore"
import { Query } from '@firebase/firestore-types'
import { DocumentData } from '@firebase/firestore-types';





import { useAuthState } from 'react-firebase-hooks/auth';
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { initializeApp } from 'firebase/app';
// import { beforeAuthStateChanged } from 'react-firebase-hooks/auth';



// import React, { useEffect, useState } from "react";
// import firebase from 'firebase/app';
// import { initializeApp } from "firebase/app";
// import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
// import { useAuthState } from "react-firebase-hooks/auth";
import { orderBy, QueryDocumentSnapshot } from "firebase/firestore";
import { collection, addDoc, query, serverTimestamp, getDocs } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyCm_I31oPosmotAYcCRUANjOmtajNY_y7k",
  authDomain: "chatroom-d4a89.firebaseapp.com",
  projectId: "chatroom-d4a89",
  storageBucket: "chatroom-d4a89.appspot.com",
  messagingSenderId: "1001079042465",
  appId: "1:1001079042465:web:9ba7a9a63c0b07888fdbe0"
};

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)



const auth = getAuth(app);
const firestore = firebase.firestore();
const analytics = firebase.analytics();

export { db }
function Chatroom() {

  const [user] = useAuthState(auth);

  return (
    <div className="App">
      <header>
        <h1>⚛️🔥💬</h1>
        <SignOut />
      </header>

      <section>
        {user ? <ChatRoom /> : <SignIn />}
      </section>

    </div>
  );
}

function SignIn() {

  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    signInWithPopup(auth, provider);
  }

  return (
    <>
      <button className="sign-in" onClick={signInWithGoogle}>Sign in with Google</button>
      <p>Do not violate the community guidelines or you will be banned for life!</p>
    </>
  )

}

function SignOut() {
  return auth.currentUser && (
    <button className="sign-out" onClick={() => auth.signOut()}>Sign Out</button>
  )
}


function ChatRoom() {
  const dummy = useRef<null | HTMLDivElement>(null);
  const messagesRef = firestore.collection('messages');
  const ref = messagesRef.orderBy('createdAt').limit(25);
  const qdoc = query(messagesRef, orderBy('createdAt'));

  const [messages, setMessages] = useState<DocumentData[]>([]);

  useEffect(() => {
    const getMessages = async () => {
      const querySnapshot = await getDocs(qdoc);
      const messageData = querySnapshot.docs.map((doc) => doc.data());
      setMessages(messageData);
    };
    getMessages();
  });

  const [formValue, setFormValue] = useState('');


  const sendMessage = async (e: React.ChangeEvent<any>) => {
    e.preventDefault();

    if (auth.currentUser) {
      const { uid, photoURL } = auth.currentUser;


      await messagesRef.add({
        text: formValue,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        uid,
        photoURL
      })

      setFormValue('');
      if (dummy.current) {
        dummy.current.scrollIntoView({ behavior: 'smooth' });
      }
      else {
        console.log("dummy.current is null");
      }



    }
    else {
      console.log("user is null");
    }
  }


  return (<>
    <main>
      {messages && messages.map(msg => <ChatMessage key={msg.id} message={msg} />)}

      <span ref={dummy}></span>

    </main>

    <form onSubmit={sendMessage}>

      <input value={formValue} onChange={(e) => setFormValue(e.target.value)} placeholder="say something nice" />

      <button type="submit" disabled={!formValue}>🕊️</button>

    </form>
  </>)
}

interface Props {
  // onClick: () => void;
  message: DocumentData;
}

function ChatMessage(props: Props) { //edit Props interface
  const { text, uid, photoURL } = props.message;

  if (auth.currentUser) {
    const messageClass = uid === auth.currentUser.uid ? 'sent' : 'received';


    return (<>
      <div className={`message ${messageClass}`}>
        <img src={photoURL || 'https://api.adorable.io/avatars/23/abott@adorable.png'} />
        <p>{text}</p>
      </div>
    </>)
  }
  else {
    console.log("auth.currentuser is null");
    return null;
  }
}


export default Chatroom;
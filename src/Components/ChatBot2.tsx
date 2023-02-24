
import firebase from 'firebase/app';
import { initializeApp } from "firebase/app";
import { getFirestore, limit } from "firebase/firestore";
import { collection, addDoc, query, serverTimestamp, getDocs } from 'firebase/firestore'

import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { DocumentData, orderBy, QueryDocumentSnapshot } from "firebase/firestore";

import { useState, useEffect } from 'react';

// TODO: Replace the following with your app's Firebase project configuration
// See: https://support.google.com/firebase/answer/7015592
const firebaseConfig = {
  apiKey: "AIzaSyDRd9cKtnIGCAYNv4h_mkLzBHwcH7M24NE",
  authDomain: "okb-chatbot.firebaseapp.com",
  projectId: "okb-chatbot",
  storageBucket: "okb-chatbot.appspot.com",
  messagingSenderId: "973958671145",
  appId: "1:973958671145:web:6e12728b6c1a19a836e538",
  measurementId: "G-V48PYY56GC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);
const auth = getAuth(app);


const ChatBot2 = () => {
  const [user] = useAuthState(auth);

  return (
    <div className="App">
      <header>
        <h1>⚛️🔥💬</h1>
        <SignOut />
      </header>

      <section>
        <ChatRoom />
        {user ? <ChatRoom /> : <SignIn />}
      </section>

    </div>
  );
}

const SignIn = () => {

  async function signInWithGoogle() {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider);
  }

  return (
    <>
      <button className="sign-in" onClick={signInWithGoogle}>Sign in with Google</button>
      <p>Do not violate the community guidelines or you will be banned for life!</p>
    </>
  )

}

const SignOut = () => {
  return auth.currentUser && (
    <button className="sign-out" onClick={() => auth.signOut()}>Sign Out</button>
  )
}


const ChatRoom = () => {
  const messagesRef = collection(db, 'messages');
  const queryDoc = query(messagesRef, orderBy('createdAt'), limit(25));

  const [messages, setMessages] = useState<DocumentData[]>([]);

  useEffect(() => {
    const getMessages = async () => {
      const querySnapshot = await getDocs(queryDoc);
      const messageData = querySnapshot.docs.map((doc) => doc.data());
      setMessages(messageData);
    };
    getMessages();
  });

  const [formValue, setFormValue] = useState('');


  const sendMessage = async (e: any) => {
    e.preventDefault();

    const uid = auth.currentUser?.uid;
    const photoURL = auth.currentUser?.photoURL

    try {
      const docRef = await addDoc(messagesRef, {
        text: formValue,
        createdAt: serverTimestamp(),
        uid,
        photoURL
      });
      console.log("Document written with ID: ", docRef.id)
    } catch (e) {
      console.error("error adding document: ", e)
    }

    setFormValue('');
  }

  return (<>
    <main>

      {messages && messages.map(msg => <ChatMessage key={msg.id} message={msg} />)}

    </main>

    <form onSubmit={sendMessage}>

      <input value={formValue} onChange={(e) => setFormValue(e.target.value)} placeholder="say something nice" />

      <button type="submit" disabled={!formValue}>🕊️</button>

    </form>
  </>)
}


const ChatMessage = (props: any) => {
  const { text, uid, photoURL } = props.message;

  const messageClass = uid === auth.currentUser?.uid ? 'sent' : 'received';

  return (<>
    <div className={`message ${messageClass}`}>
      <img src={photoURL || 'https://api.adorable.io/avatars/23/abott@adorable.png'} />
      <p>{text}</p>
    </div>
  </>)
}

export default ChatBot2
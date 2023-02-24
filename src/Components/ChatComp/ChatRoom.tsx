import React, { useEffect, useState } from "react";
import firebase from 'firebase/app';
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { DocumentData, getFirestore, orderBy, QueryDocumentSnapshot } from "firebase/firestore";
import { collection, addDoc, query, serverTimestamp, getDocs } from "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: "AIzaSyD_kKZyzzoXh6-ECAJ8q1pMwifupA84tRI",
	authDomain: "h4i-onboarding.firebaseapp.com",
	projectId: "h4i-onboarding",
	storageBucket: "h4i-onboarding.appspot.com",
	messagingSenderId: "876528942952",
	appId: "1:876528942952:web:328a3e2fd56a1a88ace0dd",
	measurementId: "G-0NV0555LD4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);


const ChatApp = () => {
	const [user, loading] = useAuthState(auth);
	// If not user, sign in, otherwise Chat Room	
	return (
		<section>
			<ChatRoom />
			{/* {user ? <ChatRoom /> : <SignIn />} */}
		</section>
	)
}

const SignIn = () => {
	async function signInWithGoogle() {
		const provider = new GoogleAuthProvider();
		signInWithPopup(auth, provider);

		const { user } = await signInWithPopup(auth, provider);
	}
	return (
		<>
			<button className="sign-in" onClick={signInWithGoogle}>Sign in with Google</button>
		</>
	)
}

const ChatRoom = () => {
	const messagesRef = collection(db, 'messages');
	const q = query(messagesRef, orderBy('createdAt'));

	const [messages, setMessages] = useState<DocumentData[]>([]);

	useEffect(() => {
		const getMessages = async () => {
			const querySnapshot = await getDocs(q);
			const messageData = querySnapshot.docs.map((doc) => doc.data());
			setMessages(messageData);
		};
		getMessages();
	});

	const [formValue, setFormValue] = useState('');

	const sendMessage = async (e: any) => {
		e.preventDefault();

		await addDoc(messagesRef, {
			text: formValue,
			createdAt: serverTimestamp(),
			// uid = user.uid,
			// photoURL
		})

		setFormValue('');
	}

	return (
		<div>
			<main>

				{messages && messages.map(msg => <ChatMessage key={msg.id} message={msg} />)}

			</main>
			<form onSubmit={sendMessage}>

				<input value={formValue} onChange={(e) => setFormValue(e.target.value)} placeholder="say something nice" />

				<button type="submit" disabled={!formValue}>Send</button>

			</form>
		</div>
	)
};

type MessageProps = {
	key: string,
	message: DocumentData
}

const ChatMessage = (props: MessageProps) => {
	const [user] = useAuthState(auth)
	const { text, uid, photoURL } = props.message;

	return (<>
		<div >
			<img src={photoURL || 'https://api.adorable.io/avatars/23/abott@adorable.png'} />
			<p>{text}</p>
		</div>
	</>
	)
};



export default ChatApp;

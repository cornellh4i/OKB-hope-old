// Import the functions you need from the SDKs you need
import { FirebaseApp, getApps, initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { addDoc, collection, getDocs, getFirestore, query, where } from "firebase/firestore";
import { FacebookAuthProvider, getAuth, GoogleAuthProvider, signInWithPopup, TwitterAuthProvider, signOut } from "firebase/auth";
import withFirebaseAuth from "react-with-firebase-auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAWCKEkLBpYgN_dIJl6ncEHPngL21j3kz4",
  authDomain: "okb-hope.firebaseapp.com",
  projectId: "okb-hope",
  storageBucket: "okb-hope.appspot.com",
  messagingSenderId: "321787147976",
  appId: "1:321787147976:web:190348bb9e96343a7b97fd",
  measurementId: "G-0EKC171E9X"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

// Initialize Cloud Firestore through Firebase
const db = getFirestore(app);

const providers = {
  googleProvider: new GoogleAuthProvider(),
  facebookProvider: new FacebookAuthProvider(),
  twitterProvider: new TwitterAuthProvider(),
};

const createComponentWithAuth = withFirebaseAuth({
  providers,
  firebaseAppAuth: auth,
})

export const signInWithGoogle = async () => {
  try {
    const res = await signInWithPopup(auth, providers.googleProvider);
    const user = res.user;
    const q = query(collection(db, "User + Admin + Volunteer"), where("user_id", "==", user.uid));
    const docs = await getDocs(q);

    if (docs.docs.length === 0) {
      await addDoc(collection(db, "User + Admin + Volunteer"), {
        user_id: user.uid,
        name: user.displayName,
        authProvider: "google",
        email: user.email,
      });
    }
  }
  catch(err) {
    console.error(err);
    if (err instanceof Error) {
      alert(err.message);
    }
  }
};

export const loggedIn = auth.currentUser;

export const logout = () => {
  signOut(auth);
}

export { auth, db, analytics, createComponentWithAuth };

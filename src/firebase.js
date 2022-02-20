import { initializeApp } from "firebase/app";
import {
  getFirestore,
  onSnapshot,
  collection,
  orderBy,
  addDoc,
  query,
  doc,
  updateDoc,
  arrayUnion,
} from "firebase/firestore";
import {
  getAuth,
  signInWithRedirect,
  signOut,
  GoogleAuthProvider,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
const db = getFirestore();
const auth = getAuth();
const provider = new GoogleAuthProvider();

export {
  app,
  db,
  auth,
  provider,
  signInWithRedirect,
  signOut,
  onSnapshot,
  collection,
  orderBy,
  addDoc,
  query,
  doc,
  updateDoc,
  arrayUnion,
};

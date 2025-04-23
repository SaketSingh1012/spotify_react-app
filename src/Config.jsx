// Config.jsx
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getStorage} from 'firebase/storage'

import {
  getFirestore,
  addDoc,
  collection,
  doc,
  getDoc,
} from "firebase/firestore"; // Import addDoc and collection

const firebaseConfig = {
  apiKey: "AIzaSyARz8T3vmIz1aTWsjDm4yE0499MHpTL4qo",
  authDomain: "spotifyapp-eb0e4.firebaseapp.com",
  projectId: "spotifyapp-eb0e4",
  storageBucket: "spotifyapp-eb0e4.firebasestorage.app",
  messagingSenderId: "715862899458",
  appId: "1:715862899458:web:77cb6584f2d8649ff4201b",
  measurementId: "G-MSDS3YRZ1T"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, provider, db, addDoc, collection, doc, getDoc, storage };

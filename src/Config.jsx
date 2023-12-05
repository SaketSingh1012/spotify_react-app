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
  apiKey: "AIzaSyABMnG38Z9q2jn91RYfVCaRzivTXCivnOA",
  authDomain: "spotify-bfd6c.firebaseapp.com",
  projectId: "spotify-bfd6c",
  storageBucket: "spotify-bfd6c.appspot.com",
  messagingSenderId: "518417454819",
  appId: "1:518417454819:web:a88629ae7b25fe320757d6",
  measurementId: "G-T5WNQCBXF0",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, provider, db, addDoc, collection, doc, getDoc, storage };

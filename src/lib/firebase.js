import { initializeApp, getApps, getApp } from 'firebase/app';
import { 
  getAuth, 
  GoogleAuthProvider, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signInWithPopup, 
  signOut as firebaseSignOut, 
  onAuthStateChanged,
  updateProfile as firebaseUpdateProfile
} from 'firebase/auth';
import { 
  getFirestore, 
  doc, 
  getDoc, 
  setDoc, 
  updateDoc, 
  collection, 
  addDoc, 
  query, 
  where, 
  getDocs,
  serverTimestamp 
} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || 'AIzaSyBUc-0tkczHVqRuGDdH-k1WWqw-145c0RE',
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || 'd-ensured-academy.firebaseapp.com',
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || 'd-ensured-academy',
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || 'd-ensured-academy.firebasestorage.app',
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || '597258349629',
  appId: import.meta.env.VITE_FIREBASE_APP_ID || '1:597258349629:web:d13d160f53c2343c74ce54',
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || 'G-VVRDH4DBM7'
};

// Initialize Firebase singleton
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();

export {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  firebaseSignOut,
  onAuthStateChanged,
  firebaseUpdateProfile,
  doc,
  getDoc,
  setDoc,
  updateDoc,
  collection,
  addDoc,
  query,
  where,
  getDocs,
  serverTimestamp
};

export default app;

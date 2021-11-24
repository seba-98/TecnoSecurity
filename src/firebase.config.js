// Import the functions you need from the SDKs you need

import firebase from "firebase/compat/app";
import {getFirestore} from 'firebase/firestore'
import "firebase/compat/storage"
import "firebase/compat/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
export const app= firebase.initializeApp({
  "apiKey": process.env.REACT_APP_FIREBASE_API_KEY,
  "authDomain": process.env.REACT_APP_FIREBASE_AUTO_DOMAIN,
  "projectId": process.env.REACT_APP_FIREBASE_PROYECT_ID,
  "storageBucket": process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  "messagingSenderId": process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  "appId": process.env.REACT_APP_FIREBASE_APP_ID,
  "locationId": "us-central",
});

// Initialize Firebase
export const db = getFirestore(app); 


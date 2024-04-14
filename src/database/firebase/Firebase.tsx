// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.FIRE_API_KEY,
  authDomain: "bloggers-6c722.firebaseapp.com",
  projectId: "bloggers-6c722",
  storageBucket: "bloggers-6c722.appspot.com",
  messagingSenderId: "54389557869",
  appId: "1:54389557869:web:86a4fdeccb570b9bdbcd64",
  measurementId: "G-Q9V6F6EMCL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const firestore = getFirestore(app);

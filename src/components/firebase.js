// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDGQMGjTqpSdDbmt25Cm6xHr8f0ZABLTOw",
  authDomain: "sigin8090.firebaseapp.com",
  databaseURL: "https://sigin8090-default-rtdb.firebaseio.com",
  projectId: "sigin8090",
  storageBucket: "sigin8090.appspot.com",
  messagingSenderId: "13751269514",
  appId: "1:13751269514:web:14793a7e529a78ae61d573"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

//--initialize Firebase store
export const db = getFirestore(app);

export default app;
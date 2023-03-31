// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB02LuX7z7tURbD9XPW8nQ2LcCeUHmZwTo",
  authDomain: "twitter-clone-2ac89.firebaseapp.com",
  projectId: "twitter-clone-2ac89",
  storageBucket: "twitter-clone-2ac89.appspot.com",
  messagingSenderId: "91333376422",
  appId: "1:91333376422:web:7f2898a96b55d784063767",
  measurementId: "G-8823D4328W"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();

export {app, auth};
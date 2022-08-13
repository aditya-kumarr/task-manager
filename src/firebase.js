// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDH4d_qvkqvKkEkUSfxNvharNXPWUvVQu8",
  authDomain: "task-manager-8f32d.firebaseapp.com",
  projectId: "task-manager-8f32d",
  storageBucket: "task-manager-8f32d.appspot.com",
  messagingSenderId: "313217767098",
  appId: "1:313217767098:web:3cf84a3fa7f00aa9de5483",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
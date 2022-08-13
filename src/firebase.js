// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA9_CqmujTBj-al-f4TtwnEOAlIgNhUMKw",

  authDomain: "task-x-prod.firebaseapp.com",

  projectId: "task-x-prod",

  storageBucket: "task-x-prod.appspot.com",

  messagingSenderId: "750890250328",

  appId: "1:750890250328:web:7d95e3e2afa669cf4f1a2d",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

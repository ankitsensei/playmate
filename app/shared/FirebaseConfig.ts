// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDz02aY-229xTTU5zXeJpTXAwM4bQVEIio",
  authDomain: "playmate-f23cf.firebaseapp.com",
  projectId: "playmate-f23cf",
  storageBucket: "playmate-f23cf.firebasestorage.app",
  messagingSenderId: "98489341365",
  appId: "1:98489341365:web:4c79f237a9ce4af03eb5fc",
  measurementId: "G-581WNFCN2E",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

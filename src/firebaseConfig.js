// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDHffHsYuB7ihVAIwvTeuDe5yR2YTdXGOw",
  authDomain: "todo-ecdf7.firebaseapp.com",
  databaseURL: "https://todo-ecdf7-default-rtdb.firebaseio.com",
  projectId: "todo-ecdf7",
  storageBucket: "todo-ecdf7.appspot.com",
  messagingSenderId: "778683825747",
  appId: "1:778683825747:web:8d802f58e857d78bca10a6",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default firebaseConfig;

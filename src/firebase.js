
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'
import {getStorage} from 'firebase/storage'
import {getFirestore} from 'firebase/firestore'



const firebaseConfig = {
  apiKey: "AIzaSyAVmeQVS1s4TVrORCHhCSS532_EdSV9SQ4",
  authDomain: "chat-4d6f7.firebaseapp.com",
  projectId: "chat-4d6f7",
  storageBucket: "chat-4d6f7.appspot.com",
  messagingSenderId: "68632597334",
  appId: "1:68632597334:web:548de2316d7120b9973cf7"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();     
export const storage = getStorage();   
export const db = getFirestore();  
    
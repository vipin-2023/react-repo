import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDaqp24suUyZ1RbNHzaKzvDZZyP7p1gLGI",
  authDomain: "chatsapp-ba625.firebaseapp.com",
  projectId: "chatsapp-ba625",
  storageBucket: "chatsapp-ba625.appspot.com",
  messagingSenderId: "808895156049",
  appId: "1:808895156049:web:948125a0a4ef78c6444d70",
};
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();

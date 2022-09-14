// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCTixdn1PkiSZB7F0I9oesl2mIV3fIjyo0",
  authDomain: "wired-office-362013.firebaseapp.com",
  projectId: "wired-office-362013",
  storageBucket: "wired-office-362013.appspot.com",
  messagingSenderId: "734897416517",
  appId: "1:734897416517:web:3cd023bf061c07c6f1362c"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const authentication = getAuth(app);
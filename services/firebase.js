// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import {getFirestore} from 'firebase/firestore';
import { firebaseAPIConfiq } from "./secret/firebaseapi.key";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = firebaseAPIConfiq;

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const authentication = getAuth(app);
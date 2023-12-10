// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyB5oVqICoJbGcUlRWixGzcEo9LgXz0FM0o",
    authDomain: "managementtopic-6e562.firebaseapp.com",
    databaseURL: "https://managementtopic-6e562-default-rtdb.firebaseio.com",
    projectId: "managementtopic-6e562",
    storageBucket: "managementtopic-6e562.appspot.com",
    messagingSenderId: "467169360449",
    appId: "1:467169360449:web:3973cd96a7ca0abd0564c0",
    measurementId: "G-0VNWEG1G0E"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)
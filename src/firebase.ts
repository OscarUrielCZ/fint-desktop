// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { getFirestore } from  "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: "AIzaSyDIc_FoUlv5na1ZaEU9l2-PtnP89W3c8g4",
	authDomain: "petcare-9d7bb.firebaseapp.com",
	projectId: "petcare-9d7bb",
	storageBucket: "petcare-9d7bb.appspot.com",
	messagingSenderId: "770884814109",
	appId: "1:770884814109:web:513031a767b870c92a0df4"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
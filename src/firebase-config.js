// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC_cu4DdYVVkol-3_mmZbkr_Dhab0e2h18",
  authDomain: "tourist-information-5c213.firebaseapp.com",
  projectId: "tourist-information-5c213",
  storageBucket: "tourist-information-5c213.appspot.com",
  messagingSenderId: "817988658644",
  appId: "1:817988658644:web:82dc0e8eccbe459eaf6241",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDU97GUv2aC-fOsY2fRJ6j2ti5e3fPCE1A",
  authDomain: "eldenele-1d091.firebaseapp.com",
  projectId: "eldenele-1d091",
  storageBucket: "eldenele-1d091.appspot.com",
  messagingSenderId: "191453197108",
  appId: "1:191453197108:web:896ce47204b4f9f678eb61",
  measurementId: "G-5FXHFGKGXJ"
};


const app = initializeApp(firebaseConfig);

export const firebaseAuth = getAuth(app)
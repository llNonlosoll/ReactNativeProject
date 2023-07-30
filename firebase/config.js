import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDcg2wwq94D4ghXx_7klZA-mf1da__G2Ms",
  authDomain: "myreactnativeproject-5b065.firebaseapp.com",
  databaseURL:
    "https://myreactnativeproject-5b065-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "myreactnativeproject-5b065",
  storageBucket: "myreactnativeproject-5b065.appspot.com",
  messagingSenderId: "308867495685",
  appId: "1:308867495685:web:0c7ee8f6c28f70ff62a96c",
  measurementId: "G-1W7XDPW2RC",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

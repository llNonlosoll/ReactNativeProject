// Для роботи із firebase обовʼязково треба ініціалізувати проект
import { initializeApp } from "firebase/app";
// Функція для підключення авторизації в проект
import { getAuth } from "firebase/auth";
// Функція для підключення бази даних у проект
import { getFirestore } from "firebase/firestore";
// Функція для підключення сховища файлів в проект
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCeBmpbnjl1peAooefpW_tuQWCI17aZXTA",
  authDomain: "myreactnativeproject-12e1f.firebaseapp.com",
  databaseURL:
    "https://myreactnativeproject-12e1f-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "myreactnativeproject-12e1f",
  storageBucket: "myreactnativeproject-12e1f.appspot.com",
  messagingSenderId: "693522733769",
  appId: "1:693522733769:web:45ab219921671dc01a4b18",
  measurementId: "G-M30BHQLM09",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

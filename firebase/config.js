// Для роботи із firebase обовʼязково треба ініціалізувати проект
import { initializeApp } from "firebase/app";
// Функція для підключення авторизації в проект
import { getAuth } from "firebase/auth";
// Функція для підключення бази даних у проект
import { getFirestore } from "firebase/firestore";
// Функція для підключення сховища файлів в проект
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCwHC-7imAcpGaCUMDbtt8UO0teUq9LnZc",
  authDomain: "myreactnativeproject-98571.firebaseapp.com",
  projectId: "myreactnativeproject-98571",
  storageBucket: "myreactnativeproject-98571.appspot.com",
  messagingSenderId: "353255747161",
  appId: "1:353255747161:web:04e739d93855c6320e8b48",
  measurementId: "G-DZ3CFKF5P2",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

/*________________________________________________________________________________*/

const firebaseConfig = {
  apiKey: "AIzaSyASrEj1gywuYsBXssgagUnBYpRXJngV-K8",
  authDomain: "linkedin-akasi.firebaseapp.com",
  projectId: "linkedin-akasi",
  storageBucket: "linkedin-akasi.appspot.com",
  messagingSenderId: "252342813480",
  appId: "1:252342813480:web:09922d1b57f602b886061d",
  measurementId: "G-JCRRRTFWSD",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const provider = new GoogleAuthProvider();

/*________________________________________________________________________________*/

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyADn5BiVUsiChcEvp2fi0BildorSD1KI-w",
    authDomain: "aquaguard-uom.firebaseapp.com",
    databaseURL:
        "https://aquaguard-uom-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "aquaguard-uom",
    storageBucket: "aquaguard-uom.appspot.com",
    messagingSenderId: "399157136294",
    appId: "1:399157136294:web:af6281238648be859d5d67",
};

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);

// export const auth = getAuth();
// export const db = getFirestore(app);

// export default app;

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth();
const db = getFirestore(app);

export { auth, db };
export default app;

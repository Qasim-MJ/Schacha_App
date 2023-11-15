// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDt2t53hym48OnSu850lZBS3uThK5zSkqk",
    authDomain: "schacha-afdf2.firebaseapp.com",
    projectId: "schacha-afdf2",
    storageBucket: "schacha-afdf2.appspot.com",
    messagingSenderId: "905102249685",
    appId: "1:905102249685:web:cac38651a0b2a243a89c5c"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const db = getFirestore(app)

export default db
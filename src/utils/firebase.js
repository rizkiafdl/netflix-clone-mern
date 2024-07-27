// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: import.meta.env.VITE_BASE__FIRE_apiKey,
    authDomain: import.meta.env.VITE_BASE__authDomain,
    projectId: import.meta.env.VITE_BASE__FIRE_projectId,
    storageBucket: import.meta.env.VITE_BASE__FIRE_storageBucket,
    messagingSenderId: import.meta.env.VITE_BASE__messagingSenderI,
    appId: import.meta.env.VITE_BASE__appId,
    measurementId: import.meta.env.VITE_BASE_FIRE_measurementId
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app)


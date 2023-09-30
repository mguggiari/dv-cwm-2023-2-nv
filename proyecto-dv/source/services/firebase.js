// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
import { getAuth } from "firebase/auth"

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAPaJFQwcemxwG-X-FAB7Vj5RDkrh9DR6Q",
    authDomain: "cwm-2023-2-noche-v-d977a.firebaseapp.com",
    projectId: "cwm-2023-2-noche-v-d977a",
    storageBucket: "cwm-2023-2-noche-v-d977a.appspot.com",
    messagingSenderId: "552476637088",
    appId: "1:552476637088:web:bedb4257e815abc7dd56c5"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

//obtener la instancia de firestore
export const db = getFirestore(app);

//obtenemos la instancia de autenciacion
export const auth = getAuth(app);
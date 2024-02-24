import { getApps, getApp, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyDR3cG6vKbsXT_TOQv5bR8XS9v45C6FDBc",
    authDomain: "runpen-ae71a.firebaseapp.com",
    projectId: "runpen-ae71a",
    storageBucket: "runpen-ae71a.appspot.com",
    messagingSenderId: "513526301306",
    appId: "1:513526301306:web:70ccec2f6297dcd805b1c3"
};

// Initialize Firebase
export const firebaseApp = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
export const auth = getAuth(firebaseApp);

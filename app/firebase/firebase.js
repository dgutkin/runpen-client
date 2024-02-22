import { initializeApp } from "firebase/app";
// import { getAuth } from "firebase/auth";

// TODO: Replace the following with your app's Firebase project configuration
// See: https://firebase.google.com/docs/web/learn-more#config-object
const firebaseConfig = {
    apiKey: "AIzaSyDR3cG6vKbsXT_TOQv5bR8XS9v45C6FDBc",
    authDomain: "runpen-ae71a.firebaseapp.com",
    projectId: "runpen-ae71a",
    storageBucket: "runpen-ae71a.appspot.com",
    messagingSenderId: "513526301306",
    appId: "1:513526301306:web:70ccec2f6297dcd805b1c3"
};

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);


// Initialize Firebase Authentication and get a reference to the service
//const auth = getAuth(app);




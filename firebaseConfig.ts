import { initializeApp, getApps, getApp } from 'firebase/app'
import { getAuth } from 'firebase/auth' // Correct way to import Firebase Auth in v9+

const firebaseConfig = {
    apiKey: "AIzaSyD4TKcv-yyibmukqrPqiC9VmqtdXK2G0KY",
    authDomain: "spoty-with-react.firebaseapp.com",
    projectId: "spoty-with-react",
    storageBucket: "spoty-with-react.firebasestorage.app",
    messagingSenderId: "560642385952",
    appId: "1:560642385952:web:90b5c2932be134c519b445",
    measurementId: "G-97FMPYXQ9G"
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

const auth = getAuth(app);

export { app, auth };

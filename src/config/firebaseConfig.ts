// Firebase App (the core Firebase SDK) is always required and
// must be listed before other Firebase SDKs
import firebase from "firebase/app";
import "@firebase/analytics";
import * as dotenv from 'dotenv';

dotenv.config();

// TODO: Replace the following with your app's Firebase project configuration
// For Firebase JavaScript SDK v7.20.0 and later, `measurementId` is an optional field
const firebaseConfig = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: "metrofare-9a40a.firebaseapp.com",
    projectId: "metrofare-9a40a",
    storageBucket: "metrofare-9a40a.appspot.com",
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_APP_ID,
    measurementId: process.env.REACT_APP_MEASUREMENT_ID
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebaseConfig;
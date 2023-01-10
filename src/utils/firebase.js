// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore/lite'
import { initializeAppCheck, ReCaptchaV3Provider } from 'firebase/app-check'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: "monopoly-money-60c8d.firebaseapp.com",
  projectId: "monopoly-money-60c8d",
  storageBucket: "monopoly-money-60c8d.appspot.com",
  messagingSenderId: "999837547420",
  appId: "1:999837547420:web:2755eb616b32daa60e6659",
  measurementId: "G-ZDB1NJ0GWX"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

// const appCheck = initializeAppCheck(app, {
//   provider: new ReCaptchaV3Provider(`${process.env.REACT_APP_FIREBASE_APP_CHECK_KEY}`),
//   isTokenAutoRefreshEnabled: true
// })

export const db = getFirestore(app)
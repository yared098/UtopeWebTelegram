// Import the functions you need from the SDKs you need
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyD0o01WL0QEG3C9XAFkwGnGwUXJLVHhbA8",
  authDomain: "yene-cafe-7a271.firebaseapp.com",
  databaseURL: "https://yene-cafe-7a271-default-rtdb.firebaseio.com",
  projectId: "yene-cafe-7a271",
  storageBucket: "yene-cafe-7a271.appspot.com",
  messagingSenderId: "9638731029",
  appId: "1:9638731029:web:c9aa8825a23fbe2542dd1c",
  measurementId: "G-MW11Y6MQZ6"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const db = firebase.firestore();
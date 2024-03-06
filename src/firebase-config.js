// Import the functions you need from the SDKs you need
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

// const firebaseConfig = {
//   apiKey: "AIzaSyD0o01WL0QEG3C9XAFkwGnGwUXJLVHhbA8",
//   authDomain: "yene-cafe-7a271.firebaseapp.com",
//   databaseURL: "https://yene-cafe-7a271-default-rtdb.firebaseio.com",
//   projectId: "yene-cafe-7a271",
//   storageBucket: "yene-cafe-7a271.appspot.com",
//   messagingSenderId: "9638731029",
//   appId: "1:9638731029:web:c9aa8825a23fbe2542dd1c",
//   measurementId: "G-MW11Y6MQZ6"
// };
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDnnNDYu8HMS2sUMqBwv4G78Y3x0lKIiiU",
    authDomain: "messanger-delivery.firebaseapp.com",
    projectId: "messanger-delivery",
    storageBucket: "messanger-delivery.appspot.com",
    messagingSenderId: "781724113480",
    appId: "1:781724113480:web:6c16487dbd6e7de7e2d67d",
    measurementId: "G-F60L3FGYB0"
  };

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const db = firebase.firestore();
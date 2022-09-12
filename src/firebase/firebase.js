import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/analytics';

firebase.initializeApp({
    apiKey: "AIzaSyDmeSkx18XppldBSgxUp3MKNfWjsg8uQ0E",
    authDomain: "super-chat-68020.firebaseapp.com",
    projectId: "super-chat-68020",
    storageBucket: "super-chat-68020.appspot.com",
    messagingSenderId: "584067299747",
    appId: "1:584067299747:web:7b45e85a7f338890a94216",
    measurementId: "G-1JJTKY4JS3"
  })

export const auth = firebase.auth();
export const firestore = firebase.firestore();
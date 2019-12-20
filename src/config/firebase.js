import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyAO8RnmZWiWL-ZNawzZRaQltsh8rnvXFMc",
    authDomain: "neocah-41045.firebaseapp.com",
    databaseURL: "https://neocah-41045.firebaseio.com",
    projectId: "neocah-41045",
    storageBucket: "neocah-41045.appspot.com",
    messagingSenderId: "979195544805",
    appId: "1:979195544805:web:0874026efaaf85cda6000c",
    measurementId: "G-NR8QM8VM22"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.firestore();
//firebase.analytics();

export default firebase;

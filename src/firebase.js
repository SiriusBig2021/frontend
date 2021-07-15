import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyAqbsLofyxNoIesQ1C66D9LH9LXO5MdlhU",
    authDomain: "phosagro-db-a2e45.firebaseapp.com",
    projectId: "phosagro-db-a2e45",
    storageBucket: "phosagro-db-a2e45.appspot.com",
    messagingSenderId: "64645880100",
    appId: "1:64645880100:web:09918e16405e15567bbbb1",
    measurementId: "G-QDG81H763E"
  };

  firebase.initializeApp(firebaseConfig);

  export const auth = firebase.auth();
  export const db = firebase.firestore();

  export default firebase;
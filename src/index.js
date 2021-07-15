import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';


/*import firebase from "firebase";
import database from "firebase/database";

var firebaseConfig = {
  apiKey: "AIzaSyAqbsLofyxNoIesQ1C66D9LH9LXO5MdlhU",
  authDomain: "phosagro-db-a2e45.firebaseapp.com",
  projectId: "phosagro-db-a2e45",
  storageBucket: "phosagro-db-a2e45.appspot.com",
  messagingSenderId: "64645880100",
  appId: "1:64645880100:web:09918e16405e15567bbbb1",
  measurementId: "G-QDG81H763E"
};

firebase.initializeApp(firebaseConfig);*/

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);



// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

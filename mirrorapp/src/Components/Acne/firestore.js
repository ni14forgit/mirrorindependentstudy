// Your web app's Firebase configuration
import firebase from "firebase";

var firebaseConfig = {
  apiKey: "AIzaSyDBsn3LZ85n-vVFhchUw5Mb8yPrekUWZQk",
  authDomain: "magicmirror-fe6f8.firebaseapp.com",
  databaseURL: "https://magicmirror-fe6f8.firebaseio.com",
  projectId: "magicmirror-fe6f8",
  storageBucket: "magicmirror-fe6f8.appspot.com",
  messagingSenderId: "889043710037",
  appId: "1:889043710037:web:7bf40626a6ce0d3418a4dc",
  measurementId: "G-DBSYKGXX3F"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

export default firebase;

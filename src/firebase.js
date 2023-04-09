import firebase from "firebase/compat/app";
import "firebase/compat/database";

const firebaseConfig = {
  apiKey: "AIzaSyB-CBzm7gQR5P5dNgwhbHfHE6XEDnAmXmc",
  authDomain: "going-dutch-8b564.firebaseapp.com",
  databaseURL: "https://going-dutch-8b564.firebaseio.com",
  projectId: "going-dutch-8b564",
  storageBucket: "going-dutch-8b564.appspot.com",
  messagingSenderId: "624044948314",
  appId: "1:624044948314:web:5ea232278416bb3d975163"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;

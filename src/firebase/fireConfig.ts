import firebase from "firebase";

var firebaseConfig = {
    apiKey: "AIzaSyAcn0aMDGrgWyAHg7cGmdVCAQ-ZVAzuWkU",
    authDomain: "react-native-todo-2ff6d.firebaseapp.com",
    databaseURL: "https://react-native-todo-2ff6d-default-rtdb.firebaseio.com",
    projectId: "react-native-todo-2ff6d",
    storageBucket: "react-native-todo-2ff6d.appspot.com",
    messagingSenderId: "668861613175",
    appId: "1:668861613175:web:7cd2ce9710dd0faf0e3272",
    measurementId: "G-SFHCGZ9HMH"
};
// Initialize Firebase
export const fire = firebase.initializeApp(firebaseConfig);

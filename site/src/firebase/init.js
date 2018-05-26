import firebase from "firebase"
import firestore from "firebase/firestore"


  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyD_5XKh54XhCB0AM85ZIVgWgZTgOLnWzr4",
    authDomain: "alexa-food.firebaseapp.com",
    databaseURL: "https://alexa-food.firebaseio.com",
    projectId: "alexa-food",
    storageBucket: "",
    messagingSenderId: "767212273770"
  };

  const fapp = firebase.initializeApp(config);
  fapp.firestore().settings({timestampsInSnapshots:true})
  export default fapp.firestore();
  
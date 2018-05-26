var firebase = require('firebase')
var firestore = require('firebase/firestore')

// Initialize Firebase
  var config = {
    apiKey: "AIzaSyAKQsEOLPriuukaC-IjPiugqYegP1eIQeY",
    authDomain: "mydeltahacks.firebaseapp.com",
    databaseURL: "https://mydeltahacks.firebaseio.com",
    projectId: "mydeltahacks",
    storageBucket: "mydeltahacks.appspot.com",
    messagingSenderId: "1070948588779"
  };


  const firebaseApp = firebase.initializeApp(config);
  firebaseApp.firestore().settings({timestampsInSnapshots: true});
  module.exports = function(callback){
      return firebaseApp.firestore()
  }
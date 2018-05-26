const lib = require('lib');
const firebase = require('firebase');
var config = {
    apiKey: "AIzaSyD_5XKh54XhCB0AM85ZIVgWgZTgOLnWzr4",
    authDomain: "alexa-food.firebaseapp.com",
    databaseURL: "https://alexa-food.firebaseio.com",
    projectId: "alexa-food", 
    storageBucket: "alexa-food.appspot.com",
    messagingSenderId: "767212273770"
  };

const firebaseApp = firebase.initializeApp(config);
firebaseApp.firestore().settings({timestampsInSnapshots: true});
var db = firebaseApp.firestore()
/**
* Basic "Hello World" intent, can receive a `name` parameter
* @param {string} name Your name
* @returns {string}
*/
module.exports = (name = 'World', callback) => {

    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1; //January is 0!
    var yyyy = today.getFullYear();

    if(dd<10) {
        dd = '0'+dd
    } 

    if(mm<10) {
        mm = '0'+mm
    } 
    today = dd + '-' + mm + '-' + yyyy;

    db.collection("food").doc(today).get().then(function(doc) {
        if (doc.exists) {
            console.log("Document data:", doc.data().Meals);
            var total = 0;
            for(let foodItem of doc.data().Meals){
                total += parseInt(foodItem.calories)
            }
            return callback(null, `You've ate ${total} calories so far today!`);

        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
            return callback(null, `Buttercup is having some trouble`);
        }
    }).catch(function(error) {
        console.log("Error getting document:", error);
        return callback(null, `Buttercup is having a lot of trouble at the moment`);
    });
    


};

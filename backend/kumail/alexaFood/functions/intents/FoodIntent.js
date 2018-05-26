const lib = require('lib');
// var db = require('./initfb');
var firebase = require('firebase')
var firestore = require('firebase/firestore')
const WolframAlphaAPI = require('wolfram-alpha-api');
const waApi = WolframAlphaAPI('G32RJ2-ULRH3QT7XW');
// Initialize Firebase
/* var config = {
    apiKey: "AIzaSyD1m0nyn07K5Nx0uwinftKym1V0_9jMzoA",
    authDomain: "permanentstorageexample.firebaseapp.com",
    databaseURL: "https://permanentstorageexample.firebaseio.com",
    projectId: "permanentstorageexample",
    storageBucket: "permanentstorageexample.appspot.com",
    messagingSenderId: "254244364234"
  };
 */

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
* Basic "Hello World" intent, can receive a `food` parameter
* @param {string} number Your food
* @param {string} food Your food
* @param {string} day Your food
* @returns {string}
*/

var cal = '0';
module.exports = ( number = '3', food = 'apple', day = null,  callback) => {
    console.log("QQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQ")

    console.log(db)
    var output = ''

    if(['a', 'e', 'i', 'o', 'u'].includes(food.charAt(0).toLowerCase())){
        output = `Okay, I've recorded you ate an ${food}`
    }
    else{
        output = `Okay, I've recorded you ate a ${food}`
    }

    if(day){
        output += ` on ${day}`
    }

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

    db.collection("food").doc(today).set({ Breakfast : [
        {
            day: day,
            name: food,
            date : today,
            calories: cal
        }
    ]
    })
    .then(function(docRef) {
        console.log("Document written with ID: ", docRef.id);
        return callback(null, output);
    })
    .catch(function(error) {
        console.error("Error adding document: ", error);
        return callback(null, output);
    });
    
    waApi.getFull(`calories in a ${food}`).then(msg => {
        var cal = msg.pods[1].subpods[0].plaintext;
        console.log("CAAAAAAAAAAAAAAAAAAAAAAAL!!!!!!!!!!!!!!!!!!!!", msg.pods[1].subpods[0].plaintext);
        db.collection("food").doc(today).set({ Breakfast : [
            {
                day: day,
                name: food,
                date : today,
                calories: cal
            }
        ]
        })
        .then(function(docRef) {
            console.log("Document written with ID: ", docRef.id);
            return callback(null, output);
        })
        .catch(function(error) {
            console.error("Error adding document: ", error);
            return callback(null, output);
        });
    }).catch(err => {
        return callback(null, output + err);
    });


    
    


};

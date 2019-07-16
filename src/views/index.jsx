const React = require('react');
const firebase = require('firebase');
// Required for side-effects
require("firebase/firestore");

const DefaultLayout = require('./layouts/default');


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC6HvMKHLFxeo5j6nJ4N3U-6pQqTGR7pl8",
  authDomain: "nodejswithreactjs.firebaseapp.com",
  databaseURL: "https://nodejswithreactjs.firebaseio.com",
  projectId: "nodejswithreactjs",
  storageBucket: "",
  messagingSenderId: "937810269817",
  appId: "1:937810269817:web:baa08fa16c4a2e77"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
var db = firebase.firestore();

class HelloMessage extends React.Component {
  render() {
    return (
      <DefaultLayout title={this.props.title}>
        <div>Hello {this.props.name}</div>
        <button onClick={this.saveDataToFirebase}>Firebase</button>
      </DefaultLayout>
    );
  }
  saveDataToFirebase() {
    console.log('saveDataToFirebase function works!!!!!');
    
    db.collection("users").add({
      first: "Ada",
      last: "Lovelace",
      born: 1815
    })
      .then(function (docRef) {
        console.log("Document written with ID: ", docRef.id);
      })
      .catch(function (error) {
        console.error("Error adding document: ", error);
      }); test.firestore.js
  }
}
module.exports = HelloMessage;
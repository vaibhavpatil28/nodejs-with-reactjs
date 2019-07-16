
const admin = require("firebase-admin");

const serviceAccount = require("./nodejs-with-reactjs-firebase-adminsdk.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://nodejs-with-reactjs.firebaseio.com"
});

// Get a database reference to our blog
const db = admin.database();

const firestore = admin.firestore();
module.exports = {db, firestore};
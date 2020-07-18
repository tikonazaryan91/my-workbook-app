import * as firebase from "firebase";

firebase.initializeApp({
  apiKey: "AIzaSyCT289BNLS4ShWTye-Kn4GnMmrp2UtcXrY",
  authDomain: "react-workbook-app.firebaseapp.com",
  databaseURL: "https://react-workbook-app.firebaseio.com",
  projectId: "react-workbook-app",
  storageBucket: "react-workbook-app.appspot.com",
  messagingSenderId: "765954381734",
  appId: "1:765954381734:web:094efd733814130751e167",
});

// Get a reference to the database service
const database = firebase.database();

export default database;

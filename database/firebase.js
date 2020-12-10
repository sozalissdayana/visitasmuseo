import firebase from 'firebase'

import 'firebase/firestore'


var firebaseConfig = {
    apiKey: "AIzaSyCdulHEEno8Qg_LdRC55RlmQBPFoHAs_ow",
    authDomain: "visitas-museo-firebase.firebaseapp.com",
    databaseURL: "https://visitas-museo-firebase.firebaseio.com",
    projectId: "visitas-museo-firebase",
    storageBucket: "visitas-museo-firebase.appspot.com",
    messagingSenderId: "668679309366",
    appId: "1:668679309366:web:fefc2c9580025a2880f097"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  const db = firebase.firestore();

  export default{
      firebase,
      db,
  }
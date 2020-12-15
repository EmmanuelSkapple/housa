import firebase from 'firebase'
export var config = {
    apiKey: "AIzaSyDuMzOfE9As6a7PhgLMBlQjzXdmqzUilLM",
    authDomain: "housa-kodika.firebaseapp.com",
    databaseURL: "https://housa-kodika.firebaseio.com/",
    projectId: "housa-kodika",
    storageBucket: "housa-kodika.appspot.com",
  };

  firebase.initializeApp(config);

  export const ref = firebase.database().ref();
  export const firebaseAuth = firebase.auth();

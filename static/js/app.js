// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyAkg-D-sylglTvFsOrAhq7lZIHsnafOQRU",
  authDomain: "jays-arcade-2eec1.firebaseapp.com",
  databaseURL: "https://jays-arcade-2eec1.firebaseio.com",
  projectId: "jays-arcade-2eec1",
  storageBucket: "jays-arcade-2eec1.appspot.com",
  messagingSenderId: "907753522026",
  appId: "1:907753522026:web:39aea5dd543e1404445b13",
  measurementId: "G-39JQMGHY5Z",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

const db = firebase.firestore();
const auth = firebase.auth();

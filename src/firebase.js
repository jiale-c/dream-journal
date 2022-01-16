// import firebase from "firebase/app";
// import "firebase/auth";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";
import "firebase/compat/database";

const app = firebase.initializeApp({
  //   apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  //   authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  //   projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  //   storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  //   messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  //   appId: process.env.REACT_APP_FIREBASE_APP_ID,
  //   measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
  apiKey: "AIzaSyCjoWUZ8LRzDR_YpaqUPPAh2M1tpVxIO3U",
  authDomain: "dream-journal-bc782.firebaseapp.com",
  projectId: "dream-journal-bc782",
  storageBucket: "dream-journal-bc782.appspot.com",
  messagingSenderId: "223222196063",
  appId: "1:223222196063:web:3782d0a2196ca0675d38ea",
  measurementId: "G-2PQ1ZYHHE9",
});

const projectStorage = firebase.storage();
const projectFirestore = firebase.firestore();
const databaseRef = firebase.database().ref();

export const auth = app.auth();
export { projectStorage, projectFirestore };
export const notesRef = databaseRef.child("notes");
export default app;

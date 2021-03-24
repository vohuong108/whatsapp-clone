import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyBzCRNjAovMnW2QK1lStIT2GSYkvDRLycU",
    authDomain: "whatsapp-fc6b2.firebaseapp.com",
    databaseURL: "whatsapp-fc6b2-default-rtdb",
    projectId: "whatsapp-fc6b2",
    storageBucket: "whatsapp-fc6b2.appspot.com",
    messagingSenderId: "176104568742",
    appId: "1:176104568742:web:b68f77cca561cf6b674167"
  };

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };
export default db;
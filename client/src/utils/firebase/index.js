import firebase from "firebase/app"
import "firebase/storage"

const firebaseConfig = {
  apiKey: "AIzaSyDb-pOe_W9kWct9zt9W1dSRSPj7io0wr1s",
  authDomain: "art-only-react-upload.firebaseapp.com",
  projectId: "art-only-react-upload",
  storageBucket: "art-only-react-upload.appspot.com",
  messagingSenderId: "775097847807",
  appId: "1:775097847807:web:f166abdb09704524dfe1ca",
  measurementId: "G-2G1B1SP1NT"
}

firebase.initializeApp(firebaseConfig)

const storage = firebase.storage()

export { storage, firebase as default }
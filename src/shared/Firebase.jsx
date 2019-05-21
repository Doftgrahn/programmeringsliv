import firebase from "firebase";

import firebaseConfig from "./firebaseConfig";

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth;
export const database = firebase.database().ref();
export const provider = new firebase.auth.FacebookAuthProvider();

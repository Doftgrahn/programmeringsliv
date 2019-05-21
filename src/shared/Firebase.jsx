import * as firebase from "firebase/app";

import "firebase/auth";
import "firebase/firestore";

import firebaseConfig from "./firebaseConfig";

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth;
export const database = firebase.firestore();
export const provider = new firebase.auth.FacebookAuthProvider();

//import * as firebase from "firebase/app";
import app from "firebase/app";

import "firebase/auth";
import "firebase/firestore";

import firebaseConfig from "./firebaseConfig";

app.initializeApp(firebaseConfig);

export const auth = app.auth();
export const database = app.firestore();
export const provider = new app.auth.FacebookAuthProvider();

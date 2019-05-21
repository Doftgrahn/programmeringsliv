//import * as firebase from "firebase/app";
import app from "firebase/app";

import "firebase/auth";
import "firebase/database";

import firebaseConfig from "./firebaseConfig";

app.initializeApp(firebaseConfig);

export const auth = app.auth;
export const database = app.database();
export const provider = new app.auth.FacebookAuthProvider();

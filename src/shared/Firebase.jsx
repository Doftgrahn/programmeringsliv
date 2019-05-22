//import * as firebase from "firebase/app";
import app from "firebase/app";
import firebaseConfig from "./firebaseConfig";

import "firebase/auth";
import "firebase/firestore";

app.initializeApp(firebaseConfig);

export const auth = app.auth();
export const database = app.firestore();

export const FacebookProvider = new app.auth.FacebookAuthProvider();
export const GithubProvider = new app.auth.GithubAuthProvider();

export const GoogleProvider = new app.auth.GoogleAuthProvider();

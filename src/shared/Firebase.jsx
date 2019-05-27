//import * as firebase from "firebase/app";
import app from "firebase/app";
//import firebase from "firebase";
import firebaseConfig from "./firebaseConfig";

import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

app.initializeApp(firebaseConfig);

export const auth = app.auth();
export const database = app.firestore();
export const storage = app.storage();

export const providers = {
    FacebookProvider: new app.auth.FacebookAuthProvider(),
    GithubProvider: new app.auth.GithubAuthProvider(),
    GoogleProvider: new app.auth.GoogleAuthProvider()
};

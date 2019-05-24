//import * as firebase from "firebase/app";
import app from "firebase/app";
import firebaseConfig from "./firebaseConfig";

import "firebase/auth";
import "firebase/firestore";

app.initializeApp(firebaseConfig);

export const auth = app.auth(); 
export const database = app.firestore();

/*
export const providers = {
    FacebookProvider: new app.auth.FacebookAuthProvider(),
    GithubProvider: new app.auth.GithubAuthProvider(),
    GoogleProvider: new app.auth.GoogleAuthProvider()
};
*/
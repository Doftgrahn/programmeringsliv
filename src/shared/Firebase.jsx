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
<<<<<<< HEAD
=======
export const GoogleProvider = new app.auth.GoogleAuthProvider();
>>>>>>> 4daeb3e434bbbd0dbef25f52166bd96404eba008

import app from "firebase/app";
import 'firebase/auth';
import 'firebase/firestore';

import firebaseConfig from "./firebaseConfig";

app.initializeApp(firebaseConfig);

export const auth = app.auth();
export const database = app.firestore();
export const FacebookProvider = new app.auth.FacebookAuthProvider();
export const GithubProvider = new app.auth.GithubAuthProvider();
export const GoogleProvider = new app.auth.GoogleAuthProvider();
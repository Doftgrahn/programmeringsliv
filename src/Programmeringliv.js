import React, {Component} from "react";
import "./styles/main.scss";

import {BrowserRouter as Router} from "react-router-dom";

import Header from "./components/main/header/Header";
import Footer from "./components/main/footer/Footer";
import ContentRouting from "./shared/routing";

import withFirebaseAuth from "react-with-firebase-auth";
import * as firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from "./shared/firebaseConfig";

const firebaseApp = firebase.initializeApp(firebaseConfig);

class Programmerlingsliv extends Component {
    render() {
        const {user, signOut, signInWithGoogle} = this.props;

        return (
            <Router>
                <Header />
                <main>
                    <ContentRouting />
                </main>
                <Footer />
                <div>
                    {user ? (
                        <p>Hello, {user.displayName}</p>
                    ) : (
                        <p>Please sign in.</p>
                    )}
                    {user ? (
                        <button onClick={signOut}>Sign out</button>
                    ) : (
                        <button onClick={signInWithGoogle}>
                            Sign in with Google
                        </button>
                    )}
                </div>
            </Router>
        );
    }
}

const firebaseAppAuth = firebaseApp.auth();
const providers = {
    googleProvider: new firebase.auth.GoogleAuthProvider()
};

export default withFirebaseAuth({
    providers,
    firebaseAppAuth
})(Programmerlingsliv);

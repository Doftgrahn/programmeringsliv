import React, {Component} from "react";
import "./styles/main.scss";

import firebase from "firebase";

import {provider, auth, database} from "./shared/Firebase";

import {BrowserRouter as Router} from "react-router-dom";

import Header from "./components/main/header/Header";
import Footer from "./components/main/footer/Footer";
import ContentRouting from "./shared/routing";

class Programmerlingsliv extends Component {
    state = {
        user: null
    };

    logIn = () => {
        auth()
            .signInWithPopup(provider)
            .then(({user}) => {
                this.setState({user: user});
            });
    };

    logOut = () => {
        auth()
            .signOut()
            .then(() => {
                this.setState({user: null});
            });
    };

    render() {
        const {user} = this.state;
        return (
            <Router>
                <Header />
                <div>
                    <p>hej</p>
                    <p>{user ? `Hi, ${user.displayName}!`: 'hi!'}</p>
                    <button onClick={this.logIn}>Log in with facebook</button>
                    <button onClick={this.logOut}>Log out</button>
                </div>
                <main>
                    <ContentRouting />
                </main>
                <Footer />
            </Router>
        );
    }
}

export default Programmerlingsliv;

import React, {Component} from "react";
import "./styles/main.scss";

import firebase from "firebase";

import {provider, auth, database} from "./shared/Firebase";

import {BrowserRouter as Router} from "react-router-dom";
import Header from "./components/main/header/Header";
import Footer from "./components/main/footer/Footer";
import ContentRouting from "./shared/routing";

<<<<<<< HEAD


class Programmerlingsliv extends Component {
    render() {
=======
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
>>>>>>> 57714a24c08b5f4c30cfe453c17f55fbc1bfce71

    render() {
        const {user} = this.state;
        return (
            <Router>
                <Header user={user} logIn={this.logIn} logOut={this.logOut} />
                <main>
                    <ContentRouting />
                </main>
                <Footer />
            </Router>
        );
    }
}

<<<<<<< HEAD

=======
>>>>>>> 57714a24c08b5f4c30cfe453c17f55fbc1bfce71
export default Programmerlingsliv;

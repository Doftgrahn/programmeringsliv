import React, {Component} from "react";
import "./styles/main.scss";
import {FacebookProvider, GithubProvider, auth, database} from "./shared/Firebase";
import {BrowserRouter as Router} from "react-router-dom";

import Header from "./components/main/header/Header";
import Footer from "./components/main/footer/Footer";
import ContentRouting from "./shared/routing";

class Programmerlingsliv extends Component {
    state = {
        userName: null,
        userEmail: null,
        userPhotoURL: null,
        id: null
    };
    logIn = () => {
        auth
            .signInWithPopup(GithubProvider)
            .then(({user}) => {
                let objUser = {
                    userName: user.displayName,
                    userEmail: user.email,
                    userPhotoURL: user.photoURL,
                    id: user.uid
                }
                const userCollection = database.collection('Users');
                userCollection.doc(objUser.id).set(objUser).then( docRef => {
                    this.setState({
                        userName: objUser.displayName,
                        userEmail: objUser.email,
                        userPhotoURL: objUser.photoURL,
                        id: objUser.id
                    });
                });
               
            });
    };

    logOut = () => {
        auth
            .signOut()
            .then(() => {
                this.setState({userName: null});
            });
    };

    render() {
        const {userName} = this.state;
        return (
            <Router>
                <Header user={userName} logIn={this.logIn} logOut={this.logOut} />
                <main>
                    <ContentRouting />
                </main>
                <Footer />
            </Router>
        );
    }
}

export default Programmerlingsliv;

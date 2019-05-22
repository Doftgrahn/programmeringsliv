import React, {Component} from "react";
import "./styles/main.scss";

import {providers, auth, database} from "./shared/Firebase";
import collection from "./shared/dbCollection";
import {BrowserRouter as Router} from "react-router-dom";

import Header from "./components/main/header/Header";
import Footer from "./components/main/footer/Footer";
import ContentRouting from "./shared/routing";

class Programmerlingsliv extends Component {
    state = {
        user: {
            userName: null,
            userEmail: null,
            userPhotoURL: null,
            id: null
        }
    };

    logIn = () => {

        auth.signInWithPopup(providers.FacebookProvider).then(({user}) => {

            let objUser = {
                userName: user.displayName,
                userEmail: user.email,
                userPhotoURL: user.photoURL,
                id: user.uid
            };
            const userCollection = database.collection(collection.user);
            userCollection
                .doc(objUser.id)
                .set(objUser)
                .then(() => {
                    this.setState({
                        user: {
                            userName: objUser.userName,
                            userEmail: objUser.userEmail,
                            userPhotoURL: objUser.userPhotoURL,
                            id: objUser.id
                        }
                    });
                });
        });
    };

    logOut = () => {
        auth.signOut().then(() => {
            this.setState({
                user: {
                    userName: null,
                    userEmail: null,
                    userPhotoURL: null,
                    id: null
                }
            });
        });
    };

    render() {
        const {user} = this.state;
        return (
            <Router>
                <Header user={user} logIn={this.logIn} logOut={this.logOut} />
                <main>
                    <ContentRouting user={user} />
                </main>
                <Footer />
            </Router>
        );
    }
}

export default Programmerlingsliv;

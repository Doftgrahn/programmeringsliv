import React, {Component} from "react";
import "./styles/main.scss";

//import {providers, auth, database} from "./shared/Firebase";
import "./shared/FirebaseMessaging";
//import collection from "./shared/dbCollection";
import {BrowserRouter as Router} from "react-router-dom";

import Header from "./components/main/header/Header";
import Footer from "./components/main/footer/Footer";
import ContentRouting from "./shared/routing";

import firebase from 'firebase/app';
import { FirebaseAuth } from 'react-firebaseui';
import Dialog from './components/landingPage/Dialog';
import {database} from './shared/Firebase';
import collection from './shared/dbCollection';


class Programmerlingsliv extends Component {
    state = {
        signedIn: false,
        user: null || JSON.parse(localStorage.getItem("user")),
        userName: null,
        userEmail: null,
        userPhotoURL: null,
        id: null,
        isOpen: false,
        unreadMessages: false,
        lastReadMessages: null || localStorage.getItem('lastReadMessages')
    };


    uiConfig = {
        signInFlow: "popup",


        signInOptions: [
            firebase.auth.GoogleAuthProvider.PROVIDER_ID,
            firebase.auth.FacebookAuthProvider.PROVIDER_ID,
            firebase.auth.GithubAuthProvider.PROVIDER_ID
        ],

        callbacks: {
            signInSuccessWithAuthResult: (user, redirectUrl) => {
                this.setState({
                    signedIn: true,
                    user: user,
                    userName: user.displayName,
                    userEmail: user.email,
                    userPhotoURL: user.photoURL,
                    id: user.uid,
                    karma: 0
                });
                return false;
            },
            signInFailure: error => {
                console.log(error);
            }
        }
    };

  componentDidMount = () => {
      this.authListener();
      this.checkForNewMessages();
  };


    authListener = () => {
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                this.setState({user});
                localStorage.setItem("user", JSON.stringify(user));
            } else {
                this.setState({user: null});
                localStorage.removeItem("user");
            }
        });
    };

    logout = e => {
        firebase
            .auth()
            .signOut()
            .then(() => {
                console.log("Signed Out");
                this.setState({signedIn: false, isOpen: false});
            })
            .catch(error => {
                console.log("Sign Out Error", error);
            });
    };

  logIn = (e) => {
      this.setState({isOpen: true})
  }
  checkForNewMessages() {
    if(this.state.user){
      let isSubscribed = true;
      const userCollection = database.collection(collection.messages).where('ids', 'array-contains', this.state.user.uid);
      let currentMessages = 0;
      userCollection.onSnapshot(snapshot => { 
          if (isSubscribed) {
              snapshot.forEach(doc => {
                let docData = doc.data();
                currentMessages += docData.messages.length;
              })
              return this.areThereNewMessages(currentMessages)
            }  
        });
        return () => (isSubscribed = false)
      }
    };

    areThereNewMessages(currentMessages){
      let last = this.state.lastReadMessages;
      let current = currentMessages;
      if (current > last) {
        this.setState({
          unreadMessages: true
          })
      } else {
        this.setState({
          unreadMessages: false
          })
      }
    }

    switchNewMessage = (e) => {
        this.setState({
          unreadMessages: false
        })
    }

    render() {
        const {user} = this.state;
        const {unreadMessages} = this.state;
        return (<Router>
            <Header user={user} logIn={this.logIn} logOut={this.logout} unreadMessages={unreadMessages} switchNewMessage={this.switchNewMessage}/>
            <main> 
                <Dialog isOpen={this.state.isOpen && !this.state.user} 
                        onClose={e => this.setState({isOpen: false})} >
                        <FirebaseAuth uiConfig={this.uiConfig} 
                                    firebaseAuth={firebase.auth()} />
                </Dialog>
                <ContentRouting user={user} logIn={this.logIn} switchNewMessageState={this.switchNewMessageState}/> 
            </main>
            <Footer/>
        </Router>);

    }
}

export default Programmerlingsliv;

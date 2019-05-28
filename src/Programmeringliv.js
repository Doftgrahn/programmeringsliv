import React, {Component} from "react";
import "./styles/main.scss";

//import {providers, auth, database} from "./shared/Firebase";
//import collection from "./shared/dbCollection";
import {BrowserRouter as Router} from "react-router-dom";

import Header from "./components/main/header/Header";
import Footer from "./components/main/footer/Footer";
import ContentRouting from "./shared/routing";


import firebase from 'firebase/app';
import { FirebaseAuth } from 'react-firebaseui';
import LoginPage from './components/landingPage/LoginPage';

class Programmerlingsliv extends Component {

 /*   state = {
        user: null || JSON.parse(localStorage.getItem('user'))
*/
 /*   logIn = () => {
        auth.signInWithPopup(providers.FacebookProvider).then(({user}) => {
            const objUser = {
                userName: user.displayName,
                userEmail: user.email,
                userPhotoURL: user.photoURL,
                id: user.uid,
                karma: 0
            };
            if (!this.state.user) {
                this.setState({user: user});
            }
            const userCollection = database.collection(collection.user);
            userCollection
                .doc(objUser.id)
                .set(objUser)
                .then(() => console.log("works"));
        });
    };

    logOut = () => {
        auth.signOut().then(() => {
            this.setState({user: null});
        });
    };

    componentDidMount() {
        auth.onAuthStateChanged(user => {
            user
                ? localStorage.setItem("user", JSON.stringify(user))
                : localStorage.removeItem("user");
        });
    }
*/

//TRY OUT CODE

state = {
    signedIn: false, 
    user: null || JSON.parse(localStorage.getItem('user')),
    userName: null,
    userEmail: null,
    userPhotoURL: null,
    id: null,
};

  uiConfig = {
    signInFlow: 'popup',

    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.FacebookAuthProvider.PROVIDER_ID,
      firebase.auth.GithubAuthProvider.PROVIDER_ID
    ],
    
    callbacks: {
      signInSuccess: (user) => {
        this.setState({
            signedIn: true, 
            user: user, 
            userName: user.displayName,
            userEmail: user.email,
            userPhotoURL: user.photoURL,
            id: user.uid,
            karma: 0
        });
        return false; // Avoid redirects after sign-in.
      }
    }
  };

  componentDidMount = () => {
      this.authListener();
  }

  authListener = () => {
    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            this.setState({ user });
            localStorage.setItem('user', JSON.stringify(user));
        } else {
            this.setState({ user: null });
            localStorage.removeItem('user');
        }
    })
  }

  logout = (e) => {
    firebase.auth().signOut().then(() => {
        console.log('Signed Out');
        this.setState({signedIn: false/*, user: null*/});
    }).catch((error) => {
        console.log('Sign Out Error', error);
    });
  };

  logIn = () => {
      alert('hello');
      return (
        <div>
            <LoginPage /> 
            <FirebaseAuth uiConfig={this.uiConfig} firebaseAuth={firebase.auth()} />
        </div> 
    )
  }

    render() {
        const {user} = this.state;
        return (<Router>
            <Header user={user} logIn={this.logIn} logOut={this.logout} />
            <main> 
                {user 
                    ?  <ContentRouting user={user} /> 
                    : (<div> <LoginPage /> <FirebaseAuth uiConfig={this.uiConfig} firebaseAuth={firebase.auth()} /> ) 
                    <ContentRouting user={user} /> 
                    </div> )
                    }
          {/* <FirebaseAuth uiConfig={this.uiConfig} firebaseAuth={firebase.auth()} />
                <LoginPage signedIn={this.state.signedIn} 
                user={user}
                userName={this.state.userName}
                logout={this.logout}
                />
        <ContentRouting user={user} /> */}
            </main>
            <Footer/>
        </Router>);
    }
}

export default Programmerlingsliv;

import React from 'react';

import { FirebaseAuth } from 'react-firebaseui';
import firebase, { firestore } from 'firebase';
import LandingPage from './LandingPage';



class LoginPage extends React.Component {
    state = {
        signedIn: false, 
        user: {},
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
                id: user.uid
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
             //   localStorage.setItem('user', user.uid);
            } else {
                this.setState({ user: null });
             //   localStorage.removeItem('user');
            }
        })
      }

      logout = (e) => {
        firebase.auth().signOut().then(() => {
            console.log('Signed Out');
            this.setState({signedIn: false});
        }).catch((error) => {
            console.log('Sign Out Error', error);
        });
      };

      render() {

        if (!this.state.signedIn ) {
          return (
            <div>
              <p>Please sign-in:</p>
              <FirebaseAuth uiConfig={this.uiConfig} firebaseAuth={firebase.auth()} />
            </div>
          );
        } else if (this.state.user) {
            return (
              <div>
                <div>User exists!And you have loged in</div>
                <div>
                  user name: {this.state.userName}, user email:{" "}
                  {this.state.userEmail},
                  <img src={this.state.userPhotoURL} alt="pic" />
                </div>
                <button onClick={this.logout}>Log out</button>
              </div>
            ); 
        }
        return (
          <div>
            <p>this.state.signedIn = true, but theres no user data :( </p>
            <button onClick={this.logout}>Log out</button>
            <LandingPage />
          </div>
        );
      }
    }

export default LoginPage;
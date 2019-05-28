import React from 'react';
//import { FirebaseAuth } from 'react-firebaseui';
//import firebase, { firestore } from 'firebase';
import LandingPage from './LandingPage';



const LoginPage = (props) => {
  /*  state = {
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
            this.setState({signedIn: false, user: null});
        }).catch((error) => {
            console.log('Sign Out Error', error);
        });
      }; */

      
      
        if (!props.signedIn ) {
          return (
            <div>
              <p>Please sign-in first!</p> 
            </div>
          );
        } else if (props.user) {
            return (
              <div>
                <div>User exists!And you have loged in</div>
                <div>
                  user name: {props.userName}
                </div>
                <button onClick={props.logout}>Log out</button>
              </div>
            ); 
        } else {
            return (
              <div>
                <p>this.state.signedIn = true, but theres no user data :( </p>
                <button onClick={props.logout}>Log out</button>
                <LandingPage />
              </div>
            ); 
         }
      } 
    

export default LoginPage;
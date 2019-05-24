import React from "react";
import firebase from 'firebase';

const ChatDatabase = (props) => {
    //const user=props.user;

    const messaging = firebase.messaging();
    messaging.usePublicVapidKey("BLkOAODmGtvAnhY9Y2TEbPzTG42DROonh5BP_kjCH0I1OjkzvVD_S2MIKdVVua3otWWB3lOWVLQaAWficUaNAR4");
    Notification.requestPermission().then( (permission) => {
        console.log('permission: ', permission)
        if (permission === 'granted'){
            console.log('Have permission')
        return messaging.getToken()
        .then( (token) => {
            if (token) {
                console.log('token:', token)
            }
            
        })
        } else {
            console.log('unable to get permission to notify')
        }
        
    })
    .catch( (error) => {
        console.log('error ocurred', error)
    }) 

    messaging.onMessage( (payload => {
        console.log('On message', payload)
    }))

    /*// Add the public key generated from the console here.
    
    Notification.requestPermission().then(function(permission) {
        if (permission === 'granted') {
          console.log('Notification permission granted.');
          // TODO(developer): Retrieve an Instance ID token for use with FCM.
          // ...
          
        } else {
          console.log('Unable to get permission to notify.');
        }
      });

       // Get Instance ID token. Initially this makes a network call, once retrieved
        // subsequent calls to getToken will return from cache.
        messaging.getToken().then(function(currentToken) {
            if (currentToken) {
            sendTokenToServer(currentToken);
            updateUIForPushEnabled(currentToken);
            } else {
            // Show permission request.
            console.log('No Instance ID token available. Request permission to generate one.');
            // Show permission UI.
            updateUIForPushPermissionRequired();
            setTokenSentToServer(false);
            }
        }).catch(function(err) {
            console.log('An error occurred while retrieving token. ', err);
            showToken('Error retrieving Instance ID token. ', err);
            setTokenSentToServer(false);
        });      
     
        // Callback fired if Instance ID token is updated.
        messaging.onTokenRefresh(function() {
            messaging.getToken().then(function(refreshedToken) {
            console.log('Token refreshed.');
            // Indicate that the new Instance ID token has not yet been sent to the
            // app server.
            setTokenSentToServer(false);
            // Send Instance ID token to app server.
            sendTokenToServer(refreshedToken);
            // ...
            }).catch(function(err) {
            console.log('Unable to retrieve refreshed token ', err);
            showToken('Unable to retrieve refreshed token ', err);
            });
        });  */

    return (
        <div>
            <h1>Chat</h1>
        </div>
    );
};

export default ChatDatabase;


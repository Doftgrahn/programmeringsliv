import firebase from 'firebase';
import {database} from './Firebase';


const messaging = firebase.messaging();
messaging.usePublicVapidKey("BLkOAODmGtvAnhY9Y2TEbPzTG42DROonh5BP_kjCH0I1OjkzvVD_S2MIKdVVua3otWWB3lOWVLQaAWficUaNAR4");

export const initializeApp = () => {
    Notification.requestPermission().then( function () {
        console.log('Have permission')
        return messaging.getToken()
    })
    .then(function (token) {
        console.log('token: ', token)
        let tokenRef = database.collection('token').doc( 'KKepfYWsyOAwm42XSFy1');
        return tokenRef.update({
            currentToken: token
    })
    .then( () => {console.log('token updated in collection')})
    .catch( (err) => {console.log('Error when updating doc: ', err)})
    })
    .catch(function () {
        console.log('Permission denied')
    })
    messaging.onMessage(function (payload) {
        console.log('Message: ', payload)
    })
}


messaging.onTokenRefresh(function() {
    messaging.getToken().then(function(refreshedToken) {
      console.log('Token refreshed.', refreshedToken);
      let tokenRef = database.collection('token').doc('KKepfYWsyOAwm42XSFy1');
      return tokenRef.update({
          messageToken: refreshedToken
  })
    }).catch(function(err) {
      console.log('Unable to retrieve refreshed token ', err);
    });
  });

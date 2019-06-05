import firebase from 'firebase';
import {database} from './Firebase';


const messaging = firebase.messaging();

messaging.usePublicVapidKey("BLkOAODmGtvAnhY9Y2TEbPzTG42DROonh5BP_kjCH0I1OjkzvVD_S2MIKdVVua3otWWB3lOWVLQaAWficUaNAR4");


Notification.requestPermission().then( function () {
    return messaging.getToken()
})
.then(function (token) {
    let tokenRef = database.collection('token').doc( 'KKepfYWsyOAwm42XSFy1');
    return tokenRef.update({
        currentToken: token
})
.catch( (err) => {console.log('Error when updating token: ', err)})
})
.catch(function () {
    console.log('Permission denied')
})
messaging.onMessage(function (payload) {
    console.log('Message: ', payload)
    let message = payload.notification.title + payload.notification.body;
    alert(message);
})



import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.scss';
import Programmeringsliv from './Programmeringliv';
import * as serviceWorker from './tdd/serviceWorker';
import firebase from 'firebase';

if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('../firebase-messaging-sw.js')
    .then(function(registration) {
        firebase.messaging().useServiceWorker(registration);
    }).catch(function(err) {
      console.log('Service worker registration failed, error:', err);
    });
  }

ReactDOM.render(<Programmeringsliv />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

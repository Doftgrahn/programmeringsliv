importScripts('https://www.gstatic.com/firebasejs/4.8.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/4.8.1/firebase-messaging.js');
//import 'firebase/app';
//import 'firebase/messaging';

  firebase.initializeApp({
    'messagingSenderId': '693478885127'
  });
  const messaging = firebase.messaging();



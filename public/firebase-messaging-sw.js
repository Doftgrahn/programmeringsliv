importScripts('https://www.gstatic.com/firebasejs/4.8.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/4.8.1/firebase-messaging.js');

const firebaseConfig = {
  apiKey: "AIzaSyAHNYwuSuNlJzbiP19EJaIFnnzZy1a0FdQ",
  authDomain: "programmeringslajf.firebaseapp.com",
  databaseURL: "https://programmeringslajf.firebaseio.com",
  projectId: "programmeringslajf",
  storageBucket: "programmeringslajf.appspot.com",
  messagingSenderId: "693478885127",
  appId: "1:693478885127:web:f529e692d3fa8d87"
};

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

messaging.setBackgroundMessageHandler( (payload) => {
  const title = 'Hello';
  const options = {
    body: payload.data.status
  }
  return self.registration.showNotification(title, options);
})
/*if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('../firebase-messaging-sw.js')
    .then(function(registration) {
      console.log('Registration successful, scope is:', registration.scope);
    }).catch(function(err) {
      console.log('Service worker registration failed, error:', err);
    });
  }*/
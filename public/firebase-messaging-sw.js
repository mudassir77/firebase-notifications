importScripts('https://www.gstatic.com/firebasejs/10.11.1/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.11.1/firebase-messaging-compat.js');


const firebaseApp = firebase.initializeApp({

    // Unable to get the values from the .env file so I have to hard code the values

    apiKey: 'AIzaSyAjzugaRZRa8r_0rtZG08fGvu-f7o4_wqc',
    authDomain: 'saylani2nd.firebaseapp.com',
    projectId: 'saylani2nd',
    storageBucket: 'saylani2nd.appspot.com',
    messagingSenderId: '1009546185453',
    appId: '1:1009546185453:web:e84150ca4070e17983dae4',
    measurementId: 'G-M5S4Q4B51F',
});

const messaging = firebase.messaging(firebaseApp);

const backgrounMessaging = firebase.messaging(firebaseApp)
messaging.onBackgroundMessage(backgrounMessaging, function (payload) {
   
    const notificationTitle = 'Background Message Title';
    const notificationOptions = {
        body: 'Background Message body.',
    };

    self.registration.showNotification(notificationTitle,
        notificationOptions);
});
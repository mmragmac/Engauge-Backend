'use strict';
const dotenv = require('dotenv');
const assert = require('assert');

dotenv.config();

// const{
//     PORT,
//     HOST,
//     HOST_URL,
//     API_KEY,
//     AUTH_DOMAIN,
//     PROJECT_ID,
//     STORAGE_BUCKET,
//     MESSAGING_SENDER_ID,
//     APP_ID
// } = process.env;

// assert(PORT, 'PORT is required');
// assert(HOST, 'HOST is required');

module.exports = {
    // port: PORT,
    // host: HOST,
    // url: HOST_URL,
    firebaseConfig : {
        apiKey: 'AIzaSyC69PK6qjr7WAbwFTfq-hr4PfFE9lVC14s',
        authDomain: 'engauge2-db691.firebaseapp.com',
        projectId: 'engauge2-db691',
        storageBucket: 'engauge2-db691.appspot.com',
        messagingSenderId: '2191130311',
        appId: '1:2191130311:web:196655770a3c46351908e2'
    }
}
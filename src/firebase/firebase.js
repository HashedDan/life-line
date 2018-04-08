import * as firebase from 'firebase';

const prodConfig = {
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  databaseURL: 'https://life-line-af9ca.firebaseio.com',
  projectId: process.env.PROJECT_ID,
  storageBucket: '',
  messagingSenderId: process.env.MESSAGING_SENDER_ID,
};

const devConfig = {
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  databaseURL: 'https://life-line-af9ca.firebaseio.com',
  projectId: process.env.PROJECT_ID,
  storageBucket: '',
  messagingSenderId: process.env.MESSAGING_SENDER_ID,
};

const config = process.env.NODE_ENV === 'production'
  ? prodConfig
  : devConfig;

if (!firebase.apps.length) {
  firebase.initializeApp(config);
}

const db = firebase.database();
const auth = firebase.auth();

export {
  db,
  auth,
};

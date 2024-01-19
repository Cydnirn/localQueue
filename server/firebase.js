const { initializeApp, applicationDefault, cert } = require("firebase-admin/app");
const { getAnalytics } = require("firebase/analytics");
const { getFirestore, Timestamp, FieldValue } = require("firebase-admin/firestore");
require("dotenv").config();

const serviceAccount = require("./keys/localqueue-9f328-firebase-adminsdk-zk7v4-5b27a96e67.json");

const firebaseConf = {
    apiKey: process.env.FIREBASE_API,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGE_ID,
    appId: process.env.FIREBASE_APP_ID,
    measurementId: process.env.FIREBASE_MEASUREMENT_ID,
    credential: cert(serviceAccount)
};

const fireApp = initializeApp(firebaseConf);

const db = getFirestore(fireApp);

module.exports = {
    db
}
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Firebase configuration
const firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOAMIN,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.firebase_storage_bucket,
    messagingSenderId: process.env.firebase_messaging_sender_id,
    appId: process.env.FIREBASE_APP_ID,
    measurementId: process.env.FIREBASE_MEASURMENT_ID //measurementId is optional
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const timestamp = app.firestore.FieldValue.serverTimestamp;

export {timestamp};
export default app.firestore;
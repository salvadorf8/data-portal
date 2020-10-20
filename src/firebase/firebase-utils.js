import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: `${process.env.REACT_APP_FIREBASE_API_KEY}`,
    authDomain: `${process.env.REACT_APP_FIREBASE_AUTH_DOMAIN}`,
    databaseURL: `${process.env.REACT_APP_FIREBASE_DATABASE_URL}`,
    projectId: `${process.env.REACT_APP_FIREBASE_PROJECT_ID}`,
    storageBucket: `${process.env.REACT_APP_FIREBASE_STORAGE_BUCKET}`,
    messagingSenderId: `${process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID}`,
    appId: `${process.env.REACT_APP_FIREBASE_APP_ID}`
};

// measurementId: "G-XN4RMZJBRS"

firebase.initializeApp(config);

export const firestore = firebase.firestore();
export const auth = firebase.auth();

export const signInAnonymously = () => {
    auth.signInAnonymously().catch(function (error) {
        var errorCode = error.code;
        var errorMessage = error.message;

        console.log(errorCode);
        console.log(errorMessage);
    });
};

export const getScoreData = async () => {
    const scoresColRef = firestore.collection(`scores`);
    // const scoresQuerySnapshot = await scoresColRef.get();

    // console.log(scoresQuerySnapshot.docs.map((doc) => doc.id));

    return scoresColRef;
};

export default firebase;

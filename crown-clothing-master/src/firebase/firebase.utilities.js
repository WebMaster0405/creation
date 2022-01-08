import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyB06Dul_GyIMKFD66VV5vvh7HdFK_7UqVA",
    authDomain: "crwn-clothing-7b63e.firebaseapp.com",
    databaseURL: "https://crwn-clothing-7b63e.firebaseio.com",
    projectId: "crwn-clothing-7b63e",
    storageBucket: "crwn-clothing-7b63e.appspot.com",
    messagingSenderId: "90341265701",
    appId: "1:90341265701:web:680201b05cb87ae3dd0acc",
    measurementId: "G-66G72XTGYJ"
  };

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

// Google Authentication Setup
const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({
    'promt': 'select_account'
});
export const SignInWithGoogle = () => auth.signInWithPopup(provider);

//FireStore Setup ------ STARTS HERE ------
export const createUserProfileDocument = async (userAuth, additionalData) => {
  //console.log(userAuth)
  //here user is onw who logged with google
  if(!userAuth) return;

  //Query document use firestore.doc('path'), while Query collection is firestore.collection('coll_name')
  const userRef = firestore.doc(`users/${userAuth.uid}`)

  //Snapshot carries no data but has a field called 'Exists' whose value is either true or false.
  //False indicates absense of user in database.
  const snapshot = await userRef.get()
  //If user doesn't exists that is snapshot.exists = false
  if(!snapshot.exists) {
    const {displayName, email} = userAuth;
    const createdOn = new Date();

    try{

      //Setting and creating user in our database
      await userRef.set({
        displayName,
        email,
        createdOn,
        ...additionalData
      });
    } catch (err) {
      console.log('error creating user', err.message);
    }
  }

  return userRef;
}

export default firebase;


import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: 'AIzaSyB_15V9NsrDJqptxAd9fyvu9foFG-yWuDA',
  authDomain: 'shopingdb-41405.firebaseapp.com',
  databaseURL: 'https://shopingdb-41405.firebaseio.com',
  projectId: 'shopingdb-41405',
  storageBucket: 'shopingdb-41405.appspot.com',
  messagingSenderId: '288548485871',
  appId: '1:288548485871:web:118d44498b03ad52a2391a'
};

firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }

  return userRef;
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;

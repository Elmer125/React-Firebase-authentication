import app from 'firebase/compat/app';
import 'firebase/compat/auth';

const config = {
  apiKey: 'AIzaSyDL_YvHEaoCUHxKvLmjN4Pa-OQYbkjXX90',
  authDomain: 'authentication-4e31d.firebaseapp.com',
  projectId: 'authentication-4e31d',
  storageBucket: 'authentication-4e31d.appspot.com',
  messagingSenderId: '1075648725709',
  appId: '1:1075648725709:web:2c6b8ea4043db5a3765f84',
};

class Firebase {
  constructor() {
    app.initializeApp(config);
    this.auth = app.auth();
  }
  // *** Auth API ***

  doSignInWithPopup = (google) => this.auth.signInWithPopup(google);

  doCreateUserWithEmailAndPassword = (email, password) =>
    this.auth.createUserWithEmailAndPassword(email, password);

  doSignInWithEmailAndPassword = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password);

  doSignOut = () => this.auth.signOut();

  doPasswordReset = (email) =>
    this.auth.sendPasswordResetEmail(email);

  doPasswordUpdate = (password) =>
    this.auth.currentUser.updatePassword(password);
}

const google = new app.auth.GoogleAuthProvider();
const Facebook= new app.auth.FacebookAuthProvider();
export { google, Facebook };
export default Firebase;

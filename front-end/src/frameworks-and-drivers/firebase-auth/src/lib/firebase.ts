import {initializeApp} from "firebase/app";
import * as firebaseAuth from "firebase/auth";
import {signInWithEmailAndPassword, sendPasswordResetEmail,} from "firebase/auth";

const actionCodeSettings = {
  url: 'http://localhost:4200/'
}

const app = initializeApp({
  apiKey: process.env["NX_FIREBASE_API_KEY"],
  authDomain: process.env["NX_AUTH_DOMAIN"],
  projectId: process.env["NX_PROJECT_ID"],
  storageBucket: process.env["STORAGE_BUCKET"],
  messagingSenderId: process.env["MESSAGING_SENDER_ID"],
  appId: process.env["APP_ID"]
});

export const auth = firebaseAuth.getAuth(app);

export const signinEmailPassword = async (email: string, password: string) => {
  return await signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
    });
}

export const resetPassword = async (email: string) => {
  return await sendPasswordResetEmail(auth, email, actionCodeSettings)
    .then(() => {
      // Password reset email sent!
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
    });
}

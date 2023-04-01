import {initializeApp} from "firebase/app";
import * as firebaseAuth from "firebase/auth";
import {signInWithEmailAndPassword, sendPasswordResetEmail} from "firebase/auth";

const app = initializeApp({
  apiKey: process.env["NX_FIREBASE_API_KEY"],
  authDomain: process.env["NX_AUTH_DOMAIN"],
  projectId: process.env["NX_PROJECT_ID"],
  storageBucket: process.env["NX_STORAGE_BUCKET"],
  messagingSenderId: process.env["NX_MESSAGING_SENDER_ID"],
  appId: process.env["NX_APP_ID"]
});

export const auth = firebaseAuth.getAuth(app);

export const signinEmailPassword = async (email: string, password: string) => {
  return await signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
    })
    .catch((error) => {
      //TODO: ADD THIS TO LOGGER
      const errorCode = error.code;
      const errorMessage = error.message;
    });
}

export const resetPassword = async (email: string, homeUrl:string) => {
  const actionCodeSettings  = {
    url:homeUrl
  };
  return await sendPasswordResetEmail(auth, email, actionCodeSettings)
    .then(() => {
      // Password reset email sent!
    })
    .catch((error) => {
      //TODO: ADD THIS TO LOGGER
      const errorCode = error.code;
      const errorMessage = error.message;
    });
}

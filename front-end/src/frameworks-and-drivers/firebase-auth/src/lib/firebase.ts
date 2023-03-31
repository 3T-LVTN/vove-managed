import {initializeApp} from "firebase/app";
import * as firebaseAuth from "firebase/auth";
import {createUserWithEmailAndPassword, signInWithEmailAndPassword} from "firebase/auth";

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
      console.log(user);
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
    });
}

import { initializeApp } from "firebase/app";
import * as firebaseAuth from "firebase/auth";
import * as firebaseui from "firebaseui";

const app = initializeApp({
  apiKey: process.env["NX_FIREBASE_API_KEY"],
  authDomain: process.env["NX_AUTH_DOMAIN"],
  projectId: process.env["NX_PROJECT_ID"],
});

export const auth = firebaseAuth.getAuth(app);

export const ui = new firebaseui.auth.AuthUI(auth);

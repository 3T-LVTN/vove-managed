import {initializeApp} from "firebase/app";
import {getAuth, Auth} from "firebase/auth";
import {signInWithEmailAndPassword, sendPasswordResetEmail} from "firebase/auth";
import {UserRepository} from "@front-end/application/repositories/user";
import {User} from "@front-end/domain/entities/user";

const firebaseConfig = {
  apiKey: process.env["NX_FIREBASE_API_KEY"],
  authDomain: process.env["NX_AUTH_DOMAIN"],
  projectId: process.env["NX_PROJECT_ID"],
  storageBucket: process.env["NX_STORAGE_BUCKET"],
  messagingSenderId: process.env["NX_MESSAGING_SENDER_ID"],
  appId: process.env["NX_APP_ID"]
}

const app = initializeApp(firebaseConfig);

const auth: Auth = getAuth(app);

export class AuthFirebase implements UserRepository {
  async signInWithEmailPassword(email: string, password: string): Promise<void> {
    await signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.info("Login success");
      })
      .catch((error) => {
        throw new Error(error.message);
      });
  }

  async currentAuthenticatedUser(): Promise<User> {
    const userData = auth.currentUser;
    if (!userData) {
      throw new Error("User not authenticated");
    }
    console.info("currentAuthenticatedUser info:", userData.email)
    return {
      email: userData.email,
      name: userData.displayName,
      photoUrl: userData.photoURL,
    } as User;
  }

  async currentSession(): Promise<boolean> {
    return auth.currentUser != null;
  }

  async signOut(): Promise<void> {
    await auth.signOut().then(() => {
      console.info("Sign Out success");
    });
  }

  async resetPassword(email: string, homeUrl: string) {
    const actionCodeSettings = {
      url: homeUrl
    };
    return await sendPasswordResetEmail(auth, email, actionCodeSettings)
      .then(() => {
        console.info("Reset password email sent");
      })
      .catch((error) => {
        throw new Error(error.message);
      });
  }
}

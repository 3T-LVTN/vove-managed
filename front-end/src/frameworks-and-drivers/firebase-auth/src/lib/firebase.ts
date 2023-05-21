import {initializeApp} from "firebase/app";
import {getAuth, Auth} from "firebase/auth";
import {signInWithEmailAndPassword, sendPasswordResetEmail, User as FirebaseUser} from "firebase/auth";
import {UserRepository} from "@front-end/application/repositories/user";
import {User} from "@front-end/domain/entities/user";
import {axios} from "@front-end/frameworks-and-drivers/app-sync/axios";

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

const getCurrentUser = () => {
  return new Promise<FirebaseUser | null>((resolve, reject) => {
    auth.onAuthStateChanged(user => {
      resolve(user);
    }, reject);
  });
}

export class AuthFirebase implements UserRepository {
  async signInWithEmailPassword(email: string, password: string): Promise<void> {
    await signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => userCredential.user?.getIdToken())
      .then((token) => localStorage.setItem("token", token))
      .then(() => console.info("Login success"))
      .catch((error) => {
        throw new Error(error.message);
      });
  }

  async currentAuthenticatedUser(): Promise<User> {
    return getCurrentUser()
      .then((user) => {
        if (!user) {
          throw new Error("User not authenticated");
        }
        user.getIdTokenResult(false)
          .then((idTokenResult) => {
            localStorage.setItem("token", idTokenResult.token)
            axios.defaults.headers.common["Authorization"] = `Bearer ${idTokenResult.token}`;
          })
        return {
          email: user.email,
          name: user.displayName,
          photoUrl: user.photoURL,
        } as User;
      })
  }

  async currentSession(): Promise<boolean> {
    return getCurrentUser()
      .then((user) => {
        if (user) {
          const isInSession = user.getIdTokenResult(false)
            .then((idTokenResult) => new Date(idTokenResult.expirationTime) > new Date())
          return !!isInSession;
        } else {
          throw new Error("User not authenticated");
        }
      })
  }

  async signOut(): Promise<void> {
    await auth.signOut().then(() => {
      localStorage.removeItem("token");
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

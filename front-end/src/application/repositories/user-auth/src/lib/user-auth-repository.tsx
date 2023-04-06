import {User} from "@front-end/domain/entities/user";

export interface UserAuthRepository {
  forceAuth(): Promise<void>;
  signInWithEmailPassword(email: string, password: string): Promise<void>;
  currentAuthenticatedUser(): Promise<User>;
  signOut(): Promise<void>;
  currentSession(): Promise<boolean>;
  resetPassword(email: string, homeUrl: string): Promise<void>;
}

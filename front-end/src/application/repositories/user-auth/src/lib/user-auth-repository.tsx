import {User} from "@front-end/domain/entities/user";

export interface UserAuthRepository {
  auth(): Promise<void>;
  currentAuthenticatedUser(): Promise<User>;
  signOut(): Promise<void>;
  currentSession(): Promise<boolean>;
}

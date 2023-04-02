import {User} from "@front-end/domain/entities/user";

export interface UserUseCase {
  auth(): Promise<void>;
  signOut(): Promise<void>;
  getUserInfo(): Promise<User>;
}

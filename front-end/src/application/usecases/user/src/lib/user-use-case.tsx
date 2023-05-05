import {User} from "@front-end/domain/entities/user";

export interface UserUseCase {
  signIn(email: string, password: string): Promise<void>;
  resetPassword(email: string, homeUrl: string): Promise<void>;
  signOut(): Promise<void>;
  getUserInfo(): Promise<User>;
}

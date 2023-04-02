

import {UserAuthRepository} from "@front-end/application/repositories/user-auth";
import {UserUseCase} from "@front-end/application/usecases/user";
import {User} from "@front-end/domain/entities/user";

export class UserInteractor implements UserUseCase {
  constructor(private readonly userAuth: UserAuthRepository) {}
  async auth(): Promise<void> {
    const currentSession = await this.userAuth.currentSession();
    if (!currentSession) {
      await Promise.all([
        new Promise((resolve) => setTimeout(resolve, 10000)),
        this.userAuth.auth(),
      ]);
    }
  }

  signOut(): Promise<void> {
    return this.userAuth.signOut();
  }

  getUserInfo(): Promise<User> {
    return this.userAuth.currentAuthenticatedUser();
  }
}

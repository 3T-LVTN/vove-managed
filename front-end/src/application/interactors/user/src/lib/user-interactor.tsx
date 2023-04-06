import {UserAuthRepository} from "@front-end/application/repositories/user-auth";
import {UserUseCase} from "@front-end/application/usecases/user";
import {User} from "@front-end/domain/entities/user";

export class UserInteractor implements UserUseCase {
  constructor(private readonly userAuth: UserAuthRepository) {
  }

  async signIn(email: string, password: string): Promise<void> {
    const currentSession = await this.userAuth.currentSession();
    if (!currentSession) {
      await Promise.all([
        new Promise((resolve) => setTimeout(resolve, 10000)),
        this.userAuth.signInWithEmailPassword(email, password),
      ]);
    }
  }

  async resetPassword(email: string, homeUrl: string): Promise<void> {
    const currentSession = await this.userAuth.currentSession();
    if (!currentSession) {
      await Promise.all([
        new Promise((resolve) => setTimeout(resolve, 10000)),
        this.userAuth.resetPassword(email, homeUrl),
      ]);
    }
  }

  signOut(): Promise<void> {
    return this.userAuth.signOut();
  }

  async getUserInfo(): Promise<User> {
    const currentSession = await this.userAuth.currentSession();
    let userInfo: User = {
      email: "",
      name: "",
      photoUrl: "",
    };
    return this.userAuth.currentAuthenticatedUser()
      .then((user)=> userInfo=user)
      .catch((error) => {throw new Error(error)});
  }
}

import {UserRepository} from "@front-end/application/repositories/user";
import {UserUseCase} from "@front-end/application/usecases/user";
import {User} from "@front-end/domain/entities/user";

export class UserInteractor implements UserUseCase {
  constructor(private readonly userAuth: UserRepository) {
  }

  async signIn(email: string, password: string): Promise<void> {
    await this.userAuth.signInWithEmailPassword(email, password)
      .catch((error) => {
        throw new Error(error)
      });
  }

  async resetPassword(email: string, homeUrl: string): Promise<void> {
    await this.userAuth.resetPassword(email, homeUrl)
      .catch((error) => {
        throw new Error(error)
      });
  }

  signOut(): Promise<void> {
    return this.userAuth.signOut();
  }

  async getUserInfo(): Promise<User> {
    return this.userAuth.currentSession()
      .then((session) => {
        if (!session) {
          this.userAuth.signOut();
          throw new Error("End of session");
        } else {
          return this.userAuth.currentAuthenticatedUser()
            .then((user) => user)
            .catch((error) => {
              throw error
            });
        }
      })
      .catch((error) => {throw error});
  }
}

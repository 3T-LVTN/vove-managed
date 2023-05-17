import {UserUseCase} from "@front-end/application/usecases/user";
import {UserViewModel} from "@front-end/interface-adapters/view-models/user";

export class UserController {
  constructor(private readonly authUseCase: UserUseCase) {
  }

  signIn(email: string, password: string): Promise<void> {
    return this.authUseCase.signIn(email, password);
  }

  resetPassword(email: string, homeUrl: string): Promise<void> {
    return this.authUseCase.resetPassword(email, homeUrl);
  }

  async getUser(): Promise<UserViewModel> {
    return this.authUseCase.getUserInfo()
      .then((user) => ({
        email: user.email,
        name: user.name,
      }))
      .catch((error) => {
        throw error
      });
  }

  signOut(): Promise<void> {
    return this.authUseCase.signOut();
  }
}

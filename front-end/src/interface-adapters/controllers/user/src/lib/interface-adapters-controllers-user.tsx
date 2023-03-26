import {UserUseCase} from "@front-end/application/usecases/user";
import {UserViewModels} from "@front-end/interface-adapters/view-models/user";

export class UserController {
  constructor(private readonly authUseCase: UserUseCase) {}
  auth(): Promise<void> {
    return this.authUseCase.auth();
  }

  getUser(): Promise<UserViewModels> {
    return this.authUseCase.getUserInfo().then((user) => ({
      email: user.email,
    }));
  }

  signOut(): Promise<void> {
    return this.authUseCase.signOut();
  }
}

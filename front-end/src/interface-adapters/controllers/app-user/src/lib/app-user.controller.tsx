import {AppUserUseCase} from "@front-end/application/usecases/app-user";
import {AppUserListViewModel, AppUserViewModel} from "@front-end/interface-adapters/view-models/app-user";
import {AppUser} from "@front-end/domain/entities/app-user";
import {Query} from "@front-end/shared/utils";

export class AppUserController {
  constructor(private readonly appUserUseCase: AppUserUseCase) {}

  async getUserList(query: Query): Promise<AppUserListViewModel> {
    return this.appUserUseCase.getUserList(query)
      .then((users) => users)
      .catch((error) => {
        throw new Error(error)
      });
  }

  async getUser(id: string): Promise<AppUserViewModel> {
    return this.appUserUseCase.getUser(id)
      .then((user) => user as AppUserViewModel)
      .catch((error) => {
        throw new Error(error)
      });
  }

  async deleteUser(id: string): Promise<void> {
    return this.appUserUseCase.deleteUser(id);
  }
}

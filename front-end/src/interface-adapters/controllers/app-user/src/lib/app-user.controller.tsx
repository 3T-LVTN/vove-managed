import {AppUserUseCase} from "@front-end/application/usecases/app-user";
import {AppUserListViewModel, AppUserViewModel} from "@front-end/interface-adapters/view-models/app-user";
import {AppUser} from "@front-end/domain/entities/app-user";

export class AppUserController {
  constructor(private readonly appUserUseCase: AppUserUseCase) {}

  async getUserList(page: number, search: string, filterModel: AppUserViewModel): Promise<AppUserListViewModel> {
    const filter: AppUser = filterModel as AppUser;
    return this.appUserUseCase.getUserList(page, search, filter)
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

  async updateUser(user: AppUserViewModel): Promise<void> {
    const userEntity: AppUser = {
      id: user.id,
      email: user.email,
      name: user.name,
      phoneNumber: user.phoneNumber,
      address: user.address,
      photoUrl: user.photoUrl
    };
    return this.appUserUseCase.updateUser(userEntity);
  }

  async deleteUser(id: string): Promise<void> {
    return this.appUserUseCase.deleteUser(id);
  }
}

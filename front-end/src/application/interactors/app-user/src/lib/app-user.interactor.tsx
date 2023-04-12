import {AppUserUseCase} from "@front-end/application/usecases/app-user";
import {AppUserRepository} from "@front-end/application/repositories/app-user";
import {AppUser, AppUserList} from "@front-end/domain/entities/app-user";
import {Query} from "@front-end/shared/utils";

export class AppUserInteractor implements AppUserUseCase {
  constructor(private readonly appUserRepository: AppUserRepository) {
  }

  async getUserList(query: Query): Promise<AppUserList> {
    return this.appUserRepository.getUserList(query)
      .then((users) => users)
      .catch((error) => {
        throw new Error(error)
      });
  }

  async getUser(id: string): Promise<AppUser> {
    return this.appUserRepository.getUser(id)
      .then((user) => user)
      .catch((error) => {
        throw new Error(error)
      });
  }

  updateUser(user: AppUser): Promise<number> {
    return this.appUserRepository.updateUser(user);
  }

  deleteUser(id: string): Promise<void> {
    return this.appUserRepository.deleteUser(id);
  }
}

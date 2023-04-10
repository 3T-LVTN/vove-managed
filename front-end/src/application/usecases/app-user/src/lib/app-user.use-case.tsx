import {AppUser, AppUserList} from "@front-end/domain/entities/app-user";

export interface AppUserUseCase {
  getUserList(page: number, search: string, filter: AppUser): Promise<AppUserList>;
  getUser(id: string): Promise<AppUser>;
  updateUser(user: AppUser): Promise<void>;
  deleteUser(id: string): Promise<void>;
}

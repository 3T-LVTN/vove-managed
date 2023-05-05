import {AppUser, AppUserList} from "@front-end/domain/entities/app-user";
import {Query} from "@front-end/shared/utils";

export interface AppUserUseCase {
  getUserList(query: Query): Promise<AppUserList>;
  getUser(id: string): Promise<AppUser>;
  updateUser(user: AppUser): Promise<number>;
  deleteUser(id: string): Promise<void>;
}

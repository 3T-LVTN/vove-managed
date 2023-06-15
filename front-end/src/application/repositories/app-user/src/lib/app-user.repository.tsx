import {AppUser, AppUserDetail, AppUserList} from "@front-end/domain/entities/app-user";
import {Query} from "@front-end/shared/utils";

export interface AppUserRepository {
  getUserList(query: Query): Promise<AppUserList>;
  getUser(id: string): Promise<AppUserDetail>;
  updateUser(user: AppUser): Promise<number>;
  deleteUser(id: string): Promise<void>;
}

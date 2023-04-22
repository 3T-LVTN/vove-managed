import {User, UserList} from "@back-end/domain/entities/user";
import {UserQuery} from "@back-end/domain/shared/query";

export interface UserRepository {
  getUserList(query: UserQuery): Promise<UserList>;
  getUser(id: string): Promise<User>;
  updateUser(id: string, user: User): Promise<string>;
  deleteUser(id: string): Promise<void>;
}

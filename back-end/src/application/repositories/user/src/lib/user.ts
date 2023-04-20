import {User} from "@back-end/domain/entities/user";
import {UserQuery} from "@back-end/domain/shared/query";

export interface UserRepository {
  getUserList(query: UserQuery): Promise<User[]>;
  getUser(id: number): Promise<User>;
  updateUser(id: number, user: User): Promise<number>;
  deleteUser(id: number): Promise<void>;
}

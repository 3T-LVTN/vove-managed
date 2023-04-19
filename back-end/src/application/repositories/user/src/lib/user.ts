import {User} from "@back-end/domain/entities/user";

export interface UserRepository {
  getUserList(): Promise<User[]>;
  getUser(id: string): Promise<User>;
  updateUser(user: User): Promise<number>;
  deleteUser(id: string): Promise<void>;
}

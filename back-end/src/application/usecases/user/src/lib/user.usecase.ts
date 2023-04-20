import {User} from "@back-end/domain/entities/user";
import {UserQuery} from "@back-end/domain/shared/query";
import {UserDTO} from "@back-end/domain/dtos/user";

export interface UserUseCase {
  getUserList(query: UserQuery): Promise<User[]>;
  getUser(id: number): Promise<User>;
  updateUser(id: number, user: UserDTO): Promise<number>;
  deleteUser(id: number): Promise<void>;
}

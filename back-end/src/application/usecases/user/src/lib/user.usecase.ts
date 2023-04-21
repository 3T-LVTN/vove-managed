import {UserQuery} from "@back-end/domain/shared/query";
import {UserDTO, UserListDTO} from "@back-end/domain/dtos/user";

export interface UserUseCase {
  getUserList(query: UserQuery): Promise<UserListDTO>;
  getUser(id: number): Promise<UserDTO>;
  updateUser(id: number, user: UserDTO): Promise<number>;
  deleteUser(id: number): Promise<void>;
}

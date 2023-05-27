import {UserQuery} from "@back-end/domain/shared/query";
import {UserDTO, UserListDTO} from "@back-end/domain/dtos/user";

export interface UserUseCase {
  getUserList(query: UserQuery): Promise<UserListDTO>;
  getUser(id: string): Promise<UserDTO>;
  updateUser(id: string, user: UserDTO): Promise<string>;
  deleteUser(id: string): Promise<string>;
}

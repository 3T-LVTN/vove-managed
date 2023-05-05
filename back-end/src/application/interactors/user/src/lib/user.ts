import {UserUseCase} from "@back-end/application/usecases/user";
import {Inject, Injectable} from "@nestjs/common";
import {UserRepository} from "@back-end/application/repositories/user";
import {UserQuery} from "@back-end/domain/shared/query";
import {UserDTO, UserListDTO} from "@back-end/domain/dtos/user";
import {UsersMapper} from "@back-end/application/utilities";

@Injectable()
export class UserInteractors implements UserUseCase {
  constructor(
    @Inject("UserMongoDBRepository")
    private userRepository: UserRepository) {
  }

  async getUserList(query: UserQuery): Promise<UserListDTO> {
    return this.userRepository.getUserList(query)
      .then((users) => UsersMapper.toListDTO(users));
  }

  getUser(id: string): Promise<UserDTO> {
    return this.userRepository.getUser(id)
      .then((user) => Promise.resolve(UsersMapper.toDTO(user)));
  }

  updateUser(id: string, user: UserDTO): Promise<string> {
    return this.userRepository.updateUser(id, UsersMapper.toEntity(user));
  }

  deleteUser(id: string): Promise<void> {
    return this.userRepository.deleteUser(id);
  }
}

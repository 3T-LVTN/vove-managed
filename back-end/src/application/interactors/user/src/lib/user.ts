import {UserUseCase} from "@back-end/application/usecases/user";
import {User} from "@back-end/domain/entities/user";
import {Inject, Injectable} from "@nestjs/common";
import {UserRepository} from "@back-end/application/repositories/user";
import {UserQuery} from "@back-end/domain/shared/query";
import {UserDTO} from "@back-end/domain/dtos/user";
import {UsersMapper} from "@back-end/application/utilities";

@Injectable()
export class UserInteractors implements UserUseCase {
  constructor(
    @Inject("UserMongoDBRepository")
    private userRepository: UserRepository) {
  }

  async getUserList(query: UserQuery): Promise<User[]> {
    return this.userRepository.getUserList(query);
  }

  getUser(id: number): Promise<User> {
    return this.userRepository.getUser(id)
      .catch((error) => {throw new Error(error)})
  }

  updateUser(id: number, user: UserDTO): Promise<number> {
    return this.userRepository.updateUser(id, UsersMapper.toDomain(user))
      .catch((error) => {throw new Error(error)})
  }

  deleteUser(id: number): Promise<void> {
    return this.userRepository.deleteUser(id)
      .catch((error) => {throw new Error(error)});
  }
}

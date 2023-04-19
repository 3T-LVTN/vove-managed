import {UserUseCase} from "@back-end/application/usecases/user";
import {User} from "@back-end/domain/entities/user";
import {Inject, Injectable} from "@nestjs/common";
import {UserRepository} from "@back-end/application/repositories/user";

@Injectable()
export class UserInteractors implements UserUseCase {
  constructor(
    @Inject("UserMongoDBRepository")
    private userRepository: UserRepository) {
  }

  async getUserList(): Promise<User[]> {
    return this.userRepository.getUserList();
  }

  getUser(id: string): Promise<User> {
    throw new Error("Method not implemented.");
  }

  updateUser(user: User): Promise<number> {
    throw new Error("Method not implemented.");
  }

  deleteUser(id: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
}

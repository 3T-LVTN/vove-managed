import {Injectable} from "@nestjs/common";
import {User} from "@back-end/domain/entities/user";
import {UserRepository} from "@back-end/application/repositories/user";
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";

@Injectable()
export class UserMongoDBRepository implements UserRepository {
  constructor(@InjectModel("Users") private readonly userModel: Model<User>) {
  }
  async getUserList(): Promise<User[]> {
    return this.userModel.find().exec();
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

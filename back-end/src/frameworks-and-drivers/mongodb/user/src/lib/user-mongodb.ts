import {Injectable} from "@nestjs/common";
import {User} from "@back-end/domain/entities/user";
import {UserRepository} from "@back-end/application/repositories/user";
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";
import {UserQuery} from "@back-end/domain/shared/query";
import {QueryHelper} from "@back-end/application/utilities";

@Injectable()
export class UserMongoDBRepository implements UserRepository {
  constructor(@InjectModel("Users") private readonly userModel: Model<User>) {
  }

  async getUserList(query: UserQuery): Promise<User[]> {
    return this.userModel.find(
      QueryHelper.getUserFilter(query),
      null,
      QueryHelper.getOptions(query)).exec();
  }

  getUser(id: number): Promise<User> {
    return this.userModel.findById(id).exec()
      .then(user => {
        if (user) {
          return user;
        } else {
          //TODO: Add Exception
          throw new Error("User not found");
        }
      });
  }

  updateUser(id: number, user: User): Promise<number> {
    return this.userModel.findByIdAndUpdate(id, user).exec()
      .then((user) => {
        if (user) {
          return user._id;
        } else {
          //TODO: Add Exception
          throw new Error("User not found");
        }
      });
  }

  deleteUser(id: number): Promise<void> {
    return this.userModel.findByIdAndDelete(id).exec()
      .then((user) => {
        if (!user) {
          //TODO: Add Exception
          throw new Error("User not found");
        }
      });
  }
}

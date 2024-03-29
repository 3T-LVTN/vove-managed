import {Injectable, NotFoundException} from "@nestjs/common";
import {User, UserList} from "@back-end/domain/entities/user";
import {UserRepository} from "@back-end/application/repositories/user";
import {InjectModel} from "@nestjs/mongoose";
import {Model, Types} from "mongoose";
import {UserQuery} from "@back-end/domain/shared/query";
import {QueryHelper} from "@back-end/application/utilities";

@Injectable()
export class UserMongoDBRepository implements UserRepository {
  constructor(@InjectModel("Users") private readonly userModel: Model<User>) {
  }

  async getUserList(query: UserQuery): Promise<UserList> {
    const filter = QueryHelper.getUserFilter(query);
    const options = QueryHelper.getOptions(query);
    const count = await this.userModel.countDocuments(filter).exec()
      .then((count) => {
        if (count) {
          return count;
        } else {
          throw NotFoundException;
        }
      })
    const userList = await this.userModel.find(
      filter,
      null,
      options
    ).exec();
    return {
      users: userList,
      page: query.page ? +query.page : 0,
      total: count
    }
  }

  getUser(id: string): Promise<User> {
    return this.userModel.findById(new Types.ObjectId(id)).exec()
      .then(user => {
        if (user) {
          return user;
        } else {
          throw NotFoundException;
        }
      });
  }

  getUserByPhone(phone: string): Promise<User> {
    return this.userModel.findOne({phone: phone}).exec()
      .then(user => {
        if (user) {
          return user;
        } else {
          throw NotFoundException;
        }
      });
  }

  updateUser(id: string, user: User): Promise<string> {
    return this.userModel.findByIdAndUpdate(new Types.ObjectId(id), user).exec()
      .then((user) => {
        if (user) {
          return user._id.toString();
        } else {
          throw NotFoundException;
        }
      });
  }

  async deleteUser(id: string): Promise<string> {
    return this.userModel.findById(new Types.ObjectId(id)).exec()
      .then((user) => {
        if (user) {
          user["deleteAt"] = new Date();
          return user.save()
            .then((user) => user.id);
        } else {
          throw NotFoundException;
        }
      });
  }
}

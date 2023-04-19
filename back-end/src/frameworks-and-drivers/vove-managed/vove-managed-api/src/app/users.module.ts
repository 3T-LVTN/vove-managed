import {Module} from "@nestjs/common";
import {MongooseModule} from "@nestjs/mongoose";
import {UserControllers} from "@back-end/interface-adapters/controllers/user";
import {UserSchema} from "@back-end/frameworks-and-drivers/mongodb/user";

@Module({
  imports: [MongooseModule.forFeature([{name: "Users", schema: UserSchema}])],
  controllers: [UserControllers],
})
export class UsersModule {}

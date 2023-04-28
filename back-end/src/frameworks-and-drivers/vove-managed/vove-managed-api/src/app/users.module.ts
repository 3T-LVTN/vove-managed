import {Module} from "@nestjs/common";
import {MongooseModule} from "@nestjs/mongoose";
import {UserControllers} from "@back-end/interface-adapters/controllers/user";
import {UserInteractors} from "@back-end/application/interactors/user";
import {UserMongoDBRepository, UserSchema} from "@back-end/frameworks-and-drivers/mongodb/user";

@Module({
  imports: [MongooseModule.forFeature([{name: "Users", schema: UserSchema}])],
  controllers: [UserControllers],
  providers: [
    {
      provide: "UserInteractors",
      useClass: UserInteractors
    },
    {
      provide: "UserMongoDBRepository",
      useClass: UserMongoDBRepository
    }
  ],
})
export class UsersModule {}

import {Module} from "@nestjs/common";
import {MongooseModule} from "@nestjs/mongoose";
import {InquiryMongoDBRepository, InquirySchema} from "@back-end/frameworks-and-drivers/mongodb/inquiry";
import {InquiryInteractors} from "@back-end/application/interactors/inquiry";
import {InquiryControllers} from "@back-end/interface-adapters/controllers/inquiry";
import {UserMongoDBRepository, UserSchema} from "@back-end/frameworks-and-drivers/mongodb/user";

@Module({
  imports: [MongooseModule.forFeature([{name: "Inquiry", schema: InquirySchema}]),
  MongooseModule.forFeature([{name: "Users", schema: UserSchema}])],
  controllers: [InquiryControllers],
  providers: [
    {
      provide: "InquiryInteractors",
      useClass: InquiryInteractors
    },
    {
      provide: "InquiryMongoDBRepository",
      useClass: InquiryMongoDBRepository
    },
    {
      provide: "UserMongoDBRepository",
      useClass: UserMongoDBRepository
    }
  ],
})
export class InquiryModule {}

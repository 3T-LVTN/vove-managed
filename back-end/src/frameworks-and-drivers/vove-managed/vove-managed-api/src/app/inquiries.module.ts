import {Module} from "@nestjs/common";
import {MongooseModule} from "@nestjs/mongoose";
import {InquiryMongoDBRepository, InquirySchema} from "@back-end/frameworks-and-drivers/mongodb/inquiry";
import {InquiryInteractors} from "@back-end/application/interactors/inquiry";
import {InquiryControllers} from "@back-end/interface-adapters/controllers/inquiry";

@Module({
  imports: [MongooseModule.forFeature([{name: "Inquiry", schema: InquirySchema}])],
  controllers: [InquiryControllers],
  providers: [
    {
      provide: "InquiryInteractors",
      useClass: InquiryInteractors
    },
    {
      provide: "InquiryMongoDBRepository",
      useClass: InquiryMongoDBRepository
    }
  ],
})
export class InquiryModule {}

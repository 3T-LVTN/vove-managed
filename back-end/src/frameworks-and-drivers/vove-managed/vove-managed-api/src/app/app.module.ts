import {Module} from '@nestjs/common';
import {MongooseModule} from "@nestjs/mongoose";
import * as process from "process";
import {UsersModule} from "./users.module";

@Module({
  imports: [MongooseModule.forRoot(process.env["NX_MONGO_CONNECTION_STRING"]),
  UsersModule],
})
export class AppModule {
}

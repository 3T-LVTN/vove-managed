import {Module} from '@nestjs/common';
import {MongooseModule} from "@nestjs/mongoose";
import * as process from "process";
import {UsersModule} from "./users.module";
import {AuthGuard} from "@back-end/frameworks-and-drivers/auth-guard";

@Module({
  imports: [MongooseModule.forRoot(process.env["NX_MONGO_CONNECTION_STRING"]),
  UsersModule],
  providers: [
    AuthGuard,
  ],
})
export class AppModule {
}

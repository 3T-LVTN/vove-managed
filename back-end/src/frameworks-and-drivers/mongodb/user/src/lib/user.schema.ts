import {Schema} from "mongoose";
import {User} from "@back-end/domain/entities/user";

export const UserSchema = new Schema<User>({
  _id: Schema.Types.ObjectId,
  email: {type: String, required: true},
  name: {type: String, required: true},
  phoneNumber: String,
  address: String,
  photoUrl: String,
  deleteAt: Date,
});

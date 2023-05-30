import {Schema} from "mongoose";
import {Comment, Inquiry} from "@back-end/domain/entities/inquiry";

export const InquirySchema = new Schema<Inquiry>({
  title: {type: String, required: true},
  time: {type: Date, required: true},
  userId: {type: Schema.Types.ObjectId, ref: "User", required: true},
  userName: {type: String, required: true},
  content: {type: String, required: true},
  reply: {type: [Comment]},
  status: String,
},{
  versionKey: false
});

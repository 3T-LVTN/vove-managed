import {Schema} from "mongoose";
import {Comment, Inquiry} from "@back-end/domain/entities/inquiry";

export const InquirySchema = new Schema<Inquiry>({
  _id: Schema.Types.ObjectId,
  author: {type: String, required: true},
  status: {type: Number, required: true},
  title: {type: String, required: true},
  time: Date,
  message: String,
  comments: {type: [Comment]},
});

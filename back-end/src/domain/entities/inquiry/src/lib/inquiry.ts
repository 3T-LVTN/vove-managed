import {Types} from "mongoose";

export interface Inquiry {
  _id?: Types.ObjectId;
  title: string;
  time: Date;
  userId: Types.ObjectId;
  userName: string;
  content: string;
  reply?: Comment[];
  status: string;
}

export interface Comment {
  isUser: boolean;
  time: Date;
  content: string;
}

export interface InquiryList {
  inquiries: Inquiry[];
  page: number;
  total: number;
}

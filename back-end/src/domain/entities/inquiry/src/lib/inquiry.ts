import {Types} from "mongoose";

export enum Status {
  WAITING = 0,
  OPENING = 1,
  CLOSED = 2,
}

export interface Inquiry {
  _id?: Types.ObjectId;
  author: string;
  status: Status;
  title: string;
  time: Date;
  message: string;
  comments?: Comment[];
}

export interface Comment {
  isAdmin: boolean;
  message: string;
  time: Date;
}

export interface InquiryList {
  inquiries: Inquiry[];
  page: number;
  total: number;
}

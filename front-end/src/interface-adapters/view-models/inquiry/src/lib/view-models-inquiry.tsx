import {Status, CommentEntity} from "@front-end/domain/entities/inquiry";

export interface InquiryViewModel {
  id: string;
  message: string;
  phone: string;
  time: string;
  author: string;
  address?: string;
  title: string;
  status: Status;
  comments?: CommentEntity[];
}

import {Status} from "@back-end/domain/entities/inquiry";

export interface InquiryDTO {
  id?: string;
  author?: string;
  phone: string;
  address?: string;
  status: Status;
  title: string;
  time: string;
  message: string;
  comments?: CommentDTO[];
}

export interface CommentDTO {
  isAdmin: boolean;
  message: string;
  time: string;
}

export interface InquiryListDTO {
  inquiries: InquiryDTO[];
  page: number;
  total: number;
}

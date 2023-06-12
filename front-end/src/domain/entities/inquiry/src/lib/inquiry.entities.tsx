export interface InquiryEntity {
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

export enum Status {
  WAITING = 0,
  OPENING = 1,
  CLOSED = 2,
}

export interface CommentEntity {
  isAdmin?: boolean;
  message: string;
  time?: string;
}

export interface InquiryList {
  inquiries: InquiryEntity[];
  page: number;
  total: number;
}

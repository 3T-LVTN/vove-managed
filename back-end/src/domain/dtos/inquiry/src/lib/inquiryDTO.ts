export interface InquiryDTO {
  id?: string;
  title: string;
  time?: Date;
  userId: string;
  userName: string;
  content: string;
  reply?: CommentDTO[];
  status?: string;
}

export interface CommentDTO {
  isUser: boolean;
  time: Date;
  content: string;
}

export interface InquiryListDTO {
  inquiries: InquiryDTO[];
  page: number;
  total: number;
}

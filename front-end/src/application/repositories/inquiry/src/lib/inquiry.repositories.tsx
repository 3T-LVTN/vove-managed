import {CommentEntity, InquiryEntity, Status} from "@front-end/domain/entities/inquiry";

export interface InquiryRepository {
  getInquiryListByUser(userId: string): Promise<InquiryEntity[]>;
  getInquiries(): Promise<InquiryEntity[]>;
  getInquiryById(inquiryId: string): Promise<InquiryEntity>;
  changeStatus(inquiryId: string, status: Status): Promise<string>;
  postComment(inquiryId: string, comment: CommentEntity): Promise<string>;
}

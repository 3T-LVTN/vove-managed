import {InquiryQuery} from "@back-end/domain/shared/query";
import {Inquiry, InquiryList} from "@back-end/domain/entities/inquiry";

export interface InquiryRepository {
  getInquiryList(query: InquiryQuery): Promise<InquiryList>;
  getInquiry(id: string): Promise<Inquiry>;
  createInquiry(inquiry: Inquiry): Promise<string>;
  updateInquiry(id: string, user: Inquiry): Promise<string>;
  addComment(id: string, comment: string, isUser: boolean): Promise<string>;
}

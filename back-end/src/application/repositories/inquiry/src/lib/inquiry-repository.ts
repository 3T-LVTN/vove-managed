import {InquiryQuery, Query} from "@back-end/domain/shared/query";
import {Inquiry, InquiryList} from "@back-end/domain/entities/inquiry";

export interface InquiryRepository {
  getInquiryList(query: InquiryQuery): Promise<InquiryList>;
  getUserInquiryList(id: string, query: Query): Promise<InquiryList>;
  getInquiry(id: string): Promise<Inquiry>;
  createInquiry(inquiry: Inquiry): Promise<string>;
  updateInquiry(id: string, status: string): Promise<string>;
  addComment(id: string, comment: string, isAdmin: boolean): Promise<string>;
}

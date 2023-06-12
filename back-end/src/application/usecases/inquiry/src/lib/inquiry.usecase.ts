import {InquiryQuery, Query} from "@back-end/domain/shared/query";
import {InquiryDTO, InquiryListDTO} from "@back-end/domain/dtos/inquiry";

export interface InquiryUseCase {
  getInquiryList(query: InquiryQuery): Promise<InquiryListDTO>;
  getInquiry(id: string): Promise<InquiryDTO>;
  getUserInquiryList(id: string, query: Query): Promise<InquiryListDTO>;
  createInquiry(inquiry: InquiryDTO): Promise<string>;
  updateInquiry(id: string, status: string): Promise<string>;
  addComment(id: string, comment: string, isAdmin: boolean): Promise<string>;
}

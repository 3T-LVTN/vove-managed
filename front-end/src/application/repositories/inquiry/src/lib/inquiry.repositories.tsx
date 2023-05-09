import {InquiryEntity} from "@front-end/domain/entities/inquiry";

export interface InquiryRepository {
  getInquiryListByUser(userId: string): Promise<InquiryEntity[]>;
}

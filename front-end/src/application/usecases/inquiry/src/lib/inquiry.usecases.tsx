import {InquiryEntity} from "@front-end/domain/entities/inquiry";

export interface InquiryUsecases {
  getInquiryListByUser(userId: string): Promise<InquiryEntity[]>;
}

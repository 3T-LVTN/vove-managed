import {InquiryUsecases} from "@front-end/application/usecases/inquiry";
import {CommentEntity, InquiryEntity, Status} from "@front-end/domain/entities/inquiry";
import {InquiryRepository} from "@front-end/application/repositories/inquiry";

export class InquiryInteractors implements InquiryUsecases {
  constructor(private readonly inquiryRepository: InquiryRepository) {
  }

  async getInquiryListByUser(userId: string): Promise<InquiryEntity[]> {
    return this.inquiryRepository.getInquiryListByUser(userId)
      .then((inquiries) => inquiries)
      .catch((error) => {
        throw new Error(error)
      });
  }

  async getInquiries(): Promise<InquiryEntity[]> {
    return this.inquiryRepository.getInquiries()
      .then((inquiries) => inquiries)
      .catch((error) => {
        throw new Error(error)
      });
  }

  async getInquiryById(inquiryId: string): Promise<InquiryEntity> {
    return this.inquiryRepository.getInquiryById(inquiryId)
      .then((inquiry) => inquiry)
      .catch((error) => {
        throw new Error(error)
      });
  }

  async changeStatus(inquiryId: string, status: Status): Promise<string> {
    return this.inquiryRepository.changeStatus(inquiryId, status)
      .then((result) => result)
      .catch((error) => {
        throw new Error(error)
      });
  }

  async postComment(inquiryId: string, comment: CommentEntity): Promise<string> {
    return this.inquiryRepository.postComment(inquiryId, comment)
      .then((result) => result)
      .catch((error) => {
        throw new Error(error)
      });
  }
}

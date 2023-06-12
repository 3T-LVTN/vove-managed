import {InquiryUsecases} from "@front-end/application/usecases/inquiry";
import {InquiryViewModel} from "@front-end/interface-adapters/view-models/inquiry";
import {CommentEntity} from "@front-end/domain/entities/inquiry";

export class InquiryControllers {
  constructor(private readonly inquiryUseCase: InquiryUsecases) {
  }

  async getInquiryListByUser(userId: string): Promise<InquiryViewModel[]> {
    return await this.inquiryUseCase.getInquiryListByUser(userId)
      .then((inquiries) => inquiries as InquiryViewModel[])
      .catch((error) => {
        throw new Error(error)
      });
  }

  async getInquiries(): Promise<InquiryViewModel[]> {
    return await this.inquiryUseCase.getInquiries()
      .then((inquiries) => inquiries as InquiryViewModel[])
      .catch((error) => {
        throw new Error(error)
      });
  }

  async getInquiryById(inquiryId: string): Promise<InquiryViewModel> {
    return await this.inquiryUseCase.getInquiryById(inquiryId)
      .then((inquiry) => inquiry as InquiryViewModel)
      .catch((error) => {
        throw new Error(error)
      });
  }

  async changeStatus(inquiryId: string, status: number): Promise<string> {
    return await this.inquiryUseCase.changeStatus(inquiryId, status)
      .then((result) => result)
      .catch((error) => {
        throw new Error(error)
      });
  }

  async postComment(inquiryId: string, comment: CommentEntity): Promise<string> {
    return await this.inquiryUseCase.postComment(inquiryId, comment)
      .then((result) => result)
      .catch((error) => {
        throw new Error(error)
      });
  }
}

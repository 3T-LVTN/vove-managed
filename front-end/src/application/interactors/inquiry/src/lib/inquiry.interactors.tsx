import {InquiryUsecases} from "@front-end/application/usecases/inquiry";
import {InquiryEntity} from "@front-end/domain/entities/inquiry";
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
}

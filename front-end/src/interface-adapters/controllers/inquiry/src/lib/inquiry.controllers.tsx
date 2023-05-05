import {InquiryUsecases} from "@front-end/application/usecases/inquiry";
import {InquiryViewModel} from "@front-end/interface-adapters/view-models/inquiry";

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
}

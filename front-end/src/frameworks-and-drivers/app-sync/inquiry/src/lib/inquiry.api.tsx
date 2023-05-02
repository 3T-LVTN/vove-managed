import {InquiryRepository} from "@front-end/application/repositories/inquiry";
import {axios} from "@front-end/frameworks-and-drivers/app-sync/axios";
import {InquiryEntity} from "@front-end/domain/entities/inquiry";

export class InquiryApi implements InquiryRepository {
  async getInquiryListByUser(userId: string): Promise<InquiryEntity[]> {
    return axios.get<InquiryEntity[]>(`inquiry/users/` + userId)
      .then<InquiryEntity[]>((response) => response.data)
      .catch((error) => {throw new Error(error)});
  }
}

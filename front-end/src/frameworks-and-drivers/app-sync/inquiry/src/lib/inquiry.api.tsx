import {InquiryRepository} from "@front-end/application/repositories/inquiry";
import {axios} from "@front-end/frameworks-and-drivers/app-sync/axios";
import {CommentEntity, InquiryEntity, Status} from "@front-end/domain/entities/inquiry";

export class InquiryApi implements InquiryRepository {
  async getInquiryListByUser(userId: string): Promise<InquiryEntity[]> {
    console.log(userId);
    return axios.get(`inquiries/users/${userId}`)
      .then<InquiryEntity[]>((response) => response.data.inquiries)
      .catch((error) => {throw new Error(error)});
  }

  async getInquiries(): Promise<InquiryEntity[]> {
    return axios.get(`inquiries`)
      .then<InquiryEntity[]>((response) => response.data.inquiries)
      .catch((error) => {throw new Error(error)});
  }

  async getInquiryById(inquiryId: string): Promise<InquiryEntity> {
    return axios.get(`inquiries/${inquiryId}`)
      .then<InquiryEntity>((response) => response.data)
      .catch((error) => {throw new Error(error)});
  }

  async changeStatus(inquiryId: string, status: Status): Promise<string> {
    return axios.put(`inquiries/${inquiryId}`, {status})
      .then<string>((response) => response.data.inquiryId)
      .catch((error) => {throw new Error(error)});
  }

  async postComment(inquiryId: string, comment: CommentEntity): Promise<string> {
    return axios.post(`inquiries/${inquiryId}/comment`, comment)
      .then<string>((response) => response.data.inquiryId)
      .catch((error) => {throw new Error(error)});
  }
}

import {InquiryUseCase} from "@back-end/application/usecases/inquiry";
import {Inject, Injectable} from "@nestjs/common";
import {InquiryRepository} from "@back-end/application/repositories/inquiry";
import {InquiryQuery, Query} from "@back-end/domain/shared/query";
import {InquiryDTO, InquiryListDTO} from "@back-end/domain/dtos/inquiry";
import {InquiryMapper} from "@back-end/application/utilities";
import {UserRepository} from "@back-end/application/repositories/user";

@Injectable()
export class InquiryInteractors implements InquiryUseCase {
  constructor(
    @Inject("InquiryMongoDBRepository")
    private inquiryRepository: InquiryRepository,
    @Inject("UserMongoDBRepository")
    private userRepository: UserRepository,) {
  }

  async getInquiryList(query: InquiryQuery): Promise<InquiryListDTO> {
    const inquiries = await this.inquiryRepository.getInquiryList(query);
    const inquiryListDTO = InquiryMapper.toDTOList(inquiries);
    const inquiriesWithAuthor = inquiryListDTO.inquiries.map(inquiry => {
      return this.userRepository.getUserByPhone(inquiry.phone)
        .then(user => {
          inquiry.author = user.name;
          return inquiry;
        })
    })
    inquiryListDTO.inquiries = await Promise.all(inquiriesWithAuthor);
    return inquiryListDTO;
  }

  async getUserInquiryList(id: string, query: Query): Promise<InquiryListDTO> {
    const user = await this.userRepository.getUser(id);
    if (!user) {
      throw new Error("User not found");
    } else {
      return this.inquiryRepository.getUserInquiryList(user.phone ?? "", query)
        .then((inquiries) => {
          return InquiryMapper.toDTOList(inquiries)
        });
    }
  }

  async getInquiry(id: string): Promise<InquiryDTO> {
    const inquiry = await this.inquiryRepository.getInquiry(id);
    const inquiryDTO = InquiryMapper.toDTO(inquiry);
    const user = await this.userRepository.getUserByPhone(inquiryDTO.phone);
    inquiryDTO.author = user.name;
    inquiryDTO.address = user.addressName;
    console.log(inquiryDTO);
    return inquiryDTO;
  }

  createInquiry(inquiry: InquiryDTO): Promise<string> {
    return this.inquiryRepository.createInquiry(InquiryMapper.toEntity(inquiry));
  }

  updateInquiry(id: string, status: string): Promise<string> {
    return this.inquiryRepository.updateInquiry(id, status);
  }

  addComment(id: string, comment: string, isUser: boolean): Promise<string> {
    return this.inquiryRepository.addComment(id, comment, isUser);
  }
}

import {InquiryUseCase} from "@back-end/application/usecases/inquiry";
import {Inject, Injectable} from "@nestjs/common";
import {InquiryRepository} from "@back-end/application/repositories/inquiry";
import {InquiryQuery, Query} from "@back-end/domain/shared/query";
import {InquiryDTO, InquiryListDTO} from "@back-end/domain/dtos/inquiry";
import {InquiryMapper} from "@back-end/application/utilities";

@Injectable()
export class InquiryInteractors implements InquiryUseCase {
  constructor(
    @Inject("InquiryMongoDBRepository")
    private inquiryRepository: InquiryRepository) {
  }

  getInquiryList(query: InquiryQuery): Promise<InquiryListDTO> {
    return this.inquiryRepository.getInquiryList(query)
      .then((inquiries) => {
        return InquiryMapper.toDTOList(inquiries)
      });
  }

  getUserInquiryList(id: string, query: Query): Promise<InquiryListDTO> {
    return this.inquiryRepository.getUserInquiryList(id, query)
      .then((inquiries) => {
        return InquiryMapper.toDTOList(inquiries)
      });
  }

  getInquiry(id: string): Promise<InquiryDTO> {
    return this.inquiryRepository.getInquiry(id)
      .then((inquiry) => Promise.resolve(InquiryMapper.toDTO(inquiry)));
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

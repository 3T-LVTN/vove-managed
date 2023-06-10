import {Inquiry, Comment, InquiryList} from "@back-end/domain/entities/inquiry";
import {CommentDTO, InquiryDTO, InquiryListDTO} from "@back-end/domain/dtos/inquiry";

export class InquiryMapper {
  static toDTO(inquiry: Inquiry): InquiryDTO {
    const comments: CommentDTO[] = inquiry.comments ? inquiry.comments.map(comment => {
        return {
          isAdmin: comment.isAdmin,
          message: comment.message,
          time: comment.time
        };
      })
      : [];
    return {
      id: inquiry._id?.toString(),
      phone: inquiry.author,
      status: inquiry.status,
      title: inquiry.title,
      time: inquiry.time,
      message: inquiry.message,
      comments: comments,
    };
  }

  static toEntity(inquiryDTO: InquiryDTO): Inquiry {
    const comments: Comment[] = inquiryDTO.comments?.map(comment => {
      return {
        isAdmin: comment.isAdmin,
        message: comment.message,
        time: comment.time
      };
    }) || [];
    const inquiry: Inquiry = {
      author: inquiryDTO.phone,
      status: inquiryDTO.status,
      title: inquiryDTO.title,
      time: inquiryDTO.time || new Date(),
      message: inquiryDTO.message,
      comments: inquiryDTO.comments,
    };
    if (comments.length > 0) {
      inquiry.comments = comments;
    }
    return inquiry;
  }

  static toDTOList(inquiryList: InquiryList): InquiryListDTO {
    return {
      inquiries: inquiryList.inquiries.map(inquiry => InquiryMapper.toDTO(inquiry)),
      page: inquiryList.page,
      total: inquiryList.total
    };
  }
}

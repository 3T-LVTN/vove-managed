import {Inquiry, Comment, InquiryList} from "@back-end/domain/entities/inquiry";
import {CommentDTO, InquiryDTO, InquiryListDTO} from "@back-end/domain/dtos/inquiry";
import {Types} from "mongoose";

export class InquiryMapper {
  static toDTO(inquiry: Inquiry): InquiryDTO {
    const comments: CommentDTO[] = inquiry.reply ? inquiry.reply.map(comment => {
        return {
          time: comment.time,
          content: comment.content,
          isUser: comment.isUser
        };
      })
      : [];
    return {
      id: inquiry._id?.toString(),
      title: inquiry.title,
      time: inquiry.time,
      userId: inquiry.userId.toString(),
      userName: inquiry.userName,
      content: inquiry.content,
      reply: comments,
      status: inquiry.status
    };
  }

  static toEntity(inquiryDTO: InquiryDTO): Inquiry {
    const comments: Comment[] = inquiryDTO.reply?.map(comment => {
        return {
          time: comment.time,
          content: comment.content,
          isUser: comment.isUser
        };
      }) || [];
    const inquiry: Inquiry = {
      title: inquiryDTO.title,
      time: inquiryDTO.time || new Date(),
      userId: new Types.ObjectId(inquiryDTO.userId),
      userName: inquiryDTO.userName,
      content: inquiryDTO.content,
      status: inquiryDTO.status || "pending"
    };
    if (comments.length > 0) {
      inquiry.reply = comments;
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

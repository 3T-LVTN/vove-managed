import {Body, Controller, Get, Inject, Query, Param, Put, Post} from "@nestjs/common";
import {InquiryUseCase} from "@back-end/application/usecases/inquiry";
import {InquiryQuery} from "@back-end/domain/shared/query";
import {InquiryDTO} from "@back-end/domain/dtos/inquiry";
import {Roles} from "@back-end/application/utilities";

@Controller("inquiries")
export class InquiryControllers {
  constructor(
    @Inject("InquiryInteractors")
    private readonly inquiryUseCase: InquiryUseCase
  ) {
  }

  @Get()
  @Roles("admin")
  async getInquiryList(@Query() query: InquiryQuery) {
    return this.inquiryUseCase.getInquiryList(query);
  }

  @Get(":id")
  @Roles("admin", "user")
  async getInquiry(@Param("id") id: string) {
    return this.inquiryUseCase.getInquiry(id);
  }

  @Post()
  @Roles("admin", "user")
  async createInquiry(@Param("id") id: string, @Body() inquiry: InquiryDTO) {
    const createdInquiryId = await this.inquiryUseCase.createInquiry(inquiry);
    return {
      inquiryId: createdInquiryId
    };
  }

  @Put(":id")
  @Roles("admin", "user")
  async updateInquiry(@Param("id") id: string, @Body() req: { status: string }) {
    const updatedInquiryId = await this.inquiryUseCase.updateInquiry(id, req.status);
    return {
      inquiryId: updatedInquiryId
    };
  }

  @Post(":id/comment")
  @Roles("admin", "user")
  async addComment(@Param("id") id: string, @Body() {comment, isUser}: { comment: string, isUser: boolean }) {
    const updatedInquiryId = await this.inquiryUseCase.addComment(id, comment, isUser);
    return {
      inquiryId: updatedInquiryId
    };
  }
}

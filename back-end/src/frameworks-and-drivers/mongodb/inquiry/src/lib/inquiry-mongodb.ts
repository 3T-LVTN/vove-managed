import {Injectable, NotFoundException} from "@nestjs/common";
import {InjectModel} from "@nestjs/mongoose";
import {Model, Types} from "mongoose";
import {InquiryRepository} from "@back-end/application/repositories/inquiry";
import {Inquiry, InquiryList} from "@back-end/domain/entities/inquiry";
import {InquiryQuery} from "@back-end/domain/shared/query";
import {QueryHelper} from "@back-end/application/utilities";

@Injectable()
export class InquiryMongoDBRepository implements InquiryRepository {
  constructor(@InjectModel("Inquiry") private readonly inquiryModel: Model<Inquiry>) {
  }

  async getInquiryList(query: InquiryQuery): Promise<InquiryList> {
    const filter = QueryHelper.getInquiryFilter(query);
    const options = QueryHelper.getOptions(query);
    const count = await this.inquiryModel.count(filter).exec()
      .then((count) => {
          if (count) {
            return count;
          } else {
            throw NotFoundException;
          }
        }
      );

    const inquiryList = await this.inquiryModel.find(
      filter,
      null,
      options
    ).exec();
    return {
      inquiries: inquiryList,
      page: query.page ? +query.page : 0,
      total: count
    }
  }

  async getInquiry(id: string): Promise<Inquiry> {
    const objectId = new Types.ObjectId(id);
    return this.inquiryModel.findById(objectId).exec()
      .then(inquiry => {
          if (inquiry) {
            return inquiry;
          } else {
            throw NotFoundException;
          }
        }
      );
  }

  async createInquiry(inquiry: Inquiry): Promise<string> {
    return this.inquiryModel.create(inquiry)
      .then((inquiry) => inquiry._id.toString());
  }

  async updateInquiry(id: string, status: string): Promise<string> {
    const objectId = new Types.ObjectId(id);
    return this.inquiryModel.findByIdAndUpdate(objectId, {status}).exec()
      .then((inquiry) => {
          if (inquiry) {
            return inquiry._id.toString();
          } else {
            throw NotFoundException;
          }
        }
      );
  }

  async addComment(id: string, comment: string, isUser: boolean): Promise<string> {
    const objectId = new Types.ObjectId(id);
    return this.inquiryModel.findById(objectId).exec()
      .then((inquiry) => {
        if (inquiry) {
          inquiry["reply"]?.push({
            isUser: isUser,
            time: new Date(),
            content: comment
          });
          inquiry.save();
          return inquiry._id.toString();
        } else {
          throw NotFoundException;
        }
      });
  }
}

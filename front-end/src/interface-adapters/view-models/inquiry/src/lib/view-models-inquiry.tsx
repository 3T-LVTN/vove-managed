import {Status} from "@front-end/domain/entities/inquiry";

export interface InquiryViewModel {
  id: string;
  message?: string;
  phone?: string;
  time: string;
  author?: string;
  addressName?: string;
  title: string;
  status: Status;
}

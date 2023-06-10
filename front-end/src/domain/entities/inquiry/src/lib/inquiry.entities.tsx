export interface InquiryEntity {
  id: string;
  message?: string;
  phone?: string;
  time: string;
  author?: string;
  addressName?: string;
  title: string;
  status: Status;
}

export enum Status {
  WAITING = 0,
  OPENING = 1,
  CLOSED = 2,
}

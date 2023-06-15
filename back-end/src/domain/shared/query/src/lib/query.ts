export interface Query {
  search?: string;
  sortBy?: string;
  orderBy?: string;
  page?: number;
  limit?: number;
}

export interface UserQuery extends Query {
  id?: string;
  phone?: string;
  name?: string;
  addressName?: string;
}

export interface InquiryQuery extends Query {
  id?: string;
  title?: string;
  author?: string;
}

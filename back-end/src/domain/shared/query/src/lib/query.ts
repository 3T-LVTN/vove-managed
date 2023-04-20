export interface Query {
  search?: string;
  sortBy?: string;
  orderBy?: string;
  page?: number;
  limit?: number;
}

export interface UserFilter {
  _id?: number;
  name?: string;
  email?: string;
  phoneNumber?: string;
  address?: string;
}

export interface UserQuery extends Query, UserFilter {
}

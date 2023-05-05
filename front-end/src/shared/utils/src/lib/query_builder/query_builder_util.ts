export interface Query {
  search?: string;
  sortBy?: string;
  orderBy?: string;
  filter?: object;
  page?: number;
  limit?: number;
}

export interface UserFilter {
  id?: string;
  name?: string;
  email?: string;
  phoneNumber?: string;
  address?: string;

  [key: string]: string | undefined;
}

export class UserFilterBuild {
  static build = (filter: UserFilter): string => {
    return (filter.id ? `&id=${filter.id}` : "") +
      (filter.name ? `&name=${filter.name}` : "") +
      (filter.email ? `&email=${filter.email}` : "") +
      (filter.phoneNumber ? `&phone=${filter.phoneNumber}` : "") +
      (filter.address ? `&address=${filter.address}` : "");
  }
}

export class QueryBuilderUtil {
  pagingParams = (query: Query): string =>
    `?page=` + (query.page ? `${query.page}` : `0`)
    + `&limit=` + (query.limit ? `${query.limit}` : `10`);

  searchParams = (query: Query): string =>
    query.search ? `&search=${query.search}` : "";

  filterParams = (query: Query): string => {
    const filter = query.filter as UserFilter;
    return filter ? UserFilterBuild.build(filter) : "";
  }

  sortParams = (query: Query): string => {
    if (!query.sortBy) return "";
    return `&sortBy=${query.sortBy}&orderBy=${query.orderBy}`;
  }

  build = (query: Query): string =>
    this.pagingParams(query) + this.searchParams(query) + this.filterParams(query) + this.sortParams(query);
}

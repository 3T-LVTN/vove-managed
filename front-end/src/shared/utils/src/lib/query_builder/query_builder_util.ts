export interface Query {
  search?: string;
  sortBy?: string;
  orderBy?: string;
  filter?: Filter;
  page?: number;
  limit?: number;
}

export interface Filter {
  build(): string;
}

export class UserFilter implements Filter {
  id?: string;
  name?: string;
  email?: string;
  phoneNumber?: string;
  address?: string;

  build = (): string => {
    return (this.id ? `&id=${this.id}` : "") +
      (this.name ? `&name=${this.name}` : "") +
      (this.email ? `&email=${this.email}` : "") +
      (this.phoneNumber ? `&phone=${this.phoneNumber}` : "") +
      (this.address ? `&address=${this.address}` : "");
  };
}

export class QueryBuilderUtil {
  pagingParams = (query: Query): string =>
    `?_page=` + (query.page ? `${query.page}` : `1`)
    + `&_limit=` + (query.limit ? `${query.limit}` : `10`);

  searchParams = (query: Query): string =>
    query.search ? `&q=${query.search}` : "";

  filterParams = (query: Query): string =>
    query.filter ? query.filter.build() : "";

  build = (query: Query): string =>
    this.pagingParams(query) + this.searchParams(query) + this.filterParams(query);
}

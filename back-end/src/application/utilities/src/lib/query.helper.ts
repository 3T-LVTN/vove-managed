import {Query, UserFilter} from "@back-end/domain/shared/query";

export class QueryHelper {
  static getOptions(query: Query) {
    const result: { [key: string]: string | number | object} = {};
    const order = (query.orderBy == "desc")? -1 : 1;
    result.sort = query.sortBy ? {[query.sortBy] : order} : {};
    result.limit = query.limit ?? 20;
    result.skip = (query.page ?? 0) * result.limit;
    return result;
  }

  static getUserFilter(userFilter: UserFilter) {
    const result: { [key: string]: RegExp | number} = {};
    if (userFilter._id) {
      result._id = userFilter._id;
    }
    if (userFilter.name) {
      result.name = new RegExp(userFilter.name, "ig");
    }
    if (userFilter.email) {
      result.email = new RegExp(userFilter.email, "ig");
    }
    if (userFilter.phoneNumber) {
      result.phoneNumber = new RegExp(userFilter.phoneNumber, "ig");
    }
    if (userFilter.address) {
      result.address = new RegExp(userFilter.address, "ig");
    }
    return result;
  }
}

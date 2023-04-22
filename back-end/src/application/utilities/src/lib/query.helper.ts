import {Query, UserQuery} from "@back-end/domain/shared/query";

export class QueryHelper {
  static getOptions(query: Query) {
    const result: { [key: string]: string | number | object} = {};
    const order = (query.orderBy == "desc")? -1 : 1;
    result.sort = query.sortBy ? {[query.sortBy] : order} : {};
    result.limit = query.limit ?? 20;
    result.skip = (query.page ?? 0) * result.limit;
    return result;
  }

  static getUserFilter(userQuery: UserQuery) {
    const result: { [key: string]: RegExp | number} = {};
    if(userQuery.search) {
      return {
        $or: [
          {_id: new RegExp(userQuery.search, "ig")},
          {name: new RegExp(userQuery.search, "ig")},
          {email: new RegExp(userQuery.search, "ig")},
          {phoneNumber: new RegExp(userQuery.search, "ig")},
          {address: new RegExp(userQuery.search, "ig")}
        ]
      }
    }
    if (userQuery._id) {
      result._id = new RegExp(userQuery._id, "ig");
    }
    if (userQuery.name) {
      result.name = new RegExp(userQuery.name, "ig");
    }
    if (userQuery.email) {
      result.email = new RegExp(userQuery.email, "ig");
    }
    if (userQuery.phoneNumber) {
      result.phoneNumber = new RegExp(userQuery.phoneNumber, "ig");
    }
    if (userQuery.address) {
      result.address = new RegExp(userQuery.address, "ig");
    }
    return result;
  }
}

import {InquiryQuery, Query, UserQuery} from "@back-end/domain/shared/query";

export class QueryHelper {
  static getOptions(query: Query) {
    const result: { [key: string]: string | number | object } = {};
    const order = (query.orderBy == "desc") ? -1 : 1;
    if (query.sortBy) {
      if (query.sortBy == "id")
        result.sort = {_id: order};
      else
        result.sort = {[query.sortBy]: order};
    }
    result.limit = query.limit ?? 20;
    result.skip = (query.page ?? 0) * result.limit;
    return result;
  }

  static getUserFilter(userQuery: UserQuery) {
    const search: { [key: string]: object } = {};
    if (userQuery.search) {
      search["$or"] = [
        {phone: new RegExp(userQuery.search, "ig")},
        {name: new RegExp(userQuery.search, "ig")},
        {addressName: new RegExp(userQuery.search, "ig")},
      ]
    }
    const result: { [key: string]: RegExp | number } = {};
    if (userQuery.phone) {
      result.phone = new RegExp(userQuery.phone, "ig");
    }
    if (userQuery.name) {
      result.name = new RegExp(userQuery.name, "ig");
    }
    if (userQuery.addressName) {
      result.addressName = new RegExp(userQuery.addressName, "ig");
    }
    return {
      $and: [
        search,
        result,
        {deleteAt: null}
      ]
    };
  }

  static getInquiryFilter(inquiryQuery: InquiryQuery) {
    const search: { [key: string]: object } = {};
    if (inquiryQuery.search) {
      search["$or"] = [
        {title: new RegExp(inquiryQuery.search, "ig")},
        {author: new RegExp(inquiryQuery.search, "ig")},
      ]
    }

    const result: { [key: string]: RegExp | number } = {};
    if (inquiryQuery.title) {
      result.title = new RegExp(inquiryQuery.title, "ig");
    }
    if (inquiryQuery.author) {
      result.author = new RegExp(inquiryQuery.author, "ig");
    }
    return {
      $and: [
        search,
        result
      ]
    }
  }
}

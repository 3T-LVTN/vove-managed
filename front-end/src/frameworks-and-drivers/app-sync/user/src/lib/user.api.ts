import {AppUserRepository} from "@front-end/application/repositories/app-user";
import {AppUser, AppUserList} from "@front-end/domain/entities/app-user";
import axios from "axios";
import {QueryBuilderUtil} from "@front-end/shared/utils";
import {Query} from "@front-end/shared/utils";

axios.defaults.baseURL = process.env["NX_API_URL"];

export class AppUserApi implements AppUserRepository {
  async getUserList(query: Query): Promise<AppUserList> {
    const queryBuilder = new QueryBuilderUtil();
    console.log(queryBuilder.build(query));
    return axios.get<AppUserList>(`users` + queryBuilder.build(query))
      .then<AppUserList>((response) => response.data)
      .catch((error) => {throw new Error(error)});
  }

  async getUser(id: string): Promise<AppUser> {
    return axios.get<AppUser>(`/users/${id}`)
      .then((response) => response.data);
  }

  async updateUser(user: AppUser): Promise<number> {
    return axios.put<number>(`/users/${user.id}`, user)
      .then((response) => response.data);
  }

  async deleteUser(id: string): Promise<void> {
    await axios.delete(`/users/${id}`);
  }
}

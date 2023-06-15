import {AppUserRepository} from "@front-end/application/repositories/app-user";
import {AppUser, AppUserDetail, AppUserList} from "@front-end/domain/entities/app-user";
import {axios} from "@front-end/frameworks-and-drivers/app-sync/axios";
import {QueryBuilderUtil} from "@front-end/shared/utils";
import {Query} from "@front-end/shared/utils";

export class AppUserApi implements AppUserRepository {
  async getUserList(query: Query): Promise<AppUserList> {
    const queryBuilder = new QueryBuilderUtil();
    return axios.get<AppUserList>(`users` + queryBuilder.build(query))
      .then<AppUserList>((response) => response.data)
      .catch((error) => {throw new Error(error)});
  }

  async getUser(id: string): Promise<AppUserDetail> {
    return axios.get<AppUserDetail>(`/users/${id}`)
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

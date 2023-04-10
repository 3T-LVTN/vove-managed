import {AppUserRepository} from "@front-end/application/repositories/app-user";
import {AppUser, AppUserList} from "@front-end/domain/entities/app-user";
import axios from "axios";

axios.defaults.baseURL = process.env["NX_API_URL"];

export class AppUserApi implements AppUserRepository {
  async getUserList(page: number, search: string, filter: AppUser): Promise<AppUserList> {
    const searchParams = search? `&q=${search}` : "";
    //TODO: change this when have a real API
    const filterParams =
      (filter.id? `&id=${filter.id}` : "") +
      (filter.name? `&name=${filter.name}` : "") +
      (filter.email? `&email=${filter.email}` : "") +
      (filter.phoneNumber? `&phone=${filter.phoneNumber}` : "") +
      (filter.address? `&address=${filter.address}` : "");
    return axios.get<AppUser[]>(`/users?_page=${page}&_limit=10`+ searchParams + filterParams)
      .then<AppUserList>((response) => {
        const users: AppUser[] = response.data as AppUser[];
        return {
          //TODO: change this when have a real API
          users: users,
          page: page,
          total: 20,
        } as AppUserList;
      })
      .catch((error) => {throw new Error(error)});
  }

  async getUser(id: string): Promise<AppUser> {
    return axios.get<AppUser>(`/users/${id}`)
      .then((response) => response.data);
  }

  async updateUser(user: AppUser): Promise<void> {
    await axios.put(`/users/${user.id}`, user)
      .then((response) => response.data);
  }

  async deleteUser(id: string): Promise<void> {
    await axios.delete(`/users/${id}`);
  }
}

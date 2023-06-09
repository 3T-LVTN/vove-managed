export interface AppUserListViewModel {
  users: AppUserViewModel[];
  page: number;
  total: number;
}

export interface AppUserViewModel {
  id: string;
  phone: string;
  name: string;
  avatar: string;
  addressName: string;
}

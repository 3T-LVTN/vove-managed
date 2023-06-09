export interface AppUser {
  id: string;
  phone: string;
  name: string;
  avatar: string;
  addressName: string;
}

export interface AppUserList {
  users: AppUser[];
  page: number;
  total: number;
}

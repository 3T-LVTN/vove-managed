export interface AppUser {
  id: string;
  email: string;
  name: string;
  phoneNumber: string;
  address: string;
}

export interface AppUserList {
  users: AppUser[];
  page: number;
  total: number;
}

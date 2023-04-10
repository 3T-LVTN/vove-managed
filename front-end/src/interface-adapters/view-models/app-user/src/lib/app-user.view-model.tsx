export interface AppUserListViewModel {
  users: AppUserViewModel[];
  page: number;
  total: number;
}

export interface AppUserViewModel {
  id: string;
  email: string;
  name: string;
  phoneNumber: string;
  address: string;
  photoUrl: string;
}

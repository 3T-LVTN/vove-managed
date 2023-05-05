export interface User {
  _id: string;
  email: string;
  name: string;
  phoneNumber?: string;
  address?: string;
  photoUrl?: string;
}

export interface UserList {
  users: User[];
  page: number;
  total: number;
}

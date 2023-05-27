export interface UserDTO {
  id: string;
  email: string;
  name: string;
  phoneNumber?: string;
  address?: string;
  photoUrl?: string;
  deleteAt?: Date;
}

export interface UserListDTO {
  users: UserDTO[];
  page: number;
  total: number;
}

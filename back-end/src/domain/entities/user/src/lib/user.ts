import { Types } from 'mongoose';

export interface User {
  _id?: Types.ObjectId;
  email: string;
  name: string;
  phoneNumber?: string;
  address?: string;
  photoUrl?: string;
  deleteAt?: Date;
}

export interface UserList {
  users: User[];
  page: number;
  total: number;
}

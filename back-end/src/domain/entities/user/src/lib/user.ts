import {Types} from 'mongoose';
import {LatLng} from "@back-end/domain/shared/location";

export interface User {
  _id?: Types.ObjectId;
  phone?: string;
  name: string;
  avatar?: string;
  password?: string;
  trackingPlaces?: TrackingPlace[];
  addressName?: string;
  deleteAt?: Date;
}

export interface TrackingPlace {
  id?: string;
  title: string;
  addressName: string;
  address: LatLng;
}

export interface UserList {
  users: User[];
  page: number;
  total: number;
}

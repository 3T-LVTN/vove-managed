import {LatLng} from "@back-end/domain/shared/location";

export interface UserDTO {
  id?: string;
  phone?: string;
  name: string;
  avatar?: string;
  trackingPlaces?: TrackingPlaceDTO[];
  address?: string;
  addressName?: string;
}

export interface TrackingPlaceDTO {
  id?: string;
  title: string;
  addressName: string;
  address: LatLng;
}

export interface UserListDTO {
  users: UserDTO[];
  page: number;
  total: number;
}

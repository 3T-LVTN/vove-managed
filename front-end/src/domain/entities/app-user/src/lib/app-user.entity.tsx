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

export interface AppUserDetail extends AppUser {
  trackingPlaces: TrackingPlace[];
}

export interface TrackingPlace {
  id: string;
  addressName: string;
  title: string;
  address: LatLng;
  status?: string;
}

export interface LatLng {
  lat: number;
  lng: number;
}

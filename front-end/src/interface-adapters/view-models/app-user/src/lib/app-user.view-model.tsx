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

export interface AppUserDetailViewModel extends AppUserViewModel {
  trackingPlaces: TrackingPlaceViewModel[];
}

export interface TrackingPlaceViewModel {
  id: string;
  addressName: string;
  title: string;
  address: LatLngViewModel;
}

export interface LatLngViewModel {
  lat: number;
  lng: number;
}

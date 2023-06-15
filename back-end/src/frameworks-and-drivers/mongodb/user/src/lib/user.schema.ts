import {Schema} from "mongoose";
import {User, TrackingPlace} from "@back-end/domain/entities/user";
import {LatLng} from "@back-end/domain/shared/location";

export const LatLngSchema = new Schema<LatLng>({
  lat: Number,
  lng: Number,
});

export const TrackingPlaceSchema = new Schema<TrackingPlace>({
  id: String,
  title: String,
  addressName: String,
  address: LatLngSchema,
});

export const UserSchema = new Schema<User>({
  _id: Schema.Types.ObjectId,
  phone: {type: String, required: true},
  name: {type: String, required: true},
  avatar: String,
  password: String,
  trackingPlaces: {type: [TrackingPlaceSchema]},
  addressName: String,
  deleteAt: Date,
});




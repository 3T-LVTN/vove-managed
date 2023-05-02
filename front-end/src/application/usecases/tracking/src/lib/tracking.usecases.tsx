import {TrackingEntity} from "@front-end/domain/entities/tracking";

export interface TrackingUsecases {
  getTrackingListByUser(userId: string): Promise<TrackingEntity[]>;
}

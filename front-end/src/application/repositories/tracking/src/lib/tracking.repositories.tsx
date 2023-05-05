import {TrackingEntity} from "@front-end/domain/entities/tracking";

export interface TrackingRepository {
  getTrackingListByUser(userId: string): Promise<TrackingEntity[]>;
}

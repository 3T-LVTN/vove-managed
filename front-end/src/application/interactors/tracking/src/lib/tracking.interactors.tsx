import {TrackingUsecases} from "@front-end/application/usecases/tracking";
import {TrackingRepository} from "@front-end/application/repositories/tracking";
import {TrackingEntity} from "@front-end/domain/entities/tracking";

export class TrackingInteractors implements TrackingUsecases {
  constructor(private readonly trackingRepository: TrackingRepository) {
  }

  async getTrackingListByUser(userId: string): Promise<TrackingEntity[]> {
    return this.trackingRepository.getTrackingListByUser(userId)
      .then((trackings) => trackings)
      .catch((error) => {
        throw new Error(error)
      });
  }
}

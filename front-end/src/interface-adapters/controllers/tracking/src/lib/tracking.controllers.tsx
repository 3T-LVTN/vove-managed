import {TrackingUsecases} from "@front-end/application/usecases/tracking";
import {TrackingViewModel} from "@front-end/interface-adapters/view-models/tracking";

export class TrackingControllers {
  constructor(private readonly trackingUsecases: TrackingUsecases) {
  }

  async getTrackingListByUser(userId: string): Promise<TrackingViewModel[]> {
    return await this.trackingUsecases.getTrackingListByUser(userId)
      .then((trackings) => trackings as TrackingViewModel[])
      .catch((error) => {
        throw new Error(error)
      });
  }
}

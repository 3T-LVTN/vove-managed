import {axios} from "@front-end/frameworks-and-drivers/app-sync/axios";
import {TrackingRepository} from "@front-end/application/repositories/tracking";
import {TrackingEntity} from "@front-end/domain/entities/tracking";

export class TrackingApi implements TrackingRepository {
  async getTrackingListByUser(userId: string): Promise<TrackingEntity[]> {
    return axios.get<TrackingEntity[]>(`inquiry/users/` + userId)
      .then<TrackingEntity[]>((response) => response.data)
      .catch((error) => {throw new Error(error)});
  }
}

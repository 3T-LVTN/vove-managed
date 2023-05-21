import {MapUsecases} from "@front-end/application/usecases/map";
import {MapRepository} from "@front-end/application/repositories/map";
import {HeatMapData, HeatMapPointData} from "@front-end/domain/entities/map";

export class MapInteractor implements MapUsecases {
  constructor(private readonly mapRepository: MapRepository) {
  }

  async getHeatMapData(heatMapPoints: HeatMapPointData[]): Promise<HeatMapData> {
    return this.mapRepository.getHeatMapData(heatMapPoints)
      .catch((error) => {
        throw new Error(error);
      })
  }

  async getCachedHeatMapData(): Promise<HeatMapData> {
    return this.mapRepository.getCachedHeatMapData()
      .catch((error) => {
        throw new Error(error);
      })
  }
}

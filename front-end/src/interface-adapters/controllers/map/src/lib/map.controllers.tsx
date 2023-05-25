import {MapUsecases} from "@front-end/application/usecases/map";
import {HeatMapData, HeatMapPointData} from "@front-end/domain/entities/map";

export class MapControllers {
  constructor(private readonly mapUseCase: MapUsecases) {
  }

  async getHeatMapData(heatMapPoints: HeatMapPointData[]): Promise<HeatMapData> {
    return this.mapUseCase.getHeatMapData(heatMapPoints)
      .catch((error) => {
        throw new Error(error);
      })
  }

  async getCachedHeatMapData(): Promise<HeatMapData> {
    return this.mapUseCase.getCachedHeatMapData()
      .catch((error) => {
        throw new Error(error);
      })
  }
}

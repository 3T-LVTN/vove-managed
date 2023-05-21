import {HeatMapData, HeatMapPointData} from "@front-end/domain/entities/map";

export interface MapUsecases {
  getHeatMapData(heatMapPoints: HeatMapPointData[]): Promise<HeatMapData>;
  getCachedHeatMapData(): Promise<HeatMapData>;
}

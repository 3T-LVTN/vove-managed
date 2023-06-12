import {HeatMapData, HeatMapPointData, SummaryRequest, SummaryApiResponse, GetDetailApiRequest, GetDetailApiResponse} from "@front-end/domain/entities/map";



export interface MapRepository {
  getHeatMapData(heatMapPoints: HeatMapPointData[]): Promise<HeatMapData>;
  getCachedHeatMapData(): Promise<HeatMapData>;
  getSummary(request: SummaryRequest) : Promise<SummaryApiResponse>;
  getDetail(request:GetDetailApiRequest) : Promise<GetDetailApiResponse>;
}

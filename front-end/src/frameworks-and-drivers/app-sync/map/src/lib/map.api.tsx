import {axios} from "@front-end/frameworks-and-drivers/app-sync/axios";
import {MapRepository} from "@front-end/application/repositories/map";
import {HeatMapData, HeatMapPointData} from "@front-end/domain/entities/map";

export class MapApi implements MapRepository {
  async getHeatMapData(heatMapPoints: HeatMapPointData[]): Promise<HeatMapData> {
    const requestBody = {
      predictDate: Date.now() / 1000 - 60*60*24,
      locations: heatMapPoints,
    }
    return axios.post("/prediction", requestBody)
      .then((response) => {
        localStorage.setItem("mapData", JSON.stringify(response.data.data));
        return response.data.data
      })
      .catch((error) => {
        throw new Error(error)
      });
  }

  async getCachedHeatMapData(): Promise<HeatMapData> {
    return JSON.parse(localStorage.getItem("mapData") ?? "{}");
  }
}

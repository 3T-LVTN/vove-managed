import { axios } from "@front-end/frameworks-and-drivers/app-sync/axios";
import { MapRepository } from "@front-end/application/repositories/map";
import { GetDetailApiRequest, GetDetailApiResponse, HeatMapData, HeatMapPointData, SummaryRequest, SummaryApiResponse } from "@front-end/domain/entities/map";
import { validateArgCount } from "@firebase/util";

export class MapApi implements MapRepository {
  async getHeatMapData(heatMapPoints: HeatMapPointData[]): Promise<HeatMapData> {
    const requestBody = {
      predictDate: Date.now() / 1000 - 60 * 60 * 24,
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

  async getDetail(request: GetDetailApiRequest): Promise<GetDetailApiResponse> {
    const cache = JSON.parse(localStorage.getItem("detail" + request.locationCode ?? "") ?? "{}")
    if (Object.keys(cache).length !== 0) {
      console.log("load cache", cache)
      return cache
    }
    return axios.post<GetDetailApiResponse>("/prediction/detail", request).then(
      (resp) => {
        resp.data.data.locationDetail = resp.data.data.locationDetail.map((val)=> {
          return {
            ...val, 
            temperature: (val.temperature - 32) / 1.8,
            precip: val.precip * 25.4
          }
        })
        localStorage.setItem("detail" + request.locationCode ?? "", JSON.stringify(resp.data))
        return resp.data
      }
    ).catch(
      (err) => { throw new Error(err) }
    )
  }
  async getSummary(request: SummaryRequest): Promise<SummaryApiResponse> {
    const cache = JSON.parse(localStorage.getItem("summary" + request.locations.map((val) => val.locationCode ?? "") ?? "") ?? "{}")
    if (Object.keys(cache).length !== 0) {
      console.log("load cache", cache)
      return cache
    }
    return axios.post<SummaryApiResponse>("/prediction/summary", request).then(
      (resp) => {
        resp.data.data =  resp.data.data.map(
          (val) => {
            return {
              ...val, 
              temperature: (val.temperature - 32) / 1.8,
              precip: val.precip * 25.4
            }
          })
        localStorage.setItem("summary" + request.locations.map((val) => val.locationCode ?? "") ?? "", JSON.stringify(resp.data))
        return resp.data
      }
    ).catch(
      (err) => { throw new Error(err) }
    )
  }
}


export type HeatMapPointData = {
  long: number
  lat: number
  weight?: number
  idx?: number
}

export type HeatMapData = {
  availableLocations?: Array<HeatMapPointData>
  missingLocation?: Array<HeatMapPointData>
}


export interface SummaryRequest {
  locations: Array<{
    idx?: number,
    lat?: number, 
    lng?: number,
    locationCode?: string
  }>
}
export interface SummaryApiResponseData {
  locationCode: string,
  lat: number,
  lng: number,
  value: number,
  precip: number,
  temperature: number,
  rate: string,
}

export interface SummaryApiResponse {
  code: number,
  message: string,
  data: Array<SummaryApiResponseData>
}


export interface GetDetailApiRequest {
  startTime: number;
  endTime: number;
  lat?: number;
  lng?: number;
  locationCode?: string;
}

export interface LocationDetail {
  date: number; // actually timestamp
  value: number;
  temperature: number;
  precip: number;
  rate: string;
}

export interface GetDetailApiResponseData {
  locationGeometry: {
    lat: number, 
    lng: number, 
    locationCode: string
  };
  locationDetail: LocationDetail[];
}
export interface GetDetailApiResponse {
  code: number;
  message: string;
  data: GetDetailApiResponseData;
}

import {Divider, Grid, Space, Text, Title} from "@mantine/core";
import React, {useEffect, useState} from "react";
import {GoogleMap, HeatmapLayerF, Marker} from "@react-google-maps/api";
import SearchBox from "../search-box/search-box";
import {HeatMapData} from "../map/map_data";
import {initPoint} from "../map/init_state";
import {MapApi} from "@front-end/frameworks-and-drivers/app-sync/map";
import {MapInteractor} from "@front-end/application/interactors/map";
import {MapControllers} from "@front-end/interface-adapters/controllers/map";
import axios from "axios";
import { getRate } from "@front-end/shared/administrative-division";

const containerStyle = {
  height: "100%",
};

interface ApiRequest {
  locations: {
    idx: number,
    lat: number,
    lng: number,
    locationCode?: string
  }[];
  // NOTE: currently not support filter with time interval, default 7
  // timeInterval: number
}

interface ApiResponseData {
  locationCode: string;
  lat: number;
  lng: number;
  value: number;
  precip: number;
  temperature: number;
  rate: string;
}

interface ApiResponse {
  code: number;
  message: string;
  data: Array<ApiResponseData>;
}


const getSummary = async (inp: ApiRequest): Promise<ApiResponse> => {
  return (await axios.post<ApiResponse>("/prediction/summary", inp)).data
}
export function SearchHeatmapModal() {
  const [centerPoint, setCenterPoint] = React.useState<{ lat: number, lng: number }>({lat: 10.7644912, lng: 106.702996})
  const [selected, setSelected] = React.useState<google.maps.LatLngLiteral>();
  const [isSelected, setIsSelected] = React.useState<boolean>(false);
  const [heatmapData, setHeatmapData] = useState<google.maps.visualization.WeightedLocation[]>([])
  const [isLoadingHeatMap, setIsLoadingHeatMap] = useState(true)
  const [markerData, setMarkerData] = useState<google.maps.LatLng>()
  const [prediction, setPrediction] = useState<number>(0); 
  const [rate, setRate] = useState<string>("")
  const mapRepository = new MapApi();
  const mapUsecases = new MapInteractor(mapRepository);
  const mapController = new MapControllers(mapUsecases);

  const fetchHeatmapData = async (heatMapData: HeatMapData) => {
    return heatMapData.availableLocations?.map((value) => {
      const weightedLocation: google.maps.visualization.WeightedLocation = {
        location: new google.maps.LatLng(value.lat, value.long),
        weight: (value.weight ?? 10) / 500,
      }
      return weightedLocation;
    })
  }

  useEffect(() => {
    mapController.getCachedHeatMapData()
      .then((data) =>
        fetchHeatmapData(data)
          .then((locations) => {
            setHeatmapData(locations ?? [])
            setIsLoadingHeatMap(false)
            console.log("Load cache done!")
          })
      )
      .catch((e) => console.log(e));

    mapController.getHeatMapData(initPoint)
      .then((data) => {
        fetchHeatmapData(data)
          .then((locations) => {
            setHeatmapData(locations ?? [])
            setIsLoadingHeatMap(false)
            console.log("Load map done!")
          })
      })
      .catch((e) => console.log(e));
  }, [])

  useEffect(() => {
    if (selected) {
      setMarkerData(new google.maps.LatLng(selected));
      setCenterPoint(selected)
      getSummary({locations: [{idx: 1, lat: selected.lat, lng: selected.lng}]}).then(
        (resp) => {
          setPrediction(resp.data[0].value)
          setRate(resp.data[0].rate)
        }
      )
    }
  }, [selected])

  const renderHeatMap = () => {
    return (
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={centerPoint}
        zoom={15}
        options={{streetViewControl: false, fullscreenControl: false}}
      >
        {(isLoadingHeatMap) ? null :
          <HeatmapLayerF data={heatmapData} options={{radius: 100, opacity: 0.3}}/>}
        {markerData && <Marker position={markerData}/>}
      </GoogleMap>
    )
  }
  return (
    <Grid>
      <Grid.Col xs={4} style={{position: "relative"}}>
        <SearchBox setSelected={setSelected} setIsSelected={setIsSelected}></SearchBox>
        <Space h="xl"/>
        {isSelected &&
          <>
            <Title order={3} color="cyan">Thông tin vị trí</Title>
            <Text color="dark.4">Cập nhật lần cuối:</Text>
            <Divider size="xs" color="dark.1"/>
            <Space h="xl"/>
            <Text color="dark.4">Số lượng muỗi bắt được dự đoán: {prediction.toFixed(2)}</Text>
            <Text color="dark.4">Trạng thái: {getRate(rate)}</Text>
          </>}
      </Grid.Col>
      <Grid.Col xs={8} style={{height: "80vh"}}>
        {renderHeatMap()}
      </Grid.Col>
    </Grid>
  );
}

export default SearchHeatmapModal;

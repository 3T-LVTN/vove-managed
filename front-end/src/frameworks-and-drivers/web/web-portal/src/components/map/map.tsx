import React, {ReactElement, useEffect, useMemo, useState} from "react";
import {GoogleMap, HeatmapLayerF, useGoogleMap, useJsApiLoader} from "@react-google-maps/api";
import {ActionIcon} from "@mantine/core";
import {IconArrowsMaximize} from "@tabler/icons-react";
import styles from './map.module.css'
import {SearchHeatmapModalGlobalState} from "@front-end/frameworks-and-drivers/global-states/sreach-heatmap-modal";
import {SearchHeatmapModalInteractor} from "@front-end/application/interactors/sreach-heatmap-modal";
import {SearchHeatmapModalController} from "@front-end/interface-adapters/controllers/sreach-heatmap-modal";
import {axios} from "@front-end/frameworks-and-drivers/app-sync/axios";

export interface MapProps {
  fullScreenControl: boolean
}

const containerStyle = {
  width: "100%",
  height: "100%",
};
type HeatMapPointData = {
  long: number
  lat: number
  weight?: number
  idx?: number
}
type HeatMapData = {
  availableLocations?: Array<HeatMapPointData>
  missingLocation?: Array<HeatMapPointData>
}

const initPointData: Map<number, HeatMapPointData> = new Map([
  [1, {lat: 10.764, long: 106.702}],
  [2, {lat: 10.764, long: 106.703}],
  [3, {lat: 10.764, long: 106.701}],
  [4, {lat: 10.764, long: 106.705}],
  [5, {lat: 10.764, long: 106.704}],
])

const mockData: Array<HeatMapPointData> = [
  {
    lat: 10.764,
    long: 106.702,
    weight: 5
  },
  {
    lat: 10.764,
    long: 106.703,
    weight: 10
  },
  {
    lat: 10.764,
    long: 106.701,
    weight: 15
  },
  {
    lat: 10.764,
    long: 106.705,
    weight: 15
  },
  {
    lat: 10.764,
    long: 106.704,
    weight: 15
  },
]

const libraries: ("visualization" | "places" | "drawing" | "geometry" | "localContext")[] = ["visualization", "places"];

export const VoveMap = () => {
  const {isLoaded} = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env["NX_GOOGLE_API_KEY"]!,
    libraries,
  });

  const [stateData, setData] = useState(initPointData)
  const [mapData, setMapData] = useState<HeatMapData>({})
  const [heatmapData, setHeatmapData] = useState<google.maps.visualization.WeightedLocation[]>([])

  const centerPoint = {lat: 10.7644912, lng: 106.702996};

  const searchHeatmapModalGlobalState = new SearchHeatmapModalGlobalState()
  const searchHeatmapModalUsecase = new SearchHeatmapModalInteractor(searchHeatmapModalGlobalState)
  const searchHeatmapModalController = new SearchHeatmapModalController(searchHeatmapModalUsecase)

  const fetchHeatmapData = () => {
    const data = mapData.availableLocations ?? mockData;
    data.forEach((value) => {
      const val = initPointData.get(value.idx ? value.idx : 0)
      const weightedLocation: google.maps.visualization.WeightedLocation = {
        location: new google.maps.LatLng((val ? val : value).lat, (val ? val : value).long),
        weight: value.weight ?? 0
      };
      heatmapData.push(weightedLocation);
      setHeatmapData([...heatmapData])
    })
  }

  useEffect(() => {
    // axios.post("/prediction", stateData)
    //   .then((resp) => setMapData(resp.data))
    //   .catch((e) => console.log(e))
  }, [])

  useMemo(() => {
    if (!isLoaded) return;
    fetchHeatmapData();
  }, [isLoaded])

  const renderMap = () => {
    return (
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={centerPoint}
        zoom={15}
        options={{streetViewControl: false, fullscreenControl: false}}
      >
        <HeatmapLayerF data={heatmapData}/>
        <div className={styles.buttonLayer}>
          <ActionIcon size="lg" variant="light" color="cyan"
                      onClick={() => searchHeatmapModalController.setIsModalOpened(true)}>
            <IconArrowsMaximize
              size="2.125rem"/>
          </ActionIcon>
        </div>
      </GoogleMap>
    )
  }

  return isLoaded ? renderMap() : null
};

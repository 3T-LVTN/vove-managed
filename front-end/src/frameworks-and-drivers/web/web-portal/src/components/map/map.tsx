import React, {useEffect, useState} from "react";
import {GoogleMap, HeatmapLayerF, useJsApiLoader} from "@react-google-maps/api";
import {ActionIcon} from "@mantine/core";
import {IconArrowsMaximize} from "@tabler/icons-react";
import styles from './map.module.css'
import {SearchHeatmapModalGlobalState} from "@front-end/frameworks-and-drivers/global-states/sreach-heatmap-modal";
import {SearchHeatmapModalInteractor} from "@front-end/application/interactors/sreach-heatmap-modal";
import {SearchHeatmapModalController} from "@front-end/interface-adapters/controllers/sreach-heatmap-modal";
import {HeatMapData} from "@front-end/domain/entities/map";
import {initPoint} from "./init_state";
import {MapApi} from "@front-end/frameworks-and-drivers/app-sync/map";
import {MapInteractor} from "@front-end/application/interactors/map";
import {MapControllers} from "@front-end/interface-adapters/controllers/map";

export interface MapProps {
  fullScreenControl: boolean
}

const containerStyle = {
  width: "100%",
  height: "100%",
};

const libraries: ("visualization" | "places" | "drawing" | "geometry" | "localContext")[] = ["visualization", "places"];

export const VoveMap = () => {
  const {isLoaded} = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env["NX_GOOGLE_API_KEY"]!,
    libraries,
  });

  const [heatmapData, setHeatmapData] = useState<google.maps.visualization.WeightedLocation[]>([])
  const [isLoadingHeatMap, setIsLoadingHeatMap] = useState(true)

  const centerPoint = {lat: 10.7644912, lng: 106.702996};

  const searchHeatmapModalGlobalState = new SearchHeatmapModalGlobalState()
  const searchHeatmapModalUsecase = new SearchHeatmapModalInteractor(searchHeatmapModalGlobalState)
  const searchHeatmapModalController = new SearchHeatmapModalController(searchHeatmapModalUsecase)

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
      .then((data) => {
        if (isLoaded)
          fetchHeatmapData(data)
            .then((locations) => {
              setHeatmapData(locations ?? [])
              setIsLoadingHeatMap(false)
              console.log("Load map done!")
            })
      })
      .catch((e) => console.log(e));

    mapController.getHeatMapData(initPoint)
      .then((data) => {
        if (data && isLoaded) {
          fetchHeatmapData(data)
            .then((locations) => {
              setHeatmapData(locations ?? [])
              setIsLoadingHeatMap(false)
              console.log("Load map done!")
            })
        } else {
          throw new Error("No data")
        }
      })
      .catch((e) => console.log(e));
  }, [isLoaded])

  const renderMap = () => {
    return (
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={centerPoint}
        zoom={15}
        options={{streetViewControl: false, fullscreenControl: false}}
      >
        {(isLoadingHeatMap) ? null :
          <HeatmapLayerF data={heatmapData} options={{radius: 100, opacity: 0.3}}/>}
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

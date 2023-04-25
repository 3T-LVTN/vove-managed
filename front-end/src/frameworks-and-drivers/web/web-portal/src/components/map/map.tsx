import React, {ReactElement, useEffect} from "react";
import {GoogleMap, HeatmapLayerF, useGoogleMap, useJsApiLoader} from "@react-google-maps/api";
import {ActionIcon} from "@mantine/core";
import {IconArrowsMaximize} from "@tabler/icons-react";
import styles from './map.module.css'
import {SearchHeatmapModalGlobalState} from "@front-end/frameworks-and-drivers/global-states/sreach-heatmap-modal";
import {SearchHeatmapModalInteractor} from "@front-end/application/interactors/sreach-heatmap-modal";
import {SearchHeatmapModalController} from "@front-end/interface-adapters/controllers/sreach-heatmap-modal";


const containerStyle = {
  width: "100%",
  height: "100%",
};

export const Map = () => {
  const {isLoaded} = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env["NX_GOOGLE_API_KEY"]!,
    libraries: ['visualization']
  });

  const centerPoint = {lat: 10.7644912, lng: 106.702996};

  const searchHeatmapModalGlobalState = new SearchHeatmapModalGlobalState()
  const searchHeatmapModalUsecase = new SearchHeatmapModalInteractor(searchHeatmapModalGlobalState)
  const searchHeatmapModalController = new SearchHeatmapModalController(searchHeatmapModalUsecase)

  const renderMap = () => {
    const heatmapData = [
      {location: new google.maps.LatLng(10.764, 106.702), weight: 15},
      {location: new google.maps.LatLng(10.764, 106.703), weight: 15},
      {location: new google.maps.LatLng(10.764, 106.701), weight: 15},
      {location: new google.maps.LatLng(10.764, 106.705), weight: 15},
      {location: new google.maps.LatLng(10.764, 106.704), weight: 15},
    ]
    return (
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={centerPoint}
        zoom={15}
        options={{streetViewControl: false, fullscreenControl: false}}
      >
        <HeatmapLayerF data={heatmapData}/>
        <div className={styles.buttonLayer}>
          <ActionIcon size="lg" variant="light"
                      onClick={() => searchHeatmapModalController.setIsModalOpened(true)}>
            <IconArrowsMaximize
              size="2.125rem"/>
          </ActionIcon>
        </div>
      </GoogleMap>
    )
  }

  return isLoaded ? renderMap() : <></>
};

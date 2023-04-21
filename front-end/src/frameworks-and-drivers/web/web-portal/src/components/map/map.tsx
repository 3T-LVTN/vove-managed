import React from "react";
import {GoogleMap, HeatmapLayer, HeatmapLayerF, useJsApiLoader} from "@react-google-maps/api";


const containerStyle = {
  width: "100%",
  height: "100%",
};


export const Map = () => {
  // TODO: fix the bug maps is undefine (loading prob)
  // const { isLoaded } = useJsApiLoader({
  //   id: "google-map-script",
  //   googleMapsApiKey: process.env["NX_GOOGLE_API_KEY"]!,
  //   libraries: ['visualization']
  // });

  const centerPoint = { lat: 10.7644912, lng: 106.702996 };

  const [map, setMap] = React.useState(null);

  const onLoad = React.useCallback(function callback(map: any) {
    setMap(map);
  }, []);

  const onUnmount = React.useCallback(function callback(map: any) {
    setMap(null);
  }, []);

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
      onLoad={onLoad}
      onUnmount={onUnmount}
      options={{streetViewControl: false}}
    >
      <HeatmapLayerF data={heatmapData}/>
    </GoogleMap>
  )
};

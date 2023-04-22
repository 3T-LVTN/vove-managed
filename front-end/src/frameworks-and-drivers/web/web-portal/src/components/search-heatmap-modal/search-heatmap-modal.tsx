import {Divider, Grid, Space, Text, Title} from "@mantine/core";
import React from "react";
import {GoogleMap, HeatmapLayerF, Marker, useJsApiLoader} from "@react-google-maps/api";
import SearchBox from "../search-box/search-box";


const containerStyle = {
  width: "100%",
  height: "100%",
};

const centerPoint = { lat: 10.7644912, lng: 106.702996 };

const heatmapData = [
  {location: new google.maps.LatLng(10.764, 106.702), weight: 15},
  {location: new google.maps.LatLng(10.764, 106.703), weight: 15},
  {location: new google.maps.LatLng(10.764, 106.701), weight: 15},
  {location: new google.maps.LatLng(10.764, 106.705), weight: 15},
  {location: new google.maps.LatLng(10.764, 106.704), weight: 15},
]

export function SearchHeatmapModal() {

  // TODO: fix the bug maps is undefine (loading prob)
  // const { isLoaded } = useJsApiLoader({
  //   id: "google-map-script",
  //   googleMapsApiKey: process.env["NX_GOOGLE_API_KEY"]!,
  // });

  const [map, setMap] = React.useState(null);
  const [selected, setSelected] = React.useState(null);

  const onLoad = React.useCallback(function callback(map: any) {
    setMap(map);
  }, []);

  const onUnmount = React.useCallback(function callback(map: any) {
    setMap(null);
  }, []);

  return (
    <Grid>
      <Grid.Col xs={4} style={{position: "relative"}}>
        <SearchBox setSelected={setSelected}></SearchBox>
        <Space h="xl" />
        <Title order={3} color="cyan">Name of the place</Title>
        <Text color="dark.4">Last updated:</Text>
        <Divider size="xs" color="dark.1" />
        <Space h="xl" />
        <Text color="dark.4">Mosquito Rate:</Text>
        <Text color="dark.4">Dengue Rate:</Text>
      </Grid.Col>
      <Grid.Col xs={8} style={{height: "80vh"}}>
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={centerPoint}
            zoom={15}
            onLoad={onLoad}
            onUnmount={onUnmount}
            options={{streetViewControl: false, fullscreenControl: false}}
          >
            <HeatmapLayerF data={heatmapData}/>
            {selected && <Marker position={selected} />}
          </GoogleMap>
      </Grid.Col>
    </Grid>
  );
}

export default SearchHeatmapModal;

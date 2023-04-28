import {Divider, Grid, Space, Text, Title} from "@mantine/core";
import React from "react";
import {GoogleMap, HeatmapLayerF, Marker, useJsApiLoader} from "@react-google-maps/api";
import SearchBox from "../search-box/search-box";


const containerStyle = {
  height: "100%",
};

const centerPoint = {lat: 10.7644912, lng: 106.702996};

export function SearchHeatmapModal() {
  const {isLoaded} = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env["NX_GOOGLE_API_KEY"]!,
    libraries: ['visualization']
  });

  const [selected, setSelected] = React.useState(null);

  const renderHeatMap = () => {
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
        {selected && <Marker position={selected}/>}
      </GoogleMap>
    )
  }
  return (
    <Grid>
      <Grid.Col xs={4} style={{position: "relative"}}>
        <SearchBox setSelected={setSelected}></SearchBox>
        <Space h="xl"/>
        <Title order={3} color="cyan">Name of the place</Title>
        <Text color="dark.4">Last updated:</Text>
        <Divider size="xs" color="dark.1"/>
        <Space h="xl"/>
        <Text color="dark.4">Mosquito Rate:</Text>
        <Text color="dark.4">Dengue Rate:</Text>
      </Grid.Col>
      <Grid.Col xs={8} style={{height: "80vh"}}>
        {isLoaded ? renderHeatMap() : "Loading..."}
      </Grid.Col>
    </Grid>
  );
}

export default SearchHeatmapModal;

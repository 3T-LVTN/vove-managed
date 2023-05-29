import {Divider, Grid, Space, Text, Title} from "@mantine/core";
import React, {useEffect, useState} from "react";
import {GoogleMap, HeatmapLayerF, Marker} from "@react-google-maps/api";
import SearchBox from "../search-box/search-box";
import {HeatMapData} from "../map/map_data";
import {initPoint} from "../map/init_state";
import {MapApi} from "@front-end/frameworks-and-drivers/app-sync/map";
import {MapInteractor} from "@front-end/application/interactors/map";
import {MapControllers} from "@front-end/interface-adapters/controllers/map";

const containerStyle = {
  height: "100%",
};


export function SearchHeatmapModal() {
  const [centerPoint, setCenterPoint] = React.useState<{ lat: number, lng: number }>({lat: 10.7644912, lng: 106.702996})
  const [selected, setSelected] = React.useState<google.maps.LatLngLiteral>();
  const [isSelected, setIsSelected] = React.useState<boolean>(false);
  const [heatmapData, setHeatmapData] = useState<google.maps.visualization.WeightedLocation[]>([])
  const [isLoadingHeatMap, setIsLoadingHeatMap] = useState(true)
  const [markerData, setMarkerData] = useState<google.maps.LatLng>()

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
            <Title order={3} color="cyan">Name of the place</Title>
            <Text color="dark.4">Last updated:</Text>
            <Divider size="xs" color="dark.1"/>
            <Space h="xl"/>
            <Text color="dark.4">Mosquito Rate:</Text>
            <Text color="dark.4">Dengue Rate:</Text>
          </>}
      </Grid.Col>
      <Grid.Col xs={8} style={{height: "80vh"}}>
        {renderHeatMap()}
      </Grid.Col>
    </Grid>
  );
}

export default SearchHeatmapModal;

import {Divider, Grid, Space, Text, Title} from "@mantine/core";
import React, {useEffect, useMemo, useState} from "react";
import {GoogleMap, HeatmapLayerF, Marker} from "@react-google-maps/api";
import SearchBox from "../search-box/search-box";
import {HeatMapData, HeatMapPointData} from "../map/map_data";
import {initPoint} from "../map/init_state";
import {axios} from "@front-end/frameworks-and-drivers/app-sync/axios";

const containerStyle = {
  height: "100%",
};

const centerPoint = {lat: 10.7644912, lng: 106.702996};

const mockData: Array<HeatMapPointData> = [
  {
    lat: 10.764,
    long: 106.702,
    weight: 15
  },
  {
    lat: 10.764,
    long: 106.703,
    weight: 15
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

export function SearchHeatmapModal() {
  const [selected, setSelected] = React.useState<{ lat: number, lng: number } | null>(null);
  const [isSelected, setIsSelected] = React.useState<boolean>(false);
  const [stateData, setData] = useState(initPoint)
  const [mapData, setMapData] = useState<HeatMapData>({})
  const [heatmapData, setHeatmapData] = useState<google.maps.visualization.WeightedLocation[]>([])
  const [isLoadingHeatMap, setIsLoadingHeatMap] = useState(true)

  const fetchHeatmapData = async (heatMapData: HeatMapData) => {
    return heatMapData.availableLocations?.map((value) => {
      const weightedLocation: google.maps.visualization.WeightedLocation = {
        location: new google.maps.LatLng(value.lat, value.long),
        weight: (value.weight ?? 10) / 500,
      }
      return weightedLocation;
    })
  }

  const loadFromLocal = async () => {
    const a = await JSON.parse(localStorage.getItem("mapData") ?? "{}");
    return a;
  }

  useEffect(() => {
    const requestBody = {
      predictDate: 1683444833,
      locations: stateData,
    }

    loadFromLocal()
      .then((data) => {
        console.log(data)
        fetchHeatmapData(data)
          .then((locations) => {
            setHeatmapData(locations ?? [])
            if (heatmapData.length > 0)
              console.log(locations)
          })
          .then(() => setIsLoadingHeatMap(false))
      })
    axios.post("/prediction", requestBody)
      .then((resp) => {
        localStorage.setItem("mapData", JSON.stringify(resp.data.data));
        setMapData(resp.data.data)
        return resp.data.data
      })
      .then((data) => fetchHeatmapData(data))
      .then((locations) => {
        setHeatmapData(locations ?? [])
        console.log("Load map done!")
      })
      .then(() => setIsLoadingHeatMap(false))
      .catch((e) => console.log(e))
  }, [])

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
        {selected && <Marker position={selected}/>}
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

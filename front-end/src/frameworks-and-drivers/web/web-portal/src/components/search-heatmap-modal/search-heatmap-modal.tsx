import {Divider, Grid, Space, Text, Title} from "@mantine/core";
import React, {useEffect, useMemo, useState} from "react";
import {GoogleMap, HeatmapLayerF, Marker, useJsApiLoader} from "@react-google-maps/api";
import SearchBox from "../search-box/search-box";


const containerStyle = {
  height: "100%",
};

const centerPoint = {lat: 10.7644912, lng: 106.702996};

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
  // const {isLoaded} = useJsApiLoader({
  //   id: "google-map-script",
  //   googleMapsApiKey: process.env["NX_GOOGLE_API_KEY"]!,
  //   libraries: ['visualization', 'places']
  // });
  const isLoaded = true;

  const [selected, setSelected] = React.useState(null);
  const [stateData, setData] = useState(initPointData)
  const [mapData, setMapData] = useState<HeatMapData>({})
  const [heatmapData, setHeatmapData] = useState<google.maps.visualization.WeightedLocation[]>([])
  const [isHeatMapLoaded, setIsHeatMapLoaded] = useState(false)

  const fetchHeatmapData = () => {
    const data = mapData.availableLocations ?? mockData;
    data.forEach((value) => {
      const val = initPointData.get(value.idx ? value.idx : 0)
      const weightedLocation: google.maps.visualization.WeightedLocation = {
        location: new google.maps.LatLng((val ? val : value).lat, (val ? val : value).long),
        weight: value.weight ?? 1
      };
      heatmapData.push(weightedLocation);
      setHeatmapData([...heatmapData])
    })
    setIsHeatMapLoaded(true)
  }

  useEffect(() => {
    // axios.post("/prediction", stateData)
    //   .then((resp) => setMapData(resp.data))
    //   .catch((e) => console.log(e))
  }, [])

  useMemo(() => {
    if (!isLoaded) return;
    setIsHeatMapLoaded(false)
    fetchHeatmapData();
  }, [isLoaded])

  const renderHeatMap = () => {
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

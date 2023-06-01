import {
  Badge,
  Button,
  Container,
  Grid,
  Group,
  Modal,
  Paper, ScrollArea,
  Select,
  SimpleGrid,
  Stack, Tabs,
  Text,
  ThemeIcon
} from "@mantine/core";
import {PageTitle} from "../../components/page-title/page-title";
import {VoveMap} from "../../components/map/map";
import SearchHeatmapModal from "../../components/search-heatmap-modal/search-heatmap-modal";
import React, {useEffect, useState} from "react";
import {SearchHeatmapModalGlobalState} from "@front-end/frameworks-and-drivers/global-states/sreach-heatmap-modal";
import {SearchHeatmapModalInteractor} from "@front-end/application/interactors/sreach-heatmap-modal";
import {SearchHeatmapModalController} from "@front-end/interface-adapters/controllers/sreach-heatmap-modal";
import DistrictStatusSummary from "../../components/district-status-summary/district-status-summary";
import {NavLink} from "react-router-dom";
import { Interface } from "readline";
import axios from "axios";

enum DistrictSummaryStatus  {
  Safe = "SAFE",
  Normal = "NORMAL", 
  LowRisk = "LOW RISK", 
  HighRisk = "HIGH RISK",
}
interface DistrictStatus {
  districtId: number;
  districtName: string;
  status: DistrictSummaryStatus;
}

interface DistrictLocation {
  lat?: number, 
  lng?: number, 
  locationCode: string
}
interface DistrictSummaryApiRequest { 
  locations: Array<DistrictLocation>,  
  // NOTE: currently not support filter with time interval, default 7 
  // timeInterval: number
}

interface DistrictSummaryApiResponseData { 
  locationCode: string, 
  lat: number, 
  lng: number, 
  value: number, 
  precip: number, 
  temperature: number, 
  rate: DistrictSummaryStatus,
}
interface DistrictSummaryApiResponse {
  code: number, 
  message: string, 
  data: Array<DistrictSummaryApiResponseData>
}

const  getSummary = async (inp: DistrictLocation[]): Promise<DistrictStatus[]> => {
  const body: DistrictSummaryApiRequest = {
    locations: inp
  } 

  return axios.post<DistrictSummaryApiResponse>("/prediction/summary", body)
    .then((response) => {
      const newData : DistrictStatus[] = []
      response.data.data.forEach((val,index, _) => {
        newData.push({
          districtId: index, 
          districtName: val.locationCode, 
          status: val.rate,
        })
      })
      return newData
    })
    .catch((error) => {
      throw new Error(error)
    });
}


const mockDistrictStatus: DistrictStatus[] = [
  {
    districtId: 1,
    districtName: "Thu Duc City",
    status: DistrictSummaryStatus.Normal
  },
  {
    districtId: 2,
    districtName: "District 1",
    status: DistrictSummaryStatus.Safe
  },
  {
    districtId: 3,
    districtName: "District 3",
    status: DistrictSummaryStatus.Normal
  },
  {
    districtId: 4,
    districtName: "District 4",
    status: DistrictSummaryStatus.Safe
  },
  {
    districtId: 5,
    districtName: "District 5",
    status: DistrictSummaryStatus.Safe
  },
  {
    districtId: 6,
    districtName: "District 6",
    status: DistrictSummaryStatus.Safe
  },
  {
    districtId: 7,
    districtName: "District 7",
    status: DistrictSummaryStatus.Safe
  },
  {
    districtId: 8,
    districtName: "District 8",
    status: DistrictSummaryStatus.Safe
  },
  {
    districtId: 9,
    districtName: "District 10",
    status: DistrictSummaryStatus.Normal
  },
  {
    districtId: 10,
    districtName: "District 11",
    status: DistrictSummaryStatus.Safe
  },
  {
    districtId: 11,
    districtName: "District 12",
    status: DistrictSummaryStatus.LowRisk
  },
  {
    districtId: 12,
    districtName: "Binh Thanh",
    status: DistrictSummaryStatus.Safe
  },
  {
    districtId: 13,
    districtName: "Go Vap",
    status: DistrictSummaryStatus.Safe
  },
  {
    districtId: 14,
    districtName: "Phu Nhuan",
    status: DistrictSummaryStatus.Normal
  },
  {
    districtId: 15,
    districtName: "Tan Binh",
    status: DistrictSummaryStatus.Safe
  },
  {
    districtId: 16,
    districtName: "Tan Phu",
    status: DistrictSummaryStatus.Safe
  },
  {
    districtId: 17,
    districtName: "Binh Tan",
    status: DistrictSummaryStatus.Safe
  },
  {
    districtId: 18,
    districtName: "Cu Chi",
    status: DistrictSummaryStatus.Safe
  },
  {
    districtId: 19,
    districtName: "Nha Be",
    status: DistrictSummaryStatus.Safe
  },
  {
    districtId: 20,
    districtName: "Can Gio",
    status: DistrictSummaryStatus.HighRisk
  },
  {
    districtId: 21,
    districtName: "Binh Chanh",
    status: DistrictSummaryStatus.LowRisk
  },
  {
    districtId: 22,
    districtName: "Hoc Mon",
    status: DistrictSummaryStatus.Normal
  }
]

const DistrictList = ({districts}: { districts: DistrictStatus[] }) => {
  const districtList = districts.map((districtStatus) => {
    return (
      <NavLink to={`${districtStatus.districtId}`} style={{textDecoration: "none"}}>
        <Paper withBorder p="md" radius="md">
          <Group position="apart">
            <Group>
              <ThemeIcon radius="50%" size="lg"
                         color={districtStatus.status === DistrictSummaryStatus.HighRisk ? "red" : (
                           districtStatus.status === DistrictSummaryStatus.LowRisk ? "orange" : (
                             districtStatus.status === DistrictSummaryStatus.Normal ? "yellow" : ""
                           ))}
              >
              </ThemeIcon>
              <Text fw={700} size="lg">{districtStatus.districtName}</Text>
            </Group>
            <Badge variant="light" size="lg" color={districtStatus.status === DistrictSummaryStatus.HighRisk ? "red" : (
              districtStatus.status === DistrictSummaryStatus.LowRisk ? "orange" : (
                districtStatus.status === DistrictSummaryStatus.Normal ? "yellow" : ""
              ))}>
              {districtStatus.status}
            </Badge>
          </Group>
        </Paper>
      </NavLink>
    )
  })
  return (
    <ScrollArea h={250}>
      <SimpleGrid
        cols={4}
        breakpoints={[
          {maxWidth: 'lg', cols: 3, spacing: 'md'},
          {maxWidth: 'md', cols: 2, spacing: 'sm'},
          {maxWidth: 'sm', cols: 1, spacing: 'sm'},
        ]}
      >
        {districtList}
      </SimpleGrid>
    </ScrollArea>
  )
}

const DistrictSummary = () => {
  const searchHeatmapModalGlobalState = new SearchHeatmapModalGlobalState()
  const searchHeatmapModalUsecase = new SearchHeatmapModalInteractor(searchHeatmapModalGlobalState)
  const searchHeatmapModalController = new SearchHeatmapModalController(searchHeatmapModalUsecase)

  const [activeTab, setActiveTab] = useState<string | null>('all');

  const [districtsStatusAll, setStatus] = useState<DistrictStatus[]>(mockDistrictStatus);
  const [districtsStatusSafe, setStatusSafe] = useState<DistrictStatus[]>(mockDistrictStatus.filter((districtStatus) => districtStatus.status === DistrictSummaryStatus.Safe));
  const [districtsStatusNormal, setStatusNormal] = useState<DistrictStatus[]>(mockDistrictStatus.filter((districtStatus) => districtStatus.status === DistrictSummaryStatus.Normal));
  const [districtsStatusLowRisk, setStatusLowRisk] = useState<DistrictStatus[]>(mockDistrictStatus.filter((districtStatus) => districtStatus.status === DistrictSummaryStatus.LowRisk));
  const [districtsStatusHighRisk, setStatusHighRisk] = useState<DistrictStatus[]>(mockDistrictStatus.filter((districtStatus) => districtStatus.status === DistrictSummaryStatus.HighRisk));

  useEffect(()=>{
    const districtInp : DistrictLocation[] = []
    mockDistrictStatus.forEach((value, _, __)=> {
      districtInp.push(
        {
          locationCode: value.districtName
        }
      )
    }) 
    getSummary(districtInp).then((value)=>{
      setStatus(value)
      setStatusSafe(mockDistrictStatus.filter((districtStatus) => districtStatus.status === DistrictSummaryStatus.Safe))
      setStatusNormal(mockDistrictStatus.filter((districtStatus) => districtStatus.status === DistrictSummaryStatus.Normal))
      setStatusLowRisk(mockDistrictStatus.filter((districtStatus) => districtStatus.status === DistrictSummaryStatus.LowRisk))
      setStatusHighRisk(mockDistrictStatus.filter((districtStatus) => districtStatus.status === DistrictSummaryStatus.HighRisk))
    }).catch((e)=> console.log(e))
  })


  return (
    <Container fluid>
      <PageTitle title={"District Summary"}/>
      <Grid>
        <Modal
          opened={searchHeatmapModalController.getSearchHeatmapModalViewModel().isModalOpened}
          onClose={() => searchHeatmapModalController.setIsModalOpened(false)}
          title={<Text color="dark.4" fw={900}>HCMC Mosquito Heatmap</Text>}
          centered={true}
          size={"90%"}
          xOffset={0}
        >
          <SearchHeatmapModal/>
        </Modal>
        <Grid.Col lg={8} md={12}>
          <Paper withBorder p="md" radius="md" style={{height: "50vh"}}>
            <VoveMap></VoveMap>
          </Paper>
        </Grid.Col>
        <Grid.Col lg={4} md={12}>
          <Paper withBorder p="md" radius="md" style={{height: "50vh"}}>
            <Stack justify="center" h="100%">
              <DistrictStatusSummary isForDashboard={false}></DistrictStatusSummary>
            </Stack>
          </Paper>
        </Grid.Col>

        <Grid.Col span={12}>
          <Tabs value={activeTab} onTabChange={setActiveTab}>
            <Tabs.List>
              <Tabs.Tab value="all" rightSection={
                <Badge w={16} h={16} size="xs" p={0} sx={{pointerEvents: 'none'}}
                       variant="filled" color={activeTab === "all" ? "" : "gray"}>
                  {districtsStatusAll.length}
                </Badge>
              }>
                All
              </Tabs.Tab>

              <Tabs.Tab value={DistrictSummaryStatus.Safe} rightSection={
                <Badge w={16} h={16} size="xs" p={0} sx={{pointerEvents: 'none'}}
                       variant="filled" color={activeTab === DistrictSummaryStatus.Safe ? "" : "gray"}>
                  {districtsStatusSafe.length}
                </Badge>
              }>
                Safe
              </Tabs.Tab>
              
              <Tabs.Tab value={DistrictSummaryStatus.Normal} rightSection={
                <Badge w={16} h={16} size="xs" p={0} sx={{pointerEvents: 'none'}}
                       variant="filled" color={activeTab === DistrictSummaryStatus.Normal? "" : "gray"}>
                  {districtsStatusNormal.length}
                </Badge>
              }>
                Normal
              </Tabs.Tab>

              <Tabs.Tab value={DistrictSummaryStatus.LowRisk} rightSection={
                <Badge w={16} h={16} size="xs" p={0} sx={{pointerEvents: 'none'}}
                       variant="filled" color={activeTab === DistrictSummaryStatus.LowRisk ? "" : "gray"}>
                  {districtsStatusLowRisk.length}
                </Badge>
              }>
                Low Risk
              </Tabs.Tab>

              <Tabs.Tab value={DistrictSummaryStatus.HighRisk} rightSection={
                <Badge w={16} h={16} size="xs" p={0} sx={{pointerEvents: 'none'}}
                       variant="filled" color={activeTab === DistrictSummaryStatus.HighRisk ? "" : "gray"}>
                  {districtsStatusHighRisk.length}
                </Badge>
              }>
                High Risk
              </Tabs.Tab>
            </Tabs.List>

            <Tabs.Panel value={"all"} pt="md">
              <DistrictList districts={districtsStatusAll}/>
            </Tabs.Panel>

            <Tabs.Panel value={DistrictSummaryStatus.Safe} pt="md">
              <DistrictList districts={districtsStatusSafe}/>
            </Tabs.Panel>

            <Tabs.Panel value={DistrictSummaryStatus.Normal} pt="md">
              <DistrictList districts={districtsStatusNormal}/>
            </Tabs.Panel>

            <Tabs.Panel value={DistrictSummaryStatus.LowRisk} pt="md">
              <DistrictList districts={districtsStatusLowRisk}/>
            </Tabs.Panel>

            <Tabs.Panel value={DistrictSummaryStatus.HighRisk} pt="md">
              <DistrictList districts={districtsStatusHighRisk}/>
            </Tabs.Panel>
          </Tabs>
        </Grid.Col>
      </Grid>
    </Container>
  );
}

export default DistrictSummary;

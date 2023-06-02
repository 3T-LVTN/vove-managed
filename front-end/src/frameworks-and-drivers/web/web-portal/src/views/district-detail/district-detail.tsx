import {
  Badge,
  Button,
  Container, createStyles,
  Grid,
  Group,
  Paper, rem,
  ScrollArea,
  Table,
  Tabs,
  Text,
  useMantineTheme
} from "@mantine/core";
import {PageTitle} from "../../components/page-title/page-title";
import {PieChart} from "../../components/pie-chart/pie-chart";
import BarChart from "../../components/bar-chart/bar-chart";
import StyledTabs from "../../components/styled-tabs/styled-tabs";
import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {IconChevronsLeft, IconRefresh} from "@tabler/icons-react";
import axios from "axios";
import { getWards } from "@front-end/shared/administrative-division";

interface WardStatus {
  id: number;
  locationCode: string;
  status: string;
  mosquitoAmount: number;
  rainMeter: number;
  temperature: number;
}

interface WardLocation {
  lat?: number, 
  lng?: number, 
  locationCode: string
}
interface WardSummaryApiRequest { 
  locations: Array<WardLocation>,  
  // NOTE: currently not support filter with time interval, default 7 
  // timeInterval: number
}

interface WardSummaryApiResponseData { 
  locationCode: string, 
  lat: number, 
  lng: number, 
  value: number, 
  precip: number, 
  temperature: number, 
  rate: string,
}
interface WardSummaryApiResponse {
  code: number, 
  message: string, 
  data: Array<WardSummaryApiResponseData>
}

const mockData: WardStatus[] = [
  {
    id: 1,
    locationCode: "Tan Dinh",
    status: "NORMAL",
    mosquitoAmount: 163,
    rainMeter: 67,
    temperature: 37,
  },
  {
    id: 2,
    locationCode: "Da Kao",
    status: "SAFE",
    mosquitoAmount: 128,
    rainMeter: 78,
    temperature: 36,
  },
  {
    id: 3,
    locationCode: "Ben Nghe",
    status: "NORMAL",
    mosquitoAmount: 172,
    rainMeter: 59,
    temperature: 29,
  },
  {
    id: 4,
    locationCode: "Ben Thanh",
    status: "NORMAL",
    mosquitoAmount: 153,
    rainMeter: 92,
    temperature: 32,
  },
  {
    id: 5,
    locationCode: "Nguyen Thai Binh",
    status: "SAFE",
    mosquitoAmount: 98,
    rainMeter: 76,
    temperature: 35,
  },
  {
    id: 6,
    locationCode: "Pham Ngu Lao",
    status: "SAFE",
    mosquitoAmount: 125,
    rainMeter: 89,
    temperature: 33,
  },
  {
    id: 7,
    locationCode: "Cau Ong Lanh",
    status: "SAFE",
    mosquitoAmount: 142,
    rainMeter: 92,
    temperature: 39,
  },
  {
    id: 8,
    locationCode: "Co Giang",
    status: "LOW RISK",
    mosquitoAmount: 213,
    rainMeter: 46,
    temperature: 32,
  },
  {
    id: 9,
    locationCode: "Nguyen Cu Trinh",
    status: "SAFE",
    mosquitoAmount: 129,
    rainMeter: 69,
    temperature: 35,
  },
  {
    id: 10,
    locationCode: "Cau Kho",
    status: "SAFE",
    mosquitoAmount: 98,
    rainMeter: 76,
    temperature: 35,
  }
];

const  getSummary = async (inp: WardLocation[]): Promise<WardStatus[]> => {
  const body: WardSummaryApiRequest = {
    locations: inp
  } 

  return axios.post<WardSummaryApiResponse>("/prediction/summary", body)
    .then((response) => {
      const newData : WardStatus[] = []
      response.data.data.forEach((val,index, _) => {
        newData.push({
          id: index,
          locationCode: val.locationCode, 
          status: val.rate,
          temperature: val.temperature, 
          rainMeter: val.precip, 
          mosquitoAmount: val.value,
        })
      })
      return newData
    })
    .catch((error) => {
      throw new Error(error)
    });
}
const useStyles = createStyles((theme) => ({
  header: {
    position: 'sticky',
    top: 0,
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
    transition: 'box-shadow 150ms ease',

    '&::after': {
      content: '""',
      position: 'absolute',
      left: 0,
      right: 0,
      bottom: 0,
      borderBottom: `${rem(1)} solid ${
        theme.colorScheme === 'dark' ? theme.colors.dark[3] : theme.colors.gray[2]
      }`,
    },
  },

  scrolled: {
    boxShadow: theme.shadows.sm,
  },
}));

const DistrictDetail = () => {
  const theme = useMantineTheme();
  const {classes, cx} = useStyles();
  const { districtName} = useParams()
  const [scrolled, setScrolled] = useState(false);
  const inpData = getWards(districtName?districtName:"")
  const [data, setData] = useState<WardStatus[]>(mockData)

  useEffect (()=> {
    getSummary(inpData).then((value)=> {
      setData(value)
    }).catch((e)=> console.log(e))
  })

  const navigate = useNavigate();

  const rows = data.map((row) => (
    <tr key={row.id} onClick={() => navigate(`wards/${row.locationCode}`)} style={{cursor: "pointer"}}>
      <td>{row.id}</td>
      <td>{row.locationCode}</td>
      <td>{row.mosquitoAmount}</td>
      <td>{row.rainMeter}</td>
      <td>{row.temperature}</td>
      <td>
        <Badge variant="light" size="lg" color={row.status === "HIGH RISK" ? "red" : (
          row.status === "LOW RISK" ? "orange" : (
            row.status === "NORMAL" ? "yellow" : ""
          ))}>
          {row.status}
        </Badge>
      </td>
    </tr>
  ));

  const labels = data.map((districtStatus) => districtStatus.locationCode);
  const date = new Date();
  const time = date.toLocaleTimeString() + " - " + date.toLocaleDateString();

  return (
    <Container fluid>
      <PageTitle title={districtName?districtName:""}/>
      <Group mb="md">
        <Button variant={"light"} color="yellow" onClick={() => navigate(-1)}>
          <IconChevronsLeft size={20}/>
          Back to All places
        </Button>
        <Button variant={"light"} onClick={() => window.location.reload()}>
          <IconRefresh size={20}/>
           Reload
        </Button>
        <Text size="md">
          Last updated:<b> {time}</b>
        </Text>
      </Group>
      <Grid>
        <Grid.Col sm={12} md={4}>
          <Paper withBorder radius="md" p="md" h="50vh">
            <PieChart labels={["SAFE", "NORMAL", "LOW RISK", "HIGH RISK"]}
                      data={[data.filter((ward) => ward.status === "SAFE").length,
                        data.filter((ward) => ward.status === "NORMAL").length,
                        data.filter((ward) => ward.status === "LOW RISK").length,
                        data.filter((ward) => ward.status === "HIGH RISK").length]}/>
          </Paper>
        </Grid.Col>

        <Grid.Col sm={12} md={8}>
          <Paper withBorder radius="md" p="md" h="50vh">
            <StyledTabs defaultValue="rain">
              <Tabs.List style={{justifyContent: "right"}}>
                <Tabs.Tab value="rain">
                  <Text fw={700} size="md">
                    By Rain Meter
                  </Text>
                </Tabs.Tab>
                <Tabs.Tab value="temperature">
                  <Text fw={700} size="md">
                    By Temperature
                  </Text>
                </Tabs.Tab>
                <Tabs.Tab value="mosquito">
                  <Text fw={700} size="md">
                    By Mosquito Amount
                  </Text>
                </Tabs.Tab>
              </Tabs.List>

              <Tabs.Panel value="rain">
                <BarChart
                  title={""}
                  labels={labels}
                  datasets={[
                    {
                      label: 'Rain Meter (mm)',
                      data: data.map((districtStatus) => districtStatus.rainMeter),
                      backgroundColor: theme.colors.cyan[3],
                    },
                  ]}
                />
              </Tabs.Panel>

              <Tabs.Panel value="temperature">
                <BarChart
                  title={""}
                  labels={labels}
                  datasets={[
                    {
                      label: 'Temperature',
                      data: data.map((districtStatus) => districtStatus.temperature),
                      backgroundColor: theme.colors.cyan[3],
                    },
                  ]}
                />
              </Tabs.Panel>

              <Tabs.Panel value="mosquito">
                <BarChart
                  title={""}
                  labels={labels}
                  datasets={[
                    {
                      label: 'Amount of Mosquito',
                      data: data.map((districtStatus) => districtStatus.mosquitoAmount),
                      backgroundColor: theme.colors.cyan[3],
                    },
                  ]}
                />
              </Tabs.Panel>
            </StyledTabs>
          </Paper>
        </Grid.Col>

        <Grid.Col span={12}>
          <Paper withBorder radius="md">
            <ScrollArea h={250} onScrollPositionChange={({y}) => setScrolled(y !== 0)}>
              <Table horizontalSpacing="md" verticalSpacing="xs" miw={700} highlightOnHover>
                <thead className={cx(classes.header, {[classes.scrolled]: scrolled})}>
                <tr>
                  <th>Id</th>
                  <th>Ward Name</th>
                  <th>Mosquito Amount</th>
                  <th>Rain Meter</th>
                  <th>Temperature</th>
                  <th>Status</th>
                </tr>
                </thead>
                <tbody>
                {rows.length > 0 ? (
                  rows
                ) : (
                  <tr>
                    <td colSpan={Object.keys(data[0]).length}>
                      <Text weight={500} align="center">
                        Nothing found
                      </Text>
                    </td>
                  </tr>
                )}
                </tbody>
              </Table>
            </ScrollArea>
          </Paper>
        </Grid.Col>
      </Grid>
    </Container>
  );
}

export default DistrictDetail;

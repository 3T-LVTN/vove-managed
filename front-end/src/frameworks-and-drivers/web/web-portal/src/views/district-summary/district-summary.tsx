import {
  Badge,
  Button,
  Container,
  createStyles,
  Grid,
  Group,
  Modal,
  Paper,
  rem,
  ScrollArea,
  Select,
  SimpleGrid,
  Stack,
  Table,
  Tabs,
  Text,
  ThemeIcon,
} from '@mantine/core';
import { PageTitle } from '../../components/page-title/page-title';
import { VoveMap } from '../../components/map/map';
import SearchHeatmapModal from '../../components/search-heatmap-modal/search-heatmap-modal';
import React, { useEffect, useState } from 'react';
import { SearchHeatmapModalGlobalState } from '@front-end/frameworks-and-drivers/global-states/sreach-heatmap-modal';
import { SearchHeatmapModalInteractor } from '@front-end/application/interactors/sreach-heatmap-modal';
import { SearchHeatmapModalController } from '@front-end/interface-adapters/controllers/sreach-heatmap-modal';
import { DistrictStatusSummary } from '../../components/district-status-summary/district-status-summary';
import { TDashboardDataMap } from '../dashboard/dashboard';
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { getDistricts } from '@front-end/shared/administrative-division';
import { string } from 'prop-types';

enum DistrictSummaryStatus {
  Safe = 'SAFE',
  Normal = 'NORMAL',
  LowRisk = 'LOW_RISK',
  HighRisk = 'HIGH_RISK',
}

interface DistrictSummary {
  districtId: number;
  districtName: string;
  number: Record<string, number>;
}

interface DistrictLocation {
  // lat?: number;
  // lng?: number;
  district_name: string;
  wards: {
    lat: number;
    lng: number;
    locationCode: string;
  }[]
}

interface DistrictSummaryApiRequest {
  locations: {
    lat: number,
    lng: number,
    locationCode: string
  }[];
  // NOTE: currently not support filter with time interval, default 7
  // timeInterval: number
}

interface DistrictSummaryApiResponseData {
  locationCode: string;
  lat: number;
  lng: number;
  value: number;
  precip: number;
  temperature: number;
  rate: DistrictSummaryStatus;
}

interface DistrictSummaryApiResponse {
  code: number;
  message: string;
  data: Array<DistrictSummaryApiResponseData>;
}

type MapWardRate2Number = Record<string, number>

const getSummary = async (
  inp: DistrictLocation[]
): Promise<[DistrictSummary[], MapWardRate2Number]> => {
  const body: DistrictSummaryApiRequest = {
    locations: [],
  };
  let mapWard2District: Record<string, string>
  let mapDistrict2Id: Record<string, number>
  let mapRate2Number: Record<string, number> = {}
  inp.forEach((val, index) => {
    mapDistrict2Id = {
      ...mapDistrict2Id, [val.district_name]: index
    }
    val.wards.forEach((ward) => {
      body.locations.push(ward)
      mapWard2District = {
        ...mapWard2District,
        [ward.locationCode]: val.district_name
      }
    })
  })
  let mapDist2NumberOfRecord: Record<string, Record<string, number>> = {}
  return  axios
    .post<DistrictSummaryApiResponse>('/prediction/summary', body)
    .then((response) => {
      response.data.data.forEach((ward, index, _) => {
        const district = mapWard2District[ward.locationCode]
        const mapState2Number = mapDist2NumberOfRecord[district]??{[ward.rate]:0}
        const numberOfStatus = mapState2Number[ward.rate]?mapState2Number[ward.rate]+1:1
        console.log("map dist 2 number of record", mapDist2NumberOfRecord)
        console.log(ward.rate)
        console.log(mapState2Number)
        console.log(numberOfStatus)
        mapDist2NumberOfRecord = {
          ...mapDist2NumberOfRecord,
          [district]: { ...mapDist2NumberOfRecord[district], [ward.rate]: numberOfStatus }
        }
        mapRate2Number = {
          ...mapRate2Number,
          [ward.rate]: mapRate2Number[ward.rate] ? mapRate2Number[ward.rate] + 1 : 1
        }
      });
      console.log("query done")
      console.log(mapDist2NumberOfRecord)
      console.log(mapRate2Number)
      console.log("before return")
      return [Object.entries(mapDist2NumberOfRecord).map((val) => {
        return { districtId: mapDistrict2Id[val[0]], districtName: val[0], number: val[1] }
      }), mapRate2Number]
    })
};

const mockDistrictStatus: DistrictSummary[] = [
  {
    districtId: 1,
    districtName: 'Thu Duc City',
    number: {
      SAFE: 0,
    },
  },
  {
    districtId: 2,
    districtName: 'District 1',
    number: {
      SAFE: 0,
    },
  },
  {
    districtId: 3,
    districtName: 'District 3',
    number: {
      SAFE: 0,
    },
  },
  {
    districtId: 4,
    districtName: 'District 4',
    number: {
      SAFE: 0,
    },
  },
  {
    districtId: 5,
    districtName: 'District 5',
    number: {
      SAFE: 0,
    },
  },
  {
    districtId: 6,
    districtName: 'District 6',
    number: {
      SAFE: 0,
    },
  },
  {
    districtId: 7,
    districtName: 'District 7',
    number: {
      SAFE: 0,
    },
  },
  {
    districtId: 8,
    districtName: 'District 8',
    number: {
      SAFE: 0,
    },
  },
  {
    districtId: 9,
    districtName: 'District 10',
    number: {
      SAFE: 0,
    },
  },
  {
    districtId: 10,
    districtName: 'District 11',
    number: {
      SAFE: 0,
    },
  },
  {
    districtId: 11,
    districtName: 'District 12',
    number: {
      SAFE: 0,
    },
  },
  {
    districtId: 12,
    districtName: 'Binh Thanh',
    number: {
      SAFE: 0,
    },
  },
  {
    districtId: 13,
    districtName: 'Go Vap',
    number: {
      SAFE: 0,
    },
  },
  {
    districtId: 14,
    districtName: 'Phu Nhuan',
    number: {
      SAFE: 0,
    },
  },
  {
    districtId: 15,
    districtName: 'Tan Binh',
    number: {
      SAFE: 0,
    },
  },
  {
    districtId: 16,
    districtName: 'Tan Phu',
    number: {
      SAFE: 0,
    },
  },
  {
    districtId: 17,
    districtName: 'Binh Tan',
    number: {
      SAFE: 0,
    },
  },
  {
    districtId: 18,
    districtName: 'Cu Chi',
    number: {
      SAFE: 0,
    },
  },
  {
    districtId: 19,
    districtName: 'Nha Be',
    number: {
      SAFE: 0,
    },
  },
  {
    districtId: 20,
    districtName: 'Can Gio',
    number: {
      SAFE: 0,
    },
  },
  {
    districtId: 21,
    districtName: 'Binh Chanh',
    number: {
      SAFE: 0,
    },
  },
  {
    districtId: 22,
    districtName: 'Hoc Mon',
    number: {
      SAFE: 0,
    },
  },
];



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
      borderBottom: `${rem(1)} solid ${theme.colorScheme === 'dark' ? theme.colors.dark[3] : theme.colors.gray[2]
        }`,
    },
  },

  scrolled: {
    boxShadow: theme.shadows.sm,
  },
}));


const DistrictSummary = () => {
  const searchHeatmapModalGlobalState = new SearchHeatmapModalGlobalState();
  const searchHeatmapModalUsecase = new SearchHeatmapModalInteractor(
    searchHeatmapModalGlobalState
  );
  const searchHeatmapModalController = new SearchHeatmapModalController(
    searchHeatmapModalUsecase
  );
  const { classes, cx } = useStyles();
  const [scrolled, setScrolled] = useState(false);
  const [districtSummary, setSummary] =
    useState<DistrictSummary[]>(mockDistrictStatus);
  const navigate = useNavigate();

  const [dashboardData, setDashboardData] = useState<{
    labels: string[];
    datasets: {
      data: number[];
    }[];
  }>({
    labels: [],
    datasets: [{ data: [] }],
  });

  useEffect(() => {
    const districtInp = getDistricts();
    getSummary(districtInp).then((tmp) => {
      console.log("get summary done")
      console.log(tmp)
      setSummary(tmp[0])
      const labels: string[] = []
      const datasets: number[] = []
      Object.entries(tmp[1]).forEach((val) => {
        labels.push(val[0]);
        datasets.push(val[1]);
      });
      setDashboardData({
        labels: labels,
        datasets: [{ data: datasets }]
      })
      console.log(dashboardData);
    }).catch((e) => console.log(e))
  }, []);


  return (
    <Container fluid>
      <PageTitle title={'District Summary'} />
      <Grid>
        <Modal
          opened={
            searchHeatmapModalController.getSearchHeatmapModalViewModel()
              .isModalOpened
          }
          onClose={() => searchHeatmapModalController.setIsModalOpened(false)}
          title={
            <Text color="dark.4" fw={900}>
              HCMC Mosquito Heatmap
            </Text>
          }
          centered={true}
          size={'90%'}
          xOffset={0}
        >
          <SearchHeatmapModal />
        </Modal>
        <Grid.Col lg={8} md={12}>
          <Paper withBorder p="md" radius="md" style={{ height: '50vh' }}>
            <VoveMap></VoveMap>
          </Paper>
        </Grid.Col>
        <Grid.Col lg={4} md={12}>
          <Paper withBorder p="md" radius="md" style={{ height: '50vh' }}>
            <Stack justify="center" h="100%">
              <DistrictStatusSummary
                data={dashboardData}
                isForDashboard={false}
              ></DistrictStatusSummary>
            </Stack>
          </Paper>
        </Grid.Col>

        <Grid.Col span={12}>
          <Paper withBorder radius="md">
            <ScrollArea h={250} onScrollPositionChange={({ y }) => setScrolled(y !== 0)}>
              <Table horizontalSpacing="md" verticalSpacing="xs" miw={700} highlightOnHover>
                <thead className={cx(classes.header, { [classes.scrolled]: scrolled })}>
                  <tr>
                    <th>Id</th>
                    <th>Tên huyện</th>
                    <th>Số lượng xã</th>
                    <th>Số lượng xã thuộc top 25%</th>
                    <th>Số lượng xã thuộc top 50%</th>
                    <th>Số lượng xã thuộc top 75%</th>
                  </tr>
                </thead>
                <tbody>
                  {districtSummary.length > 0 ? (
                    districtSummary.map((row) => (
                      <tr key={row.districtId} onClick={() => navigate(`/districts/${row.districtName}`)} style={{ cursor: "pointer" }}>
                        <td>{row.districtId}</td>
                        <td>{row.districtName}</td>
                        <td>{row.number["HIGH_RISK"] ?? 0}</td>
                        <td>{row.number["LOW_RISK"] ?? 0}</td>
                        <td>{row.number["NORMAL"]??0}</td>
                        <td>{row.number["SAFE"]??0}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <Text weight={500} align="center">
                        Nothing found
                      </Text>
                    </tr>
                  )}
                </tbody>
              </Table>
            </ScrollArea>
          </Paper>        </Grid.Col>
      </Grid>
    </Container>
  );
};

export default DistrictSummary;


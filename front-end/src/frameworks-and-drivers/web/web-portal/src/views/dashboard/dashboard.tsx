import {Button, Container, Grid, Modal, Paper, Stack, Text, Title} from '@mantine/core';
import {VoveMap} from "../../components/map/map";
import {PageTitle} from "../../components/page-title/page-title";
import React, {useEffect, useState} from "react";
import {LoadingWrapper} from "../../components/loading-wrapper/loading-wrapper";
import SearchHeatmapModal from "../../components/search-heatmap-modal/search-heatmap-modal";
import {SearchHeatmapModalController} from "@front-end/interface-adapters/controllers/sreach-heatmap-modal";
import {SearchHeatmapModalInteractor} from "@front-end/application/interactors/sreach-heatmap-modal";
import {SearchHeatmapModalGlobalState} from "@front-end/frameworks-and-drivers/global-states/sreach-heatmap-modal";
import DistrictStatusSummary from "../../components/district-status-summary/district-status-summary";
import StatsGirdIcons from "../../components/stats-grid-icons/stats-gird-icons";
import InquirySummary from "../../components/inquiry-summary/inquiry-summary";
import AppAnalysisSummary from "../../components/app-analysis-summary/app-analysis-summary";
import {InquiryViewModel} from "@front-end/interface-adapters/view-models/inquiry";
import {useNavigate} from "react-router-dom";
import {getDistricts, getRate} from '@front-end/shared/administrative-division';
import axios from 'axios';
import {Status} from "@front-end/domain/entities/inquiry";
import {InquiryApi} from "@front-end/frameworks-and-drivers/app-sync/inquiry";
import {InquiryRepository} from "@front-end/application/repositories/inquiry";
import {InquiryUsecases} from "@front-end/application/usecases/inquiry";
import {InquiryInteractors} from "@front-end/application/interactors/inquiry";
import {InquiryControllers} from "@front-end/interface-adapters/controllers/inquiry";

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
    idx?: number,
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
  let idx = 0
  inp.forEach((val, index) => {
    mapDistrict2Id = {
      ...mapDistrict2Id, [val.district_name]: index
    }
    val.wards.forEach((ward) => {
      idx += 1;
      body.locations.push({...ward, idx: idx})
      mapWard2District = {
        ...mapWard2District,
        [ward.locationCode]: val.district_name
      }
    })
  })
  let mapDist2NumberOfRecord: Record<string, Record<string, number>> = {}
  return axios
    .post<DistrictSummaryApiResponse>('/prediction/summary', body)
    .then((response) => {
      response.data.data.forEach((ward, index, _) => {
        const district = mapWard2District[ward.locationCode]
        const mapState2Number = mapDist2NumberOfRecord[district] ?? {[ward.rate]: 0}
        const numberOfStatus = mapState2Number[ward.rate] ? mapState2Number[ward.rate] + 1 : 1
        mapDist2NumberOfRecord = {
          ...mapDist2NumberOfRecord,
          [district]: {...mapDist2NumberOfRecord[district], [ward.rate]: numberOfStatus}
        }
        mapRate2Number = {
          ...mapRate2Number,
          [ward.rate]: mapRate2Number[ward.rate] ? mapRate2Number[ward.rate] + 1 : 1
        }
      });
      return [Object.entries(mapDist2NumberOfRecord).map((val) => {
        return {districtId: mapDistrict2Id[val[0]], districtName: val[0], number: val[1]}
      }), mapRate2Number]
    })
};


export type TDashboardDataMap = Record<string, number>

export const Dashboard = () => {
  const [loading, setLoading] = useState(false);
  const [inquiries, setInquiries] = useState<InquiryViewModel[]>([]);

  const navigator = useNavigate();

  const searchHeatmapModalGlobalState = new SearchHeatmapModalGlobalState()
  const searchHeatmapModalUsecase = new SearchHeatmapModalInteractor(searchHeatmapModalGlobalState)
  const searchHeatmapModalController = new SearchHeatmapModalController(searchHeatmapModalUsecase)

  const inquiryRepository: InquiryRepository = new InquiryApi();
  const inquiryUseCase: InquiryUsecases = new InquiryInteractors(inquiryRepository);
  const inquiryController: InquiryControllers = new InquiryControllers(inquiryUseCase);

  const [dashboardData, setDashboardData] = useState<{
    labels: string[];
    datasets: {
      data: number[];
    }[];
  }>({
    labels: [],
    datasets: [{data: []}],
  });
  const fetchInquiries = async () => {
    const inquiryList = await inquiryController.getInquiries();
    inquiryList.inquiries.map((inquiry) => {
      inquiry.author = "Phạm Hoàng Vũ";
      return inquiry;
    })
    setInquiries([inquiryList.inquiries[0], inquiryList.inquiries[1]]);
  }
  useEffect(() => {
    setLoading(true);
    //TODO: catch loading API state
    fetchInquiries();
    const timer = setTimeout(() => setLoading(false), 300);
    const districtInp = getDistricts();
    getSummary(districtInp).then((tmp) => {
      const labels: string[] = []
      const datasets: number[] = []
      Object.entries(tmp[1]).forEach((val) => {
        labels.push(val[0]);
        datasets.push(val[1]);
      });
      setDashboardData({
        labels: labels.map((value) => getRate(value)),
        datasets: [{data: datasets}]
      })
    }).catch((e) => console.log(e))
    return () => clearTimeout(timer)
  }, []);


  return (<Container size="xl" fluid={true}>
    <PageTitle title="Tổng quan"/>
    <Grid>
      <Grid.Col md={6} lg={4}>
        <LoadingWrapper
          loading={loading}
          view_height={"15vh"}
          children={<Paper withBorder p="md" radius="md" h={"13.5vh"}>
            <StatsGirdIcons data={{title: "Người dùng", value: "15", diff: 100}} nav={'users'}></StatsGirdIcons>
          </Paper>}
        />
      </Grid.Col>

      <Grid.Col md={6} lg={4}>
        <LoadingWrapper
          loading={loading}
          view_height={"15vh"}
          children={<Paper withBorder p="md" radius="md" h={"13.5vh"}>
            <StatsGirdIcons data={{title: "Phản hồi", value: "20", diff: 100}}
                            nav={'/model-management'}></StatsGirdIcons>
          </Paper>}
        />
      </Grid.Col>

      <Grid.Col md={6} lg={4}>
        <LoadingWrapper
          loading={loading}
          view_height={"15vh"}
          children={<Paper withBorder p="md" radius="md" h={"13.5vh"}>
            <AppAnalysisSummary data={{access: 20, tracking: 30, inquiries: 6}}></AppAnalysisSummary>
          </Paper>}
        />
      </Grid.Col>

      <Grid.Col md={6} lg={8}>
        <LoadingWrapper
          loading={loading}
          view_height={"65vh"}
          children={<Paper withBorder p="md" radius="md" style={{height: "65vh"}}>
            <VoveMap></VoveMap>
          </Paper>}
        />
      </Grid.Col>
      <Grid.Col md={6} lg={4}>
        <Stack h={"65vh"}>
          <LoadingWrapper
            loading={loading}
            view_height={"50%"}
            children={<Paper withBorder p="md" radius="md" style={{height: "50%"}}>
              <DistrictStatusSummary data={dashboardData} isForDashboard={true}></DistrictStatusSummary>
            </Paper>}
          />
          <LoadingWrapper
            loading={loading}
            view_height={"50%"}
            children={<Paper withBorder p="md" radius="md" style={{height: "50%"}}>
              <Stack justify="space-between" align="flex-start" h="100%">
                <Title fw={500} fz="lg" order={4} color="dark.4">Yêu cầu hỗ trợ</Title>
                <InquirySummary inquiries={inquiries}></InquirySummary>
                <Button variant={"light"} size="sm" mt={0} style={{bottom: 0}} onClick={() => navigator("inquiries")}>
                  Xem tất cả</Button>
              </Stack>
            </Paper>}
          />
        </Stack>
      </Grid.Col>
    </Grid>
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
  </Container>);
}

export default Dashboard;

import {ActionIcon, Button, Container, Grid, Modal, Paper, Stack, Text, Title} from '@mantine/core';
import {Map} from "../../components/map/map";
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

export const Dashboard = () => {
  const [loading, setLoading] = useState(false);
  const [inquiries, setInquiries] = useState<InquiryViewModel[]>([]);

  const searchHeatmapModalGlobalState = new SearchHeatmapModalGlobalState()
  const searchHeatmapModalUsecase = new SearchHeatmapModalInteractor(searchHeatmapModalGlobalState)
  const searchHeatmapModalController = new SearchHeatmapModalController(searchHeatmapModalUsecase)

  const mockInquiries: InquiryViewModel[] = [
    {
      id: "1",
      username: "Nguyen Mai Thy",
      timestamp: "03/05/2023 15:15",
      address: "Address 1",
      details: "The predict results at my living area is incorrect",
      status: "Opening"
    },
    {
      id: "2",
      username: "Le Tran Hoang Thinh",
      timestamp: "03/05/2023 15:15",
      address: "Address 2",
      details: "I can't find my place on your map",
      status: "Closed"
    }
  ]

  const fetchInquiries = async () => {
    setInquiries(mockInquiries);
  }

  useEffect(() => {
    setLoading(true);
    //TODO: catch loading API state
    fetchInquiries();
    const timer = setTimeout(() => setLoading(false), 300);
    return () => clearTimeout(timer)
  }, [])

  return (<Container size="xl" fluid={true}>
    <PageTitle title="Dash Board"/>
    <Grid>
      <Grid.Col md={6} lg={4}>
        <LoadingWrapper
          loading={loading}
          view_height={"15vh"}
          children={<Paper withBorder p="md" radius="md" h={"13.5vh"}>
            <StatsGirdIcons data={{title: "User", value: "1000", diff: 1}} nav={'users'}></StatsGirdIcons>
          </Paper>}
        />
      </Grid.Col>

      <Grid.Col md={6} lg={4}>
        <LoadingWrapper
          loading={loading}
          view_height={"15vh"}
          children={<Paper withBorder p="md" radius="md" h={"13.5vh"}>
            <StatsGirdIcons data={{title: "Model feedback", value: "4.2", diff: 3}}
                            nav={'/model-management'}></StatsGirdIcons>
          </Paper>}
        />
      </Grid.Col>

      <Grid.Col md={6} lg={4}>
        <LoadingWrapper
          loading={loading}
          view_height={"15vh"}
          children={<Paper withBorder p="md" radius="md" h={"13.5vh"}>
            <AppAnalysisSummary data={{access: 20, tracking: 200, inquiries: 20}}></AppAnalysisSummary>
          </Paper>}
        />
      </Grid.Col>

      <Grid.Col md={6} lg={8}>
        <LoadingWrapper
          loading={loading}
          view_height={"65vh"}
          children={<Paper withBorder p="md" radius="md" style={{height: "65vh"}}>
            <Map></Map>
          </Paper>}
        />
      </Grid.Col>
      <Grid.Col md={6} lg={4}>
        <Stack h={"65vh"}>
          <LoadingWrapper
            loading={loading}
            view_height={"50%"}
            children={<Paper withBorder p="md" radius="md" style={{height: "50%"}}>
              <DistrictStatusSummary isForDashboard={true}></DistrictStatusSummary>
            </Paper>}
          />
          <LoadingWrapper
            loading={loading}
            view_height={"50%"}
            children={<Paper withBorder p="md" radius="md" style={{height: "50%"}}>
              <Stack justify="space-between" align="flex-start" h="100%">
                <Title fw={500} fz="lg" order={4} color="dark.4">Inquiries (1 opening)</Title>
                <InquirySummary inquiries={inquiries}></InquirySummary>
                <Button variant={"light"} size="sm" mt={0} style={{bottom: 0}}>Inquiries List</Button>
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

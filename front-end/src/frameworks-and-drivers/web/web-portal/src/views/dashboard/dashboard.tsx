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

export const Dashboard = () => {
  const [loading, setLoading] = useState(false);

  const searchHeatmapModalGlobalState = new SearchHeatmapModalGlobalState()
  const searchHeatmapModalUsecase = new SearchHeatmapModalInteractor(searchHeatmapModalGlobalState)
  const searchHeatmapModalController = new SearchHeatmapModalController(searchHeatmapModalUsecase)

  useEffect(() => {
    setLoading(true);
    //TODO: catch loading API state
    const timer = setTimeout(() => setLoading(false), 1000);
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
            <StatsGirdIcons data={{title: "User", value: "1000", diff: 1}}></StatsGirdIcons>
          </Paper>}
        />
      </Grid.Col>

      <Grid.Col md={6} lg={4}>
        <LoadingWrapper
          loading={loading}
          view_height={"15vh"}
          children={<Paper withBorder p="md" radius="md" h={"13.5vh"}>
            <StatsGirdIcons data={{title: "Model feedback", value: "4.2", diff: 3}}></StatsGirdIcons>
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
                <InquirySummary></InquirySummary>
                <Button variant={"light"} size="sm" mt={0} style={{bottom: 0}}>Inquiries List</Button>
              </Stack>
            </Paper>}
          />
        </Stack>
      </Grid.Col>
    </Grid>
    {/*<Grid>*/}
    {/*  <Grid.Col md={6} lg={8}>*/}
    {/*    <LoadingWrapper*/}
    {/*      loading={loading}*/}
    {/*      children={<Paper withBorder p="md" radius="md" style={{height: "40vh"}}>*/}
    {/*        <Map></Map>*/}
    {/*      </Paper>}*/}
    {/*    />*/}
    {/*  </Grid.Col>*/}
    {/*  <Grid.Col md={6} lg={4}>*/}
    {/*    <LoadingWrapper*/}
    {/*      loading={loading}*/}
    {/*      children={<Paper withBorder p="md" radius="md" style={{height: "40vh"}}>*/}
    {/*        /!*<Title order={4} color="dark.4">HCMC Summary</Title>*!/*/}
    {/*        <Stack justify="space-between" align="flex-start" h="100%">*/}
    {/*          <div style={{*/}
    {/*            height: "70%",*/}
    {/*            width: "100%",*/}
    {/*            display: "flex",*/}
    {/*            justifyContent: "space-around",*/}
    {/*            alignItems: "center",*/}
    {/*            paddingTop: 30*/}
    {/*          }}>*/}
    {/*            <Stack h={"100%"} justify={"center"}>*/}
    {/*              /!*<Title fw={500} fz="lg" order={4} color="dark.4">HCMC Summary</Title>*!/*/}
    {/*              <div>*/}
    {/*                <Text mt={30} fz={rem(25)} fw={700} c={"dark.4"}>24</Text>*/}
    {/*                <Text fz="xs" color="dimmed">Districts tracked</Text>*/}
    {/*              </div>*/}
    {/*              <Group mt={"lg"}>*/}
    {/*                <div>*/}
    {/*                  <Text fz="lg" fw={700} c={"dark.4"}>18</Text>*/}
    {/*                  <Text fz="xs" color="dimmed">Normal</Text>*/}
    {/*                </div>*/}
    {/*                <div>*/}
    {/*                  <Text size="lg" fw={700} c={"dark.4"}>6</Text>*/}
    {/*                  <Text size="xs" color="dimmed">High risk</Text>*/}
    {/*                </div>*/}
    {/*              </Group>*/}
    {/*            </Stack>*/}
    {/*            <Pie*/}
    {/*              data={data}*/}
    {/*              options={{*/}
    {/*                plugins: {*/}
    {/*                  legend: {*/}
    {/*                    position: "bottom",*/}
    {/*                  }*/}
    {/*                }*/}
    {/*              }}*/}
    {/*            />*/}
    {/*          </div>*/}
    {/*          <Button variant={"outline"} size="sm" mt={0} style={{bottom: 0}}>Learn more</Button>*/}
    {/*        </Stack>*/}
    {/*      </Paper>}*/}
    {/*    />*/}
    {/*  </Grid.Col>*/}
    {/*  <Grid.Col md={6} lg={4}>*/}
    {/*    /!*<Stack h={"40vh"} align="stretch">*!/*/}
    {/*    /!*  <LoadingWrapper*!/*/}
    {/*    /!*    loading={loading}*!/*/}
    {/*    /!*    children={<Paper withBorder p="md" radius="md" h={"100%"}>*!/*/}
    {/*    /!*      <Stack justify="space-between" align="flex-start" h="100%">*!/*/}
    {/*    /!*      <div>*!/*/}
    {/*    /!*        <Text mt={15} fz={rem(25)} fw={700} c={"dark.4"}>120</Text>*!/*/}
    {/*    /!*        <Text fz="xs" color="dimmed">Application users</Text>*!/*/}
    {/*    /!*      </div>*!/*/}
    {/*    /!*        <Button variant={"outline"} size="sm" mt={0} style={{bottom: 0}}>Manage User</Button>*!/*/}
    {/*    /!*      </Stack>*!/*/}
    {/*    /!*    </Paper>}*!/*/}
    {/*    /!*  />*!/*/}
    {/*    /!*  <LoadingWrapper*!/*/}
    {/*    /!*    loading={loading}*!/*/}
    {/*    /!*    children={<Paper withBorder p="md" radius="md" h={"100%"}>*!/*/}

    {/*    /!*    </Paper>}*!/*/}
    {/*    /!*  />*!/*/}
    {/*    /!*</Stack>*!/*/}
    {/*    <LoadingWrapper*/}
    {/*      loading={loading}*/}
    {/*      children={<Paper withBorder p="md" radius="md" style={{height: "40vh"}}>*/}
    {/*        <Stack justify="space-between" align="flex-start" h="100%">*/}
    {/*          <Title fw={500} fz="lg" order={4} color="dark.4">App Analysis</Title>*/}
    {/*          <div>*/}
    {/*            <Text fz="lg" fw={700} c={"dark.4"}>1200</Text>*/}
    {/*            <Text fz="xs" color="dimmed">Application users</Text>*/}
    {/*          </div>*/}
    {/*            <div>*/}
    {/*              <Text fz="lg" fw={700} c={"dark.4"}>100</Text>*/}
    {/*              <Text fz="xs" color="dimmed">Accesses today</Text>*/}
    {/*            </div>*/}
    {/*            <div>*/}
    {/*              <Text size="lg" fw={700} c={"dark.4"}>234</Text>*/}
    {/*              <Text size="xs" color="dimmed">Tracking points</Text>*/}
    {/*            </div>*/}
    {/*            <div>*/}
    {/*              <Text size="lg" fw={700} c={"dark.4"}>100</Text>*/}
    {/*              <Text size="xs" color="dimmed">Inquiries sent</Text>*/}
    {/*            </div>*/}
    {/*          <Group>*/}
    {/*            <Button variant={"outline"} size="sm" mt={0} style={{bottom: 0}}>Learn more</Button>*/}
    {/*            <Button variant={"outline"} size="sm" mt={0} style={{bottom: 0}}>Manage User</Button>*/}
    {/*          </Group>*/}
    {/*        </Stack>*/}
    {/*      </Paper>}*/}
    {/*    />*/}
    {/*  </Grid.Col>*/}
    {/*  <Grid.Col md={6} lg={4}>*/}
    {/*    <LoadingWrapper*/}
    {/*      loading={loading}*/}
    {/*      children={<Paper withBorder p="md" radius="md" style={{height: "40vh"}}>*/}
    {/*        <Stack justify="space-between" align="flex-start" h="100%">*/}
    {/*          <Title fw={500} fz="lg" order={4} color="dark.4">Model</Title>*/}
    {/*          <Button variant={"outline"} size="sm" mt={0} style={{bottom: 0}}>Learn more</Button>*/}
    {/*        </Stack>*/}
    {/*      </Paper>}*/}
    {/*    />*/}
    {/*  </Grid.Col>*/}
    {/*  <Grid.Col md={6} lg={4}>*/}
    {/*    <LoadingWrapper*/}
    {/*      loading={loading}*/}
    {/*      children={<Paper withBorder p="md" radius="md" style={{height: "40vh"}}>*/}
    {/*        <Stack justify="space-between" align="flex-start" h="100%">*/}
    {/*          <Title fw={500} fz="lg" order={4} color="dark.4">Inquiries (1 opening)</Title>*/}
    {/*          <InquirySummary></InquirySummary>*/}
    {/*          <Button variant={"outline"} size="sm" mt={0} style={{bottom: 0}}>Inquiries List</Button>*/}
    {/*        </Stack>*/}
    {/*      </Paper>}*/}
    {/*    />*/}
    {/*  </Grid.Col>*/}
    {/*</Grid>*/}
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

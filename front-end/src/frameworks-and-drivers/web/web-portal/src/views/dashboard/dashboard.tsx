import {Button, Container, Grid, Modal, Paper, Stack, Text, Title} from '@mantine/core';
import {Map} from "../../components/map/map";
import {PageTitle} from "../../components/page-title/page-title";
import React, {useEffect, useState} from "react";
import {LoadingWrapper} from "../../components/loading-wrapper/loading-wrapper";
import SearchHeatmapModal from "../../components/search-heatmap-modal/search-heatmap-modal";
import {SearchHeatmapModalController} from "@front-end/interface-adapters/controllers/sreach-heatmap-modal";
import {SearchHeatmapModalInteractor} from "@front-end/application/interactors/sreach-heatmap-modal";
import {SearchHeatmapModalGlobalState} from "@front-end/frameworks-and-drivers/global-states/sreach-heatmap-modal";
import InquirySummary from "../../components/inquiry-summary/inquiry-summary";

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
        <Grid.Col md={6} lg={8}>
          <LoadingWrapper
            loading={loading}
            children={<Paper withBorder p="md" radius="md" style={{height: "40vh"}}>
              <Map></Map>
            </Paper>}
          />
        </Grid.Col>
        <Grid.Col md={6} lg={4}>
          <LoadingWrapper
            loading={loading}
            children={<Paper withBorder p="md" radius="md" style={{height: "40vh"}}>
              {/*<Title order={4} color="dark.4">HCMC Summary</Title>*/}
            </Paper>}
          />
        </Grid.Col>
        <Grid.Col md={6} lg={4}>
          <LoadingWrapper
            loading={loading}
            children={<Paper withBorder p="md" radius="md" style={{height: "40vh"}}>
              {/*<Title fw={900} order={4} color="dark.4">App Analysis</Title>*/}
            </Paper>}
          />
        </Grid.Col>
        <Grid.Col md={6} lg={4}>
          <LoadingWrapper
            loading={loading}
            children={<Paper withBorder p="md" radius="md" style={{height: "40vh"}}>
              {/*<Title order={4} color="dark.4">Model Management</Title>*/}
            </Paper>}
          />
        </Grid.Col>
        <Grid.Col md={6} lg={4}>
          <LoadingWrapper
            loading={loading}
            children={<Paper withBorder p="md" radius="md" style={{height: "40vh"}}>
              <Stack justify="space-between" align="flex-start" h="100%">
                <Title fw={500} fz="lg" order={4} color="dark.4">Inquiries</Title>
                <InquirySummary></InquirySummary>
                <Button variant="outline" size="sm" mt={0} style={{bottom: 0}}>Learn more</Button>
              </Stack>
            </Paper>}
          />
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

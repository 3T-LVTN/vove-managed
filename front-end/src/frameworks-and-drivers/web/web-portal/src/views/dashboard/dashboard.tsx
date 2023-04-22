import {Grid, Container, Title, Paper, Modal, Text} from '@mantine/core';
import {Map} from "../../components/map/map";
import {PageTitle} from "../../components/page-title/page-title";
import React, {useEffect, useState} from "react";
import {LoadingWrapper} from "../../components/loading-wrapper/loading-wrapper";
import SearchHeatmapModal from "../../components/search-heatmap-modal/search-heatmap-modal";
import {SearchHeatmapModalController} from "@front-end/interface-adapters/controllers/sreach-heatmap-modal";
import {SearchHeatmapModalInteractor} from "@front-end/application/interactors/sreach-heatmap-modal";
import {SearchHeatmapModalGlobalState} from "@front-end/frameworks-and-drivers/global-states/sreach-heatmap-modal";

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

  return (
  <Container size="xl" fluid={true}>
    <PageTitle title="Dash Board" />
    <Grid>
        <Grid.Col md={6} lg={8}>
          <LoadingWrapper
            loading={loading}
            children={
            <Paper shadow="xs" p="md" style={{height:"40vh"}}>
              <Map></Map>
            </Paper>}
          />
        </Grid.Col>
        <Grid.Col md={6} lg={4}>
          <LoadingWrapper loading={loading} children={<Paper shadow="xs" p="md" style={{height:"40vh"}}></Paper>} />
        </Grid.Col>
        <Grid.Col md={6} lg={4}>
          <LoadingWrapper loading={loading} children={<Paper shadow="xs" p="md" style={{height:"40vh"}}></Paper>} />
        </Grid.Col>
        <Grid.Col md={6} lg={4}>
          <LoadingWrapper loading={loading} children={<Paper shadow="xs" p="md" style={{height:"40vh"}}></Paper>} />
        </Grid.Col>
        <Grid.Col md={6} lg={4}>
          <LoadingWrapper loading={loading} children={<Paper shadow="xs" p="md" style={{height:"40vh"}}></Paper>} />
        </Grid.Col>
      </Grid>
    <Modal
      opened={searchHeatmapModalController.getSearchHeatmapModalViewModel().isModalOpened}
      onClose={() => searchHeatmapModalController.setIsModalOpened(false)}
      title={<Text color="dark.4" fw={700}>HCMC Mosquito Heatmap</Text>}
      centered={true}
      size={"90%"}
      xOffset={0}
    >
      <SearchHeatmapModal/>
    </Modal>
    </Container>
  );
}

export default Dashboard;

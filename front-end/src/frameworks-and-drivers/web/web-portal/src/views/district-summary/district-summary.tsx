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
import {Map} from "../../components/map/map";
import SearchHeatmapModal from "../../components/search-heatmap-modal/search-heatmap-modal";
import React, {useState} from "react";
import {SearchHeatmapModalGlobalState} from "@front-end/frameworks-and-drivers/global-states/sreach-heatmap-modal";
import {SearchHeatmapModalInteractor} from "@front-end/application/interactors/sreach-heatmap-modal";
import {SearchHeatmapModalController} from "@front-end/interface-adapters/controllers/sreach-heatmap-modal";
import DistrictStatusSummary from "../../components/district-status-summary/district-status-summary";
import {NavLink} from "react-router-dom";

interface DistrictStatus {
  districtId: number;
  districtName: string;
  status: "Good" | "Low Risk" | "High Risk" | "Epidemic";
}

const mockDistrictStatus: DistrictStatus[] = [
  {
    districtId: 1,
    districtName: "Thủ Đức",
    status: "Good"
  },
  {
    districtId: 2,
    districtName: "Quận 1",
    status: "Good"
  },
  {
    districtId: 3,
    districtName: "Quận 3",
    status: "Low Risk"
  },
  {
    districtId: 4,
    districtName: "Quận 4",
    status: "High Risk"
  },
  {
    districtId: 5,
    districtName: "Quận 5",
    status: "Epidemic"
  },
  {
    districtId: 6,
    districtName: "Quận 6",
    status: "Good"
  },
  {
    districtId: 7,
    districtName: "Quận 7",
    status: "Good"
  },
  {
    districtId: 8,
    districtName: "Quận 8",
    status: "Good"
  },
  {
    districtId: 9,
    districtName: "Quận 10",
    status: "Good"
  },
  {
    districtId: 10,
    districtName: "Quận 11",
    status: "Good"
  },
  {
    districtId: 11,
    districtName: "Quận 12",
    status: "Good"
  },
  {
    districtId: 12,
    districtName: "Bình Thạnh",
    status: "Good"
  },
  {
    districtId: 13,
    districtName: "Gò Vấp",
    status: "Good"
  },
  {
    districtId: 14,
    districtName: "Phú Nhuận",
    status: "Good"
  },
  {
    districtId: 15,
    districtName: "Tân Bình",
    status: "Good"
  },
  {
    districtId: 16,
    districtName: "Tân Phú",
    status: "Good"
  },
  {
    districtId: 17,
    districtName: "Bình Tân",
    status: "Good"
  },
  {
    districtId: 18,
    districtName: "Củ Chi",
    status: "Good"
  },
  {
    districtId: 19,
    districtName: "Nhà Bè",
    status: "Good"
  },
  {
    districtId: 20,
    districtName: "Cần Giờ",
    status: "Good"
  },
  {
    districtId: 21,
    districtName: "Bình Chánh",
    status: "Good"
  },
  {
    districtId: 22,
    districtName: "Hóc Môn",
    status: "Good"
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
                         color={districtStatus.status === "Epidemic" ? "red" : (
                           districtStatus.status === "High Risk" ? "orange" : (
                             districtStatus.status === "Low Risk" ? "yellow" : ""
                           ))}
              >
              </ThemeIcon>
              <Text fw={700} size="lg">{districtStatus.districtName}</Text>
            </Group>
            <Badge variant="light" size="lg" color={districtStatus.status === "Epidemic" ? "red" : (
              districtStatus.status === "High Risk" ? "orange" : (
                districtStatus.status === "Low Risk" ? "yellow" : ""
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

  const districtsStatusAll = mockDistrictStatus;
  const districtsStatusGood = mockDistrictStatus.filter((districtStatus) => districtStatus.status === "Good");
  const districtsStatusLowRisk = mockDistrictStatus.filter((districtStatus) => districtStatus.status === "Low Risk");
  const districtsStatusHighRisk = mockDistrictStatus.filter((districtStatus) => districtStatus.status === "High Risk");
  const districtsStatusEpidemic = mockDistrictStatus.filter((districtStatus) => districtStatus.status === "Epidemic");

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
            <Map></Map>
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

              <Tabs.Tab value="good" rightSection={
                <Badge w={16} h={16} size="xs" p={0} sx={{pointerEvents: 'none'}}
                       variant="filled" color={activeTab === "good" ? "" : "gray"}>
                  {districtsStatusGood.length}
                </Badge>
              }>
                Good
              </Tabs.Tab>

              <Tabs.Tab value={"low-risk"} rightSection={
                <Badge w={16} h={16} size="xs" p={0} sx={{pointerEvents: 'none'}}
                       variant="filled" color={activeTab === "low-risk" ? "" : "gray"}>
                  {districtsStatusLowRisk.length}
                </Badge>
              }>
                Low Risk
              </Tabs.Tab>

              <Tabs.Tab value={"high-risk"} rightSection={
                <Badge w={16} h={16} size="xs" p={0} sx={{pointerEvents: 'none'}}
                       variant="filled" color={activeTab === "high-risk" ? "" : "gray"}>
                  {districtsStatusHighRisk.length}
                </Badge>
              }>
                High Risk
              </Tabs.Tab>

              <Tabs.Tab value={"epidemic"} rightSection={
                <Badge w={16} h={16} size="xs" p={0} sx={{pointerEvents: 'none'}}
                       variant="filled" color={activeTab === "epidemic" ? "" : "gray"}>
                  {districtsStatusEpidemic.length}
                </Badge>
              }>
                Epidemic
              </Tabs.Tab>
            </Tabs.List>

            <Tabs.Panel value={"all"} pt="md">
              <DistrictList districts={districtsStatusAll}/>
            </Tabs.Panel>

            <Tabs.Panel value={"good"} pt="md">
              <DistrictList districts={districtsStatusGood}/>
            </Tabs.Panel>

            <Tabs.Panel value={"low-risk"} pt="md">
              <DistrictList districts={districtsStatusLowRisk}/>
            </Tabs.Panel>

            <Tabs.Panel value={"high-risk"} pt="md">
              <DistrictList districts={districtsStatusHighRisk}/>
            </Tabs.Panel>

            <Tabs.Panel value={"epidemic"} pt="md">
              <DistrictList districts={districtsStatusEpidemic}/>
            </Tabs.Panel>
          </Tabs>
        </Grid.Col>
      </Grid>
    </Container>
  );
}

export default DistrictSummary;

import {Button, Container, Grid, Group, Select, Tabs, Text} from "@mantine/core";
import {PageTitle} from "../../components/page-title/page-title";
import {useEffect, useState} from "react";
import BarChart from "../../components/bar-chart/bar-chart";
import StyledTabs from "../../components/styled-tabs/styled-tabs";
import AppAnalysisByPlace from "../../components/app-analysis-by-place/app-analysis-by-place";
import AppAnalysisByTime from "../../components/app-analysis-by-time/app-analysis-by-time";

const AppAnalysis = () => {
  const [viewBy, setViewBy] = useState<string | null>("place")

  return (
    <Container fluid>

      <StyledTabs value={viewBy} onTabChange={setViewBy}>
        <Grid>
          <Grid.Col span={12}>
            <Group position={"apart"}>
              <PageTitle title={"App Analysis" + (viewBy === "place" ? " - Places" : " - Time")}/>
              <Tabs.List>
                <Tabs.Tab value="place">
                  <Text fw={700} size="md">
                    By Places
                  </Text>
                </Tabs.Tab>
                <Tabs.Tab value="time">
                  <Text fw={700} size="md">
                    By Time
                  </Text>
                </Tabs.Tab>
              </Tabs.List>
            </Group>
          </Grid.Col>
          <Grid.Col span={12}>
            <Group position={"left"}>
              <Select
                placeholder="Choose time period"
                data={[
                  {value: '1d', label: '1 day'},
                  {value: '1w', label: '1 week'},
                  {value: '1m', label: '1 month'},
                  {value: '3m', label: '3 months'},
                  {value: '6m', label: '6 months'},
                  {value: '1y', label: '1 year (default)', selected: true},
                  {value: 'all', label: 'All time'}
                ]}
              />
              {viewBy === "place" ?
                <Select
                  placeholder="Choose area"
                  data={[
                    {value: '1', label: 'Thu Duc City', selected: true},
                    {value: '2', label: 'District 1'},
                    {value: '3', label: 'District 3'},
                    {value: '4', label: 'District 4'},
                    {value: '5', label: 'District 5'},
                    {value: '6', label: 'District 6'},
                    {value: '7', label: 'District 7'},
                    {value: '8', label: 'District 8'},
                    {value: '9', label: 'District 10'},
                    {value: '10', label: 'District 11'},
                    {value: '11', label: 'District 12'},
                    {value: '12', label: 'Hoc Mon'},
                  ]}
                />
                :
                null
              }
              <Button variant={"light"}>
                Apply
              </Button>
            </Group>
          </Grid.Col>
          <Grid.Col span={12}>
            <Tabs.Panel value={"place"}>
              <AppAnalysisByPlace/>
            </Tabs.Panel>
            <Tabs.Panel value={"time"}>
              <AppAnalysisByTime/>
            </Tabs.Panel>
          </Grid.Col>
        </Grid>
      </StyledTabs>
    </Container>
  );
};

export default AppAnalysis;

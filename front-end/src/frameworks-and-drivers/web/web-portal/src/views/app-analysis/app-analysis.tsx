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
              <PageTitle title={"Thống kê sử dụng ứng dụng" + (viewBy === "place" ? " theo khu vực" : " theo thời gian")}/>
              <Tabs.List>
                <Tabs.Tab value="place">
                  <Text fw={700} size="md">
                    Khu vực
                  </Text>
                </Tabs.Tab>
                <Tabs.Tab value="time">
                  <Text fw={700} size="md">
                    Thời gian
                  </Text>
                </Tabs.Tab>
              </Tabs.List>
            </Group>
          </Grid.Col>
          <Grid.Col span={12}>
            <Group position={"left"}>
              <Select
                placeholder="Chọn khoảng thời gian"
                data={[
                  {value: '1d', label: '1 ngày'},
                  {value: '1w', label: '1 tuần'},
                  {value: '1m', label: '1 tháng'},
                  {value: '3m', label: '3 tháng'},
                  {value: '6m', label: '6 tháng'},
                  {value: '1y', label: '1 năm', selected: true},
                  {value: 'all', label: 'Tất cả'}
                ]}
              />
              {viewBy === "place" ?
                <Select
                  placeholder="Chọn khu vực"
                  data={[
                    {value: '1', label: 'Thành phố Thủ Đức', selected: true},
                    {value: '2', label: 'Quận 1'},
                    {value: '3', label: 'Quận 3'},
                    {value: '4', label: 'Quận 4'},
                    {value: '5', label: 'Quận 5'},
                    {value: '6', label: 'Quận 6'},
                    {value: '7', label: 'Quận 7'},
                    {value: '8', label: 'Quận 8'},
                    {value: '9', label: 'Quận 10'},
                    {value: '10', label: 'Quận 11'},
                    {value: '11', label: 'Quận 12'},
                    {value: '12', label: 'Hóc Môn'},
                  ]}
                />
                :
                null
              }
              <Button variant={"light"}>
                Áp dụng
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

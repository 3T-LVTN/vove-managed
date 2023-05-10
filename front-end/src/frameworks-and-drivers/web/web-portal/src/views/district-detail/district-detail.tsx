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
import React, {useState} from "react";
import {useNavigate} from "react-router-dom";

interface WardStatus {
  id: string;
  wardName: string;
  status: string;
  mosquitoAmount: number;
  rainMeter: number;
  temperature: number;
}

const mockData: WardStatus[] = [
  {
    id: "1",
    wardName: "Ward 1",
    status: "Epidemic",
    mosquitoAmount: 236,
    rainMeter: 36,
    temperature: 37,
  },
  {
    id: "2",
    wardName: "Ward 2",
    status: "Low Risk",
    mosquitoAmount: 178,
    rainMeter: 78,
    temperature: 36,
  },
  {
    id: "3",
    wardName: "Ward 3",
    status: "High Risk",
    mosquitoAmount: 213,
    rainMeter: 59,
    temperature: 29,
  },
  {
    id: "4",
    wardName: "Ward 4",
    status: "Good",
    mosquitoAmount: 153,
    rainMeter: 92,
    temperature: 32,
  },
  {
    id: "5",
    wardName: "Ward 5",
    status: "Good",
    mosquitoAmount: 98,
    rainMeter: 76,
    temperature: 35,
  },
  {
    id: "6",
    wardName: "Ward 6",
    status: "Good",
    mosquitoAmount: 125,
    rainMeter: 89,
    temperature: 33,
  },
  {
    id: "7",
    wardName: "Ward 7",
    status: "Good",
    mosquitoAmount: 142,
    rainMeter: 92,
    temperature: 39,
  },
  {
    id: "8",
    wardName: "Ward 8",
    status: "High Risk",
    mosquitoAmount: 213,
    rainMeter: 46,
    temperature: 32,
  },
  {
    id: "9",
    wardName: "Ward 9",
    status: "Good",
    mosquitoAmount: 129,
    rainMeter: 69,
    temperature: 35,
  }
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

  const [scrolled, setScrolled] = useState(false);

  const navigate = useNavigate();

  const rows = mockData.map((row) => (
    <tr key={row.id} onClick={() => navigate(`wards/${row.id}`)} style={{cursor: "pointer"}}>
      <td>{row.id}</td>
      <td>{row.wardName}</td>
      <td>{row.mosquitoAmount}</td>
      <td>{row.rainMeter}</td>
      <td>{row.temperature}</td>
      <td>
        <Badge variant="light" size="lg" color={row.status === "Epidemic" ? "red" : (
          row.status === "High Risk" ? "orange" : (
            row.status === "Low Risk" ? "yellow" : ""
          ))}>
          {row.status}
        </Badge>
      </td>
    </tr>
  ));

  const labels = mockData.map((districtStatus) => districtStatus.wardName);
  const date = new Date();
  const time = date.toLocaleTimeString() + " - " + date.toLocaleDateString();
  
  return (
    <Container fluid>
      <PageTitle title={"District 1"}/>
      <Group mb="md">
        <Button variant={"light"} color="yellow" onClick={() => navigate("../districts")}>
          Back to All places
        </Button>
        <Button variant={"light"} onClick={() => window.location.reload()}>
          Reload
        </Button>
        <Text size="md">
          Last updated:<b> {time}</b>
        </Text>
      </Group>
      <Grid>
        <Grid.Col sm={12} md={4}>
          <Paper withBorder radius="md" p="md" h="50vh">
            <PieChart labels={["Good", "Low Risk", "High Risk", "Epidemic"]}
                      data={[mockData.filter((ward) => ward.status === "Good").length,
                        mockData.filter((ward) => ward.status === "Low Risk").length,
                        mockData.filter((ward) => ward.status === "High Risk").length,
                        mockData.filter((ward) => ward.status === "Epidemic").length]}/>
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
                      label: 'Rain meter',
                      data: mockData.map((districtStatus) => districtStatus.rainMeter),
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
                      data: mockData.map((districtStatus) => districtStatus.temperature),
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
                      label: 'Amount of mosquito',
                      data: mockData.map((districtStatus) => districtStatus.mosquitoAmount),
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
                    <td colSpan={Object.keys(mockData[0]).length}>
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

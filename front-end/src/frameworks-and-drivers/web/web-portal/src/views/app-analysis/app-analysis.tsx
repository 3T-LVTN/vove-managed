import {Button, Container, Grid, Group, Paper, Select, SimpleGrid, Text, useMantineTheme} from "@mantine/core";
import {PageTitle} from "../../components/page-title/page-title";
import {useEffect, useState} from "react";
import LineChart from "../../components/line-chart/line-chart";
import BarChart from "../../components/bar-chart/bar-chart";

const AppAnalysisByPlace = () => {
  const [labels, setLabels] = useState<string[]>([]);

  const theme = useMantineTheme();

  const firstColor = theme.colors.cyan[6];
  const secondColor = theme.colors.orange[4];

  useEffect(() => {
      setLabels(['June', 'July', 'August', 'September', 'October', 'November', 'December', 'January', 'February', 'March', 'April', 'May']);
    }
    , []);

  return (
    <Grid>
      <Grid.Col span={12}>
        <Paper withBorder radius="md" p="md">
          <SimpleGrid cols={3} spacing="md"
                      breakpoints={[
                        {maxWidth: 'md', cols: 2, spacing: 'md'},
                        {maxWidth: 'sm', cols: 1, spacing: 'sm'},
                      ]}>
            <div>
              <Group>
                <div>
                  <Text weight={700}>
                    New User
                  </Text>
                  <Text weight={700}>
                    Lượt truy cập
                  </Text>
                  <Text weight={700}>
                    Inquiry
                  </Text>
                </div>
                <div>
                  <Text>
                    123465
                  </Text>
                  <Text>
                    4656465
                  </Text>
                  <Text>
                    979789798
                  </Text>
                </div>
              </Group>
            </div>
            <div>
              <Group>
                <div>
                  <Text weight={700}>
                    Tracking
                  </Text>
                  <Text weight={700}>
                    Average tracking
                  </Text>
                </div>
                <div>
                  <Text>
                    123465
                  </Text>
                  <Text>
                    4656465
                  </Text>
                </div>
              </Group>
            </div>
            <div>
              <Group>
                <div>
                  <Text weight={700}>
                    Feedback
                  </Text>
                  <Text weight={700}>
                    Average feedback
                  </Text>
                </div>
                <div>
                  <Text>
                    123465
                  </Text>
                  <Text>
                    4656465
                  </Text>
                </div>
              </Group>
            </div>
          </SimpleGrid>
        </Paper>
      </Grid.Col>
      <Grid.Col md={6} sm={12}>
        <Paper withBorder radius="md" p="md">
          <LineChart
            title={"Users"}
            labels={labels}
            datasets={[
              {
                label: 'New User',
                data: [10, 30, 39, 20, 25, 44, 50, 10, 30, 39, 20, 25],
                borderColor: firstColor,
                backgroundColor: firstColor,
              },
              {
                label: 'User Access App',
                data: [20, 29, 30, 10, 15, 35, 40, 20, 29, 30, 10, 15],
                borderColor: secondColor,
                backgroundColor: secondColor,
              },
            ]}
          />
        </Paper>
      </Grid.Col>
      <Grid.Col md={6} sm={12}>
        <Paper withBorder radius="md" p="md">
          <LineChart
            title={"Inquiry"}
            labels={labels}
            datasets={[
              {
                label: 'Inquiry number',
                data: [10, 30, 39, 20, 25, 44, 50, 10, 30, 39, 20, 25],
                borderColor: firstColor,
                backgroundColor: firstColor
              }
            ]}
          />
        </Paper>
      </Grid.Col>
      <Grid.Col md={6} sm={12}>
        <Paper withBorder radius="md" p="md">
          <LineChart
            title={"Feedback"}
            labels={labels}
            datasets={[
              {
                label: 'Feedback number',
                data: [10, 30, 39, 20, 25, 44, 50, 10, 30, 39, 20, 25],
                borderColor: firstColor,
                backgroundColor: firstColor
              },
              {
                label: 'Average Feedback',
                data: [20, 29, 30, 10, 15, 35, 40, 20, 29, 30, 10, 15],
                borderColor: secondColor,
                backgroundColor: secondColor,
              },
            ]}
          />
        </Paper>
      </Grid.Col>
      <Grid.Col md={6} sm={12}>
        <Paper withBorder radius="md" p="md">
          <LineChart
            title={"Tracking Points"}
            labels={labels}
            datasets={[
              {
                label: 'Tracking Points number',
                data: [10, 30, 39, 20, 25, 44, 50, 10, 30, 39, 20, 25],
                borderColor: firstColor,
                backgroundColor: firstColor
              },
              {
                label: 'Average Tracking Points',
                data: [20, 29, 30, 10, 15, 35, 40, 20, 29, 30, 10, 15],
                borderColor: secondColor,
                backgroundColor: secondColor,
              },
            ]}
          />
        </Paper>
      </Grid.Col>
    </Grid>
  );
}

const AppAnalysisByTime = () => {
  const [labels, setLabels] = useState<string[]>([]);

  const theme = useMantineTheme();

  const firstColor = theme.colors.cyan[3];
  const secondColor = theme.colors.orange[3];

  useEffect(() => {
      setLabels([
        'District 1',
        'District 2',
        'District 3',
        'District 4',
        'District 5',
        'District 6',
        'District 7',
        'District 8',
        'District 9',
        'District 10',
        'District 11',
        'District 12',
        'District 13',
        'District 14',
        'District 15',
        'District 16',
        'District 17',
        'District 18',
        'District 19',
        'District 20',
        'District 21',
        'District 22'
      ]);
    }
    , []);

  return (
    <Grid w={"100%"}>
      <Grid.Col span={12}>
        <Paper withBorder radius="md" p="md">
          <BarChart
            title={"User"}
            labels={labels}
            datasets={[
              {
                label: 'New users',
                data: [36, 78, 69, 62, 83, 28, 56, 36, 78, 69, 75, 78, 96, 83, 76, 36, 78, 36, 83, 67, 31, 73],
                backgroundColor: secondColor,
              },
              {
                label: 'Number of users',
                data: [236, 178, 169, 162, 183, 128, 256, 236, 178, 169, 175, 278, 196, 183, 176, 96, 278, 196, 183, 167, 231, 173],
                backgroundColor: firstColor,
              },
            ]}
          />
        </Paper>
      </Grid.Col>
      <Grid.Col md={6} sm={12}>
        <Paper withBorder radius="md" p="md">
          <BarChart
            title={"Average Feedback"}
            labels={labels}
            datasets={[
              {
                label: 'Average Feedback',
                data: [36, 78, 69, 62, 83, 28, 56, 36, 78, 69, 75, 78, 96, 83, 76, 36, 78, 36, 83, 67, 31, 73],
                backgroundColor: firstColor,
              },
            ]}
          />
        </Paper>
      </Grid.Col>
      <Grid.Col md={6} sm={12}>
        <Paper withBorder radius="md" p="md">
          <BarChart
            title={"Visit"}
            labels={labels}
            datasets={[
              {
                label: 'Number of visits',
                data: [36, 78, 69, 62, 83, 28, 56, 36, 78, 69, 75, 78, 96, 83, 76, 36, 78, 36, 83, 67, 31, 73],
                backgroundColor: firstColor,
              },
            ]}
          />
        </Paper>
      </Grid.Col>
      <Grid.Col md={6} sm={12}>
        <Paper withBorder radius="md" p="md">
          <BarChart
            title={"Inquiry"}
            labels={labels}
            datasets={[
              {
                label: 'Open inquiry',
                data: [36, 78, 69, 62, 83, 28, 56, 36, 78, 69, 75, 78, 96, 83, 76, 36, 78, 36, 83, 67, 31, 73],
                backgroundColor: secondColor,
              },
              {
                label: 'All inquiry',
                data: [236, 178, 169, 162, 183, 128, 256, 236, 178, 169, 175, 278, 196, 183, 176, 96, 278, 196, 183, 167, 231, 173],
                backgroundColor: firstColor,
              },
            ]}
          />
        </Paper>
      </Grid.Col>
      <Grid.Col md={6} sm={12}>
        <Paper withBorder radius="md" p="md">
          <BarChart
            title={"Tracking Points"}
            labels={labels}
            datasets={[
              {
                label: 'Number of Tracking Points Registered',
                data: [36, 78, 69, 62, 83, 28, 56, 36, 78, 69, 75, 78, 96, 83, 76, 36, 78, 36, 83, 67, 31, 73],
                backgroundColor: firstColor,
              },
            ]}
          />
        </Paper>
      </Grid.Col>
    </Grid>
  );
}

const AppAnalysis = () => {
  const [isViewByPlace, setIsViewByPlace] = useState<boolean>(true)

  return (
    <Container fluid>
      <Grid>
        <Grid.Col span={12}>
          <Group position={"apart"}>
            <PageTitle title={"App Analysis" + (isViewByPlace ? " - Places" : " - Time")}/>
            <Button variant={"light"} size="lg" color="orange" w={280}
                    onClick={() => {
                      setIsViewByPlace(!isViewByPlace);
                      console.log(isViewByPlace
                      )
                    }}>
              {isViewByPlace ?
                "Change to View by Time"
                :
                "Change to View by Place"
              }
            </Button>
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
            {isViewByPlace ?
              <Select
                placeholder="Choose area"
                data={[
                  {value: '1', label: 'Quận 1', selected: true},
                  {value: '2', label: 'Quận 3'},
                  {value: '3', label: 'Quận 4'},
                  {value: '4', label: 'Quận 5'},
                  {value: '5', label: 'Quận 6'},
                  {value: '6', label: 'Quận 7'},
                  {value: '7', label: 'Quận 8'},
                  {value: '8', label: 'Quận 10'},
                  {value: '9', label: 'Quận 11'},
                  {value: '10', label: 'Quận 12'},
                  {value: '11', label: 'Huyện Hóc Môn'},
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
          {isViewByPlace ?
            <AppAnalysisByPlace/>
            :
            <AppAnalysisByTime/>}
        </Grid.Col>
      </Grid>
    </Container>
  );
};

export default AppAnalysis;

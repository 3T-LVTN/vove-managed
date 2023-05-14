import {useEffect, useState} from "react";
import {Grid, Group, Paper, SimpleGrid, Text, useMantineTheme} from "@mantine/core";
import LineChart from "../line-chart/line-chart";

const mockData = {
  newUsers: 2,
  accessTimes: 20,
  inquiries: 1,
  tracking: 5,
  averageTracking: 2.5,
  averageFeedback: 1.5,
}

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
                    Access Times
                  </Text>
                </div>
                <div>
                  <Text>
                    {mockData.newUsers}
                  </Text>
                  <Text>
                    {mockData.accessTimes}
                  </Text>
                </div>
              </Group>
            </div>
            <div>
              <Group>
                <div>
                  <Text weight={700}>
                    Tracking Points
                  </Text>
                  <Text weight={700}>
                    Tracking Points/User
                  </Text>
                </div>
                <div>
                  <Text>
                    {mockData.tracking}
                  </Text>
                  <Text>
                    {mockData.averageTracking}
                  </Text>
                </div>
              </Group>
            </div>
            <div>
              <Group>
                <div>
                  <Text weight={700}>
                    Inquiries
                  </Text>
                  <Text weight={700}>
                    Average Feedback
                  </Text>
                </div>
                <div>
                  <Text>
                    {mockData.inquiries}
                  </Text>
                  <Text>
                    {mockData.averageFeedback}
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
                label: 'Access Times',
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
                label: 'Tracking Points',
                data: [10, 30, 39, 20, 25, 44, 50, 10, 30, 39, 20, 25],
                borderColor: firstColor,
                backgroundColor: firstColor
              },
              {
                label: 'Tracking Points/Users',
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
            title={"Feedback"}
            labels={labels}
            datasets={[
              {
                label: 'Average Feedback',
                data: [20, 29, 30, 10, 15, 35, 40, 20, 29, 30, 10, 15],
                borderColor: firstColor,
                backgroundColor: firstColor,
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
                label: 'Inquiry Number',
                data: [10, 30, 39, 20, 25, 44, 50, 10, 30, 39, 20, 25],
                borderColor: firstColor,
                backgroundColor: firstColor
              }
            ]}
          />
        </Paper>
      </Grid.Col>
    </Grid>
  );
}

export default AppAnalysisByPlace;

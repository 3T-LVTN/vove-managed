import {useEffect, useState} from "react";
import {Grid, Group, Paper, SimpleGrid, Text, useMantineTheme} from "@mantine/core";
import LineChart from "../line-chart/line-chart";

const mockData = {
  newUsers: 50,
  accessTimes: 200,
  inquiries: 10,
  tracking: 150,
  averageTracking: 10,
  averageFeedback: 2.5,
}

const AppAnalysisByPlace = () => {
  const [labels, setLabels] = useState<string[]>([]);

  const theme = useMantineTheme();

  const firstColor = theme.colors.cyan[6];
  const secondColor = theme.colors.orange[4];

  useEffect(() => {
      setLabels(['Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12', 'Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5','Tháng 6']);
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
                    Số người dùng mới
                  </Text>
                  <Text weight={700}>
                    Số lượt truy cập
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
                    Số vị trí theo dõi
                  </Text>
                  <Text weight={700}>
                    Số vị trí theo dõi/người dùng
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
                    Số yêu cầu hỗ trợ
                  </Text>
                  <Text weight={700}>
                    Trung bình phản hồi
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
            title={"Người dùng ứng dụng"}
            labels={labels}
            datasets={[
              {
                label: 'Người dùng mới',
                data: [0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 2, 10],
                borderColor: firstColor,
                backgroundColor: firstColor,
              },
              {
                label: 'Số lượt truy cập',
                data: [0, 0, 0, 0, 0, 0, 0, 0, 20, 30, 60, 100],
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
            title={"Vị trí theo dõi"}
            labels={labels}
            datasets={[
              {
                label: 'Vị trí theo dõi',
                data: [0, 0, 0, 0, 0, 0, 0, 0, 4, 15, 50, 150],
                borderColor: firstColor,
                backgroundColor: firstColor
              },
              {
                label: 'Số vị trí theo dõi/người dùng',
                data: [0, 0, 0, 0, 0, 0, 0, 0, 4, 5, 10, 10],
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
            title={"Phản hồi về dự đoán"}
            labels={labels}
            datasets={[
              {
                label: 'Trung bình phản hồi',
                data: [0, 0, 0, 0, 0, 0, 0, 0, 2.5, 2.4, 2.8, 2.7],
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
            title={"Yêu cầu hỗ trợ"}
            labels={labels}
            datasets={[
              {
                label: 'Số yêu cầu hỗ trợ',
                data: [0, 0, 0, 0, 0, 0, 0, 0, 3, 3, 5, 10],
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

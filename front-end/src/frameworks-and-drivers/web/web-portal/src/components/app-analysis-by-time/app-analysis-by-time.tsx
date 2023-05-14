import {useEffect, useState} from "react";
import {Grid, Paper, useMantineTheme} from "@mantine/core";
import BarChart from "../bar-chart/bar-chart";

const AppAnalysisByTime = () => {
  const [labels, setLabels] = useState<string[]>([]);

  const theme = useMantineTheme();

  const firstColor = theme.colors.cyan[3];
  const secondColor = theme.colors.orange[3];

  useEffect(() => {
      setLabels([
        'Thu Duc City',
        'District 1',
        'District 3',
        'District 4',
        'District 5',
        'District 6',
        'District 7',
        'District 8',
        'District 10',
        'District 11',
        'District 12',
        'Binh Tan',
        'Binh Thanh',
        'Go Vap',
        'Phu Nhuan',
        'Tan Binh',
        'Tan Phu',
        'Binh Chanh',
        'Can Gio',
        'Cu Chi',
        'Hoc Mon',
        'Nha Be',
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
                label: 'New Users',
                data: [6, 0, 0, 1, 0, 0, 0, 0, 2, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1, 3, 0],
                backgroundColor: secondColor,
              },
              {
                label: 'Number of Users',
                data: [6, 0, 0, 1, 0, 0, 0, 0, 2, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1, 3, 0],
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
                data: [0.83, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 1.67, 0],
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
                data: [26, 0, 0, 8, 0, 0, 0, 0, 12, 0, 0, 0, 0, 1, 0, 1, 1, 0, 0, 1, 33, 0],
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
                data: [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
                backgroundColor: secondColor,
              },
              {
                label: 'All inquiry',
                data: [5, 0, 0, 2, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0],
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
                data: [9, 0, 0, 1, 0, 0, 0, 0, 6, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 11, 0],
                backgroundColor: firstColor,
              },
            ]}
          />
        </Paper>
      </Grid.Col>
    </Grid>
  );
}

export default AppAnalysisByTime;

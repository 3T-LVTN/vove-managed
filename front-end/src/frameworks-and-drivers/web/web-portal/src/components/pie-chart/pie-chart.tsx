import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import {Stack, useMantineTheme} from "@mantine/core";

ChartJS.register(ArcElement, Tooltip, Legend);

export interface PieChartProps {
  labels: string[];
  data: number[];
}

export function PieChart(props: PieChartProps) {
  const theme = useMantineTheme();

  const data = {
    labels: props.labels,
    datasets: [
      {
        data: props.data,
        backgroundColor: [
          theme.colors.cyan[4],
          theme.colors.yellow[4],
          theme.colors.orange[4],
          theme.colors.red[4],
          theme.colors.violet[4],
          theme.colors.blue[4],
        ],
        borderColor: [
          theme.white,
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
  <Stack h="100%" align="center" justify="center">
    <Pie data={data} options={{
      plugins: {
        legend: {
          position: "left",
        }
      },
    }}/>
  </Stack>
  );
}

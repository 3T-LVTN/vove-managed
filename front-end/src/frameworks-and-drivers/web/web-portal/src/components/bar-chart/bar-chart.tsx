import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import {Bar} from 'react-chartjs-2';
import {Stack} from "@mantine/core";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export interface BarChartProps {
  title: string;
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor: string;
  }[];
}


const BarChart = (props: BarChartProps) => {
  const data = {
    labels: props.labels,
    datasets: props.datasets,
  };

  const options = {
    plugins: {
      title: {
        display: true,
        text: props.title,
      },
    },
    responsive: true,
    scales: {
      x: {
        stacked: true,
      },
      y: {
        stacked: false,
      },
    },
  };

  return (
    <Stack h="100%" align="center" justify="center">
      <Bar data={data} options={options} width={500}/>
    </Stack>
  );
}

export default BarChart;

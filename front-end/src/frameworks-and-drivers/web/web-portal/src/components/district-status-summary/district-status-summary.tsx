import React from "react";
import {ActionIcon, Group, rem, Stack, Text} from "@mantine/core";
import {Pie} from "react-chartjs-2";
import {ArcElement, Chart as ChartJS, Legend, LinearScale, Tooltip} from 'chart.js';
import {IconArrowUpRight} from "@tabler/icons-react";
import styles from './district-status-summary.module.css'
import {useNavigate} from "react-router-dom";

ChartJS.register(ArcElement, Tooltip, Legend, LinearScale);

interface PieChartDataSet {
  data: number[]
  backgroundColor?: string[]
  borderWidth?: number
}
interface PieChartVisualizableData  {
  labels: string [] 
  datasets: PieChartDataSet[]
}

export const data: PieChartVisualizableData = {
  labels: ["SAFE", "NORMAL", "LOW RISK", "HIGH RISK"],
  datasets: [{
    data: [14, 5, 2, 1],
    backgroundColor: [
      "#3BC9DB",
      "#FFD43B",
      "#FFA94D",
      "#FF8787",
    ],
    borderWidth: 1,
  },],
};

interface DistrictStatusSummaryProps {
  isForDashboard: boolean
  data: PieChartVisualizableData 
}

export function PieChart(data: PieChartVisualizableData) {
  return <Pie
  data={data}
  options={{
    plugins: {
      legend: {
        position: "bottom",
      }
    }
  }}
/>
}

export function DistrictStatusSummary(props: DistrictStatusSummaryProps) {
  const navigator = useNavigate();
  const pieChartData = props.data?? data
  return (<>
    {props.isForDashboard ? <div className={styles.buttonLayer}>
      <ActionIcon size="lg" variant="light" color={"cyan"} onClick={() => navigator('/districts')}>
        <IconArrowUpRight
          size="2.125rem"/>
      </ActionIcon>
    </div> : <></>}

    <div style={{
      height: "80%", width: "100%", display: "flex", justifyContent: "space-around", alignItems: "center",
    }}>
      <Stack h={"100%"} justify={"center"}>
        <div>
          <Text mt={30} fz={rem(25)} fw={700} c={"dark.4"}>22</Text>
          <Text fz="xs" color="dimmed">Districts tracked</Text>
        </div>
        <Group mt={"lg"}>
          <div>
            <Text fz="lg" fw={700} c={"dark.4"}>14</Text>
            <Text fz="xs" color="dimmed">Normal</Text>
          </div>
          <div>
            <Text fz="lg" fw={700} c={"dark.4"}>5</Text>
            <Text fz="xs" color="dimmed">Low risk</Text>
          </div>
          <div>
            <Text size="lg" fw={700} c={"dark.4"}>2</Text>
            <Text size="xs" color="dimmed">High risk</Text>
          </div>
          <div>
            <Text fz="lg" fw={700} c={"dark.4"}>1</Text>
            <Text fz="xs" color="dimmed">Epidemic</Text>
          </div>
        </Group>
      </Stack>
      <PieChart {...pieChartData}/>
    </div>
  </>)
}

export default DistrictStatusSummary;

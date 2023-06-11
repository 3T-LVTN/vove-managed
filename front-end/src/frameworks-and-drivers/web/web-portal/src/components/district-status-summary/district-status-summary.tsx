import React, { useState } from "react";
import { ActionIcon, Group, rem, Stack, Text } from "@mantine/core";
import { Pie } from "react-chartjs-2";
import { ArcElement, Chart as ChartJS, Legend, LinearScale, Tooltip } from 'chart.js';
import { IconArrowUpRight } from "@tabler/icons-react";
import styles from './district-status-summary.module.css'
import { useNavigate } from "react-router-dom";

ChartJS.register(ArcElement, Tooltip, Legend, LinearScale);

interface PieChartDataSet {
  data: number[]
  backgroundColor?: string[]
  borderWidth?: number
}
interface PieChartVisualizableData {
  labels: string[]
  datasets: PieChartDataSet[]
}

const DefaultColors =  [
  "#3BC9DB",
  "#FFD43B",
  "#FFA94D",
  "#FF8787",
]
const data: PieChartVisualizableData = {
  labels: ["AN TOÀN", "THẤP", "VỪA", "CAO"],
  datasets: [{
    data: [14, 5, 2, 1],
    backgroundColor: DefaultColors,
    borderWidth: 1,
  },],
};



interface DistrictStatusSummaryProps {
  isForDashboard: boolean
  data: PieChartVisualizableData
}

export function PieChart(data: PieChartVisualizableData) {
  data.datasets = data.datasets.map(
    (val) => {
      const ret = val
      const colors = DefaultColors.slice(0, ret.data.length)
      ret.backgroundColor = ret.backgroundColor ?? colors
      return ret
    })
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



const GroupTrackingData = ({ labels, datasets }: PieChartVisualizableData) => {
  return <Group mt={"lg"}>
    {labels.map((val, idx) => <div>
      <Text fz="lg" fw={700} c={"dark.4"}>{val}</Text>
      <Text fz="xs" color="dimmed">{datasets[0].data[idx]}</Text>
    </div>)}
  </Group>
}


export function DistrictStatusSummary(props: DistrictStatusSummaryProps) {
  const navigator = useNavigate();
  console.log("render summary")
  console.log(props)
  const pieChartData = props.data ?? data
  return (<>
    {props.isForDashboard ? <div className={styles.buttonLayer}>
      <ActionIcon size="lg" variant="light" color={"cyan"} onClick={() => navigator('/districts')}>
        <IconArrowUpRight
          size="2.125rem" />
      </ActionIcon>
    </div> : <></>}

    <div style={{
      height: "80%", width: "100%", display: "flex", justifyContent: "space-around", alignItems: "center",
    }}>
      <Stack h={"100%"} justify={"center"}>
        <div>
          <Text mt={30} fz={rem(25)} fw={700} c={"dark.4"}>{pieChartData.datasets[0].data.reduce((acc, ele)=>(acc+ele), 0)}</Text>
          <Text fz="xs" color="dimmed">xã lấy mẫu</Text>
        </div>
        <GroupTrackingData {...pieChartData}></GroupTrackingData>
      </Stack>
      <PieChart {...pieChartData} />
    </div>
  </>)
}

export default DistrictStatusSummary;

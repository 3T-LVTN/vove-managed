import React from "react";
import {ActionIcon, Group, rem, Stack, Text} from "@mantine/core";
import {Pie} from "react-chartjs-2";
import {ArcElement, Chart as ChartJS, Legend, Tooltip} from 'chart.js';
import {IconArrowsMaximize, IconArrowUpRight} from "@tabler/icons-react";
import styles from './district-status-summary.module.css'

ChartJS.register(ArcElement, Tooltip, Legend);

export const data = {
  labels: ['OK', 'NG'], datasets: [{
    data: [18, 6], backgroundColor: ["#61c0d0", "#FFA8A8"],
  },],
};
export const DistrictStatusSummary = () => {
  return (<>
      <div  className={styles.buttonLayer}>
        <ActionIcon size="lg" variant="light" color={"cyan"}>
          <IconArrowUpRight
            size="2.125rem"/>
        </ActionIcon>
      </div>

      <div style={{
        height: "80%", width: "100%", display: "flex", justifyContent: "space-around", alignItems: "center",
      }}>
        <Stack h={"100%"} justify={"center"}>
          <div>
            <Text mt={30} fz={rem(25)} fw={700} c={"dark.4"}>24</Text>
            <Text fz="xs" color="dimmed">Districts tracked</Text>
          </div>
          <Group mt={"lg"}>
            <div>
              <Text fz="lg" fw={700} c={"dark.4"}>18</Text>
              <Text fz="xs" color="dimmed">Normal</Text>
            </div>
            <div>
              <Text size="lg" fw={700} c={"dark.4"}>6</Text>
              <Text size="xs" color="dimmed">High risk</Text>
            </div>
          </Group>
        </Stack>
        <Pie
          data={data}
          options={{
            plugins: {
              legend: {
                position: "bottom",
              }
            }
          }}
        />
      </div>
    </>)
};

export default DistrictStatusSummary;

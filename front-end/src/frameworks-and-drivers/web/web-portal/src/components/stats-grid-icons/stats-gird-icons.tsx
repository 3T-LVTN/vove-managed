import {ActionIcon, createStyles, Group, Text} from '@mantine/core';
import {IconArrowUpRight} from '@tabler/icons-react';
import React from "react";
import {useNavigate} from "react-router-dom";

const useStyles = createStyles((theme) => ({
  label: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
  },
}));

interface StatsGridIconsProps {
  data: { title: string; value: string; diff: number };
  nav: string;
}

export function StatsGridIcons({data, nav}: StatsGridIconsProps) {
  const navigator = useNavigate();
  const {classes} = useStyles();

  return (<>
      <Group position="apart" align="top">
        <div>
          <Text c="dimmed" tt="uppercase" fw={700} fz="xs" className={classes.label}>
            {data.title}
          </Text>
          <Text fw={700} fz="xl">
            {data.value}
          </Text>
        </div>
        <ActionIcon size="lg" variant="light" color={"cyan"} onClick={() => navigator(nav)}>
          <IconArrowUpRight
            size="2.125rem"/>
        </ActionIcon>
      </Group>
      <Text c="dimmed" fz="sm" mt="md">
        <Text component="span" c={data.diff > 0 ? 'cyan' : 'red'} fw={700}>
          {data.diff}%
        </Text>{' '}
        {data.diff > 0 ? 'increase' : 'decrease'} compared to last month
      </Text>
    </>
  );
}

export default StatsGridIcons;

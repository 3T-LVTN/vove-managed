import {ActionIcon, createStyles, Group, Text} from '@mantine/core';
import {IconArrowUpRight} from '@tabler/icons-react';
import React from "react";
import {useNavigate} from "react-router-dom";

const useStyles = createStyles((theme) => ({
  label: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
  },
}));

interface AppAnalysisSummaryProps {
  data: { access: number; tracking: number; inquiries: number };
}

export function AppAnalysisSummary({data}: AppAnalysisSummaryProps) {
  const navigator = useNavigate();

  return (<Group position="apart" align="top" mt={0}>
        <div>
          <Text c="dimmed" fz="sm" mt="0">
            <Text component="span" c={'cyan'} fw={700}>
              {data.access}
            </Text>{' '}
            accesses today
          </Text>
          <Text c="dimmed" fz="sm" mt="sm">
            <Text component="span" c={'cyan'} fw={700}>
              {data.tracking}
            </Text>{' '}
            tracking points registered
          </Text>
          <Text c="dimmed" fz="sm" mt="sm">
            <Text component="span" c={'cyan'} fw={700}>
              {data.inquiries}
            </Text>{' '}
            inquiries created
          </Text>
        </div>
        <ActionIcon size="lg" variant="light" color={"cyan"} onClick={() => navigator('/app-analysis')}>
          <IconArrowUpRight
            size="2.125rem"/>
        </ActionIcon>
      </Group>);
}

export default AppAnalysisSummary;

import {
  Button,
  Container,
  Group,
  Paper,
  Select,
  SimpleGrid, Stack,
  Text,
  ThemeIcon, Title,
  useMantineTheme
} from "@mantine/core";
import {PageTitle} from "../../components/page-title/page-title";
import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import LineChart from "../../components/line-chart/line-chart";
import {IconChevronsLeft} from "@tabler/icons-react";

const WardDetail = () => {
  const [value, setValue] = useState<string | null>("1 hour");

  const navigate = useNavigate();
  const theme = useMantineTheme();

  const firstColor = theme.colors.cyan[4];

  const date = new Date();
  const time = date.toLocaleTimeString() + " - " + date.toLocaleDateString();

  return (
    <Container fluid>
      <PageTitle title="Ward Detail"/>
      <Group mb="md">
        <Button variant={"light"} onClick={() => navigate(-1)}>
          <IconChevronsLeft size={20}/>
          Back to District
        </Button>
        <Text size="md">
          Last updated: <b>{time}</b>
        </Text>
        <Text size="md">
          Displaying
        </Text>
        <Select
          placeholder="District"
          size="md"
          radius="md"
          value={value}
          data={["1 hour", "12 hours", "1 day", "1 week", "1 month"]}
          onChange={setValue}
        />
        <Text size="md">
          ago
        </Text>
      </Group>
      <SimpleGrid cols={2} spacing="md">
        <Paper withBorder radius="md" p="md">
          <Stack>
            <Group position="center" spacing="xl">
              <ThemeIcon size="80px" radius="50%"
                         color={theme.colors.red[4]}>
              </ThemeIcon>
              <Title order={2}>High Risk</Title>
            </Group>
              <Text size="lg"><b>Predict mosquito amount:</b> 1357</Text>
              <Text size="lg"><b>Temperature:</b> 39</Text>
              <Text size="lg"><b>Rain meter:</b> 156</Text>
              <Text size="lg"><b>User response:</b> normal</Text>
          </Stack>
        </Paper>
        <Paper withBorder radius="md" p="md">
          <LineChart
            title={"Predict mosquito amount"}
            labels={['60', '55', '50', '45', '40', '35', '30', '25', '20', '15', '10', '5', '0']}
            datasets={[
              {
                label: 'Mosquito amount',
                data: [20, 30, 39, 42, 25, 44, 50, 23, 30, 39, 29, 25, 34],
                borderColor: firstColor,
                backgroundColor: firstColor
              }
            ]}
          />
        </Paper>

        <Paper withBorder radius="md" p="md">
          <LineChart
            title={"Temperature"}
            labels={['60', '55', '50', '45', '40', '35', '30', '25', '20', '15', '10', '5', '0']}
            datasets={[
              {
                label: 'Temperature',
                data: [20, 30, 39, 42, 25, 44, 50, 23, 30, 39, 29, 25, 34],
                borderColor: firstColor,
                backgroundColor: firstColor
              }
            ]}
          />
        </Paper>

        <Paper withBorder radius="md" p="md">
          <LineChart
            title={"Rain meter"}
            labels={['60', '55', '50', '45', '40', '35', '30', '25', '20', '15', '10', '5', '0']}
            datasets={[
              {
                label: 'Rain meter',
                data: [20, 30, 39, 42, 25, 44, 50, 23, 30, 39, 29, 25, 34],
                borderColor: firstColor,
                backgroundColor: firstColor
              }
            ]}
          />
        </Paper>
      </SimpleGrid>
    </Container>
  );
}

export default WardDetail;

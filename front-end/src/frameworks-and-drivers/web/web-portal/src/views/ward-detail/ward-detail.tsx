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
  const [value, setValue] = useState<string | null>("1 day");

  const navigate = useNavigate();
  const theme = useMantineTheme();

  const firstColor = theme.colors.cyan[4];

  const date = new Date();
  const time = date.toLocaleTimeString() + " - " + date.toLocaleDateString();

  const labels = ["20:00", "22:00", "0:00", "2:00", "4:00", "6:00", "8:00", "10:00", "12:00", "14:00", "16:00", "18:00", "20:00"];

  return (
    <Container fluid>
      <PageTitle title="Tan Dinh"/>
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
          placeholder="Time range"
          size="md"
          radius="md"
          value={value}
          data={["1 day", "1 week", "1 month", "3 months", "6 months", "1 year"]}
          onChange={setValue}
        />
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
              <Text size="lg"><b>Predict mosquito amount:</b> 163</Text>
              <Text size="lg"><b>Temperature:</b> 37</Text>
              <Text size="lg"><b>Rain meter:</b> 67</Text>
              <Text size="lg"><b>User response:</b> Normal</Text>
          </Stack>
        </Paper>
        <Paper withBorder radius="md" p="md">
          <LineChart
            title={"Predict mosquito amount"}
            labels={labels}
            datasets={[
              {
                label: 'Mosquito amount',
                data: [120, 131, 129, 132, 141, 144, 157, 153, 155, 149, 152, 155, 163],
                borderColor: firstColor,
                backgroundColor: firstColor
              }
            ]}
          />
        </Paper>

        <Paper withBorder radius="md" p="md">
          <LineChart
            title={"Temperature"}
            labels={labels}
            datasets={[
              {
                label: 'Temperature',
                data: [34, 33.5, 32.5, 31, 30.2, 31.5, 33, 34.8, 37, 37.2, 37, 36.3, 34.8],
                borderColor: firstColor,
                backgroundColor: firstColor
              }
            ]}
          />
        </Paper>

        <Paper withBorder radius="md" p="md">
          <LineChart
            title={"Rain meter"}
            labels={labels}
            datasets={[
              {
                label: 'Rain meter',
                data: [52, 55, 62, 65, 73, 68, 71, 74, 76, 72, 78, 73, 77],
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

import {
  Button,
  Container,
  Group,
  Paper,
  Select,
  SimpleGrid,
  Stack,
  Text,
  ThemeIcon,
  Title,
  useMantineTheme,
} from '@mantine/core';
import { PageTitle } from '../../components/page-title/page-title';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import LineChart from '../../components/line-chart/line-chart';
import { IconChevronsLeft } from '@tabler/icons-react';
import axios from 'axios';
import { getWard } from '@front-end/shared/administrative-division';

interface GetDetailApiRequest {
  startTime: number;
  endTime: number;
  lat?: number;
  lng?: number;
  locationCode?: string;
}

interface LocationGeo {
  lat: number;
  lng: number;
  locationCode: string;
}

interface LocationDetail {
  date: number; // actually timestamp
  value: number;
  temperature: number;
  precip: number;
  rate: string;
}

interface GetDetailApiResponseData {
  locationGeometry: LocationGeo;
  locationDetail: LocationDetail[];
}
interface GetDetailApiResponse {
  code: number;
  message: string;
  data: GetDetailApiResponseData;
}

const getDetail = async (
  location: LocationGeo,
  fromTime: number,
  toTime: number
): Promise<LocationDetail[]> => {
  const body: GetDetailApiRequest = {
    startTime: fromTime,
    endTime: toTime,
    locationCode: location.locationCode,
    lat: location.lat,
    lng: location.lng,
  };

  return axios
    .post<GetDetailApiResponse>('/prediction/detail', body)
    .then((response) => {
      return response.data.data.locationDetail;
    })
    .catch((error) => {
      throw new Error(error);
    });
};

interface ChartData {
  values: number[];
  temp: number[];
  rain: number[];
}

const WardDetail = () => {
  const [value, setValue] = useState<string | null>('1 day');

  const navigate = useNavigate();
  const theme = useMantineTheme();
  const { districtName, wardName } = useParams();
  const firstColor = theme.colors.cyan[4];

  const date = new Date();
  const time = date.toLocaleTimeString() + ' - ' + date.toLocaleDateString();
  const currentDate = new Date();
  const firstDate = new Date(currentDate);
  firstDate.setDate(firstDate.getDate() - 7);
  const labels: string[] = [];
  const [rate, setRate] = useState<string>("SAFE")
  // Loop over the last 7 days
  for (let i = 0; i < 7; i++) {
    const date = new Date(currentDate);
    date.setDate(currentDate.getDate() - 7 + i);

    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDate();
    labels.push(
      `${year}-${month < 10 ? '0' : ''}${month}-${day < 10 ? '0' : ''}${day}`
    );
  }

  const [data, setData] = useState<ChartData>({
    values: [120, 131, 129, 132, 141, 144, 157, 153, 155, 149, 152, 155, 163],
    temp: [34, 33.5, 32.5, 31, 30.2, 31.5, 33, 34.8, 37, 37.2, 37, 36.3, 34.8],
    rain: [52, 55, 62, 65, 73, 68, 71, 74, 76, 72, 78, 73, 77],
  });

  useEffect(() => {
    getDetail(
      getWard(districtName ? districtName : '', wardName ? wardName : ''),
      firstDate.getTime()/1000,
      currentDate.getTime()/1000,
    ).then((value) => {
      const data: ChartData = {
        values: [],
        temp: [],
        rain: [],
      };
      value.sort((val1, val2) => {
        return val1.date - val2.date;
      });
      value.forEach((val, _, __) => {
        data.values.push(val.value);
        data.temp.push(val.temperature);
        data.rain.push(val.precip);
      });
      setData(data)
      setRate(value[0].rate)
    });
  },[]  );

  return (
    <Container fluid>
      <PageTitle title={wardName ? wardName : ''} />
      <Group mb="md">
        <Button variant={'light'} onClick={() => navigate(-1)}>
          <IconChevronsLeft size={20} />
          Back
        </Button>
        <Text size="md">
          Cập nhật lần cuối: <b>{time}</b>
        </Text>
        <Text size="md">Displaying</Text>
        <Select
          placeholder="Khoảng thời gian"
          size="md"
          radius="md"
          value={value}
          data={[
            '1 ngày',
            '1 tuần',
            '1 tháng',
            '3 tháng',
            '6 tháng',
            '1 năm',
          ]}
          onChange={setValue}
        />
      </Group>
      <SimpleGrid cols={2} spacing="md">
        <Paper withBorder radius="md" p="md">
          <Stack>
            <Group position="center" spacing="xl">
              {/* <ThemeIcon
                size="80px"
                radius="50%"
                color={theme.colors.red[4]}
              ></ThemeIcon> */}
              <Title order={2}>{rate}</Title>
            </Group>
            <Text size="lg">
              <b>Số lượng dự đoán:</b> {data?.values?.slice(-1)[0]}
            </Text>
            <Text size="lg">
              <b>Nhiệt độ:</b> {data?.temp?.slice(-1)[0]}
            </Text>
            <Text size="lg">
              <b>Lượng mưa:</b> {data?.rain?.slice(-1)[0]}
            </Text>
            <Text size="lg">
              <b>User response:</b> Normal
            </Text>
          </Stack>
        </Paper>
        <Paper withBorder radius="md" p="md">
          <LineChart
            title={'Predict mosquito amount'}
            labels={labels}
            datasets={[
              {
                label: 'Mosquito amount',
                data: data.values,
                borderColor: firstColor,
                backgroundColor: firstColor,
              },
            ]}
          />
        </Paper>

        <Paper withBorder radius="md" p="md">
          <LineChart
            title={'Nhiệt độ (°C)'}
            labels={labels}
            datasets={[
              {
                label: 'Nhiệt độ (°C) ',
                data: data.temp,
                borderColor: firstColor,
                backgroundColor: firstColor,
              },
            ]}
          />
        </Paper>

        <Paper withBorder radius="md" p="md">
          <LineChart
            title={'Lượng mưa (mm)'}
            labels={labels}
            datasets={[
              {
                label: 'Lượng mưa (mm)',
                data: data.rain,
                borderColor: firstColor,
                backgroundColor: firstColor,
              },
            ]}
          />
        </Paper>
      </SimpleGrid>
    </Container>
  );
};

export default WardDetail;

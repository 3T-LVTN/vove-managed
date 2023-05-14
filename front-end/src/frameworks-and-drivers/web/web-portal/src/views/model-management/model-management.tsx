import {
  Button,
  Container,
  Grid,
  Paper,
  Progress,
  Select,
  Text,
  Title,
  useMantineTheme,
  SelectItem,
} from "@mantine/core";
import {PageTitle} from "../../components/page-title/page-title";
import {DropzoneButton} from "../../components/dropzone/dropzone";
import React, {useState} from "react";
import {DatePickerInput} from "@mantine/dates";
import {IconStar} from '@tabler/icons-react';

export interface District {
  code: number;
  name: string;
}

export interface Ward {
  code: number;
  name: string;
}

export interface Accuracy {
  name: string;
  value: number;
}

//TODO: call province api from provinces.open-api.vn
const mockDistricts: District[] = [
  {
    code: 1,
    name: 'Thu Duc City'
  },
  {
    code: 2,
    name: 'District 1'
  },
  {
    code: 3,
    name: 'District 3'
  },
  {
    code: 4,
    name: 'District 4'
  },
  {
    code: 5,
    name: 'District 5'
  },
  {
    code: 6,
    name: 'District 6'
  },
  {
    code: 7,
    name: 'District 7'
  },
  {
    code: 8,
    name: 'District 8'
  },
  {
    code: 9,
    name: 'District 10'
  },
  {
    code: 10,
    name: 'District 11'
  },
  {
    code: 11,
    name: 'District 12'
  },
  {
    code: 12,
    name: 'Hoc Mon'
  }
];

const mockWards: Ward[] = [
  {
    code: 1,
    name: 'Xã Tân Hiệp'
  },
  {
    code: 2,
    name: 'Xã Tân Thới Nhì'
  },
  {
    code: 3,
    name: 'Xã Thới Tam Thôn'
  },
  {
    code: 4,
    name: 'Xã Xuân Thới Sơn'
  },
  {
    code: 5,
    name: 'Xã Xuân Thới Đông'
  },
  {
    code: 6,
    name: 'Xã Trung Chánh'
  },
  {
    code: 7,
    name: 'Xã Xuân Thới Thượng'
  },
  {
    code: 8,
    name: 'Xã Bà Điểm'
  },
  {
    code: 9,
    name: 'Xã Tân Xuân'
  },
  {
    code: 10,
    name: 'Xã Phạm Văn Hai'
  },
  {
    code: 11,
    name: 'Xã Vĩnh Lộc A'
  },
  {
    code: 12,
    name: 'Xã Vĩnh Lộc B'
  },
  {
    code: 13,
    name: 'Xã Tân Thạnh Tây'
  }
];

const mockAccuracy: Accuracy[] = [
  {
    name: 'Exactly',
    value: 8
  },
  {
    name: 'Normal',
    value: 9
  },
  {
    name: 'False',
    value: 3
  }
];

export const ModelManagement = () => {
  const theme = useMantineTheme();

  const [inputDataDate, setInputDataDate] = useState<Date | null>(null);
  const [predictDate, setPredictDate] = useState<Date | null>(null);
  const [district, setDistrict] = useState<number | null>(null);
  const [ward, setWard] = useState<number | null>(null);
  const [fromDate, setFromDate] = useState<Date | null>(null);
  const [toDate, setToDate] = useState<Date | null>(null);

  const highestAccuracyStat: number = mockAccuracy.reduce((prev, current) => (prev.value > current.value) ? prev : current).value;

  const accuracyStats = mockAccuracy.map((item, index) => {
    return (
      <Grid.Col span={12}>
        <Grid>
          <Grid.Col span={2}>
            <Text fz="md" fw={500}>{item.name}</Text>
          </Grid.Col>
          <Grid.Col span="auto">
            <Progress value={item.value / highestAccuracyStat * 100} mt={5} size="xl" radius="md"
                      color={index === 1 ? "yellow" : index === 2 ? "red" : ""}/>
          </Grid.Col>
          <Grid.Col span={1}>
            <Text fz="md" fw={500} ta="right">{item.value}</Text>
          </Grid.Col>
        </Grid>
      </Grid.Col>
    );
  });

  return (
    <Container size="xl" fluid={true}>
      <PageTitle title="Model Management"/>
      <Grid>
        <Grid.Col md={12} lg={4}>
          <Grid>
            <Grid.Col sm={12} md={6} lg={12}>
              <Paper withBorder p="md" radius="md">
                <Grid>
                  <Grid.Col span={12}>
                    <Title fw={500} fz="lg" order={4} color="dark.4">Input Data</Title>
                  </Grid.Col>
                  <Grid.Col span={12}>
                    <DatePickerInput
                      placeholder="Pick date"
                      value={inputDataDate}
                      onChange={setInputDataDate}
                      size="md"
                      radius="md"
                    />
                  </Grid.Col>
                  <Grid.Col span={12}>
                    <Button variant={"light"} w="100%" size="md" radius="md">Download CSV</Button>
                  </Grid.Col>
                </Grid>
              </Paper>
            </Grid.Col>
            <Grid.Col sm={12} md={6} lg={12}>
              <Paper withBorder p="md" radius="md">
                <Grid>
                  <Grid.Col span={12}>
                    <Title fw={500} fz="lg" order={4} color="dark.4">Prediction Result</Title>
                  </Grid.Col>
                  <Grid.Col span={12}>
                    <DatePickerInput
                      placeholder="Pick date"
                      value={predictDate}
                      onChange={setPredictDate}
                      size="md"
                      radius="md"
                    />
                  </Grid.Col>
                  <Grid.Col span={12}>
                    <Button variant={"light"} w="100%" size="md" radius="md">Download CSV</Button>
                  </Grid.Col>
                </Grid>
              </Paper>
            </Grid.Col>
          </Grid>
        </Grid.Col>
        <Grid.Col md={12} lg={8}>
          <Paper withBorder p="md" radius="md" h="100%">
            <Grid>
              <Grid.Col span={12}>
                <Title fw={500} fz="lg" order={4} color="dark.4">Accuracy from user's feedback</Title>
              </Grid.Col>
              <Grid.Col span={5} ta="center">
                <IconStar color={theme.colors.cyan[7]} size={200}/>
                <Text fz="xl" fw={500}>Normal</Text>
                <Text fz="sm" fw={500}>({mockAccuracy.reduce((sum, accuracy) => sum + accuracy.value, 0)} rates)</Text>
              </Grid.Col>
              <Grid.Col span={7}>
                <Grid>
                  <Grid.Col span={6}>
                    <Select
                      placeholder="District"
                      searchable
                      nothingFound="No options"
                      size="md"
                      radius="md"
                      data={mockDistricts.map((district) => district.name)}
                    />
                  </Grid.Col>
                  <Grid.Col span={6}>
                    <Select
                      placeholder="Ward"
                      searchable
                      nothingFound="No options"
                      size="md"
                      radius="md"
                      data={mockWards.map((ward) => ward.name)}
                    />
                  </Grid.Col>
                  <Grid.Col span={6}>
                    <DatePickerInput
                      placeholder="From date"
                      value={fromDate}
                      onChange={setFromDate}
                      size="md"
                      radius="md"
                    />
                  </Grid.Col>
                  <Grid.Col span={6}>
                    <DatePickerInput
                      placeholder="To date"
                      value={toDate}
                      onChange={setToDate}
                      size="md"
                      radius="md"
                    />
                  </Grid.Col>
                  {accuracyStats}
                </Grid>
              </Grid.Col>
            </Grid>
          </Paper>
        </Grid.Col>
        <Grid.Col span={12}>
          <Paper withBorder p="md" radius="md" ta="center">
            <DropzoneButton/>
            <Button variant={"light"} w={250} size="md" radius="md">Upload data</Button>
          </Paper>
        </Grid.Col>
      </Grid>
    </Container>
  );
}

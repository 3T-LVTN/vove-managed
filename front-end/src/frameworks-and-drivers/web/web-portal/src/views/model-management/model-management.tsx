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
} from "@mantine/core";
import {PageTitle} from "../../components/page-title/page-title";
import {DropzoneButton} from "../../components/dropzone/dropzone";
import React, {useEffect, useMemo, useState} from "react";
import {DatePickerInput} from "@mantine/dates";
import {IconStar} from '@tabler/icons-react';
import {getDistricts, getWards} from "@front-end/shared/administrative-division";
import {ModelApi} from "@front-end/frameworks-and-drivers/app-sync/model";
import {ModelInteractors} from "@front-end/application/interactors/model";
import {ModelController} from "@front-end/interface-adapters/controllers/model";
import {notifications} from "@mantine/notifications";

export interface Accuracy {
  name: string;
  value: number;
}

const mockAccuracyDefault: Accuracy[] = [
  {
    name: 'Chính xác',
    value: 9
  },
  {
    name: 'Tạm ổn',
    value: 8
  },
  {
    name: 'Sai',
    value: 3
  }
];

const mockAccuracyOnChanged: Accuracy[] = [
  {
    name: 'Chính xác',
    value: 5
  },
  {
    name: 'Tạm ổn',
    value: 3
  },
  {
    name: 'Sai',
    value: 1
  }
];

export const ModelManagement = () => {
  const modelRepository = new ModelApi();
  const modelUseCases = new ModelInteractors(modelRepository);
  const modelController = new ModelController(modelUseCases);

  const theme = useMantineTheme();

  const [inputDataDate, setInputDataDate] = useState<Date | null>(null);
  const [predictDate, setPredictDate] = useState<Date | null>(null);
  const [district, setDistrict] = useState<string | null>(null);
  const [ward, setWard] = useState<string | null>(null);
  const [wardOptions, setWardOptions] = useState<{ code: string, name: string }[]>([]);
  const [wardSearch, setWardSearch] = useState<string>('');
  const [fromDate, setFromDate] = useState<Date | null>(null);
  const [toDate, setToDate] = useState<Date | null>(null);
  const [uploadFile, setUploadFile] = useState<File | null>(null);
  const [mockAccuracy, setMockAccuracy] = useState(mockAccuracyDefault);
  const [canDownloadCSV, setDownloadCSVState] = useState([false, false]);

  const fetchData = async () => {
    //TODO: Call API here
  }

  const sendFile = async (file: File | null) => {
    if (file == null) throw new Error("File is null");
    else
      await modelController.uploadFile(file!)
        .catch((err) => {
          console.log("invalid file");
        });
  }

  const showWrongFileNotification = () => {
    console.error("File is null");
    notifications.show({
      title: "Thất bại", message: 'Tệp của bạn không được tải lên. Vui lòng kiểm tra và thử lại', color: 'red',
    });
  }

  const showUploadedNotification = () => {
    console.info("Uploaded successfully");
    setUploadFile(null);
    notifications.show({
      title: "Thành công", message: 'Tệp của bạn đã được tải lên thành công', color: 'green',
    });
  }

  useEffect(() => {
    fetchData();
  }, [district, ward, fromDate, toDate]);

  useMemo(() => {
    if (district != null) {
      setWardOptions(getWards(district, false));
      setWard(null);
      setWardSearch('');
    }
  }, [district]);

  useMemo(() => {
    if (ward != null) {
      setMockAccuracy(mockAccuracyOnChanged);
    }
  }, [ward]);

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
      <PageTitle title="Quản lý mô hình dự đoán"/>
      <Grid>
        <Grid.Col md={12} lg={4}>
          <Grid>
            <Grid.Col sm={12} md={6} lg={12}>
              <Paper withBorder p="md" radius="md">
                <Grid>
                  <Grid.Col span={12}>
                    <Title fw={500} fz="lg" order={4} color="dark.4">Dữ liệu đã nhập</Title>
                  </Grid.Col>
                  <Grid.Col span={12}>
                    <DatePickerInput
                      placeholder="Chọn một ngày"
                      value={inputDataDate}
                      onChange={(e) => {setInputDataDate(e); setDownloadCSVState([true, canDownloadCSV[1]])}}
                      size="md"
                      radius="md"
                    />
                  </Grid.Col>
                  <Grid.Col span={12}>
                    <Button variant={"light"} w="100%" size="md" radius="md" disabled={!canDownloadCSV[0]}>Tải file CSV</Button>
                  </Grid.Col>
                </Grid>
              </Paper>
            </Grid.Col>
            <Grid.Col sm={12} md={6} lg={12}>
              <Paper withBorder p="md" radius="md">
                <Grid>
                  <Grid.Col span={12}>
                    <Title fw={500} fz="lg" order={4} color="dark.4">Kết quả dự đoán</Title>
                  </Grid.Col>
                  <Grid.Col span={12}>
                    <DatePickerInput
                      placeholder="Chọn một ngày"
                      value={predictDate}
                      onChange={(e) => {setPredictDate(e); setDownloadCSVState([canDownloadCSV[0], true])}}
                      size="md"
                      radius="md"
                    />
                  </Grid.Col>
                  <Grid.Col span={12}>
                    <Button variant={"light"} w="100%" size="md" radius="md" disabled={!canDownloadCSV[1]}>Tải file CSV</Button>
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
                <Title fw={500} fz="lg" order={4} color="dark.4">Độ chính xác theo phản hồi của người dùng</Title>
              </Grid.Col>
              <Grid.Col span={5} ta="center">
                <IconStar color={theme.colors.cyan[7]} size={200}/>
                <Text fz="xl" fw={500}>Chính xác</Text>
                <Text fz="sm" fw={500}>({mockAccuracy.reduce((sum, accuracy) => sum + accuracy.value, 0)} rates)</Text>
              </Grid.Col>
              <Grid.Col span={7}>
                <Grid>
                  <Grid.Col span={6}>
                    <Select
                      placeholder="Quận huyện"
                      searchable
                      nothingFound="No options"
                      size="md"
                      radius="md"
                      data={getDistricts().map((district) => (
                        {
                          label: district.district_name,
                          value: district.district_code
                        }
                      ))}
                      onChange={setDistrict}
                    />
                  </Grid.Col>
                  <Grid.Col span={6}>
                    <Select
                      placeholder="Phường/xã"
                      searchable
                      nothingFound="No options"
                      searchValue={wardSearch}
                      onSearchChange={setWardSearch}
                      size="md"
                      radius="md"
                      disabled={district === null}
                      data={wardOptions.map((ward) => (
                        {
                          label: ward.name,
                          value: ward.code
                        }
                      ))}
                      onChange={setWard}
                    />
                  </Grid.Col>
                  <Grid.Col span={6}>
                    <DatePickerInput
                      placeholder="Ngày bắt đầu"
                      value={fromDate}
                      onChange={setFromDate}
                      size="md"
                      radius="md"
                    />
                  </Grid.Col>
                  <Grid.Col span={6}>
                    <DatePickerInput
                      placeholder="Ngày kết thúc"
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
            <DropzoneButton uploadFile={uploadFile} setUploadFile={setUploadFile}/>
            <Button variant={"light"} w={250} size="md" radius="md"
                    disabled={uploadFile === null}
                    onClick={() => sendFile(uploadFile)
                      .then(() => showUploadedNotification())
                      .catch(() => showWrongFileNotification())
                    }>
              Tải dữ liệu lên
            </Button>
          </Paper>
        </Grid.Col>
      </Grid>
    </Container>
  );
}

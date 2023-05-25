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
      title: "File is null", message: 'You have not uploaded an valid file. Please try again', color: 'red',
    });
  }

  const showUploadedNotification = () => {
    console.info("Uploaded successfully");
    notifications.show({
      title: "Uploaded successfully", message: 'Your file have been uploaded successfully', color: 'green',
    });
  }

  useEffect(() => {
    fetchData();
  }, [district, ward, fromDate, toDate]);

  useMemo(() => {
    if (district != null) {
      setWardOptions(getWards(district));
      setWard(null);
      setWardSearch('');
    }
  }, [district]);

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
                      data={getDistricts().map((district) => (
                        {
                          label: district.name,
                          value: district.code
                        }
                      ))}
                      onChange={setDistrict}
                    />
                  </Grid.Col>
                  <Grid.Col span={6}>
                    <Select
                      placeholder="Ward"
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
            <DropzoneButton uploadFile={uploadFile} setUploadFile={setUploadFile}/>
            <Button variant={"light"} w={250} size="md" radius="md"
                    disabled={uploadFile === null}
                    onClick={() => sendFile(uploadFile)
                      .then(() => showUploadedNotification())
                      .catch(() => showWrongFileNotification())
                    }>
              Upload data
            </Button>
          </Paper>
        </Grid.Col>
      </Grid>
    </Container>
  );
}

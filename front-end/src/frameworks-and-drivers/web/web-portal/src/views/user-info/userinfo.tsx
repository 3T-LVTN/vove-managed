import {AppUserRepository} from "@front-end/application/repositories/app-user";
import {AppUserApi} from "@front-end/frameworks-and-drivers/app-sync/user";
import {AppUserUseCase} from "@front-end/application/usecases/app-user";
import {AppUserInteractor} from "@front-end/application/interactors/app-user";
import {AppUserController} from "@front-end/interface-adapters/controllers/app-user";
import {Badge, Card, createStyles, Grid, Image, Paper, ScrollArea, Stack, Text, Title} from "@mantine/core";
import {useParams} from "react-router-dom";
import {AppUser} from "@front-end/domain/entities/app-user";
import {useEffect, useState} from "react";
import {InquiryViewModel} from "@front-end/interface-adapters/view-models/inquiry";
import InquirySummary from "../../components/inquiry-summary/inquiry-summary";
import {TrackingViewModel} from "@front-end/interface-adapters/view-models/tracking";
import {TrackingApi} from "@front-end/frameworks-and-drivers/app-sync/tracking";
import {TrackingRepository} from "@front-end/application/repositories/tracking";
import {TrackingInteractors} from "@front-end/application/interactors/tracking";
import {TrackingUsecases} from "@front-end/application/usecases/tracking";
import {TrackingControllers} from "@front-end/interface-adapters/controllers/tracking";
import {InquiryApi} from "@front-end/frameworks-and-drivers/app-sync/inquiry";
import {InquiryRepository} from "@front-end/application/repositories/inquiry";
import {InquiryInteractors} from "@front-end/application/interactors/inquiry";
import {InquiryUsecases} from "@front-end/application/usecases/inquiry";
import {InquiryControllers} from "@front-end/interface-adapters/controllers/inquiry";

const useStyles = createStyles((theme) => ({
  card: {
    '&:hover': {
      background: theme.colors.gray[0], transform: 'scale(1.01)', boxShadow: theme.shadows.md, cursor: "pointer"
    },
  },
}));

const UserInfo = () => {
  const appUserRepository: AppUserRepository = new AppUserApi();
  const appUserUseCase: AppUserUseCase = new AppUserInteractor(appUserRepository);
  const appUserController: AppUserController = new AppUserController(appUserUseCase);
  const trackingRepository: TrackingRepository = new TrackingApi();
  const trackingUseCase: TrackingUsecases = new TrackingInteractors(trackingRepository);
  const trackingController: TrackingControllers = new TrackingControllers(trackingUseCase);
  const inquiryRepository: InquiryRepository = new InquiryApi();
  const inquiryUseCase: InquiryUsecases = new InquiryInteractors(inquiryRepository);
  const inquiryController: InquiryControllers = new InquiryControllers(inquiryUseCase);

  const {id} = useParams();
  const {classes} = useStyles();

  const [user, setUser] = useState<AppUser | null>(null);
  const [locations, setLocations] = useState<TrackingViewModel[]>([]);
  const [inquiries, setInquiries] = useState<InquiryViewModel[]>([]);

  const fetchDetails = async (id: string) => {
    appUserController.getUser(id!).then((user) => {
      setUser(user);
    });
  }

  const fetchTrackingList = async (id: string) => {
    //TODO: Fetch tracking list from API
    setLocations([
      {
        id: "Thinh's house",
        name: "Location 1",
        address: "12 Đoàn Văn Bơ, Phường 10, Quận 4, Thành phố Hồ Chí Minh",
        status: "Good"
      },
      {
        id: "2",
        name: "School",
        address: "268 Lý Thường Kiệt, Phường 14, Quận 10, Thành phố Hồ Chí Minh",
        status: "More Mosquitoes"
      },
      {
        id: "3",
        name: "Company",
        address: "11 Đoàn Văn Bơ, Phường 10, Quận 4, Thành phố Hồ Chí Minh",
        status: "Epidemic"
      },
      {
        id: "4",
        name: "Ngoc's house",
        address: "Phường 5, Quận 11, Thành phố Hồ Chí Minh",
        status: "High Risk"
      },
      {
        id: "5",
        name: "Khoa's house",
        address: "Xã Trung Chánh, Huyện Hóc Môn, Thành phố Hồ Chí Minh",
        status: "Good"
      },
      {
        id: "6",
        name: "Phong's house",
        address: "Phường 2, Quận 9, Thành phố Hồ Chí Minh",
        status: "Good"
      },
      {
        id: "7",
        name: "Quang's house",
        address: "Phường 3, Quận 9, Thành phố Hồ Chí Minh",
        status: "Good"
      }
    ]);
  }

  const fetchInquiryList = async (id: string) => {
    //TODO: Fetch inquiry list from API
    setInquiries([
      {
        id: "1",
        username: user?.name ?? "Nguyen Mai Thy",
        timestamp: "03/05/2023 15:15",
        address: "Address 1",
        details: "The predict results at my living area is incorrect",
        status: "Opening"
      },
      {
        id: "2",
        username: user?.name ?? "Nguyen Mai Thy",
        timestamp: "03/05/2023 15:15",
        address: "Address 2",
        details: "My app is slow",
        status: "Closed"
      },
    //   {
    //     id: "3",
    //     username: user?.name ?? "",
    //     timestamp: "03/05/2023 15:15",
    //     address: "Address 3",
    //     details: "The predict results at my living area is incorrect",
    //     status: "Closed"
    //   },
    //   {
    //     id: "4",
    //     username: user?.name ?? "",
    //     timestamp: "03/05/2023 15:15",
    //     address: "Address 4",
    //     details: "I can't find my place on your map",
    //     status: "Closed"
    //   },
    //   {
    //     id: "5",
    //     username: user?.name ?? "",
    //     timestamp: "03/05/2023 15:15",
    //     address: "Address 5",
    //     details: "The predict results at my living area is incorrect",
    //     status: "Closed"
    //   },
    //   {
    //     id: "6",
    //     username: user?.name ?? "",
    //     timestamp: "03/05/2023 15:15",
    //     address: "Address 6",
    //     details: "I can't find my place on your map",
    //     status: "Closed"
    //   },
    //   {
    //     id: "7",
    //     username: user?.name ?? "",
    //     timestamp: "03/05/2023 15:15",
    //     address: "Address 7",
    //     details: "The predict results at my living area is incorrect",
    //     status: "Closed"
    //   }
    ]);
  }

  useEffect(() => {
    fetchDetails(id!)
      .then(() => {
        fetchTrackingList(id!);
        fetchInquiryList(id!);
      });
  }, []);

  const trackingList = locations.map((location) => {
    return (
      <Card
        withBorder
        radius="md"
        w="100%"
        className={classes.card}
      >
        <div style={{display: "flex", justifyContent: "space-between"}}>
          <Text fz="xs" tt="uppercase" fw={400} c="dimmed">
            {location.address}
          </Text>
          <Badge variant={"light"} size={"xs"} color={location.status === "Epidemic" ? "red" : (
            location.status === "High Risk" ? "orange" : (
              location.status === "More Mosquitoes" ? "yellow" : ""
            ))}>
            {location.status}
          </Badge>
        </div>
        <Text fz="lg" fw={500} c={"dark.4"}>
          {location.name}
        </Text>
      </Card>
    )
  });

  return (
    <Grid>
      <Grid.Col span={12}>
        <Paper withBorder p="md" radius="md" color={"cyan.0"}>
          <Grid>
            <Grid.Col xs={12} md="content" p="lg">
              <Image maw="15vh" mah="15vh"
                     ml="auto" mr="auto"
                     src={user?.photoUrl ?? "https://lvtn-s3-vove-web.s3.ap-southeast-1.amazonaws.com/vove.png"}
                     radius="100%" alt="Avatar"></Image>
            </Grid.Col>
            <Grid.Col xs={12} md="auto">
              <Title order={1} mb="xs">{user?.name}</Title>
              <Text mb="xs"><b>Email:</b> {user?.email}</Text>
              <Text mb="xs"><b>Phone:</b> {user?.phoneNumber}</Text>
              <Text mb="xs"><b>Address:</b> {user?.address}</Text>
            </Grid.Col>
          </Grid>
        </Paper>
      </Grid.Col>

      <Grid.Col xs={12} md={6}>
        <Paper withBorder radius="md" p="md">
          <Title order={2} mb="xs">Tracking List</Title>
          <ScrollArea h="58vh">
            <Stack spacing={10} p={10}>
              {trackingList}
            </Stack>
          </ScrollArea>
        </Paper>
      </Grid.Col>

      <Grid.Col xs={12} md={6}>
        <Paper withBorder radius="md" p="md">
          <Title order={2} mb="xs">Inquiry List</Title>
          <ScrollArea h="58vh">
            <InquirySummary inquiries={inquiries}></InquirySummary>
          </ScrollArea>
        </Paper>
      </Grid.Col>
    </Grid>
  )
}

export default UserInfo;

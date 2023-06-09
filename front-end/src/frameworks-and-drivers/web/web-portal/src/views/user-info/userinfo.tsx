import {AppUserRepository} from "@front-end/application/repositories/app-user";
import {AppUserApi} from "@front-end/frameworks-and-drivers/app-sync/user";
import {AppUserUseCase} from "@front-end/application/usecases/app-user";
import {AppUserInteractor} from "@front-end/application/interactors/app-user";
import {AppUserController} from "@front-end/interface-adapters/controllers/app-user";
import {Card, Container, createStyles, Grid, Paper, ScrollArea, Skeleton, Stack, Text, Title} from "@mantine/core";
import {useParams} from "react-router-dom";
import {AppUserDetail, TrackingPlace} from "@front-end/domain/entities/app-user";
import {useEffect, useState} from "react";
import {InquiryViewModel} from "@front-end/interface-adapters/view-models/inquiry";
import InquirySummary from "../../components/inquiry-summary/inquiry-summary";
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

  const [user, setUser] = useState<AppUserDetail | null>(null);
  const [locations, setLocations] = useState<TrackingPlace[]>([]);
  const [inquiries, setInquiries] = useState<InquiryViewModel[]>([]);
  const [isLoadingUser, setIsLoadingUser] = useState<boolean>(true);
  const [isLoadingTracking, setIsLoadingTracking] = useState<boolean>(true);
  const [isLoadingInquiry, setIsLoadingInquiry] = useState<boolean>(true);

  const fetchDetails = async (id: string) => {
    try {
      const userDetail = await appUserController.getUser(id);
      setUser(userDetail);
      return userDetail;
    } catch (error) {
      console.log(error);
    }
  }

  const fetchTrackingList = async (trackingPlaces: TrackingPlace[]) => {
    //TODO: Fetch tracking list from API
    if (trackingPlaces.length === 0) return;
    else {
      setLocations(trackingPlaces);
    }
  }

  const fetchInquiryList = async (id: string) => {
    //TODO: Fetch inquiry list from API
    setIsLoadingInquiry(false)
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
        timestamp: "01/05/2023 5:51",
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
      .then((user) => {
        setIsLoadingUser(false);
        fetchTrackingList(user?.trackingPlaces ?? []);
        fetchInquiryList(id!);
      });
  }, []);

  useEffect(() => {
    if (locations.length !== 0) {
      console.log(locations)
      setIsLoadingTracking(false)
    }
  }, [locations])

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
            {location.addressName}
          </Text>
          {/*<Badge variant={"light"} size={"xs"} color={location.status === "HIGH RISK" ? "red" : (*/}
          {/*  location.status === "LOW RISK" ? "orange" : (*/}
          {/*    location.status === "NORMAL" ? "yellow" : ""*/}
          {/*  ))}>*/}
          {/*  {location.status}*/}
          {/*</Badge>*/}
        </div>
        <Text fz="lg" fw={500} c={"dark.4"}>
          {location.title}
        </Text>
      </Card>
    )
  });

  return (
    <Container fluid>
      <Grid>
        <Grid.Col span={12}>
          <Skeleton visible={isLoadingUser}>
            <Paper withBorder p="md" radius="md">
              <Title order={1} mb="xs">{user?.name}</Title>
              <Text mb="xs"><b>Phone:</b> {user?.phone}</Text>
              <Text mb="xs"><b>Address:</b> {user?.addressName}</Text>
            </Paper>
          </Skeleton>
        </Grid.Col>

        <Grid.Col xs={12} md={6}>
          <Skeleton visible={isLoadingUser}>
            <Paper withBorder radius="md" py="md">
              <Title order={2} mb="xs" mx="md">Tracking List</Title>
              <ScrollArea h="60vh">
                <Container px="md">
                  <Skeleton visible={isLoadingTracking}>
                    <Stack spacing={10}>
                      {trackingList}
                    </Stack>
                  </Skeleton>
                </Container>
              </ScrollArea>
            </Paper>
          </Skeleton>
        </Grid.Col>

        <Grid.Col xs={12} md={6}>
          <Skeleton visible={isLoadingUser}>
            <Paper withBorder radius="md" py="md">
              <Title order={2} mb="xs" mx="md">Inquiry List</Title>
              <ScrollArea h="60vh">
                <Container px="md">
                  <Skeleton visible={isLoadingInquiry}>
                    <InquirySummary inquiries={inquiries}></InquirySummary>
                  </Skeleton>
                </Container>
              </ScrollArea>
            </Paper>
          </Skeleton>
        </Grid.Col>
      </Grid>
    </Container>
  )
}

export default UserInfo;

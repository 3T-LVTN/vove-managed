import {AppShell, Header, Container, Group, Menu, ActionIcon, Avatar, Anchor, Button} from "@mantine/core";
import {createStyles, useMantineTheme} from "@mantine/core";
import {Outlet, useNavigate} from 'react-router-dom';
import {useEffect, useState} from "react";
import {Logo} from "./logo";
import {AuthFirebase} from "@front-end/frameworks-and-drivers/firebase-auth";
import {UserInteractor} from "@front-end/application/interactors/user";
import {UserController} from "@front-end/interface-adapters/controllers/user";
import {IconLogout} from "@tabler/icons-react";
import {UserViewModel} from "@front-end/interface-adapters/view-models/user";

const useStyles = createStyles((theme) => ({
  inner: {
    height: "60px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },

  navigation: {
    [theme.fn.smallerThan("md")]: {
      display: "none",
    },
  },

  username: {
    [theme.fn.smallerThan("sm")]: {
      display: "none",
    },
  },
}));

export const Frame = () => {
  const authRepository = new AuthFirebase();
  const userUseCase = new UserInteractor(authRepository);
  const userController = new UserController(userUseCase);

  const [currentUser, setCurrentUser] = useState<UserViewModel>();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  const navigate = useNavigate();
  const {classes} = useStyles();
  window.scrollTo(0, 0);

  useEffect(() => {
    userController.getUser()
      .then((user) => setCurrentUser(user))
      .then(() => setIsAuthenticated(true))
      .catch(() => navigate("/login"));
  }, []);

  const theme = useMantineTheme();

  const renderFrame = () => (
    <AppShell
      styles={{
        main: {
          background:
            theme.colorScheme === "dark"
              ? theme.colors["dark"][8]
              : theme.colors["white"],
        },
      }}
      header={
        <Header height={60} mb={120} px="md">
          <Container className={classes.inner} fluid>
            <Logo/>
            <Group spacing="xl" className={classes.navigation}>
              <Anchor underline={false} onClick={() => navigate("users")}>
                Người dùng
              </Anchor>
              <Anchor underline={false} onClick={() => navigate("model-management")}>
                Mô hình
              </Anchor>
              <Anchor underline={false} onClick={() => navigate("app-analysis")}>
                Thống kê
              </Anchor>
              <Anchor underline={false} onClick={() => navigate("districts")}>
                Địa điểm
              </Anchor>
              <Anchor underline={false} onClick={() => navigate("inquiries")}>
                Yêu cầu hỗ trợ
              </Anchor>
            </Group>
            <Group miw={290} position="right">
              <span className={classes.username}>{currentUser?.email}</span>
              <Menu
                transitionProps={{transition: "pop"}}
                position="bottom-end"
                withinPortal
              >
                <Menu.Target>
                  <ActionIcon>
                    <Avatar color="cyan" radius="xl"/>
                  </ActionIcon>
                </Menu.Target>
                <Menu.Dropdown>
                  <Menu.Item
                    onClick={() => userController.signOut()
                      .then(() => navigate("/login"))}
                    icon={<IconLogout size="1rem" stroke={1.5}/>}
                  >
                    Logout
                  </Menu.Item>
                </Menu.Dropdown>
              </Menu>
            </Group>
          </Container>
        </Header>
      }
    >
      <Outlet></Outlet>
    </AppShell>
  );

  return isAuthenticated ? renderFrame() : null;
};

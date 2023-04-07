import {AppShell, Header, Container, Group, Menu, ActionIcon, Avatar} from "@mantine/core";
import {createStyles, useMantineTheme} from "@mantine/core";
import {Outlet, useLocation, useNavigate} from 'react-router-dom';
import {useEffect, useState} from "react";
import {onAuthStateChanged, getAuth} from "firebase/auth";
import {User} from "@front-end/domain/entities/user";
import {Logo} from "./logo";
import {AuthFirebase} from "@front-end/frameworks-and-drivers/firebase-auth";
import {UserInteractor} from "@front-end/application/interactors/user";
import {UserController} from "@front-end/interface-adapters/controllers/user";
import { IconLogout } from "@tabler/icons-react";


const navigations = [
  {name: "Home", href: "#", current: true},
  {name: "Others", href: "#", current: false},
  {name: "About", href: "#", current: false},
];

const authRoutes = [
  "/login",
  "/reset-password"
]

const useStyles = createStyles((theme) => ({
  inner: {
    height: "60px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },

  navigation: {
    [theme.fn.smallerThan("sm")]: {
      display: "none",
    },
  },
}));

export const Frame = () => {
  const authRepository = new AuthFirebase();
  const userUseCase = new UserInteractor(authRepository);
  const userController = new UserController(userUseCase);

  const [currentUser, setCurrentUser] = useState<User>();
  const userEmail = currentUser?.email ?? "";
  const navigate = useNavigate();
  const location = useLocation();
  const {classes} = useStyles();
  window.scrollTo(0, 0);
  const auth = getAuth();

  const isAuthRoutes = () => {
    return authRoutes.includes(location.pathname);
  }
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser({
          email: user.email,
          name: user.displayName,
          photoUrl: user.photoURL
        } as User);
        navigate("");
      } else {
        if (isAuthRoutes()) return;
        navigate("/login");
      }
    });
  }, [currentUser]);

  const theme = useMantineTheme();
  return (
    <AppShell
      styles={{
        main: {
          background:
            theme.colorScheme === "dark"
              ? theme.colors["dark"][8]
              : theme.colors["gray"][0],
        },
      }}
      header={
        !isAuthRoutes() ?
          <Header height={60} sx={{borderBottom: 0}} mb={120}>
            <Container className={classes.inner} fluid>
              <Group>
                <Logo/>
              </Group>
              <Group>
                <span>{userEmail}</span>
                <Menu
                  transitionProps={{ transition: "pop" }}
                  position="bottom-end"
                  withinPortal
                >
                  <Menu.Target>
                    <ActionIcon>
                      <Avatar radius="xl" />
                    </ActionIcon>
                  </Menu.Target>
                  <Menu.Dropdown>
                    <Menu.Item
                      onClick={() => userController.signOut()}
                      icon={<IconLogout size="1rem" stroke={1.5} />}
                    >
                      Logout
                    </Menu.Item>
                  </Menu.Dropdown>
                </Menu>
              </Group>
            </Container>
          </Header>
          :
          <></>
      }
    >
      <Outlet></Outlet>
    </AppShell>
  );
};

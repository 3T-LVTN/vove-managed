import {AppShell, Footer, Header, Anchor, Container, Group, Button} from "@front-end/shared/ui";
import {createStyles, useMantineTheme} from "@mantine/core";
import {Outlet, useLocation, useNavigate} from 'react-router-dom';
import {useEffect, useState} from "react";
import {onAuthStateChanged, User} from "firebase/auth";
import {auth} from "@front-end/frameworks-and-drivers/firebase-auth";
import {Logo} from "./logo";

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
  const [currentUser, setCurrentUser] = useState<User>();
  const navigate = useNavigate();
  const location = useLocation();
  const { classes } = useStyles();

  const isAuthRoutes = () => {
    return authRoutes.includes(location.pathname);
  }

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        user.getIdToken().then((token) => {
          localStorage.setItem("token", token);
        });

        setCurrentUser(user);
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
      // footer={
      //   !isAuthRoutes() ?
      //     <Footer height={60} p="md">
      //       Application footer
      //       {/*TODO: Change to appropriate footer*/}
      //     </Footer>
      //     :
      //     <></>
      // }
      header={
        !isAuthRoutes() ?
          <Header height={60} sx={{ borderBottom: 0 }} mb={120}>
            <Container className={classes.inner} fluid>
              <Group>
                <Logo />
              </Group>
              <Group spacing={5} className={classes.navigation}>
                {navigations.map((item) => (
                  <Anchor href={item.href} target="_self" key={item.name}>
                    {item.name}
                  </Anchor>
                ))}
              </Group>
              <Button radius="xl" h={30}>
                Logout
              </Button>
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

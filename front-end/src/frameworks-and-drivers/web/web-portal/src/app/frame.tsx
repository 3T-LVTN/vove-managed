import {AppShell, Footer, Header, Anchor} from "@front-end/shared/ui";
import {useMantineTheme} from "@mantine/core";
import {Outlet, useLocation, useNavigate} from 'react-router-dom';
import {useEffect, useState} from "react";
import {onAuthStateChanged, User} from "firebase/auth";
import {auth} from "@front-end/frameworks-and-drivers/firebase-auth";

const navigations = [
  {name: "Home", href: "#", current: true},
  {name: "Others", href: "#", current: false},
  {name: "About", href: "#", current: false},
];

const authRoutes = [
  "/login",
  "/reset-password"
]

export const Frame = () => {
  const [currentUser, setCurrentUser] = useState<User>();
  const navigate = useNavigate();
  const location = useLocation();

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
      footer={
        !isAuthRoutes() ?
          <Footer height={60} p="md">
            Application footer
            {/*TODO: Change to appropriate footer*/}
          </Footer>
          :
          <></>
      }
      header={
        !isAuthRoutes() ?
          <Header height={{base: 50, md: 70}} p="md">
            <div
              style={{
                display: "flex",
                alignItems: "center",
                height: "100%",
                gap: "16px",
              }}
            >
              {/*TODO: Add logo*/}
              {navigations.map((item) => (
                <Anchor href={item.href} target="_self">
                  {item.name}
                </Anchor>
              ))}
            </div>
          </Header>
          :
          <></>
      }
    >
      <Outlet></Outlet>
    </AppShell>
  );
};

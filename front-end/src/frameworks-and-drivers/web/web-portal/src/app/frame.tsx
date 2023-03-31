import {AppShell, Footer, Header, Anchor} from "@front-end/shared/ui";
import {useMantineTheme} from "@mantine/core";
import {Outlet} from 'react-router-dom';

const navigations = [
  { name: "Home", href: "#", current: true },
  { name: "Others", href: "#", current: false },
  { name: "About", href: "#", current: false },
];

export const Frame = () => {
    const theme = useMantineTheme();
    return (
      <AppShell
        styles = {{
          main: {
            background:
            theme.colorScheme === "dark"
              ? theme.colors["dark"][8]
              : theme.colors["gray"][0],
          },
        }}
        footer={
          <Footer height={60} p="md">
            Application footer
            {/*TODO: Change to appropriate footer*/}
          </Footer>
        }
        header ={
          <Header height={{ base: 50, md: 70 }} p="md">
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
        }
      >
        <Outlet></Outlet>
      </AppShell>
    );
};

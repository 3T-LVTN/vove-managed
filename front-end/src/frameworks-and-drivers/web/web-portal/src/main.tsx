import {MantineProvider} from "@mantine/core";
import {StrictMode} from 'react';
import * as ReactDOM from 'react-dom/client';

import App from './app/app';
import {Notifications} from "@mantine/notifications";

import {theme} from "./assets/theme";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);


root.render(
  <StrictMode>
    <MantineProvider
      theme={{
        globalStyles: (theme) => ({
          body: {
            margin: 0,
          }
        }),
        primaryColor: theme.primaryColor,
      }}
    >
      <Notifications />
      <App/>
    </MantineProvider>
  </StrictMode>
);

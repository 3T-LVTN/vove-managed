import {MantineProvider} from "@front-end/shared/ui";
import {StrictMode} from 'react';
import * as ReactDOM from 'react-dom/client';

import App from './app/app';
import {Notifications} from "@mantine/notifications";

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
        primaryColor: "cyan",
      }}
    >
      <Notifications />
      <App/>
    </MantineProvider>
  </StrictMode>
);

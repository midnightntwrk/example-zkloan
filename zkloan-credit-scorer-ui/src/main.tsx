import './globals';

import React from 'react';
import ReactDOM from 'react-dom/client';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { setNetworkId, type NetworkId } from '@midnight-ntwrk/midnight-js-network-id';
import * as pino from 'pino';
import App from './App';
import { theme } from './config/theme';
import { ZKLoanProvider } from './contexts';
import '@midnight-ntwrk/dapp-connector-api';

const networkId = import.meta.env.VITE_NETWORK_ID as NetworkId;
setNetworkId(networkId);

export const logger = pino.pino({
  level: import.meta.env.VITE_LOGGING_LEVEL as string,
  browser: {
    asObject: true,
  },
});

logger.trace(`networkId = ${networkId}`);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <CssBaseline />
    <ThemeProvider theme={theme}>
      <ZKLoanProvider logger={logger}>
        <App />
      </ZKLoanProvider>
    </ThemeProvider>
  </React.StrictMode>,
);

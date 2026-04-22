import React, { type PropsWithChildren } from 'react';
import { Box } from '@mui/material';
import { Header } from './Header';

export const MainLayout: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundColor: 'background.default',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Header />
      <Box
        component="main"
        sx={{
          flex: 1,
          width: '100%',
          maxWidth: 1200,
          mx: 'auto',
          px: { xs: 3, sm: 5, md: 8 },
          py: { xs: 6, md: 10 },
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

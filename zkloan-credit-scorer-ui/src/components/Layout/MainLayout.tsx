import React, { type PropsWithChildren } from 'react';
import { Box, Container } from '@mui/material';
import { Header } from './Header';

export const MainLayout: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <Box sx={{ minHeight: '100vh', background: '#0a0a0a' }}>
      <Header />
      <Container maxWidth="md" sx={{ py: 4 }}>
        {children}
      </Container>
    </Box>
  );
};

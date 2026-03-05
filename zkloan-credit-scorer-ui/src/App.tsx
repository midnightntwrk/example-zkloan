import React, { useState, useEffect } from 'react';
import { Box, Stack, Typography, Link, Alert } from '@mui/material';
import { MainLayout, ContractConnect, PrivateStateCard, LoanRequestForm, MyLoans } from './components';
import { useZKLoanContext } from './hooks';
import { type ZKLoanDeployment } from './contexts';

const App: React.FC = () => {
  const { deployment$ } = useZKLoanContext();
  const [deployment, setDeployment] = useState<ZKLoanDeployment>({ status: 'idle' });

  useEffect(() => {
    const subscription = deployment$.subscribe(setDeployment);
    return () => subscription.unsubscribe();
  }, [deployment$]);

  const isConnected = deployment.status === 'deployed';

  return (
    <MainLayout>
      <Typography variant="h4" component="h1" sx={{ mb: 1 }}>
        Privacy-Preserving Credit Scoring
      </Typography>
      <Typography variant="body1" color="grey.400" sx={{ mb: 2 }}>
        Apply for a loan using zero-knowledge proofs. Your financial data stays private.
      </Typography>

      <Alert severity="warning" sx={{ mb: 3 }}>
        <Typography variant="body2">
          <strong>Disclaimer:</strong> This is a demonstration application designed to showcase Midnight's
          technology. It is not a real lending service and serves as a reference implementation
          for the builder community.
        </Typography>
      </Alert>

      <Stack spacing={3}>
        {/* Contract connection - always visible and interactive */}
        <ContractConnect />

        {/* Main UI - visible but disabled until connected */}
        <Box
          sx={{
            opacity: isConnected ? 1 : 0.5,
            pointerEvents: isConnected ? 'auto' : 'none',
            transition: 'opacity 0.3s ease',
            position: 'relative',
          }}
        >
          {!isConnected && (
            <Box
              sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                zIndex: 10,
                cursor: 'not-allowed',
              }}
            />
          )}
          <Stack spacing={3}>
            <PrivateStateCard />
            <LoanRequestForm />
            <MyLoans />
          </Stack>
        </Box>
      </Stack>

      <Box sx={{ mt: 4, textAlign: 'center' }}>
        <Typography variant="body2" color="grey.600">
          Built on{' '}
          <Link href="https://midnight.network" target="_blank" rel="noopener" color="primary">
            Midnight
          </Link>
          . Private by design.
        </Typography>
      </Box>
    </MainLayout>
  );
};

export default App;

import React, { useState, useEffect } from 'react';
import { Box, Stack, Typography, Link } from '@mui/material';
import {
  MainLayout,
  ContractConnect,
  PrivateStateCard,
  LoanRequestForm,
  MyLoans,
  FlowStepper,
  LaceGate,
  type FlowStep,
  type StepState,
} from './components';
import { useZKLoanContext } from './hooks';
import { type ZKLoanDeployment } from './contexts';
import { tokens } from './config/theme';

const App: React.FC = () => {
  const {
    deployment$,
    isConnected: walletConnected,
    secretPin,
  } = useZKLoanContext();
  const [deployment, setDeployment] = useState<ZKLoanDeployment>({ status: 'idle' });

  useEffect(() => {
    const subscription = deployment$.subscribe(setDeployment);
    return () => subscription.unsubscribe();
  }, [deployment$]);

  const contractConnected = deployment.status === 'deployed';
  const pinSet = secretPin.length >= 4 && secretPin.length <= 6;

  const stepState = (
    done: boolean,
    priorDone: boolean,
  ): StepState => (done ? 'done' : priorDone ? 'current' : 'pending');

  const steps: FlowStep[] = [
    {
      index: '01',
      label: 'Wallet',
      state: stepState(walletConnected, true),
    },
    {
      index: '02',
      label: 'Contract',
      state: stepState(contractConnected, walletConnected),
    },
    {
      index: '03',
      label: 'PIN',
      state: stepState(pinSet && contractConnected, contractConnected),
    },
    {
      index: '04',
      label: 'Request',
      state: stepState(false, pinSet && contractConnected),
    },
  ];

  return (
    <MainLayout>
      {/* Hero */}
      <Box
        sx={{
          mb: { xs: 4, md: 5 },
          animation: 'reveal 700ms cubic-bezier(.2,.8,.2,1) both',
        }}
      >
        <Typography
          variant="overline"
          sx={{
            display: 'block',
            mb: 4,
            color: tokens.inkMuted,
            letterSpacing: '0.22em',
          }}
        >
          <Box
            component="span"
            sx={{
              display: 'inline-block',
              width: 6,
              height: 6,
              borderRadius: '50%',
              backgroundColor: tokens.accent,
              mr: 1.5,
              verticalAlign: 'middle',
            }}
          />
          Privacy-preserving loans · Midnight Preprod · Ledger v8
        </Typography>

        <Typography
          variant="h1"
          component="h1"
          sx={{
            mb: 3.5,
            color: tokens.ink,
          }}
        >
          Credit scoring,{' '}
          <Box
            component="em"
            sx={{
              fontStyle: 'italic',
              color: tokens.accent,
              fontVariationSettings: '"opsz" 144, "SOFT" 100',
            }}
          >
            without the paperwork
          </Box>
          .
        </Typography>

        <Typography
          sx={{
            fontFamily: '"IBM Plex Sans", sans-serif',
            fontSize: '1.05rem',
            lineHeight: 1.65,
            color: tokens.inkDim,
            maxWidth: 920,
            mb: 4,
          }}
        >
          Apply for a loan using zero-knowledge proofs. Your credit score, income, and
          tenure stay on this device — only the verdict reaches the ledger.
        </Typography>

        {/* Requirements strip */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 2,
            py: 1.25,
            px: 0,
            borderTop: `1px solid ${tokens.hairline}`,
            borderBottom: `1px solid ${tokens.hairline}`,
            flexWrap: 'wrap',
          }}
        >
          <Typography
            variant="overline"
            sx={{ color: tokens.cobalt, flexShrink: 0 }}
          >
            Requires
          </Typography>
          <Typography
            sx={{
              fontFamily: '"IBM Plex Sans", sans-serif',
              fontSize: '0.85rem',
              color: tokens.inkDim,
              flex: 1,
              minWidth: 0,
            }}
          >
            <Link
              href="https://chromewebstore.google.com/detail/lace/gafhhkghbfjjkeiendhlofajokpaflmk"
              target="_blank"
              rel="noopener"
              sx={{ color: tokens.ink }}
            >
              Midnight Lace
            </Link>{' '}
            on <Box component="span" sx={{ color: tokens.ink, fontWeight: 500 }}>Preprod</Box>
            , funded with tDUST
          </Typography>
        </Box>
      </Box>

      <LaceGate>
        {/* Progress */}
        <Box sx={{ mb: { xs: 4, md: 5 } }}>
          <FlowStepper steps={steps} />
        </Box>

        {/* Sections */}
        <Stack
          spacing={4}
          sx={{
            '& > *': {
              animation: 'reveal 700ms cubic-bezier(.2,.8,.2,1) both',
            },
            '& > *:nth-of-type(1)': { animationDelay: '120ms' },
            '& > *:nth-of-type(2)': { animationDelay: '220ms' },
          }}
        >
          <ContractConnect />

          <Box
            sx={{
              opacity: contractConnected ? 1 : 0.38,
              filter: contractConnected ? 'none' : 'saturate(0.4)',
              pointerEvents: contractConnected ? 'auto' : 'none',
              transition: 'opacity 420ms ease, filter 420ms ease',
              position: 'relative',
            }}
          >
            {!contractConnected && (
              <Box
                aria-hidden
                sx={{
                  position: 'absolute',
                  inset: 0,
                  zIndex: 10,
                  cursor: 'not-allowed',
                }}
              />
            )}
            <Stack spacing={4}>
              <PrivateStateCard />
              <LoanRequestForm />
              <MyLoans />
            </Stack>
          </Box>
        </Stack>
      </LaceGate>

      {/* Colophon */}
      <Box
        sx={{
          mt: { xs: 10, md: 14 },
          pt: 4,
          borderTop: `1px solid ${tokens.hairline}`,
        }}
      >
        <Typography
          sx={{
            fontFamily: '"IBM Plex Sans", sans-serif',
            fontSize: '0.82rem',
            lineHeight: 1.55,
            color: tokens.inkMuted,
            mb: 2.5,
            maxWidth: 720,
          }}
        >
          <Box
            component="span"
            sx={{
              fontFamily: '"IBM Plex Mono", monospace',
              fontSize: '0.68rem',
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: tokens.amber,
              mr: 1.25,
            }}
          >
            Demo ·
          </Box>
          Reference implementation showcasing Midnight's technology — not a real lending service.
        </Typography>
      </Box>

      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: 2,
        }}
      >
        <Typography
          sx={{
            fontFamily: '"IBM Plex Mono", monospace',
            fontSize: '0.7rem',
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            color: tokens.inkMuted,
          }}
        >
          Built on{' '}
          <Link
            href="https://midnight.network"
            target="_blank"
            rel="noopener"
            sx={{
              color: tokens.ink,
              textDecoration: 'none',
              borderBottom: `1px solid ${tokens.hairlineStrong}`,
              pb: '1px',
              '&:hover': {
                color: tokens.accent,
                borderBottomColor: tokens.accent,
              },
            }}
          >
            Midnight
          </Link>
          {' · '}Private by design · Preprod
        </Typography>
        <Typography
          sx={{
            fontFamily: '"IBM Plex Mono", monospace',
            fontSize: '0.7rem',
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            color: tokens.inkMuted,
          }}
        >
          v3.0
        </Typography>
      </Box>
    </MainLayout>
  );
};

export default App;

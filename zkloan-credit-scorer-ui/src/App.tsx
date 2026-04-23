import React, { useState, useEffect } from 'react';
import { Box, Stack, Typography, Link } from '@mui/material';
import { MainLayout, ContractConnect, PrivateStateCard, LoanRequestForm, MyLoans } from './components';
import { useZKLoanContext } from './hooks';
import { type ZKLoanDeployment } from './contexts';
import { tokens } from './config/theme';

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

        {/* Asides */}
        <Stack spacing={1.5}>
          <Box
            sx={{
              borderLeft: `2px solid ${tokens.cobalt}`,
              backgroundColor: `${tokens.cobalt}0a`,
              pl: 2.5,
              pr: 3,
              py: 2,
            }}
          >
            <Typography
              variant="overline"
              sx={{ display: 'block', color: tokens.cobalt, mb: 0.5 }}
            >
              Preprod only
            </Typography>
            <Typography
              sx={{
                fontFamily: '"IBM Plex Sans", sans-serif',
                fontSize: '0.88rem',
                lineHeight: 1.55,
                color: tokens.inkDim,
              }}
            >
              This DApp requires the{' '}
              <Link
                href="https://chromewebstore.google.com/detail/lace/gafhhkghbfjjkeiendhlofajokpaflmk"
                target="_blank"
                rel="noopener"
                sx={{ color: tokens.ink }}
              >
                Midnight Lace wallet
              </Link>{' '}
              set to <strong style={{ color: tokens.ink }}>Preprod</strong>, funded with
              tDUST from the Preprod faucet. Local docker networks aren't supported by
              Lace — for local iteration, use the CLI workspace instead.
            </Typography>
          </Box>

          <Box
            sx={{
              borderLeft: `2px solid ${tokens.amber}`,
              backgroundColor: `${tokens.amber}0a`,
              pl: 2.5,
              pr: 3,
              py: 2,
            }}
          >
            <Typography
              variant="overline"
              sx={{ display: 'block', color: tokens.amber, mb: 0.5 }}
            >
              Demonstration only
            </Typography>
            <Typography
              sx={{
                fontFamily: '"IBM Plex Sans", sans-serif',
                fontSize: '0.88rem',
                lineHeight: 1.55,
                color: tokens.inkDim,
              }}
            >
              A reference implementation showcasing Midnight's technology, not a real
              lending service. Use it to learn the stack — not to apply for credit.
            </Typography>
          </Box>
        </Stack>
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
            opacity: isConnected ? 1 : 0.38,
            filter: isConnected ? 'none' : 'saturate(0.4)',
            pointerEvents: isConnected ? 'auto' : 'none',
            transition: 'opacity 420ms ease, filter 420ms ease',
            position: 'relative',
          }}
        >
          {!isConnected && (
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

      {/* Colophon */}
      <Box
        sx={{
          mt: { xs: 10, md: 14 },
          pt: 4,
          borderTop: `1px solid ${tokens.hairline}`,
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

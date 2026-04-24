import React, { useEffect, useState } from 'react';
import { Box, Typography, Link, CircularProgress } from '@mui/material';
import { tokens } from '../../config/theme';

const CHROME_STORE_URL =
  'https://chromewebstore.google.com/detail/lace/gafhhkghbfjjkeiendhlofajokpaflmk';

type Status = 'checking' | 'found' | 'missing';

export const LaceGate: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [status, setStatus] = useState<Status>('checking');

  useEffect(() => {
    const start = Date.now();
    const deadline = 4000;
    let cancelled = false;

    const check = () => {
      if (cancelled) return;
      const mid = (window as unknown as { midnight?: Record<string, unknown> }).midnight;
      const hasLace = !!mid && (!!mid.mnLace || Object.keys(mid).length > 0);
      if (hasLace) {
        setStatus('found');
        return;
      }
      if (Date.now() - start >= deadline) {
        setStatus('missing');
        return;
      }
      window.setTimeout(check, 200);
    };

    check();
    return () => {
      cancelled = true;
    };
  }, []);

  if (status === 'found') {
    return <>{children}</>;
  }

  if (status === 'checking') {
    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 2,
          py: { xs: 10, md: 16 },
          color: tokens.inkDim,
        }}
      >
        <CircularProgress size={18} thickness={3} sx={{ color: tokens.accent }} />
        <Typography
          sx={{
            fontFamily: '"IBM Plex Mono", monospace',
            fontSize: '0.72rem',
            letterSpacing: '0.16em',
            textTransform: 'uppercase',
            color: tokens.inkMuted,
          }}
        >
          Looking for Midnight Lace…
        </Typography>
      </Box>
    );
  }

  // status === 'missing'
  return (
    <Box
      sx={{
        border: `1px solid ${tokens.hairline}`,
        borderLeft: `2px solid ${tokens.accent}`,
        backgroundColor: 'rgba(231, 125, 77, 0.04)',
        p: { xs: 4, md: 5 },
        maxWidth: 720,
      }}
    >
      <Typography
        variant="overline"
        sx={{ display: 'block', color: tokens.accent, mb: 2 }}
      >
        Wallet required
      </Typography>
      <Typography
        variant="h4"
        sx={{ color: tokens.ink, mb: 2, lineHeight: 1.15 }}
      >
        Install Midnight Lace to continue
      </Typography>
      <Typography
        sx={{
          fontFamily: '"IBM Plex Sans", sans-serif',
          fontSize: '0.95rem',
          lineHeight: 1.6,
          color: tokens.inkDim,
          mb: 3,
        }}
      >
        This DApp signs every transaction through the Midnight Lace browser
        extension. We couldn't find it on <code>window.midnight</code> — install
        it, set the network to <strong style={{ color: tokens.ink }}>Preprod</strong>,
        and reload this page.
      </Typography>

      <Box
        component="ol"
        sx={{
          m: 0,
          p: 0,
          pl: 2.5,
          listStyle: 'decimal',
          '& li': {
            fontFamily: '"IBM Plex Sans", sans-serif',
            fontSize: '0.88rem',
            lineHeight: 1.6,
            color: tokens.inkDim,
            mb: 0.75,
            '&::marker': {
              color: tokens.inkMuted,
              fontFamily: '"IBM Plex Mono", monospace',
              fontSize: '0.75rem',
            },
          },
        }}
      >
        <li>
          Install{' '}
          <Link
            href={CHROME_STORE_URL}
            target="_blank"
            rel="noopener"
            sx={{ color: tokens.accent }}
          >
            Midnight Lace from the Chrome Web Store
          </Link>
          .
        </li>
        <li>Pin the extension and set up or import a wallet.</li>
        <li>In Lace, switch the network to <strong style={{ color: tokens.ink }}>Preprod</strong>.</li>
        <li>Fund it with tDUST from the Preprod faucet.</li>
        <li>Reload this page.</li>
      </Box>

      <Box sx={{ mt: 3, display: 'flex', gap: 1.5, flexWrap: 'wrap' }}>
        <Box
          component="a"
          href={CHROME_STORE_URL}
          target="_blank"
          rel="noopener"
          sx={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 1,
            px: 2,
            py: 1.2,
            border: `1px solid ${tokens.accent}`,
            borderRadius: 3,
            backgroundColor: tokens.accent,
            color: tokens.paper0,
            fontFamily: '"IBM Plex Sans", sans-serif',
            fontSize: '0.88rem',
            fontWeight: 500,
            textDecoration: 'none',
            transition: 'background-color 180ms ease',
            '&:hover': { backgroundColor: tokens.accentHover },
          }}
        >
          Install Lace →
        </Box>
        <Box
          component="button"
          type="button"
          onClick={() => window.location.reload()}
          sx={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 1,
            px: 2,
            py: 1.2,
            border: `1px solid ${tokens.hairlineStrong}`,
            borderRadius: 3,
            backgroundColor: 'transparent',
            color: tokens.ink,
            fontFamily: '"IBM Plex Sans", sans-serif',
            fontSize: '0.88rem',
            fontWeight: 500,
            cursor: 'pointer',
            transition: 'border-color 180ms ease, color 180ms ease',
            '&:hover': { borderColor: tokens.ink, color: tokens.accent },
          }}
        >
          I've installed it — reload
        </Box>
      </Box>
    </Box>
  );
};

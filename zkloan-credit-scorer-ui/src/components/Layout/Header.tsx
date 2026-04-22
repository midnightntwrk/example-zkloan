import React, { useState } from 'react';
import { Box, Typography, Snackbar, Alert, CircularProgress } from '@mui/material';
import { useZKLoanContext } from '../../hooks';
import { tokens } from '../../config/theme';

export const Header: React.FC = () => {
  const { isConnected, isConnecting, walletAddress, connect } = useZKLoanContext();
  const [error, setError] = useState<string | null>(null);

  const handleConnect = async () => {
    if (isConnected || isConnecting) return;
    try {
      await connect();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to connect to wallet');
    }
  };

  const status = isConnecting ? 'Connecting' : isConnected ? 'Connected' : 'Not connected';
  const statusColor = isConnected ? tokens.sage : isConnecting ? tokens.amber : tokens.inkMuted;

  const truncatedAddress = walletAddress
    ? `${walletAddress.slice(0, 8)}…${walletAddress.slice(-6)}`
    : null;

  return (
    <>
      <Box
        component="header"
        sx={{
          position: 'sticky',
          top: 0,
          zIndex: 20,
          borderBottom: `1px solid ${tokens.hairline}`,
          backgroundColor: 'rgba(19, 16, 13, 0.78)',
          backdropFilter: 'saturate(160%) blur(14px)',
          WebkitBackdropFilter: 'saturate(160%) blur(14px)',
        }}
      >
        <Box
          sx={{
            maxWidth: 1200,
            mx: 'auto',
            px: { xs: 3, sm: 5, md: 8 },
            py: 2,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 3,
          }}
        >
          {/* Monogram */}
          <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 1.25 }}>
            <Typography
              component="span"
              sx={{
                fontFamily: '"IBM Plex Mono", monospace',
                fontSize: '0.68rem',
                letterSpacing: '0.22em',
                textTransform: 'uppercase',
                color: tokens.inkMuted,
              }}
            >
              ZK · CREDIT
            </Typography>
            <Box
              component="span"
              sx={{
                display: 'inline-block',
                width: 14,
                height: 1,
                backgroundColor: tokens.hairlineStrong,
                mx: 0.5,
              }}
            />
            <Typography
              component="span"
              sx={{
                fontFamily: '"Fraunces", serif',
                fontStyle: 'italic',
                fontWeight: 400,
                fontSize: '1rem',
                color: tokens.ink,
                letterSpacing: '-0.01em',
                fontVariationSettings: '"opsz" 24, "SOFT" 80',
              }}
            >
              Scorer
            </Typography>
          </Box>

          {/* Connect status */}
          <Box
            onClick={!isConnected && !isConnecting ? handleConnect : undefined}
            role={!isConnected && !isConnecting ? 'button' : undefined}
            tabIndex={!isConnected && !isConnecting ? 0 : -1}
            onKeyDown={(e) => {
              if (!isConnected && !isConnecting && (e.key === 'Enter' || e.key === ' ')) {
                e.preventDefault();
                handleConnect();
              }
            }}
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1.25,
              cursor: !isConnected && !isConnecting ? 'pointer' : 'default',
              userSelect: 'none',
              outline: 'none',
              '&:hover .connect-dot': !isConnected && !isConnecting
                ? { backgroundColor: tokens.accent, boxShadow: `0 0 0 3px ${tokens.accent}22` }
                : {},
              '&:hover .connect-label': !isConnected && !isConnecting
                ? { color: tokens.ink }
                : {},
            }}
          >
            {isConnecting ? (
              <CircularProgress size={10} thickness={5} sx={{ color: tokens.amber }} />
            ) : (
              <Box
                className="connect-dot"
                sx={{
                  width: 7,
                  height: 7,
                  borderRadius: '50%',
                  backgroundColor: statusColor,
                  transition: 'background-color 200ms ease, box-shadow 200ms ease',
                }}
              />
            )}
            <Typography
              className="connect-label"
              sx={{
                fontFamily: '"IBM Plex Mono", monospace',
                fontSize: '0.7rem',
                letterSpacing: '0.16em',
                textTransform: 'uppercase',
                color: tokens.inkDim,
                transition: 'color 200ms ease',
              }}
            >
              {status}
              {truncatedAddress && (
                <Box
                  component="span"
                  sx={{
                    ml: 1.25,
                    color: tokens.inkMuted,
                    fontVariationSettings: '"opsz" 10',
                  }}
                >
                  {truncatedAddress}
                </Box>
              )}
            </Typography>
          </Box>
        </Box>
      </Box>

      <Snackbar
        open={!!error}
        autoHideDuration={6000}
        onClose={() => setError(null)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={() => setError(null)} severity="error" sx={{ width: '100%' }}>
          {error}
        </Alert>
      </Snackbar>
    </>
  );
};

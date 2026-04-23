import React, { useState } from 'react';
import { Box, Typography, Snackbar, Alert, CircularProgress } from '@mui/material';
import { useZKLoanContext } from '../../hooks';
import { tokens } from '../../config/theme';
import { CopyButton } from './CopyButton';

const mono = '"IBM Plex Mono", monospace';
const serif = '"Fraunces", serif';

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

  const truncatedAddress = walletAddress
    ? `${walletAddress.slice(0, 10)}…${walletAddress.slice(-6)}`
    : null;

  const connectClickable = !isConnected && !isConnecting;

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
            height: 64,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 3,
          }}
        >
          {/* Left: monogram + network */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 4, minWidth: 0 }}>
            <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 1.25, flexShrink: 0 }}>
              <Typography
                component="span"
                sx={{
                  fontFamily: mono,
                  fontSize: '0.68rem',
                  letterSpacing: '0.22em',
                  textTransform: 'uppercase',
                  color: tokens.inkMuted,
                }}
              >
                ZK · Credit
              </Typography>
              <Typography
                component="span"
                sx={{
                  display: { xs: 'none', sm: 'inline' },
                  fontFamily: serif,
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

            <Box
              title="This DApp only runs against Midnight Preprod"
              sx={{
                display: { xs: 'none', md: 'flex' },
                alignItems: 'center',
                gap: 1,
              }}
            >
              <Box
                sx={{
                  width: 6,
                  height: 6,
                  borderRadius: '50%',
                  backgroundColor: tokens.sage,
                }}
              />
              <Typography
                component="span"
                sx={{
                  fontFamily: mono,
                  fontSize: '0.68rem',
                  letterSpacing: '0.18em',
                  textTransform: 'uppercase',
                  color: tokens.inkMuted,
                }}
              >
                Net
              </Typography>
              <Typography
                component="span"
                sx={{
                  fontFamily: mono,
                  fontSize: '0.78rem',
                  color: tokens.ink,
                  letterSpacing: '0.04em',
                }}
              >
                Preprod
              </Typography>
            </Box>
          </Box>

          {/* Right: connect state */}
          {isConnected ? (
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1.5,
                minWidth: 0,
              }}
            >
              <Box
                sx={{
                  width: 7,
                  height: 7,
                  borderRadius: '50%',
                  backgroundColor: tokens.sage,
                  flexShrink: 0,
                }}
              />
              <Typography
                component="span"
                sx={{
                  fontFamily: mono,
                  fontSize: '0.68rem',
                  letterSpacing: '0.18em',
                  textTransform: 'uppercase',
                  color: tokens.sage,
                  flexShrink: 0,
                }}
              >
                Connected
              </Typography>
              {truncatedAddress && walletAddress && (
                <>
                  <Typography
                    component="span"
                    sx={{
                      fontFamily: mono,
                      fontSize: '0.78rem',
                      color: tokens.inkDim,
                      letterSpacing: '0.02em',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                    }}
                  >
                    {truncatedAddress}
                  </Typography>
                  <CopyButton
                    value={walletAddress}
                    label="Copy wallet address"
                    size={22}
                  />
                </>
              )}
            </Box>
          ) : (
            <Box
              component="button"
              type="button"
              disabled={isConnecting}
              onClick={connectClickable ? handleConnect : undefined}
              sx={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 1.25,
                height: 34,
                px: 1.75,
                border: `1px solid ${tokens.hairlineStrong}`,
                borderRadius: 3,
                backgroundColor: 'transparent',
                cursor: connectClickable ? 'pointer' : 'default',
                fontFamily: 'inherit',
                color: 'inherit',
                transition:
                  'border-color 180ms ease, background-color 180ms ease, color 180ms ease',
                outline: 'none',
                '&:hover': connectClickable
                  ? {
                      borderColor: tokens.accent,
                      backgroundColor: 'rgba(231, 125, 77, 0.06)',
                      '& .connect-label': { color: tokens.accent },
                      '& .connect-arrow': { color: tokens.accent, transform: 'translateX(2px)' },
                    }
                  : {},
                '&:focus-visible': connectClickable
                  ? {
                      borderColor: tokens.accent,
                      boxShadow: `0 0 0 3px rgba(231, 125, 77, 0.18)`,
                    }
                  : {},
              }}
            >
              {isConnecting ? (
                <>
                  <CircularProgress
                    size={10}
                    thickness={5}
                    sx={{ color: tokens.amber, flexShrink: 0 }}
                  />
                  <Typography
                    component="span"
                    sx={{
                      fontFamily: mono,
                      fontSize: '0.72rem',
                      letterSpacing: '0.14em',
                      textTransform: 'uppercase',
                      color: tokens.amber,
                      lineHeight: 1,
                    }}
                  >
                    Connecting…
                  </Typography>
                </>
              ) : (
                <>
                  <Typography
                    component="span"
                    className="connect-label"
                    sx={{
                      fontFamily: mono,
                      fontSize: '0.72rem',
                      letterSpacing: '0.14em',
                      textTransform: 'uppercase',
                      color: tokens.ink,
                      lineHeight: 1,
                      transition: 'color 180ms ease',
                    }}
                  >
                    Connect Lace wallet
                  </Typography>
                  <Typography
                    component="span"
                    className="connect-arrow"
                    sx={{
                      fontFamily: mono,
                      fontSize: '0.9rem',
                      color: tokens.inkMuted,
                      lineHeight: 1,
                      transition: 'transform 180ms ease, color 180ms ease',
                    }}
                  >
                    →
                  </Typography>
                </>
              )}
            </Box>
          )}
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

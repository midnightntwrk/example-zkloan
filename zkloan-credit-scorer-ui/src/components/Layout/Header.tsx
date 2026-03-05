import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Chip, Box, CircularProgress, Snackbar, Alert } from '@mui/material';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import { useZKLoanContext } from '../../hooks';

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

  const getChipLabel = () => {
    if (isConnecting) return 'Connecting...';
    if (isConnected) return 'Connected';
    return 'Click to Connect';
  };

  return (
    <>
      <AppBar position="static" sx={{ background: 'linear-gradient(90deg, #1a1a2e 0%, #16213e 100%)' }}>
        <Toolbar>
          <AccountBalanceIcon sx={{ mr: 2 }} />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            ZKLoan Credit Scorer
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Chip
              label={getChipLabel()}
              color={isConnected ? 'success' : isConnecting ? 'warning' : 'error'}
              size="small"
              onClick={!isConnected && !isConnecting ? handleConnect : undefined}
              sx={{
                cursor: !isConnected && !isConnecting ? 'pointer' : 'default',
                '&:hover': !isConnected && !isConnecting ? { opacity: 0.8 } : {}
              }}
              icon={isConnecting ? <CircularProgress size={14} color="inherit" /> : undefined}
            />
            {walletAddress && (
              <Typography variant="body2" sx={{ opacity: 0.7 }}>
                {walletAddress.slice(0, 8)}...{walletAddress.slice(-6)}
              </Typography>
            )}
          </Box>
        </Toolbar>
      </AppBar>
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

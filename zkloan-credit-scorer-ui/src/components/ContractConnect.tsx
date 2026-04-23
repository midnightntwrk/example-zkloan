import React, { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Box,
  Alert,
  CircularProgress,
  Stack,
} from '@mui/material';
import { useZKLoanContext } from '../hooks';
import { type ZKLoanDeployment } from '../contexts';
import { tokens } from '../config/theme';
import { SectionHeader } from './Layout/SectionHeader';

export const ContractConnect: React.FC = () => {
  const { deployment$, join, flowMessage } = useZKLoanContext();

  const [deployment, setDeployment] = useState<ZKLoanDeployment>({ status: 'idle' });
  const [contractAddress, setContractAddress] = useState('');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const subscription = deployment$.subscribe(setDeployment);
    return () => subscription.unsubscribe();
  }, [deployment$]);

  const handleJoin = () => {
    if (!contractAddress.trim()) {
      setError('Please enter a contract address');
      return;
    }
    setError(null);
    join(contractAddress.trim());
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && contractAddress.trim()) {
      handleJoin();
    }
  };

  const isDeployed = deployment.status === 'deployed';
  const isLoading = deployment.status === 'in-progress';
  const hasFailed = deployment.status === 'failed';

  const formatAddress = (addr: unknown): string => {
    if (typeof addr === 'string') {
      return `${addr.slice(0, 12)}…${addr.slice(-10)}`;
    }
    if (addr instanceof Uint8Array) {
      const hex = Array.from(addr).map((b) => b.toString(16).padStart(2, '0')).join('');
      return `${hex.slice(0, 12)}…${hex.slice(-10)}`;
    }
    return 'Unknown';
  };

  return (
    <Card>
      <CardContent sx={{ p: { xs: 3.5, md: 5 } }}>
        <SectionHeader
          index="01"
          kicker="Contract"
          title="Link to a deployed scorer"
          status={
            isDeployed
              ? { label: 'Linked', tone: 'success' }
              : hasFailed
              ? { label: 'Failed', tone: 'error' }
              : undefined
          }
        >
          Paste the address of a ZKLoan Credit Scorer contract already deployed to the
          network, then connect to work against it.
        </SectionHeader>

        {isLoading && (
          <Box
            sx={{
              mt: 4,
              pt: 4,
              borderTop: `1px solid ${tokens.hairline}`,
              display: 'flex',
              alignItems: 'center',
              gap: 2.5,
            }}
          >
            <CircularProgress size={16} thickness={3} />
            <Typography
              sx={{
                fontFamily: '"IBM Plex Mono", monospace',
                fontSize: '0.78rem',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: tokens.inkDim,
              }}
            >
              {flowMessage ?? 'Working…'}
            </Typography>
          </Box>
        )}

        {!isLoading && !isDeployed && (
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={1.5}
            alignItems="stretch"
            sx={{
              mt: 4,
              pt: 4,
              borderTop: `1px solid ${tokens.hairline}`,
            }}
          >
            <TextField
              fullWidth
              size="small"
              placeholder="0100…"
              value={contractAddress}
              onChange={(e) => setContractAddress(e.target.value)}
              onKeyPress={handleKeyPress}
              InputLabelProps={{ shrink: true }}
              label="Contract address"
            />
            <Button
              variant="contained"
              onClick={handleJoin}
              disabled={!contractAddress.trim()}
              sx={{ minWidth: 140, whiteSpace: 'nowrap', alignSelf: { xs: 'stretch', sm: 'auto' } }}
            >
              Connect →
            </Button>
          </Stack>
        )}

        {isDeployed && deployment.contractAddress && (
          <Box
            sx={{
              mt: 4,
              pt: 4,
              borderTop: `1px solid ${tokens.hairline}`,
              display: 'flex',
              flexDirection: { xs: 'column', sm: 'row' },
              gap: { xs: 1, sm: 3 },
              alignItems: { xs: 'flex-start', sm: 'baseline' },
            }}
          >
            <Typography
              sx={{
                fontFamily: '"IBM Plex Mono", monospace',
                fontSize: '0.7rem',
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: tokens.inkMuted,
                minWidth: 92,
              }}
            >
              Address
            </Typography>
            <Typography
              component="code"
              sx={{
                fontFamily: '"IBM Plex Mono", monospace',
                fontSize: '0.9rem',
                color: tokens.ink,
                letterSpacing: '-0.01em',
                wordBreak: 'break-all',
              }}
            >
              {formatAddress(deployment.contractAddress)}
            </Typography>
          </Box>
        )}

        {hasFailed && deployment.error && (
          <Alert severity="error" sx={{ mt: 3 }}>
            {deployment.error.message}
          </Alert>
        )}

        {error && (
          <Alert severity="error" sx={{ mt: 3 }}>
            {error}
          </Alert>
        )}
      </CardContent>
    </Card>
  );
};

import React, { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  Typography,
  TextField,
  Button,
  Box,
  Alert,
  CircularProgress,
  Chip,
} from '@mui/material';
import LinkIcon from '@mui/icons-material/Link';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useZKLoanContext } from '../hooks';
import { type ZKLoanDeployment } from '../contexts';

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
      return `${addr.slice(0, 12)}...${addr.slice(-10)}`;
    }
    if (addr instanceof Uint8Array) {
      const hex = Array.from(addr).map(b => b.toString(16).padStart(2, '0')).join('');
      return `${hex.slice(0, 12)}...${hex.slice(-10)}`;
    }
    return 'Unknown';
  };

  return (
    <Card sx={{ background: '#1a1a2e', color: '#fff' }}>
      <CardHeader
        avatar={<LinkIcon color="primary" />}
        title="Contract Connection"
        subheader={
          isDeployed
            ? 'Connected to ZKLoan Credit Scorer contract'
            : 'Enter a contract address to get started'
        }
        subheaderTypographyProps={{ color: 'grey.500' }}
        action={
          isDeployed && (
            <Chip
              icon={<CheckCircleIcon />}
              label="Connected"
              color="success"
              size="small"
              sx={{ mt: 1 }}
            />
          )
        }
      />

      <CardContent>
        {isLoading && (
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', py: 2 }}>
            <CircularProgress color="primary" size={32} />
            {flowMessage && (
              <Typography variant="body2" sx={{ mt: 2, color: 'grey.400' }}>
                {flowMessage}
              </Typography>
            )}
          </Box>
        )}

        {!isLoading && !isDeployed && (
          <Box sx={{ display: 'flex', gap: 1 }}>
            <TextField
              fullWidth
              size="small"
              placeholder="Contract Address (e.g., 0100...)"
              value={contractAddress}
              onChange={(e) => setContractAddress(e.target.value)}
              onKeyPress={handleKeyPress}
              sx={{
                '& .MuiOutlinedInput-root': {
                  color: '#fff',
                  '& fieldset': { borderColor: 'grey.700' },
                  '&:hover fieldset': { borderColor: 'grey.500' },
                  '&.Mui-focused fieldset': { borderColor: 'primary.main' },
                },
              }}
            />
            <Button
              variant="contained"
              startIcon={<LinkIcon />}
              onClick={handleJoin}
              disabled={!contractAddress.trim()}
              sx={{ minWidth: 120 }}
            >
              Connect
            </Button>
          </Box>
        )}

        {isDeployed && deployment.contractAddress && (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Typography variant="body2" color="grey.400">
              Address:
            </Typography>
            <Typography
              variant="body2"
              sx={{
                fontFamily: 'monospace',
                background: '#16213e',
                px: 1.5,
                py: 0.5,
                borderRadius: 1,
              }}
            >
              {formatAddress(deployment.contractAddress)}
            </Typography>
          </Box>
        )}

        {hasFailed && (
          <Alert severity="error" sx={{ mt: 2 }}>
            {deployment.error.message}
          </Alert>
        )}

        {error && (
          <Alert severity="error" sx={{ mt: 2 }}>
            {error}
          </Alert>
        )}
      </CardContent>
    </Card>
  );
};

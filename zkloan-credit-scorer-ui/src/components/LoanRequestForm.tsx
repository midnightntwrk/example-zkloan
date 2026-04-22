import React, { useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Box,
  Alert,
  CircularProgress,
  Backdrop,
  Stack,
  InputAdornment,
} from '@mui/material';
import { useZKLoanContext } from '../hooks';
import { SectionHeader } from './Layout/SectionHeader';
import { tokens } from '../config/theme';

export const LoanRequestForm: React.FC = () => {
  const { requestLoan, flowMessage, secretPin } = useZKLoanContext();

  const [amount, setAmount] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [result, setResult] = useState<{ success: boolean; message: string } | null>(null);

  const isPinValid = secretPin.length >= 4 && secretPin.length <= 6;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!amount) {
      setResult({ success: false, message: 'Please enter a loan amount' });
      return;
    }

    if (!isPinValid) {
      setResult({
        success: false,
        message: 'Please set a valid PIN (4–6 digits) in the Private Dossier section above.',
      });
      return;
    }

    const amountNum = parseInt(amount, 10);

    if (isNaN(amountNum) || amountNum <= 0) {
      setResult({ success: false, message: 'Amount must be a positive number' });
      return;
    }

    setIsSubmitting(true);
    setResult(null);

    try {
      await requestLoan(BigInt(amountNum));
      setResult({ success: true, message: 'Loan request submitted successfully.' });
      setAmount('');
    } catch (error) {
      setResult({
        success: false,
        message: error instanceof Error ? error.message : 'Failed to submit loan request',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card sx={{ position: 'relative' }}>
      <Backdrop
        sx={{
          position: 'absolute',
          zIndex: 10,
          borderRadius: 'inherit',
          flexDirection: 'column',
          gap: 2.5,
          color: tokens.ink,
        }}
        open={isSubmitting}
      >
        <CircularProgress size={28} thickness={3} />
        {flowMessage && (
          <Typography
            sx={{
              fontFamily: '"IBM Plex Mono", monospace',
              fontSize: '0.75rem',
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: tokens.ink,
              textAlign: 'center',
              px: 3,
              maxWidth: 380,
            }}
          >
            {flowMessage}
          </Typography>
        )}
      </Backdrop>

      <CardContent sx={{ p: { xs: 3.5, md: 5 } }}>
        <SectionHeader
          index="03"
          kicker="Request"
          title={
            <>
              Name a figure —{' '}
              <Box
                component="em"
                sx={{
                  fontStyle: 'italic',
                  color: tokens.accent,
                  fontVariationSettings: '"opsz" 32, "SOFT" 100',
                }}
              >
                the circuit decides
              </Box>
              .
            </>
          }
        >
          Enter the amount you'd like to borrow. The ZK circuit will verify your
          attestation and issue a tier-bound approval — or a proposal for less — without
          revealing the inputs.
        </SectionHeader>

        {result && (
          <Alert severity={result.success ? 'success' : 'error'} sx={{ mt: 4 }}>
            {result.message}
          </Alert>
        )}

        <Stack
          component="form"
          onSubmit={handleSubmit}
          direction={{ xs: 'column', sm: 'row' }}
          spacing={1.5}
          sx={{
            mt: 4,
            pt: 4,
            borderTop: `1px solid ${tokens.hairline}`,
            alignItems: 'stretch',
          }}
        >
          <TextField
            fullWidth
            size="small"
            label="Loan amount"
            placeholder="1 – 10,000"
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            InputLabelProps={{ shrink: true }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Typography
                    sx={{
                      fontFamily: '"Fraunces", serif',
                      fontStyle: 'italic',
                      fontSize: '1.05rem',
                      color: tokens.inkDim,
                      fontVariationSettings: '"opsz" 32',
                    }}
                  >
                    $
                  </Typography>
                </InputAdornment>
              ),
            }}
            inputProps={{ min: 1, max: 10000 }}
            sx={{
              '& input': {
                fontFamily: '"IBM Plex Mono", monospace',
                fontSize: '1.05rem',
                fontFeatureSettings: '"tnum"',
              },
            }}
          />
          <Button
            type="submit"
            variant="contained"
            onClick={handleSubmit}
            disabled={isSubmitting || !amount || !isPinValid}
            sx={{ minWidth: 180, whiteSpace: 'nowrap' }}
          >
            Request loan →
          </Button>
        </Stack>
      </CardContent>
    </Card>
  );
};

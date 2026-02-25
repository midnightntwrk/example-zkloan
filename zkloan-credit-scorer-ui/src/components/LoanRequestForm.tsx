import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardActions,
  Typography,
  TextField,
  Button,
  Box,
  Alert,
  CircularProgress,
  Backdrop,
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { useZKLoanContext } from '../hooks';

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
      setResult({ success: false, message: 'Please enter a valid PIN (4-6 digits) in the Private State section above' });
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
      setResult({ success: true, message: 'Loan request submitted successfully!' });
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
    <Card sx={{ background: '#1a1a2e', color: '#fff', position: 'relative' }}>
      <Backdrop
        sx={{ position: 'absolute', color: '#fff', zIndex: 10, borderRadius: 2, flexDirection: 'column', gap: 2 }}
        open={isSubmitting}
      >
        <CircularProgress color="primary" />
        {flowMessage && (
          <Typography variant="body2" sx={{ mt: 2, textAlign: 'center', px: 2 }}>
            {flowMessage}
          </Typography>
        )}
      </Backdrop>

      <CardHeader
        avatar={<SendIcon color="primary" />}
        title="Loan Request"
        subheader="Enter the amount you wish to borrow"
        subheaderTypographyProps={{ color: 'grey.500' }}
      />

      <CardContent>
        {result && (
          <Alert severity={result.success ? 'success' : 'error'} sx={{ mb: 2 }}>
            {result.message}
          </Alert>
        )}

        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Loan Amount ($)"
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            sx={{
              '& .MuiOutlinedInput-root': {
                color: '#fff',
                '& fieldset': { borderColor: 'grey.700' },
                '&:hover fieldset': { borderColor: 'grey.500' },
              },
              '& .MuiInputLabel-root': { color: 'grey.400' },
            }}
            inputProps={{ min: 1, max: 10000 }}
          />
        </Box>
      </CardContent>

      <CardActions sx={{ px: 2, pb: 2 }}>
        <Button
          variant="contained"
          fullWidth
          startIcon={<SendIcon />}
          onClick={handleSubmit}
          disabled={isSubmitting || !amount || !isPinValid}
        >
          Request Loan
        </Button>
      </CardActions>
    </Card>
  );
};

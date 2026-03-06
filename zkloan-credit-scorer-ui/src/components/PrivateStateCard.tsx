import React, { useEffect } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  Chip,
  Divider,
  TextField,
  Button,
} from '@mui/material';
import LockIcon from '@mui/icons-material/Lock';
import { useZKLoanContext } from '../hooks';
import { userProfiles } from '../utils/loanProfiles';

interface TierInfo {
  tier: string;
  maxLoan: number;
  color: 'success' | 'warning' | 'info' | 'error';
}

const evaluateTier = (creditScore: number, monthlyIncome: number, monthsAsCustomer: number): TierInfo => {
  if (creditScore >= 700 && monthlyIncome >= 2000 && monthsAsCustomer >= 24) {
    return { tier: 'Tier 1', maxLoan: 10000, color: 'success' };
  }
  if (creditScore >= 600 && monthlyIncome >= 1500) {
    return { tier: 'Tier 2', maxLoan: 7000, color: 'warning' };
  }
  if (creditScore >= 580) {
    return { tier: 'Tier 3', maxLoan: 3000, color: 'info' };
  }
  return { tier: 'Rejected', maxLoan: 0, color: 'error' };
};

export const PrivateStateCard: React.FC = () => {
  const { privateState, setPrivateState, setCurrentProfileId, secretPin, setSecretPin, refreshLoans } = useZKLoanContext();
  const [selectedProfile, setSelectedProfile] = React.useState(0);

  const currentProfile = userProfiles[selectedProfile];
  const tierInfo = evaluateTier(
    Number(privateState.creditScore),
    Number(privateState.monthlyIncome),
    Number(privateState.monthsAsCustomer),
  );

  // Initialize the currentProfileId in context on mount
  useEffect(() => {
    setCurrentProfileId(userProfiles[0].applicantId);
  }, [setCurrentProfileId]);

  const handleProfileChange = (index: number) => {
    setSelectedProfile(index);
    const profile = userProfiles[index];
    setPrivateState({
      creditScore: BigInt(profile.creditScore),
      monthlyIncome: BigInt(profile.monthlyIncome),
      monthsAsCustomer: BigInt(profile.monthsAsCustomer),
      attestationSignature: { announcement: { x: 0n, y: 0n }, response: 0n },
      attestationProviderId: 0n,
    });
    // Update the current profile ID in context for loan tracking
    setCurrentProfileId(profile.applicantId);
  };

  const handlePinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Only allow digits
    const value = e.target.value.replace(/\D/g, '').slice(0, 6);
    setSecretPin(value);
  };

  const handleLoadLoans = () => {
    refreshLoans();
  };

  const isPinValid = secretPin.length >= 4 && secretPin.length <= 6;

  return (
    <Card sx={{ background: '#1a1a2e', color: '#fff' }}>
      <CardHeader
        avatar={<LockIcon color="primary" />}
        title="Private State"
        subheader="This data never leaves your device"
        subheaderTypographyProps={{ color: 'grey.500' }}
      />
      <CardContent>
        <FormControl fullWidth sx={{ mb: 3 }}>
          <InputLabel id="profile-select-label" sx={{ color: 'grey.400' }}>
            Select Profile
          </InputLabel>
          <Select
            labelId="profile-select-label"
            value={selectedProfile}
            label="Select Profile"
            onChange={(e) => handleProfileChange(e.target.value as number)}
            sx={{
              color: '#fff',
              '.MuiOutlinedInput-notchedOutline': { borderColor: 'grey.700' },
              '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: 'grey.500' },
              '.MuiSvgIcon-root': { color: '#fff' },
            }}
          >
            {userProfiles.map((profile, index) => (
              <MenuItem key={profile.applicantId} value={index}>
                {profile.applicantId} - Score: {profile.creditScore}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Box sx={{ display: 'flex', gap: 1, mb: 3 }}>
          <TextField
            fullWidth
            size="small"
            label="Secret PIN (4-6 digits)"
            type="password"
            value={secretPin}
            onChange={handlePinChange}
            sx={{
              '& .MuiOutlinedInput-root': {
                color: '#fff',
                '& fieldset': { borderColor: 'grey.700' },
                '&:hover fieldset': { borderColor: 'grey.500' },
              },
              '& .MuiInputLabel-root': { color: 'grey.400' },
            }}
            inputProps={{ maxLength: 6 }}
          />
          <Button
            variant="contained"
            onClick={handleLoadLoans}
            disabled={!isPinValid}
            sx={{ minWidth: 120 }}
          >
            Set PIN
          </Button>
        </Box>

        <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 2, mb: 3 }}>
          <Box sx={{ textAlign: 'center', p: 2, background: '#16213e', borderRadius: 2 }}>
            <Typography variant="h4" color="primary">
              {currentProfile.creditScore}
            </Typography>
            <Typography variant="body2" color="grey.400">
              Credit Score
            </Typography>
          </Box>
          <Box sx={{ textAlign: 'center', p: 2, background: '#16213e', borderRadius: 2 }}>
            <Typography variant="h4" color="primary">
              ${currentProfile.monthlyIncome.toLocaleString()}
            </Typography>
            <Typography variant="body2" color="grey.400">
              Monthly Income
            </Typography>
          </Box>
          <Box sx={{ textAlign: 'center', p: 2, background: '#16213e', borderRadius: 2 }}>
            <Typography variant="h4" color="primary">
              {currentProfile.monthsAsCustomer}
            </Typography>
            <Typography variant="body2" color="grey.400">
              Months as Customer
            </Typography>
          </Box>
        </Box>

        <Divider sx={{ borderColor: 'grey.800', my: 2 }} />

        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="body1">Expected Qualification:</Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Chip label={tierInfo.tier} color={tierInfo.color} />
            {tierInfo.maxLoan > 0 && (
              <Typography variant="body2" color="grey.400">
                Max: ${tierInfo.maxLoan.toLocaleString()}
              </Typography>
            )}
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

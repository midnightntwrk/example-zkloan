import React, { useEffect, useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  TextField,
  Button,
  Stack,
  Alert,
  CircularProgress,
} from '@mui/material';
import { useZKLoanContext } from '../hooks';
import { userProfiles } from '../utils/loanProfiles';
import { SectionHeader } from './Layout/SectionHeader';
import { tokens } from '../config/theme';

interface TierInfo {
  tier: string;
  maxLoan: number;
  tone: 'success' | 'warning' | 'info' | 'error';
}

const evaluateTier = (creditScore: number, monthlyIncome: number, monthsAsCustomer: number): TierInfo => {
  if (creditScore >= 700 && monthlyIncome >= 2000 && monthsAsCustomer >= 24) {
    return { tier: 'Tier 1', maxLoan: 10000, tone: 'success' };
  }
  if (creditScore >= 600 && monthlyIncome >= 1500) {
    return { tier: 'Tier 2', maxLoan: 7000, tone: 'warning' };
  }
  if (creditScore >= 580) {
    return { tier: 'Tier 3', maxLoan: 3000, tone: 'info' };
  }
  return { tier: 'Rejected', maxLoan: 0, tone: 'error' };
};

const toneColor = {
  success: tokens.sage,
  warning: tokens.amber,
  info: tokens.cobalt,
  error: tokens.crimson,
} as const;

const Stat: React.FC<{
  label: string;
  value: React.ReactNode;
  sublabel?: string;
  withDivider?: boolean;
}> = ({ label, value, sublabel, withDivider }) => (
  <Box
    sx={{
      px: { xs: 0, sm: 3 },
      py: { xs: 2, sm: 0.5 },
      borderLeft: withDivider
        ? { xs: 'none', sm: `1px solid ${tokens.hairline}` }
        : 'none',
      borderTop: withDivider
        ? { xs: `1px solid ${tokens.hairline}`, sm: 'none' }
        : 'none',
      '&:first-of-type': { pl: 0 },
    }}
  >
    <Typography
      sx={{
        fontFamily: '"IBM Plex Mono", monospace',
        fontSize: '0.66rem',
        letterSpacing: '0.18em',
        textTransform: 'uppercase',
        color: tokens.inkMuted,
        mb: 1.5,
      }}
    >
      {label}
    </Typography>
    <Typography
      sx={{
        fontFamily: '"Fraunces", serif',
        fontWeight: 350,
        fontSize: 'clamp(2.25rem, 4.2vw, 3.25rem)',
        lineHeight: 1,
        letterSpacing: '-0.025em',
        color: tokens.ink,
        fontVariationSettings: '"opsz" 72, "SOFT" 30',
        fontFeatureSettings: '"tnum"',
      }}
    >
      {value}
    </Typography>
    {sublabel && (
      <Typography
        sx={{
          fontFamily: '"IBM Plex Sans", sans-serif',
          fontSize: '0.78rem',
          color: tokens.inkMuted,
          mt: 1,
        }}
      >
        {sublabel}
      </Typography>
    )}
  </Box>
);

export const PrivateStateCard: React.FC = () => {
  const {
    privateState,
    setPrivateState,
    setCurrentProfileId,
    secretPin,
    setSecretPin,
    refreshLoans,
    changePin,
  } = useZKLoanContext();
  const [selectedProfile, setSelectedProfile] = React.useState(0);
  const [savedPin, setSavedPin] = useState<string | null>(null);
  const [showChangePin, setShowChangePin] = useState(false);
  const [newPin, setNewPin] = useState('');
  const [isChangingPin, setIsChangingPin] = useState(false);
  const [pinMessage, setPinMessage] = useState<{ tone: 'success' | 'error' | 'info'; text: string } | null>(null);

  const currentProfile = userProfiles[selectedProfile];
  const tierInfo = evaluateTier(
    Number(privateState.creditScore),
    Number(privateState.monthlyIncome),
    Number(privateState.monthsAsCustomer),
  );

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
    setCurrentProfileId(profile.applicantId);
  };

  const handlePinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 6);
    setSecretPin(value);
    // Clear stale confirmation if the user is editing
    if (savedPin !== null && value !== savedPin) {
      setPinMessage(null);
    }
  };

  const handleNewPinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewPin(e.target.value.replace(/\D/g, '').slice(0, 6));
  };

  const handleSavePin = () => {
    setSavedPin(secretPin);
    setPinMessage({
      tone: 'success',
      text: 'PIN saved locally. It will be used to derive your identity when you request or respond to a loan.',
    });
    refreshLoans();
  };

  const handleChangePin = async () => {
    if (!savedPin) return;
    if (newPin === savedPin) {
      setPinMessage({ tone: 'error', text: 'New PIN must differ from the current PIN.' });
      return;
    }
    if (newPin.length < 4 || newPin.length > 6) {
      setPinMessage({ tone: 'error', text: 'New PIN must be 4–6 digits.' });
      return;
    }
    setIsChangingPin(true);
    setPinMessage({ tone: 'info', text: 'Submitting on-chain PIN migration…' });
    try {
      await changePin(BigInt(savedPin), BigInt(newPin));
      setSavedPin(newPin);
      setNewPin('');
      setShowChangePin(false);
      setPinMessage({
        tone: 'success',
        text:
          'PIN change submitted. On-chain migration moves up to 5 loans per call — if you had more, click Change PIN again to continue.',
      });
    } catch (err) {
      setPinMessage({
        tone: 'error',
        text: `PIN change failed: ${err instanceof Error ? err.message : String(err)}`,
      });
    } finally {
      setIsChangingPin(false);
    }
  };

  const isPinValid = secretPin.length >= 4 && secretPin.length <= 6;
  const isSaved = savedPin !== null && savedPin === secretPin;

  return (
    <Card>
      <CardContent sx={{ p: { xs: 3.5, md: 5 } }}>
        <SectionHeader
          index="02"
          kicker="Private inputs"
          title="Your private dossier"
        >
          Pick a demo applicant profile, choose a secret PIN, and review the private
          inputs that will be fed into the zero-knowledge circuit. None of this ever
          leaves your device.
        </SectionHeader>

        <Stack
          direction={{ xs: 'column', md: 'row' }}
          spacing={1.5}
          alignItems={{ xs: 'stretch', md: 'center' }}
          sx={{
            mt: 4,
            pt: 4,
            borderTop: `1px solid ${tokens.hairline}`,
          }}
        >
          <FormControl fullWidth>
            <InputLabel id="profile-select-label" shrink>
              Applicant
            </InputLabel>
            <Select
              labelId="profile-select-label"
              value={selectedProfile}
              label="Applicant"
              onChange={(e) => handleProfileChange(e.target.value as number)}
              notched
              size="small"
            >
              {userProfiles.map((profile, index) => (
                <MenuItem key={profile.applicantId} value={index}>
                  {profile.applicantId}
                  <Box
                    component="span"
                    sx={{ mx: 1, color: tokens.hairlineStrong }}
                  >
                    ·
                  </Box>
                  <Box component="span" sx={{ color: tokens.inkMuted }}>
                    score {profile.creditScore}
                  </Box>
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <TextField
            fullWidth
            size="small"
            label="Secret PIN"
            placeholder="4–6 digits"
            type="text"
            inputMode="numeric"
            value={secretPin}
            onChange={handlePinChange}
            InputLabelProps={{ shrink: true }}
            inputProps={{ maxLength: 6, autoComplete: 'off' }}
          />

          <Button
            variant={isSaved ? 'text' : 'outlined'}
            onClick={handleSavePin}
            disabled={!isPinValid || isSaved}
            sx={{ minWidth: 120, whiteSpace: 'nowrap' }}
          >
            {isSaved ? '✓ Saved' : 'Save PIN'}
          </Button>
        </Stack>

        {pinMessage && (
          <Alert
            severity={pinMessage.tone === 'info' ? 'info' : pinMessage.tone}
            sx={{ mt: 2 }}
            onClose={() => setPinMessage(null)}
          >
            {pinMessage.text}
          </Alert>
        )}

        {isSaved && (
          <Box sx={{ mt: 2 }}>
            {!showChangePin ? (
              <Button
                variant="text"
                size="small"
                onClick={() => setShowChangePin(true)}
                sx={{
                  px: 0,
                  color: tokens.inkDim,
                  fontFamily: '"IBM Plex Mono", monospace',
                  fontSize: '0.72rem',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                }}
              >
                Change PIN on-chain →
              </Button>
            ) : (
              <Stack
                direction={{ xs: 'column', md: 'row' }}
                spacing={1.5}
                alignItems={{ xs: 'stretch', md: 'center' }}
                sx={{
                  pt: 3,
                  borderTop: `1px solid ${tokens.hairline}`,
                }}
              >
                <TextField
                  fullWidth
                  size="small"
                  label="New PIN"
                  placeholder="4–6 digits"
                  type="text"
                  inputMode="numeric"
                  value={newPin}
                  onChange={handleNewPinChange}
                  InputLabelProps={{ shrink: true }}
                  inputProps={{ maxLength: 6, autoComplete: 'off' }}
                  disabled={isChangingPin}
                />
                <Button
                  variant="contained"
                  onClick={handleChangePin}
                  disabled={isChangingPin || newPin.length < 4 || newPin === savedPin}
                  sx={{ minWidth: 160, whiteSpace: 'nowrap' }}
                >
                  {isChangingPin ? (
                    <>
                      <CircularProgress size={14} thickness={4} sx={{ color: 'inherit', mr: 1 }} />
                      Migrating…
                    </>
                  ) : (
                    'Change PIN →'
                  )}
                </Button>
                <Button
                  variant="text"
                  size="small"
                  onClick={() => {
                    setShowChangePin(false);
                    setNewPin('');
                  }}
                  disabled={isChangingPin}
                  sx={{ color: tokens.inkMuted }}
                >
                  Cancel
                </Button>
              </Stack>
            )}
          </Box>
        )}

        {/* Stats grid — editorial */}
        <Box
          sx={{
            mt: 5,
            pt: 5,
            borderTop: `1px solid ${tokens.hairline}`,
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', sm: 'repeat(3, 1fr)' },
          }}
        >
          <Stat
            label="Credit score"
            value={currentProfile.creditScore}
            sublabel="Tier threshold ≥ 700"
          />
          <Stat
            label="Monthly income"
            value={`$${currentProfile.monthlyIncome.toLocaleString()}`}
            sublabel="In US dollars"
            withDivider
          />
          <Stat
            label="Tenure"
            value={
              <>
                {currentProfile.monthsAsCustomer}
                <Box
                  component="span"
                  sx={{
                    fontSize: '1rem',
                    color: tokens.inkMuted,
                    fontFamily: '"IBM Plex Mono", monospace',
                    letterSpacing: '0.08em',
                    ml: 1,
                    verticalAlign: 'middle',
                  }}
                >
                  mo
                </Box>
              </>
            }
            sublabel="Months as customer"
            withDivider
          />
        </Box>

        {/* Qualification — editorial caption */}
        <Box
          sx={{
            mt: 5,
            pt: 3,
            borderTop: `1px solid ${tokens.hairline}`,
            display: 'flex',
            alignItems: 'baseline',
            justifyContent: 'space-between',
            gap: 3,
            flexWrap: 'wrap',
          }}
        >
          <Typography
            sx={{
              fontFamily: '"IBM Plex Mono", monospace',
              fontSize: '0.7rem',
              letterSpacing: '0.16em',
              textTransform: 'uppercase',
              color: tokens.inkMuted,
            }}
          >
            Expected qualification
          </Typography>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'baseline',
              gap: 2,
            }}
          >
            <Typography
              sx={{
                fontFamily: '"Fraunces", serif',
                fontStyle: 'italic',
                fontSize: '1.25rem',
                color: toneColor[tierInfo.tone],
                fontVariationSettings: '"opsz" 24, "SOFT" 80',
                letterSpacing: '-0.01em',
              }}
            >
              {tierInfo.tier}
            </Typography>
            {tierInfo.maxLoan > 0 && (
              <Typography
                sx={{
                  fontFamily: '"IBM Plex Mono", monospace',
                  fontSize: '0.8rem',
                  color: tokens.inkDim,
                  letterSpacing: '0.04em',
                }}
              >
                up to ${tierInfo.maxLoan.toLocaleString()}
              </Typography>
            )}
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

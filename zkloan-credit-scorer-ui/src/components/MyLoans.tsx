import React, { useState, useEffect, useMemo } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardActions,
  Typography,
  Button,
  Box,
  Alert,
  CircularProgress,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Tooltip,
} from '@mui/material';
import HistoryIcon from '@mui/icons-material/History';
import RefreshIcon from '@mui/icons-material/Refresh';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import { useZKLoanContext } from '../hooks';
import { type ZKLoanDeployment, type DeployedZKLoan, type UserLoan, type LoanStatus } from '../contexts';
import { getLoanProfile, getProfileByApplicantId } from '../utils/loanProfiles';

// Status chip configuration
const getStatusConfig = (status: LoanStatus): { color: 'success' | 'error' | 'warning' | 'default'; label: string } => {
  switch (status) {
    case 'Approved':
      return { color: 'success', label: 'Approved' };
    case 'Rejected':
      return { color: 'error', label: 'Rejected' };
    case 'Proposed':
      return { color: 'warning', label: 'Pending Review' };
    case 'NotAccepted':
      return { color: 'default', label: 'Declined' };
    default:
      return { color: 'default', label: status };
  }
};

export const MyLoans: React.FC = () => {
  const { deployment$, getMyLoans, respondToLoan, flowMessage, lastLoanUpdate } = useZKLoanContext();

  const [deployment, setDeployment] = useState<ZKLoanDeployment>({ status: 'idle' });
  const [loans, setLoans] = useState<UserLoan[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [respondingLoanId, setRespondingLoanId] = useState<bigint | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [hasLoaded, setHasLoaded] = useState(false);

  useEffect(() => {
    const subscription = deployment$.subscribe(setDeployment);
    return () => subscription.unsubscribe();
  }, [deployment$]);

  const isDeployed = deployment.status === 'deployed';
  const contractAddress = isDeployed ? (deployment as DeployedZKLoan).contractAddress : null;

  // Helper function to get profile display info for a loan
  const getProfileDisplay = useMemo(() => {
    return (loanId: bigint): { id: string; score?: number } | null => {
      if (!contractAddress) return null;
      const profileId = getLoanProfile(contractAddress, loanId.toString());
      if (!profileId) return null;
      const profile = getProfileByApplicantId(profileId);
      return profile ? { id: profileId, score: profile.creditScore } : { id: profileId };
    };
  }, [contractAddress]);

  const handleFetchLoans = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const userLoans = await getMyLoans();
      // Sort by loanId ascending
      userLoans.sort((a, b) => Number(a.loanId - b.loanId));
      setLoans(userLoans);
      setHasLoaded(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch loans');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRespondToLoan = async (loanId: bigint, accept: boolean) => {
    setRespondingLoanId(loanId);
    setError(null);
    try {
      await respondToLoan(loanId, accept);
      // Refresh loans after responding
      await handleFetchLoans();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to process response');
    } finally {
      setRespondingLoanId(null);
    }
  };

  // Auto-fetch when contract becomes deployed
  useEffect(() => {
    if (isDeployed && !hasLoaded) {
      handleFetchLoans();
    }
  }, [isDeployed, hasLoaded]);

  // Auto-refresh when a loan operation completes (requestLoan or respondToLoan)
  useEffect(() => {
    if (isDeployed && lastLoanUpdate > 0) {
      handleFetchLoans();
    }
  }, [lastLoanUpdate, isDeployed]);

  if (!isDeployed) {
    return (
      <Card sx={{ background: '#1a1a2e', color: '#fff' }}>
        <CardHeader
          avatar={<HistoryIcon color="primary" />}
          title="My Loans"
          subheader="Deploy or join a contract to view loans"
          subheaderTypographyProps={{ color: 'grey.500' }}
        />
        <CardContent>
          <Typography variant="body2" color="grey.400">
            Connect to a contract to view your loan history.
          </Typography>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card sx={{ background: '#1a1a2e', color: '#fff', position: 'relative' }}>
      <CardHeader
        avatar={<HistoryIcon color="primary" />}
        title="My Loans"
        subheader="Your loan applications and results"
        subheaderTypographyProps={{ color: 'grey.500' }}
      />

      <CardContent>
        {isLoading && (
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', py: 3 }}>
            <CircularProgress color="primary" size={40} />
            {flowMessage && (
              <Typography variant="body2" sx={{ mt: 2, color: 'grey.400' }}>
                {flowMessage}
              </Typography>
            )}
          </Box>
        )}

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        {!isLoading && !error && loans.length === 0 && hasLoaded && (
          <Box sx={{ textAlign: 'center', py: 3 }}>
            <Typography variant="body1" color="grey.400">
              No loans found for your account.
            </Typography>
            <Typography variant="body2" color="grey.500" sx={{ mt: 1 }}>
              Submit a loan request to see it here.
            </Typography>
          </Box>
        )}

        {!isLoading && loans.length > 0 && (
          <TableContainer>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell sx={{ color: 'grey.400', borderColor: 'grey.800' }}>Loan ID</TableCell>
                  <TableCell sx={{ color: 'grey.400', borderColor: 'grey.800' }}>Profile</TableCell>
                  <TableCell sx={{ color: 'grey.400', borderColor: 'grey.800' }}>Amount</TableCell>
                  <TableCell sx={{ color: 'grey.400', borderColor: 'grey.800' }}>Status</TableCell>
                  <TableCell sx={{ color: 'grey.400', borderColor: 'grey.800' }}>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {loans.map((loan) => {
                  const statusConfig = getStatusConfig(loan.status);
                  const isResponding = respondingLoanId === loan.loanId;
                  const isProposed = loan.status === 'Proposed';
                  const profileDisplay = getProfileDisplay(loan.loanId);

                  return (
                    <TableRow key={loan.loanId.toString()}>
                      <TableCell sx={{ color: '#fff', borderColor: 'grey.800' }}>
                        #{loan.loanId.toString()}
                      </TableCell>
                      <TableCell sx={{ color: '#fff', borderColor: 'grey.800' }}>
                        {profileDisplay ? (
                          <Tooltip title={profileDisplay.score ? `Credit Score: ${profileDisplay.score}` : ''} arrow>
                            <Typography variant="body2" sx={{ color: 'primary.main', cursor: profileDisplay.score ? 'help' : 'default' }}>
                              {profileDisplay.id}
                            </Typography>
                          </Tooltip>
                        ) : (
                          <Typography variant="body2" color="grey.500">—</Typography>
                        )}
                      </TableCell>
                      <TableCell sx={{ color: '#fff', borderColor: 'grey.800' }}>
                        {isProposed ? (
                          <Tooltip title="Based on your eligibility, we can offer this amount" arrow>
                            <Box component="span" sx={{ cursor: 'help' }}>
                              ${loan.authorizedAmount.toString()}
                              <Typography variant="caption" sx={{ display: 'block', color: 'warning.main' }}>
                                Qualified amount
                              </Typography>
                            </Box>
                          </Tooltip>
                        ) : (
                          `$${loan.authorizedAmount.toString()}`
                        )}
                      </TableCell>
                      <TableCell sx={{ borderColor: 'grey.800' }}>
                        <Chip
                          label={statusConfig.label}
                          color={statusConfig.color}
                          size="small"
                        />
                      </TableCell>
                      <TableCell sx={{ borderColor: 'grey.800' }}>
                        {isProposed && (
                          <Box sx={{ display: 'flex', gap: 0.5, alignItems: 'center' }}>
                            {isResponding ? (
                              <CircularProgress size={20} />
                            ) : (
                              <>
                                <Tooltip title="Accept this loan amount" arrow>
                                  <IconButton
                                    size="small"
                                    color="success"
                                    onClick={() => handleRespondToLoan(loan.loanId, true)}
                                    disabled={respondingLoanId !== null}
                                  >
                                    <CheckCircleIcon fontSize="small" />
                                  </IconButton>
                                </Tooltip>
                                <Tooltip title="Decline this offer" arrow>
                                  <IconButton
                                    size="small"
                                    color="error"
                                    onClick={() => handleRespondToLoan(loan.loanId, false)}
                                    disabled={respondingLoanId !== null}
                                  >
                                    <CancelIcon fontSize="small" />
                                  </IconButton>
                                </Tooltip>
                              </>
                            )}
                          </Box>
                        )}
                        {!isProposed && (
                          <Typography variant="body2" color="grey.500">
                            —
                          </Typography>
                        )}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        )}

        {/* Info box for Proposed loans */}
        {!isLoading && loans.some(loan => loan.status === 'Proposed') && (
          <Alert severity="info" sx={{ mt: 2 }}>
            <Typography variant="body2">
              <strong>Action Required:</strong> You have loan applications pending your review.
              The amounts shown reflect your maximum eligible loan based on our assessment.
              Please accept to proceed or decline if you prefer not to continue with this offer.
            </Typography>
          </Alert>
        )}
      </CardContent>

      <CardActions sx={{ px: 2, pb: 2 }}>
        <Button
          variant="outlined"
          startIcon={<RefreshIcon />}
          onClick={handleFetchLoans}
          disabled={isLoading}
          fullWidth
        >
          Refresh Loans
        </Button>
      </CardActions>
    </Card>
  );
};

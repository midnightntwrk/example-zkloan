import React, { useState, useEffect, useMemo } from 'react';
import {
  Card,
  CardContent,
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
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import { useZKLoanContext } from '../hooks';
import {
  type ZKLoanDeployment,
  type DeployedZKLoan,
  type UserLoan,
  type LoanStatus,
} from '../contexts';
import { getLoanProfile, getProfileByApplicantId } from '../utils/loanProfiles';
import { SectionHeader } from './Layout/SectionHeader';
import { tokens } from '../config/theme';

const getStatusConfig = (
  status: LoanStatus,
): {
  color: 'success' | 'error' | 'warning' | 'info' | 'default';
  label: string;
} => {
  switch (status) {
    case 'Approved':
      return { color: 'success', label: 'Approved' };
    case 'Rejected':
      return { color: 'error', label: 'Rejected' };
    case 'Proposed':
      return { color: 'info', label: 'Pending review' };
    case 'NotAccepted':
      return { color: 'default', label: 'Declined' };
    default:
      return { color: 'default', label: status };
  }
};

export const MyLoans: React.FC = () => {
  const {
    deployment$,
    getMyLoans,
    respondToLoan,
    flowMessage,
    lastLoanUpdate,
  } = useZKLoanContext();

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
      await handleFetchLoans();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to process response');
    } finally {
      setRespondingLoanId(null);
    }
  };

  useEffect(() => {
    if (isDeployed && !hasLoaded) {
      handleFetchLoans();
    }
  }, [isDeployed, hasLoaded]);

  useEffect(() => {
    if (isDeployed && lastLoanUpdate > 0) {
      handleFetchLoans();
    }
  }, [lastLoanUpdate, isDeployed]);

  // Empty preview — before connection
  if (!isDeployed) {
    return (
      <Card>
        <CardContent sx={{ p: { xs: 3.5, md: 5 } }}>
          <SectionHeader
            index="04"
            kicker="History"
            title={
              <>
                Your ledger of{' '}
                <Box
                  component="em"
                  sx={{
                    fontStyle: 'italic',
                    color: tokens.inkDim,
                    fontVariationSettings: '"opsz" 32, "SOFT" 80',
                  }}
                >
                  past applications
                </Box>
              </>
            }
          >
            Every loan you request — approved, rejected, or proposed — lives here.
            Connect to a contract to begin a record.
          </SectionHeader>
          <Box
            sx={{
              mt: 5,
              borderTop: `1px solid ${tokens.hairline}`,
              borderBottom: `1px solid ${tokens.hairline}`,
              py: 6,
              textAlign: 'center',
            }}
          >
            <Typography
              sx={{
                fontFamily: '"Fraunces", serif',
                fontStyle: 'italic',
                fontSize: '1.3rem',
                color: tokens.inkMuted,
                fontVariationSettings: '"opsz" 32, "SOFT" 80',
              }}
            >
              No record yet.
            </Typography>
          </Box>
        </CardContent>
      </Card>
    );
  }

  const hasProposed = loans.some((l) => l.status === 'Proposed');

  return (
    <Card>
      <CardContent sx={{ p: { xs: 3.5, md: 5 } }}>
        <SectionHeader
          index="04"
          kicker="History"
          title={
            <>
              Your ledger of{' '}
              <Box
                component="em"
                sx={{
                  fontStyle: 'italic',
                  color: tokens.accent,
                  fontVariationSettings: '"opsz" 32, "SOFT" 100',
                }}
              >
                past applications
              </Box>
            </>
          }
          status={hasProposed ? { label: 'Action needed', tone: 'warning' } : undefined}
        >
          Every loan you've requested from this contract. Proposed offers can be accepted
          or declined inline.
        </SectionHeader>

        <Box sx={{ mt: 4, pt: 4, borderTop: `1px solid ${tokens.hairline}` }}>
          {isLoading && (
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 2.5,
                py: 3,
              }}
            >
              <CircularProgress size={16} thickness={3} />
              <Typography
                sx={{
                  fontFamily: '"IBM Plex Mono", monospace',
                  fontSize: '0.75rem',
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  color: tokens.inkDim,
                }}
              >
                {flowMessage ?? 'Fetching loans…'}
              </Typography>
            </Box>
          )}

          {error && <Alert severity="error">{error}</Alert>}

          {!isLoading && !error && loans.length === 0 && hasLoaded && (
            <Box
              sx={{
                py: 6,
                textAlign: 'center',
              }}
            >
              <Typography
                sx={{
                  fontFamily: '"Fraunces", serif',
                  fontStyle: 'italic',
                  fontSize: '1.3rem',
                  color: tokens.inkMuted,
                  fontVariationSettings: '"opsz" 32, "SOFT" 80',
                  mb: 1,
                }}
              >
                No record yet.
              </Typography>
              <Typography
                sx={{
                  fontFamily: '"IBM Plex Mono", monospace',
                  fontSize: '0.7rem',
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  color: tokens.inkMuted,
                }}
              >
                Submit a loan request to begin.
              </Typography>
            </Box>
          )}

          {!isLoading && loans.length > 0 && (
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ width: 60 }}>#</TableCell>
                    <TableCell>Applicant</TableCell>
                    <TableCell align="right">Amount</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell align="right" sx={{ width: 120 }}>
                      Action
                    </TableCell>
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
                        <TableCell
                          sx={{
                            fontFamily: '"IBM Plex Mono", monospace',
                            color: tokens.inkMuted,
                            fontSize: '0.85rem',
                          }}
                        >
                          {loan.loanId.toString().padStart(2, '0')}
                        </TableCell>
                        <TableCell>
                          {profileDisplay ? (
                            <Tooltip
                              title={
                                profileDisplay.score
                                  ? `Credit score: ${profileDisplay.score}`
                                  : ''
                              }
                              arrow
                            >
                              <Box
                                component="span"
                                sx={{
                                  fontFamily: '"IBM Plex Mono", monospace',
                                  fontSize: '0.85rem',
                                  color: tokens.ink,
                                  cursor: profileDisplay.score ? 'help' : 'default',
                                  borderBottom: profileDisplay.score
                                    ? `1px dotted ${tokens.hairlineStrong}`
                                    : 'none',
                                }}
                              >
                                {profileDisplay.id}
                              </Box>
                            </Tooltip>
                          ) : (
                            <Typography
                              component="span"
                              sx={{ color: tokens.inkMuted }}
                            >
                              —
                            </Typography>
                          )}
                        </TableCell>
                        <TableCell align="right">
                          <Typography
                            component="span"
                            sx={{
                              fontFamily: '"Fraunces", serif',
                              fontSize: '1.05rem',
                              color: tokens.ink,
                              fontFeatureSettings: '"tnum"',
                              letterSpacing: '-0.005em',
                            }}
                          >
                            ${loan.authorizedAmount.toString()}
                          </Typography>
                          {isProposed && (
                            <Typography
                              sx={{
                                display: 'block',
                                fontFamily: '"IBM Plex Mono", monospace',
                                fontSize: '0.62rem',
                                letterSpacing: '0.14em',
                                textTransform: 'uppercase',
                                color: tokens.amber,
                                mt: 0.5,
                              }}
                            >
                              Qualified amount
                            </Typography>
                          )}
                        </TableCell>
                        <TableCell>
                          <Chip
                            label={statusConfig.label}
                            color={statusConfig.color}
                            size="small"
                          />
                        </TableCell>
                        <TableCell align="right">
                          {isProposed ? (
                            <Box
                              sx={{
                                display: 'flex',
                                gap: 0.5,
                                justifyContent: 'flex-end',
                                alignItems: 'center',
                              }}
                            >
                              {isResponding ? (
                                <CircularProgress size={18} thickness={3} />
                              ) : (
                                <>
                                  <Tooltip title="Accept this loan amount" arrow>
                                    <span>
                                      <IconButton
                                        size="small"
                                        color="success"
                                        onClick={() => handleRespondToLoan(loan.loanId, true)}
                                        disabled={respondingLoanId !== null}
                                      >
                                        <CheckCircleIcon fontSize="small" />
                                      </IconButton>
                                    </span>
                                  </Tooltip>
                                  <Tooltip title="Decline this offer" arrow>
                                    <span>
                                      <IconButton
                                        size="small"
                                        color="error"
                                        onClick={() => handleRespondToLoan(loan.loanId, false)}
                                        disabled={respondingLoanId !== null}
                                      >
                                        <CancelIcon fontSize="small" />
                                      </IconButton>
                                    </span>
                                  </Tooltip>
                                </>
                              )}
                            </Box>
                          ) : (
                            <Typography
                              component="span"
                              sx={{ color: tokens.inkMuted }}
                            >
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

          {!isLoading && hasProposed && (
            <Alert severity="info" sx={{ mt: 4 }}>
              <Typography sx={{ fontSize: '0.85rem', lineHeight: 1.55 }}>
                <Box component="strong" sx={{ color: tokens.ink }}>
                  Action required.
                </Box>
                {' '}
                You have proposals awaiting a decision. The amounts shown are the
                maximum your eligibility permits — accept to proceed or decline to
                walk away.
              </Typography>
            </Alert>
          )}
        </Box>
      </CardContent>

      <CardActions sx={{ px: { xs: 3.5, md: 5 }, pb: { xs: 3.5, md: 5 }, pt: 0 }}>
        <Button
          variant="outlined"
          onClick={handleFetchLoans}
          disabled={isLoading}
          fullWidth
        >
          Refresh ledger
        </Button>
      </CardActions>
    </Card>
  );
};

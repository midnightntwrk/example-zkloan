// Predefined user profiles
export const userProfiles = [
  { applicantId: 'user-001', creditScore: 720, monthlyIncome: 2500, monthsAsCustomer: 24 },
  { applicantId: 'user-002', creditScore: 650, monthlyIncome: 1800, monthsAsCustomer: 11 },
  { applicantId: 'user-003', creditScore: 580, monthlyIncome: 2200, monthsAsCustomer: 36 },
  { applicantId: 'user-004', creditScore: 710, monthlyIncome: 1900, monthsAsCustomer: 5 },
  { applicantId: 'user-005', creditScore: 520, monthlyIncome: 3000, monthsAsCustomer: 48 },
  { applicantId: 'user-006', creditScore: 810, monthlyIncome: 4500, monthsAsCustomer: 60 },
  { applicantId: 'user-007', creditScore: 639, monthlyIncome: 2100, monthsAsCustomer: 18 },
  { applicantId: 'user-008', creditScore: 680, monthlyIncome: 1450, monthsAsCustomer: 30 },
  { applicantId: 'user-009', creditScore: 750, monthlyIncome: 2100, monthsAsCustomer: 23 },
  { applicantId: 'user-010', creditScore: 579, monthlyIncome: 1900, monthsAsCustomer: 12 },
];

export type UserProfile = typeof userProfiles[number];

const LOAN_PROFILES_KEY = 'zkloan-loan-profiles';

interface LoanProfileMapping {
  [loanKey: string]: string; // loanKey -> applicantId
}

// Create a unique key for a loan based on contract address and loan ID
function createLoanKey(contractAddress: string, loanId: string): string {
  return `${contractAddress}:${loanId}`;
}

// Get all loan profile mappings from localStorage
function getLoanProfileMappings(): LoanProfileMapping {
  try {
    const stored = localStorage.getItem(LOAN_PROFILES_KEY);
    return stored ? JSON.parse(stored) : {};
  } catch {
    return {};
  }
}

// Save loan profile mappings to localStorage
function saveLoanProfileMappings(mappings: LoanProfileMapping): void {
  try {
    localStorage.setItem(LOAN_PROFILES_KEY, JSON.stringify(mappings));
  } catch (e) {
    console.error('Failed to save loan profiles to localStorage:', e);
  }
}

// Save the profile used for a specific loan
export function saveLoanProfile(contractAddress: string, loanId: string, applicantId: string): void {
  const mappings = getLoanProfileMappings();
  const key = createLoanKey(contractAddress, loanId);
  mappings[key] = applicantId;
  saveLoanProfileMappings(mappings);
}

// Get the profile used for a specific loan
export function getLoanProfile(contractAddress: string, loanId: string): string | null {
  const mappings = getLoanProfileMappings();
  const key = createLoanKey(contractAddress, loanId);
  return mappings[key] || null;
}

// Get profile details by applicantId
export function getProfileByApplicantId(applicantId: string): UserProfile | undefined {
  return userProfiles.find(p => p.applicantId === applicantId);
}

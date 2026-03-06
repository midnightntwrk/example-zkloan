import { type ZKLoanCreditScorerPrivateState } from 'zkloan-credit-scorer-contract';
export declare const userProfiles: {
    applicantId: string;
    creditScore: number;
    monthlyIncome: number;
    monthsAsCustomer: number;
}[];
export declare function getUserProfile(index?: number): ZKLoanCreditScorerPrivateState;

import { ZKLoanCreditScorer, type ZKLoanCreditScorerPrivateState } from 'zkloan-credit-scorer-contract';
import type { MidnightProviders } from '@midnight-ntwrk/midnight-js-types';
import type { DeployedContract, FoundContract } from '@midnight-ntwrk/midnight-js-contracts';
export type ZKLoanCreditScorerCircuits = 'requestLoan' | 'changePin' | 'blacklistUser' | 'removeBlacklistUser' | 'transferAdmin' | 'respondToLoan' | 'registerProvider' | 'removeProvider';
export declare const ZKLoanCreditScorerPrivateStateId = "zkLoanCreditScorerPrivateState";
export type ZKLoanCreditScorerProviders = MidnightProviders<ZKLoanCreditScorerCircuits, typeof ZKLoanCreditScorerPrivateStateId, ZKLoanCreditScorerPrivateState>;
export type ZKLoanCreditScorerContract = ZKLoanCreditScorer.Contract<ZKLoanCreditScorerPrivateState>;
export type DeployedZKLoanCreditScorerContract = DeployedContract<ZKLoanCreditScorerContract> | FoundContract<ZKLoanCreditScorerContract>;

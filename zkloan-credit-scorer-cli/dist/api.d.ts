import 'dotenv/config';
import { type ContractAddress } from '@midnight-ntwrk/compact-runtime';
import { ZKLoanCreditScorer, type ZKLoanCreditScorerPrivateState } from 'zkloan-credit-scorer-contract';
import * as ledger from '@midnight-ntwrk/ledger-v7';
import { CompiledContract } from '@midnight-ntwrk/compact-js';
import { type FinalizedTxData, type MidnightProvider, type WalletProvider } from '@midnight-ntwrk/midnight-js-types';
import { WalletFacade } from '@midnight-ntwrk/wallet-sdk-facade';
import { type UnshieldedKeystore } from '@midnight-ntwrk/wallet-sdk-unshielded-wallet';
import { type Logger } from 'pino';
import { Buffer } from 'buffer';
import { type ZKLoanCreditScorerContract, type ZKLoanCreditScorerProviders, type DeployedZKLoanCreditScorerContract } from './common-types';
import { type Config } from './config';
export interface WalletContext {
    wallet: WalletFacade;
    shieldedSecretKeys: ledger.ZswapSecretKeys;
    dustSecretKey: ledger.DustSecretKey;
    unshieldedKeystore: UnshieldedKeystore;
}
export declare const getZKLoanLedgerState: (providers: ZKLoanCreditScorerProviders, contractAddress: ContractAddress) => Promise<ZKLoanCreditScorer.Ledger | null>;
export declare const zkLoanCompiledContract: CompiledContract.CompiledContract<ZKLoanCreditScorerContract, ZKLoanCreditScorerPrivateState, never>;
export declare const joinContract: (providers: ZKLoanCreditScorerProviders, contractAddress: string) => Promise<DeployedZKLoanCreditScorerContract>;
export declare const deploy: (providers: ZKLoanCreditScorerProviders, privateState: ZKLoanCreditScorerPrivateState) => Promise<DeployedZKLoanCreditScorerContract>;
export declare const computeUserPubKeyHash: (zwapKeyBytes: Uint8Array, pin: bigint) => bigint;
export declare const fetchAttestation: (attestationApiUrl: string, creditScore: number, monthlyIncome: number, monthsAsCustomer: number, userPubKeyHash: bigint) => Promise<{
    announcement: {
        x: bigint;
        y: bigint;
    };
    response: bigint;
}>;
export declare const requestLoan: (contract: DeployedZKLoanCreditScorerContract, providers: ZKLoanCreditScorerProviders, amountRequested: bigint, secretPin: bigint, zwapKeyBytes: Uint8Array, attestationApiUrl: string) => Promise<FinalizedTxData>;
export declare const changePin: (contract: DeployedZKLoanCreditScorerContract, oldPin: bigint, newPin: bigint) => Promise<FinalizedTxData>;
export declare const blacklistUser: (contract: DeployedZKLoanCreditScorerContract, account: Uint8Array) => Promise<FinalizedTxData>;
export declare const removeBlacklistUser: (contract: DeployedZKLoanCreditScorerContract, account: Uint8Array) => Promise<FinalizedTxData>;
export declare const transferAdmin: (contract: DeployedZKLoanCreditScorerContract, newAdmin: Uint8Array) => Promise<FinalizedTxData>;
export declare const registerProvider: (contract: DeployedZKLoanCreditScorerContract, providerId: bigint, providerPk: {
    x: bigint;
    y: bigint;
}) => Promise<FinalizedTxData>;
export declare const removeProvider: (contract: DeployedZKLoanCreditScorerContract, providerId: bigint) => Promise<FinalizedTxData>;
export declare const displayContractState: (providers: ZKLoanCreditScorerProviders, contract: DeployedZKLoanCreditScorerContract) => Promise<{
    ledgerState: ZKLoanCreditScorer.Ledger | null;
    contractAddress: string;
}>;
/**
 * Create wallet and midnight provider from WalletFacade using stable API
 */
export declare const createWalletAndMidnightProvider: (walletContext: WalletContext) => Promise<WalletProvider & MidnightProvider>;
export declare const waitForSync: (wallet: WalletFacade) => Promise<import("@midnight-ntwrk/wallet-sdk-facade").FacadeState>;
export declare const waitForFunds: (wallet: WalletFacade) => Promise<bigint>;
/**
 * Display wallet balances (unshielded, shielded, total)
 */
export declare const displayWalletBalances: (wallet: WalletFacade) => Promise<{
    unshielded: bigint;
    shielded: bigint;
    total: bigint;
}>;
/**
 * Register unshielded Night UTXOs for dust generation
 * This is required before the wallet can pay transaction fees
 */
export declare const registerNightForDust: (walletContext: WalletContext) => Promise<boolean>;
/**
 * Convert mnemonic phrase to seed buffer using BIP39 standard
 * This generates a 64-byte seed as expected by Midnight HD wallet
 */
export declare const mnemonicToSeed: (mnemonic: string) => Promise<Buffer>;
/**
 * Initialize wallet with seed using the new wallet SDK
 */
export declare const initWalletWithSeed: (seed: Buffer, config: Config) => Promise<WalletContext>;
/**
 * Build wallet from mnemonic and wait for funds
 */
export declare const buildWalletAndWaitForFunds: (config: Config, mnemonic: string) => Promise<WalletContext>;
export declare const randomBytes: (length: number) => Uint8Array;
/**
 * Generate a fresh wallet with random mnemonic
 */
export declare const buildFreshWallet: (config: Config) => Promise<WalletContext>;
/**
 * Build wallet from hex seed (for backwards compatibility with genesis wallet)
 */
export declare const buildWalletFromHexSeed: (config: Config, hexSeed: string) => Promise<WalletContext>;
export declare const configureProviders: (walletContext: WalletContext, config: Config) => Promise<ZKLoanCreditScorerProviders>;
export declare function setLogger(_logger: Logger): void;
export declare const closeWallet: (walletContext: WalletContext) => Promise<void>;

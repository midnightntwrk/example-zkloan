// This file is part of the ZKLoan Credit Scorer example.
// Copyright (C) 2025 Midnight Foundation
// SPDX-License-Identifier: Apache-2.0
// Licensed under the Apache License, Version 2.0 (the "License");
// You may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
// http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import 'dotenv/config';
import { type ContractAddress, transientHash, CompactTypeBytes } from '@midnight-ntwrk/compact-runtime';
import { ZKLoanCreditScorer, type ZKLoanCreditScorerPrivateState, witnesses } from 'zkloan-credit-scorer-contract';
import * as ledger from '@midnight-ntwrk/ledger-v7';
import { CompiledContract } from '@midnight-ntwrk/compact-js';
import { deployContract, findDeployedContract } from '@midnight-ntwrk/midnight-js-contracts';
import { httpClientProofProvider } from '@midnight-ntwrk/midnight-js-http-client-proof-provider';
import { indexerPublicDataProvider } from '@midnight-ntwrk/midnight-js-indexer-public-data-provider';
import { NodeZkConfigProvider } from '@midnight-ntwrk/midnight-js-node-zk-config-provider';
import { levelPrivateStateProvider } from '@midnight-ntwrk/midnight-js-level-private-state-provider';
import {
  type FinalizedTxData,
  type MidnightProvider,
  type WalletProvider,
  type UnboundTransaction,
} from '@midnight-ntwrk/midnight-js-types';
import { assertIsContractAddress } from '@midnight-ntwrk/midnight-js-utils';
import { setNetworkId } from '@midnight-ntwrk/midnight-js-network-id';

// New wallet SDK imports
import { HDWallet, Roles } from '@midnight-ntwrk/wallet-sdk-hd';
import { WalletFacade } from '@midnight-ntwrk/wallet-sdk-facade';
import { ShieldedWallet } from '@midnight-ntwrk/wallet-sdk-shielded';
import { DustWallet } from '@midnight-ntwrk/wallet-sdk-dust-wallet';
import {
  createKeystore,
  InMemoryTransactionHistoryStorage,
  PublicKey as UnshieldedPublicKey,
  type UnshieldedKeystore,
  UnshieldedWallet,
} from '@midnight-ntwrk/wallet-sdk-unshielded-wallet';
import * as bip39 from '@scure/bip39';
import { wordlist as english } from '@scure/bip39/wordlists/english.js';

import { webcrypto } from 'crypto';
import { type Logger } from 'pino';
import * as Rx from 'rxjs';
import { WebSocket } from 'ws';
import { Buffer } from 'buffer';
import {
  type ZKLoanCreditScorerContract,
  type ZKLoanCreditScorerPrivateStateId,
  type ZKLoanCreditScorerProviders,
  type DeployedZKLoanCreditScorerContract,
  type ZKLoanCreditScorerCircuits,
} from './common-types';
import { type Config, contractConfig } from './config';
import { getUserProfile } from './state.utils';

let logger: Logger;
// @ts-expect-error: It's needed to enable WebSocket usage through apollo
globalThis.WebSocket = WebSocket;

// Types for the new wallet
export interface WalletContext {
  wallet: WalletFacade;
  shieldedSecretKeys: ledger.ZswapSecretKeys;
  dustSecretKey: ledger.DustSecretKey;
  unshieldedKeystore: UnshieldedKeystore;
}

export const getZKLoanLedgerState = async (
  providers: ZKLoanCreditScorerProviders,
  contractAddress: ContractAddress,
): Promise<ZKLoanCreditScorer.Ledger | null> => {
  assertIsContractAddress(contractAddress);
  logger.info('Checking contract ledger state...');
  const state = await providers.publicDataProvider
    .queryContractState(contractAddress)
    .then((contractState) => (contractState != null ? ZKLoanCreditScorer.ledger(contractState.data) : null));
  return state;
};

// Create compiled contract using the stable API pattern
export const zkLoanCompiledContract = CompiledContract.make<ZKLoanCreditScorerContract>(
  'ZKLoanCreditScorer',
  ZKLoanCreditScorer.Contract
).pipe(
  CompiledContract.withWitnesses(witnesses),
  CompiledContract.withCompiledFileAssets(contractConfig.zkConfigPath),
);

export const joinContract = async (
  providers: ZKLoanCreditScorerProviders,
  contractAddress: string,
): Promise<DeployedZKLoanCreditScorerContract> => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const contract = await findDeployedContract(providers as any, {
    contractAddress,
    compiledContract: zkLoanCompiledContract,
    privateStateId: 'zkLoanCreditScorerPrivateState',
    initialPrivateState: getUserProfile(),
  });
  logger.info(`Joined contract at address: ${contract.deployTxData.public.contractAddress}`);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return contract as any;
};

export const deploy = async (
  providers: ZKLoanCreditScorerProviders,
  privateState: ZKLoanCreditScorerPrivateState,
): Promise<DeployedZKLoanCreditScorerContract> => {
  logger.info('Deploying ZKLoan Credit Scorer contract...');
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const contract = await deployContract(providers as any, {
    compiledContract: zkLoanCompiledContract,
    privateStateId: 'zkLoanCreditScorerPrivateState',
    initialPrivateState: privateState,
  });
  logger.info(`Deployed contract at address: ${contract.deployTxData.public.contractAddress}`);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return contract as any;
};

// ZKLoan-specific operations

const bytes32Type = new CompactTypeBytes(32);
const { pureCircuits } = ZKLoanCreditScorer;

export const computeUserPubKeyHash = (zwapKeyBytes: Uint8Array, pin: bigint): bigint => {
  const pubKey = pureCircuits.publicKey(zwapKeyBytes, pin);
  return transientHash(bytes32Type, pubKey);
};

export const fetchAttestation = async (
  attestationApiUrl: string,
  creditScore: number,
  monthlyIncome: number,
  monthsAsCustomer: number,
  userPubKeyHash: bigint,
): Promise<{ announcement: { x: bigint; y: bigint }; response: bigint }> => {
  const res = await fetch(`${attestationApiUrl}/attest`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      creditScore,
      monthlyIncome,
      monthsAsCustomer,
      userPubKeyHash: userPubKeyHash.toString(),
    }),
  });
  if (!res.ok) {
    throw new Error(`Attestation API error: ${res.status} ${await res.text()}`);
  }
  const data = await res.json() as { signature: { announcement: { x: string; y: string }; response: string } };
  return {
    announcement: { x: BigInt(data.signature.announcement.x), y: BigInt(data.signature.announcement.y) },
    response: BigInt(data.signature.response),
  };
};

export const requestLoan = async (
  contract: DeployedZKLoanCreditScorerContract,
  providers: ZKLoanCreditScorerProviders,
  amountRequested: bigint,
  secretPin: bigint,
  zwapKeyBytes: Uint8Array,
  attestationApiUrl: string,
): Promise<FinalizedTxData> => {
  // 1. Compute user pub key hash (same as the circuit does)
  const userPubKeyHash = computeUserPubKeyHash(zwapKeyBytes, secretPin);
  logger.info(`Computed userPubKeyHash for attestation`);

  // 2. Get current private state
  const currentState = await providers.privateStateProvider.get('zkLoanCreditScorerPrivateState');
  if (!currentState) {
    throw new Error('No private state found');
  }

  // 3. Fetch attestation signature from API
  logger.info(`Fetching attestation from ${attestationApiUrl}...`);
  const signature = await fetchAttestation(
    attestationApiUrl,
    Number(currentState.creditScore),
    Number(currentState.monthlyIncome),
    Number(currentState.monthsAsCustomer),
    userPubKeyHash,
  );

  // 4. Get provider info
  const providerRes = await fetch(`${attestationApiUrl}/provider-info`);
  const providerInfo = await providerRes.json() as { providerId: number };

  // 5. Update private state with attestation data
  const updatedState: ZKLoanCreditScorerPrivateState = {
    ...currentState,
    attestationSignature: signature,
    attestationProviderId: BigInt(providerInfo.providerId),
  };
  await providers.privateStateProvider.set('zkLoanCreditScorerPrivateState', updatedState);
  logger.info(`Private state updated with attestation (provider ${providerInfo.providerId})`);

  // 6. Call the circuit
  logger.info(`Requesting loan for amount: ${amountRequested} with PIN...`);
  const finalizedTxData = await contract.callTx.requestLoan(amountRequested, secretPin);
  logger.info(`Transaction ${finalizedTxData.public.txId} added in block ${finalizedTxData.public.blockHeight}`);
  return finalizedTxData.public;
};

export const changePin = async (
  contract: DeployedZKLoanCreditScorerContract,
  oldPin: bigint,
  newPin: bigint,
): Promise<FinalizedTxData> => {
  logger.info('Changing PIN...');
  const finalizedTxData = await contract.callTx.changePin(oldPin, newPin);
  logger.info(`Transaction ${finalizedTxData.public.txId} added in block ${finalizedTxData.public.blockHeight}`);
  return finalizedTxData.public;
};

export const blacklistUser = async (
  contract: DeployedZKLoanCreditScorerContract,
  account: Uint8Array,
): Promise<FinalizedTxData> => {
  logger.info('Blacklisting user...');
  const finalizedTxData = await contract.callTx.blacklistUser({ bytes: account });
  logger.info(`Transaction ${finalizedTxData.public.txId} added in block ${finalizedTxData.public.blockHeight}`);
  return finalizedTxData.public;
};

export const removeBlacklistUser = async (
  contract: DeployedZKLoanCreditScorerContract,
  account: Uint8Array,
): Promise<FinalizedTxData> => {
  logger.info('Removing user from blacklist...');
  const finalizedTxData = await contract.callTx.removeBlacklistUser({ bytes: account });
  logger.info(`Transaction ${finalizedTxData.public.txId} added in block ${finalizedTxData.public.blockHeight}`);
  return finalizedTxData.public;
};

export const transferAdmin = async (
  contract: DeployedZKLoanCreditScorerContract,
  newAdmin: Uint8Array,
): Promise<FinalizedTxData> => {
  logger.info('Transferring admin role...');
  const finalizedTxData = await contract.callTx.transferAdmin({ bytes: newAdmin });
  logger.info(`Transaction ${finalizedTxData.public.txId} added in block ${finalizedTxData.public.blockHeight}`);
  return finalizedTxData.public;
};

export const registerProvider = async (
  contract: DeployedZKLoanCreditScorerContract,
  providerId: bigint,
  providerPk: { x: bigint; y: bigint },
): Promise<FinalizedTxData> => {
  logger.info(`Registering attestation provider ${providerId}...`);
  const finalizedTxData = await contract.callTx.registerProvider(providerId, providerPk);
  logger.info(`Transaction ${finalizedTxData.public.txId} added in block ${finalizedTxData.public.blockHeight}`);
  return finalizedTxData.public;
};

export const removeProvider = async (
  contract: DeployedZKLoanCreditScorerContract,
  providerId: bigint,
): Promise<FinalizedTxData> => {
  logger.info(`Removing attestation provider ${providerId}...`);
  const finalizedTxData = await contract.callTx.removeProvider(providerId);
  logger.info(`Transaction ${finalizedTxData.public.txId} added in block ${finalizedTxData.public.blockHeight}`);
  return finalizedTxData.public;
};

export const displayContractState = async (
  providers: ZKLoanCreditScorerProviders,
  contract: DeployedZKLoanCreditScorerContract,
): Promise<{ ledgerState: ZKLoanCreditScorer.Ledger | null; contractAddress: string }> => {
  const contractAddress = contract.deployTxData.public.contractAddress;
  const ledgerState = await getZKLoanLedgerState(providers, contractAddress);
  if (ledgerState === null) {
    logger.info(`There is no ZKLoan contract deployed at ${contractAddress}.`);
  } else {
    logger.info(`Contract address: ${contractAddress}`);
    logger.info(`Admin: ${Buffer.from(ledgerState.admin.bytes).toString('hex')}`);
    logger.info(`Blacklist size: ${ledgerState.blacklist.size()}`);
  }
  return { contractAddress, ledgerState };
};

/**
 * Create wallet and midnight provider from WalletFacade using stable API
 */
export const createWalletAndMidnightProvider = async (
  walletContext: WalletContext,
): Promise<WalletProvider & MidnightProvider> => {
  // Wait for wallet to sync first
  await Rx.firstValueFrom(
    walletContext.wallet.state().pipe(Rx.filter((s) => s.isSynced)),
  );

  return {
    getCoinPublicKey(): ledger.CoinPublicKey {
      return walletContext.shieldedSecretKeys.coinPublicKey;
    },

    getEncryptionPublicKey(): ledger.EncPublicKey {
      return walletContext.shieldedSecretKeys.encryptionPublicKey;
    },

    async balanceTx(
      tx: UnboundTransaction,
      ttl?: Date,
    ): Promise<ledger.FinalizedTransaction> {
      const txTtl = ttl ?? new Date(Date.now() + 30 * 60 * 1000); // 30 min default TTL

      // Use the wallet facade to balance the unbound (proven) transaction
      const recipe = await walletContext.wallet.balanceUnboundTransaction(
        tx,
        {
          shieldedSecretKeys: walletContext.shieldedSecretKeys,
          dustSecretKey: walletContext.dustSecretKey,
        },
        { ttl: txTtl },
      );

      // Finalize the recipe to get the final transaction
      const finalizedTx = await walletContext.wallet.finalizeRecipe(recipe);
      return finalizedTx;
    },

    async submitTx(tx: ledger.FinalizedTransaction): Promise<ledger.TransactionId> {
      return await walletContext.wallet.submitTransaction(tx);
    },
  };
};

export const waitForSync = (wallet: WalletFacade) =>
  Rx.firstValueFrom(
    wallet.state().pipe(
      Rx.throttleTime(5_000),
      Rx.tap((state) => {
        logger.info(`Waiting for wallet sync. Synced: ${state.isSynced}`);
      }),
      Rx.filter((state) => state.isSynced),
    ),
  );

export const waitForFunds = (wallet: WalletFacade) =>
  Rx.firstValueFrom(
    wallet.state().pipe(
      Rx.throttleTime(10_000),
      Rx.tap((state) => {
        const unshielded = state.unshielded?.balances[ledger.nativeToken().raw] ?? 0n;
        const shielded = state.shielded?.balances[ledger.nativeToken().raw] ?? 0n;
        logger.info(`Waiting for funds. Synced: ${state.isSynced}, Unshielded: ${unshielded}, Shielded: ${shielded}`);
      }),
      Rx.filter((state) => state.isSynced),
      Rx.map((s) => (s.unshielded?.balances[ledger.nativeToken().raw] ?? 0n) + (s.shielded?.balances[ledger.nativeToken().raw] ?? 0n)),
      Rx.filter((balance) => balance > 0n),
    ),
  );

/**
 * Display wallet balances (unshielded, shielded, total)
 */
export const displayWalletBalances = async (wallet: WalletFacade): Promise<{ unshielded: bigint; shielded: bigint; total: bigint }> => {
  const state = await Rx.firstValueFrom(wallet.state());
  const unshielded = state.unshielded?.balances[ledger.nativeToken().raw] ?? 0n;
  const shielded = state.shielded?.balances[ledger.nativeToken().raw] ?? 0n;
  const total = unshielded + shielded;

  logger.info(`Unshielded balance: ${unshielded} tDUST`);
  logger.info(`Shielded balance: ${shielded} tDUST`);
  logger.info(`Total balance: ${total} tDUST`);

  return { unshielded, shielded, total };
};

/**
 * Register unshielded Night UTXOs for dust generation
 * This is required before the wallet can pay transaction fees
 */
export const registerNightForDust = async (walletContext: WalletContext): Promise<boolean> => {
  const state = await Rx.firstValueFrom(walletContext.wallet.state().pipe(Rx.filter((s) => s.isSynced)));

  // Check if we have unshielded coins that are not registered for dust generation
  const unregisteredNightUtxos = state.unshielded?.availableCoins.filter(
    (coin) => coin.meta.registeredForDustGeneration === false
  ) ?? [];

  if (unregisteredNightUtxos.length === 0) {
    logger.info('No unshielded Night UTXOs available for dust registration, or all are already registered');

    // Check current dust balance
    const dustBalance = state.dust?.walletBalance(new Date()) ?? 0n;
    logger.info(`Current dust balance: ${dustBalance}`);

    return dustBalance > 0n;
  }

  logger.info(`Found ${unregisteredNightUtxos.length} unshielded Night UTXOs not registered for dust generation`);
  logger.info('Registering Night UTXOs for dust generation...');

  try {
    const recipe = await walletContext.wallet.registerNightUtxosForDustGeneration(
      unregisteredNightUtxos,
      walletContext.unshieldedKeystore.getPublicKey(),
      (payload) => walletContext.unshieldedKeystore.signData(payload),
    );

    logger.info('Finalizing dust registration transaction...');
    const finalizedTx = await walletContext.wallet.finalizeRecipe(recipe);

    logger.info('Submitting dust registration transaction...');
    const txId = await walletContext.wallet.submitTransaction(finalizedTx);
    logger.info(`Dust registration submitted with tx id: ${txId}`);

    // Wait for dust to be available
    logger.info('Waiting for dust to be generated...');
    await Rx.firstValueFrom(
      walletContext.wallet.state().pipe(
        Rx.throttleTime(5_000),
        Rx.tap((s) => {
          const dustBalance = s.dust?.walletBalance(new Date()) ?? 0n;
          logger.info(`Dust balance: ${dustBalance}`);
        }),
        Rx.filter((s) => (s.dust?.walletBalance(new Date()) ?? 0n) > 0n),
      ),
    );

    logger.info('Dust registration complete!');
    return true;
  } catch (e) {
    logger.error(`Failed to register Night UTXOs for dust: ${e}`);
    return false;
  }
};

/**
 * Convert mnemonic phrase to seed buffer using BIP39 standard
 * This generates a 64-byte seed as expected by Midnight HD wallet
 */
export const mnemonicToSeed = async (mnemonic: string): Promise<Buffer> => {
  const words = mnemonic.trim().split(/\s+/);
  if (!bip39.validateMnemonic(words.join(' '), english)) {
    throw new Error('Invalid mnemonic phrase');
  }
  // Use BIP39 standard seed derivation (PBKDF2) - produces 64 bytes
  const seed = await bip39.mnemonicToSeed(words.join(' '));
  return Buffer.from(seed);
};

/**
 * Initialize wallet with seed using the new wallet SDK
 */
export const initWalletWithSeed = async (
  seed: Buffer,
  config: Config,
): Promise<WalletContext> => {
  const hdWallet = HDWallet.fromSeed(seed);

  if (hdWallet.type !== 'seedOk') {
    throw new Error('Failed to initialize HDWallet');
  }

  const derivationResult = hdWallet.hdWallet
    .selectAccount(0)
    .selectRoles([Roles.Zswap, Roles.NightExternal, Roles.Dust])
    .deriveKeysAt(0);

  if (derivationResult.type !== 'keysDerived') {
    throw new Error('Failed to derive keys');
  }

  hdWallet.hdWallet.clear();

  const shieldedSecretKeys = ledger.ZswapSecretKeys.fromSeed(derivationResult.keys[Roles.Zswap]);
  const dustSecretKey = ledger.DustSecretKey.fromSeed(derivationResult.keys[Roles.Dust]);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const unshieldedKeystore = createKeystore(derivationResult.keys[Roles.NightExternal], config.networkId as any);

  // Separate configurations for each wallet type (matching example-counter pattern)
  // Convert http:// to ws:// for relay URL (wallet SDK expects WebSocket)
  const relayURL = new URL(config.node.replace(/^http/, 'ws'));

  const shieldedConfig = {
    networkId: config.networkId,
    indexerClientConnection: {
      indexerHttpUrl: config.indexer,
      indexerWsUrl: config.indexerWS,
    },
    provingServerUrl: new URL(config.proofServer),
    relayURL,
  };

  const unshieldedConfig = {
    networkId: config.networkId,
    indexerClientConnection: {
      indexerHttpUrl: config.indexer,
      indexerWsUrl: config.indexerWS,
    },
    txHistoryStorage: new InMemoryTransactionHistoryStorage(),
  };

  const dustConfig = {
    networkId: config.networkId,
    costParameters: {
      additionalFeeOverhead: 300_000_000_000_000n,
      feeBlocksMargin: 5,
    },
    indexerClientConnection: {
      indexerHttpUrl: config.indexer,
      indexerWsUrl: config.indexerWS,
    },
    provingServerUrl: new URL(config.proofServer),
    relayURL,
  };

  const shieldedWallet = ShieldedWallet(shieldedConfig).startWithSecretKeys(shieldedSecretKeys);
  const unshieldedWallet = UnshieldedWallet(unshieldedConfig).startWithPublicKey(
    UnshieldedPublicKey.fromKeyStore(unshieldedKeystore),
  );
  const dustWallet = DustWallet(dustConfig).startWithSecretKey(
    dustSecretKey,
    ledger.LedgerParameters.initialParameters().dust,
  );

  const facade: WalletFacade = new WalletFacade(shieldedWallet, unshieldedWallet, dustWallet);
  await facade.start(shieldedSecretKeys, dustSecretKey);

  return { wallet: facade, shieldedSecretKeys, dustSecretKey, unshieldedKeystore };
};

/**
 * Build wallet from mnemonic and wait for funds
 */
export const buildWalletAndWaitForFunds = async (
  config: Config,
  mnemonic: string,
): Promise<WalletContext> => {
  logger.info('Building wallet from mnemonic...');

  const seed = await mnemonicToSeed(mnemonic);
  const walletContext = await initWalletWithSeed(seed, config);

  logger.info(`Your wallet address: ${walletContext.unshieldedKeystore.getBech32Address().asString()}`);

  // Wait for sync first
  logger.info('Waiting for wallet to sync...');
  await waitForSync(walletContext.wallet);

  // Display and check balance
  const { total } = await displayWalletBalances(walletContext.wallet);

  if (total === 0n) {
    logger.info('Waiting to receive tokens...');
    await waitForFunds(walletContext.wallet);
    await displayWalletBalances(walletContext.wallet);
  }

  // Register Night UTXOs for dust generation (required for paying fees)
  await registerNightForDust(walletContext);

  return walletContext;
};

export const randomBytes = (length: number): Uint8Array => {
  const bytes = new Uint8Array(length);
  webcrypto.getRandomValues(bytes);
  return bytes;
};

/**
 * Generate a fresh wallet with random mnemonic
 */
export const buildFreshWallet = async (config: Config): Promise<WalletContext> => {
  const mnemonic = bip39.generateMnemonic(english, 256);
  logger.info(`Generated new wallet mnemonic: ${mnemonic}`);
  return await buildWalletAndWaitForFunds(config, mnemonic);
};

/**
 * Build wallet from hex seed (for backwards compatibility with genesis wallet)
 */
export const buildWalletFromHexSeed = async (
  config: Config,
  hexSeed: string,
): Promise<WalletContext> => {
  logger.info('Building wallet from hex seed...');
  const seed = Buffer.from(hexSeed, 'hex');
  const walletContext = await initWalletWithSeed(seed, config);

  logger.info(`Your wallet address: ${walletContext.unshieldedKeystore.getBech32Address().asString()}`);

  // Wait for sync first
  logger.info('Waiting for wallet to sync...');
  await waitForSync(walletContext.wallet);

  // Display and check balance
  const { total } = await displayWalletBalances(walletContext.wallet);

  if (total === 0n) {
    logger.info('Waiting to receive tokens...');
    await waitForFunds(walletContext.wallet);
    await displayWalletBalances(walletContext.wallet);
  }

  // Register Night UTXOs for dust generation (required for paying fees)
  await registerNightForDust(walletContext);

  return walletContext;
};

export const configureProviders = async (walletContext: WalletContext, config: Config): Promise<ZKLoanCreditScorerProviders> => {
  // Set global network ID - required before contract deployment
  setNetworkId(config.networkId);

  const walletAndMidnightProvider = await createWalletAndMidnightProvider(walletContext);

  // Get storage password from env or use a default
  const storagePassword = process.env.MIDNIGHT_STORAGE_PASSWORD ?? 'zkloan-credit-scorer-default-password';

  const zkConfigProvider = new NodeZkConfigProvider<ZKLoanCreditScorerCircuits>(contractConfig.zkConfigPath);

  return {
    privateStateProvider: levelPrivateStateProvider<typeof ZKLoanCreditScorerPrivateStateId>({
      privateStateStoreName: contractConfig.privateStateStoreName,
      privateStoragePasswordProvider: () => storagePassword,
    }),
    publicDataProvider: indexerPublicDataProvider(config.indexer, config.indexerWS),
    zkConfigProvider,
    proofProvider: httpClientProofProvider(config.proofServer, zkConfigProvider),
    walletProvider: walletAndMidnightProvider,
    midnightProvider: walletAndMidnightProvider,
  };
};

export function setLogger(_logger: Logger) {
  logger = _logger;
}

export const closeWallet = async (walletContext: WalletContext): Promise<void> => {
  try {
    await walletContext.wallet.stop();
  } catch (e) {
    logger.error(`Error closing wallet: ${e}`);
  }
};

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

import { stdin as input, stdout as output } from 'node:process';
import { createInterface, type Interface } from 'node:readline/promises';
import { type Logger } from 'pino';
import { type StartedDockerComposeEnvironment, type DockerComposeEnvironment } from 'testcontainers';
import { type ZKLoanCreditScorerProviders, type DeployedZKLoanCreditScorerContract } from './common-types';
import { type Config, StandaloneConfig } from './config';
import * as api from './api';
import type { WalletContext } from './api';
import { getUserProfile } from './state.utils';
import 'dotenv/config';

let logger: Logger;

/**
 * This seed gives access to tokens minted in the genesis block of a local development node - only
 * used in standalone networks to build a wallet with initial funds.
 */
const GENESIS_MINT_WALLET_SEED = '0000000000000000000000000000000000000000000000000000000000000001';

const DEPLOY_OR_JOIN_QUESTION = `
You can do one of the following:
  1. Deploy a new ZKLoan Credit Scorer contract
  2. Join an existing ZKLoan Credit Scorer contract
  3. Exit
Which would you like to do? `;

const MAIN_LOOP_QUESTION = `
You can do one of the following:
  1. Request a loan
  2. Change PIN
  3. Display contract state
  4. Display wallet balances
  5. [Admin] Blacklist a user
  6. [Admin] Remove user from blacklist
  7. [Admin] Transfer admin role
  8. [Admin] Register attestation provider
  9. [Admin] Remove attestation provider
  10. Exit
Which would you like to do? `;

const join = async (providers: ZKLoanCreditScorerProviders, rli: Interface): Promise<DeployedZKLoanCreditScorerContract> => {
  const contractAddress = await rli.question('What is the contract address (in hex)? ');
  return await api.joinContract(providers, contractAddress);
};

const deployOrJoin = async (providers: ZKLoanCreditScorerProviders, rli: Interface): Promise<DeployedZKLoanCreditScorerContract | null> => {
  while (true) {
    const choice = await rli.question(DEPLOY_OR_JOIN_QUESTION);
    switch (choice) {
      case '1':
        return await api.deploy(providers, getUserProfile());
      case '2':
        return await join(providers, rli);
      case '3':
        logger.info('Exiting...');
        return null;
      default:
        logger.error(`Invalid choice: ${choice}`);
    }
  }
};

const requestLoan = async (
  contract: DeployedZKLoanCreditScorerContract,
  providers: ZKLoanCreditScorerProviders,
  walletContext: WalletContext,
  rli: Interface,
): Promise<void> => {
  const amountStr = await rli.question('Enter the loan amount requested: ');
  const pinStr = await rli.question('Enter your secret PIN: ');

  const amount = BigInt(amountStr);
  const pin = BigInt(pinStr);

  const attestationApiUrl = process.env.ATTESTATION_API_URL || 'http://localhost:4000';
  const coinPubKeyHex = walletContext.shieldedSecretKeys.coinPublicKey as unknown as string;
  const zwapKeyBytes = Buffer.from(coinPubKeyHex, 'hex');

  await api.requestLoan(contract, providers, amount, pin, zwapKeyBytes, attestationApiUrl);
  logger.info('Loan request submitted successfully!');
};

const changePinFlow = async (contract: DeployedZKLoanCreditScorerContract, rli: Interface): Promise<void> => {
  const oldPinStr = await rli.question('Enter your old PIN: ');
  const newPinStr = await rli.question('Enter your new PIN: ');

  const oldPin = BigInt(oldPinStr);
  const newPin = BigInt(newPinStr);

  await api.changePin(contract, oldPin, newPin);
  logger.info('PIN change submitted successfully!');
  logger.info('Note: If you have many loans, you may need to call this multiple times to complete the migration.');
};

const blacklistUserFlow = async (contract: DeployedZKLoanCreditScorerContract, rli: Interface): Promise<void> => {
  const accountHex = await rli.question('Enter the Zswap public key to blacklist (hex): ');
  const account = Buffer.from(accountHex, 'hex');

  await api.blacklistUser(contract, account);
  logger.info('User blacklisted successfully!');
};

const removeBlacklistUserFlow = async (contract: DeployedZKLoanCreditScorerContract, rli: Interface): Promise<void> => {
  const accountHex = await rli.question('Enter the Zswap public key to remove from blacklist (hex): ');
  const account = Buffer.from(accountHex, 'hex');

  await api.removeBlacklistUser(contract, account);
  logger.info('User removed from blacklist successfully!');
};

const transferAdminFlow = async (contract: DeployedZKLoanCreditScorerContract, rli: Interface): Promise<void> => {
  const newAdminHex = await rli.question('Enter the new admin Zswap public key (hex): ');
  const newAdmin = Buffer.from(newAdminHex, 'hex');

  await api.transferAdmin(contract, newAdmin);
  logger.info('Admin role transferred successfully!');
};

const registerProviderFlow = async (contract: DeployedZKLoanCreditScorerContract, rli: Interface): Promise<void> => {
  const providerIdStr = await rli.question('Enter the provider ID (number): ');
  const pkXStr = await rli.question('Enter the provider public key X coordinate (bigint): ');
  const pkYStr = await rli.question('Enter the provider public key Y coordinate (bigint): ');

  const providerId = BigInt(providerIdStr);
  const providerPk = { x: BigInt(pkXStr), y: BigInt(pkYStr) };

  await api.registerProvider(contract, providerId, providerPk);
  logger.info('Attestation provider registered successfully!');
};

const removeProviderFlow = async (contract: DeployedZKLoanCreditScorerContract, rli: Interface): Promise<void> => {
  const providerIdStr = await rli.question('Enter the provider ID to remove (number): ');
  const providerId = BigInt(providerIdStr);

  await api.removeProvider(contract, providerId);
  logger.info('Attestation provider removed successfully!');
};

const mainLoop = async (providers: ZKLoanCreditScorerProviders, walletContext: WalletContext, rli: Interface): Promise<void> => {
  const contract = await deployOrJoin(providers, rli);
  if (contract === null) {
    return;
  }
  while (true) {
    const choice = await rli.question(MAIN_LOOP_QUESTION);
    try {
      switch (choice) {
        case '1':
          await requestLoan(contract, providers, walletContext, rli);
          break;
        case '2':
          await changePinFlow(contract, rli);
          break;
        case '3':
          await api.displayContractState(providers, contract);
          break;
        case '4':
          await api.displayWalletBalances(walletContext.wallet);
          break;
        case '5':
          await blacklistUserFlow(contract, rli);
          break;
        case '6':
          await removeBlacklistUserFlow(contract, rli);
          break;
        case '7':
          await transferAdminFlow(contract, rli);
          break;
        case '8':
          await registerProviderFlow(contract, rli);
          break;
        case '9':
          await removeProviderFlow(contract, rli);
          break;
        case '10':
          logger.info('Exiting...');
          return;
        default:
          logger.error(`Invalid choice: ${choice}`);
      }
    } catch (e) {
      if (e instanceof Error) {
        logger.error(`Operation failed: ${e.message}`);
      } else {
        logger.error(`Operation failed: ${e}`);
      }
    }
  }
};

const buildWalletFromMnemonic = async (config: Config, rli: Interface): Promise<WalletContext> => {
  const mnemonic = await rli.question('Enter your wallet mnemonic (24 words): ');
  return await api.buildWalletAndWaitForFunds(config, mnemonic);
};

const WALLET_LOOP_QUESTION = `
You can do one of the following:
  1. Build a fresh wallet
  2. Build wallet from a mnemonic
  3. Use mnemonic from .env file
  4. Exit
Which would you like to do? `;

const buildWallet = async (config: Config, rli: Interface): Promise<WalletContext | null> => {
  if (config instanceof StandaloneConfig) {
    // For standalone, use genesis wallet with hex seed
    return await api.buildWalletFromHexSeed(config, GENESIS_MINT_WALLET_SEED);
  }

  // Check if mnemonic is available in environment
  const envMnemonic = process.env.WALLET_MNEMONIC;

  while (true) {
    const choice = await rli.question(WALLET_LOOP_QUESTION);
    switch (choice) {
      case '1':
        return await api.buildFreshWallet(config);
      case '2':
        return await buildWalletFromMnemonic(config, rli);
      case '3':
        if (envMnemonic) {
          logger.info('Using mnemonic from .env file...');
          return await api.buildWalletAndWaitForFunds(config, envMnemonic);
        } else {
          logger.error('No WALLET_MNEMONIC found in .env file');
        }
        break;
      case '4':
        logger.info('Exiting...');
        return null;
      default:
        logger.error(`Invalid choice: ${choice}`);
    }
  }
};

const mapContainerPort = (env: StartedDockerComposeEnvironment, url: string, containerName: string) => {
  const mappedUrl = new URL(url);
  const container = env.getContainer(containerName);

  mappedUrl.port = String(container.getFirstMappedPort());

  return mappedUrl.toString().replace(/\/+$/, '');
};

export const run = async (config: Config, _logger: Logger, dockerEnv?: DockerComposeEnvironment): Promise<void> => {
  logger = _logger;
  api.setLogger(_logger);
  const rli = createInterface({ input, output, terminal: true });
  let env;
  let walletContext: WalletContext | null = null;

  if (dockerEnv !== undefined) {
    env = await dockerEnv.up();

    if (config instanceof StandaloneConfig) {
      config.indexer = mapContainerPort(env, config.indexer, 'zkloan-indexer');
      config.indexerWS = mapContainerPort(env, config.indexerWS, 'zkloan-indexer');
      config.node = mapContainerPort(env, config.node, 'zkloan-node');
      config.proofServer = mapContainerPort(env, config.proofServer, 'zkloan-proof-server');
    }
  }

  try {
    walletContext = await buildWallet(config, rli);
    if (walletContext !== null) {
      const providers = await api.configureProviders(walletContext, config);
      await mainLoop(providers, walletContext, rli);
    }
  } catch (e) {
    if (e instanceof Error) {
      logger.error(`Found error '${e.message}'`);
      logger.info('Exiting...');
      logger.debug(`${e.stack}`);
    } else {
      throw e;
    }
  } finally {
    try {
      rli.close();
      rli.removeAllListeners();
    } catch (e) {
      logger.error(`Error closing readline interface: ${e}`);
    } finally {
      try {
        if (walletContext !== null) {
          await api.closeWallet(walletContext);
        }
      } catch (e) {
        logger.error(`Error closing wallet: ${e}`);
      } finally {
        try {
          if (env !== undefined) {
            await env.down();
            logger.info('Goodbye');
          }
        } catch (e) {
          logger.error(`Error shutting down docker environment: ${e}`);
        }
      }
    }
  }
};

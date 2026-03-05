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

import path from 'path';
import * as api from '../api';
import type { WalletContext } from '../api';
import { type ZKLoanCreditScorerProviders } from '../common-types';
import { currentDir } from '../config';
import { createLogger } from '../logger-utils';
import { TestEnvironment } from './commons';
import { getUserProfile } from '../state.utils';
import { describe, it, expect, beforeAll, afterAll } from 'vitest';

const logDir = path.resolve(currentDir, '..', 'logs', 'tests', `${new Date().toISOString()}.log`);
const logger = await createLogger(logDir);

describe('ZKLoan Credit Scorer API', () => {
  let testEnvironment: TestEnvironment;
  let walletContext: WalletContext;
  let providers: ZKLoanCreditScorerProviders;

  beforeAll(
    async () => {
      api.setLogger(logger);
      testEnvironment = new TestEnvironment(logger);
      const testConfiguration = await testEnvironment.start();
      walletContext = await testEnvironment.getWallet();
      providers = await api.configureProviders(walletContext, testConfiguration.dappConfig);
    },
    1000 * 60 * 45,
  );

  afterAll(async () => {
    await testEnvironment.shutdown();
  });

  it('should deploy the contract and request a loan [@slow]', async () => {
    // Deploy with a Tier 1 user profile
    const userProfile = getUserProfile(0); // user-001: credit 720, income 2500, tenure 24
    const contract = await api.deploy(providers, userProfile);
    expect(contract).not.toBeNull();

    // Check initial state
    const initialState = await api.displayContractState(providers, contract);
    expect(initialState.ledgerState).not.toBeNull();

    // Request a loan
    await new Promise((resolve) => setTimeout(resolve, 2000));
    const secretPin = 1234n;
    const amountRequested = 5000n;

    const response = await api.requestLoan(contract, amountRequested, secretPin);
    expect(response.txHash).toMatch(/[0-9a-f]{64}/);
    expect(response.blockHeight).toBeGreaterThan(BigInt(0));

    // Verify the loan was created
    const stateAfter = await api.displayContractState(providers, contract);
    expect(stateAfter.contractAddress).toEqual(initialState.contractAddress);
  });
});

// This file is part of midnightntwrk/example-counter.
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

import {
  type CircuitContext,
  createConstructorContext,
  createCircuitContext,
  sampleContractAddress,
  type JubjubPoint,
  transientHash,
  CompactTypeBytes,
} from "@midnight-ntwrk/compact-runtime";
import {
  Contract,
  type Ledger,
  ledger,
  pureCircuits
} from "../managed/zkloan-credit-scorer/contract/index.js";
import { type ZKLoanCreditScorerPrivateState, witnesses } from "../witnesses.js";
import { createEitherTestUser } from "./utils/address.js";
import { createSignedUserProfile, generateAdminSecret, generateProviderKeyPair } from "./utils/test-data.js";

const bytes32Type = new CompactTypeBytes(32);

export class ZKLoanCreditScorerSimulator {
  readonly contract: Contract<ZKLoanCreditScorerPrivateState>;
  circuitContext: CircuitContext<ZKLoanCreditScorerPrivateState>;
  readonly providerSk: bigint;
  readonly providerPk: JubjubPoint;
  readonly providerId: bigint = 1n;
  readonly adminSecretKey: Uint8Array;

  constructor() {
    const user = createEitherTestUser("Alice");
    this.contract = new Contract<ZKLoanCreditScorerPrivateState>(witnesses);

    // Generate provider key pair
    const keyPair = generateProviderKeyPair();
    this.providerSk = keyPair.sk;
    this.providerPk = keyPair.pk;

    // Generate the admin secret. Whoever deploys holds this secret; the
    // ledger only stores its derived public key. `rotateAdmin` is the only
    // way to hand the role over without ever revealing a private key.
    this.adminSecretKey = generateAdminSecret();

    // Create initial private state with attestation for user profile 0
    const userPubKeyHash = this.computeUserPubKeyHash(user.left.bytes, 1234n);
    const initialPrivateState: ZKLoanCreditScorerPrivateState = createSignedUserProfile(
      0,
      this.providerSk,
      userPubKeyHash,
      this.providerId,
      this.adminSecretKey,
    );

    const {
      currentPrivateState,
      currentContractState,
      currentZswapLocalState
    } = this.contract.initialState(
      createConstructorContext(initialPrivateState, user.left.hex)
    );
    this.circuitContext = createCircuitContext(
      sampleContractAddress(),
      currentZswapLocalState,
      currentContractState,
      currentPrivateState
    );

    // Register the default provider
    this.registerProvider(this.providerId, this.providerPk);
  }

  public computeUserPubKeyHash(userZwapKeyBytes: Uint8Array, pin: bigint): bigint {
    const pubKey = pureCircuits.publicKey(userZwapKeyBytes, pin);
    return transientHash(bytes32Type, pubKey);
  }

  public getLedger(): Ledger {
    return ledger(this.circuitContext.currentQueryContext.state);
  }

  public getPrivateState(): ZKLoanCreditScorerPrivateState {
    return this.circuitContext.currentPrivateState;
  }

  public requestLoan(amountRequested: bigint, secretPin: bigint): Ledger {
    this.circuitContext = this.contract.impureCircuits.requestLoan(
      this.circuitContext,
      amountRequested,
      secretPin
    ).context;
    return ledger(this.circuitContext.currentQueryContext.state);
  }

  public blacklistUser(account: Uint8Array): Ledger {
    this.circuitContext = this.contract.impureCircuits.blacklistUser(
      this.circuitContext,
      { bytes: account }
    ).context;
    return ledger(this.circuitContext.currentQueryContext.state);
  }

  public removeBlacklistUser(account: Uint8Array): Ledger {
    this.circuitContext = this.contract.impureCircuits.removeBlacklistUser(
      this.circuitContext,
      { bytes: account }
    ).context;
    return ledger(this.circuitContext.currentQueryContext.state);
  }

  public changePin(oldPin: bigint, newPin: bigint): Ledger {
    this.circuitContext = this.contract.impureCircuits.changePin(
      this.circuitContext,
      oldPin,
      newPin
    ).context;
    return ledger(this.circuitContext.currentQueryContext.state);
  }

  public respondToLoan(loanId: bigint, secretPin: bigint, accept: boolean): Ledger {
    this.circuitContext = this.contract.impureCircuits.respondToLoan(
      this.circuitContext,
      loanId,
      secretPin,
      accept
    ).context;
    return ledger(this.circuitContext.currentQueryContext.state);
  }

  public rotateAdmin(newAdminPublicKey: Uint8Array): Ledger {
    this.circuitContext = this.contract.impureCircuits.rotateAdmin(
      this.circuitContext,
      { bytes: newAdminPublicKey }
    ).context;
    return ledger(this.circuitContext.currentQueryContext.state);
  }

  // Compute an AdminPublicKey from a secret without running an impure circuit.
  // Used by tests to set up rotations and to simulate non-admin callers.
  public deriveAdminPublicKey(adminSecret: Uint8Array): Uint8Array {
    return pureCircuits.deriveAdminPublicKey({ bytes: adminSecret }).bytes;
  }

  public generateAdminSecret(): Uint8Array {
    return generateAdminSecret();
  }

  // Swap the simulator's local admin secret. Tests use this to act as a
  // non-admin caller: the ledger still holds the original admin's pubkey,
  // so the in-circuit equality check fails as expected.
  public setAdminSecret(secret: Uint8Array): void {
    this.circuitContext = {
      ...this.circuitContext,
      currentPrivateState: {
        ...this.circuitContext.currentPrivateState,
        adminSecretKey: secret,
      },
    };
  }

  public registerProvider(providerId: bigint, providerPk: JubjubPoint): Ledger {
    this.circuitContext = this.contract.impureCircuits.registerProvider(
      this.circuitContext,
      providerId,
      providerPk
    ).context;
    return ledger(this.circuitContext.currentQueryContext.state);
  }

  public removeProvider(providerId: bigint): Ledger {
    this.circuitContext = this.contract.impureCircuits.removeProvider(
      this.circuitContext,
      providerId
    ).context;
    return ledger(this.circuitContext.currentQueryContext.state);
  }

  public publicKey(sk: Uint8Array, pin: bigint): Uint8Array {
    return this.contract.circuits.publicKey(
      this.circuitContext,
      sk,
      pin
    ).result;
  }

  public createTestUser(str: string): any {
    return createEitherTestUser(str);
  }
}

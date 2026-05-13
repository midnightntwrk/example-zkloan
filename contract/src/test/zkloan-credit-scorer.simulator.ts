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
import { createSignedUserProfile, generateUserSecret, generateProviderKeyPair } from "./utils/test-data.js";

const bytes32Type = new CompactTypeBytes(32);

export class ZKLoanCreditScorerSimulator {
  readonly contract: Contract<ZKLoanCreditScorerPrivateState>;
  circuitContext: CircuitContext<ZKLoanCreditScorerPrivateState>;
  readonly providerSk: bigint;
  readonly providerPk: JubjubPoint;
  readonly providerId: bigint = 1n;
  readonly userSecretKey: Uint8Array;

  constructor() {
    const user = createEitherTestUser("Alice");
    this.contract = new Contract<ZKLoanCreditScorerPrivateState>(witnesses);

    // Generate provider key pair
    const keyPair = generateProviderKeyPair();
    this.providerSk = keyPair.sk;
    this.providerPk = keyPair.pk;

    // The single per-instance user secret. The deployer's
    // `deriveAdminPublicKey(userSecret)` gets pinned into `contractAdmin` at
    // construction, so the deployer is admin. The same secret derives the
    // deployer's per-user identity (PIN-bound) via `deriveUserPublicKey`.
    this.userSecretKey = generateUserSecret();

    // Initial private state. `userPubKeyHash` for the attestation message is
    // now derived from the witness secret, not from `ownPublicKey()`.
    const userPubKeyHash = this.computeUserPubKeyHash(this.userSecretKey, 1234n);
    const initialPrivateState: ZKLoanCreditScorerPrivateState = createSignedUserProfile(
      0,
      this.providerSk,
      userPubKeyHash,
      this.providerId,
      this.userSecretKey,
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

  // Off-chain derivation of the per-user public key (PIN-bound). Uses the
  // same pure circuit the contract uses, so the bytes match exactly.
  public deriveUserPublicKey(userSecret: Uint8Array, pin: bigint): Uint8Array {
    return pureCircuits.deriveUserPublicKey({ bytes: userSecret }, pin).bytes;
  }

  public deriveAdminPublicKey(userSecret: Uint8Array): Uint8Array {
    return pureCircuits.deriveAdminPublicKey({ bytes: userSecret }).bytes;
  }

  public generateUserSecret(): Uint8Array {
    return generateUserSecret();
  }

  // The attestation message binds to the derived user pubkey via
  // transientHash, exactly as the contract does in `requestLoan`.
  public computeUserPubKeyHash(userSecret: Uint8Array, pin: bigint): bigint {
    const pubKey = this.deriveUserPublicKey(userSecret, pin);
    return transientHash(bytes32Type, pubKey);
  }

  // Swap the simulator's local user secret. Tests use this to act as a
  // non-admin caller (after rotating admin to someone else's pubkey) or to
  // simulate a different user impersonating from the same browser instance.
  public setUserSecret(secret: Uint8Array): void {
    this.circuitContext = {
      ...this.circuitContext,
      currentPrivateState: {
        ...this.circuitContext.currentPrivateState,
        userSecretKey: secret,
      },
    };
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

  public blacklistUser(userPubKey: Uint8Array): Ledger {
    this.circuitContext = this.contract.impureCircuits.blacklistUser(
      this.circuitContext,
      { bytes: userPubKey }
    ).context;
    return ledger(this.circuitContext.currentQueryContext.state);
  }

  public removeBlacklistUser(userPubKey: Uint8Array): Ledger {
    this.circuitContext = this.contract.impureCircuits.removeBlacklistUser(
      this.circuitContext,
      { bytes: userPubKey }
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

  public createTestUser(str: string): any {
    return createEitherTestUser(str);
  }
}

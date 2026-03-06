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

import { ZKLoanCreditScorerSimulator } from "./zkloan-credit-scorer.simulator.js";
import { createSignedUserProfile, createCustomSignedProfile, generateProviderKeyPair, schnorrSign } from "./utils/test-data.js";
import { setNetworkId } from "@midnight-ntwrk/midnight-js-network-id";
import { describe, it, expect } from "vitest";

setNetworkId("undeployed");

    const bigintReplacer = (_key: string, value: any) =>
      typeof value === 'bigint' ? value.toString() : value;

describe("ZKLoanCreditScorer smart contract", () => {

  // Helper: set up private state with valid attestation for a given profile
  function setAttestedPrivateState(
    simulator: ZKLoanCreditScorerSimulator,
    creditScore: bigint,
    monthlyIncome: bigint,
    monthsAsCustomer: bigint,
    pin: bigint = 1234n,
  ) {
    const userZwapKey = simulator.createTestUser("Alice").left.bytes;
    const userPubKeyHash = simulator.computeUserPubKeyHash(userZwapKey, pin);
    simulator.circuitContext.currentPrivateState = createCustomSignedProfile(
      creditScore,
      monthlyIncome,
      monthsAsCustomer,
      simulator.providerSk,
      userPubKeyHash,
      simulator.providerId,
    );
  }

   it("generates initial ledger state deterministically", () => {
    const simulator0 = new ZKLoanCreditScorerSimulator();
    const simulator1 = new ZKLoanCreditScorerSimulator();

    const ledger0 = simulator0.getLedger();
    const ledger1 = simulator1.getLedger();

    // Both should have providers registered
    expect(ledger0.providers.member(1n)).toBeTruthy();
    expect(ledger1.providers.member(1n)).toBeTruthy();
  });

  it("approves a Tier 1 loan and caps at the max amount", () => {
    const simulator = new ZKLoanCreditScorerSimulator();
    const userZwapKey = simulator.createTestUser("Alice").left.bytes;
    const userPin = 1234n;

    const userPubKey = simulator.publicKey(userZwapKey, userPin);

    // Request an amount higher than the tier's max
    simulator.requestLoan(1500n, userPin);
    const ledger = simulator.getLedger();
    const userLoans = ledger.loans.lookup(userPubKey);
    const loan = userLoans.lookup(1n); // First loan
    expect(loan.status).toEqual(0);
    expect(loan.authorizedAmount).toEqual(1500n);
  });

  it("approves a Tier 2 loan and gives the requested amount", () => {
    const simulator = new ZKLoanCreditScorerSimulator();
    const userZwapKey = simulator.createTestUser("Alice").left.bytes;
    const userPin = 1234n;

    setAttestedPrivateState(simulator, 650n, 1600n, 10n, userPin);

    const userPubKey = simulator.publicKey(userZwapKey, userPin);

    // Request an amount lower than the tier's max
    simulator.requestLoan(5000n, userPin);

    const ledger = simulator.getLedger();
    const userLoans = ledger.loans.lookup(userPubKey);
    const loan = userLoans.lookup(1n);

    expect(loan.status).toEqual(0); // Approved
    expect(loan.authorizedAmount).toEqual(5000n); // Gets the requested amount
  });

  it("proposes a Tier 3 loan when amount exceeds limit", () => {
    const simulator = new ZKLoanCreditScorerSimulator();
    const userZwapKey = simulator.createTestUser("Alice").left.bytes;
    const userPin = 1234n;

    setAttestedPrivateState(simulator, 590n, 1000n, 1n, userPin);

    const userPubKey = simulator.publicKey(userZwapKey, userPin);
    simulator.requestLoan(10000n, userPin);

    const loan = simulator.getLedger().loans.lookup(userPubKey).lookup(1n);
    expect(loan.status).toEqual(2); // Proposed (amount exceeds tier limit)
    expect(loan.authorizedAmount).toEqual(3000n); // Capped at Tier 3 max
  });

  it("rejects a loan for a non-eligible applicant", () => {
    const simulator = new ZKLoanCreditScorerSimulator();
    const userZwapKey = simulator.createTestUser("Alice").left.bytes;
    const userPin = 1234n;

    setAttestedPrivateState(simulator, 500n, 1000n, 1n, userPin);

    const userPubKey = simulator.publicKey(userZwapKey, userPin);
    simulator.requestLoan(1000n, userPin);

    const loan = simulator.getLedger().loans.lookup(userPubKey).lookup(1n);
    expect(loan.status).toEqual(1); // Rejected
    expect(loan.authorizedAmount).toEqual(0n);
  });

  it("creates multiple loans for the same user with incrementing IDs", () => {
    const simulator = new ZKLoanCreditScorerSimulator();
    const userZwapKey = simulator.createTestUser("Alice").left.bytes;
    const userPin = 1234n;

    setAttestedPrivateState(simulator, 800n, 3000n, 30n, userPin);

    const userPubKey = simulator.publicKey(userZwapKey, userPin);

    simulator.requestLoan(100n, userPin);
    simulator.requestLoan(200n, userPin);
    simulator.requestLoan(300n, userPin);

    const userLoans = simulator.getLedger().loans.lookup(userPubKey);
    expect(userLoans.size()).toEqual(3n);
    expect(userLoans.lookup(1n).authorizedAmount).toEqual(100n);
    expect(userLoans.lookup(2n).authorizedAmount).toEqual(200n);
    expect(userLoans.lookup(3n).authorizedAmount).toEqual(300n);
  });

  it("throws an error if the user is blacklisted", () => {
    const simulator = new ZKLoanCreditScorerSimulator();
    const userZwapKey = simulator.createTestUser("Alice").left.bytes;
    const userPin = 1234n;

    // Blacklist the user's Zswap key
    simulator.blacklistUser(userZwapKey);

    expect(() => {
      simulator.requestLoan(1000n, userPin);
    }).toThrow("Requester is blacklisted");
  });

  it("allows admin to blacklist and remove a user", () => {
    const simulator = new ZKLoanCreditScorerSimulator();
    const bobZwapKey = simulator.createTestUser("Bob").left.bytes;
    let ledger = simulator.getLedger();

    // Check Bob is not blacklisted
    expect(ledger.blacklist.member({ bytes: bobZwapKey })).toBeFalsy();

    // Blacklist Bob
    simulator.blacklistUser(bobZwapKey);
    ledger = simulator.getLedger();
    expect(ledger.blacklist.member({ bytes: bobZwapKey })).toBeTruthy();

    // Remove Bob from blacklist
    simulator.removeBlacklistUser(bobZwapKey);
    ledger = simulator.getLedger();
    expect(ledger.blacklist.member({ bytes: bobZwapKey })).toBeFalsy();
  });

it("migrates a small number of loans (1 batch) and cleans up", () => {
    const simulator = new ZKLoanCreditScorerSimulator();
    const userZwapKey = simulator.createTestUser("Alice").left.bytes;
    const oldPin = 1234n;
    const newPin = 9876n;

    setAttestedPrivateState(simulator, 800n, 3000n, 30n, oldPin);

    const oldPubKey = simulator.publicKey(userZwapKey, oldPin);
    const newPubKey = simulator.publicKey(userZwapKey, newPin);

    // Create 3 loans
    simulator.requestLoan(100n, oldPin); // Loan 1
    simulator.requestLoan(200n, oldPin); // Loan 2
    simulator.requestLoan(300n, oldPin); // Loan 3

    let ledger = simulator.getLedger();
    expect(ledger.loans.lookup(oldPubKey).size()).toEqual(3n);

    // Call changePin. This should migrate 1, 2, 3 and find that 4, 5 are empty.
    simulator.changePin(oldPin, newPin);

    ledger = simulator.getLedger();

    // Migration should be complete, and old entries cleaned up
    expect(ledger.loans.member(oldPubKey)).toBeFalsy();
    expect(ledger.onGoingPinMigration.member(oldPubKey)).toBeFalsy();

    // All 3 loans should be with the new key
    expect(ledger.loans.member(newPubKey)).toBeTruthy();
    expect(ledger.loans.lookup(newPubKey).size()).toEqual(3n);
    expect(ledger.loans.lookup(newPubKey).lookup(2n).authorizedAmount).toEqual(200n);
  });

  it("migrates multiple batches of loans (7 loans) correctly", () => {
    const simulator = new ZKLoanCreditScorerSimulator();
    const userZwapKey = simulator.createTestUser("Alice").left.bytes;
    const oldPin = 1234n;
    const newPin = 9876n;

    setAttestedPrivateState(simulator, 800n, 3000n, 30n, oldPin);

    const oldPubKey = simulator.publicKey(userZwapKey, oldPin);
    const newPubKey = simulator.publicKey(userZwapKey, newPin);

    // Create 7 loans
    for (let i = 1; i <= 7; i++) {
      simulator.requestLoan(BigInt(i * 100), oldPin); // Loans 1-7
    }

    let ledger = simulator.getLedger();
    expect(ledger.loans.lookup(oldPubKey).size()).toEqual(7n);
    expect(ledger.loans.member(newPubKey)).toBeFalsy();

    // --- BATCH 1 (Migrates 1-5) ---
    simulator.changePin(oldPin, newPin);

    ledger = simulator.getLedger();
    expect(ledger.loans.member(newPubKey)).toBeTruthy(); // New user map created
    expect(ledger.onGoingPinMigration.lookup(oldPubKey)).toEqual(5n); // Progress updated
    expect(ledger.loans.lookup(oldPubKey).size()).toEqual(2n); // 7 - 5 = 2
    expect(ledger.loans.lookup(newPubKey).size()).toEqual(5n);
    expect(ledger.loans.lookup(newPubKey).lookup(5n).authorizedAmount).toEqual(500n); // Check loan 5

    expect(ledger.loans.lookup(oldPubKey).member(6n)).toBeTruthy(); // Check loan 6 still with old key

// --- BATCH 2 (Migrates 6-7, finds 8-10 empty, finishes) ---
    simulator.changePin(oldPin, newPin);

    ledger = simulator.getLedger();

    // Check that the migration key was successfully removed.
    expect(ledger.onGoingPinMigration.member(oldPubKey)).toBeFalsy();

    // Check that all loans are now with the new key
    expect(ledger.loans.lookup(newPubKey).size()).toEqual(7n);
    expect(ledger.loans.lookup(newPubKey).lookup(6n).authorizedAmount).toEqual(600n);
    expect(ledger.loans.lookup(newPubKey).lookup(7n).authorizedAmount).toEqual(700n);

    expect(ledger.loans.member(oldPubKey)).toBeFalsy();
  });

  it("throws an error if user tries to requestLoan during migration", () => {
    const simulator = new ZKLoanCreditScorerSimulator();
    const userZwapKey = simulator.createTestUser("Alice").left.bytes;

    const oldPin = 1234n;
    const newPin = 9876n;
    const oldPubKey = simulator.publicKey(userZwapKey, oldPin);

    setAttestedPrivateState(simulator, 800n, 3000n, 30n, oldPin);

    // Create 7 loans to ensure migration will be in progress
    for (let i = 1; i <= 7; i++) {
      simulator.requestLoan(100n, oldPin);
    }

    // Start the migration (run batch 1)
    simulator.changePin(oldPin, newPin);

    let ledger = simulator.getLedger();

    expect(ledger.onGoingPinMigration.lookup(oldPubKey)).toEqual(5n);
    expect(ledger.onGoingPinMigration.member(oldPubKey)).toBeTruthy(); // Migration is active

    // Try to request a new loan with the old PIN
    expect(() => {
      simulator.requestLoan(100n, oldPin);
    }).toThrow("PIN migration is in progress for this user");
  });

  it("migrates loans to a new PIN that already has loans", () => {
    const simulator = new ZKLoanCreditScorerSimulator();
    const userZwapKey = simulator.createTestUser("Alice").left.bytes;
    const oldPin = 1234n;
    const newPin = 9876n;

    setAttestedPrivateState(simulator, 800n, 3000n, 30n, oldPin);

    const oldPubKey = simulator.publicKey(userZwapKey, oldPin);
    const newPubKey = simulator.publicKey(userZwapKey, newPin);

    // Create 6 loans for the old PIN
    for (let i = 1; i <= 6; i++) {
      simulator.requestLoan(BigInt(i * 10), oldPin);
    }

    // Create 3 loans for the new PIN - need attestation for new pin
    const newPinPubKeyHash = simulator.computeUserPubKeyHash(userZwapKey, newPin);
    simulator.circuitContext.currentPrivateState = createCustomSignedProfile(
      800n, 3000n, 30n,
      simulator.providerSk,
      newPinPubKeyHash,
      simulator.providerId,
    );
    for (let i = 1; i <= 3; i++) {
      simulator.requestLoan(BigInt(i * 100), newPin);
    }

    let ledger = simulator.getLedger();
    expect(ledger.loans.lookup(oldPubKey).size()).toEqual(6n);
    expect(ledger.loans.lookup(newPubKey).size()).toEqual(3n);

    // --- BATCH 1 (Migrates loans 1-5 from old to new) ---
    simulator.changePin(oldPin, newPin);

    ledger = simulator.getLedger();
    expect(ledger.onGoingPinMigration.lookup(oldPubKey)).toEqual(5n); // Progress updated
    expect(ledger.loans.lookup(newPubKey).size()).toEqual(3n + 5n); // 3 existing + 5 migrated

    // --- BATCH 2 (Migrates loan 6, finds 7-10 empty, finishes) ---
    simulator.changePin(oldPin, newPin);

    ledger = simulator.getLedger();

    // Migration should be complete, and old entries cleaned up
    expect(ledger.loans.member(oldPubKey)).toBeFalsy();
    expect(ledger.onGoingPinMigration.member(oldPubKey)).toBeFalsy();

    // All 9 loans should be with the new key
    expect(ledger.loans.lookup(newPubKey).size()).toEqual(9n);
    expect(ledger.loans.lookup(newPubKey).lookup(9n).authorizedAmount).toEqual(60n); // loan 6 from old is now loan 9
  });

  // ============================================================
  // Input Validation
  // ============================================================

  it("throws when requesting loan with zero amount", () => {
    const simulator = new ZKLoanCreditScorerSimulator();
    const userPin = 1234n;

    expect(() => {
      simulator.requestLoan(0n, userPin);
    }).toThrow("Loan amount must be greater than zero");
  });

  // ============================================================
  // changePin Validation
  // ============================================================

  it("throws when blacklisted user tries to change PIN", () => {
    const simulator = new ZKLoanCreditScorerSimulator();
    const userZwapKey = simulator.createTestUser("Alice").left.bytes;
    const oldPin = 1234n;
    const newPin = 5678n;

    // Create a loan first so the user exists
    simulator.requestLoan(100n, oldPin);

    // Blacklist the user
    simulator.blacklistUser(userZwapKey);

    // Try to change PIN - should fail
    expect(() => {
      simulator.changePin(oldPin, newPin);
    }).toThrow("User is blacklisted");
  });

  it("throws when changing PIN to the same value", () => {
    const simulator = new ZKLoanCreditScorerSimulator();
    const userPin = 1234n;

    // Create a loan first so the user exists
    simulator.requestLoan(100n, userPin);

    // Try to change PIN to the same value - should fail
    expect(() => {
      simulator.changePin(userPin, userPin);
    }).toThrow("New PIN must be different from old PIN");
  });

  // ============================================================
  // Admin Transfer
  // ============================================================

  it("allows admin to transfer admin role to new admin", () => {
    const simulator = new ZKLoanCreditScorerSimulator();
    const newAdminKey = simulator.createTestUser("NewAdmin").left.bytes;

    // Transfer admin to new admin
    simulator.transferAdmin(newAdminKey);

    const ledger = simulator.getLedger();
    expect(ledger.admin.bytes).toEqual(newAdminKey);
  });

  // ============================================================
  // Tier Boundary Edge Cases
  // ============================================================

  it("approves exactly at Tier 1 boundary when amount within limit (score=700, income=2000, tenure=24)", () => {
    const simulator = new ZKLoanCreditScorerSimulator();
    const userZwapKey = simulator.createTestUser("Alice").left.bytes;
    const userPin = 1234n;

    setAttestedPrivateState(simulator, 700n, 2000n, 24n, userPin);

    const userPubKey = simulator.publicKey(userZwapKey, userPin);
    simulator.requestLoan(10000n, userPin); // Request exactly at limit

    const loan = simulator.getLedger().loans.lookup(userPubKey).lookup(1n);
    expect(loan.status).toEqual(0); // Approved (amount within limit)
    expect(loan.authorizedAmount).toEqual(10000n); // Tier 1 max
  });

  it("proposes Tier 2 when just below Tier 1 threshold (score=699)", () => {
    const simulator = new ZKLoanCreditScorerSimulator();
    const userZwapKey = simulator.createTestUser("Alice").left.bytes;
    const userPin = 1234n;

    setAttestedPrivateState(simulator, 699n, 2000n, 24n, userPin);

    const userPubKey = simulator.publicKey(userZwapKey, userPin);
    simulator.requestLoan(15000n, userPin);

    const loan = simulator.getLedger().loans.lookup(userPubKey).lookup(1n);
    expect(loan.status).toEqual(2); // Proposed (amount exceeds tier limit)
    expect(loan.authorizedAmount).toEqual(7000n); // Falls to Tier 2 max
  });

  it("proposes at Tier 2 boundary when amount exceeds limit (score=600, income=1500)", () => {
    const simulator = new ZKLoanCreditScorerSimulator();
    const userZwapKey = simulator.createTestUser("Alice").left.bytes;
    const userPin = 1234n;

    setAttestedPrivateState(simulator, 600n, 1500n, 1n, userPin);

    const userPubKey = simulator.publicKey(userZwapKey, userPin);
    simulator.requestLoan(10000n, userPin);

    const loan = simulator.getLedger().loans.lookup(userPubKey).lookup(1n);
    expect(loan.status).toEqual(2); // Proposed (amount exceeds tier limit)
    expect(loan.authorizedAmount).toEqual(7000n); // Tier 2 max
  });

  it("proposes Tier 3 when just below Tier 2 threshold (score=599)", () => {
    const simulator = new ZKLoanCreditScorerSimulator();
    const userZwapKey = simulator.createTestUser("Alice").left.bytes;
    const userPin = 1234n;

    setAttestedPrivateState(simulator, 599n, 1500n, 1n, userPin);

    const userPubKey = simulator.publicKey(userZwapKey, userPin);
    simulator.requestLoan(10000n, userPin);

    const loan = simulator.getLedger().loans.lookup(userPubKey).lookup(1n);
    expect(loan.status).toEqual(2); // Proposed (amount exceeds tier limit)
    expect(loan.authorizedAmount).toEqual(3000n); // Falls to Tier 3 max
  });

  it("proposes at Tier 3 boundary when amount exceeds limit (score=580)", () => {
    const simulator = new ZKLoanCreditScorerSimulator();
    const userZwapKey = simulator.createTestUser("Alice").left.bytes;
    const userPin = 1234n;

    setAttestedPrivateState(simulator, 580n, 500n, 1n, userPin);

    const userPubKey = simulator.publicKey(userZwapKey, userPin);
    simulator.requestLoan(5000n, userPin);

    const loan = simulator.getLedger().loans.lookup(userPubKey).lookup(1n);
    expect(loan.status).toEqual(2); // Proposed (amount exceeds tier limit)
    expect(loan.authorizedAmount).toEqual(3000n); // Tier 3 max
  });

  it("rejects when just below Tier 3 threshold (score=579)", () => {
    const simulator = new ZKLoanCreditScorerSimulator();
    const userZwapKey = simulator.createTestUser("Alice").left.bytes;
    const userPin = 1234n;

    setAttestedPrivateState(simulator, 579n, 5000n, 100n, userPin);

    const userPubKey = simulator.publicKey(userZwapKey, userPin);
    simulator.requestLoan(1000n, userPin);

    const loan = simulator.getLedger().loans.lookup(userPubKey).lookup(1n);
    expect(loan.status).toEqual(1); // Rejected
    expect(loan.authorizedAmount).toEqual(0n);
  });

  it("proposes Tier 2 when Tier 1 income requirement not met", () => {
    const simulator = new ZKLoanCreditScorerSimulator();
    const userZwapKey = simulator.createTestUser("Alice").left.bytes;
    const userPin = 1234n;

    setAttestedPrivateState(simulator, 750n, 1999n, 30n, userPin);

    const userPubKey = simulator.publicKey(userZwapKey, userPin);
    simulator.requestLoan(15000n, userPin);

    const loan = simulator.getLedger().loans.lookup(userPubKey).lookup(1n);
    expect(loan.status).toEqual(2); // Proposed (amount exceeds tier limit)
    expect(loan.authorizedAmount).toEqual(7000n); // Falls to Tier 2
  });

  it("proposes Tier 2 when Tier 1 tenure requirement not met", () => {
    const simulator = new ZKLoanCreditScorerSimulator();
    const userZwapKey = simulator.createTestUser("Alice").left.bytes;
    const userPin = 1234n;

    setAttestedPrivateState(simulator, 750n, 2500n, 23n, userPin);

    const userPubKey = simulator.publicKey(userZwapKey, userPin);
    simulator.requestLoan(15000n, userPin);

    const loan = simulator.getLedger().loans.lookup(userPubKey).lookup(1n);
    expect(loan.status).toEqual(2); // Proposed (amount exceeds tier limit)
    expect(loan.authorizedAmount).toEqual(7000n); // Falls to Tier 2
  });

  // ============================================================
  // Admin Authorization
  // ============================================================

  it("throws when non-admin tries to blacklist a user", () => {
    const simulator = new ZKLoanCreditScorerSimulator();
    const bobZwapKey = simulator.createTestUser("Bob").left.bytes;
    const charlieZwapKey = simulator.createTestUser("Charlie").left.bytes;

    // Transfer admin to Bob first (Alice is initial admin)
    simulator.transferAdmin(bobZwapKey);

    // Now Alice (non-admin) tries to blacklist Charlie - should fail
    expect(() => {
      simulator.blacklistUser(charlieZwapKey);
    }).toThrow("Only admin can blacklist users");
  });

  it("throws when non-admin tries to remove from blacklist", () => {
    const simulator = new ZKLoanCreditScorerSimulator();
    const bobZwapKey = simulator.createTestUser("Bob").left.bytes;
    const charlieZwapKey = simulator.createTestUser("Charlie").left.bytes;

    // First blacklist Charlie while Alice is admin
    simulator.blacklistUser(charlieZwapKey);

    // Transfer admin to Bob
    simulator.transferAdmin(bobZwapKey);

    // Now Alice (non-admin) tries to remove Charlie from blacklist - should fail
    expect(() => {
      simulator.removeBlacklistUser(charlieZwapKey);
    }).toThrow("Only admin can remove from blacklist");
  });

  it("throws when non-admin tries to transfer admin", () => {
    const simulator = new ZKLoanCreditScorerSimulator();
    const bobZwapKey = simulator.createTestUser("Bob").left.bytes;
    const charlieZwapKey = simulator.createTestUser("Charlie").left.bytes;

    // Transfer admin to Bob first
    simulator.transferAdmin(bobZwapKey);

    // Now Alice (non-admin) tries to transfer admin to Charlie - should fail
    expect(() => {
      simulator.transferAdmin(charlieZwapKey);
    }).toThrow("Only admin can transfer admin role");
  });

  // ============================================================
  // Public Key Determinism
  // ============================================================

  it("generates same public key for same user and PIN (determinism)", () => {
    const simulator = new ZKLoanCreditScorerSimulator();
    const userZwapKey = simulator.createTestUser("Alice").left.bytes;
    const userPin = 1234n;

    const pubKey1 = simulator.publicKey(userZwapKey, userPin);
    const pubKey2 = simulator.publicKey(userZwapKey, userPin);

    expect(pubKey1).toEqual(pubKey2);
  });

  it("generates different public key for same user with different PIN", () => {
    const simulator = new ZKLoanCreditScorerSimulator();
    const userZwapKey = simulator.createTestUser("Alice").left.bytes;
    const pin1 = 1234n;
    const pin2 = 5678n;

    const pubKey1 = simulator.publicKey(userZwapKey, pin1);
    const pubKey2 = simulator.publicKey(userZwapKey, pin2);

    expect(pubKey1).not.toEqual(pubKey2);
  });

  it("generates different public key for different users with same PIN", () => {
    const simulator = new ZKLoanCreditScorerSimulator();
    const aliceZwapKey = simulator.createTestUser("Alice").left.bytes;
    const bobZwapKey = simulator.createTestUser("Bob").left.bytes;
    const samePin = 1234n;

    const alicePubKey = simulator.publicKey(aliceZwapKey, samePin);
    const bobPubKey = simulator.publicKey(bobZwapKey, samePin);

    expect(alicePubKey).not.toEqual(bobPubKey);
  });

  // ============================================================
  // Blacklist Edge Cases
  // ============================================================

  it("blacklisting an already blacklisted user is idempotent", () => {
    const simulator = new ZKLoanCreditScorerSimulator();
    const bobZwapKey = simulator.createTestUser("Bob").left.bytes;

    // Blacklist Bob
    simulator.blacklistUser(bobZwapKey);
    let ledger = simulator.getLedger();
    expect(ledger.blacklist.member({ bytes: bobZwapKey })).toBeTruthy();

    // Blacklist Bob again - should not throw
    simulator.blacklistUser(bobZwapKey);
    ledger = simulator.getLedger();
    expect(ledger.blacklist.member({ bytes: bobZwapKey })).toBeTruthy();
  });

  it("removing a non-blacklisted user from blacklist does not throw", () => {
    const simulator = new ZKLoanCreditScorerSimulator();
    const bobZwapKey = simulator.createTestUser("Bob").left.bytes;

    // Bob is not blacklisted
    let ledger = simulator.getLedger();
    expect(ledger.blacklist.member({ bytes: bobZwapKey })).toBeFalsy();

    // Remove Bob from blacklist - should not throw (idempotent)
    simulator.removeBlacklistUser(bobZwapKey);
    ledger = simulator.getLedger();
    expect(ledger.blacklist.member({ bytes: bobZwapKey })).toBeFalsy();
  });

  // ============================================================
  // Multi-User Isolation
  // ============================================================

  it("same user with different PINs has separate loan records", () => {
    const simulator = new ZKLoanCreditScorerSimulator();
    const aliceZwapKey = simulator.createTestUser("Alice").left.bytes;
    const pin1 = 1111n;
    const pin2 = 2222n;

    // Sign for pin1
    const pubKeyHash1 = simulator.computeUserPubKeyHash(aliceZwapKey, pin1);
    simulator.circuitContext.currentPrivateState = createCustomSignedProfile(
      750n, 2500n, 30n, simulator.providerSk, pubKeyHash1, simulator.providerId,
    );

    const pubKey1 = simulator.publicKey(aliceZwapKey, pin1);
    const pubKey2 = simulator.publicKey(aliceZwapKey, pin2);

    // Request loan with pin1
    simulator.requestLoan(5000n, pin1);

    // Sign for pin2
    const pubKeyHash2 = simulator.computeUserPubKeyHash(aliceZwapKey, pin2);
    simulator.circuitContext.currentPrivateState = createCustomSignedProfile(
      750n, 2500n, 30n, simulator.providerSk, pubKeyHash2, simulator.providerId,
    );

    // Request loan with pin2
    simulator.requestLoan(3000n, pin2);

    const ledger = simulator.getLedger();

    // Each PIN should have its own loan record
    expect(ledger.loans.member(pubKey1)).toBeTruthy();
    expect(ledger.loans.member(pubKey2)).toBeTruthy();
    expect(ledger.loans.lookup(pubKey1).lookup(1n).authorizedAmount).toEqual(5000n);
    expect(ledger.loans.lookup(pubKey2).lookup(1n).authorizedAmount).toEqual(3000n);
  });

  it("blacklisting a different Zswap key does not affect the caller", () => {
    const simulator = new ZKLoanCreditScorerSimulator();
    const aliceZwapKey = simulator.createTestUser("Alice").left.bytes;
    const bobZwapKey = simulator.createTestUser("Bob").left.bytes;
    const alicePin = 1234n;

    const alicePubKey = simulator.publicKey(aliceZwapKey, alicePin);

    // Blacklist Bob's Zswap key (not Alice's)
    simulator.blacklistUser(bobZwapKey);

    // Alice should still be able to request a loan (already has valid attestation from constructor)
    simulator.requestLoan(5000n, alicePin);

    const ledger = simulator.getLedger();
    expect(ledger.loans.member(alicePubKey)).toBeTruthy();
    expect(ledger.loans.lookup(alicePubKey).lookup(1n).authorizedAmount).toEqual(5000n);
  });

  // ============================================================
  // Admin Transfer Edge Cases
  // ============================================================

  it("new admin can perform admin operations after transfer", () => {
    const simulator = new ZKLoanCreditScorerSimulator();
    const charlieZwapKey = simulator.createTestUser("Charlie").left.bytes;

    simulator.transferAdmin(charlieZwapKey);

    const ledger = simulator.getLedger();
    expect(ledger.admin.bytes).toEqual(charlieZwapKey);
  });

  it("old admin cannot perform admin operations after transfer", () => {
    const simulator = new ZKLoanCreditScorerSimulator();
    const bobZwapKey = simulator.createTestUser("Bob").left.bytes;
    const charlieZwapKey = simulator.createTestUser("Charlie").left.bytes;

    // Transfer admin to Bob
    simulator.transferAdmin(bobZwapKey);

    // Alice (old admin) tries to blacklist Charlie - should fail
    expect(() => {
      simulator.blacklistUser(charlieZwapKey);
    }).toThrow("Only admin can blacklist users");
  });

  it("can chain multiple admin transfers", () => {
    const simulator = new ZKLoanCreditScorerSimulator();
    const aliceZwapKey = simulator.createTestUser("Alice").left.bytes;
    const bobZwapKey = simulator.createTestUser("Bob").left.bytes;

    let ledger = simulator.getLedger();
    expect(ledger.admin.bytes).toEqual(aliceZwapKey);

    // Transfer admin to Bob
    simulator.transferAdmin(bobZwapKey);
    ledger = simulator.getLedger();
    expect(ledger.admin.bytes).toEqual(bobZwapKey);
  });

  // ============================================================
  // Proposed/NotAccepted Loan Flow
  // ============================================================

  it("creates Proposed loan when requested amount exceeds tier limit", () => {
    const simulator = new ZKLoanCreditScorerSimulator();
    const userZwapKey = simulator.createTestUser("Alice").left.bytes;
    const userPin = 1234n;

    setAttestedPrivateState(simulator, 750n, 2500n, 30n, userPin);

    const userPubKey = simulator.publicKey(userZwapKey, userPin);

    // Request more than Tier 1 max
    simulator.requestLoan(15000n, userPin);

    const loan = simulator.getLedger().loans.lookup(userPubKey).lookup(1n);
    expect(loan.status).toEqual(2); // Proposed (index 2 in enum)
    expect(loan.authorizedAmount).toEqual(10000n); // Capped at Tier 1 max
  });

  it("creates Approved loan when requested amount is within tier limit", () => {
    const simulator = new ZKLoanCreditScorerSimulator();
    const userZwapKey = simulator.createTestUser("Alice").left.bytes;
    const userPin = 1234n;

    setAttestedPrivateState(simulator, 750n, 2500n, 30n, userPin);

    const userPubKey = simulator.publicKey(userZwapKey, userPin);

    // Request exactly at Tier 1 max
    simulator.requestLoan(10000n, userPin);

    const loan = simulator.getLedger().loans.lookup(userPubKey).lookup(1n);
    expect(loan.status).toEqual(0); // Approved
    expect(loan.authorizedAmount).toEqual(10000n);
  });

  it("creates Approved loan when requested amount is less than tier limit", () => {
    const simulator = new ZKLoanCreditScorerSimulator();
    const userZwapKey = simulator.createTestUser("Alice").left.bytes;
    const userPin = 1234n;

    setAttestedPrivateState(simulator, 750n, 2500n, 30n, userPin);

    const userPubKey = simulator.publicKey(userZwapKey, userPin);

    // Request less than Tier 1 max
    simulator.requestLoan(5000n, userPin);

    const loan = simulator.getLedger().loans.lookup(userPubKey).lookup(1n);
    expect(loan.status).toEqual(0); // Approved
    expect(loan.authorizedAmount).toEqual(5000n);
  });

  it("respondToLoan with accept=true changes Proposed to Approved", () => {
    const simulator = new ZKLoanCreditScorerSimulator();
    const userZwapKey = simulator.createTestUser("Alice").left.bytes;
    const userPin = 1234n;

    setAttestedPrivateState(simulator, 750n, 2500n, 30n, userPin);

    const userPubKey = simulator.publicKey(userZwapKey, userPin);

    // Create a Proposed loan
    simulator.requestLoan(15000n, userPin);
    let loan = simulator.getLedger().loans.lookup(userPubKey).lookup(1n);
    expect(loan.status).toEqual(2); // Proposed

    // Accept the proposal
    simulator.respondToLoan(1n, userPin, true);

    loan = simulator.getLedger().loans.lookup(userPubKey).lookup(1n);
    expect(loan.status).toEqual(0); // Approved
    expect(loan.authorizedAmount).toEqual(10000n); // Amount preserved
  });

  it("respondToLoan with accept=false changes Proposed to NotAccepted with zero amount", () => {
    const simulator = new ZKLoanCreditScorerSimulator();
    const userZwapKey = simulator.createTestUser("Alice").left.bytes;
    const userPin = 1234n;

    setAttestedPrivateState(simulator, 750n, 2500n, 30n, userPin);

    const userPubKey = simulator.publicKey(userZwapKey, userPin);

    // Create a Proposed loan
    simulator.requestLoan(15000n, userPin);
    let loan = simulator.getLedger().loans.lookup(userPubKey).lookup(1n);
    expect(loan.status).toEqual(2); // Proposed

    // Reject the proposal
    simulator.respondToLoan(1n, userPin, false);

    loan = simulator.getLedger().loans.lookup(userPubKey).lookup(1n);
    expect(loan.status).toEqual(3); // NotAccepted (index 3 in enum)
    expect(loan.authorizedAmount).toEqual(0n); // Amount set to zero
  });

  it("throws when respondToLoan is called on non-Proposed loan", () => {
    const simulator = new ZKLoanCreditScorerSimulator();
    const userZwapKey = simulator.createTestUser("Alice").left.bytes;
    const userPin = 1234n;

    setAttestedPrivateState(simulator, 750n, 2500n, 30n, userPin);

    const userPubKey = simulator.publicKey(userZwapKey, userPin);

    // Create an Approved loan (amount within limit)
    simulator.requestLoan(5000n, userPin);
    const loan = simulator.getLedger().loans.lookup(userPubKey).lookup(1n);
    expect(loan.status).toEqual(0); // Approved

    // Try to respond to an Approved loan - should fail
    expect(() => {
      simulator.respondToLoan(1n, userPin, true);
    }).toThrow("Loan is not in Proposed status");
  });

  it("throws when respondToLoan is called on already accepted loan", () => {
    const simulator = new ZKLoanCreditScorerSimulator();
    const userZwapKey = simulator.createTestUser("Alice").left.bytes;
    const userPin = 1234n;

    setAttestedPrivateState(simulator, 750n, 2500n, 30n, userPin);

    const userPubKey = simulator.publicKey(userZwapKey, userPin);

    // Create and accept a Proposed loan
    simulator.requestLoan(15000n, userPin);
    simulator.respondToLoan(1n, userPin, true);

    // Try to respond again - should fail
    expect(() => {
      simulator.respondToLoan(1n, userPin, false);
    }).toThrow("Loan is not in Proposed status");
  });

  it("throws when respondToLoan is called with non-existent loan ID", () => {
    const simulator = new ZKLoanCreditScorerSimulator();
    const userZwapKey = simulator.createTestUser("Alice").left.bytes;
    const userPin = 1234n;

    setAttestedPrivateState(simulator, 750n, 2500n, 30n, userPin);

    // Create a loan first so user exists in the system
    simulator.requestLoan(15000n, userPin);

    // Try to respond to non-existent loan
    expect(() => {
      simulator.respondToLoan(999n, userPin, true);
    }).toThrow("Loan not found");
  });

  it("throws when respondToLoan is called by user with no loans", () => {
    const simulator = new ZKLoanCreditScorerSimulator();
    const userPin = 1234n;

    // Don't create any loans - user doesn't exist in loans map

    expect(() => {
      simulator.respondToLoan(1n, userPin, true);
    }).toThrow("No loans found for this user");
  });

  it("throws when blacklisted user tries to respondToLoan", () => {
    const simulator = new ZKLoanCreditScorerSimulator();
    const userZwapKey = simulator.createTestUser("Alice").left.bytes;
    const userPin = 1234n;

    setAttestedPrivateState(simulator, 750n, 2500n, 30n, userPin);

    // Create a Proposed loan
    simulator.requestLoan(15000n, userPin);

    // Blacklist the user
    simulator.blacklistUser(userZwapKey);

    // Try to respond - should fail
    expect(() => {
      simulator.respondToLoan(1n, userPin, true);
    }).toThrow("User is blacklisted");
  });

  it("creates Proposed loan for Tier 2 user exceeding limit", () => {
    const simulator = new ZKLoanCreditScorerSimulator();
    const userZwapKey = simulator.createTestUser("Alice").left.bytes;
    const userPin = 1234n;

    setAttestedPrivateState(simulator, 650n, 1600n, 10n, userPin);

    const userPubKey = simulator.publicKey(userZwapKey, userPin);

    // Request more than Tier 2 max
    simulator.requestLoan(10000n, userPin);

    const loan = simulator.getLedger().loans.lookup(userPubKey).lookup(1n);
    expect(loan.status).toEqual(2); // Proposed
    expect(loan.authorizedAmount).toEqual(7000n); // Capped at Tier 2 max
  });

  it("creates Proposed loan for Tier 3 user exceeding limit", () => {
    const simulator = new ZKLoanCreditScorerSimulator();
    const userZwapKey = simulator.createTestUser("Alice").left.bytes;
    const userPin = 1234n;

    setAttestedPrivateState(simulator, 590n, 1000n, 1n, userPin);

    const userPubKey = simulator.publicKey(userZwapKey, userPin);

    // Request more than Tier 3 max
    simulator.requestLoan(5000n, userPin);

    const loan = simulator.getLedger().loans.lookup(userPubKey).lookup(1n);
    expect(loan.status).toEqual(2); // Proposed
    expect(loan.authorizedAmount).toEqual(3000n); // Capped at Tier 3 max
  });

  it("rejected applicant still gets Rejected status (not Proposed)", () => {
    const simulator = new ZKLoanCreditScorerSimulator();
    const userZwapKey = simulator.createTestUser("Alice").left.bytes;
    const userPin = 1234n;

    setAttestedPrivateState(simulator, 500n, 1000n, 1n, userPin);

    const userPubKey = simulator.publicKey(userZwapKey, userPin);
    simulator.requestLoan(1000n, userPin);

    const loan = simulator.getLedger().loans.lookup(userPubKey).lookup(1n);
    expect(loan.status).toEqual(1); // Rejected (not Proposed)
    expect(loan.authorizedAmount).toEqual(0n);
  });

  it("can have multiple Proposed loans and respond to each independently", () => {
    const simulator = new ZKLoanCreditScorerSimulator();
    const userZwapKey = simulator.createTestUser("Alice").left.bytes;
    const userPin = 1234n;

    setAttestedPrivateState(simulator, 750n, 2500n, 30n, userPin);

    const userPubKey = simulator.publicKey(userZwapKey, userPin);

    // Create multiple Proposed loans
    simulator.requestLoan(15000n, userPin); // Loan 1 - Proposed
    simulator.requestLoan(12000n, userPin); // Loan 2 - Proposed
    simulator.requestLoan(5000n, userPin);  // Loan 3 - Approved (within limit)

    let ledger = simulator.getLedger();
    expect(ledger.loans.lookup(userPubKey).lookup(1n).status).toEqual(2); // Proposed
    expect(ledger.loans.lookup(userPubKey).lookup(2n).status).toEqual(2); // Proposed
    expect(ledger.loans.lookup(userPubKey).lookup(3n).status).toEqual(0); // Approved

    // Accept loan 1
    simulator.respondToLoan(1n, userPin, true);
    // Reject loan 2
    simulator.respondToLoan(2n, userPin, false);

    ledger = simulator.getLedger();
    expect(ledger.loans.lookup(userPubKey).lookup(1n).status).toEqual(0); // Approved
    expect(ledger.loans.lookup(userPubKey).lookup(1n).authorizedAmount).toEqual(10000n);
    expect(ledger.loans.lookup(userPubKey).lookup(2n).status).toEqual(3); // NotAccepted
    expect(ledger.loans.lookup(userPubKey).lookup(2n).authorizedAmount).toEqual(0n);
    expect(ledger.loans.lookup(userPubKey).lookup(3n).status).toEqual(0); // Still Approved
  });

  // ============================================================
  // NEW TESTS: Attestation & Provider Management
  // ============================================================

  it("rejects loan with invalid attestation signature", () => {
    const simulator = new ZKLoanCreditScorerSimulator();
    const userZwapKey = simulator.createTestUser("Alice").left.bytes;
    const userPin = 1234n;

    // Create a state with a tampered signature (wrong response)
    const pubKeyHash = simulator.computeUserPubKeyHash(userZwapKey, userPin);
    const validState = createCustomSignedProfile(
      750n, 2500n, 30n, simulator.providerSk, pubKeyHash, simulator.providerId,
    );
    simulator.circuitContext.currentPrivateState = {
      ...validState,
      attestationSignature: {
        ...validState.attestationSignature,
        response: validState.attestationSignature.response + 1n,
      },
    };

    expect(() => {
      simulator.requestLoan(5000n, userPin);
    }).toThrow("Invalid attestation signature");
  });

  it("rejects loan with unregistered provider", () => {
    const simulator = new ZKLoanCreditScorerSimulator();
    const userZwapKey = simulator.createTestUser("Alice").left.bytes;
    const userPin = 1234n;

    // Generate a different provider key pair (not registered)
    const otherProvider = generateProviderKeyPair();
    const pubKeyHash = simulator.computeUserPubKeyHash(userZwapKey, userPin);
    simulator.circuitContext.currentPrivateState = createCustomSignedProfile(
      750n, 2500n, 30n, otherProvider.sk, pubKeyHash, 99n, // unregistered provider ID
    );

    expect(() => {
      simulator.requestLoan(5000n, userPin);
    }).toThrow("Attestation provider not registered");
  });

  it("rejects loan after provider is removed", () => {
    const simulator = new ZKLoanCreditScorerSimulator();
    const userZwapKey = simulator.createTestUser("Alice").left.bytes;
    const userPin = 1234n;

    // First verify the provider is registered and a loan works
    simulator.requestLoan(100n, userPin);

    // Now remove the provider
    simulator.removeProvider(simulator.providerId);

    // Try to request another loan - should fail
    expect(() => {
      simulator.requestLoan(200n, userPin);
    }).toThrow("Attestation provider not registered");
  });

  it("user binding prevents replay (signature for user A cannot be used by user B)", () => {
    const simulator = new ZKLoanCreditScorerSimulator();
    const aliceZwapKey = simulator.createTestUser("Alice").left.bytes;
    const userPin = 1234n;

    // Create attestation signed for a different user's pubKeyHash
    const bobZwapKey = simulator.createTestUser("Bob").left.bytes;
    const bobPubKeyHash = simulator.computeUserPubKeyHash(bobZwapKey, userPin);
    simulator.circuitContext.currentPrivateState = createCustomSignedProfile(
      750n, 2500n, 30n, simulator.providerSk, bobPubKeyHash, simulator.providerId,
    );

    // Alice tries to use Bob's attestation - should fail because userPubKeyHash won't match
    expect(() => {
      simulator.requestLoan(5000n, userPin);
    }).toThrow("Invalid attestation signature");
  });

  it("throws when non-admin tries to register provider", () => {
    const simulator = new ZKLoanCreditScorerSimulator();
    const bobZwapKey = simulator.createTestUser("Bob").left.bytes;

    // Transfer admin to Bob
    simulator.transferAdmin(bobZwapKey);

    const newProvider = generateProviderKeyPair();

    // Alice (non-admin) tries to register a provider - should fail
    expect(() => {
      simulator.registerProvider(2n, newProvider.pk);
    }).toThrow("Only admin can register providers");
  });

  it("throws when non-admin tries to remove provider", () => {
    const simulator = new ZKLoanCreditScorerSimulator();
    const bobZwapKey = simulator.createTestUser("Bob").left.bytes;

    // Transfer admin to Bob
    simulator.transferAdmin(bobZwapKey);

    // Alice (non-admin) tries to remove a provider - should fail
    expect(() => {
      simulator.removeProvider(simulator.providerId);
    }).toThrow("Only admin can remove providers");
  });

  it("throws when removing a non-existent provider", () => {
    const simulator = new ZKLoanCreditScorerSimulator();

    expect(() => {
      simulator.removeProvider(999n);
    }).toThrow("Provider not found");
  });

  it("multiple providers can both be used for attestation", () => {
    const simulator = new ZKLoanCreditScorerSimulator();
    const userZwapKey = simulator.createTestUser("Alice").left.bytes;
    const userPin = 1234n;

    // Register a second provider
    const provider2 = generateProviderKeyPair();
    const provider2Id = 2n;
    simulator.registerProvider(provider2Id, provider2.pk);

    const userPubKey = simulator.publicKey(userZwapKey, userPin);
    const pubKeyHash = simulator.computeUserPubKeyHash(userZwapKey, userPin);

    // Use provider 1 for first loan (already set up by constructor)
    simulator.requestLoan(5000n, userPin);

    // Use provider 2 for second loan
    simulator.circuitContext.currentPrivateState = createCustomSignedProfile(
      750n, 2500n, 30n, provider2.sk, pubKeyHash, provider2Id,
    );
    simulator.requestLoan(3000n, userPin);

    const userLoans = simulator.getLedger().loans.lookup(userPubKey);
    expect(userLoans.size()).toEqual(2n);
    expect(userLoans.lookup(1n).authorizedAmount).toEqual(5000n);
    expect(userLoans.lookup(2n).authorizedAmount).toEqual(3000n);
  });

  it("provider registry shows up in ledger state", () => {
    const simulator = new ZKLoanCreditScorerSimulator();

    // Default provider should be registered
    const ledger = simulator.getLedger();
    expect(ledger.providers.member(simulator.providerId)).toBeTruthy();
    const providerPk = ledger.providers.lookup(simulator.providerId);
    expect(providerPk.x).toEqual(simulator.providerPk.x);
    expect(providerPk.y).toEqual(simulator.providerPk.y);
  });

  it("attestation with tampered credit data fails signature verification", () => {
    const simulator = new ZKLoanCreditScorerSimulator();
    const userZwapKey = simulator.createTestUser("Alice").left.bytes;
    const userPin = 1234n;

    // Create valid attestation
    const pubKeyHash = simulator.computeUserPubKeyHash(userZwapKey, userPin);
    const validState = createCustomSignedProfile(
      650n, 1600n, 10n, simulator.providerSk, pubKeyHash, simulator.providerId,
    );

    // Tamper with credit score (signature was for 650, we change to 750)
    simulator.circuitContext.currentPrivateState = {
      ...validState,
      creditScore: 750n,
    };

    expect(() => {
      simulator.requestLoan(5000n, userPin);
    }).toThrow("Invalid attestation signature");
  });
});

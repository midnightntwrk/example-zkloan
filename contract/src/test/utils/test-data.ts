// This file is part of the ZKLoan Credit Scorer example.
// Copyright (C) 2025 Midnight Foundation
// SPDX-License-Identifier: Apache-2.0

import { type ZKLoanCreditScorerPrivateState } from '../../witnesses.js';
import { pureCircuits, type SchnorrSignature } from '../../managed/zkloan-credit-scorer/contract/index.js';
import { ecMulGenerator, addField, mulField, type NativePoint } from '@midnight-ntwrk/compact-runtime';
import * as crypto from 'crypto';

export const userProfiles = [
  {
    "applicantId": "user-001",
    "creditScore": 720,
    "monthlyIncome": 2500,
    "monthsAsCustomer": 24
  },
  {
    "applicantId": "user-002",
    "creditScore": 650,
    "monthlyIncome": 1800,
    "monthsAsCustomer": 11
  },
  {
    "applicantId": "user-003",
    "creditScore": 580,
    "monthlyIncome": 2200,
    "monthsAsCustomer": 36
  },
  {
    "applicantId": "user-004",
    "creditScore": 710,
    "monthlyIncome": 1900,
    "monthsAsCustomer": 5
  },
  {
    "applicantId": "user-005",
    "creditScore": 520,
    "monthlyIncome": 3000,
    "monthsAsCustomer": 48
  },
  {
    "applicantId": "user-006",
    "creditScore": 810,
    "monthlyIncome": 4500,
    "monthsAsCustomer": 60
  },
  {
    "applicantId": "user-007",
    "creditScore": 639,
    "monthlyIncome": 2100,
    "monthsAsCustomer": 18
  },
  {
    "applicantId": "user-008",
    "creditScore": 680,
    "monthlyIncome": 1450,
    "monthsAsCustomer": 30
  },
  {
    "applicantId": "user-009",
    "creditScore": 750,
    "monthlyIncome": 2100,
    "monthsAsCustomer": 23
  },
  {
    "applicantId": "user-010",
    "creditScore": 579,
    "monthlyIncome": 1900,
    "monthsAsCustomer": 12
  }
];

// Jubjub curve order for scalar field
const JUBJUB_ORDER = 6554484396890773809930967563523245729705921265872317281365359162392183254199n;

function randomScalar(): bigint {
  const bytes = crypto.randomBytes(32);
  let val = BigInt('0x' + bytes.toString('hex'));
  return val % JUBJUB_ORDER;
}

export function generateProviderKeyPair(): { sk: bigint; pk: NativePoint } {
  const sk = randomScalar();
  const pk = ecMulGenerator(sk);
  return { sk, pk };
}

const TWO_248 = 452312848583266388373324160190187140051835877600158453279131187530910662656n;

export function schnorrSign(
  sk: bigint,
  msg: bigint[],
): SchnorrSignature {
  const pk = ecMulGenerator(sk);
  const k = randomScalar();
  const R = ecMulGenerator(k);
  // pureCircuits.schnorrChallenge returns the full transientHash output.
  // The circuit truncates it to 248 bits (mod 2^248) before using in EC ops.
  const cFull = pureCircuits.schnorrChallenge(R.x, R.y, pk.x, pk.y, msg);
  const c = cFull % TWO_248;
  // Compute response: s = (k + c * sk) mod JUBJUB_ORDER
  // We must reduce mod JUBJUB_ORDER (not BLS12-381 Fr) because ecMulGenerator
  // requires scalars < JUBJUB_ORDER.
  const s = ((k + c * sk) % JUBJUB_ORDER + JUBJUB_ORDER) % JUBJUB_ORDER;
  return { announcement: R, response: s };
}

export function createSignedUserProfile(
  index: number,
  providerSk: bigint,
  userPubKeyHash: bigint,
  providerId: bigint = 1n,
): ZKLoanCreditScorerPrivateState {
  const profile = userProfiles[index];
  if (!profile) {
    throw new Error(`Index ${index} is out of bounds. Must be between 0 and ${userProfiles.length - 1}.`);
  }

  const msg: bigint[] = [
    BigInt(profile.creditScore),
    BigInt(profile.monthlyIncome),
    BigInt(profile.monthsAsCustomer),
    userPubKeyHash,
  ];

  const signature = schnorrSign(providerSk, msg);

  return {
    creditScore: BigInt(profile.creditScore),
    monthlyIncome: BigInt(profile.monthlyIncome),
    monthsAsCustomer: BigInt(profile.monthsAsCustomer),
    attestationSignature: signature,
    attestationProviderId: providerId,
  };
}

export function createCustomSignedProfile(
  creditScore: bigint,
  monthlyIncome: bigint,
  monthsAsCustomer: bigint,
  providerSk: bigint,
  userPubKeyHash: bigint,
  providerId: bigint = 1n,
): ZKLoanCreditScorerPrivateState {
  const msg: bigint[] = [creditScore, monthlyIncome, monthsAsCustomer, userPubKeyHash];
  const signature = schnorrSign(providerSk, msg);

  return {
    creditScore,
    monthlyIncome,
    monthsAsCustomer,
    attestationSignature: signature,
    attestationProviderId: providerId,
  };
}

export function getUserProfile(index?: number): ZKLoanCreditScorerPrivateState {
  let profile;
  if (index !== undefined) {
    if (index < 0 || index >= userProfiles.length) {
      throw new Error(`Index ${index} is out of bounds. Must be between 0 and ${userProfiles.length - 1}.`);
    }
    profile = userProfiles[index];
  } else {
    const randomIndex = Math.floor(Math.random() * userProfiles.length);
    profile = userProfiles[randomIndex];
  }
  return {
    creditScore: BigInt(profile.creditScore),
    monthlyIncome: BigInt(profile.monthlyIncome),
    monthsAsCustomer: BigInt(profile.monthsAsCustomer),
    attestationSignature: { announcement: { x: 0n, y: 0n }, response: 0n },
    attestationProviderId: 0n,
  };
}

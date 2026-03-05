# ZKLoan Credit Scorer - Project Guide

## Project Overview

The ZKLoan Credit Scorer is a privacy-preserving decentralized loan application DApp built on Midnight. It demonstrates how to:
1. Process sensitive financial data (credit scores, income) privately using ZK proofs
2. Store only non-sensitive outcomes (loan status, approved amounts) on the public ledger
3. Manage complex nested data structures (user loans) on-chain
4. Handle batched migrations for ledger items (PIN change)

---

## Project Structure

```
zkloan-credit-scorer/
├── contract/                          # Compact contract + TypeScript wrapper
│   ├── src/
│   │   ├── zkloan-credit-scorer.compact  # Main Compact contract
│   │   ├── index.ts                      # Re-exports contract + witnesses
│   │   ├── witnesses.ts                  # TypeScript witness implementations
│   │   ├── managed/                      # Compiler output (generated)
│   │   │   └── zkloan-credit-scorer/
│   │   │       ├── contract/index.cjs    # Generated JS implementation
│   │   │       ├── keys/                 # Proving/verifying keys
│   │   │       └── zkir/                 # ZK intermediate representation
│   │   └── test/
│   │       ├── zkloan-credit-scorer.test.ts      # Unit tests
│   │       ├── zkloan-credit-scorer.simulator.ts # Test harness
│   │       └── utils/address.ts                  # Test utilities
│   └── package.json
├── zkloan-credit-scorer-cli/          # DApp CLI implementation
│   ├── src/
│   │   ├── api.ts                     # Contract interaction API
│   │   ├── cli.ts                     # Interactive CLI
│   │   ├── common-types.ts            # TypeScript type definitions
│   │   ├── config.ts                  # Network configurations
│   │   ├── state.utils.ts             # User profile mock data
│   │   └── standalone.ts              # Local dev entry point
│   └── package.json
└── CLAUDE.md                          # Midnight/Compact reference
```

---

## Compact Contract Details

### File: `contract/src/zkloan-credit-scorer.compact`

**Language Version**: `pragma language_version 0.19`

### Types

```compact
export enum LoanStatus { Approved, Rejected }

export struct LoanApplication {
    authorizedAmount: Uint<16>;
    status: LoanStatus;
}

struct Applicant {  // Private, not exported
    creditScore: Uint<16>;
    monthlyIncome: Uint<16>;
    monthsAsCustomer: Uint<16>;
}
```

### Ledger State

| Variable | Type | Purpose |
|----------|------|---------|
| `blacklist` | `Set<ZswapCoinPublicKey>` | Blocked wallet addresses |
| `loans` | `Map<Bytes<32>, Map<Uint<16>, LoanApplication>>` | User → LoanId → Loan |
| `onGoingPinMigration` | `Map<Bytes<32>, Uint<16>>` | Tracks migration progress |
| `admin` | `ZswapCoinPublicKey` | Contract admin (set in constructor) |
| `usersCount` | `Counter` | User counter (unused currently) |

### Key Design: Nested Map for Loans

```compact
// Outer map: userPublicKey → inner map
// Inner map: loanId → LoanApplication
export ledger loans: Map<Bytes<32>, Map<Uint<16>, LoanApplication>>;
```

**Access Pattern**:
```compact
// Check if user exists
if (!loans.member(userPk)) {
    loans.insert(userPk, default<Map<Uint<16>, LoanApplication>>);
}
// Get user's loan count
const loanCount = loans.lookup(userPk).size();
// Add new loan
loans.lookup(userPk).insert(loanId, loan);
```

---

## Circuits Reference

### `requestLoan(amountRequested: Uint<16>, secretPin: Uint<16>): []`

**Entry point for loan applications.**

Flow:
1. Get user's Zswap public key via `ownPublicKey()`
2. Derive user-specific public key: `publicKey(zwapKey.bytes, pin)`
3. Check blacklist and migration status
4. Call `evaluateApplicant()` for private scoring
5. `disclose()` results and create loan record

```compact
export circuit requestLoan(amountRequested: Uint<16>, secretPin: Uint<16>): [] {
    const zwapPublicKey = ownPublicKey();
    const requesterPubKey = publicKey(zwapPublicKey.bytes, secretPin);

    assert(!blacklist.member(zwapPublicKey), "Requester is blacklisted");
    assert(!onGoingPinMigration.member(disclose(requesterPubKey)),
           "PIN migration is in progress for this user");

    const [topTierAmount, status] = evaluateApplicant();
    createLoan(disclose(requesterPubKey), amountRequested,
               disclose(topTierAmount), disclose(status));
    return [];
}
```

### `evaluateApplicant(): [Uint<16>, LoanStatus]`

**Private credit evaluation (runs off-chain).**

```compact
circuit evaluateApplicant(): [Uint<16>, LoanStatus] {
    const profile = getRequesterScoringWitness();  // Private data from witness

    // Tier 1: Best applicants - max $10,000
    if (profile.creditScore >= 700 &&
        profile.monthlyIncome >= 2000 &&
        profile.monthsAsCustomer >= 24) {
        return [10000, LoanStatus.Approved];
    }
    // Tier 2: Good applicants - max $7,000
    else if (profile.creditScore >= 600 && profile.monthlyIncome >= 1500) {
        return [7000, LoanStatus.Approved];
    }
    // Tier 3: Basic eligibility - max $3,000
    else if (profile.creditScore >= 580) {
        return [3000, LoanStatus.Approved];
    }
    // Rejected
    else {
        return [0, LoanStatus.Rejected];
    }
}
```

### `changePin(oldPin: Uint<16>, newPin: Uint<16>): []`

**Batched migration of loans to new PIN.**

Key constraints:
- Compact cannot iterate over variable-length collections
- Uses fixed batch size of 5 per transaction
- `onGoingPinMigration` tracks progress between calls

```compact
export circuit changePin(oldPin: Uint<16>, newPin: Uint<16>): [] {
    // ... setup ...

    for (const i of 0..5) {  // Fixed iteration count
        if (onGoingPinMigration.member(disclosedOldPk)) {
            const sourceId = (lastMigratedSourceId + i + 1) as Uint<16>;

            if (loans.lookup(disclosedOldPk).member(sourceId)) {
                // Migrate loan
                const loan = loans.lookup(disclosedOldPk).lookup(sourceId);
                loans.lookup(disclosedNewPk).insert(destinationId, disclose(loan));
                loans.lookup(disclosedOldPk).remove(sourceId);
                onGoingPinMigration.insert(disclosedOldPk, sourceId);
            } else {
                // Migration complete - cleanup
                onGoingPinMigration.remove(disclosedOldPk);
                if (loans.lookup(disclosedOldPk).size() == 0) {
                    loans.remove(disclosedOldPk);
                }
            }
        }
    }
    return [];
}
```

### `publicKey(sk: Bytes<32>, pin: Uint<16>): Bytes<32>`

**Deterministic public key derivation.**

```compact
export circuit publicKey(sk: Bytes<32>, pin: Uint<16>): Bytes<32> {
    const pinBytes = persistentHash<Uint<16>>(pin);
    return persistentHash<Vector<3, Bytes<32>>>([
        pad(32, "zk-credit-scorer:pk"),  // Domain separator
        pinBytes,
        sk
    ]);
}
```

### Admin Circuits

```compact
export circuit blacklistUser(account: ZswapCoinPublicKey): [] {
    assert(ownPublicKey() == admin, "Only admin can blacklist users");
    blacklist.insert(disclose(account));
    return [];
}

export circuit removeBlacklistUser(account: ZswapCoinPublicKey): [] {
    assert(ownPublicKey() == admin, "Only admin can blacklist users");
    blacklist.remove(disclose(account));
    return [];
}
```

---

## TypeScript Witness Implementation

### File: `contract/src/witnesses.ts`

```typescript
export type ZKLoanCreditScorerPrivateState = {
  creditScore: bigint;
  monthlyIncome: bigint;
  monthsAsCustomer: bigint;
};

export const witnesses = {
  getRequesterScoringWitness: ({
    privateState
  }: WitnessContext<Ledger, ZKLoanCreditScorerPrivateState>): [
    ZKLoanCreditScorerPrivateState,  // New private state
    ZKLoanCreditScorerPrivateState,  // Return value (Applicant struct)
  ] => [
    privateState,
    {
      creditScore: privateState.creditScore,
      monthlyIncome: privateState.monthlyIncome,
      monthsAsCustomer: privateState.monthsAsCustomer,
    },
  ],
};
```

---

## Testing

### Test Simulator Pattern

```typescript
// contract/src/test/zkloan-credit-scorer.simulator.ts
export class ZKLoanCreditScorerSimulator {
  readonly contract: Contract<ZKLoanCreditScorerPrivateState>;
  circuitContext: CircuitContext<ZKLoanCreditScorerPrivateState>;

  constructor() {
    this.contract = new Contract<ZKLoanCreditScorerPrivateState>(witnesses);
    const initialPrivateState = getUserProfile(0);  // Tier 1 user
    // ... initialize context
  }

  public requestLoan(amountRequested: bigint, secretPin: bigint): Ledger {
    this.circuitContext = this.contract.impureCircuits.requestLoan(
      this.circuitContext,
      amountRequested,
      secretPin
    ).context;
    return ledger(this.circuitContext.transactionContext.state);
  }

  // Similar wrappers for other circuits...
}
```

### Test Examples

```typescript
it("approves a Tier 1 loan and caps at the max amount", () => {
  const simulator = new ZKLoanCreditScorerSimulator();
  const userZwapKey = simulator.createTestUser("Alice").left.bytes;
  const userPin = 1234n;

  simulator.requestLoan(15000n, userPin);  // Request more than max

  const loan = simulator.getLedger()
    .loans.lookup(simulator.publicKey(userZwapKey, userPin))
    .lookup(1n);

  expect(loan.status).toEqual(0);  // LoanStatus.Approved
  expect(loan.authorizedAmount).toEqual(10000n);  // Capped at Tier 1 max
});

it("migrates multiple batches of loans correctly", () => {
  // Create 7 loans
  for (let i = 1; i <= 7; i++) {
    simulator.requestLoan(BigInt(i * 100), oldPin);
  }

  // Batch 1: Migrates loans 1-5
  simulator.changePin(oldPin, newPin);
  expect(ledger.onGoingPinMigration.lookup(oldPubKey)).toEqual(5n);

  // Batch 2: Migrates loans 6-7, finds 8-10 empty, finishes
  simulator.changePin(oldPin, newPin);
  expect(ledger.onGoingPinMigration.member(oldPubKey)).toBeFalsy();
});
```

---

## Commands

### Contract Package

```bash
cd contract

# Compile Compact contract (generates keys + JS implementation)
npm run compact

# Run tests only
npm test

# Compile and test
npm run test:compile

# Build TypeScript wrapper
npm run build

# Lint
npm run lint
```

### CLI Package

```bash
cd zkloan-credit-scorer-cli

# Run with local Docker environment
npm run standalone

# Run against testnet (local proof server)
npm run testnet-local

# Run against testnet (remote)
npm run testnet-remote

# Run API tests
npm run test-api

# Build
npm run build
```

---

## Mock User Profiles

### File: `zkloan-credit-scorer-cli/src/state.utils.ts`

| Index | Credit Score | Monthly Income | Months | Expected Tier |
|-------|--------------|----------------|--------|---------------|
| 0 | 720 | 2500 | 24 | Tier 1 ($10k) |
| 1 | 650 | 1800 | 11 | Tier 2 ($7k) |
| 2 | 580 | 2200 | 36 | Tier 3 ($3k) |
| 3 | 710 | 1900 | 5 | Tier 2 (fails Tier 1 income) |
| 4 | 520 | 3000 | 48 | Rejected |
| 5 | 810 | 4500 | 60 | Tier 1 |

```typescript
export function getUserProfile(index?: number): ZKLoanCreditScorerPrivateState {
  // Returns profile at index, or random if not specified
}
```

---

## Privacy Model

### What's Private (never on-chain):
- `creditScore`
- `monthlyIncome`
- `monthsAsCustomer`
- `secretPin` (hashed into public key)

### What's Public (on ledger):
- User's derived public key (`Bytes<32>`)
- Loan status (`LoanStatus.Approved` or `LoanStatus.Rejected`)
- Authorized amount
- Blacklist entries (ZswapCoinPublicKey)
- Admin address

### Privacy Leak Prevention:
1. **Always `disclose()` witness-derived data** before ledger ops
2. **Credit evaluation runs entirely off-chain** - only result is disclosed
3. **PIN is hashed** - raw PIN never stored or transmitted
4. **User identity is unlinkable** - changing PIN creates new identity

---

## Network Configurations

| Config | Indexer | Node | NetworkId |
|--------|---------|------|-----------|
| Standalone | localhost:8088 | localhost:9944 | Undeployed |
| TestnetLocal | localhost:8088 | localhost:9944 | TestNet |
| TestnetRemote | indexer.testnet-02.midnight.network | rpc.testnet-02.midnight.network | TestNet |

---

## Common Patterns in This Project

### 1. Access Control
```compact
assert(ownPublicKey() == admin, "Only admin can blacklist users");
```

### 2. Nested Map Initialization
```compact
if (!loans.member(requester)) {
    loans.insert(requester, default<Map<Uint<16>, LoanApplication>>);
}
```

### 3. Auto-Incrementing IDs
```compact
const totalLoans = loans.lookup(requester).size();
const loanNumber = (totalLoans + 1) as Uint<16>;
```

### 4. Blocking During Migration
```compact
assert(!onGoingPinMigration.member(userPk), "PIN migration in progress");
```

### 5. Fixed-Size Batch Processing
```compact
for (const i of 0..5) {  // Compile-time constant
    if (condition) { ... }
}
```

---

## Known Limitations

1. **CLI is partially scaffolded** - Based on counter example, needs full implementation for loan flows
2. **No UI** - CLI only
3. **Batch size is hardcoded** - 5 loans per `changePin` call
4. **No loan repayment tracking** - Simplified for demo purposes
5. **Single admin** - Set at deployment, cannot be transferred

---

## Dependencies

### Contract
- `@midnight-ntwrk/compact-runtime` - Runtime library for generated JS
- `vitest` - Testing framework

### CLI
- `@midnight-ntwrk/midnight-js-contracts` - Contract deployment/interaction
- `@midnight-ntwrk/wallet` - Wallet management
- `@midnight-ntwrk/wallet-api` - Wallet API
- `@midnight-ntwrk/midnight-js-http-client-proof-provider` - Proof server client
- `@midnight-ntwrk/midnight-js-indexer-public-data-provider` - Blockchain data
- `pino` - Logging
- `testcontainers` - Docker test environments

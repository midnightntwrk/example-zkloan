# Midnight SDK & Compact Language Reference

**Created:** December 23, 2025
**SDK Version:** 3.0.0-alpha.10
**Compact Language Version:** 0.19
**Compact Compiler Version:** 0.26.0

This document consolidates all critical learnings from the Midnight documentation, SDK release notes, and project-specific patterns.

---

## Table of Contents

1. [Midnight.js v3.0.0 Breaking Changes](#midnightjs-v300-breaking-changes)
2. [Compact Language Essentials](#compact-language-essentials)
3. [Ledger ADT Types](#ledger-adt-types)
4. [Explicit Disclosure (`disclose`)](#explicit-disclosure-disclose)
5. [Wallet Connection (Lace DApp Connector)](#wallet-connection-lace-dapp-connector)
6. [Provider Architecture](#provider-architecture)
7. [Transaction Workflow](#transaction-workflow)
8. [Privacy Patterns](#privacy-patterns)
9. [ZKLoan-Specific Patterns](#zkloan-specific-patterns)
10. [Common Errors & Solutions](#common-errors--solutions)

---

## Midnight.js v3.0.0 Breaking Changes

**Release Date:** December 17, 2024 | **Node.js Required:** >=22 | **TypeScript:** >=5.0

### 1. LevelPrivateStateProvider Requires Authentication

```typescript
// OLD (v2.1.0) - No authentication required
const provider = new LevelPrivateStateProvider({
  midnightDbName: 'midnight-db'
});

// NEW (v3.0.0) - Must provide walletProvider OR passwordProvider
const provider = new LevelPrivateStateProvider({
  midnightDbName: 'midnight-db',
  walletProvider: myWalletProvider
  // OR: privateStoragePasswordProvider: () => Promise.resolve('password')
});
```

### 2. WalletProvider.balanceTx Returns Union Type

The method now returns `BalancedProvingRecipe`, a discriminated union:

```typescript
type BalancedProvingRecipe =
  | { type: 'TransactionToProve'; /* needs proving */ }
  | { type: 'BalanceTransactionToProve'; /* needs balance + prove */ }
  | { type: 'NothingToProve'; transaction: ProvenTransaction; /* ready to submit */ };

// Must handle all three cases:
const recipe = await walletProvider.balanceTx(tx, newCoins, ttl);

switch (recipe.type) {
  case 'TransactionToProve':
    // Prove the transaction
    break;
  case 'BalanceTransactionToProve':
    // Balance and prove
    break;
  case 'NothingToProve':
    // Submit directly: recipe.transaction
    break;
}
```

### 3. submitTx Now Async

```typescript
// OLD - Synchronous
const txId = midnightProvider.submitTx(tx);

// NEW - Asynchronous
const txId = await midnightProvider.submitTx(tx);
```

### 4. High-Level Transaction Functions

New simplified functions replace manual proving workflows:

```typescript
// Deploy a contract
await submitDeployTx(providers, contract, initialState);

// Call a circuit
await contract.callTx.circuitName(args);
```

### 5. ZswapOffer Return Type

```typescript
// OLD - Always returned ZswapOffer
const offer = zswapStateToOffer(state);

// NEW - Returns UnprovenOffer | undefined
const offer = zswapStateToOffer(state);
if (offer) {
  // Use offer
}
```

### 6. networkId Changed from Enum to String

```typescript
// OLD
import { NetworkId } from '@midnight-ntwrk/midnight-js-network-id';
networkId: NetworkId.Testnet

// NEW
networkId: 'testnet-02'  // 'mainnet' | 'devnet' | 'undeployed'
```

### 7. Package Renames

| Old Package | New Package |
|-------------|-------------|
| `@midnight-ntwrk/ledger` | `@midnight-ntwrk/ledger-v6` |
| `getLedgerNetworkId()` | `getNetworkId()` |
| `getZswapNetworkId()` | `getNetworkId()` |
| `BalancedTransaction` | `BalancedProvingRecipe` |
| `UnbalancedTransaction` | `UnprovenTransaction` |

### Key Package Versions (v3.0.0)

```json
{
  "@midnight-ntwrk/midnight-js-contracts": "^3.0.0-alpha.10",
  "@midnight-ntwrk/midnight-js-types": "^3.0.0-alpha.10",
  "@midnight-ntwrk/midnight-js-network-id": "^3.0.0-alpha.10",
  "@midnight-ntwrk/ledger-v6": "6.1.0-alpha.6",
  "@midnight-ntwrk/compact-runtime": "^0.11.0-rc.1",
  "@midnight-ntwrk/dapp-connector-api": "^1.1.0"
}
```

---

## Compact Language Essentials

### Type System

| Type | Description | TypeScript Representation |
|------|-------------|---------------------------|
| `Boolean` | true/false | `boolean` |
| `Field` | Scalar field element | `bigint` |
| `Uint<N>` | N-bit unsigned integer | `bigint` |
| `Uint<0..N>` | Bounded unsigned (0 to N) | `bigint` |
| `Bytes<N>` | N-byte array | `Uint8Array` |
| `Vector<N, T>` | Fixed-length array | `T[]` |
| `Opaque<"string">` | UTF-8 string | `string` |
| `Maybe<T>` | Optional value | `{ is_some: boolean, value: T }` |
| `ZswapCoinPublicKey` | Wallet public key | `{ bytes: Uint8Array }` |

### Subtyping Rules

- `Uint<0..n>` is subtype of `Uint<0..m>` if n < m
- All `Uint` types are subtypes of `Field`
- Tuple subtypes: `[A, B]` ⊆ `[C, D]` if A ⊆ C and B ⊆ D

### Statements

```compact
// Fixed iteration loops (variable iteration NOT allowed)
for (const i of 0..5) { /* executes 5 times */ }
for (const item of vector) { /* iterates over vector */ }

// Conditionals
if (condition) { } else { }

// Assertions
assert(condition, "Error message");

// Constants (immutable, can be shadowed in nested blocks)
const x = value;
const y: Uint<32> = value;  // With type annotation
```

### Pure vs Impure Circuits

```compact
// PURE - No ledger access, no witnesses
// Can be called directly without transaction
export pure circuit hash(data: Bytes<32>): Bytes<32> {
    return persistentHash<Bytes<32>>(data);
}

// IMPURE - Accesses ledger or calls witnesses
// Creates on-chain transaction
export circuit updateValue(v: Uint<64>): [] {
    ledger.value = v;  // Ledger access makes it impure
}
```

### Standard Library Functions

```compact
import CompactStandardLibrary;

// Hashing
persistentHash<T>(value)           // For ledger storage
transientHash<T>(value)            // For in-proof computation

// Commitments (hiding values with randomness)
persistentCommit<T>(value, rand)   // For ledger storage
transientCommit<T>(value, rand)    // For in-proof computation

// Identity
ownPublicKey()                     // Returns caller's ZswapCoinPublicKey

// Padding strings
pad(32, "my-string")               // Pads to 32 bytes
```

---

## Ledger ADT Types

### Cell<T> (implicit for simple types)

```compact
ledger value: Uint<64>;  // Implicitly Cell<Uint<64>>

// Operations
value                    // Shorthand for value.read()
value = 42               // Shorthand for value.write(42)
value.resetToDefault()
```

### Counter

```compact
ledger counter: Counter;

counter                  // Shorthand for counter.read() -> Uint<64>
counter += 5             // Shorthand for counter.increment(5)
counter -= 3             // Shorthand for counter.decrement(3)
counter.lessThan(100)    // -> Boolean
counter.resetToDefault()
```

### Set<T>

```compact
ledger items: Set<Bytes<32>>;

items.member(value)      // -> Boolean
items.insert(value)
items.remove(value)
items.size()             // -> Uint<64>
items.isEmpty()          // -> Boolean
items.resetToDefault()
```

### Map<K, V>

```compact
ledger mapping: Map<Bytes<32>, Uint<64>>;

mapping.member(key)      // -> Boolean
mapping.lookup(key)      // -> V (or nested ADT)
mapping.insert(key, val)
mapping.remove(key)
mapping.size()           // -> Uint<64>
mapping.isEmpty()        // -> Boolean
mapping.insertDefault(key)  // Insert default value
mapping.resetToDefault()
```

### Nested Maps

```compact
// Only Map values can contain other ledger state types
ledger nested: Map<Bytes<32>, Map<Uint<16>, Counter>>;

// Initialize outer map entry
nested.insert(outerKey, default<Map<Uint<16>, Counter>>);

// Initialize inner counter
nested.lookup(outerKey).insert(innerKey, default<Counter>);

// Increment nested counter
nested.lookup(outerKey).lookup(innerKey).increment(1);

// Read nested counter
const val = nested.lookup(outerKey).lookup(innerKey).read();
```

### MerkleTree<N, T> and HistoricMerkleTree<N, T>

```compact
ledger tree: MerkleTree<10, Bytes<32>>;      // Depth 10
ledger histTree: HistoricMerkleTree<10, Bytes<32>>;

tree.insert(value)
tree.checkRoot(rootDigest)  // -> Boolean
tree.isFull()               // -> Boolean

// HistoricMerkleTree validates against historical roots
// (for concurrent proof generation)
```

### Kernel Operations

```compact
import CompactStandardLibrary;

kernel.self()                        // -> ContractAddress
kernel.blockTimeGreaterThan(time)    // -> Boolean
kernel.blockTimeLessThan(time)       // -> Boolean
kernel.checkpoint()                  // Atomic execution boundary
kernel.mint(domainSep, amount)       // Mint shielded coins
```

---

## Explicit Disclosure (`disclose`)

### When Required

The `disclose()` wrapper is REQUIRED when witness-derived data is:

1. **Stored in ledger**
2. **Returned from exported circuit**
3. **Passed to another contract**
4. **Used in comparisons that affect public output**

### Examples

```compact
witness getSecret(): Bytes<32>;

// ERROR: Implicit disclosure
ledger.value = getSecret();

// CORRECT: Explicit disclosure
ledger.value = disclose(getSecret());

// Also applies to derived values
const derived = persistentHash<Bytes<32>>(getSecret());
ledger.hash = disclose(derived);  // Still requires disclose

// Comparisons that branch
export circuit check(): Boolean {
    const secret = getSecret();
    return disclose(secret > 100);  // Comparison result disclosed
}
```

### Safe Functions (No Disclosure Needed)

```compact
// These sufficiently hide witness data:
transientCommit(value, randomness)   // If randomness is truly random
persistentCommit(value, randomness)  // Same condition
```

### Compiler Tracking

The compiler tracks witness data through:
- Arithmetic operations
- Type casts
- Comparisons
- Function calls
- Structure field access

It will reject programs with undeclared disclosure with detailed error messages showing the data flow path.

---

## Wallet Connection (Lace DApp Connector)

### Basic Connection Flow

```typescript
// 1. Poll for wallet availability
const checkWallet = () => window.midnight?.mnLace;

// 2. Request authorization
const connectorAPI = await window.midnight?.mnLace.enable();

// 3. Check if enabled
const isEnabled = await window.midnight?.mnLace.isEnabled();

// 4. Get wallet state
const state = await connectorAPI.state();
const address = state.address;

// 5. Get service URIs
const uris = await connectorAPI.serviceUriConfig();
// uris.indexerUri, uris.proverServerUri, uris.nodeUri
```

### Using RxJS for Polling

```typescript
import { interval, filter, take, firstValueFrom, timeout, map } from 'rxjs';

async function connectWallet(): Promise<DAppConnectorWalletAPI> {
  const result = await firstValueFrom(
    interval(100).pipe(
      map(() => window.midnight?.mnLace),
      filter((api): api is DAppConnectorAPI => api !== undefined),
      take(1),
      timeout(30000)
    )
  );

  const wallet = await result.enable();
  return wallet;
}
```

### Version Checking

```typescript
import semver from 'semver';

const api = window.midnight?.mnLace;
if (api && semver.satisfies(api.apiVersion, '1.x')) {
  // Compatible version
}
```

---

## Provider Architecture

### Required Providers

```typescript
interface Providers {
  // Stores private state locally (IndexedDB in browser)
  privateStateProvider: PrivateStateProvider;

  // Fetches ZK prover/verifier keys
  zkConfigProvider: ZKConfigProvider;

  // HTTP client to proof server
  proofProvider: ProofProvider;

  // Indexer for blockchain data queries
  publicDataProvider: PublicDataProvider;

  // Transaction balancing (attaches fuel)
  walletProvider: WalletProvider;

  // Transaction submission
  midnightProvider: MidnightProvider;
}
```

### Provider Setup Example

```typescript
import { httpClientProofProvider } from '@midnight-ntwrk/midnight-js-http-client-proof-provider';
import { indexerPublicDataProvider } from '@midnight-ntwrk/midnight-js-indexer-public-data-provider';
import { FetchZkConfigProvider } from '@midnight-ntwrk/midnight-js-fetch-zk-config-provider';
import { levelPrivateStateProvider } from '@midnight-ntwrk/midnight-js-level-private-state-provider';

const providers = {
  privateStateProvider: levelPrivateStateProvider({
    privateStateStoreName: 'my-app-state',
  }),

  zkConfigProvider: new FetchZkConfigProvider(
    window.location.origin,  // Where ZK keys are served
    fetch
  ),

  proofProvider: httpClientProofProvider(proverServerUri),

  publicDataProvider: indexerPublicDataProvider(indexerUri, indexerWsUri),

  walletProvider: {
    coinPublicKey: wallet.coinPublicKey,
    balanceTx: async (tx, newCoins, ttl) => {
      const balanced = await wallet.balanceAndProveTransaction(tx, newCoins || []);
      return { type: 'NothingToProve', transaction: balanced };
    }
  },

  midnightProvider: {
    submitTx: (tx) => wallet.submitTransaction(tx)
  }
};
```

---

## Transaction Workflow

### Deploy Contract

```typescript
import { deployContract } from '@midnight-ntwrk/midnight-js-contracts';

const deployedContract = await deployContract(providers, {
  contract: new Contract(witnesses),
  privateStateId: 'myContractPrivateState',
  initialPrivateState: { /* initial state */ }
});

const contractAddress = deployedContract.deployTxData.public.contractAddress;
```

### Join Existing Contract

```typescript
import { findDeployedContract } from '@midnight-ntwrk/midnight-js-contracts';

const contract = await findDeployedContract(providers, {
  contract: new Contract(witnesses),
  contractAddress: existingAddress,
  privateStateId: 'myContractPrivateState',
  initialPrivateState: { /* state */ }
});
```

### Call Circuit

```typescript
// Using callTx (creates transaction)
const result = await contract.callTx.myCircuit(arg1, arg2);

// Result contains:
// - result.public: Public outputs
// - result.private: Private state updates
```

### Pure Circuit Calls (No Transaction)

```typescript
import { pureCircuits } from './contract';

// Direct call, no providers needed
const hash = pureCircuits.computeHash(data);
```

---

## Privacy Patterns

### Pattern 1: PIN-Based Pseudonymous Identity

```compact
circuit publicKey(sk: Bytes<32>, pin: Uint<16>): Bytes<32> {
    const pinBytes = persistentHash<Uint<16>>(pin);
    return persistentHash<Vector<3, Bytes<32>>>(
        [pad(32, "myapp:pk:v1"), pinBytes, sk]
    );
}
```

**Benefits:**
- Multiple identities per wallet
- PIN change enables identity rotation
- Domain separator prevents cross-protocol attacks

### Pattern 2: Round-Based Unlinkability

```compact
export ledger round: Counter;

circuit publicKey(round: Field, sk: Bytes<32>): Bytes<32> {
    return persistentHash<Vector<3, Bytes<32>>>(
        [pad(32, "myapp:pk"), round as Bytes<32>, sk]
    );
}

export circuit doAction(): [] {
    // ... action logic ...
    round.increment(1);  // New round = new PK = unlinkable
}
```

### Pattern 3: Commitment/Nullifier (Single-Use Tokens)

```compact
export ledger commitments: HistoricMerkleTree<10, Bytes<32>>;
export ledger nullifiers: Set<Bytes<32>>;

circuit commitment(sk: Bytes<32>): Bytes<32> {
    return persistentHash<Vector<2, Bytes<32>>>([pad(32, "commit:"), sk]);
}

circuit nullifier(sk: Bytes<32>): Bytes<32> {
    return persistentHash<Vector<2, Bytes<32>>>([pad(32, "nullify:"), sk]);
}

export circuit useToken(): [] {
    const sk = getSecretKey();
    const path = findCommitmentPath(commitment(sk));

    // Verify membership (hides WHICH commitment)
    assert(commitments.checkRoot(merkleTreePathRoot<10, Bytes<32>>(path)), "Invalid");

    // Prevent double-use
    const nul = nullifier(sk);
    assert(!nullifiers.member(nul), "Already used");
    nullifiers.insert(disclose(nul));
}
```

### Pattern 4: Tiered Private Evaluation

```compact
witness getProfile(): Profile;

circuit evaluatePrivately(): [Uint<16>, Status] {
    const profile = getProfile();

    // All evaluation is private
    if (profile.score >= 700) return [10000, Status.Approved];
    if (profile.score >= 600) return [7000, Status.Approved];
    return [0, Status.Rejected];
}

export circuit apply(amount: Uint<16>): [] {
    const [maxAmount, status] = evaluatePrivately();

    // Only disclose the result, not the profile
    createRecord(disclose(min(amount, maxAmount)), disclose(status));
}
```

### Pattern 5: Batched Migration (Fixed Iteration)

```compact
// For migrating variable-length collections
export ledger migrationProgress: Map<Bytes<32>, Uint<16>>;

export circuit migrateBatch(oldKey: Bytes<32>, newKey: Bytes<32>): [] {
    const lastMigrated = migrationProgress.lookup(oldKey);

    // Fixed batch size (e.g., 5) - required for ZK circuits
    for (const i of 0..5) {
        const itemId = (lastMigrated + i + 1) as Uint<16>;

        if (items.lookup(oldKey).member(itemId)) {
            // Move item
            const item = items.lookup(oldKey).lookup(itemId);
            items.lookup(newKey).insert(itemId, disclose(item));
            items.lookup(oldKey).remove(itemId);
            migrationProgress.insert(disclose(oldKey), itemId);
        } else {
            // Migration complete
            migrationProgress.remove(disclose(oldKey));
            items.remove(disclose(oldKey));
            return;
        }
    }
}
```

---

## ZKLoan-Specific Patterns

### Private State Type

```typescript
type ZKLoanCreditScorerPrivateState = {
  creditScore: bigint;
  monthlyIncome: bigint;
  monthsAsCustomer: bigint;
};
```

### Witness Implementation

```typescript
const witnesses = {
  getRequesterScoringWitness: (
    context: WitnessContext<Ledger, ZKLoanCreditScorerPrivateState>
  ): [ZKLoanCreditScorerPrivateState, Applicant] => {
    const ps = context.privateState;
    return [
      ps,
      {
        creditScore: ps.creditScore,
        monthlyIncome: ps.monthlyIncome,
        monthsAsCustomer: ps.monthsAsCustomer,
      }
    ];
  }
};
```

### Credit Tier Evaluation

```typescript
function calculateTier(profile: { creditScore: number; monthlyIncome: number; monthsAsCustomer: number }) {
  if (profile.creditScore >= 700 && profile.monthlyIncome >= 2000 && profile.monthsAsCustomer >= 24) {
    return { tier: 'Tier 1', maxLoan: 10000 };
  }
  if (profile.creditScore >= 600 && profile.monthlyIncome >= 1500) {
    return { tier: 'Tier 2', maxLoan: 7000 };
  }
  if (profile.creditScore >= 580) {
    return { tier: 'Tier 3', maxLoan: 3000 };
  }
  return { tier: 'Rejected', maxLoan: 0 };
}
```

### Loan Request Flow

```compact
export circuit requestLoan(amountRequested: Uint<16>, secretPin: Uint<16>): [] {
    const zwapPublicKey = ownPublicKey();
    const requesterPubKey = publicKey(zwapPublicKey.bytes, secretPin);

    // Safety checks
    assert(!blacklist.member(zwapPublicKey), "Requester is blacklisted");
    assert(!onGoingPinMigration.member(disclose(requesterPubKey)), "PIN migration in progress");

    // Private evaluation
    const [topTierAmount, status] = evaluateApplicant();

    // Selective disclosure
    createLoan(
        disclose(requesterPubKey),
        amountRequested,
        disclose(topTierAmount),
        disclose(status)
    );
}
```

---

## Common Errors & Solutions

### Package Version Mismatch

```
npm error notarget No matching version found for @midnight-ntwrk/ledger@^6.0.0
```

**Solution:** Use `@midnight-ntwrk/ledger-v6` instead of `@midnight-ntwrk/ledger`

### Missing Network ID Export

```
error TS2724: '"@midnight-ntwrk/midnight-js-network-id"' has no exported member named 'getLedgerNetworkId'
```

**Solution:** Use `getNetworkId()` instead of `getLedgerNetworkId()` and `getZswapNetworkId()`

### Transaction Type Mismatch

```
error TS2305: Module '"@midnight-ntwrk/midnight-js-types"' has no exported member 'BalancedTransaction'
```

**Solution:** Use `BalancedProvingRecipe`, `UnprovenTransaction`, `ProvenTransaction`

### RxJS Type Inference

```
error TS2322: Type 'unknown' is not assignable to type 'X'
```

**Solution:** Cast result explicitly:
```typescript
const result = await firstValueFrom(observable.pipe(...));
return result as ExpectedType;
```

### Buffer Not Defined (Browser)

```
ReferenceError: Buffer is not defined
```

**Solution:** Add to globals.ts (import first in main.tsx):
```typescript
import { Buffer } from 'buffer';
globalThis.Buffer = Buffer;
```

### WASM Module Issues

**Solution:** Configure Vite properly:
```typescript
// vite.config.ts
plugins: [
  wasm(),
  topLevelAwait(),
],
optimizeDeps: {
  exclude: ['@midnight-ntwrk/onchain-runtime']
}
```

### Unused Parameters in Interface

```
error TS6133: 'ttl' is declared but its value is never read
```

**Solution:** Prefix with underscore: `_ttl`

---

## Quick Reference

### Compact Syntax Cheatsheet

| Action | Syntax |
|--------|--------|
| Read cell | `myCell` or `myCell.read()` |
| Write cell | `myCell = value` |
| Increment counter | `counter += n` |
| Check set membership | `mySet.member(value)` |
| Map lookup | `myMap.lookup(key)` |
| Nested map | `outer.lookup(k1).lookup(k2)` |
| Get caller | `ownPublicKey()` |
| Hash for storage | `persistentHash<T>(value)` |
| Commit with randomness | `persistentCommit<T>(value, rand)` |
| Declare disclosure | `disclose(value)` |
| Fixed loop | `for (const i of 0..5) { }` |

### TypeScript SDK Cheatsheet

| Action | Code |
|--------|------|
| Connect wallet | `await window.midnight?.mnLace.enable()` |
| Deploy contract | `await deployContract(providers, config)` |
| Join contract | `await findDeployedContract(providers, config)` |
| Call circuit | `await contract.callTx.circuitName(args)` |
| Pure circuit | `pureCircuits.circuitName(args)` |
| Query ledger | `providers.publicDataProvider.queryContractState(addr)` |

---

*Reference compiled from Midnight documentation, SDK v3.0.0 release notes, and project implementation patterns.*

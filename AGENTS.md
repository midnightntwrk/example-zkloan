# Midnight & Compact Development Guide

## Overview

This project is a ZK-powered credit scoring and loan application system built on **Midnight**, a privacy-focused blockchain that uses zero-knowledge proofs (zk-SNARKs) for confidential smart contracts. The core contract is written in **Compact**, Midnight's domain-specific language for ZK circuits.

---

## 1. Dual-State Architecture

Midnight contracts operate across **three execution contexts**:

| Context | Storage | Visibility | Purpose |
|---------|---------|------------|---------|
| **Public Ledger** | On-chain | Visible to all | Stores `ledger` variables; all reads/writes are publicly recorded |
| **Private State** | Off-chain (user's local machine) | Only the user | Managed via `witness` functions; never leaves the prover |
| **ZK Circuit** | None (computation only) | Proof output only | The "glue" that connects private inputs to public ledger operations |

### Key Rules:
- **Ledger operations are PUBLIC**: Any argument passed to a ledger operation (`.insert()`, `.lookup()`, etc.) is visible on-chain
- **Exception**: `MerkleTree` and `HistoricMerkleTree` hide *which* value's membership is proven
- **Private state lives in witnesses**: Secret keys, PINs, and sensitive data come from TypeScript witness implementations

---

## 2. Compact Language Fundamentals

### File Structure
```compact
pragma language_version >= 0.22;    // Use `>=` so newer compilers accept it
import CompactStandardLibrary;      // Always import the standard library

// Type declarations
export enum MyStatus { Active, Inactive }
export struct MyData { field1: Uint<32>; field2: Bytes<32>; }

// Caller identity: single witness-supplied user secret. NEVER use
// `ownPublicKey()` to identify the caller. See section 13 below for the rule
// and the bypass it closes.
export struct UserSecretKey { bytes: Bytes<32>; }
export struct UserPublicKey { bytes: Bytes<32>; }
export struct AdminPublicKey { bytes: Bytes<32>; }

// Ledger declarations (public state)
export ledger counter: Counter;
export ledger items: Map<Bytes<32>, MyData>;
export ledger contractAdmin: AdminPublicKey;

// Witness declarations (private data retrieval)
witness getSecret(): Bytes<32>;
witness getUserSecret(): UserSecretKey;

// Constructor (runs at deployment). The deployer's derived admin pubkey is
// frozen into `contractAdmin`; subsequent admin asserts check against it.
constructor() {
    contractAdmin = disclose(deriveAdminPublicKey(getUserSecret()));
}

// Circuit definitions (contract logic)
export circuit doSomething(arg: Uint<16>): [] { ... }
circuit helperCircuit(x: Field): Field { ... }
```

### Core Types
| Type | Description | TypeScript Representation |
|------|-------------|---------------------------|
| `Boolean` | true/false | `boolean` |
| `Field` | Scalar field element | `bigint` |
| `Uint<N>` | N-bit unsigned integer | `bigint` |
| `Bytes<N>` | N-byte array | `Uint8Array` |
| `Vector<N, T>` | Fixed-length array of T | `T[]` |
| `Opaque<"string">` | UTF-8 string | `string` |
| `Maybe<T>` | Optional value | `{ is_some: boolean, value: T }` |
| `ZswapCoinPublicKey` | User's wallet public key | `{ bytes: Uint8Array }` |

### Ledger ADT Types
| Type | Operations | Notes |
|------|------------|-------|
| `Cell<T>` (implicit for simple types) | `read()`, `write(v)` | Single value storage |
| `Counter` | `read()`, `increment(n)`, `decrement(n)` | Non-negative counter |
| `Set<T>` | `member(v)`, `insert(v)`, `remove(v)`, `size()` | Unique values |
| `Map<K, V>` | `member(k)`, `lookup(k)`, `insert(k, v)`, `remove(k)` | Key-value mapping |
| `MerkleTree<N, T>` | `insert(v)`, `checkRoot(r)` | Privacy-preserving set membership |
| `HistoricMerkleTree<N, T>` | Same + historical roots | For concurrent proofs |

---

## 3. Witness vs Circuit Roles

### Witnesses (TypeScript - Private Data)
```typescript
// Witness implementation in TypeScript
const witnesses = {
    getSecret: (context: WitnessContext<Ledger, PrivateState>) => {
        // Access: context.ledger (read-only), context.privateState
        const secretKey = context.privateState.secretKey;
        return [context.privateState, secretKey]; // [newPrivateState, returnValue]
    }
};
```

**Rules**:
- Witnesses run on the user's local machine
- They have access to private state and ledger snapshots
- **NEVER trust witness output without validation** - any DApp can provide any implementation
- Return type: `[newPrivateState, actualReturnValue]`

### Circuits (Compact - ZK Proven Logic)
```compact
export circuit verifyAndStore(publicData: Uint<16>): [] {
    const secret = getSecret();  // Call witness
    const hash = persistentHash<Bytes<32>>(secret);
    ledger.storedHash = disclose(hash);  // Must disclose witness-derived data
    assert(publicData > 100, "Too low");
}
```

**Rules**:
- All circuit logic is proven in zero-knowledge
- Circuits enforce constraints that **cannot be bypassed**
- Always validate witness data with `assert` statements

---

## 4. Impure vs Pure Circuits

### Impure Circuits
- Access ledger state (read or write)
- Call witnesses
- Have `CircuitContext<T>` as first parameter in TypeScript
- Return `CircuitResults<T, R>` in TypeScript
- **Create on-chain transactions**

```typescript
// TypeScript signature for impure circuit
post(context: CircuitContext<T>, message: string): CircuitResults<T, []>
```

### Pure Circuits
- No ledger access, no witnesses
- Stateless computation
- Called directly without context
- **Can be called without deploying contract**

```compact
export pure circuit hash(data: Bytes<32>): Bytes<32> {
    return persistentHash<Bytes<32>>(data);
}
```

```typescript
// TypeScript usage
const result = pureCircuits.hash(myData);  // Direct call, no context
```

---

## 5. Explicit Disclosure - Privacy by Default

Compact requires **explicit disclosure** of witness-derived data—privacy by default means you must deliberately declare any data that will become public. You MUST wrap disclosed values with `disclose()`:

```compact
// ERROR: Implicit disclosure - compiler rejects this
ledger.value = getSecret();

// CORRECT: Explicit disclosure declared
ledger.value = disclose(getSecret());

// Also applies to derived values - compiler tracks witness data flow
const derived = persistentHash<Bytes<32>>(getSecret());
ledger.hash = disclose(derived);  // Still requires disclose
```

The `disclose()` wrapper doesn't cause disclosure itself—it's a conscious acknowledgment that you understand the value will become public when stored to ledger, returned from an exported circuit, or passed to another contract. Without it, the compiler rejects the code because privacy should be the default, and any potential exposure of witness data must be a deliberate choice by the programmer.

### What Requires `disclose()`:
1. Storing witness-derived data in the public ledger
2. Returning witness-derived data from exported circuits
3. Passing witness-derived data to another contract via cross-contract calls
4. Comparisons involving witness data (the comparison result requires disclosure)

### Safe Functions (No `disclose()` Needed):
- `transientCommit(value, rand)` - if `rand` is sufficiently random
- `persistentCommit(value, rand)` - same condition

### Unsafe Functions (Still Require `disclose()`):
- `transientHash(value)` - hashing alone is NOT sufficient to protect witness data
- `persistentHash(value)` - same as transientHash

### Best Practices:
- Place `disclose()` as close to the disclosure point as possible
- For structured values (tuples, vectors, structs), wrap only the portions containing witness data
- If a witness always returns non-private or cryptographically protected data, disclose at the call site

---

## 6. Compilation Lifecycle

### Compile Command
```bash
compactc src/mycontract.compact build/mycontract

# Skip ZK key generation (faster, for dev/debug)
compactc --skip-zk src/mycontract.compact build/mycontract
```

### Output Structure
```
build/mycontract/
├── contract/
│   ├── index.cjs        # JavaScript implementation
│   ├── index.cjs.map    # Source map for debugging
│   └── index.d.cts      # TypeScript declarations
├── keys/
│   ├── circuitName.prover    # Proving key
│   └── circuitName.verifier  # Verifying key
└── zkir/
    └── circuitName.zkir      # ZK intermediate representation
```

### Environment Variable
```bash
export COMPACT_PATH=/path/to/libs:/another/path  # For module resolution
```

---

## 7. Tooling & Runtime

### Package Dependencies
```json
{
    "@midnight-ntwrk/compact-runtime": "^0.x.x",
    "@midnight-ntwrk/midnight-js-contracts": "^0.x.x",
    "@midnight-ntwrk/wallet-api": "^0.x.x"
}
```

### Contract Instantiation (TypeScript)
```typescript
import { Contract, pureCircuits, ledger } from './build/contract';

// Define private state type
type PrivateState = { secretKey: Uint8Array };

// Implement witnesses
const witnesses: Witnesses<PrivateState> = {
    localSecretKey: (ctx) => [ctx.privateState, ctx.privateState.secretKey]
};

// Create contract instance
const contract = new Contract<PrivateState>(witnesses);

// Get initial state
const [privateState, contractState] = contract.initialState({
    privateState: { secretKey: myKey },
    // ... other context
});

// Call circuits
const result = contract.circuits.myCircuit(context, arg1, arg2);
```

### Proof Server
The local proof server generates ZK proofs for transactions:
- Receives partial proof data from circuit execution
- Generates succinct zk-SNARK proofs
- Required for submitting transactions to the Midnight blockchain

---

## 8. Common Bash Commands

```bash
# Compile contract
compactc src/contract.compact build/output

# Compile without ZK keys (faster for testing)
compactc --skip-zk src/contract.compact build/output

# Run tests
npm test
cd contract && npm test

# Start local development environment
npm run dev

# Check compiler version
compactc --version

# Check language version
compactc --language-version
```

---

## 9. ZK Patterns & Privacy Best Practices

### Pattern: Commitment/Nullifier (Single-Use Tokens)
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

    // Verify membership without revealing WHICH commitment
    assert(commitments.checkRoot(merkleTreePathRoot<10, Bytes<32>>(path)), "Invalid");

    // Prevent double-use
    const nul = nullifier(sk);
    assert(!nullifiers.member(nul), "Already used");
    nullifiers.insert(disclose(nul));
}
```

### Pattern: Unlinkable Identity (Round Counter)
```compact
export ledger round: Counter;
export ledger authority: Bytes<32>;

circuit publicKey(sk: Bytes<32>, round: Field): Bytes<32> {
    return persistentHash<Vector<3, Bytes<32>>>([
        pad(32, "pk:"),
        round as Bytes<32>,
        sk
    ]);
}

export circuit authenticate(): [] {
    const sk = localSecretKey();
    const pk = publicKey(sk, round as Field);
    assert(authority == pk, "Not authorized");
    round.increment(1);  // New round = new pk, breaks linkability
}
```

### Pattern: Tiered Access with Private Scoring
```compact
// Score is evaluated locally, only tier result disclosed
circuit evaluateScore(): [Uint<16>, Status] {
    const profile = getPrivateProfile();  // From witness
    if (profile.score >= 700) return [10000, Status.Approved];
    if (profile.score >= 600) return [7000, Status.Approved];
    return [0, Status.Rejected];
}

export circuit apply(amount: Uint<16>): [] {
    const [maxAmount, status] = evaluateScore();
    // Only disclosed: authorized amount and status, NOT the score
    createLoan(disclose(min(amount, maxAmount)), disclose(status));
}
```

---

## 10. Privacy Leak Checklist

Before deploying, verify:

- [ ] **Explicit disclosure is intentional** - All `disclose()` calls are deliberate, not accidental
- [ ] **No guessable hashes** - Use `persistentCommit` (not `persistentHash`) for small value sets
- [ ] **Unlinkable actions** - Use round counters in public keys
- [ ] **Domain separators** - Unique strings for each hash context to prevent cross-protocol attacks
- [ ] **Input validation** - Assert bounds on all witness returns
- [ ] **No timing side-channels** - Fixed-iteration loops, no early returns based on secrets
- [ ] **Merkle tree for set membership** - Use `MerkleTree` when you need private membership proofs

### Example Domain Separator Usage
```compact
circuit commitmentDomain(data: Bytes<32>): Bytes<32> {
    return persistentHash<Vector<2, Bytes<32>>>([
        pad(32, "myapp:commitment:v1"),  // Unique domain separator
        data
    ]);
}
```

---

## 11. Testing Compact Contracts

Since Compact compiles to JavaScript, use standard testing frameworks:

```typescript
import { describe, it, expect } from 'vitest';
import { Contract, State, pureCircuits } from './build/contract';

describe('MyContract', () => {
    it('should evaluate correctly', () => {
        const contract = new Contract(mockWitnesses);
        const ctx = createTestContext();

        const result = contract.circuits.myCircuit(ctx, 100);

        expect(result.result).toEqual([]);
        expect(result.context.currentPrivateState).toBeDefined();
    });

    it('pure circuits work without context', () => {
        const hash = pureCircuits.publicKey(testSk, testInstance);
        expect(hash.length).toBe(32);
    });
});
```

---

## 12. This Project's Specific Patterns

### Credit Scoring Flow
1. User calls `requestLoan(amount, secretPin)`
2. Witness `getRequesterScoringWitness()` returns private `Applicant` data
3. `evaluateApplicant()` computes tier locally (private)
4. Only `topTierAmount` and `status` are disclosed to ledger

### PIN-Based Identity
The per-user public key is derived from the witness `userSecretKey` and a PIN — NOT from `ownPublicKey()`. The PIN provides identity rotation (a new PIN yields a new derived pubkey, breaking linkability), while the witness secret provides authentic caller identity that a prover cannot forge.
```compact
export pure circuit deriveUserPublicKey(sk: UserSecretKey, pin: Uint<16>): UserPublicKey {
    const pinBytes = persistentHash<Uint<16>>(pin);
    return UserPublicKey {
        bytes: persistentHash<Vector<3, Bytes<32>>>([
            pad(32, "zkloan:user:pk:v1"),
            pinBytes,
            sk.bytes
        ])
    };
}
```

### Blacklist Pattern
The blacklist stores derived `UserPublicKey` values, not wallet addresses. The caller's identity is computed from their witness secret inside the proof; a malicious caller cannot pretend to be a non-blacklisted user.
```compact
export ledger blacklist: Set<UserPublicKey>;

export circuit requestLoan(secretPin: Uint<16>, ...): [] {
    const me = deriveUserPublicKey(getUserSecret(), secretPin);
    const disclosed = disclose(me);
    assert(!blacklist.member(disclosed), "Requester is blacklisted");
    // ...
}
```

---

## 13. Caller Identity and Authorization

The strict rule: **if your contract is not routing shielded tokens to a target wallet, do not call `ownPublicKey()` anywhere.** All caller identity — both admin and per-user — must derive from a witness-supplied secret.

### Why `ownPublicKey()` cannot identify the caller

`ownPublicKey()` returns a value the prover claims. It is supplied as a parameter to the circuit context, not cryptographically bound to the wallet that signed the transaction. Any caller can pass any 32-byte value. As a result:

- `assert(ownPublicKey() == admin, "...")` is bypassable: any chain reader copies the public `admin` value and supplies it as their own `ownPublicKey()`.
- `assert(!blacklist.member(ownPublicKey()), "...")` is bypassable: a blacklisted caller supplies a different, non-blacklisted value.
- `publicKey(ownPublicKey().bytes, pin)` is meaningless as a binding: the caller can claim any "base" pubkey and combine it with their own PIN.

The pattern is structurally the same in every case: `ownPublicKey()` is prover-supplied, so any assertion or identity derivation that depends on it can be bypassed.

### The one valid use

`ownPublicKey()` is correct when the contract is sending shielded tokens *to* the caller — it identifies the recipient address for a Zswap output. The token is delivered to the address the prover claims; if they lie, they lose access to their own tokens. There is no security boundary to bypass.

If your contract does anything other than routing shielded tokens (storing identity-linked state, gating access, tracking per-user records), use witness-derived secrets instead.

### The witness-derived keypair pattern

A single 32-byte `userSecretKey` lives in the caller's private state. The contract derives multiple public keys from it using domain-separated hashes — one per role.

```compact
pragma language_version >= 0.22;
import CompactStandardLibrary;

export struct UserSecretKey { bytes: Bytes<32>; }
export struct UserPublicKey { bytes: Bytes<32>; }
export struct AdminPublicKey { bytes: Bytes<32>; }

export ledger contractAdmin: AdminPublicKey;
export ledger blacklist: Set<UserPublicKey>;

witness getUserSecret(): UserSecretKey;

constructor() {
    contractAdmin = disclose(deriveAdminPublicKey(getUserSecret()));
}

// Per-user identity, PIN-rotatable. Used as the loan map key, blacklist key,
// or anywhere the contract needs to identify the caller as a specific user.
export pure circuit deriveUserPublicKey(sk: UserSecretKey, pin: Uint<16>): UserPublicKey {
    const pinBytes = persistentHash<Uint<16>>(pin);
    return UserPublicKey {
        bytes: persistentHash<Vector<3, Bytes<32>>>([
            pad(32, "yourapp:user:pk:v1"),
            pinBytes,
            sk.bytes
        ])
    };
}

// Admin identity, stable across PIN rotation. The deployer's
// `deriveAdminPublicKey(secret)` is pinned into `contractAdmin` at construction.
export pure circuit deriveAdminPublicKey(sk: UserSecretKey): AdminPublicKey {
    return AdminPublicKey {
        bytes: persistentHash<Vector<2, Bytes<32>>>([
            pad(32, "yourapp:admin:pk:v1"),
            sk.bytes
        ])
    };
}

// Admin guard. Replaces `assert(ownPublicKey() == admin, "...")`.
export circuit adminAction(): [] {
    assert(contractAdmin == deriveAdminPublicKey(getUserSecret()), "Only admin");
    // ...
}

// Per-user identity check inside a user-facing circuit. Replaces
// `assert(!blacklist.member(ownPublicKey()), ...)` and
// `publicKey(ownPublicKey().bytes, pin)`.
export circuit userAction(pin: Uint<16>): [] {
    const userPk = deriveUserPublicKey(getUserSecret(), pin);
    const disclosed = disclose(userPk);
    assert(!blacklist.member(disclosed), "Caller is blacklisted");
    // use `disclosed.bytes` as the loan/state key for this caller
}

// Hand admin off without ever transmitting a private key. The new admin
// generates their own secret, derives their public key off-chain, and shares
// only the resulting 32-byte value.
export circuit rotateAdmin(newAdmin: AdminPublicKey): [] {
    assert(contractAdmin == deriveAdminPublicKey(getUserSecret()), "Only admin");
    contractAdmin = disclose(newAdmin);
    return [];
}
```

### Witness layer

A single secret in private state powers both the admin and per-user roles. Different domain separators in the contract keep them logically independent.

```typescript
export type PrivateState = {
  // ... per-user fields like credit profile, etc. ...
  userSecretKey: Uint8Array;  // 32 bytes
};

export const witnesses = {
  getUserSecret: ({ privateState }: WitnessContext<Ledger, PrivateState>):
    [PrivateState, { bytes: Uint8Array }] => {
    if (!privateState.userSecretKey || privateState.userSecretKey.length !== 32) {
      throw new Error("userSecretKey missing or wrong length");
    }
    return [privateState, { bytes: privateState.userSecretKey }];
  },
};
```

### Required properties

1. **Domain separation**: every derivation hashes with a contract-specific string. The same `userSecretKey` produces uncorrelated public keys for distinct roles (admin vs per-user vs anything else you add).
2. **Witness-only identity**: identity in this contract derives from the witness secret. `ownPublicKey()` is not consulted, so prover claims about the caller's wallet have no effect on assertions.
3. **Rotation without key transmission**: provide a `rotateAdmin(newAdmin: AdminPublicKey)` circuit. The new admin generates their secret locally and shares only the derived public key.
4. **Blacklist keyed on derived pubkey**: blacklist a `UserPublicKey`, not a wallet address. The admin obtains a user's `UserPublicKey` from the on-chain `loans` map keys (or out-of-band) — they cannot blacklist by wallet address.
5. **No `ownPublicKey()` in identity-bearing positions**: any `assert(...ownPublicKey()...)` or `someDerivation(ownPublicKey().bytes, ...)` is a vulnerability. The only acceptable use is identifying the recipient of an outgoing shielded token transfer.

This is the **witness-derived keypair pattern**. Cite it by that name when documenting or recommending it.

---

## Quick Reference Card

| Action | Compact Syntax |
|--------|----------------|
| Read cell | `myCell` or `myCell.read()` |
| Write cell | `myCell = value` or `myCell.write(value)` |
| Increment counter | `counter += n` or `counter.increment(n)` |
| Check set membership | `mySet.member(value)` |
| Insert into map | `myMap.insert(key, value)` |
| Nested map access | `outer.lookup(k1).lookup(k2)` |
| Identify a Zswap token recipient (the only valid use) | `ownPublicKey()` |
| Identify the caller as a specific user | `deriveUserPublicKey(getUserSecret(), pin)` |
| Authorize admin caller | `assert(contractAdmin == deriveAdminPublicKey(getUserSecret()), "...")` |
| Hash for storage | `persistentHash<T>(value)` |
| Hash with randomness | `persistentCommit<T>(value, rand)` |
| Declare disclosure | `disclose(witnessValue)` |
| Fixed loop | `for (const i of 0..5) { ... }` |

---

*Last updated: Compact language version >= 0.22, compiler version 0.30.0+. Section 13 (Admin Authorization) reflects the witness-derived keypair pattern that replaces an earlier `ownPublicKey()`-based pattern. The earlier pattern was insecure and has been removed throughout the repository.*

**References:**
- [Explicit Disclosure](https://docs.midnight.network/develop/reference/compact/explicit_disclosure) - Official Midnight documentation
- [Compact Standard Library](https://docs.midnight.network/develop/reference/compact/compact-std-library/exports) - API reference
- [Midnight Academy Module 5](https://docs.midnight.network/academy/module-5) - Developer fundamentals

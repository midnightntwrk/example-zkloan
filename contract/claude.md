# ZKLoan Credit Scorer — Contract Reference

Reference for the Compact contract. Reflects `pragma language_version 0.22` and the Midnight toolchain 0.30.0 / ledger v8 build.

## Project Overview

Privacy-preserving loan DApp on Midnight. Demonstrates:

1. Processing sensitive financial data (credit score, income, tenure) privately via ZK proofs
2. Verifying off-chain attestations with an in-circuit Schnorr signature on Jubjub before trusting the credit profile
3. Storing only non-sensitive outcomes (loan status, approved amount) on the public ledger
4. Managing a nested map of user loans on-chain
5. Batched migration of a user's loans when they rotate their PIN

---

## Project Structure

```
zkloan-credit-scorer/
├── contract/                          # Compact contract + TypeScript wrapper
│   ├── src/
│   │   ├── zkloan-credit-scorer.compact  # Main contract
│   │   ├── schnorr.compact               # Schnorr verification polyfill (Jubjub)
│   │   ├── index.ts                      # Re-exports contract + witnesses
│   │   ├── witnesses.ts                  # TS witness implementations
│   │   ├── managed/                      # Compiler output (generated)
│   │   │   └── zkloan-credit-scorer/
│   │   │       ├── contract/index.cjs    # Generated JS implementation
│   │   │       ├── keys/                 # Proving / verifying keys
│   │   │       └── zkir/                 # ZK intermediate representation
│   │   └── test/
│   │       ├── zkloan-credit-scorer.test.ts
│   │       ├── zkloan-credit-scorer.simulator.ts
│   │       └── utils/
│   │           ├── address.ts
│   │           └── test-data.ts          # Schnorr signing + user fixtures for tests
│   └── package.json
├── zkloan-credit-scorer-cli/          # CLI (deploy, join, loan flows, admin)
├── zkloan-credit-scorer-ui/           # React + Vite frontend
└── zkloan-credit-scorer-attestation-api/  # Restify service that signs credit data
```

---

## Compact Contract Details

### File: `contract/src/zkloan-credit-scorer.compact`

**Language version**: `pragma language_version 0.22`

### Types

```compact
export enum LoanStatus {
    Approved,      // Approved outright, or accepted after a Proposed offer
    Rejected,      // Applicant did not meet minimum tier eligibility
    Proposed,      // Requested amount exceeded the user's eligible tier — awaiting user decision
    NotAccepted,   // User declined a Proposed offer
}

export struct LoanApplication {
    authorizedAmount: Uint<16>;
    status: LoanStatus;
}

struct Applicant {  // private, not exported
    creditScore: Uint<16>;
    monthlyIncome: Uint<16>;
    monthsAsCustomer: Uint<16>;
}

// From schnorr.compact, re-exported
export struct SchnorrSignature {
    announcement: JubjubPoint;
    response: Field;
}
```

### Ledger State

| Variable | Type | Purpose |
|---|---|---|
| `blacklist` | `Set<ZswapCoinPublicKey>` | Blocked wallet addresses |
| `loans` | `Map<Bytes<32>, Map<Uint<16>, LoanApplication>>` | User pubkey → loanId → loan |
| `onGoingPinMigration` | `Map<Bytes<32>, Uint<16>>` | Tracks last migrated loanId per in-progress PIN change |
| `admin` | `ZswapCoinPublicKey` | Contract admin (set in constructor, transferable) |
| `providers` | `Map<Uint<16>, JubjubPoint>` | Registered attestation provider public keys (Jubjub) |

### Nested Map Access Pattern

```compact
// Outer map: derived userPubKey → inner map
// Inner map: loanId → LoanApplication
export ledger loans: Map<Bytes<32>, Map<Uint<16>, LoanApplication>>;

// Initialize on first use
if (!loans.member(userPk)) {
    loans.insert(userPk, default<Map<Uint<16>, LoanApplication>>);
}
// Count
const loanCount = loans.lookup(userPk).size();
// Insert
loans.lookup(userPk).insert(loanId, loan);
```

---

## Circuits Reference

### `requestLoan(amountRequested: Uint<16>, secretPin: Uint<16>): []`

Entry point. Validates the caller, runs the private credit evaluation (which itself verifies an attestation signature), and records the outcome.

```compact
export circuit requestLoan(amountRequested: Uint<16>, secretPin: Uint<16>): [] {
    assert(amountRequested > 0, "Loan amount must be greater than zero");
    const zwapPublicKey = ownPublicKey();
    const requesterPubKey = publicKey(zwapPublicKey.bytes, secretPin);

    assert(!blacklist.member(zwapPublicKey), "Requester is blacklisted");
    assert(!onGoingPinMigration.member(disclose(requesterPubKey)),
           "PIN migration is in progress for this user");

    // Bound the signed attestation to this specific user identity
    const userPubKeyHash = transientHash<Bytes<32>>(requesterPubKey);

    const [topTierAmount, status] = evaluateApplicant(userPubKeyHash);
    createLoan(disclose(requesterPubKey), amountRequested,
               disclose(topTierAmount), disclose(status));
    return [];
}
```

### `respondToLoan(loanId: Uint<16>, secretPin: Uint<16>, accept: Boolean): []`

Resolves a `Proposed` loan. Only the loan owner (derived from their PIN + Zswap key) can respond. Accepting flips status to `Approved` at the proposed amount; declining flips to `NotAccepted` with amount 0.

### `evaluateApplicant(userPubKeyHash: Field): [Uint<16>, LoanStatus]`

Private credit evaluation — runs off-chain as part of proof generation. Calls the `getAttestedScoringWitness` witness to pull the user's profile, signature, and provider id from local private state. Then:

1. Asserts the provider is registered on-chain
2. Looks up the provider's Jubjub public key
3. Builds the signed message as `Vector<4, Field>` = `[creditScore, monthlyIncome, monthsAsCustomer, userPubKeyHash]`
4. Runs `Schnorr_schnorrVerify<4>(msg, signature, providerPk)` — fails the whole transaction if the signature is invalid
5. Applies the tier logic below

```compact
circuit evaluateApplicant(userPubKeyHash: Field): [Uint<16>, LoanStatus] {
    const [profile, signature, providerId] = getAttestedScoringWitness();

    assert(providers.member(disclose(providerId)), "Attestation provider not registered");
    const providerPk = providers.lookup(disclose(providerId));

    const msg: Vector<4, Field> = [
        profile.creditScore as Field,
        profile.monthlyIncome as Field,
        profile.monthsAsCustomer as Field,
        userPubKeyHash
    ];
    Schnorr_schnorrVerify<4>(msg, signature, providerPk);

    // Tier 1: max $10,000
    if (profile.creditScore >= 700 && profile.monthlyIncome >= 2000 && profile.monthsAsCustomer >= 24) {
        return [10000, LoanStatus.Approved];
    }
    // Tier 2: max $7,000
    else if (profile.creditScore >= 600 && profile.monthlyIncome >= 1500) {
        return [7000, LoanStatus.Approved];
    }
    // Tier 3: max $3,000
    else if (profile.creditScore >= 580) {
        return [3000, LoanStatus.Approved];
    }
    else {
        return [0, LoanStatus.Rejected];
    }
}
```

### `createLoan(requester, amountRequested, topTierAmount, status): []`

Writes to the `loans` ledger. If `amountRequested > topTierAmount` the loan is stored with status `Proposed` (awaiting `respondToLoan`); otherwise the passed-through status is used.

### `changePin(oldPin: Uint<16>, newPin: Uint<16>): []`

Batched migration of a user's loans from `publicKey(zwapKey, oldPin)` to `publicKey(zwapKey, newPin)`. Fixed batch size of 5 per transaction. `onGoingPinMigration` records the last-migrated loanId so the DApp can call `changePin` repeatedly until all loans are moved.

Key constraint: Compact circuits cannot iterate over variable-length collections, hence the fixed-size loop + off-chain orchestration.

### `publicKey(sk: Bytes<32>, pin: Uint<16>): Bytes<32>`

Deterministic derivation: `persistentHash([domainSeparator, hash(pin), sk])`. The PIN never appears on-chain; only the derived key does.

### Admin Circuits

All guarded by `assert(ownPublicKey() == admin, ...)`.

```compact
export circuit blacklistUser(account: ZswapCoinPublicKey): []
export circuit removeBlacklistUser(account: ZswapCoinPublicKey): []
export circuit registerProvider(providerId: Uint<16>, providerPk: JubjubPoint): []
export circuit removeProvider(providerId: Uint<16>): []
export circuit transferAdmin(newAdmin: ZswapCoinPublicKey): []
```

---

## Attestation Signature Flow

Credit data is signed off-chain by a registered provider and verified inside the ZK circuit. This prevents a malicious DApp from fabricating a high score client-side.

1. Admin calls `registerProvider(id, pk)` with a Jubjub public key.
2. A trusted service (see [zkloan-credit-scorer-attestation-api](../zkloan-credit-scorer-attestation-api)) signs `[creditScore, monthlyIncome, monthsAsCustomer, userPubKeyHash]` using Schnorr on Jubjub.
3. The user stores the signature + providerId in their local private state.
4. During `requestLoan`, the witness exposes the profile + signature + providerId. `evaluateApplicant` verifies the signature inside the circuit before applying the tier rules.

Note: `JubjubPoint` is opaque in language 0.22 — coordinates must be read via `jubjubPointX(p)` / `jubjubPointY(p)`, not `.x` / `.y`. Point equality also can't use `==` directly (the compiler generates `===` which is JS reference equality); compare coordinates instead. See [schnorr.compact](src/schnorr.compact).

---

## TypeScript Witness Implementation

File: [witnesses.ts](src/witnesses.ts)

```typescript
export type SchnorrSignature = {
  announcement: { x: bigint; y: bigint };
  response: bigint;
};

export type ZKLoanCreditScorerPrivateState = {
  creditScore: bigint;
  monthlyIncome: bigint;
  monthsAsCustomer: bigint;
  attestationSignature: SchnorrSignature;
  attestationProviderId: bigint;
};

export const witnesses = {
  getAttestedScoringWitness: ({ privateState }) => [
    privateState,
    [
      {
        creditScore: privateState.creditScore,
        monthlyIncome: privateState.monthlyIncome,
        monthsAsCustomer: privateState.monthsAsCustomer,
      },
      privateState.attestationSignature,
      privateState.attestationProviderId,
    ],
  ],

  // Witness-assisted division of the challenge hash by 2^248 so the
  // truncated challenge fits in the Jubjub scalar field.
  getSchnorrReduction: ({ privateState }, challengeHash) => {
    const q = challengeHash / TWO_248;
    const r = challengeHash % TWO_248;
    return [privateState, [q, r]];
  },
};
```

---

## Testing

### Simulator Pattern

`src/test/zkloan-credit-scorer.simulator.ts` wraps the compiled contract. It generates a provider keypair in its constructor, builds an initial signed private state via `createSignedUserProfile`, and registers the provider so that `requestLoan` calls have a valid attestation to verify.

### Example

```typescript
it("approves a Tier 1 loan, capping at the max amount", () => {
  const sim = new ZKLoanCreditScorerSimulator();
  const userZwapKey = sim.createTestUser("Alice").left.bytes;
  const pin = 1234n;

  sim.requestLoan(15000n, pin);  // over the tier 1 ceiling → Proposed

  const loan = sim.getLedger().loans
    .lookup(sim.publicKey(userZwapKey, pin))
    .lookup(1n);

  expect(loan.status).toEqual(LoanStatus.Proposed);
  expect(loan.authorizedAmount).toEqual(10000n);
});
```

---

## Commands

### Contract

```bash
cd contract

npm run compact       # compact compile — generates src/managed/
npm run build         # tsc + copy managed/ into dist/
npm test              # vitest
npm run test:compile  # compact compile && vitest
npm run lint
```

### CLI

```bash
cd zkloan-credit-scorer-cli

npm run standalone       # against a local docker-compose network
npm run testnet-remote   # against the remote testnet (needs WALLET_MNEMONIC + tDUST)
npm run test-api         # docker-backed integration tests
npm run build
```

---

## Privacy Model

### Private (never on-chain)

- `creditScore`, `monthlyIncome`, `monthsAsCustomer` — stored in `ZKLoanCreditScorerPrivateState`, encrypted on disk by the level-private-state-provider
- `secretPin` — never stored; only its hash contributes to the derived public key
- The full attestation signature and the provider's choice (until the signature is verified in-circuit)

### Public (on the ledger)

- Derived `userPubKey` (`Bytes<32>`) — unlinkable from the wallet's Zswap key without the PIN
- `LoanStatus` and `authorizedAmount`
- Blacklist entries
- Registered provider ids + Jubjub public keys
- Admin address

### Leak Prevention

1. All witness-derived data that reaches ledger operations goes through `disclose()` — otherwise the compiler rejects the write
2. Credit evaluation is entirely off-chain; only the tier outcome is disclosed
3. PIN is hashed into the public key; rotating the PIN yields a brand-new, unlinkable identity (hence the `changePin` migration logic)

---

## Network Configurations

| Config | Indexer | Node | NetworkId | Use |
|---|---|---|---|---|
| Standalone | `http://localhost:8088` | `ws://localhost:9944` | Undeployed | Local docker-compose (see [standalone.yml](../zkloan-credit-scorer-cli/standalone.yml)) |
| TestnetLocal | `http://localhost:8088` | `ws://localhost:9944` | TestNet | Local proof server + remote testnet |
| TestnetRemote | `https://indexer.testnet-02.midnight.network` | `wss://rpc.testnet-02.midnight.network` | TestNet | Public testnet |

---

## Common Compact Patterns in This Project

### Access control
```compact
assert(ownPublicKey() == admin, "Only admin can blacklist users");
```

### Nested map init
```compact
if (!loans.member(requester)) {
    loans.insert(requester, default<Map<Uint<16>, LoanApplication>>);
}
```

### Auto-incrementing IDs
```compact
const loanNumber = (loans.lookup(requester).size() + 1) as Uint<16>;
```

### Blocking during migration
```compact
assert(!onGoingPinMigration.member(userPk), "PIN migration in progress");
```

### Fixed-size batch
```compact
for (const i of 0..5) {  // compile-time constant
    if (condition) { ... }
}
```

### JubjubPoint (0.22)
```compact
// Access coords via circuits, not .x / .y
const x: Field = jubjubPointX(point);
const y: Field = jubjubPointY(point);

// Equality: compare coords, not the whole point — the compiler emits `===`
// which is JS reference equality on the opaque object
assert(jubjubPointX(lhs) == jubjubPointX(rhs) &&
       jubjubPointY(lhs) == jubjubPointY(rhs),
       "points not equal");
```

---

## Known Limitations

1. Batch size for `changePin` is hardcoded at 5 per transaction
2. No loan repayment / settlement tracking — the contract models only application + response
3. A single provider signs the attestation; no multi-provider threshold or rotation of signed payload format
4. The attestation API is a demo-grade signer; in production it would need HSM-backed key custody and access control

---

## Dependencies

### Contract
- `@midnight-ntwrk/compact-runtime` — runtime for generated JS
- `vitest` — tests

### CLI
- `@midnight-ntwrk/midnight-js-contracts` — deploy / find / submit
- `@midnight-ntwrk/midnight-js-level-private-state-provider` — encrypted on-disk private state
- `@midnight-ntwrk/midnight-js-http-client-proof-provider` — proof server client
- `@midnight-ntwrk/midnight-js-indexer-public-data-provider` — ledger state reads
- `@midnight-ntwrk/midnight-js-node-zk-config-provider` — serves prover / verifier keys
- `@midnight-ntwrk/wallet-sdk-facade`, `@midnight-ntwrk/wallet-sdk-shielded`, `@midnight-ntwrk/wallet-sdk-unshielded-wallet`, `@midnight-ntwrk/wallet-sdk-dust-wallet`, `@midnight-ntwrk/wallet-sdk-hd` — wallet construction + balancing
- `@midnight-ntwrk/ledger-v8` — ledger types (addresses, fees, tx structures)
- `pino` — logger
- `testcontainers` — docker-driven tests

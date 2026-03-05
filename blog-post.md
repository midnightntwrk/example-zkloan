# Zero-Knowledge Credit Scoring: A Deep Dive into Compact Smart Contracts

*Building privacy-preserving lending on Midnight*

---

## Introduction

Lending has a privacy paradox. To get a loan, you must prove you're creditworthy. To prove you're creditworthy, you must expose your credit score, income, employment history, and other sensitive financial data. This information flows through credit bureaus, gets stored in centralized databases, and leaves you vulnerable to breaches, discrimination, and unwanted profiling.

Blockchain was supposed to help. Decentralized, immutable, trustless. But public ledgers made things worse for privacy—now everyone can see your transactions, balances, and interactions with financial contracts.

Midnight takes a different approach. Using zero-knowledge proofs (ZK proofs), Midnight allows you to prove facts about your data without revealing the data itself. You can prove "my credit score is above 700" without disclosing that it's exactly 742. You can prove "I earn enough to qualify" without exposing your payslip.

In this post, we'll explore how to build a privacy-preserving credit scoring system using **Compact**, Midnight's smart contract language. We'll examine the language features that make this possible and highlight design patterns you can reuse in your own contracts.

> **Note**: This is a demonstration project. The business logic is intentionally simplified to showcase Compact language features and ZK patterns. A production lending system would require significantly more sophisticated risk models, regulatory compliance, and security considerations.

---

## The Use Case: ZKLoan Credit Scorer

*An oversimplified lending scenario for demonstration purposes*

Imagine a lending protocol where:

- **Applicants** can request loans by proving they meet eligibility criteria
- **Lenders** see only the approval decision and authorized amount—not the underlying financial profile
- **Compliance** is maintained through an admin-controlled blacklist

For this demo, the system evaluates applicants across three simplified tiers (real credit scoring involves far more variables and sophisticated models):

| Tier | Requirements | Maximum Loan |
|------|-------------|--------------|
| Tier 1 | Credit score ≥ 700, Income ≥ $2,000/mo, Customer ≥ 24 months | $10,000 |
| Tier 2 | Credit score ≥ 600, Income ≥ $1,500/mo | $7,000 |
| Tier 3 | Credit score ≥ 580 | $3,000 |

The magic happens in what's disclosed versus what stays private:

- **Private**: Credit score (720), monthly income ($2,500), tenure (24 months), secret PIN
- **Public**: Loan status, authorized amount, user's pseudonymous identifier

**The Proposal Flow**: When a user requests more than their tier allows (e.g., requesting $15,000 when they qualify for $10,000), the system doesn't auto-approve a reduced amount. Instead, it creates a *proposal* showing the maximum eligible amount, letting the user decide whether to accept or decline. This transparent approach ensures users always have agency over their financial decisions.

The lender knows you qualified for Tier 1. They don't know your exact score is 720 or that you earn $2,500. The ZK proof guarantees you met the criteria—cryptographic proof, not trust.

---

## Compact Language Deep Dive

Compact is Midnight's domain-specific language for writing zero-knowledge smart contracts. It looks familiar to developers who know TypeScript or Rust, but introduces constructs specifically designed for privacy-preserving computation.

### Witnesses: Injecting Private Data

A **witness** is private data that exists only in the proof—it never touches the blockchain. In ZKLoan, the applicant's financial profile comes from a witness:

```compact
witness getRequesterScoringWitness(): Applicant;

struct Applicant {
    creditScore: Uint<16>;
    monthlyIncome: Uint<16>;
    monthsAsCustomer: Uint<16>;
}
```

When the user calls `requestLoan`, their wallet provides the witness data. The ZK circuit uses this data to evaluate eligibility, but only the result is published on-chain. The raw credit score, income, and tenure remain entirely off-chain.

### Circuits: ZK-Provable Computation

A **circuit** is a function that runs inside the zero-knowledge proof. All computation within a circuit is private unless explicitly disclosed.

```compact
circuit evaluateApplicant(): [Uint<16>, LoanStatus] {
    const profile = getRequesterScoringWitness();

    // Tier 1: Best applicants
    if (profile.creditScore >= 700 &&
        profile.monthlyIncome >= 2000 &&
        profile.monthsAsCustomer >= 24) {
        return [10000, LoanStatus.Approved];
    }
    // Tier 2: Good applicants
    else if (profile.creditScore >= 600 && profile.monthlyIncome >= 1500) {
        return [7000, LoanStatus.Approved];
    }
    // Tier 3: Basic eligibility
    else if (profile.creditScore >= 580) {
        return [3000, LoanStatus.Approved];
    }
    // Rejected
    else {
        return [0, LoanStatus.Rejected];
    }
}
```

This entire evaluation happens inside the proof. The blockchain never sees `profile.creditScore >= 700`—it only sees the returned tier amount and status after they're disclosed.

### Explicit Disclosure: The `disclose` Keyword

Compact requires **explicit disclosure**—a conscious acknowledgment that witness-derived data will become public. The `disclose()` wrapper doesn't cause disclosure itself; it tells the compiler "I understand this value will be revealed when stored to ledger, returned from a circuit, or passed to another contract."

Without `disclose()`, the compiler blocks any code path where witness data might become public. This ensures privacy by default—you can't accidentally expose sensitive information.

```compact
export circuit requestLoan(amountRequested: Uint<16>, secretPin: Uint<16>): [] {
    // Private computation
    const [topTierAmount, status] = evaluateApplicant();

    // Explicit disclosure - only these values become public
    const disclosedTopTierAmount = disclose(topTierAmount);
    const disclosedStatus = disclose(status);

    createLoan(disclose(requesterPubKey), amountRequested,
               disclosedTopTierAmount, disclosedStatus);
    return [];
}
```

Notice how `amountRequested` is a public parameter (the user openly states how much they want), but the evaluation of whether they qualify happens privately. The `disclose` calls make the decision public while keeping the reasoning private.

### Ledger State: On-Chain Storage

Compact provides familiar data structures for on-chain state:

```compact
export ledger blacklist: Set<ZswapCoinPublicKey>;
export ledger loans: Map<Bytes<32>, Map<Uint<16>, LoanApplication>>;
export ledger onGoingPinMigration: Map<Bytes<32>, Uint<16>>;
export ledger admin: ZswapCoinPublicKey;
```

- **Set**: Unordered collection of unique values (used for blacklist)
- **Map**: Key-value storage (used for loans per user)
- **Nested Maps**: `loans` maps user public keys to their loan history

### Identity: `ownPublicKey()` and Authorization

Every transaction on Midnight has a caller identity. The `ownPublicKey()` function returns the caller's Zswap public key, enabling authorization patterns:

```compact
export circuit blacklistUser(account: ZswapCoinPublicKey): [] {
    assert(ownPublicKey() == admin, "Only admin can blacklist users");
    blacklist.insert(disclose(account));
    return [];
}
```

This is similar to Solidity's `msg.sender`, but integrated with Midnight's shielded identity system.

---

## Design Patterns

Beyond the language features, ZKLoan demonstrates several patterns that are reusable across privacy-preserving applications.

### Pattern 1: PIN-Based Pseudonymous Identity

Rather than using wallet public keys directly as user identifiers, ZKLoan derives a pseudonymous identity from the combination of the wallet key and a secret PIN:

```compact
export circuit publicKey(sk: Bytes<32>, pin: Uint<16>): Bytes<32> {
    const pinBytes = persistentHash<Uint<16>>(pin);
    return persistentHash<Vector<3, Bytes<32>>>(
           [pad(32, "zk-credit-scorer:pk"), pinBytes, sk]);
}
```

**Why this pattern?**

1. **Identity rotation**: Users can change their PIN to get a new identifier without changing wallets
2. **Unlinkability**: Different PINs produce completely different identifiers, even for the same wallet
3. **Compartmentalization**: A user could have separate identities for different purposes

The `persistentHash` function is deterministic—the same inputs always produce the same output—so the derived public key is stable and can be used as a map key.

### Pattern 2: Migrating State in ZK Circuits

One of ZKLoan's most interesting features is PIN migration: users can change their PIN and have all their loans transferred to their new identity. This presents a challenge unique to ZK circuits.

**The Problem**

In traditional programming, you'd write:

```javascript
while (loansRemaining > 0) {
    migrateLoan(nextLoan);
}
```

But ZK circuits require **fixed iteration counts**. The circuit must be compiled to a fixed structure—there's no dynamic looping. If a user has 100 loans, you can't iterate 100 times in one proof.

**The Solution: Batched Migration with Progress Tracking**

ZKLoan solves this with a pattern that processes a fixed batch per transaction and tracks progress on-chain:

```compact
export circuit changePin(oldPin: Uint<16>, newPin: Uint<16>): [] {
    const oldPk = publicKey(zwapPublicKey.bytes, oldPin);
    const newPk = publicKey(zwapPublicKey.bytes, newPin);

    // Track migration progress in ledger state
    if (!onGoingPinMigration.member(disclose(oldPk))) {
        onGoingPinMigration.insert(disclose(oldPk), 0);
    }

    const lastMigrated = onGoingPinMigration.lookup(disclose(oldPk));

    // Process exactly 5 loans per transaction (fixed iteration)
    for (const i of 0..5) {
        if (onGoingPinMigration.member(disclose(oldPk))) {
            const sourceId = (lastMigrated + i + 1) as Uint<16>;

            if (loans.lookup(disclose(oldPk)).member(sourceId)) {
                // Migrate this loan
                const loan = loans.lookup(disclose(oldPk)).lookup(sourceId);
                loans.lookup(disclose(newPk)).insert(destinationId, disclose(loan));
                loans.lookup(disclose(oldPk)).remove(sourceId);
                onGoingPinMigration.insert(disclose(oldPk), sourceId);
            } else {
                // No more loans - clean up
                onGoingPinMigration.remove(disclose(oldPk));
            }
        }
    }
    return [];
}
```

**How It Works**

1. **Progress tracking**: `onGoingPinMigration` stores the last migrated loan ID
2. **Fixed batch size**: Each transaction migrates up to 5 loans (the `for 0..5` loop)
3. **Completion detection**: When no more loans exist at the next ID, migration is complete
4. **Cleanup**: The migration tracking entry is removed when done

**Why This Matters**

This pattern is reusable for any scenario where you need to move items from one location to another:

- Token migrations between contract versions
- Bulk transfers of NFTs or assets
- State reorganization after schema changes
- Archiving old records to new structures

The key insight is treating migration as a **multi-transaction process** with on-chain progress tracking, rather than trying to do everything in one proof.

### Pattern 3: Tiered Evaluation in Zero Knowledge

The credit scoring logic demonstrates how complex business rules can execute entirely within a ZK proof:

```compact
circuit evaluateApplicant(): [Uint<16>, LoanStatus] {
    const profile = getRequesterScoringWitness();

    if (profile.creditScore >= 700 &&
        profile.monthlyIncome >= 2000 &&
        profile.monthsAsCustomer >= 24) {
        return [10000, LoanStatus.Approved];
    }
    // ... more tiers
}
```

The entire decision tree—all the comparisons, the tier selection, the amount calculation—happens inside the proof. Observers see only the output. This pattern applies to any rule-based evaluation:

- KYC/AML compliance checks
- Insurance underwriting
- Access control decisions
- Auction bid validation

### Pattern 4: User-Controlled Proposal Acceptance

ZKLoan implements a proposal flow that gives users agency over adjusted loan amounts. When a user requests more than they qualify for, the loan enters a `Proposed` state rather than being auto-approved at a lower amount.

```compact
export enum LoanStatus {
    Approved,      // Loan granted as requested or accepted by user
    Rejected,      // Applicant not eligible
    Proposed,      // Offered amount differs from requested; awaiting user decision
    NotAccepted,   // User declined the proposed amount
}

circuit createLoan(requester: Bytes<32>, amountRequested: Uint<16>,
                   topTierAmount: Uint<16>, status: LoanStatus): [] {
    const authorizedAmount = amountRequested > topTierAmount
        ? topTierAmount : amountRequested;

    // Determine final status based on amount comparison
    const finalStatus = status == LoanStatus.Rejected
        ? LoanStatus.Rejected
        : (amountRequested > topTierAmount
            ? LoanStatus.Proposed
            : LoanStatus.Approved);

    const loan = LoanApplication {
        authorizedAmount: authorizedAmount,
        status: finalStatus,
    };
    // ... store loan
}
```

The user can then respond to the proposal:

```compact
export circuit respondToLoan(loanId: Uint<16>, secretPin: Uint<16>,
                             accept: Boolean): [] {
    // Verify user identity via PIN-derived public key
    const requesterPubKey = publicKey(ownPublicKey().bytes, secretPin);

    // Ensure loan exists and is in Proposed status
    const existingLoan = loans.lookup(requesterPubKey).lookup(loanId);
    assert(existingLoan.status == LoanStatus.Proposed,
           "Loan is not in Proposed status");

    // Update based on user's decision
    const updatedLoan = accept
        ? LoanApplication { authorizedAmount: existingLoan.authorizedAmount,
                           status: LoanStatus.Approved }
        : LoanApplication { authorizedAmount: 0,
                           status: LoanStatus.NotAccepted };

    loans.lookup(requesterPubKey).insert(loanId, disclose(updatedLoan));
}
```

**Why This Pattern?**

1. **User agency**: Users explicitly consent to different terms than requested
2. **Audit trail**: The ledger records both the proposal and the user's response
3. **No surprises**: Users aren't unexpectedly granted smaller amounts
4. **Regulatory alignment**: Financial products often require explicit acceptance of modified terms

This pattern applies broadly to any scenario involving negotiated outcomes:
- Insurance policy adjustments
- Subscription tier downgrades
- Resource allocation requests
- Bid modifications in auctions

---

## Privacy Boundaries Summary

Understanding what's private versus public is crucial when designing ZK applications:

| Private (in ZK proof) | Public (on ledger) |
|-----------------------|-------------------|
| Credit score | Authorized amount |
| Monthly income | Loan status (Approved/Rejected/Proposed/NotAccepted) |
| Months as customer | User's derived public key |
| Secret PIN | User's acceptance/decline decision |
| Tier qualification logic | Blacklist membership |
| Whether requested amount exceeded eligibility | Admin public key |

The ZK proof guarantees the private inputs satisfy the public outputs. A verifier knows that *some* valid credit profile led to this approval, without learning *which* profile. They can see that a loan was proposed and later accepted, but not why the original amount was reduced.

---

## TypeScript Integration

While Compact handles the ZK circuits, the TypeScript SDK connects your dApp to the blockchain. The stable SDK (v3.0.0+) uses a `CompiledContract` pattern that bundles your contract, witnesses, and ZK assets:

```typescript
import { CompiledContract } from '@midnight-ntwrk/compact-js';
import { deployContract } from '@midnight-ntwrk/midnight-js-contracts';

const zkLoanContract = CompiledContract.make('ZKLoanCreditScorer', Contract).pipe(
  CompiledContract.withWitnesses(witnesses),
  CompiledContract.withCompiledFileAssets(zkConfigPath),
);

const deployed = await deployContract(providers, {
  compiledContract: zkLoanContract,
  privateStateId: 'zkLoanCreditScorerPrivateState',
  initialPrivateState,
});
```

The `WalletProvider` interface handles transaction balancing—taking proven transactions and adding the necessary coin inputs/outputs before submission.

---

## Cryptographic Attestation with Schnorr Signatures

A critical question for any privacy-preserving system: how do you trust the private data? Without attestation, a malicious DApp could feed fabricated credit scores to the witness, bypassing the entire evaluation logic. ZKLoan solves this with a Schnorr signature scheme on the Jubjub curve.

### The Pattern: Off-Chain Signing, In-Circuit Verification

A trusted attestation provider signs the user's credit data off-chain. The smart contract then verifies this signature *inside the ZK circuit* before processing the loan. The signature itself stays private (it comes through the witness, not as a public parameter), which prevents brute-forcing the small credit score values from public signature data.

The signed message includes a `userPubKeyHash` that binds the attestation to a specific user, preventing replay attacks where one user's attestation could be used by another.

### Polyfilling Schnorr Verification

The Compact standard library will include `jubjubSchnorrVerify` in a future release. Until then, the contract implements a polyfill using existing primitives (`ecMulGenerator`, `ecMul`, `ecAdd`, `transientHash`). One subtlety: `transientHash` returns BLS12-381 Field values (~255 bits), but Jubjub EC operations require scalars under the subgroup order (~252 bits). The contract handles this through witness-assisted 248-bit truncation.

### Matching Hash Computation

The attestation API imports `pureCircuits.schnorrChallenge()` directly from the compiled contract. This guarantees the challenge hash is computed identically on both sides, eliminating a common source of signature verification bugs.

## Conclusion

Midnight and Compact enable a new category of applications: privacy-preserving smart contracts with the security guarantees of zero-knowledge proofs. While ZKLoan Credit Scorer uses a simplified lending scenario for demonstration, it showcases how sensitive financial operations can happen on-chain without exposing sensitive data—a pattern applicable to real-world use cases with proper business logic.

Key takeaways:

- **Witnesses** inject private data that never touches the blockchain
- **Circuits** perform computation inside ZK proofs
- **Explicit disclosure** with `disclose` controls exactly what becomes public
- **Fixed-iteration patterns** handle variable workloads across multiple transactions
- **Proposal flows** give users agency over adjusted terms while maintaining privacy
- **CompiledContract pattern** bundles contracts, witnesses, and ZK assets for the TypeScript SDK
- **Schnorr attestation** prevents fabricated credit data through in-circuit signature verification
- **User binding** in signed messages prevents cross-user replay attacks

The patterns shown here—pseudonymous identity derivation, batched state migration, private rule evaluation, user-controlled proposal acceptance, and cryptographic attestation—are building blocks for a wide range of privacy-preserving applications.

Ready to explore further? Check out the [ZKLoan Credit Scorer repository](https://github.com/midnight/zkloan-credit-scorer) to run the CLI, examine the tests, and experiment with the Compact contract yourself.

---

*Built on Midnight. Private by design.*

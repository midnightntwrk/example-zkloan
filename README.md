# The ZK Loan credit scorer dapp

**Attribution: This project is built on the Midnight Network.**

---

## Installation & Setup

### Prerequisites

- Node.js v22+
- npm v10+
- Docker + Docker Compose (for the local standalone network)
- Compact toolchain 0.30.0 — install with the [`compact` devtool](https://docs.midnight.network/develop/tutorial/building/prereqs#compact-developer-tools), then run `compact update` if needed. Verify with `compact compile --version` (should print `0.30.0`)
- For the remote testnet flow only: the [Midnight Lace wallet](https://chromewebstore.google.com/detail/lace/gafhhkghbfjjkeiendhlofajokpaflmk) browser extension

### Dependency versions

The project targets ledger v8 and the 4.x Midnight JS SDK. See [Midnight's compatibility matrix](https://docs.midnight.network/relnotes/overview) for the full list.

| Component | Version |
|---|---|
| `@midnight-ntwrk/ledger-v8` | 8.0.3 |
| `@midnight-ntwrk/compact-runtime` | 0.15.0 |
| `@midnight-ntwrk/compact-js` | 2.5.0 |
| `@midnight-ntwrk/midnight-js-*` | 4.0.4 |
| `@midnight-ntwrk/dapp-connector-api` | 4.0.1 |
| `@midnight-ntwrk/wallet-sdk-facade` / `dust-wallet` / `hd` | 3.0.0 |
| `@midnight-ntwrk/wallet-sdk-shielded` / `unshielded-wallet` | 2.1.0 |
| Compact toolchain (`compact compile`) | 0.30.0 |
| Compact language pragma | 0.22 |
| Proof server image | `midnightntwrk/proof-server:8.0.3` |
| Indexer image | `midnightntwrk/indexer-standalone:4.0.1` |
| Node image | `midnightntwrk/midnight-node:0.22.3` |

### 1. Install dependencies

From the repo root:

```bash
npm install
```

This installs all four workspaces (`contract`, `zkloan-credit-scorer-cli`, `zkloan-credit-scorer-ui`, `zkloan-credit-scorer-attestation-api`).

### 2. Compile and build the contract

Two steps — `compact compile` generates the Compact artifacts, then `tsc` packages them for the other workspaces to import:

```bash
cd contract
npm run compact   # generates src/managed/ (JS bindings + prover/verifier keys + ZK IR)
npm run build     # produces dist/ that CLI and UI consume
```

Optional — run the contract test suite:

```bash
npm test
```

### 3. Start the local standalone network

The standalone flow runs node + indexer + proof server locally via Docker Compose. The project ships a [`standalone.yml`](zkloan-credit-scorer-cli/standalone.yml) pinned to the versions above.

```bash
cd zkloan-credit-scorer-cli
docker compose -f standalone.yml up -d
```

Services come up on:

- Node: `ws://127.0.0.1:9944`
- Indexer: `http://127.0.0.1:8088`
- Proof server: `http://127.0.0.1:6300`

Wait ~15–20s for the node to become healthy (`docker compose -f standalone.yml ps`).

### 4. Run the CLI against the local network

```bash
cd zkloan-credit-scorer-cli
npm run standalone
```

The CLI uses a pre-funded hex seed against the local undeployed network, so no faucet or wallet extension is required.

On first run it prompts with:

```
1. Deploy a new ZKLoan Credit Scorer contract
2. Join an existing ZKLoan Credit Scorer contract
3. Exit
```

After deploying or joining you can request loans, respond to proposals, change PIN, display state, and run admin actions. **Save the deployed contract address** if you want to connect the UI to it.

#### Required env var: `MIDNIGHT_STORAGE_PASSWORD`

The level-private-state-provider encrypts the contract's private state (credit score, income, attestation signature) on disk. v4 of the provider enforces:

- ≥ 16 characters
- At least 3 of: uppercase, lowercase, digits, special chars
- No 4+ repeated identical chars in a row
- No 4+ sequential char codes (e.g. `abcd`, `1234`)

Set it in [`zkloan-credit-scorer-cli/.env`](zkloan-credit-scorer-cli/.env):

```bash
MIDNIGHT_STORAGE_PASSWORD="<a strong 16+ char password>"
# Optional — if unset, a random hex seed is used:
# WALLET_MNEMONIC="<24-word BIP39 mnemonic>"
```

Losing this password means losing access to encrypted private state on disk — the provider has no recovery mechanism.

### 5. Run against the remote testnet (optional)

If you want to deploy against a real testnet instead of the local standalone:

```bash
cd zkloan-credit-scorer-cli
npm run testnet-remote
```

Requirements:

- `WALLET_MNEMONIC` in `.env`
- tDUST in that wallet — get it from the [Midnight faucet](https://faucet.preview.midnight.network/)
- `MIDNIGHT_STORAGE_PASSWORD` as above

### 6. Run the UI

Dev server with hot reload (uses `testnet` mode by default):

```bash
cd zkloan-credit-scorer-ui
npm run dev              # testnet
npm run dev:standalone   # connect to the local docker network
```

Production build + preview:

```bash
npm run build            # builds testnet bundle
npm run preview
```

Available at `http://localhost:5173` (dev) or `http://localhost:4173` (preview).

**To connect:**

1. Open the UI in your browser.
2. In `testnet` mode, install the Midnight Lace wallet extension and connect it to the correct network. In `standalone` mode the UI talks directly to the local docker network and no browser wallet is needed.
3. Paste the deployed contract address into "Contract Connection" and click Connect.

### Project Structure

```
zkloan-credit-scorer/
├── contract/                    # Compact smart contract
│   ├── src/
│   │   ├── zkloan-credit-scorer.compact
│   │   ├── witnesses.ts         # TypeScript witness implementations
│   │   └── test/                # Contract tests
│   └── dist/                    # Compiled output
├── zkloan-credit-scorer-cli/    # Command-line interface
│   └── src/
│       ├── api.ts               # Contract deployment & interaction
│       ├── config.ts            # Network configurations
│       └── common-types.ts      # Shared type definitions
├── zkloan-credit-scorer-ui/     # React frontend
│   ├── src/
│   │   ├── components/          # UI components
│   │   ├── contexts/            # React context (ZKLoanContext)
│   │   └── utils/               # Utility functions
│   └── public/
│       ├── keys/                # Prover keys (copied during build)
│       └── zkir/                # ZK IR files (copied during build)
├── zkloan-credit-scorer-attestation-api/  # Attestation signing service
│   ├── src/
│   │   ├── index.ts               # Entry point
│   │   ├── server.ts              # Restify routes
│   │   ├── signing.ts             # Schnorr signing logic
│   │   └── types.ts               # Request/response types
│   └── test/
└── README.md
```

### Attestation Service

The attestation API is a trusted third-party service that signs credit data using Schnorr signatures on the Jubjub curve. The smart contract verifies these signatures inside the ZK circuit before processing loan applications, ensuring credit data cannot be fabricated by a malicious DApp.

#### Setup Flow

1. **Start the attestation API:**
   ```bash
   cd zkloan-credit-scorer-attestation-api
   npm run dev
   ```

2. **Register the provider on-chain** (admin only):
   ```
   # Use the public key printed at API startup
   registerProvider(providerId, providerPublicKey)
   ```

3. **Request attestation** (from your DApp):
   ```bash
   curl -X POST http://localhost:3000/attest \
     -H "Content-Type: application/json" \
     -d '{"creditScore":720,"monthlyIncome":2500,"monthsAsCustomer":24,"userPubKeyHash":"..."}'
   ```

4. **Apply for loan** using the attestation signature in private state

#### Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `PORT` | API server port | `3000` |
| `PROVIDER_ID` | Provider identifier (registered on-chain) | `1` |
| `PROVIDER_SECRET_KEY` | Provider signing key (hex) | Auto-generated |

---



## The Rationale of the ZKLoan Credit Scorer Example

The ZK Loan Credit Scorer is a decentralized application (DApp) designed to serve as a practical example of building on the Midnight stack. It showcases the powerful privacy-preserving capabilities of the Compact smart contract language and the MidnightJS library. The primary purpose of this application is to demonstrate how Midnight can apply the principle of rational privacy to solve real-world challenges, particularly in sensitive domains like financial services.


### The Problem with Traditional Credit Scoring

In the conventional financial world, applying for a loan is an invasive process. An individual must disclose a significant amount of sensitive, personally identifiable information (PII) to a lending institution. This data often includes their credit score, income, address, and employment history. This information is then processed and stored in centralized databases, creating several critical problems:

- Data Security Risks: Centralized servers are high-value targets for malicious actors. A single data breach can expose the sensitive financial information of thousands or even millions of users.

- Lack of User Control: Once submitted, users lose control over their data. They have little to no visibility into how it is stored, who has access to it, or how it is being used.

- Unnecessary Disclosure: Often, the lending institution only needs to verify a few key assertions (e.g., "Is the applicant's credit score above 700?") but ends up collecting and storing the entire dataset, which is far more information than is strictly necessary for the decision.


### Midnight's Solution: Rational Privacy in Action

The ZKLoan Credit Scorer DApp directly addresses these issues by reimagining the credit evaluation process. It provides a clear example of how to build applications that can perform complex business logic on sensitive data without that data ever being exposed on a public ledger.

This is made possible by Midnight's unique architecture, which is powered by the Kachina model for smart contracts. This model allows a contract to manage two distinct states simultaneously: a private state that remains securely on the user's local machine and a public state that is recorded on the blockchain.

In the context of the ZKLoan DApp:

- The Private State: The user's sensitive financial profile, defined by the Applicant struct (creditScore, monthlyIncome, etc.), is the private state. It is provided to the contract's logic as a witness and is never transmitted to the network.

- The Public State: The final, non-sensitive outcome of the loan application is the public state, which is verifiably recorded on the ledger. The LoanApplication struct contains the authorized amount and a status that can be one of four values:
  - `Approved`: The loan was granted as requested (or accepted by the user after a proposal)
  - `Rejected`: The applicant did not meet minimum eligibility requirements
  - `Proposed`: The requested amount exceeded the user's eligible tier; awaiting user decision
  - `NotAccepted`: The user declined a proposed loan offer

The bridge between these two worlds is the zero-knowledge proof. The contract's logic executes off-chain, evaluating the user's private data and generating a cryptographic proof. This proof confirms that the evaluation was performed correctly according to the predefined rules, without revealing any of the underlying private information. The on-chain component of the contract simply verifies this proof before updating the public ledger, ensuring both privacy and integrity.

This elegant separation of concerns is why Midnight serves this purpose so well. It moves beyond the all-or-nothing privacy models of other blockchains, allowing developers to build applications that are both functional and confidential, striking the perfect balance needed for real-world adoption.

Disclaimer: Please consider this DApp as a pure example intended for educational purposes and inspiration. It demonstrates key features of the Midnight platform and the Compact language. However, it is not intended to be used in a production environment. Some of the business logic and security patterns represented in the example have been simplified for clarity and may not be sufficiently robust for a real-world financial application.

***


## 2. Goals of the Example

The ZKLoan Credit Scorer is designed to achieve two primary educational goals for developers new to the Midnight ecosystem. It demonstrates how to securely process private data within a smart contract and how to manage a moderately complex, relational data structure on the public ledger.


### Goal 1: Demonstrating Private Data Processing

A core objective of this example is to provide a clear, practical template for handling sensitive user information. It shows how to build business logic that depends on confidential data without ever exposing that data on-chain. This is the essence of building privacy-preserving DApps on Midnight.

The contract achieves this through a distinct pattern:

- Defining the Private Schema: The Applicant struct formally defines the structure of the user's private data, including their creditScore, monthlyIncome, and monthsAsCustomer. This data is intended to exist only in the user's off-chain environment.

- Securely Inputting Private Data: The getRequesterScoringWitness() function serves as the secure gateway for this private data. It is a declaration that tells the Compact compiler that the DApp will provide an

- Applicant object during the off-chain proof generation phase.

- Executing Confidential Logic: The evaluateApplicant circuit is the heart of the private computation. It calls the witness to fetch the user's private

- profile and executes the multi-tiered credit evaluation logic based on that data. Crucially, this entire circuit runs off-chain; its logic and the private data it processes are never seen by the public network. Only the

- _Result_, the approved loan amount and status is returned.

This deliberate separation showcases how developers can build powerful applications that can be trusted to make decisions based on sensitive information while providing cryptographic guarantees that the information itself remains completely private.


### Goal 2: Managing Complex Public State

The second goal is to move beyond simple key-value storage and demonstrate a more realistic on-chain data architecture using Midnight's built-in Ledger Abstract Data Types (ADTs). The example uses a nested map to create a relational structure that associates users with their multiple loan applications.

The key public state in the contract is the loans ledger:

Code snippet

```
export ledger loans: Map<Bytes<32>, Map<Uint<16>, LoanApplication>>;
```

This structure is a powerful example of how to organize complex data on-chain:

- The Outer Map (User Directory): The first layer of the map uses a Bytes<32> key. This key is a unique, privacy-preserving public identifier derived from the user's underlying Zswap key and their secret PIN. It acts as the primary key for a user, mapping their identifier to their personal collection of loans.

- The Inner Map (User's Loan History): The value associated with each user is another Map. This nested map allows a single user to have multiple, distinct loan applications.

  - The key of this inner map is a Uint<16>, which functions as an auto-incrementing loanId for each new application.

  - The value is the LoanApplication struct, containing the public, non-sensitive outcome of that specific loan evaluation.

The contract demonstrates how to interact with this nested structure using standard Ledger ADT methods like

`.member()` to check for existence, `.insert()` to add new data, `.lookup()` to access nested data, and `.size()` to count items. Additionally, the

`onGoingPinMigration` ledger is used to showcase state management for more complex, multi-transaction processes like the batched changePin functionality


#### Goal 3: Demonstrating Ledger Item Migration

The third goal is to illustrate an advanced, but common, pattern in ZK-based smart contracts: migrating a collection of ledger items associated with one key to another. This is demonstrated through the changePin circuit, which allows a user to change their secret PIN, effectively changing their public identifier, without losing their loan history.

Because Compact circuits cannot iterate over collections of a variable, runtime-deﬁned size, a simple loop to move all of a user's loans is not possible. The example solves this with a hybrid batched migration pattern:

- Fixed-Batch On-Chain Logic: The changePin circuit is designed to process a fixed-size batch of loans in a single transaction. It uses a for...of loop over a Vector of a constant size, which is a valid operation in Compact. The onGoingPinMigration ledger is used to track the last migrated loan ID, allowing subsequent calls to the circuit to pick up where the last one left off.

- Off-Chain Orchestration: The responsibility for iterating through _all_ of a user's loans is moved to the off-chain DApp (written in TypeScript). The DApp reads the total number of loans and then calls the changePin circuit repeatedly in separate transactions, each time processing the next batch until the entire migration is complete.

This pattern is a crucial technique for developers to understand, as it provides a scalable and secure way to perform bulk operations on on-chain data collections while adhering to the fixed-computation constraints required for generating zero-knowledge proofs

Of course. Here is the documentation for the third item, "Contract features".

***


### 3. Contract Features

The ZKLoan Credit Scorer contract is designed with two distinct roles: the User (or applicant) and the Admin. Each role has access to a specific set of actions that govern the lifecycle of a loan application and the administration of the DApp. The user flow is designed to be straightforward for applicants while providing the necessary administrative controls to maintain the integrity of the system.


#### The User Role

The primary user of the DApp is an individual seeking a loan. Their interactions are focused on managing their application and their identity within the system. A user is identified not by a traditional username, but by a privacy-preserving public key derived from their underlying Zswap wallet key and a secret PIN. This ensures that their on-chain activities are not directly linkable to their real-world identity.

User Actions:

- Requesting a Loan (requestLoan): This is the core function for a user. To apply for a loan, the user provides two public inputs: the amountRequested and their secretPin. The contract then executes the private credit evaluation, generates a zero-knowledge proof, and records the public outcome on the ledger. This action is atomic; a user cannot request a loan if their public key is on the blacklist or if they have a PIN change in progress.

  **Important**: If the requested amount exceeds the user's eligible tier maximum, the loan is not auto-approved at a reduced amount. Instead, it enters a `Proposed` status, allowing the user to review and explicitly accept or decline the offered amount.

- Responding to a Loan Proposal (respondToLoan): When a loan is in `Proposed` status (because the requested amount exceeded the user's eligibility), the user must explicitly respond. This circuit takes the loanId, the user's secretPin, and a boolean accept parameter. If the user accepts, the loan status changes to `Approved`. If declined, the status becomes `NotAccepted` and the authorized amount is set to zero. This ensures users always have agency over their financial decisions and are never surprised by receiving less than they requested.

- Changing a PIN (changePin): A user can change the secret PIN associated with their public identifier. This is a crucial feature for account security and recovery. Because a user can have multiple loan applications, this action is designed as a multi-transaction, batched process. The user calls the changePin circuit repeatedly. In each call, the circuit migrates a fixed-size batch of their loan records from the old public key to the new one. The onGoingPinMigration ledger tracks the progress, ensuring the migration can be safely paused and resumed. This batched approach is a necessary design pattern to handle an unknown number of on-chain records without violating the fixed-computation limits of a zero-knowledge circuit.


#### The Admin Role

The Admin role is responsible for the overall health and security of the DApp. The address of the admin is set once and immutably in the contract's constructor when it is first deployed. Only the account corresponding to this admin address can perform administrative actions.

Admin Actions:

- Blacklisting a User (blacklistUser): The admin has the authority to add a user's Zswap public key to the on-chain blacklist. This is a security feature to prevent malicious or non-compliant actors from interacting with the DApp. A user on the blacklist will not be able to submit a loan application.

- Removing a User from the Blacklist (removeBlacklistUser): The admin can also remove a user from the blacklist, restoring their ability to apply for loans.

This simple but effective role-based access control ensures that the DApp can be managed securely while the core user-facing functionality remains decentralized and permissionless for all non-blacklisted participants.


### 4. Circuit Logic and Design Decisions

This section provides a detailed breakdown of each circuit within the ZKLoan Credit Scorer contract. The design of these circuits balances the need for complex business logic with the strict requirements of zero-knowledge proof systems, resulting in a secure and efficient application.



#### evaluateApplicant Circuit

Logic:

Code snippet

```
circuit evaluateApplicant(): [Uint<16>, LoanStatus] {

     const profile = getRequesterScoringWitness();

    // Tier 1: Best applicants
    if (profile.creditScore >= 700 && profile.monthlyIncome >= 2000 && profile.monthsAsCustomer >= 24) {
        return [10000, LoanStatus.Approved];

    }

    // ... other tiers ...

    else {
        return [0, LoanStatus.Rejected];
    }

}
```

Design Decisions: This circuit represents the core of the DApp's confidential business logic. Its design is centered on the principle of separating private computation from public state changes.

- Off-Chain Execution: This circuit is designed to be executed entirely off-chain. It takes the user's private financial data from the getRequesterScoringWitness and performs the multi-tiered loan eligibility check.

- No Public State Interaction: Notice that this circuit does not interact with any ledger variables. This is a deliberate choice to keep it "pure" in terms of its interaction with the public state, ensuring that no private data can accidentally leak during the evaluation.

- Returning Only the Outcome: The circuit is designed to return only the final, non-sensitive results of the evaluation: the maximum loan amount (topTierAmount) and the LoanStatus. This minimal output is all that's needed for the on-chain part of the transaction.


#### createLoan Circuit

Logic:

Code snippet

```
circuit createLoan(requester: Bytes<32>, amountRequested: Uint<16>, topTierAmount: Uint<16>, status: LoanStatus): \[] {

    const authorizedAmount = amountRequested > topTierAmount ? topTierAmount : amountRequested;

    if(!loans.member(requester)) {

        loans.insert(requester, default\<Map\<Uint<16>, LoanApplication>>);

    }

    const userLoans = loans.lookup(requester);
    const totalLoans = userLoans.size();
    const loanNumber = totalLoans + 1;
    const loan = LoanApplication { ... };

    userLoans.insert(loanNumber as Uint<16>, disclose(loan));  

    return [];

}
```

Design Decisions: This circuit is responsible for all interactions with the loans ledger. Its design focuses on correctly managing the nested map data structure.

- Auto-Incrementing loanId: The loanNumber is calculated by reading the current size() of the user's inner loan map and adding one. This provides a simple and effective way to generate a unique, sequential ID for each new loan a user requests.

- Handling New Users: The if(!loans.member(requester)) check is crucial. Before attempting to add a loan, the circuit checks if the user has an existing entry in the outer map. If not, it first initializes their personal inner Map for loans, preventing errors.

- Explicit Disclosure: The final disclose(loan) call is a critical part of the design. The `disclose()` wrapper doesn't cause disclosure itself—it's a conscious acknowledgment that the LoanApplication object (derived from private evaluation) will become public when written to the ledger. Without this wrapper, the compiler would reject the code to prevent accidental exposure of witness data.

- Proposal Flow Logic: The circuit now determines the final loan status based on whether the requested amount exceeds the user's eligible tier maximum. If `amountRequested > topTierAmount`, the loan enters `Proposed` status instead of being auto-approved at a reduced amount. This design gives users explicit control over accepting different terms than they originally requested.


#### respondToLoan Circuit

Logic:

Code snippet

```
export circuit respondToLoan(loanId: Uint<16>, secretPin: Uint<16>, accept: Boolean): [] {
    const zwapPublicKey = ownPublicKey();
    const requesterPubKey = publicKey(zwapPublicKey.bytes, secretPin);

    assert(!blacklist.member(zwapPublicKey), "User is blacklisted");
    assert(loans.member(requesterPubKey), "No loans found for this user");
    assert(loans.lookup(requesterPubKey).member(loanId), "Loan not found");

    const existingLoan = loans.lookup(requesterPubKey).lookup(loanId);
    assert(existingLoan.status == LoanStatus.Proposed, "Loan is not in Proposed status");

    const updatedLoan = accept
        ? LoanApplication { authorizedAmount: existingLoan.authorizedAmount, status: LoanStatus.Approved }
        : LoanApplication { authorizedAmount: 0, status: LoanStatus.NotAccepted };

    loans.lookup(requesterPubKey).insert(loanId, disclose(updatedLoan));
    return [];
}
```

Design Decisions: This circuit enables users to respond to loan proposals, completing the two-phase approval flow for cases where the requested amount exceeded eligibility.

- User Agency: Rather than auto-approving loans at reduced amounts, this circuit gives users explicit control. They can review the proposed amount and make an informed decision to accept or decline.

- Identity Verification: The circuit derives the user's public key from their Zswap key and PIN, ensuring only the loan owner can respond to their proposals.

- State Validation: Multiple assertions ensure the loan exists and is in the correct `Proposed` status before allowing any modification.

- Clean State Transitions: If accepted, the loan moves to `Approved` with the original authorized amount preserved. If declined, the loan moves to `NotAccepted` with the amount set to zero, providing a clear audit trail of the user's decision.


#### requestLoan Circuit

Logic:

Code snippet

```
export circuit requestLoan(amountRequested:Uint<16>, secretPin: Uint<16>):\[] {
    const zwapPublicKey = ownPublicKey();
    const requesterPubKey = publicKey(zwapPublicKey.bytes, secretPin);

    assert (!blacklist.member(zwapPublicKey), "Requester is blacklisted");

    // ...

    const [topTierAmount, status] = evaluateApplicant();
    const disclosedTopTierAmount = disclose(topTierAmount);
    const disclosedStatus = disclose(status);
    createLoan(disclose(requesterPubKey), amountRequested, disclosedTopTierAmount, disclosedStatus);

    return [];

}
```

Design Decisions: This circuit acts as the main entry point and orchestrator for the loan application process. Its design is to safely manage the flow of data from private inputs to public outputs.

- Orchestration Role: It doesn't contain the core business logic itself but instead calls other specialized circuits (publicKey, evaluateApplicant, createLoan) to perform specific tasks. This separation of concerns makes the contract cleaner and easier to maintain.

- Safety Checks: It performs initial safety checks, such as verifying that the user is not on the blacklist and is not in the middle of a PIN change, ensuring the integrity of the system before proceeding with the more computationally expensive evaluation.

- Managing Disclosure: This circuit is where the programmer consciously acknowledges what will become public. It takes the private results from evaluateApplicant and wraps them with `disclose()` to signal that these values are intentionally being passed to operations that will make them public (the createLoan circuit writes to the ledger). This is the central point of control for the contract's privacy—without these `disclose()` calls, the compiler would reject the code.


#### changePin Circuit

Logic:

Code snippet

```
export circuit changePin(oldPin: Uint<16>, newPin: Uint<16>): \[] {
    const zwapPublicKey = ownPublicKey();
    const oldPk = publicKey(zwapPublicKey.bytes, oldPin);
    const newPk = publicKey(zwapPublicKey.bytes, newPin);

    // ... safety checks and initialization ...

    const lastMigratedLoan = onGoingPinMigration.lookup(disclose(oldPk));
    // Vector of fixed size 5 is created

    const loansIds: Vector<5, Uint<16>> = \[
        (lastMigratedLoan + 1) as Uint<16>,
        // ... and so on for 5 elements

    ];

    for (const currentLoan of loansIds) {
        if (loans.lookup(oldPk).member(currentLoan)) {
            // ... move the loan from oldPk to newPk ...
            onGoingPinMigration.insert(disclose(oldPk), currentLoan);

        } else {
            // If a loanId is not found, it signals the end of the migration.
            onGoingPinMigration.remove(disclose(oldPk));
            loans.remove(disclose(oldPk));
            return \[];

        }

    }

    // ...

}
```

Design Decisions:

This circuit is the most technically complex part of the DApp and demonstrates an advanced but essential pattern for handling on-chain collections in a ZK environment.

- The "No Variable Loop" Constraint: The entire design is built around a fundamental rule of Compact: circuits cannot have loops that run a variable number of times. This is because the computational cost of a circuit must be fixed at compile time to generate a valid and secure zero-knowledge proof.

- The Batched Migration Pattern: To work around this, the circuit is designed to migrate a fixed-size batch of 5 loans in a single transaction. This is enforced by defining the loansIds variable as a Vector<5, Uint<16>>. Because the size is a compile-time constant, the subsequent for...of loop has a predictable, fixed workload, which is a valid operation in Compact.

- Stateful Progress Tracking: The onGoingPinMigration ledger is a critical design element. It stores the ID of the last loan that was successfully migrated for a user. This allows the DApp to call the changePin circuit multiple times. Each call uses this ledger to determine the starting point for the next batch of 5 loans, creating a resilient, multi-transaction workflow that can handle any number of total loans.

- Calculating loansIds: The loansIds vector is constructed directly in a single expression: \[(lastMigratedLoan + 1) as Uint<16>, ...]. This design is a direct consequence of another Compact rule: you cannot assign values to a Vector's elements using a variable index inside a loop. By constructing the vector all at once, we create a valid, fixed-size collection that can then be iterated over. The explicit as Uint<16> casts are necessary to override the compiler's automatic type widening during arithmetic operations, ensuring the types match the Vector's declaration.

- Signaling Migration Completion: The circuit includes a clever mechanism to signal that all loans have been migrated. When the for loop attempts to process a loanId that does not exist in the user's old loan map, the else block is triggered. This block cleans up the state by removing the user's now-empty old loan map and their entry in the onGoingPinMigration tracker, gracefully concluding the process.

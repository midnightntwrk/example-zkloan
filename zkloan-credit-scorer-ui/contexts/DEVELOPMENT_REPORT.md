# ZKLoan Credit Scorer UI - Development Report

**Created:** December 22, 2025
**Project:** Privacy-Preserving Credit Scoring UI for Midnight Blockchain
**Status:** Functional (TypeScript passes, dev server runs)

---

## Table of Contents

1. [Executive Summary](#executive-summary)
2. [Project Overview](#project-overview)
3. [Architecture & Design Decisions](#architecture--design-decisions)
4. [Directory Structure](#directory-structure)
5. [File-by-File Documentation](#file-by-file-documentation)
6. [Dependencies & Versions](#dependencies--versions)
7. [Key Learnings & Fixes](#key-learnings--fixes)
8. [Integration with Midnight](#integration-with-midnight)
9. [Component Reference](#component-reference)
10. [Known Limitations](#known-limitations)
11. [Future Improvements](#future-improvements)
12. [How to Run](#how-to-run)

---

## Executive Summary

This UI was created as a simple React frontend for the ZKLoan Credit Scorer smart contract built on Midnight blockchain. The UI allows users to:

1. Select from predefined user profiles with different credit scores
2. View their "private state" (credit score, income, tenure) that will be used in ZK proofs
3. Deploy new contracts or join existing ones via the Midnight Lace wallet
4. Submit loan requests that are processed using zero-knowledge proofs

The UI was built by adapting patterns from the `bboard-ui` (bulletin board) example application, but using the same library versions as the `zkloan-credit-scorer-cli` to ensure compatibility.

---

## Project Overview

### Purpose

The ZKLoan Credit Scorer demonstrates privacy-preserving lending where:
- **Private data** (credit score, income, tenure) never leaves the user's device
- **ZK proofs** verify that the user meets eligibility criteria
- **Only the result** (approved/rejected, tier amount) is disclosed on-chain

### Tech Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| React | 19.2.0 | UI framework |
| TypeScript | 5.9.3 | Type safety |
| Vite | 6.4.1 | Build tool & dev server |
| MUI (Material UI) | 7.3.6 | Component library |
| RxJS | 7.8.1 | Reactive state management |
| Midnight SDK | 3.0.0-alpha.10 | Blockchain integration |

### Reference Projects

- **bboard-ui**: Used as architectural reference for wallet connection and context patterns
- **zkloan-credit-scorer-cli**: Used for library versions and contract interaction patterns
- **contract/**: The Compact smart contract being integrated

---

## Architecture & Design Decisions

### 1. Context-Based State Management

We use React Context + RxJS BehaviorSubject for state management:

```
ZKLoanProvider (Context)
├── privateState (useState) - User's credit profile
├── deploymentSubject (BehaviorSubject) - Contract deployment status
├── contract (useState) - Deployed contract instance
├── isConnected (useState) - Wallet connection status
└── walletAddress (useState) - Connected wallet address
```

**Why this pattern?**
- RxJS Observables work well with Midnight's async APIs
- BehaviorSubject allows components to subscribe to deployment status changes
- React Context provides dependency injection for the wallet connection

### 2. Wallet Connection via Lace DApp Connector

The UI connects to Midnight through the Lace wallet browser extension using the DApp Connector API:

```typescript
window.midnight?.mnLace  // DApp Connector API entry point
```

The connection flow:
1. Poll for `window.midnight.mnLace` every 100ms
2. Check API version compatibility (`1.x`)
3. Request wallet authorization via `connectorAPI.enable()`
4. Retrieve service URIs (indexer, prover server)
5. Initialize providers for contract interaction

### 3. Provider Architecture

The UI initializes the same providers used by the CLI:

```typescript
{
  privateStateProvider,   // Stores private state locally (IndexedDB)
  zkConfigProvider,       // Fetches ZK keys from server
  proofProvider,          // HTTP client to proof server
  publicDataProvider,     // Indexer for blockchain data
  walletProvider,         // Transaction balancing via Lace
  midnightProvider,       // Transaction submission via Lace
}
```

### 4. Profile-Based Private State

Instead of free-form input, we use predefined profiles from `state.utils.ts`:

```typescript
const userProfiles = [
  { applicantId: 'user-001', creditScore: 720, monthlyIncome: 2500, monthsAsCustomer: 24 },
  { applicantId: 'user-002', creditScore: 650, monthlyIncome: 1800, monthsAsCustomer: 11 },
  // ... 8 more profiles
];
```

**Why profiles?**
- Demonstrates different tier outcomes
- Simpler UX for demo purposes
- Matches test data in CLI

---

## Directory Structure

```
zkloan-credit-scorer-ui/
├── package.json              # Dependencies and scripts
├── tsconfig.json             # TypeScript config
├── tsconfig.node.json        # TypeScript config for Vite
├── vite.config.ts            # Vite configuration with WASM support
├── index.html                # HTML entry point
├── .env.testnet              # Environment variables
│
├── contexts/                 # Documentation (this folder)
│   └── DEVELOPMENT_REPORT.md # This file
│
└── src/
    ├── main.tsx              # Application entry point
    ├── App.tsx               # Root component
    ├── globals.ts            # Global polyfills (Buffer, process.env)
    ├── vite-env.d.ts         # Vite type declarations
    │
    ├── config/
    │   └── theme.ts          # MUI dark theme configuration
    │
    ├── contexts/
    │   ├── index.ts          # Context exports
    │   └── ZKLoanContext.tsx # Main context provider (wallet, contract)
    │
    ├── hooks/
    │   ├── index.ts          # Hook exports
    │   └── useZKLoanContext.ts # Context consumer hook
    │
    └── components/
        ├── index.ts          # Component exports
        ├── PrivateStateCard.tsx   # Profile selector + credit display
        ├── LoanRequestForm.tsx    # Contract deploy/join + loan form
        │
        └── Layout/
            ├── index.ts      # Layout exports
            ├── MainLayout.tsx # Page wrapper with header
            └── Header.tsx     # App bar with connection status
```

---

## File-by-File Documentation

### `package.json`

```json
{
  "name": "zkloan-credit-scorer-ui",
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite --mode testnet",
    "build": "tsc && vite build --mode testnet",
    "typecheck": "tsc -p tsconfig.json --noEmit"
  }
}
```

**Key dependencies:**
- Uses `zkloan-credit-scorer-contract` via `file:../contract` for local contract package
- Midnight SDK packages at `3.0.0-alpha.10` (matching CLI)
- `@midnight-ntwrk/ledger-v6` at `6.1.0-alpha.6` (important: not the old `@midnight-ntwrk/ledger`)

### `vite.config.ts`

Critical configuration for Midnight WASM modules:

```typescript
plugins: [
  react(),
  wasm(),                    // WASM support
  topLevelAwait(),           // Required for WASM modules
  {
    name: 'wasm-module-resolver',
    // Special handling for @midnight-ntwrk/onchain-runtime
  },
],
optimizeDeps: {
  include: ['@midnight-ntwrk/compact-runtime'],
  exclude: [
    '@midnight-ntwrk/onchain-runtime',
    // ... WASM files
  ],
}
```

### `src/globals.ts`

Polyfills required for Midnight SDK in browser:

```typescript
import { Buffer } from 'buffer';

// Map Vite's MODE to process.env.NODE_ENV
globalThis.process = { env: { NODE_ENV: import.meta.env.MODE } };

// Buffer polyfill
globalThis.Buffer = Buffer;
```

**Must be imported first in `main.tsx`**

### `src/contexts/ZKLoanContext.tsx`

The main context provider handling:

1. **Wallet Connection**: Polls for Lace, checks version, requests auth
2. **Provider Initialization**: Sets up all Midnight providers
3. **Contract Deployment**: Deploys new contracts via `deployContract()`
4. **Contract Joining**: Joins existing contracts via `findDeployedContract()`
5. **Loan Requests**: Calls `contract.callTx.requestLoan(amount, pin)`

**Exported interface:**

```typescript
interface ZKLoanAPIProvider {
  deployment$: Observable<ZKLoanDeployment>;  // in-progress | deployed | failed
  privateState: ZKLoanCreditScorerPrivateState;
  setPrivateState: (state) => void;
  deploy: () => void;
  join: (contractAddress) => void;
  requestLoan: (amount, pin) => Promise<void>;
  isConnected: boolean;
  walletAddress: string | null;
}
```

### `src/components/PrivateStateCard.tsx`

Displays the user's private state (never sent to blockchain):

- **Profile Selector**: Dropdown with 10 predefined profiles
- **Stats Display**: Credit score, monthly income, months as customer
- **Tier Preview**: Shows expected qualification based on scoring rules:
  - Tier 1: Score ≥700, Income ≥$2000, Tenure ≥24mo → $10,000 max
  - Tier 2: Score ≥600, Income ≥$1500 → $7,000 max
  - Tier 3: Score ≥580 → $3,000 max
  - Rejected: Below thresholds

### `src/components/LoanRequestForm.tsx`

Handles contract interaction:

1. **Before Deployment**: Shows "Deploy New" button + contract address input for joining
2. **After Deployment**: Shows loan request form with amount + PIN inputs
3. **Status Display**: Loading spinner, error messages, success feedback

---

## Dependencies & Versions

### Midnight SDK Packages (Must Match CLI)

```json
{
  "@midnight-ntwrk/compact-runtime": "^0.11.0-rc.1",
  "@midnight-ntwrk/dapp-connector-api": "^1.1.0",
  "@midnight-ntwrk/ledger-v6": "6.1.0-alpha.6",
  "@midnight-ntwrk/midnight-js-contracts": "^3.0.0-alpha.10",
  "@midnight-ntwrk/midnight-js-fetch-zk-config-provider": "^3.0.0-alpha.10",
  "@midnight-ntwrk/midnight-js-http-client-proof-provider": "^3.0.0-alpha.10",
  "@midnight-ntwrk/midnight-js-indexer-public-data-provider": "^3.0.0-alpha.10",
  "@midnight-ntwrk/midnight-js-level-private-state-provider": "^3.0.0-alpha.10",
  "@midnight-ntwrk/midnight-js-network-id": "^3.0.0-alpha.10",
  "@midnight-ntwrk/midnight-js-types": "^3.0.0-alpha.10"
}
```

### React & UI

```json
{
  "react": "^19.2.0",
  "react-dom": "^19.2.3",
  "@mui/material": "^7.3.6",
  "@mui/icons-material": "^7.3.6",
  "@emotion/react": "^11.14.0",
  "@emotion/styled": "^11.14.0"
}
```

### Build Tools

```json
{
  "vite": "^6.3.5",
  "vite-plugin-wasm": "^3.4.1",
  "vite-plugin-top-level-await": "^1.5.0",
  "typescript": "^5.9.3",
  "@vitejs/plugin-react": "^5.1.2"
}
```

---

## Key Learnings & Fixes

### 1. Package Version Mismatch

**Problem**: Initially tried using `@midnight-ntwrk/ledger` and `@midnight-ntwrk/zswap` from bboard-ui.

**Error**:
```
npm error notarget No matching version found for @midnight-ntwrk/ledger@^6.0.0-alpha.9
```

**Solution**: The new SDK uses `@midnight-ntwrk/ledger-v6` instead. Check what packages the CLI uses:
```bash
grep -r "from '@midnight-ntwrk/ledger" zkloan-credit-scorer-cli/src/
# Output: import * as ledger from '@midnight-ntwrk/ledger-v6';
```

**Learning**: Always use the same package versions as the working CLI.

---

### 2. Network ID API Changes

**Problem**: bboard-ui used `getLedgerNetworkId()` and `getZswapNetworkId()`.

**Error**:
```
error TS2724: '"@midnight-ntwrk/midnight-js-network-id"' has no exported member named 'getLedgerNetworkId'
```

**Solution**: The new API only exports `getNetworkId()`:
```typescript
// Old (bboard-ui):
import { getLedgerNetworkId, getZswapNetworkId } from '@midnight-ntwrk/midnight-js-network-id';

// New:
import { getNetworkId } from '@midnight-ntwrk/midnight-js-network-id';
```

---

### 3. Transaction Types Changed

**Problem**: bboard-ui used `BalancedTransaction`, `UnbalancedTransaction`, `createBalancedTx`.

**Error**:
```
error TS2305: Module '"@midnight-ntwrk/midnight-js-types"' has no exported member 'BalancedTransaction'
```

**Solution**: The new SDK uses different types:
- `UnprovenTransaction` - Transaction before proving
- `ProvenTransaction` - After ZK proof generated
- `FinalizedTransaction` - Ready for submission
- `BalancedProvingRecipe` - Recipe for wallet balancing

The wallet provider interface changed:
```typescript
// Old:
balanceTx(tx: UnbalancedTransaction, newCoins: CoinInfo[]): Promise<BalancedTransaction>

// New:
balanceTx(tx: UnprovenTransaction, newCoins?: ShieldedCoinInfo[], ttl?: Date): Promise<BalancedProvingRecipe>
```

---

### 4. TypeScript Type Inference with RxJS

**Problem**: `firstValueFrom()` with complex pipe chains returns `unknown`.

**Error**:
```
error TS2322: Type 'unknown' is not assignable to type '{ wallet: DAppConnectorWalletAPI; uris: ServiceUriConfig; }'
```

**Solution**: Store result in variable and cast:
```typescript
const result = await firstValueFrom(interval(100).pipe(...));
return result as { wallet: DAppConnectorWalletAPI; uris: ServiceUriConfig };
```

---

### 5. Wallet Provider Type Compatibility

**Problem**: The wallet's `balanceAndProveTransaction` returns a type incompatible with `BalancedProvingRecipe`.

**Solution**: Use `as unknown as` double cast:
```typescript
async balanceTx(tx: any, newCoins?: any[], _ttl?: Date): Promise<BalancedProvingRecipe> {
  const balanced = await connectedWallet.balanceAndProveTransaction(tx, newCoins || []);
  return {
    type: 'NothingToProve',
    transaction: balanced,
  } as unknown as BalancedProvingRecipe;
}
```

**Note**: This is a workaround. The actual Lace wallet handles transaction proving internally.

---

### 6. WASM Module Handling in Vite

**Problem**: `@midnight-ntwrk/onchain-runtime` uses WASM and top-level await.

**Solution**: Configure Vite properly:
```typescript
// vite.config.ts
plugins: [
  wasm(),
  topLevelAwait({
    promiseExportName: '__tla',
    promiseImportName: (i) => `__tla_${i}`,
  }),
],
optimizeDeps: {
  exclude: [
    '@midnight-ntwrk/onchain-runtime',
    '@midnight-ntwrk/onchain-runtime/midnight_onchain_runtime_wasm_bg.wasm',
  ],
}
```

---

### 7. Buffer Polyfill Required

**Problem**: Midnight SDK uses Node.js `Buffer` which doesn't exist in browsers.

**Solution**: Add polyfill in `globals.ts`:
```typescript
import { Buffer } from 'buffer';
globalThis.Buffer = Buffer;
```

And add `buffer` to dependencies:
```json
"dependencies": {
  "buffer": "^6.0.3"
}
```

---

### 8. Unused Parameters in Interface Implementation

**Problem**: TypeScript strict mode complains about unused `ttl` parameter.

**Error**:
```
error TS6133: 'ttl' is declared but its value is never read
```

**Solution**: Prefix with underscore:
```typescript
async balanceTx(tx: any, newCoins?: any[], _ttl?: Date): Promise<BalancedProvingRecipe>
```

---

## Integration with Midnight

### Contract Package Reference

The UI imports the contract package:
```typescript
import { ZKLoanCreditScorer, witnesses, type ZKLoanCreditScorerPrivateState } from 'zkloan-credit-scorer-contract';
```

This comes from `contract/src/index.ts`:
```typescript
export * as ZKLoanCreditScorer from "./managed/zkloan-credit-scorer/contract/index.js";
export * from "./witnesses";
```

### Private State Type

```typescript
type ZKLoanCreditScorerPrivateState = {
  creditScore: bigint;
  monthlyIncome: bigint;
  monthsAsCustomer: bigint;
};
```

### Contract Circuits Available

```typescript
type ZKLoanCircuitKeys =
  | 'requestLoan'      // Main circuit for loan applications
  | 'changePin'        // PIN migration circuit
  | 'blacklistUser'    // Admin: add to blacklist
  | 'removeBlacklistUser' // Admin: remove from blacklist
  | 'transferAdmin';   // Admin: transfer admin role
```

### Calling the Contract

```typescript
// Deploy
const deployed = await deployContract(providers, {
  contract: new ZKLoanCreditScorer.Contract(witnesses),
  privateStateId: 'zkLoanCreditScorerPrivateState',
  initialPrivateState: privateState,
});

// Call circuit
await contract.callTx.requestLoan(amountBigInt, pinBigInt);
```

---

## Component Reference

### ZKLoanProvider

**Location**: `src/contexts/ZKLoanContext.tsx`

**Props**:
```typescript
interface ZKLoanProviderProps {
  logger: Logger;  // pino logger
  children: ReactNode;
}
```

**Provided Values**:
```typescript
interface ZKLoanAPIProvider {
  deployment$: Observable<ZKLoanDeployment>;
  privateState: ZKLoanCreditScorerPrivateState;
  setPrivateState: (state: ZKLoanCreditScorerPrivateState) => void;
  deploy: () => void;
  join: (contractAddress: ContractAddress) => void;
  requestLoan: (amount: bigint, pin: bigint) => Promise<void>;
  isConnected: boolean;
  walletAddress: string | null;
}
```

---

### PrivateStateCard

**Location**: `src/components/PrivateStateCard.tsx`

**Features**:
- Profile dropdown selector (10 profiles)
- Three stat boxes (credit score, income, tenure)
- Tier qualification preview chip

**State**:
- `selectedProfile`: Index of selected profile (0-9)

**Consumes**: `useZKLoanContext()` for `privateState` and `setPrivateState`

---

### LoanRequestForm

**Location**: `src/components/LoanRequestForm.tsx`

**Features**:
- Deploy/Join buttons when no contract
- Contract address input for joining
- Loan amount input ($1-$10,000)
- Secret PIN input (4-6 digits)
- Loading overlay during operations
- Error/success alerts

**State**:
- `deployment`: Current deployment status (from Observable)
- `contractAddress`: Input for joining existing contract
- `amount`: Loan amount input
- `pin`: Secret PIN input
- `isSubmitting`: Loading state
- `result`: Success/error message

---

### Header

**Location**: `src/components/Layout/Header.tsx`

**Features**:
- App title with icon
- Connection status chip (green/red)
- Truncated wallet address display

---

### MainLayout

**Location**: `src/components/Layout/MainLayout.tsx`

**Features**:
- Dark background
- Header component
- Centered content container (max-width: md)

---

## Known Limitations

### 1. No ZK Keys Served

The UI expects ZK keys at `window.location.origin` (e.g., `/keys/requestLoan.prover`).

**Current state**: Keys are not being served. For full functionality:
- Copy keys from `contract/src/managed/zkloan-credit-scorer/keys/` to UI public folder
- Or configure a different `zkConfigPath`

### 2. No Real Credit Scoring Backend

The "private state" is manually selected from predefined profiles. In production:
- Connect to a real credit bureau API
- Securely store/retrieve user financial data
- Never expose raw data to the frontend

### 3. Single Contract Instance

The UI manages one contract at a time. The bboard-ui supports multiple deployments.

### 4. No Transaction History

Successfully submitted loans are not tracked in the UI.

### 5. No Ledger State Display

The UI doesn't show on-chain state (admin, blacklist, loans map).

---

## Future Improvements

1. **Serve ZK Keys**: Add build script to copy keys to `public/` folder
2. **Transaction History**: Track and display submitted loan requests
3. **Ledger State View**: Show on-chain contract state (admin, blacklist size)
4. **Multiple Profiles Per Wallet**: Support PIN-based identity rotation
5. **PIN Migration UI**: Allow users to change their PIN
6. **Admin Panel**: For blacklist management
7. **Error Recovery**: Better handling of wallet disconnection
8. **Mobile Responsive**: Currently optimized for desktop

---

## How to Run

### Prerequisites

1. **Node.js 22+**: Required by the project
2. **Midnight Lace Wallet**: Browser extension must be installed
3. **Testnet Configuration**: Wallet must be connected to Midnight testnet

### Commands

```bash
# Install dependencies (from repo root)
npm install

# Start development server
cd zkloan-credit-scorer-ui
npm run dev

# Type check
npm run typecheck

# Build for production
npm run build
```

### Environment Variables

`.env.testnet`:
```
VITE_NETWORK_ID=TestNet
VITE_LOGGING_LEVEL=trace
```

### Accessing the UI

1. Open `http://localhost:5173/`
2. Lace wallet will prompt for connection
3. Approve the connection in Lace
4. Select a user profile
5. Click "Deploy New" to deploy a contract
6. Enter loan amount and PIN
7. Submit loan request

---

## Appendix: Type Definitions

### ZKLoanDeployment

```typescript
type ZKLoanDeployment =
  | { status: 'in-progress' }
  | { status: 'deployed'; contractAddress: ContractAddress }
  | { status: 'failed'; error: Error };
```

### User Profile

```typescript
interface UserProfile {
  applicantId: string;
  creditScore: number;
  monthlyIncome: number;
  monthsAsCustomer: number;
}
```

### Tier Info

```typescript
interface TierInfo {
  tier: 'Tier 1' | 'Tier 2' | 'Tier 3' | 'Rejected';
  maxLoan: number;  // 10000, 7000, 3000, or 0
  color: 'success' | 'warning' | 'info' | 'error';
}
```

---

*Report generated on December 22, 2025*
*For questions or issues, refer to the main project CLAUDE.md or blog-post.md*

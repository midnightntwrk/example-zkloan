# ZKLoan Credit Scorer UI - Quick Reference

## Run Commands

```bash
npm run dev        # Start dev server at localhost:5173
npm run typecheck  # Check TypeScript
npm run build      # Production build
```

## Key Files

| File | Purpose |
|------|---------|
| `src/contexts/ZKLoanContext.tsx` | Wallet connection, contract deploy/join, providers |
| `src/components/PrivateStateCard.tsx` | Profile selector, credit score display |
| `src/components/LoanRequestForm.tsx` | Contract management, loan submission |
| `vite.config.ts` | WASM configuration for Midnight |
| `src/globals.ts` | Buffer/process polyfills (must import first) |

## Critical Package Versions

```
@midnight-ntwrk/ledger-v6: 6.1.0-alpha.6      (NOT @midnight-ntwrk/ledger)
@midnight-ntwrk/midnight-js-*: 3.0.0-alpha.10  (matching CLI)
```

## API Changes from bboard-ui

| Old (bboard-ui) | New (this UI) |
|-----------------|---------------|
| `getLedgerNetworkId()` | `getNetworkId()` |
| `getZswapNetworkId()` | `getNetworkId()` |
| `BalancedTransaction` | Use `BalancedProvingRecipe` |
| `UnbalancedTransaction` | Use `UnprovenTransaction` |
| `createBalancedTx()` | Not exported |
| `@midnight-ntwrk/ledger` | `@midnight-ntwrk/ledger-v6` |

## Wallet Connection Flow

```
1. Poll window.midnight?.mnLace every 100ms
2. Check version: semver.satisfies(apiVersion, '1.x')
3. Enable: connectorAPI.enable()
4. Get URIs: connectorAPI.serviceUriConfig()
5. Initialize providers
```

## Contract Interaction

```typescript
// Deploy
const deployed = await deployContract(providers, {
  contract: new ZKLoanCreditScorer.Contract(witnesses),
  privateStateId: 'zkLoanCreditScorerPrivateState',
  initialPrivateState: { creditScore: 720n, monthlyIncome: 2500n, monthsAsCustomer: 24n },
});

// Request loan
await contract.callTx.requestLoan(BigInt(amount), BigInt(pin));
```

## Tier Evaluation Logic

```typescript
if (score >= 700 && income >= 2000 && tenure >= 24) → Tier 1 ($10,000)
else if (score >= 600 && income >= 1500) → Tier 2 ($7,000)
else if (score >= 580) → Tier 3 ($3,000)
else → Rejected
```

## Common Errors & Fixes

| Error | Fix |
|-------|-----|
| `No matching version for @midnight-ntwrk/ledger` | Use `@midnight-ntwrk/ledger-v6` |
| `has no exported member 'getLedgerNetworkId'` | Use `getNetworkId()` instead |
| `Type 'unknown' is not assignable` | Cast result: `result as Type` |
| `Buffer is not defined` | Import `globals.ts` first in main.tsx |

## User Profiles (from state.utils.ts)

| ID | Score | Income | Tenure | Expected Tier |
|----|-------|--------|--------|---------------|
| user-001 | 720 | $2,500 | 24mo | Tier 1 |
| user-002 | 650 | $1,800 | 11mo | Tier 2 |
| user-003 | 580 | $2,200 | 36mo | Tier 3 |
| user-004 | 710 | $1,900 | 5mo | Tier 2 |
| user-005 | 520 | $3,000 | 48mo | Rejected |
| user-006 | 810 | $4,500 | 60mo | Tier 1 |
| user-007 | 639 | $2,100 | 18mo | Tier 3 |
| user-008 | 680 | $1,450 | 30mo | Tier 3 |
| user-009 | 750 | $2,100 | 23mo | Tier 2 |
| user-010 | 579 | $1,900 | 12mo | Rejected |

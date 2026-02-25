---
name: midnight-infra-setup
description: Set up and run Midnight infrastructure locally using official dev tools. Use this skill when setting up local development environment, starting node/indexer/proof-server, troubleshooting infrastructure, or syncing components. Triggers on "setup infrastructure", "start local node", "run indexer", "proof server", "midnight-infra-dev-tools", or "local development".
license: MIT
metadata:
  author: webisoft
  version: "1.0.0"
  midnight-version: "0.27.0"
  sources:
    - https://github.com/midnightntwrk/midnight-infra-dev-tools
    - https://github.com/midnightntwrk/midnight-node
    - https://github.com/midnightntwrk/midnight-indexer
    - https://github.com/midnightntwrk/midnight-ledger
---

# Midnight Infrastructure Setup

Complete guide to running Midnight infrastructure locally using the official `midnight-infra-dev-tools`. This enables full local development without connecting to testnet.

## Architecture Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                    Local Development Stack                       │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐ │
│  │  Midnight Node  │  │    Indexer      │  │  Proof Server   │ │
│  │                 │  │                 │  │                 │ │
│  │  ws://127.0.0.1 │  │ http://127.0.0.1│  │ http://127.0.0.1│ │
│  │     :9944       │  │     :8088       │  │     :6300       │ │
│  │                 │  │                 │  │                 │ │
│  │  - Blockchain   │  │  - Query state  │  │  - ZK proofs    │ │
│  │  - Consensus    │  │  - Index txs    │  │  - Verification │ │
│  │  - State        │  │  - GraphQL API  │  │  - Circuits     │ │
│  └────────┬────────┘  └────────┬────────┘  └────────┬────────┘ │
│           │                    │                    │           │
│           └────────────────────┼────────────────────┘           │
│                                │                                 │
│                    ┌───────────┴───────────┐                    │
│                    │   Your dApp / Tests   │                    │
│                    └───────────────────────┘                    │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

## When to Use

- Setting up local Midnight development environment
- Running node, indexer, and proof server locally
- Troubleshooting infrastructure issues
- Syncing component versions
- Building/testing without testnet

## Official Repositories

| Component | Repository | Purpose |
|-----------|------------|---------|
| **Dev Tools** | [midnight-infra-dev-tools](https://github.com/midnightntwrk/midnight-infra-dev-tools) | Scripts & guides for local setup |
| **Node** | [midnight-node](https://github.com/midnightntwrk/midnight-node) | Blockchain node (Substrate-based) |
| **Indexer** | [midnight-indexer](https://github.com/midnightntwrk/midnight-indexer) | State indexing & GraphQL API |
| **Ledger** | [midnight-ledger](https://github.com/midnightntwrk/midnight-ledger) | Proof server & ZK circuits |

## Quick Start

### Step 1: Clone Dev Tools

```bash
git clone https://github.com/midnightntwrk/midnight-infra-dev-tools.git
cd midnight-infra-dev-tools
```

### Step 2: Select Commit Version

The dev tools allow you to select specific commits for each component to ensure compatibility.

```bash
# Check available versions
cat versions.json

# Or select specific commits in the config
```

### Step 3: Clone Component Repositories

```bash
# Clone the node
git clone https://github.com/midnightntwrk/midnight-node.git

# Clone the indexer
git clone https://github.com/midnightntwrk/midnight-indexer.git

# Clone the ledger (proof server)
git clone https://github.com/midnightntwrk/midnight-ledger.git
```

### Step 4: Start Infrastructure

```bash
# Start all three components
./scripts/start-all.sh

# Or start individually:
./scripts/start-node.sh
./scripts/start-indexer.sh
./scripts/start-proof-server.sh
```

## Component Details

### Midnight Node

The blockchain node handles consensus, state management, and transaction processing.

**Default Endpoint:** `ws://127.0.0.1:9944`

```bash
# Start node
cd midnight-node
cargo build --release
./target/release/midnight-node --dev

# Or use Docker
docker run -p 9944:9944 midnightntwrk/midnight-node:latest --dev
```

**Key Features:**
- Substrate-based blockchain
- Block production
- Transaction pool
- State storage

### Midnight Indexer

Indexes blockchain state and provides GraphQL API for queries.

**Default Endpoint:** `http://127.0.0.1:8088`

```bash
# Start indexer
cd midnight-indexer
npm install
npm run start

# GraphQL playground available at:
# http://127.0.0.1:8088/graphql
```

**Key Features:**
- Real-time state indexing
- GraphQL API
- Contract state queries
- Transaction history

**IMPORTANT:** The indexer must be synced with the node version. Update the metadata that the indexer interprets when changing node commits.

### Proof Server (Ledger)

Generates and verifies zero-knowledge proofs for transactions.

**Default Endpoint:** `http://127.0.0.1:6300`

```bash
# Start proof server
cd midnight-ledger
cargo build --release
./target/release/proof-server

# Or use Docker
docker run -p 6300:6300 midnightntwrk/proof-server:latest
```

**CRITICAL:** The proof server must use the same ledger version integrated into `midnight-node`. Check version in:
```
midnight-node/Cargo.toml lines 63-70
```

Example from Cargo.toml:
```toml
[dependencies]
midnight-ledger = { git = "https://github.com/midnightntwrk/midnight-ledger", rev = "abc123" }
```

## Version Synchronization

### Why Version Matching Matters

All three components must be version-compatible:
- Node produces blocks with specific ledger format
- Indexer parses blocks using matching metadata
- Proof server generates proofs for the ledger version

### Checking Versions

```bash
# Check node's ledger dependency
grep "midnight-ledger" midnight-node/Cargo.toml

# Check indexer metadata version
cat midnight-indexer/metadata/version.json

# Verify proof server version
./proof-server --version
```

### Syncing Indexer to Node

When you change the node commit:

1. Find the ledger version in node's Cargo.toml
2. Update indexer metadata to match
3. Restart indexer to re-index

```bash
# Update indexer metadata
cd midnight-indexer
./scripts/update-metadata.sh <node-commit>
npm run reindex
```

## Configuration

### Network Configuration

Create a config file for your dApp:

```typescript
// config.ts
export const localConfig = {
  node: {
    url: "ws://127.0.0.1:9944",
  },
  indexer: {
    url: "http://127.0.0.1:8088",
    graphql: "http://127.0.0.1:8088/graphql",
  },
  proofServer: {
    url: "http://127.0.0.1:6300",
  },
};

export const previewConfig = {
  node: {
    url: "wss://rpc.preview.midnight.network",
  },
  indexer: {
    url: "https://indexer.preview.midnight.network",
    graphql: "https://indexer.preview.midnight.network/graphql",
  },
  proofServer: {
    url: "https://proof.preview.midnight.network",
  },
};
```

### Environment Variables

```bash
# .env.local
MIDNIGHT_NODE_URL=ws://127.0.0.1:9944
MIDNIGHT_INDEXER_URL=http://127.0.0.1:8088
MIDNIGHT_PROOF_SERVER_URL=http://127.0.0.1:6300
```

## Using with Starter Template

The starter template integrates with local infrastructure:

```bash
# Clone starter template
git clone https://github.com/MeshJS/midnight-starter-template.git
cd midnight-starter-template

# Install dependencies
npm install

# Start local infrastructure (uses Docker)
npm run setup-standalone

# In another terminal, start frontend
npm run dev:frontend
```

## Troubleshooting

### Node Won't Start

```
Error: Cannot bind to port 9944
```
**Solution:** Another process is using the port
```bash
lsof -i :9944
kill -9 <PID>
```

### Indexer Can't Connect to Node

```
Error: WebSocket connection failed
```
**Solution:** Ensure node is running and accessible
```bash
# Test node connection
wscat -c ws://127.0.0.1:9944
```

### Proof Server Version Mismatch

```
Error: Incompatible ledger version
```
**Solution:** Sync proof server to node's ledger version
```bash
# Check node's ledger dependency
grep "midnight-ledger" midnight-node/Cargo.toml

# Checkout matching version in midnight-ledger
cd midnight-ledger
git checkout <matching-commit>
cargo build --release
```

### Indexer Out of Sync

```
Error: Block parsing failed
```
**Solution:** Update indexer metadata and reindex
```bash
cd midnight-indexer
./scripts/update-metadata.sh
npm run reindex
```

### Docker Issues

```
Error: Cannot connect to Docker daemon
```
**Solution:** Start Docker Desktop or daemon
```bash
# macOS
open -a Docker

# Linux
sudo systemctl start docker
```

## Health Checks

### Check All Services

```bash
# Node health
curl -s http://127.0.0.1:9944/health

# Indexer health
curl -s http://127.0.0.1:8088/health

# Proof server health
curl -s http://127.0.0.1:6300/health
```

### Verify Connectivity

```bash
# Test WebSocket to node
wscat -c ws://127.0.0.1:9944

# Test GraphQL
curl -X POST http://127.0.0.1:8088/graphql \
  -H "Content-Type: application/json" \
  -d '{"query": "{ __schema { types { name } } }"}'
```

## Scripts

Use the provided setup script:

```bash
bash /path/to/skills/midnight-infra-setup/scripts/setup.sh [action]
```

**Actions:**
- `start` - Start all infrastructure
- `stop` - Stop all infrastructure
- `status` - Check service status
- `logs` - View logs
- `reset` - Reset and restart

## Present Results to User

```
Midnight Infrastructure Status:
  Node:         ✓ Running (ws://127.0.0.1:9944)
  Indexer:      ✓ Running (http://127.0.0.1:8088)
  Proof Server: ✓ Running (http://127.0.0.1:6300)

All services are healthy and synchronized.

Next steps:
1. Deploy your contract: npm run deploy:local
2. Start frontend: npm run dev:frontend
3. Connect wallet and interact
```

## References

- [midnight-infra-dev-tools](https://github.com/midnightntwrk/midnight-infra-dev-tools) - Official setup scripts
- [midnight-node](https://github.com/midnightntwrk/midnight-node) - Blockchain node
- [midnight-indexer](https://github.com/midnightntwrk/midnight-indexer) - State indexer
- [midnight-ledger](https://github.com/midnightntwrk/midnight-ledger) - Proof server
- [Token Vault Example](https://github.com/midnightntwrk/midnight-ledger/pull/142) - Shielded/unshielded tokens

# Wallet Integration Patterns

Complete guide for integrating Midnight Lace wallet into your dApp.

## Browser Detection

Always check if wallet is available before attempting connection:

```typescript
declare global {
  interface Window {
    midnight?: {
      mnLace?: MidnightProvider;
    };
  }
}

function isWalletAvailable(): boolean {
  return typeof window !== 'undefined'
    && window.midnight?.mnLace !== undefined;
}

function getWalletInstallUrl(): string {
  return 'https://www.lace.io';
}
```

## Connection Flow

```
┌─────────────────┐
│  User clicks    │
│ "Connect Wallet"│
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Check if wallet │
│   is available  │
└────────┬────────┘
         │
    ┌────┴────┐
    │         │
    ▼         ▼
┌────────┐ ┌────────────┐
│Available│ │Not Available│
└────┬───┘ └──────┬─────┘
     │            │
     ▼            ▼
┌─────────┐  ┌──────────┐
│ enable()│  │Show Install│
│ call    │  │   Link     │
└────┬────┘  └───────────┘
     │
     ▼
┌─────────────────┐
│ Wallet popup    │
│ asks approval   │
└────────┬────────┘
         │
    ┌────┴────┐
    │         │
    ▼         ▼
┌────────┐ ┌────────┐
│Approved│ │Rejected│
└────┬───┘ └───┬────┘
     │         │
     ▼         ▼
┌─────────┐ ┌──────────┐
│ Return  │ │Show error│
│MidnightAPI│ │ message │
└─────────┘ └──────────┘
```

## React Context Pattern

```typescript
import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';

interface WalletState {
  isConnected: boolean;
  address: string | null;
  api: MidnightAPI | null;
  isLoading: boolean;
  error: string | null;
}

interface WalletContextType extends WalletState {
  connect: () => Promise<void>;
  disconnect: () => void;
}

const WalletContext = createContext<WalletContextType | null>(null);

export function WalletProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<WalletState>({
    isConnected: false,
    address: null,
    api: null,
    isLoading: false,
    error: null,
  });

  const connect = useCallback(async () => {
    setState(prev => ({ ...prev, isLoading: true, error: null }));

    try {
      // Check wallet availability
      if (!window.midnight?.mnLace) {
        throw new Error('Midnight Lace wallet not installed. Please install from lace.io');
      }

      // Request connection
      const api = await window.midnight.mnLace.enable();

      // Get user's address
      const addresses = await api.getUsedAddresses();
      const primaryAddress = addresses[0] || null;

      setState({
        isConnected: true,
        address: primaryAddress,
        api,
        isLoading: false,
        error: null,
      });
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to connect';
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: message,
      }));
    }
  }, []);

  const disconnect = useCallback(() => {
    setState({
      isConnected: false,
      address: null,
      api: null,
      isLoading: false,
      error: null,
    });
  }, []);

  return (
    <WalletContext.Provider value={{ ...state, connect, disconnect }}>
      {children}
    </WalletContext.Provider>
  );
}

export function useWallet() {
  const context = useContext(WalletContext);
  if (!context) {
    throw new Error('useWallet must be used within WalletProvider');
  }
  return context;
}
```

## Connect Button Component

```typescript
import { useWallet } from './WalletContext';

export function ConnectButton() {
  const { isConnected, address, isLoading, error, connect, disconnect } = useWallet();

  if (isLoading) {
    return (
      <button disabled className="btn btn-loading">
        Connecting...
      </button>
    );
  }

  if (isConnected && address) {
    return (
      <div className="wallet-info">
        <span className="address">
          {address.slice(0, 6)}...{address.slice(-4)}
        </span>
        <button onClick={disconnect} className="btn btn-secondary">
          Disconnect
        </button>
      </div>
    );
  }

  return (
    <div>
      <button onClick={connect} className="btn btn-primary">
        Connect Wallet
      </button>
      {error && <p className="error">{error}</p>}
    </div>
  );
}
```

## Persistence (Optional)

Store connection state across page refreshes:

```typescript
const STORAGE_KEY = 'midnight_wallet_connected';

// On successful connection
localStorage.setItem(STORAGE_KEY, 'true');

// On disconnect
localStorage.removeItem(STORAGE_KEY);

// On app load, auto-reconnect if previously connected
useEffect(() => {
  const wasConnected = localStorage.getItem(STORAGE_KEY) === 'true';
  if (wasConnected && !isConnected && !isLoading) {
    connect();
  }
}, []);
```

## Error Handling

Handle common wallet errors:

```typescript
import { ErrorCodes } from '@midnight-ntwrk/dapp-connector-api';

try {
  const api = await window.midnight.mnLace.enable();
} catch (error: any) {
  switch (error.code) {
    case ErrorCodes.Rejected:
      // User declined the connection
      showNotification('Connection rejected by user');
      break;
    case ErrorCodes.InvalidRequest:
      // Request was malformed
      console.error('Invalid request:', error.message);
      break;
    case ErrorCodes.InternalError:
      // Wallet internal error
      showNotification('Wallet error. Please try again.');
      break;
    default:
      showNotification('Failed to connect wallet');
  }
}
```

## Best Practices

1. **Always check availability** before calling `enable()`
2. **Handle all error cases** - rejection, not installed, internal errors
3. **Show clear feedback** - loading states, error messages
4. **Provide install link** when wallet not detected
5. **Store minimal state** - don't persist sensitive data
6. **Test with real wallet** - use Lace on testnet

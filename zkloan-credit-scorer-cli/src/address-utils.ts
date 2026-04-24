// This file is part of the ZKLoan Credit Scorer example.
// Copyright (C) 2025 Midnight Foundation
// SPDX-License-Identifier: Apache-2.0
// Licensed under the Apache License, Version 2.0 (the "License");
// You may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
// http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import {
  MidnightBech32m,
  ShieldedAddress,
} from '@midnight-ntwrk/wallet-sdk-address-format';
import { getNetworkId } from '@midnight-ntwrk/midnight-js-network-id';

/**
 * Resolve a user-provided Zswap coin public key.
 *
 * Accepts either:
 *   - a Midnight shielded address (bech32, e.g. `mn_shield-addr_preprod1…`
 *     or `mn_shield-addr_undeployed1…`). The coin public key is extracted
 *     from the address; the encryption key portion is discarded.
 *   - a raw 32-byte hex string (64 hex chars, with or without `0x` prefix).
 *
 * The admin circuits (blacklistUser / removeBlacklistUser / transferAdmin)
 * want a `ZswapCoinPublicKey` which is 32 bytes, so both inputs produce
 * the same output.
 *
 * Throws with a clear message if the input is neither a valid bech32
 * shielded address nor 32-byte hex.
 */
export function resolveZswapCoinPublicKey(input: string): Uint8Array {
  const value = input.trim();
  if (!value) {
    throw new Error('No address provided.');
  }

  // Bech32 shielded address
  if (value.startsWith('mn_shield-addr_')) {
    let parsed: MidnightBech32m;
    try {
      parsed = MidnightBech32m.parse(value);
    } catch (err) {
      throw new Error(
        `Invalid shielded address (bech32 parse failed): ${err instanceof Error ? err.message : String(err)}`,
      );
    }
    const networkId = getNetworkId();
    try {
      const shieldedAddress = parsed.decode(ShieldedAddress, networkId);
      return new Uint8Array(shieldedAddress.coinPublicKey.data);
    } catch (err) {
      throw new Error(
        `Could not decode shielded address for network '${String(networkId)}'. ` +
        `Ensure the address prefix matches the active network. ` +
        `Cause: ${err instanceof Error ? err.message : String(err)}`,
      );
    }
  }

  // Raw hex fallback
  const hex = value.toLowerCase().replace(/^0x/, '');
  if (!/^[0-9a-f]+$/.test(hex)) {
    throw new Error(
      'Unrecognised address format. Expected a shielded address (mn_shield-addr_…) ' +
      'or a 32-byte hex string.',
    );
  }
  if (hex.length !== 64) {
    throw new Error(
      `Hex public key must be exactly 64 hex chars (32 bytes); got ${hex.length}.`,
    );
  }
  return Uint8Array.from(Buffer.from(hex, 'hex'));
}

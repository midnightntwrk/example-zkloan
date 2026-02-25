import { encodeCoinPublicKey } from '@midnight-ntwrk/compact-runtime';
import { encodeContractAddress } from '@midnight-ntwrk/ledger-v7';
import type * as Compact from '../../managed/zkloan-credit-scorer/contract/index.js';

/**
 * @description Converts an ASCII string to its hexadecimal representation,
 * left-padded with zeros to a specified length. Useful for generating
 * fixed-size hex strings for encoding.
 * @param str ASCII string to convert.
 * @param len Total desired length of the resulting hex string. Defaults to 64.
 * @returns Hexadecimal string representation of `str`, padded to `length` characters.
 */
export const toHexPadded = (str: string, len = 64) =>
  Buffer.from(str, 'ascii').toString('hex').padStart(len, '0');
/**
 * @description Generates ZswapCoinPublicKey from `str` for testing purposes.
 * @param str String to hexify and encode.
 * @returns Encoded `ZswapCoinPublicKey`.
 */
export const encodeToPK = (str: string): any  => ({ // TODO: look for ZswapCoinPublicKey type
  bytes: encodeCoinPublicKey(toHexPadded(str)),
  hex: toHexPadded(str),
});

/**
 * @description Generates ContractAddress from `str` for testing purposes.
 * @param str String to hexify and encode.
 * @returns Encoded ContractAddress.
 */
export const encodeToAddress = (str: string): any  => ({
  bytes: encodeContractAddress(toHexPadded(str)),
}); 

/**
 * @description Generates an Either object for ZswapCoinPublicKey for testing.
 *              For use when an Either argument is expected.
 * @param str String to hexify and encode.
 * @returns Defined Either object for ZswapCoinPublicKey.
 */
export const createEitherTestUser = (str: string) => ({
  is_left: true,
  left: encodeToPK(str),
  right: encodeToAddress(''),
});


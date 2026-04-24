import { setNetworkId } from '@midnight-ntwrk/midnight-js-network-id';
import { createServer } from './server.js';
import { generateKeyPair, getPublicKey } from './signing.js';

setNetworkId(process.env.NETWORK_ID || 'undeployed');

const PORT = parseInt(process.env.PORT || '4000', 10);
const PROVIDER_ID = parseInt(process.env.PROVIDER_ID || '1', 10);

// Jubjub scalar field order — the generator's scalar must be reduced mod this
// or ecMulGenerator throws "out of bounds for prime field".
const JUBJUB_ORDER = 6554484396890773809930967563523245729705921265872317281365359162392183254199n;

let providerSk: bigint;

if (process.env.PROVIDER_SECRET_KEY) {
  const raw = BigInt('0x' + process.env.PROVIDER_SECRET_KEY);
  providerSk = raw % JUBJUB_ORDER;
  console.log('Loaded provider secret key from environment');
} else {
  const keyPair = generateKeyPair();
  providerSk = keyPair.sk;
  console.log('Generated ephemeral provider key pair');
}

const pk = getPublicKey(providerSk);
console.log(`Provider ID: ${PROVIDER_ID}`);
console.log(`Provider public key:`);
console.log(`  x: ${pk.x}`);
console.log(`  y: ${pk.y}`);
console.log(`Register this provider on-chain with: registerProvider(${PROVIDER_ID}, {x: ${pk.x}n, y: ${pk.y}n})`);

const server = createServer(providerSk, PROVIDER_ID);
server.listen(PORT, () => {
  console.log(`Attestation API listening on port ${PORT}`);
});

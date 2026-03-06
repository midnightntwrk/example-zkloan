import { setNetworkId } from '@midnight-ntwrk/midnight-js-network-id';
import { createServer } from './server.js';
import { generateKeyPair, getPublicKey } from './signing.js';
setNetworkId(process.env.NETWORK_ID || 'undeployed');
const PORT = parseInt(process.env.PORT || '3000', 10);
const PROVIDER_ID = parseInt(process.env.PROVIDER_ID || '1', 10);
let providerSk;
if (process.env.PROVIDER_SECRET_KEY) {
    providerSk = BigInt('0x' + process.env.PROVIDER_SECRET_KEY);
    console.log('Loaded provider secret key from environment');
}
else {
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
//# sourceMappingURL=index.js.map
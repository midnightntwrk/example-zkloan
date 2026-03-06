import { ecMulGenerator } from '@midnight-ntwrk/compact-runtime';
import { ZKLoanCreditScorer } from 'zkloan-credit-scorer-contract';
const { pureCircuits } = ZKLoanCreditScorer;
import * as crypto from 'crypto';
const JUBJUB_ORDER = 6554484396890773809930967563523245729705921265872317281365359162392183254199n;
const TWO_248 = 452312848583266388373324160190187140051835877600158453279131187530910662656n;
function randomScalar() {
    const bytes = crypto.randomBytes(32);
    let val = BigInt('0x' + bytes.toString('hex'));
    return val % JUBJUB_ORDER;
}
export function generateKeyPair() {
    const sk = randomScalar();
    const pk = ecMulGenerator(sk);
    return { sk, pk };
}
export function getPublicKey(sk) {
    return ecMulGenerator(sk);
}
export function sign(sk, msg) {
    const pk = ecMulGenerator(sk);
    const k = randomScalar();
    const R = ecMulGenerator(k);
    // pureCircuits.schnorrChallenge returns the full transientHash output.
    // The circuit truncates it to 248 bits (mod 2^248) before using in EC ops.
    const cFull = pureCircuits.schnorrChallenge(R.x, R.y, pk.x, pk.y, msg);
    const c = cFull % TWO_248;
    // Compute response: s = (k + c * sk) mod JUBJUB_ORDER
    const s = ((k + c * sk) % JUBJUB_ORDER + JUBJUB_ORDER) % JUBJUB_ORDER;
    return { announcement: R, response: s };
}
export function signCreditData(sk, creditScore, monthlyIncome, monthsAsCustomer, userPubKeyHash) {
    const msg = [
        BigInt(creditScore),
        BigInt(monthlyIncome),
        BigInt(monthsAsCustomer),
        userPubKeyHash,
    ];
    return sign(sk, msg);
}
//# sourceMappingURL=signing.js.map
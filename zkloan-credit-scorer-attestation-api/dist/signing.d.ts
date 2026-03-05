import { type NativePoint } from '@midnight-ntwrk/compact-runtime';
type SchnorrSignature = {
    announcement: NativePoint;
    response: bigint;
};
export declare function generateKeyPair(): {
    sk: bigint;
    pk: NativePoint;
};
export declare function getPublicKey(sk: bigint): NativePoint;
export declare function sign(sk: bigint, msg: bigint[]): SchnorrSignature;
export declare function signCreditData(sk: bigint, creditScore: number, monthlyIncome: number, monthsAsCustomer: number, userPubKeyHash: bigint): SchnorrSignature;
export {};

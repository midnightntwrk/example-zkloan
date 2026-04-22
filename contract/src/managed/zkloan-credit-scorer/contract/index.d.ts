import type * as __compactRuntime from '@midnight-ntwrk/compact-runtime';

export enum LoanStatus { Approved = 0,
                         Rejected = 1,
                         Proposed = 2,
                         NotAccepted = 3
}

export type LoanApplication = { authorizedAmount: bigint; status: LoanStatus };

export type Schnorr_SchnorrSignature = { announcement: __compactRuntime.JubjubPoint;
                                         response: bigint
                                       };

export type Witnesses<PS> = {
  getSchnorrReduction(context: __compactRuntime.WitnessContext<Ledger, PS>,
                      challengeHash_0: bigint): [PS, [bigint, bigint]];
  getAttestedScoringWitness(context: __compactRuntime.WitnessContext<Ledger, PS>): [PS, [{ creditScore: bigint,
                                                                                           monthlyIncome: bigint,
                                                                                           monthsAsCustomer: bigint
                                                                                         },
                                                                                         Schnorr_SchnorrSignature,
                                                                                         bigint]];
}

export type ImpureCircuits<PS> = {
  requestLoan(context: __compactRuntime.CircuitContext<PS>,
              amountRequested_0: bigint,
              secretPin_0: bigint): __compactRuntime.CircuitResults<PS, []>;
  respondToLoan(context: __compactRuntime.CircuitContext<PS>,
                loanId_0: bigint,
                secretPin_0: bigint,
                accept_0: boolean): __compactRuntime.CircuitResults<PS, []>;
  blacklistUser(context: __compactRuntime.CircuitContext<PS>,
                account_0: { bytes: Uint8Array }): __compactRuntime.CircuitResults<PS, []>;
  removeBlacklistUser(context: __compactRuntime.CircuitContext<PS>,
                      account_0: { bytes: Uint8Array }): __compactRuntime.CircuitResults<PS, []>;
  registerProvider(context: __compactRuntime.CircuitContext<PS>,
                   providerId_0: bigint,
                   providerPk_0: __compactRuntime.JubjubPoint): __compactRuntime.CircuitResults<PS, []>;
  removeProvider(context: __compactRuntime.CircuitContext<PS>,
                 providerId_0: bigint): __compactRuntime.CircuitResults<PS, []>;
  transferAdmin(context: __compactRuntime.CircuitContext<PS>,
                newAdmin_0: { bytes: Uint8Array }): __compactRuntime.CircuitResults<PS, []>;
  changePin(context: __compactRuntime.CircuitContext<PS>,
            oldPin_0: bigint,
            newPin_0: bigint): __compactRuntime.CircuitResults<PS, []>;
}

export type ProvableCircuits<PS> = {
  requestLoan(context: __compactRuntime.CircuitContext<PS>,
              amountRequested_0: bigint,
              secretPin_0: bigint): __compactRuntime.CircuitResults<PS, []>;
  respondToLoan(context: __compactRuntime.CircuitContext<PS>,
                loanId_0: bigint,
                secretPin_0: bigint,
                accept_0: boolean): __compactRuntime.CircuitResults<PS, []>;
  blacklistUser(context: __compactRuntime.CircuitContext<PS>,
                account_0: { bytes: Uint8Array }): __compactRuntime.CircuitResults<PS, []>;
  removeBlacklistUser(context: __compactRuntime.CircuitContext<PS>,
                      account_0: { bytes: Uint8Array }): __compactRuntime.CircuitResults<PS, []>;
  registerProvider(context: __compactRuntime.CircuitContext<PS>,
                   providerId_0: bigint,
                   providerPk_0: __compactRuntime.JubjubPoint): __compactRuntime.CircuitResults<PS, []>;
  removeProvider(context: __compactRuntime.CircuitContext<PS>,
                 providerId_0: bigint): __compactRuntime.CircuitResults<PS, []>;
  transferAdmin(context: __compactRuntime.CircuitContext<PS>,
                newAdmin_0: { bytes: Uint8Array }): __compactRuntime.CircuitResults<PS, []>;
  changePin(context: __compactRuntime.CircuitContext<PS>,
            oldPin_0: bigint,
            newPin_0: bigint): __compactRuntime.CircuitResults<PS, []>;
}

export type PureCircuits = {
  publicKey(sk_0: Uint8Array, pin_0: bigint): Uint8Array;
  schnorrChallenge(ann_x_0: bigint,
                   ann_y_0: bigint,
                   pk_x_0: bigint,
                   pk_y_0: bigint,
                   msg_0: bigint[]): bigint;
}

export type Circuits<PS> = {
  requestLoan(context: __compactRuntime.CircuitContext<PS>,
              amountRequested_0: bigint,
              secretPin_0: bigint): __compactRuntime.CircuitResults<PS, []>;
  respondToLoan(context: __compactRuntime.CircuitContext<PS>,
                loanId_0: bigint,
                secretPin_0: bigint,
                accept_0: boolean): __compactRuntime.CircuitResults<PS, []>;
  blacklistUser(context: __compactRuntime.CircuitContext<PS>,
                account_0: { bytes: Uint8Array }): __compactRuntime.CircuitResults<PS, []>;
  removeBlacklistUser(context: __compactRuntime.CircuitContext<PS>,
                      account_0: { bytes: Uint8Array }): __compactRuntime.CircuitResults<PS, []>;
  registerProvider(context: __compactRuntime.CircuitContext<PS>,
                   providerId_0: bigint,
                   providerPk_0: __compactRuntime.JubjubPoint): __compactRuntime.CircuitResults<PS, []>;
  removeProvider(context: __compactRuntime.CircuitContext<PS>,
                 providerId_0: bigint): __compactRuntime.CircuitResults<PS, []>;
  transferAdmin(context: __compactRuntime.CircuitContext<PS>,
                newAdmin_0: { bytes: Uint8Array }): __compactRuntime.CircuitResults<PS, []>;
  changePin(context: __compactRuntime.CircuitContext<PS>,
            oldPin_0: bigint,
            newPin_0: bigint): __compactRuntime.CircuitResults<PS, []>;
  publicKey(context: __compactRuntime.CircuitContext<PS>,
            sk_0: Uint8Array,
            pin_0: bigint): __compactRuntime.CircuitResults<PS, Uint8Array>;
  schnorrChallenge(context: __compactRuntime.CircuitContext<PS>,
                   ann_x_0: bigint,
                   ann_y_0: bigint,
                   pk_x_0: bigint,
                   pk_y_0: bigint,
                   msg_0: bigint[]): __compactRuntime.CircuitResults<PS, bigint>;
}

export type Ledger = {
  blacklist: {
    isEmpty(): boolean;
    size(): bigint;
    member(elem_0: { bytes: Uint8Array }): boolean;
    [Symbol.iterator](): Iterator<{ bytes: Uint8Array }>
  };
  loans: {
    isEmpty(): boolean;
    size(): bigint;
    member(key_0: Uint8Array): boolean;
    lookup(key_0: Uint8Array): {
      isEmpty(): boolean;
      size(): bigint;
      member(key_1: bigint): boolean;
      lookup(key_1: bigint): LoanApplication;
      [Symbol.iterator](): Iterator<[bigint, LoanApplication]>
    }
  };
  onGoingPinMigration: {
    isEmpty(): boolean;
    size(): bigint;
    member(key_0: Uint8Array): boolean;
    lookup(key_0: Uint8Array): bigint;
    [Symbol.iterator](): Iterator<[Uint8Array, bigint]>
  };
  readonly admin: { bytes: Uint8Array };
  providers: {
    isEmpty(): boolean;
    size(): bigint;
    member(key_0: bigint): boolean;
    lookup(key_0: bigint): __compactRuntime.JubjubPoint;
    [Symbol.iterator](): Iterator<[bigint, __compactRuntime.JubjubPoint]>
  };
}

export type ContractReferenceLocations = any;

export declare const contractReferenceLocations : ContractReferenceLocations;

export declare class Contract<PS = any, W extends Witnesses<PS> = Witnesses<PS>> {
  witnesses: W;
  circuits: Circuits<PS>;
  impureCircuits: ImpureCircuits<PS>;
  provableCircuits: ProvableCircuits<PS>;
  constructor(witnesses: W);
  initialState(context: __compactRuntime.ConstructorContext<PS>): __compactRuntime.ConstructorResult<PS>;
}

export declare function ledger(state: __compactRuntime.StateValue | __compactRuntime.ChargedState): Ledger;
export declare const pureCircuits: PureCircuits;

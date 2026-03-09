import type * as __compactRuntime from '@midnight-ntwrk/compact-runtime';

export type LoanApplication = { requester: { bytes: Uint8Array };
                                authorizedAmount: bigint;
                                status: number
                              };

export type Witnesses<T> = {
  getRequesterScoringWitness(context: __compactRuntime.WitnessContext<Ledger, T>): [T, { creditScore: bigint,
                                                                                         monthlyIncome: bigint,
                                                                                         monthsAsCustomer: bigint
                                                                                       }];
}

export type ImpureCircuits<T> = {
  requestLoan(context: __compactRuntime.CircuitContext<T>,
              requester_0: { bytes: Uint8Array },
              amountRequested_0: bigint): __compactRuntime.CircuitResults<T, []>;
}

export type PureCircuits = {
}

export type Circuits<T> = {
  requestLoan(context: __compactRuntime.CircuitContext<T>,
              requester_0: { bytes: Uint8Array },
              amountRequested_0: bigint): __compactRuntime.CircuitResults<T, []>;
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
    member(key_0: { bytes: Uint8Array }): boolean;
    lookup(key_0: { bytes: Uint8Array }): {
      isEmpty(): boolean;
      size(): bigint;
      member(key_1: bigint): boolean;
      lookup(key_1: bigint): LoanApplication;
      [Symbol.iterator](): Iterator<[bigint, LoanApplication]>
    }
  };
}

export type ContractReferenceLocations = any;

export declare const contractReferenceLocations : ContractReferenceLocations;

export declare class Contract<T, W extends Witnesses<T> = Witnesses<T>> {
  witnesses: W;
  circuits: Circuits<T>;
  impureCircuits: ImpureCircuits<T>;
  constructor(witnesses: W);
  initialState(context: __compactRuntime.ConstructorContext<T>): __compactRuntime.ConstructorResult<T>;
}

export declare function ledger(state: __compactRuntime.StateValue): Ledger;
export declare const pureCircuits: PureCircuits;

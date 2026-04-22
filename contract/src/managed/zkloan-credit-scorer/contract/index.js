import * as __compactRuntime from '@midnight-ntwrk/compact-runtime';
__compactRuntime.checkRuntimeVersion('0.15.0');

export var LoanStatus;
(function (LoanStatus) {
  LoanStatus[LoanStatus['Approved'] = 0] = 'Approved';
  LoanStatus[LoanStatus['Rejected'] = 1] = 'Rejected';
  LoanStatus[LoanStatus['Proposed'] = 2] = 'Proposed';
  LoanStatus[LoanStatus['NotAccepted'] = 3] = 'NotAccepted';
})(LoanStatus || (LoanStatus = {}));

const _descriptor_0 = __compactRuntime.CompactTypeField;

const _descriptor_1 = new __compactRuntime.CompactTypeVector(4, _descriptor_0);

const _descriptor_2 = new __compactRuntime.CompactTypeBytes(32);

class _ZswapCoinPublicKey_0 {
  alignment() {
    return _descriptor_2.alignment();
  }
  fromValue(value_0) {
    return {
      bytes: _descriptor_2.fromValue(value_0)
    }
  }
  toValue(value_0) {
    return _descriptor_2.toValue(value_0.bytes);
  }
}

const _descriptor_3 = new _ZswapCoinPublicKey_0();

const _descriptor_4 = __compactRuntime.CompactTypeBoolean;

const _descriptor_5 = new __compactRuntime.CompactTypeUnsignedInteger(65535n, 2);

const _descriptor_6 = new __compactRuntime.CompactTypeEnum(3, 1);

class _LoanApplication_0 {
  alignment() {
    return _descriptor_5.alignment().concat(_descriptor_6.alignment());
  }
  fromValue(value_0) {
    return {
      authorizedAmount: _descriptor_5.fromValue(value_0),
      status: _descriptor_6.fromValue(value_0)
    }
  }
  toValue(value_0) {
    return _descriptor_5.toValue(value_0.authorizedAmount).concat(_descriptor_6.toValue(value_0.status));
  }
}

const _descriptor_7 = new _LoanApplication_0();

const _descriptor_8 = new __compactRuntime.CompactTypeUnsignedInteger(18446744073709551615n, 8);

const _descriptor_9 = __compactRuntime.CompactTypeJubjubPoint;

class _tuple_0 {
  alignment() {
    return _descriptor_5.alignment().concat(_descriptor_6.alignment());
  }
  fromValue(value_0) {
    return [
      _descriptor_5.fromValue(value_0),
      _descriptor_6.fromValue(value_0)
    ]
  }
  toValue(value_0) {
    return _descriptor_5.toValue(value_0[0]).concat(_descriptor_6.toValue(value_0[1]));
  }
}

const _descriptor_10 = new _tuple_0();

class _Applicant_0 {
  alignment() {
    return _descriptor_5.alignment().concat(_descriptor_5.alignment().concat(_descriptor_5.alignment()));
  }
  fromValue(value_0) {
    return {
      creditScore: _descriptor_5.fromValue(value_0),
      monthlyIncome: _descriptor_5.fromValue(value_0),
      monthsAsCustomer: _descriptor_5.fromValue(value_0)
    }
  }
  toValue(value_0) {
    return _descriptor_5.toValue(value_0.creditScore).concat(_descriptor_5.toValue(value_0.monthlyIncome).concat(_descriptor_5.toValue(value_0.monthsAsCustomer)));
  }
}

const _descriptor_11 = new _Applicant_0();

class _SchnorrSignature_0 {
  alignment() {
    return _descriptor_9.alignment().concat(_descriptor_0.alignment());
  }
  fromValue(value_0) {
    return {
      announcement: _descriptor_9.fromValue(value_0),
      response: _descriptor_0.fromValue(value_0)
    }
  }
  toValue(value_0) {
    return _descriptor_9.toValue(value_0.announcement).concat(_descriptor_0.toValue(value_0.response));
  }
}

const _descriptor_12 = new _SchnorrSignature_0();

class _tuple_1 {
  alignment() {
    return _descriptor_11.alignment().concat(_descriptor_12.alignment().concat(_descriptor_5.alignment()));
  }
  fromValue(value_0) {
    return [
      _descriptor_11.fromValue(value_0),
      _descriptor_12.fromValue(value_0),
      _descriptor_5.fromValue(value_0)
    ]
  }
  toValue(value_0) {
    return _descriptor_11.toValue(value_0[0]).concat(_descriptor_12.toValue(value_0[1]).concat(_descriptor_5.toValue(value_0[2])));
  }
}

const _descriptor_13 = new _tuple_1();

const _descriptor_14 = new __compactRuntime.CompactTypeUnsignedInteger(452312848583266388373324160190187140051835877600158453279131187530910662655n, 31);

class _tuple_2 {
  alignment() {
    return _descriptor_0.alignment().concat(_descriptor_14.alignment());
  }
  fromValue(value_0) {
    return [
      _descriptor_0.fromValue(value_0),
      _descriptor_14.fromValue(value_0)
    ]
  }
  toValue(value_0) {
    return _descriptor_0.toValue(value_0[0]).concat(_descriptor_14.toValue(value_0[1]));
  }
}

const _descriptor_15 = new _tuple_2();

const _descriptor_16 = new __compactRuntime.CompactTypeVector(3, _descriptor_2);

class _SchnorrHashInput_0 {
  alignment() {
    return _descriptor_0.alignment().concat(_descriptor_0.alignment().concat(_descriptor_0.alignment().concat(_descriptor_0.alignment().concat(_descriptor_1.alignment()))));
  }
  fromValue(value_0) {
    return {
      ann_x: _descriptor_0.fromValue(value_0),
      ann_y: _descriptor_0.fromValue(value_0),
      pk_x: _descriptor_0.fromValue(value_0),
      pk_y: _descriptor_0.fromValue(value_0),
      msg: _descriptor_1.fromValue(value_0)
    }
  }
  toValue(value_0) {
    return _descriptor_0.toValue(value_0.ann_x).concat(_descriptor_0.toValue(value_0.ann_y).concat(_descriptor_0.toValue(value_0.pk_x).concat(_descriptor_0.toValue(value_0.pk_y).concat(_descriptor_1.toValue(value_0.msg)))));
  }
}

const _descriptor_17 = new _SchnorrHashInput_0();

class _Either_0 {
  alignment() {
    return _descriptor_4.alignment().concat(_descriptor_2.alignment().concat(_descriptor_2.alignment()));
  }
  fromValue(value_0) {
    return {
      is_left: _descriptor_4.fromValue(value_0),
      left: _descriptor_2.fromValue(value_0),
      right: _descriptor_2.fromValue(value_0)
    }
  }
  toValue(value_0) {
    return _descriptor_4.toValue(value_0.is_left).concat(_descriptor_2.toValue(value_0.left).concat(_descriptor_2.toValue(value_0.right)));
  }
}

const _descriptor_18 = new _Either_0();

const _descriptor_19 = new __compactRuntime.CompactTypeUnsignedInteger(340282366920938463463374607431768211455n, 16);

class _ContractAddress_0 {
  alignment() {
    return _descriptor_2.alignment();
  }
  fromValue(value_0) {
    return {
      bytes: _descriptor_2.fromValue(value_0)
    }
  }
  toValue(value_0) {
    return _descriptor_2.toValue(value_0.bytes);
  }
}

const _descriptor_20 = new _ContractAddress_0();

const _descriptor_21 = new __compactRuntime.CompactTypeUnsignedInteger(255n, 1);

export class Contract {
  witnesses;
  constructor(...args_0) {
    if (args_0.length !== 1) {
      throw new __compactRuntime.CompactError(`Contract constructor: expected 1 argument, received ${args_0.length}`);
    }
    const witnesses_0 = args_0[0];
    if (typeof(witnesses_0) !== 'object') {
      throw new __compactRuntime.CompactError('first (witnesses) argument to Contract constructor is not an object');
    }
    if (typeof(witnesses_0.getSchnorrReduction) !== 'function') {
      throw new __compactRuntime.CompactError('first (witnesses) argument to Contract constructor does not contain a function-valued field named getSchnorrReduction');
    }
    if (typeof(witnesses_0.getAttestedScoringWitness) !== 'function') {
      throw new __compactRuntime.CompactError('first (witnesses) argument to Contract constructor does not contain a function-valued field named getAttestedScoringWitness');
    }
    this.witnesses = witnesses_0;
    this.circuits = {
      requestLoan: (...args_1) => {
        if (args_1.length !== 3) {
          throw new __compactRuntime.CompactError(`requestLoan: expected 3 arguments (as invoked from Typescript), received ${args_1.length}`);
        }
        const contextOrig_0 = args_1[0];
        const amountRequested_0 = args_1[1];
        const secretPin_0 = args_1[2];
        if (!(typeof(contextOrig_0) === 'object' && contextOrig_0.currentQueryContext != undefined)) {
          __compactRuntime.typeError('requestLoan',
                                     'argument 1 (as invoked from Typescript)',
                                     'zkloan-credit-scorer.compact line 49 char 1',
                                     'CircuitContext',
                                     contextOrig_0)
        }
        if (!(typeof(amountRequested_0) === 'bigint' && amountRequested_0 >= 0n && amountRequested_0 <= 65535n)) {
          __compactRuntime.typeError('requestLoan',
                                     'argument 1 (argument 2 as invoked from Typescript)',
                                     'zkloan-credit-scorer.compact line 49 char 1',
                                     'Uint<0..65536>',
                                     amountRequested_0)
        }
        if (!(typeof(secretPin_0) === 'bigint' && secretPin_0 >= 0n && secretPin_0 <= 65535n)) {
          __compactRuntime.typeError('requestLoan',
                                     'argument 2 (argument 3 as invoked from Typescript)',
                                     'zkloan-credit-scorer.compact line 49 char 1',
                                     'Uint<0..65536>',
                                     secretPin_0)
        }
        const context = { ...contextOrig_0, gasCost: __compactRuntime.emptyRunningCost() };
        const partialProofData = {
          input: {
            value: _descriptor_5.toValue(amountRequested_0).concat(_descriptor_5.toValue(secretPin_0)),
            alignment: _descriptor_5.alignment().concat(_descriptor_5.alignment())
          },
          output: undefined,
          publicTranscript: [],
          privateTranscriptOutputs: []
        };
        const result_0 = this._requestLoan_0(context,
                                             partialProofData,
                                             amountRequested_0,
                                             secretPin_0);
        partialProofData.output = { value: [], alignment: [] };
        return { result: result_0, context: context, proofData: partialProofData, gasCost: context.gasCost };
      },
      respondToLoan: (...args_1) => {
        if (args_1.length !== 4) {
          throw new __compactRuntime.CompactError(`respondToLoan: expected 4 arguments (as invoked from Typescript), received ${args_1.length}`);
        }
        const contextOrig_0 = args_1[0];
        const loanId_0 = args_1[1];
        const secretPin_0 = args_1[2];
        const accept_0 = args_1[3];
        if (!(typeof(contextOrig_0) === 'object' && contextOrig_0.currentQueryContext != undefined)) {
          __compactRuntime.typeError('respondToLoan',
                                     'argument 1 (as invoked from Typescript)',
                                     'zkloan-credit-scorer.compact line 64 char 1',
                                     'CircuitContext',
                                     contextOrig_0)
        }
        if (!(typeof(loanId_0) === 'bigint' && loanId_0 >= 0n && loanId_0 <= 65535n)) {
          __compactRuntime.typeError('respondToLoan',
                                     'argument 1 (argument 2 as invoked from Typescript)',
                                     'zkloan-credit-scorer.compact line 64 char 1',
                                     'Uint<0..65536>',
                                     loanId_0)
        }
        if (!(typeof(secretPin_0) === 'bigint' && secretPin_0 >= 0n && secretPin_0 <= 65535n)) {
          __compactRuntime.typeError('respondToLoan',
                                     'argument 2 (argument 3 as invoked from Typescript)',
                                     'zkloan-credit-scorer.compact line 64 char 1',
                                     'Uint<0..65536>',
                                     secretPin_0)
        }
        if (!(typeof(accept_0) === 'boolean')) {
          __compactRuntime.typeError('respondToLoan',
                                     'argument 3 (argument 4 as invoked from Typescript)',
                                     'zkloan-credit-scorer.compact line 64 char 1',
                                     'Boolean',
                                     accept_0)
        }
        const context = { ...contextOrig_0, gasCost: __compactRuntime.emptyRunningCost() };
        const partialProofData = {
          input: {
            value: _descriptor_5.toValue(loanId_0).concat(_descriptor_5.toValue(secretPin_0).concat(_descriptor_4.toValue(accept_0))),
            alignment: _descriptor_5.alignment().concat(_descriptor_5.alignment().concat(_descriptor_4.alignment()))
          },
          output: undefined,
          publicTranscript: [],
          privateTranscriptOutputs: []
        };
        const result_0 = this._respondToLoan_0(context,
                                               partialProofData,
                                               loanId_0,
                                               secretPin_0,
                                               accept_0);
        partialProofData.output = { value: [], alignment: [] };
        return { result: result_0, context: context, proofData: partialProofData, gasCost: context.gasCost };
      },
      blacklistUser: (...args_1) => {
        if (args_1.length !== 2) {
          throw new __compactRuntime.CompactError(`blacklistUser: expected 2 arguments (as invoked from Typescript), received ${args_1.length}`);
        }
        const contextOrig_0 = args_1[0];
        const account_0 = args_1[1];
        if (!(typeof(contextOrig_0) === 'object' && contextOrig_0.currentQueryContext != undefined)) {
          __compactRuntime.typeError('blacklistUser',
                                     'argument 1 (as invoked from Typescript)',
                                     'zkloan-credit-scorer.compact line 146 char 1',
                                     'CircuitContext',
                                     contextOrig_0)
        }
        if (!(typeof(account_0) === 'object' && account_0.bytes.buffer instanceof ArrayBuffer && account_0.bytes.BYTES_PER_ELEMENT === 1 && account_0.bytes.length === 32)) {
          __compactRuntime.typeError('blacklistUser',
                                     'argument 1 (argument 2 as invoked from Typescript)',
                                     'zkloan-credit-scorer.compact line 146 char 1',
                                     'struct ZswapCoinPublicKey<bytes: Bytes<32>>',
                                     account_0)
        }
        const context = { ...contextOrig_0, gasCost: __compactRuntime.emptyRunningCost() };
        const partialProofData = {
          input: {
            value: _descriptor_3.toValue(account_0),
            alignment: _descriptor_3.alignment()
          },
          output: undefined,
          publicTranscript: [],
          privateTranscriptOutputs: []
        };
        const result_0 = this._blacklistUser_0(context,
                                               partialProofData,
                                               account_0);
        partialProofData.output = { value: [], alignment: [] };
        return { result: result_0, context: context, proofData: partialProofData, gasCost: context.gasCost };
      },
      removeBlacklistUser: (...args_1) => {
        if (args_1.length !== 2) {
          throw new __compactRuntime.CompactError(`removeBlacklistUser: expected 2 arguments (as invoked from Typescript), received ${args_1.length}`);
        }
        const contextOrig_0 = args_1[0];
        const account_0 = args_1[1];
        if (!(typeof(contextOrig_0) === 'object' && contextOrig_0.currentQueryContext != undefined)) {
          __compactRuntime.typeError('removeBlacklistUser',
                                     'argument 1 (as invoked from Typescript)',
                                     'zkloan-credit-scorer.compact line 152 char 1',
                                     'CircuitContext',
                                     contextOrig_0)
        }
        if (!(typeof(account_0) === 'object' && account_0.bytes.buffer instanceof ArrayBuffer && account_0.bytes.BYTES_PER_ELEMENT === 1 && account_0.bytes.length === 32)) {
          __compactRuntime.typeError('removeBlacklistUser',
                                     'argument 1 (argument 2 as invoked from Typescript)',
                                     'zkloan-credit-scorer.compact line 152 char 1',
                                     'struct ZswapCoinPublicKey<bytes: Bytes<32>>',
                                     account_0)
        }
        const context = { ...contextOrig_0, gasCost: __compactRuntime.emptyRunningCost() };
        const partialProofData = {
          input: {
            value: _descriptor_3.toValue(account_0),
            alignment: _descriptor_3.alignment()
          },
          output: undefined,
          publicTranscript: [],
          privateTranscriptOutputs: []
        };
        const result_0 = this._removeBlacklistUser_0(context,
                                                     partialProofData,
                                                     account_0);
        partialProofData.output = { value: [], alignment: [] };
        return { result: result_0, context: context, proofData: partialProofData, gasCost: context.gasCost };
      },
      registerProvider: (...args_1) => {
        if (args_1.length !== 3) {
          throw new __compactRuntime.CompactError(`registerProvider: expected 3 arguments (as invoked from Typescript), received ${args_1.length}`);
        }
        const contextOrig_0 = args_1[0];
        const providerId_0 = args_1[1];
        const providerPk_0 = args_1[2];
        if (!(typeof(contextOrig_0) === 'object' && contextOrig_0.currentQueryContext != undefined)) {
          __compactRuntime.typeError('registerProvider',
                                     'argument 1 (as invoked from Typescript)',
                                     'zkloan-credit-scorer.compact line 158 char 1',
                                     'CircuitContext',
                                     contextOrig_0)
        }
        if (!(typeof(providerId_0) === 'bigint' && providerId_0 >= 0n && providerId_0 <= 65535n)) {
          __compactRuntime.typeError('registerProvider',
                                     'argument 1 (argument 2 as invoked from Typescript)',
                                     'zkloan-credit-scorer.compact line 158 char 1',
                                     'Uint<0..65536>',
                                     providerId_0)
        }
        const context = { ...contextOrig_0, gasCost: __compactRuntime.emptyRunningCost() };
        const partialProofData = {
          input: {
            value: _descriptor_5.toValue(providerId_0).concat(_descriptor_9.toValue(providerPk_0)),
            alignment: _descriptor_5.alignment().concat(_descriptor_9.alignment())
          },
          output: undefined,
          publicTranscript: [],
          privateTranscriptOutputs: []
        };
        const result_0 = this._registerProvider_0(context,
                                                  partialProofData,
                                                  providerId_0,
                                                  providerPk_0);
        partialProofData.output = { value: [], alignment: [] };
        return { result: result_0, context: context, proofData: partialProofData, gasCost: context.gasCost };
      },
      removeProvider: (...args_1) => {
        if (args_1.length !== 2) {
          throw new __compactRuntime.CompactError(`removeProvider: expected 2 arguments (as invoked from Typescript), received ${args_1.length}`);
        }
        const contextOrig_0 = args_1[0];
        const providerId_0 = args_1[1];
        if (!(typeof(contextOrig_0) === 'object' && contextOrig_0.currentQueryContext != undefined)) {
          __compactRuntime.typeError('removeProvider',
                                     'argument 1 (as invoked from Typescript)',
                                     'zkloan-credit-scorer.compact line 164 char 1',
                                     'CircuitContext',
                                     contextOrig_0)
        }
        if (!(typeof(providerId_0) === 'bigint' && providerId_0 >= 0n && providerId_0 <= 65535n)) {
          __compactRuntime.typeError('removeProvider',
                                     'argument 1 (argument 2 as invoked from Typescript)',
                                     'zkloan-credit-scorer.compact line 164 char 1',
                                     'Uint<0..65536>',
                                     providerId_0)
        }
        const context = { ...contextOrig_0, gasCost: __compactRuntime.emptyRunningCost() };
        const partialProofData = {
          input: {
            value: _descriptor_5.toValue(providerId_0),
            alignment: _descriptor_5.alignment()
          },
          output: undefined,
          publicTranscript: [],
          privateTranscriptOutputs: []
        };
        const result_0 = this._removeProvider_0(context,
                                                partialProofData,
                                                providerId_0);
        partialProofData.output = { value: [], alignment: [] };
        return { result: result_0, context: context, proofData: partialProofData, gasCost: context.gasCost };
      },
      transferAdmin: (...args_1) => {
        if (args_1.length !== 2) {
          throw new __compactRuntime.CompactError(`transferAdmin: expected 2 arguments (as invoked from Typescript), received ${args_1.length}`);
        }
        const contextOrig_0 = args_1[0];
        const newAdmin_0 = args_1[1];
        if (!(typeof(contextOrig_0) === 'object' && contextOrig_0.currentQueryContext != undefined)) {
          __compactRuntime.typeError('transferAdmin',
                                     'argument 1 (as invoked from Typescript)',
                                     'zkloan-credit-scorer.compact line 171 char 1',
                                     'CircuitContext',
                                     contextOrig_0)
        }
        if (!(typeof(newAdmin_0) === 'object' && newAdmin_0.bytes.buffer instanceof ArrayBuffer && newAdmin_0.bytes.BYTES_PER_ELEMENT === 1 && newAdmin_0.bytes.length === 32)) {
          __compactRuntime.typeError('transferAdmin',
                                     'argument 1 (argument 2 as invoked from Typescript)',
                                     'zkloan-credit-scorer.compact line 171 char 1',
                                     'struct ZswapCoinPublicKey<bytes: Bytes<32>>',
                                     newAdmin_0)
        }
        const context = { ...contextOrig_0, gasCost: __compactRuntime.emptyRunningCost() };
        const partialProofData = {
          input: {
            value: _descriptor_3.toValue(newAdmin_0),
            alignment: _descriptor_3.alignment()
          },
          output: undefined,
          publicTranscript: [],
          privateTranscriptOutputs: []
        };
        const result_0 = this._transferAdmin_0(context,
                                               partialProofData,
                                               newAdmin_0);
        partialProofData.output = { value: [], alignment: [] };
        return { result: result_0, context: context, proofData: partialProofData, gasCost: context.gasCost };
      },
      changePin: (...args_1) => {
        if (args_1.length !== 3) {
          throw new __compactRuntime.CompactError(`changePin: expected 3 arguments (as invoked from Typescript), received ${args_1.length}`);
        }
        const contextOrig_0 = args_1[0];
        const oldPin_0 = args_1[1];
        const newPin_0 = args_1[2];
        if (!(typeof(contextOrig_0) === 'object' && contextOrig_0.currentQueryContext != undefined)) {
          __compactRuntime.typeError('changePin',
                                     'argument 1 (as invoked from Typescript)',
                                     'zkloan-credit-scorer.compact line 177 char 1',
                                     'CircuitContext',
                                     contextOrig_0)
        }
        if (!(typeof(oldPin_0) === 'bigint' && oldPin_0 >= 0n && oldPin_0 <= 65535n)) {
          __compactRuntime.typeError('changePin',
                                     'argument 1 (argument 2 as invoked from Typescript)',
                                     'zkloan-credit-scorer.compact line 177 char 1',
                                     'Uint<0..65536>',
                                     oldPin_0)
        }
        if (!(typeof(newPin_0) === 'bigint' && newPin_0 >= 0n && newPin_0 <= 65535n)) {
          __compactRuntime.typeError('changePin',
                                     'argument 2 (argument 3 as invoked from Typescript)',
                                     'zkloan-credit-scorer.compact line 177 char 1',
                                     'Uint<0..65536>',
                                     newPin_0)
        }
        const context = { ...contextOrig_0, gasCost: __compactRuntime.emptyRunningCost() };
        const partialProofData = {
          input: {
            value: _descriptor_5.toValue(oldPin_0).concat(_descriptor_5.toValue(newPin_0)),
            alignment: _descriptor_5.alignment().concat(_descriptor_5.alignment())
          },
          output: undefined,
          publicTranscript: [],
          privateTranscriptOutputs: []
        };
        const result_0 = this._changePin_0(context,
                                           partialProofData,
                                           oldPin_0,
                                           newPin_0);
        partialProofData.output = { value: [], alignment: [] };
        return { result: result_0, context: context, proofData: partialProofData, gasCost: context.gasCost };
      },
      publicKey(context, ...args_1) {
        return { result: pureCircuits.publicKey(...args_1), context };
      },
      schnorrChallenge(context, ...args_1) {
        return { result: pureCircuits.schnorrChallenge(...args_1), context };
      }
    };
    this.impureCircuits = {
      requestLoan: this.circuits.requestLoan,
      respondToLoan: this.circuits.respondToLoan,
      blacklistUser: this.circuits.blacklistUser,
      removeBlacklistUser: this.circuits.removeBlacklistUser,
      registerProvider: this.circuits.registerProvider,
      removeProvider: this.circuits.removeProvider,
      transferAdmin: this.circuits.transferAdmin,
      changePin: this.circuits.changePin
    };
    this.provableCircuits = {
      requestLoan: this.circuits.requestLoan,
      respondToLoan: this.circuits.respondToLoan,
      blacklistUser: this.circuits.blacklistUser,
      removeBlacklistUser: this.circuits.removeBlacklistUser,
      registerProvider: this.circuits.registerProvider,
      removeProvider: this.circuits.removeProvider,
      transferAdmin: this.circuits.transferAdmin,
      changePin: this.circuits.changePin
    };
  }
  initialState(...args_0) {
    if (args_0.length !== 1) {
      throw new __compactRuntime.CompactError(`Contract state constructor: expected 1 argument (as invoked from Typescript), received ${args_0.length}`);
    }
    const constructorContext_0 = args_0[0];
    if (typeof(constructorContext_0) !== 'object') {
      throw new __compactRuntime.CompactError(`Contract state constructor: expected 'constructorContext' in argument 1 (as invoked from Typescript) to be an object`);
    }
    if (!('initialPrivateState' in constructorContext_0)) {
      throw new __compactRuntime.CompactError(`Contract state constructor: expected 'initialPrivateState' in argument 1 (as invoked from Typescript)`);
    }
    if (!('initialZswapLocalState' in constructorContext_0)) {
      throw new __compactRuntime.CompactError(`Contract state constructor: expected 'initialZswapLocalState' in argument 1 (as invoked from Typescript)`);
    }
    if (typeof(constructorContext_0.initialZswapLocalState) !== 'object') {
      throw new __compactRuntime.CompactError(`Contract state constructor: expected 'initialZswapLocalState' in argument 1 (as invoked from Typescript) to be an object`);
    }
    const state_0 = new __compactRuntime.ContractState();
    let stateValue_0 = __compactRuntime.StateValue.newArray();
    stateValue_0 = stateValue_0.arrayPush(__compactRuntime.StateValue.newNull());
    stateValue_0 = stateValue_0.arrayPush(__compactRuntime.StateValue.newNull());
    stateValue_0 = stateValue_0.arrayPush(__compactRuntime.StateValue.newNull());
    stateValue_0 = stateValue_0.arrayPush(__compactRuntime.StateValue.newNull());
    stateValue_0 = stateValue_0.arrayPush(__compactRuntime.StateValue.newNull());
    state_0.data = new __compactRuntime.ChargedState(stateValue_0);
    state_0.setOperation('requestLoan', new __compactRuntime.ContractOperation());
    state_0.setOperation('respondToLoan', new __compactRuntime.ContractOperation());
    state_0.setOperation('blacklistUser', new __compactRuntime.ContractOperation());
    state_0.setOperation('removeBlacklistUser', new __compactRuntime.ContractOperation());
    state_0.setOperation('registerProvider', new __compactRuntime.ContractOperation());
    state_0.setOperation('removeProvider', new __compactRuntime.ContractOperation());
    state_0.setOperation('transferAdmin', new __compactRuntime.ContractOperation());
    state_0.setOperation('changePin', new __compactRuntime.ContractOperation());
    const context = __compactRuntime.createCircuitContext(__compactRuntime.dummyContractAddress(), constructorContext_0.initialZswapLocalState.coinPublicKey, state_0.data, constructorContext_0.initialPrivateState);
    const partialProofData = {
      input: { value: [], alignment: [] },
      output: undefined,
      publicTranscript: [],
      privateTranscriptOutputs: []
    };
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_21.toValue(0n),
                                                                                              alignment: _descriptor_21.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newMap(
                                                          new __compactRuntime.StateMap()
                                                        ).encode() } },
                                       { ins: { cached: false, n: 1 } }]);
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_21.toValue(1n),
                                                                                              alignment: _descriptor_21.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newMap(
                                                          new __compactRuntime.StateMap()
                                                        ).encode() } },
                                       { ins: { cached: false, n: 1 } }]);
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_21.toValue(2n),
                                                                                              alignment: _descriptor_21.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newMap(
                                                          new __compactRuntime.StateMap()
                                                        ).encode() } },
                                       { ins: { cached: false, n: 1 } }]);
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_21.toValue(3n),
                                                                                              alignment: _descriptor_21.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_3.toValue({ bytes: new Uint8Array(32) }),
                                                                                              alignment: _descriptor_3.alignment() }).encode() } },
                                       { ins: { cached: false, n: 1 } }]);
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_21.toValue(4n),
                                                                                              alignment: _descriptor_21.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newMap(
                                                          new __compactRuntime.StateMap()
                                                        ).encode() } },
                                       { ins: { cached: false, n: 1 } }]);
    const tmp_0 = this._ownPublicKey_0(context, partialProofData);
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_21.toValue(3n),
                                                                                              alignment: _descriptor_21.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_3.toValue(tmp_0),
                                                                                              alignment: _descriptor_3.alignment() }).encode() } },
                                       { ins: { cached: false, n: 1 } }]);
    state_0.data = new __compactRuntime.ChargedState(context.currentQueryContext.state.state);
    return {
      currentContractState: state_0,
      currentPrivateState: context.currentPrivateState,
      currentZswapLocalState: context.currentZswapLocalState
    }
  }
  _transientHash_0(value_0) {
    const result_0 = __compactRuntime.transientHash(_descriptor_2, value_0);
    return result_0;
  }
  _transientHash_1(value_0) {
    const result_0 = __compactRuntime.transientHash(_descriptor_17, value_0);
    return result_0;
  }
  _persistentHash_0(value_0) {
    const result_0 = __compactRuntime.persistentHash(_descriptor_5, value_0);
    return result_0;
  }
  _persistentHash_1(value_0) {
    const result_0 = __compactRuntime.persistentHash(_descriptor_16, value_0);
    return result_0;
  }
  _jubjubPointX_0(np_0) {
    const result_0 = __compactRuntime.jubjubPointX(np_0);
    return result_0;
  }
  _jubjubPointY_0(np_0) {
    const result_0 = __compactRuntime.jubjubPointY(np_0);
    return result_0;
  }
  _ecAdd_0(a_0, b_0) {
    const result_0 = __compactRuntime.ecAdd(a_0, b_0);
    return result_0;
  }
  _ecMul_0(a_0, b_0) {
    const result_0 = __compactRuntime.ecMul(a_0, b_0);
    return result_0;
  }
  _ecMulGenerator_0(b_0) {
    const result_0 = __compactRuntime.ecMulGenerator(b_0);
    return result_0;
  }
  _ownPublicKey_0(context, partialProofData) {
    const result_0 = __compactRuntime.ownPublicKey(context);
    partialProofData.privateTranscriptOutputs.push({
      value: _descriptor_3.toValue(result_0),
      alignment: _descriptor_3.alignment()
    });
    return result_0;
  }
  _getSchnorrReduction_0(context, partialProofData, challengeHash_0) {
    const witnessContext_0 = __compactRuntime.createWitnessContext(ledger(context.currentQueryContext.state), context.currentPrivateState, context.currentQueryContext.address);
    const [nextPrivateState_0, result_0] = this.witnesses.getSchnorrReduction(witnessContext_0,
                                                                              challengeHash_0);
    context.currentPrivateState = nextPrivateState_0;
    if (!(Array.isArray(result_0) && result_0.length === 2  && typeof(result_0[0]) === 'bigint' && result_0[0] >= 0 && result_0[0] <= __compactRuntime.MAX_FIELD && typeof(result_0[1]) === 'bigint' && result_0[1] >= 0n && result_0[1] <= 452312848583266388373324160190187140051835877600158453279131187530910662655n)) {
      __compactRuntime.typeError('getSchnorrReduction',
                                 'return value',
                                 'schnorr.compact line 24 char 3',
                                 '[Field, Uint<0..452312848583266388373324160190187140051835877600158453279131187530910662656>]',
                                 result_0)
    }
    partialProofData.privateTranscriptOutputs.push({
      value: _descriptor_15.toValue(result_0),
      alignment: _descriptor_15.alignment()
    });
    return result_0;
  }
  _schnorrVerify_0(context, partialProofData, msg_0, signature_0, pk_0) {
    const __compact_pattern_tmp2_0 = signature_0;
    const announcement_0 = __compact_pattern_tmp2_0.announcement;
    const response_0 = __compact_pattern_tmp2_0.response;
    const cFull_0 = this._transientHash_1({ ann_x:
                                              this._jubjubPointX_0(announcement_0),
                                            ann_y:
                                              this._jubjubPointY_0(announcement_0),
                                            pk_x: this._jubjubPointX_0(pk_0),
                                            pk_y: this._jubjubPointY_0(pk_0),
                                            msg: msg_0 });
    const TWO_248_0 = 452312848583266388373324160190187140051835877600158453279131187530910662656n;
    const __compact_pattern_tmp1_0 = this._getSchnorrReduction_0(context,
                                                                 partialProofData,
                                                                 cFull_0);
    const q_0 = __compact_pattern_tmp1_0[0];
    const cTruncated_0 = __compact_pattern_tmp1_0[1];
    __compactRuntime.assert(__compactRuntime.addField(__compactRuntime.mulField(q_0,
                                                                                TWO_248_0),
                                                      cTruncated_0)
                            ===
                            cFull_0,
                            'Invalid challenge reduction');
    const c_0 = cTruncated_0;
    const lhs_0 = this._ecMulGenerator_0(response_0);
    const rhs_0 = this._ecAdd_0(announcement_0, this._ecMul_0(pk_0, c_0));
    __compactRuntime.assert(this._jubjubPointX_0(lhs_0)
                            ===
                            this._jubjubPointX_0(rhs_0)
                            &&
                            this._jubjubPointY_0(lhs_0)
                            ===
                            this._jubjubPointY_0(rhs_0),
                            'Invalid attestation signature');
    return [];
  }
  _schnorrChallenge_0(ann_x_0, ann_y_0, pk_x_0, pk_y_0, msg_0) {
    const cFull_0 = this._transientHash_1({ ann_x: ann_x_0,
                                            ann_y: ann_y_0,
                                            pk_x: pk_x_0,
                                            pk_y: pk_y_0,
                                            msg: msg_0 });
    return cFull_0;
  }
  _getAttestedScoringWitness_0(context, partialProofData) {
    const witnessContext_0 = __compactRuntime.createWitnessContext(ledger(context.currentQueryContext.state), context.currentPrivateState, context.currentQueryContext.address);
    const [nextPrivateState_0, result_0] = this.witnesses.getAttestedScoringWitness(witnessContext_0);
    context.currentPrivateState = nextPrivateState_0;
    if (!(Array.isArray(result_0) && result_0.length === 3  && typeof(result_0[0]) === 'object' && typeof(result_0[0].creditScore) === 'bigint' && result_0[0].creditScore >= 0n && result_0[0].creditScore <= 65535n && typeof(result_0[0].monthlyIncome) === 'bigint' && result_0[0].monthlyIncome >= 0n && result_0[0].monthlyIncome <= 65535n && typeof(result_0[0].monthsAsCustomer) === 'bigint' && result_0[0].monthsAsCustomer >= 0n && result_0[0].monthsAsCustomer <= 65535n && typeof(result_0[1]) === 'object' && true && typeof(result_0[1].response) === 'bigint' && result_0[1].response >= 0 && result_0[1].response <= __compactRuntime.MAX_FIELD && typeof(result_0[2]) === 'bigint' && result_0[2] >= 0n && result_0[2] <= 65535n)) {
      __compactRuntime.typeError('getAttestedScoringWitness',
                                 'return value',
                                 'zkloan-credit-scorer.compact line 47 char 1',
                                 '[struct Applicant<creditScore: Uint<0..65536>, monthlyIncome: Uint<0..65536>, monthsAsCustomer: Uint<0..65536>>, struct SchnorrSignature<announcement: Opaque<"JubjubPoint">, response: Field>, Uint<0..65536>]',
                                 result_0)
    }
    partialProofData.privateTranscriptOutputs.push({
      value: _descriptor_13.toValue(result_0),
      alignment: _descriptor_13.alignment()
    });
    return result_0;
  }
  _requestLoan_0(context, partialProofData, amountRequested_0, secretPin_0) {
    __compactRuntime.assert(amountRequested_0 > 0n,
                            'Loan amount must be greater than zero');
    const zwapPublicKey_0 = this._ownPublicKey_0(context, partialProofData);
    const requesterPubKey_0 = this._publicKey_0(zwapPublicKey_0.bytes,
                                                secretPin_0);
    __compactRuntime.assert(!_descriptor_4.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                       partialProofData,
                                                                                       [
                                                                                        { dup: { n: 0 } },
                                                                                        { idx: { cached: false,
                                                                                                 pushPath: false,
                                                                                                 path: [
                                                                                                        { tag: 'value',
                                                                                                          value: { value: _descriptor_21.toValue(0n),
                                                                                                                   alignment: _descriptor_21.alignment() } }] } },
                                                                                        { push: { storage: false,
                                                                                                  value: __compactRuntime.StateValue.newCell({ value: _descriptor_3.toValue(zwapPublicKey_0),
                                                                                                                                               alignment: _descriptor_3.alignment() }).encode() } },
                                                                                        'member',
                                                                                        { popeq: { cached: true,
                                                                                                   result: undefined } }]).value),
                            'Requester is blacklisted');
    __compactRuntime.assert(!_descriptor_4.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                       partialProofData,
                                                                                       [
                                                                                        { dup: { n: 0 } },
                                                                                        { idx: { cached: false,
                                                                                                 pushPath: false,
                                                                                                 path: [
                                                                                                        { tag: 'value',
                                                                                                          value: { value: _descriptor_21.toValue(2n),
                                                                                                                   alignment: _descriptor_21.alignment() } }] } },
                                                                                        { push: { storage: false,
                                                                                                  value: __compactRuntime.StateValue.newCell({ value: _descriptor_2.toValue(requesterPubKey_0),
                                                                                                                                               alignment: _descriptor_2.alignment() }).encode() } },
                                                                                        'member',
                                                                                        { popeq: { cached: true,
                                                                                                   result: undefined } }]).value),
                            'PIN migration is in progress for this user');
    const userPubKeyHash_0 = this._transientHash_0(requesterPubKey_0);
    const __compact_pattern_tmp2_0 = this._evaluateApplicant_0(context,
                                                               partialProofData,
                                                               userPubKeyHash_0);
    const topTierAmount_0 = __compact_pattern_tmp2_0[0];
    const status_0 = __compact_pattern_tmp2_0[1];
    const disclosedTopTierAmount_0 = topTierAmount_0;
    const disclosedStatus_0 = status_0;
    this._createLoan_0(context,
                       partialProofData,
                       requesterPubKey_0,
                       amountRequested_0,
                       disclosedTopTierAmount_0,
                       disclosedStatus_0);
    return [];
  }
  _respondToLoan_0(context, partialProofData, loanId_0, secretPin_0, accept_0) {
    const zwapPublicKey_0 = this._ownPublicKey_0(context, partialProofData);
    const requesterPubKey_0 = this._publicKey_0(zwapPublicKey_0.bytes,
                                                secretPin_0);
    const disclosedPubKey_0 = requesterPubKey_0;
    const disclosedLoanId_0 = loanId_0;
    __compactRuntime.assert(!_descriptor_4.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                       partialProofData,
                                                                                       [
                                                                                        { dup: { n: 0 } },
                                                                                        { idx: { cached: false,
                                                                                                 pushPath: false,
                                                                                                 path: [
                                                                                                        { tag: 'value',
                                                                                                          value: { value: _descriptor_21.toValue(0n),
                                                                                                                   alignment: _descriptor_21.alignment() } }] } },
                                                                                        { push: { storage: false,
                                                                                                  value: __compactRuntime.StateValue.newCell({ value: _descriptor_3.toValue(zwapPublicKey_0),
                                                                                                                                               alignment: _descriptor_3.alignment() }).encode() } },
                                                                                        'member',
                                                                                        { popeq: { cached: true,
                                                                                                   result: undefined } }]).value),
                            'User is blacklisted');
    __compactRuntime.assert(_descriptor_4.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                      partialProofData,
                                                                                      [
                                                                                       { dup: { n: 0 } },
                                                                                       { idx: { cached: false,
                                                                                                pushPath: false,
                                                                                                path: [
                                                                                                       { tag: 'value',
                                                                                                         value: { value: _descriptor_21.toValue(1n),
                                                                                                                  alignment: _descriptor_21.alignment() } }] } },
                                                                                       { push: { storage: false,
                                                                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_2.toValue(disclosedPubKey_0),
                                                                                                                                              alignment: _descriptor_2.alignment() }).encode() } },
                                                                                       'member',
                                                                                       { popeq: { cached: true,
                                                                                                  result: undefined } }]).value),
                            'No loans found for this user');
    __compactRuntime.assert(_descriptor_4.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                      partialProofData,
                                                                                      [
                                                                                       { dup: { n: 0 } },
                                                                                       { idx: { cached: false,
                                                                                                pushPath: false,
                                                                                                path: [
                                                                                                       { tag: 'value',
                                                                                                         value: { value: _descriptor_21.toValue(1n),
                                                                                                                  alignment: _descriptor_21.alignment() } },
                                                                                                       { tag: 'value',
                                                                                                         value: { value: _descriptor_2.toValue(disclosedPubKey_0),
                                                                                                                  alignment: _descriptor_2.alignment() } }] } },
                                                                                       { push: { storage: false,
                                                                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_5.toValue(disclosedLoanId_0),
                                                                                                                                              alignment: _descriptor_5.alignment() }).encode() } },
                                                                                       'member',
                                                                                       { popeq: { cached: true,
                                                                                                  result: undefined } }]).value),
                            'Loan not found');
    const existingLoan_0 = _descriptor_7.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                     partialProofData,
                                                                                     [
                                                                                      { dup: { n: 0 } },
                                                                                      { idx: { cached: false,
                                                                                               pushPath: false,
                                                                                               path: [
                                                                                                      { tag: 'value',
                                                                                                        value: { value: _descriptor_21.toValue(1n),
                                                                                                                 alignment: _descriptor_21.alignment() } },
                                                                                                      { tag: 'value',
                                                                                                        value: { value: _descriptor_2.toValue(disclosedPubKey_0),
                                                                                                                 alignment: _descriptor_2.alignment() } }] } },
                                                                                      { idx: { cached: false,
                                                                                               pushPath: false,
                                                                                               path: [
                                                                                                      { tag: 'value',
                                                                                                        value: { value: _descriptor_5.toValue(disclosedLoanId_0),
                                                                                                                 alignment: _descriptor_5.alignment() } }] } },
                                                                                      { popeq: { cached: false,
                                                                                                 result: undefined } }]).value);
    __compactRuntime.assert(existingLoan_0.status === 2,
                            'Loan is not in Proposed status');
    const updatedLoan_0 = accept_0 ?
                          { authorizedAmount: existingLoan_0.authorizedAmount,
                            status: 0 }
                          :
                          { authorizedAmount: 0n, status: 3 };
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { idx: { cached: false,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_21.toValue(1n),
                                                                  alignment: _descriptor_21.alignment() } },
                                                       { tag: 'value',
                                                         value: { value: _descriptor_2.toValue(disclosedPubKey_0),
                                                                  alignment: _descriptor_2.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_5.toValue(disclosedLoanId_0),
                                                                                              alignment: _descriptor_5.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_7.toValue(updatedLoan_0),
                                                                                              alignment: _descriptor_7.alignment() }).encode() } },
                                       { ins: { cached: false, n: 1 } },
                                       { ins: { cached: true, n: 2 } }]);
    return [];
  }
  _evaluateApplicant_0(context, partialProofData, userPubKeyHash_0) {
    let __compact_pattern_tmp1_0,
        profile_0,
        signature_0,
        providerId_0,
        providerPk_0,
        msg_0,
        t_4,
        t_5,
        t_2,
        t_3,
        t_0,
        t_1;
    return __compact_pattern_tmp1_0 = this._getAttestedScoringWitness_0(context,
                                                                        partialProofData),
           (profile_0 = __compact_pattern_tmp1_0[0],
            (signature_0 = __compact_pattern_tmp1_0[1],
             (providerId_0 = __compact_pattern_tmp1_0[2],
              (__compactRuntime.assert(_descriptor_4.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                                 partialProofData,
                                                                                                 [
                                                                                                  { dup: { n: 0 } },
                                                                                                  { idx: { cached: false,
                                                                                                           pushPath: false,
                                                                                                           path: [
                                                                                                                  { tag: 'value',
                                                                                                                    value: { value: _descriptor_21.toValue(4n),
                                                                                                                             alignment: _descriptor_21.alignment() } }] } },
                                                                                                  { push: { storage: false,
                                                                                                            value: __compactRuntime.StateValue.newCell({ value: _descriptor_5.toValue(providerId_0),
                                                                                                                                                         alignment: _descriptor_5.alignment() }).encode() } },
                                                                                                  'member',
                                                                                                  { popeq: { cached: true,
                                                                                                             result: undefined } }]).value),
                                       'Attestation provider not registered'),
               (providerPk_0 = _descriptor_9.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                         partialProofData,
                                                                                         [
                                                                                          { dup: { n: 0 } },
                                                                                          { idx: { cached: false,
                                                                                                   pushPath: false,
                                                                                                   path: [
                                                                                                          { tag: 'value',
                                                                                                            value: { value: _descriptor_21.toValue(4n),
                                                                                                                     alignment: _descriptor_21.alignment() } }] } },
                                                                                          { idx: { cached: false,
                                                                                                   pushPath: false,
                                                                                                   path: [
                                                                                                          { tag: 'value',
                                                                                                            value: { value: _descriptor_5.toValue(providerId_0),
                                                                                                                     alignment: _descriptor_5.alignment() } }] } },
                                                                                          { popeq: { cached: false,
                                                                                                     result: undefined } }]).value),
                (msg_0 = [profile_0.creditScore,
                          profile_0.monthlyIncome,
                          profile_0.monthsAsCustomer,
                          userPubKeyHash_0],
                 (this._schnorrVerify_0(context,
                                        partialProofData,
                                        msg_0,
                                        signature_0,
                                        providerPk_0),
                  (t_2 = profile_0.creditScore, t_2 >= 700n)
                  &&
                  (t_5 = profile_0.monthlyIncome, t_5 >= 2000n)
                  &&
                  (t_4 = profile_0.monthsAsCustomer, t_4 >= 24n)
                  ?
                  [10000n, 0] :
                  (t_0 = profile_0.creditScore, t_0 >= 600n)
                  &&
                  (t_3 = profile_0.monthlyIncome, t_3 >= 1500n)
                  ?
                  [7000n, 0] :
                  (t_1 = profile_0.creditScore, t_1 >= 580n) ?
                  [3000n, 0] :
                  [0n, 1])))))));
  }
  _createLoan_0(context,
                partialProofData,
                requester_0,
                amountRequested_0,
                topTierAmount_0,
                status_0)
  {
    const authorizedAmount_0 = amountRequested_0 > topTierAmount_0 ?
                               topTierAmount_0 :
                               amountRequested_0;
    const finalStatus_0 = status_0 === 1 ?
                          1 :
                          amountRequested_0 > topTierAmount_0 ? 2 : 0;
    const loan_0 = { authorizedAmount: authorizedAmount_0, status: finalStatus_0 };
    if (!_descriptor_4.fromValue(__compactRuntime.queryLedgerState(context,
                                                                   partialProofData,
                                                                   [
                                                                    { dup: { n: 0 } },
                                                                    { idx: { cached: false,
                                                                             pushPath: false,
                                                                             path: [
                                                                                    { tag: 'value',
                                                                                      value: { value: _descriptor_21.toValue(1n),
                                                                                               alignment: _descriptor_21.alignment() } }] } },
                                                                    { push: { storage: false,
                                                                              value: __compactRuntime.StateValue.newCell({ value: _descriptor_2.toValue(requester_0),
                                                                                                                           alignment: _descriptor_2.alignment() }).encode() } },
                                                                    'member',
                                                                    { popeq: { cached: true,
                                                                               result: undefined } }]).value))
    {
      __compactRuntime.queryLedgerState(context,
                                        partialProofData,
                                        [
                                         { idx: { cached: false,
                                                  pushPath: true,
                                                  path: [
                                                         { tag: 'value',
                                                           value: { value: _descriptor_21.toValue(1n),
                                                                    alignment: _descriptor_21.alignment() } }] } },
                                         { push: { storage: false,
                                                   value: __compactRuntime.StateValue.newCell({ value: _descriptor_2.toValue(requester_0),
                                                                                                alignment: _descriptor_2.alignment() }).encode() } },
                                         { push: { storage: true,
                                                   value: __compactRuntime.StateValue.newMap(
                                                            new __compactRuntime.StateMap()
                                                          ).encode() } },
                                         { ins: { cached: false, n: 1 } },
                                         { ins: { cached: true, n: 1 } }]);
    }
    const totalLoans_0 = _descriptor_8.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                   partialProofData,
                                                                                   [
                                                                                    { dup: { n: 0 } },
                                                                                    { idx: { cached: false,
                                                                                             pushPath: false,
                                                                                             path: [
                                                                                                    { tag: 'value',
                                                                                                      value: { value: _descriptor_21.toValue(1n),
                                                                                                               alignment: _descriptor_21.alignment() } },
                                                                                                    { tag: 'value',
                                                                                                      value: { value: _descriptor_2.toValue(requester_0),
                                                                                                               alignment: _descriptor_2.alignment() } }] } },
                                                                                    'size',
                                                                                    { popeq: { cached: true,
                                                                                               result: undefined } }]).value);
    __compactRuntime.assert(totalLoans_0 < 65535n,
                            'Maximum number of loans reached');
    const loanNumber_0 = ((t1) => {
                           if (t1 > 65535n) {
                             throw new __compactRuntime.CompactError('zkloan-credit-scorer.compact line 141 char 24: cast from Field or Uint value to smaller Uint value failed: ' + t1 + ' is greater than 65535');
                           }
                           return t1;
                         })(totalLoans_0 + 1n);
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { idx: { cached: false,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_21.toValue(1n),
                                                                  alignment: _descriptor_21.alignment() } },
                                                       { tag: 'value',
                                                         value: { value: _descriptor_2.toValue(requester_0),
                                                                  alignment: _descriptor_2.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_5.toValue(loanNumber_0),
                                                                                              alignment: _descriptor_5.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_7.toValue(loan_0),
                                                                                              alignment: _descriptor_7.alignment() }).encode() } },
                                       { ins: { cached: false, n: 1 } },
                                       { ins: { cached: true, n: 2 } }]);
    return [];
  }
  _blacklistUser_0(context, partialProofData, account_0) {
    __compactRuntime.assert(this._equal_0(this._ownPublicKey_0(context,
                                                               partialProofData),
                                          _descriptor_3.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                                    partialProofData,
                                                                                                    [
                                                                                                     { dup: { n: 0 } },
                                                                                                     { idx: { cached: false,
                                                                                                              pushPath: false,
                                                                                                              path: [
                                                                                                                     { tag: 'value',
                                                                                                                       value: { value: _descriptor_21.toValue(3n),
                                                                                                                                alignment: _descriptor_21.alignment() } }] } },
                                                                                                     { popeq: { cached: false,
                                                                                                                result: undefined } }]).value)),
                            'Only admin can blacklist users');
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { idx: { cached: false,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_21.toValue(0n),
                                                                  alignment: _descriptor_21.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_3.toValue(account_0),
                                                                                              alignment: _descriptor_3.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newNull().encode() } },
                                       { ins: { cached: false, n: 1 } },
                                       { ins: { cached: true, n: 1 } }]);
    return [];
  }
  _removeBlacklistUser_0(context, partialProofData, account_0) {
    __compactRuntime.assert(this._equal_1(this._ownPublicKey_0(context,
                                                               partialProofData),
                                          _descriptor_3.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                                    partialProofData,
                                                                                                    [
                                                                                                     { dup: { n: 0 } },
                                                                                                     { idx: { cached: false,
                                                                                                              pushPath: false,
                                                                                                              path: [
                                                                                                                     { tag: 'value',
                                                                                                                       value: { value: _descriptor_21.toValue(3n),
                                                                                                                                alignment: _descriptor_21.alignment() } }] } },
                                                                                                     { popeq: { cached: false,
                                                                                                                result: undefined } }]).value)),
                            'Only admin can remove from blacklist');
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { idx: { cached: false,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_21.toValue(0n),
                                                                  alignment: _descriptor_21.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_3.toValue(account_0),
                                                                                              alignment: _descriptor_3.alignment() }).encode() } },
                                       { rem: { cached: false } },
                                       { ins: { cached: true, n: 1 } }]);
    return [];
  }
  _registerProvider_0(context, partialProofData, providerId_0, providerPk_0) {
    __compactRuntime.assert(this._equal_2(this._ownPublicKey_0(context,
                                                               partialProofData),
                                          _descriptor_3.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                                    partialProofData,
                                                                                                    [
                                                                                                     { dup: { n: 0 } },
                                                                                                     { idx: { cached: false,
                                                                                                              pushPath: false,
                                                                                                              path: [
                                                                                                                     { tag: 'value',
                                                                                                                       value: { value: _descriptor_21.toValue(3n),
                                                                                                                                alignment: _descriptor_21.alignment() } }] } },
                                                                                                     { popeq: { cached: false,
                                                                                                                result: undefined } }]).value)),
                            'Only admin can register providers');
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { idx: { cached: false,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_21.toValue(4n),
                                                                  alignment: _descriptor_21.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_5.toValue(providerId_0),
                                                                                              alignment: _descriptor_5.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_9.toValue(providerPk_0),
                                                                                              alignment: _descriptor_9.alignment() }).encode() } },
                                       { ins: { cached: false, n: 1 } },
                                       { ins: { cached: true, n: 1 } }]);
    return [];
  }
  _removeProvider_0(context, partialProofData, providerId_0) {
    __compactRuntime.assert(this._equal_3(this._ownPublicKey_0(context,
                                                               partialProofData),
                                          _descriptor_3.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                                    partialProofData,
                                                                                                    [
                                                                                                     { dup: { n: 0 } },
                                                                                                     { idx: { cached: false,
                                                                                                              pushPath: false,
                                                                                                              path: [
                                                                                                                     { tag: 'value',
                                                                                                                       value: { value: _descriptor_21.toValue(3n),
                                                                                                                                alignment: _descriptor_21.alignment() } }] } },
                                                                                                     { popeq: { cached: false,
                                                                                                                result: undefined } }]).value)),
                            'Only admin can remove providers');
    __compactRuntime.assert(_descriptor_4.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                      partialProofData,
                                                                                      [
                                                                                       { dup: { n: 0 } },
                                                                                       { idx: { cached: false,
                                                                                                pushPath: false,
                                                                                                path: [
                                                                                                       { tag: 'value',
                                                                                                         value: { value: _descriptor_21.toValue(4n),
                                                                                                                  alignment: _descriptor_21.alignment() } }] } },
                                                                                       { push: { storage: false,
                                                                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_5.toValue(providerId_0),
                                                                                                                                              alignment: _descriptor_5.alignment() }).encode() } },
                                                                                       'member',
                                                                                       { popeq: { cached: true,
                                                                                                  result: undefined } }]).value),
                            'Provider not found');
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { idx: { cached: false,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_21.toValue(4n),
                                                                  alignment: _descriptor_21.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_5.toValue(providerId_0),
                                                                                              alignment: _descriptor_5.alignment() }).encode() } },
                                       { rem: { cached: false } },
                                       { ins: { cached: true, n: 1 } }]);
    return [];
  }
  _transferAdmin_0(context, partialProofData, newAdmin_0) {
    __compactRuntime.assert(this._equal_4(this._ownPublicKey_0(context,
                                                               partialProofData),
                                          _descriptor_3.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                                    partialProofData,
                                                                                                    [
                                                                                                     { dup: { n: 0 } },
                                                                                                     { idx: { cached: false,
                                                                                                              pushPath: false,
                                                                                                              path: [
                                                                                                                     { tag: 'value',
                                                                                                                       value: { value: _descriptor_21.toValue(3n),
                                                                                                                                alignment: _descriptor_21.alignment() } }] } },
                                                                                                     { popeq: { cached: false,
                                                                                                                result: undefined } }]).value)),
                            'Only admin can transfer admin role');
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_21.toValue(3n),
                                                                                              alignment: _descriptor_21.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_3.toValue(newAdmin_0),
                                                                                              alignment: _descriptor_3.alignment() }).encode() } },
                                       { ins: { cached: false, n: 1 } }]);
    return [];
  }
  _changePin_0(context, partialProofData, oldPin_0, newPin_0) {
    const zwapPublicKey_0 = this._ownPublicKey_0(context, partialProofData);
    __compactRuntime.assert(!_descriptor_4.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                       partialProofData,
                                                                                       [
                                                                                        { dup: { n: 0 } },
                                                                                        { idx: { cached: false,
                                                                                                 pushPath: false,
                                                                                                 path: [
                                                                                                        { tag: 'value',
                                                                                                          value: { value: _descriptor_21.toValue(0n),
                                                                                                                   alignment: _descriptor_21.alignment() } }] } },
                                                                                        { push: { storage: false,
                                                                                                  value: __compactRuntime.StateValue.newCell({ value: _descriptor_3.toValue(zwapPublicKey_0),
                                                                                                                                               alignment: _descriptor_3.alignment() }).encode() } },
                                                                                        'member',
                                                                                        { popeq: { cached: true,
                                                                                                   result: undefined } }]).value),
                            'User is blacklisted');
    __compactRuntime.assert(!this._equal_5(oldPin_0, newPin_0),
                            'New PIN must be different from old PIN');
    const oldPk_0 = this._publicKey_0(zwapPublicKey_0.bytes, oldPin_0);
    const newPk_0 = this._publicKey_0(zwapPublicKey_0.bytes, newPin_0);
    const disclosedOldPk_0 = oldPk_0;
    const disclosedNewPk_0 = newPk_0;
    __compactRuntime.assert(_descriptor_4.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                      partialProofData,
                                                                                      [
                                                                                       { dup: { n: 0 } },
                                                                                       { idx: { cached: false,
                                                                                                pushPath: false,
                                                                                                path: [
                                                                                                       { tag: 'value',
                                                                                                         value: { value: _descriptor_21.toValue(1n),
                                                                                                                  alignment: _descriptor_21.alignment() } }] } },
                                                                                       { push: { storage: false,
                                                                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_2.toValue(disclosedOldPk_0),
                                                                                                                                              alignment: _descriptor_2.alignment() }).encode() } },
                                                                                       'member',
                                                                                       { popeq: { cached: true,
                                                                                                  result: undefined } }]).value),
                            'Old PIN does not match any user');
    if (!_descriptor_4.fromValue(__compactRuntime.queryLedgerState(context,
                                                                   partialProofData,
                                                                   [
                                                                    { dup: { n: 0 } },
                                                                    { idx: { cached: false,
                                                                             pushPath: false,
                                                                             path: [
                                                                                    { tag: 'value',
                                                                                      value: { value: _descriptor_21.toValue(2n),
                                                                                               alignment: _descriptor_21.alignment() } }] } },
                                                                    { push: { storage: false,
                                                                              value: __compactRuntime.StateValue.newCell({ value: _descriptor_2.toValue(disclosedOldPk_0),
                                                                                                                           alignment: _descriptor_2.alignment() }).encode() } },
                                                                    'member',
                                                                    { popeq: { cached: true,
                                                                               result: undefined } }]).value))
    {
      const tmp_0 = 0n;
      __compactRuntime.queryLedgerState(context,
                                        partialProofData,
                                        [
                                         { idx: { cached: false,
                                                  pushPath: true,
                                                  path: [
                                                         { tag: 'value',
                                                           value: { value: _descriptor_21.toValue(2n),
                                                                    alignment: _descriptor_21.alignment() } }] } },
                                         { push: { storage: false,
                                                   value: __compactRuntime.StateValue.newCell({ value: _descriptor_2.toValue(disclosedOldPk_0),
                                                                                                alignment: _descriptor_2.alignment() }).encode() } },
                                         { push: { storage: true,
                                                   value: __compactRuntime.StateValue.newCell({ value: _descriptor_5.toValue(tmp_0),
                                                                                                alignment: _descriptor_5.alignment() }).encode() } },
                                         { ins: { cached: false, n: 1 } },
                                         { ins: { cached: true, n: 1 } }]);
    }
    if (!_descriptor_4.fromValue(__compactRuntime.queryLedgerState(context,
                                                                   partialProofData,
                                                                   [
                                                                    { dup: { n: 0 } },
                                                                    { idx: { cached: false,
                                                                             pushPath: false,
                                                                             path: [
                                                                                    { tag: 'value',
                                                                                      value: { value: _descriptor_21.toValue(1n),
                                                                                               alignment: _descriptor_21.alignment() } }] } },
                                                                    { push: { storage: false,
                                                                              value: __compactRuntime.StateValue.newCell({ value: _descriptor_2.toValue(disclosedNewPk_0),
                                                                                                                           alignment: _descriptor_2.alignment() }).encode() } },
                                                                    'member',
                                                                    { popeq: { cached: true,
                                                                               result: undefined } }]).value))
    {
      __compactRuntime.queryLedgerState(context,
                                        partialProofData,
                                        [
                                         { idx: { cached: false,
                                                  pushPath: true,
                                                  path: [
                                                         { tag: 'value',
                                                           value: { value: _descriptor_21.toValue(1n),
                                                                    alignment: _descriptor_21.alignment() } }] } },
                                         { push: { storage: false,
                                                   value: __compactRuntime.StateValue.newCell({ value: _descriptor_2.toValue(disclosedNewPk_0),
                                                                                                alignment: _descriptor_2.alignment() }).encode() } },
                                         { push: { storage: true,
                                                   value: __compactRuntime.StateValue.newMap(
                                                            new __compactRuntime.StateMap()
                                                          ).encode() } },
                                         { ins: { cached: false, n: 1 } },
                                         { ins: { cached: true, n: 1 } }]);
    }
    const lastMigratedSourceId_0 = _descriptor_5.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                             partialProofData,
                                                                                             [
                                                                                              { dup: { n: 0 } },
                                                                                              { idx: { cached: false,
                                                                                                       pushPath: false,
                                                                                                       path: [
                                                                                                              { tag: 'value',
                                                                                                                value: { value: _descriptor_21.toValue(2n),
                                                                                                                         alignment: _descriptor_21.alignment() } }] } },
                                                                                              { idx: { cached: false,
                                                                                                       pushPath: false,
                                                                                                       path: [
                                                                                                              { tag: 'value',
                                                                                                                value: { value: _descriptor_2.toValue(disclosedOldPk_0),
                                                                                                                         alignment: _descriptor_2.alignment() } }] } },
                                                                                              { popeq: { cached: false,
                                                                                                         result: undefined } }]).value);
    const lastDestinationId_0 = ((t1) => {
                                  if (t1 > 65535n) {
                                    throw new __compactRuntime.CompactError('zkloan-credit-scorer.compact line 198 char 41: cast from Field or Uint value to smaller Uint value failed: ' + t1 + ' is greater than 65535');
                                  }
                                  return t1;
                                })(_descriptor_8.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                             partialProofData,
                                                                                             [
                                                                                              { dup: { n: 0 } },
                                                                                              { idx: { cached: false,
                                                                                                       pushPath: false,
                                                                                                       path: [
                                                                                                              { tag: 'value',
                                                                                                                value: { value: _descriptor_21.toValue(1n),
                                                                                                                         alignment: _descriptor_21.alignment() } },
                                                                                                              { tag: 'value',
                                                                                                                value: { value: _descriptor_2.toValue(disclosedNewPk_0),
                                                                                                                         alignment: _descriptor_2.alignment() } }] } },
                                                                                              'size',
                                                                                              { popeq: { cached: true,
                                                                                                         result: undefined } }]).value));
    this._folder_0(context,
                   partialProofData,
                   ((context, partialProofData, t_0, i_0) =>
                    {
                      if (_descriptor_4.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                    partialProofData,
                                                                                    [
                                                                                     { dup: { n: 0 } },
                                                                                     { idx: { cached: false,
                                                                                              pushPath: false,
                                                                                              path: [
                                                                                                     { tag: 'value',
                                                                                                       value: { value: _descriptor_21.toValue(2n),
                                                                                                                alignment: _descriptor_21.alignment() } }] } },
                                                                                     { push: { storage: false,
                                                                                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_2.toValue(disclosedOldPk_0),
                                                                                                                                            alignment: _descriptor_2.alignment() }).encode() } },
                                                                                     'member',
                                                                                     { popeq: { cached: true,
                                                                                                result: undefined } }]).value))
                      {
                        const sourceId_0 = ((t1) => {
                                             if (t1 > 65535n) {
                                               throw new __compactRuntime.CompactError('zkloan-credit-scorer.compact line 204 char 30: cast from Field or Uint value to smaller Uint value failed: ' + t1 + ' is greater than 65535');
                                             }
                                             return t1;
                                           })(lastMigratedSourceId_0 + i_0 + 1n);
                        const destinationId_0 = ((t1) => {
                                                  if (t1 > 65535n) {
                                                    throw new __compactRuntime.CompactError('zkloan-credit-scorer.compact line 205 char 35: cast from Field or Uint value to smaller Uint value failed: ' + t1 + ' is greater than 65535');
                                                  }
                                                  return t1;
                                                })(lastDestinationId_0 + i_0
                                                   +
                                                   1n);
                        if (_descriptor_4.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                      partialProofData,
                                                                                      [
                                                                                       { dup: { n: 0 } },
                                                                                       { idx: { cached: false,
                                                                                                pushPath: false,
                                                                                                path: [
                                                                                                       { tag: 'value',
                                                                                                         value: { value: _descriptor_21.toValue(1n),
                                                                                                                  alignment: _descriptor_21.alignment() } },
                                                                                                       { tag: 'value',
                                                                                                         value: { value: _descriptor_2.toValue(disclosedOldPk_0),
                                                                                                                  alignment: _descriptor_2.alignment() } }] } },
                                                                                       { push: { storage: false,
                                                                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_5.toValue(sourceId_0),
                                                                                                                                              alignment: _descriptor_5.alignment() }).encode() } },
                                                                                       'member',
                                                                                       { popeq: { cached: true,
                                                                                                  result: undefined } }]).value))
                        {
                          const loan_0 = _descriptor_7.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                                   partialProofData,
                                                                                                   [
                                                                                                    { dup: { n: 0 } },
                                                                                                    { idx: { cached: false,
                                                                                                             pushPath: false,
                                                                                                             path: [
                                                                                                                    { tag: 'value',
                                                                                                                      value: { value: _descriptor_21.toValue(1n),
                                                                                                                               alignment: _descriptor_21.alignment() } },
                                                                                                                    { tag: 'value',
                                                                                                                      value: { value: _descriptor_2.toValue(disclosedOldPk_0),
                                                                                                                               alignment: _descriptor_2.alignment() } }] } },
                                                                                                    { idx: { cached: false,
                                                                                                             pushPath: false,
                                                                                                             path: [
                                                                                                                    { tag: 'value',
                                                                                                                      value: { value: _descriptor_5.toValue(sourceId_0),
                                                                                                                               alignment: _descriptor_5.alignment() } }] } },
                                                                                                    { popeq: { cached: false,
                                                                                                               result: undefined } }]).value);
                          __compactRuntime.queryLedgerState(context,
                                                            partialProofData,
                                                            [
                                                             { idx: { cached: false,
                                                                      pushPath: true,
                                                                      path: [
                                                                             { tag: 'value',
                                                                               value: { value: _descriptor_21.toValue(1n),
                                                                                        alignment: _descriptor_21.alignment() } },
                                                                             { tag: 'value',
                                                                               value: { value: _descriptor_2.toValue(disclosedNewPk_0),
                                                                                        alignment: _descriptor_2.alignment() } }] } },
                                                             { push: { storage: false,
                                                                       value: __compactRuntime.StateValue.newCell({ value: _descriptor_5.toValue(destinationId_0),
                                                                                                                    alignment: _descriptor_5.alignment() }).encode() } },
                                                             { push: { storage: true,
                                                                       value: __compactRuntime.StateValue.newCell({ value: _descriptor_7.toValue(loan_0),
                                                                                                                    alignment: _descriptor_7.alignment() }).encode() } },
                                                             { ins: { cached: false,
                                                                      n: 1 } },
                                                             { ins: { cached: true,
                                                                      n: 2 } }]);
                          __compactRuntime.queryLedgerState(context,
                                                            partialProofData,
                                                            [
                                                             { idx: { cached: false,
                                                                      pushPath: true,
                                                                      path: [
                                                                             { tag: 'value',
                                                                               value: { value: _descriptor_21.toValue(1n),
                                                                                        alignment: _descriptor_21.alignment() } },
                                                                             { tag: 'value',
                                                                               value: { value: _descriptor_2.toValue(disclosedOldPk_0),
                                                                                        alignment: _descriptor_2.alignment() } }] } },
                                                             { push: { storage: false,
                                                                       value: __compactRuntime.StateValue.newCell({ value: _descriptor_5.toValue(sourceId_0),
                                                                                                                    alignment: _descriptor_5.alignment() }).encode() } },
                                                             { rem: { cached: false } },
                                                             { ins: { cached: true,
                                                                      n: 2 } }]);
                          __compactRuntime.queryLedgerState(context,
                                                            partialProofData,
                                                            [
                                                             { idx: { cached: false,
                                                                      pushPath: true,
                                                                      path: [
                                                                             { tag: 'value',
                                                                               value: { value: _descriptor_21.toValue(2n),
                                                                                        alignment: _descriptor_21.alignment() } }] } },
                                                             { push: { storage: false,
                                                                       value: __compactRuntime.StateValue.newCell({ value: _descriptor_2.toValue(disclosedOldPk_0),
                                                                                                                    alignment: _descriptor_2.alignment() }).encode() } },
                                                             { push: { storage: true,
                                                                       value: __compactRuntime.StateValue.newCell({ value: _descriptor_5.toValue(sourceId_0),
                                                                                                                    alignment: _descriptor_5.alignment() }).encode() } },
                                                             { ins: { cached: false,
                                                                      n: 1 } },
                                                             { ins: { cached: true,
                                                                      n: 1 } }]);
                        } else {
                          __compactRuntime.queryLedgerState(context,
                                                            partialProofData,
                                                            [
                                                             { idx: { cached: false,
                                                                      pushPath: true,
                                                                      path: [
                                                                             { tag: 'value',
                                                                               value: { value: _descriptor_21.toValue(2n),
                                                                                        alignment: _descriptor_21.alignment() } }] } },
                                                             { push: { storage: false,
                                                                       value: __compactRuntime.StateValue.newCell({ value: _descriptor_2.toValue(disclosedOldPk_0),
                                                                                                                    alignment: _descriptor_2.alignment() }).encode() } },
                                                             { rem: { cached: false } },
                                                             { ins: { cached: true,
                                                                      n: 1 } }]);
                          if (this._equal_6(_descriptor_8.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                                      partialProofData,
                                                                                                      [
                                                                                                       { dup: { n: 0 } },
                                                                                                       { idx: { cached: false,
                                                                                                                pushPath: false,
                                                                                                                path: [
                                                                                                                       { tag: 'value',
                                                                                                                         value: { value: _descriptor_21.toValue(1n),
                                                                                                                                  alignment: _descriptor_21.alignment() } },
                                                                                                                       { tag: 'value',
                                                                                                                         value: { value: _descriptor_2.toValue(disclosedOldPk_0),
                                                                                                                                  alignment: _descriptor_2.alignment() } }] } },
                                                                                                       'size',
                                                                                                       { popeq: { cached: true,
                                                                                                                  result: undefined } }]).value),
                                            0n))
                          {
                            __compactRuntime.queryLedgerState(context,
                                                              partialProofData,
                                                              [
                                                               { idx: { cached: false,
                                                                        pushPath: true,
                                                                        path: [
                                                                               { tag: 'value',
                                                                                 value: { value: _descriptor_21.toValue(1n),
                                                                                          alignment: _descriptor_21.alignment() } }] } },
                                                               { push: { storage: false,
                                                                         value: __compactRuntime.StateValue.newCell({ value: _descriptor_2.toValue(disclosedOldPk_0),
                                                                                                                      alignment: _descriptor_2.alignment() }).encode() } },
                                                               { rem: { cached: false } },
                                                               { ins: { cached: true,
                                                                        n: 1 } }]);
                          }
                        }
                      }
                      return t_0;
                    }),
                   [],
                   [0n, 1n, 2n, 3n, 4n]);
    return [];
  }
  _publicKey_0(sk_0, pin_0) {
    const pinBytes_0 = this._persistentHash_0(pin_0);
    return this._persistentHash_1([new Uint8Array([122, 107, 45, 99, 114, 101, 100, 105, 116, 45, 115, 99, 111, 114, 101, 114, 58, 112, 107, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]),
                                   pinBytes_0,
                                   sk_0]);
  }
  _schnorrChallenge_1(ann_x_0, ann_y_0, pk_x_0, pk_y_0, msg_0) {
    return this._schnorrChallenge_0(ann_x_0, ann_y_0, pk_x_0, pk_y_0, msg_0);
  }
  _equal_0(x0, y0) {
    {
      let x1 = x0.bytes;
      let y1 = y0.bytes;
      if (!x1.every((x, i) => y1[i] === x)) { return false; }
    }
    return true;
  }
  _equal_1(x0, y0) {
    {
      let x1 = x0.bytes;
      let y1 = y0.bytes;
      if (!x1.every((x, i) => y1[i] === x)) { return false; }
    }
    return true;
  }
  _equal_2(x0, y0) {
    {
      let x1 = x0.bytes;
      let y1 = y0.bytes;
      if (!x1.every((x, i) => y1[i] === x)) { return false; }
    }
    return true;
  }
  _equal_3(x0, y0) {
    {
      let x1 = x0.bytes;
      let y1 = y0.bytes;
      if (!x1.every((x, i) => y1[i] === x)) { return false; }
    }
    return true;
  }
  _equal_4(x0, y0) {
    {
      let x1 = x0.bytes;
      let y1 = y0.bytes;
      if (!x1.every((x, i) => y1[i] === x)) { return false; }
    }
    return true;
  }
  _equal_5(x0, y0) {
    if (x0 !== y0) { return false; }
    return true;
  }
  _equal_6(x0, y0) {
    if (x0 !== y0) { return false; }
    return true;
  }
  _folder_0(context, partialProofData, f, x, a0) {
    for (let i = 0; i < 5; i++) { x = f(context, partialProofData, x, a0[i]); }
    return x;
  }
}
export function ledger(stateOrChargedState) {
  const state = stateOrChargedState instanceof __compactRuntime.StateValue ? stateOrChargedState : stateOrChargedState.state;
  const chargedState = stateOrChargedState instanceof __compactRuntime.StateValue ? new __compactRuntime.ChargedState(stateOrChargedState) : stateOrChargedState;
  const context = {
    currentQueryContext: new __compactRuntime.QueryContext(chargedState, __compactRuntime.dummyContractAddress()),
    costModel: __compactRuntime.CostModel.initialCostModel()
  };
  const partialProofData = {
    input: { value: [], alignment: [] },
    output: undefined,
    publicTranscript: [],
    privateTranscriptOutputs: []
  };
  return {
    blacklist: {
      isEmpty(...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime.CompactError(`isEmpty: expected 0 arguments, received ${args_0.length}`);
        }
        return _descriptor_4.fromValue(__compactRuntime.queryLedgerState(context,
                                                                         partialProofData,
                                                                         [
                                                                          { dup: { n: 0 } },
                                                                          { idx: { cached: false,
                                                                                   pushPath: false,
                                                                                   path: [
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_21.toValue(0n),
                                                                                                     alignment: _descriptor_21.alignment() } }] } },
                                                                          'size',
                                                                          { push: { storage: false,
                                                                                    value: __compactRuntime.StateValue.newCell({ value: _descriptor_8.toValue(0n),
                                                                                                                                 alignment: _descriptor_8.alignment() }).encode() } },
                                                                          'eq',
                                                                          { popeq: { cached: true,
                                                                                     result: undefined } }]).value);
      },
      size(...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime.CompactError(`size: expected 0 arguments, received ${args_0.length}`);
        }
        return _descriptor_8.fromValue(__compactRuntime.queryLedgerState(context,
                                                                         partialProofData,
                                                                         [
                                                                          { dup: { n: 0 } },
                                                                          { idx: { cached: false,
                                                                                   pushPath: false,
                                                                                   path: [
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_21.toValue(0n),
                                                                                                     alignment: _descriptor_21.alignment() } }] } },
                                                                          'size',
                                                                          { popeq: { cached: true,
                                                                                     result: undefined } }]).value);
      },
      member(...args_0) {
        if (args_0.length !== 1) {
          throw new __compactRuntime.CompactError(`member: expected 1 argument, received ${args_0.length}`);
        }
        const elem_0 = args_0[0];
        if (!(typeof(elem_0) === 'object' && elem_0.bytes.buffer instanceof ArrayBuffer && elem_0.bytes.BYTES_PER_ELEMENT === 1 && elem_0.bytes.length === 32)) {
          __compactRuntime.typeError('member',
                                     'argument 1',
                                     'zkloan-credit-scorer.compact line 41 char 1',
                                     'struct ZswapCoinPublicKey<bytes: Bytes<32>>',
                                     elem_0)
        }
        return _descriptor_4.fromValue(__compactRuntime.queryLedgerState(context,
                                                                         partialProofData,
                                                                         [
                                                                          { dup: { n: 0 } },
                                                                          { idx: { cached: false,
                                                                                   pushPath: false,
                                                                                   path: [
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_21.toValue(0n),
                                                                                                     alignment: _descriptor_21.alignment() } }] } },
                                                                          { push: { storage: false,
                                                                                    value: __compactRuntime.StateValue.newCell({ value: _descriptor_3.toValue(elem_0),
                                                                                                                                 alignment: _descriptor_3.alignment() }).encode() } },
                                                                          'member',
                                                                          { popeq: { cached: true,
                                                                                     result: undefined } }]).value);
      },
      [Symbol.iterator](...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime.CompactError(`iter: expected 0 arguments, received ${args_0.length}`);
        }
        const self_0 = state.asArray()[0];
        return self_0.asMap().keys().map((elem) => _descriptor_3.fromValue(elem.value))[Symbol.iterator]();
      }
    },
    loans: {
      isEmpty(...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime.CompactError(`isEmpty: expected 0 arguments, received ${args_0.length}`);
        }
        return _descriptor_4.fromValue(__compactRuntime.queryLedgerState(context,
                                                                         partialProofData,
                                                                         [
                                                                          { dup: { n: 0 } },
                                                                          { idx: { cached: false,
                                                                                   pushPath: false,
                                                                                   path: [
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_21.toValue(1n),
                                                                                                     alignment: _descriptor_21.alignment() } }] } },
                                                                          'size',
                                                                          { push: { storage: false,
                                                                                    value: __compactRuntime.StateValue.newCell({ value: _descriptor_8.toValue(0n),
                                                                                                                                 alignment: _descriptor_8.alignment() }).encode() } },
                                                                          'eq',
                                                                          { popeq: { cached: true,
                                                                                     result: undefined } }]).value);
      },
      size(...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime.CompactError(`size: expected 0 arguments, received ${args_0.length}`);
        }
        return _descriptor_8.fromValue(__compactRuntime.queryLedgerState(context,
                                                                         partialProofData,
                                                                         [
                                                                          { dup: { n: 0 } },
                                                                          { idx: { cached: false,
                                                                                   pushPath: false,
                                                                                   path: [
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_21.toValue(1n),
                                                                                                     alignment: _descriptor_21.alignment() } }] } },
                                                                          'size',
                                                                          { popeq: { cached: true,
                                                                                     result: undefined } }]).value);
      },
      member(...args_0) {
        if (args_0.length !== 1) {
          throw new __compactRuntime.CompactError(`member: expected 1 argument, received ${args_0.length}`);
        }
        const key_0 = args_0[0];
        if (!(key_0.buffer instanceof ArrayBuffer && key_0.BYTES_PER_ELEMENT === 1 && key_0.length === 32)) {
          __compactRuntime.typeError('member',
                                     'argument 1',
                                     'zkloan-credit-scorer.compact line 42 char 1',
                                     'Bytes<32>',
                                     key_0)
        }
        return _descriptor_4.fromValue(__compactRuntime.queryLedgerState(context,
                                                                         partialProofData,
                                                                         [
                                                                          { dup: { n: 0 } },
                                                                          { idx: { cached: false,
                                                                                   pushPath: false,
                                                                                   path: [
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_21.toValue(1n),
                                                                                                     alignment: _descriptor_21.alignment() } }] } },
                                                                          { push: { storage: false,
                                                                                    value: __compactRuntime.StateValue.newCell({ value: _descriptor_2.toValue(key_0),
                                                                                                                                 alignment: _descriptor_2.alignment() }).encode() } },
                                                                          'member',
                                                                          { popeq: { cached: true,
                                                                                     result: undefined } }]).value);
      },
      lookup(...args_0) {
        if (args_0.length !== 1) {
          throw new __compactRuntime.CompactError(`lookup: expected 1 argument, received ${args_0.length}`);
        }
        const key_0 = args_0[0];
        if (!(key_0.buffer instanceof ArrayBuffer && key_0.BYTES_PER_ELEMENT === 1 && key_0.length === 32)) {
          __compactRuntime.typeError('lookup',
                                     'argument 1',
                                     'zkloan-credit-scorer.compact line 42 char 1',
                                     'Bytes<32>',
                                     key_0)
        }
        if (state.asArray()[1].asMap().get({ value: _descriptor_2.toValue(key_0),
                                             alignment: _descriptor_2.alignment() }) === undefined) {
          throw new __compactRuntime.CompactError(`Map value undefined for ${key_0}`);
        }
        return {
          isEmpty(...args_1) {
            if (args_1.length !== 0) {
              throw new __compactRuntime.CompactError(`isEmpty: expected 0 arguments, received ${args_1.length}`);
            }
            return _descriptor_4.fromValue(__compactRuntime.queryLedgerState(context,
                                                                             partialProofData,
                                                                             [
                                                                              { dup: { n: 0 } },
                                                                              { idx: { cached: false,
                                                                                       pushPath: false,
                                                                                       path: [
                                                                                              { tag: 'value',
                                                                                                value: { value: _descriptor_21.toValue(1n),
                                                                                                         alignment: _descriptor_21.alignment() } },
                                                                                              { tag: 'value',
                                                                                                value: { value: _descriptor_2.toValue(key_0),
                                                                                                         alignment: _descriptor_2.alignment() } }] } },
                                                                              'size',
                                                                              { push: { storage: false,
                                                                                        value: __compactRuntime.StateValue.newCell({ value: _descriptor_8.toValue(0n),
                                                                                                                                     alignment: _descriptor_8.alignment() }).encode() } },
                                                                              'eq',
                                                                              { popeq: { cached: true,
                                                                                         result: undefined } }]).value);
          },
          size(...args_1) {
            if (args_1.length !== 0) {
              throw new __compactRuntime.CompactError(`size: expected 0 arguments, received ${args_1.length}`);
            }
            return _descriptor_8.fromValue(__compactRuntime.queryLedgerState(context,
                                                                             partialProofData,
                                                                             [
                                                                              { dup: { n: 0 } },
                                                                              { idx: { cached: false,
                                                                                       pushPath: false,
                                                                                       path: [
                                                                                              { tag: 'value',
                                                                                                value: { value: _descriptor_21.toValue(1n),
                                                                                                         alignment: _descriptor_21.alignment() } },
                                                                                              { tag: 'value',
                                                                                                value: { value: _descriptor_2.toValue(key_0),
                                                                                                         alignment: _descriptor_2.alignment() } }] } },
                                                                              'size',
                                                                              { popeq: { cached: true,
                                                                                         result: undefined } }]).value);
          },
          member(...args_1) {
            if (args_1.length !== 1) {
              throw new __compactRuntime.CompactError(`member: expected 1 argument, received ${args_1.length}`);
            }
            const key_1 = args_1[0];
            if (!(typeof(key_1) === 'bigint' && key_1 >= 0n && key_1 <= 65535n)) {
              __compactRuntime.typeError('member',
                                         'argument 1',
                                         'zkloan-credit-scorer.compact line 42 char 37',
                                         'Uint<0..65536>',
                                         key_1)
            }
            return _descriptor_4.fromValue(__compactRuntime.queryLedgerState(context,
                                                                             partialProofData,
                                                                             [
                                                                              { dup: { n: 0 } },
                                                                              { idx: { cached: false,
                                                                                       pushPath: false,
                                                                                       path: [
                                                                                              { tag: 'value',
                                                                                                value: { value: _descriptor_21.toValue(1n),
                                                                                                         alignment: _descriptor_21.alignment() } },
                                                                                              { tag: 'value',
                                                                                                value: { value: _descriptor_2.toValue(key_0),
                                                                                                         alignment: _descriptor_2.alignment() } }] } },
                                                                              { push: { storage: false,
                                                                                        value: __compactRuntime.StateValue.newCell({ value: _descriptor_5.toValue(key_1),
                                                                                                                                     alignment: _descriptor_5.alignment() }).encode() } },
                                                                              'member',
                                                                              { popeq: { cached: true,
                                                                                         result: undefined } }]).value);
          },
          lookup(...args_1) {
            if (args_1.length !== 1) {
              throw new __compactRuntime.CompactError(`lookup: expected 1 argument, received ${args_1.length}`);
            }
            const key_1 = args_1[0];
            if (!(typeof(key_1) === 'bigint' && key_1 >= 0n && key_1 <= 65535n)) {
              __compactRuntime.typeError('lookup',
                                         'argument 1',
                                         'zkloan-credit-scorer.compact line 42 char 37',
                                         'Uint<0..65536>',
                                         key_1)
            }
            return _descriptor_7.fromValue(__compactRuntime.queryLedgerState(context,
                                                                             partialProofData,
                                                                             [
                                                                              { dup: { n: 0 } },
                                                                              { idx: { cached: false,
                                                                                       pushPath: false,
                                                                                       path: [
                                                                                              { tag: 'value',
                                                                                                value: { value: _descriptor_21.toValue(1n),
                                                                                                         alignment: _descriptor_21.alignment() } },
                                                                                              { tag: 'value',
                                                                                                value: { value: _descriptor_2.toValue(key_0),
                                                                                                         alignment: _descriptor_2.alignment() } }] } },
                                                                              { idx: { cached: false,
                                                                                       pushPath: false,
                                                                                       path: [
                                                                                              { tag: 'value',
                                                                                                value: { value: _descriptor_5.toValue(key_1),
                                                                                                         alignment: _descriptor_5.alignment() } }] } },
                                                                              { popeq: { cached: false,
                                                                                         result: undefined } }]).value);
          },
          [Symbol.iterator](...args_1) {
            if (args_1.length !== 0) {
              throw new __compactRuntime.CompactError(`iter: expected 0 arguments, received ${args_1.length}`);
            }
            const self_0 = state.asArray()[1].asMap().get({ value: _descriptor_2.toValue(key_0),
                                                            alignment: _descriptor_2.alignment() });
            return self_0.asMap().keys().map(  (key) => {    const value = self_0.asMap().get(key).asCell();    return [      _descriptor_5.fromValue(key.value),      _descriptor_7.fromValue(value.value)    ];  })[Symbol.iterator]();
          }
        }
      }
    },
    onGoingPinMigration: {
      isEmpty(...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime.CompactError(`isEmpty: expected 0 arguments, received ${args_0.length}`);
        }
        return _descriptor_4.fromValue(__compactRuntime.queryLedgerState(context,
                                                                         partialProofData,
                                                                         [
                                                                          { dup: { n: 0 } },
                                                                          { idx: { cached: false,
                                                                                   pushPath: false,
                                                                                   path: [
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_21.toValue(2n),
                                                                                                     alignment: _descriptor_21.alignment() } }] } },
                                                                          'size',
                                                                          { push: { storage: false,
                                                                                    value: __compactRuntime.StateValue.newCell({ value: _descriptor_8.toValue(0n),
                                                                                                                                 alignment: _descriptor_8.alignment() }).encode() } },
                                                                          'eq',
                                                                          { popeq: { cached: true,
                                                                                     result: undefined } }]).value);
      },
      size(...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime.CompactError(`size: expected 0 arguments, received ${args_0.length}`);
        }
        return _descriptor_8.fromValue(__compactRuntime.queryLedgerState(context,
                                                                         partialProofData,
                                                                         [
                                                                          { dup: { n: 0 } },
                                                                          { idx: { cached: false,
                                                                                   pushPath: false,
                                                                                   path: [
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_21.toValue(2n),
                                                                                                     alignment: _descriptor_21.alignment() } }] } },
                                                                          'size',
                                                                          { popeq: { cached: true,
                                                                                     result: undefined } }]).value);
      },
      member(...args_0) {
        if (args_0.length !== 1) {
          throw new __compactRuntime.CompactError(`member: expected 1 argument, received ${args_0.length}`);
        }
        const key_0 = args_0[0];
        if (!(key_0.buffer instanceof ArrayBuffer && key_0.BYTES_PER_ELEMENT === 1 && key_0.length === 32)) {
          __compactRuntime.typeError('member',
                                     'argument 1',
                                     'zkloan-credit-scorer.compact line 43 char 1',
                                     'Bytes<32>',
                                     key_0)
        }
        return _descriptor_4.fromValue(__compactRuntime.queryLedgerState(context,
                                                                         partialProofData,
                                                                         [
                                                                          { dup: { n: 0 } },
                                                                          { idx: { cached: false,
                                                                                   pushPath: false,
                                                                                   path: [
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_21.toValue(2n),
                                                                                                     alignment: _descriptor_21.alignment() } }] } },
                                                                          { push: { storage: false,
                                                                                    value: __compactRuntime.StateValue.newCell({ value: _descriptor_2.toValue(key_0),
                                                                                                                                 alignment: _descriptor_2.alignment() }).encode() } },
                                                                          'member',
                                                                          { popeq: { cached: true,
                                                                                     result: undefined } }]).value);
      },
      lookup(...args_0) {
        if (args_0.length !== 1) {
          throw new __compactRuntime.CompactError(`lookup: expected 1 argument, received ${args_0.length}`);
        }
        const key_0 = args_0[0];
        if (!(key_0.buffer instanceof ArrayBuffer && key_0.BYTES_PER_ELEMENT === 1 && key_0.length === 32)) {
          __compactRuntime.typeError('lookup',
                                     'argument 1',
                                     'zkloan-credit-scorer.compact line 43 char 1',
                                     'Bytes<32>',
                                     key_0)
        }
        return _descriptor_5.fromValue(__compactRuntime.queryLedgerState(context,
                                                                         partialProofData,
                                                                         [
                                                                          { dup: { n: 0 } },
                                                                          { idx: { cached: false,
                                                                                   pushPath: false,
                                                                                   path: [
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_21.toValue(2n),
                                                                                                     alignment: _descriptor_21.alignment() } }] } },
                                                                          { idx: { cached: false,
                                                                                   pushPath: false,
                                                                                   path: [
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_2.toValue(key_0),
                                                                                                     alignment: _descriptor_2.alignment() } }] } },
                                                                          { popeq: { cached: false,
                                                                                     result: undefined } }]).value);
      },
      [Symbol.iterator](...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime.CompactError(`iter: expected 0 arguments, received ${args_0.length}`);
        }
        const self_0 = state.asArray()[2];
        return self_0.asMap().keys().map(  (key) => {    const value = self_0.asMap().get(key).asCell();    return [      _descriptor_2.fromValue(key.value),      _descriptor_5.fromValue(value.value)    ];  })[Symbol.iterator]();
      }
    },
    get admin() {
      return _descriptor_3.fromValue(__compactRuntime.queryLedgerState(context,
                                                                       partialProofData,
                                                                       [
                                                                        { dup: { n: 0 } },
                                                                        { idx: { cached: false,
                                                                                 pushPath: false,
                                                                                 path: [
                                                                                        { tag: 'value',
                                                                                          value: { value: _descriptor_21.toValue(3n),
                                                                                                   alignment: _descriptor_21.alignment() } }] } },
                                                                        { popeq: { cached: false,
                                                                                   result: undefined } }]).value);
    },
    providers: {
      isEmpty(...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime.CompactError(`isEmpty: expected 0 arguments, received ${args_0.length}`);
        }
        return _descriptor_4.fromValue(__compactRuntime.queryLedgerState(context,
                                                                         partialProofData,
                                                                         [
                                                                          { dup: { n: 0 } },
                                                                          { idx: { cached: false,
                                                                                   pushPath: false,
                                                                                   path: [
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_21.toValue(4n),
                                                                                                     alignment: _descriptor_21.alignment() } }] } },
                                                                          'size',
                                                                          { push: { storage: false,
                                                                                    value: __compactRuntime.StateValue.newCell({ value: _descriptor_8.toValue(0n),
                                                                                                                                 alignment: _descriptor_8.alignment() }).encode() } },
                                                                          'eq',
                                                                          { popeq: { cached: true,
                                                                                     result: undefined } }]).value);
      },
      size(...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime.CompactError(`size: expected 0 arguments, received ${args_0.length}`);
        }
        return _descriptor_8.fromValue(__compactRuntime.queryLedgerState(context,
                                                                         partialProofData,
                                                                         [
                                                                          { dup: { n: 0 } },
                                                                          { idx: { cached: false,
                                                                                   pushPath: false,
                                                                                   path: [
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_21.toValue(4n),
                                                                                                     alignment: _descriptor_21.alignment() } }] } },
                                                                          'size',
                                                                          { popeq: { cached: true,
                                                                                     result: undefined } }]).value);
      },
      member(...args_0) {
        if (args_0.length !== 1) {
          throw new __compactRuntime.CompactError(`member: expected 1 argument, received ${args_0.length}`);
        }
        const key_0 = args_0[0];
        if (!(typeof(key_0) === 'bigint' && key_0 >= 0n && key_0 <= 65535n)) {
          __compactRuntime.typeError('member',
                                     'argument 1',
                                     'zkloan-credit-scorer.compact line 45 char 1',
                                     'Uint<0..65536>',
                                     key_0)
        }
        return _descriptor_4.fromValue(__compactRuntime.queryLedgerState(context,
                                                                         partialProofData,
                                                                         [
                                                                          { dup: { n: 0 } },
                                                                          { idx: { cached: false,
                                                                                   pushPath: false,
                                                                                   path: [
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_21.toValue(4n),
                                                                                                     alignment: _descriptor_21.alignment() } }] } },
                                                                          { push: { storage: false,
                                                                                    value: __compactRuntime.StateValue.newCell({ value: _descriptor_5.toValue(key_0),
                                                                                                                                 alignment: _descriptor_5.alignment() }).encode() } },
                                                                          'member',
                                                                          { popeq: { cached: true,
                                                                                     result: undefined } }]).value);
      },
      lookup(...args_0) {
        if (args_0.length !== 1) {
          throw new __compactRuntime.CompactError(`lookup: expected 1 argument, received ${args_0.length}`);
        }
        const key_0 = args_0[0];
        if (!(typeof(key_0) === 'bigint' && key_0 >= 0n && key_0 <= 65535n)) {
          __compactRuntime.typeError('lookup',
                                     'argument 1',
                                     'zkloan-credit-scorer.compact line 45 char 1',
                                     'Uint<0..65536>',
                                     key_0)
        }
        return _descriptor_9.fromValue(__compactRuntime.queryLedgerState(context,
                                                                         partialProofData,
                                                                         [
                                                                          { dup: { n: 0 } },
                                                                          { idx: { cached: false,
                                                                                   pushPath: false,
                                                                                   path: [
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_21.toValue(4n),
                                                                                                     alignment: _descriptor_21.alignment() } }] } },
                                                                          { idx: { cached: false,
                                                                                   pushPath: false,
                                                                                   path: [
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_5.toValue(key_0),
                                                                                                     alignment: _descriptor_5.alignment() } }] } },
                                                                          { popeq: { cached: false,
                                                                                     result: undefined } }]).value);
      },
      [Symbol.iterator](...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime.CompactError(`iter: expected 0 arguments, received ${args_0.length}`);
        }
        const self_0 = state.asArray()[4];
        return self_0.asMap().keys().map(  (key) => {    const value = self_0.asMap().get(key).asCell();    return [      _descriptor_5.fromValue(key.value),      _descriptor_9.fromValue(value.value)    ];  })[Symbol.iterator]();
      }
    }
  };
}
const _emptyContext = {
  currentQueryContext: new __compactRuntime.QueryContext(new __compactRuntime.ContractState().data, __compactRuntime.dummyContractAddress())
};
const _dummyContract = new Contract({
  getSchnorrReduction: (...args) => undefined,
  getAttestedScoringWitness: (...args) => undefined
});
export const pureCircuits = {
  publicKey: (...args_0) => {
    if (args_0.length !== 2) {
      throw new __compactRuntime.CompactError(`publicKey: expected 2 arguments (as invoked from Typescript), received ${args_0.length}`);
    }
    const sk_0 = args_0[0];
    const pin_0 = args_0[1];
    if (!(sk_0.buffer instanceof ArrayBuffer && sk_0.BYTES_PER_ELEMENT === 1 && sk_0.length === 32)) {
      __compactRuntime.typeError('publicKey',
                                 'argument 1',
                                 'zkloan-credit-scorer.compact line 227 char 1',
                                 'Bytes<32>',
                                 sk_0)
    }
    if (!(typeof(pin_0) === 'bigint' && pin_0 >= 0n && pin_0 <= 65535n)) {
      __compactRuntime.typeError('publicKey',
                                 'argument 2',
                                 'zkloan-credit-scorer.compact line 227 char 1',
                                 'Uint<0..65536>',
                                 pin_0)
    }
    return _dummyContract._publicKey_0(sk_0, pin_0);
  },
  schnorrChallenge: (...args_0) => {
    if (args_0.length !== 5) {
      throw new __compactRuntime.CompactError(`schnorrChallenge: expected 5 arguments (as invoked from Typescript), received ${args_0.length}`);
    }
    const ann_x_0 = args_0[0];
    const ann_y_0 = args_0[1];
    const pk_x_0 = args_0[2];
    const pk_y_0 = args_0[3];
    const msg_0 = args_0[4];
    if (!(typeof(ann_x_0) === 'bigint' && ann_x_0 >= 0 && ann_x_0 <= __compactRuntime.MAX_FIELD)) {
      __compactRuntime.typeError('schnorrChallenge',
                                 'argument 1',
                                 'zkloan-credit-scorer.compact line 235 char 1',
                                 'Field',
                                 ann_x_0)
    }
    if (!(typeof(ann_y_0) === 'bigint' && ann_y_0 >= 0 && ann_y_0 <= __compactRuntime.MAX_FIELD)) {
      __compactRuntime.typeError('schnorrChallenge',
                                 'argument 2',
                                 'zkloan-credit-scorer.compact line 235 char 1',
                                 'Field',
                                 ann_y_0)
    }
    if (!(typeof(pk_x_0) === 'bigint' && pk_x_0 >= 0 && pk_x_0 <= __compactRuntime.MAX_FIELD)) {
      __compactRuntime.typeError('schnorrChallenge',
                                 'argument 3',
                                 'zkloan-credit-scorer.compact line 235 char 1',
                                 'Field',
                                 pk_x_0)
    }
    if (!(typeof(pk_y_0) === 'bigint' && pk_y_0 >= 0 && pk_y_0 <= __compactRuntime.MAX_FIELD)) {
      __compactRuntime.typeError('schnorrChallenge',
                                 'argument 4',
                                 'zkloan-credit-scorer.compact line 235 char 1',
                                 'Field',
                                 pk_y_0)
    }
    if (!(Array.isArray(msg_0) && msg_0.length === 4 && msg_0.every((t) => typeof(t) === 'bigint' && t >= 0 && t <= __compactRuntime.MAX_FIELD))) {
      __compactRuntime.typeError('schnorrChallenge',
                                 'argument 5',
                                 'zkloan-credit-scorer.compact line 235 char 1',
                                 'Vector<4, Field>',
                                 msg_0)
    }
    return _dummyContract._schnorrChallenge_1(ann_x_0,
                                              ann_y_0,
                                              pk_x_0,
                                              pk_y_0,
                                              msg_0);
  }
};
export const contractReferenceLocations =
  { tag: 'publicLedgerArray', indices: { } };
//# sourceMappingURL=index.js.map

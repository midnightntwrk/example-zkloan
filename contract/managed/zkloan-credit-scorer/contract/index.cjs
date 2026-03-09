'use strict';
const __compactRuntime = require('@midnight-ntwrk/compact-runtime');
const expectedRuntimeVersionString = '0.8.1';
const expectedRuntimeVersion = expectedRuntimeVersionString.split('-')[0].split('.').map(Number);
const actualRuntimeVersion = __compactRuntime.versionString.split('-')[0].split('.').map(Number);
if (expectedRuntimeVersion[0] != actualRuntimeVersion[0]
     || (actualRuntimeVersion[0] == 0 && expectedRuntimeVersion[1] != actualRuntimeVersion[1])
     || expectedRuntimeVersion[1] > actualRuntimeVersion[1]
     || (expectedRuntimeVersion[1] == actualRuntimeVersion[1] && expectedRuntimeVersion[2] > actualRuntimeVersion[2]))
   throw new __compactRuntime.CompactError(`Version mismatch: compiled code expects ${expectedRuntimeVersionString}, runtime is ${__compactRuntime.versionString}`);
{ const MAX_FIELD = 52435875175126190479447740508185965837690552500527637822603658699938581184512n;
  if (__compactRuntime.MAX_FIELD !== MAX_FIELD)
     throw new __compactRuntime.CompactError(`compiler thinks maximum field value is ${MAX_FIELD}; run time thinks it is ${__compactRuntime.MAX_FIELD}`)
}

const _descriptor_0 = new __compactRuntime.CompactTypeUnsignedInteger(65535n, 2);

class _Applicant_0 {
  alignment() {
    return _descriptor_0.alignment().concat(_descriptor_0.alignment().concat(_descriptor_0.alignment()));
  }
  fromValue(value_0) {
    return {
      creditScore: _descriptor_0.fromValue(value_0),
      monthlyIncome: _descriptor_0.fromValue(value_0),
      monthsAsCustomer: _descriptor_0.fromValue(value_0)
    }
  }
  toValue(value_0) {
    return _descriptor_0.toValue(value_0.creditScore).concat(_descriptor_0.toValue(value_0.monthlyIncome).concat(_descriptor_0.toValue(value_0.monthsAsCustomer)));
  }
}

const _descriptor_1 = new _Applicant_0();

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

const _descriptor_4 = new __compactRuntime.CompactTypeBoolean();

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

const _descriptor_5 = new _ContractAddress_0();

const _descriptor_6 = new __compactRuntime.CompactTypeUnsignedInteger(18446744073709551615n, 8);

const _descriptor_7 = new __compactRuntime.CompactTypeEnum(2, 1);

class _LoanApplication_0 {
  alignment() {
    return _descriptor_3.alignment().concat(_descriptor_0.alignment().concat(_descriptor_7.alignment()));
  }
  fromValue(value_0) {
    return {
      requester: _descriptor_3.fromValue(value_0),
      authorizedAmount: _descriptor_0.fromValue(value_0),
      status: _descriptor_7.fromValue(value_0)
    }
  }
  toValue(value_0) {
    return _descriptor_3.toValue(value_0.requester).concat(_descriptor_0.toValue(value_0.authorizedAmount).concat(_descriptor_7.toValue(value_0.status)));
  }
}

const _descriptor_8 = new _LoanApplication_0();

const _descriptor_9 = new __compactRuntime.CompactTypeUnsignedInteger(255n, 1);

class Contract {
  witnesses;
  constructor(...args_0) {
    if (args_0.length !== 1)
      throw new __compactRuntime.CompactError(`Contract constructor: expected 1 argument, received ${args_0.length}`);
    const witnesses_0 = args_0[0];
    if (typeof(witnesses_0) !== 'object')
      throw new __compactRuntime.CompactError('first (witnesses) argument to Contract constructor is not an object');
    if (typeof(witnesses_0.getRequesterScoringWitness) !== 'function')
      throw new __compactRuntime.CompactError('first (witnesses) argument to Contract constructor does not contain a function-valued field named getRequesterScoringWitness');
    this.witnesses = witnesses_0;
    this.circuits = {
      requestLoan: (...args_1) => {
        if (args_1.length !== 3)
          throw new __compactRuntime.CompactError(`requestLoan: expected 3 arguments (as invoked from Typescript), received ${args_1.length}`);
        const contextOrig_0 = args_1[0];
        const requester_0 = args_1[1];
        const amountRequested_0 = args_1[2];
        if (!(typeof(contextOrig_0) === 'object' && contextOrig_0.originalState != undefined && contextOrig_0.transactionContext != undefined))
          __compactRuntime.type_error('requestLoan',
                                      'argument 1 (as invoked from Typescript)',
                                      'zkloan-credit-scorer.compact line 43 char 1',
                                      'CircuitContext',
                                      contextOrig_0)
        if (!(typeof(requester_0) === 'object' && requester_0.bytes.buffer instanceof ArrayBuffer && requester_0.bytes.BYTES_PER_ELEMENT === 1 && requester_0.bytes.length === 32))
          __compactRuntime.type_error('requestLoan',
                                      'argument 1 (argument 2 as invoked from Typescript)',
                                      'zkloan-credit-scorer.compact line 43 char 1',
                                      'struct ZswapCoinPublicKey<bytes: Bytes<32>>',
                                      requester_0)
        if (!(typeof(amountRequested_0) === 'bigint' && amountRequested_0 >= 0 && amountRequested_0 <= 65535n))
          __compactRuntime.type_error('requestLoan',
                                      'argument 2 (argument 3 as invoked from Typescript)',
                                      'zkloan-credit-scorer.compact line 43 char 1',
                                      'Uint<0..65535>',
                                      amountRequested_0)
        const context = { ...contextOrig_0 };
        const partialProofData = {
          input: {
            value: _descriptor_3.toValue(requester_0).concat(_descriptor_0.toValue(amountRequested_0)),
            alignment: _descriptor_3.alignment().concat(_descriptor_0.alignment())
          },
          output: undefined,
          publicTranscript: [],
          privateTranscriptOutputs: []
        };
        const result_0 = this.#_requestLoan_0(context,
                                              partialProofData,
                                              requester_0,
                                              amountRequested_0);
        partialProofData.output = { value: [], alignment: [] };
        return { result: result_0, context: context, proofData: partialProofData };
      }
    };
    this.impureCircuits = { requestLoan: this.circuits.requestLoan };
  }
  initialState(...args_0) {
    if (args_0.length !== 1)
      throw new __compactRuntime.CompactError(`Contract state constructor: expected 1 argument (as invoked from Typescript), received ${args_0.length}`);
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
    state_0.data = stateValue_0;
    state_0.setOperation('requestLoan', new __compactRuntime.ContractOperation());
    const context = {
      originalState: state_0,
      currentPrivateState: constructorContext_0.initialPrivateState,
      currentZswapLocalState: constructorContext_0.initialZswapLocalState,
      transactionContext: new __compactRuntime.QueryContext(state_0.data, __compactRuntime.dummyContractAddress())
    };
    const partialProofData = {
      input: { value: [], alignment: [] },
      output: undefined,
      publicTranscript: [],
      privateTranscriptOutputs: []
    };
    Contract._query(context,
                    partialProofData,
                    [
                     { push: { storage: false,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_9.toValue(0n),
                                                                            alignment: _descriptor_9.alignment() }).encode() } },
                     { push: { storage: true,
                               value: __compactRuntime.StateValue.newMap(
                                        new __compactRuntime.StateMap()
                                      ).encode() } },
                     { ins: { cached: false, n: 1 } }]);
    Contract._query(context,
                    partialProofData,
                    [
                     { push: { storage: false,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_9.toValue(1n),
                                                                            alignment: _descriptor_9.alignment() }).encode() } },
                     { push: { storage: true,
                               value: __compactRuntime.StateValue.newMap(
                                        new __compactRuntime.StateMap()
                                      ).encode() } },
                     { ins: { cached: false, n: 1 } }]);
    state_0.data = context.transactionContext.state;
    return {
      currentContractState: state_0,
      currentPrivateState: context.currentPrivateState,
      currentZswapLocalState: context.currentZswapLocalState
    }
  }
  #_ownPublicKey_0(context, partialProofData) {
    const result_0 = __compactRuntime.ownPublicKey(context);
    partialProofData.privateTranscriptOutputs.push({
      value: _descriptor_3.toValue(result_0),
      alignment: _descriptor_3.alignment()
    });
    return result_0;
  }
  #_getRequesterScoringWitness_0(context, partialProofData) {
    const witnessContext_0 = __compactRuntime.witnessContext(ledger(context.transactionContext.state), context.currentPrivateState, context.transactionContext.address);
    const [nextPrivateState_0, result_0] = this.witnesses.getRequesterScoringWitness(witnessContext_0);
    context.currentPrivateState = nextPrivateState_0;
    if (!(typeof(result_0) === 'object' && typeof(result_0.creditScore) === 'bigint' && result_0.creditScore >= 0 && result_0.creditScore <= 65535n && typeof(result_0.monthlyIncome) === 'bigint' && result_0.monthlyIncome >= 0 && result_0.monthlyIncome <= 65535n && typeof(result_0.monthsAsCustomer) === 'bigint' && result_0.monthsAsCustomer >= 0 && result_0.monthsAsCustomer <= 65535n))
      __compactRuntime.type_error('getRequesterScoringWitness',
                                  'return value',
                                  'zkloan-credit-scorer.compact line 41 char 1',
                                  'struct Applicant<creditScore: Uint<0..65535>, monthlyIncome: Uint<0..65535>, monthsAsCustomer: Uint<0..65535>>',
                                  result_0)
    partialProofData.privateTranscriptOutputs.push({
      value: _descriptor_1.toValue(result_0),
      alignment: _descriptor_1.alignment()
    });
    return result_0;
  }
  #_requestLoan_0(context, partialProofData, requester_0, amountRequested_0) {
    __compactRuntime.assert(_descriptor_4.fromValue(Contract._query(context,
                                                                    partialProofData,
                                                                    [
                                                                     { dup: { n: 0 } },
                                                                     { idx: { cached: false,
                                                                              pushPath: false,
                                                                              path: [
                                                                                     { tag: 'value',
                                                                                       value: { value: _descriptor_9.toValue(0n),
                                                                                                alignment: _descriptor_9.alignment() } }] } },
                                                                     { push: { storage: false,
                                                                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_3.toValue(requester_0),
                                                                                                                            alignment: _descriptor_3.alignment() }).encode() } },
                                                                     'member',
                                                                     { popeq: { cached: true,
                                                                                result: undefined } }]).value),
                            'Requester is blacklisted');
    const profile_0 = this.#_getRequesterScoringWitness_0(context,
                                                          partialProofData);
    const key_0 = this.#_ownPublicKey_0(context, partialProofData);
    if (profile_0.creditScore >= 700n && profile_0.monthlyIncome >= 2000n
        &&
        profile_0.monthsAsCustomer >= 24n)
    {
      const topTierAmount_0 = 5000n;
      const authorizedAmount_0 = amountRequested_0 > topTierAmount_0 ?
                                 topTierAmount_0 :
                                 amountRequested_0;
      const loan_0 = { requester:
                         this.#_ownPublicKey_0(context, partialProofData),
                       authorizedAmount: authorizedAmount_0,
                       status: 1 };
    }
    if (profile_0.creditScore >= 640n && profile_0.monthlyIncome >= 1500n) { }
    if (profile_0.creditScore >= 580n) { }
    return [];
  }
  static _query(context, partialProofData, prog) {
    var res;
    try {
      res = context.transactionContext.query(prog, __compactRuntime.CostModel.dummyCostModel());
    } catch (err) {
      throw new __compactRuntime.CompactError(err.toString());
    }
    context.transactionContext = res.context;
    var reads = res.events.filter((e) => e.tag === 'read');
    var i = 0;
    partialProofData.publicTranscript = partialProofData.publicTranscript.concat(prog.map((op) => {
      if(typeof(op) === 'object' && 'popeq' in op) {
        return { popeq: {
          ...op.popeq,
          result: reads[i++].content,
        } };
      } else {
        return op;
      }
    }));
    if(res.events.length == 1 && res.events[0].tag === 'read') {
      return res.events[0].content;
    } else {
      return res.events;
    }
  }
}
function ledger(state) {
  const context = {
    originalState: state,
    transactionContext: new __compactRuntime.QueryContext(state, __compactRuntime.dummyContractAddress())
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
        if (args_0.length !== 0)
          throw new __compactRuntime.CompactError(`isEmpty: expected 0 arguments, received ${args_0.length}`);
        return _descriptor_4.fromValue(Contract._query(context,
                                                       partialProofData,
                                                       [
                                                        { dup: { n: 0 } },
                                                        { idx: { cached: false,
                                                                 pushPath: false,
                                                                 path: [
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_9.toValue(0n),
                                                                                   alignment: _descriptor_9.alignment() } }] } },
                                                        'size',
                                                        { push: { storage: false,
                                                                  value: __compactRuntime.StateValue.newCell({ value: _descriptor_6.toValue(0n),
                                                                                                               alignment: _descriptor_6.alignment() }).encode() } },
                                                        'eq',
                                                        { popeq: { cached: true,
                                                                   result: undefined } }]).value);
      },
      size(...args_0) {
        if (args_0.length !== 0)
          throw new __compactRuntime.CompactError(`size: expected 0 arguments, received ${args_0.length}`);
        return _descriptor_6.fromValue(Contract._query(context,
                                                       partialProofData,
                                                       [
                                                        { dup: { n: 0 } },
                                                        { idx: { cached: false,
                                                                 pushPath: false,
                                                                 path: [
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_9.toValue(0n),
                                                                                   alignment: _descriptor_9.alignment() } }] } },
                                                        'size',
                                                        { popeq: { cached: true,
                                                                   result: undefined } }]).value);
      },
      member(...args_0) {
        if (args_0.length !== 1)
          throw new __compactRuntime.CompactError(`member: expected 1 argument, received ${args_0.length}`);
        const elem_0 = args_0[0];
        if (!(typeof(elem_0) === 'object' && elem_0.bytes.buffer instanceof ArrayBuffer && elem_0.bytes.BYTES_PER_ELEMENT === 1 && elem_0.bytes.length === 32))
          __compactRuntime.type_error('member',
                                      'argument 1',
                                      'zkloan-credit-scorer.compact line 38 char 1',
                                      'struct ZswapCoinPublicKey<bytes: Bytes<32>>',
                                      elem_0)
        return _descriptor_4.fromValue(Contract._query(context,
                                                       partialProofData,
                                                       [
                                                        { dup: { n: 0 } },
                                                        { idx: { cached: false,
                                                                 pushPath: false,
                                                                 path: [
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_9.toValue(0n),
                                                                                   alignment: _descriptor_9.alignment() } }] } },
                                                        { push: { storage: false,
                                                                  value: __compactRuntime.StateValue.newCell({ value: _descriptor_3.toValue(elem_0),
                                                                                                               alignment: _descriptor_3.alignment() }).encode() } },
                                                        'member',
                                                        { popeq: { cached: true,
                                                                   result: undefined } }]).value);
      },
      [Symbol.iterator](...args_0) {
        if (args_0.length !== 0)
          throw new __compactRuntime.CompactError(`iter: expected 0 arguments, received ${args_0.length}`);
        const self_0 = state.asArray()[0];
        return self_0.asMap().keys().map((elem) => _descriptor_3.fromValue(elem.value))[Symbol.iterator]();
      }
    },
    loans: {
      isEmpty(...args_0) {
        if (args_0.length !== 0)
          throw new __compactRuntime.CompactError(`isEmpty: expected 0 arguments, received ${args_0.length}`);
        return _descriptor_4.fromValue(Contract._query(context,
                                                       partialProofData,
                                                       [
                                                        { dup: { n: 0 } },
                                                        { idx: { cached: false,
                                                                 pushPath: false,
                                                                 path: [
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_9.toValue(1n),
                                                                                   alignment: _descriptor_9.alignment() } }] } },
                                                        'size',
                                                        { push: { storage: false,
                                                                  value: __compactRuntime.StateValue.newCell({ value: _descriptor_6.toValue(0n),
                                                                                                               alignment: _descriptor_6.alignment() }).encode() } },
                                                        'eq',
                                                        { popeq: { cached: true,
                                                                   result: undefined } }]).value);
      },
      size(...args_0) {
        if (args_0.length !== 0)
          throw new __compactRuntime.CompactError(`size: expected 0 arguments, received ${args_0.length}`);
        return _descriptor_6.fromValue(Contract._query(context,
                                                       partialProofData,
                                                       [
                                                        { dup: { n: 0 } },
                                                        { idx: { cached: false,
                                                                 pushPath: false,
                                                                 path: [
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_9.toValue(1n),
                                                                                   alignment: _descriptor_9.alignment() } }] } },
                                                        'size',
                                                        { popeq: { cached: true,
                                                                   result: undefined } }]).value);
      },
      member(...args_0) {
        if (args_0.length !== 1)
          throw new __compactRuntime.CompactError(`member: expected 1 argument, received ${args_0.length}`);
        const key_0 = args_0[0];
        if (!(typeof(key_0) === 'object' && key_0.bytes.buffer instanceof ArrayBuffer && key_0.bytes.BYTES_PER_ELEMENT === 1 && key_0.bytes.length === 32))
          __compactRuntime.type_error('member',
                                      'argument 1',
                                      'zkloan-credit-scorer.compact line 39 char 1',
                                      'struct ZswapCoinPublicKey<bytes: Bytes<32>>',
                                      key_0)
        return _descriptor_4.fromValue(Contract._query(context,
                                                       partialProofData,
                                                       [
                                                        { dup: { n: 0 } },
                                                        { idx: { cached: false,
                                                                 pushPath: false,
                                                                 path: [
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_9.toValue(1n),
                                                                                   alignment: _descriptor_9.alignment() } }] } },
                                                        { push: { storage: false,
                                                                  value: __compactRuntime.StateValue.newCell({ value: _descriptor_3.toValue(key_0),
                                                                                                               alignment: _descriptor_3.alignment() }).encode() } },
                                                        'member',
                                                        { popeq: { cached: true,
                                                                   result: undefined } }]).value);
      },
      lookup(...args_0) {
        if (args_0.length !== 1)
          throw new __compactRuntime.CompactError(`lookup: expected 1 argument, received ${args_0.length}`);
        const key_0 = args_0[0];
        if (!(typeof(key_0) === 'object' && key_0.bytes.buffer instanceof ArrayBuffer && key_0.bytes.BYTES_PER_ELEMENT === 1 && key_0.bytes.length === 32))
          __compactRuntime.type_error('lookup',
                                      'argument 1',
                                      'zkloan-credit-scorer.compact line 39 char 1',
                                      'struct ZswapCoinPublicKey<bytes: Bytes<32>>',
                                      key_0)
        if (state.asArray()[1].asMap().get({ value: _descriptor_3.toValue(key_0),
                                             alignment: _descriptor_3.alignment() }) === undefined)
          throw new __compactRuntime.CompactError(`Map value undefined for ${key_0}`);
        return {
          isEmpty(...args_1) {
            if (args_1.length !== 0)
              throw new __compactRuntime.CompactError(`isEmpty: expected 0 arguments, received ${args_1.length}`);
            return _descriptor_4.fromValue(Contract._query(context,
                                                           partialProofData,
                                                           [
                                                            { dup: { n: 0 } },
                                                            { idx: { cached: false,
                                                                     pushPath: false,
                                                                     path: [
                                                                            { tag: 'value',
                                                                              value: { value: _descriptor_9.toValue(1n),
                                                                                       alignment: _descriptor_9.alignment() } },
                                                                            { tag: 'value',
                                                                              value: { value: _descriptor_3.toValue(key_0),
                                                                                       alignment: _descriptor_3.alignment() } }] } },
                                                            'size',
                                                            { push: { storage: false,
                                                                      value: __compactRuntime.StateValue.newCell({ value: _descriptor_6.toValue(0n),
                                                                                                                   alignment: _descriptor_6.alignment() }).encode() } },
                                                            'eq',
                                                            { popeq: { cached: true,
                                                                       result: undefined } }]).value);
          },
          size(...args_1) {
            if (args_1.length !== 0)
              throw new __compactRuntime.CompactError(`size: expected 0 arguments, received ${args_1.length}`);
            return _descriptor_6.fromValue(Contract._query(context,
                                                           partialProofData,
                                                           [
                                                            { dup: { n: 0 } },
                                                            { idx: { cached: false,
                                                                     pushPath: false,
                                                                     path: [
                                                                            { tag: 'value',
                                                                              value: { value: _descriptor_9.toValue(1n),
                                                                                       alignment: _descriptor_9.alignment() } },
                                                                            { tag: 'value',
                                                                              value: { value: _descriptor_3.toValue(key_0),
                                                                                       alignment: _descriptor_3.alignment() } }] } },
                                                            'size',
                                                            { popeq: { cached: true,
                                                                       result: undefined } }]).value);
          },
          member(...args_1) {
            if (args_1.length !== 1)
              throw new __compactRuntime.CompactError(`member: expected 1 argument, received ${args_1.length}`);
            const key_1 = args_1[0];
            if (!(typeof(key_1) === 'bigint' && key_1 >= 0 && key_1 <= 65535n))
              __compactRuntime.type_error('member',
                                          'argument 1',
                                          'zkloan-credit-scorer.compact line 39 char 46',
                                          'Uint<0..65535>',
                                          key_1)
            return _descriptor_4.fromValue(Contract._query(context,
                                                           partialProofData,
                                                           [
                                                            { dup: { n: 0 } },
                                                            { idx: { cached: false,
                                                                     pushPath: false,
                                                                     path: [
                                                                            { tag: 'value',
                                                                              value: { value: _descriptor_9.toValue(1n),
                                                                                       alignment: _descriptor_9.alignment() } },
                                                                            { tag: 'value',
                                                                              value: { value: _descriptor_3.toValue(key_0),
                                                                                       alignment: _descriptor_3.alignment() } }] } },
                                                            { push: { storage: false,
                                                                      value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(key_1),
                                                                                                                   alignment: _descriptor_0.alignment() }).encode() } },
                                                            'member',
                                                            { popeq: { cached: true,
                                                                       result: undefined } }]).value);
          },
          lookup(...args_1) {
            if (args_1.length !== 1)
              throw new __compactRuntime.CompactError(`lookup: expected 1 argument, received ${args_1.length}`);
            const key_1 = args_1[0];
            if (!(typeof(key_1) === 'bigint' && key_1 >= 0 && key_1 <= 65535n))
              __compactRuntime.type_error('lookup',
                                          'argument 1',
                                          'zkloan-credit-scorer.compact line 39 char 46',
                                          'Uint<0..65535>',
                                          key_1)
            return _descriptor_8.fromValue(Contract._query(context,
                                                           partialProofData,
                                                           [
                                                            { dup: { n: 0 } },
                                                            { idx: { cached: false,
                                                                     pushPath: false,
                                                                     path: [
                                                                            { tag: 'value',
                                                                              value: { value: _descriptor_9.toValue(1n),
                                                                                       alignment: _descriptor_9.alignment() } },
                                                                            { tag: 'value',
                                                                              value: { value: _descriptor_3.toValue(key_0),
                                                                                       alignment: _descriptor_3.alignment() } }] } },
                                                            { idx: { cached: false,
                                                                     pushPath: false,
                                                                     path: [
                                                                            { tag: 'value',
                                                                              value: { value: _descriptor_0.toValue(key_1),
                                                                                       alignment: _descriptor_0.alignment() } }] } },
                                                            { popeq: { cached: false,
                                                                       result: undefined } }]).value);
          },
          [Symbol.iterator](...args_1) {
            if (args_1.length !== 0)
              throw new __compactRuntime.CompactError(`iter: expected 0 arguments, received ${args_1.length}`);
            const self_0 = state.asArray()[1].asMap().get({ value: _descriptor_3.toValue(key_0),
                                                            alignment: _descriptor_3.alignment() });
            return self_0.asMap().keys().map(  (key) => {    const value = self_0.asMap().get(key).asCell();    return [      _descriptor_0.fromValue(key.value),      _descriptor_8.fromValue(value.value)    ];  })[Symbol.iterator]();
          }
        }
      }
    }
  };
}
const _emptyContext = {
  originalState: new __compactRuntime.ContractState(),
  transactionContext: new __compactRuntime.QueryContext(new __compactRuntime.ContractState().data, __compactRuntime.dummyContractAddress())
};
const _dummyContract = new Contract({
  getRequesterScoringWitness: (...args) => undefined
});
const pureCircuits = { };
const contractReferenceLocations = { tag: 'publicLedgerArray', indices: { } };
exports.Contract = Contract;
exports.ledger = ledger;
exports.pureCircuits = pureCircuits;
exports.contractReferenceLocations = contractReferenceLocations;
//# sourceMappingURL=index.cjs.map

// ../node_modules/@midnight-ntwrk/midnight-js-types/dist/index.mjs
var getImpureCircuitIds = (contract) => Object.keys(contract.impureCircuits);
var InvalidProtocolSchemeError = class extends Error {
  invalidScheme;
  allowableSchemes;
  /**
   * @param invalidScheme The invalid scheme.
   * @param allowableSchemes The valid schemes that are allowed.
   */
  constructor(invalidScheme, allowableSchemes) {
    super(`Invalid protocol scheme: '${invalidScheme}'. Allowable schemes are one of: ${allowableSchemes.join(",")}`);
    this.invalidScheme = invalidScheme;
    this.allowableSchemes = allowableSchemes;
  }
};
var LogLevel;
(function(LogLevel2) {
  LogLevel2["INFO"] = "info";
  LogLevel2["WARN"] = "warn";
  LogLevel2["ERROR"] = "error";
  LogLevel2["FATAL"] = "fatal";
  LogLevel2["DEBUG"] = "debug";
  LogLevel2["TRACE"] = "trace";
})(LogLevel || (LogLevel = {}));
var createProverKey = (uint8Array) => {
  return uint8Array;
};
var createVerifierKey = (uint8Array) => {
  return uint8Array;
};
var createZKIR = (uint8Array) => {
  return uint8Array;
};
var SegmentFail = "SegmentFail";
var SegmentSuccess = "SegmentSuccess";
var FailEntirely = "FailEntirely";
var FailFallible = "FailFallible";
var SucceedEntirely = "SucceedEntirely";
var TRANSACTION_TO_PROVE = "TransactionToProve";
var BALANCE_TRANSACTION_TO_PROVE = "BalanceTransactionToProve";
var NOTHING_TO_PROVE = "NothingToProve";
var ZKConfigProvider = class {
  /**
   * Retrieves the verifier keys produced by `compact` compiler for the given circuits.
   * @param circuitIds The circuit IDs of the verifier keys to retrieve.
   */
  async getVerifierKeys(circuitIds) {
    return Promise.all(circuitIds.map(async (id) => {
      const key = await this.getVerifierKey(id);
      return [id, key];
    }));
  }
  /**
   * Retrieves all zero-knowledge artifacts produced by `compact` compiler for the given circuit.
   * @param circuitId The circuit ID of the artifacts to retrieve.
   */
  async get(circuitId) {
    return {
      circuitId,
      proverKey: await this.getProverKey(circuitId),
      verifierKey: await this.getVerifierKey(circuitId),
      zkir: await this.getZKIR(circuitId)
    };
  }
};

export {
  getImpureCircuitIds,
  InvalidProtocolSchemeError,
  createProverKey,
  createVerifierKey,
  createZKIR,
  SegmentFail,
  SegmentSuccess,
  FailEntirely,
  FailFallible,
  SucceedEntirely,
  TRANSACTION_TO_PROVE,
  BALANCE_TRANSACTION_TO_PROVE,
  NOTHING_TO_PROVE,
  ZKConfigProvider
};
//# sourceMappingURL=chunk-J7ZCMGN6.js.map

import {
  require_lodash
} from "./chunk-BGXZO4NR.js";
import {
  require_browser_ponyfill
} from "./chunk-ZUV5NWEK.js";
import {
  InvalidProtocolSchemeError
} from "./chunk-J7ZCMGN6.js";
import {
  Transaction,
  createProvingTransactionPayload
} from "./chunk-TB2A6I4S.js";
import {
  __commonJS,
  __toESM
} from "./chunk-V4OQ3NZ2.js";

// ../node_modules/fetch-retry/dist/fetch-retry.umd.js
var require_fetch_retry_umd = __commonJS({
  "../node_modules/fetch-retry/dist/fetch-retry.umd.js"(exports, module) {
    (function(global, factory) {
      typeof exports === "object" && typeof module !== "undefined" ? module.exports = factory() : typeof define === "function" && define.amd ? define(factory) : (global = typeof globalThis !== "undefined" ? globalThis : global || self, global.fetchRetry = factory());
    })(exports, (function() {
      "use strict";
      var fetchRetry2 = function(fetch2, defaults) {
        defaults = defaults || {};
        if (typeof fetch2 !== "function") {
          throw new ArgumentError("fetch must be a function");
        }
        if (typeof defaults !== "object") {
          throw new ArgumentError("defaults must be an object");
        }
        if (defaults.retries !== void 0 && !isPositiveInteger(defaults.retries)) {
          throw new ArgumentError("retries must be a positive integer");
        }
        if (defaults.retryDelay !== void 0 && !isPositiveInteger(defaults.retryDelay) && typeof defaults.retryDelay !== "function") {
          throw new ArgumentError("retryDelay must be a positive integer or a function returning a positive integer");
        }
        if (defaults.retryOn !== void 0 && !Array.isArray(defaults.retryOn) && typeof defaults.retryOn !== "function") {
          throw new ArgumentError("retryOn property expects an array or function");
        }
        var baseDefaults = {
          retries: 3,
          retryDelay: 1e3,
          retryOn: []
        };
        defaults = Object.assign(baseDefaults, defaults);
        return function fetchRetry3(input, init) {
          var retries = defaults.retries;
          var retryDelay = defaults.retryDelay;
          var retryOn = defaults.retryOn;
          if (init && init.retries !== void 0) {
            if (isPositiveInteger(init.retries)) {
              retries = init.retries;
            } else {
              throw new ArgumentError("retries must be a positive integer");
            }
          }
          if (init && init.retryDelay !== void 0) {
            if (isPositiveInteger(init.retryDelay) || typeof init.retryDelay === "function") {
              retryDelay = init.retryDelay;
            } else {
              throw new ArgumentError("retryDelay must be a positive integer or a function returning a positive integer");
            }
          }
          if (init && init.retryOn) {
            if (Array.isArray(init.retryOn) || typeof init.retryOn === "function") {
              retryOn = init.retryOn;
            } else {
              throw new ArgumentError("retryOn property expects an array or function");
            }
          }
          return new Promise(function(resolve, reject) {
            var wrappedFetch = function(attempt) {
              var _input = typeof Request !== "undefined" && input instanceof Request ? input.clone() : input;
              fetch2(_input, init).then(function(response) {
                if (Array.isArray(retryOn) && retryOn.indexOf(response.status) === -1) {
                  resolve(response);
                } else if (typeof retryOn === "function") {
                  try {
                    return Promise.resolve(retryOn(attempt, null, response)).then(function(retryOnResponse) {
                      if (retryOnResponse) {
                        retry(attempt, null, response);
                      } else {
                        resolve(response);
                      }
                    }).catch(reject);
                  } catch (error) {
                    reject(error);
                  }
                } else {
                  if (attempt < retries) {
                    retry(attempt, null, response);
                  } else {
                    resolve(response);
                  }
                }
              }).catch(function(error) {
                if (typeof retryOn === "function") {
                  try {
                    Promise.resolve(retryOn(attempt, error, null)).then(function(retryOnResponse) {
                      if (retryOnResponse) {
                        retry(attempt, error, null);
                      } else {
                        reject(error);
                      }
                    }).catch(function(error2) {
                      reject(error2);
                    });
                  } catch (error2) {
                    reject(error2);
                  }
                } else if (attempt < retries) {
                  retry(attempt, error, null);
                } else {
                  reject(error);
                }
              });
            };
            function retry(attempt, error, response) {
              var delay = typeof retryDelay === "function" ? retryDelay(attempt, error, response) : retryDelay;
              setTimeout(function() {
                wrappedFetch(++attempt);
              }, delay);
            }
            wrappedFetch(0);
          });
        };
      };
      function isPositiveInteger(value) {
        return Number.isInteger(value) && value >= 0;
      }
      function ArgumentError(message) {
        this.name = "ArgumentError";
        this.message = message;
      }
      return fetchRetry2;
    }));
  }
});

// ../node_modules/@midnight-ntwrk/midnight-js-http-client-proof-provider/dist/index.mjs
var import_cross_fetch = __toESM(require_browser_ponyfill(), 1);
var import_fetch_retry = __toESM(require_fetch_retry_umd(), 1);
var import_lodash = __toESM(require_lodash(), 1);
var retryOptions = {
  retries: 3,
  retryDelay: (attempt) => 2 ** attempt * 1e3,
  retryOn: [500, 503]
};
var fetchRetry = (0, import_fetch_retry.default)(import_cross_fetch.default, retryOptions);
var deserializePayload = (arrayBuffer) => {
  const bytes = new Uint8Array(arrayBuffer);
  const transaction = Transaction.deserialize("signature", "proof", "pre-binding", bytes);
  return transaction;
};
var PROVE_TX_PATH = "/prove-tx";
var DEFAULT_CONFIG = {
  /**
   * The default timeout for prove requests.
   */
  timeout: 3e5,
  /**
   * The default ZK configuration to use. It is overwritten with a proper ZK
   * configuration only if a call transaction is being proven.
   */
  zkConfig: void 0
};
var getKeyMaterial = (zkConfig) => {
  return {
    proverKey: zkConfig?.proverKey,
    verifierKey: zkConfig?.verifierKey,
    ir: zkConfig?.zkir
  };
};
var serializeTransactionPayload = (unprovenTx, zkConfig) => {
  const map = /* @__PURE__ */ new Map();
  if (zkConfig) {
    map.set(zkConfig?.circuitId, getKeyMaterial(zkConfig));
  }
  return createProvingTransactionPayload(unprovenTx, map);
};
var httpClientProofProvider = (url) => {
  const urlObject = new URL(PROVE_TX_PATH, url);
  if (urlObject.protocol !== "http:" && urlObject.protocol !== "https:") {
    throw new InvalidProtocolSchemeError(urlObject.protocol, ["http:", "https:"]);
  }
  return {
    async proveTx(unprovenTx, partialProveTxConfig) {
      const config = import_lodash.default.defaults(partialProveTxConfig, DEFAULT_CONFIG);
      const requestBody = serializeTransactionPayload(unprovenTx, config.zkConfig).buffer;
      const response = await fetchRetry(urlObject, {
        method: "POST",
        body: requestBody,
        signal: AbortSignal.timeout(config.timeout)
      });
      if (!response.ok) {
        throw new Error(`Failed Proof Server response: url="${response.url}", code="${response.status}", status="${response.statusText}"`);
      }
      return deserializePayload(await response.arrayBuffer());
    }
  };
};
export {
  DEFAULT_CONFIG,
  httpClientProofProvider,
  serializeTransactionPayload
};
//# sourceMappingURL=@midnight-ntwrk_midnight-js-http-client-proof-provider.js.map

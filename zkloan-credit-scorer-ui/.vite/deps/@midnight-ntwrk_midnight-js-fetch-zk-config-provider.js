import {
  require_browser_ponyfill
} from "./chunk-ZUV5NWEK.js";
import {
  InvalidProtocolSchemeError,
  ZKConfigProvider,
  createProverKey,
  createVerifierKey,
  createZKIR
} from "./chunk-J7ZCMGN6.js";
import "./chunk-TB2A6I4S.js";
import {
  __toESM
} from "./chunk-V4OQ3NZ2.js";

// ../node_modules/@midnight-ntwrk/midnight-js-fetch-zk-config-provider/dist/index.mjs
var import_cross_fetch = __toESM(require_browser_ponyfill(), 1);
var KEY_PATH = "keys";
var PROVER_EXT = ".prover";
var VERIFIER_EXT = ".verifier";
var ZKIR_PATH = "zkir";
var ZKIR_EXT = ".bzkir";
var FetchZkConfigProvider = class extends ZKConfigProvider {
  baseURL;
  fetchFunc;
  /**
   * @param baseURL The endpoint to query for ZK artifacts.
   * @param fetchFunc The function to use to execute queries.
   */
  constructor(baseURL, fetchFunc = import_cross_fetch.fetch) {
    super();
    this.baseURL = baseURL;
    this.fetchFunc = fetchFunc;
    const urlObject = new URL(baseURL);
    if (urlObject.protocol !== "http:" && urlObject.protocol !== "https:") {
      throw new InvalidProtocolSchemeError(urlObject.protocol, ["http:", "https:"]);
    }
  }
  async sendRequest(url, circuitId, ext, responseType) {
    const response = await this.fetchFunc(`${this.baseURL}/${url}/${circuitId}${ext}`, {
      method: "GET"
    });
    if (response.ok) {
      return responseType === "text" ? await response.text() : await response.arrayBuffer().then((arrayBuffer) => new Uint8Array(arrayBuffer));
    }
    throw new Error(response.statusText);
  }
  getProverKey(circuitId) {
    return this.sendRequest(KEY_PATH, circuitId, PROVER_EXT, "arraybuffer").then(createProverKey);
  }
  getVerifierKey(circuitId) {
    return this.sendRequest(KEY_PATH, circuitId, VERIFIER_EXT, "arraybuffer").then(createVerifierKey);
  }
  getZKIR(circuitId) {
    return this.sendRequest(ZKIR_PATH, circuitId, ZKIR_EXT, "arraybuffer").then(createZKIR);
  }
};
export {
  FetchZkConfigProvider
};
//# sourceMappingURL=@midnight-ntwrk_midnight-js-fetch-zk-config-provider.js.map

let wasm;
export function __wbg_set_wasm(val) {
    wasm = val;
}


let WASM_VECTOR_LEN = 0;

let cachedUint8ArrayMemory0 = null;

function getUint8ArrayMemory0() {
    if (cachedUint8ArrayMemory0 === null || cachedUint8ArrayMemory0.byteLength === 0) {
        cachedUint8ArrayMemory0 = new Uint8Array(wasm.memory.buffer);
    }
    return cachedUint8ArrayMemory0;
}

const lTextEncoder = typeof TextEncoder === 'undefined' ? (0, module.require)('util').TextEncoder : TextEncoder;

let cachedTextEncoder = new lTextEncoder('utf-8');

const encodeString = (typeof cachedTextEncoder.encodeInto === 'function'
    ? function (arg, view) {
    return cachedTextEncoder.encodeInto(arg, view);
}
    : function (arg, view) {
    const buf = cachedTextEncoder.encode(arg);
    view.set(buf);
    return {
        read: arg.length,
        written: buf.length
    };
});

function passStringToWasm0(arg, malloc, realloc) {

    if (realloc === undefined) {
        const buf = cachedTextEncoder.encode(arg);
        const ptr = malloc(buf.length, 1) >>> 0;
        getUint8ArrayMemory0().subarray(ptr, ptr + buf.length).set(buf);
        WASM_VECTOR_LEN = buf.length;
        return ptr;
    }

    let len = arg.length;
    let ptr = malloc(len, 1) >>> 0;

    const mem = getUint8ArrayMemory0();

    let offset = 0;

    for (; offset < len; offset++) {
        const code = arg.charCodeAt(offset);
        if (code > 0x7F) break;
        mem[ptr + offset] = code;
    }

    if (offset !== len) {
        if (offset !== 0) {
            arg = arg.slice(offset);
        }
        ptr = realloc(ptr, len, len = offset + arg.length * 3, 1) >>> 0;
        const view = getUint8ArrayMemory0().subarray(ptr + offset, ptr + len);
        const ret = encodeString(arg, view);

        offset += ret.written;
        ptr = realloc(ptr, len, offset, 1) >>> 0;
    }

    WASM_VECTOR_LEN = offset;
    return ptr;
}

let cachedDataViewMemory0 = null;

function getDataViewMemory0() {
    if (cachedDataViewMemory0 === null || cachedDataViewMemory0.buffer.detached === true || (cachedDataViewMemory0.buffer.detached === undefined && cachedDataViewMemory0.buffer !== wasm.memory.buffer)) {
        cachedDataViewMemory0 = new DataView(wasm.memory.buffer);
    }
    return cachedDataViewMemory0;
}

function addToExternrefTable0(obj) {
    const idx = wasm.__externref_table_alloc();
    wasm.__wbindgen_export_4.set(idx, obj);
    return idx;
}

function handleError(f, args) {
    try {
        return f.apply(this, args);
    } catch (e) {
        const idx = addToExternrefTable0(e);
        wasm.__wbindgen_exn_store(idx);
    }
}

function isLikeNone(x) {
    return x === undefined || x === null;
}

const lTextDecoder = typeof TextDecoder === 'undefined' ? (0, module.require)('util').TextDecoder : TextDecoder;

let cachedTextDecoder = new lTextDecoder('utf-8', { ignoreBOM: true, fatal: true });

cachedTextDecoder.decode();

function getStringFromWasm0(ptr, len) {
    ptr = ptr >>> 0;
    return cachedTextDecoder.decode(getUint8ArrayMemory0().subarray(ptr, ptr + len));
}

const CLOSURE_DTORS = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(state => {
    wasm.__wbindgen_export_5.get(state.dtor)(state.a, state.b)
});

function makeMutClosure(arg0, arg1, dtor, f) {
    const state = { a: arg0, b: arg1, cnt: 1, dtor };
    const real = (...args) => {
        // First up with a closure we increment the internal reference
        // count. This ensures that the Rust closure environment won't
        // be deallocated while we're invoking it.
        state.cnt++;
        const a = state.a;
        state.a = 0;
        try {
            return f(a, state.b, ...args);
        } finally {
            if (--state.cnt === 0) {
                wasm.__wbindgen_export_5.get(state.dtor)(a, state.b);
                CLOSURE_DTORS.unregister(state);
            } else {
                state.a = a;
            }
        }
    };
    real.original = state;
    CLOSURE_DTORS.register(real, state, state);
    return real;
}

function debugString(val) {
    // primitive types
    const type = typeof val;
    if (type == 'number' || type == 'boolean' || val == null) {
        return  `${val}`;
    }
    if (type == 'string') {
        return `"${val}"`;
    }
    if (type == 'symbol') {
        const description = val.description;
        if (description == null) {
            return 'Symbol';
        } else {
            return `Symbol(${description})`;
        }
    }
    if (type == 'function') {
        const name = val.name;
        if (typeof name == 'string' && name.length > 0) {
            return `Function(${name})`;
        } else {
            return 'Function';
        }
    }
    // objects
    if (Array.isArray(val)) {
        const length = val.length;
        let debug = '[';
        if (length > 0) {
            debug += debugString(val[0]);
        }
        for(let i = 1; i < length; i++) {
            debug += ', ' + debugString(val[i]);
        }
        debug += ']';
        return debug;
    }
    // Test for built-in
    const builtInMatches = /\[object ([^\]]+)\]/.exec(toString.call(val));
    let className;
    if (builtInMatches && builtInMatches.length > 1) {
        className = builtInMatches[1];
    } else {
        // Failed to match the standard '[object ClassName]'
        return toString.call(val);
    }
    if (className == 'Object') {
        // we're a user defined class or Object
        // JSON.stringify avoids problems with cycles, and is generally much
        // easier than looping through ownProperties of `val`.
        try {
            return 'Object(' + JSON.stringify(val) + ')';
        } catch (_) {
            return 'Object';
        }
    }
    // errors
    if (val instanceof Error) {
        return `${val.name}: ${val.message}\n${val.stack}`;
    }
    // TODO we could test for more things here, like `Set`s and `Map`s.
    return className;
}

function takeFromExternrefTable0(idx) {
    const value = wasm.__wbindgen_export_4.get(idx);
    wasm.__externref_table_dealloc(idx);
    return value;
}

function _assertClass(instance, klass) {
    if (!(instance instanceof klass)) {
        throw new Error(`expected instance of ${klass.name}`);
    }
}

function getArrayU8FromWasm0(ptr, len) {
    ptr = ptr >>> 0;
    return getUint8ArrayMemory0().subarray(ptr / 1, ptr / 1 + len);
}

function passArray8ToWasm0(arg, malloc) {
    const ptr = malloc(arg.length * 1, 1) >>> 0;
    getUint8ArrayMemory0().set(arg, ptr / 1);
    WASM_VECTOR_LEN = arg.length;
    return ptr;
}

function getArrayJsValueFromWasm0(ptr, len) {
    ptr = ptr >>> 0;
    const mem = getDataViewMemory0();
    const result = [];
    for (let i = ptr; i < ptr + 4 * len; i += 4) {
        result.push(wasm.__wbindgen_export_4.get(mem.getUint32(i, true)));
    }
    wasm.__externref_drop_slice(ptr, len);
    return result;
}
/**
 * @param {string} type_
 * @param {any} value
 * @returns {any}
 */
export function createCoinInfo(type_, value) {
    const ptr0 = passStringToWasm0(type_, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    const len0 = WASM_VECTOR_LEN;
    const ret = wasm.createCoinInfo(ptr0, len0, value);
    if (ret[2]) {
        throw takeFromExternrefTable0(ret[1]);
    }
    return takeFromExternrefTable0(ret[0]);
}

/**
 * @returns {string}
 */
export function nativeToken() {
    let deferred2_0;
    let deferred2_1;
    try {
        const ret = wasm.nativeToken();
        var ptr1 = ret[0];
        var len1 = ret[1];
        if (ret[3]) {
            ptr1 = 0; len1 = 0;
            throw takeFromExternrefTable0(ret[2]);
        }
        deferred2_0 = ptr1;
        deferred2_1 = len1;
        return getStringFromWasm0(ptr1, len1);
    } finally {
        wasm.__wbindgen_free(deferred2_0, deferred2_1, 1);
    }
}

/**
 * @returns {string}
 */
export function sampleContractAddress() {
    let deferred2_0;
    let deferred2_1;
    try {
        const ret = wasm.sampleContractAddress();
        var ptr1 = ret[0];
        var len1 = ret[1];
        if (ret[3]) {
            ptr1 = 0; len1 = 0;
            throw takeFromExternrefTable0(ret[2]);
        }
        deferred2_0 = ptr1;
        deferred2_1 = len1;
        return getStringFromWasm0(ptr1, len1);
    } finally {
        wasm.__wbindgen_free(deferred2_0, deferred2_1, 1);
    }
}

/**
 * @returns {string}
 */
export function sampleTokenType() {
    let deferred2_0;
    let deferred2_1;
    try {
        const ret = wasm.sampleTokenType();
        var ptr1 = ret[0];
        var len1 = ret[1];
        if (ret[3]) {
            ptr1 = 0; len1 = 0;
            throw takeFromExternrefTable0(ret[2]);
        }
        deferred2_0 = ptr1;
        deferred2_1 = len1;
        return getStringFromWasm0(ptr1, len1);
    } finally {
        wasm.__wbindgen_free(deferred2_0, deferred2_1, 1);
    }
}

/**
 * @returns {string}
 */
export function sampleCoinPublicKey() {
    let deferred2_0;
    let deferred2_1;
    try {
        const ret = wasm.sampleCoinPublicKey();
        var ptr1 = ret[0];
        var len1 = ret[1];
        if (ret[3]) {
            ptr1 = 0; len1 = 0;
            throw takeFromExternrefTable0(ret[2]);
        }
        deferred2_0 = ptr1;
        deferred2_1 = len1;
        return getStringFromWasm0(ptr1, len1);
    } finally {
        wasm.__wbindgen_free(deferred2_0, deferred2_1, 1);
    }
}

/**
 * @returns {string}
 */
export function sampleEncryptionPublicKey() {
    let deferred2_0;
    let deferred2_1;
    try {
        const ret = wasm.sampleEncryptionPublicKey();
        var ptr1 = ret[0];
        var len1 = ret[1];
        if (ret[3]) {
            ptr1 = 0; len1 = 0;
            throw takeFromExternrefTable0(ret[2]);
        }
        deferred2_0 = ptr1;
        deferred2_1 = len1;
        return getStringFromWasm0(ptr1, len1);
    } finally {
        wasm.__wbindgen_free(deferred2_0, deferred2_1, 1);
    }
}

/**
 * @param {any} coin_info
 * @param {SecretKeys} secret_keys
 * @returns {string}
 */
export function coin_nullifier(coin_info, secret_keys) {
    let deferred2_0;
    let deferred2_1;
    try {
        _assertClass(secret_keys, SecretKeys);
        const ret = wasm.coin_nullifier(coin_info, secret_keys.__wbg_ptr);
        var ptr1 = ret[0];
        var len1 = ret[1];
        if (ret[3]) {
            ptr1 = 0; len1 = 0;
            throw takeFromExternrefTable0(ret[2]);
        }
        deferred2_0 = ptr1;
        deferred2_1 = len1;
        return getStringFromWasm0(ptr1, len1);
    } finally {
        wasm.__wbindgen_free(deferred2_0, deferred2_1, 1);
    }
}

/**
 * @param {any} coin
 * @param {string} coin_public_key
 * @returns {string}
 */
export function coin_commitment(coin, coin_public_key) {
    let deferred3_0;
    let deferred3_1;
    try {
        const ptr0 = passStringToWasm0(coin_public_key, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.coin_commitment(coin, ptr0, len0);
        var ptr2 = ret[0];
        var len2 = ret[1];
        if (ret[3]) {
            ptr2 = 0; len2 = 0;
            throw takeFromExternrefTable0(ret[2]);
        }
        deferred3_0 = ptr2;
        deferred3_1 = len2;
        return getStringFromWasm0(ptr2, len2);
    } finally {
        wasm.__wbindgen_free(deferred3_0, deferred3_1, 1);
    }
}

function __wbg_adapter_56(arg0, arg1, arg2) {
    wasm.closure648_externref_shim(arg0, arg1, arg2);
}

function __wbg_adapter_389(arg0, arg1, arg2, arg3, arg4) {
    wasm.closure684_externref_shim(arg0, arg1, arg2, arg3, arg4);
}

function __wbg_adapter_394(arg0, arg1, arg2, arg3) {
    wasm.closure688_externref_shim(arg0, arg1, arg2, arg3);
}

/**
 * @enum {0 | 1 | 2 | 3}
 */
export const NetworkId = Object.freeze({
    Undeployed: 0, "0": "Undeployed",
    DevNet: 1, "1": "DevNet",
    TestNet: 2, "2": "TestNet",
    MainNet: 3, "3": "MainNet",
});

const __wbindgen_enum_ReadableStreamType = ["bytes"];

const AuthorizedMintFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_authorizedmint_free(ptr >>> 0, 1));

export class AuthorizedMint {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(AuthorizedMint.prototype);
        obj.__wbg_ptr = ptr;
        AuthorizedMintFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        AuthorizedMintFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_authorizedmint_free(ptr, 0);
    }
    constructor() {
        const ret = wasm.authorizedmint_new();
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        this.__wbg_ptr = ret[0] >>> 0;
        AuthorizedMintFinalization.register(this, this.__wbg_ptr, this);
        return this;
    }
    /**
     * @param {NetworkId} netid
     * @returns {Uint8Array}
     */
    serialize(netid) {
        const ret = wasm.authorizedmint_serialize(this.__wbg_ptr, netid);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return takeFromExternrefTable0(ret[0]);
    }
    /**
     * @param {Uint8Array} raw
     * @param {NetworkId} netid
     * @returns {AuthorizedMint}
     */
    static deserialize(raw, netid) {
        const ret = wasm.authorizedmint_deserialize(raw, netid);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return AuthorizedMint.__wrap(ret[0]);
    }
    /**
     * @returns {ProofErasedAuthorizedMint}
     */
    eraseProof() {
        const ret = wasm.authorizedmint_eraseProof(this.__wbg_ptr);
        return ProofErasedAuthorizedMint.__wrap(ret);
    }
    /**
     * @returns {any}
     */
    get coin() {
        const ret = wasm.authorizedmint_coin(this.__wbg_ptr);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return takeFromExternrefTable0(ret[0]);
    }
    /**
     * @returns {string}
     */
    get recipient() {
        let deferred2_0;
        let deferred2_1;
        try {
            const ret = wasm.authorizedmint_recipient(this.__wbg_ptr);
            var ptr1 = ret[0];
            var len1 = ret[1];
            if (ret[3]) {
                ptr1 = 0; len1 = 0;
                throw takeFromExternrefTable0(ret[2]);
            }
            deferred2_0 = ptr1;
            deferred2_1 = len1;
            return getStringFromWasm0(ptr1, len1);
        } finally {
            wasm.__wbindgen_free(deferred2_0, deferred2_1, 1);
        }
    }
    /**
     * @param {boolean | null} [compact]
     * @returns {string}
     */
    toString(compact) {
        let deferred1_0;
        let deferred1_1;
        try {
            const ret = wasm.authorizedmint_toString(this.__wbg_ptr, isLikeNone(compact) ? 0xFFFFFF : compact ? 1 : 0);
            deferred1_0 = ret[0];
            deferred1_1 = ret[1];
            return getStringFromWasm0(ret[0], ret[1]);
        } finally {
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
}

const CoinSecretKeyFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_coinsecretkey_free(ptr >>> 0, 1));

export class CoinSecretKey {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(CoinSecretKey.prototype);
        obj.__wbg_ptr = ptr;
        CoinSecretKeyFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        CoinSecretKeyFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_coinsecretkey_free(ptr, 0);
    }
    constructor() {
        const ret = wasm.coinsecretkey_new();
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        this.__wbg_ptr = ret[0] >>> 0;
        CoinSecretKeyFinalization.register(this, this.__wbg_ptr, this);
        return this;
    }
    /**
     * @param {NetworkId} netid
     * @returns {Uint8Array}
     */
    yesIKnowTheSecurityImplicationsOfThis_serialize(netid) {
        const ret = wasm.coinsecretkey_yesIKnowTheSecurityImplicationsOfThis_serialize(this.__wbg_ptr, netid);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return takeFromExternrefTable0(ret[0]);
    }
}

const ContractAddressFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_contractaddress_free(ptr >>> 0, 1));

export class ContractAddress {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(ContractAddress.prototype);
        obj.__wbg_ptr = ptr;
        ContractAddressFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        ContractAddressFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_contractaddress_free(ptr, 0);
    }
    /**
     * @param {Uint8Array} raw
     * @param {NetworkId} netid
     * @returns {ContractAddress}
     */
    static deserialize_raw(raw, netid) {
        const ptr0 = passArray8ToWasm0(raw, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.contractaddress_deserialize_raw(ptr0, len0, netid);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return ContractAddress.__wrap(ret[0]);
    }
}

const EncryptionSecretKeyFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_encryptionsecretkey_free(ptr >>> 0, 1));

export class EncryptionSecretKey {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(EncryptionSecretKey.prototype);
        obj.__wbg_ptr = ptr;
        EncryptionSecretKeyFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        EncryptionSecretKeyFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_encryptionsecretkey_free(ptr, 0);
    }
    constructor() {
        const ret = wasm.encryptionsecretkey_new();
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        this.__wbg_ptr = ret[0] >>> 0;
        EncryptionSecretKeyFinalization.register(this, this.__wbg_ptr, this);
        return this;
    }
    /**
     * @param {Offer} offer
     * @returns {boolean}
     */
    test(offer) {
        _assertClass(offer, Offer);
        const ret = wasm.encryptionsecretkey_test(this.__wbg_ptr, offer.__wbg_ptr);
        return ret !== 0;
    }
    /**
     * @param {NetworkId} netid
     * @returns {Uint8Array}
     */
    yesIKnowTheSecurityImplicationsOfThis_serialize(netid) {
        const ret = wasm.encryptionsecretkey_yesIKnowTheSecurityImplicationsOfThis_serialize(this.__wbg_ptr, netid);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return takeFromExternrefTable0(ret[0]);
    }
    /**
     * @param {Uint8Array} raw
     * @param {NetworkId} netid
     * @returns {EncryptionSecretKey}
     */
    static deserialize(raw, netid) {
        const ret = wasm.encryptionsecretkey_deserialize(raw, netid);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return EncryptionSecretKey.__wrap(ret[0]);
    }
    /**
     * @param {Uint8Array} raw
     * @param {NetworkId} netid
     * @returns {EncryptionSecretKey}
     */
    static deserialize_raw(raw, netid) {
        const ptr0 = passArray8ToWasm0(raw, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.encryptionsecretkey_deserialize_raw(ptr0, len0, netid);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return EncryptionSecretKey.__wrap(ret[0]);
    }
}

const InputFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_input_free(ptr >>> 0, 1));

export class Input {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(Input.prototype);
        obj.__wbg_ptr = ptr;
        InputFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        InputFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_input_free(ptr, 0);
    }
    constructor() {
        const ret = wasm.input_new();
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        this.__wbg_ptr = ret[0] >>> 0;
        InputFinalization.register(this, this.__wbg_ptr, this);
        return this;
    }
    /**
     * @param {NetworkId} netid
     * @returns {Uint8Array}
     */
    serialize(netid) {
        const ret = wasm.input_serialize(this.__wbg_ptr, netid);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return takeFromExternrefTable0(ret[0]);
    }
    /**
     * @param {Uint8Array} raw
     * @param {NetworkId} netid
     * @returns {Input}
     */
    static deserialize(raw, netid) {
        const ret = wasm.input_deserialize(raw, netid);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return Input.__wrap(ret[0]);
    }
    /**
     * @returns {string}
     */
    get nullifier() {
        let deferred2_0;
        let deferred2_1;
        try {
            const ret = wasm.input_nullifier(this.__wbg_ptr);
            var ptr1 = ret[0];
            var len1 = ret[1];
            if (ret[3]) {
                ptr1 = 0; len1 = 0;
                throw takeFromExternrefTable0(ret[2]);
            }
            deferred2_0 = ptr1;
            deferred2_1 = len1;
            return getStringFromWasm0(ptr1, len1);
        } finally {
            wasm.__wbindgen_free(deferred2_0, deferred2_1, 1);
        }
    }
    /**
     * @returns {string | undefined}
     */
    get contractAddress() {
        const ret = wasm.input_contractAddress(this.__wbg_ptr);
        if (ret[3]) {
            throw takeFromExternrefTable0(ret[2]);
        }
        let v1;
        if (ret[0] !== 0) {
            v1 = getStringFromWasm0(ret[0], ret[1]).slice();
            wasm.__wbindgen_free(ret[0], ret[1] * 1, 1);
        }
        return v1;
    }
    /**
     * @param {boolean | null} [compact]
     * @returns {string}
     */
    toString(compact) {
        let deferred1_0;
        let deferred1_1;
        try {
            const ret = wasm.input_toString(this.__wbg_ptr, isLikeNone(compact) ? 0xFFFFFF : compact ? 1 : 0);
            deferred1_0 = ret[0];
            deferred1_1 = ret[1];
            return getStringFromWasm0(ret[0], ret[1]);
        } finally {
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
}

const IntoUnderlyingByteSourceFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_intounderlyingbytesource_free(ptr >>> 0, 1));

export class IntoUnderlyingByteSource {

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        IntoUnderlyingByteSourceFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_intounderlyingbytesource_free(ptr, 0);
    }
    /**
     * @returns {ReadableStreamType}
     */
    get type() {
        const ret = wasm.intounderlyingbytesource_type(this.__wbg_ptr);
        return __wbindgen_enum_ReadableStreamType[ret];
    }
    /**
     * @returns {number}
     */
    get autoAllocateChunkSize() {
        const ret = wasm.intounderlyingbytesource_autoAllocateChunkSize(this.__wbg_ptr);
        return ret >>> 0;
    }
    /**
     * @param {ReadableByteStreamController} controller
     */
    start(controller) {
        wasm.intounderlyingbytesource_start(this.__wbg_ptr, controller);
    }
    /**
     * @param {ReadableByteStreamController} controller
     * @returns {Promise<any>}
     */
    pull(controller) {
        const ret = wasm.intounderlyingbytesource_pull(this.__wbg_ptr, controller);
        return ret;
    }
    cancel() {
        const ptr = this.__destroy_into_raw();
        wasm.intounderlyingbytesource_cancel(ptr);
    }
}

const IntoUnderlyingSinkFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_intounderlyingsink_free(ptr >>> 0, 1));

export class IntoUnderlyingSink {

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        IntoUnderlyingSinkFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_intounderlyingsink_free(ptr, 0);
    }
    /**
     * @param {any} chunk
     * @returns {Promise<any>}
     */
    write(chunk) {
        const ret = wasm.intounderlyingsink_write(this.__wbg_ptr, chunk);
        return ret;
    }
    /**
     * @returns {Promise<any>}
     */
    close() {
        const ptr = this.__destroy_into_raw();
        const ret = wasm.intounderlyingsink_close(ptr);
        return ret;
    }
    /**
     * @param {any} reason
     * @returns {Promise<any>}
     */
    abort(reason) {
        const ptr = this.__destroy_into_raw();
        const ret = wasm.intounderlyingsink_abort(ptr, reason);
        return ret;
    }
}

const IntoUnderlyingSourceFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_intounderlyingsource_free(ptr >>> 0, 1));

export class IntoUnderlyingSource {

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        IntoUnderlyingSourceFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_intounderlyingsource_free(ptr, 0);
    }
    /**
     * @param {ReadableStreamDefaultController} controller
     * @returns {Promise<any>}
     */
    pull(controller) {
        const ret = wasm.intounderlyingsource_pull(this.__wbg_ptr, controller);
        return ret;
    }
    cancel() {
        const ptr = this.__destroy_into_raw();
        wasm.intounderlyingsource_cancel(ptr);
    }
}

const LedgerParametersFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_ledgerparameters_free(ptr >>> 0, 1));

export class LedgerParameters {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(LedgerParameters.prototype);
        obj.__wbg_ptr = ptr;
        LedgerParametersFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        LedgerParametersFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_ledgerparameters_free(ptr, 0);
    }
    constructor() {
        const ret = wasm.ledgerparameters_new();
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        this.__wbg_ptr = ret[0] >>> 0;
        LedgerParametersFinalization.register(this, this.__wbg_ptr, this);
        return this;
    }
    /**
     * @returns {LedgerParameters}
     */
    static dummyParameters() {
        const ret = wasm.ledgerparameters_dummyParameters();
        return LedgerParameters.__wrap(ret);
    }
    /**
     * @returns {TransactionCostModel}
     */
    get transactionCostModel() {
        const ret = wasm.ledgerparameters_transactionCostModel(this.__wbg_ptr);
        return TransactionCostModel.__wrap(ret);
    }
    /**
     * @param {NetworkId} netid
     * @returns {Uint8Array}
     */
    serialize(netid) {
        const ret = wasm.ledgerparameters_serialize(this.__wbg_ptr, netid);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return takeFromExternrefTable0(ret[0]);
    }
    /**
     * @param {Uint8Array} raw
     * @param {NetworkId} netid
     * @returns {LedgerParameters}
     */
    static deserialize(raw, netid) {
        const ret = wasm.ledgerparameters_deserialize(raw, netid);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return LedgerParameters.__wrap(ret[0]);
    }
    /**
     * @param {boolean | null} [compact]
     * @returns {string}
     */
    toString(compact) {
        let deferred1_0;
        let deferred1_1;
        try {
            const ret = wasm.ledgerparameters_toString(this.__wbg_ptr, isLikeNone(compact) ? 0xFFFFFF : compact ? 1 : 0);
            deferred1_0 = ret[0];
            deferred1_1 = ret[1];
            return getStringFromWasm0(ret[0], ret[1]);
        } finally {
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
}

const LocalStateFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_localstate_free(ptr >>> 0, 1));

export class LocalState {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(LocalState.prototype);
        obj.__wbg_ptr = ptr;
        LocalStateFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        LocalStateFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_localstate_free(ptr, 0);
    }
    constructor() {
        const ret = wasm.localstate_new();
        this.__wbg_ptr = ret >>> 0;
        LocalStateFinalization.register(this, this.__wbg_ptr, this);
        return this;
    }
    /**
     * @param {SecretKeys} secret_keys
     * @param {any} coin
     * @returns {UnprovenAuthorizedMint}
     */
    authorizeMint(secret_keys, coin) {
        _assertClass(secret_keys, SecretKeys);
        const ret = wasm.localstate_authorizeMint(this.__wbg_ptr, secret_keys.__wbg_ptr, coin);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return UnprovenAuthorizedMint.__wrap(ret[0]);
    }
    /**
     * @returns {bigint}
     */
    get firstFree() {
        const ret = wasm.localstate_firstFree(this.__wbg_ptr);
        return BigInt.asUintN(64, ret);
    }
    /**
     * @returns {Set<any>}
     */
    get coins() {
        const ret = wasm.localstate_coins(this.__wbg_ptr);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return takeFromExternrefTable0(ret[0]);
    }
    /**
     * @returns {Map<any, any>}
     */
    get pendingSpends() {
        const ret = wasm.localstate_pendingSpends(this.__wbg_ptr);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return takeFromExternrefTable0(ret[0]);
    }
    /**
     * @returns {Map<any, any>}
     */
    get pendingOutputs() {
        const ret = wasm.localstate_pendingOutputs(this.__wbg_ptr);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return takeFromExternrefTable0(ret[0]);
    }
    /**
     * @param {SecretKeys} secret_keys
     * @param {AuthorizedMint} mint
     * @returns {LocalState}
     */
    applyMint(secret_keys, mint) {
        _assertClass(secret_keys, SecretKeys);
        _assertClass(mint, AuthorizedMint);
        const ret = wasm.localstate_applyMint(this.__wbg_ptr, secret_keys.__wbg_ptr, mint.__wbg_ptr);
        return LocalState.__wrap(ret);
    }
    /**
     * @param {SecretKeys} secret_keys
     * @param {ProofErasedAuthorizedMint} mint
     * @returns {LocalState}
     */
    applyProofErasedMint(secret_keys, mint) {
        _assertClass(secret_keys, SecretKeys);
        _assertClass(mint, ProofErasedAuthorizedMint);
        const ret = wasm.localstate_applyProofErasedMint(this.__wbg_ptr, secret_keys.__wbg_ptr, mint.__wbg_ptr);
        return LocalState.__wrap(ret);
    }
    /**
     * @param {Offer} offer
     * @returns {LocalState}
     */
    applyFailed(offer) {
        _assertClass(offer, Offer);
        const ret = wasm.localstate_applyFailed(this.__wbg_ptr, offer.__wbg_ptr);
        return LocalState.__wrap(ret);
    }
    /**
     * @param {ProofErasedOffer} offer
     * @returns {LocalState}
     */
    applyFailedProofErased(offer) {
        _assertClass(offer, ProofErasedOffer);
        const ret = wasm.localstate_applyFailedProofErased(this.__wbg_ptr, offer.__wbg_ptr);
        return LocalState.__wrap(ret);
    }
    /**
     * @param {SecretKeys} secret_keys
     * @param {Offer} offer
     * @returns {LocalState}
     */
    apply(secret_keys, offer) {
        _assertClass(secret_keys, SecretKeys);
        _assertClass(offer, Offer);
        const ret = wasm.localstate_apply(this.__wbg_ptr, secret_keys.__wbg_ptr, offer.__wbg_ptr);
        return LocalState.__wrap(ret);
    }
    /**
     * @param {SecretKeys} secret_keys
     * @param {ProofErasedOffer} offer
     * @returns {LocalState}
     */
    applyProofErased(secret_keys, offer) {
        _assertClass(secret_keys, SecretKeys);
        _assertClass(offer, ProofErasedOffer);
        const ret = wasm.localstate_applyProofErased(this.__wbg_ptr, secret_keys.__wbg_ptr, offer.__wbg_ptr);
        return LocalState.__wrap(ret);
    }
    /**
     * @param {SecretKeys} secret_keys
     * @param {Transaction} tx
     * @param {string} res
     * @returns {LocalState}
     */
    applyTx(secret_keys, tx, res) {
        _assertClass(secret_keys, SecretKeys);
        _assertClass(tx, Transaction);
        const ptr0 = passStringToWasm0(res, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.localstate_applyTx(this.__wbg_ptr, secret_keys.__wbg_ptr, tx.__wbg_ptr, ptr0, len0);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return LocalState.__wrap(ret[0]);
    }
    /**
     * @param {SecretKeys} secret_keys
     * @param {ProofErasedTransaction} tx
     * @param {string} res
     * @returns {LocalState}
     */
    applyProofErasedTx(secret_keys, tx, res) {
        _assertClass(secret_keys, SecretKeys);
        _assertClass(tx, ProofErasedTransaction);
        const ptr0 = passStringToWasm0(res, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.localstate_applyProofErasedTx(this.__wbg_ptr, secret_keys.__wbg_ptr, tx.__wbg_ptr, ptr0, len0);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return LocalState.__wrap(ret[0]);
    }
    /**
     * @param {SecretKeys} secret_keys
     * @param {SystemTransaction} tx
     * @returns {LocalState}
     */
    applySystemTx(secret_keys, tx) {
        _assertClass(secret_keys, SecretKeys);
        _assertClass(tx, SystemTransaction);
        const ret = wasm.localstate_applySystemTx(this.__wbg_ptr, secret_keys.__wbg_ptr, tx.__wbg_ptr);
        return LocalState.__wrap(ret);
    }
    /**
     * @param {MerkleTreeCollapsedUpdate} update
     * @returns {LocalState}
     */
    applyCollapsedUpdate(update) {
        _assertClass(update, MerkleTreeCollapsedUpdate);
        const ret = wasm.localstate_applyCollapsedUpdate(this.__wbg_ptr, update.__wbg_ptr);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return LocalState.__wrap(ret[0]);
    }
    /**
     * @param {SecretKeys} secret_keys
     * @param {any} coin
     * @param {number} segment
     * @returns {any}
     */
    spend(secret_keys, coin, segment) {
        _assertClass(secret_keys, SecretKeys);
        const ret = wasm.localstate_spend(this.__wbg_ptr, secret_keys.__wbg_ptr, coin, segment);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return takeFromExternrefTable0(ret[0]);
    }
    /**
     * @param {SecretKeys} secret_keys
     * @param {any} coin
     * @param {number} segment
     * @param {UnprovenOutput} output
     * @returns {any}
     */
    spendFromOutput(secret_keys, coin, segment, output) {
        _assertClass(secret_keys, SecretKeys);
        _assertClass(output, UnprovenOutput);
        const ret = wasm.localstate_spendFromOutput(this.__wbg_ptr, secret_keys.__wbg_ptr, coin, segment, output.__wbg_ptr);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return takeFromExternrefTable0(ret[0]);
    }
    /**
     * @param {string} coin_public_key
     * @param {any} coin
     * @returns {LocalState}
     */
    watchFor(coin_public_key, coin) {
        const ptr0 = passStringToWasm0(coin_public_key, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.localstate_watchFor(this.__wbg_ptr, ptr0, len0, coin);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return LocalState.__wrap(ret[0]);
    }
    /**
     * @param {NetworkId} netid
     * @returns {Uint8Array}
     */
    serialize(netid) {
        const ret = wasm.localstate_serialize(this.__wbg_ptr, netid);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return takeFromExternrefTable0(ret[0]);
    }
    /**
     * @param {Uint8Array} raw
     * @param {NetworkId} netid
     * @returns {LocalState}
     */
    static deserialize(raw, netid) {
        const ret = wasm.localstate_deserialize(raw, netid);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return LocalState.__wrap(ret[0]);
    }
    /**
     * @param {boolean | null} [compact]
     * @returns {string}
     */
    toString(compact) {
        let deferred1_0;
        let deferred1_1;
        try {
            const ret = wasm.localstate_toString(this.__wbg_ptr, isLikeNone(compact) ? 0xFFFFFF : compact ? 1 : 0);
            deferred1_0 = ret[0];
            deferred1_1 = ret[1];
            return getStringFromWasm0(ret[0], ret[1]);
        } finally {
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
}

const MerkleTreeCollapsedUpdateFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_merkletreecollapsedupdate_free(ptr >>> 0, 1));

export class MerkleTreeCollapsedUpdate {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(MerkleTreeCollapsedUpdate.prototype);
        obj.__wbg_ptr = ptr;
        MerkleTreeCollapsedUpdateFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        MerkleTreeCollapsedUpdateFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_merkletreecollapsedupdate_free(ptr, 0);
    }
    /**
     * @param {ZswapChainState} state
     * @param {bigint} start
     * @param {bigint} end
     */
    constructor(state, start, end) {
        _assertClass(state, ZswapChainState);
        const ret = wasm.merkletreecollapsedupdate_new(state.__wbg_ptr, start, end);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        this.__wbg_ptr = ret[0] >>> 0;
        MerkleTreeCollapsedUpdateFinalization.register(this, this.__wbg_ptr, this);
        return this;
    }
    /**
     * @param {ZswapChainState} state
     * @param {bigint} start
     * @param {bigint} end
     * @returns {MerkleTreeCollapsedUpdate}
     */
    static new_raw(state, start, end) {
        _assertClass(state, ZswapChainState);
        const ret = wasm.merkletreecollapsedupdate_new_raw(state.__wbg_ptr, start, end);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return MerkleTreeCollapsedUpdate.__wrap(ret[0]);
    }
    /**
     * @param {NetworkId} netid
     * @returns {Uint8Array}
     */
    serialize(netid) {
        const ret = wasm.merkletreecollapsedupdate_serialize(this.__wbg_ptr, netid);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return takeFromExternrefTable0(ret[0]);
    }
    /**
     * @param {NetworkId} netid
     * @returns {Uint8Array}
     */
    serialize_raw(netid) {
        const ret = wasm.merkletreecollapsedupdate_serialize_raw(this.__wbg_ptr, netid);
        if (ret[3]) {
            throw takeFromExternrefTable0(ret[2]);
        }
        var v1 = getArrayU8FromWasm0(ret[0], ret[1]).slice();
        wasm.__wbindgen_free(ret[0], ret[1] * 1, 1);
        return v1;
    }
    /**
     * @param {Uint8Array} raw
     * @param {NetworkId} netid
     * @returns {MerkleTreeCollapsedUpdate}
     */
    static deserialize(raw, netid) {
        const ret = wasm.merkletreecollapsedupdate_deserialize(raw, netid);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return MerkleTreeCollapsedUpdate.__wrap(ret[0]);
    }
    /**
     * @param {boolean | null} [compact]
     * @returns {string}
     */
    toString(compact) {
        let deferred1_0;
        let deferred1_1;
        try {
            const ret = wasm.merkletreecollapsedupdate_toString(this.__wbg_ptr, isLikeNone(compact) ? 0xFFFFFF : compact ? 1 : 0);
            deferred1_0 = ret[0];
            deferred1_1 = ret[1];
            return getStringFromWasm0(ret[0], ret[1]);
        } finally {
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
}

const OfferFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_offer_free(ptr >>> 0, 1));

export class Offer {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(Offer.prototype);
        obj.__wbg_ptr = ptr;
        OfferFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        OfferFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_offer_free(ptr, 0);
    }
    constructor() {
        const ret = wasm.offer_new();
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        this.__wbg_ptr = ret[0] >>> 0;
        OfferFinalization.register(this, this.__wbg_ptr, this);
        return this;
    }
    /**
     * @param {Offer} other
     * @returns {Offer}
     */
    merge(other) {
        _assertClass(other, Offer);
        const ret = wasm.offer_merge(this.__wbg_ptr, other.__wbg_ptr);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return Offer.__wrap(ret[0]);
    }
    /**
     * @param {NetworkId} netid
     * @returns {Uint8Array}
     */
    serialize(netid) {
        const ret = wasm.offer_serialize(this.__wbg_ptr, netid);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return takeFromExternrefTable0(ret[0]);
    }
    /**
     * @param {NetworkId} netid
     * @returns {Uint8Array}
     */
    serialize_raw(netid) {
        const ret = wasm.offer_serialize_raw(this.__wbg_ptr, netid);
        if (ret[3]) {
            throw takeFromExternrefTable0(ret[2]);
        }
        var v1 = getArrayU8FromWasm0(ret[0], ret[1]).slice();
        wasm.__wbindgen_free(ret[0], ret[1] * 1, 1);
        return v1;
    }
    /**
     * @param {Uint8Array} raw
     * @param {NetworkId} netid
     * @returns {Offer}
     */
    static deserialize(raw, netid) {
        const ret = wasm.offer_deserialize(raw, netid);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return Offer.__wrap(ret[0]);
    }
    /**
     * @param {Uint8Array} raw
     * @param {NetworkId} netid
     * @returns {Offer}
     */
    static deserialize_raw(raw, netid) {
        const ptr0 = passArray8ToWasm0(raw, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.offer_deserialize_raw(ptr0, len0, netid);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return Offer.__wrap(ret[0]);
    }
    /**
     * @returns {any[]}
     */
    get inputs() {
        const ret = wasm.offer_inputs(this.__wbg_ptr);
        var v1 = getArrayJsValueFromWasm0(ret[0], ret[1]).slice();
        wasm.__wbindgen_free(ret[0], ret[1] * 4, 4);
        return v1;
    }
    /**
     * @returns {any[]}
     */
    get outputs() {
        const ret = wasm.offer_outputs(this.__wbg_ptr);
        var v1 = getArrayJsValueFromWasm0(ret[0], ret[1]).slice();
        wasm.__wbindgen_free(ret[0], ret[1] * 4, 4);
        return v1;
    }
    /**
     * @returns {any[]}
     */
    get transient() {
        const ret = wasm.offer_transient(this.__wbg_ptr);
        var v1 = getArrayJsValueFromWasm0(ret[0], ret[1]).slice();
        wasm.__wbindgen_free(ret[0], ret[1] * 4, 4);
        return v1;
    }
    /**
     * @returns {Map<any, any>}
     */
    get deltas() {
        const ret = wasm.offer_deltas(this.__wbg_ptr);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return takeFromExternrefTable0(ret[0]);
    }
    /**
     * @param {boolean | null} [compact]
     * @returns {string}
     */
    toString(compact) {
        let deferred1_0;
        let deferred1_1;
        try {
            const ret = wasm.offer_toString(this.__wbg_ptr, isLikeNone(compact) ? 0xFFFFFF : compact ? 1 : 0);
            deferred1_0 = ret[0];
            deferred1_1 = ret[1];
            return getStringFromWasm0(ret[0], ret[1]);
        } finally {
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
}

const OutputFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_output_free(ptr >>> 0, 1));

export class Output {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(Output.prototype);
        obj.__wbg_ptr = ptr;
        OutputFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        OutputFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_output_free(ptr, 0);
    }
    constructor() {
        const ret = wasm.output_new();
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        this.__wbg_ptr = ret[0] >>> 0;
        OutputFinalization.register(this, this.__wbg_ptr, this);
        return this;
    }
    /**
     * @param {NetworkId} netid
     * @returns {Uint8Array}
     */
    serialize(netid) {
        const ret = wasm.output_serialize(this.__wbg_ptr, netid);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return takeFromExternrefTable0(ret[0]);
    }
    /**
     * @param {Uint8Array} raw
     * @param {NetworkId} netid
     * @returns {Output}
     */
    static deserialize(raw, netid) {
        const ret = wasm.output_deserialize(raw, netid);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return Output.__wrap(ret[0]);
    }
    /**
     * @returns {string}
     */
    get commitment() {
        let deferred2_0;
        let deferred2_1;
        try {
            const ret = wasm.output_commitment(this.__wbg_ptr);
            var ptr1 = ret[0];
            var len1 = ret[1];
            if (ret[3]) {
                ptr1 = 0; len1 = 0;
                throw takeFromExternrefTable0(ret[2]);
            }
            deferred2_0 = ptr1;
            deferred2_1 = len1;
            return getStringFromWasm0(ptr1, len1);
        } finally {
            wasm.__wbindgen_free(deferred2_0, deferred2_1, 1);
        }
    }
    /**
     * @returns {string | undefined}
     */
    get contractAddress() {
        const ret = wasm.output_contractAddress(this.__wbg_ptr);
        if (ret[3]) {
            throw takeFromExternrefTable0(ret[2]);
        }
        let v1;
        if (ret[0] !== 0) {
            v1 = getStringFromWasm0(ret[0], ret[1]).slice();
            wasm.__wbindgen_free(ret[0], ret[1] * 1, 1);
        }
        return v1;
    }
    /**
     * @param {boolean | null} [compact]
     * @returns {string}
     */
    toString(compact) {
        let deferred1_0;
        let deferred1_1;
        try {
            const ret = wasm.output_toString(this.__wbg_ptr, isLikeNone(compact) ? 0xFFFFFF : compact ? 1 : 0);
            deferred1_0 = ret[0];
            deferred1_1 = ret[1];
            return getStringFromWasm0(ret[0], ret[1]);
        } finally {
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
}

const ProofErasedAuthorizedMintFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_prooferasedauthorizedmint_free(ptr >>> 0, 1));

export class ProofErasedAuthorizedMint {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(ProofErasedAuthorizedMint.prototype);
        obj.__wbg_ptr = ptr;
        ProofErasedAuthorizedMintFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        ProofErasedAuthorizedMintFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_prooferasedauthorizedmint_free(ptr, 0);
    }
    constructor() {
        const ret = wasm.prooferasedauthorizedmint_new();
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        this.__wbg_ptr = ret[0] >>> 0;
        ProofErasedAuthorizedMintFinalization.register(this, this.__wbg_ptr, this);
        return this;
    }
    /**
     * @param {NetworkId} netid
     * @returns {Uint8Array}
     */
    serialize(netid) {
        const ret = wasm.prooferasedauthorizedmint_serialize(this.__wbg_ptr, netid);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return takeFromExternrefTable0(ret[0]);
    }
    /**
     * @param {Uint8Array} raw
     * @param {NetworkId} netid
     * @returns {ProofErasedAuthorizedMint}
     */
    static deserialize(raw, netid) {
        const ret = wasm.prooferasedauthorizedmint_deserialize(raw, netid);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return ProofErasedAuthorizedMint.__wrap(ret[0]);
    }
    /**
     * @returns {any}
     */
    get coin() {
        const ret = wasm.prooferasedauthorizedmint_coin(this.__wbg_ptr);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return takeFromExternrefTable0(ret[0]);
    }
    /**
     * @returns {string}
     */
    get recipient() {
        let deferred2_0;
        let deferred2_1;
        try {
            const ret = wasm.prooferasedauthorizedmint_recipient(this.__wbg_ptr);
            var ptr1 = ret[0];
            var len1 = ret[1];
            if (ret[3]) {
                ptr1 = 0; len1 = 0;
                throw takeFromExternrefTable0(ret[2]);
            }
            deferred2_0 = ptr1;
            deferred2_1 = len1;
            return getStringFromWasm0(ptr1, len1);
        } finally {
            wasm.__wbindgen_free(deferred2_0, deferred2_1, 1);
        }
    }
    /**
     * @param {boolean | null} [compact]
     * @returns {string}
     */
    toString(compact) {
        let deferred1_0;
        let deferred1_1;
        try {
            const ret = wasm.prooferasedauthorizedmint_toString(this.__wbg_ptr, isLikeNone(compact) ? 0xFFFFFF : compact ? 1 : 0);
            deferred1_0 = ret[0];
            deferred1_1 = ret[1];
            return getStringFromWasm0(ret[0], ret[1]);
        } finally {
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
}

const ProofErasedInputFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_prooferasedinput_free(ptr >>> 0, 1));

export class ProofErasedInput {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(ProofErasedInput.prototype);
        obj.__wbg_ptr = ptr;
        ProofErasedInputFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        ProofErasedInputFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_prooferasedinput_free(ptr, 0);
    }
    constructor() {
        const ret = wasm.prooferasedinput_new();
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        this.__wbg_ptr = ret[0] >>> 0;
        ProofErasedInputFinalization.register(this, this.__wbg_ptr, this);
        return this;
    }
    /**
     * @param {NetworkId} netid
     * @returns {Uint8Array}
     */
    serialize(netid) {
        const ret = wasm.prooferasedinput_serialize(this.__wbg_ptr, netid);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return takeFromExternrefTable0(ret[0]);
    }
    /**
     * @param {Uint8Array} raw
     * @param {NetworkId} netid
     * @returns {ProofErasedInput}
     */
    static deserialize(raw, netid) {
        const ret = wasm.prooferasedinput_deserialize(raw, netid);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return ProofErasedInput.__wrap(ret[0]);
    }
    /**
     * @returns {string}
     */
    get nullifier() {
        let deferred2_0;
        let deferred2_1;
        try {
            const ret = wasm.prooferasedinput_nullifier(this.__wbg_ptr);
            var ptr1 = ret[0];
            var len1 = ret[1];
            if (ret[3]) {
                ptr1 = 0; len1 = 0;
                throw takeFromExternrefTable0(ret[2]);
            }
            deferred2_0 = ptr1;
            deferred2_1 = len1;
            return getStringFromWasm0(ptr1, len1);
        } finally {
            wasm.__wbindgen_free(deferred2_0, deferred2_1, 1);
        }
    }
    /**
     * @returns {string | undefined}
     */
    get contractAddress() {
        const ret = wasm.prooferasedinput_contractAddress(this.__wbg_ptr);
        if (ret[3]) {
            throw takeFromExternrefTable0(ret[2]);
        }
        let v1;
        if (ret[0] !== 0) {
            v1 = getStringFromWasm0(ret[0], ret[1]).slice();
            wasm.__wbindgen_free(ret[0], ret[1] * 1, 1);
        }
        return v1;
    }
    /**
     * @param {boolean | null} [compact]
     * @returns {string}
     */
    toString(compact) {
        let deferred1_0;
        let deferred1_1;
        try {
            const ret = wasm.prooferasedinput_toString(this.__wbg_ptr, isLikeNone(compact) ? 0xFFFFFF : compact ? 1 : 0);
            deferred1_0 = ret[0];
            deferred1_1 = ret[1];
            return getStringFromWasm0(ret[0], ret[1]);
        } finally {
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
}

const ProofErasedOfferFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_prooferasedoffer_free(ptr >>> 0, 1));

export class ProofErasedOffer {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(ProofErasedOffer.prototype);
        obj.__wbg_ptr = ptr;
        ProofErasedOfferFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        ProofErasedOfferFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_prooferasedoffer_free(ptr, 0);
    }
    constructor() {
        const ret = wasm.prooferasedoffer_new();
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        this.__wbg_ptr = ret[0] >>> 0;
        ProofErasedOfferFinalization.register(this, this.__wbg_ptr, this);
        return this;
    }
    /**
     * @param {ProofErasedOffer} other
     * @returns {ProofErasedOffer}
     */
    merge(other) {
        _assertClass(other, ProofErasedOffer);
        const ret = wasm.prooferasedoffer_merge(this.__wbg_ptr, other.__wbg_ptr);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return ProofErasedOffer.__wrap(ret[0]);
    }
    /**
     * @param {NetworkId} netid
     * @returns {Uint8Array}
     */
    serialize(netid) {
        const ret = wasm.prooferasedoffer_serialize(this.__wbg_ptr, netid);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return takeFromExternrefTable0(ret[0]);
    }
    /**
     * @param {Uint8Array} raw
     * @param {NetworkId} netid
     * @returns {ProofErasedOffer}
     */
    static deserialize(raw, netid) {
        const ret = wasm.prooferasedoffer_deserialize(raw, netid);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return ProofErasedOffer.__wrap(ret[0]);
    }
    /**
     * @returns {any[]}
     */
    get inputs() {
        const ret = wasm.prooferasedoffer_inputs(this.__wbg_ptr);
        var v1 = getArrayJsValueFromWasm0(ret[0], ret[1]).slice();
        wasm.__wbindgen_free(ret[0], ret[1] * 4, 4);
        return v1;
    }
    /**
     * @returns {any[]}
     */
    get outputs() {
        const ret = wasm.prooferasedoffer_outputs(this.__wbg_ptr);
        var v1 = getArrayJsValueFromWasm0(ret[0], ret[1]).slice();
        wasm.__wbindgen_free(ret[0], ret[1] * 4, 4);
        return v1;
    }
    /**
     * @returns {any[]}
     */
    get transient() {
        const ret = wasm.prooferasedoffer_transient(this.__wbg_ptr);
        var v1 = getArrayJsValueFromWasm0(ret[0], ret[1]).slice();
        wasm.__wbindgen_free(ret[0], ret[1] * 4, 4);
        return v1;
    }
    /**
     * @returns {Map<any, any>}
     */
    get deltas() {
        const ret = wasm.prooferasedoffer_deltas(this.__wbg_ptr);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return takeFromExternrefTable0(ret[0]);
    }
    /**
     * @param {boolean | null} [compact]
     * @returns {string}
     */
    toString(compact) {
        let deferred1_0;
        let deferred1_1;
        try {
            const ret = wasm.prooferasedoffer_toString(this.__wbg_ptr, isLikeNone(compact) ? 0xFFFFFF : compact ? 1 : 0);
            deferred1_0 = ret[0];
            deferred1_1 = ret[1];
            return getStringFromWasm0(ret[0], ret[1]);
        } finally {
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
}

const ProofErasedOutputFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_prooferasedoutput_free(ptr >>> 0, 1));

export class ProofErasedOutput {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(ProofErasedOutput.prototype);
        obj.__wbg_ptr = ptr;
        ProofErasedOutputFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        ProofErasedOutputFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_prooferasedoutput_free(ptr, 0);
    }
    constructor() {
        const ret = wasm.prooferasedoutput_new();
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        this.__wbg_ptr = ret[0] >>> 0;
        ProofErasedOutputFinalization.register(this, this.__wbg_ptr, this);
        return this;
    }
    /**
     * @param {NetworkId} netid
     * @returns {Uint8Array}
     */
    serialize(netid) {
        const ret = wasm.prooferasedoutput_serialize(this.__wbg_ptr, netid);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return takeFromExternrefTable0(ret[0]);
    }
    /**
     * @param {Uint8Array} raw
     * @param {NetworkId} netid
     * @returns {ProofErasedOutput}
     */
    static deserialize(raw, netid) {
        const ret = wasm.prooferasedoutput_deserialize(raw, netid);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return ProofErasedOutput.__wrap(ret[0]);
    }
    /**
     * @returns {string}
     */
    get commitment() {
        let deferred2_0;
        let deferred2_1;
        try {
            const ret = wasm.prooferasedoutput_commitment(this.__wbg_ptr);
            var ptr1 = ret[0];
            var len1 = ret[1];
            if (ret[3]) {
                ptr1 = 0; len1 = 0;
                throw takeFromExternrefTable0(ret[2]);
            }
            deferred2_0 = ptr1;
            deferred2_1 = len1;
            return getStringFromWasm0(ptr1, len1);
        } finally {
            wasm.__wbindgen_free(deferred2_0, deferred2_1, 1);
        }
    }
    /**
     * @returns {string | undefined}
     */
    get contractAddress() {
        const ret = wasm.prooferasedoutput_contractAddress(this.__wbg_ptr);
        if (ret[3]) {
            throw takeFromExternrefTable0(ret[2]);
        }
        let v1;
        if (ret[0] !== 0) {
            v1 = getStringFromWasm0(ret[0], ret[1]).slice();
            wasm.__wbindgen_free(ret[0], ret[1] * 1, 1);
        }
        return v1;
    }
    /**
     * @param {boolean | null} [compact]
     * @returns {string}
     */
    toString(compact) {
        let deferred1_0;
        let deferred1_1;
        try {
            const ret = wasm.prooferasedoutput_toString(this.__wbg_ptr, isLikeNone(compact) ? 0xFFFFFF : compact ? 1 : 0);
            deferred1_0 = ret[0];
            deferred1_1 = ret[1];
            return getStringFromWasm0(ret[0], ret[1]);
        } finally {
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
}

const ProofErasedTransactionFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_prooferasedtransaction_free(ptr >>> 0, 1));

export class ProofErasedTransaction {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(ProofErasedTransaction.prototype);
        obj.__wbg_ptr = ptr;
        ProofErasedTransactionFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        ProofErasedTransactionFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_prooferasedtransaction_free(ptr, 0);
    }
    constructor() {
        const ret = wasm.prooferasedtransaction_new();
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        this.__wbg_ptr = ret[0] >>> 0;
        ProofErasedTransactionFinalization.register(this, this.__wbg_ptr, this);
        return this;
    }
    /**
     * @returns {ProofErasedAuthorizedMint | undefined}
     */
    get mint() {
        const ret = wasm.prooferasedtransaction_mint(this.__wbg_ptr);
        return ret === 0 ? undefined : ProofErasedAuthorizedMint.__wrap(ret);
    }
    /**
     * @returns {ProofErasedOffer | undefined}
     */
    get guaranteedCoins() {
        const ret = wasm.prooferasedtransaction_guaranteedCoins(this.__wbg_ptr);
        return ret === 0 ? undefined : ProofErasedOffer.__wrap(ret);
    }
    /**
     * @returns {ProofErasedOffer | undefined}
     */
    get fallibleCoins() {
        const ret = wasm.prooferasedtransaction_fallibleCoins(this.__wbg_ptr);
        return ret === 0 ? undefined : ProofErasedOffer.__wrap(ret);
    }
    /**
     * @returns {string[]}
     */
    identifiers() {
        const ret = wasm.prooferasedtransaction_identifiers(this.__wbg_ptr);
        if (ret[3]) {
            throw takeFromExternrefTable0(ret[2]);
        }
        var v1 = getArrayJsValueFromWasm0(ret[0], ret[1]).slice();
        wasm.__wbindgen_free(ret[0], ret[1] * 4, 4);
        return v1;
    }
    /**
     * @param {ProofErasedTransaction} other
     * @returns {ProofErasedTransaction}
     */
    merge(other) {
        _assertClass(other, ProofErasedTransaction);
        const ret = wasm.prooferasedtransaction_merge(this.__wbg_ptr, other.__wbg_ptr);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return ProofErasedTransaction.__wrap(ret[0]);
    }
    /**
     * @param {NetworkId} netid
     * @returns {Uint8Array}
     */
    serialize(netid) {
        const ret = wasm.prooferasedtransaction_serialize(this.__wbg_ptr, netid);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return takeFromExternrefTable0(ret[0]);
    }
    /**
     * @param {Uint8Array} raw
     * @param {NetworkId} netid
     * @returns {ProofErasedTransaction}
     */
    static deserialize(raw, netid) {
        const ret = wasm.prooferasedtransaction_deserialize(raw, netid);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return ProofErasedTransaction.__wrap(ret[0]);
    }
    /**
     * @param {boolean} guaranteed
     * @param {bigint | null} [fees]
     * @returns {Map<any, any>}
     */
    imbalances(guaranteed, fees) {
        const ret = wasm.prooferasedtransaction_imbalances(this.__wbg_ptr, guaranteed, !isLikeNone(fees), isLikeNone(fees) ? BigInt(0) : fees);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return takeFromExternrefTable0(ret[0]);
    }
    /**
     * @param {LedgerParameters} params
     * @returns {bigint}
     */
    fees(params) {
        _assertClass(params, LedgerParameters);
        const ret = wasm.prooferasedtransaction_fees(this.__wbg_ptr, params.__wbg_ptr);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return takeFromExternrefTable0(ret[0]);
    }
    /**
     * @param {boolean | null} [compact]
     * @returns {string}
     */
    toString(compact) {
        let deferred1_0;
        let deferred1_1;
        try {
            const ret = wasm.prooferasedtransaction_toString(this.__wbg_ptr, isLikeNone(compact) ? 0xFFFFFF : compact ? 1 : 0);
            deferred1_0 = ret[0];
            deferred1_1 = ret[1];
            return getStringFromWasm0(ret[0], ret[1]);
        } finally {
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
}

const ProofErasedTransientFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_prooferasedtransient_free(ptr >>> 0, 1));

export class ProofErasedTransient {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(ProofErasedTransient.prototype);
        obj.__wbg_ptr = ptr;
        ProofErasedTransientFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        ProofErasedTransientFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_prooferasedtransient_free(ptr, 0);
    }
    constructor() {
        const ret = wasm.prooferasedtransient_new();
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        this.__wbg_ptr = ret[0] >>> 0;
        ProofErasedTransientFinalization.register(this, this.__wbg_ptr, this);
        return this;
    }
    /**
     * @param {NetworkId} netid
     * @returns {Uint8Array}
     */
    serialize(netid) {
        const ret = wasm.prooferasedtransient_serialize(this.__wbg_ptr, netid);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return takeFromExternrefTable0(ret[0]);
    }
    /**
     * @param {Uint8Array} raw
     * @param {NetworkId} netid
     * @returns {ProofErasedTransient}
     */
    static deserialize(raw, netid) {
        const ret = wasm.prooferasedtransient_deserialize(raw, netid);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return ProofErasedTransient.__wrap(ret[0]);
    }
    /**
     * @returns {string}
     */
    get commitment() {
        let deferred2_0;
        let deferred2_1;
        try {
            const ret = wasm.prooferasedtransient_commitment(this.__wbg_ptr);
            var ptr1 = ret[0];
            var len1 = ret[1];
            if (ret[3]) {
                ptr1 = 0; len1 = 0;
                throw takeFromExternrefTable0(ret[2]);
            }
            deferred2_0 = ptr1;
            deferred2_1 = len1;
            return getStringFromWasm0(ptr1, len1);
        } finally {
            wasm.__wbindgen_free(deferred2_0, deferred2_1, 1);
        }
    }
    /**
     * @returns {string}
     */
    get nullifier() {
        let deferred2_0;
        let deferred2_1;
        try {
            const ret = wasm.prooferasedtransient_nullifier(this.__wbg_ptr);
            var ptr1 = ret[0];
            var len1 = ret[1];
            if (ret[3]) {
                ptr1 = 0; len1 = 0;
                throw takeFromExternrefTable0(ret[2]);
            }
            deferred2_0 = ptr1;
            deferred2_1 = len1;
            return getStringFromWasm0(ptr1, len1);
        } finally {
            wasm.__wbindgen_free(deferred2_0, deferred2_1, 1);
        }
    }
    /**
     * @returns {string | undefined}
     */
    get contractAddress() {
        const ret = wasm.prooferasedtransient_contractAddress(this.__wbg_ptr);
        if (ret[3]) {
            throw takeFromExternrefTable0(ret[2]);
        }
        let v1;
        if (ret[0] !== 0) {
            v1 = getStringFromWasm0(ret[0], ret[1]).slice();
            wasm.__wbindgen_free(ret[0], ret[1] * 1, 1);
        }
        return v1;
    }
    /**
     * @param {boolean | null} [compact]
     * @returns {string}
     */
    toString(compact) {
        let deferred1_0;
        let deferred1_1;
        try {
            const ret = wasm.prooferasedtransient_toString(this.__wbg_ptr, isLikeNone(compact) ? 0xFFFFFF : compact ? 1 : 0);
            deferred1_0 = ret[0];
            deferred1_1 = ret[1];
            return getStringFromWasm0(ret[0], ret[1]);
        } finally {
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
}

const SecretKeysFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_secretkeys_free(ptr >>> 0, 1));

export class SecretKeys {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(SecretKeys.prototype);
        obj.__wbg_ptr = ptr;
        SecretKeysFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        SecretKeysFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_secretkeys_free(ptr, 0);
    }
    constructor() {
        const ret = wasm.secretkeys_new();
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        this.__wbg_ptr = ret[0] >>> 0;
        SecretKeysFinalization.register(this, this.__wbg_ptr, this);
        return this;
    }
    /**
     * @param {Uint8Array} seed
     * @returns {SecretKeys}
     */
    static fromSeed(seed) {
        const ret = wasm.secretkeys_fromSeed(seed);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return SecretKeys.__wrap(ret[0]);
    }
    /**
     * @param {Uint8Array} seed
     * @returns {SecretKeys}
     */
    static fromSeedRng(seed) {
        const ret = wasm.secretkeys_fromSeedRng(seed);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return SecretKeys.__wrap(ret[0]);
    }
    /**
     * @returns {string}
     */
    get coinPublicKey() {
        let deferred2_0;
        let deferred2_1;
        try {
            const ret = wasm.secretkeys_coinPublicKey(this.__wbg_ptr);
            var ptr1 = ret[0];
            var len1 = ret[1];
            if (ret[3]) {
                ptr1 = 0; len1 = 0;
                throw takeFromExternrefTable0(ret[2]);
            }
            deferred2_0 = ptr1;
            deferred2_1 = len1;
            return getStringFromWasm0(ptr1, len1);
        } finally {
            wasm.__wbindgen_free(deferred2_0, deferred2_1, 1);
        }
    }
    /**
     * @returns {string}
     */
    get encryptionPublicKey() {
        let deferred2_0;
        let deferred2_1;
        try {
            const ret = wasm.secretkeys_encryptionPublicKey(this.__wbg_ptr);
            var ptr1 = ret[0];
            var len1 = ret[1];
            if (ret[3]) {
                ptr1 = 0; len1 = 0;
                throw takeFromExternrefTable0(ret[2]);
            }
            deferred2_0 = ptr1;
            deferred2_1 = len1;
            return getStringFromWasm0(ptr1, len1);
        } finally {
            wasm.__wbindgen_free(deferred2_0, deferred2_1, 1);
        }
    }
    /**
     * @returns {EncryptionSecretKey}
     */
    get encryptionSecretKey() {
        const ret = wasm.secretkeys_encryptionSecretKey(this.__wbg_ptr);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return EncryptionSecretKey.__wrap(ret[0]);
    }
    /**
     * @returns {CoinSecretKey}
     */
    get coinSecretKey() {
        const ret = wasm.secretkeys_coinSecretKey(this.__wbg_ptr);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return CoinSecretKey.__wrap(ret[0]);
    }
}

const SystemTransactionFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_systemtransaction_free(ptr >>> 0, 1));

export class SystemTransaction {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(SystemTransaction.prototype);
        obj.__wbg_ptr = ptr;
        SystemTransactionFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        SystemTransactionFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_systemtransaction_free(ptr, 0);
    }
    constructor() {
        const ret = wasm.systemtransaction_new();
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        this.__wbg_ptr = ret[0] >>> 0;
        SystemTransactionFinalization.register(this, this.__wbg_ptr, this);
        return this;
    }
    /**
     * @param {NetworkId} netid
     * @returns {Uint8Array}
     */
    serialize(netid) {
        const ret = wasm.systemtransaction_serialize(this.__wbg_ptr, netid);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return takeFromExternrefTable0(ret[0]);
    }
    /**
     * @param {Uint8Array} raw
     * @param {NetworkId} netid
     * @returns {SystemTransaction}
     */
    static deserialize(raw, netid) {
        const ret = wasm.systemtransaction_deserialize(raw, netid);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return SystemTransaction.__wrap(ret[0]);
    }
    /**
     * @param {boolean | null} [compact]
     * @returns {string}
     */
    toString(compact) {
        let deferred1_0;
        let deferred1_1;
        try {
            const ret = wasm.systemtransaction_toString(this.__wbg_ptr, isLikeNone(compact) ? 0xFFFFFF : compact ? 1 : 0);
            deferred1_0 = ret[0];
            deferred1_1 = ret[1];
            return getStringFromWasm0(ret[0], ret[1]);
        } finally {
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
}

const TransactionFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_transaction_free(ptr >>> 0, 1));

export class Transaction {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(Transaction.prototype);
        obj.__wbg_ptr = ptr;
        TransactionFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        TransactionFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_transaction_free(ptr, 0);
    }
    constructor() {
        const ret = wasm.transaction_new();
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        this.__wbg_ptr = ret[0] >>> 0;
        TransactionFinalization.register(this, this.__wbg_ptr, this);
        return this;
    }
    /**
     * @param {Function} prove
     * @param {UnprovenTransaction} unproven
     * @returns {any}
     */
    static fromUnproven(prove, unproven) {
        _assertClass(unproven, UnprovenTransaction);
        const ret = wasm.transaction_fromUnproven(prove, unproven.__wbg_ptr);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return takeFromExternrefTable0(ret[0]);
    }
    /**
     * @returns {ProofErasedTransaction}
     */
    eraseProofs() {
        const ret = wasm.transaction_eraseProofs(this.__wbg_ptr);
        return ProofErasedTransaction.__wrap(ret);
    }
    /**
     * @returns {AuthorizedMint | undefined}
     */
    get mint() {
        const ret = wasm.transaction_mint(this.__wbg_ptr);
        return ret === 0 ? undefined : AuthorizedMint.__wrap(ret);
    }
    /**
     * @returns {Offer | undefined}
     */
    get guaranteedCoins() {
        const ret = wasm.transaction_guaranteedCoins(this.__wbg_ptr);
        return ret === 0 ? undefined : Offer.__wrap(ret);
    }
    /**
     * @returns {Offer | undefined}
     */
    get fallibleCoins() {
        const ret = wasm.transaction_fallibleCoins(this.__wbg_ptr);
        return ret === 0 ? undefined : Offer.__wrap(ret);
    }
    /**
     * @returns {string}
     */
    transactionHash() {
        let deferred2_0;
        let deferred2_1;
        try {
            const ret = wasm.transaction_transactionHash(this.__wbg_ptr);
            var ptr1 = ret[0];
            var len1 = ret[1];
            if (ret[3]) {
                ptr1 = 0; len1 = 0;
                throw takeFromExternrefTable0(ret[2]);
            }
            deferred2_0 = ptr1;
            deferred2_1 = len1;
            return getStringFromWasm0(ptr1, len1);
        } finally {
            wasm.__wbindgen_free(deferred2_0, deferred2_1, 1);
        }
    }
    /**
     * @returns {string[]}
     */
    identifiers() {
        const ret = wasm.transaction_identifiers(this.__wbg_ptr);
        if (ret[3]) {
            throw takeFromExternrefTable0(ret[2]);
        }
        var v1 = getArrayJsValueFromWasm0(ret[0], ret[1]).slice();
        wasm.__wbindgen_free(ret[0], ret[1] * 4, 4);
        return v1;
    }
    /**
     * @param {Transaction} other
     * @returns {Transaction}
     */
    merge(other) {
        _assertClass(other, Transaction);
        const ret = wasm.transaction_merge(this.__wbg_ptr, other.__wbg_ptr);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return Transaction.__wrap(ret[0]);
    }
    /**
     * @param {NetworkId} netid
     * @returns {Uint8Array}
     */
    serialize(netid) {
        const ret = wasm.transaction_serialize(this.__wbg_ptr, netid);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return takeFromExternrefTable0(ret[0]);
    }
    /**
     * @param {Uint8Array} raw
     * @param {NetworkId} netid
     * @returns {Transaction}
     */
    static deserialize(raw, netid) {
        const ret = wasm.transaction_deserialize(raw, netid);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return Transaction.__wrap(ret[0]);
    }
    /**
     * @param {boolean} guaranteed
     * @param {bigint | null} [fees]
     * @returns {Map<any, any>}
     */
    imbalances(guaranteed, fees) {
        const ret = wasm.transaction_imbalances(this.__wbg_ptr, guaranteed, isLikeNone(fees) ? 0 : addToExternrefTable0(fees));
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return takeFromExternrefTable0(ret[0]);
    }
    /**
     * @param {LedgerParameters} params
     * @returns {bigint}
     */
    fees(params) {
        _assertClass(params, LedgerParameters);
        const ret = wasm.transaction_fees(this.__wbg_ptr, params.__wbg_ptr);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return takeFromExternrefTable0(ret[0]);
    }
    /**
     * @param {boolean | null} [compact]
     * @returns {string}
     */
    toString(compact) {
        let deferred1_0;
        let deferred1_1;
        try {
            const ret = wasm.transaction_toString(this.__wbg_ptr, isLikeNone(compact) ? 0xFFFFFF : compact ? 1 : 0);
            deferred1_0 = ret[0];
            deferred1_1 = ret[1];
            return getStringFromWasm0(ret[0], ret[1]);
        } finally {
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
}

const TransactionCostModelFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_transactioncostmodel_free(ptr >>> 0, 1));

export class TransactionCostModel {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(TransactionCostModel.prototype);
        obj.__wbg_ptr = ptr;
        TransactionCostModelFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        TransactionCostModelFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_transactioncostmodel_free(ptr, 0);
    }
    constructor() {
        const ret = wasm.transactioncostmodel_new();
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        this.__wbg_ptr = ret[0] >>> 0;
        TransactionCostModelFinalization.register(this, this.__wbg_ptr, this);
        return this;
    }
    /**
     * @returns {TransactionCostModel}
     */
    static dummyTransactionCostModel() {
        const ret = wasm.transactioncostmodel_dummyTransactionCostModel();
        return TransactionCostModel.__wrap(ret);
    }
    /**
     * @returns {bigint}
     */
    get inputFeeOverhead() {
        const ret = wasm.transactioncostmodel_inputFeeOverhead(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {bigint}
     */
    get outputFeeOverhead() {
        const ret = wasm.transactioncostmodel_outputFeeOverhead(this.__wbg_ptr);
        return ret;
    }
    /**
     * @param {NetworkId} netid
     * @returns {Uint8Array}
     */
    serialize(netid) {
        const ret = wasm.transactioncostmodel_serialize(this.__wbg_ptr, netid);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return takeFromExternrefTable0(ret[0]);
    }
    /**
     * @param {Uint8Array} raw
     * @param {NetworkId} netid
     * @returns {TransactionCostModel}
     */
    static deserialize(raw, netid) {
        const ret = wasm.transactioncostmodel_deserialize(raw, netid);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return TransactionCostModel.__wrap(ret[0]);
    }
    /**
     * @param {boolean | null} [compact]
     * @returns {string}
     */
    toString(compact) {
        let deferred1_0;
        let deferred1_1;
        try {
            const ret = wasm.transactioncostmodel_toString(this.__wbg_ptr, isLikeNone(compact) ? 0xFFFFFF : compact ? 1 : 0);
            deferred1_0 = ret[0];
            deferred1_1 = ret[1];
            return getStringFromWasm0(ret[0], ret[1]);
        } finally {
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
}

const TransientFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_transient_free(ptr >>> 0, 1));

export class Transient {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(Transient.prototype);
        obj.__wbg_ptr = ptr;
        TransientFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        TransientFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_transient_free(ptr, 0);
    }
    constructor() {
        const ret = wasm.transient_new();
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        this.__wbg_ptr = ret[0] >>> 0;
        TransientFinalization.register(this, this.__wbg_ptr, this);
        return this;
    }
    /**
     * @param {NetworkId} netid
     * @returns {Uint8Array}
     */
    serialize(netid) {
        const ret = wasm.transient_serialize(this.__wbg_ptr, netid);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return takeFromExternrefTable0(ret[0]);
    }
    /**
     * @param {Uint8Array} raw
     * @param {NetworkId} netid
     * @returns {Transient}
     */
    static deserialize(raw, netid) {
        const ret = wasm.transient_deserialize(raw, netid);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return Transient.__wrap(ret[0]);
    }
    /**
     * @returns {string}
     */
    get commitment() {
        let deferred2_0;
        let deferred2_1;
        try {
            const ret = wasm.transient_commitment(this.__wbg_ptr);
            var ptr1 = ret[0];
            var len1 = ret[1];
            if (ret[3]) {
                ptr1 = 0; len1 = 0;
                throw takeFromExternrefTable0(ret[2]);
            }
            deferred2_0 = ptr1;
            deferred2_1 = len1;
            return getStringFromWasm0(ptr1, len1);
        } finally {
            wasm.__wbindgen_free(deferred2_0, deferred2_1, 1);
        }
    }
    /**
     * @returns {string}
     */
    get nullifier() {
        let deferred2_0;
        let deferred2_1;
        try {
            const ret = wasm.transient_nullifier(this.__wbg_ptr);
            var ptr1 = ret[0];
            var len1 = ret[1];
            if (ret[3]) {
                ptr1 = 0; len1 = 0;
                throw takeFromExternrefTable0(ret[2]);
            }
            deferred2_0 = ptr1;
            deferred2_1 = len1;
            return getStringFromWasm0(ptr1, len1);
        } finally {
            wasm.__wbindgen_free(deferred2_0, deferred2_1, 1);
        }
    }
    /**
     * @returns {string | undefined}
     */
    get contractAddress() {
        const ret = wasm.transient_contractAddress(this.__wbg_ptr);
        if (ret[3]) {
            throw takeFromExternrefTable0(ret[2]);
        }
        let v1;
        if (ret[0] !== 0) {
            v1 = getStringFromWasm0(ret[0], ret[1]).slice();
            wasm.__wbindgen_free(ret[0], ret[1] * 1, 1);
        }
        return v1;
    }
    /**
     * @param {boolean | null} [compact]
     * @returns {string}
     */
    toString(compact) {
        let deferred1_0;
        let deferred1_1;
        try {
            const ret = wasm.transient_toString(this.__wbg_ptr, isLikeNone(compact) ? 0xFFFFFF : compact ? 1 : 0);
            deferred1_0 = ret[0];
            deferred1_1 = ret[1];
            return getStringFromWasm0(ret[0], ret[1]);
        } finally {
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
}

const UnprovenAuthorizedMintFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_unprovenauthorizedmint_free(ptr >>> 0, 1));

export class UnprovenAuthorizedMint {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(UnprovenAuthorizedMint.prototype);
        obj.__wbg_ptr = ptr;
        UnprovenAuthorizedMintFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        UnprovenAuthorizedMintFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_unprovenauthorizedmint_free(ptr, 0);
    }
    constructor() {
        const ret = wasm.unprovenauthorizedmint_new();
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        this.__wbg_ptr = ret[0] >>> 0;
        UnprovenAuthorizedMintFinalization.register(this, this.__wbg_ptr, this);
        return this;
    }
    /**
     * @param {NetworkId} netid
     * @returns {Uint8Array}
     */
    serialize(netid) {
        const ret = wasm.unprovenauthorizedmint_serialize(this.__wbg_ptr, netid);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return takeFromExternrefTable0(ret[0]);
    }
    /**
     * @param {Uint8Array} raw
     * @param {NetworkId} netid
     * @returns {UnprovenAuthorizedMint}
     */
    static deserialize(raw, netid) {
        const ret = wasm.unprovenauthorizedmint_deserialize(raw, netid);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return UnprovenAuthorizedMint.__wrap(ret[0]);
    }
    /**
     * @returns {ProofErasedAuthorizedMint}
     */
    eraseProof() {
        const ret = wasm.authorizedmint_eraseProof(this.__wbg_ptr);
        return ProofErasedAuthorizedMint.__wrap(ret);
    }
    /**
     * @returns {any}
     */
    get coin() {
        const ret = wasm.unprovenauthorizedmint_coin(this.__wbg_ptr);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return takeFromExternrefTable0(ret[0]);
    }
    /**
     * @returns {string}
     */
    get recipient() {
        let deferred2_0;
        let deferred2_1;
        try {
            const ret = wasm.unprovenauthorizedmint_recipient(this.__wbg_ptr);
            var ptr1 = ret[0];
            var len1 = ret[1];
            if (ret[3]) {
                ptr1 = 0; len1 = 0;
                throw takeFromExternrefTable0(ret[2]);
            }
            deferred2_0 = ptr1;
            deferred2_1 = len1;
            return getStringFromWasm0(ptr1, len1);
        } finally {
            wasm.__wbindgen_free(deferred2_0, deferred2_1, 1);
        }
    }
    /**
     * @param {boolean | null} [compact]
     * @returns {string}
     */
    toString(compact) {
        let deferred1_0;
        let deferred1_1;
        try {
            const ret = wasm.unprovenauthorizedmint_toString(this.__wbg_ptr, isLikeNone(compact) ? 0xFFFFFF : compact ? 1 : 0);
            deferred1_0 = ret[0];
            deferred1_1 = ret[1];
            return getStringFromWasm0(ret[0], ret[1]);
        } finally {
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
}

const UnprovenInputFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_unproveninput_free(ptr >>> 0, 1));

export class UnprovenInput {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(UnprovenInput.prototype);
        obj.__wbg_ptr = ptr;
        UnprovenInputFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        UnprovenInputFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_unproveninput_free(ptr, 0);
    }
    constructor() {
        const ret = wasm.unproveninput_new();
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        this.__wbg_ptr = ret[0] >>> 0;
        UnprovenInputFinalization.register(this, this.__wbg_ptr, this);
        return this;
    }
    /**
     * @param {any} coin
     * @param {number} segment
     * @param {string} contract
     * @param {ZswapChainState} state
     * @returns {UnprovenInput}
     */
    static newContractOwned(coin, segment, contract, state) {
        const ptr0 = passStringToWasm0(contract, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        _assertClass(state, ZswapChainState);
        const ret = wasm.unproveninput_newContractOwned(coin, segment, ptr0, len0, state.__wbg_ptr);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return UnprovenInput.__wrap(ret[0]);
    }
    /**
     * @param {NetworkId} netid
     * @returns {Uint8Array}
     */
    serialize(netid) {
        const ret = wasm.unproveninput_serialize(this.__wbg_ptr, netid);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return takeFromExternrefTable0(ret[0]);
    }
    /**
     * @param {Uint8Array} raw
     * @param {NetworkId} netid
     * @returns {UnprovenInput}
     */
    static deserialize(raw, netid) {
        const ret = wasm.unproveninput_deserialize(raw, netid);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return UnprovenInput.__wrap(ret[0]);
    }
    /**
     * @returns {string}
     */
    get nullifier() {
        let deferred2_0;
        let deferred2_1;
        try {
            const ret = wasm.unproveninput_nullifier(this.__wbg_ptr);
            var ptr1 = ret[0];
            var len1 = ret[1];
            if (ret[3]) {
                ptr1 = 0; len1 = 0;
                throw takeFromExternrefTable0(ret[2]);
            }
            deferred2_0 = ptr1;
            deferred2_1 = len1;
            return getStringFromWasm0(ptr1, len1);
        } finally {
            wasm.__wbindgen_free(deferred2_0, deferred2_1, 1);
        }
    }
    /**
     * @returns {string | undefined}
     */
    get contractAddress() {
        const ret = wasm.unproveninput_contractAddress(this.__wbg_ptr);
        if (ret[3]) {
            throw takeFromExternrefTable0(ret[2]);
        }
        let v1;
        if (ret[0] !== 0) {
            v1 = getStringFromWasm0(ret[0], ret[1]).slice();
            wasm.__wbindgen_free(ret[0], ret[1] * 1, 1);
        }
        return v1;
    }
    /**
     * @param {boolean | null} [compact]
     * @returns {string}
     */
    toString(compact) {
        let deferred1_0;
        let deferred1_1;
        try {
            const ret = wasm.unproveninput_toString(this.__wbg_ptr, isLikeNone(compact) ? 0xFFFFFF : compact ? 1 : 0);
            deferred1_0 = ret[0];
            deferred1_1 = ret[1];
            return getStringFromWasm0(ret[0], ret[1]);
        } finally {
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
}

const UnprovenOfferFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_unprovenoffer_free(ptr >>> 0, 1));

export class UnprovenOffer {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(UnprovenOffer.prototype);
        obj.__wbg_ptr = ptr;
        UnprovenOfferFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        UnprovenOfferFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_unprovenoffer_free(ptr, 0);
    }
    constructor() {
        const ret = wasm.unprovenoffer_new();
        this.__wbg_ptr = ret >>> 0;
        UnprovenOfferFinalization.register(this, this.__wbg_ptr, this);
        return this;
    }
    /**
     * @param {UnprovenInput} input
     * @param {string} type_
     * @param {bigint} value
     * @returns {UnprovenOffer}
     */
    static fromInput(input, type_, value) {
        _assertClass(input, UnprovenInput);
        const ptr0 = passStringToWasm0(type_, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.unprovenoffer_fromInput(input.__wbg_ptr, ptr0, len0, value);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return UnprovenOffer.__wrap(ret[0]);
    }
    /**
     * @param {UnprovenOutput} output
     * @param {string} type_
     * @param {bigint} value
     * @returns {UnprovenOffer}
     */
    static fromOutput(output, type_, value) {
        _assertClass(output, UnprovenOutput);
        const ptr0 = passStringToWasm0(type_, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.unprovenoffer_fromOutput(output.__wbg_ptr, ptr0, len0, value);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return UnprovenOffer.__wrap(ret[0]);
    }
    /**
     * @param {UnprovenTransient} transient
     * @returns {UnprovenOffer}
     */
    static fromTransient(transient) {
        _assertClass(transient, UnprovenTransient);
        const ret = wasm.unprovenoffer_fromTransient(transient.__wbg_ptr);
        return UnprovenOffer.__wrap(ret);
    }
    /**
     * @param {UnprovenOffer} other
     * @returns {UnprovenOffer}
     */
    merge(other) {
        _assertClass(other, UnprovenOffer);
        const ret = wasm.unprovenoffer_merge(this.__wbg_ptr, other.__wbg_ptr);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return UnprovenOffer.__wrap(ret[0]);
    }
    /**
     * @param {NetworkId} netid
     * @returns {Uint8Array}
     */
    serialize(netid) {
        const ret = wasm.unprovenoffer_serialize(this.__wbg_ptr, netid);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return takeFromExternrefTable0(ret[0]);
    }
    /**
     * @param {Uint8Array} raw
     * @param {NetworkId} netid
     * @returns {UnprovenOffer}
     */
    static deserialize(raw, netid) {
        const ret = wasm.unprovenoffer_deserialize(raw, netid);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return UnprovenOffer.__wrap(ret[0]);
    }
    /**
     * @returns {any[]}
     */
    get inputs() {
        const ret = wasm.unprovenoffer_inputs(this.__wbg_ptr);
        var v1 = getArrayJsValueFromWasm0(ret[0], ret[1]).slice();
        wasm.__wbindgen_free(ret[0], ret[1] * 4, 4);
        return v1;
    }
    /**
     * @returns {any[]}
     */
    get outputs() {
        const ret = wasm.unprovenoffer_outputs(this.__wbg_ptr);
        var v1 = getArrayJsValueFromWasm0(ret[0], ret[1]).slice();
        wasm.__wbindgen_free(ret[0], ret[1] * 4, 4);
        return v1;
    }
    /**
     * @returns {any[]}
     */
    get transient() {
        const ret = wasm.unprovenoffer_transient(this.__wbg_ptr);
        var v1 = getArrayJsValueFromWasm0(ret[0], ret[1]).slice();
        wasm.__wbindgen_free(ret[0], ret[1] * 4, 4);
        return v1;
    }
    /**
     * @returns {Map<any, any>}
     */
    get deltas() {
        const ret = wasm.unprovenoffer_deltas(this.__wbg_ptr);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return takeFromExternrefTable0(ret[0]);
    }
    /**
     * @param {boolean | null} [compact]
     * @returns {string}
     */
    toString(compact) {
        let deferred1_0;
        let deferred1_1;
        try {
            const ret = wasm.unprovenoffer_toString(this.__wbg_ptr, isLikeNone(compact) ? 0xFFFFFF : compact ? 1 : 0);
            deferred1_0 = ret[0];
            deferred1_1 = ret[1];
            return getStringFromWasm0(ret[0], ret[1]);
        } finally {
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
}

const UnprovenOutputFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_unprovenoutput_free(ptr >>> 0, 1));

export class UnprovenOutput {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(UnprovenOutput.prototype);
        obj.__wbg_ptr = ptr;
        UnprovenOutputFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        UnprovenOutputFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_unprovenoutput_free(ptr, 0);
    }
    constructor() {
        const ret = wasm.unprovenoutput_construct();
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        this.__wbg_ptr = ret[0] >>> 0;
        UnprovenOutputFinalization.register(this, this.__wbg_ptr, this);
        return this;
    }
    /**
     * @param {any} coin
     * @param {number} segment
     * @param {string} target_cpk
     * @param {string} target_epk
     * @returns {UnprovenOutput}
     */
    static new(coin, segment, target_cpk, target_epk) {
        const ptr0 = passStringToWasm0(target_cpk, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ptr1 = passStringToWasm0(target_epk, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len1 = WASM_VECTOR_LEN;
        const ret = wasm.unprovenoutput_new(coin, segment, ptr0, len0, ptr1, len1);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return UnprovenOutput.__wrap(ret[0]);
    }
    /**
     * @param {any} coin
     * @param {number} segment
     * @param {string} contract
     * @returns {UnprovenOutput}
     */
    static newContractOwned(coin, segment, contract) {
        const ptr0 = passStringToWasm0(contract, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.unprovenoutput_newContractOwned(coin, segment, ptr0, len0);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return UnprovenOutput.__wrap(ret[0]);
    }
    /**
     * @param {NetworkId} netid
     * @returns {Uint8Array}
     */
    serialize(netid) {
        const ret = wasm.unprovenoutput_serialize(this.__wbg_ptr, netid);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return takeFromExternrefTable0(ret[0]);
    }
    /**
     * @param {Uint8Array} raw
     * @param {NetworkId} netid
     * @returns {UnprovenOutput}
     */
    static deserialize(raw, netid) {
        const ret = wasm.unprovenoutput_deserialize(raw, netid);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return UnprovenOutput.__wrap(ret[0]);
    }
    /**
     * @returns {string}
     */
    get commitment() {
        let deferred2_0;
        let deferred2_1;
        try {
            const ret = wasm.unprovenoutput_commitment(this.__wbg_ptr);
            var ptr1 = ret[0];
            var len1 = ret[1];
            if (ret[3]) {
                ptr1 = 0; len1 = 0;
                throw takeFromExternrefTable0(ret[2]);
            }
            deferred2_0 = ptr1;
            deferred2_1 = len1;
            return getStringFromWasm0(ptr1, len1);
        } finally {
            wasm.__wbindgen_free(deferred2_0, deferred2_1, 1);
        }
    }
    /**
     * @returns {string | undefined}
     */
    get contractAddress() {
        const ret = wasm.unprovenoutput_contractAddress(this.__wbg_ptr);
        if (ret[3]) {
            throw takeFromExternrefTable0(ret[2]);
        }
        let v1;
        if (ret[0] !== 0) {
            v1 = getStringFromWasm0(ret[0], ret[1]).slice();
            wasm.__wbindgen_free(ret[0], ret[1] * 1, 1);
        }
        return v1;
    }
    /**
     * @param {boolean | null} [compact]
     * @returns {string}
     */
    toString(compact) {
        let deferred1_0;
        let deferred1_1;
        try {
            const ret = wasm.unprovenoutput_toString(this.__wbg_ptr, isLikeNone(compact) ? 0xFFFFFF : compact ? 1 : 0);
            deferred1_0 = ret[0];
            deferred1_1 = ret[1];
            return getStringFromWasm0(ret[0], ret[1]);
        } finally {
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
}

const UnprovenTransactionFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_unproventransaction_free(ptr >>> 0, 1));

export class UnprovenTransaction {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(UnprovenTransaction.prototype);
        obj.__wbg_ptr = ptr;
        UnprovenTransactionFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        UnprovenTransactionFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_unproventransaction_free(ptr, 0);
    }
    /**
     * @param {UnprovenOffer} guaranteed
     * @param {any} fallible
     */
    constructor(guaranteed, fallible) {
        _assertClass(guaranteed, UnprovenOffer);
        const ret = wasm.unproventransaction_new(guaranteed.__wbg_ptr, fallible);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        this.__wbg_ptr = ret[0] >>> 0;
        UnprovenTransactionFinalization.register(this, this.__wbg_ptr, this);
        return this;
    }
    /**
     * @param {UnprovenAuthorizedMint} mint
     * @returns {UnprovenTransaction}
     */
    static fromMint(mint) {
        _assertClass(mint, UnprovenAuthorizedMint);
        const ret = wasm.unproventransaction_fromMint(mint.__wbg_ptr);
        return UnprovenTransaction.__wrap(ret);
    }
    /**
     * @returns {ProofErasedTransaction}
     */
    eraseProofs() {
        const ret = wasm.unproventransaction_eraseProofs(this.__wbg_ptr);
        return ProofErasedTransaction.__wrap(ret);
    }
    /**
     * @returns {UnprovenAuthorizedMint | undefined}
     */
    get mint() {
        const ret = wasm.unproventransaction_mint(this.__wbg_ptr);
        return ret === 0 ? undefined : UnprovenAuthorizedMint.__wrap(ret);
    }
    /**
     * @returns {UnprovenOffer | undefined}
     */
    get guaranteedCoins() {
        const ret = wasm.unproventransaction_guaranteedCoins(this.__wbg_ptr);
        return ret === 0 ? undefined : UnprovenOffer.__wrap(ret);
    }
    /**
     * @returns {UnprovenOffer | undefined}
     */
    get fallibleCoins() {
        const ret = wasm.unproventransaction_fallibleCoins(this.__wbg_ptr);
        return ret === 0 ? undefined : UnprovenOffer.__wrap(ret);
    }
    /**
     * @returns {string[]}
     */
    identifiers() {
        const ret = wasm.unproventransaction_identifiers(this.__wbg_ptr);
        if (ret[3]) {
            throw takeFromExternrefTable0(ret[2]);
        }
        var v1 = getArrayJsValueFromWasm0(ret[0], ret[1]).slice();
        wasm.__wbindgen_free(ret[0], ret[1] * 4, 4);
        return v1;
    }
    /**
     * @param {UnprovenTransaction} other
     * @returns {UnprovenTransaction}
     */
    merge(other) {
        _assertClass(other, UnprovenTransaction);
        const ret = wasm.unproventransaction_merge(this.__wbg_ptr, other.__wbg_ptr);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return UnprovenTransaction.__wrap(ret[0]);
    }
    /**
     * @param {NetworkId} netid
     * @returns {Uint8Array}
     */
    serialize(netid) {
        const ret = wasm.unproventransaction_serialize(this.__wbg_ptr, netid);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return takeFromExternrefTable0(ret[0]);
    }
    /**
     * @param {Uint8Array} raw
     * @param {NetworkId} netid
     * @returns {UnprovenTransaction}
     */
    static deserialize(raw, netid) {
        const ret = wasm.unproventransaction_deserialize(raw, netid);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return UnprovenTransaction.__wrap(ret[0]);
    }
    /**
     * @param {boolean | null} [compact]
     * @returns {string}
     */
    toString(compact) {
        let deferred1_0;
        let deferred1_1;
        try {
            const ret = wasm.unproventransaction_toString(this.__wbg_ptr, isLikeNone(compact) ? 0xFFFFFF : compact ? 1 : 0);
            deferred1_0 = ret[0];
            deferred1_1 = ret[1];
            return getStringFromWasm0(ret[0], ret[1]);
        } finally {
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
}

const UnprovenTransientFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_unproventransient_free(ptr >>> 0, 1));

export class UnprovenTransient {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(UnprovenTransient.prototype);
        obj.__wbg_ptr = ptr;
        UnprovenTransientFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        UnprovenTransientFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_unproventransient_free(ptr, 0);
    }
    constructor() {
        const ret = wasm.unproventransient_new();
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        this.__wbg_ptr = ret[0] >>> 0;
        UnprovenTransientFinalization.register(this, this.__wbg_ptr, this);
        return this;
    }
    /**
     * @param {any} coin
     * @param {number} segment
     * @param {UnprovenOutput} output
     * @returns {UnprovenTransient}
     */
    static newFromContractOwnedOutput(coin, segment, output) {
        _assertClass(output, UnprovenOutput);
        const ret = wasm.unproventransient_newFromContractOwnedOutput(coin, segment, output.__wbg_ptr);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return UnprovenTransient.__wrap(ret[0]);
    }
    /**
     * @param {NetworkId} netid
     * @returns {Uint8Array}
     */
    serialize(netid) {
        const ret = wasm.unproventransient_serialize(this.__wbg_ptr, netid);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return takeFromExternrefTable0(ret[0]);
    }
    /**
     * @param {Uint8Array} raw
     * @param {NetworkId} netid
     * @returns {UnprovenTransient}
     */
    static deserialize(raw, netid) {
        const ret = wasm.unproventransient_deserialize(raw, netid);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return UnprovenTransient.__wrap(ret[0]);
    }
    /**
     * @returns {string}
     */
    get commitment() {
        let deferred2_0;
        let deferred2_1;
        try {
            const ret = wasm.unproventransient_commitment(this.__wbg_ptr);
            var ptr1 = ret[0];
            var len1 = ret[1];
            if (ret[3]) {
                ptr1 = 0; len1 = 0;
                throw takeFromExternrefTable0(ret[2]);
            }
            deferred2_0 = ptr1;
            deferred2_1 = len1;
            return getStringFromWasm0(ptr1, len1);
        } finally {
            wasm.__wbindgen_free(deferred2_0, deferred2_1, 1);
        }
    }
    /**
     * @returns {string}
     */
    get nullifier() {
        let deferred2_0;
        let deferred2_1;
        try {
            const ret = wasm.unproventransient_nullifier(this.__wbg_ptr);
            var ptr1 = ret[0];
            var len1 = ret[1];
            if (ret[3]) {
                ptr1 = 0; len1 = 0;
                throw takeFromExternrefTable0(ret[2]);
            }
            deferred2_0 = ptr1;
            deferred2_1 = len1;
            return getStringFromWasm0(ptr1, len1);
        } finally {
            wasm.__wbindgen_free(deferred2_0, deferred2_1, 1);
        }
    }
    /**
     * @returns {string | undefined}
     */
    get contractAddress() {
        const ret = wasm.unproventransient_contractAddress(this.__wbg_ptr);
        if (ret[3]) {
            throw takeFromExternrefTable0(ret[2]);
        }
        let v1;
        if (ret[0] !== 0) {
            v1 = getStringFromWasm0(ret[0], ret[1]).slice();
            wasm.__wbindgen_free(ret[0], ret[1] * 1, 1);
        }
        return v1;
    }
    /**
     * @param {boolean | null} [compact]
     * @returns {string}
     */
    toString(compact) {
        let deferred1_0;
        let deferred1_1;
        try {
            const ret = wasm.unproventransient_toString(this.__wbg_ptr, isLikeNone(compact) ? 0xFFFFFF : compact ? 1 : 0);
            deferred1_0 = ret[0];
            deferred1_1 = ret[1];
            return getStringFromWasm0(ret[0], ret[1]);
        } finally {
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
}

const ZswapChainStateFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_zswapchainstate_free(ptr >>> 0, 1));

export class ZswapChainState {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(ZswapChainState.prototype);
        obj.__wbg_ptr = ptr;
        ZswapChainStateFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        ZswapChainStateFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_zswapchainstate_free(ptr, 0);
    }
    constructor() {
        const ret = wasm.zswapchainstate_new();
        this.__wbg_ptr = ret >>> 0;
        ZswapChainStateFinalization.register(this, this.__wbg_ptr, this);
        return this;
    }
    /**
     * @returns {bigint}
     */
    get firstFree() {
        const ret = wasm.localstate_firstFree(this.__wbg_ptr);
        return BigInt.asUintN(64, ret);
    }
    /**
     * @param {NetworkId} netid
     * @returns {Uint8Array}
     */
    serialize_raw(netid) {
        const ret = wasm.zswapchainstate_serialize_raw(this.__wbg_ptr, netid);
        if (ret[3]) {
            throw takeFromExternrefTable0(ret[2]);
        }
        var v1 = getArrayU8FromWasm0(ret[0], ret[1]).slice();
        wasm.__wbindgen_free(ret[0], ret[1] * 1, 1);
        return v1;
    }
    /**
     * @param {ContractAddress} contract_address
     * @returns {ZswapChainState}
     */
    filter(contract_address) {
        _assertClass(contract_address, ContractAddress);
        var ptr0 = contract_address.__destroy_into_raw();
        const ret = wasm.zswapchainstate_filter(this.__wbg_ptr, ptr0);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return ZswapChainState.__wrap(ret[0]);
    }
    /**
     * @returns {Uint8Array}
     */
    merkle_tree_root() {
        const ret = wasm.zswapchainstate_merkle_tree_root(this.__wbg_ptr);
        if (ret[3]) {
            throw takeFromExternrefTable0(ret[2]);
        }
        var v1 = getArrayU8FromWasm0(ret[0], ret[1]).slice();
        wasm.__wbindgen_free(ret[0], ret[1] * 1, 1);
        return v1;
    }
    /**
     * @param {NetworkId} netid
     * @returns {Uint8Array}
     */
    serialize(netid) {
        const ret = wasm.zswapchainstate_serialize(this.__wbg_ptr, netid);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return takeFromExternrefTable0(ret[0]);
    }
    /**
     * @param {Uint8Array} raw
     * @param {NetworkId} netid
     * @returns {ZswapChainState}
     */
    static deserialize(raw, netid) {
        const ret = wasm.zswapchainstate_deserialize(raw, netid);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return ZswapChainState.__wrap(ret[0]);
    }
    /**
     * @param {Uint8Array} raw
     * @param {NetworkId} netid
     * @returns {ZswapChainState}
     */
    static deserialize_raw(raw, netid) {
        const ptr0 = passArray8ToWasm0(raw, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.zswapchainstate_deserialize_raw(ptr0, len0, netid);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return ZswapChainState.__wrap(ret[0]);
    }
    /**
     * @param {Uint8Array} raw
     * @param {NetworkId} netid
     * @returns {ZswapChainState}
     */
    static deserializeFromLedgerState(raw, netid) {
        const ret = wasm.zswapchainstate_deserializeFromLedgerState(raw, netid);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return ZswapChainState.__wrap(ret[0]);
    }
    /**
     * @param {Offer} offer
     * @param {any} whitelist
     * @returns {any}
     */
    tryApply(offer, whitelist) {
        _assertClass(offer, Offer);
        const ret = wasm.zswapchainstate_tryApply(this.__wbg_ptr, offer.__wbg_ptr, whitelist);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return takeFromExternrefTable0(ret[0]);
    }
    /**
     * @param {Offer} offer
     * @returns {ZswapChainState}
     */
    tryApplyWithoutWhitelist(offer) {
        _assertClass(offer, Offer);
        const ret = wasm.zswapchainstate_tryApplyWithoutWhitelist(this.__wbg_ptr, offer.__wbg_ptr);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return ZswapChainState.__wrap(ret[0]);
    }
    /**
     * @param {ProofErasedOffer} offer
     * @param {any} whitelist
     * @returns {any}
     */
    tryApplyProofErased(offer, whitelist) {
        _assertClass(offer, ProofErasedOffer);
        const ret = wasm.zswapchainstate_tryApplyProofErased(this.__wbg_ptr, offer.__wbg_ptr, whitelist);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return takeFromExternrefTable0(ret[0]);
    }
    /**
     * @param {boolean | null} [compact]
     * @returns {string}
     */
    toString(compact) {
        let deferred1_0;
        let deferred1_1;
        try {
            const ret = wasm.zswapchainstate_toString(this.__wbg_ptr, isLikeNone(compact) ? 0xFFFFFF : compact ? 1 : 0);
            deferred1_0 = ret[0];
            deferred1_1 = ret[1];
            return getStringFromWasm0(ret[0], ret[1]);
        } finally {
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
}

export function __wbg_String_fed4d24b68977888(arg0, arg1) {
    const ret = String(arg1);
    const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    const len1 = WASM_VECTOR_LEN;
    getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
    getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
};

export function __wbg_add_883d9432f9188ef2(arg0, arg1) {
    const ret = arg0.add(arg1);
    return ret;
};

export function __wbg_apply_36be6a55257c99bf() { return handleError(function (arg0, arg1, arg2) {
    const ret = arg0.apply(arg1, arg2);
    return ret;
}, arguments) };

export function __wbg_buffer_09165b52af8c5237(arg0) {
    const ret = arg0.buffer;
    return ret;
};

export function __wbg_buffer_609cc3eee51ed158(arg0) {
    const ret = arg0.buffer;
    return ret;
};

export function __wbg_byobRequest_77d9adf63337edfb(arg0) {
    const ret = arg0.byobRequest;
    return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
};

export function __wbg_byteLength_e674b853d9c77e1d(arg0) {
    const ret = arg0.byteLength;
    return ret;
};

export function __wbg_byteOffset_fd862df290ef848d(arg0) {
    const ret = arg0.byteOffset;
    return ret;
};

export function __wbg_call_672a4d21634d4a24() { return handleError(function (arg0, arg1) {
    const ret = arg0.call(arg1);
    return ret;
}, arguments) };

export function __wbg_call_7cccdd69e0791ae2() { return handleError(function (arg0, arg1, arg2) {
    const ret = arg0.call(arg1, arg2);
    return ret;
}, arguments) };

export function __wbg_close_304cc1fef3466669() { return handleError(function (arg0) {
    arg0.close();
}, arguments) };

export function __wbg_close_5ce03e29be453811() { return handleError(function (arg0) {
    arg0.close();
}, arguments) };

export function __wbg_crypto_574e78ad8b13b65f(arg0) {
    const ret = arg0.crypto;
    return ret;
};

export function __wbg_enqueue_bb16ba72f537dc9e() { return handleError(function (arg0, arg1) {
    arg0.enqueue(arg1);
}, arguments) };

export function __wbg_forEach_432d981ecbee7d69(arg0, arg1, arg2) {
    try {
        var state0 = {a: arg1, b: arg2};
        var cb0 = (arg0, arg1, arg2) => {
            const a = state0.a;
            state0.a = 0;
            try {
                return __wbg_adapter_389(a, state0.b, arg0, arg1, arg2);
            } finally {
                state0.a = a;
            }
        };
        arg0.forEach(cb0);
    } finally {
        state0.a = state0.b = 0;
    }
};

export function __wbg_getPrototypeOf_08aaacea7e300a38() { return handleError(function (arg0) {
    const ret = Reflect.getPrototypeOf(arg0);
    return ret;
}, arguments) };

export function __wbg_getRandomValues_b8f5dbd5f3995a9e() { return handleError(function (arg0, arg1) {
    arg0.getRandomValues(arg1);
}, arguments) };

export function __wbg_get_67b2ba62fc30de12() { return handleError(function (arg0, arg1) {
    const ret = Reflect.get(arg0, arg1);
    return ret;
}, arguments) };

export function __wbg_getwithrefkey_bb8f74a92cb2e784(arg0, arg1) {
    const ret = arg0[arg1];
    return ret;
};

export function __wbg_input_new(arg0) {
    const ret = Input.__wrap(arg0);
    return ret;
};

export function __wbg_instanceof_ArrayBuffer_e14585432e3737fc(arg0) {
    let result;
    try {
        result = arg0 instanceof ArrayBuffer;
    } catch (_) {
        result = false;
    }
    const ret = result;
    return ret;
};

export function __wbg_instanceof_Set_f48781e4bf8ffb09(arg0) {
    let result;
    try {
        result = arg0 instanceof Set;
    } catch (_) {
        result = false;
    }
    const ret = result;
    return ret;
};

export function __wbg_instanceof_Uint8Array_17156bcf118086a9(arg0) {
    let result;
    try {
        result = arg0 instanceof Uint8Array;
    } catch (_) {
        result = false;
    }
    const ret = result;
    return ret;
};

export function __wbg_isSafeInteger_343e2beeeece1bb0(arg0) {
    const ret = Number.isSafeInteger(arg0);
    return ret;
};

export function __wbg_length_a446193dc22c12f8(arg0) {
    const ret = arg0.length;
    return ret;
};

export function __wbg_localstate_new(arg0) {
    const ret = LocalState.__wrap(arg0);
    return ret;
};

export function __wbg_msCrypto_a61aeb35a24c1329(arg0) {
    const ret = arg0.msCrypto;
    return ret;
};

export function __wbg_new_23a2665fac83c611(arg0, arg1) {
    try {
        var state0 = {a: arg0, b: arg1};
        var cb0 = (arg0, arg1) => {
            const a = state0.a;
            state0.a = 0;
            try {
                return __wbg_adapter_394(a, state0.b, arg0, arg1);
            } finally {
                state0.a = a;
            }
        };
        const ret = new Promise(cb0);
        return ret;
    } finally {
        state0.a = state0.b = 0;
    }
};

export function __wbg_new_405e22f390576ce2() {
    const ret = new Object();
    return ret;
};

export function __wbg_new_5e0be73521bc8c17() {
    const ret = new Map();
    return ret;
};

export function __wbg_new_78feb108b6472713() {
    const ret = new Array();
    return ret;
};

export function __wbg_new_a12002a7f91c75be(arg0) {
    const ret = new Uint8Array(arg0);
    return ret;
};

export function __wbg_new_a239edaa1dc2968f(arg0) {
    const ret = new Set(arg0);
    return ret;
};

export function __wbg_new_c68d7209be747379(arg0, arg1) {
    const ret = new Error(getStringFromWasm0(arg0, arg1));
    return ret;
};

export function __wbg_newnoargs_105ed471475aaf50(arg0, arg1) {
    const ret = new Function(getStringFromWasm0(arg0, arg1));
    return ret;
};

export function __wbg_newwithbyteoffsetandlength_d97e637ebe145a9a(arg0, arg1, arg2) {
    const ret = new Uint8Array(arg0, arg1 >>> 0, arg2 >>> 0);
    return ret;
};

export function __wbg_newwithlength_a381634e90c276d4(arg0) {
    const ret = new Uint8Array(arg0 >>> 0);
    return ret;
};

export function __wbg_node_905d3e251edff8a2(arg0) {
    const ret = arg0.node;
    return ret;
};

export function __wbg_output_new(arg0) {
    const ret = Output.__wrap(arg0);
    return ret;
};

export function __wbg_process_dc0fbacc7c1c06f7(arg0) {
    const ret = arg0.process;
    return ret;
};

export function __wbg_prooferasedinput_new(arg0) {
    const ret = ProofErasedInput.__wrap(arg0);
    return ret;
};

export function __wbg_prooferasedoutput_new(arg0) {
    const ret = ProofErasedOutput.__wrap(arg0);
    return ret;
};

export function __wbg_prooferasedtransient_new(arg0) {
    const ret = ProofErasedTransient.__wrap(arg0);
    return ret;
};

export function __wbg_push_737cfc8c1432c2c6(arg0, arg1) {
    const ret = arg0.push(arg1);
    return ret;
};

export function __wbg_queueMicrotask_97d92b4fcc8a61c5(arg0) {
    queueMicrotask(arg0);
};

export function __wbg_queueMicrotask_d3219def82552485(arg0) {
    const ret = arg0.queueMicrotask;
    return ret;
};

export function __wbg_randomFillSync_ac0988aba3254290() { return handleError(function (arg0, arg1) {
    arg0.randomFillSync(arg1);
}, arguments) };

export function __wbg_require_60cc747a6bc5215a() { return handleError(function () {
    const ret = module.require;
    return ret;
}, arguments) };

export function __wbg_resolve_4851785c9c5f573d(arg0) {
    const ret = Promise.resolve(arg0);
    return ret;
};

export function __wbg_respond_1f279fa9f8edcb1c() { return handleError(function (arg0, arg1) {
    arg0.respond(arg1 >>> 0);
}, arguments) };

export function __wbg_set_3fda3bac07393de4(arg0, arg1, arg2) {
    arg0[arg1] = arg2;
};

export function __wbg_set_65595bdd868b3009(arg0, arg1, arg2) {
    arg0.set(arg1, arg2 >>> 0);
};

export function __wbg_set_8fc6bf8a5b1071d1(arg0, arg1, arg2) {
    const ret = arg0.set(arg1, arg2);
    return ret;
};

export function __wbg_static_accessor_GLOBAL_88a902d13a557d07() {
    const ret = typeof global === 'undefined' ? null : global;
    return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
};

export function __wbg_static_accessor_GLOBAL_THIS_56578be7e9f832b0() {
    const ret = typeof globalThis === 'undefined' ? null : globalThis;
    return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
};

export function __wbg_static_accessor_SELF_37c5d418e4bf5819() {
    const ret = typeof self === 'undefined' ? null : self;
    return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
};

export function __wbg_static_accessor_WINDOW_5de37043a91a9c40() {
    const ret = typeof window === 'undefined' ? null : window;
    return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
};

export function __wbg_subarray_aa9065fa9dc5df96(arg0, arg1, arg2) {
    const ret = arg0.subarray(arg1 >>> 0, arg2 >>> 0);
    return ret;
};

export function __wbg_then_44b73946d2fb3e7d(arg0, arg1) {
    const ret = arg0.then(arg1);
    return ret;
};

export function __wbg_transient_new(arg0) {
    const ret = Transient.__wrap(arg0);
    return ret;
};

export function __wbg_unproveninput_new(arg0) {
    const ret = UnprovenInput.__wrap(arg0);
    return ret;
};

export function __wbg_unprovenoutput_new(arg0) {
    const ret = UnprovenOutput.__wrap(arg0);
    return ret;
};

export function __wbg_unproventransaction_new(arg0) {
    const ret = UnprovenTransaction.__wrap(arg0);
    return ret;
};

export function __wbg_unproventransient_new(arg0) {
    const ret = UnprovenTransient.__wrap(arg0);
    return ret;
};

export function __wbg_versions_c01dfd4722a88165(arg0) {
    const ret = arg0.versions;
    return ret;
};

export function __wbg_view_fd8a56e8983f448d(arg0) {
    const ret = arg0.view;
    return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
};

export function __wbg_zswapchainstate_new(arg0) {
    const ret = ZswapChainState.__wrap(arg0);
    return ret;
};

export function __wbindgen_bigint_from_i128(arg0, arg1) {
    const ret = arg0 << BigInt(64) | BigInt.asUintN(64, arg1);
    return ret;
};

export function __wbindgen_bigint_from_u128(arg0, arg1) {
    const ret = BigInt.asUintN(64, arg0) << BigInt(64) | BigInt.asUintN(64, arg1);
    return ret;
};

export function __wbindgen_bigint_from_u64(arg0) {
    const ret = BigInt.asUintN(64, arg0);
    return ret;
};

export function __wbindgen_bigint_get_as_i64(arg0, arg1) {
    const v = arg1;
    const ret = typeof(v) === 'bigint' ? v : undefined;
    getDataViewMemory0().setBigInt64(arg0 + 8 * 1, isLikeNone(ret) ? BigInt(0) : ret, true);
    getDataViewMemory0().setInt32(arg0 + 4 * 0, !isLikeNone(ret), true);
};

export function __wbindgen_boolean_get(arg0) {
    const v = arg0;
    const ret = typeof(v) === 'boolean' ? (v ? 1 : 0) : 2;
    return ret;
};

export function __wbindgen_cb_drop(arg0) {
    const obj = arg0.original;
    if (obj.cnt-- == 1) {
        obj.a = 0;
        return true;
    }
    const ret = false;
    return ret;
};

export function __wbindgen_closure_wrapper3626(arg0, arg1, arg2) {
    const ret = makeMutClosure(arg0, arg1, 649, __wbg_adapter_56);
    return ret;
};

export function __wbindgen_debug_string(arg0, arg1) {
    const ret = debugString(arg1);
    const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    const len1 = WASM_VECTOR_LEN;
    getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
    getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
};

export function __wbindgen_error_new(arg0, arg1) {
    const ret = new Error(getStringFromWasm0(arg0, arg1));
    return ret;
};

export function __wbindgen_in(arg0, arg1) {
    const ret = arg0 in arg1;
    return ret;
};

export function __wbindgen_init_externref_table() {
    const table = wasm.__wbindgen_export_4;
    const offset = table.grow(4);
    table.set(0, undefined);
    table.set(offset + 0, undefined);
    table.set(offset + 1, null);
    table.set(offset + 2, true);
    table.set(offset + 3, false);
    ;
};

export function __wbindgen_is_bigint(arg0) {
    const ret = typeof(arg0) === 'bigint';
    return ret;
};

export function __wbindgen_is_function(arg0) {
    const ret = typeof(arg0) === 'function';
    return ret;
};

export function __wbindgen_is_null(arg0) {
    const ret = arg0 === null;
    return ret;
};

export function __wbindgen_is_object(arg0) {
    const val = arg0;
    const ret = typeof(val) === 'object' && val !== null;
    return ret;
};

export function __wbindgen_is_string(arg0) {
    const ret = typeof(arg0) === 'string';
    return ret;
};

export function __wbindgen_is_undefined(arg0) {
    const ret = arg0 === undefined;
    return ret;
};

export function __wbindgen_jsval_eq(arg0, arg1) {
    const ret = arg0 === arg1;
    return ret;
};

export function __wbindgen_jsval_loose_eq(arg0, arg1) {
    const ret = arg0 == arg1;
    return ret;
};

export function __wbindgen_memory() {
    const ret = wasm.memory;
    return ret;
};

export function __wbindgen_number_get(arg0, arg1) {
    const obj = arg1;
    const ret = typeof(obj) === 'number' ? obj : undefined;
    getDataViewMemory0().setFloat64(arg0 + 8 * 1, isLikeNone(ret) ? 0 : ret, true);
    getDataViewMemory0().setInt32(arg0 + 4 * 0, !isLikeNone(ret), true);
};

export function __wbindgen_number_new(arg0) {
    const ret = arg0;
    return ret;
};

export function __wbindgen_shr(arg0, arg1) {
    const ret = arg0 >> arg1;
    return ret;
};

export function __wbindgen_string_get(arg0, arg1) {
    const obj = arg1;
    const ret = typeof(obj) === 'string' ? obj : undefined;
    var ptr1 = isLikeNone(ret) ? 0 : passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    var len1 = WASM_VECTOR_LEN;
    getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
    getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
};

export function __wbindgen_string_new(arg0, arg1) {
    const ret = getStringFromWasm0(arg0, arg1);
    return ret;
};

export function __wbindgen_throw(arg0, arg1) {
    throw new Error(getStringFromWasm0(arg0, arg1));
};


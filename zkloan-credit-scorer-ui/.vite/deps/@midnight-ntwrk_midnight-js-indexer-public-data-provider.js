import {
  Observable,
  __assign,
  __extends,
  concatMap,
  filter,
  firstValueFrom,
  from,
  iif,
  init_tslib_es6,
  map,
  skip,
  skipWhile,
  take,
  tslib_es6_exports,
  zip
} from "./chunk-X4BGMPF2.js";
import {
  require_browser_ponyfill
} from "./chunk-ZUV5NWEK.js";
import {
  assertIsContractAddress
} from "./chunk-NY6JJKLJ.js";
import {
  FailEntirely,
  FailFallible,
  InvalidProtocolSchemeError,
  SegmentFail,
  SegmentSuccess,
  SucceedEntirely
} from "./chunk-J7ZCMGN6.js";
import {
  Transaction,
  ZswapChainState
} from "./chunk-TB2A6I4S.js";
import {
  ContractState
} from "./chunk-VJNAFTFR.js";
import {
  require_buffer
} from "./chunk-D7WYEG3T.js";
import {
  __commonJS,
  __esm,
  __export,
  __toCommonJS,
  __toESM
} from "./chunk-V4OQ3NZ2.js";

// ../node_modules/ts-invariant/lib/invariant.js
var invariant_exports = {};
__export(invariant_exports, {
  InvariantError: () => InvariantError,
  default: () => invariant_default,
  invariant: () => invariant,
  setVerbosity: () => setVerbosity
});
function invariant(condition, message) {
  if (!condition) {
    throw new InvariantError(message);
  }
}
function wrapConsoleMethod(name) {
  return function() {
    if (verbosityLevels.indexOf(name) >= verbosityLevel) {
      var method = console[name] || console.log;
      return method.apply(console, arguments);
    }
  };
}
function setVerbosity(level) {
  var old = verbosityLevels[verbosityLevel];
  verbosityLevel = Math.max(0, verbosityLevels.indexOf(level));
  return old;
}
var genericMessage, _a, setPrototypeOf, InvariantError, verbosityLevels, verbosityLevel, invariant_default;
var init_invariant = __esm({
  "../node_modules/ts-invariant/lib/invariant.js"() {
    init_tslib_es6();
    genericMessage = "Invariant Violation";
    _a = Object.setPrototypeOf;
    setPrototypeOf = _a === void 0 ? function(obj, proto) {
      obj.__proto__ = proto;
      return obj;
    } : _a;
    InvariantError = /** @class */
    (function(_super) {
      __extends(InvariantError2, _super);
      function InvariantError2(message) {
        if (message === void 0) {
          message = genericMessage;
        }
        var _this = _super.call(this, typeof message === "number" ? genericMessage + ": " + message + " (see https://github.com/apollographql/invariant-packages)" : message) || this;
        _this.framesToPop = 1;
        _this.name = genericMessage;
        setPrototypeOf(_this, InvariantError2.prototype);
        return _this;
      }
      return InvariantError2;
    })(Error);
    verbosityLevels = ["debug", "log", "warn", "error", "silent"];
    verbosityLevel = verbosityLevels.indexOf("log");
    (function(invariant3) {
      invariant3.debug = wrapConsoleMethod("debug");
      invariant3.log = wrapConsoleMethod("log");
      invariant3.warn = wrapConsoleMethod("warn");
      invariant3.error = wrapConsoleMethod("error");
    })(invariant || (invariant = {}));
    invariant_default = invariant;
  }
});

// ../node_modules/@apollo/client/utilities/globals/globals.cjs
var require_globals = __commonJS({
  "../node_modules/@apollo/client/utilities/globals/globals.cjs"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var tsInvariant = (init_invariant(), __toCommonJS(invariant_exports));
    var version2 = "3.14.0";
    function maybe2(thunk) {
      try {
        return thunk();
      } catch (_a2) {
      }
    }
    var global$1 = maybe2(function() {
      return globalThis;
    }) || maybe2(function() {
      return window;
    }) || maybe2(function() {
      return self;
    }) || maybe2(function() {
      return globalThis;
    }) || maybe2(function() {
      return maybe2.constructor("return this")();
    });
    var prefixCounts = /* @__PURE__ */ new Map();
    function makeUniqueId(prefix) {
      var count = prefixCounts.get(prefix) || 1;
      prefixCounts.set(prefix, count + 1);
      return "".concat(prefix, ":").concat(count, ":").concat(Math.random().toString(36).slice(2));
    }
    function stringifyForDisplay(value, space) {
      if (space === void 0) {
        space = 0;
      }
      var undefId = makeUniqueId("stringifyForDisplay");
      return JSON.stringify(value, function(key, value2) {
        return value2 === void 0 ? undefId : value2;
      }, space).split(JSON.stringify(undefId)).join("<undefined>");
    }
    function wrap3(fn) {
      return function(message) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
          args[_i - 1] = arguments[_i];
        }
        if (typeof message === "number") {
          var arg0 = message;
          message = getHandledErrorMsg(arg0);
          if (!message) {
            message = getFallbackErrorMsg(arg0, args);
            args = [];
          }
        }
        fn.apply(void 0, [message].concat(args));
      };
    }
    var invariant3 = Object.assign(function invariant4(condition, message) {
      var args = [];
      for (var _i = 2; _i < arguments.length; _i++) {
        args[_i - 2] = arguments[_i];
      }
      if (!condition) {
        tsInvariant.invariant(condition, getHandledErrorMsg(message, args) || getFallbackErrorMsg(message, args));
      }
    }, {
      debug: wrap3(tsInvariant.invariant.debug),
      log: wrap3(tsInvariant.invariant.log),
      warn: wrap3(tsInvariant.invariant.warn),
      error: wrap3(tsInvariant.invariant.error)
    });
    function newInvariantError(message) {
      var optionalParams = [];
      for (var _i = 1; _i < arguments.length; _i++) {
        optionalParams[_i - 1] = arguments[_i];
      }
      return new tsInvariant.InvariantError(getHandledErrorMsg(message, optionalParams) || getFallbackErrorMsg(message, optionalParams));
    }
    var ApolloErrorMessageHandler = Symbol.for("ApolloErrorMessageHandler_" + version2);
    function stringify(arg) {
      if (typeof arg == "string") {
        return arg;
      }
      try {
        return stringifyForDisplay(arg, 2).slice(0, 1e3);
      } catch (_a2) {
        return "<non-serializable>";
      }
    }
    function getHandledErrorMsg(message, messageArgs) {
      if (messageArgs === void 0) {
        messageArgs = [];
      }
      if (!message)
        return;
      return global$1[ApolloErrorMessageHandler] && global$1[ApolloErrorMessageHandler](message, messageArgs.map(stringify));
    }
    function getFallbackErrorMsg(message, messageArgs) {
      if (messageArgs === void 0) {
        messageArgs = [];
      }
      if (!message)
        return;
      return "An error occurred! For more details, see the full error text at https://go.apollo.dev/c/err#".concat(encodeURIComponent(JSON.stringify({
        version: version2,
        message,
        args: messageArgs.map(stringify)
      })));
    }
    var DEV = globalThis.__DEV__ !== false;
    exports.InvariantError = tsInvariant.InvariantError;
    exports.DEV = DEV;
    exports.__DEV__ = DEV;
    exports.global = global$1;
    exports.invariant = invariant3;
    exports.maybe = maybe2;
    exports.newInvariantError = newInvariantError;
  }
});

// ../node_modules/graphql/version.mjs
var version, versionInfo;
var init_version = __esm({
  "../node_modules/graphql/version.mjs"() {
    version = "16.11.0";
    versionInfo = Object.freeze({
      major: 16,
      minor: 11,
      patch: 0,
      preReleaseTag: null
    });
  }
});

// ../node_modules/graphql/jsutils/devAssert.mjs
function devAssert(condition, message) {
  const booleanCondition = Boolean(condition);
  if (!booleanCondition) {
    throw new Error(message);
  }
}
var init_devAssert = __esm({
  "../node_modules/graphql/jsutils/devAssert.mjs"() {
  }
});

// ../node_modules/graphql/jsutils/isPromise.mjs
function isPromise(value) {
  return typeof (value === null || value === void 0 ? void 0 : value.then) === "function";
}
var init_isPromise = __esm({
  "../node_modules/graphql/jsutils/isPromise.mjs"() {
  }
});

// ../node_modules/graphql/jsutils/isObjectLike.mjs
function isObjectLike(value) {
  return typeof value == "object" && value !== null;
}
var init_isObjectLike = __esm({
  "../node_modules/graphql/jsutils/isObjectLike.mjs"() {
  }
});

// ../node_modules/graphql/jsutils/invariant.mjs
function invariant2(condition, message) {
  const booleanCondition = Boolean(condition);
  if (!booleanCondition) {
    throw new Error(
      message != null ? message : "Unexpected invariant triggered."
    );
  }
}
var init_invariant2 = __esm({
  "../node_modules/graphql/jsutils/invariant.mjs"() {
  }
});

// ../node_modules/graphql/language/location.mjs
function getLocation(source, position) {
  let lastLineStart = 0;
  let line = 1;
  for (const match of source.body.matchAll(LineRegExp)) {
    typeof match.index === "number" || invariant2(false);
    if (match.index >= position) {
      break;
    }
    lastLineStart = match.index + match[0].length;
    line += 1;
  }
  return {
    line,
    column: position + 1 - lastLineStart
  };
}
var LineRegExp;
var init_location = __esm({
  "../node_modules/graphql/language/location.mjs"() {
    init_invariant2();
    LineRegExp = /\r\n|[\n\r]/g;
  }
});

// ../node_modules/graphql/language/printLocation.mjs
function printLocation(location) {
  return printSourceLocation(
    location.source,
    getLocation(location.source, location.start)
  );
}
function printSourceLocation(source, sourceLocation) {
  const firstLineColumnOffset = source.locationOffset.column - 1;
  const body = "".padStart(firstLineColumnOffset) + source.body;
  const lineIndex = sourceLocation.line - 1;
  const lineOffset = source.locationOffset.line - 1;
  const lineNum = sourceLocation.line + lineOffset;
  const columnOffset = sourceLocation.line === 1 ? firstLineColumnOffset : 0;
  const columnNum = sourceLocation.column + columnOffset;
  const locationStr = `${source.name}:${lineNum}:${columnNum}
`;
  const lines = body.split(/\r\n|[\n\r]/g);
  const locationLine = lines[lineIndex];
  if (locationLine.length > 120) {
    const subLineIndex = Math.floor(columnNum / 80);
    const subLineColumnNum = columnNum % 80;
    const subLines = [];
    for (let i = 0; i < locationLine.length; i += 80) {
      subLines.push(locationLine.slice(i, i + 80));
    }
    return locationStr + printPrefixedLines([
      [`${lineNum} |`, subLines[0]],
      ...subLines.slice(1, subLineIndex + 1).map((subLine) => ["|", subLine]),
      ["|", "^".padStart(subLineColumnNum)],
      ["|", subLines[subLineIndex + 1]]
    ]);
  }
  return locationStr + printPrefixedLines([
    // Lines specified like this: ["prefix", "string"],
    [`${lineNum - 1} |`, lines[lineIndex - 1]],
    [`${lineNum} |`, locationLine],
    ["|", "^".padStart(columnNum)],
    [`${lineNum + 1} |`, lines[lineIndex + 1]]
  ]);
}
function printPrefixedLines(lines) {
  const existingLines = lines.filter(([_, line]) => line !== void 0);
  const padLen = Math.max(...existingLines.map(([prefix]) => prefix.length));
  return existingLines.map(([prefix, line]) => prefix.padStart(padLen) + (line ? " " + line : "")).join("\n");
}
var init_printLocation = __esm({
  "../node_modules/graphql/language/printLocation.mjs"() {
    init_location();
  }
});

// ../node_modules/graphql/error/GraphQLError.mjs
function toNormalizedOptions(args) {
  const firstArg = args[0];
  if (firstArg == null || "kind" in firstArg || "length" in firstArg) {
    return {
      nodes: firstArg,
      source: args[1],
      positions: args[2],
      path: args[3],
      originalError: args[4],
      extensions: args[5]
    };
  }
  return firstArg;
}
function undefinedIfEmpty(array) {
  return array === void 0 || array.length === 0 ? void 0 : array;
}
function printError(error) {
  return error.toString();
}
function formatError(error) {
  return error.toJSON();
}
var GraphQLError;
var init_GraphQLError = __esm({
  "../node_modules/graphql/error/GraphQLError.mjs"() {
    init_isObjectLike();
    init_location();
    init_printLocation();
    GraphQLError = class _GraphQLError extends Error {
      /**
       * An array of `{ line, column }` locations within the source GraphQL document
       * which correspond to this error.
       *
       * Errors during validation often contain multiple locations, for example to
       * point out two things with the same name. Errors during execution include a
       * single location, the field which produced the error.
       *
       * Enumerable, and appears in the result of JSON.stringify().
       */
      /**
       * An array describing the JSON-path into the execution response which
       * corresponds to this error. Only included for errors during execution.
       *
       * Enumerable, and appears in the result of JSON.stringify().
       */
      /**
       * An array of GraphQL AST Nodes corresponding to this error.
       */
      /**
       * The source GraphQL document for the first location of this error.
       *
       * Note that if this Error represents more than one node, the source may not
       * represent nodes after the first node.
       */
      /**
       * An array of character offsets within the source GraphQL document
       * which correspond to this error.
       */
      /**
       * The original error thrown from a field resolver during execution.
       */
      /**
       * Extension fields to add to the formatted error.
       */
      /**
       * @deprecated Please use the `GraphQLErrorOptions` constructor overload instead.
       */
      constructor(message, ...rawArgs) {
        var _this$nodes, _nodeLocations$, _ref;
        const { nodes, source, positions, path, originalError, extensions } = toNormalizedOptions(rawArgs);
        super(message);
        this.name = "GraphQLError";
        this.path = path !== null && path !== void 0 ? path : void 0;
        this.originalError = originalError !== null && originalError !== void 0 ? originalError : void 0;
        this.nodes = undefinedIfEmpty(
          Array.isArray(nodes) ? nodes : nodes ? [nodes] : void 0
        );
        const nodeLocations = undefinedIfEmpty(
          (_this$nodes = this.nodes) === null || _this$nodes === void 0 ? void 0 : _this$nodes.map((node) => node.loc).filter((loc) => loc != null)
        );
        this.source = source !== null && source !== void 0 ? source : nodeLocations === null || nodeLocations === void 0 ? void 0 : (_nodeLocations$ = nodeLocations[0]) === null || _nodeLocations$ === void 0 ? void 0 : _nodeLocations$.source;
        this.positions = positions !== null && positions !== void 0 ? positions : nodeLocations === null || nodeLocations === void 0 ? void 0 : nodeLocations.map((loc) => loc.start);
        this.locations = positions && source ? positions.map((pos) => getLocation(source, pos)) : nodeLocations === null || nodeLocations === void 0 ? void 0 : nodeLocations.map((loc) => getLocation(loc.source, loc.start));
        const originalExtensions = isObjectLike(
          originalError === null || originalError === void 0 ? void 0 : originalError.extensions
        ) ? originalError === null || originalError === void 0 ? void 0 : originalError.extensions : void 0;
        this.extensions = (_ref = extensions !== null && extensions !== void 0 ? extensions : originalExtensions) !== null && _ref !== void 0 ? _ref : /* @__PURE__ */ Object.create(null);
        Object.defineProperties(this, {
          message: {
            writable: true,
            enumerable: true
          },
          name: {
            enumerable: false
          },
          nodes: {
            enumerable: false
          },
          source: {
            enumerable: false
          },
          positions: {
            enumerable: false
          },
          originalError: {
            enumerable: false
          }
        });
        if (originalError !== null && originalError !== void 0 && originalError.stack) {
          Object.defineProperty(this, "stack", {
            value: originalError.stack,
            writable: true,
            configurable: true
          });
        } else if (Error.captureStackTrace) {
          Error.captureStackTrace(this, _GraphQLError);
        } else {
          Object.defineProperty(this, "stack", {
            value: Error().stack,
            writable: true,
            configurable: true
          });
        }
      }
      get [Symbol.toStringTag]() {
        return "GraphQLError";
      }
      toString() {
        let output = this.message;
        if (this.nodes) {
          for (const node of this.nodes) {
            if (node.loc) {
              output += "\n\n" + printLocation(node.loc);
            }
          }
        } else if (this.source && this.locations) {
          for (const location of this.locations) {
            output += "\n\n" + printSourceLocation(this.source, location);
          }
        }
        return output;
      }
      toJSON() {
        const formattedError = {
          message: this.message
        };
        if (this.locations != null) {
          formattedError.locations = this.locations;
        }
        if (this.path != null) {
          formattedError.path = this.path;
        }
        if (this.extensions != null && Object.keys(this.extensions).length > 0) {
          formattedError.extensions = this.extensions;
        }
        return formattedError;
      }
    };
  }
});

// ../node_modules/graphql/error/syntaxError.mjs
function syntaxError(source, position, description) {
  return new GraphQLError(`Syntax Error: ${description}`, {
    source,
    positions: [position]
  });
}
var init_syntaxError = __esm({
  "../node_modules/graphql/error/syntaxError.mjs"() {
    init_GraphQLError();
  }
});

// ../node_modules/graphql/language/ast.mjs
function isNode(maybeNode) {
  const maybeKind = maybeNode === null || maybeNode === void 0 ? void 0 : maybeNode.kind;
  return typeof maybeKind === "string" && kindValues.has(maybeKind);
}
var Location, Token, QueryDocumentKeys, kindValues, OperationTypeNode;
var init_ast = __esm({
  "../node_modules/graphql/language/ast.mjs"() {
    Location = class {
      /**
       * The character offset at which this Node begins.
       */
      /**
       * The character offset at which this Node ends.
       */
      /**
       * The Token at which this Node begins.
       */
      /**
       * The Token at which this Node ends.
       */
      /**
       * The Source document the AST represents.
       */
      constructor(startToken, endToken, source) {
        this.start = startToken.start;
        this.end = endToken.end;
        this.startToken = startToken;
        this.endToken = endToken;
        this.source = source;
      }
      get [Symbol.toStringTag]() {
        return "Location";
      }
      toJSON() {
        return {
          start: this.start,
          end: this.end
        };
      }
    };
    Token = class {
      /**
       * The kind of Token.
       */
      /**
       * The character offset at which this Node begins.
       */
      /**
       * The character offset at which this Node ends.
       */
      /**
       * The 1-indexed line number on which this Token appears.
       */
      /**
       * The 1-indexed column number at which this Token begins.
       */
      /**
       * For non-punctuation tokens, represents the interpreted value of the token.
       *
       * Note: is undefined for punctuation tokens, but typed as string for
       * convenience in the parser.
       */
      /**
       * Tokens exist as nodes in a double-linked-list amongst all tokens
       * including ignored tokens. <SOF> is always the first node and <EOF>
       * the last.
       */
      constructor(kind, start, end, line, column, value) {
        this.kind = kind;
        this.start = start;
        this.end = end;
        this.line = line;
        this.column = column;
        this.value = value;
        this.prev = null;
        this.next = null;
      }
      get [Symbol.toStringTag]() {
        return "Token";
      }
      toJSON() {
        return {
          kind: this.kind,
          value: this.value,
          line: this.line,
          column: this.column
        };
      }
    };
    QueryDocumentKeys = {
      Name: [],
      Document: ["definitions"],
      OperationDefinition: [
        "name",
        "variableDefinitions",
        "directives",
        "selectionSet"
      ],
      VariableDefinition: ["variable", "type", "defaultValue", "directives"],
      Variable: ["name"],
      SelectionSet: ["selections"],
      Field: ["alias", "name", "arguments", "directives", "selectionSet"],
      Argument: ["name", "value"],
      FragmentSpread: ["name", "directives"],
      InlineFragment: ["typeCondition", "directives", "selectionSet"],
      FragmentDefinition: [
        "name",
        // Note: fragment variable definitions are deprecated and will removed in v17.0.0
        "variableDefinitions",
        "typeCondition",
        "directives",
        "selectionSet"
      ],
      IntValue: [],
      FloatValue: [],
      StringValue: [],
      BooleanValue: [],
      NullValue: [],
      EnumValue: [],
      ListValue: ["values"],
      ObjectValue: ["fields"],
      ObjectField: ["name", "value"],
      Directive: ["name", "arguments"],
      NamedType: ["name"],
      ListType: ["type"],
      NonNullType: ["type"],
      SchemaDefinition: ["description", "directives", "operationTypes"],
      OperationTypeDefinition: ["type"],
      ScalarTypeDefinition: ["description", "name", "directives"],
      ObjectTypeDefinition: [
        "description",
        "name",
        "interfaces",
        "directives",
        "fields"
      ],
      FieldDefinition: ["description", "name", "arguments", "type", "directives"],
      InputValueDefinition: [
        "description",
        "name",
        "type",
        "defaultValue",
        "directives"
      ],
      InterfaceTypeDefinition: [
        "description",
        "name",
        "interfaces",
        "directives",
        "fields"
      ],
      UnionTypeDefinition: ["description", "name", "directives", "types"],
      EnumTypeDefinition: ["description", "name", "directives", "values"],
      EnumValueDefinition: ["description", "name", "directives"],
      InputObjectTypeDefinition: ["description", "name", "directives", "fields"],
      DirectiveDefinition: ["description", "name", "arguments", "locations"],
      SchemaExtension: ["directives", "operationTypes"],
      ScalarTypeExtension: ["name", "directives"],
      ObjectTypeExtension: ["name", "interfaces", "directives", "fields"],
      InterfaceTypeExtension: ["name", "interfaces", "directives", "fields"],
      UnionTypeExtension: ["name", "directives", "types"],
      EnumTypeExtension: ["name", "directives", "values"],
      InputObjectTypeExtension: ["name", "directives", "fields"]
    };
    kindValues = new Set(Object.keys(QueryDocumentKeys));
    (function(OperationTypeNode2) {
      OperationTypeNode2["QUERY"] = "query";
      OperationTypeNode2["MUTATION"] = "mutation";
      OperationTypeNode2["SUBSCRIPTION"] = "subscription";
    })(OperationTypeNode || (OperationTypeNode = {}));
  }
});

// ../node_modules/graphql/language/directiveLocation.mjs
var DirectiveLocation;
var init_directiveLocation = __esm({
  "../node_modules/graphql/language/directiveLocation.mjs"() {
    (function(DirectiveLocation2) {
      DirectiveLocation2["QUERY"] = "QUERY";
      DirectiveLocation2["MUTATION"] = "MUTATION";
      DirectiveLocation2["SUBSCRIPTION"] = "SUBSCRIPTION";
      DirectiveLocation2["FIELD"] = "FIELD";
      DirectiveLocation2["FRAGMENT_DEFINITION"] = "FRAGMENT_DEFINITION";
      DirectiveLocation2["FRAGMENT_SPREAD"] = "FRAGMENT_SPREAD";
      DirectiveLocation2["INLINE_FRAGMENT"] = "INLINE_FRAGMENT";
      DirectiveLocation2["VARIABLE_DEFINITION"] = "VARIABLE_DEFINITION";
      DirectiveLocation2["SCHEMA"] = "SCHEMA";
      DirectiveLocation2["SCALAR"] = "SCALAR";
      DirectiveLocation2["OBJECT"] = "OBJECT";
      DirectiveLocation2["FIELD_DEFINITION"] = "FIELD_DEFINITION";
      DirectiveLocation2["ARGUMENT_DEFINITION"] = "ARGUMENT_DEFINITION";
      DirectiveLocation2["INTERFACE"] = "INTERFACE";
      DirectiveLocation2["UNION"] = "UNION";
      DirectiveLocation2["ENUM"] = "ENUM";
      DirectiveLocation2["ENUM_VALUE"] = "ENUM_VALUE";
      DirectiveLocation2["INPUT_OBJECT"] = "INPUT_OBJECT";
      DirectiveLocation2["INPUT_FIELD_DEFINITION"] = "INPUT_FIELD_DEFINITION";
    })(DirectiveLocation || (DirectiveLocation = {}));
  }
});

// ../node_modules/graphql/language/kinds.mjs
var Kind;
var init_kinds = __esm({
  "../node_modules/graphql/language/kinds.mjs"() {
    (function(Kind2) {
      Kind2["NAME"] = "Name";
      Kind2["DOCUMENT"] = "Document";
      Kind2["OPERATION_DEFINITION"] = "OperationDefinition";
      Kind2["VARIABLE_DEFINITION"] = "VariableDefinition";
      Kind2["SELECTION_SET"] = "SelectionSet";
      Kind2["FIELD"] = "Field";
      Kind2["ARGUMENT"] = "Argument";
      Kind2["FRAGMENT_SPREAD"] = "FragmentSpread";
      Kind2["INLINE_FRAGMENT"] = "InlineFragment";
      Kind2["FRAGMENT_DEFINITION"] = "FragmentDefinition";
      Kind2["VARIABLE"] = "Variable";
      Kind2["INT"] = "IntValue";
      Kind2["FLOAT"] = "FloatValue";
      Kind2["STRING"] = "StringValue";
      Kind2["BOOLEAN"] = "BooleanValue";
      Kind2["NULL"] = "NullValue";
      Kind2["ENUM"] = "EnumValue";
      Kind2["LIST"] = "ListValue";
      Kind2["OBJECT"] = "ObjectValue";
      Kind2["OBJECT_FIELD"] = "ObjectField";
      Kind2["DIRECTIVE"] = "Directive";
      Kind2["NAMED_TYPE"] = "NamedType";
      Kind2["LIST_TYPE"] = "ListType";
      Kind2["NON_NULL_TYPE"] = "NonNullType";
      Kind2["SCHEMA_DEFINITION"] = "SchemaDefinition";
      Kind2["OPERATION_TYPE_DEFINITION"] = "OperationTypeDefinition";
      Kind2["SCALAR_TYPE_DEFINITION"] = "ScalarTypeDefinition";
      Kind2["OBJECT_TYPE_DEFINITION"] = "ObjectTypeDefinition";
      Kind2["FIELD_DEFINITION"] = "FieldDefinition";
      Kind2["INPUT_VALUE_DEFINITION"] = "InputValueDefinition";
      Kind2["INTERFACE_TYPE_DEFINITION"] = "InterfaceTypeDefinition";
      Kind2["UNION_TYPE_DEFINITION"] = "UnionTypeDefinition";
      Kind2["ENUM_TYPE_DEFINITION"] = "EnumTypeDefinition";
      Kind2["ENUM_VALUE_DEFINITION"] = "EnumValueDefinition";
      Kind2["INPUT_OBJECT_TYPE_DEFINITION"] = "InputObjectTypeDefinition";
      Kind2["DIRECTIVE_DEFINITION"] = "DirectiveDefinition";
      Kind2["SCHEMA_EXTENSION"] = "SchemaExtension";
      Kind2["SCALAR_TYPE_EXTENSION"] = "ScalarTypeExtension";
      Kind2["OBJECT_TYPE_EXTENSION"] = "ObjectTypeExtension";
      Kind2["INTERFACE_TYPE_EXTENSION"] = "InterfaceTypeExtension";
      Kind2["UNION_TYPE_EXTENSION"] = "UnionTypeExtension";
      Kind2["ENUM_TYPE_EXTENSION"] = "EnumTypeExtension";
      Kind2["INPUT_OBJECT_TYPE_EXTENSION"] = "InputObjectTypeExtension";
    })(Kind || (Kind = {}));
  }
});

// ../node_modules/graphql/language/characterClasses.mjs
function isWhiteSpace(code) {
  return code === 9 || code === 32;
}
function isDigit(code) {
  return code >= 48 && code <= 57;
}
function isLetter(code) {
  return code >= 97 && code <= 122 || // A-Z
  code >= 65 && code <= 90;
}
function isNameStart(code) {
  return isLetter(code) || code === 95;
}
function isNameContinue(code) {
  return isLetter(code) || isDigit(code) || code === 95;
}
var init_characterClasses = __esm({
  "../node_modules/graphql/language/characterClasses.mjs"() {
  }
});

// ../node_modules/graphql/language/blockString.mjs
function dedentBlockStringLines(lines) {
  var _firstNonEmptyLine2;
  let commonIndent = Number.MAX_SAFE_INTEGER;
  let firstNonEmptyLine = null;
  let lastNonEmptyLine = -1;
  for (let i = 0; i < lines.length; ++i) {
    var _firstNonEmptyLine;
    const line = lines[i];
    const indent2 = leadingWhitespace(line);
    if (indent2 === line.length) {
      continue;
    }
    firstNonEmptyLine = (_firstNonEmptyLine = firstNonEmptyLine) !== null && _firstNonEmptyLine !== void 0 ? _firstNonEmptyLine : i;
    lastNonEmptyLine = i;
    if (i !== 0 && indent2 < commonIndent) {
      commonIndent = indent2;
    }
  }
  return lines.map((line, i) => i === 0 ? line : line.slice(commonIndent)).slice(
    (_firstNonEmptyLine2 = firstNonEmptyLine) !== null && _firstNonEmptyLine2 !== void 0 ? _firstNonEmptyLine2 : 0,
    lastNonEmptyLine + 1
  );
}
function leadingWhitespace(str) {
  let i = 0;
  while (i < str.length && isWhiteSpace(str.charCodeAt(i))) {
    ++i;
  }
  return i;
}
function isPrintableAsBlockString(value) {
  if (value === "") {
    return true;
  }
  let isEmptyLine = true;
  let hasIndent = false;
  let hasCommonIndent = true;
  let seenNonEmptyLine = false;
  for (let i = 0; i < value.length; ++i) {
    switch (value.codePointAt(i)) {
      case 0:
      case 1:
      case 2:
      case 3:
      case 4:
      case 5:
      case 6:
      case 7:
      case 8:
      case 11:
      case 12:
      case 14:
      case 15:
        return false;
      // Has non-printable characters
      case 13:
        return false;
      // Has \r or \r\n which will be replaced as \n
      case 10:
        if (isEmptyLine && !seenNonEmptyLine) {
          return false;
        }
        seenNonEmptyLine = true;
        isEmptyLine = true;
        hasIndent = false;
        break;
      case 9:
      //   \t
      case 32:
        hasIndent || (hasIndent = isEmptyLine);
        break;
      default:
        hasCommonIndent && (hasCommonIndent = hasIndent);
        isEmptyLine = false;
    }
  }
  if (isEmptyLine) {
    return false;
  }
  if (hasCommonIndent && seenNonEmptyLine) {
    return false;
  }
  return true;
}
function printBlockString(value, options) {
  const escapedValue = value.replace(/"""/g, '\\"""');
  const lines = escapedValue.split(/\r\n|[\n\r]/g);
  const isSingleLine = lines.length === 1;
  const forceLeadingNewLine = lines.length > 1 && lines.slice(1).every((line) => line.length === 0 || isWhiteSpace(line.charCodeAt(0)));
  const hasTrailingTripleQuotes = escapedValue.endsWith('\\"""');
  const hasTrailingQuote = value.endsWith('"') && !hasTrailingTripleQuotes;
  const hasTrailingSlash = value.endsWith("\\");
  const forceTrailingNewline = hasTrailingQuote || hasTrailingSlash;
  const printAsMultipleLines = !(options !== null && options !== void 0 && options.minimize) && // add leading and trailing new lines only if it improves readability
  (!isSingleLine || value.length > 70 || forceTrailingNewline || forceLeadingNewLine || hasTrailingTripleQuotes);
  let result2 = "";
  const skipLeadingNewLine = isSingleLine && isWhiteSpace(value.charCodeAt(0));
  if (printAsMultipleLines && !skipLeadingNewLine || forceLeadingNewLine) {
    result2 += "\n";
  }
  result2 += escapedValue;
  if (printAsMultipleLines || forceTrailingNewline) {
    result2 += "\n";
  }
  return '"""' + result2 + '"""';
}
var init_blockString = __esm({
  "../node_modules/graphql/language/blockString.mjs"() {
    init_characterClasses();
  }
});

// ../node_modules/graphql/language/tokenKind.mjs
var TokenKind;
var init_tokenKind = __esm({
  "../node_modules/graphql/language/tokenKind.mjs"() {
    (function(TokenKind2) {
      TokenKind2["SOF"] = "<SOF>";
      TokenKind2["EOF"] = "<EOF>";
      TokenKind2["BANG"] = "!";
      TokenKind2["DOLLAR"] = "$";
      TokenKind2["AMP"] = "&";
      TokenKind2["PAREN_L"] = "(";
      TokenKind2["PAREN_R"] = ")";
      TokenKind2["SPREAD"] = "...";
      TokenKind2["COLON"] = ":";
      TokenKind2["EQUALS"] = "=";
      TokenKind2["AT"] = "@";
      TokenKind2["BRACKET_L"] = "[";
      TokenKind2["BRACKET_R"] = "]";
      TokenKind2["BRACE_L"] = "{";
      TokenKind2["PIPE"] = "|";
      TokenKind2["BRACE_R"] = "}";
      TokenKind2["NAME"] = "Name";
      TokenKind2["INT"] = "Int";
      TokenKind2["FLOAT"] = "Float";
      TokenKind2["STRING"] = "String";
      TokenKind2["BLOCK_STRING"] = "BlockString";
      TokenKind2["COMMENT"] = "Comment";
    })(TokenKind || (TokenKind = {}));
  }
});

// ../node_modules/graphql/language/lexer.mjs
function isPunctuatorTokenKind(kind) {
  return kind === TokenKind.BANG || kind === TokenKind.DOLLAR || kind === TokenKind.AMP || kind === TokenKind.PAREN_L || kind === TokenKind.PAREN_R || kind === TokenKind.SPREAD || kind === TokenKind.COLON || kind === TokenKind.EQUALS || kind === TokenKind.AT || kind === TokenKind.BRACKET_L || kind === TokenKind.BRACKET_R || kind === TokenKind.BRACE_L || kind === TokenKind.PIPE || kind === TokenKind.BRACE_R;
}
function isUnicodeScalarValue(code) {
  return code >= 0 && code <= 55295 || code >= 57344 && code <= 1114111;
}
function isSupplementaryCodePoint(body, location) {
  return isLeadingSurrogate(body.charCodeAt(location)) && isTrailingSurrogate(body.charCodeAt(location + 1));
}
function isLeadingSurrogate(code) {
  return code >= 55296 && code <= 56319;
}
function isTrailingSurrogate(code) {
  return code >= 56320 && code <= 57343;
}
function printCodePointAt(lexer, location) {
  const code = lexer.source.body.codePointAt(location);
  if (code === void 0) {
    return TokenKind.EOF;
  } else if (code >= 32 && code <= 126) {
    const char = String.fromCodePoint(code);
    return char === '"' ? `'"'` : `"${char}"`;
  }
  return "U+" + code.toString(16).toUpperCase().padStart(4, "0");
}
function createToken(lexer, kind, start, end, value) {
  const line = lexer.line;
  const col = 1 + start - lexer.lineStart;
  return new Token(kind, start, end, line, col, value);
}
function readNextToken(lexer, start) {
  const body = lexer.source.body;
  const bodyLength = body.length;
  let position = start;
  while (position < bodyLength) {
    const code = body.charCodeAt(position);
    switch (code) {
      // Ignored ::
      //   - UnicodeBOM
      //   - WhiteSpace
      //   - LineTerminator
      //   - Comment
      //   - Comma
      //
      // UnicodeBOM :: "Byte Order Mark (U+FEFF)"
      //
      // WhiteSpace ::
      //   - "Horizontal Tab (U+0009)"
      //   - "Space (U+0020)"
      //
      // Comma :: ,
      case 65279:
      // <BOM>
      case 9:
      // \t
      case 32:
      // <space>
      case 44:
        ++position;
        continue;
      // LineTerminator ::
      //   - "New Line (U+000A)"
      //   - "Carriage Return (U+000D)" [lookahead != "New Line (U+000A)"]
      //   - "Carriage Return (U+000D)" "New Line (U+000A)"
      case 10:
        ++position;
        ++lexer.line;
        lexer.lineStart = position;
        continue;
      case 13:
        if (body.charCodeAt(position + 1) === 10) {
          position += 2;
        } else {
          ++position;
        }
        ++lexer.line;
        lexer.lineStart = position;
        continue;
      // Comment
      case 35:
        return readComment(lexer, position);
      // Token ::
      //   - Punctuator
      //   - Name
      //   - IntValue
      //   - FloatValue
      //   - StringValue
      //
      // Punctuator :: one of ! $ & ( ) ... : = @ [ ] { | }
      case 33:
        return createToken(lexer, TokenKind.BANG, position, position + 1);
      case 36:
        return createToken(lexer, TokenKind.DOLLAR, position, position + 1);
      case 38:
        return createToken(lexer, TokenKind.AMP, position, position + 1);
      case 40:
        return createToken(lexer, TokenKind.PAREN_L, position, position + 1);
      case 41:
        return createToken(lexer, TokenKind.PAREN_R, position, position + 1);
      case 46:
        if (body.charCodeAt(position + 1) === 46 && body.charCodeAt(position + 2) === 46) {
          return createToken(lexer, TokenKind.SPREAD, position, position + 3);
        }
        break;
      case 58:
        return createToken(lexer, TokenKind.COLON, position, position + 1);
      case 61:
        return createToken(lexer, TokenKind.EQUALS, position, position + 1);
      case 64:
        return createToken(lexer, TokenKind.AT, position, position + 1);
      case 91:
        return createToken(lexer, TokenKind.BRACKET_L, position, position + 1);
      case 93:
        return createToken(lexer, TokenKind.BRACKET_R, position, position + 1);
      case 123:
        return createToken(lexer, TokenKind.BRACE_L, position, position + 1);
      case 124:
        return createToken(lexer, TokenKind.PIPE, position, position + 1);
      case 125:
        return createToken(lexer, TokenKind.BRACE_R, position, position + 1);
      // StringValue
      case 34:
        if (body.charCodeAt(position + 1) === 34 && body.charCodeAt(position + 2) === 34) {
          return readBlockString(lexer, position);
        }
        return readString(lexer, position);
    }
    if (isDigit(code) || code === 45) {
      return readNumber(lexer, position, code);
    }
    if (isNameStart(code)) {
      return readName(lexer, position);
    }
    throw syntaxError(
      lexer.source,
      position,
      code === 39 ? `Unexpected single quote character ('), did you mean to use a double quote (")?` : isUnicodeScalarValue(code) || isSupplementaryCodePoint(body, position) ? `Unexpected character: ${printCodePointAt(lexer, position)}.` : `Invalid character: ${printCodePointAt(lexer, position)}.`
    );
  }
  return createToken(lexer, TokenKind.EOF, bodyLength, bodyLength);
}
function readComment(lexer, start) {
  const body = lexer.source.body;
  const bodyLength = body.length;
  let position = start + 1;
  while (position < bodyLength) {
    const code = body.charCodeAt(position);
    if (code === 10 || code === 13) {
      break;
    }
    if (isUnicodeScalarValue(code)) {
      ++position;
    } else if (isSupplementaryCodePoint(body, position)) {
      position += 2;
    } else {
      break;
    }
  }
  return createToken(
    lexer,
    TokenKind.COMMENT,
    start,
    position,
    body.slice(start + 1, position)
  );
}
function readNumber(lexer, start, firstCode) {
  const body = lexer.source.body;
  let position = start;
  let code = firstCode;
  let isFloat = false;
  if (code === 45) {
    code = body.charCodeAt(++position);
  }
  if (code === 48) {
    code = body.charCodeAt(++position);
    if (isDigit(code)) {
      throw syntaxError(
        lexer.source,
        position,
        `Invalid number, unexpected digit after 0: ${printCodePointAt(
          lexer,
          position
        )}.`
      );
    }
  } else {
    position = readDigits(lexer, position, code);
    code = body.charCodeAt(position);
  }
  if (code === 46) {
    isFloat = true;
    code = body.charCodeAt(++position);
    position = readDigits(lexer, position, code);
    code = body.charCodeAt(position);
  }
  if (code === 69 || code === 101) {
    isFloat = true;
    code = body.charCodeAt(++position);
    if (code === 43 || code === 45) {
      code = body.charCodeAt(++position);
    }
    position = readDigits(lexer, position, code);
    code = body.charCodeAt(position);
  }
  if (code === 46 || isNameStart(code)) {
    throw syntaxError(
      lexer.source,
      position,
      `Invalid number, expected digit but got: ${printCodePointAt(
        lexer,
        position
      )}.`
    );
  }
  return createToken(
    lexer,
    isFloat ? TokenKind.FLOAT : TokenKind.INT,
    start,
    position,
    body.slice(start, position)
  );
}
function readDigits(lexer, start, firstCode) {
  if (!isDigit(firstCode)) {
    throw syntaxError(
      lexer.source,
      start,
      `Invalid number, expected digit but got: ${printCodePointAt(
        lexer,
        start
      )}.`
    );
  }
  const body = lexer.source.body;
  let position = start + 1;
  while (isDigit(body.charCodeAt(position))) {
    ++position;
  }
  return position;
}
function readString(lexer, start) {
  const body = lexer.source.body;
  const bodyLength = body.length;
  let position = start + 1;
  let chunkStart = position;
  let value = "";
  while (position < bodyLength) {
    const code = body.charCodeAt(position);
    if (code === 34) {
      value += body.slice(chunkStart, position);
      return createToken(lexer, TokenKind.STRING, start, position + 1, value);
    }
    if (code === 92) {
      value += body.slice(chunkStart, position);
      const escape = body.charCodeAt(position + 1) === 117 ? body.charCodeAt(position + 2) === 123 ? readEscapedUnicodeVariableWidth(lexer, position) : readEscapedUnicodeFixedWidth(lexer, position) : readEscapedCharacter(lexer, position);
      value += escape.value;
      position += escape.size;
      chunkStart = position;
      continue;
    }
    if (code === 10 || code === 13) {
      break;
    }
    if (isUnicodeScalarValue(code)) {
      ++position;
    } else if (isSupplementaryCodePoint(body, position)) {
      position += 2;
    } else {
      throw syntaxError(
        lexer.source,
        position,
        `Invalid character within String: ${printCodePointAt(
          lexer,
          position
        )}.`
      );
    }
  }
  throw syntaxError(lexer.source, position, "Unterminated string.");
}
function readEscapedUnicodeVariableWidth(lexer, position) {
  const body = lexer.source.body;
  let point = 0;
  let size = 3;
  while (size < 12) {
    const code = body.charCodeAt(position + size++);
    if (code === 125) {
      if (size < 5 || !isUnicodeScalarValue(point)) {
        break;
      }
      return {
        value: String.fromCodePoint(point),
        size
      };
    }
    point = point << 4 | readHexDigit(code);
    if (point < 0) {
      break;
    }
  }
  throw syntaxError(
    lexer.source,
    position,
    `Invalid Unicode escape sequence: "${body.slice(
      position,
      position + size
    )}".`
  );
}
function readEscapedUnicodeFixedWidth(lexer, position) {
  const body = lexer.source.body;
  const code = read16BitHexCode(body, position + 2);
  if (isUnicodeScalarValue(code)) {
    return {
      value: String.fromCodePoint(code),
      size: 6
    };
  }
  if (isLeadingSurrogate(code)) {
    if (body.charCodeAt(position + 6) === 92 && body.charCodeAt(position + 7) === 117) {
      const trailingCode = read16BitHexCode(body, position + 8);
      if (isTrailingSurrogate(trailingCode)) {
        return {
          value: String.fromCodePoint(code, trailingCode),
          size: 12
        };
      }
    }
  }
  throw syntaxError(
    lexer.source,
    position,
    `Invalid Unicode escape sequence: "${body.slice(position, position + 6)}".`
  );
}
function read16BitHexCode(body, position) {
  return readHexDigit(body.charCodeAt(position)) << 12 | readHexDigit(body.charCodeAt(position + 1)) << 8 | readHexDigit(body.charCodeAt(position + 2)) << 4 | readHexDigit(body.charCodeAt(position + 3));
}
function readHexDigit(code) {
  return code >= 48 && code <= 57 ? code - 48 : code >= 65 && code <= 70 ? code - 55 : code >= 97 && code <= 102 ? code - 87 : -1;
}
function readEscapedCharacter(lexer, position) {
  const body = lexer.source.body;
  const code = body.charCodeAt(position + 1);
  switch (code) {
    case 34:
      return {
        value: '"',
        size: 2
      };
    case 92:
      return {
        value: "\\",
        size: 2
      };
    case 47:
      return {
        value: "/",
        size: 2
      };
    case 98:
      return {
        value: "\b",
        size: 2
      };
    case 102:
      return {
        value: "\f",
        size: 2
      };
    case 110:
      return {
        value: "\n",
        size: 2
      };
    case 114:
      return {
        value: "\r",
        size: 2
      };
    case 116:
      return {
        value: "	",
        size: 2
      };
  }
  throw syntaxError(
    lexer.source,
    position,
    `Invalid character escape sequence: "${body.slice(
      position,
      position + 2
    )}".`
  );
}
function readBlockString(lexer, start) {
  const body = lexer.source.body;
  const bodyLength = body.length;
  let lineStart = lexer.lineStart;
  let position = start + 3;
  let chunkStart = position;
  let currentLine = "";
  const blockLines = [];
  while (position < bodyLength) {
    const code = body.charCodeAt(position);
    if (code === 34 && body.charCodeAt(position + 1) === 34 && body.charCodeAt(position + 2) === 34) {
      currentLine += body.slice(chunkStart, position);
      blockLines.push(currentLine);
      const token = createToken(
        lexer,
        TokenKind.BLOCK_STRING,
        start,
        position + 3,
        // Return a string of the lines joined with U+000A.
        dedentBlockStringLines(blockLines).join("\n")
      );
      lexer.line += blockLines.length - 1;
      lexer.lineStart = lineStart;
      return token;
    }
    if (code === 92 && body.charCodeAt(position + 1) === 34 && body.charCodeAt(position + 2) === 34 && body.charCodeAt(position + 3) === 34) {
      currentLine += body.slice(chunkStart, position);
      chunkStart = position + 1;
      position += 4;
      continue;
    }
    if (code === 10 || code === 13) {
      currentLine += body.slice(chunkStart, position);
      blockLines.push(currentLine);
      if (code === 13 && body.charCodeAt(position + 1) === 10) {
        position += 2;
      } else {
        ++position;
      }
      currentLine = "";
      chunkStart = position;
      lineStart = position;
      continue;
    }
    if (isUnicodeScalarValue(code)) {
      ++position;
    } else if (isSupplementaryCodePoint(body, position)) {
      position += 2;
    } else {
      throw syntaxError(
        lexer.source,
        position,
        `Invalid character within String: ${printCodePointAt(
          lexer,
          position
        )}.`
      );
    }
  }
  throw syntaxError(lexer.source, position, "Unterminated string.");
}
function readName(lexer, start) {
  const body = lexer.source.body;
  const bodyLength = body.length;
  let position = start + 1;
  while (position < bodyLength) {
    const code = body.charCodeAt(position);
    if (isNameContinue(code)) {
      ++position;
    } else {
      break;
    }
  }
  return createToken(
    lexer,
    TokenKind.NAME,
    start,
    position,
    body.slice(start, position)
  );
}
var Lexer;
var init_lexer = __esm({
  "../node_modules/graphql/language/lexer.mjs"() {
    init_syntaxError();
    init_ast();
    init_blockString();
    init_characterClasses();
    init_tokenKind();
    Lexer = class {
      /**
       * The previously focused non-ignored token.
       */
      /**
       * The currently focused non-ignored token.
       */
      /**
       * The (1-indexed) line containing the current token.
       */
      /**
       * The character offset at which the current line begins.
       */
      constructor(source) {
        const startOfFileToken = new Token(TokenKind.SOF, 0, 0, 0, 0);
        this.source = source;
        this.lastToken = startOfFileToken;
        this.token = startOfFileToken;
        this.line = 1;
        this.lineStart = 0;
      }
      get [Symbol.toStringTag]() {
        return "Lexer";
      }
      /**
       * Advances the token stream to the next non-ignored token.
       */
      advance() {
        this.lastToken = this.token;
        const token = this.token = this.lookahead();
        return token;
      }
      /**
       * Looks ahead and returns the next non-ignored token, but does not change
       * the state of Lexer.
       */
      lookahead() {
        let token = this.token;
        if (token.kind !== TokenKind.EOF) {
          do {
            if (token.next) {
              token = token.next;
            } else {
              const nextToken = readNextToken(this, token.end);
              token.next = nextToken;
              nextToken.prev = token;
              token = nextToken;
            }
          } while (token.kind === TokenKind.COMMENT);
        }
        return token;
      }
    };
  }
});

// ../node_modules/graphql/jsutils/inspect.mjs
function inspect(value) {
  return formatValue(value, []);
}
function formatValue(value, seenValues) {
  switch (typeof value) {
    case "string":
      return JSON.stringify(value);
    case "function":
      return value.name ? `[function ${value.name}]` : "[function]";
    case "object":
      return formatObjectValue(value, seenValues);
    default:
      return String(value);
  }
}
function formatObjectValue(value, previouslySeenValues) {
  if (value === null) {
    return "null";
  }
  if (previouslySeenValues.includes(value)) {
    return "[Circular]";
  }
  const seenValues = [...previouslySeenValues, value];
  if (isJSONable(value)) {
    const jsonValue = value.toJSON();
    if (jsonValue !== value) {
      return typeof jsonValue === "string" ? jsonValue : formatValue(jsonValue, seenValues);
    }
  } else if (Array.isArray(value)) {
    return formatArray(value, seenValues);
  }
  return formatObject(value, seenValues);
}
function isJSONable(value) {
  return typeof value.toJSON === "function";
}
function formatObject(object, seenValues) {
  const entries = Object.entries(object);
  if (entries.length === 0) {
    return "{}";
  }
  if (seenValues.length > MAX_RECURSIVE_DEPTH) {
    return "[" + getObjectTag(object) + "]";
  }
  const properties = entries.map(
    ([key, value]) => key + ": " + formatValue(value, seenValues)
  );
  return "{ " + properties.join(", ") + " }";
}
function formatArray(array, seenValues) {
  if (array.length === 0) {
    return "[]";
  }
  if (seenValues.length > MAX_RECURSIVE_DEPTH) {
    return "[Array]";
  }
  const len = Math.min(MAX_ARRAY_LENGTH, array.length);
  const remaining = array.length - len;
  const items = [];
  for (let i = 0; i < len; ++i) {
    items.push(formatValue(array[i], seenValues));
  }
  if (remaining === 1) {
    items.push("... 1 more item");
  } else if (remaining > 1) {
    items.push(`... ${remaining} more items`);
  }
  return "[" + items.join(", ") + "]";
}
function getObjectTag(object) {
  const tag = Object.prototype.toString.call(object).replace(/^\[object /, "").replace(/]$/, "");
  if (tag === "Object" && typeof object.constructor === "function") {
    const name = object.constructor.name;
    if (typeof name === "string" && name !== "") {
      return name;
    }
  }
  return tag;
}
var MAX_ARRAY_LENGTH, MAX_RECURSIVE_DEPTH;
var init_inspect = __esm({
  "../node_modules/graphql/jsutils/inspect.mjs"() {
    MAX_ARRAY_LENGTH = 10;
    MAX_RECURSIVE_DEPTH = 2;
  }
});

// ../node_modules/graphql/jsutils/instanceOf.mjs
var isProduction, instanceOf;
var init_instanceOf = __esm({
  "../node_modules/graphql/jsutils/instanceOf.mjs"() {
    init_inspect();
    isProduction = globalThis.process && // eslint-disable-next-line no-undef
    false;
    instanceOf = /* c8 ignore next 6 */
    // FIXME: https://github.com/graphql/graphql-js/issues/2317
    isProduction ? function instanceOf2(value, constructor) {
      return value instanceof constructor;
    } : function instanceOf3(value, constructor) {
      if (value instanceof constructor) {
        return true;
      }
      if (typeof value === "object" && value !== null) {
        var _value$constructor;
        const className = constructor.prototype[Symbol.toStringTag];
        const valueClassName = (
          // We still need to support constructor's name to detect conflicts with older versions of this library.
          Symbol.toStringTag in value ? value[Symbol.toStringTag] : (_value$constructor = value.constructor) === null || _value$constructor === void 0 ? void 0 : _value$constructor.name
        );
        if (className === valueClassName) {
          const stringifiedValue = inspect(value);
          throw new Error(`Cannot use ${className} "${stringifiedValue}" from another module or realm.

Ensure that there is only one instance of "graphql" in the node_modules
directory. If different versions of "graphql" are the dependencies of other
relied on modules, use "resolutions" to ensure only one version is installed.

https://yarnpkg.com/en/docs/selective-version-resolutions

Duplicate "graphql" modules cannot be used at the same time since different
versions may have different capabilities and behavior. The data from one
version used in the function from another could produce confusing and
spurious results.`);
        }
      }
      return false;
    };
  }
});

// ../node_modules/graphql/language/source.mjs
function isSource(source) {
  return instanceOf(source, Source);
}
var Source;
var init_source = __esm({
  "../node_modules/graphql/language/source.mjs"() {
    init_devAssert();
    init_inspect();
    init_instanceOf();
    Source = class {
      constructor(body, name = "GraphQL request", locationOffset = {
        line: 1,
        column: 1
      }) {
        typeof body === "string" || devAssert(false, `Body must be a string. Received: ${inspect(body)}.`);
        this.body = body;
        this.name = name;
        this.locationOffset = locationOffset;
        this.locationOffset.line > 0 || devAssert(
          false,
          "line in locationOffset is 1-indexed and must be positive."
        );
        this.locationOffset.column > 0 || devAssert(
          false,
          "column in locationOffset is 1-indexed and must be positive."
        );
      }
      get [Symbol.toStringTag]() {
        return "Source";
      }
    };
  }
});

// ../node_modules/graphql/language/parser.mjs
function parse(source, options) {
  const parser = new Parser(source, options);
  const document = parser.parseDocument();
  Object.defineProperty(document, "tokenCount", {
    enumerable: false,
    value: parser.tokenCount
  });
  return document;
}
function parseValue(source, options) {
  const parser = new Parser(source, options);
  parser.expectToken(TokenKind.SOF);
  const value = parser.parseValueLiteral(false);
  parser.expectToken(TokenKind.EOF);
  return value;
}
function parseConstValue(source, options) {
  const parser = new Parser(source, options);
  parser.expectToken(TokenKind.SOF);
  const value = parser.parseConstValueLiteral();
  parser.expectToken(TokenKind.EOF);
  return value;
}
function parseType(source, options) {
  const parser = new Parser(source, options);
  parser.expectToken(TokenKind.SOF);
  const type = parser.parseTypeReference();
  parser.expectToken(TokenKind.EOF);
  return type;
}
function getTokenDesc(token) {
  const value = token.value;
  return getTokenKindDesc(token.kind) + (value != null ? ` "${value}"` : "");
}
function getTokenKindDesc(kind) {
  return isPunctuatorTokenKind(kind) ? `"${kind}"` : kind;
}
var Parser;
var init_parser = __esm({
  "../node_modules/graphql/language/parser.mjs"() {
    init_syntaxError();
    init_ast();
    init_directiveLocation();
    init_kinds();
    init_lexer();
    init_source();
    init_tokenKind();
    Parser = class {
      constructor(source, options = {}) {
        const sourceObj = isSource(source) ? source : new Source(source);
        this._lexer = new Lexer(sourceObj);
        this._options = options;
        this._tokenCounter = 0;
      }
      get tokenCount() {
        return this._tokenCounter;
      }
      /**
       * Converts a name lex token into a name parse node.
       */
      parseName() {
        const token = this.expectToken(TokenKind.NAME);
        return this.node(token, {
          kind: Kind.NAME,
          value: token.value
        });
      }
      // Implements the parsing rules in the Document section.
      /**
       * Document : Definition+
       */
      parseDocument() {
        return this.node(this._lexer.token, {
          kind: Kind.DOCUMENT,
          definitions: this.many(
            TokenKind.SOF,
            this.parseDefinition,
            TokenKind.EOF
          )
        });
      }
      /**
       * Definition :
       *   - ExecutableDefinition
       *   - TypeSystemDefinition
       *   - TypeSystemExtension
       *
       * ExecutableDefinition :
       *   - OperationDefinition
       *   - FragmentDefinition
       *
       * TypeSystemDefinition :
       *   - SchemaDefinition
       *   - TypeDefinition
       *   - DirectiveDefinition
       *
       * TypeDefinition :
       *   - ScalarTypeDefinition
       *   - ObjectTypeDefinition
       *   - InterfaceTypeDefinition
       *   - UnionTypeDefinition
       *   - EnumTypeDefinition
       *   - InputObjectTypeDefinition
       */
      parseDefinition() {
        if (this.peek(TokenKind.BRACE_L)) {
          return this.parseOperationDefinition();
        }
        const hasDescription = this.peekDescription();
        const keywordToken = hasDescription ? this._lexer.lookahead() : this._lexer.token;
        if (keywordToken.kind === TokenKind.NAME) {
          switch (keywordToken.value) {
            case "schema":
              return this.parseSchemaDefinition();
            case "scalar":
              return this.parseScalarTypeDefinition();
            case "type":
              return this.parseObjectTypeDefinition();
            case "interface":
              return this.parseInterfaceTypeDefinition();
            case "union":
              return this.parseUnionTypeDefinition();
            case "enum":
              return this.parseEnumTypeDefinition();
            case "input":
              return this.parseInputObjectTypeDefinition();
            case "directive":
              return this.parseDirectiveDefinition();
          }
          if (hasDescription) {
            throw syntaxError(
              this._lexer.source,
              this._lexer.token.start,
              "Unexpected description, descriptions are supported only on type definitions."
            );
          }
          switch (keywordToken.value) {
            case "query":
            case "mutation":
            case "subscription":
              return this.parseOperationDefinition();
            case "fragment":
              return this.parseFragmentDefinition();
            case "extend":
              return this.parseTypeSystemExtension();
          }
        }
        throw this.unexpected(keywordToken);
      }
      // Implements the parsing rules in the Operations section.
      /**
       * OperationDefinition :
       *  - SelectionSet
       *  - OperationType Name? VariableDefinitions? Directives? SelectionSet
       */
      parseOperationDefinition() {
        const start = this._lexer.token;
        if (this.peek(TokenKind.BRACE_L)) {
          return this.node(start, {
            kind: Kind.OPERATION_DEFINITION,
            operation: OperationTypeNode.QUERY,
            name: void 0,
            variableDefinitions: [],
            directives: [],
            selectionSet: this.parseSelectionSet()
          });
        }
        const operation = this.parseOperationType();
        let name;
        if (this.peek(TokenKind.NAME)) {
          name = this.parseName();
        }
        return this.node(start, {
          kind: Kind.OPERATION_DEFINITION,
          operation,
          name,
          variableDefinitions: this.parseVariableDefinitions(),
          directives: this.parseDirectives(false),
          selectionSet: this.parseSelectionSet()
        });
      }
      /**
       * OperationType : one of query mutation subscription
       */
      parseOperationType() {
        const operationToken = this.expectToken(TokenKind.NAME);
        switch (operationToken.value) {
          case "query":
            return OperationTypeNode.QUERY;
          case "mutation":
            return OperationTypeNode.MUTATION;
          case "subscription":
            return OperationTypeNode.SUBSCRIPTION;
        }
        throw this.unexpected(operationToken);
      }
      /**
       * VariableDefinitions : ( VariableDefinition+ )
       */
      parseVariableDefinitions() {
        return this.optionalMany(
          TokenKind.PAREN_L,
          this.parseVariableDefinition,
          TokenKind.PAREN_R
        );
      }
      /**
       * VariableDefinition : Variable : Type DefaultValue? Directives[Const]?
       */
      parseVariableDefinition() {
        return this.node(this._lexer.token, {
          kind: Kind.VARIABLE_DEFINITION,
          variable: this.parseVariable(),
          type: (this.expectToken(TokenKind.COLON), this.parseTypeReference()),
          defaultValue: this.expectOptionalToken(TokenKind.EQUALS) ? this.parseConstValueLiteral() : void 0,
          directives: this.parseConstDirectives()
        });
      }
      /**
       * Variable : $ Name
       */
      parseVariable() {
        const start = this._lexer.token;
        this.expectToken(TokenKind.DOLLAR);
        return this.node(start, {
          kind: Kind.VARIABLE,
          name: this.parseName()
        });
      }
      /**
       * ```
       * SelectionSet : { Selection+ }
       * ```
       */
      parseSelectionSet() {
        return this.node(this._lexer.token, {
          kind: Kind.SELECTION_SET,
          selections: this.many(
            TokenKind.BRACE_L,
            this.parseSelection,
            TokenKind.BRACE_R
          )
        });
      }
      /**
       * Selection :
       *   - Field
       *   - FragmentSpread
       *   - InlineFragment
       */
      parseSelection() {
        return this.peek(TokenKind.SPREAD) ? this.parseFragment() : this.parseField();
      }
      /**
       * Field : Alias? Name Arguments? Directives? SelectionSet?
       *
       * Alias : Name :
       */
      parseField() {
        const start = this._lexer.token;
        const nameOrAlias = this.parseName();
        let alias;
        let name;
        if (this.expectOptionalToken(TokenKind.COLON)) {
          alias = nameOrAlias;
          name = this.parseName();
        } else {
          name = nameOrAlias;
        }
        return this.node(start, {
          kind: Kind.FIELD,
          alias,
          name,
          arguments: this.parseArguments(false),
          directives: this.parseDirectives(false),
          selectionSet: this.peek(TokenKind.BRACE_L) ? this.parseSelectionSet() : void 0
        });
      }
      /**
       * Arguments[Const] : ( Argument[?Const]+ )
       */
      parseArguments(isConst) {
        const item = isConst ? this.parseConstArgument : this.parseArgument;
        return this.optionalMany(TokenKind.PAREN_L, item, TokenKind.PAREN_R);
      }
      /**
       * Argument[Const] : Name : Value[?Const]
       */
      parseArgument(isConst = false) {
        const start = this._lexer.token;
        const name = this.parseName();
        this.expectToken(TokenKind.COLON);
        return this.node(start, {
          kind: Kind.ARGUMENT,
          name,
          value: this.parseValueLiteral(isConst)
        });
      }
      parseConstArgument() {
        return this.parseArgument(true);
      }
      // Implements the parsing rules in the Fragments section.
      /**
       * Corresponds to both FragmentSpread and InlineFragment in the spec.
       *
       * FragmentSpread : ... FragmentName Directives?
       *
       * InlineFragment : ... TypeCondition? Directives? SelectionSet
       */
      parseFragment() {
        const start = this._lexer.token;
        this.expectToken(TokenKind.SPREAD);
        const hasTypeCondition = this.expectOptionalKeyword("on");
        if (!hasTypeCondition && this.peek(TokenKind.NAME)) {
          return this.node(start, {
            kind: Kind.FRAGMENT_SPREAD,
            name: this.parseFragmentName(),
            directives: this.parseDirectives(false)
          });
        }
        return this.node(start, {
          kind: Kind.INLINE_FRAGMENT,
          typeCondition: hasTypeCondition ? this.parseNamedType() : void 0,
          directives: this.parseDirectives(false),
          selectionSet: this.parseSelectionSet()
        });
      }
      /**
       * FragmentDefinition :
       *   - fragment FragmentName on TypeCondition Directives? SelectionSet
       *
       * TypeCondition : NamedType
       */
      parseFragmentDefinition() {
        const start = this._lexer.token;
        this.expectKeyword("fragment");
        if (this._options.allowLegacyFragmentVariables === true) {
          return this.node(start, {
            kind: Kind.FRAGMENT_DEFINITION,
            name: this.parseFragmentName(),
            variableDefinitions: this.parseVariableDefinitions(),
            typeCondition: (this.expectKeyword("on"), this.parseNamedType()),
            directives: this.parseDirectives(false),
            selectionSet: this.parseSelectionSet()
          });
        }
        return this.node(start, {
          kind: Kind.FRAGMENT_DEFINITION,
          name: this.parseFragmentName(),
          typeCondition: (this.expectKeyword("on"), this.parseNamedType()),
          directives: this.parseDirectives(false),
          selectionSet: this.parseSelectionSet()
        });
      }
      /**
       * FragmentName : Name but not `on`
       */
      parseFragmentName() {
        if (this._lexer.token.value === "on") {
          throw this.unexpected();
        }
        return this.parseName();
      }
      // Implements the parsing rules in the Values section.
      /**
       * Value[Const] :
       *   - [~Const] Variable
       *   - IntValue
       *   - FloatValue
       *   - StringValue
       *   - BooleanValue
       *   - NullValue
       *   - EnumValue
       *   - ListValue[?Const]
       *   - ObjectValue[?Const]
       *
       * BooleanValue : one of `true` `false`
       *
       * NullValue : `null`
       *
       * EnumValue : Name but not `true`, `false` or `null`
       */
      parseValueLiteral(isConst) {
        const token = this._lexer.token;
        switch (token.kind) {
          case TokenKind.BRACKET_L:
            return this.parseList(isConst);
          case TokenKind.BRACE_L:
            return this.parseObject(isConst);
          case TokenKind.INT:
            this.advanceLexer();
            return this.node(token, {
              kind: Kind.INT,
              value: token.value
            });
          case TokenKind.FLOAT:
            this.advanceLexer();
            return this.node(token, {
              kind: Kind.FLOAT,
              value: token.value
            });
          case TokenKind.STRING:
          case TokenKind.BLOCK_STRING:
            return this.parseStringLiteral();
          case TokenKind.NAME:
            this.advanceLexer();
            switch (token.value) {
              case "true":
                return this.node(token, {
                  kind: Kind.BOOLEAN,
                  value: true
                });
              case "false":
                return this.node(token, {
                  kind: Kind.BOOLEAN,
                  value: false
                });
              case "null":
                return this.node(token, {
                  kind: Kind.NULL
                });
              default:
                return this.node(token, {
                  kind: Kind.ENUM,
                  value: token.value
                });
            }
          case TokenKind.DOLLAR:
            if (isConst) {
              this.expectToken(TokenKind.DOLLAR);
              if (this._lexer.token.kind === TokenKind.NAME) {
                const varName = this._lexer.token.value;
                throw syntaxError(
                  this._lexer.source,
                  token.start,
                  `Unexpected variable "$${varName}" in constant value.`
                );
              } else {
                throw this.unexpected(token);
              }
            }
            return this.parseVariable();
          default:
            throw this.unexpected();
        }
      }
      parseConstValueLiteral() {
        return this.parseValueLiteral(true);
      }
      parseStringLiteral() {
        const token = this._lexer.token;
        this.advanceLexer();
        return this.node(token, {
          kind: Kind.STRING,
          value: token.value,
          block: token.kind === TokenKind.BLOCK_STRING
        });
      }
      /**
       * ListValue[Const] :
       *   - [ ]
       *   - [ Value[?Const]+ ]
       */
      parseList(isConst) {
        const item = () => this.parseValueLiteral(isConst);
        return this.node(this._lexer.token, {
          kind: Kind.LIST,
          values: this.any(TokenKind.BRACKET_L, item, TokenKind.BRACKET_R)
        });
      }
      /**
       * ```
       * ObjectValue[Const] :
       *   - { }
       *   - { ObjectField[?Const]+ }
       * ```
       */
      parseObject(isConst) {
        const item = () => this.parseObjectField(isConst);
        return this.node(this._lexer.token, {
          kind: Kind.OBJECT,
          fields: this.any(TokenKind.BRACE_L, item, TokenKind.BRACE_R)
        });
      }
      /**
       * ObjectField[Const] : Name : Value[?Const]
       */
      parseObjectField(isConst) {
        const start = this._lexer.token;
        const name = this.parseName();
        this.expectToken(TokenKind.COLON);
        return this.node(start, {
          kind: Kind.OBJECT_FIELD,
          name,
          value: this.parseValueLiteral(isConst)
        });
      }
      // Implements the parsing rules in the Directives section.
      /**
       * Directives[Const] : Directive[?Const]+
       */
      parseDirectives(isConst) {
        const directives = [];
        while (this.peek(TokenKind.AT)) {
          directives.push(this.parseDirective(isConst));
        }
        return directives;
      }
      parseConstDirectives() {
        return this.parseDirectives(true);
      }
      /**
       * ```
       * Directive[Const] : @ Name Arguments[?Const]?
       * ```
       */
      parseDirective(isConst) {
        const start = this._lexer.token;
        this.expectToken(TokenKind.AT);
        return this.node(start, {
          kind: Kind.DIRECTIVE,
          name: this.parseName(),
          arguments: this.parseArguments(isConst)
        });
      }
      // Implements the parsing rules in the Types section.
      /**
       * Type :
       *   - NamedType
       *   - ListType
       *   - NonNullType
       */
      parseTypeReference() {
        const start = this._lexer.token;
        let type;
        if (this.expectOptionalToken(TokenKind.BRACKET_L)) {
          const innerType = this.parseTypeReference();
          this.expectToken(TokenKind.BRACKET_R);
          type = this.node(start, {
            kind: Kind.LIST_TYPE,
            type: innerType
          });
        } else {
          type = this.parseNamedType();
        }
        if (this.expectOptionalToken(TokenKind.BANG)) {
          return this.node(start, {
            kind: Kind.NON_NULL_TYPE,
            type
          });
        }
        return type;
      }
      /**
       * NamedType : Name
       */
      parseNamedType() {
        return this.node(this._lexer.token, {
          kind: Kind.NAMED_TYPE,
          name: this.parseName()
        });
      }
      // Implements the parsing rules in the Type Definition section.
      peekDescription() {
        return this.peek(TokenKind.STRING) || this.peek(TokenKind.BLOCK_STRING);
      }
      /**
       * Description : StringValue
       */
      parseDescription() {
        if (this.peekDescription()) {
          return this.parseStringLiteral();
        }
      }
      /**
       * ```
       * SchemaDefinition : Description? schema Directives[Const]? { OperationTypeDefinition+ }
       * ```
       */
      parseSchemaDefinition() {
        const start = this._lexer.token;
        const description = this.parseDescription();
        this.expectKeyword("schema");
        const directives = this.parseConstDirectives();
        const operationTypes = this.many(
          TokenKind.BRACE_L,
          this.parseOperationTypeDefinition,
          TokenKind.BRACE_R
        );
        return this.node(start, {
          kind: Kind.SCHEMA_DEFINITION,
          description,
          directives,
          operationTypes
        });
      }
      /**
       * OperationTypeDefinition : OperationType : NamedType
       */
      parseOperationTypeDefinition() {
        const start = this._lexer.token;
        const operation = this.parseOperationType();
        this.expectToken(TokenKind.COLON);
        const type = this.parseNamedType();
        return this.node(start, {
          kind: Kind.OPERATION_TYPE_DEFINITION,
          operation,
          type
        });
      }
      /**
       * ScalarTypeDefinition : Description? scalar Name Directives[Const]?
       */
      parseScalarTypeDefinition() {
        const start = this._lexer.token;
        const description = this.parseDescription();
        this.expectKeyword("scalar");
        const name = this.parseName();
        const directives = this.parseConstDirectives();
        return this.node(start, {
          kind: Kind.SCALAR_TYPE_DEFINITION,
          description,
          name,
          directives
        });
      }
      /**
       * ObjectTypeDefinition :
       *   Description?
       *   type Name ImplementsInterfaces? Directives[Const]? FieldsDefinition?
       */
      parseObjectTypeDefinition() {
        const start = this._lexer.token;
        const description = this.parseDescription();
        this.expectKeyword("type");
        const name = this.parseName();
        const interfaces = this.parseImplementsInterfaces();
        const directives = this.parseConstDirectives();
        const fields = this.parseFieldsDefinition();
        return this.node(start, {
          kind: Kind.OBJECT_TYPE_DEFINITION,
          description,
          name,
          interfaces,
          directives,
          fields
        });
      }
      /**
       * ImplementsInterfaces :
       *   - implements `&`? NamedType
       *   - ImplementsInterfaces & NamedType
       */
      parseImplementsInterfaces() {
        return this.expectOptionalKeyword("implements") ? this.delimitedMany(TokenKind.AMP, this.parseNamedType) : [];
      }
      /**
       * ```
       * FieldsDefinition : { FieldDefinition+ }
       * ```
       */
      parseFieldsDefinition() {
        return this.optionalMany(
          TokenKind.BRACE_L,
          this.parseFieldDefinition,
          TokenKind.BRACE_R
        );
      }
      /**
       * FieldDefinition :
       *   - Description? Name ArgumentsDefinition? : Type Directives[Const]?
       */
      parseFieldDefinition() {
        const start = this._lexer.token;
        const description = this.parseDescription();
        const name = this.parseName();
        const args = this.parseArgumentDefs();
        this.expectToken(TokenKind.COLON);
        const type = this.parseTypeReference();
        const directives = this.parseConstDirectives();
        return this.node(start, {
          kind: Kind.FIELD_DEFINITION,
          description,
          name,
          arguments: args,
          type,
          directives
        });
      }
      /**
       * ArgumentsDefinition : ( InputValueDefinition+ )
       */
      parseArgumentDefs() {
        return this.optionalMany(
          TokenKind.PAREN_L,
          this.parseInputValueDef,
          TokenKind.PAREN_R
        );
      }
      /**
       * InputValueDefinition :
       *   - Description? Name : Type DefaultValue? Directives[Const]?
       */
      parseInputValueDef() {
        const start = this._lexer.token;
        const description = this.parseDescription();
        const name = this.parseName();
        this.expectToken(TokenKind.COLON);
        const type = this.parseTypeReference();
        let defaultValue;
        if (this.expectOptionalToken(TokenKind.EQUALS)) {
          defaultValue = this.parseConstValueLiteral();
        }
        const directives = this.parseConstDirectives();
        return this.node(start, {
          kind: Kind.INPUT_VALUE_DEFINITION,
          description,
          name,
          type,
          defaultValue,
          directives
        });
      }
      /**
       * InterfaceTypeDefinition :
       *   - Description? interface Name Directives[Const]? FieldsDefinition?
       */
      parseInterfaceTypeDefinition() {
        const start = this._lexer.token;
        const description = this.parseDescription();
        this.expectKeyword("interface");
        const name = this.parseName();
        const interfaces = this.parseImplementsInterfaces();
        const directives = this.parseConstDirectives();
        const fields = this.parseFieldsDefinition();
        return this.node(start, {
          kind: Kind.INTERFACE_TYPE_DEFINITION,
          description,
          name,
          interfaces,
          directives,
          fields
        });
      }
      /**
       * UnionTypeDefinition :
       *   - Description? union Name Directives[Const]? UnionMemberTypes?
       */
      parseUnionTypeDefinition() {
        const start = this._lexer.token;
        const description = this.parseDescription();
        this.expectKeyword("union");
        const name = this.parseName();
        const directives = this.parseConstDirectives();
        const types = this.parseUnionMemberTypes();
        return this.node(start, {
          kind: Kind.UNION_TYPE_DEFINITION,
          description,
          name,
          directives,
          types
        });
      }
      /**
       * UnionMemberTypes :
       *   - = `|`? NamedType
       *   - UnionMemberTypes | NamedType
       */
      parseUnionMemberTypes() {
        return this.expectOptionalToken(TokenKind.EQUALS) ? this.delimitedMany(TokenKind.PIPE, this.parseNamedType) : [];
      }
      /**
       * EnumTypeDefinition :
       *   - Description? enum Name Directives[Const]? EnumValuesDefinition?
       */
      parseEnumTypeDefinition() {
        const start = this._lexer.token;
        const description = this.parseDescription();
        this.expectKeyword("enum");
        const name = this.parseName();
        const directives = this.parseConstDirectives();
        const values = this.parseEnumValuesDefinition();
        return this.node(start, {
          kind: Kind.ENUM_TYPE_DEFINITION,
          description,
          name,
          directives,
          values
        });
      }
      /**
       * ```
       * EnumValuesDefinition : { EnumValueDefinition+ }
       * ```
       */
      parseEnumValuesDefinition() {
        return this.optionalMany(
          TokenKind.BRACE_L,
          this.parseEnumValueDefinition,
          TokenKind.BRACE_R
        );
      }
      /**
       * EnumValueDefinition : Description? EnumValue Directives[Const]?
       */
      parseEnumValueDefinition() {
        const start = this._lexer.token;
        const description = this.parseDescription();
        const name = this.parseEnumValueName();
        const directives = this.parseConstDirectives();
        return this.node(start, {
          kind: Kind.ENUM_VALUE_DEFINITION,
          description,
          name,
          directives
        });
      }
      /**
       * EnumValue : Name but not `true`, `false` or `null`
       */
      parseEnumValueName() {
        if (this._lexer.token.value === "true" || this._lexer.token.value === "false" || this._lexer.token.value === "null") {
          throw syntaxError(
            this._lexer.source,
            this._lexer.token.start,
            `${getTokenDesc(
              this._lexer.token
            )} is reserved and cannot be used for an enum value.`
          );
        }
        return this.parseName();
      }
      /**
       * InputObjectTypeDefinition :
       *   - Description? input Name Directives[Const]? InputFieldsDefinition?
       */
      parseInputObjectTypeDefinition() {
        const start = this._lexer.token;
        const description = this.parseDescription();
        this.expectKeyword("input");
        const name = this.parseName();
        const directives = this.parseConstDirectives();
        const fields = this.parseInputFieldsDefinition();
        return this.node(start, {
          kind: Kind.INPUT_OBJECT_TYPE_DEFINITION,
          description,
          name,
          directives,
          fields
        });
      }
      /**
       * ```
       * InputFieldsDefinition : { InputValueDefinition+ }
       * ```
       */
      parseInputFieldsDefinition() {
        return this.optionalMany(
          TokenKind.BRACE_L,
          this.parseInputValueDef,
          TokenKind.BRACE_R
        );
      }
      /**
       * TypeSystemExtension :
       *   - SchemaExtension
       *   - TypeExtension
       *
       * TypeExtension :
       *   - ScalarTypeExtension
       *   - ObjectTypeExtension
       *   - InterfaceTypeExtension
       *   - UnionTypeExtension
       *   - EnumTypeExtension
       *   - InputObjectTypeDefinition
       */
      parseTypeSystemExtension() {
        const keywordToken = this._lexer.lookahead();
        if (keywordToken.kind === TokenKind.NAME) {
          switch (keywordToken.value) {
            case "schema":
              return this.parseSchemaExtension();
            case "scalar":
              return this.parseScalarTypeExtension();
            case "type":
              return this.parseObjectTypeExtension();
            case "interface":
              return this.parseInterfaceTypeExtension();
            case "union":
              return this.parseUnionTypeExtension();
            case "enum":
              return this.parseEnumTypeExtension();
            case "input":
              return this.parseInputObjectTypeExtension();
          }
        }
        throw this.unexpected(keywordToken);
      }
      /**
       * ```
       * SchemaExtension :
       *  - extend schema Directives[Const]? { OperationTypeDefinition+ }
       *  - extend schema Directives[Const]
       * ```
       */
      parseSchemaExtension() {
        const start = this._lexer.token;
        this.expectKeyword("extend");
        this.expectKeyword("schema");
        const directives = this.parseConstDirectives();
        const operationTypes = this.optionalMany(
          TokenKind.BRACE_L,
          this.parseOperationTypeDefinition,
          TokenKind.BRACE_R
        );
        if (directives.length === 0 && operationTypes.length === 0) {
          throw this.unexpected();
        }
        return this.node(start, {
          kind: Kind.SCHEMA_EXTENSION,
          directives,
          operationTypes
        });
      }
      /**
       * ScalarTypeExtension :
       *   - extend scalar Name Directives[Const]
       */
      parseScalarTypeExtension() {
        const start = this._lexer.token;
        this.expectKeyword("extend");
        this.expectKeyword("scalar");
        const name = this.parseName();
        const directives = this.parseConstDirectives();
        if (directives.length === 0) {
          throw this.unexpected();
        }
        return this.node(start, {
          kind: Kind.SCALAR_TYPE_EXTENSION,
          name,
          directives
        });
      }
      /**
       * ObjectTypeExtension :
       *  - extend type Name ImplementsInterfaces? Directives[Const]? FieldsDefinition
       *  - extend type Name ImplementsInterfaces? Directives[Const]
       *  - extend type Name ImplementsInterfaces
       */
      parseObjectTypeExtension() {
        const start = this._lexer.token;
        this.expectKeyword("extend");
        this.expectKeyword("type");
        const name = this.parseName();
        const interfaces = this.parseImplementsInterfaces();
        const directives = this.parseConstDirectives();
        const fields = this.parseFieldsDefinition();
        if (interfaces.length === 0 && directives.length === 0 && fields.length === 0) {
          throw this.unexpected();
        }
        return this.node(start, {
          kind: Kind.OBJECT_TYPE_EXTENSION,
          name,
          interfaces,
          directives,
          fields
        });
      }
      /**
       * InterfaceTypeExtension :
       *  - extend interface Name ImplementsInterfaces? Directives[Const]? FieldsDefinition
       *  - extend interface Name ImplementsInterfaces? Directives[Const]
       *  - extend interface Name ImplementsInterfaces
       */
      parseInterfaceTypeExtension() {
        const start = this._lexer.token;
        this.expectKeyword("extend");
        this.expectKeyword("interface");
        const name = this.parseName();
        const interfaces = this.parseImplementsInterfaces();
        const directives = this.parseConstDirectives();
        const fields = this.parseFieldsDefinition();
        if (interfaces.length === 0 && directives.length === 0 && fields.length === 0) {
          throw this.unexpected();
        }
        return this.node(start, {
          kind: Kind.INTERFACE_TYPE_EXTENSION,
          name,
          interfaces,
          directives,
          fields
        });
      }
      /**
       * UnionTypeExtension :
       *   - extend union Name Directives[Const]? UnionMemberTypes
       *   - extend union Name Directives[Const]
       */
      parseUnionTypeExtension() {
        const start = this._lexer.token;
        this.expectKeyword("extend");
        this.expectKeyword("union");
        const name = this.parseName();
        const directives = this.parseConstDirectives();
        const types = this.parseUnionMemberTypes();
        if (directives.length === 0 && types.length === 0) {
          throw this.unexpected();
        }
        return this.node(start, {
          kind: Kind.UNION_TYPE_EXTENSION,
          name,
          directives,
          types
        });
      }
      /**
       * EnumTypeExtension :
       *   - extend enum Name Directives[Const]? EnumValuesDefinition
       *   - extend enum Name Directives[Const]
       */
      parseEnumTypeExtension() {
        const start = this._lexer.token;
        this.expectKeyword("extend");
        this.expectKeyword("enum");
        const name = this.parseName();
        const directives = this.parseConstDirectives();
        const values = this.parseEnumValuesDefinition();
        if (directives.length === 0 && values.length === 0) {
          throw this.unexpected();
        }
        return this.node(start, {
          kind: Kind.ENUM_TYPE_EXTENSION,
          name,
          directives,
          values
        });
      }
      /**
       * InputObjectTypeExtension :
       *   - extend input Name Directives[Const]? InputFieldsDefinition
       *   - extend input Name Directives[Const]
       */
      parseInputObjectTypeExtension() {
        const start = this._lexer.token;
        this.expectKeyword("extend");
        this.expectKeyword("input");
        const name = this.parseName();
        const directives = this.parseConstDirectives();
        const fields = this.parseInputFieldsDefinition();
        if (directives.length === 0 && fields.length === 0) {
          throw this.unexpected();
        }
        return this.node(start, {
          kind: Kind.INPUT_OBJECT_TYPE_EXTENSION,
          name,
          directives,
          fields
        });
      }
      /**
       * ```
       * DirectiveDefinition :
       *   - Description? directive @ Name ArgumentsDefinition? `repeatable`? on DirectiveLocations
       * ```
       */
      parseDirectiveDefinition() {
        const start = this._lexer.token;
        const description = this.parseDescription();
        this.expectKeyword("directive");
        this.expectToken(TokenKind.AT);
        const name = this.parseName();
        const args = this.parseArgumentDefs();
        const repeatable = this.expectOptionalKeyword("repeatable");
        this.expectKeyword("on");
        const locations = this.parseDirectiveLocations();
        return this.node(start, {
          kind: Kind.DIRECTIVE_DEFINITION,
          description,
          name,
          arguments: args,
          repeatable,
          locations
        });
      }
      /**
       * DirectiveLocations :
       *   - `|`? DirectiveLocation
       *   - DirectiveLocations | DirectiveLocation
       */
      parseDirectiveLocations() {
        return this.delimitedMany(TokenKind.PIPE, this.parseDirectiveLocation);
      }
      /*
       * DirectiveLocation :
       *   - ExecutableDirectiveLocation
       *   - TypeSystemDirectiveLocation
       *
       * ExecutableDirectiveLocation : one of
       *   `QUERY`
       *   `MUTATION`
       *   `SUBSCRIPTION`
       *   `FIELD`
       *   `FRAGMENT_DEFINITION`
       *   `FRAGMENT_SPREAD`
       *   `INLINE_FRAGMENT`
       *
       * TypeSystemDirectiveLocation : one of
       *   `SCHEMA`
       *   `SCALAR`
       *   `OBJECT`
       *   `FIELD_DEFINITION`
       *   `ARGUMENT_DEFINITION`
       *   `INTERFACE`
       *   `UNION`
       *   `ENUM`
       *   `ENUM_VALUE`
       *   `INPUT_OBJECT`
       *   `INPUT_FIELD_DEFINITION`
       */
      parseDirectiveLocation() {
        const start = this._lexer.token;
        const name = this.parseName();
        if (Object.prototype.hasOwnProperty.call(DirectiveLocation, name.value)) {
          return name;
        }
        throw this.unexpected(start);
      }
      // Core parsing utility functions
      /**
       * Returns a node that, if configured to do so, sets a "loc" field as a
       * location object, used to identify the place in the source that created a
       * given parsed object.
       */
      node(startToken, node) {
        if (this._options.noLocation !== true) {
          node.loc = new Location(
            startToken,
            this._lexer.lastToken,
            this._lexer.source
          );
        }
        return node;
      }
      /**
       * Determines if the next token is of a given kind
       */
      peek(kind) {
        return this._lexer.token.kind === kind;
      }
      /**
       * If the next token is of the given kind, return that token after advancing the lexer.
       * Otherwise, do not change the parser state and throw an error.
       */
      expectToken(kind) {
        const token = this._lexer.token;
        if (token.kind === kind) {
          this.advanceLexer();
          return token;
        }
        throw syntaxError(
          this._lexer.source,
          token.start,
          `Expected ${getTokenKindDesc(kind)}, found ${getTokenDesc(token)}.`
        );
      }
      /**
       * If the next token is of the given kind, return "true" after advancing the lexer.
       * Otherwise, do not change the parser state and return "false".
       */
      expectOptionalToken(kind) {
        const token = this._lexer.token;
        if (token.kind === kind) {
          this.advanceLexer();
          return true;
        }
        return false;
      }
      /**
       * If the next token is a given keyword, advance the lexer.
       * Otherwise, do not change the parser state and throw an error.
       */
      expectKeyword(value) {
        const token = this._lexer.token;
        if (token.kind === TokenKind.NAME && token.value === value) {
          this.advanceLexer();
        } else {
          throw syntaxError(
            this._lexer.source,
            token.start,
            `Expected "${value}", found ${getTokenDesc(token)}.`
          );
        }
      }
      /**
       * If the next token is a given keyword, return "true" after advancing the lexer.
       * Otherwise, do not change the parser state and return "false".
       */
      expectOptionalKeyword(value) {
        const token = this._lexer.token;
        if (token.kind === TokenKind.NAME && token.value === value) {
          this.advanceLexer();
          return true;
        }
        return false;
      }
      /**
       * Helper function for creating an error when an unexpected lexed token is encountered.
       */
      unexpected(atToken) {
        const token = atToken !== null && atToken !== void 0 ? atToken : this._lexer.token;
        return syntaxError(
          this._lexer.source,
          token.start,
          `Unexpected ${getTokenDesc(token)}.`
        );
      }
      /**
       * Returns a possibly empty list of parse nodes, determined by the parseFn.
       * This list begins with a lex token of openKind and ends with a lex token of closeKind.
       * Advances the parser to the next lex token after the closing token.
       */
      any(openKind, parseFn, closeKind) {
        this.expectToken(openKind);
        const nodes = [];
        while (!this.expectOptionalToken(closeKind)) {
          nodes.push(parseFn.call(this));
        }
        return nodes;
      }
      /**
       * Returns a list of parse nodes, determined by the parseFn.
       * It can be empty only if open token is missing otherwise it will always return non-empty list
       * that begins with a lex token of openKind and ends with a lex token of closeKind.
       * Advances the parser to the next lex token after the closing token.
       */
      optionalMany(openKind, parseFn, closeKind) {
        if (this.expectOptionalToken(openKind)) {
          const nodes = [];
          do {
            nodes.push(parseFn.call(this));
          } while (!this.expectOptionalToken(closeKind));
          return nodes;
        }
        return [];
      }
      /**
       * Returns a non-empty list of parse nodes, determined by the parseFn.
       * This list begins with a lex token of openKind and ends with a lex token of closeKind.
       * Advances the parser to the next lex token after the closing token.
       */
      many(openKind, parseFn, closeKind) {
        this.expectToken(openKind);
        const nodes = [];
        do {
          nodes.push(parseFn.call(this));
        } while (!this.expectOptionalToken(closeKind));
        return nodes;
      }
      /**
       * Returns a non-empty list of parse nodes, determined by the parseFn.
       * This list may begin with a lex token of delimiterKind followed by items separated by lex tokens of tokenKind.
       * Advances the parser to the next lex token after last item in the list.
       */
      delimitedMany(delimiterKind, parseFn) {
        this.expectOptionalToken(delimiterKind);
        const nodes = [];
        do {
          nodes.push(parseFn.call(this));
        } while (this.expectOptionalToken(delimiterKind));
        return nodes;
      }
      advanceLexer() {
        const { maxTokens } = this._options;
        const token = this._lexer.advance();
        if (token.kind !== TokenKind.EOF) {
          ++this._tokenCounter;
          if (maxTokens !== void 0 && this._tokenCounter > maxTokens) {
            throw syntaxError(
              this._lexer.source,
              token.start,
              `Document contains more that ${maxTokens} tokens. Parsing aborted.`
            );
          }
        }
      }
    };
  }
});

// ../node_modules/graphql/jsutils/didYouMean.mjs
function didYouMean(firstArg, secondArg) {
  const [subMessage, suggestionsArg] = secondArg ? [firstArg, secondArg] : [void 0, firstArg];
  let message = " Did you mean ";
  if (subMessage) {
    message += subMessage + " ";
  }
  const suggestions = suggestionsArg.map((x) => `"${x}"`);
  switch (suggestions.length) {
    case 0:
      return "";
    case 1:
      return message + suggestions[0] + "?";
    case 2:
      return message + suggestions[0] + " or " + suggestions[1] + "?";
  }
  const selected = suggestions.slice(0, MAX_SUGGESTIONS);
  const lastItem = selected.pop();
  return message + selected.join(", ") + ", or " + lastItem + "?";
}
var MAX_SUGGESTIONS;
var init_didYouMean = __esm({
  "../node_modules/graphql/jsutils/didYouMean.mjs"() {
    MAX_SUGGESTIONS = 5;
  }
});

// ../node_modules/graphql/jsutils/identityFunc.mjs
function identityFunc(x) {
  return x;
}
var init_identityFunc = __esm({
  "../node_modules/graphql/jsutils/identityFunc.mjs"() {
  }
});

// ../node_modules/graphql/jsutils/keyMap.mjs
function keyMap(list, keyFn) {
  const result2 = /* @__PURE__ */ Object.create(null);
  for (const item of list) {
    result2[keyFn(item)] = item;
  }
  return result2;
}
var init_keyMap = __esm({
  "../node_modules/graphql/jsutils/keyMap.mjs"() {
  }
});

// ../node_modules/graphql/jsutils/keyValMap.mjs
function keyValMap(list, keyFn, valFn) {
  const result2 = /* @__PURE__ */ Object.create(null);
  for (const item of list) {
    result2[keyFn(item)] = valFn(item);
  }
  return result2;
}
var init_keyValMap = __esm({
  "../node_modules/graphql/jsutils/keyValMap.mjs"() {
  }
});

// ../node_modules/graphql/jsutils/mapValue.mjs
function mapValue(map2, fn) {
  const result2 = /* @__PURE__ */ Object.create(null);
  for (const key of Object.keys(map2)) {
    result2[key] = fn(map2[key], key);
  }
  return result2;
}
var init_mapValue = __esm({
  "../node_modules/graphql/jsutils/mapValue.mjs"() {
  }
});

// ../node_modules/graphql/jsutils/naturalCompare.mjs
function naturalCompare(aStr, bStr) {
  let aIndex = 0;
  let bIndex = 0;
  while (aIndex < aStr.length && bIndex < bStr.length) {
    let aChar = aStr.charCodeAt(aIndex);
    let bChar = bStr.charCodeAt(bIndex);
    if (isDigit2(aChar) && isDigit2(bChar)) {
      let aNum = 0;
      do {
        ++aIndex;
        aNum = aNum * 10 + aChar - DIGIT_0;
        aChar = aStr.charCodeAt(aIndex);
      } while (isDigit2(aChar) && aNum > 0);
      let bNum = 0;
      do {
        ++bIndex;
        bNum = bNum * 10 + bChar - DIGIT_0;
        bChar = bStr.charCodeAt(bIndex);
      } while (isDigit2(bChar) && bNum > 0);
      if (aNum < bNum) {
        return -1;
      }
      if (aNum > bNum) {
        return 1;
      }
    } else {
      if (aChar < bChar) {
        return -1;
      }
      if (aChar > bChar) {
        return 1;
      }
      ++aIndex;
      ++bIndex;
    }
  }
  return aStr.length - bStr.length;
}
function isDigit2(code) {
  return !isNaN(code) && DIGIT_0 <= code && code <= DIGIT_9;
}
var DIGIT_0, DIGIT_9;
var init_naturalCompare = __esm({
  "../node_modules/graphql/jsutils/naturalCompare.mjs"() {
    DIGIT_0 = 48;
    DIGIT_9 = 57;
  }
});

// ../node_modules/graphql/jsutils/suggestionList.mjs
function suggestionList(input, options) {
  const optionsByDistance = /* @__PURE__ */ Object.create(null);
  const lexicalDistance = new LexicalDistance(input);
  const threshold = Math.floor(input.length * 0.4) + 1;
  for (const option of options) {
    const distance = lexicalDistance.measure(option, threshold);
    if (distance !== void 0) {
      optionsByDistance[option] = distance;
    }
  }
  return Object.keys(optionsByDistance).sort((a, b) => {
    const distanceDiff = optionsByDistance[a] - optionsByDistance[b];
    return distanceDiff !== 0 ? distanceDiff : naturalCompare(a, b);
  });
}
function stringToArray(str) {
  const strLength = str.length;
  const array = new Array(strLength);
  for (let i = 0; i < strLength; ++i) {
    array[i] = str.charCodeAt(i);
  }
  return array;
}
var LexicalDistance;
var init_suggestionList = __esm({
  "../node_modules/graphql/jsutils/suggestionList.mjs"() {
    init_naturalCompare();
    LexicalDistance = class {
      constructor(input) {
        this._input = input;
        this._inputLowerCase = input.toLowerCase();
        this._inputArray = stringToArray(this._inputLowerCase);
        this._rows = [
          new Array(input.length + 1).fill(0),
          new Array(input.length + 1).fill(0),
          new Array(input.length + 1).fill(0)
        ];
      }
      measure(option, threshold) {
        if (this._input === option) {
          return 0;
        }
        const optionLowerCase = option.toLowerCase();
        if (this._inputLowerCase === optionLowerCase) {
          return 1;
        }
        let a = stringToArray(optionLowerCase);
        let b = this._inputArray;
        if (a.length < b.length) {
          const tmp = a;
          a = b;
          b = tmp;
        }
        const aLength = a.length;
        const bLength = b.length;
        if (aLength - bLength > threshold) {
          return void 0;
        }
        const rows = this._rows;
        for (let j = 0; j <= bLength; j++) {
          rows[0][j] = j;
        }
        for (let i = 1; i <= aLength; i++) {
          const upRow = rows[(i - 1) % 3];
          const currentRow = rows[i % 3];
          let smallestCell = currentRow[0] = i;
          for (let j = 1; j <= bLength; j++) {
            const cost = a[i - 1] === b[j - 1] ? 0 : 1;
            let currentCell = Math.min(
              upRow[j] + 1,
              // delete
              currentRow[j - 1] + 1,
              // insert
              upRow[j - 1] + cost
              // substitute
            );
            if (i > 1 && j > 1 && a[i - 1] === b[j - 2] && a[i - 2] === b[j - 1]) {
              const doubleDiagonalCell = rows[(i - 2) % 3][j - 2];
              currentCell = Math.min(currentCell, doubleDiagonalCell + 1);
            }
            if (currentCell < smallestCell) {
              smallestCell = currentCell;
            }
            currentRow[j] = currentCell;
          }
          if (smallestCell > threshold) {
            return void 0;
          }
        }
        const distance = rows[aLength % 3][bLength];
        return distance <= threshold ? distance : void 0;
      }
    };
  }
});

// ../node_modules/graphql/jsutils/toObjMap.mjs
function toObjMap(obj) {
  if (obj == null) {
    return /* @__PURE__ */ Object.create(null);
  }
  if (Object.getPrototypeOf(obj) === null) {
    return obj;
  }
  const map2 = /* @__PURE__ */ Object.create(null);
  for (const [key, value] of Object.entries(obj)) {
    map2[key] = value;
  }
  return map2;
}
var init_toObjMap = __esm({
  "../node_modules/graphql/jsutils/toObjMap.mjs"() {
  }
});

// ../node_modules/graphql/language/printString.mjs
function printString(str) {
  return `"${str.replace(escapedRegExp, escapedReplacer)}"`;
}
function escapedReplacer(str) {
  return escapeSequences[str.charCodeAt(0)];
}
var escapedRegExp, escapeSequences;
var init_printString = __esm({
  "../node_modules/graphql/language/printString.mjs"() {
    escapedRegExp = /[\x00-\x1f\x22\x5c\x7f-\x9f]/g;
    escapeSequences = [
      "\\u0000",
      "\\u0001",
      "\\u0002",
      "\\u0003",
      "\\u0004",
      "\\u0005",
      "\\u0006",
      "\\u0007",
      "\\b",
      "\\t",
      "\\n",
      "\\u000B",
      "\\f",
      "\\r",
      "\\u000E",
      "\\u000F",
      "\\u0010",
      "\\u0011",
      "\\u0012",
      "\\u0013",
      "\\u0014",
      "\\u0015",
      "\\u0016",
      "\\u0017",
      "\\u0018",
      "\\u0019",
      "\\u001A",
      "\\u001B",
      "\\u001C",
      "\\u001D",
      "\\u001E",
      "\\u001F",
      "",
      "",
      '\\"',
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      // 2F
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      // 3F
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      // 4F
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "\\\\",
      "",
      "",
      "",
      // 5F
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      // 6F
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "\\u007F",
      "\\u0080",
      "\\u0081",
      "\\u0082",
      "\\u0083",
      "\\u0084",
      "\\u0085",
      "\\u0086",
      "\\u0087",
      "\\u0088",
      "\\u0089",
      "\\u008A",
      "\\u008B",
      "\\u008C",
      "\\u008D",
      "\\u008E",
      "\\u008F",
      "\\u0090",
      "\\u0091",
      "\\u0092",
      "\\u0093",
      "\\u0094",
      "\\u0095",
      "\\u0096",
      "\\u0097",
      "\\u0098",
      "\\u0099",
      "\\u009A",
      "\\u009B",
      "\\u009C",
      "\\u009D",
      "\\u009E",
      "\\u009F"
    ];
  }
});

// ../node_modules/graphql/language/visitor.mjs
function visit(root2, visitor, visitorKeys = QueryDocumentKeys) {
  const enterLeaveMap = /* @__PURE__ */ new Map();
  for (const kind of Object.values(Kind)) {
    enterLeaveMap.set(kind, getEnterLeaveForKind(visitor, kind));
  }
  let stack = void 0;
  let inArray = Array.isArray(root2);
  let keys = [root2];
  let index = -1;
  let edits = [];
  let node = root2;
  let key = void 0;
  let parent = void 0;
  const path = [];
  const ancestors = [];
  do {
    index++;
    const isLeaving = index === keys.length;
    const isEdited = isLeaving && edits.length !== 0;
    if (isLeaving) {
      key = ancestors.length === 0 ? void 0 : path[path.length - 1];
      node = parent;
      parent = ancestors.pop();
      if (isEdited) {
        if (inArray) {
          node = node.slice();
          let editOffset = 0;
          for (const [editKey, editValue] of edits) {
            const arrayKey = editKey - editOffset;
            if (editValue === null) {
              node.splice(arrayKey, 1);
              editOffset++;
            } else {
              node[arrayKey] = editValue;
            }
          }
        } else {
          node = { ...node };
          for (const [editKey, editValue] of edits) {
            node[editKey] = editValue;
          }
        }
      }
      index = stack.index;
      keys = stack.keys;
      edits = stack.edits;
      inArray = stack.inArray;
      stack = stack.prev;
    } else if (parent) {
      key = inArray ? index : keys[index];
      node = parent[key];
      if (node === null || node === void 0) {
        continue;
      }
      path.push(key);
    }
    let result2;
    if (!Array.isArray(node)) {
      var _enterLeaveMap$get, _enterLeaveMap$get2;
      isNode(node) || devAssert(false, `Invalid AST Node: ${inspect(node)}.`);
      const visitFn = isLeaving ? (_enterLeaveMap$get = enterLeaveMap.get(node.kind)) === null || _enterLeaveMap$get === void 0 ? void 0 : _enterLeaveMap$get.leave : (_enterLeaveMap$get2 = enterLeaveMap.get(node.kind)) === null || _enterLeaveMap$get2 === void 0 ? void 0 : _enterLeaveMap$get2.enter;
      result2 = visitFn === null || visitFn === void 0 ? void 0 : visitFn.call(visitor, node, key, parent, path, ancestors);
      if (result2 === BREAK) {
        break;
      }
      if (result2 === false) {
        if (!isLeaving) {
          path.pop();
          continue;
        }
      } else if (result2 !== void 0) {
        edits.push([key, result2]);
        if (!isLeaving) {
          if (isNode(result2)) {
            node = result2;
          } else {
            path.pop();
            continue;
          }
        }
      }
    }
    if (result2 === void 0 && isEdited) {
      edits.push([key, node]);
    }
    if (isLeaving) {
      path.pop();
    } else {
      var _node$kind;
      stack = {
        inArray,
        index,
        keys,
        edits,
        prev: stack
      };
      inArray = Array.isArray(node);
      keys = inArray ? node : (_node$kind = visitorKeys[node.kind]) !== null && _node$kind !== void 0 ? _node$kind : [];
      index = -1;
      edits = [];
      if (parent) {
        ancestors.push(parent);
      }
      parent = node;
    }
  } while (stack !== void 0);
  if (edits.length !== 0) {
    return edits[edits.length - 1][1];
  }
  return root2;
}
function visitInParallel(visitors) {
  const skipping = new Array(visitors.length).fill(null);
  const mergedVisitor = /* @__PURE__ */ Object.create(null);
  for (const kind of Object.values(Kind)) {
    let hasVisitor = false;
    const enterList = new Array(visitors.length).fill(void 0);
    const leaveList = new Array(visitors.length).fill(void 0);
    for (let i = 0; i < visitors.length; ++i) {
      const { enter, leave } = getEnterLeaveForKind(visitors[i], kind);
      hasVisitor || (hasVisitor = enter != null || leave != null);
      enterList[i] = enter;
      leaveList[i] = leave;
    }
    if (!hasVisitor) {
      continue;
    }
    const mergedEnterLeave = {
      enter(...args) {
        const node = args[0];
        for (let i = 0; i < visitors.length; i++) {
          if (skipping[i] === null) {
            var _enterList$i;
            const result2 = (_enterList$i = enterList[i]) === null || _enterList$i === void 0 ? void 0 : _enterList$i.apply(visitors[i], args);
            if (result2 === false) {
              skipping[i] = node;
            } else if (result2 === BREAK) {
              skipping[i] = BREAK;
            } else if (result2 !== void 0) {
              return result2;
            }
          }
        }
      },
      leave(...args) {
        const node = args[0];
        for (let i = 0; i < visitors.length; i++) {
          if (skipping[i] === null) {
            var _leaveList$i;
            const result2 = (_leaveList$i = leaveList[i]) === null || _leaveList$i === void 0 ? void 0 : _leaveList$i.apply(visitors[i], args);
            if (result2 === BREAK) {
              skipping[i] = BREAK;
            } else if (result2 !== void 0 && result2 !== false) {
              return result2;
            }
          } else if (skipping[i] === node) {
            skipping[i] = null;
          }
        }
      }
    };
    mergedVisitor[kind] = mergedEnterLeave;
  }
  return mergedVisitor;
}
function getEnterLeaveForKind(visitor, kind) {
  const kindVisitor = visitor[kind];
  if (typeof kindVisitor === "object") {
    return kindVisitor;
  } else if (typeof kindVisitor === "function") {
    return {
      enter: kindVisitor,
      leave: void 0
    };
  }
  return {
    enter: visitor.enter,
    leave: visitor.leave
  };
}
function getVisitFn(visitor, kind, isLeaving) {
  const { enter, leave } = getEnterLeaveForKind(visitor, kind);
  return isLeaving ? leave : enter;
}
var BREAK;
var init_visitor = __esm({
  "../node_modules/graphql/language/visitor.mjs"() {
    init_devAssert();
    init_inspect();
    init_ast();
    init_kinds();
    BREAK = Object.freeze({});
  }
});

// ../node_modules/graphql/language/printer.mjs
function print(ast) {
  return visit(ast, printDocASTReducer);
}
function join(maybeArray, separator = "") {
  var _maybeArray$filter$jo;
  return (_maybeArray$filter$jo = maybeArray === null || maybeArray === void 0 ? void 0 : maybeArray.filter((x) => x).join(separator)) !== null && _maybeArray$filter$jo !== void 0 ? _maybeArray$filter$jo : "";
}
function block(array) {
  return wrap("{\n", indent(join(array, "\n")), "\n}");
}
function wrap(start, maybeString, end = "") {
  return maybeString != null && maybeString !== "" ? start + maybeString + end : "";
}
function indent(str) {
  return wrap("  ", str.replace(/\n/g, "\n  "));
}
function hasMultilineItems(maybeArray) {
  var _maybeArray$some;
  return (_maybeArray$some = maybeArray === null || maybeArray === void 0 ? void 0 : maybeArray.some((str) => str.includes("\n"))) !== null && _maybeArray$some !== void 0 ? _maybeArray$some : false;
}
var MAX_LINE_LENGTH, printDocASTReducer;
var init_printer = __esm({
  "../node_modules/graphql/language/printer.mjs"() {
    init_blockString();
    init_printString();
    init_visitor();
    MAX_LINE_LENGTH = 80;
    printDocASTReducer = {
      Name: {
        leave: (node) => node.value
      },
      Variable: {
        leave: (node) => "$" + node.name
      },
      // Document
      Document: {
        leave: (node) => join(node.definitions, "\n\n")
      },
      OperationDefinition: {
        leave(node) {
          const varDefs = wrap("(", join(node.variableDefinitions, ", "), ")");
          const prefix = join(
            [
              node.operation,
              join([node.name, varDefs]),
              join(node.directives, " ")
            ],
            " "
          );
          return (prefix === "query" ? "" : prefix + " ") + node.selectionSet;
        }
      },
      VariableDefinition: {
        leave: ({ variable, type, defaultValue, directives }) => variable + ": " + type + wrap(" = ", defaultValue) + wrap(" ", join(directives, " "))
      },
      SelectionSet: {
        leave: ({ selections }) => block(selections)
      },
      Field: {
        leave({ alias, name, arguments: args, directives, selectionSet }) {
          const prefix = wrap("", alias, ": ") + name;
          let argsLine = prefix + wrap("(", join(args, ", "), ")");
          if (argsLine.length > MAX_LINE_LENGTH) {
            argsLine = prefix + wrap("(\n", indent(join(args, "\n")), "\n)");
          }
          return join([argsLine, join(directives, " "), selectionSet], " ");
        }
      },
      Argument: {
        leave: ({ name, value }) => name + ": " + value
      },
      // Fragments
      FragmentSpread: {
        leave: ({ name, directives }) => "..." + name + wrap(" ", join(directives, " "))
      },
      InlineFragment: {
        leave: ({ typeCondition, directives, selectionSet }) => join(
          [
            "...",
            wrap("on ", typeCondition),
            join(directives, " "),
            selectionSet
          ],
          " "
        )
      },
      FragmentDefinition: {
        leave: ({ name, typeCondition, variableDefinitions, directives, selectionSet }) => (
          // or removed in the future.
          `fragment ${name}${wrap("(", join(variableDefinitions, ", "), ")")} on ${typeCondition} ${wrap("", join(directives, " "), " ")}` + selectionSet
        )
      },
      // Value
      IntValue: {
        leave: ({ value }) => value
      },
      FloatValue: {
        leave: ({ value }) => value
      },
      StringValue: {
        leave: ({ value, block: isBlockString }) => isBlockString ? printBlockString(value) : printString(value)
      },
      BooleanValue: {
        leave: ({ value }) => value ? "true" : "false"
      },
      NullValue: {
        leave: () => "null"
      },
      EnumValue: {
        leave: ({ value }) => value
      },
      ListValue: {
        leave: ({ values }) => "[" + join(values, ", ") + "]"
      },
      ObjectValue: {
        leave: ({ fields }) => "{" + join(fields, ", ") + "}"
      },
      ObjectField: {
        leave: ({ name, value }) => name + ": " + value
      },
      // Directive
      Directive: {
        leave: ({ name, arguments: args }) => "@" + name + wrap("(", join(args, ", "), ")")
      },
      // Type
      NamedType: {
        leave: ({ name }) => name
      },
      ListType: {
        leave: ({ type }) => "[" + type + "]"
      },
      NonNullType: {
        leave: ({ type }) => type + "!"
      },
      // Type System Definitions
      SchemaDefinition: {
        leave: ({ description, directives, operationTypes }) => wrap("", description, "\n") + join(["schema", join(directives, " "), block(operationTypes)], " ")
      },
      OperationTypeDefinition: {
        leave: ({ operation, type }) => operation + ": " + type
      },
      ScalarTypeDefinition: {
        leave: ({ description, name, directives }) => wrap("", description, "\n") + join(["scalar", name, join(directives, " ")], " ")
      },
      ObjectTypeDefinition: {
        leave: ({ description, name, interfaces, directives, fields }) => wrap("", description, "\n") + join(
          [
            "type",
            name,
            wrap("implements ", join(interfaces, " & ")),
            join(directives, " "),
            block(fields)
          ],
          " "
        )
      },
      FieldDefinition: {
        leave: ({ description, name, arguments: args, type, directives }) => wrap("", description, "\n") + name + (hasMultilineItems(args) ? wrap("(\n", indent(join(args, "\n")), "\n)") : wrap("(", join(args, ", "), ")")) + ": " + type + wrap(" ", join(directives, " "))
      },
      InputValueDefinition: {
        leave: ({ description, name, type, defaultValue, directives }) => wrap("", description, "\n") + join(
          [name + ": " + type, wrap("= ", defaultValue), join(directives, " ")],
          " "
        )
      },
      InterfaceTypeDefinition: {
        leave: ({ description, name, interfaces, directives, fields }) => wrap("", description, "\n") + join(
          [
            "interface",
            name,
            wrap("implements ", join(interfaces, " & ")),
            join(directives, " "),
            block(fields)
          ],
          " "
        )
      },
      UnionTypeDefinition: {
        leave: ({ description, name, directives, types }) => wrap("", description, "\n") + join(
          ["union", name, join(directives, " "), wrap("= ", join(types, " | "))],
          " "
        )
      },
      EnumTypeDefinition: {
        leave: ({ description, name, directives, values }) => wrap("", description, "\n") + join(["enum", name, join(directives, " "), block(values)], " ")
      },
      EnumValueDefinition: {
        leave: ({ description, name, directives }) => wrap("", description, "\n") + join([name, join(directives, " ")], " ")
      },
      InputObjectTypeDefinition: {
        leave: ({ description, name, directives, fields }) => wrap("", description, "\n") + join(["input", name, join(directives, " "), block(fields)], " ")
      },
      DirectiveDefinition: {
        leave: ({ description, name, arguments: args, repeatable, locations }) => wrap("", description, "\n") + "directive @" + name + (hasMultilineItems(args) ? wrap("(\n", indent(join(args, "\n")), "\n)") : wrap("(", join(args, ", "), ")")) + (repeatable ? " repeatable" : "") + " on " + join(locations, " | ")
      },
      SchemaExtension: {
        leave: ({ directives, operationTypes }) => join(
          ["extend schema", join(directives, " "), block(operationTypes)],
          " "
        )
      },
      ScalarTypeExtension: {
        leave: ({ name, directives }) => join(["extend scalar", name, join(directives, " ")], " ")
      },
      ObjectTypeExtension: {
        leave: ({ name, interfaces, directives, fields }) => join(
          [
            "extend type",
            name,
            wrap("implements ", join(interfaces, " & ")),
            join(directives, " "),
            block(fields)
          ],
          " "
        )
      },
      InterfaceTypeExtension: {
        leave: ({ name, interfaces, directives, fields }) => join(
          [
            "extend interface",
            name,
            wrap("implements ", join(interfaces, " & ")),
            join(directives, " "),
            block(fields)
          ],
          " "
        )
      },
      UnionTypeExtension: {
        leave: ({ name, directives, types }) => join(
          [
            "extend union",
            name,
            join(directives, " "),
            wrap("= ", join(types, " | "))
          ],
          " "
        )
      },
      EnumTypeExtension: {
        leave: ({ name, directives, values }) => join(["extend enum", name, join(directives, " "), block(values)], " ")
      },
      InputObjectTypeExtension: {
        leave: ({ name, directives, fields }) => join(["extend input", name, join(directives, " "), block(fields)], " ")
      }
    };
  }
});

// ../node_modules/graphql/utilities/valueFromASTUntyped.mjs
function valueFromASTUntyped(valueNode, variables) {
  switch (valueNode.kind) {
    case Kind.NULL:
      return null;
    case Kind.INT:
      return parseInt(valueNode.value, 10);
    case Kind.FLOAT:
      return parseFloat(valueNode.value);
    case Kind.STRING:
    case Kind.ENUM:
    case Kind.BOOLEAN:
      return valueNode.value;
    case Kind.LIST:
      return valueNode.values.map(
        (node) => valueFromASTUntyped(node, variables)
      );
    case Kind.OBJECT:
      return keyValMap(
        valueNode.fields,
        (field) => field.name.value,
        (field) => valueFromASTUntyped(field.value, variables)
      );
    case Kind.VARIABLE:
      return variables === null || variables === void 0 ? void 0 : variables[valueNode.name.value];
  }
}
var init_valueFromASTUntyped = __esm({
  "../node_modules/graphql/utilities/valueFromASTUntyped.mjs"() {
    init_keyValMap();
    init_kinds();
  }
});

// ../node_modules/graphql/type/assertName.mjs
function assertName(name) {
  name != null || devAssert(false, "Must provide name.");
  typeof name === "string" || devAssert(false, "Expected name to be a string.");
  if (name.length === 0) {
    throw new GraphQLError("Expected name to be a non-empty string.");
  }
  for (let i = 1; i < name.length; ++i) {
    if (!isNameContinue(name.charCodeAt(i))) {
      throw new GraphQLError(
        `Names must only contain [_a-zA-Z0-9] but "${name}" does not.`
      );
    }
  }
  if (!isNameStart(name.charCodeAt(0))) {
    throw new GraphQLError(
      `Names must start with [_a-zA-Z] but "${name}" does not.`
    );
  }
  return name;
}
function assertEnumValueName(name) {
  if (name === "true" || name === "false" || name === "null") {
    throw new GraphQLError(`Enum values cannot be named: ${name}`);
  }
  return assertName(name);
}
var init_assertName = __esm({
  "../node_modules/graphql/type/assertName.mjs"() {
    init_devAssert();
    init_GraphQLError();
    init_characterClasses();
  }
});

// ../node_modules/graphql/type/definition.mjs
function isType(type) {
  return isScalarType(type) || isObjectType(type) || isInterfaceType(type) || isUnionType(type) || isEnumType(type) || isInputObjectType(type) || isListType(type) || isNonNullType(type);
}
function assertType(type) {
  if (!isType(type)) {
    throw new Error(`Expected ${inspect(type)} to be a GraphQL type.`);
  }
  return type;
}
function isScalarType(type) {
  return instanceOf(type, GraphQLScalarType);
}
function assertScalarType(type) {
  if (!isScalarType(type)) {
    throw new Error(`Expected ${inspect(type)} to be a GraphQL Scalar type.`);
  }
  return type;
}
function isObjectType(type) {
  return instanceOf(type, GraphQLObjectType);
}
function assertObjectType(type) {
  if (!isObjectType(type)) {
    throw new Error(`Expected ${inspect(type)} to be a GraphQL Object type.`);
  }
  return type;
}
function isInterfaceType(type) {
  return instanceOf(type, GraphQLInterfaceType);
}
function assertInterfaceType(type) {
  if (!isInterfaceType(type)) {
    throw new Error(
      `Expected ${inspect(type)} to be a GraphQL Interface type.`
    );
  }
  return type;
}
function isUnionType(type) {
  return instanceOf(type, GraphQLUnionType);
}
function assertUnionType(type) {
  if (!isUnionType(type)) {
    throw new Error(`Expected ${inspect(type)} to be a GraphQL Union type.`);
  }
  return type;
}
function isEnumType(type) {
  return instanceOf(type, GraphQLEnumType);
}
function assertEnumType(type) {
  if (!isEnumType(type)) {
    throw new Error(`Expected ${inspect(type)} to be a GraphQL Enum type.`);
  }
  return type;
}
function isInputObjectType(type) {
  return instanceOf(type, GraphQLInputObjectType);
}
function assertInputObjectType(type) {
  if (!isInputObjectType(type)) {
    throw new Error(
      `Expected ${inspect(type)} to be a GraphQL Input Object type.`
    );
  }
  return type;
}
function isListType(type) {
  return instanceOf(type, GraphQLList);
}
function assertListType(type) {
  if (!isListType(type)) {
    throw new Error(`Expected ${inspect(type)} to be a GraphQL List type.`);
  }
  return type;
}
function isNonNullType(type) {
  return instanceOf(type, GraphQLNonNull);
}
function assertNonNullType(type) {
  if (!isNonNullType(type)) {
    throw new Error(`Expected ${inspect(type)} to be a GraphQL Non-Null type.`);
  }
  return type;
}
function isInputType(type) {
  return isScalarType(type) || isEnumType(type) || isInputObjectType(type) || isWrappingType(type) && isInputType(type.ofType);
}
function assertInputType(type) {
  if (!isInputType(type)) {
    throw new Error(`Expected ${inspect(type)} to be a GraphQL input type.`);
  }
  return type;
}
function isOutputType(type) {
  return isScalarType(type) || isObjectType(type) || isInterfaceType(type) || isUnionType(type) || isEnumType(type) || isWrappingType(type) && isOutputType(type.ofType);
}
function assertOutputType(type) {
  if (!isOutputType(type)) {
    throw new Error(`Expected ${inspect(type)} to be a GraphQL output type.`);
  }
  return type;
}
function isLeafType(type) {
  return isScalarType(type) || isEnumType(type);
}
function assertLeafType(type) {
  if (!isLeafType(type)) {
    throw new Error(`Expected ${inspect(type)} to be a GraphQL leaf type.`);
  }
  return type;
}
function isCompositeType(type) {
  return isObjectType(type) || isInterfaceType(type) || isUnionType(type);
}
function assertCompositeType(type) {
  if (!isCompositeType(type)) {
    throw new Error(
      `Expected ${inspect(type)} to be a GraphQL composite type.`
    );
  }
  return type;
}
function isAbstractType(type) {
  return isInterfaceType(type) || isUnionType(type);
}
function assertAbstractType(type) {
  if (!isAbstractType(type)) {
    throw new Error(`Expected ${inspect(type)} to be a GraphQL abstract type.`);
  }
  return type;
}
function isWrappingType(type) {
  return isListType(type) || isNonNullType(type);
}
function assertWrappingType(type) {
  if (!isWrappingType(type)) {
    throw new Error(`Expected ${inspect(type)} to be a GraphQL wrapping type.`);
  }
  return type;
}
function isNullableType(type) {
  return isType(type) && !isNonNullType(type);
}
function assertNullableType(type) {
  if (!isNullableType(type)) {
    throw new Error(`Expected ${inspect(type)} to be a GraphQL nullable type.`);
  }
  return type;
}
function getNullableType(type) {
  if (type) {
    return isNonNullType(type) ? type.ofType : type;
  }
}
function isNamedType(type) {
  return isScalarType(type) || isObjectType(type) || isInterfaceType(type) || isUnionType(type) || isEnumType(type) || isInputObjectType(type);
}
function assertNamedType(type) {
  if (!isNamedType(type)) {
    throw new Error(`Expected ${inspect(type)} to be a GraphQL named type.`);
  }
  return type;
}
function getNamedType(type) {
  if (type) {
    let unwrappedType = type;
    while (isWrappingType(unwrappedType)) {
      unwrappedType = unwrappedType.ofType;
    }
    return unwrappedType;
  }
}
function resolveReadonlyArrayThunk(thunk) {
  return typeof thunk === "function" ? thunk() : thunk;
}
function resolveObjMapThunk(thunk) {
  return typeof thunk === "function" ? thunk() : thunk;
}
function defineInterfaces(config) {
  var _config$interfaces;
  const interfaces = resolveReadonlyArrayThunk(
    (_config$interfaces = config.interfaces) !== null && _config$interfaces !== void 0 ? _config$interfaces : []
  );
  Array.isArray(interfaces) || devAssert(
    false,
    `${config.name} interfaces must be an Array or a function which returns an Array.`
  );
  return interfaces;
}
function defineFieldMap(config) {
  const fieldMap = resolveObjMapThunk(config.fields);
  isPlainObj(fieldMap) || devAssert(
    false,
    `${config.name} fields must be an object with field names as keys or a function which returns such an object.`
  );
  return mapValue(fieldMap, (fieldConfig, fieldName) => {
    var _fieldConfig$args;
    isPlainObj(fieldConfig) || devAssert(
      false,
      `${config.name}.${fieldName} field config must be an object.`
    );
    fieldConfig.resolve == null || typeof fieldConfig.resolve === "function" || devAssert(
      false,
      `${config.name}.${fieldName} field resolver must be a function if provided, but got: ${inspect(fieldConfig.resolve)}.`
    );
    const argsConfig = (_fieldConfig$args = fieldConfig.args) !== null && _fieldConfig$args !== void 0 ? _fieldConfig$args : {};
    isPlainObj(argsConfig) || devAssert(
      false,
      `${config.name}.${fieldName} args must be an object with argument names as keys.`
    );
    return {
      name: assertName(fieldName),
      description: fieldConfig.description,
      type: fieldConfig.type,
      args: defineArguments(argsConfig),
      resolve: fieldConfig.resolve,
      subscribe: fieldConfig.subscribe,
      deprecationReason: fieldConfig.deprecationReason,
      extensions: toObjMap(fieldConfig.extensions),
      astNode: fieldConfig.astNode
    };
  });
}
function defineArguments(config) {
  return Object.entries(config).map(([argName, argConfig]) => ({
    name: assertName(argName),
    description: argConfig.description,
    type: argConfig.type,
    defaultValue: argConfig.defaultValue,
    deprecationReason: argConfig.deprecationReason,
    extensions: toObjMap(argConfig.extensions),
    astNode: argConfig.astNode
  }));
}
function isPlainObj(obj) {
  return isObjectLike(obj) && !Array.isArray(obj);
}
function fieldsToFieldsConfig(fields) {
  return mapValue(fields, (field) => ({
    description: field.description,
    type: field.type,
    args: argsToArgsConfig(field.args),
    resolve: field.resolve,
    subscribe: field.subscribe,
    deprecationReason: field.deprecationReason,
    extensions: field.extensions,
    astNode: field.astNode
  }));
}
function argsToArgsConfig(args) {
  return keyValMap(
    args,
    (arg) => arg.name,
    (arg) => ({
      description: arg.description,
      type: arg.type,
      defaultValue: arg.defaultValue,
      deprecationReason: arg.deprecationReason,
      extensions: arg.extensions,
      astNode: arg.astNode
    })
  );
}
function isRequiredArgument(arg) {
  return isNonNullType(arg.type) && arg.defaultValue === void 0;
}
function defineTypes(config) {
  const types = resolveReadonlyArrayThunk(config.types);
  Array.isArray(types) || devAssert(
    false,
    `Must provide Array of types or a function which returns such an array for Union ${config.name}.`
  );
  return types;
}
function didYouMeanEnumValue(enumType, unknownValueStr) {
  const allNames = enumType.getValues().map((value) => value.name);
  const suggestedValues = suggestionList(unknownValueStr, allNames);
  return didYouMean("the enum value", suggestedValues);
}
function defineEnumValues(typeName, valueMap) {
  isPlainObj(valueMap) || devAssert(
    false,
    `${typeName} values must be an object with value names as keys.`
  );
  return Object.entries(valueMap).map(([valueName, valueConfig]) => {
    isPlainObj(valueConfig) || devAssert(
      false,
      `${typeName}.${valueName} must refer to an object with a "value" key representing an internal value but got: ${inspect(valueConfig)}.`
    );
    return {
      name: assertEnumValueName(valueName),
      description: valueConfig.description,
      value: valueConfig.value !== void 0 ? valueConfig.value : valueName,
      deprecationReason: valueConfig.deprecationReason,
      extensions: toObjMap(valueConfig.extensions),
      astNode: valueConfig.astNode
    };
  });
}
function defineInputFieldMap(config) {
  const fieldMap = resolveObjMapThunk(config.fields);
  isPlainObj(fieldMap) || devAssert(
    false,
    `${config.name} fields must be an object with field names as keys or a function which returns such an object.`
  );
  return mapValue(fieldMap, (fieldConfig, fieldName) => {
    !("resolve" in fieldConfig) || devAssert(
      false,
      `${config.name}.${fieldName} field has a resolve property, but Input Types cannot define resolvers.`
    );
    return {
      name: assertName(fieldName),
      description: fieldConfig.description,
      type: fieldConfig.type,
      defaultValue: fieldConfig.defaultValue,
      deprecationReason: fieldConfig.deprecationReason,
      extensions: toObjMap(fieldConfig.extensions),
      astNode: fieldConfig.astNode
    };
  });
}
function isRequiredInputField(field) {
  return isNonNullType(field.type) && field.defaultValue === void 0;
}
var GraphQLList, GraphQLNonNull, GraphQLScalarType, GraphQLObjectType, GraphQLInterfaceType, GraphQLUnionType, GraphQLEnumType, GraphQLInputObjectType;
var init_definition = __esm({
  "../node_modules/graphql/type/definition.mjs"() {
    init_devAssert();
    init_didYouMean();
    init_identityFunc();
    init_inspect();
    init_instanceOf();
    init_isObjectLike();
    init_keyMap();
    init_keyValMap();
    init_mapValue();
    init_suggestionList();
    init_toObjMap();
    init_GraphQLError();
    init_kinds();
    init_printer();
    init_valueFromASTUntyped();
    init_assertName();
    GraphQLList = class {
      constructor(ofType) {
        isType(ofType) || devAssert(false, `Expected ${inspect(ofType)} to be a GraphQL type.`);
        this.ofType = ofType;
      }
      get [Symbol.toStringTag]() {
        return "GraphQLList";
      }
      toString() {
        return "[" + String(this.ofType) + "]";
      }
      toJSON() {
        return this.toString();
      }
    };
    GraphQLNonNull = class {
      constructor(ofType) {
        isNullableType(ofType) || devAssert(
          false,
          `Expected ${inspect(ofType)} to be a GraphQL nullable type.`
        );
        this.ofType = ofType;
      }
      get [Symbol.toStringTag]() {
        return "GraphQLNonNull";
      }
      toString() {
        return String(this.ofType) + "!";
      }
      toJSON() {
        return this.toString();
      }
    };
    GraphQLScalarType = class {
      constructor(config) {
        var _config$parseValue, _config$serialize, _config$parseLiteral, _config$extensionASTN;
        const parseValue2 = (_config$parseValue = config.parseValue) !== null && _config$parseValue !== void 0 ? _config$parseValue : identityFunc;
        this.name = assertName(config.name);
        this.description = config.description;
        this.specifiedByURL = config.specifiedByURL;
        this.serialize = (_config$serialize = config.serialize) !== null && _config$serialize !== void 0 ? _config$serialize : identityFunc;
        this.parseValue = parseValue2;
        this.parseLiteral = (_config$parseLiteral = config.parseLiteral) !== null && _config$parseLiteral !== void 0 ? _config$parseLiteral : (node, variables) => parseValue2(valueFromASTUntyped(node, variables));
        this.extensions = toObjMap(config.extensions);
        this.astNode = config.astNode;
        this.extensionASTNodes = (_config$extensionASTN = config.extensionASTNodes) !== null && _config$extensionASTN !== void 0 ? _config$extensionASTN : [];
        config.specifiedByURL == null || typeof config.specifiedByURL === "string" || devAssert(
          false,
          `${this.name} must provide "specifiedByURL" as a string, but got: ${inspect(config.specifiedByURL)}.`
        );
        config.serialize == null || typeof config.serialize === "function" || devAssert(
          false,
          `${this.name} must provide "serialize" function. If this custom Scalar is also used as an input type, ensure "parseValue" and "parseLiteral" functions are also provided.`
        );
        if (config.parseLiteral) {
          typeof config.parseValue === "function" && typeof config.parseLiteral === "function" || devAssert(
            false,
            `${this.name} must provide both "parseValue" and "parseLiteral" functions.`
          );
        }
      }
      get [Symbol.toStringTag]() {
        return "GraphQLScalarType";
      }
      toConfig() {
        return {
          name: this.name,
          description: this.description,
          specifiedByURL: this.specifiedByURL,
          serialize: this.serialize,
          parseValue: this.parseValue,
          parseLiteral: this.parseLiteral,
          extensions: this.extensions,
          astNode: this.astNode,
          extensionASTNodes: this.extensionASTNodes
        };
      }
      toString() {
        return this.name;
      }
      toJSON() {
        return this.toString();
      }
    };
    GraphQLObjectType = class {
      constructor(config) {
        var _config$extensionASTN2;
        this.name = assertName(config.name);
        this.description = config.description;
        this.isTypeOf = config.isTypeOf;
        this.extensions = toObjMap(config.extensions);
        this.astNode = config.astNode;
        this.extensionASTNodes = (_config$extensionASTN2 = config.extensionASTNodes) !== null && _config$extensionASTN2 !== void 0 ? _config$extensionASTN2 : [];
        this._fields = () => defineFieldMap(config);
        this._interfaces = () => defineInterfaces(config);
        config.isTypeOf == null || typeof config.isTypeOf === "function" || devAssert(
          false,
          `${this.name} must provide "isTypeOf" as a function, but got: ${inspect(config.isTypeOf)}.`
        );
      }
      get [Symbol.toStringTag]() {
        return "GraphQLObjectType";
      }
      getFields() {
        if (typeof this._fields === "function") {
          this._fields = this._fields();
        }
        return this._fields;
      }
      getInterfaces() {
        if (typeof this._interfaces === "function") {
          this._interfaces = this._interfaces();
        }
        return this._interfaces;
      }
      toConfig() {
        return {
          name: this.name,
          description: this.description,
          interfaces: this.getInterfaces(),
          fields: fieldsToFieldsConfig(this.getFields()),
          isTypeOf: this.isTypeOf,
          extensions: this.extensions,
          astNode: this.astNode,
          extensionASTNodes: this.extensionASTNodes
        };
      }
      toString() {
        return this.name;
      }
      toJSON() {
        return this.toString();
      }
    };
    GraphQLInterfaceType = class {
      constructor(config) {
        var _config$extensionASTN3;
        this.name = assertName(config.name);
        this.description = config.description;
        this.resolveType = config.resolveType;
        this.extensions = toObjMap(config.extensions);
        this.astNode = config.astNode;
        this.extensionASTNodes = (_config$extensionASTN3 = config.extensionASTNodes) !== null && _config$extensionASTN3 !== void 0 ? _config$extensionASTN3 : [];
        this._fields = defineFieldMap.bind(void 0, config);
        this._interfaces = defineInterfaces.bind(void 0, config);
        config.resolveType == null || typeof config.resolveType === "function" || devAssert(
          false,
          `${this.name} must provide "resolveType" as a function, but got: ${inspect(config.resolveType)}.`
        );
      }
      get [Symbol.toStringTag]() {
        return "GraphQLInterfaceType";
      }
      getFields() {
        if (typeof this._fields === "function") {
          this._fields = this._fields();
        }
        return this._fields;
      }
      getInterfaces() {
        if (typeof this._interfaces === "function") {
          this._interfaces = this._interfaces();
        }
        return this._interfaces;
      }
      toConfig() {
        return {
          name: this.name,
          description: this.description,
          interfaces: this.getInterfaces(),
          fields: fieldsToFieldsConfig(this.getFields()),
          resolveType: this.resolveType,
          extensions: this.extensions,
          astNode: this.astNode,
          extensionASTNodes: this.extensionASTNodes
        };
      }
      toString() {
        return this.name;
      }
      toJSON() {
        return this.toString();
      }
    };
    GraphQLUnionType = class {
      constructor(config) {
        var _config$extensionASTN4;
        this.name = assertName(config.name);
        this.description = config.description;
        this.resolveType = config.resolveType;
        this.extensions = toObjMap(config.extensions);
        this.astNode = config.astNode;
        this.extensionASTNodes = (_config$extensionASTN4 = config.extensionASTNodes) !== null && _config$extensionASTN4 !== void 0 ? _config$extensionASTN4 : [];
        this._types = defineTypes.bind(void 0, config);
        config.resolveType == null || typeof config.resolveType === "function" || devAssert(
          false,
          `${this.name} must provide "resolveType" as a function, but got: ${inspect(config.resolveType)}.`
        );
      }
      get [Symbol.toStringTag]() {
        return "GraphQLUnionType";
      }
      getTypes() {
        if (typeof this._types === "function") {
          this._types = this._types();
        }
        return this._types;
      }
      toConfig() {
        return {
          name: this.name,
          description: this.description,
          types: this.getTypes(),
          resolveType: this.resolveType,
          extensions: this.extensions,
          astNode: this.astNode,
          extensionASTNodes: this.extensionASTNodes
        };
      }
      toString() {
        return this.name;
      }
      toJSON() {
        return this.toString();
      }
    };
    GraphQLEnumType = class {
      /* <T> */
      constructor(config) {
        var _config$extensionASTN5;
        this.name = assertName(config.name);
        this.description = config.description;
        this.extensions = toObjMap(config.extensions);
        this.astNode = config.astNode;
        this.extensionASTNodes = (_config$extensionASTN5 = config.extensionASTNodes) !== null && _config$extensionASTN5 !== void 0 ? _config$extensionASTN5 : [];
        this._values = typeof config.values === "function" ? config.values : defineEnumValues(this.name, config.values);
        this._valueLookup = null;
        this._nameLookup = null;
      }
      get [Symbol.toStringTag]() {
        return "GraphQLEnumType";
      }
      getValues() {
        if (typeof this._values === "function") {
          this._values = defineEnumValues(this.name, this._values());
        }
        return this._values;
      }
      getValue(name) {
        if (this._nameLookup === null) {
          this._nameLookup = keyMap(this.getValues(), (value) => value.name);
        }
        return this._nameLookup[name];
      }
      serialize(outputValue) {
        if (this._valueLookup === null) {
          this._valueLookup = new Map(
            this.getValues().map((enumValue2) => [enumValue2.value, enumValue2])
          );
        }
        const enumValue = this._valueLookup.get(outputValue);
        if (enumValue === void 0) {
          throw new GraphQLError(
            `Enum "${this.name}" cannot represent value: ${inspect(outputValue)}`
          );
        }
        return enumValue.name;
      }
      parseValue(inputValue) {
        if (typeof inputValue !== "string") {
          const valueStr = inspect(inputValue);
          throw new GraphQLError(
            `Enum "${this.name}" cannot represent non-string value: ${valueStr}.` + didYouMeanEnumValue(this, valueStr)
          );
        }
        const enumValue = this.getValue(inputValue);
        if (enumValue == null) {
          throw new GraphQLError(
            `Value "${inputValue}" does not exist in "${this.name}" enum.` + didYouMeanEnumValue(this, inputValue)
          );
        }
        return enumValue.value;
      }
      parseLiteral(valueNode, _variables) {
        if (valueNode.kind !== Kind.ENUM) {
          const valueStr = print(valueNode);
          throw new GraphQLError(
            `Enum "${this.name}" cannot represent non-enum value: ${valueStr}.` + didYouMeanEnumValue(this, valueStr),
            {
              nodes: valueNode
            }
          );
        }
        const enumValue = this.getValue(valueNode.value);
        if (enumValue == null) {
          const valueStr = print(valueNode);
          throw new GraphQLError(
            `Value "${valueStr}" does not exist in "${this.name}" enum.` + didYouMeanEnumValue(this, valueStr),
            {
              nodes: valueNode
            }
          );
        }
        return enumValue.value;
      }
      toConfig() {
        const values = keyValMap(
          this.getValues(),
          (value) => value.name,
          (value) => ({
            description: value.description,
            value: value.value,
            deprecationReason: value.deprecationReason,
            extensions: value.extensions,
            astNode: value.astNode
          })
        );
        return {
          name: this.name,
          description: this.description,
          values,
          extensions: this.extensions,
          astNode: this.astNode,
          extensionASTNodes: this.extensionASTNodes
        };
      }
      toString() {
        return this.name;
      }
      toJSON() {
        return this.toString();
      }
    };
    GraphQLInputObjectType = class {
      constructor(config) {
        var _config$extensionASTN6, _config$isOneOf;
        this.name = assertName(config.name);
        this.description = config.description;
        this.extensions = toObjMap(config.extensions);
        this.astNode = config.astNode;
        this.extensionASTNodes = (_config$extensionASTN6 = config.extensionASTNodes) !== null && _config$extensionASTN6 !== void 0 ? _config$extensionASTN6 : [];
        this.isOneOf = (_config$isOneOf = config.isOneOf) !== null && _config$isOneOf !== void 0 ? _config$isOneOf : false;
        this._fields = defineInputFieldMap.bind(void 0, config);
      }
      get [Symbol.toStringTag]() {
        return "GraphQLInputObjectType";
      }
      getFields() {
        if (typeof this._fields === "function") {
          this._fields = this._fields();
        }
        return this._fields;
      }
      toConfig() {
        const fields = mapValue(this.getFields(), (field) => ({
          description: field.description,
          type: field.type,
          defaultValue: field.defaultValue,
          deprecationReason: field.deprecationReason,
          extensions: field.extensions,
          astNode: field.astNode
        }));
        return {
          name: this.name,
          description: this.description,
          fields,
          extensions: this.extensions,
          astNode: this.astNode,
          extensionASTNodes: this.extensionASTNodes,
          isOneOf: this.isOneOf
        };
      }
      toString() {
        return this.name;
      }
      toJSON() {
        return this.toString();
      }
    };
  }
});

// ../node_modules/graphql/utilities/typeComparators.mjs
function isEqualType(typeA, typeB) {
  if (typeA === typeB) {
    return true;
  }
  if (isNonNullType(typeA) && isNonNullType(typeB)) {
    return isEqualType(typeA.ofType, typeB.ofType);
  }
  if (isListType(typeA) && isListType(typeB)) {
    return isEqualType(typeA.ofType, typeB.ofType);
  }
  return false;
}
function isTypeSubTypeOf(schema, maybeSubType, superType) {
  if (maybeSubType === superType) {
    return true;
  }
  if (isNonNullType(superType)) {
    if (isNonNullType(maybeSubType)) {
      return isTypeSubTypeOf(schema, maybeSubType.ofType, superType.ofType);
    }
    return false;
  }
  if (isNonNullType(maybeSubType)) {
    return isTypeSubTypeOf(schema, maybeSubType.ofType, superType);
  }
  if (isListType(superType)) {
    if (isListType(maybeSubType)) {
      return isTypeSubTypeOf(schema, maybeSubType.ofType, superType.ofType);
    }
    return false;
  }
  if (isListType(maybeSubType)) {
    return false;
  }
  return isAbstractType(superType) && (isInterfaceType(maybeSubType) || isObjectType(maybeSubType)) && schema.isSubType(superType, maybeSubType);
}
function doTypesOverlap(schema, typeA, typeB) {
  if (typeA === typeB) {
    return true;
  }
  if (isAbstractType(typeA)) {
    if (isAbstractType(typeB)) {
      return schema.getPossibleTypes(typeA).some((type) => schema.isSubType(typeB, type));
    }
    return schema.isSubType(typeA, typeB);
  }
  if (isAbstractType(typeB)) {
    return schema.isSubType(typeB, typeA);
  }
  return false;
}
var init_typeComparators = __esm({
  "../node_modules/graphql/utilities/typeComparators.mjs"() {
    init_definition();
  }
});

// ../node_modules/graphql/type/scalars.mjs
function isSpecifiedScalarType(type) {
  return specifiedScalarTypes.some(({ name }) => type.name === name);
}
function serializeObject(outputValue) {
  if (isObjectLike(outputValue)) {
    if (typeof outputValue.valueOf === "function") {
      const valueOfResult = outputValue.valueOf();
      if (!isObjectLike(valueOfResult)) {
        return valueOfResult;
      }
    }
    if (typeof outputValue.toJSON === "function") {
      return outputValue.toJSON();
    }
  }
  return outputValue;
}
var GRAPHQL_MAX_INT, GRAPHQL_MIN_INT, GraphQLInt, GraphQLFloat, GraphQLString, GraphQLBoolean, GraphQLID, specifiedScalarTypes;
var init_scalars = __esm({
  "../node_modules/graphql/type/scalars.mjs"() {
    init_inspect();
    init_isObjectLike();
    init_GraphQLError();
    init_kinds();
    init_printer();
    init_definition();
    GRAPHQL_MAX_INT = 2147483647;
    GRAPHQL_MIN_INT = -2147483648;
    GraphQLInt = new GraphQLScalarType({
      name: "Int",
      description: "The `Int` scalar type represents non-fractional signed whole numeric values. Int can represent values between -(2^31) and 2^31 - 1.",
      serialize(outputValue) {
        const coercedValue = serializeObject(outputValue);
        if (typeof coercedValue === "boolean") {
          return coercedValue ? 1 : 0;
        }
        let num = coercedValue;
        if (typeof coercedValue === "string" && coercedValue !== "") {
          num = Number(coercedValue);
        }
        if (typeof num !== "number" || !Number.isInteger(num)) {
          throw new GraphQLError(
            `Int cannot represent non-integer value: ${inspect(coercedValue)}`
          );
        }
        if (num > GRAPHQL_MAX_INT || num < GRAPHQL_MIN_INT) {
          throw new GraphQLError(
            "Int cannot represent non 32-bit signed integer value: " + inspect(coercedValue)
          );
        }
        return num;
      },
      parseValue(inputValue) {
        if (typeof inputValue !== "number" || !Number.isInteger(inputValue)) {
          throw new GraphQLError(
            `Int cannot represent non-integer value: ${inspect(inputValue)}`
          );
        }
        if (inputValue > GRAPHQL_MAX_INT || inputValue < GRAPHQL_MIN_INT) {
          throw new GraphQLError(
            `Int cannot represent non 32-bit signed integer value: ${inputValue}`
          );
        }
        return inputValue;
      },
      parseLiteral(valueNode) {
        if (valueNode.kind !== Kind.INT) {
          throw new GraphQLError(
            `Int cannot represent non-integer value: ${print(valueNode)}`,
            {
              nodes: valueNode
            }
          );
        }
        const num = parseInt(valueNode.value, 10);
        if (num > GRAPHQL_MAX_INT || num < GRAPHQL_MIN_INT) {
          throw new GraphQLError(
            `Int cannot represent non 32-bit signed integer value: ${valueNode.value}`,
            {
              nodes: valueNode
            }
          );
        }
        return num;
      }
    });
    GraphQLFloat = new GraphQLScalarType({
      name: "Float",
      description: "The `Float` scalar type represents signed double-precision fractional values as specified by [IEEE 754](https://en.wikipedia.org/wiki/IEEE_floating_point).",
      serialize(outputValue) {
        const coercedValue = serializeObject(outputValue);
        if (typeof coercedValue === "boolean") {
          return coercedValue ? 1 : 0;
        }
        let num = coercedValue;
        if (typeof coercedValue === "string" && coercedValue !== "") {
          num = Number(coercedValue);
        }
        if (typeof num !== "number" || !Number.isFinite(num)) {
          throw new GraphQLError(
            `Float cannot represent non numeric value: ${inspect(coercedValue)}`
          );
        }
        return num;
      },
      parseValue(inputValue) {
        if (typeof inputValue !== "number" || !Number.isFinite(inputValue)) {
          throw new GraphQLError(
            `Float cannot represent non numeric value: ${inspect(inputValue)}`
          );
        }
        return inputValue;
      },
      parseLiteral(valueNode) {
        if (valueNode.kind !== Kind.FLOAT && valueNode.kind !== Kind.INT) {
          throw new GraphQLError(
            `Float cannot represent non numeric value: ${print(valueNode)}`,
            valueNode
          );
        }
        return parseFloat(valueNode.value);
      }
    });
    GraphQLString = new GraphQLScalarType({
      name: "String",
      description: "The `String` scalar type represents textual data, represented as UTF-8 character sequences. The String type is most often used by GraphQL to represent free-form human-readable text.",
      serialize(outputValue) {
        const coercedValue = serializeObject(outputValue);
        if (typeof coercedValue === "string") {
          return coercedValue;
        }
        if (typeof coercedValue === "boolean") {
          return coercedValue ? "true" : "false";
        }
        if (typeof coercedValue === "number" && Number.isFinite(coercedValue)) {
          return coercedValue.toString();
        }
        throw new GraphQLError(
          `String cannot represent value: ${inspect(outputValue)}`
        );
      },
      parseValue(inputValue) {
        if (typeof inputValue !== "string") {
          throw new GraphQLError(
            `String cannot represent a non string value: ${inspect(inputValue)}`
          );
        }
        return inputValue;
      },
      parseLiteral(valueNode) {
        if (valueNode.kind !== Kind.STRING) {
          throw new GraphQLError(
            `String cannot represent a non string value: ${print(valueNode)}`,
            {
              nodes: valueNode
            }
          );
        }
        return valueNode.value;
      }
    });
    GraphQLBoolean = new GraphQLScalarType({
      name: "Boolean",
      description: "The `Boolean` scalar type represents `true` or `false`.",
      serialize(outputValue) {
        const coercedValue = serializeObject(outputValue);
        if (typeof coercedValue === "boolean") {
          return coercedValue;
        }
        if (Number.isFinite(coercedValue)) {
          return coercedValue !== 0;
        }
        throw new GraphQLError(
          `Boolean cannot represent a non boolean value: ${inspect(coercedValue)}`
        );
      },
      parseValue(inputValue) {
        if (typeof inputValue !== "boolean") {
          throw new GraphQLError(
            `Boolean cannot represent a non boolean value: ${inspect(inputValue)}`
          );
        }
        return inputValue;
      },
      parseLiteral(valueNode) {
        if (valueNode.kind !== Kind.BOOLEAN) {
          throw new GraphQLError(
            `Boolean cannot represent a non boolean value: ${print(valueNode)}`,
            {
              nodes: valueNode
            }
          );
        }
        return valueNode.value;
      }
    });
    GraphQLID = new GraphQLScalarType({
      name: "ID",
      description: 'The `ID` scalar type represents a unique identifier, often used to refetch an object or as key for a cache. The ID type appears in a JSON response as a String; however, it is not intended to be human-readable. When expected as an input type, any string (such as `"4"`) or integer (such as `4`) input value will be accepted as an ID.',
      serialize(outputValue) {
        const coercedValue = serializeObject(outputValue);
        if (typeof coercedValue === "string") {
          return coercedValue;
        }
        if (Number.isInteger(coercedValue)) {
          return String(coercedValue);
        }
        throw new GraphQLError(
          `ID cannot represent value: ${inspect(outputValue)}`
        );
      },
      parseValue(inputValue) {
        if (typeof inputValue === "string") {
          return inputValue;
        }
        if (typeof inputValue === "number" && Number.isInteger(inputValue)) {
          return inputValue.toString();
        }
        throw new GraphQLError(`ID cannot represent value: ${inspect(inputValue)}`);
      },
      parseLiteral(valueNode) {
        if (valueNode.kind !== Kind.STRING && valueNode.kind !== Kind.INT) {
          throw new GraphQLError(
            "ID cannot represent a non-string and non-integer value: " + print(valueNode),
            {
              nodes: valueNode
            }
          );
        }
        return valueNode.value;
      }
    });
    specifiedScalarTypes = Object.freeze([
      GraphQLString,
      GraphQLInt,
      GraphQLFloat,
      GraphQLBoolean,
      GraphQLID
    ]);
  }
});

// ../node_modules/graphql/type/directives.mjs
function isDirective(directive) {
  return instanceOf(directive, GraphQLDirective);
}
function assertDirective(directive) {
  if (!isDirective(directive)) {
    throw new Error(
      `Expected ${inspect(directive)} to be a GraphQL directive.`
    );
  }
  return directive;
}
function isSpecifiedDirective(directive) {
  return specifiedDirectives.some(({ name }) => name === directive.name);
}
var GraphQLDirective, GraphQLIncludeDirective, GraphQLSkipDirective, DEFAULT_DEPRECATION_REASON, GraphQLDeprecatedDirective, GraphQLSpecifiedByDirective, GraphQLOneOfDirective, specifiedDirectives;
var init_directives = __esm({
  "../node_modules/graphql/type/directives.mjs"() {
    init_devAssert();
    init_inspect();
    init_instanceOf();
    init_isObjectLike();
    init_toObjMap();
    init_directiveLocation();
    init_assertName();
    init_definition();
    init_scalars();
    GraphQLDirective = class {
      constructor(config) {
        var _config$isRepeatable, _config$args;
        this.name = assertName(config.name);
        this.description = config.description;
        this.locations = config.locations;
        this.isRepeatable = (_config$isRepeatable = config.isRepeatable) !== null && _config$isRepeatable !== void 0 ? _config$isRepeatable : false;
        this.extensions = toObjMap(config.extensions);
        this.astNode = config.astNode;
        Array.isArray(config.locations) || devAssert(false, `@${config.name} locations must be an Array.`);
        const args = (_config$args = config.args) !== null && _config$args !== void 0 ? _config$args : {};
        isObjectLike(args) && !Array.isArray(args) || devAssert(
          false,
          `@${config.name} args must be an object with argument names as keys.`
        );
        this.args = defineArguments(args);
      }
      get [Symbol.toStringTag]() {
        return "GraphQLDirective";
      }
      toConfig() {
        return {
          name: this.name,
          description: this.description,
          locations: this.locations,
          args: argsToArgsConfig(this.args),
          isRepeatable: this.isRepeatable,
          extensions: this.extensions,
          astNode: this.astNode
        };
      }
      toString() {
        return "@" + this.name;
      }
      toJSON() {
        return this.toString();
      }
    };
    GraphQLIncludeDirective = new GraphQLDirective({
      name: "include",
      description: "Directs the executor to include this field or fragment only when the `if` argument is true.",
      locations: [
        DirectiveLocation.FIELD,
        DirectiveLocation.FRAGMENT_SPREAD,
        DirectiveLocation.INLINE_FRAGMENT
      ],
      args: {
        if: {
          type: new GraphQLNonNull(GraphQLBoolean),
          description: "Included when true."
        }
      }
    });
    GraphQLSkipDirective = new GraphQLDirective({
      name: "skip",
      description: "Directs the executor to skip this field or fragment when the `if` argument is true.",
      locations: [
        DirectiveLocation.FIELD,
        DirectiveLocation.FRAGMENT_SPREAD,
        DirectiveLocation.INLINE_FRAGMENT
      ],
      args: {
        if: {
          type: new GraphQLNonNull(GraphQLBoolean),
          description: "Skipped when true."
        }
      }
    });
    DEFAULT_DEPRECATION_REASON = "No longer supported";
    GraphQLDeprecatedDirective = new GraphQLDirective({
      name: "deprecated",
      description: "Marks an element of a GraphQL schema as no longer supported.",
      locations: [
        DirectiveLocation.FIELD_DEFINITION,
        DirectiveLocation.ARGUMENT_DEFINITION,
        DirectiveLocation.INPUT_FIELD_DEFINITION,
        DirectiveLocation.ENUM_VALUE
      ],
      args: {
        reason: {
          type: GraphQLString,
          description: "Explains why this element was deprecated, usually also including a suggestion for how to access supported similar data. Formatted using the Markdown syntax, as specified by [CommonMark](https://commonmark.org/).",
          defaultValue: DEFAULT_DEPRECATION_REASON
        }
      }
    });
    GraphQLSpecifiedByDirective = new GraphQLDirective({
      name: "specifiedBy",
      description: "Exposes a URL that specifies the behavior of this scalar.",
      locations: [DirectiveLocation.SCALAR],
      args: {
        url: {
          type: new GraphQLNonNull(GraphQLString),
          description: "The URL that specifies the behavior of this scalar."
        }
      }
    });
    GraphQLOneOfDirective = new GraphQLDirective({
      name: "oneOf",
      description: "Indicates exactly one field must be supplied and this field must not be `null`.",
      locations: [DirectiveLocation.INPUT_OBJECT],
      args: {}
    });
    specifiedDirectives = Object.freeze([
      GraphQLIncludeDirective,
      GraphQLSkipDirective,
      GraphQLDeprecatedDirective,
      GraphQLSpecifiedByDirective,
      GraphQLOneOfDirective
    ]);
  }
});

// ../node_modules/graphql/jsutils/isIterableObject.mjs
function isIterableObject(maybeIterable) {
  return typeof maybeIterable === "object" && typeof (maybeIterable === null || maybeIterable === void 0 ? void 0 : maybeIterable[Symbol.iterator]) === "function";
}
var init_isIterableObject = __esm({
  "../node_modules/graphql/jsutils/isIterableObject.mjs"() {
  }
});

// ../node_modules/graphql/utilities/astFromValue.mjs
function astFromValue(value, type) {
  if (isNonNullType(type)) {
    const astValue = astFromValue(value, type.ofType);
    if ((astValue === null || astValue === void 0 ? void 0 : astValue.kind) === Kind.NULL) {
      return null;
    }
    return astValue;
  }
  if (value === null) {
    return {
      kind: Kind.NULL
    };
  }
  if (value === void 0) {
    return null;
  }
  if (isListType(type)) {
    const itemType = type.ofType;
    if (isIterableObject(value)) {
      const valuesNodes = [];
      for (const item of value) {
        const itemNode = astFromValue(item, itemType);
        if (itemNode != null) {
          valuesNodes.push(itemNode);
        }
      }
      return {
        kind: Kind.LIST,
        values: valuesNodes
      };
    }
    return astFromValue(value, itemType);
  }
  if (isInputObjectType(type)) {
    if (!isObjectLike(value)) {
      return null;
    }
    const fieldNodes = [];
    for (const field of Object.values(type.getFields())) {
      const fieldValue = astFromValue(value[field.name], field.type);
      if (fieldValue) {
        fieldNodes.push({
          kind: Kind.OBJECT_FIELD,
          name: {
            kind: Kind.NAME,
            value: field.name
          },
          value: fieldValue
        });
      }
    }
    return {
      kind: Kind.OBJECT,
      fields: fieldNodes
    };
  }
  if (isLeafType(type)) {
    const serialized = type.serialize(value);
    if (serialized == null) {
      return null;
    }
    if (typeof serialized === "boolean") {
      return {
        kind: Kind.BOOLEAN,
        value: serialized
      };
    }
    if (typeof serialized === "number" && Number.isFinite(serialized)) {
      const stringNum = String(serialized);
      return integerStringRegExp.test(stringNum) ? {
        kind: Kind.INT,
        value: stringNum
      } : {
        kind: Kind.FLOAT,
        value: stringNum
      };
    }
    if (typeof serialized === "string") {
      if (isEnumType(type)) {
        return {
          kind: Kind.ENUM,
          value: serialized
        };
      }
      if (type === GraphQLID && integerStringRegExp.test(serialized)) {
        return {
          kind: Kind.INT,
          value: serialized
        };
      }
      return {
        kind: Kind.STRING,
        value: serialized
      };
    }
    throw new TypeError(`Cannot convert value to AST: ${inspect(serialized)}.`);
  }
  invariant2(false, "Unexpected input type: " + inspect(type));
}
var integerStringRegExp;
var init_astFromValue = __esm({
  "../node_modules/graphql/utilities/astFromValue.mjs"() {
    init_inspect();
    init_invariant2();
    init_isIterableObject();
    init_isObjectLike();
    init_kinds();
    init_definition();
    init_scalars();
    integerStringRegExp = /^-?(?:0|[1-9][0-9]*)$/;
  }
});

// ../node_modules/graphql/type/introspection.mjs
function isIntrospectionType(type) {
  return introspectionTypes.some(({ name }) => type.name === name);
}
var __Schema, __Directive, __DirectiveLocation, __Type, __Field, __InputValue, __EnumValue, TypeKind, __TypeKind, SchemaMetaFieldDef, TypeMetaFieldDef, TypeNameMetaFieldDef, introspectionTypes;
var init_introspection = __esm({
  "../node_modules/graphql/type/introspection.mjs"() {
    init_inspect();
    init_invariant2();
    init_directiveLocation();
    init_printer();
    init_astFromValue();
    init_definition();
    init_scalars();
    __Schema = new GraphQLObjectType({
      name: "__Schema",
      description: "A GraphQL Schema defines the capabilities of a GraphQL server. It exposes all available types and directives on the server, as well as the entry points for query, mutation, and subscription operations.",
      fields: () => ({
        description: {
          type: GraphQLString,
          resolve: (schema) => schema.description
        },
        types: {
          description: "A list of all types supported by this server.",
          type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(__Type))),
          resolve(schema) {
            return Object.values(schema.getTypeMap());
          }
        },
        queryType: {
          description: "The type that query operations will be rooted at.",
          type: new GraphQLNonNull(__Type),
          resolve: (schema) => schema.getQueryType()
        },
        mutationType: {
          description: "If this server supports mutation, the type that mutation operations will be rooted at.",
          type: __Type,
          resolve: (schema) => schema.getMutationType()
        },
        subscriptionType: {
          description: "If this server support subscription, the type that subscription operations will be rooted at.",
          type: __Type,
          resolve: (schema) => schema.getSubscriptionType()
        },
        directives: {
          description: "A list of all directives supported by this server.",
          type: new GraphQLNonNull(
            new GraphQLList(new GraphQLNonNull(__Directive))
          ),
          resolve: (schema) => schema.getDirectives()
        }
      })
    });
    __Directive = new GraphQLObjectType({
      name: "__Directive",
      description: "A Directive provides a way to describe alternate runtime execution and type validation behavior in a GraphQL document.\n\nIn some cases, you need to provide options to alter GraphQL's execution behavior in ways field arguments will not suffice, such as conditionally including or skipping a field. Directives provide this by describing additional information to the executor.",
      fields: () => ({
        name: {
          type: new GraphQLNonNull(GraphQLString),
          resolve: (directive) => directive.name
        },
        description: {
          type: GraphQLString,
          resolve: (directive) => directive.description
        },
        isRepeatable: {
          type: new GraphQLNonNull(GraphQLBoolean),
          resolve: (directive) => directive.isRepeatable
        },
        locations: {
          type: new GraphQLNonNull(
            new GraphQLList(new GraphQLNonNull(__DirectiveLocation))
          ),
          resolve: (directive) => directive.locations
        },
        args: {
          type: new GraphQLNonNull(
            new GraphQLList(new GraphQLNonNull(__InputValue))
          ),
          args: {
            includeDeprecated: {
              type: GraphQLBoolean,
              defaultValue: false
            }
          },
          resolve(field, { includeDeprecated }) {
            return includeDeprecated ? field.args : field.args.filter((arg) => arg.deprecationReason == null);
          }
        }
      })
    });
    __DirectiveLocation = new GraphQLEnumType({
      name: "__DirectiveLocation",
      description: "A Directive can be adjacent to many parts of the GraphQL language, a __DirectiveLocation describes one such possible adjacencies.",
      values: {
        QUERY: {
          value: DirectiveLocation.QUERY,
          description: "Location adjacent to a query operation."
        },
        MUTATION: {
          value: DirectiveLocation.MUTATION,
          description: "Location adjacent to a mutation operation."
        },
        SUBSCRIPTION: {
          value: DirectiveLocation.SUBSCRIPTION,
          description: "Location adjacent to a subscription operation."
        },
        FIELD: {
          value: DirectiveLocation.FIELD,
          description: "Location adjacent to a field."
        },
        FRAGMENT_DEFINITION: {
          value: DirectiveLocation.FRAGMENT_DEFINITION,
          description: "Location adjacent to a fragment definition."
        },
        FRAGMENT_SPREAD: {
          value: DirectiveLocation.FRAGMENT_SPREAD,
          description: "Location adjacent to a fragment spread."
        },
        INLINE_FRAGMENT: {
          value: DirectiveLocation.INLINE_FRAGMENT,
          description: "Location adjacent to an inline fragment."
        },
        VARIABLE_DEFINITION: {
          value: DirectiveLocation.VARIABLE_DEFINITION,
          description: "Location adjacent to a variable definition."
        },
        SCHEMA: {
          value: DirectiveLocation.SCHEMA,
          description: "Location adjacent to a schema definition."
        },
        SCALAR: {
          value: DirectiveLocation.SCALAR,
          description: "Location adjacent to a scalar definition."
        },
        OBJECT: {
          value: DirectiveLocation.OBJECT,
          description: "Location adjacent to an object type definition."
        },
        FIELD_DEFINITION: {
          value: DirectiveLocation.FIELD_DEFINITION,
          description: "Location adjacent to a field definition."
        },
        ARGUMENT_DEFINITION: {
          value: DirectiveLocation.ARGUMENT_DEFINITION,
          description: "Location adjacent to an argument definition."
        },
        INTERFACE: {
          value: DirectiveLocation.INTERFACE,
          description: "Location adjacent to an interface definition."
        },
        UNION: {
          value: DirectiveLocation.UNION,
          description: "Location adjacent to a union definition."
        },
        ENUM: {
          value: DirectiveLocation.ENUM,
          description: "Location adjacent to an enum definition."
        },
        ENUM_VALUE: {
          value: DirectiveLocation.ENUM_VALUE,
          description: "Location adjacent to an enum value definition."
        },
        INPUT_OBJECT: {
          value: DirectiveLocation.INPUT_OBJECT,
          description: "Location adjacent to an input object type definition."
        },
        INPUT_FIELD_DEFINITION: {
          value: DirectiveLocation.INPUT_FIELD_DEFINITION,
          description: "Location adjacent to an input object field definition."
        }
      }
    });
    __Type = new GraphQLObjectType({
      name: "__Type",
      description: "The fundamental unit of any GraphQL Schema is the type. There are many kinds of types in GraphQL as represented by the `__TypeKind` enum.\n\nDepending on the kind of a type, certain fields describe information about that type. Scalar types provide no information beyond a name, description and optional `specifiedByURL`, while Enum types provide their values. Object and Interface types provide the fields they describe. Abstract types, Union and Interface, provide the Object types possible at runtime. List and NonNull types compose other types.",
      fields: () => ({
        kind: {
          type: new GraphQLNonNull(__TypeKind),
          resolve(type) {
            if (isScalarType(type)) {
              return TypeKind.SCALAR;
            }
            if (isObjectType(type)) {
              return TypeKind.OBJECT;
            }
            if (isInterfaceType(type)) {
              return TypeKind.INTERFACE;
            }
            if (isUnionType(type)) {
              return TypeKind.UNION;
            }
            if (isEnumType(type)) {
              return TypeKind.ENUM;
            }
            if (isInputObjectType(type)) {
              return TypeKind.INPUT_OBJECT;
            }
            if (isListType(type)) {
              return TypeKind.LIST;
            }
            if (isNonNullType(type)) {
              return TypeKind.NON_NULL;
            }
            invariant2(false, `Unexpected type: "${inspect(type)}".`);
          }
        },
        name: {
          type: GraphQLString,
          resolve: (type) => "name" in type ? type.name : void 0
        },
        description: {
          type: GraphQLString,
          resolve: (type) => (
            /* c8 ignore next */
            "description" in type ? type.description : void 0
          )
        },
        specifiedByURL: {
          type: GraphQLString,
          resolve: (obj) => "specifiedByURL" in obj ? obj.specifiedByURL : void 0
        },
        fields: {
          type: new GraphQLList(new GraphQLNonNull(__Field)),
          args: {
            includeDeprecated: {
              type: GraphQLBoolean,
              defaultValue: false
            }
          },
          resolve(type, { includeDeprecated }) {
            if (isObjectType(type) || isInterfaceType(type)) {
              const fields = Object.values(type.getFields());
              return includeDeprecated ? fields : fields.filter((field) => field.deprecationReason == null);
            }
          }
        },
        interfaces: {
          type: new GraphQLList(new GraphQLNonNull(__Type)),
          resolve(type) {
            if (isObjectType(type) || isInterfaceType(type)) {
              return type.getInterfaces();
            }
          }
        },
        possibleTypes: {
          type: new GraphQLList(new GraphQLNonNull(__Type)),
          resolve(type, _args, _context, { schema }) {
            if (isAbstractType(type)) {
              return schema.getPossibleTypes(type);
            }
          }
        },
        enumValues: {
          type: new GraphQLList(new GraphQLNonNull(__EnumValue)),
          args: {
            includeDeprecated: {
              type: GraphQLBoolean,
              defaultValue: false
            }
          },
          resolve(type, { includeDeprecated }) {
            if (isEnumType(type)) {
              const values = type.getValues();
              return includeDeprecated ? values : values.filter((field) => field.deprecationReason == null);
            }
          }
        },
        inputFields: {
          type: new GraphQLList(new GraphQLNonNull(__InputValue)),
          args: {
            includeDeprecated: {
              type: GraphQLBoolean,
              defaultValue: false
            }
          },
          resolve(type, { includeDeprecated }) {
            if (isInputObjectType(type)) {
              const values = Object.values(type.getFields());
              return includeDeprecated ? values : values.filter((field) => field.deprecationReason == null);
            }
          }
        },
        ofType: {
          type: __Type,
          resolve: (type) => "ofType" in type ? type.ofType : void 0
        },
        isOneOf: {
          type: GraphQLBoolean,
          resolve: (type) => {
            if (isInputObjectType(type)) {
              return type.isOneOf;
            }
          }
        }
      })
    });
    __Field = new GraphQLObjectType({
      name: "__Field",
      description: "Object and Interface types are described by a list of Fields, each of which has a name, potentially a list of arguments, and a return type.",
      fields: () => ({
        name: {
          type: new GraphQLNonNull(GraphQLString),
          resolve: (field) => field.name
        },
        description: {
          type: GraphQLString,
          resolve: (field) => field.description
        },
        args: {
          type: new GraphQLNonNull(
            new GraphQLList(new GraphQLNonNull(__InputValue))
          ),
          args: {
            includeDeprecated: {
              type: GraphQLBoolean,
              defaultValue: false
            }
          },
          resolve(field, { includeDeprecated }) {
            return includeDeprecated ? field.args : field.args.filter((arg) => arg.deprecationReason == null);
          }
        },
        type: {
          type: new GraphQLNonNull(__Type),
          resolve: (field) => field.type
        },
        isDeprecated: {
          type: new GraphQLNonNull(GraphQLBoolean),
          resolve: (field) => field.deprecationReason != null
        },
        deprecationReason: {
          type: GraphQLString,
          resolve: (field) => field.deprecationReason
        }
      })
    });
    __InputValue = new GraphQLObjectType({
      name: "__InputValue",
      description: "Arguments provided to Fields or Directives and the input fields of an InputObject are represented as Input Values which describe their type and optionally a default value.",
      fields: () => ({
        name: {
          type: new GraphQLNonNull(GraphQLString),
          resolve: (inputValue) => inputValue.name
        },
        description: {
          type: GraphQLString,
          resolve: (inputValue) => inputValue.description
        },
        type: {
          type: new GraphQLNonNull(__Type),
          resolve: (inputValue) => inputValue.type
        },
        defaultValue: {
          type: GraphQLString,
          description: "A GraphQL-formatted string representing the default value for this input value.",
          resolve(inputValue) {
            const { type, defaultValue } = inputValue;
            const valueAST = astFromValue(defaultValue, type);
            return valueAST ? print(valueAST) : null;
          }
        },
        isDeprecated: {
          type: new GraphQLNonNull(GraphQLBoolean),
          resolve: (field) => field.deprecationReason != null
        },
        deprecationReason: {
          type: GraphQLString,
          resolve: (obj) => obj.deprecationReason
        }
      })
    });
    __EnumValue = new GraphQLObjectType({
      name: "__EnumValue",
      description: "One possible value for a given Enum. Enum values are unique values, not a placeholder for a string or numeric value. However an Enum value is returned in a JSON response as a string.",
      fields: () => ({
        name: {
          type: new GraphQLNonNull(GraphQLString),
          resolve: (enumValue) => enumValue.name
        },
        description: {
          type: GraphQLString,
          resolve: (enumValue) => enumValue.description
        },
        isDeprecated: {
          type: new GraphQLNonNull(GraphQLBoolean),
          resolve: (enumValue) => enumValue.deprecationReason != null
        },
        deprecationReason: {
          type: GraphQLString,
          resolve: (enumValue) => enumValue.deprecationReason
        }
      })
    });
    (function(TypeKind2) {
      TypeKind2["SCALAR"] = "SCALAR";
      TypeKind2["OBJECT"] = "OBJECT";
      TypeKind2["INTERFACE"] = "INTERFACE";
      TypeKind2["UNION"] = "UNION";
      TypeKind2["ENUM"] = "ENUM";
      TypeKind2["INPUT_OBJECT"] = "INPUT_OBJECT";
      TypeKind2["LIST"] = "LIST";
      TypeKind2["NON_NULL"] = "NON_NULL";
    })(TypeKind || (TypeKind = {}));
    __TypeKind = new GraphQLEnumType({
      name: "__TypeKind",
      description: "An enum describing what kind of type a given `__Type` is.",
      values: {
        SCALAR: {
          value: TypeKind.SCALAR,
          description: "Indicates this type is a scalar."
        },
        OBJECT: {
          value: TypeKind.OBJECT,
          description: "Indicates this type is an object. `fields` and `interfaces` are valid fields."
        },
        INTERFACE: {
          value: TypeKind.INTERFACE,
          description: "Indicates this type is an interface. `fields`, `interfaces`, and `possibleTypes` are valid fields."
        },
        UNION: {
          value: TypeKind.UNION,
          description: "Indicates this type is a union. `possibleTypes` is a valid field."
        },
        ENUM: {
          value: TypeKind.ENUM,
          description: "Indicates this type is an enum. `enumValues` is a valid field."
        },
        INPUT_OBJECT: {
          value: TypeKind.INPUT_OBJECT,
          description: "Indicates this type is an input object. `inputFields` is a valid field."
        },
        LIST: {
          value: TypeKind.LIST,
          description: "Indicates this type is a list. `ofType` is a valid field."
        },
        NON_NULL: {
          value: TypeKind.NON_NULL,
          description: "Indicates this type is a non-null. `ofType` is a valid field."
        }
      }
    });
    SchemaMetaFieldDef = {
      name: "__schema",
      type: new GraphQLNonNull(__Schema),
      description: "Access the current type schema of this server.",
      args: [],
      resolve: (_source, _args, _context, { schema }) => schema,
      deprecationReason: void 0,
      extensions: /* @__PURE__ */ Object.create(null),
      astNode: void 0
    };
    TypeMetaFieldDef = {
      name: "__type",
      type: __Type,
      description: "Request the type information of a single type.",
      args: [
        {
          name: "name",
          description: void 0,
          type: new GraphQLNonNull(GraphQLString),
          defaultValue: void 0,
          deprecationReason: void 0,
          extensions: /* @__PURE__ */ Object.create(null),
          astNode: void 0
        }
      ],
      resolve: (_source, { name }, _context, { schema }) => schema.getType(name),
      deprecationReason: void 0,
      extensions: /* @__PURE__ */ Object.create(null),
      astNode: void 0
    };
    TypeNameMetaFieldDef = {
      name: "__typename",
      type: new GraphQLNonNull(GraphQLString),
      description: "The name of the current Object type at runtime.",
      args: [],
      resolve: (_source, _args, _context, { parentType }) => parentType.name,
      deprecationReason: void 0,
      extensions: /* @__PURE__ */ Object.create(null),
      astNode: void 0
    };
    introspectionTypes = Object.freeze([
      __Schema,
      __Directive,
      __DirectiveLocation,
      __Type,
      __Field,
      __InputValue,
      __EnumValue,
      __TypeKind
    ]);
  }
});

// ../node_modules/graphql/type/schema.mjs
function isSchema(schema) {
  return instanceOf(schema, GraphQLSchema);
}
function assertSchema(schema) {
  if (!isSchema(schema)) {
    throw new Error(`Expected ${inspect(schema)} to be a GraphQL schema.`);
  }
  return schema;
}
function collectReferencedTypes(type, typeSet) {
  const namedType = getNamedType(type);
  if (!typeSet.has(namedType)) {
    typeSet.add(namedType);
    if (isUnionType(namedType)) {
      for (const memberType of namedType.getTypes()) {
        collectReferencedTypes(memberType, typeSet);
      }
    } else if (isObjectType(namedType) || isInterfaceType(namedType)) {
      for (const interfaceType of namedType.getInterfaces()) {
        collectReferencedTypes(interfaceType, typeSet);
      }
      for (const field of Object.values(namedType.getFields())) {
        collectReferencedTypes(field.type, typeSet);
        for (const arg of field.args) {
          collectReferencedTypes(arg.type, typeSet);
        }
      }
    } else if (isInputObjectType(namedType)) {
      for (const field of Object.values(namedType.getFields())) {
        collectReferencedTypes(field.type, typeSet);
      }
    }
  }
  return typeSet;
}
var GraphQLSchema;
var init_schema = __esm({
  "../node_modules/graphql/type/schema.mjs"() {
    init_devAssert();
    init_inspect();
    init_instanceOf();
    init_isObjectLike();
    init_toObjMap();
    init_ast();
    init_definition();
    init_directives();
    init_introspection();
    GraphQLSchema = class {
      // Used as a cache for validateSchema().
      constructor(config) {
        var _config$extensionASTN, _config$directives;
        this.__validationErrors = config.assumeValid === true ? [] : void 0;
        isObjectLike(config) || devAssert(false, "Must provide configuration object.");
        !config.types || Array.isArray(config.types) || devAssert(
          false,
          `"types" must be Array if provided but got: ${inspect(config.types)}.`
        );
        !config.directives || Array.isArray(config.directives) || devAssert(
          false,
          `"directives" must be Array if provided but got: ${inspect(config.directives)}.`
        );
        this.description = config.description;
        this.extensions = toObjMap(config.extensions);
        this.astNode = config.astNode;
        this.extensionASTNodes = (_config$extensionASTN = config.extensionASTNodes) !== null && _config$extensionASTN !== void 0 ? _config$extensionASTN : [];
        this._queryType = config.query;
        this._mutationType = config.mutation;
        this._subscriptionType = config.subscription;
        this._directives = (_config$directives = config.directives) !== null && _config$directives !== void 0 ? _config$directives : specifiedDirectives;
        const allReferencedTypes = new Set(config.types);
        if (config.types != null) {
          for (const type of config.types) {
            allReferencedTypes.delete(type);
            collectReferencedTypes(type, allReferencedTypes);
          }
        }
        if (this._queryType != null) {
          collectReferencedTypes(this._queryType, allReferencedTypes);
        }
        if (this._mutationType != null) {
          collectReferencedTypes(this._mutationType, allReferencedTypes);
        }
        if (this._subscriptionType != null) {
          collectReferencedTypes(this._subscriptionType, allReferencedTypes);
        }
        for (const directive of this._directives) {
          if (isDirective(directive)) {
            for (const arg of directive.args) {
              collectReferencedTypes(arg.type, allReferencedTypes);
            }
          }
        }
        collectReferencedTypes(__Schema, allReferencedTypes);
        this._typeMap = /* @__PURE__ */ Object.create(null);
        this._subTypeMap = /* @__PURE__ */ Object.create(null);
        this._implementationsMap = /* @__PURE__ */ Object.create(null);
        for (const namedType of allReferencedTypes) {
          if (namedType == null) {
            continue;
          }
          const typeName = namedType.name;
          typeName || devAssert(
            false,
            "One of the provided types for building the Schema is missing a name."
          );
          if (this._typeMap[typeName] !== void 0) {
            throw new Error(
              `Schema must contain uniquely named types but contains multiple types named "${typeName}".`
            );
          }
          this._typeMap[typeName] = namedType;
          if (isInterfaceType(namedType)) {
            for (const iface of namedType.getInterfaces()) {
              if (isInterfaceType(iface)) {
                let implementations = this._implementationsMap[iface.name];
                if (implementations === void 0) {
                  implementations = this._implementationsMap[iface.name] = {
                    objects: [],
                    interfaces: []
                  };
                }
                implementations.interfaces.push(namedType);
              }
            }
          } else if (isObjectType(namedType)) {
            for (const iface of namedType.getInterfaces()) {
              if (isInterfaceType(iface)) {
                let implementations = this._implementationsMap[iface.name];
                if (implementations === void 0) {
                  implementations = this._implementationsMap[iface.name] = {
                    objects: [],
                    interfaces: []
                  };
                }
                implementations.objects.push(namedType);
              }
            }
          }
        }
      }
      get [Symbol.toStringTag]() {
        return "GraphQLSchema";
      }
      getQueryType() {
        return this._queryType;
      }
      getMutationType() {
        return this._mutationType;
      }
      getSubscriptionType() {
        return this._subscriptionType;
      }
      getRootType(operation) {
        switch (operation) {
          case OperationTypeNode.QUERY:
            return this.getQueryType();
          case OperationTypeNode.MUTATION:
            return this.getMutationType();
          case OperationTypeNode.SUBSCRIPTION:
            return this.getSubscriptionType();
        }
      }
      getTypeMap() {
        return this._typeMap;
      }
      getType(name) {
        return this.getTypeMap()[name];
      }
      getPossibleTypes(abstractType) {
        return isUnionType(abstractType) ? abstractType.getTypes() : this.getImplementations(abstractType).objects;
      }
      getImplementations(interfaceType) {
        const implementations = this._implementationsMap[interfaceType.name];
        return implementations !== null && implementations !== void 0 ? implementations : {
          objects: [],
          interfaces: []
        };
      }
      isSubType(abstractType, maybeSubType) {
        let map2 = this._subTypeMap[abstractType.name];
        if (map2 === void 0) {
          map2 = /* @__PURE__ */ Object.create(null);
          if (isUnionType(abstractType)) {
            for (const type of abstractType.getTypes()) {
              map2[type.name] = true;
            }
          } else {
            const implementations = this.getImplementations(abstractType);
            for (const type of implementations.objects) {
              map2[type.name] = true;
            }
            for (const type of implementations.interfaces) {
              map2[type.name] = true;
            }
          }
          this._subTypeMap[abstractType.name] = map2;
        }
        return map2[maybeSubType.name] !== void 0;
      }
      getDirectives() {
        return this._directives;
      }
      getDirective(name) {
        return this.getDirectives().find((directive) => directive.name === name);
      }
      toConfig() {
        return {
          description: this.description,
          query: this.getQueryType(),
          mutation: this.getMutationType(),
          subscription: this.getSubscriptionType(),
          types: Object.values(this.getTypeMap()),
          directives: this.getDirectives(),
          extensions: this.extensions,
          astNode: this.astNode,
          extensionASTNodes: this.extensionASTNodes,
          assumeValid: this.__validationErrors !== void 0
        };
      }
    };
  }
});

// ../node_modules/graphql/type/validate.mjs
function validateSchema(schema) {
  assertSchema(schema);
  if (schema.__validationErrors) {
    return schema.__validationErrors;
  }
  const context = new SchemaValidationContext(schema);
  validateRootTypes(context);
  validateDirectives(context);
  validateTypes(context);
  const errors = context.getErrors();
  schema.__validationErrors = errors;
  return errors;
}
function assertValidSchema(schema) {
  const errors = validateSchema(schema);
  if (errors.length !== 0) {
    throw new Error(errors.map((error) => error.message).join("\n\n"));
  }
}
function validateRootTypes(context) {
  const schema = context.schema;
  const queryType = schema.getQueryType();
  if (!queryType) {
    context.reportError("Query root type must be provided.", schema.astNode);
  } else if (!isObjectType(queryType)) {
    var _getOperationTypeNode;
    context.reportError(
      `Query root type must be Object type, it cannot be ${inspect(
        queryType
      )}.`,
      (_getOperationTypeNode = getOperationTypeNode(
        schema,
        OperationTypeNode.QUERY
      )) !== null && _getOperationTypeNode !== void 0 ? _getOperationTypeNode : queryType.astNode
    );
  }
  const mutationType = schema.getMutationType();
  if (mutationType && !isObjectType(mutationType)) {
    var _getOperationTypeNode2;
    context.reportError(
      `Mutation root type must be Object type if provided, it cannot be ${inspect(mutationType)}.`,
      (_getOperationTypeNode2 = getOperationTypeNode(
        schema,
        OperationTypeNode.MUTATION
      )) !== null && _getOperationTypeNode2 !== void 0 ? _getOperationTypeNode2 : mutationType.astNode
    );
  }
  const subscriptionType = schema.getSubscriptionType();
  if (subscriptionType && !isObjectType(subscriptionType)) {
    var _getOperationTypeNode3;
    context.reportError(
      `Subscription root type must be Object type if provided, it cannot be ${inspect(subscriptionType)}.`,
      (_getOperationTypeNode3 = getOperationTypeNode(
        schema,
        OperationTypeNode.SUBSCRIPTION
      )) !== null && _getOperationTypeNode3 !== void 0 ? _getOperationTypeNode3 : subscriptionType.astNode
    );
  }
}
function getOperationTypeNode(schema, operation) {
  var _flatMap$find;
  return (_flatMap$find = [schema.astNode, ...schema.extensionASTNodes].flatMap(
    // FIXME: https://github.com/graphql/graphql-js/issues/2203
    (schemaNode) => {
      var _schemaNode$operation;
      return (
        /* c8 ignore next */
        (_schemaNode$operation = schemaNode === null || schemaNode === void 0 ? void 0 : schemaNode.operationTypes) !== null && _schemaNode$operation !== void 0 ? _schemaNode$operation : []
      );
    }
  ).find((operationNode) => operationNode.operation === operation)) === null || _flatMap$find === void 0 ? void 0 : _flatMap$find.type;
}
function validateDirectives(context) {
  for (const directive of context.schema.getDirectives()) {
    if (!isDirective(directive)) {
      context.reportError(
        `Expected directive but got: ${inspect(directive)}.`,
        directive === null || directive === void 0 ? void 0 : directive.astNode
      );
      continue;
    }
    validateName(context, directive);
    if (directive.locations.length === 0) {
      context.reportError(
        `Directive @${directive.name} must include 1 or more locations.`,
        directive.astNode
      );
    }
    for (const arg of directive.args) {
      validateName(context, arg);
      if (!isInputType(arg.type)) {
        context.reportError(
          `The type of @${directive.name}(${arg.name}:) must be Input Type but got: ${inspect(arg.type)}.`,
          arg.astNode
        );
      }
      if (isRequiredArgument(arg) && arg.deprecationReason != null) {
        var _arg$astNode;
        context.reportError(
          `Required argument @${directive.name}(${arg.name}:) cannot be deprecated.`,
          [
            getDeprecatedDirectiveNode(arg.astNode),
            (_arg$astNode = arg.astNode) === null || _arg$astNode === void 0 ? void 0 : _arg$astNode.type
          ]
        );
      }
    }
  }
}
function validateName(context, node) {
  if (node.name.startsWith("__")) {
    context.reportError(
      `Name "${node.name}" must not begin with "__", which is reserved by GraphQL introspection.`,
      node.astNode
    );
  }
}
function validateTypes(context) {
  const validateInputObjectCircularRefs = createInputObjectCircularRefsValidator(context);
  const typeMap = context.schema.getTypeMap();
  for (const type of Object.values(typeMap)) {
    if (!isNamedType(type)) {
      context.reportError(
        `Expected GraphQL named type but got: ${inspect(type)}.`,
        type.astNode
      );
      continue;
    }
    if (!isIntrospectionType(type)) {
      validateName(context, type);
    }
    if (isObjectType(type)) {
      validateFields(context, type);
      validateInterfaces(context, type);
    } else if (isInterfaceType(type)) {
      validateFields(context, type);
      validateInterfaces(context, type);
    } else if (isUnionType(type)) {
      validateUnionMembers(context, type);
    } else if (isEnumType(type)) {
      validateEnumValues(context, type);
    } else if (isInputObjectType(type)) {
      validateInputFields(context, type);
      validateInputObjectCircularRefs(type);
    }
  }
}
function validateFields(context, type) {
  const fields = Object.values(type.getFields());
  if (fields.length === 0) {
    context.reportError(`Type ${type.name} must define one or more fields.`, [
      type.astNode,
      ...type.extensionASTNodes
    ]);
  }
  for (const field of fields) {
    validateName(context, field);
    if (!isOutputType(field.type)) {
      var _field$astNode;
      context.reportError(
        `The type of ${type.name}.${field.name} must be Output Type but got: ${inspect(field.type)}.`,
        (_field$astNode = field.astNode) === null || _field$astNode === void 0 ? void 0 : _field$astNode.type
      );
    }
    for (const arg of field.args) {
      const argName = arg.name;
      validateName(context, arg);
      if (!isInputType(arg.type)) {
        var _arg$astNode2;
        context.reportError(
          `The type of ${type.name}.${field.name}(${argName}:) must be Input Type but got: ${inspect(arg.type)}.`,
          (_arg$astNode2 = arg.astNode) === null || _arg$astNode2 === void 0 ? void 0 : _arg$astNode2.type
        );
      }
      if (isRequiredArgument(arg) && arg.deprecationReason != null) {
        var _arg$astNode3;
        context.reportError(
          `Required argument ${type.name}.${field.name}(${argName}:) cannot be deprecated.`,
          [
            getDeprecatedDirectiveNode(arg.astNode),
            (_arg$astNode3 = arg.astNode) === null || _arg$astNode3 === void 0 ? void 0 : _arg$astNode3.type
          ]
        );
      }
    }
  }
}
function validateInterfaces(context, type) {
  const ifaceTypeNames = /* @__PURE__ */ Object.create(null);
  for (const iface of type.getInterfaces()) {
    if (!isInterfaceType(iface)) {
      context.reportError(
        `Type ${inspect(type)} must only implement Interface types, it cannot implement ${inspect(iface)}.`,
        getAllImplementsInterfaceNodes(type, iface)
      );
      continue;
    }
    if (type === iface) {
      context.reportError(
        `Type ${type.name} cannot implement itself because it would create a circular reference.`,
        getAllImplementsInterfaceNodes(type, iface)
      );
      continue;
    }
    if (ifaceTypeNames[iface.name]) {
      context.reportError(
        `Type ${type.name} can only implement ${iface.name} once.`,
        getAllImplementsInterfaceNodes(type, iface)
      );
      continue;
    }
    ifaceTypeNames[iface.name] = true;
    validateTypeImplementsAncestors(context, type, iface);
    validateTypeImplementsInterface(context, type, iface);
  }
}
function validateTypeImplementsInterface(context, type, iface) {
  const typeFieldMap = type.getFields();
  for (const ifaceField of Object.values(iface.getFields())) {
    const fieldName = ifaceField.name;
    const typeField = typeFieldMap[fieldName];
    if (!typeField) {
      context.reportError(
        `Interface field ${iface.name}.${fieldName} expected but ${type.name} does not provide it.`,
        [ifaceField.astNode, type.astNode, ...type.extensionASTNodes]
      );
      continue;
    }
    if (!isTypeSubTypeOf(context.schema, typeField.type, ifaceField.type)) {
      var _ifaceField$astNode, _typeField$astNode;
      context.reportError(
        `Interface field ${iface.name}.${fieldName} expects type ${inspect(ifaceField.type)} but ${type.name}.${fieldName} is type ${inspect(typeField.type)}.`,
        [
          (_ifaceField$astNode = ifaceField.astNode) === null || _ifaceField$astNode === void 0 ? void 0 : _ifaceField$astNode.type,
          (_typeField$astNode = typeField.astNode) === null || _typeField$astNode === void 0 ? void 0 : _typeField$astNode.type
        ]
      );
    }
    for (const ifaceArg of ifaceField.args) {
      const argName = ifaceArg.name;
      const typeArg = typeField.args.find((arg) => arg.name === argName);
      if (!typeArg) {
        context.reportError(
          `Interface field argument ${iface.name}.${fieldName}(${argName}:) expected but ${type.name}.${fieldName} does not provide it.`,
          [ifaceArg.astNode, typeField.astNode]
        );
        continue;
      }
      if (!isEqualType(ifaceArg.type, typeArg.type)) {
        var _ifaceArg$astNode, _typeArg$astNode;
        context.reportError(
          `Interface field argument ${iface.name}.${fieldName}(${argName}:) expects type ${inspect(ifaceArg.type)} but ${type.name}.${fieldName}(${argName}:) is type ${inspect(typeArg.type)}.`,
          [
            (_ifaceArg$astNode = ifaceArg.astNode) === null || _ifaceArg$astNode === void 0 ? void 0 : _ifaceArg$astNode.type,
            (_typeArg$astNode = typeArg.astNode) === null || _typeArg$astNode === void 0 ? void 0 : _typeArg$astNode.type
          ]
        );
      }
    }
    for (const typeArg of typeField.args) {
      const argName = typeArg.name;
      const ifaceArg = ifaceField.args.find((arg) => arg.name === argName);
      if (!ifaceArg && isRequiredArgument(typeArg)) {
        context.reportError(
          `Object field ${type.name}.${fieldName} includes required argument ${argName} that is missing from the Interface field ${iface.name}.${fieldName}.`,
          [typeArg.astNode, ifaceField.astNode]
        );
      }
    }
  }
}
function validateTypeImplementsAncestors(context, type, iface) {
  const ifaceInterfaces = type.getInterfaces();
  for (const transitive of iface.getInterfaces()) {
    if (!ifaceInterfaces.includes(transitive)) {
      context.reportError(
        transitive === type ? `Type ${type.name} cannot implement ${iface.name} because it would create a circular reference.` : `Type ${type.name} must implement ${transitive.name} because it is implemented by ${iface.name}.`,
        [
          ...getAllImplementsInterfaceNodes(iface, transitive),
          ...getAllImplementsInterfaceNodes(type, iface)
        ]
      );
    }
  }
}
function validateUnionMembers(context, union) {
  const memberTypes = union.getTypes();
  if (memberTypes.length === 0) {
    context.reportError(
      `Union type ${union.name} must define one or more member types.`,
      [union.astNode, ...union.extensionASTNodes]
    );
  }
  const includedTypeNames = /* @__PURE__ */ Object.create(null);
  for (const memberType of memberTypes) {
    if (includedTypeNames[memberType.name]) {
      context.reportError(
        `Union type ${union.name} can only include type ${memberType.name} once.`,
        getUnionMemberTypeNodes(union, memberType.name)
      );
      continue;
    }
    includedTypeNames[memberType.name] = true;
    if (!isObjectType(memberType)) {
      context.reportError(
        `Union type ${union.name} can only include Object types, it cannot include ${inspect(memberType)}.`,
        getUnionMemberTypeNodes(union, String(memberType))
      );
    }
  }
}
function validateEnumValues(context, enumType) {
  const enumValues = enumType.getValues();
  if (enumValues.length === 0) {
    context.reportError(
      `Enum type ${enumType.name} must define one or more values.`,
      [enumType.astNode, ...enumType.extensionASTNodes]
    );
  }
  for (const enumValue of enumValues) {
    validateName(context, enumValue);
  }
}
function validateInputFields(context, inputObj) {
  const fields = Object.values(inputObj.getFields());
  if (fields.length === 0) {
    context.reportError(
      `Input Object type ${inputObj.name} must define one or more fields.`,
      [inputObj.astNode, ...inputObj.extensionASTNodes]
    );
  }
  for (const field of fields) {
    validateName(context, field);
    if (!isInputType(field.type)) {
      var _field$astNode2;
      context.reportError(
        `The type of ${inputObj.name}.${field.name} must be Input Type but got: ${inspect(field.type)}.`,
        (_field$astNode2 = field.astNode) === null || _field$astNode2 === void 0 ? void 0 : _field$astNode2.type
      );
    }
    if (isRequiredInputField(field) && field.deprecationReason != null) {
      var _field$astNode3;
      context.reportError(
        `Required input field ${inputObj.name}.${field.name} cannot be deprecated.`,
        [
          getDeprecatedDirectiveNode(field.astNode),
          (_field$astNode3 = field.astNode) === null || _field$astNode3 === void 0 ? void 0 : _field$astNode3.type
        ]
      );
    }
    if (inputObj.isOneOf) {
      validateOneOfInputObjectField(inputObj, field, context);
    }
  }
}
function validateOneOfInputObjectField(type, field, context) {
  if (isNonNullType(field.type)) {
    var _field$astNode4;
    context.reportError(
      `OneOf input field ${type.name}.${field.name} must be nullable.`,
      (_field$astNode4 = field.astNode) === null || _field$astNode4 === void 0 ? void 0 : _field$astNode4.type
    );
  }
  if (field.defaultValue !== void 0) {
    context.reportError(
      `OneOf input field ${type.name}.${field.name} cannot have a default value.`,
      field.astNode
    );
  }
}
function createInputObjectCircularRefsValidator(context) {
  const visitedTypes = /* @__PURE__ */ Object.create(null);
  const fieldPath = [];
  const fieldPathIndexByTypeName = /* @__PURE__ */ Object.create(null);
  return detectCycleRecursive;
  function detectCycleRecursive(inputObj) {
    if (visitedTypes[inputObj.name]) {
      return;
    }
    visitedTypes[inputObj.name] = true;
    fieldPathIndexByTypeName[inputObj.name] = fieldPath.length;
    const fields = Object.values(inputObj.getFields());
    for (const field of fields) {
      if (isNonNullType(field.type) && isInputObjectType(field.type.ofType)) {
        const fieldType = field.type.ofType;
        const cycleIndex = fieldPathIndexByTypeName[fieldType.name];
        fieldPath.push(field);
        if (cycleIndex === void 0) {
          detectCycleRecursive(fieldType);
        } else {
          const cyclePath = fieldPath.slice(cycleIndex);
          const pathStr = cyclePath.map((fieldObj) => fieldObj.name).join(".");
          context.reportError(
            `Cannot reference Input Object "${fieldType.name}" within itself through a series of non-null fields: "${pathStr}".`,
            cyclePath.map((fieldObj) => fieldObj.astNode)
          );
        }
        fieldPath.pop();
      }
    }
    fieldPathIndexByTypeName[inputObj.name] = void 0;
  }
}
function getAllImplementsInterfaceNodes(type, iface) {
  const { astNode, extensionASTNodes } = type;
  const nodes = astNode != null ? [astNode, ...extensionASTNodes] : extensionASTNodes;
  return nodes.flatMap((typeNode) => {
    var _typeNode$interfaces;
    return (
      /* c8 ignore next */
      (_typeNode$interfaces = typeNode.interfaces) !== null && _typeNode$interfaces !== void 0 ? _typeNode$interfaces : []
    );
  }).filter((ifaceNode) => ifaceNode.name.value === iface.name);
}
function getUnionMemberTypeNodes(union, typeName) {
  const { astNode, extensionASTNodes } = union;
  const nodes = astNode != null ? [astNode, ...extensionASTNodes] : extensionASTNodes;
  return nodes.flatMap((unionNode) => {
    var _unionNode$types;
    return (
      /* c8 ignore next */
      (_unionNode$types = unionNode.types) !== null && _unionNode$types !== void 0 ? _unionNode$types : []
    );
  }).filter((typeNode) => typeNode.name.value === typeName);
}
function getDeprecatedDirectiveNode(definitionNode) {
  var _definitionNode$direc;
  return definitionNode === null || definitionNode === void 0 ? void 0 : (_definitionNode$direc = definitionNode.directives) === null || _definitionNode$direc === void 0 ? void 0 : _definitionNode$direc.find(
    (node) => node.name.value === GraphQLDeprecatedDirective.name
  );
}
var SchemaValidationContext;
var init_validate = __esm({
  "../node_modules/graphql/type/validate.mjs"() {
    init_inspect();
    init_GraphQLError();
    init_ast();
    init_typeComparators();
    init_definition();
    init_directives();
    init_introspection();
    init_schema();
    SchemaValidationContext = class {
      constructor(schema) {
        this._errors = [];
        this.schema = schema;
      }
      reportError(message, nodes) {
        const _nodes = Array.isArray(nodes) ? nodes.filter(Boolean) : nodes;
        this._errors.push(
          new GraphQLError(message, {
            nodes: _nodes
          })
        );
      }
      getErrors() {
        return this._errors;
      }
    };
  }
});

// ../node_modules/graphql/utilities/typeFromAST.mjs
function typeFromAST(schema, typeNode) {
  switch (typeNode.kind) {
    case Kind.LIST_TYPE: {
      const innerType = typeFromAST(schema, typeNode.type);
      return innerType && new GraphQLList(innerType);
    }
    case Kind.NON_NULL_TYPE: {
      const innerType = typeFromAST(schema, typeNode.type);
      return innerType && new GraphQLNonNull(innerType);
    }
    case Kind.NAMED_TYPE:
      return schema.getType(typeNode.name.value);
  }
}
var init_typeFromAST = __esm({
  "../node_modules/graphql/utilities/typeFromAST.mjs"() {
    init_kinds();
    init_definition();
  }
});

// ../node_modules/graphql/utilities/TypeInfo.mjs
function getFieldDef(schema, parentType, fieldNode) {
  const name = fieldNode.name.value;
  if (name === SchemaMetaFieldDef.name && schema.getQueryType() === parentType) {
    return SchemaMetaFieldDef;
  }
  if (name === TypeMetaFieldDef.name && schema.getQueryType() === parentType) {
    return TypeMetaFieldDef;
  }
  if (name === TypeNameMetaFieldDef.name && isCompositeType(parentType)) {
    return TypeNameMetaFieldDef;
  }
  if (isObjectType(parentType) || isInterfaceType(parentType)) {
    return parentType.getFields()[name];
  }
}
function visitWithTypeInfo(typeInfo, visitor) {
  return {
    enter(...args) {
      const node = args[0];
      typeInfo.enter(node);
      const fn = getEnterLeaveForKind(visitor, node.kind).enter;
      if (fn) {
        const result2 = fn.apply(visitor, args);
        if (result2 !== void 0) {
          typeInfo.leave(node);
          if (isNode(result2)) {
            typeInfo.enter(result2);
          }
        }
        return result2;
      }
    },
    leave(...args) {
      const node = args[0];
      const fn = getEnterLeaveForKind(visitor, node.kind).leave;
      let result2;
      if (fn) {
        result2 = fn.apply(visitor, args);
      }
      typeInfo.leave(node);
      return result2;
    }
  };
}
var TypeInfo;
var init_TypeInfo = __esm({
  "../node_modules/graphql/utilities/TypeInfo.mjs"() {
    init_ast();
    init_kinds();
    init_visitor();
    init_definition();
    init_introspection();
    init_typeFromAST();
    TypeInfo = class {
      constructor(schema, initialType, getFieldDefFn) {
        this._schema = schema;
        this._typeStack = [];
        this._parentTypeStack = [];
        this._inputTypeStack = [];
        this._fieldDefStack = [];
        this._defaultValueStack = [];
        this._directive = null;
        this._argument = null;
        this._enumValue = null;
        this._getFieldDef = getFieldDefFn !== null && getFieldDefFn !== void 0 ? getFieldDefFn : getFieldDef;
        if (initialType) {
          if (isInputType(initialType)) {
            this._inputTypeStack.push(initialType);
          }
          if (isCompositeType(initialType)) {
            this._parentTypeStack.push(initialType);
          }
          if (isOutputType(initialType)) {
            this._typeStack.push(initialType);
          }
        }
      }
      get [Symbol.toStringTag]() {
        return "TypeInfo";
      }
      getType() {
        if (this._typeStack.length > 0) {
          return this._typeStack[this._typeStack.length - 1];
        }
      }
      getParentType() {
        if (this._parentTypeStack.length > 0) {
          return this._parentTypeStack[this._parentTypeStack.length - 1];
        }
      }
      getInputType() {
        if (this._inputTypeStack.length > 0) {
          return this._inputTypeStack[this._inputTypeStack.length - 1];
        }
      }
      getParentInputType() {
        if (this._inputTypeStack.length > 1) {
          return this._inputTypeStack[this._inputTypeStack.length - 2];
        }
      }
      getFieldDef() {
        if (this._fieldDefStack.length > 0) {
          return this._fieldDefStack[this._fieldDefStack.length - 1];
        }
      }
      getDefaultValue() {
        if (this._defaultValueStack.length > 0) {
          return this._defaultValueStack[this._defaultValueStack.length - 1];
        }
      }
      getDirective() {
        return this._directive;
      }
      getArgument() {
        return this._argument;
      }
      getEnumValue() {
        return this._enumValue;
      }
      enter(node) {
        const schema = this._schema;
        switch (node.kind) {
          case Kind.SELECTION_SET: {
            const namedType = getNamedType(this.getType());
            this._parentTypeStack.push(
              isCompositeType(namedType) ? namedType : void 0
            );
            break;
          }
          case Kind.FIELD: {
            const parentType = this.getParentType();
            let fieldDef;
            let fieldType;
            if (parentType) {
              fieldDef = this._getFieldDef(schema, parentType, node);
              if (fieldDef) {
                fieldType = fieldDef.type;
              }
            }
            this._fieldDefStack.push(fieldDef);
            this._typeStack.push(isOutputType(fieldType) ? fieldType : void 0);
            break;
          }
          case Kind.DIRECTIVE:
            this._directive = schema.getDirective(node.name.value);
            break;
          case Kind.OPERATION_DEFINITION: {
            const rootType = schema.getRootType(node.operation);
            this._typeStack.push(isObjectType(rootType) ? rootType : void 0);
            break;
          }
          case Kind.INLINE_FRAGMENT:
          case Kind.FRAGMENT_DEFINITION: {
            const typeConditionAST = node.typeCondition;
            const outputType = typeConditionAST ? typeFromAST(schema, typeConditionAST) : getNamedType(this.getType());
            this._typeStack.push(isOutputType(outputType) ? outputType : void 0);
            break;
          }
          case Kind.VARIABLE_DEFINITION: {
            const inputType = typeFromAST(schema, node.type);
            this._inputTypeStack.push(
              isInputType(inputType) ? inputType : void 0
            );
            break;
          }
          case Kind.ARGUMENT: {
            var _this$getDirective;
            let argDef;
            let argType;
            const fieldOrDirective = (_this$getDirective = this.getDirective()) !== null && _this$getDirective !== void 0 ? _this$getDirective : this.getFieldDef();
            if (fieldOrDirective) {
              argDef = fieldOrDirective.args.find(
                (arg) => arg.name === node.name.value
              );
              if (argDef) {
                argType = argDef.type;
              }
            }
            this._argument = argDef;
            this._defaultValueStack.push(argDef ? argDef.defaultValue : void 0);
            this._inputTypeStack.push(isInputType(argType) ? argType : void 0);
            break;
          }
          case Kind.LIST: {
            const listType = getNullableType(this.getInputType());
            const itemType = isListType(listType) ? listType.ofType : listType;
            this._defaultValueStack.push(void 0);
            this._inputTypeStack.push(isInputType(itemType) ? itemType : void 0);
            break;
          }
          case Kind.OBJECT_FIELD: {
            const objectType = getNamedType(this.getInputType());
            let inputFieldType;
            let inputField;
            if (isInputObjectType(objectType)) {
              inputField = objectType.getFields()[node.name.value];
              if (inputField) {
                inputFieldType = inputField.type;
              }
            }
            this._defaultValueStack.push(
              inputField ? inputField.defaultValue : void 0
            );
            this._inputTypeStack.push(
              isInputType(inputFieldType) ? inputFieldType : void 0
            );
            break;
          }
          case Kind.ENUM: {
            const enumType = getNamedType(this.getInputType());
            let enumValue;
            if (isEnumType(enumType)) {
              enumValue = enumType.getValue(node.value);
            }
            this._enumValue = enumValue;
            break;
          }
          default:
        }
      }
      leave(node) {
        switch (node.kind) {
          case Kind.SELECTION_SET:
            this._parentTypeStack.pop();
            break;
          case Kind.FIELD:
            this._fieldDefStack.pop();
            this._typeStack.pop();
            break;
          case Kind.DIRECTIVE:
            this._directive = null;
            break;
          case Kind.OPERATION_DEFINITION:
          case Kind.INLINE_FRAGMENT:
          case Kind.FRAGMENT_DEFINITION:
            this._typeStack.pop();
            break;
          case Kind.VARIABLE_DEFINITION:
            this._inputTypeStack.pop();
            break;
          case Kind.ARGUMENT:
            this._argument = null;
            this._defaultValueStack.pop();
            this._inputTypeStack.pop();
            break;
          case Kind.LIST:
          case Kind.OBJECT_FIELD:
            this._defaultValueStack.pop();
            this._inputTypeStack.pop();
            break;
          case Kind.ENUM:
            this._enumValue = null;
            break;
          default:
        }
      }
    };
  }
});

// ../node_modules/graphql/language/predicates.mjs
function isDefinitionNode(node) {
  return isExecutableDefinitionNode(node) || isTypeSystemDefinitionNode(node) || isTypeSystemExtensionNode(node);
}
function isExecutableDefinitionNode(node) {
  return node.kind === Kind.OPERATION_DEFINITION || node.kind === Kind.FRAGMENT_DEFINITION;
}
function isSelectionNode(node) {
  return node.kind === Kind.FIELD || node.kind === Kind.FRAGMENT_SPREAD || node.kind === Kind.INLINE_FRAGMENT;
}
function isValueNode(node) {
  return node.kind === Kind.VARIABLE || node.kind === Kind.INT || node.kind === Kind.FLOAT || node.kind === Kind.STRING || node.kind === Kind.BOOLEAN || node.kind === Kind.NULL || node.kind === Kind.ENUM || node.kind === Kind.LIST || node.kind === Kind.OBJECT;
}
function isConstValueNode(node) {
  return isValueNode(node) && (node.kind === Kind.LIST ? node.values.some(isConstValueNode) : node.kind === Kind.OBJECT ? node.fields.some((field) => isConstValueNode(field.value)) : node.kind !== Kind.VARIABLE);
}
function isTypeNode(node) {
  return node.kind === Kind.NAMED_TYPE || node.kind === Kind.LIST_TYPE || node.kind === Kind.NON_NULL_TYPE;
}
function isTypeSystemDefinitionNode(node) {
  return node.kind === Kind.SCHEMA_DEFINITION || isTypeDefinitionNode(node) || node.kind === Kind.DIRECTIVE_DEFINITION;
}
function isTypeDefinitionNode(node) {
  return node.kind === Kind.SCALAR_TYPE_DEFINITION || node.kind === Kind.OBJECT_TYPE_DEFINITION || node.kind === Kind.INTERFACE_TYPE_DEFINITION || node.kind === Kind.UNION_TYPE_DEFINITION || node.kind === Kind.ENUM_TYPE_DEFINITION || node.kind === Kind.INPUT_OBJECT_TYPE_DEFINITION;
}
function isTypeSystemExtensionNode(node) {
  return node.kind === Kind.SCHEMA_EXTENSION || isTypeExtensionNode(node);
}
function isTypeExtensionNode(node) {
  return node.kind === Kind.SCALAR_TYPE_EXTENSION || node.kind === Kind.OBJECT_TYPE_EXTENSION || node.kind === Kind.INTERFACE_TYPE_EXTENSION || node.kind === Kind.UNION_TYPE_EXTENSION || node.kind === Kind.ENUM_TYPE_EXTENSION || node.kind === Kind.INPUT_OBJECT_TYPE_EXTENSION;
}
var init_predicates = __esm({
  "../node_modules/graphql/language/predicates.mjs"() {
    init_kinds();
  }
});

// ../node_modules/graphql/validation/rules/ExecutableDefinitionsRule.mjs
function ExecutableDefinitionsRule(context) {
  return {
    Document(node) {
      for (const definition of node.definitions) {
        if (!isExecutableDefinitionNode(definition)) {
          const defName = definition.kind === Kind.SCHEMA_DEFINITION || definition.kind === Kind.SCHEMA_EXTENSION ? "schema" : '"' + definition.name.value + '"';
          context.reportError(
            new GraphQLError(`The ${defName} definition is not executable.`, {
              nodes: definition
            })
          );
        }
      }
      return false;
    }
  };
}
var init_ExecutableDefinitionsRule = __esm({
  "../node_modules/graphql/validation/rules/ExecutableDefinitionsRule.mjs"() {
    init_GraphQLError();
    init_kinds();
    init_predicates();
  }
});

// ../node_modules/graphql/validation/rules/FieldsOnCorrectTypeRule.mjs
function FieldsOnCorrectTypeRule(context) {
  return {
    Field(node) {
      const type = context.getParentType();
      if (type) {
        const fieldDef = context.getFieldDef();
        if (!fieldDef) {
          const schema = context.getSchema();
          const fieldName = node.name.value;
          let suggestion = didYouMean(
            "to use an inline fragment on",
            getSuggestedTypeNames(schema, type, fieldName)
          );
          if (suggestion === "") {
            suggestion = didYouMean(getSuggestedFieldNames(type, fieldName));
          }
          context.reportError(
            new GraphQLError(
              `Cannot query field "${fieldName}" on type "${type.name}".` + suggestion,
              {
                nodes: node
              }
            )
          );
        }
      }
    }
  };
}
function getSuggestedTypeNames(schema, type, fieldName) {
  if (!isAbstractType(type)) {
    return [];
  }
  const suggestedTypes = /* @__PURE__ */ new Set();
  const usageCount = /* @__PURE__ */ Object.create(null);
  for (const possibleType of schema.getPossibleTypes(type)) {
    if (!possibleType.getFields()[fieldName]) {
      continue;
    }
    suggestedTypes.add(possibleType);
    usageCount[possibleType.name] = 1;
    for (const possibleInterface of possibleType.getInterfaces()) {
      var _usageCount$possibleI;
      if (!possibleInterface.getFields()[fieldName]) {
        continue;
      }
      suggestedTypes.add(possibleInterface);
      usageCount[possibleInterface.name] = ((_usageCount$possibleI = usageCount[possibleInterface.name]) !== null && _usageCount$possibleI !== void 0 ? _usageCount$possibleI : 0) + 1;
    }
  }
  return [...suggestedTypes].sort((typeA, typeB) => {
    const usageCountDiff = usageCount[typeB.name] - usageCount[typeA.name];
    if (usageCountDiff !== 0) {
      return usageCountDiff;
    }
    if (isInterfaceType(typeA) && schema.isSubType(typeA, typeB)) {
      return -1;
    }
    if (isInterfaceType(typeB) && schema.isSubType(typeB, typeA)) {
      return 1;
    }
    return naturalCompare(typeA.name, typeB.name);
  }).map((x) => x.name);
}
function getSuggestedFieldNames(type, fieldName) {
  if (isObjectType(type) || isInterfaceType(type)) {
    const possibleFieldNames = Object.keys(type.getFields());
    return suggestionList(fieldName, possibleFieldNames);
  }
  return [];
}
var init_FieldsOnCorrectTypeRule = __esm({
  "../node_modules/graphql/validation/rules/FieldsOnCorrectTypeRule.mjs"() {
    init_didYouMean();
    init_naturalCompare();
    init_suggestionList();
    init_GraphQLError();
    init_definition();
  }
});

// ../node_modules/graphql/validation/rules/FragmentsOnCompositeTypesRule.mjs
function FragmentsOnCompositeTypesRule(context) {
  return {
    InlineFragment(node) {
      const typeCondition = node.typeCondition;
      if (typeCondition) {
        const type = typeFromAST(context.getSchema(), typeCondition);
        if (type && !isCompositeType(type)) {
          const typeStr = print(typeCondition);
          context.reportError(
            new GraphQLError(
              `Fragment cannot condition on non composite type "${typeStr}".`,
              {
                nodes: typeCondition
              }
            )
          );
        }
      }
    },
    FragmentDefinition(node) {
      const type = typeFromAST(context.getSchema(), node.typeCondition);
      if (type && !isCompositeType(type)) {
        const typeStr = print(node.typeCondition);
        context.reportError(
          new GraphQLError(
            `Fragment "${node.name.value}" cannot condition on non composite type "${typeStr}".`,
            {
              nodes: node.typeCondition
            }
          )
        );
      }
    }
  };
}
var init_FragmentsOnCompositeTypesRule = __esm({
  "../node_modules/graphql/validation/rules/FragmentsOnCompositeTypesRule.mjs"() {
    init_GraphQLError();
    init_printer();
    init_definition();
    init_typeFromAST();
  }
});

// ../node_modules/graphql/validation/rules/KnownArgumentNamesRule.mjs
function KnownArgumentNamesRule(context) {
  return {
    // eslint-disable-next-line new-cap
    ...KnownArgumentNamesOnDirectivesRule(context),
    Argument(argNode) {
      const argDef = context.getArgument();
      const fieldDef = context.getFieldDef();
      const parentType = context.getParentType();
      if (!argDef && fieldDef && parentType) {
        const argName = argNode.name.value;
        const knownArgsNames = fieldDef.args.map((arg) => arg.name);
        const suggestions = suggestionList(argName, knownArgsNames);
        context.reportError(
          new GraphQLError(
            `Unknown argument "${argName}" on field "${parentType.name}.${fieldDef.name}".` + didYouMean(suggestions),
            {
              nodes: argNode
            }
          )
        );
      }
    }
  };
}
function KnownArgumentNamesOnDirectivesRule(context) {
  const directiveArgs = /* @__PURE__ */ Object.create(null);
  const schema = context.getSchema();
  const definedDirectives = schema ? schema.getDirectives() : specifiedDirectives;
  for (const directive of definedDirectives) {
    directiveArgs[directive.name] = directive.args.map((arg) => arg.name);
  }
  const astDefinitions = context.getDocument().definitions;
  for (const def of astDefinitions) {
    if (def.kind === Kind.DIRECTIVE_DEFINITION) {
      var _def$arguments;
      const argsNodes = (_def$arguments = def.arguments) !== null && _def$arguments !== void 0 ? _def$arguments : [];
      directiveArgs[def.name.value] = argsNodes.map((arg) => arg.name.value);
    }
  }
  return {
    Directive(directiveNode) {
      const directiveName = directiveNode.name.value;
      const knownArgs = directiveArgs[directiveName];
      if (directiveNode.arguments && knownArgs) {
        for (const argNode of directiveNode.arguments) {
          const argName = argNode.name.value;
          if (!knownArgs.includes(argName)) {
            const suggestions = suggestionList(argName, knownArgs);
            context.reportError(
              new GraphQLError(
                `Unknown argument "${argName}" on directive "@${directiveName}".` + didYouMean(suggestions),
                {
                  nodes: argNode
                }
              )
            );
          }
        }
      }
      return false;
    }
  };
}
var init_KnownArgumentNamesRule = __esm({
  "../node_modules/graphql/validation/rules/KnownArgumentNamesRule.mjs"() {
    init_didYouMean();
    init_suggestionList();
    init_GraphQLError();
    init_kinds();
    init_directives();
  }
});

// ../node_modules/graphql/validation/rules/KnownDirectivesRule.mjs
function KnownDirectivesRule(context) {
  const locationsMap = /* @__PURE__ */ Object.create(null);
  const schema = context.getSchema();
  const definedDirectives = schema ? schema.getDirectives() : specifiedDirectives;
  for (const directive of definedDirectives) {
    locationsMap[directive.name] = directive.locations;
  }
  const astDefinitions = context.getDocument().definitions;
  for (const def of astDefinitions) {
    if (def.kind === Kind.DIRECTIVE_DEFINITION) {
      locationsMap[def.name.value] = def.locations.map((name) => name.value);
    }
  }
  return {
    Directive(node, _key, _parent, _path, ancestors) {
      const name = node.name.value;
      const locations = locationsMap[name];
      if (!locations) {
        context.reportError(
          new GraphQLError(`Unknown directive "@${name}".`, {
            nodes: node
          })
        );
        return;
      }
      const candidateLocation = getDirectiveLocationForASTPath(ancestors);
      if (candidateLocation && !locations.includes(candidateLocation)) {
        context.reportError(
          new GraphQLError(
            `Directive "@${name}" may not be used on ${candidateLocation}.`,
            {
              nodes: node
            }
          )
        );
      }
    }
  };
}
function getDirectiveLocationForASTPath(ancestors) {
  const appliedTo = ancestors[ancestors.length - 1];
  "kind" in appliedTo || invariant2(false);
  switch (appliedTo.kind) {
    case Kind.OPERATION_DEFINITION:
      return getDirectiveLocationForOperation(appliedTo.operation);
    case Kind.FIELD:
      return DirectiveLocation.FIELD;
    case Kind.FRAGMENT_SPREAD:
      return DirectiveLocation.FRAGMENT_SPREAD;
    case Kind.INLINE_FRAGMENT:
      return DirectiveLocation.INLINE_FRAGMENT;
    case Kind.FRAGMENT_DEFINITION:
      return DirectiveLocation.FRAGMENT_DEFINITION;
    case Kind.VARIABLE_DEFINITION:
      return DirectiveLocation.VARIABLE_DEFINITION;
    case Kind.SCHEMA_DEFINITION:
    case Kind.SCHEMA_EXTENSION:
      return DirectiveLocation.SCHEMA;
    case Kind.SCALAR_TYPE_DEFINITION:
    case Kind.SCALAR_TYPE_EXTENSION:
      return DirectiveLocation.SCALAR;
    case Kind.OBJECT_TYPE_DEFINITION:
    case Kind.OBJECT_TYPE_EXTENSION:
      return DirectiveLocation.OBJECT;
    case Kind.FIELD_DEFINITION:
      return DirectiveLocation.FIELD_DEFINITION;
    case Kind.INTERFACE_TYPE_DEFINITION:
    case Kind.INTERFACE_TYPE_EXTENSION:
      return DirectiveLocation.INTERFACE;
    case Kind.UNION_TYPE_DEFINITION:
    case Kind.UNION_TYPE_EXTENSION:
      return DirectiveLocation.UNION;
    case Kind.ENUM_TYPE_DEFINITION:
    case Kind.ENUM_TYPE_EXTENSION:
      return DirectiveLocation.ENUM;
    case Kind.ENUM_VALUE_DEFINITION:
      return DirectiveLocation.ENUM_VALUE;
    case Kind.INPUT_OBJECT_TYPE_DEFINITION:
    case Kind.INPUT_OBJECT_TYPE_EXTENSION:
      return DirectiveLocation.INPUT_OBJECT;
    case Kind.INPUT_VALUE_DEFINITION: {
      const parentNode = ancestors[ancestors.length - 3];
      "kind" in parentNode || invariant2(false);
      return parentNode.kind === Kind.INPUT_OBJECT_TYPE_DEFINITION ? DirectiveLocation.INPUT_FIELD_DEFINITION : DirectiveLocation.ARGUMENT_DEFINITION;
    }
    // Not reachable, all possible types have been considered.
    /* c8 ignore next */
    default:
      invariant2(false, "Unexpected kind: " + inspect(appliedTo.kind));
  }
}
function getDirectiveLocationForOperation(operation) {
  switch (operation) {
    case OperationTypeNode.QUERY:
      return DirectiveLocation.QUERY;
    case OperationTypeNode.MUTATION:
      return DirectiveLocation.MUTATION;
    case OperationTypeNode.SUBSCRIPTION:
      return DirectiveLocation.SUBSCRIPTION;
  }
}
var init_KnownDirectivesRule = __esm({
  "../node_modules/graphql/validation/rules/KnownDirectivesRule.mjs"() {
    init_inspect();
    init_invariant2();
    init_GraphQLError();
    init_ast();
    init_directiveLocation();
    init_kinds();
    init_directives();
  }
});

// ../node_modules/graphql/validation/rules/KnownFragmentNamesRule.mjs
function KnownFragmentNamesRule(context) {
  return {
    FragmentSpread(node) {
      const fragmentName = node.name.value;
      const fragment = context.getFragment(fragmentName);
      if (!fragment) {
        context.reportError(
          new GraphQLError(`Unknown fragment "${fragmentName}".`, {
            nodes: node.name
          })
        );
      }
    }
  };
}
var init_KnownFragmentNamesRule = __esm({
  "../node_modules/graphql/validation/rules/KnownFragmentNamesRule.mjs"() {
    init_GraphQLError();
  }
});

// ../node_modules/graphql/validation/rules/KnownTypeNamesRule.mjs
function KnownTypeNamesRule(context) {
  const schema = context.getSchema();
  const existingTypesMap = schema ? schema.getTypeMap() : /* @__PURE__ */ Object.create(null);
  const definedTypes = /* @__PURE__ */ Object.create(null);
  for (const def of context.getDocument().definitions) {
    if (isTypeDefinitionNode(def)) {
      definedTypes[def.name.value] = true;
    }
  }
  const typeNames = [
    ...Object.keys(existingTypesMap),
    ...Object.keys(definedTypes)
  ];
  return {
    NamedType(node, _1, parent, _2, ancestors) {
      const typeName = node.name.value;
      if (!existingTypesMap[typeName] && !definedTypes[typeName]) {
        var _ancestors$;
        const definitionNode = (_ancestors$ = ancestors[2]) !== null && _ancestors$ !== void 0 ? _ancestors$ : parent;
        const isSDL = definitionNode != null && isSDLNode(definitionNode);
        if (isSDL && standardTypeNames.includes(typeName)) {
          return;
        }
        const suggestedTypes = suggestionList(
          typeName,
          isSDL ? standardTypeNames.concat(typeNames) : typeNames
        );
        context.reportError(
          new GraphQLError(
            `Unknown type "${typeName}".` + didYouMean(suggestedTypes),
            {
              nodes: node
            }
          )
        );
      }
    }
  };
}
function isSDLNode(value) {
  return "kind" in value && (isTypeSystemDefinitionNode(value) || isTypeSystemExtensionNode(value));
}
var standardTypeNames;
var init_KnownTypeNamesRule = __esm({
  "../node_modules/graphql/validation/rules/KnownTypeNamesRule.mjs"() {
    init_didYouMean();
    init_suggestionList();
    init_GraphQLError();
    init_predicates();
    init_introspection();
    init_scalars();
    standardTypeNames = [...specifiedScalarTypes, ...introspectionTypes].map(
      (type) => type.name
    );
  }
});

// ../node_modules/graphql/validation/rules/LoneAnonymousOperationRule.mjs
function LoneAnonymousOperationRule(context) {
  let operationCount = 0;
  return {
    Document(node) {
      operationCount = node.definitions.filter(
        (definition) => definition.kind === Kind.OPERATION_DEFINITION
      ).length;
    },
    OperationDefinition(node) {
      if (!node.name && operationCount > 1) {
        context.reportError(
          new GraphQLError(
            "This anonymous operation must be the only defined operation.",
            {
              nodes: node
            }
          )
        );
      }
    }
  };
}
var init_LoneAnonymousOperationRule = __esm({
  "../node_modules/graphql/validation/rules/LoneAnonymousOperationRule.mjs"() {
    init_GraphQLError();
    init_kinds();
  }
});

// ../node_modules/graphql/validation/rules/LoneSchemaDefinitionRule.mjs
function LoneSchemaDefinitionRule(context) {
  var _ref, _ref2, _oldSchema$astNode;
  const oldSchema = context.getSchema();
  const alreadyDefined = (_ref = (_ref2 = (_oldSchema$astNode = oldSchema === null || oldSchema === void 0 ? void 0 : oldSchema.astNode) !== null && _oldSchema$astNode !== void 0 ? _oldSchema$astNode : oldSchema === null || oldSchema === void 0 ? void 0 : oldSchema.getQueryType()) !== null && _ref2 !== void 0 ? _ref2 : oldSchema === null || oldSchema === void 0 ? void 0 : oldSchema.getMutationType()) !== null && _ref !== void 0 ? _ref : oldSchema === null || oldSchema === void 0 ? void 0 : oldSchema.getSubscriptionType();
  let schemaDefinitionsCount = 0;
  return {
    SchemaDefinition(node) {
      if (alreadyDefined) {
        context.reportError(
          new GraphQLError(
            "Cannot define a new schema within a schema extension.",
            {
              nodes: node
            }
          )
        );
        return;
      }
      if (schemaDefinitionsCount > 0) {
        context.reportError(
          new GraphQLError("Must provide only one schema definition.", {
            nodes: node
          })
        );
      }
      ++schemaDefinitionsCount;
    }
  };
}
var init_LoneSchemaDefinitionRule = __esm({
  "../node_modules/graphql/validation/rules/LoneSchemaDefinitionRule.mjs"() {
    init_GraphQLError();
  }
});

// ../node_modules/graphql/validation/rules/MaxIntrospectionDepthRule.mjs
function MaxIntrospectionDepthRule(context) {
  function checkDepth(node, visitedFragments = /* @__PURE__ */ Object.create(null), depth = 0) {
    if (node.kind === Kind.FRAGMENT_SPREAD) {
      const fragmentName = node.name.value;
      if (visitedFragments[fragmentName] === true) {
        return false;
      }
      const fragment = context.getFragment(fragmentName);
      if (!fragment) {
        return false;
      }
      try {
        visitedFragments[fragmentName] = true;
        return checkDepth(fragment, visitedFragments, depth);
      } finally {
        visitedFragments[fragmentName] = void 0;
      }
    }
    if (node.kind === Kind.FIELD && // check all introspection lists
    (node.name.value === "fields" || node.name.value === "interfaces" || node.name.value === "possibleTypes" || node.name.value === "inputFields")) {
      depth++;
      if (depth >= MAX_LISTS_DEPTH) {
        return true;
      }
    }
    if ("selectionSet" in node && node.selectionSet) {
      for (const child of node.selectionSet.selections) {
        if (checkDepth(child, visitedFragments, depth)) {
          return true;
        }
      }
    }
    return false;
  }
  return {
    Field(node) {
      if (node.name.value === "__schema" || node.name.value === "__type") {
        if (checkDepth(node)) {
          context.reportError(
            new GraphQLError("Maximum introspection depth exceeded", {
              nodes: [node]
            })
          );
          return false;
        }
      }
    }
  };
}
var MAX_LISTS_DEPTH;
var init_MaxIntrospectionDepthRule = __esm({
  "../node_modules/graphql/validation/rules/MaxIntrospectionDepthRule.mjs"() {
    init_GraphQLError();
    init_kinds();
    MAX_LISTS_DEPTH = 3;
  }
});

// ../node_modules/graphql/validation/rules/NoFragmentCyclesRule.mjs
function NoFragmentCyclesRule(context) {
  const visitedFrags = /* @__PURE__ */ Object.create(null);
  const spreadPath = [];
  const spreadPathIndexByName = /* @__PURE__ */ Object.create(null);
  return {
    OperationDefinition: () => false,
    FragmentDefinition(node) {
      detectCycleRecursive(node);
      return false;
    }
  };
  function detectCycleRecursive(fragment) {
    if (visitedFrags[fragment.name.value]) {
      return;
    }
    const fragmentName = fragment.name.value;
    visitedFrags[fragmentName] = true;
    const spreadNodes = context.getFragmentSpreads(fragment.selectionSet);
    if (spreadNodes.length === 0) {
      return;
    }
    spreadPathIndexByName[fragmentName] = spreadPath.length;
    for (const spreadNode of spreadNodes) {
      const spreadName = spreadNode.name.value;
      const cycleIndex = spreadPathIndexByName[spreadName];
      spreadPath.push(spreadNode);
      if (cycleIndex === void 0) {
        const spreadFragment = context.getFragment(spreadName);
        if (spreadFragment) {
          detectCycleRecursive(spreadFragment);
        }
      } else {
        const cyclePath = spreadPath.slice(cycleIndex);
        const viaPath = cyclePath.slice(0, -1).map((s) => '"' + s.name.value + '"').join(", ");
        context.reportError(
          new GraphQLError(
            `Cannot spread fragment "${spreadName}" within itself` + (viaPath !== "" ? ` via ${viaPath}.` : "."),
            {
              nodes: cyclePath
            }
          )
        );
      }
      spreadPath.pop();
    }
    spreadPathIndexByName[fragmentName] = void 0;
  }
}
var init_NoFragmentCyclesRule = __esm({
  "../node_modules/graphql/validation/rules/NoFragmentCyclesRule.mjs"() {
    init_GraphQLError();
  }
});

// ../node_modules/graphql/validation/rules/NoUndefinedVariablesRule.mjs
function NoUndefinedVariablesRule(context) {
  let variableNameDefined = /* @__PURE__ */ Object.create(null);
  return {
    OperationDefinition: {
      enter() {
        variableNameDefined = /* @__PURE__ */ Object.create(null);
      },
      leave(operation) {
        const usages = context.getRecursiveVariableUsages(operation);
        for (const { node } of usages) {
          const varName = node.name.value;
          if (variableNameDefined[varName] !== true) {
            context.reportError(
              new GraphQLError(
                operation.name ? `Variable "$${varName}" is not defined by operation "${operation.name.value}".` : `Variable "$${varName}" is not defined.`,
                {
                  nodes: [node, operation]
                }
              )
            );
          }
        }
      }
    },
    VariableDefinition(node) {
      variableNameDefined[node.variable.name.value] = true;
    }
  };
}
var init_NoUndefinedVariablesRule = __esm({
  "../node_modules/graphql/validation/rules/NoUndefinedVariablesRule.mjs"() {
    init_GraphQLError();
  }
});

// ../node_modules/graphql/validation/rules/NoUnusedFragmentsRule.mjs
function NoUnusedFragmentsRule(context) {
  const operationDefs = [];
  const fragmentDefs = [];
  return {
    OperationDefinition(node) {
      operationDefs.push(node);
      return false;
    },
    FragmentDefinition(node) {
      fragmentDefs.push(node);
      return false;
    },
    Document: {
      leave() {
        const fragmentNameUsed = /* @__PURE__ */ Object.create(null);
        for (const operation of operationDefs) {
          for (const fragment of context.getRecursivelyReferencedFragments(
            operation
          )) {
            fragmentNameUsed[fragment.name.value] = true;
          }
        }
        for (const fragmentDef of fragmentDefs) {
          const fragName = fragmentDef.name.value;
          if (fragmentNameUsed[fragName] !== true) {
            context.reportError(
              new GraphQLError(`Fragment "${fragName}" is never used.`, {
                nodes: fragmentDef
              })
            );
          }
        }
      }
    }
  };
}
var init_NoUnusedFragmentsRule = __esm({
  "../node_modules/graphql/validation/rules/NoUnusedFragmentsRule.mjs"() {
    init_GraphQLError();
  }
});

// ../node_modules/graphql/validation/rules/NoUnusedVariablesRule.mjs
function NoUnusedVariablesRule(context) {
  let variableDefs = [];
  return {
    OperationDefinition: {
      enter() {
        variableDefs = [];
      },
      leave(operation) {
        const variableNameUsed = /* @__PURE__ */ Object.create(null);
        const usages = context.getRecursiveVariableUsages(operation);
        for (const { node } of usages) {
          variableNameUsed[node.name.value] = true;
        }
        for (const variableDef of variableDefs) {
          const variableName = variableDef.variable.name.value;
          if (variableNameUsed[variableName] !== true) {
            context.reportError(
              new GraphQLError(
                operation.name ? `Variable "$${variableName}" is never used in operation "${operation.name.value}".` : `Variable "$${variableName}" is never used.`,
                {
                  nodes: variableDef
                }
              )
            );
          }
        }
      }
    },
    VariableDefinition(def) {
      variableDefs.push(def);
    }
  };
}
var init_NoUnusedVariablesRule = __esm({
  "../node_modules/graphql/validation/rules/NoUnusedVariablesRule.mjs"() {
    init_GraphQLError();
  }
});

// ../node_modules/graphql/utilities/sortValueNode.mjs
function sortValueNode(valueNode) {
  switch (valueNode.kind) {
    case Kind.OBJECT:
      return { ...valueNode, fields: sortFields(valueNode.fields) };
    case Kind.LIST:
      return { ...valueNode, values: valueNode.values.map(sortValueNode) };
    case Kind.INT:
    case Kind.FLOAT:
    case Kind.STRING:
    case Kind.BOOLEAN:
    case Kind.NULL:
    case Kind.ENUM:
    case Kind.VARIABLE:
      return valueNode;
  }
}
function sortFields(fields) {
  return fields.map((fieldNode) => ({
    ...fieldNode,
    value: sortValueNode(fieldNode.value)
  })).sort(
    (fieldA, fieldB) => naturalCompare(fieldA.name.value, fieldB.name.value)
  );
}
var init_sortValueNode = __esm({
  "../node_modules/graphql/utilities/sortValueNode.mjs"() {
    init_naturalCompare();
    init_kinds();
  }
});

// ../node_modules/graphql/validation/rules/OverlappingFieldsCanBeMergedRule.mjs
function reasonMessage(reason) {
  if (Array.isArray(reason)) {
    return reason.map(
      ([responseName, subReason]) => `subfields "${responseName}" conflict because ` + reasonMessage(subReason)
    ).join(" and ");
  }
  return reason;
}
function OverlappingFieldsCanBeMergedRule(context) {
  const comparedFieldsAndFragmentPairs = new OrderedPairSet();
  const comparedFragmentPairs = new PairSet();
  const cachedFieldsAndFragmentNames = /* @__PURE__ */ new Map();
  return {
    SelectionSet(selectionSet) {
      const conflicts = findConflictsWithinSelectionSet(
        context,
        cachedFieldsAndFragmentNames,
        comparedFieldsAndFragmentPairs,
        comparedFragmentPairs,
        context.getParentType(),
        selectionSet
      );
      for (const [[responseName, reason], fields1, fields2] of conflicts) {
        const reasonMsg = reasonMessage(reason);
        context.reportError(
          new GraphQLError(
            `Fields "${responseName}" conflict because ${reasonMsg}. Use different aliases on the fields to fetch both if this was intentional.`,
            {
              nodes: fields1.concat(fields2)
            }
          )
        );
      }
    }
  };
}
function findConflictsWithinSelectionSet(context, cachedFieldsAndFragmentNames, comparedFieldsAndFragmentPairs, comparedFragmentPairs, parentType, selectionSet) {
  const conflicts = [];
  const [fieldMap, fragmentNames] = getFieldsAndFragmentNames(
    context,
    cachedFieldsAndFragmentNames,
    parentType,
    selectionSet
  );
  collectConflictsWithin(
    context,
    conflicts,
    cachedFieldsAndFragmentNames,
    comparedFieldsAndFragmentPairs,
    comparedFragmentPairs,
    fieldMap
  );
  if (fragmentNames.length !== 0) {
    for (let i = 0; i < fragmentNames.length; i++) {
      collectConflictsBetweenFieldsAndFragment(
        context,
        conflicts,
        cachedFieldsAndFragmentNames,
        comparedFieldsAndFragmentPairs,
        comparedFragmentPairs,
        false,
        fieldMap,
        fragmentNames[i]
      );
      for (let j = i + 1; j < fragmentNames.length; j++) {
        collectConflictsBetweenFragments(
          context,
          conflicts,
          cachedFieldsAndFragmentNames,
          comparedFieldsAndFragmentPairs,
          comparedFragmentPairs,
          false,
          fragmentNames[i],
          fragmentNames[j]
        );
      }
    }
  }
  return conflicts;
}
function collectConflictsBetweenFieldsAndFragment(context, conflicts, cachedFieldsAndFragmentNames, comparedFieldsAndFragmentPairs, comparedFragmentPairs, areMutuallyExclusive, fieldMap, fragmentName) {
  if (comparedFieldsAndFragmentPairs.has(
    fieldMap,
    fragmentName,
    areMutuallyExclusive
  )) {
    return;
  }
  comparedFieldsAndFragmentPairs.add(
    fieldMap,
    fragmentName,
    areMutuallyExclusive
  );
  const fragment = context.getFragment(fragmentName);
  if (!fragment) {
    return;
  }
  const [fieldMap2, referencedFragmentNames] = getReferencedFieldsAndFragmentNames(
    context,
    cachedFieldsAndFragmentNames,
    fragment
  );
  if (fieldMap === fieldMap2) {
    return;
  }
  collectConflictsBetween(
    context,
    conflicts,
    cachedFieldsAndFragmentNames,
    comparedFieldsAndFragmentPairs,
    comparedFragmentPairs,
    areMutuallyExclusive,
    fieldMap,
    fieldMap2
  );
  for (const referencedFragmentName of referencedFragmentNames) {
    collectConflictsBetweenFieldsAndFragment(
      context,
      conflicts,
      cachedFieldsAndFragmentNames,
      comparedFieldsAndFragmentPairs,
      comparedFragmentPairs,
      areMutuallyExclusive,
      fieldMap,
      referencedFragmentName
    );
  }
}
function collectConflictsBetweenFragments(context, conflicts, cachedFieldsAndFragmentNames, comparedFieldsAndFragmentPairs, comparedFragmentPairs, areMutuallyExclusive, fragmentName1, fragmentName2) {
  if (fragmentName1 === fragmentName2) {
    return;
  }
  if (comparedFragmentPairs.has(
    fragmentName1,
    fragmentName2,
    areMutuallyExclusive
  )) {
    return;
  }
  comparedFragmentPairs.add(fragmentName1, fragmentName2, areMutuallyExclusive);
  const fragment1 = context.getFragment(fragmentName1);
  const fragment2 = context.getFragment(fragmentName2);
  if (!fragment1 || !fragment2) {
    return;
  }
  const [fieldMap1, referencedFragmentNames1] = getReferencedFieldsAndFragmentNames(
    context,
    cachedFieldsAndFragmentNames,
    fragment1
  );
  const [fieldMap2, referencedFragmentNames2] = getReferencedFieldsAndFragmentNames(
    context,
    cachedFieldsAndFragmentNames,
    fragment2
  );
  collectConflictsBetween(
    context,
    conflicts,
    cachedFieldsAndFragmentNames,
    comparedFieldsAndFragmentPairs,
    comparedFragmentPairs,
    areMutuallyExclusive,
    fieldMap1,
    fieldMap2
  );
  for (const referencedFragmentName2 of referencedFragmentNames2) {
    collectConflictsBetweenFragments(
      context,
      conflicts,
      cachedFieldsAndFragmentNames,
      comparedFieldsAndFragmentPairs,
      comparedFragmentPairs,
      areMutuallyExclusive,
      fragmentName1,
      referencedFragmentName2
    );
  }
  for (const referencedFragmentName1 of referencedFragmentNames1) {
    collectConflictsBetweenFragments(
      context,
      conflicts,
      cachedFieldsAndFragmentNames,
      comparedFieldsAndFragmentPairs,
      comparedFragmentPairs,
      areMutuallyExclusive,
      referencedFragmentName1,
      fragmentName2
    );
  }
}
function findConflictsBetweenSubSelectionSets(context, cachedFieldsAndFragmentNames, comparedFieldsAndFragmentPairs, comparedFragmentPairs, areMutuallyExclusive, parentType1, selectionSet1, parentType2, selectionSet2) {
  const conflicts = [];
  const [fieldMap1, fragmentNames1] = getFieldsAndFragmentNames(
    context,
    cachedFieldsAndFragmentNames,
    parentType1,
    selectionSet1
  );
  const [fieldMap2, fragmentNames2] = getFieldsAndFragmentNames(
    context,
    cachedFieldsAndFragmentNames,
    parentType2,
    selectionSet2
  );
  collectConflictsBetween(
    context,
    conflicts,
    cachedFieldsAndFragmentNames,
    comparedFieldsAndFragmentPairs,
    comparedFragmentPairs,
    areMutuallyExclusive,
    fieldMap1,
    fieldMap2
  );
  for (const fragmentName2 of fragmentNames2) {
    collectConflictsBetweenFieldsAndFragment(
      context,
      conflicts,
      cachedFieldsAndFragmentNames,
      comparedFieldsAndFragmentPairs,
      comparedFragmentPairs,
      areMutuallyExclusive,
      fieldMap1,
      fragmentName2
    );
  }
  for (const fragmentName1 of fragmentNames1) {
    collectConflictsBetweenFieldsAndFragment(
      context,
      conflicts,
      cachedFieldsAndFragmentNames,
      comparedFieldsAndFragmentPairs,
      comparedFragmentPairs,
      areMutuallyExclusive,
      fieldMap2,
      fragmentName1
    );
  }
  for (const fragmentName1 of fragmentNames1) {
    for (const fragmentName2 of fragmentNames2) {
      collectConflictsBetweenFragments(
        context,
        conflicts,
        cachedFieldsAndFragmentNames,
        comparedFieldsAndFragmentPairs,
        comparedFragmentPairs,
        areMutuallyExclusive,
        fragmentName1,
        fragmentName2
      );
    }
  }
  return conflicts;
}
function collectConflictsWithin(context, conflicts, cachedFieldsAndFragmentNames, comparedFieldsAndFragmentPairs, comparedFragmentPairs, fieldMap) {
  for (const [responseName, fields] of Object.entries(fieldMap)) {
    if (fields.length > 1) {
      for (let i = 0; i < fields.length; i++) {
        for (let j = i + 1; j < fields.length; j++) {
          const conflict = findConflict(
            context,
            cachedFieldsAndFragmentNames,
            comparedFieldsAndFragmentPairs,
            comparedFragmentPairs,
            false,
            // within one collection is never mutually exclusive
            responseName,
            fields[i],
            fields[j]
          );
          if (conflict) {
            conflicts.push(conflict);
          }
        }
      }
    }
  }
}
function collectConflictsBetween(context, conflicts, cachedFieldsAndFragmentNames, comparedFieldsAndFragmentPairs, comparedFragmentPairs, parentFieldsAreMutuallyExclusive, fieldMap1, fieldMap2) {
  for (const [responseName, fields1] of Object.entries(fieldMap1)) {
    const fields2 = fieldMap2[responseName];
    if (fields2) {
      for (const field1 of fields1) {
        for (const field2 of fields2) {
          const conflict = findConflict(
            context,
            cachedFieldsAndFragmentNames,
            comparedFieldsAndFragmentPairs,
            comparedFragmentPairs,
            parentFieldsAreMutuallyExclusive,
            responseName,
            field1,
            field2
          );
          if (conflict) {
            conflicts.push(conflict);
          }
        }
      }
    }
  }
}
function findConflict(context, cachedFieldsAndFragmentNames, comparedFieldsAndFragmentPairs, comparedFragmentPairs, parentFieldsAreMutuallyExclusive, responseName, field1, field2) {
  const [parentType1, node1, def1] = field1;
  const [parentType2, node2, def2] = field2;
  const areMutuallyExclusive = parentFieldsAreMutuallyExclusive || parentType1 !== parentType2 && isObjectType(parentType1) && isObjectType(parentType2);
  if (!areMutuallyExclusive) {
    const name1 = node1.name.value;
    const name2 = node2.name.value;
    if (name1 !== name2) {
      return [
        [responseName, `"${name1}" and "${name2}" are different fields`],
        [node1],
        [node2]
      ];
    }
    if (!sameArguments(node1, node2)) {
      return [
        [responseName, "they have differing arguments"],
        [node1],
        [node2]
      ];
    }
  }
  const type1 = def1 === null || def1 === void 0 ? void 0 : def1.type;
  const type2 = def2 === null || def2 === void 0 ? void 0 : def2.type;
  if (type1 && type2 && doTypesConflict(type1, type2)) {
    return [
      [
        responseName,
        `they return conflicting types "${inspect(type1)}" and "${inspect(
          type2
        )}"`
      ],
      [node1],
      [node2]
    ];
  }
  const selectionSet1 = node1.selectionSet;
  const selectionSet2 = node2.selectionSet;
  if (selectionSet1 && selectionSet2) {
    const conflicts = findConflictsBetweenSubSelectionSets(
      context,
      cachedFieldsAndFragmentNames,
      comparedFieldsAndFragmentPairs,
      comparedFragmentPairs,
      areMutuallyExclusive,
      getNamedType(type1),
      selectionSet1,
      getNamedType(type2),
      selectionSet2
    );
    return subfieldConflicts(conflicts, responseName, node1, node2);
  }
}
function sameArguments(node1, node2) {
  const args1 = node1.arguments;
  const args2 = node2.arguments;
  if (args1 === void 0 || args1.length === 0) {
    return args2 === void 0 || args2.length === 0;
  }
  if (args2 === void 0 || args2.length === 0) {
    return false;
  }
  if (args1.length !== args2.length) {
    return false;
  }
  const values2 = new Map(args2.map(({ name, value }) => [name.value, value]));
  return args1.every((arg1) => {
    const value1 = arg1.value;
    const value2 = values2.get(arg1.name.value);
    if (value2 === void 0) {
      return false;
    }
    return stringifyValue(value1) === stringifyValue(value2);
  });
}
function stringifyValue(value) {
  return print(sortValueNode(value));
}
function doTypesConflict(type1, type2) {
  if (isListType(type1)) {
    return isListType(type2) ? doTypesConflict(type1.ofType, type2.ofType) : true;
  }
  if (isListType(type2)) {
    return true;
  }
  if (isNonNullType(type1)) {
    return isNonNullType(type2) ? doTypesConflict(type1.ofType, type2.ofType) : true;
  }
  if (isNonNullType(type2)) {
    return true;
  }
  if (isLeafType(type1) || isLeafType(type2)) {
    return type1 !== type2;
  }
  return false;
}
function getFieldsAndFragmentNames(context, cachedFieldsAndFragmentNames, parentType, selectionSet) {
  const cached = cachedFieldsAndFragmentNames.get(selectionSet);
  if (cached) {
    return cached;
  }
  const nodeAndDefs = /* @__PURE__ */ Object.create(null);
  const fragmentNames = /* @__PURE__ */ Object.create(null);
  _collectFieldsAndFragmentNames(
    context,
    parentType,
    selectionSet,
    nodeAndDefs,
    fragmentNames
  );
  const result2 = [nodeAndDefs, Object.keys(fragmentNames)];
  cachedFieldsAndFragmentNames.set(selectionSet, result2);
  return result2;
}
function getReferencedFieldsAndFragmentNames(context, cachedFieldsAndFragmentNames, fragment) {
  const cached = cachedFieldsAndFragmentNames.get(fragment.selectionSet);
  if (cached) {
    return cached;
  }
  const fragmentType = typeFromAST(context.getSchema(), fragment.typeCondition);
  return getFieldsAndFragmentNames(
    context,
    cachedFieldsAndFragmentNames,
    fragmentType,
    fragment.selectionSet
  );
}
function _collectFieldsAndFragmentNames(context, parentType, selectionSet, nodeAndDefs, fragmentNames) {
  for (const selection of selectionSet.selections) {
    switch (selection.kind) {
      case Kind.FIELD: {
        const fieldName = selection.name.value;
        let fieldDef;
        if (isObjectType(parentType) || isInterfaceType(parentType)) {
          fieldDef = parentType.getFields()[fieldName];
        }
        const responseName = selection.alias ? selection.alias.value : fieldName;
        if (!nodeAndDefs[responseName]) {
          nodeAndDefs[responseName] = [];
        }
        nodeAndDefs[responseName].push([parentType, selection, fieldDef]);
        break;
      }
      case Kind.FRAGMENT_SPREAD:
        fragmentNames[selection.name.value] = true;
        break;
      case Kind.INLINE_FRAGMENT: {
        const typeCondition = selection.typeCondition;
        const inlineFragmentType = typeCondition ? typeFromAST(context.getSchema(), typeCondition) : parentType;
        _collectFieldsAndFragmentNames(
          context,
          inlineFragmentType,
          selection.selectionSet,
          nodeAndDefs,
          fragmentNames
        );
        break;
      }
    }
  }
}
function subfieldConflicts(conflicts, responseName, node1, node2) {
  if (conflicts.length > 0) {
    return [
      [responseName, conflicts.map(([reason]) => reason)],
      [node1, ...conflicts.map(([, fields1]) => fields1).flat()],
      [node2, ...conflicts.map(([, , fields2]) => fields2).flat()]
    ];
  }
}
var OrderedPairSet, PairSet;
var init_OverlappingFieldsCanBeMergedRule = __esm({
  "../node_modules/graphql/validation/rules/OverlappingFieldsCanBeMergedRule.mjs"() {
    init_inspect();
    init_GraphQLError();
    init_kinds();
    init_printer();
    init_definition();
    init_sortValueNode();
    init_typeFromAST();
    OrderedPairSet = class {
      constructor() {
        this._data = /* @__PURE__ */ new Map();
      }
      has(a, b, weaklyPresent) {
        var _this$_data$get;
        const result2 = (_this$_data$get = this._data.get(a)) === null || _this$_data$get === void 0 ? void 0 : _this$_data$get.get(b);
        if (result2 === void 0) {
          return false;
        }
        return weaklyPresent ? true : weaklyPresent === result2;
      }
      add(a, b, weaklyPresent) {
        const map2 = this._data.get(a);
        if (map2 === void 0) {
          this._data.set(a, /* @__PURE__ */ new Map([[b, weaklyPresent]]));
        } else {
          map2.set(b, weaklyPresent);
        }
      }
    };
    PairSet = class {
      constructor() {
        this._orderedPairSet = new OrderedPairSet();
      }
      has(a, b, weaklyPresent) {
        return a < b ? this._orderedPairSet.has(a, b, weaklyPresent) : this._orderedPairSet.has(b, a, weaklyPresent);
      }
      add(a, b, weaklyPresent) {
        if (a < b) {
          this._orderedPairSet.add(a, b, weaklyPresent);
        } else {
          this._orderedPairSet.add(b, a, weaklyPresent);
        }
      }
    };
  }
});

// ../node_modules/graphql/validation/rules/PossibleFragmentSpreadsRule.mjs
function PossibleFragmentSpreadsRule(context) {
  return {
    InlineFragment(node) {
      const fragType = context.getType();
      const parentType = context.getParentType();
      if (isCompositeType(fragType) && isCompositeType(parentType) && !doTypesOverlap(context.getSchema(), fragType, parentType)) {
        const parentTypeStr = inspect(parentType);
        const fragTypeStr = inspect(fragType);
        context.reportError(
          new GraphQLError(
            `Fragment cannot be spread here as objects of type "${parentTypeStr}" can never be of type "${fragTypeStr}".`,
            {
              nodes: node
            }
          )
        );
      }
    },
    FragmentSpread(node) {
      const fragName = node.name.value;
      const fragType = getFragmentType(context, fragName);
      const parentType = context.getParentType();
      if (fragType && parentType && !doTypesOverlap(context.getSchema(), fragType, parentType)) {
        const parentTypeStr = inspect(parentType);
        const fragTypeStr = inspect(fragType);
        context.reportError(
          new GraphQLError(
            `Fragment "${fragName}" cannot be spread here as objects of type "${parentTypeStr}" can never be of type "${fragTypeStr}".`,
            {
              nodes: node
            }
          )
        );
      }
    }
  };
}
function getFragmentType(context, name) {
  const frag = context.getFragment(name);
  if (frag) {
    const type = typeFromAST(context.getSchema(), frag.typeCondition);
    if (isCompositeType(type)) {
      return type;
    }
  }
}
var init_PossibleFragmentSpreadsRule = __esm({
  "../node_modules/graphql/validation/rules/PossibleFragmentSpreadsRule.mjs"() {
    init_inspect();
    init_GraphQLError();
    init_definition();
    init_typeComparators();
    init_typeFromAST();
  }
});

// ../node_modules/graphql/validation/rules/PossibleTypeExtensionsRule.mjs
function PossibleTypeExtensionsRule(context) {
  const schema = context.getSchema();
  const definedTypes = /* @__PURE__ */ Object.create(null);
  for (const def of context.getDocument().definitions) {
    if (isTypeDefinitionNode(def)) {
      definedTypes[def.name.value] = def;
    }
  }
  return {
    ScalarTypeExtension: checkExtension,
    ObjectTypeExtension: checkExtension,
    InterfaceTypeExtension: checkExtension,
    UnionTypeExtension: checkExtension,
    EnumTypeExtension: checkExtension,
    InputObjectTypeExtension: checkExtension
  };
  function checkExtension(node) {
    const typeName = node.name.value;
    const defNode = definedTypes[typeName];
    const existingType = schema === null || schema === void 0 ? void 0 : schema.getType(typeName);
    let expectedKind;
    if (defNode) {
      expectedKind = defKindToExtKind[defNode.kind];
    } else if (existingType) {
      expectedKind = typeToExtKind(existingType);
    }
    if (expectedKind) {
      if (expectedKind !== node.kind) {
        const kindStr = extensionKindToTypeName(node.kind);
        context.reportError(
          new GraphQLError(`Cannot extend non-${kindStr} type "${typeName}".`, {
            nodes: defNode ? [defNode, node] : node
          })
        );
      }
    } else {
      const allTypeNames = Object.keys({
        ...definedTypes,
        ...schema === null || schema === void 0 ? void 0 : schema.getTypeMap()
      });
      const suggestedTypes = suggestionList(typeName, allTypeNames);
      context.reportError(
        new GraphQLError(
          `Cannot extend type "${typeName}" because it is not defined.` + didYouMean(suggestedTypes),
          {
            nodes: node.name
          }
        )
      );
    }
  }
}
function typeToExtKind(type) {
  if (isScalarType(type)) {
    return Kind.SCALAR_TYPE_EXTENSION;
  }
  if (isObjectType(type)) {
    return Kind.OBJECT_TYPE_EXTENSION;
  }
  if (isInterfaceType(type)) {
    return Kind.INTERFACE_TYPE_EXTENSION;
  }
  if (isUnionType(type)) {
    return Kind.UNION_TYPE_EXTENSION;
  }
  if (isEnumType(type)) {
    return Kind.ENUM_TYPE_EXTENSION;
  }
  if (isInputObjectType(type)) {
    return Kind.INPUT_OBJECT_TYPE_EXTENSION;
  }
  invariant2(false, "Unexpected type: " + inspect(type));
}
function extensionKindToTypeName(kind) {
  switch (kind) {
    case Kind.SCALAR_TYPE_EXTENSION:
      return "scalar";
    case Kind.OBJECT_TYPE_EXTENSION:
      return "object";
    case Kind.INTERFACE_TYPE_EXTENSION:
      return "interface";
    case Kind.UNION_TYPE_EXTENSION:
      return "union";
    case Kind.ENUM_TYPE_EXTENSION:
      return "enum";
    case Kind.INPUT_OBJECT_TYPE_EXTENSION:
      return "input object";
    // Not reachable. All possible types have been considered
    /* c8 ignore next */
    default:
      invariant2(false, "Unexpected kind: " + inspect(kind));
  }
}
var defKindToExtKind;
var init_PossibleTypeExtensionsRule = __esm({
  "../node_modules/graphql/validation/rules/PossibleTypeExtensionsRule.mjs"() {
    init_didYouMean();
    init_inspect();
    init_invariant2();
    init_suggestionList();
    init_GraphQLError();
    init_kinds();
    init_predicates();
    init_definition();
    defKindToExtKind = {
      [Kind.SCALAR_TYPE_DEFINITION]: Kind.SCALAR_TYPE_EXTENSION,
      [Kind.OBJECT_TYPE_DEFINITION]: Kind.OBJECT_TYPE_EXTENSION,
      [Kind.INTERFACE_TYPE_DEFINITION]: Kind.INTERFACE_TYPE_EXTENSION,
      [Kind.UNION_TYPE_DEFINITION]: Kind.UNION_TYPE_EXTENSION,
      [Kind.ENUM_TYPE_DEFINITION]: Kind.ENUM_TYPE_EXTENSION,
      [Kind.INPUT_OBJECT_TYPE_DEFINITION]: Kind.INPUT_OBJECT_TYPE_EXTENSION
    };
  }
});

// ../node_modules/graphql/validation/rules/ProvidedRequiredArgumentsRule.mjs
function ProvidedRequiredArgumentsRule(context) {
  return {
    // eslint-disable-next-line new-cap
    ...ProvidedRequiredArgumentsOnDirectivesRule(context),
    Field: {
      // Validate on leave to allow for deeper errors to appear first.
      leave(fieldNode) {
        var _fieldNode$arguments;
        const fieldDef = context.getFieldDef();
        if (!fieldDef) {
          return false;
        }
        const providedArgs = new Set(
          // FIXME: https://github.com/graphql/graphql-js/issues/2203
          /* c8 ignore next */
          (_fieldNode$arguments = fieldNode.arguments) === null || _fieldNode$arguments === void 0 ? void 0 : _fieldNode$arguments.map((arg) => arg.name.value)
        );
        for (const argDef of fieldDef.args) {
          if (!providedArgs.has(argDef.name) && isRequiredArgument(argDef)) {
            const argTypeStr = inspect(argDef.type);
            context.reportError(
              new GraphQLError(
                `Field "${fieldDef.name}" argument "${argDef.name}" of type "${argTypeStr}" is required, but it was not provided.`,
                {
                  nodes: fieldNode
                }
              )
            );
          }
        }
      }
    }
  };
}
function ProvidedRequiredArgumentsOnDirectivesRule(context) {
  var _schema$getDirectives;
  const requiredArgsMap = /* @__PURE__ */ Object.create(null);
  const schema = context.getSchema();
  const definedDirectives = (_schema$getDirectives = schema === null || schema === void 0 ? void 0 : schema.getDirectives()) !== null && _schema$getDirectives !== void 0 ? _schema$getDirectives : specifiedDirectives;
  for (const directive of definedDirectives) {
    requiredArgsMap[directive.name] = keyMap(
      directive.args.filter(isRequiredArgument),
      (arg) => arg.name
    );
  }
  const astDefinitions = context.getDocument().definitions;
  for (const def of astDefinitions) {
    if (def.kind === Kind.DIRECTIVE_DEFINITION) {
      var _def$arguments;
      const argNodes = (_def$arguments = def.arguments) !== null && _def$arguments !== void 0 ? _def$arguments : [];
      requiredArgsMap[def.name.value] = keyMap(
        argNodes.filter(isRequiredArgumentNode),
        (arg) => arg.name.value
      );
    }
  }
  return {
    Directive: {
      // Validate on leave to allow for deeper errors to appear first.
      leave(directiveNode) {
        const directiveName = directiveNode.name.value;
        const requiredArgs = requiredArgsMap[directiveName];
        if (requiredArgs) {
          var _directiveNode$argume;
          const argNodes = (_directiveNode$argume = directiveNode.arguments) !== null && _directiveNode$argume !== void 0 ? _directiveNode$argume : [];
          const argNodeMap = new Set(argNodes.map((arg) => arg.name.value));
          for (const [argName, argDef] of Object.entries(requiredArgs)) {
            if (!argNodeMap.has(argName)) {
              const argType = isType(argDef.type) ? inspect(argDef.type) : print(argDef.type);
              context.reportError(
                new GraphQLError(
                  `Directive "@${directiveName}" argument "${argName}" of type "${argType}" is required, but it was not provided.`,
                  {
                    nodes: directiveNode
                  }
                )
              );
            }
          }
        }
      }
    }
  };
}
function isRequiredArgumentNode(arg) {
  return arg.type.kind === Kind.NON_NULL_TYPE && arg.defaultValue == null;
}
var init_ProvidedRequiredArgumentsRule = __esm({
  "../node_modules/graphql/validation/rules/ProvidedRequiredArgumentsRule.mjs"() {
    init_inspect();
    init_keyMap();
    init_GraphQLError();
    init_kinds();
    init_printer();
    init_definition();
    init_directives();
  }
});

// ../node_modules/graphql/validation/rules/ScalarLeafsRule.mjs
function ScalarLeafsRule(context) {
  return {
    Field(node) {
      const type = context.getType();
      const selectionSet = node.selectionSet;
      if (type) {
        if (isLeafType(getNamedType(type))) {
          if (selectionSet) {
            const fieldName = node.name.value;
            const typeStr = inspect(type);
            context.reportError(
              new GraphQLError(
                `Field "${fieldName}" must not have a selection since type "${typeStr}" has no subfields.`,
                {
                  nodes: selectionSet
                }
              )
            );
          }
        } else if (!selectionSet) {
          const fieldName = node.name.value;
          const typeStr = inspect(type);
          context.reportError(
            new GraphQLError(
              `Field "${fieldName}" of type "${typeStr}" must have a selection of subfields. Did you mean "${fieldName} { ... }"?`,
              {
                nodes: node
              }
            )
          );
        } else if (selectionSet.selections.length === 0) {
          const fieldName = node.name.value;
          const typeStr = inspect(type);
          context.reportError(
            new GraphQLError(
              `Field "${fieldName}" of type "${typeStr}" must have at least one field selected.`,
              {
                nodes: node
              }
            )
          );
        }
      }
    }
  };
}
var init_ScalarLeafsRule = __esm({
  "../node_modules/graphql/validation/rules/ScalarLeafsRule.mjs"() {
    init_inspect();
    init_GraphQLError();
    init_definition();
  }
});

// ../node_modules/graphql/jsutils/printPathArray.mjs
function printPathArray(path) {
  return path.map(
    (key) => typeof key === "number" ? "[" + key.toString() + "]" : "." + key
  ).join("");
}
var init_printPathArray = __esm({
  "../node_modules/graphql/jsutils/printPathArray.mjs"() {
  }
});

// ../node_modules/graphql/jsutils/Path.mjs
function addPath(prev, key, typename) {
  return {
    prev,
    key,
    typename
  };
}
function pathToArray(path) {
  const flattened = [];
  let curr = path;
  while (curr) {
    flattened.push(curr.key);
    curr = curr.prev;
  }
  return flattened.reverse();
}
var init_Path = __esm({
  "../node_modules/graphql/jsutils/Path.mjs"() {
  }
});

// ../node_modules/graphql/utilities/coerceInputValue.mjs
function coerceInputValue(inputValue, type, onError = defaultOnError) {
  return coerceInputValueImpl(inputValue, type, onError, void 0);
}
function defaultOnError(path, invalidValue, error) {
  let errorPrefix = "Invalid value " + inspect(invalidValue);
  if (path.length > 0) {
    errorPrefix += ` at "value${printPathArray(path)}"`;
  }
  error.message = errorPrefix + ": " + error.message;
  throw error;
}
function coerceInputValueImpl(inputValue, type, onError, path) {
  if (isNonNullType(type)) {
    if (inputValue != null) {
      return coerceInputValueImpl(inputValue, type.ofType, onError, path);
    }
    onError(
      pathToArray(path),
      inputValue,
      new GraphQLError(
        `Expected non-nullable type "${inspect(type)}" not to be null.`
      )
    );
    return;
  }
  if (inputValue == null) {
    return null;
  }
  if (isListType(type)) {
    const itemType = type.ofType;
    if (isIterableObject(inputValue)) {
      return Array.from(inputValue, (itemValue, index) => {
        const itemPath = addPath(path, index, void 0);
        return coerceInputValueImpl(itemValue, itemType, onError, itemPath);
      });
    }
    return [coerceInputValueImpl(inputValue, itemType, onError, path)];
  }
  if (isInputObjectType(type)) {
    if (!isObjectLike(inputValue) || Array.isArray(inputValue)) {
      onError(
        pathToArray(path),
        inputValue,
        new GraphQLError(`Expected type "${type.name}" to be an object.`)
      );
      return;
    }
    const coercedValue = {};
    const fieldDefs = type.getFields();
    for (const field of Object.values(fieldDefs)) {
      const fieldValue = inputValue[field.name];
      if (fieldValue === void 0) {
        if (field.defaultValue !== void 0) {
          coercedValue[field.name] = field.defaultValue;
        } else if (isNonNullType(field.type)) {
          const typeStr = inspect(field.type);
          onError(
            pathToArray(path),
            inputValue,
            new GraphQLError(
              `Field "${field.name}" of required type "${typeStr}" was not provided.`
            )
          );
        }
        continue;
      }
      coercedValue[field.name] = coerceInputValueImpl(
        fieldValue,
        field.type,
        onError,
        addPath(path, field.name, type.name)
      );
    }
    for (const fieldName of Object.keys(inputValue)) {
      if (!fieldDefs[fieldName]) {
        const suggestions = suggestionList(
          fieldName,
          Object.keys(type.getFields())
        );
        onError(
          pathToArray(path),
          inputValue,
          new GraphQLError(
            `Field "${fieldName}" is not defined by type "${type.name}".` + didYouMean(suggestions)
          )
        );
      }
    }
    if (type.isOneOf) {
      const keys = Object.keys(coercedValue);
      if (keys.length !== 1) {
        onError(
          pathToArray(path),
          inputValue,
          new GraphQLError(
            `Exactly one key must be specified for OneOf type "${type.name}".`
          )
        );
      }
      const key = keys[0];
      const value = coercedValue[key];
      if (value === null) {
        onError(
          pathToArray(path).concat(key),
          value,
          new GraphQLError(`Field "${key}" must be non-null.`)
        );
      }
    }
    return coercedValue;
  }
  if (isLeafType(type)) {
    let parseResult;
    try {
      parseResult = type.parseValue(inputValue);
    } catch (error) {
      if (error instanceof GraphQLError) {
        onError(pathToArray(path), inputValue, error);
      } else {
        onError(
          pathToArray(path),
          inputValue,
          new GraphQLError(`Expected type "${type.name}". ` + error.message, {
            originalError: error
          })
        );
      }
      return;
    }
    if (parseResult === void 0) {
      onError(
        pathToArray(path),
        inputValue,
        new GraphQLError(`Expected type "${type.name}".`)
      );
    }
    return parseResult;
  }
  invariant2(false, "Unexpected input type: " + inspect(type));
}
var init_coerceInputValue = __esm({
  "../node_modules/graphql/utilities/coerceInputValue.mjs"() {
    init_didYouMean();
    init_inspect();
    init_invariant2();
    init_isIterableObject();
    init_isObjectLike();
    init_Path();
    init_printPathArray();
    init_suggestionList();
    init_GraphQLError();
    init_definition();
  }
});

// ../node_modules/graphql/utilities/valueFromAST.mjs
function valueFromAST(valueNode, type, variables) {
  if (!valueNode) {
    return;
  }
  if (valueNode.kind === Kind.VARIABLE) {
    const variableName = valueNode.name.value;
    if (variables == null || variables[variableName] === void 0) {
      return;
    }
    const variableValue = variables[variableName];
    if (variableValue === null && isNonNullType(type)) {
      return;
    }
    return variableValue;
  }
  if (isNonNullType(type)) {
    if (valueNode.kind === Kind.NULL) {
      return;
    }
    return valueFromAST(valueNode, type.ofType, variables);
  }
  if (valueNode.kind === Kind.NULL) {
    return null;
  }
  if (isListType(type)) {
    const itemType = type.ofType;
    if (valueNode.kind === Kind.LIST) {
      const coercedValues = [];
      for (const itemNode of valueNode.values) {
        if (isMissingVariable(itemNode, variables)) {
          if (isNonNullType(itemType)) {
            return;
          }
          coercedValues.push(null);
        } else {
          const itemValue = valueFromAST(itemNode, itemType, variables);
          if (itemValue === void 0) {
            return;
          }
          coercedValues.push(itemValue);
        }
      }
      return coercedValues;
    }
    const coercedValue = valueFromAST(valueNode, itemType, variables);
    if (coercedValue === void 0) {
      return;
    }
    return [coercedValue];
  }
  if (isInputObjectType(type)) {
    if (valueNode.kind !== Kind.OBJECT) {
      return;
    }
    const coercedObj = /* @__PURE__ */ Object.create(null);
    const fieldNodes = keyMap(valueNode.fields, (field) => field.name.value);
    for (const field of Object.values(type.getFields())) {
      const fieldNode = fieldNodes[field.name];
      if (!fieldNode || isMissingVariable(fieldNode.value, variables)) {
        if (field.defaultValue !== void 0) {
          coercedObj[field.name] = field.defaultValue;
        } else if (isNonNullType(field.type)) {
          return;
        }
        continue;
      }
      const fieldValue = valueFromAST(fieldNode.value, field.type, variables);
      if (fieldValue === void 0) {
        return;
      }
      coercedObj[field.name] = fieldValue;
    }
    if (type.isOneOf) {
      const keys = Object.keys(coercedObj);
      if (keys.length !== 1) {
        return;
      }
      if (coercedObj[keys[0]] === null) {
        return;
      }
    }
    return coercedObj;
  }
  if (isLeafType(type)) {
    let result2;
    try {
      result2 = type.parseLiteral(valueNode, variables);
    } catch (_error) {
      return;
    }
    if (result2 === void 0) {
      return;
    }
    return result2;
  }
  invariant2(false, "Unexpected input type: " + inspect(type));
}
function isMissingVariable(valueNode, variables) {
  return valueNode.kind === Kind.VARIABLE && (variables == null || variables[valueNode.name.value] === void 0);
}
var init_valueFromAST = __esm({
  "../node_modules/graphql/utilities/valueFromAST.mjs"() {
    init_inspect();
    init_invariant2();
    init_keyMap();
    init_kinds();
    init_definition();
  }
});

// ../node_modules/graphql/execution/values.mjs
function getVariableValues(schema, varDefNodes, inputs, options) {
  const errors = [];
  const maxErrors = options === null || options === void 0 ? void 0 : options.maxErrors;
  try {
    const coerced = coerceVariableValues(
      schema,
      varDefNodes,
      inputs,
      (error) => {
        if (maxErrors != null && errors.length >= maxErrors) {
          throw new GraphQLError(
            "Too many errors processing variables, error limit reached. Execution aborted."
          );
        }
        errors.push(error);
      }
    );
    if (errors.length === 0) {
      return {
        coerced
      };
    }
  } catch (error) {
    errors.push(error);
  }
  return {
    errors
  };
}
function coerceVariableValues(schema, varDefNodes, inputs, onError) {
  const coercedValues = {};
  for (const varDefNode of varDefNodes) {
    const varName = varDefNode.variable.name.value;
    const varType = typeFromAST(schema, varDefNode.type);
    if (!isInputType(varType)) {
      const varTypeStr = print(varDefNode.type);
      onError(
        new GraphQLError(
          `Variable "$${varName}" expected value of type "${varTypeStr}" which cannot be used as an input type.`,
          {
            nodes: varDefNode.type
          }
        )
      );
      continue;
    }
    if (!hasOwnProperty(inputs, varName)) {
      if (varDefNode.defaultValue) {
        coercedValues[varName] = valueFromAST(varDefNode.defaultValue, varType);
      } else if (isNonNullType(varType)) {
        const varTypeStr = inspect(varType);
        onError(
          new GraphQLError(
            `Variable "$${varName}" of required type "${varTypeStr}" was not provided.`,
            {
              nodes: varDefNode
            }
          )
        );
      }
      continue;
    }
    const value = inputs[varName];
    if (value === null && isNonNullType(varType)) {
      const varTypeStr = inspect(varType);
      onError(
        new GraphQLError(
          `Variable "$${varName}" of non-null type "${varTypeStr}" must not be null.`,
          {
            nodes: varDefNode
          }
        )
      );
      continue;
    }
    coercedValues[varName] = coerceInputValue(
      value,
      varType,
      (path, invalidValue, error) => {
        let prefix = `Variable "$${varName}" got invalid value ` + inspect(invalidValue);
        if (path.length > 0) {
          prefix += ` at "${varName}${printPathArray(path)}"`;
        }
        onError(
          new GraphQLError(prefix + "; " + error.message, {
            nodes: varDefNode,
            originalError: error
          })
        );
      }
    );
  }
  return coercedValues;
}
function getArgumentValues(def, node, variableValues) {
  var _node$arguments;
  const coercedValues = {};
  const argumentNodes = (_node$arguments = node.arguments) !== null && _node$arguments !== void 0 ? _node$arguments : [];
  const argNodeMap = keyMap(argumentNodes, (arg) => arg.name.value);
  for (const argDef of def.args) {
    const name = argDef.name;
    const argType = argDef.type;
    const argumentNode = argNodeMap[name];
    if (!argumentNode) {
      if (argDef.defaultValue !== void 0) {
        coercedValues[name] = argDef.defaultValue;
      } else if (isNonNullType(argType)) {
        throw new GraphQLError(
          `Argument "${name}" of required type "${inspect(argType)}" was not provided.`,
          {
            nodes: node
          }
        );
      }
      continue;
    }
    const valueNode = argumentNode.value;
    let isNull = valueNode.kind === Kind.NULL;
    if (valueNode.kind === Kind.VARIABLE) {
      const variableName = valueNode.name.value;
      if (variableValues == null || !hasOwnProperty(variableValues, variableName)) {
        if (argDef.defaultValue !== void 0) {
          coercedValues[name] = argDef.defaultValue;
        } else if (isNonNullType(argType)) {
          throw new GraphQLError(
            `Argument "${name}" of required type "${inspect(argType)}" was provided the variable "$${variableName}" which was not provided a runtime value.`,
            {
              nodes: valueNode
            }
          );
        }
        continue;
      }
      isNull = variableValues[variableName] == null;
    }
    if (isNull && isNonNullType(argType)) {
      throw new GraphQLError(
        `Argument "${name}" of non-null type "${inspect(argType)}" must not be null.`,
        {
          nodes: valueNode
        }
      );
    }
    const coercedValue = valueFromAST(valueNode, argType, variableValues);
    if (coercedValue === void 0) {
      throw new GraphQLError(
        `Argument "${name}" has invalid value ${print(valueNode)}.`,
        {
          nodes: valueNode
        }
      );
    }
    coercedValues[name] = coercedValue;
  }
  return coercedValues;
}
function getDirectiveValues(directiveDef, node, variableValues) {
  var _node$directives;
  const directiveNode = (_node$directives = node.directives) === null || _node$directives === void 0 ? void 0 : _node$directives.find(
    (directive) => directive.name.value === directiveDef.name
  );
  if (directiveNode) {
    return getArgumentValues(directiveDef, directiveNode, variableValues);
  }
}
function hasOwnProperty(obj, prop) {
  return Object.prototype.hasOwnProperty.call(obj, prop);
}
var init_values = __esm({
  "../node_modules/graphql/execution/values.mjs"() {
    init_inspect();
    init_keyMap();
    init_printPathArray();
    init_GraphQLError();
    init_kinds();
    init_printer();
    init_definition();
    init_coerceInputValue();
    init_typeFromAST();
    init_valueFromAST();
  }
});

// ../node_modules/graphql/execution/collectFields.mjs
function collectFields(schema, fragments, variableValues, runtimeType, selectionSet) {
  const fields = /* @__PURE__ */ new Map();
  collectFieldsImpl(
    schema,
    fragments,
    variableValues,
    runtimeType,
    selectionSet,
    fields,
    /* @__PURE__ */ new Set()
  );
  return fields;
}
function collectSubfields(schema, fragments, variableValues, returnType, fieldNodes) {
  const subFieldNodes = /* @__PURE__ */ new Map();
  const visitedFragmentNames = /* @__PURE__ */ new Set();
  for (const node of fieldNodes) {
    if (node.selectionSet) {
      collectFieldsImpl(
        schema,
        fragments,
        variableValues,
        returnType,
        node.selectionSet,
        subFieldNodes,
        visitedFragmentNames
      );
    }
  }
  return subFieldNodes;
}
function collectFieldsImpl(schema, fragments, variableValues, runtimeType, selectionSet, fields, visitedFragmentNames) {
  for (const selection of selectionSet.selections) {
    switch (selection.kind) {
      case Kind.FIELD: {
        if (!shouldIncludeNode(variableValues, selection)) {
          continue;
        }
        const name = getFieldEntryKey(selection);
        const fieldList = fields.get(name);
        if (fieldList !== void 0) {
          fieldList.push(selection);
        } else {
          fields.set(name, [selection]);
        }
        break;
      }
      case Kind.INLINE_FRAGMENT: {
        if (!shouldIncludeNode(variableValues, selection) || !doesFragmentConditionMatch(schema, selection, runtimeType)) {
          continue;
        }
        collectFieldsImpl(
          schema,
          fragments,
          variableValues,
          runtimeType,
          selection.selectionSet,
          fields,
          visitedFragmentNames
        );
        break;
      }
      case Kind.FRAGMENT_SPREAD: {
        const fragName = selection.name.value;
        if (visitedFragmentNames.has(fragName) || !shouldIncludeNode(variableValues, selection)) {
          continue;
        }
        visitedFragmentNames.add(fragName);
        const fragment = fragments[fragName];
        if (!fragment || !doesFragmentConditionMatch(schema, fragment, runtimeType)) {
          continue;
        }
        collectFieldsImpl(
          schema,
          fragments,
          variableValues,
          runtimeType,
          fragment.selectionSet,
          fields,
          visitedFragmentNames
        );
        break;
      }
    }
  }
}
function shouldIncludeNode(variableValues, node) {
  const skip2 = getDirectiveValues(GraphQLSkipDirective, node, variableValues);
  if ((skip2 === null || skip2 === void 0 ? void 0 : skip2.if) === true) {
    return false;
  }
  const include = getDirectiveValues(
    GraphQLIncludeDirective,
    node,
    variableValues
  );
  if ((include === null || include === void 0 ? void 0 : include.if) === false) {
    return false;
  }
  return true;
}
function doesFragmentConditionMatch(schema, fragment, type) {
  const typeConditionNode = fragment.typeCondition;
  if (!typeConditionNode) {
    return true;
  }
  const conditionalType = typeFromAST(schema, typeConditionNode);
  if (conditionalType === type) {
    return true;
  }
  if (isAbstractType(conditionalType)) {
    return schema.isSubType(conditionalType, type);
  }
  return false;
}
function getFieldEntryKey(node) {
  return node.alias ? node.alias.value : node.name.value;
}
var init_collectFields = __esm({
  "../node_modules/graphql/execution/collectFields.mjs"() {
    init_kinds();
    init_definition();
    init_directives();
    init_typeFromAST();
    init_values();
  }
});

// ../node_modules/graphql/validation/rules/SingleFieldSubscriptionsRule.mjs
function SingleFieldSubscriptionsRule(context) {
  return {
    OperationDefinition(node) {
      if (node.operation === "subscription") {
        const schema = context.getSchema();
        const subscriptionType = schema.getSubscriptionType();
        if (subscriptionType) {
          const operationName = node.name ? node.name.value : null;
          const variableValues = /* @__PURE__ */ Object.create(null);
          const document = context.getDocument();
          const fragments = /* @__PURE__ */ Object.create(null);
          for (const definition of document.definitions) {
            if (definition.kind === Kind.FRAGMENT_DEFINITION) {
              fragments[definition.name.value] = definition;
            }
          }
          const fields = collectFields(
            schema,
            fragments,
            variableValues,
            subscriptionType,
            node.selectionSet
          );
          if (fields.size > 1) {
            const fieldSelectionLists = [...fields.values()];
            const extraFieldSelectionLists = fieldSelectionLists.slice(1);
            const extraFieldSelections = extraFieldSelectionLists.flat();
            context.reportError(
              new GraphQLError(
                operationName != null ? `Subscription "${operationName}" must select only one top level field.` : "Anonymous Subscription must select only one top level field.",
                {
                  nodes: extraFieldSelections
                }
              )
            );
          }
          for (const fieldNodes of fields.values()) {
            const field = fieldNodes[0];
            const fieldName = field.name.value;
            if (fieldName.startsWith("__")) {
              context.reportError(
                new GraphQLError(
                  operationName != null ? `Subscription "${operationName}" must not select an introspection top level field.` : "Anonymous Subscription must not select an introspection top level field.",
                  {
                    nodes: fieldNodes
                  }
                )
              );
            }
          }
        }
      }
    }
  };
}
var init_SingleFieldSubscriptionsRule = __esm({
  "../node_modules/graphql/validation/rules/SingleFieldSubscriptionsRule.mjs"() {
    init_GraphQLError();
    init_kinds();
    init_collectFields();
  }
});

// ../node_modules/graphql/jsutils/groupBy.mjs
function groupBy(list, keyFn) {
  const result2 = /* @__PURE__ */ new Map();
  for (const item of list) {
    const key = keyFn(item);
    const group = result2.get(key);
    if (group === void 0) {
      result2.set(key, [item]);
    } else {
      group.push(item);
    }
  }
  return result2;
}
var init_groupBy = __esm({
  "../node_modules/graphql/jsutils/groupBy.mjs"() {
  }
});

// ../node_modules/graphql/validation/rules/UniqueArgumentDefinitionNamesRule.mjs
function UniqueArgumentDefinitionNamesRule(context) {
  return {
    DirectiveDefinition(directiveNode) {
      var _directiveNode$argume;
      const argumentNodes = (_directiveNode$argume = directiveNode.arguments) !== null && _directiveNode$argume !== void 0 ? _directiveNode$argume : [];
      return checkArgUniqueness(`@${directiveNode.name.value}`, argumentNodes);
    },
    InterfaceTypeDefinition: checkArgUniquenessPerField,
    InterfaceTypeExtension: checkArgUniquenessPerField,
    ObjectTypeDefinition: checkArgUniquenessPerField,
    ObjectTypeExtension: checkArgUniquenessPerField
  };
  function checkArgUniquenessPerField(typeNode) {
    var _typeNode$fields;
    const typeName = typeNode.name.value;
    const fieldNodes = (_typeNode$fields = typeNode.fields) !== null && _typeNode$fields !== void 0 ? _typeNode$fields : [];
    for (const fieldDef of fieldNodes) {
      var _fieldDef$arguments;
      const fieldName = fieldDef.name.value;
      const argumentNodes = (_fieldDef$arguments = fieldDef.arguments) !== null && _fieldDef$arguments !== void 0 ? _fieldDef$arguments : [];
      checkArgUniqueness(`${typeName}.${fieldName}`, argumentNodes);
    }
    return false;
  }
  function checkArgUniqueness(parentName, argumentNodes) {
    const seenArgs = groupBy(argumentNodes, (arg) => arg.name.value);
    for (const [argName, argNodes] of seenArgs) {
      if (argNodes.length > 1) {
        context.reportError(
          new GraphQLError(
            `Argument "${parentName}(${argName}:)" can only be defined once.`,
            {
              nodes: argNodes.map((node) => node.name)
            }
          )
        );
      }
    }
    return false;
  }
}
var init_UniqueArgumentDefinitionNamesRule = __esm({
  "../node_modules/graphql/validation/rules/UniqueArgumentDefinitionNamesRule.mjs"() {
    init_groupBy();
    init_GraphQLError();
  }
});

// ../node_modules/graphql/validation/rules/UniqueArgumentNamesRule.mjs
function UniqueArgumentNamesRule(context) {
  return {
    Field: checkArgUniqueness,
    Directive: checkArgUniqueness
  };
  function checkArgUniqueness(parentNode) {
    var _parentNode$arguments;
    const argumentNodes = (_parentNode$arguments = parentNode.arguments) !== null && _parentNode$arguments !== void 0 ? _parentNode$arguments : [];
    const seenArgs = groupBy(argumentNodes, (arg) => arg.name.value);
    for (const [argName, argNodes] of seenArgs) {
      if (argNodes.length > 1) {
        context.reportError(
          new GraphQLError(
            `There can be only one argument named "${argName}".`,
            {
              nodes: argNodes.map((node) => node.name)
            }
          )
        );
      }
    }
  }
}
var init_UniqueArgumentNamesRule = __esm({
  "../node_modules/graphql/validation/rules/UniqueArgumentNamesRule.mjs"() {
    init_groupBy();
    init_GraphQLError();
  }
});

// ../node_modules/graphql/validation/rules/UniqueDirectiveNamesRule.mjs
function UniqueDirectiveNamesRule(context) {
  const knownDirectiveNames = /* @__PURE__ */ Object.create(null);
  const schema = context.getSchema();
  return {
    DirectiveDefinition(node) {
      const directiveName = node.name.value;
      if (schema !== null && schema !== void 0 && schema.getDirective(directiveName)) {
        context.reportError(
          new GraphQLError(
            `Directive "@${directiveName}" already exists in the schema. It cannot be redefined.`,
            {
              nodes: node.name
            }
          )
        );
        return;
      }
      if (knownDirectiveNames[directiveName]) {
        context.reportError(
          new GraphQLError(
            `There can be only one directive named "@${directiveName}".`,
            {
              nodes: [knownDirectiveNames[directiveName], node.name]
            }
          )
        );
      } else {
        knownDirectiveNames[directiveName] = node.name;
      }
      return false;
    }
  };
}
var init_UniqueDirectiveNamesRule = __esm({
  "../node_modules/graphql/validation/rules/UniqueDirectiveNamesRule.mjs"() {
    init_GraphQLError();
  }
});

// ../node_modules/graphql/validation/rules/UniqueDirectivesPerLocationRule.mjs
function UniqueDirectivesPerLocationRule(context) {
  const uniqueDirectiveMap = /* @__PURE__ */ Object.create(null);
  const schema = context.getSchema();
  const definedDirectives = schema ? schema.getDirectives() : specifiedDirectives;
  for (const directive of definedDirectives) {
    uniqueDirectiveMap[directive.name] = !directive.isRepeatable;
  }
  const astDefinitions = context.getDocument().definitions;
  for (const def of astDefinitions) {
    if (def.kind === Kind.DIRECTIVE_DEFINITION) {
      uniqueDirectiveMap[def.name.value] = !def.repeatable;
    }
  }
  const schemaDirectives = /* @__PURE__ */ Object.create(null);
  const typeDirectivesMap = /* @__PURE__ */ Object.create(null);
  return {
    // Many different AST nodes may contain directives. Rather than listing
    // them all, just listen for entering any node, and check to see if it
    // defines any directives.
    enter(node) {
      if (!("directives" in node) || !node.directives) {
        return;
      }
      let seenDirectives;
      if (node.kind === Kind.SCHEMA_DEFINITION || node.kind === Kind.SCHEMA_EXTENSION) {
        seenDirectives = schemaDirectives;
      } else if (isTypeDefinitionNode(node) || isTypeExtensionNode(node)) {
        const typeName = node.name.value;
        seenDirectives = typeDirectivesMap[typeName];
        if (seenDirectives === void 0) {
          typeDirectivesMap[typeName] = seenDirectives = /* @__PURE__ */ Object.create(null);
        }
      } else {
        seenDirectives = /* @__PURE__ */ Object.create(null);
      }
      for (const directive of node.directives) {
        const directiveName = directive.name.value;
        if (uniqueDirectiveMap[directiveName]) {
          if (seenDirectives[directiveName]) {
            context.reportError(
              new GraphQLError(
                `The directive "@${directiveName}" can only be used once at this location.`,
                {
                  nodes: [seenDirectives[directiveName], directive]
                }
              )
            );
          } else {
            seenDirectives[directiveName] = directive;
          }
        }
      }
    }
  };
}
var init_UniqueDirectivesPerLocationRule = __esm({
  "../node_modules/graphql/validation/rules/UniqueDirectivesPerLocationRule.mjs"() {
    init_GraphQLError();
    init_kinds();
    init_predicates();
    init_directives();
  }
});

// ../node_modules/graphql/validation/rules/UniqueEnumValueNamesRule.mjs
function UniqueEnumValueNamesRule(context) {
  const schema = context.getSchema();
  const existingTypeMap = schema ? schema.getTypeMap() : /* @__PURE__ */ Object.create(null);
  const knownValueNames = /* @__PURE__ */ Object.create(null);
  return {
    EnumTypeDefinition: checkValueUniqueness,
    EnumTypeExtension: checkValueUniqueness
  };
  function checkValueUniqueness(node) {
    var _node$values;
    const typeName = node.name.value;
    if (!knownValueNames[typeName]) {
      knownValueNames[typeName] = /* @__PURE__ */ Object.create(null);
    }
    const valueNodes = (_node$values = node.values) !== null && _node$values !== void 0 ? _node$values : [];
    const valueNames = knownValueNames[typeName];
    for (const valueDef of valueNodes) {
      const valueName = valueDef.name.value;
      const existingType = existingTypeMap[typeName];
      if (isEnumType(existingType) && existingType.getValue(valueName)) {
        context.reportError(
          new GraphQLError(
            `Enum value "${typeName}.${valueName}" already exists in the schema. It cannot also be defined in this type extension.`,
            {
              nodes: valueDef.name
            }
          )
        );
      } else if (valueNames[valueName]) {
        context.reportError(
          new GraphQLError(
            `Enum value "${typeName}.${valueName}" can only be defined once.`,
            {
              nodes: [valueNames[valueName], valueDef.name]
            }
          )
        );
      } else {
        valueNames[valueName] = valueDef.name;
      }
    }
    return false;
  }
}
var init_UniqueEnumValueNamesRule = __esm({
  "../node_modules/graphql/validation/rules/UniqueEnumValueNamesRule.mjs"() {
    init_GraphQLError();
    init_definition();
  }
});

// ../node_modules/graphql/validation/rules/UniqueFieldDefinitionNamesRule.mjs
function UniqueFieldDefinitionNamesRule(context) {
  const schema = context.getSchema();
  const existingTypeMap = schema ? schema.getTypeMap() : /* @__PURE__ */ Object.create(null);
  const knownFieldNames = /* @__PURE__ */ Object.create(null);
  return {
    InputObjectTypeDefinition: checkFieldUniqueness,
    InputObjectTypeExtension: checkFieldUniqueness,
    InterfaceTypeDefinition: checkFieldUniqueness,
    InterfaceTypeExtension: checkFieldUniqueness,
    ObjectTypeDefinition: checkFieldUniqueness,
    ObjectTypeExtension: checkFieldUniqueness
  };
  function checkFieldUniqueness(node) {
    var _node$fields;
    const typeName = node.name.value;
    if (!knownFieldNames[typeName]) {
      knownFieldNames[typeName] = /* @__PURE__ */ Object.create(null);
    }
    const fieldNodes = (_node$fields = node.fields) !== null && _node$fields !== void 0 ? _node$fields : [];
    const fieldNames = knownFieldNames[typeName];
    for (const fieldDef of fieldNodes) {
      const fieldName = fieldDef.name.value;
      if (hasField(existingTypeMap[typeName], fieldName)) {
        context.reportError(
          new GraphQLError(
            `Field "${typeName}.${fieldName}" already exists in the schema. It cannot also be defined in this type extension.`,
            {
              nodes: fieldDef.name
            }
          )
        );
      } else if (fieldNames[fieldName]) {
        context.reportError(
          new GraphQLError(
            `Field "${typeName}.${fieldName}" can only be defined once.`,
            {
              nodes: [fieldNames[fieldName], fieldDef.name]
            }
          )
        );
      } else {
        fieldNames[fieldName] = fieldDef.name;
      }
    }
    return false;
  }
}
function hasField(type, fieldName) {
  if (isObjectType(type) || isInterfaceType(type) || isInputObjectType(type)) {
    return type.getFields()[fieldName] != null;
  }
  return false;
}
var init_UniqueFieldDefinitionNamesRule = __esm({
  "../node_modules/graphql/validation/rules/UniqueFieldDefinitionNamesRule.mjs"() {
    init_GraphQLError();
    init_definition();
  }
});

// ../node_modules/graphql/validation/rules/UniqueFragmentNamesRule.mjs
function UniqueFragmentNamesRule(context) {
  const knownFragmentNames = /* @__PURE__ */ Object.create(null);
  return {
    OperationDefinition: () => false,
    FragmentDefinition(node) {
      const fragmentName = node.name.value;
      if (knownFragmentNames[fragmentName]) {
        context.reportError(
          new GraphQLError(
            `There can be only one fragment named "${fragmentName}".`,
            {
              nodes: [knownFragmentNames[fragmentName], node.name]
            }
          )
        );
      } else {
        knownFragmentNames[fragmentName] = node.name;
      }
      return false;
    }
  };
}
var init_UniqueFragmentNamesRule = __esm({
  "../node_modules/graphql/validation/rules/UniqueFragmentNamesRule.mjs"() {
    init_GraphQLError();
  }
});

// ../node_modules/graphql/validation/rules/UniqueInputFieldNamesRule.mjs
function UniqueInputFieldNamesRule(context) {
  const knownNameStack = [];
  let knownNames = /* @__PURE__ */ Object.create(null);
  return {
    ObjectValue: {
      enter() {
        knownNameStack.push(knownNames);
        knownNames = /* @__PURE__ */ Object.create(null);
      },
      leave() {
        const prevKnownNames = knownNameStack.pop();
        prevKnownNames || invariant2(false);
        knownNames = prevKnownNames;
      }
    },
    ObjectField(node) {
      const fieldName = node.name.value;
      if (knownNames[fieldName]) {
        context.reportError(
          new GraphQLError(
            `There can be only one input field named "${fieldName}".`,
            {
              nodes: [knownNames[fieldName], node.name]
            }
          )
        );
      } else {
        knownNames[fieldName] = node.name;
      }
    }
  };
}
var init_UniqueInputFieldNamesRule = __esm({
  "../node_modules/graphql/validation/rules/UniqueInputFieldNamesRule.mjs"() {
    init_invariant2();
    init_GraphQLError();
  }
});

// ../node_modules/graphql/validation/rules/UniqueOperationNamesRule.mjs
function UniqueOperationNamesRule(context) {
  const knownOperationNames = /* @__PURE__ */ Object.create(null);
  return {
    OperationDefinition(node) {
      const operationName = node.name;
      if (operationName) {
        if (knownOperationNames[operationName.value]) {
          context.reportError(
            new GraphQLError(
              `There can be only one operation named "${operationName.value}".`,
              {
                nodes: [
                  knownOperationNames[operationName.value],
                  operationName
                ]
              }
            )
          );
        } else {
          knownOperationNames[operationName.value] = operationName;
        }
      }
      return false;
    },
    FragmentDefinition: () => false
  };
}
var init_UniqueOperationNamesRule = __esm({
  "../node_modules/graphql/validation/rules/UniqueOperationNamesRule.mjs"() {
    init_GraphQLError();
  }
});

// ../node_modules/graphql/validation/rules/UniqueOperationTypesRule.mjs
function UniqueOperationTypesRule(context) {
  const schema = context.getSchema();
  const definedOperationTypes = /* @__PURE__ */ Object.create(null);
  const existingOperationTypes = schema ? {
    query: schema.getQueryType(),
    mutation: schema.getMutationType(),
    subscription: schema.getSubscriptionType()
  } : {};
  return {
    SchemaDefinition: checkOperationTypes,
    SchemaExtension: checkOperationTypes
  };
  function checkOperationTypes(node) {
    var _node$operationTypes;
    const operationTypesNodes = (_node$operationTypes = node.operationTypes) !== null && _node$operationTypes !== void 0 ? _node$operationTypes : [];
    for (const operationType of operationTypesNodes) {
      const operation = operationType.operation;
      const alreadyDefinedOperationType = definedOperationTypes[operation];
      if (existingOperationTypes[operation]) {
        context.reportError(
          new GraphQLError(
            `Type for ${operation} already defined in the schema. It cannot be redefined.`,
            {
              nodes: operationType
            }
          )
        );
      } else if (alreadyDefinedOperationType) {
        context.reportError(
          new GraphQLError(
            `There can be only one ${operation} type in schema.`,
            {
              nodes: [alreadyDefinedOperationType, operationType]
            }
          )
        );
      } else {
        definedOperationTypes[operation] = operationType;
      }
    }
    return false;
  }
}
var init_UniqueOperationTypesRule = __esm({
  "../node_modules/graphql/validation/rules/UniqueOperationTypesRule.mjs"() {
    init_GraphQLError();
  }
});

// ../node_modules/graphql/validation/rules/UniqueTypeNamesRule.mjs
function UniqueTypeNamesRule(context) {
  const knownTypeNames = /* @__PURE__ */ Object.create(null);
  const schema = context.getSchema();
  return {
    ScalarTypeDefinition: checkTypeName,
    ObjectTypeDefinition: checkTypeName,
    InterfaceTypeDefinition: checkTypeName,
    UnionTypeDefinition: checkTypeName,
    EnumTypeDefinition: checkTypeName,
    InputObjectTypeDefinition: checkTypeName
  };
  function checkTypeName(node) {
    const typeName = node.name.value;
    if (schema !== null && schema !== void 0 && schema.getType(typeName)) {
      context.reportError(
        new GraphQLError(
          `Type "${typeName}" already exists in the schema. It cannot also be defined in this type definition.`,
          {
            nodes: node.name
          }
        )
      );
      return;
    }
    if (knownTypeNames[typeName]) {
      context.reportError(
        new GraphQLError(`There can be only one type named "${typeName}".`, {
          nodes: [knownTypeNames[typeName], node.name]
        })
      );
    } else {
      knownTypeNames[typeName] = node.name;
    }
    return false;
  }
}
var init_UniqueTypeNamesRule = __esm({
  "../node_modules/graphql/validation/rules/UniqueTypeNamesRule.mjs"() {
    init_GraphQLError();
  }
});

// ../node_modules/graphql/validation/rules/UniqueVariableNamesRule.mjs
function UniqueVariableNamesRule(context) {
  return {
    OperationDefinition(operationNode) {
      var _operationNode$variab;
      const variableDefinitions = (_operationNode$variab = operationNode.variableDefinitions) !== null && _operationNode$variab !== void 0 ? _operationNode$variab : [];
      const seenVariableDefinitions = groupBy(
        variableDefinitions,
        (node) => node.variable.name.value
      );
      for (const [variableName, variableNodes] of seenVariableDefinitions) {
        if (variableNodes.length > 1) {
          context.reportError(
            new GraphQLError(
              `There can be only one variable named "$${variableName}".`,
              {
                nodes: variableNodes.map((node) => node.variable.name)
              }
            )
          );
        }
      }
    }
  };
}
var init_UniqueVariableNamesRule = __esm({
  "../node_modules/graphql/validation/rules/UniqueVariableNamesRule.mjs"() {
    init_groupBy();
    init_GraphQLError();
  }
});

// ../node_modules/graphql/validation/rules/ValuesOfCorrectTypeRule.mjs
function ValuesOfCorrectTypeRule(context) {
  let variableDefinitions = {};
  return {
    OperationDefinition: {
      enter() {
        variableDefinitions = {};
      }
    },
    VariableDefinition(definition) {
      variableDefinitions[definition.variable.name.value] = definition;
    },
    ListValue(node) {
      const type = getNullableType(context.getParentInputType());
      if (!isListType(type)) {
        isValidValueNode(context, node);
        return false;
      }
    },
    ObjectValue(node) {
      const type = getNamedType(context.getInputType());
      if (!isInputObjectType(type)) {
        isValidValueNode(context, node);
        return false;
      }
      const fieldNodeMap = keyMap(node.fields, (field) => field.name.value);
      for (const fieldDef of Object.values(type.getFields())) {
        const fieldNode = fieldNodeMap[fieldDef.name];
        if (!fieldNode && isRequiredInputField(fieldDef)) {
          const typeStr = inspect(fieldDef.type);
          context.reportError(
            new GraphQLError(
              `Field "${type.name}.${fieldDef.name}" of required type "${typeStr}" was not provided.`,
              {
                nodes: node
              }
            )
          );
        }
      }
      if (type.isOneOf) {
        validateOneOfInputObject(
          context,
          node,
          type,
          fieldNodeMap,
          variableDefinitions
        );
      }
    },
    ObjectField(node) {
      const parentType = getNamedType(context.getParentInputType());
      const fieldType = context.getInputType();
      if (!fieldType && isInputObjectType(parentType)) {
        const suggestions = suggestionList(
          node.name.value,
          Object.keys(parentType.getFields())
        );
        context.reportError(
          new GraphQLError(
            `Field "${node.name.value}" is not defined by type "${parentType.name}".` + didYouMean(suggestions),
            {
              nodes: node
            }
          )
        );
      }
    },
    NullValue(node) {
      const type = context.getInputType();
      if (isNonNullType(type)) {
        context.reportError(
          new GraphQLError(
            `Expected value of type "${inspect(type)}", found ${print(node)}.`,
            {
              nodes: node
            }
          )
        );
      }
    },
    EnumValue: (node) => isValidValueNode(context, node),
    IntValue: (node) => isValidValueNode(context, node),
    FloatValue: (node) => isValidValueNode(context, node),
    StringValue: (node) => isValidValueNode(context, node),
    BooleanValue: (node) => isValidValueNode(context, node)
  };
}
function isValidValueNode(context, node) {
  const locationType = context.getInputType();
  if (!locationType) {
    return;
  }
  const type = getNamedType(locationType);
  if (!isLeafType(type)) {
    const typeStr = inspect(locationType);
    context.reportError(
      new GraphQLError(
        `Expected value of type "${typeStr}", found ${print(node)}.`,
        {
          nodes: node
        }
      )
    );
    return;
  }
  try {
    const parseResult = type.parseLiteral(
      node,
      void 0
      /* variables */
    );
    if (parseResult === void 0) {
      const typeStr = inspect(locationType);
      context.reportError(
        new GraphQLError(
          `Expected value of type "${typeStr}", found ${print(node)}.`,
          {
            nodes: node
          }
        )
      );
    }
  } catch (error) {
    const typeStr = inspect(locationType);
    if (error instanceof GraphQLError) {
      context.reportError(error);
    } else {
      context.reportError(
        new GraphQLError(
          `Expected value of type "${typeStr}", found ${print(node)}; ` + error.message,
          {
            nodes: node,
            originalError: error
          }
        )
      );
    }
  }
}
function validateOneOfInputObject(context, node, type, fieldNodeMap, variableDefinitions) {
  var _fieldNodeMap$keys$;
  const keys = Object.keys(fieldNodeMap);
  const isNotExactlyOneField = keys.length !== 1;
  if (isNotExactlyOneField) {
    context.reportError(
      new GraphQLError(
        `OneOf Input Object "${type.name}" must specify exactly one key.`,
        {
          nodes: [node]
        }
      )
    );
    return;
  }
  const value = (_fieldNodeMap$keys$ = fieldNodeMap[keys[0]]) === null || _fieldNodeMap$keys$ === void 0 ? void 0 : _fieldNodeMap$keys$.value;
  const isNullLiteral = !value || value.kind === Kind.NULL;
  const isVariable = (value === null || value === void 0 ? void 0 : value.kind) === Kind.VARIABLE;
  if (isNullLiteral) {
    context.reportError(
      new GraphQLError(`Field "${type.name}.${keys[0]}" must be non-null.`, {
        nodes: [node]
      })
    );
    return;
  }
  if (isVariable) {
    const variableName = value.name.value;
    const definition = variableDefinitions[variableName];
    const isNullableVariable = definition.type.kind !== Kind.NON_NULL_TYPE;
    if (isNullableVariable) {
      context.reportError(
        new GraphQLError(
          `Variable "${variableName}" must be non-nullable to be used for OneOf Input Object "${type.name}".`,
          {
            nodes: [node]
          }
        )
      );
    }
  }
}
var init_ValuesOfCorrectTypeRule = __esm({
  "../node_modules/graphql/validation/rules/ValuesOfCorrectTypeRule.mjs"() {
    init_didYouMean();
    init_inspect();
    init_keyMap();
    init_suggestionList();
    init_GraphQLError();
    init_kinds();
    init_printer();
    init_definition();
  }
});

// ../node_modules/graphql/validation/rules/VariablesAreInputTypesRule.mjs
function VariablesAreInputTypesRule(context) {
  return {
    VariableDefinition(node) {
      const type = typeFromAST(context.getSchema(), node.type);
      if (type !== void 0 && !isInputType(type)) {
        const variableName = node.variable.name.value;
        const typeName = print(node.type);
        context.reportError(
          new GraphQLError(
            `Variable "$${variableName}" cannot be non-input type "${typeName}".`,
            {
              nodes: node.type
            }
          )
        );
      }
    }
  };
}
var init_VariablesAreInputTypesRule = __esm({
  "../node_modules/graphql/validation/rules/VariablesAreInputTypesRule.mjs"() {
    init_GraphQLError();
    init_printer();
    init_definition();
    init_typeFromAST();
  }
});

// ../node_modules/graphql/validation/rules/VariablesInAllowedPositionRule.mjs
function VariablesInAllowedPositionRule(context) {
  let varDefMap = /* @__PURE__ */ Object.create(null);
  return {
    OperationDefinition: {
      enter() {
        varDefMap = /* @__PURE__ */ Object.create(null);
      },
      leave(operation) {
        const usages = context.getRecursiveVariableUsages(operation);
        for (const { node, type, defaultValue, parentType } of usages) {
          const varName = node.name.value;
          const varDef = varDefMap[varName];
          if (varDef && type) {
            const schema = context.getSchema();
            const varType = typeFromAST(schema, varDef.type);
            if (varType && !allowedVariableUsage(
              schema,
              varType,
              varDef.defaultValue,
              type,
              defaultValue
            )) {
              const varTypeStr = inspect(varType);
              const typeStr = inspect(type);
              context.reportError(
                new GraphQLError(
                  `Variable "$${varName}" of type "${varTypeStr}" used in position expecting type "${typeStr}".`,
                  {
                    nodes: [varDef, node]
                  }
                )
              );
            }
            if (isInputObjectType(parentType) && parentType.isOneOf && isNullableType(varType)) {
              context.reportError(
                new GraphQLError(
                  `Variable "$${varName}" is of type "${varType}" but must be non-nullable to be used for OneOf Input Object "${parentType}".`,
                  {
                    nodes: [varDef, node]
                  }
                )
              );
            }
          }
        }
      }
    },
    VariableDefinition(node) {
      varDefMap[node.variable.name.value] = node;
    }
  };
}
function allowedVariableUsage(schema, varType, varDefaultValue, locationType, locationDefaultValue) {
  if (isNonNullType(locationType) && !isNonNullType(varType)) {
    const hasNonNullVariableDefaultValue = varDefaultValue != null && varDefaultValue.kind !== Kind.NULL;
    const hasLocationDefaultValue = locationDefaultValue !== void 0;
    if (!hasNonNullVariableDefaultValue && !hasLocationDefaultValue) {
      return false;
    }
    const nullableLocationType = locationType.ofType;
    return isTypeSubTypeOf(schema, varType, nullableLocationType);
  }
  return isTypeSubTypeOf(schema, varType, locationType);
}
var init_VariablesInAllowedPositionRule = __esm({
  "../node_modules/graphql/validation/rules/VariablesInAllowedPositionRule.mjs"() {
    init_inspect();
    init_GraphQLError();
    init_kinds();
    init_definition();
    init_typeComparators();
    init_typeFromAST();
  }
});

// ../node_modules/graphql/validation/specifiedRules.mjs
var recommendedRules, specifiedRules, specifiedSDLRules;
var init_specifiedRules = __esm({
  "../node_modules/graphql/validation/specifiedRules.mjs"() {
    init_ExecutableDefinitionsRule();
    init_FieldsOnCorrectTypeRule();
    init_FragmentsOnCompositeTypesRule();
    init_KnownArgumentNamesRule();
    init_KnownDirectivesRule();
    init_KnownFragmentNamesRule();
    init_KnownTypeNamesRule();
    init_LoneAnonymousOperationRule();
    init_LoneSchemaDefinitionRule();
    init_MaxIntrospectionDepthRule();
    init_NoFragmentCyclesRule();
    init_NoUndefinedVariablesRule();
    init_NoUnusedFragmentsRule();
    init_NoUnusedVariablesRule();
    init_OverlappingFieldsCanBeMergedRule();
    init_PossibleFragmentSpreadsRule();
    init_PossibleTypeExtensionsRule();
    init_ProvidedRequiredArgumentsRule();
    init_ScalarLeafsRule();
    init_SingleFieldSubscriptionsRule();
    init_UniqueArgumentDefinitionNamesRule();
    init_UniqueArgumentNamesRule();
    init_UniqueDirectiveNamesRule();
    init_UniqueDirectivesPerLocationRule();
    init_UniqueEnumValueNamesRule();
    init_UniqueFieldDefinitionNamesRule();
    init_UniqueFragmentNamesRule();
    init_UniqueInputFieldNamesRule();
    init_UniqueOperationNamesRule();
    init_UniqueOperationTypesRule();
    init_UniqueTypeNamesRule();
    init_UniqueVariableNamesRule();
    init_ValuesOfCorrectTypeRule();
    init_VariablesAreInputTypesRule();
    init_VariablesInAllowedPositionRule();
    recommendedRules = Object.freeze([MaxIntrospectionDepthRule]);
    specifiedRules = Object.freeze([
      ExecutableDefinitionsRule,
      UniqueOperationNamesRule,
      LoneAnonymousOperationRule,
      SingleFieldSubscriptionsRule,
      KnownTypeNamesRule,
      FragmentsOnCompositeTypesRule,
      VariablesAreInputTypesRule,
      ScalarLeafsRule,
      FieldsOnCorrectTypeRule,
      UniqueFragmentNamesRule,
      KnownFragmentNamesRule,
      NoUnusedFragmentsRule,
      PossibleFragmentSpreadsRule,
      NoFragmentCyclesRule,
      UniqueVariableNamesRule,
      NoUndefinedVariablesRule,
      NoUnusedVariablesRule,
      KnownDirectivesRule,
      UniqueDirectivesPerLocationRule,
      KnownArgumentNamesRule,
      UniqueArgumentNamesRule,
      ValuesOfCorrectTypeRule,
      ProvidedRequiredArgumentsRule,
      VariablesInAllowedPositionRule,
      OverlappingFieldsCanBeMergedRule,
      UniqueInputFieldNamesRule,
      ...recommendedRules
    ]);
    specifiedSDLRules = Object.freeze([
      LoneSchemaDefinitionRule,
      UniqueOperationTypesRule,
      UniqueTypeNamesRule,
      UniqueEnumValueNamesRule,
      UniqueFieldDefinitionNamesRule,
      UniqueArgumentDefinitionNamesRule,
      UniqueDirectiveNamesRule,
      KnownTypeNamesRule,
      KnownDirectivesRule,
      UniqueDirectivesPerLocationRule,
      PossibleTypeExtensionsRule,
      KnownArgumentNamesOnDirectivesRule,
      UniqueArgumentNamesRule,
      UniqueInputFieldNamesRule,
      ProvidedRequiredArgumentsOnDirectivesRule
    ]);
  }
});

// ../node_modules/graphql/validation/ValidationContext.mjs
var ASTValidationContext, SDLValidationContext, ValidationContext;
var init_ValidationContext = __esm({
  "../node_modules/graphql/validation/ValidationContext.mjs"() {
    init_kinds();
    init_visitor();
    init_TypeInfo();
    ASTValidationContext = class {
      constructor(ast, onError) {
        this._ast = ast;
        this._fragments = void 0;
        this._fragmentSpreads = /* @__PURE__ */ new Map();
        this._recursivelyReferencedFragments = /* @__PURE__ */ new Map();
        this._onError = onError;
      }
      get [Symbol.toStringTag]() {
        return "ASTValidationContext";
      }
      reportError(error) {
        this._onError(error);
      }
      getDocument() {
        return this._ast;
      }
      getFragment(name) {
        let fragments;
        if (this._fragments) {
          fragments = this._fragments;
        } else {
          fragments = /* @__PURE__ */ Object.create(null);
          for (const defNode of this.getDocument().definitions) {
            if (defNode.kind === Kind.FRAGMENT_DEFINITION) {
              fragments[defNode.name.value] = defNode;
            }
          }
          this._fragments = fragments;
        }
        return fragments[name];
      }
      getFragmentSpreads(node) {
        let spreads = this._fragmentSpreads.get(node);
        if (!spreads) {
          spreads = [];
          const setsToVisit = [node];
          let set;
          while (set = setsToVisit.pop()) {
            for (const selection of set.selections) {
              if (selection.kind === Kind.FRAGMENT_SPREAD) {
                spreads.push(selection);
              } else if (selection.selectionSet) {
                setsToVisit.push(selection.selectionSet);
              }
            }
          }
          this._fragmentSpreads.set(node, spreads);
        }
        return spreads;
      }
      getRecursivelyReferencedFragments(operation) {
        let fragments = this._recursivelyReferencedFragments.get(operation);
        if (!fragments) {
          fragments = [];
          const collectedNames = /* @__PURE__ */ Object.create(null);
          const nodesToVisit = [operation.selectionSet];
          let node;
          while (node = nodesToVisit.pop()) {
            for (const spread of this.getFragmentSpreads(node)) {
              const fragName = spread.name.value;
              if (collectedNames[fragName] !== true) {
                collectedNames[fragName] = true;
                const fragment = this.getFragment(fragName);
                if (fragment) {
                  fragments.push(fragment);
                  nodesToVisit.push(fragment.selectionSet);
                }
              }
            }
          }
          this._recursivelyReferencedFragments.set(operation, fragments);
        }
        return fragments;
      }
    };
    SDLValidationContext = class extends ASTValidationContext {
      constructor(ast, schema, onError) {
        super(ast, onError);
        this._schema = schema;
      }
      get [Symbol.toStringTag]() {
        return "SDLValidationContext";
      }
      getSchema() {
        return this._schema;
      }
    };
    ValidationContext = class extends ASTValidationContext {
      constructor(schema, ast, typeInfo, onError) {
        super(ast, onError);
        this._schema = schema;
        this._typeInfo = typeInfo;
        this._variableUsages = /* @__PURE__ */ new Map();
        this._recursiveVariableUsages = /* @__PURE__ */ new Map();
      }
      get [Symbol.toStringTag]() {
        return "ValidationContext";
      }
      getSchema() {
        return this._schema;
      }
      getVariableUsages(node) {
        let usages = this._variableUsages.get(node);
        if (!usages) {
          const newUsages = [];
          const typeInfo = new TypeInfo(this._schema);
          visit(
            node,
            visitWithTypeInfo(typeInfo, {
              VariableDefinition: () => false,
              Variable(variable) {
                newUsages.push({
                  node: variable,
                  type: typeInfo.getInputType(),
                  defaultValue: typeInfo.getDefaultValue(),
                  parentType: typeInfo.getParentInputType()
                });
              }
            })
          );
          usages = newUsages;
          this._variableUsages.set(node, usages);
        }
        return usages;
      }
      getRecursiveVariableUsages(operation) {
        let usages = this._recursiveVariableUsages.get(operation);
        if (!usages) {
          usages = this.getVariableUsages(operation);
          for (const frag of this.getRecursivelyReferencedFragments(operation)) {
            usages = usages.concat(this.getVariableUsages(frag));
          }
          this._recursiveVariableUsages.set(operation, usages);
        }
        return usages;
      }
      getType() {
        return this._typeInfo.getType();
      }
      getParentType() {
        return this._typeInfo.getParentType();
      }
      getInputType() {
        return this._typeInfo.getInputType();
      }
      getParentInputType() {
        return this._typeInfo.getParentInputType();
      }
      getFieldDef() {
        return this._typeInfo.getFieldDef();
      }
      getDirective() {
        return this._typeInfo.getDirective();
      }
      getArgument() {
        return this._typeInfo.getArgument();
      }
      getEnumValue() {
        return this._typeInfo.getEnumValue();
      }
    };
  }
});

// ../node_modules/graphql/validation/validate.mjs
function validate(schema, documentAST, rules = specifiedRules, options, typeInfo = new TypeInfo(schema)) {
  var _options$maxErrors;
  const maxErrors = (_options$maxErrors = options === null || options === void 0 ? void 0 : options.maxErrors) !== null && _options$maxErrors !== void 0 ? _options$maxErrors : 100;
  documentAST || devAssert(false, "Must provide document.");
  assertValidSchema(schema);
  const abortObj = Object.freeze({});
  const errors = [];
  const context = new ValidationContext(
    schema,
    documentAST,
    typeInfo,
    (error) => {
      if (errors.length >= maxErrors) {
        errors.push(
          new GraphQLError(
            "Too many validation errors, error limit reached. Validation aborted."
          )
        );
        throw abortObj;
      }
      errors.push(error);
    }
  );
  const visitor = visitInParallel(rules.map((rule) => rule(context)));
  try {
    visit(documentAST, visitWithTypeInfo(typeInfo, visitor));
  } catch (e) {
    if (e !== abortObj) {
      throw e;
    }
  }
  return errors;
}
function validateSDL(documentAST, schemaToExtend, rules = specifiedSDLRules) {
  const errors = [];
  const context = new SDLValidationContext(
    documentAST,
    schemaToExtend,
    (error) => {
      errors.push(error);
    }
  );
  const visitors = rules.map((rule) => rule(context));
  visit(documentAST, visitInParallel(visitors));
  return errors;
}
function assertValidSDL(documentAST) {
  const errors = validateSDL(documentAST);
  if (errors.length !== 0) {
    throw new Error(errors.map((error) => error.message).join("\n\n"));
  }
}
function assertValidSDLExtension(documentAST, schema) {
  const errors = validateSDL(documentAST, schema);
  if (errors.length !== 0) {
    throw new Error(errors.map((error) => error.message).join("\n\n"));
  }
}
var init_validate2 = __esm({
  "../node_modules/graphql/validation/validate.mjs"() {
    init_devAssert();
    init_GraphQLError();
    init_visitor();
    init_validate();
    init_TypeInfo();
    init_specifiedRules();
    init_ValidationContext();
  }
});

// ../node_modules/graphql/jsutils/memoize3.mjs
function memoize3(fn) {
  let cache0;
  return function memoized(a1, a2, a3) {
    if (cache0 === void 0) {
      cache0 = /* @__PURE__ */ new WeakMap();
    }
    let cache1 = cache0.get(a1);
    if (cache1 === void 0) {
      cache1 = /* @__PURE__ */ new WeakMap();
      cache0.set(a1, cache1);
    }
    let cache2 = cache1.get(a2);
    if (cache2 === void 0) {
      cache2 = /* @__PURE__ */ new WeakMap();
      cache1.set(a2, cache2);
    }
    let fnResult = cache2.get(a3);
    if (fnResult === void 0) {
      fnResult = fn(a1, a2, a3);
      cache2.set(a3, fnResult);
    }
    return fnResult;
  };
}
var init_memoize3 = __esm({
  "../node_modules/graphql/jsutils/memoize3.mjs"() {
  }
});

// ../node_modules/graphql/jsutils/promiseForObject.mjs
function promiseForObject(object) {
  return Promise.all(Object.values(object)).then((resolvedValues) => {
    const resolvedObject = /* @__PURE__ */ Object.create(null);
    for (const [i, key] of Object.keys(object).entries()) {
      resolvedObject[key] = resolvedValues[i];
    }
    return resolvedObject;
  });
}
var init_promiseForObject = __esm({
  "../node_modules/graphql/jsutils/promiseForObject.mjs"() {
  }
});

// ../node_modules/graphql/jsutils/promiseReduce.mjs
function promiseReduce(values, callbackFn, initialValue) {
  let accumulator = initialValue;
  for (const value of values) {
    accumulator = isPromise(accumulator) ? accumulator.then((resolved) => callbackFn(resolved, value)) : callbackFn(accumulator, value);
  }
  return accumulator;
}
var init_promiseReduce = __esm({
  "../node_modules/graphql/jsutils/promiseReduce.mjs"() {
    init_isPromise();
  }
});

// ../node_modules/graphql/jsutils/toError.mjs
function toError(thrownValue) {
  return thrownValue instanceof Error ? thrownValue : new NonErrorThrown(thrownValue);
}
var NonErrorThrown;
var init_toError = __esm({
  "../node_modules/graphql/jsutils/toError.mjs"() {
    init_inspect();
    NonErrorThrown = class extends Error {
      constructor(thrownValue) {
        super("Unexpected error value: " + inspect(thrownValue));
        this.name = "NonErrorThrown";
        this.thrownValue = thrownValue;
      }
    };
  }
});

// ../node_modules/graphql/error/locatedError.mjs
function locatedError(rawOriginalError, nodes, path) {
  var _nodes;
  const originalError = toError(rawOriginalError);
  if (isLocatedGraphQLError(originalError)) {
    return originalError;
  }
  return new GraphQLError(originalError.message, {
    nodes: (_nodes = originalError.nodes) !== null && _nodes !== void 0 ? _nodes : nodes,
    source: originalError.source,
    positions: originalError.positions,
    path,
    originalError
  });
}
function isLocatedGraphQLError(error) {
  return Array.isArray(error.path);
}
var init_locatedError = __esm({
  "../node_modules/graphql/error/locatedError.mjs"() {
    init_toError();
    init_GraphQLError();
  }
});

// ../node_modules/graphql/execution/execute.mjs
function execute(args) {
  arguments.length < 2 || devAssert(
    false,
    "graphql@16 dropped long-deprecated support for positional arguments, please pass an object instead."
  );
  const { schema, document, variableValues, rootValue } = args;
  assertValidExecutionArguments(schema, document, variableValues);
  const exeContext = buildExecutionContext(args);
  if (!("schema" in exeContext)) {
    return {
      errors: exeContext
    };
  }
  try {
    const { operation } = exeContext;
    const result2 = executeOperation(exeContext, operation, rootValue);
    if (isPromise(result2)) {
      return result2.then(
        (data) => buildResponse(data, exeContext.errors),
        (error) => {
          exeContext.errors.push(error);
          return buildResponse(null, exeContext.errors);
        }
      );
    }
    return buildResponse(result2, exeContext.errors);
  } catch (error) {
    exeContext.errors.push(error);
    return buildResponse(null, exeContext.errors);
  }
}
function executeSync(args) {
  const result2 = execute(args);
  if (isPromise(result2)) {
    throw new Error("GraphQL execution failed to complete synchronously.");
  }
  return result2;
}
function buildResponse(data, errors) {
  return errors.length === 0 ? {
    data
  } : {
    errors,
    data
  };
}
function assertValidExecutionArguments(schema, document, rawVariableValues) {
  document || devAssert(false, "Must provide document.");
  assertValidSchema(schema);
  rawVariableValues == null || isObjectLike(rawVariableValues) || devAssert(
    false,
    "Variables must be provided as an Object where each property is a variable value. Perhaps look to see if an unparsed JSON string was provided."
  );
}
function buildExecutionContext(args) {
  var _definition$name, _operation$variableDe, _options$maxCoercionE;
  const {
    schema,
    document,
    rootValue,
    contextValue,
    variableValues: rawVariableValues,
    operationName,
    fieldResolver,
    typeResolver,
    subscribeFieldResolver,
    options
  } = args;
  let operation;
  const fragments = /* @__PURE__ */ Object.create(null);
  for (const definition of document.definitions) {
    switch (definition.kind) {
      case Kind.OPERATION_DEFINITION:
        if (operationName == null) {
          if (operation !== void 0) {
            return [
              new GraphQLError(
                "Must provide operation name if query contains multiple operations."
              )
            ];
          }
          operation = definition;
        } else if (((_definition$name = definition.name) === null || _definition$name === void 0 ? void 0 : _definition$name.value) === operationName) {
          operation = definition;
        }
        break;
      case Kind.FRAGMENT_DEFINITION:
        fragments[definition.name.value] = definition;
        break;
      default:
    }
  }
  if (!operation) {
    if (operationName != null) {
      return [new GraphQLError(`Unknown operation named "${operationName}".`)];
    }
    return [new GraphQLError("Must provide an operation.")];
  }
  const variableDefinitions = (_operation$variableDe = operation.variableDefinitions) !== null && _operation$variableDe !== void 0 ? _operation$variableDe : [];
  const coercedVariableValues = getVariableValues(
    schema,
    variableDefinitions,
    rawVariableValues !== null && rawVariableValues !== void 0 ? rawVariableValues : {},
    {
      maxErrors: (_options$maxCoercionE = options === null || options === void 0 ? void 0 : options.maxCoercionErrors) !== null && _options$maxCoercionE !== void 0 ? _options$maxCoercionE : 50
    }
  );
  if (coercedVariableValues.errors) {
    return coercedVariableValues.errors;
  }
  return {
    schema,
    fragments,
    rootValue,
    contextValue,
    operation,
    variableValues: coercedVariableValues.coerced,
    fieldResolver: fieldResolver !== null && fieldResolver !== void 0 ? fieldResolver : defaultFieldResolver,
    typeResolver: typeResolver !== null && typeResolver !== void 0 ? typeResolver : defaultTypeResolver,
    subscribeFieldResolver: subscribeFieldResolver !== null && subscribeFieldResolver !== void 0 ? subscribeFieldResolver : defaultFieldResolver,
    errors: []
  };
}
function executeOperation(exeContext, operation, rootValue) {
  const rootType = exeContext.schema.getRootType(operation.operation);
  if (rootType == null) {
    throw new GraphQLError(
      `Schema is not configured to execute ${operation.operation} operation.`,
      {
        nodes: operation
      }
    );
  }
  const rootFields = collectFields(
    exeContext.schema,
    exeContext.fragments,
    exeContext.variableValues,
    rootType,
    operation.selectionSet
  );
  const path = void 0;
  switch (operation.operation) {
    case OperationTypeNode.QUERY:
      return executeFields(exeContext, rootType, rootValue, path, rootFields);
    case OperationTypeNode.MUTATION:
      return executeFieldsSerially(
        exeContext,
        rootType,
        rootValue,
        path,
        rootFields
      );
    case OperationTypeNode.SUBSCRIPTION:
      return executeFields(exeContext, rootType, rootValue, path, rootFields);
  }
}
function executeFieldsSerially(exeContext, parentType, sourceValue, path, fields) {
  return promiseReduce(
    fields.entries(),
    (results, [responseName, fieldNodes]) => {
      const fieldPath = addPath(path, responseName, parentType.name);
      const result2 = executeField(
        exeContext,
        parentType,
        sourceValue,
        fieldNodes,
        fieldPath
      );
      if (result2 === void 0) {
        return results;
      }
      if (isPromise(result2)) {
        return result2.then((resolvedResult) => {
          results[responseName] = resolvedResult;
          return results;
        });
      }
      results[responseName] = result2;
      return results;
    },
    /* @__PURE__ */ Object.create(null)
  );
}
function executeFields(exeContext, parentType, sourceValue, path, fields) {
  const results = /* @__PURE__ */ Object.create(null);
  let containsPromise = false;
  try {
    for (const [responseName, fieldNodes] of fields.entries()) {
      const fieldPath = addPath(path, responseName, parentType.name);
      const result2 = executeField(
        exeContext,
        parentType,
        sourceValue,
        fieldNodes,
        fieldPath
      );
      if (result2 !== void 0) {
        results[responseName] = result2;
        if (isPromise(result2)) {
          containsPromise = true;
        }
      }
    }
  } catch (error) {
    if (containsPromise) {
      return promiseForObject(results).finally(() => {
        throw error;
      });
    }
    throw error;
  }
  if (!containsPromise) {
    return results;
  }
  return promiseForObject(results);
}
function executeField(exeContext, parentType, source, fieldNodes, path) {
  var _fieldDef$resolve;
  const fieldDef = getFieldDef2(exeContext.schema, parentType, fieldNodes[0]);
  if (!fieldDef) {
    return;
  }
  const returnType = fieldDef.type;
  const resolveFn = (_fieldDef$resolve = fieldDef.resolve) !== null && _fieldDef$resolve !== void 0 ? _fieldDef$resolve : exeContext.fieldResolver;
  const info = buildResolveInfo(
    exeContext,
    fieldDef,
    fieldNodes,
    parentType,
    path
  );
  try {
    const args = getArgumentValues(
      fieldDef,
      fieldNodes[0],
      exeContext.variableValues
    );
    const contextValue = exeContext.contextValue;
    const result2 = resolveFn(source, args, contextValue, info);
    let completed;
    if (isPromise(result2)) {
      completed = result2.then(
        (resolved) => completeValue(exeContext, returnType, fieldNodes, info, path, resolved)
      );
    } else {
      completed = completeValue(
        exeContext,
        returnType,
        fieldNodes,
        info,
        path,
        result2
      );
    }
    if (isPromise(completed)) {
      return completed.then(void 0, (rawError) => {
        const error = locatedError(rawError, fieldNodes, pathToArray(path));
        return handleFieldError(error, returnType, exeContext);
      });
    }
    return completed;
  } catch (rawError) {
    const error = locatedError(rawError, fieldNodes, pathToArray(path));
    return handleFieldError(error, returnType, exeContext);
  }
}
function buildResolveInfo(exeContext, fieldDef, fieldNodes, parentType, path) {
  return {
    fieldName: fieldDef.name,
    fieldNodes,
    returnType: fieldDef.type,
    parentType,
    path,
    schema: exeContext.schema,
    fragments: exeContext.fragments,
    rootValue: exeContext.rootValue,
    operation: exeContext.operation,
    variableValues: exeContext.variableValues
  };
}
function handleFieldError(error, returnType, exeContext) {
  if (isNonNullType(returnType)) {
    throw error;
  }
  exeContext.errors.push(error);
  return null;
}
function completeValue(exeContext, returnType, fieldNodes, info, path, result2) {
  if (result2 instanceof Error) {
    throw result2;
  }
  if (isNonNullType(returnType)) {
    const completed = completeValue(
      exeContext,
      returnType.ofType,
      fieldNodes,
      info,
      path,
      result2
    );
    if (completed === null) {
      throw new Error(
        `Cannot return null for non-nullable field ${info.parentType.name}.${info.fieldName}.`
      );
    }
    return completed;
  }
  if (result2 == null) {
    return null;
  }
  if (isListType(returnType)) {
    return completeListValue(
      exeContext,
      returnType,
      fieldNodes,
      info,
      path,
      result2
    );
  }
  if (isLeafType(returnType)) {
    return completeLeafValue(returnType, result2);
  }
  if (isAbstractType(returnType)) {
    return completeAbstractValue(
      exeContext,
      returnType,
      fieldNodes,
      info,
      path,
      result2
    );
  }
  if (isObjectType(returnType)) {
    return completeObjectValue(
      exeContext,
      returnType,
      fieldNodes,
      info,
      path,
      result2
    );
  }
  invariant2(
    false,
    "Cannot complete value of unexpected output type: " + inspect(returnType)
  );
}
function completeListValue(exeContext, returnType, fieldNodes, info, path, result2) {
  if (!isIterableObject(result2)) {
    throw new GraphQLError(
      `Expected Iterable, but did not find one for field "${info.parentType.name}.${info.fieldName}".`
    );
  }
  const itemType = returnType.ofType;
  let containsPromise = false;
  const completedResults = Array.from(result2, (item, index) => {
    const itemPath = addPath(path, index, void 0);
    try {
      let completedItem;
      if (isPromise(item)) {
        completedItem = item.then(
          (resolved) => completeValue(
            exeContext,
            itemType,
            fieldNodes,
            info,
            itemPath,
            resolved
          )
        );
      } else {
        completedItem = completeValue(
          exeContext,
          itemType,
          fieldNodes,
          info,
          itemPath,
          item
        );
      }
      if (isPromise(completedItem)) {
        containsPromise = true;
        return completedItem.then(void 0, (rawError) => {
          const error = locatedError(
            rawError,
            fieldNodes,
            pathToArray(itemPath)
          );
          return handleFieldError(error, itemType, exeContext);
        });
      }
      return completedItem;
    } catch (rawError) {
      const error = locatedError(rawError, fieldNodes, pathToArray(itemPath));
      return handleFieldError(error, itemType, exeContext);
    }
  });
  return containsPromise ? Promise.all(completedResults) : completedResults;
}
function completeLeafValue(returnType, result2) {
  const serializedResult = returnType.serialize(result2);
  if (serializedResult == null) {
    throw new Error(
      `Expected \`${inspect(returnType)}.serialize(${inspect(result2)})\` to return non-nullable value, returned: ${inspect(serializedResult)}`
    );
  }
  return serializedResult;
}
function completeAbstractValue(exeContext, returnType, fieldNodes, info, path, result2) {
  var _returnType$resolveTy;
  const resolveTypeFn = (_returnType$resolveTy = returnType.resolveType) !== null && _returnType$resolveTy !== void 0 ? _returnType$resolveTy : exeContext.typeResolver;
  const contextValue = exeContext.contextValue;
  const runtimeType = resolveTypeFn(result2, contextValue, info, returnType);
  if (isPromise(runtimeType)) {
    return runtimeType.then(
      (resolvedRuntimeType) => completeObjectValue(
        exeContext,
        ensureValidRuntimeType(
          resolvedRuntimeType,
          exeContext,
          returnType,
          fieldNodes,
          info,
          result2
        ),
        fieldNodes,
        info,
        path,
        result2
      )
    );
  }
  return completeObjectValue(
    exeContext,
    ensureValidRuntimeType(
      runtimeType,
      exeContext,
      returnType,
      fieldNodes,
      info,
      result2
    ),
    fieldNodes,
    info,
    path,
    result2
  );
}
function ensureValidRuntimeType(runtimeTypeName, exeContext, returnType, fieldNodes, info, result2) {
  if (runtimeTypeName == null) {
    throw new GraphQLError(
      `Abstract type "${returnType.name}" must resolve to an Object type at runtime for field "${info.parentType.name}.${info.fieldName}". Either the "${returnType.name}" type should provide a "resolveType" function or each possible type should provide an "isTypeOf" function.`,
      fieldNodes
    );
  }
  if (isObjectType(runtimeTypeName)) {
    throw new GraphQLError(
      "Support for returning GraphQLObjectType from resolveType was removed in graphql-js@16.0.0 please return type name instead."
    );
  }
  if (typeof runtimeTypeName !== "string") {
    throw new GraphQLError(
      `Abstract type "${returnType.name}" must resolve to an Object type at runtime for field "${info.parentType.name}.${info.fieldName}" with value ${inspect(result2)}, received "${inspect(runtimeTypeName)}".`
    );
  }
  const runtimeType = exeContext.schema.getType(runtimeTypeName);
  if (runtimeType == null) {
    throw new GraphQLError(
      `Abstract type "${returnType.name}" was resolved to a type "${runtimeTypeName}" that does not exist inside the schema.`,
      {
        nodes: fieldNodes
      }
    );
  }
  if (!isObjectType(runtimeType)) {
    throw new GraphQLError(
      `Abstract type "${returnType.name}" was resolved to a non-object type "${runtimeTypeName}".`,
      {
        nodes: fieldNodes
      }
    );
  }
  if (!exeContext.schema.isSubType(returnType, runtimeType)) {
    throw new GraphQLError(
      `Runtime Object type "${runtimeType.name}" is not a possible type for "${returnType.name}".`,
      {
        nodes: fieldNodes
      }
    );
  }
  return runtimeType;
}
function completeObjectValue(exeContext, returnType, fieldNodes, info, path, result2) {
  const subFieldNodes = collectSubfields2(exeContext, returnType, fieldNodes);
  if (returnType.isTypeOf) {
    const isTypeOf = returnType.isTypeOf(result2, exeContext.contextValue, info);
    if (isPromise(isTypeOf)) {
      return isTypeOf.then((resolvedIsTypeOf) => {
        if (!resolvedIsTypeOf) {
          throw invalidReturnTypeError(returnType, result2, fieldNodes);
        }
        return executeFields(
          exeContext,
          returnType,
          result2,
          path,
          subFieldNodes
        );
      });
    }
    if (!isTypeOf) {
      throw invalidReturnTypeError(returnType, result2, fieldNodes);
    }
  }
  return executeFields(exeContext, returnType, result2, path, subFieldNodes);
}
function invalidReturnTypeError(returnType, result2, fieldNodes) {
  return new GraphQLError(
    `Expected value of type "${returnType.name}" but got: ${inspect(result2)}.`,
    {
      nodes: fieldNodes
    }
  );
}
function getFieldDef2(schema, parentType, fieldNode) {
  const fieldName = fieldNode.name.value;
  if (fieldName === SchemaMetaFieldDef.name && schema.getQueryType() === parentType) {
    return SchemaMetaFieldDef;
  } else if (fieldName === TypeMetaFieldDef.name && schema.getQueryType() === parentType) {
    return TypeMetaFieldDef;
  } else if (fieldName === TypeNameMetaFieldDef.name) {
    return TypeNameMetaFieldDef;
  }
  return parentType.getFields()[fieldName];
}
var collectSubfields2, defaultTypeResolver, defaultFieldResolver;
var init_execute = __esm({
  "../node_modules/graphql/execution/execute.mjs"() {
    init_devAssert();
    init_inspect();
    init_invariant2();
    init_isIterableObject();
    init_isObjectLike();
    init_isPromise();
    init_memoize3();
    init_Path();
    init_promiseForObject();
    init_promiseReduce();
    init_GraphQLError();
    init_locatedError();
    init_ast();
    init_kinds();
    init_definition();
    init_introspection();
    init_validate();
    init_collectFields();
    init_values();
    collectSubfields2 = memoize3(
      (exeContext, returnType, fieldNodes) => collectSubfields(
        exeContext.schema,
        exeContext.fragments,
        exeContext.variableValues,
        returnType,
        fieldNodes
      )
    );
    defaultTypeResolver = function(value, contextValue, info, abstractType) {
      if (isObjectLike(value) && typeof value.__typename === "string") {
        return value.__typename;
      }
      const possibleTypes = info.schema.getPossibleTypes(abstractType);
      const promisedIsTypeOfResults = [];
      for (let i = 0; i < possibleTypes.length; i++) {
        const type = possibleTypes[i];
        if (type.isTypeOf) {
          const isTypeOfResult = type.isTypeOf(value, contextValue, info);
          if (isPromise(isTypeOfResult)) {
            promisedIsTypeOfResults[i] = isTypeOfResult;
          } else if (isTypeOfResult) {
            return type.name;
          }
        }
      }
      if (promisedIsTypeOfResults.length) {
        return Promise.all(promisedIsTypeOfResults).then((isTypeOfResults) => {
          for (let i = 0; i < isTypeOfResults.length; i++) {
            if (isTypeOfResults[i]) {
              return possibleTypes[i].name;
            }
          }
        });
      }
    };
    defaultFieldResolver = function(source, args, contextValue, info) {
      if (isObjectLike(source) || typeof source === "function") {
        const property = source[info.fieldName];
        if (typeof property === "function") {
          return source[info.fieldName](args, contextValue, info);
        }
        return property;
      }
    };
  }
});

// ../node_modules/graphql/graphql.mjs
function graphql(args) {
  return new Promise((resolve) => resolve(graphqlImpl(args)));
}
function graphqlSync(args) {
  const result2 = graphqlImpl(args);
  if (isPromise(result2)) {
    throw new Error("GraphQL execution failed to complete synchronously.");
  }
  return result2;
}
function graphqlImpl(args) {
  arguments.length < 2 || devAssert(
    false,
    "graphql@16 dropped long-deprecated support for positional arguments, please pass an object instead."
  );
  const {
    schema,
    source,
    rootValue,
    contextValue,
    variableValues,
    operationName,
    fieldResolver,
    typeResolver
  } = args;
  const schemaValidationErrors = validateSchema(schema);
  if (schemaValidationErrors.length > 0) {
    return {
      errors: schemaValidationErrors
    };
  }
  let document;
  try {
    document = parse(source);
  } catch (syntaxError2) {
    return {
      errors: [syntaxError2]
    };
  }
  const validationErrors = validate(schema, document);
  if (validationErrors.length > 0) {
    return {
      errors: validationErrors
    };
  }
  return execute({
    schema,
    document,
    rootValue,
    contextValue,
    variableValues,
    operationName,
    fieldResolver,
    typeResolver
  });
}
var init_graphql = __esm({
  "../node_modules/graphql/graphql.mjs"() {
    init_devAssert();
    init_isPromise();
    init_parser();
    init_validate();
    init_validate2();
    init_execute();
  }
});

// ../node_modules/graphql/type/index.mjs
var init_type = __esm({
  "../node_modules/graphql/type/index.mjs"() {
    init_schema();
    init_definition();
    init_directives();
    init_scalars();
    init_introspection();
    init_validate();
    init_assertName();
  }
});

// ../node_modules/graphql/language/index.mjs
var init_language = __esm({
  "../node_modules/graphql/language/index.mjs"() {
    init_source();
    init_location();
    init_printLocation();
    init_kinds();
    init_tokenKind();
    init_lexer();
    init_parser();
    init_printer();
    init_visitor();
    init_ast();
    init_predicates();
    init_directiveLocation();
  }
});

// ../node_modules/graphql/jsutils/isAsyncIterable.mjs
function isAsyncIterable(maybeAsyncIterable) {
  return typeof (maybeAsyncIterable === null || maybeAsyncIterable === void 0 ? void 0 : maybeAsyncIterable[Symbol.asyncIterator]) === "function";
}
var init_isAsyncIterable = __esm({
  "../node_modules/graphql/jsutils/isAsyncIterable.mjs"() {
  }
});

// ../node_modules/graphql/execution/mapAsyncIterator.mjs
function mapAsyncIterator(iterable, callback) {
  const iterator = iterable[Symbol.asyncIterator]();
  async function mapResult(result2) {
    if (result2.done) {
      return result2;
    }
    try {
      return {
        value: await callback(result2.value),
        done: false
      };
    } catch (error) {
      if (typeof iterator.return === "function") {
        try {
          await iterator.return();
        } catch (_e) {
        }
      }
      throw error;
    }
  }
  return {
    async next() {
      return mapResult(await iterator.next());
    },
    async return() {
      return typeof iterator.return === "function" ? mapResult(await iterator.return()) : {
        value: void 0,
        done: true
      };
    },
    async throw(error) {
      if (typeof iterator.throw === "function") {
        return mapResult(await iterator.throw(error));
      }
      throw error;
    },
    [Symbol.asyncIterator]() {
      return this;
    }
  };
}
var init_mapAsyncIterator = __esm({
  "../node_modules/graphql/execution/mapAsyncIterator.mjs"() {
  }
});

// ../node_modules/graphql/execution/subscribe.mjs
async function subscribe(args) {
  arguments.length < 2 || devAssert(
    false,
    "graphql@16 dropped long-deprecated support for positional arguments, please pass an object instead."
  );
  const resultOrStream = await createSourceEventStream(args);
  if (!isAsyncIterable(resultOrStream)) {
    return resultOrStream;
  }
  const mapSourceToResponse = (payload) => execute({ ...args, rootValue: payload });
  return mapAsyncIterator(resultOrStream, mapSourceToResponse);
}
function toNormalizedArgs(args) {
  const firstArg = args[0];
  if (firstArg && "document" in firstArg) {
    return firstArg;
  }
  return {
    schema: firstArg,
    // FIXME: when underlying TS bug fixed, see https://github.com/microsoft/TypeScript/issues/31613
    document: args[1],
    rootValue: args[2],
    contextValue: args[3],
    variableValues: args[4],
    operationName: args[5],
    subscribeFieldResolver: args[6]
  };
}
async function createSourceEventStream(...rawArgs) {
  const args = toNormalizedArgs(rawArgs);
  const { schema, document, variableValues } = args;
  assertValidExecutionArguments(schema, document, variableValues);
  const exeContext = buildExecutionContext(args);
  if (!("schema" in exeContext)) {
    return {
      errors: exeContext
    };
  }
  try {
    const eventStream = await executeSubscription(exeContext);
    if (!isAsyncIterable(eventStream)) {
      throw new Error(
        `Subscription field must return Async Iterable. Received: ${inspect(eventStream)}.`
      );
    }
    return eventStream;
  } catch (error) {
    if (error instanceof GraphQLError) {
      return {
        errors: [error]
      };
    }
    throw error;
  }
}
async function executeSubscription(exeContext) {
  const { schema, fragments, operation, variableValues, rootValue } = exeContext;
  const rootType = schema.getSubscriptionType();
  if (rootType == null) {
    throw new GraphQLError(
      "Schema is not configured to execute subscription operation.",
      {
        nodes: operation
      }
    );
  }
  const rootFields = collectFields(
    schema,
    fragments,
    variableValues,
    rootType,
    operation.selectionSet
  );
  const [responseName, fieldNodes] = [...rootFields.entries()][0];
  const fieldDef = getFieldDef2(schema, rootType, fieldNodes[0]);
  if (!fieldDef) {
    const fieldName = fieldNodes[0].name.value;
    throw new GraphQLError(
      `The subscription field "${fieldName}" is not defined.`,
      {
        nodes: fieldNodes
      }
    );
  }
  const path = addPath(void 0, responseName, rootType.name);
  const info = buildResolveInfo(
    exeContext,
    fieldDef,
    fieldNodes,
    rootType,
    path
  );
  try {
    var _fieldDef$subscribe;
    const args = getArgumentValues(fieldDef, fieldNodes[0], variableValues);
    const contextValue = exeContext.contextValue;
    const resolveFn = (_fieldDef$subscribe = fieldDef.subscribe) !== null && _fieldDef$subscribe !== void 0 ? _fieldDef$subscribe : exeContext.subscribeFieldResolver;
    const eventStream = await resolveFn(rootValue, args, contextValue, info);
    if (eventStream instanceof Error) {
      throw eventStream;
    }
    return eventStream;
  } catch (error) {
    throw locatedError(error, fieldNodes, pathToArray(path));
  }
}
var init_subscribe = __esm({
  "../node_modules/graphql/execution/subscribe.mjs"() {
    init_devAssert();
    init_inspect();
    init_isAsyncIterable();
    init_Path();
    init_GraphQLError();
    init_locatedError();
    init_collectFields();
    init_execute();
    init_mapAsyncIterator();
    init_values();
  }
});

// ../node_modules/graphql/execution/index.mjs
var init_execution = __esm({
  "../node_modules/graphql/execution/index.mjs"() {
    init_Path();
    init_execute();
    init_subscribe();
    init_values();
  }
});

// ../node_modules/graphql/validation/rules/custom/NoDeprecatedCustomRule.mjs
function NoDeprecatedCustomRule(context) {
  return {
    Field(node) {
      const fieldDef = context.getFieldDef();
      const deprecationReason = fieldDef === null || fieldDef === void 0 ? void 0 : fieldDef.deprecationReason;
      if (fieldDef && deprecationReason != null) {
        const parentType = context.getParentType();
        parentType != null || invariant2(false);
        context.reportError(
          new GraphQLError(
            `The field ${parentType.name}.${fieldDef.name} is deprecated. ${deprecationReason}`,
            {
              nodes: node
            }
          )
        );
      }
    },
    Argument(node) {
      const argDef = context.getArgument();
      const deprecationReason = argDef === null || argDef === void 0 ? void 0 : argDef.deprecationReason;
      if (argDef && deprecationReason != null) {
        const directiveDef = context.getDirective();
        if (directiveDef != null) {
          context.reportError(
            new GraphQLError(
              `Directive "@${directiveDef.name}" argument "${argDef.name}" is deprecated. ${deprecationReason}`,
              {
                nodes: node
              }
            )
          );
        } else {
          const parentType = context.getParentType();
          const fieldDef = context.getFieldDef();
          parentType != null && fieldDef != null || invariant2(false);
          context.reportError(
            new GraphQLError(
              `Field "${parentType.name}.${fieldDef.name}" argument "${argDef.name}" is deprecated. ${deprecationReason}`,
              {
                nodes: node
              }
            )
          );
        }
      }
    },
    ObjectField(node) {
      const inputObjectDef = getNamedType(context.getParentInputType());
      if (isInputObjectType(inputObjectDef)) {
        const inputFieldDef = inputObjectDef.getFields()[node.name.value];
        const deprecationReason = inputFieldDef === null || inputFieldDef === void 0 ? void 0 : inputFieldDef.deprecationReason;
        if (deprecationReason != null) {
          context.reportError(
            new GraphQLError(
              `The input field ${inputObjectDef.name}.${inputFieldDef.name} is deprecated. ${deprecationReason}`,
              {
                nodes: node
              }
            )
          );
        }
      }
    },
    EnumValue(node) {
      const enumValueDef = context.getEnumValue();
      const deprecationReason = enumValueDef === null || enumValueDef === void 0 ? void 0 : enumValueDef.deprecationReason;
      if (enumValueDef && deprecationReason != null) {
        const enumTypeDef = getNamedType(context.getInputType());
        enumTypeDef != null || invariant2(false);
        context.reportError(
          new GraphQLError(
            `The enum value "${enumTypeDef.name}.${enumValueDef.name}" is deprecated. ${deprecationReason}`,
            {
              nodes: node
            }
          )
        );
      }
    }
  };
}
var init_NoDeprecatedCustomRule = __esm({
  "../node_modules/graphql/validation/rules/custom/NoDeprecatedCustomRule.mjs"() {
    init_invariant2();
    init_GraphQLError();
    init_definition();
  }
});

// ../node_modules/graphql/validation/rules/custom/NoSchemaIntrospectionCustomRule.mjs
function NoSchemaIntrospectionCustomRule(context) {
  return {
    Field(node) {
      const type = getNamedType(context.getType());
      if (type && isIntrospectionType(type)) {
        context.reportError(
          new GraphQLError(
            `GraphQL introspection has been disabled, but the requested query contained the field "${node.name.value}".`,
            {
              nodes: node
            }
          )
        );
      }
    }
  };
}
var init_NoSchemaIntrospectionCustomRule = __esm({
  "../node_modules/graphql/validation/rules/custom/NoSchemaIntrospectionCustomRule.mjs"() {
    init_GraphQLError();
    init_definition();
    init_introspection();
  }
});

// ../node_modules/graphql/validation/index.mjs
var init_validation = __esm({
  "../node_modules/graphql/validation/index.mjs"() {
    init_validate2();
    init_ValidationContext();
    init_specifiedRules();
    init_ExecutableDefinitionsRule();
    init_FieldsOnCorrectTypeRule();
    init_FragmentsOnCompositeTypesRule();
    init_KnownArgumentNamesRule();
    init_KnownDirectivesRule();
    init_KnownFragmentNamesRule();
    init_KnownTypeNamesRule();
    init_LoneAnonymousOperationRule();
    init_NoFragmentCyclesRule();
    init_NoUndefinedVariablesRule();
    init_NoUnusedFragmentsRule();
    init_NoUnusedVariablesRule();
    init_OverlappingFieldsCanBeMergedRule();
    init_PossibleFragmentSpreadsRule();
    init_ProvidedRequiredArgumentsRule();
    init_ScalarLeafsRule();
    init_SingleFieldSubscriptionsRule();
    init_UniqueArgumentNamesRule();
    init_UniqueDirectivesPerLocationRule();
    init_UniqueFragmentNamesRule();
    init_UniqueInputFieldNamesRule();
    init_UniqueOperationNamesRule();
    init_UniqueVariableNamesRule();
    init_ValuesOfCorrectTypeRule();
    init_VariablesAreInputTypesRule();
    init_VariablesInAllowedPositionRule();
    init_MaxIntrospectionDepthRule();
    init_LoneSchemaDefinitionRule();
    init_UniqueOperationTypesRule();
    init_UniqueTypeNamesRule();
    init_UniqueEnumValueNamesRule();
    init_UniqueFieldDefinitionNamesRule();
    init_UniqueArgumentDefinitionNamesRule();
    init_UniqueDirectiveNamesRule();
    init_PossibleTypeExtensionsRule();
    init_NoDeprecatedCustomRule();
    init_NoSchemaIntrospectionCustomRule();
  }
});

// ../node_modules/graphql/error/index.mjs
var init_error = __esm({
  "../node_modules/graphql/error/index.mjs"() {
    init_GraphQLError();
    init_syntaxError();
    init_locatedError();
  }
});

// ../node_modules/graphql/utilities/getIntrospectionQuery.mjs
function getIntrospectionQuery(options) {
  const optionsWithDefault = {
    descriptions: true,
    specifiedByUrl: false,
    directiveIsRepeatable: false,
    schemaDescription: false,
    inputValueDeprecation: false,
    oneOf: false,
    ...options
  };
  const descriptions = optionsWithDefault.descriptions ? "description" : "";
  const specifiedByUrl = optionsWithDefault.specifiedByUrl ? "specifiedByURL" : "";
  const directiveIsRepeatable = optionsWithDefault.directiveIsRepeatable ? "isRepeatable" : "";
  const schemaDescription = optionsWithDefault.schemaDescription ? descriptions : "";
  function inputDeprecation(str) {
    return optionsWithDefault.inputValueDeprecation ? str : "";
  }
  const oneOf = optionsWithDefault.oneOf ? "isOneOf" : "";
  return `
    query IntrospectionQuery {
      __schema {
        ${schemaDescription}
        queryType { name kind }
        mutationType { name kind }
        subscriptionType { name kind }
        types {
          ...FullType
        }
        directives {
          name
          ${descriptions}
          ${directiveIsRepeatable}
          locations
          args${inputDeprecation("(includeDeprecated: true)")} {
            ...InputValue
          }
        }
      }
    }

    fragment FullType on __Type {
      kind
      name
      ${descriptions}
      ${specifiedByUrl}
      ${oneOf}
      fields(includeDeprecated: true) {
        name
        ${descriptions}
        args${inputDeprecation("(includeDeprecated: true)")} {
          ...InputValue
        }
        type {
          ...TypeRef
        }
        isDeprecated
        deprecationReason
      }
      inputFields${inputDeprecation("(includeDeprecated: true)")} {
        ...InputValue
      }
      interfaces {
        ...TypeRef
      }
      enumValues(includeDeprecated: true) {
        name
        ${descriptions}
        isDeprecated
        deprecationReason
      }
      possibleTypes {
        ...TypeRef
      }
    }

    fragment InputValue on __InputValue {
      name
      ${descriptions}
      type { ...TypeRef }
      defaultValue
      ${inputDeprecation("isDeprecated")}
      ${inputDeprecation("deprecationReason")}
    }

    fragment TypeRef on __Type {
      kind
      name
      ofType {
        kind
        name
        ofType {
          kind
          name
          ofType {
            kind
            name
            ofType {
              kind
              name
              ofType {
                kind
                name
                ofType {
                  kind
                  name
                  ofType {
                    kind
                    name
                    ofType {
                      kind
                      name
                      ofType {
                        kind
                        name
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  `;
}
var init_getIntrospectionQuery = __esm({
  "../node_modules/graphql/utilities/getIntrospectionQuery.mjs"() {
  }
});

// ../node_modules/graphql/utilities/getOperationAST.mjs
function getOperationAST(documentAST, operationName) {
  let operation = null;
  for (const definition of documentAST.definitions) {
    if (definition.kind === Kind.OPERATION_DEFINITION) {
      var _definition$name;
      if (operationName == null) {
        if (operation) {
          return null;
        }
        operation = definition;
      } else if (((_definition$name = definition.name) === null || _definition$name === void 0 ? void 0 : _definition$name.value) === operationName) {
        return definition;
      }
    }
  }
  return operation;
}
var init_getOperationAST = __esm({
  "../node_modules/graphql/utilities/getOperationAST.mjs"() {
    init_kinds();
  }
});

// ../node_modules/graphql/utilities/getOperationRootType.mjs
function getOperationRootType(schema, operation) {
  if (operation.operation === "query") {
    const queryType = schema.getQueryType();
    if (!queryType) {
      throw new GraphQLError(
        "Schema does not define the required query root type.",
        {
          nodes: operation
        }
      );
    }
    return queryType;
  }
  if (operation.operation === "mutation") {
    const mutationType = schema.getMutationType();
    if (!mutationType) {
      throw new GraphQLError("Schema is not configured for mutations.", {
        nodes: operation
      });
    }
    return mutationType;
  }
  if (operation.operation === "subscription") {
    const subscriptionType = schema.getSubscriptionType();
    if (!subscriptionType) {
      throw new GraphQLError("Schema is not configured for subscriptions.", {
        nodes: operation
      });
    }
    return subscriptionType;
  }
  throw new GraphQLError(
    "Can only have query, mutation and subscription operations.",
    {
      nodes: operation
    }
  );
}
var init_getOperationRootType = __esm({
  "../node_modules/graphql/utilities/getOperationRootType.mjs"() {
    init_GraphQLError();
  }
});

// ../node_modules/graphql/utilities/introspectionFromSchema.mjs
function introspectionFromSchema(schema, options) {
  const optionsWithDefaults = {
    specifiedByUrl: true,
    directiveIsRepeatable: true,
    schemaDescription: true,
    inputValueDeprecation: true,
    oneOf: true,
    ...options
  };
  const document = parse(getIntrospectionQuery(optionsWithDefaults));
  const result2 = executeSync({
    schema,
    document
  });
  !result2.errors && result2.data || invariant2(false);
  return result2.data;
}
var init_introspectionFromSchema = __esm({
  "../node_modules/graphql/utilities/introspectionFromSchema.mjs"() {
    init_invariant2();
    init_parser();
    init_execute();
    init_getIntrospectionQuery();
  }
});

// ../node_modules/graphql/utilities/buildClientSchema.mjs
function buildClientSchema(introspection, options) {
  isObjectLike(introspection) && isObjectLike(introspection.__schema) || devAssert(
    false,
    `Invalid or incomplete introspection result. Ensure that you are passing "data" property of introspection response and no "errors" was returned alongside: ${inspect(
      introspection
    )}.`
  );
  const schemaIntrospection = introspection.__schema;
  const typeMap = keyValMap(
    schemaIntrospection.types,
    (typeIntrospection) => typeIntrospection.name,
    (typeIntrospection) => buildType(typeIntrospection)
  );
  for (const stdType of [...specifiedScalarTypes, ...introspectionTypes]) {
    if (typeMap[stdType.name]) {
      typeMap[stdType.name] = stdType;
    }
  }
  const queryType = schemaIntrospection.queryType ? getObjectType(schemaIntrospection.queryType) : null;
  const mutationType = schemaIntrospection.mutationType ? getObjectType(schemaIntrospection.mutationType) : null;
  const subscriptionType = schemaIntrospection.subscriptionType ? getObjectType(schemaIntrospection.subscriptionType) : null;
  const directives = schemaIntrospection.directives ? schemaIntrospection.directives.map(buildDirective) : [];
  return new GraphQLSchema({
    description: schemaIntrospection.description,
    query: queryType,
    mutation: mutationType,
    subscription: subscriptionType,
    types: Object.values(typeMap),
    directives,
    assumeValid: options === null || options === void 0 ? void 0 : options.assumeValid
  });
  function getType(typeRef) {
    if (typeRef.kind === TypeKind.LIST) {
      const itemRef = typeRef.ofType;
      if (!itemRef) {
        throw new Error("Decorated type deeper than introspection query.");
      }
      return new GraphQLList(getType(itemRef));
    }
    if (typeRef.kind === TypeKind.NON_NULL) {
      const nullableRef = typeRef.ofType;
      if (!nullableRef) {
        throw new Error("Decorated type deeper than introspection query.");
      }
      const nullableType = getType(nullableRef);
      return new GraphQLNonNull(assertNullableType(nullableType));
    }
    return getNamedType2(typeRef);
  }
  function getNamedType2(typeRef) {
    const typeName = typeRef.name;
    if (!typeName) {
      throw new Error(`Unknown type reference: ${inspect(typeRef)}.`);
    }
    const type = typeMap[typeName];
    if (!type) {
      throw new Error(
        `Invalid or incomplete schema, unknown type: ${typeName}. Ensure that a full introspection query is used in order to build a client schema.`
      );
    }
    return type;
  }
  function getObjectType(typeRef) {
    return assertObjectType(getNamedType2(typeRef));
  }
  function getInterfaceType(typeRef) {
    return assertInterfaceType(getNamedType2(typeRef));
  }
  function buildType(type) {
    if (type != null && type.name != null && type.kind != null) {
      switch (type.kind) {
        case TypeKind.SCALAR:
          return buildScalarDef(type);
        case TypeKind.OBJECT:
          return buildObjectDef(type);
        case TypeKind.INTERFACE:
          return buildInterfaceDef(type);
        case TypeKind.UNION:
          return buildUnionDef(type);
        case TypeKind.ENUM:
          return buildEnumDef(type);
        case TypeKind.INPUT_OBJECT:
          return buildInputObjectDef(type);
      }
    }
    const typeStr = inspect(type);
    throw new Error(
      `Invalid or incomplete introspection result. Ensure that a full introspection query is used in order to build a client schema: ${typeStr}.`
    );
  }
  function buildScalarDef(scalarIntrospection) {
    return new GraphQLScalarType({
      name: scalarIntrospection.name,
      description: scalarIntrospection.description,
      specifiedByURL: scalarIntrospection.specifiedByURL
    });
  }
  function buildImplementationsList(implementingIntrospection) {
    if (implementingIntrospection.interfaces === null && implementingIntrospection.kind === TypeKind.INTERFACE) {
      return [];
    }
    if (!implementingIntrospection.interfaces) {
      const implementingIntrospectionStr = inspect(implementingIntrospection);
      throw new Error(
        `Introspection result missing interfaces: ${implementingIntrospectionStr}.`
      );
    }
    return implementingIntrospection.interfaces.map(getInterfaceType);
  }
  function buildObjectDef(objectIntrospection) {
    return new GraphQLObjectType({
      name: objectIntrospection.name,
      description: objectIntrospection.description,
      interfaces: () => buildImplementationsList(objectIntrospection),
      fields: () => buildFieldDefMap(objectIntrospection)
    });
  }
  function buildInterfaceDef(interfaceIntrospection) {
    return new GraphQLInterfaceType({
      name: interfaceIntrospection.name,
      description: interfaceIntrospection.description,
      interfaces: () => buildImplementationsList(interfaceIntrospection),
      fields: () => buildFieldDefMap(interfaceIntrospection)
    });
  }
  function buildUnionDef(unionIntrospection) {
    if (!unionIntrospection.possibleTypes) {
      const unionIntrospectionStr = inspect(unionIntrospection);
      throw new Error(
        `Introspection result missing possibleTypes: ${unionIntrospectionStr}.`
      );
    }
    return new GraphQLUnionType({
      name: unionIntrospection.name,
      description: unionIntrospection.description,
      types: () => unionIntrospection.possibleTypes.map(getObjectType)
    });
  }
  function buildEnumDef(enumIntrospection) {
    if (!enumIntrospection.enumValues) {
      const enumIntrospectionStr = inspect(enumIntrospection);
      throw new Error(
        `Introspection result missing enumValues: ${enumIntrospectionStr}.`
      );
    }
    return new GraphQLEnumType({
      name: enumIntrospection.name,
      description: enumIntrospection.description,
      values: keyValMap(
        enumIntrospection.enumValues,
        (valueIntrospection) => valueIntrospection.name,
        (valueIntrospection) => ({
          description: valueIntrospection.description,
          deprecationReason: valueIntrospection.deprecationReason
        })
      )
    });
  }
  function buildInputObjectDef(inputObjectIntrospection) {
    if (!inputObjectIntrospection.inputFields) {
      const inputObjectIntrospectionStr = inspect(inputObjectIntrospection);
      throw new Error(
        `Introspection result missing inputFields: ${inputObjectIntrospectionStr}.`
      );
    }
    return new GraphQLInputObjectType({
      name: inputObjectIntrospection.name,
      description: inputObjectIntrospection.description,
      fields: () => buildInputValueDefMap(inputObjectIntrospection.inputFields),
      isOneOf: inputObjectIntrospection.isOneOf
    });
  }
  function buildFieldDefMap(typeIntrospection) {
    if (!typeIntrospection.fields) {
      throw new Error(
        `Introspection result missing fields: ${inspect(typeIntrospection)}.`
      );
    }
    return keyValMap(
      typeIntrospection.fields,
      (fieldIntrospection) => fieldIntrospection.name,
      buildField
    );
  }
  function buildField(fieldIntrospection) {
    const type = getType(fieldIntrospection.type);
    if (!isOutputType(type)) {
      const typeStr = inspect(type);
      throw new Error(
        `Introspection must provide output type for fields, but received: ${typeStr}.`
      );
    }
    if (!fieldIntrospection.args) {
      const fieldIntrospectionStr = inspect(fieldIntrospection);
      throw new Error(
        `Introspection result missing field args: ${fieldIntrospectionStr}.`
      );
    }
    return {
      description: fieldIntrospection.description,
      deprecationReason: fieldIntrospection.deprecationReason,
      type,
      args: buildInputValueDefMap(fieldIntrospection.args)
    };
  }
  function buildInputValueDefMap(inputValueIntrospections) {
    return keyValMap(
      inputValueIntrospections,
      (inputValue) => inputValue.name,
      buildInputValue
    );
  }
  function buildInputValue(inputValueIntrospection) {
    const type = getType(inputValueIntrospection.type);
    if (!isInputType(type)) {
      const typeStr = inspect(type);
      throw new Error(
        `Introspection must provide input type for arguments, but received: ${typeStr}.`
      );
    }
    const defaultValue = inputValueIntrospection.defaultValue != null ? valueFromAST(parseValue(inputValueIntrospection.defaultValue), type) : void 0;
    return {
      description: inputValueIntrospection.description,
      type,
      defaultValue,
      deprecationReason: inputValueIntrospection.deprecationReason
    };
  }
  function buildDirective(directiveIntrospection) {
    if (!directiveIntrospection.args) {
      const directiveIntrospectionStr = inspect(directiveIntrospection);
      throw new Error(
        `Introspection result missing directive args: ${directiveIntrospectionStr}.`
      );
    }
    if (!directiveIntrospection.locations) {
      const directiveIntrospectionStr = inspect(directiveIntrospection);
      throw new Error(
        `Introspection result missing directive locations: ${directiveIntrospectionStr}.`
      );
    }
    return new GraphQLDirective({
      name: directiveIntrospection.name,
      description: directiveIntrospection.description,
      isRepeatable: directiveIntrospection.isRepeatable,
      locations: directiveIntrospection.locations.slice(),
      args: buildInputValueDefMap(directiveIntrospection.args)
    });
  }
}
var init_buildClientSchema = __esm({
  "../node_modules/graphql/utilities/buildClientSchema.mjs"() {
    init_devAssert();
    init_inspect();
    init_isObjectLike();
    init_keyValMap();
    init_parser();
    init_definition();
    init_directives();
    init_introspection();
    init_scalars();
    init_schema();
    init_valueFromAST();
  }
});

// ../node_modules/graphql/utilities/extendSchema.mjs
function extendSchema(schema, documentAST, options) {
  assertSchema(schema);
  documentAST != null && documentAST.kind === Kind.DOCUMENT || devAssert(false, "Must provide valid Document AST.");
  if ((options === null || options === void 0 ? void 0 : options.assumeValid) !== true && (options === null || options === void 0 ? void 0 : options.assumeValidSDL) !== true) {
    assertValidSDLExtension(documentAST, schema);
  }
  const schemaConfig = schema.toConfig();
  const extendedConfig = extendSchemaImpl(schemaConfig, documentAST, options);
  return schemaConfig === extendedConfig ? schema : new GraphQLSchema(extendedConfig);
}
function extendSchemaImpl(schemaConfig, documentAST, options) {
  var _schemaDef, _schemaDef$descriptio, _schemaDef2, _options$assumeValid;
  const typeDefs = [];
  const typeExtensionsMap = /* @__PURE__ */ Object.create(null);
  const directiveDefs = [];
  let schemaDef;
  const schemaExtensions = [];
  for (const def of documentAST.definitions) {
    if (def.kind === Kind.SCHEMA_DEFINITION) {
      schemaDef = def;
    } else if (def.kind === Kind.SCHEMA_EXTENSION) {
      schemaExtensions.push(def);
    } else if (isTypeDefinitionNode(def)) {
      typeDefs.push(def);
    } else if (isTypeExtensionNode(def)) {
      const extendedTypeName = def.name.value;
      const existingTypeExtensions = typeExtensionsMap[extendedTypeName];
      typeExtensionsMap[extendedTypeName] = existingTypeExtensions ? existingTypeExtensions.concat([def]) : [def];
    } else if (def.kind === Kind.DIRECTIVE_DEFINITION) {
      directiveDefs.push(def);
    }
  }
  if (Object.keys(typeExtensionsMap).length === 0 && typeDefs.length === 0 && directiveDefs.length === 0 && schemaExtensions.length === 0 && schemaDef == null) {
    return schemaConfig;
  }
  const typeMap = /* @__PURE__ */ Object.create(null);
  for (const existingType of schemaConfig.types) {
    typeMap[existingType.name] = extendNamedType(existingType);
  }
  for (const typeNode of typeDefs) {
    var _stdTypeMap$name;
    const name = typeNode.name.value;
    typeMap[name] = (_stdTypeMap$name = stdTypeMap[name]) !== null && _stdTypeMap$name !== void 0 ? _stdTypeMap$name : buildType(typeNode);
  }
  const operationTypes = {
    // Get the extended root operation types.
    query: schemaConfig.query && replaceNamedType(schemaConfig.query),
    mutation: schemaConfig.mutation && replaceNamedType(schemaConfig.mutation),
    subscription: schemaConfig.subscription && replaceNamedType(schemaConfig.subscription),
    // Then, incorporate schema definition and all schema extensions.
    ...schemaDef && getOperationTypes([schemaDef]),
    ...getOperationTypes(schemaExtensions)
  };
  return {
    description: (_schemaDef = schemaDef) === null || _schemaDef === void 0 ? void 0 : (_schemaDef$descriptio = _schemaDef.description) === null || _schemaDef$descriptio === void 0 ? void 0 : _schemaDef$descriptio.value,
    ...operationTypes,
    types: Object.values(typeMap),
    directives: [
      ...schemaConfig.directives.map(replaceDirective),
      ...directiveDefs.map(buildDirective)
    ],
    extensions: /* @__PURE__ */ Object.create(null),
    astNode: (_schemaDef2 = schemaDef) !== null && _schemaDef2 !== void 0 ? _schemaDef2 : schemaConfig.astNode,
    extensionASTNodes: schemaConfig.extensionASTNodes.concat(schemaExtensions),
    assumeValid: (_options$assumeValid = options === null || options === void 0 ? void 0 : options.assumeValid) !== null && _options$assumeValid !== void 0 ? _options$assumeValid : false
  };
  function replaceType(type) {
    if (isListType(type)) {
      return new GraphQLList(replaceType(type.ofType));
    }
    if (isNonNullType(type)) {
      return new GraphQLNonNull(replaceType(type.ofType));
    }
    return replaceNamedType(type);
  }
  function replaceNamedType(type) {
    return typeMap[type.name];
  }
  function replaceDirective(directive) {
    const config = directive.toConfig();
    return new GraphQLDirective({
      ...config,
      args: mapValue(config.args, extendArg)
    });
  }
  function extendNamedType(type) {
    if (isIntrospectionType(type) || isSpecifiedScalarType(type)) {
      return type;
    }
    if (isScalarType(type)) {
      return extendScalarType(type);
    }
    if (isObjectType(type)) {
      return extendObjectType(type);
    }
    if (isInterfaceType(type)) {
      return extendInterfaceType(type);
    }
    if (isUnionType(type)) {
      return extendUnionType(type);
    }
    if (isEnumType(type)) {
      return extendEnumType(type);
    }
    if (isInputObjectType(type)) {
      return extendInputObjectType(type);
    }
    invariant2(false, "Unexpected type: " + inspect(type));
  }
  function extendInputObjectType(type) {
    var _typeExtensionsMap$co;
    const config = type.toConfig();
    const extensions = (_typeExtensionsMap$co = typeExtensionsMap[config.name]) !== null && _typeExtensionsMap$co !== void 0 ? _typeExtensionsMap$co : [];
    return new GraphQLInputObjectType({
      ...config,
      fields: () => ({
        ...mapValue(config.fields, (field) => ({
          ...field,
          type: replaceType(field.type)
        })),
        ...buildInputFieldMap(extensions)
      }),
      extensionASTNodes: config.extensionASTNodes.concat(extensions)
    });
  }
  function extendEnumType(type) {
    var _typeExtensionsMap$ty;
    const config = type.toConfig();
    const extensions = (_typeExtensionsMap$ty = typeExtensionsMap[type.name]) !== null && _typeExtensionsMap$ty !== void 0 ? _typeExtensionsMap$ty : [];
    return new GraphQLEnumType({
      ...config,
      values: { ...config.values, ...buildEnumValueMap(extensions) },
      extensionASTNodes: config.extensionASTNodes.concat(extensions)
    });
  }
  function extendScalarType(type) {
    var _typeExtensionsMap$co2;
    const config = type.toConfig();
    const extensions = (_typeExtensionsMap$co2 = typeExtensionsMap[config.name]) !== null && _typeExtensionsMap$co2 !== void 0 ? _typeExtensionsMap$co2 : [];
    let specifiedByURL = config.specifiedByURL;
    for (const extensionNode of extensions) {
      var _getSpecifiedByURL;
      specifiedByURL = (_getSpecifiedByURL = getSpecifiedByURL(extensionNode)) !== null && _getSpecifiedByURL !== void 0 ? _getSpecifiedByURL : specifiedByURL;
    }
    return new GraphQLScalarType({
      ...config,
      specifiedByURL,
      extensionASTNodes: config.extensionASTNodes.concat(extensions)
    });
  }
  function extendObjectType(type) {
    var _typeExtensionsMap$co3;
    const config = type.toConfig();
    const extensions = (_typeExtensionsMap$co3 = typeExtensionsMap[config.name]) !== null && _typeExtensionsMap$co3 !== void 0 ? _typeExtensionsMap$co3 : [];
    return new GraphQLObjectType({
      ...config,
      interfaces: () => [
        ...type.getInterfaces().map(replaceNamedType),
        ...buildInterfaces(extensions)
      ],
      fields: () => ({
        ...mapValue(config.fields, extendField),
        ...buildFieldMap(extensions)
      }),
      extensionASTNodes: config.extensionASTNodes.concat(extensions)
    });
  }
  function extendInterfaceType(type) {
    var _typeExtensionsMap$co4;
    const config = type.toConfig();
    const extensions = (_typeExtensionsMap$co4 = typeExtensionsMap[config.name]) !== null && _typeExtensionsMap$co4 !== void 0 ? _typeExtensionsMap$co4 : [];
    return new GraphQLInterfaceType({
      ...config,
      interfaces: () => [
        ...type.getInterfaces().map(replaceNamedType),
        ...buildInterfaces(extensions)
      ],
      fields: () => ({
        ...mapValue(config.fields, extendField),
        ...buildFieldMap(extensions)
      }),
      extensionASTNodes: config.extensionASTNodes.concat(extensions)
    });
  }
  function extendUnionType(type) {
    var _typeExtensionsMap$co5;
    const config = type.toConfig();
    const extensions = (_typeExtensionsMap$co5 = typeExtensionsMap[config.name]) !== null && _typeExtensionsMap$co5 !== void 0 ? _typeExtensionsMap$co5 : [];
    return new GraphQLUnionType({
      ...config,
      types: () => [
        ...type.getTypes().map(replaceNamedType),
        ...buildUnionTypes(extensions)
      ],
      extensionASTNodes: config.extensionASTNodes.concat(extensions)
    });
  }
  function extendField(field) {
    return {
      ...field,
      type: replaceType(field.type),
      args: field.args && mapValue(field.args, extendArg)
    };
  }
  function extendArg(arg) {
    return { ...arg, type: replaceType(arg.type) };
  }
  function getOperationTypes(nodes) {
    const opTypes = {};
    for (const node of nodes) {
      var _node$operationTypes;
      const operationTypesNodes = (
        /* c8 ignore next */
        (_node$operationTypes = node.operationTypes) !== null && _node$operationTypes !== void 0 ? _node$operationTypes : []
      );
      for (const operationType of operationTypesNodes) {
        opTypes[operationType.operation] = getNamedType2(operationType.type);
      }
    }
    return opTypes;
  }
  function getNamedType2(node) {
    var _stdTypeMap$name2;
    const name = node.name.value;
    const type = (_stdTypeMap$name2 = stdTypeMap[name]) !== null && _stdTypeMap$name2 !== void 0 ? _stdTypeMap$name2 : typeMap[name];
    if (type === void 0) {
      throw new Error(`Unknown type: "${name}".`);
    }
    return type;
  }
  function getWrappedType(node) {
    if (node.kind === Kind.LIST_TYPE) {
      return new GraphQLList(getWrappedType(node.type));
    }
    if (node.kind === Kind.NON_NULL_TYPE) {
      return new GraphQLNonNull(getWrappedType(node.type));
    }
    return getNamedType2(node);
  }
  function buildDirective(node) {
    var _node$description;
    return new GraphQLDirective({
      name: node.name.value,
      description: (_node$description = node.description) === null || _node$description === void 0 ? void 0 : _node$description.value,
      // @ts-expect-error
      locations: node.locations.map(({ value }) => value),
      isRepeatable: node.repeatable,
      args: buildArgumentMap(node.arguments),
      astNode: node
    });
  }
  function buildFieldMap(nodes) {
    const fieldConfigMap = /* @__PURE__ */ Object.create(null);
    for (const node of nodes) {
      var _node$fields;
      const nodeFields = (
        /* c8 ignore next */
        (_node$fields = node.fields) !== null && _node$fields !== void 0 ? _node$fields : []
      );
      for (const field of nodeFields) {
        var _field$description;
        fieldConfigMap[field.name.value] = {
          // Note: While this could make assertions to get the correctly typed
          // value, that would throw immediately while type system validation
          // with validateSchema() will produce more actionable results.
          type: getWrappedType(field.type),
          description: (_field$description = field.description) === null || _field$description === void 0 ? void 0 : _field$description.value,
          args: buildArgumentMap(field.arguments),
          deprecationReason: getDeprecationReason(field),
          astNode: field
        };
      }
    }
    return fieldConfigMap;
  }
  function buildArgumentMap(args) {
    const argsNodes = (
      /* c8 ignore next */
      args !== null && args !== void 0 ? args : []
    );
    const argConfigMap = /* @__PURE__ */ Object.create(null);
    for (const arg of argsNodes) {
      var _arg$description;
      const type = getWrappedType(arg.type);
      argConfigMap[arg.name.value] = {
        type,
        description: (_arg$description = arg.description) === null || _arg$description === void 0 ? void 0 : _arg$description.value,
        defaultValue: valueFromAST(arg.defaultValue, type),
        deprecationReason: getDeprecationReason(arg),
        astNode: arg
      };
    }
    return argConfigMap;
  }
  function buildInputFieldMap(nodes) {
    const inputFieldMap = /* @__PURE__ */ Object.create(null);
    for (const node of nodes) {
      var _node$fields2;
      const fieldsNodes = (
        /* c8 ignore next */
        (_node$fields2 = node.fields) !== null && _node$fields2 !== void 0 ? _node$fields2 : []
      );
      for (const field of fieldsNodes) {
        var _field$description2;
        const type = getWrappedType(field.type);
        inputFieldMap[field.name.value] = {
          type,
          description: (_field$description2 = field.description) === null || _field$description2 === void 0 ? void 0 : _field$description2.value,
          defaultValue: valueFromAST(field.defaultValue, type),
          deprecationReason: getDeprecationReason(field),
          astNode: field
        };
      }
    }
    return inputFieldMap;
  }
  function buildEnumValueMap(nodes) {
    const enumValueMap = /* @__PURE__ */ Object.create(null);
    for (const node of nodes) {
      var _node$values;
      const valuesNodes = (
        /* c8 ignore next */
        (_node$values = node.values) !== null && _node$values !== void 0 ? _node$values : []
      );
      for (const value of valuesNodes) {
        var _value$description;
        enumValueMap[value.name.value] = {
          description: (_value$description = value.description) === null || _value$description === void 0 ? void 0 : _value$description.value,
          deprecationReason: getDeprecationReason(value),
          astNode: value
        };
      }
    }
    return enumValueMap;
  }
  function buildInterfaces(nodes) {
    return nodes.flatMap(
      // FIXME: https://github.com/graphql/graphql-js/issues/2203
      (node) => {
        var _node$interfaces$map, _node$interfaces;
        return (
          /* c8 ignore next */
          (_node$interfaces$map = (_node$interfaces = node.interfaces) === null || _node$interfaces === void 0 ? void 0 : _node$interfaces.map(getNamedType2)) !== null && _node$interfaces$map !== void 0 ? _node$interfaces$map : []
        );
      }
    );
  }
  function buildUnionTypes(nodes) {
    return nodes.flatMap(
      // FIXME: https://github.com/graphql/graphql-js/issues/2203
      (node) => {
        var _node$types$map, _node$types;
        return (
          /* c8 ignore next */
          (_node$types$map = (_node$types = node.types) === null || _node$types === void 0 ? void 0 : _node$types.map(getNamedType2)) !== null && _node$types$map !== void 0 ? _node$types$map : []
        );
      }
    );
  }
  function buildType(astNode) {
    var _typeExtensionsMap$na;
    const name = astNode.name.value;
    const extensionASTNodes = (_typeExtensionsMap$na = typeExtensionsMap[name]) !== null && _typeExtensionsMap$na !== void 0 ? _typeExtensionsMap$na : [];
    switch (astNode.kind) {
      case Kind.OBJECT_TYPE_DEFINITION: {
        var _astNode$description;
        const allNodes = [astNode, ...extensionASTNodes];
        return new GraphQLObjectType({
          name,
          description: (_astNode$description = astNode.description) === null || _astNode$description === void 0 ? void 0 : _astNode$description.value,
          interfaces: () => buildInterfaces(allNodes),
          fields: () => buildFieldMap(allNodes),
          astNode,
          extensionASTNodes
        });
      }
      case Kind.INTERFACE_TYPE_DEFINITION: {
        var _astNode$description2;
        const allNodes = [astNode, ...extensionASTNodes];
        return new GraphQLInterfaceType({
          name,
          description: (_astNode$description2 = astNode.description) === null || _astNode$description2 === void 0 ? void 0 : _astNode$description2.value,
          interfaces: () => buildInterfaces(allNodes),
          fields: () => buildFieldMap(allNodes),
          astNode,
          extensionASTNodes
        });
      }
      case Kind.ENUM_TYPE_DEFINITION: {
        var _astNode$description3;
        const allNodes = [astNode, ...extensionASTNodes];
        return new GraphQLEnumType({
          name,
          description: (_astNode$description3 = astNode.description) === null || _astNode$description3 === void 0 ? void 0 : _astNode$description3.value,
          values: buildEnumValueMap(allNodes),
          astNode,
          extensionASTNodes
        });
      }
      case Kind.UNION_TYPE_DEFINITION: {
        var _astNode$description4;
        const allNodes = [astNode, ...extensionASTNodes];
        return new GraphQLUnionType({
          name,
          description: (_astNode$description4 = astNode.description) === null || _astNode$description4 === void 0 ? void 0 : _astNode$description4.value,
          types: () => buildUnionTypes(allNodes),
          astNode,
          extensionASTNodes
        });
      }
      case Kind.SCALAR_TYPE_DEFINITION: {
        var _astNode$description5;
        return new GraphQLScalarType({
          name,
          description: (_astNode$description5 = astNode.description) === null || _astNode$description5 === void 0 ? void 0 : _astNode$description5.value,
          specifiedByURL: getSpecifiedByURL(astNode),
          astNode,
          extensionASTNodes
        });
      }
      case Kind.INPUT_OBJECT_TYPE_DEFINITION: {
        var _astNode$description6;
        const allNodes = [astNode, ...extensionASTNodes];
        return new GraphQLInputObjectType({
          name,
          description: (_astNode$description6 = astNode.description) === null || _astNode$description6 === void 0 ? void 0 : _astNode$description6.value,
          fields: () => buildInputFieldMap(allNodes),
          astNode,
          extensionASTNodes,
          isOneOf: isOneOf(astNode)
        });
      }
    }
  }
}
function getDeprecationReason(node) {
  const deprecated = getDirectiveValues(GraphQLDeprecatedDirective, node);
  return deprecated === null || deprecated === void 0 ? void 0 : deprecated.reason;
}
function getSpecifiedByURL(node) {
  const specifiedBy = getDirectiveValues(GraphQLSpecifiedByDirective, node);
  return specifiedBy === null || specifiedBy === void 0 ? void 0 : specifiedBy.url;
}
function isOneOf(node) {
  return Boolean(getDirectiveValues(GraphQLOneOfDirective, node));
}
var stdTypeMap;
var init_extendSchema = __esm({
  "../node_modules/graphql/utilities/extendSchema.mjs"() {
    init_devAssert();
    init_inspect();
    init_invariant2();
    init_keyMap();
    init_mapValue();
    init_kinds();
    init_predicates();
    init_definition();
    init_directives();
    init_introspection();
    init_scalars();
    init_schema();
    init_validate2();
    init_values();
    init_valueFromAST();
    stdTypeMap = keyMap(
      [...specifiedScalarTypes, ...introspectionTypes],
      (type) => type.name
    );
  }
});

// ../node_modules/graphql/utilities/buildASTSchema.mjs
function buildASTSchema(documentAST, options) {
  documentAST != null && documentAST.kind === Kind.DOCUMENT || devAssert(false, "Must provide valid Document AST.");
  if ((options === null || options === void 0 ? void 0 : options.assumeValid) !== true && (options === null || options === void 0 ? void 0 : options.assumeValidSDL) !== true) {
    assertValidSDL(documentAST);
  }
  const emptySchemaConfig = {
    description: void 0,
    types: [],
    directives: [],
    extensions: /* @__PURE__ */ Object.create(null),
    extensionASTNodes: [],
    assumeValid: false
  };
  const config = extendSchemaImpl(emptySchemaConfig, documentAST, options);
  if (config.astNode == null) {
    for (const type of config.types) {
      switch (type.name) {
        // Note: While this could make early assertions to get the correctly
        // typed values below, that would throw immediately while type system
        // validation with validateSchema() will produce more actionable results.
        case "Query":
          config.query = type;
          break;
        case "Mutation":
          config.mutation = type;
          break;
        case "Subscription":
          config.subscription = type;
          break;
      }
    }
  }
  const directives = [
    ...config.directives,
    // If specified directives were not explicitly declared, add them.
    ...specifiedDirectives.filter(
      (stdDirective) => config.directives.every(
        (directive) => directive.name !== stdDirective.name
      )
    )
  ];
  return new GraphQLSchema({ ...config, directives });
}
function buildSchema(source, options) {
  const document = parse(source, {
    noLocation: options === null || options === void 0 ? void 0 : options.noLocation,
    allowLegacyFragmentVariables: options === null || options === void 0 ? void 0 : options.allowLegacyFragmentVariables
  });
  return buildASTSchema(document, {
    assumeValidSDL: options === null || options === void 0 ? void 0 : options.assumeValidSDL,
    assumeValid: options === null || options === void 0 ? void 0 : options.assumeValid
  });
}
var init_buildASTSchema = __esm({
  "../node_modules/graphql/utilities/buildASTSchema.mjs"() {
    init_devAssert();
    init_kinds();
    init_parser();
    init_directives();
    init_schema();
    init_validate2();
    init_extendSchema();
  }
});

// ../node_modules/graphql/utilities/lexicographicSortSchema.mjs
function lexicographicSortSchema(schema) {
  const schemaConfig = schema.toConfig();
  const typeMap = keyValMap(
    sortByName(schemaConfig.types),
    (type) => type.name,
    sortNamedType
  );
  return new GraphQLSchema({
    ...schemaConfig,
    types: Object.values(typeMap),
    directives: sortByName(schemaConfig.directives).map(sortDirective),
    query: replaceMaybeType(schemaConfig.query),
    mutation: replaceMaybeType(schemaConfig.mutation),
    subscription: replaceMaybeType(schemaConfig.subscription)
  });
  function replaceType(type) {
    if (isListType(type)) {
      return new GraphQLList(replaceType(type.ofType));
    } else if (isNonNullType(type)) {
      return new GraphQLNonNull(replaceType(type.ofType));
    }
    return replaceNamedType(type);
  }
  function replaceNamedType(type) {
    return typeMap[type.name];
  }
  function replaceMaybeType(maybeType) {
    return maybeType && replaceNamedType(maybeType);
  }
  function sortDirective(directive) {
    const config = directive.toConfig();
    return new GraphQLDirective({
      ...config,
      locations: sortBy(config.locations, (x) => x),
      args: sortArgs(config.args)
    });
  }
  function sortArgs(args) {
    return sortObjMap(args, (arg) => ({ ...arg, type: replaceType(arg.type) }));
  }
  function sortFields2(fieldsMap) {
    return sortObjMap(fieldsMap, (field) => ({
      ...field,
      type: replaceType(field.type),
      args: field.args && sortArgs(field.args)
    }));
  }
  function sortInputFields(fieldsMap) {
    return sortObjMap(fieldsMap, (field) => ({
      ...field,
      type: replaceType(field.type)
    }));
  }
  function sortTypes(array) {
    return sortByName(array).map(replaceNamedType);
  }
  function sortNamedType(type) {
    if (isScalarType(type) || isIntrospectionType(type)) {
      return type;
    }
    if (isObjectType(type)) {
      const config = type.toConfig();
      return new GraphQLObjectType({
        ...config,
        interfaces: () => sortTypes(config.interfaces),
        fields: () => sortFields2(config.fields)
      });
    }
    if (isInterfaceType(type)) {
      const config = type.toConfig();
      return new GraphQLInterfaceType({
        ...config,
        interfaces: () => sortTypes(config.interfaces),
        fields: () => sortFields2(config.fields)
      });
    }
    if (isUnionType(type)) {
      const config = type.toConfig();
      return new GraphQLUnionType({
        ...config,
        types: () => sortTypes(config.types)
      });
    }
    if (isEnumType(type)) {
      const config = type.toConfig();
      return new GraphQLEnumType({
        ...config,
        values: sortObjMap(config.values, (value) => value)
      });
    }
    if (isInputObjectType(type)) {
      const config = type.toConfig();
      return new GraphQLInputObjectType({
        ...config,
        fields: () => sortInputFields(config.fields)
      });
    }
    invariant2(false, "Unexpected type: " + inspect(type));
  }
}
function sortObjMap(map2, sortValueFn) {
  const sortedMap = /* @__PURE__ */ Object.create(null);
  for (const key of Object.keys(map2).sort(naturalCompare)) {
    sortedMap[key] = sortValueFn(map2[key]);
  }
  return sortedMap;
}
function sortByName(array) {
  return sortBy(array, (obj) => obj.name);
}
function sortBy(array, mapToKey) {
  return array.slice().sort((obj1, obj2) => {
    const key1 = mapToKey(obj1);
    const key2 = mapToKey(obj2);
    return naturalCompare(key1, key2);
  });
}
var init_lexicographicSortSchema = __esm({
  "../node_modules/graphql/utilities/lexicographicSortSchema.mjs"() {
    init_inspect();
    init_invariant2();
    init_keyValMap();
    init_naturalCompare();
    init_definition();
    init_directives();
    init_introspection();
    init_schema();
  }
});

// ../node_modules/graphql/utilities/printSchema.mjs
function printSchema(schema) {
  return printFilteredSchema(
    schema,
    (n) => !isSpecifiedDirective(n),
    isDefinedType
  );
}
function printIntrospectionSchema(schema) {
  return printFilteredSchema(schema, isSpecifiedDirective, isIntrospectionType);
}
function isDefinedType(type) {
  return !isSpecifiedScalarType(type) && !isIntrospectionType(type);
}
function printFilteredSchema(schema, directiveFilter, typeFilter) {
  const directives = schema.getDirectives().filter(directiveFilter);
  const types = Object.values(schema.getTypeMap()).filter(typeFilter);
  return [
    printSchemaDefinition(schema),
    ...directives.map((directive) => printDirective(directive)),
    ...types.map((type) => printType(type))
  ].filter(Boolean).join("\n\n");
}
function printSchemaDefinition(schema) {
  if (schema.description == null && isSchemaOfCommonNames(schema)) {
    return;
  }
  const operationTypes = [];
  const queryType = schema.getQueryType();
  if (queryType) {
    operationTypes.push(`  query: ${queryType.name}`);
  }
  const mutationType = schema.getMutationType();
  if (mutationType) {
    operationTypes.push(`  mutation: ${mutationType.name}`);
  }
  const subscriptionType = schema.getSubscriptionType();
  if (subscriptionType) {
    operationTypes.push(`  subscription: ${subscriptionType.name}`);
  }
  return printDescription(schema) + `schema {
${operationTypes.join("\n")}
}`;
}
function isSchemaOfCommonNames(schema) {
  const queryType = schema.getQueryType();
  if (queryType && queryType.name !== "Query") {
    return false;
  }
  const mutationType = schema.getMutationType();
  if (mutationType && mutationType.name !== "Mutation") {
    return false;
  }
  const subscriptionType = schema.getSubscriptionType();
  if (subscriptionType && subscriptionType.name !== "Subscription") {
    return false;
  }
  return true;
}
function printType(type) {
  if (isScalarType(type)) {
    return printScalar(type);
  }
  if (isObjectType(type)) {
    return printObject(type);
  }
  if (isInterfaceType(type)) {
    return printInterface(type);
  }
  if (isUnionType(type)) {
    return printUnion(type);
  }
  if (isEnumType(type)) {
    return printEnum(type);
  }
  if (isInputObjectType(type)) {
    return printInputObject(type);
  }
  invariant2(false, "Unexpected type: " + inspect(type));
}
function printScalar(type) {
  return printDescription(type) + `scalar ${type.name}` + printSpecifiedByURL(type);
}
function printImplementedInterfaces(type) {
  const interfaces = type.getInterfaces();
  return interfaces.length ? " implements " + interfaces.map((i) => i.name).join(" & ") : "";
}
function printObject(type) {
  return printDescription(type) + `type ${type.name}` + printImplementedInterfaces(type) + printFields(type);
}
function printInterface(type) {
  return printDescription(type) + `interface ${type.name}` + printImplementedInterfaces(type) + printFields(type);
}
function printUnion(type) {
  const types = type.getTypes();
  const possibleTypes = types.length ? " = " + types.join(" | ") : "";
  return printDescription(type) + "union " + type.name + possibleTypes;
}
function printEnum(type) {
  const values = type.getValues().map(
    (value, i) => printDescription(value, "  ", !i) + "  " + value.name + printDeprecated(value.deprecationReason)
  );
  return printDescription(type) + `enum ${type.name}` + printBlock(values);
}
function printInputObject(type) {
  const fields = Object.values(type.getFields()).map(
    (f, i) => printDescription(f, "  ", !i) + "  " + printInputValue(f)
  );
  return printDescription(type) + `input ${type.name}` + (type.isOneOf ? " @oneOf" : "") + printBlock(fields);
}
function printFields(type) {
  const fields = Object.values(type.getFields()).map(
    (f, i) => printDescription(f, "  ", !i) + "  " + f.name + printArgs(f.args, "  ") + ": " + String(f.type) + printDeprecated(f.deprecationReason)
  );
  return printBlock(fields);
}
function printBlock(items) {
  return items.length !== 0 ? " {\n" + items.join("\n") + "\n}" : "";
}
function printArgs(args, indentation = "") {
  if (args.length === 0) {
    return "";
  }
  if (args.every((arg) => !arg.description)) {
    return "(" + args.map(printInputValue).join(", ") + ")";
  }
  return "(\n" + args.map(
    (arg, i) => printDescription(arg, "  " + indentation, !i) + "  " + indentation + printInputValue(arg)
  ).join("\n") + "\n" + indentation + ")";
}
function printInputValue(arg) {
  const defaultAST = astFromValue(arg.defaultValue, arg.type);
  let argDecl = arg.name + ": " + String(arg.type);
  if (defaultAST) {
    argDecl += ` = ${print(defaultAST)}`;
  }
  return argDecl + printDeprecated(arg.deprecationReason);
}
function printDirective(directive) {
  return printDescription(directive) + "directive @" + directive.name + printArgs(directive.args) + (directive.isRepeatable ? " repeatable" : "") + " on " + directive.locations.join(" | ");
}
function printDeprecated(reason) {
  if (reason == null) {
    return "";
  }
  if (reason !== DEFAULT_DEPRECATION_REASON) {
    const astValue = print({
      kind: Kind.STRING,
      value: reason
    });
    return ` @deprecated(reason: ${astValue})`;
  }
  return " @deprecated";
}
function printSpecifiedByURL(scalar) {
  if (scalar.specifiedByURL == null) {
    return "";
  }
  const astValue = print({
    kind: Kind.STRING,
    value: scalar.specifiedByURL
  });
  return ` @specifiedBy(url: ${astValue})`;
}
function printDescription(def, indentation = "", firstInBlock = true) {
  const { description } = def;
  if (description == null) {
    return "";
  }
  const blockString = print({
    kind: Kind.STRING,
    value: description,
    block: isPrintableAsBlockString(description)
  });
  const prefix = indentation && !firstInBlock ? "\n" + indentation : indentation;
  return prefix + blockString.replace(/\n/g, "\n" + indentation) + "\n";
}
var init_printSchema = __esm({
  "../node_modules/graphql/utilities/printSchema.mjs"() {
    init_inspect();
    init_invariant2();
    init_blockString();
    init_kinds();
    init_printer();
    init_definition();
    init_directives();
    init_introspection();
    init_scalars();
    init_astFromValue();
  }
});

// ../node_modules/graphql/utilities/concatAST.mjs
function concatAST(documents2) {
  const definitions = [];
  for (const doc of documents2) {
    definitions.push(...doc.definitions);
  }
  return {
    kind: Kind.DOCUMENT,
    definitions
  };
}
var init_concatAST = __esm({
  "../node_modules/graphql/utilities/concatAST.mjs"() {
    init_kinds();
  }
});

// ../node_modules/graphql/utilities/separateOperations.mjs
function separateOperations(documentAST) {
  const operations = [];
  const depGraph = /* @__PURE__ */ Object.create(null);
  for (const definitionNode of documentAST.definitions) {
    switch (definitionNode.kind) {
      case Kind.OPERATION_DEFINITION:
        operations.push(definitionNode);
        break;
      case Kind.FRAGMENT_DEFINITION:
        depGraph[definitionNode.name.value] = collectDependencies(
          definitionNode.selectionSet
        );
        break;
      default:
    }
  }
  const separatedDocumentASTs = /* @__PURE__ */ Object.create(null);
  for (const operation of operations) {
    const dependencies = /* @__PURE__ */ new Set();
    for (const fragmentName of collectDependencies(operation.selectionSet)) {
      collectTransitiveDependencies(dependencies, depGraph, fragmentName);
    }
    const operationName = operation.name ? operation.name.value : "";
    separatedDocumentASTs[operationName] = {
      kind: Kind.DOCUMENT,
      definitions: documentAST.definitions.filter(
        (node) => node === operation || node.kind === Kind.FRAGMENT_DEFINITION && dependencies.has(node.name.value)
      )
    };
  }
  return separatedDocumentASTs;
}
function collectTransitiveDependencies(collected, depGraph, fromName) {
  if (!collected.has(fromName)) {
    collected.add(fromName);
    const immediateDeps = depGraph[fromName];
    if (immediateDeps !== void 0) {
      for (const toName of immediateDeps) {
        collectTransitiveDependencies(collected, depGraph, toName);
      }
    }
  }
}
function collectDependencies(selectionSet) {
  const dependencies = [];
  visit(selectionSet, {
    FragmentSpread(node) {
      dependencies.push(node.name.value);
    }
  });
  return dependencies;
}
var init_separateOperations = __esm({
  "../node_modules/graphql/utilities/separateOperations.mjs"() {
    init_kinds();
    init_visitor();
  }
});

// ../node_modules/graphql/utilities/stripIgnoredCharacters.mjs
function stripIgnoredCharacters(source) {
  const sourceObj = isSource(source) ? source : new Source(source);
  const body = sourceObj.body;
  const lexer = new Lexer(sourceObj);
  let strippedBody = "";
  let wasLastAddedTokenNonPunctuator = false;
  while (lexer.advance().kind !== TokenKind.EOF) {
    const currentToken = lexer.token;
    const tokenKind = currentToken.kind;
    const isNonPunctuator = !isPunctuatorTokenKind(currentToken.kind);
    if (wasLastAddedTokenNonPunctuator) {
      if (isNonPunctuator || currentToken.kind === TokenKind.SPREAD) {
        strippedBody += " ";
      }
    }
    const tokenBody = body.slice(currentToken.start, currentToken.end);
    if (tokenKind === TokenKind.BLOCK_STRING) {
      strippedBody += printBlockString(currentToken.value, {
        minimize: true
      });
    } else {
      strippedBody += tokenBody;
    }
    wasLastAddedTokenNonPunctuator = isNonPunctuator;
  }
  return strippedBody;
}
var init_stripIgnoredCharacters = __esm({
  "../node_modules/graphql/utilities/stripIgnoredCharacters.mjs"() {
    init_blockString();
    init_lexer();
    init_source();
    init_tokenKind();
  }
});

// ../node_modules/graphql/utilities/assertValidName.mjs
function assertValidName(name) {
  const error = isValidNameError(name);
  if (error) {
    throw error;
  }
  return name;
}
function isValidNameError(name) {
  typeof name === "string" || devAssert(false, "Expected name to be a string.");
  if (name.startsWith("__")) {
    return new GraphQLError(
      `Name "${name}" must not begin with "__", which is reserved by GraphQL introspection.`
    );
  }
  try {
    assertName(name);
  } catch (error) {
    return error;
  }
}
var init_assertValidName = __esm({
  "../node_modules/graphql/utilities/assertValidName.mjs"() {
    init_devAssert();
    init_GraphQLError();
    init_assertName();
  }
});

// ../node_modules/graphql/utilities/findBreakingChanges.mjs
function findBreakingChanges(oldSchema, newSchema) {
  return findSchemaChanges(oldSchema, newSchema).filter(
    (change) => change.type in BreakingChangeType
  );
}
function findDangerousChanges(oldSchema, newSchema) {
  return findSchemaChanges(oldSchema, newSchema).filter(
    (change) => change.type in DangerousChangeType
  );
}
function findSchemaChanges(oldSchema, newSchema) {
  return [
    ...findTypeChanges(oldSchema, newSchema),
    ...findDirectiveChanges(oldSchema, newSchema)
  ];
}
function findDirectiveChanges(oldSchema, newSchema) {
  const schemaChanges = [];
  const directivesDiff = diff(
    oldSchema.getDirectives(),
    newSchema.getDirectives()
  );
  for (const oldDirective of directivesDiff.removed) {
    schemaChanges.push({
      type: BreakingChangeType.DIRECTIVE_REMOVED,
      description: `${oldDirective.name} was removed.`
    });
  }
  for (const [oldDirective, newDirective] of directivesDiff.persisted) {
    const argsDiff = diff(oldDirective.args, newDirective.args);
    for (const newArg of argsDiff.added) {
      if (isRequiredArgument(newArg)) {
        schemaChanges.push({
          type: BreakingChangeType.REQUIRED_DIRECTIVE_ARG_ADDED,
          description: `A required arg ${newArg.name} on directive ${oldDirective.name} was added.`
        });
      }
    }
    for (const oldArg of argsDiff.removed) {
      schemaChanges.push({
        type: BreakingChangeType.DIRECTIVE_ARG_REMOVED,
        description: `${oldArg.name} was removed from ${oldDirective.name}.`
      });
    }
    if (oldDirective.isRepeatable && !newDirective.isRepeatable) {
      schemaChanges.push({
        type: BreakingChangeType.DIRECTIVE_REPEATABLE_REMOVED,
        description: `Repeatable flag was removed from ${oldDirective.name}.`
      });
    }
    for (const location of oldDirective.locations) {
      if (!newDirective.locations.includes(location)) {
        schemaChanges.push({
          type: BreakingChangeType.DIRECTIVE_LOCATION_REMOVED,
          description: `${location} was removed from ${oldDirective.name}.`
        });
      }
    }
  }
  return schemaChanges;
}
function findTypeChanges(oldSchema, newSchema) {
  const schemaChanges = [];
  const typesDiff = diff(
    Object.values(oldSchema.getTypeMap()),
    Object.values(newSchema.getTypeMap())
  );
  for (const oldType of typesDiff.removed) {
    schemaChanges.push({
      type: BreakingChangeType.TYPE_REMOVED,
      description: isSpecifiedScalarType(oldType) ? `Standard scalar ${oldType.name} was removed because it is not referenced anymore.` : `${oldType.name} was removed.`
    });
  }
  for (const [oldType, newType] of typesDiff.persisted) {
    if (isEnumType(oldType) && isEnumType(newType)) {
      schemaChanges.push(...findEnumTypeChanges(oldType, newType));
    } else if (isUnionType(oldType) && isUnionType(newType)) {
      schemaChanges.push(...findUnionTypeChanges(oldType, newType));
    } else if (isInputObjectType(oldType) && isInputObjectType(newType)) {
      schemaChanges.push(...findInputObjectTypeChanges(oldType, newType));
    } else if (isObjectType(oldType) && isObjectType(newType)) {
      schemaChanges.push(
        ...findFieldChanges(oldType, newType),
        ...findImplementedInterfacesChanges(oldType, newType)
      );
    } else if (isInterfaceType(oldType) && isInterfaceType(newType)) {
      schemaChanges.push(
        ...findFieldChanges(oldType, newType),
        ...findImplementedInterfacesChanges(oldType, newType)
      );
    } else if (oldType.constructor !== newType.constructor) {
      schemaChanges.push({
        type: BreakingChangeType.TYPE_CHANGED_KIND,
        description: `${oldType.name} changed from ${typeKindName(oldType)} to ${typeKindName(newType)}.`
      });
    }
  }
  return schemaChanges;
}
function findInputObjectTypeChanges(oldType, newType) {
  const schemaChanges = [];
  const fieldsDiff = diff(
    Object.values(oldType.getFields()),
    Object.values(newType.getFields())
  );
  for (const newField of fieldsDiff.added) {
    if (isRequiredInputField(newField)) {
      schemaChanges.push({
        type: BreakingChangeType.REQUIRED_INPUT_FIELD_ADDED,
        description: `A required field ${newField.name} on input type ${oldType.name} was added.`
      });
    } else {
      schemaChanges.push({
        type: DangerousChangeType.OPTIONAL_INPUT_FIELD_ADDED,
        description: `An optional field ${newField.name} on input type ${oldType.name} was added.`
      });
    }
  }
  for (const oldField of fieldsDiff.removed) {
    schemaChanges.push({
      type: BreakingChangeType.FIELD_REMOVED,
      description: `${oldType.name}.${oldField.name} was removed.`
    });
  }
  for (const [oldField, newField] of fieldsDiff.persisted) {
    const isSafe = isChangeSafeForInputObjectFieldOrFieldArg(
      oldField.type,
      newField.type
    );
    if (!isSafe) {
      schemaChanges.push({
        type: BreakingChangeType.FIELD_CHANGED_KIND,
        description: `${oldType.name}.${oldField.name} changed type from ${String(oldField.type)} to ${String(newField.type)}.`
      });
    }
  }
  return schemaChanges;
}
function findUnionTypeChanges(oldType, newType) {
  const schemaChanges = [];
  const possibleTypesDiff = diff(oldType.getTypes(), newType.getTypes());
  for (const newPossibleType of possibleTypesDiff.added) {
    schemaChanges.push({
      type: DangerousChangeType.TYPE_ADDED_TO_UNION,
      description: `${newPossibleType.name} was added to union type ${oldType.name}.`
    });
  }
  for (const oldPossibleType of possibleTypesDiff.removed) {
    schemaChanges.push({
      type: BreakingChangeType.TYPE_REMOVED_FROM_UNION,
      description: `${oldPossibleType.name} was removed from union type ${oldType.name}.`
    });
  }
  return schemaChanges;
}
function findEnumTypeChanges(oldType, newType) {
  const schemaChanges = [];
  const valuesDiff = diff(oldType.getValues(), newType.getValues());
  for (const newValue of valuesDiff.added) {
    schemaChanges.push({
      type: DangerousChangeType.VALUE_ADDED_TO_ENUM,
      description: `${newValue.name} was added to enum type ${oldType.name}.`
    });
  }
  for (const oldValue of valuesDiff.removed) {
    schemaChanges.push({
      type: BreakingChangeType.VALUE_REMOVED_FROM_ENUM,
      description: `${oldValue.name} was removed from enum type ${oldType.name}.`
    });
  }
  return schemaChanges;
}
function findImplementedInterfacesChanges(oldType, newType) {
  const schemaChanges = [];
  const interfacesDiff = diff(oldType.getInterfaces(), newType.getInterfaces());
  for (const newInterface of interfacesDiff.added) {
    schemaChanges.push({
      type: DangerousChangeType.IMPLEMENTED_INTERFACE_ADDED,
      description: `${newInterface.name} added to interfaces implemented by ${oldType.name}.`
    });
  }
  for (const oldInterface of interfacesDiff.removed) {
    schemaChanges.push({
      type: BreakingChangeType.IMPLEMENTED_INTERFACE_REMOVED,
      description: `${oldType.name} no longer implements interface ${oldInterface.name}.`
    });
  }
  return schemaChanges;
}
function findFieldChanges(oldType, newType) {
  const schemaChanges = [];
  const fieldsDiff = diff(
    Object.values(oldType.getFields()),
    Object.values(newType.getFields())
  );
  for (const oldField of fieldsDiff.removed) {
    schemaChanges.push({
      type: BreakingChangeType.FIELD_REMOVED,
      description: `${oldType.name}.${oldField.name} was removed.`
    });
  }
  for (const [oldField, newField] of fieldsDiff.persisted) {
    schemaChanges.push(...findArgChanges(oldType, oldField, newField));
    const isSafe = isChangeSafeForObjectOrInterfaceField(
      oldField.type,
      newField.type
    );
    if (!isSafe) {
      schemaChanges.push({
        type: BreakingChangeType.FIELD_CHANGED_KIND,
        description: `${oldType.name}.${oldField.name} changed type from ${String(oldField.type)} to ${String(newField.type)}.`
      });
    }
  }
  return schemaChanges;
}
function findArgChanges(oldType, oldField, newField) {
  const schemaChanges = [];
  const argsDiff = diff(oldField.args, newField.args);
  for (const oldArg of argsDiff.removed) {
    schemaChanges.push({
      type: BreakingChangeType.ARG_REMOVED,
      description: `${oldType.name}.${oldField.name} arg ${oldArg.name} was removed.`
    });
  }
  for (const [oldArg, newArg] of argsDiff.persisted) {
    const isSafe = isChangeSafeForInputObjectFieldOrFieldArg(
      oldArg.type,
      newArg.type
    );
    if (!isSafe) {
      schemaChanges.push({
        type: BreakingChangeType.ARG_CHANGED_KIND,
        description: `${oldType.name}.${oldField.name} arg ${oldArg.name} has changed type from ${String(oldArg.type)} to ${String(newArg.type)}.`
      });
    } else if (oldArg.defaultValue !== void 0) {
      if (newArg.defaultValue === void 0) {
        schemaChanges.push({
          type: DangerousChangeType.ARG_DEFAULT_VALUE_CHANGE,
          description: `${oldType.name}.${oldField.name} arg ${oldArg.name} defaultValue was removed.`
        });
      } else {
        const oldValueStr = stringifyValue2(oldArg.defaultValue, oldArg.type);
        const newValueStr = stringifyValue2(newArg.defaultValue, newArg.type);
        if (oldValueStr !== newValueStr) {
          schemaChanges.push({
            type: DangerousChangeType.ARG_DEFAULT_VALUE_CHANGE,
            description: `${oldType.name}.${oldField.name} arg ${oldArg.name} has changed defaultValue from ${oldValueStr} to ${newValueStr}.`
          });
        }
      }
    }
  }
  for (const newArg of argsDiff.added) {
    if (isRequiredArgument(newArg)) {
      schemaChanges.push({
        type: BreakingChangeType.REQUIRED_ARG_ADDED,
        description: `A required arg ${newArg.name} on ${oldType.name}.${oldField.name} was added.`
      });
    } else {
      schemaChanges.push({
        type: DangerousChangeType.OPTIONAL_ARG_ADDED,
        description: `An optional arg ${newArg.name} on ${oldType.name}.${oldField.name} was added.`
      });
    }
  }
  return schemaChanges;
}
function isChangeSafeForObjectOrInterfaceField(oldType, newType) {
  if (isListType(oldType)) {
    return (
      // if they're both lists, make sure the underlying types are compatible
      isListType(newType) && isChangeSafeForObjectOrInterfaceField(
        oldType.ofType,
        newType.ofType
      ) || // moving from nullable to non-null of the same underlying type is safe
      isNonNullType(newType) && isChangeSafeForObjectOrInterfaceField(oldType, newType.ofType)
    );
  }
  if (isNonNullType(oldType)) {
    return isNonNullType(newType) && isChangeSafeForObjectOrInterfaceField(oldType.ofType, newType.ofType);
  }
  return (
    // if they're both named types, see if their names are equivalent
    isNamedType(newType) && oldType.name === newType.name || // moving from nullable to non-null of the same underlying type is safe
    isNonNullType(newType) && isChangeSafeForObjectOrInterfaceField(oldType, newType.ofType)
  );
}
function isChangeSafeForInputObjectFieldOrFieldArg(oldType, newType) {
  if (isListType(oldType)) {
    return isListType(newType) && isChangeSafeForInputObjectFieldOrFieldArg(oldType.ofType, newType.ofType);
  }
  if (isNonNullType(oldType)) {
    return (
      // if they're both non-null, make sure the underlying types are
      // compatible
      isNonNullType(newType) && isChangeSafeForInputObjectFieldOrFieldArg(
        oldType.ofType,
        newType.ofType
      ) || // moving from non-null to nullable of the same underlying type is safe
      !isNonNullType(newType) && isChangeSafeForInputObjectFieldOrFieldArg(oldType.ofType, newType)
    );
  }
  return isNamedType(newType) && oldType.name === newType.name;
}
function typeKindName(type) {
  if (isScalarType(type)) {
    return "a Scalar type";
  }
  if (isObjectType(type)) {
    return "an Object type";
  }
  if (isInterfaceType(type)) {
    return "an Interface type";
  }
  if (isUnionType(type)) {
    return "a Union type";
  }
  if (isEnumType(type)) {
    return "an Enum type";
  }
  if (isInputObjectType(type)) {
    return "an Input type";
  }
  invariant2(false, "Unexpected type: " + inspect(type));
}
function stringifyValue2(value, type) {
  const ast = astFromValue(value, type);
  ast != null || invariant2(false);
  return print(sortValueNode(ast));
}
function diff(oldArray, newArray) {
  const added = [];
  const removed = [];
  const persisted = [];
  const oldMap = keyMap(oldArray, ({ name }) => name);
  const newMap = keyMap(newArray, ({ name }) => name);
  for (const oldItem of oldArray) {
    const newItem = newMap[oldItem.name];
    if (newItem === void 0) {
      removed.push(oldItem);
    } else {
      persisted.push([oldItem, newItem]);
    }
  }
  for (const newItem of newArray) {
    if (oldMap[newItem.name] === void 0) {
      added.push(newItem);
    }
  }
  return {
    added,
    persisted,
    removed
  };
}
var BreakingChangeType, DangerousChangeType;
var init_findBreakingChanges = __esm({
  "../node_modules/graphql/utilities/findBreakingChanges.mjs"() {
    init_inspect();
    init_invariant2();
    init_keyMap();
    init_printer();
    init_definition();
    init_scalars();
    init_astFromValue();
    init_sortValueNode();
    (function(BreakingChangeType2) {
      BreakingChangeType2["TYPE_REMOVED"] = "TYPE_REMOVED";
      BreakingChangeType2["TYPE_CHANGED_KIND"] = "TYPE_CHANGED_KIND";
      BreakingChangeType2["TYPE_REMOVED_FROM_UNION"] = "TYPE_REMOVED_FROM_UNION";
      BreakingChangeType2["VALUE_REMOVED_FROM_ENUM"] = "VALUE_REMOVED_FROM_ENUM";
      BreakingChangeType2["REQUIRED_INPUT_FIELD_ADDED"] = "REQUIRED_INPUT_FIELD_ADDED";
      BreakingChangeType2["IMPLEMENTED_INTERFACE_REMOVED"] = "IMPLEMENTED_INTERFACE_REMOVED";
      BreakingChangeType2["FIELD_REMOVED"] = "FIELD_REMOVED";
      BreakingChangeType2["FIELD_CHANGED_KIND"] = "FIELD_CHANGED_KIND";
      BreakingChangeType2["REQUIRED_ARG_ADDED"] = "REQUIRED_ARG_ADDED";
      BreakingChangeType2["ARG_REMOVED"] = "ARG_REMOVED";
      BreakingChangeType2["ARG_CHANGED_KIND"] = "ARG_CHANGED_KIND";
      BreakingChangeType2["DIRECTIVE_REMOVED"] = "DIRECTIVE_REMOVED";
      BreakingChangeType2["DIRECTIVE_ARG_REMOVED"] = "DIRECTIVE_ARG_REMOVED";
      BreakingChangeType2["REQUIRED_DIRECTIVE_ARG_ADDED"] = "REQUIRED_DIRECTIVE_ARG_ADDED";
      BreakingChangeType2["DIRECTIVE_REPEATABLE_REMOVED"] = "DIRECTIVE_REPEATABLE_REMOVED";
      BreakingChangeType2["DIRECTIVE_LOCATION_REMOVED"] = "DIRECTIVE_LOCATION_REMOVED";
    })(BreakingChangeType || (BreakingChangeType = {}));
    (function(DangerousChangeType2) {
      DangerousChangeType2["VALUE_ADDED_TO_ENUM"] = "VALUE_ADDED_TO_ENUM";
      DangerousChangeType2["TYPE_ADDED_TO_UNION"] = "TYPE_ADDED_TO_UNION";
      DangerousChangeType2["OPTIONAL_INPUT_FIELD_ADDED"] = "OPTIONAL_INPUT_FIELD_ADDED";
      DangerousChangeType2["OPTIONAL_ARG_ADDED"] = "OPTIONAL_ARG_ADDED";
      DangerousChangeType2["IMPLEMENTED_INTERFACE_ADDED"] = "IMPLEMENTED_INTERFACE_ADDED";
      DangerousChangeType2["ARG_DEFAULT_VALUE_CHANGE"] = "ARG_DEFAULT_VALUE_CHANGE";
    })(DangerousChangeType || (DangerousChangeType = {}));
  }
});

// ../node_modules/graphql/utilities/index.mjs
var init_utilities = __esm({
  "../node_modules/graphql/utilities/index.mjs"() {
    init_getIntrospectionQuery();
    init_getOperationAST();
    init_getOperationRootType();
    init_introspectionFromSchema();
    init_buildClientSchema();
    init_buildASTSchema();
    init_extendSchema();
    init_lexicographicSortSchema();
    init_printSchema();
    init_typeFromAST();
    init_valueFromAST();
    init_valueFromASTUntyped();
    init_astFromValue();
    init_TypeInfo();
    init_coerceInputValue();
    init_concatAST();
    init_separateOperations();
    init_stripIgnoredCharacters();
    init_typeComparators();
    init_assertValidName();
    init_findBreakingChanges();
  }
});

// ../node_modules/graphql/index.mjs
var graphql_exports = {};
__export(graphql_exports, {
  BREAK: () => BREAK,
  BreakingChangeType: () => BreakingChangeType,
  DEFAULT_DEPRECATION_REASON: () => DEFAULT_DEPRECATION_REASON,
  DangerousChangeType: () => DangerousChangeType,
  DirectiveLocation: () => DirectiveLocation,
  ExecutableDefinitionsRule: () => ExecutableDefinitionsRule,
  FieldsOnCorrectTypeRule: () => FieldsOnCorrectTypeRule,
  FragmentsOnCompositeTypesRule: () => FragmentsOnCompositeTypesRule,
  GRAPHQL_MAX_INT: () => GRAPHQL_MAX_INT,
  GRAPHQL_MIN_INT: () => GRAPHQL_MIN_INT,
  GraphQLBoolean: () => GraphQLBoolean,
  GraphQLDeprecatedDirective: () => GraphQLDeprecatedDirective,
  GraphQLDirective: () => GraphQLDirective,
  GraphQLEnumType: () => GraphQLEnumType,
  GraphQLError: () => GraphQLError,
  GraphQLFloat: () => GraphQLFloat,
  GraphQLID: () => GraphQLID,
  GraphQLIncludeDirective: () => GraphQLIncludeDirective,
  GraphQLInputObjectType: () => GraphQLInputObjectType,
  GraphQLInt: () => GraphQLInt,
  GraphQLInterfaceType: () => GraphQLInterfaceType,
  GraphQLList: () => GraphQLList,
  GraphQLNonNull: () => GraphQLNonNull,
  GraphQLObjectType: () => GraphQLObjectType,
  GraphQLOneOfDirective: () => GraphQLOneOfDirective,
  GraphQLScalarType: () => GraphQLScalarType,
  GraphQLSchema: () => GraphQLSchema,
  GraphQLSkipDirective: () => GraphQLSkipDirective,
  GraphQLSpecifiedByDirective: () => GraphQLSpecifiedByDirective,
  GraphQLString: () => GraphQLString,
  GraphQLUnionType: () => GraphQLUnionType,
  Kind: () => Kind,
  KnownArgumentNamesRule: () => KnownArgumentNamesRule,
  KnownDirectivesRule: () => KnownDirectivesRule,
  KnownFragmentNamesRule: () => KnownFragmentNamesRule,
  KnownTypeNamesRule: () => KnownTypeNamesRule,
  Lexer: () => Lexer,
  Location: () => Location,
  LoneAnonymousOperationRule: () => LoneAnonymousOperationRule,
  LoneSchemaDefinitionRule: () => LoneSchemaDefinitionRule,
  MaxIntrospectionDepthRule: () => MaxIntrospectionDepthRule,
  NoDeprecatedCustomRule: () => NoDeprecatedCustomRule,
  NoFragmentCyclesRule: () => NoFragmentCyclesRule,
  NoSchemaIntrospectionCustomRule: () => NoSchemaIntrospectionCustomRule,
  NoUndefinedVariablesRule: () => NoUndefinedVariablesRule,
  NoUnusedFragmentsRule: () => NoUnusedFragmentsRule,
  NoUnusedVariablesRule: () => NoUnusedVariablesRule,
  OperationTypeNode: () => OperationTypeNode,
  OverlappingFieldsCanBeMergedRule: () => OverlappingFieldsCanBeMergedRule,
  PossibleFragmentSpreadsRule: () => PossibleFragmentSpreadsRule,
  PossibleTypeExtensionsRule: () => PossibleTypeExtensionsRule,
  ProvidedRequiredArgumentsRule: () => ProvidedRequiredArgumentsRule,
  ScalarLeafsRule: () => ScalarLeafsRule,
  SchemaMetaFieldDef: () => SchemaMetaFieldDef,
  SingleFieldSubscriptionsRule: () => SingleFieldSubscriptionsRule,
  Source: () => Source,
  Token: () => Token,
  TokenKind: () => TokenKind,
  TypeInfo: () => TypeInfo,
  TypeKind: () => TypeKind,
  TypeMetaFieldDef: () => TypeMetaFieldDef,
  TypeNameMetaFieldDef: () => TypeNameMetaFieldDef,
  UniqueArgumentDefinitionNamesRule: () => UniqueArgumentDefinitionNamesRule,
  UniqueArgumentNamesRule: () => UniqueArgumentNamesRule,
  UniqueDirectiveNamesRule: () => UniqueDirectiveNamesRule,
  UniqueDirectivesPerLocationRule: () => UniqueDirectivesPerLocationRule,
  UniqueEnumValueNamesRule: () => UniqueEnumValueNamesRule,
  UniqueFieldDefinitionNamesRule: () => UniqueFieldDefinitionNamesRule,
  UniqueFragmentNamesRule: () => UniqueFragmentNamesRule,
  UniqueInputFieldNamesRule: () => UniqueInputFieldNamesRule,
  UniqueOperationNamesRule: () => UniqueOperationNamesRule,
  UniqueOperationTypesRule: () => UniqueOperationTypesRule,
  UniqueTypeNamesRule: () => UniqueTypeNamesRule,
  UniqueVariableNamesRule: () => UniqueVariableNamesRule,
  ValidationContext: () => ValidationContext,
  ValuesOfCorrectTypeRule: () => ValuesOfCorrectTypeRule,
  VariablesAreInputTypesRule: () => VariablesAreInputTypesRule,
  VariablesInAllowedPositionRule: () => VariablesInAllowedPositionRule,
  __Directive: () => __Directive,
  __DirectiveLocation: () => __DirectiveLocation,
  __EnumValue: () => __EnumValue,
  __Field: () => __Field,
  __InputValue: () => __InputValue,
  __Schema: () => __Schema,
  __Type: () => __Type,
  __TypeKind: () => __TypeKind,
  assertAbstractType: () => assertAbstractType,
  assertCompositeType: () => assertCompositeType,
  assertDirective: () => assertDirective,
  assertEnumType: () => assertEnumType,
  assertEnumValueName: () => assertEnumValueName,
  assertInputObjectType: () => assertInputObjectType,
  assertInputType: () => assertInputType,
  assertInterfaceType: () => assertInterfaceType,
  assertLeafType: () => assertLeafType,
  assertListType: () => assertListType,
  assertName: () => assertName,
  assertNamedType: () => assertNamedType,
  assertNonNullType: () => assertNonNullType,
  assertNullableType: () => assertNullableType,
  assertObjectType: () => assertObjectType,
  assertOutputType: () => assertOutputType,
  assertScalarType: () => assertScalarType,
  assertSchema: () => assertSchema,
  assertType: () => assertType,
  assertUnionType: () => assertUnionType,
  assertValidName: () => assertValidName,
  assertValidSchema: () => assertValidSchema,
  assertWrappingType: () => assertWrappingType,
  astFromValue: () => astFromValue,
  buildASTSchema: () => buildASTSchema,
  buildClientSchema: () => buildClientSchema,
  buildSchema: () => buildSchema,
  coerceInputValue: () => coerceInputValue,
  concatAST: () => concatAST,
  createSourceEventStream: () => createSourceEventStream,
  defaultFieldResolver: () => defaultFieldResolver,
  defaultTypeResolver: () => defaultTypeResolver,
  doTypesOverlap: () => doTypesOverlap,
  execute: () => execute,
  executeSync: () => executeSync,
  extendSchema: () => extendSchema,
  findBreakingChanges: () => findBreakingChanges,
  findDangerousChanges: () => findDangerousChanges,
  formatError: () => formatError,
  getArgumentValues: () => getArgumentValues,
  getDirectiveValues: () => getDirectiveValues,
  getEnterLeaveForKind: () => getEnterLeaveForKind,
  getIntrospectionQuery: () => getIntrospectionQuery,
  getLocation: () => getLocation,
  getNamedType: () => getNamedType,
  getNullableType: () => getNullableType,
  getOperationAST: () => getOperationAST,
  getOperationRootType: () => getOperationRootType,
  getVariableValues: () => getVariableValues,
  getVisitFn: () => getVisitFn,
  graphql: () => graphql,
  graphqlSync: () => graphqlSync,
  introspectionFromSchema: () => introspectionFromSchema,
  introspectionTypes: () => introspectionTypes,
  isAbstractType: () => isAbstractType,
  isCompositeType: () => isCompositeType,
  isConstValueNode: () => isConstValueNode,
  isDefinitionNode: () => isDefinitionNode,
  isDirective: () => isDirective,
  isEnumType: () => isEnumType,
  isEqualType: () => isEqualType,
  isExecutableDefinitionNode: () => isExecutableDefinitionNode,
  isInputObjectType: () => isInputObjectType,
  isInputType: () => isInputType,
  isInterfaceType: () => isInterfaceType,
  isIntrospectionType: () => isIntrospectionType,
  isLeafType: () => isLeafType,
  isListType: () => isListType,
  isNamedType: () => isNamedType,
  isNonNullType: () => isNonNullType,
  isNullableType: () => isNullableType,
  isObjectType: () => isObjectType,
  isOutputType: () => isOutputType,
  isRequiredArgument: () => isRequiredArgument,
  isRequiredInputField: () => isRequiredInputField,
  isScalarType: () => isScalarType,
  isSchema: () => isSchema,
  isSelectionNode: () => isSelectionNode,
  isSpecifiedDirective: () => isSpecifiedDirective,
  isSpecifiedScalarType: () => isSpecifiedScalarType,
  isType: () => isType,
  isTypeDefinitionNode: () => isTypeDefinitionNode,
  isTypeExtensionNode: () => isTypeExtensionNode,
  isTypeNode: () => isTypeNode,
  isTypeSubTypeOf: () => isTypeSubTypeOf,
  isTypeSystemDefinitionNode: () => isTypeSystemDefinitionNode,
  isTypeSystemExtensionNode: () => isTypeSystemExtensionNode,
  isUnionType: () => isUnionType,
  isValidNameError: () => isValidNameError,
  isValueNode: () => isValueNode,
  isWrappingType: () => isWrappingType,
  lexicographicSortSchema: () => lexicographicSortSchema,
  locatedError: () => locatedError,
  parse: () => parse,
  parseConstValue: () => parseConstValue,
  parseType: () => parseType,
  parseValue: () => parseValue,
  print: () => print,
  printError: () => printError,
  printIntrospectionSchema: () => printIntrospectionSchema,
  printLocation: () => printLocation,
  printSchema: () => printSchema,
  printSourceLocation: () => printSourceLocation,
  printType: () => printType,
  recommendedRules: () => recommendedRules,
  resolveObjMapThunk: () => resolveObjMapThunk,
  resolveReadonlyArrayThunk: () => resolveReadonlyArrayThunk,
  responsePathAsArray: () => pathToArray,
  separateOperations: () => separateOperations,
  specifiedDirectives: () => specifiedDirectives,
  specifiedRules: () => specifiedRules,
  specifiedScalarTypes: () => specifiedScalarTypes,
  stripIgnoredCharacters: () => stripIgnoredCharacters,
  subscribe: () => subscribe,
  syntaxError: () => syntaxError,
  typeFromAST: () => typeFromAST,
  validate: () => validate,
  validateSchema: () => validateSchema,
  valueFromAST: () => valueFromAST,
  valueFromASTUntyped: () => valueFromASTUntyped,
  version: () => version,
  versionInfo: () => versionInfo,
  visit: () => visit,
  visitInParallel: () => visitInParallel,
  visitWithTypeInfo: () => visitWithTypeInfo
});
var init_graphql2 = __esm({
  "../node_modules/graphql/index.mjs"() {
    init_version();
    init_graphql();
    init_type();
    init_language();
    init_execution();
    init_validation();
    init_error();
    init_utilities();
  }
});

// ../node_modules/@wry/trie/lib/index.js
var lib_exports = {};
__export(lib_exports, {
  Trie: () => Trie
});
function isObjRef(value) {
  switch (typeof value) {
    case "object":
      if (value === null)
        break;
    // Fall through to return true...
    case "function":
      return true;
  }
  return false;
}
var defaultMakeData, forEach, slice, hasOwnProperty2, Trie;
var init_lib = __esm({
  "../node_modules/@wry/trie/lib/index.js"() {
    defaultMakeData = () => /* @__PURE__ */ Object.create(null);
    ({ forEach, slice } = Array.prototype);
    ({ hasOwnProperty: hasOwnProperty2 } = Object.prototype);
    Trie = class _Trie {
      constructor(weakness = true, makeData = defaultMakeData) {
        this.weakness = weakness;
        this.makeData = makeData;
      }
      lookup() {
        return this.lookupArray(arguments);
      }
      lookupArray(array) {
        let node = this;
        forEach.call(array, (key) => node = node.getChildTrie(key));
        return hasOwnProperty2.call(node, "data") ? node.data : node.data = this.makeData(slice.call(array));
      }
      peek() {
        return this.peekArray(arguments);
      }
      peekArray(array) {
        let node = this;
        for (let i = 0, len = array.length; node && i < len; ++i) {
          const map2 = node.mapFor(array[i], false);
          node = map2 && map2.get(array[i]);
        }
        return node && node.data;
      }
      remove() {
        return this.removeArray(arguments);
      }
      removeArray(array) {
        let data;
        if (array.length) {
          const head = array[0];
          const map2 = this.mapFor(head, false);
          const child = map2 && map2.get(head);
          if (child) {
            data = child.removeArray(slice.call(array, 1));
            if (!child.data && !child.weak && !(child.strong && child.strong.size)) {
              map2.delete(head);
            }
          }
        } else {
          data = this.data;
          delete this.data;
        }
        return data;
      }
      getChildTrie(key) {
        const map2 = this.mapFor(key, true);
        let child = map2.get(key);
        if (!child)
          map2.set(key, child = new _Trie(this.weakness, this.makeData));
        return child;
      }
      mapFor(key, create) {
        return this.weakness && isObjRef(key) ? this.weak || (create ? this.weak = /* @__PURE__ */ new WeakMap() : void 0) : this.strong || (create ? this.strong = /* @__PURE__ */ new Map() : void 0);
      }
    };
  }
});

// ../node_modules/@wry/caches/lib/strong.js
function defaultDispose() {
}
var StrongCache;
var init_strong = __esm({
  "../node_modules/@wry/caches/lib/strong.js"() {
    StrongCache = class {
      constructor(max = Infinity, dispose = defaultDispose) {
        this.max = max;
        this.dispose = dispose;
        this.map = /* @__PURE__ */ new Map();
        this.newest = null;
        this.oldest = null;
      }
      has(key) {
        return this.map.has(key);
      }
      get(key) {
        const node = this.getNode(key);
        return node && node.value;
      }
      get size() {
        return this.map.size;
      }
      getNode(key) {
        const node = this.map.get(key);
        if (node && node !== this.newest) {
          const { older, newer } = node;
          if (newer) {
            newer.older = older;
          }
          if (older) {
            older.newer = newer;
          }
          node.older = this.newest;
          node.older.newer = node;
          node.newer = null;
          this.newest = node;
          if (node === this.oldest) {
            this.oldest = newer;
          }
        }
        return node;
      }
      set(key, value) {
        let node = this.getNode(key);
        if (node) {
          return node.value = value;
        }
        node = {
          key,
          value,
          newer: null,
          older: this.newest
        };
        if (this.newest) {
          this.newest.newer = node;
        }
        this.newest = node;
        this.oldest = this.oldest || node;
        this.map.set(key, node);
        return node.value;
      }
      clean() {
        while (this.oldest && this.map.size > this.max) {
          this.delete(this.oldest.key);
        }
      }
      delete(key) {
        const node = this.map.get(key);
        if (node) {
          if (node === this.newest) {
            this.newest = node.older;
          }
          if (node === this.oldest) {
            this.oldest = node.newer;
          }
          if (node.newer) {
            node.newer.older = node.older;
          }
          if (node.older) {
            node.older.newer = node.newer;
          }
          this.map.delete(key);
          this.dispose(node.value, key);
          return true;
        }
        return false;
      }
    };
  }
});

// ../node_modules/@wry/caches/lib/weak.js
function noop() {
}
var defaultDispose2, _WeakRef, _WeakMap, _FinalizationRegistry, finalizationBatchSize, WeakCache;
var init_weak = __esm({
  "../node_modules/@wry/caches/lib/weak.js"() {
    defaultDispose2 = noop;
    _WeakRef = typeof WeakRef !== "undefined" ? WeakRef : function(value) {
      return { deref: () => value };
    };
    _WeakMap = typeof WeakMap !== "undefined" ? WeakMap : Map;
    _FinalizationRegistry = typeof FinalizationRegistry !== "undefined" ? FinalizationRegistry : function() {
      return {
        register: noop,
        unregister: noop
      };
    };
    finalizationBatchSize = 10024;
    WeakCache = class {
      constructor(max = Infinity, dispose = defaultDispose2) {
        this.max = max;
        this.dispose = dispose;
        this.map = new _WeakMap();
        this.newest = null;
        this.oldest = null;
        this.unfinalizedNodes = /* @__PURE__ */ new Set();
        this.finalizationScheduled = false;
        this.size = 0;
        this.finalize = () => {
          const iterator = this.unfinalizedNodes.values();
          for (let i = 0; i < finalizationBatchSize; i++) {
            const node = iterator.next().value;
            if (!node)
              break;
            this.unfinalizedNodes.delete(node);
            const key = node.key;
            delete node.key;
            node.keyRef = new _WeakRef(key);
            this.registry.register(key, node, node);
          }
          if (this.unfinalizedNodes.size > 0) {
            queueMicrotask(this.finalize);
          } else {
            this.finalizationScheduled = false;
          }
        };
        this.registry = new _FinalizationRegistry(this.deleteNode.bind(this));
      }
      has(key) {
        return this.map.has(key);
      }
      get(key) {
        const node = this.getNode(key);
        return node && node.value;
      }
      getNode(key) {
        const node = this.map.get(key);
        if (node && node !== this.newest) {
          const { older, newer } = node;
          if (newer) {
            newer.older = older;
          }
          if (older) {
            older.newer = newer;
          }
          node.older = this.newest;
          node.older.newer = node;
          node.newer = null;
          this.newest = node;
          if (node === this.oldest) {
            this.oldest = newer;
          }
        }
        return node;
      }
      set(key, value) {
        let node = this.getNode(key);
        if (node) {
          return node.value = value;
        }
        node = {
          key,
          value,
          newer: null,
          older: this.newest
        };
        if (this.newest) {
          this.newest.newer = node;
        }
        this.newest = node;
        this.oldest = this.oldest || node;
        this.scheduleFinalization(node);
        this.map.set(key, node);
        this.size++;
        return node.value;
      }
      clean() {
        while (this.oldest && this.size > this.max) {
          this.deleteNode(this.oldest);
        }
      }
      deleteNode(node) {
        if (node === this.newest) {
          this.newest = node.older;
        }
        if (node === this.oldest) {
          this.oldest = node.newer;
        }
        if (node.newer) {
          node.newer.older = node.older;
        }
        if (node.older) {
          node.older.newer = node.newer;
        }
        this.size--;
        const key = node.key || node.keyRef && node.keyRef.deref();
        this.dispose(node.value, key);
        if (!node.keyRef) {
          this.unfinalizedNodes.delete(node);
        } else {
          this.registry.unregister(node);
        }
        if (key)
          this.map.delete(key);
      }
      delete(key) {
        const node = this.map.get(key);
        if (node) {
          this.deleteNode(node);
          return true;
        }
        return false;
      }
      scheduleFinalization(node) {
        this.unfinalizedNodes.add(node);
        if (!this.finalizationScheduled) {
          this.finalizationScheduled = true;
          queueMicrotask(this.finalize);
        }
      }
    };
  }
});

// ../node_modules/@wry/caches/lib/index.js
var lib_exports2 = {};
__export(lib_exports2, {
  StrongCache: () => StrongCache,
  WeakCache: () => WeakCache
});
var init_lib2 = __esm({
  "../node_modules/@wry/caches/lib/index.js"() {
    init_strong();
    init_weak();
  }
});

// ../node_modules/@wry/context/lib/slot.js
function maybe(fn) {
  try {
    return fn();
  } catch (ignored) {
  }
}
var currentContext, MISSING_VALUE, idCounter, makeSlotClass, globalKey, host, globalHost, Slot;
var init_slot = __esm({
  "../node_modules/@wry/context/lib/slot.js"() {
    currentContext = null;
    MISSING_VALUE = {};
    idCounter = 1;
    makeSlotClass = () => class Slot {
      constructor() {
        this.id = [
          "slot",
          idCounter++,
          Date.now(),
          Math.random().toString(36).slice(2)
        ].join(":");
      }
      hasValue() {
        for (let context = currentContext; context; context = context.parent) {
          if (this.id in context.slots) {
            const value = context.slots[this.id];
            if (value === MISSING_VALUE)
              break;
            if (context !== currentContext) {
              currentContext.slots[this.id] = value;
            }
            return true;
          }
        }
        if (currentContext) {
          currentContext.slots[this.id] = MISSING_VALUE;
        }
        return false;
      }
      getValue() {
        if (this.hasValue()) {
          return currentContext.slots[this.id];
        }
      }
      withValue(value, callback, args, thisArg) {
        const slots = {
          __proto__: null,
          [this.id]: value
        };
        const parent = currentContext;
        currentContext = { parent, slots };
        try {
          return callback.apply(thisArg, args);
        } finally {
          currentContext = parent;
        }
      }
      // Capture the current context and wrap a callback function so that it
      // reestablishes the captured context when called.
      static bind(callback) {
        const context = currentContext;
        return function() {
          const saved = currentContext;
          try {
            currentContext = context;
            return callback.apply(this, arguments);
          } finally {
            currentContext = saved;
          }
        };
      }
      // Immediately run a callback function without any captured context.
      static noContext(callback, args, thisArg) {
        if (currentContext) {
          const saved = currentContext;
          try {
            currentContext = null;
            return callback.apply(thisArg, args);
          } finally {
            currentContext = saved;
          }
        } else {
          return callback.apply(thisArg, args);
        }
      }
    };
    globalKey = "@wry/context:Slot";
    host = // Prefer globalThis when available.
    // https://github.com/benjamn/wryware/issues/347
    maybe(() => globalThis) || // Fall back to global, which works in Node.js and may be converted by some
    // bundlers to the appropriate identifier (window, self, ...) depending on the
    // bundling target. https://github.com/endojs/endo/issues/576#issuecomment-1178515224
    maybe(() => globalThis) || // Otherwise, use a dummy host that's local to this module. We used to fall
    // back to using the Array constructor as a namespace, but that was flagged in
    // https://github.com/benjamn/wryware/issues/347, and can be avoided.
    /* @__PURE__ */ Object.create(null);
    globalHost = host;
    Slot = globalHost[globalKey] || // Earlier versions of this package stored the globalKey property on the Array
    // constructor, so we check there as well, to prevent Slot class duplication.
    Array[globalKey] || (function(Slot2) {
      try {
        Object.defineProperty(globalHost, globalKey, {
          value: Slot2,
          enumerable: false,
          writable: false,
          // When it was possible for globalHost to be the Array constructor (a
          // legacy Slot dedup strategy), it was important for the property to be
          // configurable:true so it could be deleted. That does not seem to be as
          // important when globalHost is the global object, but I don't want to
          // cause similar problems again, and configurable:true seems safest.
          // https://github.com/endojs/endo/issues/576#issuecomment-1178274008
          configurable: true
        });
      } finally {
        return Slot2;
      }
    })(makeSlotClass());
  }
});

// ../node_modules/@wry/context/lib/index.js
function setTimeoutWithContext(callback, delay) {
  return setTimeout(bind(callback), delay);
}
function asyncFromGen(genFn) {
  return function() {
    const gen = genFn.apply(this, arguments);
    const boundNext = bind(gen.next);
    const boundThrow = bind(gen.throw);
    return new Promise((resolve, reject) => {
      function invoke(method, argument) {
        try {
          var result2 = method.call(gen, argument);
        } catch (error) {
          return reject(error);
        }
        const next = result2.done ? resolve : invokeNext;
        if (isPromiseLike(result2.value)) {
          result2.value.then(next, result2.done ? reject : invokeThrow);
        } else {
          next(result2.value);
        }
      }
      const invokeNext = (value) => invoke(boundNext, value);
      const invokeThrow = (error) => invoke(boundThrow, error);
      invokeNext();
    });
  };
}
function isPromiseLike(value) {
  return value && typeof value.then === "function";
}
var bind, noContext;
var init_lib3 = __esm({
  "../node_modules/@wry/context/lib/index.js"() {
    init_slot();
    ({ bind, noContext } = Slot);
  }
});

// ../node_modules/optimism/lib/context.js
function nonReactive(fn) {
  return parentEntrySlot.withValue(void 0, fn);
}
var parentEntrySlot;
var init_context = __esm({
  "../node_modules/optimism/lib/context.js"() {
    init_lib3();
    init_lib3();
    parentEntrySlot = new Slot();
  }
});

// ../node_modules/optimism/lib/helpers.js
function maybeUnsubscribe(entryOrDep) {
  const { unsubscribe } = entryOrDep;
  if (typeof unsubscribe === "function") {
    entryOrDep.unsubscribe = void 0;
    unsubscribe();
  }
}
var hasOwnProperty3, arrayFromSet;
var init_helpers = __esm({
  "../node_modules/optimism/lib/helpers.js"() {
    ({ hasOwnProperty: hasOwnProperty3 } = Object.prototype);
    arrayFromSet = Array.from || function(set) {
      const array = [];
      set.forEach((item) => array.push(item));
      return array;
    };
  }
});

// ../node_modules/optimism/lib/entry.js
function assert(condition, optionalMessage) {
  if (!condition) {
    throw new Error(optionalMessage || "assertion failure");
  }
}
function valueIs(a, b) {
  const len = a.length;
  return (
    // Unknown values are not equal to each other.
    len > 0 && // Both values must be ordinary (or both exceptional) to be equal.
    len === b.length && // The underlying value or exception must be the same.
    a[len - 1] === b[len - 1]
  );
}
function valueGet(value) {
  switch (value.length) {
    case 0:
      throw new Error("unknown value");
    case 1:
      return value[0];
    case 2:
      throw value[1];
  }
}
function valueCopy(value) {
  return value.slice(0);
}
function rememberParent(child) {
  const parent = parentEntrySlot.getValue();
  if (parent) {
    child.parents.add(parent);
    if (!parent.childValues.has(child)) {
      parent.childValues.set(child, []);
    }
    if (mightBeDirty(child)) {
      reportDirtyChild(parent, child);
    } else {
      reportCleanChild(parent, child);
    }
    return parent;
  }
}
function reallyRecompute(entry, args) {
  forgetChildren(entry);
  parentEntrySlot.withValue(entry, recomputeNewValue, [entry, args]);
  if (maybeSubscribe(entry, args)) {
    setClean(entry);
  }
  return valueGet(entry.value);
}
function recomputeNewValue(entry, args) {
  entry.recomputing = true;
  const { normalizeResult } = entry;
  let oldValueCopy;
  if (normalizeResult && entry.value.length === 1) {
    oldValueCopy = valueCopy(entry.value);
  }
  entry.value.length = 0;
  try {
    entry.value[0] = entry.fn.apply(null, args);
    if (normalizeResult && oldValueCopy && !valueIs(oldValueCopy, entry.value)) {
      try {
        entry.value[0] = normalizeResult(entry.value[0], oldValueCopy[0]);
      } catch (_a2) {
      }
    }
  } catch (e) {
    entry.value[1] = e;
  }
  entry.recomputing = false;
}
function mightBeDirty(entry) {
  return entry.dirty || !!(entry.dirtyChildren && entry.dirtyChildren.size);
}
function setClean(entry) {
  entry.dirty = false;
  if (mightBeDirty(entry)) {
    return;
  }
  reportClean(entry);
}
function reportDirty(child) {
  eachParent(child, reportDirtyChild);
}
function reportClean(child) {
  eachParent(child, reportCleanChild);
}
function eachParent(child, callback) {
  const parentCount = child.parents.size;
  if (parentCount) {
    const parents = arrayFromSet(child.parents);
    for (let i = 0; i < parentCount; ++i) {
      callback(parents[i], child);
    }
  }
}
function reportDirtyChild(parent, child) {
  assert(parent.childValues.has(child));
  assert(mightBeDirty(child));
  const parentWasClean = !mightBeDirty(parent);
  if (!parent.dirtyChildren) {
    parent.dirtyChildren = emptySetPool.pop() || /* @__PURE__ */ new Set();
  } else if (parent.dirtyChildren.has(child)) {
    return;
  }
  parent.dirtyChildren.add(child);
  if (parentWasClean) {
    reportDirty(parent);
  }
}
function reportCleanChild(parent, child) {
  assert(parent.childValues.has(child));
  assert(!mightBeDirty(child));
  const childValue = parent.childValues.get(child);
  if (childValue.length === 0) {
    parent.childValues.set(child, valueCopy(child.value));
  } else if (!valueIs(childValue, child.value)) {
    parent.setDirty();
  }
  removeDirtyChild(parent, child);
  if (mightBeDirty(parent)) {
    return;
  }
  reportClean(parent);
}
function removeDirtyChild(parent, child) {
  const dc = parent.dirtyChildren;
  if (dc) {
    dc.delete(child);
    if (dc.size === 0) {
      if (emptySetPool.length < POOL_TARGET_SIZE) {
        emptySetPool.push(dc);
      }
      parent.dirtyChildren = null;
    }
  }
}
function forgetChildren(parent) {
  if (parent.childValues.size > 0) {
    parent.childValues.forEach((_value, child) => {
      forgetChild(parent, child);
    });
  }
  parent.forgetDeps();
  assert(parent.dirtyChildren === null);
}
function forgetChild(parent, child) {
  child.parents.delete(parent);
  parent.childValues.delete(child);
  removeDirtyChild(parent, child);
}
function maybeSubscribe(entry, args) {
  if (typeof entry.subscribe === "function") {
    try {
      maybeUnsubscribe(entry);
      entry.unsubscribe = entry.subscribe.apply(null, args);
    } catch (e) {
      entry.setDirty();
      return false;
    }
  }
  return true;
}
var emptySetPool, POOL_TARGET_SIZE, Entry;
var init_entry = __esm({
  "../node_modules/optimism/lib/entry.js"() {
    init_context();
    init_helpers();
    emptySetPool = [];
    POOL_TARGET_SIZE = 100;
    Entry = class _Entry {
      constructor(fn) {
        this.fn = fn;
        this.parents = /* @__PURE__ */ new Set();
        this.childValues = /* @__PURE__ */ new Map();
        this.dirtyChildren = null;
        this.dirty = true;
        this.recomputing = false;
        this.value = [];
        this.deps = null;
        ++_Entry.count;
      }
      peek() {
        if (this.value.length === 1 && !mightBeDirty(this)) {
          rememberParent(this);
          return this.value[0];
        }
      }
      // This is the most important method of the Entry API, because it
      // determines whether the cached this.value can be returned immediately,
      // or must be recomputed. The overall performance of the caching system
      // depends on the truth of the following observations: (1) this.dirty is
      // usually false, (2) this.dirtyChildren is usually null/empty, and thus
      // (3) valueGet(this.value) is usually returned without recomputation.
      recompute(args) {
        assert(!this.recomputing, "already recomputing");
        rememberParent(this);
        return mightBeDirty(this) ? reallyRecompute(this, args) : valueGet(this.value);
      }
      setDirty() {
        if (this.dirty)
          return;
        this.dirty = true;
        reportDirty(this);
        maybeUnsubscribe(this);
      }
      dispose() {
        this.setDirty();
        forgetChildren(this);
        eachParent(this, (parent, child) => {
          parent.setDirty();
          forgetChild(parent, this);
        });
      }
      forget() {
        this.dispose();
      }
      dependOn(dep2) {
        dep2.add(this);
        if (!this.deps) {
          this.deps = emptySetPool.pop() || /* @__PURE__ */ new Set();
        }
        this.deps.add(dep2);
      }
      forgetDeps() {
        if (this.deps) {
          arrayFromSet(this.deps).forEach((dep2) => dep2.delete(this));
          this.deps.clear();
          emptySetPool.push(this.deps);
          this.deps = null;
        }
      }
    };
    Entry.count = 0;
  }
});

// ../node_modules/optimism/lib/dep.js
function dep(options) {
  const depsByKey = /* @__PURE__ */ new Map();
  const subscribe2 = options && options.subscribe;
  function depend(key) {
    const parent = parentEntrySlot.getValue();
    if (parent) {
      let dep2 = depsByKey.get(key);
      if (!dep2) {
        depsByKey.set(key, dep2 = /* @__PURE__ */ new Set());
      }
      parent.dependOn(dep2);
      if (typeof subscribe2 === "function") {
        maybeUnsubscribe(dep2);
        dep2.unsubscribe = subscribe2(key);
      }
    }
  }
  depend.dirty = function dirty(key, entryMethodName) {
    const dep2 = depsByKey.get(key);
    if (dep2) {
      const m = entryMethodName && hasOwnProperty3.call(EntryMethods, entryMethodName) ? entryMethodName : "setDirty";
      arrayFromSet(dep2).forEach((entry) => entry[m]());
      depsByKey.delete(key);
      maybeUnsubscribe(dep2);
    }
  };
  return depend;
}
var EntryMethods;
var init_dep = __esm({
  "../node_modules/optimism/lib/dep.js"() {
    init_context();
    init_helpers();
    EntryMethods = {
      setDirty: true,
      dispose: true,
      forget: true
      // Fully remove parent Entry from LRU cache and computation graph
    };
  }
});

// ../node_modules/optimism/lib/index.js
var lib_exports3 = {};
__export(lib_exports3, {
  KeyTrie: () => Trie,
  Slot: () => Slot,
  asyncFromGen: () => asyncFromGen,
  bindContext: () => bind,
  defaultMakeCacheKey: () => defaultMakeCacheKey,
  dep: () => dep,
  noContext: () => noContext,
  nonReactive: () => nonReactive,
  setTimeout: () => setTimeoutWithContext,
  wrap: () => wrap2
});
function defaultMakeCacheKey(...args) {
  const trie = defaultKeyTrie || (defaultKeyTrie = new Trie(typeof WeakMap === "function"));
  return trie.lookupArray(args);
}
function wrap2(originalFunction, { max = Math.pow(2, 16), keyArgs, makeCacheKey = defaultMakeCacheKey, normalizeResult, subscribe: subscribe2, cache: cacheOption = StrongCache } = /* @__PURE__ */ Object.create(null)) {
  const cache = typeof cacheOption === "function" ? new cacheOption(max, (entry) => entry.dispose()) : cacheOption;
  const optimistic = function() {
    const key = makeCacheKey.apply(null, keyArgs ? keyArgs.apply(null, arguments) : arguments);
    if (key === void 0) {
      return originalFunction.apply(null, arguments);
    }
    let entry = cache.get(key);
    if (!entry) {
      cache.set(key, entry = new Entry(originalFunction));
      entry.normalizeResult = normalizeResult;
      entry.subscribe = subscribe2;
      entry.forget = () => cache.delete(key);
    }
    const value = entry.recompute(Array.prototype.slice.call(arguments));
    cache.set(key, entry);
    caches.add(cache);
    if (!parentEntrySlot.hasValue()) {
      caches.forEach((cache2) => cache2.clean());
      caches.clear();
    }
    return value;
  };
  Object.defineProperty(optimistic, "size", {
    get: () => cache.size,
    configurable: false,
    enumerable: false
  });
  Object.freeze(optimistic.options = {
    max,
    keyArgs,
    makeCacheKey,
    normalizeResult,
    subscribe: subscribe2,
    cache
  });
  function dirtyKey(key) {
    const entry = key && cache.get(key);
    if (entry) {
      entry.setDirty();
    }
  }
  optimistic.dirtyKey = dirtyKey;
  optimistic.dirty = function dirty() {
    dirtyKey(makeCacheKey.apply(null, arguments));
  };
  function peekKey(key) {
    const entry = key && cache.get(key);
    if (entry) {
      return entry.peek();
    }
  }
  optimistic.peekKey = peekKey;
  optimistic.peek = function peek() {
    return peekKey(makeCacheKey.apply(null, arguments));
  };
  function forgetKey(key) {
    return key ? cache.delete(key) : false;
  }
  optimistic.forgetKey = forgetKey;
  optimistic.forget = function forget() {
    return forgetKey(makeCacheKey.apply(null, arguments));
  };
  optimistic.makeCacheKey = makeCacheKey;
  optimistic.getKey = keyArgs ? function getKey() {
    return makeCacheKey.apply(null, keyArgs.apply(null, arguments));
  } : makeCacheKey;
  return Object.freeze(optimistic);
}
var defaultKeyTrie, caches;
var init_lib4 = __esm({
  "../node_modules/optimism/lib/index.js"() {
    init_lib();
    init_lib2();
    init_entry();
    init_context();
    init_context();
    init_dep();
    caches = /* @__PURE__ */ new Set();
  }
});

// ../node_modules/zen-observable-ts/module.js
var module_exports = {};
__export(module_exports, {
  Observable: () => Observable2
});
function _createForOfIteratorHelperLoose(o, allowArrayLike) {
  var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"];
  if (it) return (it = it.call(o)).next.bind(it);
  if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
    if (it) o = it;
    var i = 0;
    return function() {
      if (i >= o.length) return { done: true };
      return { done: false, value: o[i++] };
    };
  }
  throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}
function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++) {
    arr2[i] = arr[i];
  }
  return arr2;
}
function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}
function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  Object.defineProperty(Constructor, "prototype", { writable: false });
  return Constructor;
}
function getMethod(obj, key) {
  var value = obj[key];
  if (value == null) return void 0;
  if (typeof value !== "function") throw new TypeError(value + " is not a function");
  return value;
}
function getSpecies(obj) {
  var ctor = obj.constructor;
  if (ctor !== void 0) {
    ctor = ctor[SymbolSpecies];
    if (ctor === null) {
      ctor = void 0;
    }
  }
  return ctor !== void 0 ? ctor : Observable2;
}
function isObservable(x) {
  return x instanceof Observable2;
}
function hostReportError(e) {
  if (hostReportError.log) {
    hostReportError.log(e);
  } else {
    setTimeout(function() {
      throw e;
    });
  }
}
function enqueue(fn) {
  Promise.resolve().then(function() {
    try {
      fn();
    } catch (e) {
      hostReportError(e);
    }
  });
}
function cleanupSubscription(subscription) {
  var cleanup = subscription._cleanup;
  if (cleanup === void 0) return;
  subscription._cleanup = void 0;
  if (!cleanup) {
    return;
  }
  try {
    if (typeof cleanup === "function") {
      cleanup();
    } else {
      var unsubscribe = getMethod(cleanup, "unsubscribe");
      if (unsubscribe) {
        unsubscribe.call(cleanup);
      }
    }
  } catch (e) {
    hostReportError(e);
  }
}
function closeSubscription(subscription) {
  subscription._observer = void 0;
  subscription._queue = void 0;
  subscription._state = "closed";
}
function flushSubscription(subscription) {
  var queue = subscription._queue;
  if (!queue) {
    return;
  }
  subscription._queue = void 0;
  subscription._state = "ready";
  for (var i = 0; i < queue.length; ++i) {
    notifySubscription(subscription, queue[i].type, queue[i].value);
    if (subscription._state === "closed") break;
  }
}
function notifySubscription(subscription, type, value) {
  subscription._state = "running";
  var observer = subscription._observer;
  try {
    var m = getMethod(observer, type);
    switch (type) {
      case "next":
        if (m) m.call(observer, value);
        break;
      case "error":
        closeSubscription(subscription);
        if (m) m.call(observer, value);
        else throw value;
        break;
      case "complete":
        closeSubscription(subscription);
        if (m) m.call(observer);
        break;
    }
  } catch (e) {
    hostReportError(e);
  }
  if (subscription._state === "closed") cleanupSubscription(subscription);
  else if (subscription._state === "running") subscription._state = "ready";
}
function onNotify(subscription, type, value) {
  if (subscription._state === "closed") return;
  if (subscription._state === "buffering") {
    subscription._queue.push({
      type,
      value
    });
    return;
  }
  if (subscription._state !== "ready") {
    subscription._state = "buffering";
    subscription._queue = [{
      type,
      value
    }];
    enqueue(function() {
      return flushSubscription(subscription);
    });
    return;
  }
  notifySubscription(subscription, type, value);
}
var hasSymbols, hasSymbol, getSymbol, SymbolIterator, SymbolObservable, SymbolSpecies, Subscription, SubscriptionObserver, Observable2;
var init_module = __esm({
  "../node_modules/zen-observable-ts/module.js"() {
    hasSymbols = function() {
      return typeof Symbol === "function";
    };
    hasSymbol = function(name) {
      return hasSymbols() && Boolean(Symbol[name]);
    };
    getSymbol = function(name) {
      return hasSymbol(name) ? Symbol[name] : "@@" + name;
    };
    if (hasSymbols() && !hasSymbol("observable")) {
      Symbol.observable = Symbol("observable");
    }
    SymbolIterator = getSymbol("iterator");
    SymbolObservable = getSymbol("observable");
    SymbolSpecies = getSymbol("species");
    Subscription = (function() {
      function Subscription2(observer, subscriber) {
        this._cleanup = void 0;
        this._observer = observer;
        this._queue = void 0;
        this._state = "initializing";
        var subscriptionObserver = new SubscriptionObserver(this);
        try {
          this._cleanup = subscriber.call(void 0, subscriptionObserver);
        } catch (e) {
          subscriptionObserver.error(e);
        }
        if (this._state === "initializing") this._state = "ready";
      }
      var _proto = Subscription2.prototype;
      _proto.unsubscribe = function unsubscribe() {
        if (this._state !== "closed") {
          closeSubscription(this);
          cleanupSubscription(this);
        }
      };
      _createClass(Subscription2, [{
        key: "closed",
        get: function() {
          return this._state === "closed";
        }
      }]);
      return Subscription2;
    })();
    SubscriptionObserver = (function() {
      function SubscriptionObserver2(subscription) {
        this._subscription = subscription;
      }
      var _proto2 = SubscriptionObserver2.prototype;
      _proto2.next = function next(value) {
        onNotify(this._subscription, "next", value);
      };
      _proto2.error = function error(value) {
        onNotify(this._subscription, "error", value);
      };
      _proto2.complete = function complete() {
        onNotify(this._subscription, "complete");
      };
      _createClass(SubscriptionObserver2, [{
        key: "closed",
        get: function() {
          return this._subscription._state === "closed";
        }
      }]);
      return SubscriptionObserver2;
    })();
    Observable2 = (function() {
      function Observable3(subscriber) {
        if (!(this instanceof Observable3)) throw new TypeError("Observable cannot be called as a function");
        if (typeof subscriber !== "function") throw new TypeError("Observable initializer must be a function");
        this._subscriber = subscriber;
      }
      var _proto3 = Observable3.prototype;
      _proto3.subscribe = function subscribe2(observer) {
        if (typeof observer !== "object" || observer === null) {
          observer = {
            next: observer,
            error: arguments[1],
            complete: arguments[2]
          };
        }
        return new Subscription(observer, this._subscriber);
      };
      _proto3.forEach = function forEach2(fn) {
        var _this = this;
        return new Promise(function(resolve, reject) {
          if (typeof fn !== "function") {
            reject(new TypeError(fn + " is not a function"));
            return;
          }
          function done() {
            subscription.unsubscribe();
            resolve();
          }
          var subscription = _this.subscribe({
            next: function(value) {
              try {
                fn(value, done);
              } catch (e) {
                reject(e);
                subscription.unsubscribe();
              }
            },
            error: reject,
            complete: resolve
          });
        });
      };
      _proto3.map = function map2(fn) {
        var _this2 = this;
        if (typeof fn !== "function") throw new TypeError(fn + " is not a function");
        var C = getSpecies(this);
        return new C(function(observer) {
          return _this2.subscribe({
            next: function(value) {
              try {
                value = fn(value);
              } catch (e) {
                return observer.error(e);
              }
              observer.next(value);
            },
            error: function(e) {
              observer.error(e);
            },
            complete: function() {
              observer.complete();
            }
          });
        });
      };
      _proto3.filter = function filter2(fn) {
        var _this3 = this;
        if (typeof fn !== "function") throw new TypeError(fn + " is not a function");
        var C = getSpecies(this);
        return new C(function(observer) {
          return _this3.subscribe({
            next: function(value) {
              try {
                if (!fn(value)) return;
              } catch (e) {
                return observer.error(e);
              }
              observer.next(value);
            },
            error: function(e) {
              observer.error(e);
            },
            complete: function() {
              observer.complete();
            }
          });
        });
      };
      _proto3.reduce = function reduce(fn) {
        var _this4 = this;
        if (typeof fn !== "function") throw new TypeError(fn + " is not a function");
        var C = getSpecies(this);
        var hasSeed = arguments.length > 1;
        var hasValue = false;
        var seed = arguments[1];
        var acc = seed;
        return new C(function(observer) {
          return _this4.subscribe({
            next: function(value) {
              var first = !hasValue;
              hasValue = true;
              if (!first || hasSeed) {
                try {
                  acc = fn(acc, value);
                } catch (e) {
                  return observer.error(e);
                }
              } else {
                acc = value;
              }
            },
            error: function(e) {
              observer.error(e);
            },
            complete: function() {
              if (!hasValue && !hasSeed) return observer.error(new TypeError("Cannot reduce an empty sequence"));
              observer.next(acc);
              observer.complete();
            }
          });
        });
      };
      _proto3.concat = function concat() {
        var _this5 = this;
        for (var _len = arguments.length, sources = new Array(_len), _key = 0; _key < _len; _key++) {
          sources[_key] = arguments[_key];
        }
        var C = getSpecies(this);
        return new C(function(observer) {
          var subscription;
          var index = 0;
          function startNext(next) {
            subscription = next.subscribe({
              next: function(v) {
                observer.next(v);
              },
              error: function(e) {
                observer.error(e);
              },
              complete: function() {
                if (index === sources.length) {
                  subscription = void 0;
                  observer.complete();
                } else {
                  startNext(C.from(sources[index++]));
                }
              }
            });
          }
          startNext(_this5);
          return function() {
            if (subscription) {
              subscription.unsubscribe();
              subscription = void 0;
            }
          };
        });
      };
      _proto3.flatMap = function flatMap(fn) {
        var _this6 = this;
        if (typeof fn !== "function") throw new TypeError(fn + " is not a function");
        var C = getSpecies(this);
        return new C(function(observer) {
          var subscriptions = [];
          var outer = _this6.subscribe({
            next: function(value) {
              if (fn) {
                try {
                  value = fn(value);
                } catch (e) {
                  return observer.error(e);
                }
              }
              var inner = C.from(value).subscribe({
                next: function(value2) {
                  observer.next(value2);
                },
                error: function(e) {
                  observer.error(e);
                },
                complete: function() {
                  var i = subscriptions.indexOf(inner);
                  if (i >= 0) subscriptions.splice(i, 1);
                  completeIfDone();
                }
              });
              subscriptions.push(inner);
            },
            error: function(e) {
              observer.error(e);
            },
            complete: function() {
              completeIfDone();
            }
          });
          function completeIfDone() {
            if (outer.closed && subscriptions.length === 0) observer.complete();
          }
          return function() {
            subscriptions.forEach(function(s) {
              return s.unsubscribe();
            });
            outer.unsubscribe();
          };
        });
      };
      _proto3[SymbolObservable] = function() {
        return this;
      };
      Observable3.from = function from3(x) {
        var C = typeof this === "function" ? this : Observable3;
        if (x == null) throw new TypeError(x + " is not an object");
        var method = getMethod(x, SymbolObservable);
        if (method) {
          var observable = method.call(x);
          if (Object(observable) !== observable) throw new TypeError(observable + " is not an object");
          if (isObservable(observable) && observable.constructor === C) return observable;
          return new C(function(observer) {
            return observable.subscribe(observer);
          });
        }
        if (hasSymbol("iterator")) {
          method = getMethod(x, SymbolIterator);
          if (method) {
            return new C(function(observer) {
              enqueue(function() {
                if (observer.closed) return;
                for (var _iterator = _createForOfIteratorHelperLoose(method.call(x)), _step; !(_step = _iterator()).done; ) {
                  var item = _step.value;
                  observer.next(item);
                  if (observer.closed) return;
                }
                observer.complete();
              });
            });
          }
        }
        if (Array.isArray(x)) {
          return new C(function(observer) {
            enqueue(function() {
              if (observer.closed) return;
              for (var i = 0; i < x.length; ++i) {
                observer.next(x[i]);
                if (observer.closed) return;
              }
              observer.complete();
            });
          });
        }
        throw new TypeError(x + " is not observable");
      };
      Observable3.of = function of() {
        for (var _len2 = arguments.length, items = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
          items[_key2] = arguments[_key2];
        }
        var C = typeof this === "function" ? this : Observable3;
        return new C(function(observer) {
          enqueue(function() {
            if (observer.closed) return;
            for (var i = 0; i < items.length; ++i) {
              observer.next(items[i]);
              if (observer.closed) return;
            }
            observer.complete();
          });
        });
      };
      _createClass(Observable3, null, [{
        key: SymbolSpecies,
        get: function() {
          return this;
        }
      }]);
      return Observable3;
    })();
    if (hasSymbols()) {
      Object.defineProperty(Observable2, Symbol("extensions"), {
        value: {
          symbol: SymbolObservable,
          hostReportError
        },
        configurable: true
      });
    }
  }
});

// ../node_modules/symbol-observable/es/ponyfill.js
function symbolObservablePonyfill(root2) {
  var result2;
  var Symbol2 = root2.Symbol;
  if (typeof Symbol2 === "function") {
    if (Symbol2.observable) {
      result2 = Symbol2.observable;
    } else {
      if (typeof Symbol2.for === "function") {
        result2 = Symbol2.for("https://github.com/benlesh/symbol-observable");
      } else {
        result2 = Symbol2("https://github.com/benlesh/symbol-observable");
      }
      try {
        Symbol2.observable = result2;
      } catch (err) {
      }
    }
  } else {
    result2 = "@@observable";
  }
  return result2;
}
var init_ponyfill = __esm({
  "../node_modules/symbol-observable/es/ponyfill.js"() {
  }
});

// ../node_modules/symbol-observable/es/index.js
var es_exports = {};
__export(es_exports, {
  default: () => es_default
});
var root, result, es_default;
var init_es = __esm({
  "../node_modules/symbol-observable/es/index.js"() {
    init_ponyfill();
    if (typeof self !== "undefined") {
      root = self;
    } else if (typeof window !== "undefined") {
      root = window;
    } else if (typeof globalThis !== "undefined") {
      root = globalThis;
    } else if (typeof module !== "undefined") {
      root = module;
    } else {
      root = Function("return this")();
    }
    result = symbolObservablePonyfill(root);
    es_default = result;
  }
});

// ../node_modules/@apollo/client/utilities/utilities.cjs
var require_utilities = __commonJS({
  "../node_modules/@apollo/client/utilities/utilities.cjs"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var globals = require_globals();
    var graphql2 = (init_graphql2(), __toCommonJS(graphql_exports));
    var trie = (init_lib(), __toCommonJS(lib_exports));
    var tslib = (init_tslib_es6(), __toCommonJS(tslib_es6_exports));
    var caches2 = (init_lib2(), __toCommonJS(lib_exports2));
    var optimism = (init_lib4(), __toCommonJS(lib_exports3));
    var zenObservableTs = (init_module(), __toCommonJS(module_exports));
    init_es();
    function shouldInclude(_a2, variables) {
      var directives = _a2.directives;
      if (!directives || !directives.length) {
        return true;
      }
      return getInclusionDirectives(directives).every(function(_a3) {
        var directive = _a3.directive, ifArgument = _a3.ifArgument;
        var evaledValue = false;
        if (ifArgument.value.kind === "Variable") {
          evaledValue = variables && variables[ifArgument.value.name.value];
          globals.invariant(evaledValue !== void 0, 106, directive.name.value);
        } else {
          evaledValue = ifArgument.value.value;
        }
        return directive.name.value === "skip" ? !evaledValue : evaledValue;
      });
    }
    function getDirectiveNames(root2) {
      var names = [];
      graphql2.visit(root2, {
        Directive: function(node) {
          names.push(node.name.value);
        }
      });
      return names;
    }
    var hasAnyDirectives = function(names, root2) {
      return hasDirectives(names, root2, false);
    };
    var hasAllDirectives = function(names, root2) {
      return hasDirectives(names, root2, true);
    };
    function hasDirectives(names, root2, all) {
      var nameSet = new Set(names);
      var uniqueCount = nameSet.size;
      graphql2.visit(root2, {
        Directive: function(node) {
          if (nameSet.delete(node.name.value) && (!all || !nameSet.size)) {
            return graphql2.BREAK;
          }
        }
      });
      return all ? !nameSet.size : nameSet.size < uniqueCount;
    }
    function hasClientExports(document) {
      return document && hasDirectives(["client", "export"], document, true);
    }
    function isInclusionDirective(_a2) {
      var value = _a2.name.value;
      return value === "skip" || value === "include";
    }
    function getInclusionDirectives(directives) {
      var result2 = [];
      if (directives && directives.length) {
        directives.forEach(function(directive) {
          if (!isInclusionDirective(directive))
            return;
          var directiveArguments = directive.arguments;
          var directiveName = directive.name.value;
          globals.invariant(directiveArguments && directiveArguments.length === 1, 107, directiveName);
          var ifArgument = directiveArguments[0];
          globals.invariant(ifArgument.name && ifArgument.name.value === "if", 108, directiveName);
          var ifValue = ifArgument.value;
          globals.invariant(ifValue && (ifValue.kind === "Variable" || ifValue.kind === "BooleanValue"), 109, directiveName);
          result2.push({ directive, ifArgument });
        });
      }
      return result2;
    }
    function getFragmentMaskMode(fragment) {
      var _a2, _b;
      var directive = (_a2 = fragment.directives) === null || _a2 === void 0 ? void 0 : _a2.find(function(_a3) {
        var name = _a3.name;
        return name.value === "unmask";
      });
      if (!directive) {
        return "mask";
      }
      var modeArg = (_b = directive.arguments) === null || _b === void 0 ? void 0 : _b.find(function(_a3) {
        var name = _a3.name;
        return name.value === "mode";
      });
      if (globalThis.__DEV__ !== false) {
        if (modeArg) {
          if (modeArg.value.kind === graphql2.Kind.VARIABLE) {
            globalThis.__DEV__ !== false && globals.invariant.warn(110);
          } else if (modeArg.value.kind !== graphql2.Kind.STRING) {
            globalThis.__DEV__ !== false && globals.invariant.warn(111);
          } else if (modeArg.value.value !== "migrate") {
            globalThis.__DEV__ !== false && globals.invariant.warn(112, modeArg.value.value);
          }
        }
      }
      if (modeArg && "value" in modeArg.value && modeArg.value.value === "migrate") {
        return "migrate";
      }
      return "unmask";
    }
    var isReactNative = globals.maybe(function() {
      return navigator.product;
    }) == "ReactNative";
    var canUseWeakMap = typeof WeakMap === "function" && !(isReactNative && !globalThis.HermesInternal);
    var canUseWeakSet = typeof WeakSet === "function";
    var canUseSymbol = typeof Symbol === "function" && typeof Symbol.for === "function";
    var canUseAsyncIteratorSymbol = canUseSymbol && Symbol.asyncIterator;
    var canUseDOM = typeof globals.maybe(function() {
      return window.document.createElement;
    }) === "function";
    var usingJSDOM = globals.maybe(function() {
      return navigator.userAgent.indexOf("jsdom") >= 0;
    }) || false;
    var canUseLayoutEffect = (canUseDOM || isReactNative) && !usingJSDOM;
    function isNonNullObject(obj) {
      return obj !== null && typeof obj === "object";
    }
    function isPlainObject(obj) {
      return obj !== null && typeof obj === "object" && (Object.getPrototypeOf(obj) === Object.prototype || Object.getPrototypeOf(obj) === null);
    }
    function getFragmentQueryDocument(document, fragmentName) {
      var actualFragmentName = fragmentName;
      var fragments = [];
      document.definitions.forEach(function(definition) {
        if (definition.kind === "OperationDefinition") {
          throw globals.newInvariantError(
            113,
            definition.operation,
            definition.name ? " named '".concat(definition.name.value, "'") : ""
          );
        }
        if (definition.kind === "FragmentDefinition") {
          fragments.push(definition);
        }
      });
      if (typeof actualFragmentName === "undefined") {
        globals.invariant(fragments.length === 1, 114, fragments.length);
        actualFragmentName = fragments[0].name.value;
      }
      var query = tslib.__assign(tslib.__assign({}, document), { definitions: tslib.__spreadArray([
        {
          kind: "OperationDefinition",
          operation: "query",
          selectionSet: {
            kind: "SelectionSet",
            selections: [
              {
                kind: "FragmentSpread",
                name: {
                  kind: "Name",
                  value: actualFragmentName
                }
              }
            ]
          }
        }
      ], document.definitions, true) });
      return query;
    }
    function createFragmentMap(fragments) {
      if (fragments === void 0) {
        fragments = [];
      }
      var symTable = {};
      fragments.forEach(function(fragment) {
        symTable[fragment.name.value] = fragment;
      });
      return symTable;
    }
    function getFragmentFromSelection(selection, fragmentMap) {
      switch (selection.kind) {
        case "InlineFragment":
          return selection;
        case "FragmentSpread": {
          var fragmentName = selection.name.value;
          if (typeof fragmentMap === "function") {
            return fragmentMap(fragmentName);
          }
          var fragment = fragmentMap && fragmentMap[fragmentName];
          globals.invariant(fragment, 115, fragmentName);
          return fragment || null;
        }
        default:
          return null;
      }
    }
    function isFullyUnmaskedOperation(document) {
      var isUnmasked = true;
      graphql2.visit(document, {
        FragmentSpread: function(node) {
          isUnmasked = !!node.directives && node.directives.some(function(directive) {
            return directive.name.value === "unmask";
          });
          if (!isUnmasked) {
            return graphql2.BREAK;
          }
        }
      });
      return isUnmasked;
    }
    var scheduledCleanup = /* @__PURE__ */ new WeakSet();
    function schedule(cache) {
      if (cache.size <= (cache.max || -1)) {
        return;
      }
      if (!scheduledCleanup.has(cache)) {
        scheduledCleanup.add(cache);
        setTimeout(function() {
          cache.clean();
          scheduledCleanup.delete(cache);
        }, 100);
      }
    }
    var AutoCleanedWeakCache = function(max, dispose) {
      var cache = new caches2.WeakCache(max, dispose);
      cache.set = function(key, value) {
        var ret = caches2.WeakCache.prototype.set.call(this, key, value);
        schedule(this);
        return ret;
      };
      return cache;
    };
    var AutoCleanedStrongCache = function(max, dispose) {
      var cache = new caches2.StrongCache(max, dispose);
      cache.set = function(key, value) {
        var ret = caches2.StrongCache.prototype.set.call(this, key, value);
        schedule(this);
        return ret;
      };
      return cache;
    };
    var cacheSizeSymbol = Symbol.for("apollo.cacheSize");
    var cacheSizes = tslib.__assign({}, globals.global[cacheSizeSymbol]);
    var globalCaches = {};
    function registerGlobalCache(name, getSize) {
      globalCaches[name] = getSize;
    }
    var canonicalStringify = Object.assign(function canonicalStringify2(value) {
      return JSON.stringify(value, stableObjectReplacer);
    }, {
      reset: function() {
        sortingMap = new AutoCleanedStrongCache(cacheSizes.canonicalStringify || 1e3);
      }
    });
    if (globalThis.__DEV__ !== false) {
      registerGlobalCache("canonicalStringify", function() {
        return sortingMap.size;
      });
    }
    var sortingMap;
    canonicalStringify.reset();
    function stableObjectReplacer(key, value) {
      if (value && typeof value === "object") {
        var proto = Object.getPrototypeOf(value);
        if (proto === Object.prototype || proto === null) {
          var keys = Object.keys(value);
          if (keys.every(everyKeyInOrder))
            return value;
          var unsortedKey = JSON.stringify(keys);
          var sortedKeys = sortingMap.get(unsortedKey);
          if (!sortedKeys) {
            keys.sort();
            var sortedKey = JSON.stringify(keys);
            sortedKeys = sortingMap.get(sortedKey) || keys;
            sortingMap.set(unsortedKey, sortedKeys);
            sortingMap.set(sortedKey, sortedKeys);
          }
          var sortedObject_1 = Object.create(proto);
          sortedKeys.forEach(function(key2) {
            sortedObject_1[key2] = value[key2];
          });
          return sortedObject_1;
        }
      }
      return value;
    }
    function everyKeyInOrder(key, i, keys) {
      return i === 0 || keys[i - 1] <= key;
    }
    function makeReference(id) {
      return { __ref: String(id) };
    }
    function isReference(obj) {
      return Boolean(obj && typeof obj === "object" && typeof obj.__ref === "string");
    }
    function isDocumentNode(value) {
      return isNonNullObject(value) && value.kind === "Document" && Array.isArray(value.definitions);
    }
    function isStringValue(value) {
      return value.kind === "StringValue";
    }
    function isBooleanValue(value) {
      return value.kind === "BooleanValue";
    }
    function isIntValue(value) {
      return value.kind === "IntValue";
    }
    function isFloatValue(value) {
      return value.kind === "FloatValue";
    }
    function isVariable(value) {
      return value.kind === "Variable";
    }
    function isObjectValue(value) {
      return value.kind === "ObjectValue";
    }
    function isListValue(value) {
      return value.kind === "ListValue";
    }
    function isEnumValue(value) {
      return value.kind === "EnumValue";
    }
    function isNullValue(value) {
      return value.kind === "NullValue";
    }
    function valueToObjectRepresentation(argObj, name, value, variables) {
      if (isIntValue(value) || isFloatValue(value)) {
        argObj[name.value] = Number(value.value);
      } else if (isBooleanValue(value) || isStringValue(value)) {
        argObj[name.value] = value.value;
      } else if (isObjectValue(value)) {
        var nestedArgObj_1 = {};
        value.fields.map(function(obj) {
          return valueToObjectRepresentation(nestedArgObj_1, obj.name, obj.value, variables);
        });
        argObj[name.value] = nestedArgObj_1;
      } else if (isVariable(value)) {
        var variableValue = (variables || {})[value.name.value];
        argObj[name.value] = variableValue;
      } else if (isListValue(value)) {
        argObj[name.value] = value.values.map(function(listValue) {
          var nestedArgArrayObj = {};
          valueToObjectRepresentation(nestedArgArrayObj, name, listValue, variables);
          return nestedArgArrayObj[name.value];
        });
      } else if (isEnumValue(value)) {
        argObj[name.value] = value.value;
      } else if (isNullValue(value)) {
        argObj[name.value] = null;
      } else {
        throw globals.newInvariantError(124, name.value, value.kind);
      }
    }
    function storeKeyNameFromField(field, variables) {
      var directivesObj = null;
      if (field.directives) {
        directivesObj = {};
        field.directives.forEach(function(directive) {
          directivesObj[directive.name.value] = {};
          if (directive.arguments) {
            directive.arguments.forEach(function(_a2) {
              var name = _a2.name, value = _a2.value;
              return valueToObjectRepresentation(directivesObj[directive.name.value], name, value, variables);
            });
          }
        });
      }
      var argObj = null;
      if (field.arguments && field.arguments.length) {
        argObj = {};
        field.arguments.forEach(function(_a2) {
          var name = _a2.name, value = _a2.value;
          return valueToObjectRepresentation(argObj, name, value, variables);
        });
      }
      return getStoreKeyName(field.name.value, argObj, directivesObj);
    }
    var KNOWN_DIRECTIVES = [
      "connection",
      "include",
      "skip",
      "client",
      "rest",
      "export",
      "nonreactive"
    ];
    var storeKeyNameStringify = canonicalStringify;
    var getStoreKeyName = Object.assign(function(fieldName, args, directives) {
      if (args && directives && directives["connection"] && directives["connection"]["key"]) {
        if (directives["connection"]["filter"] && directives["connection"]["filter"].length > 0) {
          var filterKeys = directives["connection"]["filter"] ? directives["connection"]["filter"] : [];
          filterKeys.sort();
          var filteredArgs_1 = {};
          filterKeys.forEach(function(key) {
            filteredArgs_1[key] = args[key];
          });
          return "".concat(directives["connection"]["key"], "(").concat(storeKeyNameStringify(filteredArgs_1), ")");
        } else {
          return directives["connection"]["key"];
        }
      }
      var completeFieldName = fieldName;
      if (args) {
        var stringifiedArgs = storeKeyNameStringify(args);
        completeFieldName += "(".concat(stringifiedArgs, ")");
      }
      if (directives) {
        Object.keys(directives).forEach(function(key) {
          if (KNOWN_DIRECTIVES.indexOf(key) !== -1)
            return;
          if (directives[key] && Object.keys(directives[key]).length) {
            completeFieldName += "@".concat(key, "(").concat(storeKeyNameStringify(directives[key]), ")");
          } else {
            completeFieldName += "@".concat(key);
          }
        });
      }
      return completeFieldName;
    }, {
      setStringify: function(s) {
        var previous = storeKeyNameStringify;
        storeKeyNameStringify = s;
        return previous;
      }
    });
    function argumentsObjectFromField(field, variables) {
      if (field.arguments && field.arguments.length) {
        var argObj_1 = {};
        field.arguments.forEach(function(_a2) {
          var name = _a2.name, value = _a2.value;
          return valueToObjectRepresentation(argObj_1, name, value, variables);
        });
        return argObj_1;
      }
      return null;
    }
    function resultKeyNameFromField(field) {
      return field.alias ? field.alias.value : field.name.value;
    }
    function getTypenameFromResult(result2, selectionSet, fragmentMap) {
      var fragments;
      for (var _i = 0, _a2 = selectionSet.selections; _i < _a2.length; _i++) {
        var selection = _a2[_i];
        if (isField(selection)) {
          if (selection.name.value === "__typename") {
            return result2[resultKeyNameFromField(selection)];
          }
        } else if (fragments) {
          fragments.push(selection);
        } else {
          fragments = [selection];
        }
      }
      if (typeof result2.__typename === "string") {
        return result2.__typename;
      }
      if (fragments) {
        for (var _b = 0, fragments_1 = fragments; _b < fragments_1.length; _b++) {
          var selection = fragments_1[_b];
          var typename = getTypenameFromResult(result2, getFragmentFromSelection(selection, fragmentMap).selectionSet, fragmentMap);
          if (typeof typename === "string") {
            return typename;
          }
        }
      }
    }
    function isField(selection) {
      return selection.kind === "Field";
    }
    function isInlineFragment(selection) {
      return selection.kind === "InlineFragment";
    }
    function checkDocument(doc) {
      globals.invariant(doc && doc.kind === "Document", 116);
      var operations = doc.definitions.filter(function(d) {
        return d.kind !== "FragmentDefinition";
      }).map(function(definition) {
        if (definition.kind !== "OperationDefinition") {
          throw globals.newInvariantError(117, definition.kind);
        }
        return definition;
      });
      globals.invariant(operations.length <= 1, 118, operations.length);
      return doc;
    }
    function getOperationDefinition(doc) {
      checkDocument(doc);
      return doc.definitions.filter(function(definition) {
        return definition.kind === "OperationDefinition";
      })[0];
    }
    function getOperationName(doc) {
      return doc.definitions.filter(function(definition) {
        return definition.kind === "OperationDefinition" && !!definition.name;
      }).map(function(x) {
        return x.name.value;
      })[0] || null;
    }
    function getFragmentDefinitions(doc) {
      return doc.definitions.filter(function(definition) {
        return definition.kind === "FragmentDefinition";
      });
    }
    function getQueryDefinition(doc) {
      var queryDef = getOperationDefinition(doc);
      globals.invariant(queryDef && queryDef.operation === "query", 119);
      return queryDef;
    }
    function getFragmentDefinition(doc) {
      globals.invariant(doc.kind === "Document", 120);
      globals.invariant(doc.definitions.length <= 1, 121);
      var fragmentDef = doc.definitions[0];
      globals.invariant(fragmentDef.kind === "FragmentDefinition", 122);
      return fragmentDef;
    }
    function getMainDefinition2(queryDoc) {
      checkDocument(queryDoc);
      var fragmentDefinition;
      for (var _i = 0, _a2 = queryDoc.definitions; _i < _a2.length; _i++) {
        var definition = _a2[_i];
        if (definition.kind === "OperationDefinition") {
          var operation = definition.operation;
          if (operation === "query" || operation === "mutation" || operation === "subscription") {
            return definition;
          }
        }
        if (definition.kind === "FragmentDefinition" && !fragmentDefinition) {
          fragmentDefinition = definition;
        }
      }
      if (fragmentDefinition) {
        return fragmentDefinition;
      }
      throw globals.newInvariantError(123);
    }
    function getDefaultValues(definition) {
      var defaultValues = /* @__PURE__ */ Object.create(null);
      var defs = definition && definition.variableDefinitions;
      if (defs && defs.length) {
        defs.forEach(function(def) {
          if (def.defaultValue) {
            valueToObjectRepresentation(defaultValues, def.variable.name, def.defaultValue);
          }
        });
      }
      return defaultValues;
    }
    function identity(document) {
      return document;
    }
    var DocumentTransform = (function() {
      function DocumentTransform2(transform, options) {
        if (options === void 0) {
          options = /* @__PURE__ */ Object.create(null);
        }
        this.resultCache = canUseWeakSet ? /* @__PURE__ */ new WeakSet() : /* @__PURE__ */ new Set();
        this.transform = transform;
        if (options.getCacheKey) {
          this.getCacheKey = options.getCacheKey;
        }
        this.cached = options.cache !== false;
        this.resetCache();
      }
      DocumentTransform2.prototype.getCacheKey = function(document) {
        return [document];
      };
      DocumentTransform2.identity = function() {
        return new DocumentTransform2(identity, { cache: false });
      };
      DocumentTransform2.split = function(predicate, left, right) {
        if (right === void 0) {
          right = DocumentTransform2.identity();
        }
        return Object.assign(new DocumentTransform2(
          function(document) {
            var documentTransform = predicate(document) ? left : right;
            return documentTransform.transformDocument(document);
          },
          { cache: false }
        ), { left, right });
      };
      DocumentTransform2.prototype.resetCache = function() {
        var _this = this;
        if (this.cached) {
          var stableCacheKeys_1 = new trie.Trie(canUseWeakMap);
          this.performWork = optimism.wrap(DocumentTransform2.prototype.performWork.bind(this), {
            makeCacheKey: function(document) {
              var cacheKeys = _this.getCacheKey(document);
              if (cacheKeys) {
                globals.invariant(Array.isArray(cacheKeys), 105);
                return stableCacheKeys_1.lookupArray(cacheKeys);
              }
            },
            max: cacheSizes["documentTransform.cache"],
            cache: caches2.WeakCache
          });
        }
      };
      DocumentTransform2.prototype.performWork = function(document) {
        checkDocument(document);
        return this.transform(document);
      };
      DocumentTransform2.prototype.transformDocument = function(document) {
        if (this.resultCache.has(document)) {
          return document;
        }
        var transformedDocument = this.performWork(document);
        this.resultCache.add(transformedDocument);
        return transformedDocument;
      };
      DocumentTransform2.prototype.concat = function(otherTransform) {
        var _this = this;
        return Object.assign(new DocumentTransform2(
          function(document) {
            return otherTransform.transformDocument(_this.transformDocument(document));
          },
          { cache: false }
        ), {
          left: this,
          right: otherTransform
        });
      };
      return DocumentTransform2;
    })();
    var printCache;
    var print2 = Object.assign(function(ast) {
      var result2 = printCache.get(ast);
      if (!result2) {
        result2 = graphql2.print(ast);
        printCache.set(ast, result2);
      }
      return result2;
    }, {
      reset: function() {
        printCache = new AutoCleanedWeakCache(cacheSizes.print || 2e3);
      }
    });
    print2.reset();
    if (globalThis.__DEV__ !== false) {
      registerGlobalCache("print", function() {
        return printCache ? printCache.size : 0;
      });
    }
    var isArray = Array.isArray;
    function isNonEmptyArray(value) {
      return Array.isArray(value) && value.length > 0;
    }
    var TYPENAME_FIELD = {
      kind: graphql2.Kind.FIELD,
      name: {
        kind: graphql2.Kind.NAME,
        value: "__typename"
      }
    };
    function isEmpty(op, fragmentMap) {
      return !op || op.selectionSet.selections.every(function(selection) {
        return selection.kind === graphql2.Kind.FRAGMENT_SPREAD && isEmpty(fragmentMap[selection.name.value], fragmentMap);
      });
    }
    function nullIfDocIsEmpty(doc) {
      return isEmpty(getOperationDefinition(doc) || getFragmentDefinition(doc), createFragmentMap(getFragmentDefinitions(doc))) ? null : doc;
    }
    function getDirectiveMatcher(configs) {
      var names = /* @__PURE__ */ new Map();
      var tests = /* @__PURE__ */ new Map();
      configs.forEach(function(directive) {
        if (directive) {
          if (directive.name) {
            names.set(directive.name, directive);
          } else if (directive.test) {
            tests.set(directive.test, directive);
          }
        }
      });
      return function(directive) {
        var config = names.get(directive.name.value);
        if (!config && tests.size) {
          tests.forEach(function(testConfig, test) {
            if (test(directive)) {
              config = testConfig;
            }
          });
        }
        return config;
      };
    }
    function makeInUseGetterFunction(defaultKey) {
      var map2 = /* @__PURE__ */ new Map();
      return function inUseGetterFunction(key) {
        if (key === void 0) {
          key = defaultKey;
        }
        var inUse = map2.get(key);
        if (!inUse) {
          map2.set(key, inUse = {
            variables: /* @__PURE__ */ new Set(),
            fragmentSpreads: /* @__PURE__ */ new Set()
          });
        }
        return inUse;
      };
    }
    function removeDirectivesFromDocument(directives, doc) {
      checkDocument(doc);
      var getInUseByOperationName = makeInUseGetterFunction("");
      var getInUseByFragmentName = makeInUseGetterFunction("");
      var getInUse = function(ancestors) {
        for (var p = 0, ancestor = void 0; p < ancestors.length && (ancestor = ancestors[p]); ++p) {
          if (isArray(ancestor))
            continue;
          if (ancestor.kind === graphql2.Kind.OPERATION_DEFINITION) {
            return getInUseByOperationName(ancestor.name && ancestor.name.value);
          }
          if (ancestor.kind === graphql2.Kind.FRAGMENT_DEFINITION) {
            return getInUseByFragmentName(ancestor.name.value);
          }
        }
        globalThis.__DEV__ !== false && globals.invariant.error(125);
        return null;
      };
      var operationCount = 0;
      for (var i = doc.definitions.length - 1; i >= 0; --i) {
        if (doc.definitions[i].kind === graphql2.Kind.OPERATION_DEFINITION) {
          ++operationCount;
        }
      }
      var directiveMatcher = getDirectiveMatcher(directives);
      var shouldRemoveField = function(nodeDirectives) {
        return isNonEmptyArray(nodeDirectives) && nodeDirectives.map(directiveMatcher).some(function(config) {
          return config && config.remove;
        });
      };
      var originalFragmentDefsByPath = /* @__PURE__ */ new Map();
      var firstVisitMadeChanges = false;
      var fieldOrInlineFragmentVisitor = {
        enter: function(node) {
          if (shouldRemoveField(node.directives)) {
            firstVisitMadeChanges = true;
            return null;
          }
        }
      };
      var docWithoutDirectiveSubtrees = graphql2.visit(doc, {
        Field: fieldOrInlineFragmentVisitor,
        InlineFragment: fieldOrInlineFragmentVisitor,
        VariableDefinition: {
          enter: function() {
            return false;
          }
        },
        Variable: {
          enter: function(node, _key, _parent, _path, ancestors) {
            var inUse = getInUse(ancestors);
            if (inUse) {
              inUse.variables.add(node.name.value);
            }
          }
        },
        FragmentSpread: {
          enter: function(node, _key, _parent, _path, ancestors) {
            if (shouldRemoveField(node.directives)) {
              firstVisitMadeChanges = true;
              return null;
            }
            var inUse = getInUse(ancestors);
            if (inUse) {
              inUse.fragmentSpreads.add(node.name.value);
            }
          }
        },
        FragmentDefinition: {
          enter: function(node, _key, _parent, path) {
            originalFragmentDefsByPath.set(JSON.stringify(path), node);
          },
          leave: function(node, _key, _parent, path) {
            var originalNode = originalFragmentDefsByPath.get(JSON.stringify(path));
            if (node === originalNode) {
              return node;
            }
            if (operationCount > 0 && node.selectionSet.selections.every(function(selection) {
              return selection.kind === graphql2.Kind.FIELD && selection.name.value === "__typename";
            })) {
              getInUseByFragmentName(node.name.value).removed = true;
              firstVisitMadeChanges = true;
              return null;
            }
          }
        },
        Directive: {
          leave: function(node) {
            if (directiveMatcher(node)) {
              firstVisitMadeChanges = true;
              return null;
            }
          }
        }
      });
      if (!firstVisitMadeChanges) {
        return doc;
      }
      var populateTransitiveVars = function(inUse) {
        if (!inUse.transitiveVars) {
          inUse.transitiveVars = new Set(inUse.variables);
          if (!inUse.removed) {
            inUse.fragmentSpreads.forEach(function(childFragmentName) {
              populateTransitiveVars(getInUseByFragmentName(childFragmentName)).transitiveVars.forEach(function(varName) {
                inUse.transitiveVars.add(varName);
              });
            });
          }
        }
        return inUse;
      };
      var allFragmentNamesUsed = /* @__PURE__ */ new Set();
      docWithoutDirectiveSubtrees.definitions.forEach(function(def) {
        if (def.kind === graphql2.Kind.OPERATION_DEFINITION) {
          populateTransitiveVars(getInUseByOperationName(def.name && def.name.value)).fragmentSpreads.forEach(function(childFragmentName) {
            allFragmentNamesUsed.add(childFragmentName);
          });
        } else if (def.kind === graphql2.Kind.FRAGMENT_DEFINITION && operationCount === 0 && !getInUseByFragmentName(def.name.value).removed) {
          allFragmentNamesUsed.add(def.name.value);
        }
      });
      allFragmentNamesUsed.forEach(function(fragmentName) {
        populateTransitiveVars(getInUseByFragmentName(fragmentName)).fragmentSpreads.forEach(function(childFragmentName) {
          allFragmentNamesUsed.add(childFragmentName);
        });
      });
      var fragmentWillBeRemoved = function(fragmentName) {
        return !!(!allFragmentNamesUsed.has(fragmentName) || getInUseByFragmentName(fragmentName).removed);
      };
      var enterVisitor = {
        enter: function(node) {
          if (fragmentWillBeRemoved(node.name.value)) {
            return null;
          }
        }
      };
      return nullIfDocIsEmpty(graphql2.visit(docWithoutDirectiveSubtrees, {
        FragmentSpread: enterVisitor,
        FragmentDefinition: enterVisitor,
        OperationDefinition: {
          leave: function(node) {
            if (node.variableDefinitions) {
              var usedVariableNames_1 = populateTransitiveVars(
                getInUseByOperationName(node.name && node.name.value)
              ).transitiveVars;
              if (usedVariableNames_1.size < node.variableDefinitions.length) {
                return tslib.__assign(tslib.__assign({}, node), { variableDefinitions: node.variableDefinitions.filter(function(varDef) {
                  return usedVariableNames_1.has(varDef.variable.name.value);
                }) });
              }
            }
          }
        }
      }));
    }
    var addTypenameToDocument = Object.assign(function(doc) {
      return graphql2.visit(doc, {
        SelectionSet: {
          enter: function(node, _key, parent) {
            if (parent && parent.kind === graphql2.Kind.OPERATION_DEFINITION) {
              return;
            }
            var selections = node.selections;
            if (!selections) {
              return;
            }
            var skip2 = selections.some(function(selection) {
              return isField(selection) && (selection.name.value === "__typename" || selection.name.value.lastIndexOf("__", 0) === 0);
            });
            if (skip2) {
              return;
            }
            var field = parent;
            if (isField(field) && field.directives && field.directives.some(function(d) {
              return d.name.value === "export";
            })) {
              return;
            }
            return tslib.__assign(tslib.__assign({}, node), { selections: tslib.__spreadArray(tslib.__spreadArray([], selections, true), [TYPENAME_FIELD], false) });
          }
        }
      });
    }, {
      added: function(field) {
        return field === TYPENAME_FIELD;
      }
    });
    var connectionRemoveConfig = {
      test: function(directive) {
        var willRemove = directive.name.value === "connection";
        if (willRemove) {
          if (!directive.arguments || !directive.arguments.some(function(arg) {
            return arg.name.value === "key";
          })) {
            globalThis.__DEV__ !== false && globals.invariant.warn(126);
          }
        }
        return willRemove;
      }
    };
    function removeConnectionDirectiveFromDocument(doc) {
      return removeDirectivesFromDocument([connectionRemoveConfig], checkDocument(doc));
    }
    function getArgumentMatcher(config) {
      return function argumentMatcher(argument) {
        return config.some(function(aConfig) {
          return argument.value && argument.value.kind === graphql2.Kind.VARIABLE && argument.value.name && (aConfig.name === argument.value.name.value || aConfig.test && aConfig.test(argument));
        });
      };
    }
    function removeArgumentsFromDocument(config, doc) {
      var argMatcher = getArgumentMatcher(config);
      return nullIfDocIsEmpty(graphql2.visit(doc, {
        OperationDefinition: {
          enter: function(node) {
            return tslib.__assign(tslib.__assign({}, node), {
              variableDefinitions: node.variableDefinitions ? node.variableDefinitions.filter(function(varDef) {
                return !config.some(function(arg) {
                  return arg.name === varDef.variable.name.value;
                });
              }) : []
            });
          }
        },
        Field: {
          enter: function(node) {
            var shouldRemoveField = config.some(function(argConfig) {
              return argConfig.remove;
            });
            if (shouldRemoveField) {
              var argMatchCount_1 = 0;
              if (node.arguments) {
                node.arguments.forEach(function(arg) {
                  if (argMatcher(arg)) {
                    argMatchCount_1 += 1;
                  }
                });
              }
              if (argMatchCount_1 === 1) {
                return null;
              }
            }
          }
        },
        Argument: {
          enter: function(node) {
            if (argMatcher(node)) {
              return null;
            }
          }
        }
      }));
    }
    function removeFragmentSpreadFromDocument(config, doc) {
      function enter(node) {
        if (config.some(function(def) {
          return def.name === node.name.value;
        })) {
          return null;
        }
      }
      return nullIfDocIsEmpty(graphql2.visit(doc, {
        FragmentSpread: { enter },
        FragmentDefinition: { enter }
      }));
    }
    function buildQueryFromSelectionSet(document) {
      var definition = getMainDefinition2(document);
      var definitionOperation = definition.operation;
      if (definitionOperation === "query") {
        return document;
      }
      var modifiedDoc = graphql2.visit(document, {
        OperationDefinition: {
          enter: function(node) {
            return tslib.__assign(tslib.__assign({}, node), { operation: "query" });
          }
        }
      });
      return modifiedDoc;
    }
    function removeClientSetsFromDocument(document) {
      checkDocument(document);
      var modifiedDoc = removeDirectivesFromDocument([
        {
          test: function(directive) {
            return directive.name.value === "client";
          },
          remove: true
        }
      ], document);
      return modifiedDoc;
    }
    function addNonReactiveToNamedFragments(document) {
      checkDocument(document);
      return graphql2.visit(document, {
        FragmentSpread: function(node) {
          var _a2;
          if ((_a2 = node.directives) === null || _a2 === void 0 ? void 0 : _a2.some(function(directive) {
            return directive.name.value === "unmask";
          })) {
            return;
          }
          return tslib.__assign(tslib.__assign({}, node), { directives: tslib.__spreadArray(tslib.__spreadArray([], node.directives || [], true), [
            {
              kind: graphql2.Kind.DIRECTIVE,
              name: { kind: graphql2.Kind.NAME, value: "nonreactive" }
            }
          ], false) });
        }
      });
    }
    function isOperation(document, operation) {
      var _a2;
      return ((_a2 = getOperationDefinition(document)) === null || _a2 === void 0 ? void 0 : _a2.operation) === operation;
    }
    function isMutationOperation(document) {
      return isOperation(document, "mutation");
    }
    function isQueryOperation(document) {
      return isOperation(document, "query");
    }
    function isSubscriptionOperation(document) {
      return isOperation(document, "subscription");
    }
    var hasOwnProperty5 = Object.prototype.hasOwnProperty;
    function mergeDeep() {
      var sources = [];
      for (var _i = 0; _i < arguments.length; _i++) {
        sources[_i] = arguments[_i];
      }
      return mergeDeepArray(sources);
    }
    function mergeDeepArray(sources) {
      var target = sources[0] || {};
      var count = sources.length;
      if (count > 1) {
        var merger = new DeepMerger();
        for (var i = 1; i < count; ++i) {
          target = merger.merge(target, sources[i]);
        }
      }
      return target;
    }
    var defaultReconciler = function(target, source, property) {
      return this.merge(target[property], source[property]);
    };
    var DeepMerger = (function() {
      function DeepMerger2(reconciler) {
        if (reconciler === void 0) {
          reconciler = defaultReconciler;
        }
        this.reconciler = reconciler;
        this.isObject = isNonNullObject;
        this.pastCopies = /* @__PURE__ */ new Set();
      }
      DeepMerger2.prototype.merge = function(target, source) {
        var _this = this;
        var context = [];
        for (var _i = 2; _i < arguments.length; _i++) {
          context[_i - 2] = arguments[_i];
        }
        if (isNonNullObject(source) && isNonNullObject(target)) {
          Object.keys(source).forEach(function(sourceKey) {
            if (hasOwnProperty5.call(target, sourceKey)) {
              var targetValue = target[sourceKey];
              if (source[sourceKey] !== targetValue) {
                var result2 = _this.reconciler.apply(_this, tslib.__spreadArray([
                  target,
                  source,
                  sourceKey
                ], context, false));
                if (result2 !== targetValue) {
                  target = _this.shallowCopyForMerge(target);
                  target[sourceKey] = result2;
                }
              }
            } else {
              target = _this.shallowCopyForMerge(target);
              target[sourceKey] = source[sourceKey];
            }
          });
          return target;
        }
        return source;
      };
      DeepMerger2.prototype.shallowCopyForMerge = function(value) {
        if (isNonNullObject(value)) {
          if (!this.pastCopies.has(value)) {
            if (Array.isArray(value)) {
              value = value.slice(0);
            } else {
              value = tslib.__assign({ __proto__: Object.getPrototypeOf(value) }, value);
            }
            this.pastCopies.add(value);
          }
        }
        return value;
      };
      return DeepMerger2;
    })();
    function concatPagination(keyArgs) {
      if (keyArgs === void 0) {
        keyArgs = false;
      }
      return {
        keyArgs,
        merge: function(existing, incoming) {
          return existing ? tslib.__spreadArray(tslib.__spreadArray([], existing, true), incoming, true) : incoming;
        }
      };
    }
    function offsetLimitPagination(keyArgs) {
      if (keyArgs === void 0) {
        keyArgs = false;
      }
      return {
        keyArgs,
        merge: function(existing, incoming, _a2) {
          var args = _a2.args;
          var merged = existing ? existing.slice(0) : [];
          if (incoming) {
            if (args) {
              var _b = args.offset, offset = _b === void 0 ? 0 : _b;
              for (var i = 0; i < incoming.length; ++i) {
                merged[offset + i] = incoming[i];
              }
            } else {
              merged.push.apply(merged, incoming);
            }
          }
          return merged;
        }
      };
    }
    function relayStylePagination(keyArgs) {
      if (keyArgs === void 0) {
        keyArgs = false;
      }
      return {
        keyArgs,
        read: function(existing, _a2) {
          var canRead = _a2.canRead, readField = _a2.readField;
          if (!existing)
            return existing;
          var edges = [];
          var firstEdgeCursor = "";
          var lastEdgeCursor = "";
          existing.edges.forEach(function(edge) {
            if (canRead(readField("node", edge))) {
              edges.push(edge);
              if (edge.cursor) {
                firstEdgeCursor = firstEdgeCursor || edge.cursor || "";
                lastEdgeCursor = edge.cursor || lastEdgeCursor;
              }
            }
          });
          if (edges.length > 1 && firstEdgeCursor === lastEdgeCursor) {
            firstEdgeCursor = "";
          }
          var _b = existing.pageInfo || {}, startCursor = _b.startCursor, endCursor = _b.endCursor;
          return tslib.__assign(tslib.__assign({}, getExtras(existing)), { edges, pageInfo: tslib.__assign(tslib.__assign({}, existing.pageInfo), {
            startCursor: startCursor || firstEdgeCursor,
            endCursor: endCursor || lastEdgeCursor
          }) });
        },
        merge: function(existing, incoming, _a2) {
          var args = _a2.args, isReference2 = _a2.isReference, readField = _a2.readField;
          if (!existing) {
            existing = makeEmptyData();
          }
          if (!incoming) {
            return existing;
          }
          var incomingEdges = incoming.edges ? incoming.edges.map(function(edge) {
            if (isReference2(edge = tslib.__assign({}, edge))) {
              edge.cursor = readField("cursor", edge);
            }
            return edge;
          }) : [];
          if (incoming.pageInfo) {
            var pageInfo_1 = incoming.pageInfo;
            var startCursor = pageInfo_1.startCursor, endCursor = pageInfo_1.endCursor;
            var firstEdge = incomingEdges[0];
            var lastEdge = incomingEdges[incomingEdges.length - 1];
            if (firstEdge && startCursor) {
              firstEdge.cursor = startCursor;
            }
            if (lastEdge && endCursor) {
              lastEdge.cursor = endCursor;
            }
            var firstCursor = firstEdge && firstEdge.cursor;
            if (firstCursor && !startCursor) {
              incoming = mergeDeep(incoming, {
                pageInfo: {
                  startCursor: firstCursor
                }
              });
            }
            var lastCursor = lastEdge && lastEdge.cursor;
            if (lastCursor && !endCursor) {
              incoming = mergeDeep(incoming, {
                pageInfo: {
                  endCursor: lastCursor
                }
              });
            }
          }
          var prefix = existing.edges;
          var suffix = [];
          if (args && args.after) {
            var index = prefix.findIndex(function(edge) {
              return edge.cursor === args.after;
            });
            if (index >= 0) {
              prefix = prefix.slice(0, index + 1);
            }
          } else if (args && args.before) {
            var index = prefix.findIndex(function(edge) {
              return edge.cursor === args.before;
            });
            suffix = index < 0 ? prefix : prefix.slice(index);
            prefix = [];
          } else if (incoming.edges) {
            prefix = [];
          }
          var edges = tslib.__spreadArray(tslib.__spreadArray(tslib.__spreadArray([], prefix, true), incomingEdges, true), suffix, true);
          var pageInfo = tslib.__assign(tslib.__assign({}, incoming.pageInfo), existing.pageInfo);
          if (incoming.pageInfo) {
            var _b = incoming.pageInfo, hasPreviousPage = _b.hasPreviousPage, hasNextPage = _b.hasNextPage, startCursor = _b.startCursor, endCursor = _b.endCursor, extras2 = tslib.__rest(_b, ["hasPreviousPage", "hasNextPage", "startCursor", "endCursor"]);
            Object.assign(pageInfo, extras2);
            if (!prefix.length) {
              if (void 0 !== hasPreviousPage)
                pageInfo.hasPreviousPage = hasPreviousPage;
              if (void 0 !== startCursor)
                pageInfo.startCursor = startCursor;
            }
            if (!suffix.length) {
              if (void 0 !== hasNextPage)
                pageInfo.hasNextPage = hasNextPage;
              if (void 0 !== endCursor)
                pageInfo.endCursor = endCursor;
            }
          }
          return tslib.__assign(tslib.__assign(tslib.__assign({}, getExtras(existing)), getExtras(incoming)), { edges, pageInfo });
        }
      };
    }
    var getExtras = function(obj) {
      return tslib.__rest(obj, notExtras);
    };
    var notExtras = ["edges", "pageInfo"];
    function makeEmptyData() {
      return {
        edges: [],
        pageInfo: {
          hasPreviousPage: false,
          hasNextPage: true,
          startCursor: "",
          endCursor: ""
        }
      };
    }
    function createFulfilledPromise(value) {
      var promise = Promise.resolve(value);
      promise.status = "fulfilled";
      promise.value = value;
      return promise;
    }
    function createRejectedPromise(reason) {
      var promise = Promise.reject(reason);
      promise.catch(function() {
      });
      promise.status = "rejected";
      promise.reason = reason;
      return promise;
    }
    function isStatefulPromise(promise) {
      return "status" in promise;
    }
    function wrapPromiseWithState(promise) {
      if (isStatefulPromise(promise)) {
        return promise;
      }
      var pendingPromise = promise;
      pendingPromise.status = "pending";
      pendingPromise.then(function(value) {
        if (pendingPromise.status === "pending") {
          var fulfilledPromise = pendingPromise;
          fulfilledPromise.status = "fulfilled";
          fulfilledPromise.value = value;
        }
      }, function(reason) {
        if (pendingPromise.status === "pending") {
          var rejectedPromise = pendingPromise;
          rejectedPromise.status = "rejected";
          rejectedPromise.reason = reason;
        }
      });
      return promise;
    }
    function preventUnhandledRejection(promise) {
      promise.catch(function() {
      });
      return promise;
    }
    var toString2 = Object.prototype.toString;
    function cloneDeep(value) {
      return cloneDeepHelper(value);
    }
    function cloneDeepHelper(val, seen) {
      switch (toString2.call(val)) {
        case "[object Array]": {
          seen = seen || /* @__PURE__ */ new Map();
          if (seen.has(val))
            return seen.get(val);
          var copy_1 = val.slice(0);
          seen.set(val, copy_1);
          copy_1.forEach(function(child, i) {
            copy_1[i] = cloneDeepHelper(child, seen);
          });
          return copy_1;
        }
        case "[object Object]": {
          seen = seen || /* @__PURE__ */ new Map();
          if (seen.has(val))
            return seen.get(val);
          var copy_2 = Object.create(Object.getPrototypeOf(val));
          seen.set(val, copy_2);
          Object.keys(val).forEach(function(key) {
            copy_2[key] = cloneDeepHelper(val[key], seen);
          });
          return copy_2;
        }
        default:
          return val;
      }
    }
    function deepFreeze(value) {
      var workSet = /* @__PURE__ */ new Set([value]);
      workSet.forEach(function(obj) {
        if (isNonNullObject(obj) && shallowFreeze(obj) === obj) {
          Object.getOwnPropertyNames(obj).forEach(function(name) {
            if (isNonNullObject(obj[name]))
              workSet.add(obj[name]);
          });
        }
      });
      return value;
    }
    function shallowFreeze(obj) {
      if (globalThis.__DEV__ !== false && !Object.isFrozen(obj)) {
        try {
          Object.freeze(obj);
        } catch (e) {
          if (e instanceof TypeError)
            return null;
          throw e;
        }
      }
      return obj;
    }
    function maybeDeepFreeze(obj) {
      if (globalThis.__DEV__ !== false) {
        deepFreeze(obj);
      }
      return obj;
    }
    function iterateObserversSafely(observers, method, argument) {
      var observersWithMethod = [];
      observers.forEach(function(obs) {
        return obs[method] && observersWithMethod.push(obs);
      });
      observersWithMethod.forEach(function(obs) {
        return obs[method](argument);
      });
    }
    function asyncMap(observable, mapFn, catchFn) {
      return new zenObservableTs.Observable(function(observer) {
        var promiseQueue = {
          then: function(callback) {
            return new Promise(function(resolve) {
              return resolve(callback());
            });
          }
        };
        function makeCallback(examiner, key) {
          return function(arg) {
            if (examiner) {
              var both = function() {
                return observer.closed ? 0 : examiner(arg);
              };
              promiseQueue = promiseQueue.then(both, both).then(function(result2) {
                return observer.next(result2);
              }, function(error) {
                return observer.error(error);
              });
            } else {
              observer[key](arg);
            }
          };
        }
        var handler = {
          next: makeCallback(mapFn, "next"),
          error: makeCallback(catchFn, "error"),
          complete: function() {
            promiseQueue.then(function() {
              return observer.complete();
            });
          }
        };
        var sub = observable.subscribe(handler);
        return function() {
          return sub.unsubscribe();
        };
      });
    }
    function fixObservableSubclass(subclass) {
      function set(key) {
        Object.defineProperty(subclass, key, { value: zenObservableTs.Observable });
      }
      if (canUseSymbol && Symbol.species) {
        set(Symbol.species);
      }
      set("@@species");
      return subclass;
    }
    function isPromiseLike2(value) {
      return value && typeof value.then === "function";
    }
    var Concast = (function(_super) {
      tslib.__extends(Concast2, _super);
      function Concast2(sources) {
        var _this = _super.call(this, function(observer) {
          _this.addObserver(observer);
          return function() {
            return _this.removeObserver(observer);
          };
        }) || this;
        _this.observers = /* @__PURE__ */ new Set();
        _this.promise = new Promise(function(resolve, reject) {
          _this.resolve = resolve;
          _this.reject = reject;
        });
        _this.handlers = {
          next: function(result2) {
            if (_this.sub !== null) {
              _this.latest = ["next", result2];
              _this.notify("next", result2);
              iterateObserversSafely(_this.observers, "next", result2);
            }
          },
          error: function(error) {
            var sub = _this.sub;
            if (sub !== null) {
              if (sub)
                setTimeout(function() {
                  return sub.unsubscribe();
                });
              _this.sub = null;
              _this.latest = ["error", error];
              _this.reject(error);
              _this.notify("error", error);
              iterateObserversSafely(_this.observers, "error", error);
            }
          },
          complete: function() {
            var _a2 = _this, sub = _a2.sub, _b = _a2.sources, sources2 = _b === void 0 ? [] : _b;
            if (sub !== null) {
              var value = sources2.shift();
              if (!value) {
                if (sub)
                  setTimeout(function() {
                    return sub.unsubscribe();
                  });
                _this.sub = null;
                if (_this.latest && _this.latest[0] === "next") {
                  _this.resolve(_this.latest[1]);
                } else {
                  _this.resolve();
                }
                _this.notify("complete");
                iterateObserversSafely(_this.observers, "complete");
              } else if (isPromiseLike2(value)) {
                value.then(function(obs) {
                  return _this.sub = obs.subscribe(_this.handlers);
                }, _this.handlers.error);
              } else {
                _this.sub = value.subscribe(_this.handlers);
              }
            }
          }
        };
        _this.nextResultListeners = /* @__PURE__ */ new Set();
        _this.cancel = function(reason) {
          _this.reject(reason);
          _this.sources = [];
          _this.handlers.error(reason);
        };
        _this.promise.catch(function(_) {
        });
        if (typeof sources === "function") {
          sources = [new zenObservableTs.Observable(sources)];
        }
        if (isPromiseLike2(sources)) {
          sources.then(function(iterable) {
            return _this.start(iterable);
          }, _this.handlers.error);
        } else {
          _this.start(sources);
        }
        return _this;
      }
      Concast2.prototype.start = function(sources) {
        if (this.sub !== void 0)
          return;
        this.sources = Array.from(sources);
        this.handlers.complete();
      };
      Concast2.prototype.deliverLastMessage = function(observer) {
        if (this.latest) {
          var nextOrError = this.latest[0];
          var method = observer[nextOrError];
          if (method) {
            method.call(observer, this.latest[1]);
          }
          if (this.sub === null && nextOrError === "next" && observer.complete) {
            observer.complete();
          }
        }
      };
      Concast2.prototype.addObserver = function(observer) {
        if (!this.observers.has(observer)) {
          this.deliverLastMessage(observer);
          this.observers.add(observer);
        }
      };
      Concast2.prototype.removeObserver = function(observer) {
        if (this.observers.delete(observer) && this.observers.size < 1) {
          this.handlers.complete();
        }
      };
      Concast2.prototype.notify = function(method, arg) {
        var nextResultListeners = this.nextResultListeners;
        if (nextResultListeners.size) {
          this.nextResultListeners = /* @__PURE__ */ new Set();
          nextResultListeners.forEach(function(listener) {
            return listener(method, arg);
          });
        }
      };
      Concast2.prototype.beforeNext = function(callback) {
        var called = false;
        this.nextResultListeners.add(function(method, arg) {
          if (!called) {
            called = true;
            callback(method, arg);
          }
        });
      };
      return Concast2;
    })(zenObservableTs.Observable);
    fixObservableSubclass(Concast);
    function isExecutionPatchIncrementalResult(value) {
      return "incremental" in value;
    }
    function isExecutionPatchInitialResult(value) {
      return "hasNext" in value && "data" in value;
    }
    function isExecutionPatchResult(value) {
      return isExecutionPatchIncrementalResult(value) || isExecutionPatchInitialResult(value);
    }
    function isApolloPayloadResult(value) {
      return isNonNullObject(value) && "payload" in value;
    }
    function mergeIncrementalData(prevResult, result2) {
      var mergedData = prevResult;
      var merger = new DeepMerger();
      if (isExecutionPatchIncrementalResult(result2) && isNonEmptyArray(result2.incremental)) {
        result2.incremental.forEach(function(_a2) {
          var data = _a2.data, path = _a2.path;
          for (var i = path.length - 1; i >= 0; --i) {
            var key = path[i];
            var isNumericKey = !isNaN(+key);
            var parent_1 = isNumericKey ? [] : {};
            parent_1[key] = data;
            data = parent_1;
          }
          mergedData = merger.merge(mergedData, data);
        });
      }
      return mergedData;
    }
    function graphQLResultHasError(result2) {
      var errors = getGraphQLErrorsFromResult(result2);
      return isNonEmptyArray(errors);
    }
    function getGraphQLErrorsFromResult(result2) {
      var graphQLErrors = isNonEmptyArray(result2.errors) ? result2.errors.slice(0) : [];
      if (isExecutionPatchIncrementalResult(result2) && isNonEmptyArray(result2.incremental)) {
        result2.incremental.forEach(function(incrementalResult) {
          if (incrementalResult.errors) {
            graphQLErrors.push.apply(graphQLErrors, incrementalResult.errors);
          }
        });
      }
      return graphQLErrors;
    }
    function compact() {
      var objects = [];
      for (var _i = 0; _i < arguments.length; _i++) {
        objects[_i] = arguments[_i];
      }
      var result2 = /* @__PURE__ */ Object.create(null);
      objects.forEach(function(obj) {
        if (!obj)
          return;
        Object.keys(obj).forEach(function(key) {
          var value = obj[key];
          if (value !== void 0) {
            result2[key] = value;
          }
        });
      });
      return result2;
    }
    var prefixCounts = /* @__PURE__ */ new Map();
    function makeUniqueId(prefix) {
      var count = prefixCounts.get(prefix) || 1;
      prefixCounts.set(prefix, count + 1);
      return "".concat(prefix, ":").concat(count, ":").concat(Math.random().toString(36).slice(2));
    }
    function stringifyForDisplay(value, space) {
      if (space === void 0) {
        space = 0;
      }
      var undefId = makeUniqueId("stringifyForDisplay");
      return JSON.stringify(value, function(key, value2) {
        return value2 === void 0 ? undefId : value2;
      }, space).split(JSON.stringify(undefId)).join("<undefined>");
    }
    function mergeOptions(defaults, options) {
      return compact(defaults, options, options.variables && {
        variables: compact(tslib.__assign(tslib.__assign({}, defaults && defaults.variables), options.variables))
      });
    }
    function omitDeep(value, key) {
      return __omitDeep(value, key);
    }
    function __omitDeep(value, key, known) {
      if (known === void 0) {
        known = /* @__PURE__ */ new Map();
      }
      if (known.has(value)) {
        return known.get(value);
      }
      var modified = false;
      if (Array.isArray(value)) {
        var array_1 = [];
        known.set(value, array_1);
        value.forEach(function(value2, index) {
          var result2 = __omitDeep(value2, key, known);
          modified || (modified = result2 !== value2);
          array_1[index] = result2;
        });
        if (modified) {
          return array_1;
        }
      } else if (isPlainObject(value)) {
        var obj_1 = Object.create(Object.getPrototypeOf(value));
        known.set(value, obj_1);
        Object.keys(value).forEach(function(k) {
          if (k === key) {
            modified = true;
            return;
          }
          var result2 = __omitDeep(value[k], key, known);
          modified || (modified = result2 !== value[k]);
          obj_1[k] = result2;
        });
        if (modified) {
          return obj_1;
        }
      }
      return value;
    }
    function stripTypename(value) {
      return omitDeep(value, "__typename");
    }
    exports.DEV = globals.DEV;
    exports.maybe = globals.maybe;
    exports.Observable = zenObservableTs.Observable;
    exports.AutoCleanedStrongCache = AutoCleanedStrongCache;
    exports.AutoCleanedWeakCache = AutoCleanedWeakCache;
    exports.Concast = Concast;
    exports.DeepMerger = DeepMerger;
    exports.DocumentTransform = DocumentTransform;
    exports.addNonReactiveToNamedFragments = addNonReactiveToNamedFragments;
    exports.addTypenameToDocument = addTypenameToDocument;
    exports.argumentsObjectFromField = argumentsObjectFromField;
    exports.asyncMap = asyncMap;
    exports.buildQueryFromSelectionSet = buildQueryFromSelectionSet;
    exports.cacheSizes = cacheSizes;
    exports.canUseAsyncIteratorSymbol = canUseAsyncIteratorSymbol;
    exports.canUseDOM = canUseDOM;
    exports.canUseLayoutEffect = canUseLayoutEffect;
    exports.canUseSymbol = canUseSymbol;
    exports.canUseWeakMap = canUseWeakMap;
    exports.canUseWeakSet = canUseWeakSet;
    exports.canonicalStringify = canonicalStringify;
    exports.checkDocument = checkDocument;
    exports.cloneDeep = cloneDeep;
    exports.compact = compact;
    exports.concatPagination = concatPagination;
    exports.createFragmentMap = createFragmentMap;
    exports.createFulfilledPromise = createFulfilledPromise;
    exports.createRejectedPromise = createRejectedPromise;
    exports.fixObservableSubclass = fixObservableSubclass;
    exports.getDefaultValues = getDefaultValues;
    exports.getDirectiveNames = getDirectiveNames;
    exports.getFragmentDefinition = getFragmentDefinition;
    exports.getFragmentDefinitions = getFragmentDefinitions;
    exports.getFragmentFromSelection = getFragmentFromSelection;
    exports.getFragmentMaskMode = getFragmentMaskMode;
    exports.getFragmentQueryDocument = getFragmentQueryDocument;
    exports.getGraphQLErrorsFromResult = getGraphQLErrorsFromResult;
    exports.getInclusionDirectives = getInclusionDirectives;
    exports.getMainDefinition = getMainDefinition2;
    exports.getOperationDefinition = getOperationDefinition;
    exports.getOperationName = getOperationName;
    exports.getQueryDefinition = getQueryDefinition;
    exports.getStoreKeyName = getStoreKeyName;
    exports.getTypenameFromResult = getTypenameFromResult;
    exports.graphQLResultHasError = graphQLResultHasError;
    exports.hasAllDirectives = hasAllDirectives;
    exports.hasAnyDirectives = hasAnyDirectives;
    exports.hasClientExports = hasClientExports;
    exports.hasDirectives = hasDirectives;
    exports.isApolloPayloadResult = isApolloPayloadResult;
    exports.isArray = isArray;
    exports.isDocumentNode = isDocumentNode;
    exports.isExecutionPatchIncrementalResult = isExecutionPatchIncrementalResult;
    exports.isExecutionPatchInitialResult = isExecutionPatchInitialResult;
    exports.isExecutionPatchResult = isExecutionPatchResult;
    exports.isField = isField;
    exports.isFullyUnmaskedOperation = isFullyUnmaskedOperation;
    exports.isInlineFragment = isInlineFragment;
    exports.isMutationOperation = isMutationOperation;
    exports.isNonEmptyArray = isNonEmptyArray;
    exports.isNonNullObject = isNonNullObject;
    exports.isPlainObject = isPlainObject;
    exports.isQueryOperation = isQueryOperation;
    exports.isReference = isReference;
    exports.isStatefulPromise = isStatefulPromise;
    exports.isSubscriptionOperation = isSubscriptionOperation;
    exports.iterateObserversSafely = iterateObserversSafely;
    exports.makeReference = makeReference;
    exports.makeUniqueId = makeUniqueId;
    exports.maybeDeepFreeze = maybeDeepFreeze;
    exports.mergeDeep = mergeDeep;
    exports.mergeDeepArray = mergeDeepArray;
    exports.mergeIncrementalData = mergeIncrementalData;
    exports.mergeOptions = mergeOptions;
    exports.offsetLimitPagination = offsetLimitPagination;
    exports.omitDeep = omitDeep;
    exports.preventUnhandledRejection = preventUnhandledRejection;
    exports.print = print2;
    exports.relayStylePagination = relayStylePagination;
    exports.removeArgumentsFromDocument = removeArgumentsFromDocument;
    exports.removeClientSetsFromDocument = removeClientSetsFromDocument;
    exports.removeConnectionDirectiveFromDocument = removeConnectionDirectiveFromDocument;
    exports.removeDirectivesFromDocument = removeDirectivesFromDocument;
    exports.removeFragmentSpreadFromDocument = removeFragmentSpreadFromDocument;
    exports.resultKeyNameFromField = resultKeyNameFromField;
    exports.shouldInclude = shouldInclude;
    exports.storeKeyNameFromField = storeKeyNameFromField;
    exports.stringifyForDisplay = stringifyForDisplay;
    exports.stripTypename = stripTypename;
    exports.valueToObjectRepresentation = valueToObjectRepresentation;
    exports.wrapPromiseWithState = wrapPromiseWithState;
  }
});

// ../node_modules/@apollo/client/link/utils/utils.cjs
var require_utils = __commonJS({
  "../node_modules/@apollo/client/link/utils/utils.cjs"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var globals = require_globals();
    var utilities = require_utilities();
    var tslib = (init_tslib_es6(), __toCommonJS(tslib_es6_exports));
    var graphql2 = (init_graphql2(), __toCommonJS(graphql_exports));
    function fromError(errorValue) {
      return new utilities.Observable(function(observer) {
        observer.error(errorValue);
      });
    }
    function toPromise(observable) {
      var completed = false;
      return new Promise(function(resolve, reject) {
        observable.subscribe({
          next: function(data) {
            if (completed) {
              globalThis.__DEV__ !== false && globals.invariant.warn(57);
            } else {
              completed = true;
              resolve(data);
            }
          },
          error: reject
        });
      });
    }
    function fromPromise(promise) {
      return new utilities.Observable(function(observer) {
        promise.then(function(value) {
          observer.next(value);
          observer.complete();
        }).catch(observer.error.bind(observer));
      });
    }
    var throwServerError = function(response, result2, message) {
      var error = new Error(message);
      error.name = "ServerError";
      error.response = response;
      error.statusCode = response.status;
      error.result = result2;
      throw error;
    };
    function validateOperation(operation) {
      var OPERATION_FIELDS = [
        "query",
        "operationName",
        "variables",
        "extensions",
        "context"
      ];
      for (var _i = 0, _a2 = Object.keys(operation); _i < _a2.length; _i++) {
        var key = _a2[_i];
        if (OPERATION_FIELDS.indexOf(key) < 0) {
          throw globals.newInvariantError(58, key);
        }
      }
      return operation;
    }
    function createOperation(starting, operation) {
      var context = tslib.__assign({}, starting);
      var setContext = function(next) {
        if (typeof next === "function") {
          context = tslib.__assign(tslib.__assign({}, context), next(context));
        } else {
          context = tslib.__assign(tslib.__assign({}, context), next);
        }
      };
      var getContext = function() {
        return tslib.__assign({}, context);
      };
      Object.defineProperty(operation, "setContext", {
        enumerable: false,
        value: setContext
      });
      Object.defineProperty(operation, "getContext", {
        enumerable: false,
        value: getContext
      });
      return operation;
    }
    function transformOperation(operation) {
      var transformedOperation = {
        variables: operation.variables || {},
        extensions: operation.extensions || {},
        operationName: operation.operationName,
        query: operation.query
      };
      if (!transformedOperation.operationName) {
        transformedOperation.operationName = typeof transformedOperation.query !== "string" ? utilities.getOperationName(transformedOperation.query) || void 0 : "";
      }
      return transformedOperation;
    }
    function filterOperationVariables(variables, query) {
      var result2 = tslib.__assign({}, variables);
      var unusedNames = new Set(Object.keys(variables));
      graphql2.visit(query, {
        Variable: function(node, _key, parent) {
          if (parent && parent.kind !== "VariableDefinition") {
            unusedNames.delete(node.name.value);
          }
        }
      });
      unusedNames.forEach(function(name) {
        delete result2[name];
      });
      return result2;
    }
    exports.createOperation = createOperation;
    exports.filterOperationVariables = filterOperationVariables;
    exports.fromError = fromError;
    exports.fromPromise = fromPromise;
    exports.throwServerError = throwServerError;
    exports.toPromise = toPromise;
    exports.transformOperation = transformOperation;
    exports.validateOperation = validateOperation;
  }
});

// ../node_modules/@apollo/client/link/core/core.cjs
var require_core = __commonJS({
  "../node_modules/@apollo/client/link/core/core.cjs"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var globals = require_globals();
    var utilities = require_utilities();
    var utils = require_utils();
    init_tslib_es6();
    var optimism = (init_lib4(), __toCommonJS(lib_exports3));
    var muteAllDeprecations = Symbol.for("apollo.deprecations");
    var global2 = globals.global;
    var slot = new optimism.Slot();
    function isMuted(name) {
      return global2[muteAllDeprecations] || (slot.getValue() || []).includes(name);
    }
    function warnDeprecated(name, cb) {
      if (!isMuted(name)) {
        cb();
      }
    }
    function passthrough(op, forward) {
      return forward ? forward(op) : utilities.Observable.of();
    }
    function toLink(handler) {
      return typeof handler === "function" ? new ApolloLink(handler) : handler;
    }
    function isTerminating(link) {
      return link.request.length <= 1;
    }
    var ApolloLink = (function() {
      function ApolloLink2(request) {
        if (request)
          this.request = request;
      }
      ApolloLink2.empty = function() {
        return new ApolloLink2(function() {
          return utilities.Observable.of();
        });
      };
      ApolloLink2.from = function(links) {
        if (links.length === 0)
          return ApolloLink2.empty();
        return links.map(toLink).reduce(function(x, y) {
          return x.concat(y);
        });
      };
      ApolloLink2.split = function(test, left, right) {
        var leftLink = toLink(left);
        var rightLink = toLink(right || new ApolloLink2(passthrough));
        var ret;
        if (isTerminating(leftLink) && isTerminating(rightLink)) {
          ret = new ApolloLink2(function(operation) {
            return test(operation) ? leftLink.request(operation) || utilities.Observable.of() : rightLink.request(operation) || utilities.Observable.of();
          });
        } else {
          ret = new ApolloLink2(function(operation, forward) {
            return test(operation) ? leftLink.request(operation, forward) || utilities.Observable.of() : rightLink.request(operation, forward) || utilities.Observable.of();
          });
        }
        return Object.assign(ret, { left: leftLink, right: rightLink });
      };
      ApolloLink2.execute = function(link, operation) {
        return link.request(utils.createOperation(operation.context, utils.transformOperation(utils.validateOperation(operation)))) || utilities.Observable.of();
      };
      ApolloLink2.concat = function(first, second) {
        var firstLink = toLink(first);
        if (isTerminating(firstLink)) {
          globalThis.__DEV__ !== false && globals.invariant.warn(47, firstLink);
          return firstLink;
        }
        var nextLink = toLink(second);
        var ret;
        if (isTerminating(nextLink)) {
          ret = new ApolloLink2(function(operation) {
            return firstLink.request(operation, function(op) {
              return nextLink.request(op) || utilities.Observable.of();
            }) || utilities.Observable.of();
          });
        } else {
          ret = new ApolloLink2(function(operation, forward) {
            return firstLink.request(operation, function(op) {
              return nextLink.request(op, forward) || utilities.Observable.of();
            }) || utilities.Observable.of();
          });
        }
        return Object.assign(ret, { left: firstLink, right: nextLink });
      };
      ApolloLink2.prototype.split = function(test, left, right) {
        return this.concat(ApolloLink2.split(test, left, right || new ApolloLink2(passthrough)));
      };
      ApolloLink2.prototype.concat = function(next) {
        return ApolloLink2.concat(this, next);
      };
      ApolloLink2.prototype.request = function(operation, forward) {
        throw globals.newInvariantError(48);
      };
      ApolloLink2.prototype.onError = function(error, observer) {
        if (globalThis.__DEV__ !== false) {
          warnDeprecated("onError", function() {
            globalThis.__DEV__ !== false && globals.invariant.warn(49);
          });
        }
        if (observer && observer.error) {
          observer.error(error);
          return false;
        }
        throw error;
      };
      ApolloLink2.prototype.setOnError = function(fn) {
        if (globalThis.__DEV__ !== false) {
          globalThis.__DEV__ !== false && globals.invariant.warn(50);
        }
        this.onError = fn;
        return this;
      };
      return ApolloLink2;
    })();
    var empty = ApolloLink.empty;
    var from3 = ApolloLink.from;
    var split2 = ApolloLink.split;
    var concat = ApolloLink.concat;
    var execute2 = ApolloLink.execute;
    exports.ApolloLink = ApolloLink;
    exports.concat = concat;
    exports.empty = empty;
    exports.execute = execute2;
    exports.from = from3;
    exports.split = split2;
  }
});

// ../node_modules/@apollo/client/errors/errors.cjs
var require_errors = __commonJS({
  "../node_modules/@apollo/client/errors/errors.cjs"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var tslib = (init_tslib_es6(), __toCommonJS(tslib_es6_exports));
    require_globals();
    var utilities = require_utilities();
    var PROTOCOL_ERRORS_SYMBOL = Symbol();
    function graphQLResultHasProtocolErrors(result2) {
      if (result2.extensions) {
        return Array.isArray(result2.extensions[PROTOCOL_ERRORS_SYMBOL]);
      }
      return false;
    }
    function isApolloError(err) {
      return err.hasOwnProperty("graphQLErrors");
    }
    var generateErrorMessage = function(err) {
      var errors = tslib.__spreadArray(tslib.__spreadArray(tslib.__spreadArray([], err.graphQLErrors, true), err.clientErrors, true), err.protocolErrors, true);
      if (err.networkError)
        errors.push(err.networkError);
      return errors.map(function(err2) {
        return utilities.isNonNullObject(err2) && err2.message || "Error message not found.";
      }).join("\n");
    };
    var ApolloError = (function(_super) {
      tslib.__extends(ApolloError2, _super);
      function ApolloError2(_a2) {
        var graphQLErrors = _a2.graphQLErrors, protocolErrors = _a2.protocolErrors, clientErrors = _a2.clientErrors, networkError = _a2.networkError, errorMessage = _a2.errorMessage, extraInfo = _a2.extraInfo;
        var _this = _super.call(this, errorMessage) || this;
        _this.name = "ApolloError";
        _this.graphQLErrors = graphQLErrors || [];
        _this.protocolErrors = protocolErrors || [];
        _this.clientErrors = clientErrors || [];
        _this.networkError = networkError || null;
        _this.message = errorMessage || generateErrorMessage(_this);
        _this.extraInfo = extraInfo;
        _this.cause = tslib.__spreadArray(tslib.__spreadArray(tslib.__spreadArray([
          networkError
        ], graphQLErrors || [], true), protocolErrors || [], true), clientErrors || [], true).find(function(e) {
          return !!e;
        }) || null;
        _this.__proto__ = ApolloError2.prototype;
        return _this;
      }
      return ApolloError2;
    })(Error);
    exports.ApolloError = ApolloError;
    exports.PROTOCOL_ERRORS_SYMBOL = PROTOCOL_ERRORS_SYMBOL;
    exports.graphQLResultHasProtocolErrors = graphQLResultHasProtocolErrors;
    exports.isApolloError = isApolloError;
  }
});

// ../node_modules/@apollo/client/link/http/http.cjs
var require_http = __commonJS({
  "../node_modules/@apollo/client/link/http/http.cjs"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var globals = require_globals();
    var tslib = (init_tslib_es6(), __toCommonJS(tslib_es6_exports));
    var utilities = require_utilities();
    var utils = require_utils();
    var errors = require_errors();
    var core = require_core();
    function asyncIterator(source) {
      var _a2;
      var iterator = source[Symbol.asyncIterator]();
      return _a2 = {
        next: function() {
          return iterator.next();
        }
      }, _a2[Symbol.asyncIterator] = function() {
        return this;
      }, _a2;
    }
    function nodeStreamIterator(stream) {
      var cleanup = null;
      var error = null;
      var done = false;
      var data = [];
      var waiting = [];
      function onData(chunk) {
        if (error)
          return;
        if (waiting.length) {
          var shiftedArr = waiting.shift();
          if (Array.isArray(shiftedArr) && shiftedArr[0]) {
            return shiftedArr[0]({ value: chunk, done: false });
          }
        }
        data.push(chunk);
      }
      function onError(err) {
        error = err;
        var all = waiting.slice();
        all.forEach(function(pair) {
          pair[1](err);
        });
        !cleanup || cleanup();
      }
      function onEnd() {
        done = true;
        var all = waiting.slice();
        all.forEach(function(pair) {
          pair[0]({ value: void 0, done: true });
        });
        !cleanup || cleanup();
      }
      cleanup = function() {
        cleanup = null;
        stream.removeListener("data", onData);
        stream.removeListener("error", onError);
        stream.removeListener("end", onEnd);
        stream.removeListener("finish", onEnd);
        stream.removeListener("close", onEnd);
      };
      stream.on("data", onData);
      stream.on("error", onError);
      stream.on("end", onEnd);
      stream.on("finish", onEnd);
      stream.on("close", onEnd);
      function getNext() {
        return new Promise(function(resolve, reject) {
          if (error)
            return reject(error);
          if (data.length)
            return resolve({ value: data.shift(), done: false });
          if (done)
            return resolve({ value: void 0, done: true });
          waiting.push([resolve, reject]);
        });
      }
      var iterator = {
        next: function() {
          return getNext();
        }
      };
      if (utilities.canUseAsyncIteratorSymbol) {
        iterator[Symbol.asyncIterator] = function() {
          return this;
        };
      }
      return iterator;
    }
    function promiseIterator(promise) {
      var resolved = false;
      var iterator = {
        next: function() {
          if (resolved)
            return Promise.resolve({
              value: void 0,
              done: true
            });
          resolved = true;
          return new Promise(function(resolve, reject) {
            promise.then(function(value) {
              resolve({ value, done: false });
            }).catch(reject);
          });
        }
      };
      if (utilities.canUseAsyncIteratorSymbol) {
        iterator[Symbol.asyncIterator] = function() {
          return this;
        };
      }
      return iterator;
    }
    function readerIterator(reader) {
      var iterator = {
        next: function() {
          return reader.read();
        }
      };
      if (utilities.canUseAsyncIteratorSymbol) {
        iterator[Symbol.asyncIterator] = function() {
          return this;
        };
      }
      return iterator;
    }
    function isNodeResponse(value) {
      return !!value.body;
    }
    function isReadableStream(value) {
      return !!value.getReader;
    }
    function isAsyncIterableIterator(value) {
      return !!(utilities.canUseAsyncIteratorSymbol && value[Symbol.asyncIterator]);
    }
    function isStreamableBlob(value) {
      return !!value.stream;
    }
    function isBlob(value) {
      return !!value.arrayBuffer;
    }
    function isNodeReadableStream(value) {
      return !!value.pipe;
    }
    function responseIterator(response) {
      var body = response;
      if (isNodeResponse(response))
        body = response.body;
      if (isAsyncIterableIterator(body))
        return asyncIterator(body);
      if (isReadableStream(body))
        return readerIterator(body.getReader());
      if (isStreamableBlob(body)) {
        return readerIterator(body.stream().getReader());
      }
      if (isBlob(body))
        return promiseIterator(body.arrayBuffer());
      if (isNodeReadableStream(body))
        return nodeStreamIterator(body);
      throw new Error("Unknown body type for responseIterator. Please pass a streamable response.");
    }
    function isNonNullObject(obj) {
      return obj !== null && typeof obj === "object";
    }
    function isApolloPayloadResult(value) {
      return isNonNullObject(value) && "payload" in value;
    }
    var hasOwnProperty5 = Object.prototype.hasOwnProperty;
    function readMultipartBody(response, nextValue) {
      return tslib.__awaiter(this, void 0, void 0, function() {
        var decoder, contentType, delimiter, boundaryVal, boundary, buffer, iterator, running, _a2, value, done, chunk, searchFrom, bi, message, i, headers, contentType_1, body, result2, next;
        var _b, _c;
        var _d;
        return tslib.__generator(this, function(_e) {
          switch (_e.label) {
            case 0:
              if (TextDecoder === void 0) {
                throw new Error("TextDecoder must be defined in the environment: please import a polyfill.");
              }
              decoder = new TextDecoder("utf-8");
              contentType = (_d = response.headers) === null || _d === void 0 ? void 0 : _d.get("content-type");
              delimiter = "boundary=";
              boundaryVal = (contentType === null || contentType === void 0 ? void 0 : contentType.includes(delimiter)) ? contentType === null || contentType === void 0 ? void 0 : contentType.substring((contentType === null || contentType === void 0 ? void 0 : contentType.indexOf(delimiter)) + delimiter.length).replace(/['"]/g, "").replace(/\;(.*)/gm, "").trim() : "-";
              boundary = "\r\n--".concat(boundaryVal);
              buffer = "";
              iterator = responseIterator(response);
              running = true;
              _e.label = 1;
            case 1:
              if (!running) return [3, 3];
              return [4, iterator.next()];
            case 2:
              _a2 = _e.sent(), value = _a2.value, done = _a2.done;
              chunk = typeof value === "string" ? value : decoder.decode(value);
              searchFrom = buffer.length - boundary.length + 1;
              running = !done;
              buffer += chunk;
              bi = buffer.indexOf(boundary, searchFrom);
              while (bi > -1) {
                message = void 0;
                _b = [
                  buffer.slice(0, bi),
                  buffer.slice(bi + boundary.length)
                ], message = _b[0], buffer = _b[1];
                i = message.indexOf("\r\n\r\n");
                headers = parseHeaders(message.slice(0, i));
                contentType_1 = headers["content-type"];
                if (contentType_1 && contentType_1.toLowerCase().indexOf("application/json") === -1) {
                  throw new Error("Unsupported patch content type: application/json is required.");
                }
                body = message.slice(i);
                if (body) {
                  result2 = parseJsonBody(response, body);
                  if (Object.keys(result2).length > 1 || "data" in result2 || "incremental" in result2 || "errors" in result2 || "payload" in result2) {
                    if (isApolloPayloadResult(result2)) {
                      next = {};
                      if ("payload" in result2) {
                        if (Object.keys(result2).length === 1 && result2.payload === null) {
                          return [2];
                        }
                        next = tslib.__assign({}, result2.payload);
                      }
                      if ("errors" in result2) {
                        next = tslib.__assign(tslib.__assign({}, next), { extensions: tslib.__assign(tslib.__assign({}, "extensions" in next ? next.extensions : null), (_c = {}, _c[errors.PROTOCOL_ERRORS_SYMBOL] = result2.errors, _c)) });
                      }
                      nextValue(next);
                    } else {
                      nextValue(result2);
                    }
                  } else if (Object.keys(result2).length === 1 && "hasNext" in result2 && !result2.hasNext) {
                    return [2];
                  }
                }
                bi = buffer.indexOf(boundary);
              }
              return [3, 1];
            case 3:
              return [2];
          }
        });
      });
    }
    function parseHeaders(headerText) {
      var headersInit = {};
      headerText.split("\n").forEach(function(line) {
        var i = line.indexOf(":");
        if (i > -1) {
          var name_1 = line.slice(0, i).trim().toLowerCase();
          var value = line.slice(i + 1).trim();
          headersInit[name_1] = value;
        }
      });
      return headersInit;
    }
    function parseJsonBody(response, bodyText) {
      if (response.status >= 300) {
        var getResult = function() {
          try {
            return JSON.parse(bodyText);
          } catch (err) {
            return bodyText;
          }
        };
        utils.throwServerError(response, getResult(), "Response not successful: Received status code ".concat(response.status));
      }
      try {
        return JSON.parse(bodyText);
      } catch (err) {
        var parseError = err;
        parseError.name = "ServerParseError";
        parseError.response = response;
        parseError.statusCode = response.status;
        parseError.bodyText = bodyText;
        throw parseError;
      }
    }
    function handleError(err, observer) {
      if (err.result && err.result.errors && err.result.data) {
        observer.next(err.result);
      }
      observer.error(err);
    }
    function parseAndCheckHttpResponse(operations) {
      return function(response) {
        return response.text().then(function(bodyText) {
          return parseJsonBody(response, bodyText);
        }).then(function(result2) {
          if (!Array.isArray(result2) && !hasOwnProperty5.call(result2, "data") && !hasOwnProperty5.call(result2, "errors")) {
            utils.throwServerError(response, result2, "Server response was missing for query '".concat(Array.isArray(operations) ? operations.map(function(op) {
              return op.operationName;
            }) : operations.operationName, "'."));
          }
          return result2;
        });
      };
    }
    var serializeFetchParameter = function(p, label) {
      var serialized;
      try {
        serialized = JSON.stringify(p);
      } catch (e) {
        var parseError = globals.newInvariantError(54, label, e.message);
        parseError.parseError = e;
        throw parseError;
      }
      return serialized;
    };
    var defaultHttpOptions = {
      includeQuery: true,
      includeExtensions: false,
      preserveHeaderCase: false
    };
    var defaultHeaders = {
      accept: "*/*",
      "content-type": "application/json"
    };
    var defaultOptions = {
      method: "POST"
    };
    var fallbackHttpConfig = {
      http: defaultHttpOptions,
      headers: defaultHeaders,
      options: defaultOptions
    };
    var defaultPrinter = function(ast, printer) {
      return printer(ast);
    };
    function selectHttpOptionsAndBody(operation, fallbackConfig) {
      var configs = [];
      for (var _i = 2; _i < arguments.length; _i++) {
        configs[_i - 2] = arguments[_i];
      }
      configs.unshift(fallbackConfig);
      return selectHttpOptionsAndBodyInternal.apply(void 0, tslib.__spreadArray([
        operation,
        defaultPrinter
      ], configs, false));
    }
    function selectHttpOptionsAndBodyInternal(operation, printer) {
      var configs = [];
      for (var _i = 2; _i < arguments.length; _i++) {
        configs[_i - 2] = arguments[_i];
      }
      var options = {};
      var http = {};
      configs.forEach(function(config) {
        options = tslib.__assign(tslib.__assign(tslib.__assign({}, options), config.options), { headers: tslib.__assign(tslib.__assign({}, options.headers), config.headers) });
        if (config.credentials) {
          options.credentials = config.credentials;
        }
        http = tslib.__assign(tslib.__assign({}, http), config.http);
      });
      if (options.headers) {
        options.headers = removeDuplicateHeaders(options.headers, http.preserveHeaderCase);
      }
      var operationName = operation.operationName, extensions = operation.extensions, variables = operation.variables, query = operation.query;
      var body = { operationName, variables };
      if (http.includeExtensions)
        body.extensions = extensions;
      if (http.includeQuery)
        body.query = printer(query, utilities.print);
      return {
        options,
        body
      };
    }
    function removeDuplicateHeaders(headers, preserveHeaderCase) {
      if (!preserveHeaderCase) {
        var normalizedHeaders_1 = {};
        Object.keys(Object(headers)).forEach(function(name) {
          normalizedHeaders_1[name.toLowerCase()] = headers[name];
        });
        return normalizedHeaders_1;
      }
      var headerData = {};
      Object.keys(Object(headers)).forEach(function(name) {
        headerData[name.toLowerCase()] = {
          originalName: name,
          value: headers[name]
        };
      });
      var normalizedHeaders = {};
      Object.keys(headerData).forEach(function(name) {
        normalizedHeaders[headerData[name].originalName] = headerData[name].value;
      });
      return normalizedHeaders;
    }
    var checkFetcher = function(fetcher) {
      if (!fetcher && typeof fetch === "undefined") {
        throw globals.newInvariantError(51);
      }
    };
    var createSignalIfSupported = function() {
      if (typeof AbortController === "undefined")
        return { controller: false, signal: false };
      var controller = new AbortController();
      var signal = controller.signal;
      return { controller, signal };
    };
    var selectURI = function(operation, fallbackURI) {
      var context = operation.getContext();
      var contextURI = context.uri;
      if (contextURI) {
        return contextURI;
      } else if (typeof fallbackURI === "function") {
        return fallbackURI(operation);
      } else {
        return fallbackURI || "/graphql";
      }
    };
    function rewriteURIForGET(chosenURI, body) {
      var queryParams = [];
      var addQueryParam = function(key, value) {
        queryParams.push("".concat(key, "=").concat(encodeURIComponent(value)));
      };
      if ("query" in body) {
        addQueryParam("query", body.query);
      }
      if (body.operationName) {
        addQueryParam("operationName", body.operationName);
      }
      if (body.variables) {
        var serializedVariables = void 0;
        try {
          serializedVariables = serializeFetchParameter(body.variables, "Variables map");
        } catch (parseError) {
          return { parseError };
        }
        addQueryParam("variables", serializedVariables);
      }
      if (body.extensions) {
        var serializedExtensions = void 0;
        try {
          serializedExtensions = serializeFetchParameter(body.extensions, "Extensions map");
        } catch (parseError) {
          return { parseError };
        }
        addQueryParam("extensions", serializedExtensions);
      }
      var fragment = "", preFragment = chosenURI;
      var fragmentStart = chosenURI.indexOf("#");
      if (fragmentStart !== -1) {
        fragment = chosenURI.substr(fragmentStart);
        preFragment = chosenURI.substr(0, fragmentStart);
      }
      var queryParamsPrefix = preFragment.indexOf("?") === -1 ? "?" : "&";
      var newURI = preFragment + queryParamsPrefix + queryParams.join("&") + fragment;
      return { newURI };
    }
    var backupFetch = utilities.maybe(function() {
      return fetch;
    });
    var createHttpLink2 = function(linkOptions) {
      if (linkOptions === void 0) {
        linkOptions = {};
      }
      var _a2 = linkOptions.uri, uri = _a2 === void 0 ? "/graphql" : _a2, preferredFetch = linkOptions.fetch, _b = linkOptions.print, print2 = _b === void 0 ? defaultPrinter : _b, includeExtensions = linkOptions.includeExtensions, preserveHeaderCase = linkOptions.preserveHeaderCase, useGETForQueries = linkOptions.useGETForQueries, _c = linkOptions.includeUnusedVariables, includeUnusedVariables = _c === void 0 ? false : _c, requestOptions = tslib.__rest(linkOptions, ["uri", "fetch", "print", "includeExtensions", "preserveHeaderCase", "useGETForQueries", "includeUnusedVariables"]);
      if (globalThis.__DEV__ !== false) {
        checkFetcher(preferredFetch || backupFetch);
      }
      var linkConfig = {
        http: { includeExtensions, preserveHeaderCase },
        options: requestOptions.fetchOptions,
        credentials: requestOptions.credentials,
        headers: requestOptions.headers
      };
      return new core.ApolloLink(function(operation) {
        var chosenURI = selectURI(operation, uri);
        var context = operation.getContext();
        var clientAwarenessHeaders = {};
        if (context.clientAwareness) {
          var _a3 = context.clientAwareness, name_1 = _a3.name, version2 = _a3.version;
          if (name_1) {
            clientAwarenessHeaders["apollographql-client-name"] = name_1;
          }
          if (version2) {
            clientAwarenessHeaders["apollographql-client-version"] = version2;
          }
        }
        var contextHeaders = tslib.__assign(tslib.__assign({}, clientAwarenessHeaders), context.headers);
        var contextConfig = {
          http: context.http,
          options: context.fetchOptions,
          credentials: context.credentials,
          headers: contextHeaders
        };
        if (utilities.hasDirectives(["client"], operation.query)) {
          if (globalThis.__DEV__ !== false) {
            globalThis.__DEV__ !== false && globals.invariant.warn(52);
          }
          var transformedQuery = utilities.removeClientSetsFromDocument(operation.query);
          if (!transformedQuery) {
            return utils.fromError(new Error("HttpLink: Trying to send a client-only query to the server. To send to the server, ensure a non-client field is added to the query or set the `transformOptions.removeClientFields` option to `true`."));
          }
          operation.query = transformedQuery;
        }
        var _b2 = selectHttpOptionsAndBodyInternal(operation, print2, fallbackHttpConfig, linkConfig, contextConfig), options = _b2.options, body = _b2.body;
        if (body.variables && !includeUnusedVariables) {
          body.variables = utils.filterOperationVariables(body.variables, operation.query);
        }
        var controller;
        if (!options.signal && typeof AbortController !== "undefined") {
          controller = new AbortController();
          options.signal = controller.signal;
        }
        var definitionIsMutation = function(d) {
          return d.kind === "OperationDefinition" && d.operation === "mutation";
        };
        var definitionIsSubscription = function(d) {
          return d.kind === "OperationDefinition" && d.operation === "subscription";
        };
        var isSubscription = definitionIsSubscription(utilities.getMainDefinition(operation.query));
        var hasDefer = utilities.hasDirectives(["defer"], operation.query);
        if (useGETForQueries && !operation.query.definitions.some(definitionIsMutation)) {
          options.method = "GET";
        }
        if (hasDefer || isSubscription) {
          options.headers = options.headers || {};
          var acceptHeader = "multipart/mixed;";
          if (isSubscription && hasDefer) {
            globalThis.__DEV__ !== false && globals.invariant.warn(53);
          }
          if (isSubscription) {
            acceptHeader += "boundary=graphql;subscriptionSpec=1.0,application/json";
          } else if (hasDefer) {
            acceptHeader += "deferSpec=20220824,application/json";
          }
          options.headers.accept = acceptHeader;
        }
        if (options.method === "GET") {
          var _c2 = rewriteURIForGET(chosenURI, body), newURI = _c2.newURI, parseError = _c2.parseError;
          if (parseError) {
            return utils.fromError(parseError);
          }
          chosenURI = newURI;
        } else {
          try {
            options.body = serializeFetchParameter(body, "Payload");
          } catch (parseError2) {
            return utils.fromError(parseError2);
          }
        }
        return new utilities.Observable(function(observer) {
          var currentFetch = preferredFetch || utilities.maybe(function() {
            return fetch;
          }) || backupFetch;
          var observerNext = observer.next.bind(observer);
          currentFetch(chosenURI, options).then(function(response) {
            var _a4;
            operation.setContext({ response });
            var ctype = (_a4 = response.headers) === null || _a4 === void 0 ? void 0 : _a4.get("content-type");
            if (ctype !== null && /^multipart\/mixed/i.test(ctype)) {
              return readMultipartBody(response, observerNext);
            } else {
              return parseAndCheckHttpResponse(operation)(response).then(observerNext);
            }
          }).then(function() {
            controller = void 0;
            observer.complete();
          }).catch(function(err) {
            controller = void 0;
            handleError(err, observer);
          });
          return function() {
            if (controller)
              controller.abort();
          };
        });
      });
    };
    var HttpLink = (function(_super) {
      tslib.__extends(HttpLink2, _super);
      function HttpLink2(options) {
        if (options === void 0) {
          options = {};
        }
        var _this = _super.call(this, createHttpLink2(options).request) || this;
        _this.options = options;
        return _this;
      }
      return HttpLink2;
    })(core.ApolloLink);
    exports.HttpLink = HttpLink;
    exports.checkFetcher = checkFetcher;
    exports.createHttpLink = createHttpLink2;
    exports.createSignalIfSupported = createSignalIfSupported;
    exports.defaultPrinter = defaultPrinter;
    exports.fallbackHttpConfig = fallbackHttpConfig;
    exports.parseAndCheckHttpResponse = parseAndCheckHttpResponse;
    exports.rewriteURIForGET = rewriteURIForGET;
    exports.selectHttpOptionsAndBody = selectHttpOptionsAndBody;
    exports.selectHttpOptionsAndBodyInternal = selectHttpOptionsAndBodyInternal;
    exports.selectURI = selectURI;
    exports.serializeFetchParameter = serializeFetchParameter;
  }
});

// ../node_modules/@wry/equality/lib/index.js
var lib_exports4 = {};
__export(lib_exports4, {
  default: () => lib_default,
  equal: () => equal
});
function equal(a, b) {
  try {
    return check(a, b);
  } finally {
    previousComparisons.clear();
  }
}
function check(a, b) {
  if (a === b) {
    return true;
  }
  const aTag = toString.call(a);
  const bTag = toString.call(b);
  if (aTag !== bTag) {
    return false;
  }
  switch (aTag) {
    case "[object Array]":
      if (a.length !== b.length)
        return false;
    // Fall through to object case...
    case "[object Object]": {
      if (previouslyCompared(a, b))
        return true;
      const aKeys = definedKeys(a);
      const bKeys = definedKeys(b);
      const keyCount = aKeys.length;
      if (keyCount !== bKeys.length)
        return false;
      for (let k = 0; k < keyCount; ++k) {
        if (!hasOwnProperty4.call(b, aKeys[k])) {
          return false;
        }
      }
      for (let k = 0; k < keyCount; ++k) {
        const key = aKeys[k];
        if (!check(a[key], b[key])) {
          return false;
        }
      }
      return true;
    }
    case "[object Error]":
      return a.name === b.name && a.message === b.message;
    case "[object Number]":
      if (a !== a)
        return b !== b;
    // Fall through to shared +a === +b case...
    case "[object Boolean]":
    case "[object Date]":
      return +a === +b;
    case "[object RegExp]":
    case "[object String]":
      return a == `${b}`;
    case "[object Map]":
    case "[object Set]": {
      if (a.size !== b.size)
        return false;
      if (previouslyCompared(a, b))
        return true;
      const aIterator = a.entries();
      const isMap = aTag === "[object Map]";
      while (true) {
        const info = aIterator.next();
        if (info.done)
          break;
        const [aKey, aValue] = info.value;
        if (!b.has(aKey)) {
          return false;
        }
        if (isMap && !check(aValue, b.get(aKey))) {
          return false;
        }
      }
      return true;
    }
    case "[object Uint16Array]":
    case "[object Uint8Array]":
    // Buffer, in Node.js.
    case "[object Uint32Array]":
    case "[object Int32Array]":
    case "[object Int8Array]":
    case "[object Int16Array]":
    case "[object ArrayBuffer]":
      a = new Uint8Array(a);
      b = new Uint8Array(b);
    // Fall through...
    case "[object DataView]": {
      let len = a.byteLength;
      if (len === b.byteLength) {
        while (len-- && a[len] === b[len]) {
        }
      }
      return len === -1;
    }
    case "[object AsyncFunction]":
    case "[object GeneratorFunction]":
    case "[object AsyncGeneratorFunction]":
    case "[object Function]": {
      const aCode = fnToStr.call(a);
      if (aCode !== fnToStr.call(b)) {
        return false;
      }
      return !endsWith(aCode, nativeCodeSuffix);
    }
  }
  return false;
}
function definedKeys(obj) {
  return Object.keys(obj).filter(isDefinedKey, obj);
}
function isDefinedKey(key) {
  return this[key] !== void 0;
}
function endsWith(full, suffix) {
  const fromIndex = full.length - suffix.length;
  return fromIndex >= 0 && full.indexOf(suffix, fromIndex) === fromIndex;
}
function previouslyCompared(a, b) {
  let bSet = previousComparisons.get(a);
  if (bSet) {
    if (bSet.has(b))
      return true;
  } else {
    previousComparisons.set(a, bSet = /* @__PURE__ */ new Set());
  }
  bSet.add(b);
  return false;
}
var toString, hasOwnProperty4, fnToStr, previousComparisons, lib_default, nativeCodeSuffix;
var init_lib5 = __esm({
  "../node_modules/@wry/equality/lib/index.js"() {
    ({ toString, hasOwnProperty: hasOwnProperty4 } = Object.prototype);
    fnToStr = Function.prototype.toString;
    previousComparisons = /* @__PURE__ */ new Map();
    lib_default = equal;
    nativeCodeSuffix = "{ [native code] }";
  }
});

// ../node_modules/@apollo/client/masking/masking.cjs
var require_masking = __commonJS({
  "../node_modules/@apollo/client/masking/masking.cjs"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var optimism = (init_lib4(), __toCommonJS(lib_exports3));
    var globals = require_globals();
    var utilities = require_utilities();
    var graphql2 = (init_graphql2(), __toCommonJS(graphql_exports));
    var equal2 = (init_lib5(), __toCommonJS(lib_exports4));
    function _interopDefaultLegacy(e) {
      return e && typeof e === "object" && "default" in e ? e["default"] : e;
    }
    var equal__default = _interopDefaultLegacy(equal2);
    var MapImpl = utilities.canUseWeakMap ? WeakMap : Map;
    var SetImpl = utilities.canUseWeakSet ? WeakSet : Set;
    var disableWarningsSlot = new optimism.Slot();
    var issuedWarning = false;
    function warnOnImproperCacheImplementation() {
      if (!issuedWarning) {
        issuedWarning = true;
        globalThis.__DEV__ !== false && globals.invariant.warn(64);
      }
    }
    function maskDefinition(data, selectionSet, context) {
      return disableWarningsSlot.withValue(true, function() {
        var masked = maskSelectionSet(data, selectionSet, context, false);
        if (Object.isFrozen(data)) {
          utilities.maybeDeepFreeze(masked);
        }
        return masked;
      });
    }
    function getMutableTarget(data, mutableTargets) {
      if (mutableTargets.has(data)) {
        return mutableTargets.get(data);
      }
      var mutableTarget = Array.isArray(data) ? [] : /* @__PURE__ */ Object.create(null);
      mutableTargets.set(data, mutableTarget);
      return mutableTarget;
    }
    function maskSelectionSet(data, selectionSet, context, migration, path) {
      var _a2;
      var knownChanged = context.knownChanged;
      var memo = getMutableTarget(data, context.mutableTargets);
      if (Array.isArray(data)) {
        for (var _i = 0, _b = Array.from(data.entries()); _i < _b.length; _i++) {
          var _c = _b[_i], index = _c[0], item = _c[1];
          if (item === null) {
            memo[index] = null;
            continue;
          }
          var masked = maskSelectionSet(item, selectionSet, context, migration, globalThis.__DEV__ !== false ? "".concat(path || "", "[").concat(index, "]") : void 0);
          if (knownChanged.has(masked)) {
            knownChanged.add(memo);
          }
          memo[index] = masked;
        }
        return knownChanged.has(memo) ? memo : data;
      }
      for (var _d = 0, _e = selectionSet.selections; _d < _e.length; _d++) {
        var selection = _e[_d];
        var value = void 0;
        if (migration) {
          knownChanged.add(memo);
        }
        if (selection.kind === graphql2.Kind.FIELD) {
          var keyName = utilities.resultKeyNameFromField(selection);
          var childSelectionSet = selection.selectionSet;
          value = memo[keyName] || data[keyName];
          if (value === void 0) {
            continue;
          }
          if (childSelectionSet && value !== null) {
            var masked = maskSelectionSet(data[keyName], childSelectionSet, context, migration, globalThis.__DEV__ !== false ? "".concat(path || "", ".").concat(keyName) : void 0);
            if (knownChanged.has(masked)) {
              value = masked;
            }
          }
          if (!(globalThis.__DEV__ !== false)) {
            memo[keyName] = value;
          }
          if (globalThis.__DEV__ !== false) {
            if (migration && keyName !== "__typename" && !((_a2 = Object.getOwnPropertyDescriptor(memo, keyName)) === null || _a2 === void 0 ? void 0 : _a2.value)) {
              Object.defineProperty(memo, keyName, getAccessorWarningDescriptor(keyName, value, path || "", context.operationName, context.operationType));
            } else {
              delete memo[keyName];
              memo[keyName] = value;
            }
          }
        }
        if (selection.kind === graphql2.Kind.INLINE_FRAGMENT && (!selection.typeCondition || context.cache.fragmentMatches(selection, data.__typename))) {
          value = maskSelectionSet(data, selection.selectionSet, context, migration, path);
        }
        if (selection.kind === graphql2.Kind.FRAGMENT_SPREAD) {
          var fragmentName = selection.name.value;
          var fragment = context.fragmentMap[fragmentName] || (context.fragmentMap[fragmentName] = context.cache.lookupFragment(fragmentName));
          globals.invariant(fragment, 59, fragmentName);
          var mode = utilities.getFragmentMaskMode(selection);
          if (mode !== "mask") {
            value = maskSelectionSet(data, fragment.selectionSet, context, mode === "migrate", path);
          }
        }
        if (knownChanged.has(value)) {
          knownChanged.add(memo);
        }
      }
      if ("__typename" in data && !("__typename" in memo)) {
        memo.__typename = data.__typename;
      }
      if (Object.keys(memo).length !== Object.keys(data).length) {
        knownChanged.add(memo);
      }
      return knownChanged.has(memo) ? memo : data;
    }
    function getAccessorWarningDescriptor(fieldName, value, path, operationName, operationType) {
      var getValue = function() {
        if (disableWarningsSlot.getValue()) {
          return value;
        }
        globalThis.__DEV__ !== false && globals.invariant.warn(60, operationName ? "".concat(operationType, " '").concat(operationName, "'") : "anonymous ".concat(operationType), "".concat(path, ".").concat(fieldName).replace(/^\./, ""));
        getValue = function() {
          return value;
        };
        return value;
      };
      return {
        get: function() {
          return getValue();
        },
        set: function(newValue) {
          getValue = function() {
            return newValue;
          };
        },
        enumerable: true,
        configurable: true
      };
    }
    function maskFragment(data, document, cache, fragmentName) {
      if (!cache.fragmentMatches) {
        if (globalThis.__DEV__ !== false) {
          warnOnImproperCacheImplementation();
        }
        return data;
      }
      var fragments = document.definitions.filter(function(node) {
        return node.kind === graphql2.Kind.FRAGMENT_DEFINITION;
      });
      if (typeof fragmentName === "undefined") {
        globals.invariant(fragments.length === 1, 61, fragments.length);
        fragmentName = fragments[0].name.value;
      }
      var fragment = fragments.find(function(fragment2) {
        return fragment2.name.value === fragmentName;
      });
      globals.invariant(!!fragment, 62, fragmentName);
      if (data == null) {
        return data;
      }
      if (equal__default(data, {})) {
        return data;
      }
      return maskDefinition(data, fragment.selectionSet, {
        operationType: "fragment",
        operationName: fragment.name.value,
        fragmentMap: utilities.createFragmentMap(utilities.getFragmentDefinitions(document)),
        cache,
        mutableTargets: new MapImpl(),
        knownChanged: new SetImpl()
      });
    }
    function maskOperation(data, document, cache) {
      var _a2;
      if (!cache.fragmentMatches) {
        if (globalThis.__DEV__ !== false) {
          warnOnImproperCacheImplementation();
        }
        return data;
      }
      var definition = utilities.getOperationDefinition(document);
      globals.invariant(definition, 63);
      if (data == null) {
        return data;
      }
      return maskDefinition(data, definition.selectionSet, {
        operationType: definition.operation,
        operationName: (_a2 = definition.name) === null || _a2 === void 0 ? void 0 : _a2.value,
        fragmentMap: utilities.createFragmentMap(utilities.getFragmentDefinitions(document)),
        cache,
        mutableTargets: new MapImpl(),
        knownChanged: new SetImpl()
      });
    }
    exports.disableWarningsSlot = disableWarningsSlot;
    exports.maskFragment = maskFragment;
    exports.maskOperation = maskOperation;
  }
});

// ../node_modules/@apollo/client/cache/cache.cjs
var require_cache = __commonJS({
  "../node_modules/@apollo/client/cache/cache.cjs"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var globals = require_globals();
    var tslib = (init_tslib_es6(), __toCommonJS(tslib_es6_exports));
    var optimism = (init_lib4(), __toCommonJS(lib_exports3));
    var utilities = require_utilities();
    var caches2 = (init_lib2(), __toCommonJS(lib_exports2));
    var equal2 = (init_lib5(), __toCommonJS(lib_exports4));
    var masking = require_masking();
    var trie = (init_lib(), __toCommonJS(lib_exports));
    var graphql2 = (init_graphql2(), __toCommonJS(graphql_exports));
    function _interopDefaultLegacy(e) {
      return e && typeof e === "object" && "default" in e ? e["default"] : e;
    }
    var equal__default = _interopDefaultLegacy(equal2);
    var getInMemoryCacheMemoryInternals = globalThis.__DEV__ !== false ? _getInMemoryCacheMemoryInternals : void 0;
    var getApolloCacheMemoryInternals = globalThis.__DEV__ !== false ? _getApolloCacheMemoryInternals : void 0;
    function _getApolloCacheMemoryInternals() {
      return {
        cache: {
          fragmentQueryDocuments: getWrapperInformation(this["getFragmentDoc"])
        }
      };
    }
    function _getInMemoryCacheMemoryInternals() {
      var fragments = this.config.fragments;
      return tslib.__assign(tslib.__assign({}, _getApolloCacheMemoryInternals.apply(this)), { addTypenameDocumentTransform: transformInfo(this["addTypenameTransform"]), inMemoryCache: {
        executeSelectionSet: getWrapperInformation(this["storeReader"]["executeSelectionSet"]),
        executeSubSelectedArray: getWrapperInformation(this["storeReader"]["executeSubSelectedArray"]),
        maybeBroadcastWatch: getWrapperInformation(this["maybeBroadcastWatch"])
      }, fragmentRegistry: {
        findFragmentSpreads: getWrapperInformation(fragments === null || fragments === void 0 ? void 0 : fragments.findFragmentSpreads),
        lookup: getWrapperInformation(fragments === null || fragments === void 0 ? void 0 : fragments.lookup),
        transform: getWrapperInformation(fragments === null || fragments === void 0 ? void 0 : fragments.transform)
      } });
    }
    function isWrapper(f) {
      return !!f && "dirtyKey" in f;
    }
    function getWrapperInformation(f) {
      return isWrapper(f) ? f.size : void 0;
    }
    function isDefined(value) {
      return value != null;
    }
    function transformInfo(transform) {
      return recurseTransformInfo(transform).map(function(cache) {
        return { cache };
      });
    }
    function recurseTransformInfo(transform) {
      return transform ? tslib.__spreadArray(tslib.__spreadArray([
        getWrapperInformation(transform === null || transform === void 0 ? void 0 : transform["performWork"])
      ], recurseTransformInfo(transform === null || transform === void 0 ? void 0 : transform["left"]), true), recurseTransformInfo(transform === null || transform === void 0 ? void 0 : transform["right"]), true).filter(isDefined) : [];
    }
    function equalByQuery(query, _a2, _b, variables) {
      var aData = _a2.data, aRest = tslib.__rest(_a2, ["data"]);
      var bData = _b.data, bRest = tslib.__rest(_b, ["data"]);
      return equal__default(aRest, bRest) && equalBySelectionSet(utilities.getMainDefinition(query).selectionSet, aData, bData, {
        fragmentMap: utilities.createFragmentMap(utilities.getFragmentDefinitions(query)),
        variables
      });
    }
    function equalBySelectionSet(selectionSet, aResult, bResult, context) {
      if (aResult === bResult) {
        return true;
      }
      var seenSelections = /* @__PURE__ */ new Set();
      return selectionSet.selections.every(function(selection) {
        if (seenSelections.has(selection))
          return true;
        seenSelections.add(selection);
        if (!utilities.shouldInclude(selection, context.variables))
          return true;
        if (selectionHasNonreactiveDirective(selection))
          return true;
        if (utilities.isField(selection)) {
          var resultKey = utilities.resultKeyNameFromField(selection);
          var aResultChild = aResult && aResult[resultKey];
          var bResultChild = bResult && bResult[resultKey];
          var childSelectionSet = selection.selectionSet;
          if (!childSelectionSet) {
            return equal__default(aResultChild, bResultChild);
          }
          var aChildIsArray = Array.isArray(aResultChild);
          var bChildIsArray = Array.isArray(bResultChild);
          if (aChildIsArray !== bChildIsArray)
            return false;
          if (aChildIsArray && bChildIsArray) {
            var length_1 = aResultChild.length;
            if (bResultChild.length !== length_1) {
              return false;
            }
            for (var i = 0; i < length_1; ++i) {
              if (!equalBySelectionSet(childSelectionSet, aResultChild[i], bResultChild[i], context)) {
                return false;
              }
            }
            return true;
          }
          return equalBySelectionSet(childSelectionSet, aResultChild, bResultChild, context);
        } else {
          var fragment = utilities.getFragmentFromSelection(selection, context.fragmentMap);
          if (fragment) {
            if (selectionHasNonreactiveDirective(fragment))
              return true;
            return equalBySelectionSet(
              fragment.selectionSet,
              aResult,
              bResult,
              context
            );
          }
        }
      });
    }
    function selectionHasNonreactiveDirective(selection) {
      return !!selection.directives && selection.directives.some(directiveIsNonreactive);
    }
    function directiveIsNonreactive(dir) {
      return dir.name.value === "nonreactive";
    }
    var muteAllDeprecations = Symbol.for("apollo.deprecations");
    var global2 = globals.global;
    var slot = new optimism.Slot();
    function isMuted(name) {
      return global2[muteAllDeprecations] || (slot.getValue() || []).includes(name);
    }
    function muteDeprecations(name) {
      var args = [];
      for (var _i = 1; _i < arguments.length; _i++) {
        args[_i - 1] = arguments[_i];
      }
      return slot.withValue.apply(slot, tslib.__spreadArray([Array.isArray(name) ? name : [name]], args, false));
    }
    function warnRemovedOption(options, name, callSite, recommendation) {
      if (recommendation === void 0) {
        recommendation = "Please remove this option.";
      }
      warnDeprecated(name, function() {
        if (name in options) {
          globalThis.__DEV__ !== false && globals.invariant.warn(104, callSite, name, recommendation);
        }
      });
    }
    function warnDeprecated(name, cb) {
      if (!isMuted(name)) {
        cb();
      }
    }
    var ApolloCache = (function() {
      function ApolloCache2() {
        this.assumeImmutableResults = false;
        this.getFragmentDoc = optimism.wrap(utilities.getFragmentQueryDocument, {
          max: utilities.cacheSizes["cache.fragmentQueryDocuments"] || 1e3,
          cache: caches2.WeakCache
        });
      }
      ApolloCache2.prototype.lookupFragment = function(fragmentName) {
        return null;
      };
      ApolloCache2.prototype.batch = function(options) {
        var _this = this;
        var optimisticId = typeof options.optimistic === "string" ? options.optimistic : options.optimistic === false ? null : void 0;
        var updateResult;
        this.performTransaction(function() {
          return updateResult = options.update(_this);
        }, optimisticId);
        return updateResult;
      };
      ApolloCache2.prototype.recordOptimisticTransaction = function(transaction, optimisticId) {
        this.performTransaction(transaction, optimisticId);
      };
      ApolloCache2.prototype.transformDocument = function(document) {
        return document;
      };
      ApolloCache2.prototype.transformForLink = function(document) {
        return document;
      };
      ApolloCache2.prototype.identify = function(object) {
        return;
      };
      ApolloCache2.prototype.gc = function() {
        return [];
      };
      ApolloCache2.prototype.modify = function(options) {
        return false;
      };
      ApolloCache2.prototype.readQuery = function(options, optimistic) {
        var _this = this;
        if (optimistic === void 0) {
          optimistic = !!options.optimistic;
        }
        if (globalThis.__DEV__ !== false) {
          warnRemovedOption(options, "canonizeResults", "cache.readQuery");
        }
        return muteDeprecations("canonizeResults", function() {
          return _this.read(tslib.__assign(tslib.__assign({}, options), { rootId: options.id || "ROOT_QUERY", optimistic }));
        });
      };
      ApolloCache2.prototype.watchFragment = function(options) {
        var _this = this;
        var fragment = options.fragment, fragmentName = options.fragmentName, from3 = options.from, _a2 = options.optimistic, optimistic = _a2 === void 0 ? true : _a2, otherOptions = tslib.__rest(options, ["fragment", "fragmentName", "from", "optimistic"]);
        var query = this.getFragmentDoc(fragment, fragmentName);
        var id = typeof from3 === "undefined" || typeof from3 === "string" ? from3 : this.identify(from3);
        var dataMasking = !!options[Symbol.for("apollo.dataMasking")];
        if (globalThis.__DEV__ !== false) {
          var actualFragmentName = fragmentName || utilities.getFragmentDefinition(fragment).name.value;
          if (!id) {
            globalThis.__DEV__ !== false && globals.invariant.warn(1, actualFragmentName);
          }
        }
        var diffOptions = tslib.__assign(tslib.__assign({}, otherOptions), { returnPartialData: true, id, query, optimistic });
        var latestDiff;
        return new utilities.Observable(function(observer) {
          return _this.watch(tslib.__assign(tslib.__assign({}, diffOptions), { immediate: true, callback: function(diff2) {
            var data = dataMasking ? masking.maskFragment(diff2.result, fragment, _this, fragmentName) : diff2.result;
            if (latestDiff && equalByQuery(
              query,
              { data: latestDiff.result },
              { data },
              options.variables
            )) {
              return;
            }
            var result2 = {
              data,
              complete: !!diff2.complete
            };
            if (diff2.missing) {
              result2.missing = utilities.mergeDeepArray(diff2.missing.map(function(error) {
                return error.missing;
              }));
            }
            latestDiff = tslib.__assign(tslib.__assign({}, diff2), { result: data });
            observer.next(result2);
          } }));
        });
      };
      ApolloCache2.prototype.readFragment = function(options, optimistic) {
        var _this = this;
        if (optimistic === void 0) {
          optimistic = !!options.optimistic;
        }
        if (globalThis.__DEV__ !== false) {
          warnRemovedOption(options, "canonizeResults", "cache.readFragment");
        }
        return muteDeprecations("canonizeResults", function() {
          return _this.read(tslib.__assign(tslib.__assign({}, options), { query: _this.getFragmentDoc(options.fragment, options.fragmentName), rootId: options.id, optimistic }));
        });
      };
      ApolloCache2.prototype.writeQuery = function(_a2) {
        var id = _a2.id, data = _a2.data, options = tslib.__rest(_a2, ["id", "data"]);
        return this.write(Object.assign(options, {
          dataId: id || "ROOT_QUERY",
          result: data
        }));
      };
      ApolloCache2.prototype.writeFragment = function(_a2) {
        var id = _a2.id, data = _a2.data, fragment = _a2.fragment, fragmentName = _a2.fragmentName, options = tslib.__rest(_a2, ["id", "data", "fragment", "fragmentName"]);
        return this.write(Object.assign(options, {
          query: this.getFragmentDoc(fragment, fragmentName),
          dataId: id,
          result: data
        }));
      };
      ApolloCache2.prototype.updateQuery = function(options, update) {
        if (globalThis.__DEV__ !== false) {
          warnRemovedOption(options, "canonizeResults", "cache.updateQuery");
        }
        return this.batch({
          update: function(cache) {
            var value = muteDeprecations("canonizeResults", function() {
              return cache.readQuery(options);
            });
            var data = update(value);
            if (data === void 0 || data === null)
              return value;
            cache.writeQuery(tslib.__assign(tslib.__assign({}, options), { data }));
            return data;
          }
        });
      };
      ApolloCache2.prototype.updateFragment = function(options, update) {
        if (globalThis.__DEV__ !== false) {
          warnRemovedOption(options, "canonizeResults", "cache.updateFragment");
        }
        return this.batch({
          update: function(cache) {
            var value = muteDeprecations("canonizeResults", function() {
              return cache.readFragment(options);
            });
            var data = update(value);
            if (data === void 0 || data === null)
              return value;
            cache.writeFragment(tslib.__assign(tslib.__assign({}, options), { data }));
            return data;
          }
        });
      };
      return ApolloCache2;
    })();
    if (globalThis.__DEV__ !== false) {
      ApolloCache.prototype.getMemoryInternals = getApolloCacheMemoryInternals;
    }
    exports.Cache = void 0;
    /* @__PURE__ */ (function(Cache) {
    })(exports.Cache || (exports.Cache = {}));
    var MissingFieldError = (function(_super) {
      tslib.__extends(MissingFieldError2, _super);
      function MissingFieldError2(message, path, query, variables) {
        var _a2;
        var _this = _super.call(this, message) || this;
        _this.message = message;
        _this.path = path;
        _this.query = query;
        _this.variables = variables;
        if (Array.isArray(_this.path)) {
          _this.missing = _this.message;
          for (var i = _this.path.length - 1; i >= 0; --i) {
            _this.missing = (_a2 = {}, _a2[_this.path[i]] = _this.missing, _a2);
          }
        } else {
          _this.missing = _this.path;
        }
        _this.__proto__ = MissingFieldError2.prototype;
        return _this;
      }
      return MissingFieldError2;
    })(Error);
    var hasOwn = Object.prototype.hasOwnProperty;
    function isNullish(value) {
      return value === null || value === void 0;
    }
    function defaultDataIdFromObject(_a2, context) {
      var __typename = _a2.__typename, id = _a2.id, _id = _a2._id;
      if (typeof __typename === "string") {
        if (context) {
          context.keyObject = !isNullish(id) ? { id } : !isNullish(_id) ? { _id } : void 0;
        }
        if (isNullish(id) && !isNullish(_id)) {
          id = _id;
        }
        if (!isNullish(id)) {
          return "".concat(__typename, ":").concat(typeof id === "number" || typeof id === "string" ? id : JSON.stringify(id));
        }
      }
    }
    var defaultConfig = {
      dataIdFromObject: defaultDataIdFromObject,
      addTypename: true,
      resultCaching: true,
      canonizeResults: false
    };
    function normalizeConfig(config) {
      return utilities.compact(defaultConfig, config);
    }
    function shouldCanonizeResults(config) {
      var value = config.canonizeResults;
      return value === void 0 ? defaultConfig.canonizeResults : value;
    }
    function getTypenameFromStoreObject(store, objectOrReference) {
      return utilities.isReference(objectOrReference) ? store.get(objectOrReference.__ref, "__typename") : objectOrReference && objectOrReference.__typename;
    }
    var TypeOrFieldNameRegExp = /^[_a-z][_0-9a-z]*/i;
    function fieldNameFromStoreName(storeFieldName) {
      var match = storeFieldName.match(TypeOrFieldNameRegExp);
      return match ? match[0] : storeFieldName;
    }
    function selectionSetMatchesResult(selectionSet, result2, variables) {
      if (utilities.isNonNullObject(result2)) {
        return utilities.isArray(result2) ? result2.every(function(item) {
          return selectionSetMatchesResult(selectionSet, item, variables);
        }) : selectionSet.selections.every(function(field) {
          if (utilities.isField(field) && utilities.shouldInclude(field, variables)) {
            var key = utilities.resultKeyNameFromField(field);
            return hasOwn.call(result2, key) && (!field.selectionSet || selectionSetMatchesResult(field.selectionSet, result2[key], variables));
          }
          return true;
        });
      }
      return false;
    }
    function storeValueIsStoreObject(value) {
      return utilities.isNonNullObject(value) && !utilities.isReference(value) && !utilities.isArray(value);
    }
    function makeProcessedFieldsMerger() {
      return new utilities.DeepMerger();
    }
    function extractFragmentContext(document, fragments) {
      var fragmentMap = utilities.createFragmentMap(utilities.getFragmentDefinitions(document));
      return {
        fragmentMap,
        lookupFragment: function(name) {
          var def = fragmentMap[name];
          if (!def && fragments) {
            def = fragments.lookup(name);
          }
          return def || null;
        }
      };
    }
    var DELETE = /* @__PURE__ */ Object.create(null);
    var delModifier = function() {
      return DELETE;
    };
    var INVALIDATE = /* @__PURE__ */ Object.create(null);
    exports.EntityStore = (function() {
      function EntityStore(policies, group) {
        var _this = this;
        this.policies = policies;
        this.group = group;
        this.data = /* @__PURE__ */ Object.create(null);
        this.rootIds = /* @__PURE__ */ Object.create(null);
        this.refs = /* @__PURE__ */ Object.create(null);
        this.getFieldValue = function(objectOrReference, storeFieldName) {
          return utilities.maybeDeepFreeze(utilities.isReference(objectOrReference) ? _this.get(objectOrReference.__ref, storeFieldName) : objectOrReference && objectOrReference[storeFieldName]);
        };
        this.canRead = function(objOrRef) {
          return utilities.isReference(objOrRef) ? _this.has(objOrRef.__ref) : typeof objOrRef === "object";
        };
        this.toReference = function(objOrIdOrRef, mergeIntoStore) {
          if (typeof objOrIdOrRef === "string") {
            return utilities.makeReference(objOrIdOrRef);
          }
          if (utilities.isReference(objOrIdOrRef)) {
            return objOrIdOrRef;
          }
          var id = _this.policies.identify(objOrIdOrRef)[0];
          if (id) {
            var ref = utilities.makeReference(id);
            if (mergeIntoStore) {
              _this.merge(id, objOrIdOrRef);
            }
            return ref;
          }
        };
      }
      EntityStore.prototype.toObject = function() {
        return tslib.__assign({}, this.data);
      };
      EntityStore.prototype.has = function(dataId) {
        return this.lookup(dataId, true) !== void 0;
      };
      EntityStore.prototype.get = function(dataId, fieldName) {
        this.group.depend(dataId, fieldName);
        if (hasOwn.call(this.data, dataId)) {
          var storeObject = this.data[dataId];
          if (storeObject && hasOwn.call(storeObject, fieldName)) {
            return storeObject[fieldName];
          }
        }
        if (fieldName === "__typename" && hasOwn.call(this.policies.rootTypenamesById, dataId)) {
          return this.policies.rootTypenamesById[dataId];
        }
        if (this instanceof Layer) {
          return this.parent.get(dataId, fieldName);
        }
      };
      EntityStore.prototype.lookup = function(dataId, dependOnExistence) {
        if (dependOnExistence)
          this.group.depend(dataId, "__exists");
        if (hasOwn.call(this.data, dataId)) {
          return this.data[dataId];
        }
        if (this instanceof Layer) {
          return this.parent.lookup(dataId, dependOnExistence);
        }
        if (this.policies.rootTypenamesById[dataId]) {
          return /* @__PURE__ */ Object.create(null);
        }
      };
      EntityStore.prototype.merge = function(older, newer) {
        var _this = this;
        var dataId;
        if (utilities.isReference(older))
          older = older.__ref;
        if (utilities.isReference(newer))
          newer = newer.__ref;
        var existing = typeof older === "string" ? this.lookup(dataId = older) : older;
        var incoming = typeof newer === "string" ? this.lookup(dataId = newer) : newer;
        if (!incoming)
          return;
        globals.invariant(typeof dataId === "string", 2);
        var merged = new utilities.DeepMerger(storeObjectReconciler).merge(existing, incoming);
        this.data[dataId] = merged;
        if (merged !== existing) {
          delete this.refs[dataId];
          if (this.group.caching) {
            var fieldsToDirty_1 = /* @__PURE__ */ Object.create(null);
            if (!existing)
              fieldsToDirty_1.__exists = 1;
            Object.keys(incoming).forEach(function(storeFieldName) {
              if (!existing || existing[storeFieldName] !== merged[storeFieldName]) {
                fieldsToDirty_1[storeFieldName] = 1;
                var fieldName = fieldNameFromStoreName(storeFieldName);
                if (fieldName !== storeFieldName && !_this.policies.hasKeyArgs(merged.__typename, fieldName)) {
                  fieldsToDirty_1[fieldName] = 1;
                }
                if (merged[storeFieldName] === void 0 && !(_this instanceof Layer)) {
                  delete merged[storeFieldName];
                }
              }
            });
            if (fieldsToDirty_1.__typename && !(existing && existing.__typename) && this.policies.rootTypenamesById[dataId] === merged.__typename) {
              delete fieldsToDirty_1.__typename;
            }
            Object.keys(fieldsToDirty_1).forEach(function(fieldName) {
              return _this.group.dirty(dataId, fieldName);
            });
          }
        }
      };
      EntityStore.prototype.modify = function(dataId, fields) {
        var _this = this;
        var storeObject = this.lookup(dataId);
        if (storeObject) {
          var changedFields_1 = /* @__PURE__ */ Object.create(null);
          var needToMerge_1 = false;
          var allDeleted_1 = true;
          var sharedDetails_1 = {
            DELETE,
            INVALIDATE,
            isReference: utilities.isReference,
            toReference: this.toReference,
            canRead: this.canRead,
            readField: function(fieldNameOrOptions, from3) {
              return _this.policies.readField(typeof fieldNameOrOptions === "string" ? {
                fieldName: fieldNameOrOptions,
                from: from3 || utilities.makeReference(dataId)
              } : fieldNameOrOptions, { store: _this });
            }
          };
          Object.keys(storeObject).forEach(function(storeFieldName) {
            var fieldName = fieldNameFromStoreName(storeFieldName);
            var fieldValue = storeObject[storeFieldName];
            if (fieldValue === void 0)
              return;
            var modify = typeof fields === "function" ? fields : fields[storeFieldName] || fields[fieldName];
            if (modify) {
              var newValue = modify === delModifier ? DELETE : modify(utilities.maybeDeepFreeze(fieldValue), tslib.__assign(tslib.__assign({}, sharedDetails_1), { fieldName, storeFieldName, storage: _this.getStorage(dataId, storeFieldName) }));
              if (newValue === INVALIDATE) {
                _this.group.dirty(dataId, storeFieldName);
              } else {
                if (newValue === DELETE)
                  newValue = void 0;
                if (newValue !== fieldValue) {
                  changedFields_1[storeFieldName] = newValue;
                  needToMerge_1 = true;
                  fieldValue = newValue;
                  if (globalThis.__DEV__ !== false) {
                    var checkReference = function(ref) {
                      if (_this.lookup(ref.__ref) === void 0) {
                        globalThis.__DEV__ !== false && globals.invariant.warn(3, ref);
                        return true;
                      }
                    };
                    if (utilities.isReference(newValue)) {
                      checkReference(newValue);
                    } else if (Array.isArray(newValue)) {
                      var seenReference = false;
                      var someNonReference = void 0;
                      for (var _i = 0, newValue_1 = newValue; _i < newValue_1.length; _i++) {
                        var value = newValue_1[_i];
                        if (utilities.isReference(value)) {
                          seenReference = true;
                          if (checkReference(value))
                            break;
                        } else {
                          if (typeof value === "object" && !!value) {
                            var id = _this.policies.identify(value)[0];
                            if (id) {
                              someNonReference = value;
                            }
                          }
                        }
                        if (seenReference && someNonReference !== void 0) {
                          globalThis.__DEV__ !== false && globals.invariant.warn(4, someNonReference);
                          break;
                        }
                      }
                    }
                  }
                }
              }
            }
            if (fieldValue !== void 0) {
              allDeleted_1 = false;
            }
          });
          if (needToMerge_1) {
            this.merge(dataId, changedFields_1);
            if (allDeleted_1) {
              if (this instanceof Layer) {
                this.data[dataId] = void 0;
              } else {
                delete this.data[dataId];
              }
              this.group.dirty(dataId, "__exists");
            }
            return true;
          }
        }
        return false;
      };
      EntityStore.prototype.delete = function(dataId, fieldName, args) {
        var _a2;
        var storeObject = this.lookup(dataId);
        if (storeObject) {
          var typename = this.getFieldValue(storeObject, "__typename");
          var storeFieldName = fieldName && args ? this.policies.getStoreFieldName({ typename, fieldName, args }) : fieldName;
          return this.modify(dataId, storeFieldName ? (_a2 = {}, _a2[storeFieldName] = delModifier, _a2) : delModifier);
        }
        return false;
      };
      EntityStore.prototype.evict = function(options, limit) {
        var evicted = false;
        if (options.id) {
          if (hasOwn.call(this.data, options.id)) {
            evicted = this.delete(options.id, options.fieldName, options.args);
          }
          if (this instanceof Layer && this !== limit) {
            evicted = this.parent.evict(options, limit) || evicted;
          }
          if (options.fieldName || evicted) {
            this.group.dirty(options.id, options.fieldName || "__exists");
          }
        }
        return evicted;
      };
      EntityStore.prototype.clear = function() {
        this.replace(null);
      };
      EntityStore.prototype.extract = function() {
        var _this = this;
        var obj = this.toObject();
        var extraRootIds = [];
        this.getRootIdSet().forEach(function(id) {
          if (!hasOwn.call(_this.policies.rootTypenamesById, id)) {
            extraRootIds.push(id);
          }
        });
        if (extraRootIds.length) {
          obj.__META = { extraRootIds: extraRootIds.sort() };
        }
        return obj;
      };
      EntityStore.prototype.replace = function(newData) {
        var _this = this;
        Object.keys(this.data).forEach(function(dataId) {
          if (!(newData && hasOwn.call(newData, dataId))) {
            _this.delete(dataId);
          }
        });
        if (newData) {
          var __META = newData.__META, rest_1 = tslib.__rest(newData, ["__META"]);
          Object.keys(rest_1).forEach(function(dataId) {
            _this.merge(dataId, rest_1[dataId]);
          });
          if (__META) {
            __META.extraRootIds.forEach(this.retain, this);
          }
        }
      };
      EntityStore.prototype.retain = function(rootId) {
        return this.rootIds[rootId] = (this.rootIds[rootId] || 0) + 1;
      };
      EntityStore.prototype.release = function(rootId) {
        if (this.rootIds[rootId] > 0) {
          var count = --this.rootIds[rootId];
          if (!count)
            delete this.rootIds[rootId];
          return count;
        }
        return 0;
      };
      EntityStore.prototype.getRootIdSet = function(ids) {
        if (ids === void 0) {
          ids = /* @__PURE__ */ new Set();
        }
        Object.keys(this.rootIds).forEach(ids.add, ids);
        if (this instanceof Layer) {
          this.parent.getRootIdSet(ids);
        } else {
          Object.keys(this.policies.rootTypenamesById).forEach(ids.add, ids);
        }
        return ids;
      };
      EntityStore.prototype.gc = function() {
        var _this = this;
        var ids = this.getRootIdSet();
        var snapshot = this.toObject();
        ids.forEach(function(id) {
          if (hasOwn.call(snapshot, id)) {
            Object.keys(_this.findChildRefIds(id)).forEach(ids.add, ids);
            delete snapshot[id];
          }
        });
        var idsToRemove = Object.keys(snapshot);
        if (idsToRemove.length) {
          var root_1 = this;
          while (root_1 instanceof Layer)
            root_1 = root_1.parent;
          idsToRemove.forEach(function(id) {
            return root_1.delete(id);
          });
        }
        return idsToRemove;
      };
      EntityStore.prototype.findChildRefIds = function(dataId) {
        if (!hasOwn.call(this.refs, dataId)) {
          var found_1 = this.refs[dataId] = /* @__PURE__ */ Object.create(null);
          var root2 = this.data[dataId];
          if (!root2)
            return found_1;
          var workSet_1 = /* @__PURE__ */ new Set([root2]);
          workSet_1.forEach(function(obj) {
            if (utilities.isReference(obj)) {
              found_1[obj.__ref] = true;
            }
            if (utilities.isNonNullObject(obj)) {
              Object.keys(obj).forEach(function(key) {
                var child = obj[key];
                if (utilities.isNonNullObject(child)) {
                  workSet_1.add(child);
                }
              });
            }
          });
        }
        return this.refs[dataId];
      };
      EntityStore.prototype.makeCacheKey = function() {
        return this.group.keyMaker.lookupArray(arguments);
      };
      return EntityStore;
    })();
    var CacheGroup = (function() {
      function CacheGroup2(caching, parent) {
        if (parent === void 0) {
          parent = null;
        }
        this.caching = caching;
        this.parent = parent;
        this.d = null;
        this.resetCaching();
      }
      CacheGroup2.prototype.resetCaching = function() {
        this.d = this.caching ? optimism.dep() : null;
        this.keyMaker = new trie.Trie(utilities.canUseWeakMap);
      };
      CacheGroup2.prototype.depend = function(dataId, storeFieldName) {
        if (this.d) {
          this.d(makeDepKey(dataId, storeFieldName));
          var fieldName = fieldNameFromStoreName(storeFieldName);
          if (fieldName !== storeFieldName) {
            this.d(makeDepKey(dataId, fieldName));
          }
          if (this.parent) {
            this.parent.depend(dataId, storeFieldName);
          }
        }
      };
      CacheGroup2.prototype.dirty = function(dataId, storeFieldName) {
        if (this.d) {
          this.d.dirty(
            makeDepKey(dataId, storeFieldName),
            storeFieldName === "__exists" ? "forget" : "setDirty"
          );
        }
      };
      return CacheGroup2;
    })();
    function makeDepKey(dataId, storeFieldName) {
      return storeFieldName + "#" + dataId;
    }
    function maybeDependOnExistenceOfEntity(store, entityId) {
      if (supportsResultCaching(store)) {
        store.group.depend(entityId, "__exists");
      }
    }
    (function(EntityStore) {
      var Root = (function(_super) {
        tslib.__extends(Root2, _super);
        function Root2(_a2) {
          var policies = _a2.policies, _b = _a2.resultCaching, resultCaching = _b === void 0 ? true : _b, seed = _a2.seed;
          var _this = _super.call(this, policies, new CacheGroup(resultCaching)) || this;
          _this.stump = new Stump(_this);
          _this.storageTrie = new trie.Trie(utilities.canUseWeakMap);
          if (seed)
            _this.replace(seed);
          return _this;
        }
        Root2.prototype.addLayer = function(layerId, replay) {
          return this.stump.addLayer(layerId, replay);
        };
        Root2.prototype.removeLayer = function() {
          return this;
        };
        Root2.prototype.getStorage = function() {
          return this.storageTrie.lookupArray(arguments);
        };
        return Root2;
      })(EntityStore);
      EntityStore.Root = Root;
    })(exports.EntityStore || (exports.EntityStore = {}));
    var Layer = (function(_super) {
      tslib.__extends(Layer2, _super);
      function Layer2(id, parent, replay, group) {
        var _this = _super.call(this, parent.policies, group) || this;
        _this.id = id;
        _this.parent = parent;
        _this.replay = replay;
        _this.group = group;
        replay(_this);
        return _this;
      }
      Layer2.prototype.addLayer = function(layerId, replay) {
        return new Layer2(layerId, this, replay, this.group);
      };
      Layer2.prototype.removeLayer = function(layerId) {
        var _this = this;
        var parent = this.parent.removeLayer(layerId);
        if (layerId === this.id) {
          if (this.group.caching) {
            Object.keys(this.data).forEach(function(dataId) {
              var ownStoreObject = _this.data[dataId];
              var parentStoreObject = parent["lookup"](dataId);
              if (!parentStoreObject) {
                _this.delete(dataId);
              } else if (!ownStoreObject) {
                _this.group.dirty(dataId, "__exists");
                Object.keys(parentStoreObject).forEach(function(storeFieldName) {
                  _this.group.dirty(dataId, storeFieldName);
                });
              } else if (ownStoreObject !== parentStoreObject) {
                Object.keys(ownStoreObject).forEach(function(storeFieldName) {
                  if (!equal2.equal(ownStoreObject[storeFieldName], parentStoreObject[storeFieldName])) {
                    _this.group.dirty(dataId, storeFieldName);
                  }
                });
              }
            });
          }
          return parent;
        }
        if (parent === this.parent)
          return this;
        return parent.addLayer(this.id, this.replay);
      };
      Layer2.prototype.toObject = function() {
        return tslib.__assign(tslib.__assign({}, this.parent.toObject()), this.data);
      };
      Layer2.prototype.findChildRefIds = function(dataId) {
        var fromParent = this.parent.findChildRefIds(dataId);
        return hasOwn.call(this.data, dataId) ? tslib.__assign(tslib.__assign({}, fromParent), _super.prototype.findChildRefIds.call(this, dataId)) : fromParent;
      };
      Layer2.prototype.getStorage = function() {
        var p = this.parent;
        while (p.parent)
          p = p.parent;
        return p.getStorage.apply(
          p,
          arguments
        );
      };
      return Layer2;
    })(exports.EntityStore);
    var Stump = (function(_super) {
      tslib.__extends(Stump2, _super);
      function Stump2(root2) {
        return _super.call(this, "EntityStore.Stump", root2, function() {
        }, new CacheGroup(root2.group.caching, root2.group)) || this;
      }
      Stump2.prototype.removeLayer = function() {
        return this;
      };
      Stump2.prototype.merge = function(older, newer) {
        return this.parent.merge(older, newer);
      };
      return Stump2;
    })(Layer);
    function storeObjectReconciler(existingObject, incomingObject, property) {
      var existingValue = existingObject[property];
      var incomingValue = incomingObject[property];
      return equal2.equal(existingValue, incomingValue) ? existingValue : incomingValue;
    }
    function supportsResultCaching(store) {
      return !!(store instanceof exports.EntityStore && store.group.caching);
    }
    function shallowCopy(value) {
      if (utilities.isNonNullObject(value)) {
        return utilities.isArray(value) ? value.slice(0) : tslib.__assign({ __proto__: Object.getPrototypeOf(value) }, value);
      }
      return value;
    }
    var ObjectCanon = (function() {
      function ObjectCanon2() {
        this.known = new (utilities.canUseWeakSet ? WeakSet : Set)();
        this.pool = new trie.Trie(utilities.canUseWeakMap);
        this.passes = /* @__PURE__ */ new WeakMap();
        this.keysByJSON = /* @__PURE__ */ new Map();
        this.empty = this.admit({});
      }
      ObjectCanon2.prototype.isKnown = function(value) {
        return utilities.isNonNullObject(value) && this.known.has(value);
      };
      ObjectCanon2.prototype.pass = function(value) {
        if (utilities.isNonNullObject(value)) {
          var copy = shallowCopy(value);
          this.passes.set(copy, value);
          return copy;
        }
        return value;
      };
      ObjectCanon2.prototype.admit = function(value) {
        var _this = this;
        if (utilities.isNonNullObject(value)) {
          var original = this.passes.get(value);
          if (original)
            return original;
          var proto = Object.getPrototypeOf(value);
          switch (proto) {
            case Array.prototype: {
              if (this.known.has(value))
                return value;
              var array = value.map(this.admit, this);
              var node = this.pool.lookupArray(array);
              if (!node.array) {
                this.known.add(node.array = array);
                if (globalThis.__DEV__ !== false) {
                  Object.freeze(array);
                }
              }
              return node.array;
            }
            case null:
            case Object.prototype: {
              if (this.known.has(value))
                return value;
              var proto_1 = Object.getPrototypeOf(value);
              var array_1 = [proto_1];
              var keys = this.sortedKeys(value);
              array_1.push(keys.json);
              var firstValueIndex_1 = array_1.length;
              keys.sorted.forEach(function(key) {
                array_1.push(_this.admit(value[key]));
              });
              var node = this.pool.lookupArray(array_1);
              if (!node.object) {
                var obj_1 = node.object = Object.create(proto_1);
                this.known.add(obj_1);
                keys.sorted.forEach(function(key, i) {
                  obj_1[key] = array_1[firstValueIndex_1 + i];
                });
                if (globalThis.__DEV__ !== false) {
                  Object.freeze(obj_1);
                }
              }
              return node.object;
            }
          }
        }
        return value;
      };
      ObjectCanon2.prototype.sortedKeys = function(obj) {
        var keys = Object.keys(obj);
        var node = this.pool.lookupArray(keys);
        if (!node.keys) {
          keys.sort();
          var json = JSON.stringify(keys);
          if (!(node.keys = this.keysByJSON.get(json))) {
            this.keysByJSON.set(json, node.keys = { sorted: keys, json });
          }
        }
        return node.keys;
      };
      return ObjectCanon2;
    })();
    function execSelectionSetKeyArgs(options) {
      return [
        options.selectionSet,
        options.objectOrReference,
        options.context,
        options.context.canonizeResults
      ];
    }
    var StoreReader = (function() {
      function StoreReader2(config) {
        var _this = this;
        this.knownResults = new (utilities.canUseWeakMap ? WeakMap : Map)();
        this.config = utilities.compact(config, {
          addTypename: config.addTypename !== false,
          canonizeResults: shouldCanonizeResults(config)
        });
        this.canon = config.canon || new ObjectCanon();
        this.executeSelectionSet = optimism.wrap(function(options) {
          var _a2;
          var canonizeResults = options.context.canonizeResults;
          var peekArgs = execSelectionSetKeyArgs(options);
          peekArgs[3] = !canonizeResults;
          var other = (_a2 = _this.executeSelectionSet).peek.apply(_a2, peekArgs);
          if (other) {
            if (canonizeResults) {
              return tslib.__assign(tslib.__assign({}, other), {
                result: _this.canon.admit(other.result)
              });
            }
            return other;
          }
          maybeDependOnExistenceOfEntity(options.context.store, options.enclosingRef.__ref);
          return _this.execSelectionSetImpl(options);
        }, {
          max: this.config.resultCacheMaxSize || utilities.cacheSizes["inMemoryCache.executeSelectionSet"] || 5e4,
          keyArgs: execSelectionSetKeyArgs,
          makeCacheKey: function(selectionSet, parent, context, canonizeResults) {
            if (supportsResultCaching(context.store)) {
              return context.store.makeCacheKey(selectionSet, utilities.isReference(parent) ? parent.__ref : parent, context.varString, canonizeResults);
            }
          }
        });
        this.executeSubSelectedArray = optimism.wrap(function(options) {
          maybeDependOnExistenceOfEntity(options.context.store, options.enclosingRef.__ref);
          return _this.execSubSelectedArrayImpl(options);
        }, {
          max: this.config.resultCacheMaxSize || utilities.cacheSizes["inMemoryCache.executeSubSelectedArray"] || 1e4,
          makeCacheKey: function(_a2) {
            var field = _a2.field, array = _a2.array, context = _a2.context;
            if (supportsResultCaching(context.store)) {
              return context.store.makeCacheKey(field, array, context.varString);
            }
          }
        });
      }
      StoreReader2.prototype.resetCanon = function() {
        this.canon = new ObjectCanon();
      };
      StoreReader2.prototype.diffQueryAgainstStore = function(_a2) {
        var store = _a2.store, query = _a2.query, _b = _a2.rootId, rootId = _b === void 0 ? "ROOT_QUERY" : _b, variables = _a2.variables, _c = _a2.returnPartialData, returnPartialData = _c === void 0 ? true : _c, _d = _a2.canonizeResults, canonizeResults = _d === void 0 ? this.config.canonizeResults : _d;
        var policies = this.config.cache.policies;
        variables = tslib.__assign(tslib.__assign({}, utilities.getDefaultValues(utilities.getQueryDefinition(query))), variables);
        var rootRef = utilities.makeReference(rootId);
        var execResult = this.executeSelectionSet({
          selectionSet: utilities.getMainDefinition(query).selectionSet,
          objectOrReference: rootRef,
          enclosingRef: rootRef,
          context: tslib.__assign({ store, query, policies, variables, varString: utilities.canonicalStringify(variables), canonizeResults }, extractFragmentContext(query, this.config.fragments))
        });
        var missing;
        if (execResult.missing) {
          missing = [
            new MissingFieldError(firstMissing(execResult.missing), execResult.missing, query, variables)
          ];
          if (!returnPartialData) {
            throw missing[0];
          }
        }
        return {
          result: execResult.result,
          complete: !missing,
          missing
        };
      };
      StoreReader2.prototype.isFresh = function(result2, parent, selectionSet, context) {
        if (supportsResultCaching(context.store) && this.knownResults.get(result2) === selectionSet) {
          var latest = this.executeSelectionSet.peek(
            selectionSet,
            parent,
            context,
            this.canon.isKnown(result2)
          );
          if (latest && result2 === latest.result) {
            return true;
          }
        }
        return false;
      };
      StoreReader2.prototype.execSelectionSetImpl = function(_a2) {
        var _this = this;
        var selectionSet = _a2.selectionSet, objectOrReference = _a2.objectOrReference, enclosingRef = _a2.enclosingRef, context = _a2.context;
        if (utilities.isReference(objectOrReference) && !context.policies.rootTypenamesById[objectOrReference.__ref] && !context.store.has(objectOrReference.__ref)) {
          return {
            result: this.canon.empty,
            missing: "Dangling reference to missing ".concat(objectOrReference.__ref, " object")
          };
        }
        var variables = context.variables, policies = context.policies, store = context.store;
        var typename = store.getFieldValue(objectOrReference, "__typename");
        var objectsToMerge = [];
        var missing;
        var missingMerger = new utilities.DeepMerger();
        if (this.config.addTypename && typeof typename === "string" && !policies.rootIdsByTypename[typename]) {
          objectsToMerge.push({ __typename: typename });
        }
        function handleMissing(result3, resultName) {
          var _a3;
          if (result3.missing) {
            missing = missingMerger.merge(missing, (_a3 = {}, _a3[resultName] = result3.missing, _a3));
          }
          return result3.result;
        }
        var workSet = new Set(selectionSet.selections);
        workSet.forEach(function(selection) {
          var _a3, _b;
          if (!utilities.shouldInclude(selection, variables))
            return;
          if (utilities.isField(selection)) {
            var fieldValue = policies.readField({
              fieldName: selection.name.value,
              field: selection,
              variables: context.variables,
              from: objectOrReference
            }, context);
            var resultName = utilities.resultKeyNameFromField(selection);
            if (fieldValue === void 0) {
              if (!utilities.addTypenameToDocument.added(selection)) {
                missing = missingMerger.merge(missing, (_a3 = {}, _a3[resultName] = "Can't find field '".concat(selection.name.value, "' on ").concat(utilities.isReference(objectOrReference) ? objectOrReference.__ref + " object" : "object " + JSON.stringify(objectOrReference, null, 2)), _a3));
              }
            } else if (utilities.isArray(fieldValue)) {
              if (fieldValue.length > 0) {
                fieldValue = handleMissing(_this.executeSubSelectedArray({
                  field: selection,
                  array: fieldValue,
                  enclosingRef,
                  context
                }), resultName);
              }
            } else if (!selection.selectionSet) {
              if (context.canonizeResults) {
                fieldValue = _this.canon.pass(fieldValue);
              }
            } else if (fieldValue != null) {
              fieldValue = handleMissing(_this.executeSelectionSet({
                selectionSet: selection.selectionSet,
                objectOrReference: fieldValue,
                enclosingRef: utilities.isReference(fieldValue) ? fieldValue : enclosingRef,
                context
              }), resultName);
            }
            if (fieldValue !== void 0) {
              objectsToMerge.push((_b = {}, _b[resultName] = fieldValue, _b));
            }
          } else {
            var fragment = utilities.getFragmentFromSelection(selection, context.lookupFragment);
            if (!fragment && selection.kind === graphql2.Kind.FRAGMENT_SPREAD) {
              throw globals.newInvariantError(10, selection.name.value);
            }
            if (fragment && policies.fragmentMatches(fragment, typename)) {
              fragment.selectionSet.selections.forEach(workSet.add, workSet);
            }
          }
        });
        var result2 = utilities.mergeDeepArray(objectsToMerge);
        var finalResult = { result: result2, missing };
        var frozen = context.canonizeResults ? this.canon.admit(finalResult) : utilities.maybeDeepFreeze(finalResult);
        if (frozen.result) {
          this.knownResults.set(frozen.result, selectionSet);
        }
        return frozen;
      };
      StoreReader2.prototype.execSubSelectedArrayImpl = function(_a2) {
        var _this = this;
        var field = _a2.field, array = _a2.array, enclosingRef = _a2.enclosingRef, context = _a2.context;
        var missing;
        var missingMerger = new utilities.DeepMerger();
        function handleMissing(childResult, i) {
          var _a3;
          if (childResult.missing) {
            missing = missingMerger.merge(missing, (_a3 = {}, _a3[i] = childResult.missing, _a3));
          }
          return childResult.result;
        }
        if (field.selectionSet) {
          array = array.filter(context.store.canRead);
        }
        array = array.map(function(item, i) {
          if (item === null) {
            return null;
          }
          if (utilities.isArray(item)) {
            return handleMissing(_this.executeSubSelectedArray({
              field,
              array: item,
              enclosingRef,
              context
            }), i);
          }
          if (field.selectionSet) {
            return handleMissing(_this.executeSelectionSet({
              selectionSet: field.selectionSet,
              objectOrReference: item,
              enclosingRef: utilities.isReference(item) ? item : enclosingRef,
              context
            }), i);
          }
          if (globalThis.__DEV__ !== false) {
            assertSelectionSetForIdValue(context.store, field, item);
          }
          return item;
        });
        return {
          result: context.canonizeResults ? this.canon.admit(array) : array,
          missing
        };
      };
      return StoreReader2;
    })();
    function firstMissing(tree) {
      try {
        JSON.stringify(tree, function(_, value) {
          if (typeof value === "string")
            throw value;
          return value;
        });
      } catch (result2) {
        return result2;
      }
    }
    function assertSelectionSetForIdValue(store, field, fieldValue) {
      if (!field.selectionSet) {
        var workSet_1 = /* @__PURE__ */ new Set([fieldValue]);
        workSet_1.forEach(function(value) {
          if (utilities.isNonNullObject(value)) {
            globals.invariant(
              !utilities.isReference(value),
              11,
              getTypenameFromStoreObject(store, value),
              field.name.value
            );
            Object.values(value).forEach(workSet_1.add, workSet_1);
          }
        });
      }
    }
    var cacheSlot = new optimism.Slot();
    var cacheInfoMap = /* @__PURE__ */ new WeakMap();
    function getCacheInfo(cache) {
      var info = cacheInfoMap.get(cache);
      if (!info) {
        cacheInfoMap.set(cache, info = {
          vars: /* @__PURE__ */ new Set(),
          dep: optimism.dep()
        });
      }
      return info;
    }
    function forgetCache(cache) {
      getCacheInfo(cache).vars.forEach(function(rv) {
        return rv.forgetCache(cache);
      });
    }
    function recallCache(cache) {
      getCacheInfo(cache).vars.forEach(function(rv) {
        return rv.attachCache(cache);
      });
    }
    function makeVar(value) {
      var caches3 = /* @__PURE__ */ new Set();
      var listeners = /* @__PURE__ */ new Set();
      var rv = function(newValue) {
        if (arguments.length > 0) {
          if (value !== newValue) {
            value = newValue;
            caches3.forEach(function(cache2) {
              getCacheInfo(cache2).dep.dirty(rv);
              broadcast(cache2);
            });
            var oldListeners = Array.from(listeners);
            listeners.clear();
            oldListeners.forEach(function(listener) {
              return listener(value);
            });
          }
        } else {
          var cache = cacheSlot.getValue();
          if (cache) {
            attach(cache);
            getCacheInfo(cache).dep(rv);
          }
        }
        return value;
      };
      rv.onNextChange = function(listener) {
        listeners.add(listener);
        return function() {
          listeners.delete(listener);
        };
      };
      var attach = rv.attachCache = function(cache) {
        caches3.add(cache);
        getCacheInfo(cache).vars.add(rv);
        return rv;
      };
      rv.forgetCache = function(cache) {
        return caches3.delete(cache);
      };
      return rv;
    }
    function broadcast(cache) {
      if (cache.broadcastWatches) {
        cache.broadcastWatches();
      }
    }
    var specifierInfoCache = /* @__PURE__ */ Object.create(null);
    function lookupSpecifierInfo(spec) {
      var cacheKey = JSON.stringify(spec);
      return specifierInfoCache[cacheKey] || (specifierInfoCache[cacheKey] = /* @__PURE__ */ Object.create(null));
    }
    function keyFieldsFnFromSpecifier(specifier) {
      var info = lookupSpecifierInfo(specifier);
      return info.keyFieldsFn || (info.keyFieldsFn = function(object, context) {
        var extract = function(from3, key) {
          return context.readField(key, from3);
        };
        var keyObject = context.keyObject = collectSpecifierPaths(specifier, function(schemaKeyPath) {
          var extracted = extractKeyPath(
            context.storeObject,
            schemaKeyPath,
            extract
          );
          if (extracted === void 0 && object !== context.storeObject && hasOwn.call(object, schemaKeyPath[0])) {
            extracted = extractKeyPath(object, schemaKeyPath, extractKey);
          }
          globals.invariant(extracted !== void 0, 5, schemaKeyPath.join("."), object);
          return extracted;
        });
        return "".concat(context.typename, ":").concat(JSON.stringify(keyObject));
      });
    }
    function keyArgsFnFromSpecifier(specifier) {
      var info = lookupSpecifierInfo(specifier);
      return info.keyArgsFn || (info.keyArgsFn = function(args, _a2) {
        var field = _a2.field, variables = _a2.variables, fieldName = _a2.fieldName;
        var collected = collectSpecifierPaths(specifier, function(keyPath) {
          var firstKey = keyPath[0];
          var firstChar = firstKey.charAt(0);
          if (firstChar === "@") {
            if (field && utilities.isNonEmptyArray(field.directives)) {
              var directiveName_1 = firstKey.slice(1);
              var d = field.directives.find(function(d2) {
                return d2.name.value === directiveName_1;
              });
              var directiveArgs = d && utilities.argumentsObjectFromField(d, variables);
              return directiveArgs && extractKeyPath(
                directiveArgs,
                keyPath.slice(1)
              );
            }
            return;
          }
          if (firstChar === "$") {
            var variableName = firstKey.slice(1);
            if (variables && hasOwn.call(variables, variableName)) {
              var varKeyPath = keyPath.slice(0);
              varKeyPath[0] = variableName;
              return extractKeyPath(variables, varKeyPath);
            }
            return;
          }
          if (args) {
            return extractKeyPath(args, keyPath);
          }
        });
        var suffix = JSON.stringify(collected);
        if (args || suffix !== "{}") {
          fieldName += ":" + suffix;
        }
        return fieldName;
      });
    }
    function collectSpecifierPaths(specifier, extractor) {
      var merger = new utilities.DeepMerger();
      return getSpecifierPaths(specifier).reduce(function(collected, path) {
        var _a2;
        var toMerge = extractor(path);
        if (toMerge !== void 0) {
          for (var i = path.length - 1; i >= 0; --i) {
            toMerge = (_a2 = {}, _a2[path[i]] = toMerge, _a2);
          }
          collected = merger.merge(collected, toMerge);
        }
        return collected;
      }, /* @__PURE__ */ Object.create(null));
    }
    function getSpecifierPaths(spec) {
      var info = lookupSpecifierInfo(spec);
      if (!info.paths) {
        var paths_1 = info.paths = [];
        var currentPath_1 = [];
        spec.forEach(function(s, i) {
          if (utilities.isArray(s)) {
            getSpecifierPaths(s).forEach(function(p) {
              return paths_1.push(currentPath_1.concat(p));
            });
            currentPath_1.length = 0;
          } else {
            currentPath_1.push(s);
            if (!utilities.isArray(spec[i + 1])) {
              paths_1.push(currentPath_1.slice(0));
              currentPath_1.length = 0;
            }
          }
        });
      }
      return info.paths;
    }
    function extractKey(object, key) {
      return object[key];
    }
    function extractKeyPath(object, path, extract) {
      extract = extract || extractKey;
      return normalize2(path.reduce(function reducer(obj, key) {
        return utilities.isArray(obj) ? obj.map(function(child) {
          return reducer(child, key);
        }) : obj && extract(obj, key);
      }, object));
    }
    function normalize2(value) {
      if (utilities.isNonNullObject(value)) {
        if (utilities.isArray(value)) {
          return value.map(normalize2);
        }
        return collectSpecifierPaths(Object.keys(value).sort(), function(path) {
          return extractKeyPath(value, path);
        });
      }
      return value;
    }
    function argsFromFieldSpecifier(spec) {
      return spec.args !== void 0 ? spec.args : spec.field ? utilities.argumentsObjectFromField(spec.field, spec.variables) : null;
    }
    var nullKeyFieldsFn = function() {
      return void 0;
    };
    var simpleKeyArgsFn = function(_args, context) {
      return context.fieldName;
    };
    var mergeTrueFn = function(existing, incoming, _a2) {
      var mergeObjects = _a2.mergeObjects;
      return mergeObjects(existing, incoming);
    };
    var mergeFalseFn = function(_, incoming) {
      return incoming;
    };
    var Policies = (function() {
      function Policies2(config) {
        this.config = config;
        this.typePolicies = /* @__PURE__ */ Object.create(null);
        this.toBeAdded = /* @__PURE__ */ Object.create(null);
        this.supertypeMap = /* @__PURE__ */ new Map();
        this.fuzzySubtypes = /* @__PURE__ */ new Map();
        this.rootIdsByTypename = /* @__PURE__ */ Object.create(null);
        this.rootTypenamesById = /* @__PURE__ */ Object.create(null);
        this.usingPossibleTypes = false;
        this.config = tslib.__assign({ dataIdFromObject: defaultDataIdFromObject }, config);
        this.cache = this.config.cache;
        this.setRootTypename("Query");
        this.setRootTypename("Mutation");
        this.setRootTypename("Subscription");
        if (config.possibleTypes) {
          this.addPossibleTypes(config.possibleTypes);
        }
        if (config.typePolicies) {
          this.addTypePolicies(config.typePolicies);
        }
      }
      Policies2.prototype.identify = function(object, partialContext) {
        var _a2;
        var policies = this;
        var typename = partialContext && (partialContext.typename || ((_a2 = partialContext.storeObject) === null || _a2 === void 0 ? void 0 : _a2.__typename)) || object.__typename;
        if (typename === this.rootTypenamesById.ROOT_QUERY) {
          return ["ROOT_QUERY"];
        }
        var storeObject = partialContext && partialContext.storeObject || object;
        var context = tslib.__assign(tslib.__assign({}, partialContext), { typename, storeObject, readField: partialContext && partialContext.readField || function() {
          var options = normalizeReadFieldOptions(arguments, storeObject);
          return policies.readField(options, {
            store: policies.cache["data"],
            variables: options.variables
          });
        } });
        var id;
        var policy = typename && this.getTypePolicy(typename);
        var keyFn = policy && policy.keyFn || this.config.dataIdFromObject;
        masking.disableWarningsSlot.withValue(true, function() {
          while (keyFn) {
            var specifierOrId = keyFn(tslib.__assign(tslib.__assign({}, object), storeObject), context);
            if (utilities.isArray(specifierOrId)) {
              keyFn = keyFieldsFnFromSpecifier(specifierOrId);
            } else {
              id = specifierOrId;
              break;
            }
          }
        });
        id = id ? String(id) : void 0;
        return context.keyObject ? [id, context.keyObject] : [id];
      };
      Policies2.prototype.addTypePolicies = function(typePolicies) {
        var _this = this;
        Object.keys(typePolicies).forEach(function(typename) {
          var _a2 = typePolicies[typename], queryType = _a2.queryType, mutationType = _a2.mutationType, subscriptionType = _a2.subscriptionType, incoming = tslib.__rest(_a2, ["queryType", "mutationType", "subscriptionType"]);
          if (queryType)
            _this.setRootTypename("Query", typename);
          if (mutationType)
            _this.setRootTypename("Mutation", typename);
          if (subscriptionType)
            _this.setRootTypename("Subscription", typename);
          if (hasOwn.call(_this.toBeAdded, typename)) {
            _this.toBeAdded[typename].push(incoming);
          } else {
            _this.toBeAdded[typename] = [incoming];
          }
        });
      };
      Policies2.prototype.updateTypePolicy = function(typename, incoming, existingFieldPolicies) {
        var existing = this.getTypePolicy(typename);
        var keyFields = incoming.keyFields, fields = incoming.fields;
        function setMerge(existing2, merge) {
          existing2.merge = typeof merge === "function" ? merge : merge === true ? mergeTrueFn : merge === false ? mergeFalseFn : existing2.merge;
        }
        setMerge(existing, incoming.merge);
        existing.keyFn = keyFields === false ? nullKeyFieldsFn : utilities.isArray(keyFields) ? keyFieldsFnFromSpecifier(keyFields) : typeof keyFields === "function" ? keyFields : existing.keyFn;
        if (fields) {
          Object.keys(fields).forEach(function(fieldName) {
            var existing2 = existingFieldPolicies[fieldName];
            if (!existing2 || (existing2 === null || existing2 === void 0 ? void 0 : existing2.typename) !== typename) {
              existing2 = existingFieldPolicies[fieldName] = { typename };
            }
            var incoming2 = fields[fieldName];
            if (typeof incoming2 === "function") {
              existing2.read = incoming2;
            } else {
              var keyArgs = incoming2.keyArgs, read = incoming2.read, merge = incoming2.merge;
              existing2.keyFn = keyArgs === false ? simpleKeyArgsFn : utilities.isArray(keyArgs) ? keyArgsFnFromSpecifier(keyArgs) : typeof keyArgs === "function" ? keyArgs : existing2.keyFn;
              if (typeof read === "function") {
                existing2.read = read;
              }
              setMerge(existing2, merge);
            }
            if (existing2.read && existing2.merge) {
              existing2.keyFn = existing2.keyFn || simpleKeyArgsFn;
            }
          });
        }
      };
      Policies2.prototype.setRootTypename = function(which, typename) {
        if (typename === void 0) {
          typename = which;
        }
        var rootId = "ROOT_" + which.toUpperCase();
        var old = this.rootTypenamesById[rootId];
        if (typename !== old) {
          globals.invariant(!old || old === which, 6, which);
          if (old)
            delete this.rootIdsByTypename[old];
          this.rootIdsByTypename[typename] = rootId;
          this.rootTypenamesById[rootId] = typename;
        }
      };
      Policies2.prototype.addPossibleTypes = function(possibleTypes) {
        var _this = this;
        this.usingPossibleTypes = true;
        Object.keys(possibleTypes).forEach(function(supertype) {
          _this.getSupertypeSet(supertype, true);
          possibleTypes[supertype].forEach(function(subtype) {
            _this.getSupertypeSet(subtype, true).add(supertype);
            var match = subtype.match(TypeOrFieldNameRegExp);
            if (!match || match[0] !== subtype) {
              _this.fuzzySubtypes.set(subtype, new RegExp(subtype));
            }
          });
        });
      };
      Policies2.prototype.getTypePolicy = function(typename) {
        var _this = this;
        if (!hasOwn.call(this.typePolicies, typename)) {
          var policy_1 = this.typePolicies[typename] = /* @__PURE__ */ Object.create(null);
          policy_1.fields = /* @__PURE__ */ Object.create(null);
          var supertypes_1 = this.supertypeMap.get(typename);
          if (!supertypes_1 && this.fuzzySubtypes.size) {
            supertypes_1 = this.getSupertypeSet(typename, true);
            this.fuzzySubtypes.forEach(function(regExp, fuzzy) {
              if (regExp.test(typename)) {
                var fuzzySupertypes = _this.supertypeMap.get(fuzzy);
                if (fuzzySupertypes) {
                  fuzzySupertypes.forEach(function(supertype) {
                    return supertypes_1.add(supertype);
                  });
                }
              }
            });
          }
          if (supertypes_1 && supertypes_1.size) {
            supertypes_1.forEach(function(supertype) {
              var _a2 = _this.getTypePolicy(supertype), fields = _a2.fields, rest = tslib.__rest(_a2, ["fields"]);
              Object.assign(policy_1, rest);
              Object.assign(policy_1.fields, fields);
            });
          }
        }
        var inbox = this.toBeAdded[typename];
        if (inbox && inbox.length) {
          inbox.splice(0).forEach(function(policy) {
            _this.updateTypePolicy(typename, policy, _this.typePolicies[typename].fields);
          });
        }
        return this.typePolicies[typename];
      };
      Policies2.prototype.getFieldPolicy = function(typename, fieldName) {
        if (typename) {
          return this.getTypePolicy(typename).fields[fieldName];
        }
      };
      Policies2.prototype.getSupertypeSet = function(subtype, createIfMissing) {
        var supertypeSet = this.supertypeMap.get(subtype);
        if (!supertypeSet && createIfMissing) {
          this.supertypeMap.set(subtype, supertypeSet = /* @__PURE__ */ new Set());
        }
        return supertypeSet;
      };
      Policies2.prototype.fragmentMatches = function(fragment, typename, result2, variables) {
        var _this = this;
        if (!fragment.typeCondition)
          return true;
        if (!typename)
          return false;
        var supertype = fragment.typeCondition.name.value;
        if (typename === supertype)
          return true;
        if (this.usingPossibleTypes && this.supertypeMap.has(supertype)) {
          var typenameSupertypeSet = this.getSupertypeSet(typename, true);
          var workQueue_1 = [typenameSupertypeSet];
          var maybeEnqueue_1 = function(subtype) {
            var supertypeSet2 = _this.getSupertypeSet(subtype, false);
            if (supertypeSet2 && supertypeSet2.size && workQueue_1.indexOf(supertypeSet2) < 0) {
              workQueue_1.push(supertypeSet2);
            }
          };
          var needToCheckFuzzySubtypes = !!(result2 && this.fuzzySubtypes.size);
          var checkingFuzzySubtypes = false;
          for (var i = 0; i < workQueue_1.length; ++i) {
            var supertypeSet = workQueue_1[i];
            if (supertypeSet.has(supertype)) {
              if (!typenameSupertypeSet.has(supertype)) {
                if (checkingFuzzySubtypes) {
                  globalThis.__DEV__ !== false && globals.invariant.warn(7, typename, supertype);
                }
                typenameSupertypeSet.add(supertype);
              }
              return true;
            }
            supertypeSet.forEach(maybeEnqueue_1);
            if (needToCheckFuzzySubtypes && i === workQueue_1.length - 1 && selectionSetMatchesResult(fragment.selectionSet, result2, variables)) {
              needToCheckFuzzySubtypes = false;
              checkingFuzzySubtypes = true;
              this.fuzzySubtypes.forEach(function(regExp, fuzzyString) {
                var match = typename.match(regExp);
                if (match && match[0] === typename) {
                  maybeEnqueue_1(fuzzyString);
                }
              });
            }
          }
        }
        return false;
      };
      Policies2.prototype.hasKeyArgs = function(typename, fieldName) {
        var policy = this.getFieldPolicy(typename, fieldName);
        return !!(policy && policy.keyFn);
      };
      Policies2.prototype.getStoreFieldName = function(fieldSpec) {
        var typename = fieldSpec.typename, fieldName = fieldSpec.fieldName;
        var policy = this.getFieldPolicy(typename, fieldName);
        var storeFieldName;
        var keyFn = policy && policy.keyFn;
        if (keyFn && typename) {
          var context = {
            typename,
            fieldName,
            field: fieldSpec.field || null,
            variables: fieldSpec.variables
          };
          var args = argsFromFieldSpecifier(fieldSpec);
          while (keyFn) {
            var specifierOrString = keyFn(args, context);
            if (utilities.isArray(specifierOrString)) {
              keyFn = keyArgsFnFromSpecifier(specifierOrString);
            } else {
              storeFieldName = specifierOrString || fieldName;
              break;
            }
          }
        }
        if (storeFieldName === void 0) {
          storeFieldName = fieldSpec.field ? utilities.storeKeyNameFromField(fieldSpec.field, fieldSpec.variables) : utilities.getStoreKeyName(fieldName, argsFromFieldSpecifier(fieldSpec));
        }
        if (storeFieldName === false) {
          return fieldName;
        }
        return fieldName === fieldNameFromStoreName(storeFieldName) ? storeFieldName : fieldName + ":" + storeFieldName;
      };
      Policies2.prototype.readField = function(options, context) {
        var objectOrReference = options.from;
        if (!objectOrReference)
          return;
        var nameOrField = options.field || options.fieldName;
        if (!nameOrField)
          return;
        if (options.typename === void 0) {
          var typename = context.store.getFieldValue(objectOrReference, "__typename");
          if (typename)
            options.typename = typename;
        }
        var storeFieldName = this.getStoreFieldName(options);
        var fieldName = fieldNameFromStoreName(storeFieldName);
        var existing = context.store.getFieldValue(objectOrReference, storeFieldName);
        var policy = this.getFieldPolicy(options.typename, fieldName);
        var read = policy && policy.read;
        if (read) {
          var readOptions = makeFieldFunctionOptions(this, objectOrReference, options, context, context.store.getStorage(utilities.isReference(objectOrReference) ? objectOrReference.__ref : objectOrReference, storeFieldName));
          return cacheSlot.withValue(this.cache, read, [
            existing,
            readOptions
          ]);
        }
        return existing;
      };
      Policies2.prototype.getReadFunction = function(typename, fieldName) {
        var policy = this.getFieldPolicy(typename, fieldName);
        return policy && policy.read;
      };
      Policies2.prototype.getMergeFunction = function(parentTypename, fieldName, childTypename) {
        var policy = this.getFieldPolicy(parentTypename, fieldName);
        var merge = policy && policy.merge;
        if (!merge && childTypename) {
          policy = this.getTypePolicy(childTypename);
          merge = policy && policy.merge;
        }
        return merge;
      };
      Policies2.prototype.runMergeFunction = function(existing, incoming, _a2, context, storage) {
        var field = _a2.field, typename = _a2.typename, merge = _a2.merge;
        if (merge === mergeTrueFn) {
          return makeMergeObjectsFunction(context.store)(existing, incoming);
        }
        if (merge === mergeFalseFn) {
          return incoming;
        }
        if (context.overwrite) {
          existing = void 0;
        }
        return merge(existing, incoming, makeFieldFunctionOptions(
          this,
          void 0,
          {
            typename,
            fieldName: field.name.value,
            field,
            variables: context.variables
          },
          context,
          storage || /* @__PURE__ */ Object.create(null)
        ));
      };
      return Policies2;
    })();
    function makeFieldFunctionOptions(policies, objectOrReference, fieldSpec, context, storage) {
      var storeFieldName = policies.getStoreFieldName(fieldSpec);
      var fieldName = fieldNameFromStoreName(storeFieldName);
      var variables = fieldSpec.variables || context.variables;
      var _a2 = context.store, toReference = _a2.toReference, canRead = _a2.canRead;
      return {
        args: argsFromFieldSpecifier(fieldSpec),
        field: fieldSpec.field || null,
        fieldName,
        storeFieldName,
        variables,
        isReference: utilities.isReference,
        toReference,
        storage,
        cache: policies.cache,
        canRead,
        readField: function() {
          return policies.readField(normalizeReadFieldOptions(arguments, objectOrReference, variables), context);
        },
        mergeObjects: makeMergeObjectsFunction(context.store)
      };
    }
    function normalizeReadFieldOptions(readFieldArgs, objectOrReference, variables) {
      var fieldNameOrOptions = readFieldArgs[0], from3 = readFieldArgs[1], argc = readFieldArgs.length;
      var options;
      if (typeof fieldNameOrOptions === "string") {
        options = {
          fieldName: fieldNameOrOptions,
          from: argc > 1 ? from3 : objectOrReference
        };
      } else {
        options = tslib.__assign({}, fieldNameOrOptions);
        if (!hasOwn.call(options, "from")) {
          options.from = objectOrReference;
        }
      }
      if (globalThis.__DEV__ !== false && options.from === void 0) {
        globalThis.__DEV__ !== false && globals.invariant.warn(8, utilities.stringifyForDisplay(Array.from(readFieldArgs)));
      }
      if (void 0 === options.variables) {
        options.variables = variables;
      }
      return options;
    }
    function makeMergeObjectsFunction(store) {
      return function mergeObjects(existing, incoming) {
        if (utilities.isArray(existing) || utilities.isArray(incoming)) {
          throw globals.newInvariantError(9);
        }
        if (utilities.isNonNullObject(existing) && utilities.isNonNullObject(incoming)) {
          var eType = store.getFieldValue(existing, "__typename");
          var iType = store.getFieldValue(incoming, "__typename");
          var typesDiffer = eType && iType && eType !== iType;
          if (typesDiffer) {
            return incoming;
          }
          if (utilities.isReference(existing) && storeValueIsStoreObject(incoming)) {
            store.merge(existing.__ref, incoming);
            return existing;
          }
          if (storeValueIsStoreObject(existing) && utilities.isReference(incoming)) {
            store.merge(existing, incoming.__ref);
            return incoming;
          }
          if (storeValueIsStoreObject(existing) && storeValueIsStoreObject(incoming)) {
            return tslib.__assign(tslib.__assign({}, existing), incoming);
          }
        }
        return incoming;
      };
    }
    function getContextFlavor(context, clientOnly, deferred) {
      var key = "".concat(clientOnly).concat(deferred);
      var flavored = context.flavors.get(key);
      if (!flavored) {
        context.flavors.set(key, flavored = context.clientOnly === clientOnly && context.deferred === deferred ? context : tslib.__assign(tslib.__assign({}, context), { clientOnly, deferred }));
      }
      return flavored;
    }
    var StoreWriter = (function() {
      function StoreWriter2(cache, reader, fragments) {
        this.cache = cache;
        this.reader = reader;
        this.fragments = fragments;
      }
      StoreWriter2.prototype.writeToStore = function(store, _a2) {
        var _this = this;
        var query = _a2.query, result2 = _a2.result, dataId = _a2.dataId, variables = _a2.variables, overwrite = _a2.overwrite;
        var operationDefinition = utilities.getOperationDefinition(query);
        var merger = makeProcessedFieldsMerger();
        variables = tslib.__assign(tslib.__assign({}, utilities.getDefaultValues(operationDefinition)), variables);
        var context = tslib.__assign(tslib.__assign({ store, written: /* @__PURE__ */ Object.create(null), merge: function(existing, incoming) {
          return merger.merge(existing, incoming);
        }, variables, varString: utilities.canonicalStringify(variables) }, extractFragmentContext(query, this.fragments)), { overwrite: !!overwrite, incomingById: /* @__PURE__ */ new Map(), clientOnly: false, deferred: false, flavors: /* @__PURE__ */ new Map() });
        var ref = this.processSelectionSet({
          result: result2 || /* @__PURE__ */ Object.create(null),
          dataId,
          selectionSet: operationDefinition.selectionSet,
          mergeTree: { map: /* @__PURE__ */ new Map() },
          context
        });
        if (!utilities.isReference(ref)) {
          throw globals.newInvariantError(12, result2);
        }
        context.incomingById.forEach(function(_a3, dataId2) {
          var storeObject = _a3.storeObject, mergeTree = _a3.mergeTree, fieldNodeSet = _a3.fieldNodeSet;
          var entityRef = utilities.makeReference(dataId2);
          if (mergeTree && mergeTree.map.size) {
            var applied = _this.applyMerges(mergeTree, entityRef, storeObject, context);
            if (utilities.isReference(applied)) {
              return;
            }
            storeObject = applied;
          }
          if (globalThis.__DEV__ !== false && !context.overwrite) {
            var fieldsWithSelectionSets_1 = /* @__PURE__ */ Object.create(null);
            fieldNodeSet.forEach(function(field) {
              if (field.selectionSet) {
                fieldsWithSelectionSets_1[field.name.value] = true;
              }
            });
            var hasSelectionSet_1 = function(storeFieldName) {
              return fieldsWithSelectionSets_1[fieldNameFromStoreName(storeFieldName)] === true;
            };
            var hasMergeFunction_1 = function(storeFieldName) {
              var childTree = mergeTree && mergeTree.map.get(storeFieldName);
              return Boolean(childTree && childTree.info && childTree.info.merge);
            };
            Object.keys(storeObject).forEach(function(storeFieldName) {
              if (hasSelectionSet_1(storeFieldName) && !hasMergeFunction_1(storeFieldName)) {
                warnAboutDataLoss(entityRef, storeObject, storeFieldName, context.store);
              }
            });
          }
          store.merge(dataId2, storeObject);
        });
        store.retain(ref.__ref);
        return ref;
      };
      StoreWriter2.prototype.processSelectionSet = function(_a2) {
        var _this = this;
        var dataId = _a2.dataId, result2 = _a2.result, selectionSet = _a2.selectionSet, context = _a2.context, mergeTree = _a2.mergeTree;
        var policies = this.cache.policies;
        var incoming = /* @__PURE__ */ Object.create(null);
        var typename = dataId && policies.rootTypenamesById[dataId] || utilities.getTypenameFromResult(result2, selectionSet, context.fragmentMap) || dataId && context.store.get(dataId, "__typename");
        if ("string" === typeof typename) {
          incoming.__typename = typename;
        }
        var readField = function() {
          var options = normalizeReadFieldOptions(arguments, incoming, context.variables);
          if (utilities.isReference(options.from)) {
            var info = context.incomingById.get(options.from.__ref);
            if (info) {
              var result_1 = policies.readField(tslib.__assign(tslib.__assign({}, options), { from: info.storeObject }), context);
              if (result_1 !== void 0) {
                return result_1;
              }
            }
          }
          return policies.readField(options, context);
        };
        var fieldNodeSet = /* @__PURE__ */ new Set();
        this.flattenFields(
          selectionSet,
          result2,
          context,
          typename
        ).forEach(function(context2, field) {
          var _a3;
          var resultFieldKey = utilities.resultKeyNameFromField(field);
          var value = result2[resultFieldKey];
          fieldNodeSet.add(field);
          if (value !== void 0) {
            var storeFieldName = policies.getStoreFieldName({
              typename,
              fieldName: field.name.value,
              field,
              variables: context2.variables
            });
            var childTree = getChildMergeTree(mergeTree, storeFieldName);
            var incomingValue = _this.processFieldValue(
              value,
              field,
              field.selectionSet ? getContextFlavor(context2, false, false) : context2,
              childTree
            );
            var childTypename = void 0;
            if (field.selectionSet && (utilities.isReference(incomingValue) || storeValueIsStoreObject(incomingValue))) {
              childTypename = readField("__typename", incomingValue);
            }
            var merge = policies.getMergeFunction(typename, field.name.value, childTypename);
            if (merge) {
              childTree.info = {
                field,
                typename,
                merge
              };
            } else {
              maybeRecycleChildMergeTree(mergeTree, storeFieldName);
            }
            incoming = context2.merge(incoming, (_a3 = {}, _a3[storeFieldName] = incomingValue, _a3));
          } else if (globalThis.__DEV__ !== false && !context2.clientOnly && !context2.deferred && !utilities.addTypenameToDocument.added(field) && !policies.getReadFunction(typename, field.name.value)) {
            globalThis.__DEV__ !== false && globals.invariant.error(13, utilities.resultKeyNameFromField(field), result2);
          }
        });
        try {
          var _b = policies.identify(result2, {
            typename,
            selectionSet,
            fragmentMap: context.fragmentMap,
            storeObject: incoming,
            readField
          }), id = _b[0], keyObject = _b[1];
          dataId = dataId || id;
          if (keyObject) {
            incoming = context.merge(incoming, keyObject);
          }
        } catch (e) {
          if (!dataId)
            throw e;
        }
        if ("string" === typeof dataId) {
          var dataRef = utilities.makeReference(dataId);
          var sets = context.written[dataId] || (context.written[dataId] = []);
          if (sets.indexOf(selectionSet) >= 0)
            return dataRef;
          sets.push(selectionSet);
          if (this.reader && this.reader.isFresh(result2, dataRef, selectionSet, context)) {
            return dataRef;
          }
          var previous_1 = context.incomingById.get(dataId);
          if (previous_1) {
            previous_1.storeObject = context.merge(previous_1.storeObject, incoming);
            previous_1.mergeTree = mergeMergeTrees(previous_1.mergeTree, mergeTree);
            fieldNodeSet.forEach(function(field) {
              return previous_1.fieldNodeSet.add(field);
            });
          } else {
            context.incomingById.set(dataId, {
              storeObject: incoming,
              mergeTree: mergeTreeIsEmpty(mergeTree) ? void 0 : mergeTree,
              fieldNodeSet
            });
          }
          return dataRef;
        }
        return incoming;
      };
      StoreWriter2.prototype.processFieldValue = function(value, field, context, mergeTree) {
        var _this = this;
        if (!field.selectionSet || value === null) {
          return globalThis.__DEV__ !== false ? utilities.cloneDeep(value) : value;
        }
        if (utilities.isArray(value)) {
          return value.map(function(item, i) {
            var value2 = _this.processFieldValue(item, field, context, getChildMergeTree(mergeTree, i));
            maybeRecycleChildMergeTree(mergeTree, i);
            return value2;
          });
        }
        return this.processSelectionSet({
          result: value,
          selectionSet: field.selectionSet,
          context,
          mergeTree
        });
      };
      StoreWriter2.prototype.flattenFields = function(selectionSet, result2, context, typename) {
        if (typename === void 0) {
          typename = utilities.getTypenameFromResult(result2, selectionSet, context.fragmentMap);
        }
        var fieldMap = /* @__PURE__ */ new Map();
        var policies = this.cache.policies;
        var limitingTrie = new trie.Trie(false);
        (function flatten(selectionSet2, inheritedContext) {
          var visitedNode = limitingTrie.lookup(
            selectionSet2,
            inheritedContext.clientOnly,
            inheritedContext.deferred
          );
          if (visitedNode.visited)
            return;
          visitedNode.visited = true;
          selectionSet2.selections.forEach(function(selection) {
            if (!utilities.shouldInclude(selection, context.variables))
              return;
            var clientOnly = inheritedContext.clientOnly, deferred = inheritedContext.deferred;
            if (!(clientOnly && deferred) && utilities.isNonEmptyArray(selection.directives)) {
              selection.directives.forEach(function(dir) {
                var name = dir.name.value;
                if (name === "client")
                  clientOnly = true;
                if (name === "defer") {
                  var args = utilities.argumentsObjectFromField(dir, context.variables);
                  if (!args || args.if !== false) {
                    deferred = true;
                  }
                }
              });
            }
            if (utilities.isField(selection)) {
              var existing = fieldMap.get(selection);
              if (existing) {
                clientOnly = clientOnly && existing.clientOnly;
                deferred = deferred && existing.deferred;
              }
              fieldMap.set(selection, getContextFlavor(context, clientOnly, deferred));
            } else {
              var fragment = utilities.getFragmentFromSelection(selection, context.lookupFragment);
              if (!fragment && selection.kind === graphql2.Kind.FRAGMENT_SPREAD) {
                throw globals.newInvariantError(14, selection.name.value);
              }
              if (fragment && policies.fragmentMatches(fragment, typename, result2, context.variables)) {
                flatten(fragment.selectionSet, getContextFlavor(context, clientOnly, deferred));
              }
            }
          });
        })(selectionSet, context);
        return fieldMap;
      };
      StoreWriter2.prototype.applyMerges = function(mergeTree, existing, incoming, context, getStorageArgs) {
        var _a2;
        var _this = this;
        if (mergeTree.map.size && !utilities.isReference(incoming)) {
          var e_1 = !utilities.isArray(incoming) && (utilities.isReference(existing) || storeValueIsStoreObject(existing)) ? existing : void 0;
          var i_1 = incoming;
          if (e_1 && !getStorageArgs) {
            getStorageArgs = [utilities.isReference(e_1) ? e_1.__ref : e_1];
          }
          var changedFields_1;
          var getValue_1 = function(from3, name) {
            return utilities.isArray(from3) ? typeof name === "number" ? from3[name] : void 0 : context.store.getFieldValue(from3, String(name));
          };
          mergeTree.map.forEach(function(childTree, storeFieldName) {
            var eVal = getValue_1(e_1, storeFieldName);
            var iVal = getValue_1(i_1, storeFieldName);
            if (void 0 === iVal)
              return;
            if (getStorageArgs) {
              getStorageArgs.push(storeFieldName);
            }
            var aVal = _this.applyMerges(childTree, eVal, iVal, context, getStorageArgs);
            if (aVal !== iVal) {
              changedFields_1 = changedFields_1 || /* @__PURE__ */ new Map();
              changedFields_1.set(storeFieldName, aVal);
            }
            if (getStorageArgs) {
              globals.invariant(getStorageArgs.pop() === storeFieldName);
            }
          });
          if (changedFields_1) {
            incoming = utilities.isArray(i_1) ? i_1.slice(0) : tslib.__assign({}, i_1);
            changedFields_1.forEach(function(value, name) {
              incoming[name] = value;
            });
          }
        }
        if (mergeTree.info) {
          return this.cache.policies.runMergeFunction(existing, incoming, mergeTree.info, context, getStorageArgs && (_a2 = context.store).getStorage.apply(_a2, getStorageArgs));
        }
        return incoming;
      };
      return StoreWriter2;
    })();
    var emptyMergeTreePool = [];
    function getChildMergeTree(_a2, name) {
      var map2 = _a2.map;
      if (!map2.has(name)) {
        map2.set(name, emptyMergeTreePool.pop() || { map: /* @__PURE__ */ new Map() });
      }
      return map2.get(name);
    }
    function mergeMergeTrees(left, right) {
      if (left === right || !right || mergeTreeIsEmpty(right))
        return left;
      if (!left || mergeTreeIsEmpty(left))
        return right;
      var info = left.info && right.info ? tslib.__assign(tslib.__assign({}, left.info), right.info) : left.info || right.info;
      var needToMergeMaps = left.map.size && right.map.size;
      var map2 = needToMergeMaps ? /* @__PURE__ */ new Map() : left.map.size ? left.map : right.map;
      var merged = { info, map: map2 };
      if (needToMergeMaps) {
        var remainingRightKeys_1 = new Set(right.map.keys());
        left.map.forEach(function(leftTree, key) {
          merged.map.set(key, mergeMergeTrees(leftTree, right.map.get(key)));
          remainingRightKeys_1.delete(key);
        });
        remainingRightKeys_1.forEach(function(key) {
          merged.map.set(key, mergeMergeTrees(right.map.get(key), left.map.get(key)));
        });
      }
      return merged;
    }
    function mergeTreeIsEmpty(tree) {
      return !tree || !(tree.info || tree.map.size);
    }
    function maybeRecycleChildMergeTree(_a2, name) {
      var map2 = _a2.map;
      var childTree = map2.get(name);
      if (childTree && mergeTreeIsEmpty(childTree)) {
        emptyMergeTreePool.push(childTree);
        map2.delete(name);
      }
    }
    var warnings = /* @__PURE__ */ new Set();
    function warnAboutDataLoss(existingRef, incomingObj, storeFieldName, store) {
      var getChild = function(objOrRef) {
        var child = store.getFieldValue(objOrRef, storeFieldName);
        return typeof child === "object" && child;
      };
      var existing = getChild(existingRef);
      if (!existing)
        return;
      var incoming = getChild(incomingObj);
      if (!incoming)
        return;
      if (utilities.isReference(existing))
        return;
      if (equal2.equal(existing, incoming))
        return;
      if (Object.keys(existing).every(function(key) {
        return store.getFieldValue(incoming, key) !== void 0;
      })) {
        return;
      }
      var parentType = store.getFieldValue(existingRef, "__typename") || store.getFieldValue(incomingObj, "__typename");
      var fieldName = fieldNameFromStoreName(storeFieldName);
      var typeDotName = "".concat(parentType, ".").concat(fieldName);
      if (warnings.has(typeDotName))
        return;
      warnings.add(typeDotName);
      var childTypenames = [];
      if (!utilities.isArray(existing) && !utilities.isArray(incoming)) {
        [existing, incoming].forEach(function(child) {
          var typename = store.getFieldValue(child, "__typename");
          if (typeof typename === "string" && !childTypenames.includes(typename)) {
            childTypenames.push(typename);
          }
        });
      }
      globalThis.__DEV__ !== false && globals.invariant.warn(15, fieldName, parentType, childTypenames.length ? "either ensure all objects of type " + childTypenames.join(" and ") + " have an ID or a custom merge function, or " : "", typeDotName, tslib.__assign({}, existing), tslib.__assign({}, incoming));
    }
    var InMemoryCache2 = (function(_super) {
      tslib.__extends(InMemoryCache3, _super);
      function InMemoryCache3(config) {
        if (config === void 0) {
          config = {};
        }
        var _this = _super.call(this) || this;
        _this.watches = /* @__PURE__ */ new Set();
        _this.addTypenameTransform = new utilities.DocumentTransform(utilities.addTypenameToDocument);
        _this.assumeImmutableResults = true;
        _this.makeVar = makeVar;
        _this.txCount = 0;
        if (globalThis.__DEV__ !== false) {
          warnRemovedOption(config, "addTypename", "InMemoryCache", "Please remove the `addTypename` option when initializing `InMemoryCache`.");
          warnRemovedOption(config, "canonizeResults", "InMemoryCache", "Please remove the `canonizeResults` option when initializing `InMemoryCache`.");
        }
        _this.config = normalizeConfig(config);
        _this.addTypename = !!_this.config.addTypename;
        _this.policies = new Policies({
          cache: _this,
          dataIdFromObject: _this.config.dataIdFromObject,
          possibleTypes: _this.config.possibleTypes,
          typePolicies: _this.config.typePolicies
        });
        _this.init();
        return _this;
      }
      InMemoryCache3.prototype.init = function() {
        var rootStore = this.data = new exports.EntityStore.Root({
          policies: this.policies,
          resultCaching: this.config.resultCaching
        });
        this.optimisticData = rootStore.stump;
        this.resetResultCache();
      };
      InMemoryCache3.prototype.resetResultCache = function(resetResultIdentities) {
        var _this = this;
        var previousReader = this.storeReader;
        var fragments = this.config.fragments;
        this.addTypenameTransform.resetCache();
        fragments === null || fragments === void 0 ? void 0 : fragments.resetCaches();
        this.storeWriter = new StoreWriter(this, this.storeReader = new StoreReader({
          cache: this,
          addTypename: this.addTypename,
          resultCacheMaxSize: this.config.resultCacheMaxSize,
          canonizeResults: shouldCanonizeResults(this.config),
          canon: resetResultIdentities ? void 0 : previousReader && previousReader.canon,
          fragments
        }), fragments);
        this.maybeBroadcastWatch = optimism.wrap(function(c, options) {
          return _this.broadcastWatch(c, options);
        }, {
          max: this.config.resultCacheMaxSize || utilities.cacheSizes["inMemoryCache.maybeBroadcastWatch"] || 5e3,
          makeCacheKey: function(c) {
            var store = c.optimistic ? _this.optimisticData : _this.data;
            if (supportsResultCaching(store)) {
              var optimistic = c.optimistic, id = c.id, variables = c.variables;
              return store.makeCacheKey(
                c.query,
                c.callback,
                utilities.canonicalStringify({ optimistic, id, variables })
              );
            }
          }
        });
        (/* @__PURE__ */ new Set([this.data.group, this.optimisticData.group])).forEach(function(group) {
          return group.resetCaching();
        });
      };
      InMemoryCache3.prototype.restore = function(data) {
        this.init();
        if (data)
          this.data.replace(data);
        return this;
      };
      InMemoryCache3.prototype.extract = function(optimistic) {
        if (optimistic === void 0) {
          optimistic = false;
        }
        return (optimistic ? this.optimisticData : this.data).extract();
      };
      InMemoryCache3.prototype.read = function(options) {
        if (globalThis.__DEV__ !== false) {
          warnRemovedOption(options, "canonizeResults", "cache.read");
        }
        var _a2 = options.returnPartialData, returnPartialData = _a2 === void 0 ? false : _a2;
        try {
          return this.storeReader.diffQueryAgainstStore(tslib.__assign(tslib.__assign({}, options), { store: options.optimistic ? this.optimisticData : this.data, config: this.config, returnPartialData })).result || null;
        } catch (e) {
          if (e instanceof MissingFieldError) {
            return null;
          }
          throw e;
        }
      };
      InMemoryCache3.prototype.write = function(options) {
        try {
          ++this.txCount;
          return this.storeWriter.writeToStore(this.data, options);
        } finally {
          if (!--this.txCount && options.broadcast !== false) {
            this.broadcastWatches();
          }
        }
      };
      InMemoryCache3.prototype.modify = function(options) {
        if (hasOwn.call(options, "id") && !options.id) {
          return false;
        }
        var store = options.optimistic ? this.optimisticData : this.data;
        try {
          ++this.txCount;
          return store.modify(options.id || "ROOT_QUERY", options.fields);
        } finally {
          if (!--this.txCount && options.broadcast !== false) {
            this.broadcastWatches();
          }
        }
      };
      InMemoryCache3.prototype.diff = function(options) {
        if (globalThis.__DEV__ !== false) {
          warnRemovedOption(options, "canonizeResults", "cache.diff");
        }
        return this.storeReader.diffQueryAgainstStore(tslib.__assign(tslib.__assign({}, options), { store: options.optimistic ? this.optimisticData : this.data, rootId: options.id || "ROOT_QUERY", config: this.config }));
      };
      InMemoryCache3.prototype.watch = function(watch) {
        var _this = this;
        if (!this.watches.size) {
          recallCache(this);
        }
        this.watches.add(watch);
        if (watch.immediate) {
          this.maybeBroadcastWatch(watch);
        }
        return function() {
          if (_this.watches.delete(watch) && !_this.watches.size) {
            forgetCache(_this);
          }
          _this.maybeBroadcastWatch.forget(watch);
        };
      };
      InMemoryCache3.prototype.gc = function(options) {
        if (globalThis.__DEV__ !== false) {
          warnRemovedOption(options || {}, "resetResultIdentities", "cache.gc", "First ensure all usages of `canonizeResults` are removed, then remove this option.");
        }
        utilities.canonicalStringify.reset();
        utilities.print.reset();
        var ids = this.optimisticData.gc();
        if (options && !this.txCount) {
          if (options.resetResultCache) {
            this.resetResultCache(options.resetResultIdentities);
          } else if (options.resetResultIdentities) {
            this.storeReader.resetCanon();
          }
        }
        return ids;
      };
      InMemoryCache3.prototype.retain = function(rootId, optimistic) {
        return (optimistic ? this.optimisticData : this.data).retain(rootId);
      };
      InMemoryCache3.prototype.release = function(rootId, optimistic) {
        return (optimistic ? this.optimisticData : this.data).release(rootId);
      };
      InMemoryCache3.prototype.identify = function(object) {
        if (utilities.isReference(object))
          return object.__ref;
        try {
          return this.policies.identify(object)[0];
        } catch (e) {
          globalThis.__DEV__ !== false && globals.invariant.warn(e);
        }
      };
      InMemoryCache3.prototype.evict = function(options) {
        if (!options.id) {
          if (hasOwn.call(options, "id")) {
            return false;
          }
          options = tslib.__assign(tslib.__assign({}, options), { id: "ROOT_QUERY" });
        }
        try {
          ++this.txCount;
          return this.optimisticData.evict(options, this.data);
        } finally {
          if (!--this.txCount && options.broadcast !== false) {
            this.broadcastWatches();
          }
        }
      };
      InMemoryCache3.prototype.reset = function(options) {
        var _this = this;
        this.init();
        utilities.canonicalStringify.reset();
        if (options && options.discardWatches) {
          this.watches.forEach(function(watch) {
            return _this.maybeBroadcastWatch.forget(watch);
          });
          this.watches.clear();
          forgetCache(this);
        } else {
          this.broadcastWatches();
        }
        return Promise.resolve();
      };
      InMemoryCache3.prototype.removeOptimistic = function(idToRemove) {
        var newOptimisticData = this.optimisticData.removeLayer(idToRemove);
        if (newOptimisticData !== this.optimisticData) {
          this.optimisticData = newOptimisticData;
          this.broadcastWatches();
        }
      };
      InMemoryCache3.prototype.batch = function(options) {
        var _this = this;
        var update = options.update, _a2 = options.optimistic, optimistic = _a2 === void 0 ? true : _a2, removeOptimistic = options.removeOptimistic, onWatchUpdated = options.onWatchUpdated;
        var updateResult;
        var perform = function(layer) {
          var _a3 = _this, data = _a3.data, optimisticData = _a3.optimisticData;
          ++_this.txCount;
          if (layer) {
            _this.data = _this.optimisticData = layer;
          }
          try {
            return updateResult = update(_this);
          } finally {
            --_this.txCount;
            _this.data = data;
            _this.optimisticData = optimisticData;
          }
        };
        var alreadyDirty = /* @__PURE__ */ new Set();
        if (onWatchUpdated && !this.txCount) {
          this.broadcastWatches(tslib.__assign(tslib.__assign({}, options), { onWatchUpdated: function(watch) {
            alreadyDirty.add(watch);
            return false;
          } }));
        }
        if (typeof optimistic === "string") {
          this.optimisticData = this.optimisticData.addLayer(optimistic, perform);
        } else if (optimistic === false) {
          perform(this.data);
        } else {
          perform();
        }
        if (typeof removeOptimistic === "string") {
          this.optimisticData = this.optimisticData.removeLayer(removeOptimistic);
        }
        if (onWatchUpdated && alreadyDirty.size) {
          this.broadcastWatches(tslib.__assign(tslib.__assign({}, options), { onWatchUpdated: function(watch, diff2) {
            var result2 = onWatchUpdated.call(this, watch, diff2);
            if (result2 !== false) {
              alreadyDirty.delete(watch);
            }
            return result2;
          } }));
          if (alreadyDirty.size) {
            alreadyDirty.forEach(function(watch) {
              return _this.maybeBroadcastWatch.dirty(watch);
            });
          }
        } else {
          this.broadcastWatches(options);
        }
        return updateResult;
      };
      InMemoryCache3.prototype.performTransaction = function(update, optimisticId) {
        return this.batch({
          update,
          optimistic: optimisticId || optimisticId !== null
        });
      };
      InMemoryCache3.prototype.transformDocument = function(document) {
        return this.addTypenameToDocument(this.addFragmentsToDocument(document));
      };
      InMemoryCache3.prototype.fragmentMatches = function(fragment, typename) {
        return this.policies.fragmentMatches(fragment, typename);
      };
      InMemoryCache3.prototype.lookupFragment = function(fragmentName) {
        var _a2;
        return ((_a2 = this.config.fragments) === null || _a2 === void 0 ? void 0 : _a2.lookup(fragmentName)) || null;
      };
      InMemoryCache3.prototype.broadcastWatches = function(options) {
        var _this = this;
        if (!this.txCount) {
          this.watches.forEach(function(c) {
            return _this.maybeBroadcastWatch(c, options);
          });
        }
      };
      InMemoryCache3.prototype.addFragmentsToDocument = function(document) {
        var fragments = this.config.fragments;
        return fragments ? fragments.transform(document) : document;
      };
      InMemoryCache3.prototype.addTypenameToDocument = function(document) {
        if (this.addTypename) {
          return this.addTypenameTransform.transformDocument(document);
        }
        return document;
      };
      InMemoryCache3.prototype.broadcastWatch = function(c, options) {
        var _this = this;
        var lastDiff = c.lastDiff;
        var diff2 = muteDeprecations("canonizeResults", function() {
          return _this.diff(c);
        });
        if (options) {
          if (c.optimistic && typeof options.optimistic === "string") {
            diff2.fromOptimisticTransaction = true;
          }
          if (options.onWatchUpdated && options.onWatchUpdated.call(this, c, diff2, lastDiff) === false) {
            return;
          }
        }
        if (!lastDiff || !equal2.equal(lastDiff.result, diff2.result)) {
          c.callback(c.lastDiff = diff2, lastDiff);
        }
      };
      return InMemoryCache3;
    })(ApolloCache);
    if (globalThis.__DEV__ !== false) {
      InMemoryCache2.prototype.getMemoryInternals = getInMemoryCacheMemoryInternals;
    }
    function createFragmentRegistry() {
      var fragments = [];
      for (var _i = 0; _i < arguments.length; _i++) {
        fragments[_i] = arguments[_i];
      }
      return new (FragmentRegistry.bind.apply(FragmentRegistry, tslib.__spreadArray([void 0], fragments, false)))();
    }
    var FragmentRegistry = (function() {
      function FragmentRegistry2() {
        var fragments = [];
        for (var _i = 0; _i < arguments.length; _i++) {
          fragments[_i] = arguments[_i];
        }
        this.registry = /* @__PURE__ */ Object.create(null);
        this.resetCaches();
        if (fragments.length) {
          this.register.apply(this, fragments);
        }
      }
      FragmentRegistry2.prototype.register = function() {
        var _this = this;
        var fragments = [];
        for (var _i = 0; _i < arguments.length; _i++) {
          fragments[_i] = arguments[_i];
        }
        var definitions = /* @__PURE__ */ new Map();
        fragments.forEach(function(doc) {
          utilities.getFragmentDefinitions(doc).forEach(function(node) {
            definitions.set(node.name.value, node);
          });
        });
        definitions.forEach(function(node, name) {
          if (node !== _this.registry[name]) {
            _this.registry[name] = node;
            _this.invalidate(name);
          }
        });
        return this;
      };
      FragmentRegistry2.prototype.invalidate = function(name) {
      };
      FragmentRegistry2.prototype.resetCaches = function() {
        var proto = FragmentRegistry2.prototype;
        this.invalidate = (this.lookup = optimism.wrap(proto.lookup.bind(this), {
          makeCacheKey: function(arg) {
            return arg;
          },
          max: utilities.cacheSizes["fragmentRegistry.lookup"] || 1e3
        })).dirty;
        this.transform = optimism.wrap(proto.transform.bind(this), {
          cache: caches2.WeakCache,
          max: utilities.cacheSizes["fragmentRegistry.transform"] || 2e3
        });
        this.findFragmentSpreads = optimism.wrap(proto.findFragmentSpreads.bind(this), {
          cache: caches2.WeakCache,
          max: utilities.cacheSizes["fragmentRegistry.findFragmentSpreads"] || 4e3
        });
      };
      FragmentRegistry2.prototype.lookup = function(fragmentName) {
        return this.registry[fragmentName] || null;
      };
      FragmentRegistry2.prototype.transform = function(document) {
        var _this = this;
        var defined = /* @__PURE__ */ new Map();
        utilities.getFragmentDefinitions(document).forEach(function(def) {
          defined.set(def.name.value, def);
        });
        var unbound = /* @__PURE__ */ new Set();
        var enqueue2 = function(spreadName) {
          if (!defined.has(spreadName)) {
            unbound.add(spreadName);
          }
        };
        var enqueueChildSpreads = function(node) {
          return Object.keys(_this.findFragmentSpreads(node)).forEach(enqueue2);
        };
        enqueueChildSpreads(document);
        var missing = [];
        var map2 = /* @__PURE__ */ Object.create(null);
        unbound.forEach(function(fragmentName) {
          var knownFragmentDef = defined.get(fragmentName);
          if (knownFragmentDef) {
            enqueueChildSpreads(map2[fragmentName] = knownFragmentDef);
          } else {
            missing.push(fragmentName);
            var def = _this.lookup(fragmentName);
            if (def) {
              enqueueChildSpreads(map2[fragmentName] = def);
            }
          }
        });
        if (missing.length) {
          var defsToAppend_1 = [];
          missing.forEach(function(name) {
            var def = map2[name];
            if (def) {
              defsToAppend_1.push(def);
            }
          });
          if (defsToAppend_1.length) {
            document = tslib.__assign(tslib.__assign({}, document), { definitions: document.definitions.concat(defsToAppend_1) });
          }
        }
        return document;
      };
      FragmentRegistry2.prototype.findFragmentSpreads = function(root2) {
        var spreads = /* @__PURE__ */ Object.create(null);
        graphql2.visit(root2, {
          FragmentSpread: function(node) {
            spreads[node.name.value] = node;
          }
        });
        return spreads;
      };
      return FragmentRegistry2;
    })();
    exports.canonicalStringify = utilities.canonicalStringify;
    exports.isReference = utilities.isReference;
    exports.makeReference = utilities.makeReference;
    exports.ApolloCache = ApolloCache;
    exports.InMemoryCache = InMemoryCache2;
    exports.MissingFieldError = MissingFieldError;
    exports.Policies = Policies;
    exports.cacheSlot = cacheSlot;
    exports.createFragmentRegistry = createFragmentRegistry;
    exports.defaultDataIdFromObject = defaultDataIdFromObject;
    exports.fieldNameFromStoreName = fieldNameFromStoreName;
    exports.makeVar = makeVar;
  }
});

// ../node_modules/graphql-tag/lib/index.js
var lib_exports5 = {};
__export(lib_exports5, {
  default: () => lib_default2,
  disableExperimentalFragmentVariables: () => disableExperimentalFragmentVariables,
  disableFragmentWarnings: () => disableFragmentWarnings,
  enableExperimentalFragmentVariables: () => enableExperimentalFragmentVariables,
  gql: () => gql,
  resetCaches: () => resetCaches
});
function normalize(string) {
  return string.replace(/[\s,]+/g, " ").trim();
}
function cacheKeyFromLoc(loc) {
  return normalize(loc.source.body.substring(loc.start, loc.end));
}
function processFragments(ast) {
  var seenKeys = /* @__PURE__ */ new Set();
  var definitions = [];
  ast.definitions.forEach(function(fragmentDefinition) {
    if (fragmentDefinition.kind === "FragmentDefinition") {
      var fragmentName = fragmentDefinition.name.value;
      var sourceKey = cacheKeyFromLoc(fragmentDefinition.loc);
      var sourceKeySet = fragmentSourceMap.get(fragmentName);
      if (sourceKeySet && !sourceKeySet.has(sourceKey)) {
        if (printFragmentWarnings) {
          console.warn("Warning: fragment with name " + fragmentName + " already exists.\ngraphql-tag enforces all fragment names across your application to be unique; read more about\nthis in the docs: http://dev.apollodata.com/core/fragments.html#unique-names");
        }
      } else if (!sourceKeySet) {
        fragmentSourceMap.set(fragmentName, sourceKeySet = /* @__PURE__ */ new Set());
      }
      sourceKeySet.add(sourceKey);
      if (!seenKeys.has(sourceKey)) {
        seenKeys.add(sourceKey);
        definitions.push(fragmentDefinition);
      }
    } else {
      definitions.push(fragmentDefinition);
    }
  });
  return __assign(__assign({}, ast), { definitions });
}
function stripLoc(doc) {
  var workSet = new Set(doc.definitions);
  workSet.forEach(function(node) {
    if (node.loc)
      delete node.loc;
    Object.keys(node).forEach(function(key) {
      var value = node[key];
      if (value && typeof value === "object") {
        workSet.add(value);
      }
    });
  });
  var loc = doc.loc;
  if (loc) {
    delete loc.startToken;
    delete loc.endToken;
  }
  return doc;
}
function parseDocument(source) {
  var cacheKey = normalize(source);
  if (!docCache.has(cacheKey)) {
    var parsed = parse(source, {
      experimentalFragmentVariables,
      allowLegacyFragmentVariables: experimentalFragmentVariables
    });
    if (!parsed || parsed.kind !== "Document") {
      throw new Error("Not a valid GraphQL document.");
    }
    docCache.set(cacheKey, stripLoc(processFragments(parsed)));
  }
  return docCache.get(cacheKey);
}
function gql(literals) {
  var args = [];
  for (var _i = 1; _i < arguments.length; _i++) {
    args[_i - 1] = arguments[_i];
  }
  if (typeof literals === "string") {
    literals = [literals];
  }
  var result2 = literals[0];
  args.forEach(function(arg, i) {
    if (arg && arg.kind === "Document") {
      result2 += arg.loc.source.body;
    } else {
      result2 += arg;
    }
    result2 += literals[i + 1];
  });
  return parseDocument(result2);
}
function resetCaches() {
  docCache.clear();
  fragmentSourceMap.clear();
}
function disableFragmentWarnings() {
  printFragmentWarnings = false;
}
function enableExperimentalFragmentVariables() {
  experimentalFragmentVariables = true;
}
function disableExperimentalFragmentVariables() {
  experimentalFragmentVariables = false;
}
var docCache, fragmentSourceMap, printFragmentWarnings, experimentalFragmentVariables, extras, lib_default2;
var init_lib6 = __esm({
  "../node_modules/graphql-tag/lib/index.js"() {
    init_tslib_es6();
    init_graphql2();
    docCache = /* @__PURE__ */ new Map();
    fragmentSourceMap = /* @__PURE__ */ new Map();
    printFragmentWarnings = true;
    experimentalFragmentVariables = false;
    extras = {
      gql,
      resetCaches,
      disableFragmentWarnings,
      enableExperimentalFragmentVariables,
      disableExperimentalFragmentVariables
    };
    (function(gql_1) {
      gql_1.gql = extras.gql, gql_1.resetCaches = extras.resetCaches, gql_1.disableFragmentWarnings = extras.disableFragmentWarnings, gql_1.enableExperimentalFragmentVariables = extras.enableExperimentalFragmentVariables, gql_1.disableExperimentalFragmentVariables = extras.disableExperimentalFragmentVariables;
    })(gql || (gql = {}));
    gql["default"] = gql;
    lib_default2 = gql;
  }
});

// ../node_modules/@apollo/client/core/core.cjs
var require_core2 = __commonJS({
  "../node_modules/@apollo/client/core/core.cjs"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var tslib = (init_tslib_es6(), __toCommonJS(tslib_es6_exports));
    var globals = require_globals();
    var core = require_core();
    var http = require_http();
    var equal2 = (init_lib5(), __toCommonJS(lib_exports4));
    var utilities = require_utilities();
    var cache = require_cache();
    var errors = require_errors();
    var optimism = (init_lib4(), __toCommonJS(lib_exports3));
    var trie = (init_lib(), __toCommonJS(lib_exports));
    var masking = require_masking();
    var graphql2 = (init_graphql2(), __toCommonJS(graphql_exports));
    var utils = require_utils();
    var tsInvariant = (init_invariant(), __toCommonJS(invariant_exports));
    var graphqlTag = (init_lib6(), __toCommonJS(lib_exports5));
    function _interopDefaultLegacy(e) {
      return e && typeof e === "object" && "default" in e ? e["default"] : e;
    }
    var equal__default = _interopDefaultLegacy(equal2);
    var version2 = "3.14.0";
    function isNonNullObject(obj) {
      return obj !== null && typeof obj === "object";
    }
    function isNonEmptyArray(value) {
      return Array.isArray(value) && value.length > 0;
    }
    var hasOwnProperty$2 = Object.prototype.hasOwnProperty;
    var defaultReconciler = function(target, source, property) {
      return this.merge(target[property], source[property]);
    };
    var DeepMerger = (function() {
      function DeepMerger2(reconciler) {
        if (reconciler === void 0) {
          reconciler = defaultReconciler;
        }
        this.reconciler = reconciler;
        this.isObject = isNonNullObject;
        this.pastCopies = /* @__PURE__ */ new Set();
      }
      DeepMerger2.prototype.merge = function(target, source) {
        var _this = this;
        var context = [];
        for (var _i = 2; _i < arguments.length; _i++) {
          context[_i - 2] = arguments[_i];
        }
        if (isNonNullObject(source) && isNonNullObject(target)) {
          Object.keys(source).forEach(function(sourceKey) {
            if (hasOwnProperty$2.call(target, sourceKey)) {
              var targetValue = target[sourceKey];
              if (source[sourceKey] !== targetValue) {
                var result2 = _this.reconciler.apply(_this, tslib.__spreadArray([
                  target,
                  source,
                  sourceKey
                ], context, false));
                if (result2 !== targetValue) {
                  target = _this.shallowCopyForMerge(target);
                  target[sourceKey] = result2;
                }
              }
            } else {
              target = _this.shallowCopyForMerge(target);
              target[sourceKey] = source[sourceKey];
            }
          });
          return target;
        }
        return source;
      };
      DeepMerger2.prototype.shallowCopyForMerge = function(value) {
        if (isNonNullObject(value)) {
          if (!this.pastCopies.has(value)) {
            if (Array.isArray(value)) {
              value = value.slice(0);
            } else {
              value = tslib.__assign({ __proto__: Object.getPrototypeOf(value) }, value);
            }
            this.pastCopies.add(value);
          }
        }
        return value;
      };
      return DeepMerger2;
    })();
    function isExecutionPatchIncrementalResult(value) {
      return "incremental" in value;
    }
    function mergeIncrementalData(prevResult, result2) {
      var mergedData = prevResult;
      var merger = new DeepMerger();
      if (isExecutionPatchIncrementalResult(result2) && isNonEmptyArray(result2.incremental)) {
        result2.incremental.forEach(function(_a2) {
          var data = _a2.data, path = _a2.path;
          for (var i = path.length - 1; i >= 0; --i) {
            var key = path[i];
            var isNumericKey = !isNaN(+key);
            var parent_1 = isNumericKey ? [] : {};
            parent_1[key] = data;
            data = parent_1;
          }
          mergedData = merger.merge(mergedData, data);
        });
      }
      return mergedData;
    }
    exports.NetworkStatus = void 0;
    (function(NetworkStatus) {
      NetworkStatus[NetworkStatus["loading"] = 1] = "loading";
      NetworkStatus[NetworkStatus["setVariables"] = 2] = "setVariables";
      NetworkStatus[NetworkStatus["fetchMore"] = 3] = "fetchMore";
      NetworkStatus[NetworkStatus["refetch"] = 4] = "refetch";
      NetworkStatus[NetworkStatus["poll"] = 6] = "poll";
      NetworkStatus[NetworkStatus["ready"] = 7] = "ready";
      NetworkStatus[NetworkStatus["error"] = 8] = "error";
    })(exports.NetworkStatus || (exports.NetworkStatus = {}));
    function isNetworkRequestInFlight(networkStatus) {
      return networkStatus ? networkStatus < 7 : false;
    }
    function isNetworkRequestSettled(networkStatus) {
      return networkStatus === 7 || networkStatus === 8;
    }
    function equalByQuery(query, _a2, _b, variables) {
      var aData = _a2.data, aRest = tslib.__rest(_a2, ["data"]);
      var bData = _b.data, bRest = tslib.__rest(_b, ["data"]);
      return equal__default(aRest, bRest) && equalBySelectionSet(utilities.getMainDefinition(query).selectionSet, aData, bData, {
        fragmentMap: utilities.createFragmentMap(utilities.getFragmentDefinitions(query)),
        variables
      });
    }
    function equalBySelectionSet(selectionSet, aResult, bResult, context) {
      if (aResult === bResult) {
        return true;
      }
      var seenSelections = /* @__PURE__ */ new Set();
      return selectionSet.selections.every(function(selection) {
        if (seenSelections.has(selection))
          return true;
        seenSelections.add(selection);
        if (!utilities.shouldInclude(selection, context.variables))
          return true;
        if (selectionHasNonreactiveDirective(selection))
          return true;
        if (utilities.isField(selection)) {
          var resultKey = utilities.resultKeyNameFromField(selection);
          var aResultChild = aResult && aResult[resultKey];
          var bResultChild = bResult && bResult[resultKey];
          var childSelectionSet = selection.selectionSet;
          if (!childSelectionSet) {
            return equal__default(aResultChild, bResultChild);
          }
          var aChildIsArray = Array.isArray(aResultChild);
          var bChildIsArray = Array.isArray(bResultChild);
          if (aChildIsArray !== bChildIsArray)
            return false;
          if (aChildIsArray && bChildIsArray) {
            var length_1 = aResultChild.length;
            if (bResultChild.length !== length_1) {
              return false;
            }
            for (var i = 0; i < length_1; ++i) {
              if (!equalBySelectionSet(childSelectionSet, aResultChild[i], bResultChild[i], context)) {
                return false;
              }
            }
            return true;
          }
          return equalBySelectionSet(childSelectionSet, aResultChild, bResultChild, context);
        } else {
          var fragment = utilities.getFragmentFromSelection(selection, context.fragmentMap);
          if (fragment) {
            if (selectionHasNonreactiveDirective(fragment))
              return true;
            return equalBySelectionSet(
              fragment.selectionSet,
              aResult,
              bResult,
              context
            );
          }
        }
      });
    }
    function selectionHasNonreactiveDirective(selection) {
      return !!selection.directives && selection.directives.some(directiveIsNonreactive);
    }
    function directiveIsNonreactive(dir) {
      return dir.name.value === "nonreactive";
    }
    var muteAllDeprecations = Symbol.for("apollo.deprecations");
    var global2 = globals.global;
    var slot = new optimism.Slot();
    function isMuted(name) {
      return global2[muteAllDeprecations] || (slot.getValue() || []).includes(name);
    }
    function muteDeprecations(name) {
      var args = [];
      for (var _i = 1; _i < arguments.length; _i++) {
        args[_i - 1] = arguments[_i];
      }
      return slot.withValue.apply(slot, tslib.__spreadArray([Array.isArray(name) ? name : [name]], args, false));
    }
    function warnRemovedOption(options, name, callSite, recommendation) {
      if (recommendation === void 0) {
        recommendation = "Please remove this option.";
      }
      warnDeprecated(name, function() {
        if (name in options) {
          globalThis.__DEV__ !== false && globals.invariant.warn(104, callSite, name, recommendation);
        }
      });
    }
    function warnDeprecated(name, cb) {
      if (!isMuted(name)) {
        cb();
      }
    }
    var assign = Object.assign;
    var hasOwnProperty$1 = Object.hasOwnProperty;
    var ObservableQuery = (function(_super) {
      tslib.__extends(ObservableQuery2, _super);
      function ObservableQuery2(_a2) {
        var queryManager = _a2.queryManager, queryInfo = _a2.queryInfo, options = _a2.options;
        var _this = this;
        var startedInactive = ObservableQuery2.inactiveOnCreation.getValue();
        _this = _super.call(this, function(observer) {
          _this._getOrCreateQuery();
          try {
            var subObserver = observer._subscription._observer;
            if (subObserver && !subObserver.error) {
              subObserver.error = defaultSubscriptionObserverErrorCallback;
            }
          } catch (_a3) {
          }
          var first = !_this.observers.size;
          _this.observers.add(observer);
          var last = _this.last;
          if (last && last.error) {
            observer.error && observer.error(last.error);
          } else if (last && last.result) {
            observer.next && observer.next(_this.maskResult(last.result));
          }
          if (first) {
            _this.reobserve().catch(function() {
            });
          }
          return function() {
            if (_this.observers.delete(observer) && !_this.observers.size) {
              _this.tearDownQuery();
            }
          };
        }) || this;
        _this.observers = /* @__PURE__ */ new Set();
        _this.subscriptions = /* @__PURE__ */ new Set();
        _this.dirty = false;
        _this._getOrCreateQuery = function() {
          if (startedInactive) {
            queryManager["queries"].set(_this.queryId, queryInfo);
            startedInactive = false;
          }
          return _this.queryManager.getOrCreateQuery(_this.queryId);
        };
        _this.queryInfo = queryInfo;
        _this.queryManager = queryManager;
        _this.waitForOwnResult = skipCacheDataFor(options.fetchPolicy);
        _this.isTornDown = false;
        _this.subscribeToMore = _this.subscribeToMore.bind(_this);
        _this.maskResult = _this.maskResult.bind(_this);
        var _b = queryManager.defaultOptions.watchQuery, _c = _b === void 0 ? {} : _b, _d = _c.fetchPolicy, defaultFetchPolicy = _d === void 0 ? "cache-first" : _d;
        var _e = options.fetchPolicy, fetchPolicy = _e === void 0 ? defaultFetchPolicy : _e, _f = options.initialFetchPolicy, initialFetchPolicy = _f === void 0 ? fetchPolicy === "standby" ? defaultFetchPolicy : fetchPolicy : _f;
        _this.options = tslib.__assign(tslib.__assign({}, options), {
          initialFetchPolicy,
          fetchPolicy
        });
        _this.queryId = queryInfo.queryId || queryManager.generateQueryId();
        var opDef = utilities.getOperationDefinition(_this.query);
        _this.queryName = opDef && opDef.name && opDef.name.value;
        return _this;
      }
      Object.defineProperty(ObservableQuery2.prototype, "query", {
        get: function() {
          return this.lastQuery || this.options.query;
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(ObservableQuery2.prototype, "variables", {
        get: function() {
          return this.options.variables;
        },
        enumerable: false,
        configurable: true
      });
      ObservableQuery2.prototype.result = function() {
        var _this = this;
        if (globalThis.__DEV__ !== false) {
          warnDeprecated("observableQuery.result", function() {
            globalThis.__DEV__ !== false && globals.invariant.warn(23);
          });
        }
        return new Promise(function(resolve, reject) {
          var observer = {
            next: function(result2) {
              resolve(result2);
              _this.observers.delete(observer);
              if (!_this.observers.size) {
                _this.queryManager.removeQuery(_this.queryId);
              }
              setTimeout(function() {
                subscription.unsubscribe();
              }, 0);
            },
            error: reject
          };
          var subscription = _this.subscribe(observer);
        });
      };
      ObservableQuery2.prototype.resetDiff = function() {
        this.queryInfo.resetDiff();
      };
      ObservableQuery2.prototype.getCurrentFullResult = function(saveAsLastResult) {
        var _this = this;
        if (saveAsLastResult === void 0) {
          saveAsLastResult = true;
        }
        var lastResult = muteDeprecations("getLastResult", function() {
          return _this.getLastResult(true);
        });
        var networkStatus = this.queryInfo.networkStatus || lastResult && lastResult.networkStatus || exports.NetworkStatus.ready;
        var result2 = tslib.__assign(tslib.__assign({}, lastResult), { loading: isNetworkRequestInFlight(networkStatus), networkStatus });
        var _a2 = this.options.fetchPolicy, fetchPolicy = _a2 === void 0 ? "cache-first" : _a2;
        if (skipCacheDataFor(fetchPolicy) || this.queryManager.getDocumentInfo(this.query).hasForcedResolvers) ;
        else if (this.waitForOwnResult) {
          this.queryInfo["updateWatch"]();
        } else {
          var diff2 = this.queryInfo.getDiff();
          if (diff2.complete || this.options.returnPartialData) {
            result2.data = diff2.result;
          }
          if (equal2.equal(result2.data, {})) {
            result2.data = void 0;
          }
          if (diff2.complete) {
            delete result2.partial;
            if (diff2.complete && result2.networkStatus === exports.NetworkStatus.loading && (fetchPolicy === "cache-first" || fetchPolicy === "cache-only")) {
              result2.networkStatus = exports.NetworkStatus.ready;
              result2.loading = false;
            }
          } else {
            result2.partial = true;
          }
          if (result2.networkStatus === exports.NetworkStatus.ready && (result2.error || result2.errors)) {
            result2.networkStatus = exports.NetworkStatus.error;
          }
          if (globalThis.__DEV__ !== false && !diff2.complete && !this.options.partialRefetch && !result2.loading && !result2.data && !result2.error) {
            logMissingFieldErrors(diff2.missing);
          }
        }
        if (saveAsLastResult) {
          this.updateLastResult(result2);
        }
        return result2;
      };
      ObservableQuery2.prototype.getCurrentResult = function(saveAsLastResult) {
        if (saveAsLastResult === void 0) {
          saveAsLastResult = true;
        }
        return this.maskResult(this.getCurrentFullResult(saveAsLastResult));
      };
      ObservableQuery2.prototype.isDifferentFromLastResult = function(newResult, variables) {
        if (!this.last) {
          return true;
        }
        var documentInfo = this.queryManager.getDocumentInfo(this.query);
        var dataMasking = this.queryManager.dataMasking;
        var query = dataMasking ? documentInfo.nonReactiveQuery : this.query;
        var resultIsDifferent = dataMasking || documentInfo.hasNonreactiveDirective ? !equalByQuery(query, this.last.result, newResult, this.variables) : !equal2.equal(this.last.result, newResult);
        return resultIsDifferent || variables && !equal2.equal(this.last.variables, variables);
      };
      ObservableQuery2.prototype.getLast = function(key, variablesMustMatch) {
        var last = this.last;
        if (last && last[key] && (!variablesMustMatch || equal2.equal(last.variables, this.variables))) {
          return last[key];
        }
      };
      ObservableQuery2.prototype.getLastResult = function(variablesMustMatch) {
        if (globalThis.__DEV__ !== false) {
          warnDeprecated("getLastResult", function() {
            globalThis.__DEV__ !== false && globals.invariant.warn(24);
          });
        }
        return this.getLast("result", variablesMustMatch);
      };
      ObservableQuery2.prototype.getLastError = function(variablesMustMatch) {
        if (globalThis.__DEV__ !== false) {
          warnDeprecated("getLastError", function() {
            globalThis.__DEV__ !== false && globals.invariant.warn(25);
          });
        }
        return this.getLast("error", variablesMustMatch);
      };
      ObservableQuery2.prototype.resetLastResults = function() {
        if (globalThis.__DEV__ !== false) {
          warnDeprecated("resetLastResults", function() {
            globalThis.__DEV__ !== false && globals.invariant.warn(26);
          });
        }
        delete this.last;
        this.isTornDown = false;
      };
      ObservableQuery2.prototype.resetQueryStoreErrors = function() {
        if (globalThis.__DEV__ !== false) {
          globalThis.__DEV__ !== false && globals.invariant.warn(27);
        }
        this.queryManager.resetErrors(this.queryId);
      };
      ObservableQuery2.prototype.refetch = function(variables) {
        var _a2;
        var reobserveOptions = {
          pollInterval: 0
        };
        var fetchPolicy = this.options.fetchPolicy;
        if (fetchPolicy === "no-cache") {
          reobserveOptions.fetchPolicy = "no-cache";
        } else {
          reobserveOptions.fetchPolicy = "network-only";
        }
        if (globalThis.__DEV__ !== false && variables && hasOwnProperty$1.call(variables, "variables")) {
          var queryDef = utilities.getQueryDefinition(this.query);
          var vars = queryDef.variableDefinitions;
          if (!vars || !vars.some(function(v) {
            return v.variable.name.value === "variables";
          })) {
            globalThis.__DEV__ !== false && globals.invariant.warn(
              28,
              variables,
              ((_a2 = queryDef.name) === null || _a2 === void 0 ? void 0 : _a2.value) || queryDef
            );
          }
        }
        if (variables && !equal2.equal(this.options.variables, variables)) {
          reobserveOptions.variables = this.options.variables = tslib.__assign(tslib.__assign({}, this.options.variables), variables);
        }
        this.queryInfo.resetLastWrite();
        return this.reobserve(reobserveOptions, exports.NetworkStatus.refetch);
      };
      ObservableQuery2.prototype.fetchMore = function(fetchMoreOptions) {
        var _this = this;
        var combinedOptions = tslib.__assign(tslib.__assign({}, fetchMoreOptions.query ? fetchMoreOptions : tslib.__assign(tslib.__assign(tslib.__assign(tslib.__assign({}, this.options), { query: this.options.query }), fetchMoreOptions), { variables: tslib.__assign(tslib.__assign({}, this.options.variables), fetchMoreOptions.variables) })), {
          fetchPolicy: "no-cache"
        });
        combinedOptions.query = this.transformDocument(combinedOptions.query);
        var qid = this.queryManager.generateQueryId();
        this.lastQuery = fetchMoreOptions.query ? this.transformDocument(this.options.query) : combinedOptions.query;
        var queryInfo = this.queryInfo;
        var originalNetworkStatus = queryInfo.networkStatus;
        queryInfo.networkStatus = exports.NetworkStatus.fetchMore;
        if (combinedOptions.notifyOnNetworkStatusChange) {
          this.observe();
        }
        var updatedQuerySet = /* @__PURE__ */ new Set();
        var updateQuery = fetchMoreOptions === null || fetchMoreOptions === void 0 ? void 0 : fetchMoreOptions.updateQuery;
        var isCached = this.options.fetchPolicy !== "no-cache";
        if (!isCached) {
          globals.invariant(updateQuery, 29);
        }
        return this.queryManager.fetchQuery(qid, combinedOptions, exports.NetworkStatus.fetchMore).then(function(fetchMoreResult) {
          _this.queryManager.removeQuery(qid);
          if (queryInfo.networkStatus === exports.NetworkStatus.fetchMore) {
            queryInfo.networkStatus = originalNetworkStatus;
          }
          if (isCached) {
            _this.queryManager.cache.batch({
              update: function(cache2) {
                var updateQuery2 = fetchMoreOptions.updateQuery;
                if (updateQuery2) {
                  cache2.updateQuery({
                    query: _this.query,
                    variables: _this.variables,
                    returnPartialData: true,
                    optimistic: false
                  }, function(previous) {
                    return updateQuery2(previous, {
                      fetchMoreResult: fetchMoreResult.data,
                      variables: combinedOptions.variables
                    });
                  });
                } else {
                  cache2.writeQuery({
                    query: combinedOptions.query,
                    variables: combinedOptions.variables,
                    data: fetchMoreResult.data
                  });
                }
              },
              onWatchUpdated: function(watch) {
                updatedQuerySet.add(watch.query);
              }
            });
          } else {
            var lastResult = _this.getLast("result");
            var data = updateQuery(lastResult.data, {
              fetchMoreResult: fetchMoreResult.data,
              variables: combinedOptions.variables
            });
            _this.reportResult(tslib.__assign(tslib.__assign({}, lastResult), { networkStatus: originalNetworkStatus, loading: isNetworkRequestInFlight(originalNetworkStatus), data }), _this.variables);
          }
          return _this.maskResult(fetchMoreResult);
        }).finally(function() {
          if (isCached && !updatedQuerySet.has(_this.query)) {
            _this.reobserveCacheFirst();
          }
        });
      };
      ObservableQuery2.prototype.subscribeToMore = function(options) {
        var _this = this;
        var subscription = this.queryManager.startGraphQLSubscription({
          query: options.document,
          variables: options.variables,
          context: options.context
        }).subscribe({
          next: function(subscriptionData) {
            var updateQuery = options.updateQuery;
            if (updateQuery) {
              _this.updateQuery(function(previous, updateOptions) {
                return updateQuery(previous, tslib.__assign({ subscriptionData }, updateOptions));
              });
            }
          },
          error: function(err) {
            if (options.onError) {
              options.onError(err);
              return;
            }
            globalThis.__DEV__ !== false && globals.invariant.error(30, err);
          }
        });
        this.subscriptions.add(subscription);
        return function() {
          if (_this.subscriptions.delete(subscription)) {
            subscription.unsubscribe();
          }
        };
      };
      ObservableQuery2.prototype.setOptions = function(newOptions) {
        if (globalThis.__DEV__ !== false) {
          warnRemovedOption(newOptions, "canonizeResults", "setOptions");
          warnDeprecated("setOptions", function() {
            globalThis.__DEV__ !== false && globals.invariant.warn(31);
          });
        }
        return this.reobserve(newOptions);
      };
      ObservableQuery2.prototype.silentSetOptions = function(newOptions) {
        var mergedOptions = utilities.compact(this.options, newOptions || {});
        assign(this.options, mergedOptions);
      };
      ObservableQuery2.prototype.setVariables = function(variables) {
        var _this = this;
        if (equal2.equal(this.variables, variables)) {
          return this.observers.size ? muteDeprecations("observableQuery.result", function() {
            return _this.result();
          }) : Promise.resolve();
        }
        this.options.variables = variables;
        if (!this.observers.size) {
          return Promise.resolve();
        }
        return this.reobserve({
          fetchPolicy: this.options.initialFetchPolicy,
          variables
        }, exports.NetworkStatus.setVariables);
      };
      ObservableQuery2.prototype.updateQuery = function(mapFn) {
        var queryManager = this.queryManager;
        var _a2 = queryManager.cache.diff({
          query: this.options.query,
          variables: this.variables,
          returnPartialData: true,
          optimistic: false
        }), result2 = _a2.result, complete = _a2.complete;
        var newResult = mapFn(result2, {
          variables: this.variables,
          complete: !!complete,
          previousData: result2
        });
        if (newResult) {
          queryManager.cache.writeQuery({
            query: this.options.query,
            data: newResult,
            variables: this.variables
          });
          queryManager.broadcastQueries();
        }
      };
      ObservableQuery2.prototype.startPolling = function(pollInterval) {
        this.options.pollInterval = pollInterval;
        this.updatePolling();
      };
      ObservableQuery2.prototype.stopPolling = function() {
        this.options.pollInterval = 0;
        this.updatePolling();
      };
      ObservableQuery2.prototype.applyNextFetchPolicy = function(reason, options) {
        if (options.nextFetchPolicy) {
          var _a2 = options.fetchPolicy, fetchPolicy = _a2 === void 0 ? "cache-first" : _a2, _b = options.initialFetchPolicy, initialFetchPolicy = _b === void 0 ? fetchPolicy : _b;
          if (fetchPolicy === "standby") ;
          else if (typeof options.nextFetchPolicy === "function") {
            options.fetchPolicy = options.nextFetchPolicy(fetchPolicy, {
              reason,
              options,
              observable: this,
              initialFetchPolicy
            });
          } else if (reason === "variables-changed") {
            options.fetchPolicy = initialFetchPolicy;
          } else {
            options.fetchPolicy = options.nextFetchPolicy;
          }
        }
        return options.fetchPolicy;
      };
      ObservableQuery2.prototype.fetch = function(options, newNetworkStatus, query) {
        var queryInfo = this._getOrCreateQuery();
        queryInfo.setObservableQuery(this);
        return this.queryManager["fetchConcastWithInfo"](queryInfo, options, newNetworkStatus, query);
      };
      ObservableQuery2.prototype.updatePolling = function() {
        var _this = this;
        if (this.queryManager.ssrMode) {
          return;
        }
        var _a2 = this, pollingInfo = _a2.pollingInfo, pollInterval = _a2.options.pollInterval;
        if (!pollInterval || !this.hasObservers()) {
          if (pollingInfo) {
            clearTimeout(pollingInfo.timeout);
            delete this.pollingInfo;
          }
          return;
        }
        if (pollingInfo && pollingInfo.interval === pollInterval) {
          return;
        }
        globals.invariant(pollInterval, 32);
        var info = pollingInfo || (this.pollingInfo = {});
        info.interval = pollInterval;
        var maybeFetch = function() {
          var _a3, _b;
          if (_this.pollingInfo) {
            if (!isNetworkRequestInFlight(_this.queryInfo.networkStatus) && !((_b = (_a3 = _this.options).skipPollAttempt) === null || _b === void 0 ? void 0 : _b.call(_a3))) {
              _this.reobserve({
                fetchPolicy: _this.options.initialFetchPolicy === "no-cache" ? "no-cache" : "network-only"
              }, exports.NetworkStatus.poll).then(poll, poll);
            } else {
              poll();
            }
          }
        };
        var poll = function() {
          var info2 = _this.pollingInfo;
          if (info2) {
            clearTimeout(info2.timeout);
            info2.timeout = setTimeout(maybeFetch, info2.interval);
          }
        };
        poll();
      };
      ObservableQuery2.prototype.updateLastResult = function(newResult, variables) {
        var _this = this;
        if (variables === void 0) {
          variables = this.variables;
        }
        var error = muteDeprecations("getLastError", function() {
          return _this.getLastError();
        });
        if (error && this.last && !equal2.equal(variables, this.last.variables)) {
          error = void 0;
        }
        return this.last = tslib.__assign({ result: this.queryManager.assumeImmutableResults ? newResult : utilities.cloneDeep(newResult), variables }, error ? { error } : null);
      };
      ObservableQuery2.prototype.reobserveAsConcast = function(newOptions, newNetworkStatus) {
        var _this = this;
        this.isTornDown = false;
        var useDisposableConcast = newNetworkStatus === exports.NetworkStatus.refetch || newNetworkStatus === exports.NetworkStatus.fetchMore || newNetworkStatus === exports.NetworkStatus.poll;
        var oldVariables = this.options.variables;
        var oldFetchPolicy = this.options.fetchPolicy;
        var mergedOptions = utilities.compact(this.options, newOptions || {});
        var options = useDisposableConcast ? mergedOptions : assign(this.options, mergedOptions);
        var query = this.transformDocument(options.query);
        this.lastQuery = query;
        if (!useDisposableConcast) {
          this.updatePolling();
          if (newOptions && newOptions.variables && !equal2.equal(newOptions.variables, oldVariables) && options.fetchPolicy !== "standby" && (options.fetchPolicy === oldFetchPolicy || typeof options.nextFetchPolicy === "function")) {
            this.applyNextFetchPolicy("variables-changed", options);
            if (newNetworkStatus === void 0) {
              newNetworkStatus = exports.NetworkStatus.setVariables;
            }
          }
        }
        this.waitForOwnResult && (this.waitForOwnResult = skipCacheDataFor(options.fetchPolicy));
        var finishWaitingForOwnResult = function() {
          if (_this.concast === concast) {
            _this.waitForOwnResult = false;
          }
        };
        var variables = options.variables && tslib.__assign({}, options.variables);
        var _a2 = this.fetch(options, newNetworkStatus, query), concast = _a2.concast, fromLink = _a2.fromLink;
        var observer = {
          next: function(result2) {
            if (equal2.equal(_this.variables, variables)) {
              finishWaitingForOwnResult();
              _this.reportResult(result2, variables);
            }
          },
          error: function(error) {
            if (equal2.equal(_this.variables, variables)) {
              if (!errors.isApolloError(error)) {
                error = new errors.ApolloError({ networkError: error });
              }
              finishWaitingForOwnResult();
              _this.reportError(error, variables);
            }
          }
        };
        if (!useDisposableConcast && (fromLink || !this.concast)) {
          if (this.concast && this.observer) {
            this.concast.removeObserver(this.observer);
          }
          this.concast = concast;
          this.observer = observer;
        }
        concast.addObserver(observer);
        return concast;
      };
      ObservableQuery2.prototype.reobserve = function(newOptions, newNetworkStatus) {
        return utilities.preventUnhandledRejection(this.reobserveAsConcast(newOptions, newNetworkStatus).promise.then(this.maskResult));
      };
      ObservableQuery2.prototype.resubscribeAfterError = function() {
        var _this = this;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
          args[_i] = arguments[_i];
        }
        var last = this.last;
        muteDeprecations("resetLastResults", function() {
          return _this.resetLastResults();
        });
        var subscription = this.subscribe.apply(this, args);
        this.last = last;
        return subscription;
      };
      ObservableQuery2.prototype.observe = function() {
        this.reportResult(
          this.getCurrentFullResult(false),
          this.variables
        );
      };
      ObservableQuery2.prototype.reportResult = function(result2, variables) {
        var _this = this;
        var lastError = muteDeprecations("getLastError", function() {
          return _this.getLastError();
        });
        var isDifferent = this.isDifferentFromLastResult(result2, variables);
        if (lastError || !result2.partial || this.options.returnPartialData) {
          this.updateLastResult(result2, variables);
        }
        if (lastError || isDifferent) {
          utilities.iterateObserversSafely(this.observers, "next", this.maskResult(result2));
        }
      };
      ObservableQuery2.prototype.reportError = function(error, variables) {
        var _this = this;
        var errorResult = tslib.__assign(tslib.__assign({}, muteDeprecations("getLastResult", function() {
          return _this.getLastResult();
        })), { error, errors: error.graphQLErrors, networkStatus: exports.NetworkStatus.error, loading: false });
        this.updateLastResult(errorResult, variables);
        utilities.iterateObserversSafely(this.observers, "error", this.last.error = error);
      };
      ObservableQuery2.prototype.hasObservers = function() {
        return this.observers.size > 0;
      };
      ObservableQuery2.prototype.tearDownQuery = function() {
        if (this.isTornDown)
          return;
        if (this.concast && this.observer) {
          this.concast.removeObserver(this.observer);
          delete this.concast;
          delete this.observer;
        }
        this.stopPolling();
        this.subscriptions.forEach(function(sub) {
          return sub.unsubscribe();
        });
        this.subscriptions.clear();
        this.queryManager.stopQuery(this.queryId);
        this.observers.clear();
        this.isTornDown = true;
      };
      ObservableQuery2.prototype.transformDocument = function(document) {
        return this.queryManager.transform(document);
      };
      ObservableQuery2.prototype.maskResult = function(result2) {
        return result2 && "data" in result2 ? tslib.__assign(tslib.__assign({}, result2), { data: this.queryManager.maskOperation({
          document: this.query,
          data: result2.data,
          fetchPolicy: this.options.fetchPolicy,
          id: this.queryId
        }) }) : result2;
      };
      ObservableQuery2.prototype.resetNotifications = function() {
        this.cancelNotifyTimeout();
        this.dirty = false;
      };
      ObservableQuery2.prototype.cancelNotifyTimeout = function() {
        if (this.notifyTimeout) {
          clearTimeout(this.notifyTimeout);
          this.notifyTimeout = void 0;
        }
      };
      ObservableQuery2.prototype.scheduleNotify = function() {
        var _this = this;
        if (this.dirty)
          return;
        this.dirty = true;
        if (!this.notifyTimeout) {
          this.notifyTimeout = setTimeout(function() {
            return _this.notify();
          }, 0);
        }
      };
      ObservableQuery2.prototype.notify = function() {
        this.cancelNotifyTimeout();
        if (this.dirty) {
          if (this.options.fetchPolicy == "cache-only" || this.options.fetchPolicy == "cache-and-network" || !isNetworkRequestInFlight(this.queryInfo.networkStatus)) {
            var diff2 = this.queryInfo.getDiff();
            if (diff2.fromOptimisticTransaction) {
              this.observe();
            } else {
              this.reobserveCacheFirst();
            }
          }
        }
        this.dirty = false;
      };
      ObservableQuery2.prototype.reobserveCacheFirst = function() {
        var _a2 = this.options, fetchPolicy = _a2.fetchPolicy, nextFetchPolicy = _a2.nextFetchPolicy;
        if (fetchPolicy === "cache-and-network" || fetchPolicy === "network-only") {
          return this.reobserve({
            fetchPolicy: "cache-first",
            nextFetchPolicy: function(currentFetchPolicy, context) {
              this.nextFetchPolicy = nextFetchPolicy;
              if (typeof this.nextFetchPolicy === "function") {
                return this.nextFetchPolicy(currentFetchPolicy, context);
              }
              return fetchPolicy;
            }
          });
        }
        return this.reobserve();
      };
      ObservableQuery2.inactiveOnCreation = new optimism.Slot();
      return ObservableQuery2;
    })(utilities.Observable);
    utilities.fixObservableSubclass(ObservableQuery);
    function defaultSubscriptionObserverErrorCallback(error) {
      globalThis.__DEV__ !== false && globals.invariant.error(33, error.message, error.stack);
    }
    function logMissingFieldErrors(missing) {
      if (globalThis.__DEV__ !== false && missing) {
        globalThis.__DEV__ !== false && globals.invariant.debug(34, missing);
      }
    }
    function skipCacheDataFor(fetchPolicy) {
      return fetchPolicy === "network-only" || fetchPolicy === "no-cache" || fetchPolicy === "standby";
    }
    var destructiveMethodCounts = new (utilities.canUseWeakMap ? WeakMap : Map)();
    function wrapDestructiveCacheMethod(cache2, methodName) {
      var original = cache2[methodName];
      if (typeof original === "function") {
        cache2[methodName] = function() {
          destructiveMethodCounts.set(
            cache2,
            (destructiveMethodCounts.get(cache2) + 1) % 1e15
          );
          return original.apply(this, arguments);
        };
      }
    }
    var QueryInfo = (function() {
      function QueryInfo2(queryManager, queryId) {
        if (queryId === void 0) {
          queryId = queryManager.generateQueryId();
        }
        this.queryId = queryId;
        this.document = null;
        this.lastRequestId = 1;
        this.stopped = false;
        this.observableQuery = null;
        var cache2 = this.cache = queryManager.cache;
        if (!destructiveMethodCounts.has(cache2)) {
          destructiveMethodCounts.set(cache2, 0);
          wrapDestructiveCacheMethod(cache2, "evict");
          wrapDestructiveCacheMethod(cache2, "modify");
          wrapDestructiveCacheMethod(cache2, "reset");
        }
      }
      QueryInfo2.prototype.init = function(query) {
        var networkStatus = query.networkStatus || exports.NetworkStatus.loading;
        if (this.variables && this.networkStatus !== exports.NetworkStatus.loading && !equal2.equal(this.variables, query.variables)) {
          networkStatus = exports.NetworkStatus.setVariables;
        }
        if (!equal2.equal(query.variables, this.variables)) {
          this.lastDiff = void 0;
          this.cancel();
        }
        Object.assign(this, {
          document: query.document,
          variables: query.variables,
          networkError: null,
          graphQLErrors: this.graphQLErrors || [],
          networkStatus
        });
        if (query.observableQuery) {
          this.setObservableQuery(query.observableQuery);
        }
        if (query.lastRequestId) {
          this.lastRequestId = query.lastRequestId;
        }
        return this;
      };
      QueryInfo2.prototype.resetDiff = function() {
        this.lastDiff = void 0;
      };
      QueryInfo2.prototype.getDiff = function() {
        var _this = this;
        var options = this.getDiffOptions();
        if (this.lastDiff && equal2.equal(options, this.lastDiff.options)) {
          return this.lastDiff.diff;
        }
        this.updateWatch(this.variables);
        var oq = this.observableQuery;
        if (oq && oq.options.fetchPolicy === "no-cache") {
          return { complete: false };
        }
        var diff2 = muteDeprecations("canonizeResults", function() {
          return _this.cache.diff(options);
        });
        this.updateLastDiff(diff2, options);
        return diff2;
      };
      QueryInfo2.prototype.updateLastDiff = function(diff2, options) {
        this.lastDiff = diff2 ? {
          diff: diff2,
          options: options || this.getDiffOptions()
        } : void 0;
      };
      QueryInfo2.prototype.getDiffOptions = function(variables) {
        var _a2;
        if (variables === void 0) {
          variables = this.variables;
        }
        return {
          query: this.document,
          variables,
          returnPartialData: true,
          optimistic: true,
          canonizeResults: (_a2 = this.observableQuery) === null || _a2 === void 0 ? void 0 : _a2.options.canonizeResults
        };
      };
      QueryInfo2.prototype.setDiff = function(diff2) {
        var _this = this;
        var _a2;
        var oldDiff = this.lastDiff && this.lastDiff.diff;
        if (diff2 && !diff2.complete && muteDeprecations("getLastError", function() {
          var _a3;
          return (_a3 = _this.observableQuery) === null || _a3 === void 0 ? void 0 : _a3.getLastError();
        })) {
          return;
        }
        this.updateLastDiff(diff2);
        if (!equal2.equal(oldDiff && oldDiff.result, diff2 && diff2.result)) {
          (_a2 = this.observableQuery) === null || _a2 === void 0 ? void 0 : _a2["scheduleNotify"]();
        }
      };
      QueryInfo2.prototype.setObservableQuery = function(oq) {
        if (oq === this.observableQuery)
          return;
        this.observableQuery = oq;
        if (oq) {
          oq["queryInfo"] = this;
        }
      };
      QueryInfo2.prototype.stop = function() {
        var _a2;
        if (!this.stopped) {
          this.stopped = true;
          (_a2 = this.observableQuery) === null || _a2 === void 0 ? void 0 : _a2["resetNotifications"]();
          this.cancel();
          var oq = this.observableQuery;
          if (oq)
            oq.stopPolling();
        }
      };
      QueryInfo2.prototype.cancel = function() {
        var _a2;
        (_a2 = this.cancelWatch) === null || _a2 === void 0 ? void 0 : _a2.call(this);
        this.cancelWatch = void 0;
      };
      QueryInfo2.prototype.updateWatch = function(variables) {
        var _this = this;
        if (variables === void 0) {
          variables = this.variables;
        }
        var oq = this.observableQuery;
        if (oq && oq.options.fetchPolicy === "no-cache") {
          return;
        }
        var watchOptions = tslib.__assign(tslib.__assign({}, this.getDiffOptions(variables)), { watcher: this, callback: function(diff2) {
          return _this.setDiff(diff2);
        } });
        if (!this.lastWatch || !equal2.equal(watchOptions, this.lastWatch)) {
          this.cancel();
          this.cancelWatch = this.cache.watch(this.lastWatch = watchOptions);
        }
      };
      QueryInfo2.prototype.resetLastWrite = function() {
        this.lastWrite = void 0;
      };
      QueryInfo2.prototype.shouldWrite = function(result2, variables) {
        var lastWrite = this.lastWrite;
        return !(lastWrite && lastWrite.dmCount === destructiveMethodCounts.get(this.cache) && equal2.equal(variables, lastWrite.variables) && equal2.equal(result2.data, lastWrite.result.data));
      };
      QueryInfo2.prototype.markResult = function(result2, document, options, cacheWriteBehavior) {
        var _this = this;
        var _a2;
        var merger = new utilities.DeepMerger();
        var graphQLErrors = utilities.isNonEmptyArray(result2.errors) ? result2.errors.slice(0) : [];
        (_a2 = this.observableQuery) === null || _a2 === void 0 ? void 0 : _a2["resetNotifications"]();
        if ("incremental" in result2 && utilities.isNonEmptyArray(result2.incremental)) {
          var mergedData = utilities.mergeIncrementalData(this.getDiff().result, result2);
          result2.data = mergedData;
        } else if ("hasNext" in result2 && result2.hasNext) {
          var diff2 = this.getDiff();
          result2.data = merger.merge(diff2.result, result2.data);
        }
        this.graphQLErrors = graphQLErrors;
        if (options.fetchPolicy === "no-cache") {
          this.updateLastDiff({ result: result2.data, complete: true }, this.getDiffOptions(options.variables));
        } else if (cacheWriteBehavior !== 0) {
          if (shouldWriteResult(result2, options.errorPolicy)) {
            this.cache.performTransaction(function(cache2) {
              if (_this.shouldWrite(result2, options.variables)) {
                cache2.writeQuery({
                  query: document,
                  data: result2.data,
                  variables: options.variables,
                  overwrite: cacheWriteBehavior === 1
                });
                _this.lastWrite = {
                  result: result2,
                  variables: options.variables,
                  dmCount: destructiveMethodCounts.get(_this.cache)
                };
              } else {
                if (_this.lastDiff && _this.lastDiff.diff.complete) {
                  result2.data = _this.lastDiff.diff.result;
                  return;
                }
              }
              var diffOptions = _this.getDiffOptions(options.variables);
              var diff3 = muteDeprecations("canonizeResults", function() {
                return cache2.diff(diffOptions);
              });
              if (!_this.stopped && equal2.equal(_this.variables, options.variables)) {
                _this.updateWatch(options.variables);
              }
              _this.updateLastDiff(diff3, diffOptions);
              if (diff3.complete) {
                result2.data = diff3.result;
              }
            });
          } else {
            this.lastWrite = void 0;
          }
        }
      };
      QueryInfo2.prototype.markReady = function() {
        this.networkError = null;
        return this.networkStatus = exports.NetworkStatus.ready;
      };
      QueryInfo2.prototype.markError = function(error) {
        var _a2;
        this.networkStatus = exports.NetworkStatus.error;
        this.lastWrite = void 0;
        (_a2 = this.observableQuery) === null || _a2 === void 0 ? void 0 : _a2["resetNotifications"]();
        if (error.graphQLErrors) {
          this.graphQLErrors = error.graphQLErrors;
        }
        if (error.networkError) {
          this.networkError = error.networkError;
        }
        return error;
      };
      return QueryInfo2;
    })();
    function shouldWriteResult(result2, errorPolicy) {
      if (errorPolicy === void 0) {
        errorPolicy = "none";
      }
      var ignoreErrors = errorPolicy === "ignore" || errorPolicy === "all";
      var writeWithErrors = !utilities.graphQLResultHasError(result2);
      if (!writeWithErrors && ignoreErrors && result2.data) {
        writeWithErrors = true;
      }
      return writeWithErrors;
    }
    var hasOwnProperty5 = Object.prototype.hasOwnProperty;
    var IGNORE = /* @__PURE__ */ Object.create(null);
    var QueryManager = (function() {
      function QueryManager2(options) {
        var _this = this;
        this.clientAwareness = {};
        this.queries = /* @__PURE__ */ new Map();
        this.fetchCancelFns = /* @__PURE__ */ new Map();
        this.transformCache = new utilities.AutoCleanedWeakCache(utilities.cacheSizes["queryManager.getDocumentInfo"] || 2e3);
        this.queryIdCounter = 1;
        this.requestIdCounter = 1;
        this.mutationIdCounter = 1;
        this.inFlightLinkObservables = new trie.Trie(false);
        this.noCacheWarningsByQueryId = /* @__PURE__ */ new Set();
        var defaultDocumentTransform = new utilities.DocumentTransform(
          function(document) {
            return _this.cache.transformDocument(document);
          },
          { cache: false }
        );
        this.cache = options.cache;
        this.link = options.link;
        this.defaultOptions = options.defaultOptions;
        this.queryDeduplication = options.queryDeduplication;
        this.clientAwareness = options.clientAwareness;
        this.localState = options.localState;
        this.ssrMode = options.ssrMode;
        this.assumeImmutableResults = options.assumeImmutableResults;
        this.dataMasking = options.dataMasking;
        var documentTransform = options.documentTransform;
        this.documentTransform = documentTransform ? defaultDocumentTransform.concat(documentTransform).concat(defaultDocumentTransform) : defaultDocumentTransform;
        this.defaultContext = options.defaultContext || /* @__PURE__ */ Object.create(null);
        if (this.onBroadcast = options.onBroadcast) {
          this.mutationStore = /* @__PURE__ */ Object.create(null);
        }
      }
      QueryManager2.prototype.stop = function() {
        var _this = this;
        this.queries.forEach(function(_info, queryId) {
          _this.stopQueryNoBroadcast(queryId);
        });
        this.cancelPendingFetches(globals.newInvariantError(35));
      };
      QueryManager2.prototype.cancelPendingFetches = function(error) {
        this.fetchCancelFns.forEach(function(cancel) {
          return cancel(error);
        });
        this.fetchCancelFns.clear();
      };
      QueryManager2.prototype.mutate = function(_a2) {
        return tslib.__awaiter(this, arguments, void 0, function(_b) {
          var mutationId, hasClientExports, mutationStoreValue, isOptimistic, self2;
          var _c, _d;
          var mutation = _b.mutation, variables = _b.variables, optimisticResponse = _b.optimisticResponse, updateQueries = _b.updateQueries, _e = _b.refetchQueries, refetchQueries = _e === void 0 ? [] : _e, _f = _b.awaitRefetchQueries, awaitRefetchQueries = _f === void 0 ? false : _f, updateWithProxyFn = _b.update, onQueryUpdated = _b.onQueryUpdated, _g = _b.fetchPolicy, fetchPolicy = _g === void 0 ? ((_c = this.defaultOptions.mutate) === null || _c === void 0 ? void 0 : _c.fetchPolicy) || "network-only" : _g, _h = _b.errorPolicy, errorPolicy = _h === void 0 ? ((_d = this.defaultOptions.mutate) === null || _d === void 0 ? void 0 : _d.errorPolicy) || "none" : _h, keepRootFields = _b.keepRootFields, context = _b.context;
          return tslib.__generator(this, function(_j) {
            switch (_j.label) {
              case 0:
                globals.invariant(mutation, 36);
                globals.invariant(fetchPolicy === "network-only" || fetchPolicy === "no-cache", 37);
                mutationId = this.generateMutationId();
                mutation = this.cache.transformForLink(this.transform(mutation));
                hasClientExports = this.getDocumentInfo(mutation).hasClientExports;
                variables = this.getVariables(mutation, variables);
                if (!hasClientExports) return [3, 2];
                return [4, this.localState.addExportedVariables(mutation, variables, context)];
              case 1:
                variables = _j.sent();
                _j.label = 2;
              case 2:
                mutationStoreValue = this.mutationStore && (this.mutationStore[mutationId] = {
                  mutation,
                  variables,
                  loading: true,
                  error: null
                });
                isOptimistic = optimisticResponse && this.markMutationOptimistic(optimisticResponse, {
                  mutationId,
                  document: mutation,
                  variables,
                  fetchPolicy,
                  errorPolicy,
                  context,
                  updateQueries,
                  update: updateWithProxyFn,
                  keepRootFields
                });
                this.broadcastQueries();
                self2 = this;
                return [2, new Promise(function(resolve, reject) {
                  return utilities.asyncMap(self2.getObservableFromLink(mutation, tslib.__assign(tslib.__assign({}, context), { optimisticResponse: isOptimistic ? optimisticResponse : void 0 }), variables, {}, false), function(result2) {
                    if (utilities.graphQLResultHasError(result2) && errorPolicy === "none") {
                      throw new errors.ApolloError({
                        graphQLErrors: utilities.getGraphQLErrorsFromResult(result2)
                      });
                    }
                    if (mutationStoreValue) {
                      mutationStoreValue.loading = false;
                      mutationStoreValue.error = null;
                    }
                    var storeResult = tslib.__assign({}, result2);
                    if (typeof refetchQueries === "function") {
                      refetchQueries = refetchQueries(storeResult);
                    }
                    if (errorPolicy === "ignore" && utilities.graphQLResultHasError(storeResult)) {
                      delete storeResult.errors;
                    }
                    return self2.markMutationResult({
                      mutationId,
                      result: storeResult,
                      document: mutation,
                      variables,
                      fetchPolicy,
                      errorPolicy,
                      context,
                      update: updateWithProxyFn,
                      updateQueries,
                      awaitRefetchQueries,
                      refetchQueries,
                      removeOptimistic: isOptimistic ? mutationId : void 0,
                      onQueryUpdated,
                      keepRootFields
                    });
                  }).subscribe({
                    next: function(storeResult) {
                      self2.broadcastQueries();
                      if (!("hasNext" in storeResult) || storeResult.hasNext === false) {
                        resolve(tslib.__assign(tslib.__assign({}, storeResult), { data: self2.maskOperation({
                          document: mutation,
                          data: storeResult.data,
                          fetchPolicy,
                          id: mutationId
                        }) }));
                      }
                    },
                    error: function(err) {
                      if (mutationStoreValue) {
                        mutationStoreValue.loading = false;
                        mutationStoreValue.error = err;
                      }
                      if (isOptimistic) {
                        self2.cache.removeOptimistic(mutationId);
                      }
                      self2.broadcastQueries();
                      reject(err instanceof errors.ApolloError ? err : new errors.ApolloError({
                        networkError: err
                      }));
                    }
                  });
                })];
            }
          });
        });
      };
      QueryManager2.prototype.markMutationResult = function(mutation, cache2) {
        var _this = this;
        if (cache2 === void 0) {
          cache2 = this.cache;
        }
        var result2 = mutation.result;
        var cacheWrites = [];
        var skipCache = mutation.fetchPolicy === "no-cache";
        if (!skipCache && shouldWriteResult(result2, mutation.errorPolicy)) {
          if (!utilities.isExecutionPatchIncrementalResult(result2)) {
            cacheWrites.push({
              result: result2.data,
              dataId: "ROOT_MUTATION",
              query: mutation.document,
              variables: mutation.variables
            });
          }
          if (utilities.isExecutionPatchIncrementalResult(result2) && utilities.isNonEmptyArray(result2.incremental)) {
            var diff2 = cache2.diff({
              id: "ROOT_MUTATION",
              query: this.getDocumentInfo(mutation.document).asQuery,
              variables: mutation.variables,
              optimistic: false,
              returnPartialData: true
            });
            var mergedData = void 0;
            if (diff2.result) {
              mergedData = mergeIncrementalData(diff2.result, result2);
            }
            if (typeof mergedData !== "undefined") {
              result2.data = mergedData;
              cacheWrites.push({
                result: mergedData,
                dataId: "ROOT_MUTATION",
                query: mutation.document,
                variables: mutation.variables
              });
            }
          }
          var updateQueries_1 = mutation.updateQueries;
          if (updateQueries_1) {
            this.queries.forEach(function(_a2, queryId) {
              var observableQuery = _a2.observableQuery;
              var queryName = observableQuery && observableQuery.queryName;
              if (!queryName || !hasOwnProperty5.call(updateQueries_1, queryName)) {
                return;
              }
              var updater = updateQueries_1[queryName];
              var _b = _this.queries.get(queryId), document = _b.document, variables = _b.variables;
              var _c = cache2.diff({
                query: document,
                variables,
                returnPartialData: true,
                optimistic: false
              }), currentQueryResult = _c.result, complete = _c.complete;
              if (complete && currentQueryResult) {
                var nextQueryResult = updater(currentQueryResult, {
                  mutationResult: result2,
                  queryName: document && utilities.getOperationName(document) || void 0,
                  queryVariables: variables
                });
                if (nextQueryResult) {
                  cacheWrites.push({
                    result: nextQueryResult,
                    dataId: "ROOT_QUERY",
                    query: document,
                    variables
                  });
                }
              }
            });
          }
        }
        if (cacheWrites.length > 0 || (mutation.refetchQueries || "").length > 0 || mutation.update || mutation.onQueryUpdated || mutation.removeOptimistic) {
          var results_1 = [];
          this.refetchQueries({
            updateCache: function(cache3) {
              if (!skipCache) {
                cacheWrites.forEach(function(write) {
                  return cache3.write(write);
                });
              }
              var update = mutation.update;
              var isFinalResult = !utilities.isExecutionPatchResult(result2) || utilities.isExecutionPatchIncrementalResult(result2) && !result2.hasNext;
              if (update) {
                if (!skipCache) {
                  var diff3 = cache3.diff({
                    id: "ROOT_MUTATION",
                    query: _this.getDocumentInfo(mutation.document).asQuery,
                    variables: mutation.variables,
                    optimistic: false,
                    returnPartialData: true
                  });
                  if (diff3.complete) {
                    result2 = tslib.__assign(tslib.__assign({}, result2), { data: diff3.result });
                    if ("incremental" in result2) {
                      delete result2.incremental;
                    }
                    if ("hasNext" in result2) {
                      delete result2.hasNext;
                    }
                  }
                }
                if (isFinalResult) {
                  update(cache3, result2, {
                    context: mutation.context,
                    variables: mutation.variables
                  });
                }
              }
              if (!skipCache && !mutation.keepRootFields && isFinalResult) {
                cache3.modify({
                  id: "ROOT_MUTATION",
                  fields: function(value, _a2) {
                    var fieldName = _a2.fieldName, DELETE = _a2.DELETE;
                    return fieldName === "__typename" ? value : DELETE;
                  }
                });
              }
            },
            include: mutation.refetchQueries,
            optimistic: false,
            removeOptimistic: mutation.removeOptimistic,
            onQueryUpdated: mutation.onQueryUpdated || null
          }).forEach(function(result3) {
            return results_1.push(result3);
          });
          if (mutation.awaitRefetchQueries || mutation.onQueryUpdated) {
            return Promise.all(results_1).then(function() {
              return result2;
            });
          }
        }
        return Promise.resolve(result2);
      };
      QueryManager2.prototype.markMutationOptimistic = function(optimisticResponse, mutation) {
        var _this = this;
        var data = typeof optimisticResponse === "function" ? optimisticResponse(mutation.variables, { IGNORE }) : optimisticResponse;
        if (data === IGNORE) {
          return false;
        }
        this.cache.recordOptimisticTransaction(function(cache2) {
          try {
            _this.markMutationResult(tslib.__assign(tslib.__assign({}, mutation), { result: { data } }), cache2);
          } catch (error) {
            globalThis.__DEV__ !== false && globals.invariant.error(error);
          }
        }, mutation.mutationId);
        return true;
      };
      QueryManager2.prototype.fetchQuery = function(queryId, options, networkStatus) {
        return this.fetchConcastWithInfo(this.getOrCreateQuery(queryId), options, networkStatus).concast.promise;
      };
      QueryManager2.prototype.getQueryStore = function() {
        var store = /* @__PURE__ */ Object.create(null);
        this.queries.forEach(function(info, queryId) {
          store[queryId] = {
            variables: info.variables,
            networkStatus: info.networkStatus,
            networkError: info.networkError,
            graphQLErrors: info.graphQLErrors
          };
        });
        return store;
      };
      QueryManager2.prototype.resetErrors = function(queryId) {
        var queryInfo = this.queries.get(queryId);
        if (queryInfo) {
          queryInfo.networkError = void 0;
          queryInfo.graphQLErrors = [];
        }
      };
      QueryManager2.prototype.transform = function(document) {
        return this.documentTransform.transformDocument(document);
      };
      QueryManager2.prototype.getDocumentInfo = function(document) {
        var transformCache = this.transformCache;
        if (!transformCache.has(document)) {
          var cacheEntry = {
            hasClientExports: utilities.hasClientExports(document),
            hasForcedResolvers: this.localState.shouldForceResolvers(document),
            hasNonreactiveDirective: utilities.hasDirectives(["nonreactive"], document),
            nonReactiveQuery: utilities.addNonReactiveToNamedFragments(document),
            clientQuery: this.localState.clientQuery(document),
            serverQuery: utilities.removeDirectivesFromDocument([
              { name: "client", remove: true },
              { name: "connection" },
              { name: "nonreactive" },
              { name: "unmask" }
            ], document),
            defaultVars: utilities.getDefaultValues(utilities.getOperationDefinition(document)),
            asQuery: tslib.__assign(tslib.__assign({}, document), { definitions: document.definitions.map(function(def) {
              if (def.kind === "OperationDefinition" && def.operation !== "query") {
                return tslib.__assign(tslib.__assign({}, def), { operation: "query" });
              }
              return def;
            }) })
          };
          transformCache.set(document, cacheEntry);
        }
        return transformCache.get(document);
      };
      QueryManager2.prototype.getVariables = function(document, variables) {
        return tslib.__assign(tslib.__assign({}, this.getDocumentInfo(document).defaultVars), variables);
      };
      QueryManager2.prototype.watchQuery = function(options) {
        var query = this.transform(options.query);
        options = tslib.__assign(tslib.__assign({}, options), { variables: this.getVariables(query, options.variables) });
        if (typeof options.notifyOnNetworkStatusChange === "undefined") {
          options.notifyOnNetworkStatusChange = false;
        }
        var queryInfo = new QueryInfo(this);
        var observable = new ObservableQuery({
          queryManager: this,
          queryInfo,
          options
        });
        observable["lastQuery"] = query;
        if (!ObservableQuery["inactiveOnCreation"].getValue()) {
          this.queries.set(observable.queryId, queryInfo);
        }
        queryInfo.init({
          document: query,
          observableQuery: observable,
          variables: observable.variables
        });
        return observable;
      };
      QueryManager2.prototype.query = function(options, queryId) {
        var _this = this;
        if (queryId === void 0) {
          queryId = this.generateQueryId();
        }
        globals.invariant(options.query, 38);
        globals.invariant(options.query.kind === "Document", 39);
        globals.invariant(!options.returnPartialData, 40);
        globals.invariant(!options.pollInterval, 41);
        var query = this.transform(options.query);
        return this.fetchQuery(queryId, tslib.__assign(tslib.__assign({}, options), { query })).then(function(result2) {
          return result2 && tslib.__assign(tslib.__assign({}, result2), { data: _this.maskOperation({
            document: query,
            data: result2.data,
            fetchPolicy: options.fetchPolicy,
            id: queryId
          }) });
        }).finally(function() {
          return _this.stopQuery(queryId);
        });
      };
      QueryManager2.prototype.generateQueryId = function() {
        return String(this.queryIdCounter++);
      };
      QueryManager2.prototype.generateRequestId = function() {
        return this.requestIdCounter++;
      };
      QueryManager2.prototype.generateMutationId = function() {
        return String(this.mutationIdCounter++);
      };
      QueryManager2.prototype.stopQueryInStore = function(queryId) {
        this.stopQueryInStoreNoBroadcast(queryId);
        this.broadcastQueries();
      };
      QueryManager2.prototype.stopQueryInStoreNoBroadcast = function(queryId) {
        var queryInfo = this.queries.get(queryId);
        if (queryInfo)
          queryInfo.stop();
      };
      QueryManager2.prototype.clearStore = function(options) {
        if (options === void 0) {
          options = {
            discardWatches: true
          };
        }
        this.cancelPendingFetches(globals.newInvariantError(42));
        this.queries.forEach(function(queryInfo) {
          if (queryInfo.observableQuery) {
            queryInfo.networkStatus = exports.NetworkStatus.loading;
          } else {
            queryInfo.stop();
          }
        });
        if (this.mutationStore) {
          this.mutationStore = /* @__PURE__ */ Object.create(null);
        }
        return this.cache.reset(options);
      };
      QueryManager2.prototype.getObservableQueries = function(include) {
        var _this = this;
        if (include === void 0) {
          include = "active";
        }
        var queries = /* @__PURE__ */ new Map();
        var queryNames = /* @__PURE__ */ new Map();
        var queryNamesAndQueryStrings = /* @__PURE__ */ new Map();
        var legacyQueryOptions = /* @__PURE__ */ new Set();
        if (Array.isArray(include)) {
          include.forEach(function(desc) {
            if (typeof desc === "string") {
              queryNames.set(desc, desc);
              queryNamesAndQueryStrings.set(desc, false);
            } else if (utilities.isDocumentNode(desc)) {
              var queryString = utilities.print(_this.transform(desc));
              queryNames.set(queryString, utilities.getOperationName(desc));
              queryNamesAndQueryStrings.set(queryString, false);
            } else if (utilities.isNonNullObject(desc) && desc.query) {
              legacyQueryOptions.add(desc);
            }
          });
        }
        this.queries.forEach(function(_a2, queryId) {
          var oq = _a2.observableQuery, document = _a2.document;
          if (oq) {
            if (include === "all") {
              queries.set(queryId, oq);
              return;
            }
            var queryName = oq.queryName, fetchPolicy = oq.options.fetchPolicy;
            if (fetchPolicy === "standby" || include === "active" && !oq.hasObservers()) {
              return;
            }
            if (include === "active" || queryName && queryNamesAndQueryStrings.has(queryName) || document && queryNamesAndQueryStrings.has(utilities.print(document))) {
              queries.set(queryId, oq);
              if (queryName)
                queryNamesAndQueryStrings.set(queryName, true);
              if (document)
                queryNamesAndQueryStrings.set(utilities.print(document), true);
            }
          }
        });
        if (legacyQueryOptions.size) {
          legacyQueryOptions.forEach(function(options) {
            var queryId = utilities.makeUniqueId("legacyOneTimeQuery");
            var queryInfo = _this.getOrCreateQuery(queryId).init({
              document: options.query,
              variables: options.variables
            });
            var oq = new ObservableQuery({
              queryManager: _this,
              queryInfo,
              options: tslib.__assign(tslib.__assign({}, options), { fetchPolicy: "network-only" })
            });
            globals.invariant(oq.queryId === queryId);
            queryInfo.setObservableQuery(oq);
            queries.set(queryId, oq);
          });
        }
        if (globalThis.__DEV__ !== false && queryNamesAndQueryStrings.size) {
          queryNamesAndQueryStrings.forEach(function(included, nameOrQueryString) {
            if (!included) {
              var queryName = queryNames.get(nameOrQueryString);
              if (queryName) {
                globalThis.__DEV__ !== false && globals.invariant.warn(43, queryName);
              } else {
                globalThis.__DEV__ !== false && globals.invariant.warn(44);
              }
            }
          });
        }
        return queries;
      };
      QueryManager2.prototype.reFetchObservableQueries = function(includeStandby) {
        var _this = this;
        if (includeStandby === void 0) {
          includeStandby = false;
        }
        var observableQueryPromises = [];
        this.getObservableQueries(includeStandby ? "all" : "active").forEach(function(observableQuery, queryId) {
          var fetchPolicy = observableQuery.options.fetchPolicy;
          muteDeprecations("resetLastResults", function() {
            return observableQuery.resetLastResults();
          });
          if (includeStandby || fetchPolicy !== "standby" && fetchPolicy !== "cache-only") {
            observableQueryPromises.push(observableQuery.refetch());
          }
          (_this.queries.get(queryId) || observableQuery["queryInfo"]).setDiff(null);
        });
        this.broadcastQueries();
        return Promise.all(observableQueryPromises);
      };
      QueryManager2.prototype.startGraphQLSubscription = function(options) {
        var _this = this;
        var query = options.query, variables = options.variables;
        var fetchPolicy = options.fetchPolicy, _a2 = options.errorPolicy, errorPolicy = _a2 === void 0 ? "none" : _a2, _b = options.context, context = _b === void 0 ? {} : _b, _c = options.extensions, extensions = _c === void 0 ? {} : _c;
        query = this.transform(query);
        variables = this.getVariables(query, variables);
        var makeObservable = function(variables2) {
          return _this.getObservableFromLink(query, context, variables2, extensions).map(function(result2) {
            if (fetchPolicy !== "no-cache") {
              if (shouldWriteResult(result2, errorPolicy)) {
                _this.cache.write({
                  query,
                  result: result2.data,
                  dataId: "ROOT_SUBSCRIPTION",
                  variables: variables2
                });
              }
              _this.broadcastQueries();
            }
            var hasErrors = utilities.graphQLResultHasError(result2);
            var hasProtocolErrors = errors.graphQLResultHasProtocolErrors(result2);
            if (hasErrors || hasProtocolErrors) {
              var errors$1 = {};
              if (hasErrors) {
                errors$1.graphQLErrors = result2.errors;
              }
              if (hasProtocolErrors) {
                errors$1.protocolErrors = result2.extensions[errors.PROTOCOL_ERRORS_SYMBOL];
              }
              if (errorPolicy === "none" || hasProtocolErrors) {
                throw new errors.ApolloError(errors$1);
              }
            }
            if (errorPolicy === "ignore") {
              delete result2.errors;
            }
            return result2;
          });
        };
        if (this.getDocumentInfo(query).hasClientExports) {
          var observablePromise_1 = this.localState.addExportedVariables(query, variables, context).then(makeObservable);
          return new utilities.Observable(function(observer) {
            var sub = null;
            observablePromise_1.then(function(observable) {
              return sub = observable.subscribe(observer);
            }, observer.error);
            return function() {
              return sub && sub.unsubscribe();
            };
          });
        }
        return makeObservable(variables);
      };
      QueryManager2.prototype.stopQuery = function(queryId) {
        this.stopQueryNoBroadcast(queryId);
        this.broadcastQueries();
      };
      QueryManager2.prototype.stopQueryNoBroadcast = function(queryId) {
        this.stopQueryInStoreNoBroadcast(queryId);
        this.removeQuery(queryId);
      };
      QueryManager2.prototype.removeQuery = function(queryId) {
        var _a2;
        this.fetchCancelFns.delete(queryId);
        if (this.queries.has(queryId)) {
          (_a2 = this.queries.get(queryId)) === null || _a2 === void 0 ? void 0 : _a2.stop();
          this.queries.delete(queryId);
        }
      };
      QueryManager2.prototype.broadcastQueries = function() {
        if (this.onBroadcast)
          this.onBroadcast();
        this.queries.forEach(function(info) {
          var _a2;
          return (_a2 = info.observableQuery) === null || _a2 === void 0 ? void 0 : _a2["notify"]();
        });
      };
      QueryManager2.prototype.getLocalState = function() {
        return this.localState;
      };
      QueryManager2.prototype.getObservableFromLink = function(query, context, variables, extensions, deduplication) {
        var _this = this;
        var _a2;
        if (deduplication === void 0) {
          deduplication = (_a2 = context === null || context === void 0 ? void 0 : context.queryDeduplication) !== null && _a2 !== void 0 ? _a2 : this.queryDeduplication;
        }
        var observable;
        var _b = this.getDocumentInfo(query), serverQuery = _b.serverQuery, clientQuery = _b.clientQuery;
        if (serverQuery) {
          var _c = this, inFlightLinkObservables_1 = _c.inFlightLinkObservables, link = _c.link;
          var operation = {
            query: serverQuery,
            variables,
            operationName: utilities.getOperationName(serverQuery) || void 0,
            context: this.prepareContext(tslib.__assign(tslib.__assign({}, context), { forceFetch: !deduplication })),
            extensions
          };
          context = operation.context;
          if (deduplication) {
            var printedServerQuery_1 = utilities.print(serverQuery);
            var varJson_1 = cache.canonicalStringify(variables);
            var entry = inFlightLinkObservables_1.lookup(printedServerQuery_1, varJson_1);
            observable = entry.observable;
            if (!observable) {
              var concast_1 = new utilities.Concast([
                core.execute(link, operation)
              ]);
              observable = entry.observable = concast_1;
              concast_1.beforeNext(function cb(method, arg) {
                if (method === "next" && "hasNext" in arg && arg.hasNext) {
                  concast_1.beforeNext(cb);
                } else {
                  inFlightLinkObservables_1.remove(printedServerQuery_1, varJson_1);
                }
              });
            }
          } else {
            observable = new utilities.Concast([
              core.execute(link, operation)
            ]);
          }
        } else {
          observable = new utilities.Concast([utilities.Observable.of({ data: {} })]);
          context = this.prepareContext(context);
        }
        if (clientQuery) {
          observable = utilities.asyncMap(observable, function(result2) {
            return _this.localState.runResolvers({
              document: clientQuery,
              remoteResult: result2,
              context,
              variables
            });
          });
        }
        return observable;
      };
      QueryManager2.prototype.getResultsFromLink = function(queryInfo, cacheWriteBehavior, options) {
        var requestId = queryInfo.lastRequestId = this.generateRequestId();
        var linkDocument = this.cache.transformForLink(options.query);
        return utilities.asyncMap(this.getObservableFromLink(linkDocument, options.context, options.variables), function(result2) {
          var graphQLErrors = utilities.getGraphQLErrorsFromResult(result2);
          var hasErrors = graphQLErrors.length > 0;
          var errorPolicy = options.errorPolicy;
          if (requestId >= queryInfo.lastRequestId) {
            if (hasErrors && errorPolicy === "none") {
              throw queryInfo.markError(new errors.ApolloError({
                graphQLErrors
              }));
            }
            queryInfo.markResult(result2, linkDocument, options, cacheWriteBehavior);
            queryInfo.markReady();
          }
          var aqr = {
            data: result2.data,
            loading: false,
            networkStatus: exports.NetworkStatus.ready
          };
          if (hasErrors && errorPolicy === "none") {
            aqr.data = void 0;
          }
          if (hasErrors && errorPolicy !== "ignore") {
            aqr.errors = graphQLErrors;
            aqr.networkStatus = exports.NetworkStatus.error;
          }
          return aqr;
        }, function(networkError) {
          var error = errors.isApolloError(networkError) ? networkError : new errors.ApolloError({ networkError });
          if (requestId >= queryInfo.lastRequestId) {
            queryInfo.markError(error);
          }
          throw error;
        });
      };
      QueryManager2.prototype.fetchConcastWithInfo = function(queryInfo, options, networkStatus, query) {
        var _this = this;
        if (networkStatus === void 0) {
          networkStatus = exports.NetworkStatus.loading;
        }
        if (query === void 0) {
          query = options.query;
        }
        var variables = this.getVariables(query, options.variables);
        var defaults = this.defaultOptions.watchQuery;
        var _a2 = options.fetchPolicy, fetchPolicy = _a2 === void 0 ? defaults && defaults.fetchPolicy || "cache-first" : _a2, _b = options.errorPolicy, errorPolicy = _b === void 0 ? defaults && defaults.errorPolicy || "none" : _b, _c = options.returnPartialData, returnPartialData = _c === void 0 ? false : _c, _d = options.notifyOnNetworkStatusChange, notifyOnNetworkStatusChange = _d === void 0 ? false : _d, _e = options.context, context = _e === void 0 ? {} : _e;
        var normalized = Object.assign({}, options, {
          query,
          variables,
          fetchPolicy,
          errorPolicy,
          returnPartialData,
          notifyOnNetworkStatusChange,
          context
        });
        var fromVariables = function(variables2) {
          normalized.variables = variables2;
          var sourcesWithInfo2 = _this.fetchQueryByPolicy(queryInfo, normalized, networkStatus);
          if (normalized.fetchPolicy !== "standby" && sourcesWithInfo2.sources.length > 0 && queryInfo.observableQuery) {
            queryInfo.observableQuery["applyNextFetchPolicy"]("after-fetch", options);
          }
          return sourcesWithInfo2;
        };
        var cleanupCancelFn = function() {
          return _this.fetchCancelFns.delete(queryInfo.queryId);
        };
        this.fetchCancelFns.set(queryInfo.queryId, function(reason) {
          cleanupCancelFn();
          setTimeout(function() {
            return concast.cancel(reason);
          });
        });
        var concast, containsDataFromLink;
        if (this.getDocumentInfo(normalized.query).hasClientExports) {
          concast = new utilities.Concast(this.localState.addExportedVariables(normalized.query, normalized.variables, normalized.context).then(fromVariables).then(function(sourcesWithInfo2) {
            return sourcesWithInfo2.sources;
          }));
          containsDataFromLink = true;
        } else {
          var sourcesWithInfo = fromVariables(normalized.variables);
          containsDataFromLink = sourcesWithInfo.fromLink;
          concast = new utilities.Concast(sourcesWithInfo.sources);
        }
        concast.promise.then(cleanupCancelFn, cleanupCancelFn);
        return {
          concast,
          fromLink: containsDataFromLink
        };
      };
      QueryManager2.prototype.refetchQueries = function(_a2) {
        var _this = this;
        var updateCache = _a2.updateCache, include = _a2.include, _b = _a2.optimistic, optimistic = _b === void 0 ? false : _b, _c = _a2.removeOptimistic, removeOptimistic = _c === void 0 ? optimistic ? utilities.makeUniqueId("refetchQueries") : void 0 : _c, onQueryUpdated = _a2.onQueryUpdated;
        var includedQueriesById = /* @__PURE__ */ new Map();
        if (include) {
          this.getObservableQueries(include).forEach(function(oq, queryId) {
            includedQueriesById.set(queryId, {
              oq,
              lastDiff: (_this.queries.get(queryId) || oq["queryInfo"]).getDiff()
            });
          });
        }
        var results = /* @__PURE__ */ new Map();
        if (updateCache) {
          this.cache.batch({
            update: updateCache,
            optimistic: optimistic && removeOptimistic || false,
            removeOptimistic,
            onWatchUpdated: function(watch, diff2, lastDiff) {
              var oq = watch.watcher instanceof QueryInfo && watch.watcher.observableQuery;
              if (oq) {
                if (onQueryUpdated) {
                  includedQueriesById.delete(oq.queryId);
                  var result2 = onQueryUpdated(oq, diff2, lastDiff);
                  if (result2 === true) {
                    result2 = oq.refetch();
                  }
                  if (result2 !== false) {
                    results.set(oq, result2);
                  }
                  return result2;
                }
                if (onQueryUpdated !== null) {
                  includedQueriesById.set(oq.queryId, { oq, lastDiff, diff: diff2 });
                }
              }
            }
          });
        }
        if (includedQueriesById.size) {
          includedQueriesById.forEach(function(_a3, queryId) {
            var oq = _a3.oq, lastDiff = _a3.lastDiff, diff2 = _a3.diff;
            var result2;
            if (onQueryUpdated) {
              if (!diff2) {
                diff2 = muteDeprecations("canonizeResults", function() {
                  return _this.cache.diff(oq["queryInfo"]["getDiffOptions"]());
                });
              }
              result2 = onQueryUpdated(oq, diff2, lastDiff);
            }
            if (!onQueryUpdated || result2 === true) {
              result2 = oq.refetch();
            }
            if (result2 !== false) {
              results.set(oq, result2);
            }
            if (queryId.indexOf("legacyOneTimeQuery") >= 0) {
              _this.stopQueryNoBroadcast(queryId);
            }
          });
        }
        if (removeOptimistic) {
          this.cache.removeOptimistic(removeOptimistic);
        }
        return results;
      };
      QueryManager2.prototype.maskOperation = function(options) {
        var _a2, _b, _c;
        var document = options.document, data = options.data;
        if (globalThis.__DEV__ !== false) {
          var fetchPolicy = options.fetchPolicy, id = options.id;
          var operationType = (_a2 = utilities.getOperationDefinition(document)) === null || _a2 === void 0 ? void 0 : _a2.operation;
          var operationId = ((_b = operationType === null || operationType === void 0 ? void 0 : operationType[0]) !== null && _b !== void 0 ? _b : "o") + id;
          if (this.dataMasking && fetchPolicy === "no-cache" && !utilities.isFullyUnmaskedOperation(document) && !this.noCacheWarningsByQueryId.has(operationId)) {
            this.noCacheWarningsByQueryId.add(operationId);
            globalThis.__DEV__ !== false && globals.invariant.warn(
              45,
              (_c = utilities.getOperationName(document)) !== null && _c !== void 0 ? _c : "Unnamed ".concat(operationType !== null && operationType !== void 0 ? operationType : "operation")
            );
          }
        }
        return this.dataMasking ? masking.maskOperation(data, document, this.cache) : data;
      };
      QueryManager2.prototype.maskFragment = function(options) {
        var data = options.data, fragment = options.fragment, fragmentName = options.fragmentName;
        return this.dataMasking ? masking.maskFragment(data, fragment, this.cache, fragmentName) : data;
      };
      QueryManager2.prototype.fetchQueryByPolicy = function(queryInfo, _a2, networkStatus) {
        var _this = this;
        var query = _a2.query, variables = _a2.variables, fetchPolicy = _a2.fetchPolicy, refetchWritePolicy = _a2.refetchWritePolicy, errorPolicy = _a2.errorPolicy, returnPartialData = _a2.returnPartialData, context = _a2.context, notifyOnNetworkStatusChange = _a2.notifyOnNetworkStatusChange;
        var oldNetworkStatus = queryInfo.networkStatus;
        queryInfo.init({
          document: query,
          variables,
          networkStatus
        });
        var readCache = function() {
          return queryInfo.getDiff();
        };
        var resultsFromCache = function(diff3, networkStatus2) {
          if (networkStatus2 === void 0) {
            networkStatus2 = queryInfo.networkStatus || exports.NetworkStatus.loading;
          }
          var data = diff3.result;
          if (globalThis.__DEV__ !== false && !returnPartialData && !equal2.equal(data, {})) {
            logMissingFieldErrors(diff3.missing);
          }
          var fromData = function(data2) {
            return utilities.Observable.of(tslib.__assign({ data: data2, loading: isNetworkRequestInFlight(networkStatus2), networkStatus: networkStatus2 }, diff3.complete ? null : { partial: true }));
          };
          if (data && _this.getDocumentInfo(query).hasForcedResolvers) {
            return _this.localState.runResolvers({
              document: query,
              remoteResult: { data },
              context,
              variables,
              onlyRunForcedResolvers: true
            }).then(function(resolved) {
              return fromData(resolved.data || void 0);
            });
          }
          if (errorPolicy === "none" && networkStatus2 === exports.NetworkStatus.refetch && Array.isArray(diff3.missing)) {
            return fromData(void 0);
          }
          return fromData(data);
        };
        var cacheWriteBehavior = fetchPolicy === "no-cache" ? 0 : networkStatus === exports.NetworkStatus.refetch && refetchWritePolicy !== "merge" ? 1 : 2;
        var resultsFromLink = function() {
          return _this.getResultsFromLink(queryInfo, cacheWriteBehavior, {
            query,
            variables,
            context,
            fetchPolicy,
            errorPolicy
          });
        };
        var shouldNotify = notifyOnNetworkStatusChange && typeof oldNetworkStatus === "number" && oldNetworkStatus !== networkStatus && isNetworkRequestInFlight(networkStatus);
        switch (fetchPolicy) {
          default:
          case "cache-first": {
            var diff2 = readCache();
            if (diff2.complete) {
              return {
                fromLink: false,
                sources: [resultsFromCache(diff2, queryInfo.markReady())]
              };
            }
            if (returnPartialData || shouldNotify) {
              return {
                fromLink: true,
                sources: [resultsFromCache(diff2), resultsFromLink()]
              };
            }
            return { fromLink: true, sources: [resultsFromLink()] };
          }
          case "cache-and-network": {
            var diff2 = readCache();
            if (diff2.complete || returnPartialData || shouldNotify) {
              return {
                fromLink: true,
                sources: [resultsFromCache(diff2), resultsFromLink()]
              };
            }
            return { fromLink: true, sources: [resultsFromLink()] };
          }
          case "cache-only":
            return {
              fromLink: false,
              sources: [resultsFromCache(readCache(), queryInfo.markReady())]
            };
          case "network-only":
            if (shouldNotify) {
              return {
                fromLink: true,
                sources: [resultsFromCache(readCache()), resultsFromLink()]
              };
            }
            return { fromLink: true, sources: [resultsFromLink()] };
          case "no-cache":
            if (shouldNotify) {
              return {
                fromLink: true,
                sources: [resultsFromCache(queryInfo.getDiff()), resultsFromLink()]
              };
            }
            return { fromLink: true, sources: [resultsFromLink()] };
          case "standby":
            return { fromLink: false, sources: [] };
        }
      };
      QueryManager2.prototype.getOrCreateQuery = function(queryId) {
        if (queryId && !this.queries.has(queryId)) {
          this.queries.set(queryId, new QueryInfo(this, queryId));
        }
        return this.queries.get(queryId);
      };
      QueryManager2.prototype.prepareContext = function(context) {
        if (context === void 0) {
          context = {};
        }
        var newContext = this.localState.prepareContext(context);
        return tslib.__assign(tslib.__assign(tslib.__assign({}, this.defaultContext), newContext), { clientAwareness: this.clientAwareness });
      };
      return QueryManager2;
    })();
    var LocalState = (function() {
      function LocalState2(_a2) {
        var cache2 = _a2.cache, client = _a2.client, resolvers = _a2.resolvers, fragmentMatcher = _a2.fragmentMatcher;
        this.selectionsToResolveCache = /* @__PURE__ */ new WeakMap();
        this.cache = cache2;
        if (client) {
          this.client = client;
        }
        if (resolvers) {
          this.addResolvers(resolvers);
        }
        if (fragmentMatcher) {
          this.setFragmentMatcher(fragmentMatcher);
        }
      }
      LocalState2.prototype.addResolvers = function(resolvers) {
        var _this = this;
        this.resolvers = this.resolvers || {};
        if (Array.isArray(resolvers)) {
          resolvers.forEach(function(resolverGroup) {
            _this.resolvers = utilities.mergeDeep(_this.resolvers, resolverGroup);
          });
        } else {
          this.resolvers = utilities.mergeDeep(this.resolvers, resolvers);
        }
      };
      LocalState2.prototype.setResolvers = function(resolvers) {
        this.resolvers = {};
        this.addResolvers(resolvers);
      };
      LocalState2.prototype.getResolvers = function() {
        return this.resolvers || {};
      };
      LocalState2.prototype.runResolvers = function(_a2) {
        return tslib.__awaiter(this, arguments, void 0, function(_b) {
          var document = _b.document, remoteResult = _b.remoteResult, context = _b.context, variables = _b.variables, _c = _b.onlyRunForcedResolvers, onlyRunForcedResolvers = _c === void 0 ? false : _c;
          return tslib.__generator(this, function(_d) {
            if (document) {
              return [2, this.resolveDocument(document, remoteResult.data, context, variables, this.fragmentMatcher, onlyRunForcedResolvers).then(function(localResult) {
                return tslib.__assign(tslib.__assign({}, remoteResult), { data: localResult.result });
              })];
            }
            return [2, remoteResult];
          });
        });
      };
      LocalState2.prototype.setFragmentMatcher = function(fragmentMatcher) {
        this.fragmentMatcher = fragmentMatcher;
      };
      LocalState2.prototype.getFragmentMatcher = function() {
        return this.fragmentMatcher;
      };
      LocalState2.prototype.clientQuery = function(document) {
        if (utilities.hasDirectives(["client"], document)) {
          if (this.resolvers) {
            return document;
          }
        }
        return null;
      };
      LocalState2.prototype.serverQuery = function(document) {
        return utilities.removeClientSetsFromDocument(document);
      };
      LocalState2.prototype.prepareContext = function(context) {
        var cache2 = this.cache;
        return tslib.__assign(tslib.__assign({}, context), {
          cache: cache2,
          getCacheKey: function(obj) {
            return cache2.identify(obj);
          }
        });
      };
      LocalState2.prototype.addExportedVariables = function(document_1) {
        return tslib.__awaiter(this, arguments, void 0, function(document, variables, context) {
          if (variables === void 0) {
            variables = {};
          }
          if (context === void 0) {
            context = {};
          }
          return tslib.__generator(this, function(_a2) {
            if (document) {
              return [2, this.resolveDocument(document, this.buildRootValueFromCache(document, variables) || {}, this.prepareContext(context), variables).then(function(data) {
                return tslib.__assign(tslib.__assign({}, variables), data.exportedVariables);
              })];
            }
            return [2, tslib.__assign({}, variables)];
          });
        });
      };
      LocalState2.prototype.shouldForceResolvers = function(document) {
        var forceResolvers = false;
        graphql2.visit(document, {
          Directive: {
            enter: function(node) {
              if (node.name.value === "client" && node.arguments) {
                forceResolvers = node.arguments.some(function(arg) {
                  return arg.name.value === "always" && arg.value.kind === "BooleanValue" && arg.value.value === true;
                });
                if (forceResolvers) {
                  return graphql2.BREAK;
                }
              }
            }
          }
        });
        return forceResolvers;
      };
      LocalState2.prototype.buildRootValueFromCache = function(document, variables) {
        return this.cache.diff({
          query: utilities.buildQueryFromSelectionSet(document),
          variables,
          returnPartialData: true,
          optimistic: false
        }).result;
      };
      LocalState2.prototype.resolveDocument = function(document_1, rootValue_1) {
        return tslib.__awaiter(this, arguments, void 0, function(document, rootValue, context, variables, fragmentMatcher, onlyRunForcedResolvers) {
          var mainDefinition, fragments, fragmentMap, selectionsToResolve, definitionOperation, defaultOperationType, _a2, cache2, client, execContext, isClientFieldDescendant;
          if (context === void 0) {
            context = {};
          }
          if (variables === void 0) {
            variables = {};
          }
          if (fragmentMatcher === void 0) {
            fragmentMatcher = function() {
              return true;
            };
          }
          if (onlyRunForcedResolvers === void 0) {
            onlyRunForcedResolvers = false;
          }
          return tslib.__generator(this, function(_b) {
            mainDefinition = utilities.getMainDefinition(document);
            fragments = utilities.getFragmentDefinitions(document);
            fragmentMap = utilities.createFragmentMap(fragments);
            selectionsToResolve = this.collectSelectionsToResolve(mainDefinition, fragmentMap);
            definitionOperation = mainDefinition.operation;
            defaultOperationType = definitionOperation ? definitionOperation.charAt(0).toUpperCase() + definitionOperation.slice(1) : "Query";
            _a2 = this, cache2 = _a2.cache, client = _a2.client;
            execContext = {
              fragmentMap,
              context: tslib.__assign(tslib.__assign({}, context), { cache: cache2, client }),
              variables,
              fragmentMatcher,
              defaultOperationType,
              exportedVariables: {},
              selectionsToResolve,
              onlyRunForcedResolvers
            };
            isClientFieldDescendant = false;
            return [2, this.resolveSelectionSet(mainDefinition.selectionSet, isClientFieldDescendant, rootValue, execContext).then(function(result2) {
              return {
                result: result2,
                exportedVariables: execContext.exportedVariables
              };
            })];
          });
        });
      };
      LocalState2.prototype.resolveSelectionSet = function(selectionSet, isClientFieldDescendant, rootValue, execContext) {
        return tslib.__awaiter(this, void 0, void 0, function() {
          var fragmentMap, context, variables, resultsToMerge, execute2;
          var _this = this;
          return tslib.__generator(this, function(_a2) {
            fragmentMap = execContext.fragmentMap, context = execContext.context, variables = execContext.variables;
            resultsToMerge = [rootValue];
            execute2 = function(selection) {
              return tslib.__awaiter(_this, void 0, void 0, function() {
                var fragment, typeCondition;
                return tslib.__generator(this, function(_a3) {
                  if (!isClientFieldDescendant && !execContext.selectionsToResolve.has(selection)) {
                    return [2];
                  }
                  if (!utilities.shouldInclude(selection, variables)) {
                    return [2];
                  }
                  if (utilities.isField(selection)) {
                    return [2, this.resolveField(selection, isClientFieldDescendant, rootValue, execContext).then(function(fieldResult) {
                      var _a4;
                      if (typeof fieldResult !== "undefined") {
                        resultsToMerge.push((_a4 = {}, _a4[utilities.resultKeyNameFromField(selection)] = fieldResult, _a4));
                      }
                    })];
                  }
                  if (utilities.isInlineFragment(selection)) {
                    fragment = selection;
                  } else {
                    fragment = fragmentMap[selection.name.value];
                    globals.invariant(fragment, 21, selection.name.value);
                  }
                  if (fragment && fragment.typeCondition) {
                    typeCondition = fragment.typeCondition.name.value;
                    if (execContext.fragmentMatcher(rootValue, typeCondition, context)) {
                      return [2, this.resolveSelectionSet(fragment.selectionSet, isClientFieldDescendant, rootValue, execContext).then(function(fragmentResult) {
                        resultsToMerge.push(fragmentResult);
                      })];
                    }
                  }
                  return [2];
                });
              });
            };
            return [2, Promise.all(selectionSet.selections.map(execute2)).then(function() {
              return utilities.mergeDeepArray(resultsToMerge);
            })];
          });
        });
      };
      LocalState2.prototype.resolveField = function(field, isClientFieldDescendant, rootValue, execContext) {
        return tslib.__awaiter(this, void 0, void 0, function() {
          var variables, fieldName, aliasedFieldName, aliasUsed, defaultResult, resultPromise, resolverType, resolverMap, resolve;
          var _this = this;
          return tslib.__generator(this, function(_a2) {
            if (!rootValue) {
              return [2, null];
            }
            variables = execContext.variables;
            fieldName = field.name.value;
            aliasedFieldName = utilities.resultKeyNameFromField(field);
            aliasUsed = fieldName !== aliasedFieldName;
            defaultResult = rootValue[aliasedFieldName] || rootValue[fieldName];
            resultPromise = Promise.resolve(defaultResult);
            if (!execContext.onlyRunForcedResolvers || this.shouldForceResolvers(field)) {
              resolverType = rootValue.__typename || execContext.defaultOperationType;
              resolverMap = this.resolvers && this.resolvers[resolverType];
              if (resolverMap) {
                resolve = resolverMap[aliasUsed ? fieldName : aliasedFieldName];
                if (resolve) {
                  resultPromise = Promise.resolve(
                    cache.cacheSlot.withValue(this.cache, resolve, [
                      rootValue,
                      utilities.argumentsObjectFromField(field, variables),
                      execContext.context,
                      { field, fragmentMap: execContext.fragmentMap }
                    ])
                  );
                }
              }
            }
            return [2, resultPromise.then(function(result2) {
              var _a3, _b;
              if (result2 === void 0) {
                result2 = defaultResult;
              }
              if (field.directives) {
                field.directives.forEach(function(directive) {
                  if (directive.name.value === "export" && directive.arguments) {
                    directive.arguments.forEach(function(arg) {
                      if (arg.name.value === "as" && arg.value.kind === "StringValue") {
                        execContext.exportedVariables[arg.value.value] = result2;
                      }
                    });
                  }
                });
              }
              if (!field.selectionSet) {
                return result2;
              }
              if (result2 == null) {
                return result2;
              }
              var isClientField = (_b = (_a3 = field.directives) === null || _a3 === void 0 ? void 0 : _a3.some(function(d) {
                return d.name.value === "client";
              })) !== null && _b !== void 0 ? _b : false;
              if (Array.isArray(result2)) {
                return _this.resolveSubSelectedArray(field, isClientFieldDescendant || isClientField, result2, execContext);
              }
              if (field.selectionSet) {
                return _this.resolveSelectionSet(field.selectionSet, isClientFieldDescendant || isClientField, result2, execContext);
              }
            })];
          });
        });
      };
      LocalState2.prototype.resolveSubSelectedArray = function(field, isClientFieldDescendant, result2, execContext) {
        var _this = this;
        return Promise.all(result2.map(function(item) {
          if (item === null) {
            return null;
          }
          if (Array.isArray(item)) {
            return _this.resolveSubSelectedArray(field, isClientFieldDescendant, item, execContext);
          }
          if (field.selectionSet) {
            return _this.resolveSelectionSet(field.selectionSet, isClientFieldDescendant, item, execContext);
          }
        }));
      };
      LocalState2.prototype.collectSelectionsToResolve = function(mainDefinition, fragmentMap) {
        var isSingleASTNode = function(node) {
          return !Array.isArray(node);
        };
        var selectionsToResolveCache = this.selectionsToResolveCache;
        function collectByDefinition(definitionNode) {
          if (!selectionsToResolveCache.has(definitionNode)) {
            var matches_1 = /* @__PURE__ */ new Set();
            selectionsToResolveCache.set(definitionNode, matches_1);
            graphql2.visit(definitionNode, {
              Directive: function(node, _, __, ___, ancestors) {
                if (node.name.value === "client") {
                  ancestors.forEach(function(node2) {
                    if (isSingleASTNode(node2) && graphql2.isSelectionNode(node2)) {
                      matches_1.add(node2);
                    }
                  });
                }
              },
              FragmentSpread: function(spread, _, __, ___, ancestors) {
                var fragment = fragmentMap[spread.name.value];
                globals.invariant(fragment, 22, spread.name.value);
                var fragmentSelections = collectByDefinition(fragment);
                if (fragmentSelections.size > 0) {
                  ancestors.forEach(function(node) {
                    if (isSingleASTNode(node) && graphql2.isSelectionNode(node)) {
                      matches_1.add(node);
                    }
                  });
                  matches_1.add(spread);
                  fragmentSelections.forEach(function(selection) {
                    matches_1.add(selection);
                  });
                }
              }
            });
          }
          return selectionsToResolveCache.get(definitionNode);
        }
        return collectByDefinition(mainDefinition);
      };
      return LocalState2;
    })();
    var cacheSizeSymbol = Symbol.for("apollo.cacheSize");
    var cacheSizes = tslib.__assign({}, globals.global[cacheSizeSymbol]);
    var globalCaches = {};
    var getApolloClientMemoryInternals = globalThis.__DEV__ !== false ? _getApolloClientMemoryInternals : void 0;
    function getCurrentCacheSizes() {
      var defaults = {
        parser: 1e3,
        canonicalStringify: 1e3,
        print: 2e3,
        "documentTransform.cache": 2e3,
        "queryManager.getDocumentInfo": 2e3,
        "PersistedQueryLink.persistedQueryHashes": 2e3,
        "fragmentRegistry.transform": 2e3,
        "fragmentRegistry.lookup": 1e3,
        "fragmentRegistry.findFragmentSpreads": 4e3,
        "cache.fragmentQueryDocuments": 1e3,
        "removeTypenameFromVariables.getVariableDefinitions": 2e3,
        "inMemoryCache.maybeBroadcastWatch": 5e3,
        "inMemoryCache.executeSelectionSet": 5e4,
        "inMemoryCache.executeSubSelectedArray": 1e4
      };
      return Object.fromEntries(Object.entries(defaults).map(function(_a2) {
        var k2 = _a2[0], v = _a2[1];
        return [
          k2,
          cacheSizes[k2] || v
        ];
      }));
    }
    function _getApolloClientMemoryInternals() {
      var _a2, _b, _c, _d, _e;
      if (!(globalThis.__DEV__ !== false))
        throw new Error("only supported in development mode");
      return {
        limits: getCurrentCacheSizes(),
        sizes: tslib.__assign({ print: (_a2 = globalCaches.print) === null || _a2 === void 0 ? void 0 : _a2.call(globalCaches), parser: (_b = globalCaches.parser) === null || _b === void 0 ? void 0 : _b.call(globalCaches), canonicalStringify: (_c = globalCaches.canonicalStringify) === null || _c === void 0 ? void 0 : _c.call(globalCaches), links: linkInfo(this.link), queryManager: {
          getDocumentInfo: this["queryManager"]["transformCache"].size,
          documentTransforms: transformInfo(this["queryManager"].documentTransform)
        } }, (_e = (_d = this.cache).getMemoryInternals) === null || _e === void 0 ? void 0 : _e.call(_d))
      };
    }
    function isWrapper(f) {
      return !!f && "dirtyKey" in f;
    }
    function getWrapperInformation(f) {
      return isWrapper(f) ? f.size : void 0;
    }
    function isDefined(value) {
      return value != null;
    }
    function transformInfo(transform) {
      return recurseTransformInfo(transform).map(function(cache2) {
        return { cache: cache2 };
      });
    }
    function recurseTransformInfo(transform) {
      return transform ? tslib.__spreadArray(tslib.__spreadArray([
        getWrapperInformation(transform === null || transform === void 0 ? void 0 : transform["performWork"])
      ], recurseTransformInfo(transform === null || transform === void 0 ? void 0 : transform["left"]), true), recurseTransformInfo(transform === null || transform === void 0 ? void 0 : transform["right"]), true).filter(isDefined) : [];
    }
    function linkInfo(link) {
      var _a2;
      return link ? tslib.__spreadArray(tslib.__spreadArray([
        (_a2 = link === null || link === void 0 ? void 0 : link.getMemoryInternals) === null || _a2 === void 0 ? void 0 : _a2.call(link)
      ], linkInfo(link === null || link === void 0 ? void 0 : link.left), true), linkInfo(link === null || link === void 0 ? void 0 : link.right), true).filter(isDefined) : [];
    }
    var hasSuggestedDevtools = false;
    var ApolloClient2 = (function() {
      function ApolloClient3(options) {
        var _this = this;
        var _a2, _b, _c;
        this.resetStoreCallbacks = [];
        this.clearStoreCallbacks = [];
        if (!options.cache) {
          throw globals.newInvariantError(16);
        }
        var uri = options.uri, credentials = options.credentials, headers = options.headers, cache2 = options.cache, documentTransform = options.documentTransform, _d = options.ssrMode, ssrMode = _d === void 0 ? false : _d, _e = options.ssrForceFetchDelay, ssrForceFetchDelay = _e === void 0 ? 0 : _e, connectToDevTools = options.connectToDevTools, _f = options.queryDeduplication, queryDeduplication = _f === void 0 ? true : _f, defaultOptions = options.defaultOptions, defaultContext = options.defaultContext, _g = options.assumeImmutableResults, assumeImmutableResults = _g === void 0 ? cache2.assumeImmutableResults : _g, resolvers = options.resolvers, typeDefs = options.typeDefs, fragmentMatcher = options.fragmentMatcher, clientAwareness = options.clientAwareness, clientAwarenessName = options.name, clientAwarenessVersion = options.version, devtools = options.devtools, dataMasking = options.dataMasking;
        if (globalThis.__DEV__ !== false) {
          warnRemovedOption(options, "connectToDevTools", "ApolloClient", "Please use `devtools.enabled` instead.");
          warnRemovedOption(options, "uri", "ApolloClient", "Please initialize an instance of `HttpLink` with `uri` instead.");
          warnRemovedOption(options, "credentials", "ApolloClient", "Please initialize an instance of `HttpLink` with `credentials` instead.");
          warnRemovedOption(options, "headers", "ApolloClient", "Please initialize an instance of `HttpLink` with `headers` instead.");
          warnRemovedOption(options, "name", "ApolloClient", "Please use the `clientAwareness.name` option instead.");
          warnRemovedOption(options, "version", "ApolloClient", "Please use the `clientAwareness.version` option instead.");
          warnRemovedOption(options, "typeDefs", "ApolloClient");
          if (!options.link) {
            globalThis.__DEV__ !== false && globals.invariant.warn(17);
          }
        }
        var link = options.link;
        if (!link) {
          link = uri ? new http.HttpLink({ uri, credentials, headers }) : core.ApolloLink.empty();
        }
        this.link = link;
        this.cache = cache2;
        this.disableNetworkFetches = ssrMode || ssrForceFetchDelay > 0;
        this.queryDeduplication = queryDeduplication;
        this.defaultOptions = defaultOptions || /* @__PURE__ */ Object.create(null);
        this.typeDefs = typeDefs;
        this.devtoolsConfig = tslib.__assign(tslib.__assign({}, devtools), { enabled: (_a2 = devtools === null || devtools === void 0 ? void 0 : devtools.enabled) !== null && _a2 !== void 0 ? _a2 : connectToDevTools });
        if (this.devtoolsConfig.enabled === void 0) {
          this.devtoolsConfig.enabled = globalThis.__DEV__ !== false;
        }
        if (ssrForceFetchDelay) {
          setTimeout(function() {
            return _this.disableNetworkFetches = false;
          }, ssrForceFetchDelay);
        }
        this.watchQuery = this.watchQuery.bind(this);
        this.query = this.query.bind(this);
        this.mutate = this.mutate.bind(this);
        this.watchFragment = this.watchFragment.bind(this);
        this.resetStore = this.resetStore.bind(this);
        this.reFetchObservableQueries = this.reFetchObservableQueries.bind(this);
        this.version = version2;
        this.localState = new LocalState({
          cache: cache2,
          client: this,
          resolvers,
          fragmentMatcher
        });
        this.queryManager = new QueryManager({
          cache: this.cache,
          link: this.link,
          defaultOptions: this.defaultOptions,
          defaultContext,
          documentTransform,
          queryDeduplication,
          ssrMode,
          dataMasking: !!dataMasking,
          clientAwareness: {
            name: (_b = clientAwareness === null || clientAwareness === void 0 ? void 0 : clientAwareness.name) !== null && _b !== void 0 ? _b : clientAwarenessName,
            version: (_c = clientAwareness === null || clientAwareness === void 0 ? void 0 : clientAwareness.version) !== null && _c !== void 0 ? _c : clientAwarenessVersion
          },
          localState: this.localState,
          assumeImmutableResults,
          onBroadcast: this.devtoolsConfig.enabled ? function() {
            if (_this.devToolsHookCb) {
              _this.devToolsHookCb({
                action: {},
                state: {
                  queries: _this.queryManager.getQueryStore(),
                  mutations: _this.queryManager.mutationStore || {}
                },
                dataWithOptimisticResults: _this.cache.extract(true)
              });
            }
          } : void 0
        });
        if (this.devtoolsConfig.enabled)
          this.connectToDevTools();
      }
      Object.defineProperty(ApolloClient3.prototype, "prioritizeCacheValues", {
        get: function() {
          return this.disableNetworkFetches;
        },
        set: function(value) {
          this.disableNetworkFetches = value;
        },
        enumerable: false,
        configurable: true
      });
      ApolloClient3.prototype.connectToDevTools = function() {
        if (typeof window === "undefined") {
          return;
        }
        var windowWithDevTools = window;
        var devtoolsSymbol = Symbol.for("apollo.devtools");
        (windowWithDevTools[devtoolsSymbol] = windowWithDevTools[devtoolsSymbol] || []).push(this);
        windowWithDevTools.__APOLLO_CLIENT__ = this;
        if (!hasSuggestedDevtools && globalThis.__DEV__ !== false) {
          hasSuggestedDevtools = true;
          if (window.document && window.top === window.self && /^(https?|file):$/.test(window.location.protocol)) {
            setTimeout(function() {
              if (!window.__APOLLO_DEVTOOLS_GLOBAL_HOOK__) {
                var nav = window.navigator;
                var ua = nav && nav.userAgent;
                var url = void 0;
                if (typeof ua === "string") {
                  if (ua.indexOf("Chrome/") > -1) {
                    url = "https://chrome.google.com/webstore/detail/apollo-client-developer-t/jdkknkkbebbapilgoeccciglkfbmbnfm";
                  } else if (ua.indexOf("Firefox/") > -1) {
                    url = "https://addons.mozilla.org/en-US/firefox/addon/apollo-developer-tools/";
                  }
                }
                if (url) {
                  globalThis.__DEV__ !== false && globals.invariant.log("Download the Apollo DevTools for a better development experience: %s", url);
                }
              }
            }, 1e4);
          }
        }
      };
      Object.defineProperty(ApolloClient3.prototype, "documentTransform", {
        get: function() {
          return this.queryManager.documentTransform;
        },
        enumerable: false,
        configurable: true
      });
      ApolloClient3.prototype.stop = function() {
        this.queryManager.stop();
      };
      ApolloClient3.prototype.watchQuery = function(options) {
        if (this.defaultOptions.watchQuery) {
          options = utilities.mergeOptions(this.defaultOptions.watchQuery, options);
        }
        if (this.disableNetworkFetches && (options.fetchPolicy === "network-only" || options.fetchPolicy === "cache-and-network")) {
          options = tslib.__assign(tslib.__assign({}, options), { fetchPolicy: "cache-first" });
        }
        if (globalThis.__DEV__ !== false) {
          warnRemovedOption(options, "canonizeResults", "client.watchQuery");
          warnRemovedOption(options, "partialRefetch", "client.watchQuery");
        }
        return this.queryManager.watchQuery(options);
      };
      ApolloClient3.prototype.query = function(options) {
        if (this.defaultOptions.query) {
          options = utilities.mergeOptions(this.defaultOptions.query, options);
        }
        globals.invariant(options.fetchPolicy !== "cache-and-network", 18);
        if (this.disableNetworkFetches && options.fetchPolicy === "network-only") {
          options = tslib.__assign(tslib.__assign({}, options), { fetchPolicy: "cache-first" });
        }
        if (globalThis.__DEV__ !== false) {
          warnRemovedOption(options, "canonizeResults", "client.query");
          warnRemovedOption(options, "notifyOnNetworkStatusChange", "client.query", "This option does not affect `client.query` and can be safely removed.");
          if (options.fetchPolicy === "standby") {
            globalThis.__DEV__ !== false && globals.invariant.warn(19);
          }
        }
        return this.queryManager.query(options);
      };
      ApolloClient3.prototype.mutate = function(options) {
        if (this.defaultOptions.mutate) {
          options = utilities.mergeOptions(this.defaultOptions.mutate, options);
        }
        return this.queryManager.mutate(options);
      };
      ApolloClient3.prototype.subscribe = function(options) {
        var _this = this;
        var id = this.queryManager.generateQueryId();
        return this.queryManager.startGraphQLSubscription(options).map(function(result2) {
          return tslib.__assign(tslib.__assign({}, result2), { data: _this.queryManager.maskOperation({
            document: options.query,
            data: result2.data,
            fetchPolicy: options.fetchPolicy,
            id
          }) });
        });
      };
      ApolloClient3.prototype.readQuery = function(options, optimistic) {
        if (optimistic === void 0) {
          optimistic = false;
        }
        return this.cache.readQuery(options, optimistic);
      };
      ApolloClient3.prototype.watchFragment = function(options) {
        var _a2;
        return this.cache.watchFragment(tslib.__assign(tslib.__assign({}, options), (_a2 = {}, _a2[Symbol.for("apollo.dataMasking")] = this.queryManager.dataMasking, _a2)));
      };
      ApolloClient3.prototype.readFragment = function(options, optimistic) {
        if (optimistic === void 0) {
          optimistic = false;
        }
        return this.cache.readFragment(options, optimistic);
      };
      ApolloClient3.prototype.writeQuery = function(options) {
        var ref = this.cache.writeQuery(options);
        if (options.broadcast !== false) {
          this.queryManager.broadcastQueries();
        }
        return ref;
      };
      ApolloClient3.prototype.writeFragment = function(options) {
        var ref = this.cache.writeFragment(options);
        if (options.broadcast !== false) {
          this.queryManager.broadcastQueries();
        }
        return ref;
      };
      ApolloClient3.prototype.__actionHookForDevTools = function(cb) {
        this.devToolsHookCb = cb;
      };
      ApolloClient3.prototype.__requestRaw = function(payload) {
        return core.execute(this.link, payload);
      };
      ApolloClient3.prototype.resetStore = function() {
        var _this = this;
        return Promise.resolve().then(function() {
          return _this.queryManager.clearStore({
            discardWatches: false
          });
        }).then(function() {
          return Promise.all(_this.resetStoreCallbacks.map(function(fn) {
            return fn();
          }));
        }).then(function() {
          return _this.reFetchObservableQueries();
        });
      };
      ApolloClient3.prototype.clearStore = function() {
        var _this = this;
        return Promise.resolve().then(function() {
          return _this.queryManager.clearStore({
            discardWatches: true
          });
        }).then(function() {
          return Promise.all(_this.clearStoreCallbacks.map(function(fn) {
            return fn();
          }));
        });
      };
      ApolloClient3.prototype.onResetStore = function(cb) {
        var _this = this;
        this.resetStoreCallbacks.push(cb);
        return function() {
          _this.resetStoreCallbacks = _this.resetStoreCallbacks.filter(function(c) {
            return c !== cb;
          });
        };
      };
      ApolloClient3.prototype.onClearStore = function(cb) {
        var _this = this;
        this.clearStoreCallbacks.push(cb);
        return function() {
          _this.clearStoreCallbacks = _this.clearStoreCallbacks.filter(function(c) {
            return c !== cb;
          });
        };
      };
      ApolloClient3.prototype.reFetchObservableQueries = function(includeStandby) {
        return this.queryManager.reFetchObservableQueries(includeStandby);
      };
      ApolloClient3.prototype.refetchQueries = function(options) {
        var map2 = this.queryManager.refetchQueries(options);
        var queries = [];
        var results = [];
        map2.forEach(function(result3, obsQuery) {
          queries.push(obsQuery);
          results.push(result3);
        });
        var result2 = Promise.all(results);
        result2.queries = queries;
        result2.results = results;
        result2.catch(function(error) {
          globalThis.__DEV__ !== false && globals.invariant.debug(20, error);
        });
        return result2;
      };
      ApolloClient3.prototype.getObservableQueries = function(include) {
        if (include === void 0) {
          include = "active";
        }
        return this.queryManager.getObservableQueries(include);
      };
      ApolloClient3.prototype.extract = function(optimistic) {
        return this.cache.extract(optimistic);
      };
      ApolloClient3.prototype.restore = function(serializedState) {
        return this.cache.restore(serializedState);
      };
      ApolloClient3.prototype.addResolvers = function(resolvers) {
        this.localState.addResolvers(resolvers);
      };
      ApolloClient3.prototype.setResolvers = function(resolvers) {
        this.localState.setResolvers(resolvers);
      };
      ApolloClient3.prototype.getResolvers = function() {
        return this.localState.getResolvers();
      };
      ApolloClient3.prototype.setLocalStateFragmentMatcher = function(fragmentMatcher) {
        this.localState.setFragmentMatcher(fragmentMatcher);
      };
      ApolloClient3.prototype.setLink = function(newLink) {
        this.link = this.queryManager.link = newLink;
      };
      Object.defineProperty(ApolloClient3.prototype, "defaultContext", {
        get: function() {
          return this.queryManager.defaultContext;
        },
        enumerable: false,
        configurable: true
      });
      return ApolloClient3;
    })();
    if (globalThis.__DEV__ !== false) {
      ApolloClient2.prototype.getMemoryInternals = getApolloClientMemoryInternals;
    }
    tsInvariant.setVerbosity(globalThis.__DEV__ !== false ? "log" : "silent");
    exports.DocumentTransform = utilities.DocumentTransform;
    exports.Observable = utilities.Observable;
    exports.isReference = utilities.isReference;
    exports.makeReference = utilities.makeReference;
    exports.mergeOptions = utilities.mergeOptions;
    exports.ApolloCache = cache.ApolloCache;
    exports.Cache = cache.Cache;
    exports.InMemoryCache = cache.InMemoryCache;
    exports.MissingFieldError = cache.MissingFieldError;
    exports.defaultDataIdFromObject = cache.defaultDataIdFromObject;
    exports.makeVar = cache.makeVar;
    exports.ApolloError = errors.ApolloError;
    exports.isApolloError = errors.isApolloError;
    exports.fromError = utils.fromError;
    exports.fromPromise = utils.fromPromise;
    exports.throwServerError = utils.throwServerError;
    exports.toPromise = utils.toPromise;
    exports.setLogVerbosity = tsInvariant.setVerbosity;
    exports.disableExperimentalFragmentVariables = graphqlTag.disableExperimentalFragmentVariables;
    exports.disableFragmentWarnings = graphqlTag.disableFragmentWarnings;
    exports.enableExperimentalFragmentVariables = graphqlTag.enableExperimentalFragmentVariables;
    exports.gql = graphqlTag.gql;
    exports.resetCaches = graphqlTag.resetCaches;
    exports.ApolloClient = ApolloClient2;
    exports.ObservableQuery = ObservableQuery;
    exports.isNetworkRequestSettled = isNetworkRequestSettled;
    for (k in core) {
      if (k !== "default" && !exports.hasOwnProperty(k)) exports[k] = core[k];
    }
    var k;
    for (k in http) {
      if (k !== "default" && !exports.hasOwnProperty(k)) exports[k] = http[k];
    }
    var k;
  }
});

// ../node_modules/@apollo/client/link/retry/retry.cjs
var require_retry = __commonJS({
  "../node_modules/@apollo/client/link/retry/retry.cjs"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var tslib = (init_tslib_es6(), __toCommonJS(tslib_es6_exports));
    var core = require_core();
    var utilities = require_utilities();
    var errors = require_errors();
    function buildDelayFunction(delayOptions) {
      var _a2 = delayOptions || {}, _b = _a2.initial, initial = _b === void 0 ? 300 : _b, _c = _a2.jitter, jitter = _c === void 0 ? true : _c, _d = _a2.max, max = _d === void 0 ? Infinity : _d;
      var baseDelay = jitter ? initial : initial / 2;
      return function delayFunction(count) {
        var delay = Math.min(max, baseDelay * Math.pow(2, count));
        if (jitter) {
          delay = Math.random() * delay;
        }
        return delay;
      };
    }
    function buildRetryFunction(retryOptions) {
      var _a2 = retryOptions || {}, retryIf = _a2.retryIf, _b = _a2.max, max = _b === void 0 ? 5 : _b;
      return function retryFunction(count, operation, error) {
        if (count >= max)
          return false;
        return retryIf ? retryIf(error, operation) : !!error;
      };
    }
    var RetryableOperation = (function() {
      function RetryableOperation2(observer, operation, forward, delayFor, retryIf) {
        var _this = this;
        this.observer = observer;
        this.operation = operation;
        this.forward = forward;
        this.delayFor = delayFor;
        this.retryIf = retryIf;
        this.retryCount = 0;
        this.currentSubscription = null;
        this.onError = function(error) {
          return tslib.__awaiter(_this, void 0, void 0, function() {
            var shouldRetry;
            return tslib.__generator(this, function(_a2) {
              switch (_a2.label) {
                case 0:
                  this.retryCount += 1;
                  return [4, this.retryIf(this.retryCount, this.operation, error)];
                case 1:
                  shouldRetry = _a2.sent();
                  if (shouldRetry) {
                    this.scheduleRetry(this.delayFor(this.retryCount, this.operation, error));
                    return [2];
                  }
                  this.observer.error(error);
                  return [2];
              }
            });
          });
        };
        this.try();
      }
      RetryableOperation2.prototype.cancel = function() {
        if (this.currentSubscription) {
          this.currentSubscription.unsubscribe();
        }
        clearTimeout(this.timerId);
        this.timerId = void 0;
        this.currentSubscription = null;
      };
      RetryableOperation2.prototype.try = function() {
        var _this = this;
        this.currentSubscription = this.forward(this.operation).subscribe({
          next: function(result2) {
            var _a2;
            if (errors.graphQLResultHasProtocolErrors(result2)) {
              _this.onError(new errors.ApolloError({
                protocolErrors: result2.extensions[errors.PROTOCOL_ERRORS_SYMBOL]
              }));
              (_a2 = _this.currentSubscription) === null || _a2 === void 0 ? void 0 : _a2.unsubscribe();
              return;
            }
            _this.observer.next(result2);
          },
          error: this.onError,
          complete: this.observer.complete.bind(this.observer)
        });
      };
      RetryableOperation2.prototype.scheduleRetry = function(delay) {
        var _this = this;
        if (this.timerId) {
          throw new Error("RetryLink BUG! Encountered overlapping retries");
        }
        this.timerId = setTimeout(function() {
          _this.timerId = void 0;
          _this.try();
        }, delay);
      };
      return RetryableOperation2;
    })();
    var RetryLink2 = (function(_super) {
      tslib.__extends(RetryLink3, _super);
      function RetryLink3(options) {
        var _this = _super.call(this) || this;
        var _a2 = options || {}, attempts = _a2.attempts, delay = _a2.delay;
        _this.delayFor = typeof delay === "function" ? delay : buildDelayFunction(delay);
        _this.retryIf = typeof attempts === "function" ? attempts : buildRetryFunction(attempts);
        return _this;
      }
      RetryLink3.prototype.request = function(operation, nextLink) {
        var _this = this;
        return new utilities.Observable(function(observer) {
          var retryable = new RetryableOperation(observer, operation, nextLink, _this.delayFor, _this.retryIf);
          return function() {
            retryable.cancel();
          };
        });
      };
      return RetryLink3;
    })(core.ApolloLink);
    exports.RetryLink = RetryLink2;
  }
});

// ../node_modules/@apollo/client/link/subscriptions/subscriptions.cjs
var require_subscriptions = __commonJS({
  "../node_modules/@apollo/client/link/subscriptions/subscriptions.cjs"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var tslib = (init_tslib_es6(), __toCommonJS(tslib_es6_exports));
    var utilities = require_utilities();
    var core = require_core();
    var errors = require_errors();
    function isLikeCloseEvent2(val) {
      return utilities.isNonNullObject(val) && "code" in val && "reason" in val;
    }
    function isLikeErrorEvent(err) {
      var _a2;
      return utilities.isNonNullObject(err) && ((_a2 = err.target) === null || _a2 === void 0 ? void 0 : _a2.readyState) === WebSocket.CLOSED;
    }
    var GraphQLWsLink2 = (function(_super) {
      tslib.__extends(GraphQLWsLink3, _super);
      function GraphQLWsLink3(client) {
        var _this = _super.call(this) || this;
        _this.client = client;
        return _this;
      }
      GraphQLWsLink3.prototype.request = function(operation) {
        var _this = this;
        return new utilities.Observable(function(observer) {
          return _this.client.subscribe(tslib.__assign(tslib.__assign({}, operation), { query: utilities.print(operation.query) }), {
            next: observer.next.bind(observer),
            complete: observer.complete.bind(observer),
            error: function(err) {
              if (err instanceof Error) {
                return observer.error(err);
              }
              var likeClose = isLikeCloseEvent2(err);
              if (likeClose || isLikeErrorEvent(err)) {
                return observer.error(
                  new Error("Socket closed".concat(likeClose ? " with event ".concat(err.code) : "").concat(likeClose ? " ".concat(err.reason) : ""))
                );
              }
              return observer.error(new errors.ApolloError({
                graphQLErrors: Array.isArray(err) ? err : [err]
              }));
            }
          });
        });
      };
      return GraphQLWsLink3;
    })(core.ApolloLink);
    exports.GraphQLWsLink = GraphQLWsLink2;
  }
});

// ../node_modules/@midnight-ntwrk/midnight-js-indexer-public-data-provider/dist/index.mjs
var import_core = __toESM(require_core2(), 1);
var import_core2 = __toESM(require_core(), 1);
var import_http = __toESM(require_http(), 1);
var import_retry = __toESM(require_retry(), 1);
var import_subscriptions = __toESM(require_subscriptions(), 1);
var import_utilities2 = __toESM(require_utilities(), 1);
var import_buffer = __toESM(require_buffer(), 1);
var import_cross_fetch = __toESM(require_browser_ponyfill(), 1);

// ../node_modules/graphql-ws/dist/common-CGW11Fyb.js
function extendedTypeof(val) {
  if (val === null) {
    return "null";
  }
  if (Array.isArray(val)) {
    return "array";
  }
  return typeof val;
}
function isObject(val) {
  return extendedTypeof(val) === "object";
}
function areGraphQLFormattedErrors(obj) {
  return Array.isArray(obj) && // must be at least one error
  obj.length > 0 && // error has at least a message
  obj.every((ob) => "message" in ob);
}
function limitCloseReason(reason, whenTooLong) {
  return reason.length < 124 ? reason : whenTooLong;
}
var GRAPHQL_TRANSPORT_WS_PROTOCOL = "graphql-transport-ws";
var CloseCode = ((CloseCode2) => {
  CloseCode2[CloseCode2["InternalServerError"] = 4500] = "InternalServerError";
  CloseCode2[CloseCode2["InternalClientError"] = 4005] = "InternalClientError";
  CloseCode2[CloseCode2["BadRequest"] = 4400] = "BadRequest";
  CloseCode2[CloseCode2["BadResponse"] = 4004] = "BadResponse";
  CloseCode2[CloseCode2["Unauthorized"] = 4401] = "Unauthorized";
  CloseCode2[CloseCode2["Forbidden"] = 4403] = "Forbidden";
  CloseCode2[CloseCode2["SubprotocolNotAcceptable"] = 4406] = "SubprotocolNotAcceptable";
  CloseCode2[CloseCode2["ConnectionInitialisationTimeout"] = 4408] = "ConnectionInitialisationTimeout";
  CloseCode2[CloseCode2["ConnectionAcknowledgementTimeout"] = 4504] = "ConnectionAcknowledgementTimeout";
  CloseCode2[CloseCode2["SubscriberAlreadyExists"] = 4409] = "SubscriberAlreadyExists";
  CloseCode2[CloseCode2["TooManyInitialisationRequests"] = 4429] = "TooManyInitialisationRequests";
  return CloseCode2;
})(CloseCode || {});
var MessageType = ((MessageType2) => {
  MessageType2["ConnectionInit"] = "connection_init";
  MessageType2["ConnectionAck"] = "connection_ack";
  MessageType2["Ping"] = "ping";
  MessageType2["Pong"] = "pong";
  MessageType2["Subscribe"] = "subscribe";
  MessageType2["Next"] = "next";
  MessageType2["Error"] = "error";
  MessageType2["Complete"] = "complete";
  return MessageType2;
})(MessageType || {});
function validateMessage(val) {
  if (!isObject(val)) {
    throw new Error(
      `Message is expected to be an object, but got ${extendedTypeof(val)}`
    );
  }
  if (!val.type) {
    throw new Error(`Message is missing the 'type' property`);
  }
  if (typeof val.type !== "string") {
    throw new Error(
      `Message is expects the 'type' property to be a string, but got ${extendedTypeof(
        val.type
      )}`
    );
  }
  switch (val.type) {
    case "connection_init":
    case "connection_ack":
    case "ping":
    case "pong": {
      if (val.payload != null && !isObject(val.payload)) {
        throw new Error(
          `"${val.type}" message expects the 'payload' property to be an object or nullish or missing, but got "${val.payload}"`
        );
      }
      break;
    }
    case "subscribe": {
      if (typeof val.id !== "string") {
        throw new Error(
          `"${val.type}" message expects the 'id' property to be a string, but got ${extendedTypeof(
            val.id
          )}`
        );
      }
      if (!val.id) {
        throw new Error(
          `"${val.type}" message requires a non-empty 'id' property`
        );
      }
      if (!isObject(val.payload)) {
        throw new Error(
          `"${val.type}" message expects the 'payload' property to be an object, but got ${extendedTypeof(
            val.payload
          )}`
        );
      }
      if (typeof val.payload.query !== "string") {
        throw new Error(
          `"${val.type}" message payload expects the 'query' property to be a string, but got ${extendedTypeof(
            val.payload.query
          )}`
        );
      }
      if (val.payload.variables != null && !isObject(val.payload.variables)) {
        throw new Error(
          `"${val.type}" message payload expects the 'variables' property to be a an object or nullish or missing, but got ${extendedTypeof(
            val.payload.variables
          )}`
        );
      }
      if (val.payload.operationName != null && extendedTypeof(val.payload.operationName) !== "string") {
        throw new Error(
          `"${val.type}" message payload expects the 'operationName' property to be a string or nullish or missing, but got ${extendedTypeof(
            val.payload.operationName
          )}`
        );
      }
      if (val.payload.extensions != null && !isObject(val.payload.extensions)) {
        throw new Error(
          `"${val.type}" message payload expects the 'extensions' property to be a an object or nullish or missing, but got ${extendedTypeof(
            val.payload.extensions
          )}`
        );
      }
      break;
    }
    case "next": {
      if (typeof val.id !== "string") {
        throw new Error(
          `"${val.type}" message expects the 'id' property to be a string, but got ${extendedTypeof(
            val.id
          )}`
        );
      }
      if (!val.id) {
        throw new Error(
          `"${val.type}" message requires a non-empty 'id' property`
        );
      }
      if (!isObject(val.payload)) {
        throw new Error(
          `"${val.type}" message expects the 'payload' property to be an object, but got ${extendedTypeof(
            val.payload
          )}`
        );
      }
      break;
    }
    case "error": {
      if (typeof val.id !== "string") {
        throw new Error(
          `"${val.type}" message expects the 'id' property to be a string, but got ${extendedTypeof(
            val.id
          )}`
        );
      }
      if (!val.id) {
        throw new Error(
          `"${val.type}" message requires a non-empty 'id' property`
        );
      }
      if (!areGraphQLFormattedErrors(val.payload)) {
        throw new Error(
          `"${val.type}" message expects the 'payload' property to be an array of GraphQL errors, but got ${JSON.stringify(
            val.payload
          )}`
        );
      }
      break;
    }
    case "complete": {
      if (typeof val.id !== "string") {
        throw new Error(
          `"${val.type}" message expects the 'id' property to be a string, but got ${extendedTypeof(
            val.id
          )}`
        );
      }
      if (!val.id) {
        throw new Error(
          `"${val.type}" message requires a non-empty 'id' property`
        );
      }
      break;
    }
    default:
      throw new Error(`Invalid message 'type' property "${val.type}"`);
  }
  return val;
}
function parseMessage(data, reviver) {
  return validateMessage(
    typeof data === "string" ? JSON.parse(data, reviver) : data
  );
}
function stringifyMessage(msg, replacer) {
  validateMessage(msg);
  return JSON.stringify(msg, replacer);
}

// ../node_modules/graphql-ws/dist/client.js
function createClient(options) {
  const {
    url,
    connectionParams,
    lazy = true,
    onNonLazyError = console.error,
    lazyCloseTimeout: lazyCloseTimeoutMs = 0,
    keepAlive = 0,
    disablePong,
    connectionAckWaitTimeout = 0,
    retryAttempts = 5,
    retryWait = async function randomisedExponentialBackoff(retries2) {
      const retryDelaySeconds = Math.pow(2, retries2);
      await new Promise(
        (resolve) => setTimeout(
          resolve,
          retryDelaySeconds * 1e3 + // add random timeout from 300ms to 3s
          Math.floor(Math.random() * (3e3 - 300) + 300)
        )
      );
    },
    shouldRetry = isLikeCloseEvent,
    on,
    webSocketImpl,
    /**
     * Generates a v4 UUID to be used as the ID using `Math`
     * as the random number generator. Supply your own generator
     * in case you need more uniqueness.
     *
     * Reference: https://gist.github.com/jed/982883
     */
    generateID = function generateUUID() {
      return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
        const r = Math.random() * 16 | 0, v = c == "x" ? r : r & 3 | 8;
        return v.toString(16);
      });
    },
    jsonMessageReplacer: replacer,
    jsonMessageReviver: reviver
  } = options;
  let ws2;
  if (webSocketImpl) {
    if (!isWebSocket(webSocketImpl)) {
      throw new Error("Invalid WebSocket implementation provided");
    }
    ws2 = webSocketImpl;
  } else if (typeof WebSocket !== "undefined") {
    ws2 = WebSocket;
  } else if (typeof globalThis !== "undefined") {
    ws2 = globalThis.WebSocket || // @ts-expect-error: Support more browsers
    globalThis.MozWebSocket;
  } else if (typeof window !== "undefined") {
    ws2 = window.WebSocket || // @ts-expect-error: Support more browsers
    window.MozWebSocket;
  }
  if (!ws2)
    throw new Error(
      "WebSocket implementation missing; on Node you can `import WebSocket from 'ws';` and pass `webSocketImpl: WebSocket` to `createClient`"
    );
  const WebSocketImpl = ws2;
  const emitter = (() => {
    const message = /* @__PURE__ */ (() => {
      const listeners2 = {};
      return {
        on(id, listener) {
          listeners2[id] = listener;
          return () => {
            delete listeners2[id];
          };
        },
        emit(message2) {
          if ("id" in message2) listeners2[message2.id]?.(message2);
        }
      };
    })();
    const listeners = {
      connecting: on?.connecting ? [on.connecting] : [],
      opened: on?.opened ? [on.opened] : [],
      connected: on?.connected ? [on.connected] : [],
      ping: on?.ping ? [on.ping] : [],
      pong: on?.pong ? [on.pong] : [],
      message: on?.message ? [message.emit, on.message] : [message.emit],
      closed: on?.closed ? [on.closed] : [],
      error: on?.error ? [on.error] : []
    };
    return {
      onMessage: message.on,
      on(event, listener) {
        const l = listeners[event];
        l.push(listener);
        return () => {
          l.splice(l.indexOf(listener), 1);
        };
      },
      emit(event, ...args) {
        for (const listener of [...listeners[event]]) {
          listener(...args);
        }
      }
    };
  })();
  function errorOrClosed(cb) {
    const listening = [
      // errors are fatal and more critical than close events, throw them first
      emitter.on("error", (err) => {
        listening.forEach((unlisten) => unlisten());
        cb(err);
      }),
      // closes can be graceful and not fatal, throw them second (if error didnt throw)
      emitter.on("closed", (event) => {
        listening.forEach((unlisten) => unlisten());
        cb(event);
      })
    ];
  }
  let connecting, locks = 0, lazyCloseTimeout, retrying = false, retries = 0, disposed = false;
  async function connect() {
    clearTimeout(lazyCloseTimeout);
    const [socket, throwOnClose] = await (connecting ?? (connecting = new Promise(
      (connected, denied) => (async () => {
        if (retrying) {
          await retryWait(retries);
          if (!locks) {
            connecting = void 0;
            return denied({ code: 1e3, reason: "All Subscriptions Gone" });
          }
          retries++;
        }
        emitter.emit("connecting", retrying);
        const socket2 = new WebSocketImpl(
          typeof url === "function" ? await url() : url,
          GRAPHQL_TRANSPORT_WS_PROTOCOL
        );
        let connectionAckTimeout, queuedPing;
        function enqueuePing() {
          if (isFinite(keepAlive) && keepAlive > 0) {
            clearTimeout(queuedPing);
            queuedPing = setTimeout(() => {
              if (socket2.readyState === WebSocketImpl.OPEN) {
                socket2.send(stringifyMessage({ type: MessageType.Ping }));
                emitter.emit("ping", false, void 0);
              }
            }, keepAlive);
          }
        }
        errorOrClosed((errOrEvent) => {
          connecting = void 0;
          clearTimeout(connectionAckTimeout);
          clearTimeout(queuedPing);
          denied(errOrEvent);
          if (errOrEvent instanceof TerminatedCloseEvent) {
            socket2.close(4499, "Terminated");
            socket2.onerror = null;
            socket2.onclose = null;
          }
        });
        socket2.onerror = (err) => emitter.emit("error", err);
        socket2.onclose = (event) => emitter.emit("closed", event);
        socket2.onopen = async () => {
          try {
            emitter.emit("opened", socket2);
            const payload = typeof connectionParams === "function" ? await connectionParams() : connectionParams;
            if (socket2.readyState !== WebSocketImpl.OPEN) return;
            socket2.send(
              stringifyMessage(
                payload ? {
                  type: MessageType.ConnectionInit,
                  payload
                } : {
                  type: MessageType.ConnectionInit
                  // payload is completely absent if not provided
                },
                replacer
              )
            );
            if (isFinite(connectionAckWaitTimeout) && connectionAckWaitTimeout > 0) {
              connectionAckTimeout = setTimeout(() => {
                socket2.close(
                  CloseCode.ConnectionAcknowledgementTimeout,
                  "Connection acknowledgement timeout"
                );
              }, connectionAckWaitTimeout);
            }
            enqueuePing();
          } catch (err) {
            emitter.emit("error", err);
            socket2.close(
              CloseCode.InternalClientError,
              limitCloseReason(
                err instanceof Error ? err.message : String(err),
                "Internal client error"
              )
            );
          }
        };
        let acknowledged = false;
        socket2.onmessage = ({ data }) => {
          try {
            const message = parseMessage(data, reviver);
            emitter.emit("message", message);
            if (message.type === "ping" || message.type === "pong") {
              emitter.emit(message.type, true, message.payload);
              if (message.type === "pong") {
                enqueuePing();
              } else if (!disablePong) {
                socket2.send(
                  stringifyMessage(
                    message.payload ? {
                      type: MessageType.Pong,
                      payload: message.payload
                    } : {
                      type: MessageType.Pong
                      // payload is completely absent if not provided
                    }
                  )
                );
                emitter.emit("pong", false, message.payload);
              }
              return;
            }
            if (acknowledged) return;
            if (message.type !== MessageType.ConnectionAck)
              throw new Error(
                `First message cannot be of type ${message.type}`
              );
            clearTimeout(connectionAckTimeout);
            acknowledged = true;
            emitter.emit("connected", socket2, message.payload, retrying);
            retrying = false;
            retries = 0;
            connected([
              socket2,
              new Promise((_, reject) => errorOrClosed(reject))
            ]);
          } catch (err) {
            socket2.onmessage = null;
            emitter.emit("error", err);
            socket2.close(
              CloseCode.BadResponse,
              limitCloseReason(
                err instanceof Error ? err.message : String(err),
                "Bad response"
              )
            );
          }
        };
      })()
    )));
    if (socket.readyState === WebSocketImpl.CLOSING) await throwOnClose;
    let release = () => {
    };
    const released = new Promise((resolve) => release = resolve);
    return [
      socket,
      release,
      Promise.race([
        // wait for
        released.then(() => {
          if (!locks) {
            const complete = () => socket.close(1e3, "Normal Closure");
            if (isFinite(lazyCloseTimeoutMs) && lazyCloseTimeoutMs > 0) {
              lazyCloseTimeout = setTimeout(() => {
                if (socket.readyState === WebSocketImpl.OPEN) complete();
              }, lazyCloseTimeoutMs);
            } else {
              complete();
            }
          }
        }),
        // or
        throwOnClose
      ])
    ];
  }
  function shouldRetryConnectOrThrow(errOrCloseEvent) {
    if (isLikeCloseEvent(errOrCloseEvent) && (isFatalInternalCloseCode(errOrCloseEvent.code) || [
      CloseCode.InternalServerError,
      CloseCode.InternalClientError,
      CloseCode.BadRequest,
      CloseCode.BadResponse,
      CloseCode.Unauthorized,
      // CloseCode.Forbidden, might grant access out after retry
      CloseCode.SubprotocolNotAcceptable,
      // CloseCode.ConnectionInitialisationTimeout, might not time out after retry
      // CloseCode.ConnectionAcknowledgementTimeout, might not time out after retry
      CloseCode.SubscriberAlreadyExists,
      CloseCode.TooManyInitialisationRequests
      // 4499, // Terminated, probably because the socket froze, we want to retry
    ].includes(errOrCloseEvent.code)))
      throw errOrCloseEvent;
    if (disposed) return false;
    if (isLikeCloseEvent(errOrCloseEvent) && errOrCloseEvent.code === 1e3)
      return locks > 0;
    if (!retryAttempts || retries >= retryAttempts) throw errOrCloseEvent;
    if (!shouldRetry(errOrCloseEvent)) throw errOrCloseEvent;
    return retrying = true;
  }
  if (!lazy) {
    (async () => {
      locks++;
      for (; ; ) {
        try {
          const [, , throwOnClose] = await connect();
          await throwOnClose;
        } catch (errOrCloseEvent) {
          try {
            if (!shouldRetryConnectOrThrow(errOrCloseEvent)) return;
          } catch (errOrCloseEvent2) {
            return onNonLazyError?.(errOrCloseEvent2);
          }
        }
      }
    })();
  }
  function subscribe2(payload, sink) {
    const id = generateID(payload);
    let done = false, errored = false, releaser = () => {
      locks--;
      done = true;
    };
    (async () => {
      locks++;
      for (; ; ) {
        try {
          const [socket, release, waitForReleaseOrThrowOnClose] = await connect();
          if (done) return release();
          const unlisten = emitter.onMessage(id, (message) => {
            switch (message.type) {
              case MessageType.Next: {
                sink.next(message.payload);
                return;
              }
              case MessageType.Error: {
                errored = true, done = true;
                sink.error(message.payload);
                releaser();
                return;
              }
              case MessageType.Complete: {
                done = true;
                releaser();
                return;
              }
            }
          });
          socket.send(
            stringifyMessage(
              {
                id,
                type: MessageType.Subscribe,
                payload
              },
              replacer
            )
          );
          releaser = () => {
            if (!done && socket.readyState === WebSocketImpl.OPEN)
              socket.send(
                stringifyMessage(
                  {
                    id,
                    type: MessageType.Complete
                  },
                  replacer
                )
              );
            locks--;
            done = true;
            release();
          };
          await waitForReleaseOrThrowOnClose.finally(unlisten);
          return;
        } catch (errOrCloseEvent) {
          if (!shouldRetryConnectOrThrow(errOrCloseEvent)) return;
        }
      }
    })().then(() => {
      if (!errored) sink.complete();
    }).catch((err) => {
      sink.error(err);
    });
    return () => {
      if (!done) releaser();
    };
  }
  return {
    on: emitter.on,
    subscribe: subscribe2,
    iterate(request) {
      const pending = [];
      const deferred = {
        done: false,
        error: null,
        resolve: () => {
        }
      };
      const dispose = subscribe2(request, {
        next(val) {
          pending.push(val);
          deferred.resolve();
        },
        error(err) {
          deferred.done = true;
          deferred.error = err;
          deferred.resolve();
        },
        complete() {
          deferred.done = true;
          deferred.resolve();
        }
      });
      const iterator = (async function* iterator2() {
        for (; ; ) {
          if (!pending.length) {
            await new Promise((resolve) => deferred.resolve = resolve);
          }
          while (pending.length) {
            yield pending.shift();
          }
          if (deferred.error) {
            throw deferred.error;
          }
          if (deferred.done) {
            return;
          }
        }
      })();
      iterator.throw = async (err) => {
        if (!deferred.done) {
          deferred.done = true;
          deferred.error = err;
          deferred.resolve();
        }
        return { done: true, value: void 0 };
      };
      iterator.return = async () => {
        dispose();
        return { done: true, value: void 0 };
      };
      return iterator;
    },
    async dispose() {
      disposed = true;
      if (connecting) {
        const [socket] = await connecting;
        socket.close(1e3, "Normal Closure");
      }
    },
    terminate() {
      if (connecting) {
        emitter.emit("closed", new TerminatedCloseEvent());
      }
    }
  };
}
var TerminatedCloseEvent = class extends Error {
  name = "TerminatedCloseEvent";
  message = "4499: Terminated";
  code = 4499;
  reason = "Terminated";
  wasClean = false;
};
function isLikeCloseEvent(val) {
  return isObject(val) && "code" in val && "reason" in val;
}
function isFatalInternalCloseCode(code) {
  if ([
    1e3,
    // Normal Closure is not an erroneous close code
    1001,
    // Going Away
    1006,
    // Abnormal Closure
    1005,
    // No Status Received
    1012,
    // Service Restart
    1013,
    // Try Again Later
    1014
    // Bad Gateway
  ].includes(code))
    return false;
  return code >= 1e3 && code <= 1999;
}
function isWebSocket(val) {
  return typeof val === "function" && "constructor" in val && "CLOSED" in val && "CLOSING" in val && "CONNECTING" in val && "OPEN" in val;
}

// ../node_modules/graphql-ws/dist/server-3ewaJSjp.js
init_graphql2();

// ../node_modules/graphql-ws/dist/index.js
init_graphql2();

// ../node_modules/isomorphic-ws/browser.js
var ws = null;
if (typeof WebSocket !== "undefined") {
  ws = WebSocket;
} else if (typeof MozWebSocket !== "undefined") {
  ws = MozWebSocket;
} else if (typeof globalThis !== "undefined") {
  ws = globalThis.WebSocket || globalThis.MozWebSocket;
} else if (typeof window !== "undefined") {
  ws = window.WebSocket || window.MozWebSocket;
} else if (typeof self !== "undefined") {
  ws = self.WebSocket || self.MozWebSocket;
}

// ../node_modules/@midnight-ntwrk/midnight-js-indexer-public-data-provider/dist/index.mjs
var IndexerFormattedError = class extends Error {
  cause;
  /**
   * @param cause An array of GraphQL errors that occurred during the server-side execution.
   */
  constructor(cause) {
    super(`Indexer GraphQL error(s):
${cause.reduce((acc, c, idx) => `${idx + 1}. ${c.message}:
	${acc}`, "")}`);
    this.cause = cause;
  }
};
var BlockHashQueryDocument = { "kind": "Document", "definitions": [{ "kind": "OperationDefinition", "operation": "query", "name": { "kind": "Name", "value": "BLOCK_HASH_QUERY" }, "variableDefinitions": [{ "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "offset" } }, "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "BlockOffset" } } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "block" }, "arguments": [{ "kind": "Argument", "name": { "kind": "Name", "value": "offset" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "offset" } } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "height" } }, { "kind": "Field", "name": { "kind": "Name", "value": "hash" } }] } }] } }] };
var TxIdQueryDocument = { "kind": "Document", "definitions": [{ "kind": "OperationDefinition", "operation": "query", "name": { "kind": "Name", "value": "TX_ID_QUERY" }, "variableDefinitions": [{ "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "offset" } }, "type": { "kind": "NonNullType", "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "TransactionOffset" } } } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "transactions" }, "arguments": [{ "kind": "Argument", "name": { "kind": "Name", "value": "offset" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "offset" } } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "id" } }, { "kind": "Field", "name": { "kind": "Name", "value": "protocolVersion" } }, { "kind": "Field", "name": { "kind": "Name", "value": "raw" } }, { "kind": "Field", "name": { "kind": "Name", "value": "hash" } }, { "kind": "Field", "name": { "kind": "Name", "value": "unshieldedCreatedOutputs" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "owner" } }, { "kind": "Field", "name": { "kind": "Name", "value": "intentHash" } }, { "kind": "Field", "name": { "kind": "Name", "value": "tokenType" } }, { "kind": "Field", "name": { "kind": "Name", "value": "value" } }] } }, { "kind": "Field", "name": { "kind": "Name", "value": "unshieldedSpentOutputs" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "owner" } }, { "kind": "Field", "name": { "kind": "Name", "value": "intentHash" } }, { "kind": "Field", "name": { "kind": "Name", "value": "tokenType" } }, { "kind": "Field", "name": { "kind": "Name", "value": "value" } }] } }, { "kind": "Field", "name": { "kind": "Name", "value": "block" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "height" } }, { "kind": "Field", "name": { "kind": "Name", "value": "hash" } }, { "kind": "Field", "name": { "kind": "Name", "value": "author" } }, { "kind": "Field", "name": { "kind": "Name", "value": "timestamp" } }] } }, { "kind": "InlineFragment", "typeCondition": { "kind": "NamedType", "name": { "kind": "Name", "value": "RegularTransaction" } }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "identifiers" } }, { "kind": "Field", "name": { "kind": "Name", "value": "fees" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "estimatedFees" } }, { "kind": "Field", "name": { "kind": "Name", "value": "paidFees" } }] } }, { "kind": "Field", "name": { "kind": "Name", "value": "transactionResult" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "status" } }, { "kind": "Field", "name": { "kind": "Name", "value": "segments" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "id" } }, { "kind": "Field", "name": { "kind": "Name", "value": "success" } }] } }] } }] } }] } }] } }] };
var DeployTxQueryDocument = { "kind": "Document", "definitions": [{ "kind": "OperationDefinition", "operation": "query", "name": { "kind": "Name", "value": "DEPLOY_TX_QUERY" }, "variableDefinitions": [{ "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "address" } }, "type": { "kind": "NonNullType", "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "HexEncoded" } } } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "contractAction" }, "arguments": [{ "kind": "Argument", "name": { "kind": "Name", "value": "address" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "address" } } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "InlineFragment", "typeCondition": { "kind": "NamedType", "name": { "kind": "Name", "value": "ContractDeploy" } }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "transaction" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "id" } }, { "kind": "Field", "name": { "kind": "Name", "value": "protocolVersion" } }, { "kind": "Field", "name": { "kind": "Name", "value": "raw" } }, { "kind": "Field", "name": { "kind": "Name", "value": "hash" } }, { "kind": "Field", "name": { "kind": "Name", "value": "contractActions" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "address" } }] } }, { "kind": "Field", "name": { "kind": "Name", "value": "block" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "height" } }, { "kind": "Field", "name": { "kind": "Name", "value": "hash" } }, { "kind": "Field", "name": { "kind": "Name", "value": "author" } }, { "kind": "Field", "name": { "kind": "Name", "value": "timestamp" } }] } }, { "kind": "Field", "name": { "kind": "Name", "value": "unshieldedCreatedOutputs" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "owner" } }, { "kind": "Field", "name": { "kind": "Name", "value": "intentHash" } }, { "kind": "Field", "name": { "kind": "Name", "value": "tokenType" } }, { "kind": "Field", "name": { "kind": "Name", "value": "value" } }] } }, { "kind": "Field", "name": { "kind": "Name", "value": "unshieldedSpentOutputs" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "owner" } }, { "kind": "Field", "name": { "kind": "Name", "value": "intentHash" } }, { "kind": "Field", "name": { "kind": "Name", "value": "tokenType" } }, { "kind": "Field", "name": { "kind": "Name", "value": "value" } }] } }, { "kind": "InlineFragment", "typeCondition": { "kind": "NamedType", "name": { "kind": "Name", "value": "RegularTransaction" } }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "identifiers" } }, { "kind": "Field", "name": { "kind": "Name", "value": "fees" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "estimatedFees" } }, { "kind": "Field", "name": { "kind": "Name", "value": "paidFees" } }] } }, { "kind": "Field", "name": { "kind": "Name", "value": "transactionResult" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "status" } }, { "kind": "Field", "name": { "kind": "Name", "value": "segments" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "id" } }, { "kind": "Field", "name": { "kind": "Name", "value": "success" } }] } }] } }] } }] } }] } }, { "kind": "InlineFragment", "typeCondition": { "kind": "NamedType", "name": { "kind": "Name", "value": "ContractUpdate" } }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "transaction" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "id" } }, { "kind": "Field", "name": { "kind": "Name", "value": "protocolVersion" } }, { "kind": "Field", "name": { "kind": "Name", "value": "raw" } }, { "kind": "Field", "name": { "kind": "Name", "value": "hash" } }, { "kind": "Field", "name": { "kind": "Name", "value": "contractActions" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "address" } }] } }, { "kind": "Field", "name": { "kind": "Name", "value": "block" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "height" } }, { "kind": "Field", "name": { "kind": "Name", "value": "hash" } }, { "kind": "Field", "name": { "kind": "Name", "value": "author" } }, { "kind": "Field", "name": { "kind": "Name", "value": "timestamp" } }] } }, { "kind": "Field", "name": { "kind": "Name", "value": "unshieldedCreatedOutputs" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "owner" } }, { "kind": "Field", "name": { "kind": "Name", "value": "intentHash" } }, { "kind": "Field", "name": { "kind": "Name", "value": "tokenType" } }, { "kind": "Field", "name": { "kind": "Name", "value": "value" } }] } }, { "kind": "Field", "name": { "kind": "Name", "value": "unshieldedSpentOutputs" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "owner" } }, { "kind": "Field", "name": { "kind": "Name", "value": "intentHash" } }, { "kind": "Field", "name": { "kind": "Name", "value": "tokenType" } }, { "kind": "Field", "name": { "kind": "Name", "value": "value" } }] } }, { "kind": "InlineFragment", "typeCondition": { "kind": "NamedType", "name": { "kind": "Name", "value": "RegularTransaction" } }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "identifiers" } }, { "kind": "Field", "name": { "kind": "Name", "value": "fees" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "estimatedFees" } }, { "kind": "Field", "name": { "kind": "Name", "value": "paidFees" } }] } }, { "kind": "Field", "name": { "kind": "Name", "value": "transactionResult" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "status" } }, { "kind": "Field", "name": { "kind": "Name", "value": "segments" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "id" } }, { "kind": "Field", "name": { "kind": "Name", "value": "success" } }] } }] } }] } }] } }] } }, { "kind": "InlineFragment", "typeCondition": { "kind": "NamedType", "name": { "kind": "Name", "value": "ContractCall" } }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "deploy" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "transaction" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "id" } }, { "kind": "Field", "name": { "kind": "Name", "value": "protocolVersion" } }, { "kind": "Field", "name": { "kind": "Name", "value": "raw" } }, { "kind": "Field", "name": { "kind": "Name", "value": "hash" } }, { "kind": "Field", "name": { "kind": "Name", "value": "contractActions" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "address" } }] } }, { "kind": "Field", "name": { "kind": "Name", "value": "block" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "height" } }, { "kind": "Field", "name": { "kind": "Name", "value": "hash" } }, { "kind": "Field", "name": { "kind": "Name", "value": "author" } }, { "kind": "Field", "name": { "kind": "Name", "value": "timestamp" } }] } }, { "kind": "Field", "name": { "kind": "Name", "value": "unshieldedCreatedOutputs" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "owner" } }, { "kind": "Field", "name": { "kind": "Name", "value": "intentHash" } }, { "kind": "Field", "name": { "kind": "Name", "value": "tokenType" } }, { "kind": "Field", "name": { "kind": "Name", "value": "value" } }] } }, { "kind": "Field", "name": { "kind": "Name", "value": "unshieldedSpentOutputs" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "owner" } }, { "kind": "Field", "name": { "kind": "Name", "value": "intentHash" } }, { "kind": "Field", "name": { "kind": "Name", "value": "tokenType" } }, { "kind": "Field", "name": { "kind": "Name", "value": "value" } }] } }, { "kind": "InlineFragment", "typeCondition": { "kind": "NamedType", "name": { "kind": "Name", "value": "RegularTransaction" } }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "identifiers" } }, { "kind": "Field", "name": { "kind": "Name", "value": "fees" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "estimatedFees" } }, { "kind": "Field", "name": { "kind": "Name", "value": "paidFees" } }] } }, { "kind": "Field", "name": { "kind": "Name", "value": "transactionResult" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "status" } }, { "kind": "Field", "name": { "kind": "Name", "value": "segments" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "id" } }, { "kind": "Field", "name": { "kind": "Name", "value": "success" } }] } }] } }] } }] } }] } }] } }] } }] } }] };
var DeployContractStateTxQueryDocument = { "kind": "Document", "definitions": [{ "kind": "OperationDefinition", "operation": "query", "name": { "kind": "Name", "value": "DEPLOY_CONTRACT_STATE_TX_QUERY" }, "variableDefinitions": [{ "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "address" } }, "type": { "kind": "NonNullType", "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "HexEncoded" } } } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "contractAction" }, "arguments": [{ "kind": "Argument", "name": { "kind": "Name", "value": "address" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "address" } } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "InlineFragment", "typeCondition": { "kind": "NamedType", "name": { "kind": "Name", "value": "ContractDeploy" } }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "state" } }] } }, { "kind": "InlineFragment", "typeCondition": { "kind": "NamedType", "name": { "kind": "Name", "value": "ContractUpdate" } }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "state" } }] } }, { "kind": "InlineFragment", "typeCondition": { "kind": "NamedType", "name": { "kind": "Name", "value": "ContractCall" } }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "deploy" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "transaction" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "contractActions" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "address" } }, { "kind": "Field", "name": { "kind": "Name", "value": "state" } }] } }] } }] } }] } }] } }] } }] };
var LatestContractTxBlockHeightQueryDocument = { "kind": "Document", "definitions": [{ "kind": "OperationDefinition", "operation": "query", "name": { "kind": "Name", "value": "LATEST_CONTRACT_TX_BLOCK_HEIGHT_QUERY" }, "variableDefinitions": [{ "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "address" } }, "type": { "kind": "NonNullType", "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "HexEncoded" } } } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "contractAction" }, "arguments": [{ "kind": "Argument", "name": { "kind": "Name", "value": "address" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "address" } } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "transaction" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "block" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "height" } }] } }] } }] } }] } }] };
var TxsFromBlockSubDocument = { "kind": "Document", "definitions": [{ "kind": "OperationDefinition", "operation": "subscription", "name": { "kind": "Name", "value": "TXS_FROM_BLOCK_SUB" }, "variableDefinitions": [{ "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "offset" } }, "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "BlockOffset" } } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "blocks" }, "arguments": [{ "kind": "Argument", "name": { "kind": "Name", "value": "offset" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "offset" } } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "hash" } }, { "kind": "Field", "name": { "kind": "Name", "value": "height" } }, { "kind": "Field", "name": { "kind": "Name", "value": "transactions" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "hash" } }, { "kind": "Field", "name": { "kind": "Name", "value": "contractActions" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "state" } }, { "kind": "Field", "name": { "kind": "Name", "value": "address" } }] } }, { "kind": "InlineFragment", "typeCondition": { "kind": "NamedType", "name": { "kind": "Name", "value": "RegularTransaction" } }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "identifiers" } }] } }] } }] } }] } }] };
var ContractStateQueryDocument = { "kind": "Document", "definitions": [{ "kind": "OperationDefinition", "operation": "query", "name": { "kind": "Name", "value": "CONTRACT_STATE_QUERY" }, "variableDefinitions": [{ "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "address" } }, "type": { "kind": "NonNullType", "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "HexEncoded" } } } }, { "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "offset" } }, "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "ContractActionOffset" } } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "contractAction" }, "arguments": [{ "kind": "Argument", "name": { "kind": "Name", "value": "address" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "address" } } }, { "kind": "Argument", "name": { "kind": "Name", "value": "offset" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "offset" } } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "state" } }] } }] } }] };
var ContractStateSubDocument = { "kind": "Document", "definitions": [{ "kind": "OperationDefinition", "operation": "subscription", "name": { "kind": "Name", "value": "CONTRACT_STATE_SUB" }, "variableDefinitions": [{ "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "address" } }, "type": { "kind": "NonNullType", "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "HexEncoded" } } } }, { "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "offset" } }, "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "BlockOffset" } } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "contractActions" }, "arguments": [{ "kind": "Argument", "name": { "kind": "Name", "value": "address" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "address" } } }, { "kind": "Argument", "name": { "kind": "Name", "value": "offset" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "offset" } } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "state" } }] } }] } }] };
var BothStateQueryDocument = { "kind": "Document", "definitions": [{ "kind": "OperationDefinition", "operation": "query", "name": { "kind": "Name", "value": "BOTH_STATE_QUERY" }, "variableDefinitions": [{ "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "address" } }, "type": { "kind": "NonNullType", "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "HexEncoded" } } } }, { "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "offset" } }, "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "ContractActionOffset" } } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "contractAction" }, "arguments": [{ "kind": "Argument", "name": { "kind": "Name", "value": "address" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "address" } } }, { "kind": "Argument", "name": { "kind": "Name", "value": "offset" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "offset" } } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "state" } }, { "kind": "Field", "name": { "kind": "Name", "value": "zswapState" } }] } }] } }] };
var UnshieldedBalanceQueryDocument = { "kind": "Document", "definitions": [{ "kind": "OperationDefinition", "operation": "query", "name": { "kind": "Name", "value": "UNSHIELDED_BALANCE_QUERY" }, "variableDefinitions": [{ "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "address" } }, "type": { "kind": "NonNullType", "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "HexEncoded" } } } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "contractAction" }, "arguments": [{ "kind": "Argument", "name": { "kind": "Name", "value": "address" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "address" } } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "InlineFragment", "typeCondition": { "kind": "NamedType", "name": { "kind": "Name", "value": "ContractDeploy" } }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "unshieldedBalances" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "tokenType" } }, { "kind": "Field", "name": { "kind": "Name", "value": "amount" } }] } }] } }, { "kind": "InlineFragment", "typeCondition": { "kind": "NamedType", "name": { "kind": "Name", "value": "ContractUpdate" } }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "unshieldedBalances" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "tokenType" } }, { "kind": "Field", "name": { "kind": "Name", "value": "amount" } }] } }] } }, { "kind": "InlineFragment", "typeCondition": { "kind": "NamedType", "name": { "kind": "Name", "value": "ContractCall" } }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "deploy" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "unshieldedBalances" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "tokenType" } }, { "kind": "Field", "name": { "kind": "Name", "value": "amount" } }] } }] } }] } }] } }] } }] };
var QueryUnshieldedBalancesWithOffsetDocument = { "kind": "Document", "definitions": [{ "kind": "OperationDefinition", "operation": "query", "name": { "kind": "Name", "value": "QUERY_UNSHIELDED_BALANCES_WITH_OFFSET" }, "variableDefinitions": [{ "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "address" } }, "type": { "kind": "NonNullType", "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "HexEncoded" } } } }, { "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "offset" } }, "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "ContractActionOffset" } } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "contractAction" }, "arguments": [{ "kind": "Argument", "name": { "kind": "Name", "value": "address" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "address" } } }, { "kind": "Argument", "name": { "kind": "Name", "value": "offset" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "offset" } } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "InlineFragment", "typeCondition": { "kind": "NamedType", "name": { "kind": "Name", "value": "ContractDeploy" } }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "unshieldedBalances" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "tokenType" } }, { "kind": "Field", "name": { "kind": "Name", "value": "amount" } }] } }] } }, { "kind": "InlineFragment", "typeCondition": { "kind": "NamedType", "name": { "kind": "Name", "value": "ContractUpdate" } }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "unshieldedBalances" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "tokenType" } }, { "kind": "Field", "name": { "kind": "Name", "value": "amount" } }] } }] } }, { "kind": "InlineFragment", "typeCondition": { "kind": "NamedType", "name": { "kind": "Name", "value": "ContractCall" } }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "deploy" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "unshieldedBalances" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "tokenType" } }, { "kind": "Field", "name": { "kind": "Name", "value": "amount" } }] } }] } }] } }] } }] } }] };
var UnshieldedBalanceSubDocument = { "kind": "Document", "definitions": [{ "kind": "OperationDefinition", "operation": "subscription", "name": { "kind": "Name", "value": "UNSHIELDED_BALANCE_SUB" }, "variableDefinitions": [{ "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "address" } }, "type": { "kind": "NonNullType", "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "HexEncoded" } } } }, { "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "offset" } }, "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "BlockOffset" } } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "contractActions" }, "arguments": [{ "kind": "Argument", "name": { "kind": "Name", "value": "address" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "address" } } }, { "kind": "Argument", "name": { "kind": "Name", "value": "offset" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "offset" } } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "InlineFragment", "typeCondition": { "kind": "NamedType", "name": { "kind": "Name", "value": "ContractDeploy" } }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "unshieldedBalances" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "tokenType" } }, { "kind": "Field", "name": { "kind": "Name", "value": "amount" } }] } }] } }, { "kind": "InlineFragment", "typeCondition": { "kind": "NamedType", "name": { "kind": "Name", "value": "ContractUpdate" } }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "unshieldedBalances" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "tokenType" } }, { "kind": "Field", "name": { "kind": "Name", "value": "amount" } }] } }] } }, { "kind": "InlineFragment", "typeCondition": { "kind": "NamedType", "name": { "kind": "Name", "value": "ContractCall" } }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "deploy" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "unshieldedBalances" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "tokenType" } }, { "kind": "Field", "name": { "kind": "Name", "value": "amount" } }] } }] } }] } }] } }] } }] };
var documents = {
  "\n  query BLOCK_HASH_QUERY($offset: BlockOffset) {\n    block(offset: $offset) {\n      height\n      hash\n    }\n  }": BlockHashQueryDocument,
  "\n  query TX_ID_QUERY($offset: TransactionOffset!) {\n    transactions(offset: $offset) {\n      id\n      protocolVersion\n      raw\n      hash\n      unshieldedCreatedOutputs {\n        owner\n        intentHash\n        tokenType\n        value\n      }\n      unshieldedSpentOutputs {\n        owner\n        intentHash\n        tokenType\n        value\n      }\n      block {\n        height\n        hash\n        author\n        timestamp\n      }\n      ... on RegularTransaction {\n        identifiers\n        fees {\n          estimatedFees\n          paidFees\n        }\n        transactionResult {\n          status\n          segments {\n            id\n            success\n          }\n        }\n      }\n    }\n  }": TxIdQueryDocument,
  "\n  query DEPLOY_TX_QUERY($address: HexEncoded!) {\n    contractAction(address: $address) {\n      ... on ContractDeploy {\n        transaction {\n          id\n          protocolVersion\n	        raw\n          hash\n          contractActions {\n            address\n          }\n          block {\n            height\n            hash\n            author\n            timestamp\n          }\n          unshieldedCreatedOutputs {\n            owner\n            intentHash\n            tokenType\n            value\n          }\n          unshieldedSpentOutputs {\n            owner\n            intentHash\n            tokenType\n            value\n          }\n          ... on RegularTransaction {\n            identifiers\n            fees {\n              estimatedFees\n              paidFees\n            }\n            transactionResult {\n              status\n              segments {\n                id\n                success\n              }\n            }\n          }\n        }\n      }\n      ... on ContractUpdate {\n        transaction {\n          id\n          protocolVersion\n	        raw\n          hash\n          contractActions {\n            address\n          }\n          block {\n            height\n            hash\n            author\n            timestamp\n          }\n          unshieldedCreatedOutputs {\n            owner\n            intentHash\n            tokenType\n            value\n          }\n          unshieldedSpentOutputs {\n            owner\n            intentHash\n            tokenType\n            value\n          }\n          ... on RegularTransaction {\n            identifiers\n            fees {\n              estimatedFees\n              paidFees\n            }\n            transactionResult {\n              status\n              segments {\n                id\n                success\n              }\n            }\n          }\n        }\n      }\n      ... on ContractCall {\n        deploy {\n          transaction {\n            id\n            protocolVersion\n	          raw\n            hash\n            contractActions {\n              address\n            }\n            block {\n              height\n              hash\n              author\n              timestamp\n            }\n            unshieldedCreatedOutputs {\n              owner\n              intentHash\n              tokenType\n              value\n            }\n            unshieldedSpentOutputs {\n              owner\n              intentHash\n              tokenType\n              value\n            }\n            ... on RegularTransaction {\n              identifiers\n              fees {\n                estimatedFees\n                paidFees\n              }\n              transactionResult {\n                status\n                segments {\n                  id\n                  success\n                }\n              }\n            }\n          }\n        }\n      }\n    }\n  }": DeployTxQueryDocument,
  "\n  query DEPLOY_CONTRACT_STATE_TX_QUERY($address: HexEncoded!) {\n    contractAction(address: $address) {\n      ... on ContractDeploy {\n        state\n      }\n      ... on ContractUpdate {\n        state\n      }\n      ... on ContractCall {\n        deploy {\n          transaction {\n            contractActions {\n              address\n              state\n            }\n          }\n        }\n      }\n    }\n  }": DeployContractStateTxQueryDocument,
  "\n  query LATEST_CONTRACT_TX_BLOCK_HEIGHT_QUERY($address: HexEncoded!) {\n    contractAction(address: $address) {\n      transaction {\n        block {\n          height\n        }\n      }\n    }\n  }": LatestContractTxBlockHeightQueryDocument,
  "\n  subscription TXS_FROM_BLOCK_SUB($offset: BlockOffset) {\n    blocks(offset: $offset) {\n      hash,\n      height,\n      transactions {\n        hash\n        contractActions {\n          state\n          address\n        }\n        ... on RegularTransaction {\n          identifiers\n        }\n      }\n    }\n  }": TxsFromBlockSubDocument,
  "\n  query CONTRACT_STATE_QUERY($address: HexEncoded!, $offset: ContractActionOffset) {\n    contractAction(address: $address, offset: $offset) {\n      state\n    }\n  }": ContractStateQueryDocument,
  "\n  subscription CONTRACT_STATE_SUB($address: HexEncoded!, $offset: BlockOffset) {\n    contractActions(address: $address, offset: $offset) {\n      state\n    }\n  }": ContractStateSubDocument,
  "\n  query BOTH_STATE_QUERY($address: HexEncoded!, $offset: ContractActionOffset) {\n    contractAction(address: $address, offset: $offset) {\n      state\n      zswapState\n    }\n  }": BothStateQueryDocument,
  "\n  query UNSHIELDED_BALANCE_QUERY($address: HexEncoded!) {\n    contractAction(address: $address) {\n      ... on ContractDeploy {\n        unshieldedBalances {\n          tokenType\n          amount\n        }\n      }\n      ... on ContractUpdate {\n        unshieldedBalances {\n          tokenType\n          amount\n        }\n      }\n      ... on ContractCall {\n        deploy {\n          unshieldedBalances {\n            tokenType\n            amount\n          }\n        }\n      }\n    }\n  }": UnshieldedBalanceQueryDocument,
  "\n  query QUERY_UNSHIELDED_BALANCES_WITH_OFFSET($address: HexEncoded!, $offset: ContractActionOffset) {\n    contractAction(address: $address, offset: $offset) {\n      ... on ContractDeploy {\n        unshieldedBalances {\n          tokenType\n          amount\n        }\n      }\n      ... on ContractUpdate {\n        unshieldedBalances {\n          tokenType\n          amount\n        }\n      }\n      ... on ContractCall {\n        deploy {\n          unshieldedBalances {\n            tokenType\n            amount\n          }\n        }\n      }\n    }\n  }": QueryUnshieldedBalancesWithOffsetDocument,
  "\n  subscription UNSHIELDED_BALANCE_SUB($address: HexEncoded!, $offset: BlockOffset) {\n    contractActions(address: $address, offset: $offset) {\n      ... on ContractDeploy {\n        unshieldedBalances {\n          tokenType\n          amount\n        }\n      }\n      ... on ContractUpdate {\n        unshieldedBalances {\n          tokenType\n          amount\n        }\n      }\n      ... on ContractCall {\n        deploy {\n          unshieldedBalances {\n            tokenType\n            amount\n          }\n        }\n      }\n    }\n  }": UnshieldedBalanceSubDocument
};
function gql2(source) {
  return documents[source] ?? {};
}
var BLOCK_QUERY = gql2(`
  query BLOCK_HASH_QUERY($offset: BlockOffset) {
    block(offset: $offset) {
      height
      hash
    }
  }`);
var TX_ID_QUERY = gql2(`
  query TX_ID_QUERY($offset: TransactionOffset!) {
    transactions(offset: $offset) {
      id
      protocolVersion
      raw
      hash
      unshieldedCreatedOutputs {
        owner
        intentHash
        tokenType
        value
      }
      unshieldedSpentOutputs {
        owner
        intentHash
        tokenType
        value
      }
      block {
        height
        hash
        author
        timestamp
      }
      ... on RegularTransaction {
        identifiers
        fees {
          estimatedFees
          paidFees
        }
        transactionResult {
          status
          segments {
            id
            success
          }
        }
      }
    }
  }`);
var DEPLOY_TX_QUERY = gql2(`
  query DEPLOY_TX_QUERY($address: HexEncoded!) {
    contractAction(address: $address) {
      ... on ContractDeploy {
        transaction {
          id
          protocolVersion
	        raw
          hash
          contractActions {
            address
          }
          block {
            height
            hash
            author
            timestamp
          }
          unshieldedCreatedOutputs {
            owner
            intentHash
            tokenType
            value
          }
          unshieldedSpentOutputs {
            owner
            intentHash
            tokenType
            value
          }
          ... on RegularTransaction {
            identifiers
            fees {
              estimatedFees
              paidFees
            }
            transactionResult {
              status
              segments {
                id
                success
              }
            }
          }
        }
      }
      ... on ContractUpdate {
        transaction {
          id
          protocolVersion
	        raw
          hash
          contractActions {
            address
          }
          block {
            height
            hash
            author
            timestamp
          }
          unshieldedCreatedOutputs {
            owner
            intentHash
            tokenType
            value
          }
          unshieldedSpentOutputs {
            owner
            intentHash
            tokenType
            value
          }
          ... on RegularTransaction {
            identifiers
            fees {
              estimatedFees
              paidFees
            }
            transactionResult {
              status
              segments {
                id
                success
              }
            }
          }
        }
      }
      ... on ContractCall {
        deploy {
          transaction {
            id
            protocolVersion
	          raw
            hash
            contractActions {
              address
            }
            block {
              height
              hash
              author
              timestamp
            }
            unshieldedCreatedOutputs {
              owner
              intentHash
              tokenType
              value
            }
            unshieldedSpentOutputs {
              owner
              intentHash
              tokenType
              value
            }
            ... on RegularTransaction {
              identifiers
              fees {
                estimatedFees
                paidFees
              }
              transactionResult {
                status
                segments {
                  id
                  success
                }
              }
            }
          }
        }
      }
    }
  }`);
var DEPLOY_CONTRACT_STATE_TX_QUERY = gql2(`
  query DEPLOY_CONTRACT_STATE_TX_QUERY($address: HexEncoded!) {
    contractAction(address: $address) {
      ... on ContractDeploy {
        state
      }
      ... on ContractUpdate {
        state
      }
      ... on ContractCall {
        deploy {
          transaction {
            contractActions {
              address
              state
            }
          }
        }
      }
    }
  }`);
var LATEST_CONTRACT_TX_BLOCK_HEIGHT_QUERY = gql2(`
  query LATEST_CONTRACT_TX_BLOCK_HEIGHT_QUERY($address: HexEncoded!) {
    contractAction(address: $address) {
      transaction {
        block {
          height
        }
      }
    }
  }`);
var TXS_FROM_BLOCK_SUB = gql2(`
  subscription TXS_FROM_BLOCK_SUB($offset: BlockOffset) {
    blocks(offset: $offset) {
      hash,
      height,
      transactions {
        hash
        contractActions {
          state
          address
        }
        ... on RegularTransaction {
          identifiers
        }
      }
    }
  }`);
var CONTRACT_STATE_QUERY = gql2(`
  query CONTRACT_STATE_QUERY($address: HexEncoded!, $offset: ContractActionOffset) {
    contractAction(address: $address, offset: $offset) {
      state
    }
  }`);
var CONTRACT_STATE_SUB = gql2(`
  subscription CONTRACT_STATE_SUB($address: HexEncoded!, $offset: BlockOffset) {
    contractActions(address: $address, offset: $offset) {
      state
    }
  }`);
var CONTRACT_AND_ZSWAP_STATE_QUERY = gql2(`
  query BOTH_STATE_QUERY($address: HexEncoded!, $offset: ContractActionOffset) {
    contractAction(address: $address, offset: $offset) {
      state
      zswapState
    }
  }`);
var UNSHIELDED_BALANCE_QUERY = gql2(`
  query UNSHIELDED_BALANCE_QUERY($address: HexEncoded!) {
    contractAction(address: $address) {
      ... on ContractDeploy {
        unshieldedBalances {
          tokenType
          amount
        }
      }
      ... on ContractUpdate {
        unshieldedBalances {
          tokenType
          amount
        }
      }
      ... on ContractCall {
        deploy {
          unshieldedBalances {
            tokenType
            amount
          }
        }
      }
    }
  }`);
var QUERY_UNSHIELDED_BALANCES_WITH_OFFSET = gql2(`
  query QUERY_UNSHIELDED_BALANCES_WITH_OFFSET($address: HexEncoded!, $offset: ContractActionOffset) {
    contractAction(address: $address, offset: $offset) {
      ... on ContractDeploy {
        unshieldedBalances {
          tokenType
          amount
        }
      }
      ... on ContractUpdate {
        unshieldedBalances {
          tokenType
          amount
        }
      }
      ... on ContractCall {
        deploy {
          unshieldedBalances {
            tokenType
            amount
          }
        }
      }
    }
  }`);
var UNSHIELDED_BALANCE_SUB = gql2(`
  subscription UNSHIELDED_BALANCE_SUB($address: HexEncoded!, $offset: BlockOffset) {
    contractActions(address: $address, offset: $offset) {
      ... on ContractDeploy {
        unshieldedBalances {
          tokenType
          amount
        }
      }
      ... on ContractUpdate {
        unshieldedBalances {
          tokenType
          amount
        }
      }
      ... on ContractCall {
        deploy {
          unshieldedBalances {
            tokenType
            amount
          }
        }
      }
    }
  }`);
var isRegularTransaction = (tx) => {
  return "identifiers" in tx && "hash" in tx && Array.isArray(tx.identifiers);
};
var maybeThrowGraphQLErrors = (result2) => {
  if (result2.errors && result2.errors.length > 0) {
    throw new IndexerFormattedError(result2.errors);
  }
  return result2;
};
var maybeThrowApolloError = (result2) => {
  if (result2.error) {
    throw new Error(result2.error.message);
  }
  return result2;
};
var maybeThrowErrors = (queryResult) => {
  maybeThrowApolloError(queryResult);
  return maybeThrowGraphQLErrors(queryResult);
};
var toByteArray = (s) => import_buffer.Buffer.from(s, "hex");
var deserializeContractState = (s) => ContractState.deserialize(toByteArray(s));
var deserializeZswapState = (s) => ZswapChainState.deserialize(toByteArray(s));
var deserializeTransaction = (s) => Transaction.deserialize("signature", "proof", "binding", toByteArray(s));
var zenToRx = (zenObservable) => new Observable((subscriber) => zenObservable.subscribe(subscriber));
var DEFAULT_POLL_INTERVAL = 1e3;
var blockOffsetToBlock$ = (apolloClient) => (offset) => zenToRx(apolloClient.subscribe({
  query: TXS_FROM_BLOCK_SUB,
  variables: {
    offset
  },
  fetchPolicy: "no-cache"
}).map(maybeThrowGraphQLErrors).map((fetchResult) => {
  const blocks = fetchResult.data.blocks;
  return {
    hash: blocks.hash,
    height: blocks.height,
    transactions: blocks.transactions.filter((tx) => "identifiers" in tx).map((tx) => ({
      hash: tx.hash,
      identifiers: tx.identifiers,
      contractActions: tx.contractActions
    }))
  };
}));
var transactionIdToTransaction$ = (apolloClient) => (identifier) => zenToRx(apolloClient.watchQuery({
  query: TX_ID_QUERY,
  variables: {
    offset: { identifier }
  },
  pollInterval: DEFAULT_POLL_INTERVAL,
  fetchPolicy: "no-cache",
  initialFetchPolicy: "no-cache",
  nextFetchPolicy: "no-cache"
}).map(maybeThrowErrors).filter((maybeQueryResult) => maybeQueryResult.data.transactions.length !== 0).map((maybeQueryResult) => ({
  height: maybeQueryResult.data.transactions[0].block.height
}))).pipe(concatMap(blockOffsetToBlock$(apolloClient)), concatMap(({ transactions }) => from(transactions)));
var transactionToContractState$ = (transactionId) => ({ identifiers, contractActions }) => zip(identifiers, contractActions).pipe(skipWhile((pair) => pair[0] !== transactionId), map((pair) => deserializeContractState(pair[1].state)));
var toTxStatus = (transactionResult) => {
  const result2 = transactionResult.status;
  const map2 = {
    "FAILURE": FailEntirely,
    "PARTIAL_SUCCESS": FailFallible,
    "SUCCESS": SucceedEntirely
  };
  if (result2 === "FAILURE" || result2 === "PARTIAL_SUCCESS" || result2 === "SUCCESS") {
    return map2[result2];
  }
  throw new Error(`Unexpected 'status' value ${result2}`);
};
var toSegmentStatus = (success) => success ? SegmentSuccess : SegmentFail;
var toSegmentStatusMap = (transactionResult) => {
  if (transactionResult.status !== "PARTIAL_SUCCESS") {
    return void 0;
  }
  if (!transactionResult.segments) {
    return void 0;
  }
  return new Map(transactionResult.segments.map((segment) => [segment.id, toSegmentStatus(segment.success)]));
};
var transformIndexerUtxoToUnshieldedUtxo = (indexerUtxo) => ({
  owner: indexerUtxo.owner,
  intentHash: indexerUtxo.intentHash,
  tokenType: indexerUtxo.tokenType,
  value: BigInt(indexerUtxo.value)
});
var toUnshieldedUtxos = (createdUtxo, spentUtxo) => ({
  created: createdUtxo.map(transformIndexerUtxoToUnshieldedUtxo),
  spent: spentUtxo.map(transformIndexerUtxoToUnshieldedUtxo)
});
var transformContractBalanceToUnshieldedBalance = (contractBalance) => ({
  balance: BigInt(contractBalance.amount),
  tokenType: contractBalance.tokenType
});
var toUnshieldedBalances = (contractBalances) => contractBalances.map(transformContractBalanceToUnshieldedBalance);
var blockToContractState$ = (contractAddress) => (block2) => from(block2.transactions).pipe(concatMap(({ contractActions }) => from(contractActions)), filter((call) => call.address === contractAddress), map((call) => deserializeContractState(call.state)));
var contractAddressToLatestBlockOffset$ = (apolloClient) => (contractAddress) => zenToRx(apolloClient.watchQuery({
  query: LATEST_CONTRACT_TX_BLOCK_HEIGHT_QUERY,
  variables: {
    address: contractAddress
  },
  pollInterval: DEFAULT_POLL_INTERVAL,
  fetchPolicy: "no-cache",
  initialFetchPolicy: "no-cache",
  nextFetchPolicy: "no-cache"
}).map(maybeThrowErrors).filter((maybeQueryResult) => maybeQueryResult.data.contractAction !== null).map((queryResult) => {
  const contract = queryResult.data.contractAction;
  return contract.transaction.block.height;
})).pipe(take(1), map((height) => ({ height })));
var blockOffsetToContractState$ = (apolloClient) => (contractAddress) => (offset) => zenToRx(apolloClient.subscribe({
  query: CONTRACT_STATE_SUB,
  variables: {
    address: contractAddress,
    offset
  },
  fetchPolicy: "no-cache"
}).map(maybeThrowGraphQLErrors).map((queryResult) => queryResult.data.contractActions.state).map(deserializeContractState));
var waitForContractToAppear = (apolloClient) => (contractAddress) => (offset) => zenToRx(apolloClient.watchQuery({
  query: CONTRACT_STATE_QUERY,
  variables: {
    address: contractAddress,
    offset
  },
  pollInterval: DEFAULT_POLL_INTERVAL,
  fetchPolicy: "no-cache",
  initialFetchPolicy: "no-cache",
  nextFetchPolicy: "no-cache"
}).map(maybeThrowErrors).filter((maybeQueryResult) => maybeQueryResult.data.contractAction !== null).map((queryResult) => queryResult.data.contractAction.state)).pipe(take(1));
var waitForBlockToAppear = (apolloClient) => (offset) => zenToRx(apolloClient.watchQuery({
  query: BLOCK_QUERY,
  variables: {
    offset
  },
  pollInterval: DEFAULT_POLL_INTERVAL,
  fetchPolicy: "no-cache",
  initialFetchPolicy: "no-cache",
  nextFetchPolicy: "no-cache"
}).map(maybeThrowErrors).filter((fetchResult) => fetchResult.data.block !== null)).pipe(take(1));
var waitForUnshieldedBalancesToAppear = (apolloClient) => (contractAddress) => zenToRx(apolloClient.watchQuery({
  query: UNSHIELDED_BALANCE_QUERY,
  variables: {
    address: contractAddress
  },
  pollInterval: DEFAULT_POLL_INTERVAL,
  fetchPolicy: "no-cache",
  initialFetchPolicy: "no-cache",
  nextFetchPolicy: "no-cache"
}).map(maybeThrowErrors).filter((maybeQueryResult) => maybeQueryResult.data.contractAction !== null).map((queryResult) => {
  const contractAction = queryResult.data.contractAction;
  if ("unshieldedBalances" in contractAction) {
    return contractAction.unshieldedBalances;
  }
  if ("deploy" in contractAction) {
    return contractAction.deploy.unshieldedBalances;
  }
  return [];
})).pipe(take(1));
var blockOffsetToUnshieldedBalances$ = (apolloClient) => (contractAddress) => (offset) => zenToRx(apolloClient.subscribe({
  query: UNSHIELDED_BALANCE_SUB,
  variables: {
    address: contractAddress,
    offset
  },
  fetchPolicy: "no-cache"
}).map(maybeThrowGraphQLErrors).map((queryResult) => {
  const contractAction = queryResult.data.contractActions;
  if ("unshieldedBalances" in contractAction) {
    return contractAction.unshieldedBalances;
  }
  if ("deploy" in contractAction) {
    return contractAction.deploy.unshieldedBalances;
  }
  return [];
}).map(toUnshieldedBalances));
var indexerPublicDataProviderInternal = (queryURL, subscriptionURL, webSocketImpl = void 0) => {
  const queryURLObj = new URL(queryURL);
  if (queryURLObj.protocol !== "http:" && queryURLObj.protocol !== "https:") {
    throw new InvalidProtocolSchemeError(queryURLObj.protocol, ["http:", "https:"]);
  }
  const subscriptionURLObj = new URL(subscriptionURL);
  if (subscriptionURLObj.protocol !== "ws:" && subscriptionURLObj.protocol !== "wss:") {
    throw new InvalidProtocolSchemeError(subscriptionURLObj.protocol, ["ws:", "wss:"]);
  }
  const link = (0, import_http.createHttpLink)({ fetch: import_cross_fetch.default, uri: queryURL });
  const retryLink = new import_retry.RetryLink({
    delay: {
      initial: 1e3,
      max: 1e4,
      jitter: true
    },
    attempts: {
      max: 5
    }
  });
  const apolloLink = (0, import_core2.from)([retryLink, link]);
  const apolloClient = new import_core.ApolloClient({
    link: (0, import_core2.split)(({ query }) => {
      const definition = (0, import_utilities2.getMainDefinition)(query);
      return definition.kind === "OperationDefinition" && definition.operation === "subscription";
    }, new import_subscriptions.GraphQLWsLink(createClient({ url: subscriptionURL, webSocketImpl })), apolloLink),
    cache: new import_core.InMemoryCache()
  });
  return {
    async queryContractState(address, config) {
      let offset;
      if (config) {
        offset = {
          blockOffset: config.type === "blockHeight" ? { height: config.blockHeight } : { hash: config.blockHash }
        };
      } else {
        offset = null;
      }
      const maybeContractState = await apolloClient.query({
        query: CONTRACT_STATE_QUERY,
        variables: {
          address,
          offset
        },
        fetchPolicy: "no-cache"
      }).then(maybeThrowErrors).then((queryResult) => queryResult.data?.contractAction?.state ?? null);
      return maybeContractState ? deserializeContractState(maybeContractState) : null;
    },
    async queryZSwapAndContractState(address, config) {
      let offset;
      if (config) {
        offset = {
          blockOffset: config.type === "blockHeight" ? { height: config.blockHeight } : { hash: config.blockHash }
        };
      } else {
        offset = null;
      }
      const maybeContractStates = await apolloClient.query({
        query: CONTRACT_AND_ZSWAP_STATE_QUERY,
        variables: {
          address,
          offset
        },
        fetchPolicy: "no-cache"
      }).then(maybeThrowErrors).then((queryResult) => queryResult.data.contractAction);
      return maybeContractStates ? [deserializeZswapState(maybeContractStates.zswapState), deserializeContractState(maybeContractStates.state)] : null;
    },
    async queryUnshieldedBalances(address, config) {
      let offset;
      if (config) {
        offset = {
          blockOffset: config.type === "blockHeight" ? { height: config.blockHeight } : { hash: config.blockHash }
        };
      } else {
        offset = null;
      }
      const maybeUnshieldedBalances = await apolloClient.query({
        query: QUERY_UNSHIELDED_BALANCES_WITH_OFFSET,
        variables: {
          address,
          offset
        },
        fetchPolicy: "no-cache"
      }).then(maybeThrowErrors).then((queryResult) => {
        const contractAction = queryResult.data.contractAction;
        if (!contractAction) {
          return null;
        }
        if ("unshieldedBalances" in contractAction) {
          return contractAction.unshieldedBalances;
        }
        if ("deploy" in contractAction) {
          return contractAction.deploy.unshieldedBalances;
        }
        return [];
      });
      return maybeUnshieldedBalances ? toUnshieldedBalances(maybeUnshieldedBalances) : null;
    },
    async queryDeployContractState(contractAddress) {
      return apolloClient.query({
        query: DEPLOY_CONTRACT_STATE_TX_QUERY,
        variables: {
          address: contractAddress
        },
        fetchPolicy: "no-cache"
      }).then((queryResult) => {
        if (queryResult.data.contractAction) {
          const contract = queryResult.data.contractAction;
          return "deploy" in contract ? contract.deploy.transaction.contractActions.find(({ address }) => address === contractAddress).state : contract.state;
        }
        return null;
      }).then((maybeContractState) => maybeContractState ? deserializeContractState(maybeContractState) : null);
    },
    async watchForContractState(contractAddress) {
      return firstValueFrom(waitForContractToAppear(apolloClient)(contractAddress)(null).pipe(map(deserializeContractState)));
    },
    async watchForUnshieldedBalances(contractAddress) {
      return firstValueFrom(waitForUnshieldedBalancesToAppear(apolloClient)(contractAddress).pipe(map(toUnshieldedBalances)));
    },
    async watchForDeployTxData(contractAddress) {
      return firstValueFrom(zenToRx(apolloClient.watchQuery({
        query: DEPLOY_TX_QUERY,
        variables: {
          address: contractAddress
        },
        pollInterval: DEFAULT_POLL_INTERVAL,
        fetchPolicy: "no-cache",
        initialFetchPolicy: "no-cache",
        nextFetchPolicy: "no-cache"
      }).filter((maybeQueryResult) => maybeQueryResult.data.contractAction !== null).map(maybeThrowErrors).map((queryResults) => {
        const contract = queryResults.data.contractAction;
        return "deploy" in contract ? contract.deploy.transaction : contract.transaction;
      }).filter(isRegularTransaction).map((transaction) => ({
        tx: deserializeTransaction(transaction.raw),
        status: toTxStatus(transaction.transactionResult),
        txId: transaction.identifiers[transaction.contractActions.findIndex(({ address }) => address === contractAddress)],
        identifiers: transaction.identifiers,
        txHash: transaction.hash,
        blockHeight: transaction.block.height,
        blockHash: transaction.block.hash,
        blockTimestamp: transaction.block.timestamp,
        blockAuthor: transaction.block.author,
        segmentStatusMap: toSegmentStatusMap(transaction.transactionResult),
        unshielded: toUnshieldedUtxos(transaction.unshieldedCreatedOutputs, transaction.unshieldedSpentOutputs),
        indexerId: transaction.id,
        protocolVersion: transaction.protocolVersion,
        fees: {
          estimatedFees: transaction.fees.estimatedFees,
          paidFees: transaction.fees.paidFees
        }
      }))));
    },
    async watchForTxData(txId) {
      return firstValueFrom(zenToRx(apolloClient.watchQuery({
        query: TX_ID_QUERY,
        variables: { offset: { identifier: txId } },
        pollInterval: DEFAULT_POLL_INTERVAL,
        fetchPolicy: "no-cache",
        initialFetchPolicy: "no-cache",
        nextFetchPolicy: "no-cache"
      }).map(maybeThrowErrors).filter((maybeQueryResult) => maybeQueryResult.data.transactions.length !== 0).map((queryResult) => queryResult.data.transactions[0]).filter(isRegularTransaction).map((transaction) => ({
        tx: deserializeTransaction(transaction.raw),
        status: toTxStatus(transaction.transactionResult),
        txId,
        txHash: transaction.hash,
        identifiers: transaction.identifiers,
        blockHeight: transaction.block.height,
        blockHash: transaction.block.hash,
        segmentStatusMap: toSegmentStatusMap(transaction.transactionResult),
        unshielded: toUnshieldedUtxos(transaction.unshieldedCreatedOutputs, transaction.unshieldedSpentOutputs),
        blockTimestamp: transaction.block.timestamp,
        blockAuthor: transaction.block.author,
        indexerId: transaction.id,
        protocolVersion: transaction.protocolVersion,
        fees: {
          paidFees: transaction.fees.paidFees,
          estimatedFees: transaction.fees.estimatedFees
        }
      }))));
    },
    contractStateObservable(contractAddress, config = { type: "latest" }) {
      if (config.type === "txId") {
        const contractStates = transactionIdToTransaction$(apolloClient)(config.txId).pipe(filter(isRegularTransaction), concatMap(transactionToContractState$(config.txId)));
        return config.inclusive ?? true ? contractStates : contractStates.pipe(skip(1));
      }
      if (config.type === "latest") {
        return contractAddressToLatestBlockOffset$(apolloClient)(contractAddress).pipe(concatMap(blockOffsetToBlock$(apolloClient)), concatMap(blockToContractState$(contractAddress)));
      }
      if (config.type === "all") {
        return waitForContractToAppear(apolloClient)(contractAddress)(null).pipe(concatMap(() => blockOffsetToContractState$(apolloClient)(contractAddress)(null)));
      }
      const offset = config.type === "blockHash" ? { hash: config.blockHash } : { height: config.blockHeight };
      const blocks = waitForBlockToAppear(apolloClient)(offset).pipe(filter(isRegularTransaction), concatMap(() => blockOffsetToBlock$(apolloClient)(offset)));
      const maybeShortenedBlocks = config.type === "blockHeight" || config.type === "blockHash" ? iif(() => config.inclusive ?? true, blocks, blocks.pipe(skip(1))) : blocks;
      return maybeShortenedBlocks.pipe(concatMap(blockToContractState$(contractAddress)));
    },
    unshieldedBalancesObservable(contractAddress, config = { type: "latest" }) {
      if (config.type === "txId") {
        throw new Error("txId configuration not supported for unshielded balances observable");
      }
      if (config.type === "latest") {
        return contractAddressToLatestBlockOffset$(apolloClient)(contractAddress).pipe(concatMap(blockOffsetToUnshieldedBalances$(apolloClient)(contractAddress)));
      }
      if (config.type === "all") {
        return waitForUnshieldedBalancesToAppear(apolloClient)(contractAddress).pipe(concatMap(() => blockOffsetToUnshieldedBalances$(apolloClient)(contractAddress)(null)));
      }
      const offset = config.type === "blockHash" ? { hash: config.blockHash } : { height: config.blockHeight };
      const balances = waitForBlockToAppear(apolloClient)(offset).pipe(concatMap(() => blockOffsetToUnshieldedBalances$(apolloClient)(contractAddress)(offset)));
      return config.type === "blockHeight" || config.type === "blockHash" ? iif(() => config.inclusive ?? true, balances, balances.pipe(skip(1))) : balances;
    }
  };
};
var indexerPublicDataProvider = (queryURL, subscriptionURL, webSocketImpl = void 0) => {
  const publicDataProvider = indexerPublicDataProviderInternal(queryURL, subscriptionURL, webSocketImpl);
  return {
    contractStateObservable(contractAddress, config) {
      assertIsContractAddress(contractAddress);
      return publicDataProvider.contractStateObservable(contractAddress, config);
    },
    queryContractState(contractAddress, config) {
      assertIsContractAddress(contractAddress);
      return publicDataProvider.queryContractState(contractAddress, config);
    },
    queryDeployContractState(contractAddress) {
      assertIsContractAddress(contractAddress);
      return publicDataProvider.queryDeployContractState(contractAddress);
    },
    queryZSwapAndContractState(contractAddress, config) {
      assertIsContractAddress(contractAddress);
      return publicDataProvider.queryZSwapAndContractState(contractAddress, config);
    },
    queryUnshieldedBalances(contractAddress, config) {
      assertIsContractAddress(contractAddress);
      return publicDataProvider.queryUnshieldedBalances(contractAddress, config);
    },
    watchForContractState(contractAddress) {
      assertIsContractAddress(contractAddress);
      return publicDataProvider.watchForContractState(contractAddress);
    },
    watchForUnshieldedBalances(contractAddress) {
      assertIsContractAddress(contractAddress);
      return publicDataProvider.watchForUnshieldedBalances(contractAddress);
    },
    watchForDeployTxData(contractAddress) {
      assertIsContractAddress(contractAddress);
      return publicDataProvider.watchForDeployTxData(contractAddress);
    },
    watchForTxData(txId) {
      return publicDataProvider.watchForTxData(txId);
    },
    unshieldedBalancesObservable(contractAddress, config) {
      assertIsContractAddress(contractAddress);
      return publicDataProvider.unshieldedBalancesObservable(contractAddress, config);
    }
  };
};
export {
  IndexerFormattedError,
  indexerPublicDataProvider,
  toUnshieldedBalances,
  toUnshieldedUtxos
};
//# sourceMappingURL=@midnight-ntwrk_midnight-js-indexer-public-data-provider.js.map

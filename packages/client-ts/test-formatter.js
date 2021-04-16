var __create = Object.create;
var __defProp = Object.defineProperty;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __markAsModule = (target) =>
  __defProp(target, "__esModule", { value: true });
var __commonJS = (cb, mod) => () => (
  mod || cb((mod = { exports: {} }).exports, mod), mod.exports
);
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __reExport = (target, module2, desc) => {
  if (
    (module2 && typeof module2 === "object") ||
    typeof module2 === "function"
  ) {
    for (let key of __getOwnPropNames(module2))
      if (!__hasOwnProp.call(target, key) && key !== "default")
        __defProp(target, key, {
          get: () => module2[key],
          enumerable:
            !(desc = __getOwnPropDesc(module2, key)) || desc.enumerable,
        });
  }
  return target;
};
var __toModule = (module2) => {
  return __reExport(
    __markAsModule(
      __defProp(
        module2 != null ? __create(__getProtoOf(module2)) : {},
        "default",
        module2 && module2.__esModule && "default" in module2
          ? { get: () => module2.default, enumerable: true }
          : { value: module2, enumerable: true }
      )
    ),
    module2
  );
};

// node_modules/@actions/core/lib/utils.js
var require_utils = __commonJS((exports) => {
  "use strict";
  Object.defineProperty(exports, "__esModule", { value: true });
  function toCommandValue(input) {
    if (input === null || input === void 0) {
      return "";
    } else if (typeof input === "string" || input instanceof String) {
      return input;
    }
    return JSON.stringify(input);
  }
  exports.toCommandValue = toCommandValue;
});

// node_modules/@actions/core/lib/command.js
var require_command = __commonJS((exports) => {
  "use strict";
  var __importStar =
    (exports && exports.__importStar) ||
    function (mod) {
      if (mod && mod.__esModule) return mod;
      var result = {};
      if (mod != null) {
        for (var k in mod)
          if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
      }
      result["default"] = mod;
      return result;
    };
  Object.defineProperty(exports, "__esModule", { value: true });
  var os = __importStar(require("os"));
  var utils_1 = require_utils();
  function issueCommand(command, properties, message) {
    const cmd = new Command(command, properties, message);
    process.stdout.write(cmd.toString() + os.EOL);
  }
  exports.issueCommand = issueCommand;
  function issue(name, message = "") {
    issueCommand(name, {}, message);
  }
  exports.issue = issue;
  var CMD_STRING = "::";
  var Command = class {
    constructor(command, properties, message) {
      if (!command) {
        command = "missing.command";
      }
      this.command = command;
      this.properties = properties;
      this.message = message;
    }
    toString() {
      let cmdStr = CMD_STRING + this.command;
      if (this.properties && Object.keys(this.properties).length > 0) {
        cmdStr += " ";
        let first = true;
        for (const key in this.properties) {
          if (this.properties.hasOwnProperty(key)) {
            const val = this.properties[key];
            if (val) {
              if (first) {
                first = false;
              } else {
                cmdStr += ",";
              }
              cmdStr += `${key}=${escapeProperty(val)}`;
            }
          }
        }
      }
      cmdStr += `${CMD_STRING}${escapeData(this.message)}`;
      return cmdStr;
    }
  };
  function escapeData(s) {
    return utils_1
      .toCommandValue(s)
      .replace(/%/g, "%25")
      .replace(/\r/g, "%0D")
      .replace(/\n/g, "%0A");
  }
  function escapeProperty(s) {
    return utils_1
      .toCommandValue(s)
      .replace(/%/g, "%25")
      .replace(/\r/g, "%0D")
      .replace(/\n/g, "%0A")
      .replace(/:/g, "%3A")
      .replace(/,/g, "%2C");
  }
});

// node_modules/@actions/core/lib/file-command.js
var require_file_command = __commonJS((exports) => {
  "use strict";
  var __importStar =
    (exports && exports.__importStar) ||
    function (mod) {
      if (mod && mod.__esModule) return mod;
      var result = {};
      if (mod != null) {
        for (var k in mod)
          if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
      }
      result["default"] = mod;
      return result;
    };
  Object.defineProperty(exports, "__esModule", { value: true });
  var fs = __importStar(require("fs"));
  var os = __importStar(require("os"));
  var utils_1 = require_utils();
  function issueCommand(command, message) {
    const filePath = process.env[`GITHUB_${command}`];
    if (!filePath) {
      throw new Error(
        `Unable to find environment variable for file command ${command}`
      );
    }
    if (!fs.existsSync(filePath)) {
      throw new Error(`Missing file at path: ${filePath}`);
    }
    fs.appendFileSync(filePath, `${utils_1.toCommandValue(message)}${os.EOL}`, {
      encoding: "utf8",
    });
  }
  exports.issueCommand = issueCommand;
});

// node_modules/@actions/core/lib/core.js
var require_core = __commonJS((exports) => {
  "use strict";
  var __awaiter =
    (exports && exports.__awaiter) ||
    function (thisArg, _arguments, P, generator) {
      function adopt(value) {
        return value instanceof P
          ? value
          : new P(function (resolve) {
              resolve(value);
            });
      }
      return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) {
          try {
            step(generator.next(value));
          } catch (e) {
            reject(e);
          }
        }
        function rejected(value) {
          try {
            step(generator["throw"](value));
          } catch (e) {
            reject(e);
          }
        }
        function step(result) {
          result.done
            ? resolve(result.value)
            : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
      });
    };
  var __importStar =
    (exports && exports.__importStar) ||
    function (mod) {
      if (mod && mod.__esModule) return mod;
      var result = {};
      if (mod != null) {
        for (var k in mod)
          if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
      }
      result["default"] = mod;
      return result;
    };
  Object.defineProperty(exports, "__esModule", { value: true });
  var command_1 = require_command();
  var file_command_1 = require_file_command();
  var utils_1 = require_utils();
  var os = __importStar(require("os"));
  var path = __importStar(require("path"));
  var ExitCode;
  (function (ExitCode2) {
    ExitCode2[(ExitCode2["Success"] = 0)] = "Success";
    ExitCode2[(ExitCode2["Failure"] = 1)] = "Failure";
  })((ExitCode = exports.ExitCode || (exports.ExitCode = {})));
  function exportVariable(name, val) {
    const convertedVal = utils_1.toCommandValue(val);
    process.env[name] = convertedVal;
    const filePath = process.env["GITHUB_ENV"] || "";
    if (filePath) {
      const delimiter = "_GitHubActionsFileCommandDelimeter_";
      const commandValue = `${name}<<${delimiter}${os.EOL}${convertedVal}${os.EOL}${delimiter}`;
      file_command_1.issueCommand("ENV", commandValue);
    } else {
      command_1.issueCommand("set-env", { name }, convertedVal);
    }
  }
  exports.exportVariable = exportVariable;
  function setSecret(secret) {
    command_1.issueCommand("add-mask", {}, secret);
  }
  exports.setSecret = setSecret;
  function addPath(inputPath) {
    const filePath = process.env["GITHUB_PATH"] || "";
    if (filePath) {
      file_command_1.issueCommand("PATH", inputPath);
    } else {
      command_1.issueCommand("add-path", {}, inputPath);
    }
    process.env["PATH"] = `${inputPath}${path.delimiter}${process.env["PATH"]}`;
  }
  exports.addPath = addPath;
  function getInput(name, options) {
    const val =
      process.env[`INPUT_${name.replace(/ /g, "_").toUpperCase()}`] || "";
    if (options && options.required && !val) {
      throw new Error(`Input required and not supplied: ${name}`);
    }
    return val.trim();
  }
  exports.getInput = getInput;
  function setOutput(name, value) {
    process.stdout.write(os.EOL);
    command_1.issueCommand("set-output", { name }, value);
  }
  exports.setOutput = setOutput;
  function setCommandEcho(enabled) {
    command_1.issue("echo", enabled ? "on" : "off");
  }
  exports.setCommandEcho = setCommandEcho;
  function setFailed(message) {
    process.exitCode = ExitCode.Failure;
    error2(message);
  }
  exports.setFailed = setFailed;
  function isDebug() {
    return process.env["RUNNER_DEBUG"] === "1";
  }
  exports.isDebug = isDebug;
  function debug(message) {
    command_1.issueCommand("debug", {}, message);
  }
  exports.debug = debug;
  function error2(message) {
    command_1.issue(
      "error",
      message instanceof Error ? message.toString() : message
    );
  }
  exports.error = error2;
  function warning2(message) {
    command_1.issue(
      "warning",
      message instanceof Error ? message.toString() : message
    );
  }
  exports.warning = warning2;
  function info(message) {
    process.stdout.write(message + os.EOL);
  }
  exports.info = info;
  function startGroup2(name) {
    command_1.issue("group", name);
  }
  exports.startGroup = startGroup2;
  function endGroup2() {
    command_1.issue("endgroup");
  }
  exports.endGroup = endGroup2;
  function group(name, fn) {
    return __awaiter(this, void 0, void 0, function* () {
      startGroup2(name);
      let result;
      try {
        result = yield fn();
      } finally {
        endGroup2();
      }
      return result;
    });
  }
  exports.group = group;
  function saveState(name, value) {
    command_1.issueCommand("save-state", { name }, value);
  }
  exports.saveState = saveState;
  function getState(name) {
    return process.env[`STATE_${name}`] || "";
  }
  exports.getState = getState;
});

// src/reporter.ts
__markAsModule(exports);
__export(exports, {
  default: () => report,
});
var import_core2 = __toModule(require_core());

// src/formatMessage.ts
function formatMessage(filePath, result) {
  const { ruleId, line, column, message } = result;
  let output = `file=${filePath}`;
  if (line) {
    output += `,line=${line}`;
  }
  if (column) {
    output += `,col=${column}`;
  }
  output += `::${ruleId} ${message}`;
  return output;
}

// src/wrapInGroup.ts
var import_core = __toModule(require_core());
var groupMap = new Map();
function startGroupOnce(groupName) {
  if (!groupMap.has(groupName)) {
    (0, import_core.startGroup)(groupName);
    groupMap.set(groupName, true);
  }
}
function wrapInGroup(groupName, messages, callback) {
  for (const message of messages) {
    startGroupOnce(groupName);
    callback(message);
  }
  if (groupMap.has(groupName)) {
    (0, import_core.endGroup)();
  }
}

// src/reporter.ts
function getRelativePath(path) {
  const { GITHUB_WORKSPACE } = process.env;
  if (GITHUB_WORKSPACE) {
    return path.replace(`${GITHUB_WORKSPACE}/`, "");
  }
  return path;
}
function report(results) {
  for (const result of results) {
    const { filePath, messages } = result;
    const relFilePath = getRelativePath(filePath);
    wrapInGroup(relFilePath, messages, (message) => {
      if (!message.ruleId) {
        return;
      }
      switch (message.severity) {
        case 1:
          (0, import_core2.warning)(formatMessage(relFilePath, message));
          break;
        case 2:
          (0, import_core2.error)(formatMessage(relFilePath, message));
          break;
        default:
          break;
      }
    });
  }
}
module.exports = report;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});

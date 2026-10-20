var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __require = /* @__PURE__ */ ((x) => typeof require !== "undefined" ? require : typeof Proxy !== "undefined" ? new Proxy(x, {
  get: (a, b) => (typeof require !== "undefined" ? require : a)[b]
}) : x)(function(x) {
  if (typeof require !== "undefined") return require.apply(this, arguments);
  throw Error('Dynamic require of "' + x + '" is not supported');
});
var __commonJS = (cb, mod) => function __require2() {
  try {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  } catch (e) {
    throw mod = 0, e;
  }
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// node_modules/@ioredis/commands/built/commands.json
var require_commands = __commonJS({
  "node_modules/@ioredis/commands/built/commands.json"(exports, module) {
    module.exports = {
      acl: {
        arity: -2,
        flags: [],
        keyStart: 0,
        keyStop: 0,
        step: 0,
        subcommands: {
          cat: {
            arity: -2,
            flags: [
              "noscript",
              "loading",
              "stale"
            ],
            keyStart: 0,
            keyStop: 0,
            step: 0
          },
          deluser: {
            arity: -3,
            flags: [
              "admin",
              "noscript",
              "loading",
              "stale"
            ],
            keyStart: 0,
            keyStop: 0,
            requestPolicy: "all_nodes",
            responsePolicy: "all_succeeded",
            step: 0
          },
          dryrun: {
            arity: -4,
            flags: [
              "admin",
              "noscript",
              "loading",
              "stale"
            ],
            keyStart: 0,
            keyStop: 0,
            step: 0
          },
          genpass: {
            arity: -2,
            flags: [
              "noscript",
              "loading",
              "stale"
            ],
            keyStart: 0,
            keyStop: 0,
            step: 0
          },
          getuser: {
            arity: 3,
            flags: [
              "admin",
              "noscript",
              "loading",
              "stale"
            ],
            keyStart: 0,
            keyStop: 0,
            step: 0
          },
          help: {
            arity: 2,
            flags: [
              "loading",
              "stale"
            ],
            keyStart: 0,
            keyStop: 0,
            step: 0
          },
          list: {
            arity: 2,
            flags: [
              "admin",
              "noscript",
              "loading",
              "stale"
            ],
            keyStart: 0,
            keyStop: 0,
            step: 0
          },
          load: {
            arity: 2,
            flags: [
              "admin",
              "noscript",
              "loading",
              "stale"
            ],
            keyStart: 0,
            keyStop: 0,
            step: 0
          },
          log: {
            arity: -2,
            flags: [
              "admin",
              "noscript",
              "loading",
              "stale"
            ],
            keyStart: 0,
            keyStop: 0,
            step: 0
          },
          save: {
            arity: 2,
            flags: [
              "admin",
              "noscript",
              "loading",
              "stale"
            ],
            keyStart: 0,
            keyStop: 0,
            requestPolicy: "all_nodes",
            responsePolicy: "all_succeeded",
            step: 0
          },
          setuser: {
            arity: -3,
            flags: [
              "admin",
              "noscript",
              "loading",
              "stale"
            ],
            keyStart: 0,
            keyStop: 0,
            requestPolicy: "all_nodes",
            responsePolicy: "all_succeeded",
            step: 0
          },
          users: {
            arity: 2,
            flags: [
              "admin",
              "noscript",
              "loading",
              "stale"
            ],
            keyStart: 0,
            keyStop: 0,
            step: 0
          },
          whoami: {
            arity: 2,
            flags: [
              "noscript",
              "loading",
              "stale"
            ],
            keyStart: 0,
            keyStop: 0,
            step: 0
          }
        }
      },
      append: {
        arity: 3,
        flags: [
          "write",
          "denyoom",
          "fast"
        ],
        keyStart: 1,
        keyStop: 1,
        step: 1
      },
      arcount: {
        arity: 2,
        flags: [
          "readonly",
          "fast"
        ],
        keyStart: 1,
        keyStop: 1,
        step: 1
      },
      ardel: {
        arity: -3,
        flags: [
          "write",
          "fast"
        ],
        keyStart: 1,
        keyStop: 1,
        step: 1
      },
      ardelrange: {
        arity: -4,
        flags: [
          "write"
        ],
        keyStart: 1,
        keyStop: 1,
        step: 1
      },
      arget: {
        arity: 3,
        flags: [
          "readonly",
          "fast"
        ],
        keyStart: 1,
        keyStop: 1,
        step: 1
      },
      argetrange: {
        arity: 4,
        flags: [
          "readonly"
        ],
        keyStart: 1,
        keyStop: 1,
        step: 1
      },
      argrep: {
        arity: -6,
        flags: [
          "readonly"
        ],
        keyStart: 1,
        keyStop: 1,
        step: 1
      },
      arinfo: {
        arity: -2,
        flags: [
          "readonly"
        ],
        keyStart: 1,
        keyStop: 1,
        step: 1
      },
      arinsert: {
        arity: -3,
        flags: [
          "write",
          "denyoom",
          "fast"
        ],
        keyStart: 1,
        keyStop: 1,
        step: 1
      },
      arlastitems: {
        arity: -3,
        flags: [
          "readonly"
        ],
        keyStart: 1,
        keyStop: 1,
        step: 1
      },
      arlen: {
        arity: 2,
        flags: [
          "readonly",
          "fast"
        ],
        keyStart: 1,
        keyStop: 1,
        step: 1
      },
      armget: {
        arity: -3,
        flags: [
          "readonly",
          "fast"
        ],
        keyStart: 1,
        keyStop: 1,
        step: 1
      },
      armset: {
        arity: -4,
        flags: [
          "write",
          "denyoom",
          "fast"
        ],
        keyStart: 1,
        keyStop: 1,
        step: 1
      },
      arnext: {
        arity: 2,
        flags: [
          "readonly",
          "fast"
        ],
        keyStart: 1,
        keyStop: 1,
        step: 1
      },
      arop: {
        arity: -5,
        flags: [
          "readonly"
        ],
        keyStart: 1,
        keyStop: 1,
        step: 1
      },
      arring: {
        arity: -4,
        flags: [
          "write",
          "denyoom"
        ],
        keyStart: 1,
        keyStop: 1,
        step: 1
      },
      arscan: {
        arity: -4,
        flags: [
          "readonly"
        ],
        keyStart: 1,
        keyStop: 1,
        step: 1
      },
      arseek: {
        arity: 3,
        flags: [
          "write",
          "fast"
        ],
        keyStart: 1,
        keyStop: 1,
        step: 1
      },
      arset: {
        arity: -4,
        flags: [
          "write",
          "denyoom",
          "fast"
        ],
        keyStart: 1,
        keyStop: 1,
        step: 1
      },
      asking: {
        arity: 1,
        flags: [
          "fast"
        ],
        keyStart: 0,
        keyStop: 0,
        step: 0
      },
      auth: {
        arity: -2,
        flags: [
          "noscript",
          "loading",
          "stale",
          "fast",
          "no_auth",
          "allow_busy"
        ],
        keyStart: 0,
        keyStop: 0,
        step: 0
      },
      backup: {
        arity: 2,
        flags: [],
        keyStart: 0,
        keyStop: 0,
        step: 0,
        subcommands: {
          abort: {
            arity: 2,
            flags: [
              "admin",
              "noscript"
            ],
            keyStart: 0,
            keyStop: 0,
            step: 0
          },
          cleanup: {
            arity: 2,
            flags: [
              "admin",
              "noscript"
            ],
            keyStart: 0,
            keyStop: 0,
            step: 0
          },
          help: {
            arity: 2,
            flags: [
              "loading",
              "stale"
            ],
            keyStart: 0,
            keyStop: 0,
            step: 0
          },
          list: {
            arity: 2,
            flags: [
              "admin",
              "stale"
            ],
            keyStart: 0,
            keyStop: 0,
            step: 0
          },
          seal: {
            arity: 2,
            flags: [
              "admin",
              "noscript"
            ],
            keyStart: 0,
            keyStop: 0,
            step: 0
          },
          start: {
            arity: 2,
            flags: [
              "admin",
              "noscript"
            ],
            keyStart: 0,
            keyStop: 0,
            step: 0
          },
          status: {
            arity: 2,
            flags: [
              "admin",
              "stale"
            ],
            keyStart: 0,
            keyStop: 0,
            step: 0
          }
        }
      },
      bgrewriteaof: {
        arity: 1,
        flags: [
          "admin",
          "noscript",
          "no_async_loading"
        ],
        keyStart: 0,
        keyStop: 0,
        step: 0
      },
      bgsave: {
        arity: -1,
        flags: [
          "admin",
          "noscript",
          "no_async_loading"
        ],
        keyStart: 0,
        keyStop: 0,
        step: 0
      },
      bitcount: {
        arity: -2,
        flags: [
          "readonly"
        ],
        keyStart: 1,
        keyStop: 1,
        step: 1
      },
      bitfield: {
        arity: -2,
        flags: [
          "write",
          "denyoom"
        ],
        keyStart: 1,
        keyStop: 1,
        step: 1
      },
      bitfield_ro: {
        arity: -2,
        flags: [
          "readonly",
          "fast"
        ],
        keyStart: 1,
        keyStop: 1,
        step: 1
      },
      bitop: {
        arity: -4,
        flags: [
          "write",
          "denyoom"
        ],
        keyStart: 2,
        keyStop: -1,
        step: 1
      },
      bitpos: {
        arity: -3,
        flags: [
          "readonly"
        ],
        keyStart: 1,
        keyStop: 1,
        step: 1
      },
      blmove: {
        arity: 6,
        flags: [
          "write",
          "denyoom",
          "blocking"
        ],
        keyStart: 1,
        keyStop: 2,
        step: 1
      },
      blmovem: {
        arity: -6,
        flags: [
          "write",
          "denyoom",
          "blocking"
        ],
        keyStart: 1,
        keyStop: 2,
        step: 1
      },
      blmpop: {
        arity: -5,
        flags: [
          "write",
          "blocking",
          "movablekeys"
        ],
        keyStart: 0,
        keyStop: 0,
        step: 0
      },
      blpop: {
        arity: -3,
        flags: [
          "write",
          "blocking"
        ],
        keyStart: 1,
        keyStop: -2,
        step: 1
      },
      brpop: {
        arity: -3,
        flags: [
          "write",
          "blocking"
        ],
        keyStart: 1,
        keyStop: -2,
        step: 1
      },
      brpoplpush: {
        arity: 4,
        flags: [
          "write",
          "denyoom",
          "blocking"
        ],
        keyStart: 1,
        keyStop: 2,
        step: 1
      },
      bzmpop: {
        arity: -5,
        flags: [
          "write",
          "blocking",
          "movablekeys"
        ],
        keyStart: 0,
        keyStop: 0,
        step: 0
      },
      bzpopmax: {
        arity: -3,
        flags: [
          "write",
          "blocking",
          "fast"
        ],
        keyStart: 1,
        keyStop: -2,
        step: 1
      },
      bzpopmin: {
        arity: -3,
        flags: [
          "write",
          "blocking",
          "fast"
        ],
        keyStart: 1,
        keyStop: -2,
        step: 1
      },
      client: {
        arity: -2,
        flags: [],
        keyStart: 0,
        keyStop: 0,
        step: 0,
        subcommands: {
          caching: {
            arity: 3,
            flags: [
              "noscript",
              "loading",
              "stale"
            ],
            keyStart: 0,
            keyStop: 0,
            step: 0
          },
          getname: {
            arity: 2,
            flags: [
              "noscript",
              "loading",
              "stale"
            ],
            keyStart: 0,
            keyStop: 0,
            step: 0
          },
          getredir: {
            arity: 2,
            flags: [
              "noscript",
              "loading",
              "stale"
            ],
            keyStart: 0,
            keyStop: 0,
            step: 0
          },
          help: {
            arity: 2,
            flags: [
              "loading",
              "stale"
            ],
            keyStart: 0,
            keyStop: 0,
            step: 0
          },
          id: {
            arity: 2,
            flags: [
              "noscript",
              "loading",
              "stale"
            ],
            keyStart: 0,
            keyStop: 0,
            step: 0
          },
          info: {
            arity: 2,
            flags: [
              "noscript",
              "loading",
              "stale"
            ],
            keyStart: 0,
            keyStop: 0,
            step: 0
          },
          kill: {
            arity: -3,
            flags: [
              "admin",
              "noscript",
              "loading",
              "stale"
            ],
            keyStart: 0,
            keyStop: 0,
            step: 0
          },
          list: {
            arity: -2,
            flags: [
              "admin",
              "noscript",
              "loading",
              "stale"
            ],
            keyStart: 0,
            keyStop: 0,
            step: 0
          },
          "no-evict": {
            arity: 3,
            flags: [
              "admin",
              "noscript",
              "loading",
              "stale"
            ],
            keyStart: 0,
            keyStop: 0,
            step: 0
          },
          "no-touch": {
            arity: 3,
            flags: [
              "noscript",
              "loading",
              "stale"
            ],
            keyStart: 0,
            keyStop: 0,
            step: 0
          },
          pause: {
            arity: -3,
            flags: [
              "admin",
              "noscript",
              "loading",
              "stale"
            ],
            keyStart: 0,
            keyStop: 0,
            step: 0
          },
          reply: {
            arity: 3,
            flags: [
              "noscript",
              "loading",
              "stale"
            ],
            keyStart: 0,
            keyStop: 0,
            step: 0
          },
          setinfo: {
            arity: 4,
            flags: [
              "noscript",
              "loading",
              "stale"
            ],
            keyStart: 0,
            keyStop: 0,
            requestPolicy: "all_nodes",
            responsePolicy: "all_succeeded",
            step: 0
          },
          setname: {
            arity: 3,
            flags: [
              "noscript",
              "loading",
              "stale"
            ],
            keyStart: 0,
            keyStop: 0,
            requestPolicy: "all_nodes",
            responsePolicy: "all_succeeded",
            step: 0
          },
          tracking: {
            arity: -3,
            flags: [
              "noscript",
              "loading",
              "stale"
            ],
            keyStart: 0,
            keyStop: 0,
            step: 0
          },
          trackinginfo: {
            arity: 2,
            flags: [
              "noscript",
              "loading",
              "stale"
            ],
            keyStart: 0,
            keyStop: 0,
            step: 0
          },
          unblock: {
            arity: -3,
            flags: [
              "admin",
              "noscript",
              "loading",
              "stale"
            ],
            keyStart: 0,
            keyStop: 0,
            step: 0
          },
          unpause: {
            arity: 2,
            flags: [
              "admin",
              "noscript",
              "loading",
              "stale"
            ],
            keyStart: 0,
            keyStop: 0,
            step: 0
          }
        }
      },
      cluster: {
        arity: -2,
        flags: [],
        keyStart: 0,
        keyStop: 0,
        step: 0,
        subcommands: {
          addslots: {
            arity: -3,
            flags: [
              "admin",
              "stale",
              "no_async_loading"
            ],
            keyStart: 0,
            keyStop: 0,
            step: 0
          },
          addslotsrange: {
            arity: -4,
            flags: [
              "admin",
              "stale",
              "no_async_loading"
            ],
            keyStart: 0,
            keyStop: 0,
            step: 0
          },
          bumpepoch: {
            arity: 2,
            flags: [
              "admin",
              "stale",
              "no_async_loading"
            ],
            keyStart: 0,
            keyStop: 0,
            step: 0
          },
          "count-failure-reports": {
            arity: 3,
            flags: [
              "admin",
              "loading",
              "stale"
            ],
            keyStart: 0,
            keyStop: 0,
            step: 0
          },
          countkeysinslot: {
            arity: 3,
            flags: [
              "stale"
            ],
            keyStart: 0,
            keyStop: 0,
            step: 0
          },
          delslots: {
            arity: -3,
            flags: [
              "admin",
              "stale",
              "no_async_loading"
            ],
            keyStart: 0,
            keyStop: 0,
            step: 0
          },
          delslotsrange: {
            arity: -4,
            flags: [
              "admin",
              "stale",
              "no_async_loading"
            ],
            keyStart: 0,
            keyStop: 0,
            step: 0
          },
          failover: {
            arity: -2,
            flags: [
              "admin",
              "stale",
              "no_async_loading"
            ],
            keyStart: 0,
            keyStop: 0,
            step: 0
          },
          flushslots: {
            arity: 2,
            flags: [
              "admin",
              "stale",
              "no_async_loading"
            ],
            keyStart: 0,
            keyStop: 0,
            step: 0
          },
          forget: {
            arity: 3,
            flags: [
              "admin",
              "stale",
              "no_async_loading"
            ],
            keyStart: 0,
            keyStop: 0,
            step: 0
          },
          getkeysinslot: {
            arity: 4,
            flags: [
              "stale"
            ],
            keyStart: 0,
            keyStop: 0,
            step: 0
          },
          help: {
            arity: 2,
            flags: [
              "loading",
              "stale"
            ],
            keyStart: 0,
            keyStop: 0,
            step: 0
          },
          info: {
            arity: 2,
            flags: [
              "loading",
              "stale"
            ],
            keyStart: 0,
            keyStop: 0,
            step: 0
          },
          keyslot: {
            arity: 3,
            flags: [
              "loading",
              "stale"
            ],
            keyStart: 0,
            keyStop: 0,
            step: 0
          },
          links: {
            arity: 2,
            flags: [
              "loading",
              "stale"
            ],
            keyStart: 0,
            keyStop: 0,
            step: 0
          },
          meet: {
            arity: -4,
            flags: [
              "admin",
              "stale",
              "no_async_loading"
            ],
            keyStart: 0,
            keyStop: 0,
            step: 0
          },
          migration: {
            arity: -4,
            flags: [
              "admin",
              "stale",
              "no_async_loading"
            ],
            keyStart: 0,
            keyStop: 0,
            step: 0
          },
          myid: {
            arity: 2,
            flags: [
              "loading",
              "stale"
            ],
            keyStart: 0,
            keyStop: 0,
            step: 0
          },
          myshardid: {
            arity: 2,
            flags: [
              "loading",
              "stale"
            ],
            keyStart: 0,
            keyStop: 0,
            step: 0
          },
          nodes: {
            arity: 2,
            flags: [
              "loading",
              "stale"
            ],
            keyStart: 0,
            keyStop: 0,
            step: 0
          },
          replicas: {
            arity: 3,
            flags: [
              "admin",
              "loading",
              "stale"
            ],
            keyStart: 0,
            keyStop: 0,
            step: 0
          },
          replicate: {
            arity: 3,
            flags: [
              "admin",
              "stale",
              "no_async_loading"
            ],
            keyStart: 0,
            keyStop: 0,
            step: 0
          },
          reset: {
            arity: -2,
            flags: [
              "admin",
              "noscript",
              "stale"
            ],
            keyStart: 0,
            keyStop: 0,
            step: 0
          },
          saveconfig: {
            arity: 2,
            flags: [
              "admin",
              "stale",
              "no_async_loading"
            ],
            keyStart: 0,
            keyStop: 0,
            step: 0
          },
          "set-config-epoch": {
            arity: 3,
            flags: [
              "admin",
              "stale",
              "no_async_loading"
            ],
            keyStart: 0,
            keyStop: 0,
            step: 0
          },
          setslot: {
            arity: -4,
            flags: [
              "admin",
              "stale",
              "no_async_loading"
            ],
            keyStart: 0,
            keyStop: 0,
            step: 0
          },
          shards: {
            arity: 2,
            flags: [
              "loading",
              "stale"
            ],
            keyStart: 0,
            keyStop: 0,
            step: 0
          },
          slaves: {
            arity: 3,
            flags: [
              "admin",
              "loading",
              "stale"
            ],
            keyStart: 0,
            keyStop: 0,
            step: 0
          },
          "slot-stats": {
            arity: -4,
            flags: [
              "loading",
              "stale"
            ],
            keyStart: 0,
            keyStop: 0,
            requestPolicy: "all_shards",
            step: 0
          },
          slots: {
            arity: 2,
            flags: [
              "loading",
              "stale"
            ],
            keyStart: 0,
            keyStop: 0,
            step: 0
          },
          syncslots: {
            arity: -3,
            flags: [
              "admin",
              "stale",
              "no_async_loading"
            ],
            keyStart: 0,
            keyStop: 0,
            step: 0
          }
        }
      },
      command: {
        arity: -1,
        flags: [
          "loading",
          "stale"
        ],
        keyStart: 0,
        keyStop: 0,
        step: 0,
        subcommands: {
          count: {
            arity: 2,
            flags: [
              "loading",
              "stale"
            ],
            keyStart: 0,
            keyStop: 0,
            step: 0
          },
          docs: {
            arity: -2,
            flags: [
              "loading",
              "stale"
            ],
            keyStart: 0,
            keyStop: 0,
            step: 0
          },
          getkeys: {
            arity: -3,
            flags: [
              "loading",
              "stale"
            ],
            keyStart: 0,
            keyStop: 0,
            step: 0
          },
          getkeysandflags: {
            arity: -3,
            flags: [
              "loading",
              "stale"
            ],
            keyStart: 0,
            keyStop: 0,
            step: 0
          },
          help: {
            arity: 2,
            flags: [
              "loading",
              "stale"
            ],
            keyStart: 0,
            keyStop: 0,
            step: 0
          },
          info: {
            arity: -2,
            flags: [
              "loading",
              "stale"
            ],
            keyStart: 0,
            keyStop: 0,
            step: 0
          },
          list: {
            arity: -2,
            flags: [
              "loading",
              "stale"
            ],
            keyStart: 0,
            keyStop: 0,
            step: 0
          }
        }
      },
      config: {
        arity: -2,
        flags: [],
        keyStart: 0,
        keyStop: 0,
        step: 0,
        subcommands: {
          get: {
            arity: -3,
            flags: [
              "admin",
              "noscript",
              "loading",
              "stale"
            ],
            keyStart: 0,
            keyStop: 0,
            step: 0
          },
          help: {
            arity: 2,
            flags: [
              "loading",
              "stale"
            ],
            keyStart: 0,
            keyStop: 0,
            step: 0
          },
          resetstat: {
            arity: 2,
            flags: [
              "admin",
              "noscript",
              "loading",
              "stale"
            ],
            keyStart: 0,
            keyStop: 0,
            requestPolicy: "all_nodes",
            responsePolicy: "all_succeeded",
            step: 0
          },
          rewrite: {
            arity: 2,
            flags: [
              "admin",
              "noscript",
              "loading",
              "stale"
            ],
            keyStart: 0,
            keyStop: 0,
            requestPolicy: "all_nodes",
            responsePolicy: "all_succeeded",
            step: 0
          },
          set: {
            arity: -4,
            flags: [
              "admin",
              "noscript",
              "loading",
              "stale"
            ],
            keyStart: 0,
            keyStop: 0,
            requestPolicy: "all_nodes",
            responsePolicy: "all_succeeded",
            step: 0
          }
        }
      },
      copy: {
        arity: -3,
        flags: [
          "write",
          "denyoom"
        ],
        keyStart: 1,
        keyStop: 2,
        step: 1
      },
      dbsize: {
        arity: 1,
        flags: [
          "readonly",
          "fast"
        ],
        keyStart: 0,
        keyStop: 0,
        requestPolicy: "all_shards",
        responsePolicy: "agg_sum",
        step: 0
      },
      debug: {
        arity: -2,
        flags: [
          "admin",
          "noscript",
          "loading",
          "stale"
        ],
        keyStart: 0,
        keyStop: 0,
        step: 0
      },
      decr: {
        arity: 2,
        flags: [
          "write",
          "denyoom",
          "fast"
        ],
        keyStart: 1,
        keyStop: 1,
        step: 1
      },
      decrby: {
        arity: 3,
        flags: [
          "write",
          "denyoom",
          "fast"
        ],
        keyStart: 1,
        keyStop: 1,
        step: 1
      },
      del: {
        arity: -2,
        flags: [
          "write"
        ],
        keyStart: 1,
        keyStop: -1,
        requestPolicy: "multi_shard",
        responsePolicy: "agg_sum",
        step: 1
      },
      delex: {
        arity: -2,
        flags: [
          "write",
          "fast"
        ],
        keyStart: 1,
        keyStop: 1,
        step: 1
      },
      digest: {
        arity: 2,
        flags: [
          "readonly",
          "fast"
        ],
        keyStart: 1,
        keyStop: 1,
        step: 1
      },
      discard: {
        arity: 1,
        flags: [
          "noscript",
          "loading",
          "stale",
          "fast",
          "allow_busy"
        ],
        keyStart: 0,
        keyStop: 0,
        step: 0
      },
      dump: {
        arity: 2,
        flags: [
          "readonly"
        ],
        keyStart: 1,
        keyStop: 1,
        step: 1
      },
      echo: {
        arity: 2,
        flags: [
          "loading",
          "stale",
          "fast"
        ],
        keyStart: 0,
        keyStop: 0,
        step: 0
      },
      eval: {
        arity: -3,
        flags: [
          "noscript",
          "stale",
          "skip_monitor",
          "no_mandatory_keys",
          "movablekeys",
          "script_runner"
        ],
        keyStart: 0,
        keyStop: 0,
        step: 0
      },
      eval_ro: {
        arity: -3,
        flags: [
          "readonly",
          "noscript",
          "stale",
          "skip_monitor",
          "no_mandatory_keys",
          "movablekeys",
          "script_runner"
        ],
        keyStart: 0,
        keyStop: 0,
        step: 0
      },
      evalsha: {
        arity: -3,
        flags: [
          "noscript",
          "stale",
          "skip_monitor",
          "no_mandatory_keys",
          "movablekeys",
          "script_runner"
        ],
        keyStart: 0,
        keyStop: 0,
        step: 0
      },
      evalsha_ro: {
        arity: -3,
        flags: [
          "readonly",
          "noscript",
          "stale",
          "skip_monitor",
          "no_mandatory_keys",
          "movablekeys",
          "script_runner"
        ],
        keyStart: 0,
        keyStop: 0,
        step: 0
      },
      exec: {
        arity: 1,
        flags: [
          "noscript",
          "loading",
          "stale",
          "skip_slowlog"
        ],
        keyStart: 0,
        keyStop: 0,
        step: 0
      },
      exists: {
        arity: -2,
        flags: [
          "readonly",
          "fast"
        ],
        keyStart: 1,
        keyStop: -1,
        requestPolicy: "multi_shard",
        responsePolicy: "agg_sum",
        step: 1
      },
      expire: {
        arity: -3,
        flags: [
          "write",
          "fast"
        ],
        keyStart: 1,
        keyStop: 1,
        step: 1
      },
      expireat: {
        arity: -3,
        flags: [
          "write",
          "fast"
        ],
        keyStart: 1,
        keyStop: 1,
        step: 1
      },
      expiretime: {
        arity: 2,
        flags: [
          "readonly",
          "fast"
        ],
        keyStart: 1,
        keyStop: 1,
        step: 1
      },
      failover: {
        arity: -1,
        flags: [
          "admin",
          "noscript",
          "stale"
        ],
        keyStart: 0,
        keyStop: 0,
        step: 0
      },
      fcall: {
        arity: -3,
        flags: [
          "noscript",
          "stale",
          "skip_monitor",
          "no_mandatory_keys",
          "movablekeys",
          "script_runner"
        ],
        keyStart: 0,
        keyStop: 0,
        step: 0
      },
      fcall_ro: {
        arity: -3,
        flags: [
          "readonly",
          "noscript",
          "stale",
          "skip_monitor",
          "no_mandatory_keys",
          "movablekeys",
          "script_runner"
        ],
        keyStart: 0,
        keyStop: 0,
        step: 0
      },
      flushall: {
        arity: -1,
        flags: [
          "write"
        ],
        keyStart: 0,
        keyStop: 0,
        requestPolicy: "all_shards",
        responsePolicy: "all_succeeded",
        step: 0
      },
      flushdb: {
        arity: -1,
        flags: [
          "write"
        ],
        keyStart: 0,
        keyStop: 0,
        requestPolicy: "all_shards",
        responsePolicy: "all_succeeded",
        step: 0
      },
      function: {
        arity: -2,
        flags: [],
        keyStart: 0,
        keyStop: 0,
        step: 0,
        subcommands: {
          delete: {
            arity: 3,
            flags: [
              "write",
              "noscript"
            ],
            keyStart: 0,
            keyStop: 0,
            requestPolicy: "all_shards",
            responsePolicy: "all_succeeded",
            step: 0
          },
          dump: {
            arity: 2,
            flags: [
              "noscript"
            ],
            keyStart: 0,
            keyStop: 0,
            step: 0
          },
          flush: {
            arity: -2,
            flags: [
              "write",
              "noscript"
            ],
            keyStart: 0,
            keyStop: 0,
            requestPolicy: "all_shards",
            responsePolicy: "all_succeeded",
            step: 0
          },
          help: {
            arity: 2,
            flags: [
              "loading",
              "stale"
            ],
            keyStart: 0,
            keyStop: 0,
            step: 0
          },
          kill: {
            arity: 2,
            flags: [
              "noscript",
              "allow_busy"
            ],
            keyStart: 0,
            keyStop: 0,
            requestPolicy: "all_shards",
            responsePolicy: "one_succeeded",
            step: 0
          },
          list: {
            arity: -2,
            flags: [
              "noscript"
            ],
            keyStart: 0,
            keyStop: 0,
            step: 0
          },
          load: {
            arity: -3,
            flags: [
              "write",
              "denyoom",
              "noscript"
            ],
            keyStart: 0,
            keyStop: 0,
            requestPolicy: "all_shards",
            responsePolicy: "all_succeeded",
            step: 0
          },
          restore: {
            arity: -3,
            flags: [
              "write",
              "denyoom",
              "noscript"
            ],
            keyStart: 0,
            keyStop: 0,
            requestPolicy: "all_shards",
            responsePolicy: "all_succeeded",
            step: 0
          },
          stats: {
            arity: 2,
            flags: [
              "noscript",
              "allow_busy"
            ],
            keyStart: 0,
            keyStop: 0,
            requestPolicy: "all_shards",
            responsePolicy: "special",
            step: 0
          }
        }
      },
      geoadd: {
        arity: -5,
        flags: [
          "write",
          "denyoom"
        ],
        keyStart: 1,
        keyStop: 1,
        step: 1
      },
      geodist: {
        arity: -4,
        flags: [
          "readonly"
        ],
        keyStart: 1,
        keyStop: 1,
        step: 1
      },
      geohash: {
        arity: -2,
        flags: [
          "readonly"
        ],
        keyStart: 1,
        keyStop: 1,
        step: 1
      },
      geopos: {
        arity: -2,
        flags: [
          "readonly"
        ],
        keyStart: 1,
        keyStop: 1,
        step: 1
      },
      georadius: {
        arity: -6,
        flags: [
          "write",
          "denyoom",
          "movablekeys"
        ],
        keyStart: 1,
        keyStop: 1,
        step: 1
      },
      georadius_ro: {
        arity: -6,
        flags: [
          "readonly"
        ],
        keyStart: 1,
        keyStop: 1,
        step: 1
      },
      georadiusbymember: {
        arity: -5,
        flags: [
          "write",
          "denyoom",
          "movablekeys"
        ],
        keyStart: 1,
        keyStop: 1,
        step: 1
      },
      georadiusbymember_ro: {
        arity: -5,
        flags: [
          "readonly"
        ],
        keyStart: 1,
        keyStop: 1,
        step: 1
      },
      geosearch: {
        arity: -7,
        flags: [
          "readonly"
        ],
        keyStart: 1,
        keyStop: 1,
        step: 1
      },
      geosearchstore: {
        arity: -8,
        flags: [
          "write",
          "denyoom"
        ],
        keyStart: 1,
        keyStop: 2,
        step: 1
      },
      get: {
        arity: 2,
        flags: [
          "readonly",
          "fast"
        ],
        keyStart: 1,
        keyStop: 1,
        step: 1
      },
      getbit: {
        arity: 3,
        flags: [
          "readonly",
          "fast"
        ],
        keyStart: 1,
        keyStop: 1,
        step: 1
      },
      getdel: {
        arity: 2,
        flags: [
          "write",
          "fast"
        ],
        keyStart: 1,
        keyStop: 1,
        step: 1
      },
      getex: {
        arity: -2,
        flags: [
          "write",
          "fast"
        ],
        keyStart: 1,
        keyStop: 1,
        step: 1
      },
      getrange: {
        arity: 4,
        flags: [
          "readonly"
        ],
        keyStart: 1,
        keyStop: 1,
        step: 1
      },
      getset: {
        arity: 3,
        flags: [
          "write",
          "denyoom",
          "fast"
        ],
        keyStart: 1,
        keyStop: 1,
        step: 1
      },
      hdel: {
        arity: -3,
        flags: [
          "write",
          "fast"
        ],
        keyStart: 1,
        keyStop: 1,
        step: 1
      },
      hello: {
        arity: -1,
        flags: [
          "noscript",
          "loading",
          "stale",
          "fast",
          "no_auth",
          "allow_busy"
        ],
        keyStart: 0,
        keyStop: 0,
        step: 0
      },
      hexists: {
        arity: 3,
        flags: [
          "readonly",
          "fast"
        ],
        keyStart: 1,
        keyStop: 1,
        step: 1
      },
      hexpire: {
        arity: -6,
        flags: [
          "write",
          "fast"
        ],
        keyStart: 1,
        keyStop: 1,
        step: 1
      },
      hexpireat: {
        arity: -6,
        flags: [
          "write",
          "fast"
        ],
        keyStart: 1,
        keyStop: 1,
        step: 1
      },
      hexpiretime: {
        arity: -5,
        flags: [
          "readonly",
          "fast"
        ],
        keyStart: 1,
        keyStop: 1,
        step: 1
      },
      hget: {
        arity: 3,
        flags: [
          "readonly",
          "fast"
        ],
        keyStart: 1,
        keyStop: 1,
        step: 1
      },
      hgetall: {
        arity: 2,
        flags: [
          "readonly"
        ],
        keyStart: 1,
        keyStop: 1,
        step: 1
      },
      hgetdel: {
        arity: -5,
        flags: [
          "write",
          "fast"
        ],
        keyStart: 1,
        keyStop: 1,
        step: 1
      },
      hgetex: {
        arity: -5,
        flags: [
          "write",
          "fast"
        ],
        keyStart: 1,
        keyStop: 1,
        step: 1
      },
      himport: {
        arity: -2,
        flags: [],
        keyStart: 0,
        keyStop: 0,
        step: 0,
        subcommands: {
          discard: {
            arity: 3,
            flags: [],
            keyStart: 0,
            keyStop: 0,
            requestPolicy: "all_shards",
            step: 0
          },
          discardall: {
            arity: 2,
            flags: [],
            keyStart: 0,
            keyStop: 0,
            requestPolicy: "all_shards",
            step: 0
          },
          prepare: {
            arity: -4,
            flags: [
              "denyoom"
            ],
            keyStart: 0,
            keyStop: 0,
            requestPolicy: "all_shards",
            step: 0
          },
          set: {
            arity: -5,
            flags: [
              "write",
              "denyoom"
            ],
            keyStart: 2,
            keyStop: 2,
            step: 1
          }
        }
      },
      hincrby: {
        arity: 4,
        flags: [
          "write",
          "denyoom",
          "fast"
        ],
        keyStart: 1,
        keyStop: 1,
        step: 1
      },
      hincrbyfloat: {
        arity: 4,
        flags: [
          "write",
          "denyoom",
          "fast"
        ],
        keyStart: 1,
        keyStop: 1,
        step: 1
      },
      hkeys: {
        arity: 2,
        flags: [
          "readonly"
        ],
        keyStart: 1,
        keyStop: 1,
        step: 1
      },
      hlen: {
        arity: 2,
        flags: [
          "readonly",
          "fast"
        ],
        keyStart: 1,
        keyStop: 1,
        step: 1
      },
      hmget: {
        arity: -3,
        flags: [
          "readonly",
          "fast"
        ],
        keyStart: 1,
        keyStop: 1,
        step: 1
      },
      hmset: {
        arity: -4,
        flags: [
          "write",
          "denyoom",
          "fast"
        ],
        keyStart: 1,
        keyStop: 1,
        step: 1
      },
      hotkeys: {
        arity: -2,
        flags: [],
        keyStart: 0,
        keyStop: 0,
        step: 0,
        subcommands: {
          get: {
            arity: 2,
            flags: [
              "admin",
              "noscript"
            ],
            keyStart: 0,
            keyStop: 0,
            requestPolicy: "special",
            responsePolicy: "special",
            step: 0
          },
          help: {
            arity: 2,
            flags: [
              "loading",
              "stale"
            ],
            keyStart: 0,
            keyStop: 0,
            step: 0
          },
          reset: {
            arity: 2,
            flags: [
              "admin",
              "noscript"
            ],
            keyStart: 0,
            keyStop: 0,
            requestPolicy: "special",
            step: 0
          },
          start: {
            arity: -2,
            flags: [
              "admin",
              "noscript"
            ],
            keyStart: 0,
            keyStop: 0,
            requestPolicy: "special",
            step: 0
          },
          stop: {
            arity: 2,
            flags: [
              "admin",
              "noscript"
            ],
            keyStart: 0,
            keyStop: 0,
            requestPolicy: "special",
            step: 0
          }
        }
      },
      hpersist: {
        arity: -5,
        flags: [
          "write",
          "fast"
        ],
        keyStart: 1,
        keyStop: 1,
        step: 1
      },
      hpexpire: {
        arity: -6,
        flags: [
          "write",
          "fast"
        ],
        keyStart: 1,
        keyStop: 1,
        step: 1
      },
      hpexpireat: {
        arity: -6,
        flags: [
          "write",
          "fast"
        ],
        keyStart: 1,
        keyStop: 1,
        step: 1
      },
      hpexpiretime: {
        arity: -5,
        flags: [
          "readonly",
          "fast"
        ],
        keyStart: 1,
        keyStop: 1,
        step: 1
      },
      hpttl: {
        arity: -5,
        flags: [
          "readonly",
          "fast"
        ],
        keyStart: 1,
        keyStop: 1,
        step: 1
      },
      hrandfield: {
        arity: -2,
        flags: [
          "readonly"
        ],
        keyStart: 1,
        keyStop: 1,
        step: 1
      },
      hscan: {
        arity: -3,
        flags: [
          "readonly"
        ],
        keyStart: 1,
        keyStop: 1,
        step: 1
      },
      hset: {
        arity: -4,
        flags: [
          "write",
          "denyoom",
          "fast"
        ],
        keyStart: 1,
        keyStop: 1,
        step: 1
      },
      hsetex: {
        arity: -6,
        flags: [
          "write",
          "denyoom",
          "fast"
        ],
        keyStart: 1,
        keyStop: 1,
        step: 1
      },
      hsetnx: {
        arity: 4,
        flags: [
          "write",
          "denyoom",
          "fast"
        ],
        keyStart: 1,
        keyStop: 1,
        step: 1
      },
      hstrlen: {
        arity: 3,
        flags: [
          "readonly",
          "fast"
        ],
        keyStart: 1,
        keyStop: 1,
        step: 1
      },
      httl: {
        arity: -5,
        flags: [
          "readonly",
          "fast"
        ],
        keyStart: 1,
        keyStop: 1,
        step: 1
      },
      hvals: {
        arity: 2,
        flags: [
          "readonly"
        ],
        keyStart: 1,
        keyStop: 1,
        step: 1
      },
      incr: {
        arity: 2,
        flags: [
          "write",
          "denyoom",
          "fast"
        ],
        keyStart: 1,
        keyStop: 1,
        step: 1
      },
      incrby: {
        arity: 3,
        flags: [
          "write",
          "denyoom",
          "fast"
        ],
        keyStart: 1,
        keyStop: 1,
        step: 1
      },
      incrbyfloat: {
        arity: 3,
        flags: [
          "write",
          "denyoom",
          "fast"
        ],
        keyStart: 1,
        keyStop: 1,
        step: 1
      },
      increx: {
        arity: -2,
        flags: [
          "write",
          "denyoom",
          "fast"
        ],
        keyStart: 1,
        keyStop: 1,
        step: 1
      },
      info: {
        arity: -1,
        flags: [
          "loading",
          "stale"
        ],
        keyStart: 0,
        keyStop: 0,
        requestPolicy: "all_shards",
        responsePolicy: "special",
        step: 0
      },
      keys: {
        arity: 2,
        flags: [
          "readonly"
        ],
        keyStart: 0,
        keyStop: 0,
        requestPolicy: "all_shards",
        step: 0
      },
      lastsave: {
        arity: 1,
        flags: [
          "loading",
          "stale",
          "fast"
        ],
        keyStart: 0,
        keyStop: 0,
        step: 0
      },
      latency: {
        arity: -2,
        flags: [],
        keyStart: 0,
        keyStop: 0,
        step: 0,
        subcommands: {
          doctor: {
            arity: 2,
            flags: [
              "admin",
              "noscript",
              "loading",
              "stale"
            ],
            keyStart: 0,
            keyStop: 0,
            requestPolicy: "all_nodes",
            responsePolicy: "special",
            step: 0
          },
          graph: {
            arity: 3,
            flags: [
              "admin",
              "noscript",
              "loading",
              "stale"
            ],
            keyStart: 0,
            keyStop: 0,
            requestPolicy: "all_nodes",
            responsePolicy: "special",
            step: 0
          },
          help: {
            arity: 2,
            flags: [
              "loading",
              "stale"
            ],
            keyStart: 0,
            keyStop: 0,
            step: 0
          },
          histogram: {
            arity: -2,
            flags: [
              "admin",
              "noscript",
              "loading",
              "stale"
            ],
            keyStart: 0,
            keyStop: 0,
            requestPolicy: "all_nodes",
            responsePolicy: "special",
            step: 0
          },
          history: {
            arity: 3,
            flags: [
              "admin",
              "noscript",
              "loading",
              "stale"
            ],
            keyStart: 0,
            keyStop: 0,
            requestPolicy: "all_nodes",
            responsePolicy: "special",
            step: 0
          },
          latest: {
            arity: 2,
            flags: [
              "admin",
              "noscript",
              "loading",
              "stale"
            ],
            keyStart: 0,
            keyStop: 0,
            requestPolicy: "all_nodes",
            responsePolicy: "special",
            step: 0
          },
          reset: {
            arity: -2,
            flags: [
              "admin",
              "noscript",
              "loading",
              "stale"
            ],
            keyStart: 0,
            keyStop: 0,
            requestPolicy: "all_nodes",
            responsePolicy: "agg_sum",
            step: 0
          }
        }
      },
      lcs: {
        arity: -3,
        flags: [
          "readonly"
        ],
        keyStart: 1,
        keyStop: 2,
        step: 1
      },
      lindex: {
        arity: 3,
        flags: [
          "readonly"
        ],
        keyStart: 1,
        keyStop: 1,
        step: 1
      },
      linsert: {
        arity: 5,
        flags: [
          "write",
          "denyoom"
        ],
        keyStart: 1,
        keyStop: 1,
        step: 1
      },
      llen: {
        arity: 2,
        flags: [
          "readonly",
          "fast"
        ],
        keyStart: 1,
        keyStop: 1,
        step: 1
      },
      lmove: {
        arity: 5,
        flags: [
          "write",
          "denyoom"
        ],
        keyStart: 1,
        keyStop: 2,
        step: 1
      },
      lmovem: {
        arity: -5,
        flags: [
          "write",
          "denyoom"
        ],
        keyStart: 1,
        keyStop: 2,
        step: 1
      },
      lmpop: {
        arity: -4,
        flags: [
          "write",
          "movablekeys"
        ],
        keyStart: 0,
        keyStop: 0,
        step: 0
      },
      lolwut: {
        arity: -1,
        flags: [
          "readonly",
          "fast"
        ],
        keyStart: 0,
        keyStop: 0,
        step: 0
      },
      lpop: {
        arity: -2,
        flags: [
          "write",
          "fast"
        ],
        keyStart: 1,
        keyStop: 1,
        step: 1
      },
      lpos: {
        arity: -3,
        flags: [
          "readonly"
        ],
        keyStart: 1,
        keyStop: 1,
        step: 1
      },
      lpush: {
        arity: -3,
        flags: [
          "write",
          "denyoom",
          "fast"
        ],
        keyStart: 1,
        keyStop: 1,
        step: 1
      },
      lpushx: {
        arity: -3,
        flags: [
          "write",
          "denyoom",
          "fast"
        ],
        keyStart: 1,
        keyStop: 1,
        step: 1
      },
      lrange: {
        arity: 4,
        flags: [
          "readonly"
        ],
        keyStart: 1,
        keyStop: 1,
        step: 1
      },
      lrem: {
        arity: 4,
        flags: [
          "write"
        ],
        keyStart: 1,
        keyStop: 1,
        step: 1
      },
      lset: {
        arity: 4,
        flags: [
          "write",
          "denyoom"
        ],
        keyStart: 1,
        keyStop: 1,
        step: 1
      },
      ltrim: {
        arity: 4,
        flags: [
          "write"
        ],
        keyStart: 1,
        keyStop: 1,
        step: 1
      },
      memory: {
        arity: -2,
        flags: [],
        keyStart: 0,
        keyStop: 0,
        step: 0,
        subcommands: {
          doctor: {
            arity: 2,
            flags: [],
            keyStart: 0,
            keyStop: 0,
            requestPolicy: "all_shards",
            responsePolicy: "special",
            step: 0
          },
          help: {
            arity: 2,
            flags: [
              "loading",
              "stale"
            ],
            keyStart: 0,
            keyStop: 0,
            step: 0
          },
          "malloc-stats": {
            arity: 2,
            flags: [],
            keyStart: 0,
            keyStop: 0,
            requestPolicy: "all_shards",
            responsePolicy: "special",
            step: 0
          },
          purge: {
            arity: 2,
            flags: [],
            keyStart: 0,
            keyStop: 0,
            requestPolicy: "all_shards",
            responsePolicy: "all_succeeded",
            step: 0
          },
          stats: {
            arity: 2,
            flags: [],
            keyStart: 0,
            keyStop: 0,
            requestPolicy: "all_shards",
            responsePolicy: "special",
            step: 0
          },
          usage: {
            arity: -3,
            flags: [
              "readonly"
            ],
            keyStart: 2,
            keyStop: 2,
            step: 1
          }
        }
      },
      mget: {
        arity: -2,
        flags: [
          "readonly",
          "fast"
        ],
        keyStart: 1,
        keyStop: -1,
        requestPolicy: "multi_shard",
        step: 1
      },
      migrate: {
        arity: -6,
        flags: [
          "write",
          "movablekeys"
        ],
        keyStart: 3,
        keyStop: 3,
        step: 1
      },
      module: {
        arity: -2,
        flags: [],
        keyStart: 0,
        keyStop: 0,
        step: 0,
        subcommands: {
          help: {
            arity: 2,
            flags: [
              "loading",
              "stale"
            ],
            keyStart: 0,
            keyStop: 0,
            step: 0
          },
          list: {
            arity: 2,
            flags: [
              "admin",
              "noscript"
            ],
            keyStart: 0,
            keyStop: 0,
            step: 0
          },
          load: {
            arity: -3,
            flags: [
              "admin",
              "noscript",
              "no_async_loading"
            ],
            keyStart: 0,
            keyStop: 0,
            step: 0
          },
          loadex: {
            arity: -3,
            flags: [
              "admin",
              "noscript",
              "no_async_loading"
            ],
            keyStart: 0,
            keyStop: 0,
            step: 0
          },
          unload: {
            arity: 3,
            flags: [
              "admin",
              "noscript",
              "no_async_loading"
            ],
            keyStart: 0,
            keyStop: 0,
            step: 0
          }
        }
      },
      monitor: {
        arity: 1,
        flags: [
          "admin",
          "noscript",
          "loading",
          "stale"
        ],
        keyStart: 0,
        keyStop: 0,
        step: 0
      },
      move: {
        arity: 3,
        flags: [
          "write",
          "fast"
        ],
        keyStart: 1,
        keyStop: 1,
        step: 1
      },
      mset: {
        arity: -3,
        flags: [
          "write",
          "denyoom"
        ],
        keyStart: 1,
        keyStop: -1,
        requestPolicy: "multi_shard",
        responsePolicy: "all_succeeded",
        step: 2
      },
      msetex: {
        arity: -4,
        flags: [
          "write",
          "denyoom",
          "movablekeys"
        ],
        keyStart: 0,
        keyStop: 0,
        requestPolicy: "multi_shard",
        responsePolicy: "all_succeeded",
        step: 0
      },
      msetnx: {
        arity: -3,
        flags: [
          "write",
          "denyoom"
        ],
        keyStart: 1,
        keyStop: -1,
        step: 2
      },
      multi: {
        arity: 1,
        flags: [
          "noscript",
          "loading",
          "stale",
          "fast",
          "allow_busy"
        ],
        keyStart: 0,
        keyStop: 0,
        step: 0
      },
      object: {
        arity: -2,
        flags: [],
        keyStart: 0,
        keyStop: 0,
        step: 0,
        subcommands: {
          encoding: {
            arity: 3,
            flags: [
              "readonly"
            ],
            keyStart: 2,
            keyStop: 2,
            step: 1
          },
          freq: {
            arity: 3,
            flags: [
              "readonly"
            ],
            keyStart: 2,
            keyStop: 2,
            step: 1
          },
          help: {
            arity: 2,
            flags: [
              "loading",
              "stale"
            ],
            keyStart: 0,
            keyStop: 0,
            step: 0
          },
          idletime: {
            arity: 3,
            flags: [
              "readonly"
            ],
            keyStart: 2,
            keyStop: 2,
            step: 1
          },
          refcount: {
            arity: 3,
            flags: [
              "readonly"
            ],
            keyStart: 2,
            keyStop: 2,
            step: 1
          }
        }
      },
      persist: {
        arity: 2,
        flags: [
          "write",
          "fast"
        ],
        keyStart: 1,
        keyStop: 1,
        step: 1
      },
      pexpire: {
        arity: -3,
        flags: [
          "write",
          "fast"
        ],
        keyStart: 1,
        keyStop: 1,
        step: 1
      },
      pexpireat: {
        arity: -3,
        flags: [
          "write",
          "fast"
        ],
        keyStart: 1,
        keyStop: 1,
        step: 1
      },
      pexpiretime: {
        arity: 2,
        flags: [
          "readonly",
          "fast"
        ],
        keyStart: 1,
        keyStop: 1,
        step: 1
      },
      pfadd: {
        arity: -2,
        flags: [
          "write",
          "denyoom",
          "fast"
        ],
        keyStart: 1,
        keyStop: 1,
        step: 1
      },
      pfcount: {
        arity: -2,
        flags: [
          "readonly"
        ],
        keyStart: 1,
        keyStop: -1,
        step: 1
      },
      pfdebug: {
        arity: 3,
        flags: [
          "write",
          "denyoom",
          "admin"
        ],
        keyStart: 2,
        keyStop: 2,
        step: 1
      },
      pfmerge: {
        arity: -2,
        flags: [
          "write",
          "denyoom"
        ],
        keyStart: 1,
        keyStop: -1,
        step: 1
      },
      pfselftest: {
        arity: 1,
        flags: [
          "admin"
        ],
        keyStart: 0,
        keyStop: 0,
        step: 0
      },
      ping: {
        arity: -1,
        flags: [
          "fast"
        ],
        keyStart: 0,
        keyStop: 0,
        requestPolicy: "all_shards",
        responsePolicy: "all_succeeded",
        step: 0
      },
      psetex: {
        arity: 4,
        flags: [
          "write",
          "denyoom"
        ],
        keyStart: 1,
        keyStop: 1,
        step: 1
      },
      psubscribe: {
        arity: -2,
        flags: [
          "denyoom",
          "pubsub",
          "noscript",
          "loading",
          "stale"
        ],
        keyStart: 0,
        keyStop: 0,
        step: 0
      },
      psync: {
        arity: -3,
        flags: [
          "admin",
          "noscript",
          "no_async_loading",
          "no_multi"
        ],
        keyStart: 0,
        keyStop: 0,
        step: 0
      },
      pttl: {
        arity: 2,
        flags: [
          "readonly",
          "fast"
        ],
        keyStart: 1,
        keyStop: 1,
        step: 1
      },
      publish: {
        arity: 3,
        flags: [
          "pubsub",
          "loading",
          "stale",
          "fast"
        ],
        keyStart: 0,
        keyStop: 0,
        step: 0
      },
      pubsub: {
        arity: -2,
        flags: [],
        keyStart: 0,
        keyStop: 0,
        step: 0,
        subcommands: {
          channels: {
            arity: -2,
            flags: [
              "pubsub",
              "loading",
              "stale"
            ],
            keyStart: 0,
            keyStop: 0,
            step: 0
          },
          help: {
            arity: 2,
            flags: [
              "loading",
              "stale"
            ],
            keyStart: 0,
            keyStop: 0,
            step: 0
          },
          numpat: {
            arity: 2,
            flags: [
              "pubsub",
              "loading",
              "stale"
            ],
            keyStart: 0,
            keyStop: 0,
            step: 0
          },
          numsub: {
            arity: -2,
            flags: [
              "pubsub",
              "loading",
              "stale"
            ],
            keyStart: 0,
            keyStop: 0,
            step: 0
          },
          shardchannels: {
            arity: -2,
            flags: [
              "pubsub",
              "loading",
              "stale"
            ],
            keyStart: 0,
            keyStop: 0,
            step: 0
          },
          shardnumsub: {
            arity: -2,
            flags: [
              "pubsub",
              "loading",
              "stale"
            ],
            keyStart: 0,
            keyStop: 0,
            step: 0
          }
        }
      },
      punsubscribe: {
        arity: -1,
        flags: [
          "pubsub",
          "noscript",
          "loading",
          "stale"
        ],
        keyStart: 0,
        keyStop: 0,
        step: 0
      },
      quit: {
        arity: -1,
        flags: [
          "noscript",
          "loading",
          "stale",
          "fast",
          "no_auth",
          "allow_busy"
        ],
        keyStart: 0,
        keyStop: 0,
        step: 0
      },
      randomkey: {
        arity: 1,
        flags: [
          "readonly"
        ],
        keyStart: 0,
        keyStop: 0,
        requestPolicy: "all_shards",
        responsePolicy: "special",
        step: 0
      },
      readonly: {
        arity: 1,
        flags: [
          "loading",
          "stale",
          "fast"
        ],
        keyStart: 0,
        keyStop: 0,
        step: 0
      },
      readwrite: {
        arity: 1,
        flags: [
          "loading",
          "stale",
          "fast"
        ],
        keyStart: 0,
        keyStop: 0,
        step: 0
      },
      rename: {
        arity: 3,
        flags: [
          "write"
        ],
        keyStart: 1,
        keyStop: 2,
        step: 1
      },
      renamenx: {
        arity: 3,
        flags: [
          "write",
          "fast"
        ],
        keyStart: 1,
        keyStop: 2,
        step: 1
      },
      replconf: {
        arity: -1,
        flags: [
          "admin",
          "noscript",
          "loading",
          "stale",
          "allow_busy"
        ],
        keyStart: 0,
        keyStop: 0,
        step: 0
      },
      replicaof: {
        arity: 3,
        flags: [
          "admin",
          "noscript",
          "stale",
          "no_async_loading"
        ],
        keyStart: 0,
        keyStop: 0,
        step: 0
      },
      reset: {
        arity: 1,
        flags: [
          "noscript",
          "loading",
          "stale",
          "fast",
          "no_auth",
          "allow_busy"
        ],
        keyStart: 0,
        keyStop: 0,
        step: 0
      },
      restore: {
        arity: -4,
        flags: [
          "write",
          "denyoom"
        ],
        keyStart: 1,
        keyStop: 1,
        step: 1
      },
      "restore-asking": {
        arity: -4,
        flags: [
          "write",
          "denyoom",
          "asking"
        ],
        keyStart: 1,
        keyStop: 1,
        step: 1
      },
      role: {
        arity: 1,
        flags: [
          "noscript",
          "loading",
          "stale",
          "fast"
        ],
        keyStart: 0,
        keyStop: 0,
        step: 0
      },
      rpop: {
        arity: -2,
        flags: [
          "write",
          "fast"
        ],
        keyStart: 1,
        keyStop: 1,
        step: 1
      },
      rpoplpush: {
        arity: 3,
        flags: [
          "write",
          "denyoom"
        ],
        keyStart: 1,
        keyStop: 2,
        step: 1
      },
      rpush: {
        arity: -3,
        flags: [
          "write",
          "denyoom",
          "fast"
        ],
        keyStart: 1,
        keyStop: 1,
        step: 1
      },
      rpushx: {
        arity: -3,
        flags: [
          "write",
          "denyoom",
          "fast"
        ],
        keyStart: 1,
        keyStop: 1,
        step: 1
      },
      sadd: {
        arity: -3,
        flags: [
          "write",
          "denyoom",
          "fast"
        ],
        keyStart: 1,
        keyStop: 1,
        step: 1
      },
      save: {
        arity: 1,
        flags: [
          "admin",
          "noscript",
          "no_async_loading",
          "no_multi"
        ],
        keyStart: 0,
        keyStop: 0,
        step: 0
      },
      scan: {
        arity: -2,
        flags: [
          "readonly"
        ],
        keyStart: 0,
        keyStop: 0,
        requestPolicy: "special",
        responsePolicy: "special",
        step: 0
      },
      scard: {
        arity: 2,
        flags: [
          "readonly",
          "fast"
        ],
        keyStart: 1,
        keyStop: 1,
        step: 1
      },
      script: {
        arity: -2,
        flags: [],
        keyStart: 0,
        keyStop: 0,
        step: 0,
        subcommands: {
          debug: {
            arity: 3,
            flags: [
              "noscript"
            ],
            keyStart: 0,
            keyStop: 0,
            step: 0
          },
          exists: {
            arity: -3,
            flags: [
              "noscript"
            ],
            keyStart: 0,
            keyStop: 0,
            requestPolicy: "all_shards",
            responsePolicy: "agg_logical_and",
            step: 0
          },
          flush: {
            arity: -2,
            flags: [
              "noscript"
            ],
            keyStart: 0,
            keyStop: 0,
            requestPolicy: "all_nodes",
            responsePolicy: "all_succeeded",
            step: 0
          },
          help: {
            arity: 2,
            flags: [
              "loading",
              "stale"
            ],
            keyStart: 0,
            keyStop: 0,
            step: 0
          },
          kill: {
            arity: 2,
            flags: [
              "noscript",
              "allow_busy"
            ],
            keyStart: 0,
            keyStop: 0,
            requestPolicy: "all_shards",
            responsePolicy: "one_succeeded",
            step: 0
          },
          load: {
            arity: 3,
            flags: [
              "noscript",
              "stale"
            ],
            keyStart: 0,
            keyStop: 0,
            requestPolicy: "all_nodes",
            responsePolicy: "all_succeeded",
            step: 0
          }
        }
      },
      sdiff: {
        arity: -2,
        flags: [
          "readonly"
        ],
        keyStart: 1,
        keyStop: -1,
        step: 1
      },
      sdiffcard: {
        arity: -3,
        flags: [
          "readonly",
          "movablekeys"
        ],
        keyStart: 0,
        keyStop: 0,
        step: 0
      },
      sdiffstore: {
        arity: -3,
        flags: [
          "write",
          "denyoom"
        ],
        keyStart: 1,
        keyStop: -1,
        step: 1
      },
      select: {
        arity: 2,
        flags: [
          "loading",
          "stale",
          "fast"
        ],
        keyStart: 0,
        keyStop: 0,
        step: 0
      },
      set: {
        arity: -3,
        flags: [
          "write",
          "denyoom"
        ],
        keyStart: 1,
        keyStop: 1,
        step: 1
      },
      setbit: {
        arity: 4,
        flags: [
          "write",
          "denyoom"
        ],
        keyStart: 1,
        keyStop: 1,
        step: 1
      },
      setex: {
        arity: 4,
        flags: [
          "write",
          "denyoom"
        ],
        keyStart: 1,
        keyStop: 1,
        step: 1
      },
      setnx: {
        arity: 3,
        flags: [
          "write",
          "denyoom",
          "fast"
        ],
        keyStart: 1,
        keyStop: 1,
        step: 1
      },
      setrange: {
        arity: 4,
        flags: [
          "write",
          "denyoom"
        ],
        keyStart: 1,
        keyStop: 1,
        step: 1
      },
      shutdown: {
        arity: -1,
        flags: [
          "admin",
          "noscript",
          "loading",
          "stale",
          "no_multi",
          "allow_busy"
        ],
        keyStart: 0,
        keyStop: 0,
        step: 0
      },
      sinter: {
        arity: -2,
        flags: [
          "readonly"
        ],
        keyStart: 1,
        keyStop: -1,
        step: 1
      },
      sintercard: {
        arity: -3,
        flags: [
          "readonly",
          "movablekeys"
        ],
        keyStart: 0,
        keyStop: 0,
        step: 0
      },
      sinterstore: {
        arity: -3,
        flags: [
          "write",
          "denyoom"
        ],
        keyStart: 1,
        keyStop: -1,
        step: 1
      },
      sismember: {
        arity: 3,
        flags: [
          "readonly",
          "fast"
        ],
        keyStart: 1,
        keyStop: 1,
        step: 1
      },
      slaveof: {
        arity: 3,
        flags: [
          "admin",
          "noscript",
          "stale",
          "no_async_loading"
        ],
        keyStart: 0,
        keyStop: 0,
        step: 0
      },
      slowlog: {
        arity: -2,
        flags: [],
        keyStart: 0,
        keyStop: 0,
        step: 0,
        subcommands: {
          get: {
            arity: -2,
            flags: [
              "admin",
              "loading",
              "stale"
            ],
            keyStart: 0,
            keyStop: 0,
            requestPolicy: "all_nodes",
            step: 0
          },
          help: {
            arity: 2,
            flags: [
              "loading",
              "stale"
            ],
            keyStart: 0,
            keyStop: 0,
            step: 0
          },
          len: {
            arity: 2,
            flags: [
              "admin",
              "loading",
              "stale"
            ],
            keyStart: 0,
            keyStop: 0,
            requestPolicy: "all_nodes",
            responsePolicy: "agg_sum",
            step: 0
          },
          reset: {
            arity: 2,
            flags: [
              "admin",
              "loading",
              "stale"
            ],
            keyStart: 0,
            keyStop: 0,
            requestPolicy: "all_nodes",
            responsePolicy: "all_succeeded",
            step: 0
          }
        }
      },
      smembers: {
        arity: 2,
        flags: [
          "readonly"
        ],
        keyStart: 1,
        keyStop: 1,
        step: 1
      },
      smismember: {
        arity: -3,
        flags: [
          "readonly",
          "fast"
        ],
        keyStart: 1,
        keyStop: 1,
        step: 1
      },
      smove: {
        arity: 4,
        flags: [
          "write",
          "fast"
        ],
        keyStart: 1,
        keyStop: 2,
        step: 1
      },
      sort: {
        arity: -2,
        flags: [
          "write",
          "denyoom",
          "movablekeys"
        ],
        keyStart: 1,
        keyStop: 1,
        step: 1
      },
      sort_ro: {
        arity: -2,
        flags: [
          "readonly",
          "movablekeys"
        ],
        keyStart: 1,
        keyStop: 1,
        step: 1
      },
      spop: {
        arity: -2,
        flags: [
          "write",
          "fast"
        ],
        keyStart: 1,
        keyStop: 1,
        step: 1
      },
      spublish: {
        arity: 3,
        flags: [
          "pubsub",
          "loading",
          "stale",
          "fast"
        ],
        keyStart: 1,
        keyStop: 1,
        step: 1
      },
      srandmember: {
        arity: -2,
        flags: [
          "readonly"
        ],
        keyStart: 1,
        keyStop: 1,
        step: 1
      },
      srem: {
        arity: -3,
        flags: [
          "write",
          "fast"
        ],
        keyStart: 1,
        keyStop: 1,
        step: 1
      },
      sscan: {
        arity: -3,
        flags: [
          "readonly"
        ],
        keyStart: 1,
        keyStop: 1,
        step: 1
      },
      ssubscribe: {
        arity: -2,
        flags: [
          "denyoom",
          "pubsub",
          "noscript",
          "loading",
          "stale"
        ],
        keyStart: 1,
        keyStop: -1,
        step: 1
      },
      strlen: {
        arity: 2,
        flags: [
          "readonly",
          "fast"
        ],
        keyStart: 1,
        keyStop: 1,
        step: 1
      },
      subscribe: {
        arity: -2,
        flags: [
          "denyoom",
          "pubsub",
          "noscript",
          "loading",
          "stale"
        ],
        keyStart: 0,
        keyStop: 0,
        step: 0
      },
      substr: {
        arity: 4,
        flags: [
          "readonly"
        ],
        keyStart: 1,
        keyStop: 1,
        step: 1
      },
      sunion: {
        arity: -2,
        flags: [
          "readonly"
        ],
        keyStart: 1,
        keyStop: -1,
        step: 1
      },
      sunioncard: {
        arity: -3,
        flags: [
          "readonly",
          "movablekeys"
        ],
        keyStart: 0,
        keyStop: 0,
        step: 0
      },
      sunionstore: {
        arity: -3,
        flags: [
          "write",
          "denyoom"
        ],
        keyStart: 1,
        keyStop: -1,
        step: 1
      },
      sunsubscribe: {
        arity: -1,
        flags: [
          "pubsub",
          "noscript",
          "loading",
          "stale"
        ],
        keyStart: 1,
        keyStop: -1,
        step: 1
      },
      swapdb: {
        arity: 3,
        flags: [
          "write",
          "fast"
        ],
        keyStart: 0,
        keyStop: 0,
        step: 0
      },
      sync: {
        arity: 1,
        flags: [
          "admin",
          "noscript",
          "no_async_loading",
          "no_multi"
        ],
        keyStart: 0,
        keyStop: 0,
        step: 0
      },
      time: {
        arity: 1,
        flags: [
          "loading",
          "stale",
          "fast"
        ],
        keyStart: 0,
        keyStop: 0,
        step: 0
      },
      touch: {
        arity: -2,
        flags: [
          "readonly",
          "fast"
        ],
        keyStart: 1,
        keyStop: -1,
        requestPolicy: "multi_shard",
        responsePolicy: "agg_sum",
        step: 1
      },
      trimslots: {
        arity: -5,
        flags: [
          "write"
        ],
        keyStart: 0,
        keyStop: 0,
        step: 0
      },
      ttl: {
        arity: 2,
        flags: [
          "readonly",
          "fast"
        ],
        keyStart: 1,
        keyStop: 1,
        step: 1
      },
      type: {
        arity: 2,
        flags: [
          "readonly",
          "fast"
        ],
        keyStart: 1,
        keyStop: 1,
        step: 1
      },
      unlink: {
        arity: -2,
        flags: [
          "write",
          "fast"
        ],
        keyStart: 1,
        keyStop: -1,
        requestPolicy: "multi_shard",
        responsePolicy: "agg_sum",
        step: 1
      },
      unsubscribe: {
        arity: -1,
        flags: [
          "pubsub",
          "noscript",
          "loading",
          "stale"
        ],
        keyStart: 0,
        keyStop: 0,
        step: 0
      },
      unwatch: {
        arity: 1,
        flags: [
          "noscript",
          "loading",
          "stale",
          "fast",
          "allow_busy"
        ],
        keyStart: 0,
        keyStop: 0,
        step: 0
      },
      vadd: {
        arity: -5,
        flags: [
          "write",
          "denyoom",
          "module"
        ],
        keyStart: 1,
        keyStop: 1,
        step: 1
      },
      vcard: {
        arity: 2,
        flags: [
          "readonly",
          "module",
          "fast"
        ],
        keyStart: 1,
        keyStop: 1,
        step: 1
      },
      vdim: {
        arity: 2,
        flags: [
          "readonly",
          "module",
          "fast"
        ],
        keyStart: 1,
        keyStop: 1,
        step: 1
      },
      vemb: {
        arity: -3,
        flags: [
          "readonly",
          "module",
          "fast"
        ],
        keyStart: 1,
        keyStop: 1,
        step: 1
      },
      vgetattr: {
        arity: 3,
        flags: [
          "readonly",
          "module",
          "fast"
        ],
        keyStart: 1,
        keyStop: 1,
        step: 1
      },
      vinfo: {
        arity: 2,
        flags: [
          "readonly",
          "module",
          "fast"
        ],
        keyStart: 1,
        keyStop: 1,
        step: 1
      },
      vismember: {
        arity: 3,
        flags: [
          "readonly",
          "module"
        ],
        keyStart: 1,
        keyStop: 1,
        step: 1
      },
      vlinks: {
        arity: -3,
        flags: [
          "readonly",
          "module",
          "fast"
        ],
        keyStart: 1,
        keyStop: 1,
        step: 1
      },
      vrandmember: {
        arity: -2,
        flags: [
          "readonly",
          "module"
        ],
        keyStart: 1,
        keyStop: 1,
        step: 1
      },
      vrange: {
        arity: -4,
        flags: [
          "readonly",
          "module"
        ],
        keyStart: 1,
        keyStop: 1,
        step: 1
      },
      vrem: {
        arity: 3,
        flags: [
          "write",
          "module"
        ],
        keyStart: 1,
        keyStop: 1,
        step: 1
      },
      vsetattr: {
        arity: 4,
        flags: [
          "write",
          "module",
          "fast"
        ],
        keyStart: 1,
        keyStop: 1,
        step: 1
      },
      vsim: {
        arity: -4,
        flags: [
          "readonly",
          "module"
        ],
        keyStart: 1,
        keyStop: 1,
        step: 1
      },
      wait: {
        arity: 3,
        flags: [
          "blocking"
        ],
        keyStart: 0,
        keyStop: 0,
        requestPolicy: "all_shards",
        responsePolicy: "agg_min",
        step: 0
      },
      waitaof: {
        arity: 4,
        flags: [
          "blocking"
        ],
        keyStart: 0,
        keyStop: 0,
        requestPolicy: "all_shards",
        responsePolicy: "agg_min",
        step: 0
      },
      watch: {
        arity: -2,
        flags: [
          "noscript",
          "loading",
          "stale",
          "fast",
          "allow_busy"
        ],
        keyStart: 1,
        keyStop: -1,
        step: 1
      },
      xack: {
        arity: -4,
        flags: [
          "write",
          "fast"
        ],
        keyStart: 1,
        keyStop: 1,
        step: 1
      },
      xackdel: {
        arity: -6,
        flags: [
          "write",
          "fast"
        ],
        keyStart: 1,
        keyStop: 1,
        step: 1
      },
      xadd: {
        arity: -5,
        flags: [
          "write",
          "denyoom",
          "fast"
        ],
        keyStart: 1,
        keyStop: 1,
        step: 1
      },
      xautoclaim: {
        arity: -6,
        flags: [
          "write",
          "fast"
        ],
        keyStart: 1,
        keyStop: 1,
        step: 1
      },
      xcfgset: {
        arity: -2,
        flags: [
          "write",
          "fast"
        ],
        keyStart: 1,
        keyStop: 1,
        step: 1
      },
      xclaim: {
        arity: -6,
        flags: [
          "write",
          "fast"
        ],
        keyStart: 1,
        keyStop: 1,
        step: 1
      },
      xdel: {
        arity: -3,
        flags: [
          "write",
          "fast"
        ],
        keyStart: 1,
        keyStop: 1,
        step: 1
      },
      xdelex: {
        arity: -5,
        flags: [
          "write",
          "fast"
        ],
        keyStart: 1,
        keyStop: 1,
        step: 1
      },
      xgroup: {
        arity: -2,
        flags: [],
        keyStart: 0,
        keyStop: 0,
        step: 0,
        subcommands: {
          create: {
            arity: -5,
            flags: [
              "write",
              "denyoom"
            ],
            keyStart: 2,
            keyStop: 2,
            step: 1
          },
          createconsumer: {
            arity: 5,
            flags: [
              "write",
              "denyoom"
            ],
            keyStart: 2,
            keyStop: 2,
            step: 1
          },
          delconsumer: {
            arity: 5,
            flags: [
              "write"
            ],
            keyStart: 2,
            keyStop: 2,
            step: 1
          },
          destroy: {
            arity: 4,
            flags: [
              "write"
            ],
            keyStart: 2,
            keyStop: 2,
            step: 1
          },
          help: {
            arity: 2,
            flags: [
              "loading",
              "stale"
            ],
            keyStart: 0,
            keyStop: 0,
            step: 0
          },
          setid: {
            arity: -5,
            flags: [
              "write"
            ],
            keyStart: 2,
            keyStop: 2,
            step: 1
          }
        }
      },
      xidmprecord: {
        arity: 5,
        flags: [
          "write",
          "denyoom",
          "fast"
        ],
        keyStart: 1,
        keyStop: 1,
        step: 1
      },
      xinfo: {
        arity: -2,
        flags: [],
        keyStart: 0,
        keyStop: 0,
        step: 0,
        subcommands: {
          consumers: {
            arity: 4,
            flags: [
              "readonly"
            ],
            keyStart: 2,
            keyStop: 2,
            step: 1
          },
          groups: {
            arity: 3,
            flags: [
              "readonly"
            ],
            keyStart: 2,
            keyStop: 2,
            step: 1
          },
          help: {
            arity: 2,
            flags: [
              "loading",
              "stale"
            ],
            keyStart: 0,
            keyStop: 0,
            step: 0
          },
          stream: {
            arity: -3,
            flags: [
              "readonly"
            ],
            keyStart: 2,
            keyStop: 2,
            step: 1
          }
        }
      },
      xlen: {
        arity: 2,
        flags: [
          "readonly",
          "fast"
        ],
        keyStart: 1,
        keyStop: 1,
        step: 1
      },
      xnack: {
        arity: -7,
        flags: [
          "write",
          "fast"
        ],
        keyStart: 1,
        keyStop: 1,
        step: 1
      },
      xpending: {
        arity: -3,
        flags: [
          "readonly"
        ],
        keyStart: 1,
        keyStop: 1,
        step: 1
      },
      xrange: {
        arity: -4,
        flags: [
          "readonly"
        ],
        keyStart: 1,
        keyStop: 1,
        step: 1
      },
      xread: {
        arity: -4,
        flags: [
          "readonly",
          "blocking",
          "movablekeys"
        ],
        keyStart: 0,
        keyStop: 0,
        step: 0
      },
      xreadgroup: {
        arity: -7,
        flags: [
          "write",
          "blocking",
          "movablekeys"
        ],
        keyStart: 0,
        keyStop: 0,
        step: 0
      },
      xrevrange: {
        arity: -4,
        flags: [
          "readonly"
        ],
        keyStart: 1,
        keyStop: 1,
        step: 1
      },
      xsetid: {
        arity: -3,
        flags: [
          "write",
          "denyoom",
          "fast"
        ],
        keyStart: 1,
        keyStop: 1,
        step: 1
      },
      xtrim: {
        arity: -4,
        flags: [
          "write"
        ],
        keyStart: 1,
        keyStop: 1,
        step: 1
      },
      zadd: {
        arity: -4,
        flags: [
          "write",
          "denyoom",
          "fast"
        ],
        keyStart: 1,
        keyStop: 1,
        step: 1
      },
      zcard: {
        arity: 2,
        flags: [
          "readonly",
          "fast"
        ],
        keyStart: 1,
        keyStop: 1,
        step: 1
      },
      zcount: {
        arity: 4,
        flags: [
          "readonly",
          "fast"
        ],
        keyStart: 1,
        keyStop: 1,
        step: 1
      },
      zdiff: {
        arity: -3,
        flags: [
          "readonly",
          "movablekeys"
        ],
        keyStart: 0,
        keyStop: 0,
        step: 0
      },
      zdiffstore: {
        arity: -4,
        flags: [
          "write",
          "denyoom",
          "movablekeys"
        ],
        keyStart: 1,
        keyStop: 1,
        step: 1
      },
      zincrby: {
        arity: 4,
        flags: [
          "write",
          "denyoom",
          "fast"
        ],
        keyStart: 1,
        keyStop: 1,
        step: 1
      },
      zinter: {
        arity: -3,
        flags: [
          "readonly",
          "movablekeys"
        ],
        keyStart: 0,
        keyStop: 0,
        step: 0
      },
      zintercard: {
        arity: -3,
        flags: [
          "readonly",
          "movablekeys"
        ],
        keyStart: 0,
        keyStop: 0,
        step: 0
      },
      zinterstore: {
        arity: -4,
        flags: [
          "write",
          "denyoom",
          "movablekeys"
        ],
        keyStart: 1,
        keyStop: 1,
        step: 1
      },
      zlexcount: {
        arity: 4,
        flags: [
          "readonly",
          "fast"
        ],
        keyStart: 1,
        keyStop: 1,
        step: 1
      },
      zmpop: {
        arity: -4,
        flags: [
          "write",
          "movablekeys"
        ],
        keyStart: 0,
        keyStop: 0,
        step: 0
      },
      zmscore: {
        arity: -3,
        flags: [
          "readonly",
          "fast"
        ],
        keyStart: 1,
        keyStop: 1,
        step: 1
      },
      zpopmax: {
        arity: -2,
        flags: [
          "write",
          "fast"
        ],
        keyStart: 1,
        keyStop: 1,
        step: 1
      },
      zpopmin: {
        arity: -2,
        flags: [
          "write",
          "fast"
        ],
        keyStart: 1,
        keyStop: 1,
        step: 1
      },
      zrandmember: {
        arity: -2,
        flags: [
          "readonly"
        ],
        keyStart: 1,
        keyStop: 1,
        step: 1
      },
      zrange: {
        arity: -4,
        flags: [
          "readonly"
        ],
        keyStart: 1,
        keyStop: 1,
        step: 1
      },
      zrangebylex: {
        arity: -4,
        flags: [
          "readonly"
        ],
        keyStart: 1,
        keyStop: 1,
        step: 1
      },
      zrangebyscore: {
        arity: -4,
        flags: [
          "readonly"
        ],
        keyStart: 1,
        keyStop: 1,
        step: 1
      },
      zrangestore: {
        arity: -5,
        flags: [
          "write",
          "denyoom"
        ],
        keyStart: 1,
        keyStop: 2,
        step: 1
      },
      zrank: {
        arity: -3,
        flags: [
          "readonly",
          "fast"
        ],
        keyStart: 1,
        keyStop: 1,
        step: 1
      },
      zrem: {
        arity: -3,
        flags: [
          "write",
          "fast"
        ],
        keyStart: 1,
        keyStop: 1,
        step: 1
      },
      zremrangebylex: {
        arity: 4,
        flags: [
          "write"
        ],
        keyStart: 1,
        keyStop: 1,
        step: 1
      },
      zremrangebyrank: {
        arity: 4,
        flags: [
          "write"
        ],
        keyStart: 1,
        keyStop: 1,
        step: 1
      },
      zremrangebyscore: {
        arity: 4,
        flags: [
          "write"
        ],
        keyStart: 1,
        keyStop: 1,
        step: 1
      },
      zrevrange: {
        arity: -4,
        flags: [
          "readonly"
        ],
        keyStart: 1,
        keyStop: 1,
        step: 1
      },
      zrevrangebylex: {
        arity: -4,
        flags: [
          "readonly"
        ],
        keyStart: 1,
        keyStop: 1,
        step: 1
      },
      zrevrangebyscore: {
        arity: -4,
        flags: [
          "readonly"
        ],
        keyStart: 1,
        keyStop: 1,
        step: 1
      },
      zrevrank: {
        arity: -3,
        flags: [
          "readonly",
          "fast"
        ],
        keyStart: 1,
        keyStop: 1,
        step: 1
      },
      zscan: {
        arity: -3,
        flags: [
          "readonly"
        ],
        keyStart: 1,
        keyStop: 1,
        step: 1
      },
      zscore: {
        arity: 3,
        flags: [
          "readonly",
          "fast"
        ],
        keyStart: 1,
        keyStop: 1,
        step: 1
      },
      zunion: {
        arity: -3,
        flags: [
          "readonly",
          "movablekeys"
        ],
        keyStart: 0,
        keyStop: 0,
        step: 0
      },
      zunionstore: {
        arity: -4,
        flags: [
          "write",
          "denyoom",
          "movablekeys"
        ],
        keyStart: 1,
        keyStop: 1,
        step: 1
      }
    };
  }
});

// node_modules/@ioredis/commands/built/index.js
var require_built = __commonJS({
  "node_modules/@ioredis/commands/built/index.js"(exports) {
    "use strict";
    var __importDefault = exports && exports.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.getKeyIndexes = exports.hasFlag = exports.exists = exports.list = void 0;
    var commands_json_1 = __importDefault(require_commands());
    var commandMetadata = commands_json_1.default;
    exports.list = Object.keys(commandMetadata);
    var flags = {};
    exports.list.forEach((commandName) => {
      flags[commandName] = commandMetadata[commandName].flags.reduce(function(flags2, flag) {
        flags2[flag] = true;
        return flags2;
      }, {});
    });
    function exists(commandName, options) {
      commandName = (options === null || options === void 0 ? void 0 : options.caseInsensitive) ? String(commandName).toLowerCase() : commandName;
      return Boolean(commandMetadata[commandName]);
    }
    exports.exists = exists;
    function hasFlag(commandName, flag, options) {
      commandName = (options === null || options === void 0 ? void 0 : options.nameCaseInsensitive) ? String(commandName).toLowerCase() : commandName;
      if (!flags[commandName]) {
        throw new Error("Unknown command " + commandName);
      }
      return Boolean(flags[commandName][flag]);
    }
    exports.hasFlag = hasFlag;
    function getKeyIndexes(commandName, args, options) {
      commandName = (options === null || options === void 0 ? void 0 : options.nameCaseInsensitive) ? String(commandName).toLowerCase() : commandName;
      const command = commandMetadata[commandName];
      if (!command) {
        throw new Error("Unknown command " + commandName);
      }
      if (!Array.isArray(args)) {
        throw new Error("Expect args to be an array");
      }
      let resolvedCommand = command;
      for (let i = 0; i < args.length && resolvedCommand.subcommands; i++) {
        const subcommand = resolvedCommand.subcommands[String(args[i]).toLowerCase()];
        if (!subcommand) {
          break;
        }
        resolvedCommand = subcommand;
      }
      const keys = [];
      const parseExternalKey = Boolean(options && options.parseExternalKey);
      const takeDynamicKeys = (args2, startIndex) => {
        const keys2 = [];
        const keyStop = Number(args2[startIndex]);
        for (let i = 0; i < keyStop; i++) {
          keys2.push(i + startIndex + 1);
        }
        return keys2;
      };
      const takeKeyAfterToken = (args2, startIndex, token) => {
        for (let i = startIndex; i < args2.length - 1; i += 1) {
          if (String(args2[i]).toLowerCase() === token.toLowerCase()) {
            return i + 1;
          }
        }
        return null;
      };
      switch (commandName) {
        case "zunionstore":
        case "zinterstore":
        case "zdiffstore":
          keys.push(0, ...takeDynamicKeys(args, 1));
          break;
        case "eval":
        case "evalsha":
        case "eval_ro":
        case "evalsha_ro":
        case "fcall":
        case "fcall_ro":
        case "blmpop":
        case "bzmpop":
          keys.push(...takeDynamicKeys(args, 1));
          break;
        case "sdiffcard":
        case "sintercard":
        case "sunioncard":
        case "lmpop":
        case "zunion":
        case "zinter":
        case "zmpop":
        case "zintercard":
        case "zdiff": {
          keys.push(...takeDynamicKeys(args, 0));
          break;
        }
        case "msetex": {
          const numKeys = Number(args[0]);
          for (let i = 0; i < numKeys; i++) {
            keys.push(1 + i * 2);
          }
          break;
        }
        case "georadius": {
          keys.push(0);
          const storeKey = takeKeyAfterToken(args, 5, "STORE");
          if (storeKey)
            keys.push(storeKey);
          const distKey = takeKeyAfterToken(args, 5, "STOREDIST");
          if (distKey)
            keys.push(distKey);
          break;
        }
        case "georadiusbymember": {
          keys.push(0);
          const storeKey = takeKeyAfterToken(args, 4, "STORE");
          if (storeKey)
            keys.push(storeKey);
          const distKey = takeKeyAfterToken(args, 4, "STOREDIST");
          if (distKey)
            keys.push(distKey);
          break;
        }
        case "sort":
        case "sort_ro":
          keys.push(0);
          for (let i = 1; i < args.length - 1; i++) {
            let arg = args[i];
            if (typeof arg !== "string") {
              continue;
            }
            const directive = arg.toUpperCase();
            if (directive === "GET") {
              i += 1;
              arg = args[i];
              if (arg !== "#") {
                if (parseExternalKey) {
                  keys.push([i, getExternalKeyNameLength(arg)]);
                } else {
                  keys.push(i);
                }
              }
            } else if (directive === "BY") {
              i += 1;
              if (parseExternalKey) {
                keys.push([i, getExternalKeyNameLength(args[i])]);
              } else {
                keys.push(i);
              }
            } else if (directive === "STORE") {
              i += 1;
              keys.push(i);
            }
          }
          break;
        case "migrate":
          if (args[2] === "") {
            for (let i = 5; i < args.length - 1; i++) {
              const arg = args[i];
              if (typeof arg === "string" && arg.toUpperCase() === "KEYS") {
                for (let j = i + 1; j < args.length; j++) {
                  keys.push(j);
                }
                break;
              }
            }
          } else {
            keys.push(2);
          }
          break;
        case "xreadgroup":
        case "xread":
          for (let i = commandName === "xread" ? 0 : 3; i < args.length - 1; i++) {
            if (String(args[i]).toUpperCase() === "STREAMS") {
              for (let j = i + 1; j <= i + (args.length - 1 - i) / 2; j++) {
                keys.push(j);
              }
              break;
            }
          }
          break;
        default:
          if (resolvedCommand.step > 0) {
            const keyStart = resolvedCommand.keyStart - 1;
            const keyStop = resolvedCommand.keyStop > 0 ? resolvedCommand.keyStop : args.length + resolvedCommand.keyStop + 1;
            for (let i = keyStart; i < keyStop; i += resolvedCommand.step) {
              keys.push(i);
            }
          }
          break;
      }
      return keys;
    }
    exports.getKeyIndexes = getKeyIndexes;
    function getExternalKeyNameLength(key) {
      if (typeof key !== "string") {
        key = String(key);
      }
      const hashPos = key.indexOf("->");
      return hashPos === -1 ? key.length : hashPos;
    }
  }
});

// node_modules/standard-as-callback/built/utils.js
var require_utils = __commonJS({
  "node_modules/standard-as-callback/built/utils.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.tryCatch = exports.errorObj = void 0;
    exports.errorObj = { e: {} };
    var tryCatchTarget;
    function tryCatcher(err, val) {
      try {
        const target = tryCatchTarget;
        tryCatchTarget = null;
        return target.apply(this, arguments);
      } catch (e) {
        exports.errorObj.e = e;
        return exports.errorObj;
      }
    }
    function tryCatch(fn) {
      tryCatchTarget = fn;
      return tryCatcher;
    }
    exports.tryCatch = tryCatch;
  }
});

// node_modules/standard-as-callback/built/index.js
var require_built2 = __commonJS({
  "node_modules/standard-as-callback/built/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var utils_1 = require_utils();
    function throwLater(e) {
      setTimeout(function() {
        throw e;
      }, 0);
    }
    function asCallback(promise, nodeback, options) {
      if (typeof nodeback === "function") {
        promise.then((val) => {
          let ret;
          if (options !== void 0 && Object(options).spread && Array.isArray(val)) {
            ret = utils_1.tryCatch(nodeback).apply(void 0, [null].concat(val));
          } else {
            ret = val === void 0 ? utils_1.tryCatch(nodeback)(null) : utils_1.tryCatch(nodeback)(null, val);
          }
          if (ret === utils_1.errorObj) {
            throwLater(ret.e);
          }
        }, (cause) => {
          if (!cause) {
            const newReason = new Error(cause + "");
            Object.assign(newReason, { cause });
            cause = newReason;
          }
          const ret = utils_1.tryCatch(nodeback)(cause);
          if (ret === utils_1.errorObj) {
            throwLater(ret.e);
          }
        });
      }
      return promise;
    }
    exports.default = asCallback;
  }
});

// node_modules/redis-errors/lib/old.js
var require_old = __commonJS({
  "node_modules/redis-errors/lib/old.js"(exports, module) {
    "use strict";
    var assert = __require("assert");
    var util = __require("util");
    function RedisError(message) {
      Object.defineProperty(this, "message", {
        value: message || "",
        configurable: true,
        writable: true
      });
      Error.captureStackTrace(this, this.constructor);
    }
    util.inherits(RedisError, Error);
    Object.defineProperty(RedisError.prototype, "name", {
      value: "RedisError",
      configurable: true,
      writable: true
    });
    function ParserError(message, buffer, offset) {
      assert(buffer);
      assert.strictEqual(typeof offset, "number");
      Object.defineProperty(this, "message", {
        value: message || "",
        configurable: true,
        writable: true
      });
      const tmp = Error.stackTraceLimit;
      Error.stackTraceLimit = 2;
      Error.captureStackTrace(this, this.constructor);
      Error.stackTraceLimit = tmp;
      this.offset = offset;
      this.buffer = buffer;
    }
    util.inherits(ParserError, RedisError);
    Object.defineProperty(ParserError.prototype, "name", {
      value: "ParserError",
      configurable: true,
      writable: true
    });
    function ReplyError(message) {
      Object.defineProperty(this, "message", {
        value: message || "",
        configurable: true,
        writable: true
      });
      const tmp = Error.stackTraceLimit;
      Error.stackTraceLimit = 2;
      Error.captureStackTrace(this, this.constructor);
      Error.stackTraceLimit = tmp;
    }
    util.inherits(ReplyError, RedisError);
    Object.defineProperty(ReplyError.prototype, "name", {
      value: "ReplyError",
      configurable: true,
      writable: true
    });
    function AbortError(message) {
      Object.defineProperty(this, "message", {
        value: message || "",
        configurable: true,
        writable: true
      });
      Error.captureStackTrace(this, this.constructor);
    }
    util.inherits(AbortError, RedisError);
    Object.defineProperty(AbortError.prototype, "name", {
      value: "AbortError",
      configurable: true,
      writable: true
    });
    function InterruptError(message) {
      Object.defineProperty(this, "message", {
        value: message || "",
        configurable: true,
        writable: true
      });
      Error.captureStackTrace(this, this.constructor);
    }
    util.inherits(InterruptError, AbortError);
    Object.defineProperty(InterruptError.prototype, "name", {
      value: "InterruptError",
      configurable: true,
      writable: true
    });
    module.exports = {
      RedisError,
      ParserError,
      ReplyError,
      AbortError,
      InterruptError
    };
  }
});

// node_modules/redis-errors/lib/modern.js
var require_modern = __commonJS({
  "node_modules/redis-errors/lib/modern.js"(exports, module) {
    "use strict";
    var assert = __require("assert");
    var RedisError = class extends Error {
      get name() {
        return this.constructor.name;
      }
    };
    var ParserError = class extends RedisError {
      constructor(message, buffer, offset) {
        assert(buffer);
        assert.strictEqual(typeof offset, "number");
        const tmp = Error.stackTraceLimit;
        Error.stackTraceLimit = 2;
        super(message);
        Error.stackTraceLimit = tmp;
        this.offset = offset;
        this.buffer = buffer;
      }
      get name() {
        return this.constructor.name;
      }
    };
    var ReplyError = class extends RedisError {
      constructor(message) {
        const tmp = Error.stackTraceLimit;
        Error.stackTraceLimit = 2;
        super(message);
        Error.stackTraceLimit = tmp;
      }
      get name() {
        return this.constructor.name;
      }
    };
    var AbortError = class extends RedisError {
      get name() {
        return this.constructor.name;
      }
    };
    var InterruptError = class extends AbortError {
      get name() {
        return this.constructor.name;
      }
    };
    module.exports = {
      RedisError,
      ParserError,
      ReplyError,
      AbortError,
      InterruptError
    };
  }
});

// node_modules/redis-errors/index.js
var require_redis_errors = __commonJS({
  "node_modules/redis-errors/index.js"(exports, module) {
    "use strict";
    var Errors = process.version.charCodeAt(1) < 55 && process.version.charCodeAt(2) === 46 ? require_old() : require_modern();
    module.exports = Errors;
  }
});

// node_modules/cluster-key-slot/lib/index.js
var require_lib = __commonJS({
  "node_modules/cluster-key-slot/lib/index.js"(exports, module) {
    var lookup = [
      0,
      4129,
      8258,
      12387,
      16516,
      20645,
      24774,
      28903,
      33032,
      37161,
      41290,
      45419,
      49548,
      53677,
      57806,
      61935,
      4657,
      528,
      12915,
      8786,
      21173,
      17044,
      29431,
      25302,
      37689,
      33560,
      45947,
      41818,
      54205,
      50076,
      62463,
      58334,
      9314,
      13379,
      1056,
      5121,
      25830,
      29895,
      17572,
      21637,
      42346,
      46411,
      34088,
      38153,
      58862,
      62927,
      50604,
      54669,
      13907,
      9842,
      5649,
      1584,
      30423,
      26358,
      22165,
      18100,
      46939,
      42874,
      38681,
      34616,
      63455,
      59390,
      55197,
      51132,
      18628,
      22757,
      26758,
      30887,
      2112,
      6241,
      10242,
      14371,
      51660,
      55789,
      59790,
      63919,
      35144,
      39273,
      43274,
      47403,
      23285,
      19156,
      31415,
      27286,
      6769,
      2640,
      14899,
      10770,
      56317,
      52188,
      64447,
      60318,
      39801,
      35672,
      47931,
      43802,
      27814,
      31879,
      19684,
      23749,
      11298,
      15363,
      3168,
      7233,
      60846,
      64911,
      52716,
      56781,
      44330,
      48395,
      36200,
      40265,
      32407,
      28342,
      24277,
      20212,
      15891,
      11826,
      7761,
      3696,
      65439,
      61374,
      57309,
      53244,
      48923,
      44858,
      40793,
      36728,
      37256,
      33193,
      45514,
      41451,
      53516,
      49453,
      61774,
      57711,
      4224,
      161,
      12482,
      8419,
      20484,
      16421,
      28742,
      24679,
      33721,
      37784,
      41979,
      46042,
      49981,
      54044,
      58239,
      62302,
      689,
      4752,
      8947,
      13010,
      16949,
      21012,
      25207,
      29270,
      46570,
      42443,
      38312,
      34185,
      62830,
      58703,
      54572,
      50445,
      13538,
      9411,
      5280,
      1153,
      29798,
      25671,
      21540,
      17413,
      42971,
      47098,
      34713,
      38840,
      59231,
      63358,
      50973,
      55100,
      9939,
      14066,
      1681,
      5808,
      26199,
      30326,
      17941,
      22068,
      55628,
      51565,
      63758,
      59695,
      39368,
      35305,
      47498,
      43435,
      22596,
      18533,
      30726,
      26663,
      6336,
      2273,
      14466,
      10403,
      52093,
      56156,
      60223,
      64286,
      35833,
      39896,
      43963,
      48026,
      19061,
      23124,
      27191,
      31254,
      2801,
      6864,
      10931,
      14994,
      64814,
      60687,
      56684,
      52557,
      48554,
      44427,
      40424,
      36297,
      31782,
      27655,
      23652,
      19525,
      15522,
      11395,
      7392,
      3265,
      61215,
      65342,
      53085,
      57212,
      44955,
      49082,
      36825,
      40952,
      28183,
      32310,
      20053,
      24180,
      11923,
      16050,
      3793,
      7920
    ];
    var toUTF8Array = function toUTF8Array2(str) {
      var char;
      var i = 0;
      var p = 0;
      var utf8 = [];
      var len = str.length;
      for (; i < len; i++) {
        char = str.charCodeAt(i);
        if (char < 128) {
          utf8[p++] = char;
        } else if (char < 2048) {
          utf8[p++] = char >> 6 | 192;
          utf8[p++] = char & 63 | 128;
        } else if ((char & 64512) === 55296 && i + 1 < str.length && (str.charCodeAt(i + 1) & 64512) === 56320) {
          char = 65536 + ((char & 1023) << 10) + (str.charCodeAt(++i) & 1023);
          utf8[p++] = char >> 18 | 240;
          utf8[p++] = char >> 12 & 63 | 128;
          utf8[p++] = char >> 6 & 63 | 128;
          utf8[p++] = char & 63 | 128;
        } else {
          utf8[p++] = char >> 12 | 224;
          utf8[p++] = char >> 6 & 63 | 128;
          utf8[p++] = char & 63 | 128;
        }
      }
      return utf8;
    };
    var generate = module.exports = function generate2(str) {
      var char;
      var i = 0;
      var start = -1;
      var result = 0;
      var resultHash = 0;
      var utf8 = typeof str === "string" ? toUTF8Array(str) : str;
      var len = utf8.length;
      while (i < len) {
        char = utf8[i++];
        if (start === -1) {
          if (char === 123) {
            start = i;
          }
        } else if (char !== 125) {
          resultHash = lookup[(char ^ resultHash >> 8) & 255] ^ resultHash << 8;
        } else if (i - 1 !== start) {
          return resultHash & 16383;
        }
        result = lookup[(char ^ result >> 8) & 255] ^ result << 8;
      }
      return result & 16383;
    };
    module.exports.generateMulti = function generateMulti(keys) {
      var i = 1;
      var len = keys.length;
      var base = generate(keys[0]);
      while (i < len) {
        if (generate(keys[i++]) !== base) return -1;
      }
      return base;
    };
  }
});

// node_modules/ioredis/built/utils/defaults.js
var require_defaults = __commonJS({
  "node_modules/ioredis/built/utils/defaults.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.defaults = void 0;
    var IS_UNSIGNED_INTEGER = /^(?:0|[1-9]\d*)$/;
    function isNil(value) {
      return value == null;
    }
    function eq(value, other) {
      return value === other || Number.isNaN(value) && Number.isNaN(other);
    }
    function isLength(value) {
      return Number.isSafeInteger(value) && value >= 0;
    }
    function isArrayLike(value) {
      return value != null && typeof value !== "function" && isLength(value.length);
    }
    function isObject(value) {
      return value !== null && (typeof value === "object" || typeof value === "function");
    }
    function isIndex(value, length = Number.MAX_SAFE_INTEGER) {
      switch (typeof value) {
        case "number":
          return Number.isInteger(value) && value >= 0 && value < length;
        case "symbol":
          return false;
        case "string":
          return IS_UNSIGNED_INTEGER.test(value);
      }
    }
    function isIterateeCall(value, index, object) {
      if (!isObject(object)) {
        return false;
      }
      if (typeof index === "number" && isArrayLike(object) && isIndex(index) && index < object.length || typeof index === "string" && index in object) {
        return eq(object[index], value);
      }
      return false;
    }
    function defaults(object, ...sources) {
      object = Object(object);
      const objectProto = Object.prototype;
      let length = sources.length;
      const guard = length > 2 ? sources[2] : void 0;
      if (guard && isIterateeCall(sources[0], sources[1], guard)) {
        length = 1;
      }
      for (let i = 0; i < length; i++) {
        if (isNil(sources[i])) {
          continue;
        }
        const source = sources[i];
        for (const key in source) {
          const value = object[key];
          if (value === void 0 || !objectProto.hasOwnProperty.call(object, key) && eq(value, objectProto[key])) {
            object[key] = source[key];
          }
        }
      }
      return object;
    }
    exports.defaults = defaults;
  }
});

// node_modules/ioredis/built/utils/isArguments.js
var require_isArguments = __commonJS({
  "node_modules/ioredis/built/utils/isArguments.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.isArguments = void 0;
    function getTag(value) {
      if (value == null) {
        return value === void 0 ? "[object Undefined]" : "[object Null]";
      }
      return Object.prototype.toString.call(value);
    }
    function isArguments(value) {
      return value !== null && typeof value === "object" && getTag(value) === "[object Arguments]";
    }
    exports.isArguments = isArguments;
  }
});

// node_modules/ioredis/built/utils/lodash.js
var require_lodash = __commonJS({
  "node_modules/ioredis/built/utils/lodash.js"(exports) {
    "use strict";
    var __createBinding = exports && exports.__createBinding || (Object.create ? (function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      var desc = Object.getOwnPropertyDescriptor(m, k);
      if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = { enumerable: true, get: function() {
          return m[k];
        } };
      }
      Object.defineProperty(o, k2, desc);
    }) : (function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      o[k2] = m[k];
    }));
    var __exportStar = exports && exports.__exportStar || function(m, exports2) {
      for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports2, p)) __createBinding(exports2, m, p);
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.noop = void 0;
    function noop() {
    }
    exports.noop = noop;
    __exportStar(require_defaults(), exports);
    __exportStar(require_isArguments(), exports);
  }
});

// node_modules/ms/index.js
var require_ms = __commonJS({
  "node_modules/ms/index.js"(exports, module) {
    var s = 1e3;
    var m = s * 60;
    var h = m * 60;
    var d = h * 24;
    var w = d * 7;
    var y = d * 365.25;
    module.exports = function(val, options) {
      options = options || {};
      var type = typeof val;
      if (type === "string" && val.length > 0) {
        return parse(val);
      } else if (type === "number" && isFinite(val)) {
        return options.long ? fmtLong(val) : fmtShort(val);
      }
      throw new Error(
        "val is not a non-empty string or a valid number. val=" + JSON.stringify(val)
      );
    };
    function parse(str) {
      str = String(str);
      if (str.length > 100) {
        return;
      }
      var match = /^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(
        str
      );
      if (!match) {
        return;
      }
      var n = parseFloat(match[1]);
      var type = (match[2] || "ms").toLowerCase();
      switch (type) {
        case "years":
        case "year":
        case "yrs":
        case "yr":
        case "y":
          return n * y;
        case "weeks":
        case "week":
        case "w":
          return n * w;
        case "days":
        case "day":
        case "d":
          return n * d;
        case "hours":
        case "hour":
        case "hrs":
        case "hr":
        case "h":
          return n * h;
        case "minutes":
        case "minute":
        case "mins":
        case "min":
        case "m":
          return n * m;
        case "seconds":
        case "second":
        case "secs":
        case "sec":
        case "s":
          return n * s;
        case "milliseconds":
        case "millisecond":
        case "msecs":
        case "msec":
        case "ms":
          return n;
        default:
          return void 0;
      }
    }
    function fmtShort(ms) {
      var msAbs = Math.abs(ms);
      if (msAbs >= d) {
        return Math.round(ms / d) + "d";
      }
      if (msAbs >= h) {
        return Math.round(ms / h) + "h";
      }
      if (msAbs >= m) {
        return Math.round(ms / m) + "m";
      }
      if (msAbs >= s) {
        return Math.round(ms / s) + "s";
      }
      return ms + "ms";
    }
    function fmtLong(ms) {
      var msAbs = Math.abs(ms);
      if (msAbs >= d) {
        return plural(ms, msAbs, d, "day");
      }
      if (msAbs >= h) {
        return plural(ms, msAbs, h, "hour");
      }
      if (msAbs >= m) {
        return plural(ms, msAbs, m, "minute");
      }
      if (msAbs >= s) {
        return plural(ms, msAbs, s, "second");
      }
      return ms + " ms";
    }
    function plural(ms, msAbs, n, name) {
      var isPlural = msAbs >= n * 1.5;
      return Math.round(ms / n) + " " + name + (isPlural ? "s" : "");
    }
  }
});

// node_modules/debug/src/common.js
var require_common = __commonJS({
  "node_modules/debug/src/common.js"(exports, module) {
    function setup(env) {
      createDebug.debug = createDebug;
      createDebug.default = createDebug;
      createDebug.coerce = coerce;
      createDebug.disable = disable;
      createDebug.enable = enable;
      createDebug.enabled = enabled;
      createDebug.humanize = require_ms();
      createDebug.destroy = destroy;
      Object.keys(env).forEach((key) => {
        createDebug[key] = env[key];
      });
      createDebug.names = [];
      createDebug.skips = [];
      createDebug.formatters = {};
      function selectColor(namespace) {
        let hash = 0;
        for (let i = 0; i < namespace.length; i++) {
          hash = (hash << 5) - hash + namespace.charCodeAt(i);
          hash |= 0;
        }
        return createDebug.colors[Math.abs(hash) % createDebug.colors.length];
      }
      createDebug.selectColor = selectColor;
      function createDebug(namespace) {
        let prevTime;
        let enableOverride = null;
        let namespacesCache;
        let enabledCache;
        function debug(...args) {
          if (!debug.enabled) {
            return;
          }
          const self = debug;
          const curr = Number(/* @__PURE__ */ new Date());
          const ms = curr - (prevTime || curr);
          self.diff = ms;
          self.prev = prevTime;
          self.curr = curr;
          prevTime = curr;
          args[0] = createDebug.coerce(args[0]);
          if (typeof args[0] !== "string") {
            args.unshift("%O");
          }
          let index = 0;
          args[0] = args[0].replace(/%([a-zA-Z%])/g, (match, format) => {
            if (match === "%%") {
              return "%";
            }
            index++;
            const formatter = createDebug.formatters[format];
            if (typeof formatter === "function") {
              const val = args[index];
              match = formatter.call(self, val);
              args.splice(index, 1);
              index--;
            }
            return match;
          });
          createDebug.formatArgs.call(self, args);
          const logFn = self.log || createDebug.log;
          logFn.apply(self, args);
        }
        debug.namespace = namespace;
        debug.useColors = createDebug.useColors();
        debug.color = createDebug.selectColor(namespace);
        debug.extend = extend;
        debug.destroy = createDebug.destroy;
        Object.defineProperty(debug, "enabled", {
          enumerable: true,
          configurable: false,
          get: () => {
            if (enableOverride !== null) {
              return enableOverride;
            }
            if (namespacesCache !== createDebug.namespaces) {
              namespacesCache = createDebug.namespaces;
              enabledCache = createDebug.enabled(namespace);
            }
            return enabledCache;
          },
          set: (v) => {
            enableOverride = v;
          }
        });
        if (typeof createDebug.init === "function") {
          createDebug.init(debug);
        }
        return debug;
      }
      function extend(namespace, delimiter) {
        const newDebug = createDebug(this.namespace + (typeof delimiter === "undefined" ? ":" : delimiter) + namespace);
        newDebug.log = this.log;
        return newDebug;
      }
      function enable(namespaces) {
        createDebug.save(namespaces);
        createDebug.namespaces = namespaces;
        createDebug.names = [];
        createDebug.skips = [];
        const split = (typeof namespaces === "string" ? namespaces : "").trim().replace(/\s+/g, ",").split(",").filter(Boolean);
        for (const ns of split) {
          if (ns[0] === "-") {
            createDebug.skips.push(ns.slice(1));
          } else {
            createDebug.names.push(ns);
          }
        }
      }
      function matchesTemplate(search, template) {
        let searchIndex = 0;
        let templateIndex = 0;
        let starIndex = -1;
        let matchIndex = 0;
        while (searchIndex < search.length) {
          if (templateIndex < template.length && (template[templateIndex] === search[searchIndex] || template[templateIndex] === "*")) {
            if (template[templateIndex] === "*") {
              starIndex = templateIndex;
              matchIndex = searchIndex;
              templateIndex++;
            } else {
              searchIndex++;
              templateIndex++;
            }
          } else if (starIndex !== -1) {
            templateIndex = starIndex + 1;
            matchIndex++;
            searchIndex = matchIndex;
          } else {
            return false;
          }
        }
        while (templateIndex < template.length && template[templateIndex] === "*") {
          templateIndex++;
        }
        return templateIndex === template.length;
      }
      function disable() {
        const namespaces = [
          ...createDebug.names,
          ...createDebug.skips.map((namespace) => "-" + namespace)
        ].join(",");
        createDebug.enable("");
        return namespaces;
      }
      function enabled(name) {
        for (const skip of createDebug.skips) {
          if (matchesTemplate(name, skip)) {
            return false;
          }
        }
        for (const ns of createDebug.names) {
          if (matchesTemplate(name, ns)) {
            return true;
          }
        }
        return false;
      }
      function coerce(val) {
        if (val instanceof Error) {
          return val.stack || val.message;
        }
        return val;
      }
      function destroy() {
        console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.");
      }
      createDebug.enable(createDebug.load());
      return createDebug;
    }
    module.exports = setup;
  }
});

// node_modules/debug/src/browser.js
var require_browser = __commonJS({
  "node_modules/debug/src/browser.js"(exports, module) {
    exports.formatArgs = formatArgs;
    exports.save = save;
    exports.load = load;
    exports.useColors = useColors;
    exports.storage = localstorage();
    exports.destroy = /* @__PURE__ */ (() => {
      let warned = false;
      return () => {
        if (!warned) {
          warned = true;
          console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.");
        }
      };
    })();
    exports.colors = [
      "#0000CC",
      "#0000FF",
      "#0033CC",
      "#0033FF",
      "#0066CC",
      "#0066FF",
      "#0099CC",
      "#0099FF",
      "#00CC00",
      "#00CC33",
      "#00CC66",
      "#00CC99",
      "#00CCCC",
      "#00CCFF",
      "#3300CC",
      "#3300FF",
      "#3333CC",
      "#3333FF",
      "#3366CC",
      "#3366FF",
      "#3399CC",
      "#3399FF",
      "#33CC00",
      "#33CC33",
      "#33CC66",
      "#33CC99",
      "#33CCCC",
      "#33CCFF",
      "#6600CC",
      "#6600FF",
      "#6633CC",
      "#6633FF",
      "#66CC00",
      "#66CC33",
      "#9900CC",
      "#9900FF",
      "#9933CC",
      "#9933FF",
      "#99CC00",
      "#99CC33",
      "#CC0000",
      "#CC0033",
      "#CC0066",
      "#CC0099",
      "#CC00CC",
      "#CC00FF",
      "#CC3300",
      "#CC3333",
      "#CC3366",
      "#CC3399",
      "#CC33CC",
      "#CC33FF",
      "#CC6600",
      "#CC6633",
      "#CC9900",
      "#CC9933",
      "#CCCC00",
      "#CCCC33",
      "#FF0000",
      "#FF0033",
      "#FF0066",
      "#FF0099",
      "#FF00CC",
      "#FF00FF",
      "#FF3300",
      "#FF3333",
      "#FF3366",
      "#FF3399",
      "#FF33CC",
      "#FF33FF",
      "#FF6600",
      "#FF6633",
      "#FF9900",
      "#FF9933",
      "#FFCC00",
      "#FFCC33"
    ];
    function useColors() {
      if (typeof window !== "undefined" && window.process && (window.process.type === "renderer" || window.process.__nwjs)) {
        return true;
      }
      if (typeof navigator !== "undefined" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/)) {
        return false;
      }
      let m;
      return typeof document !== "undefined" && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance || // Is firebug? http://stackoverflow.com/a/398120/376773
      typeof window !== "undefined" && window.console && (window.console.firebug || window.console.exception && window.console.table) || // Is firefox >= v31?
      // https://developer.mozilla.org/en-US/docs/Tools/Web_Console#Styling_messages
      typeof navigator !== "undefined" && navigator.userAgent && (m = navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/)) && parseInt(m[1], 10) >= 31 || // Double check webkit in userAgent just in case we are in a worker
      typeof navigator !== "undefined" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/);
    }
    function formatArgs(args) {
      args[0] = (this.useColors ? "%c" : "") + this.namespace + (this.useColors ? " %c" : " ") + args[0] + (this.useColors ? "%c " : " ") + "+" + module.exports.humanize(this.diff);
      if (!this.useColors) {
        return;
      }
      const c = "color: " + this.color;
      args.splice(1, 0, c, "color: inherit");
      let index = 0;
      let lastC = 0;
      args[0].replace(/%[a-zA-Z%]/g, (match) => {
        if (match === "%%") {
          return;
        }
        index++;
        if (match === "%c") {
          lastC = index;
        }
      });
      args.splice(lastC, 0, c);
    }
    exports.log = console.debug || console.log || (() => {
    });
    function save(namespaces) {
      try {
        if (namespaces) {
          exports.storage.setItem("debug", namespaces);
        } else {
          exports.storage.removeItem("debug");
        }
      } catch (error) {
      }
    }
    function load() {
      let r;
      try {
        r = exports.storage.getItem("debug") || exports.storage.getItem("DEBUG");
      } catch (error) {
      }
      if (!r && typeof process !== "undefined" && "env" in process) {
        r = process.env.DEBUG;
      }
      return r;
    }
    function localstorage() {
      try {
        return localStorage;
      } catch (error) {
      }
    }
    module.exports = require_common()(exports);
    var { formatters } = module.exports;
    formatters.j = function(v) {
      try {
        return JSON.stringify(v);
      } catch (error) {
        return "[UnexpectedJSONParseError]: " + error.message;
      }
    };
  }
});

// node_modules/has-flag/index.js
var require_has_flag = __commonJS({
  "node_modules/has-flag/index.js"(exports, module) {
    "use strict";
    module.exports = (flag, argv = process.argv) => {
      const prefix = flag.startsWith("-") ? "" : flag.length === 1 ? "-" : "--";
      const position = argv.indexOf(prefix + flag);
      const terminatorPosition = argv.indexOf("--");
      return position !== -1 && (terminatorPosition === -1 || position < terminatorPosition);
    };
  }
});

// node_modules/supports-color/index.js
var require_supports_color = __commonJS({
  "node_modules/supports-color/index.js"(exports, module) {
    "use strict";
    var os = __require("os");
    var tty = __require("tty");
    var hasFlag = require_has_flag();
    var { env } = process;
    var forceColor;
    if (hasFlag("no-color") || hasFlag("no-colors") || hasFlag("color=false") || hasFlag("color=never")) {
      forceColor = 0;
    } else if (hasFlag("color") || hasFlag("colors") || hasFlag("color=true") || hasFlag("color=always")) {
      forceColor = 1;
    }
    if ("FORCE_COLOR" in env) {
      if (env.FORCE_COLOR === "true") {
        forceColor = 1;
      } else if (env.FORCE_COLOR === "false") {
        forceColor = 0;
      } else {
        forceColor = env.FORCE_COLOR.length === 0 ? 1 : Math.min(parseInt(env.FORCE_COLOR, 10), 3);
      }
    }
    function translateLevel(level) {
      if (level === 0) {
        return false;
      }
      return {
        level,
        hasBasic: true,
        has256: level >= 2,
        has16m: level >= 3
      };
    }
    function supportsColor(haveStream, streamIsTTY) {
      if (forceColor === 0) {
        return 0;
      }
      if (hasFlag("color=16m") || hasFlag("color=full") || hasFlag("color=truecolor")) {
        return 3;
      }
      if (hasFlag("color=256")) {
        return 2;
      }
      if (haveStream && !streamIsTTY && forceColor === void 0) {
        return 0;
      }
      const min = forceColor || 0;
      if (env.TERM === "dumb") {
        return min;
      }
      if (process.platform === "win32") {
        const osRelease = os.release().split(".");
        if (Number(osRelease[0]) >= 10 && Number(osRelease[2]) >= 10586) {
          return Number(osRelease[2]) >= 14931 ? 3 : 2;
        }
        return 1;
      }
      if ("CI" in env) {
        if (["TRAVIS", "CIRCLECI", "APPVEYOR", "GITLAB_CI", "GITHUB_ACTIONS", "BUILDKITE"].some((sign) => sign in env) || env.CI_NAME === "codeship") {
          return 1;
        }
        return min;
      }
      if ("TEAMCITY_VERSION" in env) {
        return /^(9\.(0*[1-9]\d*)\.|\d{2,}\.)/.test(env.TEAMCITY_VERSION) ? 1 : 0;
      }
      if (env.COLORTERM === "truecolor") {
        return 3;
      }
      if ("TERM_PROGRAM" in env) {
        const version = parseInt((env.TERM_PROGRAM_VERSION || "").split(".")[0], 10);
        switch (env.TERM_PROGRAM) {
          case "iTerm.app":
            return version >= 3 ? 3 : 2;
          case "Apple_Terminal":
            return 2;
        }
      }
      if (/-256(color)?$/i.test(env.TERM)) {
        return 2;
      }
      if (/^screen|^xterm|^vt100|^vt220|^rxvt|color|ansi|cygwin|linux/i.test(env.TERM)) {
        return 1;
      }
      if ("COLORTERM" in env) {
        return 1;
      }
      return min;
    }
    function getSupportLevel(stream) {
      const level = supportsColor(stream, stream && stream.isTTY);
      return translateLevel(level);
    }
    module.exports = {
      supportsColor: getSupportLevel,
      stdout: translateLevel(supportsColor(true, tty.isatty(1))),
      stderr: translateLevel(supportsColor(true, tty.isatty(2)))
    };
  }
});

// node_modules/debug/src/node.js
var require_node = __commonJS({
  "node_modules/debug/src/node.js"(exports, module) {
    var tty = __require("tty");
    var util = __require("util");
    exports.init = init;
    exports.log = log;
    exports.formatArgs = formatArgs;
    exports.save = save;
    exports.load = load;
    exports.useColors = useColors;
    exports.destroy = util.deprecate(
      () => {
      },
      "Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."
    );
    exports.colors = [6, 2, 3, 4, 5, 1];
    try {
      const supportsColor = require_supports_color();
      if (supportsColor && (supportsColor.stderr || supportsColor).level >= 2) {
        exports.colors = [
          20,
          21,
          26,
          27,
          32,
          33,
          38,
          39,
          40,
          41,
          42,
          43,
          44,
          45,
          56,
          57,
          62,
          63,
          68,
          69,
          74,
          75,
          76,
          77,
          78,
          79,
          80,
          81,
          92,
          93,
          98,
          99,
          112,
          113,
          128,
          129,
          134,
          135,
          148,
          149,
          160,
          161,
          162,
          163,
          164,
          165,
          166,
          167,
          168,
          169,
          170,
          171,
          172,
          173,
          178,
          179,
          184,
          185,
          196,
          197,
          198,
          199,
          200,
          201,
          202,
          203,
          204,
          205,
          206,
          207,
          208,
          209,
          214,
          215,
          220,
          221
        ];
      }
    } catch (error) {
    }
    exports.inspectOpts = Object.keys(process.env).filter((key) => {
      return /^debug_/i.test(key);
    }).reduce((obj, key) => {
      const prop = key.substring(6).toLowerCase().replace(/_([a-z])/g, (_, k) => {
        return k.toUpperCase();
      });
      let val = process.env[key];
      if (/^(yes|on|true|enabled)$/i.test(val)) {
        val = true;
      } else if (/^(no|off|false|disabled)$/i.test(val)) {
        val = false;
      } else if (val === "null") {
        val = null;
      } else {
        val = Number(val);
      }
      obj[prop] = val;
      return obj;
    }, {});
    function useColors() {
      return "colors" in exports.inspectOpts ? Boolean(exports.inspectOpts.colors) : tty.isatty(process.stderr.fd);
    }
    function formatArgs(args) {
      const { namespace: name, useColors: useColors2 } = this;
      if (useColors2) {
        const c = this.color;
        const colorCode = "\x1B[3" + (c < 8 ? c : "8;5;" + c);
        const prefix = `  ${colorCode};1m${name} \x1B[0m`;
        args[0] = prefix + args[0].split("\n").join("\n" + prefix);
        args.push(colorCode + "m+" + module.exports.humanize(this.diff) + "\x1B[0m");
      } else {
        args[0] = getDate() + name + " " + args[0];
      }
    }
    function getDate() {
      if (exports.inspectOpts.hideDate) {
        return "";
      }
      return (/* @__PURE__ */ new Date()).toISOString() + " ";
    }
    function log(...args) {
      return process.stderr.write(util.formatWithOptions(exports.inspectOpts, ...args) + "\n");
    }
    function save(namespaces) {
      if (namespaces) {
        process.env.DEBUG = namespaces;
      } else {
        delete process.env.DEBUG;
      }
    }
    function load() {
      return process.env.DEBUG;
    }
    function init(debug) {
      debug.inspectOpts = {};
      const keys = Object.keys(exports.inspectOpts);
      for (let i = 0; i < keys.length; i++) {
        debug.inspectOpts[keys[i]] = exports.inspectOpts[keys[i]];
      }
    }
    module.exports = require_common()(exports);
    var { formatters } = module.exports;
    formatters.o = function(v) {
      this.inspectOpts.colors = this.useColors;
      return util.inspect(v, this.inspectOpts).split("\n").map((str) => str.trim()).join(" ");
    };
    formatters.O = function(v) {
      this.inspectOpts.colors = this.useColors;
      return util.inspect(v, this.inspectOpts);
    };
  }
});

// node_modules/debug/src/index.js
var require_src = __commonJS({
  "node_modules/debug/src/index.js"(exports, module) {
    if (typeof process === "undefined" || process.type === "renderer" || process.browser === true || process.__nwjs) {
      module.exports = require_browser();
    } else {
      module.exports = require_node();
    }
  }
});

// node_modules/ioredis/built/utils/debug.js
var require_debug = __commonJS({
  "node_modules/ioredis/built/utils/debug.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.genRedactedString = exports.getStringValue = exports.MAX_ARGUMENT_LENGTH = void 0;
    var debug_1 = require_src();
    var MAX_ARGUMENT_LENGTH = 200;
    exports.MAX_ARGUMENT_LENGTH = MAX_ARGUMENT_LENGTH;
    var NAMESPACE_PREFIX = "ioredis";
    function getStringValue(v) {
      if (v === null) {
        return;
      }
      switch (typeof v) {
        case "boolean":
          return;
        case "number":
          return;
        case "object":
          if (Buffer.isBuffer(v)) {
            return v.toString("hex");
          }
          if (Array.isArray(v)) {
            return v.join(",");
          }
          try {
            return JSON.stringify(v);
          } catch (e) {
            return;
          }
        case "string":
          return v;
      }
    }
    exports.getStringValue = getStringValue;
    function genRedactedString(str, maxLen) {
      const { length } = str;
      return length <= maxLen ? str : str.slice(0, maxLen) + ' ... <REDACTED full-length="' + length + '">';
    }
    exports.genRedactedString = genRedactedString;
    function genDebugFunction(namespace) {
      const fn = (0, debug_1.default)(`${NAMESPACE_PREFIX}:${namespace}`);
      function wrappedDebug(...args) {
        if (!fn.enabled) {
          return;
        }
        for (let i = 1; i < args.length; i++) {
          const str = getStringValue(args[i]);
          if (typeof str === "string" && str.length > MAX_ARGUMENT_LENGTH) {
            args[i] = genRedactedString(str, MAX_ARGUMENT_LENGTH);
          }
        }
        return fn.apply(null, args);
      }
      Object.defineProperties(wrappedDebug, {
        namespace: {
          get() {
            return fn.namespace;
          }
        },
        enabled: {
          get() {
            return fn.enabled;
          }
        },
        destroy: {
          get() {
            return fn.destroy;
          }
        },
        log: {
          get() {
            return fn.log;
          },
          set(l) {
            fn.log = l;
          }
        }
      });
      return wrappedDebug;
    }
    exports.default = genDebugFunction;
  }
});

// node_modules/ioredis/built/constants/TLSProfiles.js
var require_TLSProfiles = __commonJS({
  "node_modules/ioredis/built/constants/TLSProfiles.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var RedisCloudCA = `-----BEGIN CERTIFICATE-----
MIIDTzCCAjegAwIBAgIJAKSVpiDswLcwMA0GCSqGSIb3DQEBBQUAMD4xFjAUBgNV
BAoMDUdhcmFudGlhIERhdGExJDAiBgNVBAMMG1NTTCBDZXJ0aWZpY2F0aW9uIEF1
dGhvcml0eTAeFw0xMzEwMDExMjE0NTVaFw0yMzA5MjkxMjE0NTVaMD4xFjAUBgNV
BAoMDUdhcmFudGlhIERhdGExJDAiBgNVBAMMG1NTTCBDZXJ0aWZpY2F0aW9uIEF1
dGhvcml0eTCCASIwDQYJKoZIhvcNAQEBBQADggEPADCCAQoCggEBALZqkh/DczWP
JnxnHLQ7QL0T4B4CDKWBKCcisriGbA6ZePWVNo4hfKQC6JrzfR+081NeD6VcWUiz
rmd+jtPhIY4c+WVQYm5PKaN6DT1imYdxQw7aqO5j2KUCEh/cznpLxeSHoTxlR34E
QwF28Wl3eg2vc5ct8LjU3eozWVk3gb7alx9mSA2SgmuX5lEQawl++rSjsBStemY2
BDwOpAMXIrdEyP/cVn8mkvi/BDs5M5G+09j0gfhyCzRWMQ7Hn71u1eolRxwVxgi3
TMn+/vTaFSqxKjgck6zuAYjBRPaHe7qLxHNr1So/Mc9nPy+3wHebFwbIcnUojwbp
4nctkWbjb2cCAwEAAaNQME4wHQYDVR0OBBYEFP1whtcrydmW3ZJeuSoKZIKjze3w
MB8GA1UdIwQYMBaAFP1whtcrydmW3ZJeuSoKZIKjze3wMAwGA1UdEwQFMAMBAf8w
DQYJKoZIhvcNAQEFBQADggEBAG2erXhwRAa7+ZOBs0B6X57Hwyd1R4kfmXcs0rta
lbPpvgULSiB+TCbf3EbhJnHGyvdCY1tvlffLjdA7HJ0PCOn+YYLBA0pTU/dyvrN6
Su8NuS5yubnt9mb13nDGYo1rnt0YRfxN+8DM3fXIVr038A30UlPX2Ou1ExFJT0MZ
uFKY6ZvLdI6/1cbgmguMlAhM+DhKyV6Sr5699LM3zqeI816pZmlREETYkGr91q7k
BpXJu/dtHaGxg1ZGu6w/PCsYGUcECWENYD4VQPd8N32JjOfu6vEgoEAwfPP+3oGp
Z4m3ewACcWOAenqflb+cQYC4PsF7qbXDmRaWrbKntOlZ3n0=
-----END CERTIFICATE-----
-----BEGIN CERTIFICATE-----
MIIGMTCCBBmgAwIBAgICEAAwDQYJKoZIhvcNAQELBQAwajELMAkGA1UEBhMCVVMx
CzAJBgNVBAgMAkNBMQswCQYDVQQHDAJDQTESMBAGA1UECgwJUmVkaXNMYWJzMS0w
KwYDVQQDDCRSZWRpc0xhYnMgUm9vdCBDZXJ0aWZpY2F0ZSBBdXRob3JpdHkwHhcN
MTgwMjI1MTUzNzM3WhcNMjgwMjIzMTUzNzM3WjBfMQswCQYDVQQGEwJVUzELMAkG
A1UECAwCQ0ExEjAQBgNVBAoMCVJlZGlzTGFiczEvMC0GA1UEAwwmUkNQIEludGVy
bWVkaWF0ZSBDZXJ0aWZpY2F0ZSBBdXRob3JpdHkwggIiMA0GCSqGSIb3DQEBAQUA
A4ICDwAwggIKAoICAQDf9dqbxc8Bq7Ctq9rWcxrGNKKHivqLAFpPq02yLPx6fsOv
Tq7GsDChAYBBc4v7Y2Ap9RD5Vs3dIhEANcnolf27QwrG9RMnnvzk8pCvp1o6zSU4
VuOE1W66/O1/7e2rVxyrnTcP7UgK43zNIXu7+tiAqWsO92uSnuMoGPGpeaUm1jym
hjWKtkAwDFSqvHY+XL5qDVBEjeUe+WHkYUg40cAXjusAqgm2hZt29c2wnVrxW25W
P0meNlzHGFdA2AC5z54iRiqj57dTfBTkHoBczQxcyw6hhzxZQ4e5I5zOKjXXEhZN
r0tA3YC14CTabKRus/JmZieyZzRgEy2oti64tmLYTqSlAD78pRL40VNoaSYetXLw
hhNsXCHgWaY6d5bLOc/aIQMAV5oLvZQKvuXAF1IDmhPA+bZbpWipp0zagf1P1H3s
UzsMdn2KM0ejzgotbtNlj5TcrVwpmvE3ktvUAuA+hi3FkVx1US+2Gsp5x4YOzJ7u
P1WPk6ShF0JgnJH2ILdj6kttTWwFzH17keSFICWDfH/+kM+k7Y1v3EXMQXE7y0T9
MjvJskz6d/nv+sQhY04xt64xFMGTnZjlJMzfQNi7zWFLTZnDD0lPowq7l3YiPoTT
t5Xky83lu0KZsZBo0WlWaDG00gLVdtRgVbcuSWxpi5BdLb1kRab66JptWjxwXQID
AQABo4HrMIHoMDoGA1UdHwQzMDEwL6AtoCuGKWh0dHBzOi8vcmwtY2Etc2VydmVy
LnJlZGlzbGFicy5jb20vdjEvY3JsMEYGCCsGAQUFBwEBBDowODA2BggrBgEFBQcw
AYYqaHR0cHM6Ly9ybC1jYS1zZXJ2ZXIucmVkaXNsYWJzLmNvbS92MS9vY3NwMB0G
A1UdDgQWBBQHar5OKvQUpP2qWt6mckzToeCOHDAfBgNVHSMEGDAWgBQi42wH6hM4
L2sujEvLM0/u8lRXTzASBgNVHRMBAf8ECDAGAQH/AgEAMA4GA1UdDwEB/wQEAwIB
hjANBgkqhkiG9w0BAQsFAAOCAgEAirEn/iTsAKyhd+pu2W3Z5NjCko4NPU0EYUbr
AP7+POK2rzjIrJO3nFYQ/LLuC7KCXG+2qwan2SAOGmqWst13Y+WHp44Kae0kaChW
vcYLXXSoGQGC8QuFSNUdaeg3RbMDYFT04dOkqufeWVccoHVxyTSg9eD8LZuHn5jw
7QDLiEECBmIJHk5Eeo2TAZrx4Yx6ufSUX5HeVjlAzqwtAqdt99uCJ/EL8bgpWbe+
XoSpvUv0SEC1I1dCAhCKAvRlIOA6VBcmzg5Am12KzkqTul12/VEFIgzqu0Zy2Jbc
AUPrYVu/+tOGXQaijy7YgwH8P8n3s7ZeUa1VABJHcxrxYduDDJBLZi+MjheUDaZ1
jQRHYevI2tlqeSBqdPKG4zBY5lS0GiAlmuze5oENt0P3XboHoZPHiqcK3VECgTVh
/BkJcuudETSJcZDmQ8YfoKfBzRQNg2sv/hwvUv73Ss51Sco8GEt2lD8uEdib1Q6z
zDT5lXJowSzOD5ZA9OGDjnSRL+2riNtKWKEqvtEG3VBJoBzu9GoxbAc7wIZLxmli
iF5a/Zf5X+UXD3s4TMmy6C4QZJpAA2egsSQCnraWO2ULhh7iXMysSkF/nzVfZn43
iqpaB8++9a37hWq14ZmOv0TJIDz//b2+KC4VFXWQ5W5QC6whsjT+OlG4p5ZYG0jo
616pxqo=
-----END CERTIFICATE-----
-----BEGIN CERTIFICATE-----
MIIFujCCA6KgAwIBAgIJAJ1aTT1lu2ScMA0GCSqGSIb3DQEBCwUAMGoxCzAJBgNV
BAYTAlVTMQswCQYDVQQIDAJDQTELMAkGA1UEBwwCQ0ExEjAQBgNVBAoMCVJlZGlz
TGFiczEtMCsGA1UEAwwkUmVkaXNMYWJzIFJvb3QgQ2VydGlmaWNhdGUgQXV0aG9y
aXR5MB4XDTE4MDIyNTE1MjA0MloXDTM4MDIyMDE1MjA0MlowajELMAkGA1UEBhMC
VVMxCzAJBgNVBAgMAkNBMQswCQYDVQQHDAJDQTESMBAGA1UECgwJUmVkaXNMYWJz
MS0wKwYDVQQDDCRSZWRpc0xhYnMgUm9vdCBDZXJ0aWZpY2F0ZSBBdXRob3JpdHkw
ggIiMA0GCSqGSIb3DQEBAQUAA4ICDwAwggIKAoICAQDLEjXy7YrbN5Waau5cd6g1
G5C2tMmeTpZ0duFAPxNU4oE3RHS5gGiok346fUXuUxbZ6QkuzeN2/2Z+RmRcJhQY
Dm0ZgdG4x59An1TJfnzKKoWj8ISmoHS/TGNBdFzXV7FYNLBuqZouqePI6ReC6Qhl
pp45huV32Q3a6IDrrvx7Wo5ZczEQeFNbCeCOQYNDdTmCyEkHqc2AGo8eoIlSTutT
ULOC7R5gzJVTS0e1hesQ7jmqHjbO+VQS1NAL4/5K6cuTEqUl+XhVhPdLWBXJQ5ag
54qhX4v+ojLzeU1R/Vc6NjMvVtptWY6JihpgplprN0Yh2556ewcXMeturcKgXfGJ
xeYzsjzXerEjrVocX5V8BNrg64NlifzTMKNOOv4fVZszq1SIHR8F9ROrqiOdh8iC
JpUbLpXH9hWCSEO6VRMB2xJoKu3cgl63kF30s77x7wLFMEHiwsQRKxooE1UhgS9K
2sO4TlQ1eWUvFvHSTVDQDlGQ6zu4qjbOpb3Q8bQwoK+ai2alkXVR4Ltxe9QlgYK3
StsnPhruzZGA0wbXdpw0bnM+YdlEm5ffSTpNIfgHeaa7Dtb801FtA71ZlH7A6TaI
SIQuUST9EKmv7xrJyx0W1pGoPOLw5T029aTjnICSLdtV9bLwysrLhIYG5bnPq78B
cS+jZHFGzD7PUVGQD01nOQIDAQABo2MwYTAdBgNVHQ4EFgQUIuNsB+oTOC9rLoxL
yzNP7vJUV08wHwYDVR0jBBgwFoAUIuNsB+oTOC9rLoxLyzNP7vJUV08wDwYDVR0T
AQH/BAUwAwEB/zAOBgNVHQ8BAf8EBAMCAYYwDQYJKoZIhvcNAQELBQADggIBAHfg
z5pMNUAKdMzK1aS1EDdK9yKz4qicILz5czSLj1mC7HKDRy8cVADUxEICis++CsCu
rYOvyCVergHQLREcxPq4rc5Nq1uj6J6649NEeh4WazOOjL4ZfQ1jVznMbGy+fJm3
3Hoelv6jWRG9iqeJZja7/1s6YC6bWymI/OY1e4wUKeNHAo+Vger7MlHV+RuabaX+
hSJ8bJAM59NCM7AgMTQpJCncrcdLeceYniGy5Q/qt2b5mJkQVkIdy4TPGGB+AXDJ
D0q3I/JDRkDUFNFdeW0js7fHdsvCR7O3tJy5zIgEV/o/BCkmJVtuwPYOrw/yOlKj
TY/U7ATAx9VFF6/vYEOMYSmrZlFX+98L6nJtwDqfLB5VTltqZ4H/KBxGE3IRSt9l
FXy40U+LnXzhhW+7VBAvyYX8GEXhHkKU8Gqk1xitrqfBXY74xKgyUSTolFSfFVgj
mcM/X4K45bka+qpkj7Kfv/8D4j6aZekwhN2ly6hhC1SmQ8qjMjpG/mrWOSSHZFmf
ybu9iD2AYHeIOkshIl6xYIa++Q/00/vs46IzAbQyriOi0XxlSMMVtPx0Q3isp+ji
n8Mq9eOuxYOEQ4of8twUkUDd528iwGtEdwf0Q01UyT84S62N8AySl1ZBKXJz6W4F
UhWfa/HQYOAPDdEjNgnVwLI23b8t0TozyCWw7q8h
-----END CERTIFICATE-----

-----BEGIN CERTIFICATE-----
MIIEjzCCA3egAwIBAgIQe55B/ALCKJDZtdNT8kD6hTANBgkqhkiG9w0BAQsFADBM
MSAwHgYDVQQLExdHbG9iYWxTaWduIFJvb3QgQ0EgLSBSMzETMBEGA1UEChMKR2xv
YmFsU2lnbjETMBEGA1UEAxMKR2xvYmFsU2lnbjAeFw0yMjAxMjYxMjAwMDBaFw0y
NTAxMjYwMDAwMDBaMFgxCzAJBgNVBAYTAkJFMRkwFwYDVQQKExBHbG9iYWxTaWdu
IG52LXNhMS4wLAYDVQQDEyVHbG9iYWxTaWduIEF0bGFzIFIzIE9WIFRMUyBDQSAy
MDIyIFEyMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAmGmg1LW9b7Lf
8zDD83yBDTEkt+FOxKJZqF4veWc5KZsQj9HfnUS2e5nj/E+JImlGPsQuoiosLuXD
BVBNAMcUFa11buFMGMeEMwiTmCXoXRrXQmH0qjpOfKgYc5gHG3BsRGaRrf7VR4eg
ofNMG9wUBw4/g/TT7+bQJdA4NfE7Y4d5gEryZiBGB/swaX6Jp/8MF4TgUmOWmalK
dZCKyb4sPGQFRTtElk67F7vU+wdGcrcOx1tDcIB0ncjLPMnaFicagl+daWGsKqTh
counQb6QJtYHa91KvCfKWocMxQ7OIbB5UARLPmC4CJ1/f8YFm35ebfzAeULYdGXu
jE9CLor0OwIDAQABo4IBXzCCAVswDgYDVR0PAQH/BAQDAgGGMB0GA1UdJQQWMBQG
CCsGAQUFBwMBBggrBgEFBQcDAjASBgNVHRMBAf8ECDAGAQH/AgEAMB0GA1UdDgQW
BBSH5Zq7a7B/t95GfJWkDBpA8HHqdjAfBgNVHSMEGDAWgBSP8Et/qC5FJK5NUPpj
move4t0bvDB7BggrBgEFBQcBAQRvMG0wLgYIKwYBBQUHMAGGImh0dHA6Ly9vY3Nw
Mi5nbG9iYWxzaWduLmNvbS9yb290cjMwOwYIKwYBBQUHMAKGL2h0dHA6Ly9zZWN1
cmUuZ2xvYmFsc2lnbi5jb20vY2FjZXJ0L3Jvb3QtcjMuY3J0MDYGA1UdHwQvMC0w
K6ApoCeGJWh0dHA6Ly9jcmwuZ2xvYmFsc2lnbi5jb20vcm9vdC1yMy5jcmwwIQYD
VR0gBBowGDAIBgZngQwBAgIwDAYKKwYBBAGgMgoBAjANBgkqhkiG9w0BAQsFAAOC
AQEAKRic9/f+nmhQU/wz04APZLjgG5OgsuUOyUEZjKVhNGDwxGTvKhyXGGAMW2B/
3bRi+aElpXwoxu3pL6fkElbX3B0BeS5LoDtxkyiVEBMZ8m+sXbocwlPyxrPbX6mY
0rVIvnuUeBH8X0L5IwfpNVvKnBIilTbcebfHyXkPezGwz7E1yhUULjJFm2bt0SdX
y+4X/WeiiYIv+fTVgZZgl+/2MKIsu/qdBJc3f3TvJ8nz+Eax1zgZmww+RSQWeOj3
15Iw6Z5FX+NwzY/Ab+9PosR5UosSeq+9HhtaxZttXG1nVh+avYPGYddWmiMT90J5
ZgKnO/Fx2hBgTxhOTMYaD312kg==
-----END CERTIFICATE-----

-----BEGIN CERTIFICATE-----
MIIDXzCCAkegAwIBAgILBAAAAAABIVhTCKIwDQYJKoZIhvcNAQELBQAwTDEgMB4G
A1UECxMXR2xvYmFsU2lnbiBSb290IENBIC0gUjMxEzARBgNVBAoTCkdsb2JhbFNp
Z24xEzARBgNVBAMTCkdsb2JhbFNpZ24wHhcNMDkwMzE4MTAwMDAwWhcNMjkwMzE4
MTAwMDAwWjBMMSAwHgYDVQQLExdHbG9iYWxTaWduIFJvb3QgQ0EgLSBSMzETMBEG
A1UEChMKR2xvYmFsU2lnbjETMBEGA1UEAxMKR2xvYmFsU2lnbjCCASIwDQYJKoZI
hvcNAQEBBQADggEPADCCAQoCggEBAMwldpB5BngiFvXAg7aEyiie/QV2EcWtiHL8
RgJDx7KKnQRfJMsuS+FggkbhUqsMgUdwbN1k0ev1LKMPgj0MK66X17YUhhB5uzsT
gHeMCOFJ0mpiLx9e+pZo34knlTifBtc+ycsmWQ1z3rDI6SYOgxXG71uL0gRgykmm
KPZpO/bLyCiR5Z2KYVc3rHQU3HTgOu5yLy6c+9C7v/U9AOEGM+iCK65TpjoWc4zd
QQ4gOsC0p6Hpsk+QLjJg6VfLuQSSaGjlOCZgdbKfd/+RFO+uIEn8rUAVSNECMWEZ
XriX7613t2Saer9fwRPvm2L7DWzgVGkWqQPabumDk3F2xmmFghcCAwEAAaNCMEAw
DgYDVR0PAQH/BAQDAgEGMA8GA1UdEwEB/wQFMAMBAf8wHQYDVR0OBBYEFI/wS3+o
LkUkrk1Q+mOai97i3Ru8MA0GCSqGSIb3DQEBCwUAA4IBAQBLQNvAUKr+yAzv95ZU
RUm7lgAJQayzE4aGKAczymvmdLm6AC2upArT9fHxD4q/c2dKg8dEe3jgr25sbwMp
jjM5RcOO5LlXbKr8EpbsU8Yt5CRsuZRj+9xTaGdWPoO4zzUhw8lo/s7awlOqzJCK
6fBdRoyV3XpYKBovHd7NADdBj+1EbddTKJd+82cEHhXXipa0095MJ6RMG3NzdvQX
mcIfeg7jLQitChws/zyrVQ4PkX4268NXSb7hLi18YIvDQVETI53O9zJrlAGomecs
Mx86OyXShkDOOyyGeMlhLxS67ttVb9+E7gUJTb0o2HLO02JQZR7rkpeDMdmztcpH
WD9f
-----END CERTIFICATE-----`;
    var TLSProfiles = {
      RedisCloudFixed: { ca: RedisCloudCA },
      RedisCloudFlexible: { ca: RedisCloudCA }
    };
    exports.default = TLSProfiles;
  }
});

// node_modules/ioredis/built/utils/index.js
var require_utils2 = __commonJS({
  "node_modules/ioredis/built/utils/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.noop = exports.isArguments = exports.defaults = exports.Debug = exports.zipMap = exports.isResp2SubscriberMode = exports.CONNECTION_CLOSED_ERROR_MSG = exports.shuffle = exports.sample = exports.resolveTLSProfile = exports.parseURL = exports.optimizeErrorStack = exports.toArg = exports.convertMapToArray = exports.convertObjectToArray = exports.timeout = exports.packObject = exports.isInt = exports.wrapMultiResult = exports.convertBufferToString = void 0;
    var lodash_1 = require_lodash();
    Object.defineProperty(exports, "defaults", { enumerable: true, get: function() {
      return lodash_1.defaults;
    } });
    Object.defineProperty(exports, "isArguments", { enumerable: true, get: function() {
      return lodash_1.isArguments;
    } });
    Object.defineProperty(exports, "noop", { enumerable: true, get: function() {
      return lodash_1.noop;
    } });
    var debug_1 = require_debug();
    exports.Debug = debug_1.default;
    var TLSProfiles_1 = require_TLSProfiles();
    function convertBufferToString(value, encoding) {
      if (value instanceof Buffer) {
        return value.toString(encoding);
      }
      if (Array.isArray(value)) {
        const length = value.length;
        const res = Array(length);
        for (let i = 0; i < length; ++i) {
          res[i] = value[i] instanceof Buffer && encoding === "utf8" ? value[i].toString() : convertBufferToString(value[i], encoding);
        }
        return res;
      }
      if (isPlainObject(value)) {
        const keys = Object.keys(value);
        const res = {};
        for (const element of keys) {
          const item = value[element];
          const converted = item instanceof Buffer && encoding === "utf8" ? item.toString() : convertBufferToString(item, encoding);
          if (element === "__proto__" || element === "constructor") {
            Object.defineProperty(res, element, {
              value: converted,
              configurable: true,
              enumerable: true,
              writable: true
            });
          } else {
            res[element] = converted;
          }
        }
        return res;
      }
      return value;
    }
    exports.convertBufferToString = convertBufferToString;
    function isPlainObject(value) {
      if (value === null || typeof value !== "object") {
        return false;
      }
      const proto = Object.getPrototypeOf(value);
      return proto === Object.prototype || proto === null;
    }
    function wrapMultiResult(arr) {
      if (!arr) {
        return null;
      }
      const result = [];
      const length = arr.length;
      for (let i = 0; i < length; ++i) {
        const item = arr[i];
        if (item instanceof Error) {
          result.push([item]);
        } else {
          result.push([null, item]);
        }
      }
      return result;
    }
    exports.wrapMultiResult = wrapMultiResult;
    function isInt(value) {
      const x = parseFloat(value);
      return !isNaN(value) && (x | 0) === x;
    }
    exports.isInt = isInt;
    function packObject(array) {
      const result = {};
      const length = array.length;
      for (let i = 1; i < length; i += 2) {
        result[array[i - 1]] = array[i];
      }
      return result;
    }
    exports.packObject = packObject;
    function timeout(callback, timeout2) {
      let timer = null;
      const run = function() {
        if (timer) {
          clearTimeout(timer);
          timer = null;
          callback.apply(this, arguments);
        }
      };
      timer = setTimeout(run, timeout2, new Error("timeout"));
      return run;
    }
    exports.timeout = timeout;
    function convertObjectToArray(obj) {
      const result = [];
      const keys = Object.keys(obj);
      for (let i = 0, l = keys.length; i < l; i++) {
        result.push(keys[i], obj[keys[i]]);
      }
      return result;
    }
    exports.convertObjectToArray = convertObjectToArray;
    function convertMapToArray(map) {
      const result = [];
      let pos = 0;
      map.forEach(function(value, key) {
        result[pos] = key;
        result[pos + 1] = value;
        pos += 2;
      });
      return result;
    }
    exports.convertMapToArray = convertMapToArray;
    function toArg(arg) {
      if (arg === null || typeof arg === "undefined") {
        return "";
      }
      if (typeof arg === "number" && Number.isInteger(arg) && !Number.isSafeInteger(arg)) {
        return BigInt(arg).toString();
      }
      return String(arg);
    }
    exports.toArg = toArg;
    function optimizeErrorStack(error, friendlyStack, filterPath) {
      const stacks = friendlyStack.split("\n");
      let lines = "";
      let i;
      for (i = 1; i < stacks.length; ++i) {
        if (stacks[i].indexOf(filterPath) === -1) {
          break;
        }
      }
      for (let j = i; j < stacks.length; ++j) {
        lines += "\n" + stacks[j];
      }
      if (error.stack) {
        const pos = error.stack.indexOf("\n");
        error.stack = error.stack.slice(0, pos) + lines;
      }
      return error;
    }
    exports.optimizeErrorStack = optimizeErrorStack;
    function parseURL(url) {
      if (isInt(url)) {
        return { port: url };
      }
      const rawUrl = url;
      const hasProtocol = /^rediss?:\/\//i.test(rawUrl);
      const isProtocolRelative = rawUrl.startsWith("//");
      if (rawUrl[0] === "/" && !isProtocolRelative) {
        const qIdx = rawUrl.indexOf("?");
        const result2 = {
          path: qIdx === -1 ? rawUrl : rawUrl.slice(0, qIdx)
        };
        if (qIdx !== -1) {
          const options2 = {};
          const params = new URLSearchParams(rawUrl.slice(qIdx + 1));
          params.forEach((value, key) => {
            options2[key] = parseURLQueryItem(key, value);
          });
          (0, lodash_1.defaults)(result2, options2);
        }
        return result2;
      }
      let parsed;
      if (hasProtocol) {
        parsed = new URL(rawUrl);
      } else if (isProtocolRelative) {
        parsed = new URL("redis:" + rawUrl);
      } else {
        parsed = new URL("redis://" + rawUrl);
      }
      const options = {};
      parsed.searchParams.forEach((value, key) => {
        options[key] = parseURLQueryItem(key, value);
      });
      const result = {};
      if (parsed.username || parsed.password) {
        result.username = decodeURIComponent(parsed.username);
        result.password = decodeURIComponent(parsed.password);
      }
      if (parsed.pathname && parsed.pathname !== "/") {
        if (hasProtocol || isProtocolRelative) {
          if (parsed.pathname.length > 1) {
            result.db = parsed.pathname.slice(1);
          }
        } else {
          result.path = parsed.pathname;
        }
      }
      if (parsed.hostname) {
        result.host = parsed.hostname.replace(/^\[|\]$/g, "");
      }
      if (parsed.port) {
        result.port = parsed.port;
      }
      (0, lodash_1.defaults)(result, options);
      return result;
    }
    exports.parseURL = parseURL;
    function parseURLQueryItem(key, value) {
      if (key === "family") {
        const intFamily = Number.parseInt(value, 10);
        if (!Number.isNaN(intFamily)) {
          return intFamily;
        }
      }
      return value;
    }
    function resolveTLSProfile(options) {
      let tls = options?.tls;
      if (typeof tls === "string")
        tls = { profile: tls };
      const profile = TLSProfiles_1.default[tls?.profile];
      if (profile) {
        tls = Object.assign({}, profile, tls);
        delete tls.profile;
        options = Object.assign({}, options, { tls });
      }
      return options;
    }
    exports.resolveTLSProfile = resolveTLSProfile;
    function sample(array, from = 0) {
      const length = array.length;
      if (from >= length) {
        return null;
      }
      return array[from + Math.floor(Math.random() * (length - from))];
    }
    exports.sample = sample;
    function shuffle(array) {
      let counter = array.length;
      while (counter > 0) {
        const index = Math.floor(Math.random() * counter);
        counter--;
        [array[counter], array[index]] = [array[index], array[counter]];
      }
      return array;
    }
    exports.shuffle = shuffle;
    exports.CONNECTION_CLOSED_ERROR_MSG = "Connection is closed.";
    function isResp2SubscriberMode(condition) {
      return Boolean(condition?.subscriber) && condition?.protocol !== 3;
    }
    exports.isResp2SubscriberMode = isResp2SubscriberMode;
    function zipMap(keys, values) {
      const map = /* @__PURE__ */ new Map();
      keys.forEach((key, index) => {
        map.set(key, values[index]);
      });
      return map;
    }
    exports.zipMap = zipMap;
  }
});

// node_modules/ioredis/built/utils/argumentParsers.js
var require_argumentParsers = __commonJS({
  "node_modules/ioredis/built/utils/argumentParsers.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.parseBlockOption = exports.parseSecondsArgument = void 0;
    var parseNumberArgument = (arg) => {
      if (typeof arg === "number") {
        return arg;
      }
      if (Buffer.isBuffer(arg)) {
        return parseNumberArgument(arg.toString());
      }
      if (typeof arg === "string") {
        const value = Number(arg);
        return Number.isFinite(value) ? value : void 0;
      }
      return void 0;
    };
    var parseStringArgument = (arg) => {
      if (typeof arg === "string") {
        return arg;
      }
      if (Buffer.isBuffer(arg)) {
        return arg.toString();
      }
      return void 0;
    };
    var parseSecondsArgument = (arg) => {
      const value = parseNumberArgument(arg);
      if (value === void 0) {
        return void 0;
      }
      if (value <= 0) {
        return 0;
      }
      return value * 1e3;
    };
    exports.parseSecondsArgument = parseSecondsArgument;
    var parseBlockOption = (args) => {
      for (let i = 0; i < args.length; i++) {
        const token = parseStringArgument(args[i]);
        if (token && token.toLowerCase() === "block") {
          const duration = parseNumberArgument(args[i + 1]);
          if (duration === void 0) {
            return void 0;
          }
          if (duration <= 0) {
            return 0;
          }
          return duration;
        }
      }
      return null;
    };
    exports.parseBlockOption = parseBlockOption;
  }
});

// node_modules/ioredis/built/replyTransformers.js
var require_replyTransformers = __commonJS({
  "node_modules/ioredis/built/replyTransformers.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.sortedSetWithScorePairCommands = exports.transformStreamReadReply = exports.transformPairReply = exports.transformVsimReply = exports.wrapStreamMapPairs = exports.flattenNestedArrayItems = exports.passthroughReplyTransformer = void 0;
    var passthroughReplyTransformer = function(result) {
      return result;
    };
    exports.passthroughReplyTransformer = passthroughReplyTransformer;
    var flattenNestedArrayItems = function(result) {
      if (!Array.isArray(result)) {
        return result;
      }
      let flat = null;
      for (let i = 0; i < result.length; i++) {
        const item = result[i];
        if (Array.isArray(item)) {
          if (!flat) {
            flat = result.slice(0, i);
          }
          flat.push(...item);
        } else if (flat) {
          flat.push(item);
        }
      }
      return flat ?? result;
    };
    exports.flattenNestedArrayItems = flattenNestedArrayItems;
    var flattenPairTransformers = {
      2: {
        legacy: exports.passthroughReplyTransformer,
        resp3: exports.passthroughReplyTransformer
      },
      3: {
        legacy: exports.flattenNestedArrayItems,
        resp3: exports.passthroughReplyTransformer
      }
    };
    var vsimTransformers = {
      2: {
        legacy: exports.flattenNestedArrayItems,
        resp3: exports.passthroughReplyTransformer
      },
      3: {
        legacy: exports.flattenNestedArrayItems,
        resp3: exports.passthroughReplyTransformer
      }
    };
    var wrapStreamMapPairs = function(result) {
      if (!Array.isArray(result)) {
        return result;
      }
      const wrapped = [];
      for (let i = 0; i < result.length; i += 2) {
        wrapped.push([result[i], result[i + 1]]);
      }
      return wrapped;
    };
    exports.wrapStreamMapPairs = wrapStreamMapPairs;
    var streamReadTransformers = {
      2: {
        legacy: exports.passthroughReplyTransformer,
        resp3: exports.passthroughReplyTransformer
      },
      3: {
        legacy: exports.wrapStreamMapPairs,
        resp3: exports.passthroughReplyTransformer
      }
    };
    var transformVsimReply = function(result, context) {
      return vsimTransformers[context.protocol][context.replyMapping](result, context);
    };
    exports.transformVsimReply = transformVsimReply;
    var transformPairReply = function(result, context) {
      return flattenPairTransformers[context.protocol][context.replyMapping](result, context);
    };
    exports.transformPairReply = transformPairReply;
    var transformStreamReadReply = function(result, context) {
      return streamReadTransformers[context.protocol][context.replyMapping](result, context);
    };
    exports.transformStreamReadReply = transformStreamReadReply;
    exports.sortedSetWithScorePairCommands = [
      "zdiff",
      "zinter",
      "zpopmax",
      "zpopmin",
      "zunion",
      "zrandmember",
      "zrange",
      "zrangebyscore",
      "zrevrange",
      "zrevrangebyscore"
    ];
  }
});

// node_modules/ioredis/built/Command.js
var require_Command = __commonJS({
  "node_modules/ioredis/built/Command.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var commands_1 = require_built();
    var calculateSlot = require_lib();
    var standard_as_callback_1 = require_built2();
    var utils_1 = require_utils2();
    var argumentParsers_1 = require_argumentParsers();
    var replyTransformers_1 = require_replyTransformers();
    var Command2 = class _Command {
      /**
       * Check whether the command has the flag
       */
      static checkFlag(flagName, commandName) {
        commandName = commandName.toLowerCase();
        return !!this.getFlagMap()[flagName][commandName];
      }
      static setArgumentTransformer(name, func) {
        this._transformer.argument[name] = func;
      }
      static setReplyTransformer(name, func) {
        this._transformer.reply[name] = func;
      }
      static getFlagMap() {
        if (!this.flagMap) {
          this.flagMap = Object.keys(_Command.FLAGS).reduce((map, flagName) => {
            map[flagName] = {};
            _Command.FLAGS[flagName].forEach((commandName) => {
              map[flagName][commandName] = true;
            });
            return map;
          }, {});
        }
        return this.flagMap;
      }
      /**
       * Creates an instance of Command.
       * @param name Command name
       * @param args An array of command arguments
       * @param options
       * @param callback The callback that handles the response.
       * If omit, the response will be handled via Promise
       */
      constructor(name, args = [], options = {}, callback) {
        this.name = name;
        this.inTransaction = false;
        this.isTraced = false;
        this.isResolved = false;
        this.isSettled = false;
        this.transformed = false;
        this.replyEncoding = options.replyEncoding;
        this.protocol = 2;
        this.replyMapping = "legacy";
        this.errorStack = options.errorStack;
        this.args = args.flat();
        this.callback = callback;
        this.initPromise();
        if (options.keyPrefix) {
          const isBufferKeyPrefix = options.keyPrefix instanceof Buffer;
          let keyPrefixBuffer = isBufferKeyPrefix ? options.keyPrefix : null;
          this._iterateKeys((key) => {
            if (key instanceof Buffer) {
              if (keyPrefixBuffer === null) {
                keyPrefixBuffer = Buffer.from(options.keyPrefix);
              }
              return Buffer.concat([keyPrefixBuffer, key]);
            } else if (isBufferKeyPrefix) {
              return Buffer.concat([options.keyPrefix, Buffer.from(String(key))]);
            }
            return options.keyPrefix + key;
          });
        }
        if (options.readOnly) {
          this.isReadOnly = true;
        }
      }
      getSlot() {
        if (typeof this.slot === "undefined") {
          const key = this.getKeys()[0];
          this.slot = key == null ? null : calculateSlot(key);
        }
        return this.slot;
      }
      getKeys() {
        return this._iterateKeys();
      }
      setReplyContext(context) {
        this.protocol = context?.protocol ?? 2;
        this.replyMapping = context?.replyMapping ?? "legacy";
      }
      /**
       * Convert command to writable buffer or string
       */
      toWritable(_socket) {
        let result;
        const commandStr = "*" + (this.args.length + 1) + "\r\n$" + Buffer.byteLength(this.name) + "\r\n" + this.name + "\r\n";
        if (this.bufferMode) {
          const buffers = new MixedBuffers();
          buffers.push(commandStr);
          for (let i = 0; i < this.args.length; ++i) {
            const arg = this.args[i];
            if (arg instanceof Buffer) {
              if (arg.length === 0) {
                buffers.push("$0\r\n\r\n");
              } else {
                buffers.push("$" + arg.length + "\r\n");
                buffers.push(arg);
                buffers.push("\r\n");
              }
            } else {
              buffers.push("$" + Buffer.byteLength(arg) + "\r\n" + arg + "\r\n");
            }
          }
          result = buffers.toBuffer();
        } else {
          result = commandStr;
          for (let i = 0; i < this.args.length; ++i) {
            const arg = this.args[i];
            result += "$" + Buffer.byteLength(arg) + "\r\n" + arg + "\r\n";
          }
        }
        return result;
      }
      stringifyArguments() {
        for (let i = 0; i < this.args.length; ++i) {
          const arg = this.args[i];
          if (typeof arg === "string") {
          } else if (arg instanceof Buffer) {
            this.bufferMode = true;
          } else {
            this.args[i] = (0, utils_1.toArg)(arg);
          }
        }
      }
      /**
       * Convert buffer/buffer[] to string/string[],
       * and apply reply transformer.
       */
      transformReply(result) {
        if (this.replyEncoding) {
          result = (0, utils_1.convertBufferToString)(result, this.replyEncoding);
        }
        const transformer = _Command._transformer.reply[this.name];
        if (transformer) {
          result = transformer(result, {
            commandName: this.name,
            protocol: this.protocol,
            replyMapping: this.replyMapping
          });
        }
        return result;
      }
      /**
       * Set the wait time before terminating the attempt to execute a command
       * and generating an error.
       */
      setTimeout(ms) {
        if (!this._commandTimeoutTimer) {
          this._commandTimeoutTimer = setTimeout(() => {
            if (!this.isSettled) {
              this.reject(new Error("Command timed out"));
            }
          }, ms);
        }
      }
      /**
       * Set a timeout for blocking commands.
       * When the timeout expires, the command resolves with null (matching Redis behavior).
       * This handles the case of undetectable network failures (e.g., docker network disconnect)
       * where the TCP connection becomes a zombie and no close event fires.
       */
      setBlockingTimeout(ms) {
        if (ms <= 0) {
          return;
        }
        if (this._blockingTimeoutTimer) {
          clearTimeout(this._blockingTimeoutTimer);
          this._blockingTimeoutTimer = void 0;
        }
        const now = Date.now();
        if (this._blockingDeadline === void 0) {
          this._blockingDeadline = now + ms;
        }
        const remaining = this._blockingDeadline - now;
        if (remaining <= 0) {
          this.resolve(null);
          return;
        }
        this._blockingTimeoutTimer = setTimeout(() => {
          if (this.isSettled) {
            this._blockingTimeoutTimer = void 0;
            return;
          }
          this._blockingTimeoutTimer = void 0;
          this.resolve(null);
        }, remaining);
      }
      /**
       * Extract the blocking timeout from the command arguments.
       *
       * @returns The timeout in seconds, null for indefinite blocking (timeout of 0),
       *          or undefined if this is not a blocking command
       */
      extractBlockingTimeout() {
        const args = this.args;
        if (!args || args.length === 0) {
          return void 0;
        }
        const name = this.name.toLowerCase();
        if (name === "blmovem") {
          return (0, argumentParsers_1.parseSecondsArgument)(args[4]);
        }
        if (_Command.checkFlag("LAST_ARG_TIMEOUT_COMMANDS", name)) {
          return (0, argumentParsers_1.parseSecondsArgument)(args[args.length - 1]);
        }
        if (_Command.checkFlag("FIRST_ARG_TIMEOUT_COMMANDS", name)) {
          return (0, argumentParsers_1.parseSecondsArgument)(args[0]);
        }
        if (_Command.checkFlag("BLOCK_OPTION_COMMANDS", name)) {
          return (0, argumentParsers_1.parseBlockOption)(args);
        }
        return void 0;
      }
      /**
       * Clear the command and blocking timers
       */
      _clearTimers() {
        const existingTimer = this._commandTimeoutTimer;
        if (existingTimer) {
          clearTimeout(existingTimer);
          delete this._commandTimeoutTimer;
        }
        const blockingTimer = this._blockingTimeoutTimer;
        if (blockingTimer) {
          clearTimeout(blockingTimer);
          delete this._blockingTimeoutTimer;
        }
      }
      initPromise() {
        this.isResolved = false;
        this.isSettled = false;
        const promise = new Promise((resolve, reject) => {
          if (!this.transformed) {
            this.transformed = true;
            const transformer = _Command._transformer.argument[this.name];
            if (transformer) {
              this.args = transformer(this.args);
            }
            this.stringifyArguments();
          }
          this.resolve = this._convertValue(resolve);
          this.reject = (err) => {
            this._clearTimers();
            this.isSettled = true;
            if (this.errorStack) {
              reject((0, utils_1.optimizeErrorStack)(err, this.errorStack.stack, __dirname));
            } else {
              reject(err);
            }
          };
        });
        this.promise = (0, standard_as_callback_1.default)(promise, this.callback);
      }
      /**
       * Iterate through the command arguments that are considered keys.
       */
      _iterateKeys(transform2 = (key) => key) {
        if (typeof this.keys === "undefined") {
          this.keys = [];
          if ((0, commands_1.exists)(this.name, { caseInsensitive: true })) {
            const keyIndexes = (0, commands_1.getKeyIndexes)(this.name, this.args, {
              nameCaseInsensitive: true
            });
            for (const index of keyIndexes) {
              this.args[index] = transform2(this.args[index]);
              this.keys.push(this.args[index]);
            }
          }
        }
        return this.keys;
      }
      /**
       * Convert the value from buffer to the target encoding.
       */
      _convertValue(resolve) {
        return (value) => {
          try {
            this._clearTimers();
            resolve(this.transformReply(value));
            this.isResolved = true;
            this.isSettled = true;
          } catch (err) {
            this.reject(err);
          }
          return this.promise;
        };
      }
    };
    Command2.FLAGS = {
      VALID_IN_SUBSCRIBER_MODE: [
        "subscribe",
        "psubscribe",
        "unsubscribe",
        "punsubscribe",
        "ssubscribe",
        "sunsubscribe",
        "ping",
        "quit"
      ],
      VALID_IN_MONITOR_MODE: ["monitor", "auth"],
      ENTER_SUBSCRIBER_MODE: ["subscribe", "psubscribe", "ssubscribe"],
      EXIT_SUBSCRIBER_MODE: ["unsubscribe", "punsubscribe", "sunsubscribe"],
      WILL_DISCONNECT: ["quit"],
      HANDSHAKE_COMMANDS: [
        "auth",
        "hello",
        "select",
        "client",
        "readonly",
        "info"
      ],
      IGNORE_RECONNECT_ON_ERROR: ["client"],
      BLOCKING_COMMANDS: [
        "blpop",
        "brpop",
        "brpoplpush",
        "blmove",
        "blmovem",
        "bzpopmin",
        "bzpopmax",
        "bzmpop",
        "blmpop",
        "xread",
        "xreadgroup"
      ],
      LAST_ARG_TIMEOUT_COMMANDS: [
        "blpop",
        "brpop",
        "brpoplpush",
        "blmove",
        "bzpopmin",
        "bzpopmax"
      ],
      FIRST_ARG_TIMEOUT_COMMANDS: ["bzmpop", "blmpop"],
      BLOCK_OPTION_COMMANDS: ["xread", "xreadgroup"]
    };
    Command2._transformer = {
      argument: {},
      reply: {}
    };
    exports.default = Command2;
    var msetArgumentTransformer = function(args) {
      if (args.length === 1) {
        if (args[0] instanceof Map) {
          return (0, utils_1.convertMapToArray)(args[0]);
        }
        if (typeof args[0] === "object" && args[0] !== null) {
          return (0, utils_1.convertObjectToArray)(args[0]);
        }
      }
      return args;
    };
    var hsetArgumentTransformer = function(args) {
      if (args.length === 2) {
        if (args[1] instanceof Map) {
          return [args[0]].concat((0, utils_1.convertMapToArray)(args[1]));
        }
        if (typeof args[1] === "object" && args[1] !== null) {
          return [args[0]].concat((0, utils_1.convertObjectToArray)(args[1]));
        }
      }
      return args;
    };
    Command2.setArgumentTransformer("mset", msetArgumentTransformer);
    Command2.setArgumentTransformer("msetnx", msetArgumentTransformer);
    Command2.setArgumentTransformer("hset", hsetArgumentTransformer);
    Command2.setArgumentTransformer("hmset", hsetArgumentTransformer);
    Command2.setReplyTransformer("hgetall", function(result) {
      if (Array.isArray(result)) {
        const obj = {};
        for (let i = 0; i < result.length; i += 2) {
          const key = result[i];
          const value = result[i + 1];
          if (key in obj) {
            Object.defineProperty(obj, key, {
              value,
              configurable: true,
              enumerable: true,
              writable: true
            });
          } else {
            obj[key] = value;
          }
        }
        return obj;
      }
      return result;
    });
    Command2.setReplyTransformer("vsim", replyTransformers_1.transformVsimReply);
    Command2.setReplyTransformer("hrandfield", replyTransformers_1.transformPairReply);
    Command2.setReplyTransformer("xread", replyTransformers_1.transformStreamReadReply);
    Command2.setReplyTransformer("xreadgroup", replyTransformers_1.transformStreamReadReply);
    for (const command of replyTransformers_1.sortedSetWithScorePairCommands) {
      Command2.setReplyTransformer(command, replyTransformers_1.transformPairReply);
    }
    var MixedBuffers = class {
      constructor() {
        this.length = 0;
        this.items = [];
      }
      push(x) {
        this.length += Buffer.byteLength(x);
        this.items.push(x);
      }
      toBuffer() {
        const result = Buffer.allocUnsafe(this.length);
        let offset = 0;
        for (const item of this.items) {
          const length = Buffer.byteLength(item);
          Buffer.isBuffer(item) ? item.copy(result, offset) : result.write(item, offset, length);
          offset += length;
        }
        return result;
      }
    };
  }
});

// node_modules/ioredis/built/errors/ClusterAllFailedError.js
var require_ClusterAllFailedError = __commonJS({
  "node_modules/ioredis/built/errors/ClusterAllFailedError.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var redis_errors_1 = require_redis_errors();
    var ClusterAllFailedError = class extends redis_errors_1.RedisError {
      constructor(message, lastNodeError) {
        super(message);
        this.lastNodeError = lastNodeError;
        Error.captureStackTrace(this, this.constructor);
      }
      get name() {
        return this.constructor.name;
      }
    };
    ClusterAllFailedError.defaultMessage = "Failed to refresh slots cache.";
    exports.default = ClusterAllFailedError;
  }
});

// node_modules/ioredis/built/ScanStream.js
var require_ScanStream = __commonJS({
  "node_modules/ioredis/built/ScanStream.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var stream_1 = __require("stream");
    var ScanStream = class extends stream_1.Readable {
      constructor(opt) {
        super(opt);
        this.opt = opt;
        this._redisCursor = "0";
        this._redisDrained = false;
      }
      _read() {
        if (this._redisDrained) {
          this.push(null);
          return;
        }
        const args = [this._redisCursor];
        if (this.opt.key) {
          args.unshift(this.opt.key);
        }
        if (this.opt.match) {
          args.push("MATCH", this.opt.match);
        }
        if (this.opt.type) {
          args.push("TYPE", this.opt.type);
        }
        if (this.opt.count) {
          args.push("COUNT", String(this.opt.count));
        }
        if (this.opt.noValues) {
          args.push("NOVALUES");
        }
        this.opt.redis[this.opt.command](args, (err, res) => {
          if (err) {
            this.emit("error", err);
            return;
          }
          this._redisCursor = res[0] instanceof Buffer ? res[0].toString() : res[0];
          if (this._redisCursor === "0") {
            this._redisDrained = true;
          }
          this.push(res[1]);
        });
      }
      close() {
        this._redisDrained = true;
      }
    };
    exports.default = ScanStream;
  }
});

// node_modules/ioredis/built/autoPipelining.js
var require_autoPipelining = __commonJS({
  "node_modules/ioredis/built/autoPipelining.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.executeWithAutoPipelining = exports.getFirstValueInFlattenedArray = exports.shouldUseAutoPipelining = exports.notAllowedAutoPipelineCommands = exports.kCallbacks = exports.kExec = void 0;
    var lodash_1 = require_lodash();
    var calculateSlot = require_lib();
    var standard_as_callback_1 = require_built2();
    var commands_1 = require_built();
    exports.kExec = /* @__PURE__ */ Symbol("exec");
    exports.kCallbacks = /* @__PURE__ */ Symbol("callbacks");
    exports.notAllowedAutoPipelineCommands = [
      "auth",
      "info",
      "script",
      "quit",
      "cluster",
      "pipeline",
      "multi",
      "subscribe",
      "psubscribe",
      "unsubscribe",
      "unpsubscribe",
      "select",
      "client",
      "hello",
      "readonly",
      "himport"
    ];
    function executeAutoPipeline(client, slotKey) {
      if (client._runningAutoPipelines.has(slotKey)) {
        return;
      }
      if (!client._autoPipelines.has(slotKey)) {
        return;
      }
      client._runningAutoPipelines.add(slotKey);
      const pipeline = client._autoPipelines.get(slotKey);
      client._autoPipelines.delete(slotKey);
      const callbacks = pipeline[exports.kCallbacks];
      pipeline[exports.kCallbacks] = null;
      pipeline.exec(function(err, results) {
        client._runningAutoPipelines.delete(slotKey);
        if (err) {
          for (let i = 0; i < callbacks.length; i++) {
            process.nextTick(callbacks[i], err);
          }
        } else {
          for (let i = 0; i < callbacks.length; i++) {
            process.nextTick(callbacks[i], ...results[i]);
          }
        }
        if (client._autoPipelines.has(slotKey)) {
          executeAutoPipeline(client, slotKey);
        }
      });
    }
    function shouldUseAutoPipelining(client, functionName, commandName) {
      return functionName && client.options.enableAutoPipelining && !client.isPipeline && !exports.notAllowedAutoPipelineCommands.includes(commandName) && !client.options.autoPipeliningIgnoredCommands.includes(commandName);
    }
    exports.shouldUseAutoPipelining = shouldUseAutoPipelining;
    function getFirstValueInFlattenedArray(args) {
      for (let i = 0; i < args.length; i++) {
        const arg = args[i];
        if (typeof arg === "string") {
          return arg;
        } else if (Array.isArray(arg) || (0, lodash_1.isArguments)(arg)) {
          if (arg.length === 0) {
            continue;
          }
          return arg[0];
        }
        const flattened = [arg].flat();
        if (flattened.length > 0) {
          return flattened[0];
        }
      }
      return void 0;
    }
    exports.getFirstValueInFlattenedArray = getFirstValueInFlattenedArray;
    function getFirstKeyForCommand(commandName, args) {
      if ((0, commands_1.exists)(commandName, { caseInsensitive: true })) {
        const flattenedArgs = args.flat();
        const keyIndexes = (0, commands_1.getKeyIndexes)(commandName, flattenedArgs, {
          nameCaseInsensitive: true
        });
        if (keyIndexes.length) {
          return flattenedArgs[keyIndexes[0]];
        }
      }
      return getFirstValueInFlattenedArray(args);
    }
    function executeWithAutoPipelining(client, functionName, commandName, args, callback) {
      if (client.isCluster && !client.slots.length) {
        if (client.status === "wait")
          client.connect().catch(lodash_1.noop);
        return (0, standard_as_callback_1.default)(new Promise(function(resolve, reject) {
          client.delayUntilReady((err) => {
            if (err) {
              reject(err);
              return;
            }
            executeWithAutoPipelining(client, functionName, commandName, args, null).then(resolve, reject);
          });
        }), callback);
      }
      const prefix = client.options.keyPrefix || "";
      let slotKey = client.isCluster ? client.slots[calculateSlot(`${prefix}${getFirstKeyForCommand(commandName, args)}`)].join(",") : "main";
      if (client.isCluster && client.options.scaleReads !== "master") {
        const isReadOnly = (0, commands_1.exists)(commandName) && (0, commands_1.hasFlag)(commandName, "readonly");
        slotKey += isReadOnly ? ":read" : ":write";
      }
      if (!client._autoPipelines.has(slotKey)) {
        const pipeline2 = client.pipeline();
        pipeline2[exports.kExec] = false;
        pipeline2[exports.kCallbacks] = [];
        client._autoPipelines.set(slotKey, pipeline2);
      }
      const pipeline = client._autoPipelines.get(slotKey);
      if (!pipeline[exports.kExec]) {
        pipeline[exports.kExec] = true;
        setImmediate(executeAutoPipeline, client, slotKey);
      }
      const autoPipelinePromise = new Promise(function(resolve, reject) {
        pipeline[exports.kCallbacks].push(function(err, value) {
          if (err) {
            reject(err);
            return;
          }
          resolve(value);
        });
        if (functionName === "call") {
          args.unshift(commandName);
        }
        pipeline[functionName](...args);
      });
      return (0, standard_as_callback_1.default)(autoPipelinePromise, callback);
    }
    exports.executeWithAutoPipelining = executeWithAutoPipelining;
  }
});

// node_modules/ioredis/built/Script.js
var require_Script = __commonJS({
  "node_modules/ioredis/built/Script.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var crypto_1 = __require("crypto");
    var Command_1 = require_Command();
    var standard_as_callback_1 = require_built2();
    var Script2 = class {
      constructor(lua, numberOfKeys = null, keyPrefix = "", readOnly = false) {
        this.lua = lua;
        this.numberOfKeys = numberOfKeys;
        this.keyPrefix = keyPrefix;
        this.readOnly = readOnly;
        this.sha = (0, crypto_1.createHash)("sha1").update(lua).digest("hex");
        const sha = this.sha;
        const socketHasScriptLoaded = /* @__PURE__ */ new WeakSet();
        this.Command = class CustomScriptCommand extends Command_1.default {
          toWritable(socket) {
            const origReject = this.reject;
            this.reject = (err) => {
              if (err.message.indexOf("NOSCRIPT") !== -1) {
                socketHasScriptLoaded.delete(socket);
              }
              origReject.call(this, err);
            };
            if (!socketHasScriptLoaded.has(socket)) {
              socketHasScriptLoaded.add(socket);
              this.name = "eval";
              this.args[0] = lua;
            } else if (this.name === "eval") {
              this.name = "evalsha";
              this.args[0] = sha;
            }
            return super.toWritable(socket);
          }
        };
      }
      execute(container, args, options, callback) {
        if (typeof this.numberOfKeys === "number") {
          args.unshift(this.numberOfKeys);
        }
        if (this.keyPrefix) {
          options.keyPrefix = this.keyPrefix;
        }
        if (this.readOnly) {
          options.readOnly = true;
        }
        const evalsha = new this.Command("evalsha", [this.sha, ...args], options);
        evalsha.promise = evalsha.promise.catch((err) => {
          if (err.message.indexOf("NOSCRIPT") === -1) {
            throw err;
          }
          const resend = new this.Command("evalsha", [this.sha, ...args], options);
          const client = container.isPipeline ? container.redis : container;
          return client.sendCommand(resend);
        });
        (0, standard_as_callback_1.default)(evalsha.promise, callback);
        return container.sendCommand(evalsha);
      }
    };
    exports.default = Script2;
  }
});

// node_modules/ioredis/built/utils/Commander.js
var require_Commander = __commonJS({
  "node_modules/ioredis/built/utils/Commander.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var commands_1 = require_built();
    var autoPipelining_1 = require_autoPipelining();
    var Command_1 = require_Command();
    var Script_1 = require_Script();
    var Commander = class {
      constructor() {
        this.options = {};
        this.scriptsSet = {};
        this.addedBuiltinSet = /* @__PURE__ */ new Set();
      }
      /**
       * Return supported builtin commands
       */
      getBuiltinCommands() {
        return commands.slice(0);
      }
      /**
       * Create a builtin command
       */
      createBuiltinCommand(commandName) {
        return {
          string: generateFunction(null, commandName, "utf8"),
          buffer: generateFunction(null, commandName, null)
        };
      }
      /**
       * Create add builtin command
       */
      addBuiltinCommand(commandName) {
        this.addedBuiltinSet.add(commandName);
        this[commandName] = generateFunction(commandName, commandName, "utf8");
        this[commandName + "Buffer"] = generateFunction(commandName + "Buffer", commandName, null);
      }
      /**
       * Define a custom command using lua script
       */
      defineCommand(name, definition) {
        const script = new Script_1.default(definition.lua, definition.numberOfKeys, this.options.keyPrefix, definition.readOnly);
        this.scriptsSet[name] = script;
        this[name] = generateScriptingFunction(name, name, script, "utf8");
        this[name + "Buffer"] = generateScriptingFunction(name + "Buffer", name, script, null);
      }
      /**
       * @ignore
       */
      sendCommand(command, stream, node) {
        throw new Error('"sendCommand" is not implemented');
      }
    };
    var commands = commands_1.list.filter((command) => command !== "monitor");
    commands.push("sentinel");
    commands.forEach(function(commandName) {
      Commander.prototype[commandName] = generateFunction(commandName, commandName, "utf8");
      Commander.prototype[commandName + "Buffer"] = generateFunction(commandName + "Buffer", commandName, null);
    });
    Commander.prototype.call = generateFunction("call", "utf8");
    Commander.prototype.callBuffer = generateFunction("callBuffer", null);
    Commander.prototype.send_command = Commander.prototype.call;
    function generateFunction(functionName, _commandName, _encoding) {
      if (typeof _encoding === "undefined") {
        _encoding = _commandName;
        _commandName = null;
      }
      return function(...args) {
        const commandName = _commandName || args.shift();
        let callback = args[args.length - 1];
        if (typeof callback === "function") {
          args.pop();
        } else {
          callback = void 0;
        }
        const options = {
          errorStack: this.options.showFriendlyErrorStack ? new Error() : void 0,
          keyPrefix: this.options.keyPrefix,
          replyEncoding: _encoding
        };
        if (!(0, autoPipelining_1.shouldUseAutoPipelining)(this, functionName, commandName)) {
          return this.sendCommand(
            // @ts-expect-error
            new Command_1.default(commandName, args, options, callback)
          );
        }
        return (0, autoPipelining_1.executeWithAutoPipelining)(
          this,
          functionName,
          commandName,
          // @ts-expect-error
          args,
          callback
        );
      };
    }
    function generateScriptingFunction(functionName, commandName, script, encoding) {
      return function(...args) {
        const callback = typeof args[args.length - 1] === "function" ? args.pop() : void 0;
        const options = {
          replyEncoding: encoding
        };
        if (this.options.showFriendlyErrorStack) {
          options.errorStack = new Error();
        }
        if (!(0, autoPipelining_1.shouldUseAutoPipelining)(this, functionName, commandName)) {
          return script.execute(this, args, options, callback);
        }
        return (0, autoPipelining_1.executeWithAutoPipelining)(this, functionName, commandName, args, callback);
      };
    }
    exports.default = Commander;
  }
});

// node_modules/ioredis/built/himport/HimportCoordinator.js
var require_HimportCoordinator = __commonJS({
  "node_modules/ioredis/built/himport/HimportCoordinator.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.interceptHimportControlCommand = exports.isHimportControlCommand = exports.isInternalHimportCommand = exports.unbindHimportCoordinator = exports.setHimportRole = exports.interceptHimportPipeline = exports.interceptHimportCommand = exports.getHimportBinding = exports.bindHimportCoordinator = exports.cloneHimportFieldsets = exports.hasHimportCoordinator = void 0;
    var Command_1 = require_Command();
    var utils_1 = require_utils2();
    exports.hasHimportCoordinator = /* @__PURE__ */ Symbol("hasHimportCoordinator");
    var bindings = /* @__PURE__ */ new WeakMap();
    var internalCommands = /* @__PURE__ */ new WeakSet();
    var debug = (0, utils_1.Debug)("himport");
    function copyValue(value) {
      return value instanceof Buffer ? Buffer.from(value) : value;
    }
    function canonicalize(value) {
      return Buffer.from(value).toString("base64");
    }
    function commandToken(value) {
      if (value === void 0) {
        return "";
      }
      return Buffer.isBuffer(value) ? value.toString("utf8").toUpperCase() : String(value).toUpperCase();
    }
    function cloneHimportFieldsets(fieldsets) {
      if (fieldsets === void 0) {
        return void 0;
      }
      if (!Array.isArray(fieldsets)) {
        throw new TypeError("himportFieldsets must be an array");
      }
      const names = /* @__PURE__ */ new Set();
      const copied = fieldsets.map((fieldset) => {
        if (!fieldset || typeof fieldset !== "object") {
          throw new TypeError("Each HIMPORT fieldset must be an object");
        }
        if (typeof fieldset.name !== "string" && !Buffer.isBuffer(fieldset.name)) {
          throw new TypeError("Each HIMPORT fieldset name must be a string or Buffer");
        }
        if (!Array.isArray(fieldset.fields)) {
          throw new TypeError("Each HIMPORT fieldset fields value must be an array");
        }
        const name = copyValue(fieldset.name);
        const canonicalName = canonicalize(name);
        if (names.has(canonicalName)) {
          throw new TypeError("Duplicate HIMPORT fieldset name");
        }
        names.add(canonicalName);
        const fields = fieldset.fields.map((field) => {
          if (typeof field !== "string" && !Buffer.isBuffer(field)) {
            throw new TypeError("Each HIMPORT field must be a string or Buffer");
          }
          return copyValue(field);
        });
        return Object.freeze({
          name,
          fields: Object.freeze(fields)
        });
      });
      return Object.freeze(copied);
    }
    exports.cloneHimportFieldsets = cloneHimportFieldsets;
    var HimportCoordinator = class {
      constructor(fieldsets) {
        this.definitionsByName = /* @__PURE__ */ new Map();
        this.sessions = /* @__PURE__ */ new WeakMap();
        this.managedSets = /* @__PURE__ */ new WeakMap();
        this.definitions = fieldsets.map((fieldset) => {
          const definition = {
            canonicalName: canonicalize(fieldset.name),
            name: fieldset.name,
            fields: fieldset.fields
          };
          this.definitionsByName.set(definition.canonicalName, definition);
          return definition;
        });
      }
      get size() {
        return this.definitions.length;
      }
      beginSession(connection) {
        this.sessions.set(connection, {
          fieldsets: /* @__PURE__ */ new Map()
        });
      }
      detach(connection) {
        this.sessions.delete(connection);
      }
      invalidate(connection) {
        const session = this.sessions.get(connection);
        if (session) {
          session.fieldsets.clear();
        }
      }
      getDefinitions() {
        return this.definitions;
      }
      classify(command) {
        const existing = this.managedSets.get(command);
        if (existing) {
          return existing;
        }
        if (command.name.toLowerCase() !== "himport" || commandToken(command.args[0]) !== "SET") {
          return void 0;
        }
        const fieldsetName = command.args[2];
        if (typeof fieldsetName !== "string" && !Buffer.isBuffer(fieldsetName)) {
          return void 0;
        }
        const definition = this.definitionsByName.get(canonicalize(fieldsetName));
        if (!definition) {
          return void 0;
        }
        const context = {
          definition,
          recoveryAttempts: 0,
          recoveryInstalled: false
        };
        this.managedSets.set(command, context);
        return context;
      }
      prepareCommand(connection, command) {
        const context = this.classify(command);
        if (!context) {
          return void 0;
        }
        return this.ensurePrepared(connection, context.definition);
      }
      hasManagedSet(commands) {
        return commands.some((command) => this.classify(command) !== void 0);
      }
      prepareCommands(connection, commands) {
        const preparations = /* @__PURE__ */ new Set();
        for (const command of commands) {
          const preparation = this.prepareCommand(connection, command);
          if (preparation) {
            preparations.add(preparation);
          }
        }
        if (preparations.size === 0) {
          return void 0;
        }
        return Promise.all(preparations).then(() => void 0);
      }
      interceptCommand(connection, command, ready, resumeSend) {
        if (command.isSettled) {
          return true;
        }
        if (command.name.toLowerCase() === "reset") {
          this.invalidate(connection);
        }
        const managedSet = this.classify(command);
        if (!managedSet) {
          return false;
        }
        this.installRecovery(connection, command, resumeSend);
        const maySend = this.consumeAllowedSend(connection, command);
        if (!ready || maySend) {
          return false;
        }
        const preparation = this.prepareCommand(connection, command);
        if (!preparation) {
          return false;
        }
        preparation.then(() => {
          if (command.isSettled) {
            return;
          }
          try {
            this.allowNextSend(connection, command);
            resumeSend();
          } catch (error) {
            command.reject(error);
          }
        }, (error) => {
          if (!command.isSettled) {
            command.reject(error);
          }
        });
        return true;
      }
      allowNextSend(connection, command) {
        const context = this.classify(command);
        if (context) {
          context.sendWithoutPreparationOn = connection;
        }
      }
      consumeAllowedSend(connection, command) {
        const context = this.managedSets.get(command);
        if (context?.sendWithoutPreparationOn !== connection) {
          return false;
        }
        context.sendWithoutPreparationOn = void 0;
        return true;
      }
      installRecovery(connection, command, resumeSend) {
        const context = this.classify(command);
        if (!context) {
          return;
        }
        context.lastConnection = connection;
        context.resumeSend = resumeSend;
        if (context.recoveryInstalled) {
          return;
        }
        context.recoveryInstalled = true;
        const reject = command.reject;
        command.reject = (error) => {
          if (command.isSettled) {
            return;
          }
          const recoveryConnection = context.lastConnection;
          const recoverySend = context.resumeSend;
          if (context.recoveryAttempts > 0 || !recoveryConnection || !recoverySend || !isMissingFieldsetError(error)) {
            reject.call(command, error);
            return;
          }
          context.recoveryAttempts += 1;
          this.markUnprepared(recoveryConnection, context.definition);
          const preparation = this.ensurePrepared(recoveryConnection, context.definition);
          Promise.resolve(preparation).then(() => {
            if (command.isSettled) {
              return;
            }
            try {
              this.allowNextSend(recoveryConnection, command);
              recoverySend();
            } catch (sendError) {
              reject.call(command, sendError);
            }
          }, (preparationError) => {
            if (!command.isSettled) {
              reject.call(command, preparationError);
            }
          });
        };
      }
      ensurePrepared(connection, definition) {
        const session = this.getSession(connection);
        const current = session.fieldsets.get(definition.canonicalName);
        if (current?.status === "prepared") {
          return void 0;
        }
        if (current?.status === "preparing") {
          return current.promise;
        }
        const command = new Command_1.default("himport", [
          "PREPARE",
          definition.name,
          ...definition.fields
        ]);
        internalCommands.add(command);
        const promise = Promise.resolve(connection.sendCommand(command)).then(() => {
          if (this.sessions.get(connection) !== session) {
            return this.ensurePrepared(connection, definition) ?? Promise.resolve();
          }
          const latest = session.fieldsets.get(definition.canonicalName);
          if (latest?.status === "preparing" && latest.promise === promise) {
            session.fieldsets.set(definition.canonicalName, {
              status: "prepared"
            });
          }
        }, (error) => {
          if (this.sessions.get(connection) !== session) {
            return this.ensurePrepared(connection, definition) ?? Promise.resolve();
          }
          const latest = session.fieldsets.get(definition.canonicalName);
          if (latest?.status === "preparing" && latest.promise === promise) {
            session.fieldsets.delete(definition.canonicalName);
          }
          throw error;
        });
        session.fieldsets.set(definition.canonicalName, {
          status: "preparing",
          promise
        });
        return promise;
      }
      getSession(connection) {
        let session = this.sessions.get(connection);
        if (!session) {
          session = {
            fieldsets: /* @__PURE__ */ new Map()
          };
          this.sessions.set(connection, session);
        }
        return session;
      }
      markUnprepared(connection, definition) {
        const fieldsets = this.getSession(connection).fieldsets;
        if (fieldsets.get(definition.canonicalName)?.status === "prepared") {
          fieldsets.delete(definition.canonicalName);
        }
      }
    };
    exports.default = HimportCoordinator;
    function bindHimportCoordinator(owner, coordinator, role) {
      bindings.set(owner, { coordinator, role });
      owner[exports.hasHimportCoordinator] = true;
    }
    exports.bindHimportCoordinator = bindHimportCoordinator;
    function getHimportBinding(owner) {
      return bindings.get(owner);
    }
    exports.getHimportBinding = getHimportBinding;
    function interceptHimportCommand(connection, command, ready, resumeSend) {
      const binding = bindings.get(connection);
      if (!binding || binding.role === "replica" || isInternalHimportCommand(command)) {
        return false;
      }
      return binding.coordinator.interceptCommand(connection, command, ready, resumeSend);
    }
    exports.interceptHimportCommand = interceptHimportCommand;
    function interceptHimportPipeline({ owner, commands, slot, preferredNodeKey, setDestination, resume, reject }) {
      const binding = bindings.get(owner);
      if (!binding || !binding.coordinator.hasManagedSet(commands)) {
        return false;
      }
      let connection = owner;
      if (binding.role === "cluster") {
        const nodeKey = preferredNodeKey ?? owner.slots?.[slot]?.[0];
        const connectionPool = owner.connectionPool;
        const clusterConnection = nodeKey && connectionPool?.getInstanceByKey(nodeKey) || connectionPool?.getSampleInstance("master");
        if (!clusterConnection) {
          reject(new Error("No master node is available for the pipeline"));
          return true;
        }
        connection = clusterConnection;
        setDestination(connection);
      }
      const preparation = binding.coordinator.prepareCommands(connection, commands);
      if (!preparation) {
        return false;
      }
      preparation.then(() => {
        try {
          resume();
        } catch (error) {
          reject(error);
        }
      }, (error) => {
        reject(error);
      });
      return true;
    }
    exports.interceptHimportPipeline = interceptHimportPipeline;
    function setHimportRole(owner, role) {
      const binding = bindings.get(owner);
      if (binding) {
        binding.role = role;
      }
    }
    exports.setHimportRole = setHimportRole;
    function unbindHimportCoordinator(owner) {
      const binding = bindings.get(owner);
      if (binding) {
        binding.coordinator.detach(owner);
        bindings.delete(owner);
      }
      owner[exports.hasHimportCoordinator] = false;
    }
    exports.unbindHimportCoordinator = unbindHimportCoordinator;
    function isInternalHimportCommand(command) {
      return internalCommands.has(command);
    }
    exports.isInternalHimportCommand = isInternalHimportCommand;
    function isHimportControlCommand(command) {
      if (command.name.toLowerCase() !== "himport") {
        return false;
      }
      return ["PREPARE", "DISCARD", "DISCARDALL"].includes(commandToken(command.args[0]));
    }
    exports.isHimportControlCommand = isHimportControlCommand;
    function interceptHimportControlCommand(connections, command) {
      if (!isHimportControlCommand(command) || connections.length === 0) {
        return false;
      }
      const replies = connections.map((connection) => {
        const clone = new Command_1.default(command.name, command.args);
        connection.sendCommand(clone);
        return clone.promise;
      });
      Promise.allSettled(replies).then((results) => {
        let firstReply;
        let hasFirstReply = false;
        for (const result of results) {
          if (result.status === "rejected") {
            command.reject(result.reason);
            return;
          }
          if (!hasFirstReply) {
            firstReply = result.value;
            hasFirstReply = true;
          } else if (String(result.value) !== String(firstReply)) {
            debug("divergent HIMPORT reply across masters (%s != %s)", result.value, firstReply);
          }
        }
        command.resolve(firstReply);
      });
      return true;
    }
    exports.interceptHimportControlCommand = interceptHimportControlCommand;
    function isMissingFieldsetError(error) {
      return error.message.toLowerCase().includes("no such fieldset");
    }
  }
});

// node_modules/ioredis/built/Pipeline.js
var require_Pipeline = __commonJS({
  "node_modules/ioredis/built/Pipeline.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var calculateSlot = require_lib();
    var commands_1 = require_built();
    var standard_as_callback_1 = require_built2();
    var util_1 = __require("util");
    var Command_1 = require_Command();
    var buffer_1 = __require("buffer");
    var utils_1 = require_utils2();
    var Commander_1 = require_Commander();
    var HimportCoordinator_1 = require_HimportCoordinator();
    function generateMultiWithNodes(redis, keys) {
      const slot = calculateSlot(keys[0]);
      const target = redis._groupsBySlot[slot];
      for (let i = 1; i < keys.length; i++) {
        if (redis._groupsBySlot[calculateSlot(keys[i])] !== target) {
          return -1;
        }
      }
      return slot;
    }
    var Pipeline2 = class extends Commander_1.default {
      constructor(redis) {
        super();
        this.redis = redis;
        this.isPipeline = true;
        this.replyPending = 0;
        this._queue = [];
        this._result = [];
        this._transactions = 0;
        this._shaToScript = {};
        this.isCluster = this.redis.constructor.name === "Cluster" || this.redis.isCluster;
        this.options = redis.options;
        Object.keys(redis.scriptsSet).forEach((name) => {
          const script = redis.scriptsSet[name];
          this._shaToScript[script.sha] = script;
          this[name] = redis[name];
          this[name + "Buffer"] = redis[name + "Buffer"];
        });
        redis.addedBuiltinSet.forEach((name) => {
          this[name] = redis[name];
          this[name + "Buffer"] = redis[name + "Buffer"];
        });
        this.promise = new Promise((resolve, reject) => {
          this.resolve = resolve;
          this.reject = reject;
        });
        const _this = this;
        Object.defineProperty(this, "length", {
          get: function() {
            return _this._queue.length;
          }
        });
      }
      fillResult(value, position) {
        if (this._queue[position].name === "exec" && Array.isArray(value[1])) {
          const execLength = value[1].length;
          for (let i = 0; i < execLength; i++) {
            if (value[1][i] instanceof Error) {
              continue;
            }
            const cmd = this._queue[position - (execLength - i)];
            try {
              value[1][i] = cmd.transformReply(value[1][i]);
            } catch (err) {
              value[1][i] = err;
            }
          }
        }
        this._result[position] = value;
        if (--this.replyPending) {
          return;
        }
        if (this.isCluster) {
          let retriable = true;
          let commonError;
          for (let i = 0; i < this._result.length; ++i) {
            const error = this._result[i][0];
            const command = this._queue[i];
            if (error) {
              if (command.name === "exec" && error.message === "EXECABORT Transaction discarded because of previous errors.") {
                continue;
              }
              if (!commonError) {
                commonError = {
                  name: error.name,
                  message: error.message
                };
              } else if (commonError.name !== error.name || commonError.message !== error.message) {
                retriable = false;
                break;
              }
            } else if (!command.inTransaction) {
              const isReadOnly = (0, commands_1.exists)(command.name, { caseInsensitive: true }) && (0, commands_1.hasFlag)(command.name, "readonly", { nameCaseInsensitive: true });
              if (!isReadOnly) {
                retriable = false;
                break;
              }
            }
          }
          if (commonError && retriable) {
            const _this = this;
            const errv = commonError.message.split(" ");
            const queue = this._queue;
            let inTransaction = false;
            this._queue = [];
            for (let i = 0; i < queue.length; ++i) {
              if (errv[0] === "ASK" && !inTransaction && queue[i].name !== "asking" && (!queue[i - 1] || queue[i - 1].name !== "asking")) {
                const asking = new Command_1.default("asking");
                asking.ignore = true;
                this.sendCommand(asking);
              }
              queue[i].initPromise();
              this.sendCommand(queue[i]);
              inTransaction = queue[i].inTransaction;
            }
            let matched = true;
            if (typeof this.leftRedirections === "undefined") {
              this.leftRedirections = {};
            }
            const exec = function() {
              _this.exec();
            };
            const cluster = this.redis;
            cluster.handleError(commonError, this.leftRedirections, {
              moved: function(slot, key) {
                _this.preferKey = key;
                if (cluster.slots[slot]) {
                  if (cluster.slots[slot][0] !== key) {
                    cluster.slots[slot] = [key];
                  }
                } else {
                  cluster.slots[slot] = [key];
                }
                cluster._groupsBySlot[slot] = cluster._groupsIds[cluster.slots[slot].join(";")];
                cluster.refreshSlotsCache();
                _this.exec();
              },
              ask: function(_slot, key) {
                _this.preferKey = key;
                _this.exec();
              },
              tryagain: exec,
              clusterDown: exec,
              connectionClosed: exec,
              maxRedirections: () => {
                matched = false;
              },
              defaults: () => {
                matched = false;
              }
            });
            if (matched) {
              return;
            }
          }
        }
        let ignoredCount = 0;
        for (let i = 0; i < this._queue.length - ignoredCount; ++i) {
          if (this._queue[i + ignoredCount].ignore) {
            ignoredCount += 1;
          }
          this._result[i] = this._result[i + ignoredCount];
        }
        this.resolve(this._result.slice(0, this._result.length - ignoredCount));
      }
      sendCommand(command) {
        if (this._transactions > 0) {
          command.inTransaction = true;
        }
        const position = this._queue.length;
        command.pipelineIndex = position;
        command.promise.then((result) => {
          this.fillResult([null, result], position);
        }).catch((error) => {
          this.fillResult([error], position);
        });
        this._queue.push(command);
        return this;
      }
      addBatch(commands) {
        let command, commandName, args;
        for (let i = 0; i < commands.length; ++i) {
          command = commands[i];
          commandName = command[0];
          args = command.slice(1);
          this[commandName].apply(this, args);
        }
        return this;
      }
    };
    exports.default = Pipeline2;
    var multi = Pipeline2.prototype.multi;
    Pipeline2.prototype.multi = function() {
      this._transactions += 1;
      return multi.apply(this, arguments);
    };
    var execBuffer = Pipeline2.prototype.execBuffer;
    Pipeline2.prototype.execBuffer = (0, util_1.deprecate)(function() {
      if (this._transactions > 0) {
        this._transactions -= 1;
      }
      return execBuffer.apply(this, arguments);
    }, "Pipeline#execBuffer: Use Pipeline#exec instead");
    Pipeline2.prototype.exec = function(callback) {
      if (this.isCluster && !this.redis.slots.length) {
        if (this.redis.status === "wait")
          this.redis.connect().catch(utils_1.noop);
        if (callback && !this.nodeifiedPromise) {
          this.nodeifiedPromise = true;
          (0, standard_as_callback_1.default)(this.promise, callback);
        }
        this.redis.delayUntilReady((err) => {
          if (err) {
            this.reject(err);
            return;
          }
          this.exec(callback);
        });
        return this.promise;
      }
      if (this._transactions > 0) {
        this._transactions -= 1;
        return execBuffer.apply(this, arguments);
      }
      if (!this.nodeifiedPromise) {
        this.nodeifiedPromise = true;
        (0, standard_as_callback_1.default)(this.promise, callback);
      }
      if (!this._queue.length) {
        this.resolve([]);
      }
      let pipelineSlot;
      if (this.isCluster) {
        const sampleKeys = [];
        for (let i = 0; i < this._queue.length; i++) {
          const keys = this._queue[i].getKeys();
          if (keys.length) {
            sampleKeys.push(keys[0]);
          }
          if (keys.length && calculateSlot.generateMulti(keys) < 0) {
            this.reject(new Error("All the keys in a pipeline command should belong to the same slot"));
            return this.promise;
          }
        }
        if (sampleKeys.length) {
          pipelineSlot = generateMultiWithNodes(this.redis, sampleKeys);
          if (pipelineSlot < 0) {
            this.reject(new Error("All keys in the pipeline should belong to the same slots allocation group"));
            return this.promise;
          }
        } else {
          pipelineSlot = Math.random() * 16384 | 0;
        }
      }
      const _this = this;
      let node;
      const himportIntercepted = (0, HimportCoordinator_1.interceptHimportPipeline)({
        owner: _this.redis,
        commands: _this._queue,
        slot: pipelineSlot,
        preferredNodeKey: _this.preferKey,
        setDestination(connection) {
          node = {
            slot: pipelineSlot,
            redis: connection
          };
        },
        resume: execPipeline,
        reject(error) {
          _this.reject(error);
        }
      });
      if (!himportIntercepted) {
        execPipeline();
      }
      return this.promise;
      function execPipeline() {
        let writePending = _this.replyPending = _this._queue.length;
        if (_this.isCluster && !node) {
          node = {
            slot: pipelineSlot,
            redis: _this.redis.connectionPool.nodes.all[_this.preferKey]
          };
        }
        let data = "";
        let buffers;
        const stream = {
          isPipeline: true,
          destination: _this.isCluster ? node : { redis: _this.redis },
          write(writable) {
            if (typeof writable !== "string") {
              if (!buffers) {
                buffers = [];
              }
              if (data) {
                buffers.push(Buffer.from(data, "utf8"));
                data = "";
              }
              buffers.push(writable);
            } else {
              if (data.length + writable.length >= buffer_1.constants.MAX_STRING_LENGTH) {
                if (!buffers) {
                  buffers = [];
                }
                if (data) {
                  buffers.push(Buffer.from(data, "utf8"));
                  data = "";
                }
              }
              data += writable;
            }
            if (!--writePending) {
              if (buffers) {
                if (data) {
                  buffers.push(Buffer.from(data, "utf8"));
                }
                stream.destination.redis.stream.write(Buffer.concat(buffers));
              } else {
                stream.destination.redis.stream.write(data);
              }
              writePending = _this._queue.length;
              data = "";
              buffers = void 0;
            }
          }
        };
        for (let i = 0; i < _this._queue.length; ++i) {
          _this.redis.sendCommand(_this._queue[i], stream, node);
        }
        return _this.promise;
      }
    };
  }
});

// node_modules/ioredis/built/tracing.js
var require_tracing = __commonJS({
  "node_modules/ioredis/built/tracing.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.traceConnect = exports.traceBatch = exports.traceCommand = exports.sanitizeArgs = void 0;
    var SERIALIZATION_SUBSETS = [
      { regex: /^ECHO/i, args: 0 },
      {
        regex: /^(GETSET|LPUSH|MSET|PFA|PSETEX|PUBLISH|RPUSH|SADD|SET|SPUBLISH|XADD|ZADD)/i,
        args: 1
      },
      { regex: /^(HSET|HMSET|LSET|LINSERT)/i, args: 2 },
      {
        regex: /^(ACL|BIT|B[LRZ]|CLIENT|CLUSTER|CONFIG|COMMAND|DECR|DEL|EVAL|EX|FUNCTION|GEO|GET|HINCR|HMGET|HSCAN|INCR|L[TRLM]|MEMORY|P[EFISTU]|RPOP|S[CDIMORSU]|XACK|X[CDGILPRT]|Z[CDILMPRS])/i,
        args: -1
      }
    ];
    function sanitizeArgs(commandName, args) {
      let allowedArgCount = 0;
      for (const subset of SERIALIZATION_SUBSETS) {
        if (subset.regex.test(commandName)) {
          allowedArgCount = subset.args;
          break;
        }
      }
      if (allowedArgCount === -1) {
        return args.map((a) => String(a));
      }
      const result = [];
      for (let i = 0; i < args.length; i++) {
        if (i < allowedArgCount) {
          result.push(String(args[i]));
        } else {
          result.push("?");
        }
      }
      return result;
    }
    exports.sanitizeArgs = sanitizeArgs;
    var dc = (() => {
      try {
        return "getBuiltinModule" in process ? process.getBuiltinModule("node:diagnostics_channel") : __require("node:diagnostics_channel");
      } catch {
        return void 0;
      }
    })();
    var hasTracingChannel = dc && typeof dc.tracingChannel === "function";
    var commandChannel = hasTracingChannel ? dc.tracingChannel("ioredis:command") : void 0;
    var batchChannel = hasTracingChannel ? dc.tracingChannel("ioredis:batch") : void 0;
    var connectChannel = hasTracingChannel ? dc.tracingChannel("ioredis:connect") : void 0;
    function shouldTrace(channel) {
      return !!channel && channel.hasSubscribers !== false;
    }
    var noop = () => {
    };
    function traceCommand(fn, contextFactory) {
      if (!shouldTrace(commandChannel))
        return fn();
      const traced = commandChannel.tracePromise(fn, contextFactory());
      traced.catch(noop);
      return traced;
    }
    exports.traceCommand = traceCommand;
    function traceBatch(fn, contextFactory) {
      if (!shouldTrace(batchChannel))
        return fn();
      const traced = batchChannel.tracePromise(fn, contextFactory());
      traced.catch(noop);
      return traced;
    }
    exports.traceBatch = traceBatch;
    function traceConnect(fn, contextFactory) {
      if (!shouldTrace(connectChannel))
        return fn();
      return connectChannel.tracePromise(fn, contextFactory());
    }
    exports.traceConnect = traceConnect;
  }
});

// node_modules/ioredis/built/transaction.js
var require_transaction = __commonJS({
  "node_modules/ioredis/built/transaction.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.addTransactionSupport = void 0;
    var utils_1 = require_utils2();
    var standard_as_callback_1 = require_built2();
    var Pipeline_1 = require_Pipeline();
    var tracing_1 = require_tracing();
    function addTransactionSupport(redis) {
      redis.pipeline = function(commands) {
        const pipeline = new Pipeline_1.default(this);
        if (Array.isArray(commands)) {
          pipeline.addBatch(commands);
        }
        return pipeline;
      };
      const { multi } = redis;
      redis.multi = function(commands, options) {
        if (typeof options === "undefined" && !Array.isArray(commands)) {
          options = commands;
          commands = null;
        }
        if (options && options.pipeline === false) {
          return multi.call(this);
        }
        const pipeline = new Pipeline_1.default(this);
        pipeline.multi();
        if (Array.isArray(commands)) {
          pipeline.addBatch(commands);
        }
        const exec2 = pipeline.exec;
        pipeline.exec = function(callback) {
          if (this.isCluster && !this.redis.slots.length) {
            if (this.redis.status === "wait")
              this.redis.connect().catch(utils_1.noop);
            return (0, standard_as_callback_1.default)(new Promise((resolve, reject) => {
              this.redis.delayUntilReady((err) => {
                if (err) {
                  reject(err);
                  return;
                }
                this.exec(pipeline).then(resolve, reject);
              });
            }), callback);
          }
          if (this._transactions > 0) {
            exec2.call(pipeline);
          }
          if (this.nodeifiedPromise) {
            return exec2.call(pipeline);
          }
          const batchSize = Math.max(pipeline.length - 2, 0);
          const execAndUnwrap = () => exec2.call(pipeline).then(function(result) {
            const execResult = result[result.length - 1];
            if (typeof execResult === "undefined") {
              throw new Error("Pipeline cannot be used to send any commands when the `exec()` has been called on it.");
            }
            if (execResult[0]) {
              execResult[0].previousErrors = [];
              for (let i = 0; i < result.length - 1; ++i) {
                if (result[i][0]) {
                  execResult[0].previousErrors.push(result[i][0]);
                }
              }
              throw execResult[0];
            }
            return (0, utils_1.wrapMultiResult)(execResult[1]);
          });
          const promise = "_buildBatchContext" in this.redis ? (0, tracing_1.traceBatch)(execAndUnwrap, () => this.redis._buildBatchContext(batchSize)) : execAndUnwrap();
          return (0, standard_as_callback_1.default)(promise, callback);
        };
        const { execBuffer } = pipeline;
        pipeline.execBuffer = function(callback) {
          if (this._transactions > 0) {
            execBuffer.call(pipeline);
          }
          return pipeline.exec(callback);
        };
        return pipeline;
      };
      const { exec } = redis;
      redis.exec = function(callback) {
        return (0, standard_as_callback_1.default)(exec.call(this).then(function(results) {
          if (Array.isArray(results)) {
            results = (0, utils_1.wrapMultiResult)(results);
          }
          return results;
        }), callback);
      };
    }
    exports.addTransactionSupport = addTransactionSupport;
  }
});

// node_modules/ioredis/built/utils/applyMixin.js
var require_applyMixin = __commonJS({
  "node_modules/ioredis/built/utils/applyMixin.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function applyMixin(derivedConstructor, mixinConstructor) {
      Object.getOwnPropertyNames(mixinConstructor.prototype).forEach((name) => {
        Object.defineProperty(derivedConstructor.prototype, name, Object.getOwnPropertyDescriptor(mixinConstructor.prototype, name));
      });
    }
    exports.default = applyMixin;
  }
});

// node_modules/ioredis/built/cluster/ClusterOptions.js
var require_ClusterOptions = __commonJS({
  "node_modules/ioredis/built/cluster/ClusterOptions.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.DEFAULT_CLUSTER_OPTIONS = void 0;
    var dns_1 = __require("dns");
    exports.DEFAULT_CLUSTER_OPTIONS = {
      clusterRetryStrategy: (times) => Math.min(100 + times * 2, 2e3),
      clusterNodeRetryStrategy: null,
      enableOfflineQueue: true,
      enableReadyCheck: true,
      scaleReads: "master",
      maxRedirections: 16,
      retryDelayOnMoved: 0,
      retryDelayOnFailover: 100,
      retryDelayOnClusterDown: 100,
      retryDelayOnTryAgain: 100,
      slotsRefreshTimeout: 1e3,
      useSRVRecords: false,
      resolveSrv: dns_1.resolveSrv,
      dnsLookup: dns_1.lookup,
      enableAutoPipelining: false,
      autoPipeliningIgnoredCommands: [],
      shardedSubscribers: false
    };
  }
});

// node_modules/ioredis/built/cluster/util.js
var require_util = __commonJS({
  "node_modules/ioredis/built/cluster/util.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.getConnectionName = exports.weightSrvRecords = exports.groupSrvRecords = exports.getUniqueHostnamesFromOptions = exports.normalizeNodeOptions = exports.nodeKeyToRedisOptions = exports.getNodeKey = exports.waitForRedisReady = void 0;
    var utils_1 = require_utils2();
    var net_1 = __require("net");
    function waitForRedisReady(redis) {
      if (redis.status === "ready") {
        return Promise.resolve();
      }
      if (redis.status === "wait") {
        return redis.connect();
      }
      if (redis.status === "end") {
        return Promise.reject(new Error(utils_1.CONNECTION_CLOSED_ERROR_MSG));
      }
      return new Promise((resolve, reject) => {
        const onReady = () => {
          redis.removeListener("end", onEnd);
          resolve();
        };
        const onEnd = () => {
          redis.removeListener("ready", onReady);
          reject(new Error(utils_1.CONNECTION_CLOSED_ERROR_MSG));
        };
        redis.once("ready", onReady);
        redis.once("end", onEnd);
      });
    }
    exports.waitForRedisReady = waitForRedisReady;
    function getNodeKey(node) {
      node.port = node.port || 6379;
      node.host = node.host || "127.0.0.1";
      return node.host + ":" + node.port;
    }
    exports.getNodeKey = getNodeKey;
    function nodeKeyToRedisOptions(nodeKey) {
      const portIndex = nodeKey.lastIndexOf(":");
      if (portIndex === -1) {
        throw new Error(`Invalid node key ${nodeKey}`);
      }
      return {
        host: nodeKey.slice(0, portIndex),
        port: Number(nodeKey.slice(portIndex + 1))
      };
    }
    exports.nodeKeyToRedisOptions = nodeKeyToRedisOptions;
    function normalizeNodeOptions(nodes) {
      return nodes.map((node) => {
        const options = {};
        if (typeof node === "object") {
          Object.assign(options, node);
        } else if (typeof node === "string") {
          Object.assign(options, (0, utils_1.parseURL)(node));
        } else if (typeof node === "number") {
          options.port = node;
        } else {
          throw new Error("Invalid argument " + node);
        }
        if (typeof options.port === "string") {
          options.port = parseInt(options.port, 10);
        }
        delete options.db;
        if (!options.port) {
          options.port = 6379;
        }
        if (!options.host) {
          options.host = "127.0.0.1";
        }
        return (0, utils_1.resolveTLSProfile)(options);
      });
    }
    exports.normalizeNodeOptions = normalizeNodeOptions;
    function getUniqueHostnamesFromOptions(nodes) {
      const uniqueHostsMap = {};
      nodes.forEach((node) => {
        uniqueHostsMap[node.host] = true;
      });
      return Object.keys(uniqueHostsMap).filter((host) => !(0, net_1.isIP)(host));
    }
    exports.getUniqueHostnamesFromOptions = getUniqueHostnamesFromOptions;
    function groupSrvRecords(records) {
      const recordsByPriority = {};
      for (const record of records) {
        if (!recordsByPriority.hasOwnProperty(record.priority)) {
          recordsByPriority[record.priority] = {
            totalWeight: record.weight,
            records: [record]
          };
        } else {
          recordsByPriority[record.priority].totalWeight += record.weight;
          recordsByPriority[record.priority].records.push(record);
        }
      }
      return recordsByPriority;
    }
    exports.groupSrvRecords = groupSrvRecords;
    function weightSrvRecords(recordsGroup) {
      if (recordsGroup.records.length === 1) {
        recordsGroup.totalWeight = 0;
        return recordsGroup.records.shift();
      }
      const random = Math.floor(Math.random() * (recordsGroup.totalWeight + recordsGroup.records.length));
      let total = 0;
      for (const [i, record] of recordsGroup.records.entries()) {
        total += 1 + record.weight;
        if (total > random) {
          recordsGroup.totalWeight -= record.weight;
          recordsGroup.records.splice(i, 1);
          return record;
        }
      }
    }
    exports.weightSrvRecords = weightSrvRecords;
    function getConnectionName(component, nodeConnectionName) {
      const prefix = `ioredis-cluster(${component})`;
      return nodeConnectionName ? `${prefix}:${nodeConnectionName}` : prefix;
    }
    exports.getConnectionName = getConnectionName;
  }
});

// node_modules/ioredis/built/cluster/ClusterSubscriber.js
var require_ClusterSubscriber = __commonJS({
  "node_modules/ioredis/built/cluster/ClusterSubscriber.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var util_1 = require_util();
    var utils_1 = require_utils2();
    var Redis_1 = require_Redis();
    var debug = (0, utils_1.Debug)("cluster:subscriber");
    var ClusterSubscriber = class {
      constructor(connectionPool, emitter, isSharded = false) {
        this.connectionPool = connectionPool;
        this.emitter = emitter;
        this.isSharded = isSharded;
        this.started = false;
        this.subscriber = null;
        this.slotRange = [];
        this.onSubscriberEnd = () => {
          if (!this.started) {
            debug("subscriber has disconnected, but ClusterSubscriber is not started, so not reconnecting.");
            return;
          }
          debug("subscriber has disconnected, selecting a new one...");
          this.selectSubscriber();
        };
        this.connectionPool.on("-node", (_, key) => {
          if (!this.started || !this.subscriber) {
            return;
          }
          if ((0, util_1.getNodeKey)(this.subscriber.options) === key) {
            debug("subscriber has left, selecting a new one...");
            this.selectSubscriber();
          }
        });
        this.connectionPool.on("+node", () => {
          if (!this.started || this.subscriber) {
            return;
          }
          debug("a new node is discovered and there is no subscriber, selecting a new one...");
          this.selectSubscriber();
        });
      }
      getInstance() {
        return this.subscriber;
      }
      /**
       * Associate this subscriber to a specific slot range.
       *
       * Returns the range or an empty array if the slot range couldn't be associated.
       *
       * BTW: This is more for debugging and testing purposes.
       *
       * @param range
       */
      associateSlotRange(range) {
        if (this.isSharded) {
          this.slotRange = range;
        }
        return this.slotRange;
      }
      start() {
        this.started = true;
        this.selectSubscriber();
        debug("started");
      }
      stop() {
        this.started = false;
        if (this.subscriber) {
          this.subscriber.disconnect();
          this.subscriber = null;
        }
      }
      isStarted() {
        return this.started;
      }
      selectSubscriber() {
        const lastActiveSubscriber = this.lastActiveSubscriber;
        if (lastActiveSubscriber) {
          lastActiveSubscriber.off("end", this.onSubscriberEnd);
          lastActiveSubscriber.disconnect();
        }
        if (this.subscriber) {
          this.subscriber.off("end", this.onSubscriberEnd);
          this.subscriber.disconnect();
        }
        const sampleNode = (0, utils_1.sample)(this.connectionPool.getNodes());
        if (!sampleNode) {
          debug("selecting subscriber failed since there is no node discovered in the cluster yet");
          this.subscriber = null;
          return;
        }
        const { options } = sampleNode;
        debug("selected a subscriber %s:%s", options.host, options.port);
        let connectionPrefix = "subscriber";
        if (this.isSharded)
          connectionPrefix = "ssubscriber";
        this.subscriber = new Redis_1.default({
          port: options.port,
          host: options.host,
          username: options.username,
          password: options.password,
          enableReadyCheck: true,
          connectionName: (0, util_1.getConnectionName)(connectionPrefix, options.connectionName),
          lazyConnect: true,
          tls: options.tls,
          protocol: options.protocol,
          replyMapping: options.replyMapping,
          // Don't try to reconnect the subscriber connection. If the connection fails
          // we will get an end event (handled below), at which point we'll pick a new
          // node from the pool and try to connect to that as the subscriber connection.
          retryStrategy: null
        });
        this.subscriber.on("error", utils_1.noop);
        this.subscriber.on("moved", () => {
          this.emitter.emit("forceRefresh");
        });
        this.subscriber.once("end", this.onSubscriberEnd);
        const previousChannels = { subscribe: [], psubscribe: [], ssubscribe: [] };
        if (lastActiveSubscriber) {
          const condition = lastActiveSubscriber.condition || lastActiveSubscriber.prevCondition;
          if (condition && condition.subscriber) {
            previousChannels.subscribe = condition.subscriber.channels("subscribe");
            previousChannels.psubscribe = condition.subscriber.channels("psubscribe");
            previousChannels.ssubscribe = condition.subscriber.channels("ssubscribe");
          }
        }
        if (previousChannels.subscribe.length || previousChannels.psubscribe.length || previousChannels.ssubscribe.length) {
          let pending = 0;
          for (const type of ["subscribe", "psubscribe", "ssubscribe"]) {
            const channels = previousChannels[type];
            if (channels.length == 0) {
              continue;
            }
            debug("%s %d channels", type, channels.length);
            if (type === "ssubscribe") {
              for (const channel of channels) {
                pending += 1;
                this.subscriber[type](channel).then(() => {
                  if (!--pending) {
                    this.lastActiveSubscriber = this.subscriber;
                  }
                }).catch(() => {
                  debug("failed to ssubscribe to channel: %s", channel);
                });
              }
            } else {
              pending += 1;
              this.subscriber[type](channels).then(() => {
                if (!--pending) {
                  this.lastActiveSubscriber = this.subscriber;
                }
              }).catch(() => {
                debug("failed to %s %d channels", type, channels.length);
              });
            }
          }
        } else {
          this.lastActiveSubscriber = this.subscriber;
        }
        for (const event of [
          "message",
          "messageBuffer"
        ]) {
          this.subscriber.on(event, (arg1, arg2) => {
            this.emitter.emit(event, arg1, arg2);
          });
        }
        for (const event of ["pmessage", "pmessageBuffer"]) {
          this.subscriber.on(event, (arg1, arg2, arg3) => {
            this.emitter.emit(event, arg1, arg2, arg3);
          });
        }
        if (this.isSharded == true) {
          for (const event of [
            "smessage",
            "smessageBuffer"
          ]) {
            this.subscriber.on(event, (arg1, arg2) => {
              this.emitter.emit(event, arg1, arg2);
            });
          }
        }
      }
    };
    exports.default = ClusterSubscriber;
  }
});

// node_modules/ioredis/built/cluster/ConnectionPool.js
var require_ConnectionPool = __commonJS({
  "node_modules/ioredis/built/cluster/ConnectionPool.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var events_1 = __require("events");
    var utils_1 = require_utils2();
    var util_1 = require_util();
    var Redis_1 = require_Redis();
    var debug = (0, utils_1.Debug)("cluster:connectionPool");
    var ConnectionPool = class extends events_1.EventEmitter {
      constructor(redisOptions, clusterNodeRetryStrategy = null, hooks = {}) {
        super();
        this.redisOptions = redisOptions;
        this.clusterNodeRetryStrategy = clusterNodeRetryStrategy;
        this.hooks = hooks;
        this.nodes = {
          all: {},
          master: {},
          slave: {}
        };
        this.specifiedOptions = {};
      }
      getNodes(role = "all") {
        const nodes = this.nodes[role];
        return Object.keys(nodes).map((key) => nodes[key]);
      }
      getInstanceByKey(key) {
        return this.nodes.all[key];
      }
      getSampleInstance(role) {
        const keys = Object.keys(this.nodes[role]);
        const sampleKey = (0, utils_1.sample)(keys);
        return this.nodes[role][sampleKey];
      }
      /**
       * Add a master node to the pool
       * @param node
       */
      addMasterNode(node) {
        const key = (0, util_1.getNodeKey)(node.options);
        const redis = this.createRedisFromOptions(node, node.options.readOnly);
        if (!node.options.readOnly) {
          this.nodes.all[key] = redis;
          this.nodes.master[key] = redis;
          return true;
        }
        return false;
      }
      /**
       * Creates a Redis connection instance from the node options
       * @param node
       * @param readOnly
       */
      createRedisFromOptions(node, readOnly) {
        const redis = new Redis_1.default((0, utils_1.defaults)({
          // By default, never try to reconnect when a node is lost,
          // instead, waiting for a `MOVED` error and fetching slots again.
          // When `clusterNodeRetryStrategy` is set, use it to allow
          // reconnection (e.g. for replica nodes that restart without
          // any slot changes).
          retryStrategy: typeof this.clusterNodeRetryStrategy === "function" ? this.clusterNodeRetryStrategy : null,
          // Offline queue should be enabled so that
          // we don't need to wait for the `ready` event
          // before sending commands to the node.
          enableOfflineQueue: true,
          readOnly
        }, node, this.redisOptions, { lazyConnect: true }));
        this.hooks.onCreate?.(redis, readOnly);
        return redis;
      }
      /**
       * Find or create a connection to the node
       */
      findOrCreate(node, readOnly = false) {
        const key = (0, util_1.getNodeKey)(node);
        readOnly = Boolean(readOnly);
        if (this.specifiedOptions[key]) {
          Object.assign(node, this.specifiedOptions[key]);
        } else {
          this.specifiedOptions[key] = node;
        }
        let redis;
        if (this.nodes.all[key]) {
          redis = this.nodes.all[key];
          if (redis.options.readOnly !== readOnly) {
            redis.options.readOnly = readOnly;
            debug("Change role of %s to %s", key, readOnly ? "slave" : "master");
            redis[readOnly ? "readonly" : "readwrite"]().catch(utils_1.noop);
            if (readOnly) {
              delete this.nodes.master[key];
              this.nodes.slave[key] = redis;
            } else {
              delete this.nodes.slave[key];
              this.nodes.master[key] = redis;
            }
            this.hooks.onRoleChange?.(redis, key, readOnly);
          }
        } else {
          debug("Connecting to %s as %s", key, readOnly ? "slave" : "master");
          redis = this.createRedisFromOptions(node, readOnly);
          this.nodes.all[key] = redis;
          this.nodes[readOnly ? "slave" : "master"][key] = redis;
          redis.once("end", () => {
            if (this.nodes.all[key] && this.nodes.all[key] !== redis) {
              return;
            }
            this.removeNode(key);
            this.emit("-node", redis, key);
            if (!Object.keys(this.nodes.all).length) {
              this.emit("drain");
            }
          });
          this.emit("+node", redis, key);
          redis.on("error", (error) => {
            this.emit("nodeError", error, key);
          });
        }
        return redis;
      }
      /**
       * Replace the connection to the node with a fresh one. Used when the
       * existing connection is known to be stale, e.g. after a MOVED redirect
       * that points back at the node it came from.
       */
      recreate(node, readOnly = false) {
        const key = (0, util_1.getNodeKey)(node);
        const existing = this.nodes.all[key];
        if (existing) {
          debug("Recreating connection to %s", key);
          this.removeNode(key);
          existing.disconnect();
        }
        const redis = this.findOrCreate(node, readOnly);
        if (existing) {
          this.emit("-node", existing, key);
        }
        return redis;
      }
      /**
       * Reset the pool with a set of nodes.
       * The old node will be removed.
       */
      reset(nodes) {
        debug("Reset with %O", nodes);
        const newNodes = {};
        nodes.forEach((node) => {
          const key = (0, util_1.getNodeKey)(node);
          if (!(node.readOnly && newNodes[key])) {
            newNodes[key] = node;
          }
        });
        Object.keys(this.nodes.all).forEach((key) => {
          if (!newNodes[key]) {
            debug("Disconnect %s because the node does not hold any slot", key);
            this.nodes.all[key].disconnect();
            this.removeNode(key);
          }
        });
        Object.keys(newNodes).forEach((key) => {
          const node = newNodes[key];
          this.findOrCreate(node, node.readOnly);
        });
      }
      /**
       * Remove a node from the pool.
       */
      removeNode(key) {
        const { nodes } = this;
        if (nodes.all[key]) {
          debug("Remove %s from the pool", key);
          this.hooks.onRemove?.(nodes.all[key]);
          delete nodes.all[key];
        }
        delete nodes.master[key];
        delete nodes.slave[key];
      }
    };
    exports.default = ConnectionPool;
  }
});

// node_modules/denque/index.js
var require_denque = __commonJS({
  "node_modules/denque/index.js"(exports, module) {
    "use strict";
    function Denque(array, options) {
      var options = options || {};
      this._capacity = options.capacity;
      this._head = 0;
      this._tail = 0;
      if (Array.isArray(array)) {
        this._fromArray(array);
      } else {
        this._capacityMask = 3;
        this._list = new Array(4);
      }
    }
    Denque.prototype.peekAt = function peekAt(index) {
      var i = index;
      if (i !== (i | 0)) {
        return void 0;
      }
      var len = this.size();
      if (i >= len || i < -len) return void 0;
      if (i < 0) i += len;
      i = this._head + i & this._capacityMask;
      return this._list[i];
    };
    Denque.prototype.get = function get(i) {
      return this.peekAt(i);
    };
    Denque.prototype.peek = function peek() {
      if (this._head === this._tail) return void 0;
      return this._list[this._head];
    };
    Denque.prototype.peekFront = function peekFront() {
      return this.peek();
    };
    Denque.prototype.peekBack = function peekBack() {
      return this.peekAt(-1);
    };
    Object.defineProperty(Denque.prototype, "length", {
      get: function length() {
        return this.size();
      }
    });
    Denque.prototype.size = function size() {
      if (this._head === this._tail) return 0;
      if (this._head < this._tail) return this._tail - this._head;
      else return this._capacityMask + 1 - (this._head - this._tail);
    };
    Denque.prototype.unshift = function unshift(item) {
      if (arguments.length === 0) return this.size();
      var len = this._list.length;
      this._head = this._head - 1 + len & this._capacityMask;
      this._list[this._head] = item;
      if (this._tail === this._head) this._growArray();
      if (this._capacity && this.size() > this._capacity) this.pop();
      if (this._head < this._tail) return this._tail - this._head;
      else return this._capacityMask + 1 - (this._head - this._tail);
    };
    Denque.prototype.shift = function shift() {
      var head = this._head;
      if (head === this._tail) return void 0;
      var item = this._list[head];
      this._list[head] = void 0;
      this._head = head + 1 & this._capacityMask;
      if (head < 2 && this._tail > 1e4 && this._tail <= this._list.length >>> 2) this._shrinkArray();
      return item;
    };
    Denque.prototype.push = function push(item) {
      if (arguments.length === 0) return this.size();
      var tail = this._tail;
      this._list[tail] = item;
      this._tail = tail + 1 & this._capacityMask;
      if (this._tail === this._head) {
        this._growArray();
      }
      if (this._capacity && this.size() > this._capacity) {
        this.shift();
      }
      if (this._head < this._tail) return this._tail - this._head;
      else return this._capacityMask + 1 - (this._head - this._tail);
    };
    Denque.prototype.pop = function pop() {
      var tail = this._tail;
      if (tail === this._head) return void 0;
      var len = this._list.length;
      this._tail = tail - 1 + len & this._capacityMask;
      var item = this._list[this._tail];
      this._list[this._tail] = void 0;
      if (this._head < 2 && tail > 1e4 && tail <= len >>> 2) this._shrinkArray();
      return item;
    };
    Denque.prototype.removeOne = function removeOne(index) {
      var i = index;
      if (i !== (i | 0)) {
        return void 0;
      }
      if (this._head === this._tail) return void 0;
      var size = this.size();
      var len = this._list.length;
      if (i >= size || i < -size) return void 0;
      if (i < 0) i += size;
      i = this._head + i & this._capacityMask;
      var item = this._list[i];
      var k;
      if (index < size / 2) {
        for (k = index; k > 0; k--) {
          this._list[i] = this._list[i = i - 1 + len & this._capacityMask];
        }
        this._list[i] = void 0;
        this._head = this._head + 1 + len & this._capacityMask;
      } else {
        for (k = size - 1 - index; k > 0; k--) {
          this._list[i] = this._list[i = i + 1 + len & this._capacityMask];
        }
        this._list[i] = void 0;
        this._tail = this._tail - 1 + len & this._capacityMask;
      }
      return item;
    };
    Denque.prototype.remove = function remove(index, count) {
      var i = index;
      var removed;
      var del_count = count;
      if (i !== (i | 0)) {
        return void 0;
      }
      if (this._head === this._tail) return void 0;
      var size = this.size();
      var len = this._list.length;
      if (i >= size || i < -size || count < 1) return void 0;
      if (i < 0) i += size;
      if (count === 1 || !count) {
        removed = new Array(1);
        removed[0] = this.removeOne(i);
        return removed;
      }
      if (i === 0 && i + count >= size) {
        removed = this.toArray();
        this.clear();
        return removed;
      }
      if (i + count > size) count = size - i;
      var k;
      removed = new Array(count);
      for (k = 0; k < count; k++) {
        removed[k] = this._list[this._head + i + k & this._capacityMask];
      }
      i = this._head + i & this._capacityMask;
      if (index + count === size) {
        this._tail = this._tail - count + len & this._capacityMask;
        for (k = count; k > 0; k--) {
          this._list[i = i + 1 + len & this._capacityMask] = void 0;
        }
        return removed;
      }
      if (index === 0) {
        this._head = this._head + count + len & this._capacityMask;
        for (k = count - 1; k > 0; k--) {
          this._list[i = i + 1 + len & this._capacityMask] = void 0;
        }
        return removed;
      }
      if (i < size / 2) {
        this._head = this._head + index + count + len & this._capacityMask;
        for (k = index; k > 0; k--) {
          this.unshift(this._list[i = i - 1 + len & this._capacityMask]);
        }
        i = this._head - 1 + len & this._capacityMask;
        while (del_count > 0) {
          this._list[i = i - 1 + len & this._capacityMask] = void 0;
          del_count--;
        }
        if (index < 0) this._tail = i;
      } else {
        this._tail = i;
        i = i + count + len & this._capacityMask;
        for (k = size - (count + index); k > 0; k--) {
          this.push(this._list[i++]);
        }
        i = this._tail;
        while (del_count > 0) {
          this._list[i = i + 1 + len & this._capacityMask] = void 0;
          del_count--;
        }
      }
      if (this._head < 2 && this._tail > 1e4 && this._tail <= len >>> 2) this._shrinkArray();
      return removed;
    };
    Denque.prototype.splice = function splice(index, count) {
      var i = index;
      if (i !== (i | 0)) {
        return void 0;
      }
      var size = this.size();
      if (i < 0) i += size;
      if (i > size) return void 0;
      if (arguments.length > 2) {
        var k;
        var temp;
        var removed;
        var arg_len = arguments.length;
        var len = this._list.length;
        var arguments_index = 2;
        if (!size || i < size / 2) {
          temp = new Array(i);
          for (k = 0; k < i; k++) {
            temp[k] = this._list[this._head + k & this._capacityMask];
          }
          if (count === 0) {
            removed = [];
            if (i > 0) {
              this._head = this._head + i + len & this._capacityMask;
            }
          } else {
            removed = this.remove(i, count);
            this._head = this._head + i + len & this._capacityMask;
          }
          while (arg_len > arguments_index) {
            this.unshift(arguments[--arg_len]);
          }
          for (k = i; k > 0; k--) {
            this.unshift(temp[k - 1]);
          }
        } else {
          temp = new Array(size - (i + count));
          var leng = temp.length;
          for (k = 0; k < leng; k++) {
            temp[k] = this._list[this._head + i + count + k & this._capacityMask];
          }
          if (count === 0) {
            removed = [];
            if (i != size) {
              this._tail = this._head + i + len & this._capacityMask;
            }
          } else {
            removed = this.remove(i, count);
            this._tail = this._tail - leng + len & this._capacityMask;
          }
          while (arguments_index < arg_len) {
            this.push(arguments[arguments_index++]);
          }
          for (k = 0; k < leng; k++) {
            this.push(temp[k]);
          }
        }
        return removed;
      } else {
        return this.remove(i, count);
      }
    };
    Denque.prototype.clear = function clear() {
      this._list = new Array(this._list.length);
      this._head = 0;
      this._tail = 0;
    };
    Denque.prototype.isEmpty = function isEmpty() {
      return this._head === this._tail;
    };
    Denque.prototype.toArray = function toArray() {
      return this._copyArray(false);
    };
    Denque.prototype._fromArray = function _fromArray(array) {
      var length = array.length;
      var capacity = this._nextPowerOf2(length);
      this._list = new Array(capacity);
      this._capacityMask = capacity - 1;
      this._tail = length;
      for (var i = 0; i < length; i++) this._list[i] = array[i];
    };
    Denque.prototype._copyArray = function _copyArray(fullCopy, size) {
      var src = this._list;
      var capacity = src.length;
      var length = this.length;
      size = size | length;
      if (size == length && this._head < this._tail) {
        return this._list.slice(this._head, this._tail);
      }
      var dest = new Array(size);
      var k = 0;
      var i;
      if (fullCopy || this._head > this._tail) {
        for (i = this._head; i < capacity; i++) dest[k++] = src[i];
        for (i = 0; i < this._tail; i++) dest[k++] = src[i];
      } else {
        for (i = this._head; i < this._tail; i++) dest[k++] = src[i];
      }
      return dest;
    };
    Denque.prototype._growArray = function _growArray() {
      if (this._head != 0) {
        var newList = this._copyArray(true, this._list.length << 1);
        this._tail = this._list.length;
        this._head = 0;
        this._list = newList;
      } else {
        this._tail = this._list.length;
        this._list.length <<= 1;
      }
      this._capacityMask = this._capacityMask << 1 | 1;
    };
    Denque.prototype._shrinkArray = function _shrinkArray() {
      this._list.length >>>= 1;
      this._capacityMask >>>= 1;
    };
    Denque.prototype._nextPowerOf2 = function _nextPowerOf2(num) {
      var log2 = Math.log(num) / Math.log(2);
      var nextPow2 = 1 << log2 + 1;
      return Math.max(nextPow2, 4);
    };
    module.exports = Denque;
  }
});

// node_modules/ioredis/built/cluster/DelayQueue.js
var require_DelayQueue = __commonJS({
  "node_modules/ioredis/built/cluster/DelayQueue.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var utils_1 = require_utils2();
    var Deque = require_denque();
    var debug = (0, utils_1.Debug)("delayqueue");
    var DelayQueue = class {
      constructor() {
        this.queues = {};
        this.timeouts = {};
      }
      /**
       * Add a new item to the queue
       *
       * @param bucket bucket name
       * @param item function that will run later
       * @param options
       */
      push(bucket, item, options) {
        const callback = options.callback || process.nextTick;
        if (!this.queues[bucket]) {
          this.queues[bucket] = new Deque();
        }
        const queue = this.queues[bucket];
        queue.push(item);
        if (!this.timeouts[bucket]) {
          this.timeouts[bucket] = setTimeout(() => {
            callback(() => {
              this.timeouts[bucket] = null;
              this.execute(bucket);
            });
          }, options.timeout);
        }
      }
      execute(bucket) {
        const queue = this.queues[bucket];
        if (!queue) {
          return;
        }
        const { length } = queue;
        if (!length) {
          return;
        }
        debug("send %d commands in %s queue", length, bucket);
        this.queues[bucket] = null;
        while (queue.length > 0) {
          queue.shift()();
        }
      }
    };
    exports.default = DelayQueue;
  }
});

// node_modules/ioredis/built/cluster/ShardedSubscriber.js
var require_ShardedSubscriber = __commonJS({
  "node_modules/ioredis/built/cluster/ShardedSubscriber.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var util_1 = require_util();
    var utils_1 = require_utils2();
    var Redis_1 = require_Redis();
    var debug = (0, utils_1.Debug)("cluster:subscriberGroup:shardedSubscriber");
    var SubscriberStatus = {
      IDLE: "idle",
      STARTING: "starting",
      CONNECTED: "connected",
      STOPPING: "stopping",
      ENDED: "ended"
    };
    var ALLOWED_STATUS_UPDATES = {
      [SubscriberStatus.IDLE]: [
        SubscriberStatus.STARTING,
        SubscriberStatus.STOPPING,
        SubscriberStatus.ENDED
      ],
      [SubscriberStatus.STARTING]: [
        SubscriberStatus.CONNECTED,
        SubscriberStatus.STOPPING,
        SubscriberStatus.ENDED
      ],
      [SubscriberStatus.CONNECTED]: [
        SubscriberStatus.STOPPING,
        SubscriberStatus.ENDED
      ],
      [SubscriberStatus.STOPPING]: [SubscriberStatus.ENDED],
      [SubscriberStatus.ENDED]: []
    };
    var ShardedSubscriber = class {
      constructor(emitter, options, redisOptions) {
        this.emitter = emitter;
        this.status = SubscriberStatus.IDLE;
        this.instance = null;
        this.connectPromise = null;
        this.messageListeners = /* @__PURE__ */ new Map();
        this.onEnd = () => {
          this.updateStatus(SubscriberStatus.ENDED);
          this.emitter.emit("-node", this.instance, this.nodeKey);
        };
        this.onError = (error) => {
          this.emitter.emit("nodeError", error, this.nodeKey);
        };
        this.onMoved = () => {
          this.emitter.emit("moved");
        };
        this.instance = new Redis_1.default((0, utils_1.defaults)({
          enableReadyCheck: false,
          enableOfflineQueue: true,
          connectionName: (0, util_1.getConnectionName)("ssubscriber", options.connectionName),
          /**
           * Disable auto reconnection for subscribers.
           * The ClusterSubscriberGroup will handle the reconnection.
           */
          retryStrategy: null,
          lazyConnect: true
        }, options, redisOptions));
        this.lazyConnect = redisOptions?.lazyConnect ?? true;
        this.nodeKey = (0, util_1.getNodeKey)(options);
        this.instance.on("end", this.onEnd);
        this.instance.on("error", this.onError);
        this.instance.on("moved", this.onMoved);
        for (const event of ["smessage", "smessageBuffer"]) {
          const listener = (...args) => {
            this.emitter.emit(event, ...args);
          };
          this.messageListeners.set(event, listener);
          this.instance.on(event, listener);
        }
      }
      async start() {
        if (this.connectPromise) {
          return this.connectPromise;
        }
        if (this.status === SubscriberStatus.STARTING || this.status === SubscriberStatus.CONNECTED) {
          return;
        }
        if (this.status === SubscriberStatus.ENDED || !this.instance) {
          throw new Error(`Sharded subscriber ${this.nodeKey} cannot be restarted once ended.`);
        }
        this.updateStatus(SubscriberStatus.STARTING);
        this.connectPromise = this.instance.connect();
        try {
          await this.connectPromise;
          this.updateStatus(SubscriberStatus.CONNECTED);
        } catch (err) {
          this.updateStatus(SubscriberStatus.ENDED);
          throw err;
        } finally {
          this.connectPromise = null;
        }
      }
      stop() {
        this.updateStatus(SubscriberStatus.STOPPING);
        if (this.instance) {
          this.instance.disconnect();
          this.instance.removeAllListeners();
          this.messageListeners.clear();
          this.instance = null;
        }
        this.updateStatus(SubscriberStatus.ENDED);
        debug("stopped %s", this.nodeKey);
      }
      isStarted() {
        return [
          SubscriberStatus.CONNECTED,
          SubscriberStatus.STARTING
        ].includes(this.status);
      }
      get subscriberStatus() {
        return this.status;
      }
      isHealthy() {
        return (this.status === SubscriberStatus.IDLE || this.status === SubscriberStatus.CONNECTED || this.status === SubscriberStatus.STARTING) && this.instance !== null;
      }
      getInstance() {
        return this.instance;
      }
      getNodeKey() {
        return this.nodeKey;
      }
      isLazyConnect() {
        return this.lazyConnect;
      }
      updateStatus(nextStatus) {
        if (this.status === nextStatus) {
          return;
        }
        if (!ALLOWED_STATUS_UPDATES[this.status].includes(nextStatus)) {
          debug("Invalid status transition for %s: %s -> %s", this.nodeKey, this.status, nextStatus);
          return;
        }
        this.status = nextStatus;
      }
    };
    exports.default = ShardedSubscriber;
  }
});

// node_modules/ioredis/built/cluster/ClusterSubscriberGroup.js
var require_ClusterSubscriberGroup = __commonJS({
  "node_modules/ioredis/built/cluster/ClusterSubscriberGroup.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var utils_1 = require_utils2();
    var util_1 = require_util();
    var calculateSlot = require_lib();
    var ShardedSubscriber_1 = require_ShardedSubscriber();
    var debug = (0, utils_1.Debug)("cluster:subscriberGroup");
    var ClusterSubscriberGroup = class _ClusterSubscriberGroup {
      /**
       * Register callbacks
       *
       * @param cluster
       */
      constructor(subscriberGroupEmitter, options) {
        this.subscriberGroupEmitter = subscriberGroupEmitter;
        this.options = options;
        this.shardedSubscribers = /* @__PURE__ */ new Map();
        this.clusterSlots = [];
        this.subscriberToSlotsIndex = /* @__PURE__ */ new Map();
        this.channels = /* @__PURE__ */ new Map();
        this.failedAttemptsByNode = /* @__PURE__ */ new Map();
        this.isResetting = false;
        this.pendingReset = null;
        this.handleSubscriberConnectFailed = (error, nodeKey) => {
          const currentAttempts = this.failedAttemptsByNode.get(nodeKey) || 0;
          const failedAttempts = currentAttempts + 1;
          this.failedAttemptsByNode.set(nodeKey, failedAttempts);
          const attempts = Math.min(failedAttempts, _ClusterSubscriberGroup.MAX_RETRY_ATTEMPTS);
          const backoff = Math.min(_ClusterSubscriberGroup.BASE_BACKOFF_MS * 2 ** attempts, _ClusterSubscriberGroup.MAX_BACKOFF_MS);
          const jitter = Math.floor((Math.random() - 0.5) * (backoff * 0.5));
          const delay = Math.max(0, backoff + jitter);
          debug("Failed to connect subscriber for %s. Refreshing slots in %dms", nodeKey, delay);
          this.subscriberGroupEmitter.emit("subscriberConnectFailed", {
            delay,
            error
          });
        };
        this.handleSubscriberConnectSucceeded = (nodeKey) => {
          this.failedAttemptsByNode.delete(nodeKey);
        };
      }
      /**
       * Get the responsible subscriber.
       *
       * @param slot
       */
      getResponsibleSubscriber(slot) {
        const nodeKey = this.clusterSlots[slot][0];
        const sub = this.shardedSubscribers.get(nodeKey);
        if (sub && sub.subscriberStatus === "idle") {
          sub.start().then(() => {
            this.handleSubscriberConnectSucceeded(sub.getNodeKey());
          }).catch((err) => {
            this.handleSubscriberConnectFailed(err, sub.getNodeKey());
          });
        }
        return sub;
      }
      /**
       * Adds a channel for which this subscriber group is responsible
       *
       * @param channels
       */
      addChannels(channels) {
        const slot = calculateSlot(channels[0]);
        for (const c of channels) {
          if (calculateSlot(c) !== slot) {
            return -1;
          }
        }
        const currChannels = this.channels.get(slot);
        if (!currChannels) {
          this.channels.set(slot, channels);
        } else {
          this.channels.set(slot, currChannels.concat(channels));
        }
        return Array.from(this.channels.values()).reduce((sum, array) => sum + array.length, 0);
      }
      /**
       * Removes channels for which the subscriber group is responsible by optionally unsubscribing
       * @param channels
       */
      removeChannels(channels) {
        const slot = calculateSlot(channels[0]);
        for (const c of channels) {
          if (calculateSlot(c) !== slot) {
            return -1;
          }
        }
        const slotChannels = this.channels.get(slot);
        if (slotChannels) {
          const updatedChannels = slotChannels.filter((c) => !channels.includes(c));
          this.channels.set(slot, updatedChannels);
        }
        return Array.from(this.channels.values()).reduce((sum, array) => sum + array.length, 0);
      }
      /**
       * Disconnect all subscribers and clear some of the internal state.
       */
      stop() {
        for (const s of this.shardedSubscribers.values()) {
          s.stop();
        }
        this.pendingReset = null;
        this.shardedSubscribers.clear();
        this.subscriberToSlotsIndex.clear();
      }
      /**
       * Start all not yet started subscribers
       */
      start() {
        const startPromises = [];
        for (const s of this.shardedSubscribers.values()) {
          if (this.shouldStartSubscriber(s)) {
            startPromises.push(s.start().then(() => {
              this.handleSubscriberConnectSucceeded(s.getNodeKey());
            }).catch((err) => {
              this.handleSubscriberConnectFailed(err, s.getNodeKey());
            }));
            this.subscriberGroupEmitter.emit("+subscriber");
          }
        }
        return Promise.all(startPromises);
      }
      /**
       * Resets the subscriber group by disconnecting all subscribers that are no longer needed and connecting new ones.
       */
      async reset(clusterSlots, clusterNodes) {
        if (this.isResetting) {
          this.pendingReset = { slots: clusterSlots, nodes: clusterNodes };
          return;
        }
        this.isResetting = true;
        try {
          const hasTopologyChanged = this._refreshSlots(clusterSlots);
          const hasFailedSubscribers = this.hasUnhealthySubscribers();
          if (!hasTopologyChanged && !hasFailedSubscribers) {
            debug("No topology change detected or failed subscribers. Skipping reset.");
            return;
          }
          for (const [nodeKey, shardedSubscriber] of this.shardedSubscribers) {
            if (
              // If the subscriber is still responsible for a slot range and is healthy then keep it
              this.subscriberToSlotsIndex.has(nodeKey) && shardedSubscriber.isHealthy()
            ) {
              debug("Skipping deleting subscriber for %s", nodeKey);
              continue;
            }
            debug("Removing subscriber for %s", nodeKey);
            shardedSubscriber.stop();
            this.shardedSubscribers.delete(nodeKey);
            this.subscriberGroupEmitter.emit("-subscriber");
          }
          const startPromises = [];
          for (const [nodeKey, _] of this.subscriberToSlotsIndex) {
            const existingSubscriber = this.shardedSubscribers.get(nodeKey);
            if (existingSubscriber && existingSubscriber.isHealthy()) {
              debug("Skipping creating new subscriber for %s", nodeKey);
              if (!existingSubscriber.isStarted() && this.shouldStartSubscriber(existingSubscriber)) {
                startPromises.push(existingSubscriber.start().then(() => {
                  this.handleSubscriberConnectSucceeded(nodeKey);
                }).catch((error) => {
                  this.handleSubscriberConnectFailed(error, nodeKey);
                }));
              }
              continue;
            }
            if (existingSubscriber && !existingSubscriber.isHealthy()) {
              debug("Replacing subscriber for %s", nodeKey);
              existingSubscriber.stop();
              this.shardedSubscribers.delete(nodeKey);
              this.subscriberGroupEmitter.emit("-subscriber");
            }
            debug("Creating new subscriber for %s", nodeKey);
            const redis = clusterNodes.find((node) => {
              return (0, util_1.getNodeKey)(node.options) === nodeKey;
            });
            if (!redis) {
              debug("Failed to find node for key %s", nodeKey);
              continue;
            }
            const sub = new ShardedSubscriber_1.default(this.subscriberGroupEmitter, redis.options, this.options.redisOptions);
            this.shardedSubscribers.set(nodeKey, sub);
            if (this.shouldStartSubscriber(sub)) {
              startPromises.push(sub.start().then(() => {
                this.handleSubscriberConnectSucceeded(nodeKey);
              }).catch((error) => {
                this.handleSubscriberConnectFailed(error, nodeKey);
              }));
            }
            this.subscriberGroupEmitter.emit("+subscriber");
          }
          await Promise.all(startPromises);
          this._resubscribe();
          this.subscriberGroupEmitter.emit("subscribersReady");
        } finally {
          this.isResetting = false;
          if (this.pendingReset) {
            const { slots, nodes } = this.pendingReset;
            this.pendingReset = null;
            await this.reset(slots, nodes);
          }
        }
      }
      /**
       * Refreshes the subscriber-related slot ranges
       *
       * Returns false if no refresh was needed
       *
       * @param targetSlots
       */
      _refreshSlots(targetSlots) {
        if (this._slotsAreEqual(targetSlots) && this.subscriberToSlotsIndex.size > 0) {
          debug("Nothing to refresh because the new cluster map is equal to the previous one.");
          return false;
        }
        debug("Refreshing the slots of the subscriber group.");
        this.subscriberToSlotsIndex = /* @__PURE__ */ new Map();
        for (let slot = 0; slot < targetSlots.length; slot++) {
          const node = targetSlots[slot][0];
          if (!this.subscriberToSlotsIndex.has(node)) {
            this.subscriberToSlotsIndex.set(node, []);
          }
          this.subscriberToSlotsIndex.get(node).push(Number(slot));
        }
        this.clusterSlots = JSON.parse(JSON.stringify(targetSlots));
        return true;
      }
      /**
       * Resubscribes to the previous channels
       *
       * @private
       */
      _resubscribe() {
        if (this.shardedSubscribers) {
          this.shardedSubscribers.forEach((s, nodeKey) => {
            const subscriberSlots = this.subscriberToSlotsIndex.get(nodeKey);
            if (subscriberSlots) {
              subscriberSlots.forEach((ss) => {
                const redis = s.getInstance();
                const channels = this.channels.get(ss);
                if (channels && channels.length > 0) {
                  if (!redis || redis.status === "end") {
                    return;
                  }
                  if (redis.status === "ready") {
                    redis.ssubscribe(...channels).catch((err) => {
                      debug("Failed to ssubscribe on node %s: %s", nodeKey, err);
                    });
                  } else {
                    redis.once("ready", () => {
                      redis.ssubscribe(...channels).catch((err) => {
                        debug("Failed to ssubscribe on node %s: %s", nodeKey, err);
                      });
                    });
                  }
                }
              });
            }
          });
        }
      }
      /**
       * Deep equality of the cluster slots objects
       *
       * @param other
       * @private
       */
      _slotsAreEqual(other) {
        if (this.clusterSlots === void 0) {
          return false;
        } else {
          return JSON.stringify(this.clusterSlots) === JSON.stringify(other);
        }
      }
      /**
       * Checks if any subscribers are in an unhealthy state.
       *
       * A subscriber is considered unhealthy if:
       * - It exists but is not started (failed/disconnected)
       * - It's missing entirely for a node that should have one
       *
       * @returns true if any subscribers need to be recreated
       */
      hasUnhealthySubscribers() {
        const hasFailedSubscribers = Array.from(this.shardedSubscribers.values()).some((sub) => !sub.isHealthy());
        const hasMissingSubscribers = Array.from(this.subscriberToSlotsIndex.keys()).some((nodeKey) => !this.shardedSubscribers.has(nodeKey));
        return hasFailedSubscribers || hasMissingSubscribers;
      }
      shouldStartSubscriber(sub) {
        if (sub.isStarted()) {
          return false;
        }
        if (!sub.isLazyConnect()) {
          return true;
        }
        const subscriberSlots = this.subscriberToSlotsIndex.get(sub.getNodeKey());
        if (!subscriberSlots) {
          return false;
        }
        return subscriberSlots.some((slot) => {
          const channels = this.channels.get(slot);
          return Boolean(channels && channels.length > 0);
        });
      }
    };
    ClusterSubscriberGroup.MAX_RETRY_ATTEMPTS = 10;
    ClusterSubscriberGroup.MAX_BACKOFF_MS = 2e3;
    ClusterSubscriberGroup.BASE_BACKOFF_MS = 100;
    exports.default = ClusterSubscriberGroup;
  }
});

// node_modules/ioredis/built/cluster/index.js
var require_cluster = __commonJS({
  "node_modules/ioredis/built/cluster/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var commands_1 = require_built();
    var events_1 = __require("events");
    var redis_errors_1 = require_redis_errors();
    var standard_as_callback_1 = require_built2();
    var Command_1 = require_Command();
    var ClusterAllFailedError_1 = require_ClusterAllFailedError();
    var Redis_1 = require_Redis();
    var ScanStream_1 = require_ScanStream();
    var transaction_1 = require_transaction();
    var utils_1 = require_utils2();
    var applyMixin_1 = require_applyMixin();
    var Commander_1 = require_Commander();
    var ClusterOptions_1 = require_ClusterOptions();
    var ClusterSubscriber_1 = require_ClusterSubscriber();
    var ConnectionPool_1 = require_ConnectionPool();
    var DelayQueue_1 = require_DelayQueue();
    var util_1 = require_util();
    var Deque = require_denque();
    var ClusterSubscriberGroup_1 = require_ClusterSubscriberGroup();
    var HimportCoordinator_1 = require_HimportCoordinator();
    var debug = (0, utils_1.Debug)("cluster");
    var REJECT_OVERWRITTEN_COMMANDS = /* @__PURE__ */ new WeakSet();
    var Cluster = class _Cluster extends Commander_1.default {
      /**
       * Creates an instance of Cluster.
       */
      //TODO: Add an option that enables or disables sharded PubSub
      // `redisOptions.replyMapping` carries the `ReplyMapping` class type parameter
      // so RESP3 return shapes are inferred from the options literal at construction,
      // mirroring the single-node `Redis` constructor.
      constructor(startupNodes, options = {}) {
        super();
        this.slots = [];
        this._groupsIds = {};
        this._groupsBySlot = Array(16384);
        this.isCluster = true;
        this.retryAttempts = 0;
        this.delayQueue = new DelayQueue_1.default();
        this.offlineQueue = new Deque();
        this.isRefreshing = false;
        this._refreshSlotsCacheCallbacks = [];
        this._autoPipelines = /* @__PURE__ */ new Map();
        this._runningAutoPipelines = /* @__PURE__ */ new Set();
        this._readyDelayedCallbacks = [];
        this.connectionEpoch = 0;
        events_1.EventEmitter.call(this);
        this.startupNodes = startupNodes;
        this.options = (0, utils_1.defaults)({}, options, ClusterOptions_1.DEFAULT_CLUSTER_OPTIONS, this.options);
        this.options.himportFieldsets = (0, HimportCoordinator_1.cloneHimportFieldsets)(this.options.himportFieldsets);
        const himportCoordinator = this.options.himportFieldsets?.length ? new HimportCoordinator_1.default(this.options.himportFieldsets) : void 0;
        if (himportCoordinator) {
          (0, HimportCoordinator_1.bindHimportCoordinator)(this, himportCoordinator, "cluster");
        }
        if (this.options.shardedSubscribers) {
          this.createShardedSubscriberGroup();
        }
        if (this.options.redisOptions && this.options.redisOptions.keyPrefix && !this.options.keyPrefix) {
          this.options.keyPrefix = this.options.redisOptions.keyPrefix;
        }
        if (typeof this.options.scaleReads !== "function" && ["all", "master", "slave"].indexOf(this.options.scaleReads) === -1) {
          throw new Error('Invalid option scaleReads "' + this.options.scaleReads + '". Expected "all", "master", "slave" or a custom function');
        }
        const redisOptions = { ...this.options.redisOptions ?? {} };
        delete redisOptions.himportFieldsets;
        this.connectionPool = new ConnectionPool_1.default(redisOptions, this.options.clusterNodeRetryStrategy, himportCoordinator ? {
          onCreate: (redis, readOnly) => {
            (0, HimportCoordinator_1.bindHimportCoordinator)(redis, himportCoordinator, readOnly ? "replica" : "master");
          },
          onRoleChange: (redis, key, readOnly) => {
            (0, HimportCoordinator_1.setHimportRole)(redis, readOnly ? "replica" : "master");
            himportCoordinator.invalidate(redis);
            if (!readOnly) {
              (0, util_1.waitForRedisReady)(redis).then(() => {
                for (const definition of himportCoordinator.getDefinitions()) {
                  const preparation = himportCoordinator.ensurePrepared(redis, definition);
                  preparation?.catch((error) => {
                    this.emit("node error", error, key);
                  });
                }
              }, (error) => {
                this.emit("node error", error, key);
              });
            }
          },
          onRemove: (redis) => {
            (0, HimportCoordinator_1.unbindHimportCoordinator)(redis);
          }
        } : void 0);
        this.connectionPool.on("-node", (redis, key) => {
          this.emit("-node", redis);
        });
        this.connectionPool.on("+node", (redis) => {
          this.emit("+node", redis);
        });
        this.connectionPool.on("drain", () => {
          this.setStatus("close");
        });
        this.connectionPool.on("nodeError", (error, key) => {
          this.emit("node error", error, key);
        });
        this.subscriber = new ClusterSubscriber_1.default(this.connectionPool, this);
        if (this.options.scripts) {
          Object.entries(this.options.scripts).forEach(([name, definition]) => {
            this.defineCommand(name, definition);
          });
        }
        if (this.options.lazyConnect) {
          this.setStatus("wait");
        } else {
          this.connect().catch((err) => {
            debug("connecting failed: %s", err);
          });
        }
      }
      /**
       * Connect to a cluster
       */
      connect() {
        return new Promise((resolve, reject) => {
          if (this.status === "connecting" || this.status === "connect" || this.status === "ready") {
            reject(new Error("Redis is already connecting/connected"));
            return;
          }
          const epoch = ++this.connectionEpoch;
          this.setStatus("connecting");
          this.resolveStartupNodeHostnames().then((nodes) => {
            if (this.connectionEpoch !== epoch) {
              debug("discard connecting after resolving startup nodes because epoch not match: %d != %d", epoch, this.connectionEpoch);
              reject(new redis_errors_1.RedisError("Connection is discarded because a new connection is made"));
              return;
            }
            if (this.status !== "connecting") {
              debug("discard connecting after resolving startup nodes because the status changed to %s", this.status);
              reject(new redis_errors_1.RedisError("Connection is aborted"));
              return;
            }
            this.connectionPool.reset(nodes);
            if (this.options.shardedSubscribers) {
              this.shardedSubscribers.reset(this.slots, this.connectionPool.getNodes("all")).catch((err) => {
                debug("Error while starting subscribers: %s", err);
              });
            }
            const readyHandler = () => {
              this.setStatus("ready");
              this.retryAttempts = 0;
              this.executeOfflineCommands();
              this.resetNodesRefreshInterval();
              resolve();
            };
            let closeListener = void 0;
            const refreshListener = () => {
              this.invokeReadyDelayedCallbacks(void 0);
              this.removeListener("close", closeListener);
              this.manuallyClosing = false;
              this.setStatus("connect");
              if (this.options.enableReadyCheck) {
                this.readyCheck((err, fail) => {
                  if (err || fail) {
                    debug("Ready check failed (%s). Reconnecting...", err || fail);
                    if (this.status === "connect") {
                      this.disconnect(true);
                    }
                  } else {
                    readyHandler();
                  }
                });
              } else {
                readyHandler();
              }
            };
            closeListener = () => {
              const error = new Error("None of startup nodes is available");
              this.removeListener("refresh", refreshListener);
              this.invokeReadyDelayedCallbacks(error);
              reject(error);
            };
            this.once("refresh", refreshListener);
            this.once("close", closeListener);
            this.once("close", this.handleCloseEvent.bind(this));
            this.refreshSlotsCache((err) => {
              if (err && err.message === ClusterAllFailedError_1.default.defaultMessage) {
                Redis_1.default.prototype.silentEmit.call(this, "error", err);
                this.connectionPool.reset([]);
              }
            });
            this.subscriber.start();
            if (this.options.shardedSubscribers) {
              this.shardedSubscribers.start().catch((err) => {
                debug("Error while starting subscribers: %s", err);
              });
            }
          }).catch((err) => {
            this.setStatus("close");
            this.handleCloseEvent(err);
            this.invokeReadyDelayedCallbacks(err);
            reject(err);
          });
        });
      }
      /**
       * Disconnect from every node in the cluster.
       */
      disconnect(reconnect = false) {
        const status = this.status;
        this.setStatus("disconnecting");
        if (!reconnect) {
          this.manuallyClosing = true;
        }
        if (this.reconnectTimeout && !reconnect) {
          clearTimeout(this.reconnectTimeout);
          this.reconnectTimeout = null;
          debug("Canceled reconnecting attempts");
        }
        this.clearNodesRefreshInterval();
        this.subscriber.stop();
        if (this.options.shardedSubscribers) {
          this.shardedSubscribers.stop();
        }
        if (status === "wait") {
          this.setStatus("close");
          this.handleCloseEvent();
        } else {
          this.connectionPool.reset([]);
        }
      }
      /**
       * Quit the cluster gracefully.
       */
      quit(callback) {
        const status = this.status;
        this.setStatus("disconnecting");
        this.manuallyClosing = true;
        if (this.reconnectTimeout) {
          clearTimeout(this.reconnectTimeout);
          this.reconnectTimeout = null;
        }
        this.clearNodesRefreshInterval();
        this.subscriber.stop();
        if (this.options.shardedSubscribers) {
          this.shardedSubscribers.stop();
        }
        if (status === "wait") {
          const ret = (0, standard_as_callback_1.default)(Promise.resolve("OK"), callback);
          setImmediate(function() {
            this.setStatus("close");
            this.handleCloseEvent();
          }.bind(this));
          return ret;
        }
        return (0, standard_as_callback_1.default)(Promise.all(this.nodes().map((node) => node.quit().catch((err) => {
          if (err.message === utils_1.CONNECTION_CLOSED_ERROR_MSG) {
            return "OK";
          }
          throw err;
        }))).then(() => "OK"), callback);
      }
      /**
       * Create a new instance with the same startup nodes and options as the current one.
       *
       * @example
       * ```js
       * var cluster = new Redis.Cluster([{ host: "127.0.0.1", port: "30001" }]);
       * var anotherCluster = cluster.duplicate();
       * ```
       */
      duplicate(overrideStartupNodes = [], overrideOptions) {
        const startupNodes = overrideStartupNodes.length > 0 ? overrideStartupNodes : this.startupNodes.slice(0);
        const options = Object.assign({}, this.options, overrideOptions);
        if (this.options.redisOptions && overrideOptions?.redisOptions) {
          options.redisOptions = Object.assign({}, this.options.redisOptions, overrideOptions.redisOptions);
        }
        return new _Cluster(startupNodes, options);
      }
      /**
       * Get nodes with the specified role
       */
      nodes(role = "all") {
        if (role !== "all" && role !== "master" && role !== "slave") {
          throw new Error('Invalid role "' + role + '". Expected "all", "master" or "slave"');
        }
        return this.connectionPool.getNodes(role);
      }
      /**
       * This is needed in order not to install a listener for each auto pipeline
       *
       * @ignore
       */
      delayUntilReady(callback) {
        this._readyDelayedCallbacks.push(callback);
      }
      /**
       * Get the number of commands queued in automatic pipelines.
       *
       * This is not available (and returns 0) until the cluster is connected and slots information have been received.
       */
      get autoPipelineQueueSize() {
        let queued = 0;
        for (const pipeline of this._autoPipelines.values()) {
          queued += pipeline.length;
        }
        return queued;
      }
      /**
       * Refresh the slot cache
       *
       * @ignore
       */
      refreshSlotsCache(callback) {
        if (callback) {
          this._refreshSlotsCacheCallbacks.push(callback);
        }
        if (this.isRefreshing) {
          return;
        }
        this.isRefreshing = true;
        const _this = this;
        const wrapper = (error) => {
          this.isRefreshing = false;
          for (const callback2 of this._refreshSlotsCacheCallbacks) {
            callback2(error);
          }
          this._refreshSlotsCacheCallbacks = [];
        };
        const nodes = (0, utils_1.shuffle)(this.connectionPool.getNodes());
        let lastNodeError = null;
        function tryNode(index) {
          if (index === nodes.length) {
            const error = new ClusterAllFailedError_1.default(ClusterAllFailedError_1.default.defaultMessage, lastNodeError);
            return wrapper(error);
          }
          const node = nodes[index];
          const key = `${node.options.host}:${node.options.port}`;
          debug("getting slot cache from %s", key);
          _this.getInfoFromNode(node, function(err) {
            switch (_this.status) {
              case "close":
              case "end":
                return wrapper(new Error("Cluster is disconnected."));
              case "disconnecting":
                return wrapper(new Error("Cluster is disconnecting."));
            }
            if (err) {
              _this.emit("node error", err, key);
              lastNodeError = err;
              tryNode(index + 1);
            } else {
              _this.emit("refresh");
              wrapper();
            }
          });
        }
        tryNode(0);
      }
      /**
       * @ignore
       */
      sendCommand(command, stream, node) {
        if (this.status === "wait") {
          this.connect().catch(utils_1.noop);
        }
        if (this.status === "end") {
          command.reject(new Error(utils_1.CONNECTION_CLOSED_ERROR_MSG));
          return command.promise;
        }
        if (!stream && !node && this.status === "ready" && (0, HimportCoordinator_1.isHimportControlCommand)(command) && (0, HimportCoordinator_1.interceptHimportControlCommand)(this.connectionPool.getNodes("master"), command)) {
          return command.promise;
        }
        let to = this.options.scaleReads;
        if (to !== "master") {
          const isCommandReadOnly = command.isReadOnly || (0, commands_1.exists)(command.name) && (0, commands_1.hasFlag)(command.name, "readonly");
          if (!isCommandReadOnly) {
            to = "master";
          }
        }
        let targetSlot = node ? node.slot : command.getSlot();
        const ttl = {};
        const _this = this;
        let lastRedis = null;
        if (!node && !REJECT_OVERWRITTEN_COMMANDS.has(command)) {
          REJECT_OVERWRITTEN_COMMANDS.add(command);
          const reject = command.reject;
          command.reject = function(err) {
            const partialTry = tryConnection.bind(null, true);
            _this.handleError(err, ttl, {
              moved: function(slot, key) {
                debug("command %s is moved to %s", command.name, key);
                targetSlot = Number(slot);
                if (_this.slots[slot]) {
                  _this.slots[slot][0] = key;
                } else {
                  _this.slots[slot] = [key];
                }
                _this._groupsBySlot[slot] = _this._groupsIds[_this.slots[slot].join(";")];
                const mapped = _this.natMapper(key);
                const mappedKey = (0, util_1.getNodeKey)(mapped);
                if (lastRedis && (0, util_1.getNodeKey)(lastRedis.options) === mappedKey && _this.connectionPool.getInstanceByKey(mappedKey) === lastRedis) {
                  debug("MOVED redirect points back at %s; recreating its connection", mappedKey);
                  _this.connectionPool.recreate(mapped);
                } else {
                  _this.connectionPool.findOrCreate(mapped);
                }
                tryConnection();
                debug("refreshing slot caches... (triggered by MOVED error)");
                _this.refreshSlotsCache();
              },
              ask: function(slot, key) {
                debug("command %s is required to ask %s:%s", command.name, key);
                const mapped = _this.natMapper(key);
                _this.connectionPool.findOrCreate(mapped);
                tryConnection(false, `${mapped.host}:${mapped.port}`);
              },
              tryagain: partialTry,
              clusterDown: partialTry,
              connectionClosed: partialTry,
              maxRedirections: function(redirectionError) {
                reject.call(command, redirectionError);
              },
              defaults: function() {
                reject.call(command, err);
              }
            });
          };
        }
        tryConnection();
        function tryConnection(random, asking) {
          if (_this.status === "end") {
            command.reject(new redis_errors_1.AbortError("Cluster is ended."));
            return;
          }
          let redis;
          if (_this.status === "ready" || command.name === "cluster") {
            if (node && node.redis) {
              redis = node.redis;
            } else if (Command_1.default.checkFlag("ENTER_SUBSCRIBER_MODE", command.name) || Command_1.default.checkFlag("EXIT_SUBSCRIBER_MODE", command.name)) {
              if (_this.options.shardedSubscribers && (command.name == "ssubscribe" || command.name == "sunsubscribe")) {
                const sub = _this.shardedSubscribers.getResponsibleSubscriber(targetSlot);
                if (!sub) {
                  command.reject(new redis_errors_1.AbortError(`No sharded subscriber for slot: ${targetSlot}`));
                  return;
                }
                let status = -1;
                if (command.name == "ssubscribe") {
                  status = _this.shardedSubscribers.addChannels(command.getKeys());
                }
                if (command.name == "sunsubscribe") {
                  status = _this.shardedSubscribers.removeChannels(command.getKeys());
                }
                if (status !== -1) {
                  redis = sub.getInstance();
                } else {
                  command.reject(new redis_errors_1.AbortError("Possible CROSSSLOT error: All channels must hash to the same slot"));
                }
              } else {
                redis = _this.subscriber.getInstance();
              }
              if (!redis) {
                command.reject(new redis_errors_1.AbortError("No subscriber for the cluster"));
                return;
              }
            } else {
              if (!random) {
                if (typeof targetSlot === "number" && _this.slots[targetSlot]) {
                  const nodeKeys = _this.slots[targetSlot];
                  if (typeof to === "function") {
                    const nodes = nodeKeys.map(function(key) {
                      return _this.connectionPool.getInstanceByKey(key);
                    });
                    redis = to(nodes, command);
                    if (Array.isArray(redis)) {
                      redis = (0, utils_1.sample)(redis);
                    }
                    if (!redis) {
                      redis = nodes[0];
                    }
                  } else {
                    let key;
                    if (to === "all") {
                      key = (0, utils_1.sample)(nodeKeys);
                    } else if (to === "slave" && nodeKeys.length > 1) {
                      key = (0, utils_1.sample)(nodeKeys, 1);
                    } else {
                      key = nodeKeys[0];
                    }
                    redis = _this.connectionPool.getInstanceByKey(key);
                  }
                }
                if (asking) {
                  redis = _this.connectionPool.getInstanceByKey(asking);
                }
              }
              if (!redis) {
                redis = (typeof to === "function" ? null : _this.connectionPool.getSampleInstance(to)) || _this.connectionPool.getSampleInstance("all");
              }
              if (redis && !_this.options.enableOfflineQueue && redis.status !== "ready" && redis.status !== "wait") {
                command.reject(new Error(utils_1.CONNECTION_CLOSED_ERROR_MSG));
                return;
              }
            }
            if (node && !node.redis) {
              node.redis = redis;
            }
          }
          if (!redis && _this.options.enableOfflineQueue) {
            _this.offlineQueue.push({
              command,
              stream,
              node
            });
            return;
          }
          if (!redis) {
            command.reject(new Error("Cluster isn't ready and enableOfflineQueue options is false"));
            return;
          }
          lastRedis = redis;
          if (asking) {
            const himportBinding = (0, HimportCoordinator_1.getHimportBinding)(redis);
            const managedSet = !stream && himportBinding?.role === "master" ? himportBinding.coordinator.classify(command) : void 0;
            if (managedSet) {
              (0, util_1.waitForRedisReady)(redis).then(() => {
                if (command.isSettled) {
                  return;
                }
                const preparation = himportBinding.coordinator.prepareCommand(redis, command);
                return preparation ?? Promise.resolve();
              }).then(() => {
                if (command.isSettled) {
                  return;
                }
                himportBinding.coordinator.allowNextSend(redis, command);
                redis.asking();
                redis.sendCommand(command, stream);
              }, (error) => {
                if (!command.isSettled) {
                  command.reject(error);
                }
              });
              return;
            }
            redis.asking();
          }
          redis.sendCommand(command, stream);
        }
        return command.promise;
      }
      sscanStream(key, options) {
        return this.createScanStream("sscan", { key, options });
      }
      sscanBufferStream(key, options) {
        return this.createScanStream("sscanBuffer", { key, options });
      }
      hscanStream(key, options) {
        return this.createScanStream("hscan", { key, options });
      }
      hscanBufferStream(key, options) {
        return this.createScanStream("hscanBuffer", { key, options });
      }
      zscanStream(key, options) {
        return this.createScanStream("zscan", { key, options });
      }
      zscanBufferStream(key, options) {
        return this.createScanStream("zscanBuffer", { key, options });
      }
      /**
       * @ignore
       */
      handleError(error, ttl, handlers) {
        if (typeof ttl.value === "undefined") {
          ttl.value = this.options.maxRedirections;
        } else {
          ttl.value -= 1;
        }
        if (ttl.value <= 0) {
          handlers.maxRedirections(new Error("Too many Cluster redirections. Last error: " + error));
          return;
        }
        const errv = error.message.split(" ");
        if (errv[0] === "MOVED") {
          const slot = Number(errv[1]);
          if (!Number.isInteger(slot) || slot < 0 || slot >= 16384) {
            handlers.defaults();
            return;
          }
          const timeout = this.options.retryDelayOnMoved;
          if (timeout && typeof timeout === "number") {
            this.delayQueue.push("moved", handlers.moved.bind(null, slot, errv[2]), { timeout });
          } else {
            handlers.moved(slot, errv[2]);
          }
        } else if (errv[0] === "ASK") {
          handlers.ask(errv[1], errv[2]);
        } else if (errv[0] === "TRYAGAIN") {
          this.delayQueue.push("tryagain", handlers.tryagain, {
            timeout: this.options.retryDelayOnTryAgain
          });
        } else if (errv[0] === "CLUSTERDOWN" && this.options.retryDelayOnClusterDown > 0) {
          this.delayQueue.push("clusterdown", handlers.connectionClosed, {
            timeout: this.options.retryDelayOnClusterDown,
            callback: this.refreshSlotsCache.bind(this)
          });
        } else if (error.message === utils_1.CONNECTION_CLOSED_ERROR_MSG && this.options.retryDelayOnFailover > 0 && this.status === "ready") {
          this.delayQueue.push("failover", handlers.connectionClosed, {
            timeout: this.options.retryDelayOnFailover,
            callback: this.refreshSlotsCache.bind(this)
          });
        } else {
          handlers.defaults();
        }
      }
      resetOfflineQueue() {
        this.offlineQueue = new Deque();
      }
      clearNodesRefreshInterval() {
        if (this.slotsTimer) {
          clearTimeout(this.slotsTimer);
          this.slotsTimer = null;
        }
      }
      resetNodesRefreshInterval() {
        if (this.slotsTimer || !this.options.slotsRefreshInterval) {
          return;
        }
        const nextRound = () => {
          this.slotsTimer = setTimeout(() => {
            debug('refreshing slot caches... (triggered by "slotsRefreshInterval" option)');
            this.refreshSlotsCache(() => {
              nextRound();
            });
          }, this.options.slotsRefreshInterval);
        };
        nextRound();
      }
      /**
       * Change cluster instance's status
       */
      setStatus(status) {
        debug("status: %s -> %s", this.status || "[empty]", status);
        this.status = status;
        process.nextTick(() => {
          this.emit(status);
        });
      }
      /**
       * Called when closed to check whether a reconnection should be made
       */
      handleCloseEvent(reason) {
        if (reason) {
          debug("closed because %s", reason);
        }
        let retryDelay;
        if (!this.manuallyClosing && typeof this.options.clusterRetryStrategy === "function") {
          retryDelay = this.options.clusterRetryStrategy.call(this, ++this.retryAttempts, reason);
        }
        if (typeof retryDelay === "number") {
          this.setStatus("reconnecting");
          this.reconnectTimeout = setTimeout(() => {
            this.reconnectTimeout = null;
            debug("Cluster is disconnected. Retrying after %dms", retryDelay);
            this.connect().catch(function(err) {
              debug("Got error %s when reconnecting. Ignoring...", err);
            });
          }, retryDelay);
        } else {
          if (this.options.shardedSubscribers) {
            this.subscriberGroupEmitter?.removeAllListeners();
          }
          this.setStatus("end");
          this.flushQueue(new Error("None of startup nodes is available"));
        }
      }
      /**
       * Flush offline queue with error.
       */
      flushQueue(error) {
        let item;
        while (item = this.offlineQueue.shift()) {
          item.command.reject(error);
        }
      }
      executeOfflineCommands() {
        if (this.offlineQueue.length) {
          debug("send %d commands in offline queue", this.offlineQueue.length);
          const offlineQueue = this.offlineQueue;
          this.resetOfflineQueue();
          let item;
          while (item = offlineQueue.shift()) {
            this.sendCommand(item.command, item.stream, item.node);
          }
        }
      }
      natMapper(nodeKey) {
        const key = typeof nodeKey === "string" ? nodeKey : `${nodeKey.host}:${nodeKey.port}`;
        let mapped = null;
        if (this.options.natMap && typeof this.options.natMap === "function") {
          mapped = this.options.natMap(key);
        } else if (this.options.natMap && typeof this.options.natMap === "object") {
          mapped = this.options.natMap[key];
        }
        if (mapped) {
          debug("NAT mapping %s -> %O", key, mapped);
          return Object.assign({}, mapped);
        }
        return typeof nodeKey === "string" ? (0, util_1.nodeKeyToRedisOptions)(nodeKey) : nodeKey;
      }
      getInfoFromNode(redis, callback) {
        if (!redis) {
          return callback(new Error("Node is disconnected"));
        }
        const duplicatedConnection = redis.duplicate({
          enableOfflineQueue: true,
          enableReadyCheck: false,
          retryStrategy: null,
          protocol: 2,
          replyMapping: "legacy",
          connectionName: (0, util_1.getConnectionName)("refresher", this.options.redisOptions && this.options.redisOptions.connectionName)
        });
        duplicatedConnection.on("error", utils_1.noop);
        duplicatedConnection.cluster("SLOTS", (0, utils_1.timeout)((err, result) => {
          duplicatedConnection.disconnect();
          if (err) {
            debug("error encountered running CLUSTER.SLOTS: %s", err);
            return callback(err);
          }
          if (this.status === "disconnecting" || this.status === "close" || this.status === "end") {
            debug("ignore CLUSTER.SLOTS results (count: %d) since cluster status is %s", result.length, this.status);
            callback();
            return;
          }
          const nodes = [];
          debug("cluster slots result count: %d", result.length);
          for (let i = 0; i < result.length; ++i) {
            const items = result[i];
            const slotRangeStart = items[0];
            const slotRangeEnd = items[1];
            const keys = [];
            for (let j2 = 2; j2 < items.length; j2++) {
              if (!items[j2][0]) {
                continue;
              }
              const node = this.natMapper({
                host: items[j2][0],
                port: items[j2][1]
              });
              node.readOnly = j2 !== 2;
              nodes.push(node);
              keys.push(node.host + ":" + node.port);
            }
            debug("cluster slots result [%d]: slots %d~%d served by %s", i, slotRangeStart, slotRangeEnd, keys);
            for (let slot = slotRangeStart; slot <= slotRangeEnd; slot++) {
              this.slots[slot] = keys;
            }
          }
          this._groupsIds = /* @__PURE__ */ Object.create(null);
          let j = 0;
          for (let i = 0; i < 16384; i++) {
            const target = (this.slots[i] || []).join(";");
            if (!target.length) {
              this._groupsBySlot[i] = void 0;
              continue;
            }
            if (!this._groupsIds[target]) {
              this._groupsIds[target] = ++j;
            }
            this._groupsBySlot[i] = this._groupsIds[target];
          }
          this.connectionPool.reset(nodes);
          if (this.options.shardedSubscribers) {
            this.shardedSubscribers.reset(this.slots, this.connectionPool.getNodes("all")).catch((err2) => {
              debug("Error while starting subscribers: %s", err2);
            });
          }
          callback();
        }, this.options.slotsRefreshTimeout));
      }
      invokeReadyDelayedCallbacks(err) {
        for (const c of this._readyDelayedCallbacks) {
          process.nextTick(c, err);
        }
        this._readyDelayedCallbacks = [];
      }
      /**
       * Check whether Cluster is able to process commands
       */
      readyCheck(callback) {
        this.cluster("INFO", (err, res) => {
          if (err) {
            return callback(err);
          }
          if (typeof res !== "string") {
            return callback();
          }
          let state;
          const lines = res.split("\r\n");
          for (let i = 0; i < lines.length; ++i) {
            const parts = lines[i].split(":");
            if (parts[0] === "cluster_state") {
              state = parts[1];
              break;
            }
          }
          if (state === "fail") {
            debug("cluster state not ok (%s)", state);
            callback(null, state);
          } else {
            callback();
          }
        });
      }
      resolveSrv(hostname) {
        return new Promise((resolve, reject) => {
          this.options.resolveSrv(hostname, (err, records) => {
            if (err) {
              return reject(err);
            }
            const self = this, groupedRecords = (0, util_1.groupSrvRecords)(records), sortedKeys = Object.keys(groupedRecords).sort((a, b) => parseInt(a) - parseInt(b));
            function tryFirstOne(err2) {
              if (!sortedKeys.length) {
                return reject(err2);
              }
              const key = sortedKeys[0], group = groupedRecords[key], record = (0, util_1.weightSrvRecords)(group);
              if (!group.records.length) {
                sortedKeys.shift();
              }
              self.dnsLookup(record.name).then((host) => resolve({
                host,
                port: record.port
              }), tryFirstOne);
            }
            tryFirstOne();
          });
        });
      }
      dnsLookup(hostname) {
        return new Promise((resolve, reject) => {
          this.options.dnsLookup(hostname, (err, address) => {
            if (err) {
              debug("failed to resolve hostname %s to IP: %s", hostname, err.message);
              reject(err);
            } else {
              debug("resolved hostname %s to IP %s", hostname, address);
              resolve(address);
            }
          });
        });
      }
      /**
       * Normalize startup nodes, and resolving hostnames to IPs.
       *
       * This process happens every time when #connect() is called since
       * #startupNodes and DNS records may chanage.
       */
      async resolveStartupNodeHostnames() {
        if (!Array.isArray(this.startupNodes) || this.startupNodes.length === 0) {
          throw new Error("`startupNodes` should contain at least one node.");
        }
        const startupNodes = (0, util_1.normalizeNodeOptions)(this.startupNodes);
        const hostnames = (0, util_1.getUniqueHostnamesFromOptions)(startupNodes);
        if (hostnames.length === 0) {
          return startupNodes;
        }
        const configs = await Promise.all(hostnames.map((this.options.useSRVRecords ? this.resolveSrv : this.dnsLookup).bind(this)));
        const hostnameToConfig = (0, utils_1.zipMap)(hostnames, configs);
        return startupNodes.map((node) => {
          const config = hostnameToConfig.get(node.host);
          if (!config) {
            return node;
          }
          if (this.options.useSRVRecords) {
            return Object.assign({}, node, config);
          }
          return Object.assign({}, node, { host: config });
        });
      }
      createScanStream(command, { key, options = {} }) {
        return new ScanStream_1.default({
          objectMode: true,
          key,
          redis: this,
          command,
          ...options
        });
      }
      createShardedSubscriberGroup() {
        this.subscriberGroupEmitter = new events_1.EventEmitter();
        this.shardedSubscribers = new ClusterSubscriberGroup_1.default(this.subscriberGroupEmitter, this.options);
        const refreshSlotsCacheCallback = (err) => {
          if (err instanceof ClusterAllFailedError_1.default) {
            this.disconnect(true);
          }
        };
        this.subscriberGroupEmitter.on("-node", (redis, nodeKey) => {
          this.emit("-node", redis, nodeKey);
          this.refreshSlotsCache(refreshSlotsCacheCallback);
        });
        this.subscriberGroupEmitter.on("subscriberConnectFailed", ({ delay, error }) => {
          this.emit("error", error);
          setTimeout(() => {
            this.refreshSlotsCache(refreshSlotsCacheCallback);
          }, delay);
        });
        this.subscriberGroupEmitter.on("moved", () => {
          this.refreshSlotsCache(refreshSlotsCacheCallback);
        });
        this.subscriberGroupEmitter.on("-subscriber", () => {
          this.emit("-subscriber");
        });
        this.subscriberGroupEmitter.on("+subscriber", () => {
          this.emit("+subscriber");
        });
        this.subscriberGroupEmitter.on("nodeError", (error, nodeKey) => {
          this.emit("nodeError", error, nodeKey);
        });
        this.subscriberGroupEmitter.on("subscribersReady", () => {
          this.emit("subscribersReady");
        });
        for (const event of ["smessage", "smessageBuffer"]) {
          this.subscriberGroupEmitter.on(event, (arg1, arg2, arg3) => {
            this.emit(event, arg1, arg2, arg3);
          });
        }
      }
    };
    (0, applyMixin_1.default)(Cluster, events_1.EventEmitter);
    (0, transaction_1.addTransactionSupport)(Cluster.prototype);
    exports.default = Cluster;
  }
});

// node_modules/ioredis/built/connectors/AbstractConnector.js
var require_AbstractConnector = __commonJS({
  "node_modules/ioredis/built/connectors/AbstractConnector.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var utils_1 = require_utils2();
    var debug = (0, utils_1.Debug)("AbstractConnector");
    var AbstractConnector = class {
      constructor(disconnectTimeout) {
        this.connecting = false;
        this.disconnectTimeout = disconnectTimeout;
      }
      check(info) {
        return true;
      }
      disconnect() {
        this.connecting = false;
        if (this.stream) {
          const stream = this.stream;
          const timeout = setTimeout(() => {
            debug("stream %s:%s still open, destroying it", stream.remoteAddress, stream.remotePort);
            stream.destroy();
          }, this.disconnectTimeout);
          stream.on("close", () => clearTimeout(timeout));
          stream.end();
        }
      }
    };
    exports.default = AbstractConnector;
  }
});

// node_modules/ioredis/built/connectors/StandaloneConnector.js
var require_StandaloneConnector = __commonJS({
  "node_modules/ioredis/built/connectors/StandaloneConnector.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var net_1 = __require("net");
    var tls_1 = __require("tls");
    var utils_1 = require_utils2();
    var AbstractConnector_1 = require_AbstractConnector();
    var StandaloneConnector = class extends AbstractConnector_1.default {
      constructor(options) {
        super(options.disconnectTimeout);
        this.options = options;
      }
      connect(_) {
        const { options } = this;
        this.connecting = true;
        let connectionOptions;
        if ("path" in options && options.path) {
          connectionOptions = {
            path: options.path
          };
        } else {
          connectionOptions = {};
          if ("port" in options && options.port != null) {
            connectionOptions.port = options.port;
          }
          if ("host" in options && options.host != null) {
            connectionOptions.host = options.host;
          }
          if ("family" in options && options.family != null) {
            connectionOptions.family = options.family;
          }
        }
        if (options.tls) {
          Object.assign(connectionOptions, options.tls);
        }
        return new Promise((resolve, reject) => {
          process.nextTick(() => {
            if (!this.connecting) {
              reject(new Error(utils_1.CONNECTION_CLOSED_ERROR_MSG));
              return;
            }
            try {
              if (options.tls) {
                this.stream = (0, tls_1.connect)(connectionOptions);
              } else {
                this.stream = (0, net_1.createConnection)(connectionOptions);
              }
            } catch (err) {
              reject(err);
              return;
            }
            this.stream.once("error", (err) => {
              this.firstError = err;
            });
            resolve(this.stream);
          });
        });
      }
    };
    exports.default = StandaloneConnector;
  }
});

// node_modules/ioredis/built/connectors/SentinelConnector/SentinelIterator.js
var require_SentinelIterator = __commonJS({
  "node_modules/ioredis/built/connectors/SentinelConnector/SentinelIterator.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function isSentinelEql(a, b) {
      return (a.host || "127.0.0.1") === (b.host || "127.0.0.1") && (a.port || 26379) === (b.port || 26379);
    }
    var SentinelIterator = class {
      constructor(sentinels) {
        this.cursor = 0;
        this.sentinels = sentinels.slice(0);
      }
      next() {
        const done = this.cursor >= this.sentinels.length;
        return { done, value: done ? void 0 : this.sentinels[this.cursor++] };
      }
      reset(moveCurrentEndpointToFirst) {
        if (moveCurrentEndpointToFirst && this.sentinels.length > 1 && this.cursor !== 1) {
          this.sentinels.unshift(...this.sentinels.splice(this.cursor - 1));
        }
        this.cursor = 0;
      }
      add(sentinel) {
        for (let i = 0; i < this.sentinels.length; i++) {
          if (isSentinelEql(sentinel, this.sentinels[i])) {
            return false;
          }
        }
        this.sentinels.push(sentinel);
        return true;
      }
      toString() {
        return `${JSON.stringify(this.sentinels)} @${this.cursor}`;
      }
    };
    exports.default = SentinelIterator;
  }
});

// node_modules/ioredis/built/connectors/SentinelConnector/FailoverDetector.js
var require_FailoverDetector = __commonJS({
  "node_modules/ioredis/built/connectors/SentinelConnector/FailoverDetector.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.FailoverDetector = void 0;
    var utils_1 = require_utils2();
    var debug = (0, utils_1.Debug)("FailoverDetector");
    var CHANNEL_NAME = "+switch-master";
    var FailoverDetector = class {
      // sentinels can't be used for regular commands after this
      constructor(connector, sentinels) {
        this.isDisconnected = false;
        this.connector = connector;
        this.sentinels = sentinels;
      }
      cleanup() {
        this.isDisconnected = true;
        for (const sentinel of this.sentinels) {
          sentinel.client.disconnect();
        }
      }
      async subscribe() {
        debug("Starting FailoverDetector");
        const promises = [];
        for (const sentinel of this.sentinels) {
          const promise = sentinel.client.subscribe(CHANNEL_NAME).catch((err) => {
            debug("Failed to subscribe to failover messages on sentinel %s:%s (%s)", sentinel.address.host || "127.0.0.1", sentinel.address.port || 26739, err.message);
          });
          promises.push(promise);
          sentinel.client.on("message", (channel) => {
            if (!this.isDisconnected && channel === CHANNEL_NAME) {
              this.disconnect();
            }
          });
        }
        await Promise.all(promises);
      }
      disconnect() {
        this.isDisconnected = true;
        debug("Failover detected, disconnecting");
        this.connector.disconnect();
      }
    };
    exports.FailoverDetector = FailoverDetector;
  }
});

// node_modules/ioredis/built/connectors/SentinelConnector/index.js
var require_SentinelConnector = __commonJS({
  "node_modules/ioredis/built/connectors/SentinelConnector/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.SentinelIterator = void 0;
    var net_1 = __require("net");
    var utils_1 = require_utils2();
    var tls_1 = __require("tls");
    var SentinelIterator_1 = require_SentinelIterator();
    exports.SentinelIterator = SentinelIterator_1.default;
    var AbstractConnector_1 = require_AbstractConnector();
    var Redis_1 = require_Redis();
    var FailoverDetector_1 = require_FailoverDetector();
    var debug = (0, utils_1.Debug)("SentinelConnector");
    var SentinelConnector = class extends AbstractConnector_1.default {
      constructor(options) {
        super(options.disconnectTimeout);
        this.options = options;
        this.emitter = null;
        this.failoverDetector = null;
        if (!this.options.sentinels.length) {
          throw new Error("Requires at least one sentinel to connect to.");
        }
        if (!this.options.name) {
          throw new Error("Requires the name of master.");
        }
        this.sentinelIterator = new SentinelIterator_1.default(this.options.sentinels);
      }
      check(info) {
        const roleMatches = !info.role || this.options.role === info.role;
        if (!roleMatches) {
          debug("role invalid, expected %s, but got %s", this.options.role, info.role);
          this.sentinelIterator.next();
          this.sentinelIterator.next();
          this.sentinelIterator.reset(true);
        }
        return roleMatches;
      }
      disconnect() {
        super.disconnect();
        if (this.failoverDetector) {
          this.failoverDetector.cleanup();
        }
      }
      connect(eventEmitter) {
        this.connecting = true;
        this.retryAttempts = 0;
        let lastError;
        const connectToNext = async () => {
          const endpoint = this.sentinelIterator.next();
          if (endpoint.done) {
            this.sentinelIterator.reset(false);
            const retryDelay = typeof this.options.sentinelRetryStrategy === "function" ? this.options.sentinelRetryStrategy(++this.retryAttempts) : null;
            let errorMsg = typeof retryDelay !== "number" ? "All sentinels are unreachable and retry is disabled." : `All sentinels are unreachable. Retrying from scratch after ${retryDelay}ms.`;
            if (lastError) {
              errorMsg += ` Last error: ${lastError.message}`;
            }
            debug(errorMsg);
            const error = new Error(errorMsg);
            if (typeof retryDelay === "number") {
              eventEmitter("error", error);
              await new Promise((resolve) => setTimeout(resolve, retryDelay));
              return connectToNext();
            } else {
              throw error;
            }
          }
          let resolved = null;
          let err = null;
          try {
            resolved = await this.resolve(endpoint.value);
          } catch (error) {
            err = error;
          }
          if (!this.connecting) {
            throw new Error(utils_1.CONNECTION_CLOSED_ERROR_MSG);
          }
          const endpointAddress = endpoint.value.host + ":" + endpoint.value.port;
          if (resolved) {
            debug("resolved: %s:%s from sentinel %s", resolved.host, resolved.port, endpointAddress);
            if (this.options.enableTLSForSentinelMode && this.options.tls) {
              Object.assign(resolved, this.options.tls);
              this.stream = (0, tls_1.connect)(resolved);
              this.stream.once("secureConnect", this.initFailoverDetector.bind(this));
            } else {
              this.stream = (0, net_1.createConnection)(resolved);
              this.stream.once("connect", this.initFailoverDetector.bind(this));
            }
            this.stream.once("error", (err2) => {
              this.firstError = err2;
            });
            return this.stream;
          } else {
            const errorMsg = err ? "failed to connect to sentinel " + endpointAddress + " because " + err.message : "connected to sentinel " + endpointAddress + " successfully, but got an invalid reply: " + resolved;
            debug(errorMsg);
            eventEmitter("sentinelError", new Error(errorMsg));
            if (err) {
              lastError = err;
            }
            return connectToNext();
          }
        };
        return connectToNext();
      }
      async updateSentinels(client) {
        if (!this.options.updateSentinels) {
          return;
        }
        const result = await client.sentinel("sentinels", this.options.name);
        if (!Array.isArray(result)) {
          return;
        }
        result.map(utils_1.packObject).forEach((sentinel) => {
          const flags = sentinel.flags ? sentinel.flags.split(",") : [];
          if (flags.indexOf("disconnected") === -1 && sentinel.ip && sentinel.port) {
            const endpoint = this.sentinelNatResolve(addressResponseToAddress(sentinel));
            if (this.sentinelIterator.add(endpoint)) {
              debug("adding sentinel %s:%s", endpoint.host, endpoint.port);
            }
          }
        });
        debug("Updated internal sentinels: %s", this.sentinelIterator);
      }
      async resolveMaster(client) {
        const result = await client.sentinel("get-master-addr-by-name", this.options.name);
        await this.updateSentinels(client);
        return this.sentinelNatResolve(Array.isArray(result) ? { host: result[0], port: Number(result[1]) } : null);
      }
      async resolveSlave(client) {
        const result = await client.sentinel("slaves", this.options.name);
        if (!Array.isArray(result)) {
          return null;
        }
        const availableSlaves = result.map(utils_1.packObject).filter((slave) => slave.flags && !slave.flags.match(/(disconnected|s_down|o_down)/));
        return this.sentinelNatResolve(selectPreferredSentinel(availableSlaves, this.options.preferredSlaves));
      }
      sentinelNatResolve(item) {
        if (!item || !this.options.natMap)
          return item;
        const key = `${item.host}:${item.port}`;
        let result = item;
        if (typeof this.options.natMap === "function") {
          result = this.options.natMap(key) || item;
        } else if (typeof this.options.natMap === "object") {
          result = this.options.natMap[key] || item;
        }
        return result;
      }
      connectToSentinel(endpoint, options) {
        const redis = new Redis_1.default({
          port: endpoint.port || 26379,
          host: endpoint.host,
          username: this.options.sentinelUsername || null,
          password: this.options.sentinelPassword || null,
          family: endpoint.family || ("path" in this.options && this.options.path ? void 0 : this.options.family),
          tls: this.options.sentinelTLS,
          retryStrategy: null,
          enableReadyCheck: false,
          protocol: this.options.protocol,
          replyMapping: "legacy",
          connectTimeout: this.options.connectTimeout,
          commandTimeout: this.options.sentinelCommandTimeout,
          ...options
        });
        return redis;
      }
      async resolve(endpoint) {
        const client = this.connectToSentinel(endpoint);
        client.on("error", noop);
        try {
          if (this.options.role === "slave") {
            return await this.resolveSlave(client);
          } else {
            return await this.resolveMaster(client);
          }
        } finally {
          client.disconnect();
        }
      }
      async initFailoverDetector() {
        if (!this.options.failoverDetector) {
          return;
        }
        this.sentinelIterator.reset(true);
        const sentinels = [];
        while (sentinels.length < this.options.sentinelMaxConnections) {
          const { done, value } = this.sentinelIterator.next();
          if (done) {
            break;
          }
          const client = this.connectToSentinel(value, {
            lazyConnect: true,
            retryStrategy: this.options.sentinelReconnectStrategy,
            protocol: this.options.protocol,
            replyMapping: "legacy"
          });
          client.on("reconnecting", () => {
            this.emitter?.emit("sentinelReconnecting");
          });
          sentinels.push({ address: value, client });
        }
        this.sentinelIterator.reset(false);
        if (this.failoverDetector) {
          this.failoverDetector.cleanup();
        }
        this.failoverDetector = new FailoverDetector_1.FailoverDetector(this, sentinels);
        await this.failoverDetector.subscribe();
        this.emitter?.emit("failoverSubscribed");
      }
    };
    exports.default = SentinelConnector;
    function selectPreferredSentinel(availableSlaves, preferredSlaves) {
      if (availableSlaves.length === 0) {
        return null;
      }
      let selectedSlave;
      if (typeof preferredSlaves === "function") {
        selectedSlave = preferredSlaves(availableSlaves);
      } else if (preferredSlaves !== null && typeof preferredSlaves === "object") {
        const preferredSlavesArray = Array.isArray(preferredSlaves) ? [...preferredSlaves] : [preferredSlaves];
        preferredSlavesArray.sort((a, b) => {
          const aPrio = a.prio ?? 1;
          const bPrio = b.prio ?? 1;
          if (aPrio < bPrio) {
            return -1;
          }
          if (aPrio > bPrio) {
            return 1;
          }
          return 0;
        });
        for (let p = 0; p < preferredSlavesArray.length; p++) {
          for (let a = 0; a < availableSlaves.length; a++) {
            const slave = availableSlaves[a];
            if (slave.ip === preferredSlavesArray[p].ip) {
              if (slave.port === preferredSlavesArray[p].port) {
                selectedSlave = slave;
                break;
              }
            }
          }
          if (selectedSlave) {
            break;
          }
        }
      }
      if (!selectedSlave) {
        selectedSlave = (0, utils_1.sample)(availableSlaves);
      }
      return addressResponseToAddress(selectedSlave);
    }
    function addressResponseToAddress(input) {
      return { host: input.ip, port: Number(input.port) };
    }
    function noop() {
    }
  }
});

// node_modules/ioredis/built/connectors/index.js
var require_connectors = __commonJS({
  "node_modules/ioredis/built/connectors/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.SentinelConnector = exports.StandaloneConnector = void 0;
    var StandaloneConnector_1 = require_StandaloneConnector();
    exports.StandaloneConnector = StandaloneConnector_1.default;
    var SentinelConnector_1 = require_SentinelConnector();
    exports.SentinelConnector = SentinelConnector_1.default;
  }
});

// node_modules/ioredis/built/errors/MaxRetriesPerRequestError.js
var require_MaxRetriesPerRequestError = __commonJS({
  "node_modules/ioredis/built/errors/MaxRetriesPerRequestError.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var redis_errors_1 = require_redis_errors();
    var MaxRetriesPerRequestError = class extends redis_errors_1.AbortError {
      constructor(maxRetriesPerRequest) {
        const message = `Reached the max retries per request limit (which is ${maxRetriesPerRequest}). Refer to "maxRetriesPerRequest" option for details.`;
        super(message);
        Error.captureStackTrace(this, this.constructor);
      }
      get name() {
        return this.constructor.name;
      }
    };
    exports.default = MaxRetriesPerRequestError;
  }
});

// node_modules/ioredis/built/errors/index.js
var require_errors = __commonJS({
  "node_modules/ioredis/built/errors/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.MaxRetriesPerRequestError = void 0;
    var MaxRetriesPerRequestError_1 = require_MaxRetriesPerRequestError();
    exports.MaxRetriesPerRequestError = MaxRetriesPerRequestError_1.default;
  }
});

// node_modules/ioredis/built/utils/version.js
var require_version = __commonJS({
  "node_modules/ioredis/built/utils/version.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.PACKAGE_VERSION = void 0;
    exports.PACKAGE_VERSION = "6.0.0";
  }
});

// node_modules/ioredis/built/SubscriptionSet.js
var require_SubscriptionSet = __commonJS({
  "node_modules/ioredis/built/SubscriptionSet.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var SubscriptionSet = class {
      constructor() {
        this.set = {
          subscribe: {},
          psubscribe: {},
          ssubscribe: {}
        };
      }
      add(set, channel) {
        this.set[mapSet(set)][channel] = true;
      }
      del(set, channel) {
        delete this.set[mapSet(set)][channel];
      }
      channels(set) {
        return Object.keys(this.set[mapSet(set)]);
      }
      isEmpty() {
        return this.channels("subscribe").length === 0 && this.channels("psubscribe").length === 0 && this.channels("ssubscribe").length === 0;
      }
    };
    exports.default = SubscriptionSet;
    function mapSet(set) {
      if (set === "unsubscribe") {
        return "subscribe";
      }
      if (set === "punsubscribe") {
        return "psubscribe";
      }
      if (set === "sunsubscribe") {
        return "ssubscribe";
      }
      return set;
    }
  }
});

// node_modules/ioredis/built/resp/verbatim-string.js
var require_verbatim_string = __commonJS({
  "node_modules/ioredis/built/resp/verbatim-string.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.VerbatimString = void 0;
    var VerbatimString = class extends String {
      constructor(format, value) {
        super(value);
        this.format = format;
      }
    };
    exports.VerbatimString = VerbatimString;
  }
});

// node_modules/ioredis/built/resp/errors.js
var require_errors2 = __commonJS({
  "node_modules/ioredis/built/resp/errors.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.BlobError = exports.SimpleError = void 0;
    var redis_errors_1 = require_redis_errors();
    var SimpleError = class extends redis_errors_1.ReplyError {
      get name() {
        return "ReplyError";
      }
    };
    exports.SimpleError = SimpleError;
    var BlobError = class extends redis_errors_1.ReplyError {
      get name() {
        return "ReplyError";
      }
    };
    exports.BlobError = BlobError;
  }
});

// node_modules/ioredis/built/resp/decoder.js
var require_decoder = __commonJS({
  "node_modules/ioredis/built/resp/decoder.js"(exports) {
    "use strict";
    var __classPrivateFieldSet = exports && exports.__classPrivateFieldSet || function(receiver, state, value, kind, f) {
      if (kind === "m") throw new TypeError("Private method is not writable");
      if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
      if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
      return kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value), value;
    };
    var __classPrivateFieldGet = exports && exports.__classPrivateFieldGet || function(receiver, state, kind, f) {
      if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
      if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
      return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
    };
    var _Decoder_instances;
    var _a;
    var _Decoder_cursor;
    var _Decoder_next;
    var _Decoder_pushTypeMapping;
    var _Decoder_continueDecodeTypeValue;
    var _Decoder_decodeTypeValue;
    var _Decoder_handleDecodedValue;
    var _Decoder_continueDecodeValue;
    var _Decoder_decodeNull;
    var _Decoder_decodeBoolean;
    var _Decoder_decodeNumber;
    var _Decoder_maybeDecodeNumberValue;
    var _Decoder_decodeNumberValue;
    var _Decoder_decodeUnsingedNumber;
    var _Decoder_decodeBigNumber;
    var _Decoder_maybeDecodeBigNumberValue;
    var _Decoder_decodeBigNumberValue;
    var _Decoder_decodeUnsingedBigNumber;
    var _Decoder_decodeDouble;
    var _Decoder_maybeDecodeDoubleInteger;
    var _Decoder_decodeDoubleInteger;
    var _Decoder_continueDecodeDoubleInteger;
    var _Decoder_DOUBLE_DECIMAL_MULTIPLIERS;
    var _Decoder_decodeDoubleDecimal;
    var _Decoder_decodeDoubleExponent;
    var _Decoder_continueDecodeDoubleExponent;
    var _Decoder_findCRLF;
    var _Decoder_decodeSimpleString;
    var _Decoder_continueDecodeSimpleString;
    var _Decoder_decodeBlobString;
    var _Decoder_continueDecodeBlobStringLength;
    var _Decoder_decodeStringWithLength;
    var _Decoder_continueDecodeStringWithLength;
    var _Decoder_decodeBlobStringWithLength;
    var _Decoder_decodeVerbatimString;
    var _Decoder_continueDecodeVerbatimStringLength;
    var _Decoder_decodeVerbatimStringWithLength;
    var _Decoder_decodeVerbatimStringFormat;
    var _Decoder_continueDecodeVerbatimStringFormat;
    var _Decoder_decodeVerbatimStringWithFormat;
    var _Decoder_continueDecodeVerbatimStringWithFormat;
    var _Decoder_decodeSimpleError;
    var _Decoder_continueDecodeSimpleError;
    var _Decoder_decodeBlobError;
    var _Decoder_continueDecodeBlobError;
    var _Decoder_decodeNestedType;
    var _Decoder_decodeNestedTypeValue;
    var _Decoder_decodeArray;
    var _Decoder_decodeArrayWithLength;
    var _Decoder_continueDecodeArrayLength;
    var _Decoder_decodeArrayItems;
    var _Decoder_continueDecodeArrayItems;
    var _Decoder_decodeSet;
    var _Decoder_continueDecodeSetLength;
    var _Decoder_decodeSetItems;
    var _Decoder_decodeSetAsSet;
    var _Decoder_continueDecodeSetAsSet;
    var _Decoder_decodeMap;
    var _Decoder_continueDecodeMapLength;
    var _Decoder_decodeMapItems;
    var _Decoder_decodeMapAsMap;
    var _Decoder_decodeMapKey;
    var _Decoder_decodeMapKeyValue;
    var _Decoder_continueDecodeMapKey;
    var _Decoder_continueDecodeMapValue;
    var _Decoder_decodeMapAsObject;
    var _Decoder_continueDecodeMapAsObjectKey;
    var _Decoder_continueDecodeMapAsObjectValue;
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Decoder = exports.PUSH_TYPE_MAPPING = exports.RESP_TYPES = void 0;
    var verbatim_string_1 = require_verbatim_string();
    var errors_1 = require_errors2();
    exports.RESP_TYPES = {
      NULL: 95,
      // _
      BOOLEAN: 35,
      // #
      NUMBER: 58,
      // :
      BIG_NUMBER: 40,
      // (
      DOUBLE: 44,
      // ,
      SIMPLE_STRING: 43,
      // +
      BLOB_STRING: 36,
      // $
      VERBATIM_STRING: 61,
      // =
      SIMPLE_ERROR: 45,
      // -
      BLOB_ERROR: 33,
      // !
      ARRAY: 42,
      // *
      SET: 126,
      // ~
      MAP: 37,
      // %
      PUSH: 62
      // >
    };
    var ASCII = {
      "\r": 13,
      t: 116,
      "+": 43,
      "-": 45,
      "0": 48,
      ".": 46,
      i: 105,
      n: 110,
      E: 69,
      e: 101
    };
    exports.PUSH_TYPE_MAPPING = {
      [exports.RESP_TYPES.BLOB_STRING]: Buffer
    };
    var Decoder = class {
      constructor(config) {
        _Decoder_instances.add(this);
        _Decoder_cursor.set(this, 0);
        _Decoder_next.set(this, void 0);
        _Decoder_pushTypeMapping.set(this, void 0);
        this.onReply = config.onReply;
        this.onErrorReply = config.onErrorReply;
        this.onPush = config.onPush;
        this.getTypeMapping = config.getTypeMapping;
        __classPrivateFieldSet(this, _Decoder_pushTypeMapping, {
          ...config.getTypeMapping(),
          ...exports.PUSH_TYPE_MAPPING
        }, "f");
      }
      reset() {
        __classPrivateFieldSet(this, _Decoder_cursor, 0, "f");
        __classPrivateFieldSet(this, _Decoder_next, void 0, "f");
      }
      write(chunk) {
        var _b;
        if (__classPrivateFieldGet(this, _Decoder_cursor, "f") >= chunk.length) {
          __classPrivateFieldSet(this, _Decoder_cursor, __classPrivateFieldGet(this, _Decoder_cursor, "f") - chunk.length, "f");
          return;
        }
        if (__classPrivateFieldGet(this, _Decoder_next, "f")) {
          if (__classPrivateFieldGet(this, _Decoder_next, "f").call(this, chunk) || __classPrivateFieldGet(this, _Decoder_cursor, "f") >= chunk.length) {
            __classPrivateFieldSet(this, _Decoder_cursor, __classPrivateFieldGet(this, _Decoder_cursor, "f") - chunk.length, "f");
            return;
          }
        }
        do {
          const type = chunk[__classPrivateFieldGet(this, _Decoder_cursor, "f")];
          if (__classPrivateFieldSet(this, _Decoder_cursor, (_b = __classPrivateFieldGet(this, _Decoder_cursor, "f"), ++_b), "f") === chunk.length) {
            __classPrivateFieldSet(this, _Decoder_next, __classPrivateFieldGet(this, _Decoder_instances, "m", _Decoder_continueDecodeTypeValue).bind(this, type), "f");
            break;
          }
          if (__classPrivateFieldGet(this, _Decoder_instances, "m", _Decoder_decodeTypeValue).call(this, type, chunk)) {
            break;
          }
        } while (__classPrivateFieldGet(this, _Decoder_cursor, "f") < chunk.length);
        __classPrivateFieldSet(this, _Decoder_cursor, __classPrivateFieldGet(this, _Decoder_cursor, "f") - chunk.length, "f");
      }
    };
    exports.Decoder = Decoder;
    _a = Decoder, _Decoder_cursor = /* @__PURE__ */ new WeakMap(), _Decoder_next = /* @__PURE__ */ new WeakMap(), _Decoder_pushTypeMapping = /* @__PURE__ */ new WeakMap(), _Decoder_instances = /* @__PURE__ */ new WeakSet(), _Decoder_continueDecodeTypeValue = function _Decoder_continueDecodeTypeValue2(type, chunk) {
      __classPrivateFieldSet(this, _Decoder_next, void 0, "f");
      return __classPrivateFieldGet(this, _Decoder_instances, "m", _Decoder_decodeTypeValue).call(this, type, chunk);
    }, _Decoder_decodeTypeValue = function _Decoder_decodeTypeValue2(type, chunk) {
      switch (type) {
        case exports.RESP_TYPES.NULL:
          this.onReply(__classPrivateFieldGet(this, _Decoder_instances, "m", _Decoder_decodeNull).call(this));
          return false;
        case exports.RESP_TYPES.BOOLEAN:
          return __classPrivateFieldGet(this, _Decoder_instances, "m", _Decoder_handleDecodedValue).call(this, this.onReply, __classPrivateFieldGet(this, _Decoder_instances, "m", _Decoder_decodeBoolean).call(this, this.getTypeMapping()[exports.RESP_TYPES.BOOLEAN], chunk));
        case exports.RESP_TYPES.NUMBER:
          return __classPrivateFieldGet(this, _Decoder_instances, "m", _Decoder_handleDecodedValue).call(this, this.onReply, __classPrivateFieldGet(this, _Decoder_instances, "m", _Decoder_decodeNumber).call(this, this.getTypeMapping()[exports.RESP_TYPES.NUMBER], chunk));
        case exports.RESP_TYPES.BIG_NUMBER:
          return __classPrivateFieldGet(this, _Decoder_instances, "m", _Decoder_handleDecodedValue).call(this, this.onReply, __classPrivateFieldGet(this, _Decoder_instances, "m", _Decoder_decodeBigNumber).call(this, this.getTypeMapping()[exports.RESP_TYPES.BIG_NUMBER], chunk));
        case exports.RESP_TYPES.DOUBLE:
          return __classPrivateFieldGet(this, _Decoder_instances, "m", _Decoder_handleDecodedValue).call(this, this.onReply, __classPrivateFieldGet(this, _Decoder_instances, "m", _Decoder_decodeDouble).call(this, this.getTypeMapping()[exports.RESP_TYPES.DOUBLE], chunk));
        case exports.RESP_TYPES.SIMPLE_STRING:
          return __classPrivateFieldGet(this, _Decoder_instances, "m", _Decoder_handleDecodedValue).call(this, this.onReply, __classPrivateFieldGet(this, _Decoder_instances, "m", _Decoder_decodeSimpleString).call(this, this.getTypeMapping()[exports.RESP_TYPES.SIMPLE_STRING], chunk));
        case exports.RESP_TYPES.BLOB_STRING:
          return __classPrivateFieldGet(this, _Decoder_instances, "m", _Decoder_handleDecodedValue).call(this, this.onReply, __classPrivateFieldGet(this, _Decoder_instances, "m", _Decoder_decodeBlobString).call(this, this.getTypeMapping()[exports.RESP_TYPES.BLOB_STRING], chunk));
        case exports.RESP_TYPES.VERBATIM_STRING:
          return __classPrivateFieldGet(this, _Decoder_instances, "m", _Decoder_handleDecodedValue).call(this, this.onReply, __classPrivateFieldGet(this, _Decoder_instances, "m", _Decoder_decodeVerbatimString).call(this, this.getTypeMapping()[exports.RESP_TYPES.VERBATIM_STRING], chunk));
        case exports.RESP_TYPES.SIMPLE_ERROR:
          return __classPrivateFieldGet(this, _Decoder_instances, "m", _Decoder_handleDecodedValue).call(this, this.onErrorReply, __classPrivateFieldGet(this, _Decoder_instances, "m", _Decoder_decodeSimpleError).call(this, chunk));
        case exports.RESP_TYPES.BLOB_ERROR:
          return __classPrivateFieldGet(this, _Decoder_instances, "m", _Decoder_handleDecodedValue).call(this, this.onErrorReply, __classPrivateFieldGet(this, _Decoder_instances, "m", _Decoder_decodeBlobError).call(this, chunk));
        case exports.RESP_TYPES.ARRAY:
          return __classPrivateFieldGet(this, _Decoder_instances, "m", _Decoder_handleDecodedValue).call(this, this.onReply, __classPrivateFieldGet(this, _Decoder_instances, "m", _Decoder_decodeArray).call(this, this.getTypeMapping(), chunk));
        case exports.RESP_TYPES.SET:
          return __classPrivateFieldGet(this, _Decoder_instances, "m", _Decoder_handleDecodedValue).call(this, this.onReply, __classPrivateFieldGet(this, _Decoder_instances, "m", _Decoder_decodeSet).call(this, this.getTypeMapping(), chunk));
        case exports.RESP_TYPES.MAP:
          return __classPrivateFieldGet(this, _Decoder_instances, "m", _Decoder_handleDecodedValue).call(this, this.onReply, __classPrivateFieldGet(this, _Decoder_instances, "m", _Decoder_decodeMap).call(this, this.getTypeMapping(), chunk));
        case exports.RESP_TYPES.PUSH:
          return __classPrivateFieldGet(this, _Decoder_instances, "m", _Decoder_handleDecodedValue).call(this, this.onPush, __classPrivateFieldGet(this, _Decoder_instances, "m", _Decoder_decodeArray).call(this, __classPrivateFieldGet(this, _Decoder_pushTypeMapping, "f"), chunk));
        default:
          throw new Error(`Unknown RESP type ${type} "${String.fromCharCode(type)}"`);
      }
    }, _Decoder_handleDecodedValue = function _Decoder_handleDecodedValue2(cb, value) {
      if (typeof value === "function") {
        __classPrivateFieldSet(this, _Decoder_next, __classPrivateFieldGet(this, _Decoder_instances, "m", _Decoder_continueDecodeValue).bind(this, cb, value), "f");
        return true;
      }
      cb(value);
      return false;
    }, _Decoder_continueDecodeValue = function _Decoder_continueDecodeValue2(cb, next, chunk) {
      __classPrivateFieldSet(this, _Decoder_next, void 0, "f");
      return __classPrivateFieldGet(this, _Decoder_instances, "m", _Decoder_handleDecodedValue).call(this, cb, next(chunk));
    }, _Decoder_decodeNull = function _Decoder_decodeNull2() {
      __classPrivateFieldSet(this, _Decoder_cursor, __classPrivateFieldGet(this, _Decoder_cursor, "f") + 2, "f");
      return null;
    }, _Decoder_decodeBoolean = function _Decoder_decodeBoolean2(type, chunk) {
      const boolean = chunk[__classPrivateFieldGet(this, _Decoder_cursor, "f")] === ASCII.t;
      __classPrivateFieldSet(this, _Decoder_cursor, __classPrivateFieldGet(this, _Decoder_cursor, "f") + 3, "f");
      return type === Number ? boolean ? 1 : 0 : boolean;
    }, _Decoder_decodeNumber = function _Decoder_decodeNumber2(type, chunk) {
      if (type === String) {
        return __classPrivateFieldGet(this, _Decoder_instances, "m", _Decoder_decodeSimpleString).call(this, String, chunk);
      }
      switch (chunk[__classPrivateFieldGet(this, _Decoder_cursor, "f")]) {
        case ASCII["+"]:
          return __classPrivateFieldGet(this, _Decoder_instances, "m", _Decoder_maybeDecodeNumberValue).call(this, false, chunk);
        case ASCII["-"]:
          return __classPrivateFieldGet(this, _Decoder_instances, "m", _Decoder_maybeDecodeNumberValue).call(this, true, chunk);
        default:
          return __classPrivateFieldGet(this, _Decoder_instances, "m", _Decoder_decodeNumberValue).call(this, false, __classPrivateFieldGet(this, _Decoder_instances, "m", _Decoder_decodeUnsingedNumber).bind(this, 0), chunk);
      }
    }, _Decoder_maybeDecodeNumberValue = function _Decoder_maybeDecodeNumberValue2(isNegative, chunk) {
      var _b;
      const cb = __classPrivateFieldGet(this, _Decoder_instances, "m", _Decoder_decodeUnsingedNumber).bind(this, 0);
      return __classPrivateFieldSet(this, _Decoder_cursor, (_b = __classPrivateFieldGet(this, _Decoder_cursor, "f"), ++_b), "f") === chunk.length ? __classPrivateFieldGet(this, _Decoder_instances, "m", _Decoder_decodeNumberValue).bind(this, isNegative, cb) : __classPrivateFieldGet(this, _Decoder_instances, "m", _Decoder_decodeNumberValue).call(this, isNegative, cb, chunk);
    }, _Decoder_decodeNumberValue = function _Decoder_decodeNumberValue2(isNegative, numberCb, chunk) {
      const number = numberCb(chunk);
      return typeof number === "function" ? __classPrivateFieldGet(this, _Decoder_instances, "m", _Decoder_decodeNumberValue2).bind(this, isNegative, number) : isNegative ? -number : number;
    }, _Decoder_decodeUnsingedNumber = function _Decoder_decodeUnsingedNumber2(number, chunk) {
      let cursor = __classPrivateFieldGet(this, _Decoder_cursor, "f");
      do {
        const byte = chunk[cursor];
        if (byte === ASCII["\r"]) {
          __classPrivateFieldSet(this, _Decoder_cursor, cursor + 2, "f");
          return number;
        }
        number = number * 10 + byte - ASCII["0"];
      } while (++cursor < chunk.length);
      __classPrivateFieldSet(this, _Decoder_cursor, cursor, "f");
      return __classPrivateFieldGet(this, _Decoder_instances, "m", _Decoder_decodeUnsingedNumber2).bind(this, number);
    }, _Decoder_decodeBigNumber = function _Decoder_decodeBigNumber2(type, chunk) {
      if (type === String) {
        return __classPrivateFieldGet(this, _Decoder_instances, "m", _Decoder_decodeSimpleString).call(this, String, chunk);
      }
      switch (chunk[__classPrivateFieldGet(this, _Decoder_cursor, "f")]) {
        case ASCII["+"]:
          return __classPrivateFieldGet(this, _Decoder_instances, "m", _Decoder_maybeDecodeBigNumberValue).call(this, false, chunk);
        case ASCII["-"]:
          return __classPrivateFieldGet(this, _Decoder_instances, "m", _Decoder_maybeDecodeBigNumberValue).call(this, true, chunk);
        default:
          return __classPrivateFieldGet(this, _Decoder_instances, "m", _Decoder_decodeBigNumberValue).call(this, false, __classPrivateFieldGet(this, _Decoder_instances, "m", _Decoder_decodeUnsingedBigNumber).bind(this, 0n), chunk);
      }
    }, _Decoder_maybeDecodeBigNumberValue = function _Decoder_maybeDecodeBigNumberValue2(isNegative, chunk) {
      var _b;
      const cb = __classPrivateFieldGet(this, _Decoder_instances, "m", _Decoder_decodeUnsingedBigNumber).bind(this, 0n);
      return __classPrivateFieldSet(this, _Decoder_cursor, (_b = __classPrivateFieldGet(this, _Decoder_cursor, "f"), ++_b), "f") === chunk.length ? __classPrivateFieldGet(this, _Decoder_instances, "m", _Decoder_decodeBigNumberValue).bind(this, isNegative, cb) : __classPrivateFieldGet(this, _Decoder_instances, "m", _Decoder_decodeBigNumberValue).call(this, isNegative, cb, chunk);
    }, _Decoder_decodeBigNumberValue = function _Decoder_decodeBigNumberValue2(isNegative, bigNumberCb, chunk) {
      const bigNumber = bigNumberCb(chunk);
      return typeof bigNumber === "function" ? __classPrivateFieldGet(this, _Decoder_instances, "m", _Decoder_decodeBigNumberValue2).bind(this, isNegative, bigNumber) : isNegative ? -bigNumber : bigNumber;
    }, _Decoder_decodeUnsingedBigNumber = function _Decoder_decodeUnsingedBigNumber2(bigNumber, chunk) {
      let cursor = __classPrivateFieldGet(this, _Decoder_cursor, "f");
      do {
        const byte = chunk[cursor];
        if (byte === ASCII["\r"]) {
          __classPrivateFieldSet(this, _Decoder_cursor, cursor + 2, "f");
          return bigNumber;
        }
        bigNumber = bigNumber * 10n + BigInt(byte - ASCII["0"]);
      } while (++cursor < chunk.length);
      __classPrivateFieldSet(this, _Decoder_cursor, cursor, "f");
      return __classPrivateFieldGet(this, _Decoder_instances, "m", _Decoder_decodeUnsingedBigNumber2).bind(this, bigNumber);
    }, _Decoder_decodeDouble = function _Decoder_decodeDouble2(type, chunk) {
      if (type === String || type === Buffer) {
        return __classPrivateFieldGet(this, _Decoder_instances, "m", _Decoder_decodeSimpleString).call(this, type, chunk);
      }
      switch (chunk[__classPrivateFieldGet(this, _Decoder_cursor, "f")]) {
        case ASCII.n:
          __classPrivateFieldSet(this, _Decoder_cursor, __classPrivateFieldGet(this, _Decoder_cursor, "f") + 5, "f");
          return NaN;
        case ASCII["+"]:
          return __classPrivateFieldGet(this, _Decoder_instances, "m", _Decoder_maybeDecodeDoubleInteger).call(this, false, chunk);
        case ASCII["-"]:
          return __classPrivateFieldGet(this, _Decoder_instances, "m", _Decoder_maybeDecodeDoubleInteger).call(this, true, chunk);
        default:
          return __classPrivateFieldGet(this, _Decoder_instances, "m", _Decoder_decodeDoubleInteger).call(this, false, 0, chunk);
      }
    }, _Decoder_maybeDecodeDoubleInteger = function _Decoder_maybeDecodeDoubleInteger2(isNegative, chunk) {
      var _b;
      return __classPrivateFieldSet(this, _Decoder_cursor, (_b = __classPrivateFieldGet(this, _Decoder_cursor, "f"), ++_b), "f") === chunk.length ? __classPrivateFieldGet(this, _Decoder_instances, "m", _Decoder_decodeDoubleInteger).bind(this, isNegative, 0) : __classPrivateFieldGet(this, _Decoder_instances, "m", _Decoder_decodeDoubleInteger).call(this, isNegative, 0, chunk);
    }, _Decoder_decodeDoubleInteger = function _Decoder_decodeDoubleInteger2(isNegative, integer, chunk) {
      if (chunk[__classPrivateFieldGet(this, _Decoder_cursor, "f")] === ASCII.i) {
        __classPrivateFieldSet(this, _Decoder_cursor, __classPrivateFieldGet(this, _Decoder_cursor, "f") + 5, "f");
        return isNegative ? -Infinity : Infinity;
      }
      return __classPrivateFieldGet(this, _Decoder_instances, "m", _Decoder_continueDecodeDoubleInteger).call(this, isNegative, integer, chunk);
    }, _Decoder_continueDecodeDoubleInteger = function _Decoder_continueDecodeDoubleInteger2(isNegative, integer, chunk) {
      let cursor = __classPrivateFieldGet(this, _Decoder_cursor, "f");
      do {
        const byte = chunk[cursor];
        switch (byte) {
          case ASCII["."]:
            __classPrivateFieldSet(this, _Decoder_cursor, cursor + 1, "f");
            return __classPrivateFieldGet(this, _Decoder_cursor, "f") < chunk.length ? __classPrivateFieldGet(this, _Decoder_instances, "m", _Decoder_decodeDoubleDecimal).call(this, isNegative, 0, integer, chunk) : __classPrivateFieldGet(this, _Decoder_instances, "m", _Decoder_decodeDoubleDecimal).bind(this, isNegative, 0, integer);
          case ASCII.E:
          case ASCII.e: {
            __classPrivateFieldSet(this, _Decoder_cursor, cursor + 1, "f");
            const i = isNegative ? -integer : integer;
            return __classPrivateFieldGet(this, _Decoder_cursor, "f") < chunk.length ? __classPrivateFieldGet(this, _Decoder_instances, "m", _Decoder_decodeDoubleExponent).call(this, i, chunk) : __classPrivateFieldGet(this, _Decoder_instances, "m", _Decoder_decodeDoubleExponent).bind(this, i);
          }
          case ASCII["\r"]:
            __classPrivateFieldSet(this, _Decoder_cursor, cursor + 2, "f");
            return isNegative ? -integer : integer;
          default:
            integer = integer * 10 + byte - ASCII["0"];
        }
      } while (++cursor < chunk.length);
      __classPrivateFieldSet(this, _Decoder_cursor, cursor, "f");
      return __classPrivateFieldGet(this, _Decoder_instances, "m", _Decoder_continueDecodeDoubleInteger2).bind(this, isNegative, integer);
    }, _Decoder_decodeDoubleDecimal = function _Decoder_decodeDoubleDecimal2(isNegative, decimalIndex, double, chunk) {
      let cursor = __classPrivateFieldGet(this, _Decoder_cursor, "f");
      do {
        const byte = chunk[cursor];
        switch (byte) {
          case ASCII.E:
          case ASCII.e: {
            __classPrivateFieldSet(this, _Decoder_cursor, cursor + 1, "f");
            const d = isNegative ? -double : double;
            return __classPrivateFieldGet(this, _Decoder_cursor, "f") === chunk.length ? __classPrivateFieldGet(this, _Decoder_instances, "m", _Decoder_decodeDoubleExponent).bind(this, d) : __classPrivateFieldGet(this, _Decoder_instances, "m", _Decoder_decodeDoubleExponent).call(this, d, chunk);
          }
          case ASCII["\r"]:
            __classPrivateFieldSet(this, _Decoder_cursor, cursor + 2, "f");
            return isNegative ? -double : double;
        }
        if (decimalIndex < __classPrivateFieldGet(_a, _a, "f", _Decoder_DOUBLE_DECIMAL_MULTIPLIERS).length) {
          double += (byte - ASCII["0"]) * __classPrivateFieldGet(_a, _a, "f", _Decoder_DOUBLE_DECIMAL_MULTIPLIERS)[decimalIndex++];
        }
      } while (++cursor < chunk.length);
      __classPrivateFieldSet(this, _Decoder_cursor, cursor, "f");
      return __classPrivateFieldGet(this, _Decoder_instances, "m", _Decoder_decodeDoubleDecimal2).bind(this, isNegative, decimalIndex, double);
    }, _Decoder_decodeDoubleExponent = function _Decoder_decodeDoubleExponent2(double, chunk) {
      var _b, _c;
      switch (chunk[__classPrivateFieldGet(this, _Decoder_cursor, "f")]) {
        case ASCII["+"]:
          return __classPrivateFieldSet(this, _Decoder_cursor, (_b = __classPrivateFieldGet(this, _Decoder_cursor, "f"), ++_b), "f") === chunk.length ? __classPrivateFieldGet(this, _Decoder_instances, "m", _Decoder_continueDecodeDoubleExponent).bind(this, false, double, 0) : __classPrivateFieldGet(this, _Decoder_instances, "m", _Decoder_continueDecodeDoubleExponent).call(this, false, double, 0, chunk);
        case ASCII["-"]:
          return __classPrivateFieldSet(this, _Decoder_cursor, (_c = __classPrivateFieldGet(this, _Decoder_cursor, "f"), ++_c), "f") === chunk.length ? __classPrivateFieldGet(this, _Decoder_instances, "m", _Decoder_continueDecodeDoubleExponent).bind(this, true, double, 0) : __classPrivateFieldGet(this, _Decoder_instances, "m", _Decoder_continueDecodeDoubleExponent).call(this, true, double, 0, chunk);
      }
      return __classPrivateFieldGet(this, _Decoder_instances, "m", _Decoder_continueDecodeDoubleExponent).call(this, false, double, 0, chunk);
    }, _Decoder_continueDecodeDoubleExponent = function _Decoder_continueDecodeDoubleExponent2(isNegative, double, exponent, chunk) {
      let cursor = __classPrivateFieldGet(this, _Decoder_cursor, "f");
      do {
        const byte = chunk[cursor];
        if (byte === ASCII["\r"]) {
          __classPrivateFieldSet(this, _Decoder_cursor, cursor + 2, "f");
          return double * 10 ** (isNegative ? -exponent : exponent);
        }
        exponent = exponent * 10 + byte - ASCII["0"];
      } while (++cursor < chunk.length);
      __classPrivateFieldSet(this, _Decoder_cursor, cursor, "f");
      return __classPrivateFieldGet(this, _Decoder_instances, "m", _Decoder_continueDecodeDoubleExponent2).bind(this, isNegative, double, exponent);
    }, _Decoder_findCRLF = function _Decoder_findCRLF2(chunk, cursor) {
      while (chunk[cursor] !== ASCII["\r"]) {
        if (++cursor === chunk.length) {
          __classPrivateFieldSet(this, _Decoder_cursor, chunk.length, "f");
          return -1;
        }
      }
      __classPrivateFieldSet(this, _Decoder_cursor, cursor + 2, "f");
      return cursor;
    }, _Decoder_decodeSimpleString = function _Decoder_decodeSimpleString2(type, chunk) {
      const start = __classPrivateFieldGet(this, _Decoder_cursor, "f"), crlfIndex = __classPrivateFieldGet(this, _Decoder_instances, "m", _Decoder_findCRLF).call(this, chunk, start);
      if (crlfIndex === -1) {
        return __classPrivateFieldGet(this, _Decoder_instances, "m", _Decoder_continueDecodeSimpleString).bind(this, [chunk.subarray(start)], type);
      }
      const slice = chunk.subarray(start, crlfIndex);
      return type === Buffer ? slice : slice.toString();
    }, _Decoder_continueDecodeSimpleString = function _Decoder_continueDecodeSimpleString2(chunks, type, chunk) {
      const start = __classPrivateFieldGet(this, _Decoder_cursor, "f"), crlfIndex = __classPrivateFieldGet(this, _Decoder_instances, "m", _Decoder_findCRLF).call(this, chunk, start);
      if (crlfIndex === -1) {
        chunks.push(chunk.subarray(start));
        return __classPrivateFieldGet(this, _Decoder_instances, "m", _Decoder_continueDecodeSimpleString2).bind(this, chunks, type);
      }
      chunks.push(chunk.subarray(start, crlfIndex));
      const buffer = Buffer.concat(chunks);
      return type === Buffer ? buffer : buffer.toString();
    }, _Decoder_decodeBlobString = function _Decoder_decodeBlobString2(type, chunk) {
      if (chunk[__classPrivateFieldGet(this, _Decoder_cursor, "f")] === ASCII["-"]) {
        __classPrivateFieldSet(this, _Decoder_cursor, __classPrivateFieldGet(this, _Decoder_cursor, "f") + 4, "f");
        return null;
      }
      const length = __classPrivateFieldGet(this, _Decoder_instances, "m", _Decoder_decodeUnsingedNumber).call(this, 0, chunk);
      if (typeof length === "function") {
        return __classPrivateFieldGet(this, _Decoder_instances, "m", _Decoder_continueDecodeBlobStringLength).bind(this, length, type);
      } else if (__classPrivateFieldGet(this, _Decoder_cursor, "f") >= chunk.length) {
        return __classPrivateFieldGet(this, _Decoder_instances, "m", _Decoder_decodeBlobStringWithLength).bind(this, length, type);
      }
      return __classPrivateFieldGet(this, _Decoder_instances, "m", _Decoder_decodeBlobStringWithLength).call(this, length, type, chunk);
    }, _Decoder_continueDecodeBlobStringLength = function _Decoder_continueDecodeBlobStringLength2(lengthCb, type, chunk) {
      const length = lengthCb(chunk);
      if (typeof length === "function") {
        return __classPrivateFieldGet(this, _Decoder_instances, "m", _Decoder_continueDecodeBlobStringLength2).bind(this, length, type);
      } else if (__classPrivateFieldGet(this, _Decoder_cursor, "f") >= chunk.length) {
        return __classPrivateFieldGet(this, _Decoder_instances, "m", _Decoder_decodeBlobStringWithLength).bind(this, length, type);
      }
      return __classPrivateFieldGet(this, _Decoder_instances, "m", _Decoder_decodeBlobStringWithLength).call(this, length, type, chunk);
    }, _Decoder_decodeStringWithLength = function _Decoder_decodeStringWithLength2(length, skip, type, chunk) {
      const end = __classPrivateFieldGet(this, _Decoder_cursor, "f") + length;
      if (end >= chunk.length) {
        const slice2 = chunk.subarray(__classPrivateFieldGet(this, _Decoder_cursor, "f"));
        __classPrivateFieldSet(this, _Decoder_cursor, chunk.length, "f");
        return __classPrivateFieldGet(this, _Decoder_instances, "m", _Decoder_continueDecodeStringWithLength).bind(this, length - slice2.length, [slice2], skip, type);
      }
      const slice = chunk.subarray(__classPrivateFieldGet(this, _Decoder_cursor, "f"), end);
      __classPrivateFieldSet(this, _Decoder_cursor, end + skip, "f");
      return type === Buffer ? slice : slice.toString();
    }, _Decoder_continueDecodeStringWithLength = function _Decoder_continueDecodeStringWithLength2(length, chunks, skip, type, chunk) {
      const end = __classPrivateFieldGet(this, _Decoder_cursor, "f") + length;
      if (end >= chunk.length) {
        const slice = chunk.subarray(__classPrivateFieldGet(this, _Decoder_cursor, "f"));
        chunks.push(slice);
        __classPrivateFieldSet(this, _Decoder_cursor, chunk.length, "f");
        return __classPrivateFieldGet(this, _Decoder_instances, "m", _Decoder_continueDecodeStringWithLength2).bind(this, length - slice.length, chunks, skip, type);
      }
      chunks.push(chunk.subarray(__classPrivateFieldGet(this, _Decoder_cursor, "f"), end));
      __classPrivateFieldSet(this, _Decoder_cursor, end + skip, "f");
      const buffer = Buffer.concat(chunks);
      return type === Buffer ? buffer : buffer.toString();
    }, _Decoder_decodeBlobStringWithLength = function _Decoder_decodeBlobStringWithLength2(length, type, chunk) {
      return __classPrivateFieldGet(this, _Decoder_instances, "m", _Decoder_decodeStringWithLength).call(this, length, 2, type, chunk);
    }, _Decoder_decodeVerbatimString = function _Decoder_decodeVerbatimString2(type, chunk) {
      return __classPrivateFieldGet(this, _Decoder_instances, "m", _Decoder_continueDecodeVerbatimStringLength).call(this, __classPrivateFieldGet(this, _Decoder_instances, "m", _Decoder_decodeUnsingedNumber).bind(this, 0), type, chunk);
    }, _Decoder_continueDecodeVerbatimStringLength = function _Decoder_continueDecodeVerbatimStringLength2(lengthCb, type, chunk) {
      const length = lengthCb(chunk);
      return typeof length === "function" ? __classPrivateFieldGet(this, _Decoder_instances, "m", _Decoder_continueDecodeVerbatimStringLength2).bind(this, length, type) : __classPrivateFieldGet(this, _Decoder_instances, "m", _Decoder_decodeVerbatimStringWithLength).call(this, length, type, chunk);
    }, _Decoder_decodeVerbatimStringWithLength = function _Decoder_decodeVerbatimStringWithLength2(length, type, chunk) {
      const stringLength = length - 4;
      if (type === verbatim_string_1.VerbatimString) {
        return __classPrivateFieldGet(this, _Decoder_instances, "m", _Decoder_decodeVerbatimStringFormat).call(this, stringLength, chunk);
      }
      __classPrivateFieldSet(this, _Decoder_cursor, __classPrivateFieldGet(this, _Decoder_cursor, "f") + 4, "f");
      return __classPrivateFieldGet(this, _Decoder_cursor, "f") >= chunk.length ? __classPrivateFieldGet(this, _Decoder_instances, "m", _Decoder_decodeBlobStringWithLength).bind(this, stringLength, type) : __classPrivateFieldGet(this, _Decoder_instances, "m", _Decoder_decodeBlobStringWithLength).call(this, stringLength, type, chunk);
    }, _Decoder_decodeVerbatimStringFormat = function _Decoder_decodeVerbatimStringFormat2(stringLength, chunk) {
      const formatCb = __classPrivateFieldGet(this, _Decoder_instances, "m", _Decoder_decodeStringWithLength).bind(this, 3, 1, String);
      return __classPrivateFieldGet(this, _Decoder_cursor, "f") >= chunk.length ? __classPrivateFieldGet(this, _Decoder_instances, "m", _Decoder_continueDecodeVerbatimStringFormat).bind(this, stringLength, formatCb) : __classPrivateFieldGet(this, _Decoder_instances, "m", _Decoder_continueDecodeVerbatimStringFormat).call(this, stringLength, formatCb, chunk);
    }, _Decoder_continueDecodeVerbatimStringFormat = function _Decoder_continueDecodeVerbatimStringFormat2(stringLength, formatCb, chunk) {
      const format = formatCb(chunk);
      return typeof format === "function" ? __classPrivateFieldGet(this, _Decoder_instances, "m", _Decoder_continueDecodeVerbatimStringFormat2).bind(this, stringLength, format) : __classPrivateFieldGet(this, _Decoder_instances, "m", _Decoder_decodeVerbatimStringWithFormat).call(this, stringLength, format, chunk);
    }, _Decoder_decodeVerbatimStringWithFormat = function _Decoder_decodeVerbatimStringWithFormat2(stringLength, format, chunk) {
      return __classPrivateFieldGet(this, _Decoder_instances, "m", _Decoder_continueDecodeVerbatimStringWithFormat).call(this, format, __classPrivateFieldGet(this, _Decoder_instances, "m", _Decoder_decodeBlobStringWithLength).bind(this, stringLength, String), chunk);
    }, _Decoder_continueDecodeVerbatimStringWithFormat = function _Decoder_continueDecodeVerbatimStringWithFormat2(format, stringCb, chunk) {
      const string = stringCb(chunk);
      return typeof string === "function" ? __classPrivateFieldGet(this, _Decoder_instances, "m", _Decoder_continueDecodeVerbatimStringWithFormat2).bind(this, format, string) : new verbatim_string_1.VerbatimString(format, string);
    }, _Decoder_decodeSimpleError = function _Decoder_decodeSimpleError2(chunk) {
      const string = __classPrivateFieldGet(this, _Decoder_instances, "m", _Decoder_decodeSimpleString).call(this, String, chunk);
      return typeof string === "function" ? __classPrivateFieldGet(this, _Decoder_instances, "m", _Decoder_continueDecodeSimpleError).bind(this, string) : new errors_1.SimpleError(string);
    }, _Decoder_continueDecodeSimpleError = function _Decoder_continueDecodeSimpleError2(stringCb, chunk) {
      const string = stringCb(chunk);
      return typeof string === "function" ? __classPrivateFieldGet(this, _Decoder_instances, "m", _Decoder_continueDecodeSimpleError2).bind(this, string) : new errors_1.SimpleError(string);
    }, _Decoder_decodeBlobError = function _Decoder_decodeBlobError2(chunk) {
      const string = __classPrivateFieldGet(this, _Decoder_instances, "m", _Decoder_decodeBlobString).call(this, String, chunk);
      return typeof string === "function" ? __classPrivateFieldGet(this, _Decoder_instances, "m", _Decoder_continueDecodeBlobError).bind(this, string) : new errors_1.BlobError(string);
    }, _Decoder_continueDecodeBlobError = function _Decoder_continueDecodeBlobError2(stringCb, chunk) {
      const string = stringCb(chunk);
      return typeof string === "function" ? __classPrivateFieldGet(this, _Decoder_instances, "m", _Decoder_continueDecodeBlobError2).bind(this, string) : new errors_1.BlobError(string);
    }, _Decoder_decodeNestedType = function _Decoder_decodeNestedType2(typeMapping, chunk) {
      var _b;
      const type = chunk[__classPrivateFieldGet(this, _Decoder_cursor, "f")];
      return __classPrivateFieldSet(this, _Decoder_cursor, (_b = __classPrivateFieldGet(this, _Decoder_cursor, "f"), ++_b), "f") === chunk.length ? __classPrivateFieldGet(this, _Decoder_instances, "m", _Decoder_decodeNestedTypeValue).bind(this, type, typeMapping) : __classPrivateFieldGet(this, _Decoder_instances, "m", _Decoder_decodeNestedTypeValue).call(this, type, typeMapping, chunk);
    }, _Decoder_decodeNestedTypeValue = function _Decoder_decodeNestedTypeValue2(type, typeMapping, chunk) {
      switch (type) {
        case exports.RESP_TYPES.NULL:
          return __classPrivateFieldGet(this, _Decoder_instances, "m", _Decoder_decodeNull).call(this);
        case exports.RESP_TYPES.BOOLEAN:
          return __classPrivateFieldGet(this, _Decoder_instances, "m", _Decoder_decodeBoolean).call(this, typeMapping[exports.RESP_TYPES.BOOLEAN], chunk);
        case exports.RESP_TYPES.NUMBER:
          return __classPrivateFieldGet(this, _Decoder_instances, "m", _Decoder_decodeNumber).call(this, typeMapping[exports.RESP_TYPES.NUMBER], chunk);
        case exports.RESP_TYPES.BIG_NUMBER:
          return __classPrivateFieldGet(this, _Decoder_instances, "m", _Decoder_decodeBigNumber).call(this, typeMapping[exports.RESP_TYPES.BIG_NUMBER], chunk);
        case exports.RESP_TYPES.DOUBLE:
          return __classPrivateFieldGet(this, _Decoder_instances, "m", _Decoder_decodeDouble).call(this, typeMapping[exports.RESP_TYPES.DOUBLE], chunk);
        case exports.RESP_TYPES.SIMPLE_STRING:
          return __classPrivateFieldGet(this, _Decoder_instances, "m", _Decoder_decodeSimpleString).call(this, typeMapping[exports.RESP_TYPES.SIMPLE_STRING], chunk);
        case exports.RESP_TYPES.BLOB_STRING:
          return __classPrivateFieldGet(this, _Decoder_instances, "m", _Decoder_decodeBlobString).call(this, typeMapping[exports.RESP_TYPES.BLOB_STRING], chunk);
        case exports.RESP_TYPES.VERBATIM_STRING:
          return __classPrivateFieldGet(this, _Decoder_instances, "m", _Decoder_decodeVerbatimString).call(this, typeMapping[exports.RESP_TYPES.VERBATIM_STRING], chunk);
        case exports.RESP_TYPES.SIMPLE_ERROR:
          return __classPrivateFieldGet(this, _Decoder_instances, "m", _Decoder_decodeSimpleError).call(this, chunk);
        case exports.RESP_TYPES.BLOB_ERROR:
          return __classPrivateFieldGet(this, _Decoder_instances, "m", _Decoder_decodeBlobError).call(this, chunk);
        case exports.RESP_TYPES.ARRAY:
          return __classPrivateFieldGet(this, _Decoder_instances, "m", _Decoder_decodeArray).call(this, typeMapping, chunk);
        case exports.RESP_TYPES.SET:
          return __classPrivateFieldGet(this, _Decoder_instances, "m", _Decoder_decodeSet).call(this, typeMapping, chunk);
        case exports.RESP_TYPES.MAP:
          return __classPrivateFieldGet(this, _Decoder_instances, "m", _Decoder_decodeMap).call(this, typeMapping, chunk);
        default:
          throw new Error(`Unknown RESP type ${type} "${String.fromCharCode(type)}"`);
      }
    }, _Decoder_decodeArray = function _Decoder_decodeArray2(typeMapping, chunk) {
      if (chunk[__classPrivateFieldGet(this, _Decoder_cursor, "f")] === ASCII["-"]) {
        __classPrivateFieldSet(this, _Decoder_cursor, __classPrivateFieldGet(this, _Decoder_cursor, "f") + 4, "f");
        return null;
      }
      return __classPrivateFieldGet(this, _Decoder_instances, "m", _Decoder_decodeArrayWithLength).call(this, __classPrivateFieldGet(this, _Decoder_instances, "m", _Decoder_decodeUnsingedNumber).call(this, 0, chunk), typeMapping, chunk);
    }, _Decoder_decodeArrayWithLength = function _Decoder_decodeArrayWithLength2(length, typeMapping, chunk) {
      return typeof length === "function" ? __classPrivateFieldGet(this, _Decoder_instances, "m", _Decoder_continueDecodeArrayLength).bind(this, length, typeMapping) : __classPrivateFieldGet(this, _Decoder_instances, "m", _Decoder_decodeArrayItems).call(this, new Array(length), 0, typeMapping, chunk);
    }, _Decoder_continueDecodeArrayLength = function _Decoder_continueDecodeArrayLength2(lengthCb, typeMapping, chunk) {
      return __classPrivateFieldGet(this, _Decoder_instances, "m", _Decoder_decodeArrayWithLength).call(this, lengthCb(chunk), typeMapping, chunk);
    }, _Decoder_decodeArrayItems = function _Decoder_decodeArrayItems2(array, filled, typeMapping, chunk) {
      for (let i = filled; i < array.length; i++) {
        if (__classPrivateFieldGet(this, _Decoder_cursor, "f") >= chunk.length) {
          return __classPrivateFieldGet(this, _Decoder_instances, "m", _Decoder_decodeArrayItems2).bind(this, array, i, typeMapping);
        }
        const item = __classPrivateFieldGet(this, _Decoder_instances, "m", _Decoder_decodeNestedType).call(this, typeMapping, chunk);
        if (typeof item === "function") {
          return __classPrivateFieldGet(this, _Decoder_instances, "m", _Decoder_continueDecodeArrayItems).bind(this, array, i, item, typeMapping);
        }
        array[i] = item;
      }
      return array;
    }, _Decoder_continueDecodeArrayItems = function _Decoder_continueDecodeArrayItems2(array, filled, itemCb, typeMapping, chunk) {
      const item = itemCb(chunk);
      if (typeof item === "function") {
        return __classPrivateFieldGet(this, _Decoder_instances, "m", _Decoder_continueDecodeArrayItems2).bind(this, array, filled, item, typeMapping);
      }
      array[filled++] = item;
      return __classPrivateFieldGet(this, _Decoder_instances, "m", _Decoder_decodeArrayItems).call(this, array, filled, typeMapping, chunk);
    }, _Decoder_decodeSet = function _Decoder_decodeSet2(typeMapping, chunk) {
      const length = __classPrivateFieldGet(this, _Decoder_instances, "m", _Decoder_decodeUnsingedNumber).call(this, 0, chunk);
      if (typeof length === "function") {
        return __classPrivateFieldGet(this, _Decoder_instances, "m", _Decoder_continueDecodeSetLength).bind(this, length, typeMapping);
      }
      return __classPrivateFieldGet(this, _Decoder_instances, "m", _Decoder_decodeSetItems).call(this, length, typeMapping, chunk);
    }, _Decoder_continueDecodeSetLength = function _Decoder_continueDecodeSetLength2(lengthCb, typeMapping, chunk) {
      const length = lengthCb(chunk);
      return typeof length === "function" ? __classPrivateFieldGet(this, _Decoder_instances, "m", _Decoder_continueDecodeSetLength2).bind(this, length, typeMapping) : __classPrivateFieldGet(this, _Decoder_instances, "m", _Decoder_decodeSetItems).call(this, length, typeMapping, chunk);
    }, _Decoder_decodeSetItems = function _Decoder_decodeSetItems2(length, typeMapping, chunk) {
      return typeMapping[exports.RESP_TYPES.SET] === Set ? __classPrivateFieldGet(this, _Decoder_instances, "m", _Decoder_decodeSetAsSet).call(this, /* @__PURE__ */ new Set(), length, typeMapping, chunk) : __classPrivateFieldGet(this, _Decoder_instances, "m", _Decoder_decodeArrayItems).call(this, new Array(length), 0, typeMapping, chunk);
    }, _Decoder_decodeSetAsSet = function _Decoder_decodeSetAsSet2(set, remaining, typeMapping, chunk) {
      while (remaining > 0) {
        if (__classPrivateFieldGet(this, _Decoder_cursor, "f") >= chunk.length) {
          return __classPrivateFieldGet(this, _Decoder_instances, "m", _Decoder_decodeSetAsSet2).bind(this, set, remaining, typeMapping);
        }
        const item = __classPrivateFieldGet(this, _Decoder_instances, "m", _Decoder_decodeNestedType).call(this, typeMapping, chunk);
        if (typeof item === "function") {
          return __classPrivateFieldGet(this, _Decoder_instances, "m", _Decoder_continueDecodeSetAsSet).bind(this, set, remaining, item, typeMapping);
        }
        set.add(item);
        --remaining;
      }
      return set;
    }, _Decoder_continueDecodeSetAsSet = function _Decoder_continueDecodeSetAsSet2(set, remaining, itemCb, typeMapping, chunk) {
      const item = itemCb(chunk);
      if (typeof item === "function") {
        return __classPrivateFieldGet(this, _Decoder_instances, "m", _Decoder_continueDecodeSetAsSet2).bind(this, set, remaining, item, typeMapping);
      }
      set.add(item);
      return __classPrivateFieldGet(this, _Decoder_instances, "m", _Decoder_decodeSetAsSet).call(this, set, remaining - 1, typeMapping, chunk);
    }, _Decoder_decodeMap = function _Decoder_decodeMap2(typeMapping, chunk) {
      const length = __classPrivateFieldGet(this, _Decoder_instances, "m", _Decoder_decodeUnsingedNumber).call(this, 0, chunk);
      if (typeof length === "function") {
        return __classPrivateFieldGet(this, _Decoder_instances, "m", _Decoder_continueDecodeMapLength).bind(this, length, typeMapping);
      }
      return __classPrivateFieldGet(this, _Decoder_instances, "m", _Decoder_decodeMapItems).call(this, length, typeMapping, chunk);
    }, _Decoder_continueDecodeMapLength = function _Decoder_continueDecodeMapLength2(lengthCb, typeMapping, chunk) {
      const length = lengthCb(chunk);
      return typeof length === "function" ? __classPrivateFieldGet(this, _Decoder_instances, "m", _Decoder_continueDecodeMapLength2).bind(this, length, typeMapping) : __classPrivateFieldGet(this, _Decoder_instances, "m", _Decoder_decodeMapItems).call(this, length, typeMapping, chunk);
    }, _Decoder_decodeMapItems = function _Decoder_decodeMapItems2(length, typeMapping, chunk) {
      switch (typeMapping[exports.RESP_TYPES.MAP]) {
        case Map:
          return __classPrivateFieldGet(this, _Decoder_instances, "m", _Decoder_decodeMapAsMap).call(this, /* @__PURE__ */ new Map(), length, typeMapping, chunk);
        case Array:
          return __classPrivateFieldGet(this, _Decoder_instances, "m", _Decoder_decodeArrayItems).call(this, new Array(length * 2), 0, typeMapping, chunk);
        default:
          return __classPrivateFieldGet(this, _Decoder_instances, "m", _Decoder_decodeMapAsObject).call(this, {}, length, typeMapping, chunk);
      }
    }, _Decoder_decodeMapAsMap = function _Decoder_decodeMapAsMap2(map, remaining, typeMapping, chunk) {
      while (remaining > 0) {
        if (__classPrivateFieldGet(this, _Decoder_cursor, "f") >= chunk.length) {
          return __classPrivateFieldGet(this, _Decoder_instances, "m", _Decoder_decodeMapAsMap2).bind(this, map, remaining, typeMapping);
        }
        const key = __classPrivateFieldGet(this, _Decoder_instances, "m", _Decoder_decodeMapKey).call(this, typeMapping, chunk);
        if (typeof key === "function") {
          return __classPrivateFieldGet(this, _Decoder_instances, "m", _Decoder_continueDecodeMapKey).bind(this, map, remaining, key, typeMapping);
        }
        if (__classPrivateFieldGet(this, _Decoder_cursor, "f") >= chunk.length) {
          return __classPrivateFieldGet(this, _Decoder_instances, "m", _Decoder_continueDecodeMapValue).bind(this, map, remaining, key, __classPrivateFieldGet(this, _Decoder_instances, "m", _Decoder_decodeNestedType).bind(this, typeMapping), typeMapping);
        }
        const value = __classPrivateFieldGet(this, _Decoder_instances, "m", _Decoder_decodeNestedType).call(this, typeMapping, chunk);
        if (typeof value === "function") {
          return __classPrivateFieldGet(this, _Decoder_instances, "m", _Decoder_continueDecodeMapValue).bind(this, map, remaining, key, value, typeMapping);
        }
        map.set(key, value);
        --remaining;
      }
      return map;
    }, _Decoder_decodeMapKey = function _Decoder_decodeMapKey2(typeMapping, chunk) {
      var _b;
      const type = chunk[__classPrivateFieldGet(this, _Decoder_cursor, "f")];
      return __classPrivateFieldSet(this, _Decoder_cursor, (_b = __classPrivateFieldGet(this, _Decoder_cursor, "f"), ++_b), "f") === chunk.length ? __classPrivateFieldGet(this, _Decoder_instances, "m", _Decoder_decodeMapKeyValue).bind(this, type, typeMapping) : __classPrivateFieldGet(this, _Decoder_instances, "m", _Decoder_decodeMapKeyValue).call(this, type, typeMapping, chunk);
    }, _Decoder_decodeMapKeyValue = function _Decoder_decodeMapKeyValue2(type, typeMapping, chunk) {
      switch (type) {
        // decode simple string map key as string (and not as buffer)
        case exports.RESP_TYPES.SIMPLE_STRING:
          return __classPrivateFieldGet(this, _Decoder_instances, "m", _Decoder_decodeSimpleString).call(this, String, chunk);
        // decode blob string map key as string (and not as buffer)
        case exports.RESP_TYPES.BLOB_STRING:
          return __classPrivateFieldGet(this, _Decoder_instances, "m", _Decoder_decodeBlobString).call(this, String, chunk);
        default:
          return __classPrivateFieldGet(this, _Decoder_instances, "m", _Decoder_decodeNestedTypeValue).call(this, type, typeMapping, chunk);
      }
    }, _Decoder_continueDecodeMapKey = function _Decoder_continueDecodeMapKey2(map, remaining, keyCb, typeMapping, chunk) {
      const key = keyCb(chunk);
      if (typeof key === "function") {
        return __classPrivateFieldGet(this, _Decoder_instances, "m", _Decoder_continueDecodeMapKey2).bind(this, map, remaining, key, typeMapping);
      }
      if (__classPrivateFieldGet(this, _Decoder_cursor, "f") >= chunk.length) {
        return __classPrivateFieldGet(this, _Decoder_instances, "m", _Decoder_continueDecodeMapValue).bind(this, map, remaining, key, __classPrivateFieldGet(this, _Decoder_instances, "m", _Decoder_decodeNestedType).bind(this, typeMapping), typeMapping);
      }
      const value = __classPrivateFieldGet(this, _Decoder_instances, "m", _Decoder_decodeNestedType).call(this, typeMapping, chunk);
      if (typeof value === "function") {
        return __classPrivateFieldGet(this, _Decoder_instances, "m", _Decoder_continueDecodeMapValue).bind(this, map, remaining, key, value, typeMapping);
      }
      map.set(key, value);
      return __classPrivateFieldGet(this, _Decoder_instances, "m", _Decoder_decodeMapAsMap).call(this, map, remaining - 1, typeMapping, chunk);
    }, _Decoder_continueDecodeMapValue = function _Decoder_continueDecodeMapValue2(map, remaining, key, valueCb, typeMapping, chunk) {
      const value = valueCb(chunk);
      if (typeof value === "function") {
        return __classPrivateFieldGet(this, _Decoder_instances, "m", _Decoder_continueDecodeMapValue2).bind(this, map, remaining, key, value, typeMapping);
      }
      map.set(key, value);
      return __classPrivateFieldGet(this, _Decoder_instances, "m", _Decoder_decodeMapAsMap).call(this, map, remaining - 1, typeMapping, chunk);
    }, _Decoder_decodeMapAsObject = function _Decoder_decodeMapAsObject2(object, remaining, typeMapping, chunk) {
      while (remaining > 0) {
        if (__classPrivateFieldGet(this, _Decoder_cursor, "f") >= chunk.length) {
          return __classPrivateFieldGet(this, _Decoder_instances, "m", _Decoder_decodeMapAsObject2).bind(this, object, remaining, typeMapping);
        }
        const key = __classPrivateFieldGet(this, _Decoder_instances, "m", _Decoder_decodeMapKey).call(this, typeMapping, chunk);
        if (typeof key === "function") {
          return __classPrivateFieldGet(this, _Decoder_instances, "m", _Decoder_continueDecodeMapAsObjectKey).bind(this, object, remaining, key, typeMapping);
        }
        if (__classPrivateFieldGet(this, _Decoder_cursor, "f") >= chunk.length) {
          return __classPrivateFieldGet(this, _Decoder_instances, "m", _Decoder_continueDecodeMapAsObjectValue).bind(this, object, remaining, key, __classPrivateFieldGet(this, _Decoder_instances, "m", _Decoder_decodeNestedType).bind(this, typeMapping), typeMapping);
        }
        const value = __classPrivateFieldGet(this, _Decoder_instances, "m", _Decoder_decodeNestedType).call(this, typeMapping, chunk);
        if (typeof value === "function") {
          return __classPrivateFieldGet(this, _Decoder_instances, "m", _Decoder_continueDecodeMapAsObjectValue).bind(this, object, remaining, key, value, typeMapping);
        }
        if (key === "__proto__" || key === "constructor") {
          Object.defineProperty(object, key, {
            value,
            configurable: true,
            enumerable: true,
            writable: true
          });
        } else {
          object[key] = value;
        }
        --remaining;
      }
      return object;
    }, _Decoder_continueDecodeMapAsObjectKey = function _Decoder_continueDecodeMapAsObjectKey2(object, remaining, keyCb, typeMapping, chunk) {
      const key = keyCb(chunk);
      if (typeof key === "function") {
        return __classPrivateFieldGet(this, _Decoder_instances, "m", _Decoder_continueDecodeMapAsObjectKey2).bind(this, object, remaining, key, typeMapping);
      }
      if (__classPrivateFieldGet(this, _Decoder_cursor, "f") >= chunk.length) {
        return __classPrivateFieldGet(this, _Decoder_instances, "m", _Decoder_continueDecodeMapAsObjectValue).bind(this, object, remaining, key, __classPrivateFieldGet(this, _Decoder_instances, "m", _Decoder_decodeNestedType).bind(this, typeMapping), typeMapping);
      }
      const value = __classPrivateFieldGet(this, _Decoder_instances, "m", _Decoder_decodeNestedType).call(this, typeMapping, chunk);
      if (typeof value === "function") {
        return __classPrivateFieldGet(this, _Decoder_instances, "m", _Decoder_continueDecodeMapAsObjectValue).bind(this, object, remaining, key, value, typeMapping);
      }
      if (key === "__proto__" || key === "constructor") {
        Object.defineProperty(object, key, {
          value,
          configurable: true,
          enumerable: true,
          writable: true
        });
      } else {
        object[key] = value;
      }
      return __classPrivateFieldGet(this, _Decoder_instances, "m", _Decoder_decodeMapAsObject).call(this, object, remaining - 1, typeMapping, chunk);
    }, _Decoder_continueDecodeMapAsObjectValue = function _Decoder_continueDecodeMapAsObjectValue2(object, remaining, key, valueCb, typeMapping, chunk) {
      const value = valueCb(chunk);
      if (typeof value === "function") {
        return __classPrivateFieldGet(this, _Decoder_instances, "m", _Decoder_continueDecodeMapAsObjectValue2).bind(this, object, remaining, key, value, typeMapping);
      }
      if (key === "__proto__" || key === "constructor") {
        Object.defineProperty(object, key, {
          value,
          configurable: true,
          enumerable: true,
          writable: true
        });
      } else {
        object[key] = value;
      }
      return __classPrivateFieldGet(this, _Decoder_instances, "m", _Decoder_decodeMapAsObject).call(this, object, remaining - 1, typeMapping, chunk);
    };
    _Decoder_DOUBLE_DECIMAL_MULTIPLIERS = { value: [
      0.1,
      0.01,
      1e-3,
      1e-4,
      1e-5,
      1e-6,
      1e-7,
      1e-8,
      1e-9,
      1e-10,
      1e-11,
      1e-12,
      1e-13,
      1e-14,
      1e-15,
      1e-16,
      1e-17
    ] };
  }
});

// node_modules/ioredis/built/DataHandler.js
var require_DataHandler = __commonJS({
  "node_modules/ioredis/built/DataHandler.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Command_1 = require_Command();
    var utils_1 = require_utils2();
    var SubscriptionSet_1 = require_SubscriptionSet();
    var decoder_1 = require_decoder();
    var debug = (0, utils_1.Debug)("dataHandler");
    var DataHandler = class {
      constructor(redis, parserOptions) {
        this.redis = redis;
        const typeMapping = getParserTypeMapping(parserOptions);
        const decoder = new decoder_1.Decoder({
          getTypeMapping: () => typeMapping,
          onReply: (reply2) => {
            this.dispatch(() => this.returnReply(reply2));
          },
          onErrorReply: (err) => {
            this.dispatch(() => this.returnError(err));
          },
          onPush: (reply2) => {
            this.dispatch(() => this.returnPush(reply2));
          }
        });
        redis.stream.prependListener("data", (data) => {
          try {
            decoder.write(data);
          } catch (err) {
            this.returnFatalError(err);
          }
        });
        redis.stream.resume();
      }
      // Rethrows user listener/transformer exceptions asynchronously so they
      // surface as uncaught exceptions (as with redis-parser in v5) instead of
      // unwinding the decoder mid-parse and tearing down the connection as a
      // fatal protocol error.
      dispatch(fn) {
        try {
          fn();
        } catch (err) {
          process.nextTick(() => {
            throw err;
          });
        }
      }
      returnFatalError(err) {
        err.message += ". Please report this.";
        this.redis.recoverFromFatalError(err, err, { offlineQueue: false });
      }
      returnError(err) {
        const item = this.shiftCommand(err);
        if (!item) {
          return;
        }
        err.command = {
          name: item.command.name,
          args: item.command.args
        };
        const isMovedSsubscribe = item.command.name === "ssubscribe" && err.message.startsWith("MOVED ");
        if (isMovedSsubscribe) {
          this.redis.emit("moved");
        }
        this.redis.handleReconnection(err, item);
      }
      returnReply(reply2) {
        if (this.handleMonitorReply(reply2)) {
          return;
        }
        if (this.redis.condition.protocol !== 3 && this.handleSubscriberReply(reply2)) {
          return;
        }
        const item = this.shiftCommand(reply2);
        if (!item) {
          return;
        }
        if (Command_1.default.checkFlag("ENTER_SUBSCRIBER_MODE", item.command.name)) {
          this.redis.condition.subscriber = new SubscriptionSet_1.default();
          this.redis.condition.subscriber.add(item.command.name, reply2[1].toString());
          if (!fillSubCommand(item.command, reply2[2])) {
            this.redis.commandQueue.unshift(item);
          }
        } else if (Command_1.default.checkFlag("EXIT_SUBSCRIBER_MODE", item.command.name)) {
          if (!fillUnsubCommand(item.command, reply2[2])) {
            this.redis.commandQueue.unshift(item);
          }
        } else {
          item.command.resolve(reply2);
        }
      }
      returnPush(reply2) {
        if (!Array.isArray(reply2) || reply2.length === 0) {
          return;
        }
        const replyType = reply2[0].toString();
        debug('receive push "%s"', replyType);
        switch (replyType) {
          case "message":
          case "pmessage":
          case "smessage":
            this.handleSubscriberReply(reply2);
            break;
          case "ssubscribe":
          case "subscribe":
          case "psubscribe": {
            if (!this.redis.condition.subscriber) {
              this.redis.condition.subscriber = new SubscriptionSet_1.default();
            }
            const channel = reply2[1].toString();
            this.redis.condition.subscriber.add(replyType, channel);
            const item = this.shiftCommand(reply2);
            if (!item) {
              return;
            }
            if (!fillSubCommand(item.command, reply2[2])) {
              this.redis.commandQueue.unshift(item);
            }
            break;
          }
          case "sunsubscribe":
          case "unsubscribe":
          case "punsubscribe": {
            if (this.redis.condition.subscriber) {
              const channel = reply2[1] ? reply2[1].toString() : null;
              if (channel) {
                this.redis.condition.subscriber.del(replyType, channel);
              }
            }
            const count = reply2[2];
            if (Number(count) === 0) {
              this.redis.condition.subscriber = false;
            }
            if (this.handleUnsolicitedUnsubscribe(replyType)) {
              return;
            }
            const item = this.shiftCommand(reply2);
            if (!item) {
              return;
            }
            if (!fillUnsubCommand(item.command, count)) {
              this.redis.commandQueue.unshift(item);
            }
            break;
          }
        }
      }
      // Cluster sends unsolicited `sunsubscribe` pushes on slot migration; those
      // answer no queued command, so shifting the queue head would resolve an
      // unrelated in-flight command. Detected via a non-matching queue head, and
      // `sunsubscribe` reuses the ssubscribe-MOVED recovery path.
      handleUnsolicitedUnsubscribe(replyType) {
        const head = this.redis.commandQueue.peekFront();
        if (head && head.command.name.toLowerCase() === replyType) {
          return false;
        }
        if (replyType === "sunsubscribe") {
          this.redis.emit("moved");
        }
        return true;
      }
      handleSubscriberReply(reply2) {
        if (!this.redis.condition.subscriber) {
          return false;
        }
        const replyType = Array.isArray(reply2) ? reply2[0].toString() : null;
        debug('receive reply "%s" in subscriber mode', replyType);
        switch (replyType) {
          case "message":
            if (this.redis.listeners("message").length > 0) {
              this.redis.emit("message", reply2[1].toString(), reply2[2] ? reply2[2].toString() : "");
            }
            this.redis.emit("messageBuffer", reply2[1], reply2[2]);
            break;
          case "pmessage": {
            const pattern = reply2[1].toString();
            if (this.redis.listeners("pmessage").length > 0) {
              this.redis.emit("pmessage", pattern, reply2[2].toString(), reply2[3].toString());
            }
            this.redis.emit("pmessageBuffer", pattern, reply2[2], reply2[3]);
            break;
          }
          case "smessage": {
            if (this.redis.listeners("smessage").length > 0) {
              this.redis.emit("smessage", reply2[1].toString(), reply2[2] ? reply2[2].toString() : "");
            }
            this.redis.emit("smessageBuffer", reply2[1], reply2[2]);
            break;
          }
          case "ssubscribe":
          case "subscribe":
          case "psubscribe": {
            const channel = reply2[1].toString();
            this.redis.condition.subscriber.add(replyType, channel);
            const item = this.shiftCommand(reply2);
            if (!item) {
              return;
            }
            if (!fillSubCommand(item.command, reply2[2])) {
              this.redis.commandQueue.unshift(item);
            }
            break;
          }
          case "sunsubscribe":
          case "unsubscribe":
          case "punsubscribe": {
            const channel = reply2[1] ? reply2[1].toString() : null;
            if (channel) {
              this.redis.condition.subscriber.del(replyType, channel);
            }
            const count = reply2[2];
            if (Number(count) === 0) {
              this.redis.condition.subscriber = false;
            }
            if (this.handleUnsolicitedUnsubscribe(replyType)) {
              break;
            }
            const item = this.shiftCommand(reply2);
            if (!item) {
              return;
            }
            if (!fillUnsubCommand(item.command, count)) {
              this.redis.commandQueue.unshift(item);
            }
            break;
          }
          default: {
            const item = this.shiftCommand(reply2);
            if (!item) {
              return;
            }
            item.command.resolve(reply2);
          }
        }
        return true;
      }
      handleMonitorReply(reply2) {
        if (this.redis.status !== "monitoring") {
          return false;
        }
        const replyStr = reply2.toString();
        if (replyStr === "OK") {
          return false;
        }
        const len = replyStr.indexOf(" ");
        const timestamp = replyStr.slice(0, len);
        const argIndex = replyStr.indexOf('"');
        const args = replyStr.slice(argIndex + 1, -1).split('" "').map((elem) => elem.replace(/\\"/g, '"'));
        const dbAndSource = replyStr.slice(len + 2, argIndex - 2).split(" ");
        this.redis.emit("monitor", timestamp, args, dbAndSource[1], dbAndSource[0]);
        return true;
      }
      shiftCommand(reply2) {
        const item = this.redis.commandQueue.shift();
        if (!item) {
          const message = "Command queue state error. If you can reproduce this, please report it.";
          const error = new Error(message + (reply2 instanceof Error ? ` Last error: ${reply2.message}` : ` Last reply: ${reply2.toString()}`));
          this.redis.emit("error", error);
          return null;
        }
        return item;
      }
    };
    exports.default = DataHandler;
    var legacyTypeMapping = {
      [decoder_1.RESP_TYPES.SIMPLE_STRING]: Buffer,
      [decoder_1.RESP_TYPES.BLOB_STRING]: Buffer,
      [decoder_1.RESP_TYPES.VERBATIM_STRING]: Buffer,
      [decoder_1.RESP_TYPES.BIG_NUMBER]: String,
      // RESP2 represented doubles as bulk strings and booleans as `1`/`0`
      // integers. Decode doubles to Buffer (like blob strings, so `replyEncoding`
      // still chooses string-vs-buffer per command) and booleans to numbers, so
      // RESP3 replies match the classic RESP2 shape.
      [decoder_1.RESP_TYPES.DOUBLE]: Buffer,
      [decoder_1.RESP_TYPES.BOOLEAN]: Number,
      [decoder_1.RESP_TYPES.MAP]: Array,
      [decoder_1.RESP_TYPES.SET]: Array
    };
    var resp3TypeMapping = {
      [decoder_1.RESP_TYPES.SIMPLE_STRING]: Buffer,
      [decoder_1.RESP_TYPES.BLOB_STRING]: Buffer,
      [decoder_1.RESP_TYPES.VERBATIM_STRING]: Buffer,
      [decoder_1.RESP_TYPES.BIG_NUMBER]: String,
      [decoder_1.RESP_TYPES.SET]: Array
    };
    function getParserTypeMapping(parserOptions) {
      const base = parserOptions.replyMapping === "resp3" ? resp3TypeMapping : legacyTypeMapping;
      return parserOptions.stringNumbers ? { ...base, [decoder_1.RESP_TYPES.NUMBER]: String, [decoder_1.RESP_TYPES.DOUBLE]: String } : base;
    }
    var remainingRepliesMap = /* @__PURE__ */ new WeakMap();
    function fillSubCommand(command, count) {
      let remainingReplies = remainingRepliesMap.has(command) ? remainingRepliesMap.get(command) : command.args.length;
      remainingReplies -= 1;
      if (remainingReplies <= 0) {
        command.resolve(count);
        remainingRepliesMap.delete(command);
        return true;
      }
      remainingRepliesMap.set(command, remainingReplies);
      return false;
    }
    function fillUnsubCommand(command, count) {
      let remainingReplies = remainingRepliesMap.has(command) ? remainingRepliesMap.get(command) : command.args.length;
      if (remainingReplies === 0) {
        if (Number(count) === 0) {
          remainingRepliesMap.delete(command);
          command.resolve(count);
          return true;
        }
        return false;
      }
      remainingReplies -= 1;
      if (remainingReplies <= 0) {
        command.resolve(count);
        return true;
      }
      remainingRepliesMap.set(command, remainingReplies);
      return false;
    }
  }
});

// node_modules/ioredis/built/redis/event_handler.js
var require_event_handler = __commonJS({
  "node_modules/ioredis/built/redis/event_handler.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.readyHandler = exports.errorHandler = exports.closeHandler = exports.connectHandler = void 0;
    var redis_errors_1 = require_redis_errors();
    var Command_1 = require_Command();
    var errors_1 = require_errors();
    var utils_1 = require_utils2();
    var version_1 = require_version();
    var DataHandler_1 = require_DataHandler();
    var HimportCoordinator_1 = require_HimportCoordinator();
    var debug = (0, utils_1.Debug)("connection");
    function getHandshakeCommands(self) {
      const commands = [];
      if (self.condition.protocol === 3) {
        const helloCommandArgs = [self.condition.protocol];
        if (self.condition.auth) {
          helloCommandArgs.push("AUTH");
          if (Array.isArray(self.condition.auth)) {
            helloCommandArgs.push(self.condition.auth[0], self.condition.auth[1]);
          } else {
            helloCommandArgs.push("default", self.condition.auth);
          }
        }
        commands.push({
          kind: "hello",
          send: () => self.hello(helloCommandArgs),
          errorHandler: handleAuthError
        });
      } else if (self.condition.auth) {
        commands.push({
          kind: "auth",
          send: () => self.auth(self.condition.auth),
          errorHandler: handleAuthError
        });
      }
      if (self.condition.select) {
        commands.push({
          kind: "select",
          send: () => self.select(self.condition.select),
          errorHandler: (err) => self.silentEmit("error", err)
        });
      }
      if (self.options.connectionName) {
        debug("set the connection name [%s]", self.options.connectionName);
        commands.push({
          kind: "client",
          send: () => self.client("setname", self.options.connectionName),
          errorHandler: utils_1.noop
        });
      }
      if (self.options.readOnly) {
        debug("set the connection to readonly mode");
        commands.push({
          kind: "readonly",
          send: () => self.readonly(),
          errorHandler: utils_1.noop
        });
      }
      if (!self.options.disableClientInfo) {
        debug("set the client info");
        commands.push({
          kind: "client",
          send: () => self.client("SETINFO", "LIB-VER", version_1.PACKAGE_VERSION),
          errorHandler: utils_1.noop
        });
        commands.push({
          kind: "client",
          send: () => self.client("SETINFO", "LIB-NAME", self.options?.clientInfoTag ? `ioredis(${self.options.clientInfoTag})` : "ioredis"),
          errorHandler: utils_1.noop
        });
      }
      const himportBinding = (0, HimportCoordinator_1.getHimportBinding)(self);
      if (himportBinding && himportBinding.role !== "replica") {
        for (const definition of himportBinding.coordinator.getDefinitions()) {
          commands.push({
            kind: "himport",
            send: () => himportBinding.coordinator.ensurePrepared(self, definition) ?? Promise.resolve(),
            errorHandler: (err) => self.silentEmit("error", err)
          });
        }
      }
      return commands;
    }
    async function sendHandshake(commands, protocol) {
      if (protocol !== 3) {
        await Promise.all(commands.map(({ send, errorHandler: errorHandler2 }) => errorHandler2 ? send().catch(errorHandler2) : send()));
        return;
      }
      const results = await Promise.allSettled(commands.map(({ send }) => send()));
      const helloIndex = commands.findIndex(({ kind }) => kind === "hello");
      const helloResult = helloIndex === -1 ? void 0 : results[helloIndex];
      if (helloResult?.status === "rejected" && isProtocolNegotiationError(helloResult.reason)) {
        throw helloResult.reason;
      }
      for (let i = 0; i < results.length; i++) {
        const result = results[i];
        if (result.status === "rejected") {
          const { errorHandler: errorHandler2 } = commands[i];
          if (errorHandler2) {
            errorHandler2(result.reason);
            continue;
          }
          throw result.reason;
        }
      }
    }
    function connectHandler(self) {
      return async function() {
        try {
          self.resetCommandQueue();
          self.condition.handshake = true;
          self.setStatus("connect");
          new DataHandler_1.default(self, {
            stringNumbers: self.options.stringNumbers,
            replyMapping: self.condition.replyMapping
          });
          const { connectionEpoch } = self;
          const himportBinding = (0, HimportCoordinator_1.getHimportBinding)(self);
          himportBinding?.coordinator.beginSession(self);
          const isActiveConnect = () => connectionEpoch === self.connectionEpoch && self.status === "connect";
          const finishHandshake = () => {
            if (!isActiveConnect()) {
              return false;
            }
            self.condition.handshake = false;
            return true;
          };
          try {
            await sendHandshake(getHandshakeCommands(self), self.condition.protocol);
          } catch (err) {
            if (!isActiveConnect()) {
              return;
            }
            if (!isProtocolNegotiationError(err)) {
              return self.recoverFromFatalError(err, err);
            }
            if (self.options.replyMapping === "resp3") {
              console.warn('[WARN] replyMapping "resp3" was requested, but the server does not support RESP3. Replies will use RESP2-compatible shapes until connected to a server that supports RESP3.');
            }
            debug("server rejected RESP3, downgrading connection to RESP2");
            self.condition.protocol = 2;
            self.condition.replyMapping = "legacy";
            try {
              await sendHandshake(getHandshakeCommands(self), self.condition.protocol);
            } catch (downgradeErr) {
              if (!isActiveConnect()) {
                return;
              }
              return self.recoverFromFatalError(downgradeErr, downgradeErr);
            }
          }
          if (!isActiveConnect()) {
            return;
          }
          if (!self.options.enableReadyCheck) {
            if (!finishHandshake()) {
              return;
            }
            return exports.readyHandler(self)();
          }
          self._readyCheck(function(err, info) {
            if (!isActiveConnect()) {
              return;
            }
            if (err) {
              self.recoverFromFatalError(err, err);
            } else if (self.connector.check(info)) {
              if (!finishHandshake()) {
                return;
              }
              exports.readyHandler(self)();
            } else {
              self.disconnect(true);
            }
          });
        } catch (err) {
          self.recoverFromFatalError(err, err);
        }
      };
    }
    exports.connectHandler = connectHandler;
    function handleAuthError(err) {
      const msg = err.message || "";
      if (msg.indexOf("no password is set") !== -1) {
        console.warn("[WARN] Redis server does not require a password, but a password was supplied.");
        return;
      }
      if (msg.indexOf("without any password configured for the default user") !== -1) {
        console.warn("[WARN] This Redis server's `default` user does not require a password, but a password was supplied");
        return;
      }
      if (msg.indexOf("wrong number of arguments for 'auth' command") !== -1) {
        console.warn(`[ERROR] The server returned "wrong number of arguments for 'auth' command". You are probably passing both username and password to Redis version 5 or below. You should only pass the 'password' option for Redis version 5 and under.`);
        return;
      }
      throw err;
    }
    function isProtocolNegotiationError(err) {
      const msg = (err.message || "").toUpperCase();
      return msg.includes("NOPROTO") || msg.includes("UNKNOWN COMMAND") && msg.includes("HELLO");
    }
    function abortError(command) {
      const err = new redis_errors_1.AbortError("Command aborted due to connection close");
      err.command = {
        name: command.name,
        args: command.args
      };
      return err;
    }
    function abortIncompletePipelines(commandQueue) {
      let expectedIndex = 0;
      for (let i = 0; i < commandQueue.length; ) {
        const command = commandQueue.peekAt(i)?.command;
        const pipelineIndex = command.pipelineIndex;
        if (pipelineIndex === void 0 || pipelineIndex === 0) {
          expectedIndex = 0;
        }
        if (pipelineIndex !== void 0 && pipelineIndex !== expectedIndex++) {
          commandQueue.remove(i, 1);
          command.reject(abortError(command));
          continue;
        }
        i++;
      }
    }
    function abortTransactionFragments(commandQueue) {
      for (let i = 0; i < commandQueue.length; ) {
        const command = commandQueue.peekAt(i)?.command;
        if (command.name === "multi") {
          break;
        }
        if (command.name === "exec") {
          commandQueue.remove(i, 1);
          command.reject(abortError(command));
          break;
        }
        if (command.inTransaction) {
          commandQueue.remove(i, 1);
          command.reject(abortError(command));
        } else {
          i++;
        }
      }
    }
    function closeHandler(self) {
      return function() {
        const prevStatus = self.status;
        self.setStatus("close");
        if (self.socketTimeoutTimer !== void 0) {
          clearTimeout(self.socketTimeoutTimer);
          self.socketTimeoutTimer = void 0;
        }
        if (self.commandQueue.length) {
          abortIncompletePipelines(self.commandQueue);
        }
        if (self.offlineQueue.length) {
          abortTransactionFragments(self.offlineQueue);
        }
        if (prevStatus === "ready") {
          if (!self.prevCondition) {
            self.prevCondition = self.condition;
          }
          if (self.commandQueue.length) {
            self.prevCommandQueue = self.commandQueue;
          }
        }
        if (self.manuallyClosing) {
          self.manuallyClosing = false;
          debug("skip reconnecting since the connection is manually closed.");
          return close();
        }
        if (typeof self.options.retryStrategy !== "function") {
          debug("skip reconnecting because `retryStrategy` is not a function");
          return close();
        }
        const retryDelay = self.options.retryStrategy(++self.retryAttempts);
        if (typeof retryDelay !== "number") {
          debug("skip reconnecting because `retryStrategy` doesn't return a number");
          return close();
        }
        debug("reconnect in %sms", retryDelay);
        self.setStatus("reconnecting", retryDelay);
        self.reconnectTimeout = setTimeout(function() {
          self.reconnectTimeout = null;
          self.connect().catch(utils_1.noop);
        }, retryDelay);
        const { maxRetriesPerRequest } = self.options;
        if (typeof maxRetriesPerRequest === "number") {
          if (maxRetriesPerRequest < 0) {
            debug("maxRetriesPerRequest is negative, ignoring...");
          } else {
            const remainder = self.retryAttempts % (maxRetriesPerRequest + 1);
            if (remainder === 0) {
              debug("reach maxRetriesPerRequest limitation, flushing command queue...");
              self.flushQueue(new errors_1.MaxRetriesPerRequestError(maxRetriesPerRequest));
            }
          }
        }
      };
      function close() {
        self.setStatus("end");
        self.flushQueue(new Error(utils_1.CONNECTION_CLOSED_ERROR_MSG));
      }
    }
    exports.closeHandler = closeHandler;
    function errorHandler(self) {
      return function(error) {
        debug("error: %s", error);
        self.silentEmit("error", error);
      };
    }
    exports.errorHandler = errorHandler;
    function readyHandler(self) {
      return function() {
        self.setStatus("ready");
        self.retryAttempts = 0;
        if (self.options.monitor) {
          self.call("monitor").then(() => self.setStatus("monitoring"), (error) => self.emit("error", error));
          const { sendCommand } = self;
          self.sendCommand = function(command) {
            if (Command_1.default.checkFlag("VALID_IN_MONITOR_MODE", command.name)) {
              return sendCommand.call(self, command);
            }
            command.reject(new Error("Connection is in monitoring mode, can't process commands."));
            return command.promise;
          };
          self.once("close", function() {
            delete self.sendCommand;
          });
          return;
        }
        const finalSelect = self.prevCondition ? self.prevCondition.select : self.condition.select;
        if (self.prevCondition) {
          const condition = self.prevCondition;
          self.prevCondition = null;
          if (condition.subscriber && self.options.autoResubscribe) {
            if (self.condition.select !== finalSelect) {
              debug("connect to db [%d]", finalSelect);
              self.select(finalSelect);
            }
            const subscribeChannels = condition.subscriber.channels("subscribe");
            if (subscribeChannels.length) {
              debug("subscribe %d channels", subscribeChannels.length);
              self.subscribe(subscribeChannels);
            }
            const psubscribeChannels = condition.subscriber.channels("psubscribe");
            if (psubscribeChannels.length) {
              debug("psubscribe %d channels", psubscribeChannels.length);
              self.psubscribe(psubscribeChannels);
            }
            const ssubscribeChannels = condition.subscriber.channels("ssubscribe");
            if (ssubscribeChannels.length) {
              debug("ssubscribe %s", ssubscribeChannels.length);
              for (const channel of ssubscribeChannels) {
                self.ssubscribe(channel);
              }
            }
          }
        }
        if (self.prevCommandQueue) {
          if (self.options.autoResendUnfulfilledCommands) {
            debug("resend %d unfulfilled commands", self.prevCommandQueue.length);
            while (self.prevCommandQueue.length > 0) {
              const item = self.prevCommandQueue.shift();
              if (item.select !== self.condition.select && item.command.name !== "select") {
                self.select(item.select);
              }
              self.sendCommand(item.command, item.stream);
            }
          } else {
            self.prevCommandQueue = null;
          }
        }
        if (self.offlineQueue.length) {
          debug("send %d commands in offline queue", self.offlineQueue.length);
          const offlineQueue = self.offlineQueue;
          self.resetOfflineQueue();
          while (offlineQueue.length > 0) {
            const item = offlineQueue.shift();
            if (item.select !== self.condition.select && item.command.name !== "select") {
              self.select(item.select);
            }
            self.sendCommand(item.command, item.stream);
          }
        }
        if (self.condition.select !== finalSelect) {
          debug("connect to db [%d]", finalSelect);
          self.select(finalSelect);
        }
      };
    }
    exports.readyHandler = readyHandler;
  }
});

// node_modules/ioredis/built/redis/RedisOptions.js
var require_RedisOptions = __commonJS({
  "node_modules/ioredis/built/redis/RedisOptions.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.DEFAULT_REDIS_OPTIONS = void 0;
    exports.DEFAULT_REDIS_OPTIONS = {
      // Connection
      port: 6379,
      host: "localhost",
      family: 0,
      connectTimeout: 1e4,
      disconnectTimeout: 2e3,
      retryStrategy: function(times) {
        const jitter = Math.floor(Math.random() * 200);
        const delay = Math.min(Math.pow(2, times - 1) * 50, 5e3);
        return delay + jitter;
      },
      keepAlive: 3e4,
      noDelay: true,
      connectionName: null,
      disableClientInfo: false,
      clientInfoTag: void 0,
      // Sentinel
      sentinels: null,
      name: null,
      role: "master",
      sentinelRetryStrategy: function(times) {
        return Math.min(times * 10, 1e3);
      },
      sentinelReconnectStrategy: function() {
        return 6e4;
      },
      natMap: null,
      enableTLSForSentinelMode: false,
      updateSentinels: true,
      failoverDetector: false,
      // Status
      username: null,
      password: null,
      db: 0,
      // Others
      enableOfflineQueue: true,
      enableReadyCheck: true,
      autoResubscribe: true,
      autoResendUnfulfilledCommands: true,
      lazyConnect: false,
      keyPrefix: "",
      reconnectOnError: null,
      readOnly: false,
      stringNumbers: false,
      protocol: 3,
      replyMapping: "legacy",
      maxRetriesPerRequest: 20,
      maxLoadingRetryTime: 1e4,
      enableAutoPipelining: false,
      autoPipeliningIgnoredCommands: [],
      sentinelMaxConnections: 10,
      blockingTimeoutGrace: 100
    };
  }
});

// node_modules/ioredis/built/Redis.js
var require_Redis = __commonJS({
  "node_modules/ioredis/built/Redis.js"(exports) {
    "use strict";
    var _a;
    Object.defineProperty(exports, "__esModule", { value: true });
    var commands_1 = require_built();
    var events_1 = __require("events");
    var standard_as_callback_1 = require_built2();
    var cluster_1 = require_cluster();
    var Command_1 = require_Command();
    var connectors_1 = require_connectors();
    var SentinelConnector_1 = require_SentinelConnector();
    var eventHandler = require_event_handler();
    var RedisOptions_1 = require_RedisOptions();
    var ScanStream_1 = require_ScanStream();
    var transaction_1 = require_transaction();
    var utils_1 = require_utils2();
    var tracing_1 = require_tracing();
    var applyMixin_1 = require_applyMixin();
    var Commander_1 = require_Commander();
    var lodash_1 = require_lodash();
    var HimportCoordinator_1 = require_HimportCoordinator();
    var HimportCoordinator_2 = require_HimportCoordinator();
    var Deque = require_denque();
    var debug = (0, utils_1.Debug)("redis");
    var Redis3 = class _Redis2 extends Commander_1.default {
      /**
       * Create a Redis instance.
       * This is the same as `new Redis()` but is included for compatibility with node-redis.
       */
      static createClient(...args) {
        return new _Redis2(...args);
      }
      constructor(arg1, arg2, arg3) {
        super();
        this.status = "wait";
        this.isCluster = false;
        this.reconnectTimeout = null;
        this.connectionEpoch = 0;
        this.retryAttempts = 0;
        this.manuallyClosing = false;
        this[_a] = false;
        this._autoPipelines = /* @__PURE__ */ new Map();
        this._runningAutoPipelines = /* @__PURE__ */ new Set();
        this.parseOptions(arg1, arg2, arg3);
        events_1.EventEmitter.call(this);
        this.options.himportFieldsets = (0, HimportCoordinator_2.cloneHimportFieldsets)(this.options.himportFieldsets);
        if (this.options.himportFieldsets?.length) {
          (0, HimportCoordinator_1.bindHimportCoordinator)(this, new HimportCoordinator_1.default(this.options.himportFieldsets), "standalone");
        }
        this.resetCommandQueue();
        this.resetOfflineQueue();
        if (this.options.Connector) {
          this.connector = new this.options.Connector(this.options);
        } else if (this.options.sentinels) {
          const sentinelConnector = new SentinelConnector_1.default(this.options);
          sentinelConnector.emitter = this;
          this.connector = sentinelConnector;
        } else {
          this.connector = new connectors_1.StandaloneConnector(this.options);
        }
        if (this.options.scripts) {
          Object.entries(this.options.scripts).forEach(([name, definition]) => {
            this.defineCommand(name, definition);
          });
        }
        if (this.options.lazyConnect) {
          this.setStatus("wait");
        } else {
          this.connect().catch(lodash_1.noop);
        }
      }
      get autoPipelineQueueSize() {
        let queued = 0;
        for (const pipeline of this._autoPipelines.values()) {
          queued += pipeline.length;
        }
        return queued;
      }
      /**
       * Create a connection to Redis.
       * This method will be invoked automatically when creating a new Redis instance
       * unless `lazyConnect: true` is passed.
       *
       * When calling this method manually, a Promise is returned, which will
       * be resolved when the connection status is ready. The promise can reject
       * if the connection fails, times out, or if Redis is already connecting/connected.
       */
      connect(callback) {
        const promise = (0, tracing_1.traceConnect)(() => this._connect(), () => {
          const { address, port } = this._getServerAddress();
          return {
            serverAddress: address,
            serverPort: port,
            connectionEpoch: this.connectionEpoch
          };
        });
        return (0, standard_as_callback_1.default)(promise, callback);
      }
      _connect() {
        return new Promise((resolve, reject) => {
          if (this.status === "connecting" || this.status === "connect" || this.status === "ready") {
            reject(new Error("Redis is already connecting/connected"));
            return;
          }
          this.connectionEpoch += 1;
          this.setStatus("connecting");
          const { options } = this;
          this.condition = {
            select: options.db,
            auth: options.username ? [options.username, options.password] : options.password,
            subscriber: false,
            protocol: options.protocol,
            replyMapping: options.protocol === 3 && options.replyMapping === "resp3" ? "resp3" : "legacy",
            handshake: false
          };
          const _this = this;
          (0, standard_as_callback_1.default)(this.connector.connect(function(type, err) {
            _this.silentEmit(type, err);
          }), function(err, stream) {
            if (err) {
              _this.flushQueue(err);
              _this.silentEmit("error", err);
              reject(err);
              _this.setStatus("end");
              return;
            }
            let CONNECT_EVENT = options.tls ? "secureConnect" : "connect";
            if ("sentinels" in options && options.sentinels && !options.enableTLSForSentinelMode) {
              CONNECT_EVENT = "connect";
            }
            _this.stream = stream;
            if (options.noDelay) {
              stream.setNoDelay(true);
            }
            if (typeof options.keepAlive === "number") {
              if (stream.connecting) {
                stream.once(CONNECT_EVENT, () => {
                  stream.setKeepAlive(true, options.keepAlive);
                });
              } else {
                stream.setKeepAlive(true, options.keepAlive);
              }
            }
            if (stream.connecting) {
              stream.once(CONNECT_EVENT, eventHandler.connectHandler(_this));
              if (options.connectTimeout) {
                let connectTimeoutCleared = false;
                stream.setTimeout(options.connectTimeout, function() {
                  if (connectTimeoutCleared) {
                    return;
                  }
                  stream.setTimeout(0);
                  stream.destroy();
                  const err2 = new Error("connect ETIMEDOUT");
                  err2.errorno = "ETIMEDOUT";
                  err2.code = "ETIMEDOUT";
                  err2.syscall = "connect";
                  eventHandler.errorHandler(_this)(err2);
                });
                stream.once(CONNECT_EVENT, function() {
                  connectTimeoutCleared = true;
                  stream.setTimeout(0);
                });
              }
            } else if (stream.destroyed) {
              const firstError = _this.connector.firstError;
              if (firstError) {
                process.nextTick(() => {
                  eventHandler.errorHandler(_this)(firstError);
                });
              }
              process.nextTick(eventHandler.closeHandler(_this));
            } else {
              process.nextTick(eventHandler.connectHandler(_this));
            }
            if (!stream.destroyed) {
              stream.once("error", eventHandler.errorHandler(_this));
              stream.once("close", eventHandler.closeHandler(_this));
            }
            const connectionReadyHandler = function() {
              _this.removeListener("close", connectionCloseHandler);
              resolve();
            };
            var connectionCloseHandler = function() {
              _this.removeListener("ready", connectionReadyHandler);
              reject(new Error(utils_1.CONNECTION_CLOSED_ERROR_MSG));
            };
            _this.once("ready", connectionReadyHandler);
            _this.once("close", connectionCloseHandler);
          });
        });
      }
      /**
       * Disconnect from Redis.
       *
       * This method closes the connection immediately,
       * and may lose some pending replies that haven't written to client.
       * If you want to wait for the pending replies, use Redis#quit instead.
       */
      disconnect(reconnect = false) {
        if (!reconnect) {
          this.manuallyClosing = true;
        }
        if (this.reconnectTimeout && !reconnect) {
          clearTimeout(this.reconnectTimeout);
          this.reconnectTimeout = null;
        }
        if (this.status === "wait") {
          eventHandler.closeHandler(this)();
        } else {
          this.connector.disconnect();
        }
      }
      /**
       * Disconnect from Redis.
       *
       * @deprecated
       */
      end() {
        this.disconnect();
      }
      /**
       * Create a new instance with the same options as the current one.
       *
       * @example
       * ```js
       * var redis = new Redis(6380);
       * var anotherRedis = redis.duplicate();
       * ```
       */
      duplicate(override) {
        return new _Redis2({
          ...this.options,
          ...override ?? {}
        });
      }
      /**
       * Mode of the connection.
       *
       * One of `"normal"`, `"subscriber"`, or `"monitor"`. When the connection is
       * not in `"normal"` mode, certain commands are not allowed.
       */
      get mode() {
        return this.options.monitor ? "monitor" : (0, utils_1.isResp2SubscriberMode)(this.condition) ? "subscriber" : "normal";
      }
      /**
       * Listen for all requests received by the server in real time.
       *
       * This command will create a new connection to Redis and send a
       * MONITOR command via the new connection in order to avoid disturbing
       * the current connection.
       *
       * @param callback The callback function. If omit, a promise will be returned.
       * @example
       * ```js
       * var redis = new Redis();
       * redis.monitor(function (err, monitor) {
       *   // Entering monitoring mode.
       *   monitor.on('monitor', function (time, args, source, database) {
       *     console.log(time + ": " + util.inspect(args));
       *   });
       * });
       *
       * // supports promise as well as other commands
       * redis.monitor().then(function (monitor) {
       *   monitor.on('monitor', function (time, args, source, database) {
       *     console.log(time + ": " + util.inspect(args));
       *   });
       * });
       * ```
       */
      monitor(callback) {
        const monitorInstance = this.duplicate({
          monitor: true,
          lazyConnect: false,
          himportFieldsets: void 0
        });
        return (0, standard_as_callback_1.default)(new Promise(function(resolve, reject) {
          monitorInstance.once("error", reject);
          monitorInstance.once("monitoring", function() {
            resolve(monitorInstance);
          });
        }), callback);
      }
      /**
       * Send a command to Redis
       *
       * This method is used internally and in most cases you should not
       * use it directly. If you need to send a command that is not supported
       * by the library, you can use the `call` method:
       *
       * ```js
       * const redis = new Redis();
       *
       * redis.call('set', 'foo', 'bar');
       * // or
       * redis.call(['set', 'foo', 'bar']);
       * ```
       *
       * @ignore
       */
      sendCommand(command, stream) {
        command.setReplyContext(this.condition ?? this.options);
        if (this.status === "wait") {
          this.connect().catch(lodash_1.noop);
        }
        if (this.status === "end") {
          command.reject(new Error(utils_1.CONNECTION_CLOSED_ERROR_MSG));
          return command.promise;
        }
        if ((0, utils_1.isResp2SubscriberMode)(this.condition) && !Command_1.default.checkFlag("VALID_IN_SUBSCRIBER_MODE", command.name)) {
          command.reject(new Error("Connection in subscriber mode, only subscriber commands may be used"));
          return command.promise;
        }
        if (typeof this.options.commandTimeout === "number") {
          command.setTimeout(this.options.commandTimeout);
        }
        if (!stream && this[HimportCoordinator_1.hasHimportCoordinator] && (0, HimportCoordinator_1.interceptHimportCommand)(this, command, this.status === "ready", () => {
          this.sendCommand(command);
        })) {
          return command.promise;
        }
        const blockingTimeout = this.getBlockingTimeoutInMs(command);
        let writable = this.status === "ready" || // During handshake, only internal handshake commands may bypass the queue.
        !stream && this.status === "connect" && this.condition?.handshake && (Command_1.default.checkFlag("HANDSHAKE_COMMANDS", command.name) || (0, HimportCoordinator_1.isInternalHimportCommand)(command)) || // Before ready, loading-safe commands remain writable after handshake.
        !stream && this.status === "connect" && !this.condition?.handshake && (0, commands_1.exists)(command.name, { caseInsensitive: true }) && (0, commands_1.hasFlag)(command.name, "loading", { nameCaseInsensitive: true });
        if (!this.stream) {
          writable = false;
        } else if (!this.stream.writable) {
          writable = false;
        } else if (this.stream._writableState && this.stream._writableState.ended) {
          writable = false;
        }
        if (!writable) {
          if (!this.options.enableOfflineQueue) {
            command.reject(new Error("Stream isn't writeable and enableOfflineQueue options is false"));
            return command.promise;
          }
          if (command.name === "quit" && this.offlineQueue.length === 0) {
            this.disconnect();
            command.resolve(Buffer.from("OK"));
            return command.promise;
          }
          if (debug.enabled) {
            debug("queue command[%s]: %d -> %s(%o)", this._getDescription(), this.condition.select, command.name, command.args);
          }
          this.offlineQueue.push({
            command,
            stream,
            select: this.condition.select
          });
          if (Command_1.default.checkFlag("BLOCKING_COMMANDS", command.name)) {
            const offlineTimeout = this.getConfiguredBlockingTimeout();
            if (offlineTimeout !== void 0) {
              command.setBlockingTimeout(offlineTimeout);
            }
          }
        } else {
          if (debug.enabled) {
            debug("write command[%s]: %d -> %s(%o)", this._getDescription(), this.condition?.select, command.name, command.args);
          }
          if (stream) {
            if ("isPipeline" in stream && stream.isPipeline) {
              stream.write(command.toWritable(stream.destination.redis.stream));
            } else {
              stream.write(command.toWritable(stream));
            }
          } else {
            this.stream.write(command.toWritable(this.stream));
          }
          this.commandQueue.push({
            command,
            stream,
            select: this.condition.select
          });
          if (blockingTimeout !== void 0) {
            command.setBlockingTimeout(blockingTimeout);
          }
          if (Command_1.default.checkFlag("WILL_DISCONNECT", command.name)) {
            this.manuallyClosing = true;
          }
          if (this.options.socketTimeout !== void 0 && this.socketTimeoutTimer === void 0) {
            this.setSocketTimeout();
          }
        }
        if (command.name === "select" && (0, utils_1.isInt)(command.args[0])) {
          const db = parseInt(command.args[0], 10);
          if (this.condition.select !== db) {
            this.condition.select = db;
            this.emit("select", db);
            debug("switch to db [%d]", this.condition.select);
          }
        }
        if (!writable || command.isTraced) {
          return command.promise;
        }
        command.isTraced = true;
        return (0, tracing_1.traceCommand)(() => command.promise, () => this._buildCommandContext(command));
      }
      getBlockingTimeoutInMs(command) {
        if (!Command_1.default.checkFlag("BLOCKING_COMMANDS", command.name)) {
          return void 0;
        }
        const configuredTimeout = this.getConfiguredBlockingTimeout();
        if (configuredTimeout === void 0) {
          return void 0;
        }
        const timeout = command.extractBlockingTimeout();
        if (typeof timeout === "number") {
          if (timeout > 0) {
            return timeout + (this.options.blockingTimeoutGrace ?? RedisOptions_1.DEFAULT_REDIS_OPTIONS.blockingTimeoutGrace);
          }
          return configuredTimeout;
        }
        if (timeout === null) {
          return configuredTimeout;
        }
        return void 0;
      }
      getConfiguredBlockingTimeout() {
        if (typeof this.options.blockingTimeout === "number" && this.options.blockingTimeout > 0) {
          return this.options.blockingTimeout;
        }
        return void 0;
      }
      setSocketTimeout() {
        const stream = this.stream;
        this.socketTimeoutTimer = setTimeout(() => {
          stream.destroy(new Error(`Socket timeout. Expecting data, but didn't receive any in ${this.options.socketTimeout}ms.`));
          this.socketTimeoutTimer = void 0;
        }, this.options.socketTimeout);
        stream.once("data", () => {
          clearTimeout(this.socketTimeoutTimer);
          this.socketTimeoutTimer = void 0;
          if (this.commandQueue.length === 0)
            return;
          this.setSocketTimeout();
        });
      }
      scanStream(options) {
        return this.createScanStream("scan", { options });
      }
      scanBufferStream(options) {
        return this.createScanStream("scanBuffer", { options });
      }
      sscanStream(key, options) {
        return this.createScanStream("sscan", { key, options });
      }
      sscanBufferStream(key, options) {
        return this.createScanStream("sscanBuffer", { key, options });
      }
      hscanStream(key, options) {
        return this.createScanStream("hscan", { key, options });
      }
      hscanBufferStream(key, options) {
        return this.createScanStream("hscanBuffer", { key, options });
      }
      zscanStream(key, options) {
        return this.createScanStream("zscan", { key, options });
      }
      zscanBufferStream(key, options) {
        return this.createScanStream("zscanBuffer", { key, options });
      }
      /**
       * Emit only when there's at least one listener.
       *
       * @ignore
       */
      silentEmit(eventName, arg) {
        let error;
        if (eventName === "error") {
          error = arg;
          if (this.status === "end") {
            return;
          }
          if (this.manuallyClosing) {
            if (error instanceof Error && (error.message === utils_1.CONNECTION_CLOSED_ERROR_MSG || // @ts-expect-error
            error.syscall === "connect" || // @ts-expect-error
            error.syscall === "read")) {
              return;
            }
          }
        }
        if (this.listeners(eventName).length > 0) {
          return this.emit.apply(this, arguments);
        }
        if (error && error instanceof Error) {
          console.error("[ioredis] Unhandled error event:", error.stack);
        }
        return false;
      }
      /**
       * @ignore
       */
      recoverFromFatalError(_commandError, err, options) {
        this.flushQueue(err, options);
        this.silentEmit("error", err);
        this.disconnect(true);
      }
      /**
       * @ignore
       */
      handleReconnection(err, item) {
        let needReconnect = false;
        const ignoreReconnectOnError = Command_1.default.checkFlag("IGNORE_RECONNECT_ON_ERROR", item.command.name) || this.condition?.handshake && Command_1.default.checkFlag("HANDSHAKE_COMMANDS", item.command.name);
        if (this.options.reconnectOnError && !ignoreReconnectOnError) {
          needReconnect = this.options.reconnectOnError(err);
        }
        switch (needReconnect) {
          case 1:
          case true:
            if (this.status !== "reconnecting") {
              this.disconnect(true);
            }
            item.command.reject(err);
            break;
          case 2:
            if (this.status !== "reconnecting") {
              this.disconnect(true);
            }
            if (this.condition?.select !== item.select && item.command.name !== "select") {
              this.select(item.select);
            }
            this.sendCommand(item.command);
            break;
          default:
            item.command.reject(err);
        }
      }
      /**
       * @ignore
       */
      _getServerAddress() {
        if ("path" in this.options && this.options.path) {
          return { address: this.options.path, port: void 0 };
        }
        return {
          address: "host" in this.options && this.options.host || "localhost",
          port: "port" in this.options && this.options.port || 6379
        };
      }
      _buildCommandContext(command) {
        const { address, port } = this._getServerAddress();
        return {
          command: command.name,
          args: (0, tracing_1.sanitizeArgs)(command.name, command.args),
          database: this.condition?.select ?? this.options.db ?? 0,
          serverAddress: address,
          serverPort: port
        };
      }
      _buildBatchContext(batchSize) {
        const { address, port } = this._getServerAddress();
        return {
          batchMode: "MULTI",
          batchSize,
          database: this.condition?.select ?? this.options.db ?? 0,
          serverAddress: address,
          serverPort: port
        };
      }
      /**
       * Get description of the connection. Used for debugging.
       */
      _getDescription() {
        let description;
        if ("path" in this.options && this.options.path) {
          description = this.options.path;
        } else if (this.stream && this.stream.remoteAddress && this.stream.remotePort) {
          description = this.stream.remoteAddress + ":" + this.stream.remotePort;
        } else if ("host" in this.options && this.options.host) {
          description = this.options.host + ":" + this.options.port;
        } else {
          description = "";
        }
        if (this.options.connectionName) {
          description += ` (${this.options.connectionName})`;
        }
        return description;
      }
      resetCommandQueue() {
        this.commandQueue = new Deque();
      }
      resetOfflineQueue() {
        this.offlineQueue = new Deque();
      }
      parseOptions(...args) {
        const options = {};
        let isTls = false;
        for (let i = 0; i < args.length; ++i) {
          const arg = args[i];
          if (arg === null || typeof arg === "undefined") {
            continue;
          }
          if (typeof arg === "object") {
            (0, lodash_1.defaults)(options, arg);
          } else if (typeof arg === "string") {
            (0, lodash_1.defaults)(options, (0, utils_1.parseURL)(arg));
            if (arg.startsWith("rediss://")) {
              isTls = true;
            }
          } else if (typeof arg === "number") {
            options.port = arg;
          } else {
            throw new Error("Invalid argument " + arg);
          }
        }
        if (isTls) {
          (0, lodash_1.defaults)(options, { tls: true });
        }
        (0, lodash_1.defaults)(options, _Redis2.defaultOptions);
        if (typeof options.port === "string") {
          options.port = parseInt(options.port, 10);
        }
        if (typeof options.db === "string") {
          options.db = parseInt(options.db, 10);
        }
        if (options.replyMapping === "resp3" && options.protocol !== 3) {
          throw new Error('The "resp3" replyMapping is only supported with protocol 3');
        }
        this.options = (0, utils_1.resolveTLSProfile)(options);
      }
      /**
       * Change instance's status
       */
      setStatus(status, arg) {
        if (debug.enabled) {
          debug("status[%s]: %s -> %s", this._getDescription(), this.status || "[empty]", status);
        }
        this.status = status;
        process.nextTick(this.emit.bind(this, status, arg));
      }
      createScanStream(command, { key, options = {} }) {
        return new ScanStream_1.default({
          objectMode: true,
          key,
          redis: this,
          command,
          ...options
        });
      }
      /**
       * Flush offline queue and command queue with error.
       *
       * @param error The error object to send to the commands
       * @param options options
       */
      flushQueue(error, options) {
        options = (0, lodash_1.defaults)({}, options, {
          offlineQueue: true,
          commandQueue: true
        });
        let item;
        if (options.offlineQueue) {
          while (item = this.offlineQueue.shift()) {
            item.command.reject(error);
          }
        }
        if (options.commandQueue) {
          if (this.commandQueue.length > 0) {
            if (this.stream) {
              this.stream.removeAllListeners("data");
            }
            while (item = this.commandQueue.shift()) {
              item.command.reject(error);
            }
          }
        }
      }
      /**
       * Check whether Redis has finished loading the persistent data and is able to
       * process commands.
       */
      _readyCheck(callback) {
        const _this = this;
        this.info(function(err, res) {
          if (err) {
            if (err.message && err.message.includes("NOPERM")) {
              console.warn(`Skipping the ready check because INFO command fails: "${err.message}". You can disable ready check with "enableReadyCheck". More: https://github.com/luin/ioredis/wiki/Disable-ready-check.`);
              return callback(null, {});
            }
            return callback(err);
          }
          if (typeof res !== "string") {
            return callback(null, res);
          }
          const info = {};
          const lines = res.split("\r\n");
          for (let i = 0; i < lines.length; ++i) {
            const [fieldName, ...fieldValueParts] = lines[i].split(":");
            const fieldValue = fieldValueParts.join(":");
            if (fieldValue) {
              info[fieldName] = fieldValue;
            }
          }
          if (!info.loading || info.loading === "0") {
            callback(null, info);
          } else {
            const loadingEtaMs = (info.loading_eta_seconds || 1) * 1e3;
            const retryTime = _this.options.maxLoadingRetryTime && _this.options.maxLoadingRetryTime < loadingEtaMs ? _this.options.maxLoadingRetryTime : loadingEtaMs;
            debug("Redis server still loading, trying again in " + retryTime + "ms");
            setTimeout(function() {
              _this._readyCheck(callback);
            }, retryTime);
          }
        }).catch(lodash_1.noop);
      }
    };
    _a = HimportCoordinator_1.hasHimportCoordinator;
    Redis3.Cluster = cluster_1.default;
    Redis3.Command = Command_1.default;
    Redis3.defaultOptions = RedisOptions_1.DEFAULT_REDIS_OPTIONS;
    (0, applyMixin_1.default)(Redis3, events_1.EventEmitter);
    (0, transaction_1.addTransactionSupport)(Redis3.prototype);
    exports.default = Redis3;
  }
});

// node_modules/ioredis/built/index.js
var require_built3 = __commonJS({
  "node_modules/ioredis/built/index.js"(exports, module) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.print = exports.ReplyError = exports.SentinelIterator = exports.SentinelConnector = exports.AbstractConnector = exports.Pipeline = exports.ScanStream = exports.Command = exports.Cluster = exports.Redis = exports.default = void 0;
    exports = module.exports = require_Redis().default;
    var Redis_1 = require_Redis();
    Object.defineProperty(exports, "default", { enumerable: true, get: function() {
      return Redis_1.default;
    } });
    var Redis_2 = require_Redis();
    Object.defineProperty(exports, "Redis", { enumerable: true, get: function() {
      return Redis_2.default;
    } });
    var cluster_1 = require_cluster();
    Object.defineProperty(exports, "Cluster", { enumerable: true, get: function() {
      return cluster_1.default;
    } });
    var Command_1 = require_Command();
    Object.defineProperty(exports, "Command", { enumerable: true, get: function() {
      return Command_1.default;
    } });
    var ScanStream_1 = require_ScanStream();
    Object.defineProperty(exports, "ScanStream", { enumerable: true, get: function() {
      return ScanStream_1.default;
    } });
    var Pipeline_1 = require_Pipeline();
    Object.defineProperty(exports, "Pipeline", { enumerable: true, get: function() {
      return Pipeline_1.default;
    } });
    var AbstractConnector_1 = require_AbstractConnector();
    Object.defineProperty(exports, "AbstractConnector", { enumerable: true, get: function() {
      return AbstractConnector_1.default;
    } });
    var SentinelConnector_1 = require_SentinelConnector();
    Object.defineProperty(exports, "SentinelConnector", { enumerable: true, get: function() {
      return SentinelConnector_1.default;
    } });
    Object.defineProperty(exports, "SentinelIterator", { enumerable: true, get: function() {
      return SentinelConnector_1.SentinelIterator;
    } });
    exports.ReplyError = require_redis_errors().ReplyError;
    Object.defineProperty(exports, "Promise", {
      get() {
        console.warn("ioredis v5 does not support plugging third-party Promise library anymore. Native Promise will be used.");
        return Promise;
      },
      set(_lib) {
        console.warn("ioredis v5 does not support plugging third-party Promise library anymore. Native Promise will be used.");
      }
    });
    function print(err, reply2) {
      if (err) {
        console.log("Error: " + err);
      } else {
        console.log("Reply: " + reply2);
      }
    }
    exports.print = print;
  }
});

// src/server/session/session-manager.ts
import { randomBytes, createHash } from "crypto";

// node_modules/uncrypto/dist/crypto.node.mjs
import nodeCrypto from "node:crypto";
var subtle = nodeCrypto.webcrypto?.subtle || {};

// node_modules/@upstash/redis/chunk-4WQYU7T6.mjs
var __defProp2 = Object.defineProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp2(target, name, { get: all[name], enumerable: true });
};
var error_exports = {};
__export(error_exports, {
  UpstashError: () => UpstashError,
  UpstashJSONParseError: () => UpstashJSONParseError,
  UrlError: () => UrlError
});
var UpstashError = class extends Error {
  constructor(message, options) {
    super(message, options);
    this.name = "UpstashError";
  }
};
var UrlError = class extends Error {
  constructor(url) {
    super(
      `Upstash Redis client was passed an invalid URL. You should pass a URL starting with https. Received: "${url}". `
    );
    this.name = "UrlError";
  }
};
var UpstashJSONParseError = class extends UpstashError {
  constructor(body, options) {
    const truncatedBody = body.length > 200 ? body.slice(0, 200) + "..." : body;
    super(`Unable to parse response body: ${truncatedBody}`, options);
    this.name = "UpstashJSONParseError";
  }
};
function parseRecursive(obj) {
  const parsed = Array.isArray(obj) ? obj.map((o) => {
    try {
      return parseRecursive(o);
    } catch {
      return o;
    }
  }) : JSON.parse(obj);
  if (typeof parsed === "number" && parsed.toString() !== obj) {
    return obj;
  }
  return parsed;
}
function parseResponse(result) {
  try {
    return parseRecursive(result);
  } catch {
    return result;
  }
}
function deserializeScanResponse(result) {
  return [result[0], ...parseResponse(result.slice(1))];
}
function deserializeScanWithTypesResponse(result) {
  const [cursor, keys] = result;
  const parsedKeys = [];
  for (let i = 0; i < keys.length; i += 2) {
    parsedKeys.push({ key: keys[i], type: keys[i + 1] });
  }
  return [cursor, parsedKeys];
}
function mergeHeaders(...headers) {
  const merged = {};
  for (const header of headers) {
    if (!header) continue;
    for (const [key, value] of Object.entries(header)) {
      if (value !== void 0 && value !== null) {
        merged[key] = value;
      }
    }
  }
  return merged;
}
function kvArrayToObject(v) {
  if (typeof v === "object" && v !== null && !Array.isArray(v)) return v;
  if (!Array.isArray(v)) return {};
  const obj = {};
  for (let i = 0; i < v.length; i += 2) {
    if (typeof v[i] === "string") obj[v[i]] = v[i + 1];
  }
  return obj;
}
var MAX_BUFFER_SIZE = 1024 * 1024;
var HttpClient = class {
  baseUrl;
  headers;
  options;
  readYourWrites;
  upstashSyncToken = "";
  hasCredentials;
  retry;
  constructor(config) {
    this.options = {
      backend: config.options?.backend,
      agent: config.agent,
      responseEncoding: config.responseEncoding ?? "base64",
      // default to base64
      cache: config.cache,
      signal: config.signal,
      keepAlive: config.keepAlive ?? true
    };
    this.upstashSyncToken = "";
    this.readYourWrites = config.readYourWrites ?? true;
    this.baseUrl = (config.baseUrl || "").replace(/\/$/, "");
    const urlRegex = /^https?:\/\/[^\s#$./?].\S*$/;
    if (this.baseUrl && !urlRegex.test(this.baseUrl)) {
      throw new UrlError(this.baseUrl);
    }
    this.headers = {
      "Content-Type": "application/json",
      ...config.headers
    };
    this.hasCredentials = Boolean(this.baseUrl && this.headers.authorization.split(" ")[1]);
    if (this.options.responseEncoding === "base64") {
      this.headers["Upstash-Encoding"] = "base64";
    }
    this.retry = typeof config.retry === "boolean" && !config.retry ? {
      attempts: 1,
      backoff: () => 0
    } : {
      attempts: config.retry?.retries ?? 5,
      backoff: config.retry?.backoff ?? ((retryCount) => Math.exp(retryCount) * 50)
    };
  }
  mergeTelemetry(telemetry) {
    this.headers = merge(this.headers, "Upstash-Telemetry-Runtime", telemetry.runtime);
    this.headers = merge(this.headers, "Upstash-Telemetry-Platform", telemetry.platform);
    this.headers = merge(this.headers, "Upstash-Telemetry-Sdk", telemetry.sdk);
  }
  async request(req) {
    if (this.readYourWrites) {
      this.headers["upstash-sync-token"] = this.upstashSyncToken;
    }
    const requestHeaders = mergeHeaders(this.headers, req.headers ?? {});
    const requestUrl = [this.baseUrl, ...req.path ?? []].join("/");
    const isEventStream = requestHeaders.Accept === "text/event-stream";
    const signal = req.signal ?? this.options.signal;
    const isSignalFunction = typeof signal === "function";
    const requestOptions = {
      cache: this.options.cache,
      method: "POST",
      headers: requestHeaders,
      body: JSON.stringify(req.body),
      keepalive: this.options.keepAlive,
      agent: this.options.agent,
      signal: isSignalFunction ? signal() : signal,
      /**
       * Fastly specific
       */
      backend: this.options.backend
    };
    if (!this.hasCredentials) {
      console.warn(
        "[Upstash Redis] Redis client was initialized without url or token. Failed to execute command."
      );
    }
    let res = null;
    let error = null;
    for (let i = 0; i <= this.retry.attempts; i++) {
      if (i > 0 && requestHeaders["Upstash-Telemetry-Sdk"]) {
        requestHeaders["Upstash-Telemetry-Retry"] = String(i);
      }
      try {
        res = await fetch(requestUrl, requestOptions);
        break;
      } catch (error_) {
        if (requestOptions.signal?.aborted && isSignalFunction) {
          throw error_;
        } else if (requestOptions.signal?.aborted) {
          const myBlob = new Blob([
            JSON.stringify({ result: requestOptions.signal.reason ?? "Aborted" })
          ]);
          const myOptions = {
            status: 200,
            statusText: requestOptions.signal.reason ?? "Aborted"
          };
          res = new Response(myBlob, myOptions);
          break;
        }
        error = error_;
        if (i < this.retry.attempts) {
          await new Promise((r) => setTimeout(r, this.retry.backoff(i)));
        }
      }
    }
    if (!res) {
      throw error ?? new Error("Exhausted all retries");
    }
    if (!res.ok) {
      let body2;
      const rawBody2 = await res.text();
      try {
        body2 = JSON.parse(rawBody2);
      } catch (error2) {
        throw new UpstashJSONParseError(rawBody2, { cause: error2 });
      }
      throw new UpstashError(`${body2.error}, command was: ${JSON.stringify(req.body)}`);
    }
    if (this.readYourWrites) {
      const headers = res.headers;
      this.upstashSyncToken = headers.get("upstash-sync-token") ?? "";
    }
    if (isEventStream && req && req.onMessage && res.body) {
      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      (async () => {
        try {
          let buffer = "";
          while (true) {
            const { value, done } = await reader.read();
            if (done) break;
            buffer += decoder.decode(value, { stream: true });
            const lines = buffer.split("\n");
            buffer = lines.pop() || "";
            if (buffer.length > MAX_BUFFER_SIZE) {
              throw new Error("Buffer size exceeded (1MB)");
            }
            for (const line of lines) {
              if (line.startsWith("data: ")) {
                const data = line.slice(6);
                req.onMessage?.(data);
              }
            }
          }
        } catch (error2) {
          if (error2 instanceof Error && error2.name === "AbortError") {
          } else {
            console.error("Stream reading error:", error2);
          }
        } finally {
          try {
            await reader.cancel();
          } catch {
          }
        }
      })();
      return { result: 1 };
    }
    let body;
    const rawBody = await res.text();
    try {
      body = JSON.parse(rawBody);
    } catch (error2) {
      throw new UpstashJSONParseError(rawBody, { cause: error2 });
    }
    if (this.readYourWrites) {
      const headers = res.headers;
      this.upstashSyncToken = headers.get("upstash-sync-token") ?? "";
    }
    if (this.options.responseEncoding === "base64") {
      if (Array.isArray(body)) {
        return body.map(({ result: result2, error: error2 }) => ({
          result: decode(result2),
          error: error2
        }));
      }
      const result = decode(body.result);
      return { result, error: body.error };
    }
    return body;
  }
};
function base64decode(b64) {
  let dec = "";
  try {
    const binString = atob(b64);
    const size = binString.length;
    const bytes = new Uint8Array(size);
    for (let i = 0; i < size; i++) {
      bytes[i] = binString.charCodeAt(i);
    }
    dec = new TextDecoder().decode(bytes);
  } catch {
    dec = b64;
  }
  return dec;
}
function decode(raw) {
  let result = void 0;
  switch (typeof raw) {
    case "undefined": {
      return raw;
    }
    case "number": {
      result = raw;
      break;
    }
    case "object": {
      if (Array.isArray(raw)) {
        result = raw.map(
          (v) => typeof v === "string" ? base64decode(v) : Array.isArray(v) ? v.map((element) => decode(element)) : v
        );
      } else {
        result = null;
      }
      break;
    }
    case "string": {
      result = raw === "OK" ? "OK" : base64decode(raw);
      break;
    }
    default: {
      break;
    }
  }
  return result;
}
function merge(obj, key, value) {
  if (!value) {
    return obj;
  }
  if (!obj[key]) {
    obj[key] = value;
    return obj;
  }
  const values = obj[key].split(",").map((v) => v.trim());
  if (!values.includes(value.trim())) {
    obj[key] = [obj[key], value].join(",");
  }
  return obj;
}
var defaultSerializer = (c) => {
  switch (typeof c) {
    case "string":
    case "number":
    case "boolean": {
      return c;
    }
    default: {
      return JSON.stringify(c);
    }
  }
};
var Command = class {
  command;
  serialize;
  deserialize;
  headers;
  path;
  onMessage;
  isStreaming;
  signal;
  /**
   * Create a new command instance.
   *
   * You can define a custom `deserialize` function. By default we try to deserialize as json.
   */
  constructor(command, opts) {
    this.serialize = defaultSerializer;
    this.deserialize = opts?.automaticDeserialization === void 0 || opts.automaticDeserialization ? opts?.deserialize ?? parseResponse : (x) => x;
    this.command = command.map((c) => this.serialize(c));
    this.headers = opts?.headers;
    this.path = opts?.path;
    this.onMessage = opts?.streamOptions?.onMessage;
    this.isStreaming = opts?.streamOptions?.isStreaming ?? false;
    this.signal = opts?.streamOptions?.signal;
    if (opts?.latencyLogging) {
      const originalExec = this.exec.bind(this);
      this.exec = async (client) => {
        const start = performance.now();
        const result = await originalExec(client);
        const end = performance.now();
        const loggerResult = (end - start).toFixed(2);
        console.log(
          `Latency for \x1B[38;2;19;185;39m${this.command[0].toString().toUpperCase()}\x1B[0m: \x1B[38;2;0;255;255m${loggerResult} ms\x1B[0m`
        );
        return result;
      };
    }
  }
  /**
   * Execute the command using a client.
   */
  async exec(client) {
    const { result, error } = await client.request({
      body: this.command,
      path: this.path,
      upstashSyncToken: client.upstashSyncToken,
      headers: this.headers,
      onMessage: this.onMessage,
      isStreaming: this.isStreaming,
      signal: this.signal
    });
    if (error) {
      throw new UpstashError(error);
    }
    if (result === void 0) {
      throw new TypeError("Request did not return a result");
    }
    return this.deserialize(result);
  }
};
var ExecCommand = class extends Command {
  constructor(cmd, opts) {
    const normalizedCmd = cmd.map((arg) => typeof arg === "string" ? arg : String(arg));
    super(normalizedCmd, opts);
  }
};
var FIELD_TYPES = [
  "TEXT",
  "U64",
  "I64",
  "F64",
  "BOOL",
  "DATE",
  "KEYWORD",
  "FACET"
];
function isFieldType(value) {
  return typeof value === "string" && FIELD_TYPES.includes(value);
}
function isDetailedField(value) {
  return typeof value === "object" && value !== null && "type" in value && isFieldType(value.type);
}
function isNestedSchema(value) {
  return typeof value === "object" && value !== null && !isDetailedField(value);
}
function flattenSchema(schema, pathPrefix = []) {
  const fields = [];
  for (const [key, value] of Object.entries(schema)) {
    const currentPath = [...pathPrefix, key];
    const pathString = currentPath.join(".");
    if (isFieldType(value)) {
      fields.push({
        path: pathString,
        type: value
      });
    } else if (isDetailedField(value)) {
      fields.push({
        path: pathString,
        type: value.type,
        fast: "fast" in value ? value.fast : void 0,
        noTokenize: "noTokenize" in value ? value.noTokenize : void 0,
        noStem: "noStem" in value ? value.noStem : void 0,
        from: "from" in value ? value.from : void 0
      });
    } else if (isNestedSchema(value)) {
      const nestedFields = flattenSchema(value, currentPath);
      fields.push(...nestedFields);
    }
  }
  return fields;
}
function deserializeQueryResponse(rawResponse) {
  return rawResponse.map((itemRaw) => {
    const raw = itemRaw;
    const key = raw[0];
    const score = Number(raw[1]);
    const rawFields = raw[2];
    if (rawFields === void 0) {
      return { key, score };
    }
    if (!Array.isArray(rawFields) || rawFields.length === 0) {
      return { key, score, data: {} };
    }
    let data = {};
    for (const fieldRaw of rawFields) {
      const key2 = fieldRaw[0];
      const value = fieldRaw[1];
      const pathParts = key2.split(".");
      if (pathParts.length === 1) {
        data[key2] = value;
      } else {
        let currentObj = data;
        for (let i = 0; i < pathParts.length - 1; i++) {
          const pathPart = pathParts[i];
          if (!(pathPart in currentObj)) {
            currentObj[pathPart] = {};
          }
          currentObj = currentObj[pathPart];
        }
        currentObj[pathParts.at(-1)] = value;
      }
    }
    if ("$" in data) {
      data = data["$"];
    }
    return { key, score, data };
  });
}
function deserializeDescribeResponse(rawResponse) {
  const description = {};
  for (let i = 0; i < rawResponse.length; i += 2) {
    const descriptor = rawResponse[i];
    switch (descriptor) {
      case "name": {
        description["name"] = rawResponse[i + 1];
        break;
      }
      case "type": {
        description["dataType"] = rawResponse[i + 1].toLowerCase();
        break;
      }
      case "prefixes": {
        description["prefixes"] = rawResponse[i + 1];
        break;
      }
      case "language": {
        description["language"] = rawResponse[i + 1];
        break;
      }
      case "schema": {
        const schema = {};
        for (const fieldDescription of rawResponse[i + 1]) {
          const fieldName = fieldDescription[0];
          const fieldInfo = { type: fieldDescription[1] };
          if (fieldDescription.length > 2) {
            for (let j = 2; j < fieldDescription.length; j++) {
              const fieldOption = fieldDescription[j];
              switch (fieldOption) {
                case "NOSTEM": {
                  fieldInfo.noStem = true;
                  break;
                }
                case "NOTOKENIZE": {
                  fieldInfo.noTokenize = true;
                  break;
                }
                case "FAST": {
                  fieldInfo.fast = true;
                  break;
                }
                case "FROM": {
                  fieldInfo.from = fieldDescription[++j];
                  break;
                }
              }
            }
          }
          schema[fieldName] = fieldInfo;
        }
        description["schema"] = schema;
        break;
      }
    }
  }
  return description;
}
function parseCountResponse(rawResponse) {
  return typeof rawResponse === "number" ? rawResponse : Number.parseInt(rawResponse, 10);
}
function deserializeAggregateResponse(rawResponse) {
  return parseAggregationArray(rawResponse);
}
function parseAggregationArray(arr) {
  const result = {};
  for (let i = 0; i < arr.length; i += 2) {
    const key = arr[i];
    const value = arr[i + 1];
    if (Array.isArray(value)) {
      if (value.length > 0 && typeof value[0] === "string") {
        result[key] = value[0] === "buckets" ? parseBucketsValue(value) : parseStatsValue(value);
      } else {
        result[key] = parseAggregationArray(value);
      }
    } else {
      result[key] = value;
    }
  }
  return result;
}
function coerceNumericString(value) {
  if (typeof value === "string" && value !== "" && !Number.isNaN(Number(value))) {
    return Number(value);
  }
  return value;
}
function parseStatsValue(arr) {
  const result = {};
  for (let i = 0; i < arr.length; i += 2) {
    const key = arr[i];
    const value = arr[i + 1];
    if (Array.isArray(value) && value.length > 0) {
      if (typeof value[0] === "string") {
        result[key] = parseStatsValue(value);
      } else if (Array.isArray(value[0]) && typeof value[0][0] === "string") {
        result[key] = value.map((item) => parseStatsValue(item));
      } else {
        result[key] = value;
      }
    } else {
      result[key] = coerceNumericString(value);
    }
  }
  return result;
}
function parseBucketsValue(arr) {
  if (arr[0] === "buckets" && Array.isArray(arr[1])) {
    const result = {
      buckets: arr[1].map((bucket) => {
        const bucketObj = {};
        for (let i = 0; i < bucket.length; i += 2) {
          const key = bucket[i];
          const value = bucket[i + 1];
          bucketObj[key] = Array.isArray(value) && value.length > 0 && typeof value[0] === "string" ? parseStatsValue(value) : value;
        }
        return bucketObj;
      })
    };
    for (let i = 2; i < arr.length; i += 2) {
      result[arr[i]] = arr[i + 1];
    }
    return result;
  }
  return arr;
}
function buildQueryCommand(redisCommand, name, options) {
  const query = JSON.stringify(options?.filter ?? {});
  const command = [redisCommand, name, query];
  if (options?.limit !== void 0) {
    command.push("LIMIT", options.limit.toString());
  }
  if (options?.offset !== void 0) {
    command.push("OFFSET", options.offset.toString());
  }
  if (options?.select && Object.keys(options.select).length === 0) {
    command.push("NOCONTENT");
  }
  if (options) {
    if ("orderBy" in options && options.orderBy) {
      command.push("ORDERBY");
      for (const [field, direction] of Object.entries(options.orderBy)) {
        command.push(field, direction);
      }
    } else if ("scoreFunc" in options && options.scoreFunc) {
      command.push("SCOREFUNC", ...buildScoreFunc(options.scoreFunc));
    }
  }
  if (options?.highlight) {
    command.push(
      "HIGHLIGHT",
      "FIELDS",
      options.highlight.fields.length.toString(),
      ...options.highlight.fields
    );
    if (options.highlight.preTag && options.highlight.postTag) {
      command.push("TAGS", options.highlight.preTag, options.highlight.postTag);
    }
  }
  if (options?.select && Object.keys(options.select).length > 0) {
    command.push(
      "SELECT",
      Object.keys(options.select).length.toString(),
      ...Object.keys(options.select)
    );
  }
  return command;
}
function buildScoreFunc(scoreBy) {
  const result = [];
  if (typeof scoreBy === "string") {
    result.push("FIELDVALUE", scoreBy);
  } else if ("fields" in scoreBy) {
    if (scoreBy.combineMode) {
      result.push("COMBINEMODE", scoreBy.combineMode.toUpperCase());
    }
    if (scoreBy.scoreMode) {
      result.push("SCOREMODE", scoreBy.scoreMode.toUpperCase());
    }
    for (const field of scoreBy.fields) {
      result.push(...buildScoreFuncField(field));
    }
  } else {
    result.push(...buildScoreFuncField(scoreBy));
  }
  return result;
}
function buildScoreFuncField(field) {
  const result = [];
  if (typeof field === "string") {
    result.push("FIELDVALUE", field);
  } else {
    if (field.scoreMode) {
      result.push("SCOREMODE", field.scoreMode.toUpperCase());
    }
    result.push("FIELDVALUE", field.field);
    if (field.modifier) {
      result.push("MODIFIER", field.modifier.toUpperCase());
    }
    if (field.factor !== void 0) {
      result.push("FACTOR", field.factor.toString());
    }
    if (field.missing !== void 0) {
      result.push("MISSING", field.missing.toString());
    }
  }
  return result;
}
function buildCreateIndexCommand(params) {
  const { name, schema, dataType, language, skipInitialScan, existsOk } = params;
  let source;
  if (params.dataType === "stream") {
    source = ["ON", "STREAM", params.stream];
  } else {
    const prefixArray = Array.isArray(params.prefix) ? params.prefix : [params.prefix];
    source = [
      "ON",
      dataType.toUpperCase(),
      "PREFIX",
      prefixArray.length.toString(),
      ...prefixArray
    ];
  }
  const payload = [
    name,
    ...skipInitialScan ? ["SKIPINITIALSCAN"] : [],
    ...existsOk ? ["EXISTSOK"] : [],
    ...source,
    ...language ? ["LANGUAGE", language] : [],
    "SCHEMA"
  ];
  const fields = flattenSchema(schema);
  for (const field of fields) {
    payload.push(field.path, field.type);
    if (field.fast) {
      payload.push("FAST");
    }
    if (field.noTokenize) {
      payload.push("NOTOKENIZE");
    }
    if (field.noStem) {
      payload.push("NOSTEM");
    }
    if (field.from) {
      payload.push("FROM", field.from);
    }
  }
  return ["SEARCH.CREATE", ...payload];
}
function buildAggregateCommand(name, options) {
  const query = JSON.stringify(options?.filter ?? {});
  const aggregations = JSON.stringify(options.aggregations);
  return ["SEARCH.AGGREGATE", name, query, aggregations];
}
var SearchIndex = class {
  name;
  schema;
  client;
  constructor({ name, schema, client }) {
    this.name = name;
    this.schema = schema;
    this.client = client;
  }
  async waitIndexing() {
    const command = ["SEARCH.WAITINDEXING", this.name];
    return await new ExecCommand(command).exec(this.client);
  }
  async describe() {
    const command = ["SEARCH.DESCRIBE", this.name];
    const rawResult = await new ExecCommand(command).exec(
      this.client
    );
    if (!rawResult) return null;
    return deserializeDescribeResponse(rawResult);
  }
  async query(options) {
    const command = buildQueryCommand("SEARCH.QUERY", this.name, options);
    const rawResult = await new ExecCommand(command).exec(
      this.client
    );
    if (!rawResult) return rawResult;
    return deserializeQueryResponse(rawResult);
  }
  async aggregate(options) {
    const command = buildAggregateCommand(this.name, options);
    const rawResult = await new ExecCommand(
      command
    ).exec(this.client);
    return deserializeAggregateResponse(rawResult);
  }
  async count({ filter }) {
    const command = buildQueryCommand("SEARCH.COUNT", this.name, { filter });
    const rawResult = await new ExecCommand(command).exec(
      this.client
    );
    return { count: parseCountResponse(rawResult) };
  }
  async drop() {
    const command = ["SEARCH.DROP", this.name];
    const result = await new ExecCommand(command).exec(this.client);
    return result;
  }
  async addAlias({ alias }) {
    const command = ["SEARCH.ALIASADD", alias, this.name];
    const result = await new ExecCommand(command).exec(this.client);
    return result;
  }
};
async function createIndex(client, params) {
  const { name, schema } = params;
  const createIndexCommand = buildCreateIndexCommand(params);
  await new ExecCommand(createIndexCommand).exec(client);
  return initIndex(client, { name, schema });
}
function initIndex(client, params) {
  const { name, schema } = params;
  return new SearchIndex({ name, schema, client });
}
async function listAliases(client) {
  const command = ["SEARCH.LISTALIASES"];
  const rawResult = await new ExecCommand(command).exec(client);
  if (rawResult === 0 || Array.isArray(rawResult) && rawResult.length === 0) {
    return {};
  }
  if (!Array.isArray(rawResult)) {
    return {};
  }
  const aliases = {};
  for (const pair of rawResult) {
    if (Array.isArray(pair) && pair.length === 2) {
      const [alias, index] = pair;
      aliases[alias] = index;
    }
  }
  return aliases;
}
async function addAlias(client, { indexName, alias }) {
  const command = ["SEARCH.ALIASADD", alias, indexName];
  const result = await new ExecCommand(command).exec(client);
  return result;
}
async function delAlias(client, { alias }) {
  const command = ["SEARCH.ALIASDEL", alias];
  const result = await new ExecCommand(command).exec(client);
  return result;
}
function float32ToBase64(vector) {
  const bytes = new Uint8Array(vector.length * 4);
  const view = new DataView(bytes.buffer);
  for (const [i, value] of vector.entries()) {
    view.setFloat32(i * 4, value, true);
  }
  let binary = "";
  const chunkSize = 32768;
  for (let i = 0; i < bytes.length; i += chunkSize) {
    binary += String.fromCodePoint(...bytes.subarray(i, i + chunkSize));
  }
  return btoa(binary);
}
function serializeVector(vector) {
  if (Array.isArray(vector)) {
    return ["VALUES", vector.length, ...vector];
  }
  if (vector instanceof Float32Array) {
    return ["BASE64-FP32", float32ToBase64(vector)];
  }
  return ["BASE64-FP32", vector.base64];
}
function deserializeVectorValues(result) {
  if (result === null) {
    return null;
  }
  return result.map(Number);
}
function deserializeVectorQueryResponse(result) {
  return result.map(([id, score]) => ({ id: String(id), score: Number(score) }));
}
function deserializeVectorInfoResponse(result) {
  if (result === null) {
    return null;
  }
  const fields = Array.isArray(result) ? Object.fromEntries(
    Array.from({ length: Math.floor(result.length / 2) }, (_, i) => [
      String(result[i * 2]),
      result[i * 2 + 1]
    ])
  ) : result;
  return {
    dimension: Number(fields.dimension),
    metric: String(fields.metric).toUpperCase()
  };
}
var VectorAddCommand = class extends Command {
  constructor([index, id, vector], cmdOpts) {
    super(["VECTOR.ADD", index, id, ...serializeVector(vector)], cmdOpts);
  }
};
var VectorCountCommand = class extends Command {
  constructor([index], cmdOpts) {
    super(["VECTOR.COUNT", index], cmdOpts);
  }
};
var VectorCreateCommand = class extends Command {
  constructor([index, opts], cmdOpts) {
    const command = [
      "VECTOR.CREATE",
      index,
      "DIM",
      opts.dimension,
      "METRIC",
      opts.metric
    ];
    if (opts.existsOk) {
      command.push("EXISTSOK");
    }
    super(command, cmdOpts);
  }
};
var VectorDelCommand = class extends Command {
  constructor([index, id], cmdOpts) {
    super(["VECTOR.DEL", index, id], cmdOpts);
  }
};
var VectorDropCommand = class extends Command {
  constructor([index], cmdOpts) {
    super(["VECTOR.DROP", index], cmdOpts);
  }
};
var VectorGetCommand = class extends Command {
  constructor([index, id], cmdOpts) {
    super(["VECTOR.GET", index, id], {
      deserialize: deserializeVectorValues,
      ...cmdOpts
    });
  }
};
var VectorInfoCommand = class extends Command {
  constructor([index], cmdOpts) {
    super(["VECTOR.INFO", index], {
      deserialize: deserializeVectorInfoResponse,
      ...cmdOpts
    });
  }
};
var VectorQueryCommand = class extends Command {
  constructor([index, opts], cmdOpts) {
    const command = ["VECTOR.QUERY", index, "TOPK", opts.topK];
    if (opts.profile) {
      command.push("PROFILE", opts.profile);
    }
    command.push(...serializeVector(opts.vector));
    super(command, {
      deserialize: deserializeVectorQueryResponse,
      ...cmdOpts
    });
  }
};
var VectorIndex = class {
  name;
  client;
  commandOptions;
  constructor({ name, client, commandOptions }) {
    this.name = name;
    this.client = client;
    this.commandOptions = commandOptions;
  }
  /**
   * Adds a vector to the index, or overwrites the vector stored under `id`.
   *
   * @returns `1` if a new vector was inserted, `0` if an existing one was overwritten.
   */
  add(id, vector) {
    return new VectorAddCommand([this.name, id, vector], this.commandOptions).exec(this.client);
  }
  /**
   * Returns the vector stored under `id`, or `null` if it does not exist.
   */
  get(id) {
    return new VectorGetCommand([this.name, id], this.commandOptions).exec(this.client);
  }
  /**
   * Returns the `topK` nearest neighbours of the query vector.
   */
  query(options) {
    return new VectorQueryCommand([this.name, options], this.commandOptions).exec(this.client);
  }
  /**
   * Deletes the vector stored under `id`.
   *
   * @returns `1` if the vector existed and was removed, `0` otherwise.
   */
  delete(id) {
    return new VectorDelCommand([this.name, id], this.commandOptions).exec(this.client);
  }
  /**
   * Returns the number of vectors in the index.
   */
  count() {
    return new VectorCountCommand([this.name], this.commandOptions).exec(this.client);
  }
  /**
   * Returns the dimension and metric of the index, or `null` if it does not exist.
   */
  info() {
    return new VectorInfoCommand([this.name], this.commandOptions).exec(this.client);
  }
  /**
   * Drops the index and all vectors in it.
   *
   * @returns `1` if the index existed and was dropped, `0` otherwise.
   */
  drop() {
    return new VectorDropCommand([this.name], this.commandOptions).exec(this.client);
  }
};
async function createVectorIndex(client, { name, ...opts }, commandOptions) {
  await new VectorCreateCommand([name, opts], commandOptions).exec(client);
  return new VectorIndex({ name, client, commandOptions });
}
function initVectorIndex(client, name, commandOptions) {
  return new VectorIndex({ name, client, commandOptions });
}
function deserialize(result) {
  if (result.length === 0) {
    return null;
  }
  const obj = {};
  for (let i = 0; i < result.length; i += 2) {
    const key = result[i];
    const value = result[i + 1];
    try {
      obj[key] = JSON.parse(value);
    } catch {
      obj[key] = value;
    }
  }
  return obj;
}
var HRandFieldCommand = class extends Command {
  constructor(cmd, opts) {
    const command = ["hrandfield", cmd[0]];
    if (typeof cmd[1] === "number") {
      command.push(cmd[1]);
    }
    if (cmd[2]) {
      command.push("WITHVALUES");
    }
    super(command, {
      // @ts-expect-error to silence compiler
      deserialize: cmd[2] ? (result) => deserialize(result) : opts?.deserialize,
      ...opts
    });
  }
};
var AppendCommand = class extends Command {
  constructor(cmd, opts) {
    super(["append", ...cmd], opts);
  }
};
var ArCountCommand = class extends Command {
  constructor(cmd, opts) {
    super(["ARCOUNT", ...cmd], opts);
  }
};
var ArDelCommand = class extends Command {
  constructor(cmd, opts) {
    super(["ARDEL", ...cmd], opts);
  }
};
var ArDelRangeCommand = class extends Command {
  constructor([key, ...ranges], opts) {
    super(["ARDELRANGE", key, ...ranges.flat()], opts);
  }
};
var ArGetCommand = class extends Command {
  constructor(cmd, opts) {
    super(["ARGET", ...cmd], opts);
  }
};
var ArGetRangeCommand = class extends Command {
  constructor(cmd, opts) {
    super(["ARGETRANGE", ...cmd], opts);
  }
};
var ArGrepCommand = class extends Command {
  constructor([key, start, end, opts], cmdOpts) {
    const command = ["ARGREP", key, start, end];
    for (const predicate of opts.predicates) {
      if ("exact" in predicate) {
        command.push("EXACT", predicate.exact);
      } else if ("match" in predicate) {
        command.push("MATCH", predicate.match);
      } else if ("glob" in predicate) {
        command.push("GLOB", predicate.glob);
      } else {
        command.push("RE", predicate.re);
      }
    }
    if (opts.combine) {
      command.push(opts.combine.toUpperCase());
    }
    if (opts.noCase) {
      command.push("NOCASE");
    }
    if (opts.withValues) {
      command.push("WITHVALUES");
    }
    if (opts.limit !== void 0) {
      command.push("LIMIT", opts.limit);
    }
    super(command, {
      deserialize: (result) => parseResponse(result).map(
        (item) => Array.isArray(item) ? [String(item[0]), item[1]] : String(item)
      ),
      ...cmdOpts
    });
  }
};
function toCamelCase(field) {
  return field.replaceAll(/-([a-z])/g, (_, char) => char.toUpperCase());
}
function deserializeArInfoResponse(result) {
  const entries = Array.isArray(result) ? Array.from({ length: Math.floor(result.length / 2) }, (_, i) => [
    result[i * 2],
    result[i * 2 + 1]
  ]) : Object.entries(result);
  const indexFields = /* @__PURE__ */ new Set(["len", "nextInsertIndex"]);
  const info = {};
  for (const [field, value] of entries) {
    const name = toCamelCase(String(field));
    if (indexFields.has(name)) {
      info[name] = String(value);
      continue;
    }
    const numeric = typeof value === "number" ? value : Number(value);
    info[name] = Number.isNaN(numeric) ? value : numeric;
  }
  return info;
}
var ArInfoCommand = class extends Command {
  constructor([key, opts], cmdOpts) {
    const command = ["ARINFO", key];
    if (opts?.full) {
      command.push("FULL");
    }
    super(command, {
      deserialize: deserializeArInfoResponse,
      ...cmdOpts
    });
  }
};
var ArInsertCommand = class extends Command {
  constructor(cmd, opts) {
    super(["ARINSERT", ...cmd], {
      deserialize: String,
      ...opts
    });
  }
};
var ArLastItemsCommand = class extends Command {
  constructor([key, count, opts], cmdOpts) {
    const command = ["ARLASTITEMS", key, count];
    if (opts?.rev) {
      command.push("REV");
    }
    super(command, cmdOpts);
  }
};
var ArLenCommand = class extends Command {
  constructor(cmd, opts) {
    super(["ARLEN", ...cmd], {
      deserialize: String,
      ...opts
    });
  }
};
var ArMGetCommand = class extends Command {
  constructor(cmd, opts) {
    super(["ARMGET", ...cmd], opts);
  }
};
var ArMSetCommand = class extends Command {
  constructor([key, values], opts) {
    const pairs = Array.isArray(values) ? values : Object.entries(values);
    super(["ARMSET", key, ...pairs.flatMap(([index, value]) => [index, value])], opts);
  }
};
var ArNextCommand = class extends Command {
  constructor(cmd, opts) {
    super(["ARNEXT", ...cmd], {
      deserialize: (result) => result === null ? null : String(result),
      ...opts
    });
  }
};
var ArOpCommand = class extends Command {
  constructor([key, start, end, operation], opts) {
    const command = ["AROP", key, start, end];
    if (typeof operation === "string") {
      command.push(operation.toUpperCase());
    } else {
      command.push("MATCH", operation.match);
    }
    super(command, {
      deserialize: (result) => result === null ? null : Number(result),
      ...opts
    });
  }
};
var ArRingCommand = class extends Command {
  constructor(cmd, opts) {
    super(["ARRING", ...cmd], {
      deserialize: String,
      ...opts
    });
  }
};
var ArScanCommand = class extends Command {
  constructor([key, start, end, opts], cmdOpts) {
    const command = ["ARSCAN", key, start, end];
    if (opts?.limit !== void 0) {
      command.push("LIMIT", opts.limit);
    }
    super(command, {
      deserialize: (result) => parseResponse(result).map(([index, value]) => [
        String(index),
        value
      ]),
      ...cmdOpts
    });
  }
};
var ArSeekCommand = class extends Command {
  constructor(cmd, opts) {
    super(["ARSEEK", ...cmd], opts);
  }
};
var ArSetCommand = class extends Command {
  constructor(cmd, opts) {
    super(["ARSET", ...cmd], opts);
  }
};
var BitCountCommand = class extends Command {
  constructor([key, start, end], opts) {
    const command = ["bitcount", key];
    if (typeof start === "number") {
      command.push(start);
    }
    if (typeof end === "number") {
      command.push(end);
    }
    super(command, opts);
  }
};
var BitFieldCommand = class {
  constructor(args, client, opts, execOperation = (command) => command.exec(this.client)) {
    this.client = client;
    this.opts = opts;
    this.execOperation = execOperation;
    this.command = ["bitfield", ...args];
  }
  command;
  chain(...args) {
    this.command.push(...args);
    return this;
  }
  get(...args) {
    return this.chain("get", ...args);
  }
  set(...args) {
    return this.chain("set", ...args);
  }
  incrby(...args) {
    return this.chain("incrby", ...args);
  }
  overflow(overflow) {
    return this.chain("overflow", overflow);
  }
  exec() {
    const command = new Command(this.command, this.opts);
    return this.execOperation(command);
  }
};
var BitOpCommand = class extends Command {
  constructor(cmd, opts) {
    super(["bitop", ...cmd], opts);
  }
};
var BitPosCommand = class extends Command {
  constructor(cmd, opts) {
    super(["bitpos", ...cmd], opts);
  }
};
var ClientSetInfoCommand = class extends Command {
  constructor([attribute, value], opts) {
    super(["CLIENT", "SETINFO", attribute.toUpperCase(), value], opts);
  }
};
var CopyCommand = class extends Command {
  constructor([key, destinationKey, opts], commandOptions) {
    super(["COPY", key, destinationKey, ...opts?.replace ? ["REPLACE"] : []], {
      ...commandOptions,
      deserialize(result) {
        if (result > 0) {
          return "COPIED";
        }
        return "NOT_COPIED";
      }
    });
  }
};
var DBSizeCommand = class extends Command {
  constructor(opts) {
    super(["dbsize"], opts);
  }
};
var DecrCommand = class extends Command {
  constructor(cmd, opts) {
    super(["decr", ...cmd], opts);
  }
};
var DecrByCommand = class extends Command {
  constructor(cmd, opts) {
    super(["decrby", ...cmd], opts);
  }
};
var DelCommand = class extends Command {
  constructor(cmd, opts) {
    super(["del", ...cmd], opts);
  }
};
var EchoCommand = class extends Command {
  constructor(cmd, opts) {
    super(["echo", ...cmd], opts);
  }
};
var EvalROCommand = class extends Command {
  constructor([script, keys, args], opts) {
    super(["eval_ro", script, keys.length, ...keys, ...args ?? []], opts);
  }
};
var EvalCommand = class extends Command {
  constructor([script, keys, args], opts) {
    super(["eval", script, keys.length, ...keys, ...args ?? []], opts);
  }
};
var EvalshaROCommand = class extends Command {
  constructor([sha, keys, args], opts) {
    super(["evalsha_ro", sha, keys.length, ...keys, ...args ?? []], opts);
  }
};
var EvalshaCommand = class extends Command {
  constructor([sha, keys, args], opts) {
    super(["evalsha", sha, keys.length, ...keys, ...args ?? []], opts);
  }
};
var ExistsCommand = class extends Command {
  constructor(cmd, opts) {
    super(["exists", ...cmd], opts);
  }
};
var ExpireCommand = class extends Command {
  constructor(cmd, opts) {
    super(["expire", ...cmd.filter(Boolean)], opts);
  }
};
var ExpireAtCommand = class extends Command {
  constructor(cmd, opts) {
    super(["expireat", ...cmd], opts);
  }
};
var FCallCommand = class extends Command {
  constructor([functionName, keys, args], opts) {
    super(["fcall", functionName, ...keys ? [keys.length, ...keys] : [0], ...args ?? []], opts);
  }
};
var FCallRoCommand = class extends Command {
  constructor([functionName, keys, args], opts) {
    super(
      ["fcall_ro", functionName, ...keys ? [keys.length, ...keys] : [0], ...args ?? []],
      opts
    );
  }
};
var FlushAllCommand = class extends Command {
  constructor(args, opts) {
    const command = ["flushall"];
    if (args && args.length > 0 && args[0].async) {
      command.push("async");
    }
    super(command, opts);
  }
};
var FlushDBCommand = class extends Command {
  constructor([opts], cmdOpts) {
    const command = ["flushdb"];
    if (opts?.async) {
      command.push("async");
    }
    super(command, cmdOpts);
  }
};
var FunctionDeleteCommand = class extends Command {
  constructor([libraryName], opts) {
    super(["function", "delete", libraryName], opts);
  }
};
var FunctionFlushCommand = class extends Command {
  constructor(opts) {
    super(["function", "flush"], opts);
  }
};
var FunctionListCommand = class extends Command {
  constructor([args], opts) {
    const command = ["function", "list"];
    if (args?.libraryName) {
      command.push("libraryname", args.libraryName);
    }
    if (args?.withCode) {
      command.push("withcode");
    }
    super(command, { deserialize: deserialize2, ...opts });
  }
};
function deserialize2(result) {
  if (!Array.isArray(result)) return [];
  return result.map((libRaw) => {
    const lib = kvArrayToObject(libRaw);
    const functionsParsed = lib.functions.map(
      (fnRaw) => kvArrayToObject(fnRaw)
    );
    return {
      libraryName: lib.library_name,
      engine: lib.engine,
      functions: functionsParsed.map((fn) => ({
        name: fn.name,
        description: fn.description ?? void 0,
        flags: fn.flags
      })),
      libraryCode: lib.library_code
    };
  });
}
var FunctionLoadCommand = class extends Command {
  constructor([args], opts) {
    super(["function", "load", ...args.replace ? ["replace"] : [], args.code], opts);
  }
};
var FunctionStatsCommand = class extends Command {
  constructor(opts) {
    super(["function", "stats"], { deserialize: deserialize3, ...opts });
  }
};
function deserialize3(result) {
  const rawEngines = kvArrayToObject(kvArrayToObject(result).engines);
  const parsedEngines = Object.fromEntries(
    Object.entries(rawEngines).map(([key, value]) => [key, kvArrayToObject(value)])
  );
  const final = {
    engines: Object.fromEntries(
      Object.entries(parsedEngines).map(([key, value]) => [
        key,
        {
          librariesCount: value.libraries_count,
          functionsCount: value.functions_count
        }
      ])
    )
  };
  return final;
}
var GeoAddCommand = class extends Command {
  constructor([key, arg1, ...arg2], opts) {
    const command = ["geoadd", key];
    if ("nx" in arg1 && arg1.nx) {
      command.push("nx");
    } else if ("xx" in arg1 && arg1.xx) {
      command.push("xx");
    }
    if ("ch" in arg1 && arg1.ch) {
      command.push("ch");
    }
    if ("latitude" in arg1 && arg1.latitude) {
      command.push(arg1.longitude, arg1.latitude, arg1.member);
    }
    command.push(
      ...arg2.flatMap(({ latitude, longitude, member }) => [longitude, latitude, member])
    );
    super(command, opts);
  }
};
var GeoDistCommand = class extends Command {
  constructor([key, member1, member2, unit = "M"], opts) {
    super(["GEODIST", key, member1, member2, unit], opts);
  }
};
var GeoHashCommand = class extends Command {
  constructor(cmd, opts) {
    const [key] = cmd;
    const members = Array.isArray(cmd[1]) ? cmd[1] : cmd.slice(1);
    super(["GEOHASH", key, ...members], opts);
  }
};
var GeoPosCommand = class extends Command {
  constructor(cmd, opts) {
    const [key] = cmd;
    const members = Array.isArray(cmd[1]) ? cmd[1] : cmd.slice(1);
    super(["GEOPOS", key, ...members], {
      deserialize: (result) => transform(result),
      ...opts
    });
  }
};
function transform(result) {
  const final = [];
  for (const pos of result) {
    if (!pos?.[0] || !pos?.[1]) {
      continue;
    }
    final.push({ lng: Number.parseFloat(pos[0]), lat: Number.parseFloat(pos[1]) });
  }
  return final;
}
var GeoSearchCommand = class extends Command {
  constructor([key, centerPoint, shape, order, opts], commandOptions) {
    const command = ["GEOSEARCH", key];
    if (centerPoint.type === "FROMMEMBER" || centerPoint.type === "frommember") {
      command.push(centerPoint.type, centerPoint.member);
    }
    if (centerPoint.type === "FROMLONLAT" || centerPoint.type === "fromlonlat") {
      command.push(centerPoint.type, centerPoint.coordinate.lon, centerPoint.coordinate.lat);
    }
    if (shape.type === "BYRADIUS" || shape.type === "byradius") {
      command.push(shape.type, shape.radius, shape.radiusType);
    }
    if (shape.type === "BYBOX" || shape.type === "bybox") {
      command.push(shape.type, shape.rect.width, shape.rect.height, shape.rectType);
    }
    command.push(order);
    if (opts?.count) {
      command.push("COUNT", opts.count.limit, ...opts.count.any ? ["ANY"] : []);
    }
    const transform2 = (result) => {
      if (!opts?.withCoord && !opts?.withDist && !opts?.withHash) {
        return result.map((member) => {
          try {
            return { member: JSON.parse(member) };
          } catch {
            return { member };
          }
        });
      }
      return result.map((members) => {
        let counter = 1;
        const obj = {};
        try {
          obj.member = JSON.parse(members[0]);
        } catch {
          obj.member = members[0];
        }
        if (opts.withDist) {
          obj.dist = Number.parseFloat(members[counter++]);
        }
        if (opts.withHash) {
          obj.hash = members[counter++].toString();
        }
        if (opts.withCoord) {
          obj.coord = {
            long: Number.parseFloat(members[counter][0]),
            lat: Number.parseFloat(members[counter][1])
          };
        }
        return obj;
      });
    };
    super(
      [
        ...command,
        ...opts?.withCoord ? ["WITHCOORD"] : [],
        ...opts?.withDist ? ["WITHDIST"] : [],
        ...opts?.withHash ? ["WITHHASH"] : []
      ],
      {
        deserialize: transform2,
        ...commandOptions
      }
    );
  }
};
var GeoSearchStoreCommand = class extends Command {
  constructor([destination, key, centerPoint, shape, order, opts], commandOptions) {
    const command = ["GEOSEARCHSTORE", destination, key];
    if (centerPoint.type === "FROMMEMBER" || centerPoint.type === "frommember") {
      command.push(centerPoint.type, centerPoint.member);
    }
    if (centerPoint.type === "FROMLONLAT" || centerPoint.type === "fromlonlat") {
      command.push(centerPoint.type, centerPoint.coordinate.lon, centerPoint.coordinate.lat);
    }
    if (shape.type === "BYRADIUS" || shape.type === "byradius") {
      command.push(shape.type, shape.radius, shape.radiusType);
    }
    if (shape.type === "BYBOX" || shape.type === "bybox") {
      command.push(shape.type, shape.rect.width, shape.rect.height, shape.rectType);
    }
    command.push(order);
    if (opts?.count) {
      command.push("COUNT", opts.count.limit, ...opts.count.any ? ["ANY"] : []);
    }
    super([...command, ...opts?.storeDist ? ["STOREDIST"] : []], commandOptions);
  }
};
var GetCommand = class extends Command {
  constructor(cmd, opts) {
    super(["get", ...cmd], opts);
  }
};
var GetBitCommand = class extends Command {
  constructor(cmd, opts) {
    super(["getbit", ...cmd], opts);
  }
};
var GetDelCommand = class extends Command {
  constructor(cmd, opts) {
    super(["getdel", ...cmd], opts);
  }
};
var GetExCommand = class extends Command {
  constructor([key, opts], cmdOpts) {
    const command = ["getex", key];
    if (opts) {
      if ("ex" in opts && typeof opts.ex === "number") {
        command.push("ex", opts.ex);
      } else if ("px" in opts && typeof opts.px === "number") {
        command.push("px", opts.px);
      } else if ("exat" in opts && typeof opts.exat === "number") {
        command.push("exat", opts.exat);
      } else if ("pxat" in opts && typeof opts.pxat === "number") {
        command.push("pxat", opts.pxat);
      } else if ("persist" in opts && opts.persist) {
        command.push("persist");
      }
    }
    super(command, cmdOpts);
  }
};
var GetRangeCommand = class extends Command {
  constructor(cmd, opts) {
    super(["getrange", ...cmd], opts);
  }
};
var GetSetCommand = class extends Command {
  constructor(cmd, opts) {
    super(["getset", ...cmd], opts);
  }
};
var HDelCommand = class extends Command {
  constructor(cmd, opts) {
    super(["hdel", ...cmd], opts);
  }
};
var HExistsCommand = class extends Command {
  constructor(cmd, opts) {
    super(["hexists", ...cmd], opts);
  }
};
var HExpireCommand = class extends Command {
  constructor(cmd, opts) {
    const [key, fields, seconds, option] = cmd;
    const fieldArray = Array.isArray(fields) ? fields : [fields];
    super(
      [
        "hexpire",
        key,
        seconds,
        ...option ? [option] : [],
        "FIELDS",
        fieldArray.length,
        ...fieldArray
      ],
      opts
    );
  }
};
var HExpireAtCommand = class extends Command {
  constructor(cmd, opts) {
    const [key, fields, timestamp, option] = cmd;
    const fieldArray = Array.isArray(fields) ? fields : [fields];
    super(
      [
        "hexpireat",
        key,
        timestamp,
        ...option ? [option] : [],
        "FIELDS",
        fieldArray.length,
        ...fieldArray
      ],
      opts
    );
  }
};
var HExpireTimeCommand = class extends Command {
  constructor(cmd, opts) {
    const [key, fields] = cmd;
    const fieldArray = Array.isArray(fields) ? fields : [fields];
    super(["hexpiretime", key, "FIELDS", fieldArray.length, ...fieldArray], opts);
  }
};
var HPersistCommand = class extends Command {
  constructor(cmd, opts) {
    const [key, fields] = cmd;
    const fieldArray = Array.isArray(fields) ? fields : [fields];
    super(["hpersist", key, "FIELDS", fieldArray.length, ...fieldArray], opts);
  }
};
var HPExpireCommand = class extends Command {
  constructor(cmd, opts) {
    const [key, fields, milliseconds, option] = cmd;
    const fieldArray = Array.isArray(fields) ? fields : [fields];
    super(
      [
        "hpexpire",
        key,
        milliseconds,
        ...option ? [option] : [],
        "FIELDS",
        fieldArray.length,
        ...fieldArray
      ],
      opts
    );
  }
};
var HPExpireAtCommand = class extends Command {
  constructor(cmd, opts) {
    const [key, fields, timestamp, option] = cmd;
    const fieldArray = Array.isArray(fields) ? fields : [fields];
    super(
      [
        "hpexpireat",
        key,
        timestamp,
        ...option ? [option] : [],
        "FIELDS",
        fieldArray.length,
        ...fieldArray
      ],
      opts
    );
  }
};
var HPExpireTimeCommand = class extends Command {
  constructor(cmd, opts) {
    const [key, fields] = cmd;
    const fieldArray = Array.isArray(fields) ? fields : [fields];
    super(["hpexpiretime", key, "FIELDS", fieldArray.length, ...fieldArray], opts);
  }
};
var HPTtlCommand = class extends Command {
  constructor(cmd, opts) {
    const [key, fields] = cmd;
    const fieldArray = Array.isArray(fields) ? fields : [fields];
    super(["hpttl", key, "FIELDS", fieldArray.length, ...fieldArray], opts);
  }
};
var HGetCommand = class extends Command {
  constructor(cmd, opts) {
    super(["hget", ...cmd], opts);
  }
};
function deserialize4(result) {
  if (result.length === 0) {
    return null;
  }
  const obj = {};
  for (let i = 0; i < result.length; i += 2) {
    const key = result[i];
    const value = result[i + 1];
    try {
      const valueIsNumberAndNotSafeInteger = !Number.isNaN(Number(value)) && !Number.isSafeInteger(Number(value));
      obj[key] = valueIsNumberAndNotSafeInteger ? value : JSON.parse(value);
    } catch {
      obj[key] = value;
    }
  }
  return obj;
}
var HGetAllCommand = class extends Command {
  constructor(cmd, opts) {
    super(["hgetall", ...cmd], {
      deserialize: (result) => deserialize4(result),
      ...opts
    });
  }
};
function deserialize5(fields, result) {
  if (result.every((field) => field === null)) {
    return null;
  }
  const obj = {};
  for (const [i, field] of fields.entries()) {
    try {
      obj[field] = JSON.parse(result[i]);
    } catch {
      obj[field] = result[i];
    }
  }
  return obj;
}
var HMGetCommand = class extends Command {
  constructor([key, ...fields], opts) {
    super(["hmget", key, ...fields], {
      deserialize: (result) => deserialize5(fields, result),
      ...opts
    });
  }
};
var HGetDelCommand = class extends Command {
  constructor([key, ...fields], opts) {
    super(["hgetdel", key, "FIELDS", fields.length, ...fields], {
      deserialize: (result) => deserialize5(fields.map(String), result),
      ...opts
    });
  }
};
var HGetExCommand = class extends Command {
  constructor([key, opts, ...fields], cmdOpts) {
    const command = ["hgetex", key];
    if ("ex" in opts && typeof opts.ex === "number") {
      command.push("EX", opts.ex);
    } else if ("px" in opts && typeof opts.px === "number") {
      command.push("PX", opts.px);
    } else if ("exat" in opts && typeof opts.exat === "number") {
      command.push("EXAT", opts.exat);
    } else if ("pxat" in opts && typeof opts.pxat === "number") {
      command.push("PXAT", opts.pxat);
    } else if ("persist" in opts && opts.persist) {
      command.push("PERSIST");
    }
    command.push("FIELDS", fields.length, ...fields);
    super(command, {
      deserialize: (result) => deserialize5(fields.map(String), result),
      ...cmdOpts
    });
  }
};
var HIncrByCommand = class extends Command {
  constructor(cmd, opts) {
    super(["hincrby", ...cmd], opts);
  }
};
var HIncrByFloatCommand = class extends Command {
  constructor(cmd, opts) {
    super(["hincrbyfloat", ...cmd], opts);
  }
};
var HKeysCommand = class extends Command {
  constructor([key], opts) {
    super(["hkeys", key], opts);
  }
};
var HLenCommand = class extends Command {
  constructor(cmd, opts) {
    super(["hlen", ...cmd], opts);
  }
};
var HMSetCommand = class extends Command {
  constructor([key, kv], opts) {
    super(["hmset", key, ...Object.entries(kv).flatMap(([field, value]) => [field, value])], opts);
  }
};
var HScanCommand = class extends Command {
  constructor([key, cursor, cmdOpts], opts) {
    const command = ["hscan", key, cursor];
    if (cmdOpts?.match) {
      command.push("match", cmdOpts.match);
    }
    if (typeof cmdOpts?.count === "number") {
      command.push("count", cmdOpts.count);
    }
    super(command, {
      deserialize: deserializeScanResponse,
      ...opts
    });
  }
};
var HSetCommand = class extends Command {
  constructor([key, kv], opts) {
    super(["hset", key, ...Object.entries(kv).flatMap(([field, value]) => [field, value])], opts);
  }
};
var HSetExCommand = class extends Command {
  constructor([key, opts, kv], cmdOpts) {
    const command = ["hsetex", key];
    if (opts.conditional) {
      command.push(opts.conditional.toUpperCase());
    }
    if (opts.expiration) {
      if ("ex" in opts.expiration && typeof opts.expiration.ex === "number") {
        command.push("EX", opts.expiration.ex);
      } else if ("px" in opts.expiration && typeof opts.expiration.px === "number") {
        command.push("PX", opts.expiration.px);
      } else if ("exat" in opts.expiration && typeof opts.expiration.exat === "number") {
        command.push("EXAT", opts.expiration.exat);
      } else if ("pxat" in opts.expiration && typeof opts.expiration.pxat === "number") {
        command.push("PXAT", opts.expiration.pxat);
      } else if ("keepttl" in opts.expiration && opts.expiration.keepttl) {
        command.push("KEEPTTL");
      }
    }
    const entries = Object.entries(kv);
    command.push("FIELDS", entries.length);
    for (const [field, value] of entries) {
      command.push(field, value);
    }
    super(command, cmdOpts);
  }
};
var HSetNXCommand = class extends Command {
  constructor(cmd, opts) {
    super(["hsetnx", ...cmd], opts);
  }
};
var HStrLenCommand = class extends Command {
  constructor(cmd, opts) {
    super(["hstrlen", ...cmd], opts);
  }
};
var HTtlCommand = class extends Command {
  constructor(cmd, opts) {
    const [key, fields] = cmd;
    const fieldArray = Array.isArray(fields) ? fields : [fields];
    super(["httl", key, "FIELDS", fieldArray.length, ...fieldArray], opts);
  }
};
var HValsCommand = class extends Command {
  constructor(cmd, opts) {
    super(["hvals", ...cmd], opts);
  }
};
var IncrCommand = class extends Command {
  constructor(cmd, opts) {
    super(["incr", ...cmd], opts);
  }
};
var IncrByCommand = class extends Command {
  constructor(cmd, opts) {
    super(["incrby", ...cmd], opts);
  }
};
var IncrByFloatCommand = class extends Command {
  constructor(cmd, opts) {
    super(["incrbyfloat", ...cmd], opts);
  }
};
var JsonArrAppendCommand = class extends Command {
  constructor(cmd, opts) {
    super(["JSON.ARRAPPEND", ...cmd], opts);
  }
};
var JsonArrIndexCommand = class extends Command {
  constructor(cmd, opts) {
    super(["JSON.ARRINDEX", ...cmd], opts);
  }
};
var JsonArrInsertCommand = class extends Command {
  constructor(cmd, opts) {
    super(["JSON.ARRINSERT", ...cmd], opts);
  }
};
var JsonArrLenCommand = class extends Command {
  constructor(cmd, opts) {
    super(["JSON.ARRLEN", cmd[0], cmd[1] ?? "$"], opts);
  }
};
var JsonArrPopCommand = class extends Command {
  constructor(cmd, opts) {
    super(["JSON.ARRPOP", ...cmd], opts);
  }
};
var JsonArrTrimCommand = class extends Command {
  constructor(cmd, opts) {
    const path = cmd[1] ?? "$";
    const start = cmd[2] ?? 0;
    const stop = cmd[3] ?? 0;
    super(["JSON.ARRTRIM", cmd[0], path, start, stop], opts);
  }
};
var JsonClearCommand = class extends Command {
  constructor(cmd, opts) {
    super(["JSON.CLEAR", ...cmd], opts);
  }
};
var JsonDelCommand = class extends Command {
  constructor(cmd, opts) {
    super(["JSON.DEL", ...cmd], opts);
  }
};
var JsonForgetCommand = class extends Command {
  constructor(cmd, opts) {
    super(["JSON.FORGET", ...cmd], opts);
  }
};
var JsonGetCommand = class extends Command {
  constructor(cmd, opts) {
    const command = ["JSON.GET"];
    if (typeof cmd[1] === "string") {
      command.push(...cmd);
    } else {
      command.push(cmd[0]);
      if (cmd[1]) {
        if (cmd[1].indent) {
          command.push("INDENT", cmd[1].indent);
        }
        if (cmd[1].newline) {
          command.push("NEWLINE", cmd[1].newline);
        }
        if (cmd[1].space) {
          command.push("SPACE", cmd[1].space);
        }
      }
      command.push(...cmd.slice(2));
    }
    super(command, opts);
  }
};
var JsonMergeCommand = class extends Command {
  constructor(cmd, opts) {
    const command = ["JSON.MERGE", ...cmd];
    super(command, opts);
  }
};
var JsonMGetCommand = class extends Command {
  constructor(cmd, opts) {
    super(["JSON.MGET", ...cmd[0], cmd[1]], opts);
  }
};
var JsonMSetCommand = class extends Command {
  constructor(cmd, opts) {
    const command = ["JSON.MSET"];
    for (const c of cmd) {
      command.push(c.key, c.path, c.value);
    }
    super(command, opts);
  }
};
var JsonNumIncrByCommand = class extends Command {
  constructor(cmd, opts) {
    super(["JSON.NUMINCRBY", ...cmd], opts);
  }
};
var JsonNumMultByCommand = class extends Command {
  constructor(cmd, opts) {
    super(["JSON.NUMMULTBY", ...cmd], opts);
  }
};
var JsonObjKeysCommand = class extends Command {
  constructor(cmd, opts) {
    super(["JSON.OBJKEYS", ...cmd], opts);
  }
};
var JsonObjLenCommand = class extends Command {
  constructor(cmd, opts) {
    super(["JSON.OBJLEN", ...cmd], opts);
  }
};
var JsonRespCommand = class extends Command {
  constructor(cmd, opts) {
    super(["JSON.RESP", ...cmd], opts);
  }
};
var JsonSetCommand = class extends Command {
  constructor(cmd, opts) {
    const command = ["JSON.SET", cmd[0], cmd[1], cmd[2]];
    if (cmd[3]) {
      if (cmd[3].nx) {
        command.push("NX");
      } else if (cmd[3].xx) {
        command.push("XX");
      }
    }
    super(command, opts);
  }
};
var JsonStrAppendCommand = class extends Command {
  constructor(cmd, opts) {
    super(["JSON.STRAPPEND", ...cmd], opts);
  }
};
var JsonStrLenCommand = class extends Command {
  constructor(cmd, opts) {
    super(["JSON.STRLEN", ...cmd], opts);
  }
};
var JsonToggleCommand = class extends Command {
  constructor(cmd, opts) {
    super(["JSON.TOGGLE", ...cmd], opts);
  }
};
var JsonTypeCommand = class extends Command {
  constructor(cmd, opts) {
    super(["JSON.TYPE", ...cmd], opts);
  }
};
var KeysCommand = class extends Command {
  constructor(cmd, opts) {
    super(["keys", ...cmd], opts);
  }
};
var LIndexCommand = class extends Command {
  constructor(cmd, opts) {
    super(["lindex", ...cmd], opts);
  }
};
var LInsertCommand = class extends Command {
  constructor(cmd, opts) {
    super(["linsert", ...cmd], opts);
  }
};
var LLenCommand = class extends Command {
  constructor(cmd, opts) {
    super(["llen", ...cmd], opts);
  }
};
var LMoveCommand = class extends Command {
  constructor(cmd, opts) {
    super(["lmove", ...cmd], opts);
  }
};
var LmPopCommand = class extends Command {
  constructor(cmd, opts) {
    const [numkeys, keys, direction, count] = cmd;
    super(["LMPOP", numkeys, ...keys, direction, ...count ? ["COUNT", count] : []], opts);
  }
};
var LPopCommand = class extends Command {
  constructor(cmd, opts) {
    super(["lpop", ...cmd], opts);
  }
};
var LPosCommand = class extends Command {
  constructor(cmd, opts) {
    const args = ["lpos", cmd[0], cmd[1]];
    if (typeof cmd[2]?.rank === "number") {
      args.push("rank", cmd[2].rank);
    }
    if (typeof cmd[2]?.count === "number") {
      args.push("count", cmd[2].count);
    }
    if (typeof cmd[2]?.maxLen === "number") {
      args.push("maxLen", cmd[2].maxLen);
    }
    super(args, opts);
  }
};
var LPushCommand = class extends Command {
  constructor(cmd, opts) {
    super(["lpush", ...cmd], opts);
  }
};
var LPushXCommand = class extends Command {
  constructor(cmd, opts) {
    super(["lpushx", ...cmd], opts);
  }
};
var LRangeCommand = class extends Command {
  constructor(cmd, opts) {
    super(["lrange", ...cmd], opts);
  }
};
var LRemCommand = class extends Command {
  constructor(cmd, opts) {
    super(["lrem", ...cmd], opts);
  }
};
var LSetCommand = class extends Command {
  constructor(cmd, opts) {
    super(["lset", ...cmd], opts);
  }
};
var LTrimCommand = class extends Command {
  constructor(cmd, opts) {
    super(["ltrim", ...cmd], opts);
  }
};
var MGetCommand = class extends Command {
  constructor(cmd, opts) {
    const keys = Array.isArray(cmd[0]) ? cmd[0] : cmd;
    super(["mget", ...keys], opts);
  }
};
var MSetCommand = class extends Command {
  constructor([kv], opts) {
    super(["mset", ...Object.entries(kv).flatMap(([key, value]) => [key, value])], opts);
  }
};
var MSetNXCommand = class extends Command {
  constructor([kv], opts) {
    super(["msetnx", ...Object.entries(kv).flat()], opts);
  }
};
var PersistCommand = class extends Command {
  constructor(cmd, opts) {
    super(["persist", ...cmd], opts);
  }
};
var PExpireCommand = class extends Command {
  constructor(cmd, opts) {
    super(["pexpire", ...cmd], opts);
  }
};
var PExpireAtCommand = class extends Command {
  constructor(cmd, opts) {
    super(["pexpireat", ...cmd], opts);
  }
};
var PfAddCommand = class extends Command {
  constructor(cmd, opts) {
    super(["pfadd", ...cmd], opts);
  }
};
var PfCountCommand = class extends Command {
  constructor(cmd, opts) {
    super(["pfcount", ...cmd], opts);
  }
};
var PfMergeCommand = class extends Command {
  constructor(cmd, opts) {
    super(["pfmerge", ...cmd], opts);
  }
};
var PingCommand = class extends Command {
  constructor(cmd, opts) {
    const command = ["ping"];
    if (cmd?.[0] !== void 0) {
      command.push(cmd[0]);
    }
    super(command, opts);
  }
};
var PSetEXCommand = class extends Command {
  constructor(cmd, opts) {
    super(["psetex", ...cmd], opts);
  }
};
var PTtlCommand = class extends Command {
  constructor(cmd, opts) {
    super(["pttl", ...cmd], opts);
  }
};
var PublishCommand = class extends Command {
  constructor(cmd, opts) {
    super(["publish", ...cmd], opts);
  }
};
var RandomKeyCommand = class extends Command {
  constructor(opts) {
    super(["randomkey"], opts);
  }
};
var RenameCommand = class extends Command {
  constructor(cmd, opts) {
    super(["rename", ...cmd], opts);
  }
};
var RenameNXCommand = class extends Command {
  constructor(cmd, opts) {
    super(["renamenx", ...cmd], opts);
  }
};
var RPopCommand = class extends Command {
  constructor(cmd, opts) {
    super(["rpop", ...cmd], opts);
  }
};
var RPushCommand = class extends Command {
  constructor(cmd, opts) {
    super(["rpush", ...cmd], opts);
  }
};
var RPushXCommand = class extends Command {
  constructor(cmd, opts) {
    super(["rpushx", ...cmd], opts);
  }
};
var SAddCommand = class extends Command {
  constructor(cmd, opts) {
    super(["sadd", ...cmd], opts);
  }
};
var ScanCommand = class extends Command {
  constructor([cursor, opts], cmdOpts) {
    const command = ["scan", cursor];
    if (opts?.match) {
      command.push("match", opts.match);
    }
    if (typeof opts?.count === "number") {
      command.push("count", opts.count);
    }
    if (opts && "withType" in opts && opts.withType === true) {
      command.push("withtype");
    } else if (opts && "type" in opts && opts.type && opts.type.length > 0) {
      command.push("type", opts.type);
    }
    super(command, {
      // @ts-expect-error ignore types here
      deserialize: opts?.withType ? deserializeScanWithTypesResponse : deserializeScanResponse,
      ...cmdOpts
    });
  }
};
var SCardCommand = class extends Command {
  constructor(cmd, opts) {
    super(["scard", ...cmd], opts);
  }
};
var ScriptExistsCommand = class extends Command {
  constructor(hashes, opts) {
    super(["script", "exists", ...hashes], {
      deserialize: (result) => result,
      ...opts
    });
  }
};
var ScriptFlushCommand = class extends Command {
  constructor([opts], cmdOpts) {
    const cmd = ["script", "flush"];
    if (opts?.sync) {
      cmd.push("sync");
    } else if (opts?.async) {
      cmd.push("async");
    }
    super(cmd, cmdOpts);
  }
};
var ScriptLoadCommand = class extends Command {
  constructor(args, opts) {
    super(["script", "load", ...args], opts);
  }
};
var SDiffCommand = class extends Command {
  constructor(cmd, opts) {
    super(["sdiff", ...cmd], opts);
  }
};
var SDiffStoreCommand = class extends Command {
  constructor(cmd, opts) {
    super(["sdiffstore", ...cmd], opts);
  }
};
var SetCommand = class extends Command {
  constructor([key, value, opts], cmdOpts) {
    const command = ["set", key, value];
    if (opts) {
      if ("nx" in opts && opts.nx) {
        command.push("nx");
      } else if ("xx" in opts && opts.xx) {
        command.push("xx");
      }
      if ("get" in opts && opts.get) {
        command.push("get");
      }
      if ("ex" in opts && typeof opts.ex === "number") {
        command.push("ex", opts.ex);
      } else if ("px" in opts && typeof opts.px === "number") {
        command.push("px", opts.px);
      } else if ("exat" in opts && typeof opts.exat === "number") {
        command.push("exat", opts.exat);
      } else if ("pxat" in opts && typeof opts.pxat === "number") {
        command.push("pxat", opts.pxat);
      } else if ("keepTtl" in opts && opts.keepTtl) {
        command.push("keepTtl");
      }
    }
    super(command, cmdOpts);
  }
};
var SetBitCommand = class extends Command {
  constructor(cmd, opts) {
    super(["setbit", ...cmd], opts);
  }
};
var SetExCommand = class extends Command {
  constructor(cmd, opts) {
    super(["setex", ...cmd], opts);
  }
};
var SetNxCommand = class extends Command {
  constructor(cmd, opts) {
    super(["setnx", ...cmd], opts);
  }
};
var SetRangeCommand = class extends Command {
  constructor(cmd, opts) {
    super(["setrange", ...cmd], opts);
  }
};
var SInterCommand = class extends Command {
  constructor(cmd, opts) {
    super(["sinter", ...cmd], opts);
  }
};
var SInterCardCommand = class extends Command {
  constructor(cmd, cmdOpts) {
    const [keys, opts] = cmd;
    const command = ["sintercard", keys.length, ...keys];
    if (opts?.limit !== void 0) {
      command.push("LIMIT", opts.limit);
    }
    super(command, cmdOpts);
  }
};
var SInterStoreCommand = class extends Command {
  constructor(cmd, opts) {
    super(["sinterstore", ...cmd], opts);
  }
};
var SIsMemberCommand = class extends Command {
  constructor(cmd, opts) {
    super(["sismember", ...cmd], opts);
  }
};
var SMembersCommand = class extends Command {
  constructor(cmd, opts) {
    super(["smembers", ...cmd], opts);
  }
};
var SMIsMemberCommand = class extends Command {
  constructor(cmd, opts) {
    super(["smismember", cmd[0], ...cmd[1]], opts);
  }
};
var SMoveCommand = class extends Command {
  constructor(cmd, opts) {
    super(["smove", ...cmd], opts);
  }
};
var SPopCommand = class extends Command {
  constructor([key, count], opts) {
    const command = ["spop", key];
    if (typeof count === "number") {
      command.push(count);
    }
    super(command, opts);
  }
};
var SRandMemberCommand = class extends Command {
  constructor([key, count], opts) {
    const command = ["srandmember", key];
    if (typeof count === "number") {
      command.push(count);
    }
    super(command, opts);
  }
};
var SRemCommand = class extends Command {
  constructor(cmd, opts) {
    super(["srem", ...cmd], opts);
  }
};
var SScanCommand = class extends Command {
  constructor([key, cursor, opts], cmdOpts) {
    const command = ["sscan", key, cursor];
    if (opts?.match) {
      command.push("match", opts.match);
    }
    if (typeof opts?.count === "number") {
      command.push("count", opts.count);
    }
    super(command, {
      deserialize: deserializeScanResponse,
      ...cmdOpts
    });
  }
};
var StrLenCommand = class extends Command {
  constructor(cmd, opts) {
    super(["strlen", ...cmd], opts);
  }
};
var SUnionCommand = class extends Command {
  constructor(cmd, opts) {
    super(["sunion", ...cmd], opts);
  }
};
var SUnionStoreCommand = class extends Command {
  constructor(cmd, opts) {
    super(["sunionstore", ...cmd], opts);
  }
};
var TimeCommand = class extends Command {
  constructor(opts) {
    super(["time"], opts);
  }
};
var TouchCommand = class extends Command {
  constructor(cmd, opts) {
    super(["touch", ...cmd], opts);
  }
};
var TtlCommand = class extends Command {
  constructor(cmd, opts) {
    super(["ttl", ...cmd], opts);
  }
};
var TypeCommand = class extends Command {
  constructor(cmd, opts) {
    super(["type", ...cmd], opts);
  }
};
var UnlinkCommand = class extends Command {
  constructor(cmd, opts) {
    super(["unlink", ...cmd], opts);
  }
};
var XAckCommand = class extends Command {
  constructor([key, group, id], opts) {
    const ids = Array.isArray(id) ? [...id] : [id];
    super(["XACK", key, group, ...ids], opts);
  }
};
var XAckDelCommand = class extends Command {
  constructor([key, group, opts, ...ids], cmdOpts) {
    const command = ["XACKDEL", key, group];
    command.push(opts.toUpperCase(), "IDS", ids.length, ...ids);
    super(command, cmdOpts);
  }
};
var XAddCommand = class extends Command {
  constructor([key, id, entries, opts], commandOptions) {
    const command = ["XADD", key];
    if (opts) {
      if (opts.nomkStream) {
        command.push("NOMKSTREAM");
      }
      if (opts.trim) {
        command.push(opts.trim.type, opts.trim.comparison, opts.trim.threshold);
        if (opts.trim.limit !== void 0) {
          command.push("LIMIT", opts.trim.limit);
        }
      }
    }
    command.push(id);
    for (const [k, v] of Object.entries(entries)) {
      command.push(k, v);
    }
    super(command, commandOptions);
  }
};
var XAutoClaim = class extends Command {
  constructor([key, group, consumer, minIdleTime, start, options], opts) {
    const commands = [];
    if (options?.count) {
      commands.push("COUNT", options.count);
    }
    if (options?.justId) {
      commands.push("JUSTID");
    }
    super(["XAUTOCLAIM", key, group, consumer, minIdleTime, start, ...commands], opts);
  }
};
var XClaimCommand = class extends Command {
  constructor([key, group, consumer, minIdleTime, id, options], opts) {
    const ids = Array.isArray(id) ? [...id] : [id];
    const commands = [];
    if (options?.idleMS) {
      commands.push("IDLE", options.idleMS);
    }
    if (options?.idleMS) {
      commands.push("TIME", options.timeMS);
    }
    if (options?.retryCount) {
      commands.push("RETRYCOUNT", options.retryCount);
    }
    if (options?.force) {
      commands.push("FORCE");
    }
    if (options?.justId) {
      commands.push("JUSTID");
    }
    if (options?.lastId) {
      commands.push("LASTID", options.lastId);
    }
    super(["XCLAIM", key, group, consumer, minIdleTime, ...ids, ...commands], opts);
  }
};
var XDelCommand = class extends Command {
  constructor([key, ids], opts) {
    const cmds = Array.isArray(ids) ? [...ids] : [ids];
    super(["XDEL", key, ...cmds], opts);
  }
};
var XDelExCommand = class extends Command {
  constructor([key, opts, ...ids], cmdOpts) {
    const command = ["XDELEX", key];
    if (opts) {
      command.push(opts.toUpperCase());
    }
    command.push("IDS", ids.length, ...ids);
    super(command, cmdOpts);
  }
};
var XGroupCommand = class extends Command {
  constructor([key, opts], commandOptions) {
    const command = ["XGROUP"];
    switch (opts.type) {
      case "CREATE": {
        command.push("CREATE", key, opts.group, opts.id);
        if (opts.options) {
          if (opts.options.MKSTREAM) {
            command.push("MKSTREAM");
          }
          if (opts.options.ENTRIESREAD !== void 0) {
            command.push("ENTRIESREAD", opts.options.ENTRIESREAD.toString());
          }
        }
        break;
      }
      case "CREATECONSUMER": {
        command.push("CREATECONSUMER", key, opts.group, opts.consumer);
        break;
      }
      case "DELCONSUMER": {
        command.push("DELCONSUMER", key, opts.group, opts.consumer);
        break;
      }
      case "DESTROY": {
        command.push("DESTROY", key, opts.group);
        break;
      }
      case "SETID": {
        command.push("SETID", key, opts.group, opts.id);
        if (opts.options?.ENTRIESREAD !== void 0) {
          command.push("ENTRIESREAD", opts.options.ENTRIESREAD.toString());
        }
        break;
      }
      default: {
        throw new Error("Invalid XGROUP");
      }
    }
    super(command, commandOptions);
  }
};
var XInfoCommand = class extends Command {
  constructor([key, options], opts) {
    const cmds = [];
    if (options.type === "CONSUMERS") {
      cmds.push("CONSUMERS", key, options.group);
    } else {
      cmds.push("GROUPS", key);
    }
    super(["XINFO", ...cmds], opts);
  }
};
var XLenCommand = class extends Command {
  constructor(cmd, opts) {
    super(["XLEN", ...cmd], opts);
  }
};
var XPendingCommand = class extends Command {
  constructor([key, group, start, end, count, options], opts) {
    const consumers = options?.consumer === void 0 ? [] : Array.isArray(options.consumer) ? [...options.consumer] : [options.consumer];
    super(
      [
        "XPENDING",
        key,
        group,
        ...options?.idleTime ? ["IDLE", options.idleTime] : [],
        start,
        end,
        count,
        ...consumers
      ],
      opts
    );
  }
};
function deserialize6(result) {
  const obj = {};
  for (const e of result) {
    for (let i = 0; i < e.length; i += 2) {
      const streamId = e[i];
      const entries = e[i + 1];
      if (!(streamId in obj)) {
        obj[streamId] = {};
      }
      for (let j = 0; j < entries.length; j += 2) {
        const field = entries[j];
        const value = entries[j + 1];
        try {
          obj[streamId][field] = JSON.parse(value);
        } catch {
          obj[streamId][field] = value;
        }
      }
    }
  }
  return obj;
}
var XRangeCommand = class extends Command {
  constructor([key, start, end, count], opts) {
    const command = ["XRANGE", key, start, end];
    if (typeof count === "number") {
      command.push("COUNT", count);
    }
    super(command, {
      deserialize: (result) => deserialize6(result),
      ...opts
    });
  }
};
var UNBALANCED_XREAD_ERR = "ERR Unbalanced XREAD list of streams: for each stream key an ID or '$' must be specified";
var XReadCommand = class extends Command {
  constructor([key, id, options], opts) {
    if (Array.isArray(key) && Array.isArray(id) && key.length !== id.length) {
      throw new Error(UNBALANCED_XREAD_ERR);
    }
    const commands = [];
    if (typeof options?.count === "number") {
      commands.push("COUNT", options.count);
    }
    if (typeof options?.blockMS === "number") {
      commands.push("BLOCK", options.blockMS);
    }
    commands.push(
      "STREAMS",
      ...Array.isArray(key) ? [...key] : [key],
      ...Array.isArray(id) ? [...id] : [id]
    );
    super(["XREAD", ...commands], opts);
  }
};
var UNBALANCED_XREADGROUP_ERR = "ERR Unbalanced XREADGROUP list of streams: for each stream key an ID or '$' must be specified";
var XReadGroupCommand = class extends Command {
  constructor([group, consumer, key, id, options], opts) {
    if (Array.isArray(key) && Array.isArray(id) && key.length !== id.length) {
      throw new Error(UNBALANCED_XREADGROUP_ERR);
    }
    const commands = [];
    if (typeof options?.count === "number") {
      commands.push("COUNT", options.count);
    }
    if (typeof options?.blockMS === "number") {
      commands.push("BLOCK", options.blockMS);
    }
    if (typeof options?.NOACK === "boolean" && options.NOACK) {
      commands.push("NOACK");
    }
    commands.push(
      "STREAMS",
      ...Array.isArray(key) ? [...key] : [key],
      ...Array.isArray(id) ? [...id] : [id]
    );
    super(["XREADGROUP", "GROUP", group, consumer, ...commands], opts);
  }
};
var XRevRangeCommand = class extends Command {
  constructor([key, end, start, count], opts) {
    const command = ["XREVRANGE", key, end, start];
    if (typeof count === "number") {
      command.push("COUNT", count);
    }
    super(command, {
      deserialize: (result) => deserialize7(result),
      ...opts
    });
  }
};
function deserialize7(result) {
  const obj = {};
  for (const e of result) {
    for (let i = 0; i < e.length; i += 2) {
      const streamId = e[i];
      const entries = e[i + 1];
      if (!(streamId in obj)) {
        obj[streamId] = {};
      }
      for (let j = 0; j < entries.length; j += 2) {
        const field = entries[j];
        const value = entries[j + 1];
        try {
          obj[streamId][field] = JSON.parse(value);
        } catch {
          obj[streamId][field] = value;
        }
      }
    }
  }
  return obj;
}
var XTrimCommand = class extends Command {
  constructor([key, options], opts) {
    const { limit, strategy, threshold, exactness = "~" } = options;
    super(["XTRIM", key, strategy, exactness, threshold, ...limit ? ["LIMIT", limit] : []], opts);
  }
};
var ZAddCommand = class extends Command {
  constructor([key, arg1, ...arg2], opts) {
    const command = ["zadd", key];
    if ("nx" in arg1 && arg1.nx) {
      command.push("nx");
    } else if ("xx" in arg1 && arg1.xx) {
      command.push("xx");
    }
    if ("ch" in arg1 && arg1.ch) {
      command.push("ch");
    }
    if ("incr" in arg1 && arg1.incr) {
      command.push("incr");
    }
    if ("lt" in arg1 && arg1.lt) {
      command.push("lt");
    } else if ("gt" in arg1 && arg1.gt) {
      command.push("gt");
    }
    if ("score" in arg1 && "member" in arg1) {
      command.push(arg1.score, arg1.member);
    }
    command.push(...arg2.flatMap(({ score, member }) => [score, member]));
    super(command, opts);
  }
};
var ZCardCommand = class extends Command {
  constructor(cmd, opts) {
    super(["zcard", ...cmd], opts);
  }
};
var ZCountCommand = class extends Command {
  constructor(cmd, opts) {
    super(["zcount", ...cmd], opts);
  }
};
var ZIncrByCommand = class extends Command {
  constructor(cmd, opts) {
    super(["zincrby", ...cmd], opts);
  }
};
var ZInterStoreCommand = class extends Command {
  constructor([destination, numKeys, keyOrKeys, opts], cmdOpts) {
    const command = ["zinterstore", destination, numKeys];
    if (Array.isArray(keyOrKeys)) {
      command.push(...keyOrKeys);
    } else {
      command.push(keyOrKeys);
    }
    if (opts) {
      if ("weights" in opts && opts.weights) {
        command.push("weights", ...opts.weights);
      } else if ("weight" in opts && typeof opts.weight === "number") {
        command.push("weights", opts.weight);
      }
      if ("aggregate" in opts) {
        command.push("aggregate", opts.aggregate);
      }
    }
    super(command, cmdOpts);
  }
};
var ZLexCountCommand = class extends Command {
  constructor(cmd, opts) {
    super(["zlexcount", ...cmd], opts);
  }
};
var ZPopMaxCommand = class extends Command {
  constructor([key, count], opts) {
    const command = ["zpopmax", key];
    if (typeof count === "number") {
      command.push(count);
    }
    super(command, opts);
  }
};
var ZPopMinCommand = class extends Command {
  constructor([key, count], opts) {
    const command = ["zpopmin", key];
    if (typeof count === "number") {
      command.push(count);
    }
    super(command, opts);
  }
};
var ZRangeCommand = class extends Command {
  constructor([key, min, max, opts], cmdOpts) {
    const command = ["zrange", key, min, max];
    if (opts?.byScore) {
      command.push("byscore");
    }
    if (opts?.byLex) {
      command.push("bylex");
    }
    if (opts?.rev) {
      command.push("rev");
    }
    if (opts?.count !== void 0 && opts.offset !== void 0) {
      command.push("limit", opts.offset, opts.count);
    }
    if (opts?.withScores) {
      command.push("withscores");
    }
    super(command, cmdOpts);
  }
};
var ZRankCommand = class extends Command {
  constructor(cmd, opts) {
    super(["zrank", ...cmd], opts);
  }
};
var ZRemCommand = class extends Command {
  constructor(cmd, opts) {
    super(["zrem", ...cmd], opts);
  }
};
var ZRemRangeByLexCommand = class extends Command {
  constructor(cmd, opts) {
    super(["zremrangebylex", ...cmd], opts);
  }
};
var ZRemRangeByRankCommand = class extends Command {
  constructor(cmd, opts) {
    super(["zremrangebyrank", ...cmd], opts);
  }
};
var ZRemRangeByScoreCommand = class extends Command {
  constructor(cmd, opts) {
    super(["zremrangebyscore", ...cmd], opts);
  }
};
var ZRevRankCommand = class extends Command {
  constructor(cmd, opts) {
    super(["zrevrank", ...cmd], opts);
  }
};
var ZScanCommand = class extends Command {
  constructor([key, cursor, opts], cmdOpts) {
    const command = ["zscan", key, cursor];
    if (opts?.match) {
      command.push("match", opts.match);
    }
    if (typeof opts?.count === "number") {
      command.push("count", opts.count);
    }
    super(command, {
      deserialize: deserializeScanResponse,
      ...cmdOpts
    });
  }
};
var ZScoreCommand = class extends Command {
  constructor(cmd, opts) {
    super(["zscore", ...cmd], opts);
  }
};
var ZUnionCommand = class extends Command {
  constructor([numKeys, keyOrKeys, opts], cmdOpts) {
    const command = ["zunion", numKeys];
    if (Array.isArray(keyOrKeys)) {
      command.push(...keyOrKeys);
    } else {
      command.push(keyOrKeys);
    }
    if (opts) {
      if ("weights" in opts && opts.weights) {
        command.push("weights", ...opts.weights);
      } else if ("weight" in opts && typeof opts.weight === "number") {
        command.push("weights", opts.weight);
      }
      if ("aggregate" in opts) {
        command.push("aggregate", opts.aggregate);
      }
      if (opts.withScores) {
        command.push("withscores");
      }
    }
    super(command, cmdOpts);
  }
};
var ZUnionStoreCommand = class extends Command {
  constructor([destination, numKeys, keyOrKeys, opts], cmdOpts) {
    const command = ["zunionstore", destination, numKeys];
    if (Array.isArray(keyOrKeys)) {
      command.push(...keyOrKeys);
    } else {
      command.push(keyOrKeys);
    }
    if (opts) {
      if ("weights" in opts && opts.weights) {
        command.push("weights", ...opts.weights);
      } else if ("weight" in opts && typeof opts.weight === "number") {
        command.push("weights", opts.weight);
      }
      if ("aggregate" in opts) {
        command.push("aggregate", opts.aggregate);
      }
    }
    super(command, cmdOpts);
  }
};
var ZDiffStoreCommand = class extends Command {
  constructor(cmd, opts) {
    super(["zdiffstore", ...cmd], opts);
  }
};
var ZMScoreCommand = class extends Command {
  constructor(cmd, opts) {
    const [key, members] = cmd;
    super(["zmscore", key, ...members], opts);
  }
};
var Pipeline = class {
  client;
  commands;
  commandOptions;
  multiExec;
  constructor(opts) {
    this.client = opts.client;
    this.commands = [];
    this.commandOptions = opts.commandOptions;
    this.multiExec = opts.multiExec ?? false;
    if (this.commandOptions?.latencyLogging) {
      const originalExec = this.exec.bind(this);
      this.exec = async (options) => {
        const start = performance.now();
        const result = await (options ? originalExec(options) : originalExec());
        const end = performance.now();
        const loggerResult = (end - start).toFixed(2);
        console.log(
          `Latency for \x1B[38;2;19;185;39m${this.multiExec ? ["MULTI-EXEC"] : ["PIPELINE"].toString().toUpperCase()}\x1B[0m: \x1B[38;2;0;255;255m${loggerResult} ms\x1B[0m`
        );
        return result;
      };
    }
  }
  exec = async (options) => {
    if (this.commands.length === 0) {
      throw new Error("Pipeline is empty");
    }
    const path = this.multiExec ? ["multi-exec"] : ["pipeline"];
    const res = await this.client.request({
      path,
      body: Object.values(this.commands).map((c) => c.command)
    });
    return options?.keepErrors ? res.map(({ error, result }, i) => {
      return {
        error,
        result: this.commands[i].deserialize(result)
      };
    }) : res.map(({ error, result }, i) => {
      if (error) {
        throw new UpstashError(
          `Command ${i + 1} [ ${this.commands[i].command[0]} ] failed: ${error}`
        );
      }
      return this.commands[i].deserialize(result);
    });
  };
  /**
   * Returns the length of pipeline before the execution
   */
  length() {
    return this.commands.length;
  }
  /**
   * Pushes a command into the pipeline and returns a chainable instance of the
   * pipeline
   */
  chain(command) {
    this.commands.push(command);
    return this;
  }
  /**
   * @see https://redis.io/commands/append
   */
  append = (...args) => this.chain(new AppendCommand(args, this.commandOptions));
  /**
   * @see https://upstash.com/docs/redis/commands/array/arcount
   */
  arcount = (...args) => this.chain(new ArCountCommand(args, this.commandOptions));
  /**
   * @see https://upstash.com/docs/redis/commands/array/ardel
   */
  ardel = (...args) => this.chain(new ArDelCommand(args, this.commandOptions));
  /**
   * @see https://upstash.com/docs/redis/commands/array/ardelrange
   */
  ardelrange = (...args) => this.chain(new ArDelRangeCommand(args, this.commandOptions));
  /**
   * @see https://upstash.com/docs/redis/commands/array/arget
   */
  arget = (...args) => this.chain(new ArGetCommand(args, this.commandOptions));
  /**
   * @see https://upstash.com/docs/redis/commands/array/argetrange
   */
  argetrange = (...args) => this.chain(new ArGetRangeCommand(args, this.commandOptions));
  /**
   * @see https://upstash.com/docs/redis/commands/array/argrep
   */
  argrep = (key, start, end, opts) => this.chain(new ArGrepCommand([key, start, end, opts], this.commandOptions));
  /**
   * @see https://upstash.com/docs/redis/commands/array/arinfo
   */
  arinfo = (...args) => this.chain(new ArInfoCommand(args, this.commandOptions));
  /**
   * @see https://upstash.com/docs/redis/commands/array/arinsert
   */
  arinsert = (key, ...values) => this.chain(new ArInsertCommand([key, ...values], this.commandOptions));
  /**
   * @see https://upstash.com/docs/redis/commands/array/arlastitems
   */
  arlastitems = (...args) => this.chain(new ArLastItemsCommand(args, this.commandOptions));
  /**
   * @see https://upstash.com/docs/redis/commands/array/arlen
   */
  arlen = (...args) => this.chain(new ArLenCommand(args, this.commandOptions));
  /**
   * @see https://upstash.com/docs/redis/commands/array/armget
   */
  armget = (...args) => this.chain(new ArMGetCommand(args, this.commandOptions));
  /**
   * @see https://upstash.com/docs/redis/commands/array/armset
   */
  armset = (key, values) => this.chain(new ArMSetCommand([key, values], this.commandOptions));
  /**
   * @see https://upstash.com/docs/redis/commands/array/arnext
   */
  arnext = (...args) => this.chain(new ArNextCommand(args, this.commandOptions));
  /**
   * @see https://upstash.com/docs/redis/commands/array/arop
   */
  arop = (key, start, end, operation) => this.chain(new ArOpCommand([key, start, end, operation], this.commandOptions));
  /**
   * @see https://upstash.com/docs/redis/commands/array/arring
   */
  arring = (key, size, ...values) => this.chain(new ArRingCommand([key, size, ...values], this.commandOptions));
  /**
   * @see https://upstash.com/docs/redis/commands/array/arscan
   */
  arscan = (...args) => this.chain(new ArScanCommand(args, this.commandOptions));
  /**
   * @see https://upstash.com/docs/redis/commands/array/arseek
   */
  arseek = (...args) => this.chain(new ArSeekCommand(args, this.commandOptions));
  /**
   * @see https://upstash.com/docs/redis/commands/array/arset
   */
  arset = (key, index, ...values) => this.chain(new ArSetCommand([key, index, ...values], this.commandOptions));
  /**
   * @see https://redis.io/commands/bitcount
   */
  bitcount = (...args) => this.chain(new BitCountCommand(args, this.commandOptions));
  /**
   * Returns an instance that can be used to execute `BITFIELD` commands on one key.
   *
   * @example
   * ```typescript
   * redis.set("mykey", 0);
   * const result = await redis.pipeline()
   *   .bitfield("mykey")
   *   .set("u4", 0, 16)
   *   .incr("u4", "#1", 1)
   *   .exec();
   * console.log(result); // [[0, 1]]
   * ```
   *
   * @see https://redis.io/commands/bitfield
   */
  bitfield = (...args) => new BitFieldCommand(args, this.client, this.commandOptions, this.chain.bind(this));
  /**
   * @see https://redis.io/commands/bitop
   */
  bitop = (op, destinationKey, sourceKey, ...sourceKeys) => this.chain(
    new BitOpCommand([op, destinationKey, sourceKey, ...sourceKeys], this.commandOptions)
  );
  /**
   * @see https://redis.io/commands/bitpos
   */
  bitpos = (...args) => this.chain(new BitPosCommand(args, this.commandOptions));
  /**
   * @see https://redis.io/commands/client-setinfo
   */
  clientSetinfo = (...args) => this.chain(new ClientSetInfoCommand(args, this.commandOptions));
  /**
   * @see https://redis.io/commands/copy
   */
  copy = (...args) => this.chain(new CopyCommand(args, this.commandOptions));
  /**
   * @see https://redis.io/commands/zdiffstore
   */
  zdiffstore = (...args) => this.chain(new ZDiffStoreCommand(args, this.commandOptions));
  /**
   * @see https://redis.io/commands/dbsize
   */
  dbsize = () => this.chain(new DBSizeCommand(this.commandOptions));
  /**
   * @see https://redis.io/commands/decr
   */
  decr = (...args) => this.chain(new DecrCommand(args, this.commandOptions));
  /**
   * @see https://redis.io/commands/decrby
   */
  decrby = (...args) => this.chain(new DecrByCommand(args, this.commandOptions));
  /**
   * @see https://redis.io/commands/del
   */
  del = (...args) => this.chain(new DelCommand(args, this.commandOptions));
  /**
   * @see https://redis.io/commands/echo
   */
  echo = (...args) => this.chain(new EchoCommand(args, this.commandOptions));
  /**
   * @see https://redis.io/commands/eval_ro
   */
  evalRo = (...args) => this.chain(new EvalROCommand(args, this.commandOptions));
  /**
   * @see https://redis.io/commands/eval
   */
  eval = (...args) => this.chain(new EvalCommand(args, this.commandOptions));
  /**
   * @see https://redis.io/commands/evalsha_ro
   */
  evalshaRo = (...args) => this.chain(new EvalshaROCommand(args, this.commandOptions));
  /**
   * @see https://redis.io/commands/evalsha
   */
  evalsha = (...args) => this.chain(new EvalshaCommand(args, this.commandOptions));
  /**
   * @see https://redis.io/commands/exists
   */
  exists = (...args) => this.chain(new ExistsCommand(args, this.commandOptions));
  /**
   * @see https://redis.io/commands/expire
   */
  expire = (...args) => this.chain(new ExpireCommand(args, this.commandOptions));
  /**
   * @see https://redis.io/commands/expireat
   */
  expireat = (...args) => this.chain(new ExpireAtCommand(args, this.commandOptions));
  /**
   * @see https://redis.io/commands/flushall
   */
  flushall = (args) => this.chain(new FlushAllCommand(args, this.commandOptions));
  /**
   * @see https://redis.io/commands/flushdb
   */
  flushdb = (...args) => this.chain(new FlushDBCommand(args, this.commandOptions));
  /**
   * @see https://redis.io/commands/geoadd
   */
  geoadd = (...args) => this.chain(new GeoAddCommand(args, this.commandOptions));
  /**
   * @see https://redis.io/commands/geodist
   */
  geodist = (...args) => this.chain(new GeoDistCommand(args, this.commandOptions));
  /**
   * @see https://redis.io/commands/geopos
   */
  geopos = (...args) => this.chain(new GeoPosCommand(args, this.commandOptions));
  /**
   * @see https://redis.io/commands/geohash
   */
  geohash = (...args) => this.chain(new GeoHashCommand(args, this.commandOptions));
  /**
   * @see https://redis.io/commands/geosearch
   */
  geosearch = (...args) => this.chain(new GeoSearchCommand(args, this.commandOptions));
  /**
   * @see https://redis.io/commands/geosearchstore
   */
  geosearchstore = (...args) => this.chain(new GeoSearchStoreCommand(args, this.commandOptions));
  /**
   * @see https://redis.io/commands/get
   */
  get = (...args) => this.chain(new GetCommand(args, this.commandOptions));
  /**
   * @see https://redis.io/commands/getbit
   */
  getbit = (...args) => this.chain(new GetBitCommand(args, this.commandOptions));
  /**
   * @see https://redis.io/commands/getdel
   */
  getdel = (...args) => this.chain(new GetDelCommand(args, this.commandOptions));
  /**
   * @see https://redis.io/commands/getex
   */
  getex = (...args) => this.chain(new GetExCommand(args, this.commandOptions));
  /**
   * @see https://redis.io/commands/getrange
   */
  getrange = (...args) => this.chain(new GetRangeCommand(args, this.commandOptions));
  /**
   * @see https://redis.io/commands/getset
   */
  getset = (key, value) => this.chain(new GetSetCommand([key, value], this.commandOptions));
  /**
   * @see https://redis.io/commands/hdel
   */
  hdel = (...args) => this.chain(new HDelCommand(args, this.commandOptions));
  /**
   * @see https://redis.io/commands/hexists
   */
  hexists = (...args) => this.chain(new HExistsCommand(args, this.commandOptions));
  /**
   * @see https://redis.io/commands/hexpire
   */
  hexpire = (...args) => this.chain(new HExpireCommand(args, this.commandOptions));
  /**
   * @see https://redis.io/commands/hexpireat
   */
  hexpireat = (...args) => this.chain(new HExpireAtCommand(args, this.commandOptions));
  /**
   * @see https://redis.io/commands/hexpiretime
   */
  hexpiretime = (...args) => this.chain(new HExpireTimeCommand(args, this.commandOptions));
  /**
   * @see https://redis.io/commands/httl
   */
  httl = (...args) => this.chain(new HTtlCommand(args, this.commandOptions));
  /**
   * @see https://redis.io/commands/hpexpire
   */
  hpexpire = (...args) => this.chain(new HPExpireCommand(args, this.commandOptions));
  /**
   * @see https://redis.io/commands/hpexpireat
   */
  hpexpireat = (...args) => this.chain(new HPExpireAtCommand(args, this.commandOptions));
  /**
   * @see https://redis.io/commands/hpexpiretime
   */
  hpexpiretime = (...args) => this.chain(new HPExpireTimeCommand(args, this.commandOptions));
  /**
   * @see https://redis.io/commands/hpttl
   */
  hpttl = (...args) => this.chain(new HPTtlCommand(args, this.commandOptions));
  /**
   * @see https://redis.io/commands/hpersist
   */
  hpersist = (...args) => this.chain(new HPersistCommand(args, this.commandOptions));
  /**
   * @see https://redis.io/commands/hget
   */
  hget = (...args) => this.chain(new HGetCommand(args, this.commandOptions));
  /**
   * @see https://redis.io/commands/hgetall
   */
  hgetall = (...args) => this.chain(new HGetAllCommand(args, this.commandOptions));
  /**
   * @see https://redis.io/commands/hgetdel
   */
  hgetdel = (...args) => this.chain(new HGetDelCommand(args, this.commandOptions));
  /**
   * @see https://redis.io/commands/hgetex
   */
  hgetex = (...args) => this.chain(new HGetExCommand(args, this.commandOptions));
  /**
   * @see https://redis.io/commands/hincrby
   */
  hincrby = (...args) => this.chain(new HIncrByCommand(args, this.commandOptions));
  /**
   * @see https://redis.io/commands/hincrbyfloat
   */
  hincrbyfloat = (...args) => this.chain(new HIncrByFloatCommand(args, this.commandOptions));
  /**
   * @see https://redis.io/commands/hkeys
   */
  hkeys = (...args) => this.chain(new HKeysCommand(args, this.commandOptions));
  /**
   * @see https://redis.io/commands/hlen
   */
  hlen = (...args) => this.chain(new HLenCommand(args, this.commandOptions));
  /**
   * @see https://redis.io/commands/hmget
   */
  hmget = (...args) => this.chain(new HMGetCommand(args, this.commandOptions));
  /**
   * @see https://redis.io/commands/hmset
   */
  hmset = (key, kv) => this.chain(new HMSetCommand([key, kv], this.commandOptions));
  /**
   * @see https://redis.io/commands/hrandfield
   */
  hrandfield = (key, count, withValues) => this.chain(new HRandFieldCommand([key, count, withValues], this.commandOptions));
  /**
   * @see https://redis.io/commands/hscan
   */
  hscan = (...args) => this.chain(new HScanCommand(args, this.commandOptions));
  /**
   * @see https://redis.io/commands/hset
   */
  hset = (key, kv) => this.chain(new HSetCommand([key, kv], this.commandOptions));
  /**
   * @see https://redis.io/commands/hsetex
   */
  hsetex = (...args) => this.chain(new HSetExCommand(args, this.commandOptions));
  /**
   * @see https://redis.io/commands/hsetnx
   */
  hsetnx = (key, field, value) => this.chain(new HSetNXCommand([key, field, value], this.commandOptions));
  /**
   * @see https://redis.io/commands/hstrlen
   */
  hstrlen = (...args) => this.chain(new HStrLenCommand(args, this.commandOptions));
  /**
   * @see https://redis.io/commands/hvals
   */
  hvals = (...args) => this.chain(new HValsCommand(args, this.commandOptions));
  /**
   * @see https://redis.io/commands/incr
   */
  incr = (...args) => this.chain(new IncrCommand(args, this.commandOptions));
  /**
   * @see https://redis.io/commands/incrby
   */
  incrby = (...args) => this.chain(new IncrByCommand(args, this.commandOptions));
  /**
   * @see https://redis.io/commands/incrbyfloat
   */
  incrbyfloat = (...args) => this.chain(new IncrByFloatCommand(args, this.commandOptions));
  /**
   * @see https://redis.io/commands/keys
   */
  keys = (...args) => this.chain(new KeysCommand(args, this.commandOptions));
  /**
   * @see https://redis.io/commands/lindex
   */
  lindex = (...args) => this.chain(new LIndexCommand(args, this.commandOptions));
  /**
   * @see https://redis.io/commands/linsert
   */
  linsert = (key, direction, pivot, value) => this.chain(new LInsertCommand([key, direction, pivot, value], this.commandOptions));
  /**
   * @see https://redis.io/commands/llen
   */
  llen = (...args) => this.chain(new LLenCommand(args, this.commandOptions));
  /**
   * @see https://redis.io/commands/lmove
   */
  lmove = (...args) => this.chain(new LMoveCommand(args, this.commandOptions));
  /**
   * @see https://redis.io/commands/lpop
   */
  lpop = (...args) => this.chain(new LPopCommand(args, this.commandOptions));
  /**
   * @see https://redis.io/commands/lmpop
   */
  lmpop = (...args) => this.chain(new LmPopCommand(args, this.commandOptions));
  /**
   * @see https://redis.io/commands/lpos
   */
  lpos = (...args) => this.chain(new LPosCommand(args, this.commandOptions));
  /**
   * @see https://redis.io/commands/lpush
   */
  lpush = (key, ...elements) => this.chain(new LPushCommand([key, ...elements], this.commandOptions));
  /**
   * @see https://redis.io/commands/lpushx
   */
  lpushx = (key, ...elements) => this.chain(new LPushXCommand([key, ...elements], this.commandOptions));
  /**
   * @see https://redis.io/commands/lrange
   */
  lrange = (...args) => this.chain(new LRangeCommand(args, this.commandOptions));
  /**
   * @see https://redis.io/commands/lrem
   */
  lrem = (key, count, value) => this.chain(new LRemCommand([key, count, value], this.commandOptions));
  /**
   * @see https://redis.io/commands/lset
   */
  lset = (key, index, value) => this.chain(new LSetCommand([key, index, value], this.commandOptions));
  /**
   * @see https://redis.io/commands/ltrim
   */
  ltrim = (...args) => this.chain(new LTrimCommand(args, this.commandOptions));
  /**
   * @see https://redis.io/commands/mget
   */
  mget = (...args) => this.chain(new MGetCommand(args, this.commandOptions));
  /**
   * @see https://redis.io/commands/mset
   */
  mset = (kv) => this.chain(new MSetCommand([kv], this.commandOptions));
  /**
   * @see https://redis.io/commands/msetnx
   */
  msetnx = (kv) => this.chain(new MSetNXCommand([kv], this.commandOptions));
  /**
   * @see https://redis.io/commands/persist
   */
  persist = (...args) => this.chain(new PersistCommand(args, this.commandOptions));
  /**
   * @see https://redis.io/commands/pexpire
   */
  pexpire = (...args) => this.chain(new PExpireCommand(args, this.commandOptions));
  /**
   * @see https://redis.io/commands/pexpireat
   */
  pexpireat = (...args) => this.chain(new PExpireAtCommand(args, this.commandOptions));
  /**
   * @see https://redis.io/commands/pfadd
   */
  pfadd = (...args) => this.chain(new PfAddCommand(args, this.commandOptions));
  /**
   * @see https://redis.io/commands/pfcount
   */
  pfcount = (...args) => this.chain(new PfCountCommand(args, this.commandOptions));
  /**
   * @see https://redis.io/commands/pfmerge
   */
  pfmerge = (...args) => this.chain(new PfMergeCommand(args, this.commandOptions));
  /**
   * @see https://redis.io/commands/ping
   */
  ping = (args) => this.chain(new PingCommand(args, this.commandOptions));
  /**
   * @see https://redis.io/commands/psetex
   */
  psetex = (key, ttl, value) => this.chain(new PSetEXCommand([key, ttl, value], this.commandOptions));
  /**
   * @see https://redis.io/commands/pttl
   */
  pttl = (...args) => this.chain(new PTtlCommand(args, this.commandOptions));
  /**
   * @see https://redis.io/commands/publish
   */
  publish = (...args) => this.chain(new PublishCommand(args, this.commandOptions));
  /**
   * @see https://redis.io/commands/randomkey
   */
  randomkey = () => this.chain(new RandomKeyCommand(this.commandOptions));
  /**
   * @see https://redis.io/commands/rename
   */
  rename = (...args) => this.chain(new RenameCommand(args, this.commandOptions));
  /**
   * @see https://redis.io/commands/renamenx
   */
  renamenx = (...args) => this.chain(new RenameNXCommand(args, this.commandOptions));
  /**
   * @see https://redis.io/commands/rpop
   */
  rpop = (...args) => this.chain(new RPopCommand(args, this.commandOptions));
  /**
   * @see https://redis.io/commands/rpush
   */
  rpush = (key, ...elements) => this.chain(new RPushCommand([key, ...elements], this.commandOptions));
  /**
   * @see https://redis.io/commands/rpushx
   */
  rpushx = (key, ...elements) => this.chain(new RPushXCommand([key, ...elements], this.commandOptions));
  /**
   * @see https://redis.io/commands/sadd
   */
  sadd = (key, member, ...members) => this.chain(new SAddCommand([key, member, ...members], this.commandOptions));
  /**
   * @see https://redis.io/commands/scan
   */
  scan = (...args) => this.chain(new ScanCommand(args, this.commandOptions));
  /**
   * @see https://redis.io/commands/scard
   */
  scard = (...args) => this.chain(new SCardCommand(args, this.commandOptions));
  /**
   * @see https://redis.io/commands/script-exists
   */
  scriptExists = (...args) => this.chain(new ScriptExistsCommand(args, this.commandOptions));
  /**
   * @see https://redis.io/commands/script-flush
   */
  scriptFlush = (...args) => this.chain(new ScriptFlushCommand(args, this.commandOptions));
  /**
   * @see https://redis.io/commands/script-load
   */
  scriptLoad = (...args) => this.chain(new ScriptLoadCommand(args, this.commandOptions));
  /*)*
   * @see https://redis.io/commands/sdiff
   */
  sdiff = (...args) => this.chain(new SDiffCommand(args, this.commandOptions));
  /**
   * @see https://redis.io/commands/sdiffstore
   */
  sdiffstore = (...args) => this.chain(new SDiffStoreCommand(args, this.commandOptions));
  /**
   * @see https://redis.io/commands/set
   */
  set = (key, value, opts) => this.chain(new SetCommand([key, value, opts], this.commandOptions));
  /**
   * @see https://redis.io/commands/setbit
   */
  setbit = (...args) => this.chain(new SetBitCommand(args, this.commandOptions));
  /**
   * @see https://redis.io/commands/setex
   */
  setex = (key, ttl, value) => this.chain(new SetExCommand([key, ttl, value], this.commandOptions));
  /**
   * @see https://redis.io/commands/setnx
   */
  setnx = (key, value) => this.chain(new SetNxCommand([key, value], this.commandOptions));
  /**
   * @see https://redis.io/commands/setrange
   */
  setrange = (...args) => this.chain(new SetRangeCommand(args, this.commandOptions));
  /**
   * @see https://redis.io/commands/sinter
   */
  sinter = (...args) => this.chain(new SInterCommand(args, this.commandOptions));
  /**
   * @see https://redis.io/commands/sintercard
   */
  sintercard = (...args) => this.chain(new SInterCardCommand(args, this.commandOptions));
  /**
   * @see https://redis.io/commands/sinterstore
   */
  sinterstore = (...args) => this.chain(new SInterStoreCommand(args, this.commandOptions));
  /**
   * @see https://redis.io/commands/sismember
   */
  sismember = (key, member) => this.chain(new SIsMemberCommand([key, member], this.commandOptions));
  /**
   * @see https://redis.io/commands/smembers
   */
  smembers = (...args) => this.chain(new SMembersCommand(args, this.commandOptions));
  /**
   * @see https://redis.io/commands/smismember
   */
  smismember = (key, members) => this.chain(new SMIsMemberCommand([key, members], this.commandOptions));
  /**
   * @see https://redis.io/commands/smove
   */
  smove = (source, destination, member) => this.chain(new SMoveCommand([source, destination, member], this.commandOptions));
  /**
   * @see https://redis.io/commands/spop
   */
  spop = (...args) => this.chain(new SPopCommand(args, this.commandOptions));
  /**
   * @see https://redis.io/commands/srandmember
   */
  srandmember = (...args) => this.chain(new SRandMemberCommand(args, this.commandOptions));
  /**
   * @see https://redis.io/commands/srem
   */
  srem = (key, ...members) => this.chain(new SRemCommand([key, ...members], this.commandOptions));
  /**
   * @see https://redis.io/commands/sscan
   */
  sscan = (...args) => this.chain(new SScanCommand(args, this.commandOptions));
  /**
   * @see https://redis.io/commands/strlen
   */
  strlen = (...args) => this.chain(new StrLenCommand(args, this.commandOptions));
  /**
   * @see https://redis.io/commands/sunion
   */
  sunion = (...args) => this.chain(new SUnionCommand(args, this.commandOptions));
  /**
   * @see https://redis.io/commands/sunionstore
   */
  sunionstore = (...args) => this.chain(new SUnionStoreCommand(args, this.commandOptions));
  /**
   * @see https://redis.io/commands/time
   */
  time = () => this.chain(new TimeCommand(this.commandOptions));
  /**
   * @see https://redis.io/commands/touch
   */
  touch = (...args) => this.chain(new TouchCommand(args, this.commandOptions));
  /**
   * @see https://redis.io/commands/ttl
   */
  ttl = (...args) => this.chain(new TtlCommand(args, this.commandOptions));
  /**
   * @see https://redis.io/commands/type
   */
  type = (...args) => this.chain(new TypeCommand(args, this.commandOptions));
  /**
   * @see https://redis.io/commands/unlink
   */
  unlink = (...args) => this.chain(new UnlinkCommand(args, this.commandOptions));
  /**
   * @see https://redis.io/commands/zadd
   */
  zadd = (...args) => {
    if ("score" in args[1]) {
      return this.chain(
        new ZAddCommand([args[0], args[1], ...args.slice(2)], this.commandOptions)
      );
    }
    return this.chain(
      new ZAddCommand(
        [args[0], args[1], ...args.slice(2)],
        this.commandOptions
      )
    );
  };
  /**
   * @see https://redis.io/commands/xadd
   */
  xadd = (...args) => this.chain(new XAddCommand(args, this.commandOptions));
  /**
   * @see https://redis.io/commands/xack
   */
  xack = (...args) => this.chain(new XAckCommand(args, this.commandOptions));
  /**
   * @see https://redis.io/commands/xackdel
   */
  xackdel = (...args) => this.chain(new XAckDelCommand(args, this.commandOptions));
  /**
   * @see https://redis.io/commands/xdel
   */
  xdel = (...args) => this.chain(new XDelCommand(args, this.commandOptions));
  /**
   * @see https://redis.io/commands/xdelex
   */
  xdelex = (...args) => this.chain(new XDelExCommand(args, this.commandOptions));
  /**
   * @see https://redis.io/commands/xgroup
   */
  xgroup = (...args) => this.chain(new XGroupCommand(args, this.commandOptions));
  /**
   * @see https://redis.io/commands/xread
   */
  xread = (...args) => this.chain(new XReadCommand(args, this.commandOptions));
  /**
   * @see https://redis.io/commands/xreadgroup
   */
  xreadgroup = (...args) => this.chain(new XReadGroupCommand(args, this.commandOptions));
  /**
   * @see https://redis.io/commands/xinfo
   */
  xinfo = (...args) => this.chain(new XInfoCommand(args, this.commandOptions));
  /**
   * @see https://redis.io/commands/xlen
   */
  xlen = (...args) => this.chain(new XLenCommand(args, this.commandOptions));
  /**
   * @see https://redis.io/commands/xpending
   */
  xpending = (...args) => this.chain(new XPendingCommand(args, this.commandOptions));
  /**
   * @see https://redis.io/commands/xclaim
   */
  xclaim = (...args) => this.chain(new XClaimCommand(args, this.commandOptions));
  /**
   * @see https://redis.io/commands/xautoclaim
   */
  xautoclaim = (...args) => this.chain(new XAutoClaim(args, this.commandOptions));
  /**
   * @see https://redis.io/commands/xtrim
   */
  xtrim = (...args) => this.chain(new XTrimCommand(args, this.commandOptions));
  /**
   * @see https://redis.io/commands/xrange
   */
  xrange = (...args) => this.chain(new XRangeCommand(args, this.commandOptions));
  /**
   * @see https://redis.io/commands/xrevrange
   */
  xrevrange = (...args) => this.chain(new XRevRangeCommand(args, this.commandOptions));
  /**
   * @see https://redis.io/commands/zcard
   */
  zcard = (...args) => this.chain(new ZCardCommand(args, this.commandOptions));
  /**
   * @see https://redis.io/commands/zcount
   */
  zcount = (...args) => this.chain(new ZCountCommand(args, this.commandOptions));
  /**
   * @see https://redis.io/commands/zincrby
   */
  zincrby = (key, increment, member) => this.chain(new ZIncrByCommand([key, increment, member], this.commandOptions));
  /**
   * @see https://redis.io/commands/zinterstore
   */
  zinterstore = (...args) => this.chain(new ZInterStoreCommand(args, this.commandOptions));
  /**
   * @see https://redis.io/commands/zlexcount
   */
  zlexcount = (...args) => this.chain(new ZLexCountCommand(args, this.commandOptions));
  /**
   * @see https://redis.io/commands/zmscore
   */
  zmscore = (...args) => this.chain(new ZMScoreCommand(args, this.commandOptions));
  /**
   * @see https://redis.io/commands/zpopmax
   */
  zpopmax = (...args) => this.chain(new ZPopMaxCommand(args, this.commandOptions));
  /**
   * @see https://redis.io/commands/zpopmin
   */
  zpopmin = (...args) => this.chain(new ZPopMinCommand(args, this.commandOptions));
  /**
   * @see https://redis.io/commands/zrange
   */
  zrange = (...args) => this.chain(new ZRangeCommand(args, this.commandOptions));
  /**
   * @see https://redis.io/commands/zrank
   */
  zrank = (key, member) => this.chain(new ZRankCommand([key, member], this.commandOptions));
  /**
   * @see https://redis.io/commands/zrem
   */
  zrem = (key, ...members) => this.chain(new ZRemCommand([key, ...members], this.commandOptions));
  /**
   * @see https://redis.io/commands/zremrangebylex
   */
  zremrangebylex = (...args) => this.chain(new ZRemRangeByLexCommand(args, this.commandOptions));
  /**
   * @see https://redis.io/commands/zremrangebyrank
   */
  zremrangebyrank = (...args) => this.chain(new ZRemRangeByRankCommand(args, this.commandOptions));
  /**
   * @see https://redis.io/commands/zremrangebyscore
   */
  zremrangebyscore = (...args) => this.chain(new ZRemRangeByScoreCommand(args, this.commandOptions));
  /**
   * @see https://redis.io/commands/zrevrank
   */
  zrevrank = (key, member) => this.chain(new ZRevRankCommand([key, member], this.commandOptions));
  /**
   * @see https://redis.io/commands/zscan
   */
  zscan = (...args) => this.chain(new ZScanCommand(args, this.commandOptions));
  /**
   * @see https://redis.io/commands/zscore
   */
  zscore = (key, member) => this.chain(new ZScoreCommand([key, member], this.commandOptions));
  /**
   * @see https://redis.io/commands/zunionstore
   */
  zunionstore = (...args) => this.chain(new ZUnionStoreCommand(args, this.commandOptions));
  /**
   * @see https://redis.io/commands/zunion
   */
  zunion = (...args) => this.chain(new ZUnionCommand(args, this.commandOptions));
  /**
   * @see https://redis.io/commands/?group=json
   */
  get json() {
    return {
      /**
       * @see https://redis.io/commands/json.arrappend
       */
      arrappend: (...args) => this.chain(new JsonArrAppendCommand(args, this.commandOptions)),
      /**
       * @see https://redis.io/commands/json.arrindex
       */
      arrindex: (...args) => this.chain(new JsonArrIndexCommand(args, this.commandOptions)),
      /**
       * @see https://redis.io/commands/json.arrinsert
       */
      arrinsert: (...args) => this.chain(new JsonArrInsertCommand(args, this.commandOptions)),
      /**
       * @see https://redis.io/commands/json.arrlen
       */
      arrlen: (...args) => this.chain(new JsonArrLenCommand(args, this.commandOptions)),
      /**
       * @see https://redis.io/commands/json.arrpop
       */
      arrpop: (...args) => this.chain(new JsonArrPopCommand(args, this.commandOptions)),
      /**
       * @see https://redis.io/commands/json.arrtrim
       */
      arrtrim: (...args) => this.chain(new JsonArrTrimCommand(args, this.commandOptions)),
      /**
       * @see https://redis.io/commands/json.clear
       */
      clear: (...args) => this.chain(new JsonClearCommand(args, this.commandOptions)),
      /**
       * @see https://redis.io/commands/json.del
       */
      del: (...args) => this.chain(new JsonDelCommand(args, this.commandOptions)),
      /**
       * @see https://redis.io/commands/json.forget
       */
      forget: (...args) => this.chain(new JsonForgetCommand(args, this.commandOptions)),
      /**
       * @see https://redis.io/commands/json.get
       */
      get: (...args) => this.chain(new JsonGetCommand(args, this.commandOptions)),
      /**
       * @see https://redis.io/commands/json.merge
       */
      merge: (...args) => this.chain(new JsonMergeCommand(args, this.commandOptions)),
      /**
       * @see https://redis.io/commands/json.mget
       */
      mget: (...args) => this.chain(new JsonMGetCommand(args, this.commandOptions)),
      /**
       * @see https://redis.io/commands/json.mset
       */
      mset: (...args) => this.chain(new JsonMSetCommand(args, this.commandOptions)),
      /**
       * @see https://redis.io/commands/json.numincrby
       */
      numincrby: (...args) => this.chain(new JsonNumIncrByCommand(args, this.commandOptions)),
      /**
       * @see https://redis.io/commands/json.nummultby
       */
      nummultby: (...args) => this.chain(new JsonNumMultByCommand(args, this.commandOptions)),
      /**
       * @see https://redis.io/commands/json.objkeys
       */
      objkeys: (...args) => this.chain(new JsonObjKeysCommand(args, this.commandOptions)),
      /**
       * @see https://redis.io/commands/json.objlen
       */
      objlen: (...args) => this.chain(new JsonObjLenCommand(args, this.commandOptions)),
      /**
       * @see https://redis.io/commands/json.resp
       */
      resp: (...args) => this.chain(new JsonRespCommand(args, this.commandOptions)),
      /**
       * @see https://redis.io/commands/json.set
       */
      set: (...args) => this.chain(new JsonSetCommand(args, this.commandOptions)),
      /**
       * @see https://redis.io/commands/json.strappend
       */
      strappend: (...args) => this.chain(new JsonStrAppendCommand(args, this.commandOptions)),
      /**
       * @see https://redis.io/commands/json.strlen
       */
      strlen: (...args) => this.chain(new JsonStrLenCommand(args, this.commandOptions)),
      /**
       * @see https://redis.io/commands/json.toggle
       */
      toggle: (...args) => this.chain(new JsonToggleCommand(args, this.commandOptions)),
      /**
       * @see https://redis.io/commands/json.type
       */
      type: (...args) => this.chain(new JsonTypeCommand(args, this.commandOptions))
    };
  }
  get functions() {
    return {
      /**
       * @see https://redis.io/docs/latest/commands/function-load/
       */
      load: (...args) => this.chain(new FunctionLoadCommand(args, this.commandOptions)),
      /**
       * @see https://redis.io/docs/latest/commands/function-list/
       */
      list: (...args) => this.chain(new FunctionListCommand(args, this.commandOptions)),
      /**
       * @see https://redis.io/docs/latest/commands/function-delete/
       */
      delete: (...args) => this.chain(new FunctionDeleteCommand(args, this.commandOptions)),
      /**
       * @see https://redis.io/docs/latest/commands/function-flush/
       */
      flush: () => this.chain(new FunctionFlushCommand(this.commandOptions)),
      /**
       * @see https://redis.io/docs/latest/commands/function-stats/
       */
      stats: () => this.chain(new FunctionStatsCommand(this.commandOptions)),
      /**
       * @see https://redis.io/docs/latest/commands/fcall/
       */
      call: (...args) => this.chain(new FCallCommand(args, this.commandOptions)),
      /**
       * @see https://redis.io/docs/latest/commands/fcall_ro/
       */
      callRo: (...args) => this.chain(new FCallRoCommand(args, this.commandOptions))
    };
  }
};
var MAX_PIPELINE_SIZE = 1e3;
var READ_COMMANDS = /* @__PURE__ */ new Set([
  // Array
  "arcount",
  "arget",
  "argetrange",
  "argrep",
  "arinfo",
  "arlastitems",
  "arlen",
  "armget",
  "arnext",
  "arop",
  "arscan",
  // String
  "get",
  "getrange",
  "mget",
  "strlen",
  // Bit
  "bitcount",
  "bitpos",
  "getbit",
  // Hash
  "hexists",
  "hget",
  "hgetall",
  "hkeys",
  "hlen",
  "hmget",
  "hrandfield",
  "hscan",
  "hstrlen",
  "httl",
  "hvals",
  "hexpiretime",
  "hpexpiretime",
  "hpttl",
  // List
  "lindex",
  "llen",
  "lpos",
  "lrange",
  // Set
  "scard",
  "sdiff",
  "sinter",
  "sintercard",
  "sismember",
  "smembers",
  "smismember",
  "srandmember",
  "sscan",
  "sunion",
  // Sorted set
  "zcard",
  "zcount",
  "zlexcount",
  "zmscore",
  "zrange",
  "zrank",
  "zrevrank",
  "zscan",
  "zscore",
  "zunion",
  // Key metadata
  "exists",
  "type",
  "ttl",
  "pttl",
  "randomkey",
  "touch",
  // HyperLogLog
  "pfcount",
  // Stream
  "xinfo",
  "xlen",
  "xpending",
  "xrange",
  "xread",
  "xrevrange",
  // Geo
  "geodist",
  "geohash",
  "geopos",
  "geosearch",
  // Script / eval
  "scriptExists",
  "evalRo",
  "evalshaRo",
  // Utility
  "dbsize",
  "echo",
  "ping",
  "time",
  "scan",
  "keys",
  // JSON namespace
  "arrindex",
  "arrlen",
  "objkeys",
  "objlen",
  "resp",
  // Functions namespace
  "list",
  "stats",
  "callRo"
]);
var EXCLUDE_COMMANDS = /* @__PURE__ */ new Set([
  "scan",
  "keys",
  "flushdb",
  "flushall",
  "dbsize",
  "hscan",
  "hgetall",
  "hkeys",
  "lrange",
  "sscan",
  "smembers",
  "xrange",
  "xrevrange",
  "zscan",
  "zrange",
  "exec"
]);
function createAutoPipelineProxy(_redis, namespace = "root") {
  const redis = _redis;
  if (!redis.autoPipelineExecutor) {
    redis.autoPipelineExecutor = new AutoPipelineExecutor(redis);
  }
  return new Proxy(redis, {
    get: (redis2, command) => {
      if (command === "pipelineCounter") {
        return redis2.autoPipelineExecutor.pipelineCounter;
      }
      if (namespace === "root" && command === "json") {
        return createAutoPipelineProxy(redis2, "json");
      }
      if (namespace === "root" && command === "functions") {
        return createAutoPipelineProxy(redis2, "functions");
      }
      if (namespace === "root") {
        const commandInRedisButNotPipeline = command in redis2 && !(command in redis2.autoPipelineExecutor.pipeline);
        const isCommandExcluded = EXCLUDE_COMMANDS.has(command);
        if (commandInRedisButNotPipeline || isCommandExcluded) {
          return redis2[command];
        }
      }
      const pipeline = redis2.autoPipelineExecutor.pipeline;
      const targetFunction = namespace === "json" ? pipeline.json[command] : namespace === "functions" ? pipeline.functions[command] : pipeline[command];
      const isFunction = typeof targetFunction === "function";
      if (isFunction) {
        return (...args) => {
          const commandMode = READ_COMMANDS.has(command) ? "read" : "write";
          return redis2.autoPipelineExecutor.withAutoPipeline(commandMode, (pipeline2) => {
            const targetFunction2 = namespace === "json" ? pipeline2.json[command] : namespace === "functions" ? pipeline2.functions[command] : pipeline2[command];
            targetFunction2(...args);
          });
        };
      }
      return targetFunction;
    }
  });
}
var AutoPipelineExecutor = class {
  pipelinePromises = /* @__PURE__ */ new WeakMap();
  activeReadPipeline = null;
  activeWritePipeline = null;
  readIndex = 0;
  writeIndex = 0;
  redis;
  pipeline;
  // only to make sure that proxy can work
  pipelineCounter = 0;
  // to keep track of how many times a pipeline was executed
  constructor(redis) {
    this.redis = redis;
    this.pipeline = redis.pipeline();
  }
  async withAutoPipeline(commandMode, executeWithPipeline) {
    const isRead = commandMode === "read";
    const activePipeline = isRead ? this.activeReadPipeline : this.activeWritePipeline;
    const pipeline = activePipeline ?? this.redis.pipeline();
    if (!activePipeline) {
      if (isRead) {
        this.activeReadPipeline = pipeline;
        this.readIndex = 0;
      } else {
        this.activeWritePipeline = pipeline;
        this.writeIndex = 0;
      }
    }
    const index = isRead ? this.readIndex++ : this.writeIndex++;
    executeWithPipeline(pipeline);
    if (isRead && this.readIndex >= MAX_PIPELINE_SIZE) {
      this.activeReadPipeline = null;
    } else if (!isRead && this.writeIndex >= MAX_PIPELINE_SIZE) {
      this.activeWritePipeline = null;
    }
    const pipelineDone = this.deferExecution().then(() => {
      if (!this.pipelinePromises.has(pipeline)) {
        const pipelinePromise = pipeline.exec({ keepErrors: true });
        this.pipelineCounter += 1;
        this.pipelinePromises.set(pipeline, pipelinePromise);
        if (this.activeReadPipeline === pipeline) {
          this.activeReadPipeline = null;
        }
        if (this.activeWritePipeline === pipeline) {
          this.activeWritePipeline = null;
        }
      }
      return this.pipelinePromises.get(pipeline);
    });
    const results = await pipelineDone;
    const commandResult = results[index];
    if (commandResult.error) {
      throw new UpstashError(`Command failed: ${commandResult.error}`);
    }
    return commandResult.result;
  }
  async deferExecution() {
    await Promise.resolve();
    await Promise.resolve();
  }
};
var PSubscribeCommand = class extends Command {
  constructor(cmd, opts) {
    const sseHeaders = {
      Accept: "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive"
    };
    super([], {
      ...opts,
      headers: sseHeaders,
      path: ["psubscribe", ...cmd],
      streamOptions: {
        isStreaming: true,
        onMessage: opts?.streamOptions?.onMessage,
        signal: opts?.streamOptions?.signal
      }
    });
  }
};
var Subscriber = class extends EventTarget {
  subscriptions;
  client;
  listeners;
  opts;
  constructor(client, channels, isPattern = false, opts) {
    super();
    this.client = client;
    this.subscriptions = /* @__PURE__ */ new Map();
    this.listeners = /* @__PURE__ */ new Map();
    this.opts = opts;
    for (const channel of channels) {
      if (isPattern) {
        this.subscribeToPattern(channel);
      } else {
        this.subscribeToChannel(channel);
      }
    }
  }
  subscribeToChannel(channel) {
    const controller = new AbortController();
    const command = new SubscribeCommand([channel], {
      streamOptions: {
        signal: controller.signal,
        onMessage: (data) => this.handleMessage(data, false)
      }
    });
    command.exec(this.client).catch((error) => {
      if (error.name !== "AbortError") {
        this.dispatchToListeners("error", error);
      }
    });
    this.subscriptions.set(channel, {
      command,
      controller,
      isPattern: false
    });
  }
  subscribeToPattern(pattern) {
    const controller = new AbortController();
    const command = new PSubscribeCommand([pattern], {
      streamOptions: {
        signal: controller.signal,
        onMessage: (data) => this.handleMessage(data, true)
      }
    });
    command.exec(this.client).catch((error) => {
      if (error.name !== "AbortError") {
        this.dispatchToListeners("error", error);
      }
    });
    this.subscriptions.set(pattern, {
      command,
      controller,
      isPattern: true
    });
  }
  handleMessage(data, isPattern) {
    const messageData = data.replace(/^data:\s*/, "");
    const firstCommaIndex = messageData.indexOf(",");
    const secondCommaIndex = messageData.indexOf(",", firstCommaIndex + 1);
    const thirdCommaIndex = isPattern ? messageData.indexOf(",", secondCommaIndex + 1) : -1;
    if (firstCommaIndex !== -1 && secondCommaIndex !== -1) {
      const type = messageData.slice(0, firstCommaIndex);
      if (isPattern && type === "pmessage" && thirdCommaIndex !== -1) {
        const pattern = messageData.slice(firstCommaIndex + 1, secondCommaIndex);
        const channel = messageData.slice(secondCommaIndex + 1, thirdCommaIndex);
        const messageStr = messageData.slice(thirdCommaIndex + 1);
        try {
          const message = this.opts?.automaticDeserialization === false ? messageStr : JSON.parse(messageStr);
          this.dispatchToListeners("pmessage", { pattern, channel, message });
          this.dispatchToListeners(`pmessage:${pattern}`, { pattern, channel, message });
        } catch (error) {
          this.dispatchToListeners("error", new Error(`Failed to parse message: ${error}`));
        }
      } else {
        const channel = messageData.slice(firstCommaIndex + 1, secondCommaIndex);
        const messageStr = messageData.slice(secondCommaIndex + 1);
        try {
          if (type === "subscribe" || type === "psubscribe" || type === "unsubscribe" || type === "punsubscribe") {
            const count = Number.parseInt(messageStr);
            this.dispatchToListeners(type, count);
          } else {
            const message = this.opts?.automaticDeserialization === false ? messageStr : parseWithTryCatch(messageStr);
            this.dispatchToListeners(type, { channel, message });
            this.dispatchToListeners(`${type}:${channel}`, { channel, message });
          }
        } catch (error) {
          this.dispatchToListeners("error", new Error(`Failed to parse message: ${error}`));
        }
      }
    }
  }
  dispatchToListeners(type, data) {
    const listeners = this.listeners.get(type);
    if (listeners) {
      for (const listener of listeners) {
        listener(data);
      }
    }
  }
  on(type, listener) {
    if (!this.listeners.has(type)) {
      this.listeners.set(type, /* @__PURE__ */ new Set());
    }
    this.listeners.get(type)?.add(listener);
  }
  removeAllListeners() {
    this.listeners.clear();
  }
  async unsubscribe(channels) {
    if (channels) {
      for (const channel of channels) {
        const subscription = this.subscriptions.get(channel);
        if (subscription) {
          try {
            subscription.controller.abort();
          } catch {
          }
          this.subscriptions.delete(channel);
        }
      }
    } else {
      for (const subscription of this.subscriptions.values()) {
        try {
          subscription.controller.abort();
        } catch {
        }
      }
      this.subscriptions.clear();
      this.removeAllListeners();
    }
  }
  getSubscribedChannels() {
    return [...this.subscriptions.keys()];
  }
};
var SubscribeCommand = class extends Command {
  constructor(cmd, opts) {
    const sseHeaders = {
      Accept: "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive"
    };
    super([], {
      ...opts,
      headers: sseHeaders,
      path: ["subscribe", ...cmd],
      streamOptions: {
        isStreaming: true,
        onMessage: opts?.streamOptions?.onMessage,
        signal: opts?.streamOptions?.signal
      }
    });
  }
};
var parseWithTryCatch = (str) => {
  try {
    return JSON.parse(str);
  } catch {
    return str;
  }
};
var Script = class {
  script;
  /**
   * @deprecated This property is initialized to an empty string and will be set in the init method
   * asynchronously. Do not use this property immidiately after the constructor.
   *
   * This property is only exposed for backwards compatibility and will be removed in the
   * future major release.
   */
  sha1;
  initPromise;
  redis;
  constructor(redis, script) {
    this.redis = redis;
    this.script = script;
    this.sha1 = "";
    void this.init(script);
  }
  /**
   * Initialize the script by computing its SHA-1 hash.
   */
  init(script) {
    if (!this.initPromise) {
      this.initPromise = this.digest(script).then((sha1) => {
        this.sha1 = sha1;
      });
    }
    return this.initPromise;
  }
  /**
   * Send an `EVAL` command to redis.
   */
  async eval(keys, args) {
    await this.init(this.script);
    return await this.redis.eval(this.script, keys, args);
  }
  /**
   * Calculates the sha1 hash of the script and then calls `EVALSHA`.
   */
  async evalsha(keys, args) {
    await this.init(this.script);
    return await this.redis.evalsha(this.sha1, keys, args);
  }
  /**
   * Optimistically try to run `EVALSHA` first.
   * If the script is not loaded in redis, it will fall back and try again with `EVAL`.
   *
   * Following calls will be able to use the cached script
   */
  async exec(keys, args) {
    await this.init(this.script);
    const res = await this.redis.evalsha(this.sha1, keys, args).catch(async (error) => {
      if (error instanceof Error && error.message.toLowerCase().includes("noscript")) {
        return await this.redis.eval(this.script, keys, args);
      }
      throw error;
    });
    return res;
  }
  /**
   * Compute the sha1 hash of the script and return its hex representation.
   */
  async digest(s) {
    const data = new TextEncoder().encode(s);
    const hashBuffer = await subtle.digest("SHA-1", data);
    const hashArray = [...new Uint8Array(hashBuffer)];
    return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
  }
};
var ScriptRO = class {
  script;
  /**
   * @deprecated This property is initialized to an empty string and will be set in the init method
   * asynchronously. Do not use this property immidiately after the constructor.
   *
   * This property is only exposed for backwards compatibility and will be removed in the
   * future major release.
   */
  sha1;
  initPromise;
  redis;
  constructor(redis, script) {
    this.redis = redis;
    this.sha1 = "";
    this.script = script;
    void this.init(script);
  }
  init(script) {
    if (!this.initPromise) {
      this.initPromise = this.digest(script).then((sha1) => {
        this.sha1 = sha1;
      });
    }
    return this.initPromise;
  }
  /**
   * Send an `EVAL_RO` command to redis.
   */
  async evalRo(keys, args) {
    await this.init(this.script);
    return await this.redis.evalRo(this.script, keys, args);
  }
  /**
   * Calculates the sha1 hash of the script and then calls `EVALSHA_RO`.
   */
  async evalshaRo(keys, args) {
    await this.init(this.script);
    return await this.redis.evalshaRo(this.sha1, keys, args);
  }
  /**
   * Optimistically try to run `EVALSHA_RO` first.
   * If the script is not loaded in redis, it will fall back and try again with `EVAL_RO`.
   *
   * Following calls will be able to use the cached script
   */
  async exec(keys, args) {
    await this.init(this.script);
    const res = await this.redis.evalshaRo(this.sha1, keys, args).catch(async (error) => {
      if (error instanceof Error && error.message.toLowerCase().includes("noscript")) {
        return await this.redis.evalRo(this.script, keys, args);
      }
      throw error;
    });
    return res;
  }
  /**
   * Compute the sha1 hash of the script and return its hex representation.
   */
  async digest(s) {
    const data = new TextEncoder().encode(s);
    const hashBuffer = await subtle.digest("SHA-1", data);
    const hashArray = [...new Uint8Array(hashBuffer)];
    return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
  }
};
var Redis = class {
  client;
  opts;
  enableTelemetry;
  enableAutoPipelining;
  /**
   * Create a new redis client
   *
   * @example
   * ```typescript
   * const redis = new Redis({
   *  url: "<UPSTASH_REDIS_REST_URL>",
   *  token: "<UPSTASH_REDIS_REST_TOKEN>",
   * });
   * ```
   */
  constructor(client, opts) {
    this.client = client;
    this.opts = opts;
    this.enableTelemetry = opts?.enableTelemetry ?? true;
    if (opts?.readYourWrites === false) {
      this.client.readYourWrites = false;
    }
    this.enableAutoPipelining = opts?.enableAutoPipelining ?? true;
  }
  get readYourWritesSyncToken() {
    return this.client.upstashSyncToken;
  }
  set readYourWritesSyncToken(session) {
    this.client.upstashSyncToken = session;
  }
  get json() {
    return {
      /**
       * @see https://redis.io/commands/json.arrappend
       */
      arrappend: (...args) => new JsonArrAppendCommand(args, this.opts).exec(this.client),
      /**
       * @see https://redis.io/commands/json.arrindex
       */
      arrindex: (...args) => new JsonArrIndexCommand(args, this.opts).exec(this.client),
      /**
       * @see https://redis.io/commands/json.arrinsert
       */
      arrinsert: (...args) => new JsonArrInsertCommand(args, this.opts).exec(this.client),
      /**
       * @see https://redis.io/commands/json.arrlen
       */
      arrlen: (...args) => new JsonArrLenCommand(args, this.opts).exec(this.client),
      /**
       * @see https://redis.io/commands/json.arrpop
       */
      arrpop: (...args) => new JsonArrPopCommand(args, this.opts).exec(this.client),
      /**
       * @see https://redis.io/commands/json.arrtrim
       */
      arrtrim: (...args) => new JsonArrTrimCommand(args, this.opts).exec(this.client),
      /**
       * @see https://redis.io/commands/json.clear
       */
      clear: (...args) => new JsonClearCommand(args, this.opts).exec(this.client),
      /**
       * @see https://redis.io/commands/json.del
       */
      del: (...args) => new JsonDelCommand(args, this.opts).exec(this.client),
      /**
       * @see https://redis.io/commands/json.forget
       */
      forget: (...args) => new JsonForgetCommand(args, this.opts).exec(this.client),
      /**
       * @see https://redis.io/commands/json.get
       */
      get: (...args) => new JsonGetCommand(args, this.opts).exec(this.client),
      /**
       * @see https://redis.io/commands/json.merge
       */
      merge: (...args) => new JsonMergeCommand(args, this.opts).exec(this.client),
      /**
       * @see https://redis.io/commands/json.mget
       */
      mget: (...args) => new JsonMGetCommand(args, this.opts).exec(this.client),
      /**
       * @see https://redis.io/commands/json.mset
       */
      mset: (...args) => new JsonMSetCommand(args, this.opts).exec(this.client),
      /**
       * @see https://redis.io/commands/json.numincrby
       */
      numincrby: (...args) => new JsonNumIncrByCommand(args, this.opts).exec(this.client),
      /**
       * @see https://redis.io/commands/json.nummultby
       */
      nummultby: (...args) => new JsonNumMultByCommand(args, this.opts).exec(this.client),
      /**
       * @see https://redis.io/commands/json.objkeys
       */
      objkeys: (...args) => new JsonObjKeysCommand(args, this.opts).exec(this.client),
      /**
       * @see https://redis.io/commands/json.objlen
       */
      objlen: (...args) => new JsonObjLenCommand(args, this.opts).exec(this.client),
      /**
       * @see https://redis.io/commands/json.resp
       */
      resp: (...args) => new JsonRespCommand(args, this.opts).exec(this.client),
      /**
       * @see https://redis.io/commands/json.set
       */
      set: (...args) => new JsonSetCommand(args, this.opts).exec(this.client),
      /**
       * @see https://redis.io/commands/json.strappend
       */
      strappend: (...args) => new JsonStrAppendCommand(args, this.opts).exec(this.client),
      /**
       * @see https://redis.io/commands/json.strlen
       */
      strlen: (...args) => new JsonStrLenCommand(args, this.opts).exec(this.client),
      /**
       * @see https://redis.io/commands/json.toggle
       */
      toggle: (...args) => new JsonToggleCommand(args, this.opts).exec(this.client),
      /**
       * @see https://redis.io/commands/json.type
       */
      type: (...args) => new JsonTypeCommand(args, this.opts).exec(this.client)
    };
  }
  get functions() {
    return {
      /**
       * @see https://redis.io/docs/latest/commands/function-load/
       */
      load: (...args) => new FunctionLoadCommand(args, this.opts).exec(this.client),
      /**
       * @see https://redis.io/docs/latest/commands/function-list/
       */
      list: (...args) => new FunctionListCommand(args, this.opts).exec(this.client),
      /**
       * @see https://redis.io/docs/latest/commands/function-delete/
       */
      delete: (...args) => new FunctionDeleteCommand(args, this.opts).exec(this.client),
      /**
       * @see https://redis.io/docs/latest/commands/function-flush/
       */
      flush: () => new FunctionFlushCommand(this.opts).exec(this.client),
      /**
       * @see https://redis.io/docs/latest/commands/function-stats/
       *
       * Note: `running_script` field is not supported and therefore not included in the type.
       */
      stats: () => new FunctionStatsCommand(this.opts).exec(this.client),
      /**
       * @see https://redis.io/docs/latest/commands/fcall/
       */
      call: (...args) => new FCallCommand(args, this.opts).exec(this.client),
      /**
       * @see https://redis.io/docs/latest/commands/fcall_ro/
       */
      callRo: (...args) => new FCallRoCommand(args, this.opts).exec(this.client)
    };
  }
  /**
   * Wrap a new middleware around the HTTP client.
   */
  use = (middleware) => {
    const makeRequest = this.client.request.bind(this.client);
    this.client.request = (req) => middleware(req, makeRequest);
  };
  /**
   * Technically this is not private, we can hide it from intellisense by doing this
   */
  addTelemetry = (telemetry) => {
    if (!this.enableTelemetry) {
      return;
    }
    try {
      this.client.mergeTelemetry(telemetry);
    } catch {
    }
  };
  /**
   * Creates a new script.
   *
   * Scripts offer the ability to optimistically try to execute a script without having to send the
   * entire script to the server. If the script is loaded on the server, it tries again by sending
   * the entire script. Afterwards, the script is cached on the server.
   *
   * @param script - The script to create
   * @param opts - Optional options to pass to the script `{ readonly?: boolean }`
   * @returns A new script
   *
   * @example
   * ```ts
   * const redis = new Redis({...})
   *
   * const script = redis.createScript<string>("return ARGV[1];")
   * const arg1 = await script.eval([], ["Hello World"])
   * expect(arg1, "Hello World")
   * ```
   * @example
   * ```ts
   * const redis = new Redis({...})
   *
   * const script = redis.createScript<string>("return ARGV[1];", { readonly: true })
   * const arg1 = await script.evalRo([], ["Hello World"])
   * expect(arg1, "Hello World")
   * ```
   */
  createScript(script, opts) {
    return opts?.readonly ? new ScriptRO(this, script) : new Script(this, script);
  }
  get search() {
    return {
      createIndex: (params) => {
        return createIndex(this.client, params);
      },
      index: (params) => {
        return initIndex(this.client, params);
      },
      alias: {
        list: () => {
          return listAliases(this.client);
        },
        add: ({ indexName, alias }) => {
          return addAlias(this.client, { indexName, alias });
        },
        delete: ({ alias }) => {
          return delAlias(this.client, { alias });
        }
      }
    };
  }
  /**
   * Vector index commands.
   *
   * @example
   * ```typescript
   * const index = await redis.vector.createIndex({ name: "docs", dimension: 3, metric: "COSINE" });
   * await index.add("doc-1", [0.1, 0.2, 0.3]);
   * const hits = await index.query({ vector: [0.1, 0.2, 0.3], topK: 5 });
   * ```
   */
  get vector() {
    return {
      /**
       * Creates a vector index and returns a handle to it.
       */
      createIndex: (params) => {
        return createVectorIndex(this.client, params, this.opts);
      },
      /**
       * Returns a handle to an existing vector index without sending any command.
       */
      index: (name) => {
        return initVectorIndex(this.client, name, this.opts);
      }
    };
  }
  /**
   * Create a new pipeline that allows you to send requests in bulk.
   *
   * @see {@link Pipeline}
   */
  pipeline = () => new Pipeline({
    client: this.client,
    commandOptions: this.opts,
    multiExec: false
  });
  autoPipeline = () => {
    return createAutoPipelineProxy(this);
  };
  /**
   * Create a new transaction to allow executing multiple steps atomically.
   *
   * All the commands in a transaction are serialized and executed sequentially. A request sent by
   * another client will never be served in the middle of the execution of a Redis Transaction. This
   * guarantees that the commands are executed as a single isolated operation.
   *
   * @see {@link Pipeline}
   */
  multi = () => new Pipeline({
    client: this.client,
    commandOptions: this.opts,
    multiExec: true
  });
  /**
   * Returns an instance that can be used to execute `BITFIELD` commands on one key.
   *
   * @example
   * ```typescript
   * redis.set("mykey", 0);
   * const result = await redis.bitfield("mykey")
   *   .set("u4", 0, 16)
   *   .incr("u4", "#1", 1)
   *   .exec();
   * console.log(result); // [0, 1]
   * ```
   *
   * @see https://redis.io/commands/bitfield
   */
  bitfield = (...args) => new BitFieldCommand(args, this.client, this.opts);
  /**
   * @see https://redis.io/commands/append
   */
  append = (...args) => new AppendCommand(args, this.opts).exec(this.client);
  /**
   * @see https://upstash.com/docs/redis/commands/array/arcount
   */
  arcount = (...args) => new ArCountCommand(args, this.opts).exec(this.client);
  /**
   * @see https://upstash.com/docs/redis/commands/array/ardel
   */
  ardel = (...args) => new ArDelCommand(args, this.opts).exec(this.client);
  /**
   * @see https://upstash.com/docs/redis/commands/array/ardelrange
   */
  ardelrange = (...args) => new ArDelRangeCommand(args, this.opts).exec(this.client);
  /**
   * @see https://upstash.com/docs/redis/commands/array/arget
   */
  arget = (...args) => new ArGetCommand(args, this.opts).exec(this.client);
  /**
   * @see https://upstash.com/docs/redis/commands/array/argetrange
   */
  argetrange = (...args) => new ArGetRangeCommand(args, this.opts).exec(this.client);
  /**
   * @see https://upstash.com/docs/redis/commands/array/argrep
   */
  argrep = (key, start, end, opts) => new ArGrepCommand([key, start, end, opts], this.opts).exec(this.client);
  /**
   * @see https://upstash.com/docs/redis/commands/array/arinfo
   */
  arinfo = (...args) => new ArInfoCommand(args, this.opts).exec(this.client);
  /**
   * @see https://upstash.com/docs/redis/commands/array/arinsert
   */
  arinsert = (key, ...values) => new ArInsertCommand([key, ...values], this.opts).exec(this.client);
  /**
   * @see https://upstash.com/docs/redis/commands/array/arlastitems
   */
  arlastitems = (...args) => new ArLastItemsCommand(args, this.opts).exec(this.client);
  /**
   * @see https://upstash.com/docs/redis/commands/array/arlen
   */
  arlen = (...args) => new ArLenCommand(args, this.opts).exec(this.client);
  /**
   * @see https://upstash.com/docs/redis/commands/array/armget
   */
  armget = (...args) => new ArMGetCommand(args, this.opts).exec(this.client);
  /**
   * @see https://upstash.com/docs/redis/commands/array/armset
   */
  armset = (key, values) => new ArMSetCommand([key, values], this.opts).exec(this.client);
  /**
   * @see https://upstash.com/docs/redis/commands/array/arnext
   */
  arnext = (...args) => new ArNextCommand(args, this.opts).exec(this.client);
  /**
   * @see https://upstash.com/docs/redis/commands/array/arop
   */
  arop = (key, start, end, operation) => new ArOpCommand([key, start, end, operation], this.opts).exec(this.client);
  /**
   * @see https://upstash.com/docs/redis/commands/array/arring
   */
  arring = (key, size, ...values) => new ArRingCommand([key, size, ...values], this.opts).exec(this.client);
  /**
   * @see https://upstash.com/docs/redis/commands/array/arscan
   */
  arscan = (...args) => new ArScanCommand(args, this.opts).exec(this.client);
  /**
   * @see https://upstash.com/docs/redis/commands/array/arseek
   */
  arseek = (...args) => new ArSeekCommand(args, this.opts).exec(this.client);
  /**
   * @see https://upstash.com/docs/redis/commands/array/arset
   */
  arset = (key, index, ...values) => new ArSetCommand([key, index, ...values], this.opts).exec(this.client);
  /**
   * @see https://redis.io/commands/bitcount
   */
  bitcount = (...args) => new BitCountCommand(args, this.opts).exec(this.client);
  /**
   * @see https://redis.io/commands/bitop
   */
  bitop = (op, destinationKey, sourceKey, ...sourceKeys) => new BitOpCommand([op, destinationKey, sourceKey, ...sourceKeys], this.opts).exec(
    this.client
  );
  /**
   * @see https://redis.io/commands/bitpos
   */
  bitpos = (...args) => new BitPosCommand(args, this.opts).exec(this.client);
  /**
   * @see https://redis.io/commands/client-setinfo
   */
  clientSetinfo = (...args) => new ClientSetInfoCommand(args, this.opts).exec(this.client);
  /**
   * @see https://redis.io/commands/copy
   */
  copy = (...args) => new CopyCommand(args, this.opts).exec(this.client);
  /**
   * @see https://redis.io/commands/dbsize
   */
  dbsize = () => new DBSizeCommand(this.opts).exec(this.client);
  /**
   * @see https://redis.io/commands/decr
   */
  decr = (...args) => new DecrCommand(args, this.opts).exec(this.client);
  /**
   * @see https://redis.io/commands/decrby
   */
  decrby = (...args) => new DecrByCommand(args, this.opts).exec(this.client);
  /**
   * @see https://redis.io/commands/del
   */
  del = (...args) => new DelCommand(args, this.opts).exec(this.client);
  /**
   * @see https://redis.io/commands/echo
   */
  echo = (...args) => new EchoCommand(args, this.opts).exec(this.client);
  /**
   * @see https://redis.io/commands/eval_ro
   */
  evalRo = (...args) => new EvalROCommand(args, this.opts).exec(this.client);
  /**
   * @see https://redis.io/commands/eval
   */
  eval = (...args) => new EvalCommand(args, this.opts).exec(this.client);
  /**
   * @see https://redis.io/commands/evalsha_ro
   */
  evalshaRo = (...args) => new EvalshaROCommand(args, this.opts).exec(this.client);
  /**
   * @see https://redis.io/commands/evalsha
   */
  evalsha = (...args) => new EvalshaCommand(args, this.opts).exec(this.client);
  /**
   * Generic method to execute any Redis command.
   */
  exec = (args) => new ExecCommand(args, this.opts).exec(this.client);
  /**
   * @see https://redis.io/commands/exists
   */
  exists = (...args) => new ExistsCommand(args, this.opts).exec(this.client);
  /**
   * @see https://redis.io/commands/expire
   */
  expire = (...args) => new ExpireCommand(args, this.opts).exec(this.client);
  /**
   * @see https://redis.io/commands/expireat
   */
  expireat = (...args) => new ExpireAtCommand(args, this.opts).exec(this.client);
  /**
   * @see https://redis.io/commands/flushall
   */
  flushall = (args) => new FlushAllCommand(args, this.opts).exec(this.client);
  /**
   * @see https://redis.io/commands/flushdb
   */
  flushdb = (...args) => new FlushDBCommand(args, this.opts).exec(this.client);
  /**
   * @see https://redis.io/commands/geoadd
   */
  geoadd = (...args) => new GeoAddCommand(args, this.opts).exec(this.client);
  /**
   * @see https://redis.io/commands/geopos
   */
  geopos = (...args) => new GeoPosCommand(args, this.opts).exec(this.client);
  /**
   * @see https://redis.io/commands/geodist
   */
  geodist = (...args) => new GeoDistCommand(args, this.opts).exec(this.client);
  /**
   * @see https://redis.io/commands/geohash
   */
  geohash = (...args) => new GeoHashCommand(args, this.opts).exec(this.client);
  /**
   * @see https://redis.io/commands/geosearch
   */
  geosearch = (...args) => new GeoSearchCommand(args, this.opts).exec(this.client);
  /**
   * @see https://redis.io/commands/geosearchstore
   */
  geosearchstore = (...args) => new GeoSearchStoreCommand(args, this.opts).exec(this.client);
  /**
   * @see https://redis.io/commands/get
   */
  get = (...args) => new GetCommand(args, this.opts).exec(this.client);
  /**
   * @see https://redis.io/commands/getbit
   */
  getbit = (...args) => new GetBitCommand(args, this.opts).exec(this.client);
  /**
   * @see https://redis.io/commands/getdel
   */
  getdel = (...args) => new GetDelCommand(args, this.opts).exec(this.client);
  /**
   * @see https://redis.io/commands/getex
   */
  getex = (...args) => new GetExCommand(args, this.opts).exec(this.client);
  /**
   * @see https://redis.io/commands/getrange
   */
  getrange = (...args) => new GetRangeCommand(args, this.opts).exec(this.client);
  /**
   * @see https://redis.io/commands/getset
   */
  getset = (key, value) => new GetSetCommand([key, value], this.opts).exec(this.client);
  /**
   * @see https://redis.io/commands/hdel
   */
  hdel = (...args) => new HDelCommand(args, this.opts).exec(this.client);
  /**
   * @see https://redis.io/commands/hexists
   */
  hexists = (...args) => new HExistsCommand(args, this.opts).exec(this.client);
  /**
   * @see https://redis.io/commands/hexpire
   */
  hexpire = (...args) => new HExpireCommand(args, this.opts).exec(this.client);
  /**
   * @see https://redis.io/commands/hexpireat
   */
  hexpireat = (...args) => new HExpireAtCommand(args, this.opts).exec(this.client);
  /**
   * @see https://redis.io/commands/hexpiretime
   */
  hexpiretime = (...args) => new HExpireTimeCommand(args, this.opts).exec(this.client);
  /**
   * @see https://redis.io/commands/httl
   */
  httl = (...args) => new HTtlCommand(args, this.opts).exec(this.client);
  /**
   * @see https://redis.io/commands/hpexpire
   */
  hpexpire = (...args) => new HPExpireCommand(args, this.opts).exec(this.client);
  /**
   * @see https://redis.io/commands/hpexpireat
   */
  hpexpireat = (...args) => new HPExpireAtCommand(args, this.opts).exec(this.client);
  /**
   * @see https://redis.io/commands/hpexpiretime
   */
  hpexpiretime = (...args) => new HPExpireTimeCommand(args, this.opts).exec(this.client);
  /**
   * @see https://redis.io/commands/hpttl
   */
  hpttl = (...args) => new HPTtlCommand(args, this.opts).exec(this.client);
  /**
   * @see https://redis.io/commands/hpersist
   */
  hpersist = (...args) => new HPersistCommand(args, this.opts).exec(this.client);
  /**
   * @see https://redis.io/commands/hget
   */
  hget = (...args) => new HGetCommand(args, this.opts).exec(this.client);
  /**
   * @see https://redis.io/commands/hgetall
   */
  hgetall = (...args) => new HGetAllCommand(args, this.opts).exec(this.client);
  /**
   * @see https://redis.io/commands/hgetdel
   */
  hgetdel = (...args) => new HGetDelCommand(args, this.opts).exec(this.client);
  /**
   * @see https://redis.io/commands/hgetex
   */
  hgetex = (...args) => new HGetExCommand(args, this.opts).exec(this.client);
  /**
   * @see https://redis.io/commands/hincrby
   */
  hincrby = (...args) => new HIncrByCommand(args, this.opts).exec(this.client);
  /**
   * @see https://redis.io/commands/hincrbyfloat
   */
  hincrbyfloat = (...args) => new HIncrByFloatCommand(args, this.opts).exec(this.client);
  /**
   * @see https://redis.io/commands/hkeys
   */
  hkeys = (...args) => new HKeysCommand(args, this.opts).exec(this.client);
  /**
   * @see https://redis.io/commands/hlen
   */
  hlen = (...args) => new HLenCommand(args, this.opts).exec(this.client);
  /**
   * @see https://redis.io/commands/hmget
   */
  hmget = (...args) => new HMGetCommand(args, this.opts).exec(this.client);
  /**
   * @see https://redis.io/commands/hmset
   */
  hmset = (key, kv) => new HMSetCommand([key, kv], this.opts).exec(this.client);
  /**
   * @see https://redis.io/commands/hrandfield
   */
  hrandfield = (key, count, withValues) => new HRandFieldCommand([key, count, withValues], this.opts).exec(this.client);
  /**
   * @see https://redis.io/commands/hscan
   */
  hscan = (...args) => new HScanCommand(args, this.opts).exec(this.client);
  /**
   * @see https://redis.io/commands/hset
   */
  hset = (key, kv) => new HSetCommand([key, kv], this.opts).exec(this.client);
  /**
   * @see https://redis.io/commands/hsetex
   */
  hsetex = (...args) => new HSetExCommand(args, this.opts).exec(this.client);
  /**
   * @see https://redis.io/commands/hsetnx
   */
  hsetnx = (key, field, value) => new HSetNXCommand([key, field, value], this.opts).exec(this.client);
  /**
   * @see https://redis.io/commands/hstrlen
   */
  hstrlen = (...args) => new HStrLenCommand(args, this.opts).exec(this.client);
  /**
   * @see https://redis.io/commands/hvals
   */
  hvals = (...args) => new HValsCommand(args, this.opts).exec(this.client);
  /**
   * @see https://redis.io/commands/incr
   */
  incr = (...args) => new IncrCommand(args, this.opts).exec(this.client);
  /**
   * @see https://redis.io/commands/incrby
   */
  incrby = (...args) => new IncrByCommand(args, this.opts).exec(this.client);
  /**
   * @see https://redis.io/commands/incrbyfloat
   */
  incrbyfloat = (...args) => new IncrByFloatCommand(args, this.opts).exec(this.client);
  /**
   * @see https://redis.io/commands/keys
   */
  keys = (...args) => new KeysCommand(args, this.opts).exec(this.client);
  /**
   * @see https://redis.io/commands/lindex
   */
  lindex = (...args) => new LIndexCommand(args, this.opts).exec(this.client);
  /**
   * @see https://redis.io/commands/linsert
   */
  linsert = (key, direction, pivot, value) => new LInsertCommand([key, direction, pivot, value], this.opts).exec(this.client);
  /**
   * @see https://redis.io/commands/llen
   */
  llen = (...args) => new LLenCommand(args, this.opts).exec(this.client);
  /**
   * @see https://redis.io/commands/lmove
   */
  lmove = (...args) => new LMoveCommand(args, this.opts).exec(this.client);
  /**
   * @see https://redis.io/commands/lpop
   */
  lpop = (...args) => new LPopCommand(args, this.opts).exec(this.client);
  /**
   * @see https://redis.io/commands/lmpop
   */
  lmpop = (...args) => new LmPopCommand(args, this.opts).exec(this.client);
  /**
   * @see https://redis.io/commands/lpos
   */
  lpos = (...args) => new LPosCommand(args, this.opts).exec(this.client);
  /**
   * @see https://redis.io/commands/lpush
   */
  lpush = (key, ...elements) => new LPushCommand([key, ...elements], this.opts).exec(this.client);
  /**
   * @see https://redis.io/commands/lpushx
   */
  lpushx = (key, ...elements) => new LPushXCommand([key, ...elements], this.opts).exec(this.client);
  /**
   * @see https://redis.io/commands/lrange
   */
  lrange = (...args) => new LRangeCommand(args, this.opts).exec(this.client);
  /**
   * @see https://redis.io/commands/lrem
   */
  lrem = (key, count, value) => new LRemCommand([key, count, value], this.opts).exec(this.client);
  /**
   * @see https://redis.io/commands/lset
   */
  lset = (key, index, value) => new LSetCommand([key, index, value], this.opts).exec(this.client);
  /**
   * @see https://redis.io/commands/ltrim
   */
  ltrim = (...args) => new LTrimCommand(args, this.opts).exec(this.client);
  /**
   * @see https://redis.io/commands/mget
   */
  mget = (...args) => new MGetCommand(args, this.opts).exec(this.client);
  /**
   * @see https://redis.io/commands/mset
   */
  mset = (kv) => new MSetCommand([kv], this.opts).exec(this.client);
  /**
   * @see https://redis.io/commands/msetnx
   */
  msetnx = (kv) => new MSetNXCommand([kv], this.opts).exec(this.client);
  /**
   * @see https://redis.io/commands/persist
   */
  persist = (...args) => new PersistCommand(args, this.opts).exec(this.client);
  /**
   * @see https://redis.io/commands/pexpire
   */
  pexpire = (...args) => new PExpireCommand(args, this.opts).exec(this.client);
  /**
   * @see https://redis.io/commands/pexpireat
   */
  pexpireat = (...args) => new PExpireAtCommand(args, this.opts).exec(this.client);
  /**
   * @see https://redis.io/commands/pfadd
   */
  pfadd = (...args) => new PfAddCommand(args, this.opts).exec(this.client);
  /**
   * @see https://redis.io/commands/pfcount
   */
  pfcount = (...args) => new PfCountCommand(args, this.opts).exec(this.client);
  /**
   * @see https://redis.io/commands/pfmerge
   */
  pfmerge = (...args) => new PfMergeCommand(args, this.opts).exec(this.client);
  /**
   * @see https://redis.io/commands/ping
   */
  ping = (args) => new PingCommand(args, this.opts).exec(this.client);
  /**
   * @see https://redis.io/commands/psetex
   */
  psetex = (key, ttl, value) => new PSetEXCommand([key, ttl, value], this.opts).exec(this.client);
  /**
   * @see https://redis.io/commands/psubscribe
   */
  psubscribe = (patterns) => {
    const patternArray = Array.isArray(patterns) ? patterns : [patterns];
    return new Subscriber(this.client, patternArray, true, this.opts);
  };
  /**
   * @see https://redis.io/commands/pttl
   */
  pttl = (...args) => new PTtlCommand(args, this.opts).exec(this.client);
  /**
   * @see https://redis.io/commands/publish
   */
  publish = (...args) => new PublishCommand(args, this.opts).exec(this.client);
  /**
   * @see https://redis.io/commands/randomkey
   */
  randomkey = () => new RandomKeyCommand().exec(this.client);
  /**
   * @see https://redis.io/commands/rename
   */
  rename = (...args) => new RenameCommand(args, this.opts).exec(this.client);
  /**
   * @see https://redis.io/commands/renamenx
   */
  renamenx = (...args) => new RenameNXCommand(args, this.opts).exec(this.client);
  /**
   * @see https://redis.io/commands/rpop
   */
  rpop = (...args) => new RPopCommand(args, this.opts).exec(this.client);
  /**
   * @see https://redis.io/commands/rpush
   */
  rpush = (key, ...elements) => new RPushCommand([key, ...elements], this.opts).exec(this.client);
  /**
   * @see https://redis.io/commands/rpushx
   */
  rpushx = (key, ...elements) => new RPushXCommand([key, ...elements], this.opts).exec(this.client);
  /**
   * @see https://redis.io/commands/sadd
   */
  sadd = (key, member, ...members) => new SAddCommand([key, member, ...members], this.opts).exec(this.client);
  scan(cursor, opts) {
    return new ScanCommand([cursor, opts], this.opts).exec(this.client);
  }
  /**
   * @see https://redis.io/commands/scard
   */
  scard = (...args) => new SCardCommand(args, this.opts).exec(this.client);
  /**
   * @see https://redis.io/commands/script-exists
   */
  scriptExists = (...args) => new ScriptExistsCommand(args, this.opts).exec(this.client);
  /**
   * @see https://redis.io/commands/script-flush
   */
  scriptFlush = (...args) => new ScriptFlushCommand(args, this.opts).exec(this.client);
  /**
   * @see https://redis.io/commands/script-load
   */
  scriptLoad = (...args) => new ScriptLoadCommand(args, this.opts).exec(this.client);
  /**
   * @see https://redis.io/commands/sdiff
   */
  sdiff = (...args) => new SDiffCommand(args, this.opts).exec(this.client);
  /**
   * @see https://redis.io/commands/sdiffstore
   */
  sdiffstore = (...args) => new SDiffStoreCommand(args, this.opts).exec(this.client);
  /**
   * @see https://redis.io/commands/set
   */
  set = (key, value, opts) => new SetCommand([key, value, opts], this.opts).exec(this.client);
  /**
   * @see https://redis.io/commands/setbit
   */
  setbit = (...args) => new SetBitCommand(args, this.opts).exec(this.client);
  /**
   * @see https://redis.io/commands/setex
   */
  setex = (key, ttl, value) => new SetExCommand([key, ttl, value], this.opts).exec(this.client);
  /**
   * @see https://redis.io/commands/setnx
   */
  setnx = (key, value) => new SetNxCommand([key, value], this.opts).exec(this.client);
  /**
   * @see https://redis.io/commands/setrange
   */
  setrange = (...args) => new SetRangeCommand(args, this.opts).exec(this.client);
  /**
   * @see https://redis.io/commands/sinter
   */
  sinter = (...args) => new SInterCommand(args, this.opts).exec(this.client);
  /**
   * @see https://redis.io/commands/sintercard
   */
  sintercard = (...args) => new SInterCardCommand(args, this.opts).exec(this.client);
  /**
   * @see https://redis.io/commands/sinterstore
   */
  sinterstore = (...args) => new SInterStoreCommand(args, this.opts).exec(this.client);
  /**
   * @see https://redis.io/commands/sismember
   */
  sismember = (key, member) => new SIsMemberCommand([key, member], this.opts).exec(this.client);
  /**
   * @see https://redis.io/commands/smismember
   */
  smismember = (key, members) => new SMIsMemberCommand([key, members], this.opts).exec(this.client);
  /**
   * @see https://redis.io/commands/smembers
   */
  smembers = (...args) => new SMembersCommand(args, this.opts).exec(this.client);
  /**
   * @see https://redis.io/commands/smove
   */
  smove = (source, destination, member) => new SMoveCommand([source, destination, member], this.opts).exec(this.client);
  /**
   * @see https://redis.io/commands/spop
   */
  spop = (...args) => new SPopCommand(args, this.opts).exec(this.client);
  /**
   * @see https://redis.io/commands/srandmember
   */
  srandmember = (...args) => new SRandMemberCommand(args, this.opts).exec(this.client);
  /**
   * @see https://redis.io/commands/srem
   */
  srem = (key, ...members) => new SRemCommand([key, ...members], this.opts).exec(this.client);
  /**
   * @see https://redis.io/commands/sscan
   */
  sscan = (...args) => new SScanCommand(args, this.opts).exec(this.client);
  /**
   * @see https://redis.io/commands/strlen
   */
  strlen = (...args) => new StrLenCommand(args, this.opts).exec(this.client);
  /**
   * @see https://redis.io/commands/subscribe
   */
  subscribe = (channels) => {
    const channelArray = Array.isArray(channels) ? channels : [channels];
    return new Subscriber(this.client, channelArray, false, this.opts);
  };
  /**
   * @see https://redis.io/commands/sunion
   */
  sunion = (...args) => new SUnionCommand(args, this.opts).exec(this.client);
  /**
   * @see https://redis.io/commands/sunionstore
   */
  sunionstore = (...args) => new SUnionStoreCommand(args, this.opts).exec(this.client);
  /**
   * @see https://redis.io/commands/time
   */
  time = () => new TimeCommand().exec(this.client);
  /**
   * @see https://redis.io/commands/touch
   */
  touch = (...args) => new TouchCommand(args, this.opts).exec(this.client);
  /**
   * @see https://redis.io/commands/ttl
   */
  ttl = (...args) => new TtlCommand(args, this.opts).exec(this.client);
  /**
   * @see https://redis.io/commands/type
   */
  type = (...args) => new TypeCommand(args, this.opts).exec(this.client);
  /**
   * @see https://redis.io/commands/unlink
   */
  unlink = (...args) => new UnlinkCommand(args, this.opts).exec(this.client);
  /**
   * @see https://redis.io/commands/xadd
   */
  xadd = (...args) => new XAddCommand(args, this.opts).exec(this.client);
  /**
   * @see https://redis.io/commands/xack
   */
  xack = (...args) => new XAckCommand(args, this.opts).exec(this.client);
  /**
   * @see https://redis.io/commands/xackdel
   */
  xackdel = (...args) => new XAckDelCommand(args, this.opts).exec(this.client);
  /**
   * @see https://redis.io/commands/xdel
   */
  xdel = (...args) => new XDelCommand(args, this.opts).exec(this.client);
  /**
   * @see https://redis.io/commands/xdelex
   */
  xdelex = (...args) => new XDelExCommand(args, this.opts).exec(this.client);
  /**
   * @see https://redis.io/commands/xgroup
   */
  xgroup = (...args) => new XGroupCommand(args, this.opts).exec(this.client);
  /**
   * @see https://redis.io/commands/xread
   */
  xread = (...args) => new XReadCommand(args, this.opts).exec(this.client);
  /**
   * @see https://redis.io/commands/xreadgroup
   */
  xreadgroup = (...args) => new XReadGroupCommand(args, this.opts).exec(this.client);
  /**
   * @see https://redis.io/commands/xinfo
   */
  xinfo = (...args) => new XInfoCommand(args, this.opts).exec(this.client);
  /**
   * @see https://redis.io/commands/xlen
   */
  xlen = (...args) => new XLenCommand(args, this.opts).exec(this.client);
  /**
   * @see https://redis.io/commands/xpending
   */
  xpending = (...args) => new XPendingCommand(args, this.opts).exec(this.client);
  /**
   * @see https://redis.io/commands/xclaim
   */
  xclaim = (...args) => new XClaimCommand(args, this.opts).exec(this.client);
  /**
   * @see https://redis.io/commands/xautoclaim
   */
  xautoclaim = (...args) => new XAutoClaim(args, this.opts).exec(this.client);
  /**
   * @see https://redis.io/commands/xtrim
   */
  xtrim = (...args) => new XTrimCommand(args, this.opts).exec(this.client);
  /**
   * @see https://redis.io/commands/xrange
   */
  xrange = (...args) => new XRangeCommand(args, this.opts).exec(this.client);
  /**
   * @see https://redis.io/commands/xrevrange
   */
  xrevrange = (...args) => new XRevRangeCommand(args, this.opts).exec(this.client);
  /**
   * @see https://redis.io/commands/zadd
   */
  zadd = (...args) => {
    if ("score" in args[1]) {
      return new ZAddCommand([args[0], args[1], ...args.slice(2)], this.opts).exec(
        this.client
      );
    }
    return new ZAddCommand(
      [args[0], args[1], ...args.slice(2)],
      this.opts
    ).exec(this.client);
  };
  /**
   * @see https://redis.io/commands/zcard
   */
  zcard = (...args) => new ZCardCommand(args, this.opts).exec(this.client);
  /**
   * @see https://redis.io/commands/zcount
   */
  zcount = (...args) => new ZCountCommand(args, this.opts).exec(this.client);
  /**
   * @see https://redis.io/commands/zdiffstore
   */
  zdiffstore = (...args) => new ZDiffStoreCommand(args, this.opts).exec(this.client);
  /**
   * @see https://redis.io/commands/zincrby
   */
  zincrby = (key, increment, member) => new ZIncrByCommand([key, increment, member], this.opts).exec(this.client);
  /**
   * @see https://redis.io/commands/zinterstore
   */
  zinterstore = (...args) => new ZInterStoreCommand(args, this.opts).exec(this.client);
  /**
   * @see https://redis.io/commands/zlexcount
   */
  zlexcount = (...args) => new ZLexCountCommand(args, this.opts).exec(this.client);
  /**
   * @see https://redis.io/commands/zmscore
   */
  zmscore = (...args) => new ZMScoreCommand(args, this.opts).exec(this.client);
  /**
   * @see https://redis.io/commands/zpopmax
   */
  zpopmax = (...args) => new ZPopMaxCommand(args, this.opts).exec(this.client);
  /**
   * @see https://redis.io/commands/zpopmin
   */
  zpopmin = (...args) => new ZPopMinCommand(args, this.opts).exec(this.client);
  /**
   * @see https://redis.io/commands/zrange
   */
  zrange = (...args) => new ZRangeCommand(args, this.opts).exec(this.client);
  /**
   * @see https://redis.io/commands/zrank
   */
  zrank = (key, member) => new ZRankCommand([key, member], this.opts).exec(this.client);
  /**
   * @see https://redis.io/commands/zrem
   */
  zrem = (key, ...members) => new ZRemCommand([key, ...members], this.opts).exec(this.client);
  /**
   * @see https://redis.io/commands/zremrangebylex
   */
  zremrangebylex = (...args) => new ZRemRangeByLexCommand(args, this.opts).exec(this.client);
  /**
   * @see https://redis.io/commands/zremrangebyrank
   */
  zremrangebyrank = (...args) => new ZRemRangeByRankCommand(args, this.opts).exec(this.client);
  /**
   * @see https://redis.io/commands/zremrangebyscore
   */
  zremrangebyscore = (...args) => new ZRemRangeByScoreCommand(args, this.opts).exec(this.client);
  /**
   * @see https://redis.io/commands/zrevrank
   */
  zrevrank = (key, member) => new ZRevRankCommand([key, member], this.opts).exec(this.client);
  /**
   * @see https://redis.io/commands/zscan
   */
  zscan = (...args) => new ZScanCommand(args, this.opts).exec(this.client);
  /**
   * @see https://redis.io/commands/zscore
   */
  zscore = (key, member) => new ZScoreCommand([key, member], this.opts).exec(this.client);
  /**
   * @see https://redis.io/commands/zunion
   */
  zunion = (...args) => new ZUnionCommand(args, this.opts).exec(this.client);
  /**
   * @see https://redis.io/commands/zunionstore
   */
  zunionstore = (...args) => new ZUnionStoreCommand(args, this.opts).exec(this.client);
};
var VERSION = "v1.39.0";

// node_modules/@upstash/redis/nodejs.mjs
var BUILD = /* @__PURE__ */ Symbol("build");
var TextFieldBuilder = class _TextFieldBuilder {
  _noTokenize;
  _noStem;
  _from;
  constructor(noTokenize = { noTokenize: false }, noStem = { noStem: false }, from = { from: null }) {
    this._noTokenize = noTokenize;
    this._noStem = noStem;
    this._from = from;
  }
  noTokenize() {
    return new _TextFieldBuilder({ noTokenize: true }, this._noStem, this._from);
  }
  noStem() {
    return new _TextFieldBuilder(this._noTokenize, { noStem: true }, this._from);
  }
  from(field) {
    return new _TextFieldBuilder(this._noTokenize, this._noStem, { from: field });
  }
  [BUILD]() {
    return {
      type: "TEXT",
      ...this._noTokenize.noTokenize ? { noTokenize: true } : {},
      ...this._noStem.noStem ? { noStem: true } : {},
      ...this._from.from ? { from: this._from.from } : {}
    };
  }
};
var NumericFieldBuilder = class _NumericFieldBuilder {
  type;
  _from;
  constructor(type, from = { from: null }) {
    this.type = type;
    this._from = from;
  }
  from(field) {
    return new _NumericFieldBuilder(this.type, { from: field });
  }
  [BUILD]() {
    return this._from.from ? {
      type: this.type,
      fast: true,
      from: this._from.from
    } : {
      type: this.type,
      fast: true
    };
  }
};
var BoolFieldBuilder = class _BoolFieldBuilder {
  _fast;
  _from;
  constructor(fast = { fast: false }, from = { from: null }) {
    this._fast = fast;
    this._from = from;
  }
  fast() {
    return new _BoolFieldBuilder({ fast: true }, this._from);
  }
  from(field) {
    return new _BoolFieldBuilder(this._fast, { from: field });
  }
  [BUILD]() {
    const hasFast = this._fast.fast;
    const hasFrom = Boolean(this._from.from);
    if (hasFast && hasFrom) {
      return {
        type: "BOOL",
        fast: true,
        from: this._from.from
      };
    }
    if (hasFast) {
      return {
        type: "BOOL",
        fast: true
      };
    }
    if (hasFrom) {
      return {
        type: "BOOL",
        from: this._from.from
      };
    }
    return { type: "BOOL" };
  }
};
var DateFieldBuilder = class _DateFieldBuilder {
  _fast;
  _from;
  constructor(fast = { fast: false }, from = { from: null }) {
    this._fast = fast;
    this._from = from;
  }
  fast() {
    return new _DateFieldBuilder({ fast: true }, this._from);
  }
  from(field) {
    return new _DateFieldBuilder(this._fast, { from: field });
  }
  [BUILD]() {
    const hasFast = this._fast.fast;
    const hasFrom = Boolean(this._from.from);
    if (hasFast && hasFrom) {
      return {
        type: "DATE",
        fast: true,
        from: this._from.from
      };
    }
    if (hasFast) {
      return {
        type: "DATE",
        fast: true
      };
    }
    if (hasFrom) {
      return {
        type: "DATE",
        from: this._from.from
      };
    }
    return { type: "DATE" };
  }
};
var KeywordFieldBuilder = class {
  [BUILD]() {
    return { type: "KEYWORD" };
  }
};
var FacetFieldBuilder = class {
  [BUILD]() {
    return { type: "FACET" };
  }
};
if (typeof atob === "undefined") {
  global.atob = (b64) => Buffer.from(b64, "base64").toString("utf8");
}
var Redis2 = class _Redis extends Redis {
  /**
   * Create a new redis client by providing a custom `Requester` implementation
   *
   * @example
   * ```ts
   *
   * import { UpstashRequest, Requester, UpstashResponse, Redis } from "@upstash/redis"
   *
   *  const requester: Requester = {
   *    request: <TResult>(req: UpstashRequest): Promise<UpstashResponse<TResult>> => {
   *      // ...
   *    }
   *  }
   *
   * const redis = new Redis(requester)
   * ```
   */
  constructor(configOrRequester) {
    if ("request" in configOrRequester) {
      super(configOrRequester);
      return;
    }
    if (!configOrRequester.url) {
      console.warn(
        `[Upstash Redis] The 'url' property is missing or undefined in your Redis config. To create a database instantly (no signup needed), run: curl -X POST https://upstash.com/start-redis`
      );
    } else if (configOrRequester.url.startsWith(" ") || configOrRequester.url.endsWith(" ") || /\r|\n/.test(configOrRequester.url)) {
      console.warn(
        "[Upstash Redis] The redis url contains whitespace or newline, which can cause errors!"
      );
    }
    if (!configOrRequester.token) {
      console.warn(
        `[Upstash Redis] The 'token' property is missing or undefined in your Redis config. To create a database instantly (no signup needed), run: curl -X POST https://upstash.com/start-redis`
      );
    } else if (configOrRequester.token.startsWith(" ") || configOrRequester.token.endsWith(" ") || /\r|\n/.test(configOrRequester.token)) {
      console.warn(
        "[Upstash Redis] The redis token contains whitespace or newline, which can cause errors!"
      );
    }
    const client = new HttpClient({
      baseUrl: configOrRequester.url,
      retry: configOrRequester.retry,
      headers: { authorization: `Bearer ${configOrRequester.token}` },
      agent: configOrRequester.agent,
      responseEncoding: configOrRequester.responseEncoding,
      cache: configOrRequester.cache ?? "no-store",
      signal: configOrRequester.signal,
      keepAlive: configOrRequester.keepAlive,
      readYourWrites: configOrRequester.readYourWrites
    });
    const safeEnv = typeof process === "object" && process && typeof process.env === "object" && process.env ? process.env : {};
    super(client, {
      automaticDeserialization: configOrRequester.automaticDeserialization,
      enableTelemetry: configOrRequester.enableTelemetry ?? !safeEnv.UPSTASH_DISABLE_TELEMETRY,
      latencyLogging: configOrRequester.latencyLogging,
      enableAutoPipelining: configOrRequester.enableAutoPipelining
    });
    const nodeVersion = typeof process === "object" && process ? process.version : void 0;
    this.addTelemetry({
      runtime: (
        // @ts-expect-error to silence compiler
        typeof EdgeRuntime === "string" ? "edge-light" : nodeVersion ? `node@${nodeVersion}` : "unknown"
      ),
      platform: safeEnv.UPSTASH_CONSOLE ? "console" : safeEnv.VERCEL ? "vercel" : safeEnv.AWS_REGION ? "aws" : "unknown",
      sdk: `@upstash/redis@${VERSION}`
    });
    if (this.enableAutoPipelining) {
      return this.autoPipeline();
    }
  }
  /**
   * Create a new Upstash Redis instance from environment variables.
   *
   * Use this to automatically load connection secrets from your environment
   * variables. For instance when using the Vercel integration.
   *
   * This tries to load connection details from your environment using `process.env`:
   * - URL: `UPSTASH_REDIS_REST_URL` or fallback to `KV_REST_API_URL`
   * - Token: `UPSTASH_REDIS_REST_TOKEN` or fallback to `KV_REST_API_TOKEN`
   *
   * The fallback variables provide compatibility with Vercel KV and other platforms
   * that may use different naming conventions.
   */
  static fromEnv(config) {
    if (typeof process !== "object" || !process || typeof process.env !== "object" || !process.env) {
      throw new TypeError(
        '[Upstash Redis] Unable to get environment variables, `process.env` is undefined. If you are deploying to cloudflare, please import from "@upstash/redis/cloudflare" instead'
      );
    }
    const url = process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL;
    if (!url) {
      console.warn(
        "[Upstash Redis] Unable to find environment variable: `UPSTASH_REDIS_REST_URL`. To create a database instantly (no signup needed), run: curl -X POST https://upstash.com/start-redis"
      );
    }
    const token = process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN;
    if (!token) {
      console.warn(
        "[Upstash Redis] Unable to find environment variable: `UPSTASH_REDIS_REST_TOKEN`. To create a database instantly (no signup needed), run: curl -X POST https://upstash.com/start-redis"
      );
    }
    return new _Redis({ ...config, url, token });
  }
};

// src/server/session/redis-client.ts
var import_ioredis = __toESM(require_built3(), 1);
var SESSION_PREFIX = "apnacare:session:";
var USER_INDEX_PREFIX = "apnacare:user_sessions:";
var MemorySessionStore = class {
  sessions = /* @__PURE__ */ new Map();
  userIndex = /* @__PURE__ */ new Map();
  async get(sessionId) {
    const entry = this.sessions.get(sessionId);
    if (!entry) return null;
    if (Date.now() > entry.expiresAt) {
      this.sessions.delete(sessionId);
      return null;
    }
    return entry.data;
  }
  async set(sessionId, session, ttlSeconds) {
    this.sessions.set(sessionId, {
      data: session,
      expiresAt: Date.now() + ttlSeconds * 1e3
    });
    if (!this.userIndex.has(session.userId)) {
      this.userIndex.set(session.userId, /* @__PURE__ */ new Set());
    }
    this.userIndex.get(session.userId).add(sessionId);
  }
  async touch(sessionId, ttlSeconds, lastActivityAt) {
    const entry = this.sessions.get(sessionId);
    if (!entry) return false;
    entry.data.lastActivityAt = lastActivityAt;
    entry.expiresAt = Date.now() + ttlSeconds * 1e3;
    return true;
  }
  async delete(sessionId) {
    const entry = this.sessions.get(sessionId);
    if (entry) {
      const userSessions = this.userIndex.get(entry.data.userId);
      if (userSessions) {
        userSessions.delete(sessionId);
      }
    }
    this.sessions.delete(sessionId);
  }
  async getUserSessions(userId) {
    const set = this.userIndex.get(userId);
    if (!set) return [];
    return Array.from(set);
  }
  async revokeUserSessions(userId) {
    const set = this.userIndex.get(userId);
    if (set) {
      for (const sid of set) {
        this.sessions.delete(sid);
      }
      this.userIndex.delete(userId);
    }
  }
  async isHealthy() {
    return true;
  }
};
var UpstashSessionStore = class {
  client;
  constructor(url, token) {
    this.client = new Redis2({ url, token });
  }
  async get(sessionId) {
    try {
      const raw = await this.client.get(`${SESSION_PREFIX}${sessionId}`);
      if (!raw) return null;
      return typeof raw === "string" ? JSON.parse(raw) : raw;
    } catch (err) {
      console.error("[Redis/Upstash] Failed to get session:", err);
      return null;
    }
  }
  async set(sessionId, session, ttlSeconds) {
    try {
      const key = `${SESSION_PREFIX}${sessionId}`;
      const userKey = `${USER_INDEX_PREFIX}${session.userId}`;
      await this.client.pipeline().set(key, JSON.stringify(session), { ex: ttlSeconds }).sadd(userKey, sessionId).expire(userKey, 604800).exec();
    } catch (err) {
      console.error("[Redis/Upstash] Failed to set session:", err);
      throw err;
    }
  }
  async touch(sessionId, ttlSeconds, lastActivityAt) {
    try {
      const key = `${SESSION_PREFIX}${sessionId}`;
      const session = await this.get(sessionId);
      if (!session) return false;
      session.lastActivityAt = lastActivityAt;
      await this.client.set(key, JSON.stringify(session), { ex: ttlSeconds });
      return true;
    } catch (err) {
      console.error("[Redis/Upstash] Failed to touch session:", err);
      return false;
    }
  }
  async delete(sessionId) {
    try {
      const session = await this.get(sessionId);
      const key = `${SESSION_PREFIX}${sessionId}`;
      if (session) {
        const userKey = `${USER_INDEX_PREFIX}${session.userId}`;
        await this.client.pipeline().del(key).srem(userKey, sessionId).exec();
      } else {
        await this.client.del(key);
      }
    } catch (err) {
      console.error("[Redis/Upstash] Failed to delete session:", err);
    }
  }
  async getUserSessions(userId) {
    try {
      const userKey = `${USER_INDEX_PREFIX}${userId}`;
      return await this.client.smembers(userKey);
    } catch (err) {
      console.error("[Redis/Upstash] Failed to get user sessions:", err);
      return [];
    }
  }
  async revokeUserSessions(userId) {
    try {
      const userKey = `${USER_INDEX_PREFIX}${userId}`;
      const sessions = await this.getUserSessions(userId);
      if (sessions.length > 0) {
        const pipe = this.client.pipeline();
        for (const sid of sessions) {
          pipe.del(`${SESSION_PREFIX}${sid}`);
        }
        pipe.del(userKey);
        await pipe.exec();
      }
    } catch (err) {
      console.error("[Redis/Upstash] Failed to revoke user sessions:", err);
    }
  }
  async isHealthy() {
    try {
      const pong = await this.client.ping();
      return pong === "PONG";
    } catch {
      return false;
    }
  }
};
var IoRedisSessionStore = class {
  client;
  constructor(redisUrlOrOptions) {
    const opts = {
      connectTimeout: 5e3,
      maxRetriesPerRequest: 2,
      lazyConnect: false,
      enableReadyCheck: true,
      retryStrategy: (times) => times > 3 ? null : Math.min(times * 100, 1e3)
    };
    if (typeof redisUrlOrOptions === "string") {
      this.client = new import_ioredis.default(redisUrlOrOptions, opts);
    } else {
      this.client = new import_ioredis.default({ ...redisUrlOrOptions, ...opts });
    }
    this.client.on("error", (err) => {
      console.error("[Redis/IORedis] Connection error:", err.message);
    });
  }
  async get(sessionId) {
    try {
      const raw = await this.client.get(`${SESSION_PREFIX}${sessionId}`);
      if (!raw) return null;
      return JSON.parse(raw);
    } catch (err) {
      console.error("[Redis/IORedis] Failed to get session:", err);
      return null;
    }
  }
  async set(sessionId, session, ttlSeconds) {
    try {
      const key = `${SESSION_PREFIX}${sessionId}`;
      const userKey = `${USER_INDEX_PREFIX}${session.userId}`;
      await this.client.multi().set(key, JSON.stringify(session), "EX", ttlSeconds).sadd(userKey, sessionId).expire(userKey, 604800).exec();
    } catch (err) {
      console.error("[Redis/IORedis] Failed to set session:", err);
      throw err;
    }
  }
  async touch(sessionId, ttlSeconds, lastActivityAt) {
    try {
      const key = `${SESSION_PREFIX}${sessionId}`;
      const session = await this.get(sessionId);
      if (!session) return false;
      session.lastActivityAt = lastActivityAt;
      await this.client.set(key, JSON.stringify(session), "EX", ttlSeconds);
      return true;
    } catch (err) {
      console.error("[Redis/IORedis] Failed to touch session:", err);
      return false;
    }
  }
  async delete(sessionId) {
    try {
      const session = await this.get(sessionId);
      const key = `${SESSION_PREFIX}${sessionId}`;
      if (session) {
        const userKey = `${USER_INDEX_PREFIX}${session.userId}`;
        await this.client.multi().del(key).srem(userKey, sessionId).exec();
      } else {
        await this.client.del(key);
      }
    } catch (err) {
      console.error("[Redis/IORedis] Failed to delete session:", err);
    }
  }
  async getUserSessions(userId) {
    try {
      const userKey = `${USER_INDEX_PREFIX}${userId}`;
      return await this.client.smembers(userKey);
    } catch (err) {
      console.error("[Redis/IORedis] Failed to get user sessions:", err);
      return [];
    }
  }
  async revokeUserSessions(userId) {
    try {
      const userKey = `${USER_INDEX_PREFIX}${userId}`;
      const sessions = await this.getUserSessions(userId);
      if (sessions.length > 0) {
        const multi = this.client.multi();
        for (const sid of sessions) {
          multi.del(`${SESSION_PREFIX}${sid}`);
        }
        multi.del(userKey);
        await multi.exec();
      }
    } catch (err) {
      console.error("[Redis/IORedis] Failed to revoke user sessions:", err);
    }
  }
  async isHealthy() {
    try {
      const pong = await this.client.ping();
      return pong === "PONG";
    } catch {
      return false;
    }
  }
};
var activeStore = null;
function getSessionStore() {
  if (activeStore) return activeStore;
  const upstashUrl = process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL;
  const upstashToken = process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN;
  if (upstashUrl && upstashToken) {
    activeStore = new UpstashSessionStore(upstashUrl, upstashToken);
    return activeStore;
  }
  const redisUrl = process.env.REDIS_URL;
  if (redisUrl) {
    activeStore = new IoRedisSessionStore(redisUrl);
    return activeStore;
  }
  const redisHost = process.env.REDIS_HOST;
  if (redisHost) {
    activeStore = new IoRedisSessionStore({
      host: redisHost,
      port: Number(process.env.REDIS_PORT || 6379),
      password: process.env.REDIS_PASSWORD || void 0,
      tls: process.env.REDIS_TLS === "true" ? {} : void 0
    });
    return activeStore;
  }
  if (process.env.NODE_ENV === "production" && process.env.VERCEL === "1") {
    console.warn(
      "[ApnaCare Security Alert] No REDIS_URL or UPSTASH_REDIS_REST_URL configured in production! Falling back to ephemeral in-memory sessions."
    );
  }
  activeStore = new MemorySessionStore();
  return activeStore;
}

// src/server/session/cookies.ts
var DEFAULT_SESSION_CONFIG = {
  cookieName: "apnacare_session",
  idleTimeoutSeconds: 7200,
  // 2 hours idle
  maxLifetimeSeconds: 604800,
  // 7 days max lifetime
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax",
  path: "/"
};
function getEffectiveCookieName(isSecure = DEFAULT_SESSION_CONFIG.secure) {
  if (isSecure && process.env.NODE_ENV === "production") {
    return `__Host-${DEFAULT_SESSION_CONFIG.cookieName}`;
  }
  return DEFAULT_SESSION_CONFIG.cookieName;
}
function createSessionCookieHeader(sessionId, maxAgeSeconds = DEFAULT_SESSION_CONFIG.idleTimeoutSeconds, isSecure = DEFAULT_SESSION_CONFIG.secure) {
  const name = getEffectiveCookieName(isSecure);
  const parts = [
    `${name}=${sessionId}`,
    `Path=${DEFAULT_SESSION_CONFIG.path}`,
    `Max-Age=${maxAgeSeconds}`,
    `SameSite=${DEFAULT_SESSION_CONFIG.sameSite.charAt(0).toUpperCase() + DEFAULT_SESSION_CONFIG.sameSite.slice(1)}`,
    "HttpOnly"
  ];
  if (isSecure) {
    parts.push("Secure");
  }
  return parts.join("; ");
}

// src/server/session/session-manager.ts
function generateSessionId() {
  return randomBytes(32).toString("base64url");
}
function hashValue(val) {
  if (!val) return void 0;
  return createHash("sha256").update(val).digest("hex").slice(0, 16);
}
async function createSession(userId, role, metadata, reqContext) {
  const store = getSessionStore();
  const sessionId = generateSessionId();
  const now = Date.now();
  const session = {
    sessionId,
    userId,
    role,
    metadata,
    createdAt: now,
    lastActivityAt: now,
    expiresAt: now + DEFAULT_SESSION_CONFIG.maxLifetimeSeconds * 1e3,
    ipHash: hashValue(reqContext?.ip),
    userAgentHash: hashValue(reqContext?.userAgent)
  };
  const ttl = DEFAULT_SESSION_CONFIG.idleTimeoutSeconds;
  await store.set(sessionId, session, ttl);
  return session;
}

// src/server/session/routes/login.ts
var dynamic = "force-dynamic";
function reply(res, statusCode, data, headers = {}) {
  const payload = JSON.stringify(data);
  if (res && typeof res.status === "function" && typeof res.json === "function") {
    for (const [k, v] of Object.entries(headers)) {
      res.setHeader(k, v);
    }
    return res.status(statusCode).json(data);
  }
  if (res && typeof res.setHeader === "function" && typeof res.end === "function") {
    res.statusCode = statusCode;
    res.setHeader("Content-Type", "application/json");
    for (const [k, v] of Object.entries(headers)) {
      res.setHeader(k, v);
    }
    return res.end(payload);
  }
  return new Response(payload, {
    status: statusCode,
    headers: {
      "Content-Type": "application/json",
      ...headers
    }
  });
}
async function handler(req, res) {
  const method = (req.method || (req instanceof Request ? req.method : "GET")).toUpperCase();
  if (method !== "POST") {
    return reply(res, 405, { error: "Method Not Allowed" });
  }
  try {
    let body = {};
    if (req.body && typeof req.body === "object") {
      body = req.body;
    } else if (typeof req.body === "string") {
      try {
        body = JSON.parse(req.body);
      } catch {
        body = {};
      }
    } else if (typeof req.json === "function") {
      try {
        body = await req.json();
      } catch {
        body = {};
      }
    }
    const { mobile, passcode, isDemo } = body;
    const isSunitha = isDemo || mobile && mobile.replace(/\s+/g, "").includes("9840123456");
    const userId = isSunitha ? "ATT-SK-01" : `ATT-${mobile ? mobile.replace(/\D/g, "").slice(-4) : "GEN"}`;
    const attendantName = isSunitha ? "Sunitha Krishnan" : "Verified Attendant";
    const attendantCity = isSunitha ? "Chennai" : "Bengaluru";
    const attendantRole = "Senior Elderly Care Specialist";
    const session = await createSession(
      userId,
      "attendant",
      {
        name: attendantName,
        mobile: mobile || "98401 23456",
        city: attendantCity,
        roleTitle: attendantRole,
        attendantId: userId
      },
      {
        ip: req.headers && (req.headers["x-forwarded-for"] || req.headers["x-real-ip"]),
        userAgent: req.headers && (req.headers["user-agent"] || req.headers["User-Agent"])
      }
    );
    const isSecure = process.env.NODE_ENV === "production";
    const cookieHeader = createSessionCookieHeader(session.sessionId, 7200, isSecure);
    return reply(
      res,
      200,
      {
        success: true,
        authenticated: true,
        user: {
          id: session.userId,
          role: session.role,
          name: session.metadata?.name,
          city: session.metadata?.city,
          roleTitle: session.metadata?.roleTitle,
          attendantId: session.metadata?.attendantId
        }
      },
      {
        "Set-Cookie": cookieHeader
      }
    );
  } catch (error) {
    console.error("[Auth API] Login error:", error);
    return reply(res, 500, { error: "Authentication service temporarily unavailable" });
  }
}
export {
  handler as default,
  dynamic
};

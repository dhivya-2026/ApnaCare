var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJS = (cb, mod) => function __require() {
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

// node_modules/@stablelib/base64/lib/base64.js
var require_base64 = __commonJS({
  "node_modules/@stablelib/base64/lib/base64.js"(exports) {
    "use strict";
    var __extends = exports && exports.__extends || /* @__PURE__ */ (function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
          d2.__proto__ = b2;
        } || function(d2, b2) {
          for (var p in b2) if (b2.hasOwnProperty(p)) d2[p] = b2[p];
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    })();
    Object.defineProperty(exports, "__esModule", { value: true });
    var INVALID_BYTE = 256;
    var Coder = (
      /** @class */
      (function() {
        function Coder2(_paddingCharacter) {
          if (_paddingCharacter === void 0) {
            _paddingCharacter = "=";
          }
          this._paddingCharacter = _paddingCharacter;
        }
        Coder2.prototype.encodedLength = function(length) {
          if (!this._paddingCharacter) {
            return (length * 8 + 5) / 6 | 0;
          }
          return (length + 2) / 3 * 4 | 0;
        };
        Coder2.prototype.encode = function(data) {
          var out = "";
          var i = 0;
          for (; i < data.length - 2; i += 3) {
            var c = data[i] << 16 | data[i + 1] << 8 | data[i + 2];
            out += this._encodeByte(c >>> 3 * 6 & 63);
            out += this._encodeByte(c >>> 2 * 6 & 63);
            out += this._encodeByte(c >>> 1 * 6 & 63);
            out += this._encodeByte(c >>> 0 * 6 & 63);
          }
          var left = data.length - i;
          if (left > 0) {
            var c = data[i] << 16 | (left === 2 ? data[i + 1] << 8 : 0);
            out += this._encodeByte(c >>> 3 * 6 & 63);
            out += this._encodeByte(c >>> 2 * 6 & 63);
            if (left === 2) {
              out += this._encodeByte(c >>> 1 * 6 & 63);
            } else {
              out += this._paddingCharacter || "";
            }
            out += this._paddingCharacter || "";
          }
          return out;
        };
        Coder2.prototype.maxDecodedLength = function(length) {
          if (!this._paddingCharacter) {
            return (length * 6 + 7) / 8 | 0;
          }
          return length / 4 * 3 | 0;
        };
        Coder2.prototype.decodedLength = function(s) {
          return this.maxDecodedLength(s.length - this._getPaddingLength(s));
        };
        Coder2.prototype.decode = function(s) {
          if (s.length === 0) {
            return new Uint8Array(0);
          }
          var paddingLength = this._getPaddingLength(s);
          var length = s.length - paddingLength;
          var out = new Uint8Array(this.maxDecodedLength(length));
          var op = 0;
          var i = 0;
          var haveBad = 0;
          var v0 = 0, v1 = 0, v2 = 0, v3 = 0;
          for (; i < length - 4; i += 4) {
            v0 = this._decodeChar(s.charCodeAt(i + 0));
            v1 = this._decodeChar(s.charCodeAt(i + 1));
            v2 = this._decodeChar(s.charCodeAt(i + 2));
            v3 = this._decodeChar(s.charCodeAt(i + 3));
            out[op++] = v0 << 2 | v1 >>> 4;
            out[op++] = v1 << 4 | v2 >>> 2;
            out[op++] = v2 << 6 | v3;
            haveBad |= v0 & INVALID_BYTE;
            haveBad |= v1 & INVALID_BYTE;
            haveBad |= v2 & INVALID_BYTE;
            haveBad |= v3 & INVALID_BYTE;
          }
          if (i < length - 1) {
            v0 = this._decodeChar(s.charCodeAt(i));
            v1 = this._decodeChar(s.charCodeAt(i + 1));
            out[op++] = v0 << 2 | v1 >>> 4;
            haveBad |= v0 & INVALID_BYTE;
            haveBad |= v1 & INVALID_BYTE;
          }
          if (i < length - 2) {
            v2 = this._decodeChar(s.charCodeAt(i + 2));
            out[op++] = v1 << 4 | v2 >>> 2;
            haveBad |= v2 & INVALID_BYTE;
          }
          if (i < length - 3) {
            v3 = this._decodeChar(s.charCodeAt(i + 3));
            out[op++] = v2 << 6 | v3;
            haveBad |= v3 & INVALID_BYTE;
          }
          if (haveBad !== 0) {
            throw new Error("Base64Coder: incorrect characters for decoding");
          }
          return out;
        };
        Coder2.prototype._encodeByte = function(b) {
          var result = b;
          result += 65;
          result += 25 - b >>> 8 & 0 - 65 - 26 + 97;
          result += 51 - b >>> 8 & 26 - 97 - 52 + 48;
          result += 61 - b >>> 8 & 52 - 48 - 62 + 43;
          result += 62 - b >>> 8 & 62 - 43 - 63 + 47;
          return String.fromCharCode(result);
        };
        Coder2.prototype._decodeChar = function(c) {
          var result = INVALID_BYTE;
          result += (42 - c & c - 44) >>> 8 & -INVALID_BYTE + c - 43 + 62;
          result += (46 - c & c - 48) >>> 8 & -INVALID_BYTE + c - 47 + 63;
          result += (47 - c & c - 58) >>> 8 & -INVALID_BYTE + c - 48 + 52;
          result += (64 - c & c - 91) >>> 8 & -INVALID_BYTE + c - 65 + 0;
          result += (96 - c & c - 123) >>> 8 & -INVALID_BYTE + c - 97 + 26;
          return result;
        };
        Coder2.prototype._getPaddingLength = function(s) {
          var paddingLength = 0;
          if (this._paddingCharacter) {
            for (var i = s.length - 1; i >= 0; i--) {
              if (s[i] !== this._paddingCharacter) {
                break;
              }
              paddingLength++;
            }
            if (s.length < 4 || paddingLength > 2) {
              throw new Error("Base64Coder: incorrect padding");
            }
          }
          return paddingLength;
        };
        return Coder2;
      })()
    );
    exports.Coder = Coder;
    var stdCoder = new Coder();
    function encode4(data) {
      return stdCoder.encode(data);
    }
    exports.encode = encode4;
    function decode2(s) {
      return stdCoder.decode(s);
    }
    exports.decode = decode2;
    var URLSafeCoder = (
      /** @class */
      (function(_super) {
        __extends(URLSafeCoder2, _super);
        function URLSafeCoder2() {
          return _super !== null && _super.apply(this, arguments) || this;
        }
        URLSafeCoder2.prototype._encodeByte = function(b) {
          var result = b;
          result += 65;
          result += 25 - b >>> 8 & 0 - 65 - 26 + 97;
          result += 51 - b >>> 8 & 26 - 97 - 52 + 48;
          result += 61 - b >>> 8 & 52 - 48 - 62 + 45;
          result += 62 - b >>> 8 & 62 - 45 - 63 + 95;
          return String.fromCharCode(result);
        };
        URLSafeCoder2.prototype._decodeChar = function(c) {
          var result = INVALID_BYTE;
          result += (44 - c & c - 46) >>> 8 & -INVALID_BYTE + c - 45 + 62;
          result += (94 - c & c - 96) >>> 8 & -INVALID_BYTE + c - 95 + 63;
          result += (47 - c & c - 58) >>> 8 & -INVALID_BYTE + c - 48 + 52;
          result += (64 - c & c - 91) >>> 8 & -INVALID_BYTE + c - 65 + 0;
          result += (96 - c & c - 123) >>> 8 & -INVALID_BYTE + c - 97 + 26;
          return result;
        };
        return URLSafeCoder2;
      })(Coder)
    );
    exports.URLSafeCoder = URLSafeCoder;
    var urlSafeCoder = new URLSafeCoder();
    function encodeURLSafe(data) {
      return urlSafeCoder.encode(data);
    }
    exports.encodeURLSafe = encodeURLSafe;
    function decodeURLSafe(s) {
      return urlSafeCoder.decode(s);
    }
    exports.decodeURLSafe = decodeURLSafe;
    exports.encodedLength = function(length) {
      return stdCoder.encodedLength(length);
    };
    exports.maxDecodedLength = function(length) {
      return stdCoder.maxDecodedLength(length);
    };
    exports.decodedLength = function(s) {
      return stdCoder.decodedLength(s);
    };
  }
});

// node_modules/fast-sha256/sha256.js
var require_sha256 = __commonJS({
  "node_modules/fast-sha256/sha256.js"(exports, module) {
    (function(root, factory) {
      var exports2 = {};
      factory(exports2);
      var sha256 = exports2["default"];
      for (var k in exports2) {
        sha256[k] = exports2[k];
      }
      if (typeof module === "object" && typeof module.exports === "object") {
        module.exports = sha256;
      } else if (typeof define === "function" && define.amd) {
        define(function() {
          return sha256;
        });
      } else {
        root.sha256 = sha256;
      }
    })(exports, function(exports2) {
      "use strict";
      exports2.__esModule = true;
      exports2.digestLength = 32;
      exports2.blockSize = 64;
      var K = new Uint32Array([
        1116352408,
        1899447441,
        3049323471,
        3921009573,
        961987163,
        1508970993,
        2453635748,
        2870763221,
        3624381080,
        310598401,
        607225278,
        1426881987,
        1925078388,
        2162078206,
        2614888103,
        3248222580,
        3835390401,
        4022224774,
        264347078,
        604807628,
        770255983,
        1249150122,
        1555081692,
        1996064986,
        2554220882,
        2821834349,
        2952996808,
        3210313671,
        3336571891,
        3584528711,
        113926993,
        338241895,
        666307205,
        773529912,
        1294757372,
        1396182291,
        1695183700,
        1986661051,
        2177026350,
        2456956037,
        2730485921,
        2820302411,
        3259730800,
        3345764771,
        3516065817,
        3600352804,
        4094571909,
        275423344,
        430227734,
        506948616,
        659060556,
        883997877,
        958139571,
        1322822218,
        1537002063,
        1747873779,
        1955562222,
        2024104815,
        2227730452,
        2361852424,
        2428436474,
        2756734187,
        3204031479,
        3329325298
      ]);
      function hashBlocks(w, v, p, pos, len) {
        var a, b, c, d, e, f, g, h, u, i, j, t1, t2;
        while (len >= 64) {
          a = v[0];
          b = v[1];
          c = v[2];
          d = v[3];
          e = v[4];
          f = v[5];
          g = v[6];
          h = v[7];
          for (i = 0; i < 16; i++) {
            j = pos + i * 4;
            w[i] = (p[j] & 255) << 24 | (p[j + 1] & 255) << 16 | (p[j + 2] & 255) << 8 | p[j + 3] & 255;
          }
          for (i = 16; i < 64; i++) {
            u = w[i - 2];
            t1 = (u >>> 17 | u << 32 - 17) ^ (u >>> 19 | u << 32 - 19) ^ u >>> 10;
            u = w[i - 15];
            t2 = (u >>> 7 | u << 32 - 7) ^ (u >>> 18 | u << 32 - 18) ^ u >>> 3;
            w[i] = (t1 + w[i - 7] | 0) + (t2 + w[i - 16] | 0);
          }
          for (i = 0; i < 64; i++) {
            t1 = (((e >>> 6 | e << 32 - 6) ^ (e >>> 11 | e << 32 - 11) ^ (e >>> 25 | e << 32 - 25)) + (e & f ^ ~e & g) | 0) + (h + (K[i] + w[i] | 0) | 0) | 0;
            t2 = ((a >>> 2 | a << 32 - 2) ^ (a >>> 13 | a << 32 - 13) ^ (a >>> 22 | a << 32 - 22)) + (a & b ^ a & c ^ b & c) | 0;
            h = g;
            g = f;
            f = e;
            e = d + t1 | 0;
            d = c;
            c = b;
            b = a;
            a = t1 + t2 | 0;
          }
          v[0] += a;
          v[1] += b;
          v[2] += c;
          v[3] += d;
          v[4] += e;
          v[5] += f;
          v[6] += g;
          v[7] += h;
          pos += 64;
          len -= 64;
        }
        return pos;
      }
      var Hash = (
        /** @class */
        (function() {
          function Hash2() {
            this.digestLength = exports2.digestLength;
            this.blockSize = exports2.blockSize;
            this.state = new Int32Array(8);
            this.temp = new Int32Array(64);
            this.buffer = new Uint8Array(128);
            this.bufferLength = 0;
            this.bytesHashed = 0;
            this.finished = false;
            this.reset();
          }
          Hash2.prototype.reset = function() {
            this.state[0] = 1779033703;
            this.state[1] = 3144134277;
            this.state[2] = 1013904242;
            this.state[3] = 2773480762;
            this.state[4] = 1359893119;
            this.state[5] = 2600822924;
            this.state[6] = 528734635;
            this.state[7] = 1541459225;
            this.bufferLength = 0;
            this.bytesHashed = 0;
            this.finished = false;
            return this;
          };
          Hash2.prototype.clean = function() {
            for (var i = 0; i < this.buffer.length; i++) {
              this.buffer[i] = 0;
            }
            for (var i = 0; i < this.temp.length; i++) {
              this.temp[i] = 0;
            }
            this.reset();
          };
          Hash2.prototype.update = function(data, dataLength) {
            if (dataLength === void 0) {
              dataLength = data.length;
            }
            if (this.finished) {
              throw new Error("SHA256: can't update because hash was finished.");
            }
            var dataPos = 0;
            this.bytesHashed += dataLength;
            if (this.bufferLength > 0) {
              while (this.bufferLength < 64 && dataLength > 0) {
                this.buffer[this.bufferLength++] = data[dataPos++];
                dataLength--;
              }
              if (this.bufferLength === 64) {
                hashBlocks(this.temp, this.state, this.buffer, 0, 64);
                this.bufferLength = 0;
              }
            }
            if (dataLength >= 64) {
              dataPos = hashBlocks(this.temp, this.state, data, dataPos, dataLength);
              dataLength %= 64;
            }
            while (dataLength > 0) {
              this.buffer[this.bufferLength++] = data[dataPos++];
              dataLength--;
            }
            return this;
          };
          Hash2.prototype.finish = function(out) {
            if (!this.finished) {
              var bytesHashed = this.bytesHashed;
              var left = this.bufferLength;
              var bitLenHi = bytesHashed / 536870912 | 0;
              var bitLenLo = bytesHashed << 3;
              var padLength = bytesHashed % 64 < 56 ? 64 : 128;
              this.buffer[left] = 128;
              for (var i = left + 1; i < padLength - 8; i++) {
                this.buffer[i] = 0;
              }
              this.buffer[padLength - 8] = bitLenHi >>> 24 & 255;
              this.buffer[padLength - 7] = bitLenHi >>> 16 & 255;
              this.buffer[padLength - 6] = bitLenHi >>> 8 & 255;
              this.buffer[padLength - 5] = bitLenHi >>> 0 & 255;
              this.buffer[padLength - 4] = bitLenLo >>> 24 & 255;
              this.buffer[padLength - 3] = bitLenLo >>> 16 & 255;
              this.buffer[padLength - 2] = bitLenLo >>> 8 & 255;
              this.buffer[padLength - 1] = bitLenLo >>> 0 & 255;
              hashBlocks(this.temp, this.state, this.buffer, 0, padLength);
              this.finished = true;
            }
            for (var i = 0; i < 8; i++) {
              out[i * 4 + 0] = this.state[i] >>> 24 & 255;
              out[i * 4 + 1] = this.state[i] >>> 16 & 255;
              out[i * 4 + 2] = this.state[i] >>> 8 & 255;
              out[i * 4 + 3] = this.state[i] >>> 0 & 255;
            }
            return this;
          };
          Hash2.prototype.digest = function() {
            var out = new Uint8Array(this.digestLength);
            this.finish(out);
            return out;
          };
          Hash2.prototype._saveState = function(out) {
            for (var i = 0; i < this.state.length; i++) {
              out[i] = this.state[i];
            }
          };
          Hash2.prototype._restoreState = function(from, bytesHashed) {
            for (var i = 0; i < this.state.length; i++) {
              this.state[i] = from[i];
            }
            this.bytesHashed = bytesHashed;
            this.finished = false;
            this.bufferLength = 0;
          };
          return Hash2;
        })()
      );
      exports2.Hash = Hash;
      var HMAC = (
        /** @class */
        (function() {
          function HMAC2(key) {
            this.inner = new Hash();
            this.outer = new Hash();
            this.blockSize = this.inner.blockSize;
            this.digestLength = this.inner.digestLength;
            var pad = new Uint8Array(this.blockSize);
            if (key.length > this.blockSize) {
              new Hash().update(key).finish(pad).clean();
            } else {
              for (var i = 0; i < key.length; i++) {
                pad[i] = key[i];
              }
            }
            for (var i = 0; i < pad.length; i++) {
              pad[i] ^= 54;
            }
            this.inner.update(pad);
            for (var i = 0; i < pad.length; i++) {
              pad[i] ^= 54 ^ 92;
            }
            this.outer.update(pad);
            this.istate = new Uint32Array(8);
            this.ostate = new Uint32Array(8);
            this.inner._saveState(this.istate);
            this.outer._saveState(this.ostate);
            for (var i = 0; i < pad.length; i++) {
              pad[i] = 0;
            }
          }
          HMAC2.prototype.reset = function() {
            this.inner._restoreState(this.istate, this.inner.blockSize);
            this.outer._restoreState(this.ostate, this.outer.blockSize);
            return this;
          };
          HMAC2.prototype.clean = function() {
            for (var i = 0; i < this.istate.length; i++) {
              this.ostate[i] = this.istate[i] = 0;
            }
            this.inner.clean();
            this.outer.clean();
          };
          HMAC2.prototype.update = function(data) {
            this.inner.update(data);
            return this;
          };
          HMAC2.prototype.finish = function(out) {
            if (this.outer.finished) {
              this.outer.finish(out);
            } else {
              this.inner.finish(out);
              this.outer.update(out, this.digestLength).finish(out);
            }
            return this;
          };
          HMAC2.prototype.digest = function() {
            var out = new Uint8Array(this.digestLength);
            this.finish(out);
            return out;
          };
          return HMAC2;
        })()
      );
      exports2.HMAC = HMAC;
      function hash(data) {
        var h = new Hash().update(data);
        var digest = h.digest();
        h.clean();
        return digest;
      }
      exports2.hash = hash;
      exports2["default"] = hash;
      function hmac(key, data) {
        var h = new HMAC(key).update(data);
        var digest = h.digest();
        h.clean();
        return digest;
      }
      exports2.hmac = hmac;
      function fillBuffer(buffer, hmac2, info, counter) {
        var num = counter[0];
        if (num === 0) {
          throw new Error("hkdf: cannot expand more");
        }
        hmac2.reset();
        if (num > 1) {
          hmac2.update(buffer);
        }
        if (info) {
          hmac2.update(info);
        }
        hmac2.update(counter);
        hmac2.finish(buffer);
        counter[0]++;
      }
      var hkdfSalt = new Uint8Array(exports2.digestLength);
      function hkdf(key, salt, info, length) {
        if (salt === void 0) {
          salt = hkdfSalt;
        }
        if (length === void 0) {
          length = 32;
        }
        var counter = new Uint8Array([1]);
        var okm = hmac(salt, key);
        var hmac_ = new HMAC(okm);
        var buffer = new Uint8Array(hmac_.digestLength);
        var bufpos = buffer.length;
        var out = new Uint8Array(length);
        for (var i = 0; i < length; i++) {
          if (bufpos === buffer.length) {
            fillBuffer(buffer, hmac_, info, counter);
            bufpos = 0;
          }
          out[i] = buffer[bufpos++];
        }
        hmac_.clean();
        buffer.fill(0);
        counter.fill(0);
        return out;
      }
      exports2.hkdf = hkdf;
      function pbkdf2(password, salt, iterations, dkLen) {
        var prf = new HMAC(password);
        var len = prf.digestLength;
        var ctr = new Uint8Array(4);
        var t = new Uint8Array(len);
        var u = new Uint8Array(len);
        var dk = new Uint8Array(dkLen);
        for (var i = 0; i * len < dkLen; i++) {
          var c = i + 1;
          ctr[0] = c >>> 24 & 255;
          ctr[1] = c >>> 16 & 255;
          ctr[2] = c >>> 8 & 255;
          ctr[3] = c >>> 0 & 255;
          prf.reset();
          prf.update(salt);
          prf.update(ctr);
          prf.finish(u);
          for (var j = 0; j < len; j++) {
            t[j] = u[j];
          }
          for (var j = 2; j <= iterations; j++) {
            prf.reset();
            prf.update(u).finish(u);
            for (var k = 0; k < len; k++) {
              t[k] ^= u[k];
            }
          }
          for (var j = 0; j < len && i * len + j < dkLen; j++) {
            dk[i * len + j] = t[j];
          }
        }
        for (var i = 0; i < len; i++) {
          t[i] = u[i] = 0;
        }
        for (var i = 0; i < 4; i++) {
          ctr[i] = 0;
        }
        prf.clean();
        return dk;
      }
      exports2.pbkdf2 = pbkdf2;
    });
  }
});

// node_modules/standardwebhooks/dist/timing_safe_equal.js
var require_timing_safe_equal = __commonJS({
  "node_modules/standardwebhooks/dist/timing_safe_equal.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.timingSafeEqual = timingSafeEqual;
    function assert(expr, msg = "") {
      if (!expr) {
        throw new Error(msg);
      }
    }
    function timingSafeEqual(a, b) {
      if (a.byteLength !== b.byteLength) {
        return false;
      }
      if (!(a instanceof DataView)) {
        a = new DataView(ArrayBuffer.isView(a) ? a.buffer : a);
      }
      if (!(b instanceof DataView)) {
        b = new DataView(ArrayBuffer.isView(b) ? b.buffer : b);
      }
      assert(a instanceof DataView);
      assert(b instanceof DataView);
      const length = a.byteLength;
      let out = 0;
      let i = -1;
      while (++i < length) {
        out |= a.getUint8(i) ^ b.getUint8(i);
      }
      return out === 0;
    }
  }
});

// node_modules/standardwebhooks/dist/index.js
var require_dist = __commonJS({
  "node_modules/standardwebhooks/dist/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Webhook = exports.WebhookVerificationError = void 0;
    var base64 = require_base64();
    var sha256 = require_sha256();
    var timing_safe_equal_1 = require_timing_safe_equal();
    var WEBHOOK_TOLERANCE_IN_SECONDS = 5 * 60;
    var ExtendableError = class _ExtendableError extends Error {
      constructor(message) {
        super(message);
        Object.setPrototypeOf(this, _ExtendableError.prototype);
        this.name = "ExtendableError";
        this.stack = new Error(message).stack;
      }
    };
    var WebhookVerificationError = class _WebhookVerificationError extends ExtendableError {
      constructor(message) {
        super(message);
        Object.setPrototypeOf(this, _WebhookVerificationError.prototype);
        this.name = "WebhookVerificationError";
      }
    };
    exports.WebhookVerificationError = WebhookVerificationError;
    var Webhook2 = class _Webhook {
      constructor(secret, options) {
        if ((options === null || options === void 0 ? void 0 : options.format) === "raw") {
          if (secret instanceof Uint8Array) {
            this.key = secret;
          } else {
            this.key = Uint8Array.from(secret, (c) => c.charCodeAt(0));
          }
        } else {
          if (typeof secret !== "string") {
            throw new Error("Expected secret to be of type string");
          }
          if (secret.startsWith(_Webhook.prefix)) {
            secret = secret.substring(_Webhook.prefix.length);
          }
          this.key = base64.decode(secret);
        }
        if (this.key.length === 0) {
          throw new Error("Secret can't be empty.");
        }
      }
      verify(payload, headers, options) {
        var _a;
        const jsonParse = (_a = options === null || options === void 0 ? void 0 : options.jsonParse) !== null && _a !== void 0 ? _a : true;
        const normalizedHeaders = {};
        for (const key of Object.keys(headers)) {
          normalizedHeaders[key.toLowerCase()] = headers[key];
        }
        const msgId = normalizedHeaders["webhook-id"];
        const msgSignature = normalizedHeaders["webhook-signature"];
        const msgTimestamp = normalizedHeaders["webhook-timestamp"];
        if (!msgSignature || !msgId || !msgTimestamp) {
          throw new WebhookVerificationError("Missing required headers");
        }
        const timestamp = this.verifyTimestamp(msgTimestamp);
        const computedSignature = this.sign(msgId, timestamp, payload);
        const expectedSignature = computedSignature.split(",")[1];
        const passedSignatures = msgSignature.split(" ");
        const encoder = new globalThis.TextEncoder();
        for (const versionedSignature of passedSignatures) {
          const [version3, signature] = versionedSignature.split(",");
          if (version3 !== "v1") {
            continue;
          }
          if ((0, timing_safe_equal_1.timingSafeEqual)(encoder.encode(signature), encoder.encode(expectedSignature))) {
            const payloadString = payload.toString();
            if (payloadString === "") {
              return void 0;
            }
            if (jsonParse) {
              return JSON.parse(payloadString);
            } else {
              return void 0;
            }
          }
        }
        throw new WebhookVerificationError("No matching signature found");
      }
      sign(msgId, timestamp, payload) {
        if (typeof payload === "string") {
        } else if (payload.constructor.name === "Buffer") {
          payload = payload.toString();
        } else {
          throw new Error("Expected payload to be of type string or Buffer.");
        }
        const encoder = new TextEncoder();
        const timestampNumber = Math.floor(timestamp.getTime() / 1e3);
        const toSign = encoder.encode(`${msgId}.${timestampNumber}.${payload}`);
        const expectedSignature = base64.encode(sha256.hmac(this.key, toSign));
        return `v1,${expectedSignature}`;
      }
      verifyTimestamp(timestampHeader) {
        const now = Math.floor(Date.now() / 1e3);
        const timestamp = parseInt(timestampHeader, 10);
        if (Number.isNaN(timestamp)) {
          throw new WebhookVerificationError("Invalid Signature Headers");
        }
        if (now - timestamp > WEBHOOK_TOLERANCE_IN_SECONDS) {
          throw new WebhookVerificationError("Message timestamp too old");
        }
        if (timestamp > now + WEBHOOK_TOLERANCE_IN_SECONDS) {
          throw new WebhookVerificationError("Message timestamp too new");
        }
        return new Date(timestamp * 1e3);
      }
    };
    exports.Webhook = Webhook2;
    Webhook2.prefix = "whsec_";
  }
});

// src/server/reports/config.ts
function getServerReportConfig() {
  const env = process.env;
  const smtpHost = env.SMTP_HOST || "smtp.gmail.com";
  const smtpPort = parseInt(env.SMTP_PORT || "465", 10);
  const smtpSecure = env.SMTP_SECURE !== void 0 ? env.SMTP_SECURE === "true" : smtpPort === 465;
  const smtpUser = env.SMTP_USER || "ayvihd.06@gmail.com";
  const smtpPass = env.SMTP_PASS || "";
  const resendApiKey = env.RESEND_API_KEY || "";
  const emailProvider = env.EMAIL_PROVIDER === "resend" ? "resend" : "nodemailer";
  const fromEmail = env.REPORT_FROM_EMAIL || (smtpUser ? `ApnaCare Reports <${smtpUser}>` : "ApnaCare Reports <ayvihd.06@gmail.com>");
  const rawToEmails = env.REPORT_TO_EMAILS || "divabhrati.ramco@gmail.com";
  const toEmails = rawToEmails.split(",").map((e) => e.trim()).filter((e) => isValidEmail(e));
  if (toEmails.length === 0) {
    toEmails.push("divabhrati.ramco@gmail.com");
  }
  const cronSecret = env.CRON_SECRET || "";
  const timezone = env.REPORT_TIMEZONE || "Asia/Kolkata";
  const googleAppsScriptUrl = env.GOOGLE_APPS_SCRIPT_URL || env.VITE_GOOGLE_APPS_SCRIPT_URL || "https://script.google.com/macros/s/AKfycbx6gwpPkEgsO9y0lksDo2MS4LFXna4dnv20XkC4_KJd3voXqxTCyBuwPg4g_BM896YV/exec";
  const isDevelopment = env.NODE_ENV !== "production" && env.VERCEL_ENV !== "production";
  return {
    emailProvider,
    smtpHost,
    smtpPort,
    smtpSecure,
    smtpUser,
    smtpPass,
    resendApiKey,
    fromEmail,
    toEmails,
    cronSecret,
    timezone,
    googleAppsScriptUrl,
    isDevelopment
  };
}
function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// src/server/reports/date-utils.ts
function getDatePartsInTimezone(date, timezone) {
  const formatter = new Intl.DateTimeFormat("en-US", {
    timeZone: timezone,
    year: "numeric",
    month: "numeric",
    day: "numeric",
    weekday: "short"
  });
  const parts = {};
  for (const part of formatter.formatToParts(date)) {
    parts[part.type] = part.value;
  }
  const weekdayMap = {
    Sun: 0,
    Mon: 1,
    Tue: 2,
    Wed: 3,
    Thu: 4,
    Fri: 5,
    Sat: 6
  };
  const weekday = parts.weekday || "Sun";
  return {
    year: parseInt(parts.year, 10),
    month: parseInt(parts.month, 10),
    day: parseInt(parts.day, 10),
    weekday,
    weekdayIndex: weekdayMap[weekday] ?? 0
  };
}
function formatTimestampInTimezone(date, timezone) {
  return new Intl.DateTimeFormat("en-US", {
    timeZone: timezone,
    dateStyle: "medium",
    timeStyle: "short"
  }).format(date) + ` (${timezone.includes("Kolkata") ? "IST" : timezone})`;
}
function calculateReportPeriod(type, timezone = "Asia/Kolkata", referenceDate = /* @__PURE__ */ new Date(), overridePeriodKey) {
  const now = referenceDate;
  const current = getDatePartsInTimezone(now, timezone);
  const generatedAt = formatTimestampInTimezone(now, timezone);
  const generatedAtIso = now.toISOString();
  if (type === "daily") {
    if (overridePeriodKey && /^\d{4}-\d{2}-\d{2}$/.test(overridePeriodKey)) {
      const [yStr, mStr, dStr] = overridePeriodKey.split("-");
      const y = parseInt(yStr, 10);
      const m = parseInt(mStr, 10);
      const d = parseInt(dStr, 10);
      const label3 = formatDailyLabel(y, m, d);
      return {
        type: "daily",
        key: overridePeriodKey,
        label: label3,
        startDate: `${overridePeriodKey}T00:00:00`,
        endDate: `${overridePeriodKey}T23:59:59`,
        timezone,
        generatedAt,
        generatedAtIso
      };
    }
    const prevDayUtc = new Date(Date.UTC(current.year, current.month - 1, current.day - 1));
    const prevParts = {
      year: prevDayUtc.getUTCFullYear(),
      month: prevDayUtc.getUTCMonth() + 1,
      day: prevDayUtc.getUTCDate()
    };
    const key2 = `${prevParts.year}-${pad2(prevParts.month)}-${pad2(prevParts.day)}`;
    const label2 = formatDailyLabel(prevParts.year, prevParts.month, prevParts.day);
    return {
      type: "daily",
      key: key2,
      label: label2,
      startDate: `${key2}T00:00:00`,
      endDate: `${key2}T23:59:59`,
      timezone,
      generatedAt,
      generatedAtIso
    };
  }
  if (type === "weekly") {
    const dayOfWeek = current.weekdayIndex;
    const daysSinceLastSunday = dayOfWeek === 0 ? 7 : dayOfWeek;
    const endSundayUtc = new Date(Date.UTC(current.year, current.month - 1, current.day - daysSinceLastSunday));
    const startMondayUtc = new Date(Date.UTC(endSundayUtc.getUTCFullYear(), endSundayUtc.getUTCMonth(), endSundayUtc.getUTCDate() - 6));
    const startParts = {
      year: startMondayUtc.getUTCFullYear(),
      month: startMondayUtc.getUTCMonth() + 1,
      day: startMondayUtc.getUTCDate()
    };
    const endParts = {
      year: endSundayUtc.getUTCFullYear(),
      month: endSundayUtc.getUTCMonth() + 1,
      day: endSundayUtc.getUTCDate()
    };
    const startIso = `${startParts.year}-${pad2(startParts.month)}-${pad2(startParts.day)}`;
    const endIso = `${endParts.year}-${pad2(endParts.month)}-${pad2(endParts.day)}`;
    const weekNumber = getIsoWeekNumber(startMondayUtc);
    const key2 = `${startParts.year}-W${pad2(weekNumber)}`;
    const label2 = `${formatMonthShort(startParts.month)} ${startParts.day} \u2013 ${formatMonthShort(endParts.month)} ${endParts.day}, ${endParts.year} (Week ${weekNumber})`;
    return {
      type: "weekly",
      key: key2,
      label: label2,
      startDate: `${startIso}T00:00:00`,
      endDate: `${endIso}T23:59:59`,
      timezone,
      generatedAt,
      generatedAtIso
    };
  }
  const prevMonthDate = new Date(Date.UTC(current.year, current.month - 2, 1));
  const prevYear = prevMonthDate.getUTCFullYear();
  const prevMonth = prevMonthDate.getUTCMonth() + 1;
  const lastDay = new Date(Date.UTC(prevYear, prevMonth, 0)).getUTCDate();
  const key = `${prevYear}-${pad2(prevMonth)}`;
  const label = `${formatMonthFull(prevMonth)} ${prevYear} (1st \u2013 ${lastDay}th)`;
  const startDate = `${key}-01T00:00:00`;
  const endDate = `${key}-${pad2(lastDay)}T23:59:59`;
  return {
    type: "monthly",
    key,
    label,
    startDate,
    endDate,
    timezone,
    generatedAt,
    generatedAtIso
  };
}
function getPreviousPeriod(period) {
  if (period.type === "daily") {
    const [yStr2, mStr2, dStr] = period.key.split("-");
    const d = new Date(Date.UTC(parseInt(yStr2, 10), parseInt(mStr2, 10) - 1, parseInt(dStr, 10) - 1));
    const prevKey = `${d.getUTCFullYear()}-${pad2(d.getUTCMonth() + 1)}-${pad2(d.getUTCDate())}`;
    return calculateReportPeriod("daily", period.timezone, d, prevKey);
  }
  if (period.type === "weekly") {
    const [startIso] = period.startDate.split("T");
    const [yStr2, mStr2, dStr] = startIso.split("-");
    const priorDate = new Date(Date.UTC(parseInt(yStr2, 10), parseInt(mStr2, 10) - 1, parseInt(dStr, 10) - 7));
    return calculateReportPeriod("weekly", period.timezone, priorDate);
  }
  const [yStr, mStr] = period.key.split("-");
  const priorMonthDate = new Date(Date.UTC(parseInt(yStr, 10), parseInt(mStr, 10) - 2, 1));
  const priorYear = priorMonthDate.getUTCFullYear();
  const priorMonth = priorMonthDate.getUTCMonth() + 1;
  const priorLastDay = new Date(Date.UTC(priorYear, priorMonth, 0)).getUTCDate();
  const priorKey = `${priorYear}-${pad2(priorMonth)}`;
  return {
    type: "monthly",
    key: priorKey,
    label: `${formatMonthFull(priorMonth)} ${priorYear}`,
    startDate: `${priorKey}-01T00:00:00`,
    endDate: `${priorKey}-${pad2(priorLastDay)}T23:59:59`,
    timezone: period.timezone,
    generatedAt: period.generatedAt,
    generatedAtIso: period.generatedAtIso
  };
}
function pad2(n) {
  return n < 10 ? `0${n}` : `${n}`;
}
function formatDailyLabel(y, m, d) {
  const dateObj = new Date(Date.UTC(y, m - 1, d));
  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  return `${days[dateObj.getUTCDay()]}, ${months[m - 1]} ${d}, ${y}`;
}
function formatMonthShort(m) {
  const shortMonths = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  return shortMonths[m - 1] || "";
}
function formatMonthFull(m) {
  const fullMonths = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  return fullMonths[m - 1] || "";
}
function getIsoWeekNumber(d) {
  const date = new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate()));
  const dayNum = date.getUTCDay() || 7;
  date.setUTCDate(date.getUTCDate() + 4 - dayNum);
  const yearStart = new Date(Date.UTC(date.getUTCFullYear(), 0, 1));
  return Math.ceil(((date.getTime() - yearStart.getTime()) / 864e5 + 1) / 7);
}

// src/server/reports/data-source.ts
async function fetchReportMetrics(period, config) {
  try {
    const gasData = await fetchFromGoogleAppsScript(period, config);
    if (gasData) {
      try {
        const prevPeriod = getPreviousPeriod(period);
        const prevGasData = await fetchFromGoogleAppsScript(prevPeriod, config);
        if (prevGasData) {
          gasData.comparisons = {
            totalLeads: computeComparison(gasData.totalLeads, prevGasData.totalLeads),
            bookings: computeComparison(gasData.bookings, prevGasData.bookings),
            visitors: computeComparison(gasData.uniqueVisitors, prevGasData.uniqueVisitors),
            pageViews: computeComparison(gasData.pageViews, prevGasData.pageViews)
          };
        }
      } catch (compErr) {
        console.warn("Could not calculate comparison metrics:", compErr instanceof Error ? compErr.message : compErr);
      }
      return gasData;
    }
  } catch (gasErr) {
    console.warn("Notice: Google Apps Script data read failed, attempting Airtable fallback:", gasErr instanceof Error ? gasErr.message : gasErr);
  }
  try {
    const airtableData = await fetchFromAirtable(period);
    if (airtableData) {
      return airtableData;
    }
  } catch (airtableErr) {
    console.warn("Airtable fallback also unavailable:", airtableErr instanceof Error ? airtableErr.message : airtableErr);
  }
  return createEmptyMetrics(period.key, "empty");
}
async function fetchFromGoogleAppsScript(period, config) {
  if (!config.googleAppsScriptUrl) return null;
  const url = new URL(config.googleAppsScriptUrl);
  url.searchParams.set("action", "get_report_data");
  url.searchParams.set("type", period.type);
  url.searchParams.set("period_key", period.key);
  url.searchParams.set("start_date", period.startDate);
  url.searchParams.set("end_date", period.endDate);
  url.searchParams.set("timezone", period.timezone);
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 3500);
  try {
    const response = await fetch(url.toString(), {
      method: "GET",
      headers: { Accept: "application/json" },
      signal: controller.signal,
      redirect: "follow"
    });
    clearTimeout(timeoutId);
    if (!response.ok) {
      throw new Error(`HTTP ${response.status} from Google Apps Script`);
    }
    const text = await response.text();
    let json;
    try {
      json = JSON.parse(text);
    } catch {
      throw new Error(`Invalid JSON received from GAS: ${text.slice(0, 100)}`);
    }
    if (json && json.status === "success" && json.metrics) {
      const m = json.metrics;
      const totalLeads = (m.bookings || 0) + (m.callbacks || 0) + (m.contacts || 0) + (m.partners || 0) + (m.chatbots || 0) + (m.youtubeLeads || 0) + (m.linkedinLeads || 0) + (m.attendantApplications || 0);
      const uniqueVisitors = m.uniqueVisitors || 0;
      const convRate = uniqueVisitors > 0 ? (totalLeads / uniqueVisitors * 100).toFixed(1) + "%" : m.conversionRate || "0.0%";
      return {
        periodKey: period.key,
        totalEvents: m.totalEvents || 0,
        uniqueVisitors,
        pageViews: m.pageViews || 0,
        bookings: m.bookings || 0,
        callbacks: m.callbacks || 0,
        contacts: m.contacts || 0,
        partners: m.partners || 0,
        chatbots: m.chatbots || 0,
        youtubeLeads: m.youtubeLeads || 0,
        linkedinLeads: m.linkedinLeads || 0,
        attendantApplications: m.attendantApplications || 0,
        sosAlerts: m.sosAlerts || 0,
        totalLeads,
        conversionRate: convRate,
        avgEngagementSec: m.avgEngagementSec || 0,
        sourceBreakdown: m.sourceBreakdown || {},
        cityBreakdown: m.cityBreakdown || {},
        serviceBreakdown: m.serviceBreakdown || {},
        dailyBreakdown: m.dailyBreakdown || [],
        dataSource: "google_apps_script"
      };
    }
    return null;
  } finally {
    clearTimeout(timeoutId);
  }
}
async function fetchFromAirtable(period) {
  const apiKey = process.env.AIRTABLE_API_KEY;
  const baseId = process.env.AIRTABLE_BASE_ID || "appd5rLxicUUJpImD";
  const tableId = process.env.AIRTABLE_TABLE_ID || "tbl6DnBguLMnvIQI8";
  if (!apiKey) return null;
  const url = `https://api.airtable.com/v0/${baseId}/${tableId}?maxRecords=100`;
  const response = await fetch(url, {
    headers: { Authorization: `Bearer ${apiKey}` }
  });
  if (!response.ok) return null;
  const data = await response.json();
  if (!data.records) return null;
  const startMs = new Date(period.startDate).getTime();
  const endMs = new Date(period.endDate).getTime();
  let bookings = 0;
  let callbacks = 0;
  let contacts = 0;
  let others = 0;
  for (const rec of data.records) {
    const t = rec.createdTime ? new Date(rec.createdTime).getTime() : 0;
    if (t >= startMs && t <= endMs) {
      const type = String(rec.fields?.["Lead Type"] || rec.fields?.["Service"] || "").toLowerCase();
      if (type.includes("booking")) bookings++;
      else if (type.includes("callback")) callbacks++;
      else if (type.includes("contact")) contacts++;
      else others++;
    }
  }
  const totalLeads = bookings + callbacks + contacts + others;
  return {
    periodKey: period.key,
    totalEvents: totalLeads,
    uniqueVisitors: totalLeads,
    pageViews: totalLeads * 3,
    bookings,
    callbacks,
    contacts,
    partners: 0,
    chatbots: 0,
    youtubeLeads: 0,
    linkedinLeads: 0,
    attendantApplications: 0,
    sosAlerts: 0,
    totalLeads,
    conversionRate: "100%",
    avgEngagementSec: 120,
    dataSource: "airtable"
  };
}
function computeComparison(current, previous) {
  const changeDelta = current - previous;
  let changePercent = 0;
  if (previous > 0) {
    changePercent = Math.round((current - previous) / previous * 1e3) / 10;
  } else if (current > 0) {
    changePercent = 100;
  }
  const trend = changeDelta > 0 ? "up" : changeDelta < 0 ? "down" : "flat";
  return {
    current,
    previous,
    changePercent,
    changeDelta,
    trend
  };
}
function createEmptyMetrics(periodKey, source) {
  return {
    periodKey,
    totalEvents: 0,
    uniqueVisitors: 0,
    pageViews: 0,
    bookings: 0,
    callbacks: 0,
    contacts: 0,
    partners: 0,
    chatbots: 0,
    youtubeLeads: 0,
    linkedinLeads: 0,
    attendantApplications: 0,
    sosAlerts: 0,
    totalLeads: 0,
    conversionRate: "0.0%",
    avgEngagementSec: 0,
    dataSource: source
  };
}

// src/server/reports/email-templates.ts
function generateReportEmail(period, metrics, isTest = false) {
  const subject = generateSubject(period, isTest);
  const html = generateHtml(period, metrics, isTest);
  const text = generateText(period, metrics, isTest);
  return { subject, html, text };
}
function generateSubject(period, isTest) {
  const prefix = isTest ? "[TEST] " : "";
  if (period.type === "daily") {
    return `${prefix}ApnaCare | Daily Report | ${period.key}`;
  }
  if (period.type === "weekly") {
    return `${prefix}ApnaCare | Weekly Report | ${period.key}`;
  }
  return `${prefix}ApnaCare | Monthly Report | ${period.key}`;
}
function generateHtml(period, m, isTest) {
  const typeTitle = period.type === "daily" ? "Daily Operations Intelligence" : period.type === "weekly" ? "Weekly Executive Digest" : "Monthly Performance Review";
  const themeGradient = period.type === "daily" ? "linear-gradient(135deg, #047857 0%, #064e3b 100%)" : period.type === "weekly" ? "linear-gradient(135deg, #0284c7 0%, #0f172a 100%)" : "linear-gradient(135deg, #7c3aed 0%, #1e1b4b 100%)";
  const badgeBg = period.type === "daily" ? "rgba(16, 185, 129, 0.2)" : period.type === "weekly" ? "rgba(56, 189, 248, 0.2)" : "rgba(168, 85, 247, 0.2)";
  const leadsCompHtml = renderTrendBadge(m.comparisons?.totalLeads);
  const bookingsCompHtml = renderTrendBadge(m.comparisons?.bookings);
  const visitorsCompHtml = renderTrendBadge(m.comparisons?.visitors);
  const youtubeLeads = m.youtubeLeads ?? 0;
  const linkedinLeads = m.linkedinLeads ?? 0;
  const sosAlerts = m.sosAlerts ?? 0;
  const totalEvents = m.totalEvents ?? 0;
  const isEmpty = (m.totalLeads ?? 0) === 0 && (m.uniqueVisitors ?? 0) === 0;
  const dailyBreakdownHtml = m.dailyBreakdown && m.dailyBreakdown.length > 0 ? `
      <div style="margin-top:24px;border-top:1px solid #e2e8f0;padding-top:20px;">
        <h3 style="margin:0 0 12px 0;font-size:14px;color:#0f172a;text-transform:uppercase;letter-spacing:0.5px;">Daily Activity Breakdown</h3>
        <table width="100%" style="border-collapse:collapse;font-size:12px;text-align:left;">
          <thead>
            <tr style="background:#f1f5f9;color:#475569;">
              <th style="padding:8px 10px;border-radius:4px 0 0 4px;">Date</th>
              <th style="padding:8px 10px;">Visitors</th>
              <th style="padding:8px 10px;">Bookings</th>
              <th style="padding:8px 10px;border-radius:0 4px 4px 0;">Total Leads</th>
            </tr>
          </thead>
          <tbody>
            ${m.dailyBreakdown.map(
    (d) => `
              <tr style="border-bottom:1px solid #f1f5f9;">
                <td style="padding:8px 10px;font-weight:600;color:#0f172a;">${d.date}</td>
                <td style="padding:8px 10px;color:#64748b;">${d.visitors}</td>
                <td style="padding:8px 10px;font-weight:600;color:#047857;">${d.bookings}</td>
                <td style="padding:8px 10px;font-weight:600;color:#c2410c;">${d.leads}</td>
              </tr>
            `
  ).join("")}
          </tbody>
        </table>
      </div>` : "";
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${generateSubject(period, isTest)}</title>
</head>
<body style="margin:0;padding:24px;background-color:#f8fafc;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;color:#0f172a;">
  <div style="max-width:640px;margin:0 auto;background:#ffffff;border-radius:16px;overflow:hidden;border:1px solid #e2e8f0;box-shadow:0 4px 16px rgba(0,0,0,0.04);">
    
    <!-- Header -->
    <div style="background:${themeGradient};padding:32px 28px;color:#ffffff;">
      <div style="display:flex;align-items:center;justify-content:space-between;gap:8px;">
        <span style="background:${badgeBg};color:#ffffff;border:1px solid rgba(255,255,255,0.3);padding:4px 12px;border-radius:20px;font-size:11px;font-weight:700;letter-spacing:0.8px;text-transform:uppercase;">
          ${period.type.toUpperCase()} INTELLIGENCE
        </span>
        ${isTest ? '<span style="background:#fef08a;color:#854d0e;padding:3px 10px;border-radius:12px;font-size:11px;font-weight:bold;">MANUAL TEST EXECUTION</span>' : ""}
      </div>
      <h1 style="margin:14px 0 4px 0;font-size:24px;font-weight:800;color:#ffffff;letter-spacing:-0.5px;">${typeTitle}</h1>
      <p style="margin:0;font-size:14px;color:rgba(255,255,255,0.9);">${period.label}</p>
    </div>

    <!-- Metadata Bar -->
    <div style="background:#f1f5f9;padding:12px 28px;display:flex;justify-content:space-between;font-size:12px;color:#475569;border-bottom:1px solid #e2e8f0;">
      <span>Generated: <strong>${period.generatedAt}</strong></span>
      <span>Source: <strong>${m.dataSource === "google_apps_script" ? "Google Sheets (Live)" : m.dataSource === "airtable" ? "Airtable CRM" : "ApnaCare System"}</strong></span>
    </div>

    <!-- Empty activity alert if zero records -->
    ${isEmpty ? '<div style="background:#f8fafc;border-left:4px solid #94a3b8;padding:12px 28px;font-size:12px;color:#64748b;margin-top:12px;">\u2139\uFE0F No activity recorded for this period window.</div>' : ""}

    <!-- KPI Grid (4 Metrics) -->
    <div style="padding:24px 28px 12px 28px;">
      <table width="100%" style="border-collapse:separate;border-spacing:8px;margin-bottom:8px;">
        <tr>
          <!-- Total Leads -->
          <td width="25%" style="background:#fff7ed;border:1px solid #fed7aa;border-radius:12px;padding:14px 10px;text-align:center;">
            <div style="font-size:10px;font-weight:700;color:#9a3412;letter-spacing:0.5px;">TOTAL LEADS</div>
            <div style="font-size:24px;font-weight:800;color:#c2410c;margin:4px 0;">${m.totalLeads ?? 0}</div>
            ${leadsCompHtml}
          </td>
          <!-- 6-Step Bookings -->
          <td width="25%" style="background:#f0fdf4;border:1px solid #bbf7d0;border-radius:12px;padding:14px 10px;text-align:center;">
            <div style="font-size:10px;font-weight:700;color:#166534;letter-spacing:0.5px;">BOOKINGS</div>
            <div style="font-size:24px;font-weight:800;color:#047857;margin:4px 0;">${m.bookings ?? 0}</div>
            ${bookingsCompHtml}
          </td>
          <!-- Visitors -->
          <td width="25%" style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:12px;padding:14px 10px;text-align:center;">
            <div style="font-size:10px;font-weight:700;color:#475569;letter-spacing:0.5px;">VISITORS</div>
            <div style="font-size:24px;font-weight:800;color:#0f172a;margin:4px 0;">${m.uniqueVisitors ?? 0}</div>
            ${visitorsCompHtml}
          </td>
          <!-- Conversion Rate -->
          <td width="25%" style="background:#fefce8;border:1px solid #fef08a;border-radius:12px;padding:14px 10px;text-align:center;">
            <div style="font-size:10px;font-weight:700;color:#854d0e;letter-spacing:0.5px;">CONVERSION</div>
            <div style="font-size:24px;font-weight:800;color:#b45309;margin:4px 0;">${m.conversionRate ?? "0.00%"}</div>
            <div style="font-size:10px;color:#a16207;">Lead/Visitor</div>
          </td>
        </tr>
      </table>
    </div>

    <!-- Detailed Lead Streams Table -->
    <div style="padding:0 28px 24px 28px;">
      <h3 style="margin:12px 0 10px 0;font-size:14px;color:#0f172a;text-transform:uppercase;letter-spacing:0.5px;">Channel & Service Breakdown</h3>
      <table width="100%" style="border-collapse:collapse;font-size:13px;">
        <tr style="border-bottom:1px solid #f1f5f9;">
          <td style="padding:10px 0;color:#475569;">\u2B50 6-Step Verified Bookings:</td>
          <td style="padding:10px 0;text-align:right;font-weight:700;color:#047857;">${m.bookings ?? 0}</td>
        </tr>
        <tr style="border-bottom:1px solid #f1f5f9;">
          <td style="padding:10px 0;color:#475569;">\u{1F4DE} Quick Callback Requests:</td>
          <td style="padding:10px 0;text-align:right;font-weight:700;color:#0f172a;">${m.callbacks ?? 0}</td>
        </tr>
        <tr style="border-bottom:1px solid #f1f5f9;">
          <td style="padding:10px 0;color:#475569;">\u{1F469}\u200D\u2695\uFE0F Caregiver / Nurse Applications:</td>
          <td style="padding:10px 0;text-align:right;font-weight:700;color:#0f172a;">${m.attendantApplications ?? 0}</td>
        </tr>
        <tr style="border-bottom:1px solid #f1f5f9;">
          <td style="padding:10px 0;color:#475569;">\u{1F4AC} Chatbot / AI Assistant Conversations:</td>
          <td style="padding:10px 0;text-align:right;font-weight:700;color:#0f172a;">${m.chatbots ?? 0}</td>
        </tr>
        <tr style="border-bottom:1px solid #f1f5f9;">
          <td style="padding:10px 0;color:#475569;">\u{1F3A5} YouTube Inquiries:</td>
          <td style="padding:10px 0;text-align:right;font-weight:700;color:#0f172a;">${youtubeLeads}</td>
        </tr>
        <tr style="border-bottom:1px solid #f1f5f9;">
          <td style="padding:10px 0;color:#475569;">\u{1F4BC} LinkedIn Leads:</td>
          <td style="padding:10px 0;text-align:right;font-weight:700;color:#0f172a;">${linkedinLeads}</td>
        </tr>
        <tr style="border-bottom:1px solid #f1f5f9;">
          <td style="padding:10px 0;color:#475569;">\u{1F91D} Ecosystem Partners:</td>
          <td style="padding:10px 0;text-align:right;font-weight:700;color:#0f172a;">${m.partners ?? 0}</td>
        </tr>
        <tr style="border-bottom:1px solid #f1f5f9;">
          <td style="padding:10px 0;color:#475569;">\u2709\uFE0F Contact Desk Submissions:</td>
          <td style="padding:10px 0;text-align:right;font-weight:700;color:#0f172a;">${m.contacts ?? 0}</td>
        </tr>
        <tr style="border-bottom:1px solid #f1f5f9;">
          <td style="padding:10px 0;color:#475569;">\u{1F6A8} 24/7 SOS Emergency Alerts:</td>
          <td style="padding:10px 0;text-align:right;font-weight:700;color:#dc2626;">${sosAlerts}</td>
        </tr>
        <tr>
          <td style="padding:10px 0;color:#475569;">\u{1F4C8} Total Telemetry Events Logged:</td>
          <td style="padding:10px 0;text-align:right;font-weight:700;color:#64748b;">${totalEvents}</td>
        </tr>
      </table>

      ${dailyBreakdownHtml}

      <!-- CTA Button -->
      <div style="margin-top:28px;text-align:center;">
        <a href="https://apna-care.vercel.app/" target="_blank" style="background:#047857;color:#ffffff;text-decoration:none;padding:12px 28px;border-radius:8px;font-weight:700;font-size:14px;display:inline-block;letter-spacing:0.3px;">
          Open ApnaCare Portal &rarr;
        </a>
      </div>
    </div>

    <!-- Footer -->
    <div style="background:#f8fafc;padding:20px 28px;border-top:1px solid #e2e8f0;font-size:12px;color:#64748b;text-align:center;">
      <p style="margin:0 0 4px 0;">This report was generated and dispatched automatically by <strong>Vercel Serverless Intelligence</strong> via Nodemailer SMTP.</p>
      <p style="margin:0;">ApnaCare Health & Mobility Support Services Pvt. Ltd. \xB7 24/7 Command Operations</p>
    </div>

  </div>
 </body>
 </html>
 `;
}
function renderTrendBadge(comp) {
  if (!comp) return '<div style="font-size:10px;color:#94a3b8;">vs prior: N/A</div>';
  const isUp = comp.trend === "up";
  const isDown = comp.trend === "down";
  const color = isUp ? "#16a34a" : isDown ? "#dc2626" : "#64748b";
  const arrow = isUp ? "\u25B2" : isDown ? "\u25BC" : "\u2022";
  const sign2 = comp.changePercent > 0 ? "+" : "";
  return `<div style="font-size:10px;font-weight:700;color:${color};">${arrow} ${sign2}${comp.changePercent}%</div>`;
}
function generateText(period, m, isTest) {
  const prefix = isTest ? "[MANUAL TEST] " : "";
  const youtubeLeads = m.youtubeLeads ?? 0;
  const linkedinLeads = m.linkedinLeads ?? 0;
  const sosAlerts = m.sosAlerts ?? 0;
  const totalEvents = m.totalEvents ?? 0;
  return `
${prefix}APNACARE ${period.type.toUpperCase()} INTELLIGENCE REPORT
==================================================
Period: ${period.label}
Generated: ${period.generatedAt}
Data Source: ${m.dataSource}

KEY METRICS:
--------------------------------------------------
* Total Inbound Leads: ${m.totalLeads ?? 0}
* 6-Step Care Bookings: ${m.bookings ?? 0}
* Unique Website Visitors: ${m.uniqueVisitors ?? 0}
* Page Views: ${m.pageViews ?? 0}
* Visitor-to-Lead Conversion Rate: ${m.conversionRate ?? "0.00%"}

CHANNEL BREAKDOWN:
--------------------------------------------------
* 6-Step Verified Bookings: ${m.bookings ?? 0}
* Quick Callback Requests: ${m.callbacks ?? 0}
* Caregiver / Nurse Applications: ${m.attendantApplications ?? 0}
* Chatbot Conversations: ${m.chatbots ?? 0}
* YouTube Inquiries: ${youtubeLeads}
* LinkedIn Leads: ${linkedinLeads}
* Ecosystem Partners: ${m.partners ?? 0}
* Contact Desk Messages: ${m.contacts ?? 0}
* 24/7 SOS Emergency Alerts: ${sosAlerts}
* Total Telemetry Events Logged: ${totalEvents}

Open ApnaCare Portal: https://apna-care.vercel.app/

--
Generated automatically by Vercel Serverless Reporting via Nodemailer SMTP.
ApnaCare Operations Desk
`.trim();
}

// node_modules/postal-mime/src/decode-strings.js
var textEncoder = new TextEncoder();
var base64Chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
var base64Lookup = new Uint8Array(256);
for (let i = 0; i < base64Chars.length; i++) {
  base64Lookup[base64Chars.charCodeAt(i)] = i;
}
function decodeBase64(base64) {
  let bufferLength = Math.ceil(base64.length / 4) * 3;
  const len = base64.length;
  let p = 0;
  if (base64.length % 4 === 3) {
    bufferLength--;
  } else if (base64.length % 4 === 2) {
    bufferLength -= 2;
  } else if (base64[base64.length - 1] === "=") {
    bufferLength--;
    if (base64[base64.length - 2] === "=") {
      bufferLength--;
    }
  }
  const arrayBuffer = new ArrayBuffer(bufferLength);
  const bytes = new Uint8Array(arrayBuffer);
  for (let i = 0; i < len; i += 4) {
    let encoded1 = base64Lookup[base64.charCodeAt(i)];
    let encoded2 = base64Lookup[base64.charCodeAt(i + 1)];
    let encoded3 = base64Lookup[base64.charCodeAt(i + 2)];
    let encoded4 = base64Lookup[base64.charCodeAt(i + 3)];
    bytes[p++] = encoded1 << 2 | encoded2 >> 4;
    bytes[p++] = (encoded2 & 15) << 4 | encoded3 >> 2;
    bytes[p++] = (encoded3 & 3) << 6 | encoded4 & 63;
  }
  return arrayBuffer;
}
var charsetAliases = /* @__PURE__ */ new Map([
  ["iso-8859-8-i", "iso-8859-8"],
  ["iso-8859-8-e", "iso-8859-8"]
]);
function getDecoder(charset) {
  charset = (charset || "utf8").trim().toLowerCase();
  charset = charsetAliases.get(charset) || charset;
  let decoder;
  try {
    decoder = new TextDecoder(charset);
  } catch (err) {
    decoder = new TextDecoder("windows-1252");
  }
  return decoder;
}
async function blobToArrayBuffer(blob) {
  if ("arrayBuffer" in blob) {
    return await blob.arrayBuffer();
  }
  const fr = new FileReader();
  return new Promise((resolve3, reject) => {
    fr.onload = function(e) {
      resolve3(e.target.result);
    };
    fr.onerror = function(e) {
      reject(fr.error);
    };
    fr.readAsArrayBuffer(blob);
  });
}
function getHex(c) {
  if (c >= 48 && c <= 57 || c >= 97 && c <= 102 || c >= 65 && c <= 70) {
    return String.fromCharCode(c);
  }
  return false;
}
function decodeWord(charset, encoding, str) {
  let splitPos = charset.indexOf("*");
  if (splitPos >= 0) {
    charset = charset.substr(0, splitPos);
  }
  encoding = encoding.toUpperCase();
  let byteStr;
  if (encoding === "Q") {
    str = str.replace(/=\s+([0-9a-fA-F])/g, "=$1").replace(/[_\s]/g, " ");
    let buf = textEncoder.encode(str);
    let encodedBytes = [];
    for (let i = 0, len = buf.length; i < len; i++) {
      let c = buf[i];
      if (i <= len - 2 && c === 61) {
        let c1 = getHex(buf[i + 1]);
        let c2 = getHex(buf[i + 2]);
        if (c1 && c2) {
          let c3 = parseInt(c1 + c2, 16);
          encodedBytes.push(c3);
          i += 2;
          continue;
        }
      }
      encodedBytes.push(c);
    }
    byteStr = new ArrayBuffer(encodedBytes.length);
    let dataView = new DataView(byteStr);
    for (let i = 0, len = encodedBytes.length; i < len; i++) {
      dataView.setUint8(i, encodedBytes[i]);
    }
  } else if (encoding === "B") {
    byteStr = decodeBase64(str.replace(/[^a-zA-Z0-9\+\/=]+/g, ""));
  } else {
    byteStr = textEncoder.encode(str);
  }
  return getDecoder(charset).decode(byteStr);
}
function decodeWords(str) {
  let joinString = true;
  let done = false;
  while (!done) {
    let result = (str || "").toString().replace(
      /(=\?([^?]+)\?[Bb]\?([^?]*)\?=)\s*(?==\?([^?]+)\?[Bb]\?[^?]*\?=)/g,
      (match, left, chLeft, encodedLeftStr, chRight) => {
        if (!joinString) {
          return match;
        }
        if (chLeft === chRight && encodedLeftStr.length % 4 === 0 && !/=$/.test(encodedLeftStr)) {
          return left + "__\0JOIN\0__";
        }
        return match;
      }
    ).replace(
      /(=\?([^?]+)\?[Qq]\?[^?]*\?=)\s*(?==\?([^?]+)\?[Qq]\?[^?]*\?=)/g,
      (match, left, chLeft, chRight) => {
        if (!joinString) {
          return match;
        }
        if (chLeft === chRight) {
          return left + "__\0JOIN\0__";
        }
        return match;
      }
    ).replace(/(\?=)?__\x00JOIN\x00__(=\?([^?]+)\?[QqBb]\?)?/g, "").replace(/(=\?[^?]+\?[QqBb]\?[^?]*\?=)\s+(?==\?[^?]+\?[QqBb]\?[^?]*\?=)/g, "$1").replace(
      /=\?([\w_\-*]+)\?([QqBb])\?([^?]*)\?=/g,
      (m, charset, encoding, text) => decodeWord(charset, encoding, text)
    );
    if (joinString && result.indexOf("\uFFFD") >= 0) {
      joinString = false;
    } else {
      return result;
    }
  }
}
function decodeURIComponentWithCharset(encodedStr, charset) {
  charset = charset || "utf-8";
  let encodedBytes = [];
  for (let i = 0; i < encodedStr.length; i++) {
    let c = encodedStr.charAt(i);
    if (c === "%" && /^[a-f0-9]{2}/i.test(encodedStr.substr(i + 1, 2))) {
      let byte = encodedStr.substr(i + 1, 2);
      i += 2;
      encodedBytes.push(parseInt(byte, 16));
    } else if (c.charCodeAt(0) > 126) {
      c = textEncoder.encode(c);
      for (let j = 0; j < c.length; j++) {
        encodedBytes.push(c[j]);
      }
    } else {
      encodedBytes.push(c.charCodeAt(0));
    }
  }
  const byteStr = new ArrayBuffer(encodedBytes.length);
  const dataView = new DataView(byteStr);
  for (let i = 0, len = encodedBytes.length; i < len; i++) {
    dataView.setUint8(i, encodedBytes[i]);
  }
  return getDecoder(charset).decode(byteStr);
}
function decodeParameterValueContinuations(header) {
  let paramKeys = /* @__PURE__ */ new Map();
  Object.keys(header.params).forEach((key) => {
    let match = key.match(/\*((\d+)\*?)?$/);
    if (!match) {
      return;
    }
    let actualKey = key.substr(0, match.index).toLowerCase();
    let nr = Number(match[2]) || 0;
    let paramVal;
    if (!paramKeys.has(actualKey)) {
      paramVal = {
        charset: false,
        values: []
      };
      paramKeys.set(actualKey, paramVal);
    } else {
      paramVal = paramKeys.get(actualKey);
    }
    let value = header.params[key];
    if (nr === 0 && match[0].charAt(match[0].length - 1) === "*" && (match = value.match(/^([^']*)'[^']*'(.*)$/))) {
      paramVal.charset = match[1] || "utf-8";
      value = match[2];
    }
    paramVal.values.push({ nr, value });
    delete header.params[key];
  });
  paramKeys.forEach((paramVal, key) => {
    header.params[key] = decodeURIComponentWithCharset(
      paramVal.values.sort((a, b) => a.nr - b.nr).map((a) => a.value).join(""),
      paramVal.charset
    );
  });
}

// node_modules/postal-mime/src/pass-through-decoder.js
var PassThroughDecoder = class {
  constructor() {
    this.chunks = [];
  }
  update(line) {
    this.chunks.push(line);
    this.chunks.push("\n");
  }
  finalize() {
    return blobToArrayBuffer(new Blob(this.chunks, { type: "application/octet-stream" }));
  }
};

// node_modules/postal-mime/src/base64-decoder.js
var Base64Decoder = class {
  constructor(opts) {
    opts = opts || {};
    this.decoder = opts.decoder || new TextDecoder();
    this.maxChunkSize = 100 * 1024;
    this.chunks = [];
    this.remainder = "";
  }
  update(buffer) {
    let str = this.decoder.decode(buffer);
    str = str.replace(/[^a-zA-Z0-9+\/]+/g, "");
    this.remainder += str;
    if (this.remainder.length >= this.maxChunkSize) {
      let allowedBytes = Math.floor(this.remainder.length / 4) * 4;
      let base64Str;
      if (allowedBytes === this.remainder.length) {
        base64Str = this.remainder;
        this.remainder = "";
      } else {
        base64Str = this.remainder.substr(0, allowedBytes);
        this.remainder = this.remainder.substr(allowedBytes);
      }
      if (base64Str.length) {
        this.chunks.push(decodeBase64(base64Str));
      }
    }
  }
  finalize() {
    if (this.remainder && !/^=+$/.test(this.remainder)) {
      this.chunks.push(decodeBase64(this.remainder));
    }
    return blobToArrayBuffer(new Blob(this.chunks, { type: "application/octet-stream" }));
  }
};

// node_modules/postal-mime/src/qp-decoder.js
var VALID_QP_REGEX = /^=[a-f0-9]{2}$/i;
var QP_SPLIT_REGEX = /(?==[a-f0-9]{2})/i;
var SOFT_LINE_BREAK_REGEX = /=\r?\n/g;
var PARTIAL_QP_ENDING_REGEX = /=[a-fA-F0-9]?$/;
var QPDecoder = class {
  constructor(opts) {
    opts = opts || {};
    this.decoder = opts.decoder || new TextDecoder();
    this.maxChunkSize = 100 * 1024;
    this.remainder = "";
    this.chunks = [];
  }
  decodeQPBytes(encodedBytes) {
    let buf = new ArrayBuffer(encodedBytes.length);
    let dataView = new DataView(buf);
    for (let i = 0, len = encodedBytes.length; i < len; i++) {
      dataView.setUint8(i, parseInt(encodedBytes[i], 16));
    }
    return buf;
  }
  decodeChunks(str) {
    str = str.replace(SOFT_LINE_BREAK_REGEX, "");
    let list = str.split(QP_SPLIT_REGEX);
    let encodedBytes = [];
    for (let part of list) {
      if (part.charAt(0) !== "=") {
        if (encodedBytes.length) {
          this.chunks.push(this.decodeQPBytes(encodedBytes));
          encodedBytes = [];
        }
        this.chunks.push(part);
        continue;
      }
      if (part.length === 3) {
        if (VALID_QP_REGEX.test(part)) {
          encodedBytes.push(part.substr(1));
        } else {
          if (encodedBytes.length) {
            this.chunks.push(this.decodeQPBytes(encodedBytes));
            encodedBytes = [];
          }
          this.chunks.push(part);
        }
        continue;
      }
      if (part.length > 3) {
        const firstThree = part.substr(0, 3);
        if (VALID_QP_REGEX.test(firstThree)) {
          encodedBytes.push(part.substr(1, 2));
          this.chunks.push(this.decodeQPBytes(encodedBytes));
          encodedBytes = [];
          part = part.substr(3);
          this.chunks.push(part);
        } else {
          if (encodedBytes.length) {
            this.chunks.push(this.decodeQPBytes(encodedBytes));
            encodedBytes = [];
          }
          this.chunks.push(part);
        }
      }
    }
    if (encodedBytes.length) {
      this.chunks.push(this.decodeQPBytes(encodedBytes));
    }
  }
  update(buffer) {
    let str = this.decoder.decode(buffer) + "\n";
    str = this.remainder + str;
    if (str.length < this.maxChunkSize) {
      this.remainder = str;
      return;
    }
    this.remainder = "";
    let partialEnding = str.match(PARTIAL_QP_ENDING_REGEX);
    if (partialEnding) {
      if (partialEnding.index === 0) {
        this.remainder = str;
        return;
      }
      this.remainder = str.substr(partialEnding.index);
      str = str.substr(0, partialEnding.index);
    }
    this.decodeChunks(str);
  }
  finalize() {
    if (this.remainder.length) {
      this.decodeChunks(this.remainder);
      this.remainder = "";
    }
    return blobToArrayBuffer(new Blob(this.chunks, { type: "application/octet-stream" }));
  }
};

// node_modules/postal-mime/src/mime-node.js
var defaultDecoder = getDecoder();
var MimeNode = class {
  constructor(options) {
    this.options = options || {};
    this.postalMime = this.options.postalMime;
    this.root = !!this.options.parentNode;
    this.childNodes = [];
    if (this.options.parentNode) {
      this.parentNode = this.options.parentNode;
      this.depth = this.parentNode.depth + 1;
      if (this.depth > this.options.maxNestingDepth) {
        throw new Error(`Maximum MIME nesting depth of ${this.options.maxNestingDepth} levels exceeded`);
      }
      this.options.parentNode.childNodes.push(this);
    } else {
      this.depth = 0;
    }
    this.state = "header";
    this.headerLines = [];
    this.headerSize = 0;
    const parentMultipartType = this.options.parentMultipartType || null;
    const defaultContentType = parentMultipartType === "digest" ? "message/rfc822" : "text/plain";
    this.contentType = {
      value: defaultContentType,
      default: true
    };
    this.contentTransferEncoding = {
      value: "8bit"
    };
    this.contentDisposition = {
      value: ""
    };
    this.headers = [];
    this.contentDecoder = false;
  }
  setupContentDecoder(transferEncoding) {
    if (/base64/i.test(transferEncoding)) {
      this.contentDecoder = new Base64Decoder();
    } else if (/quoted-printable/i.test(transferEncoding)) {
      this.contentDecoder = new QPDecoder({ decoder: getDecoder(this.contentType.parsed.params.charset) });
    } else {
      this.contentDecoder = new PassThroughDecoder();
    }
  }
  async finalize() {
    if (this.state === "finished") {
      return;
    }
    if (this.state === "header") {
      this.processHeaders();
    }
    let boundaries = this.postalMime.boundaries;
    for (let i = boundaries.length - 1; i >= 0; i--) {
      let boundary = boundaries[i];
      if (boundary.node === this) {
        boundaries.splice(i, 1);
        break;
      }
    }
    await this.finalizeChildNodes();
    this.content = this.contentDecoder ? await this.contentDecoder.finalize() : null;
    this.contentDecoder = false;
    this.state = "finished";
  }
  async finalizeChildNodes() {
    for (let childNode of this.childNodes) {
      await childNode.finalize();
    }
  }
  // Strip RFC 822 comments (parenthesized text) from structured header values
  stripComments(str) {
    let result = "";
    let depth = 0;
    let escaped = false;
    let inQuote = false;
    for (let i = 0; i < str.length; i++) {
      const chr = str.charAt(i);
      if (escaped) {
        if (depth === 0) {
          result += chr;
        }
        escaped = false;
        continue;
      }
      if (chr === "\\") {
        escaped = true;
        if (depth === 0) {
          result += chr;
        }
        continue;
      }
      if (chr === '"' && depth === 0) {
        inQuote = !inQuote;
        result += chr;
        continue;
      }
      if (!inQuote) {
        if (chr === "(") {
          depth++;
          continue;
        }
        if (chr === ")" && depth > 0) {
          depth--;
          continue;
        }
      }
      if (depth === 0) {
        result += chr;
      }
    }
    return result;
  }
  parseStructuredHeader(str) {
    str = this.stripComments(str);
    let response = {
      value: false,
      params: {}
    };
    let key = false;
    let value = "";
    let stage = "value";
    let quote = false;
    let escaped = false;
    let chr;
    for (let i = 0, len = str.length; i < len; i++) {
      chr = str.charAt(i);
      switch (stage) {
        case "key":
          if (chr === "=") {
            key = value.trim().toLowerCase();
            stage = "value";
            value = "";
            break;
          }
          value += chr;
          break;
        case "value":
          if (escaped) {
            value += chr;
          } else if (chr === "\\") {
            escaped = true;
            continue;
          } else if (quote && chr === quote) {
            quote = false;
          } else if (!quote && chr === '"') {
            quote = chr;
          } else if (!quote && chr === ";") {
            if (key === false) {
              response.value = value.trim();
            } else {
              response.params[key] = value.trim();
            }
            stage = "key";
            value = "";
          } else {
            value += chr;
          }
          escaped = false;
          break;
      }
    }
    value = value.trim();
    if (stage === "value") {
      if (key === false) {
        response.value = value;
      } else {
        response.params[key] = value;
      }
    } else if (value) {
      response.params[value.toLowerCase()] = "";
    }
    if (response.value) {
      response.value = response.value.toLowerCase();
    }
    decodeParameterValueContinuations(response);
    return response;
  }
  decodeFlowedText(str, delSp) {
    return str.split(/\r?\n/).reduce((previousValue, currentValue) => {
      if (previousValue.endsWith(" ") && previousValue !== "-- " && !previousValue.endsWith("\n-- ")) {
        if (delSp) {
          return previousValue.slice(0, -1) + currentValue;
        } else {
          return previousValue + currentValue;
        }
      } else {
        return previousValue + "\n" + currentValue;
      }
    }).replace(/^ /gm, "");
  }
  getTextContent() {
    if (!this.content) {
      return "";
    }
    let str = getDecoder(this.contentType.parsed.params.charset).decode(this.content);
    if (/^flowed$/i.test(this.contentType.parsed.params.format)) {
      str = this.decodeFlowedText(str, /^yes$/i.test(this.contentType.parsed.params.delsp));
    }
    return str;
  }
  processHeaders() {
    for (let i = this.headerLines.length - 1; i >= 0; i--) {
      let line = this.headerLines[i];
      if (i && /^\s/.test(line)) {
        this.headerLines[i - 1] += "\n" + line;
        this.headerLines.splice(i, 1);
      }
    }
    this.rawHeaderLines = [];
    for (let i = this.headerLines.length - 1; i >= 0; i--) {
      let rawLine = this.headerLines[i];
      let sep = rawLine.indexOf(":");
      let rawKey = sep < 0 ? rawLine.trim() : rawLine.substr(0, sep).trim();
      this.rawHeaderLines.push({
        key: rawKey.toLowerCase(),
        line: rawLine
      });
      let normalizedLine = rawLine.replace(/\s+/g, " ");
      sep = normalizedLine.indexOf(":");
      let key = sep < 0 ? normalizedLine.trim() : normalizedLine.substr(0, sep).trim();
      let value = sep < 0 ? "" : normalizedLine.substr(sep + 1).trim();
      this.headers.push({ key: key.toLowerCase(), originalKey: key, value });
      switch (key.toLowerCase()) {
        case "content-type":
          if (this.contentType.default) {
            this.contentType = { value, parsed: {} };
          }
          break;
        case "content-transfer-encoding":
          this.contentTransferEncoding = { value, parsed: {} };
          break;
        case "content-disposition":
          this.contentDisposition = { value, parsed: {} };
          break;
        case "content-id":
          this.contentId = value;
          break;
        case "content-description":
          this.contentDescription = value;
          break;
      }
    }
    this.contentType.parsed = this.parseStructuredHeader(this.contentType.value);
    this.contentType.multipart = /^multipart\//i.test(this.contentType.parsed.value) ? this.contentType.parsed.value.substr(this.contentType.parsed.value.indexOf("/") + 1) : false;
    if (this.contentType.multipart && this.contentType.parsed.params.boundary) {
      this.postalMime.boundaries.push({
        value: textEncoder.encode(this.contentType.parsed.params.boundary),
        node: this
      });
    }
    this.contentDisposition.parsed = this.parseStructuredHeader(this.contentDisposition.value);
    this.contentTransferEncoding.encoding = this.contentTransferEncoding.value.toLowerCase().split(/[^\w-]/).shift();
    this.setupContentDecoder(this.contentTransferEncoding.encoding);
  }
  feed(line) {
    switch (this.state) {
      case "header":
        if (!line.length) {
          this.state = "body";
          return this.processHeaders();
        }
        this.headerSize += line.length;
        if (this.headerSize > this.options.maxHeadersSize) {
          let error2 = new Error(`Maximum header size of ${this.options.maxHeadersSize} bytes exceeded`);
          throw error2;
        }
        this.headerLines.push(defaultDecoder.decode(line));
        break;
      case "body": {
        this.contentDecoder.update(line);
      }
    }
  }
};

// node_modules/postal-mime/src/html-entities.js
var htmlEntities = {
  "&AElig": "\xC6",
  "&AElig;": "\xC6",
  "&AMP": "&",
  "&AMP;": "&",
  "&Aacute": "\xC1",
  "&Aacute;": "\xC1",
  "&Abreve;": "\u0102",
  "&Acirc": "\xC2",
  "&Acirc;": "\xC2",
  "&Acy;": "\u0410",
  "&Afr;": "\u{1D504}",
  "&Agrave": "\xC0",
  "&Agrave;": "\xC0",
  "&Alpha;": "\u0391",
  "&Amacr;": "\u0100",
  "&And;": "\u2A53",
  "&Aogon;": "\u0104",
  "&Aopf;": "\u{1D538}",
  "&ApplyFunction;": "\u2061",
  "&Aring": "\xC5",
  "&Aring;": "\xC5",
  "&Ascr;": "\u{1D49C}",
  "&Assign;": "\u2254",
  "&Atilde": "\xC3",
  "&Atilde;": "\xC3",
  "&Auml": "\xC4",
  "&Auml;": "\xC4",
  "&Backslash;": "\u2216",
  "&Barv;": "\u2AE7",
  "&Barwed;": "\u2306",
  "&Bcy;": "\u0411",
  "&Because;": "\u2235",
  "&Bernoullis;": "\u212C",
  "&Beta;": "\u0392",
  "&Bfr;": "\u{1D505}",
  "&Bopf;": "\u{1D539}",
  "&Breve;": "\u02D8",
  "&Bscr;": "\u212C",
  "&Bumpeq;": "\u224E",
  "&CHcy;": "\u0427",
  "&COPY": "\xA9",
  "&COPY;": "\xA9",
  "&Cacute;": "\u0106",
  "&Cap;": "\u22D2",
  "&CapitalDifferentialD;": "\u2145",
  "&Cayleys;": "\u212D",
  "&Ccaron;": "\u010C",
  "&Ccedil": "\xC7",
  "&Ccedil;": "\xC7",
  "&Ccirc;": "\u0108",
  "&Cconint;": "\u2230",
  "&Cdot;": "\u010A",
  "&Cedilla;": "\xB8",
  "&CenterDot;": "\xB7",
  "&Cfr;": "\u212D",
  "&Chi;": "\u03A7",
  "&CircleDot;": "\u2299",
  "&CircleMinus;": "\u2296",
  "&CirclePlus;": "\u2295",
  "&CircleTimes;": "\u2297",
  "&ClockwiseContourIntegral;": "\u2232",
  "&CloseCurlyDoubleQuote;": "\u201D",
  "&CloseCurlyQuote;": "\u2019",
  "&Colon;": "\u2237",
  "&Colone;": "\u2A74",
  "&Congruent;": "\u2261",
  "&Conint;": "\u222F",
  "&ContourIntegral;": "\u222E",
  "&Copf;": "\u2102",
  "&Coproduct;": "\u2210",
  "&CounterClockwiseContourIntegral;": "\u2233",
  "&Cross;": "\u2A2F",
  "&Cscr;": "\u{1D49E}",
  "&Cup;": "\u22D3",
  "&CupCap;": "\u224D",
  "&DD;": "\u2145",
  "&DDotrahd;": "\u2911",
  "&DJcy;": "\u0402",
  "&DScy;": "\u0405",
  "&DZcy;": "\u040F",
  "&Dagger;": "\u2021",
  "&Darr;": "\u21A1",
  "&Dashv;": "\u2AE4",
  "&Dcaron;": "\u010E",
  "&Dcy;": "\u0414",
  "&Del;": "\u2207",
  "&Delta;": "\u0394",
  "&Dfr;": "\u{1D507}",
  "&DiacriticalAcute;": "\xB4",
  "&DiacriticalDot;": "\u02D9",
  "&DiacriticalDoubleAcute;": "\u02DD",
  "&DiacriticalGrave;": "`",
  "&DiacriticalTilde;": "\u02DC",
  "&Diamond;": "\u22C4",
  "&DifferentialD;": "\u2146",
  "&Dopf;": "\u{1D53B}",
  "&Dot;": "\xA8",
  "&DotDot;": "\u20DC",
  "&DotEqual;": "\u2250",
  "&DoubleContourIntegral;": "\u222F",
  "&DoubleDot;": "\xA8",
  "&DoubleDownArrow;": "\u21D3",
  "&DoubleLeftArrow;": "\u21D0",
  "&DoubleLeftRightArrow;": "\u21D4",
  "&DoubleLeftTee;": "\u2AE4",
  "&DoubleLongLeftArrow;": "\u27F8",
  "&DoubleLongLeftRightArrow;": "\u27FA",
  "&DoubleLongRightArrow;": "\u27F9",
  "&DoubleRightArrow;": "\u21D2",
  "&DoubleRightTee;": "\u22A8",
  "&DoubleUpArrow;": "\u21D1",
  "&DoubleUpDownArrow;": "\u21D5",
  "&DoubleVerticalBar;": "\u2225",
  "&DownArrow;": "\u2193",
  "&DownArrowBar;": "\u2913",
  "&DownArrowUpArrow;": "\u21F5",
  "&DownBreve;": "\u0311",
  "&DownLeftRightVector;": "\u2950",
  "&DownLeftTeeVector;": "\u295E",
  "&DownLeftVector;": "\u21BD",
  "&DownLeftVectorBar;": "\u2956",
  "&DownRightTeeVector;": "\u295F",
  "&DownRightVector;": "\u21C1",
  "&DownRightVectorBar;": "\u2957",
  "&DownTee;": "\u22A4",
  "&DownTeeArrow;": "\u21A7",
  "&Downarrow;": "\u21D3",
  "&Dscr;": "\u{1D49F}",
  "&Dstrok;": "\u0110",
  "&ENG;": "\u014A",
  "&ETH": "\xD0",
  "&ETH;": "\xD0",
  "&Eacute": "\xC9",
  "&Eacute;": "\xC9",
  "&Ecaron;": "\u011A",
  "&Ecirc": "\xCA",
  "&Ecirc;": "\xCA",
  "&Ecy;": "\u042D",
  "&Edot;": "\u0116",
  "&Efr;": "\u{1D508}",
  "&Egrave": "\xC8",
  "&Egrave;": "\xC8",
  "&Element;": "\u2208",
  "&Emacr;": "\u0112",
  "&EmptySmallSquare;": "\u25FB",
  "&EmptyVerySmallSquare;": "\u25AB",
  "&Eogon;": "\u0118",
  "&Eopf;": "\u{1D53C}",
  "&Epsilon;": "\u0395",
  "&Equal;": "\u2A75",
  "&EqualTilde;": "\u2242",
  "&Equilibrium;": "\u21CC",
  "&Escr;": "\u2130",
  "&Esim;": "\u2A73",
  "&Eta;": "\u0397",
  "&Euml": "\xCB",
  "&Euml;": "\xCB",
  "&Exists;": "\u2203",
  "&ExponentialE;": "\u2147",
  "&Fcy;": "\u0424",
  "&Ffr;": "\u{1D509}",
  "&FilledSmallSquare;": "\u25FC",
  "&FilledVerySmallSquare;": "\u25AA",
  "&Fopf;": "\u{1D53D}",
  "&ForAll;": "\u2200",
  "&Fouriertrf;": "\u2131",
  "&Fscr;": "\u2131",
  "&GJcy;": "\u0403",
  "&GT": ">",
  "&GT;": ">",
  "&Gamma;": "\u0393",
  "&Gammad;": "\u03DC",
  "&Gbreve;": "\u011E",
  "&Gcedil;": "\u0122",
  "&Gcirc;": "\u011C",
  "&Gcy;": "\u0413",
  "&Gdot;": "\u0120",
  "&Gfr;": "\u{1D50A}",
  "&Gg;": "\u22D9",
  "&Gopf;": "\u{1D53E}",
  "&GreaterEqual;": "\u2265",
  "&GreaterEqualLess;": "\u22DB",
  "&GreaterFullEqual;": "\u2267",
  "&GreaterGreater;": "\u2AA2",
  "&GreaterLess;": "\u2277",
  "&GreaterSlantEqual;": "\u2A7E",
  "&GreaterTilde;": "\u2273",
  "&Gscr;": "\u{1D4A2}",
  "&Gt;": "\u226B",
  "&HARDcy;": "\u042A",
  "&Hacek;": "\u02C7",
  "&Hat;": "^",
  "&Hcirc;": "\u0124",
  "&Hfr;": "\u210C",
  "&HilbertSpace;": "\u210B",
  "&Hopf;": "\u210D",
  "&HorizontalLine;": "\u2500",
  "&Hscr;": "\u210B",
  "&Hstrok;": "\u0126",
  "&HumpDownHump;": "\u224E",
  "&HumpEqual;": "\u224F",
  "&IEcy;": "\u0415",
  "&IJlig;": "\u0132",
  "&IOcy;": "\u0401",
  "&Iacute": "\xCD",
  "&Iacute;": "\xCD",
  "&Icirc": "\xCE",
  "&Icirc;": "\xCE",
  "&Icy;": "\u0418",
  "&Idot;": "\u0130",
  "&Ifr;": "\u2111",
  "&Igrave": "\xCC",
  "&Igrave;": "\xCC",
  "&Im;": "\u2111",
  "&Imacr;": "\u012A",
  "&ImaginaryI;": "\u2148",
  "&Implies;": "\u21D2",
  "&Int;": "\u222C",
  "&Integral;": "\u222B",
  "&Intersection;": "\u22C2",
  "&InvisibleComma;": "\u2063",
  "&InvisibleTimes;": "\u2062",
  "&Iogon;": "\u012E",
  "&Iopf;": "\u{1D540}",
  "&Iota;": "\u0399",
  "&Iscr;": "\u2110",
  "&Itilde;": "\u0128",
  "&Iukcy;": "\u0406",
  "&Iuml": "\xCF",
  "&Iuml;": "\xCF",
  "&Jcirc;": "\u0134",
  "&Jcy;": "\u0419",
  "&Jfr;": "\u{1D50D}",
  "&Jopf;": "\u{1D541}",
  "&Jscr;": "\u{1D4A5}",
  "&Jsercy;": "\u0408",
  "&Jukcy;": "\u0404",
  "&KHcy;": "\u0425",
  "&KJcy;": "\u040C",
  "&Kappa;": "\u039A",
  "&Kcedil;": "\u0136",
  "&Kcy;": "\u041A",
  "&Kfr;": "\u{1D50E}",
  "&Kopf;": "\u{1D542}",
  "&Kscr;": "\u{1D4A6}",
  "&LJcy;": "\u0409",
  "&LT": "<",
  "&LT;": "<",
  "&Lacute;": "\u0139",
  "&Lambda;": "\u039B",
  "&Lang;": "\u27EA",
  "&Laplacetrf;": "\u2112",
  "&Larr;": "\u219E",
  "&Lcaron;": "\u013D",
  "&Lcedil;": "\u013B",
  "&Lcy;": "\u041B",
  "&LeftAngleBracket;": "\u27E8",
  "&LeftArrow;": "\u2190",
  "&LeftArrowBar;": "\u21E4",
  "&LeftArrowRightArrow;": "\u21C6",
  "&LeftCeiling;": "\u2308",
  "&LeftDoubleBracket;": "\u27E6",
  "&LeftDownTeeVector;": "\u2961",
  "&LeftDownVector;": "\u21C3",
  "&LeftDownVectorBar;": "\u2959",
  "&LeftFloor;": "\u230A",
  "&LeftRightArrow;": "\u2194",
  "&LeftRightVector;": "\u294E",
  "&LeftTee;": "\u22A3",
  "&LeftTeeArrow;": "\u21A4",
  "&LeftTeeVector;": "\u295A",
  "&LeftTriangle;": "\u22B2",
  "&LeftTriangleBar;": "\u29CF",
  "&LeftTriangleEqual;": "\u22B4",
  "&LeftUpDownVector;": "\u2951",
  "&LeftUpTeeVector;": "\u2960",
  "&LeftUpVector;": "\u21BF",
  "&LeftUpVectorBar;": "\u2958",
  "&LeftVector;": "\u21BC",
  "&LeftVectorBar;": "\u2952",
  "&Leftarrow;": "\u21D0",
  "&Leftrightarrow;": "\u21D4",
  "&LessEqualGreater;": "\u22DA",
  "&LessFullEqual;": "\u2266",
  "&LessGreater;": "\u2276",
  "&LessLess;": "\u2AA1",
  "&LessSlantEqual;": "\u2A7D",
  "&LessTilde;": "\u2272",
  "&Lfr;": "\u{1D50F}",
  "&Ll;": "\u22D8",
  "&Lleftarrow;": "\u21DA",
  "&Lmidot;": "\u013F",
  "&LongLeftArrow;": "\u27F5",
  "&LongLeftRightArrow;": "\u27F7",
  "&LongRightArrow;": "\u27F6",
  "&Longleftarrow;": "\u27F8",
  "&Longleftrightarrow;": "\u27FA",
  "&Longrightarrow;": "\u27F9",
  "&Lopf;": "\u{1D543}",
  "&LowerLeftArrow;": "\u2199",
  "&LowerRightArrow;": "\u2198",
  "&Lscr;": "\u2112",
  "&Lsh;": "\u21B0",
  "&Lstrok;": "\u0141",
  "&Lt;": "\u226A",
  "&Map;": "\u2905",
  "&Mcy;": "\u041C",
  "&MediumSpace;": "\u205F",
  "&Mellintrf;": "\u2133",
  "&Mfr;": "\u{1D510}",
  "&MinusPlus;": "\u2213",
  "&Mopf;": "\u{1D544}",
  "&Mscr;": "\u2133",
  "&Mu;": "\u039C",
  "&NJcy;": "\u040A",
  "&Nacute;": "\u0143",
  "&Ncaron;": "\u0147",
  "&Ncedil;": "\u0145",
  "&Ncy;": "\u041D",
  "&NegativeMediumSpace;": "\u200B",
  "&NegativeThickSpace;": "\u200B",
  "&NegativeThinSpace;": "\u200B",
  "&NegativeVeryThinSpace;": "\u200B",
  "&NestedGreaterGreater;": "\u226B",
  "&NestedLessLess;": "\u226A",
  "&NewLine;": "\n",
  "&Nfr;": "\u{1D511}",
  "&NoBreak;": "\u2060",
  "&NonBreakingSpace;": "\xA0",
  "&Nopf;": "\u2115",
  "&Not;": "\u2AEC",
  "&NotCongruent;": "\u2262",
  "&NotCupCap;": "\u226D",
  "&NotDoubleVerticalBar;": "\u2226",
  "&NotElement;": "\u2209",
  "&NotEqual;": "\u2260",
  "&NotEqualTilde;": "\u2242\u0338",
  "&NotExists;": "\u2204",
  "&NotGreater;": "\u226F",
  "&NotGreaterEqual;": "\u2271",
  "&NotGreaterFullEqual;": "\u2267\u0338",
  "&NotGreaterGreater;": "\u226B\u0338",
  "&NotGreaterLess;": "\u2279",
  "&NotGreaterSlantEqual;": "\u2A7E\u0338",
  "&NotGreaterTilde;": "\u2275",
  "&NotHumpDownHump;": "\u224E\u0338",
  "&NotHumpEqual;": "\u224F\u0338",
  "&NotLeftTriangle;": "\u22EA",
  "&NotLeftTriangleBar;": "\u29CF\u0338",
  "&NotLeftTriangleEqual;": "\u22EC",
  "&NotLess;": "\u226E",
  "&NotLessEqual;": "\u2270",
  "&NotLessGreater;": "\u2278",
  "&NotLessLess;": "\u226A\u0338",
  "&NotLessSlantEqual;": "\u2A7D\u0338",
  "&NotLessTilde;": "\u2274",
  "&NotNestedGreaterGreater;": "\u2AA2\u0338",
  "&NotNestedLessLess;": "\u2AA1\u0338",
  "&NotPrecedes;": "\u2280",
  "&NotPrecedesEqual;": "\u2AAF\u0338",
  "&NotPrecedesSlantEqual;": "\u22E0",
  "&NotReverseElement;": "\u220C",
  "&NotRightTriangle;": "\u22EB",
  "&NotRightTriangleBar;": "\u29D0\u0338",
  "&NotRightTriangleEqual;": "\u22ED",
  "&NotSquareSubset;": "\u228F\u0338",
  "&NotSquareSubsetEqual;": "\u22E2",
  "&NotSquareSuperset;": "\u2290\u0338",
  "&NotSquareSupersetEqual;": "\u22E3",
  "&NotSubset;": "\u2282\u20D2",
  "&NotSubsetEqual;": "\u2288",
  "&NotSucceeds;": "\u2281",
  "&NotSucceedsEqual;": "\u2AB0\u0338",
  "&NotSucceedsSlantEqual;": "\u22E1",
  "&NotSucceedsTilde;": "\u227F\u0338",
  "&NotSuperset;": "\u2283\u20D2",
  "&NotSupersetEqual;": "\u2289",
  "&NotTilde;": "\u2241",
  "&NotTildeEqual;": "\u2244",
  "&NotTildeFullEqual;": "\u2247",
  "&NotTildeTilde;": "\u2249",
  "&NotVerticalBar;": "\u2224",
  "&Nscr;": "\u{1D4A9}",
  "&Ntilde": "\xD1",
  "&Ntilde;": "\xD1",
  "&Nu;": "\u039D",
  "&OElig;": "\u0152",
  "&Oacute": "\xD3",
  "&Oacute;": "\xD3",
  "&Ocirc": "\xD4",
  "&Ocirc;": "\xD4",
  "&Ocy;": "\u041E",
  "&Odblac;": "\u0150",
  "&Ofr;": "\u{1D512}",
  "&Ograve": "\xD2",
  "&Ograve;": "\xD2",
  "&Omacr;": "\u014C",
  "&Omega;": "\u03A9",
  "&Omicron;": "\u039F",
  "&Oopf;": "\u{1D546}",
  "&OpenCurlyDoubleQuote;": "\u201C",
  "&OpenCurlyQuote;": "\u2018",
  "&Or;": "\u2A54",
  "&Oscr;": "\u{1D4AA}",
  "&Oslash": "\xD8",
  "&Oslash;": "\xD8",
  "&Otilde": "\xD5",
  "&Otilde;": "\xD5",
  "&Otimes;": "\u2A37",
  "&Ouml": "\xD6",
  "&Ouml;": "\xD6",
  "&OverBar;": "\u203E",
  "&OverBrace;": "\u23DE",
  "&OverBracket;": "\u23B4",
  "&OverParenthesis;": "\u23DC",
  "&PartialD;": "\u2202",
  "&Pcy;": "\u041F",
  "&Pfr;": "\u{1D513}",
  "&Phi;": "\u03A6",
  "&Pi;": "\u03A0",
  "&PlusMinus;": "\xB1",
  "&Poincareplane;": "\u210C",
  "&Popf;": "\u2119",
  "&Pr;": "\u2ABB",
  "&Precedes;": "\u227A",
  "&PrecedesEqual;": "\u2AAF",
  "&PrecedesSlantEqual;": "\u227C",
  "&PrecedesTilde;": "\u227E",
  "&Prime;": "\u2033",
  "&Product;": "\u220F",
  "&Proportion;": "\u2237",
  "&Proportional;": "\u221D",
  "&Pscr;": "\u{1D4AB}",
  "&Psi;": "\u03A8",
  "&QUOT": '"',
  "&QUOT;": '"',
  "&Qfr;": "\u{1D514}",
  "&Qopf;": "\u211A",
  "&Qscr;": "\u{1D4AC}",
  "&RBarr;": "\u2910",
  "&REG": "\xAE",
  "&REG;": "\xAE",
  "&Racute;": "\u0154",
  "&Rang;": "\u27EB",
  "&Rarr;": "\u21A0",
  "&Rarrtl;": "\u2916",
  "&Rcaron;": "\u0158",
  "&Rcedil;": "\u0156",
  "&Rcy;": "\u0420",
  "&Re;": "\u211C",
  "&ReverseElement;": "\u220B",
  "&ReverseEquilibrium;": "\u21CB",
  "&ReverseUpEquilibrium;": "\u296F",
  "&Rfr;": "\u211C",
  "&Rho;": "\u03A1",
  "&RightAngleBracket;": "\u27E9",
  "&RightArrow;": "\u2192",
  "&RightArrowBar;": "\u21E5",
  "&RightArrowLeftArrow;": "\u21C4",
  "&RightCeiling;": "\u2309",
  "&RightDoubleBracket;": "\u27E7",
  "&RightDownTeeVector;": "\u295D",
  "&RightDownVector;": "\u21C2",
  "&RightDownVectorBar;": "\u2955",
  "&RightFloor;": "\u230B",
  "&RightTee;": "\u22A2",
  "&RightTeeArrow;": "\u21A6",
  "&RightTeeVector;": "\u295B",
  "&RightTriangle;": "\u22B3",
  "&RightTriangleBar;": "\u29D0",
  "&RightTriangleEqual;": "\u22B5",
  "&RightUpDownVector;": "\u294F",
  "&RightUpTeeVector;": "\u295C",
  "&RightUpVector;": "\u21BE",
  "&RightUpVectorBar;": "\u2954",
  "&RightVector;": "\u21C0",
  "&RightVectorBar;": "\u2953",
  "&Rightarrow;": "\u21D2",
  "&Ropf;": "\u211D",
  "&RoundImplies;": "\u2970",
  "&Rrightarrow;": "\u21DB",
  "&Rscr;": "\u211B",
  "&Rsh;": "\u21B1",
  "&RuleDelayed;": "\u29F4",
  "&SHCHcy;": "\u0429",
  "&SHcy;": "\u0428",
  "&SOFTcy;": "\u042C",
  "&Sacute;": "\u015A",
  "&Sc;": "\u2ABC",
  "&Scaron;": "\u0160",
  "&Scedil;": "\u015E",
  "&Scirc;": "\u015C",
  "&Scy;": "\u0421",
  "&Sfr;": "\u{1D516}",
  "&ShortDownArrow;": "\u2193",
  "&ShortLeftArrow;": "\u2190",
  "&ShortRightArrow;": "\u2192",
  "&ShortUpArrow;": "\u2191",
  "&Sigma;": "\u03A3",
  "&SmallCircle;": "\u2218",
  "&Sopf;": "\u{1D54A}",
  "&Sqrt;": "\u221A",
  "&Square;": "\u25A1",
  "&SquareIntersection;": "\u2293",
  "&SquareSubset;": "\u228F",
  "&SquareSubsetEqual;": "\u2291",
  "&SquareSuperset;": "\u2290",
  "&SquareSupersetEqual;": "\u2292",
  "&SquareUnion;": "\u2294",
  "&Sscr;": "\u{1D4AE}",
  "&Star;": "\u22C6",
  "&Sub;": "\u22D0",
  "&Subset;": "\u22D0",
  "&SubsetEqual;": "\u2286",
  "&Succeeds;": "\u227B",
  "&SucceedsEqual;": "\u2AB0",
  "&SucceedsSlantEqual;": "\u227D",
  "&SucceedsTilde;": "\u227F",
  "&SuchThat;": "\u220B",
  "&Sum;": "\u2211",
  "&Sup;": "\u22D1",
  "&Superset;": "\u2283",
  "&SupersetEqual;": "\u2287",
  "&Supset;": "\u22D1",
  "&THORN": "\xDE",
  "&THORN;": "\xDE",
  "&TRADE;": "\u2122",
  "&TSHcy;": "\u040B",
  "&TScy;": "\u0426",
  "&Tab;": "	",
  "&Tau;": "\u03A4",
  "&Tcaron;": "\u0164",
  "&Tcedil;": "\u0162",
  "&Tcy;": "\u0422",
  "&Tfr;": "\u{1D517}",
  "&Therefore;": "\u2234",
  "&Theta;": "\u0398",
  "&ThickSpace;": "\u205F\u200A",
  "&ThinSpace;": "\u2009",
  "&Tilde;": "\u223C",
  "&TildeEqual;": "\u2243",
  "&TildeFullEqual;": "\u2245",
  "&TildeTilde;": "\u2248",
  "&Topf;": "\u{1D54B}",
  "&TripleDot;": "\u20DB",
  "&Tscr;": "\u{1D4AF}",
  "&Tstrok;": "\u0166",
  "&Uacute": "\xDA",
  "&Uacute;": "\xDA",
  "&Uarr;": "\u219F",
  "&Uarrocir;": "\u2949",
  "&Ubrcy;": "\u040E",
  "&Ubreve;": "\u016C",
  "&Ucirc": "\xDB",
  "&Ucirc;": "\xDB",
  "&Ucy;": "\u0423",
  "&Udblac;": "\u0170",
  "&Ufr;": "\u{1D518}",
  "&Ugrave": "\xD9",
  "&Ugrave;": "\xD9",
  "&Umacr;": "\u016A",
  "&UnderBar;": "_",
  "&UnderBrace;": "\u23DF",
  "&UnderBracket;": "\u23B5",
  "&UnderParenthesis;": "\u23DD",
  "&Union;": "\u22C3",
  "&UnionPlus;": "\u228E",
  "&Uogon;": "\u0172",
  "&Uopf;": "\u{1D54C}",
  "&UpArrow;": "\u2191",
  "&UpArrowBar;": "\u2912",
  "&UpArrowDownArrow;": "\u21C5",
  "&UpDownArrow;": "\u2195",
  "&UpEquilibrium;": "\u296E",
  "&UpTee;": "\u22A5",
  "&UpTeeArrow;": "\u21A5",
  "&Uparrow;": "\u21D1",
  "&Updownarrow;": "\u21D5",
  "&UpperLeftArrow;": "\u2196",
  "&UpperRightArrow;": "\u2197",
  "&Upsi;": "\u03D2",
  "&Upsilon;": "\u03A5",
  "&Uring;": "\u016E",
  "&Uscr;": "\u{1D4B0}",
  "&Utilde;": "\u0168",
  "&Uuml": "\xDC",
  "&Uuml;": "\xDC",
  "&VDash;": "\u22AB",
  "&Vbar;": "\u2AEB",
  "&Vcy;": "\u0412",
  "&Vdash;": "\u22A9",
  "&Vdashl;": "\u2AE6",
  "&Vee;": "\u22C1",
  "&Verbar;": "\u2016",
  "&Vert;": "\u2016",
  "&VerticalBar;": "\u2223",
  "&VerticalLine;": "|",
  "&VerticalSeparator;": "\u2758",
  "&VerticalTilde;": "\u2240",
  "&VeryThinSpace;": "\u200A",
  "&Vfr;": "\u{1D519}",
  "&Vopf;": "\u{1D54D}",
  "&Vscr;": "\u{1D4B1}",
  "&Vvdash;": "\u22AA",
  "&Wcirc;": "\u0174",
  "&Wedge;": "\u22C0",
  "&Wfr;": "\u{1D51A}",
  "&Wopf;": "\u{1D54E}",
  "&Wscr;": "\u{1D4B2}",
  "&Xfr;": "\u{1D51B}",
  "&Xi;": "\u039E",
  "&Xopf;": "\u{1D54F}",
  "&Xscr;": "\u{1D4B3}",
  "&YAcy;": "\u042F",
  "&YIcy;": "\u0407",
  "&YUcy;": "\u042E",
  "&Yacute": "\xDD",
  "&Yacute;": "\xDD",
  "&Ycirc;": "\u0176",
  "&Ycy;": "\u042B",
  "&Yfr;": "\u{1D51C}",
  "&Yopf;": "\u{1D550}",
  "&Yscr;": "\u{1D4B4}",
  "&Yuml;": "\u0178",
  "&ZHcy;": "\u0416",
  "&Zacute;": "\u0179",
  "&Zcaron;": "\u017D",
  "&Zcy;": "\u0417",
  "&Zdot;": "\u017B",
  "&ZeroWidthSpace;": "\u200B",
  "&Zeta;": "\u0396",
  "&Zfr;": "\u2128",
  "&Zopf;": "\u2124",
  "&Zscr;": "\u{1D4B5}",
  "&aacute": "\xE1",
  "&aacute;": "\xE1",
  "&abreve;": "\u0103",
  "&ac;": "\u223E",
  "&acE;": "\u223E\u0333",
  "&acd;": "\u223F",
  "&acirc": "\xE2",
  "&acirc;": "\xE2",
  "&acute": "\xB4",
  "&acute;": "\xB4",
  "&acy;": "\u0430",
  "&aelig": "\xE6",
  "&aelig;": "\xE6",
  "&af;": "\u2061",
  "&afr;": "\u{1D51E}",
  "&agrave": "\xE0",
  "&agrave;": "\xE0",
  "&alefsym;": "\u2135",
  "&aleph;": "\u2135",
  "&alpha;": "\u03B1",
  "&amacr;": "\u0101",
  "&amalg;": "\u2A3F",
  "&amp": "&",
  "&amp;": "&",
  "&and;": "\u2227",
  "&andand;": "\u2A55",
  "&andd;": "\u2A5C",
  "&andslope;": "\u2A58",
  "&andv;": "\u2A5A",
  "&ang;": "\u2220",
  "&ange;": "\u29A4",
  "&angle;": "\u2220",
  "&angmsd;": "\u2221",
  "&angmsdaa;": "\u29A8",
  "&angmsdab;": "\u29A9",
  "&angmsdac;": "\u29AA",
  "&angmsdad;": "\u29AB",
  "&angmsdae;": "\u29AC",
  "&angmsdaf;": "\u29AD",
  "&angmsdag;": "\u29AE",
  "&angmsdah;": "\u29AF",
  "&angrt;": "\u221F",
  "&angrtvb;": "\u22BE",
  "&angrtvbd;": "\u299D",
  "&angsph;": "\u2222",
  "&angst;": "\xC5",
  "&angzarr;": "\u237C",
  "&aogon;": "\u0105",
  "&aopf;": "\u{1D552}",
  "&ap;": "\u2248",
  "&apE;": "\u2A70",
  "&apacir;": "\u2A6F",
  "&ape;": "\u224A",
  "&apid;": "\u224B",
  "&apos;": "'",
  "&approx;": "\u2248",
  "&approxeq;": "\u224A",
  "&aring": "\xE5",
  "&aring;": "\xE5",
  "&ascr;": "\u{1D4B6}",
  "&ast;": "*",
  "&asymp;": "\u2248",
  "&asympeq;": "\u224D",
  "&atilde": "\xE3",
  "&atilde;": "\xE3",
  "&auml": "\xE4",
  "&auml;": "\xE4",
  "&awconint;": "\u2233",
  "&awint;": "\u2A11",
  "&bNot;": "\u2AED",
  "&backcong;": "\u224C",
  "&backepsilon;": "\u03F6",
  "&backprime;": "\u2035",
  "&backsim;": "\u223D",
  "&backsimeq;": "\u22CD",
  "&barvee;": "\u22BD",
  "&barwed;": "\u2305",
  "&barwedge;": "\u2305",
  "&bbrk;": "\u23B5",
  "&bbrktbrk;": "\u23B6",
  "&bcong;": "\u224C",
  "&bcy;": "\u0431",
  "&bdquo;": "\u201E",
  "&becaus;": "\u2235",
  "&because;": "\u2235",
  "&bemptyv;": "\u29B0",
  "&bepsi;": "\u03F6",
  "&bernou;": "\u212C",
  "&beta;": "\u03B2",
  "&beth;": "\u2136",
  "&between;": "\u226C",
  "&bfr;": "\u{1D51F}",
  "&bigcap;": "\u22C2",
  "&bigcirc;": "\u25EF",
  "&bigcup;": "\u22C3",
  "&bigodot;": "\u2A00",
  "&bigoplus;": "\u2A01",
  "&bigotimes;": "\u2A02",
  "&bigsqcup;": "\u2A06",
  "&bigstar;": "\u2605",
  "&bigtriangledown;": "\u25BD",
  "&bigtriangleup;": "\u25B3",
  "&biguplus;": "\u2A04",
  "&bigvee;": "\u22C1",
  "&bigwedge;": "\u22C0",
  "&bkarow;": "\u290D",
  "&blacklozenge;": "\u29EB",
  "&blacksquare;": "\u25AA",
  "&blacktriangle;": "\u25B4",
  "&blacktriangledown;": "\u25BE",
  "&blacktriangleleft;": "\u25C2",
  "&blacktriangleright;": "\u25B8",
  "&blank;": "\u2423",
  "&blk12;": "\u2592",
  "&blk14;": "\u2591",
  "&blk34;": "\u2593",
  "&block;": "\u2588",
  "&bne;": "=\u20E5",
  "&bnequiv;": "\u2261\u20E5",
  "&bnot;": "\u2310",
  "&bopf;": "\u{1D553}",
  "&bot;": "\u22A5",
  "&bottom;": "\u22A5",
  "&bowtie;": "\u22C8",
  "&boxDL;": "\u2557",
  "&boxDR;": "\u2554",
  "&boxDl;": "\u2556",
  "&boxDr;": "\u2553",
  "&boxH;": "\u2550",
  "&boxHD;": "\u2566",
  "&boxHU;": "\u2569",
  "&boxHd;": "\u2564",
  "&boxHu;": "\u2567",
  "&boxUL;": "\u255D",
  "&boxUR;": "\u255A",
  "&boxUl;": "\u255C",
  "&boxUr;": "\u2559",
  "&boxV;": "\u2551",
  "&boxVH;": "\u256C",
  "&boxVL;": "\u2563",
  "&boxVR;": "\u2560",
  "&boxVh;": "\u256B",
  "&boxVl;": "\u2562",
  "&boxVr;": "\u255F",
  "&boxbox;": "\u29C9",
  "&boxdL;": "\u2555",
  "&boxdR;": "\u2552",
  "&boxdl;": "\u2510",
  "&boxdr;": "\u250C",
  "&boxh;": "\u2500",
  "&boxhD;": "\u2565",
  "&boxhU;": "\u2568",
  "&boxhd;": "\u252C",
  "&boxhu;": "\u2534",
  "&boxminus;": "\u229F",
  "&boxplus;": "\u229E",
  "&boxtimes;": "\u22A0",
  "&boxuL;": "\u255B",
  "&boxuR;": "\u2558",
  "&boxul;": "\u2518",
  "&boxur;": "\u2514",
  "&boxv;": "\u2502",
  "&boxvH;": "\u256A",
  "&boxvL;": "\u2561",
  "&boxvR;": "\u255E",
  "&boxvh;": "\u253C",
  "&boxvl;": "\u2524",
  "&boxvr;": "\u251C",
  "&bprime;": "\u2035",
  "&breve;": "\u02D8",
  "&brvbar": "\xA6",
  "&brvbar;": "\xA6",
  "&bscr;": "\u{1D4B7}",
  "&bsemi;": "\u204F",
  "&bsim;": "\u223D",
  "&bsime;": "\u22CD",
  "&bsol;": "\\",
  "&bsolb;": "\u29C5",
  "&bsolhsub;": "\u27C8",
  "&bull;": "\u2022",
  "&bullet;": "\u2022",
  "&bump;": "\u224E",
  "&bumpE;": "\u2AAE",
  "&bumpe;": "\u224F",
  "&bumpeq;": "\u224F",
  "&cacute;": "\u0107",
  "&cap;": "\u2229",
  "&capand;": "\u2A44",
  "&capbrcup;": "\u2A49",
  "&capcap;": "\u2A4B",
  "&capcup;": "\u2A47",
  "&capdot;": "\u2A40",
  "&caps;": "\u2229\uFE00",
  "&caret;": "\u2041",
  "&caron;": "\u02C7",
  "&ccaps;": "\u2A4D",
  "&ccaron;": "\u010D",
  "&ccedil": "\xE7",
  "&ccedil;": "\xE7",
  "&ccirc;": "\u0109",
  "&ccups;": "\u2A4C",
  "&ccupssm;": "\u2A50",
  "&cdot;": "\u010B",
  "&cedil": "\xB8",
  "&cedil;": "\xB8",
  "&cemptyv;": "\u29B2",
  "&cent": "\xA2",
  "&cent;": "\xA2",
  "&centerdot;": "\xB7",
  "&cfr;": "\u{1D520}",
  "&chcy;": "\u0447",
  "&check;": "\u2713",
  "&checkmark;": "\u2713",
  "&chi;": "\u03C7",
  "&cir;": "\u25CB",
  "&cirE;": "\u29C3",
  "&circ;": "\u02C6",
  "&circeq;": "\u2257",
  "&circlearrowleft;": "\u21BA",
  "&circlearrowright;": "\u21BB",
  "&circledR;": "\xAE",
  "&circledS;": "\u24C8",
  "&circledast;": "\u229B",
  "&circledcirc;": "\u229A",
  "&circleddash;": "\u229D",
  "&cire;": "\u2257",
  "&cirfnint;": "\u2A10",
  "&cirmid;": "\u2AEF",
  "&cirscir;": "\u29C2",
  "&clubs;": "\u2663",
  "&clubsuit;": "\u2663",
  "&colon;": ":",
  "&colone;": "\u2254",
  "&coloneq;": "\u2254",
  "&comma;": ",",
  "&commat;": "@",
  "&comp;": "\u2201",
  "&compfn;": "\u2218",
  "&complement;": "\u2201",
  "&complexes;": "\u2102",
  "&cong;": "\u2245",
  "&congdot;": "\u2A6D",
  "&conint;": "\u222E",
  "&copf;": "\u{1D554}",
  "&coprod;": "\u2210",
  "&copy": "\xA9",
  "&copy;": "\xA9",
  "&copysr;": "\u2117",
  "&crarr;": "\u21B5",
  "&cross;": "\u2717",
  "&cscr;": "\u{1D4B8}",
  "&csub;": "\u2ACF",
  "&csube;": "\u2AD1",
  "&csup;": "\u2AD0",
  "&csupe;": "\u2AD2",
  "&ctdot;": "\u22EF",
  "&cudarrl;": "\u2938",
  "&cudarrr;": "\u2935",
  "&cuepr;": "\u22DE",
  "&cuesc;": "\u22DF",
  "&cularr;": "\u21B6",
  "&cularrp;": "\u293D",
  "&cup;": "\u222A",
  "&cupbrcap;": "\u2A48",
  "&cupcap;": "\u2A46",
  "&cupcup;": "\u2A4A",
  "&cupdot;": "\u228D",
  "&cupor;": "\u2A45",
  "&cups;": "\u222A\uFE00",
  "&curarr;": "\u21B7",
  "&curarrm;": "\u293C",
  "&curlyeqprec;": "\u22DE",
  "&curlyeqsucc;": "\u22DF",
  "&curlyvee;": "\u22CE",
  "&curlywedge;": "\u22CF",
  "&curren": "\xA4",
  "&curren;": "\xA4",
  "&curvearrowleft;": "\u21B6",
  "&curvearrowright;": "\u21B7",
  "&cuvee;": "\u22CE",
  "&cuwed;": "\u22CF",
  "&cwconint;": "\u2232",
  "&cwint;": "\u2231",
  "&cylcty;": "\u232D",
  "&dArr;": "\u21D3",
  "&dHar;": "\u2965",
  "&dagger;": "\u2020",
  "&daleth;": "\u2138",
  "&darr;": "\u2193",
  "&dash;": "\u2010",
  "&dashv;": "\u22A3",
  "&dbkarow;": "\u290F",
  "&dblac;": "\u02DD",
  "&dcaron;": "\u010F",
  "&dcy;": "\u0434",
  "&dd;": "\u2146",
  "&ddagger;": "\u2021",
  "&ddarr;": "\u21CA",
  "&ddotseq;": "\u2A77",
  "&deg": "\xB0",
  "&deg;": "\xB0",
  "&delta;": "\u03B4",
  "&demptyv;": "\u29B1",
  "&dfisht;": "\u297F",
  "&dfr;": "\u{1D521}",
  "&dharl;": "\u21C3",
  "&dharr;": "\u21C2",
  "&diam;": "\u22C4",
  "&diamond;": "\u22C4",
  "&diamondsuit;": "\u2666",
  "&diams;": "\u2666",
  "&die;": "\xA8",
  "&digamma;": "\u03DD",
  "&disin;": "\u22F2",
  "&div;": "\xF7",
  "&divide": "\xF7",
  "&divide;": "\xF7",
  "&divideontimes;": "\u22C7",
  "&divonx;": "\u22C7",
  "&djcy;": "\u0452",
  "&dlcorn;": "\u231E",
  "&dlcrop;": "\u230D",
  "&dollar;": "$",
  "&dopf;": "\u{1D555}",
  "&dot;": "\u02D9",
  "&doteq;": "\u2250",
  "&doteqdot;": "\u2251",
  "&dotminus;": "\u2238",
  "&dotplus;": "\u2214",
  "&dotsquare;": "\u22A1",
  "&doublebarwedge;": "\u2306",
  "&downarrow;": "\u2193",
  "&downdownarrows;": "\u21CA",
  "&downharpoonleft;": "\u21C3",
  "&downharpoonright;": "\u21C2",
  "&drbkarow;": "\u2910",
  "&drcorn;": "\u231F",
  "&drcrop;": "\u230C",
  "&dscr;": "\u{1D4B9}",
  "&dscy;": "\u0455",
  "&dsol;": "\u29F6",
  "&dstrok;": "\u0111",
  "&dtdot;": "\u22F1",
  "&dtri;": "\u25BF",
  "&dtrif;": "\u25BE",
  "&duarr;": "\u21F5",
  "&duhar;": "\u296F",
  "&dwangle;": "\u29A6",
  "&dzcy;": "\u045F",
  "&dzigrarr;": "\u27FF",
  "&eDDot;": "\u2A77",
  "&eDot;": "\u2251",
  "&eacute": "\xE9",
  "&eacute;": "\xE9",
  "&easter;": "\u2A6E",
  "&ecaron;": "\u011B",
  "&ecir;": "\u2256",
  "&ecirc": "\xEA",
  "&ecirc;": "\xEA",
  "&ecolon;": "\u2255",
  "&ecy;": "\u044D",
  "&edot;": "\u0117",
  "&ee;": "\u2147",
  "&efDot;": "\u2252",
  "&efr;": "\u{1D522}",
  "&eg;": "\u2A9A",
  "&egrave": "\xE8",
  "&egrave;": "\xE8",
  "&egs;": "\u2A96",
  "&egsdot;": "\u2A98",
  "&el;": "\u2A99",
  "&elinters;": "\u23E7",
  "&ell;": "\u2113",
  "&els;": "\u2A95",
  "&elsdot;": "\u2A97",
  "&emacr;": "\u0113",
  "&empty;": "\u2205",
  "&emptyset;": "\u2205",
  "&emptyv;": "\u2205",
  "&emsp13;": "\u2004",
  "&emsp14;": "\u2005",
  "&emsp;": "\u2003",
  "&eng;": "\u014B",
  "&ensp;": "\u2002",
  "&eogon;": "\u0119",
  "&eopf;": "\u{1D556}",
  "&epar;": "\u22D5",
  "&eparsl;": "\u29E3",
  "&eplus;": "\u2A71",
  "&epsi;": "\u03B5",
  "&epsilon;": "\u03B5",
  "&epsiv;": "\u03F5",
  "&eqcirc;": "\u2256",
  "&eqcolon;": "\u2255",
  "&eqsim;": "\u2242",
  "&eqslantgtr;": "\u2A96",
  "&eqslantless;": "\u2A95",
  "&equals;": "=",
  "&equest;": "\u225F",
  "&equiv;": "\u2261",
  "&equivDD;": "\u2A78",
  "&eqvparsl;": "\u29E5",
  "&erDot;": "\u2253",
  "&erarr;": "\u2971",
  "&escr;": "\u212F",
  "&esdot;": "\u2250",
  "&esim;": "\u2242",
  "&eta;": "\u03B7",
  "&eth": "\xF0",
  "&eth;": "\xF0",
  "&euml": "\xEB",
  "&euml;": "\xEB",
  "&euro;": "\u20AC",
  "&excl;": "!",
  "&exist;": "\u2203",
  "&expectation;": "\u2130",
  "&exponentiale;": "\u2147",
  "&fallingdotseq;": "\u2252",
  "&fcy;": "\u0444",
  "&female;": "\u2640",
  "&ffilig;": "\uFB03",
  "&fflig;": "\uFB00",
  "&ffllig;": "\uFB04",
  "&ffr;": "\u{1D523}",
  "&filig;": "\uFB01",
  "&fjlig;": "fj",
  "&flat;": "\u266D",
  "&fllig;": "\uFB02",
  "&fltns;": "\u25B1",
  "&fnof;": "\u0192",
  "&fopf;": "\u{1D557}",
  "&forall;": "\u2200",
  "&fork;": "\u22D4",
  "&forkv;": "\u2AD9",
  "&fpartint;": "\u2A0D",
  "&frac12": "\xBD",
  "&frac12;": "\xBD",
  "&frac13;": "\u2153",
  "&frac14": "\xBC",
  "&frac14;": "\xBC",
  "&frac15;": "\u2155",
  "&frac16;": "\u2159",
  "&frac18;": "\u215B",
  "&frac23;": "\u2154",
  "&frac25;": "\u2156",
  "&frac34": "\xBE",
  "&frac34;": "\xBE",
  "&frac35;": "\u2157",
  "&frac38;": "\u215C",
  "&frac45;": "\u2158",
  "&frac56;": "\u215A",
  "&frac58;": "\u215D",
  "&frac78;": "\u215E",
  "&frasl;": "\u2044",
  "&frown;": "\u2322",
  "&fscr;": "\u{1D4BB}",
  "&gE;": "\u2267",
  "&gEl;": "\u2A8C",
  "&gacute;": "\u01F5",
  "&gamma;": "\u03B3",
  "&gammad;": "\u03DD",
  "&gap;": "\u2A86",
  "&gbreve;": "\u011F",
  "&gcirc;": "\u011D",
  "&gcy;": "\u0433",
  "&gdot;": "\u0121",
  "&ge;": "\u2265",
  "&gel;": "\u22DB",
  "&geq;": "\u2265",
  "&geqq;": "\u2267",
  "&geqslant;": "\u2A7E",
  "&ges;": "\u2A7E",
  "&gescc;": "\u2AA9",
  "&gesdot;": "\u2A80",
  "&gesdoto;": "\u2A82",
  "&gesdotol;": "\u2A84",
  "&gesl;": "\u22DB\uFE00",
  "&gesles;": "\u2A94",
  "&gfr;": "\u{1D524}",
  "&gg;": "\u226B",
  "&ggg;": "\u22D9",
  "&gimel;": "\u2137",
  "&gjcy;": "\u0453",
  "&gl;": "\u2277",
  "&glE;": "\u2A92",
  "&gla;": "\u2AA5",
  "&glj;": "\u2AA4",
  "&gnE;": "\u2269",
  "&gnap;": "\u2A8A",
  "&gnapprox;": "\u2A8A",
  "&gne;": "\u2A88",
  "&gneq;": "\u2A88",
  "&gneqq;": "\u2269",
  "&gnsim;": "\u22E7",
  "&gopf;": "\u{1D558}",
  "&grave;": "`",
  "&gscr;": "\u210A",
  "&gsim;": "\u2273",
  "&gsime;": "\u2A8E",
  "&gsiml;": "\u2A90",
  "&gt": ">",
  "&gt;": ">",
  "&gtcc;": "\u2AA7",
  "&gtcir;": "\u2A7A",
  "&gtdot;": "\u22D7",
  "&gtlPar;": "\u2995",
  "&gtquest;": "\u2A7C",
  "&gtrapprox;": "\u2A86",
  "&gtrarr;": "\u2978",
  "&gtrdot;": "\u22D7",
  "&gtreqless;": "\u22DB",
  "&gtreqqless;": "\u2A8C",
  "&gtrless;": "\u2277",
  "&gtrsim;": "\u2273",
  "&gvertneqq;": "\u2269\uFE00",
  "&gvnE;": "\u2269\uFE00",
  "&hArr;": "\u21D4",
  "&hairsp;": "\u200A",
  "&half;": "\xBD",
  "&hamilt;": "\u210B",
  "&hardcy;": "\u044A",
  "&harr;": "\u2194",
  "&harrcir;": "\u2948",
  "&harrw;": "\u21AD",
  "&hbar;": "\u210F",
  "&hcirc;": "\u0125",
  "&hearts;": "\u2665",
  "&heartsuit;": "\u2665",
  "&hellip;": "\u2026",
  "&hercon;": "\u22B9",
  "&hfr;": "\u{1D525}",
  "&hksearow;": "\u2925",
  "&hkswarow;": "\u2926",
  "&hoarr;": "\u21FF",
  "&homtht;": "\u223B",
  "&hookleftarrow;": "\u21A9",
  "&hookrightarrow;": "\u21AA",
  "&hopf;": "\u{1D559}",
  "&horbar;": "\u2015",
  "&hscr;": "\u{1D4BD}",
  "&hslash;": "\u210F",
  "&hstrok;": "\u0127",
  "&hybull;": "\u2043",
  "&hyphen;": "\u2010",
  "&iacute": "\xED",
  "&iacute;": "\xED",
  "&ic;": "\u2063",
  "&icirc": "\xEE",
  "&icirc;": "\xEE",
  "&icy;": "\u0438",
  "&iecy;": "\u0435",
  "&iexcl": "\xA1",
  "&iexcl;": "\xA1",
  "&iff;": "\u21D4",
  "&ifr;": "\u{1D526}",
  "&igrave": "\xEC",
  "&igrave;": "\xEC",
  "&ii;": "\u2148",
  "&iiiint;": "\u2A0C",
  "&iiint;": "\u222D",
  "&iinfin;": "\u29DC",
  "&iiota;": "\u2129",
  "&ijlig;": "\u0133",
  "&imacr;": "\u012B",
  "&image;": "\u2111",
  "&imagline;": "\u2110",
  "&imagpart;": "\u2111",
  "&imath;": "\u0131",
  "&imof;": "\u22B7",
  "&imped;": "\u01B5",
  "&in;": "\u2208",
  "&incare;": "\u2105",
  "&infin;": "\u221E",
  "&infintie;": "\u29DD",
  "&inodot;": "\u0131",
  "&int;": "\u222B",
  "&intcal;": "\u22BA",
  "&integers;": "\u2124",
  "&intercal;": "\u22BA",
  "&intlarhk;": "\u2A17",
  "&intprod;": "\u2A3C",
  "&iocy;": "\u0451",
  "&iogon;": "\u012F",
  "&iopf;": "\u{1D55A}",
  "&iota;": "\u03B9",
  "&iprod;": "\u2A3C",
  "&iquest": "\xBF",
  "&iquest;": "\xBF",
  "&iscr;": "\u{1D4BE}",
  "&isin;": "\u2208",
  "&isinE;": "\u22F9",
  "&isindot;": "\u22F5",
  "&isins;": "\u22F4",
  "&isinsv;": "\u22F3",
  "&isinv;": "\u2208",
  "&it;": "\u2062",
  "&itilde;": "\u0129",
  "&iukcy;": "\u0456",
  "&iuml": "\xEF",
  "&iuml;": "\xEF",
  "&jcirc;": "\u0135",
  "&jcy;": "\u0439",
  "&jfr;": "\u{1D527}",
  "&jmath;": "\u0237",
  "&jopf;": "\u{1D55B}",
  "&jscr;": "\u{1D4BF}",
  "&jsercy;": "\u0458",
  "&jukcy;": "\u0454",
  "&kappa;": "\u03BA",
  "&kappav;": "\u03F0",
  "&kcedil;": "\u0137",
  "&kcy;": "\u043A",
  "&kfr;": "\u{1D528}",
  "&kgreen;": "\u0138",
  "&khcy;": "\u0445",
  "&kjcy;": "\u045C",
  "&kopf;": "\u{1D55C}",
  "&kscr;": "\u{1D4C0}",
  "&lAarr;": "\u21DA",
  "&lArr;": "\u21D0",
  "&lAtail;": "\u291B",
  "&lBarr;": "\u290E",
  "&lE;": "\u2266",
  "&lEg;": "\u2A8B",
  "&lHar;": "\u2962",
  "&lacute;": "\u013A",
  "&laemptyv;": "\u29B4",
  "&lagran;": "\u2112",
  "&lambda;": "\u03BB",
  "&lang;": "\u27E8",
  "&langd;": "\u2991",
  "&langle;": "\u27E8",
  "&lap;": "\u2A85",
  "&laquo": "\xAB",
  "&laquo;": "\xAB",
  "&larr;": "\u2190",
  "&larrb;": "\u21E4",
  "&larrbfs;": "\u291F",
  "&larrfs;": "\u291D",
  "&larrhk;": "\u21A9",
  "&larrlp;": "\u21AB",
  "&larrpl;": "\u2939",
  "&larrsim;": "\u2973",
  "&larrtl;": "\u21A2",
  "&lat;": "\u2AAB",
  "&latail;": "\u2919",
  "&late;": "\u2AAD",
  "&lates;": "\u2AAD\uFE00",
  "&lbarr;": "\u290C",
  "&lbbrk;": "\u2772",
  "&lbrace;": "{",
  "&lbrack;": "[",
  "&lbrke;": "\u298B",
  "&lbrksld;": "\u298F",
  "&lbrkslu;": "\u298D",
  "&lcaron;": "\u013E",
  "&lcedil;": "\u013C",
  "&lceil;": "\u2308",
  "&lcub;": "{",
  "&lcy;": "\u043B",
  "&ldca;": "\u2936",
  "&ldquo;": "\u201C",
  "&ldquor;": "\u201E",
  "&ldrdhar;": "\u2967",
  "&ldrushar;": "\u294B",
  "&ldsh;": "\u21B2",
  "&le;": "\u2264",
  "&leftarrow;": "\u2190",
  "&leftarrowtail;": "\u21A2",
  "&leftharpoondown;": "\u21BD",
  "&leftharpoonup;": "\u21BC",
  "&leftleftarrows;": "\u21C7",
  "&leftrightarrow;": "\u2194",
  "&leftrightarrows;": "\u21C6",
  "&leftrightharpoons;": "\u21CB",
  "&leftrightsquigarrow;": "\u21AD",
  "&leftthreetimes;": "\u22CB",
  "&leg;": "\u22DA",
  "&leq;": "\u2264",
  "&leqq;": "\u2266",
  "&leqslant;": "\u2A7D",
  "&les;": "\u2A7D",
  "&lescc;": "\u2AA8",
  "&lesdot;": "\u2A7F",
  "&lesdoto;": "\u2A81",
  "&lesdotor;": "\u2A83",
  "&lesg;": "\u22DA\uFE00",
  "&lesges;": "\u2A93",
  "&lessapprox;": "\u2A85",
  "&lessdot;": "\u22D6",
  "&lesseqgtr;": "\u22DA",
  "&lesseqqgtr;": "\u2A8B",
  "&lessgtr;": "\u2276",
  "&lesssim;": "\u2272",
  "&lfisht;": "\u297C",
  "&lfloor;": "\u230A",
  "&lfr;": "\u{1D529}",
  "&lg;": "\u2276",
  "&lgE;": "\u2A91",
  "&lhard;": "\u21BD",
  "&lharu;": "\u21BC",
  "&lharul;": "\u296A",
  "&lhblk;": "\u2584",
  "&ljcy;": "\u0459",
  "&ll;": "\u226A",
  "&llarr;": "\u21C7",
  "&llcorner;": "\u231E",
  "&llhard;": "\u296B",
  "&lltri;": "\u25FA",
  "&lmidot;": "\u0140",
  "&lmoust;": "\u23B0",
  "&lmoustache;": "\u23B0",
  "&lnE;": "\u2268",
  "&lnap;": "\u2A89",
  "&lnapprox;": "\u2A89",
  "&lne;": "\u2A87",
  "&lneq;": "\u2A87",
  "&lneqq;": "\u2268",
  "&lnsim;": "\u22E6",
  "&loang;": "\u27EC",
  "&loarr;": "\u21FD",
  "&lobrk;": "\u27E6",
  "&longleftarrow;": "\u27F5",
  "&longleftrightarrow;": "\u27F7",
  "&longmapsto;": "\u27FC",
  "&longrightarrow;": "\u27F6",
  "&looparrowleft;": "\u21AB",
  "&looparrowright;": "\u21AC",
  "&lopar;": "\u2985",
  "&lopf;": "\u{1D55D}",
  "&loplus;": "\u2A2D",
  "&lotimes;": "\u2A34",
  "&lowast;": "\u2217",
  "&lowbar;": "_",
  "&loz;": "\u25CA",
  "&lozenge;": "\u25CA",
  "&lozf;": "\u29EB",
  "&lpar;": "(",
  "&lparlt;": "\u2993",
  "&lrarr;": "\u21C6",
  "&lrcorner;": "\u231F",
  "&lrhar;": "\u21CB",
  "&lrhard;": "\u296D",
  "&lrm;": "\u200E",
  "&lrtri;": "\u22BF",
  "&lsaquo;": "\u2039",
  "&lscr;": "\u{1D4C1}",
  "&lsh;": "\u21B0",
  "&lsim;": "\u2272",
  "&lsime;": "\u2A8D",
  "&lsimg;": "\u2A8F",
  "&lsqb;": "[",
  "&lsquo;": "\u2018",
  "&lsquor;": "\u201A",
  "&lstrok;": "\u0142",
  "&lt": "<",
  "&lt;": "<",
  "&ltcc;": "\u2AA6",
  "&ltcir;": "\u2A79",
  "&ltdot;": "\u22D6",
  "&lthree;": "\u22CB",
  "&ltimes;": "\u22C9",
  "&ltlarr;": "\u2976",
  "&ltquest;": "\u2A7B",
  "&ltrPar;": "\u2996",
  "&ltri;": "\u25C3",
  "&ltrie;": "\u22B4",
  "&ltrif;": "\u25C2",
  "&lurdshar;": "\u294A",
  "&luruhar;": "\u2966",
  "&lvertneqq;": "\u2268\uFE00",
  "&lvnE;": "\u2268\uFE00",
  "&mDDot;": "\u223A",
  "&macr": "\xAF",
  "&macr;": "\xAF",
  "&male;": "\u2642",
  "&malt;": "\u2720",
  "&maltese;": "\u2720",
  "&map;": "\u21A6",
  "&mapsto;": "\u21A6",
  "&mapstodown;": "\u21A7",
  "&mapstoleft;": "\u21A4",
  "&mapstoup;": "\u21A5",
  "&marker;": "\u25AE",
  "&mcomma;": "\u2A29",
  "&mcy;": "\u043C",
  "&mdash;": "\u2014",
  "&measuredangle;": "\u2221",
  "&mfr;": "\u{1D52A}",
  "&mho;": "\u2127",
  "&micro": "\xB5",
  "&micro;": "\xB5",
  "&mid;": "\u2223",
  "&midast;": "*",
  "&midcir;": "\u2AF0",
  "&middot": "\xB7",
  "&middot;": "\xB7",
  "&minus;": "\u2212",
  "&minusb;": "\u229F",
  "&minusd;": "\u2238",
  "&minusdu;": "\u2A2A",
  "&mlcp;": "\u2ADB",
  "&mldr;": "\u2026",
  "&mnplus;": "\u2213",
  "&models;": "\u22A7",
  "&mopf;": "\u{1D55E}",
  "&mp;": "\u2213",
  "&mscr;": "\u{1D4C2}",
  "&mstpos;": "\u223E",
  "&mu;": "\u03BC",
  "&multimap;": "\u22B8",
  "&mumap;": "\u22B8",
  "&nGg;": "\u22D9\u0338",
  "&nGt;": "\u226B\u20D2",
  "&nGtv;": "\u226B\u0338",
  "&nLeftarrow;": "\u21CD",
  "&nLeftrightarrow;": "\u21CE",
  "&nLl;": "\u22D8\u0338",
  "&nLt;": "\u226A\u20D2",
  "&nLtv;": "\u226A\u0338",
  "&nRightarrow;": "\u21CF",
  "&nVDash;": "\u22AF",
  "&nVdash;": "\u22AE",
  "&nabla;": "\u2207",
  "&nacute;": "\u0144",
  "&nang;": "\u2220\u20D2",
  "&nap;": "\u2249",
  "&napE;": "\u2A70\u0338",
  "&napid;": "\u224B\u0338",
  "&napos;": "\u0149",
  "&napprox;": "\u2249",
  "&natur;": "\u266E",
  "&natural;": "\u266E",
  "&naturals;": "\u2115",
  "&nbsp": "\xA0",
  "&nbsp;": "\xA0",
  "&nbump;": "\u224E\u0338",
  "&nbumpe;": "\u224F\u0338",
  "&ncap;": "\u2A43",
  "&ncaron;": "\u0148",
  "&ncedil;": "\u0146",
  "&ncong;": "\u2247",
  "&ncongdot;": "\u2A6D\u0338",
  "&ncup;": "\u2A42",
  "&ncy;": "\u043D",
  "&ndash;": "\u2013",
  "&ne;": "\u2260",
  "&neArr;": "\u21D7",
  "&nearhk;": "\u2924",
  "&nearr;": "\u2197",
  "&nearrow;": "\u2197",
  "&nedot;": "\u2250\u0338",
  "&nequiv;": "\u2262",
  "&nesear;": "\u2928",
  "&nesim;": "\u2242\u0338",
  "&nexist;": "\u2204",
  "&nexists;": "\u2204",
  "&nfr;": "\u{1D52B}",
  "&ngE;": "\u2267\u0338",
  "&nge;": "\u2271",
  "&ngeq;": "\u2271",
  "&ngeqq;": "\u2267\u0338",
  "&ngeqslant;": "\u2A7E\u0338",
  "&nges;": "\u2A7E\u0338",
  "&ngsim;": "\u2275",
  "&ngt;": "\u226F",
  "&ngtr;": "\u226F",
  "&nhArr;": "\u21CE",
  "&nharr;": "\u21AE",
  "&nhpar;": "\u2AF2",
  "&ni;": "\u220B",
  "&nis;": "\u22FC",
  "&nisd;": "\u22FA",
  "&niv;": "\u220B",
  "&njcy;": "\u045A",
  "&nlArr;": "\u21CD",
  "&nlE;": "\u2266\u0338",
  "&nlarr;": "\u219A",
  "&nldr;": "\u2025",
  "&nle;": "\u2270",
  "&nleftarrow;": "\u219A",
  "&nleftrightarrow;": "\u21AE",
  "&nleq;": "\u2270",
  "&nleqq;": "\u2266\u0338",
  "&nleqslant;": "\u2A7D\u0338",
  "&nles;": "\u2A7D\u0338",
  "&nless;": "\u226E",
  "&nlsim;": "\u2274",
  "&nlt;": "\u226E",
  "&nltri;": "\u22EA",
  "&nltrie;": "\u22EC",
  "&nmid;": "\u2224",
  "&nopf;": "\u{1D55F}",
  "&not": "\xAC",
  "&not;": "\xAC",
  "&notin;": "\u2209",
  "&notinE;": "\u22F9\u0338",
  "&notindot;": "\u22F5\u0338",
  "&notinva;": "\u2209",
  "&notinvb;": "\u22F7",
  "&notinvc;": "\u22F6",
  "&notni;": "\u220C",
  "&notniva;": "\u220C",
  "&notnivb;": "\u22FE",
  "&notnivc;": "\u22FD",
  "&npar;": "\u2226",
  "&nparallel;": "\u2226",
  "&nparsl;": "\u2AFD\u20E5",
  "&npart;": "\u2202\u0338",
  "&npolint;": "\u2A14",
  "&npr;": "\u2280",
  "&nprcue;": "\u22E0",
  "&npre;": "\u2AAF\u0338",
  "&nprec;": "\u2280",
  "&npreceq;": "\u2AAF\u0338",
  "&nrArr;": "\u21CF",
  "&nrarr;": "\u219B",
  "&nrarrc;": "\u2933\u0338",
  "&nrarrw;": "\u219D\u0338",
  "&nrightarrow;": "\u219B",
  "&nrtri;": "\u22EB",
  "&nrtrie;": "\u22ED",
  "&nsc;": "\u2281",
  "&nsccue;": "\u22E1",
  "&nsce;": "\u2AB0\u0338",
  "&nscr;": "\u{1D4C3}",
  "&nshortmid;": "\u2224",
  "&nshortparallel;": "\u2226",
  "&nsim;": "\u2241",
  "&nsime;": "\u2244",
  "&nsimeq;": "\u2244",
  "&nsmid;": "\u2224",
  "&nspar;": "\u2226",
  "&nsqsube;": "\u22E2",
  "&nsqsupe;": "\u22E3",
  "&nsub;": "\u2284",
  "&nsubE;": "\u2AC5\u0338",
  "&nsube;": "\u2288",
  "&nsubset;": "\u2282\u20D2",
  "&nsubseteq;": "\u2288",
  "&nsubseteqq;": "\u2AC5\u0338",
  "&nsucc;": "\u2281",
  "&nsucceq;": "\u2AB0\u0338",
  "&nsup;": "\u2285",
  "&nsupE;": "\u2AC6\u0338",
  "&nsupe;": "\u2289",
  "&nsupset;": "\u2283\u20D2",
  "&nsupseteq;": "\u2289",
  "&nsupseteqq;": "\u2AC6\u0338",
  "&ntgl;": "\u2279",
  "&ntilde": "\xF1",
  "&ntilde;": "\xF1",
  "&ntlg;": "\u2278",
  "&ntriangleleft;": "\u22EA",
  "&ntrianglelefteq;": "\u22EC",
  "&ntriangleright;": "\u22EB",
  "&ntrianglerighteq;": "\u22ED",
  "&nu;": "\u03BD",
  "&num;": "#",
  "&numero;": "\u2116",
  "&numsp;": "\u2007",
  "&nvDash;": "\u22AD",
  "&nvHarr;": "\u2904",
  "&nvap;": "\u224D\u20D2",
  "&nvdash;": "\u22AC",
  "&nvge;": "\u2265\u20D2",
  "&nvgt;": ">\u20D2",
  "&nvinfin;": "\u29DE",
  "&nvlArr;": "\u2902",
  "&nvle;": "\u2264\u20D2",
  "&nvlt;": "<\u20D2",
  "&nvltrie;": "\u22B4\u20D2",
  "&nvrArr;": "\u2903",
  "&nvrtrie;": "\u22B5\u20D2",
  "&nvsim;": "\u223C\u20D2",
  "&nwArr;": "\u21D6",
  "&nwarhk;": "\u2923",
  "&nwarr;": "\u2196",
  "&nwarrow;": "\u2196",
  "&nwnear;": "\u2927",
  "&oS;": "\u24C8",
  "&oacute": "\xF3",
  "&oacute;": "\xF3",
  "&oast;": "\u229B",
  "&ocir;": "\u229A",
  "&ocirc": "\xF4",
  "&ocirc;": "\xF4",
  "&ocy;": "\u043E",
  "&odash;": "\u229D",
  "&odblac;": "\u0151",
  "&odiv;": "\u2A38",
  "&odot;": "\u2299",
  "&odsold;": "\u29BC",
  "&oelig;": "\u0153",
  "&ofcir;": "\u29BF",
  "&ofr;": "\u{1D52C}",
  "&ogon;": "\u02DB",
  "&ograve": "\xF2",
  "&ograve;": "\xF2",
  "&ogt;": "\u29C1",
  "&ohbar;": "\u29B5",
  "&ohm;": "\u03A9",
  "&oint;": "\u222E",
  "&olarr;": "\u21BA",
  "&olcir;": "\u29BE",
  "&olcross;": "\u29BB",
  "&oline;": "\u203E",
  "&olt;": "\u29C0",
  "&omacr;": "\u014D",
  "&omega;": "\u03C9",
  "&omicron;": "\u03BF",
  "&omid;": "\u29B6",
  "&ominus;": "\u2296",
  "&oopf;": "\u{1D560}",
  "&opar;": "\u29B7",
  "&operp;": "\u29B9",
  "&oplus;": "\u2295",
  "&or;": "\u2228",
  "&orarr;": "\u21BB",
  "&ord;": "\u2A5D",
  "&order;": "\u2134",
  "&orderof;": "\u2134",
  "&ordf": "\xAA",
  "&ordf;": "\xAA",
  "&ordm": "\xBA",
  "&ordm;": "\xBA",
  "&origof;": "\u22B6",
  "&oror;": "\u2A56",
  "&orslope;": "\u2A57",
  "&orv;": "\u2A5B",
  "&oscr;": "\u2134",
  "&oslash": "\xF8",
  "&oslash;": "\xF8",
  "&osol;": "\u2298",
  "&otilde": "\xF5",
  "&otilde;": "\xF5",
  "&otimes;": "\u2297",
  "&otimesas;": "\u2A36",
  "&ouml": "\xF6",
  "&ouml;": "\xF6",
  "&ovbar;": "\u233D",
  "&par;": "\u2225",
  "&para": "\xB6",
  "&para;": "\xB6",
  "&parallel;": "\u2225",
  "&parsim;": "\u2AF3",
  "&parsl;": "\u2AFD",
  "&part;": "\u2202",
  "&pcy;": "\u043F",
  "&percnt;": "%",
  "&period;": ".",
  "&permil;": "\u2030",
  "&perp;": "\u22A5",
  "&pertenk;": "\u2031",
  "&pfr;": "\u{1D52D}",
  "&phi;": "\u03C6",
  "&phiv;": "\u03D5",
  "&phmmat;": "\u2133",
  "&phone;": "\u260E",
  "&pi;": "\u03C0",
  "&pitchfork;": "\u22D4",
  "&piv;": "\u03D6",
  "&planck;": "\u210F",
  "&planckh;": "\u210E",
  "&plankv;": "\u210F",
  "&plus;": "+",
  "&plusacir;": "\u2A23",
  "&plusb;": "\u229E",
  "&pluscir;": "\u2A22",
  "&plusdo;": "\u2214",
  "&plusdu;": "\u2A25",
  "&pluse;": "\u2A72",
  "&plusmn": "\xB1",
  "&plusmn;": "\xB1",
  "&plussim;": "\u2A26",
  "&plustwo;": "\u2A27",
  "&pm;": "\xB1",
  "&pointint;": "\u2A15",
  "&popf;": "\u{1D561}",
  "&pound": "\xA3",
  "&pound;": "\xA3",
  "&pr;": "\u227A",
  "&prE;": "\u2AB3",
  "&prap;": "\u2AB7",
  "&prcue;": "\u227C",
  "&pre;": "\u2AAF",
  "&prec;": "\u227A",
  "&precapprox;": "\u2AB7",
  "&preccurlyeq;": "\u227C",
  "&preceq;": "\u2AAF",
  "&precnapprox;": "\u2AB9",
  "&precneqq;": "\u2AB5",
  "&precnsim;": "\u22E8",
  "&precsim;": "\u227E",
  "&prime;": "\u2032",
  "&primes;": "\u2119",
  "&prnE;": "\u2AB5",
  "&prnap;": "\u2AB9",
  "&prnsim;": "\u22E8",
  "&prod;": "\u220F",
  "&profalar;": "\u232E",
  "&profline;": "\u2312",
  "&profsurf;": "\u2313",
  "&prop;": "\u221D",
  "&propto;": "\u221D",
  "&prsim;": "\u227E",
  "&prurel;": "\u22B0",
  "&pscr;": "\u{1D4C5}",
  "&psi;": "\u03C8",
  "&puncsp;": "\u2008",
  "&qfr;": "\u{1D52E}",
  "&qint;": "\u2A0C",
  "&qopf;": "\u{1D562}",
  "&qprime;": "\u2057",
  "&qscr;": "\u{1D4C6}",
  "&quaternions;": "\u210D",
  "&quatint;": "\u2A16",
  "&quest;": "?",
  "&questeq;": "\u225F",
  "&quot": '"',
  "&quot;": '"',
  "&rAarr;": "\u21DB",
  "&rArr;": "\u21D2",
  "&rAtail;": "\u291C",
  "&rBarr;": "\u290F",
  "&rHar;": "\u2964",
  "&race;": "\u223D\u0331",
  "&racute;": "\u0155",
  "&radic;": "\u221A",
  "&raemptyv;": "\u29B3",
  "&rang;": "\u27E9",
  "&rangd;": "\u2992",
  "&range;": "\u29A5",
  "&rangle;": "\u27E9",
  "&raquo": "\xBB",
  "&raquo;": "\xBB",
  "&rarr;": "\u2192",
  "&rarrap;": "\u2975",
  "&rarrb;": "\u21E5",
  "&rarrbfs;": "\u2920",
  "&rarrc;": "\u2933",
  "&rarrfs;": "\u291E",
  "&rarrhk;": "\u21AA",
  "&rarrlp;": "\u21AC",
  "&rarrpl;": "\u2945",
  "&rarrsim;": "\u2974",
  "&rarrtl;": "\u21A3",
  "&rarrw;": "\u219D",
  "&ratail;": "\u291A",
  "&ratio;": "\u2236",
  "&rationals;": "\u211A",
  "&rbarr;": "\u290D",
  "&rbbrk;": "\u2773",
  "&rbrace;": "}",
  "&rbrack;": "]",
  "&rbrke;": "\u298C",
  "&rbrksld;": "\u298E",
  "&rbrkslu;": "\u2990",
  "&rcaron;": "\u0159",
  "&rcedil;": "\u0157",
  "&rceil;": "\u2309",
  "&rcub;": "}",
  "&rcy;": "\u0440",
  "&rdca;": "\u2937",
  "&rdldhar;": "\u2969",
  "&rdquo;": "\u201D",
  "&rdquor;": "\u201D",
  "&rdsh;": "\u21B3",
  "&real;": "\u211C",
  "&realine;": "\u211B",
  "&realpart;": "\u211C",
  "&reals;": "\u211D",
  "&rect;": "\u25AD",
  "&reg": "\xAE",
  "&reg;": "\xAE",
  "&rfisht;": "\u297D",
  "&rfloor;": "\u230B",
  "&rfr;": "\u{1D52F}",
  "&rhard;": "\u21C1",
  "&rharu;": "\u21C0",
  "&rharul;": "\u296C",
  "&rho;": "\u03C1",
  "&rhov;": "\u03F1",
  "&rightarrow;": "\u2192",
  "&rightarrowtail;": "\u21A3",
  "&rightharpoondown;": "\u21C1",
  "&rightharpoonup;": "\u21C0",
  "&rightleftarrows;": "\u21C4",
  "&rightleftharpoons;": "\u21CC",
  "&rightrightarrows;": "\u21C9",
  "&rightsquigarrow;": "\u219D",
  "&rightthreetimes;": "\u22CC",
  "&ring;": "\u02DA",
  "&risingdotseq;": "\u2253",
  "&rlarr;": "\u21C4",
  "&rlhar;": "\u21CC",
  "&rlm;": "\u200F",
  "&rmoust;": "\u23B1",
  "&rmoustache;": "\u23B1",
  "&rnmid;": "\u2AEE",
  "&roang;": "\u27ED",
  "&roarr;": "\u21FE",
  "&robrk;": "\u27E7",
  "&ropar;": "\u2986",
  "&ropf;": "\u{1D563}",
  "&roplus;": "\u2A2E",
  "&rotimes;": "\u2A35",
  "&rpar;": ")",
  "&rpargt;": "\u2994",
  "&rppolint;": "\u2A12",
  "&rrarr;": "\u21C9",
  "&rsaquo;": "\u203A",
  "&rscr;": "\u{1D4C7}",
  "&rsh;": "\u21B1",
  "&rsqb;": "]",
  "&rsquo;": "\u2019",
  "&rsquor;": "\u2019",
  "&rthree;": "\u22CC",
  "&rtimes;": "\u22CA",
  "&rtri;": "\u25B9",
  "&rtrie;": "\u22B5",
  "&rtrif;": "\u25B8",
  "&rtriltri;": "\u29CE",
  "&ruluhar;": "\u2968",
  "&rx;": "\u211E",
  "&sacute;": "\u015B",
  "&sbquo;": "\u201A",
  "&sc;": "\u227B",
  "&scE;": "\u2AB4",
  "&scap;": "\u2AB8",
  "&scaron;": "\u0161",
  "&sccue;": "\u227D",
  "&sce;": "\u2AB0",
  "&scedil;": "\u015F",
  "&scirc;": "\u015D",
  "&scnE;": "\u2AB6",
  "&scnap;": "\u2ABA",
  "&scnsim;": "\u22E9",
  "&scpolint;": "\u2A13",
  "&scsim;": "\u227F",
  "&scy;": "\u0441",
  "&sdot;": "\u22C5",
  "&sdotb;": "\u22A1",
  "&sdote;": "\u2A66",
  "&seArr;": "\u21D8",
  "&searhk;": "\u2925",
  "&searr;": "\u2198",
  "&searrow;": "\u2198",
  "&sect": "\xA7",
  "&sect;": "\xA7",
  "&semi;": ";",
  "&seswar;": "\u2929",
  "&setminus;": "\u2216",
  "&setmn;": "\u2216",
  "&sext;": "\u2736",
  "&sfr;": "\u{1D530}",
  "&sfrown;": "\u2322",
  "&sharp;": "\u266F",
  "&shchcy;": "\u0449",
  "&shcy;": "\u0448",
  "&shortmid;": "\u2223",
  "&shortparallel;": "\u2225",
  "&shy": "\xAD",
  "&shy;": "\xAD",
  "&sigma;": "\u03C3",
  "&sigmaf;": "\u03C2",
  "&sigmav;": "\u03C2",
  "&sim;": "\u223C",
  "&simdot;": "\u2A6A",
  "&sime;": "\u2243",
  "&simeq;": "\u2243",
  "&simg;": "\u2A9E",
  "&simgE;": "\u2AA0",
  "&siml;": "\u2A9D",
  "&simlE;": "\u2A9F",
  "&simne;": "\u2246",
  "&simplus;": "\u2A24",
  "&simrarr;": "\u2972",
  "&slarr;": "\u2190",
  "&smallsetminus;": "\u2216",
  "&smashp;": "\u2A33",
  "&smeparsl;": "\u29E4",
  "&smid;": "\u2223",
  "&smile;": "\u2323",
  "&smt;": "\u2AAA",
  "&smte;": "\u2AAC",
  "&smtes;": "\u2AAC\uFE00",
  "&softcy;": "\u044C",
  "&sol;": "/",
  "&solb;": "\u29C4",
  "&solbar;": "\u233F",
  "&sopf;": "\u{1D564}",
  "&spades;": "\u2660",
  "&spadesuit;": "\u2660",
  "&spar;": "\u2225",
  "&sqcap;": "\u2293",
  "&sqcaps;": "\u2293\uFE00",
  "&sqcup;": "\u2294",
  "&sqcups;": "\u2294\uFE00",
  "&sqsub;": "\u228F",
  "&sqsube;": "\u2291",
  "&sqsubset;": "\u228F",
  "&sqsubseteq;": "\u2291",
  "&sqsup;": "\u2290",
  "&sqsupe;": "\u2292",
  "&sqsupset;": "\u2290",
  "&sqsupseteq;": "\u2292",
  "&squ;": "\u25A1",
  "&square;": "\u25A1",
  "&squarf;": "\u25AA",
  "&squf;": "\u25AA",
  "&srarr;": "\u2192",
  "&sscr;": "\u{1D4C8}",
  "&ssetmn;": "\u2216",
  "&ssmile;": "\u2323",
  "&sstarf;": "\u22C6",
  "&star;": "\u2606",
  "&starf;": "\u2605",
  "&straightepsilon;": "\u03F5",
  "&straightphi;": "\u03D5",
  "&strns;": "\xAF",
  "&sub;": "\u2282",
  "&subE;": "\u2AC5",
  "&subdot;": "\u2ABD",
  "&sube;": "\u2286",
  "&subedot;": "\u2AC3",
  "&submult;": "\u2AC1",
  "&subnE;": "\u2ACB",
  "&subne;": "\u228A",
  "&subplus;": "\u2ABF",
  "&subrarr;": "\u2979",
  "&subset;": "\u2282",
  "&subseteq;": "\u2286",
  "&subseteqq;": "\u2AC5",
  "&subsetneq;": "\u228A",
  "&subsetneqq;": "\u2ACB",
  "&subsim;": "\u2AC7",
  "&subsub;": "\u2AD5",
  "&subsup;": "\u2AD3",
  "&succ;": "\u227B",
  "&succapprox;": "\u2AB8",
  "&succcurlyeq;": "\u227D",
  "&succeq;": "\u2AB0",
  "&succnapprox;": "\u2ABA",
  "&succneqq;": "\u2AB6",
  "&succnsim;": "\u22E9",
  "&succsim;": "\u227F",
  "&sum;": "\u2211",
  "&sung;": "\u266A",
  "&sup1": "\xB9",
  "&sup1;": "\xB9",
  "&sup2": "\xB2",
  "&sup2;": "\xB2",
  "&sup3": "\xB3",
  "&sup3;": "\xB3",
  "&sup;": "\u2283",
  "&supE;": "\u2AC6",
  "&supdot;": "\u2ABE",
  "&supdsub;": "\u2AD8",
  "&supe;": "\u2287",
  "&supedot;": "\u2AC4",
  "&suphsol;": "\u27C9",
  "&suphsub;": "\u2AD7",
  "&suplarr;": "\u297B",
  "&supmult;": "\u2AC2",
  "&supnE;": "\u2ACC",
  "&supne;": "\u228B",
  "&supplus;": "\u2AC0",
  "&supset;": "\u2283",
  "&supseteq;": "\u2287",
  "&supseteqq;": "\u2AC6",
  "&supsetneq;": "\u228B",
  "&supsetneqq;": "\u2ACC",
  "&supsim;": "\u2AC8",
  "&supsub;": "\u2AD4",
  "&supsup;": "\u2AD6",
  "&swArr;": "\u21D9",
  "&swarhk;": "\u2926",
  "&swarr;": "\u2199",
  "&swarrow;": "\u2199",
  "&swnwar;": "\u292A",
  "&szlig": "\xDF",
  "&szlig;": "\xDF",
  "&target;": "\u2316",
  "&tau;": "\u03C4",
  "&tbrk;": "\u23B4",
  "&tcaron;": "\u0165",
  "&tcedil;": "\u0163",
  "&tcy;": "\u0442",
  "&tdot;": "\u20DB",
  "&telrec;": "\u2315",
  "&tfr;": "\u{1D531}",
  "&there4;": "\u2234",
  "&therefore;": "\u2234",
  "&theta;": "\u03B8",
  "&thetasym;": "\u03D1",
  "&thetav;": "\u03D1",
  "&thickapprox;": "\u2248",
  "&thicksim;": "\u223C",
  "&thinsp;": "\u2009",
  "&thkap;": "\u2248",
  "&thksim;": "\u223C",
  "&thorn": "\xFE",
  "&thorn;": "\xFE",
  "&tilde;": "\u02DC",
  "&times": "\xD7",
  "&times;": "\xD7",
  "&timesb;": "\u22A0",
  "&timesbar;": "\u2A31",
  "&timesd;": "\u2A30",
  "&tint;": "\u222D",
  "&toea;": "\u2928",
  "&top;": "\u22A4",
  "&topbot;": "\u2336",
  "&topcir;": "\u2AF1",
  "&topf;": "\u{1D565}",
  "&topfork;": "\u2ADA",
  "&tosa;": "\u2929",
  "&tprime;": "\u2034",
  "&trade;": "\u2122",
  "&triangle;": "\u25B5",
  "&triangledown;": "\u25BF",
  "&triangleleft;": "\u25C3",
  "&trianglelefteq;": "\u22B4",
  "&triangleq;": "\u225C",
  "&triangleright;": "\u25B9",
  "&trianglerighteq;": "\u22B5",
  "&tridot;": "\u25EC",
  "&trie;": "\u225C",
  "&triminus;": "\u2A3A",
  "&triplus;": "\u2A39",
  "&trisb;": "\u29CD",
  "&tritime;": "\u2A3B",
  "&trpezium;": "\u23E2",
  "&tscr;": "\u{1D4C9}",
  "&tscy;": "\u0446",
  "&tshcy;": "\u045B",
  "&tstrok;": "\u0167",
  "&twixt;": "\u226C",
  "&twoheadleftarrow;": "\u219E",
  "&twoheadrightarrow;": "\u21A0",
  "&uArr;": "\u21D1",
  "&uHar;": "\u2963",
  "&uacute": "\xFA",
  "&uacute;": "\xFA",
  "&uarr;": "\u2191",
  "&ubrcy;": "\u045E",
  "&ubreve;": "\u016D",
  "&ucirc": "\xFB",
  "&ucirc;": "\xFB",
  "&ucy;": "\u0443",
  "&udarr;": "\u21C5",
  "&udblac;": "\u0171",
  "&udhar;": "\u296E",
  "&ufisht;": "\u297E",
  "&ufr;": "\u{1D532}",
  "&ugrave": "\xF9",
  "&ugrave;": "\xF9",
  "&uharl;": "\u21BF",
  "&uharr;": "\u21BE",
  "&uhblk;": "\u2580",
  "&ulcorn;": "\u231C",
  "&ulcorner;": "\u231C",
  "&ulcrop;": "\u230F",
  "&ultri;": "\u25F8",
  "&umacr;": "\u016B",
  "&uml": "\xA8",
  "&uml;": "\xA8",
  "&uogon;": "\u0173",
  "&uopf;": "\u{1D566}",
  "&uparrow;": "\u2191",
  "&updownarrow;": "\u2195",
  "&upharpoonleft;": "\u21BF",
  "&upharpoonright;": "\u21BE",
  "&uplus;": "\u228E",
  "&upsi;": "\u03C5",
  "&upsih;": "\u03D2",
  "&upsilon;": "\u03C5",
  "&upuparrows;": "\u21C8",
  "&urcorn;": "\u231D",
  "&urcorner;": "\u231D",
  "&urcrop;": "\u230E",
  "&uring;": "\u016F",
  "&urtri;": "\u25F9",
  "&uscr;": "\u{1D4CA}",
  "&utdot;": "\u22F0",
  "&utilde;": "\u0169",
  "&utri;": "\u25B5",
  "&utrif;": "\u25B4",
  "&uuarr;": "\u21C8",
  "&uuml": "\xFC",
  "&uuml;": "\xFC",
  "&uwangle;": "\u29A7",
  "&vArr;": "\u21D5",
  "&vBar;": "\u2AE8",
  "&vBarv;": "\u2AE9",
  "&vDash;": "\u22A8",
  "&vangrt;": "\u299C",
  "&varepsilon;": "\u03F5",
  "&varkappa;": "\u03F0",
  "&varnothing;": "\u2205",
  "&varphi;": "\u03D5",
  "&varpi;": "\u03D6",
  "&varpropto;": "\u221D",
  "&varr;": "\u2195",
  "&varrho;": "\u03F1",
  "&varsigma;": "\u03C2",
  "&varsubsetneq;": "\u228A\uFE00",
  "&varsubsetneqq;": "\u2ACB\uFE00",
  "&varsupsetneq;": "\u228B\uFE00",
  "&varsupsetneqq;": "\u2ACC\uFE00",
  "&vartheta;": "\u03D1",
  "&vartriangleleft;": "\u22B2",
  "&vartriangleright;": "\u22B3",
  "&vcy;": "\u0432",
  "&vdash;": "\u22A2",
  "&vee;": "\u2228",
  "&veebar;": "\u22BB",
  "&veeeq;": "\u225A",
  "&vellip;": "\u22EE",
  "&verbar;": "|",
  "&vert;": "|",
  "&vfr;": "\u{1D533}",
  "&vltri;": "\u22B2",
  "&vnsub;": "\u2282\u20D2",
  "&vnsup;": "\u2283\u20D2",
  "&vopf;": "\u{1D567}",
  "&vprop;": "\u221D",
  "&vrtri;": "\u22B3",
  "&vscr;": "\u{1D4CB}",
  "&vsubnE;": "\u2ACB\uFE00",
  "&vsubne;": "\u228A\uFE00",
  "&vsupnE;": "\u2ACC\uFE00",
  "&vsupne;": "\u228B\uFE00",
  "&vzigzag;": "\u299A",
  "&wcirc;": "\u0175",
  "&wedbar;": "\u2A5F",
  "&wedge;": "\u2227",
  "&wedgeq;": "\u2259",
  "&weierp;": "\u2118",
  "&wfr;": "\u{1D534}",
  "&wopf;": "\u{1D568}",
  "&wp;": "\u2118",
  "&wr;": "\u2240",
  "&wreath;": "\u2240",
  "&wscr;": "\u{1D4CC}",
  "&xcap;": "\u22C2",
  "&xcirc;": "\u25EF",
  "&xcup;": "\u22C3",
  "&xdtri;": "\u25BD",
  "&xfr;": "\u{1D535}",
  "&xhArr;": "\u27FA",
  "&xharr;": "\u27F7",
  "&xi;": "\u03BE",
  "&xlArr;": "\u27F8",
  "&xlarr;": "\u27F5",
  "&xmap;": "\u27FC",
  "&xnis;": "\u22FB",
  "&xodot;": "\u2A00",
  "&xopf;": "\u{1D569}",
  "&xoplus;": "\u2A01",
  "&xotime;": "\u2A02",
  "&xrArr;": "\u27F9",
  "&xrarr;": "\u27F6",
  "&xscr;": "\u{1D4CD}",
  "&xsqcup;": "\u2A06",
  "&xuplus;": "\u2A04",
  "&xutri;": "\u25B3",
  "&xvee;": "\u22C1",
  "&xwedge;": "\u22C0",
  "&yacute": "\xFD",
  "&yacute;": "\xFD",
  "&yacy;": "\u044F",
  "&ycirc;": "\u0177",
  "&ycy;": "\u044B",
  "&yen": "\xA5",
  "&yen;": "\xA5",
  "&yfr;": "\u{1D536}",
  "&yicy;": "\u0457",
  "&yopf;": "\u{1D56A}",
  "&yscr;": "\u{1D4CE}",
  "&yucy;": "\u044E",
  "&yuml": "\xFF",
  "&yuml;": "\xFF",
  "&zacute;": "\u017A",
  "&zcaron;": "\u017E",
  "&zcy;": "\u0437",
  "&zdot;": "\u017C",
  "&zeetrf;": "\u2128",
  "&zeta;": "\u03B6",
  "&zfr;": "\u{1D537}",
  "&zhcy;": "\u0436",
  "&zigrarr;": "\u21DD",
  "&zopf;": "\u{1D56B}",
  "&zscr;": "\u{1D4CF}",
  "&zwj;": "\u200D",
  "&zwnj;": "\u200C"
};
var html_entities_default = htmlEntities;

// node_modules/postal-mime/src/text-format.js
function decodeHTMLEntities(str) {
  return str.replace(/&(#\d+|#x[a-f0-9]+|[a-z]+\d*);?/gi, (match, entity) => {
    if (typeof html_entities_default[match] === "string") {
      return html_entities_default[match];
    }
    if (entity.charAt(0) !== "#" || match.charAt(match.length - 1) !== ";") {
      return match;
    }
    let codePoint;
    if (entity.charAt(1) === "x") {
      codePoint = parseInt(entity.substr(2), 16);
    } else {
      codePoint = parseInt(entity.substr(1), 10);
    }
    let output = "";
    if (codePoint >= 55296 && codePoint <= 57343 || codePoint > 1114111) {
      return "\uFFFD";
    }
    if (codePoint > 65535) {
      codePoint -= 65536;
      output += String.fromCharCode(codePoint >>> 10 & 1023 | 55296);
      codePoint = 56320 | codePoint & 1023;
    }
    output += String.fromCharCode(codePoint);
    return output;
  });
}
function escapeHtml(str) {
  return str.trim().replace(/[<>"'?&]/g, (c) => {
    let hex = c.charCodeAt(0).toString(16);
    if (hex.length < 2) {
      hex = "0" + hex;
    }
    return "&#x" + hex.toUpperCase() + ";";
  });
}
function textToHtml(str) {
  let html = escapeHtml(str).replace(/\n/g, "<br />");
  return "<div>" + html + "</div>";
}
function htmlToText(str) {
  str = str.replace(/\r?\n/g, "").replace(/<\!\-\-.*?\-\->/gi, " ").replace(/<br\b[^>]*>/gi, "\n").replace(/<\/?(p|div|table|tr|td|th)\b[^>]*>/gi, "\n\n").replace(/<script\b[^>]*>.*?<\/script\b[^>]*>/gi, " ").replace(/^.*<body\b[^>]*>/i, "").replace(/^.*<\/head\b[^>]*>/i, "").replace(/^.*<\!doctype\b[^>]*>/i, "").replace(/<\/body\b[^>]*>.*$/i, "").replace(/<\/html\b[^>]*>.*$/i, "").replace(/<a\b[^>]*href\s*=\s*["']?([^\s"']+)[^>]*>/gi, " ($1) ").replace(/<\/?(span|em|i|strong|b|u|a)\b[^>]*>/gi, "").replace(/<li\b[^>]*>[\n\u0001\s]*/gi, "* ").replace(/<hr\b[^>]*>/g, "\n-------------\n").replace(/<[^>]*>/g, " ").replace(/\u0001/g, "\n").replace(/[ \t]+/g, " ").replace(/^\s+$/gm, "").replace(/\n\n+/g, "\n\n").replace(/^\n+/, "\n").replace(/\n+$/, "\n");
  str = decodeHTMLEntities(str);
  return str;
}
function formatTextAddress(address) {
  return [].concat(address.name || []).concat(address.name ? `<${address.address}>` : address.address).join(" ");
}
function formatTextAddresses(addresses) {
  let parts = [];
  let processAddress = (address, partCounter) => {
    if (partCounter) {
      parts.push(", ");
    }
    if (address.group) {
      let groupStart = `${address.name}:`;
      let groupEnd = `;`;
      parts.push(groupStart);
      address.group.forEach(processAddress);
      parts.push(groupEnd);
    } else {
      parts.push(formatTextAddress(address));
    }
  };
  addresses.forEach(processAddress);
  return parts.join("");
}
function formatHtmlAddress(address) {
  return `<a href="mailto:${escapeHtml(address.address)}" class="postal-email-address">${escapeHtml(address.name || `<${address.address}>`)}</a>`;
}
function formatHtmlAddresses(addresses) {
  let parts = [];
  let processAddress = (address, partCounter) => {
    if (partCounter) {
      parts.push('<span class="postal-email-address-separator">, </span>');
    }
    if (address.group) {
      let groupStart = `<span class="postal-email-address-group">${escapeHtml(address.name)}:</span>`;
      let groupEnd = `<span class="postal-email-address-group">;</span>`;
      parts.push(groupStart);
      address.group.forEach(processAddress);
      parts.push(groupEnd);
    } else {
      parts.push(formatHtmlAddress(address));
    }
  };
  addresses.forEach(processAddress);
  return parts.join(" ");
}
function foldLines(str, lineLength, afterSpace) {
  str = (str || "").toString();
  lineLength = lineLength || 76;
  let pos = 0, len = str.length, result = "", line, match;
  while (pos < len) {
    line = str.substr(pos, lineLength);
    if (line.length < lineLength) {
      result += line;
      break;
    }
    if (match = line.match(/^[^\n\r]*(\r?\n|\r)/)) {
      line = match[0];
      result += line;
      pos += line.length;
      continue;
    } else if ((match = line.match(/(\s+)[^\s]*$/)) && match[0].length - (afterSpace ? (match[1] || "").length : 0) < line.length) {
      line = line.substr(0, line.length - (match[0].length - (afterSpace ? (match[1] || "").length : 0)));
    } else if (match = str.substr(pos + line.length).match(/^[^\s]+(\s*)/)) {
      line = line + match[0].substr(0, match[0].length - (!afterSpace ? (match[1] || "").length : 0));
    }
    result += line;
    pos += line.length;
    if (pos < len) {
      result += "\r\n";
    }
  }
  return result;
}
function formatTextHeader(message) {
  let rows = [];
  if (message.from) {
    rows.push({ key: "From", val: formatTextAddress(message.from) });
  }
  if (message.subject) {
    rows.push({ key: "Subject", val: message.subject });
  }
  if (message.date) {
    let dateOptions = {
      year: "numeric",
      month: "numeric",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      hour12: false
    };
    let dateStr = typeof Intl === "undefined" ? message.date : new Intl.DateTimeFormat("default", dateOptions).format(new Date(message.date));
    rows.push({ key: "Date", val: dateStr });
  }
  if (message.to && message.to.length) {
    rows.push({ key: "To", val: formatTextAddresses(message.to) });
  }
  if (message.cc && message.cc.length) {
    rows.push({ key: "Cc", val: formatTextAddresses(message.cc) });
  }
  if (message.bcc && message.bcc.length) {
    rows.push({ key: "Bcc", val: formatTextAddresses(message.bcc) });
  }
  let maxKeyLength = rows.map((r) => r.key.length).reduce((acc, cur) => {
    return cur > acc ? cur : acc;
  }, 0);
  rows = rows.flatMap((row) => {
    let sepLen = maxKeyLength - row.key.length;
    let prefix = `${row.key}: ${" ".repeat(sepLen)}`;
    let emptyPrefix = `${" ".repeat(row.key.length + 1)} ${" ".repeat(sepLen)}`;
    let foldedLines = foldLines(row.val, 80, true).split(/\r?\n/).map((line) => line.trim());
    return foldedLines.map((line, i) => `${i ? emptyPrefix : prefix}${line}`);
  });
  let maxLineLength = rows.map((r) => r.length).reduce((acc, cur) => {
    return cur > acc ? cur : acc;
  }, 0);
  let lineMarker = "-".repeat(maxLineLength);
  let template = `
${lineMarker}
${rows.join("\n")}
${lineMarker}
`;
  return template;
}
function formatHtmlHeader(message) {
  let rows = [];
  if (message.from) {
    rows.push(
      `<div class="postal-email-header-key">From</div><div class="postal-email-header-value">${formatHtmlAddress(message.from)}</div>`
    );
  }
  if (message.subject) {
    rows.push(
      `<div class="postal-email-header-key">Subject</div><div class="postal-email-header-value postal-email-header-subject">${escapeHtml(
        message.subject
      )}</div>`
    );
  }
  if (message.date) {
    let dateOptions = {
      year: "numeric",
      month: "numeric",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      hour12: false
    };
    let dateStr = typeof Intl === "undefined" ? message.date : new Intl.DateTimeFormat("default", dateOptions).format(new Date(message.date));
    rows.push(
      `<div class="postal-email-header-key">Date</div><div class="postal-email-header-value postal-email-header-date" data-date="${escapeHtml(
        message.date
      )}">${escapeHtml(dateStr)}</div>`
    );
  }
  if (message.to && message.to.length) {
    rows.push(
      `<div class="postal-email-header-key">To</div><div class="postal-email-header-value">${formatHtmlAddresses(message.to)}</div>`
    );
  }
  if (message.cc && message.cc.length) {
    rows.push(
      `<div class="postal-email-header-key">Cc</div><div class="postal-email-header-value">${formatHtmlAddresses(message.cc)}</div>`
    );
  }
  if (message.bcc && message.bcc.length) {
    rows.push(
      `<div class="postal-email-header-key">Bcc</div><div class="postal-email-header-value">${formatHtmlAddresses(message.bcc)}</div>`
    );
  }
  let template = `<div class="postal-email-header">${rows.length ? '<div class="postal-email-header-row">' : ""}${rows.join(
    '</div>\n<div class="postal-email-header-row">'
  )}${rows.length ? "</div>" : ""}</div>`;
  return template;
}

// node_modules/postal-mime/src/address-parser.js
function _handleAddress(tokens, depth) {
  let isGroup = false;
  let state = "text";
  let address;
  let addresses = [];
  let data = {
    address: [],
    comment: [],
    group: [],
    text: [],
    textWasQuoted: []
    // Track which text tokens came from inside quotes
  };
  let i;
  let len;
  let insideQuotes = false;
  for (i = 0, len = tokens.length; i < len; i++) {
    let token = tokens[i];
    let prevToken = i ? tokens[i - 1] : null;
    if (token.type === "operator") {
      switch (token.value) {
        case "<":
          state = "address";
          insideQuotes = false;
          break;
        case "(":
          state = "comment";
          insideQuotes = false;
          break;
        case ":":
          state = "group";
          isGroup = true;
          insideQuotes = false;
          break;
        case '"':
          insideQuotes = !insideQuotes;
          state = "text";
          break;
        default:
          state = "text";
          insideQuotes = false;
          break;
      }
    } else if (token.value) {
      if (state === "address") {
        token.value = token.value.replace(/^[^<]*<\s*/, "");
      }
      if (prevToken && prevToken.noBreak && data[state].length) {
        data[state][data[state].length - 1] += token.value;
        if (state === "text" && insideQuotes) {
          data.textWasQuoted[data.textWasQuoted.length - 1] = true;
        }
      } else {
        data[state].push(token.value);
        if (state === "text") {
          data.textWasQuoted.push(insideQuotes);
        }
      }
    }
  }
  if (!data.text.length && data.comment.length) {
    data.text = data.comment;
    data.comment = [];
  }
  if (isGroup) {
    data.text = data.text.join(" ");
    let groupMembers = [];
    if (data.group.length) {
      let parsedGroup = addressParser(data.group.join(","), { _depth: depth + 1 });
      parsedGroup.forEach((member) => {
        if (member.group) {
          groupMembers = groupMembers.concat(member.group);
        } else {
          groupMembers.push(member);
        }
      });
    }
    addresses.push({
      name: decodeWords(data.text || address && address.name),
      group: groupMembers
    });
  } else {
    if (!data.address.length && data.text.length) {
      for (i = data.text.length - 1; i >= 0; i--) {
        if (!data.textWasQuoted[i] && data.text[i].match(/^[^@\s]+@[^@\s]+$/)) {
          data.address = data.text.splice(i, 1);
          data.textWasQuoted.splice(i, 1);
          break;
        }
      }
      let _regexHandler = function(address2) {
        if (!data.address.length) {
          data.address = [address2.trim()];
          return " ";
        } else {
          return address2;
        }
      };
      if (!data.address.length) {
        for (i = data.text.length - 1; i >= 0; i--) {
          if (!data.textWasQuoted[i]) {
            data.text[i] = data.text[i].replace(/\s*\b[^@\s]+@[^\s]+\b\s*/, _regexHandler).trim();
            if (data.address.length) {
              break;
            }
          }
        }
      }
    }
    if (!data.text.length && data.comment.length) {
      data.text = data.comment;
      data.comment = [];
    }
    if (data.address.length > 1) {
      data.text = data.text.concat(data.address.splice(1));
    }
    data.text = data.text.join(" ");
    data.address = data.address.join(" ");
    if (!data.address && /^=\?[^=]+?=$/.test(data.text.trim())) {
      const decodedText = decodeWords(data.text);
      if (/<[^<>]+@[^<>]+>/.test(decodedText)) {
        const parsedSubAddresses = addressParser(decodedText);
        if (parsedSubAddresses && parsedSubAddresses.length) {
          return parsedSubAddresses;
        }
      }
      return [{ address: "", name: decodedText }];
    }
    address = {
      address: data.address || data.text || "",
      name: decodeWords(data.text || data.address || "")
    };
    if (address.address === address.name) {
      if ((address.address || "").match(/@/)) {
        address.name = "";
      } else {
        address.address = "";
      }
    }
    addresses.push(address);
  }
  return addresses;
}
var Tokenizer = class {
  constructor(str) {
    this.str = (str || "").toString();
    this.operatorCurrent = "";
    this.operatorExpecting = "";
    this.node = null;
    this.escaped = false;
    this.list = [];
    this.operators = {
      '"': '"',
      "(": ")",
      "<": ">",
      ",": "",
      ":": ";",
      // Semicolons are not a legal delimiter per the RFC2822 grammar other
      // than for terminating a group, but they are also not valid for any
      // other use in this context.  Given that some mail clients have
      // historically allowed the semicolon as a delimiter equivalent to the
      // comma in their UI, it makes sense to treat them the same as a comma
      // when used outside of a group.
      ";": ""
    };
  }
  /**
   * Tokenizes the original input string
   *
   * @return {Array} An array of operator|text tokens
   */
  tokenize() {
    let list = [];
    for (let i = 0, len = this.str.length; i < len; i++) {
      let chr = this.str.charAt(i);
      let nextChr = i < len - 1 ? this.str.charAt(i + 1) : null;
      this.checkChar(chr, nextChr);
    }
    this.list.forEach((node) => {
      node.value = (node.value || "").toString().trim();
      if (node.value) {
        list.push(node);
      }
    });
    return list;
  }
  /**
   * Checks if a character is an operator or text and acts accordingly
   *
   * @param {String} chr Character from the address field
   */
  checkChar(chr, nextChr) {
    if (this.escaped) {
    } else if (chr === this.operatorExpecting) {
      this.node = {
        type: "operator",
        value: chr
      };
      if (nextChr && ![" ", "	", "\r", "\n", ",", ";"].includes(nextChr)) {
        this.node.noBreak = true;
      }
      this.list.push(this.node);
      this.node = null;
      this.operatorExpecting = "";
      this.escaped = false;
      return;
    } else if (!this.operatorExpecting && chr in this.operators) {
      this.node = {
        type: "operator",
        value: chr
      };
      this.list.push(this.node);
      this.node = null;
      this.operatorExpecting = this.operators[chr];
      this.escaped = false;
      return;
    } else if (this.operatorExpecting === '"' && chr === "\\") {
      this.escaped = true;
      return;
    }
    if (!this.node) {
      this.node = {
        type: "text",
        value: ""
      };
      this.list.push(this.node);
    }
    if (chr === "\n") {
      chr = " ";
    }
    if (chr.charCodeAt(0) >= 33 || [" ", "	"].includes(chr)) {
      this.node.value += chr;
    }
    this.escaped = false;
  }
};
var MAX_NESTED_GROUP_DEPTH = 50;
function addressParser(str, options) {
  options = options || {};
  let depth = options._depth || 0;
  if (depth > MAX_NESTED_GROUP_DEPTH) {
    return [];
  }
  let tokenizer = new Tokenizer(str);
  let tokens = tokenizer.tokenize();
  let addresses = [];
  let address = [];
  let parsedAddresses = [];
  tokens.forEach((token) => {
    if (token.type === "operator" && (token.value === "," || token.value === ";")) {
      if (address.length) {
        addresses.push(address);
      }
      address = [];
    } else {
      address.push(token);
    }
  });
  if (address.length) {
    addresses.push(address);
  }
  addresses.forEach((address2) => {
    address2 = _handleAddress(address2, depth);
    if (address2.length) {
      parsedAddresses = parsedAddresses.concat(address2);
    }
  });
  if (options.flatten) {
    let addresses2 = [];
    let walkAddressList = (list) => {
      list.forEach((address2) => {
        if (address2.group) {
          return walkAddressList(address2.group);
        } else {
          addresses2.push(address2);
        }
      });
    };
    walkAddressList(parsedAddresses);
    return addresses2;
  }
  return parsedAddresses;
}
var address_parser_default = addressParser;

// node_modules/postal-mime/src/base64-encoder.js
function base64ArrayBuffer(arrayBuffer) {
  var base64 = "";
  var encodings = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
  var bytes = new Uint8Array(arrayBuffer);
  var byteLength = bytes.byteLength;
  var byteRemainder = byteLength % 3;
  var mainLength = byteLength - byteRemainder;
  var a, b, c, d;
  var chunk;
  for (var i = 0; i < mainLength; i = i + 3) {
    chunk = bytes[i] << 16 | bytes[i + 1] << 8 | bytes[i + 2];
    a = (chunk & 16515072) >> 18;
    b = (chunk & 258048) >> 12;
    c = (chunk & 4032) >> 6;
    d = chunk & 63;
    base64 += encodings[a] + encodings[b] + encodings[c] + encodings[d];
  }
  if (byteRemainder == 1) {
    chunk = bytes[mainLength];
    a = (chunk & 252) >> 2;
    b = (chunk & 3) << 4;
    base64 += encodings[a] + encodings[b] + "==";
  } else if (byteRemainder == 2) {
    chunk = bytes[mainLength] << 8 | bytes[mainLength + 1];
    a = (chunk & 64512) >> 10;
    b = (chunk & 1008) >> 4;
    c = (chunk & 15) << 2;
    base64 += encodings[a] + encodings[b] + encodings[c] + "=";
  }
  return base64;
}

// node_modules/postal-mime/src/postal-mime.js
var MAX_NESTING_DEPTH = 256;
var MAX_HEADERS_SIZE = 2 * 1024 * 1024;
var MAX_RFC822_NESTING_DEPTH = 10;
function toCamelCase(key) {
  return key.replace(/-(.)/g, (o, c) => c.toUpperCase());
}
function parseLimitOption(value, defaultValue, name2) {
  if (value === void 0 || value === null) {
    return defaultValue;
  }
  if (typeof value !== "number" || !Number.isInteger(value) || value < 0) {
    throw new TypeError(`${name2} must be a non-negative integer`);
  }
  return value;
}
var PostalMime = class _PostalMime {
  // async so that an invalid option rejects the returned promise instead of throwing
  // synchronously, which would escape a `.catch()` chain
  static async parse(buf, options) {
    const parser = new _PostalMime(options);
    return parser.parse(buf);
  }
  // rfc822NestingDepth is internal state that nested parsers receive from their parent.
  // It is deliberately a separate argument rather than an option, so that forwarding a
  // caller supplied options object can not seed it and switch the recursion limit off.
  constructor(options, rfc822NestingDepth = 0) {
    this.options = options || {};
    this.mimeOptions = {
      maxNestingDepth: parseLimitOption(this.options.maxNestingDepth, MAX_NESTING_DEPTH, "maxNestingDepth"),
      maxHeadersSize: parseLimitOption(this.options.maxHeadersSize, MAX_HEADERS_SIZE, "maxHeadersSize")
    };
    this.maxRfc822NestingDepth = parseLimitOption(
      this.options.maxRfc822NestingDepth,
      MAX_RFC822_NESTING_DEPTH,
      "maxRfc822NestingDepth"
    );
    this.rfc822NestingDepth = rfc822NestingDepth;
    this.root = this.currentNode = new MimeNode({
      postalMime: this,
      ...this.mimeOptions
    });
    this.boundaries = [];
    this.textContent = {};
    this.attachments = [];
    this.attachmentEncoding = (this.options.attachmentEncoding || "").toString().replace(/[-_\s]/g, "").trim().toLowerCase() || "arraybuffer";
    this.started = false;
  }
  async finalize() {
    await this.root.finalize();
  }
  async processLine(line, isFinal) {
    let boundaries = this.boundaries;
    if (boundaries.length && line.length > 2 && line[0] === 45 && line[1] === 45) {
      for (let i = boundaries.length - 1; i >= 0; i--) {
        let boundary = boundaries[i];
        if (line.length < boundary.value.length + 2) {
          continue;
        }
        let boundaryMatches = true;
        for (let j = 0; j < boundary.value.length; j++) {
          if (line[j + 2] !== boundary.value[j]) {
            boundaryMatches = false;
            break;
          }
        }
        if (!boundaryMatches) {
          continue;
        }
        let boundaryEnd = boundary.value.length + 2;
        let isTerminator = false;
        if (line.length >= boundary.value.length + 4 && line[boundary.value.length + 2] === 45 && line[boundary.value.length + 3] === 45) {
          isTerminator = true;
          boundaryEnd = boundary.value.length + 4;
        }
        let hasValidTrailing = true;
        for (let j = boundaryEnd; j < line.length; j++) {
          if (line[j] !== 32 && line[j] !== 9) {
            hasValidTrailing = false;
            break;
          }
        }
        if (!hasValidTrailing) {
          continue;
        }
        if (isTerminator) {
          await boundary.node.finalize();
          this.currentNode = boundary.node.parentNode || this.root;
        } else {
          await boundary.node.finalizeChildNodes();
          this.currentNode = new MimeNode({
            postalMime: this,
            parentNode: boundary.node,
            parentMultipartType: boundary.node.contentType.multipart,
            ...this.mimeOptions
          });
        }
        if (isFinal) {
          return this.finalize();
        }
        return;
      }
    }
    this.currentNode.feed(line);
    if (isFinal) {
      return this.finalize();
    }
  }
  readLine() {
    let startPos = this.readPos;
    let endPos = this.readPos;
    while (this.readPos < this.av.length) {
      const c = this.av[this.readPos++];
      if (c !== 13 && c !== 10) {
        endPos = this.readPos;
      }
      if (c === 10) {
        return {
          bytes: new Uint8Array(this.buf, startPos, endPos - startPos),
          done: this.readPos >= this.av.length
        };
      }
    }
    return {
      bytes: new Uint8Array(this.buf, startPos, endPos - startPos),
      done: this.readPos >= this.av.length
    };
  }
  async processNodeTree() {
    let textContent = {};
    let textTypes = /* @__PURE__ */ new Set();
    let textMap = this.textMap = /* @__PURE__ */ new Map();
    let forceRfc822Attachments = this.forceRfc822Attachments();
    let walk = async (node, alternative, related) => {
      alternative = alternative || false;
      related = related || false;
      if (!node.contentType.multipart) {
        const inlineRfc822 = this.isInlineMessageRfc822(node) && !forceRfc822Attachments;
        const rfc822DepthExceeded = inlineRfc822 && this.rfc822NestingDepth >= this.maxRfc822NestingDepth;
        if (inlineRfc822 && !rfc822DepthExceeded) {
          const subParser = new _PostalMime(
            {
              // Only the limits are inherited. Options that decide how a part
              // is classified stay with the parser that was configured.
              ...this.mimeOptions,
              maxRfc822NestingDepth: this.maxRfc822NestingDepth,
              // attachments are encoded by the parent parser, keep raw buffers here
              attachmentEncoding: "arraybuffer"
            },
            this.rfc822NestingDepth + 1
          );
          node.subMessage = await subParser.parse(node.content);
          if (!textMap.has(node)) {
            textMap.set(node, {});
          }
          let textEntry = textMap.get(node);
          if (node.subMessage.text || !node.subMessage.html) {
            textEntry.plain = textEntry.plain || [];
            textEntry.plain.push({ type: "subMessage", value: node.subMessage });
            textTypes.add("plain");
          }
          if (node.subMessage.html) {
            textEntry.html = textEntry.html || [];
            textEntry.html.push({ type: "subMessage", value: node.subMessage });
            textTypes.add("html");
          }
          if (subParser.textMap) {
            subParser.textMap.forEach((subTextEntry, subTextNode) => {
              textMap.set(subTextNode, subTextEntry);
            });
          }
          for (let attachment of node.subMessage.attachments || []) {
            this.attachments.push(attachment);
          }
        } else if (this.isInlineTextNode(node)) {
          let textType = node.contentType.parsed.value.substr(node.contentType.parsed.value.indexOf("/") + 1);
          let selectorNode = alternative || node;
          if (!textMap.has(selectorNode)) {
            textMap.set(selectorNode, {});
          }
          let textEntry = textMap.get(selectorNode);
          textEntry[textType] = textEntry[textType] || [];
          textEntry[textType].push({ type: "text", value: node.getTextContent() });
          textTypes.add(textType);
        } else if (node.content) {
          const filename = node.contentDisposition?.parsed?.params?.filename || node.contentType.parsed.params.name || null;
          const attachment = {
            filename: filename ? decodeWords(filename) : null,
            mimeType: node.contentType.parsed.value,
            disposition: node.contentDisposition?.parsed?.value || null
          };
          if (related && node.contentId && !rfc822DepthExceeded) {
            attachment.related = true;
          }
          if (rfc822DepthExceeded) {
            attachment.rfc822DepthExceeded = true;
          }
          if (node.contentDescription) {
            attachment.description = node.contentDescription;
          }
          if (node.contentId) {
            attachment.contentId = node.contentId;
          }
          switch (node.contentType.parsed.value) {
            // Special handling for calendar events
            case "text/calendar":
            case "application/ics": {
              if (node.contentType.parsed.params.method) {
                attachment.method = node.contentType.parsed.params.method.toString().toUpperCase().trim();
              }
              const decodedText = node.getTextContent().replace(/\r?\n/g, "\n").replace(/\n*$/, "\n");
              attachment.content = textEncoder.encode(decodedText);
              break;
            }
            // Regular attachments
            default:
              attachment.content = node.content;
          }
          this.attachments.push(attachment);
        }
      } else if (node.contentType.multipart === "alternative") {
        alternative = node;
      } else if (node.contentType.multipart === "related") {
        related = node;
      }
      for (let childNode of node.childNodes) {
        await walk(childNode, alternative, related);
      }
    };
    await walk(this.root, false, false);
    textMap.forEach((mapEntry) => {
      textTypes.forEach((textType) => {
        if (!textContent[textType]) {
          textContent[textType] = [];
        }
        if (mapEntry[textType]) {
          mapEntry[textType].forEach((textEntry) => {
            switch (textEntry.type) {
              case "text":
                textContent[textType].push(textEntry.value);
                break;
              case "subMessage":
                {
                  switch (textType) {
                    case "html":
                      textContent[textType].push(formatHtmlHeader(textEntry.value));
                      break;
                    case "plain":
                      textContent[textType].push(formatTextHeader(textEntry.value));
                      break;
                  }
                }
                break;
            }
          });
        } else {
          let alternativeType;
          switch (textType) {
            case "html":
              alternativeType = "plain";
              break;
            case "plain":
              alternativeType = "html";
              break;
          }
          (mapEntry[alternativeType] || []).forEach((textEntry) => {
            switch (textEntry.type) {
              case "text":
                switch (textType) {
                  case "html":
                    textContent[textType].push(textToHtml(textEntry.value));
                    break;
                  case "plain":
                    textContent[textType].push(htmlToText(textEntry.value));
                    break;
                }
                break;
              case "subMessage":
                {
                  switch (textType) {
                    case "html":
                      textContent[textType].push(formatHtmlHeader(textEntry.value));
                      break;
                    case "plain":
                      textContent[textType].push(formatTextHeader(textEntry.value));
                      break;
                  }
                }
                break;
            }
          });
        }
      });
    });
    Object.keys(textContent).forEach((textType) => {
      textContent[textType] = textContent[textType].join("\n");
    });
    this.textContent = textContent;
  }
  isInlineTextNode(node) {
    if (node.contentDisposition?.parsed?.value === "attachment") {
      return false;
    }
    switch (node.contentType.parsed?.value) {
      case "text/html":
      case "text/plain":
        return true;
      case "text/calendar":
      case "text/csv":
      default:
        return false;
    }
  }
  isInlineMessageRfc822(node) {
    if (node.contentType.parsed?.value !== "message/rfc822") {
      return false;
    }
    let disposition = node.contentDisposition?.parsed?.value || (this.options.rfc822Attachments ? "attachment" : "inline");
    return disposition === "inline";
  }
  // Check if this is a specially crafted report email where message/rfc822 content should not be inlined
  forceRfc822Attachments() {
    if (this.options.forceRfc822Attachments) {
      return true;
    }
    let forceRfc822Attachments = false;
    let walk = (node) => {
      if (!node.contentType.multipart) {
        if (node.contentType.parsed && ["message/delivery-status", "message/feedback-report"].includes(node.contentType.parsed.value)) {
          forceRfc822Attachments = true;
        }
      }
      for (let childNode of node.childNodes) {
        walk(childNode);
      }
    };
    walk(this.root);
    return forceRfc822Attachments;
  }
  async resolveStream(stream) {
    let chunkLen = 0;
    let chunks = [];
    const reader = stream.getReader();
    while (true) {
      const { done, value } = await reader.read();
      if (done) {
        break;
      }
      chunks.push(value);
      chunkLen += value.length;
    }
    const result = new Uint8Array(chunkLen);
    let chunkPointer = 0;
    for (let chunk of chunks) {
      result.set(chunk, chunkPointer);
      chunkPointer += chunk.length;
    }
    return result;
  }
  async parse(buf) {
    if (this.started) {
      throw new Error("Can not reuse parser, create a new PostalMime object");
    }
    this.started = true;
    if (buf && typeof buf.getReader === "function") {
      buf = await this.resolveStream(buf);
    }
    buf = buf || new ArrayBuffer(0);
    if (typeof buf === "string") {
      buf = textEncoder.encode(buf);
    }
    if (buf instanceof Blob || Object.prototype.toString.call(buf) === "[object Blob]") {
      buf = await blobToArrayBuffer(buf);
    }
    if (buf.buffer instanceof ArrayBuffer) {
      buf = new Uint8Array(buf).buffer;
    }
    this.buf = buf;
    this.av = new Uint8Array(buf);
    this.readPos = 0;
    while (this.readPos < this.av.length) {
      const line = this.readLine();
      await this.processLine(line.bytes, line.done);
    }
    await this.processNodeTree();
    const message = {
      headers: this.root.headers.map((entry) => ({ key: entry.key, originalKey: entry.originalKey, value: entry.value })).reverse()
    };
    for (const key of ["from", "sender"]) {
      const addressHeader = this.root.headers.find((line) => line.key === key);
      if (addressHeader && addressHeader.value) {
        const addresses = address_parser_default(addressHeader.value);
        if (addresses && addresses.length) {
          message[key] = addresses[0];
        }
      }
    }
    for (const key of ["delivered-to", "return-path"]) {
      const addressHeader = this.root.headers.find((line) => line.key === key);
      if (addressHeader && addressHeader.value) {
        const addresses = address_parser_default(addressHeader.value);
        if (addresses && addresses.length && addresses[0].address) {
          const camelKey = toCamelCase(key);
          message[camelKey] = addresses[0].address;
        }
      }
    }
    for (const key of ["to", "cc", "bcc", "reply-to"]) {
      const addressHeaders = this.root.headers.filter((line) => line.key === key);
      let addresses = [];
      addressHeaders.filter((entry) => entry && entry.value).map((entry) => address_parser_default(entry.value)).forEach((parsed) => addresses = addresses.concat(parsed || []));
      if (addresses && addresses.length) {
        const camelKey = toCamelCase(key);
        message[camelKey] = addresses;
      }
    }
    for (const key of ["subject", "message-id", "in-reply-to", "references"]) {
      const header = this.root.headers.find((line) => line.key === key);
      if (header && header.value) {
        const camelKey = toCamelCase(key);
        message[camelKey] = decodeWords(header.value);
      }
    }
    let dateHeader = this.root.headers.find((line) => line.key === "date");
    if (dateHeader) {
      let date = new Date(dateHeader.value);
      if (date.toString() === "Invalid Date") {
        date = dateHeader.value;
      } else {
        date = date.toISOString();
      }
      message.date = date;
    }
    if (this.textContent?.html) {
      message.html = this.textContent.html;
    }
    if (this.textContent?.plain) {
      message.text = this.textContent.plain;
    }
    message.attachments = this.attachments;
    message.headerLines = (this.root.rawHeaderLines || []).slice().reverse();
    switch (this.attachmentEncoding) {
      case "arraybuffer":
        break;
      case "base64":
        for (let attachment of message.attachments || []) {
          if (attachment?.content) {
            attachment.content = base64ArrayBuffer(attachment.content);
            attachment.encoding = "base64";
          }
        }
        break;
      case "utf8":
        let attachmentDecoder = new TextDecoder("utf8");
        for (let attachment of message.attachments || []) {
          if (attachment?.content) {
            attachment.content = attachmentDecoder.decode(attachment.content);
            attachment.encoding = "utf8";
          }
        }
        break;
      default:
        throw new Error("Unknown attachment encoding");
    }
    return message;
  }
};

// node_modules/resend/dist/index.mjs
var import_standardwebhooks = __toESM(require_dist(), 1);
var version = "6.33.0";
function buildPaginationUrl(base2, options) {
  const queryString = buildPaginationQuery(options);
  return queryString ? `${base2}?${queryString}` : base2;
}
function buildPaginationQuery(options) {
  const searchParams = new URLSearchParams();
  if (options.limit !== void 0) searchParams.set("limit", options.limit.toString());
  if ("after" in options && options.after !== void 0) searchParams.set("after", options.after);
  if ("before" in options && options.before !== void 0) searchParams.set("before", options.before);
  return searchParams.toString();
}
var ApiKeys = class {
  constructor(resend) {
    this.resend = resend;
  }
  async create(payload, requestOptions = {}) {
    return await this.resend.post("/api-keys", payload, requestOptions);
  }
  async list(options = {}, requestOptions = {}) {
    const url = buildPaginationUrl("/api-keys", options);
    return await this.resend.get(url, requestOptions);
  }
  async update(id, payload, requestOptions = {}) {
    return await this.resend.patch(`/api-keys/${id}`, payload, requestOptions);
  }
  async remove(id, requestOptions = {}) {
    return await this.resend.delete(`/api-keys/${id}`, void 0, requestOptions);
  }
};
var AutomationRuns = class {
  constructor(resend) {
    this.resend = resend;
  }
  async get(options, requestOptions = {}) {
    return await this.resend.get(`/automations/${options.automationId}/runs/${options.runId}`, requestOptions);
  }
  async list(options, requestOptions = {}) {
    const queryString = buildPaginationQuery(options);
    const searchParams = new URLSearchParams(queryString);
    if (options.status) {
      const statusValue = Array.isArray(options.status) ? options.status.join(",") : options.status;
      searchParams.set("status", statusValue);
    }
    const qs = searchParams.toString();
    const url = qs ? `/automations/${options.automationId}/runs?${qs}` : `/automations/${options.automationId}/runs`;
    return await this.resend.get(url, requestOptions);
  }
};
function parseStepConfig(step) {
  switch (step.type) {
    case "trigger":
      return {
        key: step.key,
        type: step.type,
        config: { event_name: step.config.eventName }
      };
    case "delay":
      return {
        key: step.key,
        type: step.type,
        config: step.config
      };
    case "send_email":
      return {
        key: step.key,
        type: step.type,
        config: {
          template: step.config.template,
          subject: step.config.subject,
          from: step.config.from,
          reply_to: step.config.replyTo
        }
      };
    case "wait_for_event":
      return {
        key: step.key,
        type: step.type,
        config: {
          event_name: step.config.eventName,
          timeout: step.config.timeout,
          filter_rule: step.config.filterRule
        }
      };
    case "condition":
      return {
        key: step.key,
        type: step.type,
        config: step.config
      };
    case "contact_update":
      return {
        key: step.key,
        type: step.type,
        config: {
          first_name: step.config.firstName,
          last_name: step.config.lastName,
          unsubscribed: step.config.unsubscribed,
          properties: step.config.properties
        }
      };
    case "contact_delete":
      return {
        key: step.key,
        type: step.type,
        config: step.config
      };
    case "add_to_segment":
      return {
        key: step.key,
        type: step.type,
        config: { segment_id: step.config.segmentId }
      };
  }
}
function parseConnection(connection) {
  return {
    from: connection.from,
    to: connection.to,
    type: connection.type
  };
}
function parseAutomationToApiOptions(automation) {
  return {
    name: automation.name,
    status: automation.status,
    steps: automation.steps.map(parseStepConfig),
    connections: automation.connections.map(parseConnection)
  };
}
function parseEventToApiOptions(event) {
  return {
    event: event.event,
    contact_id: event.contactId,
    email: event.email,
    payload: event.payload
  };
}
var Automations = class {
  constructor(resend) {
    this.resend = resend;
    this.runs = new AutomationRuns(this.resend);
  }
  async create(payload, requestOptions = {}) {
    return await this.resend.post("/automations", parseAutomationToApiOptions(payload), requestOptions);
  }
  async list(options = {}, requestOptions = {}) {
    const params = [buildPaginationQuery(options)];
    if (options.status) params.push(`status=${encodeURIComponent(options.status)}`);
    const qs = params.filter(Boolean).join("&");
    const url = qs ? `/automations?${qs}` : "/automations";
    return await this.resend.get(url, requestOptions);
  }
  async get(id, requestOptions = {}) {
    return await this.resend.get(`/automations/${id}`, requestOptions);
  }
  async remove(id, requestOptions = {}) {
    return await this.resend.delete(`/automations/${id}`, void 0, requestOptions);
  }
  async update(id, payload, requestOptions = {}) {
    const apiPayload = {};
    if (payload.name !== void 0) apiPayload.name = payload.name;
    if (payload.status !== void 0) apiPayload.status = payload.status;
    if (payload.steps !== void 0) apiPayload.steps = payload.steps.map(parseStepConfig);
    if (payload.connections !== void 0) apiPayload.connections = payload.connections.map(parseConnection);
    return await this.resend.patch(`/automations/${id}`, apiPayload, requestOptions);
  }
  async duplicate(id, requestOptions = {}) {
    return await this.resend.post(`/automations/${id}/duplicate`, void 0, requestOptions);
  }
  async stop(id, requestOptions = {}) {
    return await this.resend.post(`/automations/${id}/stop`, void 0, requestOptions);
  }
};
function parseAttachments(attachments) {
  return attachments?.map((attachment) => ({
    content: attachment.content,
    filename: attachment.filename,
    path: attachment.path,
    content_type: attachment.contentType,
    content_id: attachment.contentId
  }));
}
function parseEmailToApiOptions(email) {
  return {
    attachments: parseAttachments(email.attachments),
    bcc: email.bcc,
    cc: email.cc,
    from: email.from,
    headers: email.headers,
    html: email.html,
    reply_to: email.replyTo,
    scheduled_at: email.scheduledAt,
    subject: email.subject,
    tags: email.tags,
    text: email.text,
    to: email.to,
    template: email.template ? {
      id: email.template.id,
      variables: email.template.variables
    } : void 0,
    topic_id: email.topicId
  };
}
async function render(node) {
  let render2;
  try {
    ({ render: render2 } = await import("@react-email/render"));
  } catch {
    throw new Error("Failed to render React component. Make sure to install `@react-email/render` or `@react-email/components`.");
  }
  return render2(node);
}
var Batch$1 = class {
  constructor(resend) {
    this.resend = resend;
  }
  async send(payload, requestOptions) {
    return this.create(payload, requestOptions);
  }
  async create(payload, requestOptions) {
    const emails = [];
    for (const email of payload) {
      if (email.react) {
        email.html = await render(email.react);
        email.react = void 0;
      }
      emails.push(parseEmailToApiOptions(email));
    }
    const headers = new Headers({ "x-batch-validation": requestOptions?.batchValidation ?? "strict" });
    for (const [key, value] of new Headers(requestOptions?.headers || void 0)) headers.set(key, value);
    return await this.resend.post("/emails/batch", emails, {
      ...requestOptions,
      headers
    });
  }
};
var Broadcasts = class {
  constructor(resend) {
    this.resend = resend;
  }
  async create(payload, requestOptions = {}) {
    const html = payload.react ? await render(payload.react) : payload.html;
    return await this.resend.post("/broadcasts", {
      name: payload.name,
      segment_id: payload.segmentId,
      audience_id: payload.audienceId,
      preview_text: payload.previewText,
      from: payload.from,
      html,
      reply_to: payload.replyTo,
      subject: payload.subject,
      text: payload.text,
      topic_id: payload.topicId,
      send: payload.send,
      scheduled_at: payload.scheduledAt
    }, requestOptions);
  }
  async send(id, payload, requestOptions = {}) {
    return await this.resend.post(`/broadcasts/${id}/send`, { scheduled_at: payload?.scheduledAt }, requestOptions);
  }
  async list(options = {}, requestOptions = {}) {
    const url = buildPaginationUrl("/broadcasts", options);
    return await this.resend.get(url, requestOptions);
  }
  async get(id, requestOptions = {}) {
    return await this.resend.get(`/broadcasts/${id}`, requestOptions);
  }
  async recipients(id, options, requestOptions = {}) {
    const url = `/broadcasts/${id}/recipients?${buildRecipientsQuery(options)}`;
    return await this.resend.get(url, requestOptions);
  }
  async clickedLinks(id, options = {}, requestOptions = {}) {
    const url = buildPaginationUrl(`/broadcasts/${id}/clicked-links`, options);
    return await this.resend.get(url, requestOptions);
  }
  async remove(id, requestOptions = {}) {
    return await this.resend.delete(`/broadcasts/${id}`, void 0, requestOptions);
  }
  async cancel(id, requestOptions = {}) {
    return await this.resend.post(`/broadcasts/${id}/cancel`, void 0, requestOptions);
  }
  async duplicate(id, requestOptions = {}) {
    return await this.resend.post(`/broadcasts/${id}/duplicate`, void 0, requestOptions);
  }
  async update(id, payload, requestOptions = {}) {
    const html = payload.react ? await render(payload.react) : payload.html;
    return await this.resend.patch(`/broadcasts/${id}`, {
      name: payload.name,
      segment_id: payload.segmentId,
      audience_id: payload.audienceId,
      from: payload.from,
      html,
      text: payload.text,
      subject: payload.subject,
      reply_to: payload.replyTo,
      preview_text: payload.previewText,
      topic_id: payload.topicId
    }, requestOptions);
  }
};
function buildRecipientsQuery(options) {
  const { type, email, bounceType, ...pagination } = options;
  const searchParams = new URLSearchParams(buildPaginationQuery(pagination));
  searchParams.set("type", type);
  if (email !== void 0) searchParams.set("email", email);
  if (bounceType !== void 0) searchParams.set("bounce_type", bounceType);
  return searchParams.toString();
}
function parseContactPropertyFromApi(contactProperty) {
  return {
    id: contactProperty.id,
    key: contactProperty.key,
    createdAt: contactProperty.created_at,
    type: contactProperty.type,
    fallbackValue: contactProperty.fallback_value
  };
}
function parseContactPropertyToApiOptions(contactProperty) {
  if ("key" in contactProperty) return {
    key: contactProperty.key,
    type: contactProperty.type,
    fallback_value: contactProperty.fallbackValue
  };
  return { fallback_value: contactProperty.fallbackValue };
}
var ContactProperties = class {
  constructor(resend) {
    this.resend = resend;
  }
  async create(options, requestOptions = {}) {
    const apiOptions = parseContactPropertyToApiOptions(options);
    return await this.resend.post("/contact-properties", apiOptions, requestOptions);
  }
  async list(options = {}, requestOptions = {}) {
    const url = buildPaginationUrl("/contact-properties", options);
    const response = await this.resend.get(url, requestOptions);
    if (response.data) return {
      data: {
        ...response.data,
        data: response.data.data.map((apiContactProperty) => parseContactPropertyFromApi(apiContactProperty))
      },
      headers: response.headers,
      error: null
    };
    return response;
  }
  async get(id, requestOptions = {}) {
    if (!id) return {
      data: null,
      headers: null,
      error: {
        message: "Missing `id` field.",
        statusCode: null,
        name: "missing_required_field"
      }
    };
    const response = await this.resend.get(`/contact-properties/${id}`, requestOptions);
    if (response.data) return {
      data: {
        object: "contact_property",
        ...parseContactPropertyFromApi(response.data)
      },
      headers: response.headers,
      error: null
    };
    return response;
  }
  async update(payload, requestOptions = {}) {
    if (!payload.id) return {
      data: null,
      headers: null,
      error: {
        message: "Missing `id` field.",
        statusCode: null,
        name: "missing_required_field"
      }
    };
    const apiOptions = parseContactPropertyToApiOptions(payload);
    return await this.resend.patch(`/contact-properties/${payload.id}`, apiOptions, requestOptions);
  }
  async remove(id, requestOptions = {}) {
    if (!id) return {
      data: null,
      headers: null,
      error: {
        message: "Missing `id` field.",
        statusCode: null,
        name: "missing_required_field"
      }
    };
    return await this.resend.delete(`/contact-properties/${id}`, void 0, requestOptions);
  }
};
var ContactImports = class {
  constructor(resend) {
    this.resend = resend;
  }
  async create(payload, requestOptions = {}) {
    const formData = this.buildCreateFormData(payload);
    return this.resend.post("/contacts/imports", formData, requestOptions);
  }
  async list(options = {}, requestOptions = {}) {
    const searchParams = new URLSearchParams(buildPaginationQuery(options));
    if (options.status !== void 0) searchParams.set("status", options.status);
    const queryString = searchParams.toString();
    const url = queryString ? `/contacts/imports?${queryString}` : "/contacts/imports";
    return this.resend.get(url, requestOptions);
  }
  async get(id, requestOptions = {}) {
    return this.resend.get(`/contacts/imports/${id}`, requestOptions);
  }
  buildCreateFormData(payload) {
    const formData = new FormData();
    formData.append("file", payload.file);
    this.appendField(formData, "column_map", this.buildColumnMap(payload.columnMap ?? null));
    this.appendField(formData, "on_conflict", payload.onConflict ?? null);
    this.appendField(formData, "segments", payload.segments ?? null);
    this.appendField(formData, "topics", payload.topics ?? null);
    return formData;
  }
  buildColumnMap(columnMap) {
    if (columnMap === null) return null;
    return {
      email: columnMap.email,
      first_name: columnMap.firstName,
      last_name: columnMap.lastName,
      unsubscribed: columnMap.unsubscribed,
      properties: columnMap.properties
    };
  }
  appendField(formData, name2, value) {
    if (value === null) return;
    formData.append(name2, typeof value === "string" ? value : JSON.stringify(value));
  }
};
var ContactSegments = class {
  constructor(resend) {
    this.resend = resend;
  }
  async list(options, requestOptions = {}) {
    if (!options.contactId && !options.email) return {
      data: null,
      headers: null,
      error: {
        message: "Missing `id` or `email` field.",
        statusCode: null,
        name: "missing_required_field"
      }
    };
    const url = buildPaginationUrl(`/contacts/${options.email ? options.email : options.contactId}/segments`, options);
    return await this.resend.get(url, requestOptions);
  }
  async add(options, requestOptions = {}) {
    if (!options.contactId && !options.email) return {
      data: null,
      headers: null,
      error: {
        message: "Missing `id` or `email` field.",
        statusCode: null,
        name: "missing_required_field"
      }
    };
    const identifier = options.email ? options.email : options.contactId;
    return this.resend.post(`/contacts/${identifier}/segments/${options.segmentId}`, void 0, requestOptions);
  }
  async remove(options, requestOptions = {}) {
    if (!options.contactId && !options.email) return {
      data: null,
      headers: null,
      error: {
        message: "Missing `id` or `email` field.",
        statusCode: null,
        name: "missing_required_field"
      }
    };
    const identifier = options.email ? options.email : options.contactId;
    return this.resend.delete(`/contacts/${identifier}/segments/${options.segmentId}`, void 0, requestOptions);
  }
};
var ContactTopics = class {
  constructor(resend) {
    this.resend = resend;
  }
  async update(payload, requestOptions = {}) {
    if (!payload.id && !payload.email) return {
      data: null,
      headers: null,
      error: {
        message: "Missing `id` or `email` field.",
        statusCode: null,
        name: "missing_required_field"
      }
    };
    const identifier = payload.email ? payload.email : payload.id;
    return this.resend.patch(`/contacts/${identifier}/topics`, payload.topics, requestOptions);
  }
  async list(options, requestOptions = {}) {
    if (!options.id && !options.email) return {
      data: null,
      headers: null,
      error: {
        message: "Missing `id` or `email` field.",
        statusCode: null,
        name: "missing_required_field"
      }
    };
    const url = buildPaginationUrl(`/contacts/${options.email ? options.email : options.id}/topics`, options);
    return this.resend.get(url, requestOptions);
  }
};
var Contacts = class {
  constructor(resend) {
    this.resend = resend;
    this.imports = new ContactImports(this.resend);
    this.topics = new ContactTopics(this.resend);
    this.segments = new ContactSegments(this.resend);
  }
  async create(payload, requestOptions = {}) {
    if ("audienceId" in payload) {
      if ("segments" in payload || "topics" in payload) return {
        data: null,
        headers: null,
        error: {
          message: "`audienceId` is deprecated, and cannot be used together with `segments` or `topics`. Use `segments` instead to add one or more segments to the new contact.",
          statusCode: null,
          name: "invalid_parameter"
        }
      };
      return await this.resend.post(`/audiences/${payload.audienceId}/contacts`, {
        unsubscribed: payload.unsubscribed,
        email: payload.email,
        first_name: payload.firstName,
        last_name: payload.lastName,
        properties: payload.properties
      }, requestOptions);
    }
    return await this.resend.post("/contacts", {
      unsubscribed: payload.unsubscribed,
      email: payload.email,
      first_name: payload.firstName,
      last_name: payload.lastName,
      properties: payload.properties,
      segments: payload.segments,
      topics: payload.topics
    }, requestOptions);
  }
  async list(options = {}, requestOptions = {}) {
    const segmentId = options.segmentId ?? options.audienceId;
    if (!segmentId) {
      const url2 = buildPaginationUrl("/contacts", options);
      return await this.resend.get(url2, requestOptions);
    }
    const url = buildPaginationUrl(`/segments/${segmentId}/contacts`, options);
    return await this.resend.get(url, requestOptions);
  }
  async get(options, requestOptions = {}) {
    if (typeof options === "string") return this.resend.get(`/contacts/${options}`, requestOptions);
    if (!options.id && !options.email) return {
      data: null,
      headers: null,
      error: {
        message: "Missing `id` or `email` field.",
        statusCode: null,
        name: "missing_required_field"
      }
    };
    if (!options.audienceId) return this.resend.get(`/contacts/${options?.email ? options?.email : options?.id}`, requestOptions);
    return this.resend.get(`/audiences/${options.audienceId}/contacts/${options?.email ? options?.email : options?.id}`, requestOptions);
  }
  async update(options, requestOptions = {}) {
    if (!options.id && !options.email) return {
      data: null,
      headers: null,
      error: {
        message: "Missing `id` or `email` field.",
        statusCode: null,
        name: "missing_required_field"
      }
    };
    if (!options.audienceId) return await this.resend.patch(`/contacts/${options?.email ? options?.email : options?.id}`, {
      unsubscribed: options.unsubscribed,
      first_name: options.firstName,
      last_name: options.lastName,
      properties: options.properties
    }, requestOptions);
    return await this.resend.patch(`/audiences/${options.audienceId}/contacts/${options?.email ? options?.email : options?.id}`, {
      unsubscribed: options.unsubscribed,
      first_name: options.firstName,
      last_name: options.lastName,
      properties: options.properties
    }, requestOptions);
  }
  async remove(payload, requestOptions = {}) {
    if (typeof payload === "string") return this.resend.delete(`/contacts/${payload}`, void 0, requestOptions);
    if (!payload.id && !payload.email) return {
      data: null,
      headers: null,
      error: {
        message: "Missing `id` or `email` field.",
        statusCode: null,
        name: "missing_required_field"
      }
    };
    if (!payload.audienceId) return this.resend.delete(`/contacts/${payload?.email ? payload?.email : payload?.id}`, void 0, requestOptions);
    return this.resend.delete(`/audiences/${payload.audienceId}/contacts/${payload?.email ? payload?.email : payload?.id}`, void 0, requestOptions);
  }
};
function parseDomainToApiOptions(domain) {
  return {
    name: domain.name,
    region: domain.region,
    custom_return_path: domain.customReturnPath,
    capabilities: domain.capabilities,
    open_tracking: domain.openTracking,
    click_tracking: domain.clickTracking,
    tls: domain.tls,
    tracking_subdomain: domain.trackingSubdomain
  };
}
var DomainClaims = class {
  constructor(resend) {
    this.resend = resend;
  }
  async create(payload, requestOptions = {}) {
    return await this.resend.post("/domains/claim", {
      name: payload.name,
      region: payload.region,
      custom_return_path: payload.customReturnPath,
      open_tracking: payload.openTracking,
      click_tracking: payload.clickTracking,
      tracking_subdomain: payload.trackingSubdomain
    }, requestOptions);
  }
  async get(domainId, requestOptions = {}) {
    return await this.resend.get(`/domains/${domainId}/claim`, requestOptions);
  }
  async verify(domainId, requestOptions = {}) {
    return await this.resend.post(`/domains/${domainId}/claim/verify`, void 0, requestOptions);
  }
};
var Domains = class {
  constructor(resend) {
    this.resend = resend;
    this.claims = new DomainClaims(this.resend);
  }
  async create(payload, requestOptions = {}) {
    return await this.resend.post("/domains", parseDomainToApiOptions(payload), requestOptions);
  }
  async list(options = {}, requestOptions = {}) {
    const url = buildPaginationUrl("/domains", options);
    return await this.resend.get(url, requestOptions);
  }
  async get(id, requestOptions = {}) {
    return await this.resend.get(`/domains/${id}`, requestOptions);
  }
  async update(payload, requestOptions = {}) {
    return await this.resend.patch(`/domains/${payload.id}`, {
      click_tracking: payload.clickTracking,
      open_tracking: payload.openTracking,
      tls: payload.tls,
      capabilities: payload.capabilities,
      tracking_subdomain: payload.trackingSubdomain
    }, requestOptions);
  }
  async remove(id, requestOptions = {}) {
    return await this.resend.delete(`/domains/${id}`, void 0, requestOptions);
  }
  async verify(id, requestOptions = {}) {
    return await this.resend.post(`/domains/${id}/verify`, void 0, requestOptions);
  }
};
var Attachments$1 = class {
  constructor(resend) {
    this.resend = resend;
  }
  async get(options, requestOptions = {}) {
    const { emailId, id } = options;
    return await this.resend.get(`/emails/${emailId}/attachments/${id}`, requestOptions);
  }
  async list(options, requestOptions = {}) {
    const { emailId } = options;
    const url = buildPaginationUrl(`/emails/${emailId}/attachments`, options);
    return await this.resend.get(url, requestOptions);
  }
};
var Attachments = class {
  constructor(resend) {
    this.resend = resend;
  }
  async get(options, requestOptions = {}) {
    const { emailId, id } = options;
    return await this.resend.get(`/emails/receiving/${emailId}/attachments/${id}`, requestOptions);
  }
  async list(options, requestOptions = {}) {
    const { emailId } = options;
    const url = buildPaginationUrl(`/emails/receiving/${emailId}/attachments`, options);
    return await this.resend.get(url, requestOptions);
  }
};
var Receiving = class {
  constructor(resend) {
    this.resend = resend;
    this.attachments = new Attachments(resend);
  }
  async get(id, options = {}, requestOptions = {}) {
    const searchParams = new URLSearchParams();
    if (options.html_format !== void 0) searchParams.set("html_format", options.html_format);
    const queryString = searchParams.toString();
    const path3 = queryString ? `/emails/receiving/${id}?${queryString}` : `/emails/receiving/${id}`;
    return await this.resend.get(path3, requestOptions);
  }
  async list(options = {}, requestOptions = {}) {
    const url = buildPaginationUrl("/emails/receiving", options);
    return await this.resend.get(url, requestOptions);
  }
  async forward(options, requestOptions = {}) {
    const { emailId, to, from } = options;
    const passthrough = options.passthrough !== false;
    const emailResponse = await this.get(emailId, {}, { signal: requestOptions.signal });
    if (emailResponse.error) return {
      data: null,
      error: emailResponse.error,
      headers: emailResponse.headers
    };
    const email = emailResponse.data;
    const originalSubject = email.subject || "(no subject)";
    if (passthrough) return this.forwardPassthrough(email, {
      to,
      from,
      subject: originalSubject
    }, requestOptions);
    const forwardSubject = originalSubject.startsWith("Fwd:") ? originalSubject : `Fwd: ${originalSubject}`;
    return this.forwardWrapped(email, {
      to,
      from,
      subject: forwardSubject,
      text: "text" in options ? options.text : void 0,
      html: "html" in options ? options.html : void 0
    }, requestOptions);
  }
  async forwardPassthrough(email, options, requestOptions) {
    const { to, from, subject } = options;
    if (!email.raw?.download_url) return {
      data: null,
      error: {
        name: "validation_error",
        message: "Raw email content is not available for this email",
        statusCode: 400
      },
      headers: null
    };
    const raw = await this.downloadRaw(email.raw.download_url, requestOptions.signal);
    if (raw.error) return {
      data: null,
      error: raw.error,
      headers: null
    };
    const parsed = await PostalMime.parse(raw.content, { attachmentEncoding: "base64" });
    const attachments = parsed.attachments.map((attachment) => {
      const contentId = attachment.contentId ? attachment.contentId.replace(/^<|>$/g, "") : void 0;
      return {
        filename: attachment.filename,
        content: attachment.content.toString(),
        content_type: attachment.mimeType,
        content_id: contentId || void 0
      };
    });
    return await this.resend.post("/emails", {
      from,
      to,
      subject,
      text: parsed.text || void 0,
      html: parsed.html || void 0,
      attachments: attachments.length > 0 ? attachments : void 0
    }, requestOptions);
  }
  async forwardWrapped(email, options, requestOptions) {
    const { to, from, subject, text, html } = options;
    if (!email.raw?.download_url) return {
      data: null,
      error: {
        name: "validation_error",
        message: "Raw email content is not available for this email",
        statusCode: 400
      },
      headers: null
    };
    const raw = await this.downloadRaw(email.raw.download_url, requestOptions.signal);
    if (raw.error) return {
      data: null,
      error: raw.error,
      headers: null
    };
    return await this.resend.post("/emails", {
      from,
      to,
      subject,
      text,
      html,
      attachments: [{
        filename: "forwarded_message.eml",
        content: Buffer.from(raw.content).toString("base64"),
        content_type: "message/rfc822"
      }]
    }, requestOptions);
  }
  async downloadRaw(url, signal) {
    try {
      const response = await fetch(url, { signal });
      if (!response.ok) return {
        content: null,
        error: {
          name: "application_error",
          message: "Failed to download raw email content",
          statusCode: response.status
        }
      };
      return {
        content: await response.arrayBuffer(),
        error: null
      };
    } catch {
      return {
        content: null,
        error: {
          name: "application_error",
          message: "Failed to download raw email content",
          statusCode: null
        }
      };
    }
  }
};
var Emails = class {
  constructor(resend) {
    this.resend = resend;
    this.attachments = new Attachments$1(resend);
    this.receiving = new Receiving(resend);
  }
  async send(payload, requestOptions = {}) {
    return this.create(payload, requestOptions);
  }
  async create(payload, requestOptions = {}) {
    const body = { ...payload };
    if (payload.react) body.html = await render(payload.react);
    return await this.resend.post("/emails", parseEmailToApiOptions(body), requestOptions);
  }
  async get(id, requestOptions = {}) {
    return await this.resend.get(`/emails/${id}`, requestOptions);
  }
  async list(options = {}, requestOptions = {}) {
    const url = buildPaginationUrl("/emails", options);
    return await this.resend.get(url, requestOptions);
  }
  async update(payload, requestOptions = {}) {
    return await this.resend.patch(`/emails/${payload.id}`, { scheduled_at: payload.scheduledAt }, requestOptions);
  }
  async cancel(id, requestOptions = {}) {
    return await this.resend.post(`/emails/${id}/cancel`, void 0, requestOptions);
  }
  async share(id, payload, requestOptions = {}) {
    return await this.resend.post(`/emails/${id}/share`, { expires_in: payload?.expiresIn }, requestOptions);
  }
  async metrics(options = {}, requestOptions = {}) {
    const queryString = buildMetricsQuery(options);
    const url = queryString ? `/emails/metrics?${queryString}` : "/emails/metrics";
    return await this.resend.get(url, requestOptions);
  }
};
function buildMetricsQuery(options) {
  const params = {
    start_date: options.startDate,
    end_date: options.endDate,
    timezone: options.timezone,
    granularity: options.granularity,
    metrics: options.metrics?.join(","),
    dimensions: options.dimensions?.join(","),
    domain_id: options.domainId?.join(","),
    email_id: options.emailId?.join(","),
    broadcast_id: options.broadcastId?.join(",")
  };
  const searchParams = new URLSearchParams();
  for (const [key, value] of Object.entries(params)) if (value !== void 0 && value !== "") searchParams.set(key, value);
  return searchParams.toString();
}
var Events$1 = class {
  constructor(resend) {
    this.resend = resend;
  }
  async send(payload, requestOptions = {}) {
    return await this.resend.post("/events/send", parseEventToApiOptions(payload), requestOptions);
  }
  async create(payload, requestOptions = {}) {
    return await this.resend.post("/events", payload, requestOptions);
  }
  async get(identifier, requestOptions = {}) {
    return await this.resend.get(`/events/${encodeURIComponent(identifier)}`, requestOptions);
  }
  async list(options = {}, requestOptions = {}) {
    const url = buildPaginationUrl("/events", options);
    return await this.resend.get(url, requestOptions);
  }
  async update(identifier, payload, requestOptions = {}) {
    return await this.resend.patch(`/events/${encodeURIComponent(identifier)}`, payload, requestOptions);
  }
  async remove(identifier, requestOptions = {}) {
    return await this.resend.delete(`/events/${encodeURIComponent(identifier)}`, void 0, requestOptions);
  }
};
var InboxAgent = class {
  constructor(resend) {
    this.resend = resend;
  }
  async get(options, requestOptions = {}) {
    return this.resend.get(`/inboxes/${options.inboxId}/agent`, requestOptions);
  }
  async update(options, requestOptions = {}) {
    const { inboxId, instructions, tone, enabledActions } = options;
    return this.resend.patch(`/inboxes/${inboxId}/agent`, {
      instructions,
      tone,
      enabled_actions: enabledActions
    }, requestOptions);
  }
};
function buildInboxCursorUrl(base2, options = {}) {
  const searchParams = new URLSearchParams();
  for (const [key, value] of Object.entries(options)) {
    if (value === void 0) continue;
    searchParams.set(key, Array.isArray(value) ? value.join(",") : String(value));
  }
  const queryString = searchParams.toString();
  return queryString ? `${base2}?${queryString}` : base2;
}
var InboxDrafts = class {
  constructor(resend) {
    this.resend = resend;
  }
  async list(options, requestOptions = {}) {
    const { inboxId, limit, after, before } = options;
    const url = buildInboxCursorUrl(`/inboxes/${inboxId}/drafts`, {
      limit,
      after,
      before
    });
    return this.resend.get(url, requestOptions);
  }
  async create(payload, options = {}) {
    const { inboxId, threadId, replyToEmailId, attachments, ...content } = payload;
    return this.resend.post(`/inboxes/${inboxId}/drafts`, {
      ...content,
      attachments: parseAttachments(attachments),
      thread_id: threadId,
      reply_to_email_id: replyToEmailId
    }, options);
  }
  async get(options, requestOptions = {}) {
    const { inboxId, draftId } = options;
    return this.resend.get(`/inboxes/${inboxId}/drafts/${draftId}`, requestOptions);
  }
  async update(options, requestOptions = {}) {
    const { inboxId, draftId, attachments, ...content } = options;
    return this.resend.patch(`/inboxes/${inboxId}/drafts/${draftId}`, {
      ...content,
      attachments: attachments === null ? null : parseAttachments(attachments)
    }, requestOptions);
  }
  async remove(options, requestOptions = {}) {
    const { inboxId, draftId } = options;
    return this.resend.delete(`/inboxes/${inboxId}/drafts/${draftId}`, void 0, requestOptions);
  }
  async send(payload, options = {}) {
    const { inboxId, draftId, headers } = payload;
    return this.resend.post(`/inboxes/${inboxId}/drafts/${draftId}/send`, headers ? { headers } : void 0, options);
  }
};
var InboxLabels = class {
  constructor(resend) {
    this.resend = resend;
  }
  async list(options, requestOptions = {}) {
    return this.resend.get(`/inboxes/${options.inboxId}/labels`, requestOptions);
  }
  async create(payload, options = {}) {
    const { inboxId, name: name2, color } = payload;
    return this.resend.post(`/inboxes/${inboxId}/labels`, {
      name: name2,
      color
    }, options);
  }
  async update(options, requestOptions = {}) {
    const { inboxId, labelId, name: name2, color } = options;
    return this.resend.patch(`/inboxes/${inboxId}/labels/${labelId}`, {
      name: name2,
      color
    }, requestOptions);
  }
  async remove(options, requestOptions = {}) {
    const { inboxId, labelId } = options;
    return this.resend.delete(`/inboxes/${inboxId}/labels/${labelId}`, void 0, requestOptions);
  }
};
var InboxThreadEmails = class {
  constructor(resend) {
    this.resend = resend;
  }
  async list(options, requestOptions = {}) {
    const { inboxId, threadId, ...pagination } = options;
    const url = buildPaginationUrl(`/inboxes/${inboxId}/threads/${threadId}/emails`, pagination);
    return this.resend.get(url, requestOptions);
  }
  async get(options, requestOptions = {}) {
    const { inboxId, threadId, emailId } = options;
    return this.resend.get(`/inboxes/${inboxId}/threads/${threadId}/emails/${emailId}`, requestOptions);
  }
  async reply(payload, options = {}) {
    const { inboxId, threadId, emailId, cc, bcc, html, text, subject, replyAll, attachments, headers } = payload;
    return this.resend.post(`/inboxes/${inboxId}/threads/${threadId}/emails/${emailId}/reply`, {
      cc,
      bcc,
      html,
      text,
      subject,
      reply_all: replyAll,
      attachments: parseAttachments(attachments),
      headers
    }, options);
  }
  async forward(payload, options = {}) {
    const { inboxId, threadId, emailId, to, cc, bcc, html, text, subject, attachments, headers } = payload;
    return this.resend.post(`/inboxes/${inboxId}/threads/${threadId}/emails/${emailId}/forward`, {
      to,
      cc,
      bcc,
      html,
      text,
      subject,
      attachments: parseAttachments(attachments),
      headers
    }, options);
  }
};
var InboxThreads = class {
  constructor(resend) {
    this.resend = resend;
    this.emails = new InboxThreadEmails(resend);
  }
  async list(options, requestOptions = {}) {
    const { inboxId, folders, labels, read, limit, after, before } = options;
    const url = buildInboxCursorUrl(`/inboxes/${inboxId}/threads`, {
      folders,
      labels,
      read,
      limit,
      after,
      before
    });
    return this.resend.get(url, requestOptions);
  }
  async search(options, requestOptions = {}) {
    const { inboxId, folders, labels, read, query, from, to, cc, bcc, hasAttachment, startDate, endDate, limit, after, before } = options;
    const url = buildInboxCursorUrl(`/inboxes/${inboxId}/threads/search`, {
      folders,
      labels,
      read,
      query,
      from,
      to,
      cc,
      bcc,
      has_attachment: hasAttachment,
      start_date: startDate,
      end_date: endDate,
      limit,
      after,
      before
    });
    return this.resend.get(url, requestOptions);
  }
  async get(options, requestOptions = {}) {
    const { inboxId, threadId } = options;
    return this.resend.get(`/inboxes/${inboxId}/threads/${threadId}`, requestOptions);
  }
  async update(options, requestOptions = {}) {
    const { inboxId, threadId, read, folder, addLabelIds, removeLabelIds } = options;
    return this.resend.patch(`/inboxes/${inboxId}/threads/${threadId}`, {
      read,
      folder,
      add_label_ids: addLabelIds,
      remove_label_ids: removeLabelIds
    }, requestOptions);
  }
  async remove(options, requestOptions = {}) {
    const { inboxId, threadId } = options;
    return this.resend.delete(`/inboxes/${inboxId}/threads/${threadId}`, void 0, requestOptions);
  }
};
var Inboxes = class {
  constructor(resend) {
    this.resend = resend;
    this.threads = new InboxThreads(resend);
    this.labels = new InboxLabels(resend);
    this.drafts = new InboxDrafts(resend);
    this.agent = new InboxAgent(resend);
  }
  async create(payload, options = {}) {
    return this.resend.post("/inboxes", {
      email_address: payload.emailAddress,
      name: payload.name,
      forwarding: payload.forwarding,
      from_name: payload.fromName
    }, options);
  }
  async list(options = {}, requestOptions = {}) {
    const url = buildPaginationUrl("/inboxes", options);
    return this.resend.get(url, requestOptions);
  }
  async get(idOrEmail, requestOptions = {}) {
    return this.resend.get(`/inboxes/${encodeURIComponent(idOrEmail)}`, requestOptions);
  }
  async update(id, payload, requestOptions = {}) {
    return this.resend.patch(`/inboxes/${id}`, {
      name: payload.name,
      from_name: payload.fromName
    }, requestOptions);
  }
  async remove(id, requestOptions = {}) {
    return this.resend.delete(`/inboxes/${id}`, void 0, requestOptions);
  }
};
var Logs = class {
  constructor(resend) {
    this.resend = resend;
  }
  async list(options = {}, requestOptions = {}) {
    const url = buildPaginationUrl("/logs", options);
    return await this.resend.get(url, requestOptions);
  }
  async get(id, requestOptions = {}) {
    return await this.resend.get(`/logs/${id}`, requestOptions);
  }
};
var OAuthGrants = class {
  constructor(resend) {
    this.resend = resend;
  }
  async list(options = {}, requestOptions = {}) {
    const url = buildPaginationUrl("/oauth/grants", options);
    return await this.resend.get(url, requestOptions);
  }
  async revoke(id, requestOptions = {}) {
    return await this.resend.delete(`/oauth/grants/${id}`, void 0, requestOptions);
  }
};
var Segments = class {
  constructor(resend) {
    this.resend = resend;
  }
  async create(payload, requestOptions = {}) {
    return await this.resend.post("/segments", payload, requestOptions);
  }
  async list(options = {}, requestOptions = {}) {
    const url = buildPaginationUrl("/segments", options);
    return await this.resend.get(url, requestOptions);
  }
  async get(id, requestOptions = {}) {
    return await this.resend.get(`/segments/${id}`, requestOptions);
  }
  async update(id, payload, requestOptions = {}) {
    return await this.resend.patch(`/segments/${id}`, payload, requestOptions);
  }
  async remove(id, requestOptions = {}) {
    return await this.resend.delete(`/segments/${id}`, void 0, requestOptions);
  }
};
var Batch = class {
  constructor(resend) {
    this.resend = resend;
  }
  async add(options, requestOptions = {}) {
    return this.resend.post("/suppressions/batch/add", options, requestOptions);
  }
  async remove(options, requestOptions = {}) {
    return this.resend.post("/suppressions/batch/remove", options, requestOptions);
  }
};
var missingIdentifierError = () => ({
  data: null,
  headers: null,
  error: {
    message: "Missing `id` field.",
    statusCode: null,
    name: "missing_required_field"
  }
});
var Suppressions = class {
  constructor(resend) {
    this.resend = resend;
    this.batch = new Batch(resend);
  }
  async add(options, requestOptions = {}) {
    return this.resend.post("/suppressions", options, requestOptions);
  }
  async list(options = {}, requestOptions = {}) {
    const queryString = buildSuppressionsQuery(options);
    const url = queryString ? `/suppressions?${queryString}` : "/suppressions";
    return this.resend.get(url, requestOptions);
  }
  async get(idOrEmail, requestOptions = {}) {
    if (!idOrEmail) return missingIdentifierError();
    return this.resend.get(`/suppressions/${encodeURIComponent(idOrEmail)}`, requestOptions);
  }
  async remove(idOrEmail, requestOptions = {}) {
    if (!idOrEmail) return missingIdentifierError();
    return this.resend.delete(`/suppressions/${encodeURIComponent(idOrEmail)}`, void 0, requestOptions);
  }
};
function buildSuppressionsQuery(options) {
  const { origin, ...pagination } = options;
  const searchParams = new URLSearchParams(buildPaginationQuery(pagination));
  if (origin) searchParams.set("origin", origin);
  return searchParams.toString();
}
function getPaginationQueryProperties(options = {}) {
  const query = new URLSearchParams();
  if (options.before) query.set("before", options.before);
  if (options.after) query.set("after", options.after);
  if (options.limit) query.set("limit", options.limit.toString());
  return query.size > 0 ? `?${query.toString()}` : "";
}
function parseVariables(variables) {
  return variables?.map((variable) => ({
    key: variable.key,
    type: variable.type,
    fallback_value: variable.fallbackValue
  }));
}
function parseTemplateToApiOptions(template) {
  return {
    name: "name" in template ? template.name : void 0,
    subject: template.subject,
    html: template.html,
    text: template.text,
    alias: template.alias,
    from: template.from,
    reply_to: template.replyTo,
    variables: parseVariables(template.variables)
  };
}
var ChainableTemplateResult = class {
  constructor(promise, publishFn) {
    this.promise = promise;
    this.publishFn = publishFn;
  }
  then(onfulfilled, onrejected) {
    return this.promise.then(onfulfilled, onrejected);
  }
  async publish(requestOptions = {}) {
    const { data, error: error2 } = await this.promise;
    if (error2) return {
      data: null,
      headers: null,
      error: error2
    };
    return this.publishFn(data.id, requestOptions);
  }
};
var Templates = class {
  constructor(resend) {
    this.resend = resend;
  }
  create(payload, requestOptions = {}) {
    return new ChainableTemplateResult(this.performCreate(payload, requestOptions), this.publish.bind(this));
  }
  async performCreate(payload, requestOptions) {
    const body = { ...payload };
    if (payload.react) body.html = await render(payload.react);
    return this.resend.post("/templates", parseTemplateToApiOptions(body), requestOptions);
  }
  async remove(identifier, requestOptions = {}) {
    return await this.resend.delete(`/templates/${identifier}`, void 0, requestOptions);
  }
  async get(identifier, requestOptions = {}) {
    return await this.resend.get(`/templates/${identifier}`, requestOptions);
  }
  async list(options = {}, requestOptions = {}) {
    return this.resend.get(`/templates${getPaginationQueryProperties(options)}`, requestOptions);
  }
  duplicate(identifier, requestOptions = {}) {
    return new ChainableTemplateResult(this.resend.post(`/templates/${identifier}/duplicate`, void 0, requestOptions), this.publish.bind(this));
  }
  async publish(identifier, requestOptions = {}) {
    return await this.resend.post(`/templates/${identifier}/publish`, void 0, requestOptions);
  }
  async update(identifier, payload, requestOptions = {}) {
    return await this.resend.patch(`/templates/${identifier}`, parseTemplateToApiOptions(payload), requestOptions);
  }
};
var Topics = class {
  constructor(resend) {
    this.resend = resend;
  }
  async create(payload, requestOptions = {}) {
    const { defaultSubscription, ...body } = payload;
    return await this.resend.post("/topics", {
      ...body,
      default_subscription: defaultSubscription
    }, requestOptions);
  }
  async list(requestOptions = {}) {
    return await this.resend.get("/topics", requestOptions);
  }
  async get(id, requestOptions = {}) {
    if (!id) return {
      data: null,
      headers: null,
      error: {
        message: "Missing `id` field.",
        statusCode: null,
        name: "missing_required_field"
      }
    };
    return await this.resend.get(`/topics/${id}`, requestOptions);
  }
  async update(payload, requestOptions = {}) {
    if (!payload.id) return {
      data: null,
      headers: null,
      error: {
        message: "Missing `id` field.",
        statusCode: null,
        name: "missing_required_field"
      }
    };
    return await this.resend.patch(`/topics/${payload.id}`, payload, requestOptions);
  }
  async remove(id, requestOptions = {}) {
    if (!id) return {
      data: null,
      headers: null,
      error: {
        message: "Missing `id` field.",
        statusCode: null,
        name: "missing_required_field"
      }
    };
    return await this.resend.delete(`/topics/${id}`, void 0, requestOptions);
  }
};
var Usage = class {
  constructor(resend) {
    this.resend = resend;
  }
  async get(requestOptions = {}) {
    return await this.resend.get("/usage", requestOptions);
  }
};
var Attempts = class {
  constructor(resend) {
    this.resend = resend;
  }
  async list(options, requestOptions = {}) {
    const { webhookId, eventId } = options;
    const url = buildPaginationUrl(`/webhooks/${webhookId}/events/${eventId}/attempts`, options);
    return await this.resend.get(url, requestOptions);
  }
};
var Events = class {
  constructor(resend) {
    this.resend = resend;
    this.attempts = new Attempts(resend);
  }
  async list(options, requestOptions = {}) {
    const { webhookId } = options;
    const url = buildPaginationUrl(`/webhooks/${webhookId}/events`, options);
    return await this.resend.get(url, requestOptions);
  }
  async get(options, requestOptions = {}) {
    const { webhookId, eventId } = options;
    return await this.resend.get(`/webhooks/${webhookId}/events/${eventId}`, requestOptions);
  }
  async replay(options, requestOptions = {}) {
    const { webhookId, eventId } = options;
    return await this.resend.post(`/webhooks/${webhookId}/events/${eventId}/replay`, void 0, requestOptions);
  }
};
var Webhooks = class {
  constructor(resend) {
    this.resend = resend;
    this.events = new Events(resend);
  }
  async create(payload, requestOptions = {}) {
    return await this.resend.post("/webhooks", payload, requestOptions);
  }
  async get(id, requestOptions = {}) {
    return await this.resend.get(`/webhooks/${id}`, requestOptions);
  }
  async list(options = {}, requestOptions = {}) {
    const url = buildPaginationUrl("/webhooks", options);
    return await this.resend.get(url, requestOptions);
  }
  async update(id, payload, requestOptions = {}) {
    return await this.resend.patch(`/webhooks/${id}`, payload, requestOptions);
  }
  async remove(id, requestOptions = {}) {
    return await this.resend.delete(`/webhooks/${id}`, void 0, requestOptions);
  }
  async rotateSigningSecret(id, requestOptions = {}) {
    return await this.resend.post(`/webhooks/${id}/signing-secret/rotate`, void 0, requestOptions);
  }
  verify(payload) {
    return new import_standardwebhooks.Webhook(payload.webhookSecret).verify(payload.payload, {
      "webhook-id": payload.headers.id,
      "webhook-timestamp": payload.headers.timestamp,
      "webhook-signature": payload.headers.signature
    });
  }
};
var defaultBaseUrl = "https://api.resend.com";
var defaultUserAgent = `resend-node:${version}`;
function getDefaultBaseUrl() {
  return typeof process !== "undefined" && process.env ? process.env.RESEND_BASE_URL || defaultBaseUrl : defaultBaseUrl;
}
function getDefaultUserAgent() {
  return typeof process !== "undefined" && process.env ? process.env.RESEND_USER_AGENT || defaultUserAgent : defaultUserAgent;
}
var Resend = class {
  constructor(key, options) {
    this.key = key;
    this.segments = new Segments(this);
    this.apiKeys = new ApiKeys(this);
    this.audiences = this.segments;
    this.automations = new Automations(this);
    this.batch = new Batch$1(this);
    this.broadcasts = new Broadcasts(this);
    this.contactProperties = new ContactProperties(this);
    this.contacts = new Contacts(this);
    this.domains = new Domains(this);
    this.emails = new Emails(this);
    this.events = new Events$1(this);
    this.inboxes = new Inboxes(this);
    this.logs = new Logs(this);
    this.oauthGrants = new OAuthGrants(this);
    this.suppressions = new Suppressions(this);
    this.templates = new Templates(this);
    this.topics = new Topics(this);
    this.usage = new Usage(this);
    this.webhooks = new Webhooks(this);
    if (!key) {
      if (typeof process !== "undefined" && process.env) this.key = process.env.RESEND_API_KEY;
      if (!this.key) throw new Error('Missing API key. Pass it to the constructor `new Resend("re_123")`');
    }
    this.baseUrl = options?.baseUrl ?? getDefaultBaseUrl();
    this.userAgent = options?.userAgent ?? getDefaultUserAgent();
    this.headers = new Headers({
      Authorization: `Bearer ${this.key}`,
      "User-Agent": this.userAgent,
      "Content-Type": "application/json"
    });
  }
  logError(error2, path3, status) {
    if (typeof process !== "undefined" && process.env && process.env.NODE_ENV !== "production") console.error("[Resend API Error]:", {
      ...status !== void 0 && { status },
      error: error2,
      path: path3
    });
  }
  async fetchRequest(path3, options = {}) {
    const { signal } = options;
    try {
      const response = await fetch(`${this.baseUrl}${path3}`, options);
      if (!response.ok) try {
        const rawError = await response.text();
        const parsedError = JSON.parse(rawError);
        this.logError(parsedError, path3, response.status);
        return {
          data: null,
          error: parsedError,
          headers: Object.fromEntries(response.headers.entries())
        };
      } catch (err) {
        if (signal?.aborted && err === signal.reason) throw err;
        if (err instanceof SyntaxError) {
          const error3 = {
            name: "application_error",
            statusCode: response.status,
            message: "Internal server error. We are unable to process your request right now, please try again later."
          };
          this.logError(error3, path3, response.status);
          return {
            data: null,
            error: error3,
            headers: Object.fromEntries(response.headers.entries())
          };
        }
        const error2 = {
          message: response.statusText,
          statusCode: response.status,
          name: "application_error"
        };
        if (err instanceof Error) {
          const errorWithMessage = {
            ...error2,
            message: err.message
          };
          this.logError(errorWithMessage, path3, response.status);
          return {
            data: null,
            error: errorWithMessage,
            headers: Object.fromEntries(response.headers.entries())
          };
        }
        this.logError(error2, path3, response.status);
        return {
          data: null,
          error: error2,
          headers: Object.fromEntries(response.headers.entries())
        };
      }
      return {
        data: await response.json(),
        error: null,
        headers: Object.fromEntries(response.headers.entries())
      };
    } catch {
      const error2 = {
        name: "application_error",
        statusCode: null,
        message: "Unable to fetch data. The request could not be resolved."
      };
      this.logError(error2, path3);
      return {
        data: null,
        error: error2,
        headers: null
      };
    }
  }
  async post(path3, entity, options = {}) {
    const headers = new Headers(this.headers);
    const isFormData = typeof FormData !== "undefined" && entity instanceof FormData;
    if (isFormData) headers.delete("Content-Type");
    if (options.headers) for (const [key, value] of new Headers(options.headers).entries()) headers.set(key, value);
    if (options.idempotencyKey) headers.set("Idempotency-Key", options.idempotencyKey);
    const requestOptions = {
      method: "POST",
      body: isFormData ? entity : JSON.stringify(entity),
      ...options,
      headers
    };
    return this.fetchRequest(path3, requestOptions);
  }
  async get(path3, options = {}) {
    const headers = new Headers(this.headers);
    if (options.headers) for (const [key, value] of new Headers(options.headers).entries()) headers.set(key, value);
    const requestOptions = {
      method: "GET",
      ...options,
      headers
    };
    return this.fetchRequest(path3, requestOptions);
  }
  async put(path3, entity, options = {}) {
    const headers = new Headers(this.headers);
    if (options.headers) for (const [key, value] of new Headers(options.headers).entries()) headers.set(key, value);
    const requestOptions = {
      method: "PUT",
      body: JSON.stringify(entity),
      ...options,
      headers
    };
    return this.fetchRequest(path3, requestOptions);
  }
  async patch(path3, entity, options = {}) {
    const headers = new Headers(this.headers);
    if (options.headers) for (const [key, value] of new Headers(options.headers).entries()) headers.set(key, value);
    const requestOptions = {
      method: "PATCH",
      body: JSON.stringify(entity),
      ...options,
      headers
    };
    return this.fetchRequest(path3, requestOptions);
  }
  async delete(path3, query, options = {}) {
    const headers = new Headers(this.headers);
    if (options.headers) for (const [key, value] of new Headers(options.headers).entries()) headers.set(key, value);
    const requestOptions = {
      method: "DELETE",
      body: query === void 0 ? void 0 : JSON.stringify(query),
      ...options,
      headers
    };
    return this.fetchRequest(path3, requestOptions);
  }
};

// src/server/reports/resend-client.ts
async function sendReportEmail(rendered, config) {
  const startMs = Date.now();
  if (!config.resendApiKey) {
    const errorMsg = "RESEND_API_KEY environment variable is not configured on the server. Please add RESEND_API_KEY in your Vercel Project Settings.";
    console.error(`[Resend] Delivery aborted: ${errorMsg}`);
    return {
      success: false,
      provider: "resend",
      recipients: config.toEmails,
      latencyMs: Date.now() - startMs,
      error: errorMsg
    };
  }
  const validRecipients = config.toEmails.filter((email) => isValidEmail(email));
  if (validRecipients.length === 0) {
    const errorMsg = "No valid recipient email addresses found in REPORT_TO_EMAILS.";
    console.error(`[Resend] Delivery aborted: ${errorMsg}`);
    return {
      success: false,
      provider: "resend",
      recipients: [],
      latencyMs: Date.now() - startMs,
      error: errorMsg
    };
  }
  try {
    const resend = new Resend(config.resendApiKey);
    const payload = {
      from: config.fromEmail,
      to: validRecipients,
      subject: rendered.subject,
      html: rendered.html,
      text: rendered.text
    };
    console.log(
      `[Resend] Sending email: "${rendered.subject}" to ${validRecipients.join(", ")} via ${config.fromEmail}...`
    );
    const { data, error: error2 } = await resend.emails.send(payload);
    const latencyMs = Date.now() - startMs;
    if (error2) {
      console.error("[Resend] API Error:", error2);
      return {
        success: false,
        provider: "resend",
        recipients: validRecipients,
        latencyMs,
        error: error2.message || JSON.stringify(error2)
      };
    }
    const messageId = data?.id || "resend-msg-ok";
    console.log(`[Resend] Successfully delivered in ${latencyMs}ms. Message ID: ${messageId}`);
    return {
      success: true,
      messageId,
      provider: "resend",
      recipients: validRecipients,
      latencyMs
    };
  } catch (err) {
    const latencyMs = Date.now() - startMs;
    const errorMsg = err instanceof Error ? err.message : String(err);
    console.error(`[Resend] Exception during email delivery:`, err);
    return {
      success: false,
      provider: "resend",
      recipients: validRecipients,
      latencyMs,
      error: errorMsg
    };
  }
}

// node_modules/nodemailer/dist/esm/mailer/index.js
import { EventEmitter } from "node:events";

// node_modules/nodemailer/dist/esm/shared/url.js
import net from "node:net";
import urllib from "node:url";

// node_modules/nodemailer/dist/esm/punycode/index.js
var maxInt = 2147483647;
var base = 36;
var tMin = 1;
var tMax = 26;
var skew = 38;
var damp = 700;
var initialBias = 72;
var initialN = 128;
var delimiter = "-";
var regexPunycode = /^xn--/;
var regexNonASCII = /[^\0-\x7F]/;
var regexSeparators = /[\x2E\u3002\uFF0E\uFF61]/g;
var errors = {
  overflow: "Overflow: input needs wider integers to process",
  "not-basic": "Illegal input >= 0x80 (not a basic code point)",
  "invalid-input": "Invalid input"
};
var baseMinusTMin = base - tMin;
var floor = Math.floor;
var stringFromCharCode = String.fromCharCode;
function error(type) {
  throw new RangeError(errors[type]);
}
function map(array, callback) {
  const result = [];
  let length = array.length;
  while (length--) {
    result[length] = callback(array[length]);
  }
  return result;
}
function mapDomain(domain, callback) {
  const parts = domain.split("@");
  let result = "";
  if (parts.length > 1) {
    result = parts[0] + "@";
    domain = parts[1];
  }
  domain = domain.replace(regexSeparators, ".");
  const labels = domain.split(".");
  const encoded = map(labels, callback).join(".");
  return result + encoded;
}
function ucs2decode(string) {
  const output = [];
  let counter = 0;
  const length = string.length;
  while (counter < length) {
    const value = string.charCodeAt(counter++);
    if (value >= 55296 && value <= 56319 && counter < length) {
      const extra = string.charCodeAt(counter++);
      if ((extra & 64512) == 56320) {
        output.push(((value & 1023) << 10) + (extra & 1023) + 65536);
      } else {
        output.push(value);
        counter--;
      }
    } else {
      output.push(value);
    }
  }
  return output;
}
var basicToDigit = function(codePoint) {
  if (codePoint >= 48 && codePoint < 58) {
    return 26 + (codePoint - 48);
  }
  if (codePoint >= 65 && codePoint < 91) {
    return codePoint - 65;
  }
  if (codePoint >= 97 && codePoint < 123) {
    return codePoint - 97;
  }
  return base;
};
var digitToBasic = function(digit, flag) {
  return digit + 22 + 75 * Number(digit < 26) - (Number(flag != 0) << 5);
};
var adapt = function(delta, numPoints, firstTime) {
  let k = 0;
  delta = firstTime ? floor(delta / damp) : delta >> 1;
  delta += floor(delta / numPoints);
  for (
    ;
    /* no initialization */
    delta > baseMinusTMin * tMax >> 1;
    k += base
  ) {
    delta = floor(delta / baseMinusTMin);
  }
  return floor(k + (baseMinusTMin + 1) * delta / (delta + skew));
};
var decode = function(input) {
  const output = [];
  const inputLength = input.length;
  let i = 0;
  let n = initialN;
  let bias = initialBias;
  let basic = input.lastIndexOf(delimiter);
  if (basic < 0) {
    basic = 0;
  }
  for (let j = 0; j < basic; ++j) {
    if (input.charCodeAt(j) >= 128) {
      error("not-basic");
    }
    output.push(input.charCodeAt(j));
  }
  for (let index = basic > 0 ? basic + 1 : 0; index < inputLength; ) {
    const oldi = i;
    for (let w = 1, k = base; ; k += base) {
      if (index >= inputLength) {
        error("invalid-input");
      }
      const digit = basicToDigit(input.charCodeAt(index++));
      if (digit >= base) {
        error("invalid-input");
      }
      if (digit > floor((maxInt - i) / w)) {
        error("overflow");
      }
      i += digit * w;
      const t = k <= bias ? tMin : k >= bias + tMax ? tMax : k - bias;
      if (digit < t) {
        break;
      }
      const baseMinusT = base - t;
      if (w > floor(maxInt / baseMinusT)) {
        error("overflow");
      }
      w *= baseMinusT;
    }
    const out = output.length + 1;
    bias = adapt(i - oldi, out, oldi == 0);
    if (floor(i / out) > maxInt - n) {
      error("overflow");
    }
    n += floor(i / out);
    i %= out;
    output.splice(i++, 0, n);
  }
  return String.fromCodePoint(...output);
};
var encode = function(input) {
  const output = [];
  const codePoints = ucs2decode(input);
  const inputLength = codePoints.length;
  let n = initialN;
  let delta = 0;
  let bias = initialBias;
  for (const currentValue of codePoints) {
    if (currentValue < 128) {
      output.push(stringFromCharCode(currentValue));
    }
  }
  const basicLength = output.length;
  let handledCPCount = basicLength;
  if (basicLength) {
    output.push(delimiter);
  }
  while (handledCPCount < inputLength) {
    let m = maxInt;
    for (const currentValue of codePoints) {
      if (currentValue >= n && currentValue < m) {
        m = currentValue;
      }
    }
    const handledCPCountPlusOne = handledCPCount + 1;
    if (m - n > floor((maxInt - delta) / handledCPCountPlusOne)) {
      error("overflow");
    }
    delta += (m - n) * handledCPCountPlusOne;
    n = m;
    for (const currentValue of codePoints) {
      if (currentValue < n && ++delta > maxInt) {
        error("overflow");
      }
      if (currentValue === n) {
        let q = delta;
        for (let k = base; ; k += base) {
          const t = k <= bias ? tMin : k >= bias + tMax ? tMax : k - bias;
          if (q < t) {
            break;
          }
          const qMinusT = q - t;
          const baseMinusT = base - t;
          output.push(stringFromCharCode(digitToBasic(t + qMinusT % baseMinusT, 0)));
          q = floor(qMinusT / baseMinusT);
        }
        output.push(stringFromCharCode(digitToBasic(q, 0)));
        bias = adapt(delta, handledCPCountPlusOne, handledCPCount === basicLength);
        delta = 0;
        ++handledCPCount;
      }
    }
    ++delta;
    ++n;
  }
  return output.join("");
};
var toUnicode = function(input) {
  return mapDomain(input, function(string) {
    return regexPunycode.test(string) ? decode(string.slice(4).toLowerCase()) : string;
  });
};
var toASCII = function(input) {
  return mapDomain(input, function(string) {
    return regexNonASCII.test(string) ? "xn--" + encode(string) : string;
  });
};

// node_modules/nodemailer/dist/esm/shared/url.js
var SLASHLESS_AUTHORITY = /^([a-zA-Z][a-zA-Z0-9+.-]*:)(?!\/\/)([\s\S]+)$/;
var SURROUNDING_WHITESPACE = /^[\x00-\x20]+|[\x00-\x20]+$/g;
var LEGACY_TRIM = /^[\x00-\x20\u00a0\ufeff]+/;
var AUTHORITY = /^([a-zA-Z0-9+.-]+:)?[\\/]{2}([^\\/?#]*)/;
var FORBIDDEN_HOST_CHARS = /[\x00-\x20#/:<>?@[\\\]^|\x7f]/;
var CONTROL_CHARS = /[\x00-\x1f\x7f]/;
function invalidUrl(input) {
  const err = new TypeError("Invalid URL");
  err.code = "ERR_INVALID_URL";
  err.input = input;
  return err;
}
function legacyParse(input, parseQueryString, whatwgError, slashesDenoteHost) {
  const parsed = urllib.parse(input, parseQueryString, slashesDenoteHost);
  const authority = AUTHORITY.exec(input.replace(LEGACY_TRIM, ""));
  if (authority && (authority[1] || parsed.hostname !== null)) {
    const written = authority[2].slice(authority[2].lastIndexOf("@") + 1);
    if (!written || CONTROL_CHARS.test(written) || (parsed.host || "").toLowerCase() !== toASCII(written.toLowerCase())) {
      throw whatwgError;
    }
    if (written.charAt(0) === "[" && !net.isIPv6(written.slice(1, written.indexOf("]")))) {
      throw whatwgError;
    }
  } else if (parsed.hostname !== null) {
    throw whatwgError;
  }
  const legacyAuth = parsed.auth === null || parsed.auth === void 0 ? null : parsed.auth.split(":");
  const result = parsed;
  result.username = legacyAuth ? legacyAuth.shift() : null;
  result.password = legacyAuth && legacyAuth.length ? legacyAuth.join(":") : null;
  return result;
}
function safeDecode(str) {
  try {
    return decodeURIComponent(str);
  } catch (_err) {
    return str;
  }
}
function normalizeHostname(raw, href) {
  const hostname = raw || "";
  if (!hostname) {
    return "";
  }
  if (hostname.charAt(0) === "[" && hostname.charAt(hostname.length - 1) === "]") {
    return hostname.slice(1, -1);
  }
  const decoded = safeDecode(hostname);
  const mapped = FORBIDDEN_HOST_CHARS.test(decoded) ? "" : urllib.domainToASCII(decoded);
  if (!mapped) {
    throw invalidUrl(href);
  }
  return mapped;
}
var parse = (input, parseQueryString) => {
  input = (input || "").replace(SURROUNDING_WHITESPACE, "");
  const slashless = SLASHLESS_AUTHORITY.exec(input);
  const normalized2 = slashless ? slashless[1] + "//" + slashless[2] : input;
  let u;
  try {
    u = new URL(normalized2);
  } catch (err) {
    return legacyParse(normalized2, parseQueryString, err);
  }
  const hostname = normalizeHostname(u.hostname, u.href);
  const port = u.port || null;
  const pathname = u.pathname || null;
  const search = u.search || null;
  let auth = null;
  let username = null;
  let password = null;
  if (u.username || u.password) {
    username = safeDecode(u.username);
    password = u.password ? safeDecode(u.password) : null;
    auth = username + (password !== null ? ":" + password : "");
  }
  let query;
  if (parseQueryString) {
    const parsed = /* @__PURE__ */ Object.create(null);
    u.searchParams.forEach((value, key) => {
      if (Object.prototype.hasOwnProperty.call(parsed, key)) {
        const existing = parsed[key];
        if (Array.isArray(existing)) {
          existing.push(value);
        } else {
          parsed[key] = [existing, value];
        }
      } else {
        parsed[key] = value;
      }
    });
    query = parsed;
  } else {
    query = search ? search.slice(1) : null;
  }
  return {
    protocol: u.protocol || null,
    host: u.host || null,
    hostname,
    port,
    pathname,
    search,
    path: (pathname || "") + (search || "") || null,
    href: u.href,
    auth,
    username,
    password,
    query
  };
};
var resolve = (from, to) => {
  try {
    return new URL(to, from).href;
  } catch (err) {
    legacyParse(from, false, err, true);
    legacyParse(to, false, err, true);
    return urllib.resolve(from, to);
  }
};

// node_modules/nodemailer/dist/esm/shared/index.js
import util from "node:util";
import fs from "node:fs";

// node_modules/nodemailer/dist/esm/fetch/index.js
import http from "node:http";
import https from "node:https";
import zlib from "node:zlib";
import { PassThrough } from "node:stream";

// node_modules/nodemailer/dist/esm/fetch/cookies.js
import net2 from "node:net";
var SESSION_TIMEOUT = 1800;
var Cookies = class {
  constructor(options) {
    this.options = options || {};
    this.cookies = [];
  }
  /**
   * Stores a cookie string to the cookie storage
   *
   * @param cookieStr Value from the 'Set-Cookie:' header
   * @param url Current URL
   */
  set(cookieStr, url) {
    const urlparts = parse(url || "");
    const cookie = this.parse(cookieStr);
    let domain;
    if (cookie.domain) {
      domain = cookie.domain.replace(/^\./, "");
      if (
        // can't be valid if the requested domain is shorter than current hostname
        urlparts.hostname.length < domain.length || // a top level domain is not a valid scope, 'Domain=com' would otherwise be
        // sent to every .com host. A trailing dot does not make 'com.' any better
        domain.indexOf(".") < 0 || domain.endsWith(".") || // an IP address has no subdomains, so cookies set on it stay host-only
        net2.isIP(urlparts.hostname) || // prefix domains with dot to be sure that partial matches are not used
        !("." + urlparts.hostname).endsWith("." + domain)
      ) {
        cookie.domain = urlparts.hostname;
      }
    } else {
      cookie.domain = urlparts.hostname;
    }
    if (!cookie.path) {
      cookie.path = this.getPath(urlparts.pathname);
    }
    if (!cookie.expires) {
      cookie.expires = new Date(Date.now() + (Number(this.options.sessionTimeout || SESSION_TIMEOUT) || SESSION_TIMEOUT) * 1e3);
    }
    return this.add(cookie);
  }
  /**
   * Returns cookie string for the 'Cookie:' header.
   *
   * @param url URL to check for
   * @returns Cookie header or empty string if no matches were found
   */
  get(url) {
    return this.list(url).map((cookie) => cookie.name + "=" + cookie.value).join("; ");
  }
  /**
   * Lists all valied cookie objects for the specified URL
   *
   * @param url URL to check for
   * @returns An array of cookie objects
   */
  list(url) {
    const result = [];
    for (let i = this.cookies.length - 1; i >= 0; i--) {
      const cookie = this.cookies[i];
      if (this.isExpired(cookie)) {
        this.cookies.splice(i, 1);
        continue;
      }
      if (this.match(cookie, url)) {
        result.unshift(cookie);
      }
    }
    return result;
  }
  /**
   * Parses cookie string from the 'Set-Cookie:' header
   *
   * @param cookieStr String from the 'Set-Cookie:' header
   * @returns Cookie object
   */
  parse(cookieStr) {
    const cookie = {};
    let hasNameValue = false;
    (cookieStr || "").toString().split(";").forEach((cookiePart) => {
      if (!cookiePart.trim()) {
        return;
      }
      const valueParts = cookiePart.split("=");
      const name2 = valueParts.shift().trim();
      let value = valueParts.join("=").trim();
      let domain;
      if (!hasNameValue) {
        hasNameValue = true;
        if (name2) {
          cookie.name = name2;
          cookie.value = value;
        }
        return;
      }
      switch (name2.toLowerCase()) {
        case "expires": {
          const expires = new Date(value);
          if (expires.toString() !== "Invalid Date") {
            cookie.expires = expires;
          }
          break;
        }
        case "path":
          cookie.path = value;
          break;
        case "domain":
          domain = value.toLowerCase();
          if (domain.length && domain.charAt(0) !== ".") {
            domain = "." + domain;
          }
          cookie.domain = domain;
          break;
        case "max-age":
          cookie.expires = new Date(Date.now() + (Number(value) || 0) * 1e3);
          break;
        case "secure":
          cookie.secure = true;
          break;
        case "httponly":
          cookie.httponly = true;
          break;
      }
    });
    return cookie;
  }
  /**
   * Checks if a cookie object is valid for a specified URL
   *
   * @param cookie Cookie object
   * @param url URL to check for
   * @returns true if cookie is valid for specifiec URL
   */
  match(cookie, url) {
    const urlparts = parse(url || "");
    if (urlparts.hostname !== cookie.domain && (cookie.domain.charAt(0) !== "." || ("." + urlparts.hostname).substr(-cookie.domain.length) !== cookie.domain)) {
      return false;
    }
    const pathname = urlparts.pathname || "/";
    const cookiePath = cookie.path;
    const pathMatches = pathname === cookiePath || pathname.startsWith(cookiePath) && (cookiePath.endsWith("/") || pathname.charAt(cookiePath.length) === "/");
    if (!pathMatches) {
      return false;
    }
    if (cookie.secure && urlparts.protocol !== "https:") {
      return false;
    }
    return true;
  }
  /**
   * Adds (or updates/removes if needed) a cookie object to the cookie storage
   *
   * @param cookie Cookie value to be stored
   */
  add(cookie) {
    if (!cookie || !cookie.name) {
      return false;
    }
    for (let i = 0, len = this.cookies.length; i < len; i++) {
      if (this.compare(this.cookies[i], cookie)) {
        if (this.isExpired(cookie)) {
          this.cookies.splice(i, 1);
          return false;
        }
        this.cookies[i] = cookie;
        return true;
      }
    }
    if (!this.isExpired(cookie)) {
      this.cookies.push(cookie);
    }
    return true;
  }
  /**
   * Checks if two cookie objects are the same
   *
   * @param a Cookie to check against
   * @param b Cookie to check against
   * @returns True, if the cookies are the same
   */
  compare(a, b) {
    return a.name === b.name && a.path === b.path && a.domain === b.domain && a.secure === b.secure && a.httponly === b.httponly;
  }
  /**
   * Checks if a cookie is expired
   *
   * @param cookie Cookie object to check against
   * @returns True, if the cookie is expired
   */
  isExpired(cookie) {
    return cookie.expires && cookie.expires < /* @__PURE__ */ new Date() || !cookie.value;
  }
  /**
   * Returns the default path for an URL path argument, the default-path of
   * RFC 6265 section 5.1.4. A cookie that carries no Path attribute is scoped
   * to the directory of the URL it was set from
   *
   * @param pathname
   * @returns Default path
   */
  getPath(pathname) {
    const pathParts = (pathname || "/").split("/");
    pathParts.pop();
    const path3 = pathParts.join("/").trim();
    if (path3.charAt(0) !== "/") {
      return "/";
    }
    return path3;
  }
};
var cookies_default = Cookies;

// node_modules/nodemailer/dist/esm/package-info.js
var name = "nodemailer";
var version2 = "10.1.1";
var homepage = "https://nodemailer.com/";

// node_modules/nodemailer/dist/esm/fetch/index.js
import net3 from "node:net";

// node_modules/nodemailer/dist/esm/errors.js
var ECONNECTION = "ECONNECTION";
var ETIMEDOUT = "ETIMEDOUT";
var ESOCKET = "ESOCKET";
var EENVELOPE = "EENVELOPE";
var EMESSAGE = "EMESSAGE";
var ESTREAM = "ESTREAM";
var ENOAUTH = "ENOAUTH";
var EOAUTH2 = "EOAUTH2";
var EMAXLIMIT = "EMAXLIMIT";
var EMAXRECIPIENTS = "EMAXRECIPIENTS";
var ESENDMAIL = "ESENDMAIL";
var ESES = "ESES";
var ECONFIG = "ECONFIG";
var EPROXY = "EPROXY";
var EFILEACCESS = "EFILEACCESS";
var EURLACCESS = "EURLACCESS";
var EFETCH = "EFETCH";
var isTransientError = (err) => err.responseCode === 421 || err.code === ECONNECTION || err.code === ESOCKET || err.code === ETIMEDOUT;
var ERR_ACCESS_DENIED = "ERR_ACCESS_DENIED";

// node_modules/nodemailer/dist/esm/shared/objects.js
var isProtoKey = (key) => key === "__proto__";
var copyOwnKeys = (target, source, skip) => {
  Object.keys(source || {}).forEach((key) => {
    if (isProtoKey(key) || skip && skip(key)) {
      return;
    }
    target[key] = source[key];
  });
  return target;
};

// node_modules/nodemailer/dist/esm/fetch/index.js
var MAX_REDIRECTS = 5;
var DEFAULT_TIMEOUT = 60 * 1e3;
var DEFAULT_MAX_BYTES = 64 * 1024 * 1024;
var TLS_OPTION_KEYS = [
  "ALPNProtocols",
  "ca",
  "cert",
  "checkServerIdentity",
  "ciphers",
  "crl",
  "dhparam",
  "ecdhCurve",
  "honorCipherOrder",
  "key",
  "maxVersion",
  "minVersion",
  "passphrase",
  "pfx",
  "rejectUnauthorized",
  "secureContext",
  "secureOptions",
  "secureProtocol",
  "servername",
  "sessionIdContext",
  "sigalgs"
];
function setFetchCode(err) {
  if (err.code !== ERR_ACCESS_DENIED) {
    err.code = EFETCH;
  }
}
function parseFetchUrl(url) {
  let parsed;
  try {
    parsed = parse(url);
  } catch (_err) {
    return false;
  }
  if (parsed.protocol !== "http:" && parsed.protocol !== "https:") {
    return false;
  }
  return parsed;
}
function fetchPort(parsed) {
  return parsed.port ? Number(parsed.port) : parsed.protocol === "https:" ? 443 : 80;
}
function nmfetch(url, options) {
  options = options || {};
  options.fetchRes = options.fetchRes || new PassThrough();
  options.cookies = options.cookies || new cookies_default();
  options.redirects = options.redirects || 0;
  options.maxRedirects = isNaN(options.maxRedirects) ? MAX_REDIRECTS : options.maxRedirects;
  const fetchRes = options.fetchRes;
  const parsed = parseFetchUrl(url);
  if (!parsed) {
    if (options.body && typeof options.body.destroy === "function") {
      options.body.on("error", () => false);
      options.body.destroy();
    }
    setImmediate(() => {
      const err = new Error("Unsupported protocol for URL " + url);
      err.code = EFETCH;
      err.sourceUrl = url;
      fetchRes.emit("error", err);
    });
    return fetchRes;
  }
  if (options.cookie) {
    [].concat(options.cookie || []).forEach((cookie) => {
      options.cookies.set(cookie, url);
    });
    options.cookie = false;
  }
  let method = (options.method || "").toString().trim().toUpperCase() || "GET";
  let finished3 = false;
  let cookies;
  let body;
  const handler2 = parsed.protocol === "https:" ? https : http;
  const headers = {
    "accept-encoding": "gzip,deflate",
    "user-agent": "nodemailer/" + version2
  };
  Object.keys(options.headers || {}).forEach((key) => {
    if (isProtoKey(key.toLowerCase().trim())) {
      return;
    }
    headers[key.toLowerCase().trim()] = options.headers[key];
  });
  if (options.userAgent) {
    headers["user-agent"] = options.userAgent;
  }
  if (parsed.auth) {
    headers.Authorization = "Basic " + Buffer.from(parsed.auth).toString("base64");
  }
  if (cookies = options.cookies.get(url)) {
    headers.cookie = cookies;
  }
  if (options.body) {
    if (options.contentType !== false) {
      headers["Content-Type"] = options.contentType || "application/x-www-form-urlencoded";
    }
    if (typeof options.body.pipe === "function") {
      headers["Transfer-Encoding"] = "chunked";
      body = options.body;
      body.on("error", (err) => {
        if (finished3) {
          return;
        }
        finished3 = true;
        setFetchCode(err);
        err.sourceUrl = url;
        fetchRes.emit("error", err);
      });
    } else {
      if (options.body instanceof Buffer) {
        body = options.body;
      } else if (typeof options.body === "object") {
        try {
          body = Buffer.from(Object.keys(options.body).map((key) => {
            const value = options.body[key].toString().trim();
            return encodeURIComponent(key) + "=" + encodeURIComponent(value);
          }).join("&"));
        } catch (E) {
          finished3 = true;
          E.code = EFETCH;
          E.sourceUrl = url;
          setImmediate(() => fetchRes.emit("error", E));
          return fetchRes;
        }
      } else {
        body = Buffer.from(options.body.toString().trim());
      }
      headers["Content-Type"] = options.contentType || "application/x-www-form-urlencoded";
      headers["Content-Length"] = body.length;
    }
    method = (options.method || "").toString().trim().toUpperCase() || "POST";
  }
  let req;
  const reqOptions = {
    method,
    host: parsed.hostname,
    path: parsed.path,
    port: fetchPort(parsed),
    headers,
    // Validate TLS certificates by default. Callers that genuinely need to
    // reach a self-signed/internal host opt out explicitly with
    // options.tls = { rejectUnauthorized: false }.
    rejectUnauthorized: true,
    agent: false
  };
  if (options.tls) {
    Object.keys(options.tls).forEach((key) => {
      if (TLS_OPTION_KEYS.includes(key)) {
        reqOptions[key] = options.tls[key];
      }
    });
  }
  if (parsed.protocol === "https:" && parsed.hostname && parsed.hostname !== reqOptions.host && !net3.isIP(parsed.hostname) && !reqOptions.servername) {
    reqOptions.servername = parsed.hostname;
  }
  try {
    req = handler2.request(reqOptions);
  } catch (E) {
    finished3 = true;
    setImmediate(() => {
      setFetchCode(E);
      E.sourceUrl = url;
      fetchRes.emit("error", E);
    });
    return fetchRes;
  }
  const fail = (err, sourceUrl = url) => {
    if (finished3) {
      return;
    }
    finished3 = true;
    setFetchCode(err);
    err.sourceUrl = sourceUrl;
    fetchRes.emit("error", err);
    req.abort();
  };
  const timeout = typeof options.timeout === "number" && options.timeout >= 0 ? options.timeout : DEFAULT_TIMEOUT;
  if (timeout) {
    req.setTimeout(timeout, () => fail(new Error("Request Timeout")));
  }
  req.on("error", (err) => fail(err));
  fetchRes.once("close", () => {
    if (finished3 || fetchRes.readableEnded) {
      return;
    }
    finished3 = true;
    req.destroy();
  });
  req.on("response", (res) => {
    let inflate;
    if (finished3) {
      return;
    }
    switch (res.headers["content-encoding"]) {
      case "gzip":
      case "deflate":
        inflate = zlib.createUnzip();
        break;
    }
    if (res.headers["set-cookie"]) {
      [].concat(res.headers["set-cookie"] || []).forEach((cookie) => {
        options.cookies.set(cookie, url);
      });
    }
    if ([301, 302, 303, 307, 308].includes(res.statusCode) && res.headers.location) {
      options.redirects++;
      if (options.redirects > options.maxRedirects) {
        return fail(new Error("Maximum redirect count exceeded"));
      }
      options.method = "GET";
      options.body = false;
      let redirectUrl;
      try {
        redirectUrl = resolve(url, res.headers.location);
      } catch (_err) {
        redirectUrl = res.headers.location;
      }
      const redirectParsed = parseFetchUrl(redirectUrl);
      if (!redirectParsed) {
        return fail(new Error("Unsupported protocol for URL " + redirectUrl), redirectUrl);
      }
      const crossOrigin = redirectParsed.protocol !== parsed.protocol || redirectParsed.hostname !== parsed.hostname || fetchPort(redirectParsed) !== fetchPort(parsed);
      if (options.headers && crossOrigin) {
        const sensitive = ["authorization", "cookie", "proxy-authorization"];
        Object.keys(options.headers).forEach((key) => {
          if (sensitive.includes(key.toLowerCase().trim())) {
            delete options.headers[key];
          }
        });
      }
      finished3 = true;
      res.resume();
      req.abort();
      return nmfetch(redirectUrl, options);
    }
    fetchRes.statusCode = res.statusCode;
    fetchRes.headers = res.headers;
    if (res.statusCode >= 300 && !options.allowErrorResponse) {
      return fail(new Error("Invalid status code " + res.statusCode));
    }
    res.on("error", (err) => fail(err));
    const maxBytes = typeof options.maxBytes === "number" && options.maxBytes > 0 ? options.maxBytes : DEFAULT_MAX_BYTES;
    const source = inflate || res;
    let received = 0;
    source.on("data", (chunk) => {
      received += chunk.length;
      if (received <= maxBytes || finished3) {
        return;
      }
      source.unpipe(fetchRes);
      fail(new Error("Response size exceeds the allowed " + maxBytes + " bytes"));
    });
    if (inflate) {
      res.pipe(inflate).pipe(fetchRes);
      inflate.on("error", (err) => fail(err));
    } else {
      res.pipe(fetchRes);
    }
  });
  setImmediate(() => {
    if (body) {
      try {
        if (typeof body.pipe === "function") {
          return body.pipe(req);
        }
        req.write(body);
      } catch (err) {
        return fail(err);
      }
    }
    req.end();
  });
  return fetchRes;
}
nmfetch.Cookies = cookies_default;
nmfetch.DEFAULT_TIMEOUT = DEFAULT_TIMEOUT;
var fetch_default = nmfetch;

// node_modules/nodemailer/dist/esm/shared/index.js
import dns from "node:dns";
import net4 from "node:net";
import os from "node:os";
import { finished } from "node:stream";
var DNS_TTL = 5 * 60 * 1e3;
var CACHE_CLEANUP_INTERVAL = 30 * 1e3;
var MAX_CACHE_SIZE = 1e3;
var lastCacheCleanup = 0;
var networkInterfaces;
var networkInterfacesRead = false;
var _readNetworkInterfaces = () => {
  if (!networkInterfacesRead) {
    networkInterfacesRead = true;
    try {
      networkInterfaces = os.networkInterfaces();
    } catch (_err) {
    }
  }
  return networkInterfaces;
};
var isFamilySupported = (family, allowInternal) => {
  const addresses = Object.values(_readNetworkInterfaces() || {}).flat();
  if (!addresses.length) {
    return true;
  }
  return addresses.filter((i) => !i.internal || allowInternal).some((i) => i.family === "IPv" + family || i.family === family);
};
var resolve2 = (family, hostname, options, callback) => {
  options = options || {};
  if (!isFamilySupported(family, options.allowInternalNetworkInterfaces)) {
    callback(null, []);
    return null;
  }
  const dnsResolver = dns.Resolver ? new dns.Resolver(options) : dns;
  dnsResolver["resolve" + family](hostname, (err, addresses) => {
    if (err) {
      switch (err.code) {
        case dns.NODATA:
        case dns.NOTFOUND:
        case dns.NOTIMP:
        case dns.SERVFAIL:
        case dns.CONNREFUSED:
        case dns.REFUSED:
        case "EAI_AGAIN":
          return callback(null, []);
      }
      return callback(err);
    }
    return callback(null, Array.isArray(addresses) ? addresses : [].concat(addresses || []));
  });
  return dns.Resolver ? dnsResolver : null;
};
var dnsCache = /* @__PURE__ */ new Map();
var formatDNSValue = (value, extra) => {
  if (!value) {
    return Object.assign({}, extra || {});
  }
  const addresses = value.addresses || [];
  const host = addresses.length > 0 ? addresses[Math.floor(Math.random() * addresses.length)] : null;
  return Object.assign({
    host,
    // Include all addresses for connection fallback support
    _addresses: addresses
  }, extra || {});
};
var resolveHostname = (options, callback) => {
  options = options || {};
  if (!options.host && options.servername) {
    options.host = options.servername;
  }
  if (!options.host || net4.isIP(options.host)) {
    const value = {
      addresses: [options.host]
    };
    return callback(null, formatDNSValue(value, {
      servername: options.servername || false,
      cached: false
    }));
  }
  const host = options.host;
  const servername = options.servername || host;
  let cached;
  if (dnsCache.has(options.host)) {
    cached = dnsCache.get(options.host);
    const now = Date.now();
    if (now - lastCacheCleanup > CACHE_CLEANUP_INTERVAL) {
      lastCacheCleanup = now;
      for (const [host2, entry] of dnsCache.entries()) {
        if (entry.expires && entry.expires < now) {
          dnsCache.delete(host2);
        }
      }
      if (dnsCache.size > MAX_CACHE_SIZE) {
        const toDelete = Math.floor(MAX_CACHE_SIZE * 0.1);
        const keys = Array.from(dnsCache.keys()).slice(0, toDelete);
        keys.forEach((key) => dnsCache.delete(key));
      }
    }
    if (!cached.expires || cached.expires >= now) {
      return callback(null, formatDNSValue(cached.value, {
        servername,
        cached: true
      }));
    }
  }
  let responded = false;
  let deadline;
  const respond = (err, result) => {
    if (responded) {
      return;
    }
    responded = true;
    clearTimeout(deadline);
    callback(err, result);
  };
  const respondCached = (error2) => {
    if (!cached) {
      return false;
    }
    dnsCache.set(host, {
      value: cached.value,
      expires: Date.now() + (options.dnsTtl || DNS_TTL)
    });
    respond(null, formatDNSValue(cached.value, {
      servername,
      cached: true,
      error: error2
    }));
    return true;
  };
  const resolvers = [];
  const timeout = Number(options.timeout) || 0;
  if (timeout > 0) {
    deadline = setTimeout(() => {
      for (const resolver of resolvers) {
        if (typeof resolver.cancel === "function") {
          resolver.cancel();
        }
      }
      const err = new Error("DNS lookup for " + host + " timed out");
      err.code = dns.TIMEOUT;
      if (!respondCached(err)) {
        respond(err);
      }
    }, timeout);
  }
  let ipv4Addresses = [];
  let ipv6Addresses = [];
  let ipv4Error = null;
  let ipv6Error = null;
  let pending = 2;
  const onResolved = () => {
    if (--pending || responded) {
      return;
    }
    const allAddresses = ipv4Addresses.concat(ipv6Addresses);
    if (allAddresses.length) {
      const value = {
        addresses: allAddresses
      };
      dnsCache.set(host, {
        value,
        expires: Date.now() + (options.dnsTtl || DNS_TTL)
      });
      return respond(null, formatDNSValue(value, {
        servername,
        cached: false
      }));
    }
    if (ipv4Error && ipv6Error && respondCached(ipv4Error)) {
      return;
    }
    try {
      dns.lookup(host, { all: true }, (err, addresses) => {
        if (err) {
          if (respondCached(err)) {
            return;
          }
          return respond(err);
        }
        const supportedAddresses = addresses ? addresses.filter((addr) => isFamilySupported(addr.family)).map((addr) => addr.address) : [];
        if (addresses && addresses.length && !supportedAddresses.length) {
          console.warn(`Failed to resolve IPv${addresses[0].family} addresses with current network`);
        }
        if (!supportedAddresses.length && cached) {
          return respond(null, formatDNSValue(cached.value, {
            servername,
            cached: true
          }));
        }
        const value = {
          addresses: supportedAddresses.length ? supportedAddresses : [host]
        };
        dnsCache.set(host, {
          value,
          expires: Date.now() + (options.dnsTtl || DNS_TTL)
        });
        return respond(null, formatDNSValue(value, {
          servername,
          cached: false
        }));
      });
    } catch (lookupErr) {
      if (respondCached(lookupErr)) {
        return;
      }
      return respond(ipv4Error || ipv6Error || lookupErr);
    }
  };
  for (const family of [4, 6]) {
    const resolver = resolve2(family, host, options, (err, addresses) => {
      if (family === 4) {
        ipv4Error = err;
        ipv4Addresses = addresses || [];
      } else {
        ipv6Error = err;
        ipv6Addresses = addresses || [];
      }
      onResolved();
    });
    if (resolver) {
      resolvers.push(resolver);
    }
  }
};
var parseConnectionUrl = (str) => {
  str = str || "";
  const options = {};
  const url = parse(str, true);
  switch (url.protocol) {
    case "smtp:":
      options.secure = false;
      break;
    case "smtps:":
      options.secure = true;
      break;
    case "direct:":
      options.direct = true;
      break;
  }
  if (!isNaN(url.port) && Number(url.port)) {
    options.port = Number(url.port);
  }
  if (url.hostname) {
    options.host = url.hostname;
  }
  if (url.username || url.password) {
    options.auth = {
      user: url.username || "",
      pass: url.password || ""
    };
  }
  Object.keys(url.query || {}).forEach((key) => {
    let obj = options;
    let lKey = key;
    let value = url.query[key];
    if (!isNaN(value)) {
      value = Number(value);
    }
    switch (value) {
      case "true":
        value = true;
        break;
      case "false":
        value = false;
        break;
    }
    if (key.indexOf("tls.") === 0) {
      lKey = key.substr(4);
      if (!options.tls) {
        options.tls = {};
      }
      obj = options.tls;
    } else if (key.indexOf(".") >= 0) {
      return;
    }
    if (!isProtoKey(lKey) && !(lKey in obj)) {
      obj[lKey] = value;
    }
  });
  return options;
};
var _logFunc = (logger, level, defaults, data, message, ...args) => {
  const entry = Object.assign({}, defaults || {}, data || {});
  delete entry.level;
  let logLevel = level;
  if (typeof logger[logLevel] !== "function") {
    logLevel = ["info", "debug", "log", "trace", "warn", "error"].find((name2) => typeof logger[name2] === "function");
  }
  if (logLevel) {
    logger[logLevel](entry, message, ...args);
  }
};
var getLogger = (options, defaults) => {
  options = options || {};
  const response = {};
  const levels = ["trace", "debug", "info", "warn", "error", "fatal"];
  if (!options.logger) {
    levels.forEach((level) => {
      response[level] = () => false;
    });
    return response;
  }
  const logger = options.logger === true ? createDefaultLogger(levels) : options.logger;
  levels.forEach((level) => {
    response[level] = (...args) => {
      const data = typeof args[0] === "string" ? void 0 : args.shift();
      _logFunc(logger, level, defaults, data, ...args);
    };
  });
  return response;
};
var callbackPromise = (resolve3, reject) => function(...args) {
  const err = args.shift();
  if (err) {
    reject(err);
  } else {
    resolve3(...args);
  }
};
var parseDataURI = (uri) => {
  if (typeof uri !== "string") {
    return null;
  }
  if (!uri.startsWith("data:")) {
    return null;
  }
  const commaPos = uri.indexOf(",");
  if (commaPos === -1) {
    return null;
  }
  const data = uri.substring(commaPos + 1);
  const metaStr = uri.substring("data:".length, commaPos);
  let encoding;
  const metaEntries = metaStr.split(";");
  if (metaEntries.length > 0) {
    const lastEntry = metaEntries[metaEntries.length - 1].toLowerCase().trim();
    if (["base64", "utf8", "utf-8"].includes(lastEntry) && lastEntry.indexOf("=") === -1) {
      encoding = lastEntry;
      metaEntries.pop();
    }
  }
  const contentType = metaEntries.length > 0 ? metaEntries.shift() : "application/octet-stream";
  const params = {};
  for (let i = 0; i < metaEntries.length; i++) {
    const entry = metaEntries[i];
    const sepPos = entry.indexOf("=");
    if (sepPos > 0) {
      const key = entry.substring(0, sepPos).trim();
      const value = entry.substring(sepPos + 1).trim();
      if (key && !isProtoKey(key)) {
        params[key] = value;
      }
    }
  }
  let bufferData;
  try {
    if (encoding === "base64") {
      bufferData = Buffer.from(data, "base64");
    } else {
      try {
        bufferData = Buffer.from(decodeURIComponent(data));
      } catch (_decodeError) {
        bufferData = Buffer.from(data);
      }
    }
  } catch (_bufferError) {
    bufferData = Buffer.alloc(0);
  }
  return {
    data: bufferData,
    encoding: encoding || null,
    contentType: contentType || "application/octet-stream",
    params
  };
};
function resolveContent(data, key, options, callback) {
  if (!callback && typeof options === "function") {
    callback = options;
    options = false;
  }
  options = options || {};
  let promise;
  if (!callback) {
    promise = new Promise((resolve3, reject) => {
      callback = callbackPromise(resolve3, reject);
    });
  }
  resolveContentValue(data, key, options, callback);
  return promise;
}
function resolveContentValue(data, key, options, callback) {
  let content = data && data[key] && data[key].content || data[key];
  const encoding = (typeof data[key] === "object" && data[key].encoding || "utf8").toString().toLowerCase().replace(/[-_\s]/g, "");
  if (!content) {
    return callback(null, content);
  }
  if (typeof content === "object") {
    if (typeof content.pipe === "function") {
      return resolveStream(content, (err, value) => {
        if (err) {
          return callback(err);
        }
        if (data[key].content) {
          data[key].content = value;
        } else {
          data[key] = value;
        }
        callback(null, value);
      });
    } else if (/^data:/i.test(content.path || content.href)) {
      const parsedDataUri = parseDataURI(content.path || content.href);
      return callback(null, parsedDataUri && parsedDataUri.data ? parsedDataUri.data : Buffer.alloc(0));
    } else if (content.href || /^https?:\/\//i.test(content.path)) {
      const url = content.href || content.path;
      if (options.disableUrlAccess) {
        setImmediate(() => {
          const err = new Error("Url access rejected for " + url);
          err.code = EURLACCESS;
          callback(err);
        });
        return;
      }
      return resolveStream(fetch_default(url, { headers: content.httpHeaders, tls: content.tls }), callback);
    } else if (content.path) {
      if (options.disableFileAccess) {
        setImmediate(() => {
          const err = new Error("File access rejected for " + content.path);
          err.code = EFILEACCESS;
          callback(err);
        });
        return;
      }
      return resolveStream(fs.createReadStream(content.path), callback);
    }
  }
  if (typeof data[key].content === "string" && !["utf8", "usascii", "ascii"].includes(encoding)) {
    content = Buffer.from(data[key].content, encoding);
  }
  setImmediate(() => callback(null, content));
}
var assign = function(...args) {
  const target = args.shift() || {};
  args.forEach((source) => {
    Object.keys(source || {}).forEach((key) => {
      if (isProtoKey(key)) {
        return;
      }
      if (["tls", "auth"].includes(key) && source[key] && typeof source[key] === "object") {
        target[key] = copyOwnKeys(target[key] || {}, source[key]);
      } else {
        target[key] = source[key];
      }
    });
  });
  return target;
};
var encodeXText = (str) => {
  if (!/[^\x21-\x2A\x2C-\x3C\x3E-\x7E]/.test(str)) {
    return str;
  }
  const buf = Buffer.from(str);
  let result = "";
  for (let i = 0, len = buf.length; i < len; i++) {
    const c = buf[i];
    if (c < 33 || c > 126 || c === 43 || c === 61) {
      result += "+" + (c < 16 ? "0" : "") + c.toString(16).toUpperCase();
    } else {
      result += String.fromCharCode(c);
    }
  }
  return result;
};
var streamErrors = /* @__PURE__ */ new WeakMap();
function recordStreamErrors(stream) {
  stream.on("error", (err) => {
    if (!streamErrors.has(stream)) {
      streamErrors.set(stream, err);
    }
  });
}
function destroyStream(value) {
  const stream = value;
  if (stream && typeof stream.pipe === "function" && typeof stream.destroy === "function" && !stream.destroyed) {
    stream.destroy();
  }
}
function unreadableStreamError(stream) {
  const err = streamErrors.get(stream) || stream.errored;
  if (err) {
    return err;
  }
  if (stream.readableEnded || stream.destroyed) {
    const unreadable = new Error("Content stream was already read or destroyed");
    unreadable.code = ESTREAM;
    return unreadable;
  }
  return null;
}
function resolveStream(stream, callback) {
  let responded = false;
  const respond = (err, value) => {
    if (responded) {
      return;
    }
    responded = true;
    callback(err, value);
  };
  const unreadable = unreadableStreamError(stream);
  if (unreadable) {
    stream.on("error", () => false);
    setImmediate(() => respond(unreadable));
    return;
  }
  const chunks = [];
  let chunklen = 0;
  stream.on("data", (chunk) => {
    if (typeof chunk === "string") {
      chunk = Buffer.from(chunk);
    }
    chunks.push(chunk);
    chunklen += chunk.length;
  });
  finished(stream, { writable: false }, (err) => {
    if (err) {
      return respond(err);
    }
    let value;
    try {
      value = Buffer.concat(chunks, chunklen);
    } catch (E) {
      return respond(E);
    }
    respond(null, value);
  });
}
function createDefaultLogger(levels) {
  const levelMaxLen = levels.reduce((max, level) => Math.max(max, level.length), 0);
  const levelNames = /* @__PURE__ */ new Map();
  levels.forEach((level) => {
    let levelName = level.toUpperCase();
    if (levelName.length < levelMaxLen) {
      levelName += " ".repeat(levelMaxLen - levelName.length);
    }
    levelNames.set(level, levelName);
  });
  const print = (level, entry, message, ...args) => {
    let prefix = "";
    if (entry) {
      if (entry.tnx === "server") {
        prefix = "S: ";
      } else if (entry.tnx === "client") {
        prefix = "C: ";
      }
      if (entry.sid) {
        prefix = "[" + entry.sid + "] " + prefix;
      }
      if (entry.cid) {
        prefix = "[#" + entry.cid + "] " + prefix;
      }
    }
    message = util.format(message, ...args);
    message.split(/\r?\n/).forEach((line) => {
      console.log("[%s] %s %s", (/* @__PURE__ */ new Date()).toISOString().substr(0, 19).replace(/T/, " "), levelNames.get(level), prefix + line);
    });
  };
  const logger = {};
  levels.forEach((level) => {
    logger[level] = print.bind(null, level);
  });
  return logger;
}

// node_modules/nodemailer/dist/esm/mime-funcs/mime-types.js
import path from "node:path";
var defaultMimeType = "application/octet-stream";
var defaultExtension = "bin";
var mimeTypes = /* @__PURE__ */ new Map([
  ["application/acad", "dwg"],
  ["application/applixware", "aw"],
  ["application/arj", "arj"],
  ["application/atom+xml", "xml"],
  ["application/atomcat+xml", "atomcat"],
  ["application/atomsvc+xml", "atomsvc"],
  ["application/base64", ["mm", "mme"]],
  ["application/binhex", "hqx"],
  ["application/binhex4", "hqx"],
  ["application/book", ["book", "boo"]],
  ["application/ccxml+xml,", "ccxml"],
  ["application/cdf", "cdf"],
  ["application/cdmi-capability", "cdmia"],
  ["application/cdmi-container", "cdmic"],
  ["application/cdmi-domain", "cdmid"],
  ["application/cdmi-object", "cdmio"],
  ["application/cdmi-queue", "cdmiq"],
  ["application/clariscad", "ccad"],
  ["application/commonground", "dp"],
  ["application/cu-seeme", "cu"],
  ["application/davmount+xml", "davmount"],
  ["application/drafting", "drw"],
  ["application/dsptype", "tsp"],
  ["application/dssc+der", "dssc"],
  ["application/dssc+xml", "xdssc"],
  ["application/dxf", "dxf"],
  ["application/ecmascript", ["js", "es"]],
  ["application/emma+xml", "emma"],
  ["application/envoy", "evy"],
  ["application/epub+zip", "epub"],
  ["application/excel", ["xls", "xl", "xla", "xlb", "xlc", "xld", "xlk", "xll", "xlm", "xlt", "xlv", "xlw"]],
  ["application/exi", "exi"],
  ["application/font-tdpfr", "pfr"],
  ["application/fractals", "fif"],
  ["application/freeloader", "frl"],
  ["application/futuresplash", "spl"],
  ["application/geo+json", "geojson"],
  ["application/gnutar", "tgz"],
  ["application/groupwise", "vew"],
  ["application/hlp", "hlp"],
  ["application/hta", "hta"],
  ["application/hyperstudio", "stk"],
  ["application/i-deas", "unv"],
  ["application/iges", ["iges", "igs"]],
  ["application/inf", "inf"],
  ["application/internet-property-stream", "acx"],
  ["application/ipfix", "ipfix"],
  ["application/java", "class"],
  ["application/java-archive", "jar"],
  ["application/java-byte-code", "class"],
  ["application/java-serialized-object", "ser"],
  ["application/java-vm", "class"],
  ["application/javascript", "js"],
  ["application/json", "json"],
  ["application/lha", "lha"],
  ["application/lzx", "lzx"],
  ["application/mac-binary", "bin"],
  ["application/mac-binhex", "hqx"],
  ["application/mac-binhex40", "hqx"],
  ["application/mac-compactpro", "cpt"],
  ["application/macbinary", "bin"],
  ["application/mads+xml", "mads"],
  ["application/marc", "mrc"],
  ["application/marcxml+xml", "mrcx"],
  ["application/mathematica", "ma"],
  ["application/mathml+xml", "mathml"],
  ["application/mbedlet", "mbd"],
  ["application/mbox", "mbox"],
  ["application/mcad", "mcd"],
  ["application/mediaservercontrol+xml", "mscml"],
  ["application/metalink4+xml", "meta4"],
  ["application/mets+xml", "mets"],
  ["application/mime", "aps"],
  ["application/mods+xml", "mods"],
  ["application/mp21", "m21"],
  ["application/mp4", "mp4"],
  ["application/mspowerpoint", ["ppt", "pot", "pps", "ppz"]],
  ["application/msword", ["doc", "dot", "w6w", "wiz", "word"]],
  ["application/mswrite", "wri"],
  ["application/mxf", "mxf"],
  ["application/netmc", "mcp"],
  ["application/octet-stream", ["*"]],
  ["application/oda", "oda"],
  ["application/oebps-package+xml", "opf"],
  ["application/ogg", "ogx"],
  ["application/olescript", "axs"],
  ["application/onenote", "onetoc"],
  ["application/patch-ops-error+xml", "xer"],
  ["application/pdf", "pdf"],
  ["application/pgp-encrypted", "asc"],
  ["application/pgp-signature", "pgp"],
  ["application/pics-rules", "prf"],
  ["application/pkcs-12", "p12"],
  ["application/pkcs-crl", "crl"],
  ["application/pkcs10", "p10"],
  ["application/pkcs7-mime", ["p7c", "p7m"]],
  ["application/pkcs7-signature", "p7s"],
  ["application/pkcs8", "p8"],
  ["application/pkix-attr-cert", "ac"],
  ["application/pkix-cert", ["cer", "crt"]],
  ["application/pkix-crl", "crl"],
  ["application/pkix-pkipath", "pkipath"],
  ["application/pkixcmp", "pki"],
  ["application/plain", "text"],
  ["application/pls+xml", "pls"],
  ["application/postscript", ["ps", "ai", "eps"]],
  ["application/powerpoint", "ppt"],
  ["application/pro_eng", ["part", "prt"]],
  ["application/prs.cww", "cww"],
  ["application/pskc+xml", "pskcxml"],
  ["application/rdf+xml", "rdf"],
  ["application/reginfo+xml", "rif"],
  ["application/relax-ng-compact-syntax", "rnc"],
  ["application/resource-lists+xml", "rl"],
  ["application/resource-lists-diff+xml", "rld"],
  ["application/ringing-tones", "rng"],
  ["application/rls-services+xml", "rs"],
  ["application/rsd+xml", "rsd"],
  ["application/rss+xml", "xml"],
  ["application/rtf", ["rtf", "rtx"]],
  ["application/sbml+xml", "sbml"],
  ["application/scvp-cv-request", "scq"],
  ["application/scvp-cv-response", "scs"],
  ["application/scvp-vp-request", "spq"],
  ["application/scvp-vp-response", "spp"],
  ["application/sdp", "sdp"],
  ["application/sea", "sea"],
  ["application/set", "set"],
  ["application/set-payment-initiation", "setpay"],
  ["application/set-registration-initiation", "setreg"],
  ["application/shf+xml", "shf"],
  ["application/sla", "stl"],
  ["application/smil", ["smi", "smil"]],
  ["application/smil+xml", "smi"],
  ["application/solids", "sol"],
  ["application/sounder", "sdr"],
  ["application/sparql-query", "rq"],
  ["application/sparql-results+xml", "srx"],
  ["application/srgs", "gram"],
  ["application/srgs+xml", "grxml"],
  ["application/sru+xml", "sru"],
  ["application/ssml+xml", "ssml"],
  ["application/step", ["step", "stp"]],
  ["application/streamingmedia", "ssm"],
  ["application/tei+xml", "tei"],
  ["application/thraud+xml", "tfi"],
  ["application/timestamped-data", "tsd"],
  ["application/toolbook", "tbk"],
  ["application/vda", "vda"],
  ["application/vnd.3gpp.pic-bw-large", "plb"],
  ["application/vnd.3gpp.pic-bw-small", "psb"],
  ["application/vnd.3gpp.pic-bw-var", "pvb"],
  ["application/vnd.3gpp2.tcap", "tcap"],
  ["application/vnd.3m.post-it-notes", "pwn"],
  ["application/vnd.accpac.simply.aso", "aso"],
  ["application/vnd.accpac.simply.imp", "imp"],
  ["application/vnd.acucobol", "acu"],
  ["application/vnd.acucorp", "atc"],
  ["application/vnd.adobe.air-application-installer-package+zip", "air"],
  ["application/vnd.adobe.fxp", "fxp"],
  ["application/vnd.adobe.xdp+xml", "xdp"],
  ["application/vnd.adobe.xfdf", "xfdf"],
  ["application/vnd.ahead.space", "ahead"],
  ["application/vnd.airzip.filesecure.azf", "azf"],
  ["application/vnd.airzip.filesecure.azs", "azs"],
  ["application/vnd.amazon.ebook", "azw"],
  ["application/vnd.americandynamics.acc", "acc"],
  ["application/vnd.amiga.ami", "ami"],
  ["application/vnd.android.package-archive", "apk"],
  ["application/vnd.anser-web-certificate-issue-initiation", "cii"],
  ["application/vnd.anser-web-funds-transfer-initiation", "fti"],
  ["application/vnd.antix.game-component", "atx"],
  ["application/vnd.apple.installer+xml", "mpkg"],
  ["application/vnd.apple.mpegurl", "m3u8"],
  ["application/vnd.aristanetworks.swi", "swi"],
  ["application/vnd.audiograph", "aep"],
  ["application/vnd.blueice.multipass", "mpm"],
  ["application/vnd.bmi", "bmi"],
  ["application/vnd.businessobjects", "rep"],
  ["application/vnd.chemdraw+xml", "cdxml"],
  ["application/vnd.chipnuts.karaoke-mmd", "mmd"],
  ["application/vnd.cinderella", "cdy"],
  ["application/vnd.claymore", "cla"],
  ["application/vnd.cloanto.rp9", "rp9"],
  ["application/vnd.clonk.c4group", "c4g"],
  ["application/vnd.cluetrust.cartomobile-config", "c11amc"],
  ["application/vnd.cluetrust.cartomobile-config-pkg", "c11amz"],
  ["application/vnd.commonspace", "csp"],
  ["application/vnd.contact.cmsg", "cdbcmsg"],
  ["application/vnd.cosmocaller", "cmc"],
  ["application/vnd.crick.clicker", "clkx"],
  ["application/vnd.crick.clicker.keyboard", "clkk"],
  ["application/vnd.crick.clicker.palette", "clkp"],
  ["application/vnd.crick.clicker.template", "clkt"],
  ["application/vnd.crick.clicker.wordbank", "clkw"],
  ["application/vnd.criticaltools.wbs+xml", "wbs"],
  ["application/vnd.ctc-posml", "pml"],
  ["application/vnd.cups-ppd", "ppd"],
  ["application/vnd.curl.car", "car"],
  ["application/vnd.curl.pcurl", "pcurl"],
  ["application/vnd.data-vision.rdz", "rdz"],
  ["application/vnd.denovo.fcselayout-link", "fe_launch"],
  ["application/vnd.dna", "dna"],
  ["application/vnd.dolby.mlp", "mlp"],
  ["application/vnd.dpgraph", "dpg"],
  ["application/vnd.dreamfactory", "dfac"],
  ["application/vnd.dvb.ait", "ait"],
  ["application/vnd.dvb.service", "svc"],
  ["application/vnd.dynageo", "geo"],
  ["application/vnd.ecowin.chart", "mag"],
  ["application/vnd.enliven", "nml"],
  ["application/vnd.epson.esf", "esf"],
  ["application/vnd.epson.msf", "msf"],
  ["application/vnd.epson.quickanime", "qam"],
  ["application/vnd.epson.salt", "slt"],
  ["application/vnd.epson.ssf", "ssf"],
  ["application/vnd.eszigno3+xml", "es3"],
  ["application/vnd.ezpix-album", "ez2"],
  ["application/vnd.ezpix-package", "ez3"],
  ["application/vnd.fdf", "fdf"],
  ["application/vnd.fdsn.seed", "seed"],
  ["application/vnd.flographit", "gph"],
  ["application/vnd.fluxtime.clip", "ftc"],
  ["application/vnd.framemaker", "fm"],
  ["application/vnd.frogans.fnc", "fnc"],
  ["application/vnd.frogans.ltf", "ltf"],
  ["application/vnd.fsc.weblaunch", "fsc"],
  ["application/vnd.fujitsu.oasys", "oas"],
  ["application/vnd.fujitsu.oasys2", "oa2"],
  ["application/vnd.fujitsu.oasys3", "oa3"],
  ["application/vnd.fujitsu.oasysgp", "fg5"],
  ["application/vnd.fujitsu.oasysprs", "bh2"],
  ["application/vnd.fujixerox.ddd", "ddd"],
  ["application/vnd.fujixerox.docuworks", "xdw"],
  ["application/vnd.fujixerox.docuworks.binder", "xbd"],
  ["application/vnd.fuzzysheet", "fzs"],
  ["application/vnd.genomatix.tuxedo", "txd"],
  ["application/vnd.geogebra.file", "ggb"],
  ["application/vnd.geogebra.tool", "ggt"],
  ["application/vnd.geometry-explorer", "gex"],
  ["application/vnd.geonext", "gxt"],
  ["application/vnd.geoplan", "g2w"],
  ["application/vnd.geospace", "g3w"],
  ["application/vnd.gmx", "gmx"],
  ["application/vnd.google-earth.kml+xml", "kml"],
  ["application/vnd.google-earth.kmz", "kmz"],
  ["application/vnd.grafeq", "gqf"],
  ["application/vnd.groove-account", "gac"],
  ["application/vnd.groove-help", "ghf"],
  ["application/vnd.groove-identity-message", "gim"],
  ["application/vnd.groove-injector", "grv"],
  ["application/vnd.groove-tool-message", "gtm"],
  ["application/vnd.groove-tool-template", "tpl"],
  ["application/vnd.groove-vcard", "vcg"],
  ["application/vnd.hal+xml", "hal"],
  ["application/vnd.handheld-entertainment+xml", "zmm"],
  ["application/vnd.hbci", "hbci"],
  ["application/vnd.hhe.lesson-player", "les"],
  ["application/vnd.hp-hpgl", ["hgl", "hpg", "hpgl"]],
  ["application/vnd.hp-hpid", "hpid"],
  ["application/vnd.hp-hps", "hps"],
  ["application/vnd.hp-jlyt", "jlt"],
  ["application/vnd.hp-pcl", "pcl"],
  ["application/vnd.hp-pclxl", "pclxl"],
  ["application/vnd.hydrostatix.sof-data", "sfd-hdstx"],
  ["application/vnd.hzn-3d-crossword", "x3d"],
  ["application/vnd.ibm.minipay", "mpy"],
  ["application/vnd.ibm.modcap", "afp"],
  ["application/vnd.ibm.rights-management", "irm"],
  ["application/vnd.ibm.secure-container", "sc"],
  ["application/vnd.iccprofile", "icc"],
  ["application/vnd.igloader", "igl"],
  ["application/vnd.immervision-ivp", "ivp"],
  ["application/vnd.immervision-ivu", "ivu"],
  ["application/vnd.insors.igm", "igm"],
  ["application/vnd.intercon.formnet", "xpw"],
  ["application/vnd.intergeo", "i2g"],
  ["application/vnd.intu.qbo", "qbo"],
  ["application/vnd.intu.qfx", "qfx"],
  ["application/vnd.ipunplugged.rcprofile", "rcprofile"],
  ["application/vnd.irepository.package+xml", "irp"],
  ["application/vnd.is-xpr", "xpr"],
  ["application/vnd.isac.fcs", "fcs"],
  ["application/vnd.jam", "jam"],
  ["application/vnd.jcp.javame.midlet-rms", "rms"],
  ["application/vnd.jisp", "jisp"],
  ["application/vnd.joost.joda-archive", "joda"],
  ["application/vnd.kahootz", "ktz"],
  ["application/vnd.kde.karbon", "karbon"],
  ["application/vnd.kde.kchart", "chrt"],
  ["application/vnd.kde.kformula", "kfo"],
  ["application/vnd.kde.kivio", "flw"],
  ["application/vnd.kde.kontour", "kon"],
  ["application/vnd.kde.kpresenter", "kpr"],
  ["application/vnd.kde.kspread", "ksp"],
  ["application/vnd.kde.kword", "kwd"],
  ["application/vnd.kenameaapp", "htke"],
  ["application/vnd.kidspiration", "kia"],
  ["application/vnd.kinar", "kne"],
  ["application/vnd.koan", "skp"],
  ["application/vnd.kodak-descriptor", "sse"],
  ["application/vnd.las.las+xml", "lasxml"],
  ["application/vnd.llamagraphics.life-balance.desktop", "lbd"],
  ["application/vnd.llamagraphics.life-balance.exchange+xml", "lbe"],
  ["application/vnd.lotus-1-2-3", "123"],
  ["application/vnd.lotus-approach", "apr"],
  ["application/vnd.lotus-freelance", "pre"],
  ["application/vnd.lotus-notes", "nsf"],
  ["application/vnd.lotus-organizer", "org"],
  ["application/vnd.lotus-screencam", "scm"],
  ["application/vnd.lotus-wordpro", "lwp"],
  ["application/vnd.macports.portpkg", "portpkg"],
  ["application/vnd.mcd", "mcd"],
  ["application/vnd.medcalcdata", "mc1"],
  ["application/vnd.mediastation.cdkey", "cdkey"],
  ["application/vnd.mfer", "mwf"],
  ["application/vnd.mfmp", "mfm"],
  ["application/vnd.micrografx.flo", "flo"],
  ["application/vnd.micrografx.igx", "igx"],
  ["application/vnd.mif", "mif"],
  ["application/vnd.mobius.daf", "daf"],
  ["application/vnd.mobius.dis", "dis"],
  ["application/vnd.mobius.mbk", "mbk"],
  ["application/vnd.mobius.mqy", "mqy"],
  ["application/vnd.mobius.msl", "msl"],
  ["application/vnd.mobius.plc", "plc"],
  ["application/vnd.mobius.txf", "txf"],
  ["application/vnd.mophun.application", "mpn"],
  ["application/vnd.mophun.certificate", "mpc"],
  ["application/vnd.mozilla.xul+xml", "xul"],
  ["application/vnd.ms-artgalry", "cil"],
  ["application/vnd.ms-cab-compressed", "cab"],
  ["application/vnd.ms-excel", ["xls", "xla", "xlc", "xlm", "xlt", "xlw", "xlb", "xll"]],
  ["application/vnd.ms-excel.addin.macroenabled.12", "xlam"],
  ["application/vnd.ms-excel.sheet.binary.macroenabled.12", "xlsb"],
  ["application/vnd.ms-excel.sheet.macroenabled.12", "xlsm"],
  ["application/vnd.ms-excel.template.macroenabled.12", "xltm"],
  ["application/vnd.ms-fontobject", "eot"],
  ["application/vnd.ms-htmlhelp", "chm"],
  ["application/vnd.ms-ims", "ims"],
  ["application/vnd.ms-lrm", "lrm"],
  ["application/vnd.ms-officetheme", "thmx"],
  ["application/vnd.ms-outlook", "msg"],
  ["application/vnd.ms-pki.certstore", "sst"],
  ["application/vnd.ms-pki.pko", "pko"],
  ["application/vnd.ms-pki.seccat", "cat"],
  ["application/vnd.ms-pki.stl", "stl"],
  ["application/vnd.ms-pkicertstore", "sst"],
  ["application/vnd.ms-pkiseccat", "cat"],
  ["application/vnd.ms-pkistl", "stl"],
  ["application/vnd.ms-powerpoint", ["ppt", "pot", "pps", "ppa", "pwz"]],
  ["application/vnd.ms-powerpoint.addin.macroenabled.12", "ppam"],
  ["application/vnd.ms-powerpoint.presentation.macroenabled.12", "pptm"],
  ["application/vnd.ms-powerpoint.slide.macroenabled.12", "sldm"],
  ["application/vnd.ms-powerpoint.slideshow.macroenabled.12", "ppsm"],
  ["application/vnd.ms-powerpoint.template.macroenabled.12", "potm"],
  ["application/vnd.ms-project", "mpp"],
  ["application/vnd.ms-word.document.macroenabled.12", "docm"],
  ["application/vnd.ms-word.template.macroenabled.12", "dotm"],
  ["application/vnd.ms-works", ["wks", "wcm", "wdb", "wps"]],
  ["application/vnd.ms-wpl", "wpl"],
  ["application/vnd.ms-xpsdocument", "xps"],
  ["application/vnd.mseq", "mseq"],
  ["application/vnd.musician", "mus"],
  ["application/vnd.muvee.style", "msty"],
  ["application/vnd.neurolanguage.nlu", "nlu"],
  ["application/vnd.noblenet-directory", "nnd"],
  ["application/vnd.noblenet-sealer", "nns"],
  ["application/vnd.noblenet-web", "nnw"],
  ["application/vnd.nokia.configuration-message", "ncm"],
  ["application/vnd.nokia.n-gage.data", "ngdat"],
  ["application/vnd.nokia.n-gage.symbian.install", "n-gage"],
  ["application/vnd.nokia.radio-preset", "rpst"],
  ["application/vnd.nokia.radio-presets", "rpss"],
  ["application/vnd.nokia.ringing-tone", "rng"],
  ["application/vnd.novadigm.edm", "edm"],
  ["application/vnd.novadigm.edx", "edx"],
  ["application/vnd.novadigm.ext", "ext"],
  ["application/vnd.oasis.opendocument.chart", "odc"],
  ["application/vnd.oasis.opendocument.chart-template", "otc"],
  ["application/vnd.oasis.opendocument.database", "odb"],
  ["application/vnd.oasis.opendocument.formula", "odf"],
  ["application/vnd.oasis.opendocument.formula-template", "odft"],
  ["application/vnd.oasis.opendocument.graphics", "odg"],
  ["application/vnd.oasis.opendocument.graphics-template", "otg"],
  ["application/vnd.oasis.opendocument.image", "odi"],
  ["application/vnd.oasis.opendocument.image-template", "oti"],
  ["application/vnd.oasis.opendocument.presentation", "odp"],
  ["application/vnd.oasis.opendocument.presentation-template", "otp"],
  ["application/vnd.oasis.opendocument.spreadsheet", "ods"],
  ["application/vnd.oasis.opendocument.spreadsheet-template", "ots"],
  ["application/vnd.oasis.opendocument.text", "odt"],
  ["application/vnd.oasis.opendocument.text-master", "odm"],
  ["application/vnd.oasis.opendocument.text-template", "ott"],
  ["application/vnd.oasis.opendocument.text-web", "oth"],
  ["application/vnd.olpc-sugar", "xo"],
  ["application/vnd.oma.dd2+xml", "dd2"],
  ["application/vnd.openofficeorg.extension", "oxt"],
  ["application/vnd.openxmlformats-officedocument.presentationml.presentation", "pptx"],
  ["application/vnd.openxmlformats-officedocument.presentationml.slide", "sldx"],
  ["application/vnd.openxmlformats-officedocument.presentationml.slideshow", "ppsx"],
  ["application/vnd.openxmlformats-officedocument.presentationml.template", "potx"],
  ["application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", "xlsx"],
  ["application/vnd.openxmlformats-officedocument.spreadsheetml.template", "xltx"],
  ["application/vnd.openxmlformats-officedocument.wordprocessingml.document", "docx"],
  ["application/vnd.openxmlformats-officedocument.wordprocessingml.template", "dotx"],
  ["application/vnd.osgeo.mapguide.package", "mgp"],
  ["application/vnd.osgi.dp", "dp"],
  ["application/vnd.palm", "pdb"],
  ["application/vnd.pawaafile", "paw"],
  ["application/vnd.pg.format", "str"],
  ["application/vnd.pg.osasli", "ei6"],
  ["application/vnd.picsel", "efif"],
  ["application/vnd.pmi.widget", "wg"],
  ["application/vnd.pocketlearn", "plf"],
  ["application/vnd.powerbuilder6", "pbd"],
  ["application/vnd.previewsystems.box", "box"],
  ["application/vnd.proteus.magazine", "mgz"],
  ["application/vnd.publishare-delta-tree", "qps"],
  ["application/vnd.pvi.ptid1", "ptid"],
  ["application/vnd.quark.quarkxpress", "qxd"],
  ["application/vnd.realvnc.bed", "bed"],
  ["application/vnd.recordare.musicxml", "mxl"],
  ["application/vnd.recordare.musicxml+xml", "musicxml"],
  ["application/vnd.rig.cryptonote", "cryptonote"],
  ["application/vnd.rim.cod", "cod"],
  ["application/vnd.rn-realmedia", "rm"],
  ["application/vnd.rn-realplayer", "rnx"],
  ["application/vnd.route66.link66+xml", "link66"],
  ["application/vnd.sailingtracker.track", "st"],
  ["application/vnd.seemail", "see"],
  ["application/vnd.sema", "sema"],
  ["application/vnd.semd", "semd"],
  ["application/vnd.semf", "semf"],
  ["application/vnd.shana.informed.formdata", "ifm"],
  ["application/vnd.shana.informed.formtemplate", "itp"],
  ["application/vnd.shana.informed.interchange", "iif"],
  ["application/vnd.shana.informed.package", "ipk"],
  ["application/vnd.simtech-mindmapper", "twd"],
  ["application/vnd.smaf", "mmf"],
  ["application/vnd.smart.teacher", "teacher"],
  ["application/vnd.solent.sdkm+xml", "sdkm"],
  ["application/vnd.spotfire.dxp", "dxp"],
  ["application/vnd.spotfire.sfs", "sfs"],
  ["application/vnd.stardivision.calc", "sdc"],
  ["application/vnd.stardivision.draw", "sda"],
  ["application/vnd.stardivision.impress", "sdd"],
  ["application/vnd.stardivision.math", "smf"],
  ["application/vnd.stardivision.writer", "sdw"],
  ["application/vnd.stardivision.writer-global", "sgl"],
  ["application/vnd.stepmania.stepchart", "sm"],
  ["application/vnd.sun.xml.calc", "sxc"],
  ["application/vnd.sun.xml.calc.template", "stc"],
  ["application/vnd.sun.xml.draw", "sxd"],
  ["application/vnd.sun.xml.draw.template", "std"],
  ["application/vnd.sun.xml.impress", "sxi"],
  ["application/vnd.sun.xml.impress.template", "sti"],
  ["application/vnd.sun.xml.math", "sxm"],
  ["application/vnd.sun.xml.writer", "sxw"],
  ["application/vnd.sun.xml.writer.global", "sxg"],
  ["application/vnd.sun.xml.writer.template", "stw"],
  ["application/vnd.sus-calendar", "sus"],
  ["application/vnd.svd", "svd"],
  ["application/vnd.symbian.install", "sis"],
  ["application/vnd.syncml+xml", "xsm"],
  ["application/vnd.syncml.dm+wbxml", "bdm"],
  ["application/vnd.syncml.dm+xml", "xdm"],
  ["application/vnd.tao.intent-module-archive", "tao"],
  ["application/vnd.tmobile-livetv", "tmo"],
  ["application/vnd.trid.tpt", "tpt"],
  ["application/vnd.triscape.mxs", "mxs"],
  ["application/vnd.trueapp", "tra"],
  ["application/vnd.ufdl", "ufd"],
  ["application/vnd.uiq.theme", "utz"],
  ["application/vnd.umajin", "umj"],
  ["application/vnd.unity", "unityweb"],
  ["application/vnd.uoml+xml", "uoml"],
  ["application/vnd.vcx", "vcx"],
  ["application/vnd.visio", "vsd"],
  ["application/vnd.visionary", "vis"],
  ["application/vnd.vsf", "vsf"],
  ["application/vnd.wap.wbxml", "wbxml"],
  ["application/vnd.wap.wmlc", "wmlc"],
  ["application/vnd.wap.wmlscriptc", "wmlsc"],
  ["application/vnd.webturbo", "wtb"],
  ["application/vnd.wolfram.player", "nbp"],
  ["application/vnd.wordperfect", "wpd"],
  ["application/vnd.wqd", "wqd"],
  ["application/vnd.wt.stf", "stf"],
  ["application/vnd.xara", ["web", "xar"]],
  ["application/vnd.xfdl", "xfdl"],
  ["application/vnd.yamaha.hv-dic", "hvd"],
  ["application/vnd.yamaha.hv-script", "hvs"],
  ["application/vnd.yamaha.hv-voice", "hvp"],
  ["application/vnd.yamaha.openscoreformat", "osf"],
  ["application/vnd.yamaha.openscoreformat.osfpvg+xml", "osfpvg"],
  ["application/vnd.yamaha.smaf-audio", "saf"],
  ["application/vnd.yamaha.smaf-phrase", "spf"],
  ["application/vnd.yellowriver-custom-menu", "cmp"],
  ["application/vnd.zul", "zir"],
  ["application/vnd.zzazz.deck+xml", "zaz"],
  ["application/vocaltec-media-desc", "vmd"],
  ["application/vocaltec-media-file", "vmf"],
  ["application/voicexml+xml", "vxml"],
  ["application/widget", "wgt"],
  ["application/winhlp", "hlp"],
  ["application/wordperfect", ["wp", "wp5", "wp6", "wpd"]],
  ["application/wordperfect6.0", ["w60", "wp5"]],
  ["application/wordperfect6.1", "w61"],
  ["application/wsdl+xml", "wsdl"],
  ["application/wspolicy+xml", "wspolicy"],
  ["application/x-123", "wk1"],
  ["application/x-7z-compressed", "7z"],
  ["application/x-abiword", "abw"],
  ["application/x-ace-compressed", "ace"],
  ["application/x-aim", "aim"],
  ["application/x-authorware-bin", "aab"],
  ["application/x-authorware-map", "aam"],
  ["application/x-authorware-seg", "aas"],
  ["application/x-bcpio", "bcpio"],
  ["application/x-binary", "bin"],
  ["application/x-binhex40", "hqx"],
  ["application/x-bittorrent", "torrent"],
  ["application/x-bsh", ["bsh", "sh", "shar"]],
  ["application/x-bytecode.elisp", "elc"],
  ["application/x-bytecode.python", "pyc"],
  ["application/x-bzip", "bz"],
  ["application/x-bzip2", ["boz", "bz2"]],
  ["application/x-cdf", "cdf"],
  ["application/x-cdlink", "vcd"],
  ["application/x-chat", ["cha", "chat"]],
  ["application/x-chess-pgn", "pgn"],
  ["application/x-cmu-raster", "ras"],
  ["application/x-cocoa", "cco"],
  ["application/x-compactpro", "cpt"],
  ["application/x-compress", "z"],
  ["application/x-compressed", ["tgz", "gz", "z", "zip"]],
  ["application/x-conference", "nsc"],
  ["application/x-cpio", "cpio"],
  ["application/x-cpt", "cpt"],
  ["application/x-csh", "csh"],
  ["application/x-debian-package", "deb"],
  ["application/x-deepv", "deepv"],
  ["application/x-director", ["dir", "dcr", "dxr"]],
  ["application/x-doom", "wad"],
  ["application/x-dtbncx+xml", "ncx"],
  ["application/x-dtbook+xml", "dtb"],
  ["application/x-dtbresource+xml", "res"],
  ["application/x-dvi", "dvi"],
  ["application/x-elc", "elc"],
  ["application/x-envoy", ["env", "evy"]],
  ["application/x-esrehber", "es"],
  ["application/x-excel", ["xls", "xla", "xlb", "xlc", "xld", "xlk", "xll", "xlm", "xlt", "xlv", "xlw"]],
  ["application/x-font-bdf", "bdf"],
  ["application/x-font-ghostscript", "gsf"],
  ["application/x-font-linux-psf", "psf"],
  ["application/x-font-otf", "otf"],
  ["application/x-font-pcf", "pcf"],
  ["application/x-font-snf", "snf"],
  ["application/x-font-ttf", "ttf"],
  ["application/x-font-type1", "pfa"],
  ["application/x-font-woff", "woff"],
  ["application/x-frame", "mif"],
  ["application/x-freelance", "pre"],
  ["application/x-futuresplash", "spl"],
  ["application/x-gnumeric", "gnumeric"],
  ["application/x-gsp", "gsp"],
  ["application/x-gss", "gss"],
  ["application/x-gtar", "gtar"],
  ["application/x-gzip", ["gz", "gzip"]],
  ["application/x-hdf", "hdf"],
  ["application/x-helpfile", ["help", "hlp"]],
  ["application/x-httpd-imap", "imap"],
  ["application/x-ima", "ima"],
  ["application/x-internet-signup", ["ins", "isp"]],
  ["application/x-internett-signup", "ins"],
  ["application/x-inventor", "iv"],
  ["application/x-ip2", "ip"],
  ["application/x-iphone", "iii"],
  ["application/x-java-class", "class"],
  ["application/x-java-commerce", "jcm"],
  ["application/x-java-jnlp-file", "jnlp"],
  ["application/x-javascript", "js"],
  ["application/x-koan", ["skd", "skm", "skp", "skt"]],
  ["application/x-ksh", "ksh"],
  ["application/x-latex", ["latex", "ltx"]],
  ["application/x-lha", "lha"],
  ["application/x-lisp", "lsp"],
  ["application/x-livescreen", "ivy"],
  ["application/x-lotus", "wq1"],
  ["application/x-lotusscreencam", "scm"],
  ["application/x-lzh", "lzh"],
  ["application/x-lzx", "lzx"],
  ["application/x-mac-binhex40", "hqx"],
  ["application/x-macbinary", "bin"],
  ["application/x-magic-cap-package-1.0", "mc$"],
  ["application/x-mathcad", "mcd"],
  ["application/x-meme", "mm"],
  ["application/x-midi", ["mid", "midi"]],
  ["application/x-mif", "mif"],
  ["application/x-mix-transfer", "nix"],
  ["application/x-mobipocket-ebook", "prc"],
  ["application/x-mplayer2", "asx"],
  ["application/x-ms-application", "application"],
  ["application/x-ms-wmd", "wmd"],
  ["application/x-ms-wmz", "wmz"],
  ["application/x-ms-xbap", "xbap"],
  ["application/x-msaccess", "mdb"],
  ["application/x-msbinder", "obd"],
  ["application/x-mscardfile", "crd"],
  ["application/x-msclip", "clp"],
  ["application/x-msdownload", ["exe", "dll"]],
  ["application/x-msexcel", ["xls", "xla", "xlw"]],
  ["application/x-msmediaview", ["mvb", "m13", "m14"]],
  ["application/x-msmetafile", "wmf"],
  ["application/x-msmoney", "mny"],
  ["application/x-mspowerpoint", "ppt"],
  ["application/x-mspublisher", "pub"],
  ["application/x-msschedule", "scd"],
  ["application/x-msterminal", "trm"],
  ["application/x-mswrite", "wri"],
  ["application/x-navi-animation", "ani"],
  ["application/x-navidoc", "nvd"],
  ["application/x-navimap", "map"],
  ["application/x-navistyle", "stl"],
  ["application/x-netcdf", ["cdf", "nc"]],
  ["application/x-newton-compatible-pkg", "pkg"],
  ["application/x-nokia-9000-communicator-add-on-software", "aos"],
  ["application/x-omc", "omc"],
  ["application/x-omcdatamaker", "omcd"],
  ["application/x-omcregerator", "omcr"],
  ["application/x-pagemaker", ["pm4", "pm5"]],
  ["application/x-pcl", "pcl"],
  ["application/x-perfmon", ["pma", "pmc", "pml", "pmr", "pmw"]],
  ["application/x-pixclscript", "plx"],
  ["application/x-pkcs10", "p10"],
  ["application/x-pkcs12", ["p12", "pfx"]],
  ["application/x-pkcs7-certificates", ["p7b", "spc"]],
  ["application/x-pkcs7-certreqresp", "p7r"],
  ["application/x-pkcs7-mime", ["p7m", "p7c"]],
  ["application/x-pkcs7-signature", ["p7s", "p7a"]],
  ["application/x-pointplus", "css"],
  ["application/x-portable-anymap", "pnm"],
  ["application/x-project", ["mpc", "mpt", "mpv", "mpx"]],
  ["application/x-qpro", "wb1"],
  ["application/x-rar-compressed", "rar"],
  ["application/x-rtf", "rtf"],
  ["application/x-sdp", "sdp"],
  ["application/x-sea", "sea"],
  ["application/x-seelogo", "sl"],
  ["application/x-sh", "sh"],
  ["application/x-shar", ["shar", "sh"]],
  ["application/x-shockwave-flash", "swf"],
  ["application/x-silverlight-app", "xap"],
  ["application/x-sit", "sit"],
  ["application/x-sprite", ["spr", "sprite"]],
  ["application/x-stuffit", "sit"],
  ["application/x-stuffitx", "sitx"],
  ["application/x-sv4cpio", "sv4cpio"],
  ["application/x-sv4crc", "sv4crc"],
  ["application/x-tar", "tar"],
  ["application/x-tbook", ["sbk", "tbk"]],
  ["application/x-tcl", "tcl"],
  ["application/x-tex", "tex"],
  ["application/x-tex-tfm", "tfm"],
  ["application/x-texinfo", ["texi", "texinfo"]],
  ["application/x-troff", ["roff", "t", "tr"]],
  ["application/x-troff-man", "man"],
  ["application/x-troff-me", "me"],
  ["application/x-troff-ms", "ms"],
  ["application/x-troff-msvideo", "avi"],
  ["application/x-ustar", "ustar"],
  ["application/x-visio", ["vsd", "vst", "vsw"]],
  ["application/x-vnd.audioexplosion.mzz", "mzz"],
  ["application/x-vnd.ls-xpix", "xpix"],
  ["application/x-vrml", "vrml"],
  ["application/x-wais-source", ["src", "wsrc"]],
  ["application/x-winhelp", "hlp"],
  ["application/x-wintalk", "wtk"],
  ["application/x-world", ["wrl", "svr"]],
  ["application/x-wpwin", "wpd"],
  ["application/x-wri", "wri"],
  ["application/x-x509-ca-cert", ["cer", "crt", "der"]],
  ["application/x-x509-user-cert", "crt"],
  ["application/x-xfig", "fig"],
  ["application/x-xpinstall", "xpi"],
  ["application/x-zip-compressed", "zip"],
  ["application/xcap-diff+xml", "xdf"],
  ["application/xenc+xml", "xenc"],
  ["application/xhtml+xml", "xhtml"],
  ["application/xml", "xml"],
  ["application/xml-dtd", "dtd"],
  ["application/xop+xml", "xop"],
  ["application/xslt+xml", "xslt"],
  ["application/xspf+xml", "xspf"],
  ["application/xv+xml", "mxml"],
  ["application/yang", "yang"],
  ["application/yin+xml", "yin"],
  ["application/ynd.ms-pkipko", "pko"],
  ["application/zip", "zip"],
  ["audio/adpcm", "adp"],
  ["audio/aiff", ["aiff", "aif", "aifc"]],
  ["audio/basic", ["snd", "au"]],
  ["audio/it", "it"],
  ["audio/make", ["funk", "my", "pfunk"]],
  ["audio/make.my.funk", "pfunk"],
  ["audio/mid", ["mid", "rmi"]],
  ["audio/midi", ["midi", "kar", "mid"]],
  ["audio/mod", "mod"],
  ["audio/mp4", "mp4a"],
  ["audio/mpeg", ["mpga", "mp3", "m2a", "mp2", "mpa", "mpg"]],
  ["audio/mpeg3", "mp3"],
  ["audio/nspaudio", ["la", "lma"]],
  ["audio/ogg", "oga"],
  ["audio/s3m", "s3m"],
  ["audio/tsp-audio", "tsi"],
  ["audio/tsplayer", "tsp"],
  ["audio/vnd.dece.audio", "uva"],
  ["audio/vnd.digital-winds", "eol"],
  ["audio/vnd.dra", "dra"],
  ["audio/vnd.dts", "dts"],
  ["audio/vnd.dts.hd", "dtshd"],
  ["audio/vnd.lucent.voice", "lvp"],
  ["audio/vnd.ms-playready.media.pya", "pya"],
  ["audio/vnd.nuera.ecelp4800", "ecelp4800"],
  ["audio/vnd.nuera.ecelp7470", "ecelp7470"],
  ["audio/vnd.nuera.ecelp9600", "ecelp9600"],
  ["audio/vnd.qcelp", "qcp"],
  ["audio/vnd.rip", "rip"],
  ["audio/voc", "voc"],
  ["audio/voxware", "vox"],
  ["audio/wav", "wav"],
  ["audio/webm", "weba"],
  ["audio/x-aac", "aac"],
  ["audio/x-adpcm", "snd"],
  ["audio/x-aiff", ["aiff", "aif", "aifc"]],
  ["audio/x-au", "au"],
  ["audio/x-gsm", ["gsd", "gsm"]],
  ["audio/x-jam", "jam"],
  ["audio/x-liveaudio", "lam"],
  ["audio/x-mid", ["mid", "midi"]],
  ["audio/x-midi", ["midi", "mid"]],
  ["audio/x-mod", "mod"],
  ["audio/x-mpeg", "mp2"],
  ["audio/x-mpeg-3", "mp3"],
  ["audio/x-mpegurl", "m3u"],
  ["audio/x-mpequrl", "m3u"],
  ["audio/x-ms-wax", "wax"],
  ["audio/x-ms-wma", "wma"],
  ["audio/x-nspaudio", ["la", "lma"]],
  ["audio/x-pn-realaudio", ["ra", "ram", "rm", "rmm", "rmp"]],
  ["audio/x-pn-realaudio-plugin", ["ra", "rmp", "rpm"]],
  ["audio/x-psid", "sid"],
  ["audio/x-realaudio", "ra"],
  ["audio/x-twinvq", "vqf"],
  ["audio/x-twinvq-plugin", ["vqe", "vql"]],
  ["audio/x-vnd.audioexplosion.mjuicemediafile", "mjf"],
  ["audio/x-voc", "voc"],
  ["audio/x-wav", "wav"],
  ["audio/xm", "xm"],
  ["chemical/x-cdx", "cdx"],
  ["chemical/x-cif", "cif"],
  ["chemical/x-cmdf", "cmdf"],
  ["chemical/x-cml", "cml"],
  ["chemical/x-csml", "csml"],
  ["chemical/x-pdb", ["pdb", "xyz"]],
  ["chemical/x-xyz", "xyz"],
  ["drawing/x-dwf", "dwf"],
  ["i-world/i-vrml", "ivr"],
  ["image/bmp", ["bmp", "bm"]],
  ["image/cgm", "cgm"],
  ["image/cis-cod", "cod"],
  ["image/cmu-raster", ["ras", "rast"]],
  ["image/fif", "fif"],
  ["image/florian", ["flo", "turbot"]],
  ["image/g3fax", "g3"],
  ["image/gif", "gif"],
  ["image/ief", ["ief", "iefs"]],
  ["image/jpeg", ["jpeg", "jpe", "jpg", "jfif", "jfif-tbnl"]],
  ["image/jutvision", "jut"],
  ["image/ktx", "ktx"],
  ["image/naplps", ["nap", "naplps"]],
  ["image/pict", ["pic", "pict"]],
  ["image/pipeg", "jfif"],
  ["image/pjpeg", ["jfif", "jpe", "jpeg", "jpg"]],
  ["image/png", ["png", "x-png"]],
  ["image/prs.btif", "btif"],
  ["image/svg+xml", "svg"],
  ["image/tiff", ["tif", "tiff"]],
  ["image/vasa", "mcf"],
  ["image/vnd.adobe.photoshop", "psd"],
  ["image/vnd.dece.graphic", "uvi"],
  ["image/vnd.djvu", "djvu"],
  ["image/vnd.dvb.subtitle", "sub"],
  ["image/vnd.dwg", ["dwg", "dxf", "svf"]],
  ["image/vnd.dxf", "dxf"],
  ["image/vnd.fastbidsheet", "fbs"],
  ["image/vnd.fpx", "fpx"],
  ["image/vnd.fst", "fst"],
  ["image/vnd.fujixerox.edmics-mmr", "mmr"],
  ["image/vnd.fujixerox.edmics-rlc", "rlc"],
  ["image/vnd.ms-modi", "mdi"],
  ["image/vnd.net-fpx", ["fpx", "npx"]],
  ["image/vnd.rn-realflash", "rf"],
  ["image/vnd.rn-realpix", "rp"],
  ["image/vnd.wap.wbmp", "wbmp"],
  ["image/vnd.xiff", "xif"],
  ["image/webp", "webp"],
  ["image/x-cmu-raster", "ras"],
  ["image/x-cmx", "cmx"],
  ["image/x-dwg", ["dwg", "dxf", "svf"]],
  ["image/x-freehand", "fh"],
  ["image/x-icon", "ico"],
  ["image/x-jg", "art"],
  ["image/x-jps", "jps"],
  ["image/x-niff", ["niff", "nif"]],
  ["image/x-pcx", "pcx"],
  ["image/x-pict", ["pct", "pic"]],
  ["image/x-portable-anymap", "pnm"],
  ["image/x-portable-bitmap", "pbm"],
  ["image/x-portable-graymap", "pgm"],
  ["image/x-portable-greymap", "pgm"],
  ["image/x-portable-pixmap", "ppm"],
  ["image/x-quicktime", ["qif", "qti", "qtif"]],
  ["image/x-rgb", "rgb"],
  ["image/x-tiff", ["tif", "tiff"]],
  ["image/x-windows-bmp", "bmp"],
  ["image/x-xbitmap", "xbm"],
  ["image/x-xbm", "xbm"],
  ["image/x-xpixmap", ["xpm", "pm"]],
  ["image/x-xwd", "xwd"],
  ["image/x-xwindowdump", "xwd"],
  ["image/xbm", "xbm"],
  ["image/xpm", "xpm"],
  ["message/rfc822", ["eml", "mht", "mhtml", "nws", "mime"]],
  ["model/iges", ["iges", "igs"]],
  ["model/mesh", "msh"],
  ["model/vnd.collada+xml", "dae"],
  ["model/vnd.dwf", "dwf"],
  ["model/vnd.gdl", "gdl"],
  ["model/vnd.gtw", "gtw"],
  ["model/vnd.mts", "mts"],
  ["model/vnd.vtu", "vtu"],
  ["model/vrml", ["vrml", "wrl", "wrz"]],
  ["model/x-pov", "pov"],
  ["multipart/x-gzip", "gzip"],
  ["multipart/x-ustar", "ustar"],
  ["multipart/x-zip", "zip"],
  ["music/crescendo", ["mid", "midi"]],
  ["music/x-karaoke", "kar"],
  ["paleovu/x-pv", "pvu"],
  ["text/asp", "asp"],
  ["text/calendar", "ics"],
  ["text/css", "css"],
  ["text/csv", "csv"],
  ["text/ecmascript", "js"],
  ["text/h323", "323"],
  ["text/html", ["html", "htm", "stm", "acgi", "htmls", "htx", "shtml"]],
  ["text/iuls", "uls"],
  ["text/javascript", "js"],
  ["text/mcf", "mcf"],
  ["text/n3", "n3"],
  ["text/pascal", "pas"],
  [
    "text/plain",
    [
      "txt",
      "bas",
      "c",
      "h",
      "c++",
      "cc",
      "com",
      "conf",
      "cxx",
      "def",
      "f",
      "f90",
      "for",
      "g",
      "hh",
      "idc",
      "jav",
      "java",
      "list",
      "log",
      "lst",
      "m",
      "mar",
      "pl",
      "sdml",
      "text"
    ]
  ],
  ["text/plain-bas", "par"],
  ["text/prs.lines.tag", "dsc"],
  ["text/richtext", ["rtx", "rt", "rtf"]],
  ["text/scriplet", "wsc"],
  ["text/scriptlet", "sct"],
  ["text/sgml", ["sgm", "sgml"]],
  ["text/tab-separated-values", "tsv"],
  ["text/troff", "t"],
  ["text/turtle", "ttl"],
  ["text/uri-list", ["uni", "unis", "uri", "uris"]],
  ["text/vnd.abc", "abc"],
  ["text/vnd.curl", "curl"],
  ["text/vnd.curl.dcurl", "dcurl"],
  ["text/vnd.curl.mcurl", "mcurl"],
  ["text/vnd.curl.scurl", "scurl"],
  ["text/vnd.fly", "fly"],
  ["text/vnd.fmi.flexstor", "flx"],
  ["text/vnd.graphviz", "gv"],
  ["text/vnd.in3d.3dml", "3dml"],
  ["text/vnd.in3d.spot", "spot"],
  ["text/vnd.rn-realtext", "rt"],
  ["text/vnd.sun.j2me.app-descriptor", "jad"],
  ["text/vnd.wap.wml", "wml"],
  ["text/vnd.wap.wmlscript", "wmls"],
  ["text/webviewhtml", "htt"],
  ["text/x-asm", ["asm", "s"]],
  ["text/x-audiosoft-intra", "aip"],
  ["text/x-c", ["c", "cc", "cpp"]],
  ["text/x-component", "htc"],
  ["text/x-fortran", ["for", "f", "f77", "f90"]],
  ["text/x-h", ["h", "hh"]],
  ["text/x-java-source", ["java", "jav"]],
  ["text/x-java-source,java", "java"],
  ["text/x-la-asf", "lsx"],
  ["text/x-m", "m"],
  ["text/x-pascal", "p"],
  ["text/x-script", "hlb"],
  ["text/x-script.csh", "csh"],
  ["text/x-script.elisp", "el"],
  ["text/x-script.guile", "scm"],
  ["text/x-script.ksh", "ksh"],
  ["text/x-script.lisp", "lsp"],
  ["text/x-script.perl", "pl"],
  ["text/x-script.perl-module", "pm"],
  ["text/x-script.phyton", "py"],
  ["text/x-script.rexx", "rexx"],
  ["text/x-script.scheme", "scm"],
  ["text/x-script.sh", "sh"],
  ["text/x-script.tcl", "tcl"],
  ["text/x-script.tcsh", "tcsh"],
  ["text/x-script.zsh", "zsh"],
  ["text/x-server-parsed-html", ["shtml", "ssi"]],
  ["text/x-setext", "etx"],
  ["text/x-sgml", ["sgm", "sgml"]],
  ["text/x-speech", ["spc", "talk"]],
  ["text/x-uil", "uil"],
  ["text/x-uuencode", ["uu", "uue"]],
  ["text/x-vcalendar", "vcs"],
  ["text/x-vcard", "vcf"],
  ["text/xml", "xml"],
  ["video/3gpp", "3gp"],
  ["video/3gpp2", "3g2"],
  ["video/animaflex", "afl"],
  ["video/avi", "avi"],
  ["video/avs-video", "avs"],
  ["video/dl", "dl"],
  ["video/fli", "fli"],
  ["video/gl", "gl"],
  ["video/h261", "h261"],
  ["video/h263", "h263"],
  ["video/h264", "h264"],
  ["video/jpeg", "jpgv"],
  ["video/jpm", "jpm"],
  ["video/mj2", "mj2"],
  ["video/mp4", "mp4"],
  ["video/mpeg", ["mpeg", "mp2", "mpa", "mpe", "mpg", "mpv2", "m1v", "m2v", "mp3"]],
  ["video/msvideo", "avi"],
  ["video/ogg", "ogv"],
  ["video/quicktime", ["mov", "qt", "moov"]],
  ["video/vdo", "vdo"],
  ["video/vivo", ["viv", "vivo"]],
  ["video/vnd.dece.hd", "uvh"],
  ["video/vnd.dece.mobile", "uvm"],
  ["video/vnd.dece.pd", "uvp"],
  ["video/vnd.dece.sd", "uvs"],
  ["video/vnd.dece.video", "uvv"],
  ["video/vnd.fvt", "fvt"],
  ["video/vnd.mpegurl", "mxu"],
  ["video/vnd.ms-playready.media.pyv", "pyv"],
  ["video/vnd.rn-realvideo", "rv"],
  ["video/vnd.uvvu.mp4", "uvu"],
  ["video/vnd.vivo", ["viv", "vivo"]],
  ["video/vosaic", "vos"],
  ["video/webm", "webm"],
  ["video/x-amt-demorun", "xdr"],
  ["video/x-amt-showrun", "xsr"],
  ["video/x-atomic3d-feature", "fmf"],
  ["video/x-dl", "dl"],
  ["video/x-dv", ["dif", "dv"]],
  ["video/x-f4v", "f4v"],
  ["video/x-fli", "fli"],
  ["video/x-flv", "flv"],
  ["video/x-gl", "gl"],
  ["video/x-isvideo", "isu"],
  ["video/x-la-asf", ["lsf", "lsx"]],
  ["video/x-m4v", "m4v"],
  ["video/x-motion-jpeg", "mjpg"],
  ["video/x-mpeg", ["mp3", "mp2"]],
  ["video/x-mpeq2a", "mp2"],
  ["video/x-ms-asf", ["asf", "asr", "asx"]],
  ["video/x-ms-asf-plugin", "asx"],
  ["video/x-ms-wm", "wm"],
  ["video/x-ms-wmv", "wmv"],
  ["video/x-ms-wmx", "wmx"],
  ["video/x-ms-wvx", "wvx"],
  ["video/x-msvideo", "avi"],
  ["video/x-qtc", "qtc"],
  ["video/x-scm", "scm"],
  ["video/x-sgi-movie", ["movie", "mv"]],
  ["windows/metafile", "wmf"],
  ["www/mime", "mime"],
  ["x-conference/x-cooltalk", "ice"],
  ["x-music/x-midi", ["mid", "midi"]],
  ["x-world/x-3dmf", ["3dm", "3dmf", "qd3", "qd3d"]],
  ["x-world/x-svr", "svr"],
  ["x-world/x-vrml", ["flr", "vrml", "wrl", "wrz", "xaf", "xof"]],
  ["x-world/x-vrt", "vrt"],
  ["xgl/drawing", "xgz"],
  ["xgl/movie", "xmz"]
]);
var extensions = /* @__PURE__ */ new Map([
  ["123", "application/vnd.lotus-1-2-3"],
  ["323", "text/h323"],
  ["*", "application/octet-stream"],
  ["3dm", "x-world/x-3dmf"],
  ["3dmf", "x-world/x-3dmf"],
  ["3dml", "text/vnd.in3d.3dml"],
  ["3g2", "video/3gpp2"],
  ["3gp", "video/3gpp"],
  ["7z", "application/x-7z-compressed"],
  ["a", "application/octet-stream"],
  ["aab", "application/x-authorware-bin"],
  ["aac", "audio/x-aac"],
  ["aam", "application/x-authorware-map"],
  ["aas", "application/x-authorware-seg"],
  ["abc", "text/vnd.abc"],
  ["abw", "application/x-abiword"],
  ["ac", "application/pkix-attr-cert"],
  ["acc", "application/vnd.americandynamics.acc"],
  ["ace", "application/x-ace-compressed"],
  ["acgi", "text/html"],
  ["acu", "application/vnd.acucobol"],
  ["acx", "application/internet-property-stream"],
  ["adp", "audio/adpcm"],
  ["aep", "application/vnd.audiograph"],
  ["afl", "video/animaflex"],
  ["afp", "application/vnd.ibm.modcap"],
  ["ahead", "application/vnd.ahead.space"],
  ["ai", "application/postscript"],
  ["aif", ["audio/aiff", "audio/x-aiff"]],
  ["aifc", ["audio/aiff", "audio/x-aiff"]],
  ["aiff", ["audio/aiff", "audio/x-aiff"]],
  ["aim", "application/x-aim"],
  ["aip", "text/x-audiosoft-intra"],
  ["air", "application/vnd.adobe.air-application-installer-package+zip"],
  ["ait", "application/vnd.dvb.ait"],
  ["ami", "application/vnd.amiga.ami"],
  ["ani", "application/x-navi-animation"],
  ["aos", "application/x-nokia-9000-communicator-add-on-software"],
  ["apk", "application/vnd.android.package-archive"],
  ["application", "application/x-ms-application"],
  ["apr", "application/vnd.lotus-approach"],
  ["aps", "application/mime"],
  ["arc", "application/octet-stream"],
  ["arj", ["application/arj", "application/octet-stream"]],
  ["art", "image/x-jg"],
  ["asf", "video/x-ms-asf"],
  ["asm", "text/x-asm"],
  ["aso", "application/vnd.accpac.simply.aso"],
  ["asp", "text/asp"],
  ["asr", "video/x-ms-asf"],
  ["asx", ["video/x-ms-asf", "application/x-mplayer2", "video/x-ms-asf-plugin"]],
  ["atc", "application/vnd.acucorp"],
  ["atomcat", "application/atomcat+xml"],
  ["atomsvc", "application/atomsvc+xml"],
  ["atx", "application/vnd.antix.game-component"],
  ["au", ["audio/basic", "audio/x-au"]],
  ["avi", ["video/avi", "video/msvideo", "application/x-troff-msvideo", "video/x-msvideo"]],
  ["avs", "video/avs-video"],
  ["aw", "application/applixware"],
  ["axs", "application/olescript"],
  ["azf", "application/vnd.airzip.filesecure.azf"],
  ["azs", "application/vnd.airzip.filesecure.azs"],
  ["azw", "application/vnd.amazon.ebook"],
  ["bas", "text/plain"],
  ["bcpio", "application/x-bcpio"],
  ["bdf", "application/x-font-bdf"],
  ["bdm", "application/vnd.syncml.dm+wbxml"],
  ["bed", "application/vnd.realvnc.bed"],
  ["bh2", "application/vnd.fujitsu.oasysprs"],
  [
    "bin",
    ["application/octet-stream", "application/mac-binary", "application/macbinary", "application/x-macbinary", "application/x-binary"]
  ],
  ["bm", "image/bmp"],
  ["bmi", "application/vnd.bmi"],
  ["bmp", ["image/bmp", "image/x-windows-bmp"]],
  ["boo", "application/book"],
  ["book", "application/book"],
  ["box", "application/vnd.previewsystems.box"],
  ["boz", "application/x-bzip2"],
  ["bsh", "application/x-bsh"],
  ["btif", "image/prs.btif"],
  ["bz", "application/x-bzip"],
  ["bz2", "application/x-bzip2"],
  ["c", ["text/plain", "text/x-c"]],
  ["c++", "text/plain"],
  ["c11amc", "application/vnd.cluetrust.cartomobile-config"],
  ["c11amz", "application/vnd.cluetrust.cartomobile-config-pkg"],
  ["c4g", "application/vnd.clonk.c4group"],
  ["cab", "application/vnd.ms-cab-compressed"],
  ["car", "application/vnd.curl.car"],
  ["cat", ["application/vnd.ms-pkiseccat", "application/vnd.ms-pki.seccat"]],
  ["cc", ["text/plain", "text/x-c"]],
  ["ccad", "application/clariscad"],
  ["cco", "application/x-cocoa"],
  ["ccxml", "application/ccxml+xml,"],
  ["cdbcmsg", "application/vnd.contact.cmsg"],
  ["cdf", ["application/cdf", "application/x-cdf", "application/x-netcdf"]],
  ["cdkey", "application/vnd.mediastation.cdkey"],
  ["cdmia", "application/cdmi-capability"],
  ["cdmic", "application/cdmi-container"],
  ["cdmid", "application/cdmi-domain"],
  ["cdmio", "application/cdmi-object"],
  ["cdmiq", "application/cdmi-queue"],
  ["cdx", "chemical/x-cdx"],
  ["cdxml", "application/vnd.chemdraw+xml"],
  ["cdy", "application/vnd.cinderella"],
  ["cer", ["application/pkix-cert", "application/x-x509-ca-cert"]],
  ["cgm", "image/cgm"],
  ["cha", "application/x-chat"],
  ["chat", "application/x-chat"],
  ["chm", "application/vnd.ms-htmlhelp"],
  ["chrt", "application/vnd.kde.kchart"],
  ["cif", "chemical/x-cif"],
  ["cii", "application/vnd.anser-web-certificate-issue-initiation"],
  ["cil", "application/vnd.ms-artgalry"],
  ["cla", "application/vnd.claymore"],
  [
    "class",
    ["application/octet-stream", "application/java", "application/java-byte-code", "application/java-vm", "application/x-java-class"]
  ],
  ["clkk", "application/vnd.crick.clicker.keyboard"],
  ["clkp", "application/vnd.crick.clicker.palette"],
  ["clkt", "application/vnd.crick.clicker.template"],
  ["clkw", "application/vnd.crick.clicker.wordbank"],
  ["clkx", "application/vnd.crick.clicker"],
  ["clp", "application/x-msclip"],
  ["cmc", "application/vnd.cosmocaller"],
  ["cmdf", "chemical/x-cmdf"],
  ["cml", "chemical/x-cml"],
  ["cmp", "application/vnd.yellowriver-custom-menu"],
  ["cmx", "image/x-cmx"],
  ["cod", ["image/cis-cod", "application/vnd.rim.cod"]],
  ["com", ["application/octet-stream", "text/plain"]],
  ["conf", "text/plain"],
  ["cpio", "application/x-cpio"],
  ["cpp", "text/x-c"],
  ["cpt", ["application/mac-compactpro", "application/x-compactpro", "application/x-cpt"]],
  ["crd", "application/x-mscardfile"],
  ["crl", ["application/pkix-crl", "application/pkcs-crl"]],
  ["crt", ["application/pkix-cert", "application/x-x509-user-cert", "application/x-x509-ca-cert"]],
  ["cryptonote", "application/vnd.rig.cryptonote"],
  ["csh", ["text/x-script.csh", "application/x-csh"]],
  ["csml", "chemical/x-csml"],
  ["csp", "application/vnd.commonspace"],
  ["css", ["text/css", "application/x-pointplus"]],
  ["csv", "text/csv"],
  ["cu", "application/cu-seeme"],
  ["curl", "text/vnd.curl"],
  ["cww", "application/prs.cww"],
  ["cxx", "text/plain"],
  ["dae", "model/vnd.collada+xml"],
  ["daf", "application/vnd.mobius.daf"],
  ["davmount", "application/davmount+xml"],
  ["dcr", "application/x-director"],
  ["dcurl", "text/vnd.curl.dcurl"],
  ["dd2", "application/vnd.oma.dd2+xml"],
  ["ddd", "application/vnd.fujixerox.ddd"],
  ["deb", "application/x-debian-package"],
  ["deepv", "application/x-deepv"],
  ["def", "text/plain"],
  ["der", "application/x-x509-ca-cert"],
  ["dfac", "application/vnd.dreamfactory"],
  ["dif", "video/x-dv"],
  ["dir", "application/x-director"],
  ["dis", "application/vnd.mobius.dis"],
  ["djvu", "image/vnd.djvu"],
  ["dl", ["video/dl", "video/x-dl"]],
  ["dll", "application/x-msdownload"],
  ["dms", "application/octet-stream"],
  ["dna", "application/vnd.dna"],
  ["doc", "application/msword"],
  ["docm", "application/vnd.ms-word.document.macroenabled.12"],
  ["docx", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"],
  ["dot", "application/msword"],
  ["dotm", "application/vnd.ms-word.template.macroenabled.12"],
  ["dotx", "application/vnd.openxmlformats-officedocument.wordprocessingml.template"],
  ["dp", ["application/commonground", "application/vnd.osgi.dp"]],
  ["dpg", "application/vnd.dpgraph"],
  ["dra", "audio/vnd.dra"],
  ["drw", "application/drafting"],
  ["dsc", "text/prs.lines.tag"],
  ["dssc", "application/dssc+der"],
  ["dtb", "application/x-dtbook+xml"],
  ["dtd", "application/xml-dtd"],
  ["dts", "audio/vnd.dts"],
  ["dtshd", "audio/vnd.dts.hd"],
  ["dump", "application/octet-stream"],
  ["dv", "video/x-dv"],
  ["dvi", "application/x-dvi"],
  ["dwf", ["model/vnd.dwf", "drawing/x-dwf"]],
  ["dwg", ["application/acad", "image/vnd.dwg", "image/x-dwg"]],
  ["dxf", ["application/dxf", "image/vnd.dwg", "image/vnd.dxf", "image/x-dwg"]],
  ["dxp", "application/vnd.spotfire.dxp"],
  ["dxr", "application/x-director"],
  ["ecelp4800", "audio/vnd.nuera.ecelp4800"],
  ["ecelp7470", "audio/vnd.nuera.ecelp7470"],
  ["ecelp9600", "audio/vnd.nuera.ecelp9600"],
  ["edm", "application/vnd.novadigm.edm"],
  ["edx", "application/vnd.novadigm.edx"],
  ["efif", "application/vnd.picsel"],
  ["ei6", "application/vnd.pg.osasli"],
  ["el", "text/x-script.elisp"],
  ["elc", ["application/x-elc", "application/x-bytecode.elisp"]],
  ["eml", "message/rfc822"],
  ["emma", "application/emma+xml"],
  ["env", "application/x-envoy"],
  ["eol", "audio/vnd.digital-winds"],
  ["eot", "application/vnd.ms-fontobject"],
  ["eps", "application/postscript"],
  ["epub", "application/epub+zip"],
  ["es", ["application/ecmascript", "application/x-esrehber"]],
  ["es3", "application/vnd.eszigno3+xml"],
  ["esf", "application/vnd.epson.esf"],
  ["etx", "text/x-setext"],
  ["evy", ["application/envoy", "application/x-envoy"]],
  ["exe", ["application/octet-stream", "application/x-msdownload"]],
  ["exi", "application/exi"],
  ["ext", "application/vnd.novadigm.ext"],
  ["ez2", "application/vnd.ezpix-album"],
  ["ez3", "application/vnd.ezpix-package"],
  ["f", ["text/plain", "text/x-fortran"]],
  ["f4v", "video/x-f4v"],
  ["f77", "text/x-fortran"],
  ["f90", ["text/plain", "text/x-fortran"]],
  ["fbs", "image/vnd.fastbidsheet"],
  ["fcs", "application/vnd.isac.fcs"],
  ["fdf", "application/vnd.fdf"],
  ["fe_launch", "application/vnd.denovo.fcselayout-link"],
  ["fg5", "application/vnd.fujitsu.oasysgp"],
  ["fh", "image/x-freehand"],
  ["fif", ["application/fractals", "image/fif"]],
  ["fig", "application/x-xfig"],
  ["fli", ["video/fli", "video/x-fli"]],
  ["flo", ["image/florian", "application/vnd.micrografx.flo"]],
  ["flr", "x-world/x-vrml"],
  ["flv", "video/x-flv"],
  ["flw", "application/vnd.kde.kivio"],
  ["flx", "text/vnd.fmi.flexstor"],
  ["fly", "text/vnd.fly"],
  ["fm", "application/vnd.framemaker"],
  ["fmf", "video/x-atomic3d-feature"],
  ["fnc", "application/vnd.frogans.fnc"],
  ["for", ["text/plain", "text/x-fortran"]],
  ["fpx", ["image/vnd.fpx", "image/vnd.net-fpx"]],
  ["frl", "application/freeloader"],
  ["fsc", "application/vnd.fsc.weblaunch"],
  ["fst", "image/vnd.fst"],
  ["ftc", "application/vnd.fluxtime.clip"],
  ["fti", "application/vnd.anser-web-funds-transfer-initiation"],
  ["funk", "audio/make"],
  ["fvt", "video/vnd.fvt"],
  ["fxp", "application/vnd.adobe.fxp"],
  ["fzs", "application/vnd.fuzzysheet"],
  ["g", "text/plain"],
  ["g2w", "application/vnd.geoplan"],
  ["g3", "image/g3fax"],
  ["g3w", "application/vnd.geospace"],
  ["gac", "application/vnd.groove-account"],
  ["gdl", "model/vnd.gdl"],
  ["geo", "application/vnd.dynageo"],
  ["geojson", "application/geo+json"],
  ["gex", "application/vnd.geometry-explorer"],
  ["ggb", "application/vnd.geogebra.file"],
  ["ggt", "application/vnd.geogebra.tool"],
  ["ghf", "application/vnd.groove-help"],
  ["gif", "image/gif"],
  ["gim", "application/vnd.groove-identity-message"],
  ["gl", ["video/gl", "video/x-gl"]],
  ["gmx", "application/vnd.gmx"],
  ["gnumeric", "application/x-gnumeric"],
  ["gph", "application/vnd.flographit"],
  ["gqf", "application/vnd.grafeq"],
  ["gram", "application/srgs"],
  ["grv", "application/vnd.groove-injector"],
  ["grxml", "application/srgs+xml"],
  ["gsd", "audio/x-gsm"],
  ["gsf", "application/x-font-ghostscript"],
  ["gsm", "audio/x-gsm"],
  ["gsp", "application/x-gsp"],
  ["gss", "application/x-gss"],
  ["gtar", "application/x-gtar"],
  ["gtm", "application/vnd.groove-tool-message"],
  ["gtw", "model/vnd.gtw"],
  ["gv", "text/vnd.graphviz"],
  ["gxt", "application/vnd.geonext"],
  ["gz", ["application/x-gzip", "application/x-compressed"]],
  ["gzip", ["multipart/x-gzip", "application/x-gzip"]],
  ["h", ["text/plain", "text/x-h"]],
  ["h261", "video/h261"],
  ["h263", "video/h263"],
  ["h264", "video/h264"],
  ["hal", "application/vnd.hal+xml"],
  ["hbci", "application/vnd.hbci"],
  ["hdf", "application/x-hdf"],
  ["help", "application/x-helpfile"],
  ["hgl", "application/vnd.hp-hpgl"],
  ["hh", ["text/plain", "text/x-h"]],
  ["hlb", "text/x-script"],
  ["hlp", ["application/winhlp", "application/hlp", "application/x-helpfile", "application/x-winhelp"]],
  ["hpg", "application/vnd.hp-hpgl"],
  ["hpgl", "application/vnd.hp-hpgl"],
  ["hpid", "application/vnd.hp-hpid"],
  ["hps", "application/vnd.hp-hps"],
  [
    "hqx",
    [
      "application/mac-binhex40",
      "application/binhex",
      "application/binhex4",
      "application/mac-binhex",
      "application/x-binhex40",
      "application/x-mac-binhex40"
    ]
  ],
  ["hta", "application/hta"],
  ["htc", "text/x-component"],
  ["htke", "application/vnd.kenameaapp"],
  ["htm", "text/html"],
  ["html", "text/html"],
  ["htmls", "text/html"],
  ["htt", "text/webviewhtml"],
  ["htx", "text/html"],
  ["hvd", "application/vnd.yamaha.hv-dic"],
  ["hvp", "application/vnd.yamaha.hv-voice"],
  ["hvs", "application/vnd.yamaha.hv-script"],
  ["i2g", "application/vnd.intergeo"],
  ["icc", "application/vnd.iccprofile"],
  ["ice", "x-conference/x-cooltalk"],
  ["ico", "image/x-icon"],
  ["ics", "text/calendar"],
  ["idc", "text/plain"],
  ["ief", "image/ief"],
  ["iefs", "image/ief"],
  ["ifm", "application/vnd.shana.informed.formdata"],
  ["iges", ["application/iges", "model/iges"]],
  ["igl", "application/vnd.igloader"],
  ["igm", "application/vnd.insors.igm"],
  ["igs", ["application/iges", "model/iges"]],
  ["igx", "application/vnd.micrografx.igx"],
  ["iif", "application/vnd.shana.informed.interchange"],
  ["iii", "application/x-iphone"],
  ["ima", "application/x-ima"],
  ["imap", "application/x-httpd-imap"],
  ["imp", "application/vnd.accpac.simply.imp"],
  ["ims", "application/vnd.ms-ims"],
  ["inf", "application/inf"],
  ["ins", ["application/x-internet-signup", "application/x-internett-signup"]],
  ["ip", "application/x-ip2"],
  ["ipfix", "application/ipfix"],
  ["ipk", "application/vnd.shana.informed.package"],
  ["irm", "application/vnd.ibm.rights-management"],
  ["irp", "application/vnd.irepository.package+xml"],
  ["isp", "application/x-internet-signup"],
  ["isu", "video/x-isvideo"],
  ["it", "audio/it"],
  ["itp", "application/vnd.shana.informed.formtemplate"],
  ["iv", "application/x-inventor"],
  ["ivp", "application/vnd.immervision-ivp"],
  ["ivr", "i-world/i-vrml"],
  ["ivu", "application/vnd.immervision-ivu"],
  ["ivy", "application/x-livescreen"],
  ["jad", "text/vnd.sun.j2me.app-descriptor"],
  ["jam", ["application/vnd.jam", "audio/x-jam"]],
  ["jar", "application/java-archive"],
  ["jav", ["text/plain", "text/x-java-source"]],
  ["java", ["text/plain", "text/x-java-source,java", "text/x-java-source"]],
  ["jcm", "application/x-java-commerce"],
  ["jfif", ["image/pipeg", "image/jpeg", "image/pjpeg"]],
  ["jfif-tbnl", "image/jpeg"],
  ["jisp", "application/vnd.jisp"],
  ["jlt", "application/vnd.hp-jlyt"],
  ["jnlp", "application/x-java-jnlp-file"],
  ["joda", "application/vnd.joost.joda-archive"],
  ["jpe", ["image/jpeg", "image/pjpeg"]],
  ["jpeg", ["image/jpeg", "image/pjpeg"]],
  ["jpg", ["image/jpeg", "image/pjpeg"]],
  ["jpgv", "video/jpeg"],
  ["jpm", "video/jpm"],
  ["jps", "image/x-jps"],
  ["js", ["application/javascript", "application/ecmascript", "text/javascript", "text/ecmascript", "application/x-javascript"]],
  ["json", "application/json"],
  ["jut", "image/jutvision"],
  ["kar", ["audio/midi", "music/x-karaoke"]],
  ["karbon", "application/vnd.kde.karbon"],
  ["kfo", "application/vnd.kde.kformula"],
  ["kia", "application/vnd.kidspiration"],
  ["kml", "application/vnd.google-earth.kml+xml"],
  ["kmz", "application/vnd.google-earth.kmz"],
  ["kne", "application/vnd.kinar"],
  ["kon", "application/vnd.kde.kontour"],
  ["kpr", "application/vnd.kde.kpresenter"],
  ["ksh", ["application/x-ksh", "text/x-script.ksh"]],
  ["ksp", "application/vnd.kde.kspread"],
  ["ktx", "image/ktx"],
  ["ktz", "application/vnd.kahootz"],
  ["kwd", "application/vnd.kde.kword"],
  ["la", ["audio/nspaudio", "audio/x-nspaudio"]],
  ["lam", "audio/x-liveaudio"],
  ["lasxml", "application/vnd.las.las+xml"],
  ["latex", "application/x-latex"],
  ["lbd", "application/vnd.llamagraphics.life-balance.desktop"],
  ["lbe", "application/vnd.llamagraphics.life-balance.exchange+xml"],
  ["les", "application/vnd.hhe.lesson-player"],
  ["lha", ["application/octet-stream", "application/lha", "application/x-lha"]],
  ["lhx", "application/octet-stream"],
  ["link66", "application/vnd.route66.link66+xml"],
  ["list", "text/plain"],
  ["lma", ["audio/nspaudio", "audio/x-nspaudio"]],
  ["log", "text/plain"],
  ["lrm", "application/vnd.ms-lrm"],
  ["lsf", "video/x-la-asf"],
  ["lsp", ["application/x-lisp", "text/x-script.lisp"]],
  ["lst", "text/plain"],
  ["lsx", ["video/x-la-asf", "text/x-la-asf"]],
  ["ltf", "application/vnd.frogans.ltf"],
  ["ltx", "application/x-latex"],
  ["lvp", "audio/vnd.lucent.voice"],
  ["lwp", "application/vnd.lotus-wordpro"],
  ["lzh", ["application/octet-stream", "application/x-lzh"]],
  ["lzx", ["application/lzx", "application/octet-stream", "application/x-lzx"]],
  ["m", ["text/plain", "text/x-m"]],
  ["m13", "application/x-msmediaview"],
  ["m14", "application/x-msmediaview"],
  ["m1v", "video/mpeg"],
  ["m21", "application/mp21"],
  ["m2a", "audio/mpeg"],
  ["m2v", "video/mpeg"],
  ["m3u", ["audio/x-mpegurl", "audio/x-mpequrl"]],
  ["m3u8", "application/vnd.apple.mpegurl"],
  ["m4v", "video/x-m4v"],
  ["ma", "application/mathematica"],
  ["mads", "application/mads+xml"],
  ["mag", "application/vnd.ecowin.chart"],
  ["man", "application/x-troff-man"],
  ["map", "application/x-navimap"],
  ["mar", "text/plain"],
  ["mathml", "application/mathml+xml"],
  ["mbd", "application/mbedlet"],
  ["mbk", "application/vnd.mobius.mbk"],
  ["mbox", "application/mbox"],
  ["mc$", "application/x-magic-cap-package-1.0"],
  ["mc1", "application/vnd.medcalcdata"],
  ["mcd", ["application/mcad", "application/vnd.mcd", "application/x-mathcad"]],
  ["mcf", ["image/vasa", "text/mcf"]],
  ["mcp", "application/netmc"],
  ["mcurl", "text/vnd.curl.mcurl"],
  ["mdb", "application/x-msaccess"],
  ["mdi", "image/vnd.ms-modi"],
  ["me", "application/x-troff-me"],
  ["meta4", "application/metalink4+xml"],
  ["mets", "application/mets+xml"],
  ["mfm", "application/vnd.mfmp"],
  ["mgp", "application/vnd.osgeo.mapguide.package"],
  ["mgz", "application/vnd.proteus.magazine"],
  ["mht", "message/rfc822"],
  ["mhtml", "message/rfc822"],
  ["mid", ["audio/mid", "audio/midi", "music/crescendo", "x-music/x-midi", "audio/x-midi", "application/x-midi", "audio/x-mid"]],
  ["midi", ["audio/midi", "music/crescendo", "x-music/x-midi", "audio/x-midi", "application/x-midi", "audio/x-mid"]],
  ["mif", ["application/vnd.mif", "application/x-mif", "application/x-frame"]],
  ["mime", ["message/rfc822", "www/mime"]],
  ["mj2", "video/mj2"],
  ["mjf", "audio/x-vnd.audioexplosion.mjuicemediafile"],
  ["mjpg", "video/x-motion-jpeg"],
  ["mlp", "application/vnd.dolby.mlp"],
  ["mm", ["application/base64", "application/x-meme"]],
  ["mmd", "application/vnd.chipnuts.karaoke-mmd"],
  ["mme", "application/base64"],
  ["mmf", "application/vnd.smaf"],
  ["mmr", "image/vnd.fujixerox.edmics-mmr"],
  ["mny", "application/x-msmoney"],
  ["mod", ["audio/mod", "audio/x-mod"]],
  ["mods", "application/mods+xml"],
  ["moov", "video/quicktime"],
  ["mov", "video/quicktime"],
  ["movie", "video/x-sgi-movie"],
  ["mp2", ["video/mpeg", "audio/mpeg", "video/x-mpeg", "audio/x-mpeg", "video/x-mpeq2a"]],
  ["mp3", ["audio/mpeg", "audio/mpeg3", "video/mpeg", "audio/x-mpeg-3", "video/x-mpeg"]],
  ["mp4", ["video/mp4", "application/mp4"]],
  ["mp4a", "audio/mp4"],
  ["mpa", ["video/mpeg", "audio/mpeg"]],
  ["mpc", ["application/vnd.mophun.certificate", "application/x-project"]],
  ["mpe", "video/mpeg"],
  ["mpeg", "video/mpeg"],
  ["mpg", ["video/mpeg", "audio/mpeg"]],
  ["mpga", "audio/mpeg"],
  ["mpkg", "application/vnd.apple.installer+xml"],
  ["mpm", "application/vnd.blueice.multipass"],
  ["mpn", "application/vnd.mophun.application"],
  ["mpp", "application/vnd.ms-project"],
  ["mpt", "application/x-project"],
  ["mpv", "application/x-project"],
  ["mpv2", "video/mpeg"],
  ["mpx", "application/x-project"],
  ["mpy", "application/vnd.ibm.minipay"],
  ["mqy", "application/vnd.mobius.mqy"],
  ["mrc", "application/marc"],
  ["mrcx", "application/marcxml+xml"],
  ["ms", "application/x-troff-ms"],
  ["mscml", "application/mediaservercontrol+xml"],
  ["mseq", "application/vnd.mseq"],
  ["msf", "application/vnd.epson.msf"],
  ["msg", "application/vnd.ms-outlook"],
  ["msh", "model/mesh"],
  ["msl", "application/vnd.mobius.msl"],
  ["msty", "application/vnd.muvee.style"],
  ["mts", "model/vnd.mts"],
  ["mus", "application/vnd.musician"],
  ["musicxml", "application/vnd.recordare.musicxml+xml"],
  ["mv", "video/x-sgi-movie"],
  ["mvb", "application/x-msmediaview"],
  ["mwf", "application/vnd.mfer"],
  ["mxf", "application/mxf"],
  ["mxl", "application/vnd.recordare.musicxml"],
  ["mxml", "application/xv+xml"],
  ["mxs", "application/vnd.triscape.mxs"],
  ["mxu", "video/vnd.mpegurl"],
  ["my", "audio/make"],
  ["mzz", "application/x-vnd.audioexplosion.mzz"],
  ["n-gage", "application/vnd.nokia.n-gage.symbian.install"],
  ["n3", "text/n3"],
  ["nap", "image/naplps"],
  ["naplps", "image/naplps"],
  ["nbp", "application/vnd.wolfram.player"],
  ["nc", "application/x-netcdf"],
  ["ncm", "application/vnd.nokia.configuration-message"],
  ["ncx", "application/x-dtbncx+xml"],
  ["ngdat", "application/vnd.nokia.n-gage.data"],
  ["nif", "image/x-niff"],
  ["niff", "image/x-niff"],
  ["nix", "application/x-mix-transfer"],
  ["nlu", "application/vnd.neurolanguage.nlu"],
  ["nml", "application/vnd.enliven"],
  ["nnd", "application/vnd.noblenet-directory"],
  ["nns", "application/vnd.noblenet-sealer"],
  ["nnw", "application/vnd.noblenet-web"],
  ["npx", "image/vnd.net-fpx"],
  ["nsc", "application/x-conference"],
  ["nsf", "application/vnd.lotus-notes"],
  ["nvd", "application/x-navidoc"],
  ["nws", "message/rfc822"],
  ["o", "application/octet-stream"],
  ["oa2", "application/vnd.fujitsu.oasys2"],
  ["oa3", "application/vnd.fujitsu.oasys3"],
  ["oas", "application/vnd.fujitsu.oasys"],
  ["obd", "application/x-msbinder"],
  ["oda", "application/oda"],
  ["odb", "application/vnd.oasis.opendocument.database"],
  ["odc", "application/vnd.oasis.opendocument.chart"],
  ["odf", "application/vnd.oasis.opendocument.formula"],
  ["odft", "application/vnd.oasis.opendocument.formula-template"],
  ["odg", "application/vnd.oasis.opendocument.graphics"],
  ["odi", "application/vnd.oasis.opendocument.image"],
  ["odm", "application/vnd.oasis.opendocument.text-master"],
  ["odp", "application/vnd.oasis.opendocument.presentation"],
  ["ods", "application/vnd.oasis.opendocument.spreadsheet"],
  ["odt", "application/vnd.oasis.opendocument.text"],
  ["oga", "audio/ogg"],
  ["ogv", "video/ogg"],
  ["ogx", "application/ogg"],
  ["omc", "application/x-omc"],
  ["omcd", "application/x-omcdatamaker"],
  ["omcr", "application/x-omcregerator"],
  ["onetoc", "application/onenote"],
  ["opf", "application/oebps-package+xml"],
  ["org", "application/vnd.lotus-organizer"],
  ["osf", "application/vnd.yamaha.openscoreformat"],
  ["osfpvg", "application/vnd.yamaha.openscoreformat.osfpvg+xml"],
  ["otc", "application/vnd.oasis.opendocument.chart-template"],
  ["otf", "application/x-font-otf"],
  ["otg", "application/vnd.oasis.opendocument.graphics-template"],
  ["oth", "application/vnd.oasis.opendocument.text-web"],
  ["oti", "application/vnd.oasis.opendocument.image-template"],
  ["otp", "application/vnd.oasis.opendocument.presentation-template"],
  ["ots", "application/vnd.oasis.opendocument.spreadsheet-template"],
  ["ott", "application/vnd.oasis.opendocument.text-template"],
  ["oxt", "application/vnd.openofficeorg.extension"],
  ["p", "text/x-pascal"],
  ["p10", ["application/pkcs10", "application/x-pkcs10"]],
  ["p12", ["application/pkcs-12", "application/x-pkcs12"]],
  ["p7a", "application/x-pkcs7-signature"],
  ["p7b", "application/x-pkcs7-certificates"],
  ["p7c", ["application/pkcs7-mime", "application/x-pkcs7-mime"]],
  ["p7m", ["application/pkcs7-mime", "application/x-pkcs7-mime"]],
  ["p7r", "application/x-pkcs7-certreqresp"],
  ["p7s", ["application/pkcs7-signature", "application/x-pkcs7-signature"]],
  ["p8", "application/pkcs8"],
  ["par", "text/plain-bas"],
  ["part", "application/pro_eng"],
  ["pas", "text/pascal"],
  ["paw", "application/vnd.pawaafile"],
  ["pbd", "application/vnd.powerbuilder6"],
  ["pbm", "image/x-portable-bitmap"],
  ["pcf", "application/x-font-pcf"],
  ["pcl", ["application/vnd.hp-pcl", "application/x-pcl"]],
  ["pclxl", "application/vnd.hp-pclxl"],
  ["pct", "image/x-pict"],
  ["pcurl", "application/vnd.curl.pcurl"],
  ["pcx", "image/x-pcx"],
  ["pdb", ["application/vnd.palm", "chemical/x-pdb"]],
  ["pdf", "application/pdf"],
  ["pfa", "application/x-font-type1"],
  ["pfr", "application/font-tdpfr"],
  ["pfunk", ["audio/make", "audio/make.my.funk"]],
  ["pfx", "application/x-pkcs12"],
  ["pgm", ["image/x-portable-graymap", "image/x-portable-greymap"]],
  ["pgn", "application/x-chess-pgn"],
  ["pgp", "application/pgp-signature"],
  ["pic", ["image/pict", "image/x-pict"]],
  ["pict", "image/pict"],
  ["pkg", "application/x-newton-compatible-pkg"],
  ["pki", "application/pkixcmp"],
  ["pkipath", "application/pkix-pkipath"],
  ["pko", ["application/ynd.ms-pkipko", "application/vnd.ms-pki.pko"]],
  ["pl", ["text/plain", "text/x-script.perl"]],
  ["plb", "application/vnd.3gpp.pic-bw-large"],
  ["plc", "application/vnd.mobius.plc"],
  ["plf", "application/vnd.pocketlearn"],
  ["pls", "application/pls+xml"],
  ["plx", "application/x-pixclscript"],
  ["pm", ["text/x-script.perl-module", "image/x-xpixmap"]],
  ["pm4", "application/x-pagemaker"],
  ["pm5", "application/x-pagemaker"],
  ["pma", "application/x-perfmon"],
  ["pmc", "application/x-perfmon"],
  ["pml", ["application/vnd.ctc-posml", "application/x-perfmon"]],
  ["pmr", "application/x-perfmon"],
  ["pmw", "application/x-perfmon"],
  ["png", "image/png"],
  ["pnm", ["application/x-portable-anymap", "image/x-portable-anymap"]],
  ["portpkg", "application/vnd.macports.portpkg"],
  ["pot", ["application/vnd.ms-powerpoint", "application/mspowerpoint"]],
  ["potm", "application/vnd.ms-powerpoint.template.macroenabled.12"],
  ["potx", "application/vnd.openxmlformats-officedocument.presentationml.template"],
  ["pov", "model/x-pov"],
  ["ppa", "application/vnd.ms-powerpoint"],
  ["ppam", "application/vnd.ms-powerpoint.addin.macroenabled.12"],
  ["ppd", "application/vnd.cups-ppd"],
  ["ppm", "image/x-portable-pixmap"],
  ["pps", ["application/vnd.ms-powerpoint", "application/mspowerpoint"]],
  ["ppsm", "application/vnd.ms-powerpoint.slideshow.macroenabled.12"],
  ["ppsx", "application/vnd.openxmlformats-officedocument.presentationml.slideshow"],
  ["ppt", ["application/vnd.ms-powerpoint", "application/mspowerpoint", "application/powerpoint", "application/x-mspowerpoint"]],
  ["pptm", "application/vnd.ms-powerpoint.presentation.macroenabled.12"],
  ["pptx", "application/vnd.openxmlformats-officedocument.presentationml.presentation"],
  ["ppz", "application/mspowerpoint"],
  ["prc", "application/x-mobipocket-ebook"],
  ["pre", ["application/vnd.lotus-freelance", "application/x-freelance"]],
  ["prf", "application/pics-rules"],
  ["prt", "application/pro_eng"],
  ["ps", "application/postscript"],
  ["psb", "application/vnd.3gpp.pic-bw-small"],
  ["psd", ["application/octet-stream", "image/vnd.adobe.photoshop"]],
  ["psf", "application/x-font-linux-psf"],
  ["pskcxml", "application/pskc+xml"],
  ["ptid", "application/vnd.pvi.ptid1"],
  ["pub", "application/x-mspublisher"],
  ["pvb", "application/vnd.3gpp.pic-bw-var"],
  ["pvu", "paleovu/x-pv"],
  ["pwn", "application/vnd.3m.post-it-notes"],
  ["pwz", "application/vnd.ms-powerpoint"],
  ["py", "text/x-script.phyton"],
  ["pya", "audio/vnd.ms-playready.media.pya"],
  ["pyc", "application/x-bytecode.python"],
  ["pyv", "video/vnd.ms-playready.media.pyv"],
  ["qam", "application/vnd.epson.quickanime"],
  ["qbo", "application/vnd.intu.qbo"],
  ["qcp", "audio/vnd.qcelp"],
  ["qd3", "x-world/x-3dmf"],
  ["qd3d", "x-world/x-3dmf"],
  ["qfx", "application/vnd.intu.qfx"],
  ["qif", "image/x-quicktime"],
  ["qps", "application/vnd.publishare-delta-tree"],
  ["qt", "video/quicktime"],
  ["qtc", "video/x-qtc"],
  ["qti", "image/x-quicktime"],
  ["qtif", "image/x-quicktime"],
  ["qxd", "application/vnd.quark.quarkxpress"],
  ["ra", ["audio/x-realaudio", "audio/x-pn-realaudio", "audio/x-pn-realaudio-plugin"]],
  ["ram", "audio/x-pn-realaudio"],
  ["rar", "application/x-rar-compressed"],
  ["ras", ["image/cmu-raster", "application/x-cmu-raster", "image/x-cmu-raster"]],
  ["rast", "image/cmu-raster"],
  ["rcprofile", "application/vnd.ipunplugged.rcprofile"],
  ["rdf", "application/rdf+xml"],
  ["rdz", "application/vnd.data-vision.rdz"],
  ["rep", "application/vnd.businessobjects"],
  ["res", "application/x-dtbresource+xml"],
  ["rexx", "text/x-script.rexx"],
  ["rf", "image/vnd.rn-realflash"],
  ["rgb", "image/x-rgb"],
  ["rif", "application/reginfo+xml"],
  ["rip", "audio/vnd.rip"],
  ["rl", "application/resource-lists+xml"],
  ["rlc", "image/vnd.fujixerox.edmics-rlc"],
  ["rld", "application/resource-lists-diff+xml"],
  ["rm", ["application/vnd.rn-realmedia", "audio/x-pn-realaudio"]],
  ["rmi", "audio/mid"],
  ["rmm", "audio/x-pn-realaudio"],
  ["rmp", ["audio/x-pn-realaudio-plugin", "audio/x-pn-realaudio"]],
  ["rms", "application/vnd.jcp.javame.midlet-rms"],
  ["rnc", "application/relax-ng-compact-syntax"],
  ["rng", ["application/ringing-tones", "application/vnd.nokia.ringing-tone"]],
  ["rnx", "application/vnd.rn-realplayer"],
  ["roff", "application/x-troff"],
  ["rp", "image/vnd.rn-realpix"],
  ["rp9", "application/vnd.cloanto.rp9"],
  ["rpm", "audio/x-pn-realaudio-plugin"],
  ["rpss", "application/vnd.nokia.radio-presets"],
  ["rpst", "application/vnd.nokia.radio-preset"],
  ["rq", "application/sparql-query"],
  ["rs", "application/rls-services+xml"],
  ["rsd", "application/rsd+xml"],
  ["rt", ["text/richtext", "text/vnd.rn-realtext"]],
  ["rtf", ["application/rtf", "text/richtext", "application/x-rtf"]],
  ["rtx", ["text/richtext", "application/rtf"]],
  ["rv", "video/vnd.rn-realvideo"],
  ["s", "text/x-asm"],
  ["s3m", "audio/s3m"],
  ["saf", "application/vnd.yamaha.smaf-audio"],
  ["saveme", "application/octet-stream"],
  ["sbk", "application/x-tbook"],
  ["sbml", "application/sbml+xml"],
  ["sc", "application/vnd.ibm.secure-container"],
  ["scd", "application/x-msschedule"],
  [
    "scm",
    ["application/vnd.lotus-screencam", "video/x-scm", "text/x-script.guile", "application/x-lotusscreencam", "text/x-script.scheme"]
  ],
  ["scq", "application/scvp-cv-request"],
  ["scs", "application/scvp-cv-response"],
  ["sct", "text/scriptlet"],
  ["scurl", "text/vnd.curl.scurl"],
  ["sda", "application/vnd.stardivision.draw"],
  ["sdc", "application/vnd.stardivision.calc"],
  ["sdd", "application/vnd.stardivision.impress"],
  ["sdkm", "application/vnd.solent.sdkm+xml"],
  ["sdml", "text/plain"],
  ["sdp", ["application/sdp", "application/x-sdp"]],
  ["sdr", "application/sounder"],
  ["sdw", "application/vnd.stardivision.writer"],
  ["sea", ["application/sea", "application/x-sea"]],
  ["see", "application/vnd.seemail"],
  ["seed", "application/vnd.fdsn.seed"],
  ["sema", "application/vnd.sema"],
  ["semd", "application/vnd.semd"],
  ["semf", "application/vnd.semf"],
  ["ser", "application/java-serialized-object"],
  ["set", "application/set"],
  ["setpay", "application/set-payment-initiation"],
  ["setreg", "application/set-registration-initiation"],
  ["sfd-hdstx", "application/vnd.hydrostatix.sof-data"],
  ["sfs", "application/vnd.spotfire.sfs"],
  ["sgl", "application/vnd.stardivision.writer-global"],
  ["sgm", ["text/sgml", "text/x-sgml"]],
  ["sgml", ["text/sgml", "text/x-sgml"]],
  ["sh", ["application/x-shar", "application/x-bsh", "application/x-sh", "text/x-script.sh"]],
  ["shar", ["application/x-bsh", "application/x-shar"]],
  ["shf", "application/shf+xml"],
  ["shtml", ["text/html", "text/x-server-parsed-html"]],
  ["sid", "audio/x-psid"],
  ["sis", "application/vnd.symbian.install"],
  ["sit", ["application/x-stuffit", "application/x-sit"]],
  ["sitx", "application/x-stuffitx"],
  ["skd", "application/x-koan"],
  ["skm", "application/x-koan"],
  ["skp", ["application/vnd.koan", "application/x-koan"]],
  ["skt", "application/x-koan"],
  ["sl", "application/x-seelogo"],
  ["sldm", "application/vnd.ms-powerpoint.slide.macroenabled.12"],
  ["sldx", "application/vnd.openxmlformats-officedocument.presentationml.slide"],
  ["slt", "application/vnd.epson.salt"],
  ["sm", "application/vnd.stepmania.stepchart"],
  ["smf", "application/vnd.stardivision.math"],
  ["smi", ["application/smil", "application/smil+xml"]],
  ["smil", "application/smil"],
  ["snd", ["audio/basic", "audio/x-adpcm"]],
  ["snf", "application/x-font-snf"],
  ["sol", "application/solids"],
  ["spc", ["text/x-speech", "application/x-pkcs7-certificates"]],
  ["spf", "application/vnd.yamaha.smaf-phrase"],
  ["spl", ["application/futuresplash", "application/x-futuresplash"]],
  ["spot", "text/vnd.in3d.spot"],
  ["spp", "application/scvp-vp-response"],
  ["spq", "application/scvp-vp-request"],
  ["spr", "application/x-sprite"],
  ["sprite", "application/x-sprite"],
  ["src", "application/x-wais-source"],
  ["sru", "application/sru+xml"],
  ["srx", "application/sparql-results+xml"],
  ["sse", "application/vnd.kodak-descriptor"],
  ["ssf", "application/vnd.epson.ssf"],
  ["ssi", "text/x-server-parsed-html"],
  ["ssm", "application/streamingmedia"],
  ["ssml", "application/ssml+xml"],
  ["sst", ["application/vnd.ms-pkicertstore", "application/vnd.ms-pki.certstore"]],
  ["st", "application/vnd.sailingtracker.track"],
  ["stc", "application/vnd.sun.xml.calc.template"],
  ["std", "application/vnd.sun.xml.draw.template"],
  ["step", "application/step"],
  ["stf", "application/vnd.wt.stf"],
  ["sti", "application/vnd.sun.xml.impress.template"],
  ["stk", "application/hyperstudio"],
  ["stl", ["application/vnd.ms-pkistl", "application/sla", "application/vnd.ms-pki.stl", "application/x-navistyle"]],
  ["stm", "text/html"],
  ["stp", "application/step"],
  ["str", "application/vnd.pg.format"],
  ["stw", "application/vnd.sun.xml.writer.template"],
  ["sub", "image/vnd.dvb.subtitle"],
  ["sus", "application/vnd.sus-calendar"],
  ["sv4cpio", "application/x-sv4cpio"],
  ["sv4crc", "application/x-sv4crc"],
  ["svc", "application/vnd.dvb.service"],
  ["svd", "application/vnd.svd"],
  ["svf", ["image/vnd.dwg", "image/x-dwg"]],
  ["svg", "image/svg+xml"],
  ["svr", ["x-world/x-svr", "application/x-world"]],
  ["swf", "application/x-shockwave-flash"],
  ["swi", "application/vnd.aristanetworks.swi"],
  ["sxc", "application/vnd.sun.xml.calc"],
  ["sxd", "application/vnd.sun.xml.draw"],
  ["sxg", "application/vnd.sun.xml.writer.global"],
  ["sxi", "application/vnd.sun.xml.impress"],
  ["sxm", "application/vnd.sun.xml.math"],
  ["sxw", "application/vnd.sun.xml.writer"],
  ["t", ["text/troff", "application/x-troff"]],
  ["talk", "text/x-speech"],
  ["tao", "application/vnd.tao.intent-module-archive"],
  ["tar", "application/x-tar"],
  ["tbk", ["application/toolbook", "application/x-tbook"]],
  ["tcap", "application/vnd.3gpp2.tcap"],
  ["tcl", ["text/x-script.tcl", "application/x-tcl"]],
  ["tcsh", "text/x-script.tcsh"],
  ["teacher", "application/vnd.smart.teacher"],
  ["tei", "application/tei+xml"],
  ["tex", "application/x-tex"],
  ["texi", "application/x-texinfo"],
  ["texinfo", "application/x-texinfo"],
  ["text", ["application/plain", "text/plain"]],
  ["tfi", "application/thraud+xml"],
  ["tfm", "application/x-tex-tfm"],
  ["tgz", ["application/gnutar", "application/x-compressed"]],
  ["thmx", "application/vnd.ms-officetheme"],
  ["tif", ["image/tiff", "image/x-tiff"]],
  ["tiff", ["image/tiff", "image/x-tiff"]],
  ["tmo", "application/vnd.tmobile-livetv"],
  ["torrent", "application/x-bittorrent"],
  ["tpl", "application/vnd.groove-tool-template"],
  ["tpt", "application/vnd.trid.tpt"],
  ["tr", "application/x-troff"],
  ["tra", "application/vnd.trueapp"],
  ["trm", "application/x-msterminal"],
  ["tsd", "application/timestamped-data"],
  ["tsi", "audio/tsp-audio"],
  ["tsp", ["application/dsptype", "audio/tsplayer"]],
  ["tsv", "text/tab-separated-values"],
  ["ttf", "application/x-font-ttf"],
  ["ttl", "text/turtle"],
  ["turbot", "image/florian"],
  ["twd", "application/vnd.simtech-mindmapper"],
  ["txd", "application/vnd.genomatix.tuxedo"],
  ["txf", "application/vnd.mobius.txf"],
  ["txt", "text/plain"],
  ["ufd", "application/vnd.ufdl"],
  ["uil", "text/x-uil"],
  ["uls", "text/iuls"],
  ["umj", "application/vnd.umajin"],
  ["uni", "text/uri-list"],
  ["unis", "text/uri-list"],
  ["unityweb", "application/vnd.unity"],
  ["unv", "application/i-deas"],
  ["uoml", "application/vnd.uoml+xml"],
  ["uri", "text/uri-list"],
  ["uris", "text/uri-list"],
  ["ustar", ["application/x-ustar", "multipart/x-ustar"]],
  ["utz", "application/vnd.uiq.theme"],
  ["uu", ["application/octet-stream", "text/x-uuencode"]],
  ["uue", "text/x-uuencode"],
  ["uva", "audio/vnd.dece.audio"],
  ["uvh", "video/vnd.dece.hd"],
  ["uvi", "image/vnd.dece.graphic"],
  ["uvm", "video/vnd.dece.mobile"],
  ["uvp", "video/vnd.dece.pd"],
  ["uvs", "video/vnd.dece.sd"],
  ["uvu", "video/vnd.uvvu.mp4"],
  ["uvv", "video/vnd.dece.video"],
  ["vcd", "application/x-cdlink"],
  ["vcf", "text/x-vcard"],
  ["vcg", "application/vnd.groove-vcard"],
  ["vcs", "text/x-vcalendar"],
  ["vcx", "application/vnd.vcx"],
  ["vda", "application/vda"],
  ["vdo", "video/vdo"],
  ["vew", "application/groupwise"],
  ["vis", "application/vnd.visionary"],
  ["viv", ["video/vivo", "video/vnd.vivo"]],
  ["vivo", ["video/vivo", "video/vnd.vivo"]],
  ["vmd", "application/vocaltec-media-desc"],
  ["vmf", "application/vocaltec-media-file"],
  ["voc", ["audio/voc", "audio/x-voc"]],
  ["vos", "video/vosaic"],
  ["vox", "audio/voxware"],
  ["vqe", "audio/x-twinvq-plugin"],
  ["vqf", "audio/x-twinvq"],
  ["vql", "audio/x-twinvq-plugin"],
  ["vrml", ["model/vrml", "x-world/x-vrml", "application/x-vrml"]],
  ["vrt", "x-world/x-vrt"],
  ["vsd", ["application/vnd.visio", "application/x-visio"]],
  ["vsf", "application/vnd.vsf"],
  ["vst", "application/x-visio"],
  ["vsw", "application/x-visio"],
  ["vtu", "model/vnd.vtu"],
  ["vxml", "application/voicexml+xml"],
  ["w60", "application/wordperfect6.0"],
  ["w61", "application/wordperfect6.1"],
  ["w6w", "application/msword"],
  ["wad", "application/x-doom"],
  ["wav", ["audio/wav", "audio/x-wav"]],
  ["wax", "audio/x-ms-wax"],
  ["wb1", "application/x-qpro"],
  ["wbmp", "image/vnd.wap.wbmp"],
  ["wbs", "application/vnd.criticaltools.wbs+xml"],
  ["wbxml", "application/vnd.wap.wbxml"],
  ["wcm", "application/vnd.ms-works"],
  ["wdb", "application/vnd.ms-works"],
  ["web", "application/vnd.xara"],
  ["weba", "audio/webm"],
  ["webm", "video/webm"],
  ["webp", "image/webp"],
  ["wg", "application/vnd.pmi.widget"],
  ["wgt", "application/widget"],
  ["wiz", "application/msword"],
  ["wk1", "application/x-123"],
  ["wks", "application/vnd.ms-works"],
  ["wm", "video/x-ms-wm"],
  ["wma", "audio/x-ms-wma"],
  ["wmd", "application/x-ms-wmd"],
  ["wmf", ["windows/metafile", "application/x-msmetafile"]],
  ["wml", "text/vnd.wap.wml"],
  ["wmlc", "application/vnd.wap.wmlc"],
  ["wmls", "text/vnd.wap.wmlscript"],
  ["wmlsc", "application/vnd.wap.wmlscriptc"],
  ["wmv", "video/x-ms-wmv"],
  ["wmx", "video/x-ms-wmx"],
  ["wmz", "application/x-ms-wmz"],
  ["woff", "application/x-font-woff"],
  ["word", "application/msword"],
  ["wp", "application/wordperfect"],
  ["wp5", ["application/wordperfect", "application/wordperfect6.0"]],
  ["wp6", "application/wordperfect"],
  ["wpd", ["application/wordperfect", "application/vnd.wordperfect", "application/x-wpwin"]],
  ["wpl", "application/vnd.ms-wpl"],
  ["wps", "application/vnd.ms-works"],
  ["wq1", "application/x-lotus"],
  ["wqd", "application/vnd.wqd"],
  ["wri", ["application/mswrite", "application/x-wri", "application/x-mswrite"]],
  ["wrl", ["model/vrml", "x-world/x-vrml", "application/x-world"]],
  ["wrz", ["model/vrml", "x-world/x-vrml"]],
  ["wsc", "text/scriplet"],
  ["wsdl", "application/wsdl+xml"],
  ["wspolicy", "application/wspolicy+xml"],
  ["wsrc", "application/x-wais-source"],
  ["wtb", "application/vnd.webturbo"],
  ["wtk", "application/x-wintalk"],
  ["wvx", "video/x-ms-wvx"],
  ["x-png", "image/png"],
  ["x3d", "application/vnd.hzn-3d-crossword"],
  ["xaf", "x-world/x-vrml"],
  ["xap", "application/x-silverlight-app"],
  ["xar", "application/vnd.xara"],
  ["xbap", "application/x-ms-xbap"],
  ["xbd", "application/vnd.fujixerox.docuworks.binder"],
  ["xbm", ["image/xbm", "image/x-xbm", "image/x-xbitmap"]],
  ["xdf", "application/xcap-diff+xml"],
  ["xdm", "application/vnd.syncml.dm+xml"],
  ["xdp", "application/vnd.adobe.xdp+xml"],
  ["xdr", "video/x-amt-demorun"],
  ["xdssc", "application/dssc+xml"],
  ["xdw", "application/vnd.fujixerox.docuworks"],
  ["xenc", "application/xenc+xml"],
  ["xer", "application/patch-ops-error+xml"],
  ["xfdf", "application/vnd.adobe.xfdf"],
  ["xfdl", "application/vnd.xfdl"],
  ["xgz", "xgl/drawing"],
  ["xhtml", "application/xhtml+xml"],
  ["xif", "image/vnd.xiff"],
  ["xl", "application/excel"],
  ["xla", ["application/vnd.ms-excel", "application/excel", "application/x-msexcel", "application/x-excel"]],
  ["xlam", "application/vnd.ms-excel.addin.macroenabled.12"],
  ["xlb", ["application/excel", "application/vnd.ms-excel", "application/x-excel"]],
  ["xlc", ["application/vnd.ms-excel", "application/excel", "application/x-excel"]],
  ["xld", ["application/excel", "application/x-excel"]],
  ["xlk", ["application/excel", "application/x-excel"]],
  ["xll", ["application/excel", "application/vnd.ms-excel", "application/x-excel"]],
  ["xlm", ["application/vnd.ms-excel", "application/excel", "application/x-excel"]],
  ["xls", ["application/vnd.ms-excel", "application/excel", "application/x-msexcel", "application/x-excel"]],
  ["xlsb", "application/vnd.ms-excel.sheet.binary.macroenabled.12"],
  ["xlsm", "application/vnd.ms-excel.sheet.macroenabled.12"],
  ["xlsx", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"],
  ["xlt", ["application/vnd.ms-excel", "application/excel", "application/x-excel"]],
  ["xltm", "application/vnd.ms-excel.template.macroenabled.12"],
  ["xltx", "application/vnd.openxmlformats-officedocument.spreadsheetml.template"],
  ["xlv", ["application/excel", "application/x-excel"]],
  ["xlw", ["application/vnd.ms-excel", "application/excel", "application/x-msexcel", "application/x-excel"]],
  ["xm", "audio/xm"],
  ["xml", ["application/xml", "text/xml", "application/atom+xml", "application/rss+xml"]],
  ["xmz", "xgl/movie"],
  ["xo", "application/vnd.olpc-sugar"],
  ["xof", "x-world/x-vrml"],
  ["xop", "application/xop+xml"],
  ["xpi", "application/x-xpinstall"],
  ["xpix", "application/x-vnd.ls-xpix"],
  ["xpm", ["image/xpm", "image/x-xpixmap"]],
  ["xpr", "application/vnd.is-xpr"],
  ["xps", "application/vnd.ms-xpsdocument"],
  ["xpw", "application/vnd.intercon.formnet"],
  ["xslt", "application/xslt+xml"],
  ["xsm", "application/vnd.syncml+xml"],
  ["xspf", "application/xspf+xml"],
  ["xsr", "video/x-amt-showrun"],
  ["xul", "application/vnd.mozilla.xul+xml"],
  ["xwd", ["image/x-xwd", "image/x-xwindowdump"]],
  ["xyz", ["chemical/x-xyz", "chemical/x-pdb"]],
  ["yang", "application/yang"],
  ["yin", "application/yin+xml"],
  ["z", ["application/x-compressed", "application/x-compress"]],
  ["zaz", "application/vnd.zzazz.deck+xml"],
  ["zip", ["application/zip", "multipart/x-zip", "application/x-zip-compressed", "application/x-compressed"]],
  ["zir", "application/vnd.zul"],
  ["zmm", "application/vnd.handheld-entertainment+xml"],
  ["zoo", "application/octet-stream"],
  ["zsh", "text/x-script.zsh"]
]);
function detectMimeType(filename) {
  if (!filename) {
    return defaultMimeType;
  }
  const parsed = path.parse(filename);
  const extension = (parsed.ext.substr(1) || parsed.name || "").split("?").shift().trim().toLowerCase();
  const value = extensions.has(extension) ? extensions.get(extension) : defaultMimeType;
  if (Array.isArray(value)) {
    return value[0];
  }
  return value;
}
function detectExtension(mimeType) {
  if (!mimeType) {
    return defaultExtension;
  }
  const parts = mimeType.toLowerCase().trim().split("/");
  const rootType = parts.shift().trim();
  const subType = parts.join("/").trim();
  if (mimeTypes.has(rootType + "/" + subType)) {
    const value = mimeTypes.get(rootType + "/" + subType);
    if (Array.isArray(value)) {
      return value[0];
    }
    return value;
  }
  switch (rootType) {
    case "text":
      return "txt";
    default:
      return "bin";
  }
}

// node_modules/nodemailer/dist/esm/mime-node/index.js
import crypto from "node:crypto";
import fs2 from "node:fs";
import { PassThrough as PassThrough2, finished as finished2, pipeline } from "node:stream";
import urlModule from "node:url";

// node_modules/nodemailer/dist/esm/base64/index.js
import { Transform } from "node:stream";
function encode2(buffer) {
  if (typeof buffer === "string") {
    buffer = Buffer.from(buffer, "utf-8");
  }
  return buffer.toString("base64");
}
function normalizeLineLength(lineLength) {
  const length = Math.floor(Number(lineLength));
  return Number.isFinite(length) && length >= 1 ? length : 76;
}
function wrapBuffer(src, lineLength, final) {
  const lines = Math.ceil(src.length / lineLength);
  const complete = Math.max(lines - 1, 0);
  let rest = src.length - complete * lineLength;
  const output = Buffer.allocUnsafe(complete * (lineLength + 2) + (final ? rest : 0));
  let to = 0;
  for (let from = 0; from < complete * lineLength; from += lineLength) {
    src.copy(output, to, from, from + lineLength);
    to += lineLength;
    output[to++] = 13;
    output[to++] = 10;
  }
  if (final) {
    to += src.copy(output, to, complete * lineLength);
    rest = 0;
  }
  if (to !== output.length) {
    throw new Error("Unexpected wrapped length");
  }
  return { output, rest };
}
var Encoder = class extends Transform {
  constructor(options) {
    super();
    this.options = options || {};
    if (this.options.lineLength !== false) {
      this.options.lineLength = normalizeLineLength(this.options.lineLength);
    }
    this._curLine = "";
    this._remainingBytes = false;
    this.inputBytes = 0;
    this.outputBytes = 0;
  }
  /**
   * Emits the encoded characters `b64` that follow the current line, keeping what can not be
   * emitted yet as the new current line
   *
   * @internal
   */
  _emit(b64, final) {
    const src = Buffer.from(this._curLine + b64, "latin1");
    if (!src.length) {
      return;
    }
    let output = src;
    if (this.options.lineLength) {
      const wrapped = wrapBuffer(src, this.options.lineLength, final);
      output = wrapped.output;
      this._curLine = wrapped.rest ? src.toString("latin1", src.length - wrapped.rest) : "";
    } else {
      this._curLine = "";
    }
    if (output.length) {
      this.outputBytes += output.length;
      this.push(output);
    }
  }
  /** @internal */
  _transform(chunk, encoding, done) {
    let buf = encoding !== "buffer" ? Buffer.from(chunk, encoding) : chunk;
    if (!buf || !buf.length) {
      return done();
    }
    this.inputBytes += buf.length;
    if (this._remainingBytes) {
      buf = Buffer.concat([this._remainingBytes, buf], this._remainingBytes.length + buf.length);
      this._remainingBytes = false;
    }
    const extra = buf.length % 3;
    if (extra) {
      this._remainingBytes = buf.subarray(buf.length - extra);
      buf = buf.subarray(0, buf.length - extra);
    }
    this._emit(encode2(buf), false);
    done();
  }
  /** @internal */
  _flush(done) {
    this._emit(this._remainingBytes ? encode2(this._remainingBytes) : "", true);
    this._remainingBytes = false;
    done();
  }
};

// node_modules/nodemailer/dist/esm/qp/index.js
import { Transform as Transform2 } from "node:stream";
var MIN_LINE_LENGTH = 4;
var QP_RANGES = [
  [9],
  // <TAB>
  [10],
  // <LF>
  [13],
  // <CR>
  [32, 60],
  // <SP>!"#$%&'()*+,-./0123456789:;
  [62, 126]
  // >?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\]^_`abcdefghijklmnopqrstuvwxyz{|}
];
var QP_LITERAL = new Uint8Array(256);
for (let i = 0; i < 256; i++) {
  QP_LITERAL[i] = checkRanges(i, QP_RANGES) ? 1 : 0;
}
var HEX_DIGITS = Buffer.from("0123456789ABCDEF", "latin1");
var isWhitespace = (c) => c === 32 || c === 9;
function encode3(buffer) {
  return encodeBytes(typeof buffer === "string" ? Buffer.from(buffer, "utf-8") : buffer);
}
function encodeBytes(buffer, next, binary, previous) {
  const len = buffer.length;
  const output = Buffer.allocUnsafe(len * 3);
  let pos = 0;
  for (let i = 0; i < len; i++) {
    const ord = buffer[i];
    const following = i + 1 < len ? buffer[i + 1] : next;
    const lineBreakByte = binary && (ord === 13 || ord === 10) ? ord === 13 ? following === 10 : (i > 0 ? buffer[i - 1] : previous) === 13 : true;
    if (QP_LITERAL[ord] && lineBreakByte && !(isWhitespace(ord) && (following === void 0 || following === 10 || following === 13))) {
      output[pos++] = ord;
      continue;
    }
    output[pos++] = 61;
    output[pos++] = HEX_DIGITS[Math.floor(ord / 16)];
    output[pos++] = HEX_DIGITS[ord % 16];
  }
  return output.toString("latin1", 0, pos);
}
function wrap(str, lineLength) {
  str = (str || "").toString();
  lineLength = Math.max(Number(lineLength) || 76, MIN_LINE_LENGTH);
  if (str.length <= lineLength) {
    return str;
  }
  let pos = 0;
  const len = str.length;
  let match, code, line;
  const lineMargin = Math.floor(lineLength / 3);
  let result = "";
  while (pos < len) {
    line = str.substr(pos, lineLength);
    if (match = line.match(/\r\n/)) {
      line = line.substr(0, match.index + match[0].length);
      result += line;
      pos += line.length;
      continue;
    }
    if (line.substr(-1) === "\n") {
      result += line;
      pos += line.length;
      continue;
    }
    if (match = line.substr(-lineMargin).match(/\n.*?$/)) {
      line = line.substr(0, line.length - (match[0].length - 1));
      result += line;
      pos += line.length;
      continue;
    }
    if (line.length > lineLength - lineMargin && (match = line.substr(-lineMargin).match(/[ \t.,!?][^ \t.,!?]*$/))) {
      line = line.substr(0, line.length - (match[0].length - 1));
    } else if (line.match(/[=][\da-f]{0,2}$/i)) {
      if (match = line.match(/[=][\da-f]{0,1}$/i)) {
        line = line.substr(0, line.length - match[0].length);
      }
      while (line.length > 3 && line.length < len - pos && !line.match(/^(?:=[\da-f]{2}){1,4}$/i) && (match = line.match(/[=][\da-f]{2}$/gi))) {
        code = parseInt(match[0].substr(1, 2), 16);
        if (code < 128) {
          break;
        }
        line = line.substr(0, line.length - 3);
        if (code >= 192) {
          break;
        }
      }
    }
    if (!line.length) {
      line = str.substr(pos, lineLength);
    }
    if (pos + line.length < len && line.substr(-1) !== "\n") {
      if (line.length === lineLength && line.match(/[=][\da-f]{2}$/i)) {
        line = line.substr(0, line.length - 3);
      } else if (line.length === lineLength) {
        line = line.substr(0, line.length - 1);
      }
      pos += line.length;
      line += "=\r\n";
    } else {
      pos += line.length;
    }
    result += line;
  }
  return result;
}
function checkRanges(nr, ranges) {
  for (let i = ranges.length - 1; i >= 0; i--) {
    const range = ranges[i];
    if (!range.length) {
      continue;
    }
    if (range.length === 1 && nr === range[0]) {
      return true;
    }
    if (range.length === 2 && nr >= range[0] && nr <= range[1]) {
      return true;
    }
  }
  return false;
}
var ENCODE_SLICE_SIZE = 64 * 1024;
var Encoder2 = class extends Transform2 {
  constructor(options) {
    super();
    this.options = options || {};
    if (this.options.lineLength !== false) {
      this.options.lineLength = this.options.lineLength || 76;
    }
    this._curLine = "";
    this._remainingBytes = false;
    this._lastByte = void 0;
    this.inputBytes = 0;
    this.outputBytes = 0;
  }
  /** @internal */
  _transform(chunk, encoding, done) {
    let buf = encoding !== "buffer" ? Buffer.from(chunk, encoding) : chunk;
    if (!buf || !buf.length) {
      return done();
    }
    this.inputBytes += buf.length;
    if (this._remainingBytes) {
      buf = Buffer.concat([this._remainingBytes, buf], this._remainingBytes.length + buf.length);
      this._remainingBytes = false;
    }
    let end = buf.length;
    while (end > 0 && (isWhitespace(buf[end - 1]) || this.options.binary && buf[end - 1] === 13)) {
      end--;
    }
    if (buf.length - end <= ENCODE_SLICE_SIZE) {
      this._remainingBytes = end < buf.length ? Buffer.from(buf.subarray(end)) : false;
      buf = buf.subarray(0, end);
    }
    this._encodeSlices(buf);
    done();
  }
  /** @internal */
  _flush(done) {
    if (this._remainingBytes) {
      this._encodeSlices(this._remainingBytes);
      this._remainingBytes = false;
    }
    if (this._curLine) {
      this.outputBytes += this._curLine.length;
      this.push(this._curLine, "ascii");
      this._curLine = "";
    }
    done();
  }
  /**
   * Encodes the input in slices of ENCODE_SLICE_SIZE bytes. Each slice is told the byte that
   * follows it, so a slice that ends in whitespace is encoded as if it was not split
   *
   * @internal
   */
  _encodeSlices(buf) {
    for (let start = 0; start < buf.length; start += ENCODE_SLICE_SIZE) {
      const end = Math.min(start + ENCODE_SLICE_SIZE, buf.length);
      this._encodeSlice(buf.subarray(start, end), end < buf.length ? buf[end] : void 0);
      this._lastByte = buf[end - 1];
    }
  }
  /** @internal */
  _encodeSlice(buf, next) {
    let qp;
    if (this.options.lineLength) {
      qp = wrap(this._curLine + encodeBytes(buf, next, this.options.binary, this._lastByte), this.options.lineLength);
      const lastLF = qp.lastIndexOf("\n");
      this._curLine = qp.substring(lastLF + 1);
      qp = qp.substring(0, lastLF + 1);
      if (qp) {
        this.outputBytes += qp.length;
        this.push(qp, "ascii");
      }
    } else {
      qp = encodeBytes(buf, next, this.options.binary, this._lastByte);
      this.outputBytes += qp.length;
      this.push(qp, "ascii");
    }
  }
};

// node_modules/nodemailer/dist/esm/mime-funcs/index.js
function isPlainText(value, isParam) {
  const re = isParam ? /[\x00-\x1f\x7f"\u0080-\uFFFF]/ : /[\x00-\x08\x0b\x0c\x0e-\x1f\u0080-\uFFFF]/;
  return typeof value === "string" && !re.test(value);
}
function quoteString(value) {
  return '"' + (value || "").toString().replace(/["\\]/g, "\\$&") + '"';
}
function hasLongerLines(str, lineLength) {
  if (str.length > 128 * 1024) {
    return true;
  }
  return new RegExp("^.{" + (lineLength + 1) + ",}", "m").test(str);
}
function encodeWord(data, mimeWordEncoding, maxLength) {
  mimeWordEncoding = (mimeWordEncoding || "Q").toString().toUpperCase().trim().charAt(0);
  maxLength = maxLength || 0;
  let encodedStr;
  const toCharset = "UTF-8";
  if (maxLength && maxLength > 7 + toCharset.length) {
    maxLength -= 7 + toCharset.length;
  }
  if (mimeWordEncoding === "Q") {
    encodedStr = encode3(data).replace(/[^a-z0-9!*+\-/=]/gi, (chr) => {
      const ord = chr.charCodeAt(0).toString(16).toUpperCase();
      if (chr === " ") {
        return "_";
      }
      return "=" + (ord.length === 1 ? "0" + ord : ord);
    });
  } else if (mimeWordEncoding === "B") {
    encodedStr = typeof data === "string" ? data : data.toString("utf-8");
    maxLength = maxLength ? Math.max(3, (maxLength - maxLength % 4) / 4 * 3) : 0;
  }
  if (maxLength && (mimeWordEncoding !== "B" ? encodedStr : encode2(data)).length > maxLength) {
    if (mimeWordEncoding === "Q") {
      encodedStr = splitMimeEncodedString(encodedStr, maxLength).join("?= =?" + toCharset + "?" + mimeWordEncoding + "?");
    } else {
      const parts = [];
      let lpart = "";
      for (let i = 0, len = encodedStr.length; i < len; i++) {
        let chr = encodedStr.charAt(i);
        if (/[\ud800-\udbff]/.test(chr) && /[\udc00-\udfff]/.test(encodedStr.charAt(i + 1))) {
          chr += encodedStr.charAt(++i);
        }
        if (Buffer.byteLength(lpart + chr) <= maxLength || i === 0) {
          lpart += chr;
        } else {
          parts.push(encode2(lpart));
          lpart = chr;
        }
      }
      if (lpart) {
        parts.push(encode2(lpart));
      }
      if (parts.length > 1) {
        encodedStr = parts.join("?= =?" + toCharset + "?" + mimeWordEncoding + "?");
      } else {
        encodedStr = parts.join("");
      }
    }
  } else if (mimeWordEncoding === "B") {
    encodedStr = encode2(data);
  }
  return "=?" + toCharset + "?" + mimeWordEncoding + "?" + encodedStr + (encodedStr.substr(-2) === "?=" ? "" : "?=");
}
function encodeWords(value, mimeWordEncoding, maxLength, encodeAll) {
  maxLength = maxLength || 0;
  const firstMatch = value.match(/(?:^|\s)([^\s]*["\u0080-\uFFFF])/);
  if (!firstMatch) {
    return value;
  }
  if (encodeAll) {
    return encodeWord(value, mimeWordEncoding, maxLength);
  }
  const lastMatch = value.match(/(["\u0080-\uFFFF][^\s]*)[^"\u0080-\uFFFF]*$/);
  if (!lastMatch) {
    return value;
  }
  const startIndex = firstMatch.index + (firstMatch[0].match(/[^\s]/) || {
    index: 0
  }).index;
  const endIndex = lastMatch.index + (lastMatch[1] || "").length;
  return (startIndex ? value.substr(0, startIndex) : "") + encodeWord(value.substring(startIndex, endIndex), mimeWordEncoding || "Q", maxLength) + (endIndex < value.length ? value.substr(endIndex) : "");
}
function buildHeaderValue(structured) {
  const paramsArray = [];
  Object.keys(structured.params || {}).forEach((key) => {
    const value2 = structured.params[key];
    const param = key.replace(/[\x00-\x1f\x7f]/g, "");
    if (!isPlainText(value2, true) || value2.length >= 75) {
      buildHeaderParam(param, value2, 50).forEach((encodedParam) => {
        if (!/[\s"\\;:/=(),<>@[\]?]|^[-']|'$/.test(encodedParam.value) || encodedParam.key.substr(-1) === "*") {
          paramsArray.push(encodedParam.key + "=" + encodedParam.value);
        } else {
          paramsArray.push(encodedParam.key + "=" + JSON.stringify(encodedParam.value));
        }
      });
    } else if (!value2.length || /[\s'"\\;:/=(),<>@[\]?]|^-/.test(value2)) {
      paramsArray.push(param + "=" + JSON.stringify(value2));
    } else {
      paramsArray.push(param + "=" + value2);
    }
  });
  const value = typeof structured.value === "string" ? structured.value.replace(/[\x00-\x1f\x7f]/g, "") : structured.value;
  return value + (paramsArray.length ? "; " + paramsArray.join("; ") : "");
}
function buildHeaderParam(key, data, maxLength) {
  const list = [];
  let encodedStr = typeof data === "string" ? data : (data || "").toString();
  let chr;
  let line;
  let startPos = 0;
  let i, len;
  maxLength = maxLength || 50;
  if (isPlainText(data, true)) {
    if (encodedStr.length <= maxLength) {
      return [
        {
          key,
          value: encodedStr
        }
      ];
    }
    encodedStr = encodedStr.replace(new RegExp(".{" + maxLength + "}", "g"), (str) => {
      list.push({
        line: str
      });
      return "";
    });
    if (encodedStr) {
      list.push({
        line: encodedStr
      });
    }
  } else {
    if (/[\uD800-\uDBFF]/.test(encodedStr)) {
      const encodedStrArr = [];
      for (i = 0, len = encodedStr.length; i < len; i++) {
        chr = encodedStr.charAt(i);
        if (/[\ud800-\udbff]/.test(chr) && /[\udc00-\udfff]/.test(encodedStr.charAt(i + 1))) {
          chr += encodedStr.charAt(i + 1);
          encodedStrArr.push(chr);
          i++;
        } else {
          encodedStrArr.push(chr);
        }
      }
      encodedStr = encodedStrArr;
    }
    line = "utf-8''";
    let encoded = true;
    startPos = 0;
    for (i = 0, len = encodedStr.length; i < len; i++) {
      chr = encodedStr[i];
      if (encoded) {
        chr = safeEncodeURIComponent(chr);
      } else {
        chr = chr === " " ? chr : safeEncodeURIComponent(chr);
        if (chr !== encodedStr[i]) {
          if ((safeEncodeURIComponent(line) + chr).length >= maxLength) {
            list.push({
              line,
              encoded
            });
            line = "";
            encoded = true;
          } else {
            encoded = true;
            i = startPos;
            line = "";
            continue;
          }
        }
      }
      if ((line + chr).length >= maxLength) {
        list.push({
          line,
          encoded
        });
        line = chr = encodedStr[i] === " " ? " " : safeEncodeURIComponent(encodedStr[i]);
        if (chr === encodedStr[i]) {
          encoded = false;
          startPos = i - 1;
        } else {
          encoded = true;
        }
      } else {
        line += chr;
      }
    }
    if (line) {
      list.push({
        line,
        encoded
      });
    }
  }
  return list.map((item, i2) => ({
    // encoded lines: {name}*{part}*
    // unencoded lines: {name}*{part}
    // if any line needs to be encoded then the first line (part==0) is always encoded
    key: key + "*" + i2 + (item.encoded ? "*" : ""),
    value: item.line
  }));
}
var TOKEN = /^[^\x00-\x20\x7f()<>@,;:\\"/[\]?=]+$/;
function _isParamName(name2) {
  return !!name2 && !isProtoKey(name2);
}
function parseHeaderValue(str) {
  const response = {
    value: "",
    params: {}
  };
  const setParam = (name2, value2) => {
    name2 = name2.toLowerCase();
    if (_isParamName(name2) && !Object.prototype.hasOwnProperty.call(response.params, name2)) {
      response.params[name2] = value2;
    }
  };
  let key = false;
  let value = "";
  let stage = "value";
  let quote = false;
  let escaped = false;
  let chr;
  let pendingSpace = "";
  let quoteClosed = false;
  const flushSpace = () => {
    if (value.length) {
      value += pendingSpace;
    }
    pendingSpace = "";
  };
  const addChr = (c) => {
    flushSpace();
    value += c;
  };
  const takeValue = () => {
    const taken = value;
    value = "";
    pendingSpace = "";
    quoteClosed = false;
    return taken;
  };
  const storeValue = () => {
    const taken = takeValue();
    if (key === false) {
      response.value = taken;
    } else {
      setParam(key, taken);
    }
  };
  const storeEmptyKey = () => {
    setParam(takeValue().trim(), "");
  };
  for (let i = 0, len = str.length; i < len; i++) {
    chr = str.charAt(i);
    if (stage === "key") {
      if (chr === "=") {
        key = takeValue().trim();
        stage = "value";
        continue;
      }
      if (chr === ";") {
        storeEmptyKey();
        continue;
      }
      value += chr;
    } else {
      if (quoteClosed && chr !== ";") {
        escaped = false;
        continue;
      }
      if (escaped) {
        addChr(chr);
      } else if (quote && chr === "\\") {
        escaped = true;
        continue;
      } else if (quote && chr === quote) {
        quote = false;
        quoteClosed = true;
      } else if (!quote && chr === '"') {
        quote = chr;
        flushSpace();
      } else if (!quote && chr === ";") {
        storeValue();
        stage = "key";
      } else if (!quote && (chr === " " || chr === "	")) {
        pendingSpace += chr;
      } else {
        addChr(chr);
      }
      escaped = false;
    }
  }
  if (stage === "value") {
    storeValue();
  } else {
    storeEmptyKey();
  }
  const continuations = /* @__PURE__ */ new Map();
  Object.keys(response.params).forEach((key2) => {
    const match = key2.match(/(\*(\d+)|\*(\d+)\*|\*)$/);
    if (!match) {
      return;
    }
    const actualKey = key2.substr(0, match.index);
    const nr = Number(match[2] || match[3]) || 0;
    const encoded = match[0].substr(-1) === "*";
    let value2 = response.params[key2];
    delete response.params[key2];
    if (!_isParamName(actualKey)) {
      return;
    }
    let continuation = continuations.get(actualKey);
    if (!continuation) {
      continuation = { charset: false, sections: [] };
      continuations.set(actualKey, continuation);
    }
    const charsetMatch = nr === 0 && encoded ? value2.match(/^([^']*)'[^']*'(.*)$/) : null;
    if (charsetMatch) {
      continuation.charset = TOKEN.test(charsetMatch[1]) ? charsetMatch[1] : "iso-8859-1";
      value2 = charsetMatch[2];
    }
    continuation.sections.push({ nr, value: value2, encoded });
  });
  continuations.forEach((continuation, key2) => {
    if (Object.prototype.hasOwnProperty.call(response.params, key2)) {
      return;
    }
    continuation.sections.sort((a, b) => a.nr - b.nr);
    if (!continuation.charset) {
      response.params[key2] = continuation.sections.map((section) => section.value).join("");
      return;
    }
    response.params[key2] = "=?" + continuation.charset + "?Q?" + continuation.sections.map(_encodeContinuationSection).join("") + "?=";
  });
  return response;
}
function _encodeContinuationSection(section) {
  const specials = section.encoded ? /[=?_\s]/g : /[=?_\s%]/g;
  return section.value.replace(specials, (s) => {
    const c = s.charCodeAt(0).toString(16);
    if (s === " ") {
      return "_";
    }
    return "%" + (c.length < 2 ? "0" : "") + c;
  }).replace(/%/g, "=");
}
function detectExtension2(mimeType) {
  return detectExtension(mimeType);
}
function detectMimeType2(extension) {
  return detectMimeType(extension);
}
function foldLines2(str, lineLength, afterSpace) {
  str = (str || "").toString();
  lineLength = lineLength || 76;
  let pos = 0;
  const len = str.length;
  let result = "";
  let line, match;
  while (pos < len) {
    line = str.substr(pos, lineLength);
    if (line.length < lineLength) {
      result += line;
      break;
    }
    if (match = line.match(/^[^\n\r]*(\r?\n|\r)/)) {
      line = match[0];
      result += line;
      pos += line.length;
      continue;
    } else if ((match = line.match(/(\s+)[^\s]*$/)) && match[0].length - (afterSpace ? (match[1] || "").length : 0) < line.length) {
      line = line.substr(0, line.length - (match[0].length - (afterSpace ? (match[1] || "").length : 0)));
    } else if (match = str.substr(pos + line.length).match(/^[^\s]+(\s*)/)) {
      line = line + match[0].substr(0, match[0].length - (!afterSpace ? (match[1] || "").length : 0));
    }
    result += line;
    pos += line.length;
    if (pos < len) {
      result += "\r\n";
    }
  }
  return result;
}
function splitMimeEncodedString(str, maxlen) {
  const lines = [];
  let curLine, fallbackLine, match, chr, done;
  maxlen = Math.max(maxlen || 0, 12);
  while (str.length) {
    curLine = str.substr(0, maxlen);
    if (match = curLine.match(/[=][0-9A-F]?$/i)) {
      curLine = curLine.substr(0, match.index);
    }
    fallbackLine = curLine.length ? curLine : str.substr(0, maxlen);
    done = false;
    while (!done && curLine.length) {
      done = true;
      if (match = str.substr(curLine.length).match(/^[=]([0-9A-F]{2})/i)) {
        chr = parseInt(match[1], 16);
        if (chr < 194 && chr > 127) {
          curLine = curLine.substr(0, curLine.length - 3);
          done = false;
        }
      }
    }
    if (!curLine.length) {
      curLine = fallbackLine;
    }
    lines.push(curLine);
    str = str.substr(curLine.length);
  }
  return lines;
}
function encodeURICharComponent(chr) {
  let res = "";
  let ord = chr.charCodeAt(0).toString(16).toUpperCase();
  if (ord.length % 2) {
    ord = "0" + ord;
  }
  if (ord.length > 2) {
    for (let i = 0, len = ord.length / 2; i < len; i++) {
      res += "%" + ord.substr(i, 2);
    }
  } else {
    res += "%" + ord;
  }
  return res;
}
function safeEncodeURIComponent(str) {
  str = (str || "").toString();
  try {
    str = encodeURIComponent(str);
  } catch (_E) {
    str = encodeURIComponent(Buffer.from(str, "utf-8").toString("utf-8"));
  }
  return str.replace(/[\x00-\x1F *'()<>@,;:\\"[\]?=\u007F-\uFFFF]/g, (chr) => encodeURICharComponent(chr));
}

// node_modules/nodemailer/dist/esm/addressparser/index.js
function _quoteLocalPart(address) {
  const lastAt = address.lastIndexOf("@");
  if (lastAt < 0) {
    return address;
  }
  const user = address.substr(0, lastAt);
  if (/^[^\s"(),:;<>@[\\\]]+$/.test(user) || /^"(?:[^"\\]|\\[\s\S])*"$/.test(user)) {
    return address;
  }
  return '"' + user.replace(/["\\]/g, "\\$&") + '"@' + address.substr(lastAt + 1);
}
var HAS_WHITESPACE = /\s/;
var QUOTED_LOCAL_ADDR = /^("(?:[^"\\]|\\[\s\S])*"@\S+)(?:\s+([\s\S]+))?$/;
var ADDR_SPEC = /^[^@\s]+@[^@\s]+$/;
var LOOSE_ADDR_SPEC = /^[^@\s]+@\S+$/;
var LOOSE_TEXT_ADDR = /\s*\b[^@\s]+@[^\s]+\b\s*/y;
function _isSpaceCode(code) {
  return code === 32 || code >= 9 && code <= 13 || code === 160 || code === 5760 || code >= 8192 && code <= 8202 || code === 8232 || code === 8233 || code === 8239 || code === 8287 || code === 12288 || code === 65279;
}
function _isWordCode(code) {
  return code >= 48 && code <= 57 || code >= 65 && code <= 90 || code >= 97 && code <= 122 || code === 95;
}
function _isBoundary(text, at) {
  return _isWordCode(text.charCodeAt(at - 1)) !== _isWordCode(text.charCodeAt(at));
}
function _indexOfAt(text, from, to) {
  for (let i = from; i < to; i++) {
    if (text.charCodeAt(i) === 64) {
      return i;
    }
  }
  return -1;
}
function _looseAddressStart(text) {
  const len = text.length;
  let pos = 0;
  while (pos < len) {
    while (pos < len && _isSpaceCode(text.charCodeAt(pos))) {
      pos++;
    }
    if (pos >= len) {
      break;
    }
    const runStart = pos;
    let runEnd = pos;
    while (runEnd < len && !_isSpaceCode(text.charCodeAt(runEnd))) {
      runEnd++;
    }
    let at = _indexOfAt(text, runStart, runEnd);
    if (at >= 0) {
      let lastBoundary = -1;
      for (let k = runEnd; k > runStart; k--) {
        if (_isBoundary(text, k)) {
          lastBoundary = k;
          break;
        }
      }
      let atomStart = runStart;
      while (lastBoundary >= 0 && at >= 0) {
        if (at > atomStart && runEnd > at + 1 && lastBoundary > at + 1) {
          for (let start = atomStart; start < at; start++) {
            if (_isBoundary(text, start)) {
              if (start > runStart) {
                return start;
              }
              let padded = runStart;
              while (padded > 0 && _isSpaceCode(text.charCodeAt(padded - 1))) {
                padded--;
              }
              return padded;
            }
          }
        }
        atomStart = at + 1;
        at = _indexOfAt(text, atomStart, runEnd);
      }
    }
    pos = runEnd;
  }
  return -1;
}
function _recoverAddrSpec(data) {
  if (!HAS_WHITESPACE.test(data.address)) {
    return;
  }
  let address;
  let rest;
  const quoted = data.address.match(QUOTED_LOCAL_ADDR);
  if (quoted) {
    if (!quoted[2]) {
      return;
    }
    address = quoted[1];
    rest = [quoted[2]];
  } else {
    if (data.address.indexOf('"') >= 0) {
      return;
    }
    const parts = data.address.split(/\s+/);
    let addrIndex = parts.findIndex((part) => ADDR_SPEC.test(part));
    if (addrIndex < 0) {
      addrIndex = parts.findIndex((part) => LOOSE_ADDR_SPEC.test(part));
    }
    if (addrIndex < 0) {
      return;
    }
    address = parts.splice(addrIndex, 1)[0];
    rest = parts;
  }
  data.address = address;
  data.text = [data.text].concat(rest).filter((part) => part).join(" ");
}
function _stripAddressComments(address) {
  const comments = [];
  let result = "";
  let comment = "";
  let depth = 0;
  let closer = "";
  let lastChar = "";
  for (let i = 0, len = address.length; i < len; i++) {
    const chr = address.charAt(i);
    if (depth) {
      if (chr === "\\" && i < len - 1) {
        comment += address.charAt(++i);
      } else if (chr === "(") {
        depth++;
        comment += chr;
      } else if (chr === ")" && !--depth) {
        comments.push(comment.trim());
        comment = "";
        if (lastChar !== "@" && address.charAt(i + 1) !== "@") {
          result += " ";
          lastChar = " ";
        }
      } else {
        comment += chr;
      }
      continue;
    }
    if (closer) {
      if (chr === "\\" && closer === '"' && i < len - 1) {
        result += chr + address.charAt(++i);
        lastChar = address.charAt(i);
        continue;
      }
      if (chr === closer) {
        closer = "";
      }
    } else if (chr === '"') {
      closer = '"';
    } else if (chr === "[") {
      closer = "]";
    } else if (chr === "(") {
      depth = 1;
      continue;
    }
    result += chr;
    lastChar = chr;
  }
  if (depth) {
    comments.push(comment.trim());
  }
  return { address: result.trim(), comments: comments.filter((text) => text) };
}
function _handleAddress2(tokens, depth) {
  let isGroup = false;
  let state = "text";
  const addresses = [];
  const data = {
    address: [],
    comment: [],
    group: [],
    text: [],
    textWasQuoted: []
  };
  let insideQuotes = false;
  const lastChars = { address: "", comment: "", group: "", text: "" };
  for (let i = 0, len = tokens.length; i < len; i++) {
    const token = tokens[i];
    const prevToken = i ? tokens[i - 1] : null;
    if (token.type === "operator") {
      switch (token.value) {
        case "<":
          state = "address";
          insideQuotes = false;
          break;
        case "(":
          state = "comment";
          insideQuotes = false;
          break;
        case ":":
          state = "group";
          isGroup = true;
          insideQuotes = false;
          break;
        case '"':
          insideQuotes = !insideQuotes;
          state = "text";
          break;
        default:
          state = "text";
          insideQuotes = false;
          break;
      }
    } else if (token.value) {
      const prevPrevToken = i > 1 ? tokens[i - 2] : null;
      const opensAfterEmptyQuotedString = prevToken?.type === "operator" && prevToken.value === '"' && !!prevToken.noBreak && prevPrevToken?.type === "operator" && prevPrevToken.value === '"';
      if (state === "address") {
        token.value = token.value.replace(/^[^<]*<\s*/, "");
      }
      const parts = data[state];
      const joins = prevToken && prevToken.noBreak && parts.length && (prevToken.value !== ")" || lastChars[state] === "@" || token.value.charAt(0) === "@");
      if (joins) {
        data[state][data[state].length - 1] += token.value;
        if (token.value) {
          lastChars[state] = token.value.charAt(token.value.length - 1);
        }
        if (state === "text" && insideQuotes) {
          data.textWasQuoted[data.textWasQuoted.length - 1] = true;
        }
      } else {
        data[state].push(token.value);
        lastChars[state] = token.value.charAt(token.value.length - 1);
        if (state === "text") {
          data.textWasQuoted.push(insideQuotes || opensAfterEmptyQuotedString);
        }
      }
    }
  }
  if (!data.text.length && data.comment.length) {
    data.text = data.comment;
    data.comment = [];
  }
  if (isGroup) {
    data.text = data.text.join(" ");
    let groupMembers = [];
    if (data.group.length) {
      const parsedGroup = _parseAddressList(data.group.join(","), depth + 1);
      parsedGroup.forEach((member) => {
        if (member.group) {
          groupMembers = groupMembers.concat(member.group);
        } else {
          groupMembers.push(member);
        }
      });
    }
    addresses.push({
      name: data.text || "",
      group: groupMembers
    });
  } else {
    const addressComments = [];
    const addressParts = [];
    for (const part of data.address) {
      if (part.indexOf("(") < 0) {
        addressParts.push(part);
        continue;
      }
      const stripped = _stripAddressComments(part);
      for (const comment of stripped.comments) {
        addressComments.push(comment);
      }
      if (stripped.address) {
        addressParts.push(stripped.address);
      }
    }
    data.address = addressParts;
    if (!data.address.length && data.text.length) {
      for (let i = data.text.length - 1; i >= 0; i--) {
        if (!data.textWasQuoted[i] && ADDR_SPEC.test(data.text[i])) {
          data.address = data.text.splice(i, 1);
          data.textWasQuoted.splice(i, 1);
          break;
        }
      }
      if (!data.address.length) {
        let extracted = false;
        for (let i = data.text.length - 1; i >= 0; i--) {
          if (!data.textWasQuoted[i]) {
            const part = data.text[i];
            let remainder = part;
            const at = _looseAddressStart(part);
            if (at >= 0) {
              LOOSE_TEXT_ADDR.lastIndex = at;
              const match = LOOSE_TEXT_ADDR.exec(part);
              if (match) {
                data.address = [match[0].trim()];
                extracted = true;
                remainder = part.slice(0, at) + " " + part.slice(at + match[0].length);
              }
            }
            data.text[i] = remainder.trim();
            if (extracted) {
              break;
            }
          }
        }
      }
    }
    if (!data.text.length && data.comment.length) {
      data.text = data.comment;
      data.comment = [];
    }
    if (data.address.length > 1) {
      data.text = data.text.concat(data.address.splice(1));
    }
    const addressFromQuotedText = !data.address.length && data.textWasQuoted.some((wasQuoted) => wasQuoted);
    data.text = data.text.join(" ");
    data.address = data.address.join(" ");
    if (addressFromQuotedText && data.text.indexOf("@") >= 0) {
      data.address = _quoteLocalPart(data.text);
      data.text = "";
    }
    _recoverAddrSpec(data);
    if (!data.text && addressComments.length) {
      data.text = addressComments.join(" ");
    }
    const address = {
      address: data.address || data.text || "",
      name: data.text || data.address || ""
    };
    if (address.address === address.name) {
      if (/@/.test(address.address || "")) {
        address.name = "";
      } else {
        address.address = "";
      }
    }
    addresses.push(address);
  }
  return addresses;
}
var Tokenizer2 = class {
  constructor(str) {
    this.str = (str || "").toString();
    this.operatorCurrent = "";
    this.operatorExpecting = "";
    this.node = null;
    this.escaped = false;
    this.inDomainLiteral = false;
    this.afterAt = false;
    this.list = [];
    this.operators = {
      '"': '"',
      "(": ")",
      "<": ">",
      ",": "",
      ":": ";",
      // Semicolons are not a legal delimiter per the RFC2822 grammar other
      // than for terminating a group, but they are also not valid for any
      // other use in this context.  Given that some mail clients have
      // historically allowed the semicolon as a delimiter equivalent to the
      // comma in their UI, it makes sense to treat them the same as a comma
      // when used outside of a group.
      ";": ""
    };
  }
  /**
   * Tokenizes the original input string
   *
   * @return An array of operator|text tokens
   */
  tokenize() {
    const list = [];
    for (let i = 0, len = this.str.length; i < len; i++) {
      const chr = this.str.charAt(i);
      const nextChr = i < len - 1 ? this.str.charAt(i + 1) : null;
      this.checkChar(chr, nextChr);
    }
    this.list.forEach((node) => {
      node.value = (node.value || "").toString().trim();
      if (node.value) {
        list.push(node);
      }
    });
    return list;
  }
  /**
   * Checks if a character is an operator or text and acts accordingly
   *
   * @param chr Character from the address field
   * @param nextChr Character following chr, null at the end of the field
   */
  checkChar(chr, nextChr) {
    if (!this.escaped && !this.operatorExpecting) {
      if (!this.inDomainLiteral && chr === "[" && this.afterAt) {
        this.inDomainLiteral = true;
      } else if (this.inDomainLiteral && (chr === "]" || chr === "," || chr === ";")) {
        this.inDomainLiteral = false;
      }
    }
    if (this.escaped) {
    } else if (chr === this.operatorExpecting) {
      this.node = {
        type: "operator",
        value: chr
      };
      if (nextChr && ![" ", "	", "\r", "\n", ",", ";"].includes(nextChr)) {
        this.node.noBreak = true;
      }
      this.list.push(this.node);
      this.node = null;
      if (chr !== ")") {
        this.afterAt = false;
      }
      this.operatorExpecting = "";
      this.escaped = false;
      return;
    } else if (!this.operatorExpecting && !(this.inDomainLiteral && chr === ":") && chr in this.operators) {
      this.node = {
        type: "operator",
        value: chr
      };
      this.list.push(this.node);
      this.node = null;
      if (chr !== "(") {
        this.afterAt = false;
      }
      this.operatorExpecting = this.operators[chr];
      this.escaped = false;
      return;
    } else if (['"', "'", ")"].includes(this.operatorExpecting) && chr === "\\") {
      this.escaped = true;
      return;
    }
    if (!this.node) {
      this.node = {
        type: "text",
        value: ""
      };
      this.list.push(this.node);
    }
    if (chr === "\n") {
      chr = " ";
    }
    if (chr.charCodeAt(0) >= 33 || [" ", "	"].includes(chr)) {
      this.node.value += chr;
      if (!this.operatorExpecting && chr !== " " && chr !== "	") {
        this.afterAt = chr === "@";
      }
    }
    this.escaped = false;
  }
};
var MAX_NESTED_GROUP_DEPTH2 = 50;
function _parseAddressList(str, depth) {
  if (depth > MAX_NESTED_GROUP_DEPTH2) {
    return [];
  }
  const tokenizer = new Tokenizer2(str);
  const tokens = tokenizer.tokenize();
  const addresses = [];
  let address = [];
  const parsedAddresses = [];
  tokens.forEach((token) => {
    if (token.type === "operator" && (token.value === "," || token.value === ";")) {
      if (address.length) {
        addresses.push(address);
      }
      address = [];
    } else {
      address.push(token);
    }
  });
  if (address.length) {
    addresses.push(address);
  }
  addresses.forEach((addr) => {
    const handled = _handleAddress2(addr, depth);
    for (let i = 0; i < handled.length; i++) {
      parsedAddresses.push(handled[i]);
    }
  });
  const mergedAddresses = [];
  for (let i = parsedAddresses.length - 1; i >= 0; i--) {
    const current = parsedAddresses[i];
    const next = mergedAddresses.length ? mergedAddresses[mergedAddresses.length - 1] : null;
    if (next && current.address === "" && current.name && !current.group && next.address && next.name) {
      next.name = current.name + ", " + next.name;
    } else {
      mergedAddresses.push(current);
    }
  }
  mergedAddresses.reverse();
  return mergedAddresses;
}
function addressparser(str, options) {
  const parsedAddresses = _parseAddressList(str, 0);
  if (options?.flatten) {
    const flatAddresses = [];
    const walkAddressList = (list) => {
      list.forEach((entry) => {
        if (entry.group) {
          return walkAddressList(entry.group);
        }
        flatAddresses.push(entry);
      });
    };
    walkAddressList(parsedAddresses);
    return flatAddresses;
  }
  return parsedAddresses;
}
var addressparser_default = addressparser;

// node_modules/nodemailer/dist/esm/mime-node/last-newline.js
import { Transform as Transform3 } from "node:stream";
var LastNewline = class extends Transform3 {
  constructor() {
    super();
    this.lastByte = false;
  }
  /** @internal */
  _transform(chunk, encoding, done) {
    if (chunk.length) {
      this.lastByte = chunk[chunk.length - 1];
    }
    this.push(chunk);
    done();
  }
  /** @internal */
  _flush(done) {
    if (this.lastByte === 10) {
      return done();
    }
    if (this.lastByte === 13) {
      this.push(Buffer.from("\n"));
      return done();
    }
    this.push(Buffer.from("\r\n"));
    return done();
  }
};

// node_modules/nodemailer/dist/esm/mime-node/le-windows.js
import { Transform as Transform4 } from "node:stream";
var LeWindows = class extends Transform4 {
  constructor(options) {
    super(options);
    this.lastByte = false;
  }
  /**
   * Escapes dots
   * @internal
   */
  _transform(chunk, encoding, done) {
    let buf;
    let lastPos = 0;
    for (let i = 0, len = chunk.length; i < len; i++) {
      if (chunk[i] === 10) {
        if (i && chunk[i - 1] !== 13 || !i && this.lastByte !== 13) {
          if (i > lastPos) {
            buf = chunk.slice(lastPos, i);
            this.push(buf);
          }
          this.push(Buffer.from("\r\n"));
          lastPos = i + 1;
        }
      }
    }
    if (lastPos && lastPos < chunk.length) {
      buf = chunk.slice(lastPos);
      this.push(buf);
    } else if (!lastPos) {
      this.push(chunk);
    }
    this.lastByte = chunk[chunk.length - 1];
    done();
  }
};

// node_modules/nodemailer/dist/esm/mime-node/le-unix.js
import { Transform as Transform5 } from "node:stream";
var LeUnix = class extends Transform5 {
  constructor(options) {
    super(options);
  }
  /**
   * Escapes dots
   * @internal
   */
  _transform(chunk, encoding, done) {
    let buf;
    let lastPos = 0;
    for (let i = 0, len = chunk.length; i < len; i++) {
      if (chunk[i] === 13) {
        buf = chunk.slice(lastPos, i);
        lastPos = i + 1;
        this.push(buf);
      }
    }
    if (lastPos && lastPos < chunk.length) {
      buf = chunk.slice(lastPos);
      this.push(buf);
    } else if (!lastPos) {
      this.push(chunk);
    }
    done();
  }
};

// node_modules/nodemailer/dist/esm/mime-node/index.js
var FORMATTED_HEADERS = ["From", "Sender", "To", "Cc", "Bcc", "Reply-To", "Date", "References"];
var ATEXT = "[A-Za-z0-9!#$%&'*+\\-/=?^_`{|}~\\x80-\\uFFFF]";
var DOT_ATOM = new RegExp("^" + ATEXT + "+(?:\\." + ATEXT + "+)*$");
var QUOTED_STRING = /^"(?:[^"\\]|\\[\s\S])*"$/;
var PLAIN_ADDRESS = /^[^\s"(),:;<>@[\\\]]+@[^\s"(),:;<>@[\\\]]+$/;
var URL_PARSER_UNSAFE = /[/\\?#%\x00-\x20\x7F]/;
var PIPELINE_NOOP = () => false;
function abortedError() {
  const err = new Error("Message stream was closed before the message was generated");
  err.code = ESTREAM;
  return err;
}
function normalizeDomain(domain, toUnicode2) {
  if (typeof urlModule.domainToASCII === "function" && typeof urlModule.domainToUnicode === "function" && !URL_PARSER_UNSAFE.test(domain)) {
    const ascii = urlModule.domainToASCII(domain);
    const mapped = ascii && toUnicode2 ? urlModule.domainToUnicode(ascii) : ascii;
    if (mapped) {
      return mapped;
    }
  }
  return toUnicode2 ? toUnicode(domain) : toASCII(domain);
}
function _stripBoundaryControls(value) {
  return value.replace(/[\x00-\x1f\x7f]+/g, "");
}
var MimeNode2 = class _MimeNode {
  constructor(contentType, options) {
    this.nodeCounter = 0;
    options = options || {};
    this.baseBoundary = _stripBoundaryControls(options.baseBoundary || crypto.randomBytes(8).toString("hex"));
    this.boundaryPrefix = _stripBoundaryControls(options.boundaryPrefix || "--_NmP");
    this.disableFileAccess = !!options.disableFileAccess;
    this.disableUrlAccess = !!options.disableUrlAccess;
    this.normalizeHeaderKey = options.normalizeHeaderKey;
    this.date = options.parentNode ? null : /* @__PURE__ */ new Date();
    this.rootNode = options.rootNode || this;
    this.keepBcc = !!options.keepBcc;
    if (options.filename) {
      this.filename = options.filename;
      if (!contentType) {
        contentType = detectMimeType2(this.filename.split(".").pop());
      }
    }
    this.textEncoding = (options.textEncoding || "").toString().trim().charAt(0).toUpperCase();
    this.parentNode = options.parentNode;
    this.hostname = options.hostname;
    this.newline = options.newline;
    this.childNodes = [];
    this._nodeId = ++this.rootNode.nodeCounter;
    this._headers = [];
    this._isPlainText = false;
    this._hasLongLines = false;
    this._envelope = false;
    this._raw = false;
    this._transforms = [];
    this._processFuncs = [];
    if (contentType) {
      this.setHeader("Content-Type", contentType);
    }
  }
  /////// PUBLIC METHODS
  /**
   * Creates and appends a child node.Arguments provided are passed to MimeNode constructor
   *
   * @param [contentType] Optional content type
   * @param [options] Optional options object
   * @return Created node object
   */
  createChild(contentType, options) {
    if (!options && typeof contentType === "object") {
      options = contentType;
      contentType = void 0;
    }
    const node = new _MimeNode(contentType, options);
    this.appendChild(node);
    return node;
  }
  /**
   * Appends an existing node to the mime tree. Removes the node from an existing
   * tree if needed
   *
   * @param childNode node to be appended
   * @return Appended node object
   */
  appendChild(childNode) {
    if (childNode.parentNode && childNode.parentNode !== this) {
      childNode.remove();
    }
    if (childNode.rootNode !== this.rootNode) {
      childNode.rootNode = this.rootNode;
      childNode._nodeId = ++this.rootNode.nodeCounter;
    }
    childNode.parentNode = this;
    this.childNodes.push(childNode);
    return childNode;
  }
  /**
   * Replaces current node with another node
   *
   * @param node Replacement node
   * @return Replacement node
   */
  replace(node) {
    if (node === this) {
      return this;
    }
    this.parentNode.childNodes.forEach((childNode, i) => {
      if (childNode === this) {
        node.rootNode = this.rootNode;
        node.parentNode = this.parentNode;
        node._nodeId = this._nodeId;
        this.rootNode = this;
        this.parentNode = void 0;
        node.parentNode.childNodes[i] = node;
      }
    });
    return node;
  }
  /**
   * Removes current node from the mime tree
   *
   * @return removed node
   */
  remove() {
    if (!this.parentNode) {
      return this;
    }
    for (let i = this.parentNode.childNodes.length - 1; i >= 0; i--) {
      if (this.parentNode.childNodes[i] === this) {
        this.parentNode.childNodes.splice(i, 1);
        this.parentNode = void 0;
        this.rootNode = this;
        return this;
      }
    }
  }
  /**
   * Sets a header value. If the value for selected key exists, it is overwritten.
   * You can set multiple values as well by using [{key:'', value:''}] or
   * {key: 'value'} as the first argument.
   *
   * @param key Header key or a list of key value pairs
   * @param value Header value
   * @return current node
   */
  setHeader(key, value) {
    let added = false;
    if (!value && key && typeof key === "object") {
      if (key.key && "value" in key) {
        this.setHeader(key.key, key.value);
      } else if (Array.isArray(key)) {
        key.forEach((i) => {
          this.setHeader(i.key, i.value);
        });
      } else {
        Object.keys(key).forEach((i) => {
          this.setHeader(i, key[i]);
        });
      }
      return this;
    }
    key = this._normalizeHeaderKey(key);
    const headerValue = {
      key,
      value
    };
    for (let i = 0, len = this._headers.length; i < len; i++) {
      if (this._headers[i].key === key) {
        if (!added) {
          this._headers[i] = headerValue;
          added = true;
        } else {
          this._headers.splice(i, 1);
          i--;
          len--;
        }
      }
    }
    if (!added) {
      this._headers.push(headerValue);
    }
    return this;
  }
  /**
   * Adds a header value. If the value for selected key exists, the value is appended
   * as a new field and old one is not touched.
   * You can set multiple values as well by using [{key:'', value:''}] or
   * {key: 'value'} as the first argument.
   *
   * @param key Header key or a list of key value pairs
   * @param value Header value
   * @return current node
   */
  addHeader(key, value) {
    if (!value && key && typeof key === "object") {
      if (key.key && key.value) {
        this.addHeader(key.key, key.value);
      } else if (Array.isArray(key)) {
        key.forEach((i) => {
          this.addHeader(i.key, i.value);
        });
      } else {
        Object.keys(key).forEach((i) => {
          this.addHeader(i, key[i]);
        });
      }
      return this;
    } else if (Array.isArray(value)) {
      value.forEach((val) => {
        this.addHeader(key, val);
      });
      return this;
    }
    this._headers.push({
      key: this._normalizeHeaderKey(key),
      value
    });
    return this;
  }
  /**
   * Retrieves the first mathcing value of a selected key
   *
   * @param key Key to search for
   * @retun Value for the key
   */
  getHeader(key) {
    key = this._normalizeHeaderKey(key);
    for (let i = 0, len = this._headers.length; i < len; i++) {
      if (this._headers[i].key === key) {
        return this._headers[i].value;
      }
    }
  }
  /**
   * Sets body content for current node. If the value is a string, charset is added automatically
   * to Content-Type (if it is text/*). If the value is a Buffer, you need to specify
   * the charset yourself
   *
   * @param content Body content
   * @return current node
   */
  setContent(content) {
    this.content = content;
    if (typeof this.content.pipe === "function") {
      recordStreamErrors(this.content);
    } else if (typeof this.content === "string") {
      this._isPlainText = isPlainText(this.content);
      if (this._isPlainText && hasLongerLines(this.content, 76)) {
        this._hasLongLines = true;
      }
    }
    return this;
  }
  build(callback) {
    let promise;
    if (!callback) {
      promise = new Promise((resolve3, reject) => {
        callback = callbackPromise(resolve3, reject);
      });
    }
    const done = callback;
    const stream = this.createReadStream();
    const buf = [];
    let buflen = 0;
    let returned = false;
    stream.on("readable", () => {
      let chunk;
      while ((chunk = stream.read()) !== null) {
        buf.push(chunk);
        buflen += chunk.length;
      }
    });
    stream.once("error", (err) => {
      if (returned) {
        return;
      }
      returned = true;
      return done(err);
    });
    stream.once("end", (chunk) => {
      if (returned) {
        return;
      }
      returned = true;
      if (chunk && chunk.length) {
        buf.push(chunk);
        buflen += chunk.length;
      }
      return done(null, Buffer.concat(buf, buflen));
    });
    return promise;
  }
  getTransferEncoding() {
    let transferEncoding = false;
    const contentType = (this.getHeader("Content-Type") || "").toString().toLowerCase().trim();
    if (this.content) {
      transferEncoding = (this.getHeader("Content-Transfer-Encoding") || "").toString().toLowerCase().trim();
      if (!transferEncoding || !["base64", "quoted-printable"].includes(transferEncoding)) {
        if (/^text\//i.test(contentType)) {
          if (this._isPlainText && !this._hasLongLines) {
            transferEncoding = "7bit";
          } else if (typeof this.content === "string" || this.content instanceof Buffer) {
            transferEncoding = this._getTextEncoding(this.content) === "Q" ? "quoted-printable" : "base64";
          } else {
            transferEncoding = this.textEncoding === "B" ? "base64" : "quoted-printable";
          }
        } else if (!/^(multipart|message)\//i.test(contentType)) {
          transferEncoding = transferEncoding || "base64";
        }
      }
    }
    return transferEncoding;
  }
  /**
   * Builds the header block for the mime node. Append \r\n\r\n before writing the content
   *
   * @returns Headers
   */
  buildHeaders() {
    const transferEncoding = this.getTransferEncoding();
    const headers = [];
    if (transferEncoding) {
      this.setHeader("Content-Transfer-Encoding", transferEncoding);
    }
    if (this.filename && !this.getHeader("Content-Disposition")) {
      this.setHeader("Content-Disposition", "attachment");
    }
    if (this.rootNode === this) {
      if (!this.getHeader("Date")) {
        this.setHeader("Date", this.date.toUTCString().replace(/GMT/, "+0000"));
      }
      this.messageId();
      if (!this.getHeader("MIME-Version")) {
        this.setHeader("MIME-Version", "1.0");
      }
      for (let i = this._headers.length - 2; i >= 0; i--) {
        const header = this._headers[i];
        if (header.key === "Content-Type") {
          this._headers.splice(i, 1);
          this._headers.push(header);
        }
      }
    }
    this._headers.forEach((header) => {
      let key = header.key;
      let value = header.value;
      let structured;
      let param;
      const options = {};
      const formattedHeaders = FORMATTED_HEADERS;
      if (value && typeof value === "object" && !formattedHeaders.includes(key)) {
        copyOwnKeys(options, value, (optionKey) => optionKey === "value");
        value = (value.value || "").toString();
        if (!value.trim()) {
          return;
        }
      }
      if (options.prepared) {
        if (options.foldLines) {
          headers.push(foldLines2(key + ": " + value));
        } else {
          headers.push(key + ": " + value);
        }
        return;
      }
      switch (header.key) {
        case "Content-Disposition":
          structured = parseHeaderValue(value);
          if (this.filename) {
            structured.params.filename = this.filename;
          }
          value = buildHeaderValue(structured);
          break;
        case "Content-Type":
          structured = parseHeaderValue(value);
          structured.value = (structured.value || "").toString().replace(/[\x00-\x1f\x7f]/g, "");
          this._handleContentType(structured);
          if (structured.value.match(/^text\/plain\b/) && typeof this.content === "string" && /[\u0080-\uFFFF]/.test(this.content)) {
            structured.params.charset = "utf-8";
          }
          value = buildHeaderValue(structured);
          if (this.filename) {
            param = /[\x00-\x1f\x7f]/.test(this.filename) ? encodeWord(this.filename, this._getTextEncoding(this.filename), 52) : this._encodeWords(this.filename);
            if (param !== this.filename || /[\s'"\\;:/=(),<>@[\]?]|^-/.test(param)) {
              param = JSON.stringify(param);
            }
            value += "; name=" + param;
          }
          break;
        case "Bcc":
          if (!this.keepBcc) {
            return;
          }
          break;
      }
      value = this._encodeHeaderValue(key, value);
      if (!(value || "").toString().trim()) {
        return;
      }
      if (typeof this.normalizeHeaderKey === "function") {
        const normalized2 = this.normalizeHeaderKey(key, value);
        const cleaned = typeof normalized2 === "string" ? normalized2.replace(/[\x00-\x1f\x7f]/g, "") : "";
        if (cleaned) {
          key = cleaned;
        }
      }
      headers.push(foldLines2(key + ": " + value, 76));
    });
    return headers.join("\r\n");
  }
  /**
   * Streams the rfc2822 message from the current node. If this is a root node,
   * mandatory header fields are set if missing (Date, Message-Id, MIME-Version)
   *
   * @return Compiled message
   */
  createReadStream(options) {
    options = options || {};
    const stream = new PassThrough2(options);
    this.stream(stream, options, (err) => {
      if (err) {
        stream.destroy(err);
        return;
      }
      stream.end();
    });
    stream.once("close", () => {
      if (!stream.writableFinished) {
        this._destroyContentStreams();
      }
    });
    const stages = [stream];
    for (const transform of this._transforms) {
      stages.push(typeof transform === "function" ? transform() : transform);
    }
    stages.push(new LastNewline());
    let outputStream = pipeline(stages, PIPELINE_NOOP);
    for (const processFunc of this._processFuncs) {
      const input = outputStream;
      outputStream = processFunc(input);
      if (outputStream !== input) {
        finished2(outputStream, (err) => {
          if (err) {
            input.destroy();
          }
        });
      }
    }
    if (this.newline) {
      const winbreak = ["win", "windows", "dos", "\r\n"].includes(this.newline.toString().toLowerCase());
      outputStream = pipeline(outputStream, winbreak ? new LeWindows() : new LeUnix(), PIPELINE_NOOP);
    }
    return outputStream;
  }
  /**
   * Appends a transform stream object to the transforms list. Final output
   * is passed through this stream before exposing
   *
   * @param transform Read-Write stream
   */
  transform(transform) {
    this._transforms.push(transform);
  }
  /**
   * Appends a post process function. The functon is run after transforms and
   * uses the following syntax
   *
   *   processFunc(input) -> outputStream
   *
   * @param processFunc Read-Write stream
   */
  processFunc(processFunc) {
    this._processFuncs.push(processFunc);
  }
  stream(outputStream, options, done) {
    const transferEncoding = this.getTransferEncoding();
    let activeStreams = [];
    let returned = false;
    const callback = (err) => {
      if (returned) {
        return;
      }
      returned = true;
      outputStream.removeListener("close", onOutputClose);
      done(err);
    };
    function onOutputClose() {
      for (const stream of activeStreams) {
        stream.destroy();
      }
      return callback(abortedError());
    }
    const readInto = (...streams) => {
      if (!activeStreams.length) {
        outputStream.once("close", onOutputClose);
      }
      activeStreams = streams;
    };
    const aborted = () => {
      if (outputStream.destroyed) {
        callback(abortedError());
        return true;
      }
      return false;
    };
    const finalize = () => {
      let childId = 0;
      const processChildNode = () => {
        if (aborted()) {
          return;
        }
        if (childId >= this.childNodes.length) {
          outputStream.write("\r\n--" + this.boundary + "--\r\n");
          return callback();
        }
        const child = this.childNodes[childId++];
        outputStream.write((childId > 1 ? "\r\n" : "") + "--" + this.boundary + "\r\n");
        child.stream(outputStream, options, (err) => {
          if (err) {
            return callback(err);
          }
          setImmediate(processChildNode);
        });
      };
      if (this.multipart) {
        setImmediate(processChildNode);
      } else {
        return callback();
      }
    };
    const sendContent = () => {
      if (aborted()) {
        return;
      }
      if (!this.content) {
        return setImmediate(finalize);
      }
      const createStream = () => {
        if (aborted()) {
          return;
        }
        const contentError = this._takeStreamContent(this.content);
        if (contentError) {
          return callback(contentError);
        }
        const localStream = this._getStream(this.content);
        if (["quoted-printable", "base64"].includes(transferEncoding)) {
          const contentStream = transferEncoding === "base64" ? new Encoder(options) : (
            // outside of text a lone CR or LF is data, encoding it keeps it from being
            // turned into a line break by a newline transform or the receiving side
            new Encoder2(Object.assign({}, options, { binary: !/^text\//i.test(this.contentType || "") }))
          );
          readInto(localStream, contentStream);
          contentStream.pipe(outputStream, {
            end: false
          });
          pipeline(localStream, contentStream, (err) => err && callback(err));
          finished2(contentStream, { writable: false }, (err) => err ? callback(err) : finalize());
        } else {
          readInto(localStream);
          localStream.pipe(outputStream, {
            end: false
          });
          finished2(localStream, { writable: false }, (err) => err ? callback(err) : finalize());
        }
      };
      if (this.content._resolve) {
        const sourceStream = this._getStream(this.content);
        readInto(sourceStream);
        resolveStream(sourceStream, (err, value) => {
          if (err) {
            return callback(err);
          }
          if (returned) {
            return;
          }
          this.content._resolve = false;
          this.content._resolvedValue = value;
          setImmediate(createStream);
        });
      } else {
        setImmediate(createStream);
      }
    };
    if (this._raw) {
      setImmediate(() => {
        if (aborted()) {
          return;
        }
        const rawError = this._takeStreamContent(this._raw);
        if (rawError) {
          return callback(rawError);
        }
        const raw = this._getStream(this._raw);
        readInto(raw);
        raw.pipe(outputStream, {
          end: false
        });
        finished2(raw, { writable: false }, (err) => err ? callback(err) : finalize());
      });
    } else {
      outputStream.write(this.buildHeaders() + "\r\n\r\n");
      setImmediate(sendContent);
    }
  }
  /**
   * Sets envelope to be used instead of the generated one
   *
   * @return SMTP envelope in the form of {from: 'from@example.com', to: ['to@example.com']}
   */
  setEnvelope(envelope) {
    let list;
    this._envelope = {
      from: false,
      to: []
    };
    if (envelope.from) {
      list = [];
      this._convertAddresses(this._parseEnvelopeAddresses(envelope.from), list);
      list = list.filter((address) => address && address.address);
      if (list.length && list[0]) {
        this._envelope.from = list[0].address;
      }
    }
    const seenRecipients = /* @__PURE__ */ new Set();
    const recipients = [];
    ["to", "cc", "bcc"].forEach((key) => {
      if (envelope[key]) {
        this._convertAddresses(this._parseEnvelopeAddresses(envelope[key]), recipients, seenRecipients);
      }
    });
    this._envelope.to = recipients.map((to) => to.address).filter((address) => address);
    const standardFields = ["to", "cc", "bcc", "from"];
    copyOwnKeys(this._envelope, envelope, (key) => standardFields.includes(key));
    return this;
  }
  /**
   * Generates and returns an object with parsed address fields
   *
   * @return Address object
   */
  getAddresses() {
    const addresses = {};
    const seenByKey = /* @__PURE__ */ new Map();
    this._headers.forEach((header) => {
      const key = header.key.toLowerCase();
      if (["from", "sender", "reply-to", "to", "cc", "bcc"].includes(key)) {
        if (!Array.isArray(addresses[key])) {
          addresses[key] = [];
          seenByKey.set(key, /* @__PURE__ */ new Set());
        }
        this._convertAddresses(this._parseAddresses(header.value), addresses[key], seenByKey.get(key));
      }
    });
    return addresses;
  }
  /**
   * Generates and returns SMTP envelope with the sender address and a list of recipients addresses
   *
   * @return SMTP envelope in the form of {from: 'from@example.com', to: ['to@example.com']}
   */
  getEnvelope() {
    if (this._envelope) {
      return this._envelope;
    }
    const envelope = {
      from: false,
      to: []
    };
    const seenRecipients = /* @__PURE__ */ new Set();
    const recipients = [];
    this._headers.forEach((header) => {
      const list = [];
      if (header.key === "From" || !envelope.from && ["Reply-To", "Sender"].includes(header.key)) {
        this._convertAddresses(this._parseAddresses(header.value), list);
        if (list.length && list[0]) {
          envelope.from = list[0].address;
        }
      } else if (["To", "Cc", "Bcc"].includes(header.key)) {
        this._convertAddresses(this._parseAddresses(header.value), recipients, seenRecipients);
      }
    });
    envelope.to = recipients.map((to) => to.address);
    return envelope;
  }
  /**
   * Returns Message-Id value. If it does not exist, then creates one
   *
   * @return Message-Id value
   */
  messageId() {
    let messageId = this.getHeader("Message-ID");
    if (!messageId) {
      messageId = this._generateMessageId();
      this.setHeader("Message-ID", messageId);
    }
    return messageId;
  }
  /**
   * Sets pregenerated content that will be used as the output of this node
   *
   * @param raw Raw MIME contents
   */
  setRaw(raw) {
    this._raw = raw;
    if (this._raw && typeof this._raw.pipe === "function") {
      recordStreamErrors(this._raw);
    }
    return this;
  }
  /////// PRIVATE METHODS
  /**
   * Checks an access policy flag for this node and every node above it. The flags are set
   * from the options the node was built with, and createChild only ever sees the options
   * the caller passed, so a child of a closed tree starts out open. Reading the answer off
   * the parent chain keeps it right whatever order the tree was assembled in.
   *
   * @param flag Either 'disableFileAccess' or 'disableUrlAccess'
   * @return true if this node or an ancestor closed that access
   * @internal
   */
  _accessDisabled(flag) {
    let node = this;
    while (node) {
      if (node[flag]) {
        return true;
      }
      node = node.parentNode;
    }
    return false;
  }
  /**
   * Destroys the content streams of this node and of every node below it
   *
   * @internal
   */
  _destroyContentStreams() {
    destroyStream(this.content);
    destroyStream(this._raw);
    for (const child of this.childNodes) {
      child._destroyContentStreams();
    }
  }
  /**
   * Checks that a content value can still be read before the node streams it. A stream is
   * refused once it errored, ended or was destroyed: piping it would either never finish or
   * produce an empty body without any error
   *
   * @param content Node content or raw value
   * @returns The error to stop with, or null when the content can be read
   * @internal
   */
  _takeStreamContent(content) {
    if (Object.prototype.toString.call(content) === "[object Error]") {
      return content;
    }
    if (!content || typeof content.pipe !== "function" || content._resolvedValue) {
      return null;
    }
    return unreadableStreamError(content);
  }
  /**
   * Detects and returns handle to a stream related with the content.
   *
   * @param content Node content
   * @returns Stream object
   * @internal
   */
  _getStream(content) {
    let contentStream;
    if (content._resolvedValue) {
      contentStream = new PassThrough2();
      setImmediate(() => {
        try {
          contentStream.end(content._resolvedValue);
        } catch (_err) {
          contentStream.emit("error", _err);
        }
      });
      return contentStream;
    }
    if (typeof content.pipe === "function") {
      return content;
    }
    if (content && typeof content.path === "string" && !content.href) {
      if (this._accessDisabled("disableFileAccess")) {
        contentStream = new PassThrough2();
        setImmediate(() => {
          const err = new Error("File access rejected for " + content.path);
          err.code = EFILEACCESS;
          contentStream.emit("error", err);
        });
        return contentStream;
      }
      return fs2.createReadStream(content.path);
    }
    if (content && typeof content.href === "string") {
      if (this._accessDisabled("disableUrlAccess")) {
        contentStream = new PassThrough2();
        setImmediate(() => {
          const err = new Error("Url access rejected for " + content.href);
          err.code = EURLACCESS;
          contentStream.emit("error", err);
        });
        return contentStream;
      }
      return fetch_default(content.href, { headers: content.httpHeaders, tls: content.tls });
    }
    contentStream = new PassThrough2();
    setImmediate(() => {
      try {
        contentStream.end(content || "");
      } catch (_err) {
        contentStream.emit("error", _err);
      }
    });
    return contentStream;
  }
  /**
   * Parses addresses. Takes in a single address or an array or an
   * array of address arrays (eg. To: [[first group], [second group],...])
   *
   * @param addresses Addresses to be parsed
   * @return An array of address objects
   * @internal
   */
  _parseAddresses(addresses) {
    const flattened = [];
    const seen = /* @__PURE__ */ new WeakSet();
    const stack = [];
    const enter = (list) => {
      if (!seen.has(list)) {
        seen.add(list);
        stack.push({ list, pos: 0 });
      }
    };
    enter(Array.isArray(addresses) ? addresses : [addresses]);
    while (stack.length) {
      const frame = stack[stack.length - 1];
      if (frame.pos >= frame.list.length) {
        stack.pop();
        continue;
      }
      const address = frame.list[frame.pos++];
      if (Array.isArray(address)) {
        enter(address);
        continue;
      }
      if (address && address.address) {
        const normalized2 = this._normalizeAddress(address.address);
        if (normalized2 === address.address && typeof address.name === "string") {
          flattened.push(address);
          continue;
        }
        const copy = copyOwnKeys({}, address);
        copy.address = normalized2;
        copy.name = address.name || "";
        flattened.push(copy);
        continue;
      }
      const parsed = this._normalizeParsedAddresses(addressparser_default(address));
      for (let i = 0; i < parsed.length; i++) {
        flattened.push(parsed[i]);
      }
    }
    return flattened;
  }
  /**
   * Normalizes the addresses of a freshly parsed address list, groups included.
   *
   * Everything this method returns carries a normalized address, whether it arrived as an
   * object or was parsed out of a header value. Without this the two shapes disagree, and
   * a consumer reading the parsed form back is handed the ambiguous
   * 'user@evil.com@good.com' that the header and the envelope no longer carry.
   *
   * @param parsed An array of address objects, as returned by addressparser
   * @return The same array, with every address normalized
   * @internal
   */
  _normalizeParsedAddresses(parsed) {
    parsed.forEach((entry) => {
      if (entry.address) {
        entry.address = this._normalizeAddress(entry.address);
      } else if (entry.group) {
        this._normalizeParsedAddresses(entry.group);
      }
    });
    return parsed;
  }
  /**
   * Parses the addresses of an explicitly set envelope.
   *
   * An envelope value is an addr-spec and never a display name, so a bare local username
   * such as 'root' is the address here. Header parsing has to read the same value as a
   * display name, as a value with no '@' in it can not be an addr-spec in a header.
   *
   * @param addresses Addresses to be parsed
   * @return An array of address objects
   * @internal
   */
  _parseEnvelopeAddresses(addresses) {
    return this._parseAddresses(addresses).map((entry) => {
      if (entry.address || entry.group || !entry.name || /[\s@]/.test(entry.name)) {
        return entry;
      }
      return { address: this._normalizeAddress(entry.name), name: "" };
    });
  }
  /**
   * Normalizes a header key, uses Camel-Case form, except for uppercase MIME-
   *
   * @param key Key to be normalized
   * @return key in Camel-Case form
   * @internal
   */
  _normalizeHeaderKey(key) {
    key = (key || "").toString().replace(/\r?\n|\r/g, " ").replace(/[\x00-\x1f\x7f]/g, "").trim().toLowerCase().replace(/^X-SMTPAPI$|^(MIME|DKIM|ARC|BIMI)\b|^[a-z]|-(SPF|FBL|ID|MD5)$|-[a-z]/gi, (c) => c.toUpperCase()).replace(/^Content-Features$/i, "Content-features");
    return key;
  }
  /**
   * Checks if the content type is multipart and defines boundary if needed.
   * Doesn't return anything, modifies object argument instead.
   *
   * @param structured Parsed header value for 'Content-Type' key
   * @internal
   */
  _handleContentType(structured) {
    this.contentType = structured.value.trim().toLowerCase();
    this.multipart = /^multipart\//i.test(this.contentType) ? this.contentType.substr(this.contentType.indexOf("/") + 1) : false;
    if (this.multipart) {
      const declared = _stripBoundaryControls(structured.params.boundary || this.boundary || "");
      this.boundary = structured.params.boundary = declared || _stripBoundaryControls(this._generateBoundary());
    } else {
      this.boundary = false;
    }
  }
  /**
   * Generates a multipart boundary value
   *
   * @return boundary value
   * @internal
   */
  _generateBoundary() {
    return _stripBoundaryControls(this.rootNode.boundaryPrefix + "-" + this.rootNode.baseBoundary) + "-Part_" + this._nodeId;
  }
  /**
   * Encodes a header value for use in the generated rfc2822 email.
   *
   * @param key Header key
   * @param value Header value
   * @internal
   */
  _encodeHeaderValue(key, value) {
    key = this._normalizeHeaderKey(key);
    switch (key) {
      // Structured headers
      case "From":
      case "Sender":
      case "To":
      case "Cc":
      case "Bcc":
      case "Reply-To":
        return this._convertAddresses(this._parseAddresses(value));
      // values enclosed in <>
      case "Message-ID":
      case "In-Reply-To":
      case "Content-Id":
        value = (value || "").toString().replace(/\r?\n|\r/g, " ").replace(/[\x00-\x08\x0b\x0c\x0e-\x1f\x7f]/g, "");
        if (value.charAt(0) !== "<") {
          value = "<" + value;
        }
        if (value.charAt(value.length - 1) !== ">") {
          value = value + ">";
        }
        return value;
      // space separated list of values enclosed in <>
      case "References":
        value = [].concat.apply([], [].concat(value || "").map((elm) => {
          elm = (elm || "").toString().replace(/\r?\n|\r/g, " ").replace(/[\x00-\x08\x0b\x0c\x0e-\x1f\x7f]/g, "").trim();
          return elm.replace(/<[^>]*>/g, (str) => str.replace(/\s/g, "")).split(/\s+/);
        })).map((elm) => {
          if (elm.charAt(0) !== "<") {
            elm = "<" + elm;
          }
          if (elm.charAt(elm.length - 1) !== ">") {
            elm = elm + ">";
          }
          return elm;
        });
        return value.join(" ").trim();
      case "Date":
        if (Object.prototype.toString.call(value) === "[object Date]") {
          return value.toUTCString().replace(/GMT/, "+0000");
        }
        value = (value || "").toString().replace(/\r?\n|\r/g, " ");
        return this._encodeHeaderText(value);
      case "Content-Type":
      case "Content-Disposition":
        return (value || "").toString().replace(/\r?\n|\r/g, " ");
      default:
        value = (value || "").toString().replace(/\r?\n|\r/g, " ");
        return this._encodeHeaderText(value);
    }
  }
  /**
   * Rebuilds address object using punycode and other adjustments
   *
   * @param addresses An array of address objects
   * @param [uniqueList] An array to be populated with addresses
   * @param [seenAddresses] Addresses already added to uniqueList, shared with recursive calls to keep deduplication linear
   * @return address string
   * @internal
   */
  _convertAddresses(addresses, uniqueList, seenAddresses) {
    const values = [];
    uniqueList = uniqueList || [];
    if (!seenAddresses) {
      seenAddresses = /* @__PURE__ */ new Set();
      for (let i = 0; i < uniqueList.length; i++) {
        seenAddresses.add(uniqueList[i].address);
      }
    }
    [].concat(addresses || []).forEach((address) => {
      if (address.address) {
        address.address = this._normalizeAddress(address.address);
        if (!address.name) {
          values.push(PLAIN_ADDRESS.test(address.address) ? address.address : `<${address.address}>`);
        } else {
          values.push(`${this._encodeAddressName(address.name)} <${address.address}>`);
        }
        if (!seenAddresses.has(address.address)) {
          seenAddresses.add(address.address);
          uniqueList.push(address);
        }
      } else if (address.group) {
        const groupListAddresses = (address.group.length ? this._convertAddresses(address.group, uniqueList, seenAddresses) : "").trim();
        values.push(`${this._encodeAddressName(address.name)}:${groupListAddresses};`);
      }
    });
    return values.join(", ");
  }
  /**
   * Normalizes an email address
   *
   * @param address An array of address objects
   * @return address string
   * @internal
   */
  _normalizeAddress(address) {
    address = (address || "").toString().replace(/[\x00-\x1F\x7F<>]+/g, " ").trim();
    if (!address) {
      return address;
    }
    const lastAt = address.lastIndexOf("@");
    if (lastAt < 0) {
      return this._normalizeLocalPart(address);
    }
    const user = address.substr(0, lastAt);
    const domain = address.substr(lastAt + 1);
    let encodedDomain = domain;
    const smtputf8 = /[\x80-\uFFFF]/.test(user);
    try {
      encodedDomain = normalizeDomain(domain.toLowerCase(), smtputf8);
    } catch (_err) {
    }
    return `${this._normalizeLocalPart(user)}@${encodedDomain}`;
  }
  /**
   * Normalizes the local part of an address into a form that can be emitted as is.
   *
   * A local part is either a dot-atom or a quoted-string, anything else is not a valid
   * addr-spec. The quotes of a quoted local part get lost along the way, and a bare
   * 'user@evil.com@good.com' leaves it to the receiver which '@' splits the domain off,
   * while the split here is always at the last one. So whatever is not already one of
   * the two valid forms goes back out as a quoted-string.
   *
   * @param user Local part of an address
   * @return Local part as a dot-atom or as a quoted-string
   * @internal
   */
  _normalizeLocalPart(user) {
    if (DOT_ATOM.test(user) || QUOTED_STRING.test(user)) {
      return user;
    }
    return quoteString(user);
  }
  /**
   * If needed, mime encodes the name part
   *
   * @param name Name part of an address
   * @returns Mime word encoded string if needed
   * @internal
   */
  _encodeAddressName(name2) {
    if (!/^[\w ]*$/.test(name2)) {
      if (/^[\x20-\x7e]*$/.test(name2)) {
        return quoteString(name2);
      } else {
        return encodeWord(name2, this._getTextEncoding(name2), 52);
      }
    }
    return name2;
  }
  /**
   * Encodes an unstructured header value. Such a value can only carry VCHAR and WSP, so a
   * control char or DEL has to be forced into the mime encoded word that a non-ascii value
   * would get anyway. HT stays as it is, it is valid folding whitespace here.
   *
   * @param value Header value to encode
   * @returns Mime word encoded string if needed
   * @internal
   */
  _encodeHeaderText(value) {
    return /[\x00-\x08\x0b\x0c\x0e-\x1f\x7f]/.test(value) ? encodeWord(value, this._getTextEncoding(value), 52) : (
      // encodeWords only encodes if needed, otherwise the original string is returned
      this._encodeWords(value)
    );
  }
  /**
   * If needed, mime encodes the name part
   *
   * @param value Name part of an address
   * @returns Mime word encoded string if needed
   * @internal
   */
  _encodeWords(value) {
    return encodeWords(value, this._getTextEncoding(value), 52, true);
  }
  /**
   * Detects best mime encoding for a text value
   *
   * @param value Value to check for
   * @return either 'Q' or 'B'
   * @internal
   */
  _getTextEncoding(value) {
    value = (value || "").toString();
    if (this.textEncoding) {
      return this.textEncoding;
    }
    let nonLatinLen = 0;
    let latinLen = 0;
    for (let i = 0, len = value.length; i < len; i++) {
      const code = value.charCodeAt(i);
      if (code >= 0 && code <= 8 || code === 11 || code === 12 || code >= 14 && code <= 31 || code >= 128) {
        nonLatinLen++;
      } else if (code >= 65 && code <= 90 || code >= 97 && code <= 122) {
        latinLen++;
      }
    }
    return nonLatinLen < latinLen ? "Q" : "B";
  }
  /**
   * Generates a message id
   *
   * @return Random Message-ID value
   * @internal
   */
  _generateMessageId() {
    return "<" + [2, 2, 2, 6].reduce(
      // crux to generate UUID-like random strings
      (prev, len) => prev + "-" + crypto.randomBytes(len).toString("hex"),
      crypto.randomBytes(4).toString("hex")
    ) + "@" + // try to use the domain of the FROM address or fallback to server hostname
    (this.getEnvelope().from || this.hostname || "localhost").split("@").pop() + ">";
  }
};
var mime_node_default = MimeNode2;

// node_modules/nodemailer/dist/esm/mail-composer/index.js
function isContentObject(value) {
  const content = value;
  return typeof value === "object" && !!(content.content || content.path || content.href || content.raw);
}
var MailComposer = class {
  constructor(mail) {
    this.mail = mail || {};
    this.message = false;
  }
  /**
   * Builds MimeNode instance
   */
  compile() {
    this._alternatives = this.getAlternatives();
    this._htmlNode = this._alternatives.filter((alternative) => /^text\/html\b/i.test(alternative.contentType)).pop();
    this._attachments = this.getAttachments(!!this._htmlNode);
    this._useRelated = !!(this._htmlNode && this._attachments.related.length);
    this._useAlternative = this._alternatives.length > 1;
    this._useMixed = this._attachments.attached.length > 1 || this._alternatives.length && this._attachments.attached.length === 1;
    if (this.mail.raw) {
      this.message = new mime_node_default("message/rfc822", {
        newline: this.mail.newline,
        disableUrlAccess: this.mail.disableUrlAccess,
        disableFileAccess: this.mail.disableFileAccess
      }).setRaw(this.mail.raw);
    } else if (this._useMixed) {
      this.message = this._createMixed();
    } else if (this._useAlternative) {
      this.message = this._createAlternative();
    } else if (this._useRelated) {
      this.message = this._createRelated();
    } else {
      this.message = this._createContentNode(false, [].concat(this._alternatives || []).concat(this._attachments.attached || []).shift() || {
        contentType: "text/plain",
        content: ""
      });
    }
    if (this.mail.headers) {
      this.message.addHeader(this.mail.headers);
    }
    ["from", "sender", "to", "cc", "bcc", "reply-to", "in-reply-to", "references", "subject", "message-id", "date"].forEach((header) => {
      const key = header.replace(/-(\w)/g, (o, c) => c.toUpperCase());
      if (this.mail[key]) {
        this.message.setHeader(header, this.mail[key]);
      }
    });
    if (this.mail.envelope) {
      this.message.setEnvelope(this.mail.envelope);
    }
    this.message.messageId();
    return this.message;
  }
  /**
   * List all attachments. Resulting attachment objects can be used as input for MimeNode nodes
   *
   * @param findRelated If true separate related attachments from attached ones
   * @returns An object of arrays (`related` and `attached`)
   */
  getAttachments(findRelated) {
    let eventObject;
    const attachments = [].concat(this.mail.attachments || []).map((attachment, i) => {
      if (/^data:/i.test(attachment.path || attachment.href)) {
        attachment = this._processDataUrl(attachment);
      }
      const contentType = attachment.contentType || detectMimeType2(attachment.filename || attachment.path || attachment.href || "bin");
      const isImage = /^image\//i.test(contentType);
      const isMessageNode = /^message\//i.test(contentType);
      const contentDisposition = attachment.contentDisposition || (isMessageNode || isImage && attachment.cid ? "inline" : "attachment");
      let contentTransferEncoding;
      if ("contentTransferEncoding" in attachment) {
        contentTransferEncoding = attachment.contentTransferEncoding;
      } else if (isMessageNode) {
        contentTransferEncoding = "8bit";
      } else {
        contentTransferEncoding = "base64";
      }
      const data = {
        contentType,
        contentDisposition,
        contentTransferEncoding
      };
      if (attachment.filename) {
        data.filename = attachment.filename;
      } else if (!isMessageNode && attachment.filename !== false) {
        data.filename = (attachment.path || attachment.href || "").split(/[/\\]/).pop().split("?").shift() || "attachment-" + (i + 1);
        if (data.filename.indexOf(".") < 0) {
          data.filename += "." + detectExtension2(data.contentType);
        }
      }
      if (/^https?:\/\//i.test(attachment.path)) {
        attachment.href = attachment.path;
        attachment.path = void 0;
      }
      if (attachment.cid) {
        data.cid = attachment.cid;
      }
      if (attachment.raw) {
        data.raw = attachment.raw;
      } else if (attachment.path) {
        data.content = {
          path: attachment.path
        };
      } else if (attachment.href) {
        data.content = {
          href: attachment.href,
          httpHeaders: attachment.httpHeaders,
          tls: attachment.tls
        };
      } else {
        data.content = attachment.content || "";
      }
      if (attachment.encoding) {
        data.encoding = attachment.encoding;
      }
      if (attachment.headers) {
        data.headers = attachment.headers;
      }
      return data;
    });
    if (this.mail.icalEvent) {
      eventObject = Object.assign({}, this._getIcalEvent());
      eventObject.contentType = "application/ics";
      if (!eventObject.headers) {
        eventObject.headers = {};
      }
      eventObject.filename = eventObject.filename || "invite.ics";
      eventObject.headers["Content-Disposition"] = "attachment";
      eventObject.headers["Content-Transfer-Encoding"] = "base64";
    }
    if (!findRelated) {
      return {
        attached: attachments.concat(eventObject || []),
        related: []
      };
    }
    return {
      attached: attachments.filter((attachment) => !attachment.cid).concat(eventObject || []),
      related: attachments.filter((attachment) => !!attachment.cid)
    };
  }
  /**
   * Returns the icalEvent value with `path`/`href`/data uri input normalized into
   * a `content` entry, the same way as for regular attachments. The same event is
   * included twice (as a text/calendar alternative and as an application/ics
   * attachment), so the shared content object is marked to be resolved just once
   * and the buffered result is reused by the second node.
   *
   * @returns Normalized icalEvent data
   * @internal
   */
  _getIcalEvent() {
    if (!this._icalEvent) {
      let icalEvent;
      if (isContentObject(this.mail.icalEvent)) {
        icalEvent = copyOwnKeys({}, this.mail.icalEvent);
      } else {
        icalEvent = {
          content: this.mail.icalEvent
        };
      }
      if (/^data:/i.test(icalEvent.path || icalEvent.href)) {
        icalEvent = this._processDataUrl(icalEvent);
      }
      if (/^https?:\/\//i.test(icalEvent.path)) {
        icalEvent.href = icalEvent.path;
        icalEvent.path = void 0;
      }
      if (!icalEvent.raw) {
        if (icalEvent.path) {
          icalEvent.content = {
            path: icalEvent.path
          };
          icalEvent.path = void 0;
        } else if (icalEvent.href) {
          icalEvent.content = {
            href: icalEvent.href,
            httpHeaders: icalEvent.httpHeaders,
            tls: icalEvent.tls
          };
          icalEvent.href = void 0;
        }
      }
      if (icalEvent.content && typeof icalEvent.content === "object") {
        icalEvent.content._resolve = true;
      }
      this._icalEvent = icalEvent;
    }
    return this._icalEvent;
  }
  /**
   * List alternatives. Resulting objects can be used as input for MimeNode nodes
   *
   * @returns An array of alternative elements. Includes the `text` and `html` values as well
   */
  getAlternatives() {
    const alternatives = [];
    let text, html, watchHtml, amp, eventObject;
    if (this.mail.text) {
      if (isContentObject(this.mail.text)) {
        text = this.mail.text;
      } else {
        text = {
          content: this.mail.text
        };
      }
      text.contentType = "text/plain; charset=utf-8";
    }
    if (this.mail.watchHtml) {
      if (isContentObject(this.mail.watchHtml)) {
        watchHtml = this.mail.watchHtml;
      } else {
        watchHtml = {
          content: this.mail.watchHtml
        };
      }
      watchHtml.contentType = "text/watch-html; charset=utf-8";
    }
    if (this.mail.amp) {
      if (isContentObject(this.mail.amp)) {
        amp = this.mail.amp;
      } else {
        amp = {
          content: this.mail.amp
        };
      }
      amp.contentType = "text/x-amp-html; charset=utf-8";
    }
    if (this.mail.icalEvent) {
      eventObject = Object.assign({}, this._getIcalEvent());
      eventObject.filename = false;
      eventObject.contentType = "text/calendar; charset=utf-8; method=" + (eventObject.method || "PUBLISH").toString().trim().toUpperCase();
      if (!eventObject.headers) {
        eventObject.headers = {};
      }
    }
    if (this.mail.html) {
      if (isContentObject(this.mail.html)) {
        html = this.mail.html;
      } else {
        html = {
          content: this.mail.html
        };
      }
      html.contentType = "text/html; charset=utf-8";
    }
    [].concat(text || []).concat(watchHtml || []).concat(amp || []).concat(html || []).concat(eventObject || []).concat(this.mail.alternatives || []).forEach((alternative) => {
      if (/^data:/i.test(alternative.path || alternative.href)) {
        alternative = this._processDataUrl(alternative);
      }
      const data = {
        contentType: alternative.contentType || detectMimeType2(alternative.filename || alternative.path || alternative.href || "txt"),
        contentTransferEncoding: alternative.contentTransferEncoding
      };
      if (alternative.filename) {
        data.filename = alternative.filename;
      }
      if (/^https?:\/\//i.test(alternative.path)) {
        alternative.href = alternative.path;
        alternative.path = void 0;
      }
      if (alternative.raw) {
        data.raw = alternative.raw;
      } else if (alternative.path) {
        data.content = {
          path: alternative.path
        };
      } else if (alternative.href) {
        data.content = {
          href: alternative.href,
          httpHeaders: alternative.httpHeaders,
          tls: alternative.tls
        };
      } else {
        data.content = alternative.content || "";
      }
      if (alternative.encoding) {
        data.encoding = alternative.encoding;
      }
      if (alternative.headers) {
        data.headers = alternative.headers;
      }
      alternatives.push(data);
    });
    return alternatives;
  }
  /**
   * Builds multipart/mixed node. It should always contain different type of elements on the same level
   * eg. text + attachments
   *
   * @param parentNode Parent for this note. If it does not exist, a root node is created
   * @returns MimeNode node element
   * @internal
   */
  _createMixed(parentNode) {
    const node = parentNode ? parentNode.createChild("multipart/mixed", {
      disableUrlAccess: this.mail.disableUrlAccess,
      disableFileAccess: this.mail.disableFileAccess,
      normalizeHeaderKey: this.mail.normalizeHeaderKey,
      newline: this.mail.newline
    }) : new mime_node_default("multipart/mixed", {
      baseBoundary: this.mail.baseBoundary,
      textEncoding: this.mail.textEncoding,
      boundaryPrefix: this.mail.boundaryPrefix,
      disableUrlAccess: this.mail.disableUrlAccess,
      disableFileAccess: this.mail.disableFileAccess,
      normalizeHeaderKey: this.mail.normalizeHeaderKey,
      newline: this.mail.newline
    });
    if (this._useAlternative) {
      this._createAlternative(node);
    } else if (this._useRelated) {
      this._createRelated(node);
    }
    [].concat(!this._useAlternative && this._alternatives || []).concat(this._attachments.attached || []).forEach((element) => {
      if (!this._useRelated || element !== this._htmlNode) {
        this._createContentNode(node, element);
      }
    });
    return node;
  }
  /**
   * Builds multipart/alternative node. It should always contain same type of elements on the same level
   * eg. text + html view of the same data
   *
   * @param parentNode Parent for this note. If it does not exist, a root node is created
   * @returns MimeNode node element
   * @internal
   */
  _createAlternative(parentNode) {
    const node = parentNode ? parentNode.createChild("multipart/alternative", {
      disableUrlAccess: this.mail.disableUrlAccess,
      disableFileAccess: this.mail.disableFileAccess,
      normalizeHeaderKey: this.mail.normalizeHeaderKey,
      newline: this.mail.newline
    }) : new mime_node_default("multipart/alternative", {
      baseBoundary: this.mail.baseBoundary,
      textEncoding: this.mail.textEncoding,
      boundaryPrefix: this.mail.boundaryPrefix,
      disableUrlAccess: this.mail.disableUrlAccess,
      disableFileAccess: this.mail.disableFileAccess,
      normalizeHeaderKey: this.mail.normalizeHeaderKey,
      newline: this.mail.newline
    });
    this._alternatives.forEach((alternative) => {
      if (this._useRelated && this._htmlNode === alternative) {
        this._createRelated(node);
      } else {
        this._createContentNode(node, alternative);
      }
    });
    return node;
  }
  /**
   * Builds multipart/related node. It should always contain html node with related attachments
   *
   * @param parentNode Parent for this note. If it does not exist, a root node is created
   * @returns MimeNode node element
   * @internal
   */
  _createRelated(parentNode) {
    const node = parentNode ? parentNode.createChild('multipart/related; type="text/html"', {
      disableUrlAccess: this.mail.disableUrlAccess,
      disableFileAccess: this.mail.disableFileAccess,
      normalizeHeaderKey: this.mail.normalizeHeaderKey,
      newline: this.mail.newline
    }) : new mime_node_default('multipart/related; type="text/html"', {
      baseBoundary: this.mail.baseBoundary,
      textEncoding: this.mail.textEncoding,
      boundaryPrefix: this.mail.boundaryPrefix,
      disableUrlAccess: this.mail.disableUrlAccess,
      disableFileAccess: this.mail.disableFileAccess,
      normalizeHeaderKey: this.mail.normalizeHeaderKey,
      newline: this.mail.newline
    });
    this._createContentNode(node, this._htmlNode);
    this._attachments.related.forEach((alternative) => this._createContentNode(node, alternative));
    return node;
  }
  /**
   * Creates a regular node with contents
   *
   * @param parentNode Parent for this note. If it does not exist, a root node is created
   * @param element Node data
   * @returns MimeNode node element
   * @internal
   */
  _createContentNode(parentNode, element) {
    element = element || {};
    element.content = element.content || "";
    const encoding = (element.encoding || "utf8").toString().toLowerCase().replace(/[-_\s]/g, "");
    const node = parentNode ? parentNode.createChild(element.contentType, {
      filename: element.filename,
      textEncoding: this.mail.textEncoding,
      disableUrlAccess: this.mail.disableUrlAccess,
      disableFileAccess: this.mail.disableFileAccess,
      normalizeHeaderKey: this.mail.normalizeHeaderKey,
      newline: this.mail.newline
    }) : new mime_node_default(element.contentType, {
      filename: element.filename,
      baseBoundary: this.mail.baseBoundary,
      textEncoding: this.mail.textEncoding,
      boundaryPrefix: this.mail.boundaryPrefix,
      disableUrlAccess: this.mail.disableUrlAccess,
      disableFileAccess: this.mail.disableFileAccess,
      normalizeHeaderKey: this.mail.normalizeHeaderKey,
      newline: this.mail.newline
    });
    if (element.headers) {
      node.addHeader(element.headers);
    }
    if (element.cid) {
      node.setHeader("Content-Id", "<" + element.cid.replace(/[<>]/g, "") + ">");
    }
    if (element.contentTransferEncoding) {
      node.setHeader("Content-Transfer-Encoding", element.contentTransferEncoding);
    } else if (this.mail.encoding && /^text\//i.test(element.contentType)) {
      node.setHeader("Content-Transfer-Encoding", this.mail.encoding);
    }
    if (!/^text\//i.test(element.contentType) || element.contentDisposition) {
      node.setHeader("Content-Disposition", element.contentDisposition || (element.cid && /^image\//i.test(element.contentType) ? "inline" : "attachment"));
    }
    if (typeof element.content === "string" && !["utf8", "usascii", "ascii"].includes(encoding)) {
      element.content = Buffer.from(element.content, encoding);
    }
    if (element.raw) {
      node.setRaw(element.raw);
    } else {
      node.setContent(element.content);
    }
    return node;
  }
  /**
   * Parses data uri and converts it to a Buffer
   *
   * @param element Content element
   * @return Parsed element
   * @internal
   */
  _processDataUrl(element) {
    const dataUrl = element.path || element.href;
    if (!dataUrl || typeof dataUrl !== "string") {
      return element;
    }
    if (!dataUrl.startsWith("data:")) {
      return element;
    }
    if (dataUrl.length > 52428800) {
      let detectedType = "application/octet-stream";
      const commaPos = dataUrl.indexOf(",");
      if (commaPos > 0 && commaPos < 200) {
        const header = dataUrl.substring(5, commaPos);
        const parts = header.split(";");
        if (parts[0] && parts[0].includes("/")) {
          detectedType = parts[0].trim();
        }
      }
      return Object.assign(copyOwnKeys({}, element), {
        path: false,
        href: false,
        content: Buffer.alloc(0),
        contentType: element.contentType || detectedType
      });
    }
    let parsedDataUri;
    try {
      parsedDataUri = parseDataURI(dataUrl);
    } catch (_err) {
      return element;
    }
    if (!parsedDataUri) {
      return element;
    }
    element.content = parsedDataUri.data;
    element.contentType = element.contentType || parsedDataUri.contentType;
    if ("path" in element) {
      element.path = false;
    }
    if ("href" in element) {
      element.href = false;
    }
    return element;
  }
};
var mail_composer_default = MailComposer;

// node_modules/nodemailer/dist/esm/dkim/message-parser.js
import { Transform as Transform6 } from "node:stream";
function _trimFieldName(str) {
  let start = 0;
  let end = str.length;
  while (start < end && (str.charCodeAt(start) === 32 || str.charCodeAt(start) === 9)) {
    start++;
  }
  while (end > start && (str.charCodeAt(end - 1) === 32 || str.charCodeAt(end - 1) === 9)) {
    end--;
  }
  return str.slice(start, end);
}
var MessageParser = class extends Transform6 {
  constructor(options) {
    super(options);
    this.lastBytes = Buffer.alloc(4);
    this.headersParsed = false;
    this.headerBytes = 0;
    this.headerChunks = [];
    this.rawHeaders = false;
    this.bodySize = 0;
  }
  /**
   * Keeps count of the last 4 bytes in order to detect line breaks on chunk boundaries
   *
   * @param data Next data chunk from the stream
   */
  updateLastBytes(data) {
    const lblen = this.lastBytes.length;
    const nblen = Math.min(data.length, lblen);
    for (let i = 0, len = lblen - nblen; i < len; i++) {
      this.lastBytes[i] = this.lastBytes[i + nblen];
    }
    for (let i = 1; i <= nblen; i++) {
      this.lastBytes[lblen - i] = data[data.length - i];
    }
  }
  /**
   * Finds and removes message headers from the remaining body. We want to keep
   * headers separated until final delivery to be able to modify these
   *
   * @param data Next chunk of data
   * @return Returns true if headers are already found or false otherwise
   */
  checkHeaders(data) {
    if (this.headersParsed) {
      return true;
    }
    const lblen = this.lastBytes.length;
    let headerPos = 0;
    for (let i = 0, len = this.lastBytes.length + data.length; i < len; i++) {
      let chr;
      if (i < lblen) {
        chr = this.lastBytes[i];
      } else {
        chr = data[i - lblen];
      }
      if (chr === 10 && i) {
        const pr1 = i - 1 < lblen ? this.lastBytes[i - 1] : data[i - 1 - lblen];
        const pr2 = i > 1 ? i - 2 < lblen ? this.lastBytes[i - 2] : data[i - 2 - lblen] : false;
        if (pr1 === 10) {
          this.headersParsed = true;
          headerPos = i - lblen + 1;
          this.headerBytes += headerPos;
          break;
        } else if (pr1 === 13 && pr2 === 10) {
          this.headersParsed = true;
          headerPos = i - lblen + 1;
          this.headerBytes += headerPos;
          break;
        }
      }
    }
    if (this.headersParsed) {
      this.headerChunks.push(data.slice(0, headerPos));
      this.rawHeaders = Buffer.concat(this.headerChunks, this.headerBytes);
      this.headerChunks = null;
      this.emit("headers", this.parseHeaders());
      if (data.length > headerPos) {
        const chunk = data.slice(headerPos);
        this.bodySize += chunk.length;
        this.push(chunk);
      }
      return false;
    }
    this.headerBytes += data.length;
    this.headerChunks.push(data);
    this.updateLastBytes(data);
    return false;
  }
  /** @internal */
  _transform(chunk, encoding, callback) {
    if (!chunk || !chunk.length) {
      return callback();
    }
    if (typeof chunk === "string") {
      chunk = Buffer.from(chunk, encoding);
    }
    let headersFound;
    try {
      headersFound = this.checkHeaders(chunk);
    } catch (E) {
      return callback(E);
    }
    if (headersFound) {
      this.bodySize += chunk.length;
      this.push(chunk);
    }
    callback();
  }
  /** @internal */
  _flush(callback) {
    if (this.headerChunks) {
      this.rawHeaders = Buffer.concat(this.headerChunks, this.headerBytes);
      this.headerChunks = null;
      this.emit("headers", this.parseHeaders());
    }
    callback();
  }
  parseHeaders() {
    const rawLines = (this.rawHeaders || Buffer.alloc(0)).toString("binary").split(/\r?\n/);
    const lines = [];
    for (const rawLine of rawLines) {
      if (lines.length && /^[ \t]/.test(rawLine)) {
        lines[lines.length - 1] += "\n" + rawLine;
      } else {
        lines.push(rawLine);
      }
    }
    return lines.filter((line) => /[^ \t\r]/.test(line)).map((line) => ({
      key: _trimFieldName(line.substr(0, line.indexOf(":"))).toLowerCase(),
      line
    }));
  }
};
var message_parser_default = MessageParser;

// node_modules/nodemailer/dist/esm/dkim/relaxed-body.js
import { Transform as Transform7 } from "node:stream";
import crypto2 from "node:crypto";
var CHAR_CR = 13;
var CHAR_LF = 10;
var CHAR_SPACE = 32;
var CHAR_TAB = 9;
var CRLF = Buffer.from("\r\n");
var EMPTY_LINES = Buffer.alloc(4096, CRLF);
var RelaxedBody = class extends Transform7 {
  constructor(options) {
    super();
    options = options || {};
    this.bodyHash = crypto2.createHash(options.hashAlgo || "sha256");
    this.byteLength = 0;
    this.debug = options.debug;
    this._debugBody = options.debug ? [] : false;
    this._lineHasContent = false;
    this._pendingWsp = false;
    this._pendingCr = false;
    this._pendingEmptyLines = 0;
  }
  /** @internal */
  _hashCanonical(data) {
    if (!data.length) {
      return;
    }
    this.bodyHash.update(data);
    if (this._debugBody) {
      this._debugBody.push(Buffer.from(data));
    }
  }
  /** @internal */
  _hashEmptyLines() {
    while (this._pendingEmptyLines > 0) {
      const count = Math.min(this._pendingEmptyLines, EMPTY_LINES.length / 2);
      this._hashCanonical(EMPTY_LINES.subarray(0, count * 2));
      this._pendingEmptyLines -= count;
    }
  }
  /**
   * Writes a content byte, with the space a pending run of whitespace collapses to,
   * into the output buffer and returns the new write position. Kept a method rather
   * than a closure so the write position stays a plain local in the byte loop
   * @internal
   */
  _emitContent(out, outPos, c) {
    if (!this._lineHasContent) {
      if (this._pendingEmptyLines) {
        this._hashCanonical(out.subarray(0, outPos));
        outPos = 0;
        this._hashEmptyLines();
      }
      this._lineHasContent = true;
    }
    if (this._pendingWsp) {
      out[outPos++] = CHAR_SPACE;
      this._pendingWsp = false;
    }
    out[outPos++] = c;
    return outPos;
  }
  updateHash(chunk, final) {
    const out = Buffer.allocUnsafe(chunk.length * 2 + 2);
    let outPos = 0;
    for (let i = 0; i < chunk.length; i++) {
      const c = chunk[i];
      if (c === CHAR_LF) {
        if (this._lineHasContent) {
          out[outPos++] = CHAR_CR;
          out[outPos++] = CHAR_LF;
          this._lineHasContent = false;
        } else {
          this._pendingEmptyLines++;
        }
        this._pendingWsp = false;
        this._pendingCr = false;
        continue;
      }
      if (this._pendingCr) {
        outPos = this._emitContent(out, outPos, CHAR_CR);
        this._pendingCr = false;
      }
      if (c === CHAR_CR) {
        this._pendingCr = true;
      } else if (c === CHAR_SPACE || c === CHAR_TAB) {
        this._pendingWsp = true;
      } else {
        outPos = this._emitContent(out, outPos, c);
      }
    }
    if (final && this._pendingCr) {
      outPos = this._emitContent(out, outPos, CHAR_CR);
      this._pendingCr = false;
    }
    this._hashCanonical(out.subarray(0, outPos));
  }
  /** @internal */
  _transform(chunk, encoding, callback) {
    if (!chunk || !chunk.length) {
      return callback();
    }
    if (typeof chunk === "string") {
      chunk = Buffer.from(chunk, encoding);
    }
    this.updateHash(chunk);
    this.byteLength += chunk.length;
    this.push(chunk);
    callback();
  }
  /** @internal */
  _flush(callback) {
    this.updateHash(Buffer.alloc(0), true);
    if (this._lineHasContent) {
      this._hashCanonical(CRLF);
    }
    this.emit("hash", this.bodyHash.digest("base64"), this.debug ? Buffer.concat(this._debugBody) : false);
    callback();
  }
};
var relaxed_body_default = RelaxedBody;

// node_modules/nodemailer/dist/esm/dkim/sign.js
import crypto3 from "node:crypto";
function unsupportedHashAlgoError(hashAlgo) {
  const err = new Error('Unsupported DKIM hash algorithm "' + hashAlgo + '"');
  err.code = ECONFIG;
  return err;
}
function sign(headers, hashAlgo, bodyHash, options) {
  options = options || {};
  const defaultFieldNames = "From:Sender:Reply-To:Subject:Date:Message-ID:To:Cc:MIME-Version:Content-Type:Content-Transfer-Encoding:Content-ID:Content-Description:Resent-Date:Resent-From:Resent-Sender:Resent-To:Resent-Cc:Resent-Message-ID:In-Reply-To:References:List-Id:List-Help:List-Unsubscribe:List-Subscribe:List-Post:List-Owner:List-Archive";
  const fieldNames = options.headerFieldNames || defaultFieldNames;
  const canonicalizedHeaderData = relaxedHeaders(headers, fieldNames, options.skipFields);
  const dkimHeader = generateDKIMHeader(options.domainName, options.keySelector, canonicalizedHeaderData.fieldNames, hashAlgo, bodyHash);
  canonicalizedHeaderData.headers += "dkim-signature:" + relaxedHeaderLine(dkimHeader);
  let signer;
  try {
    signer = crypto3.createSign(("rsa-" + hashAlgo).toUpperCase());
  } catch (_E) {
    throw unsupportedHashAlgoError(hashAlgo);
  }
  signer.update(canonicalizedHeaderData.headers, "latin1");
  let signature;
  try {
    signature = signer.sign(options.privateKey, "base64");
  } catch (_E) {
    return false;
  }
  return dkimHeader + signature.replace(/(^.{73}|.{75}(?!\r?\n|\r))/g, "$&\r\n ").trim();
}
sign.relaxedHeaders = relaxedHeaders;
sign.unsupportedHashAlgoError = unsupportedHashAlgoError;
var sign_default = sign;
function generateDKIMHeader(domainName, keySelector, fieldNames, hashAlgo, bodyHash) {
  const cleanTagValue = (value) => (value || "").toString().replace(/[\x00-\x1f\x7f;=]/g, "");
  const dkim = [
    "v=1",
    "a=rsa-" + hashAlgo,
    "c=relaxed/relaxed",
    "d=" + toASCII(cleanTagValue(domainName)),
    "q=dns/txt",
    "s=" + cleanTagValue(keySelector),
    "bh=" + bodyHash,
    "h=" + cleanTagValue(fieldNames)
  ].join("; ");
  return foldLines2("DKIM-Signature: " + dkim, 76) + ";\r\n b=";
}
function relaxedHeaders(headers, fieldNames, skipFields) {
  const includedFields = /* @__PURE__ */ new Set();
  const skip = /* @__PURE__ */ new Set();
  const headerFields = /* @__PURE__ */ new Map();
  (skipFields || "").toLowerCase().split(":").forEach((field) => {
    skip.add(field.trim());
  });
  (fieldNames || "").toLowerCase().split(":").filter((field) => !skip.has(field.trim())).forEach((field) => {
    includedFields.add(field.trim());
  });
  for (let i = headers.length - 1; i >= 0; i--) {
    const line = headers[i];
    if (includedFields.has(line.key) && !headerFields.has(line.key)) {
      headerFields.set(line.key, relaxedHeaderLine(line.line));
    }
  }
  const headersList = [];
  const fields = [];
  includedFields.forEach((field) => {
    if (headerFields.has(field)) {
      fields.push(field);
      headersList.push(field + ":" + headerFields.get(field));
    }
  });
  return {
    headers: headersList.join("\r\n") + "\r\n",
    fieldNames: fields.join(":")
  };
}
function relaxedHeaderLine(line) {
  return line.substr(line.indexOf(":") + 1).replace(/\r?\n/g, "").replace(/[ \t]+/g, " ").replace(/^ | $/g, "");
}

// node_modules/nodemailer/dist/esm/dkim/index.js
import { PassThrough as PassThrough3 } from "node:stream";
import fs3 from "node:fs";
import path2 from "node:path";
import crypto4 from "node:crypto";
var DKIM_ALGO = "sha256";
var MAX_MESSAGE_SIZE = 10 * 1024 * 1024;
var DKIMSigner = class {
  constructor(options, keys, input, output) {
    this.options = options || {};
    this.keys = keys;
    this.cacheTreshold = Number(this.options.cacheTreshold) || MAX_MESSAGE_SIZE;
    this.hashAlgo = this.options.hashAlgo || DKIM_ALGO;
    this.cacheDir = this.options.cacheDir || false;
    this.chunks = [];
    this.chunklen = 0;
    this.readPos = 0;
    this.cachePath = this.cacheDir ? path2.join(this.cacheDir, "message." + Date.now() + "-" + crypto4.randomBytes(14).toString("hex")) : false;
    this.cache = false;
    this.headers = false;
    this.bodyHash = false;
    this.parser = false;
    this.relaxedBody = false;
    this.input = input;
    this.output = output;
    this.output.usingCache = false;
    this.hasErrored = false;
    this.input.on("error", (err) => this.fail(err));
    this.output.once("close", () => {
      if (this.output.writableFinished) {
        return;
      }
      this.hasErrored = true;
      this.input.unpipe();
      this.input.destroy();
      this.cleanup();
    });
  }
  /**
   * Ends the output with an error and releases the cache file
   */
  fail(err) {
    this.hasErrored = true;
    this.cleanup();
    this.output.destroy(err);
  }
  cleanup() {
    if (!this.cache || !this.cachePath) {
      return;
    }
    const cache = this.cache;
    this.cache = false;
    cache.destroy();
    fs3.unlink(this.cachePath, () => false);
  }
  createReadCache() {
    this.cache = fs3.createReadStream(this.cachePath);
    this.cache.once("error", (err) => this.fail(err));
    this.cache.once("close", () => {
      this.cleanup();
    });
    this.cache.pipe(this.output);
  }
  sendNextChunk() {
    while (!this.hasErrored) {
      if (this.readPos >= this.chunks.length) {
        if (!this.cache) {
          this.output.end();
          return;
        }
        return this.createReadCache();
      }
      const chunk = this.chunks[this.readPos++];
      if (this.output.write(chunk) === false) {
        this.output.once("drain", () => {
          this.sendNextChunk();
        });
        return;
      }
    }
  }
  sendSignedOutput() {
    if (this.hasErrored) {
      return;
    }
    let keyPos = 0;
    const signNextKey = () => {
      if (keyPos >= this.keys.length) {
        this.output.write(this.parser.rawHeaders);
        setImmediate(() => this.sendNextChunk());
        return;
      }
      const key = this.keys[keyPos++];
      let dkimField;
      try {
        dkimField = sign_default(this.headers, this.hashAlgo, this.bodyHash, {
          domainName: key.domainName,
          keySelector: key.keySelector,
          privateKey: key.privateKey,
          headerFieldNames: this.options.headerFieldNames,
          skipFields: this.options.skipFields
        });
      } catch (err) {
        this.fail(err);
        return;
      }
      if (dkimField) {
        this.output.write(Buffer.from(dkimField + "\r\n"));
      }
      setImmediate(signNextKey);
    };
    if (this.bodyHash && this.headers) {
      return signNextKey();
    }
    this.output.write(this.parser.rawHeaders);
    this.sendNextChunk();
  }
  createWriteCache() {
    this.output.usingCache = true;
    this.cache = fs3.createWriteStream(this.cachePath);
    this.cache.once("error", (err) => {
      this.relaxedBody.unpipe(this.cache);
      this.relaxedBody.on("readable", () => {
        while (this.relaxedBody.read() !== null) {
        }
      });
      this.fail(err);
    });
    this.cache.once("close", () => {
      if (this.hasErrored) {
        return;
      }
      this.sendSignedOutput();
    });
    this.relaxedBody.removeAllListeners("readable");
    this.relaxedBody.pipe(this.cache);
  }
  signStream() {
    this.parser = new message_parser_default();
    this.relaxedBody = new relaxed_body_default({
      hashAlgo: this.hashAlgo
    });
    this.parser.on("headers", (value) => {
      this.headers = value;
    });
    this.relaxedBody.on("hash", (value) => {
      this.bodyHash = value;
    });
    this.relaxedBody.on("readable", () => {
      let chunk;
      if (this.cache) {
        return;
      }
      while ((chunk = this.relaxedBody.read()) !== null) {
        this.chunks.push(chunk);
        this.chunklen += chunk.length;
        if (this.chunklen >= this.cacheTreshold && this.cachePath) {
          return this.createWriteCache();
        }
      }
    });
    this.relaxedBody.on("end", () => {
      if (this.cache) {
        return;
      }
      this.sendSignedOutput();
    });
    this.parser.pipe(this.relaxedBody);
    setImmediate(() => this.input.pipe(this.parser));
  }
};
var DKIM = class {
  constructor(options) {
    this.options = options || {};
    this.keys = [].concat(this.options.keys || {
      domainName: options.domainName,
      keySelector: options.keySelector,
      privateKey: options.privateKey
    });
  }
  sign(input, extraOptions) {
    const output = new PassThrough3();
    let inputStream = input;
    let writeValue = false;
    if (Buffer.isBuffer(input)) {
      writeValue = input;
      inputStream = new PassThrough3();
    } else if (typeof input === "string") {
      writeValue = Buffer.from(input);
      inputStream = new PassThrough3();
    }
    let options = this.options;
    if (extraOptions && Object.keys(extraOptions).length) {
      options = copyOwnKeys({}, extraOptions);
      copyOwnKeys(options, this.options);
    }
    const signer = new DKIMSigner(options, this.keys, inputStream, output);
    setImmediate(() => {
      try {
        signer.signStream();
      } catch (_E) {
        signer.fail(sign_default.unsupportedHashAlgoError(signer.hashAlgo));
        return;
      }
      if (writeValue) {
        setImmediate(() => {
          inputStream.end(writeValue);
        });
      }
    });
    return output;
  }
};
var dkim_default = DKIM;

// node_modules/nodemailer/dist/esm/smtp-connection/http-proxy-client.js
import net5 from "node:net";
import tls from "node:tls";
var MAX_RESPONSE_HEADER_BYTES = 64 * 1024;
var unbracket = (host) => typeof host === "string" && host.startsWith("[") && host.endsWith("]") ? host.slice(1, -1) : host;
function httpProxyClient(proxyUrl, destinationPort, destinationHost, tlsOptions, callback) {
  if (typeof tlsOptions === "function") {
    callback = tlsOptions;
    tlsOptions = {};
  }
  tlsOptions = tlsOptions || {};
  const done = callback;
  destinationPort = Number(destinationPort) || 0;
  if (!destinationPort || /[\r\n]/.test(destinationHost)) {
    const err = new Error("Invalid proxy destination");
    err.code = EPROXY;
    setImmediate(() => done(err));
    return;
  }
  const proxy = parse(proxyUrl);
  const authority = (net5.isIPv6(unbracket(destinationHost)) ? "[" + unbracket(destinationHost) + "]" : destinationHost) + ":" + destinationPort;
  const connectOptions = {
    host: proxy.hostname,
    port: Number(proxy.port) ? Number(proxy.port) : proxy.protocol === "https:" ? 443 : 80
  };
  let connect;
  if (proxy.protocol === "https:") {
    connectOptions.rejectUnauthorized = tlsOptions.rejectUnauthorized !== false;
    connect = tls.connect.bind(tls);
  } else {
    connect = net5.connect.bind(net5);
  }
  const timeout = Number(tlsOptions.timeout) || httpProxyClient.timeout || 30 * 1e3;
  let socket;
  let finished3 = false;
  let timer;
  const cleanup = () => {
    clearTimeout(timer);
    socket.removeListener("data", onSocketData);
    socket.removeListener("error", fail);
    socket.removeListener("close", onEarlyClose);
  };
  function fail(err) {
    if (finished3) {
      return;
    }
    finished3 = true;
    cleanup();
    try {
      socket.destroy();
    } catch (_E) {
    }
    done(err);
  }
  function onEarlyClose() {
    const err = new Error("Proxy closed the connection before the tunnel was established");
    err.code = EPROXY;
    fail(err);
  }
  const chunks = [];
  let received = 0;
  let tail = "";
  function onSocketData(chunk) {
    if (finished3) {
      return;
    }
    const window = tail + chunk.toString("binary");
    const windowEnd = window.indexOf("\r\n\r\n");
    chunks.push(chunk);
    received += chunk.length;
    tail = window.slice(-3);
    if (windowEnd < 0) {
      if (received > MAX_RESPONSE_HEADER_BYTES) {
        const err = new Error("Proxy response headers too large");
        err.code = EPROXY;
        fail(err);
      }
      return;
    }
    socket.removeListener("data", onSocketData);
    socket.pause();
    const headerEnd = received - window.length + windowEnd;
    const response = Buffer.concat(chunks, received);
    if (response.length > headerEnd + 4) {
      socket.unshift(response.subarray(headerEnd + 4));
    }
    const match = response.toString("binary", 0, headerEnd).match(/^HTTP\/\d+\.\d+ (\d+)/i);
    if (!match || (match[1] || "").charAt(0) !== "2") {
      const err = new Error("Invalid response from proxy" + (match && ": " + match[1] || ""));
      err.code = EPROXY;
      return fail(err);
    }
    finished3 = true;
    cleanup();
    const resumeOnData = (event) => {
      if (event === "data") {
        socket.removeListener("newListener", resumeOnData);
        socket.resume();
      }
    };
    socket.on("newListener", resumeOnData);
    return done(null, socket);
  }
  socket = connect(connectOptions, () => {
    if (finished3) {
      return;
    }
    const reqHeaders = {
      Host: authority,
      Connection: "close"
    };
    if (proxy.auth) {
      reqHeaders["Proxy-Authorization"] = "Basic " + Buffer.from(proxy.auth).toString("base64");
    }
    socket.write(
      // HTTP method
      "CONNECT " + authority + " HTTP/1.1\r\n" + // HTTP request headers
      Object.keys(reqHeaders).map((key) => key + ": " + reqHeaders[key]).join("\r\n") + // End request
      "\r\n\r\n"
    );
    socket.on("data", onSocketData);
  });
  timer = setTimeout(() => {
    const err = new Error("Proxy socket timed out");
    err.code = ETIMEDOUT;
    fail(err);
  }, timeout);
  socket.once("error", fail);
  socket.once("close", onEarlyClose);
}
var http_proxy_client_default = httpProxyClient;

// node_modules/nodemailer/dist/esm/mailer/index.js
import util2 from "node:util";

// node_modules/nodemailer/dist/esm/mailer/mail-message.js
var hasOwn = (obj, key) => Object.prototype.hasOwnProperty.call(obj, key);
var MailMessage = class {
  constructor(mailer, data) {
    this.mailer = mailer;
    this.data = {};
    this.message = null;
    data = data || {};
    const options = mailer.options || {};
    const defaults = mailer._defaults || {};
    copyOwnKeys(this.data, data);
    this.data.headers = this.data.headers || {};
    copyOwnKeys(this.data, defaults, (key) => hasOwn(this.data, key));
    copyOwnKeys(this.data.headers, defaults.headers, (key) => hasOwn(this.data.headers, key));
    ["disableFileAccess", "disableUrlAccess", "normalizeHeaderKey", "maxRecipients"].forEach((key) => {
      if (key in options) {
        this.data[key] = options[key];
      }
    });
    ["disableFileAccess", "disableUrlAccess"].forEach((key) => {
      if (!(key in options) && hasOwn(defaults, key)) {
        this.data[key] = this.data[key] || defaults[key];
      }
    });
  }
  resolveContent(data, key, options, callback) {
    if (!callback && typeof options === "function") {
      callback = options;
      options = false;
    }
    options = options || {};
    const policy = {
      disableFileAccess: this.data.disableFileAccess || options.disableFileAccess,
      disableUrlAccess: this.data.disableUrlAccess || options.disableUrlAccess
    };
    return resolveContent(data, key, policy, callback);
  }
  resolveAll(callback) {
    const keys = [
      [this.data, "html"],
      [this.data, "text"],
      [this.data, "watchHtml"],
      [this.data, "amp"],
      [this.data, "icalEvent"]
    ];
    if (this.data.alternatives && this.data.alternatives.length) {
      this.data.alternatives.forEach((alternative, i) => {
        keys.push([this.data.alternatives, i]);
      });
    }
    if (this.data.attachments && this.data.attachments.length) {
      this.data.attachments.forEach((attachment, i) => {
        if (!attachment.filename) {
          attachment.filename = (attachment.path || attachment.href || "").split(/[/\\]/).pop().split("?").shift() || "attachment-" + (i + 1);
          if (attachment.filename.indexOf(".") < 0) {
            attachment.filename += "." + detectExtension2(attachment.contentType);
          }
        }
        if (!attachment.contentType) {
          attachment.contentType = detectMimeType2(attachment.filename || attachment.path || attachment.href || "bin");
        }
        keys.push([this.data.attachments, i]);
      });
    }
    const mimeNode = new mime_node_default();
    const addressKeys = ["from", "to", "cc", "bcc", "sender", "replyTo"];
    addressKeys.forEach((address) => {
      let value;
      if (this.message) {
        value = [].concat(mimeNode._parseAddresses(this.message.getHeader(address === "replyTo" ? "reply-to" : address)) || []);
      } else if (this.data[address]) {
        value = [].concat(mimeNode._parseAddresses(this.data[address]) || []);
      }
      if (value && value.length) {
        this.data[address] = value;
      } else if (address in this.data) {
        this.data[address] = null;
      }
    });
    const singleKeys = ["from", "sender"];
    singleKeys.forEach((address) => {
      if (this.data[address]) {
        this.data[address] = this.data[address].shift();
      }
    });
    let pos = 0;
    const resolveNext = () => {
      if (pos >= keys.length) {
        return callback(null, this.data);
      }
      const args = keys[pos++];
      if (!args[0] || !args[0][args[1]]) {
        return resolveNext();
      }
      resolveContent(...args, { disableFileAccess: this.data.disableFileAccess, disableUrlAccess: this.data.disableUrlAccess }, (err, value) => {
        if (err) {
          return callback(err);
        }
        const node = {
          content: value
        };
        if (args[0][args[1]] && typeof args[0][args[1]] === "object" && !Buffer.isBuffer(args[0][args[1]])) {
          copyOwnKeys(node, args[0][args[1]], (key) => key in node || ["content", "path", "href", "raw"].includes(key));
        }
        args[0][args[1]] = node;
        resolveNext();
      });
    };
    setImmediate(() => resolveNext());
  }
  /**
   * Destroys the content streams of the message once sending failed. A stream that was not
   * read to the end would otherwise keep the file or the socket behind it open
   */
  releaseStreams() {
    const data = this.data;
    const values = [data.html, data.text, data.watchHtml, data.amp, data.raw, data.icalEvent];
    for (const key of ["attachments", "alternatives"]) {
      if (Array.isArray(data[key])) {
        values.push(...data[key]);
      }
    }
    for (const value of values) {
      if (value && typeof value === "object") {
        destroyStream(value);
        destroyStream(value.content);
        destroyStream(value.raw);
      }
    }
  }
  normalize(callback) {
    const envelope = this.message.getEnvelope();
    const messageId = this.message.messageId();
    this.resolveAll((err, data) => {
      if (err) {
        return callback(err);
      }
      data.envelope = envelope;
      data.messageId = messageId;
      ["html", "text", "watchHtml", "amp"].forEach((key) => {
        if (data[key] && data[key].content) {
          if (typeof data[key].content === "string") {
            data[key] = data[key].content;
          } else if (Buffer.isBuffer(data[key].content)) {
            data[key] = data[key].content.toString();
          }
        }
      });
      if (data.icalEvent && Buffer.isBuffer(data.icalEvent.content)) {
        data.icalEvent.content = data.icalEvent.content.toString("base64");
        data.icalEvent.encoding = "base64";
      }
      if (data.alternatives && data.alternatives.length) {
        data.alternatives.forEach((alternative) => {
          if (alternative && alternative.content && Buffer.isBuffer(alternative.content)) {
            alternative.content = alternative.content.toString("base64");
            alternative.encoding = "base64";
          }
        });
      }
      if (data.attachments && data.attachments.length) {
        data.attachments.forEach((attachment) => {
          if (attachment && attachment.content && Buffer.isBuffer(attachment.content)) {
            attachment.content = attachment.content.toString("base64");
            attachment.encoding = "base64";
          }
        });
      }
      data.normalizedHeaders = {};
      Object.keys(data.headers || {}).forEach((key) => {
        if (isProtoKey(key)) {
          return;
        }
        let value = [].concat(data.headers[key] || []).shift();
        value = value && value.value || value;
        if (value) {
          if (["references", "in-reply-to", "message-id", "content-id"].includes(key)) {
            value = this.message._encodeHeaderValue(key, value);
          }
          data.normalizedHeaders[key] = value;
        }
      });
      if (data.list && typeof data.list === "object") {
        const listHeaders = this._getListHeaders(data.list);
        listHeaders.forEach((entry) => {
          data.normalizedHeaders[entry.key] = entry.value.map((val) => val && val.value || val).join(", ");
        });
      }
      if (data.references) {
        data.normalizedHeaders.references = this.message._encodeHeaderValue("references", data.references);
      }
      if (data.inReplyTo) {
        data.normalizedHeaders["in-reply-to"] = this.message._encodeHeaderValue("in-reply-to", data.inReplyTo);
      }
      return callback(null, data);
    });
  }
  setMailerHeader() {
    if (!this.message || !this.data.xMailer) {
      return;
    }
    this.message.setHeader("X-Mailer", this.data.xMailer);
  }
  setPriorityHeaders() {
    if (!this.message || !this.data.priority) {
      return;
    }
    switch ((this.data.priority || "").toString().toLowerCase()) {
      case "high":
        this.message.setHeader("X-Priority", "1 (Highest)");
        this.message.setHeader("X-MSMail-Priority", "High");
        this.message.setHeader("Importance", "High");
        break;
      case "low":
        this.message.setHeader("X-Priority", "5 (Lowest)");
        this.message.setHeader("X-MSMail-Priority", "Low");
        this.message.setHeader("Importance", "Low");
        break;
      default:
    }
  }
  setListHeaders() {
    if (!this.message || !this.data.list || typeof this.data.list !== "object") {
      return;
    }
    this._getListHeaders(this.data.list).forEach((listHeader) => {
      listHeader.value.forEach((value) => {
        this.message.addHeader(listHeader.key, value);
      });
    });
  }
  /** @internal */
  _getListHeaders(listData) {
    return Object.keys(listData).map((key) => ({
      key: "list-" + key.toLowerCase().trim(),
      value: [].concat(listData[key] || []).map((value) => ({
        prepared: true,
        foldLines: true,
        value: [].concat(value || []).map((value2) => {
          if (typeof value2 === "string") {
            value2 = {
              url: value2
            };
          }
          if (value2 && value2.url) {
            let comment = (value2.comment || "").toString().replace(/\r?\n|\r/g, " ");
            const needsEncoding = !isPlainText(comment) || /\x7f/.test(comment);
            if (key.toLowerCase().trim() === "id") {
              comment = needsEncoding ? encodeWord(comment) : quoteString(comment);
              return (value2.comment ? comment + " " : "") + this._formatListUrl(value2.url).replace(/^<[^:]+:\/{0,2}/, "<");
            }
            comment = needsEncoding ? encodeWord(comment) : comment.replace(/[()\\]/g, "\\$&");
            return this._formatListUrl(value2.url) + (value2.comment ? " (" + comment + ")" : "");
          }
          return "";
        }).filter((value2) => value2).join(", ")
      }))
    }));
  }
  /** @internal */
  _formatListUrl(url) {
    url = url.replace(/[\x00-\x08\x0b\x0c\x0e-\x1f\x7f]/g, "").replace(/[\s<]+|[\s>]+/g, "");
    if (/^(https?|mailto|ftp):/.test(url)) {
      return "<" + url + ">";
    }
    if (/^[^@]+@[^@]+$/.test(url)) {
      return "<mailto:" + url + ">";
    }
    return "<http://" + url + ">";
  }
};

// node_modules/nodemailer/dist/esm/mailer/index.js
import net6 from "node:net";
import dns2 from "node:dns";
import crypto5 from "node:crypto";
var DEFAULT_MAX_RECIPIENTS = 1e5;
var Mail = class extends EventEmitter {
  constructor(transporter, options, defaults) {
    super();
    this.options = options || {};
    this._defaults = defaults || {};
    this._defaultPlugins = {
      compile: [(...args) => this._convertDataImages(...args)],
      stream: []
    };
    this._userPlugins = {
      compile: [],
      stream: []
    };
    this.meta = /* @__PURE__ */ new Map();
    this.dkim = this.options.dkim ? new dkim_default(this.options.dkim) : false;
    this.transporter = transporter;
    this.transporter.mailer = this;
    this.logger = getLogger(this.options, {
      component: this.options.component || "mail"
    });
    this.logger.debug({
      tnx: "create"
    }, "Creating transport: %s", this.getVersionString());
    if (typeof this.transporter.on === "function") {
      this.transporter.on("log", (log) => {
        this.logger.debug({
          tnx: "transport"
        }, "%s: %s", log.type, log.message);
      });
      this.transporter.on("error", (err) => {
        this.logger.error({
          err,
          tnx: "transport"
        }, "Transport Error: %s", err.message);
        this.emit("error", err);
      });
      this.transporter.on("idle", (...args) => {
        this.emit("idle", ...args);
      });
      this.transporter.on("clear", (...args) => {
        this.emit("clear", ...args);
      });
    }
    ["close", "isIdle", "verify"].forEach((method) => {
      this[method] = (...args) => {
        if (typeof this.transporter[method] === "function") {
          if (method === "verify" && typeof this.getSocket === "function") {
            this.transporter.getSocket = this.getSocket;
            this.getSocket = false;
          }
          return this.transporter[method](...args);
        }
        this.logger.warn({
          tnx: "transport",
          methodName: method
        }, "Non existing method %s called for transport", method);
        return false;
      };
    });
    if (this.options.proxy && typeof this.options.proxy === "string") {
      this.setupProxy(this.options.proxy);
    }
  }
  use(step, plugin) {
    step = (step || "").toString();
    if (!this._userPlugins.hasOwnProperty(step)) {
      this._userPlugins[step] = [plugin];
    } else {
      this._userPlugins[step].push(plugin);
    }
    return this;
  }
  sendMail(data, callback = null) {
    let promise;
    if (!callback) {
      promise = new Promise((resolve3, reject) => {
        callback = callbackPromise(resolve3, reject);
      });
    }
    const done = callback;
    if (typeof this.getSocket === "function") {
      this.transporter.getSocket = this.getSocket;
      this.getSocket = false;
    }
    const mail = new MailMessage(this, data);
    const fail = (err) => {
      mail.releaseStreams();
      done(err);
    };
    this.logger.debug({
      tnx: "transport",
      name: this.transporter.name,
      version: this.transporter.version,
      action: "send"
    }, "Sending mail using %s/%s", this.transporter.name, this.transporter.version);
    this._processPlugins("compile", mail, (err) => {
      if (err) {
        this.logger.error({
          err,
          tnx: "plugin",
          action: "compile"
        }, "PluginCompile Error: %s", err.message);
        return fail(err);
      }
      let recipientCount;
      try {
        mail.message = new mail_composer_default(mail.data).compile();
        mail.setMailerHeader();
        mail.setPriorityHeaders();
        mail.setListHeaders();
        recipientCount = mail.message.getEnvelope().to.length;
      } catch (err2) {
        this.logger.error({
          err: err2,
          tnx: "transport",
          action: "send"
        }, "Compile Error: %s", err2.message);
        return fail(err2);
      }
      const maxRecipients = mail.data.maxRecipients === void 0 ? DEFAULT_MAX_RECIPIENTS : mail.data.maxRecipients;
      if (maxRecipients && recipientCount > maxRecipients) {
        const err2 = new Error(`Message has ${recipientCount} recipients, which is over the ${maxRecipients} allowed by maxRecipients`);
        err2.code = EMAXRECIPIENTS;
        this.logger.error({
          err: err2,
          tnx: "transport",
          action: "send"
        }, "Send Error: %s", err2.message);
        return fail(err2);
      }
      this._processPlugins("stream", mail, (err2) => {
        if (err2) {
          this.logger.error({
            err: err2,
            tnx: "plugin",
            action: "stream"
          }, "PluginStream Error: %s", err2.message);
          return fail(err2);
        }
        if (mail.data.dkim || this.dkim) {
          mail.message.processFunc((input) => {
            const dkim = mail.data.dkim ? new dkim_default(mail.data.dkim) : this.dkim;
            this.logger.debug({
              tnx: "DKIM",
              messageId: mail.message.messageId(),
              dkimDomains: dkim.keys.map((key) => key.keySelector + "." + key.domainName).join(", ")
            }, "Signing outgoing message with %s keys", dkim.keys.length);
            return dkim.sign(input, mail.data._dkim);
          });
        }
        this.transporter.send(mail, (...args) => {
          if (args[0]) {
            mail.releaseStreams();
            this.logger.error({
              err: args[0],
              tnx: "transport",
              action: "send"
            }, "Send Error: %s", args[0].message);
          }
          done(...args);
        });
      });
    });
    return promise;
  }
  getVersionString() {
    return util2.format("%s (%s; +%s; %s/%s)", name, version2, homepage, this.transporter.name, this.transporter.version);
  }
  /** @internal */
  _processPlugins(step, mail, callback) {
    step = (step || "").toString();
    if (!this._userPlugins.hasOwnProperty(step)) {
      return callback();
    }
    const userPlugins = this._userPlugins[step] || [];
    const defaultPlugins = this._defaultPlugins[step] || [];
    if (userPlugins.length) {
      this.logger.debug({
        tnx: "transaction",
        pluginCount: userPlugins.length,
        step
      }, "Using %s plugins for %s", userPlugins.length, step);
    }
    if (userPlugins.length + defaultPlugins.length === 0) {
      return callback();
    }
    let pos = 0;
    let block = "default";
    const processPlugins = () => {
      let curplugins = block === "default" ? defaultPlugins : userPlugins;
      if (pos >= curplugins.length) {
        if (block === "default" && userPlugins.length) {
          block = "user";
          pos = 0;
          curplugins = userPlugins;
        } else {
          return callback();
        }
      }
      const plugin = curplugins[pos++];
      plugin(mail, (err) => {
        if (err) {
          return callback(err);
        }
        processPlugins();
      });
    };
    processPlugins();
  }
  /**
   * Sets up proxy handler for a Nodemailer object
   *
   * @param proxyUrl Proxy configuration url
   */
  setupProxy(proxyUrl) {
    const proxy = parse(proxyUrl);
    this.getSocket = (options, callback) => {
      const protocol = proxy.protocol.replace(/:$/, "").toLowerCase();
      const configuredTimeout = Number(this.options.connectionTimeout) || 0;
      const connectStartedAt = Number(options.connectStartedAt) || Date.now();
      const connectionTimeout = configuredTimeout ? Math.max(connectStartedAt + configuredTimeout - Date.now(), 1) : void 0;
      if (this.meta.has("proxy_handler_" + protocol)) {
        return this.meta.get("proxy_handler_" + protocol)(proxy, options, callback);
      }
      switch (protocol) {
        // Connect using a HTTP CONNECT method
        case "http":
        case "https":
          http_proxy_client_default(proxy.href, options.port, options.host, connectionTimeout ? Object.assign({}, this.options.tls, { timeout: connectionTimeout }) : this.options.tls || {}, (err2, socket) => {
            if (err2) {
              return callback(err2);
            }
            return callback(null, {
              connection: socket
            });
          });
          return;
        case "socks":
        case "socks5":
        case "socks4":
        case "socks4a": {
          if (!this.meta.has("proxy_socks_module")) {
            let err2 = new Error("Socks module not loaded");
            err2.code = EPROXY;
            return callback(err2);
          }
          const connect = (ipaddress) => {
            const proxyV2 = !!this.meta.get("proxy_socks_module").SocksClient;
            const socksClient = proxyV2 ? this.meta.get("proxy_socks_module").SocksClient : this.meta.get("proxy_socks_module");
            const proxyType = Number(proxy.protocol.replace(/\D/g, "")) || 5;
            const connectionOpts = {
              proxy: {
                ipaddress,
                port: Number(proxy.port),
                type: proxyType
              },
              [proxyV2 ? "destination" : "target"]: {
                host: options.host,
                port: options.port
              },
              command: "connect"
            };
            if (connectionTimeout) {
              connectionOpts.timeout = connectionTimeout;
            }
            if (proxy.username || proxy.password) {
              const username = proxy.username || "";
              const password = proxy.password || "";
              if (proxyV2) {
                connectionOpts.proxy.userId = username;
                connectionOpts.proxy.password = password;
              } else if (proxyType === 4) {
                connectionOpts.userid = username;
              } else {
                connectionOpts.authentication = {
                  username,
                  password
                };
              }
            }
            socksClient.createConnection(connectionOpts, (err2, info) => {
              if (err2) {
                return callback(err2);
              }
              return callback(null, {
                connection: info.socket || info
              });
            });
          };
          if (net6.isIP(proxy.hostname)) {
            return connect(proxy.hostname);
          }
          return dns2.lookup(proxy.hostname, (err2, address) => {
            if (err2) {
              return callback(err2);
            }
            connect(address);
          });
        }
      }
      let err = new Error("Unknown proxy configuration");
      err.code = EPROXY;
      callback(err);
    };
  }
  /** @internal */
  _convertDataImages(mail, callback) {
    if (!this.options.attachDataUrls && !mail.data.attachDataUrls || !mail.data.html) {
      return callback();
    }
    mail.resolveContent(mail.data, "html", { disableFileAccess: mail.data.disableFileAccess, disableUrlAccess: mail.data.disableUrlAccess }, (err, html) => {
      if (err) {
        return callback(err);
      }
      let cidCounter = 0;
      html = (html || "").toString().replace(/(<img\b[^<>]{0,1024} src\s{0,20}=[\s"']{0,20})(data:([^;]+);[^"'>\s]+)/gi, (match, prefix, dataUri, mimeType) => {
        const cid = crypto5.randomBytes(10).toString("hex") + "@localhost";
        if (!mail.data.attachments) {
          mail.data.attachments = [];
        }
        if (!Array.isArray(mail.data.attachments)) {
          mail.data.attachments = [].concat(mail.data.attachments || []);
        }
        mail.data.attachments.push({
          path: dataUri,
          cid,
          filename: "image-" + ++cidCounter + "." + detectExtension(mimeType)
        });
        return prefix + "cid:" + cid;
      });
      mail.data.html = html;
      callback();
    });
  }
  set(key, value) {
    return this.meta.set(key, value);
  }
  get(key) {
    return this.meta.get(key);
  }
};
var mailer_default = Mail;

// node_modules/nodemailer/dist/esm/smtp-pool/index.js
import { EventEmitter as EventEmitter4 } from "node:events";

// node_modules/nodemailer/dist/esm/smtp-connection/index.js
import { EventEmitter as EventEmitter2 } from "node:events";
import net7 from "node:net";
import tls2 from "node:tls";
import os2 from "node:os";
import crypto6 from "node:crypto";

// node_modules/nodemailer/dist/esm/smtp-connection/data-stream.js
import { Transform as Transform8 } from "node:stream";
var INSERT_LF = Buffer.from("\n");
var INSERT_LF_DOT = Buffer.from("\n.");
var INSERT_CR = Buffer.from("\r");
var INSERT_DOT = Buffer.from(".");
var DataStream = class extends Transform8 {
  constructor(options) {
    super(options);
    this.options = options || {};
    this.inByteCount = 0;
    this.outByteCount = 0;
    this.lastByte = false;
  }
  /**
   * Escapes dots
   * @internal
   */
  _transform(chunk, encoding, done) {
    const chunks = [];
    let chunklen = 0;
    let i, len, lastPos = 0;
    let buf;
    if (!chunk || !chunk.length) {
      return done();
    }
    if (typeof chunk === "string") {
      chunk = Buffer.from(chunk);
    }
    this.inByteCount += chunk.length;
    for (i = 0, len = chunk.length; i < len; i++) {
      const byte = chunk[i];
      const prev = i ? chunk[i - 1] : this.lastByte;
      let insert = false;
      if (prev === 13 && byte !== 10) {
        insert = byte === 46 ? INSERT_LF_DOT : INSERT_LF;
      } else if (byte === 10 && prev !== 13) {
        insert = INSERT_CR;
      } else if (byte === 46 && (prev === 10 || prev === false)) {
        insert = INSERT_DOT;
      }
      if (insert) {
        if (i > lastPos) {
          buf = chunk.slice(lastPos, i);
          chunks.push(buf);
          chunklen += buf.length;
        }
        chunks.push(insert);
        chunklen += insert.length;
        lastPos = i;
      }
    }
    if (chunks.length) {
      if (lastPos < chunk.length) {
        buf = chunk.slice(lastPos);
        chunks.push(buf);
        chunklen += buf.length;
      }
      this.outByteCount += chunklen;
      this.push(Buffer.concat(chunks, chunklen));
    } else {
      this.outByteCount += chunk.length;
      this.push(chunk);
    }
    this.lastByte = chunk[chunk.length - 1];
    done();
  }
  /**
   * Finalizes the stream with a dot on a single line
   * @internal
   */
  _flush(done) {
    let buf;
    if (this.lastByte === 10) {
      buf = Buffer.from(".\r\n");
    } else if (this.lastByte === 13) {
      buf = Buffer.from("\n.\r\n");
    } else {
      buf = Buffer.from("\r\n.\r\n");
    }
    this.outByteCount += buf.length;
    this.push(buf);
    done();
  }
};

// node_modules/nodemailer/dist/esm/smtp-connection/index.js
import { PassThrough as PassThrough4 } from "node:stream";
var CONNECTION_TIMEOUT = 2 * 60 * 1e3;
var SOCKET_TIMEOUT = 10 * 60 * 1e3;
var GREETING_TIMEOUT = 30 * 1e3;
var DNS_TIMEOUT = 30 * 1e3;
var CLOSE_TIMEOUT = 5 * 1e3;
var KEEPALIVE_DELAY = 30 * 1e3;
var TEARDOWN_NOOP = () => {
};
function shuffle(list) {
  const result = list.slice();
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}
function timeoutError(message, timeoutType) {
  const err = new Error(message);
  err.timeoutType = timeoutType;
  return err;
}
var MAX_RESPONSE_SIZE = 1024 * 1024;
function decodeServerResponse(str) {
  if (!str) {
    return str;
  }
  const utf8 = Buffer.from(str, "binary").toString("utf8");
  return utf8.includes("\uFFFD") ? str : utf8;
}
function isPartialResponse(str) {
  return isPartialLine(str.slice(str.lastIndexOf("\n") + 1));
}
function isPartialLine(line) {
  return /^\d+-/.test(line);
}
var SMTPConnection = class extends EventEmitter2 {
  constructor(options) {
    super(options);
    this.id = crypto6.randomBytes(8).toString("base64").replace(/\W/g, "");
    this.stage = "init";
    this.options = options || {};
    if (this.options.requireTLS && (this.options.ignoreTLS || this.options.opportunisticTLS)) {
      this.options = Object.assign({}, this.options, { ignoreTLS: false, opportunisticTLS: false });
    }
    this.secureConnection = !!this.options.secure;
    this.alreadySecured = !!this.options.secured;
    this.port = Number(this.options.port) || (this.secureConnection ? 465 : 587);
    this.host = this.options.host || "localhost";
    this.servername = this.options.servername ? this.options.servername : !net7.isIP(this.host) ? this.host : false;
    this.allowInternalNetworkInterfaces = this.options.allowInternalNetworkInterfaces || false;
    if (typeof this.options.secure === "undefined" && this.port === 465) {
      this.secureConnection = true;
    }
    this.name = (this.options.name || this._getHostname()).toString().replace(/[\r\n]+/g, "");
    this.logger = getLogger(this.options, {
      component: this.options.component || "smtp-connection",
      sid: this.id
    });
    this.customAuth = /* @__PURE__ */ new Map();
    for (const key of Object.keys(this.options.customAuth || {})) {
      const mapKey = (key || "").toString().trim().toUpperCase();
      if (mapKey) {
        this.customAuth.set(mapKey, this.options.customAuth[key]);
      }
    }
    this.version = version2;
    this.authenticated = false;
    this.destroyed = false;
    this.secure = !!this.secureConnection;
    this._remainder = "";
    this._responseQueue = [];
    this._responsePartial = false;
    this.lastServerResponse = false;
    this._socket = false;
    this._supportedAuth = [];
    this.allowsAuth = false;
    this._envelope = false;
    this._supportedExtensions = [];
    this._maxAllowedSize = 0;
    this._responseActions = [];
    this._recipientQueue = [];
    this._phaseTimer = false;
    this._plaintextEhlo = false;
    this._destroyed = false;
    this._closing = false;
    this._currentDataStream = false;
    this._pendingSend = false;
    this._connectCallback = false;
    this._onSocketData = (chunk) => this._onData(chunk);
    this._onSocketError = (error2) => this._onError(error2, "ESOCKET", false, "CONN");
    this._onSocketClose = () => this._onClose();
    this._onSocketEnd = () => this._onEnd();
    this._onSocketTimeout = () => this._onTimeout();
    this._onConnectionSocketError = (err) => this._onError(err, "ESOCKET", false, "CONN");
  }
  /**
   * Creates a connection to a SMTP server and sets up connection
   * listener
   */
  connect(connectCallback) {
    if (this._connectCalled && !this._destroyed) {
      const err = this._formatError("Cannot connect - connect() was already called for this connection", "ECONNECTION", false, "API");
      if (typeof connectCallback === "function") {
        setImmediate(() => connectCallback(err));
        return;
      }
      this.logger.warn({ tnx: "smtp" }, "%s", err.message);
      return;
    }
    this._connectCalled = true;
    if (typeof connectCallback === "function") {
      this._connectCallback = connectCallback;
      this.once("connect", () => {
        this._connectCallback = false;
        this.logger.debug({
          tnx: "smtp"
        }, "SMTP handshake finished");
        connectCallback();
      });
      const isDestroyedMessage = this._isDestroyedMessage("connect");
      if (isDestroyedMessage) {
        return connectCallback(this._formatError(isDestroyedMessage, "ECONNECTION", false, "CONN"));
      }
    }
    const connectionTimeout = this.options.connectionTimeout || CONNECTION_TIMEOUT;
    this._connectionDeadline = (this._connectStartedAt || Date.now()) + connectionTimeout;
    let opts = {
      port: this.port,
      host: this.host,
      allowInternalNetworkInterfaces: this.allowInternalNetworkInterfaces,
      timeout: Math.min(this.options.dnsTimeout || DNS_TIMEOUT, connectionTimeout)
    };
    if (this.options.localAddress) {
      opts.localAddress = this.options.localAddress;
    }
    if (this.options.connection) {
      this._socket = this.options.connection;
      this._setupConnectionHandlers();
      if (this.secureConnection && !this.alreadySecured) {
        setImmediate(() => this._upgradeConnection((err) => {
          if (err) {
            this._onError(new Error("Error initiating TLS - " + (err.message || err)), "ETLS", false, "CONN");
            return;
          }
          this._onConnect();
        }));
      } else {
        setImmediate(() => this._onConnect());
      }
      return;
    } else if (this.options.socket) {
      this._socket = this.options.socket;
      return this._resolveAndConnect(opts, (_resolved) => {
        try {
          this._socket.connect(this.port, this.host, () => {
            if (this.secureConnection && !this.alreadySecured) {
              return this._upgradeConnection((err) => {
                if (err) {
                  this._onError(new Error("Error initiating TLS - " + (err.message || err)), "ETLS", false, "CONN");
                  return;
                }
                this._onConnect();
              });
            }
            this._onConnect();
          });
          this._setupConnectionHandlers();
        } catch (E) {
          setImmediate(() => this._onError(E, "ECONNECTION", false, "CONN"));
          return;
        }
      });
    } else {
      if (this.secureConnection) {
        Object.assign(opts, this.options.tls || {});
        if (this.servername && !opts.servername) {
          opts.servername = this.servername;
        }
      }
      return this._resolveAndConnect(opts, (resolved) => {
        let addresses = resolved._addresses || [];
        if (opts.localAddress) {
          const localFamily = net7.isIPv6(opts.localAddress) ? 6 : 4;
          const sameFamily = addresses.filter((addr) => net7.isIP(addr) === localFamily);
          addresses = sameFamily.length ? sameFamily : addresses;
        }
        if (addresses.length > 1) {
          const ipv6 = addresses.filter((addr) => net7.isIPv6(addr));
          const ipv4 = addresses.filter((addr) => !net7.isIPv6(addr));
          const ordered = shuffle(ipv6).concat(shuffle(ipv4));
          opts.host = this.host;
          opts.autoSelectFamily = true;
          if (!ipv6.length || !ipv4.length) {
            const remaining = this._connectionDeadline - Date.now();
            opts.autoSelectFamilyAttemptTimeout = Math.max(Math.floor(remaining / ordered.length), 10);
          }
          opts.lookup = ((hostname, lookupOptions, callback) => {
            if (lookupOptions && lookupOptions.all) {
              const all = ordered.map((address) => ({ address, family: net7.isIPv6(address) ? 6 : 4 }));
              return setImmediate(() => callback(null, all));
            }
            setImmediate(() => callback(null, ordered[0], net7.isIPv6(ordered[0]) ? 6 : 4));
          });
        } else if (addresses.length) {
          opts.host = addresses[0];
        }
        this._connectToHost(opts, this.secureConnection);
      });
    }
  }
  /**
   * Resolves the hostname and applies resolved values to opts,
   * then calls the provided callback with the resolved data
   *
   * @param opts Connection options (modified in place)
   * @param callback Called with resolved data on success
   * @internal
   */
  _resolveAndConnect(opts, callback) {
    return resolveHostname(opts, (err, resolved) => {
      if (err) {
        return setImmediate(() => this._onError(err, "EDNS", false, "CONN"));
      }
      this.logger.debug({
        tnx: "dns",
        source: opts.host,
        resolved: resolved.host,
        cached: !!resolved.cached
      }, "Resolved %s as %s [cache %s]", opts.host, resolved.host, resolved.cached ? "hit" : "miss");
      for (const key of Object.keys(resolved)) {
        if (key.charAt(0) !== "_" && resolved[key]) {
          opts[key] = resolved[key];
        }
      }
      callback(resolved);
    });
  }
  /**
   * Attempts to connect to the specified host address
   *
   * @param opts Connection options
   * @param secure Whether to use TLS
   * @internal
   */
  _connectToHost(opts, secure) {
    if (this._destroyed || this._closing) {
      return;
    }
    const connectFn = secure ? tls2.connect : net7.connect;
    try {
      this._socket = connectFn(opts, () => this._onConnect());
      this._setupConnectionHandlers();
    } catch (E) {
      setImmediate(() => this._onError(E, "ECONNECTION", false, "CONN"));
      return;
    }
  }
  /**
   * Sets up connection timeout and error handlers
   * @internal
   */
  _setupConnectionHandlers() {
    this._startPhase(Math.max((this._connectionDeadline || Date.now()) - Date.now(), 0), timeoutError("Connection timeout", "CONNECT_TIMEOUT"));
    this._socket.on("error", this._onConnectionSocketError);
  }
  /**
   * Starts the timer of a connection phase: connecting, waiting for the greeting or a TLS
   * upgrade. The phases follow one another, so starting one ends the one before
   *
   * @param timeout Time the phase may take
   * @param err Error to fail with when it takes longer
   * @internal
   */
  _startPhase(timeout, err) {
    this._clearPhase();
    this._phaseTimer = setTimeout(() => {
      this._phaseTimer = false;
      this._onError(err, "ETIMEDOUT", false, "CONN");
    }, timeout);
  }
  /**
   * Time the greeting or a STARTTLS upgrade may take: greetingTimeout, cut short by what is left
   * of connectionTimeout
   *
   * @internal
   */
  _remainingSetupTime() {
    return Math.min(this.options.greetingTimeout || GREETING_TIMEOUT, Math.max((this._connectionDeadline || Infinity) - Date.now(), 1));
  }
  /** @internal */
  _clearPhase() {
    clearTimeout(this._phaseTimer);
    this._phaseTimer = false;
  }
  /**
   * Sends QUIT
   */
  quit() {
    this._sendCommand("QUIT");
    this._responseActions.push(this.close);
  }
  /**
   * Closes the connection to the server
   */
  close() {
    this._clearPhase();
    this._responseActions = [];
    if (this._closing) {
      return;
    }
    this._closing = true;
    const closeMethod = this.stage === "init" ? "destroy" : "end";
    this.logger.debug({
      tnx: "smtp"
    }, 'Closing connection to the server using "%s"', closeMethod);
    const socket = this._socket && this._socket.socket || this._socket;
    if (this._currentDataStream) {
      try {
        this._currentDataStream.unpipe(this._socket);
      } catch (_E) {
      }
      this._currentDataStream = false;
    }
    if (this._pendingSend) {
      const { stream, onStreamError } = this._pendingSend;
      if (stream) {
        stream.removeListener("error", onStreamError);
        stream.on("error", TEARDOWN_NOOP);
        stream.destroy();
      }
      this._pendingSend = false;
    }
    if (socket && !socket.destroyed) {
      try {
        socket.setTimeout(0);
        socket.removeListener("data", this._onSocketData);
        socket.removeListener("timeout", this._onSocketTimeout);
        socket.removeListener("close", this._onSocketClose);
        socket.removeListener("end", this._onSocketEnd);
        socket.removeListener("error", this._onSocketError);
        socket.removeListener("error", this._onConnectionSocketError);
        socket.on("error", TEARDOWN_NOOP);
        socket[closeMethod]();
        if (closeMethod === "end") {
          const closeTimer = setTimeout(() => socket.destroy(), CLOSE_TIMEOUT);
          if (typeof closeTimer.unref === "function") {
            closeTimer.unref();
          }
          socket.once("close", () => clearTimeout(closeTimer));
        }
      } catch (_E) {
      }
    }
    this._destroy();
  }
  /**
   * Authenticate user
   */
  login(authData, callback) {
    const isDestroyedMessage = this._isDestroyedMessage("login");
    if (isDestroyedMessage) {
      return callback(this._formatError(isDestroyedMessage, "ECONNECTION", false, "API"));
    }
    this._auth = authData || {};
    this._authMethod = (this._auth.method || "").toString().trim().toUpperCase() || false;
    const canUseXOAuth2 = !!this._auth.oauth2 || this.customAuth.has("XOAUTH2");
    if (!this._authMethod && this._auth.oauth2 && !this._auth.credentials) {
      this._authMethod = "XOAUTH2";
    } else if (!this._authMethod || this._authMethod === "XOAUTH2" && !this._auth.oauth2) {
      const supported = this._supportedAuth.find((method) => method !== "XOAUTH2" || canUseXOAuth2);
      this._authMethod = (supported || "PLAIN").toUpperCase().trim();
    }
    if ((this._authMethod !== "XOAUTH2" || this.customAuth.has("XOAUTH2")) && (!this._auth.credentials || !this._auth.credentials.user || !this._auth.credentials.pass)) {
      if (this._auth.user && this._auth.pass || this.customAuth.has(this._authMethod)) {
        this._auth.credentials = {
          user: this._auth.user,
          pass: this._auth.pass,
          options: this._auth.options
        };
      } else {
        return callback(this._formatError('Missing credentials for "' + this._authMethod + '"', "EAUTH", false, "API"));
      }
    }
    if (this.customAuth.has(this._authMethod)) {
      const handler2 = this.customAuth.get(this._authMethod);
      let lastResponse;
      let returned = false;
      const resolve3 = () => {
        if (returned) {
          return;
        }
        returned = true;
        this.logger.info({
          tnx: "smtp",
          username: this._auth.user,
          action: "authenticated",
          method: this._authMethod
        }, "User %s authenticated", JSON.stringify(this._auth.user));
        this.authenticated = true;
        callback(null, true);
      };
      const reject = (err) => {
        if (returned) {
          return;
        }
        returned = true;
        callback(this._formatError(err, "EAUTH", lastResponse, "AUTH " + this._authMethod));
      };
      const sendCommand = (cmd, done) => {
        let promise;
        if (!done) {
          promise = new Promise((resolve4, reject2) => {
            done = callbackPromise(resolve4, reject2);
          });
        }
        this._responseActions.push((str) => {
          lastResponse = str;
          let codes = str.match(/^(\d+)(?:\s(\d+\.\d+\.\d+))?\s/);
          let data = {
            command: cmd,
            response: str
          };
          if (codes) {
            data.status = Number(codes[1]) || 0;
            if (codes[2]) {
              data.code = codes[2];
            }
            data.text = str.substr(codes[0].length);
          } else {
            data.text = str;
            data.status = 0;
          }
          done(null, data);
        });
        setImmediate(() => this._sendCommand(cmd));
        return promise;
      };
      const handlerResponse = handler2({
        auth: this._auth,
        method: this._authMethod,
        extensions: [].concat(this._supportedExtensions),
        authMethods: [].concat(this._supportedAuth),
        maxAllowedSize: this._maxAllowedSize || false,
        sendCommand,
        resolve: resolve3,
        reject
      });
      if (handlerResponse && typeof handlerResponse.catch === "function") {
        handlerResponse.then(resolve3).catch(reject);
      }
      return;
    }
    switch (this._authMethod) {
      case "XOAUTH2":
        this._handleXOauth2Token(false, callback);
        return;
      case "LOGIN":
        this._responseActions.push((str) => {
          this._actionAUTH_LOGIN_USER(str, callback);
        });
        this._sendCommand("AUTH LOGIN");
        return;
      case "PLAIN":
        this._responseActions.push((str) => {
          this._actionAUTHComplete(str, callback);
        });
        this._sendCommand(
          "AUTH PLAIN " + Buffer.from(
            //this._auth.user+'\u0000'+
            "\0" + // skip authorization identity as it causes problems with some servers
            this._auth.credentials.user + "\0" + this._auth.credentials.pass,
            "utf-8"
          ).toString("base64"),
          // log entry without passwords
          "AUTH PLAIN " + Buffer.from(
            //this._auth.user+'\u0000'+
            "\0" + // skip authorization identity as it causes problems with some servers
            this._auth.credentials.user + "\0/* secret */",
            "utf-8"
          ).toString("base64")
        );
        return;
      case "CRAM-MD5":
        this._responseActions.push((str) => {
          this._actionAUTH_CRAM_MD5(str, callback);
        });
        this._sendCommand("AUTH CRAM-MD5");
        return;
    }
    return callback(this._formatError('Unknown authentication method "' + this._authMethod + '"', "EAUTH", false, "API"));
  }
  /**
   * Sends a message
   *
   * @param envelope Envelope object, {from: addr, to: [addr]}
   * @param message String, Buffer or a Stream
   * @param done Callback to return once sending is completed
   */
  send(envelope, message, done) {
    let returned = false;
    const callback = (err, info) => {
      if (returned) {
        return;
      }
      returned = true;
      if (this._pendingSend && this._pendingSend.callback === callback) {
        this._pendingSend = false;
      }
      done(err, info);
    };
    if (!message) {
      return callback(this._formatError("Empty message", "EMESSAGE", false, "API"));
    }
    const isDestroyedMessage = this._isDestroyedMessage("send message");
    if (isDestroyedMessage) {
      return callback(this._formatError(isDestroyedMessage, "ECONNECTION", false, "API"));
    }
    if (this._maxAllowedSize && envelope.size > this._maxAllowedSize) {
      setImmediate(() => {
        callback(this._formatError("Message size larger than allowed " + this._maxAllowedSize, "EMESSAGE", false, "MAIL FROM"));
      });
      return;
    }
    const pendingSend = {
      callback,
      stream: false,
      onStreamError: (err) => callback(this._formatError(err, "ESTREAM", false, "API"))
    };
    if (typeof message.on === "function") {
      pendingSend.stream = message;
      pendingSend.stream.on("error", pendingSend.onStreamError);
    }
    this._pendingSend = pendingSend;
    const startTime = Date.now();
    this._setEnvelope(envelope, (err, info) => {
      if (err) {
        if (typeof message.destroy === "function") {
          message.destroy();
        }
        return callback(err);
      }
      const envelopeTime = Date.now();
      const stream = this._createSendStream((err2, str) => {
        if (err2) {
          return callback(err2);
        }
        const result = info;
        result.envelopeTime = envelopeTime - startTime;
        result.messageTime = Date.now() - envelopeTime;
        result.messageSize = stream.outByteCount;
        result.response = str;
        return callback(null, result);
      });
      if (typeof message.pipe === "function") {
        message.pipe(stream);
      } else {
        stream.write(message);
        stream.end();
      }
    });
  }
  /**
   * Resets connection state
   *
   * @param callback Callback to return once connection is reset
   */
  reset(callback) {
    const isDestroyedMessage = this._isDestroyedMessage("reset");
    if (isDestroyedMessage) {
      return callback(this._formatError(isDestroyedMessage, "ECONNECTION", false, "API"));
    }
    this._sendCommand("RSET");
    this._responseActions.push((str) => {
      if (str.charAt(0) !== "2") {
        return callback(this._formatError("Could not reset session state. response=" + str, "EPROTOCOL", str, "RSET"));
      }
      this._envelope = false;
      return callback(null, true);
    });
  }
  /**
   * Connection listener that is run when the connection to
   * the server is opened
   *
   * @event
   * @internal
   */
  _onConnect() {
    const socket = this._socket;
    this._clearPhase();
    this.logger.info({
      tnx: "network",
      localAddress: socket.localAddress,
      localPort: socket.localPort,
      remoteAddress: socket.remoteAddress,
      remotePort: socket.remotePort
    }, "%s established to %s:%s", this.secure ? "Secure connection" : "Connection", socket.remoteAddress, socket.remotePort);
    if (this._destroyed) {
      this.close();
      return;
    }
    this.stage = "connected";
    socket.removeListener("data", this._onSocketData);
    socket.removeListener("timeout", this._onSocketTimeout);
    socket.removeListener("close", this._onSocketClose);
    socket.removeListener("end", this._onSocketEnd);
    socket.removeListener("error", this._onConnectionSocketError);
    socket.removeListener("error", this._onSocketError);
    socket.on("error", this._onSocketError);
    socket.on("data", this._onSocketData);
    socket.once("close", this._onSocketClose);
    socket.once("end", this._onSocketEnd);
    socket.setTimeout(this.options.socketTimeout || SOCKET_TIMEOUT);
    socket.on("timeout", this._onSocketTimeout);
    if (typeof socket.setKeepAlive === "function") {
      socket.setKeepAlive(true, KEEPALIVE_DELAY);
    }
    if (typeof socket.setNoDelay === "function") {
      socket.setNoDelay(true);
    }
    this._startPhase(this._remainingSetupTime(), timeoutError("Greeting never received", "GREETING_TIMEOUT"));
    this._responseActions.push(this._actionGreeting);
    socket.resume();
  }
  /**
   * Ends the session after a 421 reply. The replies queued for commands sent along with the
   * answered one are not going to come, so the message in flight is failed here
   *
   * @param str The 421 reply
   * @internal
   */
  _onServerClosing(str) {
    if (this._destroyed) {
      return;
    }
    const pendingSend = this._pendingSend;
    const envelope = this._envelope;
    this._responseActions = [];
    this.close();
    if (pendingSend) {
      pendingSend.callback(envelope && envelope.mailError || this._formatError("Server closed the connection", "ECONNECTION", str, "CONN"));
    }
  }
  /**
   * 'data' listener for data coming from the server
   *
   * @event
   * @param chunk Data chunk coming from the server
   * @internal
   */
  _onData(chunk) {
    if (this._destroyed || !chunk || !chunk.length) {
      return;
    }
    const maxResponseSize = this.options.maxResponseSize || MAX_RESPONSE_SIZE;
    const data = chunk.toString("binary");
    if (!data.includes("\n")) {
      this._remainder += data;
      if (this._remainder.length > maxResponseSize) {
        return this._onResponseTooLarge();
      }
      return;
    }
    const lines = (this._remainder + data).split(/\r?\n/);
    this._remainder = lines.pop();
    for (let i = 0, len = lines.length; i < len; i++) {
      if (this._responsePartial) {
        this._responseQueue[this._responseQueue.length - 1] += "\n" + lines[i];
      } else {
        this._responseQueue.push(lines[i]);
      }
      this._responsePartial = isPartialLine(lines[i]);
      if (this._responsePartial && this._responseQueue[this._responseQueue.length - 1].length > maxResponseSize) {
        return this._onResponseTooLarge();
      }
    }
    if (this._remainder.length > maxResponseSize) {
      return this._onResponseTooLarge();
    }
    if (this._responsePartial) {
      return;
    }
    this._processResponse();
  }
  /**
   * Drops a connection whose peer keeps extending a reply it never completes, releasing
   * whatever was buffered for that reply
   * @internal
   */
  _onResponseTooLarge() {
    this._remainder = "";
    this._responseQueue = [];
    this._responsePartial = false;
    this._onError(new Error("Server response exceeds maximum allowed size"), "EPROTOCOL", false, "CONN");
  }
  /**
   * 'error' listener for the socket
   *
   * @event
   * @param err Error object
   * @param type Error name
   * @param data Server response that triggered the error, false if there is none
   * @param command SMTP command that was in flight
   * @internal
   */
  _onError(err, type, data, command) {
    this._clearPhase();
    if (this._destroyed) {
      return;
    }
    err = this._formatError(err, type, data, command);
    if (isTransientError(err)) {
      this.logger.warn({ tnx: "smtp", err }, "%s", err.message);
    } else {
      this.logger.error({ tnx: "smtp", err }, "%s", err.message);
    }
    const pendingSend = this._pendingSend;
    this.emit("error", err);
    this.close();
    if (pendingSend) {
      pendingSend.callback(err);
    }
  }
  /** @internal */
  _formatError(message, type, response, command) {
    let err;
    if (/Error\]$/i.test(Object.prototype.toString.call(message))) {
      err = message;
    } else {
      err = new Error(message);
    }
    if (type && type !== "Error" && err.code !== ERR_ACCESS_DENIED) {
      if (err.code && err.code !== type && !err.originalCode) {
        err.originalCode = err.code;
      }
      err.code = type;
    }
    if (response) {
      err.response = response;
      err.message += ": " + response;
    }
    const responseCode = typeof response === "string" && Number((response.match(/^\d+/) || [])[0]) || false;
    if (responseCode) {
      err.responseCode = responseCode;
    }
    if (command) {
      err.command = command;
    }
    return err;
  }
  /**
   * 'close' listener for the socket
   *
   * @event
   * @internal
   */
  _onClose() {
    let serverResponse = false;
    if (this._remainder && this._remainder.trim()) {
      this.lastServerResponse = serverResponse = decodeServerResponse(this._remainder.trim());
      if (this.options.debug || this.options.transactionLog) {
        this.logger.debug({
          tnx: "server"
        }, serverResponse);
      }
    }
    this.logger.info({
      tnx: "network"
    }, "Connection closed");
    const failureResponse = typeof serverResponse === "string" && /^[45]\d{2}[ -]/.test(serverResponse) ? serverResponse : false;
    if (this.upgrading && !this._destroyed) {
      return this._onError(new Error("Connection closed unexpectedly"), "ETLS", failureResponse, "CONN");
    }
    if (!failureResponse && this._responseActions[0] === this._actionGreeting && this._connectCallback && !this._destroyed) {
      const connectCallback = this._connectCallback;
      this._connectCallback = false;
      const err = this._formatError(new Error("Connection closed unexpectedly"), "ECONNECTION", false, "CONN");
      this.logger.warn({ tnx: "network" }, err.message);
      connectCallback(err);
      this.close();
      return;
    }
    if (!failureResponse && this.stage === "connected" && !this._responseActions.length && !this._pendingSend && !this._destroyed && !this._closing) {
      this.logger.info({
        tnx: "network"
      }, "Server closed the idle connection");
      return this._destroy();
    }
    if (failureResponse || this._responseActions[0] !== this.close && !this._destroyed) {
      return this._onError(new Error("Connection closed unexpectedly"), "ECONNECTION", failureResponse, "CONN");
    }
    this._destroy();
  }
  /**
   * 'end' listener for the socket
   *
   * @event
   * @internal
   */
  _onEnd() {
    if (this._socket && !this._socket.destroyed) {
      this._socket.end();
    }
  }
  /**
   * 'timeout' listener for the socket
   *
   * @event
   * @internal
   */
  _onTimeout() {
    return this._onError(timeoutError("Timeout", "SOCKET_TIMEOUT"), "ETIMEDOUT", false, "CONN");
  }
  /**
   * Destroys the client, emits 'end'
   * @internal
   */
  _destroy() {
    if (this._destroyed) {
      return;
    }
    this._destroyed = true;
    this.destroyed = true;
    this._clearPhase();
    this.emit("end");
  }
  /**
   * Upgrades the connection to TLS
   *
   * @param callback Callback function to run when the connection
   *        has been secured
   * @internal
   */
  _upgradeConnection(callback) {
    const discarded = this._remainder.length + this._responseQueue.reduce((total, response) => total + response.length, 0);
    if (discarded) {
      this.logger.warn({
        tnx: "smtp",
        discarded
      }, "Discarded %s bytes received in plaintext after the STARTTLS response", discarded);
    }
    this._plaintextEhlo = false;
    this._remainder = "";
    this._responseQueue = [];
    this._responsePartial = false;
    const socketPlain = this._socket;
    socketPlain.removeListener("data", this._onSocketData);
    socketPlain.removeListener("timeout", this._onSocketTimeout);
    socketPlain.setTimeout(0);
    const opts = Object.assign({
      socket: socketPlain,
      host: this.host
    }, this.options.tls || {});
    if (this.servername && !opts.servername) {
      opts.servername = this.servername;
    }
    const removePlainSocketListeners = () => {
      socketPlain.removeListener("close", this._onSocketClose);
      socketPlain.removeListener("end", this._onSocketEnd);
      socketPlain.removeListener("error", this._onSocketError);
      socketPlain.removeListener("error", this._onConnectionSocketError);
    };
    this.upgrading = true;
    this._startPhase(this._remainingSetupTime(), timeoutError("TLS handshake timed out", "UPGRADE_TIMEOUT"));
    try {
      this._socket = tls2.connect(opts, () => {
        this._clearPhase();
        this.secure = true;
        this.upgrading = false;
        this._socket.on("data", this._onSocketData);
        removePlainSocketListeners();
        return callback(null, true);
      });
    } catch (err) {
      this._clearPhase();
      removePlainSocketListeners();
      return callback(err);
    }
    this._socket.on("error", this._onSocketError);
    this._socket.once("close", this._onSocketClose);
    this._socket.once("end", this._onSocketEnd);
    this._socket.setTimeout(this.options.socketTimeout || SOCKET_TIMEOUT);
    this._socket.on("timeout", this._onSocketTimeout);
    socketPlain.resume();
  }
  /**
   * Processes queued responses from the server
   * @internal
   */
  _processResponse() {
    if (!this._responseQueue.length) {
      return false;
    }
    const raw = (this._responseQueue.shift() || "").toString();
    if (!raw.trim()) {
      setImmediate(() => this._processResponse());
      return;
    }
    if (isPartialResponse(raw)) {
      this._responseQueue.unshift(raw);
      return;
    }
    const str = this.lastServerResponse = decodeServerResponse(raw);
    if (this.options.debug || this.options.transactionLog) {
      this.logger.debug({
        tnx: "server"
      }, str.replace(/\r?\n$/, ""));
    }
    const action = this._responseActions.shift();
    const closing = /^421[ -]/.test(str);
    if (typeof action === "function") {
      action.call(this, str);
      if (closing) {
        return this._onServerClosing(str);
      }
      setImmediate(() => this._processResponse());
    } else if (closing && !this._pendingSend && this.stage === "connected") {
      this.logger.info({
        tnx: "smtp"
      }, "Server closed the idle connection: %s", str);
      this.close();
    } else {
      return this._onError(new Error("Unexpected Response"), "EPROTOCOL", str, "CONN");
    }
  }
  /**
   * Send a command to the server, append \r\n
   *
   * @param str String to be sent to the server
   * @param logStr Optional string to be used for logging instead of the actual string
   * @internal
   */
  _sendCommand(str, logStr) {
    if (this._destroyed) {
      return;
    }
    const socket = this._socket;
    if (socket.destroyed) {
      return this.close();
    }
    if (this.options.debug || this.options.transactionLog) {
      this.logger.debug({
        tnx: "client"
      }, (logStr || str || "").toString().replace(/\r?\n$/, ""));
    }
    socket.write(Buffer.from(str + "\r\n", "utf-8"));
  }
  /**
   * Initiates a new message by submitting envelope data, starting with
   * MAIL FROM: command
   *
   * @param envelope Envelope object in the form of
   *        {from:'...', to:['...']}
   *        or
   *        {from:{address:'...',name:'...'}, to:[address:'...',name:'...']}
   * @param callback Callback to run once the envelope is processed
   * @internal
   */
  _setEnvelope(envelope, callback) {
    const args = [];
    let useSmtpUtf8 = false;
    this._envelope = envelope || {};
    this._envelope.from = (this._envelope.from && this._envelope.from.address || this._envelope.from || "").toString().trim();
    this._envelope.to = [].concat(this._envelope.to || []).map((to) => (to && to.address || to || "").toString().trim());
    if (!this._envelope.to.length) {
      return callback(this._formatError("No recipients defined", "EENVELOPE", false, "API"));
    }
    if (this._envelope.from && /[\r\n<>]/.test(this._envelope.from)) {
      return callback(this._formatError("Invalid sender " + JSON.stringify(this._envelope.from), "EENVELOPE", false, "API"));
    }
    if (/[\x80-\uFFFF]/.test(this._envelope.from)) {
      useSmtpUtf8 = true;
    }
    for (let i = 0, len = this._envelope.to.length; i < len; i++) {
      if (!this._envelope.to[i] || /[\r\n<>]/.test(this._envelope.to[i])) {
        return callback(this._formatError("Invalid recipient " + JSON.stringify(this._envelope.to[i]), "EENVELOPE", false, "API"));
      }
      if (/[\x80-\uFFFF]/.test(this._envelope.to[i])) {
        useSmtpUtf8 = true;
      }
    }
    this._envelope.rcptQueue = [].concat(this._envelope.to || []);
    this._envelope.rejected = [];
    this._envelope.rejectedErrors = [];
    this._envelope.accepted = [];
    if (this._envelope.dsn) {
      try {
        this._envelope.dsn = this._setDsnEnvelope(this._envelope.dsn);
      } catch (err) {
        return callback(this._formatError("Invalid DSN " + err.message, "EENVELOPE", false, "API"));
      }
    }
    if (this._envelope.requireTLSExtensionEnabled) {
      if (!this.secure) {
        return callback(this._formatError("REQUIRETLS can only be used over TLS connections (RFC 8689)", "EREQUIRETLS", false, "MAIL FROM"));
      }
      if (!this._supportedExtensions.includes("REQUIRETLS")) {
        return callback(this._formatError("Server does not support REQUIRETLS extension (RFC 8689)", "EREQUIRETLS", false, "MAIL FROM"));
      }
    }
    this._envelope.pipelined = this._supportedExtensions.includes("PIPELINING");
    this._responseActions.push((str) => {
      this._actionMAIL(str, callback);
    });
    if (useSmtpUtf8 && this._supportedExtensions.includes("SMTPUTF8")) {
      args.push("SMTPUTF8");
      this._usingSmtpUtf8 = true;
    }
    if (this._envelope.use8BitMime && this._supportedExtensions.includes("8BITMIME")) {
      args.push("BODY=8BITMIME");
      this._using8BitMime = true;
    }
    if (this._envelope.size && this._supportedExtensions.includes("SIZE")) {
      const sizeValue = Number(this._envelope.size) || 0;
      if (sizeValue > 0) {
        args.push("SIZE=" + sizeValue);
      }
    }
    if (this._envelope.dsn && this._supportedExtensions.includes("DSN")) {
      if (this._envelope.dsn.ret) {
        args.push("RET=" + encodeXText(this._envelope.dsn.ret));
      }
      if (this._envelope.dsn.envid) {
        args.push("ENVID=" + encodeXText(this._envelope.dsn.envid));
      }
    }
    if (this._envelope.requireTLSExtensionEnabled) {
      args.push("REQUIRETLS");
    }
    const mailFrom = "MAIL FROM:<" + this._envelope.from + ">" + (args.length ? " " + args.join(" ") : "");
    this._recipientQueue = [];
    if (!this._envelope.pipelined) {
      this._sendCommand(mailFrom);
      return;
    }
    const socket = this._socket;
    socket.cork();
    this._sendCommand(mailFrom);
    while (this._envelope.rcptQueue.length) {
      this._sendRcpt(this._envelope.rcptQueue.shift(), callback);
    }
    this._responseActions.push((str) => {
      this._actionDATA(str, callback);
    });
    this._sendCommand("DATA");
    socket.uncork();
  }
  /**
   * Sends RCPT TO for a recipient and queues the handler for the reply
   *
   * @param recipient Recipient address
   * @param callback Callback to run once the envelope is processed
   * @internal
   */
  _sendRcpt(recipient, callback) {
    this._recipientQueue.push(recipient);
    this._responseActions.push((str) => {
      this._actionRCPT(str, callback);
    });
    this._sendCommand("RCPT TO:<" + recipient + ">" + this._getDsnRcptToArgs());
  }
  /** @internal */
  _setDsnEnvelope(params) {
    let ret = (params.ret || params.return || "").toString().toUpperCase() || null;
    if (ret) {
      switch (ret) {
        case "HDRS":
        case "HEADERS":
          ret = "HDRS";
          break;
        case "FULL":
        case "BODY":
          ret = "FULL";
          break;
      }
    }
    if (ret && !["FULL", "HDRS"].includes(ret)) {
      throw new Error("ret: " + JSON.stringify(ret));
    }
    const envid = (params.envid || params.id || "").toString() || null;
    let notify = params.notify || null;
    if (notify) {
      if (typeof notify === "string") {
        notify = notify.split(",");
      }
      notify = notify.map((n) => n.trim().toUpperCase());
      const validNotify = ["NEVER", "SUCCESS", "FAILURE", "DELAY"];
      const invalidNotify = notify.filter((n) => !validNotify.includes(n));
      if (invalidNotify.length || notify.length > 1 && notify.includes("NEVER")) {
        throw new Error("notify: " + JSON.stringify(notify.join(",")));
      }
      notify = notify.join(",");
    }
    let orcpt = (params.recipient || params.orcpt || "").toString() || null;
    if (orcpt && orcpt.indexOf(";") < 0) {
      orcpt = "rfc822;" + orcpt;
    }
    return {
      ret,
      envid,
      notify,
      orcpt
    };
  }
  /** @internal */
  _getDsnRcptToArgs() {
    const envelope = this._envelope;
    const args = [];
    if (envelope.dsn && this._supportedExtensions.includes("DSN")) {
      if (envelope.dsn.notify) {
        args.push("NOTIFY=" + encodeXText(envelope.dsn.notify));
      }
      if (envelope.dsn.orcpt) {
        args.push("ORCPT=" + encodeXText(envelope.dsn.orcpt));
      }
    }
    return args.length ? " " + args.join(" ") : "";
  }
  /** @internal */
  _createSendStream(callback) {
    const envelope = this._envelope;
    const dataStream = new DataStream();
    if (this.options.lmtp) {
      envelope.accepted.forEach((recipient, i) => {
        const final = i === envelope.accepted.length - 1;
        this._responseActions.push((str) => {
          this._actionLMTPStream(recipient, final, str, callback);
        });
      });
    } else {
      this._responseActions.push((str) => {
        this._actionSMTPStream(str, callback);
      });
    }
    this._currentDataStream = dataStream;
    dataStream.pipe(this._socket, {
      end: false
    });
    if (this.options.debug) {
      const logStream = new PassThrough4();
      logStream.on("readable", () => {
        let chunk;
        while (chunk = logStream.read()) {
          this.logger.debug({
            tnx: "message"
          }, chunk.toString("binary").replace(/\r?\n$/, ""));
        }
      });
      dataStream.pipe(logStream);
    }
    dataStream.once("end", () => {
      if (this._currentDataStream === dataStream) {
        this._currentDataStream = false;
      }
      this.logger.info({
        tnx: "message",
        inByteCount: dataStream.inByteCount,
        outByteCount: dataStream.outByteCount
      }, "<%s bytes encoded mime message (source size %s bytes)>", dataStream.outByteCount, dataStream.inByteCount);
    });
    return dataStream;
  }
  /** ACTIONS **/
  /**
   * Will be run after the connection is created and the server sends
   * a greeting. If the incoming message starts with 220 initiate
   * SMTP session by sending EHLO command
   *
   * @param str Message from the server
   * @internal
   */
  _actionGreeting(str) {
    this._clearPhase();
    if (str.substr(0, 3) !== "220") {
      this._onError(new Error("Invalid greeting. response=" + str), "EPROTOCOL", str, "CONN");
      return;
    }
    if (this.options.lmtp) {
      this._responseActions.push(this._actionLHLO);
      this._sendCommand("LHLO " + this.name);
    } else {
      this._responseActions.push(this._actionEHLO);
      this._sendCommand("EHLO " + this.name);
    }
  }
  /**
   * Handles server response for LHLO command. If it yielded in
   * error, emit 'error', otherwise treat this as an EHLO response
   *
   * @param str Message from the server
   * @internal
   */
  _actionLHLO(str) {
    if (str.charAt(0) !== "2") {
      this._onError(new Error("Invalid LHLO. response=" + str), "EPROTOCOL", str, "LHLO");
      return;
    }
    this._actionEHLO(str);
  }
  /**
   * Handles server response for EHLO command. If it yielded in
   * error, try HELO instead, otherwise initiate TLS negotiation
   * if STARTTLS is supported by the server or move into the
   * authentication phase.
   *
   * @param str Message from the server
   * @internal
   */
  _actionEHLO(str) {
    if (str.substr(0, 3) === "421") {
      this._onError(new Error("Server terminates connection. response=" + str), "ECONNECTION", str, "EHLO");
      return;
    }
    if (str.charAt(0) !== "2") {
      if (this.options.requireTLS) {
        this._onError(new Error("EHLO failed but HELO does not support required STARTTLS. response=" + str), "ECONNECTION", str, "EHLO");
        return;
      }
      this._responseActions.push(this._actionHELO);
      this._sendCommand("HELO " + this.name);
      return;
    }
    if (!this.secure && !this.options.ignoreTLS && (/[ -]STARTTLS\b/im.test(str) || this.options.requireTLS)) {
      this._plaintextEhlo = str;
      this._sendCommand("STARTTLS");
      this._responseActions.push(this._actionSTARTTLS);
      return;
    }
    this._parseEhloExtensions(str);
    this.emit("connect");
  }
  /**
   * Reads the extensions and the authentication mechanisms out of an EHLO response
   *
   * @param str EHLO response from the server
   * @internal
   */
  _parseEhloExtensions(str) {
    let match;
    this._ehloLines = str.split(/\r?\n/).map((line) => line.replace(/^\d+[ -]/, "").trim()).filter((line) => line).slice(1);
    if (/[ -]SMTPUTF8\b/im.test(str)) {
      this._supportedExtensions.push("SMTPUTF8");
    }
    if (/[ -]DSN\b/im.test(str)) {
      this._supportedExtensions.push("DSN");
    }
    if (/[ -]8BITMIME\b/im.test(str)) {
      this._supportedExtensions.push("8BITMIME");
    }
    if (/[ -]REQUIRETLS\b/im.test(str)) {
      this._supportedExtensions.push("REQUIRETLS");
    }
    if (/[ -]PIPELINING\b/im.test(str)) {
      this._supportedExtensions.push("PIPELINING");
    }
    if (/[ -]AUTH\b/i.test(str)) {
      this.allowsAuth = true;
    }
    const authMechanisms = /* @__PURE__ */ new Set();
    for (const line of this._ehloLines) {
      const authMatch = /^AUTH[\s=](.*)/i.exec(line);
      if (authMatch) {
        for (const mechanism of authMatch[1].split(/[\s=]+/)) {
          authMechanisms.add(mechanism.toUpperCase());
        }
      }
    }
    for (const mechanism of ["PLAIN", "LOGIN", "CRAM-MD5", "XOAUTH2"]) {
      if (authMechanisms.has(mechanism)) {
        this._supportedAuth.push(mechanism);
      }
    }
    if (match = str.match(/[ -]SIZE(?:[ \t]+(\d+))?/im)) {
      this._supportedExtensions.push("SIZE");
      this._maxAllowedSize = Number(match[1]) || 0;
    }
  }
  /**
   * Handles server response for HELO command. If it yielded in
   * error, emit 'error', otherwise move into the authentication phase.
   *
   * @param str Message from the server
   * @internal
   */
  _actionHELO(str) {
    if (str.charAt(0) !== "2") {
      this._onError(new Error("Invalid HELO. response=" + str), "EPROTOCOL", str, "HELO");
      return;
    }
    this.allowsAuth = true;
    this.emit("connect");
  }
  /**
   * Handles server response for STARTTLS command. If there's an error
   * try HELO instead, otherwise initiate TLS upgrade. If the upgrade
   * succeedes restart the EHLO
   *
   * @param str Message from the server
   * @internal
   */
  _actionSTARTTLS(str) {
    if (str.charAt(0) !== "2") {
      if (this.options.opportunisticTLS) {
        this.logger.info({
          tnx: "smtp"
        }, "Failed STARTTLS upgrade, continuing unencrypted");
        if (this._plaintextEhlo) {
          this._parseEhloExtensions(this._plaintextEhlo);
          this._plaintextEhlo = false;
          this.allowsAuth = false;
          this._supportedAuth = [];
        }
        this.emit("connect");
        return;
      }
      this._onError(new Error("Error upgrading connection with STARTTLS"), "ETLS", str, "STARTTLS");
      return;
    }
    this._upgradeConnection((err, secured) => {
      if (err) {
        this._onError(new Error("Error initiating TLS - " + (err.message || err)), "ETLS", false, "STARTTLS");
        return;
      }
      this.logger.info({
        tnx: "smtp"
      }, "Connection upgraded with STARTTLS");
      if (secured) {
        if (this.options.lmtp) {
          this._responseActions.push(this._actionLHLO);
          this._sendCommand("LHLO " + this.name);
        } else {
          this._responseActions.push(this._actionEHLO);
          this._sendCommand("EHLO " + this.name);
        }
      } else {
        this.emit("connect");
      }
    });
  }
  /**
   * Handle the response for AUTH LOGIN command. We are expecting
   * '334 VXNlcm5hbWU6' (base64 for 'Username:'). Data to be sent as
   * response needs to be base64 encoded username. We do not need
   * exact match but settle with 334 response in general as some
   * hosts invalidly use a longer message than VXNlcm5hbWU6
   *
   * @param str Message from the server
   * @param callback Callback to run once the authentication sequence completes
   * @internal
   */
  _actionAUTH_LOGIN_USER(str, callback) {
    if (!/^334[ -]/.test(str)) {
      callback(this._formatError('Invalid login sequence while waiting for "334 VXNlcm5hbWU6"', "EAUTH", str, "AUTH LOGIN"));
      return;
    }
    this._responseActions.push((str2) => {
      this._actionAUTH_LOGIN_PASS(str2, callback);
    });
    this._sendCommand(Buffer.from(this._auth.credentials.user + "", "utf-8").toString("base64"));
  }
  /**
   * Handle the response for AUTH CRAM-MD5 command. We are expecting
   * '334 <challenge string>'. Data to be sent as response needs to be
   * base64 decoded challenge string, MD5 hashed using the password as
   * a HMAC key, prefixed by the username and a space, and finally all
   * base64 encoded again.
   *
   * @param str Message from the server
   * @param callback Callback to run once the authentication sequence completes
   * @internal
   */
  _actionAUTH_CRAM_MD5(str, callback) {
    const challengeMatch = str.match(/^334\s+(.+)$/);
    if (!challengeMatch) {
      return callback(this._formatError("Invalid login sequence while waiting for server challenge string", "EAUTH", str, "AUTH CRAM-MD5"));
    }
    const base64decoded = Buffer.from(challengeMatch[1], "base64").toString("ascii");
    const hmacMD5 = crypto6.createHmac("md5", this._auth.credentials.pass);
    hmacMD5.update(base64decoded);
    const prepended = this._auth.credentials.user + " " + hmacMD5.digest("hex");
    this._responseActions.push((str2) => {
      this._actionAUTH_CRAM_MD5_PASS(str2, callback);
    });
    this._sendCommand(
      Buffer.from(prepended).toString("base64"),
      // hidden hash for logs
      Buffer.from(this._auth.credentials.user + " /* secret */").toString("base64")
    );
  }
  /**
   * Handles the response to CRAM-MD5 authentication, if there's no error,
   * the user can be considered logged in. Start waiting for a message to send
   *
   * @param str Message from the server
   * @param callback Callback to run once the authentication sequence completes
   * @internal
   */
  _actionAUTH_CRAM_MD5_PASS(str, callback) {
    if (!str.match(/^235\s+/)) {
      return callback(this._formatError('Invalid login sequence while waiting for "235"', "EAUTH", str, "AUTH CRAM-MD5"));
    }
    this.logger.info({
      tnx: "smtp",
      username: this._auth.user,
      action: "authenticated",
      method: this._authMethod
    }, "User %s authenticated", JSON.stringify(this._auth.user));
    this.authenticated = true;
    callback(null, true);
  }
  /**
   * Handle the response for AUTH LOGIN command. We are expecting
   * '334 UGFzc3dvcmQ6' (base64 for 'Password:'). Data to be sent as
   * response needs to be base64 encoded password.
   *
   * @param str Message from the server
   * @param callback Callback to run once the authentication sequence completes
   * @internal
   */
  _actionAUTH_LOGIN_PASS(str, callback) {
    if (!/^334[ -]/.test(str)) {
      return callback(this._formatError('Invalid login sequence while waiting for "334 UGFzc3dvcmQ6"', "EAUTH", str, "AUTH LOGIN"));
    }
    this._responseActions.push((str2) => {
      this._actionAUTHComplete(str2, callback);
    });
    this._sendCommand(
      Buffer.from((this._auth.credentials.pass || "").toString(), "utf-8").toString("base64"),
      // Hidden pass for logs
      Buffer.from("/* secret */", "utf-8").toString("base64")
    );
  }
  /**
   * Handles the response for authentication, if there's no error,
   * the user can be considered logged in. Start waiting for a message to send
   *
   * @param str Message from the server
   * @param isRetry True if this is a retry after a failed login, or the callback itself
   * @param [callback] Callback to run once the authentication sequence completes
   * @internal
   */
  _actionAUTHComplete(str, isRetry, callback) {
    if (!callback && typeof isRetry === "function") {
      callback = isRetry;
      isRetry = false;
    }
    if (str.substr(0, 3) === "334") {
      this._responseActions.push((str2) => {
        if (isRetry || this._authMethod !== "XOAUTH2") {
          this._actionAUTHComplete(str2, true, callback);
        } else {
          setImmediate(() => this._handleXOauth2Token(true, callback));
        }
      });
      this._sendCommand("");
      return;
    }
    if (str.charAt(0) !== "2") {
      this.logger.info({
        tnx: "smtp",
        username: this._auth.user,
        action: "authfail",
        method: this._authMethod
      }, "User %s failed to authenticate", JSON.stringify(this._auth.user));
      return callback(this._formatError("Invalid login", "EAUTH", str, "AUTH " + this._authMethod));
    }
    this.logger.info({
      tnx: "smtp",
      username: this._auth.user,
      action: "authenticated",
      method: this._authMethod
    }, "User %s authenticated", JSON.stringify(this._auth.user));
    this.authenticated = true;
    callback(null, true);
  }
  /**
   * Handle response for a MAIL FROM: command
   *
   * @param str Message from the server
   * @param callback Callback to run once the envelope is processed
   * @internal
   */
  _actionMAIL(str, callback) {
    const envelope = this._envelope;
    if (Number(str.charAt(0)) !== 2) {
      const message = this._usingSmtpUtf8 && /^550 /.test(str) && /[\x80-\uFFFF]/.test(envelope.from) ? "Internationalized mailbox name not allowed" : "Mail command failed";
      envelope.mailError = this._formatError(message, "EENVELOPE", str, "MAIL FROM");
    }
    this._advanceEnvelope(str, callback);
  }
  /**
   * Handle response for a RCPT TO: command
   *
   * @param str Message from the server
   * @param callback Callback to run once the envelope is processed
   * @internal
   */
  _actionRCPT(str, callback) {
    const envelope = this._envelope;
    let err;
    const curRecipient = this._recipientQueue.shift();
    if (Number(str.charAt(0)) !== 2) {
      const message = this._usingSmtpUtf8 && /^553 /.test(str) && /[\x80-\uFFFF]/.test(curRecipient) ? "Internationalized mailbox name not allowed" : "Recipient command failed";
      envelope.rejected.push(curRecipient);
      err = this._formatError(message, "EENVELOPE", str, "RCPT TO");
      err.recipient = curRecipient;
      envelope.rejectedErrors.push(err);
    } else {
      envelope.accepted.push(curRecipient);
    }
    this._advanceEnvelope(str, callback);
  }
  /**
   * Moves the envelope on after a reply to MAIL FROM or RCPT TO. A pipelined envelope sent every
   * command at once and is decided by the reply to DATA. Otherwise the commands go one at a
   * time: the next recipient, or once every reply is in, DATA or the error that ends the message
   *
   * @param str The reply that was handled
   * @param callback Callback to run once the envelope is processed
   * @internal
   */
  _advanceEnvelope(str, callback) {
    const envelope = this._envelope;
    if (envelope.pipelined) {
      return;
    }
    if (envelope.mailError) {
      return callback(envelope.mailError);
    }
    if (envelope.rcptQueue.length) {
      return this._sendRcpt(envelope.rcptQueue.shift(), callback);
    }
    if (this._recipientQueue.length) {
      return;
    }
    const err = this._envelopeError(str);
    if (err) {
      return callback(err);
    }
    this._responseActions.push((str2) => {
      this._actionDATA(str2, callback);
    });
    this._sendCommand("DATA");
  }
  /**
   * Decides how the envelope went once every reply to MAIL FROM and RCPT TO is in. Called after
   * the last RCPT TO reply, or with PIPELINING on the reply to the DATA command sent along
   *
   * @param str The reply being handled
   * @returns The error to fail the message with, or null when DATA can go ahead
   * @internal
   */
  _envelopeError(str) {
    const envelope = this._envelope;
    if (envelope.mailError) {
      return envelope.mailError;
    }
    if (envelope.accepted.length) {
      return null;
    }
    const deferred = envelope.rejectedErrors.find((rejectedErr) => rejectedErr.responseCode && rejectedErr.responseCode < 500);
    const lastRejected = envelope.rejectedErrors[envelope.rejectedErrors.length - 1];
    const reply2 = deferred?.response ?? (envelope.pipelined && lastRejected ? lastRejected.response : str);
    const err = this._formatError("Can't send mail - all recipients were rejected", "EENVELOPE", reply2, "RCPT TO");
    err.rejected = envelope.rejected;
    err.rejectedErrors = envelope.rejectedErrors;
    return err;
  }
  /**
   * Handle response for a DATA command
   *
   * @param str Message from the server
   * @param callback Callback to run once the envelope is processed
   * @internal
   */
  _actionDATA(str, callback) {
    const envelope = this._envelope;
    if (envelope.pipelined) {
      const err = this._envelopeError(str);
      if (err) {
        if (/^3/.test(str)) {
          if (envelope.mailError) {
            this.close();
            return callback(err);
          }
          this._responseActions.push(() => callback(err));
          this._sendCommand(".");
          return;
        }
        return callback(err);
      }
    }
    if (!/^[23]/.test(str)) {
      return callback(this._formatError("Data command failed", "EENVELOPE", str, "DATA"));
    }
    const response = {
      accepted: envelope.accepted,
      rejected: envelope.rejected
    };
    if (this._ehloLines && this._ehloLines.length) {
      response.ehlo = this._ehloLines;
    }
    if (envelope.rejectedErrors.length) {
      response.rejectedErrors = envelope.rejectedErrors;
    }
    callback(null, response);
  }
  /**
   * Handle response for a DATA stream when using SMTP
   * We expect a single response that defines if the sending succeeded or failed
   *
   * @param str Message from the server
   * @param callback Callback to run with the final send result
   * @internal
   */
  _actionSMTPStream(str, callback) {
    if (Number(str.charAt(0)) !== 2) {
      return callback(this._formatError("Message failed", "EMESSAGE", str, "DATA"));
    }
    return callback(null, str);
  }
  /**
   * Handle response for a DATA stream
   * We expect a separate response for every recipient. All recipients can either
   * succeed or fail separately
   *
   * @param recipient The recipient this response applies to
   * @param final Is this the final recipient?
   * @param str Message from the server
   * @param callback Callback to run with the final send result
   * @internal
   */
  _actionLMTPStream(recipient, final, str, callback) {
    const envelope = this._envelope;
    let err;
    if (Number(str.charAt(0)) !== 2) {
      err = this._formatError("Message failed for recipient " + recipient, "EMESSAGE", str, "DATA");
      err.recipient = recipient;
      envelope.rejected.push(recipient);
      envelope.rejectedErrors.push(err);
      for (let i = 0, len = envelope.accepted.length; i < len; i++) {
        if (envelope.accepted[i] === recipient) {
          envelope.accepted.splice(i, 1);
        }
      }
    }
    if (final) {
      return callback(null, str);
    }
  }
  /** @internal */
  _handleXOauth2Token(isRetry, callback) {
    this._auth.oauth2.getToken(isRetry, (err, accessToken) => {
      if (err) {
        this.logger.info({
          tnx: "smtp",
          username: this._auth.user,
          action: "authfail",
          method: this._authMethod
        }, "User %s failed to authenticate", JSON.stringify(this._auth.user));
        return callback(this._formatError(err, "EAUTH", false, "AUTH XOAUTH2"));
      }
      this._responseActions.push((str) => {
        this._actionAUTHComplete(str, isRetry, callback);
      });
      this._sendCommand(
        "AUTH XOAUTH2 " + this._auth.oauth2.buildXOAuth2Token(accessToken),
        //  Hidden for logs
        "AUTH XOAUTH2 " + this._auth.oauth2.buildXOAuth2Token("/* secret */")
      );
    });
  }
  /**
   *
   * @param command
   * @internal
   */
  _isDestroyedMessage(command) {
    if (this._destroyed) {
      return "Cannot " + command + " - smtp connection is already destroyed.";
    }
    if (this._socket) {
      if (this._socket.destroyed) {
        return "Cannot " + command + " - smtp connection socket is already destroyed.";
      }
      if (!this._socket.writable) {
        return "Cannot " + command + " - smtp connection socket is already half-closed.";
      }
    }
  }
  /** @internal */
  _getHostname() {
    let defaultHostname;
    try {
      defaultHostname = os2.hostname() || "";
    } catch (_err) {
      defaultHostname = "localhost";
    }
    if (!defaultHostname || defaultHostname.indexOf(".") < 0) {
      defaultHostname = "[127.0.0.1]";
    }
    if (defaultHostname.match(/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/)) {
      defaultHostname = "[" + defaultHostname + "]";
    }
    return defaultHostname;
  }
};
var smtp_connection_default = SMTPConnection;

// node_modules/nodemailer/dist/esm/xoauth2/index.js
import { Stream } from "node:stream";
import crypto7 from "node:crypto";
var XOAuth2 = class extends Stream {
  constructor(options, logger) {
    super();
    this.options = options || {};
    this.configError = false;
    if (options && options.serviceClient) {
      if (!options.privateKey || !options.user) {
        const err = new Error('Options "privateKey" and "user" are required for service account!');
        err.code = EOAUTH2;
        this.configError = err;
      }
      const serviceRequestTimeout = Math.min(Math.max(Number(this.options.serviceRequestTimeout) || 0, 0), 3600);
      this.options.serviceRequestTimeout = serviceRequestTimeout || 5 * 60;
    }
    this.logger = getLogger({
      logger
    }, {
      component: this.options.component || "OAuth2"
    });
    this.provisionCallback = typeof this.options.provisionCallback === "function" ? this.options.provisionCallback : false;
    this.options.accessUrl = this.options.accessUrl || "https://accounts.google.com/o/oauth2/token";
    this.options.customHeaders = this.options.customHeaders || {};
    this.options.customParams = this.options.customParams || {};
    this.accessToken = this.options.accessToken || false;
    if (this.options.expires && Number(this.options.expires)) {
      this.expires = this.options.expires;
    } else {
      const timeout = Math.max(Number(this.options.timeout) || 0, 0);
      this.expires = timeout && Date.now() + timeout * 1e3 || 0;
    }
    this.renewing = false;
    this.renewalQueue = [];
  }
  /**
   * Returns or generates (if previous has expired) a XOAuth2 token
   *
   * @param renew If false then use cached access token (if available)
   * @param callback Callback function with error object and token string
   */
  getToken(renew, callback) {
    const done = callback;
    if (this.configError) {
      return done(this.configError);
    }
    if (!renew && this.accessToken && (!this.expires || this.expires > Date.now())) {
      this.logger.debug({
        tnx: "OAUTH2",
        user: this.options.user,
        action: "reuse"
      }, "Reusing existing access token for %s", this.options.user);
      return callback(null, this.accessToken);
    }
    if (!this.provisionCallback && !this.options.refreshToken && !this.options.serviceClient) {
      if (this.accessToken) {
        this.logger.debug({
          tnx: "OAUTH2",
          user: this.options.user,
          action: "reuse"
        }, "Reusing existing access token (no refresh capability) for %s", this.options.user);
        return callback(null, this.accessToken);
      }
      this.logger.error({
        tnx: "OAUTH2",
        user: this.options.user,
        action: "renew"
      }, "Cannot renew access token for %s: No refresh mechanism available", this.options.user);
      const err = new Error("Can't create new access token for user");
      err.code = EOAUTH2;
      return done(err);
    }
    if (this.renewing) {
      this.renewalQueue.push({ renew, callback: done });
      return;
    }
    this.renewing = true;
    const generateCallback = (err, accessToken) => {
      this.renewalQueue.forEach((item) => item.callback(err, accessToken));
      this.renewalQueue = [];
      this.renewing = false;
      if (err) {
        this.logger.error({
          err,
          tnx: "OAUTH2",
          user: this.options.user,
          action: "renew"
        }, "Failed generating new Access Token for %s", this.options.user);
      } else {
        this.logger.info({
          tnx: "OAUTH2",
          user: this.options.user,
          action: "renew"
        }, "Generated new Access Token for %s", this.options.user);
      }
      done(err, accessToken);
    };
    if (this.provisionCallback) {
      this.provisionCallback(this.options.user, !!renew, (err, accessToken, expires) => {
        if (!err && accessToken) {
          this.accessToken = accessToken;
          this.expires = expires || 0;
        }
        generateCallback(err, accessToken);
      });
    } else {
      this.generateToken(generateCallback);
    }
  }
  /**
   * Updates token values
   *
   * @param accessToken New access token
   * @param timeout Access token lifetime in seconds
   *
   * Emits 'token': { user: User email-address, accessToken: the new accessToken, timeout: TTL in seconds}
   */
  updateToken(accessToken, timeout) {
    this.accessToken = accessToken;
    timeout = Math.max(Number(timeout) || 0, 0);
    this.expires = timeout && Date.now() + timeout * 1e3 || 0;
    this.emit("token", {
      user: this.options.user,
      accessToken: accessToken || "",
      expires: this.expires
    });
  }
  /**
   * Generates a new XOAuth2 token with the credentials provided at initialization
   *
   * @param callback Callback function with error object and token string
   */
  generateToken(callback) {
    const done = callback;
    let urlOptions;
    let loggedUrlOptions;
    if (this.options.serviceClient) {
      const iat = Math.floor(Date.now() / 1e3);
      const tokenData = {
        iss: this.options.serviceClient,
        scope: this.options.scope || "https://mail.google.com/",
        sub: this.options.user,
        aud: this.options.accessUrl,
        iat,
        exp: iat + this.options.serviceRequestTimeout
      };
      let token;
      try {
        token = this.jwtSignRS256(tokenData);
      } catch (_err) {
        const err = new Error("Can't generate token. Check your auth options");
        err.code = EOAUTH2;
        return done(err);
      }
      urlOptions = {
        grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
        assertion: token
      };
      loggedUrlOptions = {
        grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
        assertion: tokenData
      };
    } else {
      if (!this.options.refreshToken) {
        const err = new Error("Can't create new access token for user");
        err.code = EOAUTH2;
        return done(err);
      }
      urlOptions = {
        client_id: this.options.clientId || "",
        client_secret: this.options.clientSecret || "",
        refresh_token: this.options.refreshToken,
        grant_type: "refresh_token"
      };
      loggedUrlOptions = {
        client_id: this.options.clientId || "",
        client_secret: (this.options.clientSecret || "").substr(0, 6) + "...",
        refresh_token: (this.options.refreshToken || "").substr(0, 6) + "...",
        grant_type: "refresh_token"
      };
    }
    Object.assign(urlOptions, this.options.customParams);
    Object.assign(loggedUrlOptions, this.options.customParams);
    this.logger.debug({
      tnx: "OAUTH2",
      user: this.options.user,
      action: "generate"
    }, "Requesting token using: %s", JSON.stringify(loggedUrlOptions));
    this.postRequest(this.options.accessUrl, urlOptions, this.options, (error2, body) => {
      let data;
      if (error2) {
        return done(error2);
      }
      try {
        data = JSON.parse(body.toString());
      } catch (E) {
        return done(E);
      }
      if (!data || typeof data !== "object") {
        this.logger.debug({
          tnx: "OAUTH2",
          user: this.options.user,
          action: "post"
        }, "Response: %s", (body || "").toString());
        const err2 = new Error("Invalid authentication response");
        err2.code = EOAUTH2;
        return done(err2);
      }
      const logData = Object.assign({}, data);
      if (logData.access_token) {
        logData.access_token = (logData.access_token || "").toString().substr(0, 6) + "...";
      }
      this.logger.debug({
        tnx: "OAUTH2",
        user: this.options.user,
        action: "post"
      }, "Response: %s", JSON.stringify(logData));
      if (data.error) {
        let errorMessage = data.error;
        if (data.error_description) {
          errorMessage += ": " + data.error_description;
        }
        if (data.error_uri) {
          errorMessage += " (" + data.error_uri + ")";
        }
        const err2 = new Error(errorMessage);
        err2.code = EOAUTH2;
        return done(err2);
      }
      if (data.access_token) {
        this.updateToken(data.access_token, data.expires_in);
        return callback(null, this.accessToken);
      }
      const err = new Error("No access token");
      err.code = EOAUTH2;
      return done(err);
    });
  }
  /**
   * Converts an access_token and user id into a base64 encoded XOAuth2 token
   *
   * @param [accessToken] Access token string
   * @return Base64 encoded token for IMAP or SMTP login
   */
  buildXOAuth2Token(accessToken) {
    const authData = ["user=" + (this.options.user || ""), "auth=Bearer " + (accessToken || this.accessToken), "", ""];
    return Buffer.from(authData.join(""), "utf-8").toString("base64");
  }
  /**
   * Custom POST request handler.
   * This is only needed to keep paths short in Windows, usually this module
   * is a dependency of a dependency and if it tries to require something
   * like the request module the paths get way too long to handle for Windows.
   * As we do only a simple POST request we do not actually require complicated
   * logic support (no redirects, no nothing) anyway.
   *
   * @param url Url to POST to
   * @param payload Payload to POST
   * @param params Client options, the customHeaders and tls values are used for the request
   * @param callback Callback function with (err, buff)
   */
  postRequest(url, payload, params, callback) {
    let returned = false;
    const chunks = [];
    let chunklen = 0;
    const fetchOptions = {
      method: "post",
      headers: params.customHeaders,
      body: payload,
      allowErrorResponse: true,
      // unset falls back to the fetch default, a stalled token endpoint would otherwise keep
      // `renewing` set and queue every later request
      timeout: params.requestTimeout
    };
    if (/^https:/i.test(url)) {
      fetchOptions.tls = Object.assign({ rejectUnauthorized: true }, params.tls || {});
    }
    const req = fetch_default(url, fetchOptions);
    req.on("readable", () => {
      let chunk;
      while ((chunk = req.read()) !== null) {
        chunks.push(chunk);
        chunklen += chunk.length;
      }
    });
    req.once("error", (err) => {
      if (returned) {
        return;
      }
      returned = true;
      return callback(err);
    });
    req.once("end", () => {
      if (returned) {
        return;
      }
      returned = true;
      return callback(null, Buffer.concat(chunks, chunklen));
    });
  }
  /**
   * Encodes a buffer or a string into Base64url format
   *
   * @param data The data to convert
   * @return The encoded string
   */
  toBase64URL(data) {
    if (typeof data === "string") {
      data = Buffer.from(data);
    }
    return data.toString("base64").replace(/[=]+/g, "").replace(/\+/g, "-").replace(/\//g, "_");
  }
  /**
   * Creates a JSON Web Token signed with RS256 (SHA256 + RSA)
   *
   * @param payload The payload to include in the generated token
   * @return The generated and signed token
   */
  jwtSignRS256(payload) {
    const signedPayload = ['{"alg":"RS256","typ":"JWT"}', JSON.stringify(payload)].map((val) => this.toBase64URL(val)).join(".");
    const signature = crypto7.createSign("RSA-SHA256").update(signedPayload).sign(this.options.privateKey);
    return signedPayload + "." + this.toBase64URL(signature);
  }
};
var xoauth2_default = XOAuth2;

// node_modules/nodemailer/dist/esm/smtp-pool/pool-resource.js
import { EventEmitter as EventEmitter3 } from "node:events";
var PoolResource = class extends EventEmitter3 {
  constructor(pool) {
    super();
    this.pool = pool;
    this.options = pool.options;
    this.logger = this.pool.logger;
    if (this.options.auth) {
      switch ((this.options.auth.type || "").toString().toUpperCase()) {
        case "OAUTH2": {
          const oauth2 = new xoauth2_default(this.options.auth, this.logger);
          oauth2.provisionCallback = this.pool.mailer && this.pool.mailer.get("oauth2_provision_cb") || oauth2.provisionCallback;
          this.auth = {
            type: "OAUTH2",
            user: this.options.auth.user,
            oauth2,
            method: "XOAUTH2"
          };
          oauth2.on("token", (token) => this.pool.mailer.emit("token", token));
          oauth2.on("error", (err) => this._fail(err));
          break;
        }
        default:
          if (!this.options.auth.user && !this.options.auth.pass) {
            break;
          }
          this.auth = {
            type: (this.options.auth.type || "").toString().toUpperCase() || "LOGIN",
            user: this.options.auth.user,
            credentials: {
              user: this.options.auth.user || "",
              pass: this.options.auth.pass,
              options: this.options.auth.options
            },
            method: (this.options.auth.method || "").trim().toUpperCase() || this.options.authMethod || false
          };
      }
    }
    this._connection = false;
    this._connected = false;
    this.messages = 0;
    this.available = true;
    this._failed = false;
    this._sending = false;
    this._idleTimer = false;
  }
  /**
   * Emits 'error' for the first failure only. A dead resource can report the same failure more
   * than once (the connection error, then the send callback), the pool handles it once
   * @internal
   */
  _fail(err) {
    if (this._failed) {
      return;
    }
    this._failed = true;
    this.emit("error", err);
  }
  /**
   * Initiates a connection to the SMTP server
   *
   * @param callback Callback function to run once the connection is established or failed
   */
  connect(callback) {
    const connectStartedAt = Date.now();
    this.pool.getSocket(Object.assign({}, this.options, { connectStartedAt }), (err, socketOptions) => {
      if (err) {
        this._fail(err);
        return callback(err);
      }
      let returned = false;
      let options = this.options;
      if (socketOptions && socketOptions.connection) {
        this.logger.info({
          tnx: "proxy",
          remoteAddress: socketOptions.connection.remoteAddress,
          remotePort: socketOptions.connection.remotePort,
          destHost: options.host || "",
          destPort: options.port || "",
          action: "connected"
        }, "Using proxied socket from %s:%s to %s:%s", socketOptions.connection.remoteAddress, socketOptions.connection.remotePort, options.host || "", options.port || "");
        options = Object.assign(assign(false, options), socketOptions);
      }
      this.connection = new smtp_connection_default(options);
      this.connection._connectStartedAt = connectStartedAt;
      this.connection.on("error", (err2) => {
        if (this._sending) {
          return;
        }
        if (this._connected && isTransientError(err2)) {
          this.logger.info({
            tnx: "pool",
            cid: this.id
          }, "Connection #%s was closed by the server: %s", this.id, err2.message);
          return;
        }
        this._fail(err2);
        if (returned) {
          return;
        }
        returned = true;
        return callback(err2);
      });
      this.connection.once("end", () => {
        this.close();
        returned = true;
      });
      this.connection.connect((err2) => {
        if (returned) {
          return;
        }
        if (err2) {
          returned = true;
          return;
        }
        if (this.auth && (this.connection.allowsAuth || options.forceAuth)) {
          this.connection.login(this.auth, (err3) => {
            if (returned) {
              return;
            }
            returned = true;
            if (err3) {
              this.connection.close();
              this._fail(err3);
              return callback(err3);
            }
            this._connected = true;
            callback(null, true);
          });
        } else {
          returned = true;
          this._connected = true;
          return callback(null, true);
        }
      });
    });
  }
  /**
   * Sends an e-mail to be sent using the selected settings
   *
   * @param mail Mail object
   * @param callback Callback function
   */
  send(mail, callback) {
    if (!this._connected) {
      return this.connect((err) => {
        if (err) {
          return callback(err);
        }
        return this.send(mail, callback);
      });
    }
    const envelope = mail.message.getEnvelope();
    const messageId = mail.message.messageId();
    const recipients = [].concat(envelope.to || []);
    if (recipients.length > 3) {
      recipients.push("...and " + recipients.splice(2).length + " more");
    }
    this.logger.info({
      tnx: "send",
      messageId,
      cid: this.id
    }, "Sending message %s using #%s to <%s>", messageId, this.id, recipients.join(", "));
    if (mail.data.dsn) {
      envelope.dsn = mail.data.dsn;
    }
    if (mail.data.requireTLSExtensionEnabled) {
      envelope.requireTLSExtensionEnabled = mail.data.requireTLSExtensionEnabled;
    }
    this._sending = true;
    const reused = this.messages > 0;
    const messageStream = mail.message.createReadStream();
    this.connection.send(envelope, messageStream, (err, info) => {
      this._sending = false;
      this.messages++;
      if (err) {
        if (reused && messageStream.readableDidRead === false && isTransientError(err)) {
          this.logger.info({
            tnx: "pool",
            cid: this.id,
            messageId
          }, "Connection #%s was closed by the server before message %s was sent: %s", this.id, messageId, err.message);
          this.connection.close();
          return;
        }
        if ((err.code === EENVELOPE || err.code === EMESSAGE) && err.responseCode !== 421 && !this.connection._destroyed) {
          this.connection.reset((resetErr) => {
            if (resetErr) {
              this.connection.close();
              return;
            }
            this._release();
          });
          return callback(err);
        }
        this.connection.close();
        this._fail(err);
        return callback(err);
      }
      info.envelope = {
        from: envelope.from,
        to: envelope.to
      };
      info.messageId = messageId;
      setImmediate(() => this._release());
      callback(null, info);
    });
  }
  /**
   * Makes the connection available for the next message, or closes it once it has sent
   * maxMessages messages
   *
   * @internal
   */
  _release() {
    if (this.messages >= this.options.maxMessages) {
      const err = new Error("Resource exhausted");
      err.code = EMAXLIMIT;
      this.connection.close();
      this._fail(err);
      return;
    }
    this.pool._checkRateLimit(() => {
      this.available = true;
      this._startIdleTimer();
      this.emit("available");
    });
  }
  /** @internal */
  _startIdleTimer() {
    if (!this.options.idleTimeout || this.options.idleTimeout < 0) {
      return;
    }
    if (this._idleTimer && typeof this._idleTimer.refresh === "function") {
      this._idleTimer.refresh();
      return;
    }
    clearTimeout(this._idleTimer);
    this._idleTimer = setTimeout(() => {
      if (!this.available) {
        return;
      }
      this.logger.debug({
        tnx: "pool",
        cid: this.id
      }, "Closing connection #%s after it was idle for %sms", this.id, this.options.idleTimeout);
      this.available = false;
      this.connection.quit();
    }, this.options.idleTimeout);
    if (typeof this._idleTimer.unref === "function") {
      this._idleTimer.unref();
    }
  }
  /** @internal */
  _stopIdleTimer() {
    clearTimeout(this._idleTimer);
    this._idleTimer = false;
  }
  /**
   * Closes the connection
   */
  close() {
    this._connected = false;
    this._stopIdleTimer();
    if (this.auth && this.auth.oauth2) {
      this.auth.oauth2.removeAllListeners();
    }
    if (this.connection) {
      this.connection.close();
    }
    this.emit("close");
  }
};

// node_modules/nodemailer/dist/esm/well-known/services.js
var services = {
  "126": {
    "description": "126 Mail (NetEase)",
    "host": "smtp.126.com",
    "port": 465,
    "secure": true
  },
  "163": {
    "description": "163 Mail (NetEase)",
    "host": "smtp.163.com",
    "port": 465,
    "secure": true
  },
  "1und1": {
    "description": "1&1 Mail (German hosting provider)",
    "host": "smtp.1und1.de",
    "port": 465,
    "secure": true,
    "authMethod": "LOGIN"
  },
  "Aliyun": {
    "description": "Alibaba Cloud Mail",
    "domains": [
      "aliyun.com"
    ],
    "host": "smtp.aliyun.com",
    "port": 465,
    "secure": true
  },
  "AliyunQiye": {
    "description": "Alibaba Cloud Enterprise Mail",
    "host": "smtp.qiye.aliyun.com",
    "port": 465,
    "secure": true
  },
  "AOL": {
    "description": "AOL Mail",
    "domains": [
      "aol.com"
    ],
    "host": "smtp.aol.com",
    "port": 587
  },
  "Aruba": {
    "description": "Aruba PEC (Italian email provider)",
    "domains": [
      "aruba.it",
      "pec.aruba.it"
    ],
    "aliases": [
      "Aruba PEC"
    ],
    "host": "smtps.aruba.it",
    "port": 465,
    "secure": true,
    "authMethod": "LOGIN"
  },
  "Bluewin": {
    "description": "Bluewin (Swiss email provider)",
    "host": "smtpauths.bluewin.ch",
    "domains": [
      "bluewin.ch"
    ],
    "port": 465
  },
  "BOL": {
    "description": "BOL Mail (Brazilian provider)",
    "domains": [
      "bol.com.br"
    ],
    "host": "smtp.bol.com.br",
    "port": 587,
    "requireTLS": true
  },
  "DebugMail": {
    "description": "DebugMail (email testing service)",
    "host": "debugmail.io",
    "port": 25
  },
  "Disroot": {
    "description": "Disroot (privacy-focused provider)",
    "domains": [
      "disroot.org"
    ],
    "host": "disroot.org",
    "port": 587,
    "secure": false,
    "authMethod": "LOGIN"
  },
  "DynectEmail": {
    "description": "Dyn Email Delivery",
    "aliases": [
      "Dynect"
    ],
    "host": "smtp.dynect.net",
    "port": 25
  },
  "ElasticEmail": {
    "description": "Elastic Email",
    "aliases": [
      "Elastic Email"
    ],
    "host": "smtp.elasticemail.com",
    "port": 465,
    "secure": true
  },
  "Ethereal": {
    "description": "Ethereal Email (email testing service)",
    "aliases": [
      "ethereal.email"
    ],
    "host": "smtp.ethereal.email",
    "port": 587
  },
  "FastMail": {
    "description": "FastMail",
    "domains": [
      "fastmail.com",
      "fastmail.fm"
    ],
    "host": "smtp.fastmail.com",
    "port": 465,
    "secure": true
  },
  "Feishu Mail": {
    "description": "Feishu Mail (Lark)",
    "aliases": [
      "Feishu",
      "FeishuMail"
    ],
    "domains": [
      "www.feishu.cn"
    ],
    "host": "smtp.feishu.cn",
    "port": 465,
    "secure": true
  },
  "Forward Email": {
    "description": "Forward Email (email forwarding service)",
    "aliases": [
      "FE",
      "ForwardEmail"
    ],
    "domains": [
      "forwardemail.net"
    ],
    "host": "smtp.forwardemail.net",
    "port": 465,
    "secure": true
  },
  "GandiMail": {
    "description": "Gandi Mail",
    "aliases": [
      "Gandi",
      "Gandi Mail"
    ],
    "host": "mail.gandi.net",
    "port": 587
  },
  "Gmail": {
    "description": "Gmail",
    "aliases": [
      "Google Mail"
    ],
    "domains": [
      "gmail.com",
      "googlemail.com"
    ],
    "host": "smtp.gmail.com",
    "port": 465,
    "secure": true
  },
  "GmailWorkspace": {
    "description": "Gmail Workspace",
    "aliases": [
      "Google Workspace Mail"
    ],
    "host": "smtp-relay.gmail.com",
    "port": 465,
    "secure": true
  },
  "GMX": {
    "description": "GMX Mail",
    "domains": [
      "gmx.com",
      "gmx.net",
      "gmx.de"
    ],
    "host": "mail.gmx.com",
    "port": 587
  },
  "Godaddy": {
    "description": "GoDaddy Email (US)",
    "host": "smtpout.secureserver.net",
    "port": 25
  },
  "GodaddyAsia": {
    "description": "GoDaddy Email (Asia)",
    "host": "smtp.asia.secureserver.net",
    "port": 25
  },
  "GodaddyEurope": {
    "description": "GoDaddy Email (Europe)",
    "host": "smtp.europe.secureserver.net",
    "port": 25
  },
  "hot.ee": {
    "description": "Hot.ee (Estonian email provider)",
    "host": "mail.hot.ee"
  },
  "Hotmail": {
    "description": "Outlook.com / Hotmail",
    "aliases": [
      "Outlook",
      "Outlook.com",
      "Hotmail.com"
    ],
    "domains": [
      "hotmail.com",
      "outlook.com"
    ],
    "host": "smtp-mail.outlook.com",
    "port": 587
  },
  "iCloud": {
    "description": "iCloud Mail",
    "aliases": [
      "Me",
      "Mac"
    ],
    "domains": [
      "icloud.com",
      "me.com",
      "mac.com"
    ],
    "host": "smtp.mail.me.com",
    "port": 587
  },
  "Infomaniak": {
    "description": "Infomaniak Mail (Swiss hosting provider)",
    "host": "mail.infomaniak.com",
    "domains": [
      "ik.me",
      "ikmail.com",
      "etik.com"
    ],
    "port": 587
  },
  "KolabNow": {
    "description": "KolabNow (secure email service)",
    "domains": [
      "kolabnow.com"
    ],
    "aliases": [
      "Kolab"
    ],
    "host": "smtp.kolabnow.com",
    "port": 465,
    "secure": true,
    "authMethod": "LOGIN"
  },
  "Loopia": {
    "description": "Loopia (Swedish hosting provider)",
    "host": "mailcluster.loopia.se",
    "port": 465
  },
  "Loops": {
    "description": "Loops",
    "host": "smtp.loops.so",
    "port": 587
  },
  "mail.ee": {
    "description": "Mail.ee (Estonian email provider)",
    "host": "smtp.mail.ee"
  },
  "Mail.ru": {
    "description": "Mail.ru",
    "host": "smtp.mail.ru",
    "port": 465,
    "secure": true
  },
  "Mailcatch.app": {
    "description": "Mailcatch (email testing service)",
    "host": "sandbox-smtp.mailcatch.app",
    "port": 2525
  },
  "Maildev": {
    "description": "MailDev (local email testing)",
    "port": 1025,
    "ignoreTLS": true
  },
  "MailerSend": {
    "description": "MailerSend",
    "host": "smtp.mailersend.net",
    "port": 587
  },
  "Mailgun": {
    "description": "Mailgun",
    "host": "smtp.mailgun.org",
    "port": 465,
    "secure": true
  },
  "Mailjet": {
    "description": "Mailjet",
    "host": "in.mailjet.com",
    "port": 587
  },
  "Mailosaur": {
    "description": "Mailosaur (email testing service)",
    "host": "mailosaur.io",
    "port": 25
  },
  "MailSenpai": {
    "description": "MailSenpai (SMTP Senpai, EU)",
    "host": "relay.mailsenpai.com",
    "port": 2525,
    "secure": false
  },
  "Mailtrap": {
    "description": "Mailtrap",
    "host": "live.smtp.mailtrap.io",
    "port": 587
  },
  "Mandrill": {
    "description": "Mandrill (by Mailchimp)",
    "host": "smtp.mandrillapp.com",
    "port": 587
  },
  "Naver": {
    "description": "Naver Mail (Korean email provider)",
    "host": "smtp.naver.com",
    "port": 587
  },
  "OhMySMTP": {
    "description": "OhMySMTP (email delivery service)",
    "host": "smtp.ohmysmtp.com",
    "port": 587,
    "secure": false
  },
  "One": {
    "description": "One.com Email",
    "host": "send.one.com",
    "port": 465,
    "secure": true
  },
  "OpenMailBox": {
    "description": "OpenMailBox",
    "aliases": [
      "OMB",
      "openmailbox.org"
    ],
    "host": "smtp.openmailbox.org",
    "port": 465,
    "secure": true
  },
  "Outlook365": {
    "description": "Microsoft 365 / Office 365",
    "host": "smtp.office365.com",
    "port": 587,
    "secure": false
  },
  "Postmark": {
    "description": "Postmark",
    "aliases": [
      "PostmarkApp"
    ],
    "host": "smtp.postmarkapp.com",
    "port": 2525
  },
  "Proton": {
    "description": "Proton Mail",
    "aliases": [
      "ProtonMail",
      "Proton.me",
      "Protonmail.com",
      "Protonmail.ch"
    ],
    "domains": [
      "proton.me",
      "protonmail.com",
      "pm.me",
      "protonmail.ch"
    ],
    "host": "smtp.protonmail.ch",
    "port": 587,
    "requireTLS": true
  },
  "qiye.aliyun": {
    "description": "Alibaba Mail Enterprise Edition",
    "host": "smtp.mxhichina.com",
    "port": "465",
    "secure": true
  },
  "QQ": {
    "description": "QQ Mail",
    "domains": [
      "qq.com"
    ],
    "host": "smtp.qq.com",
    "port": 465,
    "secure": true
  },
  "QQex": {
    "description": "QQ Enterprise Mail",
    "aliases": [
      "QQ Enterprise"
    ],
    "domains": [
      "exmail.qq.com"
    ],
    "host": "smtp.exmail.qq.com",
    "port": 465,
    "secure": true
  },
  "Resend": {
    "description": "Resend",
    "host": "smtp.resend.com",
    "port": 465,
    "secure": true
  },
  "Runbox": {
    "description": "Runbox (Norwegian email provider)",
    "domains": [
      "runbox.com"
    ],
    "host": "smtp.runbox.com",
    "port": 465,
    "secure": true
  },
  "SendCloud": {
    "description": "SendCloud (Chinese email delivery)",
    "host": "smtp.sendcloud.net",
    "port": 2525
  },
  "SendGrid": {
    "description": "SendGrid",
    "host": "smtp.sendgrid.net",
    "port": 587
  },
  "SendinBlue": {
    "description": "Brevo (formerly Sendinblue)",
    "aliases": [
      "Brevo"
    ],
    "host": "smtp-relay.brevo.com",
    "port": 587
  },
  "SendPulse": {
    "description": "SendPulse",
    "host": "smtp-pulse.com",
    "port": 465,
    "secure": true
  },
  "SES": {
    "description": "AWS SES US East (N. Virginia)",
    "host": "email-smtp.us-east-1.amazonaws.com",
    "port": 465,
    "secure": true
  },
  "SES-AP-NORTHEAST-1": {
    "description": "AWS SES Asia Pacific (Tokyo)",
    "host": "email-smtp.ap-northeast-1.amazonaws.com",
    "port": 465,
    "secure": true
  },
  "SES-AP-NORTHEAST-2": {
    "description": "AWS SES Asia Pacific (Seoul)",
    "host": "email-smtp.ap-northeast-2.amazonaws.com",
    "port": 465,
    "secure": true
  },
  "SES-AP-NORTHEAST-3": {
    "description": "AWS SES Asia Pacific (Osaka)",
    "host": "email-smtp.ap-northeast-3.amazonaws.com",
    "port": 465,
    "secure": true
  },
  "SES-AP-SOUTH-1": {
    "description": "AWS SES Asia Pacific (Mumbai)",
    "host": "email-smtp.ap-south-1.amazonaws.com",
    "port": 465,
    "secure": true
  },
  "SES-AP-SOUTHEAST-1": {
    "description": "AWS SES Asia Pacific (Singapore)",
    "host": "email-smtp.ap-southeast-1.amazonaws.com",
    "port": 465,
    "secure": true
  },
  "SES-AP-SOUTHEAST-2": {
    "description": "AWS SES Asia Pacific (Sydney)",
    "host": "email-smtp.ap-southeast-2.amazonaws.com",
    "port": 465,
    "secure": true
  },
  "SES-CA-CENTRAL-1": {
    "description": "AWS SES Canada (Central)",
    "host": "email-smtp.ca-central-1.amazonaws.com",
    "port": 465,
    "secure": true
  },
  "SES-EU-CENTRAL-1": {
    "description": "AWS SES Europe (Frankfurt)",
    "host": "email-smtp.eu-central-1.amazonaws.com",
    "port": 465,
    "secure": true
  },
  "SES-EU-NORTH-1": {
    "description": "AWS SES Europe (Stockholm)",
    "host": "email-smtp.eu-north-1.amazonaws.com",
    "port": 465,
    "secure": true
  },
  "SES-EU-WEST-1": {
    "description": "AWS SES Europe (Ireland)",
    "host": "email-smtp.eu-west-1.amazonaws.com",
    "port": 465,
    "secure": true
  },
  "SES-EU-WEST-2": {
    "description": "AWS SES Europe (London)",
    "host": "email-smtp.eu-west-2.amazonaws.com",
    "port": 465,
    "secure": true
  },
  "SES-EU-WEST-3": {
    "description": "AWS SES Europe (Paris)",
    "host": "email-smtp.eu-west-3.amazonaws.com",
    "port": 465,
    "secure": true
  },
  "SES-SA-EAST-1": {
    "description": "AWS SES South America (S\xE3o Paulo)",
    "host": "email-smtp.sa-east-1.amazonaws.com",
    "port": 465,
    "secure": true
  },
  "SES-US-EAST-1": {
    "description": "AWS SES US East (N. Virginia)",
    "host": "email-smtp.us-east-1.amazonaws.com",
    "port": 465,
    "secure": true
  },
  "SES-US-EAST-2": {
    "description": "AWS SES US East (Ohio)",
    "host": "email-smtp.us-east-2.amazonaws.com",
    "port": 465,
    "secure": true
  },
  "SES-US-GOV-EAST-1": {
    "description": "AWS SES GovCloud (US-East)",
    "host": "email-smtp.us-gov-east-1.amazonaws.com",
    "port": 465,
    "secure": true
  },
  "SES-US-GOV-WEST-1": {
    "description": "AWS SES GovCloud (US-West)",
    "host": "email-smtp.us-gov-west-1.amazonaws.com",
    "port": 465,
    "secure": true
  },
  "SES-US-WEST-1": {
    "description": "AWS SES US West (N. California)",
    "host": "email-smtp.us-west-1.amazonaws.com",
    "port": 465,
    "secure": true
  },
  "SES-US-WEST-2": {
    "description": "AWS SES US West (Oregon)",
    "host": "email-smtp.us-west-2.amazonaws.com",
    "port": 465,
    "secure": true
  },
  "Seznam": {
    "description": "Seznam Email (Czech email provider)",
    "aliases": [
      "Seznam Email"
    ],
    "domains": [
      "seznam.cz",
      "email.cz",
      "post.cz",
      "spoluzaci.cz"
    ],
    "host": "smtp.seznam.cz",
    "port": 465,
    "secure": true
  },
  "SMTP2GO": {
    "description": "SMTP2GO",
    "host": "mail.smtp2go.com",
    "port": 2525
  },
  "Sparkpost": {
    "description": "SparkPost",
    "aliases": [
      "SparkPost",
      "SparkPost Mail"
    ],
    "domains": [
      "sparkpost.com"
    ],
    "host": "smtp.sparkpostmail.com",
    "port": 587,
    "secure": false
  },
  "Tipimail": {
    "description": "Tipimail (email delivery service)",
    "host": "smtp.tipimail.com",
    "port": 587
  },
  "TurboSMTP": {
    "description": "TurboSMTP",
    "host": "pro.turbo-smtp.com",
    "port": 465,
    "secure": true
  },
  "TurboSMTP-EU": {
    "description": "TurboSMTP (EU region)",
    "host": "pro.eu.turbo-smtp.com",
    "port": 465,
    "secure": true
  },
  "Tutanota": {
    "description": "Tutanota (Tuta Mail)",
    "domains": [
      "tutanota.com",
      "tuta.com",
      "tutanota.de",
      "tuta.io"
    ],
    "host": "smtp.tutanota.com",
    "port": 465,
    "secure": true
  },
  "Yahoo": {
    "description": "Yahoo Mail",
    "domains": [
      "yahoo.com"
    ],
    "host": "smtp.mail.yahoo.com",
    "port": 465,
    "secure": true
  },
  "Yandex": {
    "description": "Yandex Mail",
    "domains": [
      "yandex.ru"
    ],
    "host": "smtp.yandex.ru",
    "port": 465,
    "secure": true
  },
  "Zimbra": {
    "description": "Zimbra Mail Server",
    "aliases": [
      "Zimbra Collaboration"
    ],
    "host": "smtp.zimbra.com",
    "port": 587,
    "requireTLS": true
  },
  "Zoho": {
    "description": "Zoho Mail",
    "host": "smtp.zoho.com",
    "port": 465,
    "secure": true,
    "authMethod": "LOGIN"
  }
};

// node_modules/nodemailer/dist/esm/well-known/index.js
var normalized = {};
Object.keys(services).forEach((key) => {
  const service = services[key];
  const normalizedService = normalizeService(service);
  normalized[normalizeKey(key)] = normalizedService;
  [].concat(service.aliases || []).forEach((alias) => {
    normalized[normalizeKey(alias)] = normalizedService;
  });
  [].concat(service.domains || []).forEach((domain) => {
    normalized[normalizeKey(domain)] = normalizedService;
  });
});
function normalizeKey(key) {
  return key.replace(/[^a-zA-Z0-9.-]/g, "").toLowerCase();
}
function normalizeService(service) {
  const response = {};
  Object.keys(service).forEach((key) => {
    if (!["domains", "aliases"].includes(key)) {
      response[key] = service[key];
    }
  });
  return response;
}
function wellKnown(key) {
  key = normalizeKey(key.split("@").pop());
  return normalized[key] || false;
}

// node_modules/nodemailer/dist/esm/smtp-pool/index.js
var REQUEUE_BASE_DELAY = 50;
var REQUEUE_MAX_DELAY = 2e3;
var SMTPPool = class extends EventEmitter4 {
  constructor(options) {
    super();
    options = options || {};
    if (typeof options === "string") {
      options = {
        url: options
      };
    }
    let urlData;
    let service = options.service;
    if (typeof options.getSocket === "function") {
      this.getSocket = options.getSocket;
    }
    if (options.url) {
      urlData = parseConnectionUrl(options.url);
      service = service || urlData.service;
    }
    this.options = assign(
      false,
      // create new object
      options,
      // regular options
      urlData,
      // url options
      service && wellKnown(service)
      // wellknown options
    );
    this.options.maxConnections = this.options.maxConnections || 5;
    this.options.maxMessages = this.options.maxMessages || 100;
    this.options.maxRequeues = typeof this.options.maxRequeues === "number" ? this.options.maxRequeues : 5;
    this.options.idleTimeout = typeof this.options.idleTimeout === "number" ? this.options.idleTimeout : 4 * 60 * 1e3;
    this.logger = getLogger(this.options, {
      component: this.options.component || "smtp-pool"
    });
    this.name = "SMTP (pool)";
    this.version = version2 + "[client:" + version2 + "]";
    this._rateLimit = {
      counter: 0,
      timeout: null,
      waiting: [],
      checkpoint: false,
      delta: Number(this.options.rateDelta) || 1e3,
      limit: Number(this.options.rateLimit) || 0
    };
    this._closed = false;
    this._queue = [];
    this._connections = [];
    this._connectionCounter = 0;
    this.idling = true;
    setImmediate(() => {
      if (this.idling) {
        this.emit("idle");
      }
    });
  }
  /**
   * Placeholder function for creating proxy sockets. This method immediatelly returns
   * without a socket
   *
   * @param options Connection options
   * @param callback Callback function to run with the socket keys
   */
  getSocket(options, callback) {
    setImmediate(() => callback(null, false));
  }
  /**
   * Queues an e-mail to be sent using the selected settings
   *
   * @param mail Mail object
   * @param callback Callback function
   */
  send(mail, callback) {
    if (this._closed) {
      const err = new Error("Connection pool was closed");
      err.code = ECONNECTION;
      setImmediate(() => callback(err));
      return false;
    }
    this._queue.push({
      mail,
      requeueAttempts: 0,
      callback
    });
    if (this.idling && this._queue.length >= this.options.maxConnections) {
      this.idling = false;
    }
    setImmediate(() => this._processMessages());
    return true;
  }
  /**
   * Closes all connections in the pool. If there is a message being sent, the connection
   * is closed later
   */
  close() {
    let connection;
    const len = this._connections.length;
    this._closed = true;
    this._clearRateLimit();
    if (!len && !this._queue.length) {
      return;
    }
    for (let i = len - 1; i >= 0; i--) {
      if (this._connections[i] && this._connections[i].available) {
        connection = this._connections[i];
        connection.close();
        this.logger.info({
          tnx: "connection",
          cid: connection.id,
          action: "removed"
        }, "Connection #%s removed", connection.id);
      }
    }
    if (len && !this._connections.length) {
      this.logger.debug({
        tnx: "connection"
      }, "All connections removed");
    }
    if (!this._queue.length) {
      return;
    }
    const invokeCallbacks = () => {
      if (!this._queue.length) {
        this.logger.debug({
          tnx: "connection"
        }, "Pending queue entries cleared");
        return;
      }
      const entry = this._queue.shift();
      if (entry && typeof entry.callback === "function") {
        try {
          entry.callback(new Error("Connection pool was closed"));
        } catch (E) {
          this.logger.error({
            err: E,
            tnx: "callback"
          }, "Callback error: %s", E.message);
        }
      }
      setImmediate(invokeCallbacks);
    };
    setImmediate(invokeCallbacks);
  }
  /**
   * Check the queue and available connections. If there is a message to be sent and there is
   * an available connection, then use this connection to send the mail
   * @internal
   */
  _processMessages() {
    if (this._closed) {
      return;
    }
    if (!this._queue.length) {
      if (!this.idling) {
        this.idling = true;
        this.emit("idle");
      }
      return;
    }
    let connection = this._connections.find((c) => c.available);
    if (!connection && this._connections.length < this.options.maxConnections) {
      connection = this._createConnection();
    }
    if (!connection) {
      this.idling = false;
      return;
    }
    if (!this.idling && this._queue.length < this.options.maxConnections) {
      this.idling = true;
      this.emit("idle");
    }
    const entry = connection.queueEntry = this._queue.shift();
    entry.messageId = (connection.queueEntry.mail.message.getHeader("message-id") || "").replace(/[<>\s]/g, "");
    connection.available = false;
    this.logger.debug({
      tnx: "pool",
      cid: connection.id,
      messageId: entry.messageId,
      action: "assign"
    }, "Assigned message <%s> to #%s (%s)", entry.messageId, connection.id, connection.messages + 1);
    if (this._rateLimit.limit) {
      this._rateLimit.counter++;
      if (!this._rateLimit.checkpoint) {
        this._rateLimit.checkpoint = Date.now();
      }
    }
    connection.send(entry.mail, (err, info) => {
      if (entry === connection.queueEntry) {
        try {
          entry.callback(err, info);
        } catch (E) {
          this.logger.error({
            err: E,
            tnx: "callback",
            cid: connection.id
          }, "Callback error for #%s: %s", connection.id, E.message);
        }
        connection.queueEntry = false;
      }
    });
  }
  /**
   * Creates a new pool resource
   * @internal
   */
  _createConnection() {
    const connection = new PoolResource(this);
    connection.id = ++this._connectionCounter;
    this.logger.info({
      tnx: "pool",
      cid: connection.id,
      action: "conection"
    }, "Created new pool resource #%s", connection.id);
    connection.on("available", () => {
      this.logger.debug({
        tnx: "connection",
        cid: connection.id,
        action: "available"
      }, "Connection #%s became available", connection.id);
      if (this._closed) {
        this.close();
      } else {
        this._processMessages();
      }
    });
    connection.once("error", (err) => {
      if (err.code !== EMAXLIMIT) {
        this.logger.warn({
          err,
          tnx: "pool",
          cid: connection.id
        }, "Pool Error for #%s: %s", connection.id, err.message);
      } else {
        this.logger.debug({
          tnx: "pool",
          cid: connection.id,
          action: "maxlimit"
        }, "Max messages limit exchausted for #%s", connection.id);
      }
      if (connection.queueEntry) {
        try {
          connection.queueEntry.callback(err);
        } catch (E) {
          this.logger.error({
            err: E,
            tnx: "callback",
            cid: connection.id
          }, "Callback error for #%s: %s", connection.id, E.message);
        }
        connection.queueEntry = false;
      }
      this._removeConnection(connection);
      this._continueProcessing();
    });
    connection.once("close", () => {
      this.logger.info({
        tnx: "connection",
        cid: connection.id,
        action: "closed"
      }, "Connection #%s was closed", connection.id);
      this._removeConnection(connection);
      if (connection.queueEntry) {
        setTimeout(() => {
          let delay = 0;
          if (connection.queueEntry) {
            if (this._shouldRequeuOnConnectionClose(connection.queueEntry)) {
              delay = this._requeueEntryOnConnectionClose(connection);
            } else {
              this._failDeliveryOnConnectionClose(connection);
            }
          }
          if (delay) {
            setTimeout(() => this._continueProcessing(), delay);
          } else {
            this._continueProcessing();
          }
        }, 50);
      } else {
        if (!this._closed && this.idling && !this._connections.length) {
          this.emit("clear");
        }
        this._continueProcessing();
      }
    });
    this._connections.push(connection);
    return connection;
  }
  /** @internal */
  _shouldRequeuOnConnectionClose(queueEntry) {
    if (this.options.maxRequeues < 0) {
      return true;
    }
    return queueEntry.requeueAttempts < this.options.maxRequeues;
  }
  /** @internal */
  _failDeliveryOnConnectionClose(connection) {
    if (connection.queueEntry && connection.queueEntry.callback) {
      try {
        const err = new Error("Reached maximum number of retries after connection was closed");
        err.code = ECONNECTION;
        connection.queueEntry.callback(err);
      } catch (E) {
        this.logger.error({
          err: E,
          tnx: "callback",
          messageId: connection.queueEntry.messageId,
          cid: connection.id
        }, "Callback error for #%s: %s", connection.id, E.message);
      }
      connection.queueEntry = false;
    }
  }
  /** @internal */
  _requeueEntryOnConnectionClose(connection) {
    const delay = Math.min(REQUEUE_BASE_DELAY * 2 ** connection.queueEntry.requeueAttempts, REQUEUE_MAX_DELAY);
    connection.queueEntry.requeueAttempts += 1;
    this.logger.debug({
      tnx: "pool",
      cid: connection.id,
      messageId: connection.queueEntry.messageId,
      action: "requeue"
    }, "Re-queued message <%s> for #%s. Attempt: #%s", connection.queueEntry.messageId, connection.id, connection.queueEntry.requeueAttempts);
    this._queue.unshift(connection.queueEntry);
    connection.queueEntry = false;
    return delay;
  }
  /**
   * Continue to process message if the pool hasn't closed
   * @internal
   */
  _continueProcessing() {
    if (this._closed) {
      this.close();
    } else {
      setTimeout(() => this._processMessages(), 100);
    }
  }
  /**
   * Remove resource from pool
   *
   * @param connection The PoolResource to remove
   * @internal
   */
  _removeConnection(connection) {
    const index = this._connections.indexOf(connection);
    if (index !== -1) {
      this._connections.splice(index, 1);
    }
  }
  /**
   * Checks if connections have hit current rate limit and if so, queues the availability callback
   *
   * @param callback Callback function to run once rate limiter has been cleared
   * @internal
   */
  _checkRateLimit(callback) {
    if (!this._rateLimit.limit) {
      return callback();
    }
    const now = Date.now();
    if (this._rateLimit.counter < this._rateLimit.limit) {
      return callback();
    }
    this._rateLimit.waiting.push(callback);
    if (this._rateLimit.checkpoint <= now - this._rateLimit.delta) {
      return this._clearRateLimit();
    }
    if (!this._rateLimit.timeout) {
      this._rateLimit.timeout = setTimeout(() => this._clearRateLimit(), this._rateLimit.delta - (now - this._rateLimit.checkpoint));
      this._rateLimit.checkpoint = now;
    }
  }
  /**
   * Clears current rate limit limitation and runs paused callback
   * @internal
   */
  _clearRateLimit() {
    clearTimeout(this._rateLimit.timeout);
    this._rateLimit.timeout = null;
    this._rateLimit.counter = 0;
    this._rateLimit.checkpoint = false;
    while (this._rateLimit.waiting.length) {
      const cb = this._rateLimit.waiting.shift();
      setImmediate(cb);
    }
  }
  /**
   * Returns true if there are free slots in the queue
   */
  isIdle() {
    return this.idling;
  }
  verify(callback) {
    let promise;
    if (!callback) {
      promise = new Promise((resolve3, reject) => {
        callback = callbackPromise(resolve3, reject);
      });
    }
    const done = callback;
    const auth = new PoolResource(this).auth;
    const connectStartedAt = Date.now();
    this.getSocket(Object.assign({}, this.options, { connectStartedAt }), (err, socketOptions) => {
      if (err) {
        return done(err);
      }
      let options = this.options;
      if (socketOptions && socketOptions.connection) {
        this.logger.info({
          tnx: "proxy",
          remoteAddress: socketOptions.connection.remoteAddress,
          remotePort: socketOptions.connection.remotePort,
          destHost: options.host || "",
          destPort: options.port || "",
          action: "connected"
        }, "Using proxied socket from %s:%s to %s:%s", socketOptions.connection.remoteAddress, socketOptions.connection.remotePort, options.host || "", options.port || "");
        options = Object.assign(assign(false, options), socketOptions);
      }
      const connection = new smtp_connection_default(options);
      connection._connectStartedAt = connectStartedAt;
      let returned = false;
      connection.once("error", (err2) => {
        if (returned) {
          return;
        }
        returned = true;
        connection.close();
        return done(err2);
      });
      connection.once("end", () => {
        if (returned) {
          return;
        }
        returned = true;
        return done(new Error("Connection closed"));
      });
      const finalize = () => {
        if (returned) {
          return;
        }
        returned = true;
        connection.quit();
        return done(null, true);
      };
      connection.connect((err2) => {
        if (returned) {
          return;
        }
        if (err2) {
          returned = true;
          connection.close();
          return done(err2);
        }
        if (auth && (connection.allowsAuth || options.forceAuth)) {
          connection.login(auth, (err3) => {
            if (returned) {
              return;
            }
            if (err3) {
              returned = true;
              connection.close();
              return done(err3);
            }
            finalize();
          });
        } else if (!auth && connection.allowsAuth && options.forceAuth) {
          const err3 = new Error("Authentication info was not provided");
          err3.code = ENOAUTH;
          returned = true;
          connection.close();
          return done(err3);
        } else {
          finalize();
        }
      });
    });
    return promise;
  }
};
var smtp_pool_default = SMTPPool;

// node_modules/nodemailer/dist/esm/smtp-transport/index.js
import { EventEmitter as EventEmitter5 } from "node:events";
var SMTPTransport = class extends EventEmitter5 {
  constructor(options) {
    super();
    options = options || {};
    if (typeof options === "string") {
      options = {
        url: options
      };
    }
    let urlData;
    let service = options.service;
    if (typeof options.getSocket === "function") {
      this.getSocket = options.getSocket;
    }
    if (options.url) {
      urlData = parseConnectionUrl(options.url);
      service = service || urlData.service;
    }
    this.options = assign(
      false,
      // create new object
      options,
      // regular options
      urlData,
      // url options
      service && wellKnown(service)
      // wellknown options
    );
    this.logger = getLogger(this.options, {
      component: this.options.component || "smtp-transport"
    });
    this.name = "SMTP";
    this.version = version2 + "[client:" + version2 + "]";
    if (this.options.auth) {
      this.auth = this.getAuth({});
    }
  }
  /**
   * Placeholder function for creating proxy sockets. This method immediatelly returns
   * without a socket
   *
   * @param options Connection options
   * @param callback Callback function to run with the socket keys
   */
  getSocket(options, callback) {
    setImmediate(() => callback(null, false));
  }
  getAuth(authOpts) {
    if (!authOpts) {
      if (this.auth && this.auth.oauth2 && this.mailer) {
        this.auth.oauth2.provisionCallback = this.mailer.get("oauth2_provision_cb") || this.auth.oauth2.provisionCallback;
      }
      return this.auth;
    }
    const authData = Object.assign({}, this.options.auth && typeof this.options.auth === "object" ? this.options.auth : {}, typeof authOpts === "object" ? authOpts : {});
    if (Object.keys(authData).length === 0) {
      return false;
    }
    switch ((authData.type || "").toString().toUpperCase()) {
      case "OAUTH2": {
        if (!authData.service && !authData.user) {
          return false;
        }
        const oauth2 = new xoauth2_default(authData, this.logger);
        oauth2.provisionCallback = this.mailer && this.mailer.get("oauth2_provision_cb") || oauth2.provisionCallback;
        oauth2.on("token", (token) => this.mailer.emit("token", token));
        oauth2.on("error", (err) => this.emit("error", err));
        return {
          type: "OAUTH2",
          user: authData.user,
          oauth2,
          method: "XOAUTH2"
        };
      }
      default:
        return {
          type: (authData.type || "").toString().toUpperCase() || "LOGIN",
          user: authData.user,
          credentials: {
            user: authData.user || "",
            pass: authData.pass,
            options: authData.options
          },
          method: (authData.method || "").trim().toUpperCase() || this.options.authMethod || false
        };
    }
  }
  /**
   * Sends an e-mail using the selected settings
   *
   * @param mail Mail object
   * @param callback Callback function
   */
  send(mail, callback) {
    const connectStartedAt = Date.now();
    this.getSocket(Object.assign({}, this.options, { connectStartedAt }), (err, socketOptions) => {
      if (err) {
        return callback(err);
      }
      let returned = false;
      let options = this.options;
      if (socketOptions && socketOptions.connection) {
        this.logger.info({
          tnx: "proxy",
          remoteAddress: socketOptions.connection.remoteAddress,
          remotePort: socketOptions.connection.remotePort,
          destHost: options.host || "",
          destPort: options.port || "",
          action: "connected"
        }, "Using proxied socket from %s:%s to %s:%s", socketOptions.connection.remoteAddress, socketOptions.connection.remotePort, options.host || "", options.port || "");
        options = Object.assign(assign(false, options), socketOptions);
      }
      const connection = new smtp_connection_default(options);
      connection._connectStartedAt = connectStartedAt;
      let perCallAuth;
      const cleanupPerCallAuth = () => {
        if (perCallAuth && perCallAuth !== this.auth && perCallAuth.oauth2) {
          perCallAuth.oauth2.removeAllListeners();
        }
        perCallAuth = null;
      };
      connection.once("error", (err2) => {
        if (returned) {
          return;
        }
        returned = true;
        cleanupPerCallAuth();
        connection.close();
        return callback(err2);
      });
      const sendMessage = () => {
        const envelope = mail.message.getEnvelope();
        const messageId = mail.message.messageId();
        const recipients = [].concat(envelope.to || []);
        if (recipients.length > 3) {
          recipients.push("...and " + recipients.splice(2).length + " more");
        }
        if (mail.data.dsn) {
          envelope.dsn = mail.data.dsn;
        }
        if (mail.data.requireTLSExtensionEnabled) {
          envelope.requireTLSExtensionEnabled = mail.data.requireTLSExtensionEnabled;
        }
        this.logger.info({
          tnx: "send",
          messageId
        }, "Sending message %s to <%s>", messageId, recipients.join(", "));
        connection.send(envelope, mail.message.createReadStream(), (err2, info) => {
          if (returned) {
            return;
          }
          returned = true;
          cleanupPerCallAuth();
          connection.close();
          if (err2) {
            this.logger.error({
              err: err2,
              tnx: "send"
            }, "Send error for %s: %s", messageId, err2.message);
            return callback(err2);
          }
          info.envelope = {
            from: envelope.from,
            to: envelope.to
          };
          info.messageId = messageId;
          try {
            return callback(null, info);
          } catch (E) {
            this.logger.error({
              err: E,
              tnx: "callback"
            }, "Callback error for %s: %s", messageId, E.message);
          }
        });
      };
      connection.connect((err2) => {
        if (returned) {
          return;
        }
        if (err2) {
          returned = true;
          connection.close();
          return callback(err2);
        }
        perCallAuth = this.getAuth(mail.data.auth);
        if (perCallAuth && (connection.allowsAuth || options.forceAuth)) {
          connection.login(perCallAuth, (err3) => {
            cleanupPerCallAuth();
            if (returned) {
              return;
            }
            if (err3) {
              returned = true;
              connection.close();
              return callback(err3);
            }
            sendMessage();
          });
        } else {
          sendMessage();
        }
      });
    });
  }
  verify(callback) {
    let promise;
    if (!callback) {
      promise = new Promise((resolve3, reject) => {
        callback = callbackPromise(resolve3, reject);
      });
    }
    const done = callback;
    const connectStartedAt = Date.now();
    this.getSocket(Object.assign({}, this.options, { connectStartedAt }), (err, socketOptions) => {
      if (err) {
        return done(err);
      }
      let options = this.options;
      if (socketOptions && socketOptions.connection) {
        this.logger.info({
          tnx: "proxy",
          remoteAddress: socketOptions.connection.remoteAddress,
          remotePort: socketOptions.connection.remotePort,
          destHost: options.host || "",
          destPort: options.port || "",
          action: "connected"
        }, "Using proxied socket from %s:%s to %s:%s", socketOptions.connection.remoteAddress, socketOptions.connection.remotePort, options.host || "", options.port || "");
        options = Object.assign(assign(false, options), socketOptions);
      }
      const connection = new smtp_connection_default(options);
      connection._connectStartedAt = connectStartedAt;
      let returned = false;
      let perCallAuth;
      const cleanupPerCallAuth = () => {
        if (perCallAuth && perCallAuth !== this.auth && perCallAuth.oauth2) {
          perCallAuth.oauth2.removeAllListeners();
        }
        perCallAuth = null;
      };
      connection.once("error", (err2) => {
        if (returned) {
          return;
        }
        returned = true;
        cleanupPerCallAuth();
        connection.close();
        return done(err2);
      });
      connection.once("end", () => {
        if (returned) {
          return;
        }
        returned = true;
        cleanupPerCallAuth();
        return done(new Error("Connection closed"));
      });
      const finalize = () => {
        if (returned) {
          return;
        }
        returned = true;
        cleanupPerCallAuth();
        connection.quit();
        return done(null, true);
      };
      connection.connect((err2) => {
        if (returned) {
          return;
        }
        if (err2) {
          returned = true;
          connection.close();
          return done(err2);
        }
        perCallAuth = this.getAuth({});
        if (perCallAuth && (connection.allowsAuth || options.forceAuth)) {
          connection.login(perCallAuth, (err3) => {
            cleanupPerCallAuth();
            if (returned) {
              return;
            }
            if (err3) {
              returned = true;
              connection.close();
              return done(err3);
            }
            finalize();
          });
        } else if (!perCallAuth && connection.allowsAuth && options.forceAuth) {
          const err3 = new Error("Authentication info was not provided");
          err3.code = ENOAUTH;
          returned = true;
          cleanupPerCallAuth();
          connection.close();
          return done(err3);
        } else {
          finalize();
        }
      });
    });
    return promise;
  }
  /**
   * Releases resources
   */
  close() {
    if (this.auth && this.auth.oauth2) {
      this.auth.oauth2.removeAllListeners();
    }
    this.emit("close");
  }
};
var smtp_transport_default = SMTPTransport;

// node_modules/nodemailer/dist/esm/sendmail-transport/index.js
import { spawn } from "node:child_process";
import { pipeline as pipeline2 } from "node:stream";
var STDIN_ERROR_EXIT_WAIT = 1e3;
var SendmailTransport = class {
  constructor(options) {
    options = options || {};
    this._spawn = spawn;
    this.options = options;
    this.name = "Sendmail";
    this.version = version2;
    this.path = "sendmail";
    this.args = false;
    this.logger = getLogger(this.options, {
      component: this.options.component || "sendmail"
    });
    if (typeof options === "string") {
      this.path = options;
    } else if (typeof options === "object") {
      if (options.path) {
        this.path = options.path;
      }
      if (Array.isArray(options.args)) {
        this.args = options.args;
      }
    }
    this.winbreak = ["win", "windows", "dos", "\r\n"].includes((options.newline || "").toString().toLowerCase());
  }
  /**
   * <p>Compiles a mailcomposer message and forwards it to handler that sends it.</p>
   *
   * @param mail MailComposer object
   * @param done Callback function to run when the sending is completed
   */
  send(mail, done) {
    mail.message.keepBcc = true;
    const envelope = mail.message.getEnvelope();
    const messageId = mail.message.messageId();
    let returned;
    const hasInvalidAddresses = [].concat(envelope.from || []).concat(envelope.to || []).some((addr) => /^"?-/.test(addr));
    if (hasInvalidAddresses) {
      const err = new Error("Can not send mail. Invalid envelope addresses.");
      err.code = ESENDMAIL;
      return done(err);
    }
    const args = this.args ? ["-i"].concat(this.args).concat(envelope.to) : ["-i"].concat(envelope.from ? ["-f", envelope.from] : []).concat(envelope.to);
    const callback = (err) => {
      if (returned) {
        return;
      }
      returned = true;
      if (typeof done === "function") {
        if (err) {
          return done(err);
        }
        return done(null, {
          envelope,
          messageId,
          response: "Messages queued for delivery"
        });
      }
    };
    let sendmail;
    try {
      sendmail = this._spawn(this.path, args);
    } catch (E) {
      this.logger.error({
        err: E,
        tnx: "spawn",
        messageId
      }, "Error occurred while spawning sendmail. %s", E.message);
      return callback(E);
    }
    if (sendmail) {
      let stream;
      const messageWritten = () => !!stream && stream.readableEnded;
      let stdinError = null;
      const release = () => {
        if (stream && !messageWritten()) {
          stream.destroy();
        }
      };
      const fail = (err) => {
        release();
        callback(err);
      };
      sendmail.on("error", (err) => {
        this.logger.error({
          err,
          tnx: "spawn",
          messageId
        }, "Error occurred when sending message %s. %s", messageId, err.message);
        fail(err);
      });
      const onExit = (code, signal) => {
        let err = null;
        if (code) {
          err = new Error(code === 127 ? "Sendmail command not found, process exited with code " + code : "Sendmail exited with code " + code);
        } else if (signal) {
          err = new Error("Sendmail was terminated by " + signal);
        } else if (!messageWritten()) {
          err = new Error("Sendmail exited before the message was written");
        } else if (stdinError) {
          err = stdinError;
        }
        if (!err) {
          return callback();
        }
        err.code = err.code || ESENDMAIL;
        this.logger.error({
          err,
          tnx: "stdin",
          messageId
        }, "Error sending message %s to sendmail. %s", messageId, err.message);
        fail(err);
      };
      sendmail.once("exit", onExit);
      sendmail.once("close", onExit);
      sendmail.stdin.on("error", (err) => {
        this.logger.error({
          err,
          tnx: "stdin",
          messageId
        }, "Error occurred when piping message %s to sendmail. %s", messageId, err.message);
        if (stdinError) {
          return;
        }
        stdinError = err;
        release();
        const exitTimer = setTimeout(() => fail(err), STDIN_ERROR_EXIT_WAIT);
        sendmail.once("exit", () => clearTimeout(exitTimer));
      });
      const recipients = [].concat(envelope.to || []);
      if (recipients.length > 3) {
        recipients.push("...and " + recipients.splice(2).length + " more");
      }
      this.logger.info({
        tnx: "send",
        messageId
      }, "Sending message %s to <%s>", messageId, recipients.join(", "));
      const sourceStream = mail.message.createReadStream();
      stream = sourceStream;
      if (this.options.newline) {
        stream = pipeline2(sourceStream, this.winbreak ? new LeWindows() : new LeUnix(), () => false);
      }
      stream.once("error", (err) => {
        this.logger.error({
          err,
          tnx: "stdin",
          messageId
        }, "Error occurred when generating message %s. %s", messageId, err.message);
        sendmail.kill("SIGINT");
        callback(err);
      });
      stream.pipe(sendmail.stdin);
    } else {
      const err = new Error("sendmail was not found");
      err.code = ESENDMAIL;
      return callback(err);
    }
  }
};
var sendmail_transport_default = SendmailTransport;

// node_modules/nodemailer/dist/esm/stream-transport/index.js
var StreamTransport = class {
  constructor(options) {
    options = options || {};
    this.options = options;
    this.name = "StreamTransport";
    this.version = version2;
    this.logger = getLogger(this.options, {
      component: this.options.component || "stream-transport"
    });
    this.winbreak = ["win", "windows", "dos", "\r\n"].includes((options.newline || "").toString().toLowerCase());
  }
  /**
   * Compiles a mailcomposer message and forwards it to handler that sends it
   *
   * @param mail MailComposer object
   * @param done Callback function to run when the sending is completed
   */
  send(mail, done) {
    mail.message.keepBcc = true;
    const envelope = mail.message.getEnvelope();
    const messageId = mail.message.messageId();
    const recipients = [].concat(envelope.to || []);
    if (recipients.length > 3) {
      recipients.push("...and " + recipients.splice(2).length + " more");
    }
    this.logger.info({
      tnx: "send",
      messageId
    }, "Sending message %s to <%s> using %s line breaks", messageId, recipients.join(", "), this.winbreak ? "<CR><LF>" : "<LF>");
    setImmediate(() => {
      let stream;
      try {
        stream = mail.message.createReadStream();
        if (this.options.newline) {
          const sourceStream = stream;
          stream = sourceStream.pipe(this.winbreak ? new LeWindows() : new LeUnix());
          sourceStream.once("error", (err) => stream.emit("error", err));
        }
      } catch (E) {
        this.logger.error({
          err: E,
          tnx: "send",
          messageId
        }, "Creating send stream failed for %s. %s", messageId, E.message);
        return done(E);
      }
      if (!this.options.buffer) {
        stream.once("error", (err) => {
          this.logger.error({
            err,
            tnx: "send",
            messageId
          }, "Failed creating message for %s. %s", messageId, err.message);
        });
        return done(null, {
          envelope,
          messageId,
          message: stream
        });
      }
      const chunks = [];
      let chunklen = 0;
      stream.on("readable", () => {
        let chunk;
        while ((chunk = stream.read()) !== null) {
          chunks.push(chunk);
          chunklen += chunk.length;
        }
      });
      stream.once("error", (err) => {
        this.logger.error({
          err,
          tnx: "send",
          messageId
        }, "Failed creating message for %s. %s", messageId, err.message);
        return done(err);
      });
      stream.on("end", () => done(null, {
        envelope,
        messageId,
        message: Buffer.concat(chunks, chunklen)
      }));
    });
  }
};
var stream_transport_default = StreamTransport;

// node_modules/nodemailer/dist/esm/json-transport/index.js
var JSONTransport = class {
  constructor(options) {
    options = options || {};
    this.options = options;
    this.name = "JSONTransport";
    this.version = version2;
    this.logger = getLogger(this.options, {
      component: this.options.component || "json-transport"
    });
  }
  /**
   * <p>Compiles a mailcomposer message and forwards it to handler that sends it.</p>
   *
   * @param mail MailComposer object
   * @param done Callback function to run when the sending is completed
   */
  send(mail, done) {
    mail.message.keepBcc = true;
    const envelope = mail.message.getEnvelope();
    const messageId = mail.message.messageId();
    const recipients = [].concat(envelope.to || []);
    if (recipients.length > 3) {
      recipients.push("...and " + recipients.splice(2).length + " more");
    }
    this.logger.info({
      tnx: "send",
      messageId
    }, "Composing JSON structure of %s to <%s>", messageId, recipients.join(", "));
    setImmediate(() => {
      mail.normalize((err, data) => {
        if (err) {
          this.logger.error({
            err,
            tnx: "send",
            messageId
          }, "Failed building JSON structure for %s. %s", messageId, err.message);
          return done(err);
        }
        delete data.envelope;
        delete data.normalizedHeaders;
        return done(null, {
          envelope,
          messageId,
          message: this.options.skipEncoding ? data : JSON.stringify(data)
        });
      });
    });
  }
};
var json_transport_default = JSONTransport;

// node_modules/nodemailer/dist/esm/ses-transport/index.js
import EventEmitter6 from "node:events";
function tagSesError(err) {
  if (err && typeof err === "object" && !err.code) {
    err.code = ESES;
  }
  return err;
}
var SESTransport = class extends EventEmitter6 {
  constructor(options) {
    super();
    if (!options || !options.SES || !options.SES.sesClient) {
      const error2 = new Error("Missing SES configuration, expecting { sesClient, SendEmailCommand } from @aws-sdk/client-sesv2, see https://nodemailer.com/transports/ses/");
      error2.code = ECONFIG;
      throw error2;
    }
    this.options = options;
    this.ses = this.options.SES;
    this.name = "SESTransport";
    this.version = version2;
    this.logger = getLogger(this.options, {
      component: this.options.component || "ses-transport"
    });
  }
  getRegion(cb) {
    if (this.ses.sesClient.config && typeof this.ses.sesClient.config.region === "function") {
      this.ses.sesClient.config.region().then((region) => cb(null, region), (err) => cb(err));
      return;
    }
    return cb(null, false);
  }
  /**
   * Compiles a mailcomposer message and forwards it to SES
   *
   * @param mail MailComposer object
   * @param callback Callback function to run when the sending is completed
   */
  send(mail, callback) {
    let fromHeader = mail.message._headers.find((header) => /^from$/i.test(header.key));
    if (fromHeader) {
      const mimeNode = new mime_node_default("text/plain");
      fromHeader = mimeNode._convertAddresses(mimeNode._parseAddresses(fromHeader.value));
    }
    const envelope = mail.message.getEnvelope();
    const messageId = mail.message.messageId();
    const recipients = [].concat(envelope.to || []);
    if (recipients.length > 3) {
      recipients.push("...and " + recipients.splice(2).length + " more");
    }
    this.logger.info({
      tnx: "send",
      messageId
    }, "Sending message %s to <%s>", messageId, recipients.join(", "));
    const getRawMessage = (next) => {
      if (!mail.data._dkim) {
        mail.data._dkim = {};
      }
      if (mail.data._dkim.skipFields && typeof mail.data._dkim.skipFields === "string") {
        mail.data._dkim.skipFields += ":date:message-id";
      } else {
        mail.data._dkim.skipFields = "date:message-id";
      }
      const sourceStream = mail.message.createReadStream();
      const stream = sourceStream.pipe(new LeWindows());
      const chunks = [];
      let chunklen = 0;
      stream.on("readable", () => {
        let chunk;
        while ((chunk = stream.read()) !== null) {
          chunks.push(chunk);
          chunklen += chunk.length;
        }
      });
      sourceStream.once("error", (err) => stream.emit("error", err));
      stream.once("error", (err) => next(err));
      stream.once("end", () => next(null, Buffer.concat(chunks, chunklen)));
    };
    setImmediate(() => getRawMessage((err, raw) => {
      if (err) {
        this.logger.error({
          err,
          tnx: "send",
          messageId
        }, "Failed creating message for %s. %s", messageId, err.message);
        return callback(err);
      }
      const sesMessage = copyOwnKeys({
        Content: {
          Raw: {
            // required
            Data: raw
            // required
          }
        },
        FromEmailAddress: fromHeader || envelope.from,
        Destination: {
          ToAddresses: envelope.to
        }
      }, mail.data.ses);
      this.getRegion((err2, region) => {
        if (err2 || !region) {
          region = "us-east-1";
        }
        let sendPromise;
        try {
          const command = new this.ses.SendEmailCommand(sesMessage);
          sendPromise = this.ses.sesClient.send(command);
        } catch (err3) {
          tagSesError(err3);
          this.logger.error({
            err: err3,
            tnx: "send"
          }, "Send error for %s: %s", messageId, err3.message);
          setImmediate(() => callback(err3));
          return;
        }
        sendPromise.then((data) => {
          if (region === "us-east-1") {
            region = "email";
          }
          const info = {
            envelope: {
              from: envelope.from,
              to: envelope.to
            },
            messageId: "<" + data.MessageId + (!/@/.test(data.MessageId) ? "@" + region + ".amazonses.com" : "") + ">",
            response: data.MessageId,
            raw
          };
          setImmediate(() => callback(null, info));
        }).catch((err3) => {
          tagSesError(err3);
          this.logger.error({
            err: err3,
            tnx: "send"
          }, "Send error for %s: %s", messageId, err3.message);
          setImmediate(() => callback(err3));
        });
      });
    }));
  }
  verify(callback) {
    let promise;
    if (!callback) {
      promise = new Promise((resolve3, reject) => {
        callback = callbackPromise(resolve3, reject);
      });
    }
    const done = callback;
    const cb = (err) => {
      if (err && !["InvalidParameterValue", "MessageRejected"].includes(err.code || err.Code || err.name)) {
        return done(tagSesError(err));
      }
      return done(null, true);
    };
    const sesMessage = {
      Content: {
        Raw: {
          Data: Buffer.from("From: <invalid@invalid>\r\nTo: <invalid@invalid>\r\n Subject: Invalid\r\n\r\nInvalid")
        }
      },
      FromEmailAddress: "invalid@invalid",
      Destination: {
        ToAddresses: ["invalid@invalid"]
      }
    };
    this.getRegion(() => {
      let sendPromise;
      try {
        const command = new this.ses.SendEmailCommand(sesMessage);
        sendPromise = this.ses.sesClient.send(command);
      } catch (err) {
        setImmediate(() => cb(err));
        return;
      }
      sendPromise.then(() => setImmediate(() => cb(null))).catch((err) => setImmediate(() => cb(err)));
    });
    return promise;
  }
};
var ses_transport_default = SESTransport;

// node_modules/nodemailer/dist/esm/nodemailer.js
var etherealApi = () => (process.env.ETHEREAL_API || "https://api.nodemailer.com").replace(/\/+$/, "");
var etherealWeb = () => (process.env.ETHEREAL_WEB || "https://ethereal.email").replace(/\/+$/, "");
var etherealApiKey = () => (process.env.ETHEREAL_API_KEY || "").replace(/\s*/g, "") || null;
var etherealCache = () => ["true", "yes", "y", "1"].includes((process.env.ETHEREAL_CACHE || "yes").toString().trim().toLowerCase());
var testAccount = false;
function createTransport(transporter, defaults) {
  let options;
  if (
    // provided transporter is a configuration object, not transporter plugin
    typeof transporter === "object" && typeof transporter.send !== "function" || // provided transporter looks like a connection url
    typeof transporter === "string" && /^(smtps?|direct):/i.test(transporter)
  ) {
    const urlConfig = typeof transporter === "string" ? transporter : transporter.url;
    if (urlConfig) {
      const parsed = parseConnectionUrl(urlConfig);
      options = typeof transporter === "object" ? assign(false, copyOwnKeys({}, transporter, (key) => key === "url"), parsed) : parsed;
    } else {
      options = transporter;
    }
    if (options.pool) {
      transporter = new smtp_pool_default(options);
    } else if (options.sendmail) {
      transporter = new sendmail_transport_default(options);
    } else if (options.streamTransport) {
      transporter = new stream_transport_default(options);
    } else if (options.jsonTransport) {
      transporter = new json_transport_default(options);
    } else if (options.SES) {
      const ses = options.SES;
      if (ses.ses && ses.aws) {
        const error2 = new Error("Using legacy SES configuration, expecting @aws-sdk/client-sesv2, see https://nodemailer.com/transports/ses/");
        error2.code = ECONFIG;
        throw error2;
      }
      transporter = new ses_transport_default(options);
    } else {
      transporter = new smtp_transport_default(options);
    }
  }
  return new mailer_default(transporter, options, defaults);
}
function createTestAccount(apiUrl, callback) {
  let promise;
  if (!callback && typeof apiUrl === "function") {
    callback = apiUrl;
    apiUrl = false;
  }
  if (!callback) {
    promise = new Promise((resolve3, reject) => {
      callback = callbackPromise(resolve3, reject);
    });
  }
  const done = callback;
  if (etherealCache() && testAccount) {
    setImmediate(() => done(null, testAccount));
    return promise;
  }
  apiUrl = apiUrl || etherealApi();
  const chunks = [];
  let chunklen = 0;
  const requestHeaders = {};
  const requestBody = {
    requestor: name,
    version: version2
  };
  const apiKey = etherealApiKey();
  if (apiKey) {
    requestHeaders.Authorization = "Bearer " + apiKey;
  }
  const fetchOptions = {
    contentType: "application/json",
    method: "POST",
    headers: requestHeaders,
    body: Buffer.from(JSON.stringify(requestBody))
  };
  if (/^https:/i.test(apiUrl)) {
    fetchOptions.tls = { rejectUnauthorized: true };
  }
  const req = fetch_default(apiUrl + "/user", fetchOptions);
  req.on("readable", () => {
    let chunk;
    while ((chunk = req.read()) !== null) {
      chunks.push(chunk);
      chunklen += chunk.length;
    }
  });
  req.once("error", (err) => done(err));
  req.once("end", () => {
    const res = Buffer.concat(chunks, chunklen);
    let data;
    try {
      data = JSON.parse(res.toString());
    } catch (E) {
      return done(E);
    }
    if (data.status !== "success" || data.error) {
      return done(new Error(data.error || "Request failed"));
    }
    delete data.status;
    testAccount = data;
    done(null, testAccount);
  });
  return promise;
}
function getTestMessageUrl(info) {
  if (!info || !info.response) {
    return false;
  }
  const infoProps = /* @__PURE__ */ new Map();
  const response = info.response.toString();
  if (response.length > 2 && response.charAt(response.length - 1) === "]") {
    const open = response.indexOf("[", response.lastIndexOf("]", response.length - 2) + 1);
    if (open >= 0 && open < response.length - 2) {
      const props = response.substring(open + 1, response.length - 1);
      props.replace(/\b([A-Z0-9]+)=([^\s]+)/g, (m, key, value) => {
        infoProps.set(key, value);
        return m;
      });
    }
  }
  if (infoProps.has("STATUS") && infoProps.has("MSGID")) {
    return (testAccount && testAccount.web || etherealWeb()) + "/message/" + infoProps.get("MSGID");
  }
  return false;
}
var nodemailer = {
  createTransport,
  createTestAccount,
  getTestMessageUrl
};
var nodemailer_default = nodemailer;

// src/server/reports/nodemailer-client.ts
async function sendReportEmailViaNodemailer(email, config) {
  const startMs = Date.now();
  const recipients = config.toEmails;
  if (recipients.length === 0) {
    return {
      success: false,
      provider: "nodemailer",
      recipients: [],
      latencyMs: 0,
      error: "No valid recipient email addresses configured in REPORT_TO_EMAILS."
    };
  }
  if (!config.smtpPass && config.isDevelopment) {
    console.warn(
      `[Nodemailer] Notice: SMTP_PASS is not configured in local development. Simulating successful delivery to: ${recipients.join(
        ", "
      )}`
    );
    return {
      success: true,
      messageId: `dev-simulated-${Date.now()}@apnacare.local`,
      provider: "nodemailer",
      recipients,
      latencyMs: Date.now() - startMs,
      warning: "Simulated delivery: Configure SMTP_PASS with your Google App Password or SMTP credentials in production."
    };
  }
  if (!config.smtpPass) {
    return {
      success: false,
      provider: "nodemailer",
      recipients,
      latencyMs: 0,
      error: "SMTP_PASS is not configured in Vercel environment variables. For Gmail, generate a 16-character Google App Password."
    };
  }
  try {
    const transporter = nodemailer_default.createTransport({
      host: config.smtpHost,
      port: config.smtpPort,
      secure: config.smtpSecure,
      auth: {
        user: config.smtpUser,
        pass: config.smtpPass.replace(/\s+/g, "")
        // strip any spaces often copied in Google App Passwords
      },
      connectionTimeout: 1e4,
      greetingTimeout: 1e4,
      socketTimeout: 15e3
    });
    const info = await transporter.sendMail({
      from: config.fromEmail,
      to: recipients.join(", "),
      subject: email.subject,
      html: email.html,
      text: email.text
    });
    const latencyMs = Date.now() - startMs;
    console.log(
      `[Nodemailer] Successfully sent ${email.subject} to ${recipients.join(
        ", "
      )} in ${latencyMs}ms. Message ID: ${info.messageId}`
    );
    return {
      success: true,
      messageId: info.messageId,
      provider: "nodemailer",
      recipients,
      latencyMs
    };
  } catch (err) {
    const latencyMs = Date.now() - startMs;
    const errorMsg = err instanceof Error ? err.message : String(err);
    console.error("[Nodemailer] SMTP Delivery Error:", errorMsg);
    let diagnosticHint = "";
    if (errorMsg.includes("Invalid login") || errorMsg.includes("535")) {
      diagnosticHint = " (Tip: If using Gmail, make sure 2-Step Verification is enabled and use a 16-character App Password, not your regular Google login password).";
    }
    return {
      success: false,
      provider: "nodemailer",
      recipients,
      latencyMs,
      error: `${errorMsg}${diagnosticHint}`
    };
  }
}

// src/server/reports/idempotency.ts
var localDeliveryCache = /* @__PURE__ */ new Map();
async function checkReportDelivery(reportType, periodKey, config) {
  const cacheKey = `${reportType}:${periodKey}`;
  const cached = localDeliveryCache.get(cacheKey);
  if (cached && cached.status === "DELIVERED") {
    return cached;
  }
  if (!config.googleAppsScriptUrl) {
    return null;
  }
  try {
    const url = new URL(config.googleAppsScriptUrl);
    url.searchParams.set("action", "check_report_delivery");
    url.searchParams.set("report_type", reportType);
    url.searchParams.set("period_key", periodKey);
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 2e3);
    const response = await fetch(url.toString(), {
      method: "GET",
      headers: { Accept: "application/json" },
      signal: controller.signal,
      redirect: "follow"
    });
    clearTimeout(timeout);
    if (response.ok) {
      const json = await response.json();
      if (json && json.status === "success" && json.delivered && json.record) {
        const record = {
          reportType,
          periodKey,
          status: "DELIVERED",
          timestamp: json.record.timestamp || (/* @__PURE__ */ new Date()).toISOString(),
          messageId: json.record.message_id || "",
          recipients: json.record.recipients || [],
          provider: json.record.provider || "resend"
        };
        localDeliveryCache.set(cacheKey, record);
        return record;
      }
    }
  } catch (err) {
    console.warn(
      `[Idempotency] Could not check remote delivery log for ${cacheKey}:`,
      err instanceof Error ? err.message : err
    );
  }
  return null;
}
async function recordReportDelivery(record, config) {
  const cacheKey = `${record.reportType}:${record.periodKey}`;
  localDeliveryCache.set(cacheKey, record);
  if (!config.googleAppsScriptUrl) return false;
  try {
    const payload = {
      action: "log_report_delivery",
      event_type: "report_delivery",
      report_type: record.reportType,
      reporting_period: record.periodKey,
      delivery_status: record.status,
      timestamp: record.timestamp,
      message_id: record.messageId || "",
      provider: record.provider || "resend",
      recipient_emails: record.recipients.join(", "),
      error: record.error || ""
    };
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 8e3);
    const response = await fetch(config.googleAppsScriptUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload),
      signal: controller.signal,
      redirect: "follow"
    });
    clearTimeout(timeout);
    if (response.ok) {
      return true;
    }
  } catch (err) {
    console.error(
      `[Idempotency] Failed to record delivery log to persistent storage:`,
      err instanceof Error ? err.message : err
    );
  }
  return false;
}

// src/server/reports/report-runner.ts
function validateCronAuth(request, config) {
  if (config.cronSecret) {
    if (!request) {
      return { authorized: false, reason: "Request context missing" };
    }
    let authHeader = "";
    let xCronSecret = "";
    if (typeof request.headers?.get === "function") {
      authHeader = request.headers.get("authorization") || "";
      xCronSecret = request.headers.get("x-cron-secret") || "";
    } else if (request.headers && typeof request.headers === "object") {
      authHeader = String(request.headers["authorization"] || "");
      xCronSecret = String(request.headers["x-cron-secret"] || "");
    }
    let querySecret = "";
    if (request.query && typeof request.query === "object") {
      querySecret = String(request.query.secret || "");
    }
    if (!querySecret && request.url) {
      try {
        const url = new URL(request.url, "https://apna-care.vercel.app");
        querySecret = url.searchParams.get("secret") || "";
      } catch {
        querySecret = "";
      }
    }
    const bearerToken = authHeader.startsWith("Bearer ") ? authHeader.slice(7).trim() : authHeader.trim();
    const isMatch = bearerToken && bearerToken === config.cronSecret || xCronSecret && xCronSecret === config.cronSecret || querySecret && querySecret === config.cronSecret;
    if (!isMatch) {
      return {
        authorized: false,
        reason: "Invalid or missing authorization token. Supply Bearer <CRON_SECRET> or ?secret=..."
      };
    }
    return { authorized: true };
  }
  if (!config.isDevelopment) {
    return {
      authorized: false,
      reason: "CRON_SECRET is not configured in Vercel environment variables. All report execution is locked until CRON_SECRET is set."
    };
  }
  return { authorized: true };
}
async function runReport(options) {
  const startMs = Date.now();
  const config = getServerReportConfig();
  const period = calculateReportPeriod(
    options.type,
    config.timezone,
    /* @__PURE__ */ new Date(),
    options.periodKey
  );
  console.log(
    `[ReportRunner] Initiating ${options.type.toUpperCase()} report for period ${period.key} (${period.label}) in ${config.timezone}...`
  );
  const isForced = Boolean(options.force);
  let existingDelivery = null;
  if (!isForced) {
    existingDelivery = await checkReportDelivery(options.type, period.key, config);
    if (existingDelivery && existingDelivery.status === "DELIVERED") {
      console.log(
        `[ReportRunner] Idempotency: Report ${options.type}:${period.key} was already delivered on ${existingDelivery.timestamp}. Skipping duplicate send.`
      );
      return {
        success: true,
        reportType: options.type,
        period,
        idempotency: {
          checked: true,
          alreadyDelivered: true,
          forced: false,
          record: existingDelivery
        },
        durationMs: Date.now() - startMs
      };
    }
  }
  const metrics = await fetchReportMetrics(period, config);
  const isTest = Boolean(options.isTest);
  const rendered = generateReportEmail(period, metrics, isTest);
  let emailResult;
  try {
    if (config.emailProvider === "resend" && config.resendApiKey) {
      emailResult = await sendReportEmail(rendered, config);
    } else {
      emailResult = await sendReportEmailViaNodemailer(rendered, config);
    }
  } catch (err) {
    emailResult = {
      success: false,
      provider: config.emailProvider === "resend" ? "resend" : "nodemailer",
      recipients: config.toEmails,
      latencyMs: 0,
      error: err instanceof Error ? err.message : String(err)
    };
  }
  if (emailResult.success) {
    const deliveryRecord = {
      reportType: options.type,
      periodKey: period.key,
      status: "DELIVERED",
      timestamp: (/* @__PURE__ */ new Date()).toISOString(),
      messageId: emailResult.messageId,
      recipients: emailResult.recipients,
      provider: emailResult.provider
    };
    await recordReportDelivery(deliveryRecord, config);
  }
  const durationMs = Date.now() - startMs;
  return {
    success: emailResult.success,
    reportType: options.type,
    period,
    idempotency: {
      checked: true,
      alreadyDelivered: false,
      forced: isForced
    },
    metrics,
    email: emailResult,
    durationMs,
    error: emailResult.error
  };
}

// src/server/reports/routes/weekly-report.ts
var dynamic = "force-dynamic";
function reply(res, statusCode, data) {
  const payload = JSON.stringify(data);
  if (res && typeof res.status === "function" && typeof res.json === "function") {
    return res.status(statusCode).json(data);
  }
  if (res && typeof res.setHeader === "function" && typeof res.end === "function") {
    res.statusCode = statusCode;
    res.setHeader("Content-Type", "application/json");
    return res.end(payload);
  }
  if (res && typeof res.writeHead === "function" && typeof res.end === "function") {
    res.writeHead(statusCode, { "Content-Type": "application/json" });
    return res.end(payload);
  }
  return new Response(payload, {
    status: statusCode,
    headers: { "Content-Type": "application/json" }
  });
}
async function handler(req, res) {
  try {
    const config = getServerReportConfig();
    let query = {};
    if (req.query && typeof req.query === "object") {
      for (const [k, v] of Object.entries(req.query)) {
        query[k] = Array.isArray(v) ? v[0] : String(v || "");
      }
    } else if (req.url) {
      try {
        const parsed = new URL(req.url, "https://apna-care.vercel.app");
        parsed.searchParams.forEach((val, key) => {
          query[key] = val;
        });
      } catch {
        query = {};
      }
    }
    const authReq = {
      headers: req.headers,
      query,
      url: req.url || "/api/cron/weekly-report"
    };
    const auth = validateCronAuth(authReq, config);
    if (!auth.authorized) {
      return reply(res, 401, {
        status: "error",
        code: "UNAUTHORIZED",
        message: auth.reason || "Unauthorized"
      });
    }
    const force = query.force === "true";
    const period = query.period || void 0;
    const isTest = query.test === "true";
    const result = await runReport({
      type: "weekly",
      force,
      periodKey: period,
      isTest
    });
    const statusCode = result.success ? 200 : result.email?.error ? 502 : 500;
    return reply(res, statusCode, result);
  } catch (err) {
    const errorMsg = err instanceof Error ? err.message : String(err);
    console.error("[WeeklyReportCron] Unhandled error:", err);
    return reply(res, 500, {
      status: "error",
      code: "INTERNAL_ERROR",
      message: errorMsg
    });
  }
}
async function GET(req, res) {
  return handler(req, res);
}
export {
  GET,
  handler as default,
  dynamic
};

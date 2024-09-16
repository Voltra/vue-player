import { resolveComponent as H, openBlock as v, createBlock as E, resolveDynamicComponent as he, mergeProps as M, withCtx as I, createElementBlock as k, renderSlot as C, Fragment as be, toHandlers as ge } from "vue";
/*!
 * is-plain-object <https://github.com/jonschlinkert/is-plain-object>
 *
 * Copyright (c) 2014-2017, Jon Schlinkert.
 * Released under the MIT License.
 */
function z(e) {
  return Object.prototype.toString.call(e) === "[object Object]";
}
function ve(e) {
  var t, r;
  return z(e) === !1 ? !1 : (t = e.constructor, t === void 0 ? !0 : (r = t.prototype, !(z(r) === !1 || r.hasOwnProperty("isPrototypeOf") === !1)));
}
function j() {
  return j = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, j.apply(this, arguments);
}
function Z(e, t) {
  if (e == null) return {};
  var r, n, a = {}, i = Object.keys(e);
  for (n = 0; n < i.length; n++) t.indexOf(r = i[n]) >= 0 || (a[r] = e[r]);
  return a;
}
const we = { silent: !1, logLevel: "warn" }, Pe = ["validator"], J = Object.prototype, Q = J.toString, Oe = J.hasOwnProperty, G = /^\s*function (\w+)/;
function F(e) {
  var t;
  const r = (t = e == null ? void 0 : e.type) !== null && t !== void 0 ? t : e;
  if (r) {
    const n = r.toString().match(G);
    return n ? n[1] : "";
  }
  return "";
}
const b = ve, _e = (e) => e;
let f = _e;
const P = (e, t) => Oe.call(e, t), Te = Number.isInteger || function(e) {
  return typeof e == "number" && isFinite(e) && Math.floor(e) === e;
}, O = Array.isArray || function(e) {
  return Q.call(e) === "[object Array]";
}, _ = (e) => Q.call(e) === "[object Function]", S = (e) => b(e) && P(e, "_vueTypes_name"), ee = (e) => b(e) && (P(e, "type") || ["_vueTypes_name", "validator", "default", "required"].some((t) => P(e, t)));
function N(e, t) {
  return Object.defineProperty(e.bind(t), "__original", { value: e });
}
function g(e, t, r = !1) {
  let n, a = !0, i = "";
  n = b(e) ? e : { type: e };
  const l = S(n) ? n._vueTypes_name + " - " : "";
  if (ee(n) && n.type !== null) {
    if (n.type === void 0 || n.type === !0 || !n.required && t === void 0) return a;
    O(n.type) ? (a = n.type.some((s) => g(s, t, !0) === !0), i = n.type.map((s) => F(s)).join(" or ")) : (i = F(n), a = i === "Array" ? O(t) : i === "Object" ? b(t) : i === "String" || i === "Number" || i === "Boolean" || i === "Function" ? function(s) {
      if (s == null) return "";
      const u = s.constructor.toString().match(G);
      return u ? u[1] : "";
    }(t) === i : t instanceof n.type);
  }
  if (!a) {
    const s = `${l}value "${t}" should be of type "${i}"`;
    return r === !1 ? (f(s), !1) : s;
  }
  if (P(n, "validator") && _(n.validator)) {
    const s = f, u = [];
    if (f = (c) => {
      u.push(c);
    }, a = n.validator(t), f = s, !a) {
      const c = (u.length > 1 ? "* " : "") + u.join(`
* `);
      return u.length = 0, r === !1 ? (f(c), a) : c;
    }
  }
  return a;
}
function p(e, t) {
  const r = Object.defineProperties(t, { _vueTypes_name: { value: e, writable: !0 }, isRequired: { get() {
    return this.required = !0, this;
  } }, def: { value(a) {
    return a === void 0 ? (P(this, "default") && delete this.default, this) : _(a) || g(this, a, !0) === !0 ? (this.default = O(a) ? () => [...a] : b(a) ? () => Object.assign({}, a) : a, this) : (f(`${this._vueTypes_name} - invalid default value: "${a}"`), this);
  } } }), { validator: n } = r;
  return _(n) && (r.validator = N(n, r)), r;
}
function m(e, t) {
  const r = p(e, t);
  return Object.defineProperty(r, "validate", { value(n) {
    return _(this.validator) && f(`${this._vueTypes_name} - calling .validate() will overwrite the current custom validator function. Validator info:
${JSON.stringify(this)}`), this.validator = N(n, this), this;
  } });
}
function q(e, t, r) {
  const n = function(u) {
    const c = {};
    return Object.getOwnPropertyNames(u).forEach((y) => {
      c[y] = Object.getOwnPropertyDescriptor(u, y);
    }), Object.defineProperties({}, c);
  }(t);
  if (n._vueTypes_name = e, !b(r)) return n;
  const { validator: a } = r, i = Z(r, Pe);
  if (_(a)) {
    let { validator: u } = n;
    u && (u = (s = (l = u).__original) !== null && s !== void 0 ? s : l), n.validator = N(u ? function(c) {
      return u.call(this, c) && a.call(this, c);
    } : a, n);
  }
  var l, s;
  return Object.assign(n, i);
}
function $(e) {
  return e.replace(/^(?!\s*$)/gm, "  ");
}
const je = () => m("any", {}), Ae = () => m("function", { type: Function }), Ce = () => m("boolean", { type: Boolean }), Se = () => m("string", { type: String }), $e = () => m("number", { type: Number }), Ee = () => m("array", { type: Array }), Me = () => m("object", { type: Object }), Ie = () => p("integer", { type: Number, validator: (e) => Te(e) }), ke = () => p("symbol", { validator: (e) => typeof e == "symbol" });
function De(e, t = "custom validation failed") {
  if (typeof e != "function") throw new TypeError("[VueTypes error]: You must provide a function as argument");
  return p(e.name || "<<anonymous function>>", { type: null, validator(r) {
    const n = e(r);
    return n || f(`${this._vueTypes_name} - ${t}`), n;
  } });
}
function Re(e) {
  if (!O(e)) throw new TypeError("[VueTypes error]: You must provide an array as argument.");
  const t = `oneOf - value should be one of "${e.join('", "')}".`, r = e.reduce((n, a) => {
    if (a != null) {
      const i = a.constructor;
      n.indexOf(i) === -1 && n.push(i);
    }
    return n;
  }, []);
  return p("oneOf", { type: r.length > 0 ? r : void 0, validator(n) {
    const a = e.indexOf(n) !== -1;
    return a || f(t), a;
  } });
}
function xe(e) {
  if (!O(e)) throw new TypeError("[VueTypes error]: You must provide an array as argument");
  let t = !1, r = [];
  for (let a = 0; a < e.length; a += 1) {
    const i = e[a];
    if (ee(i)) {
      if (S(i) && i._vueTypes_name === "oneOf" && i.type) {
        r = r.concat(i.type);
        continue;
      }
      if (_(i.validator) && (t = !0), i.type === !0 || !i.type) {
        f('oneOfType - invalid usage of "true" or "null" as types.');
        continue;
      }
      r = r.concat(i.type);
    } else r.push(i);
  }
  r = r.filter((a, i) => r.indexOf(a) === i);
  const n = r.length > 0 ? r : null;
  return p("oneOfType", t ? { type: n, validator(a) {
    const i = [], l = e.some((s) => {
      const u = g(S(s) && s._vueTypes_name === "oneOf" ? s.type || null : s, a, !0);
      return typeof u == "string" && i.push(u), u === !0;
    });
    return l || f(`oneOfType - provided value does not match any of the ${i.length} passed-in validators:
${$(i.join(`
`))}`), l;
  } } : { type: n });
}
function Le(e) {
  return p("arrayOf", { type: Array, validator(t) {
    let r = "";
    const n = t.every((a) => (r = g(e, a, !0), r === !0));
    return n || f(`arrayOf - value validation error:
${$(r)}`), n;
  } });
}
function Ue(e) {
  return p("instanceOf", { type: e });
}
function Ne(e) {
  return p("objectOf", { type: Object, validator(t) {
    let r = "";
    const n = Object.keys(t).every((a) => (r = g(e, t[a], !0), r === !0));
    return n || f(`objectOf - value validation error:
${$(r)}`), n;
  } });
}
function Ve(e) {
  const t = Object.keys(e), r = t.filter((a) => {
    var i;
    return !((i = e[a]) === null || i === void 0 || !i.required);
  }), n = p("shape", { type: Object, validator(a) {
    if (!b(a)) return !1;
    const i = Object.keys(a);
    if (r.length > 0 && r.some((l) => i.indexOf(l) === -1)) {
      const l = r.filter((s) => i.indexOf(s) === -1);
      return f(l.length === 1 ? `shape - required property "${l[0]}" is not defined.` : `shape - required properties "${l.join('", "')}" are not defined.`), !1;
    }
    return i.every((l) => {
      if (t.indexOf(l) === -1) return this._vueTypes_isLoose === !0 || (f(`shape - shape definition does not include a "${l}" property. Allowed keys: "${t.join('", "')}".`), !1);
      const s = g(e[l], a[l], !0);
      return typeof s == "string" && f(`shape - "${l}" property validation error:
 ${$(s)}`), s === !0;
    });
  } });
  return Object.defineProperty(n, "_vueTypes_isLoose", { writable: !0, value: !1 }), Object.defineProperty(n, "loose", { get() {
    return this._vueTypes_isLoose = !0, this;
  } }), n;
}
const He = ["name", "validate", "getter"], ze = /* @__PURE__ */ (() => {
  var e;
  return (e = class {
    static get any() {
      return je();
    }
    static get func() {
      return Ae().def(this.defaults.func);
    }
    static get bool() {
      return Ce().def(this.defaults.bool);
    }
    static get string() {
      return Se().def(this.defaults.string);
    }
    static get number() {
      return $e().def(this.defaults.number);
    }
    static get array() {
      return Ee().def(this.defaults.array);
    }
    static get object() {
      return Me().def(this.defaults.object);
    }
    static get integer() {
      return Ie().def(this.defaults.integer);
    }
    static get symbol() {
      return ke();
    }
    static get nullable() {
      return { type: null };
    }
    static extend(t) {
      if (O(t)) return t.forEach((u) => this.extend(u)), this;
      const { name: r, validate: n = !1, getter: a = !1 } = t, i = Z(t, He);
      if (P(this, r)) throw new TypeError(`[VueTypes error]: Type "${r}" already defined`);
      const { type: l } = i;
      if (S(l)) return delete i.type, Object.defineProperty(this, r, a ? { get: () => q(r, l, i) } : { value(...u) {
        const c = q(r, l, i);
        return c.validator && (c.validator = c.validator.bind(c, ...u)), c;
      } });
      let s;
      return s = a ? { get() {
        const u = Object.assign({}, i);
        return n ? m(r, u) : p(r, u);
      }, enumerable: !0 } : { value(...u) {
        const c = Object.assign({}, i);
        let y;
        return y = n ? m(r, c) : p(r, c), c.validator && (y.validator = c.validator.bind(y, ...u)), y;
      }, enumerable: !0 }, Object.defineProperty(this, r, s);
    }
  }).defaults = {}, e.sensibleDefaults = void 0, e.config = we, e.custom = De, e.oneOf = Re, e.instanceOf = Ue, e.oneOfType = xe, e.arrayOf = Le, e.objectOf = Ne, e.shape = Ve, e.utils = { validate: (t, r) => g(r, t, !0) === !0, toType: (t, r, n = !1) => n ? m(t, r) : p(t, r) }, e;
})();
function Fe(e = { func: () => {
}, bool: !0, string: "", number: 0, array: () => [], object: () => ({}), integer: 0 }) {
  var t;
  return (t = class extends ze {
    static get sensibleDefaults() {
      return j({}, this.defaults);
    }
    static set sensibleDefaults(r) {
      this.defaults = r !== !1 ? j({}, r !== !0 ? r : e) : {};
    }
  }).defaults = j({}, e), t;
}
class o extends Fe() {
}
function te(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var qe = function(t, r, n) {
  var a = document.head || document.getElementsByTagName("head")[0], i = document.createElement("script");
  typeof r == "function" && (n = r, r = {}), r = r || {}, n = n || function() {
  }, i.type = r.type || "text/javascript", i.charset = r.charset || "utf8", i.async = "async" in r ? !!r.async : !0, i.src = t, r.attrs && Be(i, r.attrs), r.text && (i.text = "" + r.text);
  var l = "onload" in i ? B : Ye;
  l(i, n), i.onload || B(i, n), a.appendChild(i);
};
function Be(e, t) {
  for (var r in t)
    e.setAttribute(r, t[r]);
}
function B(e, t) {
  e.onload = function() {
    this.onerror = this.onload = null, t(null, e);
  }, e.onerror = function() {
    this.onerror = this.onload = null, t(new Error("Failed to load " + this.src), e);
  };
}
function Ye(e, t) {
  e.onreadystatechange = function() {
    this.readyState != "complete" && this.readyState != "loaded" || (this.onreadystatechange = null, t(null, e));
  };
}
const Ke = /* @__PURE__ */ te(qe);
var We = function(t) {
  return Xe(t) && !Ze(t);
};
function Xe(e) {
  return !!e && typeof e == "object";
}
function Ze(e) {
  var t = Object.prototype.toString.call(e);
  return t === "[object RegExp]" || t === "[object Date]" || Ge(e);
}
var Je = typeof Symbol == "function" && Symbol.for, Qe = Je ? Symbol.for("react.element") : 60103;
function Ge(e) {
  return e.$$typeof === Qe;
}
function et(e) {
  return Array.isArray(e) ? [] : {};
}
function A(e, t) {
  return t.clone !== !1 && t.isMergeableObject(e) ? T(et(e), e, t) : e;
}
function tt(e, t, r) {
  return e.concat(t).map(function(n) {
    return A(n, r);
  });
}
function rt(e, t) {
  if (!t.customMerge)
    return T;
  var r = t.customMerge(e);
  return typeof r == "function" ? r : T;
}
function nt(e) {
  return Object.getOwnPropertySymbols ? Object.getOwnPropertySymbols(e).filter(function(t) {
    return Object.propertyIsEnumerable.call(e, t);
  }) : [];
}
function Y(e) {
  return Object.keys(e).concat(nt(e));
}
function re(e, t) {
  try {
    return t in e;
  } catch {
    return !1;
  }
}
function ot(e, t) {
  return re(e, t) && !(Object.hasOwnProperty.call(e, t) && Object.propertyIsEnumerable.call(e, t));
}
function at(e, t, r) {
  var n = {};
  return r.isMergeableObject(e) && Y(e).forEach(function(a) {
    n[a] = A(e[a], r);
  }), Y(t).forEach(function(a) {
    ot(e, a) || (re(e, a) && r.isMergeableObject(t[a]) ? n[a] = rt(a, r)(e[a], t[a], r) : n[a] = A(t[a], r));
  }), n;
}
function T(e, t, r) {
  r = r || {}, r.arrayMerge = r.arrayMerge || tt, r.isMergeableObject = r.isMergeableObject || We, r.cloneUnlessOtherwiseSpecified = A;
  var n = Array.isArray(t), a = Array.isArray(e), i = n === a;
  return i ? n ? r.arrayMerge(e, t, r) : at(e, t, r) : A(t, r);
}
T.all = function(t, r) {
  if (!Array.isArray(t))
    throw new Error("first argument should be an array");
  return t.reduce(function(n, a) {
    return T(n, a, r);
  }, {});
};
var it = T, st = it;
const lt = /* @__PURE__ */ te(st), ut = /[?&#](?:start|t)=([0-9hms]+)/, ct = /[?&#]end=([0-9hms]+)/, x = /(\d+)([hms])/g, ft = /^\d+$/;
function ne(e, t) {
  if (e instanceof Array)
    return;
  const r = e.match(t);
  if (r) {
    const n = r[1];
    if (n.match(x))
      return dt(n);
    if (ft.test(n))
      return parseInt(n);
  }
}
function dt(e) {
  let t = 0, r = x.exec(e);
  for (; r !== null; ) {
    const [, n, a] = r;
    a === "h" && (t += parseInt(n, 10) * 60 * 60), a === "m" && (t += parseInt(n, 10) * 60), a === "s" && (t += parseInt(n, 10)), r = x.exec(e);
  }
  return t;
}
function Gt(e) {
  return ne(e, ut);
}
function er(e) {
  return ne(e, ct);
}
function tr() {
  return Math.random().toString(36).substr(2, 5);
}
function rr(e) {
  return Object.keys(e).map((t) => `${t}=${e[t]}`).join("&");
}
function D(e) {
  return window[e] ? window[e] : window.exports && window.exports[e] ? window.exports[e] : window.module && window.module.exports && window.module.exports[e] ? window.module.exports[e] : null;
}
const w = {};
function nr(e, t, r = null, n = () => !0, a = Ke) {
  const i = D(t);
  return i && n(i) ? Promise.resolve(i) : new Promise((l, s) => {
    if (w[e]) {
      w[e].push({ resolve: l, reject: s });
      return;
    }
    w[e] = [{ resolve: l, reject: s }];
    const u = (c) => {
      w[e].forEach((y) => y.resolve(c));
    };
    if (r) {
      const c = window[r];
      window[r] = function() {
        c && c(), u(D(t));
      };
    }
    a(e, (c) => {
      c ? (w[e].forEach((y) => y.reject(c)), w[e] = null) : r || u(D(t));
    });
  });
}
function pt(e, ...t) {
  if (!this.player || !this.player[e]) {
    let r = `VuePlayer: ${this.$options.displayName} player could not call %c${e}%c – `;
    return this.player ? this.player[e] || (r += "The method was not available") : r += "The player was not available", console.warn(r, "font-weight: bold", ""), null;
  }
  return this.player[e](...t);
}
function yt(e) {
  return typeof MediaStream < "u" && e instanceof MediaStream || typeof window < "u" && typeof window.MediaStream < "u" && e instanceof window.MediaStream;
}
function mt(e) {
  return /^blob:/.test(e);
}
function ht(e = document.createElement("video")) {
  const t = !/iPhone|iPod/.test(navigator.userAgent);
  return typeof e.webkitSetPresentationMode == "function" && t;
}
const bt = {
  emits: [
    "mounted",
    "ready",
    "start",
    "play",
    "pause",
    "buffer",
    "buffer-end",
    "ended",
    "error",
    "duration",
    "seek",
    "playback-rate-change",
    "progress",
    "click-preview",
    "enable-pip",
    "disable-pip"
  ],
  slots: ["playIcon", "fallback"],
  props: {
    url: o.oneOfType([o.string, o.array, o.object]).isRequired,
    playing: o.bool.def(!1),
    loop: o.bool.def(!1),
    controls: o.bool.def(!1),
    volume: o.number,
    // def: null
    muted: o.bool.def(!1),
    playbackRate: o.number.def(1),
    display: o.string.def("block"),
    width: o.oneOfType([o.string, o.number]).def("640px"),
    height: o.oneOfType([o.string, o.number]).def("360px"),
    style: o.object.def(() => ({})),
    progressInterval: o.number.def(1e3),
    playsInline: o.bool.def(!1),
    pictureInPicture: o.bool.def(!1),
    stopOnUnmount: o.bool.def(!0),
    light: o.oneOfType([o.bool, o.string]).def(!1),
    previewTabIndex: o.number.def(0),
    oEmbedUrl: o.string.def("https://noembed.com/embed?url={url}"),
    wrapper: o.oneOfType([
      o.string,
      o.func,
      o.shape({ render: o.func.isRequired }).loose
    ]).def("div"),
    config: o.object.def(() => ({}))
  },
  data() {
    return {
      isMounted: !1
    };
  },
  mounted() {
    this.isMounted = !0, this.$emit("mounted", this);
  },
  beforeUnmount() {
    this.isMounted = !1;
  },
  watch: {
    muted(e) {
      e ? this.mute() : this.unmute();
    },
    loop: "setLoop",
    playbackRate: "setPlaybackRate",
    volume: "setVolume",
    playing(e) {
      e ? this.play() : this.pause();
    }
  },
  methods: {
    callPlayer(e, ...t) {
      return pt.apply(this, [e, ...t]);
    },
    async load(e, ...t) {
    },
    // [Hooks]
    /**
     * Start/resume playing
     * @playerHook play
     */
    play() {
    },
    /**
     * Pause the video
     * @playerHook pause
     */
    pause() {
    },
    /**
     * Stop the video (pause + back to 0)
     * @playerHook stop
     */
    stop() {
    },
    /**
     * Move the play-head to the give time in seconds
     * @param {number} seconds - The time point to move the play-head to
     * @playerHook seekTo
     */
    seekTo(e) {
    },
    /**
     * Move the play-point to the give time in seconds
     * @param {number} fraction - A number in the range [0;1] where 0 is mute and 1 is full power
     * @playerHook setVolume
     */
    setVolume(e) {
    },
    /**
     * Mute the player
     * @playerHook mute
     */
    mute() {
    },
    /**
     * Unmute the player
     * @playerHook unmute
     */
    unmute() {
    },
    /**
     * Get the duration of the video
     * @returns {number|null}
     * @playerHook getDuration
     */
    getDuration() {
      return 0;
    },
    /**
     * Get the current position of the play-head in seconds
     * @returns {number|null}
     * @playerHook getCurrentTime
     */
    getCurrentTime() {
      return 0;
    },
    /**
     * Get the amount of seconds already preloaded
     * @returns {number|null}
     * @playerHook getSecondsLoaded
     */
    getSecondsLoaded() {
      return 0;
    },
    /**
     * Set the playback rate
     * @param {number} rate
     * @playerHook setPlaybackRate
     */
    setPlaybackRate(e) {
    },
    /**
     * Enable  picture-in-picture mode
     */
    enablePIP() {
    },
    /**
     * Disable  picture-in-picture mode
     */
    disablePIP() {
    },
    /**
     * Set the looping flag
     */
    setLoop(e) {
    },
    // [/Hooks]
    // [Event handlers/delegates/propagators]
    onError(...e) {
      this.$emit("error", ...e);
    },
    onDuration(e) {
      this.$emit("duration", e);
    },
    onReady(...e) {
      this.$emit("ready", ...e);
    },
    onSeek(e) {
      this.$emit("seek", e);
    },
    onEnded() {
      this.$emit("ended");
    },
    onPause(...e) {
      this.$emit("pause", ...e);
    },
    onPlay(...e) {
      this.$emit("play", ...e);
    },
    onBuffer(...e) {
      this.$emit("buffer", ...e);
    },
    onBufferEnd(...e) {
      this.$emit("buffer-end", ...e);
    },
    onPlaybackRateChange(...e) {
      this.$emit("playback-rate-change", ...e);
    },
    onEnablePIP(...e) {
      this.$emit("enable-pip", ...e);
    },
    onDisablePIP(...e) {
      this.$emit("disable-pip", ...e);
    }
    // [/Event handlers/delegates/propagators]
  }
}, oe = () => ({
  options: {
    visual: !0,
    // Undocumented, but makes player fill container and look better
    buying: !1,
    liking: !1,
    download: !1,
    sharing: !1,
    show_comments: !1,
    show_playcount: !1
  }
}), gt = () => o.shape({
  options: o.shape({
    visual: o.bool,
    buying: o.bool,
    liking: o.bool,
    download: o.bool,
    sharing: o.bool,
    show_comments: o.bool,
    show_playcount: o.bool
  }).loose
}).loose.def(() => oe()), ae = () => ({
  playerVars: {
    playsinline: 1,
    showinfo: 0,
    rel: 0,
    iv_load_policy: 3,
    modestbranding: 1
  },
  embedOptions: {},
  onUnstarted: () => {
  }
}), vt = () => o.shape({
  playerVars: o.shape({
    playsinline: o.integer,
    showinfo: o.integer,
    rel: o.integer,
    iv_load_policy: o.integer,
    modestbranding: o.integer
  }).loose,
  embedOptions: o.object,
  onUnstarted: o.func
}).loose.def(() => ae()), ie = () => ({
  appId: "1309697205772819",
  version: "v3.3",
  playerId: null,
  attributes: {}
}), wt = () => o.shape({
  appId: o.string,
  version: o.string,
  playerId: o.string,
  attributes: o.object
}).loose.def(() => ie()), se = () => ({
  params: {
    api: 1,
    "endscreen-enable": !1
  }
}), Pt = () => o.shape({
  params: o.shape({
    api: o.integer,
    "endscreen-enable": o.bool
  }).loose
}).loose.def(() => se()), le = () => ({
  playerOptions: {
    autopause: !1,
    byline: !1,
    portrait: !1,
    title: !1
  },
  title: null
}), Ot = () => o.shape({
  playerOptions: o.shape({
    autopause: o.bool,
    byline: o.bool,
    portrait: o.bool,
    title: o.bool
  }).loose,
  title: o.string
}).loose.def(() => le()), ue = () => ({
  attributes: {},
  tracks: [],
  forceVideo: !1,
  forceAudio: !1,
  forceHLS: !1,
  forceDASH: !1,
  forceFLV: !1,
  hlsOptions: {},
  hlsVersion: "1.1.4",
  dashVersion: "3.1.3",
  flvVersion: "1.5.0"
}), _t = () => o.shape({
  attributes: o.object,
  tracks: o.array,
  forceVideo: o.bool,
  forceAudio: o.bool,
  forceHLS: o.bool,
  forceDASH: o.bool,
  forceFLV: o.bool,
  hlsOptions: o.object,
  hlsVersion: o.string,
  dashVersion: o.string,
  flvVersion: o.string
}).loose.def(() => ue()), ce = () => ({
  wistia: {
    options: {},
    playerId: null,
    customControls: null
  }
}), Tt = () => o.shape({
  wistia: o.shape({
    options: o.object,
    playerId: o.string,
    customControls: o.array
  }).loose
}).loose.def(() => ce()), fe = () => ({
  options: {
    hide_cover: 1
  }
}), jt = () => o.shape({
  options: o.shape({
    hide_cover: o.integer
  }).loose
}).loose.def(() => fe()), de = () => ({
  options: {},
  playerId: null
}), At = () => o.shape({
  options: o.object,
  playerId: o.string
}).loose.def(() => de), pe = () => ({
  options: {}
}), Ct = () => o.shape({
  options: o.object
}).loose.def(() => pe()), L = () => ({
  soundcloud: oe(),
  youtube: ae(),
  facebook: ie(),
  dailymotion: se(),
  vimeo: le(),
  file: ue(),
  wistia: ce(),
  mixcloud: fe(),
  twitch: de(),
  vidyard: pe()
}), St = () => o.shape({
  soundcloud: gt(),
  youtube: vt(),
  facebook: wt(),
  dailymotion: Pt(),
  vimeo: Ot(),
  file: _t(),
  wistia: Tt(),
  mixcloud: jt(),
  twitch: At(),
  vidyard: Ct()
}).def(() => L()), $t = () => o.oneOfType([
  o.shape({ render: o.func }).loose,
  o.string,
  o.func
]), Et = {
  mixins: [bt],
  props: {
    config: St(),
    progressFrequency: o.number,
    activePlayer: $t()
  }
};
/*!
The MIT License

Copyright © Pete Cook http://cookpete.com

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
*/
const K = /(?:youtu\.be\/|youtube(?:-nocookie)?\.com\/(?:embed\/|v\/|watch\/|watch\?v=|watch\?.+&v=))((\w|-){11})|youtube\.com\/playlist\?list=|youtube\.com\/user\//, Mt = /(?:soundcloud\.com|snd\.sc)\/[^.]+$/, It = /vimeo\.com\/(?!progressive_redirect).+/, kt = /^https?:\/\/(www\.)?facebook\.com.*\/(video(s)?|watch|story)(\.php?|\/).+$/, Dt = /^https?:\/\/fb\.watch\/.+$/, Rt = /streamable\.com\/([a-z0-9]+)$/, xt = /(?:wistia\.(?:com|net)|wi\.st)\/(?:medias|embed)\/(?:iframe\/)?(.*)$/, Lt = /(?:www\.|go\.)?twitch\.tv\/videos\/(\d+)($|\?)/, Ut = /(?:www\.|go\.)?twitch\.tv\/([a-zA-Z0-9_]+)($|\?)/, Nt = /^(?:(?:https?):)?(?:\/\/)?(?:www\.)?(?:(?:dailymotion\.com(?:\/embed)?\/video)|dai\.ly)\/([a-zA-Z0-9]+)(?:_[\w_-]+)?$/, Vt = /mixcloud\.com\/([^/]+\/[^/]+)/, Ht = /vidyard.com\/(?:watch\/)?([a-zA-Z0-9-_]+)/, zt = /^https?:\/\/[a-zA-Z]+\.kaltura.(com|org)\/p\/([0-9]+)\/sp\/([0-9]+)00\/embedIframeJs\/uiconf_id\/([0-9]+)\/partner_id\/([0-9]+)(.*)entry_id.([a-zA-Z0-9-_]+)$/, V = /\.(m4a|m4b|mp4a|mpga|mp2|mp2a|mp3|m2a|m3a|wav|weba|aac|oga|spx)($|\?)/i, ye = /\.(mp4|og[gv]|webm|mov|m4v)(#t=[,\d+]+)?($|\?)/i, me = /\.(m3u8)($|\?)/i, Ft = /\.(mpd)($|\?)/i, qt = /\.(flv)($|\?)/i, U = (e) => {
  if (e instanceof Array) {
    for (const t of e)
      if (typeof t == "string" && U(t) || U(t.src))
        return !0;
    return !1;
  }
  return yt(e) || mt(e) ? !0 : V.test(e) || ye.test(e) || me.test(e) || Ft.test(e) || qt.test(e);
}, d = {
  /**
   * @type {CanPlayUrl}
   */
  youtube: (e) => e instanceof Array ? e.every((t) => K.test(t)) : K.test(e),
  /**
   * @type {CanPlayUrl}
   */
  soundcloud: (e) => Mt.test(e) && !V.test(e),
  /**
   * @type {CanPlayUrl}
   */
  vimeo: (e) => It.test(e) && !ye.test(e) && !me.test(e),
  /**
   * @type {CanPlayUrl}
   */
  facebook: (e) => kt.test(e) || Dt.test(e),
  /**
   * @type {CanPlayUrl}
   */
  streamable: (e) => Rt.test(e),
  /**
   * @type {CanPlayUrl}
   */
  wistia: (e) => xt.test(e),
  /**
   * @type {CanPlayUrl}
   */
  twitch: (e) => Lt.test(e) || Ut.test(e),
  /**
   * @type {CanPlayUrl}
   */
  dailymotion: (e) => Nt.test(e),
  /**
   * @type {CanPlayUrl}
   */
  mixcloud: (e) => Vt.test(e),
  /**
   * @type {CanPlayUrl}
   */
  vidyard: (e) => Ht.test(e),
  /**
   * @type {CanPlayUrl}
   */
  kaltura: (e) => zt.test(e),
  /**
   * @type {CanPlayUrl}
   */
  file: U
}, R = [
  /**
   * @type {PlayerDecl<"youtube", "YouTube", import("./components/players/YouTubePlayer.vue").default>}
   */
  {
    key: "youtube",
    name: "YouTube",
    canPlay: d.youtube,
    lazyPlayer: () => import(
      /* webpackChunkName: 'vuePlayerYouTube' */
      "./YouTubePlayer-C4ZTcqoJ.mjs"
    ).then((e) => e.default ?? e)
  },
  /**
   * @type {PlayerDecl<"soundcloud", "SoundCloud", import("./components/players/SoundCloudPlayer.vue").default>}
   */
  {
    key: "soundcloud",
    name: "SoundCloud",
    canPlay: d.soundcloud,
    lazyPlayer: () => import(
      /* webpackChunkName: 'vuePlayerSoundCloud' */
      "./SoundcloudPlayer-BxbiorPj.mjs"
    ).then((e) => e.default ?? e)
  },
  /**
   * @type {PlayerDecl<"vimeo", "Vimeo", import("./components/players/VimeoPlayer.vue").default>}
   */
  {
    key: "vimeo",
    name: "Vimeo",
    canPlay: d.vimeo,
    lazyPlayer: () => import(
      /* webpackChunkName: 'vuePlayerVimeo' */
      "./VimeoPlayer-BiJ1APav.mjs"
    ).then((e) => e.default ?? e)
  },
  /**
   * @type {PlayerDecl<"facebook", "Facebook", import("./components/players/FacebookPlayer.vue").default>}
   */
  {
    key: "facebook",
    name: "Facebook",
    canPlay: d.facebook,
    lazyPlayer: () => import(
      /* webpackChunkName: 'vuePlayerFacebook' */
      "./FacebookPlayer-CVyP-AJL.mjs"
    ).then((e) => e.default ?? e)
  },
  /**
   * @type {PlayerDecl<"streamable", "Streamable", import("./components/players/StreamablePlayer.vue").default>}
   */
  {
    key: "streamable",
    name: "Streamable",
    canPlay: d.streamable,
    lazyPlayer: () => import(
      /* webpackChunkName: 'vuePlayerStreamable' */
      "./StreamablePlayer-DRsLuoMG.mjs"
    ).then((e) => e.default ?? e)
  },
  /**
   * @type {PlayerDecl<"wistia", "Wistia", import("./components/players/WistiaPlayer.vue").default>}
   */
  {
    key: "wistia",
    name: "Wistia",
    canPlay: d.wistia,
    lazyPlayer: () => import(
      /* webpackChunkName: 'vuePlayerWistia' */
      "./WistiaPlayer-C9X8jJW4.mjs"
    ).then((e) => e.default ?? e)
  },
  /**
   * @type {PlayerDecl<"twitch", "Twitch", import("./components/players/TwitchPlayer.vue").default>}
   */
  {
    key: "twitch",
    name: "Twitch",
    canPlay: d.twitch,
    lazyPlayer: () => import(
      /* webpackChunkName: 'vuePlayerTwitch' */
      "./TwitchPlayer-Bji2EQxU.mjs"
    ).then((e) => e.default ?? e)
  },
  /**
   * @type {PlayerDecl<"dailymotion", "DailyMotion", import("./components/players/DailyMotionPlayer.vue").default>}
   */
  {
    key: "dailymotion",
    name: "DailyMotion",
    canPlay: d.dailymotion,
    lazyPlayer: () => import(
      /* webpackChunkName: 'vuePlayerDailyMotion' */
      "./DailyMotionPlayer-BDNjEUxg.mjs"
    ).then((e) => e.default ?? e)
  },
  /**
   * @type {PlayerDecl<"mixcloud", "Mixcloud", import("./components/players/MixcloudPlayer.vue").default>}
   */
  {
    key: "mixcloud",
    name: "Mixcloud",
    canPlay: d.mixcloud,
    lazyPlayer: () => import(
      /* webpackChunkName: 'vuePlayerMixcloud' */
      "./MixcloudPlayer-C-LBrfUZ.mjs"
    ).then((e) => e.default ?? e)
  },
  /**
   * @type {PlayerDecl<"vidyard", "Vidyard", import("./components/players/VidyardPlayer.vue").default>}
   */
  {
    key: "vidyard",
    name: "Vidyard",
    canPlay: d.vidyard,
    lazyPlayer: () => import(
      /* webpackChunkName: 'vuePlayerVidyard' */
      "./VidyardPlayer-EpQykYvc.mjs"
    ).then((e) => e.default ?? e)
  },
  /**
   * @type {PlayerDecl<"kaltura", "Kaltura", import("./components/players/KalturaPlayer.vue").default>}
   */
  {
    key: "kaltura",
    name: "Kaltura",
    canPlay: d.kaltura,
    lazyPlayer: () => import(
      /* webpackChunkName: 'vuePlayerKaltura' */
      "./KalturaPlayer-DQ0L5epF.mjs"
    ).then((e) => e.default ?? e)
  },
  /**
   * @type {PlayerDecl<"file", "FilePlayer", import("./components/players/FilePlayer.vue").default>}
   */
  {
    key: "file",
    name: "FilePlayer",
    canPlay: d.file,
    canEnablePIP: (e) => d.file(e) && (document.pictureInPictureEnabled || ht()) && !V.test(e),
    lazyPlayer: () => import(
      /* webpackChunkName: 'vuePlayerFilePlayer' */
      "./FilePlayer-qXlYqM90.mjs"
    ).then((e) => e.default ?? e)
  }
];
var W = Number.isNaN || function(t) {
  return typeof t == "number" && t !== t;
};
function Bt(e, t) {
  return !!(e === t || W(e) && W(t));
}
function Yt(e, t) {
  if (e.length !== t.length)
    return !1;
  for (var r = 0; r < e.length; r++)
    if (!Bt(e[r], t[r]))
      return !1;
  return !0;
}
function X(e, t) {
  t === void 0 && (t = Yt);
  var r = null;
  function n() {
    for (var a = [], i = 0; i < arguments.length; i++)
      a[i] = arguments[i];
    if (r && r.lastThis === this && t(a, r.lastArgs))
      return r.lastResult;
    var l = e.apply(this, a);
    return r = {
      lastResult: l,
      lastArgs: a,
      lastThis: this
    }, l;
  }
  return n.clear = function() {
    r = null;
  }, n;
}
const Kt = (e, t) => {
  const r = e.__vccOpts || e;
  for (const [n, a] of t)
    r[n] = a;
  return r;
};
let h = [];
const Wt = {
  // [META]
  displayName: "VuePlayer",
  /**
   * @template {string} Key
   * @template {string} Name
   * @template {Component} C
   * @param {PlayerDecl<Key, Name, C>} player
   */
  addCustomPlayer(e) {
    h.push(e);
  },
  /**
   * @template {string} Key
   * @template {string} Name
   * @template {Component} C
   * @param {PlayerDecl<Key, Name, C>} player
   */
  removeCustomPlayer(e) {
    h = h.filter((t) => t !== e);
  },
  removeCustomPlayers() {
    h = [];
  },
  canPlay(e) {
    return [...h, ...R].some((t) => t.canPlay(e));
  },
  canEnablePIP(e) {
    return [...h, ...R].some((t) => {
      var r;
      return (r = t.canEnablePIP) == null ? void 0 : r.call(t, e);
    });
  },
  // [/META]
  inheritAttrs: !1,
  mixins: [Et],
  emits: ["click-preview"],
  components: {
    Preview: () => import(
      /* webpackChunkName: 'vuePlayerPreview' */
      "./Preview-CcEeSZG6.mjs"
    ).then((e) => e.default ?? e),
    Player: () => import(
      /* webpackChunkName: 'vuePlayerPlayer' */
      "./Player-H_c4U6vm.mjs"
    ).then((e) => e.default ?? e)
  },
  data() {
    return {
      shouldShowPreview: !!this.light
    };
  },
  mounted() {
    this.getConfig = X(this.getConfig), this.getActivePlayer = X(this.getActivePlayer);
  },
  computed: {
    previewProps() {
      return {
        url: this.url,
        light: this.light,
        previewTabIndex: this.previewTabIndex,
        oEmbedUrl: this.oEmbedUrl
      };
    },
    playerKey() {
      var e;
      return (e = this.currentPlayer) == null ? void 0 : e.key;
    },
    currentPlayer() {
      return this.activePlayer ?? this.getActivePlayer(this.url);
    },
    playerConfig() {
      return this.getConfig(this.url, this.playerKey);
    },
    playerComponent() {
      var e;
      return ((e = this.currentPlayer) == null ? void 0 : e.lazyPlayer) ?? this.currentPlayer;
    },
    playerStyles() {
      return {
        ...this.style ?? {},
        width: this.width,
        height: this.height
      };
    }
  },
  methods: {
    /**
     * @inheritDoc
     * @override
     * @playerHook getDuration
     */
    getDuration() {
      var e, t;
      return (t = (e = this.$refs.player) == null ? void 0 : e.getDuration) == null ? void 0 : t.call(e);
    },
    /**
     * @inheritDoc
     * @override
     * @playerHook getCurrentTime
     */
    getCurrentTime() {
      var e, t;
      return (t = (e = this.$refs.player) == null ? void 0 : e.getCurrentTime) == null ? void 0 : t.call(e);
    },
    /**
     * @inheritDoc
     * @override
     * @playerHook getSecondsLoaded
     */
    getSecondsLoaded() {
      var e, t;
      return (t = (e = this.$refs.player) == null ? void 0 : e.getSecondsLoaded) == null ? void 0 : t.call(e);
    },
    /**
     * @inheritDoc
     * @override
     * @playerHook seekTo
     */
    seekTo(e, t) {
      var r, n;
      return (n = (r = this.$refs.player) == null ? void 0 : r.seekTo) == null ? void 0 : n.call(r, e, t);
    },
    getConfig(e, t) {
      var r;
      return lt.all([
        L,
        L[t] ?? {},
        this.config ?? {},
        ((r = this.config) == null ? void 0 : r[t]) ?? {}
      ]);
    },
    getActivePlayer(e) {
      return [...h, ...R].find((t) => t.canPlay(e));
    },
    handleClickPreview(e) {
      this.shouldShowPreview = !1, this.$emit("click-preview", e);
    },
    showPreview() {
      this.shouldShowPreview = !0;
    },
    handleReady() {
      this.onReady(this);
    },
    getInternalPlayer(e = "player") {
      var t;
      return (t = this.$refs.player) == null ? void 0 : t.getInternalPlayer(e);
    }
  }
}, Xt = { key: 0 }, Zt = {
  key: 2,
  class: "vue-player--none"
};
function Jt(e, t, r, n, a, i) {
  const l = H("Preview"), s = H("Player");
  return v(), E(he(e.wrapper), M({ ref: "wrapper" }, e.$attrs), {
    default: I(() => [
      e.url ? (v(), k(be, { key: 1 }, [
        a.shouldShowPreview ? (v(), E(l, M({ key: 0 }, i.previewProps, { onClick: i.handleClickPreview }), {
          playIcon: I(() => [
            C(e.$slots, "playIcon")
          ]),
          _: 3
        }, 16, ["onClick"])) : i.currentPlayer ? (v(), E(s, M({ key: 1 }, e.$props, {
          key: i.playerKey,
          ref: "player",
          config: i.playerConfig,
          activePlayer: i.playerComponent,
          style: i.playerStyles,
          onReady: i.handleReady
        }, ge(e.$listeners ?? {})), {
          none: I(() => [
            C(e.$slots, "noPlayer")
          ]),
          _: 3
        }, 16, ["config", "activePlayer", "style", "onReady"])) : (v(), k("span", Zt, [
          C(e.$slots, "noPlayer")
        ]))
      ], 64)) : (v(), k("span", Xt, [
        C(e.$slots, "noUrl")
      ]))
    ]),
    _: 3
  }, 16);
}
const or = /* @__PURE__ */ Kt(Wt, [["render", Jt]]);
export {
  V as A,
  o as C,
  Ft as D,
  qt as F,
  me as H,
  Rt as M,
  or as V,
  Kt as _,
  Gt as a,
  er as b,
  d as c,
  xt as d,
  Ut as e,
  wt as f,
  nr as g,
  Pt as h,
  Nt as i,
  jt as j,
  Vt as k,
  Ct as l,
  Et as m,
  Ht as n,
  _t as o,
  bt as p,
  rr as q,
  tr as r,
  gt as s,
  At as t,
  yt as u,
  Ot as v,
  Tt as w,
  ht as x,
  vt as y
};

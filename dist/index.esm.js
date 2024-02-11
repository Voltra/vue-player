/*!
 * is-plain-object <https://github.com/jonschlinkert/is-plain-object>
 *
 * Copyright (c) 2014-2017, Jon Schlinkert.
 * Released under the MIT License.
 */
function re(e) {
  return Object.prototype.toString.call(e) === "[object Object]";
}
function rt(e) {
  var t, r;
  return re(e) === !1 ? !1 : (t = e.constructor, t === void 0 ? !0 : (r = t.prototype, !(re(r) === !1 || r.hasOwnProperty("isPrototypeOf") === !1)));
}
function C() {
  return C = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r)
        Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, C.apply(this, arguments);
}
function me(e, t) {
  if (e == null)
    return {};
  var r, n, s = {}, i = Object.keys(e);
  for (n = 0; n < i.length; n++)
    t.indexOf(r = i[n]) >= 0 || (s[r] = e[r]);
  return s;
}
const G = { silent: !1, logLevel: "warn" }, nt = ["validator"], ge = Object.prototype, _e = ge.toString, st = ge.hasOwnProperty, ve = /^\s*function (\w+)/;
function ne(e) {
  var t;
  const r = (t = e == null ? void 0 : e.type) !== null && t !== void 0 ? t : e;
  if (r) {
    const n = r.toString().match(ve);
    return n ? n[1] : "";
  }
  return "";
}
const S = rt, Pe = (e) => e;
let f = Pe;
process.env.NODE_ENV !== "production" && (f = typeof console < "u" ? function(t, r = G.logLevel) {
  G.silent === !1 && console[r](`[VueTypes warn]: ${t}`);
} : Pe);
const T = (e, t) => st.call(e, t), it = Number.isInteger || function(e) {
  return typeof e == "number" && isFinite(e) && Math.floor(e) === e;
}, E = Array.isArray || function(e) {
  return _e.call(e) === "[object Array]";
}, k = (e) => _e.call(e) === "[object Function]", M = (e) => S(e) && T(e, "_vueTypes_name"), be = (e) => S(e) && (T(e, "type") || ["_vueTypes_name", "validator", "default", "required"].some((t) => T(e, t)));
function Q(e, t) {
  return Object.defineProperty(e.bind(t), "__original", { value: e });
}
function $(e, t, r = !1) {
  let n, s = !0, i = "";
  n = S(e) ? e : { type: e };
  const l = M(n) ? n._vueTypes_name + " - " : "";
  if (be(n) && n.type !== null) {
    if (n.type === void 0 || n.type === !0 || !n.required && t === void 0)
      return s;
    E(n.type) ? (s = n.type.some((c) => $(c, t, !0) === !0), i = n.type.map((c) => ne(c)).join(" or ")) : (i = ne(n), s = i === "Array" ? E(t) : i === "Object" ? S(t) : i === "String" || i === "Number" || i === "Boolean" || i === "Function" ? function(c) {
      if (c == null)
        return "";
      const o = c.constructor.toString().match(ve);
      return o ? o[1] : "";
    }(t) === i : t instanceof n.type);
  }
  if (!s) {
    const c = `${l}value "${t}" should be of type "${i}"`;
    return r === !1 ? (f(c), !1) : c;
  }
  if (T(n, "validator") && k(n.validator)) {
    const c = f, o = [];
    if (f = (u) => {
      o.push(u);
    }, s = n.validator(t), f = c, !s) {
      const u = (o.length > 1 ? "* " : "") + o.join(`
* `);
      return o.length = 0, r === !1 ? (f(u), s) : u;
    }
  }
  return s;
}
function _(e, t) {
  const r = Object.defineProperties(t, { _vueTypes_name: { value: e, writable: !0 }, isRequired: { get() {
    return this.required = !0, this;
  } }, def: { value(s) {
    return s === void 0 ? (T(this, "default") && delete this.default, this) : k(s) || $(this, s, !0) === !0 ? (this.default = E(s) ? () => [...s] : S(s) ? () => Object.assign({}, s) : s, this) : (f(`${this._vueTypes_name} - invalid default value: "${s}"`), this);
  } } }), { validator: n } = r;
  return k(n) && (r.validator = Q(n, r)), r;
}
function P(e, t) {
  const r = _(e, t);
  return Object.defineProperty(r, "validate", { value(n) {
    return k(this.validator) && f(`${this._vueTypes_name} - calling .validate() will overwrite the current custom validator function. Validator info:
${JSON.stringify(this)}`), this.validator = Q(n, this), this;
  } });
}
function se(e, t, r) {
  const n = function(o) {
    const u = {};
    return Object.getOwnPropertyNames(o).forEach((d) => {
      u[d] = Object.getOwnPropertyDescriptor(o, d);
    }), Object.defineProperties({}, u);
  }(t);
  if (n._vueTypes_name = e, !S(r))
    return n;
  const { validator: s } = r, i = me(r, nt);
  if (k(s)) {
    let { validator: o } = n;
    o && (o = (c = (l = o).__original) !== null && c !== void 0 ? c : l), n.validator = Q(o ? function(u) {
      return o.call(this, u) && s.call(this, u);
    } : s, n);
  }
  var l, c;
  return Object.assign(n, i);
}
function V(e) {
  return e.replace(/^(?!\s*$)/gm, "  ");
}
const at = () => P("any", {}), ot = () => P("function", { type: Function }), lt = () => P("boolean", { type: Boolean }), ut = () => P("string", { type: String }), ct = () => P("number", { type: Number }), dt = () => P("array", { type: Array }), ht = () => P("object", { type: Object }), yt = () => _("integer", { type: Number, validator: (e) => it(e) }), pt = () => _("symbol", { validator: (e) => typeof e == "symbol" });
function ft(e, t = "custom validation failed") {
  if (typeof e != "function")
    throw new TypeError("[VueTypes error]: You must provide a function as argument");
  return _(e.name || "<<anonymous function>>", { type: null, validator(r) {
    const n = e(r);
    return n || f(`${this._vueTypes_name} - ${t}`), n;
  } });
}
function mt(e) {
  if (!E(e))
    throw new TypeError("[VueTypes error]: You must provide an array as argument.");
  const t = `oneOf - value should be one of "${e.join('", "')}".`, r = e.reduce((n, s) => {
    if (s != null) {
      const i = s.constructor;
      n.indexOf(i) === -1 && n.push(i);
    }
    return n;
  }, []);
  return _("oneOf", { type: r.length > 0 ? r : void 0, validator(n) {
    const s = e.indexOf(n) !== -1;
    return s || f(t), s;
  } });
}
function gt(e) {
  if (!E(e))
    throw new TypeError("[VueTypes error]: You must provide an array as argument");
  let t = !1, r = [];
  for (let s = 0; s < e.length; s += 1) {
    const i = e[s];
    if (be(i)) {
      if (M(i) && i._vueTypes_name === "oneOf" && i.type) {
        r = r.concat(i.type);
        continue;
      }
      if (k(i.validator) && (t = !0), i.type === !0 || !i.type) {
        f('oneOfType - invalid usage of "true" or "null" as types.');
        continue;
      }
      r = r.concat(i.type);
    } else
      r.push(i);
  }
  r = r.filter((s, i) => r.indexOf(s) === i);
  const n = r.length > 0 ? r : null;
  return _("oneOfType", t ? { type: n, validator(s) {
    const i = [], l = e.some((c) => {
      const o = $(M(c) && c._vueTypes_name === "oneOf" ? c.type || null : c, s, !0);
      return typeof o == "string" && i.push(o), o === !0;
    });
    return l || f(`oneOfType - provided value does not match any of the ${i.length} passed-in validators:
${V(i.join(`
`))}`), l;
  } } : { type: n });
}
function _t(e) {
  return _("arrayOf", { type: Array, validator(t) {
    let r = "";
    const n = t.every((s) => (r = $(e, s, !0), r === !0));
    return n || f(`arrayOf - value validation error:
${V(r)}`), n;
  } });
}
function vt(e) {
  return _("instanceOf", { type: e });
}
function Pt(e) {
  return _("objectOf", { type: Object, validator(t) {
    let r = "";
    const n = Object.keys(t).every((s) => (r = $(e, t[s], !0), r === !0));
    return n || f(`objectOf - value validation error:
${V(r)}`), n;
  } });
}
function bt(e) {
  const t = Object.keys(e), r = t.filter((s) => {
    var i;
    return !((i = e[s]) === null || i === void 0 || !i.required);
  }), n = _("shape", { type: Object, validator(s) {
    if (!S(s))
      return !1;
    const i = Object.keys(s);
    if (r.length > 0 && r.some((l) => i.indexOf(l) === -1)) {
      const l = r.filter((c) => i.indexOf(c) === -1);
      return f(l.length === 1 ? `shape - required property "${l[0]}" is not defined.` : `shape - required properties "${l.join('", "')}" are not defined.`), !1;
    }
    return i.every((l) => {
      if (t.indexOf(l) === -1)
        return this._vueTypes_isLoose === !0 || (f(`shape - shape definition does not include a "${l}" property. Allowed keys: "${t.join('", "')}".`), !1);
      const c = $(e[l], s[l], !0);
      return typeof c == "string" && f(`shape - "${l}" property validation error:
 ${V(c)}`), c === !0;
    });
  } });
  return Object.defineProperty(n, "_vueTypes_isLoose", { writable: !0, value: !1 }), Object.defineProperty(n, "loose", { get() {
    return this._vueTypes_isLoose = !0, this;
  } }), n;
}
const wt = ["name", "validate", "getter"], St = /* @__PURE__ */ (() => {
  var e;
  return (e = class {
    static get any() {
      return at();
    }
    static get func() {
      return ot().def(this.defaults.func);
    }
    static get bool() {
      return lt().def(this.defaults.bool);
    }
    static get string() {
      return ut().def(this.defaults.string);
    }
    static get number() {
      return ct().def(this.defaults.number);
    }
    static get array() {
      return dt().def(this.defaults.array);
    }
    static get object() {
      return ht().def(this.defaults.object);
    }
    static get integer() {
      return yt().def(this.defaults.integer);
    }
    static get symbol() {
      return pt();
    }
    static get nullable() {
      return { type: null };
    }
    static extend(t) {
      if (E(t))
        return t.forEach((o) => this.extend(o)), this;
      const { name: r, validate: n = !1, getter: s = !1 } = t, i = me(t, wt);
      if (T(this, r))
        throw new TypeError(`[VueTypes error]: Type "${r}" already defined`);
      const { type: l } = i;
      if (M(l))
        return delete i.type, Object.defineProperty(this, r, s ? { get: () => se(r, l, i) } : { value(...o) {
          const u = se(r, l, i);
          return u.validator && (u.validator = u.validator.bind(u, ...o)), u;
        } });
      let c;
      return c = s ? { get() {
        const o = Object.assign({}, i);
        return n ? P(r, o) : _(r, o);
      }, enumerable: !0 } : { value(...o) {
        const u = Object.assign({}, i);
        let d;
        return d = n ? P(r, u) : _(r, u), u.validator && (d.validator = u.validator.bind(d, ...o)), d;
      }, enumerable: !0 }, Object.defineProperty(this, r, c);
    }
  }).defaults = {}, e.sensibleDefaults = void 0, e.config = G, e.custom = ft, e.oneOf = mt, e.instanceOf = vt, e.oneOfType = gt, e.arrayOf = _t, e.objectOf = Pt, e.shape = bt, e.utils = { validate: (t, r) => $(r, t, !0) === !0, toType: (t, r, n = !1) => n ? P(t, r) : _(t, r) }, e;
})();
function $t(e = { func: () => {
}, bool: !0, string: "", number: 0, array: () => [], object: () => ({}), integer: 0 }) {
  var t;
  return (t = class extends St {
    static get sensibleDefaults() {
      return C({}, this.defaults);
    }
    static set sensibleDefaults(r) {
      this.defaults = r !== !1 ? C({}, r !== !0 ? r : e) : {};
    }
  }).defaults = C({}, e), t;
}
class a extends $t() {
}
function we(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var Lt = function(t, r, n) {
  var s = document.head || document.getElementsByTagName("head")[0], i = document.createElement("script");
  typeof r == "function" && (n = r, r = {}), r = r || {}, n = n || function() {
  }, i.type = r.type || "text/javascript", i.charset = r.charset || "utf8", i.async = "async" in r ? !!r.async : !0, i.src = t, r.attrs && Ot(i, r.attrs), r.text && (i.text = "" + r.text);
  var l = "onload" in i ? ie : Tt;
  l(i, n), i.onload || ie(i, n), s.appendChild(i);
};
function Ot(e, t) {
  for (var r in t)
    e.setAttribute(r, t[r]);
}
function ie(e, t) {
  e.onload = function() {
    this.onerror = this.onload = null, t(null, e);
  }, e.onerror = function() {
    this.onerror = this.onload = null, t(new Error("Failed to load " + this.src), e);
  };
}
function Tt(e, t) {
  e.onreadystatechange = function() {
    this.readyState != "complete" && this.readyState != "loaded" || (this.onreadystatechange = null, t(null, e));
  };
}
const Et = /* @__PURE__ */ we(Lt);
var kt = function(t) {
  return Rt(t) && !Ct(t);
};
function Rt(e) {
  return !!e && typeof e == "object";
}
function Ct(e) {
  var t = Object.prototype.toString.call(e);
  return t === "[object RegExp]" || t === "[object Date]" || It(e);
}
var At = typeof Symbol == "function" && Symbol.for, Dt = At ? Symbol.for("react.element") : 60103;
function It(e) {
  return e.$$typeof === Dt;
}
function jt(e) {
  return Array.isArray(e) ? [] : {};
}
function A(e, t) {
  return t.clone !== !1 && t.isMergeableObject(e) ? R(jt(e), e, t) : e;
}
function Mt(e, t, r) {
  return e.concat(t).map(function(n) {
    return A(n, r);
  });
}
function Vt(e, t) {
  if (!t.customMerge)
    return R;
  var r = t.customMerge(e);
  return typeof r == "function" ? r : R;
}
function Ut(e) {
  return Object.getOwnPropertySymbols ? Object.getOwnPropertySymbols(e).filter(function(t) {
    return Object.propertyIsEnumerable.call(e, t);
  }) : [];
}
function ae(e) {
  return Object.keys(e).concat(Ut(e));
}
function Se(e, t) {
  try {
    return t in e;
  } catch {
    return !1;
  }
}
function xt(e, t) {
  return Se(e, t) && !(Object.hasOwnProperty.call(e, t) && Object.propertyIsEnumerable.call(e, t));
}
function Nt(e, t, r) {
  var n = {};
  return r.isMergeableObject(e) && ae(e).forEach(function(s) {
    n[s] = A(e[s], r);
  }), ae(t).forEach(function(s) {
    xt(e, s) || (Se(e, s) && r.isMergeableObject(t[s]) ? n[s] = Vt(s, r)(e[s], t[s], r) : n[s] = A(t[s], r));
  }), n;
}
function R(e, t, r) {
  r = r || {}, r.arrayMerge = r.arrayMerge || Mt, r.isMergeableObject = r.isMergeableObject || kt, r.cloneUnlessOtherwiseSpecified = A;
  var n = Array.isArray(t), s = Array.isArray(e), i = n === s;
  return i ? n ? r.arrayMerge(e, t, r) : Nt(e, t, r) : A(t, r);
}
R.all = function(t, r) {
  if (!Array.isArray(t))
    throw new Error("first argument should be an array");
  return t.reduce(function(n, s) {
    return R(n, s, r);
  }, {});
};
var Ft = R, Ht = Ft;
const Kt = /* @__PURE__ */ we(Ht), Bt = /[?&#](?:start|t)=([0-9hms]+)/, zt = /[?&#]end=([0-9hms]+)/, W = /(\d+)([hms])/g, Yt = /^\d+$/;
function $e(e, t) {
  if (e instanceof Array)
    return;
  const r = e.match(t);
  if (r) {
    const n = r[1];
    if (n.match(W))
      return qt(n);
    if (Yt.test(n))
      return parseInt(n);
  }
}
function qt(e) {
  let t = 0, r = W.exec(e);
  for (; r !== null; ) {
    const [, n, s] = r;
    s === "h" && (t += parseInt(n, 10) * 60 * 60), s === "m" && (t += parseInt(n, 10) * 60), s === "s" && (t += parseInt(n, 10)), r = W.exec(e);
  }
  return t;
}
function D(e) {
  return $e(e, Bt);
}
function oe(e) {
  return $e(e, zt);
}
function ee() {
  return Math.random().toString(36).substr(2, 5);
}
function Gt(e) {
  return Object.keys(e).map((t) => `${t}=${e[t]}`).join("&");
}
function H(e) {
  return window[e] ? window[e] : window.exports && window.exports[e] ? window.exports[e] : window.module && window.module.exports && window.module.exports[e] ? window.module.exports[e] : null;
}
const O = {};
function b(e, t, r = null, n = () => !0, s = Et) {
  const i = H(t);
  return i && n(i) ? Promise.resolve(i) : new Promise((l, c) => {
    if (O[e]) {
      O[e].push({ resolve: l, reject: c });
      return;
    }
    O[e] = [{ resolve: l, reject: c }];
    const o = (u) => {
      O[e].forEach((d) => d.resolve(u));
    };
    if (r) {
      const u = window[r];
      window[r] = function() {
        u && u(), o(H(t));
      };
    }
    s(e, (u) => {
      u ? (O[e].forEach((d) => d.reject(u)), O[e] = null) : r || o(H(t));
    });
  });
}
function Wt(e, ...t) {
  if (!this.player || !this.player[e]) {
    let r = `VuePlayer: ${this.$options.displayName} player could not call %c${e}%c – `;
    return this.player ? this.player[e] || (r += "The method was not available") : r += "The player was not available", console.warn(r, "font-weight: bold", ""), null;
  }
  return this.player[e](...t);
}
function I(e) {
  return typeof MediaStream < "u" && e instanceof MediaStream || typeof window < "u" && typeof window.MediaStream < "u" && e instanceof window.MediaStream;
}
function Xt(e) {
  return /^blob:/.test(e);
}
function j(e = document.createElement("video")) {
  const t = !/iPhone|iPod/.test(navigator.userAgent);
  return typeof e.webkitSetPresentationMode == "function" && t;
}
const v = {
  events: [
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
    url: a.oneOfType([a.string, a.array, a.object]).isRequired,
    playing: a.bool.def(!1),
    loop: a.bool.def(!1),
    controls: a.bool.def(!1),
    volume: a.number,
    // def: null
    muted: a.bool.def(!1),
    playbackRate: a.number.def(1),
    width: a.oneOfType([a.string, a.number]).def("640px"),
    height: a.oneOfType([a.string, a.number]).def("360px"),
    style: a.object.def(() => ({})),
    progressInterval: a.number.def(1e3),
    playsInline: a.bool.def(!1),
    pictureInPicture: a.bool.def(!1),
    stopOnUnmount: a.bool.def(!0),
    light: a.oneOfType([a.bool, a.string]).def(!1),
    previewTabIndex: a.number.def(0),
    oEmbedUrl: a.string.def("https://noembed.com/embed?url={url}"),
    wrapper: a.oneOfType([
      a.string,
      a.func,
      a.shape({ render: a.func.isRequired }).loose
    ]).def("div"),
    config: a.object.def(() => ({}))
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
      return Wt.apply(this, [e, ...t]);
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
      this.$emit("enable-pip", ...e);
    }
    // [/Event handlers/delegates/propagators]
  }
}, Le = {
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
}, Oe = a.shape({
  options: a.shape({
    visual: a.bool,
    buying: a.bool,
    liking: a.bool,
    download: a.bool,
    sharing: a.bool,
    show_comments: a.bool,
    show_playcount: a.bool
  }).loose
}).loose.def(() => Le), Te = {
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
}, Ee = a.shape({
  playerVars: a.shape({
    playsinline: a.integer,
    showinfo: a.integer,
    rel: a.integer,
    iv_load_policy: a.integer,
    modestbranding: a.integer
  }).loose,
  embedOptions: a.object,
  onUnstarted: a.func
}).loose.def(() => Te), ke = {
  appId: "1309697205772819",
  version: "v3.3",
  playerId: null,
  attributes: {}
}, Re = a.shape({
  appId: a.string,
  version: a.string,
  playerId: a.string,
  attributes: a.object
}).loose.def(() => ke), Ce = {
  params: {
    api: 1,
    "endscreen-enable": !1
  }
}, Ae = a.shape({
  params: a.shape({
    api: a.integer,
    "endscreen-enable": a.bool
  }).loose
}).loose.def(() => Ce), De = {
  playerOptions: {
    autopause: !1,
    byline: !1,
    portrait: !1,
    title: !1
  },
  title: null
}, Ie = a.shape({
  playerOptions: a.shape({
    autopause: a.bool,
    byline: a.bool,
    portrait: a.bool,
    title: a.bool
  }).loose,
  title: a.string
}).loose.def(() => De), je = {
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
}, Me = a.shape({
  attributes: a.object,
  tracks: a.array,
  forceVideo: a.bool,
  forceAudio: a.bool,
  forceHLS: a.bool,
  forceDASH: a.bool,
  forceFLV: a.bool,
  hlsOptions: a.object,
  hlsVersion: a.string,
  dashVersion: a.string,
  flvVersion: a.string
}).loose.def(() => je), Ve = {
  wistia: {
    options: {},
    playerId: null,
    customControls: null
  }
}, Ue = a.shape({
  wistia: a.shape({
    options: a.object,
    playerId: a.string,
    customControls: a.array
  }).loose
}).loose.def(() => Ve), xe = {
  options: {
    hide_cover: 1
  }
}, Ne = a.shape({
  options: a.shape({
    hide_cover: a.integer
  }).loose
}).loose.def(() => xe), Fe = {
  options: {},
  playerId: null
}, He = a.shape({
  options: a.object,
  playerId: a.string
}).loose.def(() => Fe), Ke = {
  options: {}
}, Be = a.shape({
  options: a.object
}).loose.def(() => Ke), X = {
  soundcloud: Le,
  youtube: Te,
  facebook: ke,
  dailymotion: Ce,
  vimeo: De,
  file: je,
  wistia: Ve,
  mixcloud: xe,
  twitch: Fe,
  vidyard: Ke
}, Zt = a.shape({
  soundcloud: Oe,
  youtube: Ee,
  facebook: Re,
  dailymotion: Ae,
  vimeo: Ie,
  file: Me,
  wistia: Ue,
  mixcloud: Ne,
  twitch: He,
  vidyard: Be
}).def(() => X), Jt = a.oneOfType([
  a.object,
  a.string,
  a.func
]), ze = {
  mixins: [v],
  props: {
    config: Zt,
    progressFrequency: a.number,
    activePlayer: Jt
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
const le = /(?:youtu\.be\/|youtube(?:-nocookie)?\.com\/(?:embed\/|v\/|watch\/|watch\?v=|watch\?.+&v=))((\w|-){11})|youtube\.com\/playlist\?list=|youtube\.com\/user\//, Qt = /(?:soundcloud\.com|snd\.sc)\/[^.]+$/, er = /vimeo\.com\/(?!progressive_redirect).+/, tr = /^https?:\/\/(www\.)?facebook\.com.*\/(video(s)?|watch|story)(\.php?|\/).+$/, rr = /^https?:\/\/fb\.watch\/.+$/, Ye = /streamable\.com\/([a-z0-9]+)$/, qe = /(?:wistia\.(?:com|net)|wi\.st)\/(?:medias|embed)\/(?:iframe\/)?(.*)$/, nr = /(?:www\.|go\.)?twitch\.tv\/videos\/(\d+)($|\?)/, Z = /(?:www\.|go\.)?twitch\.tv\/([a-zA-Z0-9_]+)($|\?)/, Ge = /^(?:(?:https?):)?(?:\/\/)?(?:www\.)?(?:(?:dailymotion\.com(?:\/embed)?\/video)|dai\.ly)\/([a-zA-Z0-9]+)(?:_[\w_-]+)?$/, We = /mixcloud\.com\/([^/]+\/[^/]+)/, Xe = /vidyard.com\/(?:watch\/)?([a-zA-Z0-9-_]+)/, sr = /^https?:\/\/[a-zA-Z]+\.kaltura.(com|org)\/p\/([0-9]+)\/sp\/([0-9]+)00\/embedIframeJs\/uiconf_id\/([0-9]+)\/partner_id\/([0-9]+)(.*)entry_id.([a-zA-Z0-9-_]+)$/, U = /\.(m4a|m4b|mp4a|mpga|mp2|mp2a|mp3|m2a|m3a|wav|weba|aac|oga|spx)($|\?)/i, Ze = /\.(mp4|og[gv]|webm|mov|m4v)(#t=[,\d+]+)?($|\?)/i, te = /\.(m3u8)($|\?)/i, Je = /\.(mpd)($|\?)/i, Qe = /\.(flv)($|\?)/i, J = (e) => {
  if (e instanceof Array) {
    for (const t of e)
      if (typeof t == "string" && J(t) || J(t.src))
        return !0;
    return !1;
  }
  return I(e) || Xt(e) ? !0 : U.test(e) || Ze.test(e) || te.test(e) || Je.test(e) || Qe.test(e);
}, h = {
  /**
   * @type {CanPlayUrl}
   */
  youtube: (e) => e instanceof Array ? e.every((t) => le.test(t)) : le.test(e),
  /**
   * @type {CanPlayUrl}
   */
  soundcloud: (e) => Qt.test(e) && !U.test(e),
  /**
   * @type {CanPlayUrl}
   */
  vimeo: (e) => er.test(e) && !Ze.test(e) && !te.test(e),
  /**
   * @type {CanPlayUrl}
   */
  facebook: (e) => tr.test(e) || rr.test(e),
  /**
   * @type {CanPlayUrl}
   */
  streamable: (e) => Ye.test(e),
  /**
   * @type {CanPlayUrl}
   */
  wistia: (e) => qe.test(e),
  /**
   * @type {CanPlayUrl}
   */
  twitch: (e) => nr.test(e) || Z.test(e),
  /**
   * @type {CanPlayUrl}
   */
  dailymotion: (e) => Ge.test(e),
  /**
   * @type {CanPlayUrl}
   */
  mixcloud: (e) => We.test(e),
  /**
   * @type {CanPlayUrl}
   */
  vidyard: (e) => Xe.test(e),
  /**
   * @type {CanPlayUrl}
   */
  kaltura: (e) => sr.test(e),
  /**
   * @type {CanPlayUrl}
   */
  file: J
}, K = [
  /**
   * @type {PlayerDecl<"youtube", "YouTube", import("./components/players/YouTubePlayer.vue").default>}
   */
  {
    key: "youtube",
    name: "YouTube",
    canPlay: h.youtube,
    lazyPlayer: () => Promise.resolve().then(() => $s)
  },
  /**
   * @type {PlayerDecl<"soundcloud", "SoundCloud", import("./components/players/SoundCloudPlayer.vue").default>}
   */
  {
    key: "soundcloud",
    name: "SoundCloud",
    canPlay: h.soundcloud,
    lazyPlayer: () => Promise.resolve().then(() => Ln)
  },
  /**
   * @type {PlayerDecl<"vimeo", "Vimeo", import("./components/players/VimeoPlayer.vue").default>}
   */
  {
    key: "vimeo",
    name: "Vimeo",
    canPlay: h.vimeo,
    lazyPlayer: () => Promise.resolve().then(() => is)
  },
  /**
   * @type {PlayerDecl<"facebook", "Facebook", import("./components/players/FacebookPlayer.vue").default>}
   */
  {
    key: "facebook",
    name: "Facebook",
    canPlay: h.facebook,
    lazyPlayer: () => Promise.resolve().then(() => xr)
  },
  /**
   * @type {PlayerDecl<"streamable", "Streamable", import("./components/players/StreamablePlayer.vue").default>}
   */
  {
    key: "streamable",
    name: "Streamable",
    canPlay: h.streamable,
    lazyPlayer: () => Promise.resolve().then(() => Dn)
  },
  /**
   * @type {PlayerDecl<"wistia", "Wistia", import("./components/players/WistiaPlayer.vue").default>}
   */
  {
    key: "wistia",
    name: "Wistia",
    canPlay: h.wistia,
    lazyPlayer: () => Promise.resolve().then(() => ps)
  },
  /**
   * @type {PlayerDecl<"twitch", "Twitch", import("./components/players/TwitchPlayer.vue").default>}
   */
  {
    key: "twitch",
    name: "Twitch",
    canPlay: h.twitch,
    lazyPlayer: () => Promise.resolve().then(() => Hn)
  },
  /**
   * @type {PlayerDecl<"dailymotion", "DailyMotion", import("./components/players/DailyMotionPlayer.vue").default>}
   */
  {
    key: "dailymotion",
    name: "DailyMotion",
    canPlay: h.dailymotion,
    lazyPlayer: () => Promise.resolve().then(() => Ar)
  },
  /**
   * @type {PlayerDecl<"mixcloud", "Mixcloud", import("./components/players/MixcloudPlayer.vue").default>}
   */
  {
    key: "mixcloud",
    name: "Mixcloud",
    canPlay: h.mixcloud,
    lazyPlayer: () => Promise.resolve().then(() => gn)
  },
  /**
   * @type {PlayerDecl<"vidyard", "Vidyard", import("./components/players/VidyardPlayer.vue").default>}
   */
  {
    key: "vidyard",
    name: "Vidyard",
    canPlay: h.vidyard,
    lazyPlayer: () => Promise.resolve().then(() => Zn)
  },
  /**
   * @type {PlayerDecl<"kaltura", "Kaltura", import("./components/players/KalturaPlayer.vue").default>}
   */
  {
    key: "kaltura",
    name: "Kaltura",
    canPlay: h.kaltura,
    lazyPlayer: () => Promise.resolve().then(() => un)
  },
  /**
   * @type {PlayerDecl<"file", "FilePlayer", import("./components/players/FilePlayer.vue").default>}
   */
  {
    key: "file",
    name: "FilePlayer",
    canPlay: h.file,
    canEnablePIP: (e) => h.file(e) && (document.pictureInPictureEnabled || j()) && !U.test(e),
    lazyPlayer: () => Promise.resolve().then(() => en)
  }
];
var ue = Number.isNaN || function(t) {
  return typeof t == "number" && t !== t;
};
function ir(e, t) {
  return !!(e === t || ue(e) && ue(t));
}
function ar(e, t) {
  if (e.length !== t.length)
    return !1;
  for (var r = 0; r < e.length; r++)
    if (!ir(e[r], t[r]))
      return !1;
  return !0;
}
function ce(e, t) {
  t === void 0 && (t = ar);
  var r = null;
  function n() {
    for (var s = [], i = 0; i < arguments.length; i++)
      s[i] = arguments[i];
    if (r && r.lastThis === this && t(s, r.lastArgs))
      return r.lastResult;
    var l = e.apply(this, s);
    return r = {
      lastResult: l,
      lastArgs: s,
      lastThis: this
    }, l;
  }
  return n.clear = function() {
    r = null;
  }, n;
}
function m(e, t, r, n, s, i, l, c) {
  var o = typeof e == "function" ? e.options : e;
  t && (o.render = t, o.staticRenderFns = r, o._compiled = !0), n && (o.functional = !0), i && (o._scopeId = "data-v-" + i);
  var u;
  if (l ? (u = function(p) {
    p = p || // cached call
    this.$vnode && this.$vnode.ssrContext || // stateful
    this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext, !p && typeof __VUE_SSR_CONTEXT__ < "u" && (p = __VUE_SSR_CONTEXT__), s && s.call(this, p), p && p._registeredComponents && p._registeredComponents.add(l);
  }, o._ssrRegister = u) : s && (u = c ? function() {
    s.call(
      this,
      (o.functional ? this.parent : this).$root.$options.shadowRoot
    );
  } : s), u)
    if (o.functional) {
      o._injectStyles = u;
      var d = o.render;
      o.render = function(g, L) {
        return u.call(L), d(g, L);
      };
    } else {
      var y = o.beforeCreate;
      o.beforeCreate = y ? [].concat(y, u) : [u];
    }
  return {
    exports: e,
    options: o
  };
}
let w = [];
const or = {
  // [META]
  displayName: "VuePlayer",
  /**
   * @template {string} Key
   * @template {string} Name
   * @template {Component} C
   * @param {PlayerDecl<Key, Name, C>} player
   */
  addCustomPlayer(e) {
    w.push(e);
  },
  /**
   * @template {string} Key
   * @template {string} Name
   * @template {Component} C
   * @param {PlayerDecl<Key, Name, C>} player
   */
  removeCustomPlayer(e) {
    w = w.filter((t) => t !== e);
  },
  removeCustomPlayers() {
    w = [];
  },
  canPlay(e) {
    return [...w, ...K].some((t) => t.canPlay(e));
  },
  canEnablePIP(e) {
    return [...w, ...K].some((t) => {
      var r;
      return (r = t.canEnablePIP) == null ? void 0 : r.call(t, e);
    });
  },
  // [/META]
  inheritAttrs: !1,
  mixins: [ze],
  emits: ["click-preview"],
  components: {
    Preview: () => Promise.resolve().then(() => Sr),
    Player: () => Promise.resolve().then(() => gr)
  },
  data() {
    return {
      shouldShowPreview: !!this.light
    };
  },
  mounted() {
    this.getConfig = ce(this.getConfig), this.getActivePlayer = ce(this.getActivePlayer);
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
      return Kt.all([
        X,
        X[t] ?? {},
        this.config ?? {},
        ((r = this.config) == null ? void 0 : r[t]) ?? {}
      ]);
    },
    getActivePlayer(e) {
      return [...w, ...K].find((t) => t.canPlay(e));
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
};
var lr = function() {
  var t = this, r = t._self._c;
  return r(t.wrapper, t._b({ ref: "wrapper", tag: "component" }, "component", t.$attrs, !1), [t.url ? r("span", [t._t("noUrl")], 2) : [t.shouldShowPreview ? r("Preview", t._b({ on: { click: t.handleClickPreview }, scopedSlots: t._u([{ key: "playIcon", fn: function() {
    return [t._t("playIcon")];
  }, proxy: !0 }], null, !0) }, "Preview", t.previewProps, !1)) : r(t.currentPlayer, t._g(t._b({ key: t.playerKey, ref: "player", tag: "component", style: t.playerStyles, attrs: { config: t.playerConfig, activePlayer: t.playerComponent }, on: { ready: t.handleReady }, scopedSlots: t._u([{ key: "none", fn: function() {
    return [t._t("#noPlayer")];
  }, proxy: !0 }], null, !0) }, "component", t.$props, !1), t.$listeners))]], 2);
}, ur = [], cr = /* @__PURE__ */ m(
  or,
  lr,
  ur,
  !1,
  null,
  null,
  null,
  null
);
const Ls = cr.exports, dr = 5e3, hr = {
  mixins: [ze],
  inheritAttrs: !1,
  data() {
    return {
      player: null,
      isReady: !1,
      isPlaying: !1,
      // Track playing state internally to prevent bugs
      isLoading: !0,
      // Use isLoading to prevent onPause when switching URL
      loadOnReady: null,
      startOnPlay: !0,
      seekOnPlay: null,
      onDurationCalled: !1,
      progressTimeout: 0,
      durationCheckTimeout: 0
    };
  },
  computed: {
    playerProps() {
      return {
        ...this.$props,
        ...this.$attrs
      };
    }
  },
  beforeUnmount() {
    var e, t, r, n;
    clearTimeout(this.progressTimeout), clearTimeout(this.durationCheckTimeout), this.isReady && this.stopOnUnmount && ((t = (e = this.player) == null ? void 0 : e.stop) == null || t.call(e), (n = (r = this.player) == null ? void 0 : r.disablePIP) == null || n.call(r));
  },
  watch: {
    playing(e) {
      var t, r, n, s;
      e && !this.isPlaying ? ((r = (t = this.player) == null ? void 0 : t.play) == null || r.call(t), this.isPlaying = !0) : !e && this.isPlaying && ((s = (n = this.player) == null ? void 0 : n.pause) == null || s.call(n), this.isPlaying = !1);
    },
    pictureInPicture(e) {
      var t, r, n, s;
      e ? (r = (t = this.player) == null ? void 0 : t.enablePIP) == null || r.call(t) : (s = (n = this.player) == null ? void 0 : n.disablePIP) == null || s.call(n);
    },
    muted(e) {
      var t, r, n, s;
      e ? (r = (t = this.player) == null ? void 0 : t.mute) == null || r.call(t) : ((s = (n = this.player) == null ? void 0 : n.unmute) == null || s.call(n), this.volume !== null && this.$nextTick(() => {
        var i, l;
        return (l = (i = this.player) == null ? void 0 : i.setVolume) == null ? void 0 : l.call(i, volume);
      }));
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
      return this.isReady ? (t = (e = this.player) == null ? void 0 : e.getDuration) == null ? void 0 : t.call(e) : null;
    },
    /**
     * @inheritDoc
     * @override
     * @playerHook getCurrentTime
     */
    getCurrentTime() {
      var e, t;
      return this.isReady ? (t = (e = this.player) == null ? void 0 : e.getCurrentTime) == null ? void 0 : t.call(e) : null;
    },
    /**
     * @inheritDoc
     * @override
     * @playerHook getSecondsLoaded
     */
    getSecondsLoaded() {
      var e, t;
      return this.isReady ? (t = (e = this.player) == null ? void 0 : e.getSecondsLoaded) == null ? void 0 : t.call(e) : null;
    },
    /**
     * @inheritDoc
     * @override
     * @playerHook getSecondsLoaded
     */
    seekTo(e, t) {
      if (!this.isReady) {
        e !== 0 && (this.seekOnPlay = e, setTimeout(() => {
          this.seekOnPlay = null;
        }, dr));
        return;
      }
      if (t ? t === "fraction" : e > 0 && e < 1) {
        const n = this.player.getDuration();
        if (!n) {
          console.warn("VuePlayer: could not seek using fraction – duration not yet available");
          return;
        }
        this.player.seekTo(n * e);
        return;
      }
      this.player.seekTo(e);
    },
    handlePlayerMount(e) {
      this.player = e, this.player.load(this.url), this.progress();
    },
    getInternalPlayer(e) {
      var t;
      return (t = this.player) == null ? void 0 : t[e];
    },
    progress() {
      if (this.url && this.player && this.isReady) {
        const e = this.getCurrentTime() ?? 0, t = this.getSecondsLoaded(), r = this.getDuration();
        if (r) {
          const n = {
            playedSeconds: e,
            played: e / r
          };
          t !== null && (n.loadedSeconds = t, n.loaded = t / r), (n.playedSeconds !== this.prevPlayed || n.loadedSeconds !== this.prevLoaded) && this.onProgress(n), this.prevPlayed = n.playedSeconds, this.prevLoaded = n.loadedSeconds;
        }
      }
      this.progressTimeout = setTimeout(this.progress, this.progressFrequency ?? this.progressInterval);
    },
    handleReady() {
      if (!this.mounted)
        return;
      this.isReady = !0, this.isLoading = !1;
      const { onReady: e, playing: t, volume: r, muted: n } = this;
      e(), !n && r !== null && this.player.setVolume(r), this.loadOnReady ? (this.player.load(this.loadOnReady, !0), this.loadOnReady = null) : t && this.player.play(), this.handleDurationCheck();
    },
    handlePlay() {
      var n, s;
      this.isPlaying = !0, this.isLoading = !1;
      const { onStart: e, onPlay: t, playbackRate: r } = this;
      this.startOnPlay && (r !== 1 && ((s = (n = this.player) == null ? void 0 : n.setPlaybackRate) == null || s.call(n, r)), e(), this.startOnPlay = !1), t(), this.seekOnPlay && (this.seekTo(this.seekOnPlay), this.seekOnPlay = null), this.handleDurationCheck();
    },
    handlePause(e) {
      this.isPlaying = !1, this.isLoading || this.onPause(e);
    },
    handleEnded() {
      const { activePlayer: e, loop: t, onEnded: r } = this;
      e.loopOnEnded && t && this.seekTo(0), t || (this.isPlaying = !1, r());
    },
    handleError(...e) {
      this.isLoading = !1, this.onError(...e);
    },
    handleDurationCheck() {
      clearTimeout(this.durationCheckTimeout);
      const e = this.getDuration();
      e ? this.onDurationCalled || (this.onDuration(e), this.onDurationCalled = !0) : this.durationCheckTimeout = setTimeout(this.handleDurationCheck, 100);
    },
    handleLoaded() {
      this.isLoading = !1;
    }
  }
};
var yr = function() {
  var t = this, r = t._self._c;
  return t.activePlayer ? r(t.activePlayer, t._g(t._b({ tag: "component", staticClass: "vue-player", on: { mount: t.handlePlayerMount, ready: t.handleReady, play: t.handlePlay, pause: t.handlePause, ended: t.handleEnded, loaded: t.handleLoaded, error: t.handleError } }, "component", t.playerProps, !1), t.$listeners)) : r("span", { staticClass: "vue-player--none" }, [t._t("none")], 2);
}, pr = [], fr = /* @__PURE__ */ m(
  hr,
  yr,
  pr,
  !1,
  null,
  null,
  null,
  null
);
const mr = fr.exports, gr = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: mr
}, Symbol.toStringTag, { value: "Module" })), B = {}, _r = {
  emits: ["click"],
  props: {
    url: a.string.isRequired,
    oEmbedUrl: a.string.isRequired,
    previewTabIndex: a.integer.def(0),
    light: a.any
  },
  data() {
    return {
      image: null,
      mounted: !1
    };
  },
  mounted() {
    this.mounted = !0, this.fetchImage();
  },
  beforeUnmount() {
    this.mounted = !1;
  },
  computed: {
    /**
     * @type {Partial<CSSStyleDeclaration>}
     */
    previewStyles() {
      return this.image ? {
        backgroundImage: `url(${this.image})`
      } : {};
    }
  },
  methods: {
    /**
     * @param {MouseEvent} e
     */
    handleClick(e) {
      this.$emit("click", e);
    },
    /**
     * @param {KeyboardEvent} e
     */
    handleKeyPress(e) {
      (e.key === "Enter" || e.key === " ") && this.$emit("click", e);
    },
    async fetchImage() {
      if (typeof this.light == "string")
        this.image = this.light;
      else if (B[this.url])
        this.image = B[this.url];
      else {
        this.image = null;
        const t = await (await fetch(this.oEmbedUrl.replace("{url}", this.url))).json();
        if (typeof t.thumbnail_url < "u" && this.mounted) {
          const r = t.thumbnail_url.replace("height=100", "height=480");
          this.image = r, B[this.url] = r;
        }
      }
    },
    watch: {
      url: "fetchImage",
      light: "fetchImage"
    }
  }
};
var vr = function() {
  var t = this, r = t._self._c;
  return r("div", { staticClass: "vue-player__preview react-player__preview", style: t.previewStyles, attrs: { tabindex: t.previewTabIndex }, on: { click: t.handleClick, keypress: t.handleKeyPress } }, [t._t("playIcon", function() {
    return [t._m(0)];
  })], 2);
}, Pr = [function() {
  var e = this, t = e._self._c;
  return t("div", { staticClass: "vue-player__shadow react-player__shadow" }, [t("div", { staticClass: "vue-player__play-icon react-player__play-icon" })]);
}], br = /* @__PURE__ */ m(
  _r,
  vr,
  Pr,
  !1,
  null,
  null,
  null,
  null
);
const wr = br.exports, Sr = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: wr
}, Symbol.toStringTag, { value: "Module" })), $r = "https://api.dmcdn.net/all.js", Lr = "DM", Or = "dmAsyncInit", Tr = {
  // [META]
  displayName: "DailyMotion",
  canPlay: h.dailymotion,
  loopOnEnded: !0,
  // [/META]
  mixins: [v],
  props: {
    config: Ae,
    display: a.string.def("block")
  },
  computed: {
    /**
     * @type {Partial<CSSStyleDeclaration>}
     */
    styles() {
      return this.display ? {
        display: this.display
      } : {};
    }
  },
  methods: {
    /**
     * @inheritDoc
     * @override
     * @playerHook play
     */
    play() {
      this.callPlayer("play");
    },
    /**
     * @inheritDoc
     * @override
     * @playerHook pause
     */
    pause() {
      this.callPlayer("pause");
    },
    /**
     * @inheritDoc
     * @override
     * @playerHook seekTo
     */
    seekTo(e) {
      this.callPlayer("seek", e);
    },
    /**
     * @inheritDoc
     * @override
     * @playerHook setVolume
     */
    setVolume(e) {
      this.callPlayer("setVolume", e);
    },
    /**
     * @inheritDoc
     * @override
     * @playerHook mute
     */
    mute() {
      this.callPlayer("setMuted", !0);
    },
    /**
     * @inheritDoc
     * @override
     * @playerHook unmute
     */
    unmute() {
      this.callPlayer("setMuted", !1);
    },
    /**
     * @inheritDoc
     * @override
     * @playerHook getDuration
     */
    getDuration() {
      var e;
      return ((e = this.player) == null ? void 0 : e.duration) || null;
    },
    /**
     * @inheritDoc
     * @override
     * @playerHook getCurrentTime
     */
    getCurrentTime() {
      var e;
      return (e = this.player) == null ? void 0 : e.currentTime;
    },
    /**
     * @inheritDoc
     * @override
     * @playerHook getSecondsLoaded
     */
    getSecondsLoaded() {
      var e;
      return (e = this.player) == null ? void 0 : e.bufferedTime;
    },
    async load(e) {
      const { controls: t, config: r, playing: n } = this, [, s] = e.match(Ge);
      if (this.player) {
        this.player.load(s, {
          start: D(e),
          autoplay: n
        });
        return;
      }
      try {
        const i = await b($r, Lr, Or, (c) => c.player);
        if (!this.$refs.container)
          return;
        const l = i.player;
        this.player = new l(this.$refs.container, {
          width: "100%",
          height: "100%",
          video: s,
          params: {
            controls: t,
            autoplay: this.playing,
            mute: this.muted,
            start: D(e),
            origin: window.location.origin,
            ...r.params
          },
          events: {
            apiready: this.onReady,
            seeked: () => this.onSeek(this.player.currentTime),
            video_end: this.onEnded,
            durationchange: this.onDurationChange,
            pause: this.onPause,
            playing: this.onPlay,
            waiting: this.onBuffer,
            error: this.onError
          }
        });
      } catch (i) {
        this.onError(i);
      }
    },
    onDurationChange() {
      const e = this.getDuration();
      this.onDuration(e);
    }
  }
};
var Er = function() {
  var t = this, r = t._self._c;
  return r("div", { staticClass: "vue-player--dailymotion", style: t.styles }, [r("div", { ref: "container" })]);
}, kr = [], Rr = /* @__PURE__ */ m(
  Tr,
  Er,
  kr,
  !1,
  null,
  null,
  null,
  null
);
const Cr = Rr.exports, Ar = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Cr
}, Symbol.toStringTag, { value: "Module" })), de = "https://connect.facebook.net/en_US/sdk.js", he = "FB", ye = "fbAsyncInit", Dr = "facebook-player-", Ir = {
  // [META]
  displayName: "Facebook",
  canPlay: h.facebook,
  loopOnEnabled: !0,
  // [/META]
  events: ["loaded"],
  mixins: [v],
  props: {
    config: Re
  },
  data() {
    return {
      randomId: `${Dr}${ee()}`
    };
  },
  computed: {
    /**
     * @type {string}
     */
    playerID() {
      var e;
      return ((e = this == null ? void 0 : this.config) == null ? void 0 : e.playerId) ?? this.randomId;
    }
  },
  methods: {
    /**
     * @inheritDoc
     * @override
     * @playerHook play
     */
    play() {
      this.callPlayer("play");
    },
    /**
     * @inheritDoc
     * @override
     * @playerHook pause
     */
    pause() {
      this.callPlayer("pause");
    },
    /**
     * @inheritDoc
     * @override
     * @playerHook seekTo
     */
    seekTo(e) {
      this.callPlayer("seek", e);
    },
    /**
     * @inheritDoc
     * @override
     * @playerHook setVolume
     */
    setVolume(e) {
      this.callPlayer("setVolume", e);
    },
    /**
     * @inheritDoc
     * @override
     * @playerHook mute
     */
    mute() {
      this.callPlayer("mute");
    },
    /**
     * @inheritDoc
     * @override
     * @playerHook unmute
     */
    unmute() {
      this.callPlayer("unmute");
    },
    /**
     * @inheritDoc
     * @override
     * @playerHook getDuration
     */
    getDuration() {
      return this.callPlayer("getDuration");
    },
    /**
     * @inheritDoc
     * @override
     * @playerHook getCurrentTime
     */
    getCurrentTime() {
      return this.callPlayer("getCurrentTime");
    },
    /**
     * @inheritDoc
     * @override
     * @playerHook getSecondsLoaded
     */
    getSecondsLoaded() {
      return null;
    },
    async load(e, t) {
      var n, s;
      if (t) {
        const i = await b(de, he, ye);
        (s = (n = i == null ? void 0 : i.XFBML) == null ? void 0 : n.parse) == null || s.call(n);
        return;
      }
      const r = await b(de, he, ye);
      r.init({
        appId: this.config.appId,
        xfbml: !0,
        version: this.config.version
      }), r.Event.subscribe("xfbml.render", (i) => {
        this.onLoaded();
      }), r.Event.subscribe("xfbml.ready", (i) => {
        i.type === "video" && i.id === this.playerID && (this.player = i.instance, this.player.subscribe("startedPlaying", this.onPlay), this.player.subscribe("paused", this.onPause), this.player.subscribe("finishedPlaying", this.onEnded), this.player.subscribe("startedBuffering", this.onBuffer), this.player.subscribe("finishedBuffering", this.onBufferEnd), this.player.subscribe("error", this.onError), this.muted ? this.mute() : this.unmute(), this.onReady(), document.getElementById(this.playerID).querySelector("iframe").style.visibility = "visible");
      });
    },
    onLoaded(...e) {
      this.$emit("loaded", ...e);
    }
  }
};
var jr = function() {
  var t = this, r = t._self._c;
  return r("div", t._b({ staticClass: "fb-video vue-player--facebook", attrs: { id: this.playerID, "data-href": this.url, "data-autoplay": this.playing ? "true" : "false", "data-controls": this.controls ? "true" : "false", "data-allowfullscreen": "true" } }, "div", t.config.attributes, !1));
}, Mr = [], Vr = /* @__PURE__ */ m(
  Ir,
  jr,
  Mr,
  !1,
  null,
  null,
  null,
  null
);
const Ur = Vr.exports, xr = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Ur
}, Symbol.toStringTag, { value: "Module" })), et = typeof navigator < "u", Nr = et && navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1, pe = et && (/iPad|iPhone|iPod/.test(navigator.userAgent) || Nr) && !window.MSStream, Fr = "https://cdn.jsdelivr.net/npm/hls.js@VERSION/dist/hls.min.js", Hr = "Hls", Kr = "https://cdnjs.cloudflare.com/ajax/libs/dashjs/VERSION/dash.all.min.js", Br = "dashjs", zr = "https://cdn.jsdelivr.net/npm/flv.js@VERSION/dist/flv.min.js", Yr = "flvjs", qr = /www\.dropbox\.com\/.+/, z = /https:\/\/watch\.cloudflarestream\.com\/([a-z0-9]+)/, Gr = "https://videodelivery.net/{id}/manifest/video.m3u8", Wr = {
  // [META]
  displayName: "FilePlayer",
  canPlay: h.file,
  // [/META]
  mixins: [v],
  props: {
    config: Me
  },
  data() {
    return {
      /**
       * @type {HTMLElement|null}
       */
      prevPlayer: this.$refs.player ?? null,
      /**
       * @type {string}
       */
      prevUrl: this.url
    };
  },
  computed: {
    urlIsArray() {
      return Array.isArray(this.url);
    },
    hasTracks() {
      var t;
      const e = ((t = this.config) == null ? void 0 : t.tracks) ?? [];
      return Array.isArray(e) && e.length > 0;
    },
    tag() {
      return this.shouldUseAudio ? "audio" : "video";
    },
    shouldUseAudio() {
      var e;
      return (e = this.config) != null && e.forceVideo || this.config.attributes.poster ? !1 : U.test(this.url) || this.config.forceAudio;
    },
    styles() {
      return {
        width: this.width === "auto" ? this.width : "100%",
        height: this.height === "auto" ? this.height : "100%"
      };
    },
    src() {
      return this.getSource(this.url);
    }
  },
  mounted() {
    var e, t;
    this.addListeners(this.$refs.player), pe && ((t = (e = this.$refs.player) == null ? void 0 : e.load) == null || t.call(e)), this.$watch(
      () => this.$refs.player,
      (r, n) => {
        this.prevPlayer = n;
      }
    );
  },
  beforeUnmount() {
    var e, t;
    this.prevPlayer = null, this.removeListeners(this.$refs.player), (t = (e = this.hls) == null ? void 0 : e.destroy) == null || t.call(e);
  },
  watch: {
    url(e, t) {
      this.prevUrl = t, !I(e) && this.$refs.player && (this.$refs.player.srcObject = null);
    },
    shouldUseAudio() {
      this.removeListeners(this.prevPlayer, this.prevUrl), this.addListeners(this.$refs.player);
    }
  },
  methods: {
    /**
     * @inheritDoc
     * @override
     * @playerHook onDisablePIP
     */
    onDisablePIP(...e) {
      this.$emit("disable-pip", ...e), this.playing && this.play();
    },
    /**
     * @inheritDoc
     * @override
     * @playerHook onSeek
     */
    onSeek(e) {
      this.$emit("seek", e.target.currentTime);
    },
    /**
     * @inheritDoc
     * @override
     * @playerHook play
     */
    play() {
      var t, r;
      const e = (r = (t = this.$refs.player).play) == null ? void 0 : r.call(t);
      e && e.catch(this.onError);
    },
    /**
     * @inheritDoc
     * @override
     * @playerHook pause
     */
    pause() {
      var e, t;
      (t = (e = this.$refs.player).pause) == null || t.call(e);
    },
    /**
     * @inheritDoc
     * @override
     * @playerHook stop
     */
    stop() {
      var e, t, r, n;
      (t = (e = this.$refs.player) == null ? void 0 : e.removeAttribute) == null || t.call(e, "src"), (n = (r = this.dash) == null ? void 0 : r.reset) == null || n.call(r);
    },
    /**
     * @inheritDoc
     * @override
     * @playerHook seekTo
     */
    seekTo(e) {
      this.player.currentTime = e;
    },
    /**
     * @inheritDoc
     * @override
     * @playerHook setVolume
     */
    setVolume(e) {
      this.player.volume = e;
    },
    /**
     * @inheritDoc
     * @override
     * @playerHook mute
     */
    mute() {
      this.player.muted = !0;
    },
    /**
     * @inheritDoc
     * @override
     * @playerHook unmute
     */
    unmute() {
      this.player.muted = !1;
    },
    /**
     * @inheritDoc
     * @override
     * @playerHook getDuration
     */
    getDuration() {
      if (!this.$refs.player)
        return null;
      const { duration: e, seekable: t } = this.$refs.player;
      return e === 1 / 0 && t.length > 0 ? t.end(t.length - 1) : e;
    },
    /**
     * @inheritDoc
     * @override
     * @playerHook getCurrentTime
     */
    getCurrentTime() {
      var e;
      return (e = this.$refs.player) == null ? void 0 : e.currentTime;
    },
    /**
     * @inheritDoc
     * @override
     * @playerHook getSecondsLoaded
     */
    getSecondsLoaded() {
      if (!this.$refs.player)
        return null;
      const { buffered: e } = this.$refs.player;
      if (e.length === 0)
        return 0;
      const t = e.end(e.length - 1), r = this.getDuration();
      return t > r ? r : t;
    },
    /**
     * @inheritDoc
     * @override
     * @playerHook setPlaybackRate
     */
    setPlaybackRate(e) {
      try {
        this.$refs.player.playbackRate = e;
      } catch (t) {
        this.onError(t);
      }
    },
    /**
     * @inheritDoc
     * @override
     * @playerHook enablePIP
     */
    enablePIP() {
      var e, t, r, n, s, i;
      (e = this.$refs.player) != null && e.requestPictureInPicture && document.pictureInPictureElement !== this.$refs.player ? ((r = (t = this.$refs.player) == null ? void 0 : t.requestPictureInPicture) == null || r.call(t), this.onEnablePIP()) : j(this.$refs.player) && ((n = this.$refs.player) == null ? void 0 : n.webkitPresentationMode) !== "picture-in-picture" && ((i = (s = this.$refs.player) == null ? void 0 : s.webkitSetPresentationMode) == null || i.call(s, "picture-in-picture"), this.onEnablePIP());
    },
    /**
     * @inheritDoc
     * @override
     * @playerHook disablePIP
     */
    disablePIP() {
      var e, t, r;
      document.exitPictureInPicture && document.pictureInPictureElement === this.$refs.player ? (document.exitPictureInPicture(), this.onDisablePIP()) : j(this.$refs.player) && ((e = this.$refs.player) == null ? void 0 : e.webkitPresentationMode) !== "inline" && ((r = (t = this.$refs.player) == null ? void 0 : t.webkitSetPresentationMode) == null || r.call(t, "inline"), this.onDisablePIP());
    },
    async load(e) {
      var i, l, c, o, u, d;
      const { hlsVersion: t, hlsOptions: r, dashVersion: n, flvVersion: s } = this.config;
      if ((l = (i = this.hls) == null ? void 0 : i.destroy) == null || l.call(i), (o = (c = this.dash) == null ? void 0 : c.reset) == null || o.call(c), this.shouldUseHLS(e)) {
        const y = await getSDK(Fr.replace("VERSION", t), Hr);
        if (this.hls = new y(r), this.hls.on(y.Events.MANIFEST_PARSED, () => {
          this.onReady();
        }), this.hls.on(y.Events.ERROR, (p, g) => {
          this.onError(p, g, this.hls, y);
        }), z.test(e)) {
          const p = e.match(z)[1];
          this.hls.loadSource(Gr.replace("{id}", p));
        } else
          this.hls.loadSource(e);
        this.hls.attachMedia(this.$refs.player), this.onLoaded();
      } else if (this.shouldUseDASH(e)) {
        const y = await getSDK(Kr.replace("VERSION", n), Br);
        this.dash = y.MediaPlayer().create(), this.dash.initialize(this.$refs.player, e, this.playing), this.dash.on("error", this.onError), parseInt(n) < 3 ? this.dash.getDebug().setLogToBrowserConsole(!1) : this.dash.updateSettings({ debug: { logLevel: y.Debug.LOG_LEVEL_NONE } }), this.onLoaded();
      } else if (this.shouldUseFLV(e)) {
        const y = await getSDK(zr.replace("VERSION", s), Yr);
        this.flv = y.createPlayer({ type: "flv", url: e }), this.flv.attachMediaElement(this.$refs.player), this.flv.load(), this.onLoaded();
      }
      if (e instanceof Array)
        (d = (u = this.$refs.player) == null ? void 0 : u.load) == null || d.call(u);
      else if (I(e))
        try {
          this.$refs.player.srcObject = e;
        } catch {
          this.$refs.player.src = URL.createObjectURL(e);
        }
    },
    getSource(e) {
      const t = this.shouldUseHLS(e), r = this.shouldUseDASH(e), n = this.shouldUseFLV(e);
      if (!(e instanceof Array || I(e) || t || r || n))
        return qr.test(e) ? e.replace("www.dropbox.com", "dl.dropboxusercontent.com") : e;
    },
    onPresentationModeChange(e) {
      if (this.$refs.player && j(this.$refs.player)) {
        const { webkitPresentationMode: t } = this.$refs.player;
        t === "picture-in-picture" ? this.onEnablePIP(e) : t === "inline" && this.onDisablePIP(e);
      }
    },
    addListeners(e) {
      const { url: t, playsInline: r } = this;
      e.addEventListener("play", this.onPlay), e.addEventListener("waiting", this.onBuffer), e.addEventListener("playing", this.onBufferEnd), e.addEventListener("pause", this.onPause), e.addEventListener("seeked", this.onSeek), e.addEventListener("ended", this.onEnded), e.addEventListener("error", this.onError), e.addEventListener("ratechange", this.onPlaybackRateChange), e.addEventListener("enterpictureinpicture", this.onEnablePIP), e.addEventListener("leavepictureinpicture", this.onDisablePIP), e.addEventListener("webkitpresentationmodechanged", this.onPresentationModeChange), this.shouldUseHLS(t) || e.addEventListener("canplay", this.onReady), r && (e.setAttribute("playsinline", ""), e.setAttribute("webkit-playsinline", ""), e.setAttribute("x5-playsinline", ""));
    },
    removeListeners(e, t) {
      e.removeEventListener("canplay", this.onReady), e.removeEventListener("play", this.onPlay), e.removeEventListener("waiting", this.onBuffer), e.removeEventListener("playing", this.onBufferEnd), e.removeEventListener("pause", this.onPause), e.removeEventListener("seeked", this.onSeek), e.removeEventListener("ended", this.onEnded), e.removeEventListener("error", this.onError), e.removeEventListener("ratechange", this.onPlaybackRateChange), e.removeEventListener("enterpictureinpicture", this.onEnablePIP), e.removeEventListener("leavepictureinpicture", this.onDisablePIP), e.removeEventListener("webkitpresentationmodechanged", this.onPresentationModeChange), this.shouldUseHLS(t) || e.removeEventListener("canplay", this.onReady);
    },
    shouldUseHLS(e) {
      var t;
      return (t = this.config) != null && t.forceHLS ? !0 : pe ? !1 : te.test(e) || z.test(e);
    },
    shouldUseDASH(e) {
      return Je.test(e) || this.props.config.forceDASH;
    },
    shouldUseFLV(e) {
      return Qe.test(e) || this.props.config.forceFLV;
    }
  }
};
var Xr = function() {
  var t = this, r = t._self._c;
  return r(t.tag, t._b({ ref: "player", tag: "component", staticClass: "vue-player--file", style: t.styles, attrs: { preload: "auto", src: t.src, autoplay: t.playing, controls: t.controls, muted: t.muted, loop: t.loop } }, "component", t.config.attributes, !1), [t.urlIsArray ? [t._l(this.url, function(n, s) {
    return [t._t("source", function() {
      return [typeof n == "string" ? r("source", { key: n, attrs: { src: n } }) : r("source", t._b({ key: s }, "source", n, !1))];
    }, null, { source: n })];
  }), t._l(this.config.tracks, function(n, s) {
    return [t._t("track", function() {
      return [r("track", t._b({ key: s }, "track", n, !1))];
    }, null, { track: n })];
  })] : t._e()], 2);
}, Zr = [], Jr = /* @__PURE__ */ m(
  Wr,
  Xr,
  Zr,
  !1,
  null,
  null,
  null,
  null
);
const Qr = Jr.exports, en = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Qr
}, Symbol.toStringTag, { value: "Module" })), tn = "https://cdn.embed.ly/player-0.1.0.min.js", rn = "playerjs", nn = {
  // [META]
  displayName: "Kaltura",
  canPlay: h.kaltura,
  // [/META]
  mixins: [v],
  data() {
    return {
      duration: null,
      currentTime: null,
      secondsLoaded: null
    };
  },
  methods: {
    /**
     * @inheritDoc
     * @override
     * @playerHook play
     */
    play() {
      this.callPlayer("play");
    },
    /**
     * @inheritDoc
     * @override
     * @playerHook pause
     */
    pause() {
      this.callPlayer("pause");
    },
    /**
     * @inheritDoc
     * @override
     * @playerHook seekTo
     */
    seekTo(e) {
      this.callPlayer("setCurrentTime", e);
    },
    /**
     * @inheritDoc
     * @override
     * @playerHook setVolume
     */
    setVolume(e) {
      this.callPlayer("setVolume", e);
    },
    /**
     * @inheritDoc
     * @override
     * @playerHook setLoop
     */
    setLoop(e) {
      this.callPlayer("setLoop", e);
    },
    /**
     * @inheritDoc
     * @override
     * @playerHook mute
     */
    mute() {
      this.callPlayer("mute");
    },
    /**
     * @inheritDoc
     * @override
     * @playerHook unmute
     */
    unmute() {
      this.callPlayer("unmute");
    },
    /**
     * @inheritDoc
     * @override
     * @playerHook getDuration
     */
    getDuration() {
      return this.duration;
    },
    /**
     * @inheritDoc
     * @override
     * @playerHook getCurrentTime
     */
    getCurrentTime() {
      return this.currentTime;
    },
    /**
     * @inheritDoc
     * @override
     * @playerHook getSecondsLoaded
     */
    getSecondsLoaded() {
      return this.secondsLoaded;
    },
    async load(e) {
      try {
        const t = await b(tn, rn);
        if (!this.$refs.iframe)
          return;
        this.player = new t.Player(this.$refs.iframe), this.player.on("ready", () => {
          setTimeout(() => {
            this.player.isReady = !0, this.player.setLoop(this.loop), this.muted && this.player.mute(), this.addListeners(this.player), this.onReady();
          }, 500);
        });
      } catch (t) {
        this.onError(t);
      }
    },
    addListeners(e) {
      e.on("play", this.onPlay), e.on("pause", this.onPause), e.on("ended", this.onEnded), e.on("error", this.onError), e.on("timeupdate", ({ duration: t, seconds: r }) => {
        const n = this.duration !== t;
        this.duration = t, this.currentTime = r, n && this.onDuration(t), this.onSeek(r);
      });
    }
  }
};
var sn = function() {
  var t = this, r = t._self._c;
  return r("iframe", { ref: "iframe", staticClass: "vue-player--kaltura", attrs: { src: t.url, frameborder: "0", scrolling: "no", allowfullscreen: "", allow: "encrypted-media;autoplay", referrerpolicy: "no-referrer-when-downgrade" } });
}, an = [], on = /* @__PURE__ */ m(
  nn,
  sn,
  an,
  !1,
  null,
  null,
  null,
  null
);
const ln = on.exports, un = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: ln
}, Symbol.toStringTag, { value: "Module" })), cn = "https://widget.mixcloud.com/media/js/widgetApi.js", dn = "Mixcloud", hn = {
  // [META]
  displayName: "Mixcloud",
  canPlay: h.mixcloud,
  // [/META]
  mixins: [v],
  props: {
    config: Ne
  },
  data() {
    return {
      duration: null,
      currentTime: null,
      secondsLoaded: null
    };
  },
  computed: {
    /**
     * @type {string}
     */
    id() {
      return this.url.match(We)[1];
    },
    /**
     * @type {string}
     */
    query() {
      return Gt({
        ...this.config.options,
        feed: `/${this.id}/`
      });
    },
    /**
     * @type {string}
     */
    src() {
      return `https://www.mixcloud.com/widget/iframe/?${this.query}`;
    }
  },
  methods: {
    /**
     * @inheritDoc
     * @override
     * @playerHook play
     */
    play() {
      this.callPlayer("play");
    },
    /**
     * @inheritDoc
     * @override
     * @playerHook pause
     */
    pause() {
      this.callPlayer("pause");
    },
    /**
     * @inheritDoc
     * @override
     * @playerHook seekTo
     */
    seekTo(e) {
      this.callPlayer("seek", e);
    },
    /**
     * @inheritDoc
     * @override
     * @playerHook getDuration
     */
    getDuration() {
      return this.duration;
    },
    /**
     * @inheritDoc
     * @override
     * @playerHook getCurrentTime
     */
    getCurrentTime() {
      return this.currentTime;
    },
    /**
     * @inheritDoc
     * @override
     * @playerHook getSecondsLoaded
     */
    getSecondsLoaded() {
      return this.secondsLoaded;
    },
    async load(e) {
      try {
        const t = await b(cn, dn);
        this.player = t.PlayerWidget(this.$refs.iframe), this.player.ready.then(() => {
          this.player.events.play.on(this.onPlay), this.player.events.pause.on(this.onPause), this.player.events.ended.on(this.onEnded), this.player.events.error.on(this.onError), this.player.events.progress.on((r, n) => {
            this.currentTime = r, this.duration = n;
          }), this.onReady();
        });
      } catch (t) {
        this.onError(t);
      }
    }
  }
};
var yn = function() {
  var t = this, r = t._self._c;
  return r("iframe", { key: t.id, ref: "iframe", staticClass: "vue-player--mixcloud", attrs: { src: t.src, frameborder: "0" } });
}, pn = [], fn = /* @__PURE__ */ m(
  hn,
  yn,
  pn,
  !1,
  null,
  null,
  null,
  null
);
const mn = fn.exports, gn = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: mn
}, Symbol.toStringTag, { value: "Module" })), _n = "https://w.soundcloud.com/player/api.js", vn = "SC", Pn = {
  // [META]
  displayName: "Soundcloud",
  canPlay: h.soundcloud,
  loopOnEnded: !0,
  // [/META]
  mixins: [v],
  props: {
    config: Oe,
    display: a.string.def("block")
  },
  data() {
    return {
      duration: null,
      currentTime: null,
      fractionLoaded: null
    };
  },
  computed: {
    styles() {
      return {
        display: this.display,
        width: "100%",
        height: "100%"
      };
    },
    src() {
      return `https://w.soundcloud.com/player/?url=${encodeURIComponent(this.url)}`;
    }
  },
  methods: {
    /**
     * @inheritDoc
     * @override
     * @playerHook play
     */
    play() {
      this.callPlayer("play");
    },
    /**
     * @inheritDoc
     * @override
     * @playerHook pause
     */
    pause() {
      this.callPlayer("pause");
    },
    /**
     * @inheritDoc
     * @override
     * @playerHook seekTo
     */
    seekTo(e) {
      this.callPlayer("seekTo", e * 1e3);
    },
    /**
     * @inheritDoc
     * @override
     * @playerHook setVolume
     */
    setVolume(e) {
      this.callPlayer("setVolume", e * 100);
    },
    /**
     * @inheritDoc
     * @override
     * @playerHook mute
     */
    mute() {
      this.setVolume(0);
    },
    /**
     * @inheritDoc
     * @override
     * @playerHook unmute
     */
    unmute() {
      this.volume !== null && this.setVolume(this.volume);
    },
    /**
     * @inheritDoc
     * @override
     * @playerHook getDuration
     */
    getDuration() {
      return this.duration;
    },
    /**
     * @inheritDoc
     * @override
     * @playerHook getCurrentTime
     */
    getCurrentTime() {
      return this.currentTime;
    },
    /**
     * @inheritDoc
     * @override
     * @playerHook getSecondsLoaded
     */
    getSecondsLoaded() {
      return this.fractionLoaded * this.duration;
    },
    async load(e, t) {
      try {
        const r = await b(_n, vn);
        if (!this.iframe)
          return;
        const { PLAY: n, PLAY_PROGRESS: s, PAUSE: i, FINISH: l, ERROR: c } = r.Widget.Events;
        t || (this.player = r.Widget(this.$refs.iframe), this.player.bind(n, this.onPlay), this.player.bind(i, () => {
          this.duration - this.currentTime < 0.05 || this.onPause();
        }), this.player.bind(s, (o) => {
          this.currentTime = o.currentPosition / 1e3, this.fractionLoaded = o.loadedProgress;
        }), this.player.bind(l, this.onEnded), this.player.bind(c, this.onError)), this.player.load(e, {
          ...this.config.options,
          callback: () => {
            this.player.getDuration((o) => {
              this.duration = o / 1e3, this.onReady();
            });
          }
        });
      } catch (r) {
        this.onError(r);
      }
    }
  }
};
var bn = function() {
  var t = this, r = t._self._c;
  return r("iframe", { ref: "iframe", staticClass: "vue-player--soundcloud", style: t.styles, attrs: { src: t.src, frameborder: "0", allow: "autoplay" } });
}, wn = [], Sn = /* @__PURE__ */ m(
  Pn,
  bn,
  wn,
  !1,
  null,
  null,
  null,
  null
);
const $n = Sn.exports, Ln = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: $n
}, Symbol.toStringTag, { value: "Module" })), On = "https://cdn.embed.ly/player-0.1.0.min.js", Tn = "playerjs", En = {
  // [META]
  displayName: "Streamable",
  canPlay: h.streamable,
  // [/META]
  mixins: [v],
  data() {
    return {
      duration: null,
      currentTime: null,
      secondsLoaded: null
    };
  },
  computed: {
    /**
     * @type {string}
     */
    id() {
      return this.url.match(Ye)[1];
    },
    /**
     * @type {string}
     */
    src() {
      return `https://streamable.com/o/${this.id}`;
    }
  },
  methods: {
    /**
     * @inheritDoc
     * @override
     * @playerHook play
     */
    play() {
      this.callPlayer("play");
    },
    /**
     * @inheritDoc
     * @override
     * @playerHook pause
     */
    pause() {
      this.callPlayer("pause");
    },
    /**
     * @inheritDoc
     * @override
     * @playerHook seekTo
     */
    seekTo(e) {
      this.callPlayer("setCurrentTime", e);
    },
    /**
     * @inheritDoc
     * @override
     * @playerHook setVolume
     */
    setVolume(e) {
      this.callPlayer("setVolume", e * 100);
    },
    /**
     * @inheritDoc
     * @override
     * @playerHook setLoop
     */
    setLoop(e) {
      this.callPlayer("setLoop", e);
    },
    /**
     * @inheritDoc
     * @override
     * @playerHook mute
     */
    mute() {
      this.callPlayer("mute");
    },
    /**
     * @inheritDoc
     * @override
     * @playerHook unmute
     */
    unmute() {
      this.callPlayer("unmute");
    },
    /**
     * @inheritDoc
     * @override
     * @playerHook getDuration
     */
    getDuration() {
      return this.duration;
    },
    /**
     * @inheritDoc
     * @override
     * @playerHook getCurrentTime
     */
    getCurrentTime() {
      return this.currentTime;
    },
    /**
     * @inheritDoc
     * @override
     * @playerHook getSecondsLoaded
     */
    getSecondsLoaded() {
      return this.secondsLoaded;
    },
    async load(e) {
      try {
        const t = await getSDK(On, Tn);
        if (!this.iframe)
          return;
        this.player = new t.Player(this.$refs.iframe), this.player.setLoop(this.loop), this.player.on("ready", this.onReady), this.player.on("play", this.onPlay), this.player.on("pause", this.onPause), this.player.on("seeked", this.onSeek), this.player.on("ended", this.onEnded), this.player.on("error", this.onError), this.player.on("timeupdate", ({ duration: r, seconds: n }) => {
          this.duration = r, this.currentTime = n;
        }), this.player.on("buffered", ({ percent: r }) => {
          this.duration && (this.secondsLoaded = this.duration * r);
        }), this.muted && this.player.mute();
      } catch (t) {
        this.onError(t);
      }
    }
  }
};
var kn = function() {
  var t = this, r = t._self._c;
  return r("iframe", { ref: "iframe", staticClass: "vue-player--streamable", attrs: { src: t.src, frameborder: "0", scrolling: "no", allowfullscreen: "" } });
}, Rn = [], Cn = /* @__PURE__ */ m(
  En,
  kn,
  Rn,
  !1,
  null,
  null,
  null,
  null
);
const An = Cn.exports, Dn = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: An
}, Symbol.toStringTag, { value: "Module" })), In = "https://player.twitch.tv/js/embed/v1.js", jn = "Twitch", Mn = "twitch-player-", Vn = {
  // [META]
  displayName: "Twitch",
  canPlay: h.twitch,
  loopOnEnded: !0,
  // [/META]
  mixins: [v],
  props: {
    config: He
  },
  data() {
    return {
      randomId: `${Mn}${ee()}`
    };
  },
  computed: {
    pid() {
      return this.config.playerId ?? this.randomId;
    }
  },
  methods: {
    /**
     * @inheritDoc
     * @override
     * @playerHook play
     */
    play() {
      this.callPlayer("play");
    },
    /**
     * @inheritDoc
     * @override
     * @playerHook pause
     */
    pause() {
      this.callPlayer("pause");
    },
    /**
     * @inheritDoc
     * @override
     * @playerHook stop
     */
    stop() {
      this.callPlayer("pause");
    },
    /**
     * @inheritDoc
     * @override
     * @playerHook seekTo
     */
    seekTo(e) {
      this.callPlayer("seek", e);
    },
    /**
     * @inheritDoc
     * @override
     * @playerHook setVolume
     */
    setVolume(e) {
      this.callPlayer("setVolume", e);
    },
    /**
     * @inheritDoc
     * @override
     * @playerHook unmute
     */
    unmute() {
      this.callPlayer("setMuted", !1);
    },
    /**
     * @inheritDoc
     * @override
     * @playerHook getDuration
     */
    getDuration() {
      return this.callPlayer("getDuration");
    },
    /**
     * @inheritDoc
     * @override
     * @playerHook getCurrentTime
     */
    getCurrentTime() {
      return this.callPlayer("getCurrentTime");
    },
    /**
     * @inheritDoc
     * @override
     * @playerHook getSecondsLoaded
     */
    getSecondsLoaded() {
      return null;
    },
    async load(e, t) {
      var r, n, s, i;
      try {
        const { playsinline: l, config: c, controls: o } = this, u = Z.test(e), d = u ? e.match(Z)[1] : e.match(MATCH_URL_TWITCH_VIDEO)[1];
        if (t) {
          u ? (n = (r = this.player) == null ? void 0 : r.setChannel) == null || n.call(r, d) : (i = (s = this.player) == null ? void 0 : s.setVideo) == null || i.call(s, "v" + d);
          return;
        }
        const y = await getSDK(In, jn);
        this.player = new y.Player(this.pid, {
          video: u ? "" : d,
          channel: u ? d : "",
          height: "100%",
          width: "100%",
          playsinline: l,
          autoplay: this.playing,
          muted: this.muted,
          // https://github.com/CookPete/react-player/issues/733#issuecomment-549085859
          controls: u ? !0 : o,
          time: D(e),
          ...c.options
        });
        const { READY: p, PLAYING: g, PAUSE: L, ENDED: x, ONLINE: N, OFFLINE: F, SEEK: tt } = y.Player;
        this.player.addEventListener(p, this.onReady), this.player.addEventListener(g, this.onPlay), this.player.addEventListener(L, this.onPause), this.player.addEventListener(x, this.onEnded), this.player.addEventListener(tt, this.onSeek), this.player.addEventListener(N, this.onLoaded), this.player.addEventListener(F, this.onLoaded);
      } catch (l) {
        this.onError(l);
      }
    }
  }
};
var Un = function() {
  var t = this, r = t._self._c;
  return r("div", { staticClass: "vue-player--twitch", attrs: { id: t.pid } });
}, xn = [], Nn = /* @__PURE__ */ m(
  Vn,
  Un,
  xn,
  !1,
  null,
  null,
  null,
  null
);
const Fn = Nn.exports, Hn = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Fn
}, Symbol.toStringTag, { value: "Module" })), Kn = "https://play.vidyard.com/embed/v4.js", Bn = "VidyardV4", zn = "onVidyardAPI", Yn = {
  // [META]
  displayName: "Vidyard",
  canPlay: h.vidyard,
  // [/META]
  mixins: [v],
  props: {
    config: Be,
    display: a.string.def("block")
  },
  computed: {
    styles() {
      return {
        display: this.display,
        width: "100%",
        height: "100%"
      };
    }
  },
  methods: {
    /**
     * @inheritDoc
     * @override
     * @playerHook play
     */
    play() {
      this.callPlayer("play");
    },
    /**
     * @inheritDoc
     * @override
     * @playerHook pause
     */
    pause() {
      this.callPlayer("pause");
    },
    /**
     * @inheritDoc
     * @override
     * @playerHook stop
     */
    stop() {
      var e, t, r;
      (r = (t = (e = window.VidyardV4) == null ? void 0 : e.api) == null ? void 0 : t.destroyPlayer) == null || r.call(t, this.player);
    },
    /**
     * @inheritDoc
     * @override
     * @playerHook seekTo
     */
    seekTo(e) {
      this.callPlayer("seek", e);
    },
    /**
     * @inheritDoc
     * @override
     * @playerHook setVolume
     */
    setVolume(e) {
      this.callPlayer("setVolume", e);
    },
    /**
     * @inheritDoc
     * @override
     * @playerHook mute
     */
    mute() {
      this.setVolume(0);
    },
    /**
     * @inheritDoc
     * @override
     * @playerHook unmute
     */
    unmute() {
      this.volume && this.setVolume(this.volume);
    },
    /**
     * @inheritDoc
     * @override
     * @playerHook setPlaybackRate
     */
    setPlaybackRate(e) {
      this.callPlayer("setPlaybackSpeed", e);
    },
    /**
     * @inheritDoc
     * @override
     * @playerHook getDuration
     */
    getDuration() {
      return this.duration;
    },
    /**
     * @inheritDoc
     * @override
     * @playerHook getCurrentTime
     */
    getCurrentTime() {
      return this.callPlayer("currentTime");
    },
    /**
     * @inheritDoc
     * @override
     * @playerHook getSecondsLoaded
     */
    getSecondsLoaded() {
      return null;
    },
    async load(e) {
      try {
        const { playing: t, config: r } = this, n = (e ?? this.url).match(Xe)[1];
        this.player && this.stop();
        const s = await b(Kn, Bn, zn);
        if (!this.$refs.container)
          return;
        s.api.addReadyListener((i, l) => {
          this.player = l, this.player.on("ready", this.onReady), this.player.on("play", this.onPlay), this.player.on("pause", this.onPause), this.player.on("seek", this.onSeek), this.player.on("playerComplete", this.onEnded);
        }, n), s.api.renderPlayer({
          uuid: n,
          container: this.$refs.container,
          autoplay: t ? 1 : 0,
          ...r.options
        }), s.api.getPlayerMetadata(n).then((i) => {
          this.duration = i.length_in_seconds, this.onDuration(i.length_in_seconds);
        });
      } catch (t) {
        this.onError(t);
      }
    }
  }
};
var qn = function() {
  var t = this, r = t._self._c;
  return r("div", { style: t.styles }, [r("div", { ref: "container" })]);
}, Gn = [], Wn = /* @__PURE__ */ m(
  Yn,
  qn,
  Gn,
  !1,
  null,
  null,
  null,
  null
);
const Xn = Wn.exports, Zn = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Xn
}, Symbol.toStringTag, { value: "Module" })), Jn = "https://player.vimeo.com/api/player.js", Qn = "Vimeo", es = {
  // [META]
  displayName: "Vimeo",
  canPlay: h.vimeo,
  forceLoad: !0,
  // [/META]
  mixins: [v],
  props: {
    config: Ie,
    display: a.string.def("block")
  },
  data() {
    return {
      duration: null,
      currentTime: null,
      secondsLoaded: null
    };
  },
  computed: {
    styles() {
      return {
        display: this.display,
        overflow: "hidden",
        width: "100%",
        height: "100%"
      };
    }
  },
  methods: {
    /**
     * @inheritDoc
     * @override
     * @playerHook play
     */
    play() {
      const e = this.callPlayer("play");
      e && e.catch(this.onError);
    },
    /**
     * @inheritDoc
     * @override
     * @playerHook pause
     */
    pause() {
      this.callPlayer("pause");
    },
    /**
     * @inheritDoc
     * @override
     * @playerHook stop
     */
    stop() {
      this.callPlayer("unload");
    },
    /**
     * @inheritDoc
     * @override
     * @playerHook seekTo
     */
    seekTo(e) {
      this.callPlayer("setCurrentTime", e);
    },
    /**
     * @inheritDoc
     * @override
     * @playerHook setVolume
     */
    setVolume(e) {
      this.callPlayer("setVolume", e);
    },
    /**
     * @inheritDoc
     * @override
     * @playerHook setLoop
     */
    setLoop(e) {
      this.callPlayer("setLoop", e);
    },
    /**
     * @inheritDoc
     * @override
     * @playerHook setPlaybackRate
     */
    setPlaybackRate(e) {
      this.callPlayer("setPlaybackRate", e);
    },
    /**
     * @inheritDoc
     * @override
     * @playerHook mute
     */
    mute() {
      this.setVolume(0);
    },
    /**
     * @inheritDoc
     * @override
     * @playerHook unmute
     */
    unmute() {
      this.volume && this.setVolume(this.volume);
    },
    /**
     * @inheritDoc
     * @override
     * @playerHook getDuration
     */
    getDuration() {
      return this.duration;
    },
    /**
     * @inheritDoc
     * @override
     * @playerHook getCurrentTime
     */
    getCurrentTime() {
      return this.currentTime;
    },
    /**
     * @inheritDoc
     * @override
     * @playerHook getSecondsLoaded
     */
    getSecondsLoaded() {
      return this.secondsLoaded;
    },
    async load(e) {
      try {
        this.duration = null;
        const t = await b(Jn, Qn);
        if (!this.$refs.container)
          return;
        const { playerOptions: r, title: n } = this.config;
        this.player = new t.Player(this.$refs.container, {
          url: e,
          autoplay: this.playing,
          muted: this.muted,
          loop: this.loop,
          playsinline: this.playsinline,
          controls: this.controls,
          ...r
        }), this.player.ready().then(() => {
          const s = this.$refs.container.querySelector("iframe");
          s.style.width = "100%", s.style.height = "100%", n && (s.title = n);
        }).catch(this.onError), this.player.on("loaded", () => {
          this.onReady(), this.refreshDuration();
        }), this.player.on("play", () => {
          this.onPlay(), this.refreshDuration();
        }), this.player.on("pause", this.onPause), this.player.on("seeked", (s) => this.onSeek(s.seconds)), this.player.on("ended", this.onEnded), this.player.on("error", this.onError), this.player.on("timeupdate", ({ seconds: s }) => {
          this.currentTime = s;
        }), this.player.on("progress", ({ seconds: s }) => {
          this.secondsLoaded = s;
        }), this.player.on("bufferstart", this.onBuffer), this.player.on("bufferend", this.onBufferEnd);
      } catch (t) {
        this.onError(t);
      }
    },
    async refreshDuration() {
      this.duration = await this.player.getDuration();
    }
  }
};
var ts = function() {
  var t = this, r = t._self._c;
  return r("div", { key: this.url, ref: "container", style: t.styles });
}, rs = [], ns = /* @__PURE__ */ m(
  es,
  ts,
  rs,
  !1,
  null,
  null,
  null,
  null
);
const ss = ns.exports, is = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: ss
}, Symbol.toStringTag, { value: "Module" })), as = "https://fast.wistia.com/assets/external/E-v1.js", os = "Wistia", ls = "wistia-player-", us = {
  // [META]
  displayName: "Wistia",
  canPlay: h.wistia,
  loopOnEnded: !0,
  // [/META]
  mixins: [v],
  props: {
    config: Ue
  },
  data() {
    return {
      randomId: `${ls}${ee()}`
    };
  },
  computed: {
    pid() {
      return this.config.playerId ?? this.randomId;
    },
    videoId() {
      var e, t, r;
      return (r = (t = (e = this.url) == null ? void 0 : e.match) == null ? void 0 : t.call(e, qe)) == null ? void 0 : r[1];
    },
    className() {
      return `vue-player--wistia wistia_embed wistia_async_${this.videoId}`;
    }
  },
  methods: {
    /**
     * @inheritDoc
     * @override
     * @playerHook play
     */
    play() {
      this.callPlayer("play");
    },
    /**
     * @inheritDoc
     * @override
     * @playerHook pause
     */
    pause() {
      this.callPlayer("pause");
    },
    /**
     * @inheritDoc
     * @override
     * @playerHook stop
     */
    stop() {
      this.unbind(), this.callPlayer("remove");
    },
    /**
     * @inheritDoc
     * @override
     * @playerHook seekTo
     */
    seekTo(e) {
      this.callPlayer("time", e);
    },
    /**
     * @inheritDoc
     * @override
     * @playerHook setVolume
     */
    setVolume(e) {
      this.callPlayer("volume", e);
    },
    /**
     * @inheritDoc
     * @override
     * @playerHook mute
     */
    mute() {
      this.callPlayer("mute");
    },
    /**
     * @inheritDoc
     * @override
     * @playerHook unmute
     */
    unmute() {
      this.callPlayer("unmute");
    },
    /**
     * @inheritDoc
     * @override
     * @playerHook setPlaybackRate
     */
    setPlaybackRate(e) {
      this.callPlayer("playbackRate", e);
    },
    /**
     * @inheritDoc
     * @override
     * @playerHook setPlaybackRate
     */
    getDuration() {
      return this.callPlayer("duration");
    },
    /**
     * @inheritDoc
     * @override
     * @playerHook getCurrentTime
     */
    getCurrentTime() {
      return this.callPlayer("time");
    },
    /**
     * @inheritDoc
     * @override
     * @playerHook getSecondsLoaded
     */
    getSecondsLoaded() {
      return null;
    },
    async load(e) {
      var t, r;
      try {
        const { playing: n, muted: s, controls: i, onReady: l, config: c, onError: o } = this, u = await getSDK(as, os);
        (r = (t = c.customControls) == null ? void 0 : t.forEach) == null || r.call(t, (d) => u.defineControl(d)), window._wq = window._wq || [], window._wq.push({
          id: this.playerID,
          options: {
            autoPlay: n,
            silentAutoPlay: "allow",
            muted: s,
            controlsVisibleOnLoad: i,
            fullscreenButton: i,
            playbar: i,
            playbackRateControl: i,
            qualityControl: i,
            volumeControl: i,
            settingsControl: i,
            smallPlayButton: i,
            ...c.options
          },
          onReady: (d) => {
            this.player = d, this.unbind(), this.player.bind("play", this.onPlay), this.player.bind("pause", this.onPause), this.player.bind("seek", this.onSeek), this.player.bind("end", this.onEnded), this.player.bind("playbackratechange", this.onPlaybackRateChange), l();
          }
        });
      } catch (n) {
        this.onError(n);
      }
    },
    unbind() {
      var e, t, r, n, s, i, l, c, o, u;
      (t = (e = this.player) == null ? void 0 : e.unbind) == null || t.call(e, "play", this.onPlay), (n = (r = this.player) == null ? void 0 : r.unbind) == null || n.call(r, "pause", this.onPause), (i = (s = this.player) == null ? void 0 : s.unbind) == null || i.call(s, "seek", this.onSeek), (c = (l = this.player) == null ? void 0 : l.unbind) == null || c.call(l, "end", this.onEnded), (u = (o = this.player) == null ? void 0 : o.unbind) == null || u.call(o, "playbackratechange", this.onPlaybackRateChange);
    }
  }
};
var cs = function() {
  var t = this, r = t._self._c;
  return r("div", { key: t.videoId, class: t.className, attrs: { id: t.pid } });
}, ds = [], hs = /* @__PURE__ */ m(
  us,
  cs,
  ds,
  !1,
  null,
  null,
  null,
  null
);
const ys = hs.exports, ps = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: ys
}, Symbol.toStringTag, { value: "Module" })), fs = "https://www.youtube.com/iframe_api", fe = "YT", ms = "onYouTubeIframeAPIReady", Y = /[?&](?:list|channel)=([a-zA-Z0-9_-]+)/, q = /user\/([a-zA-Z0-9_-]+)\/?/, gs = /youtube-nocookie\.com/, _s = "https://www.youtube-nocookie.com", vs = {
  // [META]
  displayName: "YouTube",
  canPlay: h.youtube,
  // [/META]
  mixins: [v],
  props: {
    config: Ee
  },
  computed: {
    styles() {
      return {
        display: this.display,
        width: "100%",
        height: "100%"
      };
    }
  },
  methods: {
    /**
     * @inheritDoc
     * @override
     * @playerHook play
     */
    play() {
      this.callPlayer("playVideo");
    },
    /**
     * @inheritDoc
     * @override
     * @playerHook pause
     */
    pause() {
      this.callPlayer("pauseVideo");
    },
    /**
     * @inheritDoc
     * @override
     * @playerHook stop
     */
    stop() {
      document.body.contains(this.callPlayer("getIframe")) && this.callPlayer("stopVideo");
    },
    /**
     * @inheritDoc
     * @override
     * @playerHook seekTo
     */
    seekTo(e) {
      this.callPlayer("seekTo", e), this.playing || this.pause();
    },
    /**
     * @inheritDoc
     * @override
     * @playerHook setVolume
     */
    setVolume(e) {
      this.callPlayer("setVolume", e * 100);
    },
    /**
     * @inheritDoc
     * @override
     * @playerHook mute
     */
    mute() {
      this.callPlayer("mute");
    },
    /**
     * @inheritDoc
     * @override
     * @playerHook unmute
     */
    unmute() {
      this.callPlayer("unmute");
    },
    /**
     * @inheritDoc
     * @override
     * @playerHook setPlaybackRate
     */
    setPlaybackRate(e) {
      this.callPlayer("setPlaybackRate", e);
    },
    /**
     * @inheritDoc
     * @override
     * @playerHook setLoop
     */
    setLoop(e) {
      this.callPlayer("setLoop", e);
    },
    /**
     * @inheritDoc
     * @override
     * @playerHook getDuration
     */
    getDuration() {
      return this.callPlayer("getDuration");
    },
    /**
     * @inheritDoc
     * @override
     * @playerHook getCurrentTime
     */
    getCurrentTime() {
      return this.callPlayer("getCurrentTime");
    },
    /**
     * @inheritDoc
     * @override
     * @playerHook getSecondsLoaded
     */
    getSecondsLoaded() {
      return this.callPlayer("getVideoLoadedFraction") * this.getDuration();
    },
    async load(e, t) {
      try {
        const { playing: r, muted: n, playsinline: s, controls: i, loop: l, config: c, onError: o } = this, { playerVars: u, embedOptions: d } = c, y = this.getID(e);
        if (t) {
          if (Y.test(e) || q.test(e) || e instanceof Array) {
            this.player.loadPlaylist(this.parsePlaylist(e));
            return;
          }
          this.player.cueVideoById({
            videoId: y,
            startSeconds: D(e) || u.start,
            endSeconds: oe(e) || u.end
          });
          return;
        }
        const p = await b(fs, fe, ms, (g) => g.loaded);
        if (!this.container)
          return;
        this.player = new p.Player(this.container, {
          width: "100%",
          height: "100%",
          videoId: y,
          playerVars: {
            autoplay: r ? 1 : 0,
            mute: n ? 1 : 0,
            controls: i ? 1 : 0,
            start: D(e),
            end: oe(e),
            origin: window.location.origin,
            playsinline: s ? 1 : 0,
            ...this.parsePlaylist(e),
            ...u
          },
          events: {
            onReady: () => {
              l && this.player.setLoop(!0), this.onReady();
            },
            onPlaybackRateChange: (g) => this.onPlaybackRateChange(g.data),
            onStateChange: this.onStateChange,
            onError: (g) => o(g.data)
          },
          host: gs.test(e) ? _s : void 0,
          ...d
        }), d.events && console.warn("Using `embedOptions.events` will likely break things. Use ReactPlayer’s callback props instead, eg onReady, onPlay, onPause");
      } catch (r) {
        this.onError(r);
      }
    },
    parsePlaylist(e) {
      if (e instanceof Array)
        return {
          listType: "playlist",
          playlist: e.map(this.getID).join(",")
        };
      if (Y.test(e)) {
        const [, t] = e.match(Y);
        return {
          listType: "playlist",
          list: t.replace(/^UC/, "UU")
        };
      }
      if (q.test(e)) {
        const [, t] = e.match(q);
        return {
          listType: "user_uploads",
          list: t
        };
      }
      return {};
    },
    onStateChange(e) {
      const { data: t } = e, {
        onPlay: r,
        onPause: n,
        onBuffer: s,
        onBufferEnd: i,
        onEnded: l,
        onReady: c,
        loop: o,
        config: { playerVars: u, onUnstarted: d }
      } = this, { UNSTARTED: y, PLAYING: p, PAUSED: g, BUFFERING: L, ENDED: x, CUED: N } = window[fe].PlayerState;
      if (t === y && d(), t === p && (r(), i()), t === g && n(), t === L && s(), t === x) {
        const F = !!this.callPlayer("getPlaylist");
        o && !F && (u.start ? this.seekTo(u.start) : this.play()), l();
      }
      t === N && c();
    }
  }
};
var Ps = function() {
  var t = this, r = t._self._c;
  return r("div", { staticClass: "vue-player--youtube", style: t.styles }, [r("div", { ref: "container" })]);
}, bs = [], ws = /* @__PURE__ */ m(
  vs,
  Ps,
  bs,
  !1,
  null,
  null,
  null,
  null
);
const Ss = ws.exports, $s = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Ss
}, Symbol.toStringTag, { value: "Module" }));
export {
  Cr as DailyMotionPlayer,
  Ur as FacebookPlayer,
  Qr as FilePlayer,
  ln as KalturaPlayer,
  mn as MixcloudPlayer,
  mr as Player,
  wr as Preview,
  $n as SoundcloudPlayer,
  An as StreamablePlayer,
  Fn as TwitchPlayer,
  Xn as VidyardPlayer,
  ss as VimeoPlayer,
  Ls as VuePlayer,
  ys as WistiaPlayer,
  Ss as YouTubePlayer,
  v as playerMixin
};

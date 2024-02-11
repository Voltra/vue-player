import { resolveComponent as mt, openBlock as h, createBlock as j, resolveDynamicComponent as F, mergeProps as S, withCtx as N, createElementBlock as p, renderSlot as E, Fragment as H, toHandlers as ke, normalizeStyle as C, createElementVNode as V, renderList as he, normalizeProps as ye, guardReactiveProps as pe, createCommentVNode as gt, normalizeClass as Pt } from "vue";
/*!
 * is-plain-object <https://github.com/jonschlinkert/is-plain-object>
 *
 * Copyright (c) 2014-2017, Jon Schlinkert.
 * Released under the MIT License.
 */
function fe(e) {
  return Object.prototype.toString.call(e) === "[object Object]";
}
function bt(e) {
  var t, r;
  return fe(e) === !1 ? !1 : (t = e.constructor, t === void 0 ? !0 : (r = t.prototype, !(fe(r) === !1 || r.hasOwnProperty("isPrototypeOf") === !1)));
}
function M() {
  return M = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var s in r)
        Object.prototype.hasOwnProperty.call(r, s) && (e[s] = r[s]);
    }
    return e;
  }, M.apply(this, arguments);
}
function Ae(e, t) {
  if (e == null)
    return {};
  var r, s, i = {}, n = Object.keys(e);
  for (s = 0; s < n.length; s++)
    t.indexOf(r = n[s]) >= 0 || (i[r] = e[r]);
  return i;
}
const ne = { silent: !1, logLevel: "warn" }, vt = ["validator"], De = Object.prototype, Ie = De.toString, _t = De.hasOwnProperty, Re = /^\s*function (\w+)/;
function me(e) {
  var t;
  const r = (t = e == null ? void 0 : e.type) !== null && t !== void 0 ? t : e;
  if (r) {
    const s = r.toString().match(Re);
    return s ? s[1] : "";
  }
  return "";
}
const O = bt, Ce = (e) => e;
let m = Ce;
process.env.NODE_ENV !== "production" && (m = typeof console < "u" ? function(t, r = ne.logLevel) {
  ne.silent === !1 && console[r](`[VueTypes warn]: ${t}`);
} : Ce);
const A = (e, t) => _t.call(e, t), wt = Number.isInteger || function(e) {
  return typeof e == "number" && isFinite(e) && Math.floor(e) === e;
}, D = Array.isArray || function(e) {
  return Ie.call(e) === "[object Array]";
}, I = (e) => Ie.call(e) === "[object Function]", z = (e) => O(e) && A(e, "_vueTypes_name"), je = (e) => O(e) && (A(e, "type") || ["_vueTypes_name", "validator", "default", "required"].some((t) => A(e, t)));
function ue(e, t) {
  return Object.defineProperty(e.bind(t), "__original", { value: e });
}
function T(e, t, r = !1) {
  let s, i = !0, n = "";
  s = O(e) ? e : { type: e };
  const o = z(s) ? s._vueTypes_name + " - " : "";
  if (je(s) && s.type !== null) {
    if (s.type === void 0 || s.type === !0 || !s.required && t === void 0)
      return i;
    D(s.type) ? (i = s.type.some((l) => T(l, t, !0) === !0), n = s.type.map((l) => me(l)).join(" or ")) : (n = me(s), i = n === "Array" ? D(t) : n === "Object" ? O(t) : n === "String" || n === "Number" || n === "Boolean" || n === "Function" ? function(l) {
      if (l == null)
        return "";
      const u = l.constructor.toString().match(Re);
      return u ? u[1] : "";
    }(t) === n : t instanceof s.type);
  }
  if (!i) {
    const l = `${o}value "${t}" should be of type "${n}"`;
    return r === !1 ? (m(l), !1) : l;
  }
  if (A(s, "validator") && I(s.validator)) {
    const l = m, u = [];
    if (m = (c) => {
      u.push(c);
    }, i = s.validator(t), m = l, !i) {
      const c = (u.length > 1 ? "* " : "") + u.join(`
* `);
      return u.length = 0, r === !1 ? (m(c), i) : c;
    }
  }
  return i;
}
function P(e, t) {
  const r = Object.defineProperties(t, { _vueTypes_name: { value: e, writable: !0 }, isRequired: { get() {
    return this.required = !0, this;
  } }, def: { value(i) {
    return i === void 0 ? (A(this, "default") && delete this.default, this) : I(i) || T(this, i, !0) === !0 ? (this.default = D(i) ? () => [...i] : O(i) ? () => Object.assign({}, i) : i, this) : (m(`${this._vueTypes_name} - invalid default value: "${i}"`), this);
  } } }), { validator: s } = r;
  return I(s) && (r.validator = ue(s, r)), r;
}
function _(e, t) {
  const r = P(e, t);
  return Object.defineProperty(r, "validate", { value(s) {
    return I(this.validator) && m(`${this._vueTypes_name} - calling .validate() will overwrite the current custom validator function. Validator info:
${JSON.stringify(this)}`), this.validator = ue(s, this), this;
  } });
}
function ge(e, t, r) {
  const s = function(u) {
    const c = {};
    return Object.getOwnPropertyNames(u).forEach((d) => {
      c[d] = Object.getOwnPropertyDescriptor(u, d);
    }), Object.defineProperties({}, c);
  }(t);
  if (s._vueTypes_name = e, !O(r))
    return s;
  const { validator: i } = r, n = Ae(r, vt);
  if (I(i)) {
    let { validator: u } = s;
    u && (u = (l = (o = u).__original) !== null && l !== void 0 ? l : o), s.validator = ue(u ? function(c) {
      return u.call(this, c) && i.call(this, c);
    } : i, s);
  }
  var o, l;
  return Object.assign(s, n);
}
function Y(e) {
  return e.replace(/^(?!\s*$)/gm, "  ");
}
const $t = () => _("any", {}), St = () => _("function", { type: Function }), Lt = () => _("boolean", { type: Boolean }), Et = () => _("string", { type: String }), Ot = () => _("number", { type: Number }), Tt = () => _("array", { type: Array }), kt = () => _("object", { type: Object }), At = () => P("integer", { type: Number, validator: (e) => wt(e) }), Dt = () => P("symbol", { validator: (e) => typeof e == "symbol" });
function It(e, t = "custom validation failed") {
  if (typeof e != "function")
    throw new TypeError("[VueTypes error]: You must provide a function as argument");
  return P(e.name || "<<anonymous function>>", { type: null, validator(r) {
    const s = e(r);
    return s || m(`${this._vueTypes_name} - ${t}`), s;
  } });
}
function Rt(e) {
  if (!D(e))
    throw new TypeError("[VueTypes error]: You must provide an array as argument.");
  const t = `oneOf - value should be one of "${e.join('", "')}".`, r = e.reduce((s, i) => {
    if (i != null) {
      const n = i.constructor;
      s.indexOf(n) === -1 && s.push(n);
    }
    return s;
  }, []);
  return P("oneOf", { type: r.length > 0 ? r : void 0, validator(s) {
    const i = e.indexOf(s) !== -1;
    return i || m(t), i;
  } });
}
function Ct(e) {
  if (!D(e))
    throw new TypeError("[VueTypes error]: You must provide an array as argument");
  let t = !1, r = [];
  for (let i = 0; i < e.length; i += 1) {
    const n = e[i];
    if (je(n)) {
      if (z(n) && n._vueTypes_name === "oneOf" && n.type) {
        r = r.concat(n.type);
        continue;
      }
      if (I(n.validator) && (t = !0), n.type === !0 || !n.type) {
        m('oneOfType - invalid usage of "true" or "null" as types.');
        continue;
      }
      r = r.concat(n.type);
    } else
      r.push(n);
  }
  r = r.filter((i, n) => r.indexOf(i) === n);
  const s = r.length > 0 ? r : null;
  return P("oneOfType", t ? { type: s, validator(i) {
    const n = [], o = e.some((l) => {
      const u = T(z(l) && l._vueTypes_name === "oneOf" ? l.type || null : l, i, !0);
      return typeof u == "string" && n.push(u), u === !0;
    });
    return o || m(`oneOfType - provided value does not match any of the ${n.length} passed-in validators:
${Y(n.join(`
`))}`), o;
  } } : { type: s });
}
function jt(e) {
  return P("arrayOf", { type: Array, validator(t) {
    let r = "";
    const s = t.every((i) => (r = T(e, i, !0), r === !0));
    return s || m(`arrayOf - value validation error:
${Y(r)}`), s;
  } });
}
function Mt(e) {
  return P("instanceOf", { type: e });
}
function Vt(e) {
  return P("objectOf", { type: Object, validator(t) {
    let r = "";
    const s = Object.keys(t).every((i) => (r = T(e, t[i], !0), r === !0));
    return s || m(`objectOf - value validation error:
${Y(r)}`), s;
  } });
}
function Ut(e) {
  const t = Object.keys(e), r = t.filter((i) => {
    var n;
    return !((n = e[i]) === null || n === void 0 || !n.required);
  }), s = P("shape", { type: Object, validator(i) {
    if (!O(i))
      return !1;
    const n = Object.keys(i);
    if (r.length > 0 && r.some((o) => n.indexOf(o) === -1)) {
      const o = r.filter((l) => n.indexOf(l) === -1);
      return m(o.length === 1 ? `shape - required property "${o[0]}" is not defined.` : `shape - required properties "${o.join('", "')}" are not defined.`), !1;
    }
    return n.every((o) => {
      if (t.indexOf(o) === -1)
        return this._vueTypes_isLoose === !0 || (m(`shape - shape definition does not include a "${o}" property. Allowed keys: "${t.join('", "')}".`), !1);
      const l = T(e[o], i[o], !0);
      return typeof l == "string" && m(`shape - "${o}" property validation error:
 ${Y(l)}`), l === !0;
    });
  } });
  return Object.defineProperty(s, "_vueTypes_isLoose", { writable: !0, value: !1 }), Object.defineProperty(s, "loose", { get() {
    return this._vueTypes_isLoose = !0, this;
  } }), s;
}
const xt = ["name", "validate", "getter"], Nt = /* @__PURE__ */ (() => {
  var e;
  return (e = class {
    static get any() {
      return $t();
    }
    static get func() {
      return St().def(this.defaults.func);
    }
    static get bool() {
      return Lt().def(this.defaults.bool);
    }
    static get string() {
      return Et().def(this.defaults.string);
    }
    static get number() {
      return Ot().def(this.defaults.number);
    }
    static get array() {
      return Tt().def(this.defaults.array);
    }
    static get object() {
      return kt().def(this.defaults.object);
    }
    static get integer() {
      return At().def(this.defaults.integer);
    }
    static get symbol() {
      return Dt();
    }
    static get nullable() {
      return { type: null };
    }
    static extend(t) {
      if (D(t))
        return t.forEach((u) => this.extend(u)), this;
      const { name: r, validate: s = !1, getter: i = !1 } = t, n = Ae(t, xt);
      if (A(this, r))
        throw new TypeError(`[VueTypes error]: Type "${r}" already defined`);
      const { type: o } = n;
      if (z(o))
        return delete n.type, Object.defineProperty(this, r, i ? { get: () => ge(r, o, n) } : { value(...u) {
          const c = ge(r, o, n);
          return c.validator && (c.validator = c.validator.bind(c, ...u)), c;
        } });
      let l;
      return l = i ? { get() {
        const u = Object.assign({}, n);
        return s ? _(r, u) : P(r, u);
      }, enumerable: !0 } : { value(...u) {
        const c = Object.assign({}, n);
        let d;
        return d = s ? _(r, c) : P(r, c), c.validator && (d.validator = c.validator.bind(d, ...u)), d;
      }, enumerable: !0 }, Object.defineProperty(this, r, l);
    }
  }).defaults = {}, e.sensibleDefaults = void 0, e.config = ne, e.custom = It, e.oneOf = Rt, e.instanceOf = Mt, e.oneOfType = Ct, e.arrayOf = jt, e.objectOf = Vt, e.shape = Ut, e.utils = { validate: (t, r) => T(r, t, !0) === !0, toType: (t, r, s = !1) => s ? _(t, r) : P(t, r) }, e;
})();
function Ht(e = { func: () => {
}, bool: !0, string: "", number: 0, array: () => [], object: () => ({}), integer: 0 }) {
  var t;
  return (t = class extends Nt {
    static get sensibleDefaults() {
      return M({}, this.defaults);
    }
    static set sensibleDefaults(r) {
      this.defaults = r !== !1 ? M({}, r !== !0 ? r : e) : {};
    }
  }).defaults = M({}, e), t;
}
class a extends Ht() {
}
function Me(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var Kt = function(t, r, s) {
  var i = document.head || document.getElementsByTagName("head")[0], n = document.createElement("script");
  typeof r == "function" && (s = r, r = {}), r = r || {}, s = s || function() {
  }, n.type = r.type || "text/javascript", n.charset = r.charset || "utf8", n.async = "async" in r ? !!r.async : !0, n.src = t, r.attrs && Bt(n, r.attrs), r.text && (n.text = "" + r.text);
  var o = "onload" in n ? Pe : Ft;
  o(n, s), n.onload || Pe(n, s), i.appendChild(n);
};
function Bt(e, t) {
  for (var r in t)
    e.setAttribute(r, t[r]);
}
function Pe(e, t) {
  e.onload = function() {
    this.onerror = this.onload = null, t(null, e);
  }, e.onerror = function() {
    this.onerror = this.onload = null, t(new Error("Failed to load " + this.src), e);
  };
}
function Ft(e, t) {
  e.onreadystatechange = function() {
    this.readyState != "complete" && this.readyState != "loaded" || (this.onreadystatechange = null, t(null, e));
  };
}
const zt = /* @__PURE__ */ Me(Kt);
var Yt = function(t) {
  return qt(t) && !Gt(t);
};
function qt(e) {
  return !!e && typeof e == "object";
}
function Gt(e) {
  var t = Object.prototype.toString.call(e);
  return t === "[object RegExp]" || t === "[object Date]" || Zt(e);
}
var Wt = typeof Symbol == "function" && Symbol.for, Xt = Wt ? Symbol.for("react.element") : 60103;
function Zt(e) {
  return e.$$typeof === Xt;
}
function Jt(e) {
  return Array.isArray(e) ? [] : {};
}
function U(e, t) {
  return t.clone !== !1 && t.isMergeableObject(e) ? R(Jt(e), e, t) : e;
}
function Qt(e, t, r) {
  return e.concat(t).map(function(s) {
    return U(s, r);
  });
}
function er(e, t) {
  if (!t.customMerge)
    return R;
  var r = t.customMerge(e);
  return typeof r == "function" ? r : R;
}
function tr(e) {
  return Object.getOwnPropertySymbols ? Object.getOwnPropertySymbols(e).filter(function(t) {
    return Object.propertyIsEnumerable.call(e, t);
  }) : [];
}
function be(e) {
  return Object.keys(e).concat(tr(e));
}
function Ve(e, t) {
  try {
    return t in e;
  } catch {
    return !1;
  }
}
function rr(e, t) {
  return Ve(e, t) && !(Object.hasOwnProperty.call(e, t) && Object.propertyIsEnumerable.call(e, t));
}
function sr(e, t, r) {
  var s = {};
  return r.isMergeableObject(e) && be(e).forEach(function(i) {
    s[i] = U(e[i], r);
  }), be(t).forEach(function(i) {
    rr(e, i) || (Ve(e, i) && r.isMergeableObject(t[i]) ? s[i] = er(i, r)(e[i], t[i], r) : s[i] = U(t[i], r));
  }), s;
}
function R(e, t, r) {
  r = r || {}, r.arrayMerge = r.arrayMerge || Qt, r.isMergeableObject = r.isMergeableObject || Yt, r.cloneUnlessOtherwiseSpecified = U;
  var s = Array.isArray(t), i = Array.isArray(e), n = s === i;
  return n ? s ? r.arrayMerge(e, t, r) : sr(e, t, r) : U(t, r);
}
R.all = function(t, r) {
  if (!Array.isArray(t))
    throw new Error("first argument should be an array");
  return t.reduce(function(s, i) {
    return R(s, i, r);
  }, {});
};
var nr = R, ir = nr;
const ar = /* @__PURE__ */ Me(ir), or = /[?&#](?:start|t)=([0-9hms]+)/, lr = /[?&#]end=([0-9hms]+)/, ie = /(\d+)([hms])/g, ur = /^\d+$/;
function Ue(e, t) {
  if (e instanceof Array)
    return;
  const r = e.match(t);
  if (r) {
    const s = r[1];
    if (s.match(ie))
      return cr(s);
    if (ur.test(s))
      return parseInt(s);
  }
}
function cr(e) {
  let t = 0, r = ie.exec(e);
  for (; r !== null; ) {
    const [, s, i] = r;
    i === "h" && (t += parseInt(s, 10) * 60 * 60), i === "m" && (t += parseInt(s, 10) * 60), i === "s" && (t += parseInt(s, 10)), r = ie.exec(e);
  }
  return t;
}
function x(e) {
  return Ue(e, or);
}
function ve(e) {
  return Ue(e, lr);
}
function ce() {
  return Math.random().toString(36).substr(2, 5);
}
function dr(e) {
  return Object.keys(e).map((t) => `${t}=${e[t]}`).join("&");
}
function J(e) {
  return window[e] ? window[e] : window.exports && window.exports[e] ? window.exports[e] : window.module && window.module.exports && window.module.exports[e] ? window.module.exports[e] : null;
}
const k = {};
function $(e, t, r = null, s = () => !0, i = zt) {
  const n = J(t);
  return n && s(n) ? Promise.resolve(n) : new Promise((o, l) => {
    if (k[e]) {
      k[e].push({ resolve: o, reject: l });
      return;
    }
    k[e] = [{ resolve: o, reject: l }];
    const u = (c) => {
      k[e].forEach((d) => d.resolve(c));
    };
    if (r) {
      const c = window[r];
      window[r] = function() {
        c && c(), u(J(t));
      };
    }
    i(e, (c) => {
      c ? (k[e].forEach((d) => d.reject(c)), k[e] = null) : r || u(J(t));
    });
  });
}
function hr(e, ...t) {
  if (!this.player || !this.player[e]) {
    let r = `VuePlayer: ${this.$options.displayName} player could not call %c${e}%c – `;
    return this.player ? this.player[e] || (r += "The method was not available") : r += "The player was not available", console.warn(r, "font-weight: bold", ""), null;
  }
  return this.player[e](...t);
}
function K(e) {
  return typeof MediaStream < "u" && e instanceof MediaStream || typeof window < "u" && typeof window.MediaStream < "u" && e instanceof window.MediaStream;
}
function yr(e) {
  return /^blob:/.test(e);
}
function B(e = document.createElement("video")) {
  const t = !/iPhone|iPod/.test(navigator.userAgent);
  return typeof e.webkitSetPresentationMode == "function" && t;
}
const b = {
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
      return hr.apply(this, [e, ...t]);
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
}, xe = {
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
}, Ne = a.shape({
  options: a.shape({
    visual: a.bool,
    buying: a.bool,
    liking: a.bool,
    download: a.bool,
    sharing: a.bool,
    show_comments: a.bool,
    show_playcount: a.bool
  }).loose
}).loose.def(() => xe), He = {
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
}, Ke = a.shape({
  playerVars: a.shape({
    playsinline: a.integer,
    showinfo: a.integer,
    rel: a.integer,
    iv_load_policy: a.integer,
    modestbranding: a.integer
  }).loose,
  embedOptions: a.object,
  onUnstarted: a.func
}).loose.def(() => He), Be = {
  appId: "1309697205772819",
  version: "v3.3",
  playerId: null,
  attributes: {}
}, Fe = a.shape({
  appId: a.string,
  version: a.string,
  playerId: a.string,
  attributes: a.object
}).loose.def(() => Be), ze = {
  params: {
    api: 1,
    "endscreen-enable": !1
  }
}, Ye = a.shape({
  params: a.shape({
    api: a.integer,
    "endscreen-enable": a.bool
  }).loose
}).loose.def(() => ze), qe = {
  playerOptions: {
    autopause: !1,
    byline: !1,
    portrait: !1,
    title: !1
  },
  title: null
}, Ge = a.shape({
  playerOptions: a.shape({
    autopause: a.bool,
    byline: a.bool,
    portrait: a.bool,
    title: a.bool
  }).loose,
  title: a.string
}).loose.def(() => qe), We = {
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
}, Xe = a.shape({
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
}).loose.def(() => We), Ze = {
  wistia: {
    options: {},
    playerId: null,
    customControls: null
  }
}, Je = a.shape({
  wistia: a.shape({
    options: a.object,
    playerId: a.string,
    customControls: a.array
  }).loose
}).loose.def(() => Ze), Qe = {
  options: {
    hide_cover: 1
  }
}, et = a.shape({
  options: a.shape({
    hide_cover: a.integer
  }).loose
}).loose.def(() => Qe), tt = {
  options: {},
  playerId: null
}, rt = a.shape({
  options: a.object,
  playerId: a.string
}).loose.def(() => tt), st = {
  options: {}
}, nt = a.shape({
  options: a.object
}).loose.def(() => st), ae = {
  soundcloud: xe,
  youtube: He,
  facebook: Be,
  dailymotion: ze,
  vimeo: qe,
  file: We,
  wistia: Ze,
  mixcloud: Qe,
  twitch: tt,
  vidyard: st
}, pr = a.shape({
  soundcloud: Ne,
  youtube: Ke,
  facebook: Fe,
  dailymotion: Ye,
  vimeo: Ge,
  file: Xe,
  wistia: Je,
  mixcloud: et,
  twitch: rt,
  vidyard: nt
}).def(() => ae), fr = a.oneOfType([
  a.object,
  a.string,
  a.func
]), it = {
  mixins: [b],
  props: {
    config: pr,
    progressFrequency: a.number,
    activePlayer: fr
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
const _e = /(?:youtu\.be\/|youtube(?:-nocookie)?\.com\/(?:embed\/|v\/|watch\/|watch\?v=|watch\?.+&v=))((\w|-){11})|youtube\.com\/playlist\?list=|youtube\.com\/user\//, mr = /(?:soundcloud\.com|snd\.sc)\/[^.]+$/, gr = /vimeo\.com\/(?!progressive_redirect).+/, Pr = /^https?:\/\/(www\.)?facebook\.com.*\/(video(s)?|watch|story)(\.php?|\/).+$/, br = /^https?:\/\/fb\.watch\/.+$/, at = /streamable\.com\/([a-z0-9]+)$/, ot = /(?:wistia\.(?:com|net)|wi\.st)\/(?:medias|embed)\/(?:iframe\/)?(.*)$/, vr = /(?:www\.|go\.)?twitch\.tv\/videos\/(\d+)($|\?)/, oe = /(?:www\.|go\.)?twitch\.tv\/([a-zA-Z0-9_]+)($|\?)/, lt = /^(?:(?:https?):)?(?:\/\/)?(?:www\.)?(?:(?:dailymotion\.com(?:\/embed)?\/video)|dai\.ly)\/([a-zA-Z0-9]+)(?:_[\w_-]+)?$/, ut = /mixcloud\.com\/([^/]+\/[^/]+)/, ct = /vidyard.com\/(?:watch\/)?([a-zA-Z0-9-_]+)/, _r = /^https?:\/\/[a-zA-Z]+\.kaltura.(com|org)\/p\/([0-9]+)\/sp\/([0-9]+)00\/embedIframeJs\/uiconf_id\/([0-9]+)\/partner_id\/([0-9]+)(.*)entry_id.([a-zA-Z0-9-_]+)$/, q = /\.(m4a|m4b|mp4a|mpga|mp2|mp2a|mp3|m2a|m3a|wav|weba|aac|oga|spx)($|\?)/i, dt = /\.(mp4|og[gv]|webm|mov|m4v)(#t=[,\d+]+)?($|\?)/i, de = /\.(m3u8)($|\?)/i, ht = /\.(mpd)($|\?)/i, yt = /\.(flv)($|\?)/i, le = (e) => {
  if (e instanceof Array) {
    for (const t of e)
      if (typeof t == "string" && le(t) || le(t.src))
        return !0;
    return !1;
  }
  return K(e) || yr(e) ? !0 : q.test(e) || dt.test(e) || de.test(e) || ht.test(e) || yt.test(e);
}, y = {
  /**
   * @type {CanPlayUrl}
   */
  youtube: (e) => e instanceof Array ? e.every((t) => _e.test(t)) : _e.test(e),
  /**
   * @type {CanPlayUrl}
   */
  soundcloud: (e) => mr.test(e) && !q.test(e),
  /**
   * @type {CanPlayUrl}
   */
  vimeo: (e) => gr.test(e) && !dt.test(e) && !de.test(e),
  /**
   * @type {CanPlayUrl}
   */
  facebook: (e) => Pr.test(e) || br.test(e),
  /**
   * @type {CanPlayUrl}
   */
  streamable: (e) => at.test(e),
  /**
   * @type {CanPlayUrl}
   */
  wistia: (e) => ot.test(e),
  /**
   * @type {CanPlayUrl}
   */
  twitch: (e) => vr.test(e) || oe.test(e),
  /**
   * @type {CanPlayUrl}
   */
  dailymotion: (e) => lt.test(e),
  /**
   * @type {CanPlayUrl}
   */
  mixcloud: (e) => ut.test(e),
  /**
   * @type {CanPlayUrl}
   */
  vidyard: (e) => ct.test(e),
  /**
   * @type {CanPlayUrl}
   */
  kaltura: (e) => _r.test(e),
  /**
   * @type {CanPlayUrl}
   */
  file: le
}, Q = [
  /**
   * @type {PlayerDecl<"youtube", "YouTube", import("./components/players/YouTubePlayer.vue").default>}
   */
  {
    key: "youtube",
    name: "YouTube",
    canPlay: y.youtube,
    lazyPlayer: () => Promise.resolve().then(() => En)
  },
  /**
   * @type {PlayerDecl<"soundcloud", "SoundCloud", import("./components/players/SoundCloudPlayer.vue").default>}
   */
  {
    key: "soundcloud",
    name: "SoundCloud",
    canPlay: y.soundcloud,
    lazyPlayer: () => Promise.resolve().then(() => Rs)
  },
  /**
   * @type {PlayerDecl<"vimeo", "Vimeo", import("./components/players/VimeoPlayer.vue").default>}
   */
  {
    key: "vimeo",
    name: "Vimeo",
    canPlay: y.vimeo,
    lazyPlayer: () => Promise.resolve().then(() => un)
  },
  /**
   * @type {PlayerDecl<"facebook", "Facebook", import("./components/players/FacebookPlayer.vue").default>}
   */
  {
    key: "facebook",
    name: "Facebook",
    canPlay: y.facebook,
    lazyPlayer: () => Promise.resolve().then(() => Jr)
  },
  /**
   * @type {PlayerDecl<"streamable", "Streamable", import("./components/players/StreamablePlayer.vue").default>}
   */
  {
    key: "streamable",
    name: "Streamable",
    canPlay: y.streamable,
    lazyPlayer: () => Promise.resolve().then(() => Ns)
  },
  /**
   * @type {PlayerDecl<"wistia", "Wistia", import("./components/players/WistiaPlayer.vue").default>}
   */
  {
    key: "wistia",
    name: "Wistia",
    canPlay: y.wistia,
    lazyPlayer: () => Promise.resolve().then(() => gn)
  },
  /**
   * @type {PlayerDecl<"twitch", "Twitch", import("./components/players/TwitchPlayer.vue").default>}
   */
  {
    key: "twitch",
    name: "Twitch",
    canPlay: y.twitch,
    lazyPlayer: () => Promise.resolve().then(() => Gs)
  },
  /**
   * @type {PlayerDecl<"dailymotion", "DailyMotion", import("./components/players/DailyMotionPlayer.vue").default>}
   */
  {
    key: "dailymotion",
    name: "DailyMotion",
    canPlay: y.dailymotion,
    lazyPlayer: () => Promise.resolve().then(() => Yr)
  },
  /**
   * @type {PlayerDecl<"mixcloud", "Mixcloud", import("./components/players/MixcloudPlayer.vue").default>}
   */
  {
    key: "mixcloud",
    name: "Mixcloud",
    canPlay: y.mixcloud,
    lazyPlayer: () => Promise.resolve().then(() => Es)
  },
  /**
   * @type {PlayerDecl<"vidyard", "Vidyard", import("./components/players/VidyardPlayer.vue").default>}
   */
  {
    key: "vidyard",
    name: "Vidyard",
    canPlay: y.vidyard,
    lazyPlayer: () => Promise.resolve().then(() => rn)
  },
  /**
   * @type {PlayerDecl<"kaltura", "Kaltura", import("./components/players/KalturaPlayer.vue").default>}
   */
  {
    key: "kaltura",
    name: "Kaltura",
    canPlay: y.kaltura,
    lazyPlayer: () => Promise.resolve().then(() => bs)
  },
  /**
   * @type {PlayerDecl<"file", "FilePlayer", import("./components/players/FilePlayer.vue").default>}
   */
  {
    key: "file",
    name: "FilePlayer",
    canPlay: y.file,
    canEnablePIP: (e) => y.file(e) && (document.pictureInPictureEnabled || B()) && !q.test(e),
    lazyPlayer: () => Promise.resolve().then(() => hs)
  }
];
var we = Number.isNaN || function(t) {
  return typeof t == "number" && t !== t;
};
function wr(e, t) {
  return !!(e === t || we(e) && we(t));
}
function $r(e, t) {
  if (e.length !== t.length)
    return !1;
  for (var r = 0; r < e.length; r++)
    if (!wr(e[r], t[r]))
      return !1;
  return !0;
}
function $e(e, t) {
  t === void 0 && (t = $r);
  var r = null;
  function s() {
    for (var i = [], n = 0; n < arguments.length; n++)
      i[n] = arguments[n];
    if (r && r.lastThis === this && t(i, r.lastArgs))
      return r.lastResult;
    var o = e.apply(this, i);
    return r = {
      lastResult: o,
      lastArgs: i,
      lastThis: this
    }, o;
  }
  return s.clear = function() {
    r = null;
  }, s;
}
const g = (e, t) => {
  const r = e.__vccOpts || e;
  for (const [s, i] of t)
    r[s] = i;
  return r;
};
let L = [];
const Sr = {
  // [META]
  displayName: "VuePlayer",
  /**
   * @template {string} Key
   * @template {string} Name
   * @template {Component} C
   * @param {PlayerDecl<Key, Name, C>} player
   */
  addCustomPlayer(e) {
    L.push(e);
  },
  /**
   * @template {string} Key
   * @template {string} Name
   * @template {Component} C
   * @param {PlayerDecl<Key, Name, C>} player
   */
  removeCustomPlayer(e) {
    L = L.filter((t) => t !== e);
  },
  removeCustomPlayers() {
    L = [];
  },
  canPlay(e) {
    return [...L, ...Q].some((t) => t.canPlay(e));
  },
  canEnablePIP(e) {
    return [...L, ...Q].some((t) => {
      var r;
      return (r = t.canEnablePIP) == null ? void 0 : r.call(t, e);
    });
  },
  // [/META]
  inheritAttrs: !1,
  mixins: [it],
  emits: ["click-preview"],
  components: {
    Preview: () => Promise.resolve().then(() => Ur),
    Player: () => Promise.resolve().then(() => Ir)
  },
  data() {
    return {
      shouldShowPreview: !!this.light
    };
  },
  mounted() {
    this.getConfig = $e(this.getConfig), this.getActivePlayer = $e(this.getActivePlayer);
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
      var r, s;
      return (s = (r = this.$refs.player) == null ? void 0 : r.seekTo) == null ? void 0 : s.call(r, e, t);
    },
    getConfig(e, t) {
      var r;
      return ar.all([
        ae,
        ae[t] ?? {},
        this.config ?? {},
        ((r = this.config) == null ? void 0 : r[t]) ?? {}
      ]);
    },
    getActivePlayer(e) {
      return [...L, ...Q].find((t) => t.canPlay(e));
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
}, Lr = { key: 0 };
function Er(e, t, r, s, i, n) {
  const o = mt("Preview");
  return h(), j(F(e.wrapper), S({ ref: "wrapper" }, e.$attrs), {
    default: N(() => [
      e.url ? (h(), p("span", Lr, [
        E(e.$slots, "noUrl")
      ])) : (h(), p(H, { key: 1 }, [
        i.shouldShowPreview ? (h(), j(o, S({ key: 0 }, n.previewProps, { onClick: n.handleClickPreview }), {
          playIcon: N(() => [
            E(e.$slots, "playIcon")
          ]),
          _: 3
        }, 16, ["onClick"])) : (h(), j(F(n.currentPlayer), S({ key: 1 }, e.$props, {
          key: n.playerKey,
          ref: "player",
          config: n.playerConfig,
          activePlayer: n.playerComponent,
          style: n.playerStyles,
          onReady: n.handleReady
        }, ke(e.$listeners)), {
          none: N(() => [
            E(e.$slots, "#noPlayer")
          ]),
          _: 3
        }, 16, ["config", "activePlayer", "style", "onReady"]))
      ], 64))
    ]),
    _: 3
  }, 16);
}
const Tn = /* @__PURE__ */ g(Sr, [["render", Er]]), Or = 5e3, Tr = {
  mixins: [it],
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
    var e, t, r, s;
    clearTimeout(this.progressTimeout), clearTimeout(this.durationCheckTimeout), this.isReady && this.stopOnUnmount && ((t = (e = this.player) == null ? void 0 : e.stop) == null || t.call(e), (s = (r = this.player) == null ? void 0 : r.disablePIP) == null || s.call(r));
  },
  watch: {
    playing(e) {
      var t, r, s, i;
      e && !this.isPlaying ? ((r = (t = this.player) == null ? void 0 : t.play) == null || r.call(t), this.isPlaying = !0) : !e && this.isPlaying && ((i = (s = this.player) == null ? void 0 : s.pause) == null || i.call(s), this.isPlaying = !1);
    },
    pictureInPicture(e) {
      var t, r, s, i;
      e ? (r = (t = this.player) == null ? void 0 : t.enablePIP) == null || r.call(t) : (i = (s = this.player) == null ? void 0 : s.disablePIP) == null || i.call(s);
    },
    muted(e) {
      var t, r, s, i;
      e ? (r = (t = this.player) == null ? void 0 : t.mute) == null || r.call(t) : ((i = (s = this.player) == null ? void 0 : s.unmute) == null || i.call(s), this.volume !== null && this.$nextTick(() => {
        var n, o;
        return (o = (n = this.player) == null ? void 0 : n.setVolume) == null ? void 0 : o.call(n, volume);
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
        }, Or));
        return;
      }
      if (t ? t === "fraction" : e > 0 && e < 1) {
        const s = this.player.getDuration();
        if (!s) {
          console.warn("VuePlayer: could not seek using fraction – duration not yet available");
          return;
        }
        this.player.seekTo(s * e);
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
          const s = {
            playedSeconds: e,
            played: e / r
          };
          t !== null && (s.loadedSeconds = t, s.loaded = t / r), (s.playedSeconds !== this.prevPlayed || s.loadedSeconds !== this.prevLoaded) && this.onProgress(s), this.prevPlayed = s.playedSeconds, this.prevLoaded = s.loadedSeconds;
        }
      }
      this.progressTimeout = setTimeout(this.progress, this.progressFrequency ?? this.progressInterval);
    },
    handleReady() {
      if (!this.mounted)
        return;
      this.isReady = !0, this.isLoading = !1;
      const { onReady: e, playing: t, volume: r, muted: s } = this;
      e(), !s && r !== null && this.player.setVolume(r), this.loadOnReady ? (this.player.load(this.loadOnReady, !0), this.loadOnReady = null) : t && this.player.play(), this.handleDurationCheck();
    },
    handlePlay() {
      var s, i;
      this.isPlaying = !0, this.isLoading = !1;
      const { onStart: e, onPlay: t, playbackRate: r } = this;
      this.startOnPlay && (r !== 1 && ((i = (s = this.player) == null ? void 0 : s.setPlaybackRate) == null || i.call(s, r)), e(), this.startOnPlay = !1), t(), this.seekOnPlay && (this.seekTo(this.seekOnPlay), this.seekOnPlay = null), this.handleDurationCheck();
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
}, kr = {
  key: 1,
  class: "vue-player--none"
};
function Ar(e, t, r, s, i, n) {
  return e.activePlayer ? (h(), j(F(e.activePlayer), S({ key: 0 }, n.playerProps, {
    class: "vue-player",
    onMount: n.handlePlayerMount,
    onReady: n.handleReady,
    onPlay: n.handlePlay,
    onPause: n.handlePause,
    onEnded: n.handleEnded,
    onLoaded: n.handleLoaded,
    onError: n.handleError
  }, ke(e.$listeners)), null, 16, ["onMount", "onReady", "onPlay", "onPause", "onEnded", "onLoaded", "onError"])) : (h(), p("span", kr, [
    E(e.$slots, "none")
  ]));
}
const Dr = /* @__PURE__ */ g(Tr, [["render", Ar]]), Ir = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Dr
}, Symbol.toStringTag, { value: "Module" })), ee = {}, Rr = {
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
      else if (ee[this.url])
        this.image = ee[this.url];
      else {
        this.image = null;
        const t = await (await fetch(this.oEmbedUrl.replace("{url}", this.url))).json();
        if (typeof t.thumbnail_url < "u" && this.mounted) {
          const r = t.thumbnail_url.replace("height=100", "height=480");
          this.image = r, ee[this.url] = r;
        }
      }
    },
    watch: {
      url: "fetchImage",
      light: "fetchImage"
    }
  }
}, Cr = ["tabindex"], jr = /* @__PURE__ */ V("div", { class: "vue-player__shadow react-player__shadow" }, [
  /* @__PURE__ */ V("div", { class: "vue-player__play-icon react-player__play-icon" })
], -1);
function Mr(e, t, r, s, i, n) {
  return h(), p("div", {
    class: "vue-player__preview react-player__preview",
    tabindex: r.previewTabIndex,
    style: C(n.previewStyles),
    onClick: t[0] || (t[0] = (...o) => n.handleClick && n.handleClick(...o)),
    onKeypress: t[1] || (t[1] = (...o) => n.handleKeyPress && n.handleKeyPress(...o))
  }, [
    E(e.$slots, "playIcon", {}, () => [
      jr
    ])
  ], 44, Cr);
}
const Vr = /* @__PURE__ */ g(Rr, [["render", Mr]]), Ur = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Vr
}, Symbol.toStringTag, { value: "Module" })), xr = "https://api.dmcdn.net/all.js", Nr = "DM", Hr = "dmAsyncInit", Kr = {
  // [META]
  displayName: "DailyMotion",
  canPlay: y.dailymotion,
  loopOnEnded: !0,
  // [/META]
  mixins: [b],
  props: {
    config: Ye,
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
      const { controls: t, config: r, playing: s } = this, [, i] = e.match(lt);
      if (this.player) {
        this.player.load(i, {
          start: x(e),
          autoplay: s
        });
        return;
      }
      try {
        const n = await $(xr, Nr, Hr, (l) => l.player);
        if (!this.$refs.container)
          return;
        const o = n.player;
        this.player = new o(this.$refs.container, {
          width: "100%",
          height: "100%",
          video: i,
          params: {
            controls: t,
            autoplay: this.playing,
            mute: this.muted,
            start: x(e),
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
      } catch (n) {
        this.onError(n);
      }
    },
    onDurationChange() {
      const e = this.getDuration();
      this.onDuration(e);
    }
  }
}, Br = { ref: "container" };
function Fr(e, t, r, s, i, n) {
  return h(), p("div", {
    class: "vue-player--dailymotion",
    style: C(n.styles)
  }, [
    V("div", Br, null, 512)
  ], 4);
}
const zr = /* @__PURE__ */ g(Kr, [["render", Fr]]), Yr = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: zr
}, Symbol.toStringTag, { value: "Module" })), Se = "https://connect.facebook.net/en_US/sdk.js", Le = "FB", Ee = "fbAsyncInit", qr = "facebook-player-", Gr = {
  // [META]
  displayName: "Facebook",
  canPlay: y.facebook,
  loopOnEnabled: !0,
  // [/META]
  events: ["loaded"],
  mixins: [b],
  props: {
    config: Fe
  },
  data() {
    return {
      randomId: `${qr}${ce()}`
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
      var s, i;
      if (t) {
        const n = await $(Se, Le, Ee);
        (i = (s = n == null ? void 0 : n.XFBML) == null ? void 0 : s.parse) == null || i.call(s);
        return;
      }
      const r = await $(Se, Le, Ee);
      r.init({
        appId: this.config.appId,
        xfbml: !0,
        version: this.config.version
      }), r.Event.subscribe("xfbml.render", (n) => {
        this.onLoaded();
      }), r.Event.subscribe("xfbml.ready", (n) => {
        n.type === "video" && n.id === this.playerID && (this.player = n.instance, this.player.subscribe("startedPlaying", this.onPlay), this.player.subscribe("paused", this.onPause), this.player.subscribe("finishedPlaying", this.onEnded), this.player.subscribe("startedBuffering", this.onBuffer), this.player.subscribe("finishedBuffering", this.onBufferEnd), this.player.subscribe("error", this.onError), this.muted ? this.mute() : this.unmute(), this.onReady(), document.getElementById(this.playerID).querySelector("iframe").style.visibility = "visible");
      });
    },
    onLoaded(...e) {
      this.$emit("loaded", ...e);
    }
  }
}, Wr = ["id", "data-href", "data-autoplay", "data-controls"];
function Xr(e, t, r, s, i, n) {
  return h(), p("div", S({
    id: this.playerID,
    class: "fb-video vue-player--facebook",
    "data-href": this.url,
    "data-autoplay": this.playing ? "true" : "false",
    "data-controls": this.controls ? "true" : "false",
    "data-allowfullscreen": "true"
  }, r.config.attributes), null, 16, Wr);
}
const Zr = /* @__PURE__ */ g(Gr, [["render", Xr]]), Jr = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Zr
}, Symbol.toStringTag, { value: "Module" })), pt = typeof navigator < "u", Qr = pt && navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1, Oe = pt && (/iPad|iPhone|iPod/.test(navigator.userAgent) || Qr) && !window.MSStream, es = "https://cdn.jsdelivr.net/npm/hls.js@VERSION/dist/hls.min.js", ts = "Hls", rs = "https://cdnjs.cloudflare.com/ajax/libs/dashjs/VERSION/dash.all.min.js", ss = "dashjs", ns = "https://cdn.jsdelivr.net/npm/flv.js@VERSION/dist/flv.min.js", is = "flvjs", as = /www\.dropbox\.com\/.+/, te = /https:\/\/watch\.cloudflarestream\.com\/([a-z0-9]+)/, os = "https://videodelivery.net/{id}/manifest/video.m3u8", ls = {
  // [META]
  displayName: "FilePlayer",
  canPlay: y.file,
  // [/META]
  mixins: [b],
  props: {
    config: Xe
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
      return (e = this.config) != null && e.forceVideo || this.config.attributes.poster ? !1 : q.test(this.url) || this.config.forceAudio;
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
    this.addListeners(this.$refs.player), Oe && ((t = (e = this.$refs.player) == null ? void 0 : e.load) == null || t.call(e)), this.$watch(
      () => this.$refs.player,
      (r, s) => {
        this.prevPlayer = s;
      }
    );
  },
  beforeUnmount() {
    var e, t;
    this.prevPlayer = null, this.removeListeners(this.$refs.player), (t = (e = this.hls) == null ? void 0 : e.destroy) == null || t.call(e);
  },
  watch: {
    url(e, t) {
      this.prevUrl = t, !K(e) && this.$refs.player && (this.$refs.player.srcObject = null);
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
      var e, t, r, s;
      (t = (e = this.$refs.player) == null ? void 0 : e.removeAttribute) == null || t.call(e, "src"), (s = (r = this.dash) == null ? void 0 : r.reset) == null || s.call(r);
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
      var e, t, r, s, i, n;
      (e = this.$refs.player) != null && e.requestPictureInPicture && document.pictureInPictureElement !== this.$refs.player ? ((r = (t = this.$refs.player) == null ? void 0 : t.requestPictureInPicture) == null || r.call(t), this.onEnablePIP()) : B(this.$refs.player) && ((s = this.$refs.player) == null ? void 0 : s.webkitPresentationMode) !== "picture-in-picture" && ((n = (i = this.$refs.player) == null ? void 0 : i.webkitSetPresentationMode) == null || n.call(i, "picture-in-picture"), this.onEnablePIP());
    },
    /**
     * @inheritDoc
     * @override
     * @playerHook disablePIP
     */
    disablePIP() {
      var e, t, r;
      document.exitPictureInPicture && document.pictureInPictureElement === this.$refs.player ? (document.exitPictureInPicture(), this.onDisablePIP()) : B(this.$refs.player) && ((e = this.$refs.player) == null ? void 0 : e.webkitPresentationMode) !== "inline" && ((r = (t = this.$refs.player) == null ? void 0 : t.webkitSetPresentationMode) == null || r.call(t, "inline"), this.onDisablePIP());
    },
    async load(e) {
      var n, o, l, u, c, d;
      const { hlsVersion: t, hlsOptions: r, dashVersion: s, flvVersion: i } = this.config;
      if ((o = (n = this.hls) == null ? void 0 : n.destroy) == null || o.call(n), (u = (l = this.dash) == null ? void 0 : l.reset) == null || u.call(l), this.shouldUseHLS(e)) {
        const f = await getSDK(es.replace("VERSION", t), ts);
        if (this.hls = new f(r), this.hls.on(f.Events.MANIFEST_PARSED, () => {
          this.onReady();
        }), this.hls.on(f.Events.ERROR, (w, v) => {
          this.onError(w, v, this.hls, f);
        }), te.test(e)) {
          const w = e.match(te)[1];
          this.hls.loadSource(os.replace("{id}", w));
        } else
          this.hls.loadSource(e);
        this.hls.attachMedia(this.$refs.player), this.onLoaded();
      } else if (this.shouldUseDASH(e)) {
        const f = await getSDK(rs.replace("VERSION", s), ss);
        this.dash = f.MediaPlayer().create(), this.dash.initialize(this.$refs.player, e, this.playing), this.dash.on("error", this.onError), parseInt(s) < 3 ? this.dash.getDebug().setLogToBrowserConsole(!1) : this.dash.updateSettings({ debug: { logLevel: f.Debug.LOG_LEVEL_NONE } }), this.onLoaded();
      } else if (this.shouldUseFLV(e)) {
        const f = await getSDK(ns.replace("VERSION", i), is);
        this.flv = f.createPlayer({ type: "flv", url: e }), this.flv.attachMediaElement(this.$refs.player), this.flv.load(), this.onLoaded();
      }
      if (e instanceof Array)
        (d = (c = this.$refs.player) == null ? void 0 : c.load) == null || d.call(c);
      else if (K(e))
        try {
          this.$refs.player.srcObject = e;
        } catch {
          this.$refs.player.src = URL.createObjectURL(e);
        }
    },
    getSource(e) {
      const t = this.shouldUseHLS(e), r = this.shouldUseDASH(e), s = this.shouldUseFLV(e);
      if (!(e instanceof Array || K(e) || t || r || s))
        return as.test(e) ? e.replace("www.dropbox.com", "dl.dropboxusercontent.com") : e;
    },
    onPresentationModeChange(e) {
      if (this.$refs.player && B(this.$refs.player)) {
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
      return (t = this.config) != null && t.forceHLS ? !0 : Oe ? !1 : de.test(e) || te.test(e);
    },
    shouldUseDASH(e) {
      return ht.test(e) || this.props.config.forceDASH;
    },
    shouldUseFLV(e) {
      return yt.test(e) || this.props.config.forceFLV;
    }
  }
}, us = ["src"];
function cs(e, t, r, s, i, n) {
  return h(), j(F(n.tag), S({
    ref: "player",
    class: "vue-player--file",
    style: n.styles,
    preload: "auto",
    src: n.src,
    autoplay: e.playing,
    controls: e.controls,
    muted: e.muted,
    loop: e.loop
  }, r.config.attributes), {
    default: N(() => [
      n.urlIsArray ? (h(), p(H, { key: 0 }, [
        (h(!0), p(H, null, he(this.url, (o, l) => E(e.$slots, "source", ye(pe({ source: o })), () => [
          typeof o == "string" ? (h(), p("source", {
            src: o,
            key: o
          }, null, 8, us)) : (h(), p("source", S({ key: l }, o), null, 16))
        ])), 256)),
        (h(!0), p(H, null, he(this.config.tracks, (o, l) => E(e.$slots, "track", ye(pe({ track: o })), () => [
          (h(), p("track", S({ key: l }, o), null, 16))
        ])), 256))
      ], 64)) : gt("", !0)
    ]),
    _: 3
  }, 16, ["style", "src", "autoplay", "controls", "muted", "loop"]);
}
const ds = /* @__PURE__ */ g(ls, [["render", cs]]), hs = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: ds
}, Symbol.toStringTag, { value: "Module" })), ys = "https://cdn.embed.ly/player-0.1.0.min.js", ps = "playerjs", fs = {
  // [META]
  displayName: "Kaltura",
  canPlay: y.kaltura,
  // [/META]
  mixins: [b],
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
        const t = await $(ys, ps);
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
        const s = this.duration !== t;
        this.duration = t, this.currentTime = r, s && this.onDuration(t), this.onSeek(r);
      });
    }
  }
}, ms = ["src"];
function gs(e, t, r, s, i, n) {
  return h(), p("iframe", {
    class: "vue-player--kaltura",
    ref: "iframe",
    src: e.url,
    frameborder: "0",
    scrolling: "no",
    allowfullscreen: "",
    allow: "encrypted-media;autoplay",
    referrerpolicy: "no-referrer-when-downgrade"
  }, null, 8, ms);
}
const Ps = /* @__PURE__ */ g(fs, [["render", gs]]), bs = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Ps
}, Symbol.toStringTag, { value: "Module" })), vs = "https://widget.mixcloud.com/media/js/widgetApi.js", _s = "Mixcloud", ws = {
  // [META]
  displayName: "Mixcloud",
  canPlay: y.mixcloud,
  // [/META]
  mixins: [b],
  props: {
    config: et
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
      return this.url.match(ut)[1];
    },
    /**
     * @type {string}
     */
    query() {
      return dr({
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
        const t = await $(vs, _s);
        this.player = t.PlayerWidget(this.$refs.iframe), this.player.ready.then(() => {
          this.player.events.play.on(this.onPlay), this.player.events.pause.on(this.onPause), this.player.events.ended.on(this.onEnded), this.player.events.error.on(this.onError), this.player.events.progress.on((r, s) => {
            this.currentTime = r, this.duration = s;
          }), this.onReady();
        });
      } catch (t) {
        this.onError(t);
      }
    }
  }
}, $s = ["src"];
function Ss(e, t, r, s, i, n) {
  return h(), p("iframe", {
    key: n.id,
    ref: "iframe",
    src: n.src,
    class: "vue-player--mixcloud",
    frameborder: "0"
  }, null, 8, $s);
}
const Ls = /* @__PURE__ */ g(ws, [["render", Ss]]), Es = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Ls
}, Symbol.toStringTag, { value: "Module" })), Os = "https://w.soundcloud.com/player/api.js", Ts = "SC", ks = {
  // [META]
  displayName: "Soundcloud",
  canPlay: y.soundcloud,
  loopOnEnded: !0,
  // [/META]
  mixins: [b],
  props: {
    config: Ne,
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
        const r = await $(Os, Ts);
        if (!this.iframe)
          return;
        const { PLAY: s, PLAY_PROGRESS: i, PAUSE: n, FINISH: o, ERROR: l } = r.Widget.Events;
        t || (this.player = r.Widget(this.$refs.iframe), this.player.bind(s, this.onPlay), this.player.bind(n, () => {
          this.duration - this.currentTime < 0.05 || this.onPause();
        }), this.player.bind(i, (u) => {
          this.currentTime = u.currentPosition / 1e3, this.fractionLoaded = u.loadedProgress;
        }), this.player.bind(o, this.onEnded), this.player.bind(l, this.onError)), this.player.load(e, {
          ...this.config.options,
          callback: () => {
            this.player.getDuration((u) => {
              this.duration = u / 1e3, this.onReady();
            });
          }
        });
      } catch (r) {
        this.onError(r);
      }
    }
  }
}, As = ["src"];
function Ds(e, t, r, s, i, n) {
  return h(), p("iframe", {
    ref: "iframe",
    class: "vue-player--soundcloud",
    style: C(n.styles),
    src: n.src,
    frameborder: "0",
    allow: "autoplay"
  }, null, 12, As);
}
const Is = /* @__PURE__ */ g(ks, [["render", Ds]]), Rs = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Is
}, Symbol.toStringTag, { value: "Module" })), Cs = "https://cdn.embed.ly/player-0.1.0.min.js", js = "playerjs", Ms = {
  // [META]
  displayName: "Streamable",
  canPlay: y.streamable,
  // [/META]
  mixins: [b],
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
      return this.url.match(at)[1];
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
        const t = await getSDK(Cs, js);
        if (!this.iframe)
          return;
        this.player = new t.Player(this.$refs.iframe), this.player.setLoop(this.loop), this.player.on("ready", this.onReady), this.player.on("play", this.onPlay), this.player.on("pause", this.onPause), this.player.on("seeked", this.onSeek), this.player.on("ended", this.onEnded), this.player.on("error", this.onError), this.player.on("timeupdate", ({ duration: r, seconds: s }) => {
          this.duration = r, this.currentTime = s;
        }), this.player.on("buffered", ({ percent: r }) => {
          this.duration && (this.secondsLoaded = this.duration * r);
        }), this.muted && this.player.mute();
      } catch (t) {
        this.onError(t);
      }
    }
  }
}, Vs = ["src"];
function Us(e, t, r, s, i, n) {
  return h(), p("iframe", {
    class: "vue-player--streamable",
    ref: "iframe",
    src: n.src,
    frameborder: "0",
    scrolling: "no",
    allowfullscreen: ""
  }, null, 8, Vs);
}
const xs = /* @__PURE__ */ g(Ms, [["render", Us]]), Ns = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: xs
}, Symbol.toStringTag, { value: "Module" })), Hs = "https://player.twitch.tv/js/embed/v1.js", Ks = "Twitch", Bs = "twitch-player-", Fs = {
  // [META]
  displayName: "Twitch",
  canPlay: y.twitch,
  loopOnEnded: !0,
  // [/META]
  mixins: [b],
  props: {
    config: rt
  },
  data() {
    return {
      randomId: `${Bs}${ce()}`
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
      var r, s, i, n;
      try {
        const { playsinline: o, config: l, controls: u } = this, c = oe.test(e), d = c ? e.match(oe)[1] : e.match(MATCH_URL_TWITCH_VIDEO)[1];
        if (t) {
          c ? (s = (r = this.player) == null ? void 0 : r.setChannel) == null || s.call(r, d) : (n = (i = this.player) == null ? void 0 : i.setVideo) == null || n.call(i, "v" + d);
          return;
        }
        const f = await getSDK(Hs, Ks);
        this.player = new f.Player(this.pid, {
          video: c ? "" : d,
          channel: c ? d : "",
          height: "100%",
          width: "100%",
          playsinline: o,
          autoplay: this.playing,
          muted: this.muted,
          // https://github.com/CookPete/react-player/issues/733#issuecomment-549085859
          controls: c ? !0 : u,
          time: x(e),
          ...l.options
        });
        const { READY: w, PLAYING: v, PAUSE: G, ENDED: W, ONLINE: X, OFFLINE: Z, SEEK: ft } = f.Player;
        this.player.addEventListener(w, this.onReady), this.player.addEventListener(v, this.onPlay), this.player.addEventListener(G, this.onPause), this.player.addEventListener(W, this.onEnded), this.player.addEventListener(ft, this.onSeek), this.player.addEventListener(X, this.onLoaded), this.player.addEventListener(Z, this.onLoaded);
      } catch (o) {
        this.onError(o);
      }
    }
  }
}, zs = ["id"];
function Ys(e, t, r, s, i, n) {
  return h(), p("div", {
    class: "vue-player--twitch",
    id: n.pid
  }, null, 8, zs);
}
const qs = /* @__PURE__ */ g(Fs, [["render", Ys]]), Gs = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: qs
}, Symbol.toStringTag, { value: "Module" })), Ws = "https://play.vidyard.com/embed/v4.js", Xs = "VidyardV4", Zs = "onVidyardAPI", Js = {
  // [META]
  displayName: "Vidyard",
  canPlay: y.vidyard,
  // [/META]
  mixins: [b],
  props: {
    config: nt,
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
        const { playing: t, config: r } = this, s = (e ?? this.url).match(ct)[1];
        this.player && this.stop();
        const i = await $(Ws, Xs, Zs);
        if (!this.$refs.container)
          return;
        i.api.addReadyListener((n, o) => {
          this.player = o, this.player.on("ready", this.onReady), this.player.on("play", this.onPlay), this.player.on("pause", this.onPause), this.player.on("seek", this.onSeek), this.player.on("playerComplete", this.onEnded);
        }, s), i.api.renderPlayer({
          uuid: s,
          container: this.$refs.container,
          autoplay: t ? 1 : 0,
          ...r.options
        }), i.api.getPlayerMetadata(s).then((n) => {
          this.duration = n.length_in_seconds, this.onDuration(n.length_in_seconds);
        });
      } catch (t) {
        this.onError(t);
      }
    }
  }
}, Qs = { ref: "container" };
function en(e, t, r, s, i, n) {
  return h(), p("div", {
    style: C(n.styles)
  }, [
    V("div", Qs, null, 512)
  ], 4);
}
const tn = /* @__PURE__ */ g(Js, [["render", en]]), rn = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: tn
}, Symbol.toStringTag, { value: "Module" })), sn = "https://player.vimeo.com/api/player.js", nn = "Vimeo", an = {
  // [META]
  displayName: "Vimeo",
  canPlay: y.vimeo,
  forceLoad: !0,
  // [/META]
  mixins: [b],
  props: {
    config: Ge,
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
        const t = await $(sn, nn);
        if (!this.$refs.container)
          return;
        const { playerOptions: r, title: s } = this.config;
        this.player = new t.Player(this.$refs.container, {
          url: e,
          autoplay: this.playing,
          muted: this.muted,
          loop: this.loop,
          playsinline: this.playsinline,
          controls: this.controls,
          ...r
        }), this.player.ready().then(() => {
          const i = this.$refs.container.querySelector("iframe");
          i.style.width = "100%", i.style.height = "100%", s && (i.title = s);
        }).catch(this.onError), this.player.on("loaded", () => {
          this.onReady(), this.refreshDuration();
        }), this.player.on("play", () => {
          this.onPlay(), this.refreshDuration();
        }), this.player.on("pause", this.onPause), this.player.on("seeked", (i) => this.onSeek(i.seconds)), this.player.on("ended", this.onEnded), this.player.on("error", this.onError), this.player.on("timeupdate", ({ seconds: i }) => {
          this.currentTime = i;
        }), this.player.on("progress", ({ seconds: i }) => {
          this.secondsLoaded = i;
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
function on(e, t, r, s, i, n) {
  return h(), p("div", {
    key: this.url,
    style: C(n.styles),
    ref: "container"
  }, null, 4);
}
const ln = /* @__PURE__ */ g(an, [["render", on]]), un = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: ln
}, Symbol.toStringTag, { value: "Module" })), cn = "https://fast.wistia.com/assets/external/E-v1.js", dn = "Wistia", hn = "wistia-player-", yn = {
  // [META]
  displayName: "Wistia",
  canPlay: y.wistia,
  loopOnEnded: !0,
  // [/META]
  mixins: [b],
  props: {
    config: Je
  },
  data() {
    return {
      randomId: `${hn}${ce()}`
    };
  },
  computed: {
    pid() {
      return this.config.playerId ?? this.randomId;
    },
    videoId() {
      var e, t, r;
      return (r = (t = (e = this.url) == null ? void 0 : e.match) == null ? void 0 : t.call(e, ot)) == null ? void 0 : r[1];
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
        const { playing: s, muted: i, controls: n, onReady: o, config: l, onError: u } = this, c = await getSDK(cn, dn);
        (r = (t = l.customControls) == null ? void 0 : t.forEach) == null || r.call(t, (d) => c.defineControl(d)), window._wq = window._wq || [], window._wq.push({
          id: this.playerID,
          options: {
            autoPlay: s,
            silentAutoPlay: "allow",
            muted: i,
            controlsVisibleOnLoad: n,
            fullscreenButton: n,
            playbar: n,
            playbackRateControl: n,
            qualityControl: n,
            volumeControl: n,
            settingsControl: n,
            smallPlayButton: n,
            ...l.options
          },
          onReady: (d) => {
            this.player = d, this.unbind(), this.player.bind("play", this.onPlay), this.player.bind("pause", this.onPause), this.player.bind("seek", this.onSeek), this.player.bind("end", this.onEnded), this.player.bind("playbackratechange", this.onPlaybackRateChange), o();
          }
        });
      } catch (s) {
        this.onError(s);
      }
    },
    unbind() {
      var e, t, r, s, i, n, o, l, u, c;
      (t = (e = this.player) == null ? void 0 : e.unbind) == null || t.call(e, "play", this.onPlay), (s = (r = this.player) == null ? void 0 : r.unbind) == null || s.call(r, "pause", this.onPause), (n = (i = this.player) == null ? void 0 : i.unbind) == null || n.call(i, "seek", this.onSeek), (l = (o = this.player) == null ? void 0 : o.unbind) == null || l.call(o, "end", this.onEnded), (c = (u = this.player) == null ? void 0 : u.unbind) == null || c.call(u, "playbackratechange", this.onPlaybackRateChange);
    }
  }
}, pn = ["id"];
function fn(e, t, r, s, i, n) {
  return h(), p("div", {
    id: n.pid,
    key: n.videoId,
    class: Pt(n.className)
  }, null, 10, pn);
}
const mn = /* @__PURE__ */ g(yn, [["render", fn]]), gn = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: mn
}, Symbol.toStringTag, { value: "Module" })), Pn = "https://www.youtube.com/iframe_api", Te = "YT", bn = "onYouTubeIframeAPIReady", re = /[?&](?:list|channel)=([a-zA-Z0-9_-]+)/, se = /user\/([a-zA-Z0-9_-]+)\/?/, vn = /youtube-nocookie\.com/, _n = "https://www.youtube-nocookie.com", wn = {
  // [META]
  displayName: "YouTube",
  canPlay: y.youtube,
  // [/META]
  mixins: [b],
  props: {
    config: Ke
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
        const { playing: r, muted: s, playsinline: i, controls: n, loop: o, config: l, onError: u } = this, { playerVars: c, embedOptions: d } = l, f = this.getID(e);
        if (t) {
          if (re.test(e) || se.test(e) || e instanceof Array) {
            this.player.loadPlaylist(this.parsePlaylist(e));
            return;
          }
          this.player.cueVideoById({
            videoId: f,
            startSeconds: x(e) || c.start,
            endSeconds: ve(e) || c.end
          });
          return;
        }
        const w = await $(Pn, Te, bn, (v) => v.loaded);
        if (!this.container)
          return;
        this.player = new w.Player(this.container, {
          width: "100%",
          height: "100%",
          videoId: f,
          playerVars: {
            autoplay: r ? 1 : 0,
            mute: s ? 1 : 0,
            controls: n ? 1 : 0,
            start: x(e),
            end: ve(e),
            origin: window.location.origin,
            playsinline: i ? 1 : 0,
            ...this.parsePlaylist(e),
            ...c
          },
          events: {
            onReady: () => {
              o && this.player.setLoop(!0), this.onReady();
            },
            onPlaybackRateChange: (v) => this.onPlaybackRateChange(v.data),
            onStateChange: this.onStateChange,
            onError: (v) => u(v.data)
          },
          host: vn.test(e) ? _n : void 0,
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
      if (re.test(e)) {
        const [, t] = e.match(re);
        return {
          listType: "playlist",
          list: t.replace(/^UC/, "UU")
        };
      }
      if (se.test(e)) {
        const [, t] = e.match(se);
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
        onPause: s,
        onBuffer: i,
        onBufferEnd: n,
        onEnded: o,
        onReady: l,
        loop: u,
        config: { playerVars: c, onUnstarted: d }
      } = this, { UNSTARTED: f, PLAYING: w, PAUSED: v, BUFFERING: G, ENDED: W, CUED: X } = window[Te].PlayerState;
      if (t === f && d(), t === w && (r(), n()), t === v && s(), t === G && i(), t === W) {
        const Z = !!this.callPlayer("getPlaylist");
        u && !Z && (c.start ? this.seekTo(c.start) : this.play()), o();
      }
      t === X && l();
    }
  }
}, $n = { ref: "container" };
function Sn(e, t, r, s, i, n) {
  return h(), p("div", {
    class: "vue-player--youtube",
    style: C(n.styles)
  }, [
    V("div", $n, null, 512)
  ], 4);
}
const Ln = /* @__PURE__ */ g(wn, [["render", Sn]]), En = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Ln
}, Symbol.toStringTag, { value: "Module" }));
export {
  zr as DailyMotionPlayer,
  Zr as FacebookPlayer,
  ds as FilePlayer,
  Ps as KalturaPlayer,
  Ls as MixcloudPlayer,
  Dr as Player,
  Vr as Preview,
  Is as SoundcloudPlayer,
  xs as StreamablePlayer,
  qs as TwitchPlayer,
  tn as VidyardPlayer,
  ln as VimeoPlayer,
  Tn as VuePlayer,
  mn as WistiaPlayer,
  Ln as YouTubePlayer,
  b as playerMixin
};

import a from "vue-types";
import { resolveComponent as qe, openBlock as c, createBlock as T, resolveDynamicComponent as M, mergeProps as v, withCtx as A, createElementBlock as y, renderSlot as S, Fragment as I, toHandlers as ye, normalizeStyle as $, createElementVNode as k, renderList as J, normalizeProps as ee, guardReactiveProps as te, createCommentVNode as We, normalizeClass as Xe } from "vue";
function pe(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var Ze = function(t, s, r) {
  var n = document.head || document.getElementsByTagName("head")[0], i = document.createElement("script");
  typeof s == "function" && (r = s, s = {}), s = s || {}, r = r || function() {
  }, i.type = s.type || "text/javascript", i.charset = s.charset || "utf8", i.async = "async" in s ? !!s.async : !0, i.src = t, s.attrs && Qe(i, s.attrs), s.text && (i.text = "" + s.text);
  var o = "onload" in i ? se : Je;
  o(i, r), i.onload || se(i, r), n.appendChild(i);
};
function Qe(e, t) {
  for (var s in t)
    e.setAttribute(s, t[s]);
}
function se(e, t) {
  e.onload = function() {
    this.onerror = this.onload = null, t(null, e);
  }, e.onerror = function() {
    this.onerror = this.onload = null, t(new Error("Failed to load " + this.src), e);
  };
}
function Je(e, t) {
  e.onreadystatechange = function() {
    this.readyState != "complete" && this.readyState != "loaded" || (this.onreadystatechange = null, t(null, e));
  };
}
const et = /* @__PURE__ */ pe(Ze);
var tt = function(t) {
  return st(t) && !rt(t);
};
function st(e) {
  return !!e && typeof e == "object";
}
function rt(e) {
  var t = Object.prototype.toString.call(e);
  return t === "[object RegExp]" || t === "[object Date]" || at(e);
}
var it = typeof Symbol == "function" && Symbol.for, nt = it ? Symbol.for("react.element") : 60103;
function at(e) {
  return e.$$typeof === nt;
}
function ot(e) {
  return Array.isArray(e) ? [] : {};
}
function O(e, t) {
  return t.clone !== !1 && t.isMergeableObject(e) ? E(ot(e), e, t) : e;
}
function lt(e, t, s) {
  return e.concat(t).map(function(r) {
    return O(r, s);
  });
}
function dt(e, t) {
  if (!t.customMerge)
    return E;
  var s = t.customMerge(e);
  return typeof s == "function" ? s : E;
}
function ct(e) {
  return Object.getOwnPropertySymbols ? Object.getOwnPropertySymbols(e).filter(function(t) {
    return Object.propertyIsEnumerable.call(e, t);
  }) : [];
}
function re(e) {
  return Object.keys(e).concat(ct(e));
}
function fe(e, t) {
  try {
    return t in e;
  } catch {
    return !1;
  }
}
function ut(e, t) {
  return fe(e, t) && !(Object.hasOwnProperty.call(e, t) && Object.propertyIsEnumerable.call(e, t));
}
function ht(e, t, s) {
  var r = {};
  return s.isMergeableObject(e) && re(e).forEach(function(n) {
    r[n] = O(e[n], s);
  }), re(t).forEach(function(n) {
    ut(e, n) || (fe(e, n) && s.isMergeableObject(t[n]) ? r[n] = dt(n, s)(e[n], t[n], s) : r[n] = O(t[n], s));
  }), r;
}
function E(e, t, s) {
  s = s || {}, s.arrayMerge = s.arrayMerge || lt, s.isMergeableObject = s.isMergeableObject || tt, s.cloneUnlessOtherwiseSpecified = O;
  var r = Array.isArray(t), n = Array.isArray(e), i = r === n;
  return i ? r ? s.arrayMerge(e, t, s) : ht(e, t, s) : O(t, s);
}
E.all = function(t, s) {
  if (!Array.isArray(t))
    throw new Error("first argument should be an array");
  return t.reduce(function(r, n) {
    return E(r, n, s);
  }, {});
};
var yt = E, pt = yt;
const ft = /* @__PURE__ */ pe(pt), mt = /[?&#](?:start|t)=([0-9hms]+)/, Pt = /[?&#]end=([0-9hms]+)/, G = /(\d+)([hms])/g, gt = /^\d+$/;
function me(e, t) {
  if (e instanceof Array)
    return;
  const s = e.match(t);
  if (s) {
    const r = s[1];
    if (r.match(G))
      return bt(r);
    if (gt.test(r))
      return parseInt(r);
  }
}
function bt(e) {
  let t = 0, s = G.exec(e);
  for (; s !== null; ) {
    const [, r, n] = s;
    n === "h" && (t += parseInt(r, 10) * 60 * 60), n === "m" && (t += parseInt(r, 10) * 60), n === "s" && (t += parseInt(r, 10)), s = G.exec(e);
  }
  return t;
}
function D(e) {
  return me(e, mt);
}
function ie(e) {
  return me(e, Pt);
}
function Z() {
  return Math.random().toString(36).substr(2, 5);
}
function _t(e) {
  return Object.keys(e).map((t) => `${t}=${e[t]}`).join("&");
}
function H(e) {
  return window[e] ? window[e] : window.exports && window.exports[e] ? window.exports[e] : window.module && window.module.exports && window.module.exports[e] ? window.module.exports[e] : null;
}
const L = {};
function _(e, t, s = null, r = () => !0, n = et) {
  const i = H(t);
  return i && r(i) ? Promise.resolve(i) : new Promise((o, d) => {
    if (L[e]) {
      L[e].push({ resolve: o, reject: d });
      return;
    }
    L[e] = [{ resolve: o, reject: d }];
    const h = (l) => {
      L[e].forEach((p) => p.resolve(l));
    };
    if (s) {
      const l = window[s];
      window[s] = function() {
        l && l(), h(H(t));
      };
    }
    n(e, (l) => {
      l ? (L[e].forEach((p) => p.reject(l)), L[e] = null) : s || h(H(t));
    });
  });
}
function vt(e, ...t) {
  if (!this.player || !this.player[e]) {
    let s = `VuePlayer: ${this.$options.displayName} player could not call %c${e}%c – `;
    return this.player ? this.player[e] || (s += "The method was not available") : s += "The player was not available", console.warn(s, "font-weight: bold", ""), null;
  }
  return this.player[e](...t);
}
function R(e) {
  return typeof MediaStream < "u" && e instanceof MediaStream || typeof window < "u" && typeof window.MediaStream < "u" && e instanceof window.MediaStream;
}
function wt(e) {
  return /^blob:/.test(e);
}
function C(e = document.createElement("video")) {
  const t = !/iPhone|iPod/.test(navigator.userAgent);
  return typeof e.webkitSetPresentationMode == "function" && t;
}
const P = {
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
      return vt.apply(this, [e, ...t]);
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
}, Pe = {
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
}, ge = a.shape({
  options: a.shape({
    visual: a.bool,
    buying: a.bool,
    liking: a.bool,
    download: a.bool,
    sharing: a.bool,
    show_comments: a.bool,
    show_playcount: a.bool
  }).loose
}).loose.def(() => Pe), be = {
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
}, _e = a.shape({
  playerVars: a.shape({
    playsinline: a.integer,
    showinfo: a.integer,
    rel: a.integer,
    iv_load_policy: a.integer,
    modestbranding: a.integer
  }).loose,
  embedOptions: a.object,
  onUnstarted: a.func
}).loose.def(() => be), ve = {
  appId: "1309697205772819",
  version: "v3.3",
  playerId: null,
  attributes: {}
}, we = a.shape({
  appId: a.string,
  version: a.string,
  playerId: a.string,
  attributes: a.object
}).loose.def(() => ve), Se = {
  params: {
    api: 1,
    "endscreen-enable": !1
  }
}, Le = a.shape({
  params: a.shape({
    api: a.integer,
    "endscreen-enable": a.bool
  }).loose
}).loose.def(() => Se), Ee = {
  playerOptions: {
    autopause: !1,
    byline: !1,
    portrait: !1,
    title: !1
  },
  title: null
}, $e = a.shape({
  playerOptions: a.shape({
    autopause: a.bool,
    byline: a.bool,
    portrait: a.bool,
    title: a.bool
  }).loose,
  title: a.string
}).loose.def(() => Ee), Te = {
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
}, ke = a.shape({
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
}).loose.def(() => Te), Oe = {
  wistia: {
    options: {},
    playerId: null,
    customControls: null
  }
}, De = a.shape({
  wistia: a.shape({
    options: a.object,
    playerId: a.string,
    customControls: a.array
  }).loose
}).loose.def(() => Oe), Ae = {
  options: {
    hide_cover: 1
  }
}, Ie = a.shape({
  options: a.shape({
    hide_cover: a.integer
  }).loose
}).loose.def(() => Ae), Re = {
  options: {},
  playerId: null
}, Ce = a.shape({
  options: a.object,
  playerId: a.string
}).loose.def(() => Re), Me = {
  options: {}
}, Ve = a.shape({
  options: a.object
}).loose.def(() => Me), q = {
  soundcloud: Pe,
  youtube: be,
  facebook: ve,
  dailymotion: Se,
  vimeo: Ee,
  file: Te,
  wistia: Oe,
  mixcloud: Ae,
  twitch: Re,
  vidyard: Me
}, St = a.shape({
  soundcloud: ge,
  youtube: _e,
  facebook: we,
  dailymotion: Le,
  vimeo: $e,
  file: ke,
  wistia: De,
  mixcloud: Ie,
  twitch: Ce,
  vidyard: Ve
}).def(() => q), Lt = a.oneOfType([
  a.object,
  a.string,
  a.func
]), je = {
  mixins: [P],
  props: {
    config: St,
    progressFrequency: a.number,
    activePlayer: Lt
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
const ne = /(?:youtu\.be\/|youtube(?:-nocookie)?\.com\/(?:embed\/|v\/|watch\/|watch\?v=|watch\?.+&v=))((\w|-){11})|youtube\.com\/playlist\?list=|youtube\.com\/user\//, Et = /(?:soundcloud\.com|snd\.sc)\/[^.]+$/, $t = /vimeo\.com\/(?!progressive_redirect).+/, Tt = /^https?:\/\/(www\.)?facebook\.com.*\/(video(s)?|watch|story)(\.php?|\/).+$/, kt = /^https?:\/\/fb\.watch\/.+$/, Ue = /streamable\.com\/([a-z0-9]+)$/, xe = /(?:wistia\.(?:com|net)|wi\.st)\/(?:medias|embed)\/(?:iframe\/)?(.*)$/, Ot = /(?:www\.|go\.)?twitch\.tv\/videos\/(\d+)($|\?)/, W = /(?:www\.|go\.)?twitch\.tv\/([a-zA-Z0-9_]+)($|\?)/, Ne = /^(?:(?:https?):)?(?:\/\/)?(?:www\.)?(?:(?:dailymotion\.com(?:\/embed)?\/video)|dai\.ly)\/([a-zA-Z0-9]+)(?:_[\w_-]+)?$/, He = /mixcloud\.com\/([^/]+\/[^/]+)/, Ke = /vidyard.com\/(?:watch\/)?([a-zA-Z0-9-_]+)/, Dt = /^https?:\/\/[a-zA-Z]+\.kaltura.(com|org)\/p\/([0-9]+)\/sp\/([0-9]+)00\/embedIframeJs\/uiconf_id\/([0-9]+)\/partner_id\/([0-9]+)(.*)entry_id.([a-zA-Z0-9-_]+)$/, V = /\.(m4a|m4b|mp4a|mpga|mp2|mp2a|mp3|m2a|m3a|wav|weba|aac|oga|spx)($|\?)/i, Be = /\.(mp4|og[gv]|webm|mov|m4v)(#t=[,\d+]+)?($|\?)/i, Q = /\.(m3u8)($|\?)/i, Fe = /\.(mpd)($|\?)/i, ze = /\.(flv)($|\?)/i, X = (e) => {
  if (e instanceof Array) {
    for (const t of e)
      if (typeof t == "string" && X(t) || X(t.src))
        return !0;
    return !1;
  }
  return R(e) || wt(e) ? !0 : V.test(e) || Be.test(e) || Q.test(e) || Fe.test(e) || ze.test(e);
}, u = {
  /**
   * @type {CanPlayUrl}
   */
  youtube: (e) => e instanceof Array ? e.every((t) => ne.test(t)) : ne.test(e),
  /**
   * @type {CanPlayUrl}
   */
  soundcloud: (e) => Et.test(e) && !V.test(e),
  /**
   * @type {CanPlayUrl}
   */
  vimeo: (e) => $t.test(e) && !Be.test(e) && !Q.test(e),
  /**
   * @type {CanPlayUrl}
   */
  facebook: (e) => Tt.test(e) || kt.test(e),
  /**
   * @type {CanPlayUrl}
   */
  streamable: (e) => Ue.test(e),
  /**
   * @type {CanPlayUrl}
   */
  wistia: (e) => xe.test(e),
  /**
   * @type {CanPlayUrl}
   */
  twitch: (e) => Ot.test(e) || W.test(e),
  /**
   * @type {CanPlayUrl}
   */
  dailymotion: (e) => Ne.test(e),
  /**
   * @type {CanPlayUrl}
   */
  mixcloud: (e) => He.test(e),
  /**
   * @type {CanPlayUrl}
   */
  vidyard: (e) => Ke.test(e),
  /**
   * @type {CanPlayUrl}
   */
  kaltura: (e) => Dt.test(e),
  /**
   * @type {CanPlayUrl}
   */
  file: X
}, K = [
  /**
   * @type {PlayerDecl<"youtube", "YouTube", import("./components/players/YouTubePlayer.vue").default>}
   */
  {
    key: "youtube",
    name: "YouTube",
    canPlay: u.youtube,
    lazyPlayer: () => Promise.resolve().then(() => Cr)
  },
  /**
   * @type {PlayerDecl<"soundcloud", "SoundCloud", import("./components/players/SoundCloudPlayer.vue").default>}
   */
  {
    key: "soundcloud",
    name: "SoundCloud",
    canPlay: u.soundcloud,
    lazyPlayer: () => Promise.resolve().then(() => Ks)
  },
  /**
   * @type {PlayerDecl<"vimeo", "Vimeo", import("./components/players/VimeoPlayer.vue").default>}
   */
  {
    key: "vimeo",
    name: "Vimeo",
    canPlay: u.vimeo,
    lazyPlayer: () => Promise.resolve().then(() => Pr)
  },
  /**
   * @type {PlayerDecl<"facebook", "Facebook", import("./components/players/FacebookPlayer.vue").default>}
   */
  {
    key: "facebook",
    name: "Facebook",
    canPlay: u.facebook,
    lazyPlayer: () => Promise.resolve().then(() => os)
  },
  /**
   * @type {PlayerDecl<"streamable", "Streamable", import("./components/players/StreamablePlayer.vue").default>}
   */
  {
    key: "streamable",
    name: "Streamable",
    canPlay: u.streamable,
    lazyPlayer: () => Promise.resolve().then(() => Ws)
  },
  /**
   * @type {PlayerDecl<"wistia", "Wistia", import("./components/players/WistiaPlayer.vue").default>}
   */
  {
    key: "wistia",
    name: "Wistia",
    canPlay: u.wistia,
    lazyPlayer: () => Promise.resolve().then(() => Er)
  },
  /**
   * @type {PlayerDecl<"twitch", "Twitch", import("./components/players/TwitchPlayer.vue").default>}
   */
  {
    key: "twitch",
    name: "Twitch",
    canPlay: u.twitch,
    lazyPlayer: () => Promise.resolve().then(() => rr)
  },
  /**
   * @type {PlayerDecl<"dailymotion", "DailyMotion", import("./components/players/DailyMotionPlayer.vue").default>}
   */
  {
    key: "dailymotion",
    name: "DailyMotion",
    canPlay: u.dailymotion,
    lazyPlayer: () => Promise.resolve().then(() => ts)
  },
  /**
   * @type {PlayerDecl<"mixcloud", "Mixcloud", import("./components/players/MixcloudPlayer.vue").default>}
   */
  {
    key: "mixcloud",
    name: "Mixcloud",
    canPlay: u.mixcloud,
    lazyPlayer: () => Promise.resolve().then(() => Ms)
  },
  /**
   * @type {PlayerDecl<"vidyard", "Vidyard", import("./components/players/VidyardPlayer.vue").default>}
   */
  {
    key: "vidyard",
    name: "Vidyard",
    canPlay: u.vidyard,
    lazyPlayer: () => Promise.resolve().then(() => ur)
  },
  /**
   * @type {PlayerDecl<"kaltura", "Kaltura", import("./components/players/KalturaPlayer.vue").default>}
   */
  {
    key: "kaltura",
    name: "Kaltura",
    canPlay: u.kaltura,
    lazyPlayer: () => Promise.resolve().then(() => ks)
  },
  /**
   * @type {PlayerDecl<"file", "FilePlayer", import("./components/players/FilePlayer.vue").default>}
   */
  {
    key: "file",
    name: "FilePlayer",
    canPlay: u.file,
    canEnablePIP: (e) => u.file(e) && (document.pictureInPictureEnabled || C()) && !V.test(e),
    lazyPlayer: () => Promise.resolve().then(() => vs)
  }
];
var ae = Number.isNaN || function(t) {
  return typeof t == "number" && t !== t;
};
function At(e, t) {
  return !!(e === t || ae(e) && ae(t));
}
function It(e, t) {
  if (e.length !== t.length)
    return !1;
  for (var s = 0; s < e.length; s++)
    if (!At(e[s], t[s]))
      return !1;
  return !0;
}
function oe(e, t) {
  t === void 0 && (t = It);
  var s = null;
  function r() {
    for (var n = [], i = 0; i < arguments.length; i++)
      n[i] = arguments[i];
    if (s && s.lastThis === this && t(n, s.lastArgs))
      return s.lastResult;
    var o = e.apply(this, n);
    return s = {
      lastResult: o,
      lastArgs: n,
      lastThis: this
    }, o;
  }
  return r.clear = function() {
    s = null;
  }, r;
}
const m = (e, t) => {
  const s = e.__vccOpts || e;
  for (const [r, n] of t)
    s[r] = n;
  return s;
};
let w = [];
const Rt = {
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
      var s;
      return (s = t.canEnablePIP) == null ? void 0 : s.call(t, e);
    });
  },
  // [/META]
  inheritAttrs: !1,
  mixins: [je],
  emits: ["click-preview"],
  components: {
    Preview: () => Promise.resolve().then(() => Gt),
    Player: () => Promise.resolve().then(() => Ht)
  },
  data() {
    return {
      shouldShowPreview: !!this.light
    };
  },
  mounted() {
    this.getConfig = oe(this.getConfig), this.getActivePlayer = oe(this.getActivePlayer);
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
      var s, r;
      return (r = (s = this.$refs.player) == null ? void 0 : s.seekTo) == null ? void 0 : r.call(s, e, t);
    },
    getConfig(e, t) {
      var s;
      return ft.all([
        q,
        q[t] ?? {},
        this.config ?? {},
        ((s = this.config) == null ? void 0 : s[t]) ?? {}
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
}, Ct = { key: 0 };
function Mt(e, t, s, r, n, i) {
  const o = qe("Preview");
  return c(), T(M(e.wrapper), v({ ref: "wrapper" }, e.$attrs), {
    default: A(() => [
      e.url ? (c(), y("span", Ct, [
        S(e.$slots, "noUrl")
      ])) : (c(), y(I, { key: 1 }, [
        n.shouldShowPreview ? (c(), T(o, v({ key: 0 }, i.previewProps, { onClick: i.handleClickPreview }), {
          playIcon: A(() => [
            S(e.$slots, "playIcon")
          ]),
          _: 3
        }, 16, ["onClick"])) : (c(), T(M(i.currentPlayer), v({ key: 1 }, e.$props, {
          key: i.playerKey,
          ref: "player",
          config: i.playerConfig,
          activePlayer: i.playerComponent,
          style: i.playerStyles,
          onReady: i.handleReady
        }, ye(e.$listeners)), {
          none: A(() => [
            S(e.$slots, "#noPlayer")
          ]),
          _: 3
        }, 16, ["config", "activePlayer", "style", "onReady"]))
      ], 64))
    ]),
    _: 3
  }, 16);
}
const jr = /* @__PURE__ */ m(Rt, [["render", Mt]]), Vt = 5e3, jt = {
  mixins: [je],
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
    var e, t, s, r;
    clearTimeout(this.progressTimeout), clearTimeout(this.durationCheckTimeout), this.isReady && this.stopOnUnmount && ((t = (e = this.player) == null ? void 0 : e.stop) == null || t.call(e), (r = (s = this.player) == null ? void 0 : s.disablePIP) == null || r.call(s));
  },
  watch: {
    playing(e) {
      var t, s, r, n;
      e && !this.isPlaying ? ((s = (t = this.player) == null ? void 0 : t.play) == null || s.call(t), this.isPlaying = !0) : !e && this.isPlaying && ((n = (r = this.player) == null ? void 0 : r.pause) == null || n.call(r), this.isPlaying = !1);
    },
    pictureInPicture(e) {
      var t, s, r, n;
      e ? (s = (t = this.player) == null ? void 0 : t.enablePIP) == null || s.call(t) : (n = (r = this.player) == null ? void 0 : r.disablePIP) == null || n.call(r);
    },
    muted(e) {
      var t, s, r, n;
      e ? (s = (t = this.player) == null ? void 0 : t.mute) == null || s.call(t) : ((n = (r = this.player) == null ? void 0 : r.unmute) == null || n.call(r), this.volume !== null && this.$nextTick(() => {
        var i, o;
        return (o = (i = this.player) == null ? void 0 : i.setVolume) == null ? void 0 : o.call(i, volume);
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
        }, Vt));
        return;
      }
      if (t ? t === "fraction" : e > 0 && e < 1) {
        const r = this.player.getDuration();
        if (!r) {
          console.warn("VuePlayer: could not seek using fraction – duration not yet available");
          return;
        }
        this.player.seekTo(r * e);
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
        const e = this.getCurrentTime() ?? 0, t = this.getSecondsLoaded(), s = this.getDuration();
        if (s) {
          const r = {
            playedSeconds: e,
            played: e / s
          };
          t !== null && (r.loadedSeconds = t, r.loaded = t / s), (r.playedSeconds !== this.prevPlayed || r.loadedSeconds !== this.prevLoaded) && this.onProgress(r), this.prevPlayed = r.playedSeconds, this.prevLoaded = r.loadedSeconds;
        }
      }
      this.progressTimeout = setTimeout(this.progress, this.progressFrequency ?? this.progressInterval);
    },
    handleReady() {
      if (!this.mounted)
        return;
      this.isReady = !0, this.isLoading = !1;
      const { onReady: e, playing: t, volume: s, muted: r } = this;
      e(), !r && s !== null && this.player.setVolume(s), this.loadOnReady ? (this.player.load(this.loadOnReady, !0), this.loadOnReady = null) : t && this.player.play(), this.handleDurationCheck();
    },
    handlePlay() {
      var r, n;
      this.isPlaying = !0, this.isLoading = !1;
      const { onStart: e, onPlay: t, playbackRate: s } = this;
      this.startOnPlay && (s !== 1 && ((n = (r = this.player) == null ? void 0 : r.setPlaybackRate) == null || n.call(r, s)), e(), this.startOnPlay = !1), t(), this.seekOnPlay && (this.seekTo(this.seekOnPlay), this.seekOnPlay = null), this.handleDurationCheck();
    },
    handlePause(e) {
      this.isPlaying = !1, this.isLoading || this.onPause(e);
    },
    handleEnded() {
      const { activePlayer: e, loop: t, onEnded: s } = this;
      e.loopOnEnded && t && this.seekTo(0), t || (this.isPlaying = !1, s());
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
}, Ut = {
  key: 1,
  class: "vue-player--none"
};
function xt(e, t, s, r, n, i) {
  return e.activePlayer ? (c(), T(M(e.activePlayer), v({ key: 0 }, i.playerProps, {
    class: "vue-player",
    onMount: i.handlePlayerMount,
    onReady: i.handleReady,
    onPlay: i.handlePlay,
    onPause: i.handlePause,
    onEnded: i.handleEnded,
    onLoaded: i.handleLoaded,
    onError: i.handleError
  }, ye(e.$listeners)), null, 16, ["onMount", "onReady", "onPlay", "onPause", "onEnded", "onLoaded", "onError"])) : (c(), y("span", Ut, [
    S(e.$slots, "none")
  ]));
}
const Nt = /* @__PURE__ */ m(jt, [["render", xt]]), Ht = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Nt
}, Symbol.toStringTag, { value: "Module" })), B = {}, Kt = {
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
          const s = t.thumbnail_url.replace("height=100", "height=480");
          this.image = s, B[this.url] = s;
        }
      }
    },
    watch: {
      url: "fetchImage",
      light: "fetchImage"
    }
  }
}, Bt = ["tabindex"], Ft = /* @__PURE__ */ k("div", { class: "vue-player__shadow react-player__shadow" }, [
  /* @__PURE__ */ k("div", { class: "vue-player__play-icon react-player__play-icon" })
], -1);
function zt(e, t, s, r, n, i) {
  return c(), y("div", {
    class: "vue-player__preview react-player__preview",
    tabindex: s.previewTabIndex,
    style: $(i.previewStyles),
    onClick: t[0] || (t[0] = (...o) => i.handleClick && i.handleClick(...o)),
    onKeydown: t[1] || (t[1] = (...o) => i.handleKeyPress && i.handleKeyPress(...o))
  }, [
    S(e.$slots, "playIcon", {}, () => [
      Ft
    ])
  ], 44, Bt);
}
const Yt = /* @__PURE__ */ m(Kt, [["render", zt]]), Gt = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Yt
}, Symbol.toStringTag, { value: "Module" })), qt = "https://api.dmcdn.net/all.js", Wt = "DM", Xt = "dmAsyncInit", Zt = {
  // [META]
  displayName: "DailyMotion",
  canPlay: u.dailymotion,
  loopOnEnded: !0,
  // [/META]
  mixins: [P],
  props: {
    config: Le,
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
      const { controls: t, config: s, playing: r } = this, [, n] = e.match(Ne);
      if (this.player) {
        this.player.load(n, {
          start: D(e),
          autoplay: r
        });
        return;
      }
      try {
        const i = await _(qt, Wt, Xt, (d) => d.player);
        if (!this.$refs.container)
          return;
        const o = i.player;
        this.player = new o(this.$refs.container, {
          width: "100%",
          height: "100%",
          video: n,
          params: {
            controls: t,
            autoplay: this.playing,
            mute: this.muted,
            start: D(e),
            origin: window.location.origin,
            ...s.params
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
}, Qt = { ref: "container" };
function Jt(e, t, s, r, n, i) {
  return c(), y("div", {
    class: "vue-player--dailymotion",
    style: $(i.styles)
  }, [
    k("div", Qt, null, 512)
  ], 4);
}
const es = /* @__PURE__ */ m(Zt, [["render", Jt]]), ts = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: es
}, Symbol.toStringTag, { value: "Module" })), le = "https://connect.facebook.net/en_US/sdk.js", de = "FB", ce = "fbAsyncInit", ss = "facebook-player-", rs = {
  // [META]
  displayName: "Facebook",
  canPlay: u.facebook,
  loopOnEnabled: !0,
  // [/META]
  events: ["loaded"],
  mixins: [P],
  props: {
    config: we
  },
  data() {
    return {
      randomId: `${ss}${Z()}`
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
      var r, n;
      if (t) {
        const i = await _(le, de, ce);
        (n = (r = i == null ? void 0 : i.XFBML) == null ? void 0 : r.parse) == null || n.call(r);
        return;
      }
      const s = await _(le, de, ce);
      s.init({
        appId: this.config.appId,
        xfbml: !0,
        version: this.config.version
      }), s.Event.subscribe("xfbml.render", (i) => {
        this.onLoaded();
      }), s.Event.subscribe("xfbml.ready", (i) => {
        i.type === "video" && i.id === this.playerID && (this.player = i.instance, this.player.subscribe("startedPlaying", this.onPlay), this.player.subscribe("paused", this.onPause), this.player.subscribe("finishedPlaying", this.onEnded), this.player.subscribe("startedBuffering", this.onBuffer), this.player.subscribe("finishedBuffering", this.onBufferEnd), this.player.subscribe("error", this.onError), this.muted ? this.mute() : this.unmute(), this.onReady(), document.getElementById(this.playerID).querySelector("iframe").style.visibility = "visible");
      });
    },
    onLoaded(...e) {
      this.$emit("loaded", ...e);
    }
  }
}, is = ["id", "data-href", "data-autoplay", "data-controls"];
function ns(e, t, s, r, n, i) {
  return c(), y("div", v({
    id: this.playerID,
    class: "fb-video vue-player--facebook",
    "data-href": this.url,
    "data-autoplay": this.playing ? "true" : "false",
    "data-controls": this.controls ? "true" : "false",
    "data-allowfullscreen": "true"
  }, s.config.attributes), null, 16, is);
}
const as = /* @__PURE__ */ m(rs, [["render", ns]]), os = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: as
}, Symbol.toStringTag, { value: "Module" })), Ye = typeof navigator < "u", ls = Ye && navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1, ue = Ye && (/iPad|iPhone|iPod/.test(navigator.userAgent) || ls) && !window.MSStream, ds = "https://cdn.jsdelivr.net/npm/hls.js@VERSION/dist/hls.min.js", cs = "Hls", us = "https://cdnjs.cloudflare.com/ajax/libs/dashjs/VERSION/dash.all.min.js", hs = "dashjs", ys = "https://cdn.jsdelivr.net/npm/flv.js@VERSION/dist/flv.min.js", ps = "flvjs", fs = /www\.dropbox\.com\/.+/, F = /https:\/\/watch\.cloudflarestream\.com\/([a-z0-9]+)/, ms = "https://videodelivery.net/{id}/manifest/video.m3u8", Ps = {
  // [META]
  displayName: "FilePlayer",
  canPlay: u.file,
  // [/META]
  mixins: [P],
  props: {
    config: ke
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
      return (e = this.config) != null && e.forceVideo || this.config.attributes.poster ? !1 : V.test(this.url) || this.config.forceAudio;
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
    this.addListeners(this.$refs.player), ue && ((t = (e = this.$refs.player) == null ? void 0 : e.load) == null || t.call(e)), this.$watch(
      () => this.$refs.player,
      (s, r) => {
        this.prevPlayer = r;
      }
    );
  },
  beforeUnmount() {
    var e, t;
    this.prevPlayer = null, this.removeListeners(this.$refs.player), (t = (e = this.hls) == null ? void 0 : e.destroy) == null || t.call(e);
  },
  watch: {
    url(e, t) {
      this.prevUrl = t, !R(e) && this.$refs.player && (this.$refs.player.srcObject = null);
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
      var t, s;
      const e = (s = (t = this.$refs.player).play) == null ? void 0 : s.call(t);
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
      var e, t, s, r;
      (t = (e = this.$refs.player) == null ? void 0 : e.removeAttribute) == null || t.call(e, "src"), (r = (s = this.dash) == null ? void 0 : s.reset) == null || r.call(s);
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
      const t = e.end(e.length - 1), s = this.getDuration();
      return t > s ? s : t;
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
      var e, t, s, r, n, i;
      (e = this.$refs.player) != null && e.requestPictureInPicture && document.pictureInPictureElement !== this.$refs.player ? ((s = (t = this.$refs.player) == null ? void 0 : t.requestPictureInPicture) == null || s.call(t), this.onEnablePIP()) : C(this.$refs.player) && ((r = this.$refs.player) == null ? void 0 : r.webkitPresentationMode) !== "picture-in-picture" && ((i = (n = this.$refs.player) == null ? void 0 : n.webkitSetPresentationMode) == null || i.call(n, "picture-in-picture"), this.onEnablePIP());
    },
    /**
     * @inheritDoc
     * @override
     * @playerHook disablePIP
     */
    disablePIP() {
      var e, t, s;
      document.exitPictureInPicture && document.pictureInPictureElement === this.$refs.player ? (document.exitPictureInPicture(), this.onDisablePIP()) : C(this.$refs.player) && ((e = this.$refs.player) == null ? void 0 : e.webkitPresentationMode) !== "inline" && ((s = (t = this.$refs.player) == null ? void 0 : t.webkitSetPresentationMode) == null || s.call(t, "inline"), this.onDisablePIP());
    },
    async load(e) {
      var i, o, d, h, l, p;
      const { hlsVersion: t, hlsOptions: s, dashVersion: r, flvVersion: n } = this.config;
      if ((o = (i = this.hls) == null ? void 0 : i.destroy) == null || o.call(i), (h = (d = this.dash) == null ? void 0 : d.reset) == null || h.call(d), this.shouldUseHLS(e)) {
        const f = await getSDK(ds.replace("VERSION", t), cs);
        if (this.hls = new f(s), this.hls.on(f.Events.MANIFEST_PARSED, () => {
          this.onReady();
        }), this.hls.on(f.Events.ERROR, (b, g) => {
          this.onError(b, g, this.hls, f);
        }), F.test(e)) {
          const b = e.match(F)[1];
          this.hls.loadSource(ms.replace("{id}", b));
        } else
          this.hls.loadSource(e);
        this.hls.attachMedia(this.$refs.player), this.onLoaded();
      } else if (this.shouldUseDASH(e)) {
        const f = await getSDK(us.replace("VERSION", r), hs);
        this.dash = f.MediaPlayer().create(), this.dash.initialize(this.$refs.player, e, this.playing), this.dash.on("error", this.onError), parseInt(r) < 3 ? this.dash.getDebug().setLogToBrowserConsole(!1) : this.dash.updateSettings({ debug: { logLevel: f.Debug.LOG_LEVEL_NONE } }), this.onLoaded();
      } else if (this.shouldUseFLV(e)) {
        const f = await getSDK(ys.replace("VERSION", n), ps);
        this.flv = f.createPlayer({ type: "flv", url: e }), this.flv.attachMediaElement(this.$refs.player), this.flv.load(), this.onLoaded();
      }
      if (e instanceof Array)
        (p = (l = this.$refs.player) == null ? void 0 : l.load) == null || p.call(l);
      else if (R(e))
        try {
          this.$refs.player.srcObject = e;
        } catch {
          this.$refs.player.src = URL.createObjectURL(e);
        }
    },
    getSource(e) {
      const t = this.shouldUseHLS(e), s = this.shouldUseDASH(e), r = this.shouldUseFLV(e);
      if (!(e instanceof Array || R(e) || t || s || r))
        return fs.test(e) ? e.replace("www.dropbox.com", "dl.dropboxusercontent.com") : e;
    },
    onPresentationModeChange(e) {
      if (this.$refs.player && C(this.$refs.player)) {
        const { webkitPresentationMode: t } = this.$refs.player;
        t === "picture-in-picture" ? this.onEnablePIP(e) : t === "inline" && this.onDisablePIP(e);
      }
    },
    addListeners(e) {
      const { url: t, playsInline: s } = this;
      e.addEventListener("play", this.onPlay), e.addEventListener("waiting", this.onBuffer), e.addEventListener("playing", this.onBufferEnd), e.addEventListener("pause", this.onPause), e.addEventListener("seeked", this.onSeek), e.addEventListener("ended", this.onEnded), e.addEventListener("error", this.onError), e.addEventListener("ratechange", this.onPlaybackRateChange), e.addEventListener("enterpictureinpicture", this.onEnablePIP), e.addEventListener("leavepictureinpicture", this.onDisablePIP), e.addEventListener("webkitpresentationmodechanged", this.onPresentationModeChange), this.shouldUseHLS(t) || e.addEventListener("canplay", this.onReady), s && (e.setAttribute("playsinline", ""), e.setAttribute("webkit-playsinline", ""), e.setAttribute("x5-playsinline", ""));
    },
    removeListeners(e, t) {
      e.removeEventListener("canplay", this.onReady), e.removeEventListener("play", this.onPlay), e.removeEventListener("waiting", this.onBuffer), e.removeEventListener("playing", this.onBufferEnd), e.removeEventListener("pause", this.onPause), e.removeEventListener("seeked", this.onSeek), e.removeEventListener("ended", this.onEnded), e.removeEventListener("error", this.onError), e.removeEventListener("ratechange", this.onPlaybackRateChange), e.removeEventListener("enterpictureinpicture", this.onEnablePIP), e.removeEventListener("leavepictureinpicture", this.onDisablePIP), e.removeEventListener("webkitpresentationmodechanged", this.onPresentationModeChange), this.shouldUseHLS(t) || e.removeEventListener("canplay", this.onReady);
    },
    shouldUseHLS(e) {
      var t;
      return (t = this.config) != null && t.forceHLS ? !0 : ue ? !1 : Q.test(e) || F.test(e);
    },
    shouldUseDASH(e) {
      return Fe.test(e) || this.props.config.forceDASH;
    },
    shouldUseFLV(e) {
      return ze.test(e) || this.props.config.forceFLV;
    }
  }
}, gs = ["src"];
function bs(e, t, s, r, n, i) {
  return c(), T(M(i.tag), v({
    ref: "player",
    class: "vue-player--file",
    style: i.styles,
    preload: "auto",
    src: i.src,
    autoplay: e.playing,
    controls: e.controls,
    muted: e.muted,
    loop: e.loop
  }, s.config.attributes), {
    default: A(() => [
      i.urlIsArray ? (c(), y(I, { key: 0 }, [
        (c(!0), y(I, null, J(this.url, (o, d) => S(e.$slots, "source", ee(te({ source: o })), () => [
          typeof o == "string" ? (c(), y("source", {
            src: o,
            key: o
          }, null, 8, gs)) : (c(), y("source", v({ key: d }, o), null, 16))
        ])), 256)),
        (c(!0), y(I, null, J(this.config.tracks, (o, d) => S(e.$slots, "track", ee(te({ track: o })), () => [
          (c(), y("track", v({ key: d }, o), null, 16))
        ])), 256))
      ], 64)) : We("", !0)
    ]),
    _: 3
  }, 16, ["style", "src", "autoplay", "controls", "muted", "loop"]);
}
const _s = /* @__PURE__ */ m(Ps, [["render", bs]]), vs = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _s
}, Symbol.toStringTag, { value: "Module" })), ws = "https://cdn.embed.ly/player-0.1.0.min.js", Ss = "playerjs", Ls = {
  // [META]
  displayName: "Kaltura",
  canPlay: u.kaltura,
  // [/META]
  mixins: [P],
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
        const t = await _(ws, Ss);
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
      e.on("play", this.onPlay), e.on("pause", this.onPause), e.on("ended", this.onEnded), e.on("error", this.onError), e.on("timeupdate", ({ duration: t, seconds: s }) => {
        const r = this.duration !== t;
        this.duration = t, this.currentTime = s, r && this.onDuration(t), this.onSeek(s);
      });
    }
  }
}, Es = ["src"];
function $s(e, t, s, r, n, i) {
  return c(), y("iframe", {
    class: "vue-player--kaltura",
    ref: "iframe",
    src: e.url,
    frameborder: "0",
    scrolling: "no",
    allowfullscreen: "",
    allow: "encrypted-media;autoplay",
    referrerpolicy: "no-referrer-when-downgrade"
  }, null, 8, Es);
}
const Ts = /* @__PURE__ */ m(Ls, [["render", $s]]), ks = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Ts
}, Symbol.toStringTag, { value: "Module" })), Os = "https://widget.mixcloud.com/media/js/widgetApi.js", Ds = "Mixcloud", As = {
  // [META]
  displayName: "Mixcloud",
  canPlay: u.mixcloud,
  // [/META]
  mixins: [P],
  props: {
    config: Ie
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
      return this.url.match(He)[1];
    },
    /**
     * @type {string}
     */
    query() {
      return _t({
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
        const t = await _(Os, Ds);
        this.player = t.PlayerWidget(this.$refs.iframe), this.player.ready.then(() => {
          this.player.events.play.on(this.onPlay), this.player.events.pause.on(this.onPause), this.player.events.ended.on(this.onEnded), this.player.events.error.on(this.onError), this.player.events.progress.on((s, r) => {
            this.currentTime = s, this.duration = r;
          }), this.onReady();
        });
      } catch (t) {
        this.onError(t);
      }
    }
  }
}, Is = ["src"];
function Rs(e, t, s, r, n, i) {
  return c(), y("iframe", {
    key: i.id,
    ref: "iframe",
    src: i.src,
    class: "vue-player--mixcloud",
    frameborder: "0"
  }, null, 8, Is);
}
const Cs = /* @__PURE__ */ m(As, [["render", Rs]]), Ms = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Cs
}, Symbol.toStringTag, { value: "Module" })), Vs = "https://w.soundcloud.com/player/api.js", js = "SC", Us = {
  // [META]
  displayName: "Soundcloud",
  canPlay: u.soundcloud,
  loopOnEnded: !0,
  // [/META]
  mixins: [P],
  props: {
    config: ge,
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
        const s = await _(Vs, js);
        if (!this.iframe)
          return;
        const { PLAY: r, PLAY_PROGRESS: n, PAUSE: i, FINISH: o, ERROR: d } = s.Widget.Events;
        t || (this.player = s.Widget(this.$refs.iframe), this.player.bind(r, this.onPlay), this.player.bind(i, () => {
          this.duration - this.currentTime < 0.05 || this.onPause();
        }), this.player.bind(n, (h) => {
          this.currentTime = h.currentPosition / 1e3, this.fractionLoaded = h.loadedProgress;
        }), this.player.bind(o, this.onEnded), this.player.bind(d, this.onError)), this.player.load(e, {
          ...this.config.options,
          callback: () => {
            this.player.getDuration((h) => {
              this.duration = h / 1e3, this.onReady();
            });
          }
        });
      } catch (s) {
        this.onError(s);
      }
    }
  }
}, xs = ["src"];
function Ns(e, t, s, r, n, i) {
  return c(), y("iframe", {
    ref: "iframe",
    class: "vue-player--soundcloud",
    style: $(i.styles),
    src: i.src,
    frameborder: "0",
    allow: "autoplay"
  }, null, 12, xs);
}
const Hs = /* @__PURE__ */ m(Us, [["render", Ns]]), Ks = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Hs
}, Symbol.toStringTag, { value: "Module" })), Bs = "https://cdn.embed.ly/player-0.1.0.min.js", Fs = "playerjs", zs = {
  // [META]
  displayName: "Streamable",
  canPlay: u.streamable,
  // [/META]
  mixins: [P],
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
      return this.url.match(Ue)[1];
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
        const t = await getSDK(Bs, Fs);
        if (!this.iframe)
          return;
        this.player = new t.Player(this.$refs.iframe), this.player.setLoop(this.loop), this.player.on("ready", this.onReady), this.player.on("play", this.onPlay), this.player.on("pause", this.onPause), this.player.on("seeked", this.onSeek), this.player.on("ended", this.onEnded), this.player.on("error", this.onError), this.player.on("timeupdate", ({ duration: s, seconds: r }) => {
          this.duration = s, this.currentTime = r;
        }), this.player.on("buffered", ({ percent: s }) => {
          this.duration && (this.secondsLoaded = this.duration * s);
        }), this.muted && this.player.mute();
      } catch (t) {
        this.onError(t);
      }
    }
  }
}, Ys = ["src"];
function Gs(e, t, s, r, n, i) {
  return c(), y("iframe", {
    class: "vue-player--streamable",
    ref: "iframe",
    src: i.src,
    frameborder: "0",
    scrolling: "no",
    allowfullscreen: ""
  }, null, 8, Ys);
}
const qs = /* @__PURE__ */ m(zs, [["render", Gs]]), Ws = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: qs
}, Symbol.toStringTag, { value: "Module" })), Xs = "https://player.twitch.tv/js/embed/v1.js", Zs = "Twitch", Qs = "twitch-player-", Js = {
  // [META]
  displayName: "Twitch",
  canPlay: u.twitch,
  loopOnEnded: !0,
  // [/META]
  mixins: [P],
  props: {
    config: Ce
  },
  data() {
    return {
      randomId: `${Qs}${Z()}`
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
      var s, r, n, i;
      try {
        const { playsinline: o, config: d, controls: h } = this, l = W.test(e), p = l ? e.match(W)[1] : e.match(MATCH_URL_TWITCH_VIDEO)[1];
        if (t) {
          l ? (r = (s = this.player) == null ? void 0 : s.setChannel) == null || r.call(s, p) : (i = (n = this.player) == null ? void 0 : n.setVideo) == null || i.call(n, "v" + p);
          return;
        }
        const f = await getSDK(Xs, Zs);
        this.player = new f.Player(this.pid, {
          video: l ? "" : p,
          channel: l ? p : "",
          height: "100%",
          width: "100%",
          playsinline: o,
          autoplay: this.playing,
          muted: this.muted,
          // https://github.com/CookPete/react-player/issues/733#issuecomment-549085859
          controls: l ? !0 : h,
          time: D(e),
          ...d.options
        });
        const { READY: b, PLAYING: g, PAUSE: j, ENDED: U, ONLINE: x, OFFLINE: N, SEEK: Ge } = f.Player;
        this.player.addEventListener(b, this.onReady), this.player.addEventListener(g, this.onPlay), this.player.addEventListener(j, this.onPause), this.player.addEventListener(U, this.onEnded), this.player.addEventListener(Ge, this.onSeek), this.player.addEventListener(x, this.onLoaded), this.player.addEventListener(N, this.onLoaded);
      } catch (o) {
        this.onError(o);
      }
    }
  }
}, er = ["id"];
function tr(e, t, s, r, n, i) {
  return c(), y("div", {
    class: "vue-player--twitch",
    id: i.pid
  }, null, 8, er);
}
const sr = /* @__PURE__ */ m(Js, [["render", tr]]), rr = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: sr
}, Symbol.toStringTag, { value: "Module" })), ir = "https://play.vidyard.com/embed/v4.js", nr = "VidyardV4", ar = "onVidyardAPI", or = {
  // [META]
  displayName: "Vidyard",
  canPlay: u.vidyard,
  // [/META]
  mixins: [P],
  props: {
    config: Ve,
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
      var e, t, s;
      (s = (t = (e = window.VidyardV4) == null ? void 0 : e.api) == null ? void 0 : t.destroyPlayer) == null || s.call(t, this.player);
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
        const { playing: t, config: s } = this, r = (e ?? this.url).match(Ke)[1];
        this.player && this.stop();
        const n = await _(ir, nr, ar);
        if (!this.$refs.container)
          return;
        n.api.addReadyListener((i, o) => {
          this.player = o, this.player.on("ready", this.onReady), this.player.on("play", this.onPlay), this.player.on("pause", this.onPause), this.player.on("seek", this.onSeek), this.player.on("playerComplete", this.onEnded);
        }, r), n.api.renderPlayer({
          uuid: r,
          container: this.$refs.container,
          autoplay: t ? 1 : 0,
          ...s.options
        }), n.api.getPlayerMetadata(r).then((i) => {
          this.duration = i.length_in_seconds, this.onDuration(i.length_in_seconds);
        });
      } catch (t) {
        this.onError(t);
      }
    }
  }
}, lr = { ref: "container" };
function dr(e, t, s, r, n, i) {
  return c(), y("div", {
    style: $(i.styles)
  }, [
    k("div", lr, null, 512)
  ], 4);
}
const cr = /* @__PURE__ */ m(or, [["render", dr]]), ur = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: cr
}, Symbol.toStringTag, { value: "Module" })), hr = "https://player.vimeo.com/api/player.js", yr = "Vimeo", pr = {
  // [META]
  displayName: "Vimeo",
  canPlay: u.vimeo,
  forceLoad: !0,
  // [/META]
  mixins: [P],
  props: {
    config: $e,
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
        const t = await _(hr, yr);
        if (!this.$refs.container)
          return;
        const { playerOptions: s, title: r } = this.config;
        this.player = new t.Player(this.$refs.container, {
          url: e,
          autoplay: this.playing,
          muted: this.muted,
          loop: this.loop,
          playsinline: this.playsinline,
          controls: this.controls,
          ...s
        }), this.player.ready().then(() => {
          const n = this.$refs.container.querySelector("iframe");
          n.style.width = "100%", n.style.height = "100%", r && (n.title = r);
        }).catch(this.onError), this.player.on("loaded", () => {
          this.onReady(), this.refreshDuration();
        }), this.player.on("play", () => {
          this.onPlay(), this.refreshDuration();
        }), this.player.on("pause", this.onPause), this.player.on("seeked", (n) => this.onSeek(n.seconds)), this.player.on("ended", this.onEnded), this.player.on("error", this.onError), this.player.on("timeupdate", ({ seconds: n }) => {
          this.currentTime = n;
        }), this.player.on("progress", ({ seconds: n }) => {
          this.secondsLoaded = n;
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
function fr(e, t, s, r, n, i) {
  return c(), y("div", {
    key: this.url,
    style: $(i.styles),
    ref: "container"
  }, null, 4);
}
const mr = /* @__PURE__ */ m(pr, [["render", fr]]), Pr = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: mr
}, Symbol.toStringTag, { value: "Module" })), gr = "https://fast.wistia.com/assets/external/E-v1.js", br = "Wistia", _r = "wistia-player-", vr = {
  // [META]
  displayName: "Wistia",
  canPlay: u.wistia,
  loopOnEnded: !0,
  // [/META]
  mixins: [P],
  props: {
    config: De
  },
  data() {
    return {
      randomId: `${_r}${Z()}`
    };
  },
  computed: {
    pid() {
      return this.config.playerId ?? this.randomId;
    },
    videoId() {
      var e, t, s;
      return (s = (t = (e = this.url) == null ? void 0 : e.match) == null ? void 0 : t.call(e, xe)) == null ? void 0 : s[1];
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
      var t, s;
      try {
        const { playing: r, muted: n, controls: i, onReady: o, config: d, onError: h } = this, l = await getSDK(gr, br);
        (s = (t = d.customControls) == null ? void 0 : t.forEach) == null || s.call(t, (p) => l.defineControl(p)), window._wq = window._wq || [], window._wq.push({
          id: this.playerID,
          options: {
            autoPlay: r,
            silentAutoPlay: "allow",
            muted: n,
            controlsVisibleOnLoad: i,
            fullscreenButton: i,
            playbar: i,
            playbackRateControl: i,
            qualityControl: i,
            volumeControl: i,
            settingsControl: i,
            smallPlayButton: i,
            ...d.options
          },
          onReady: (p) => {
            this.player = p, this.unbind(), this.player.bind("play", this.onPlay), this.player.bind("pause", this.onPause), this.player.bind("seek", this.onSeek), this.player.bind("end", this.onEnded), this.player.bind("playbackratechange", this.onPlaybackRateChange), o();
          }
        });
      } catch (r) {
        this.onError(r);
      }
    },
    unbind() {
      var e, t, s, r, n, i, o, d, h, l;
      (t = (e = this.player) == null ? void 0 : e.unbind) == null || t.call(e, "play", this.onPlay), (r = (s = this.player) == null ? void 0 : s.unbind) == null || r.call(s, "pause", this.onPause), (i = (n = this.player) == null ? void 0 : n.unbind) == null || i.call(n, "seek", this.onSeek), (d = (o = this.player) == null ? void 0 : o.unbind) == null || d.call(o, "end", this.onEnded), (l = (h = this.player) == null ? void 0 : h.unbind) == null || l.call(h, "playbackratechange", this.onPlaybackRateChange);
    }
  }
}, wr = ["id"];
function Sr(e, t, s, r, n, i) {
  return c(), y("div", {
    id: i.pid,
    key: i.videoId,
    class: Xe(i.className)
  }, null, 10, wr);
}
const Lr = /* @__PURE__ */ m(vr, [["render", Sr]]), Er = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Lr
}, Symbol.toStringTag, { value: "Module" })), $r = "https://www.youtube.com/iframe_api", he = "YT", Tr = "onYouTubeIframeAPIReady", z = /[?&](?:list|channel)=([a-zA-Z0-9_-]+)/, Y = /user\/([a-zA-Z0-9_-]+)\/?/, kr = /youtube-nocookie\.com/, Or = "https://www.youtube-nocookie.com", Dr = {
  // [META]
  displayName: "YouTube",
  canPlay: u.youtube,
  // [/META]
  mixins: [P],
  props: {
    config: _e
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
        const { playing: s, muted: r, playsinline: n, controls: i, loop: o, config: d, onError: h } = this, { playerVars: l, embedOptions: p } = d, f = this.getID(e);
        if (t) {
          if (z.test(e) || Y.test(e) || e instanceof Array) {
            this.player.loadPlaylist(this.parsePlaylist(e));
            return;
          }
          this.player.cueVideoById({
            videoId: f,
            startSeconds: D(e) || l.start,
            endSeconds: ie(e) || l.end
          });
          return;
        }
        const b = await _($r, he, Tr, (g) => g.loaded);
        if (!this.container)
          return;
        this.player = new b.Player(this.container, {
          width: "100%",
          height: "100%",
          videoId: f,
          playerVars: {
            autoplay: s ? 1 : 0,
            mute: r ? 1 : 0,
            controls: i ? 1 : 0,
            start: D(e),
            end: ie(e),
            origin: window.location.origin,
            playsinline: n ? 1 : 0,
            ...this.parsePlaylist(e),
            ...l
          },
          events: {
            onReady: () => {
              o && this.player.setLoop(!0), this.onReady();
            },
            onPlaybackRateChange: (g) => this.onPlaybackRateChange(g.data),
            onStateChange: this.onStateChange,
            onError: (g) => h(g.data)
          },
          host: kr.test(e) ? Or : void 0,
          ...p
        }), p.events && console.warn("Using `embedOptions.events` will likely break things. Use ReactPlayer’s callback props instead, eg onReady, onPlay, onPause");
      } catch (s) {
        this.onError(s);
      }
    },
    parsePlaylist(e) {
      if (e instanceof Array)
        return {
          listType: "playlist",
          playlist: e.map(this.getID).join(",")
        };
      if (z.test(e)) {
        const [, t] = e.match(z);
        return {
          listType: "playlist",
          list: t.replace(/^UC/, "UU")
        };
      }
      if (Y.test(e)) {
        const [, t] = e.match(Y);
        return {
          listType: "user_uploads",
          list: t
        };
      }
      return {};
    },
    onStateChange(e) {
      const { data: t } = e, {
        onPlay: s,
        onPause: r,
        onBuffer: n,
        onBufferEnd: i,
        onEnded: o,
        onReady: d,
        loop: h,
        config: { playerVars: l, onUnstarted: p }
      } = this, { UNSTARTED: f, PLAYING: b, PAUSED: g, BUFFERING: j, ENDED: U, CUED: x } = window[he].PlayerState;
      if (t === f && p(), t === b && (s(), i()), t === g && r(), t === j && n(), t === U) {
        const N = !!this.callPlayer("getPlaylist");
        h && !N && (l.start ? this.seekTo(l.start) : this.play()), o();
      }
      t === x && d();
    }
  }
}, Ar = { ref: "container" };
function Ir(e, t, s, r, n, i) {
  return c(), y("div", {
    class: "vue-player--youtube",
    style: $(i.styles)
  }, [
    k("div", Ar, null, 512)
  ], 4);
}
const Rr = /* @__PURE__ */ m(Dr, [["render", Ir]]), Cr = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Rr
}, Symbol.toStringTag, { value: "Module" }));
export {
  es as DailyMotionPlayer,
  as as FacebookPlayer,
  _s as FilePlayer,
  Ts as KalturaPlayer,
  Cs as MixcloudPlayer,
  Nt as Player,
  Yt as Preview,
  Hs as SoundcloudPlayer,
  qs as StreamablePlayer,
  sr as TwitchPlayer,
  cr as VidyardPlayer,
  mr as VimeoPlayer,
  jr as VuePlayer,
  Lr as WistiaPlayer,
  Rr as YouTubePlayer,
  P as playerMixin
};

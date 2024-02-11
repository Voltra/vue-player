import o from "vue-types";
import { resolveComponent as Z, openBlock as p, createBlock as h, resolveDynamicComponent as E, mergeProps as b, withCtx as g, createElementBlock as M, renderSlot as w, Fragment as Q, toHandlers as J } from "vue";
function U(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var G = function(t, r, n) {
  var a = document.head || document.getElementsByTagName("head")[0], s = document.createElement("script");
  typeof r == "function" && (n = r, r = {}), r = r || {}, n = n || function() {
  }, s.type = r.type || "text/javascript", s.charset = r.charset || "utf8", s.async = "async" in r ? !!r.async : !0, s.src = t, r.attrs && ee(s, r.attrs), r.text && (s.text = "" + r.text);
  var l = "onload" in s ? I : te;
  l(s, n), s.onload || I(s, n), a.appendChild(s);
};
function ee(e, t) {
  for (var r in t)
    e.setAttribute(r, t[r]);
}
function I(e, t) {
  e.onload = function() {
    this.onerror = this.onload = null, t(null, e);
  }, e.onerror = function() {
    this.onerror = this.onload = null, t(new Error("Failed to load " + this.src), e);
  };
}
function te(e, t) {
  e.onreadystatechange = function() {
    this.readyState != "complete" && this.readyState != "loaded" || (this.onreadystatechange = null, t(null, e));
  };
}
const oe = /* @__PURE__ */ U(G);
var re = function(t) {
  return ne(t) && !ae(t);
};
function ne(e) {
  return !!e && typeof e == "object";
}
function ae(e) {
  var t = Object.prototype.toString.call(e);
  return t === "[object RegExp]" || t === "[object Date]" || le(e);
}
var se = typeof Symbol == "function" && Symbol.for, ie = se ? Symbol.for("react.element") : 60103;
function le(e) {
  return e.$$typeof === ie;
}
function ce(e) {
  return Array.isArray(e) ? [] : {};
}
function y(e, t) {
  return t.clone !== !1 && t.isMergeableObject(e) ? d(ce(e), e, t) : e;
}
function ue(e, t, r) {
  return e.concat(t).map(function(n) {
    return y(n, r);
  });
}
function fe(e, t) {
  if (!t.customMerge)
    return d;
  var r = t.customMerge(e);
  return typeof r == "function" ? r : d;
}
function de(e) {
  return Object.getOwnPropertySymbols ? Object.getOwnPropertySymbols(e).filter(function(t) {
    return Object.propertyIsEnumerable.call(e, t);
  }) : [];
}
function k(e) {
  return Object.keys(e).concat(de(e));
}
function D(e, t) {
  try {
    return t in e;
  } catch {
    return !1;
  }
}
function pe(e, t) {
  return D(e, t) && !(Object.hasOwnProperty.call(e, t) && Object.propertyIsEnumerable.call(e, t));
}
function ye(e, t, r) {
  var n = {};
  return r.isMergeableObject(e) && k(e).forEach(function(a) {
    n[a] = y(e[a], r);
  }), k(t).forEach(function(a) {
    pe(e, a) || (D(e, a) && r.isMergeableObject(t[a]) ? n[a] = fe(a, r)(e[a], t[a], r) : n[a] = y(t[a], r));
  }), n;
}
function d(e, t, r) {
  r = r || {}, r.arrayMerge = r.arrayMerge || ue, r.isMergeableObject = r.isMergeableObject || re, r.cloneUnlessOtherwiseSpecified = y;
  var n = Array.isArray(t), a = Array.isArray(e), s = n === a;
  return s ? n ? r.arrayMerge(e, t, r) : ye(e, t, r) : y(t, r);
}
d.all = function(t, r) {
  if (!Array.isArray(t))
    throw new Error("first argument should be an array");
  return t.reduce(function(n, a) {
    return d(n, a, r);
  }, {});
};
var me = d, he = me;
const be = /* @__PURE__ */ U(he), ge = /[?&#](?:start|t)=([0-9hms]+)/, we = /[?&#]end=([0-9hms]+)/, C = /(\d+)([hms])/g, Pe = /^\d+$/;
function L(e, t) {
  if (e instanceof Array)
    return;
  const r = e.match(t);
  if (r) {
    const n = r[1];
    if (n.match(C))
      return ve(n);
    if (Pe.test(n))
      return parseInt(n);
  }
}
function ve(e) {
  let t = 0, r = C.exec(e);
  for (; r !== null; ) {
    const [, n, a] = r;
    a === "h" && (t += parseInt(n, 10) * 60 * 60), a === "m" && (t += parseInt(n, 10) * 60), a === "s" && (t += parseInt(n, 10)), r = C.exec(e);
  }
  return t;
}
function lt(e) {
  return L(e, ge);
}
function ct(e) {
  return L(e, we);
}
function ut() {
  return Math.random().toString(36).substr(2, 5);
}
function ft(e) {
  return Object.keys(e).map((t) => `${t}=${e[t]}`).join("&");
}
function P(e) {
  return window[e] ? window[e] : window.exports && window.exports[e] ? window.exports[e] : window.module && window.module.exports && window.module.exports[e] ? window.module.exports[e] : null;
}
const f = {};
function dt(e, t, r = null, n = () => !0, a = oe) {
  const s = P(t);
  return s && n(s) ? Promise.resolve(s) : new Promise((l, O) => {
    if (f[e]) {
      f[e].push({ resolve: l, reject: O });
      return;
    }
    f[e] = [{ resolve: l, reject: O }];
    const S = (c) => {
      f[e].forEach((m) => m.resolve(c));
    };
    if (r) {
      const c = window[r];
      window[r] = function() {
        c && c(), S(P(t));
      };
    }
    a(e, (c) => {
      c ? (f[e].forEach((m) => m.reject(c)), f[e] = null) : r || S(P(t));
    });
  });
}
function Ce(e, ...t) {
  if (!this.player || !this.player[e]) {
    let r = `VuePlayer: ${this.$options.displayName} player could not call %c${e}%c – `;
    return this.player ? this.player[e] || (r += "The method was not available") : r += "The player was not available", console.warn(r, "font-weight: bold", ""), null;
  }
  return this.player[e](...t);
}
function _e(e) {
  return typeof MediaStream < "u" && e instanceof MediaStream || typeof window < "u" && typeof window.MediaStream < "u" && e instanceof window.MediaStream;
}
function Ae(e) {
  return /^blob:/.test(e);
}
function Te(e = document.createElement("video")) {
  const t = !/iPhone|iPod/.test(navigator.userAgent);
  return typeof e.webkitSetPresentationMode == "function" && t;
}
const Oe = {
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
      return Ce.apply(this, [e, ...t]);
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
}, H = {
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
}, Se = o.shape({
  options: o.shape({
    visual: o.bool,
    buying: o.bool,
    liking: o.bool,
    download: o.bool,
    sharing: o.bool,
    show_comments: o.bool,
    show_playcount: o.bool
  }).loose
}).loose.def(() => H), x = {
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
}, Ee = o.shape({
  playerVars: o.shape({
    playsinline: o.integer,
    showinfo: o.integer,
    rel: o.integer,
    iv_load_policy: o.integer,
    modestbranding: o.integer
  }).loose,
  embedOptions: o.object,
  onUnstarted: o.func
}).loose.def(() => x), N = {
  appId: "1309697205772819",
  version: "v3.3",
  playerId: null,
  attributes: {}
}, Me = o.shape({
  appId: o.string,
  version: o.string,
  playerId: o.string,
  attributes: o.object
}).loose.def(() => N), V = {
  params: {
    api: 1,
    "endscreen-enable": !1
  }
}, Ie = o.shape({
  params: o.shape({
    api: o.integer,
    "endscreen-enable": o.bool
  }).loose
}).loose.def(() => V), z = {
  playerOptions: {
    autopause: !1,
    byline: !1,
    portrait: !1,
    title: !1
  },
  title: null
}, ke = o.shape({
  playerOptions: o.shape({
    autopause: o.bool,
    byline: o.bool,
    portrait: o.bool,
    title: o.bool
  }).loose,
  title: o.string
}).loose.def(() => z), F = {
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
}, $e = o.shape({
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
}).loose.def(() => F), B = {
  wistia: {
    options: {},
    playerId: null,
    customControls: null
  }
}, Re = o.shape({
  wistia: o.shape({
    options: o.object,
    playerId: o.string,
    customControls: o.array
  }).loose
}).loose.def(() => B), K = {
  options: {
    hide_cover: 1
  }
}, je = o.shape({
  options: o.shape({
    hide_cover: o.integer
  }).loose
}).loose.def(() => K), Y = {
  options: {},
  playerId: null
}, Ue = o.shape({
  options: o.object,
  playerId: o.string
}).loose.def(() => Y), q = {
  options: {}
}, De = o.shape({
  options: o.object
}).loose.def(() => q), _ = {
  soundcloud: H,
  youtube: x,
  facebook: N,
  dailymotion: V,
  vimeo: z,
  file: F,
  wistia: B,
  mixcloud: K,
  twitch: Y,
  vidyard: q
}, Le = o.shape({
  soundcloud: Se,
  youtube: Ee,
  facebook: Me,
  dailymotion: Ie,
  vimeo: ke,
  file: $e,
  wistia: Re,
  mixcloud: je,
  twitch: Ue,
  vidyard: De
}).def(() => _), He = o.oneOfType([
  o.object,
  o.string,
  o.func
]), xe = {
  mixins: [Oe],
  props: {
    config: Le,
    progressFrequency: o.number,
    activePlayer: He
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
const $ = /(?:youtu\.be\/|youtube(?:-nocookie)?\.com\/(?:embed\/|v\/|watch\/|watch\?v=|watch\?.+&v=))((\w|-){11})|youtube\.com\/playlist\?list=|youtube\.com\/user\//, Ne = /(?:soundcloud\.com|snd\.sc)\/[^.]+$/, Ve = /vimeo\.com\/(?!progressive_redirect).+/, ze = /^https?:\/\/(www\.)?facebook\.com.*\/(video(s)?|watch|story)(\.php?|\/).+$/, Fe = /^https?:\/\/fb\.watch\/.+$/, Be = /streamable\.com\/([a-z0-9]+)$/, Ke = /(?:wistia\.(?:com|net)|wi\.st)\/(?:medias|embed)\/(?:iframe\/)?(.*)$/, Ye = /(?:www\.|go\.)?twitch\.tv\/videos\/(\d+)($|\?)/, qe = /(?:www\.|go\.)?twitch\.tv\/([a-zA-Z0-9_]+)($|\?)/, We = /^(?:(?:https?):)?(?:\/\/)?(?:www\.)?(?:(?:dailymotion\.com(?:\/embed)?\/video)|dai\.ly)\/([a-zA-Z0-9]+)(?:_[\w_-]+)?$/, Xe = /mixcloud\.com\/([^/]+\/[^/]+)/, Ze = /vidyard.com\/(?:watch\/)?([a-zA-Z0-9-_]+)/, Qe = /^https?:\/\/[a-zA-Z]+\.kaltura.(com|org)\/p\/([0-9]+)\/sp\/([0-9]+)00\/embedIframeJs\/uiconf_id\/([0-9]+)\/partner_id\/([0-9]+)(.*)entry_id.([a-zA-Z0-9-_]+)$/, T = /\.(m4a|m4b|mp4a|mpga|mp2|mp2a|mp3|m2a|m3a|wav|weba|aac|oga|spx)($|\?)/i, W = /\.(mp4|og[gv]|webm|mov|m4v)(#t=[,\d+]+)?($|\?)/i, X = /\.(m3u8)($|\?)/i, Je = /\.(mpd)($|\?)/i, Ge = /\.(flv)($|\?)/i, A = (e) => {
  if (e instanceof Array) {
    for (const t of e)
      if (typeof t == "string" && A(t) || A(t.src))
        return !0;
    return !1;
  }
  return _e(e) || Ae(e) ? !0 : T.test(e) || W.test(e) || X.test(e) || Je.test(e) || Ge.test(e);
}, i = {
  /**
   * @type {CanPlayUrl}
   */
  youtube: (e) => e instanceof Array ? e.every((t) => $.test(t)) : $.test(e),
  /**
   * @type {CanPlayUrl}
   */
  soundcloud: (e) => Ne.test(e) && !T.test(e),
  /**
   * @type {CanPlayUrl}
   */
  vimeo: (e) => Ve.test(e) && !W.test(e) && !X.test(e),
  /**
   * @type {CanPlayUrl}
   */
  facebook: (e) => ze.test(e) || Fe.test(e),
  /**
   * @type {CanPlayUrl}
   */
  streamable: (e) => Be.test(e),
  /**
   * @type {CanPlayUrl}
   */
  wistia: (e) => Ke.test(e),
  /**
   * @type {CanPlayUrl}
   */
  twitch: (e) => Ye.test(e) || qe.test(e),
  /**
   * @type {CanPlayUrl}
   */
  dailymotion: (e) => We.test(e),
  /**
   * @type {CanPlayUrl}
   */
  mixcloud: (e) => Xe.test(e),
  /**
   * @type {CanPlayUrl}
   */
  vidyard: (e) => Ze.test(e),
  /**
   * @type {CanPlayUrl}
   */
  kaltura: (e) => Qe.test(e),
  /**
   * @type {CanPlayUrl}
   */
  file: A
}, v = [
  /**
   * @type {PlayerDecl<"youtube", "YouTube", import("./components/players/YouTubePlayer.vue").default>}
   */
  {
    key: "youtube",
    name: "YouTube",
    canPlay: i.youtube,
    lazyPlayer: () => import(
      /* webpackChunkName: 'vuePlayerYouTube' */
      "./YouTubePlayer-DKowCAUj.mjs"
    )
  },
  /**
   * @type {PlayerDecl<"soundcloud", "SoundCloud", import("./components/players/SoundCloudPlayer.vue").default>}
   */
  {
    key: "soundcloud",
    name: "SoundCloud",
    canPlay: i.soundcloud,
    lazyPlayer: () => import(
      /* webpackChunkName: 'vuePlayerSoundCloud' */
      "./SoundcloudPlayer-CKCZbGHx.mjs"
    )
  },
  /**
   * @type {PlayerDecl<"vimeo", "Vimeo", import("./components/players/VimeoPlayer.vue").default>}
   */
  {
    key: "vimeo",
    name: "Vimeo",
    canPlay: i.vimeo,
    lazyPlayer: () => import(
      /* webpackChunkName: 'vuePlayerVimeo' */
      "./VimeoPlayer-3C-C52mk.mjs"
    )
  },
  /**
   * @type {PlayerDecl<"facebook", "Facebook", import("./components/players/FacebookPlayer.vue").default>}
   */
  {
    key: "facebook",
    name: "Facebook",
    canPlay: i.facebook,
    lazyPlayer: () => import(
      /* webpackChunkName: 'vuePlayerFacebook' */
      "./FacebookPlayer-BabF00m4.mjs"
    )
  },
  /**
   * @type {PlayerDecl<"streamable", "Streamable", import("./components/players/StreamablePlayer.vue").default>}
   */
  {
    key: "streamable",
    name: "Streamable",
    canPlay: i.streamable,
    lazyPlayer: () => import(
      /* webpackChunkName: 'vuePlayerStreamable' */
      "./StreamablePlayer-B7Eaa9Vb.mjs"
    )
  },
  /**
   * @type {PlayerDecl<"wistia", "Wistia", import("./components/players/WistiaPlayer.vue").default>}
   */
  {
    key: "wistia",
    name: "Wistia",
    canPlay: i.wistia,
    lazyPlayer: () => import(
      /* webpackChunkName: 'vuePlayerWistia' */
      "./WistiaPlayer-S7q4tKet.mjs"
    )
  },
  /**
   * @type {PlayerDecl<"twitch", "Twitch", import("./components/players/TwitchPlayer.vue").default>}
   */
  {
    key: "twitch",
    name: "Twitch",
    canPlay: i.twitch,
    lazyPlayer: () => import(
      /* webpackChunkName: 'vuePlayerTwitch' */
      "./TwitchPlayer-DYs2DoeX.mjs"
    )
  },
  /**
   * @type {PlayerDecl<"dailymotion", "DailyMotion", import("./components/players/DailyMotionPlayer.vue").default>}
   */
  {
    key: "dailymotion",
    name: "DailyMotion",
    canPlay: i.dailymotion,
    lazyPlayer: () => import(
      /* webpackChunkName: 'vuePlayerDailyMotion' */
      "./DailyMotionPlayer-D8q8B0xb.mjs"
    )
  },
  /**
   * @type {PlayerDecl<"mixcloud", "Mixcloud", import("./components/players/MixcloudPlayer.vue").default>}
   */
  {
    key: "mixcloud",
    name: "Mixcloud",
    canPlay: i.mixcloud,
    lazyPlayer: () => import(
      /* webpackChunkName: 'vuePlayerMixcloud' */
      "./MixcloudPlayer-DUCkqKnZ.mjs"
    )
  },
  /**
   * @type {PlayerDecl<"vidyard", "Vidyard", import("./components/players/VidyardPlayer.vue").default>}
   */
  {
    key: "vidyard",
    name: "Vidyard",
    canPlay: i.vidyard,
    lazyPlayer: () => import(
      /* webpackChunkName: 'vuePlayerVidyard' */
      "./VidyardPlayer-CaCu2tPP.mjs"
    )
  },
  /**
   * @type {PlayerDecl<"kaltura", "Kaltura", import("./components/players/KalturaPlayer.vue").default>}
   */
  {
    key: "kaltura",
    name: "Kaltura",
    canPlay: i.kaltura,
    lazyPlayer: () => import(
      /* webpackChunkName: 'vuePlayerKaltura' */
      "./KalturaPlayer-DWBHDwzD.mjs"
    )
  },
  /**
   * @type {PlayerDecl<"file", "FilePlayer", import("./components/players/FilePlayer.vue").default>}
   */
  {
    key: "file",
    name: "FilePlayer",
    canPlay: i.file,
    canEnablePIP: (e) => i.file(e) && (document.pictureInPictureEnabled || Te()) && !T.test(e),
    lazyPlayer: () => import(
      /* webpackChunkName: 'vuePlayerFilePlayer' */
      "./FilePlayer-BVGAHlK2.mjs"
    )
  }
];
var R = Number.isNaN || function(t) {
  return typeof t == "number" && t !== t;
};
function et(e, t) {
  return !!(e === t || R(e) && R(t));
}
function tt(e, t) {
  if (e.length !== t.length)
    return !1;
  for (var r = 0; r < e.length; r++)
    if (!et(e[r], t[r]))
      return !1;
  return !0;
}
function j(e, t) {
  t === void 0 && (t = tt);
  var r = null;
  function n() {
    for (var a = [], s = 0; s < arguments.length; s++)
      a[s] = arguments[s];
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
const ot = (e, t) => {
  const r = e.__vccOpts || e;
  for (const [n, a] of t)
    r[n] = a;
  return r;
};
let u = [];
const rt = {
  // [META]
  displayName: "VuePlayer",
  /**
   * @template {string} Key
   * @template {string} Name
   * @template {Component} C
   * @param {PlayerDecl<Key, Name, C>} player
   */
  addCustomPlayer(e) {
    u.push(e);
  },
  /**
   * @template {string} Key
   * @template {string} Name
   * @template {Component} C
   * @param {PlayerDecl<Key, Name, C>} player
   */
  removeCustomPlayer(e) {
    u = u.filter((t) => t !== e);
  },
  removeCustomPlayers() {
    u = [];
  },
  canPlay(e) {
    return [...u, ...v].some((t) => t.canPlay(e));
  },
  canEnablePIP(e) {
    return [...u, ...v].some((t) => {
      var r;
      return (r = t.canEnablePIP) == null ? void 0 : r.call(t, e);
    });
  },
  // [/META]
  inheritAttrs: !1,
  mixins: [xe],
  emits: ["click-preview"],
  components: {
    Preview: () => import(
      /* webpackChunkName: 'vuePlayerPreview' */
      "./Preview-EEHRsX_T.mjs"
    ),
    Player: () => import(
      /* webpackChunkName: 'vuePlayerPlayer' */
      "./Player-B9VYdpax.mjs"
    )
  },
  data() {
    return {
      shouldShowPreview: !!this.light
    };
  },
  mounted() {
    this.getConfig = j(this.getConfig), this.getActivePlayer = j(this.getActivePlayer);
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
      return be.all([
        _,
        _[t] ?? {},
        this.config ?? {},
        ((r = this.config) == null ? void 0 : r[t]) ?? {}
      ]);
    },
    getActivePlayer(e) {
      return [...u, ...v].find((t) => t.canPlay(e));
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
}, nt = { key: 0 };
function at(e, t, r, n, a, s) {
  const l = Z("Preview");
  return p(), h(E(e.wrapper), b({ ref: "wrapper" }, e.$attrs), {
    default: g(() => [
      e.url ? (p(), M("span", nt, [
        w(e.$slots, "noUrl")
      ])) : (p(), M(Q, { key: 1 }, [
        a.shouldShowPreview ? (p(), h(l, b({ key: 0 }, s.previewProps, { onClick: s.handleClickPreview }), {
          playIcon: g(() => [
            w(e.$slots, "playIcon")
          ]),
          _: 3
        }, 16, ["onClick"])) : (p(), h(E(s.currentPlayer), b({ key: 1 }, e.$props, {
          key: s.playerKey,
          ref: "player",
          config: s.playerConfig,
          activePlayer: s.playerComponent,
          style: s.playerStyles,
          onReady: s.handleReady
        }, J(e.$listeners)), {
          none: g(() => [
            w(e.$slots, "#noPlayer")
          ]),
          _: 3
        }, 16, ["config", "activePlayer", "style", "onReady"]))
      ], 64))
    ]),
    _: 3
  }, 16);
}
const pt = /* @__PURE__ */ ot(rt, [["render", at]]);
export {
  T as A,
  Je as D,
  Ge as F,
  X as H,
  Be as M,
  pt as V,
  ot as _,
  lt as a,
  ct as b,
  i as c,
  Ke as d,
  qe as e,
  Me as f,
  dt as g,
  Ie as h,
  We as i,
  je as j,
  Xe as k,
  De as l,
  xe as m,
  Ze as n,
  $e as o,
  Oe as p,
  ft as q,
  ut as r,
  Se as s,
  Ue as t,
  _e as u,
  ke as v,
  Re as w,
  Te as x,
  Ee as y
};

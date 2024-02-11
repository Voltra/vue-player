import { _ as R, c as k, p as D, o as _, A as w, u as f, x as p, H as O, D as U, F as H } from "./index-Bujz9oM-.mjs";
import { openBlock as l, createBlock as V, resolveDynamicComponent as M, mergeProps as y, withCtx as N, createElementBlock as d, Fragment as m, renderList as E, renderSlot as g, normalizeProps as S, guardReactiveProps as b, createCommentVNode as T } from "vue";
const I = typeof navigator < "u", j = I && navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1, A = I && (/iPad|iPhone|iPod/.test(navigator.userAgent) || j) && !window.MSStream, C = "https://cdn.jsdelivr.net/npm/hls.js@VERSION/dist/hls.min.js", F = "Hls", B = "https://cdnjs.cloudflare.com/ajax/libs/dashjs/VERSION/dash.all.min.js", x = "dashjs", K = "https://cdn.jsdelivr.net/npm/flv.js@VERSION/dist/flv.min.js", G = "flvjs", X = /www\.dropbox\.com\/.+/, v = /https:\/\/watch\.cloudflarestream\.com\/([a-z0-9]+)/, z = "https://videodelivery.net/{id}/manifest/video.m3u8", q = {
  // [META]
  displayName: "FilePlayer",
  canPlay: k.file,
  // [/META]
  mixins: [D],
  props: {
    config: _
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
      return (e = this.config) != null && e.forceVideo || this.config.attributes.poster ? !1 : w.test(this.url) || this.config.forceAudio;
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
    this.addListeners(this.$refs.player), A && ((t = (e = this.$refs.player) == null ? void 0 : e.load) == null || t.call(e)), this.$watch(
      () => this.$refs.player,
      (s, i) => {
        this.prevPlayer = i;
      }
    );
  },
  beforeUnmount() {
    var e, t;
    this.prevPlayer = null, this.removeListeners(this.$refs.player), (t = (e = this.hls) == null ? void 0 : e.destroy) == null || t.call(e);
  },
  watch: {
    url(e, t) {
      this.prevUrl = t, !f(e) && this.$refs.player && (this.$refs.player.srcObject = null);
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
      var e, t, s, i;
      (t = (e = this.$refs.player) == null ? void 0 : e.removeAttribute) == null || t.call(e, "src"), (i = (s = this.dash) == null ? void 0 : s.reset) == null || i.call(s);
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
      var e, t, s, i, h, r;
      (e = this.$refs.player) != null && e.requestPictureInPicture && document.pictureInPictureElement !== this.$refs.player ? ((s = (t = this.$refs.player) == null ? void 0 : t.requestPictureInPicture) == null || s.call(t), this.onEnablePIP()) : p(this.$refs.player) && ((i = this.$refs.player) == null ? void 0 : i.webkitPresentationMode) !== "picture-in-picture" && ((r = (h = this.$refs.player) == null ? void 0 : h.webkitSetPresentationMode) == null || r.call(h, "picture-in-picture"), this.onEnablePIP());
    },
    /**
     * @inheritDoc
     * @override
     * @playerHook disablePIP
     */
    disablePIP() {
      var e, t, s;
      document.exitPictureInPicture && document.pictureInPictureElement === this.$refs.player ? (document.exitPictureInPicture(), this.onDisablePIP()) : p(this.$refs.player) && ((e = this.$refs.player) == null ? void 0 : e.webkitPresentationMode) !== "inline" && ((s = (t = this.$refs.player) == null ? void 0 : t.webkitSetPresentationMode) == null || s.call(t, "inline"), this.onDisablePIP());
    },
    async load(e) {
      var r, n, a, L, c, P;
      const { hlsVersion: t, hlsOptions: s, dashVersion: i, flvVersion: h } = this.config;
      if ((n = (r = this.hls) == null ? void 0 : r.destroy) == null || n.call(r), (L = (a = this.dash) == null ? void 0 : a.reset) == null || L.call(a), this.shouldUseHLS(e)) {
        const o = await getSDK(C.replace("VERSION", t), F);
        if (this.hls = new o(s), this.hls.on(o.Events.MANIFEST_PARSED, () => {
          this.onReady();
        }), this.hls.on(o.Events.ERROR, (u, $) => {
          this.onError(u, $, this.hls, o);
        }), v.test(e)) {
          const u = e.match(v)[1];
          this.hls.loadSource(z.replace("{id}", u));
        } else
          this.hls.loadSource(e);
        this.hls.attachMedia(this.$refs.player), this.onLoaded();
      } else if (this.shouldUseDASH(e)) {
        const o = await getSDK(B.replace("VERSION", i), x);
        this.dash = o.MediaPlayer().create(), this.dash.initialize(this.$refs.player, e, this.playing), this.dash.on("error", this.onError), parseInt(i) < 3 ? this.dash.getDebug().setLogToBrowserConsole(!1) : this.dash.updateSettings({ debug: { logLevel: o.Debug.LOG_LEVEL_NONE } }), this.onLoaded();
      } else if (this.shouldUseFLV(e)) {
        const o = await getSDK(K.replace("VERSION", h), G);
        this.flv = o.createPlayer({ type: "flv", url: e }), this.flv.attachMediaElement(this.$refs.player), this.flv.load(), this.onLoaded();
      }
      if (e instanceof Array)
        (P = (c = this.$refs.player) == null ? void 0 : c.load) == null || P.call(c);
      else if (f(e))
        try {
          this.$refs.player.srcObject = e;
        } catch {
          this.$refs.player.src = URL.createObjectURL(e);
        }
    },
    getSource(e) {
      const t = this.shouldUseHLS(e), s = this.shouldUseDASH(e), i = this.shouldUseFLV(e);
      if (!(e instanceof Array || f(e) || t || s || i))
        return X.test(e) ? e.replace("www.dropbox.com", "dl.dropboxusercontent.com") : e;
    },
    onPresentationModeChange(e) {
      if (this.$refs.player && p(this.$refs.player)) {
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
      return (t = this.config) != null && t.forceHLS ? !0 : A ? !1 : O.test(e) || v.test(e);
    },
    shouldUseDASH(e) {
      return U.test(e) || this.props.config.forceDASH;
    },
    shouldUseFLV(e) {
      return H.test(e) || this.props.config.forceFLV;
    }
  }
}, W = ["src"];
function J(e, t, s, i, h, r) {
  return l(), V(M(r.tag), y({
    ref: "player",
    class: "vue-player--file",
    style: r.styles,
    preload: "auto",
    src: r.src,
    autoplay: e.playing,
    controls: e.controls,
    muted: e.muted,
    loop: e.loop
  }, s.config.attributes), {
    default: N(() => [
      r.urlIsArray ? (l(), d(m, { key: 0 }, [
        (l(!0), d(m, null, E(this.url, (n, a) => g(e.$slots, "source", S(b({ source: n })), () => [
          typeof n == "string" ? (l(), d("source", {
            src: n,
            key: n
          }, null, 8, W)) : (l(), d("source", y({ key: a }, n), null, 16))
        ])), 256)),
        (l(!0), d(m, null, E(this.config.tracks, (n, a) => g(e.$slots, "track", S(b({ track: n })), () => [
          (l(), d("track", y({ key: a }, n), null, 16))
        ])), 256))
      ], 64)) : T("", !0)
    ]),
    _: 3
  }, 16, ["style", "src", "autoplay", "controls", "muted", "loop"]);
}
const Z = /* @__PURE__ */ R(q, [["render", J]]);
export {
  Z as default
};

import { _ as I, c as $, p as _, o as k, A as D, u as p, x as y, H as R, D as w, F as O } from "./index-CYlonWpc.mjs";
import { openBlock as l, createBlock as U, resolveDynamicComponent as H, mergeProps as c, withCtx as V, createElementBlock as d, Fragment as m, renderList as E, renderSlot as g, createCommentVNode as M } from "vue";
const b = typeof navigator < "u", N = b && navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1, S = b && (/iPad|iPhone|iPod/.test(navigator.userAgent) || N) && !window.MSStream, T = "https://cdn.jsdelivr.net/npm/hls.js@VERSION/dist/hls.min.js", j = "Hls", C = "https://cdnjs.cloudflare.com/ajax/libs/dashjs/VERSION/dash.all.min.js", F = "dashjs", B = "https://cdn.jsdelivr.net/npm/flv.js@VERSION/dist/flv.min.js", x = "flvjs", K = /www\.dropbox\.com\/.+/, v = /https:\/\/watch\.cloudflarestream\.com\/([a-z0-9]+)/, G = "https://videodelivery.net/{id}/manifest/video.m3u8", X = {
  // [META]
  displayName: "FilePlayer",
  canPlay: $.file,
  // [/META]
  mixins: [_],
  props: {
    config: k()
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
      return (e = this.config) != null && e.forceVideo || this.config.attributes.poster ? !1 : D.test(this.url) || this.config.forceAudio;
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
    this.addListeners(this.$refs.player), S && ((t = (e = this.$refs.player) == null ? void 0 : e.load) == null || t.call(e)), this.$watch(
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
      this.prevUrl = t, !p(e) && this.$refs.player && (this.$refs.player.srcObject = null);
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
      if (!this.$refs.player) return null;
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
      if (!this.$refs.player) return null;
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
      (e = this.$refs.player) != null && e.requestPictureInPicture && document.pictureInPictureElement !== this.$refs.player ? ((s = (t = this.$refs.player) == null ? void 0 : t.requestPictureInPicture) == null || s.call(t), this.onEnablePIP()) : y(this.$refs.player) && ((i = this.$refs.player) == null ? void 0 : i.webkitPresentationMode) !== "picture-in-picture" && ((r = (h = this.$refs.player) == null ? void 0 : h.webkitSetPresentationMode) == null || r.call(h, "picture-in-picture"), this.onEnablePIP());
    },
    /**
     * @inheritDoc
     * @override
     * @playerHook disablePIP
     */
    disablePIP() {
      var e, t, s;
      document.exitPictureInPicture && document.pictureInPictureElement === this.$refs.player ? (document.exitPictureInPicture(), this.onDisablePIP()) : y(this.$refs.player) && ((e = this.$refs.player) == null ? void 0 : e.webkitPresentationMode) !== "inline" && ((s = (t = this.$refs.player) == null ? void 0 : t.webkitSetPresentationMode) == null || s.call(t, "inline"), this.onDisablePIP());
    },
    async load(e) {
      var r, n, a, L, u, P;
      const { hlsVersion: t, hlsOptions: s, dashVersion: i, flvVersion: h } = this.config;
      if ((n = (r = this.hls) == null ? void 0 : r.destroy) == null || n.call(r), (L = (a = this.dash) == null ? void 0 : a.reset) == null || L.call(a), this.shouldUseHLS(e)) {
        const o = await getSDK(T.replace("VERSION", t), j);
        if (this.hls = new o(s), this.hls.on(o.Events.MANIFEST_PARSED, () => {
          this.onReady();
        }), this.hls.on(o.Events.ERROR, (f, A) => {
          this.onError(f, A, this.hls, o);
        }), v.test(e)) {
          const f = e.match(v)[1];
          this.hls.loadSource(G.replace("{id}", f));
        } else
          this.hls.loadSource(e);
        this.hls.attachMedia(this.$refs.player), this.onLoaded();
      } else if (this.shouldUseDASH(e)) {
        const o = await getSDK(C.replace("VERSION", i), F);
        this.dash = o.MediaPlayer().create(), this.dash.initialize(this.$refs.player, e, this.playing), this.dash.on("error", this.onError), parseInt(i) < 3 ? this.dash.getDebug().setLogToBrowserConsole(!1) : this.dash.updateSettings({ debug: { logLevel: o.Debug.LOG_LEVEL_NONE } }), this.onLoaded();
      } else if (this.shouldUseFLV(e)) {
        const o = await getSDK(B.replace("VERSION", h), x);
        this.flv = o.createPlayer({ type: "flv", url: e }), this.flv.attachMediaElement(this.$refs.player), this.flv.load(), this.onLoaded();
      }
      if (e instanceof Array)
        (P = (u = this.$refs.player) == null ? void 0 : u.load) == null || P.call(u);
      else if (p(e))
        try {
          this.$refs.player.srcObject = e;
        } catch {
          this.$refs.player.src = URL.createObjectURL(e);
        }
    },
    getSource(e) {
      const t = this.shouldUseHLS(e), s = this.shouldUseDASH(e), i = this.shouldUseFLV(e);
      if (!(e instanceof Array || p(e) || t || s || i))
        return K.test(e) ? e.replace("www.dropbox.com", "dl.dropboxusercontent.com") : e;
    },
    onPresentationModeChange(e) {
      if (this.$refs.player && y(this.$refs.player)) {
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
      return (t = this.config) != null && t.forceHLS ? !0 : S ? !1 : R.test(e) || v.test(e);
    },
    shouldUseDASH(e) {
      return w.test(e) || this.props.config.forceDASH;
    },
    shouldUseFLV(e) {
      return O.test(e) || this.props.config.forceFLV;
    }
  }
}, q = ["src"];
function z(e, t, s, i, h, r) {
  return l(), U(H(r.tag), c({
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
    default: V(() => [
      r.urlIsArray ? (l(), d(m, { key: 0 }, [
        (l(!0), d(m, null, E(this.url, (n, a) => g(e.$slots, "source", c({ ref_for: !0 }, { source: n }), () => [
          typeof n == "string" ? (l(), d("source", {
            src: n,
            key: n
          }, null, 8, q)) : (l(), d("source", c({
            key: a,
            ref_for: !0
          }, n), null, 16))
        ])), 256)),
        (l(!0), d(m, null, E(this.config.tracks, (n, a) => g(e.$slots, "track", c({ ref_for: !0 }, { track: n }), () => [
          (l(), d("track", c({
            key: a,
            ref_for: !0
          }, n), null, 16))
        ])), 256))
      ], 64)) : M("", !0)
    ]),
    _: 3
  }, 16, ["style", "src", "autoplay", "controls", "muted", "loop"]);
}
const Q = /* @__PURE__ */ I(X, [["render", z]]);
export {
  Q as default
};

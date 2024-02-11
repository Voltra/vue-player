import { _ as o, m as d } from "./index-Bujz9oM-.mjs";
import { openBlock as l, createBlock as h, resolveDynamicComponent as u, mergeProps as y, toHandlers as p, createElementBlock as c, renderSlot as P } from "vue";
const f = 5e3, g = {
  mixins: [d],
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
    var e, s, i, t;
    clearTimeout(this.progressTimeout), clearTimeout(this.durationCheckTimeout), this.isReady && this.stopOnUnmount && ((s = (e = this.player) == null ? void 0 : e.stop) == null || s.call(e), (t = (i = this.player) == null ? void 0 : i.disablePIP) == null || t.call(i));
  },
  watch: {
    playing(e) {
      var s, i, t, n;
      e && !this.isPlaying ? ((i = (s = this.player) == null ? void 0 : s.play) == null || i.call(s), this.isPlaying = !0) : !e && this.isPlaying && ((n = (t = this.player) == null ? void 0 : t.pause) == null || n.call(t), this.isPlaying = !1);
    },
    pictureInPicture(e) {
      var s, i, t, n;
      e ? (i = (s = this.player) == null ? void 0 : s.enablePIP) == null || i.call(s) : (n = (t = this.player) == null ? void 0 : t.disablePIP) == null || n.call(t);
    },
    muted(e) {
      var s, i, t, n;
      e ? (i = (s = this.player) == null ? void 0 : s.mute) == null || i.call(s) : ((n = (t = this.player) == null ? void 0 : t.unmute) == null || n.call(t), this.volume !== null && this.$nextTick(() => {
        var a, r;
        return (r = (a = this.player) == null ? void 0 : a.setVolume) == null ? void 0 : r.call(a, volume);
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
      var e, s;
      return this.isReady ? (s = (e = this.player) == null ? void 0 : e.getDuration) == null ? void 0 : s.call(e) : null;
    },
    /**
     * @inheritDoc
     * @override
     * @playerHook getCurrentTime
     */
    getCurrentTime() {
      var e, s;
      return this.isReady ? (s = (e = this.player) == null ? void 0 : e.getCurrentTime) == null ? void 0 : s.call(e) : null;
    },
    /**
     * @inheritDoc
     * @override
     * @playerHook getSecondsLoaded
     */
    getSecondsLoaded() {
      var e, s;
      return this.isReady ? (s = (e = this.player) == null ? void 0 : e.getSecondsLoaded) == null ? void 0 : s.call(e) : null;
    },
    /**
     * @inheritDoc
     * @override
     * @playerHook getSecondsLoaded
     */
    seekTo(e, s) {
      if (!this.isReady) {
        e !== 0 && (this.seekOnPlay = e, setTimeout(() => {
          this.seekOnPlay = null;
        }, f));
        return;
      }
      if (s ? s === "fraction" : e > 0 && e < 1) {
        const t = this.player.getDuration();
        if (!t) {
          console.warn("VuePlayer: could not seek using fraction – duration not yet available");
          return;
        }
        this.player.seekTo(t * e);
        return;
      }
      this.player.seekTo(e);
    },
    handlePlayerMount(e) {
      this.player = e, this.player.load(this.url), this.progress();
    },
    getInternalPlayer(e) {
      var s;
      return (s = this.player) == null ? void 0 : s[e];
    },
    progress() {
      if (this.url && this.player && this.isReady) {
        const e = this.getCurrentTime() ?? 0, s = this.getSecondsLoaded(), i = this.getDuration();
        if (i) {
          const t = {
            playedSeconds: e,
            played: e / i
          };
          s !== null && (t.loadedSeconds = s, t.loaded = s / i), (t.playedSeconds !== this.prevPlayed || t.loadedSeconds !== this.prevLoaded) && this.onProgress(t), this.prevPlayed = t.playedSeconds, this.prevLoaded = t.loadedSeconds;
        }
      }
      this.progressTimeout = setTimeout(this.progress, this.progressFrequency ?? this.progressInterval);
    },
    handleReady() {
      if (!this.mounted)
        return;
      this.isReady = !0, this.isLoading = !1;
      const { onReady: e, playing: s, volume: i, muted: t } = this;
      e(), !t && i !== null && this.player.setVolume(i), this.loadOnReady ? (this.player.load(this.loadOnReady, !0), this.loadOnReady = null) : s && this.player.play(), this.handleDurationCheck();
    },
    handlePlay() {
      var t, n;
      this.isPlaying = !0, this.isLoading = !1;
      const { onStart: e, onPlay: s, playbackRate: i } = this;
      this.startOnPlay && (i !== 1 && ((n = (t = this.player) == null ? void 0 : t.setPlaybackRate) == null || n.call(t, i)), e(), this.startOnPlay = !1), s(), this.seekOnPlay && (this.seekTo(this.seekOnPlay), this.seekOnPlay = null), this.handleDurationCheck();
    },
    handlePause(e) {
      this.isPlaying = !1, this.isLoading || this.onPause(e);
    },
    handleEnded() {
      const { activePlayer: e, loop: s, onEnded: i } = this;
      e.loopOnEnded && s && this.seekTo(0), s || (this.isPlaying = !1, i());
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
}, m = {
  key: 1,
  class: "vue-player--none"
};
function k(e, s, i, t, n, a) {
  return e.activePlayer ? (l(), h(u(e.activePlayer), y({ key: 0 }, a.playerProps, {
    class: "vue-player",
    onMount: a.handlePlayerMount,
    onReady: a.handleReady,
    onPlay: a.handlePlay,
    onPause: a.handlePause,
    onEnded: a.handleEnded,
    onLoaded: a.handleLoaded,
    onError: a.handleError
  }, p(e.$listeners)), null, 16, ["onMount", "onReady", "onPlay", "onPause", "onEnded", "onLoaded", "onError"])) : (l(), c("span", m, [
    P(e.$slots, "none")
  ]));
}
const L = /* @__PURE__ */ o(g, [["render", k]]);
export {
  L as default
};

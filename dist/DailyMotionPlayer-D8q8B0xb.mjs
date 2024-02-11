import { _ as c, c as y, p, h as d, i as h, a as r, g as u } from "./index-Bujz9oM-.mjs";
import m from "vue-types";
import { openBlock as f, createElementBlock as g, normalizeStyle as _, createElementVNode as D } from "vue";
const P = "https://api.dmcdn.net/all.js", M = "DM", T = "dmAsyncInit", L = {
  // [META]
  displayName: "DailyMotion",
  canPlay: y.dailymotion,
  loopOnEnded: !0,
  // [/META]
  mixins: [p],
  props: {
    config: d,
    display: m.string.def("block")
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
    seekTo(t) {
      this.callPlayer("seek", t);
    },
    /**
     * @inheritDoc
     * @override
     * @playerHook setVolume
     */
    setVolume(t) {
      this.callPlayer("setVolume", t);
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
      var t;
      return ((t = this.player) == null ? void 0 : t.duration) || null;
    },
    /**
     * @inheritDoc
     * @override
     * @playerHook getCurrentTime
     */
    getCurrentTime() {
      var t;
      return (t = this.player) == null ? void 0 : t.currentTime;
    },
    /**
     * @inheritDoc
     * @override
     * @playerHook getSecondsLoaded
     */
    getSecondsLoaded() {
      var t;
      return (t = this.player) == null ? void 0 : t.bufferedTime;
    },
    async load(t) {
      const { controls: i, config: s, playing: n } = this, [, a] = t.match(h);
      if (this.player) {
        this.player.load(a, {
          start: r(t),
          autoplay: n
        });
        return;
      }
      try {
        const e = await u(P, M, T, (l) => l.player);
        if (!this.$refs.container)
          return;
        const o = e.player;
        this.player = new o(this.$refs.container, {
          width: "100%",
          height: "100%",
          video: a,
          params: {
            controls: i,
            autoplay: this.playing,
            mute: this.muted,
            start: r(t),
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
      } catch (e) {
        this.onError(e);
      }
    },
    onDurationChange() {
      const t = this.getDuration();
      this.onDuration(t);
    }
  }
}, S = { ref: "container" };
function k(t, i, s, n, a, e) {
  return f(), g("div", {
    class: "vue-player--dailymotion",
    style: _(e.styles)
  }, [
    D("div", S, null, 512)
  ], 4);
}
const A = /* @__PURE__ */ c(L, [["render", k]]);
export {
  A as default
};

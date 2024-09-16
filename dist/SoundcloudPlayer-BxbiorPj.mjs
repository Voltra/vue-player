import { _ as u, c as d, p as c, s as h, C as p, g as m } from "./index-CYlonWpc.mjs";
import { openBlock as y, createElementBlock as f, normalizeStyle as g } from "vue";
const P = "https://w.soundcloud.com/player/api.js", _ = "SC", S = {
  // [META]
  displayName: "Soundcloud",
  canPlay: d.soundcloud,
  loopOnEnded: !0,
  // [/META]
  mixins: [c],
  props: {
    config: h(),
    display: p.string.def("block")
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
    seekTo(t) {
      this.callPlayer("seekTo", t * 1e3);
    },
    /**
     * @inheritDoc
     * @override
     * @playerHook setVolume
     */
    setVolume(t) {
      this.callPlayer("setVolume", t * 100);
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
    async load(t, i) {
      try {
        const e = await m(P, _);
        if (!this.iframe) return;
        const { PLAY: o, PLAY_PROGRESS: a, PAUSE: r, FINISH: n, ERROR: l } = e.Widget.Events;
        i || (this.player = e.Widget(this.$refs.iframe), this.player.bind(o, this.onPlay), this.player.bind(r, () => {
          this.duration - this.currentTime < 0.05 || this.onPause();
        }), this.player.bind(a, (s) => {
          this.currentTime = s.currentPosition / 1e3, this.fractionLoaded = s.loadedProgress;
        }), this.player.bind(n, this.onEnded), this.player.bind(l, this.onError)), this.player.load(t, {
          ...this.config.options,
          callback: () => {
            this.player.getDuration((s) => {
              this.duration = s / 1e3, this.onReady();
            });
          }
        });
      } catch (e) {
        this.onError(e);
      }
    }
  }
}, E = ["src"];
function L(t, i, e, o, a, r) {
  return y(), f("iframe", {
    ref: "iframe",
    class: "vue-player--soundcloud",
    style: g(r.styles),
    src: r.src,
    frameborder: "0",
    allow: "autoplay"
  }, null, 12, E);
}
const T = /* @__PURE__ */ u(S, [["render", L]]);
export {
  T as default
};

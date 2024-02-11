import { _ as a, c as n, p as l, v as h, g as c } from "./index-Bujz9oM-.mjs";
import p from "vue-types";
import { openBlock as u, createElementBlock as y, normalizeStyle as d } from "vue";
const m = "https://player.vimeo.com/api/player.js", f = "Vimeo", P = {
  // [META]
  displayName: "Vimeo",
  canPlay: n.vimeo,
  forceLoad: !0,
  // [/META]
  mixins: [l],
  props: {
    config: h,
    display: p.string.def("block")
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
        const s = await c(m, f);
        if (!this.$refs.container)
          return;
        const { playerOptions: i, title: r } = this.config;
        this.player = new s.Player(this.$refs.container, {
          url: e,
          autoplay: this.playing,
          muted: this.muted,
          loop: this.loop,
          playsinline: this.playsinline,
          controls: this.controls,
          ...i
        }), this.player.ready().then(() => {
          const t = this.$refs.container.querySelector("iframe");
          t.style.width = "100%", t.style.height = "100%", r && (t.title = r);
        }).catch(this.onError), this.player.on("loaded", () => {
          this.onReady(), this.refreshDuration();
        }), this.player.on("play", () => {
          this.onPlay(), this.refreshDuration();
        }), this.player.on("pause", this.onPause), this.player.on("seeked", (t) => this.onSeek(t.seconds)), this.player.on("ended", this.onEnded), this.player.on("error", this.onError), this.player.on("timeupdate", ({ seconds: t }) => {
          this.currentTime = t;
        }), this.player.on("progress", ({ seconds: t }) => {
          this.secondsLoaded = t;
        }), this.player.on("bufferstart", this.onBuffer), this.player.on("bufferend", this.onBufferEnd);
      } catch (s) {
        this.onError(s);
      }
    },
    async refreshDuration() {
      this.duration = await this.player.getDuration();
    }
  }
};
function g(e, s, i, r, t, o) {
  return u(), y("div", {
    key: this.url,
    style: d(o.styles),
    ref: "container"
  }, null, 4);
}
const V = /* @__PURE__ */ a(P, [["render", g]]);
export {
  V as default
};

import { _ as s, c as n, p as l, g as i } from "./index-Bujz9oM-.mjs";
import { openBlock as o, createElementBlock as u } from "vue";
const c = "https://cdn.embed.ly/player-0.1.0.min.js", d = "playerjs", h = {
  // [META]
  displayName: "Kaltura",
  canPlay: n.kaltura,
  // [/META]
  mixins: [l],
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
        const t = await i(c, d);
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
        const a = this.duration !== t;
        this.duration = t, this.currentTime = r, a && this.onDuration(t), this.onSeek(r);
      });
    }
  }
}, p = ["src"];
function m(e, t, r, a, y, f) {
  return o(), u("iframe", {
    class: "vue-player--kaltura",
    ref: "iframe",
    src: e.url,
    frameborder: "0",
    scrolling: "no",
    allowfullscreen: "",
    allow: "encrypted-media;autoplay",
    referrerpolicy: "no-referrer-when-downgrade"
  }, null, 8, p);
}
const L = /* @__PURE__ */ s(h, [["render", m]]);
export {
  L as default
};

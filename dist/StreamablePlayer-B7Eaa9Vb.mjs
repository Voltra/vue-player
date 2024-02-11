import { _ as l, c as i, p as n, M as o } from "./index-Bujz9oM-.mjs";
import { openBlock as c, createElementBlock as u } from "vue";
const h = "https://cdn.embed.ly/player-0.1.0.min.js", d = "playerjs", p = {
  // [META]
  displayName: "Streamable",
  canPlay: i.streamable,
  // [/META]
  mixins: [n],
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
      return this.url.match(o)[1];
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
        const t = await getSDK(h, d);
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
}, m = ["src"];
function y(e, t, r, s, f, a) {
  return c(), u("iframe", {
    class: "vue-player--streamable",
    ref: "iframe",
    src: a.src,
    frameborder: "0",
    scrolling: "no",
    allowfullscreen: ""
  }, null, 8, m);
}
const L = /* @__PURE__ */ l(p, [["render", y]]);
export {
  L as default
};

import { _ as o, c as l, p as d, l as y, n as c, g as p } from "./index-Bujz9oM-.mjs";
import h from "vue-types";
import { openBlock as u, createElementBlock as m, normalizeStyle as _, createElementVNode as f } from "vue";
const P = "https://play.vidyard.com/embed/v4.js", V = "VidyardV4", g = "onVidyardAPI", k = {
  // [META]
  displayName: "Vidyard",
  canPlay: l.vidyard,
  // [/META]
  mixins: [d],
  props: {
    config: y,
    display: h.string.def("block")
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
      var e, t, a;
      (a = (t = (e = window.VidyardV4) == null ? void 0 : e.api) == null ? void 0 : t.destroyPlayer) == null || a.call(t, this.player);
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
        const { playing: t, config: a } = this, i = (e ?? this.url).match(c)[1];
        this.player && this.stop();
        const r = await p(P, V, g);
        if (!this.$refs.container)
          return;
        r.api.addReadyListener((s, n) => {
          this.player = n, this.player.on("ready", this.onReady), this.player.on("play", this.onPlay), this.player.on("pause", this.onPause), this.player.on("seek", this.onSeek), this.player.on("playerComplete", this.onEnded);
        }, i), r.api.renderPlayer({
          uuid: i,
          container: this.$refs.container,
          autoplay: t ? 1 : 0,
          ...a.options
        }), r.api.getPlayerMetadata(i).then((s) => {
          this.duration = s.length_in_seconds, this.onDuration(s.length_in_seconds);
        });
      } catch (t) {
        this.onError(t);
      }
    }
  }
}, D = { ref: "container" };
function v(e, t, a, i, r, s) {
  return u(), m("div", {
    style: _(s.styles)
  }, [
    f("div", D, null, 512)
  ], 4);
}
const A = /* @__PURE__ */ o(k, [["render", v]]);
export {
  A as default
};

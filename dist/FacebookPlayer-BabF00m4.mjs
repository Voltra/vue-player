import { _ as u, c as d, p as h, f as p, r as y, g as o } from "./index-Bujz9oM-.mjs";
import { openBlock as f, createElementBlock as b, mergeProps as m } from "vue";
const n = "https://connect.facebook.net/en_US/sdk.js", l = "FB", c = "fbAsyncInit", g = "facebook-player-", P = {
  // [META]
  displayName: "Facebook",
  canPlay: d.facebook,
  loopOnEnabled: !0,
  // [/META]
  events: ["loaded"],
  mixins: [h],
  props: {
    config: p
  },
  data() {
    return {
      randomId: `${g}${y()}`
    };
  },
  computed: {
    /**
     * @type {string}
     */
    playerID() {
      var e;
      return ((e = this == null ? void 0 : this.config) == null ? void 0 : e.playerId) ?? this.randomId;
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
      return this.callPlayer("getDuration");
    },
    /**
     * @inheritDoc
     * @override
     * @playerHook getCurrentTime
     */
    getCurrentTime() {
      return this.callPlayer("getCurrentTime");
    },
    /**
     * @inheritDoc
     * @override
     * @playerHook getSecondsLoaded
     */
    getSecondsLoaded() {
      return null;
    },
    async load(e, i) {
      var s, r;
      if (i) {
        const t = await o(n, l, c);
        (r = (s = t == null ? void 0 : t.XFBML) == null ? void 0 : s.parse) == null || r.call(s);
        return;
      }
      const a = await o(n, l, c);
      a.init({
        appId: this.config.appId,
        xfbml: !0,
        version: this.config.version
      }), a.Event.subscribe("xfbml.render", (t) => {
        this.onLoaded();
      }), a.Event.subscribe("xfbml.ready", (t) => {
        t.type === "video" && t.id === this.playerID && (this.player = t.instance, this.player.subscribe("startedPlaying", this.onPlay), this.player.subscribe("paused", this.onPause), this.player.subscribe("finishedPlaying", this.onEnded), this.player.subscribe("startedBuffering", this.onBuffer), this.player.subscribe("finishedBuffering", this.onBufferEnd), this.player.subscribe("error", this.onError), this.muted ? this.mute() : this.unmute(), this.onReady(), document.getElementById(this.playerID).querySelector("iframe").style.visibility = "visible");
      });
    },
    onLoaded(...e) {
      this.$emit("loaded", ...e);
    }
  }
}, _ = ["id", "data-href", "data-autoplay", "data-controls"];
function I(e, i, a, s, r, t) {
  return f(), b("div", m({
    id: this.playerID,
    class: "fb-video vue-player--facebook",
    "data-href": this.url,
    "data-autoplay": this.playing ? "true" : "false",
    "data-controls": this.controls ? "true" : "false",
    "data-allowfullscreen": "true"
  }, a.config.attributes), null, 16, _);
}
const v = /* @__PURE__ */ u(P, [["render", I]]);
export {
  v as default
};

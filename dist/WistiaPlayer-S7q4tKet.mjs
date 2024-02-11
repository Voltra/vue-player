import { _ as y, c as u, p as h, w as p, r as m, d as P } from "./index-Bujz9oM-.mjs";
import { openBlock as b, createElementBlock as _, normalizeClass as w } from "vue";
const f = "https://fast.wistia.com/assets/external/E-v1.js", g = "Wistia", k = "wistia-player-", C = {
  // [META]
  displayName: "Wistia",
  canPlay: u.wistia,
  loopOnEnded: !0,
  // [/META]
  mixins: [h],
  props: {
    config: p
  },
  data() {
    return {
      randomId: `${k}${m()}`
    };
  },
  computed: {
    pid() {
      return this.config.playerId ?? this.randomId;
    },
    videoId() {
      var a, e, s;
      return (s = (e = (a = this.url) == null ? void 0 : a.match) == null ? void 0 : e.call(a, P)) == null ? void 0 : s[1];
    },
    className() {
      return `vue-player--wistia wistia_embed wistia_async_${this.videoId}`;
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
      this.unbind(), this.callPlayer("remove");
    },
    /**
     * @inheritDoc
     * @override
     * @playerHook seekTo
     */
    seekTo(a) {
      this.callPlayer("time", a);
    },
    /**
     * @inheritDoc
     * @override
     * @playerHook setVolume
     */
    setVolume(a) {
      this.callPlayer("volume", a);
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
     * @playerHook setPlaybackRate
     */
    setPlaybackRate(a) {
      this.callPlayer("playbackRate", a);
    },
    /**
     * @inheritDoc
     * @override
     * @playerHook setPlaybackRate
     */
    getDuration() {
      return this.callPlayer("duration");
    },
    /**
     * @inheritDoc
     * @override
     * @playerHook getCurrentTime
     */
    getCurrentTime() {
      return this.callPlayer("time");
    },
    /**
     * @inheritDoc
     * @override
     * @playerHook getSecondsLoaded
     */
    getSecondsLoaded() {
      return null;
    },
    async load(a) {
      var e, s;
      try {
        const { playing: i, muted: n, controls: t, onReady: l, config: o, onError: r } = this, d = await getSDK(f, g);
        (s = (e = o.customControls) == null ? void 0 : e.forEach) == null || s.call(e, (c) => d.defineControl(c)), window._wq = window._wq || [], window._wq.push({
          id: this.playerID,
          options: {
            autoPlay: i,
            silentAutoPlay: "allow",
            muted: n,
            controlsVisibleOnLoad: t,
            fullscreenButton: t,
            playbar: t,
            playbackRateControl: t,
            qualityControl: t,
            volumeControl: t,
            settingsControl: t,
            smallPlayButton: t,
            ...o.options
          },
          onReady: (c) => {
            this.player = c, this.unbind(), this.player.bind("play", this.onPlay), this.player.bind("pause", this.onPause), this.player.bind("seek", this.onSeek), this.player.bind("end", this.onEnded), this.player.bind("playbackratechange", this.onPlaybackRateChange), l();
          }
        });
      } catch (i) {
        this.onError(i);
      }
    },
    unbind() {
      var a, e, s, i, n, t, l, o, r, d;
      (e = (a = this.player) == null ? void 0 : a.unbind) == null || e.call(a, "play", this.onPlay), (i = (s = this.player) == null ? void 0 : s.unbind) == null || i.call(s, "pause", this.onPause), (t = (n = this.player) == null ? void 0 : n.unbind) == null || t.call(n, "seek", this.onSeek), (o = (l = this.player) == null ? void 0 : l.unbind) == null || o.call(l, "end", this.onEnded), (d = (r = this.player) == null ? void 0 : r.unbind) == null || d.call(r, "playbackratechange", this.onPlaybackRateChange);
    }
  }
}, I = ["id"];
function R(a, e, s, i, n, t) {
  return b(), _("div", {
    id: t.pid,
    key: t.videoId,
    class: w(t.className)
  }, null, 10, I);
}
const S = /* @__PURE__ */ y(C, [["render", R]]);
export {
  S as default
};

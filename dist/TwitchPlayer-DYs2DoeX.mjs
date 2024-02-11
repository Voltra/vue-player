import { _ as f, c as T, p as g, t as v, r as w, e as c, a as I } from "./index-Bujz9oM-.mjs";
import { openBlock as C, createElementBlock as D } from "vue";
const S = "https://player.twitch.tv/js/embed/v1.js", A = "Twitch", N = "twitch-player-", R = {
  // [META]
  displayName: "Twitch",
  canPlay: T.twitch,
  loopOnEnded: !0,
  // [/META]
  mixins: [g],
  props: {
    config: v
  },
  data() {
    return {
      randomId: `${N}${w()}`
    };
  },
  computed: {
    pid() {
      return this.config.playerId ?? this.randomId;
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
    async load(t, o) {
      var e, r, a, i;
      try {
        const { playsinline: l, config: h, controls: p } = this, s = c.test(t), n = s ? t.match(c)[1] : t.match(MATCH_URL_TWITCH_VIDEO)[1];
        if (o) {
          s ? (r = (e = this.player) == null ? void 0 : e.setChannel) == null || r.call(e, n) : (i = (a = this.player) == null ? void 0 : a.setVideo) == null || i.call(a, "v" + n);
          return;
        }
        const d = await getSDK(S, A);
        this.player = new d.Player(this.pid, {
          video: s ? "" : n,
          channel: s ? n : "",
          height: "100%",
          width: "100%",
          playsinline: l,
          autoplay: this.playing,
          muted: this.muted,
          // https://github.com/CookPete/react-player/issues/733#issuecomment-549085859
          controls: s ? !0 : p,
          time: I(t),
          ...h.options
        });
        const { READY: y, PLAYING: u, PAUSE: m, ENDED: E, ONLINE: _, OFFLINE: L, SEEK: P } = d.Player;
        this.player.addEventListener(y, this.onReady), this.player.addEventListener(u, this.onPlay), this.player.addEventListener(m, this.onPause), this.player.addEventListener(E, this.onEnded), this.player.addEventListener(P, this.onSeek), this.player.addEventListener(_, this.onLoaded), this.player.addEventListener(L, this.onLoaded);
      } catch (l) {
        this.onError(l);
      }
    }
  }
}, k = ["id"];
function x(t, o, e, r, a, i) {
  return C(), D("div", {
    class: "vue-player--twitch",
    id: i.pid
  }, null, 8, k);
}
const $ = /* @__PURE__ */ f(R, [["render", x]]);
export {
  $ as default
};

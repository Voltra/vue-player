import { _ as E, c as w, p as A, y as D, a as P, b as m, g as C } from "./index-Bujz9oM-.mjs";
import { openBlock as R, createElementBlock as k, normalizeStyle as I, createElementVNode as L } from "vue";
const U = "https://www.youtube.com/iframe_api", g = "YT", O = "onYouTubeIframeAPIReady", u = /[?&](?:list|channel)=([a-zA-Z0-9_-]+)/, f = /user\/([a-zA-Z0-9_-]+)\/?/, V = /youtube-nocookie\.com/, v = "https://www.youtube-nocookie.com", B = {
  // [META]
  displayName: "YouTube",
  canPlay: w.youtube,
  // [/META]
  mixins: [A],
  props: {
    config: D
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
      this.callPlayer("playVideo");
    },
    /**
     * @inheritDoc
     * @override
     * @playerHook pause
     */
    pause() {
      this.callPlayer("pauseVideo");
    },
    /**
     * @inheritDoc
     * @override
     * @playerHook stop
     */
    stop() {
      document.body.contains(this.callPlayer("getIframe")) && this.callPlayer("stopVideo");
    },
    /**
     * @inheritDoc
     * @override
     * @playerHook seekTo
     */
    seekTo(e) {
      this.callPlayer("seekTo", e), this.playing || this.pause();
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
    setPlaybackRate(e) {
      this.callPlayer("setPlaybackRate", e);
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
      return this.callPlayer("getVideoLoadedFraction") * this.getDuration();
    },
    async load(e, t) {
      try {
        const { playing: s, muted: n, playsinline: l, controls: i, loop: y, config: d, onError: p } = this, { playerVars: o, embedOptions: r } = d, c = this.getID(e);
        if (t) {
          if (u.test(e) || f.test(e) || e instanceof Array) {
            this.player.loadPlaylist(this.parsePlaylist(e));
            return;
          }
          this.player.cueVideoById({
            videoId: c,
            startSeconds: P(e) || o.start,
            endSeconds: m(e) || o.end
          });
          return;
        }
        const h = await C(U, g, O, (a) => a.loaded);
        if (!this.container)
          return;
        this.player = new h.Player(this.container, {
          width: "100%",
          height: "100%",
          videoId: c,
          playerVars: {
            autoplay: s ? 1 : 0,
            mute: n ? 1 : 0,
            controls: i ? 1 : 0,
            start: P(e),
            end: m(e),
            origin: window.location.origin,
            playsinline: l ? 1 : 0,
            ...this.parsePlaylist(e),
            ...o
          },
          events: {
            onReady: () => {
              y && this.player.setLoop(!0), this.onReady();
            },
            onPlaybackRateChange: (a) => this.onPlaybackRateChange(a.data),
            onStateChange: this.onStateChange,
            onError: (a) => p(a.data)
          },
          host: V.test(e) ? v : void 0,
          ...r
        }), r.events && console.warn("Using `embedOptions.events` will likely break things. Use ReactPlayer’s callback props instead, eg onReady, onPlay, onPause");
      } catch (s) {
        this.onError(s);
      }
    },
    parsePlaylist(e) {
      if (e instanceof Array)
        return {
          listType: "playlist",
          playlist: e.map(this.getID).join(",")
        };
      if (u.test(e)) {
        const [, t] = e.match(u);
        return {
          listType: "playlist",
          list: t.replace(/^UC/, "UU")
        };
      }
      if (f.test(e)) {
        const [, t] = e.match(f);
        return {
          listType: "user_uploads",
          list: t
        };
      }
      return {};
    },
    onStateChange(e) {
      const { data: t } = e, {
        onPlay: s,
        onPause: n,
        onBuffer: l,
        onBufferEnd: i,
        onEnded: y,
        onReady: d,
        loop: p,
        config: { playerVars: o, onUnstarted: r }
      } = this, { UNSTARTED: c, PLAYING: h, PAUSED: a, BUFFERING: _, ENDED: T, CUED: b } = window[g].PlayerState;
      if (t === c && r(), t === h && (s(), i()), t === a && n(), t === _ && l(), t === T) {
        const S = !!this.callPlayer("getPlaylist");
        p && !S && (o.start ? this.seekTo(o.start) : this.play()), y();
      }
      t === b && d();
    }
  }
}, N = { ref: "container" };
function Y(e, t, s, n, l, i) {
  return R(), k("div", {
    class: "vue-player--youtube",
    style: I(i.styles)
  }, [
    L("div", N, null, 512)
  ], 4);
}
const G = /* @__PURE__ */ E(B, [["render", Y]]);
export {
  G as default
};

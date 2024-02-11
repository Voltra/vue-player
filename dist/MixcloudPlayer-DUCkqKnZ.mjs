import { _ as a, c as n, p as o, j as l, k as c, q as d, g as u } from "./index-Bujz9oM-.mjs";
import { openBlock as h, createElementBlock as p } from "vue";
const y = "https://widget.mixcloud.com/media/js/widgetApi.js", m = "Mixcloud", f = {
  // [META]
  displayName: "Mixcloud",
  canPlay: n.mixcloud,
  // [/META]
  mixins: [o],
  props: {
    config: l
  },
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
      return this.url.match(c)[1];
    },
    /**
     * @type {string}
     */
    query() {
      return d({
        ...this.config.options,
        feed: `/${this.id}/`
      });
    },
    /**
     * @type {string}
     */
    src() {
      return `https://www.mixcloud.com/widget/iframe/?${this.query}`;
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
    seekTo(r) {
      this.callPlayer("seek", r);
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
    async load(r) {
      try {
        const e = await u(y, m);
        this.player = e.PlayerWidget(this.$refs.iframe), this.player.ready.then(() => {
          this.player.events.play.on(this.onPlay), this.player.events.pause.on(this.onPause), this.player.events.ended.on(this.onEnded), this.player.events.error.on(this.onError), this.player.events.progress.on((t, s) => {
            this.currentTime = t, this.duration = s;
          }), this.onReady();
        });
      } catch (e) {
        this.onError(e);
      }
    }
  }
}, _ = ["src"];
function g(r, e, t, s, x, i) {
  return h(), p("iframe", {
    key: i.id,
    ref: "iframe",
    src: i.src,
    class: "vue-player--mixcloud",
    frameborder: "0"
  }, null, 8, _);
}
const w = /* @__PURE__ */ a(f, [["render", g]]);
export {
  w as default
};

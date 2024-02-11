import s from "vue-types";
import { openBlock as h, createElementBlock as o, normalizeStyle as c, renderSlot as d, createElementVNode as n } from "vue";
import { _ as m } from "./index-Bujz9oM-.mjs";
const l = {}, u = {
  emits: ["click"],
  props: {
    url: s.string.isRequired,
    oEmbedUrl: s.string.isRequired,
    previewTabIndex: s.integer.def(0),
    light: s.any
  },
  data() {
    return {
      image: null,
      mounted: !1
    };
  },
  mounted() {
    this.mounted = !0, this.fetchImage();
  },
  beforeUnmount() {
    this.mounted = !1;
  },
  computed: {
    /**
     * @type {Partial<CSSStyleDeclaration>}
     */
    previewStyles() {
      return this.image ? {
        backgroundImage: `url(${this.image})`
      } : {};
    }
  },
  methods: {
    /**
     * @param {MouseEvent} e
     */
    handleClick(e) {
      this.$emit("click", e);
    },
    /**
     * @param {KeyboardEvent} e
     */
    handleKeyPress(e) {
      (e.key === "Enter" || e.key === " ") && this.$emit("click", e);
    },
    async fetchImage() {
      if (typeof this.light == "string")
        this.image = this.light;
      else if (l[this.url])
        this.image = l[this.url];
      else {
        this.image = null;
        const t = await (await fetch(this.oEmbedUrl.replace("{url}", this.url))).json();
        if (typeof t.thumbnail_url < "u" && this.mounted) {
          const r = t.thumbnail_url.replace("height=100", "height=480");
          this.image = r, l[this.url] = r;
        }
      }
    },
    watch: {
      url: "fetchImage",
      light: "fetchImage"
    }
  }
}, p = ["tabindex"], f = /* @__PURE__ */ n("div", { class: "vue-player__shadow react-player__shadow" }, [
  /* @__PURE__ */ n("div", { class: "vue-player__play-icon react-player__play-icon" })
], -1);
function g(e, t, r, y, _, i) {
  return h(), o("div", {
    class: "vue-player__preview react-player__preview",
    tabindex: r.previewTabIndex,
    style: c(i.previewStyles),
    onClick: t[0] || (t[0] = (...a) => i.handleClick && i.handleClick(...a)),
    onKeydown: t[1] || (t[1] = (...a) => i.handleKeyPress && i.handleKeyPress(...a))
  }, [
    d(e.$slots, "playIcon", {}, () => [
      f
    ])
  ], 44, p);
}
const b = /* @__PURE__ */ m(u, [["render", g]]);
export {
  b as default
};

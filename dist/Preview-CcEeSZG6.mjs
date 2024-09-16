import { _ as h, C as s } from "./index-CYlonWpc.mjs";
import { openBlock as d, createElementBlock as o, normalizeStyle as c, renderSlot as m, createElementVNode as n } from "vue";
const a = {}, u = {
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
    handleClick(t) {
      this.$emit("click", t);
    },
    /**
     * @param {KeyboardEvent} e
     */
    handleKeyPress(t) {
      (t.key === "Enter" || t.key === " ") && this.$emit("click", t);
    },
    async fetchImage() {
      if (typeof this.light == "string")
        this.image = this.light;
      else if (a[this.url])
        this.image = a[this.url];
      else {
        this.image = null;
        const e = await (await fetch(this.oEmbedUrl.replace("{url}", this.url))).json();
        if (typeof e.thumbnail_url < "u" && this.mounted) {
          const r = e.thumbnail_url.replace("height=100", "height=480");
          this.image = r, a[this.url] = r;
        }
      }
    },
    watch: {
      url: "fetchImage",
      light: "fetchImage"
    }
  }
}, p = ["tabindex"];
function g(t, e, r, f, y, i) {
  return d(), o("div", {
    class: "vue-player__preview react-player__preview",
    tabindex: r.previewTabIndex,
    style: c(i.previewStyles),
    onClick: e[0] || (e[0] = (...l) => i.handleClick && i.handleClick(...l)),
    onKeydown: e[1] || (e[1] = (...l) => i.handleKeyPress && i.handleKeyPress(...l))
  }, [
    m(t.$slots, "playIcon", {}, () => [
      e[2] || (e[2] = n("div", { class: "vue-player__shadow react-player__shadow" }, [
        n("div", { class: "vue-player__play-icon react-player__play-icon" })
      ], -1))
    ])
  ], 44, p);
}
const w = /* @__PURE__ */ h(u, [["render", g]]);
export {
  w as default
};

import VueTypes from "vue-types";

/**
 * @type {VimeoConfig}
 */
export const vimeoConfigPropsDefaults = {
	playerOptions: {
		autopause: false,
		byline: false,
		portrait: false,
		title: false
	},
	title: null
};

/**
 * @type {import("vue-types").VueTypeShape<VimeoConfig>}
 */
export const vimeoConfigProps = VueTypes.shape({
	playerOptions: VueTypes.shape({
		autopause: VueTypes.bool,
		byline: VueTypes.bool,
		portrait: VueTypes.bool,
		title: VueTypes.bool,
	}).loose,
	title: VueTypes.string,
}).loose.def(() => vimeoConfigPropsDefaults);

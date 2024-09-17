import * as VueTypes from "vue-types";

/**
 * @returns {VimeoConfig}
 */
export const vimeoConfigPropsDefaults = () => ({
	playerOptions: {
		autopause: false,
		byline: false,
		portrait: false,
		title: false
	},
	title: null
});

/**
 * @returns {import("vue-types").VueTypeShape<VimeoConfig>}
 */
export const vimeoConfigProps = () => VueTypes.shape({
	playerOptions: VueTypes.shape({
		autopause: VueTypes.bool(),
		byline: VueTypes.bool(),
		portrait: VueTypes.bool(),
		title: VueTypes.bool(),
	}).loose,
	title: VueTypes.string(),
}).loose.def(() => vimeoConfigPropsDefaults());

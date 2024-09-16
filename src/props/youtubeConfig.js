import * as VueTypes from "vue-types";

/**
 * @returns {YoutubeConfig}
 */
export const youtubeConfigPropsDefaults = () => ({
	playerVars: {
		playsinline: 1,
		showinfo: 0,
		rel: 0,
		iv_load_policy: 3,
		modestbranding: 1
	},
	embedOptions: {},
	onUnstarted: () => {},
});

/**
 * @returns {import("vue-types").VueTypeShape<YoutubeConfig>}
 */
export const youtubeConfigProps = () => VueTypes.shape({
	playerVars: VueTypes.shape({
		playsinline: VueTypes.integer(),
		showinfo: VueTypes.integer(),
		rel: VueTypes.integer(),
		iv_load_policy: VueTypes.integer(),
		modestbranding: VueTypes.integer(),
	}).loose,
	embedOptions: VueTypes.object(),
	onUnstarted: VueTypes.func(),
}).loose.def(() => youtubeConfigPropsDefaults());

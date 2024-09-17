import * as VueTypes from "vue-types";

/**
 * @returns {SoundcloudConfig}
 */
export const soundcloudConfigPropsDefaults = () => ({
	options: {
		visual: true, // Undocumented, but makes player fill container and look better
		buying: false,
		liking: false,
		download: false,
		sharing: false,
		show_comments: false,
		show_playcount: false
	}
});

/**
 * @returns {import("vue-types").VueTypeShape<SoundcloudConfig>}
 */
export const soundcloudConfigProps = () => VueTypes.shape({
	options: VueTypes.shape({
		visual: VueTypes.bool(),
		buying: VueTypes.bool(),
		liking: VueTypes.bool(),
		download: VueTypes.bool(),
		sharing: VueTypes.bool(),
		show_comments: VueTypes.bool(),
		show_playcount: VueTypes.bool(),
	}).loose,
}).loose.def(() => soundcloudConfigPropsDefaults());

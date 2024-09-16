import VueTypes from "vue-types";

/**
 * @returns {MixcloudConfig}
 */
export const mixcloudConfigPropsDefaults = () => ({
	options: {
		hide_cover: 1
	}
});

/**
 * @returns {import("vue-types").VueTypeShape<MixcloudConfig>}
 */
export const mixcloudConfigProps = () => VueTypes.shape({
	options: VueTypes.shape({
		hide_cover: VueTypes.integer,
	}).loose,
}).loose.def(() => mixcloudConfigPropsDefaults());

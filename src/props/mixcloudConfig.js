import VueTypes from "vue-types";

/**
 * @type {MixcloudConfig}
 */
export const mixcloudConfigPropsDefaults = {
	options: {
		hide_cover: 1
	}
};

/**
 * @type {import("vue-types").VueTypeShape<MixcloudConfig>}
 */
export const mixcloudConfigProps = VueTypes.shape({
	options: VueTypes.shape({
		hide_cover: VueTypes.integer,
	}).loose,
}).loose.def(() => mixcloudConfigPropsDefaults);

import VueTypes from "vue-types";

/**
 * @type {VidyardConfig}
 */
export const vidyardConfigPropsDefaults = {
	options: {}
};

/**
 * @type {import("vue-types").VueTypeShape<VidyardConfig>}
 */
export const vidyardConfigProps = VueTypes.shape({
	options: VueTypes.object,
}).loose.def(() => vidyardConfigPropsDefaults);

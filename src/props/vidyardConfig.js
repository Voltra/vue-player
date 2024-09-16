import VueTypes from "vue-types";

/**
 * @returns {VidyardConfig}
 */
export const vidyardConfigPropsDefaults = () => ({
	options: {}
});

/**
 * @returns {import("vue-types").VueTypeShape<VidyardConfig>}
 */
export const vidyardConfigProps = () => VueTypes.shape({
	options: VueTypes.object,
}).loose.def(() => vidyardConfigPropsDefaults());

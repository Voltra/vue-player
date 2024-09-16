import VueTypes from "vue-types";

/**
 * @returns {DailymotionConfig}
 */
export const dailymotionConfigPropsDefaults = () => ({
	params: {
		api: 1,
		"endscreen-enable": false,
	},
});

/**
 * @returns {import("vue-types").VueTypeShape<DailymotionConfig>}
 */
export const dailymotionConfigProps = () => VueTypes.shape({
	params: VueTypes.shape({
		api: VueTypes.integer,
		"endscreen-enable": VueTypes.bool,
	}).loose,
}).loose.def(() => dailymotionConfigPropsDefaults());

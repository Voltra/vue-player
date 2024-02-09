import VueTypes from "vue-types";

/**
 * @type {DailymotionConfig}
 */
export const dailymotionConfigPropsDefaults = {
	params: {
		api: 1,
		"endscreen-enable": false,
	},
};

/**
 * @type {import("vue-types").VueTypeShape<DailymotionConfig>}
 */
export const dailymotionConfigProps = VueTypes.shape({
	params: VueTypes.shape({
		api: VueTypes.integer,
		"endscreen-enable": VueTypes.bool,
	}).loose,
}).loose.def(() => dailymotionConfigPropsDefaults);

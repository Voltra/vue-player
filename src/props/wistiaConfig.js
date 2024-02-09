import VueTypes from "vue-types";

/**
 * @type {WistiaConfig}
 */
export const wistiaConfigPropsDefaults = {
	wistia: {
		options: {},
		playerId: null,
		customControls: null
	}
};

/**
 * @type {import("vue-types").VueTypeShape<WistiaConfig>}
 */
export const wistiaConfigProps = VueTypes.shape({
	wistia: VueTypes.shape({
		options: VueTypes.object,
		playerId: VueTypes.string,
		customControls: VueTypes.array,
	}).loose,
}).loose.def(() => wistiaConfigPropsDefaults);

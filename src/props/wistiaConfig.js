import VueTypes from "vue-types";

/**
 * @returns {WistiaConfig}
 */
export const wistiaConfigPropsDefaults = () => ({
	wistia: {
		options: {},
		playerId: null,
		customControls: null
	}
});

/**
 * @returns {import("vue-types").VueTypeShape<WistiaConfig>}
 */
export const wistiaConfigProps = () => VueTypes.shape({
	wistia: VueTypes.shape({
		options: VueTypes.object,
		playerId: VueTypes.string,
		customControls: VueTypes.array,
	}).loose,
}).loose.def(() => wistiaConfigPropsDefaults());

import * as VueTypes from "vue-types";

/**
 * @returns {TwitchConfig}
 */
export const twitchConfigPropsDefaults = () => ({
	options: {},
	playerId: null
});

/**
 * @returns {import("vue-types").VueTypeShape<TwitchConfig>}
 */
export const twitchConfigProps = () => VueTypes.shape({
	options: VueTypes.object(),
	playerId: VueTypes.string(),
}).loose.def(() => twitchConfigPropsDefaults);

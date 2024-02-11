import VueTypes from "vue-types";

/**
 * @type {TwitchConfig}
 */
export const twitchConfigPropsDefaults = {
	options: {},
	playerId: null
};

/**
 * @type {import("vue-types").VueTypeShape<TwitchConfig>}
 */
export const twitchConfigProps = VueTypes.shape({
	options: VueTypes.object,
	playerId: VueTypes.string,
}).loose.def(() => twitchConfigPropsDefaults);

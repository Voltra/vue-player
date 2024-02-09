import VueTypes from "vue-types";

/**
 * @type {FacebookConfig}
 */
export const facebookConfigPropsDefaults = {
	appId: '1309697205772819',
	version: 'v3.3',
	playerId: null,
	attributes: {}
};

/**
 * @type {import("vue-types").VueTypeShape<FacebookConfig>}
 */
export const facebookConfigProps = VueTypes.shape({
	appId: VueTypes.string,
	version: VueTypes.string,
	playerId: VueTypes.string,
	attributes: VueTypes.object,
}).loose.def(() => facebookConfigPropsDefaults);

import { object, shape, string } from "vue-types";

export const facebookConfigPropsDefaults = {
	appId: '1309697205772819',
	version: 'v3.3',
	playerId: null,
	attributes: {}
};

export const facebookConfigProps = shape({
	appId: string,
	version: string,
	playerId: string,
	attributes: object,
}).loose.def(facebookConfigPropsDefaults);

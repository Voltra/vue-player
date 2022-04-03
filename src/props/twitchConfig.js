import { object, shape, string } from "vue-types";

export const twitchConfigPropsDefaults = {
	options: {},
	playerId: null
};

export const twitchConfigProps = shape({
	options: object,
	playerId: string,
}).loose.def(twitchConfigPropsDefaults);

import { array, object, shape, string } from "vue-types";

export const wistiaConfigPropsDefaults = {
	wistia: {
		options: {},
		playerId: null,
		customControls: null
	}
};

export const wistiaConfigProps = shape({
	options: object,
	playerId: string,
	customControls: array,
}).loose.def(wistiaConfigPropsDefaults);

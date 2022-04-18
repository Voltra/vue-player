import { bool, integer, shape } from "vue-types";

export const dailymotionConfigPropsDefaults = {
	params: {
		api: 1,
		"endscreen-enable": false,
	},
};

export const dailymotionConfigProps = shape({
	params: shape({
		api: integer,
		"endscreen-enable": bool,
	}).loose,
}).loose.def(dailymotionConfigPropsDefaults);

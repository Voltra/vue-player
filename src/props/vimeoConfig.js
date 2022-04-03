import { bool, object, shape, string } from "vue-types";

export const vimeoConfigPropsDefaults = {
	playerOptions: {
		autopause: false,
		byline: false,
		portrait: false,
		title: false
	},
	title: null
};

export const vimeoConfigProps = shape({
	playerOptions: shape({
		autopause: bool,
		byline: bool,
		portrait: bool,
		title: bool,
	}).loose,
	title: string,
}).loose.def(vimeoConfigPropsDefaults);

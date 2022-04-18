import { object, shape } from "vue-types";

export const vidyardConfigPropsDefaults = {
	options: {}
};

export const vidyardConfigProps = shape({
	options: object,
}).loose.def(vidyardConfigPropsDefaults);

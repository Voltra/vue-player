import { integer, object, shape } from "vue-types";

export const mixcloudConfigPropsDefaults = {
	options: {
		hide_cover: 1
	}
};

export const mixcloudConfigProps = shape({
	options: shape({
		hide_cover: integer,
	}).loose,
}).loose.def(mixcloudConfigPropsDefaults);

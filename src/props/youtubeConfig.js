import { func, integer, object, shape } from "vue-types";

export const youtubeConfigPropsDefaults = {
	playerVars: {
		playsinline: 1,
		showinfo: 0,
		rel: 0,
		iv_load_policy: 3,
		modestbranding: 1
	},
	embedOptions: {},
	onUnstarted: () => {},
};

export const youtubeConfigProps = shape({
	playerVars: shape({
		playsinline: integer,
		showinfo: integer,
		rel: integer,
		iv_load_policy: integer,
		modestbranding: integer,
	}).loose,
	embedOptions: object,
	onUnstarted: func,
}).loose.def(youtubeConfigPropsDefaults);

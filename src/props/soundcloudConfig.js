import { object, shape, bool } from "vue-types";

export const soundcloudConfigPropsDefaults = {
	options: {
		visual: true, // Undocumented, but makes player fill container and look better
		buying: false,
		liking: false,
		download: false,
		sharing: false,
		show_comments: false,
		show_playcount: false
	}
};

export const soundcloudConfigProps = shape({
	options: shape({
		visual: bool,
		buying: bool,
		liking: bool,
		download: bool,
		sharing: bool,
		show_comments: bool,
		show_playcount: bool,
	}).loose,
}).loose.def(soundcloudConfigPropsDefaults);

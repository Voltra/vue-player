import VueTypes, { array, bool, object, shape, string } from "vue-types";

/**
 * @type {FileConfig}
 */
export const fileConfigPropsDefaults = {
	attributes: {},
	tracks: [],
	forceVideo: false,
	forceAudio: false,
	forceHLS: false,
	forceDASH: false,
	forceFLV: false,
	hlsOptions: {},
	hlsVersion: '1.1.4',
	dashVersion: '3.1.3',
	flvVersion: '1.5.0'
};

/**
 * @type {import("vue-types").VueTypeShape<FileConfig>}
 */
export const fileConfigProps = VueTypes.shape({
	attributes: VueTypes.object,
	tracks: VueTypes.array,
	forceVideo: VueTypes.bool,
	forceAudio: VueTypes.bool,
	forceHLS: VueTypes.bool,
	forceDASH: VueTypes.bool,
	forceFLV: VueTypes.bool,
	hlsOptions: VueTypes.object,
	hlsVersion: VueTypes.string,
	dashVersion: VueTypes.string,
	flvVersion: VueTypes.string,
}).loose.def(() => fileConfigPropsDefaults);

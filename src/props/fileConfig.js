import { array, bool, object, shape, string } from "vue-types";

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

export const fileConfigProps = shape({
	attributes: object,
	tracks: array,
	forceVideo: bool,
	forceAudio: bool,
	forceHLS: bool,
	forceDASH: bool,
	forceFLV: bool,
	hlsOptions: object,
	hlsVersion: string,
	dashVersion: string,
	flvVersion: string,
}).loose.def(fileConfigPropsDefaults);

import { soundcloudConfigProps, soundcloudConfigPropsDefaults } from "./soundcloudConfig";
import { youtubeConfigProps, youtubeConfigPropsDefaults } from "./youtubeConfig";
import { facebookConfigProps, facebookConfigPropsDefaults } from "./facebookConfig";
import VueTypes from "vue-types";
import { dailymotionConfigProps, dailymotionConfigPropsDefaults } from "./dailymotionConfig";
import { vimeoConfigProps, vimeoConfigPropsDefaults } from "./vimeoConfig";
import { fileConfigProps, fileConfigPropsDefaults } from "./fileConfig";
import { wistiaConfigProps, wistiaConfigPropsDefaults } from "./wistiaConfig";
import { mixcloudConfigProps, mixcloudConfigPropsDefaults } from "./mixcloudConfig";
import { twitchConfigProps, twitchConfigPropsDefaults } from "./twitchConfig";
import { vidyardConfigProps, vidyardConfigPropsDefaults } from "./vidyardConfig";

export const configPropsDefaults = {
	soundcloud: soundcloudConfigPropsDefaults,
	youtube: youtubeConfigPropsDefaults,
	facebook: facebookConfigPropsDefaults,
	dailymotion: dailymotionConfigPropsDefaults,
	vimeo: vimeoConfigPropsDefaults,
	file: fileConfigPropsDefaults,
	wistia: wistiaConfigPropsDefaults,
	mixcloud: mixcloudConfigPropsDefaults,
	twitch: twitchConfigPropsDefaults,
	vidyard: vidyardConfigPropsDefaults,
};

export const configProps = VueTypes.shape({
	soundcloud: soundcloudConfigProps,
	youtube: youtubeConfigProps,
	facebook: facebookConfigProps,
	dailymotion: dailymotionConfigProps,
	vimeo: vimeoConfigProps,
	file: fileConfigProps,
	wistia: wistiaConfigProps,
	mixcloud: mixcloudConfigProps,
	twitch: twitchConfigProps,
	vidyard: vidyardConfigProps,
}).def(() => configPropsDefaults);

export const tagOrComponentProps = VueTypes.oneOfType([
	VueTypes.object,
	VueTypes.string,
	VueTypes.func,
]);

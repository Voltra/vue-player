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

/**
 * @returns {{
 *  youtube: YoutubeConfig,
 *  mixcloud: MixcloudConfig,
 *  dailymotion: DailymotionConfig,
 *  file: FileConfig,
 *  twitch: TwitchConfig,
 *  vimeo: VimeoConfig,
 *  wistia: WistiaConfig,
 *  facebook: FacebookConfig,
 *  soundcloud: SoundcloudConfig,
 *  vidyard: VidyardConfig
 * }}
 */
export const configPropsDefaults = () => ({
	soundcloud: soundcloudConfigPropsDefaults(),
	youtube: youtubeConfigPropsDefaults(),
	facebook: facebookConfigPropsDefaults(),
	dailymotion: dailymotionConfigPropsDefaults(),
	vimeo: vimeoConfigPropsDefaults(),
	file: fileConfigPropsDefaults(),
	wistia: wistiaConfigPropsDefaults(),
	mixcloud: mixcloudConfigPropsDefaults(),
	twitch: twitchConfigPropsDefaults(),
	vidyard: vidyardConfigPropsDefaults(),
});

/**
 * @returns {import("vue-types").VueTypeShape<ReturnType<typeof configPropsDefaults>>}
 */
export const configProps = () => VueTypes.shape({
	soundcloud: soundcloudConfigProps(),
	youtube: youtubeConfigProps(),
	facebook: facebookConfigProps(),
	dailymotion: dailymotionConfigProps(),
	vimeo: vimeoConfigProps(),
	file: fileConfigProps(),
	wistia: wistiaConfigProps(),
	mixcloud: mixcloudConfigProps(),
	twitch: twitchConfigProps(),
	vidyard: vidyardConfigProps(),
}).def(() => configPropsDefaults());

/**
 * @returns {import("vue-types").VueTypeDef<object|string|((...args: any[]) => any)>}
 */
export const tagOrComponentProps = () => VueTypes.oneOfType([
	VueTypes.shape({ render: VueTypes.func }).loose,
	VueTypes.string,
	VueTypes.func,
]);

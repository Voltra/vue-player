declare module "@voltra/vue-player/patterns" {
	export type CanPlayUrl = (url: string) => boolean;

	export const MATCH_URL_YOUTUBE: RegExp;
	export const MATCH_URL_SOUNDCLOUD: RegExp;
	export const MATCH_URL_VIMEO: RegExp;
	export const MATCH_URL_FACEBOOK: RegExp;
	export const MATCH_URL_FACEBOOK_WATCH: RegExp;
	export const MATCH_URL_STREAMABLE: RegExp;
	export const MATCH_URL_WISTIA: RegExp;
	export const MATCH_URL_TWITCH_VIDEO: RegExp;
	export const MATCH_URL_TWITCH_CHANNEL: RegExp;
	export const MATCH_URL_DAILYMOTION: RegExp;
	export const MATCH_URL_MIXCLOUD: RegExp;
	export const MATCH_URL_VIDYARD: RegExp;
	export const MATCH_URL_KALTURA: RegExp;
	export const AUDIO_EXTENSIONS: RegExp;
	export const VIDEO_EXTENSIONS: RegExp;
	export const HLS_EXTENSIONS: RegExp;
	export const DASH_EXTENSIONS: RegExp;
	export const FLV_EXTENSIONS: RegExp;

	export const canPlay: {
		youtube: CanPlayUrl;
		soundcloud: CanPlayUrl;
		vimeo: CanPlayUrl;
		facebook: CanPlayUrl;
		streamable: CanPlayUrl;
		wistia: CanPlayUrl;
		twitch: CanPlayUrl;
		dailymotion: CanPlayUrl;
		mixcloud: CanPlayUrl;
		vidyard: CanPlayUrl;
		kaltura: CanPlayUrl;
		file: CanPlayUrl;
	};
}

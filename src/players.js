import { AUDIO_EXTENSIONS, canPlay } from "./patterns";
import { supportsWebKitPresentationMode } from "./utils";

export const players = [
	/**
	 * @type {PlayerDecl<"youtube", "YouTube", import("./components/players/YouTubePlayer").default>}
	 */
	{
		key: 'youtube',
		name: 'YouTube',
		canPlay: canPlay.youtube,
		lazyPlayer: () => import(/* webpackChunkName: 'vuePlayerYouTube' */'./components/players/YouTubePlayer')
	},

	/**
	 * @type {PlayerDecl<"soundcloud", "SoundCloud", import("./components/players/SoundCloudPlayer.vue").default>}
	 */
	{
		key: 'soundcloud',
		name: 'SoundCloud',
		canPlay: canPlay.soundcloud,
		lazyPlayer: () => import(/* webpackChunkName: 'vuePlayerSoundCloud' */'./components/players/SoundCloudPlayer.vue')
	},

	/**
	 * @type {PlayerDecl<"vimeo", "Vimeo", import("./components/players/VimeoPlayer").default>}
	 */
	{
		key: 'vimeo',
		name: 'Vimeo',
		canPlay: canPlay.vimeo,
		lazyPlayer: () => import(/* webpackChunkName: 'vuePlayerVimeo' */'./components/players/VimeoPlayer')
	},

	/**
	 * @type {PlayerDecl<"facebook", "Facebook", import("./components/players/FacebookPlayer").default>}
	 */
	{
		key: 'facebook',
		name: 'Facebook',
		canPlay: canPlay.facebook,
		lazyPlayer: () => import(/* webpackChunkName: 'vuePlayerFacebook' */'./components/players/FacebookPlayer')
	},

	/**
	 * @type {PlayerDecl<"streamable", "Streamable", import("./components/players/StreamablePlayer").default>}
	 */
	{
		key: 'streamable',
		name: 'Streamable',
		canPlay: canPlay.streamable,
		lazyPlayer: () => import(/* webpackChunkName: 'vuePlayerStreamable' */'./components/players/StreamablePlayer')
	},

	/**
	 * @type {PlayerDecl<"wistia", "Wistia", import("./components/players/WistiaPlayer").default>}
	 */
	{
		key: 'wistia',
		name: 'Wistia',
		canPlay: canPlay.wistia,
		lazyPlayer: () => import(/* webpackChunkName: 'vuePlayerWistia' */'./components/players/WistiaPlayer')
	},

	/**
	 * @type {PlayerDecl<"twitch", "Twitch", import("./components/players/TwitchPlayer").default>}
	 */
	{
		key: 'twitch',
		name: 'Twitch',
		canPlay: canPlay.twitch,
		lazyPlayer: () => import(/* webpackChunkName: 'vuePlayerTwitch' */'./components/players/TwitchPlayer')
	},

	/**
	 * @type {PlayerDecl<"dailymotion", "DailyMotion", import("./components/players/DailyMotionPlayer").default>}
	 */
	{
		key: 'dailymotion',
		name: 'DailyMotion',
		canPlay: canPlay.dailymotion,
		lazyPlayer: () => import(/* webpackChunkName: 'vuePlayerDailyMotion' */'./components/players/DailyMotionPlayer')
	},

	/**
	 * @type {PlayerDecl<"mixcloud", "Mixcloud", import("./components/players/MixcloudPlayer").default>}
	 */
	{
		key: 'mixcloud',
		name: 'Mixcloud',
		canPlay: canPlay.mixcloud,
		lazyPlayer: () => import(/* webpackChunkName: 'vuePlayerMixcloud' */'./components/players/MixcloudPlayer')
	},

	/**
	 * @type {PlayerDecl<"vidyard", "Vidyard", import("./components/players/VidyardPlayer").default>}
	 */
	{
		key: 'vidyard',
		name: 'Vidyard',
		canPlay: canPlay.vidyard,
		lazyPlayer: () => import(/* webpackChunkName: 'vuePlayerVidyard' */'./components/players/VidyardPlayer')
	},

	/**
	 * @type {PlayerDecl<"kaltura", "Kaltura", import("./components/players/KalturaPlayer").default>}
	 */
	{
		key: 'kaltura',
		name: 'Kaltura',
		canPlay: canPlay.kaltura,
		lazyPlayer: () => import(/* webpackChunkName: 'vuePlayerKaltura' */'./components/players/KalturaPlayer')
	},

	/**
	 * @type {PlayerDecl<"file", "FilePlayer", import("./components/players/FilePlayer").default>}
	 */
	{
		key: 'file',
		name: 'FilePlayer',
		canPlay: canPlay.file,
		canEnablePIP: url => {
			return canPlay.file(url) && (document.pictureInPictureEnabled || supportsWebKitPresentationMode()) && !AUDIO_EXTENSIONS.test(url)
		},
		lazyPlayer: () => import(/* webpackChunkName: 'vuePlayerFilePlayer' */'./components/players/FilePlayer')
	}
];


import { AUDIO_EXTENSIONS, canPlay } from "./patterns";
import { supportsWebKitPresentationMode } from "./utils";

export const players = [
	/**
	 * @type {PlayerDecl<"youtube", "YouTube", import("./components/players/YouTubePlayer.vue").default>}
	 */
	{
		key: 'youtube',
		name: 'YouTube',
		canPlay: canPlay.youtube,
		lazyPlayer: () => import(/* webpackChunkName: 'vuePlayerYouTube' */"./components/players/YouTubePlayer.vue")
	},

	/**
	 * @type {PlayerDecl<"soundcloud", "SoundCloud", import("./components/players/SoundCloudPlayer.vue").default>}
	 */
	{
		key: 'soundcloud',
		name: 'SoundCloud',
		canPlay: canPlay.soundcloud,
		lazyPlayer: () => import(/* webpackChunkName: 'vuePlayerSoundCloud' */"./components/players/SoundCloudPlayer.vue")
	},

	/**
	 * @type {PlayerDecl<"vimeo", "Vimeo", import("./components/players/VimeoPlayer.vue").default>}
	 */
	{
		key: 'vimeo',
		name: 'Vimeo',
		canPlay: canPlay.vimeo,
		lazyPlayer: () => import(/* webpackChunkName: 'vuePlayerVimeo' */"./components/players/VimeoPlayer.vue")
	},

	/**
	 * @type {PlayerDecl<"facebook", "Facebook", import("./components/players/FacebookPlayer.vue").default>}
	 */
	{
		key: 'facebook',
		name: 'Facebook',
		canPlay: canPlay.facebook,
		lazyPlayer: () => import(/* webpackChunkName: 'vuePlayerFacebook' */"./components/players/FacebookPlayer.vue")
	},

	/**
	 * @type {PlayerDecl<"streamable", "Streamable", import("./components/players/StreamablePlayer.vue").default>}
	 */
	{
		key: 'streamable',
		name: 'Streamable',
		canPlay: canPlay.streamable,
		lazyPlayer: () => import(/* webpackChunkName: 'vuePlayerStreamable' */"./components/players/StreamablePlayer.vue")
	},

	/**
	 * @type {PlayerDecl<"wistia", "Wistia", import("./components/players/WistiaPlayer.vue").default>}
	 */
	{
		key: 'wistia',
		name: 'Wistia',
		canPlay: canPlay.wistia,
		lazyPlayer: () => import(/* webpackChunkName: 'vuePlayerWistia' */"./components/players/WistiaPlayer.vue")
	},

	/**
	 * @type {PlayerDecl<"twitch", "Twitch", import("./components/players/TwitchPlayer.vue").default>}
	 */
	{
		key: 'twitch',
		name: 'Twitch',
		canPlay: canPlay.twitch,
		lazyPlayer: () => import(/* webpackChunkName: 'vuePlayerTwitch' */"./components/players/TwitchPlayer.vue")
	},

	/**
	 * @type {PlayerDecl<"dailymotion", "DailyMotion", import("./components/players/DailyMotionPlayer.vue").default>}
	 */
	{
		key: 'dailymotion',
		name: 'DailyMotion',
		canPlay: canPlay.dailymotion,
		lazyPlayer: () => import(/* webpackChunkName: 'vuePlayerDailyMotion' */"./components/players/DailyMotionPlayer.vue")
	},

	/**
	 * @type {PlayerDecl<"mixcloud", "Mixcloud", import("./components/players/MixcloudPlayer.vue").default>}
	 */
	{
		key: 'mixcloud',
		name: 'Mixcloud',
		canPlay: canPlay.mixcloud,
		lazyPlayer: () => import(/* webpackChunkName: 'vuePlayerMixcloud' */"./components/players/MixcloudPlayer.vue")
	},

	/**
	 * @type {PlayerDecl<"vidyard", "Vidyard", import("./components/players/VidyardPlayer.vue").default>}
	 */
	{
		key: 'vidyard',
		name: 'Vidyard',
		canPlay: canPlay.vidyard,
		lazyPlayer: () => import(/* webpackChunkName: 'vuePlayerVidyard' */"./components/players/VidyardPlayer.vue")
	},

	/**
	 * @type {PlayerDecl<"kaltura", "Kaltura", import("./components/players/KalturaPlayer.vue").default>}
	 */
	{
		key: 'kaltura',
		name: 'Kaltura',
		canPlay: canPlay.kaltura,
		lazyPlayer: () => import(/* webpackChunkName: 'vuePlayerKaltura' */"./components/players/KalturaPlayer.vue")
	},

	/**
	 * @type {PlayerDecl<"file", "FilePlayer", import("./components/players/FilePlayer.vue").default>}
	 */
	{
		key: 'file',
		name: 'FilePlayer',
		canPlay: canPlay.file,
		canEnablePIP: url => {
			return canPlay.file(url) && (document.pictureInPictureEnabled || supportsWebKitPresentationMode()) && !AUDIO_EXTENSIONS.test(url)
		},
		lazyPlayer: () => import(/* webpackChunkName: 'vuePlayerFilePlayer' */"./components/players/FilePlayer.vue")
	}
];


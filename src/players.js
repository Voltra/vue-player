import { canPlay } from "./patterns";

export const players = [
	{
		key: 'youtube',
		name: 'YouTube',
		canPlay: canPlay.youtube,
		lazyPlayer: () => import(/* webpackChunkName: 'vuePlayerYouTube' */'./components/players/YouTubePlayer.vue')
	},
	{
		key: 'soundcloud',
		name: 'SoundCloud',
		canPlay: canPlay.soundcloud,
		lazyPlayer: () => import(/* webpackChunkName: 'vuePlayerSoundCloud' */'./components/players/SoundCloudPlayer.vue')
	},
	{
		key: 'vimeo',
		name: 'Vimeo',
		canPlay: canPlay.vimeo,
		lazyPlayer: () => import(/* webpackChunkName: 'vuePlayerVimeo' */'./components/players/VimeoPlayer.vue')
	},
	{
		key: 'facebook',
		name: 'Facebook',
		canPlay: canPlay.facebook,
		lazyPlayer: () => import(/* webpackChunkName: 'vuePlayerFacebook' */'./components/players/FacebookPlayer.vue')
	},
	{
		key: 'streamable',
		name: 'Streamable',
		canPlay: canPlay.streamable,
		lazyPlayer: () => import(/* webpackChunkName: 'vuePlayerStreamable' */'./components/players/StreamablePlayer.vue')
	},
	{
		key: 'wistia',
		name: 'Wistia',
		canPlay: canPlay.wistia,
		lazyPlayer: () => import(/* webpackChunkName: 'vuePlayerWistia' */'./components/players/WistiaPlayer.vue')
	},
	{
		key: 'twitch',
		name: 'Twitch',
		canPlay: canPlay.twitch,
		lazyPlayer: () => import(/* webpackChunkName: 'vuePlayerTwitch' */'./components/players/TwitchPlayer.vue')
	},
	{
		key: 'dailymotion',
		name: 'DailyMotion',
		canPlay: canPlay.dailymotion,
		lazyPlayer: () => import(/* webpackChunkName: 'vuePlayerDailyMotion' */'./components/players/DailyMotionPlayer.vue')
	},
	{
		key: 'mixcloud',
		name: 'Mixcloud',
		canPlay: canPlay.mixcloud,
		lazyPlayer: () => import(/* webpackChunkName: 'vuePlayerMixcloud' */'./components/players/MixcloudPlayer.vue')
	},
	{
		key: 'vidyard',
		name: 'Vidyard',
		canPlay: canPlay.vidyard,
		lazyPlayer: () => import(/* webpackChunkName: 'vuePlayerVidyard' */'./components/players/VidyardPlayer.vue')
	},
	{
		key: 'kaltura',
		name: 'Kaltura',
		canPlay: canPlay.kaltura,
		lazyPlayer: () => import(/* webpackChunkName: 'vuePlayerKaltura' */'./components/players/KalturaPlayer.vue')
	},
	{
		key: 'file',
		name: 'FilePlayer',
		canPlay: canPlay.file,
		canEnablePIP: url => {
			return canPlay.file(url) && (document.pictureInPictureEnabled || supportsWebKitPresentationMode()) && !AUDIO_EXTENSIONS.test(url)
		},
		lazyPlayer: () => import(/* webpackChunkName: 'vuePlayerFilePlayer' */'./components/players/FilePlayer.vue')
	}
];


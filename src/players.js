import { canPlay } from "./patterns";

export const players = [
	{
		key: 'youtube',
		name: 'YouTube',
		canPlay: canPlay.youtube,
		lazyPlayer: () => import(/* webpackChunkName: 'reactPlayerYouTube' */'./components/players/YouTubePlayer.vue')
	},
	{
		key: 'soundcloud',
		name: 'SoundCloud',
		canPlay: canPlay.soundcloud,
		lazyPlayer: () => import(/* webpackChunkName: 'reactPlayerSoundCloud' */'./components/players/SoundCloudPlayer.vue')
	},
	{
		key: 'vimeo',
		name: 'Vimeo',
		canPlay: canPlay.vimeo,
		lazyPlayer: () => import(/* webpackChunkName: 'reactPlayerVimeo' */'./components/players/VimeoPlayer.vue')
	},
	{
		key: 'facebook',
		name: 'Facebook',
		canPlay: canPlay.facebook,
		lazyPlayer: () => import(/* webpackChunkName: 'reactPlayerFacebook' */'./components/players/FacebookPlayer.vue')
	},
	{
		key: 'streamable',
		name: 'Streamable',
		canPlay: canPlay.streamable,
		lazyPlayer: () => import(/* webpackChunkName: 'reactPlayerStreamable' */'./components/players/StreamablePlayer.vue')
	},
	{
		key: 'wistia',
		name: 'Wistia',
		canPlay: canPlay.wistia,
		lazyPlayer: () => import(/* webpackChunkName: 'reactPlayerWistia' */'./components/players/WistiaPlayer.vue')
	},
	{
		key: 'twitch',
		name: 'Twitch',
		canPlay: canPlay.twitch,
		lazyPlayer: () => import(/* webpackChunkName: 'reactPlayerTwitch' */'./components/players/TwitchPlayer.vue')
	},
	{
		key: 'dailymotion',
		name: 'DailyMotion',
		canPlay: canPlay.dailymotion,
		lazyPlayer: () => import(/* webpackChunkName: 'reactPlayerDailyMotion' */'./components/players/DailyMotionPlayer.vue')
	},
	{
		key: 'mixcloud',
		name: 'Mixcloud',
		canPlay: canPlay.mixcloud,
		lazyPlayer: () => import(/* webpackChunkName: 'reactPlayerMixcloud' */'./components/players/MixcloudPlayer.vue')
	},
	{
		key: 'vidyard',
		name: 'Vidyard',
		canPlay: canPlay.vidyard,
		lazyPlayer: () => import(/* webpackChunkName: 'reactPlayerVidyard' */'./components/players/VidyardPlayer.vue')
	},
	{
		key: 'kaltura',
		name: 'Kaltura',
		canPlay: canPlay.kaltura,
		lazyPlayer: () => import(/* webpackChunkName: 'reactPlayerKaltura' */'./components/players/KalturaPlayer.vue')
	},
	{
		key: 'file',
		name: 'FilePlayer',
		canPlay: canPlay.file,
		canEnablePIP: url => {
			return canPlay.file(url) && (document.pictureInPictureEnabled || supportsWebKitPresentationMode()) && !AUDIO_EXTENSIONS.test(url)
		},
		lazyPlayer: () => import(/* webpackChunkName: 'reactPlayerFilePlayer' */'./components/players/FilePlayer.vue')
	}
];


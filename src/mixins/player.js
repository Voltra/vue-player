import VueTypes from "vue-types";
import { callPlayer } from "../utils";

/*
	This is just https://github.com/cookpete/react-player/blob/master/src/props.js
	adapted to use Vue stuff
*/

const {
	string,
	bool,
	number,
	array,
	oneOfType,
	shape,
	object,
	func,
} = VueTypes;

const noop = () => {
};


// TODO: Split config into multiple files and merge here
// TODO: Remove config from master mixin
// TODO: Make master player use the config
// TODO: Make each player use their specific config
export const playerMixin = {
	events: [
		"ready",
		"start",
		"play",
		"pause",
		"buffer",
		"buffer-end",
		"ended",
		"error",
		"duration",
		"seek",
		"playback-rate-change",
		"progress",
		"click-preview",
		"enable-pip",
		"disable-pip",
	],
	slots: ["playIcon", "fallback"],
	props: {
		url: oneOfType([string, array, object]).isRequired,
		playing: bool.def(false),
		loop: bool.def(false),
		controls: bool.def(false),
		volume: number, // def: null
		muted: bool.def(false),
		playbackRate: number.def(1),
		width: oneOfType([string, number]).def("640px"),
		height: oneOfType([string, number]).def("360px"),
		style: object.def({}),
		progressInterval: number.def(1000),
		playsInline: bool.def(false),
		pictureInPicture: bool.def(false),
		stopOnUnmount: bool.def(true),
		light: oneOfType([bool, string]).def(false),
		previewTabIndex: number.def(0),
		oEmbedUrl: string.def("https://noembed.com/embed?url={url}"),
		wrapper: oneOfType([
			string,
			func,
			shape({ render: func.isRequired }),
		]).def("div"),
		config: shape({
			soundcloud: shape({
				options: object,
			}),
			youtube: shape({
				playerVars: object,
				embedOptions: object,
				onUnstarted: func,
			}),
			facebook: shape({
				appId: string,
				version: string,
				playerId: string,
				attributes: object,
			}),
			dailymotion: shape({
				params: object,
			}),
			vimeo: shape({
				playerOptions: object,
				title: string,
			}),
			file: shape({
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
			}),
			wistia: shape({
				options: object,
				playerId: string,
				customControls: array,
			}),
			mixcloud: shape({
				options: object,
			}),
			twitch: shape({
				options: object,
				playerId: string,
			}),
			vidyard: shape({
				options: object,
			}),
		})
			.def(() => ({
			soundcloud: {
				options: {
					visual: true, // Undocumented, but makes player fill container and look better
					buying: false,
					liking: false,
					download: false,
					sharing: false,
					show_comments: false,
					show_playcount: false
				}
			},
			youtube: {
				playerVars: {
					playsinline: 1,
					showinfo: 0,
					rel: 0,
					iv_load_policy: 3,
					modestbranding: 1
				},
				embedOptions: {},
				onUnstarted: noop
			},
			facebook: {
				appId: '1309697205772819',
				version: 'v3.3',
				playerId: null,
				attributes: {}
			},
			dailymotion: {
				params: {
					api: 1,
					'endscreen-enable': false
				}
			},
			vimeo: {
				playerOptions: {
					autopause: false,
					byline: false,
					portrait: false,
					title: false
				},
				title: null
			},
			file: {
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
			},
			wistia: {
				options: {},
				playerId: null,
				customControls: null
			},
			mixcloud: {
				options: {
					hide_cover: 1
				}
			},
			twitch: {
				options: {},
				playerId: null
			},
			vidyard: {
				options: {}
			}
		})),
	},
	mounted() {
		this.$emit("mounted", this);
	},
	methods: {
		callPlayer(method, ...args) {
			return callPlayer.call(this, [method, ...args]);
		},

		async load(url, ...args) {},

		// [Hooks]
		/**
		 * Start/resume playing
		 * @hook play
		 */
		play() {},


		/**
		 * Pause the video
		 * @hook pause
		 */
		pause() {},


		/**
		 * Stop the video (pause + back to 0)
		 * @hook stop
		 */
		stop() {},

		/**
		 * Move the play-head to the give time in seconds
		 * @param {number} seconds - The time point to move the play-head to
		 * @hook seekTo
		 */
		seekTo(seconds) {},

		/**
		 * Move the play-point to the give time in seconds
		 * @param {number} fraction - A number in the range [0;1] where 0 is mute and 1 is full power
		 * @hook setVolume
		 */
		setVolume(fraction) {},

		/**
		 * Mute the player
		 * @hook mute
		 */
		mute() {},

		/**
		 * Mute the player
		 * @hook unmute
		 */
		unmute() {},

		/**
		 * Get the duration of the video
		 * @returns {number|null}
		 * @hook getDuration
		 */
		getDuration() {
			return 0;
		},

		/**
		 * Get the current position of the play-head in seconds
		 * @returns {number|null}
		 * @hook getCurrentTime
		 */
		getCurrentTime() {
			return 0;
		},

		/**
		 * Get the amount of seconds already preloaded
		 * @returns {number|null}
		 * @hook getSecondsLoaded
		 */
		getSecondsLoaded() {
			return 0;
		},
		// [/Hooks]

		// [Event handlers/delegates/propagators]
		onError(...args) {
			this.$emit("error", ...args);
		},
		onDuration(duration) {
			this.$emit("duration", duration);
		},
		onReady(...args) {
			this.$emit("ready", ...args);
		},
		onSeek(currentTime) {
			this.$emit("seek", currentTime);
		},
		onEnded() {
			this.$emit("ended");
		},
		onPause(...args) {
			this.$emit("pause", ...args);
		},
		onPlay(...args) {
			this.$emit("play", ...args);
		},
		onBuffer(...args) {
			this.$emit("buffer", ...args);
		},
		onBufferEnd(...args) {
			this.$emit("buffer-end", ...args);
		},
		onPlaybackRateChange(...args) {
			this.$emit("playback-rate-change", ...args);
		},
		onEnablePIP(...args) {
			this.$emit("enable-pip", ...args);
		},
		onDisablePIP(...args) {
			this.$emit("enable-pip", ...args);
		},
		// [/Event handlers/delegates/propagators]
	},
};

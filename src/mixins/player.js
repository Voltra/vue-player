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

export const playerMixin = {
	events: [
		"mounted",
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
		config: object.def({}),
	},
	data() {
		return {
			isMounted: false,
		};
	},
	mounted() {
		this.isMounted = true;
		this.$emit("mounted", this);
	},
	beforeUnmount() {
		this.isMounted = false;
	},

	watch: {
		muted(newValue) {
			if (newValue) {
				this.mute();
			} else {
				this.unmute();
			}
		},
		loop: "setLoop",
		playbackRate: "setPlaybackRate",
		volume: "setVolume",
		playing(newValue) {
			if(newValue) {
				this.play();
			} else {
				this.pause();
			}
		}
	},
	methods: {
		callPlayer(method, ...args) {
			return callPlayer.call(this, [method, ...args]);
		},

		async load(url, ...args) {},

		// [Hooks]
		/**
		 * Start/resume playing
		 * @playerHook play
		 */
		play() {},


		/**
		 * Pause the video
		 * @playerHook pause
		 */
		pause() {},


		/**
		 * Stop the video (pause + back to 0)
		 * @playerHook stop
		 */
		stop() {},

		/**
		 * Move the play-head to the give time in seconds
		 * @param {number} seconds - The time point to move the play-head to
		 * @playerHook seekTo
		 */
		seekTo(seconds) {},

		/**
		 * Move the play-point to the give time in seconds
		 * @param {number} fraction - A number in the range [0;1] where 0 is mute and 1 is full power
		 * @playerHook setVolume
		 */
		setVolume(fraction) {},

		/**
		 * Mute the player
		 * @playerHook mute
		 */
		mute() {},

		/**
		 * Mute the player
		 * @playerHook unmute
		 */
		unmute() {},

		/**
		 * Get the duration of the video
		 * @returns {number|null}
		 * @playerHook getDuration
		 */
		getDuration() {
			return 0;
		},

		/**
		 * Get the current position of the play-head in seconds
		 * @returns {number|null}
		 * @playerHook getCurrentTime
		 */
		getCurrentTime() {
			return 0;
		},

		/**
		 * Get the amount of seconds already preloaded
		 * @returns {number|null}
		 * @playerHook getSecondsLoaded
		 */
		getSecondsLoaded() {
			return 0;
		},

		/**
		 * Set the playback rate
		 * @param {number} rate
		 * @playerHook setPlaybackRate
		 */
		setPlaybackRate(rate) {},

		/**
		 * Enable  picture-in-picture mode
		 */
		enablePIP() {},

		/**
		 * Disable  picture-in-picture mode
		 */
		disablePIP() {},

		/**
		 * Set the looping flag
		 */
		setLoop(shouldLoop) {},
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

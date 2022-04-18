<template>
	<div :key="this.url" :style="styles" ref="container"/>
</template>

<script>
	import { canPlay } from "../../patterns";
	import { playerMixin } from "../../mixins/player";
	import { vimeoConfigProps } from "../../props/vimeoConfig";
	import { getSDK } from "../../utils";
	import VueTypes from "vue-types";

	const SDK_URL = "https://player.vimeo.com/api/player.js";
	const SDK_GLOBAL = "Vimeo";

	export default {
		// [META]
		displayName: "Vimeo",
		canPlay: canPlay.vimeo,
		forceLoad: true,
		// [/META]

		mixins: [playerMixin],

		props: {
			config: vimeoConfigProps,
			display: VueTypes.string.def("block"),
		},

		data() {
			return {
				duration: null,
				currentTime: null,
				secondsLoaded: null,
			};
		},

		computed: {
			styles() {
				return {
					display: this.display,
					overflow: "hidden",
					width: "100%",
					height: "100%",
				};
			},
		},

		methods: {
			/**
			 * @inheritDoc
			 * @override
			 * @playerHook play
			 */
			play() {
				const promise = this.callPlayer("play");
				if (promise) {
					promise.catch(this.onError);
				}
			},

			/**
			 * @inheritDoc
			 * @override
			 * @playerHook pause
			 */
			pause() {
				this.callPlayer("pause");
			},

			/**
			 * @inheritDoc
			 * @override
			 * @playerHook stop
			 */
			stop() {
				this.callPlayer("unload");
			},

			/**
			 * @inheritDoc
			 * @override
			 * @playerHook seekTo
			 */
			seekTo(seconds) {
				this.callPlayer("setCurrentTime", seconds);
			},

			/**
			 * @inheritDoc
			 * @override
			 * @playerHook setVolume
			 */
			setVolume(fraction) {
				this.callPlayer("setVolume", fraction);
			},

			/**
			 * @inheritDoc
			 * @override
			 * @playerHook setLoop
			 */
			setLoop(loop) {
				this.callPlayer("setLoop", loop);
			},

			/**
			 * @inheritDoc
			 * @override
			 * @playerHook setPlaybackRate
			 */
			setPlaybackRate(rate) {
				this.callPlayer("setPlaybackRate", rate);
			},

			/**
			 * @inheritDoc
			 * @override
			 * @playerHook mute
			 */
			mute() {
				this.setVolume(0);
			},

			/**
			 * @inheritDoc
			 * @override
			 * @playerHook unmute
			 */
			unmute() {
				if (this.volume) {
					this.setVolume(this.volume);
				}
			},

			/**
			 * @inheritDoc
			 * @override
			 * @playerHook getDuration
			 */
			getDuration() {
				return this.duration;
			},

			/**
			 * @inheritDoc
			 * @override
			 * @playerHook getCurrentTime
			 */
			getCurrentTime() {
				return this.currentTime;
			},

			/**
			 * @inheritDoc
			 * @override
			 * @playerHook getSecondsLoaded
			 */
			getSecondsLoaded() {
				return this.secondsLoaded;
			},

			async load(url) {
				try {
					this.duration = null;
					const Vimeo = await getSDK(SDK_URL, SDK_GLOBAL);
					if (!this.$refs.container) return;
					const { playerOptions, title } = this.config;
					this.player = new Vimeo.Player(this.$refs.container, {
						url,
						autoplay: this.playing,
						muted: this.muted,
						loop: this.loop,
						playsinline: this.playsinline,
						controls: this.controls,
						...playerOptions,
					});
					this.player.ready().then(() => {
						const iframe = this.$refs.container.querySelector("iframe");
						iframe.style.width = "100%";
						iframe.style.height = "100%";
						if (title) {
							iframe.title = title;
						}
					}).catch(this.onError);
					this.player.on("loaded", () => {
						this.onReady();
						this.refreshDuration();
					});
					this.player.on("play", () => {
						this.onPlay();
						this.refreshDuration();
					});
					this.player.on("pause", this.onPause);
					this.player.on("seeked", e => this.onSeek(e.seconds));
					this.player.on("ended", this.onEnded);
					this.player.on("error", this.onError);
					this.player.on("timeupdate", ({ seconds }) => {
						this.currentTime = seconds;
					});
					this.player.on("progress", ({ seconds }) => {
						this.secondsLoaded = seconds;
					});
					this.player.on("bufferstart", this.onBuffer);
					this.player.on("bufferend", this.onBufferEnd);
				} catch (e) {
					this.onError(e);
				}
			},

			async refreshDuration() {
				this.duration = await this.player.getDuration();
			},
		},
	};
</script>

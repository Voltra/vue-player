<template>
	<div :key="this.url" ref="container"/>
</template>

<script>
	import { canPlay } from "../../patterns";
	import { playerMixin } from "../../mixins/player";
	import { vimeoConfigProps } from "../../props/vimeoConfig";
	import { getSDK } from "../../utils";

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
		},

		data() {
			return {
				duration: null,
				currentTime: null,
				secondsLoaded: null,
			};
		},

		methods: {
			/**
			 * @inheritDoc
			 * @override
			 * @hook play
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
			 * @hook pause
			 */
			pause() {
				this.callPlayer("pause");
			},

			/**
			 * @inheritDoc
			 * @override
			 * @hook stop
			 */
			stop() {
				this.callPlayer("unload");
			},

			/**
			 * @inheritDoc
			 * @override
			 * @hook seekTo
			 */
			seekTo(seconds) {
				this.callPlayer("setCurrentTime", seconds);
			},

			/**
			 * @inheritDoc
			 * @override
			 * @hook setVolume
			 */
			setVolume(fraction) {
				this.callPlayer("setVolume", fraction);
			},

			/**
			 * @inheritDoc
			 * @override
			 * @hook setLoop
			 */
			setLoop(loop) {
				this.callPlayer("setLoop", loop);
			},

			/**
			 * @inheritDoc
			 * @override
			 * @hook setPlaybackRate
			 */
			setPlaybackRate(rate) {
				this.callPlayer("setPlaybackRate", rate);
			},

			/**
			 * @inheritDoc
			 * @override
			 * @hook mute
			 */
			mute() {
				this.setVolume(0);
			},

			/**
			 * @inheritDoc
			 * @override
			 * @hook unmute
			 */
			unmute() {
				if (this.volume) {
					this.setVolume(this.volume);
				}
			},

			/**
			 * @inheritDoc
			 * @override
			 * @hook getDuration
			 */
			getDuration() {
				return this.duration;
			},

			/**
			 * @inheritDoc
			 * @override
			 * @hook getCurrentTime
			 */
			getCurrentTime() {
				return this.currentTime;
			},

			/**
			 * @inheritDoc
			 * @override
			 * @hook getSecondsLoaded
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

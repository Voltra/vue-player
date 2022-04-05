<template>
	<iframe
		class="vue-player--streamable"
		ref="iframe"
		:src="src"
		frameborder="0"
		scrolling="no"
		allowfullscreen
	/>
</template>

<script>
	import { canPlay, MATCH_URL_STREAMABLE } from "../../patterns";
	import { playerMixin } from "../../mixins/player";

	const SDK_URL = "https://cdn.embed.ly/player-0.1.0.min.js";
	const SDK_GLOBAL = "playerjs";

	export default {
		// [META]
		displayName: "Streamable",
		canPlay: canPlay.streamable,
		// [/META]

		mixins: [playerMixin],

		data() {
			return {
				duration: null,
				currentTime: null,
				secondsLoaded: null,
			};
		},

		computed: {
			/**
			 * @type {string}
			 */
			id() {
				return this.url.match(MATCH_URL_STREAMABLE)[1];
			},
			/**
			 * @type {string}
			 */
			src() {
				return `https://streamable.com/o/${this.id}`;
			},
		},

		watch: {
			loop(newValue) {
				this.player?.setLoop?.(newValue);
			},
			muted(newValue) {
				if (newValue) {
					this.mute();
				} else {
					this.unmute();
				}
			},
		},

		methods: {
			/**
			 * @inheritDoc
			 * @override
			 * @hook play
			 */
			play() {
				this.callPlayer("play");
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
				this.callPlayer("setVolume", fraction * 100);
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
			 * @hook mute
			 */
			mute() {
				this.callPlayer("mute");
			},


			/**
			 * @inheritDoc
			 * @override
			 * @hook unmute
			 */
			unmute() {
				this.callPlayer("unmute");
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
					const playerjs = await getSDK(SDK_URL, SDK_GLOBAL);
					if (!this.iframe) return;
					this.player = new playerjs.Player(this.$refs.iframe);
					this.player.setLoop(this.loop);
					this.player.on("ready", this.onReady);
					this.player.on("play", this.onPlay);
					this.player.on("pause", this.onPause);
					this.player.on("seeked", this.onSeek);
					this.player.on("ended", this.onEnded);
					this.player.on("error", this.onError);
					this.player.on("timeupdate", ({ duration, seconds }) => {
						this.duration = duration;
						this.currentTime = seconds;
					});
					this.player.on("buffered", ({ percent }) => {
						if (this.duration) {
							this.secondsLoaded = this.duration * percent;
						}
					});
					if (this.muted) {
						this.player.mute();
					}

				} catch (e) {
					this.onError(e);
				}
			},
		},
	};
</script>

<style>
	.vue-player--streamable {
		width: 100%;
		height: 100%;
	}
</style>

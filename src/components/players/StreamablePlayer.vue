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

		methods: {
			/**
			 * @inheritDoc
			 * @override
			 * @playerHook play
			 */
			play() {
				this.callPlayer("play");
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
				this.callPlayer("setVolume", fraction * 100);
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
			 * @playerHook mute
			 */
			mute() {
				this.callPlayer("mute");
			},


			/**
			 * @inheritDoc
			 * @override
			 * @playerHook unmute
			 */
			unmute() {
				this.callPlayer("unmute");
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

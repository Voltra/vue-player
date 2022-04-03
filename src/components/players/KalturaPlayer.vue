<template>
	<iframe
		class="vue-player--kaltura"
		ref="iframe"
		:src="url"
		frameborder="0"
		scrolling="no"
		allowfullscreen
		allow="encrypted-media;autoplay"
		referrerpolicy="no-referrer-when-downgrade"
	/>
</template>

<script>
	import { getSDK } from "../../utils";
	import { canPlay } from "../../patterns";
	import { playerMixin } from "../../mixins/player";

	const SDK_URL = "https://cdn.embed.ly/player-0.1.0.min.js";
	const SDK_GLOBAL = "playerjs";

	export default {
		// [META]
		displayName: "Kaltura",
		canPlay: canPlay.kaltura,
		// [/META]

		mixins: [playerMixin],

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
			seekTo (seconds) {
				this.callPlayer('setCurrentTime', seconds)
			},

			/**
			 * @inheritDoc
			 * @override
			 * @hook setVolume
			 */
			setVolume (fraction) {
				this.callPlayer('setVolume', fraction)
			},

			/**
			 * @inheritDoc
			 * @override
			 * @hook setLoop
			 */
			setLoop (loop) {
				this.callPlayer('setLoop', loop)
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
			getDuration () {
				return this.duration
			},

			/**
			 * @inheritDoc
			 * @override
			 * @hook getCurrentTime
			 */
			getCurrentTime () {
				return this.currentTime
			},

			/**
			 * @inheritDoc
			 * @override
			 * @hook getSecondsLoaded
			 */
			getSecondsLoaded () {
				return this.secondsLoaded
			},

			async load(url) {
				try {
					const playerjs = await getSDK(SDK_URL, SDK_GLOBAL);
					if (!this.$refs.iframe) return;

					this.player = new playerjs.Player(this.$refs.iframe);

					this.player.on("ready", () => {
						// An arbitrary timeout is required otherwise
						// the event listeners won’t work
						setTimeout(() => {
							this.player.isReady = true;
							this.player.setLoop(this.loop);
							if (this.muted) {
								this.player.mute();
							}
							this.addListeners(this.player);
							this.onReady();
						}, 500);
					});
				} catch (e) {
					this.onError(e);
				}
			},

			addListeners(player) {
				player.on("play", this.onPlay);
				player.on("pause", this.onPause);
				player.on("ended", this.onEnded);
				player.on("error", this.onError);
				player.on("timeupdate", ({ duration, seconds }) => {
					const wasDifferent = this.duration !== duration;

					this.duration = duration;
					this.currentTime = seconds;

					if (wasDifferent) {
						this.onDuration(duration);
					}

					this.onSeek(seconds);
				});
			},
		},
	};
</script>

<style lang="scss">
	.vue-player--kaltura {
		width: 100%;
		height: 100%;
	}
</style>

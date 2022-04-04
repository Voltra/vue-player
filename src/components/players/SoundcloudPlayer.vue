<template>
	<iframe
		ref="iframe"
		class="vue-player--soundcloud"
		:style="styles"
		:src="src"
		frameborder="0"
		allow="autoplay"
	/>
</template>

<script>
	import { getSDK } from "../../utils";
	import { canPlay } from "../../patterns";
	import { playerMixin } from "../../mixins/player";
	import { soundcloudConfigProps } from "../../props/soundcloudConfig";
	import VueTypes from "vue-types";

	const SDK_URL = "https://w.soundcloud.com/player/api.js";
	const SDK_GLOBAL = "SC";

	export default {
		// [META]
		displayName: "Soundcloud",
		canPlay: canPlay.soundcloud,
		loopOnEnded: true,
		// [/META]

		mixins: [playerMixin],
		props: {
			config: soundcloudConfigProps,
			display: VueTypes.string.def("block"),
		},

		data() {
			return {
				duration: null,
				currentTime: null,
				fractionLoaded: null,
			};
		},

		computed: {
			styles() {
				return {
					display: this.display,
					width: "100%",
					height: "100%",
				};
			},
			src() {
				return `https://w.soundcloud.com/player/?url=${encodeURIComponent(this.url)}`;
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
				this.callPlayer("seekTo", seconds * 1000);
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
				if (this.volume !== null) {
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
				return this.fractionLoaded * this.duration;
			},

			async load(url, isReady) {
				try {
					const SC = await getSDK(SDK_URL, SDK_GLOBAL);
					if (!this.iframe) return;
					const { PLAY, PLAY_PROGRESS, PAUSE, FINISH, ERROR } = SC.Widget.Events;
					if (!isReady) {
						this.player = SC.Widget(this.$refs.iframe);
						this.player.bind(PLAY, this.onPlay);
						this.player.bind(PAUSE, () => {
							const remaining = this.duration - this.currentTime;
							if (remaining < 0.05) {
								// Prevent onPause firing right before onEnded
								return;
							}
							this.onPause();
						});
						this.player.bind(PLAY_PROGRESS, e => {
							this.currentTime = e.currentPosition / 1000;
							this.fractionLoaded = e.loadedProgress;
						});
						this.player.bind(FINISH, this.onEnded);
						this.player.bind(ERROR, this.onError);
					}
					this.player.load(url, {
						...this.config.options,
						callback: () => {
							this.player.getDuration(duration => {
								this.duration = duration / 1000;
								this.onReady();
							});
						},
					});
				} catch (e) {
					this.onError(e);
				}
			},
		},
	};
</script>

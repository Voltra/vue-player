<template>
	<div class="vue-player--dailymotion" :style="styles">
		<div ref="container"/>
	</div>
</template>

<script>
	import { getSDK, parseStartTime } from "../../utils";
	import { canPlay, MATCH_URL_DAILYMOTION } from "../../patterns";
	import { playerMixin } from "../../mixins/player";
	import VueTypes from "vue-types";
	import { dailymotionConfigProps } from "../../props/dailymotionConfig";

	const SDK_URL = "https://api.dmcdn.net/all.js";
	const SDK_GLOBAL = "DM";
	const SDK_GLOBAL_READY = "dmAsyncInit";

	export default {
		// [META]
		displayName: "DailyMotion",
		canPlay: canPlay.dailymotion,
		loopOnEnded: true,
		// [/META]

		mixins: [playerMixin],
		props: {
			config: dailymotionConfigProps,
			display: VueTypes.string.def("block"),
		},

		computed: {
			/**
			 * @type {Partial<CSSStyleDeclaration>}
			 */
			styles() {
				return this.display ? {
					display: this.display,
				} : {};
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
				this.callPlayer("seek", seconds);
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
			 * @hook mute
			 */
			mute() {
				this.callPlayer("setMuted", true);
			},

			/**
			 * @inheritDoc
			 * @override
			 * @hook unmute
			 */
			unmute() {
				this.callPlayer("setMuted", false);
			},

			/**
			 * @inheritDoc
			 * @override
			 * @hook getDuration
			 */
			getDuration() {
				return this.player?.duration || null;
			},

			/**
			 * @inheritDoc
			 * @override
			 * @hook getCurrentTime
			 */
			getCurrentTime() {
				return this.player?.currentTime;
			},

			/**
			 * @inheritDoc
			 * @override
			 * @hook getSecondsLoaded
			 */
			getSecondsLoaded() {
				return this.player?.bufferedTime;
			},


			async load(url) {
				const { controls, config, playing } = this;
				const [, id] = url.match(MATCH_URL_DAILYMOTION);
				if (this.player) {
					this.player.load(id, {
						start: parseStartTime(url),
						autoplay: playing,
					});
					return;
				}

				try {
					const DM = await getSDK(SDK_URL, SDK_GLOBAL, SDK_GLOBAL_READY, DM => DM.player);

					if (!this.$refs.container) return

					const Player = DM.player;
					this.player = new Player(this.$refs.container, {
						width: "100%",
						height: "100%",
						video: id,
						params: {
							controls: controls,
							autoplay: this.playing,
							mute: this.muted,
							start: parseStartTime(url),
							origin: window.location.origin,
							...config.params,
						},
						events: {
							apiready: this.onReady,
							seeked: () => this.onSeek(this.player.currentTime),
							video_end: this.onEnded,
							durationchange: this.onDurationChange,
							pause: this.onPause,
							playing: this.onPlay,
							waiting: this.onBuffer,
							error: this.onError,
						},
					});
				} catch (e) {
					this.onError(e);
				}
			},

			onDurationChange() {
				const duration = this.getDuration();
				this.onDuration(duration);
			},
		},
	};
</script>

<style lang="scss" scoped>
	.vue-player {
		&--dailymotion {
			display: block;
			width: 100%;
			height: 100%;
		}
	}
</style>

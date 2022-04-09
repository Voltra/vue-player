<template>
	<div
		:id="pid"
		:key="videoId"
		:class="className"
	/>
</template>

<script>
	import { randomString } from "../../utils";
	import { canPlay, MATCH_URL_WISTIA } from "../../patterns";
	import { playerMixin } from "../../mixins/player";
	import { wistiaConfigProps } from "../../props/wistiaConfig";

	const SDK_URL = "https://fast.wistia.com/assets/external/E-v1.js";
	const SDK_GLOBAL = "Wistia";
	const PLAYER_ID_PREFIX = "wistia-player-";

	export default {
		// [META]
		displayName: "Wistia",
		canPlay: canPlay.wistia,
		loopOnEnded: true,
		// [/META]

		mixins: [playerMixin],

		props: {
			config: wistiaConfigProps,
		},

		data() {
			return {
				randomId: `${PLAYER_ID_PREFIX}${randomString()}`,
			};
		},

		computed: {
			pid() {
				return this.config.playerId ?? this.randomId;
			},
			videoId() {
				return this.url?.match?.(MATCH_URL_WISTIA)?.[1];
			},
			className() {
				return `vue-player--wistia wistia_embed wistia_async_${this.videoId}`;
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
			 * @hook stop
			 */
			stop() {
				this.unbind();
				this.callPlayer("remove");
			},

			/**
			 * @inheritDoc
			 * @override
			 * @hook seekTo
			 */
			seekTo(seconds) {
				this.callPlayer("time", seconds);
			},

			/**
			 * @inheritDoc
			 * @override
			 * @hook setVolume
			 */
			setVolume(fraction) {
				this.callPlayer("volume", fraction);
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
			 * @hook setPlaybackRate
			 */
			setPlaybackRate(rate) {
				this.callPlayer("playbackRate", rate);
			},

			/**
			 * @inheritDoc
			 * @override
			 * @hook setPlaybackRate
			 */
			getDuration() {
				return this.callPlayer("duration");
			},

			/**
			 * @inheritDoc
			 * @override
			 * @hook getCurrentTime
			 */
			getCurrentTime() {
				return this.callPlayer("time");
			},

			/**
			 * @inheritDoc
			 * @override
			 * @hook getSecondsLoaded
			 */
			getSecondsLoaded() {
				return null;
			},

			async load(url) {
				try {
					const { playing, muted, controls, onReady, config, onError } = this;

					const Wistia = await getSDK(SDK_URL, SDK_GLOBAL);
					config.customControls?.forEach?.(control => Wistia.defineControl(control));
					window._wq = window._wq || [];
					window._wq.push({
						id: this.playerID,
						options: {
							autoPlay: playing,
							silentAutoPlay: "allow",
							muted: muted,
							controlsVisibleOnLoad: controls,
							fullscreenButton: controls,
							playbar: controls,
							playbackRateControl: controls,
							qualityControl: controls,
							volumeControl: controls,
							settingsControl: controls,
							smallPlayButton: controls,
							...config.options,
						},
						onReady: player => {
							this.player = player;
							this.unbind();
							this.player.bind("play", this.onPlay);
							this.player.bind("pause", this.onPause);
							this.player.bind("seek", this.onSeek);
							this.player.bind("end", this.onEnded);
							this.player.bind("playbackratechange", this.onPlaybackRateChange);
							onReady();
						},
					});
				} catch (e) {
					this.onError(e);
				}
			},

			unbind() {
				this.player?.unbind?.("play", this.onPlay);
				this.player?.unbind?.("pause", this.onPause);
				this.player?.unbind?.("seek", this.onSeek);
				this.player?.unbind?.("end", this.onEnded);
				this.player?.unbind?.("playbackratechange", this.onPlaybackRateChange);
			},
		},
	};
</script>

<style>
	.vue-player--wistia {
		width: 100%;
		height: 100%;
	}
</style>

<template>
	<div :style="styles">
		<div ref="container"/>
	</div>
</template>

<script>
	import { canPlay, MATCH_URL_VIDYARD } from "../../patterns";
	import { playerMixin } from "../../mixins/player";
	import VueTypes from "vue-types";
	import { getSDK } from "../../utils";
	import { vidyardConfigProps } from "../../props/vidyardConfig";

	const SDK_URL = "https://play.vidyard.com/embed/v4.js";
	const SDK_GLOBAL = "VidyardV4";
	const SDK_GLOBAL_READY = "onVidyardAPI";

	export default {
		// [META]
		displayName: "Vidyard",
		canPlay: canPlay.vidyard,
		// [/META]

		mixins: [playerMixin],

		props: {
			config: vidyardConfigProps,
			display: VueTypes.string.def("block"),
		},

		computed: {
			styles() {
				return {
					display: this.display,
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
			 * @playerHook stop
			 */
			stop() {
				window.VidyardV4?.api?.destroyPlayer?.(this.player);
			},

			/**
			 * @inheritDoc
			 * @override
			 * @playerHook seekTo
			 */
			seekTo(amount) {
				this.callPlayer("seek", amount);
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
			 * @playerHook setPlaybackRate
			 */
			setPlaybackRate(rate) {
				this.callPlayer("setPlaybackSpeed", rate);
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
				return this.callPlayer("currentTime");
			},

			/**
			 * @inheritDoc
			 * @override
			 * @playerHook getSecondsLoaded
			 */
			getSecondsLoaded() {
				return null;
			},

			async load(url) {
				try {
					const { playing, config } = this;
					const id = (url ?? this.url).match(MATCH_URL_VIDYARD)[1];
					if (this.player) {
						this.stop();
					}
					const Vidyard = await getSDK(SDK_URL, SDK_GLOBAL, SDK_GLOBAL_READY);
					if (!this.$refs.container) return;
					Vidyard.api.addReadyListener((data, player) => {
						this.player = player;
						this.player.on("ready", this.onReady);
						this.player.on("play", this.onPlay);
						this.player.on("pause", this.onPause);
						this.player.on("seek", this.onSeek);
						this.player.on("playerComplete", this.onEnded);
					}, id);
					Vidyard.api.renderPlayer({
						uuid: id,
						container: this.$refs.container,
						autoplay: playing ? 1 : 0,
						...config.options,
					});
					Vidyard.api.getPlayerMetadata(id).then(meta => {
						this.duration = meta.length_in_seconds;
						this.onDuration(meta.length_in_seconds);
					});
				} catch (e) {
					this.onError(e);
				}
			},
		},
	};
</script>

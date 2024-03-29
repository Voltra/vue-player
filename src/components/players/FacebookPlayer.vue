<template>
	<div
		:id="this.playerID"
		class="fb-video vue-player--facebook"
		:data-href="this.url"
		:data-autoplay="this.playing ? 'true' : 'false'"
		:data-controls="this.controls ? 'true' : 'false'"
		data-allowfullscreen="true"
		v-bind="config.attributes"
	/>
</template>

<script>
	import { getSDK, randomString } from "../../utils";
	import { canPlay } from "../../patterns";
	import { playerMixin } from "../../mixins/player";
	import { facebookConfigProps } from "../../props/facebookConfig";

	const SDK_URL = "https://connect.facebook.net/en_US/sdk.js";
	const SDK_GLOBAL = "FB";
	const SDK_GLOBAL_READY = "fbAsyncInit";
	const PLAYER_ID_PREFIX = "facebook-player-";

	export default {
		// [META]
		displayName: "Facebook",
		canPlay: canPlay.facebook,
		loopOnEnabled: true,
		// [/META]

		events: ["loaded"],
		mixins: [playerMixin],

		props: {
			config: facebookConfigProps,
		},

		data() {
			return {
				randomId: `${PLAYER_ID_PREFIX}${randomString()}`,
			};
		},

		computed: {
			/**
			 * @type {string}
			 */
			playerID() {
				return this?.config?.playerId ?? this.randomId;
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
				this.callPlayer("seek", seconds);
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
				return this.callPlayer("getDuration");
			},

			/**
			 * @inheritDoc
			 * @override
			 * @playerHook getCurrentTime
			 */
			getCurrentTime() {
				return this.callPlayer("getCurrentTime");
			},

			/**
			 * @inheritDoc
			 * @override
			 * @playerHook getSecondsLoaded
			 */
			getSecondsLoaded() {
				return null;
			},

			async load(url, isReady) {
				if (isReady) {
					const FB = await getSDK(SDK_URL, SDK_GLOBAL, SDK_GLOBAL_READY);
					FB?.XFBML?.parse?.();
					return;
				}

				const FB = await getSDK(SDK_URL, SDK_GLOBAL, SDK_GLOBAL_READY);

				FB.init({
					appId: this.config.appId,
					xfbml: true,
					version: this.config.version,
				});

				FB.Event.subscribe("xfbml.render", msg => {
					// Here we know the SDK has loaded, even if onReady/onPlay
					// is not called due to a video that cannot be embedded
					this.onLoaded();
				});

				FB.Event.subscribe("xfbml.ready", msg => {
					if (msg.type === "video" && msg.id === this.playerID) {
						this.player = msg.instance;
						this.player.subscribe("startedPlaying", this.onPlay);
						this.player.subscribe("paused", this.onPause);
						this.player.subscribe("finishedPlaying", this.onEnded);
						this.player.subscribe("startedBuffering", this.onBuffer);
						this.player.subscribe("finishedBuffering", this.onBufferEnd);
						this.player.subscribe("error", this.onError);
						if (this.muted) {
							this.mute();
						} else {
							this.unmute();
						}
						this.onReady();

						// For some reason Facebook have added `visibility: hidden`
						// to the iframe when autoplay fails, so here we set it back
						document.getElementById(this.playerID).querySelector("iframe").style.visibility = "visible";
					}
				});
			},

			onLoaded(...args) {
				this.$emit("loaded", ...args);
			},
		},
	};
</script>

<style lang="scss">
	.vue-player--facebook {
		width: 100%;
		height: 100%;
	}
</style>

<template>
	<iframe
		:key="id"
		ref="iframe"
		:src="src"
		class="vue-player--mixcloud"
		frameborder="0"
	/>
</template>

<script>
	import { getSDK, queryString } from "../../utils";
	import { canPlay, MATCH_URL_MIXCLOUD } from "../../patterns";
	import { playerMixin } from "../../mixins/player";
	import { mixcloudConfigProps } from "../../props/mixcloudConfig";

	const SDK_URL = "https://widget.mixcloud.com/media/js/widgetApi.js";
	const SDK_GLOBAL = "Mixcloud";

	export default {
		// [META]
		displayName: "Mixcloud",
		canPlay: canPlay.mixcloud,
		// [/META]

		mixins: [playerMixin],
		props: {
			config: mixcloudConfigProps,
		},

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
				return this.url.match(MATCH_URL_MIXCLOUD)[1];
			},
			/**
			 * @type {string}
			 */
			query() {
				return queryString({
					...this.config.options,
					feed: `/${this.id}/`,
				});
			},
			/**
			 * @type {string}
			 */
			src() {
				return `https://www.mixcloud.com/widget/iframe/?${this.query}`;
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
					const Mixcloud = await getSDK(SDK_URL, SDK_GLOBAL);
					this.player = Mixcloud.PlayerWidget(this.$refs.iframe);
					this.player.ready.then(() => {
						this.player.events.play.on(this.onPlay);
						this.player.events.pause.on(this.onPause);
						this.player.events.ended.on(this.onEnded);
						this.player.events.error.on(this.onError);
						this.player.events.progress.on((seconds, duration) => {
							this.currentTime = seconds;
							this.duration = duration;
						});
						this.onReady();
					});
				} catch (e) {
					this.onError(e);
				}
			},
		},
	};
</script>

<style>
	.vue-player--mixcloud {
		width: 100%;
		height: 100%;
	}
</style>

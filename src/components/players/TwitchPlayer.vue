<template>
	<div class="vue-player--twitch" :id="pid"/>
</template>

<script>
	import { parseStartTime, randomString } from "../../utils";
	import { canPlay, MATCH_URL_TWITCH_CHANNEL } from "../../patterns";
	import { playerMixin } from "../../mixins/player";
	import { twitchConfigProps } from "../../props/twitchConfig";

	const SDK_URL = "https://player.twitch.tv/js/embed/v1.js";
	const SDK_GLOBAL = "Twitch";
	const PLAYER_ID_PREFIX = "twitch-player-";

	export default {
		// [META]
		displayName: "Twitch",
		canPlay: canPlay.twitch,
		loopOnEnded: true,
		// [/META]

		mixins: [playerMixin],
		props: {
			config: twitchConfigProps,
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
			 * @playerHook unmute
			 */
			unmute() {
				this.callPlayer("setMuted", false);
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
				try {
					const { playsinline, config, controls } = this;
					const isChannel = MATCH_URL_TWITCH_CHANNEL.test(url);
					const id = isChannel ? url.match(MATCH_URL_TWITCH_CHANNEL)[1] : url.match(MATCH_URL_TWITCH_VIDEO)[1];

					if (isReady) {
						if (isChannel) {
							this.player?.setChannel?.(id);
						} else {
							this.player?.setVideo?.("v" + id);
						}
						return;
					}

					const Twitch = await getSDK(SDK_URL, SDK_GLOBAL);

					this.player = new Twitch.Player(this.pid, {
						video: isChannel ? "" : id,
						channel: isChannel ? id : "",
						height: "100%",
						width: "100%",
						playsinline: playsinline,
						autoplay: this.playing,
						muted: this.muted,
						// https://github.com/CookPete/react-player/issues/733#issuecomment-549085859
						controls: isChannel ? true : controls,
						time: parseStartTime(url),
						...config.options,
					});

					const { READY, PLAYING, PAUSE, ENDED, ONLINE, OFFLINE, SEEK } = Twitch.Player;

					this.player.addEventListener(READY, this.onReady);
					this.player.addEventListener(PLAYING, this.onPlay);
					this.player.addEventListener(PAUSE, this.onPause);
					this.player.addEventListener(ENDED, this.onEnded);
					this.player.addEventListener(SEEK, this.onSeek);

					// Prevent weird isLoading behaviour when streams are offline
					this.player.addEventListener(ONLINE, this.onLoaded);
					this.player.addEventListener(OFFLINE, this.onLoaded);
				} catch (e) {
					this.onError(e);
				}
			},
		},
	};
</script>

<style>
	.vue-player--twitch {
		width: 100%;
		height: 100%;
	}
</style>

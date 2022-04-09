<template>
	<component
		v-if="activePlayer"
		v-bind="playerProps"
		:is="activePlayer"
		class="vue-player"
		@mount="handlePlayerMount"
		@ready="handleReady"
		@play="handlePlay"
		@pause="handlePause"
		@ended="handleEnded"
		@loaded="handleLoaded"
		@error="handleError"
		v-on="$listeners"
	/>

	<span v-else class="vue-player--none">
		<slot name="none"/>
	</span>
</template>

<script>
	import { metaPlayerMixin } from "../mixins/metaPlayer";

	const SEEK_ON_PLAY_EXPIRY = 5000;

	export default {
		mixins: [metaPlayerMixin],

		inheritAttrs: false,

		data() {
			return {
				player: null,
				isReady: false,
				isPlaying: false, // Track playing state internally to prevent bugs
				isLoading: true, // Use isLoading to prevent onPause when switching URL
				loadOnReady: null,
				startOnPlay: true,
				seekOnPlay: null,
				onDurationCalled: false,
				progressTimeout: 0,
				durationCheckTimeout: 0,
			};
		},

		computed: {
			playerProps() {
				return {
					...this.$props,
					...this.$attrs,
				};
			},
		},

		beforeUnmount() {
			clearTimeout(this.progressTimeout);
			clearTimeout(this.durationCheckTimeout);

			if (this.isReady && this.stopOnUnmount) {
				this.player?.stop?.();
				this.player?.disablePIP?.();
			}
		},

		watch: {
			playing(newValue) {
				if (newValue && !this.isPlaying) {
					this.player?.play?.();
					this.isPlaying = true;
				} else if (!newValue && this.isPlaying) {
					this.player?.pause?.();
					this.isPlaying = false;
				}
			},
			pictureInPicture(newValue) {
				if (newValue) {
					this.player?.enablePIP?.();
				} else {
					this.player?.disablePIP?.();
				}
			},
			muted(newValue) {
				if (newValue) {
					this.player?.mute?.();
				} else {
					this.player?.unmute?.();

					if (this.volume !== null) {
						this.$nextTick(() => this.player?.setVolume?.(volume));
					}
				}
			},
		},

		methods: {
			/**
			 * @inheritDoc
			 * @override
			 * @playerHook getDuration
			 */
			getDuration() {
				if (!this.isReady) return null;
				return this.player?.getDuration?.();
			},

			/**
			 * @inheritDoc
			 * @override
			 * @playerHook getCurrentTime
			 */
			getCurrentTime() {
				if (!this.isReady) return null;
				return this.player?.getCurrentTime?.();
			},

			/**
			 * @inheritDoc
			 * @override
			 * @playerHook getSecondsLoaded
			 */
			getSecondsLoaded() {
				if (!this.isReady) return null;
				return this.player?.getSecondsLoaded?.();
			},

			/**
			 * @inheritDoc
			 * @override
			 * @playerHook getSecondsLoaded
			 */
			seekTo(amount, type) {
				// When seeking before player is ready, store value and seek later
				if (!this.isReady) {
					if (amount !== 0) {
						this.seekOnPlay = amount;
						setTimeout(() => {
							this.seekOnPlay = null;
						}, SEEK_ON_PLAY_EXPIRY);
					}
					return;
				}
				const isFraction = !type ? (amount > 0 && amount < 1) : type === "fraction";
				if (isFraction) {
					// Convert fraction to seconds based on duration
					const duration = this.player.getDuration();
					if (!duration) {
						console.warn("VuePlayer: could not seek using fraction – duration not yet available");
						return;
					}
					this.player.seekTo(duration * amount);
					return;
				}
				this.player.seekTo(amount);
			},

			handlePlayerMount(player) {
				this.player = player;
				this.player.load(this.url);
				this.progress();
			},
			getInternalPlayer(key) {
				return this.player?.[key];
			},
			progress() {
				if (this.url && this.player && this.isReady) {
					const playedSeconds = this.getCurrentTime() ?? 0;
					const loadedSeconds = this.getSecondsLoaded();
					const duration = this.getDuration();
					if (duration) {
						const progress = {
							playedSeconds,
							played: playedSeconds / duration,
						};
						if (loadedSeconds !== null) {
							progress.loadedSeconds = loadedSeconds;
							progress.loaded = loadedSeconds / duration;
						}
						// Only call onProgress if values have changed
						if (progress.playedSeconds !== this.prevPlayed || progress.loadedSeconds !== this.prevLoaded) {
							this.onProgress(progress);
						}
						this.prevPlayed = progress.playedSeconds;
						this.prevLoaded = progress.loadedSeconds;
					}
				}
				this.progressTimeout = setTimeout(this.progress, this.progressFrequency ?? this.progressInterval);
			},
			handleReady() {
				if (!this.mounted) return;
				this.isReady = true;
				this.isLoading = false;
				const { onReady, playing, volume, muted } = this;
				onReady();
				if (!muted && volume !== null) {
					this.player.setVolume(volume);
				}
				if (this.loadOnReady) {
					this.player.load(this.loadOnReady, true);
					this.loadOnReady = null;
				} else if (playing) {
					this.player.play();
				}
				this.handleDurationCheck();
			},
			handlePlay() {
				this.isPlaying = true;
				this.isLoading = false;
				const { onStart, onPlay, playbackRate } = this;
				if (this.startOnPlay) {
					if (playbackRate !== 1) {
						this.player?.setPlaybackRate?.(playbackRate);
					}
					onStart();
					this.startOnPlay = false;
				}
				onPlay();
				if (this.seekOnPlay) {
					this.seekTo(this.seekOnPlay);
					this.seekOnPlay = null;
				}
				this.handleDurationCheck();
			},
			handlePause(e) {
				this.isPlaying = false;
				if (!this.isLoading) {
					this.onPause(e);
				}
			},
			handleEnded() {
				const { activePlayer, loop, onEnded } = this;
				if (activePlayer.loopOnEnded && loop) {
					this.seekTo(0);
				}
				if (!loop) {
					this.isPlaying = false;
					onEnded();
				}
			},
			handleError(...args) {
				this.isLoading = false;
				this.onError(...args);
			},
			handleDurationCheck() {
				clearTimeout(this.durationCheckTimeout)
				const duration = this.getDuration()
				if (duration) {
					if (!this.onDurationCalled) {
						this.onDuration(duration)
						this.onDurationCalled = true
					}
				} else {
					this.durationCheckTimeout = setTimeout(this.handleDurationCheck, 100)
				}
			},
			handleLoaded() {
				this.isLoading = false;
			},
		},
	};
</script>

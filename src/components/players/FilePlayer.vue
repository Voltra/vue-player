<template>
	<component
		:is="tag"
		ref="player"
		:style="styles"
		preload="auto"
		:src="src"
		:autoplay="playing"
		:controls="controls"
		:muted="muted"
		:loop="loop"
		v-bind="config.attributes"
	>
		<template v-if="urlIsArray">
			<template v-for="source in this.url">
				<slot name="source" v-bind="{ source }">
					<source :src="source" :key="source" />
				</slot>
			</template>

			<template v-for="track in this.config.tracks">
				<slot name="track" v-bind="{ track }">
					<track :src="track" :key="track"/>
				</slot>
			</template>
		</template>
	</component>
</template>

<script>
	import { isMediaStream, supportsWebKitPresentationMode } from "../../utils";
	import { AUDIO_EXTENSIONS, canPlay, DASH_EXTENSIONS, FLV_EXTENSIONS, HLS_EXTENSIONS } from "../../patterns";
	import { playerMixin } from "../../mixins/player";

	const HAS_NAVIGATOR = typeof navigator !== "undefined";
	const IS_IPAD_PRO = HAS_NAVIGATOR && navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1;
	const IS_IOS = HAS_NAVIGATOR && (/iPad|iPhone|iPod/.test(navigator.userAgent) || IS_IPAD_PRO) && !window.MSStream;
	const HLS_SDK_URL = "https://cdn.jsdelivr.net/npm/hls.js@VERSION/dist/hls.min.js";
	const HLS_GLOBAL = "Hls";
	const DASH_SDK_URL = "https://cdnjs.cloudflare.com/ajax/libs/dashjs/VERSION/dash.all.min.js";
	const DASH_GLOBAL = "dashjs";
	const FLV_SDK_URL = "https://cdn.jsdelivr.net/npm/flv.js@VERSION/dist/flv.min.js";
	const FLV_GLOBAL = "flvjs";
	const MATCH_DROPBOX_URL = /www\.dropbox\.com\/.+/;
	const MATCH_CLOUDFLARE_STREAM = /https:\/\/watch\.cloudflarestream\.com\/([a-z0-9]+)/;
	const REPLACE_CLOUDFLARE_STREAM = "https://videodelivery.net/{id}/manifest/video.m3u8";

	export default {
		// [META]
		displayName: "FilePlayer",
		canPlay: canPlay.file,
		// [/META]

		mixins: [playerMixin],

		computed: {
			urlIsArray() {
				return Array.isArray(this.url);
			},
			hasTracks() {
				const tracks = this.config?.tracks ?? [];
				return Array.isArray(tracks) && tracks.length > 0;
			},

			tag() {
				return this.shouldUseAudio ? 'audio' : 'video';
			},

			shouldUseAudio() {
				if (this.config?.forceVideo) {
					return false;
				}
				if (this.config.attributes.poster) {
					return false; // Use <video> so that poster is shown
				}
				return AUDIO_EXTENSIONS.test(this.url) || this.config.forceAudio;
			},

			styles() {
				return {
					width: this.width === "auto" ? this.width : "100%",
					height: this.height === "auto" ? this.height : "100%",
				};
			},

			src() {
				return this.getSource(this.url);
			},
		},

		mounted() {
			this.addListeners(this.$refs.player);

			if (IS_IOS) {
				this.$refs.player?.load?.();
			}
		},
		beforeUnmount() {
			this.removeListeners(this.$refs.player);

			this.hls?.destroy?.();
		},

		methods: {
			/**
			 * @inheritDoc
			 * @override
			 * @hook onDisablePIP
			 */
			onDisablePIP(...args) {
				this.$emit("disable-pip", ...args);

				if (this.playing) {
					this.play();
				}
			},

			/**
			 * @inheritDoc
			 * @override
			 * @hook onSeek
			 */
			onSeek(e) {
				this.$emit("seek", e.target.currentTime);
			},

			/**
			 * @inheritDoc
			 * @override
			 * @hook play
			 */
			play() {
				const promise = this.$refs.player.play?.();

				if (promise) {
					promise.catch(this.onError);
				}
			},

			/**
			 * @inheritDoc
			 * @override
			 * @hook pause
			 */
			pause() {
				this.$refs.player.pause?.();
			},

			/**
			 * @inheritDoc
			 * @override
			 * @hook stop
			 */
			stop() {
				this.$refs.player?.removeAttribute?.("src");
				this.dash?.reset?.();
			},

			async load(url) {
				const { hlsVersion, hlsOptions, dashVersion, flvVersion } = this.config;

				this.hls?.destroy?.();
				this.dash?.reset?.();

				if (this.shouldUseHLS(url)) {
					const Hls = await getSDK(HLS_SDK_URL.replace("VERSION", hlsVersion), HLS_GLOBAL);
					this.hls = new Hls(hlsOptions);
					this.hls.on(Hls.Events.MANIFEST_PARSED, () => {
						this.onReady();
					});
					this.hls.on(Hls.Events.ERROR, (e, data) => {
						this.onError(e, data, this.hls, Hls);
					});
					if (MATCH_CLOUDFLARE_STREAM.test(url)) {
						const id = url.match(MATCH_CLOUDFLARE_STREAM)[1];
						this.hls.loadSource(REPLACE_CLOUDFLARE_STREAM.replace("{id}", id));
					} else {
						this.hls.loadSource(url);
					}
					this.hls.attachMedia(this.$refs.player);
					this.onLoaded();
				} else if (this.shouldUseDASH(url)) {
					const dashjs = await getSDK(DASH_SDK_URL.replace("VERSION", dashVersion), DASH_GLOBAL);
					this.dash = dashjs.MediaPlayer().create();
					this.dash.initialize(this.$refs.player, url, this.playing);
					this.dash.on("error", this.onError);
					if (parseInt(dashVersion) < 3) {
						this.dash.getDebug().setLogToBrowserConsole(false);
					} else {
						this.dash.updateSettings({ debug: { logLevel: dashjs.Debug.LOG_LEVEL_NONE } });
					}
					this.onLoaded();
				} else if (this.shouldUseFLV(url)) {
					const flvjs = await getSDK(FLV_SDK_URL.replace("VERSION", flvVersion), FLV_GLOBAL);
					this.flv = flvjs.createPlayer({ type: "flv", url });
					this.flv.attachMediaElement(this.$refs.player);
					this.flv.load();
					this.onLoaded();
				}

				if (url instanceof Array) {
					// When setting new urls (<source>) on an already loaded video,
					// HTMLMediaElement.load() is needed to reset the media element
					// and restart the media resource. Just replacing children source
					// dom nodes is not enough
					this.$refs.player?.load?.();
				} else if (isMediaStream(url)) {
					try {
						this.$refs.player.srcObject = url;
					} catch (e) {
						this.$refs.player.src = URL.createObjectURL(url);
					}
				}
			},

			onPresentationModeChange(e) {
				if (this.$refs.player && supportsWebKitPresentationMode(this.$refs.player)) {
					const { webkitPresentationMode } = this.$refs.player;
					if (webkitPresentationMode === "picture-in-picture") {
						this.onEnablePIP(e);
					} else if (webkitPresentationMode === "inline") {
						this.onDisablePIP(e);
					}
				}
			},

			addListeners(player) {
				const { url, playsInline } = this;
				player.addEventListener("play", this.onPlay);
				player.addEventListener("waiting", this.onBuffer);
				player.addEventListener("playing", this.onBufferEnd);
				player.addEventListener("pause", this.onPause);
				player.addEventListener("seeked", this.onSeek);
				player.addEventListener("ended", this.onEnded);
				player.addEventListener("error", this.onError);
				player.addEventListener("ratechange", this.onPlaybackRateChange);
				player.addEventListener("enterpictureinpicture", this.onEnablePIP);
				player.addEventListener("leavepictureinpicture", this.onDisablePIP);
				player.addEventListener("webkitpresentationmodechanged", this.onPresentationModeChange);
				if (!this.shouldUseHLS(url)) { // onReady is handled by hls.js
					player.addEventListener("canplay", this.onReady);
				}
				if (playsInline) {
					player.setAttribute("playsinline", "");
					player.setAttribute("webkit-playsinline", "");
					player.setAttribute("x5-playsinline", "");
				}
			},

			removeListeners(player, url) {
				player.removeEventListener("canplay", this.onReady);
				player.removeEventListener("play", this.onPlay);
				player.removeEventListener("waiting", this.onBuffer);
				player.removeEventListener("playing", this.onBufferEnd);
				player.removeEventListener("pause", this.onPause);
				player.removeEventListener("seeked", this.onSeek);
				player.removeEventListener("ended", this.onEnded);
				player.removeEventListener("error", this.onError);
				player.removeEventListener("ratechange", this.onPlaybackRateChange);
				player.removeEventListener("enterpictureinpicture", this.onEnablePIP);
				player.removeEventListener("leavepictureinpicture", this.onDisablePIP);
				player.removeEventListener("webkitpresentationmodechanged", this.onPresentationModeChange);
				if (!this.shouldUseHLS(url)) { // onReady is handled by hls.js
					player.removeEventListener("canplay", this.onReady);
				}
			},

			shouldUseHLS(url) {
				if (this.config?.forceHLS) {
					return true;
				}
				if (IS_IOS) {
					return false;
				}
				return HLS_EXTENSIONS.test(url) || MATCH_CLOUDFLARE_STREAM.test(url);
			},

			shouldUseDASH(url) {
				return DASH_EXTENSIONS.test(url) || this.props.config.forceDASH;
			},

			shouldUseFLV(url) {
				return FLV_EXTENSIONS.test(url) || this.props.config.forceFLV;
			},
		},
	};
</script>

declare module "@voltra/vue-player/mixins/player" {
	import { ComputedOptions } from "vue";
	import { MethodOptions, ComponentOptions } from "@vue/runtime-core";

	export interface PlayerComponentProps {
		url: string[] | string | object;

		/**
		 * @default false
		 */
		playing?: boolean;

		/**
		 * @default false
		 */
		loop?: boolean;

		/**
		 * @default false
		 */
		controls?: boolean;

		/**
		 * @default undefined
		 */
		volume?: number;

		/**
		 * @default false
		 */
		muted?: boolean;

		/**
		 * @default 1
		 */
		playbackRate?: number;

		/**
		 * @default "640px"
		 */
		width?: string | number;

		/**
		 * @default "360px"
		 */
		height?: string | number;

		/**
		 * @default {}
		 */
		style?: Record<string, unknown> | CSSStyleDeclaration;

		/**
		 * @default 1000
		 */
		progressInterval?: number;

		/**
		 * @default false
		 */
		playsInline?: boolean;

		/**
		 * @default false
		 */
		pictureInPicture?: boolean;

		/**
		 * @default true
		 */
		stopOnUnmount?: boolean;

		/**
		 * @default false
		 */
		light?: boolean | string;

		/**
		 * @default 0
		 */
		previewTabIndex?: number;

		/**
		 * @default "https://noembed.com/embed?url={url}"
		 */
		oEmbedUrl?: `${string}{url}${string}`;

		/**
		 * @default "div"
		 */
		wrapper?: string | {
			render: () => any;
		} | (() => any);

		/**
		 * @default {}
		 */
		config?: object;
	}

	export type PlayerComponentRawBindings = any;

	export interface PlayerComponentData {
		/**
		 * @default false
		 */
		isMounted: boolean;
	}

	export interface PlayerComponentComputed extends ComputedOptions {
	}

	export interface PlayerComponentMethods extends MethodOptions {
		callPlayer<Method extends string>(method: Method, ...args: unknown[]): unknown;

		load(url: string, ...args: unknown[]): Promise<void>;

		/**
		 * Start/resume playing
		 * @playerHook play
		 */
		play(): unknown;

		/**
		 * Pause the video
		 * @playerHook pause
		 */
		pause(): unknown;

		/**
		 * Stop the video (pause + back to 0)
		 * @playerHook stop
		 */
		stop(): unknown;

		/**
		 * Move the play-head to the give time in seconds
		 * @param seconds - The time point to move the play-head to
		 * @playerHook seekTo
		 */
		seekTo(seconds: number): unknown;

		/**
		 * Move the play-point to the give time in seconds
		 * @param fraction - A number in the range [0;1] where 0 is mute and 1 is full power
		 * @playerHook setVolume
		 */
		setVolume(fraction: number): unknown;

		/**
		 * Mute the player
		 * @playerHook mute
		 */
		mute(): unknown;

		/**
		 * Unmute the player
		 * @playerHook unmute
		 */
		unmute(): unknown;

		/**
		 * Get the duration of the video
		 * @playerHook getDuration
		 */
		getDuration(): number | null;

		/**
		 * Get the current position of the play-head in seconds
		 * @playerHook getCurrentTime
		 */
		getCurrentTime(): number | null;

		/**
		 * Get the amount of seconds already preloaded
		 * @playerHook getSecondsLoaded
		 */
		getSecondsLoaded(): number | null;

		/**
		 * Set the playback rate
		 * @param rate
		 * @playerHook setPlaybackRate
		 */
		setPlaybackRate(rate: number): unknown;


		/**
		 * Enable  picture-in-picture mode
		 * @playerHook enablePIP
		 */
		enablePIP(): unknown;

		/**
		 * Disable  picture-in-picture mode
		 * @playerHook disablePIP
		 */
		disablePIP(): unknown;

		/**
		 * Set the looping flag
		 * @playerHook setLoop
		 */
		setLoop(shouldLoop: boolean): unknown;

		onError(...args: unknown[]): void;
		onDuration(duration: number): void;
		onReady(...args: unknown[]): void;
		onSeek(currentTime: number): void;
		onEnded(): void;
		onPause(...args: unknown[]): void;
		onBuffer(...args: unknown[]): void;
		onBufferEnd(...args: unknown[]): void;
		onPlaybackRateChange(...args: unknown[]): void;
		onEnablePIP(...args: unknown[]): void;
		onDisablePIP(...args: unknown[]): void;
	}

	export type PlayerComponentMixins = any;
	export type PlayerComponentExtends = any;

	export type PlayerComponentEmits = [
		"mounted",
		"ready",
		"start",
		"play",
		"pause",
		"buffer",
		"buffer-end",
		"ended",
		"error",
		"duration",
		"seek",
		"playback-rate-change",
		"progress",
		"click-preview",
		"enable-pip",
		"disable-pip",
	];

	export interface PlayerMixin extends ComponentOptions<
		PlayerComponentProps,
		PlayerComponentRawBindings,
		PlayerComponentData,
		PlayerComponentComputed,
		PlayerComponentMethods,
		PlayerComponentMixins,
		PlayerComponentExtends,
		PlayerComponentEmits
	> {
		slots: ["playIcon", "fallback"];
		mounted(): void;
		beforeUnmount(): void;
		watch: {
			muted(newValue: boolean): void;
			loop: PlayerComponentMethods["setLoop"];
			playbackRate: PlayerComponentMethods["setPlaybackRate"];
			playing(newValue: boolean): void;
		};
	}

	export interface PlayerComponent extends PlayerMixin {
	}

	export const playerMixin: PlayerMixin;
}

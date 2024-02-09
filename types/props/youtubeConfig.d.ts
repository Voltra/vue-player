declare module "@voltra/vue-player/props/youtubeConfig" {
	import type { VueTypeShape } from "vue-types/dist/types";

	export interface YoutubeConfig {
		playerVars: {
			/**
			 * @default 1
			 */
			playsinline: number;

			/**
			 * @default 0
			 */
			showinfo: number;

			/**
			 * @default 0
			 */
			rel: number;

			/**
			 * @default 3
			 */
			iv_load_policy: number;

			/**
			 * @default 1
			 */
			modestbranding: number;
		};

		/**
		 * @default {}
		 */
		embedOptions: object;

		/**
		 * @default () => {}
		 */
		onUnstarted: () => void;
	}

	export const youtubeConfigPropsDefaults: YoutubeConfig;

	export const youtubeConfigProps: VueTypeShape<YoutubeConfig>;
}

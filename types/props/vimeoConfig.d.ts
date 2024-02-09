declare module "@voltra/vue-player/props/vimeoConfig" {
	import type { VueTypeShape } from "vue-types/dist/types";

	export interface VimeoConfig {
		playerOptions: {
			/**
			 * @default false
			 */
			autopause: boolean;

			/**
			 * @default false
			 */
			byline: boolean;

			/**
			 * @default false
			 */
			portrait: boolean;

			/**
			 * @default false
			 */
			title: boolean;
		};

		/**
		 * @default null
		 */
		title: string|null;
	}

	export const vimeoConfigPropsDefaults: VimeoConfig;

	export const vimeoConfigProps: VueTypeShape<VimeoConfig>;
}

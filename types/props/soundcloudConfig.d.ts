declare module "@voltra/vue-player/props/soundcloudConfig" {
	import type { VueTypeShape } from "vue-types/dist/types";

	export interface SoundcloudConfig {
		options: {
			/**
			 * @default true
			 */
			visual: boolean;

			/**
			 * @default false
			 */
			buying: boolean;

			/**
			 * @default false
			 */
			liking: boolean;

			/**
			 * @default false
			 */
			download: boolean;

			/**
			 * @default false
			 */
			sharing: boolean;

			/**
			 * @default false
			 */
			show_comments: boolean;

			/**
			 * @default false
			 */
			show_playcount: boolean;
		};
	}

	export const soundcloudConfigPropsDefaults: SoundcloudConfig;

	export const soundcloudConfigProps: VueTypeShape<SoundcloudConfig>;
}

declare module "@voltra/vue-player/props/fileConfig" {
	import type { VueTypeShape } from "vue-types/dist/types";

	export interface FileConfig {
		/**
		 * @default {}
		 */
		attributes: object;

		/**
		 * @default []
		 */
		tracks: unknown[];

		/**
		 * @default false
		 */
		forceVideo: boolean;

		/**
		 * @default false
		 */
		forceAudio: boolean;

		/**
		 * @default false
		 */
		forceHLS: boolean;

		/**
		 * @default false
		 */
		forceDASH: boolean;

		/**
		 * @default false
		 */
		forceFLV: boolean;

		/**
		 * @default {}
		 */
		hlsOptions: object;

		/**
		 * @default "1.1.4"
		 */
		hlsVersion: string;

		/**
		 * @default "3.1.3"
		 */
		dashVersion: string;

		/**
		 * @default "1.5.0"
		 */
		flvVersion: string;
	}

	export const fileConfigPropsDefaults: FileConfig;

	export const fileConfigProps: VueTypeShape<FileConfig>;
}

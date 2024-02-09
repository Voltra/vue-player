declare module "@voltra/vue-player/props/vidyardConfig" {
	import type { VueTypeShape } from "vue-types/dist/types";

	export interface VidyardConfig {
		/**
		 * @default {}
		 */
		options: object;
	}

	export const vidyardConfigPropsDefaults: VidyardConfig;

	export const vidyardConfigProps: VueTypeShape<VidyardConfig>;
}

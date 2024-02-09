declare module "@voltra/vue-player/props/mixcloudConfig" {
	import type { VueTypeShape } from "vue-types/dist/types";

	export interface MixcloudConfig {
		options: {
			/**
			 * @default 1
			 */
			hide_cover: number;
		};
	}

	export const mixcloudConfigPropsDefaults: MixcloudConfig;

	export const mixcloudConfigProps: VueTypeShape<MixcloudConfig>;
}

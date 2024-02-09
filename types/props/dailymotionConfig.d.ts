declare module "@voltra/vue-player/props/dailymotionConfig" {
	import type { VueTypeShape } from "vue-types/dist/types";

	export interface DailymotionConfig {
		params: {
			/**
			 * @default 1
			 */
			api: number;

			/**
			 * @default false
			 */
			"endscreen-enable": boolean;
		};
	}

	export const dailymotionConfigPropsDefaults: DailymotionConfig;

	export const dailymotionConfigProps: VueTypeShape<DailymotionConfig>;
}

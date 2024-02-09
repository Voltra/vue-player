declare module "@voltra/vue-player/props/wistiaConfig" {
	import type { VueTypeShape } from "vue-types/dist/types";

	export interface WistiaConfig {
		wistia: {
			/**
			 * @default {}
			 */
			options: object;

			/**
			 * @default null
			 */
			playerId: string|null;

			/**
			 * @default null
			 */
			customControls: unknown[]|null;
		};
	}

	export const wistiaConfigPropsDefaults: WistiaConfig;

	export const wistiaConfigProps: VueTypeShape<WistiaConfig>;
}

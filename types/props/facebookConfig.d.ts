declare module "@voltra/vue-player/props/facebookConfig" {
	import type { VueTypeShape } from "vue-types/dist/types";

	export interface FacebookConfig {
		/**
		 * @default "1309697205772819"
		 */
		appId: string;

		/**
		 * @default "v3.3"
		 */
		version: string;

		/**
		 * @default null
		 */
		playerId: string|null;

		/**
		 * @default {}
		 */
		attributes: object;
	}

	export const facebookConfigPropsDefaults: FacebookConfig;

	export const facebookConfigProps: VueTypeShape<FacebookConfig>;
}

declare module "@voltra/vue-player/props/twitchConfig" {
	import type { VueTypeShape } from "vue-types/dist/types";

	export interface TwitchConfig {
		/**
		 * @default {}
		 */
		options: object;

		/**
		 * @default null
		 */
		playerId: string|null;
	}

	export const twitchConfigPropsDefaults: TwitchConfig;

	export const twitchConfigProps: VueTypeShape<TwitchConfig>;
}

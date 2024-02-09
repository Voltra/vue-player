declare module "@voltra/vue-player/mixins/metaPlayer" {
	import { PlayerComponent, PlayerMixin } from "@voltra/vue-player/mixins/player";
	import { configProps, tagOrComponentProps } from "@voltra/vue-player/props/index";
	import VueTypes from "vue-types";

	export interface MetaPlayerMixin {
		mixins: [playerMixin: PlayerMixin];
		props: {
			configProps: typeof configProps;
			progressFrequency: typeof VueTypes.number;
			activePlayer: typeof tagOrComponentProps;
		};
	}

	export const metaPlayerMixin: MetaPlayerMixin;

	export interface MetaPlayerComponent extends PlayerComponent, MetaPlayerMixin {
		mixins: [...PlayerComponent["mixins"], ...MetaPlayerMixin["mixins"]];
		props: PlayerComponent["props"] & MetaPlayerMixin["props"];
	}
}

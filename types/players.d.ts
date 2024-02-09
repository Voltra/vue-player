declare module "@voltra/vue-player/players" {
	import type { Component } from "vue"
	import type { CanPlayUrl } from "@voltra/vue-player/patterns";
	import type { AsyncComponentLoader } from "@vue/runtime-core";

	export type CanEnablePIP = (url: string) => boolean;

	export interface PlayerDecl<Key extends string, Name extends string, C extends Component> {
		key: Key;
		name: Name;
		canPlay: CanPlayUrl;
		canEnablePIP?: CanEnablePIP;
		lazyPlayer: AsyncComponentLoader<C>;
	}

	export const players: PlayerDecl<any, any, any>[];
}

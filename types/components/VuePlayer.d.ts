declare module "@voltra/vue-player/components/VuePlayer.vue" {
	import type { PlayerComponent, PlayerComponentProps } from "@voltra/vue-player/mixins/player";
	import type { configPropsDefaults } from "@voltra/vue-player/props/index";
	import type { PreviewVueComponent } from "@voltra/vue-player/components/Preview.vue";
	import type { Component, ComponentPublicInstance, CreateComponentPublicInstance } from "vue";
	import type { CanEnablePIP, PlayerDecl } from "@voltra/vue-player/players";
	import type { ComponentInstanceFor } from "@voltra/vue-player/utils";
	import type { CanPlayUrl } from "@voltra/vue-player/patterns";
	import type { MetaPlayerComponent } from "@voltra/vue-player/mixins/metaPlayer";
	import type { AsyncComponentLoader } from "@vue/runtime-core";
	import { PlayerVueComponent } from "@voltra/vue-player/components/Player.vue";

	export interface VuePlayerVueComponent extends MetaPlayerComponent {
		addCustomPlayer<Key extends string, Name extends string, C extends Component>(player: PlayerDecl<Key, Name, C>): void;
		removeCustomPlayer<Key extends string, Name extends string, C extends Component>(player: PlayerDecl<Key, Name, C>): void;
		removeCustomPlayers(): void;
		canPlay: CanPlayUrl;
		canEnablePIP: CanEnablePIP;

		////

		inheritAttrs: false;
		components: {
			Preview: AsyncComponentLoader<PreviewVueComponent>;
			Player: AsyncComponentLoader<PlayerVueComponent>;
		};

		data: () => ReturnType<MetaPlayerComponent["data"]> & {
			shouldShowPreview: boolean;
		};

		computed: MetaPlayerComponent["computed"] & {
			previewProps(): Pick<PlayerComponentProps, "url"|"light"|"previewTabIndex"|"oEmbedUrl">;
			playerKey(): string|null;
			currentPlayer(): PlayerDecl<string, string, PlayerComponent>;
			playerConfig(): object;
			playerComponent(): PlayerDecl<string, string, PlayerComponent>|AsyncComponentLoader<PlayerComponent>;
			playerStyles: Pick<PlayerComponentProps, "style"|"width"|"height">;
		};

		methods: MetaPlayerComponent["methods"] & {
			getConfig<Key extends string>(url: string, key: Key): (typeof configPropsDefaults)[Key];
			getActivePlayer(url: string): PlayerDecl<string, string, PlayerComponent>;
			handleClickPreview(e: MouseEvent): void;
			showPreview(): void;
			handleReady(): void;
			getInternalPlayer<Key extends "player"|string>(key: Key): ComponentInstanceFor<PlayerComponent>[Key];
		};
	}

	const VuePlayer: VuePlayerVueComponent;

	export default VuePlayer;
}

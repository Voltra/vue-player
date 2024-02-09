declare module "@voltra/vue-player/components/Player.vue" {
	import { ComponentInstanceFor } from "@voltra/vue-player/utils";
	import { PlayerComponent } from "@voltra/vue-player/mixins/player";
	import { MetaPlayerComponent } from "@voltra/vue-player/mixins/metaPlayer";

	export interface PlayerVueComponent extends MetaPlayerComponent {
		data(): ReturnType<MetaPlayerComponent["data"]> & {
			player: null|ComponentInstanceFor<PlayerComponent>;
			isReady: boolean;
			isPlaying: boolean; // Track playing state internally to prevent bugs
			isLoading: boolean; // Use isLoading to prevent onPause when switching URL
			loadOnReady: null;
			startOnPlay: boolean;
			seekOnPlay: null;
			onDurationCalled: boolean;
			progressTimeout: number;
			durationCheckTimeout: number;
		};

		computed: MetaPlayerComponent["computed"] & {
			playerProps: MetaPlayerComponent["props"];
		};

		watch: MetaPlayerComponent["watch"] & {
			playing(newValue: boolean): void;
			pictureInPicture(newValue: boolean): void;
			muted(newValue: boolean): void;
		};

		methods: MetaPlayerComponent["methods"] & {
			handlePlayerMount(player: ComponentInstanceFor<PlayerComponent>): void;
			getInternalPlayer<Key extends string>(key: Key): null|ComponentInstanceFor<PlayerComponent>[Key];
			progress(): void;
			handleReady(): void;
			handlePlay(): void;
			handlePause(e: Event): void;
			handleEnded(): void;
			handleError(...args: unknown[]): void;
			handleDurationCheck(): void;
			handleLoaded(): void;
		};
	}

	const Player: PlayerComponent;

	export default Player;
}

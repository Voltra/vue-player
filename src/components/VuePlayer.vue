<template>
	<component :is="wrapper" ref="wrapper" v-bind="$attrs">
		<span v-if="url">
			<slot name="noUrl"/>
		</span>

		<template v-else>
			<Preview
				v-if="shouldShowPreview"
				v-bind="previewProps"
				@click="handleClickPreview"
			>
				<template #playIcon>
					<slot name="playIcon"/>
				</template>
			</Preview>

			<component
				v-else
				:is="currentPlayer"
				v-bind="$props"
				:key="playerKey"
				ref="player"
				:config="playerConfig"
				:activePlayer="playerComponent"
				:style="playerStyles"
				@ready="handleReady"
				v-on="$listeners"
			>
				<template #none>
					<slot name="#noPlayer"/>
				</template>
			</component>
		</template>
	</component>
</template>

<script>
	import { metaPlayerMixin } from "../mixins/metaPlayer";
	import { players } from "../players";
	import merge from "deepmerge";
	import { configPropsDefaults } from "../props";
	import memoize from "memoize-one";

	let customPlayers = [];

	export default {
		// [META]
		displayName: "VuePlayer",
		addCustomPlayer(player) {
			customPlayers.push(player);
		},
		removeCustomPlayer(player) {
			customPlayers = customPlayers.filter(customPlayer => customPlayer !== player);
		},
		removeCustomPlayers() {
			customPlayers = [];
		},
		canPlay(url) {
			return [...customPlayers, players].some(Player => Player.canPlay(url));
		},
		canEnablePIP(url) {
			return [...customPlayers, players].some(Player => Player.canEnablePIP?.(url));
		},
		// [/META]
		inheritAttrs: false,
		mixins: [metaPlayerMixin],
		emits: ["click-preview"],
		components: {
			Preview: () => import(/* webpackChunkName: 'vuePlayerPreview' */'./Preview.vue'),
			Player: () => import(/* webpackChunkName: 'vuePlayerPlayer' */'./Player.vue'),
		},
		data() {
			return {
				shouldShowPreview: !!this.light,
			};
		},
		mounted() {
			this.getConfig = memoize(this.getConfig);
			this.getActivePlayer = memoize(this.getActivePlayer);
		},
		computed: {
			previewProps(){
				return {
					url: this.url,
					light: this.light,
					previewTabIndex: this.previewTabIndex,
					oEmbedUrl: this.oEmbedUrl,
				};
			},
			playerKey() {
				return this.currentPlayer?.key;
			},
			currentPlayer() {
				return this.activePlayer ?? this.getActivePlayer(this.url);
			},
			playerConfig() {
				return this.getConfig(this.url, this.playerKey);
			},
			playerComponent() {
				return this.currentPlayer?.lazyPlayer ?? this.currentPlayer;
			},
			playerStyles() {
				return {
					...(this.style ?? {}),
					width: this.width,
					height: this.height,
				};
			},
		},
		methods: {
			/**
			 * @inheritDoc
			 * @override
			 * @playerHook getDuration
			 */
			getDuration() {
				return this.$refs.player?.getDuration?.();
			},

			/**
			 * @inheritDoc
			 * @override
			 * @playerHook getCurrentTime
			 */
			getCurrentTime() {
				return this.$refs.player?.getCurrentTime?.();
			},

			/**
			 * @inheritDoc
			 * @override
			 * @playerHook getSecondsLoaded
			 */
			getSecondsLoaded() {
				return this.$refs.player?.getSecondsLoaded?.();
			},

			/**
			 * @inheritDoc
			 * @override
			 * @playerHook seekTo
			 */
			seekTo(fraction, type) {
				return this.$refs.player?.seekTo?.(fraction, type);
			},

			getConfig(url, key) {
				return merge.all([
					configPropsDefaults,
					configPropsDefaults[key] ?? {},
					this.config ?? {},
					this.config?.[key] ?? {},
				]);
			},
			getActivePlayer(url) {
				return [...customPlayers, ...players].find(Player => Player.canPlay(url));
			},
			handleClickPreview(e) {
				this.shouldShowPreview = false;
				this.$emit("click-preview", e);
			},
			showPreview() {
				this.shouldShowPreview = true;
			},
			handleReady() {
				this.onReady(this);
			},
			getInternalePlayer(key = "player") {
				return this.$refs.player?.getInternalPlayer(key);
			},
		},
	};
</script>

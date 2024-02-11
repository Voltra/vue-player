<template>
	<div
		class="vue-player__preview react-player__preview"
		:tabindex="previewTabIndex"
		:style="previewStyles"
		@click="handleClick"
		@keydown="handleKeyPress"
	>
		<slot name="playIcon">
			<div class="vue-player__shadow react-player__shadow">
				<div class="vue-player__play-icon react-player__play-icon"/>
			</div>
		</slot>
	</div>
</template>

<script>
	import VueTypes from "vue-types";

	/**
	 * @type {Record<string, string>}
	 */
	const cache = {};

	export default {
		emits: ["click"],
		props: {
			url: VueTypes.string.isRequired,
			oEmbedUrl: VueTypes.string.isRequired,
			previewTabIndex: VueTypes.integer.def(0),
			light: VueTypes.any,
		},
		data() {
			return {
				image: null,
				mounted: false,
			};
		},
		mounted() {
			this.mounted = true;
			this.fetchImage();
		},
		beforeUnmount() {
			this.mounted = false;
		},
		computed: {
			/**
			 * @type {Partial<CSSStyleDeclaration>}
			 */
			previewStyles() {
				return this.image ? {
					backgroundImage: `url(${this.image})`,
				} : {};
			},
		},
		methods: {
			/**
			 * @param {MouseEvent} e
			 */
			handleClick(e) {
				this.$emit("click", e);
			},
			/**
			 * @param {KeyboardEvent} e
			 */
			handleKeyPress(e) {
				if (e.key === "Enter" || e.key === " ") {
					this.$emit("click", e);
				}
			},
			async fetchImage() {
				if (typeof this.light === "string") {
					this.image = this.light;
				} else if (cache[this.url]) {
					this.image = cache[this.url];
				} else {
					this.image = null;

					const response = await fetch(this.oEmbedUrl.replace("{url}", this.url));
					const data = await response.json();

					if (typeof data.thumbnail_url !== "undefined" && this.mounted) {
						const image = data.thumbnail_url.replace("height=100", "height=480");
						this.image = image;
						cache[this.url] = image;
					}
				}
			},
			watch: {
				url: "fetchImage",
				light: "fetchImage",
			},
		},
	}
</script>

<style lang="scss">
	@mixin flexCentered {
		display: flex;
		justify-content: center;
		align-items: center;
	}

	$iconSize: 64px;

	.vue-player,
	.react-player {
		&__preview {
			@include flexCentered;

			width: 100%;
			height: 100%;
			background-size: cover;
			background-position: center;
			cursor: pointer;
		}

		&__shadow {
			@include flexCentered;

			width: $iconSize;
			height: $iconSize;
			background: radial-gradient(rgb(0, 0, 0, 0.3), rgba(0, 0, 0, 0) 60%);
			border-radius: $iconSize;
		}

		&__play-icon {
			margin-left: 7px;

			border-style: solid;
			border-width: 16px 0 16px 26px;
			border-color: transparent transparent transparent white;
		}
	}
</style>

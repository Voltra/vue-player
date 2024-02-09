declare module "@voltra/vue-player/components/Preview.vue" {
	import { ComponentOptions } from "@vue/runtime-core";
	import VueTypes from "vue-types";

	export interface PreviewVueComponent extends ComponentOptions {
		emits: {
			click(e: MouseEvent): void;
		};
		props: {
			url: typeof VueTypes.string.isRequired;
			oEmbedUrl: typeof VueTypes.string.isRequired;

			/**
			 * @default 0
			 */
			previewTabIndex: typeof VueTypes.number;

			light: typeof VueTypes.any;
		};
		data(): {
			image: string|null;
			mounted: boolean;
		};
		mounted(): void;
		beforeUnmount(): void;
		computed: {
			previewStyles(): Partial<CSSStyleDeclaration>;
		};
		methods: {
			handleClick(e: MouseEvent): void;
			handleKeyPress(e: KeyboardEvent): void;
			fetchImage(): Promise<void>;
		};
		watch: {
			url(): Promise<void>;
			light(): Promise<void>;
		};
	}

	const Preview: PreviewVueComponent;

	export default Preview;
}

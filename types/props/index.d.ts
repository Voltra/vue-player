declare module "@voltra/vue-player/props/index" {
	import type { VueProp, VueTypeShape } from "vue-types/dist/types";
	import type { SoundcloudConfig } from "@voltra/vue-player/props/soundcloudConfig";
	import type { YoutubeConfig } from "@voltra/vue-player/props/youtubeConfig";
	import type { FacebookConfig } from "@voltra/vue-player/props/facebookConfig";
	import type { DailymotionConfig } from "@voltra/vue-player/props/dailymotionConfig";
	import type { VimeoConfig } from "@voltra/vue-player/props/vimeoConfig";
	import type { FileConfig } from "@voltra/vue-player/props/fileConfig";
	import type { WistiaConfig } from "@voltra/vue-player/props/wistiaConfig";
	import type { MixcloudConfig } from "@voltra/vue-player/props/mixcloudConfig";
	import type { TwitchConfig } from "@voltra/vue-player/props/twitchConfig";
	import type { VidyardConfig } from "@voltra/vue-player/props/vidyardConfig";

	export const configPropsDefaults: {
		soundcloud: SoundcloudConfig;
		youtube: YoutubeConfig;
		facebook: FacebookConfig;
		dailymotion: DailymotionConfig;
		vimeo: VimeoConfig;
		file: FileConfig;
		wistia: WistiaConfig;
		mixcloud: MixcloudConfig;
		twitch: TwitchConfig;
		vidyard: VidyardConfig;
	};

	export const configProps: VueTypeShape<typeof configPropsDefaults>;

	export const tagOrComponentProps: VueProp<object|string|((...args: unknown[]) => unknown)>;
}

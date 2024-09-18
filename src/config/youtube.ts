import { SoftBoolean } from "../types";

export enum YoutubeIvLoadPolicy {
	WITH_ANNOTATIONS = 1,
	WITHOUT_ANNOTATIONS = 3,
	DEFAULT = WITH_ANNOTATIONS,
}

export interface YoutubeConfig {
	playerVars: {
		playsinline: SoftBoolean;
		showinfo: SoftBoolean;
		rel: SoftBoolean;
		iv_load_policy: YoutubeIvLoadPolicy;
		modestbranding: SoftBoolean;
	};
	embedOptions: Record<string, unknown>;
	onUnstarted: () => void;
}

export const youtubeConfigDefaults = {
	playerVars: {
		playsinline: 1,
		showinfo: 0,
		rel: 0,
		iv_load_policy: YoutubeIvLoadPolicy.WITHOUT_ANNOTATIONS,
		modestbranding: 1
	},
	embedOptions: {},
	onUnstarted: () => {},
} as const satisfies YoutubeConfig

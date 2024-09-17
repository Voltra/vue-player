export interface SoundcloudConfig {
	/**
	 * @default true
	 */
	visual: boolean;

	/**
	 * @default false
	 */
	buying: boolean;

	/**
	 * @default false
	 */
	liking: boolean;

	/**
	 * @default false
	 */
	download: boolean;

	/**
	 * @default false
	 */
	sharing: boolean;

	/**
	 * @default false
	 */
	show_comments: boolean;

	/**
	 * @default false
	 */
	show_playcount: boolean;
}

export const soundcloudConfigDefaults = {
	visual: true, // Undocumented, but makes player fill container and look better
	buying: false,
	liking: false,
	download: false,
	sharing: false,
	show_comments: false,
	show_playcount: false
} as const satisfies SoundcloudConfig

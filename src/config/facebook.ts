export interface FacebookConfig {
	appId: string;
	version: `v${number}.${number}`;
	playerId: string|null,
	attributes: Record<string, unknown>;
}

export const facebookConfigDefaults = {
	appId: '1309697205772819',
	version: 'v3.3',
	playerId: null,
	attributes: {},
} as const satisfies FacebookConfig

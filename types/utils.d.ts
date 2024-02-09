declare module "@voltra/vue-player/utils" {
	import { default as load } from "load-script"
	import { ComponentOptions, ComponentPublicInstance } from "@vue/runtime-core";

	export function parseStartTime(url: string): undefined|number|string;
	export function parseEndTime(url: string): undefined|number|string;
	export function randomString(): string;
	export function queryString<Obj extends Record<string, unknown>>(object: Obj): string;
	export function getGlobal<Key extends keyof (Window|typeof globalThis)>(key: Key): unknown;
	export function getSDK(url: string, sdkGlobal: string, sdkReady?: string|null, isLoaded?: () => boolean, fetchScript?: typeof load): Promise<unknown>;
	export function getConfig<UserConfig extends { config: unknown }, DefaultConfig extends { config: unknown }>(props: UserConfig, defaultProps: DefaultConfig): UserConfig|DefaultConfig|{ config: unknown };
	export function callPlayer<Method extends string>(method: Method, ...args: unknown[]): unknown;
	export function isMediaStream(url: unknown): url is MediaStream;
	export function isBlobUrl(url: unknown): boolean;
	export function supportsWebKitPresentationMode(video?: HTMLVideoElement): boolean;

	export type ComponentInstanceFor<C> = C extends ComponentOptions<
		infer Props,
		infer RawBindings,
		infer Data,
		infer Computed,
		infer Methods,
		infer Mixins,
		infer Extends,
		infer Emits
	> ? ComponentPublicInstance<Props, RawBindings, Data, Computed, Methods, Emits> : never;
}

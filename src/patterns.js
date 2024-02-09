/*!
The MIT License

Copyright © Pete Cook http://cookpete.com

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
*/

import { isBlobUrl, isMediaStream } from "./utils";

/*
	This is a copy of https://github.com/cookpete/react-player/blob/master/src/patterns.js
*/

export const MATCH_URL_YOUTUBE = /(?:youtu\.be\/|youtube(?:-nocookie)?\.com\/(?:embed\/|v\/|watch\/|watch\?v=|watch\?.+&v=))((\w|-){11})|youtube\.com\/playlist\?list=|youtube\.com\/user\//;
export const MATCH_URL_SOUNDCLOUD = /(?:soundcloud\.com|snd\.sc)\/[^.]+$/;
export const MATCH_URL_VIMEO = /vimeo\.com\/(?!progressive_redirect).+/;
export const MATCH_URL_FACEBOOK = /^https?:\/\/(www\.)?facebook\.com.*\/(video(s)?|watch|story)(\.php?|\/).+$/;
export const MATCH_URL_FACEBOOK_WATCH = /^https?:\/\/fb\.watch\/.+$/;
export const MATCH_URL_STREAMABLE = /streamable\.com\/([a-z0-9]+)$/;
export const MATCH_URL_WISTIA = /(?:wistia\.(?:com|net)|wi\.st)\/(?:medias|embed)\/(?:iframe\/)?(.*)$/;
export const MATCH_URL_TWITCH_VIDEO = /(?:www\.|go\.)?twitch\.tv\/videos\/(\d+)($|\?)/;
export const MATCH_URL_TWITCH_CHANNEL = /(?:www\.|go\.)?twitch\.tv\/([a-zA-Z0-9_]+)($|\?)/;
export const MATCH_URL_DAILYMOTION = /^(?:(?:https?):)?(?:\/\/)?(?:www\.)?(?:(?:dailymotion\.com(?:\/embed)?\/video)|dai\.ly)\/([a-zA-Z0-9]+)(?:_[\w_-]+)?$/;
export const MATCH_URL_MIXCLOUD = /mixcloud\.com\/([^/]+\/[^/]+)/;
export const MATCH_URL_VIDYARD = /vidyard.com\/(?:watch\/)?([a-zA-Z0-9-_]+)/;
export const MATCH_URL_KALTURA = /^https?:\/\/[a-zA-Z]+\.kaltura.(com|org)\/p\/([0-9]+)\/sp\/([0-9]+)00\/embedIframeJs\/uiconf_id\/([0-9]+)\/partner_id\/([0-9]+)(.*)entry_id.([a-zA-Z0-9-_]+)$/;
export const AUDIO_EXTENSIONS = /\.(m4a|m4b|mp4a|mpga|mp2|mp2a|mp3|m2a|m3a|wav|weba|aac|oga|spx)($|\?)/i;
export const VIDEO_EXTENSIONS = /\.(mp4|og[gv]|webm|mov|m4v)(#t=[,\d+]+)?($|\?)/i;
export const HLS_EXTENSIONS = /\.(m3u8)($|\?)/i;
export const DASH_EXTENSIONS = /\.(mpd)($|\?)/i;
export const FLV_EXTENSIONS = /\.(flv)($|\?)/i;

/**
 * @type {CanPlayUrl}
 */
const canPlayFile = url => {
	if (url instanceof Array) {
		for (const item of url) {
			if (typeof item === "string" && canPlayFile(item)) {
				return true;
			}
			if (canPlayFile(item.src)) {
				return true;
			}
		}
		return false;
	}
	if (isMediaStream(url) || isBlobUrl(url)) {
		return true;
	}
	return (
		AUDIO_EXTENSIONS.test(url) ||
		VIDEO_EXTENSIONS.test(url) ||
		HLS_EXTENSIONS.test(url) ||
		DASH_EXTENSIONS.test(url) ||
		FLV_EXTENSIONS.test(url)
	);
};

export const canPlay = {
	/**
	 * @type {CanPlayUrl}
	 */
	youtube: url => {
		if (url instanceof Array) {
			return url.every(item => MATCH_URL_YOUTUBE.test(item));
		}
		return MATCH_URL_YOUTUBE.test(url);
	},

	/**
	 * @type {CanPlayUrl}
	 */
	soundcloud: url => MATCH_URL_SOUNDCLOUD.test(url) && !AUDIO_EXTENSIONS.test(url),

	/**
	 * @type {CanPlayUrl}
	 */
	vimeo: url => MATCH_URL_VIMEO.test(url) && !VIDEO_EXTENSIONS.test(url) && !HLS_EXTENSIONS.test(url),

	/**
	 * @type {CanPlayUrl}
	 */
	facebook: url => MATCH_URL_FACEBOOK.test(url) || MATCH_URL_FACEBOOK_WATCH.test(url),

	/**
	 * @type {CanPlayUrl}
	 */
	streamable: url => MATCH_URL_STREAMABLE.test(url),

	/**
	 * @type {CanPlayUrl}
	 */
	wistia: url => MATCH_URL_WISTIA.test(url),

	/**
	 * @type {CanPlayUrl}
	 */
	twitch: url => MATCH_URL_TWITCH_VIDEO.test(url) || MATCH_URL_TWITCH_CHANNEL.test(url),

	/**
	 * @type {CanPlayUrl}
	 */
	dailymotion: url => MATCH_URL_DAILYMOTION.test(url),

	/**
	 * @type {CanPlayUrl}
	 */
	mixcloud: url => MATCH_URL_MIXCLOUD.test(url),

	/**
	 * @type {CanPlayUrl}
	 */
	vidyard: url => MATCH_URL_VIDYARD.test(url),

	/**
	 * @type {CanPlayUrl}
	 */
	kaltura: url => MATCH_URL_KALTURA.test(url),

	/**
	 * @type {CanPlayUrl}
	 */
	file: canPlayFile,
};

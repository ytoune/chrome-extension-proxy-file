/* global chrome, XMLHttpRequest */

import { getRedirectUrl } from './getRedirectUrl'

declare global {
	interface Window {
		redirects: Map<RegExp, string>
	}
}

const redirects = (window.redirects = new Map<RegExp, string>())
const set = redirects.set.bind(redirects)
Object.defineProperty(redirects, 'set', {
	value: (key: RegExp, value: string) => {
		if (!(key instanceof RegExp)) throw new Error('key must be RegExp')
		return set(key, value)
	},
})

chrome.webRequest.onBeforeRequest.addListener(
	detail => {
		const { url } = detail
		for (const [reg, target] of redirects) {
			if (url.match(reg)) {
				const redirectUrl = getRedirectUrl(target)
				return { redirectUrl }
			}
		}
	},
	{
		urls: ['<all_urls>'],
	},
	['blocking'],
)

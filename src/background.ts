/* global chrome */

import { getRedirectUrl } from './getRedirectUrl'

declare global {
	interface Window {
		redirects: Redirects
	}
}

class Redirects {
	#map: Map<RegExp, Readonly<{ target: string; mimetype?: string }>>
	constructor() {
		this.#map = new Map()
	}
	set(key: RegExp, value: string, mimetype?: string) {
		if (!(key instanceof RegExp)) throw new Error('key must be RegExp')
		if (!('string' === typeof value)) throw new Error('value must be string')
		if (!('string' === typeof mimetype || void 0 === mimetype))
			throw new Error('mimetype must be string or undefined')
		const t = Object.freeze({ target: value, mimetype })
		this.#map.set(key, t)
		console.log(new Map([...this.#map].map(([k, t]) => [k, t.target])))
	}
	[Symbol.iterator]() {
		return this.#map[Symbol.iterator]()
	}
}

const redirects = (window.redirects = new Redirects())
const set = redirects.set.bind(redirects)
Object.defineProperty(redirects, 'set', {
	value: (key: RegExp, value: string) => {
		if (!(key instanceof RegExp)) throw new Error('key must be RegExp')
		if (!('string' === typeof value)) throw new Error('value must be string')
		return set(key, value)
	},
})

chrome.webRequest.onBeforeRequest.addListener(
	detail => {
		const { url } = detail
		for (const [reg, { target, mimetype }] of redirects) {
			if (url.match(reg)) {
				const redirectUrl = getRedirectUrl(target, mimetype)
				return { redirectUrl }
			}
		}
	},
	{ urls: ['<all_urls>'] },
	['blocking'],
)

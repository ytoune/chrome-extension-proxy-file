/* global chrome, XMLHttpRequest */

import { getRedirectUrl } from './getRedirectUrl'

window.redirects = new Map()

chrome.webRequest.onBeforeRequest.addListener(detail => {
	const {url} = detail
	for (const [reg, target] of window.redirects) {
		if (url.match(reg)) {
			const redirectUrl = getRedirectUrl(target)
			return {redirectUrl}
		}
	}
}, {
	urls: ['<all_urls>']
}, [
	'blocking'
])

/* global chrome, XMLHttpRequest */

const {DONE} = XMLHttpRequest

window.redirects = new Map()

const fetchSync = path => {

	var xhr = new XMLHttpRequest()
	xhr.open('GET', path, false)
	xhr.onload = _ => {
		if (DONE === xhr.readyState) {
			if (200 === xhr.status) {
				console.log('ok')
			} else {
				console.error(xhr.statusText)
			}
		}
	}
	xhr.onerror = _ => {
		console.error(xhr.statusText)
	}
	xhr.send(null)

	return xhr.responseText

}

const getRedirectUrl = path => {

	if (/^(https?|data):/u.test(path))
		return path

	return `data:image/png;base64,${btoa(fetchSync(path))}`

}

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

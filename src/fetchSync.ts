const { DONE } = XMLHttpRequest

export const fetchSync = (path: string) => {
	const xhr = new XMLHttpRequest()
	xhr.open('GET', path, false)
	xhr.onload = _ => {
		if (DONE === xhr.readyState) {
			if (200 === xhr.status) {
				// console.log('ok')
			} else {
				if (0 === xhr.status && path.startsWith('file://')) {
					// ignore.
				} else {
					console.log(`status is ${xhr.status}.`)
					console.error(xhr.statusText)
				}
			}
		}
	}
	xhr.onerror = _ => {
		console.log('an error happens.')
		console.error(xhr.statusText)
	}
	xhr.send(null)

	return xhr.responseText
}

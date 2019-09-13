const { DONE } = XMLHttpRequest

export const fetchSync = (path: string) => {
	var xhr = new XMLHttpRequest()
	xhr.open('GET', path, false)
	xhr.onload = _ => {
		if (DONE === xhr.readyState) {
			if (200 === xhr.status) {
				// console.log('ok')
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

import { fetchSync } from './fetchSync'

import { lookup } from 'mime-types'
import * as base64 from './base64'

// const toBlobFromData = (bin: string, type: string) => {
// 	const { buffer } = new Uint8Array(bin.length).map((_, i) => bin.charCodeAt(i))
// 	return new Blob([buffer], { type })
// }

export const getRedirectUrl = (path: string) => {
	if (/^(https?|data):/u.test(path)) return path

	const type = path.endsWith('/home/js/app.php')
		? 'application/javascript'
		: lookup(path)

	if (!type) return path

	const data = fetchSync(path)

	// https://bugs.chromium.org/p/chromium/issues/detail?id=295829
	// const blob = toBlobFromData(base64.decode(base64.encode(data)), type)
	// return URL.createObjectURL(blob)

	return `data:${type};base64,${base64.encode(data)}`
}

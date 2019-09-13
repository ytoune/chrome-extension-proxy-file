import { fetchSync } from './fetchSync'

import { lookup } from 'mime-types'

const toBlob = (base64: string, type: string) => {
	const bin = atob(base64)
	const { buffer } = new Uint8Array(bin.length).map((_, i) => bin.charCodeAt(i))
	return new Blob([buffer], { type })
}

export const getRedirectUrl = (path: string) => {
	if (/^(https?|data):/u.test(path)) return path

	const type = lookup(path)

	if (!type) return path

	const blob = toBlob(btoa(fetchSync(path)), type)
	return URL.createObjectURL(blob)

	// return `data:${type};base64,${btoa(fetchSync(path))}`
}

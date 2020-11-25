// @ts-check
const path = require('path')
const fs = require('fs-extra')
/** @type {typeof path.join} */
const resolve = path.join.bind(path, __dirname, '..')

const main = async () => {
	const publicPath = resolve('public')
	const buildPath = resolve('build')

	await fs.remove(buildPath)
	await fs.mkdir(buildPath)

	await Promise.all(
		(await fs.readdir(publicPath)).map(async file => {
			await fs.copyFile(`${publicPath}/${file}`, `${buildPath}/${file}`)
		}),
	)
}

Promise.resolve()
	.then(main)
	.catch(x => console.error(x))

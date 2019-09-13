//@ts-check
const path = require('path')
const fs = require('fs')
const { promisify } = require('util')
/** @type {typeof path.join} */
const resolve = path.join.bind(path, __dirname, '..')

const copyFile = promisify(fs.copyFile)
/** @type {(path: string) => Promise<void>} */
const rmdir = promisify(require('rmdir'))
const mkdir = promisify(fs.mkdir)
const readdir = promisify(fs.readdir)

const main = async () => {
	const publicPath = resolve('public')
	const buildPath = resolve('build')

	try {
		await rmdir(buildPath)
	} catch (x) {}

	await mkdir(buildPath)

	await Promise.all(
		(await readdir(publicPath)).map(async file => {
			await copyFile(`${publicPath}/${file}`, `${buildPath}/${file}`)
		}),
	)
}

Promise.resolve()
	.then(main)
	.catch(x => console.error(x))

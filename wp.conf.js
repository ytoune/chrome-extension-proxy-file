
const path = require('path')
const resolve = path.resolve.bind(path, __dirname)

module.exports = {
	mode: 'production',
	context: resolve(),
	entry: {
		background: './src/background.js',
	},
	output: {
		path: resolve('build'),
		filename: '[name].js',
	},
	module: {
		rules: [
		]
	},
}

import * as esbuild from 'esbuild'

const isDev = 'development' === process.env.NODE_ENV

const main = async () => {
	await esbuild.build({
		entryPoints: ['src/background.ts'],
		bundle: true,
		outdir: 'build',
		minify: !isDev,
		sourcemap: isDev,
		platform: 'browser',
		define: { 'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV) },
		inject: ['src/_fix.ts'],
		tsconfig: 'tsconfig.json',
		watch: isDev,
	})
}

main().catch(x => {
	console.error(x)
	process.exit(1)
})

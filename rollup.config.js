import vue from "rollup-plugin-vue";
import postcss from "rollup-plugin-postcss";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import babel from "@rollup/plugin-babel";
import terser from "@rollup/plugin-terser";
import alias from "@rollup/plugin-alias";

const vuePlugin = () => vue({
	preprocessStyles: false,
	compilerOptions: {
		compatConfig: {
			MODE: 2,
		},
	},
})

const sassPlugin = () =>
	postcss({
		extensions: [".css", ".scss"],
		extract: true,
		minimize: true,
		sourceMap: true,
		plugins: [],
		use: [
			['sass', { includePaths: ['./src/'] }]
		],
	});

const babelPlugin = () => babel({
	exclude: "node_modules/**",
	babelHelpers: "bundled",
})

const aliasPlugin = () => alias({
	entries: [
		{ find: 'vue', replacement: '@vue/compat' },
	],
})

/**
 *
 * @param {import("rollup").OutputOptions["format"]} format
 * @param {Partial<import("rollup").OutputOptions>} [output]
 * @returns {import("rollup").RollupOptions}
 */
const config = (format, output = {}) => ({
	input: 'src/index.js',
	output: {
		...output,
		format,
		sourcemap: true,
		// file: `dist/${format}/index.${format}.js`,
		dir: `dist/${format}/`,
		inlineDynamicImports: format === "umd",
	},
	plugins: [
		vuePlugin(),
		sassPlugin(),
		nodeResolve(),
		commonjs(),
		babelPlugin(),
		aliasPlugin(),
		terser(),
	],
})

export const esmConfig = config("esm")
export const cjsConfig = config("cjs")
export const umdConfig = config("umd", {
	name: "vuePlayer",
	globals: {
		vue: "Vue",
		"@vue/compat": "Vue",
	},
})

export default [
	esmConfig,
	cjsConfig,
	umdConfig,
];

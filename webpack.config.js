const path = require("path");
const { VueLoaderPlugin } = require("vue-loader");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const FriendlyErrorsWebpackPlugin = require("@nuxt/friendly-errors-webpack-plugin");

/**
 * Create an absolute URL to the given URI inside the current directory
 * @param {string} [uri = ""] - The URI to the desired file
 * @returns {string}
 */
const here = (uri = "") => path.resolve(__dirname, uri);

module.exports = {
	mode: "production",
	entry: here("./src/index.js"),
	devtool: false,
	devServer: {
		quiet: true,
	},
	target: "web",
	parallelism: require("os").cpus().length,
	stats: {
		warnings: false,
	},
	optimization: {
		minimize: true,
		usedExports: true,
		nodeEnv: "production",
		sideEffects: false,
	},
	plugins: [
		new MiniCssExtractPlugin({
			filename: "styles.css",
		}),
		new VueLoaderPlugin(),
		new FriendlyErrorsWebpackPlugin(),
	],
	module: {
		rules: [
			{
				test: /\.vue$/i,
				exclude: /node_modules/g,
				use: [
					{
						loader: "vue-loader",
						options: {},
					},
				],
			},
			{
				test: /\.js$/i,
				exclude: /node_modules/g,
				use: [
					"babel-loader",
				],
			},
			{
				test: /\.(sc|sa|c)ss$/i,
				use: [
					MiniCssExtractPlugin.loader,
					"css-loader",
					"sass-loader",
				],
			},
		],
	},
	resolve: {
		extensions: ["js", "vue"].map(ext => `.${ext}`),
		alias: {
			"@": here("src"),
		},
	},
	output: {
		filename: "index.js",
		path: here("dist"),
		library: "vuePlayer",
		libraryTarget: "umd",
		globalObject: "typeof self !== 'undefined' ? self : typeof window !== 'undefined' ? window : this",
	},
	externals: {
		vue: {
			commonjs: "vue",
			commonjs2: "vue",
			amd: "vue",
			root: "Vue",
			module: "vue",
		},
	},
};

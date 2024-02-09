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

/**
 * @param {object} settings
 * @param {import("@types/webpack").Configuration["output"]["libraryTarget"]} settings.libraryTarget
 * @returns {import("@types/webpack").Configuration}
 */
const makeConfig = ({
	                    libraryTarget = "umd",
	                    withCss = true,
	                    tweak = () => {
	                    },
                    } = {}) => {
	const config = {
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
			],
		},
		resolve: {
			extensions: ["js", "vue"].map(ext => `.${ext}`),
			alias: {
				"@": here("src"),
			},
		},
		output: {
			libraryTarget,
			filename: "index.js",
			// path: here("dist"),
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

	if (withCss) {
		config.plugins.push(
			new MiniCssExtractPlugin({
				filename: "styles.css",
			}),
		);

		config.module.rules.push({
			test: /\.(sc|sa|c)ss$/i,
			use: [
				MiniCssExtractPlugin.loader,
				"css-loader",
				"sass-loader",
			],
		});
	} else {
		config.module.rules.push({
			test: /\.(sc|sa|c)ss$/i,
			use: ["ignore-loader"],
		});
	}

	tweak(config);

	return config;
};

module.exports = [
	makeConfig({
		libraryTarget: "umd",
		tweak(config) {
			config.output.path = here("dist/umd/");
			config.output.library = "vuePlayer";
			config.output.globalObject = "typeof self !== 'undefined' ? self : typeof window !== 'undefined' ? window : this";

			config.externals ??= {};
			config.externals.vue ={
				commonjs: "vue",
				commonjs2: "vue",
				amd: "vue",
				root: "Vue",
				module: "vue",
			};
		},
	}),
	makeConfig({
		libraryTarget: "module",
		// withCss: false,
		tweak(config) {
			config.experiments ??= {};
			config.experiments.outputModule = true;

			config.output.path = here("dist/esm/");
		},
	}),
	makeConfig({
		libraryTarget: "commonjs2",
		// withCss: false,
		tweak(config) {
			config.output.path = here("dist/cjs/");
		},
	}),
];

module.exports = {
	sourceType: "unambiguous",
	exclude: [
		/\bcore-js\b/i,
		/\bwebpack\b/i,
		/\bregenerator-runtime\b/i,
	],
	presets: [
		["@babel/preset-env", {
			useBuiltIns: "usage",
			corejs: 3,
			modules: false,
		}]
	],
};

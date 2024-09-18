import eslint from "@eslint/js";
import tslint from "typescript-eslint";
import vuelint from "eslint-plugin-vue";
import * as vueParser from "vue-eslint-parser";

export default tslint.config({
	files: [
		"src/**/*.{ts,js,vue}",
		"*.config.{ts,js}",
	],
	extends: [
		eslint.configs.recommended,
		...tslint.configs.strictTypeChecked,
		...tslint.configs.stylisticTypeChecked,
		/* eslint-disable-next-line */
		...vuelint.configs["flat/strongly-recommended"],
	],
	languageOptions: {
		parser: vueParser,
		parserOptions: {
			parser: "@typescript-eslint/parser",
			project: "tsconfig.eslint.json",
			sourceType: "module",
		},
	},
	rules: {
		"@typescript-eslint/no-duplicate-enum-values": "off",
		"@typescript-eslint/no-empty-function": "off",
		"@typescript-eslint/prefer-literal-enum-member": "off",
	},
});

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue2";
import path from "path";

/**
 * Create an absolute URL to the given URI inside the current directory
 * @param {string} [uri = ""] - The URI to the desired file
 * @returns {string}
 */
const here = (uri = "") => path.resolve(__dirname, uri);

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [vue()],
	build: {
		lib: {
			entry: here("src/index.js"),
			name: "vuePlayer",
			formats: ["es", "cjs", "umd"],
			fileName: (format) => {
				if (format === "es") {
					return "index.esm.js";
				}

				if (format === "cjs") {
					return "index.cjs.js";
				}

				return "index.js";
			},
		},
		rollupOptions: {
			external: ["vue"],
			output: {
				globals: {
					vue: "Vue",
				},
			},
		},
	},
});

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "node:path"

const here = (uri = "") => path.resolve(__dirname, uri)

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [vue()],
	build: {
		lib: {
			entry: here("src/index.ts"),
			name: "vuePlayer",
			fileName: "vue-player",
		},
		rollupOptions: {
			external: ["vue"],
			output: {
				// Provide global variables to use in the UMD build
				// for externalized deps
				globals: {
					vue: "Vue",
				},
			},
		},
	},
});

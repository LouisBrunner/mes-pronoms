/** biome-ignore-all lint/correctness/noNodejsModules: we are in "node" */
/** biome-ignore-all lint/style/noDefaultExport: that's how vite works */
import { copyFileSync } from "node:fs";
import { join } from "node:path";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig, type Plugin } from "vite";

const copy404Plugin = (): Plugin => {
	let outDir = "dist";
	return {
		apply: "build",
		closeBundle() {
			copyFileSync(join(outDir, "index.html"), join(outDir, "404.html"));
		},
		configResolved(config) {
			outDir = config.build.outDir;
		},
		name: "copy-index-to-404",
	};
};

export default defineConfig(() => ({
	plugins: [react(), tailwindcss(), copy404Plugin()],
	resolve: {
		tsconfigPaths: true,
	},
}));

/** biome-ignore-all lint/correctness/noNodejsModules: we are in "node" */
/** biome-ignore-all lint/style/noDefaultExport: that's how vite works */
import { copyFileSync } from "node:fs";
import { join } from "node:path";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig, type Plugin } from "vite";
import csp from "vite-plugin-csp-guard";
import sri from "vite-plugin-sri-gen";

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
	plugins: [
		react(),
		tailwindcss(),
		csp({
			algorithm: "sha256",
			override: true,
			policy: {
				"base-uri": ["'none'"],
				"connect-src": ["'self'", "https:"],
				"default-src": ["'none'"],
				"font-src": ["'self'"],
				"form-action": ["'self'"],
				"img-src": ["'self'", "https:"],
				"object-src": ["'none'"],
				"script-src": ["'self'", "https://static.cloudflareinsights.com"],
				"style-src": ["'self'", "'unsafe-inline'"],
			},
		}),
		sri(),
		copy404Plugin(),
	],
	resolve: {
		tsconfigPaths: true,
	},
}));

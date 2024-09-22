import path from "node:path";

import findPackageDir from "pkg-dir";
import { visualizer } from "rollup-plugin-visualizer";
import { defineConfig } from "vite";

const PACKAGE_DIR = (await findPackageDir(process.cwd()))!;
const OUTPUT_DIR = path.resolve(PACKAGE_DIR, "./dist");

export default defineConfig({
  build: {
    lib: {
      entry: {
        client: path.resolve(PACKAGE_DIR, "./src/index.tsx"),
      },
      name: "client",
    },
    outDir: OUTPUT_DIR,
    rollupOptions: {
      onwarn(warning, warn) {
        if (warning.code === "MODULE_LEVEL_DIRECTIVE") {
          return;
        }
        warn(warning);
      },
      plugins: [visualizer({
        brotliSize: true,
        filename: "dist/stats.html",
        gzipSize: true,
      })],
    },
  },
  define: {
    "process.env": {
      API_URL: "",
      NODE_ENV: process.env["NODE_ENV"] || "development",
    },
  },
});

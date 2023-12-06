import { defineConfig } from "vite";
import { resolve } from "path";
import dts from "vite-plugin-dts";
import banner from "vite-plugin-banner";
import packageInfo from "./package.json";

export default defineConfig({
  plugins: [
    dts({
      insertTypesEntry: true,
      outDir: "./dist/types",
      strictOutput: false,
      include: "./src",
    }),
    banner(
      `${packageInfo.name} ${
        packageInfo.version
      }\n© 2020-${new Date().getFullYear()} ${packageInfo.author}\nLicense: ${
        packageInfo.license
      }`
    ),
  ],
  build: {
    sourcemap: true,
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      name: "lensJimp",
      fileName: "lens-jimp",
    },
    rollupOptions: {
      external: ["jimp", "@alxcube/lens"],
      output: {
        // Provide global variables to use in the UMD build
        // for externalized deps
        globals: {
          jimp: "Jimp",
          "@alxcube/lens": "lens",
        },
      },
    },
  },
});

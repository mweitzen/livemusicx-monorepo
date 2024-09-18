import { defineConfig, type Options } from "tsup";

export default defineConfig((options: Options) => ({
  entry: [
    "./src/components/**/*.tsx",
    "./src/hooks/use-toast.ts",
    "./src/utils.ts",
  ],
  format: ["cjs", "esm"],
  external: ["react"],
  clean: true,
  dts: true,
  onSuccess: "npx tailwindcss -i ./src/ui.css -o ./dist/ui.css --minify",
  banner: {
    js: "'use client'",
  },
  ...options,
}));

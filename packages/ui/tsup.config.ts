import { defineConfig, type Options } from "tsup";

export default defineConfig((options: Options) => ({
  clean: true,
  entry: [
    "./src/components/**/*.tsx",
    "./src/hooks/**.*.ts",
    "./src/theme.tsx",
    "./src/utils.ts",
  ],
  format: ["cjs", "esm"],
  external: ["react"],
  dts: true,
  sourcemap: true,
  onSuccess: "npx tailwindcss -i ./src/ui.css -o ./dist/ui.css --minify",
  ...options,
}));

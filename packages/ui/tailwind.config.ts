import type { Config } from "tailwindcss";
import baseConfig from "@repo/tailwind-config/web";

export default {
  content: [...baseConfig.content, "./src/**/*.tsx"],
  prefix: "ui-",
  presets: [baseConfig],
} satisfies Config;

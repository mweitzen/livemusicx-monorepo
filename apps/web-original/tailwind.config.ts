import type { Config } from "tailwindcss";
import baseConfig from "@repo/tailwind-config/web";

const config: Config = {
  content: [...baseConfig.content],
  presets: [baseConfig],
  theme: {
    extend: {},
  },
};
export default config;

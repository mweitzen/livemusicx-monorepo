import type { Config } from "tailwindcss";
import baseConfig from "@repo/tailwind-config/web";

const config: Config = {
  content: [...baseConfig.content],
  presets: [baseConfig],
  theme: {
    extend: {
      container: {
        center: true,
        padding: "2rem",
        screens: {
          "2xl": "1400px",
        },
      },
    },
  },
};
export default config;

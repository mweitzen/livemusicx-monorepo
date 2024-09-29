import reactConfig from "@repo/eslint-config/library.js";

/** @type {import('typescript-eslint').Config} */
export default [
  {
    ignores: ["dist/**"],
  },
  ...reactConfig,
];

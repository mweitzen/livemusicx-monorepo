import reactConfig from "@repo/eslint-config/react-internal.js";

/** @type {import('typescript-eslint').Config} */
export default [
  {
    ignores: ["dist/**", "_archives/**"],
  },
  ...reactConfig,
];

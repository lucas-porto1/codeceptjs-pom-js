import js from "@eslint/js";
import globals from "globals";

export default [
  {
    ignores: ["artifacts/**", "node_modules/**", "steps.d.ts"],
  },
  js.configs.recommended,
  {
    files: ["**/*.{js,cjs}"],
    languageOptions: {
      ecmaVersion: "latest",
      globals: {
        ...globals.node,
        Feature: "readonly",
        Scenario: "readonly",
        Before: "readonly",
      },
      sourceType: "commonjs",
    },
  },
  {
    files: ["**/*.mjs"],
    languageOptions: {
      globals: globals.node,
      sourceType: "module",
    },
  },
];

import prettier from "eslint-plugin-prettier";
import mocha from "eslint-plugin-mocha";
import globals from "globals";
import js from "@eslint/js";

export default [
  js.configs.recommended,
  {
    files: ["**/*.js"],
    languageOptions: {
      globals: {
        ...globals.node
      },
      sourceType: "commonjs",
    },
    plugins: {
      prettier,
    },
    rules: {
      "prettier/prettier": ["error"],
    },
  },
  {
    files: ["**/test/**/*.js"],
    plugins: {
      mocha,
    },
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.mocha,
      },
      sourceType: "commonjs",
    },
    rules: {
      "func-names": "off",
      "prefer-arrow-callback": "off",
      "mocha/no-exclusive-tests": "error",
      "mocha/prefer-arrow-callback": "error",
    },
  },
];

module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 2017,
    sourceType: "module",
  },
  plugins: ["import", "@typescript-eslint", "prettier"],
  extends: [
    "eslint:recommended",
    "plugin:import/errors",
    "plugin:import/warnings",
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended",
  ],
  settings: {
    "import/resolver": {
      node: {
        paths: ["./src", "./spec"],
        extensions: [".ts", ".d.ts"],
      },
    },
  },
};

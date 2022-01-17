module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ["airbnb-base"],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  rules: {
    semi: ["error", "never"],
    "prettier/prettier": "error",
  },
  plugins: ["prettier"],
  extends: ["plugin:prettier/recommended"],
}
